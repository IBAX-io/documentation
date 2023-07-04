# Platform Parametreleri {#platform-parameters}
Bunlar, IBAX'i yapılandırmak için kullanılan parametrelerdir. Blok zinciri ağına ve içindeki tüm ekosistemlere uygulanabilirler.

## Platform parametrelerinin depolanacağı konum {#location-to-store-platform-parameters}
Platform parametreleri `sistem parametreleri` tablosunda saklanır.

Bu tablo, blok zinciri ağında oluşturulan ilk (varsayılan) ekosistemde bulunur.

## Platform parametrelerinin değiştirilmesi {#change-of-platform-parameters}
Platform parametrelerinin değiştirilmesi ancak oylama yoluyla yapılabilir. Platformun yasal sistemindeki tanımlarla yönetilen herhangi bir platform parametresini değiştirmek için yalnızca UpdateSysParam sözleşmesini kullanabilirsiniz.

## Platform parametrelerini yapılandırın {#configure-platform-parameters}
### Blok zinciri ağını yapılandırın {#configure-the-blockchain-network}

Nodes:
* [full nodes](#full-nodes)
* [number of nodes](#number-of-nodes)

Node bans:
* [incorrect blocks per day](#incorrect-blocks-per-day)
* [node ban time](#node-ban-time)
* [node ban time local](#node-ban-time-local)

### Yeni bir ekosistem yapılandırın {#configure-a-new-ecosystem}

Varsayılan sayfa ve menü:
* [default ecosystem page](#default-ecosystem-page)
* [default ecosystem menu](#default-ecosystem-menu)

Varsayılan kontrat:
* [default ecosystem contract](#default-ecosystem-contract)

### Veritabanını yapılandır {#configure-the-database}

Tablo limitleri:
* [max columns](#max-columns)
* [max indexes](#max-indexes)

### Blokların oluşturulmasını yapılandırın {#configure-the-generation-of-blocks}
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

### Fuel tokenlarını yapılandırın {#configure-the-fuel-tokens}
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

## Amortismana tabi tutuldu {#depreciated}
Amortismana tabi tutulmuş parametreler:
* [blockchain url](#blockchain-url)

## Platform parametrelerinin ayrıntıları {#details-of-platform-parameters}

### blok ödülü {#block-reward}
Bloğu oluşturan onur düğümüne verilen IBXC belirteçlerinin sayısı.

Ödülü alan hesap, [full nodes](#full-nodes) parametresinde belirtilir.

### blok zinciri url'i {#blockchain-url}
amortismana tabi tutuldu.

### komisyon boyutu {#commission-size}
Komisyonun yüzdesi.

Komisyon tutarı, sözleşmenin uygulanmasının toplam maliyetinin bir yüzdesi olarak hesaplanır. Komisyon jetonunun birimi IBXC'dir.

Komisyon, komisyon_cüzdan parametresinde belirtilen hesap adresine aktarılacaktır.

### komisyon cüzdanı {#commission-wallet}
Komisyonun alınacağı hesap adresi.

Komisyon miktarı, komisyon_boyutu parametresi ile belirlenir.

### varsayılan ekosistem sözleşmesi {#default-ecosystem-contract}
Yeni ekosistemdeki varsayılan sözleşmenin kaynak kodu.

Bu sözleşme, ekosistem oluşturucuya erişim sağlar.

### varsayılan ekosistem menüsü {#default-ecosystem-menu}
Yeni ekosistemin varsayılan menüsünün kaynak kodu.

### varsayılan ekosistem sayfası {#default-ecosystem-page}
Yeni ekosistemin varsayılan sayfasının kaynak kodu.

### fuel oranı {#fuel-rate}
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

### fiyat oluşturma oranı {#price-create-rate}
Yeni bir elemanın Fuel oranı.

### tam nodelar {#full-nodes}
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


### bloklar arasındaki boşluk {#gap-between-blocks}
Bir düğümde iki blok oluşturmanın zaman aralığı (saniye cinsinden).

Ağdaki tüm düğümler, ne zaman yeni bir blok oluşturulacağını belirlemek için bunu kullanır. Mevcut düğüm bu süre içinde yeni bir blok oluşturmazsa, sıra, onur düğümleri listesindeki bir sonraki düğüme geçer.

The minimum value of this parameter is `1` second.

### günlük yanlış bloklar {#incorrect-blocks-per-day}
Bir düğümün yasaklanmadan önce bir günde oluşturmasına izin verilen hatalı blokların sayısı.

Ağdaki düğümlerin yarısından fazlası bir düğümden aynı sayıda hatalı blok aldığında, düğüm [node ban time](#node-ban-time) içinde belirtilen bir süre içinde ağdan yasaklanır.

### maksimum blok oluşturma süresi {#max-block-generation-time}
Milisaniye cinsinden bir blok oluşturmak için maksimum süre. Bu süre içinde bir blok başarıyla oluşturulmazsa, bir zaman aşımı hatası rapor edilir.

### maksimum blok boyutu {#max-block-size}
Bir bloğun bayt cinsinden maksimum boyutu.

### maksimum sütun {#max-columns}
Tek bir tablodaki maksimum alan sayısı.

Ancak, önceden tanımlanmış "id" sütununu içermez.

### maksimum forsign boyutu {#max-forsign-size}
Bayt cinsinden bir işlem imzasının maksimum boyutu.

### maksimum Fuel bloğu {#max-fuel-block}
Tek bir bloğun maksimum toplam Fuel ücreti.

### maksimum Fuel tx {#max-fuel-tx}
Tek bir işlemin maksimum toplam Fuel ücreti.

### maksimum dizin {#max-indexes}
Tek bir tablodaki maksimum birincil anahtar alanı sayısı.

### maksimum tx bloğu {#max-tx-block}
Tek bir bloktaki maksimum işlem sayısı.

### kullanıcı başına maksimum tx bloğu {#max-tx-block-per-user}
Bir bloktaki bir hesabın maksimum işlem sayısı.

### maksimum tx boyutu {#max-tx-size}
Bayt cinsinden bir işlemin maksimum boyutu.

### düğüm yasağı süresi {#node-ban-time}
Milisaniye cinsinden düğümün genel yasaklama süresi.

Ağdaki düğümlerin yarısından fazlası bir düğümden [günlük yanlış blok](#günlük yanlış blok) sayısına kadar hatalı bloklar aldığında, düğüm bu süre boyunca ağda yasaklanır .

### yerel düğüm yasağı zamanı {#node-ban-time-local}
Düğümün milisaniye cinsinden yerel yasaklama süresi.

Bir düğüm başka bir düğümden yanlış bir blok aldığında, bu süre zarfında gönderenin düğümünü yerel olarak yasaklar.

### düğüm sayısı {#number-of-nodes}
[tam düğümler](#full-nodes) parametresindeki maksimum honor node sayısı.

### fiyat oluşturma ekosistemi {#price-create-ecosystem}
Yeni bir tek ekosistem oluşturmak için fuel ücreti.

Bu parametre, `@1NewEcosystem` sözleşmesinin ek fuel ücretini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için fuel ücreti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [fuel oranı](#fuel-oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat oluşturma uygulaması {#price-create-application}
Yeni bir tek uygulama oluşturmak için Fuel ücreti.

Bu parametre, `@1NewApplication` sözleşmesinin ek Fuel ücretini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel ücreti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat tablosu oluştur {#price-create-table}
Yeni bir tek tablo oluşturmak için Fuel ücreti.

Bu parametre, `@1NewTable` sözleşmesinin ek Fuel maliyetini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel maliyeti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat oluşturma sütunu {#price-create-column}
Yeni bir tek tablo alanı oluşturmak için Fuel ücreti.

Bu parametre, `@1NewColumn` sözleşmesinin ek Fuel maliyetini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel maliyeti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat sözleşme oluştur {#price-create-contract}
Yeni bir tek sözleşme oluşturmak için Fuel ücreti.

Bu parametre, `@1NewContract` sözleşmesinin ek Fuel maliyetini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel maliyeti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat oluşturma menüsü {#price-create-menu}
Yeni tek menü oluşturmak için Fuel ücreti.

Bu parametre, `@1NewMenu` sözleşmesinin ek Fuel maliyetini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel maliyeti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### fiyat oluşturma sayfası {#price-create-page}
Yeni bir tek sayfa oluşturmak için Fuel ücreti.

Bu parametre, `@1NewPage` sözleşmesinin ek Fuel maliyetini tanımlar. Sözleşme uygulandığında, bu sözleşmenin çeşitli işlevlerinin yerine getirilmesi için Fuel maliyeti de hesaplanacak ve toplam maliyete dahil edilecektir.

Bu parametre Fuel birimlerinde hesaplanır. Fuel birimlerini IBXC jetonlarına dönüştürmek için [Fuel oranı](#Fuel oranı) ve [fiyat oluşturma oranı](#price-create-rate) kullanın.

### kimliğe fiyat yürütme adresi {#price-exec-address-to-id}
`AddressToId()` işlevini çağırmanın Fuel ücreti, Fuel birimi cinsinden hesaplanır.

### fiyat yürütme bağlama cüzdanı {#price-exec-bind-wallet}
Fuel birimlerinde hesaplanan, `Activate()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme sütun koşulu {#price-exec-column-condition}
Fuel birimlerinde hesaplanan, `ColumnCondition()` işlevini çağırmanın Fuel ücreti. 

### fiyat yürütme sözleşmesi derleme {#price-exec-compile-contract}
Fuel birimlerinde hesaplanan, `CompileContract()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme şunları içerir {#price-exec-contains}
Fuel birimlerinde hesaplanan, `İçerir()` işlevini çağırmanın Fuel ücreti.

### kimliğe göre fiyat yürütme sözleşmesi {#price-exec-contract-by-id}
Fuel birimlerinde hesaplanan, `GetContractById()` işlevini çağırmanın Fuel ücreti.

### isme göre fiyat yürütme sözleşmesi {#price-exec-contract-by-name}
Fuel birimlerinde hesaplanan `GetContractByName()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme sözleşmeleri listesi {#price-exec-contracts-list}
`ContractsList()` işlevini çağırmanın Fuel birimi cinsinden hesaplanan Fuel ücreti.

### fiyat yürütme sütunu oluştur {#price-exec-create-column}
Fuel birimlerinde hesaplanan, `CreateColumn()` işlevini çağırmanın Fuel ücreti.

### fiyat yönetimi ekosistem oluştur {#price-exec-create-ecosystem}
Fuel birimlerinde hesaplanan, `CreateEcosystem()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme tablosu oluştur {#price-exec-create-table}
Fuel birimlerinde hesaplanan, `CreateTable()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme ecosys parametresi {#price-exec-ecosys-param}
Fuel birimlerinde hesaplanan, `EcosysParam()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme değerlendirmesi {#price-exec-eval}
Fuel birimlerinde hesaplanan, `Evaluation()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme değerlendirme koşulu {#price-exec-eval-condition}
Fuel birimlerinde hesaplanan, `EvalCondition()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme gömme sözleşmesi {#price-exec-flush-contract}
Fuel birimlerinde hesaplanan, `FlushContract()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme ön ekine sahip {#price-exec-has-prefix}
Fuel birimlerinde hesaplanan, `HasPrefix()` işlevini çağırmanın Fuel ücreti.

### adrese fiyat yürütme kimliği {#price-exec-id-to-address}
Fuel birimlerinde hesaplanan, `IdToAddress()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme nesnedir {#price-exec-is-object}
Fuel birimlerinde hesaplanan, `IsObject()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme katılımı {#price-exec-join}
Fuel birimlerinde hesaplanan, `Join()` işlevini çağırmanın Fuel ücreti.

### eşlemek için json fiyat yürütme {#price-exec-json-to-map}
Fuel birimlerinde hesaplanan, `JSONToMap()` işlevini çağırmanın Fuel ücreti.

### fiyat yönetimi {#price-exec-len}
Fuel birimlerinde hesaplanan, `Len()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme izni sütunu {#price-exec-perm-column}
Fuel birimlerinde hesaplanan, `PermColumn()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme izin tablosu {#price-exec-perm-table}
Fuel birimlerinde hesaplanan, `PermTable()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme pub'ından kimliğe {#price-exec-pub-to-id}
Fuel birimlerinde hesaplanan, `PubToID()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme değiştir {#price-exec-replace}
Fuel birimlerinde hesaplanan, `Değiştir()` işlevini çağırmanın Fuel ücreti.

### fiyat yöneticisi sha256 {#price-exec-sha256}
Fuel birimlerinde hesaplanan, `Sha256()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme boyutu {#price-exec-size}
Fuel birimlerinde hesaplanan, `Size()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme altdizini {#price-exec-substr}
Fuel birimlerinde hesaplanan, `Substr()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme sistemi Fuelı {#price-exec-sys-fuel}
Fuel birimlerinde hesaplanan, `SysFuel()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme sistem parametresi int {#price-exec-sys-param-int}
Fuel birimlerinde hesaplanan, `SysParamInt()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme sys param dizesi {#price-exec-sys-param-string}
`SysParamString()` işlevini çağırmanın Fuel ücreti, Fuel birimlerinde hesaplanır.

### fiyat yürütme tablosu koşulları {#price-exec-table-conditions}
Fuel birimlerinde hesaplanan, `TableConditions()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme cüzdanını çöz {#price-exec-unbind-wallet}
Fuel birimlerinde hesaplanan, 'Deactivate()' işlevini çağırmanın Fuel ücreti.

### fiyat yürütme güncelleme dili {#price-exec-update-lang}
Fuel birimlerinde hesaplanan, `UpdateLang()` işlevini çağırmanın Fuel ücreti.

### fiyat yürütme doğrulama koşulu {#price-exec-validate-condition}
`ValidateCondition()` işlevini çağırmanın Fuel ücreti, Fuel birimi cinsinden hesaplanır.

### fiyat tx verileri {#price-tx-data}
Bir işlemin her 1024 baytı için Fuel birimi cinsinden hesaplanan Fuel ücreti.

### fiyat tx boyutunda cüzdan {#price-tx-size-wallet}
İşlem boyutuna göre ücret, birimi IBXC tokenidir.

Ekosistem 1 dışında, diğer ekosistemlerde bir sözleşme uygulanırken orantılı olarak bir blok alanı kullanım ücreti alınacaktır ve oranı megabayt başına *fiyat tx boyutlu cüzdan* IBXC belirteçleridir.

### geri alma blokları {#rollback-blocks}
Blok zincirinde bir fork tespit edildiğinde geri alınabilecek maksimum blok sayısı.