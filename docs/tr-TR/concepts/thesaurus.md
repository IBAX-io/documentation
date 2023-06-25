
# Terimler ve tanımlar {#terms-and-definitions}

  - [Blockchain terimleri](#blockchain-terms)
    - [Blockchain](#blockchain)
    - [Peer to peer ağ](#peer-to-peer-network)
    - [Hash](#hash)
    - [Blok](#block)
    - [Blok doğrulama](#block-verification)
    - [Consensus](#consensus)
    - [Token](#token)
    - [Kimlik](#identification)
    - [Benzersiz tanımlama](#unique-identification)
    - [Private key](#private-key)
    - [Public key](#public-key)
    - [Dijital imza](#digital-signature)
    - [Akıllı sözleşme](#smart-contract)
    - [İşlem ücreti](#transaction-fee)
    - [Çifte harcama](#double-spend)
    - [Şifreleme](#encryption)
    - [Private blockchain](#private-blockchain)
    - [Public blok zinciri](#public-blockchain)
    - [Yetki Belgesi](#proof-of-authority)
  - [IBAX Şartları](#ibax-terms)
    - [Testnet](#testnet)
    - [Ana ağ](#mainnet)
    - [Gaz ücreti](#gas-fee)
    - [Hesap adresi](#account-address)
    - [Cüzdan adresi](#wallet-address)
    - [Weaver](#weaver)
    - [ECOLIB](#ecolib)
    - [ECOLIB parametreleri](#ecolib-parameters)
    - [ECOLIB üyeleri](#ecolib-members)
    - [Sanal özel ECOLIB](#virtual-private-ecolib)
    - [Merkezi Olmayan Yetki Kanıtı](#decentralized-proof-of-authority)
    - [Needle](#needle)
    - [Mantık](#logicor)
    - [Entegre Geliştirme Ortamı (IDE)](#integrated-development-environment-ide)
    - [Sayfa düzenleyici](#page-editor)
    - [Görsel sayfa tasarımcısı](#visual-page-designer)
    - [Sözleşme düzenleyicisi](#contract-editor)
    - [Çok dilli kaynaklar](#multilingual-resources)
    - [Uygulama dışa aktarma](#application-export)
    - [Uygulama içe aktarma](#application-import)
    - [Akıllı hukuk](#smart-law)
    - [Yasal sistem](#legal-system)
    - [Uygulama](#application)
    - [Sayfa](#page)
    - [Kod segmenti](#code-segment)
    - [Erişim hakları](#access-rights)
    - [Honor Node](#honor-node)
    - [Guardian Node](#guardian-node)
    - [Eşzamanlı işlem işleme](#concurrent-transaction-processing)


## Blok zinciri terimleri {#blockchain-terms}

### Blockchain {#blockchain}

Blockchain, veri güvenilirliğini korurken verilerin sahte olmasını veya kaybolmasını önlemek için verileri depolayan ve sistem içinde veri ileten ve işleyen bir bilgi sistemidir; Veri koruması şu şekilde sağlanır:

1. bir dizi şifreli bloktan oluşan bir blok zincirine veri yazmak;

2. eşler arası ağlarda blok zinciri kopyalarının dağıtılmış depolanması;

3. Bir konsensüs mekanizması kullanarak tüm düğümlerde blok zincirlerinin senkronizasyonu;

4. Blok zincirinde veri aktarımlarını saklayan ve sözleşmeleri işleyen algoritmalarla ağı kullanarak veri işlemleri gerçekleştirirken veri güvenilirliğini sağlamak.

### Peer-to-peer ağ {#peer-to-peer-network}

A computer network, consisting of equally privileged nodes (without a central server).

### Hash {#hash}

Hashing olarak da bilinir, daha kısa bir sabit uzunluklu ikili değere eşlenen herhangi bir dosyanın veya veri kümesi uzunluğunun ikili değeri.

### Blok {#block}

İşlemin biçimini ve imzasını doğruladıktan sonra, bir işlem kümesi, onur düğümü tarafından belirli bir veri yapısında gruplandırılır. Bir blok, blok zinciri şifrelemesinin güvenliğini sağlamaya yönelik önlemlerden biri olan önceki bloğa bağlantı olarak bir karma işaretçi içerir.

### Blok doğrulama {#block-verification}

Blok yapısının doğruluğunu, oluşturma süresini, önceki blokla uyumluluğu, işlem imzalarını ve işlem ile blok verileri arasındaki yazışmayı doğrulamak için bir prosedür.

### Consensus {#consensus}

Honor tarafından blok zincirine yeni bloklar ekleme sürecinde kullanılan bu tür bir protokolün doğrulama protokolü veya algoritması.

### İşlem {#transaction-1}

Blok zinciri ağındaki veri iletim işlemleri veya bu tür işlemlerin blok zincirindeki kayıtları.

### Token {#token}

Blok zincirinde dolaşabilen şifreli dijital hakların ve hisselerin kanıtı. Bu kayıtlar arasında hakların ve payların değiş tokuşu için bir mekanizma da dahil olmak üzere, bir sicilde saklanan bir dizi tanımlanabilir dijital kayıt.

### Kimlik {#identification}

Sistemdeki kullanıcıları tanımlamak için kullanılan bir şifreleme programı.

### Benzersiz kimlik {#unique-identification}

Hesapları kullanıcılarla ilişkilendirme süreci, kullanıcı adlarını gerçek kullanıcılarla ilişkilendirmek için biyometrik tanımlama elde etmek için yasal ve kurumsal çabalar veya diğer prosedürler gerektirir.

### Private key {#private-key}

Sahibi tarafından gizlice saklanan, sahibi tarafından internetteki sanal hesaplara erişmek ve işlemleri imzalamak için kullanılan bir karakter dizisi.

### Public key {#public-key}

Özel anahtarın gerçekliğini kontrol etmek için kullanılan bir karakter dizisi. Genel anahtar, özel anahtardan benzersiz bir şekilde türetilir.

### Elektronik imza {#digital-signature}

Şifrelenmiş veri işlemeden sonra elde edilen bir belgenin veya mesajın öznitelikleri. Dijital imza, belgenin bütünlüğünü (değişiklik yok) ve orijinalliğini (gönderenin kimliğinin doğrulanması) kontrol etmek için kullanılır.

### Akıllı sözleşme {#smart-contract}

Blok zincirinde veri depolama işlemlerini gerçekleştiren programda tüm sözleşmeler blok zincirinde saklanır.

### İşlem ücreti {#transaction-fee}

İşlemi gerçekleştirmek için onur düğümüne ödenen ücret.

### Çift harcama {#double-spend}

Blok zinciri ağına saldırmak için bir yöntem. Sonuç olarak, bir işlem aynı tokena iki kez mal olur.

Bu tür bir saldırı, blok zinciri çatallandığında meydana gelir ve bu, yalnızca saldırgan ağın doğrulama kapasitesinin %50'sinden fazlasını kontrol ettiğinde yürütülebilir.

### Şifreleme {#encryption}

Dijital veri dönüştürmenin bir yolu, yalnızca ilgili şifre çözme anahtarına sahip olan taraf onu okuyabilir.

### Özel blok zinciri {#private-blockchain}

Tüm düğümlerin ve veri erişim haklarının tek bir kuruluş (hükümet, şirket veya birey) tarafından merkezi olarak kontrol edildiği bir blok zinciri ağı.

### Halka açık blok zinciri {#public-blockchain}

Herhangi bir kuruluş tarafından kontrol edilmeyen bir blok zinciri ağında, tüm kararlar ağ katılımcıları arasında fikir birliğine varılarak alınır. Herkes blok zinciri ağının verilerini alabilir ve bunlara erişebilir.

### Yetki Belgesi {#proof-of-authority}

Yetki Kanıtı (PoA), IBAX Ağı, dağıtım, zayıf merkezileştirme ve bir sertifika yetkilisini birleştiren yeni bir fikir birliği mekanizması yarattı. Biz buna PoA (Yetki Kanıtı) diyoruz. Tüm IBAX Ağı için sürekliliği sağlamak için, fikir birliği yalnızca IBAX Kamu Ağı'nı değil, aynı zamanda her kullanıcı ve kullanıcı grubu tarafından oluşturulan ecoLib'leri de kapsar. Bu, gerçekten kendi kendini yöneten, merkezi olmayan, adil, şeffaf ve dolandırıcılığa karşı dayanıklı bir Merkezi Olmayan Otonom Organizasyon (DAO) yaratır.

## IBAX Şartları {#ibax-terms}

### Test ağı {#testnet}

Test için kullanılan blockchain ağının sürümü.

### Ana ağ {#mainnet}

Blockchain ağının ana versiyonu.

### İşlem {#transaction-2}

Sözleşmeyi çağırın ve parametreleri sözleşmenin işlem komutuna iletin. Onur düğümü yürütmesinin sonucu, veritabanının güncellenmesidir.

### Gaz ücreti {#gas-fee}

Bir düğümler ağında belirli işlemleri gerçekleştirmenin maliyetini hesaplamak için kullanılan geleneksel bir birim. Yakıt değişim oranı, onur düğümündeki bir oylama ile belirlenir.

### Hesap adresi {#account-address}

Veri kayıtları belirteci depolar ve bir çift anahtar (özel anahtar ve genel anahtar) aracılığıyla erişilebilir.

### Cüzdan adresi {#wallet-address}

Kullanıcının sanal hesabının adı olarak kullanılan düğüm ağındaki kullanıcının karakter kodlama tanımlayıcısı.

### Weaver {#weaver}

Masaüstü ve web tarayıcısı sürümlerini sağlayan düğüm ağına bağlanmak için kullanılan yazılım istemcisi.

Weaver, tablolar, sayfalar ve sözleşmeler oluşturma ve düzenleme dahil olmak üzere platform geliştirme ortamını bütünleştirir. Kullanıcılar ECOLIB'ler oluşturabilir, Weaver'da uygulamalar oluşturabilir ve kullanabilir.

### EKOLİB {#ecolib}

Uygulamalar ve ECOLIB üyeleri dahil olmak üzere nispeten kapalı veya açık bir yazılım programlama ortamı.

ECOLIB üyeleri, ECOLIB'ye ait özel tokenlar çıkarabilir, üyeler arasında etkileşim kuralları oluşturmak için akıllı sözleşmeler kullanabilir ve üyeler için uygulama öğelerine erişim hakları belirleyebilir.

### ECOLIB parametreleri {#ecolib-parameters}

ECOLIB'yi oluşturan kişinin hesabı ve değişen uygulama öğelerinin izinleri gibi bir dizi yapılandırılabilir ECOLIB parametresi, parametre tablosunda değiştirilebilir.

### ECOLIB üyeleri {#ecolib-members}

Belirli ECOLIB'lere ve uygulama özelliklerine erişebilen kullanıcılar.

### Sanal özel ECOLIB {#virtual-private-ecolib}

Sanal özel ECOLIB - Standart ECOLIB'nin tüm işlevlerine sahip olan ancak blok zincirinin dışında çalışan Çapraz Defterler Tabanı (CLB). CLB'de sözleşmeleri ve şablon dillerini, veritabanı tablolarını kullanabilir ve oluşturabilir ve uygulamalar oluşturmak için Weaver'ı kullanabilirsiniz. API'ler aracılığıyla ECOLIB blok zincirindeki sözleşmeleri arayabilirsiniz.

### Merkezi Olmayan Yetki Kanıtı {#decentralized-proof-of-authority}

Merkezi Olmayan Yetki Kanıtı (DPoA), yüksek performans ve hata toleransı sağlayan yeni bir fikir birliği algoritmasıdır. DPoA'da, yeni blok oluşturma hakkı, bunu yapma hakkını kanıtlamış düğümlere verilir ve bu tür düğümler ön doğrulamaya tabi olmalıdır.

### Needle {#needle}

Kullanıcı sayfalarından alınan verileri ve veritabanı tablolarında gerçekleştirilen değer işlemlerini işleyebilen akıllı sözleşmeler oluşturmak için kullanılan bir komut dosyası dili.
Weaver'ın düzenleyicisinde sözleşmeler oluşturabilir ve düzenleyebilirsiniz.

### Mantıksal {#logicor}

Sayfaları oluşturmak için kullanılan şablon dili. Veritabanı tablolarından değerler alabilir, kullanıcı sayfaları oluşturabilir ve kullanıcı girdi verilerini sözleşmenin **veri** bölümüne iletebilir.

### Entegre Geliştirme Ortamı (IDE) {#integrated-development-environment-ide}

Entegre Geliştirme Ortamı (IDE), uygulamalar oluşturmak için kullanılan bir dizi yazılım aracıdır.

Weaver'ın IDE'si bir sözleşme düzenleyicisi, sayfa düzenleyicisi, veritabanı tablosu yönetim aracı, çok dilli kaynak düzenleyicisinin yanı sıra uygulama dışa aktarma ve içe aktarma işlevlerini içerir. IDE, anlamsal araçlara dayalı görsel sayfa tasarımcısını tamamlar.

### Sayfa düzenleyici {#page-editor}

Weaver'da, ekrandaki temel uygulama öğelerini, HTML kapsayıcılarını, form alanlarını, düğmeleri ve diğer araçları doğrudan düzenleyerek uygulama sayfaları oluşturabilirsiniz.

### Görsel sayfa tasarımcısı {#visual-page-designer}

Arayüz tasarımcısı ve "Logicor" sayfa kodu oluşturucu dahil, Weaver'da uygulama sayfaları oluşturmaya yönelik araçlar.

### Sözleşme düzenleyici {#contract-editor}

Weaver'da görsel sayfaları kullanarak sözleşmeler oluşturmak için bir araç.

### Çok dilli kaynaklar {#multilingual-resources}

Uygulama sayfasındaki etiketi seçilen dilin metin değeriyle ilişkilendiren, Weaver'daki uygulama sayfası yerelleştirme modülü.

### Uygulama dışa aktarma {#application-export}

Uygulamaya ait tüm tabloların, sayfaların ve sözleşmelerin kaynak kodunu dosya olarak kaydedin.

### Uygulama içe aktarma {#application-import}

Dışa aktarma dosyasında bulunan bir uygulamanın tüm tablolarını, sayfalarını ve sözleşmelerini ECOLIB'ye yükleyin.

### Akıllı yasa {#smart-law}

Düzenleyici bilgileri içeren ve operasyonu yönetmek ve kontrol etmek ve erişim haklarını kaydetmek için kullanılan özel bir akıllı sözleşmeler setidir.

### Yasal sistem {#legal-system}

ECOLIB kullanıcıları arasındaki ilişkiyi düzenleyebilen, protokol parametrelerini değiştirmek için prosedürel kuralları tanımlayabilen ve çeşitli zorlu çözümleri tanımlayabilen akıllı hukukta oluşturulmuş bir dizi kural ve mekanizma.

### Başvuru {#application}

Weaver'ın IDE'sinde tamamen işlevsel yazılım ürünleri oluşturun.

Bir uygulama, veritabanı tabloları, akıllı sözleşmeler ve yapılandırma erişim haklarına sahip kullanıcı sayfaları gibi bir öğeler topluluğudur.

### Sayfa {#page}

Ekranda interaktif bir arayüz oluşturan Logicor şablon dilinde yazılmış program kodu.

### Kod segmenti {#code-segment}

Uygulama sayfalarında tekrar kullanılabilen Logicor şablon dilinde yazılmış program kodu.

### Erişim hakları {#access-rights}

Tablolar, sözleşmeler ve sayfalar oluşturmak ve düzenlemek için erişim hakları alma koşulları.

Tablolara erişim hakları, satır ve sütun ekleme ve sütunlardaki değerleri düzenleme haklarıyla yapılandırılabilir.

### Honor Node {#honor-node}

Ağ düğümünde blok oluşturma ve doğrulama hakkına sahip bir düğüm.

### Guardian Node {#guardian-node}

Tam blok zincirinin en son sürümünü depolamak için kullanılan ağdaki bir düğüm.

### Eşzamanlı işlem işleme {#concurrent-transaction-processing}

Aynı anda farklı ECOLIB'lerden gelen verileri işleyerek işlem işleme hızını artırma yöntemi.