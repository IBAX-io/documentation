
# Akıllı kontratlar
  - [Kontrat Yapısı](#Kontrat-yapısı)
    - [Data section](#data-section)
    - [Conditions section](#conditions-section)
    - [Action section](#action-section)
  - [Değişkenler](#Değişkenler)
  - [İç İçe Sözleşmeler](#İç-İçe-Sözleşmeler)
  - [Dosya Yükleme](#Dosya-Yükleme)
  - [Json formatında sorgular](#Json-formatında-sorgular)
  - [Tarih ve saat işlemleri içeren sorgular](#Tarih-ve-saat-işlemleri-içeren-sorgular)
  - [Needle sözleşme dili](#Needle-sözleşme-dili)
    - [Temel elemanlar ve yapı](#Temel-elemanlar-ve-yapı)
    - [Veri türleri ve değişkenler](#Veri-türleri-ve-değişkenler)
    - [Dizi](#Dizi)
    - [If ve While ifadeleri](#If-ve-While-ifadeleri)
  - [Fonksiyonlar](#Fonksiyonlar)
    - [Fonksiyon atamaları](#Fonksiyon-atamaları)
    - [Değişken-uzunluklu parametreler](#Değişken-uzunluklu-parametreler)
    - [Opsiyonel parametreler](#Opsiyonel-parametreler)
  - [Needle fonksiyonlarının sınıflandırılması](#Needle-fonksiyonlarının-sınıflandırılması)
  - [Needle fonksiyonları referansı](#Needle-fonksiyonları-referansı)
    - [AppParam](#appparam)
    - [DBFind](#dbfind)
    - [DBRow](#dbrow)
    - [DBSelectMetrics](#dbselectmetrics)
    - [EcosysParam](#ecosysparam)
    - [GetHistory](#gethistory)
    - [GetHistoryRow](#gethistoryrow)
    - [GetColumnType](#getcolumntype)
    - [GetDataFromXLSX](#getdatafromxlsx)
    - [GetRowsCountXLSX](#getrowscountxlsx)
    - [LangRes](#langres)
    - [GetBlock](#getblock)
    - [DBInsert](#dbinsert)
    - [DBUpdate](#dbupdate)
    - [DBUpdateExt](#dbupdateext)
    - [DelColumn](#delcolumn)
    - [DelTable](#deltable)
    - [Append](#append)
    - [Join](#join)
    - [Split](#split)
    - [Len](#len)
    - [Row](#row)
    - [One](#one)
    - [GetMapKeys](#getmapkeys)
    - [SortedKeys](#sortedkeys)
    - [CallContract](#callcontract)
    - [ContractAccess](#contractaccess)
    - [ContractConditions](#contractconditions)
    - [EvalCondition](#evalcondition)
    - [GetContractById](#getcontractbyid)
    - [GetContractByName](#getcontractbyname)
    - [RoleAccess](#roleaccess)
    - [TransactionInfo](#transactioninfo)
    - [Throw](#throw)
    - [ValidateCondition](#validatecondition)
    - [AddressToId](#addresstoid)
    - [IdToAddress](#idtoaddress)
    - [PubToID](#pubtoid)
    - [DecodeBase64](#decodebase64)
    - [EncodeBase64](#encodebase64)
    - [Float](#float)
    - [HexToBytes](#hextobytes)
    - [FormatMoney](#formatmoney)
    - [Random](#random)
    - [Int](#int)
    - [Hash](#hash)
    - [Sha256](#sha256)
    - [Str](#str)
    - [JSONEncode](#jsonencode)
    - [JSONEncodeIndent](#jsonencodeindent)
    - [JSONDecode](#jsondecode)
    - [HasPrefix](#hasprefix)
    - [Contains](#contains)
    - [Replace](#replace)
    - [Size](#size)
    - [Sprintf](#sprintf)
    - [Substr](#substr)
    - [ToLower](#tolower)
    - [ToUpper](#toupper)
    - [TrimSpace](#trimspace)
    - [Floor](#floor)
    - [Log](#log)
    - [Log10](#log10)
    - [Pow](#pow)
    - [Round](#round)
    - [Sqrt](#sqrt)
    - [StringToBytes](#stringtobytes)
    - [BytesToString](#bytestostring)
    - [SysParamString](#sysparamstring)
    - [SysParamInt](#sysparamint)
    - [DBUpdateSysParam](#dbupdatesysparam)
    - [UpdateNotifications](#updatenotifications)
    - [UpdateRolesNotifications](#updaterolesnotifications)
    - [HTTPRequest](#httprequest)
    - [HTTPPostJSON](#httppostjson)
    - [BlockTime](#blocktime)
    - [DateTime](#datetime)
    - [UnixDateTime](#unixdatetime)
    - [CreateOBS](#createobs)
    - [GetOBSList](#getobslist)
    - [RunOBS](#runobs)
    - [StopOBS](#stopobs)
    - [RemoveOBS](#removeobs)
  - [System Contracts](#system-contracts)
    - [NewEcosystem](#newecosystem)
    - [EditEcosystemName](#editecosystemname)
    - [NewContract](#newcontract)
    - [EditContract](#editcontract)
    - [BindWallet](#bindwallet)
    - [UnbindWallet](#unbindwallet)
    - [NewParameter](#newparameter)
    - [EditParameter](#editparameter)
    - [NewMenu](#newmenu)
    - [EditMenu](#editmenu)
    - [AppendMenu](#appendmenu)
    - [NewPage](#newpage)
    - [EditPage](#editpage)
    - [AppendPage](#appendpage)
    - [NewBlock](#newblock)
    - [EditBlock](#editblock)
    - [NewTable](#newtable)
    - [EditTable](#edittable)
    - [NewColumn](#newcolumn)
    - [EditColumn](#editcolumn)
    - [NewLang](#newlang)
    - [EditLang](#editlang)
    - [Import](#import)
    - [ImportUpload](#importupload)
    - [NewAppParam](#newappparam)
    - [EditAppParam](#editappparam)
    - [NewDelayedContract](#newdelayedcontract)
    - [EditDelayedContract](#editdelayedcontract)
    - [UploadBinary](#uploadbinary)


Akıllı Sözleşme (bundan böyle Sözleşme olarak anılacaktır), bir uygulamanın temel unsurlarından biridir. Kullanıcı tarafından bir sayfada bir sözleşmenin uygulanması genellikle tek bir işlemdir ve amacı bir veritabanı girdisini güncellemek veya oluşturmaktır. Bir uygulamanın tüm veri işlemleri bir sözleşme sistemi oluşturur ve bu sözleşmeler, veritabanı veya sözleşme içeriği işlevleri aracılığıyla birbirleriyle etkileşime girer.

## Kontrat yapısı

Bir sözleşme bildirmek için `contract` anahtar sözcüğünü, ardından kontrat adını kullanın ve kontrat içeriği parantez içine alınmalıdır. Bir kontrat temel olarak üç bölümden oluşur:

1. **data** - [data section](#data-section), değişken adı ve değişken türü dahil olmak üzere giriş verilerinin değişkenlerini bildirir;

2. **conditions** - [conditions section](#conditions-section), nerede verilerin doğruluğunu onaylar;

3. **action** - [action section](#action-section), nerede veri manipülasyonlarını tanımlar.
```
contract MyContract {
  data {
    FromId int
    ToId int
    Amount money
  }
  func conditions {
    ...
  }
  func action {
    ...
  }
}
```



### Data section

`Data` bölümü, sözleşme veri girişlerini ve alınan form parametrelerini açıklar.

Her satırın sıraya göre yapısı:

* Değişken adı - dizileri değil, yalnızca değişkenleri alır;
* Değişken veri türü - değişkenin [veri türü](#veri-tipleri-ve-değişkenleri);
* isteğe bağlı - form öğesini doldurması gerekmeyen isteğe bağlı bir parametre.

```
contract my {
  data {
  Name string
  RequestId int
  Photo file "optional"
  Amount money
  Private bytes
  }
  ...
}
```



### Conditions section

`conditions` bölümü, alınan verilerin doğrulanmasını açıklar.

Hata uyarıları için şu komutlar kullanılır: ciddi hatalar `error`, uyarı hataları `warning`, düşündürücü hatalar `info`. Bu üç komut, sözleşmelerin yürütülmesini sonlandıran bir hata üretecek ve her hata, farklı türde bir hata günlüğü bilgisi yazdıracaktır. Örneğin:

```
if fuel == 0 {
    error "fuel cannot be zero!"
}
if money < limit {
    warning Sprintf("You don't have enough money: %v <%v", money, limit)
}
if idexist > 0 {
    info "You have already been registered"
}
```

### Action section

`action` bölümü, diğer verileri alan ve sonuç değerlerini tablolara kaydeden sözleşmenin ana kodunu açıklar. Örneğin:

```
action {
DBUpdate("keys", $key_id, {"-amount": $amount})
DBUpdate("keys", $recipient, {"+amount": $amount, "pub": $Pub})
}
```



## Değişkenler

Veri bölümünde bildirilen değişkenler, değişken adının ardından `$` sembolü ile diğer sözleşme bölümlerine iletilir. `$` sembolü, bu sözleşmenin ve bu sözleşmenin iç içe olduğu tüm sözleşmelerin global değişkenleri olarak kabul edilen veri bölümünde olmayan diğer değişkenleri bildirmek için de kullanılabilir.

Önceden tanımlanmış değişkenler, sözleşme olarak adlandırılan işlem verilerini içeren sözleşmelerde kullanılabilir:

* `$time` - işlem timestamp;
* `$ecosystem_id` - ekosistem ID;
* `$block` - İşlemi içeren bloğun ID'si;
* `$key_id` - cari işlemi imzalayan hesabın adresi;
* `$type` - sanal makinede sözleşme kimliği;
* `$block_key_id` - bloğu oluşturan düğümün hesap adresi;
* `$block_time` - blok oluşturma zaman damgası;
* `$original_contract` - başlangıçta işlemi işleyen sözleşmenin adı. Değişken boş bir dize ise, sözleşmenin işlem doğrulaması sırasında çağrıldığı anlamına gelir. Sözleşmenin başka bir sözleşme tarafından mı yoksa doğrudan işlem tarafından mı çağrıldığını kontrol etmek için $original_contract ve $this_contract değerlerini karşılaştırmanız gerekir. Bu, sözleşmenin eşit olmaları durumunda işlem tarafından çağrıldığı anlamına gelir;
* `$this_contract` - şu anda yürütülmekte olan sözleşmenin adı;
* `$guest_key` - misafir hesabı adresi;
* `$stack` - yürütülen tüm sözleşmeleri içeren bir dizi veri türü içeren sözleşme dizisi yığını. Dizinin ilk öğesi, şu anda yürütülmekte olan sözleşmenin adını temsil ederken, son öğe işlemi ilk olarak işleyen sözleşmenin adını temsil eder;
* `$node_position` - bloğun bulunduğu doğrulama düğümü dizisinin dizin numarası;
* `$txhash` - işlem karması;
* `$contract` - mevcut sözleşme yapısı dizisi;

Önceden tanımlanmış değişkenlere yalnızca sözleşmelerde değil, uygulama öğelerinin erişim izin koşullarını tanımlayan izin alanlarında da erişilebilir. İzin alanlarında kullanıldığında, blok bilgileri için önceden tanımlanmış değişkenler her zaman sıfıra eşittir, örneğin: `$time`, `$block`, vb.

Sözleşmenin dönüş sonucuyla önceden tanımlanmış bir `$result` değişkeni olarak atanır.

```
contract my {
 data {
     Name string
     Amount money
 }
 func conditions {
     if $Amount <= 0 {
     error "Amount cannot be 0"
     }
     $ownerId = 1232
 }
 func action {
     var amount money
     amount = $Amount - 10
     DBUpdate("mytable", $ownerId, {name: $Name,amount: amount})
     DBUpdate("mytable2", $ownerId, {amount: 10})
 }
}
```

## İç İçe Sözleşmeler

Sözleşmeleri, sözleşmenin koşullar ve eylem bölümlerine yerleştirebilirsiniz. İç içe sözleşmeler doğrudan çağrılabilir ve sözleşme parametreleri, sözleşme adından sonra parantez içinde belirtilir, örneğin, `@1NameContract(Params)`. [CallContract](#callcontract) işleviyle iç içe sözleşmeleri de çağırabilirsiniz.

## Dosya Yükleme


`multipart/form-data` formatında bir form kullanarak dosya yükleme için, sözleşmenin veri tipi `file` olmalıdır.

```
contract Upload {
     data {
  	   File file
     }
     ...
}
```

Dosyaları depolamak için  [UploadBinary](#uploadbinary) sözleşmesi kullanılır.Sayfa düzenleyicideki Logicor dil işlevi [Binary](templates2.md#binary) ile dosya indirme bağlantısını alabilirisiniz.

## Json formatında sorgular

Sözleşme dilinde **JSON** alan türü olarak belirtilebilir. Giriş alanını işlemek için **columnname->fieldname** söz dizimini kullanabilirsiniz. Elde edilen değer **columnname.fieldname** içine kaydedilir. Yukarıdaki sözdizimi, [DBFind](#dbfind) işlevinin Columns,One,Where bölümünde kullanılabilir.

```
var ret map
var val str
var list array
ret = DBFind("mytable").Columns("myname,doc,doc->ind").WhereId($Id).Row()
val = ret["doc.ind"]
val = DBFind("mytable").Columns("myname,doc->type").WhereId($Id).One("doc->type")
list = DBFind("mytable").Columns("myname,doc,doc->ind").Where("doc->ind = ?", "101")
val = DBFind("mytable").WhereId($Id).One("doc->check")
```



## Tarih ve saat işlemleri içeren sorgular

Sözleşme dili işlevleriyle tarih ve saati doğrudan sorgulayıp güncelleyemezsiniz ancak aşağıdaki örnekte olduğu gibi Where deyiminde PostgreSQL işlevlerini ve özelliklerini kullanabilirsiniz.Örneğin, tarih_sütun alanını geçerli saatle karşılaştırmanız gerekir. tarih_sütun bir zaman damgası türüyse, ifade `date_column <NOW()`; olmalıdır; tarih_sütun bir Unix türüyse, ifade `to_timestamp(date_column)> NOW()` olmalıdır.

```
Where("to_timestamp(date_column)> NOW()")
Where("date_column <NOW() - 30 * interval '1 day'")
```

Tarih ve saati SQL formatında işlemek için aşağıdaki "needle" işlevi kullanılır:

* [BlockTime](#blocktime)
* [DateTime](#datetime)
* [UnixDateTime](#unixdatetime)

## Needle sözleşme dili

Sözleşme dili, veri algoritması işleme ve veritabanı işlemlerini gerçekleştirebilen bir dizi fonksiyon, operatör ve yapı içerir.

Sözleşme düzenleme izni `false` olarak ayarlanmazsa sözleşme içeriği değiştirilebilir. Sözleşme değişikliklerinin tam geçmişi, Weaver'da bulunan blok zincirinde saklanır.

Blok zincirindeki veri işlemleri, sözleşmenin en son versiyonuna uygun olarak yürütülür.
### Temel elemanlar ve yapı

### Veri türleri ve değişkenler

Her değişken için veri tipi tanımlanmalıdır. Normalde, veri türleri otomatik olarak dönüştürülür. Aşağıdaki veri türleri kullanılabilir:


* `bool` - Boolean, `true` or `false`;
* `bytes` - a byte format;
* `Int` - a 64-bit integer;
* `Array` - an array of any type;
* `map` - an object array;
* `money` - a big integer;
* `float` - a 64-bit float number;
* `string` - a string must be defined with double quotes or escape format: "This is a string" or \`This is a string\`;
* `file` - an object array:
  * `Name` - file name, `string` type;
  * `MimeType` - **mime-type** file, `string` type;
  * `Body` - file content, `bytes` type.

Değişkenlerin, içindekin ve sözleşmelerin tüm içeriği büyük/küçük harfe duyarlıdır (MyFunc myFunc farklı reklamlardır).


Bir değişken bildirmek için **var** anahtar sözcüğünü, ardından değişkenin adını ve türünü kullanın. Parantez içinde belirtilen değişkenler aynı parantez çiftinde kullanılmalıdır.

Bildirilen herhangi bir değişkenin varsayılan değeri sıfırdır: bool türünün sıfır değeri false, tüm sayısal türlerin sıfır değeri 0 ve dizeler için sıfır değeri, boş dizeler. Değişken bildirimine bir örnek:

```
func myfunc( val int) int {
  var mystr1 mystr2 string, mypar int
  var checked bool
  ...
  if checked {
    var temp int
    ...
  }
}
```



### Dizi

Sözleşme dili iki dizi türünü destekler:
* `Array` - 0'dan başlayan dizine sahip bir dizi;
* `map` - bir dizi nesnesi.

Dizi öğelerini tahsis ederken ve alırken, dizin köşeli parantez içinde yerleştirilmelidir. Dizide birden çok dizin desteklenmez ve dizi öğeleri myarr[i][j] olarak değerlendirilemez.


```
var myarr array
var mymap map
var s string

myarr[0] = 100
myarr[1] = "This is a line"
mymap["value"] = 777
mymap["param"] = "Parameter"

s = Sprintf("%v, %v, %v", myarr[0] + mymap["value"], myarr[1], mymap["param"])
// s = 877, This is a line, Parameter
```

`[]` içinde öğeleri belirterek dizi türünde diziler de tanımlayabilirsiniz. Harita türü `arrays` için lütfen `{}` kullanın.


```
var my map
my={"key1": "value1", key2: i, "key3": $Name}
var mya array
mya=["value1", {key2: i}, $Name]
```

Bu tür bir başlatmayı ifadelerde kullanabilirsiniz. Örneğin, fonksiyon parametrelerinde kullanın.


```
DBFind...Where({id: 1})
```

Bir dizi nesne için bir anahtar belirtmelisiniz. Anahtar, çift tırnak (`""`) içinde dizeler olarak belirtilir. Anahtar adı harfler, sayılar ve alt çizgilerle sınırlıysa çift tırnak işaretlerini atlayabilirsiniz.


```
{key1: "value1", key2: "value2"}
```

Bir dizi, dizeler, sayılar, herhangi bir türdeki değişken adları ve `$` sembolüyle değişken adları içerebilir. İç içe dizileri destekler. Değer olarak farklı haritalar veya diziler belirleyebilirsiniz.

İfadeler dizi öğeleri olarak kullanılamaz. İfade sonucunu saklamak için bir değişken kullanın ve bu değişkeni bir dizi öğesi olarak belirtin.

```
[1+2, myfunc(), name["param"]] // don't do this
[1, 3.4, mystr, "string", $ext, myarr, mymap, {"ids": [1,2, i], company: {"Name": "MyCompany"}} ] // this is ok

var val string
val = my["param"]
MyFunc({key: val, sub: {name: "My name", "color": "Red"}})
```

### If ve While ifadeleri

Sözleşme dili, sözleşmelerde ve işlevlerde kullanılabilen standart **if** koşullu ifadeleri ve **while** döngülerini destekler. Bu ifadeler iç içe yerleştirilebilir.


**if** ve **while**'dan sonra bir koşullu ifade gelmelidir. Koşullu ifade bir sayı döndürürse, değeri 0 olduğunda yanlış olarak kabul edilir.


val == 0, !val'e eşittir, val != 0, val'e eşittir. **if** ifadesi bir **else** kod bloğuna sahip olabilir ve **else**, **if** koşullu ifadesi yanlış olduğunda yürütülür.

Aşağıdaki karşılaştırma operatörleri koşullu ifadelerde kullanılabilir: `<, >, >=, <=, ==, !=, ||, &&`


```
if val> 10 || id != $block_key_id {
 ...
} else {
 ...
}
```

**while** döngüsünün koşullu ifadesi doğru olduğunda kod bloğu yürütülür. **break**, kod bloğunun döngüsünü sonlandırmak anlamına gelir. Bir döngüyü baştan başlatmak istiyorsanız, **devam**'ı kullanın.

```
var i int
while true {
  if i > 100 {
    break
  }
  ...
  if i == 50 {
    continue
  }
  ...
  i = i + 1
}
```

Needle, koşullu ifadelere ek olarak standart aritmetik işlemleri de destekler: `+`, `-`, `*`, `/`.

Dize ve bayt türlerinin değişkenleri koşullu bir ifade olarak kullanılabilir. Türün uzunluğu sıfırdan büyükse koşul doğrudur, aksi takdirde yanlıştır.

## Fonksiyonlar

İşlevler, bir sözleşmenin [data section](#data-section) tarafından alınan veriler üzerinde bazı işlemler gerçekleştirebilir: veritabanından veri okuma ve yazma, değer türünü dönüştürme ve sözleşmeler arasındaki etkileşimi oluşturma.


### Fonksiyon atamaları

Bir işlevi bildirmek için func anahtar sözcüğünü kullanın, ardından ad ve ona iletilen parametrelerin listesi ve türleri. Tüm parametreler parantez içine alınır ve virgülle ayrılır. Parantezlerden sonra fonksiyonun döndürdüğü değerin veri tipi bildirilmelidir. Fonksiyon gövdesi parantez içine alınmalıdır. Fonksiyonun parametresi yoksa, parantezler atlanabilir. Bir fonksiyondan değer döndürmek için `return` anahtar sözcüğünü kullanın.


```
func myfunc(left int, right int) int {
    return left*right + left - right
}
func test int {
    return myfunc(10, 30) + myfunc(20, 50)
}
func ooops {
    error "Ooops..."
}
```

Tüm hata kontrolleri otomatik olarak yapıldığından, fonksiyon hata döndürmez. Herhangi bir fonksiyonda bir hata varsa, sözleşme çalışmasını sonlandıracak ve hata açıklamasını bir pencerede sunacaktır.

### Değişken-uzunluklu parametreler

Fonksiyonlar değişken uzunluklu parametreleri tanımlayabilir, değişken uzunluklu parametreleri belirtmek için fonksiyonun son parametre tipi olarak  `...` sembolünü bir veri tipi `array` ile kullanabilir. Değişken uzunluklu parametreler, parametrenin çağrıda geçirildiği zamandan itibaren tüm değişkenleri içerir. Tüm değişken türleri iletilebilir, ancak veri türlerinin uyumsuzluğundan kaynaklanan çatışmalarla uğraşmanız gerekir.


```
func sum(out string, values ...) {
var i, res int

while i <Len(values) {

   res = res + values[i]

   i = i + 1

}

Println(out, res)

}

func main() {
  sum("Sum:", 10, 20, 30, 40)
}
```



### Opsiyonel parametreler

Bir fonksiyonun birçok parametresi vardır, ancak sadece bazılarına onu çağırırken ihtiyacımız var. Bu durumda, isteğe bağlı parametreleri şu şekilde bildirebilirsiniz: `func myfunc(name string).Param1(param string).Param2(param2 int) {...}`, ardından belirtilen parametreleri herhangi bir sırayla çağırabilirsiniz. : `myfunc("name").Param2(100)`.

İşlev gövdesinde bu değişkenleri normal şekilde işleyebilirsiniz. Belirtilen isteğe bağlı parametre çağrılmazsa, varsayılan değerleri sıfırdır. Değişken uzunluklu bir parametre belirtmek için de ... kullanabilirsiniz: `func DBFind(table string).Where(request string, params ...)` ve sonra onu çağırın: `DBFind("mytable").Where({" id": $myid, "type": 2})`

```
func DBFind(table string).Columns(columns string).Where(format string, tail ...)
  .Limit(limit int).Offset(offset int) string {
  ...
}

func names() string {
  ...
  return DBFind("table").Columns("name").Where({"id": 100}).Limit(1)
}
```

## Needle fonksiyonlarının sınıflandırılması

Veritabanından değerlerin alınması:

|                 |               |                 |
| --------------- | ------------- | --------------- |
| [AppParam](#appparam)        | [EcosysParam](#ecosysparam)   | [GetDataFromXLSX](#getdatafromxlsx) |
| [DBFind](#dbfind)          | [GetHistory](#gethistory)    | [GetRowsCountXLSX](#getrowscountxlsx) |
| [DBRow](#dbrow)           | [GetHistoryRow](#gethistoryrow) | [GetBlock](#getblock)        |
| [DBSelectMetrics](#dbselectmetrics) | [GetColumnType](#getcolumntype) | [LangRes](#langres)         |


Tablolardaki verileri güncelleme:

|          |             |          |
| -------- | ----------- | -------- |
| [DBInsert](#dbinsert) | [DBUpdateExt](#dbupdateext) | [DelTable](#deltable) |
| [DBUpdate](#dbupdate) | [DelColumn](#delcolumn)   |          |

Dizilerle yapılan işlemler:

|        |      |            |
| ------ | ---- | ---------- |
| [Append](#append) | [Len](#len)  | [GetMapKeys](#getmapkeys) |
| [Join](#join)   | [Row](#row)  | [SortedKeys](#sortedkeys) |
| [Split](#split)  | [One](#one)  |            |

Sözleşmeli ve izinli işlemler:

|                    |                   |                   |
| ------------------ | ----------------- | ----------------- |
| [CallContract](#callcontract)       | [GetContractById](#getcontractbyid)   | [TransactionInfo](#transactioninfo)   |
| [ContractAccess](#contractaccess)     | [RoleAccess](#roleaccess)        | [Throw](#throw)             |
| [ContractConditions](#contractconditions) | [GetContractByName](#getcontractbyname) | [ValidateCondition](#validatecondition) |
| [EvalCondition](#evalcondition)      |                   |                   |


Adreslerle yapılan işlemler:

|             |             |         |
| ----------- | ----------- | ------- |
| [AddressToId](#addresstoid) | [IdToAddress](#idtoaddress) | [PubToID](#pubtoid) |


Değişken değerlere sahip işlemler:

|              |             |        |
| ------------ | ----------- | ------ |
| [DecodeBase64](#decodebase64) | [FormatMoney](#formatmoney) | [Hash](#hash)   |
| [EncodeBase64](#encodebase64) | [Random](#random)      | [Sha256](#sha256) |
| [Float](#float)        | [Int](#int)         | [Str](#str)    |
| [HexToBytes](#hextobytes)   |             |        |


Aritmetik işlemler:

|       |       |       |
| ----- | ----- | ----- |
| [Floor](#floor) | [Log10](#log10) | [Round](#round) |
| [Log](#log)   | [Pow](#pow)   | [Sqrt](#sqrt)  |




JSON ile işlemler:

|            |                  |            |
| ---------- | ---------------- | ---------- |
| [JSONEncode](#jsonencode) | [JSONEncodeIndent](#jsonencodeindent) | [JSONDecode](#jsondecode) |


Dizelerle(strings) işlemler:


|           |         |           |
| --------- | ------- | --------- |
| [HasPrefix](#hasprefix) | [Size](#size)    | [ToLower](#tolower)   |
| [Contains](#contains)  | [Sprintf](#sprintf) | [ToUpper](#toupper)   |
| [Replace](#replace)   | [Substr](#substr)  | [TrimSpace](#trimspace) |


Bayt içeren işlemler:


|               |               |      |
| ------------- | ------------- | ---- |
| [StringToBytes](#stringtobytes) | [BytesToString](#bytestostring) |      |


SQL formatında tarih ve saat içeren işlemler:

|           |          |              |
| --------- | -------- | ------------ |
| [BlockTime](#blocktime) | [DateTime](#datetime) | [UnixDateTime](#unixdatetime) |


Platform parametreleri ile işlemler:

|             |              |      |
| ----------- | ------------ | ---- |
| [HTTPRequest](#httprequest) | [HTTPPostJSON](#httppostjson) |      |




Ana CLB düğümleri için işlevler(CLB nodes):


|            |         |           |
| ---------- | ------- | --------- |
| [CreateOBS](#createobs)  | [RunOBS](#runobs)  | [RemoveOBS](#removeobs) |
| [GetOBSList](#getobslist) | [StopOBS](#stopobs) |           |



## Needle fonksiyonları referansı


### AppParam

Returns the value of a specified application parameter (from the application parameter table app_params).

#### Syntax (Sözdizimi)

```
AppParam(app int, name string, ecosystemid int) string
```

* **App**

  Uygulama ID.

* **name**

    Uygulama parametresi ID.

* **Ecosystemid**

    Ekosistem ID.

#### Örnek

```
AppParam(1, "app_account", 1)
```



### DBFind - DBBul

Belirtilen parametrelerle belirtilen bir tablodan veri sorgular ve bir dizi nesne haritasından oluşan bir dizi dizisi döndürür.

`.Row()` sorgudaki ilk harita öğesini alabilir, `.One(column string)` sorguda belirtilen bir sütunun ilk harita öğesini alabilir.


#### Sözdizimi

```
DBFind(table string)
 [.Columns(columns array|string)]
 [.Where(where map)]
 [.WhereId(id int)]
 [.Order(order string)]
 [.Limit(limit int)]
 [.Offset(offset int)]
 [.Row()]
 [.One(column string)]
 [.Ecosystem(ecosystemid int)] array
```

* **table**

  Tablo adı.

* **сolumns**

  Sütunların bir listesini döndürür. Belirtilmezse, tüm sütunlar döndürülür.

  Değer, virgülle ayrılmış bir dizi veya dizedir.

* **where**

  Sorgu koşulları.

  Örnek: `.Where({name: "John"})` veya `.Where({"id": {"$gte": 4}})`.

  Bu parametre, arama kriterlerine sahip bir dizi nesne içermelidir. Dizi iç içe öğeler içerebilir.

  Aşağıdaki sözdizimsel yapılar kullanılır:

  * `{"field1": "value1", "field2": "value2"}`
     Equivalent to `field1 = "value1" AND field2 = "value2"`.

  * `{"field1": {"$eq":"value"}}`
     Equivalent to `field = "value"`.

  * `{"field1": {"$neq": "value"}}`
     Equivalent to `field != "value"`.

  * `{"field1: {"$in": [1,2,3]}`
     Equivalent to `field IN (1,2,3)`.

  * `{"field1": {"$nin": [1,2,3]}`
     Equivalent to field NOT IN (1,2,3).

  * `{"field": {"$lt": 12}}`
     Equivalent to `field <12`.

  * `{"field": {"$lte": 12}}`
     Equivalent to f`ield <= 12`.

  * `{"field": {"$gt": 12}}`
     Equivalent to `field> 12`.

  * `{"field": {"$gte": 12}}`
     Equivalent to `field >= 12`.

  * `{"$and": [<expr1>, <expr2>, <expr3>]}`
     Equivalent to `expr1 AND expr2 AND expr3`.

  * `{"$or": [<expr1>, <expr2>, <expr3>]}`
     Equivalent to `expr1 OR expr2 OR expr3`.

  * `{field: {"$like": "value"}}`
     Equivalent to `field like'%value%'` (fuzzy search).

  * `{field: {"$begin": "value"}}`
     Equivalent to `field like'value%'` (starts with `value`).

  * `{field: {"$end": "value"}}`
     Equivalent to `field like'%value'` (ends with `value`).

  * `{field: "$isnull"}`
     Equivalent to field is null.

     

Nesne dizilerinin anahtarlarının üzerine yazmadığınızdan emin olun. Örneğin, `id>2 ve id<5` ile sorgulamak istiyorsanız, `{id:{"$gt": 2}, id:{"$lt": 5}}` kullanamazsınız, çünkü ilk elemanın üzerine ikinci eleman yazılacaktır. Aşağıdaki sorgu yapısını kullanmalısınız:

```
{id: [{"$gt": 2}, {"$lt": 5}]}
```
```
{"$and": [{id:{"$gt": 2}}, {id:{"$lt": 5}}]}
```

* **Id**

     Kimliğe göre sorgular. Örnek, .WhereId(1).

     

* **Order**

     Sonuç kümesini belirli bir sütuna göre veya varsayılan olarak kimliğe göre sıralamak için kullanılır.

    Sıralama için yalnızca bir alan kullanıyorsanız, onu bir dize olarak belirtebilirsiniz. Birden çok alanı sıralamak için bir dizi dize nesnesi belirtmeniz gerekir:


     Azalan düzen: `{"field": "-1"}` eşittir `field desc`.

     Artan düzen: `{"field": "1"}` eşittir `field asc`.

* **limit**

     Girişlerin sayısını döndürür. 25, varsayılan olarak. Maksimum sayı 10.000'dir.


* **Offset**

     Offset.

* **Ecosystemid**

     Ekosistem kimliği. Varsayılan olarak, mevcut ekosistemin tablosu sorgulanır.

     

#### Örnek

```
var i int
var ret string
ret = DBFind("contracts").Columns("id,value").Where({id: [{"$gt": 2}, {"$lt": 5}]}).Order( "id")
while i <Len(ret) {
  var vals map
  vals = ret[0]
  Println(vals["value"])
  i = i + 1
}
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
  Println(ret)
  Println(ret)
  Println(ret)
}
```

​     


### DBRow

Belirtilen parametrelerle belirtilen bir tablodan veri sorgular. Bir dizi nesne haritasından oluşan bir dizi dizisi döndürür.

#### Sözdizimi

```
DBRow(table string)
 [.Columns(columns array|string)]
 [.Where(where map)]
 [.WhereId(id int)]
 [.Order(order array|string)]
 [.Ecosystem(ecosystemid int)] map
```

* **table**

  Tablo ismi.
* **columns**
  
  Sütunların bir listesini döndürür. Belirtilmezse, tüm sütunlar döndürülür.

  Değer, virgülle ayrılmış bir dizi veya dizedir.
* **where**

  Sorgu koşulları.

  Örneğin: `.Where({name: "John"})` veya `.Where({"id": {"$gte": 4}})`.

  Daha fazla detay için, burda [DBFind](#dbfind).
* **Id**
  
  Kimliğe göre sorgulama. Örneğin, `.WhereId(1)`.

* **Order**

  Sonuç kümesini belirli bir sütuna göre veya varsayılan olarak kimliğe göre sıralamak için kullanılır.

  Daha fazla detay için, burda [DBFind](#dbfind).

* **Ecosystemid**

  Ekosistem kimliği. Varsayılan olarak, mevcut ekosistemin tablosu sorgulanır.

#### Örnek

```
var ret map
ret = DBRow("contracts").Columns(["id","value"]).Where({id: 1})
Println(ret)
```



### DBSelectMetrics

Bir metriğin toplu verilerini döndürür.

Metrikler, her 100 blok oluşturulduğunda güncellenir. Ve toplanan veriler 1 günlük bir döngüde saklanır.

#### Syntax

```
DBSelectMetrics(metric string, timeInterval string, aggregateFunc string) array

```

* **metric**

  Metrik adı.

  * **ecosystem_pages**
  
    Ekosistem sayfalarının sayısı.

    Dönüş değeri: anahtar - ekosistem kimliği, değer - ekosistem sayfalarının sayısı.
  * **ecosystem_members**
  
    Ekosistem üyelerinin sayısı.

    Dönüş değeri: anahtar - ekosistem kimliği, değer - ekosistem üyelerinin sayısı.
  * **ecosystem_tx**

    Ekosistem işlemlerinin sayısı.

    Dönüş değeri: anahtar - ekosistem kimliği, değer - ekosistem işlemlerinin sayısı.

* **timeInterval**

    Metrik verilerini toplamak için zaman aralığı. Örneğin: `1 day`, `30 days`.


* **aggregateFunc**

    Aggregate fonksiyonu. Örneğin, `max`, `min`, `avg`.

#### Örnek

```
var rows array
rows = DBSelectMetrics("ecosystem_tx", "30 days", "avg")
var i int
while(i <Len(rows)) {
  var row map
  row = rows[i]
  i = i + 1
}
```



### EcosysParam

Returns the value of a specified parameter in the ecosystem parameters table parameters.

#### Sözdizimi

```
EcosysParam(name string) string

```

* **name**

  Parametre adı.

#### Örnek

```
Println(EcosysParam("founder_account"))
```



### GetHistory

Belirtilen bir tablodaki girişlerde yapılan değişikliklerin geçmişini döndürür.

#### Sözdizimi

```
GetHistory(table string, id int) array

```

* **table**

  Tablo adı.
* **Id**

  Giriş ID.
> **Geri dönüş değeri**

  Tablolardaki girişlerde yapılan değişikliklerin geçmişini belirten map türünde bir dizi nesne döndürür.

  Her dizi, sonraki değişikliği yapmadan önce bir kaydın alanlarını içerir.
  Dizi, en son değişikliklerin sırasına göre sıralanır.

#### Örnek

```
var list array
var item map
list = GetHistory("blocks", 1)
if Len(list) > 0 {
  item = list[0]
}
```



### GetHistoryRow

Belirtilen bir tabloda belirtilen bir girdinin değişiklik geçmişinden tek bir anlık görüntü döndürür.

#### Sözdizimi

```
GetHistoryRow(table string, id int, rollbackId int) map
```



* **table**

  Tablo adı.

* **Id**

  Giriş ID.

* **rollbackId**

  rollback_tx Tablonun giriş ID.

```
  $result = GetHistoryRow("contracts",205,2358)
```

  


### GetColumnType

Belirtilen tablodaki belirtilen alanın veri türünü döndürür.

#### Sözdizimi

```
GetColumnType(table, column string) string

```

* **table**

  Tablo adı.
* **column**

  Alan adı.
> **Return value**

  Değerler döndürülebilir: `text, varchar, number, money, double, bytes, json, datetime, double`.

#### Örnek

```
var coltype string
coltype = GetColumnType("members", "member_name")
```



### GetDataFromXLSX

XLSX elektronik tablolarından verileri döndürür.

#### Sözdizimi

```
GetDataFromXLSX(binId int, line int, count int, sheet int) string

```

* **binId**

  İkili tablo ikili dosyasında XLSX biçiminde kimlik.
* **line**

  Varsayılan olarak 0'dan başlayan başlangıç ​​satırı numarası.

* **count**

  Döndürülmesi gereken satır sayısı.
* **sheet**

  Liste numarası, varsayılan olarak 1'den başlar.

#### Örnek

```
var a array
a = GetDataFromXLSX(3, 12, 10, 1)
```



### GetRowsCountXLSX

Belirtilen bir XLSX dosyasındaki satır sayısını döndürür.

#### Syntax

```
GetRowsCountXLSX(binId int, sheet int) int
```

* **binId**

  İkili tablo ikili dosyasında XLSX biçiminde kimlik.
* **sheet**

  Liste numarası, varsayılan olarak 1'den başlar.


#### Örnek

```
var count int
count = GetRowsCountXLSX(binid, 1)
```



### LangRes

İki karakterli bir kod olarak belirtilen dil dili için ad etiketine sahip çok dilli bir kaynak döndürür, örneğin: `en`, `zh`. Seçilen bir dil için dil yoksa,  `en` etiketinin dil kaynağı döndürülür.


#### Syntax

```
LangRes(label string, lang string) string
```

* **label**

  Dil kaynağı adı.
* **lang**

  İki karakterli dil kodu.


#### Örnek

```
warning LangRes("@1confirm", "en")
error LangRes("@1problems", "zh")
```



### GetBlock

Belirtilen bir blok hakkında ilgili bilgileri döndürür.

#### Sözdizimi

```
GetBlock(blockID int64) map

```

* **blockID**

  Block ID.
> **Return value**

  Bir dizi nesne döndür:
  * **id**
  
     Block ID.
  * **time**
  
    Blok oluşturma zaman damgası.
  * **key_id**
  
     Doğrulama düğümünün hesap adresi bloğu oluşturdu.


#### Örnek

```
var b map
b = GetBlock(1)
Println(b)
```



### DBInsert

Belirtilen tabloya bir girdi ekler ve girdi kimliğini döndürür.


#### Sözdizimi

```
DBInsert(table string, params map) int

```

* **tblname**

  Tablo adı.
* **params**

  Anahtarların alan adları ve değerlerin eklenen değerler olduğu bir nesne dizisi.

#### Örnek

```
DBInsert("mytable", {name: "John Smith", amount: 100})
```



### DBUpdate

Belirtilen bir tabloda belirtilen giriş kimliğinin sütun değerini değiştirir. Giriş kimliği tabloda yoksa bir hata döndürülür.

#### Sözdizimi

```
DBUpdate(tblname string, id int, params map)

```

* **tblname**

  Tablo adı.
* **Id**

  Entry ID.
* **params**

  Anahtarların alan adları ve değerlerin değişikliklerden sonra yeni değerler olduğu bir nesne dizisi.

#### Örnek

```
DBUpdate("mytable", myid, {name: "John Smith", amount: 100})
```



### DBUpdateExt

Belirtilen tablodaki sorgu koşuluyla eşleşen bir sütunun değerini değiştirir.

#### Sözdizimi

```
DBUpdateExt(tblname string, where map, params map)

```

* **tblname**

  Tablo adı.
* **where**

  Sorgo koşulları

  Daha fazla detay için, burada [DBFind](#dbfind).
* **params**

  Anahtarların alan adları ve değerlerin değişikliklerden sonra yeni değerler olduğu bir nesne dizisi.

#### Örnek

```
DBUpdateExt("mytable", {id: $key_id, ecosystem: $ecosystem_id}, {name: "John Smith", amount: 100})
```



### DelColumn

  Belirtilen tabloda kaydı olmayan bir alanı silin.

#### Sözdizimi

```
DelColumn(tblname string, column string)

```

* **tblname**

  Tablo adı.

* **column**

  Silinecek alan.

```
DelColumn("mytable", "mycolumn")
```

  


### DelTable

Hiçbir kaydı olmayan belirli bir tabloyu siler.

#### Syntax

```
DelTable(tblname string)

```

* **tblname**

  Tablo adı.

#### Örnek

```
DelTable("mytable")
```



### Ekle

Src dizisine herhangi bir türde val ekler.


#### Sözdizimi

Append(src array, val anyType) array

* **src**

  Orjinal dizi.
* **val**

  Eklenecek değer.

#### Örnek

```
var list array
list = Append(list, "new_val")
```



### Katılmak

"in dizisinin" öğelerini belirtilen bir ayırıcıyla bir dizede birleştirir.

#### Sözdizimi

```
Join(in array, sep string) string

```

* **İçinde**

  Array ismi.
* **sep**

  Ayırıcı.

#### Örnek

```
 var val string, myarr array
 myarr[0] = "first"
 myarr[1] = 10
 val = Join(myarr, ",")
```



### Bölmek

"in dizesini" öğelere bölmek ve bunları bir diziye yerleştirmek için ayırıcıyı kullanır.

#### Sözdizimi

```
Split(in string, sep string) array
```

* **İçinde**

   Metinsel.
*  **sep**

   Ayırıcı.

#### Örnek

```
var myarr array
myarr = Split("first,second,third", ",")
```



### Len

Belirtilen dizideki öğelerin sayısını döndürür.

#### Sözdizimi

 

```
Len(val array) int
```

* **val**

   Dizi.

#### Örnek

```
if Len(mylist) == 0 {
  ...
}
```



### Sıra

 Bu durumda list parametresi belirtilmemelidir. Dizi listesindeki ilk nesne dizisini döndürün. Liste boşsa, boş bir sonuç döndürülür. Bu işlev çoğunlukla [DBFind](#dbfind) işleviyle birlikte kullanılır. Bu işlevi kullanırken, parametreleri belirtemezsiniz.


#### Sözdizimi

```
 Row(list array) map
```

* **list**

  DBFind işlevi tarafından döndürülen nesne dizisi.

#### Örnek

```
 var ret map
 ret = DBFind("contracts").Columns("id,value").WhereId(10).Row()
 Println(ret)
```



### One

  Dizi listesindeki ilk nesne dizisinin alan değerini döndürür. Liste dizisi boşsa, nil döndürülür. Çoğunlukla [DBFind](#dbfind) işleviyle birlikte kullanılır. Bu işlevi kullanırken, parametreleri belirtemezsiniz.


#### Sözdizimi

```
One(list array, column string) string
```

*  **list**

  DBFind işlevi tarafından döndürülen nesne dizisi.

* **column**

  Alan adı.
#### Örnek

```
var ret string
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
  Println(ret)
}
```



### GetMapKeys

  Nesne dizisindeki anahtar diziyi döndürür.

#### Sözdizimi

 

```
GetMapKeys(val map) array
```

* **val**

    Nesne dizisi.

#### Örnek

```
var val map
var arr array
val["k1"] = "v1"
val["k2"] = "v2"
arr = GetMapKeys(val)
```



### SortedKeys

Nesne dizisinde sıralanmış bir anahtar dizi döndürür.

#### Sözdizimi

```
SortedKeys(val map) array

```

* **val**

    Nesne dizisi.

#### Örnek

```
var val map
var arr array
val["k2"] = "v2"
val["k1"] = "v1"
arr = SortedKeys(val)
```



### CallContract

Belirtilen adla sözleşmeyi çağırır. Sözleşmedeki veri bölümünün tüm parametreleri bir nesne dizisine dahil edilmelidir. Bu işlev, belirtilen bir sözleşme tarafından **$result** değişkenine atanan değeri döndürür.


#### Sözdizimi

```
CallContract(name string, params map)

```

* **name**

    Çağrılan sözleşmenin adı.
* **params**

    Sözleşme girdi verilerinin ilişkisel dizisi.


#### Örnek

```
var par map
par["Name"] = "My Name"
CallContract("MyContract", par)
```



### ContractAccess

Yürütülmekte olan sözleşmenin adının parametrelerde listelenen adlardan biriyle eşleşip eşleşmediğini kontrol eder. Genellikle tablolara sözleşme erişimini kontrol etmek için kullanılır. Tablo alanlarını düzenlerken veya tablonun izinler bölümünde yeni sütun alanları eklerken, lütfen bu işlevi izin alanlarında belirtin.

#### Sözdizimi

  

```
ContractAccess(name string, [name string]) bool
```

* **name**

    Sözleşme adı.

#### Örnek

```
ContractAccess("MyContract")
ContractAccess("MyContract","SimpleContract")
```



### ContractConditions

Sözleşmedeki koşullar bölümünü belirtilen adla çağırır.

Bu tür sözleşmeler için veri bölümü boş olmalıdır. Koşullar bölümü hatasız yürütülürse true döner. Yürütme sırasında bir hata varsa, hata nedeniyle ana sözleşme de feshedilecektir. Bu işlev genellikle sözleşmenin tablolara erişimini kontrol etmek için kullanılır ve sistem tablolarını düzenlerken izin alanlarında çağrılabilir.

#### Sözdizimi

```
ContractConditions(name string, [name string]) bool

```

* **name**

    Sözleşme adı.

#### Örnek

```
ContractConditions("MainCondition")
```



### EvalCondition

Sözleşme tablo adı tablosundan bir 'ad' alanı olan kayıttaki koşul alanının değerini alır ve koşul alanı değerinin koşullarını kontrol eder.

#### Sözdizimi

```
EvalCondition(tablename string, name string, condfield string)

```

* **tablename**

    Tablo adı.
*  **name**

    'name' alanı ile değeri sorgular.
*  **condfield**

    Koşulları kontrol edilmesi gereken alanın adı.

#### Örnek

```
EvalCondition(`menu`, $Name, `conditions`)
```



### GetContractById

Sözleşme kimliğine göre sözleşme adını döndürür. Sözleşme bulunamazsa boş bir dize döndürülür.

#### Sözdizimi

```
GetContractById(id int) string

```

* **Id**

  Sözleşme tablosu sözleşmelerindeki sözleşme kimliği.

#### Örnek

```
var name string
name = GetContractById($IdContract)
```



### GetContractByName

Bu işlev, sözleşme kimliğini sözleşme adına göre döndürür. Sözleşme bulunamazsa, sıfır döndürülür.

#### Sözdizimi

```
GetContractByName(name string) int
```

* **name**

    Sözleşme tablosu sözleşmelerinde sözleşme adı.

#### Örnek

```
var id int
id = GetContractByName(`NewBlock`)
```



### RolErişimi

Sözleşme arayanın rol kimliğinin parametrede belirtilen kimliklerden biriyle eşleşip eşleşmediğini kontrol eder.

Tablolara ve diğer verilere sözleşme erişimini kontrol etmek için bu işlevi kullanabilirsiniz.
#### Sözdizimi

 

```
RoleAccess(id int, [id int]) bool
```

* **Id**

    Role ID.

#### Örnek

```
RoleAccess(1)
RoleAccess(1, 3)
```



### İşlem Bilgileri

İşlemleri belirtilen hash değerine göre sorgular ve yürütülen sözleşme ve parametreleri hakkında bilgi verir.

#### Sözdizimi

```
TransactionInfo(hash: string)
```

  * **hash**

    Onaltılık(hexadecimal) dize biçiminde işlem karması.
  
> **Return value**

    Bu işlev, JSON biçiminde bir dize döndürür:

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

  

  *   **contract**

      Sözleşme adı.
  
  *   **params**

      Sözleşme parametrelerine aktarılan veriler.
  *   **block**

      İşlemi işleyen bloğun kimliği.


#### Örnek

```
var out map
out = JSONDecode(TransactionInfo(hash))
```



### Throw

  Özel durum(exception) türünde bir hata oluşturur.


#### Sözdizimi

  

```
Throw(ErrorId string, ErrDescription string)
```

* **ErrorId**

    Hata tanımlayıcısı.

* **ErrDescription**

    Hata tanımlaması.

>  **Return value**

    Bu tür işlem sonuçlarının biçimi:

```
{"type":"exception","error":"Error description","id":"Error ID"}
```

#### Örnek

```
Throw("Problem", "There is a problem")
```



### ValidateCondition

  Koşul parametresi tarafından belirtilen koşulları derlemeye çalışır. Derleme işlemi sırasında bir hata oluşursa hata oluşur ve çağrılan sözleşme sonlandırılır. Bu işlev, koşullu biçimin doğruluğunu kontrol etmek için tasarlanmıştır.


#### Sözdizimi

```
ValidateCondition(condition string, state int)
```

* **condition**

    Doğrulanması gereken koşullu biçim.
* **state**

    Ekosistem kimliği. Global koşulu kontrol ederseniz, lütfen 0 olarak belirtin.

#### Örnek

```
ValidateCondition(`ContractAccess("@1MyContract")`, 1)
```



### AddressToId

Cüzdan adresine göre ilgili hesap adresini döndürür. Geçersiz bir adres belirtilirse, '0' döndürülür.

#### Sözdizimi

```
AddressToId(address string) int

```

*  Address

    `XXXX-...-XXXX` biçiminde veya sayı biçiminde cüzdan adresi.


#### Örnek

```
wallet = AddressToId($Recipient)
```



### IdToAddress

Hesap adresine göre ilgili cüzdan adresini döndürür. Geçersiz bir adres belirtilirse, geçersiz adres 'invalid' döndürülür.

#### Sözdizimi

```
IdToAddress(id int) string

```

*  **Id**

    Hesap adresi.

#### Örnek

```
$address = IdToAddress($id)
```



### PubToID

Hesap adresi, genel anahtar tarafından onaltılık biçimde döndürülür.

#### Sözdizimi

```
PubToID(hexkey string) int

```

*  **hexkey**

    Onaltılık biçimde genel anahtar.

#### Örnek

  

```
var wallet int
wallet = PubToID("04fa5e78.....34abd6")
```



### DecodeBase64

Base64 biçimini belirterek bir dize döndürür

#### Sözdizimi

```
DecodeBase64(input string) string

```

*  **Input**

    Base64 biçiminde dize.

#### Örnek

```
val = DecodeBase64(mybase64)
```



### EncodeBase64

Bir dize belirterek base64 biçiminde bir dize döndürür.

#### Sözdizimi

```
EncodeBase64(input string) string

```

*  **Input**

    Kodlanacak dize.

#### Örnek

 

```
var base64str string
base64str = EncodeBase64("my text")
```



### Ondalık

Bir tamsayıyı veya dizeyi bir kayan sayıya dönüştürür.

#### Sözdizimi

```
Float(val int|string) float

```

* **val**

    Bir tamsayı veya dize.

#### Örnek

```
val = Float("567.989") + Float(232)
```



### HexToBytes

  Onaltılık biçimdeki bir dizeyi bayt türü baytlara dönüştürür.

#### Sözdizimi

```
  HexToBytes(hexdata string) bytes

```

*  **hexdata**

    Onaltılık biçimde bir dize.


#### Örnek

```
var val bytes
val = HexToBytes("34fe4501a4d80094")
```



### FormatMoney

exp / 10 ^ basamağının dize değerini döndürür.

#### Sözdizimi

  

```
FormatMoney(exp string, digit int) string
```

* **Exp**

    Dize biçiminde bir sayı.
* **digit**

    `Exp/10^digit` ifadesinde 10'un üssü (pozitif veya negatif). Pozitif değerler ondalık basamakları belirler.

#### Example

```
  s = FormatMoney("78236475917384", 0)
```



### Random
```
Returns a random number between min and max (min <= result <max). Both min and max must be positive numbers.(Min ve max arasında rastgele bir sayı döndürür (min <= sonuç <maks). Hem min hem de max pozitif sayılar olmalıdır.
)
```

#### Sözdizimi

 

```
Random(min int, max int) int
```

* **min**

    Rastgele sayılar arasındaki minimum değer.

* **max**

      Rastgele sayıların üst sınırı. Üretilen rastgele sayı bu değerden daha az olacaktır.

#### Örnek

```
i = Random(10,5000)
```



### Int-Tamsayı

Dize biçimindeki bir değeri tam sayıya dönüştürür.

#### Sözdizimi

```
Int(val string) int
```

* **val**

      Dize biçiminde bir sayı.

#### Örnek

```
mystr = "-37763499007332"
val = Int(mystr)
```



### Hash

    Sistem şifreleme kitaplığı kriptosu tarafından oluşturulan, belirtilen bir bayt dizisinin veya dizesinin karmasını döndürür.

#### Sözdizimi

 

```
Hash(val interface{}) string, error
```

* **val**

      Bir dize veya bayt dizisi.

#### Örnek

```
var hash string
hash = Hash("Test message")
```



### Sha256

    Belirtilen bir dizenin SHA256 karmasını döndürür.

#### Sözdizimi

 

```
Sha256(val string) string
```

* **val**

      Bir dize, Sha256 karma işlemini gerektirir.

#### Örnek

```
var sha string
sha = Sha256("Test message")
```



### Str

Bir tamsayı int veya kayan noktalı sayıyı bir dizgeye dönüştürür.

#### Sözdizimi

  

```
Str(val int|float) string
```

* **val**

      Bir tamsayı veya kayan sayı.

#### Örnek

```
myfloat = 5.678
val = Str(myfloat)
```



### JSONEncode

Bir sayıyı, dizeyi veya diziyi JSON biçiminde bir dizeye dönüştürür.

#### Sözdizimi

```
JSONEncode(src int|float|string|map|array) string

```

* **src**

      Dönüştürülecek veriler.

#### Örnek

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncode(mydata)
```



### JSONEncodeIndent

Bir sayıyı, dizeyi veya diziyi JSON biçiminde bir dizeye dönüştürmek için belirtilen girintiyi kullanır.

#### Sözdizimi

```
JSONEncodeIndent(src int|float|string|map|array, indent string) string

```

* **src**

    Dönüştürülecek veriler.

* **Indent**

    Dize girinti olarak kullanılacaktır.


#### Örnek

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncodeIndent(mydata, "\t")
```



### JSONDecode

JSON biçimindeki bir dizeyi sayı, dize veya diziye dönüştürür.

#### Sözdizimi

```
JSONDecode(src string) int|float|string|map|array

```

*  **src**

      JSON biçiminde veri içeren bir dize.

#### Örnek

```
var mydata map
mydata = JSONDecode(`{"name": "John Smith", "company": "Smith's company"}`)
```



### HasPrefix

Dizenin belirtilen bir dizeyle başlayıp başlamadığını kontrol eder.

#### Sözdizimi

  

```
HasPrefix(s string, prefix string) bool
```

* **s**

    Söz dizisi.

* **prefix**

    Kontrol edilecek ön ek.

> **Return value**

  Dize belirtilen bir dize ile başlıyorsa, `true` döndürülür.


#### Örnek

```
if HasPrefix($Name, `my`) {
  ...
}
```



### Contains

Dizenin belirtilen bir alt dize içerip içermediğini kontrol eder.

#### Sözdizimi

 

```
Contains(s string, substr string) bool
```

* **s**

    Söz dizisi.

* **substr**

    Bir alt dize.

> **Return value**

  Dize alt dizeyi içeriyorsa, `true` değerini döndürür.

#### Örnek

```
if Contains($Name, `my`) {
  ...
}
```



### Replace

Dizedeki eski (eski dize) yeni (yeni dize) ile değiştirir.

#### Sözdizimi

```
Replace(s string, old string, new string) string

```

* **s**

    Orjinal dize
* **Old**

    Değiştirilecek alt dize.

* **new**

    Yeni dize.

#### Örnek

```
s = Replace($Name, `me`, `you`)
```



### Boyut

Belirtilen dizedeki bayt sayısını döndürür.

#### Sözdizimi

```
Size(val string) int

```

* **val**

    Söz dizisi.

#### Örnek

```
var len int
len = Size($Name)
```



### Sprintf

Bu işlev, belirtilen şablon ve parametreleri kullanarak bir dize oluşturur.

Kullanılabilir joker karakterler:
* `%d` (integer)
* `%s` (string)
* `%f` (float)
* `%v` (any type)
#### Sözdizimi

```
Sprintf(pattern string, val ...) string

```

* **pattern**

      Bir dize şablonu.

#### Örnek

```
out = Sprintf("%s=%d", mypar, 6448)
```



### Substr

Ofset uzaklığından başlayarak (varsayılan olarak 0'dan hesaplanır) belirtilen bir dizeden elde edilen alt dizeyi döndürür ve maksimum uzunluk uzunlukla sınırlıdır.

Uzaklık veya uzunluk sıfırdan küçükse veya uzaklık uzunluktan büyükse boş bir dize döndürülür.

Ofset ve uzunluğun toplamı dize boyutundan büyükse, alt dize, ofsetten başlayarak dizenin sonuna kadar döndürülür.

#### Sözdizimi

```
Substr(s string, offset int, length int) string

```

* **val**

    Söz dizisi.

* **Offset**

    Offset.

* **length**

      Alt dizinin uzunluğu.

#### Örnek

```
var s string
s = Substr($Name, 1, 10)
```



### ToLower

Belirtilen bir dizeyi küçük harfle döndürür.

#### Sözdizimi

```
ToLower(val string) string

```

* **val**

    Söz dizisi.

#### Örnek

```
val = ToLower(val)
```



### ToUpper

Belirtilen bir dizeyi büyük harfle döndürür.

#### Sözdizimi

```
ToUpper(val string) string

```

* **val**

    Söz dizisi.

#### Örnek

```
val = ToUpper(val)
```



### TrimSpace

Belirtilen bir dizenin başındaki ve sonundaki boşlukları, sekmeleri ve yeni satırları siler.

#### Sözdizimi

```
TrimSpace(val string) string

```

* **val**

    Söz dizisi.

#### Örnek

 

```
var val string
val = TrimSpace(" mystr ")
```



### Floor

Belirtilen sayıdan, kayan sayıdan ve dizeden küçük veya ona eşit en büyük tamsayı değerini döndürür.

#### Sözdizimi

```
Floor(x float|int|string) int
```

* **x**

    Bir sayı, ondalık bir sayı, ve bir söz dizisi.

#### Örnek

```
val = Floor(5.6) // returns 5
```



### Log

Belirtilen sayının, kayan sayının ve dizenin doğal logaritmasını döndürür.

#### Sözdizimi

```
Log(x float|int|string) float

```

*  **x**

    Bir sayı, ondalık bir sayı, ve bir söz dizisi.

#### Örnek

```
val = Log(10)
```



### Log10

Belirtilen sayının, kayan sayının ve dizenin 10 tabanlı logaritmasını döndürür.

#### Sözdizimi

```
Log10(x float|int|string) float

```

* **x**

    Bir sayı, ondalık bir sayı, ve bir söz dizisi.

#### Örnek

 

```
val = Log10(100)
```



### Pow

Belirtilen tabanı belirtilen güce (xy) döndürür.

#### Sözdizimi

```
Pow(x float|int|string, y float|int|string) float

```

* **x**

    Taban numarası.

* **y**

    Üs.

#### Örnek

```
val = Pow(2, 3)

```

### Round

En yakın tam sayıya yuvarlanmış belirtilen bir sayının değerini döndürür.

#### Sözdizimi

```
Round(x float|int|string) int

```

* **x**

    Bir sayı.

#### Örnek

```
val = Round(5.6)
```

### Sqrt

Belirtilen sayının karekökünü döndürür.

```
Sqrt(x float|int|string) float

```

* **x**

    Bir sayı.

#### Örnek

```
val = Sqrt(225)
```



### StringToBytes

Bir dizeyi baytlara dönüştürür.

#### Sözdizimi

```
StringToBytes(src string) bytes

```

* **src**

    Bir sözdizisi.

#### Örnek

 

```
var b bytes
b = StringToBytes("my string")
```



### BytesToString

Baytları dizeye dönüştürür.

#### Sözdizimi

```
BytesToString(src bytes) string

```

* **src**

    Byte.

#### Example

```
var s string
s = BytesToString($Bytes)
```



### SysParamString

Belirtilen platform parametresinin değerini döndürür.

#### Sözdizimi

```
SysParamString(name string) string

```

* **name**

    Parametre adı.

#### Örnek

```
url = SysParamString(`blockchain_url`)
```



### SysParamInt

Belirtilen platform parametresinin değerini sayı biçiminde döndürür.

#### Sözdizimi

```
SysParamInt(name string) int

```

* **name**

    Parametre ismi.

#### Örnek

```
maxcol = SysParam(`max_columns`)
```



### DBUpdateSysParam

Bir platform parametresinin değerini ve koşullarını günceller. Değeri veya koşulları değiştirmeniz gerekmiyorsa, lütfen ilgili parametrede boş bir dize belirtin.


#### Sözdizimi

```
DBUpdateSysParam(name, value, conditions string)

```

* **name**

    Parametre adı.

* **value**

      Parametrenin yeni değeri.
* **conditions**

      Bir parametreyi güncellemek için yeni koşullar.

#### Örnek

```
DBUpdateSysParam(`fuel_rate`, `400000000000`, ``)

```

### UpdateNotifications

Veritabanından belirtilen bir anahtarın bildirim listesini alır ve elde edilen bildirimi Centrifugo'ya gönderir.

#### Sözdizimi

```
UpdateNotifications(ecosystemID int, keys int...)

```

* **EcosystemID**

    Ecosistem ID.

* **key**

    Virgülle ayrılmış hesap adresleri listesi. Veya hesap adreslerinin bir listesini belirtmek için bir dizi kullanabilirsiniz.

#### Örnek

```
UpdateNotifications($ecosystem_id, $key_id, 23345355454, 35545454554)
UpdateNotifications(1, [$key_id, 23345355454, 35545454554])
```



### UpdateRolesNotifications

Veritabanında belirtilen bir rol kimliğinin tüm hesap adreslerinin bildirim listesini alır ve elde edilen bildirimi Centrifugo'ya gönderir.

#### Sözdizimi

```
UpdateRolesNotifications(ecosystemID int, roles int ...)

```

*  **EcosystemID**

    Ecosistem ID.

*  **roles**

    Virgülle ayrılmış rol kimliklerinin listesi. Veya rol kimliklerinin bir listesini belirtmek için bir dizi kullanabilirsiniz.

#### Örnek

```
UpdateRolesNotifications(1, 1, 2)

```

### HTTPRequest

Belirtilen adrese HTTP istekleri gönderir.
> Not

> Bu işlev yalnızca CLB sözleşmelerinde kullanılabilir.

#### Syntax

```
HTTPRequest(url string, method string, heads map, pars map) string

```

* **Url**

    Talebin gönderileceği adres.

* **method**

    İstek türü (GET veya POST).

* **heads**

      Bir dizi istek başlığı, nesne.

* **pars**

    İstenen parametreler.
#### Örnek

```
var ret string
var ret string
var ret string
var pars, heads, json map
heads["Authorization"] = "Bearer "+ $auth_token
pars["obs"] = "true"
ret = HTTPRequest("http://localhost:7079/api/v2/content/page/default_page","POST", heads, pars)
json = JSONToMap(ret)
```



### HTTPPostJSON

Bu işlev, HTTPRequest işlevine benzer, ancak bir POST isteği gönderir ve istek parametreleri dizelerdir.

> Not

> Bu işlev yalnızca CLB sözleşmelerinde kullanılabilir.

#### Sözdizimi

```
HTTPPostJSON(url string, heads map, pars string) string

```

* **Url**

    Talebin gönderileceği adres.

* **heads**

    Bir dizi istek başlığı, nesne.

* **pars**

    Parametreleri bir JSON dizesi olarak isteyin.

####   Örnek

```
var ret string
var ret string
var ret string
var heads, json map
heads["Authorization"] = "Bearer "+ $auth_token
ret = HTTPPostJSON("http://localhost:7079/api/v2/content/page/default_page", heads, `{"obs":"true"}`)
json = JSONToMap(ret)
```



### BlockTime

Bloğun oluşturma süresini SQL biçiminde döndürür.

#### Sözdizimi

```
BlockTime()
```



#### Örnek

```
var mytime string
mytime = BlockTime()
DBInsert("mytable", myid, {time: mytime})
```



### DateTime

Unixtime zaman damgasını YYYY-AA-GG SS:MI:SS biçiminde bir dizeye dönüştürür.

#### Sözdizimi

```
DateTime(unixtime int) string
```



#### Örnek

```
DateTime(1532325250)

```

### UnixDateTime

YYYY-AA-GG SS:MI:SS biçimindeki bir dizeyi bir zaman damgası unixtime'a dönüştürür

#### Sözdizimi

```
UnixDateTime(datetime string) int
```



#### Örnek

```
UnixDateTime("2018-07-20 14:23:10")
```



### CreateOBS

Bir alt CLB oluşturur.

Bu işlev yalnızca ana CLB modunda kullanılabilir.

#### Sözdizimi

```
CreateOBS(OBSName string, DBUser string, DBPassword string, OBSAPIPort int)

```

* **OBSName**

    CLB ismi.

* **DBUser**

    Veritabanının rol adı.

*  **DBPassword**

    Role ait şifre.

* **OBSAPIPort**

    API isteğinin bağlantı noktası.

#### Örnek

```
CreateOBS("obsname", "obsuser", "obspwd", 8095)

```

### GetOBSList

Alt CLB'lerin listesini döndürür.

Bu işlev yalnızca ana CLB modunda kullanılabilir.

#### Sözdizimi
```
GetOBSList()

```

> **Return value**

Anahtarın CLB adı ve değerin işlem durumu olduğu bir nesne dizisi.

### RunOBS

CLB'yi çalıştıran bir süreç.

Bu işlev yalnızca ana CLB modunda kullanılabilir.

#### Sözdizimi

```
RunOBS(OBSName string)

```

* **OBSName**

  CLB adı.

  Yalnızca harf ve rakamlardan oluşabilir ve boşluk simgesi kullanılamaz.

### StopOBS

Belirtilen bir CLB'nin sürecini durdurun.

Bu işlev yalnızca ana CLB modunda kullanılabilir.

#### Sözdizimi

```
StopOBS(OBSName string)

```

* **OBSName**

  CLB adı.

    Yalnızca harf ve rakamlardan oluşabilir ve boşluk simgesi kullanılamaz.

### RemoveOBS

Belirtilen bir CLB'nin sürecini siler.

Bu işlev yalnızca ana CLB modunda kullanılabilir.

#### Sözdizimi

```
RemoveOBS(OBSName string)

```

* **OBSName**

CLB adı.

Yalnızca harf ve rakamlardan oluşabilir ve boşluk simgesi kullanılamaz.

## System Contracts - Sistem sözleşmeleri

IBax blok zinciri platformu başlatıldığında sistem sözleşmeleri varsayılan olarak oluşturulur. Tüm bu sözleşmeler ilk ekosistemde oluşturuldu. Bu nedenle, onları diğer ekosistemlerden çağırırken tam adlarını belirtmeniz gerekir, örneğin, `@1NewContract`.


### NewEcosystem

Bu sözleşme yeni bir ekosistem yaratır. Oluşturulan ekosistemin kimliğini elde etmek için [txstatus](../reference/api2.md#txstatus) içinde döndürülen dosyalanan sonucu alıntılamalısınız.


Parameters:
  * **Name** string - ekosistemin adı. Daha sonra değiştirilebilir.

### EditEcosystemName

Yalnızca ilk ekosistemde bulunan 1_ecosystems tablosundaki ekosistemin adını değiştirir.

Parameters:
  * **EcosystemID** int - ekosistem kimliğinin adını değiştirir;
  * **NewName** string - ekosistemin yeni adı.

### NewContract

Mevcut ekosistemde yeni bir sözleşme oluşturur.

Parameters:
  * **ApplicationId** int - yeni bir sözleşmenin ait olduğu uygulama;
  * **Value** dize - sözleşme kaynak kodu. Üst katmanın yalnızca bir sözleşmesi olmalıdır;
  * **Conditions** dize - sözleşmenin koşullarını değiştirir;
  * **TokenEcosystem** int "isteğe bağlı" - ekosistem kimliği. Sözleşme etkinleştirildiğinde işlemler için hangi jetonun kullanılacağını belirler.

### EditContract

Mevcut ekosistemdeki sözleşmeyi düzenler.

Parameters:
  * **Id** int - sözleşme kimliği değişti;
  * **Value** "isteğe bağlı" dize - sözleşmenin kaynak kodu;
  * **Conditions** "isteğe bağlı" dize - sözleşmenin koşullarını değiştirir.

### BindWallet
Sözleşmeyi mevcut ekosistemdeki cüzdan adresine bağlama. Sözleşmeye bağlandıktan sonra sözleşme yürütme ücreti bu adrese ödenecektir.

Parameters:
  * **Id** int - bağlanacak sözleşme kimliği.
  * **WalletId** "isteğe bağlı" dize - sözleşmeye bağlı cüzdan adresi.

### UnbindWallet

Mevcut ekosistemdeki cüzdan adresinden sözleşmenin kaldırılması. Yalnızca sözleşmeye bağlı adresler serbest bırakılabilir. Sözleşmeyi feshettikten sonra sözleşmeyi yürüten kullanıcılar yürütme ücretini ödeyecektir.

Parameters:
  * **Id** int - bağlı olan sözleşmenin kimliği.

### NewParameter

Mevcut ekosisteme yeni bir ekosistem parametresi eklendi.

Parameters:
  * **Name** string - parametre adı;
  * **Value** string - parameter değer;
  * **Conditions** string - parametreyi değiştirme koşulları.

### EditParameter

Mevcut ekosistemdeki mevcut ekosistem parametrelerini değiştirir.

Parameters:
  * **Name** string - değiştirilecek parametrenin adı;
  * **Value** string - yeni parametre değeri;
  * **Conditions** string - parametreyi değiştirmek için yeni koşullar.

### NewMenu

Mevcut ekosisteme yeni bir menü ekler.

Parameters:
  * **Name** string - menu adı;
  * **Value** string - menu kaynak kodu;
  * **Title** string "opsiyonel" - menu başlığı;
  * **Conditions** string - Menüyü değiştirmek için koşullar.

### EditMenu

Mevcut ekosistemdeki mevcut menüyü değiştirir.

Parameters:
  * **Id** int - değiştirilecek menü kimliği;
  * **Value** string "optional" - yeni menünün kaynak kodu;
  * **Title** string "optional" - yeni menünün başlığı;
  * **Conditions** string "optional" - menüyü değiştirmek için yeni koşullar.

### AppendMenu

Kaynak kodu içeriğini mevcut ekosistemdeki mevcut menülere ekler

Parameters:
  * **Id** int - menu ID;
  * **Value** string - kaynak kodu eklenecektir.

### NewPage

Mevcut ekosisteme yeni bir sayfa ekler.

Parameters:
  * **Name** string - sayfa adı;
  * **Value** string - sayfanın kaynak kodu;
  * **Menu** string - sayfayla ilişkili menünün adı;
  * **Conditions** string - sayfayı değiştirme koşulları;
  * **ValidateCount** int "optional" - sayfa doğrulaması için gereken düğüm sayısı. Bu parametre belirtilmezse min_page_validate_count ekosistem parametre değeri kullanılır. Bu parametrenin değeri min_page_validate_count değerinden küçük ve max_page_validate_count değerinden büyük olamaz;

  * **ValidateMode** int "optional" - sayfa geçerlilik denetimi modu. Bu parametrenin değeri 0 ise sayfa yüklendiğinde kontrol edilecektir; veya yüklendiğinde kontrol edilir veya bu parametrenin değeri 1 ise sayfadan çıkılır.

### EditPage

Mevcut ekosistemdeki mevcut sayfaları değiştirir.

Parameters:
  * **Id** int - Değiştirilecek sayfanın kimliği;
  * **Value** string "optional" - yeni sayfanın kaynak kodu;
  * **Menu** string "optional" - sayfayla ilişkili yeni menünün adı;
  * **Conditions** string "optional" - sayfayı değiştirmek için yeni koşullar;
  * **ValidateCount** int "optional" - sayfa doğrulaması için gereken düğüm sayısı. Bu parametre belirtilmezse min_page_validate_count ekosistem parametre değeri kullanılır. Bu parametrenin değeri min_page_validate_count değerinden küçük ve max_page_validate_count değerinden büyük olamaz;
  * **ValidateMode** int "optional" - sayfa geçerlilik denetimi modu. Bu parametrenin değeri 0 ise sayfa yüklendiğinde kontrol edilecektir; veya yüklendiğinde kontrol edilir veya bu parametrenin değeri 1 ise sayfadan çıkılır.

### AppendPage

Kaynak içeriği mevcut ekosistemdeki mevcut sayfalara ekler.

Parameters:
* **Id** int - Değiştirilecek sayfanın kimliği;
* **Value** string - eklenecek kaynak kodu.

### NewBlock

Mevcut ekosisteme bir sayfa modülü ekler.

Parameters:
  * **Name** string - modülün adı;
  * **Value** string - modülün kaynak kodları;
  * **Conditions** string - modülü değiştirme koşulları.

### EditBlock

Mevcut ekosistemdeki mevcut sayfa modüllerini değiştirir.

Parameters:
  * Id int - değiştirilecek modül kimliği;
  * Value string - yeni modülün kaynak kodu;
  * Conditions string - modülü değiştirmek için yeni koşullar.e.

### NewTable

Mevcut ekosisteme yeni bir tablo ekler.

Parameters:
  * **ApplicationId** int - ilişkili tablonun uygulama kimliği;
  * **Name** string - yeni tablonun adı;
  * **Columns** string - JSON formatında alan dizisi `[{"name":"...", "type":"...","index": "0", "conditions":".. ."},...]`, where
    * **name** - alan adı, sadece latin harfleri;
    * **type** - veri tipi `varchar,bytea,number,datetime,money,text,double,character`;
    * **index** -birincil olmayan anahtar alanı `0`, birincil anahtar `1`;

    * **conditions** - alan verilerini değiştirme koşulları ve erişim izinleri JSON formatında belirtilmelidir. "`{"update":"ContractConditions(MainCondition)", "read":"ContractConditions(MainCondition)"}`;
  * **Permissions** string - JSON formatında erişim izinleri `{"insert": "...", "new_column": "...", "update": "...", "read": ".. ."}`.
    * **insert** - giriş ekleme izni;
    * **new_column** - yeni bir sütun ekleme izni;
    * **update** - giriş verilerini değiştirme izni;
    * **read** - giriş verilerini okuma izni.

### EditTable

Mevcut ekosistemdeki bir tablonun erişim izinlerini değiştirir.

Parameters:
  * **Name** string - tablonun adı;
  * **InsertPerm** string - tabloya giriş ekleme izni;
  * **UpdatePerm** string - tablodaki girişleri güncelleme izni;
  * **ReadPerm** string - tablodaki girdileri okuma izni;
  * **NewColumnPerm** string - yeni bir sütun oluşturma izni;

### NewColumn

Mevcut ekosistem tablosuna yeni bir alan ekler.

Parameters:
  * **TableName** string - tablo adı;
  * **Name** string - Latin karakterleriyle alan adı;
  * **Type** string - veri tipi `varchar,bytea,number,money,datetime,text,double,character`;
  * **UpdatePerm** string -sütundaki değeri değiştirme izni;
  * **ReadPerm** string - sütundaki değeri okuma izni.

### EditColumn

Geçerli ekosistemde belirtilen bir tablo alanının iznini değiştirir.

Parameters:
  * **TableName** string - tablo adı;
  * **Name** string - Latin karakterleriyle değiştirilecek alan adı;
  * **UpdatePerm** string - sütundaki değeri değiştirmek için yeni izin;
  * **ReadPerm** string - sütundaki değeri okumak için yeni izin.

### NewLang

Mevcut ekosisteme dil kaynakları ekler ve bunu yapma izni, ekosistem parametrelerinin change_language parametresinde ayarlanır.

Parameters:

  * **Name** string - Latin karakterleriyle dil kaynaklarının adı;
  * **Trans** string - anahtar olarak iki karakterlik bir dil kodu ve değer olarak çevrilmiş dize ile JSON biçiminde dize. Örneğin, `{"en": "English text", "zh": "Chinese text"}`.

### EditLang

Geçerli ekosistemdeki dil kaynaklarını değiştirir ve bunu yapma izni, ekosistem parametresinin change_language parametresinde ayarlanır.

Parameters:

  * **Id** int - dil kaynakları ID.
  * **Trans** - anahtar olarak iki karakterlik bir dil kodu ve değer olarak çevrilmiş dize ile JSON biçiminde dize. Örneğin, `{"en": "English text", "zh": "Chinese text"}`.

### Import

Bir uygulamayı mevcut ekosisteme aktarır ve [ImportUpload](#importupload) sözleşmesinden yüklenen verileri içe aktarır.

Parameters:

  * **Data** string - ekosistem tarafından dışa aktarılan bir dosyadan gelen metin biçiminde içe aktarılan veriler.

### ImportUpload

Sonraki içe aktarma için geçerli ekosistemin buffer_data tablosuna harici bir uygulama dosyası yükler.

Parameters:
  * **InputFile** file - mevcut ekosistemin buffer_data tablosuna yazılmış bir dosya.

### NewAppParam

Mevcut ekosisteme yeni uygulama parametreleri ekler.

Parameters:
  * **ApplicationId** int - uygulama ID;
  * **Name** string - parametre adı;
  * **Value** string - parametre değeri;
  * **Conditions** string - parametreyi değiştirme izni.

### EditAppParam

Mevcut ekosistemdeki mevcut uygulama parametrelerini değiştirir.

Parameters:
  * **Id** int - uygulama parametre ID;
  * **Value** string "optional" - yeni parametre değeri;
  * **Conditions** string "optional" - parametreyi değiştirmek için yeni izinler.

### NewDelayedContract

Gecikmeli sözleşme zamanlayıcı arka plan programına yeni bir görev ekler.

Gecikmeli sözleşmeler planlayıcısı, o anda oluşturulan bloğun gerektirdiği sözleşmeleri çalıştırır.

Parameters:
  * **Contract** string - sözleşme adı;
  * **EveryBlock** int - sözleşme, bu kadar blok miktarında yürütülecektir;
  * Koşullar dizisi - görevi değiştirme izni;
  * **BlockID** int "optional" - sözleşmenin yürütülmesi gereken blok kimliği. Belirtilmezse, "geçerli blok kimliği" + EveryBlock eklenerek otomatik olarak hesaplanacaktır;
  * **Limit** int "optional" - maksimum görev yürütme sayısı. Belirtilmezse, görev sınırsız bir süre için yürütülecektir.

### EditDelayedContract

Gecikmeli sözleşmeler zamanlayıcı arka plan programında bir görevi değiştirir.

Parameters:
  * **Id** int - task ID;
  * **Contract** string - sözleşme adı;
  * **EveryBlock** int - sözleşme, bu kadar blok miktarında yürütülecektir;
  * **Conditions** string - görevi değiştirme izni;
  * **BlockID** int "optional" - sözleşmenin yürütülmesi gereken blok kimliği. Belirtilmezse, "geçerli blok kimliği" + EveryBlock eklenerek otomatik olarak hesaplanacaktır;
  * **Limit** int "optional" - maksimum görev yürütme sayısı. Belirtilmezse, görev sınırsız bir süre için yürütülecektir.
  * **Deleted** int "optional" -Görev değiştirme.`1` değeri görevi devre dışı bırakacaktır. `0` değeri, görevi etkinleştirecektir.


### UploadBinary

X_binaries tablosunda statik bir dosya ekler veya üzerine yazar. HTTP API aracılığıyla bir sözleşmeyi çağırırken, istek 'multipart/form-data' formatında olmalıdır; DataMimeType parametresi, form verileriyle birlikte kullanılacaktır.

Parameters:
  * **Name** string - statik dosyanın adı;
  * **Data** bytes - statik dosyanın içeriği;
  * **DataMimeType** string "optional" - mime tipi formatta statik bir dosya;
  * **ApplicationId** int - X_binaries tablosuyla ilişkili uygulama kimliği.


  DataMimeType parametresi iletilmezse, varsayılan olarak `application/octet-stream` formatı kullanılır.
