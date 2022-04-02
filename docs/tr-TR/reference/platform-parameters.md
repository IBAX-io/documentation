# Platform Parametreleri
Bunlar, IBAX'i yapılandırmak için kullanılan parametrelerdir. Blok zinciri ağına ve içindeki tüm ekosistemlere uygulanabilirler.

## Platform parametrelerinin depolanacağı konum
Platform parametreleri `sistem parametreleri` tablosunda saklanır.

Bu tablo, blok zinciri ağında oluşturulan ilk (varsayılan) ekosistemde bulunur.

## Platform parametrelerinin değiştirilmesi
Platform parametrelerinin değiştirilmesi ancak oylama yoluyla yapılabilir. Platformun yasal sistemindeki tanımlarla yönetilen herhangi bir platform parametresini değiştirmek için yalnızca UpdateSysParam sözleşmesini kullanabilirsiniz.

## Platform parametrelerini yapılandırın
### Blok zinciri ağını yapılandırın

Nodes:
* [full nodes](#full-nodes)
* [number of nodes](#number-of-nodes)

Node bans:
* [incorrect blocks per day](#incorrect-blocks-per-day)
* [node ban time](#node-ban-time)
* [node ban time local](#node-ban-time-local)

### Yeni bir ekosistem yapılandırın

Varsayılan sayfa ve menü:
* [default ecosystem page](#default-ecosystem-page)
* [default ecosystem menu](#default-ecosystem-menu)

Varsayılan kontrat:
* [default ecosystem contract](#default-ecosystem-contract)

### Veritabanını yapılandır

Tablo limitleri:
* [max columns](#max-columns)
* [max indexes](#max-indexes)

### Blokların oluşturulmasını yapılandırın
Zaman limitleri:
* [gap between blocks](#gap-between-blocks)
* [max block generation time](#max-block-generation-time)

İşlem limitleri:
* [max tx block](#max-tx-block)
* [max tx block per user](#max-tx-block-per-user)

Boyut limitleri:
* [max tx size](#max-tx-size)
* [max block size](#max-block-size)
* [max forsign size](#max-forsign-size)

Fuel limitleri:
* [max fuel block](#max-fuel-block)
* [max fuel tx](#max-fuel-tx)

Blok rollback limitleri:
* [rollback blocks](#rollback-blocks)

### Fuel tokenlarını yapılandırın
Ödüller ve komisyonlar:
* [block reward](#block-reward)
* [commission wallet](#commission-wallet)
* [commission size](#commission-size)

Fuel oranı dönüşümü:
* [fuel rate](#fuel-rate)
* [price create rate](#price-create-rate)

İşlem boyutu ve veri fiyatı:
* [price tx data](#price-tx-data)
* [price tx size wallet](#price-tx-size-wallet)

Yeni elemanların fiyatı:
* [price create ecosystem](#price-create-ecosystem)
* [price create table](#price-create-table)
* [price create column](#price-create-column)
* [price create contract](#price-create-contract)
* [price create menu](#price-create-menu)
* [price create page](#price-create-page)
* [price create application](#price-create-application)

İşlemler için fiyat:
<!-- TOC -->

- [Platform Parameters](#platform-parameters)
  - [Location to store platform parameters](#location-to-store-platform-parameters)
  - [Change of platform parameters](#change-of-platform-parameters)
  - [Configure platform parameters](#configure-platform-parameters)
    - [Configure the blockchain network](#configure-the-blockchain-network)
    - [Configure a new ecosystem](#configure-a-new-ecosystem)
    - [Configure the database](#configure-the-database)
    - [Configure the generation of blocks](#configure-the-generation-of-blocks)
    - [Configure the fuel tokens](#configure-the-fuel-tokens)
    - [Depreciated](#depreciated)
  - [Details of platform parameters](#details-of-platform-parameters)
    - [block reward](#block-reward)
    - [blockchain url](#blockchain-url)
    - [commission size](#commission-size)
    - [commission wallet](#commission-wallet)
    - [default ecosystem contract](#default-ecosystem-contract)
    - [default ecosystem menu](#default-ecosystem-menu)
    - [default ecosystem page](#default-ecosystem-page)
    - [fuel rate](#fuel-rate)
    - [price create rate](#price-create-rate)
    - [full nodes](#full-nodes)
    - [gap between blocks](#gap-between-blocks)
    - [incorrect blocks per day](#incorrect-blocks-per-day)
    - [max block generation time](#max-block-generation-time)
    - [max block size](#max-block-size)
    - [max columns](#max-columns)
    - [max forsign size](#max-forsign-size)
    - [max fuel block](#max-fuel-block)
    - [max fuel tx](#max-fuel-tx)
    - [max indexes](#max-indexes)
    - [max tx block](#max-tx-block)
    - [max tx block per user](#max-tx-block-per-user)
    - [max tx size](#max-tx-size)
    - [node ban time](#node-ban-time)
    - [node ban time local](#node-ban-time-local)
    - [number of nodes](#number-of-nodes)
    - [price create ecosystem](#price-create-ecosystem)
    - [price create application](#price-create-application)
    - [price create table](#price-create-table)
    - [price create column](#price-create-column)
    - [price create contract](#price-create-contract)
    - [price create menu](#price-create-menu)
    - [price create page](#price-create-page)
    - [price exec address to id](#price-exec-address-to-id)
    - [price exec bind wallet](#price-exec-bind-wallet)
    - [price exec column condition](#price-exec-column-condition)
    - [price exec compile contract](#price-exec-compile-contract)
    - [price exec contains](#price-exec-contains)
    - [price exec contract by id](#price-exec-contract-by-id)
    - [price exec contract by name](#price-exec-contract-by-name)
    - [price exec contracts list](#price-exec-contracts-list)
    - [price exec create column](#price-exec-create-column)
    - [price exec create ecosystem](#price-exec-create-ecosystem)
    - [price exec create table](#price-exec-create-table)
    - [price exec ecosys param](#price-exec-ecosys-param)
    - [price exec eval](#price-exec-eval)
    - [price exec eval condition](#price-exec-eval-condition)
    - [price exec flush contract](#price-exec-flush-contract)
    - [price exec has prefix](#price-exec-has-prefix)
    - [price exec id to address](#price-exec-id-to-address)
    - [price exec is object](#price-exec-is-object)
    - [price exec join](#price-exec-join)
    - [price exec json to map](#price-exec-json-to-map)
    - [price exec len](#price-exec-len)
    - [price exec perm column](#price-exec-perm-column)
    - [price exec perm table](#price-exec-perm-table)
    - [price exec pub to id](#price-exec-pub-to-id)
    - [price exec replace](#price-exec-replace)
    - [price exec sha256](#price-exec-sha256)
    - [price exec size](#price-exec-size)
    - [price exec substr](#price-exec-substr)
    - [price exec sys fuel](#price-exec-sys-fuel)
    - [price exec sys param int](#price-exec-sys-param-int)
    - [price exec sys param string](#price-exec-sys-param-string)
    - [price exec table conditions](#price-exec-table-conditions)
    - [price exec unbind wallet](#price-exec-unbind-wallet)
    - [price exec update lang](#price-exec-update-lang)
    - [price exec validate condition](#price-exec-validate-condition)
    - [price tx data](#price-tx-data)
    - [price tx size wallet](#price-tx-size-wallet)
    - [rollback blocks](#rollback-blocks)

<!-- /TOC -->

### Amortismana tabi tutuldu
Amortismana tabi tutulmuş parametreler:
* [blockchain url](#blockchain-url)

## Platform parametrelerinin ayrıntıları

### blok ödülü
Bloğu oluşturan onur düğümüne verilen IBXC belirteçlerinin sayısı.

Ödülü alan hesap, [full nodes](#full-nodes) parametresinde belirtilir.

### blok zinciri url'i
amortismana tabi tutuldu.

### komisyon boyutu
Komisyonun yüzdesi.

Komisyon tutarı, sözleşmenin uygulanmasının toplam maliyetinin bir yüzdesi olarak hesaplanır. Komisyon jetonunun birimi IBXC'dir.

Komisyon, komisyon_cüzdan parametresinde belirtilen hesap adresine aktarılacaktır.

### komisyon cüzdanı
Komisyonun alınacağı hesap adresi.

Komisyon miktarı, komisyon_boyutu parametresi ile belirlenir.

### varsayılan ekosistem sözleşmesi
Yeni ekosistemdeki varsayılan sözleşmenin kaynak kodu.

Bu sözleşme, ekosistem oluşturucuya erişim sağlar.

### varsayılan ekosistem menüsü
Yeni ekosistemin varsayılan menüsünün kaynak kodu.

### varsayılan ekosistem sayfası
Yeni ekosistemin varsayılan sayfasının kaynak kodu.

### fuel oranı
Fuel birimine göre farklı ekosistem belirteçlerinin döviz kurları.

Bu parametrenin formatı:

`[["ecosystem_id", "token_to_fuel_rate"], ["ecosystem_id2", "token_to_fuel_rate2"], ...]`

* ``ecosystem_id``

    Ekosistem ID.
* `token_to_fuel_rate`

    Fuel birimine göre tokenın döviz kuru.

Örnek:

`[["1","1000000000000"], ["2", "1000"]]`

Ekosistem 1'in bir jetonu 1.000.000.000.000 Fuel birimiyle değiştirilir. Ekosistem 2'nin bir jetonu 1.000 Fuel birimiyle değiştirilir.

### fiyat oluşturma oranı
Yeni bir elemanın Fuel oranı.

### tam nodelar
Blockchain ağının honor nodelarının listesi.

Bu parametrenin formatı:

`
[{"api_address":"https://apihost1:port1","public_key":"nodepub1","tcp_address":"tcphost1:port2"},{"api_address":"https://apihost2:port1","public_key":"nodepub2","tcp_address":"tcphost2:port2"}]
`

* `tcp_address`

     Node ana bilgisayarının TCP adresi ve bağlantı noktası.
     İşlemler ve yeni bloklar, ilk bloktan tam blok zinciri elde etmek için de kullanılabilen bu ana bilgisayar adresine gönderilecektir.
* `api_address`

    API adresi ve düğüm ana bilgisayarının bağlantı noktası.
    API adresi aracılığıyla, Weaver kullanmadan platformun herhangi bir işlevine erişebilirsiniz. Ayrıntıları RESTful API'de görün.
* `public_key`

    Blok imzasını doğrulamak için kullanılan düğümün genel anahtarı.


### bloklar arasındaki boşluk
Bir düğümde iki blok oluşturmanın zaman aralığı (saniye cinsinden).

Ağdaki tüm düğümler, ne zaman yeni bir blok oluşturulacağını belirlemek için bunu kullanır. Mevcut düğüm bu süre içinde yeni bir blok oluşturmazsa, sıra, onur düğümleri listesindeki bir sonraki düğüme geçer.

The minimum value of this parameter is `1` second.

### günlük yanlış bloklar
Bir düğümün yasaklanmadan önce bir günde oluşturmasına izin verilen hatalı blokların sayısı.

Ağdaki düğümlerin yarısından fazlası bir düğümden aynı sayıda hatalı blok aldığında, düğüm [node ban time](#node-ban-time) içinde belirtilen bir süre içinde ağdan yasaklanır.

### maksimum blok oluşturma süresi
Milisaniye cinsinden bir blok oluşturmak için maksimum süre. Bu süre içinde bir blok başarıyla oluşturulmazsa, bir zaman aşımı hatası rapor edilir.

### maksimum blok boyutu
Bir bloğun bayt cinsinden maksimum boyutu.

### maksimum sütun
Tek bir tablodaki maksimum alan sayısı.

Ancak, önceden tanımlanmış "id" sütununu içermez.

### maksimum forsign boyutu
Bayt cinsinden bir işlem imzasının maksimum boyutu.

### maksimum Fuel bloğu
Tek bir bloğun maksimum toplam Fuel ücreti.

### maksimum Fuel tx
Tek bir işlemin maksimum toplam Fuel ücreti.

### maksimum dizin
Tek bir tablodaki maksimum birincil anahtar alanı sayısı.

### maksimum tx bloğu
Tek bir bloktaki maksimum işlem sayısı.

### kullanıcı başına maksimum tx bloğu
Bir bloktaki bir hesabın maksimum işlem sayısı.

### maksimum tx boyutu
Bayt cinsinden bir işlemin maksimum boyutu.

### düğüm yasağı süresi
Milisaniye cinsinden düğümün genel yasaklama süresi.

Ağdaki düğümlerin yarısından fazlası bir düğümden [günlük yanlış blok](#günlük yanlış blok) sayısına kadar hatalı bloklar aldığında, düğüm bu süre boyunca ağda yasaklanır .

### yerel düğüm yasağı zamanı
Düğümün milisaniye cinsinden yerel yasaklama süresi.

Bir düğüm başka bir düğümden yanlış bir blok aldığında, bu süre zarfında gönderenin düğümünü yerel olarak yasaklar.

### düğüm sayısı
[tam düğümler](#full-nodes) parametresindeki maksimum honor node sayısı.

### fiyat oluşturma ekosistemi
Yeni bir tek ekosistem oluşturmak için fuel ücreti.

Bu parametre, `@1NewEcosystem` sözleşmesinin ek fuel ücretini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için fuel ücreti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [fuel oranı](#fuel-oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat oluşturma uygulaması
Yeni bir tek uygulama oluşturmak için Fuel ücreti.

Bu parametre, `@1NewApplication` sözleşmesinin ek Fuel ücretini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel ücreti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat tablosu oluştur
Yeni bir tek tablo oluşturmak için Fuel ücreti.

Bu parametre, `@1NewTable` sözleşmesinin ek Fuel maliyetini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel maliyeti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat oluşturma sütunu
Yeni bir tek tablo alanı oluşturmak için Fuel ücreti.

Bu parametre, `@1NewColumn` sözleşmesinin ek Fuel maliyetini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel maliyeti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat sözleşme oluştur
Yeni bir tek sözleşme oluşturmak için Fuel ücreti.

Bu parametre, `@1NewContract` sözleşmesinin ek Fuel maliyetini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel maliyeti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat oluşturma menüsü
Yeni tek menü oluşturmak için Fuel ücreti.

Bu parametre, `@1NewMenu` sözleşmesinin ek Fuel maliyetini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel maliyeti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat oluşturma sayfası
Yeni bir tek sayfa oluşturmak için Fuel ücreti.

Bu parametre, `@1NewPage` sözleşmesinin ek Fuel maliyetini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel maliyeti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### kimliğe fiyat yürütme adresi
`AddressToId()` işlevini çağırmanın Fuel ücreti, Fuel birimi cinsinden hesaplanır.

### fiyat yürütme bağlama cüzdanı
Fuel birimlerinde hesaplanan, `Activate()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme sütun koşulu
Fuel birimlerinde hesaplanan, `ColumnCondition()` işlevini çağırmanın Fuel ücreti. 

### fiyat yürütme sözleşmesi derleme
Fuel birimlerinde hesaplanan, `CompileContract()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme şunları içerir
Fuel birimlerinde hesaplanan, `İçerir()` işlevini çağırmanın Fuel ücreti.

### kimliğe göre fiyat yürütme sözleşmesi
Fuel birimlerinde hesaplanan, `GetContractById()` işlevini çağırmanın Fuel ücreti.

### isme göre fiyat yürütme sözleşmesi
Fuel birimlerinde hesaplanan `GetContractByName()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme sözleşmeleri listesi
`ContractsList()` işlevini çağırmanın Fuel birimi cinsinden hesaplanan Fuel ücreti.

### fiyat yürütme sütunu oluştur
Fuel birimlerinde hesaplanan, `CreateColumn()` işlevini çağırmanın Fuel ücreti.

### fiyat yönetimi ekosistem oluştur
Fuel birimlerinde hesaplanan, `CreateEcosystem()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme tablosu oluştur
Fuel birimlerinde hesaplanan, `CreateTable()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme ecosys parametresi
Fuel birimlerinde hesaplanan, `EcosysParam()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme değerlendirmesi
Fuel birimlerinde hesaplanan, `Evaluation()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme değerlendirme koşulu
Fuel birimlerinde hesaplanan, `EvalCondition()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme gömme sözleşmesi
Fuel birimlerinde hesaplanan, `FlushContract()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme ön ekine sahip
Fuel birimlerinde hesaplanan, `HasPrefix()` işlevini çağırmanın Fuel ücreti.

### adrese fiyat yürütme kimliği
Fuel birimlerinde hesaplanan, `IdToAddress()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme nesnedir
Fuel birimlerinde hesaplanan, `IsObject()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme katılımı
Fuel birimlerinde hesaplanan, `Join()` işlevini çağırmanın Fuel ücreti.

### eşlemek için json fiyat yürütme
Fuel birimlerinde hesaplanan, `JSONToMap()` işlevini çağırmanın Fuel ücreti.

### fiyat yönetimi
Fuel birimlerinde hesaplanan, `Len()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme izni sütunu
Fuel birimlerinde hesaplanan, `PermColumn()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme izin tablosu
Fuel birimlerinde hesaplanan, `PermTable()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme pub'ından kimliğe
Fuel birimlerinde hesaplanan, `PubToID()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme değiştir
Fuel birimlerinde hesaplanan, `Değiştir()` işlevini çağırmanın Fuel ücreti.

### fiyat yöneticisi sha256
Fuel birimlerinde hesaplanan, `Sha256()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme boyutu
Fuel birimlerinde hesaplanan, `Size()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme altdizini
Fuel birimlerinde hesaplanan, `Substr()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme sistemi Fuelı
Fuel birimlerinde hesaplanan, `SysFuel()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme sistem parametresi int
Fuel birimlerinde hesaplanan, `SysParamInt()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme sys param dizesi
`SysParamString()` işlevini çağırmanın Fuel ücreti, Fuel birimlerinde hesaplanır.

### fiyat yürütme tablosu koşulları
Fuel birimlerinde hesaplanan, `TableConditions()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme cüzdanını çöz
Fuel birimlerinde hesaplanan, 'Deactivate()' işlevini çağırmanın Fuel ücreti.

### fiyat yürütme güncelleme dili
Fuel birimlerinde hesaplanan, `UpdateLang()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme doğrulama koşulu
`ValidateCondition()` işlevini çağırmanın Fuel ücreti, Fuel birimi cinsinden hesaplanır.

### fiyat tx verileri
Bir işlemin her 1024 baytı için Fuel birimi cinsinden hesaplanan Fuel ücreti.

### fiyat tx boyutunda cüzdan
İşlem boyutuna göre ücret, birimi IBXC tokenidir.

Ekosistem 1 dışında, diğer ekosistemlerde bir sözleşme uygulanırken orantılı olarak bir blok alanı kullanım ücreti alınacaktır ve oranı megabayt başına *fiyat tx boyutlu cüzdan* IBXC belirteçleridir.

### geri alma blokları
Blok zincirinde bir fork tespit edildiğinde geri alınabilecek maksimum blok sayısı.