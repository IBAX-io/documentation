# Compiler and Virtual Machine {#compiler-and-virtual-machine}

  - [Kaynak kodu depolama ve derleme](#source-code-storage-and-compilation)
  - [Sanal makine yapıları](#virtual-machine-structures)
    - [VM Yapıları](#vm-structure)
    - [Blok Yapıları](#block-structure)
    - [ObjInfo Yapısı](#objinfo-structure)
      - [ContractInfo Yapısı](#contractinfo-structure)
      - [FieldInfo Yapısı](#fieldinfo-structure)
      - [FuncInfo Yapısı](#funcinfo-structure)
      - [FuncName Yapısı](#funcname-structure)
      - [ExtFuncInfo Yapısı](#extfuncinfo-structure)
      - [VarInfo Yapısı](#varinfo-structure)
      - [ObjExtend Değer](#objextend-value)
  - [Sanal makine komutları](#virtual-machine-commands)
    - [ByteCode Yapısı](#bytecode-structure)
    - [Command identifiers](#command-identifiers)
    - [Yığın işlem komutları](#stack-operation-commands)
    - [Runtime Yapısı](#runtime-structure)
      - [blockStack Yapısı](#blockstack-structure)
    - [RunCode Fonksiyonu](#runcode-function)
    - [VM ile işlemler için diğer işlevler](#other-functions-for-operations-with-vm)
  - [Compiler](#compiler)
  - [Lexical analizör](#lexical-analyzer)
    - [lextable/lextable.go](#lextable-lextable-go)
    - [lex.go](#lex-go)
  - [Needle dili](#needle-language)
    - [Lexemes](#lexemes)
    - [Türler](#types)
    - [Expressions](#expressions)
    - [Scope](#scope)
    - [Kontrat yürütme](#contract-execution)
    - [Backus–Naur Formu (BNF)](#backus-naur-form-bnf)

Bu bölüm, Sanal Makinede (VM) program derleme ve Needle dili işlemlerini içerir.

## Kaynak kodu depolama ve derleme {#source-code-storage-and-compilation}

Sözleşmeler ve fonksiyonlar Golang ile yazılır ve ekosistemlerin sözleşme tablolarında saklanır.

Bir sözleşme yürütüldüğünde, kaynak kodu veritabanından okunacak ve bayt koduna derlenecektir.

Bir sözleşme değiştirildiğinde, kaynak kodu güncellenecek ve veritabanına kaydedilecektir. Daha sonra kaynak kod derlenir, böylece ilgili sanal makinedeki bayt kodu güncellenir.

Bayt kodları fiziksel olarak kaydedilmediği için program tekrar çalıştırıldığında yeniden derlenecektir.

Her ekosistemin sözleşme tablosunda açıklanan kaynak kodunun tamamı katı bir sırayla sanal bir makinede derlenir ve sanal makinenin durumu tüm düğümlerde aynıdır.

Sözleşme çağrıldığında, sanal makine durumunu hiçbir şekilde değiştirmeyecektir. Herhangi bir sözleşmenin yürütülmesi veya herhangi bir işlevin çağrılması, her harici çağrı sırasında oluşturulan ayrı bir çalışan yığında gerçekleşir.

Her ekosistem, blok zinciri veya diğer sanal ekosistemler üzerinde doğrudan etki olmaksızın blok zinciri dışındaki tablolarla birlikte bir düğüm içinde kullanılabilen sanal bir ekosisteme sahip olabilir. Bu durumda böyle bir sanal ekosistemi barındıran düğüm, sözleşmesini derleyecek ve kendi sanal makinesini oluşturacaktır.

## Sanal makine yapıları {#virtual-machine-structures}

### VM Yapıları {#vm-structure}

Bir sanal makine, aşağıdaki gibi bir yapı olarak bellekte düzenlenmiştir.
```
type VM struct {
   Block
   ExtCost func(string) int64
   FuncCallsDB map[string]struct{}
   Extern bool
   ShiftContract int64
   logger *log.Entry
}
```

Bir VM yapısı aşağıdaki öğelere sahiptir:
* Blok - bir [blok yapısı](#block-structure);
* ExtCost - bir işlev, harici bir golang işlevini yürütmenin maliyetini döndürür;
* FuncCallsDB - Golang işlev adlarının bir koleksiyonu. Bu işlev, yürütme maliyetini ilk parametre olarak döndürür. Bu işlevler, veritabanı işleme maliyetini hesaplamak için EXPLAIN'i kullanır;
* Extern - bir sözleşmenin harici bir sözleşme olup olmadığını gösteren bir Boole bayrağı. Bir VM oluşturulduğunda true olarak ayarlanır. Kod derlendiğinde çağrılan sözleşmeler görüntülenmez. Yani ileride belirlenen sözleşme kodunun çağrılmasını sağlar;
* ShiftContract - VM'deki ilk sözleşmenin kimliği;
* logger - VM hata günlüğü çıktısı.

### Blok Yapıları {#block-structure}

Sanal makine, **Blok tipi** nesnelerden oluşan bir ağaçtır.

Bir blok, bazı bayt kodları içeren bağımsız bir birimdir. Basit bir ifadeyle, dilde parantezler (`{}`) içine koyduğunuz her şey bir bloktur.

Örneğin, aşağıdaki kod, fonksiyonlara sahip bir blok oluşturacaktır. Bu blok ayrıca bir if ifadesine sahip başka bir blok içerir ve bu blok while ifadesine sahip bir blok içerir.

```
func my() {
   if true {
      while false {
      ...
      }
   }
}
```

Blok, bellekte aşağıdaki gibi bir yapı olarak düzenlenmiştir.
```
type Block struct {
   Objects map[string]*ObjInfo
   Type int
   Owner *OwnerInfo
   Info interface{}
   Parent *Block
   Vars []reflect.Type
   Code ByteCodes
   Children Blocks
}
```

Bir blok yapısı aşağıdaki unsurlardan oluşur:

* **Objects** - [ObjInfo](#objInfo-structure) pointer türündeki internal objelerin haritası. Örneğin, blokta bir değişken varsa, onun adıyla ilgili bilgi alabilirsiniz;
* **Type** - bloğun türü. Bir fonksiyon bloğu için tipi **ObjFunc**; bir sözleşme bloğu için türü **ObjContract**'tır;
* **Owner** - **OwnerInfo** işaretçi türünün yapısı. Bu yapı, sözleşmenin derlenmesi sırasında belirtilen veya **sözleşmeler** tablosundan elde edilen, derlenmiş sözleşmenin sahibine ilişkin bilgileri içerir;
* **Info** - blok türüne bağlı olarak nesne hakkında bilgi içerir;
* **Parent** - üst bloğa bir işaretçi;
* **Vars** - mevcut blok değişkenlerinin türlerini içeren bir dizi;
* **Code** - örneğin fonksiyon çağrıları veya döngü gövdeleri gibi kontrol hakları bloğa aktarıldığında yürütülecek bloğun kendisinin bayt kodu;
* **Children** - fonksiyon iç içe yerleştirme, döngüler, koşullu operatörler gibi alt blokları içeren bir dizi.

### ObjInfo Yapısı {#objinfo-structure}

ObjInfo yapısı, internal nesneler hakkında bilgi içerir.
```
type ObjInfo struct {
   Type int
   Value interface{}
}
```

ObjInfo yapısı aşağıdaki öğelere sahiptir:

* **Type** is the object type, which has any of the following values:
   * **ObjContract** – [contract](#contractInfo-structure);
   * **ObjFunc** - function;
   * **ObjExtFunc** - external golang function;
   * **ObjVar** - variable;
   * **ObjExtend** - $name variable.
* **Value** – it contains the structure of each type.

#### ContractInfo Yapısı {#contractinfo-structure}

**ObjContract** türüne işaret edilir ve **Value** alanı bir **ContractInfo** yapısı içerir.

```
type ContractInfo struct {
   ID uint32
   Name string
   Owner *OwnerInfo
   Used map[string]bool
   Tx *[]*FieldInfo
}
```

ContractInfo yapısı aşağıdaki değişkenlere sahiptir:

* **ID** - sözleşme çağrılırken blok zincirinde görüntülenen contractID
* **Name** - contract adı;
* **Owner** - sözleşme ile ilgili diğer bilgiler;
* **Used** - çağrılan sözleşme adlarının haritası;
* **Tx** - kontratın [data section](script.md#data-section) açıklanan bir veri dizisi.

#### FieldInfo Yapısı {#fieldinfo-structure}

FieldInfo yapısı **ContractInfo** yapısında kullanılır ve bir sözleşmenin [datasection](script.md#data-section) içindeki öğeleri açıklar.

```
type FieldInfo struct {
   Name string
   Type reflect.Type
   Original uint32
   Tags string
}
```

FieldInfo yapısı aşağıdaki öğelere sahiptir:

* **Name** - field adı;
* **Type** - field tipi;
* **Original** - opsiyonel field;
* **Tags** - bu alan için ek etiketler.

#### FuncInfo Yapısı {#funcinfo-structure}

ObjFunc tipine işaret eden ve Değer alanı bir FuncInfo yapısı içerir.
```
type FuncInfo struct {
   Params []reflect.Type
   Results []reflect.Type
   Names *map[string]FuncName
   Variadic bool
   ID uint32
}
```

FuncInfo yapısı aşağıdaki değişkenlere sahiptir:

* **Params** - bir dizi parametre türü;
* **Results** - bir dizi döndürülen tür;
* **Names** - örneğin kuyruk fonksiyonları için veri haritası, `DBFind().Columns ()`;
* **Variadic** - işlev değişken sayıda parametreye sahip olabilirse true;
* **ID** - function ID.

#### FuncName Yapısı {#funcname-structure}

FuncName yapısı, FuncInfo için kullanılır ve bir kuyruk fonksiyonunun verilerini tanımlar.
```
type FuncName struct {
   Params []reflect.Type
   Offset []int
   Variadic bool
}
```

FuncName yapısı aşağıdaki öğelere sahiptir:

* **Params** - bir dizi parametre türü;
* **Offset** - bu değişkenler için ofset dizisi. Aslında, bir fonksiyondaki tüm parametrelerin değerleri dot. ile başlatılabilir;
* **Variadic** - tail işlevi değişken sayıda parametreye sahip olabilirse true.

#### ExtFuncInfo Yapısı {#extfuncinfo-structure}

ObjExtFunc türüne işaret eden ve Değer alanı bir ExtFuncInfo yapısı içerir. Golang fonksiyonlarını tanımlamak için kullanılır.
```
type ExtFuncInfo struct {
   Name string
   Params []reflect.Type
   Results []reflect.Type
   Auto []string
   Variadic bool
   Func interface{}
}
```

ExtFuncInfo yapısı aşağıdaki öğelere sahiptir:

* **Name**, **Params**, **Results** parametreler [FuncInfo](#funcinfo-structure) ile aynı yapıya sahiptir;
* **Auto** - bir dizi değişken. Varsa ek parametre olarak fonksiyona geçer. Örneğin, SmartContract sc türünde bir değişken;
* **Func** - golang fonksiyonu.

#### VarInfo Yapısı {#varinfo-structure}

**ObjVar** türüne işaret edilir ve **Value** alanı bir **VarInfo** yapısı içerir.
```
type VarInfo struct {
   Obj *ObjInfo
   Owner *Block
}
```

VarInfo yapısı aşağıdaki unsurlara sahiptir:

* **Obj** - değişkenin türü ve değeri hakkında bilgi;
* **Owner** - Owner bloğunun pointerı.

#### ObjExtend Değer {#objextend-value}

**ObjExtend** türüne işaret edilir ve **Value** alanı, değişken veya işlevin adını içeren bir dize içerir.

## Sanal makine komutları {#virtual-machine-commands}
### ByteCode Yapısı {#bytecode-structure}

Bir bayt kodu, **ByteCode** tipi yapıların bir dizisidir.
```
type ByteCode struct {
   Cmd uint16
   Value interface{}
}
```

Bu yapı aşağıdaki alanlara sahiptir:

* **Cmd** - the identifier of the storage commands;
* **Value** - işleneni içerir (değer).

Genel olarak komutlar, yığının en üst öğesinde bir işlem gerçekleştirir ve gerekirse sonuç değerini buna yazar.

### Command identifiers {#command-identifiers}

Sanal makine komutlarının identifiersları, vm/cmds_list.go dosyasında açıklanmıştır.

* **cmdPush** – Değer alanından yığına bir değer koyun. Örneğin, yığına sayılar ve satırlar koyun;
* **cmdVar** - bir değişkenin değerini yığına koyun. Değer, VarInfo yapısına bir işaretçi ve değişken hakkında bilgi içerir;
* **cmdExtend** – yığına harici bir değişkenin değerini koyun. Değer, değişken adıyla ($ ile başlayan) bir dize içerir;
* **cmdCallExtend** – harici bir işlevi çağırın ($ ile başlayan). Fonksiyonun parametreleri yığından elde edilir ve sonuçlar yığına yerleştirilir. Değer bir fonksiyon adı içerir ($ ile başlar);
* **cmdPushStr** – dizeyi Değer'e yığına koyun;
* **cmdCall** - sanal makine işlevini çağırır. Değer bir **ObjInfo** yapısı içerir. Bu komut, **ObjExtFunc** golang işlevi ve **ObjFunc** İğne işlevi için geçerlidir. Bir fonksiyon çağrılırsa, parametreleri yığından alınacak ve sonuç değerleri yığına yerleştirilecektir;
* **cmdCallVari** - **cmdCall** komutuna benzer şekilde sanal makine işlevini çağırır. Bu komut, değişken sayıda parametreye sahip bir işlevi çağırmak için kullanılır;
* **cmdReturn** - fonksiyondan çıkmak için kullanılır. Dönüş değerleri yığına konur ve Değer alanı kullanılmaz;
* **cmdIf** – Değer alanına iletilen **blok** yapısındaki bayt koduna kontrolü aktarın. Kontrol, yalnızca yığının en üst öğesi *valueToBool* işlevi tarafından çağrıldığında ve 'true' döndürüldüğünde yığına aktarılacaktır. Aksi takdirde, kontrol bir sonraki komuta aktarılacaktır;
* **cmdElse** - bu komut, **cmdIf** ile aynı şekilde çalışır, ancak yalnızca yığının üst öğesi valueToBool işlevi tarafından çağrıldığında ve 'false' döndürüldüğünde, kontrol belirtilen bloğa aktarılacaktır;
* **cmdAssignVar** – Value'dan **VarInfo** türündeki değişkenlerin bir listesini alın. Bu değişkenler,**cmdAssign** değeri almak için komut;
* **cmdAssign** – yığındaki değeri **cmdAssignVar** komutuyla elde edilen değişkene atayın;
* **cmdLabel** - while döngüsü sırasında kontrol döndürüldüğünde bir etiket tanımlar;
* **cmdContinue** - bu komut, kontrolü **cmdLabel** etiketine aktarır. Döngünün yeni bir yinelemesi yürütülürken Değer kullanılmaz;
* **cmdWhile** – yığının üst öğesini kontrol etmek için valueToBool kullanın. Bu değer "doğru" ise,**block** yapı, değer alanından çağrılır;
* **cmdBreak** - döngüden çıkar;
* **cmdIndex** – Değer kullanmadan, haritadaki veya dizideki değeri dizine göre yığına koyun. Örneğin, `(map | array) (index value) => (map | array [index value])`;
* **cmdSetIndex** – Değer kullanmadan, yığının en üst öğesinin değerini harita veya dizi öğelerine atar. Örneğin, `(map | array) (index value) (value) => (map | array)`;
* **cmdFuncName** - dot. ile bölünen sıralı açıklamalar kullanılarak geçirilen parametreleri ekler. Örneğin, `func name => Func (...) .Name (...)`;
* **cmdUnwrapArr** - yığının en üst öğesi bir dizi ise bir Boole bayrağı tanımlar;
* **cmdMapInit** – map değerini başlatır;
* **cmdArrayInit** - dizinin değerini başlatır;
* **cmdError** - bu komut, bir sözleşme veya işlev belirtilen bir ile sona erdiğinde oluşturulur.`error, warning, info`.

### Yığın işlem komutları {#stack-operation-commands}
> Not

> Mevcut sürümde, bu komutlar için otomatik tip dönüştürme tam olarak uygulanamaz. Örneğin,

> `string + float | int | decimal => float | int | decimal, float + int | str => float, but int + string => runtime error`.

Aşağıdakiler, doğrudan yığın işleme için komutlardır. Bu komutlarda Değer alanı kullanılmaz.

* **cmdNot** - logical negation. `(val) => (!ValueToBool(val))`;
* **cmdSign** - change of sign. `(val) => (-val)`;
* **cmdAdd** - addition. `(val1)(val2) => (val1 + val2)`;
* **cmdSub** - subtraction. `(val1)(val2) => (val1-val2)`;
* **cmdMul** - multiplication. `(val1)(val2) => (val1 * val2)`;
* **cmdDiv** - division. `(val1)(val2) => (val1 / val2)`;
* **cmdAnd** - logical AND. `(val1)(val2) => (valueToBool(val1) && valueToBool(val2))`;
* **cmdOr** - logical OR. `(val1)(val2) => (valueToBool(val1) || valueToBool(val2))`;
* **cmdEqual** - equality comparison, bool is returned. `(val1)(val2) => (val1 == val2)`;
* **cmdNotEq** - inequality comparison, bool is returned. `(val1)(val2) => (val1 != val2)`;
* **cmdLess** - less-than comparison, bool is returned. `(val1)(val2) => (val1 <val2)`;
* **cmdNotLess** - greater-than-or-equal comparison, bool is returned. `(val1)(val2) => (val1 >= val2)`;
* **cmdGreat** - greater-than comparison, bool is returned. `(val1)(val2) => (val1> val2)`;
* **cmdNotGreat** - less-than-or-equal comparison, bool is returned. `(val1)(val2) => (val1 <= val2)`.

### Runtime Yapısı {#runtime-structure}

Bayt kodlarının yürütülmesi sanal makineyi etkilemez. Örneğin, çeşitli işlevlerin ve sözleşmelerin tek bir sanal makinede aynı anda çalışmasına izin verir. Runtime yapısı, herhangi bir ifade ve bayt kodunun yanı sıra işlevleri ve sözleşmeleri çalıştırmak için kullanılır.
```
type RunTime struct {
   stack []interface{}
   blocks []*blockStack
   vars []interface{}
   extend *map[string]interface{}
   vm *VM
   cost int64
   err error
}
```

* **stack** - bayt kodunu yürütmek için yığın;
* **blocks** - calls yığınını engelle;
* **vars** - değişken yığını. Blokta bayt kodu çağrıldığında, değişkeni değişken yığınına eklenecektir. Bloktan çıktıktan sonra, değişken yığınının boyutu önceki değere dönecektir;
* **extend** - external değişkenlerin değerleriyle eşlenecek bir işaretçi (`$name`);
* **vm** - bir sanal makine işaretçisi;
* **cost** - ortaya çıkan yürütme maliyetinin yakıt birimi;
* **err** - yürütme sırasında hata oluştu.

#### blockStack Yapısı {#blockstack-structure}

Runtime yapısında blockStack yapısı kullanılır.
```
type blockStack struct {
   Block *Block
   Offset int
}
```

* **Block** - yürütülmekte olan bloğa bir işaretçi;
* **Offset** – belirtilen bloğun bayt kodunda yürütülen son komutun ofseti.

### RunCode Fonksiyonu {#runcode-function}

Bayt kodları **RunCode** işlevinde yürütülür. Her bayt kodu komutu için karşılık gelen işlemi gerçekleştiren bir döngü içerir. Bir bayt kodunu işlemeden önce, gerekli veriler başlatılmalıdır.

Diğer bloklara yeni bloklar eklenir.

```
rt.blocks = append(rt.blocks, &blockStack{block, len(rt.vars)})
```

Ardından, kuyruk fonksiyonunun ilgili parametrelerinin bilgilerini alın. Bu parametreler yığının son elemanında bulunur.
```
var namemap map[string][]interface{}
if block.Type == ObjFunc && block.Info.(*FuncInfo).Names != nil {
   if rt.stack[len(rt.stack)-1] != nil {
      namemap = rt.stack[len(rt.stack)-1].(map[string][]interface{})
   }
   rt.stack = rt.stack[:len(rt.stack)-1]
}
```

Ardından, mevcut blokta tanımlanan tüm değişkenler, başlangıç ​​değerleri ile başlatılmalıdır.
```
start := len(rt.stack)
varoff := len(rt.vars)
for vkey, vpar := range block.Vars {
   rt.cost--
   var value interface{}
```
Fonksiyondaki değişkenler de değişken olduğundan, onları fonksiyonun tanımladığı sıraya göre yığının son elemanından almamız gerekir.
```
   if block.Type == ObjFunc && vkey <len(block.Info.(*FuncInfo).Params) {
      value = rt.stack[start-len(block.Info.(*FuncInfo).Params)+vkey]
   } else {
```

Yerel değişkenleri başlangıç ​​değerleriyle başlatın.
```
      value = reflect.New(vpar).Elem().Interface()

      if vpar == reflect.TypeOf(map[string]interface{}{}) {

         value = make(map[string]interface{})
      } else if vpar == reflect.TypeOf([]interface{}{}) {
         value = make([]interface{}, 0, len(rt.vars)+1)
      }
   }
   rt.vars = append(rt.vars, value)
}
```

Ardından, tail işlevinde geçirilen değişken parametrelerin değerlerini güncelleyin.
```
if namemap != nil {
   for key, item := range namemap {
      params := (*block.Info.(*FuncInfo).Names)[key]
      for i, value := range item {
         if params.Variadic && i >= len(params.Params)-1 {
```

Geçirilen değişken parametreler değişken sayıda parametreye aitse, bu parametreler bir dizi değişkende birleştirilir.
```
            off := varoff + params.Offset[len(params.Params)-1]
            rt.vars[off] = append(rt.vars[off].([]interface{}), value)
         } else {
            rt.vars[varoff+params.Offset[i]] = value
         }
      }
   }
}
```

Bundan sonra tek yapmamız gereken, yığının tepesinden fonksiyon parametreleri olarak geçen değerleri silmek ve böylece yığını taşımaktır. Değerlerini bir değişken dizisine kopyaladık.

```
if block.Type == ObjFunc {
   start -= len(block.Info.(*FuncInfo).Params)
}
```

Bir bayt kodu komut döngüsü bittiğinde, yığını doğru şekilde temizlemeliyiz.
```
last := rt.blocks[len(rt.blocks)-1]
```

Mevcut bloğu blok yığınından silin.

```
rt.blocks = rt.blocks[:len(rt.blocks)-1]
if status == statusReturn {
```

Halihazırda yürütülen bir fonksiyondan başarıyla çıkılırsa, dönüş değerini önceki yığının sonuna ekleyeceğiz.
```
   if last.Block.Type == ObjFunc {
      for count := len(last.Block.Info.(*FuncInfo).Results); count > 0; count-- {
         rt.stack[start] = rt.stack[len(rt.stack)-count]
         start++
      }
      status = statusNormal
   } else {
```
Gördüğünüz gibi, fonksiyonu çalıştırmazsak, yığın durumunu geri yüklemeyeceğiz ve fonksiyondan olduğu gibi çıkmayacağız. Bunun nedeni, fonksiyonda yürütülen döngüler ve koşullu yapıların da bayt kodu blokları olmasıdır.
```
   return

   }
}

rt.stack = rt.stack[:start]
```

### VM ile işlemler için diğer işlevler {#other-functions-for-operations-with-vm}

**NewVM** işleviyle sanal bir makine oluşturabilirsiniz. Her sanal makine, **Extend** işlevi aracılığıyla **ExecContract**, **MemoryUsage**, **CallContract** ve **Settings** gibi dört işlevle eklenecektir.

```
for key, item := range ext.Objects {
   fobj := reflect.ValueOf(item).Type()
```

Geçen tüm nesneleri dolaşıyoruz ve sadece işlevlere bakıyoruz.

```
   switch fobj.Kind() {
   case reflect.Func:
```
**ExtFuncInfo** yapısını fonksiyon hakkında aldığımız bilgilere göre dolduruyoruz ve yapısını üst seviye haritasına **Objects** ismiyle ekliyoruz.

```
   data := ExtFuncInfo{key, make([]reflect.Type, fobj.NumIn()), make([]reflect.Type, fobj.NumOut()),
   make([]string, fobj.NumIn()), fobj.IsVariadic(), item}
   for i := 0; i <fobj.NumIn(); i++ {
```

**ExtFuncInfo** yapısı bir **Auto** parametre dizisine sahiptir. Genellikle ilk parametre `sc *SmartContract`veya `rt *Runtime`'dır, onları Needle dilinden geçiremeyiz, çünkü bunlar bizim için bazı golang fonksiyonlarını yürütmemiz için gereklidir. Bu nedenle bu fonksiyonlar çağrıldığında bu değişkenlerin otomatik olarak kullanılacağını belirtiyoruz. Bu durumda, yukarıdaki dört işlevin ilk parametresi `rt *Runtime`dır.
```
   if isauto, ok := ext.AutoPars[fobj.In(i).String()]; ok {
      data.Auto[i] = isauto
   }
```

Parametrelerin atanması hakkında bilgi.
```
      data.Params[i] = fobj.In(i)
   }
```

Ve dönüş değerleri türleri.
```
for i := 0; i <fobj.NumOut(); i++ {
   data.Results[i] = fobj.Out(i)
}
```
Derleyicinin daha sonra sözleşmeyi kullanırken bulabilmesi için **Objects** köküne bir işlev ekler.
```
      vm.Objects[key] = &ObjInfo{ObjExtFunc, data}
   }

}
```

## Compiler {#compiler}

compile.go dosyasındaki işlevler, sözcük çözümleyicisinden elde edilen belirteç dizisini derlemekten sorumludur. Derleme şartlı olarak iki seviyeye ayrılabilir. En üst düzeyde, işlevler, sözleşmeler, kod blokları, koşullu ve döngü ifadeleri, değişken tanımları vb. ile ilgileniyoruz. Alt düzeyde, ifadeleri kod bloklarında veya koşulları döngülerde ve koşullu ifadelerde derleriz.

İlk olarak, basit alt seviyeden başlayacağız. **compileEval** işlevinde ifadeler bayt koduna dönüştürülebilir. Yığınlı bir sanal makine kullandığımız için, sıradan infix kayıt ifadelerini postfix notasyonuna veya ters Lehçe notasyonuna dönüştürmek gerekir. Örneğin, `1+2`yi `12+`ya çeviririz ve yığına `1` ve `2` koyarız. Ardından stack içerisindeki son iki elemana toplama işlemini uyguluyoruz ve sonucu stack’e yazıyoruz. Bu [conversion](https://master.virmandy.net/perevod-iz-infiksnoy-notatsii-v-postfiksnuyu-obratnaya-polskaya-zapis/) algoritmasını İnternette bulabilirsiniz.

`opers = map [uint32] operPrior` global değişkeni, invers Polish gösterime dönüştürmek için gereken işlemlerin önceliğini içerir.

**compileEval** işlevinin başında aşağıdaki değişkenler tanımlanır:

* **buffer** - bayt kodu komutları için geçici arabellek;
* **bytecode** - bayt kodu komutlarının son arabelleği;
* **parcount** - bir işlevi çağırırken parametreleri hesaplamak için kullanılan geçici buffer;
* **setIndex** - harita veya dizi öğeleri atadığımızda, çalışma sürecindeki değişkenler true olarak ayarlanacaktır. Örneğin, `a["my"] = 10`. Bu durumda belirtilen **cmdSetIndex** komutunu kullanmamız gerekiyor.

Bir döngüde bir token alırız ve buna göre işleriz. Örneğin, braces bulunursa ifade eşlemesi durdurulacaktır. Stringi taşırken önceki statement bir işlem olup olmadığını ve parantez içinde olup olmadığını kontrol ederiz, aksi halde parse edilen ifadeden çıkacaktır.

```
case isRCurly, isLCurly:
   i--
   if prevLex == isComma || prevLex == lexOper {
      return errEndExp
   }
   break main
case lexNewLine:
   if i > 0 && ((*lexems)[i-1].Type == isComma || (*lexems)[i-1].Type == lexOper) {
      continue main
   }
   for k := len(buffer) - 1; k >= 0; k-- {
   if buffer[k].Cmd == cmdSys {
      continue main
   }
}
break main

```

Genel olarak, algoritmanın kendisi, inverse Polish notasyonuna dönüştürmek için bir algoritmaya karşılık gelir. Gerekli sözleşmelerin, işlevlerin ve dizinlerin çağrılmasının yanı sıra ayrıştırma sırasında karşılaşılmayan diğer şeyler ve lexIdent tipi belirteçleri ayrıştırma seçenekleri göz önüne alındığında, bu adla değişkenler, işlevler veya sözleşmeler kontrol edilecektir. Hiçbir şey bulunamazsa ve bu bir işlev veya sözleşme çağrısı değilse, bir hata olduğunu gösterir.

```
objInfo, tobj := vm.findObj(lexem.Value.(string), block)
if objInfo == nil && (!vm.Extern || i> *ind || i >= len(*lexems)-2 || (*lexems)[i+1].Type != isLPar) {
   return fmt.Errorf(`unknown identifier %s`, lexem.Value.(string))
}
```

Böyle bir durumla karşılaşabiliriz ve sözleşme görüşmesi daha sonra anlatılacaktır. Bu örnekte, aynı isimde herhangi bir fonksiyon veya değişken bulunamazsa, bir sözleşme çağırmanın gerekli olduğunu düşünüyoruz. Bu derlenmiş dilde, sözleşmeler ve işlev çağrıları arasında hiçbir fark yoktur. Ancak sözleşmeyi bytecode'da kullanılan **ExecContract** işlevi aracılığıyla çağırmamız gerekiyor.
```
if objInfo.Type == ObjContract {
   if objInfo.Value != nil {
      objContract = objInfo.Value.(*Block)
   }
   objInfo, tobj = vm.findObj(`ExecContract`, block)
   isContract = true
}
```

Şimdiye kadarki değişkenlerin sayısını, fonksiyon parametrelerinin sayısı ile birlikte yığına da yazılacak olan `count` içine kaydederiz. Parametrelerin sonraki her tespitinde, yığının son elemanında bu sayıyı yalnızca bir birim artırmamız gerekir.

```
count := 0
if (*lexems)[i+2].Type != isRPar {
   count++
}
```

Kontratlar için kullanılan parametreleri içeren bir listemiz var, sonra kontratın çağrıldığı durumu işaretlememiz gerekiyor. Kontrat parametresiz çağrılırsa, en az iki parametre almak için **ExecContract** çağrısına iki boş parametre eklemeliyiz.
```
if isContract {
   name := StateName((*block)[0].Info.(uint32), lexem.Value.(string))
   for j := len(*block) - 1; j >= 0; j-- {
   topblock := (*block)[j]
      if topblock.Type == ObjContract {
         if topblock.Info.(*ContractInfo).Used == nil {
            topblock.Info.(*ContractInfo).Used = make(map[string]bool)
         }
         topblock.Info.(*ContractInfo).Used[name] = true
      }
   }
   bytecode = append(bytecode, &ByteCode{cmdPush, name})
   if count == 0 {
      count = 2
      bytecode = append(bytecode, &ByteCode{cmdPush, ""})
      bytecode = append(bytecode, &ByteCode{cmdPush, ""})
   }
   count++
}
```

Yanında bir braces olduğunu görürsek, indekse göre değeri almak için **cmdIndex** komutunu ekliyoruz.
```
if (*lexems)[i+1].Type == isLBrack {
   if objInfo == nil || objInfo.Type != ObjVar {
      return fmt.Errorf(`unknown variable %s`, lexem.Value.(string))
   }
   buffer = append(buffer, &ByteCode{cmdIndex, 0})
}
```

**CompileBlock** işlevi, nesne ağaçları ve ifadeden bağımsız bayt kodları oluşturabilir. Derleme işlemi, tıpkı bir sözlüksel çözümleyici gibi, ancak aşağıdaki farklılıklarla birlikte, sonlu durumlu bir makineye dayanmaktadır. İlk olarak, semboller değil tokenlar kullanıyoruz; ikinci olarak, tüm durumlar ve geçişlerdeki *durumlar* değişkenlerini hemen tanımlayacağız. Belirteç türüne göre dizine alınmış bir dizi nesneyi temsil eder. Her simgenin bir *compileState* yapısı vardır ve *NewState* içinde yeni bir durum belirtilir. Hangi yapıyı çözdüğümüz açıksa, *Func* alanında işleyicinin fonksiyonunu belirtebiliriz.

Örnek olarak ana durumu inceleyelim.

Bir satırsonu veya yorumla karşılaşırsak, aynı durumda kalırız. **contract** anahtar kelimesiyle karşılaşırsak, durumu *stateContract* olarak değiştirir ve yapıyı ayrıştırmaya başlarız. **func** anahtar kelimesiyle karşılaşırsak, durumu *stateFunc* olarak değiştiririz. Diğer belirteçler alınırsa, fonksiyon üreten hata çağrılır.
```
{// stateRoot
   lexNewLine: {stateRoot, 0},
   lexKeyword | (keyContract << 8): {stateContract | statePush, 0},
   lexKeyword | (keyFunc << 8): {stateFunc | statePush, 0},
   lexComment: {stateRoot, 0},
   0: {errUnknownCmd, cfError},
},
```

**func** anahtar sözcüğüyle karşılaştığımızı ve durumu *stateFunc* olarak değiştirdiğimizi varsayalım. İşlev adının **func** anahtar sözcüğünü takip etmesi gerektiğinden, işlev adını değiştirirken aynı durumu koruyacağız. Diğer tüm belirteçler için ilgili hataları üreteceğiz. Belirteç tanımlayıcıda işlev adını alırsak, işlevin parametrelerini alabileceğimiz *stateFParams* durumuna gideriz.

```
{// stateFunc
   lexNewLine: {stateFunc, 0},
   lexIdent: {stateFParams, cfNameBlock},
   0: {errMustName, cfError},
},
```

Yukarıdaki işlemlerle aynı zamanda **fNameBlock** fonksiyonunu çağıracağız. Unutulmamalıdır ki Block yapısı, tampondan aldığımız ve ihtiyacımız olan verilerle doldurduğumuz statePush işareti ile oluşturulmaktadır. **fNameBlock** işlevi, sözleşmeler ve işlevler için uygundur (iç içe geçmiş olanlar dahil). *Bilgi* alanını ilgili yapı ile doldurur ve kendisini üst bloğun *Nesnelerine* yazar. Bu şekilde belirtilen isim ile fonksiyonu veya sözleşmeyi çağırabiliriz. Benzer şekilde, tüm durumlar ve değişkenler için karşılık gelen fonksiyonlar yaratırız. Bu işlevler genellikle çok küçüktür ve sanal makine ağacını oluştururken bazı görevleri yerine getirir.
```
func fNameBlock(buf *[]*Block, state int, lexem *Lexem) error {
   var itype int
   prev := (*buf)[len(*buf)-2]
   fblock := (*buf)[len(*buf)-1]
   name := lexem.Value.(string)
   switch state {
      case stateBlock:
         itype = ObjContract
         name = StateName((*buf)[0].Info.(uint32), name)
         fblock.Info = &ContractInfo{ID: uint32(len(prev.Children) - 1), Name: name,
         Owner: (*buf)[0].Owner}
      default:
         itype = ObjFunc
         fblock.Info = &FuncInfo{}
   }
   fblock.Type = itype
   prev.Objects[name] = &ObjInfo{Type: itype, Value: fblock}
   return nil
}
```

**CompileBlock** işlevi için, tüm belirteçler arasında geçiş yapar ve durumlarda açıklanan belirteçlere göre durumları değiştirir. Hemen hemen tüm ek belirteçler, ek program kodlarına karşılık gelir.

* **statePush** – **Blok** nesnesini nesne ağacına ekler;
* **statePop** - blok bir kapatma braces ile sona erdiğinde kullanılır;
* **stateStay** - yeni bir duruma geçerken mevcut işareti korumanız gerekir;
* **stateToBlock** - *while* ve *if* işlemek için **stateBlock** durumuna geçiş. İfadeleri işledikten sonra, parantez içindeki blokları işlemeniz gerekir;
* **stateToBody** - **stateBody** durumuna geçiş;
* **stateFork** - işaretli konumu kaydedin. İfade bir tanımlayıcı veya `$` ile bir isim ile başladığında, fonksiyon çağrıları veya atamalar yapabiliriz;
* **stateToFork** – işlem işlevine iletilecek olan **stateFork** içinde saklanan belirteci almak için kullanılır;
* **stateLabel** – **cmdLabel** komutlarını eklemek için kullanılır. *while* yapısı bu bayrağı gerektirir;
* **stateMustEval** – *if* ve *while* yapılarının başında koşullu ifadelerin kullanılabilirliğini kontrol edin.

**CompileBlock** işlevine ek olarak, **FlushBlock** işlevinden de bahsedilmelidir. Ancak sorun, blok ağacının mevcut sanal makinelerden bağımsız olarak oluşturulmasıdır. Daha doğrusu sanal bir makinede var olan işlevler ve sözleşmeler hakkında bilgi alıyoruz ancak derlenen blokları ayrı bir ağaçta topluyoruz. Aksi halde derleme sırasında bir hata oluşursa sanal makineyi bir önceki duruma döndürmemiz gerekir. Bu nedenle derleme ağacına ayrı ayrı gidiyoruz fakat derleme başarılı olduktan sonra **FlushContract** fonksiyonu çağrılmalıdır. Bu işlev, tamamlanmış blok ağacını mevcut sanal makineye ekler. Derleme aşaması artık tamamlanmıştır.

## Lexical analizör {#lexical-analyzer}

Sözcüksel çözümleyici, gelen dizeleri işler ve aşağıdaki türlerde bir dizi belirteç oluşturur:

* **lexSys** - system token, örnek: `{}, [], (), ,, .` etc;
* **lexOper** - operation token, örnek: `+, -, /, \, *`;
* **lexNumber** - number;
* **lexident** - identifier;
* **lexNewline** - newline character;
* **lexString** - string;
* **lexComment** - comment;
* **lexKeyword** - keyword;
* **lexType** - type;
* **lexExtend** - harici değişkenlere veya fonksiyonlara referans, örneğin: `$myname`.

Mevcut sürümde, lex_table.go dosyasına yazılan belirteçleri ayrıştırmak için başlangıçta [script/lextable/lextable.go](#lextablelextablego) dosyası yardımıyla bir dönüşüm tablosu (sonlu durum makinesi) oluşturulur. Genel olarak, dosya tarafından başlangıçta oluşturulan dönüştürme tablosundan kurtulabilir ve başlangıçta hemen bellekte (`init()`) bir dönüştürme tablosu oluşturabilirsiniz. Sözcük analizinin kendisi [lex.go](#lex-go) dosyasındaki lexParser işlevinde gerçekleşir.

### lextable/lextable.go {#lextable-lextable-go}

Burada çalışacak alfabeyi tanımlıyoruz ve sonlu durum makinesinin bir sonraki alınan sembole göre bir durumdan diğerine nasıl değiştiğini açıklıyoruz.

*durumlar*, bir durum listesi içeren bir JSON nesnesidir.

Belirli semboller dışında, `d`, durumda belirtilmeyen tüm sembolleri ifade eder.
`n` 0x0a, `s` boşluk, `q` ters alıntı, `Q` çift tırnak, `r` >= 128, `a` AZ ve az ve `1` 1-9 anlamına gelir.

Bu durumların adı anahtarlardır ve olası değerler değer nesnesinde listelenir. Daha sonra her grup için geçiş yapılacak yeni bir durum vardır. Sonra jetonun adı var. İlk duruma geri dönmemiz gerekirse, üçüncü parametre, mevcut sembolün nasıl ele alınacağını gösteren hizmet simgesidir.

Örneğin, ana durumumuz ve gelen karakterler `/`, `"/": ["solidus", "", "push next"]`,

* **push** - gayrı bir yığında olduğunu hatırlama komutunu verir;
* **next** - sonraki karaktere gider ve aynı zamanda durumu **solidus** olarak değiştiririz. Bundan sonra, bir sonraki karakteri alır ve **solidus**'un durumunu kontrol edin.

Sonraki karakterde `/` veya `/*` varsa, o zaman `//` veya `/*` ile başladıkları için yorum **yorum** durumuna gideriz. Açıkçası, her yorumun daha sonra farklı bir durumu vardır, çünkü farklı bir sembolle biterler.

Sonraki karakter `/` ve `*` değilse, yığındaki her şeyi **lexOper** tipi etiketler olarak kaydeder, yığını temizler ve ana duruma döneriz.

Aşağıdaki modül, durum ağacını sayısal bir diziye dönüştürür ve onu *lex_table.go* dosyasına yazar.

İlk döngüde:

Geçerli sembollerden oluşan bir alfabe oluşturuyoruz.

```
for ind, ch := range alphabet {
   i := byte(ind)
```
Ek olarak, **state2int** içinde her duruma kendi dizi tanımlayıcısını sağlarız.

```
   state2int := map[string]uint{`main`: 0}
   if err := json.Unmarshal([]byte(states), &data); err == nil {
   for key := range data {
   if key != `main` {
   state2int[key] = uint(len(state2int))
```

Tüm durumları ve bir durumdaki her bir kümeyi ve bir kümedeki her bir sembolü geçtiğimizde, üç baytlık bir sayı yazarız [new state identifier (0 = main)] + [token type ( 0-no token)] + [token]. .
*table* dizisinin iki boyutluluğu, durumlara ve aynı sırada düzenlenmiş *alfabe* dizisinden 34 giriş sembolüne bölünmüş olmasıdır.
*Tablonun* sıfır satırında *main* durumundayız. İlk karakteri alın, *alphabet* dizisinde dizinini bulun ve verilen dizine sahip sütundan değeri alın. Alınan değerden başlayarak jetonu düşük bayt olarak alıyoruz. Ayrıştırma tamamlandıysa, ikinci bayt, alınan belirtecin türünü gösterir. Üçüncü baytta, bir sonraki yeni durumun indeksini alırız.
Bunların tümü *lex.go* içindeki **lexParser** işlevinde daha ayrıntılı olarak açıklanmıştır.
Bazı yeni karakterler eklemek istiyorsanız, bunları *alphabet* dizisine eklemeniz ve *AlphaSize* sabitinin miktarını artırmanız gerekir. Yeni bir sembol kombinasyonu eklemek isterseniz, mevcut seçeneklere benzer şekilde durum içinde açıklanmalıdır. Yukarıdaki işlemden sonra *lex_table.go* dosyasını güncellemek için *lextable.go* dosyasını çalıştırın.

### lex-go {#lex-go}
**lexParser** işlevi doğrudan sözcüksel analiz oluşturur ve gelen dizelere dayalı olarak bir dizi alınan etiket döndürür. Tokenların yapısını analiz edelim.
```
type Lexem struct {
   Type  uint32 // Type of the lexem
   Value interface{} // Value of lexem
   Line  uint32 // Line of the lexem
   Column uint32 // Position inside the line
}
```

* **Type** - belirteç türü. Aşağıdaki değerlerden birine sahiptir: `lexSys, lexOper, lexNumber, lexIdent, lexString, lexComment, lexKeyword, lexType, lexExtend`;
* **Value** – token değeri. Değerin türü, belirteç türüne bağlıdır, daha ayrıntılı olarak analiz edelim:
   * **lexSys** - parantez, virgül vb. içerir. Bu durumda, `Type = ch << 8 | lexSys`, lütfen `isLPar ... isRBrack` sabitine bakın ve değeri uint32 bittir;
   * **lexOper** - değer, uint32 biçimindeki eşdeğer bir karakter dizisini temsil eder. 'isNot ... isOr' sabitlerine bakın;
   * **lexNumber** - sayılar int64 veya float64 olarak saklanır. Sayının ondalık noktası varsa, float64'tür;
   * **lexIdent** - tanımlayıcılar dize olarak saklanır;
   * **lexNewLine** - yeni satır karakteri. Ayrıca satır ve token konumunu hesaplamak için kullanılır;
   * **lexString** - satırlar dize olarak saklanır;
   * **lexComment** - yorumlar dize olarak saklanır;
   * **lexKeyword** - anahtar sözcükler için yalnızca ilgili dizinler saklanır, bkz. `keyContract ... keyTail' sabiti. Bu durumda `Tür = AnahtarKimliği << 8 | lexKeyword`. Ayrıca, "true, false, nil" anahtar sözcüklerinin hemen lexNumber tipi belirteçlere dönüştürüleceği ve ilgili "bool" ve "interface {}" türlerinin kullanılacağına dikkat edilmelidir;
   * **lexType** – bu değer, karşılık gelen "reflect.Type" tipi değerini içerir;
   * **lexExtend** – `$` ile başlayan tanımlayıcılar. Bu değişkenler ve işlevler dışarıdan iletilir ve bu nedenle özel türdeki belirteçlere atanır. Bu değer, adı başında $ olmadan bir dize olarak içerir.
* **Line** - tokenın bulunduğu satır;
* **Column** - tokenın satır içi konumu.

**lexParser** işlevini ayrıntılı olarak analiz edelim. **todo** işlevi, mevcut duruma ve gelen sembole göre alfabedeki sembol dizinini arar ve dönüşüm tablosundan yeni bir durum, belirteç tanımlayıcısı (varsa) ve diğer belirteçleri alır. Ayrıştırmanın kendisi, her bir sonraki karakter için sırayla **todo** işlevini çağırmayı ve yeni bir duruma geçmeyi içerir. Etiket alındıktan sonra çıktı kriterlerinde karşılık gelen jetonu oluşturup ayrıştırma işlemine devam ediyoruz. Ayrıştırma işlemi sırasında belirteç sembollerini ayrı bir yığın veya dizide biriktirmediğimize dikkat edilmelidir, çünkü yalnızca belirtecin başlangıcının ofsetini kaydederiz. Belirteci aldıktan sonra, bir sonraki belirtecin ofsetini mevcut ayrıştırma konumuna taşırız.

Geriye kalan tek şey, ayrıştırmada kullanılan sözcüksel durum belirteçlerini kontrol etmektir:

* **lexfPush** - bu simge, yeni bir simgede simgeler biriktirmeye başladığımız anlamına gelir;
* **lexfNext** - karakter, geçerli simgeye eklenmelidir;
* **lexfPop** - tokenın alınması tamamlandı. Genellikle, bu bayrakla, ayrıştırılmış belirtecin tanımlayıcı türüne sahibiz;
* **lexfSkip** - bu token, karakterleri ayrıştırmanın dışında tutmak için kullanılır. Örneğin, dizgedeki kontrol eğik çizgileri \n \r \" şeklindedir. Sözcüksel analiz aşamasında bunlar otomatik olarak değiştirilecektir..

## Needle dili {#needle-language}
### Lexemes {#lexemes}

Bir programın kaynak kodu UTF-8 kodlamasında olmalıdır.

Aşağıdaki sözcük türleri işlenir:

* **Keywords** - ```action, break, conditions, continue, contract, data, else, error, false, func, If, info, nil, return, settings, true, var, warning, while```;
* **Number** - sadece ondalık sayılar kabul edilir. İki temel tür vardır: **int** ve **float**. Sayının ondalık noktası varsa, kayan nokta ** kayan nokta** olur. **int** türü, golang'da **int64** ile eşdeğerdir, **float** türü ise golang'da **float64** ile eşdeğerdir.
* **String** - dize ```("a dize")``` çift tırnak içine alınabilir veya ```(\`a dize\`)``` ters tırnak içine alınabilir. Her iki dize türü de yeni satır karakterleri içerebilir. Çift tırnak içindeki dizeler, çift tırnak, yeni satır karakterleri ve eğik çizgilerle kaçan satır başları içerebilir. Örneğin, ```"Bu bir \"ilk dizedir\".\r\nBu ikinci bir dizedir."```.
* **Comment** - iki tür yorum vardır. Tek satırlı yorumlar iki eğik çizgi (//) kullanır. Örneğin, // Bu tek satırlık bir yorumdur. Çok satırlı yorumlar eğik çizgi ve yıldız sembollerini kullanır ve birden çok satıra yayılabilir. Örneğin, ```/* Bu çok satırlı bir yorumdur */```.
* **Identifier** - a-z ve A-Z harfleri, UTF-8 sembolleri, sayılar ve alt çizgilerden oluşan değişkenlerin ve fonksiyonların adları. Ad bir harf, alt çizgi, ```@``` veya ```$``` ile başlayabilir. ```$``` ile başlayan ad, **data** tanımlanan değişkenin adıdır. ```$``` ile başlayan ad, **conditons** ve **actions** kapsamındaki global değişkenleri tanımlamak için de kullanılabilir. Ekosistem sözleşmeleri ```@``` sembolü kullanılarak çağrılabilir. Örneğin: ```@1NewTable(...)```.

### Türler {#types}

Karşılık gelen golang türleri, Needle türlerinin yanında belirtilir.

* **bool** - bool, **false** by default;
* **bytes** - []byte{}, an empty byte array by default;
* **int** - int64, **0** by default;
* **address** - uint64, **0** by default;
* **array** - []interface{}, an empty array by default;
* **map** - map[string]interface{}, an empty object array by default;
* **money** - decimal. Decimal, **0** by default;
* **float** - float64, **0** by default;
* **string** - string,;
* **file** - map[string]interface{}, varsayılan olarak boş bir nesne dizisi.

Bu tür değişkenler ```var``` anahtar kelimesi ile tanımlanır. Örneğin, ```var var1, var2 int```. Bu şekilde tanımlandığında, türe göre varsayılan bir değere sahip bir değişken atanacaktır.

Tüm değişken değerleri interface{} türündedir ve ardından gerekli golang türlerine atanır. Bu nedenle, örneğin dizi ve harita türleri, []interface{} ve map[array]interface{} golang türleridir. Her iki dizi türü de herhangi bir türden öğe içerebilir.

### Expressions {#expressions}

Bir ifade aritmetik işlemleri, mantıksal işlemleri ve işlev çağrılarını içerebilir. Tüm ifadeler, operatörlerin önceliğine göre soldan sağa doğru değerlendirilir. Eşit önceliğe sahipse, operatörler soldan sağa doğru değerlendirilir.

Yüksekten düşüğe operasyonların önceliği:

* **Function call and parentheses** - bir fonksiyon çağrıldığında, geçirilen parametreler soldan sağa doğru hesaplanır;
* **Unary Operation** - logical negation ```!``` and arithmetic sign change ```-```;
* **Multiplication and Division** - arithmetic multiplication ```*``` and division ```/```;
* **Addition and Subtraction** - arithmetic addition ```+``` and subtraction ```-```;
* **Logical comparison** - ```>=>> >=```;
* **Logical equality and inequality** - ```== !=```;
* **Logical AND** - ```&&```;
* **Logical OR** - ```||```.

Mantıksal AND ve OR değerlendirilirken, her durumda ifadenin her iki tarafı da değerlendirilir.

Derleme sırasında iğnenin tip kontrolü yoktur. İşlenenleri değerlendirirken, türü daha karmaşık bir türe dönüştürmeye çalışılır. Karmaşıklık sırasının türü şu şekilde olabilir: ```string, int, float, money```. Tür dönüşümlerinin yalnızca bir kısmı uygulanır. Dize türü, ekleme işlemlerini destekler ve sonuç, dize birleştirme olacaktır. Örneğin, ```string + string = string, money-int = para, int * float = float```.

İşlevler için, yürütme sırasında ```string``` ve ```int``` türlerinde tip kontrolü yapılır.

**array** ve **map** türleri dizine göre ele alınabilir. **array** türü için **int** değeri dizin olarak belirtilmelidir. **harita** türü için bir değişken veya **dize** değeri belirtilmelidir. Dizini mevcut maksimum dizinden büyük olan bir **array** öğesine bir değer atarsanız, diziye boş bir öğe eklenir. Bu öğelerin başlangıç ​​değeri **nil**'dir. Örneğin: .. code:
```
var my array
my[5] = 0
var mymap map
mymap["index"] = my[3]
```
Koşullu mantıksal değerlerin ifadelerinde (`if, while, &&, ||, !` gibi), tür otomatik olarak mantıksal bir değere dönüştürülür. Tür varsayılan değer değilse, doğrudur.
```
var mymap map
var val string
if mymap && val {
...
}
```
### Scope {#scope}

Parantezler, yerel kapsam değişkenlerini içerebilen bir blok belirtir. Varsayılan olarak, bir değişkenin kapsamı kendi bloklarına ve tüm iç içe bloklara uzanır. Bir blokta, mevcut bir değişkenin adını kullanarak yeni bir değişken tanımlayabilirsiniz. Ancak bu durumda aynı ada sahip harici değişkenler kullanılamaz hale gelir.
```
var a int
a = 3
{
   var a int
   a = 4
   Println(a) // 4
}
Println(a) // 3
```

### Kontrat Yürütme {#contract-execution}

Bir kontratı çağırırken, **data** içinde tanımlanan parametreler ona iletilmelidir. Bir kontratı yürütmeden önce sanal makine bu parametreleri alır ve bunları karşılık gelen değişkenlere ($Param) atar. Ardından, önceden tanımlanmış **conditons** işlevi ve **action** işlevi çağrılır.

Kontratın yürütülmesi sırasında meydana gelen hatalar iki türe ayrılabilir: form hataları ve ortam hataları. Form hataları özel komutlar kullanılarak oluşturulur: `error, Warning, info` ve yerleşik işlev `err` döndürdüğünde *nil* değerine eşit değildir.

Needle dili istisnaları işlemez. Herhangi bir hata, sözleşmelerin yürütülmesini sonlandıracaktır. Bir sözleşme yürütüldüğünde değişken değerleri kaydetmek için ayrı bir yığın ve yapı oluşturulduğundan, bir sözleşme yürütüldüğünde golang garbage collection tarafından bu verileri otomatik olarak siler.

### Backus–Naur Form (BNF) {#backus-naur-form-bnf}

Bilgisayar biliminde BNF, bağlamdan bağımsız sözdizimi için bir gösterim tekniğidir ve genellikle hesaplamada kullanılan dilin sözdizimini tanımlamak için kullanılır.

* &lt;decimal digit&gt;
```
'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
```

* &lt;decimal number&gt;
```
<decimal digit> {<decimal digit>}
```

* &lt;symbol code&gt;
```
'''<any symbol>'''
```

* &lt;real number&gt;
```
['-'] <decimal number'.'[<decimal number>]
```

* &lt;integer number&gt;
```
['-'] <decimal number> | <symbol code>
```

* &lt;number&gt;
```
'<integer number> | <real number>'
```

* &lt;letter&gt;
```
'A' |'B' | ... |'Z' |'a' |'b' | ... |'z' | 0x80 | 0x81 | ... | 0xFF
```

* &lt;space&gt;
```
'0x20'
```

* &lt;tabulation&gt;
```
'0x09'
```

* &lt;newline&gt;
```
'0x0D 0x0A'
```

* &lt;special symbol&gt;
```
'!' |'"' |'$' |''' |'(' |')' |'\*' |'+' |',' |'-' |'.' |'/ '|'<' |'=' |'>' |'[' |'\\' |']' |'_' |'|' |'}' | '{' | <tabulation> | <space> | <newline>
```

* &lt;symbol&gt;
```
<decimal digit> | <letter> | <special symbol>
```

* &lt;name&gt;
```
(<letter> |'_') {<letter> |'_' | <decimal digit>}
```

* &lt;function name&gt;
```
<name>
```

* &lt;variable name&gt;
```
<name>
```

* &lt;type name&gt;
```
<name>
```

* &lt;string symbol&gt;
```
<tabulation> | <space> |'!' |'#' | ... |'[' |']' | ...
```

* &lt;string element&gt;
```
{<string symbol> |'\"' |'\n' |'\r'}
```

* &lt;string&gt;
```
'"' {<string element>}'"' |'\`' {<string element>}'\`'
```

* &lt;assignment operator&gt;
```
'='
```

* &lt;unary operator&gt;
```
'-'
```

* &lt;binary operator&gt;
```
'==' |'!=' |'>' |'<' |'<=' |'>=' |'&&' |'||' |'\*' |'/' |'+ '|'-'
```

* &lt;operator&gt;
```
<assignment operator> | <unary operator> | <binary operator>
```

* &lt;parameters&gt;
```
<expression> {','<expression>}
```

* &lt;contract call&gt;
```
<contract name>'(' [<parameters>]')'
```

* &lt;function call&gt;
```
<contract call> [{'.' <name>'(' [<parameters>]')'}]
```

* &lt;block contents&gt;
```
<block command> {<newline><block command>}
```

* &lt;block&gt;
```
'{'<block contents>'}'
```

* &lt;block command&gt;
```
(<block> | <expression> | <variables definition> | <if> | <while> | break | continue | return)
```

* &lt;if&gt;
```
'if <expression><block> [else <block>]'
```

* &lt;while&gt;
```
'while <expression><block>'
```

* &lt;contract&gt;
```
'contract <name> '{'[<data section>] {<function>} [<conditions>] [<action>]'}''
```

* &lt;data section&gt;
```
'data '{' {<data parameter><newline>} '}''
```

* &lt;data parameter&gt;
```
<variable name> <type name>'"'{<tag>}'"'
```

* &lt;tag&gt;
```
'optional | image | file | hidden | text | polymap | map | address | signature:<name>'
```

* &lt;conditions&gt;
```
'conditions <block>'
```

* &lt;action&gt;
```
'action <block>'
```

* &lt;function&gt;
```
'func <function name>'('[<variable description>{','<variable description>}]')'[{<tail>}] [<type name>] <block>'
```

* &lt;variable description&gt;
```
<variable name> {',' <variable name>} <type name>
```

* &lt;tail&gt;
```
'.'<function name>'('[<variable description>{','<variable description>}]')'
```

* &lt;variables definition&gt;
```
'var <variable description>{','<variable description>}'
```