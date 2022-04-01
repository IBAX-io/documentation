# Şablon Dili

  - [Sayfa yapımı](#sayfa-yapımı)
    - [Şablon Engine](#şablon-engine)
    - [Sayfalar oluşturun](#sayfalar-oluşturun)
      - [Görsel sayfa tasarımcısı](#görsel-sayfa-tasarımcısı)
      - [Uygulanabilir stiller](#uygulanabilir-stiller)
      - [Sayfa modülü](#sayfa-modülü)
      - [Dil kaynağı düzenleyicisi](#dil-kaynağı-düzenleyicisi)
  - [Logicor şablon dili](#logicor-şablon-dili)
    - [Logicor'a genel bakış](#logicor'a-genel-bakış)
      - [Sayfalara parametreler iletmek için PageParams kullanın](#sayfalara-parametreler-iletmek-için-PageParams-kullanın)
      - [Arama sözleşmeleri](#arama-sözleşmeleri)
  - [Mantıksal fonksiyon sınıflandırması](#mantıksal-fonksiyon-sınıflandırması)
    - [Değişkenler üzerinde işlemler:](#değişkenler-üzerinde-işlemler)
    - [Navigasyon işlemleri:](#navigasyon-işlemleri)
    - [Veri işleme:](#veri-işleme)
    - [Veri sunumu:](#Veri-sunumu)
    - [Verilerin kabulü:](#verilerin-kabulü)
    - [Veri biçimlendirme öğeleri:](#veri-biçimlendirme-öğeleri)
    - [Form element:](#form-element)
    - [Kod bloklarındaki işlemler:](#kod-bloklarındaki-işlemler)
  - [Mantıksal işlev başvuruları](#mantıksal-işlev-başvuruları)
    - [Address](#address)
    - [AddressToId](#addresstoid)
    - [AddToolButton](#addtoolbutton)
    - [And](#and)
    - [AppParam](#appparam)
    - [ArrayToSource](#arraytosource)
    - [Binary](#binary)
    - [Button](#button)
    - [Calculate](#calculate)
    - [Chart](#chart)
    - [CmpTime](#cmptime)
    - [Code](#code)
    - [CodeAsIs](#codeasis)
    - [Data](#data)
    - [Custom](#custom)
    - [DateTime](#datetime)
    - [DBFind](#dbfind)
    - [Div](#div)
    - [EcosysParam](#ecosysparam)
    - [Em](#em)
    - [ForList](#forlist)
    - [Form](#form)
    - [GetColumnType](#getcolumntype)
    - [GetHistory](#gethistory)
    - [GetVar](#getvar)
    - [Hint](#hint)
    - [If](#if)
    - [Image](#image)
    - [ImageInput](#imageinput)
    - [Include](#include)
    - [Input](#input)
    - [InputErr](#inputerr)
    - [InputMap](#inputmap)
    - [JsonToSource](#jsontosource)
    - [Label](#label)
    - [LangRes](#langres)
    - [LinkPage](#linkpage)
    - [Map](#map)
    - [MenuGroup](#menugroup)
    - [MenuItem](#menuitem)
    - [Money](#money)
    - [Or](#or)
    - [P](#p)
    - [QRcode](#qrcode)
    - [RadioGroup](#radiogroup)
    - [Range](#range)
    - [Select](#select)
    - [SetTitle](#settitle)
    - [SetVar](#setvar)
    - [Span](#span)
    - [Strong](#strong)
    - [SysParam](#sysparam)
    - [Table](#table)
    - [TransactionInfo](#transactioninfo)
    - [VarAsIs](#varasis)
  - [App styles for mobile devices](#app-styles-for-mobile-devices)
    - [Layout](#layout)
      - [Title](#title)
      - [Strong-class names](#strong-class-names)
      - [Color](#color)
      - [Grid](#grid)
      - [Panel](#panel)
      - [Form](#form-app)
      - [Button](#button-app)
      - [Icon](#icon)

## Sayfa yapımı

Weaver'ın Entegre Geliştirme Ortamı (IDE), bir JavaScript kitaplığı olan React kullanılarak oluşturulmuştur. Sayfa düzenleyicisi ve görsel sayfa tasarımcısı vardır. Sayfalar, tablolardan veri almak ve görüntülemek, kullanıcı girdi verilerini almak için formlar oluşturmak, sözleşmelere veri iletmek ve uygulama sayfaları arasında gezinmek için kullanılan bir uygulamanın temel parçalarıdır. Sözleşmeler gibi, sayfalar da blok zincirinde depolanır, bu da yazılım istemcisine yüklendiğinde kurcalamaya karşı dayanıklı olmalarını sağlayabilir.

### Şablon Engine

Sayfa öğeleri (sayfalar ve menüler), geliştiriciler tarafından Weaver'ın sayfa düzenleyicisindeki şablon dilini kullanarak bir doğrulama düğümünün şablon motorunda oluşturulur. Tüm sayfalar, IBAX'in geliştirme ekibi tarafından geliştirilen Logicor dili kullanılarak oluşturulmuştur. Ağdaki düğümlerden sayfa istemek için content/... API komutlarını kullanın. Şablon motorunun bu tür bir isteğe yanıt olarak gönderdiği şey bir HTML sayfası değil, şablon yapısına uygun bir ağaç oluşturan HTML etiketlerinden oluşan bir JSON kodudur. Şablon motorunu test etmek istiyorsanız, [content](../reference/api2.md#content) API komutuna başvurabilirsiniz.

### Sayfalar oluşturun

Weaver'ın yönetim aracının Sayfalar bölümünde bulunabilen sayfaları oluşturmak ve düzenlemek için sayfa düzenleyiciyi kullanabilirsiniz. Düzenleyici şunlar için kullanılabilir:

* Sayfa kodunu yazın, Logicor şablon dilinin anahtar sözcüklerini vurgulayın;
* Sayfalardaki menüleri seçin ve görüntüleyin;
* Menü sayfasını düzenleyin;
* Sözleşme Koşulları işlevinde izinli sözleşme adını belirterek veya Değişiklik koşullarında erişim iznini doğrudan belirterek, sayfaları değiştirme iznini yapılandırın;
* Görsel sayfa tasarımcısını başlatın;
* Önizleme sayfaları.

#### Görsel sayfa tasarımcısı

Görsel sayfa tasarımcısı, Logicor dilinde arayüz kodlarını kullanmadan sayfa düzenleri oluşturmak için kullanılabilir. Bununla, bu tür öğeleri sürükleyip bırakarak sayfalardaki form öğelerinin ve metnin konumunu ayarlayabilir ve sayfa bloklarının boyutunu yapılandırabilirsiniz. Standart veri modellerini sunmak için bir dizi kullanıma hazır blok sağlar: başlıklar, formlar ve bilgi panelleri ile. Görsel sayfa tasarımcısında bir sayfa oluşturduktan sonra sayfa düzenleyicide veri almak için program mantığı ve koşullu yapı yazabilirsiniz. Gelecekte, ek işlevlere sahip görsel bir sayfa tasarımcısı oluşturmayı planlıyoruz.

#### Uygulanabilir stiller

Varsayılan olarak, sayfalar Angular'ın Bootstrap Angle stiliyle sunulur. Kullanıcılar ihtiyaçlarına göre kendi stillerini oluşturabilirler. Stil, ekosistem parametre tablosundaki stil parametresi stil sayfasında saklanır.

#### Sayfa modülü

Bir kod bloğunu birden çok sayfada kullanmak için, onu tutmak ve sayfa koduna gömmek için bir sayfa modülü oluşturabilirsiniz. Sayfa modülleri Weaver'ın Modül Bloklarında oluşturulabilir ve düzenlenebilir. Sayfalar gibi düzenleme izinleri tanımlanabilir.

#### Dil kaynağı düzenleyicisi

Weaver, Logicor şablon dilinin **LangRes** işlevini kullanarak sayfa yerelleştirme için bir mekanizma içerir. Sayfadaki dil kaynak etiketlerini, yazılım istemcisinde veya tarayıcıda kullanıcı tarafından seçilen dile karşılık gelen metin satırlarıyla değiştirebilir. **LangRes** işlevi yerine **$lable$** kısa sözdizimini kullanabilirsiniz. Sözleşme tarafından başlatılan açılır pencerelerdeki mesajların çevirisi, Needle'ın **LangRes** işlevi tarafından gerçekleştirilir.

Weaver'ın Dil kaynakları bölümünde dil kaynakları oluşturabilir ve düzenleyebilirsiniz. Bir dil kaynağı, etiket adlarından ve bu adın farklı dillerdeki karşılık gelen çevirisinin yanı sıra karşılık gelen iki harfli dil tanımlayıcısından (EN, ZH, JP, vb.) oluşur.

Dil kaynakları ekleme ve değiştirme izinleri, diğer tablolarla aynı şekilde tanımlanabilir.

## Logicor şablon dili

Logicor işlevleri aşağıdaki işlemleri sağlar:

* Veritabanından değerleri alma: ```DBFind```, veritabanından alınan verileri tablolar ve grafikler olarak gösteren;
* Değişken değerleri atamak ve görüntülemek için veri işlemleri: ```SetVar, GetVar, Data```;
* Tarih/saat değerlerini görüntüleme ve karşılaştırma: ```DateTime, Now, CmpTime```;
* Formlar oluşturmak için çeşitli kullanıcı verisi giriş alanlarını kullanın: ```Form, ImageInput, Input, RadioGroup, Select```;
* Hata mesajlarını görüntüleyerek form alanındaki verileri doğrulayın: ```Validate, InputErr```;
* Gezinme öğelerini görüntüleme: ```AddToolButton, LinkPage, Button```;
* Çağrı sözleşmeleri: ``` Düğme```;
* Çeşitli etiketler dahil olmak üzere HTML sayfa düzeni öğeleri oluşturma ve belirli css sınıflarını seçme: ```Div, P, Span, vb```;
* Sayfalara resim yerleştirme ve boşaltma: ```Image, ImageInput```;
* Sayfa düzeni parçasının görüntülenme koşulları: ```If, ElseIf, Else```;
* Çok seviyeli menüler oluşturma;
* Sayfa yerelleştirme.

### Logicor'a genel bakış

Logicor sayfa şablonu dili, bir işlevin başka bir işlevi ``FuncName(parameters)``` çağırmasına ve işlevleri iç içe yerleştirmesine izin veren işlevsel bir dildir. Parametreleri tırnak işaretleri olmadan belirtebilir ve gereksiz parametreleri silebilirsiniz.

Parametre virgül içeriyorsa, tırnak içine alınmalıdır (geri tırnak veya çift tırnak). Bir işlevin yalnızca bir parametresi varsa, tırnak işaretleri olmadan virgül kullanabilirsiniz. Ayrıca, parametrenin eşleşmemiş bir kapatma parantezi varsa, tırnak işaretleri kullanılmalıdır.

Bir parametreyi tırnak içine alırsanız ancak parametrenin kendisi tırnak işaretleri içeriyorsa, metinde farklı tırnak türleri veya birden çok tırnak kullanabilirsiniz.

İşlev tanımında her parametrenin belirli bir adı vardır. İşlevi çağırabilir ve parametreleri bildirim sırasına göre veya herhangi bir parametre kümesini herhangi bir ad sırasına göre belirtebilirsiniz: ```Parametre_adı: Parametre_değeri```. Bu yöntemi kullanarak, geçerli şablonla uyumluluğu bozmadan yeni işlev parametrelerini güvenle ekleyebilirsiniz:

İşlevler, metin döndürebilir, HTML öğeleri oluşturabilir (örneğin, ```Input```) veya iç içe HTML öğeleriyle (```Div, P, Span```) HTML öğeleri oluşturabilir. İkinci durumda, iç içe öğeyi tanımlamak için önceden tanımlanmış Gövde adında bir parametre kullanılır. Örneğin, iki div'i başka bir div'e yerleştirmek şöyle görünür:

Body parametresinde açıklanan iç içe öğeleri tanımlamak için şu gösterim kullanılabilir: ```FuncName(...){...}```. İç içe öğeler parantez içinde belirtilmelidir:

Aynı işlevi art arda birden çok kez belirtmeniz gerekiyorsa, adını her seferinde yazmak yerine `.` noktasını kullanabilirsiniz. Örneğin, aşağıdakiler aynıdır:

Bu dil ile SetVar fonksiyonu ile bir değişken atayabilir ve değerine `#name#` ile başvurabilirsiniz.

Ekosistemin dil kaynaklarına başvurmak için, dilin adı langres olan `$langres$` kullanabilirsiniz.

Aşağıdaki değişkenler önceden tanımlanmıştır:

* `#key_id#` - Mevcut kullanıcının hesap adresi;
* `#ecosystem_id#` - Mevcut ekosistem ID;
* `#guest_key#` - Konuk hesabının adresi;
* `#isMobile#` - 1, Weaver bir mobil cihazda çalışıyorsa.

#### Sayfalara parametreler iletmek için PageParams kullanın

Birçok işlev, yeni bir sayfaya yeniden yönlendirme yaparken parametreleri iletmek için kullanılan PageParams parametresini destekler. Örneğin: PageParams: `"param1=değer1,param2=değer2"`. Parametre değeri, basit bir dize veya referans değerine sahip bir değişken olabilir. Parametreleri sayfalara aktarırken, parametre adına sahip bir değişken oluşturulur, örn. "#param1#" ve "#param2#".

* `PageParams: "hello=world"` - Yeni sayfa, değer olarak world ile birlikte merhaba parametresini alır;
* `PageParams: "hello=#world#"` - Yeni sayfa, dünya değişkeninin değeriyle merhaba parametresini alır.

Ayrıca Val işlevi, yeniden yönlendirmede belirtilen formlardan veri alabilir.

* `PageParams: "hello=Val(world)"` - Yeni sayfa, world form öğesinin değeriyle merhaba parametresini alır.

#### Arama sözleşmeleri

Logicor, bir formdaki Düğme işlevine tıklayarak sözleşme çağrılarını uygular. Bir olay tetiklendiğinde, kullanıcının sayfadaki bir form alanına girdiği veriler sözleşmeye aktarılacaktır. Form alan adı, çağrılan sözleşmenin veri bölümündeki değişken adına karşılık geliyorsa, veriler otomatik olarak aktarılacaktır. Düğme işlevi, kullanıcının sözleşmenin yürütüldüğünü doğrulaması için kalıcı bir pencere açmasına ve sözleşme başarıyla yürütüldüğünde belirtilen sayfaya yeniden yönlendirmeyi başlatmasına ve belirli parametreleri sayfaya geçirmesine olanak tanır.

## Mantıksal fonksiyon sınıflandırması

### Değişkenler üzerinde işlemler:

|        |        |         |
| ------ | ------ | ------- |
| [GetVar](#getvar) | [SetVar](#setvar) | [VarAsIs](#varasis) |

### Navigasyon işlemleri:

|               |        |          |
| ------------- | ------ | -------- |
| [AddToolButton](#addtoolbutton) | [Button](#button) | [LinkPage](#linkpage) |

### Veri işleme:

|           |          |       |
| --------- | -------- | ----- |
| [Calculate](#calculate) | [DateTime](#datetime) | [Money](#money) |
| [CmpTime](#cmptime)   |          |       |

### Veri sunumu:

|          |           |          |
| -------- | --------- | -------- |
| [Code](#code)     | [Hint](#hint)      | [MenuItem](#menuitem) |
| [CodeAsIs](#codeasis) | [Image](#image)     | [QRcode](#qrcode)   |
| [Chart](#chart)    | [MenuGroup](#menugroup) | [Table](#table)    |
| [ForList](#forlist)  |           |          |

### Verilerin kabulü:

|             |               |                 |
| ----------- | ------------- | --------------- |
| [Address](#address)     | [EcosysParam](#ecosysparam)   | [LangRes](#langres)         |
| [AddressToId](#addresstoid) | [GetHistory](#gethistory)    | [Range](#range)           |
| [AppParam](#appparam)    | [GetColumnType](#getcolumntype) | [SysParam](#sysparam)        |
| [Data](#data)        | [JsonToSource](#jsontosource)  | [Binary](#binary)          |
| [DBFind](#dbfind)      | [ArrayToSource](#arraytosource) | [TransactionInfo](#transactioninfo) |

### Veri biçimlendirme öğeleri:

|      |          |        |
| ---- | -------- | ------ |
| [Div](#div)  | [SetTitle](#settitle) | [Span](#span)   |
| [Em](#em)   | [Label](#label)    | [Strong](#strong) |
| [P](#p)    |          |        |

### Form element: 

|            |            |          |
| ---------- | ---------- | -------- |
| [Form](#form)       | [InputErr](#inputerr)   | [InputMap](#inputmap) |
| [ImageInput](#imageinput) | [RadioGroup](#radiogroup) | [Map](#map)      |
| [Input](#input)      | [Select](#select)     |          |

### Kod bloklarındaki işlemler: 

|      |      |         |
| ---- | ---- | ------- |
| [If](#if)   | [Or](#or)   | [Include](#include) |
| [And](#and)  |      |         |



## Mantıksal işlev başvuruları

### Address

Bu işlev, belirli bir hesap adresinin `xxxx-xxxx-...-xxxx` cüzdan adresini döndürür; adres belirtilmemişse, parametre olarak mevcut kullanıcının hesap adresi kullanılacaktır.

#### Syntax

```
Address(account)

```
> Address
  * `account`
  
    Hesap adresi.

#### Example

```
Span(Your wallet: Address(#account#))
```

### AddressToId

Belirli bir cüzdan adresinin xxxx-xxxx-...-xxxx hesap adresini döndürür.

#### Syntax

```
AddressToId(Wallet)
```

> AddressToId
  * `Wallet`
  
    The wallet address in XXXX-...-XXXX format.

#### Example

```
AddressToId(#wallet#)
```

### AddToolButton

addtoolbutton öğesiyle bir düğme paneli oluşturun.

#### Syntax

```
AddToolButton(Title, Icon, Page, PageParams)
 [.Popup(Width, Header)]
```



> AddToolButton

  * `Title`
  
    Buton başlığı.

  * `Icon`
  
    Buton icon stili.

  * `Page`
  
    Yönlendirilen sayfanın adı.

  * `PageParams`
  
    Sayfaya aktarılan parametreler.

    

> Popup

  Modal penceresi açılır.
  * `Header`

    Pencerenin başlığı.
  * `Width`

      Pencere genişliğinin yüzdesi.
       Aralığı 1 ila 100 arasındadır.

#### Example

```
AddToolButton(Title: $@1broadcast$, Page: @1notifications_broadcast, Icon: icon-plus).Popup(Header: $@1notifications_broadcast$, Width: "50")
```

### And

Mantıksal bir işlemin sonucunu döndürür. Parantez içinde listelenen tüm parametreler virgülle ayrılır. Parametrelerden biri boş bir dize, sıfır veya `false` ise, parametre değeri `false`, aksi takdirde parametre değeri `true` olur. Parametre değeri `true` ise, fonksiyon `1`, aksi halde `0` döndürür.

#### Syntax

```
And(parameters)
```

#### Example

```
If(And(#myval1#,#myval2#), Span(OK))
```

### AppParam

Geçerli ekosistemin app_params tablosundan alınan uygulama parametresi değerini çıktılayın. Belirtilen ada sahip bir dil kaynağı varsa, değeri otomatik olarak değiştirilecektir.

#### Syntax
```
AppParam(App, Name, Index, Source)

```

> AppParam
  * `App`
  
    Uygulama ID.
  * `Name`

    Parametre adı.
  * `Index`

    Parametre değeri virgülle ayrılmış bir liste olduğunda kullanılabilir.
     Parametre öğeleri dizini, 1'den başlar. Örneğin, `type = full,light` ise, `AppParam(1, type, 2)`, `light` değerini döndürür.
     Source parametresi ile birlikte kullanılamaz.
  * `Source`

    Parametre değeri virgülle ayrılmış bir liste olduğunda kullanılabilir.
     Öğeleri belirli parametrelerin değerleri olan bir veri nesnesi oluşturun. Bu nesne, [Tablo](#table) ve [Seç](#select) işlevleri için bir veri kaynağı olarak kullanılabilir.
     Index parametresi ile birlikte kullanılamaz.

#### Example

```
AppParam(1, type, Source: mytype)
```

### ArrayToSource

Bir arraytosource öğesi oluşturun ve onu bir JSON dizisinin anahtar/değer çiftleriyle doldurun. Elde edilen veriler, daha sonra kaynak giriş işlevinde (örn. Tablo) kullanılabilecek olan Kaynak öğesine yerleştirilir.

#### Syntax
```
ArrayToSource(Source, Data)

```

> ArrayToSource
  * `Source`
  
    Veri kaynağı adı.
  * `Data`

    Bir JSON dizisi veya bir JSON dizisi (`#name#`) içeren bir değişken adı.

#### Example

```
ArrayToSource(src, #myjsonarr#)
ArrayToSource(dat, [1, 2, 3])
```

### Binary

İkili tablo ikili dosyalarında depolanan statik dosyalara bağlantılar döndürür.

#### Syntax
```
Binary(Name, AppID, MemberID)[.ById(ID)][.Ecosystem(ecosystem)]
```

> Binary
  * `Name`
  
    Dosya adı.
  * `AppID`
  
    Uygulama ID.
  * `MemberID`

    Hesap adresi, varsayılan olarak 0.
  * `ID`

    Statik dosya ID.
  * `Ecosystem`

    Ekosistem ID. Belirtilmezse, mevcut ekosistemden ikili dosya istenir.

#### Example

```
Image(Src: Binary("my_image", 1))
Image(Src: Binary().ById(2))
Image(Src: Binary().ById(#id#).Ecosystem(#eco#))
```

### Button

Bir sözleşme çağırmak veya bir sayfa açmak için bir düğme oluşturacak bir düğme HTML öğesi oluşturun.

#### Syntax
```
Button(Body, Page, Class, Contract, Params, PageParams)
 [.CompositeContract(Contract, Data)]
 [.Alert(Text, ConfirmButton, CancelButton, Icon)]
 [.Popup(Width, Header)]
 [.Style(Style)]
 [.ErrorRedirect((ErrorID,PageName,PageParams)]
```

> Button
  * `Body`
  
    Child text veya element.
  * `Page`

    Yönlendirilen sayfanın adı.
  * `Class`

    Buton class
  * `Contract`

    Aranan sözleşmenin adı.
  * `Params`

    Sözleşmeye aktarılan değerlerin listesi. Normalde, sözleşme parametresinin değeri (veri bölümü), id'nin benzer bir ada sahip bir HTML öğesinden (giriş alanı gibi) elde edilir. Öğe kimliği, sözleşme parametresinin adından farklıysa, değer, ContractField1=idname1, ContractField2=idname2 biçiminde atanmalıdır. Bu parametre, {contractField1: idname1, ContractField2: idname2} nesnesi olarak attr'ye döndürülür.
  * `PageParams`

    Yönlendirme sayfasına iletilen parametrelerin biçimi pageField1=idname1, pageField2=idname2 şeklindedir. #pageField1 ve #pageField2 hedef sayfa parametre adlarına sahip değişkenler, hedef sayfada oluşturulur ve belirtilen değerlere atanır. Parametre geçişi için daha fazla spesifikasyona bakın Parametreleri sayfalara geçirmek için PageParams kullanın).
  
> CompositeContract

  Butona ek sözleşmeler eklemek için kullanılır. CompositeContract birden çok kez kullanılabilir.
  * `Name`

    Sözleşmenin adı.
  * `Data`

    Sözleşme parametreleri JSON dizileridir.
> Alert

 Mesajı görüntüleyin.
  * `Text`

    Mesajın metni.
  * `ConfirmButton`
  
    Onayla buton başlığı.
  * `CancelButton`

    İptal buton başlığı.
  * `Icon`

    Buton icon.
> Popup

  Çıkış modu modal.
  * `Header`

    Window başlığı.
  * `Width`

     Pencere genişliğinin yüzdesi.
     Aralığı 1 ila 100 arasındadır.
> Style

  Belirtilen CSS stili.
  * `Style`

    CSS stili.
> ErrorRedirect

:ref:contractfundef-Throw işlevi sözleşme yürütme sırasında bir hata oluşturduğunda belirtin ve bir sayfaya yönlendirin. Birkaç ErrorRedirect çağrısı olabilir. Bu nedenle, *errredirect* özniteliği döndürülürken öznitelik anahtarı ErrorID'dir ve değer, parametreler listesidir.

  * `ErrorID`

    Hata ID.

  * `PageName`

    Yönlendirme sayfasının adı.

  * `PageParams`

    Sayfaya aktarılan parametreler.

#### Example

```
Button(Submit, default_page, mybtn_class).Alert(Alert message)
Button(Contract: MyContract, Body:My Contract, Class: myclass, Params:"Name=myid,Id=i10,Value")
```

### Calculate
Exp parametresinde geçirilen aritmetik ifadenin sonucunu döndürür. Aşağıdaki işlemler uygulanabilir: +, -, *, / ve parantezler ().

#### Syntax
```
Calculate(Exp, Type, Prec)
```

> Calculate
  * `Exp`

    Sayıları ve #name# değişkenini içeren bir aritmetik ifade.
  * `Type`

    Sonuç veri türü: int, kayan nokta, para. Belirtilmemişse, ondalık noktalı bir sayı varsa kayan, aksi takdirde int'dir.
  * `Prec`

    ondalık noktadan sonra iki önemli basamak ile kayan nokta ve para verileri.

#### Example

```
Calculate( Exp: (342278783438+5000)\*(#val#-932780000), Type: money, Prec:18 )
Calculate(10000-(34+5)\*#val#)
Calculate("((10+#val#-45)\*3.0-10)/4.5 + #val#", Prec: 4)
```

### Chart

HTML çizelgeleri oluşturun.

#### Syntax
```
Chart(Type, Source, FieldLabel, FieldValue, Colors)
```

> Chart
  * `Type`

    Çizelge tipi.
  * `Source`

    [DBFind](#dbfind) işlevinden alınan veri kaynağının adı.
  * `FieldLabel`

    Başlık alanının adı.
  * `FieldValue`

    Değer alanının adı.
  * `Colors`

    Renklerin listesi.

#### Example

```
Data(mysrc,"name,count"){
    John Silver,10
    "Mark, Smith",20
    "Unknown ""Person""",30
}
Chart(Type: "bar", Source: mysrc, FieldLabel: "name", FieldValue: "count", Colors: "red, green")
```

### CmpTime

Aynı formatta iki zaman değerini karşılaştırır.
Unixtime, `YYYY-AA-GG SS:DD:SS` ve `YYYYMMDD` gibi herhangi bir zaman biçimini destekler.

#### Syntax

```
CmpTime(Time1, Time2)
```


Geri dönüş değeri

* `-1` - Time1 <Time2;
* `0` - Time1 = Time2;
* `1` - Time1> Time2.

#### Example

```
If(CmpTime(#time1#, #time2#)<0){...}
```

### Code

Belirtilen kodu görüntülemek için bir kod öğesi oluşturun.

Bir değişkeni değişkenin değeriyle değiştirir (örneğin, `#name#`).
#### Syntax
```
Code(Text)
```

> Code
  * `Text`

    Kaynak kodu.

#### Example

```
Code( P(This is the first line.
    Span(This is the second line.))
)
```

### CodeAsIs

Belirtilen kodu görüntülemek için bir kod öğesi oluşturun.
Bir değişkeni değeriyle değiştirmez. Örneğin, `#name#` olduğu gibi görüntülenecektir.

#### Syntax
```
CodeAsIs(Text)
```

> CodeAsIs
  * `Text`

    Kyanak kodu.

#### Example

```
CodeAsIs( P(This is the #test1#.
    Span(This is the #test2#.))
)
```

### Data

Bir veri öğesi oluşturun, belirtilen verilerle doldurun ve Kaynağa koyun. Ardından, [Tablo](#table) ve diğer işlevlerde veri girişi olarak Kaynak alabilirsiniz. Sütun adlarının sırası, veri giriş değerlerinin sırasına karşılık gelir.

#### Syntax
```
Data(Source,Columns,Data)
 [.Custom(Column){Body}]
```

> Data
  * `Source`

    Veri kaynağının adı. Daha sonra diğer işlevlere veri kaynağı olarak iletilecek herhangi bir adı belirtebilirsiniz.

  * `Columns`

    Virgülle ayrılmış sütun adlarının listesi.

  * `Data`

    Veri seti.

    Satır başına bir kayıt. Sütun değerleri virgülle ayrılmalıdır. Veri ve Sütunlar aynı sırada ayarlanmalıdır.

    Virgüllü değerler çift tırnak içine alınmalıdır (`"example1, example2", 1, 2`). Alıntılanan değerler iki çift tırnak içine alınmalıdır (`"""example", "example2""", 1, 2`).

    

### Custom

    Verilere hesaplanmış sütunlar atayabilirsiniz. Örneğin, düğmeler ve diğer sayfa düzeni öğeleri için alan şablonları belirleyebilirsiniz. Bu alan şablonları genellikle [Tablo](#tablo)'ya ve veri almak için diğer işlevlere atanır.
     Birden çok hesaplanmış sütun atamak istiyorsanız, birden çok Özel işlev kullanın.

  * `Column`

    Benzersiz ve zorunlu olan sütun adı.

  * `Body`

    Kod bloğu. Girişteki diğer sütunlardan değerler almak için `#columnname#` kullanabilir ve ardından bu değerleri kod bloklarında kullanabilirsiniz.

#### Example

```
Data(mysrc,"id,name"){
    "1",John Silver
    2,"Mark, Smith"
    3,"Unknown ""Person"""
 }.Custom(link){Button(Body: View, Class: btn btn-link, Page: user, PageParams: "id=#id#"}
```

### DateTime

Saati ve tarihi belirtilen biçimde görüntüleyin.

#### Syntax
```
DateTime(DateTime, Format)
```

> DateTime
  * `DateTime`

    Unixtime veya standart biçimde `2006-01-02T15:04:05` ifade edilen saat ve tarih.
  * `Format`

    Format şablonu: yıl 2 basamaklı `YY`, 4 basamaklı `YYYY`, ay `AA`, gün `GG`, saat SS, dakika AA, saniye SS , örneğin: `YY/AA/GG SS:DD"`
     Belirtilmemiş veya eksik ise `YYYY-AA-GG SS:MI:SS` kullanılacaktır.

#### Example

```
DateTime(2017-11-07T17:51:08)
DateTime(#mytime#,HH:MI DD.MM.YYYY)
```

### DBFind

Bir dbfind öğesi oluşturun, onu tablo tablosunun verileriyle doldurun ve daha sonra [Table](#table) ve diğer Kaynak fonksiyonlarının giriş verileri için kullanılabilecek olan Source yapısına yerleştirin.

#### Syntax
```
DBFind(table, Source)
    [.Columns(columns)]
    [.Where(conditions)]
    [.WhereId(id)]
    [.Order(name)]
    [.Limit(limit)]
    [.Offset(offset)]
    [.Count(countvar)]
    [.Ecosystem(id)]
    [.Cutoff(columns)]
    [.Custom(Column){Body}]
    [.Vars(Prefix)]
```

> DBFind
  * `table`

    Tablo adı
  * `Source`

    Veri kaynağı adı.

> Columns
  * `columns`

    Belirtilmezse, tüm alanların bir listesi döndürülür. JSON tipi bir alan varsa, kayıt alanını işlemek için şu sözdizimini kullanabilirsiniz: `columnname->fieldname`. Bu durumda, oluşturulan alan adı "columnname.fieldname" olur.

> Where
  * `conditions`

   Veri sorgulama koşulları. DBFind'e bakın.
    JSON tipi bir alan varsa, kayıt alanını işlemek için şu sözdizimini kullanabilirsiniz: `columnname->fieldname`.

> WhereId
  Query by ID, e.g. `.WhereId(1)`.
  * `Id`

   Entri ID.

> Order
  Alana göre sırala.
   Sıralama sözdizimi hakkında daha fazla bilgi için bkz. [DBFind](#dbfind).
   * "isim"

    Alan adı

> Limit
  * `limit`
  
    Döndürülen giriş sayısı, varsayılan olarak 25'tir. Maksimum sayı 10.000'dir.

> Offset
  * `Offset`

    Ofset

> Count

  Where koşulunun toplam satır sayısını belirtin.
   Bir değişkende saklamaya ek olarak, toplam sayı, dbfind öğesinin count parametresinde döndürülür.

   Where ve WhereID belirtilmezse, tablodaki toplam satır sayısı döndürülür.

  * `countvar`

    Satır sayısını tutan değişkenin adı.

> Ecosystem
  * `Id`

   Ekosistem kimliği. Varsayılan olarak, veriler mevcut ekosistemdeki belirtilen tablodan gelir.

> Cutoff

  Büyük miktarda metin verisini kesmek ve görüntülemek için kullanılır.
  * `columns`

  Cutoff işlevi tarafından işlenmesi gereken alanların virgülle ayrılmış listesi.
    Alan değeri, iki alana sahip bir JSON nesnesi ile değiştirilecektir: bağlantı bağlantısı ve başlık başlığı. Alan değeri 32'den fazla karakter içeriyorsa, tam metnin ilk 32 karakterine işaret eden bağlantı döndürülür. Alan değeri 32 veya daha az karakter içeriyorsa, bağlantı geçersiz olarak ayarlanır ve başlık tüm alan değerini içerir.

> Custom

  Verilere hesaplanmış sütunlar atayabilirsiniz. Örneğin, düğmeler ve diğer sayfa düzeni öğeleri için alan şablonları belirleyebilirsiniz. Bu alan şablonları genellikle [Tablo](#tablo)'ya ve veri almak için diğer işlevlere atanır.
   Birden çok hesaplanmış sütun atamak istiyorsanız, birden çok Özel işlev kullanın.
  * `Column`

   Benzersiz ve zorunlu olan sütun adı.
  * `Body`

   Kod bloğu. Girişteki diğer sütunlardan değerler almak için `#columnname#` kullanabilir ve ardından bu değerleri kod bloklarında kullanabilirsiniz.

> Vars

  Sorgu tarafından elde edilen ilk satır, değerleri olan bir dizi değişken üretecektir. Belirtildiğinde Limit parametresi otomatik olarak 1 olur ve sadece bir (1) kayıt döndürülür.
  * `Prefix`

   Değişken adına eklenen önek. Biçimi `#prefix_columnname#` şeklindedir, burada sütun adı alt çizgi sembolünü hemen takip eder. JSON alanı içeren bir sütun varsa, oluşturulan değişken şu biçimde olacaktır: `#prefix_columnname_field#`.

#### Example

```
DBFind(parameters,myparam)
DBFind(parameters,myparam).Columns(name,value).Where({name:"money"})
DBFind(parameters,myparam).Custom(myid){Strong(#id#)}.Custom(myname){
   Strong(Em(#name#))Div(myclass, #company#)
}
```

### Div

Bir div HTML öğesi oluşturun.

#### Syntax
```
Div(Class, Body)
 [.Style(Style)]
 [.Show(Condition)]
 [.Hide(Condition)]
```

> Div
  * `Class`

    Div'in class adı.
  * `Body`

    Child element.
> Style

  Belirtilen CSS stili.
  * `Style`

   CSS stili.
> Show

 Div görüntüleme koşullarını tanımlayın.
   * `Condition`

   Aşağıdaki Gizle bölümüne bakın.
> Hide

Div'i gizlemek için koşulları tanımlayın.
   * `Condition`

   İfade biçimi `GirdiAdı=Değer` şeklindedir; tüm ifadeler doğru olduğunda, *Koşul* doğrudur ve `GirişAdı`nın değeri "Değer"e eşit olduğunda, *Koşul* doğrudur. Birden fazla *Show* veya *Hide* çağrılırsa, en az bir *Koşul* parametresi true olmalıdır.

#### Example

```
Form(){
    Div(text-left){
        Input(Name: "broadcast", Type: "checkbox", Value: "false")
    }
    Div(text-left){
        hello
    }.Show("broadcast=false")
    Div(text-left){
        world
    }.Hide("broadcast=false")
}
```

### EcosysParam

Bu işlev, mevcut ekosistemin ekosistem parametre tablosundan parametre değerlerini alır. Döndürülen sonuç adı dil kaynaklarını içeriyorsa, buna göre çevrilecektir.

#### Syntax
```
EcosysParam(Name, Index, Source)
```

> EcosysParam
  * `Name`

    Parametre adı.
  * `Index`

    İstenen parametre virgülle ayrılmış öğelerin bir listesiyse, 1'den başlayarak bir dizin belirtebilirsiniz. Örneğin, "gender = male,female" ise, "gender = male,female", "female" değerini döndürür.
     Source parametresi ile birlikte kullanılamaz.
  * `Source`

    Parametre değeri virgülle ayrılmış bir liste olduğunda kullanılabilir.
     Öğeleri belirtilen parametrelerin değerleri olan bir veri nesnesi oluşturun. Bu nesne, [Tablo](#tablo) ve [Seç](#seç) işlevleri için bir veri kaynağı olarak kullanılabilir.
     Index parametresi ile birlikte kullanılamaz.

```
Address(EcosysParam(founder_account))
EcosysParam(gender, Source: mygender)

EcosysParam(Name: gender_list, Source: src_gender)
Select(Name: gender, Source: src_gender, NameColumn: name, ValueColumn: id)
```

### Em

Bir em HTML öğesi oluşturun.

#### Syntax
```
Em(Body, Class)
```

> Em
  * `Body`

    Child text veya element.
  * `Class`

    em sınıfı adı.

#### Example

```
This is an Em(important news).
```

### ForList

Kaynak veri kaynağındaki öğelerin listesini Body'de ayarlanan şablon biçiminde görüntüleyin ve bir **forlist** öğesi oluşturun.

#### Syntax
```
ForList(Source, Index){Body}
```

> ForList
  * `Source`

    [DBFind](#dbfind) veya [Data](#data) işlevinden alınan veri kaynağı.
  * `Index`

    1'den başlayarak yineleme sayacının değişkeni.
     İsteğe bağlı bir parametre. Belirtilmezse, yineleme sayısı değeri [Source] _index değişkenine yazılır.
  * `Body`

    Öğe eklemek için şablon.

```
ForList(mysrc){Span(#mysrc_index#. #name#)}
```

### Form
   Bir form HTML öğesi oluşturun.

#### Syntax
```
Form(Class, Body) [.Style(Style)]
```
> Form
  * `Body`

    Child text veya element.
  * `Class`

    Formun sınıf adı.
> Style
  Belirtilen CSS stili.
  * `Style`

   CSS stili.

#### Example

```
Form(class1 class2, Input(myid))
```

### GetColumnType

Belirli bir tablonun alan veri türünü döndürür.

Döndürülen türler şunları içerir: `text, varchar, number, money, double, bytes, json, datetime, double`.
#### Syntax

```
GetColumnType(Table, Column)
```

> GetColumnType
  * `Table`

    Tablo adı.
  * `Column`

    Field adı.

#### Example

```
SetVar(coltype,GetColumnType(members, member_name))Div(){#coltype#}
```

### GetHistory

Bir gethistory öğesi oluşturun ve bunu belirtilen tablodaki girişlerin geçmiş değişiklik kayıtlarıyla doldurun. Oluşturulan veriler, daha sonra kaynak giriş işlevinde kullanılabilecek olan Kaynak öğesine yerleştirilecektir (örneğin, [Tablo](#tablo)).
Dizi, son değiştirilenden itibaren sıralanır.
Dizideki kimlik alanı, rollback_tx tablosunun kimliğini gösterir. block_id, blok kimliğini temsil eder, blok_zamanı, blok oluşturma zaman damgasını temsil eder.

#### Syntax
```
GetHistory(Source, Name, Id, RollbackId)
```

> GetHistory
  * `Source`

    Veri kaynağı adı.
  * `Name`

    Tablo adı.
  * `Id`

    Entri ID.
  * `RollbackId`

    İsteğe bağlı bir parametre. Belirtilirse, rollback_tx tablosundan belirtilen kimliğe sahip yalnızca bir kayıt döndürülür.

#### Example

```
GetHistory(blocks, BlockHistory, 1)
```

### GetVar

Zaten var olan belirtilen değişkenin değerini veya yoksa boş bir dize döndürür.
Getvar öğesi yalnızca düzenlenebilir bir ağaç istendiğinde oluşturulur. `GetVar(varname)` ve `#varname` arasındaki fark, varname yoksa GetVar'ın boş bir dize döndürmesi, #varname# ise bir dize değeri olarak yorumlanmasıdır.

#### Syntax
```
GetVar(Name)
```

> GetVar
  * `Name`

    Variable adı.

#### Example

```
If(GetVar(name)){#name#}.Else{Name is unknown}
```

### Hint

İpuçları için bir ipucu öğesi oluşturun.

#### Syntax
```
Hint(Icon,Title,Text)
```

> Hint
  * `Icon`

    Icon adı.
  * `Title`

    Hint başlığı.
  * `Text`

    Hint text.

#### Example

```
Hint(Icon: "icon-wrench",Title:$@1pa_settings$,Text: This is a hint text)
```

### If

Durum bildirimi.
Koşul'u karşılayan ilk If veya ElseIf alt öğesini döndürür. Aksi takdirde, Else alt öğesini döndürün.

#### Syntax
```
If(Condition){ Body}
 [.ElseIf(Condition){ Body }]
 [.Else{ Body }]
```

> If
  * `Condition`

    Koşul boş bir dizeye eşitse, 0 veya yanlış ise, koşulun karşılanmadığı kabul edilir. Diğer tüm durumlarda, bu koşulun sağlandığı kabul edilir.
  * `Body`

    Child element.

#### Example

```
If(#value#){
   Span(Value)
}.ElseIf(#value2#){Span(Value 2)
}.ElseIf(#value3#){Span(Value 3)}.Else{
   Span(Nothing)
}
```

### Image
Bir görüntü HTML öğesi oluşturun.

#### Syntax
```
Image(Src, Alt, Class)
 [.Style(Style)]
```

> Image
  * `Src`

    Image kaynağı, dosya veya `veri:...`
  * `Alt`

    Image görüntülenemediğinde alternatif metin.
  * `Сlass`

    Image class adı.

#### Example

```
Image(Src: Binary().ById(#id#), Class: preview).Style(height: 40px; widht 40px;)
```

### ImageInput

Bir resim yüklemek için bir imageinput öğesi oluşturun.

#### Syntax
```
ImageInput(Name, Width, Ratio, Format)
```

> ImageInput
  * `Name`

    Element adı.
  * `Width`

    Kırpılan görüntünün genişliği.
  * `Ratio`

    En boy oranı veya görüntü yüksekliği.
  * `Format`

    Yüklenen görüntünün formatı.

#### Example

```
ImageInput(avatar, 100, 2/1)
```

### Include

Belirtilen ada sahip şablonu sayfa koduna ekleyin.

#### Syntax
```
Include(Name)
```

> Include
  * `Name`

    Şablon adı.

#### Example

```
Div(myclass, Include(mywidget))
```

### Input

Bir giriş HTML öğesi oluşturun.

#### Syntax
```
Input(Name, Class, Placeholder, Type, Value, Disabled)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Input
  * `Name`

    Element adı.
  * `Class`

    Class adı.
  * `Placeholder`

    Giriş alanının beklenen değerini sor.
  * `Type`

    input tipi.
  * `Value`

    Element değeri.
  * `Disabled`

    Giriş öğesini devre dışı bırakın.
> Validate

  Parametreyi doğrulayın.
> Style

  Belirtilen CSS stili.
  * `Style`

    CSS stili.

#### Example

```
Input(Name: name, Type: text, Placeholder: Enter your name)
Input(Name: num, Type: text).Validate(minLength: 6, maxLength: 20)
```

### InputErr

Hata metnini doğrulamak için bir inputerr öğesi oluşturun.

#### Syntax
```
InputErr(Name,validation errors)]
```

> InputErr
  * `Name`

    [Input](#input) öğesinin adına karşılık gelir.
  * `validation errors`

    Bir veya daha fazla parametre için doğrulama hata mesajı.

#### Example

```
InputErr(Name: name,
minLength: Value is too short,
maxLength: The length of the value must be less than 20 characters)
```

### InputMap

Harita üzerinde koordinatları seçebilen adres için bir metin giriş alanı oluşturun.

#### Syntax
```
InputMap(Name, Type, MapType, Value)
```

> InputMap
  * `Name`

    Element adı.
  * `Value`

    Varsayılan değer.
     Değer, dize biçiminde bir nesnedir. Örneğin, `{"coords":[{"lat":number,"lng":number},]}` veya `{"zoom":int, "center":{"lat":number,"lng" : sayı}}`. InputMap önceden tanımlanmış Değer ile oluşturulduğunda, adres alanı adres değerini kaydetmek için kullanılabilir, böylece geçersiz olmaz.
  * `Type`

    Harita nokta eşleme türü:
    * `polygon` - çok noktalı bir kapalı döngünün alanını gösterir;
    * `Line` - kapalı döngü olmaksızın birden çok nokta içeren bir çoklu çizgi anlamına gelir;
    * `Point` - tek nokta koordinatını gösterir.
  * `MapType`

    Harita türü.
     Şu değerlere sahiptir: `hibrit, yol haritası, uydu, arazi`.

#### Example

```
InputMap(Name: Coords,Type: polygon, MapType: hybrid, Value: `{"zoom":8, "center":{"lat":55.749942860682545,"lng":37.6207172870636}}`)
```

### JsonToSource

Bir jsontosource öğesi oluşturun ve onu bir JSON dizisinin anahtar/değer çiftleriyle doldurun. Elde edilen veriler, daha sonra kaynak giriş işlevinde kullanılabilecek olan Kaynak öğesine yerleştirilir (ör. [Tablo](#tablo)).
Sonuç verilerindeki kayıtlar JSON anahtarına göre alfabetik olarak sıralanır.

#### Syntax
```
JsonToSource(Source, Data)
```

> JsonToSource
  * `Source`

    Veri kaynağı adı.
  * `Data`

    Bir JSON nesnesi veya bir JSON nesnesi (`#name#`) içeren bir değişken adı.

#### Example

```
JsonToSource(src, #myjson#)
JsonToSource(dat, {"param":"value", "param2": "value 2"})
```

### Label

Bir etiket HTML öğesi oluşturun.

#### Syntax
```
Label(Body, Class, For)
 [.Style(Style)]
```

> Label
  * `Body`

    Child text veya element.
  * `Class`

    Class adı.
  * `For`

    Bir form öğesine bağlayın.
> `StyleThe`:CSS stili belirtildi.
  * `Style`

    CSS stili.

#### Example

```
Label(The first item).
```

### LangRes

Belirli bir dil kaynağı döndürür. Ağacı düzenlemeniz istenirse, langres öğesi döndürülür ve kısa biçim sembolünü $langres$ kullanabilirsiniz.
#### Syntax

```
LangRes(Name)
```

> LangRes
  * `Name`

    Dil kaynağının adı.

#### Example

```
LangRes(name)
LangRes(myres)
```

### LinkPage

Sayfaya bağlantı veren bir bağlantı sayfası öğesi oluşturun.
#### Syntax

```
LinkPage(Body, Page, Class, PageParams)
 [.Style(Style)]
```

> LinkPage
  * `Body`

    Child text veya element.
  * `Page`

    Yönlendirme sayfasının adı.
  * `Class`

    Buton class adı.
  * `PageParams`

    Yönlendirme sayfası parametreleri.
> Style

  Belirtilen CSS stili.
  * `Style`

  CSS stili
  
#### Example

```
LinkPage(Class: #style_link# h5 text-bold, Page: @1roles_view, PageParams: "v_role_id=#recipient.role_id#")
```

### Map

Görsel bir harita oluşturun ve koordinatları herhangi bir biçimde görüntüleyin.

#### Syntax
```
Map(Hmap, MapType, Value)
```

> Map
  * `Hmap`

    Sayfadaki bir HTML öğesinin yüksekliği.
     Varsayılan değer 100'dür.
  * `Value`

    Harita değeri, dize biçiminde bir nesne.
     Örneğin, `{"coords":[{"lat":number,"lng":number},]}` veya `{"zoom":int, "center":{"lat":number,"lng" : sayı}}`. Merkez belirtilmezse, harita penceresi belirtilen koordinatlara göre otomatik olarak ayarlanacaktır.
  * `MapType`

    Harita türü.
     Şu değerlere sahiptir: `hibrit, yol haritası, uydu, arazi`.

#### Example

```
Map(MapType:hybrid, Hmap:400, Value:{"coords":[{"lat":55.58774531752405,"lng":36.97260184619233},{"lat":55.58396161622043,"lng":36.973803475831005},{"lat":55.585222890513975,"lng":36.979811624024364},{"lat":55.58803635636347,"lng":36.978781655762646}],"area":146846.65783403456,"address":"Unnamed Road, Moscow, Russia, 143041"})
```

### MenuGroup

Menüde iç içe bir alt menü oluşturun ve menü grubu öğesini döndürün. Bunu dil kaynağıyla değiştirmeden önce name parametresi Title değerini döndürür.

#### Syntax
```
MenuGroup(Title, Body, Icon)
```
> MenuGroup

  * `Title`

    Menü öğesinin adı.

  * `Body`

    Bir alt menüdeki alt öğeler.

  * `Icon`

    Icon.

#### Example

```
MenuGroup(My Menu){
    MenuItem(Interface, sys-interface)
    MenuItem(Dahsboard, dashboard_default)
}
```

### MenuItem

Bir menü öğesi oluşturun ve menü öğesi öğesini döndürün.

#### Syntax
```
MenuItem(Title, Page, Params, Icon)
```

> MenuItem

  * `Title`

    Menü öğesinin adı.

  * `Page`

    Yönlendirme sayfasının adı.

  * `Params`

    Yönlendirme sayfası parametreleri.

  * `Icon`

    Icon.

#### Example

```
MenuItem(Title:$@1roles$, Page:@1roles_list, Icon:"icon-pie-chart")
```

### Money

exp / 10 ^ basamağının dize değerini döndürür.

#### Syntax
```
Money(Exp, Digit)
```

> Money

  * `Exp`

    Dize biçiminde bir sayı.

  * `Digit`

    "Exp/10^digit" ifadesinde 10'un üssü. Değer pozitif veya negatif olabilir ve pozitif bir değer, ondalık noktadan sonraki basamak sayısını belirler.

#### Example

```
Money(Exp, Digit)
```

### Or

Bir if mantıksal işleminin sonucunu döndürür. Parantez içinde listelenen tüm parametreler virgülle ayrılır. Değer olan bir parametreye sahip olmak boş bir dize, sıfır veya `false` değilse, parametre değeri `true` olur, aksi takdirde parametre değeri `false` olur. Parametre değeri `true` ise, fonksiyon `1`, aksi halde `0` döndürür.

#### Syntax
```
Or(parameters)
```


#### Example

```
If(Or(#myval1#,#myval2#), Span(OK))
```

### P

Bir p HTML öğesi oluşturun.

#### Syntax
```
P(Body, Class)
 [.Style(Style)]
```

> P

  * `Body`

    Child text veya element.

  * `Class`

    Class adı.

> Style

Belirtilen CSS stili.

  * `Style`

    CSS stili.

#### Example

```
P(This is the first line.
  This is the second line.)
```

### QRcode

Belirtilen metinle QR kodunu döndürür ve bir qrcode öğesi oluşturur.

#### Syntax
```
QRcode(Text)
```

> QRcode
  * `Text`

    QR kod metni.

#### Example

```
QRcode(#name#)
```

### RadioGroup

Bir radyo grubu öğesi oluşturun.

#### Syntax
```
RadioGroup(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> RadioGroup

  * `Name`

    Öğe adı.

  * `Source`

    DBFind veya Veri işlevinden elde edilen veri kaynağı.

  * `NameColumn`

    Veri kaynağının alan adı.

  * `ValueColumn`

    Veri kaynağının değer adı.
     Custom ile oluşturulan alanlar bu parametrede kullanılamaz.

  * `Value`

    Varsayılan değer.

  * `Class`

    Class adı

> Validate

  Parametreyi doğrulayın.

> Style

  Belirtilen CCS stili.

  * `Style`

    CSS stili.

#### Example

```
RadioGroup(Name: type_decision, Source: numbers_type_decisions, NameColumn: name, ValueColumn: value)
```

### Range

Bir aralık öğesi oluşturun, tamsayı öğelerini doldurmak için Adımdan Şuna (Kime dahil değil) adım boyutunu kullanın. Oluşturulan veriler Kaynağa konulacak ve daha sonra kaynak girişinin işlevinde kullanılabilir (ör. [Tablo](#tablo)). Geçersiz bir parametre belirtilirse, boş bir Kaynak döndürülür.

#### Syntax
```
Range(Source,From,To,Step)
```

> Range

  * `Source`

    Veri kaynağı adı.

  * `From`

    Başlangıç değeri (i = Kimden).

  * `To`

    Bitiş değeri (i <To).

  * `Step`

    Değer değişikliği adımı. Belirtilmemişse, varsayılan değer 1'dir.

#### Example

```
Range(my,0,5)
SetVar(from, 5).(to, -4).(step,-2)
Range(Source: neg, From: #from#, To: #to#, Step: #step#)
```

### Select

Seçili bir HTML öğesi oluşturun.

#### Syntax
```
Select(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Select

  * `Name`

    Öğe adı.

  * `Source`

    [DBFind](#dbfind) veya [Data](#data) işlevinden alınan veri kaynağı.

  * `NameColumn`

    Veri kaynağının alan adı.

  * `ValueColumn`

    Veri kaynağının değer adı.
     [Custom](#custom) ile oluşturulan alanlar bu parametrede kullanılamaz.

  * `Value`

    Varsayılan değer.

  * `Class`

    Class adı.

> Validate

  Parametreyi doğrulayın.

> Style

  Belirtilen CSS stili.

  * `Style`

    CSS stili.

#### Example

```
DBFind(mytable, mysrc)
Select(mysrc, name)
```

### SetTitle

Sayfa başlığını ayarlamak ve bir settitle öğesi oluşturmak için.

#### Syntax
```
SetTitle(Title)
```

> SetTitle
  * `Title`

    Sayfa başlığı

#### Example

```
SetTitle(My page)
```

### SetVar

Belirtilen değişken Adına Değer değerini atayın.

#### Syntax
```
SetVar(Name, Value)
```

> SetVar

  * `Name`

    Değişken ismi.

  * `Value`

    Değişken değeri, başka bir değişkene referans içerebilir.

#### Example

```
SetVar(name, John Smith).(out, I am #name#)
Span(#out#)
```

### Span

Bir yayılma HTML öğesi oluşturun.

#### Syntax
```
Span(Body, Class)
 [.Style(Style)]
```

> Span

  * `Body`

    Child text veya element.

  * `Class`

    Class adı.

> Style

  Belirtilen CCS stili.

  * `Style`

    CSS style.

#### Example

```
This is Span(the first item, myclass1).
```

### Strong

Güçlü bir HTML öğesi oluşturun.

#### Syntax
```
Strong(Body, Class)
```

> Strong

  * `Body`

    Child text veya element.

  * `Class`

    Class adı.

#### Example

```
This is Strong(the first item, myclass1).
```

### SysParam

System_parameters platform parametre tablosunda belirli bir parametrenin değerini alın.

#### Syntax
```
SysParam(Name)
```

> SysParam
  * `Name`

    Platform parametresinin adı.

#### Example

```
SysParam(max_columns)
```

### Table

Bir tablo HTML öğesi oluşturun.

#### Syntax
```
Table(Source, Columns)
 [.Style(Style)]
```

> Table

  * `Source`

    Belirli bir veri kaynağının adı.

  * `Columns`

    Başlık ve ilgili sütun adı, ör.: Başlık1=sütun1,Başlık2=sütun2.

> Style

  Belirtilen CSS stili.

  * `Style`

    CSS stili.

#### Example

```
DBFind(mytable, mysrc)
Table(mysrc,"ID=id,Name=name")
```

### TransactionInfo

İşlemleri belirtilen hash ile sorgular ve yürütülen sözleşmeler ve parametreleri hakkında bilgi verir.

#### Syntax
```
TransactionInfo(Hash)
```

> TransactionInfo
  * `Hash`

    Onaltılık dize biçiminde işlem hashleri.
> Return value

  JSON biçiminde bir dize döndürür:

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

Neresi:

* `contract` - Sözleşme adı;
* `params` - Sözleşme parametrelerine aktarılan veriler;
* `block` - İşlemi işleyen bloğun ID'si.

#### Example

```
P(TransactionInfo(#hash#))
```

### VarAsIs

Değeri, değeri yerine belirli bir değişkenin adı olan belirli bir değişken Adına atar.

Değişken ikameli sürümler için bkz. [SetVar](#setvar).

#### Syntax
```
VarAsIs(Name, Value)
```

> VarAsIs

  * `Name`

    Variable name.

  * `Value`

    Değişken bir değer. Değerdeki değişken adı değiştirilmeyecektir. Örneğin, Değer örnek #varname# ise, değişken değeri de örnek #varname# olur.

#### Example

```
SetVar(Name,"John")
VarAsIs(name, I am #Name#)
Span(#name#) // I am #Name#
```

## App styles for mobile devices

### Layout

#### Title

* `h1`… `h6`

#### Strong-class names

* `.text-muted`
* `.text-primary`
* `.text-success`
* `.text-info`
* `.text-warning`
* `.text-danger`

#### Color

* `.bg-danger-dark`
* `.bg-danger`
* `.bg-danger-light`
* `.bg-info-dark`
* `.bg-info`
* `.bg-info-light`
* `.bg-primary-dark`
* `.bg-primary`
* `.bg-primary-light`
* `.bg-success-dark`
* `.bg-success`
* `.bg-success-light`
* `.bg-warning-dark`
* `.bg-warning`
* `.bg-warning-light`
* `.bg-gray-darker`
* `.bg-gray-dark`
* `.bg-gray`
* `.bg-gray-light`
* `.bg-gray-lighter`

#### Grid

* `.row`
* `.row.row-table`
* `.col-xs-1`… `.col-xs-12`, only used in `.row.row-table`.

#### Panel

* `.panel`
* `.panel.panel-heading`
* `.panel.panel-body`
* `.panel.panel-footer`

#### <span id ="form-app">Form</span>

* `.form-control`

#### <span id = "button-app">Button</span>

* `.btn.btn-default`
* `.btn.btn-link`
* `.btn.btn-primary`
* `.btn.btn-success`
* `.btn.btn-info`
* `.btn.btn-warning`
* `.btn.btn-danger`

#### Icon

* All fa-class icons are from FontAwesome: `fa fa-<icon-name></icon-name>`.
* All icon-class icons are from SimpleLineIcons: `icon-<icon-name>`.