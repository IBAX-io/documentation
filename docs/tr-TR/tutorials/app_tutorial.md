# Uygulama geliştirme eğitimi {#tutorial-for-application-development}

Bu bölümde size IBAX Ağı üzerinde basit bir uygulamanın nasıl geliştirileceğini göstereceğiz.

- [Hedef](#the-goal)
  - [Bölüm 1: Çevre](#part-1-the-environment)
  - [Bölüm 2: Sözleşme](#part-2-contract)
    - [Oluşturucu hesabı](#creator-account)
    - [Yeni uygulama](#new-application)
    - [Yeni veritabanı tablosu](#new-database-table)
    - [Yeni Kontrat](#new-contract)
      - [Kontrat kodu](#contract-code)
      - [Bir kontrat oluşturun](#create-a-contract)
      - [Kontrat adı](#contract-name)
      - [Data](#data)
      - [Conditions](#conditions)
      - [Action](#action)
      - [Tam kontrat kodu](#full-contract-code)
      - [Kaydet ve çalıştır](#save-and-run)
  - [Bölüm 3: Sayfa](#part-3-page)
    - [New-field](#new-field)
    - [Sözleşmeyi güncelleyin](#update-the-contract)
    - [Sayfa](#page)
      - [Tasarımcı görünümleri](#designer-views)
      - [Geliştirici görünümü](#developer-view)
      - [Veritabanı tablosundan veri getir](#fetch-data-from-the-database-table)
      - [Sayfayı Kaydet](#save-the-page)
  - [Bölüm 4: Uygulama](#part-4-application)
    - [Menü](#menu)
      - [Bir menü öğesi ekleyin](#add-a-menu-item)
      - [Yeni menü öğesini test edin](#test-the-new-menu-item)
    - [Mesaj gönder](#send-a-message)
      - [Form](#form)
    - [Formda gezinme](#form-navigation)
      - [Gezinme butonları](#navigation-buttons)
      - [Değişkenler](#variables)
      - [Giriş sayısı](#entry-count)
      - [Tablo ofseti](#table-offset)
      - [Buton kodu](#button-code)
      - [Sayfa kodu](#page-refreshing)
  - [Sonuçlar](#conclusions)


## Amaç {#the-goal}

Uygulama basit işlevlerle başlar, ancak öğretici ilerledikçe karmaşıklığı artar.

Uygulamanın son sürümünde, bazı basit mesajlar (dizeler), gönderenlerin zaman damgalarını ve hesap tanımlayıcılarını içeren bir veritabanı tablosunda saklanır. Kullanıcılar, ekosistem menüsünden erişilebilen uygulama sayfasından mesaj listesini görüntüleyebilir ve yeni bir mesaj ekleyebilir.

## Bölüm 1: Environment {#part-1-the-environment}

**Weaver**

IBAX'in tek müşterisi olan Weaver, tüm kullanıcılar ve ekosistem rolleri için işlevler sağlar. Bununla uygulama geliştiriciler uygulamalarını geliştirebilir ve test edebilir, ekosistem yöneticileri ekosistemlerini yönetebilir ve kullanıcılar ekosistemlerle etkileşime girebilir.

Bu eğitimde, Weaver'da sözleşmeleri, sayfa şablonlarını kodlayacak ve diğer tüm eylemleri gerçekleştireceksiniz. Weaver ayrıca sözleşme kodlarını geri yüklemek, kaydetmek ve yürütmek, veri yapılarını (veritabanı tabloları) yönetmek, erişim izinleri atamak ve uygulamalar oluşturmak için bir yol sağlar.

Her düğümün kendi Weaver örneği vardır.

## 2. Bölüm: Sözleşme {#part-2-contract}

İlk basit uygulamanız "Merhaba Dünya!"

> Not

> Bu uygulamada dizeler bir veritabanı tablosunda tutulacak ve bir kullanıcı sayfası yok.

### Oluşturucu hesabı {#creator-account}

Geliştirici rolüne sahip hesaplara ekosistemin "kök" ayrıcalıkları atanacaktır. Varsayılan olarak, bu rol tüm eylemlere erişebilir. Yeni bir ekosistemde, oluşturucu hesaba, ekosistemde yeni uygulamalar ve veritabanı tabloları oluşturmak gibi büyük değişiklikler yapmak için kullanmanız gereken Yönetici rolü atanacaktır.

İçerik oluşturucu hesabını kullanarak ekosisteme giriş yapın.

### Yeni uygulama {#new-application}

Ekosistem yaratıcısı olarak oturum açtıktan sonra yeni bir uygulama oluşturabilirsiniz.

Yeni bir Uygulama Yarat:

1. Geliştirici sekmesine gidin;

 2. Soldaki menüden Uygulama'yı seçin;

 3. Uygulama sayfasında Yeni'yi seçin;

 4. Ad alanında uygulama adını belirtin;

 5. Koşullar'ı "doğru" olarak ayarlayın;

 "true", herkesin uygulamada değişiklik yapabileceği anlamına gelir;

 Başka bir seçenek de `ContractConditions("MainCondition")` olup, bu, yaratıcısı dışında hiç kimsenin uygulamada değişiklik yapamayacağı anlamına gelir.

 6. Uygulamanız uygulamalar listesinde görüntülenecektir, etkinleştirmek için belirli bir uygulamanın Ad alanına tıklayın.

> Not

> Geliştirici sekmesinde bir uygulamaya tıklayarak ilgili kaynaklara erişebilirsiniz, ekosistem üzerinde hiçbir etkisi yoktur. Hangisini seçerseniz seçin, tüm ekosistem uygulamaları hala mevcuttur.

### Yeni veritabanı tablosu {#new-database-table}

Verileri depolamak için Weaver'da uygulama için bir veritabanı tablosu oluşturun.

Bir veri tablosu oluşturun:

 1. Geliştirici sekmesinde, Uygulama - Ad > Veritabanı tablosu'nu seçin;

 Seçilen uygulamaya ilişkin tüm veritabanı tabloları burada görüntülenecektir. Liste boşsa, uygulamanız için henüz hiçbir veritabanı tablosu oluşturulmamıştır.

 2. Yeni；'ye tıklayın

 Weaver, yeni bir veritabanı tablosu oluşturmanız için size sayfayı gösterecektir.

 3. Ad alanında adı belirtin;

 Bu öğreticide, veritabanı tablosunun adı 'apptable' olacaktır.

 4. "Mesaj" sütununu ekleyin, türünü "Metin" olarak ayarlayın;

 Bu tablonun iki sütunu olmalıdır: "id" (ön tanımlı) ve "message". Daha sonra daha fazla sütun ekleyeceksiniz.

 5. Okuma ve yazma izinleriyle ilgili olarak, her alanı 'true' olarak ayarlayın;

 Bu, herkesin veritabanı tablosuna giriş eklemesine, girişleri güncellemesine, sütun eklemesine ve giriş verilerini okumasına olanak tanır;

 Bir seçenek olarak, yaratıcı hesabına okuma ve yazma izinlerini ayırabilirsiniz. Bu durumda, bu alanı `ContractConditions("MainCondition")` olarak ayarlayın.

### Yeni Kontrat {#new-contract}

#### Kontrat kodu {#contract-code}

Her sözleşmenin üç bölümü vardır. Daha fazla ayrıntı için lütfen bakınız: [Sözleşme yapısı](../topics/script.md#contract-structure)。

#### Bir kontrat oluşturun {#create-a-contract}

1. Geliştirici sekmesinde, Uygulama - Ad > Kontratı seçin;

 Uygulama ile ilgili tüm sözleşmeler burada görüntülenecektir. Yeni uygulamalar için liste boştur.

2. Yeni'yi tıklayın;

 Düzenleyicide yeni bir sözleşme şablonu görüntülenecektir.

Boş bir sözleşme şablonu aşağıdaki gibi gösterilir:

```
contract ... {
    data {

    }
    conditions {

    }
    action {

    }
}
```

#### Kontrat adı {#contract-name}

İlk olarak, lütfen sözleşme adını belirtin.

```  
    contract AppContract {

    }
```

#### Data {#data}

'data' bölümünü doldurun.

Aşağıdaki örnekte, "Mesaj" değişken adını belirtirken, "string" değişken türünü ifade eder.

```
    data {
        Message string
    }
```

#### Conditions {#conditions}

"Koşullar" bölümünü doldurun. Basit bir doğrulama koşulu, boş dizelerden kaçınmaktır. `Message`ın uzunluğu `0` ise, sözleşme uygulanırken önceden tanımlanmış bir uyarı mesajı tetiklenecektir.

```
conditions {
    // avoid writing empty strings
    if Size($Message) == 0 {
        error "Message is empty"
    }
}
```

#### Action {#action}

'action' bölümünü doldurun. Basit bir işlem, veri tablosuna "message" yazmaktır.

```
    action {
        DBInsert("apptable", {message: $Message})
    }
```

#### Tam kontrat kodu {#full-contract-code}

Tam kontrat kodu aşağıda gösterilmiştir.

IBAX'teki tüm kontratlar, "data", "conditons" ve "action" bölümleri dahil olmak üzere bu şekilde oluşturulacaktır. 

```
contract AppContract {
    data {
        Message string
    }
    conditions {
        // avoid writing empty strings
        if Size($Message) == 0 {
            error "Message is empty"
        }
    }
    action {
        DBInsert("apptable", {message: $Message})
    }
}
```
#### Kaydet ve çalıştır {#save-and-run}

Şimdi, sözleşmeyi test etmeye hazırlanıyoruz:

1. Editörün menüsünde Kaydet'e tıklayın;

 Bu, sözleşme kodunu güncelleyecek ve güncellenmiş sürüm tüm ağ düğümleri için geçerli olacaktır.

2. Editörün menüsünde Çalıştır'a tıklayın;

 Bu, Sözleşmeyi Çalıştır sayfasını görüntüler.

3. Sözleşmeyi Çalıştır sayfasında, sözleşmenin giriş parametrelerini girin;

 Bu sözleşmenin bir "Message" parametresi olduğundan, Anahtar alanına "Message" ve Değer alanına "Merhaba, Dünya"yı ayarlayın.

4. Çalıştır'a tıklayın.

 Sonuç sağda görüntülenecektir.

Bazı diziler başarıyla eklendiyse, sonuç, işlemlerin değişikliğini tanıtmak için blok kimliğini ve sonuç kodunu içerecektir.

```
{
 "block": "31",
 "result": null
}
```

## Bölüm 3: Sayfa {#part-3-page}

Sözleşme yürürlüğe girdiğinde, onu yararlı bir şeye genişletmenin zamanı geldi. Bu bölümde, UI ve diğer işlevleri uygulayacaksınız.

Not

Bu uygulamada, dizeler, bir günlükteki girişler gibi bir veritabanı tablosunda saklanacaktır. Her dizenin bir yazarı ve zaman damgası olacaktır.

Kullanıcılar, daha sonra basit bir form olarak gösterilen uygulama sayfasında saklanan dizelerin listesini görüntüleyebilir.

### New field {#new-field}

Öncekinde olduğu gibi, Geliştirici sekmesi > Uygulama - Ad > Veritabanı tablosu sayfasında veritabanı tablosunu düzenleyin;

`apptable` içine aşağıdaki alanları ekleyin:

* `author` , `Number` alan türü, Değiştir'i `true` olarak ayarlayın;

Bu alan, author hesabının tanımlayıcısını saklayacaktır.

* `timestamp` , `Date/Time` alan türü, Change'i 'true' olarak ayarlayın.

### Kontratı güncelleyin {#update-the-contract}

AuthorID ve timestamp işlemek için kontrat kodunu güncelleyeceğiz.

Yazar kimliği, ekosistemin hesap kimliğidir. Timestamp, sözleşmenin Unix zaman biçiminde yürütüldüğü tarih ve saattir.

Her iki değer de [Önceden tanımlanmış değişkenler](../topics/script.md#variables) tarafından sağlandığından ve önceden tanımlanmış değişkenlerin girilmesine veya doğrulanmasına gerek olmadığından, bunlar yalnızca işlem bölümünde güncellenebilir.

AuthorID "$key_id", timestamp ise "$time" ile tanımlandığı bir mesaj eklerken veritabanı tablosuna AuthorID ve timestamp yazmak için sözleşmeyi güncelleyin.

```
action {
 DBInsert("apptable", {message: $Message, author: $key_id, timestamp: $time})
}
```

### Sayfa {#page}

Uygulama sayfası için, veritabanı tablosunda saklanan mesajların görüntülendiği basit bir sayfadır.

Diğer tüm kaynaklar gibi, UI sayfasını Weaver'da oluşturabilirsiniz:

1.Geliştirici sekmesine gidin, Uygulama - Ad > Sayfa'yı tıklayın;

2. Yeni'yi tıklayın;
 Görsel tasarımcı yeni bir sekmede açılacaktır.

#### Tasarımcı görünümleri {#designer-views}

Varsayılan sayfa boş. Sayfayı hızlı bir şekilde doldurmak için önceden tanımlanmış yapıyı kullanabilirsiniz.

Temel bir tablo oluşturun:

1. Sağdaki görünüm seçicide Tasarımcı'yı tıklayın;
 Görünüm, görsel tasarımcıya geçecektir.

2. Soldaki menüde Başlıklı Tablo'yu seçin ve sayfaya sürükleyin.
    Sayfada birden çok öğeye sahip bir tablo görüntülenecektir.

#### Geliştirici görünümü {#developer-view}

IBAX'in kullanıcı sayfası bir [Şablon Dili](../topics/templates2.md) ile kodlandığından, sayfa kodunu yazarken lütfen Geliştirici görünümüne geçin.

Geliştirici görünümüne geçin.

1. Sağdaki görünüm seçicide Geliştirici'ye tıklayın.

 Görünüm, sayfa kodunu tutan bir sekme ile düzenleyiciye geçecektir.
 
#### Veritabanı tablosundan veri alın {#fetch-data-from-the-database-table}
Şimdiye kadar, sayfa şablonuyla hiçbir şey yapılmadı. Bir sonraki adımda, sayfanın `apptable`dan veri görüntülemesine izin vermek için kodu güncelleyeceğiz.

1. [DBFind](../topics/script.md#dbfind) işleviyle veritabanı tablosundan veri istemek için;

 Aşağıdaki örnekte, bu işlev çağrısı `apptable`dan veri almak için kullanılır. Veriler, kaynak `src_table` içine yerleştirilecek ve zaman damgası alanına göre sıralanacaktır. `src_table` daha sonra tablo görünümündeki sayfa için veri kaynağı olarak kullanılacaktır.

 ```
    DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)
 ```

2. `src_table`dan gelen verileri görüntülemek için, bunu `Table` işlevinde veri kaynağı ve başlık olarak belirtin.

```
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
```

3. Sağdaki görüntü seçmede, verileri doğru görüntüleyip kontrol etme için önizleme'ye tıklayın.

#### Tam sayfa kodu {#full-page-code-1}

Bu bölümün tam sayfa kodu aşağıdadır. Bu temel sayfa daha sonra genişletilecektir.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)

Div(Class: panel panel-primary) {
    Div(Class: panel-heading, Body: Table block)
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
    Div(Class: panel-footer text-right) {
    Button(Class: btn btn-primary, Contract: ContractName, Body: More)
    }
}

```

#### Sayfayı kaydedin {#save-the-page}

Sayfayı kaydetmek için Kaydet'e tıklayın:

1. Sayfa Adı alanında `AppPage` veya sayfa için başka bir ad belirtin;

2. Menüde `default_menu` öğesini seçin;

3. Koşullar'ı `true` olarak ayarlayın;

4. Tamam'a tıklayın.

## Bölüm 4: Uygulama {#part-4-application}

Önceki bölümlerde bir sözleşme, verileri depolamak için bir tablo ve bu verileri görüntülemek için temel bir kullanıcı arayüzü sayfası oluşturdunuz.

Bu bölümde, görünüşünü ve eylemlerinin gerçek olana benzer olmasını sağlamak için uygulamayı sonlandıracaksınız.

### Menü {#menu}

Sayfanın bir menüye bağlanması gerekir; örneğin, Ana Sayfa sekmesinde görüntülenen `default_page`, varsayılan ekosistem menüsü `default_menu` ile bağlantılıdır.

Bu uygulama öğreticisi çok basit olduğundan (yalnızca bir sayfaya sahip olduğundan), bunun için ayrı bir menü oluşturmaya gerek yoktur. Varsayılan menüdeki yeni menü öğesi yeterlidir.

> Not

> Geliştirici sekmesi > Uygulama - Ad > Sayfa'da sayfa özelliklerini düzenleyerek sayfa menüsünü tanımlayabilirsiniz. Örneğin, uygulamanızın birden fazla sayfası varsa, bu sayfalar arasında gezinmek için bir menü oluşturmanız ve bunu uygulamanın tüm sayfalarına atamanız gerekebilir.

#### Bir menü öğesi ekleyin {#add-a-menu-item}

Diğer tüm kaynaklar gibi, menüler de Weaver'da oluşturulabilir ve düzenlenebilir:

1. Geliştirici sekmesi > Menü'ye gidin;

2. `default_menu` girişinin Adını tıklayın;

 Editörde yeni bir sekme açılacaktır.

3. Şablonun sonuna, uygulama sayfasını açmak için bağlanacak yeni bir menü öğesi ekleyin ve simgesi [FontAwesome](https://fontawesome.com/icons) simge setinden gelir.

```
    MenuItem(Title:Messages, Page:AppPage, Icon:"fa fa-envelope")
```

4. Kaydet'e tıklayın.
#### Yeni menü öğesini test edin {#test-the-new-menu-item}

Yeni menü öğesinin geçerli olup olmadığını kontrol edin:

1. Giriş sekmesini açın;

2. Menüde Yenile'ye tıklayın;

    Mesaj başlığına sahip bir giriş görünecektir;

3. Mesajlar'a tıklayın.

    Başvuru sayfası açılacaktır.
### Bir mesaj göndermek {#send-a-message}

Logicor'daki düğmeler, parametrelere bağlı olarak sözleşmeleri uygulamak ve sayfaları açmak için kullanılabilir.

[Button](../topics/templates2.md#button) işlevinin iki sözleşme parametresi vardır:

*  `Contract`

    Etkinleştirilen sözleşmenin adı.

*  `Params`

    Sözleşmenin giriş parametreleri.

#### Form {#form}

Sözleşmeye veri göndermek için, başvuru sayfasına bir mesaj için bir giriş alanına ve sözleşmeyi AppContract'ı etkinleştirmek için bir düğmeye sahip olması gereken bir form ekleyin.

Aşağıda bu tür bir formun bir örneği verilmiştir. Kendi [Div](../topics/templates2.md#div) içinde yuvalanmıştır. [Girdi](../topics/templates2.md#input) alanının önceden tanımlanmış bir "message_input" ada sahip olduğunu tanımlayan form görünümünü içeren Div öğesinin arkasına koymak. Düğme, sözleşmeye `Mesaj` değerini göndermek için bu ismi kullanır. Son olarak, giriş alanının değerini almak için [Val](../topics/templates2.md#calling-contracts) işlevi kullanılır.

```
Div(Class: panel panel-primary) {
 Form() {
 Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
 Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)")
 }
}
```

Bu yeni özelliği mesaj göndererek test ederken formun yenilenmediğini fark edebilirsiniz. Bu, [sayfa yenilemede](#page-refreshing) tanıtılacaktır.

### Formda gezinme {#form-navigation}

Varsayılan görünümde, sayfadaki form ilk sayfada yalnızca 25 girdi görüntüleyebilir. Bu nedenle, kullanıcıları tüm form girişlerine yönlendirmek için bazı basit düğmeler ekleyebilirsiniz.

#### Yön butonları {#navigation-buttons}

İki gezinme butonu olacak ve her biri uygulama sayfasını yeniden yükleyebilir ve parametreleri ona iletebilir.

* Önceki buton ilk 25 girişi görüntüleyecektir. Başka giriş yoksa buton görüntülenmez;

* Sonraki butonunda sonraki 25 girişi görüntüleyecektir. Başka giriş yoksa, buton görüntülenmez.

#### Değişkenler {#variables}

Gezinme düğmeleri, tablo görünümü durumlarını depolamak için iki değişken gerektirir:

*  `#table_view_offset#`

Bu değişken, mevcut tablo görünümünün ofsetini saklar.

Sayfa yeniden yüklendiğinde gezinme düğmeleri bunu bir parametre olarak iletecektir.

*  `#record_count#`

 Bu değişken, tablodaki toplam giriş sayısını saklar.

 Değer hesaplanacaktır.

#### Giriş sayısı {#entry-count}

`#record_count#` saymak için lütfen mevcut [DBFind](../topics/script.md#dbfind) işlev çağrısını değiştirin. `.count()` çağrısında belirtilen değişken, giriş sayısını saklayacaktır.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count)
```

#### Tablo ofseti {#table-offset}

Sayfa açıldığında tablo görünümü ofseti sayfaya geçirilmelidir. `#table_view_offset#` bir değer almazsa 0 olarak ayarlayın.

Aşağıdaki kodu sayfanın en üstüne ekleyin.

```
If(GetVar(table_view_offset)){

}.Else{
    SetVar(table_view_offset, 0)
}
```

[DBFind](../topics/script.md#dbfind) işlev çağrısını yeniden değiştirin. Bu sefer yeni tablo görünümü ofsetini kullanmalıdır.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
```

#### Buton kodu {#button-code}

Find the [Div](../topics/templates2.md#div) function call that defines the footer: `Div(Class:panel-footer text-right)`. Add the button code into it.

```
Div(Class: panel-footer text-right) {
}
```

*Previous* düğmesi yalnızca geri dönülecek en az bir Sonraki varsa görünür. Bir düğme eklerken, sayfanın yeni tablo görünümü ofset 'offset_previous' hesaplanacaktır. Parametreler, yeniden açılan sayfanın 'PageParams'ına iletilir.

```
If(#table_view_offset# >= 25) {
    SetVar(offset_previous, Calculate(#table_view_offset# - 25))
    Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
}
```

Sonraki düğmesi, yalnızca toplam kayıt sayısı sayfada görüntülenen sayıdan fazla olduğunda görüntülenecektir. Bir düğme eklendiğinde, sayfanın yeni tablo görünümü ofset 'offset_next' hesaplanacaktır. Parametreler, yeniden açılan sayfanın 'PageParams'ına iletilir.

```
If(#record_count# >= Calculate(#table_view_offset# + 25)) {
    SetVar(offset_next, Calculate(#table_view_offset# + 25))
    Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
}
```

Bu düğmeleri ekledikten sonra sayfayı kaydedin ve Ana Sayfa > Mesajlar menü öğesinden test edin.

#### Sayfa yenileme {#page-refreshing}

Uygulanacak son işlev, sayfadaki tabloyu otomatik olarak güncellemektir. Kullanıcılar yeni bir mesaj gönderdiğinde, tabloda görüntülenmelidir.

Sözleşmeyi uygulamaya ek olarak, aynısını elde etmek için mevcut sayfayı yeniden açmak için Gönder düğmesini de kullanabilirsiniz. `#table_view_offset#` sayfaya herhangi bir değişiklik yapılmadan geçirilmelidir.

Gönder düğmesine `Page` ve `PageParams` ekleyin, kod aşağıdaki gibidir:

```
Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
```


### Tam sayfa kodu {#full-page-code-2}

Bu bölüm, uygulama sayfasındaki birçok değişikliği açıklar. Uygulama sayfasının tam kodu aşağıdadır.

```
If(GetVar(table_view_offset)){
}.Else{
    SetVar(table_view_offset, 0)
}
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
    Div(Class: panel panel-primary) {
        Div(Class: panel-heading, Body: Table block)
        Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
        Div(Class: panel-footer text-right) {
            If(#table_view_offset# >= 25) {
                SetVar(offset_previous, Calculate(#table_view_offset# - 25))
                Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
            }
            If(#record_count# >= Calculate(#table_view_offset# + 25)) {
                SetVar(offset_next, Calculate(#table_view_offset# + 25))
                Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
            }
        }
    }
    Div(Class: panel panel-primary) {
    Form() {
        Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
        Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
    }
}
```

## Sonuçlar {#conclusions}

Uygulama geliştiriciler için yerleşim stilleri, erişim izinleri yönetimi ve uygulamalar ve kaynaklar arasındaki etkileşim gibi diğer önemli konuları açıklamak yerine, bu öğretici bir ekosistem için temel bir uygulamanın nasıl oluşturulacağını anlatır. Bu ileri düzey konular hakkında daha fazla bilgi için diğer ilgili belgelere bakın.
