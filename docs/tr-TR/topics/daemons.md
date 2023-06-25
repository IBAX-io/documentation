
# Arka plan programı {#daemon}

Bu bölümde, IBax düğümlerinin teknik açıdan birbirleriyle nasıl etkileşime girdiğini anlatacağız.

## Sunucu arka plan programı hakkında {#about-the-server-daemon}
Sunucu arka plan programının, çeşitli sunucu işlevlerini yürüten ve IBax'ın blok zinciri protokolünü destekleyen her ağ düğümünde çalışması gerekir. Blok zinciri ağında, arka plan programı blokları ve işlemleri dağıtır, yeni bloklar oluşturur ve alınan blokları ve işlemleri doğrular ve fork sorununu önleyebilir.
### Honor düğümü arka plan programı {#honor-node-daemon}
Bir honor düğümü aşağıdaki sunucu arka plan programlarını çalıştırır:
* [BlockGenerator arka plan programı](#blockgenerator-daemon)

    Yeni bloklar oluşturma.

* [BlockCollection arka plan programı](#blockcollection-daemon)

    Diğer düğümlerden yeni bloklar indiriliyor.

* [Onaylar arka plan programı](#confirmations-daemon)

    Düğümdeki blokların diğer düğümlerin çoğunda da bulunduğunun doğrulanması.

* [Disseminator arka plan programı](#disseminator-daemon)

    İşlemleri ve blokları diğer onur düğümlerine dağıtma.

* QueueParserBlocks arka plan programı

    Diğer düğümlerden gelen blokları içeren kuyruktaki bloklar.

    Blok işleme mantığı, [BlockCollection arka plan programı](#blockcollection-daemon) ile aynıdır.

* QueueParserTx arka plan programı

    Kuyruktaki işlemlerin doğrulanması.

* Zamanlayıcı arka plan programı

    Sözleşmeleri planlandığı gibi yürütmek.

### Koruyucu düğüm arka plan programı {#guardian-node-daemon}

Bir koruyucu düğüm aşağıdaki sunucu arka plan programlarını çalıştırır:

* [BlockCollection daemon](#blockcollection-daemon)
* [Confirmations daemon](#confirmations-daemon)
* [Disseminator daemon](#disseminator-daemon)
* QueueParserTx
* Scheduler

## BlockCollection arka plan programı {#blockcollection-daemon}

Bu arka plan programı blokları indirir ve blok zincirini diğer ağ düğümleriyle senkronize eder.

### Blok zinciri senkronizasyonu {#blockchain-synchronization}

Bu arka plan programı, blok zinciri ağındaki maksimum blok yüksekliğini belirleyerek, yeni bloklar talep ederek ve blok zincirindeki fork sorununu çözerek blok zincirini senkronize eder.

#### Blockchain güncellemelerini kontrol edin {#check-for-blockchain-updates}

Bu arka plan programı, geçerli blok id'ye tüm honor düğümlerine istek gönderir.

Daemon'u çalıştıran düğümün mevcut blok id, herhangi bir honor düğümünün mevcut blok id'sinden küçükse, blok zinciri ağ düğümü güncel değil olarak kabul edilir.

#### Yeni blokları indirin {#download-new-blocks}

Mevcut en büyük blok yüksekliğini döndüren düğüm, en son düğüm olarak kabul edilir.
Daemon tüm bilinmeyen blokları indirir.

#### Solving the fork issue {#solving-the-fork-issue}

Blok zincirinde bir fork algılanırsa, arka plan programı tüm blokları ortak bir ana bloğa indirerek forku geriye doğru hareket ettirir.
Ortak ana blok bulunduğunda, arka plan programını çalıştıran düğümde bir blok zinciri geri dönüşü gerçekleştirilir ve en sonuncusu dahil edilene kadar blok zincirine doğru blok eklenir..

### Tablolar {#tables-1}

BlocksCollection arka plan programı aşağıdaki tabloları kullanır:

* block_chain
* transactions
* transactions_status
* info_block

### İstek {#request-1}

BlockCollection arka plan programı, diğer arka plan programlarına aşağıdaki istekleri gönderir:

* [Type 10](#type-10), tüm honor düğümleri arasında en büyük blok ID'ye işaret eder.
* [Tür 7](#type-7) en büyük blok ID'nin sahip verilere işaret eder.

## BlockGenerator arka plan programı {#blockgenerator-daemon}

BlockGenerator arka plan programı yeni bloklar oluşturur.

### Ön doğrulama {#pre-verification}

BlockGenerator arka plan programı, yeni blok oluşturma planları yapmak için blok zincirindeki en son blokları analiz eder.

Aşağıdaki koşullar karşılanırsa, yeni bir blok oluşturulabilir:

* En son bloğu oluşturan düğüm, honor düğümü listesindeki bir düğümdedir ve arka plan programını çalıştırır.
* En son doğrulanmamış bloğun oluşturulmasından bu yana geçen en kısa süre.

### Blok oluşturma {#block-generation}

Daemon tarafından oluşturulan yeni bir blok, diğer düğümlerin [Disseminator arka plan programından](#disseminator-daemon) alınabilen veya arka plan programını çalıştıran düğüm tarafından oluşturulabilen tüm yeni işlemleri içerir. Oluşturulan blok, düğüm veritabanında saklanır.

### Tablolar {#tables-2}

BlockGenerator arka plan programı aşağıdaki tabloları kullanır:

* block_chain (saves new blocks)
* transactions
* transactions_status
* info_block

### İstek {#request-2}

BlockGenerator arka plan programı, diğer arka plan programlarına herhangi bir istekte bulunmaz.

## Disseminator arka plan programı {#disseminator-daemon}

Disseminator arka plan programı, tüm onur düğümlerine işlemler ve bloklar gönderir.

### Koruyucu düğüm {#guardian-node}

Bir koruyucu düğüm üzerinde çalışırken arka plan programı, düğümü tarafından oluşturulan işlemleri tüm honor düğümlerine gönderir.

### Honor düğüm {#honor-node}

Bir honor düğümü üzerinde çalışırken, arka plan programı oluşturulan blokları ve işlem hashlerini tüm honor düğümlerine gönderir.

Ardından, honor düğümü, bilmediği işlem isteklerine yanıt verir. Daemon, tam işlem verilerini yanıt olarak gönderir.

### Tablolar {#tables-3}

Disseminator arka plan programı aşağıdaki tabloları kullanır:

* transactions

### İstek {#request-3}

Disseminator arka plan programı, diğer arka plan programlarına aşağıdaki istekleri gönderir:

* [Tür 1](#type-1) Honor düğümüne işlemleri gönderin ve hashleri bloklayın.
* [Type 2](#type-2) Honor düğümünden işlem verilerini alın.

## Onaylar arka plan programı {#confirmations-daemon}

Onaylar arka plan programı, düğümündeki tüm blokların diğer düğümlerin çoğunda bulunup bulunmadığını kontrol eder.

### Blok onayı {#block-confirmation}

Ağdaki birden fazla düğüm tarafından onaylanan bir blok, onaylanmış bir blok olarak kabul edilir.

Daemon, veri tabanında henüz onaylanmayan ilk bloktan başlayarak tüm blokları tek tek onaylar.

Her blok aşağıdaki şekilde onaylanır:

* Tüm honor düğümlerine onaylanan bloğun kimliğini içeren bir istek göndermek.
* Tüm honor düğümleri blok karmasına yanıt verir.
* Yanıtlanan hash, arka plan programı düğümündeki bloğun hash değeriyle eşleşirse, onay sayacı değeri artar. Değilse, iptal sayaç değeri artırılır.

### Tablolar {#tables-4}

Onaylar arka plan programı aşağıdaki tabloları kullanır:

* confirmation
* info_block

### İstek {#request-4}

Onaylar arka plan programı, diğer arka plan programlarına aşağıdaki istekleri gönderir:

* [Type 4](#type-4) Onur düğümünden blok hashlerini isteyin.

## TCP hizmet protokolü {#tcp-service-protocol}

TCP hizmet protokolü, BlocksCollection, Dağıtıcı ve Onay arka plan programlarından gelen istekler için TCP'deki ikili protokolü kullanan onur düğümleri ve koruyucu düğümler üzerinde çalışır.

## İstek Türü {#request-type}

Her isteğin, isteğin ilk iki baytı tarafından tanımlanan bir türü vardır.

## Tip 1 {#type-1}

#### İstek gönderen {#request-sender-1}

Bu istek [Disseminator arka plan programı](#disseminator-daemon) tarafından gönderilir.

#### Veri iste {#request-data-1}

İşlemin ve bloğun hashi.

#### Talep işleme {#request-processing-1}

Blok hash, blok kuyruğuna eklenir.

İşlem hash analiz eder ve doğrular ve henüz düğümde görünmeyen işlemleri seçer.

#### Cevap {#response-1}

Hayır. İsteği işledikten sonra bir [Type 2](#type-2) isteği verilir.

## Tip 2 {#type-2}

#### İstek gönderen {#request-sender-2}

Bu istek [Disseminator arka plan programı](#disseminator-daemon) tarafından gönderilir.

#### Veri iste {#request-data-2}

Veri boyutu da dahil olmak üzere işlem verileri:

* data_size (4 bytes)

* Size of the transaction data, in bytes.

* data (data_size bytes)

İşlem verileri.

#### Talep işleme {#request-processing-2}

İşlemi doğrular ve işlem kuyruğuna ekler.

#### Cevap {#response-2}

Hayır.

## Tip 4 {#type-4}

#### İstek gönderen {#request-sender-3}

Bu istek [Onaylar arka plan programı](#confirmations-daemon) tarafından gönderilir.

#### Veri iste {#request-data-3}

Block ID.

#### Cevap {#response-3}

Block hash.

Bu ID'ye sahip bir blok yoksa "0" döndürür.

## Tip 7 {#type-7}

#### İstek gönderen {#request-sender-4}

Bu istek [BlockCollection arka plan programı](#blockcollection-daemon) tarafından gönderilir.

#### Veri iste {#request-data-4}

Block ID.

* block_id (4 bytes)

#### Cevap {#response-4}

Veri boyutu dahil blok verileri.

* data_size (4 bytes)

* Size of the block data, in bytes.

* data (data_size bytes)

Blok verileri.

Bu kimliğe sahip bir blok yoksa bağlantı kapatılır.

## Tip 10 {#type-10}

#### İstek gönderen {#request-sender-5}

Bu istek [BlockCollection arka plan programı](#blockcollection-daemon) tarafından gönderilir.

#### Veri iste {#request-data-5}

Hayır.

#### Cevap {#response-5}

Block ID.

* block_id (4 bytes)