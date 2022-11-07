# IBAX Genel Bakış

- [IBAX Genel Bakış](#Ibax-Genel-Bakış)
  - [Özellikler](#özellikler)
  - [Mimari](#mimari)
    - [Ağ](#ağ)
    - [Honor Node](#honor-node)
    - [İşlemler](#İşlemler)
    - [Ağ protokolü](#ağ-protokolü)
    - [Blok ve işlem doğrulama](#blok-ve-işlem-doğrulama)
    - [Veri tabanı](#veri-tabanı)
  - [ECOLIB](#ecolib)
    - [IDE](#ide)
    - [Uygulamalar](#uygulamalar)
    - [Tablolar](#tablolar)
    - [Ekosistem Parametreleri](#Ekosistem-Parametreleri)
  - [Erişim hakları kontrol mekanizması](#Erişim-hakları-kontrol-mekanizması)
    - [Erişim hakları yönetimi](#Erişim-hakları-yönetimi)
    - [Özel haklar](#Özel-haklar)
  - [Sanal özel ekosistem](#Sanal-özel-ekosistem)
    - [Web kaynaklarına yönelik istekler](#Web-kaynaklarına-yönelik-istekler)
    - [Veri okuma hakları](#Veri-okuma-hakları)
    - [CLB oluşturma](#CLB-oluşturma)
    - [CLB kullanımı](#CLB-kullanımı)



## Özellikler

IBAX Ağı (IBAX), entegre bir uygulama geliştirme ortamına (IDE) sahiptir. Veriler, kullanıcı sayfaları ve akıllı sözleşmeler için çok seviyeli bir erişim kontrol sistemidir.

Yapısı ve işlevleri açısından IBAX, mevcut çoğu blok zinciri platformundan oldukça farklıdır:

* IBAX uygulamalarının geliştirilmesi ve kullanımı, **ekosistem** adı verilen özerk bir yazılım ortamındadır. Her ekosistemin başlangıçta yaratıcı tarafından belirlenen kendi üyelik kuralları vardır;

* <font color=Red>veritabanı tablosu</font> kayıtlarında veya güncellemelerinde yer alan veriler gibi ekosistem faaliyetleri, **akıllı sözleşmeler** ile oluşturulan **kayıtlara** dayanmaktadır. Diğer blok zinciri platformlarının çoğunda, faaliyetler hesaplar arasındaki işlem alışverişine dayanır;

* **Kayıtlara** erişim ve ekosistem üyeleri arasındaki ilişkilerin kontrolü, **akıllı yasalar** adı verilen bir dizi kural tarafından yönetilir.

## Mimari

### Ağ

IBAX, eşler arası (P2P) bir ağ üzerine kurulmuştur.

Ağdaki koruyucu düğümler, IBAX'in blok zincirinin en son durumunu kaydeden blok zinciri veritabanının en son sürümünü depolar.

Ağ kullanıcıları, **Weaver** veya REST API komutları aracılığıyla koruyucu düğüm veritabanından istek göndererek veri alabilir. Kullanıcılar tarafından imzalandıktan sonra, yeni istekler ikili biçimde işlem olarak ağa gönderilir. Esasen, bu işlemler ilgili veritabanı kayıtlarını değiştirme komutlarıdır. İşlemler bloklar halinde toplanır ve bu bloklar tüm ağ düğümlerinin blok zincirlerine gönderilir. Her bir koruyucu düğüm, bloktaki işlemleri işleyecek ve böylece veritabanındaki ilgili verileri güncelleyecektir.

### Honor Node

Ağda yeni bloklar oluşturma ayrıcalığına sahip olan bir koruyucu düğüme Honor Node denir. Maksimum Honor Node sayısı, onur düğümlerinin sayısının sınırlı olduğunu gösteren platform parametreleri tablosunda no_of_nodes ile tanımlanır.

Bir Honor Node, IBAX Kamu Ağının temel bileşenlerinden biridir. İşlemleri yürütür ve doğrular, diğer düğümlerden işlem bilgilerini toplar, işlemleri kuyruğa ekler ve onay mekanizmasını kullanarak yeni blokların doğruluğunu ve geçerliliğini doğrular. Genellikle iki durumu vardır: paketleme ve paketleme.

Paketleme durumundaki bir Honor Node en yüksek performansı sunar. İşlem kuyruğundan yürütülecek işlem isteklerini alır ve işlemlerin imza geçerliliğini ve doğruluğunu doğrular, örn. transfer tutarı, işlem işlemleri için izin ve işlemlerin doğru yürütülmesi. Tüm parasal işlemler, doğru veya yanlış (yanlış işlemler geri alınacaktır), bloğa yazılacaktır. Yanlış işlemler cezai bir gaz ücretine tabi olacaktır. Gerçekleştirilen işlemler blok ile birlikte diğer Honor Node yayın yoluyla bildirilir.

Paketleme olmayan durumdaki bir Honor Node, paketleme düğümü tarafından oluşturulan blok içi işlemlerin doğru bir şekilde yürütülmesini sağlamak için temel olarak blok doğrulamasından sorumludur. Bir anormallik durumunda, istisna işleme mekanizmasını tetikler ve IBAX Ağı geri dönerek bloğu yeniden doğrular.

İşlem yürütme verimliliğini sağlamak için Honor Nodeları, işlem bilgilerini sürekli olarak toplar.

### İşlemler

**Akıllı sözleşmeleri** uygulamak için kullanılan veriler de dahil olmak üzere işlemler Weaver tarafından oluşturulur.

İşlemler, kullanıcılar tarafından özel bir anahtarla imzalanır. Özel anahtar ve Weaver'ın imza işlevi tarayıcılarda, yazılım istemcilerinde, SIM kartlarda veya özel fiziksel cihazlarda saklanabilir. Mevcut uygulamada, özel anahtar ECDSA algoritması ile şifrelenir ve Weaver tarafında saklanır. Tüm işlemler ECDSA algoritması ile imzalanır.

Bir işlemin yapısı aşağıdaki biçime uygundur:

* Kimlik - uygulanan sözleşmenin kimliği;

* Params - sözleşmeye gönderilen parametreler;

* Anahtar Kimliği - İşlemi gönderen kullanıcının kimliği;

* PublicKey - onur düğümünün genel anahtarı;

* Zaman - işlem tarafından oluşturulan zaman damgası;

* EcosystemID - İşlemin yapıldığı ekosistemin kimliği;

* TokenEcosystem - Ekosistemin kimliği, varsayılan olarak 1 ve içindeki jetonlar, işlem maliyetlerini karşılamak için kullanılır.

### Ağ Protokolü

İşlemler, biçimlerin doğru olduğundan emin olmak için temel doğrulamaya tabi tutuldukları ve ardından kuyruğa eklendiği, kullanıcılar tarafından onur düğümlerine gönderilecek. İşlemler ayrıca ağdaki diğer onur düğümlerine gönderilir ve ilgili kuyruğa eklenir.

Bir honor node, **full_nodes** platform parametresi ve özel bir algoritma tarafından belirlenen belirli bir süre içinde yeni bloklar oluşturma ayrıcalığına sahiptir. Onur düğümleri, işlemleri kuyruklardan alır ve bunları blok oluşturucuya gönderir. Yeni bir blok oluştururken, bu bloktaki işlemler de işlenecektir: her işlem, işlem parametrelerine karşılık gelen sözleşmenin uygulandığı bir sanal makineye gönderilir, böylece veritabanındaki kayıtlar güncellenir.

Diğer ağlardaki diğer onur düğümlerine göndermeden önce hata olmadığından emin olmak için yeni bloklar doğrulanmalıdır.

Başka bir onur düğümü tarafından alındığında blok kuyruğuna ve doğrulamadan sonra, bloktaki işlemleri işlemek ve böylece veri tabanındaki kayıtları güncellemek için bulunduğu onur düğümünün blok zincirine yeni bir blok eklenecektir.

### Blok ve işlem doğrulama

Yeni bir blok oluşturduktan veya aldıktan sonra, aşağıdakileri kapsayan diğer tüm honor nodelarında doğrulanacaktır:

* Alınan verinin ilk baytı 0 olmalıdır. Değilse, alınan veri blok olarak kabul edilmeyecektir;

* Alınan blok oluşturma zaman damgası, geçerli zaman damgasından önce olmalıdır;

* Blok oluşturma zaman damgası, onur düğümünün yeni bloklar oluşturma ayrıcalığına sahip olduğu zaman aralığına karşılık gelmelidir;

* Yeni bir bloğun yüksekliği, mevcut blok zincirindeki en büyük bloğun yüksekliğinden daha büyük olmalıdır;

* Bloktaki tüm işlemler için izin verilen maksimum harcamaları aşamaz;

* Blok, bulunduğu düğümün gizli anahtarı ile uygun şekilde imzalanmalıdır. İmza verileri şunları içermelidir:

  * Bloğun yüksekliği, önceki bloğun hash'i, bloğun zaman damgası, bloğun bulunduğu ekosistemin kimliği ve bloğun onur düğümünün hesap adresi;

  * Platform parametresi full_nodes dizisindeki onur düğümünün konumu, bloktaki tüm işlemlerin Merkel Kökü (MrklRoot) ve önceki bloğun geri dönüş karması.

Bloktaki her işlemin doğruluğunu aşağıdaki yöntemlerle kontrol etmek için:

* Her işlemin hash'i benzersiz olmalıdır;

* Anahtar imzalı bir işlem sınırı aşamaz ([max_tx_block_per_user](../reference/platform-parameters.md#max-tx-block-per-user));

* Maksimum işlem boyutu sınırını aşamaz ([max_tx_size](../reference/platform-parameters.md#max-tx-size));

* İşlem süresi, blok oluşturma süresinden daha büyük veya blok oluşturma süresi artı 600 saniyeden daha büyük olamaz ve blok oluşturma süresi eksi 86400 saniyeden daha az olamaz;

* İşlem düzgün bir şekilde imzalanmalıdır;

* Sözleşmeyi uygulayan kullanıcının işlem bedelini ödemesi için hesabında yeterli token olması gerekir.

### Veri tabanı

IBAX Ağının temel veri depolama katmanı, tamamen halka açık bir 'PGSQL' veritabanıdır. IBAX İşletim Sistemi Platformunun izin tasarımına dayalı olarak, kullanıcıların veri güvenliği konusunda endişelenmesine gerek yoktur. Nesne yönelimli tasarım felsefesi ile IBAX Ağı, verileri ilişkisel bir PGSQL veritabanı aracılığıyla önceden derler ve veri işleme verimliliğini artırır.

Teknik bir uzmansanız aşağıdakiler ilginizi çekebilir veya değilseniz sadece atlayabilirsiniz.
① Adında sayı öneki olmayan tüm tablolar, IBAX Network Basic'in izin tablolarına aittir;
② Adında bir sayı öneki olan tüm tablolar ecoLibs'in izin tablolarına aittir.

## ECOLIB

Kullanıcılar, hatta sıradan kullanıcılar için IBAX Ağ Sistemi Platformunda kendilerine ait bir ecoLib oluşturmak oldukça kolaydır. ecoLib oluşturmanın tek bir tıklamayla gerçekleştiği bir uygulamayı entegre ettik ve geliştirdik.

Bir ecoLib oluştururken, ekosistem parametrelerini ve kurallarını yapılandırabilir ve yönetici hesabını ve ücretlendirme modelini ayarlayabilirsiniz. En önemlisi, DPoA fikir birliğini ecoLibs içinde daha iyi uygulamak için, içerik oluşturucular bunu kendi sözleşmelerini yazarak veya içe aktararak kurabilirler.

Sözleşme şablonlarını içe aktararak ecoLib belirteçlerinin hızla yayılmasını destekliyoruz.

Konsensüs ve yönetim izinlerindeki farklılıklar nedeniyle, ecoLib'ler merkezi olmayan ve merkezi olmayanlara ayrılır. Türlerine göre belirli bir avantaj veya dezavantajı yoktur. Servis ihtiyaçlarınıza uygun olanı seçmelisiniz. Şimdilik iyiyse ama gelecek için değilse ne yapmalı? IBAX Ağ Sistemi Platformunda ecoLib parametrelerini, hatta mutabakat mekanizmasını, belirteci ve yönetişim yöntemini değiştirebilirsiniz. Her şeyi ecoLib yöneticisi veya üyeleri (ecoLib türüne bağlı olarak) tarafından sağlanan öz-yönetim mekanizmasına bırakabilirsiniz.

IBAX Ağ Sistemi Platformunda, bir ecoLib, bağımsız veritabanı tabloları ve alanları tasarlamak ve bunlara erişmek için eksiksiz veri kontrol izinlerine ve izinlerine sahiptir. Veri denetimi izin tasarımında, bir alan mantıksal bir ifadeyi karşıladığında tetiklemeyi destekleriz. Bu özellik, izleme, mantıksal tatmin ve zamana ve belirli koşullara göre tetikleme gibi özel hizmetlerde hayal gücü alanı sağlar.

Bir ecoLib'de birden fazla DApp olabilir ve bunların her birinin bağımsız parametreleri olabilir. ecoLib, istediğiniz her şeyi uygulayabileceğiniz bir platform gibidir.

Ekosistem geliştiricilerini daha iyi desteklemek için Weaver düzenleme, yönetim ve geliştirme aracını sağlıyoruz. Ekosistem geliştirme, bakım ve yönetim maliyetlerini büyük ölçüde azaltacaktır.

### IDE

Weaver, yazılım geliştiricilerin blok zinciri teknolojisini derinlemesine anlamalarını gerektirmeyen blok zinciri uygulamaları oluşturmak için eksiksiz bir entegre geliştirme ortamına (IDE) sahiptir.

Weaver, herhangi bir yazılım modülünün desteği olmadan ekosistemde uygulamalar oluşturmak için gereken bir tablo yönetim aracı, sözleşme düzenleyici, sayfa düzenleyici ve diğer işlevleri sağlar.

IDE temel olarak aşağıdaki bölümleri içerir:

* ekosistem parametrelerinin listesi;

* sözleşme editörü;

* tablo yönetim aracı;

* sayfa editörü ve görsel sayfa tasarımcısı;

* çoklu dil kaynakları düzenleyicisi;

* uygulama içe/dışa aktarma işlevleri.

### Uygulamalar

Bir uygulama, yapılandırma için erişim haklarına sahip veritabanı tabloları, akıllı sözleşmeler ve kullanıcı sayfaları gibi bir öğeler topluluğudur. Uygulama öğesinin ait olduğu ekosistem, "@1ElementName" gibi öğe adındaki önekle belirtilir; burada ekosistem kimliği, "@" simgesinden sonra "1" sayısıyla belirtilir. Mevcut ekosistemdeki uygulama öğelerini kullanırken "@1" öneki atlanabilir. Bu uygulamalar, faydalı işlevleri yerine getirebilir veya çeşitli hizmetleri uygulayabilir.

### Tablolar

IBAX'ın veritabanında, her ekosistem sınırsız sayıda tablo oluşturabilir. Belirli bir ekosistemin tabloları, Weaver'da görüntülenmeyecek olan ekosistem kimliğini içeren bir ön ek ile tanımlanabilir.

Bir masa hiçbir şekilde bağlı değildir ve belirli bir sözleşmeye aittir. Tablonun erişim hakları kapsamındaki tüm uygulamalar tarafından kullanılabilir.

Her ekosistem, uygulamalarını geliştirmek için bir dizi veri tablosu oluşturabilir veya muhtemelen, tablo adı önekini belirterek diğer ekosistemlerin veri tablolarına erişebilir.

Akıllı yasalar aracılığıyla erişim haklarını yapılandırarak, veriler tablolara kaydedilir. Hak yönetimi için akıllı yasalar kullanılır.

 >  Tablo tablo yönetim aracı

Tablo yönetimi aracını, analiz cihazı tablosunu listele:

* Tabloların listesini ve girişlerini görüntüleyin;

* Yeni tablolar oluşturun;

* Bir tablo alanı ekleyin ve `Text, Date/Time, Varchar, Character, JSON, Number, Money, Double, Binary` gibi veri tipini belirtin;

* Ekleme, güncelleme verileri ve tablo yapısını değiştirme ayrıcalıklarını yönetin.

> Tablo veri işleme

Daha iyi veritabanı işlemesi için hem Needle hem de Logicor, tablolardan değerleri ve veri dizilerini almak için kullanılan **DBFind** işlevine sahiptir.

Sözleşme dili **DBInsert** işlevi tablolara giriş eklemek için kullanılır. **DBUpdate** ve **DBUpdateExt** işlevleri, mevcut bir girdinin değerini güncellemek için kullanılır. Güncelleme sırasında tablolardaki ilgili veriler güncellenecek ve blok zinciri tüm geçmiş işlemleri korurken yeni işlemler ekleyecektir. Tablolardaki veriler yalnızca değiştirilebilir ve silinemez.

Sözleşme uygulama süresini en aza indirmek için **DBFind** işlevi aynı anda birden çok tabloyu sorgulayamaz ve JOIN desteklenmez. Bu nedenle, uygulama tablolarını normalleştirmemeyi, mevcut tüm bilgileri girişlerde saklamanızı veya diğer tablolarda bulunan bilgileri tekrarlamanızı öneririz. Bu zorunlu değildir ancak bir blockchain uygulaması için gereklidir. Bu durumda veriler, ilişkisel bir veritabanında eşzamanlı olarak güncellenmesine rağmen, diğer tablolardaki aynı veriler güncellense bile güncellenemeyecek şekilde tam olarak saklanmalıdır.

### Ekosistem Parametreleri

Weaver'ın menüsünde ekosistem parametrelerinin (**1_parameters**) listesini görüntüleyebilir ve düzenleyebilirsiniz. Ekosistem parametreleri aşağıdaki gruplara ayrılabilir:

* Genel parametreler: ekosistemi oluşturanın hesabı (kurucu_hesap) ve diğer bilgiler;

* Erişim hakları parametreleri: uygulama öğeleri için erişim izinlerini tanımlamak için kullanılır

    * tablo yapısını değiştirin (değişen_tablolar);

    * sözleşmeyi değiştirin (değişen_sözleşmeler);

    * kullanıcı sayfasını değiştir (değişen_sayfa);

    * menüyü değiştir (change_menu);

    * çoklu dil kaynaklarını değiştirin (değişen_dil).


* Teknik parametreler: kullanıcı stillerini (stil sayfası) tanımlamak için kullanılır;

* Kullanıcı parametreleri: uygulama çalışması için gerekli sabitleri veya listeleri (virgülle ayrılmış) tanımlamak için kullanılır.

Her ekosistemin parametreleri için düzenleme izni belirtebilirsiniz.

Ekosistem parametre başlığını parametre olarak geçirerek bir ekosistem parametresinin değerini almak için EcosysParam işlevini kullanabilirsiniz.

## Erişim hakları kontrol mekanizması

IBAX, çok seviyeli bir erişim izni yönetim sistemine sahiptir. Erişim haklarını yapılandırarak sözleşmeler, tablolar, kullanıcı sayfaları, ekosistem parametreleri gibi herhangi bir uygulama öğesini oluşturabilir ve değiştirebilirsiniz. Erişim haklarını yapılandırma yoluyla da değiştirebilirsiniz.

Varsayılan olarak, IBAX ekosistemindeki tüm haklar, her ekosistemin MainCondition sözleşmesinde tanımlanan yaratıcısı tarafından yönetilir. Ancak akıllı yasalar oluşturulduktan sonra erişim kontrolü, ekosistem üyelerinin tümüne veya bir grubuna aktarılabilir.
Erişim hakları kontrolü

Erişim hakları sözleşme tablolarında (**1_contracts** ), veri tablolarında (**1_tables** ), kullanıcı sayfası tablolarında (**1_pages** ), menü tablolarında (**1_menu** ) ve kod bloğunda tanımlanır. tablolar (**1_blocks** ). İlgili menüleri Weaver'da bulabilirsiniz.

### Erişim hakları yönetimi

Erişim hakları kuralları, ilgili sözleşme ifadeleri **ContractConditions(“@1MainCondition”)**, **ContractAccess(“@1MainCondition”)** veya izin alanındaki mantıksal ifadeler doldurularak yapılandırılır. İstek ifadesinin sonucu (true) geçerse, erişim verilir. Aksi takdirde erişim reddedilir ve ilgili işlemler sonlandırılır.

Hakları tanımlamanın kolay yolu, sağdaki alana mantıksal bir ifade girmektir. Örneğin, "$key_id == 8919730491904441614", burada **$keyid** bir ekosistem üyesinin kimliğini temsil eder.

Hakları tanımlamanın en yaygın ve önerilen yolu, `ContractConditions("@1ContractsName1","@1ContractsName2")` işlevini kullanmaktır. Sözleşme adı **SözleşmeAdı**, işleve bir parametre olarak iletilir ve sözleşme sonucu, mantıksal bir ifadenin (doğru veya yanlış) sonucu olmalıdır.

Hakları tanımlamanın başka bir yolu da `ContractAccess("@1ContractsName3","@1ContractsName4")` işlevini kullanmaktır. İlgili işlemi uygulamaya uygun **SözleşmeAdı** sözleşmesi, işleve parametre olarak geçirilebilir. Örneğin, tutar sütununun sağ alanı `ContractAccess("@1TokenTransfer")` olarak yapılandırılmışsa, o zaman yalnızca tutar sütunundaki değeri değiştirmek istiyorsanız **@1TokenTransfer** sözleşmesini uygulayabilirsiniz. Sözleşmeye erişim hakkı, oldukça karmaşık olan ve birçok başka sözleşmeyi içerebilen koşullar bölümünde yönetilebilir.

### Özel haklar

Bir ekosistemin çalışması için kritik olan acil durumlar veya durumlar durumunda, ekosistem parametreleri (**1_parameters**) listesinde (örneğin *değişen_sözleşmeler*, *sayfalarıdeğiştiren*), vb. birçok özel parametre vardır. mevcut ekosistemin tüm sözleşmelerine, veri tablolarına ve sayfalarına erişim haklarını tanımlar. Bu haklar, anahtar sözleşmelerle yapılandırılır.

## Sanal özel ekosistem

IBAX'te sanal bir özel ekosistem oluşturabilirsiniz - **Çapraz Defterler Tabanı (CLB)**. Bir CLB, standart ekosistemin tüm işlevlerine sahiptir, ancak blok zincirinin dışında çalışır. CLB'de sözleşmeleri ve şablon dillerini, tabloları kullanabilir ve oluşturabilir ve uygulamalar oluşturmak için Weaver'ı kullanabilirsiniz. API aracılığıyla blockchain ekosistemindeki sözleşmeleri arayabilirsiniz.

### Web kaynaklarına yönelik istekler

    CLB ile standart ekosistem arasındaki temel fark, sözleşme işlevlerini ([HTTPRequest](../topics/script.md#httprequest)) ve ([HTTPPostJSON](../topics/script.md#httppostjson) kullanabilmenizdir. )) sözleşme kapsamındaki herhangi bir web kaynağını HTTP/HTTPS istekleri aracılığıyla talep etmek. Bu işleve iletilen parametreler şunları içerir: URL'ler, istek yöntemleri (GET veya POST), istek başlıkları ve istek parametreleri.

### Veri okuma hakları

Okunabilir olmasına rağmen, CLB'deki veriler blok zincirine kaydedilmez. Veritabanı tablolarına okuma izni vermeyi seçebilirsiniz. Ayrı sütunlar için veya özel bir sözleşme kullanarak herhangi bir satır için okuma hakları ayarlayabilirsiniz.

### CLB oluşturma

Ağ üzerinde bir CLB düğümü oluşturabilirsiniz. Önceden tanımlandığı gibi, CLB düğüm yöneticisi, ekosistem listesini CLB işleviyle kullanma ve uygulamaları yüklemek, yeni üyeler almak ve kaynaklara erişim izinlerini yapılandırmak için ekosistem oluşturucu ayrıcalıklarına sahip bir kullanıcı belirleme ayrıcalığına sahiptir.

### CLB kullanımı

Kayıt formları oluşturmak, kullanıcılara e-posta veya telefon yoluyla doğrulama bilgileri göndermek ve herkesin erişebileceği verileri depolamak için bir CLB kullanabilirsiniz. Uygulamaları yazıp test edebilir ve ardından bunları blok zinciri ekosistemine aktarabilirsiniz. Bir CLB'de, zamanlama sözleşmesi görevlerini kullanabilir, web kaynaklarından veri almak için oracle makineleri oluşturabilir ve bu verileri blok zinciri ekosistemine gönderebilirsiniz.
