# RESTful API v2

Kimlik doğrulama, ekosistem veri alımı, hata işleme, veritabanı tablosu işlemleri, sayfalar ve sözleşmelerin uygulanması dahil olmak üzere Weaver tarafından sağlanan tüm işlevler, IBAX'in REST API'si kullanılarak kullanılabilir.

REST API ile geliştiriciler, Weaver kullanmadan tüm platform işlevlerine erişebilir.

API komut çağrıları, "/api/v2/command/[param]" adresiyle yürütülür; burada "komut" komut adıdır ve "param" ek bir parametredir. İstek parametreleri 'Content-Type: x-www-form-urlencoded' formatında gönderilmelidir. Sunucu yanıtı sonucu JSON biçimindedir.


* [Hata yönetimi](#Hata-yönetimi)
    * [Hata listesi](#Hata-listesi)

* [Kimlik doğrulama](#Kimlik-doğrulama)
    * [getuid](#getuid)
    * [Giriş](#Giriş)

* [API'ler CLB tarafından kullanılamıyor](#API'ler-CLB-tarafından-kullanılamıyor)

* [Servis komutları](#Servis-komutları)
    * [Versiyon](#version)

* [Veri talebi işlevleri](#Veri-talebi-işlevleri)
    * [Balans](#balance)
    * [Bloklar](#bloklar)
    * [Detaylı bloklar](#detaylı-bloklar)
    * [/data/{table}/{id}/{column}/{hash}](#data-table-id-column-hash)
    * [keyinfo](#keyinfo)

* [Metrikleri al](#Metrikleri-al)
    * [keys](#keys)
    * [blocks](#blocks)
    * [işlemler](#İşlemler)
    * [ekosistemler](#Ekosistemler)
    * [fullnodes](#fullnodes)

* [Ekosistem](#ecosystem)
    * [ekosistemadı](#ecosystemname)
    * [ekosistemler](#ecosystems)
    * [appparams/{appID}](#appparams-appid)
    * [appparam/{appid}/{name}](#appparam-appid-name)
    * [ecosystemparams](#ecosystemparams)
    * [ecosystemparam/{name}](#ecosystemparam-name)
    * [tables/[?limit=…&offset=…]](#tables-limit-offset)
    * [table/{name}](#table-name)
    * [list/{name}[?limit=…&offset=…&columns=…]](#list-name-limit-offset-colums)
    * [sections[?limit=…&offset=…&lang=]](#sections-limit-offset-lang)
    * [row/{name}/{id}[?columns=]](#row-name-id-colums)
    * [systemparams](#systemparams)
    * [history/{name}/{id}](#history-name-id)
    * [interface/{page|menu|block}/{name}](#interface-page-menu-block-name)

* [Contract functions](#contract-functions)
    * [contracts[?limit=…&offset=…]](#contracts-limit-offset)
    * [contract/{name}](#contract-name)
    * [sendTX](#sendtx)
    * [txstatus](#txstatus)
    * [txinfo/{hash}](#txinfo-hash)
    * [txinfoMultiple/](#txinfomultiple)
    * [/page/validators_count/{name}](#page-validators_count-name)
    * [content/menu|page/{name}](#content-menu-page-name)
    * [content/source/{name}](#content-source-name)
    * [content/hash/{name}](#content-hash-name)
    * [content](#content)
    * [maxblockid](#maxblockid)
    * [block/{id}](#block-id)
    * [avatar/{ecosystem}/{member}](#avatar-ecosystem-member)
    * [config/centrifugo](#config-centrifugo)
    * [updnotificator](#updnotificator)


## Hata yönetimi

İstek başarıyla yürütülürse, "200" durum kodu döndürülür. Bir hata oluşursa, hata durumuna ek olarak aşağıdaki alanlara sahip bir JSON nesnesi döndürülür:

* hata

Hata tanımlayıcısı.

* mesaj

Bir hata durumunda metin döndürülür.

* parametreler

Bir hata durumunda döndürülen metinde bulunabilecek hatanın ek parametreleri.

> Yanıt örneği

400 (Kötü istek)

Content-Type: application/json
```json
{
 "err": "E_INVALIDWALLET",
 "msg": "Wallet 1234-5678-9012-3444-3488 is not valid",
 "params": ["1234-5678-9012-3444-3488"]
}
```

### Hata listesi

> E_CONTRACT

`%s` kontratı mevcut değil

> E_DBNIL

Boş database

> E_DELETEDKEY

Hesap adresi askıya alındı

> E_ECOSYSTEM

Ekosistem "%d" mevcut değil

> E_EMPTYPUBLIC

Hesap için geçersiz public key

> E_KEYNOTFOUND

Hesap adresi bulunamadı

> E_HASHWRONG

Yanlış hash

> E_HASHNOTFOUND

Hash bulunamadı

> E_HEAVYPAGE

Çok fazla sayfa yüklendi

> E_INVALIDWALLET

Geçersiz cüzdan adresi "%s" 

> E_LIMITTXSIZE

Limit dışı bir işlemin boyutu

> E_NOTFOUND

Sayfa veya menü içeriği bulunamadı

> E_PARAMNOTFOUND

Parametre bulunamadı

> E_PERMISSION

İzin yok

> E_QUERY

Veritabanı sorgu hatası

> E_RECOVERED

API'de panik hatası var.
Panik hatası varsa bir hata döndürün.
Bulunması ve düzeltilmesi gereken bir hatayla karşılaştığınız anlamına gelir.

> E_SERVER

Server hatası.
golang library işlevinde bir hata varsa, geri döner. Mesaj alanı, bir hata durumunda döndürülen metni içerir.

Herhangi bir komuta yanıt olarak bir **E_SERVER** hatası oluşabilir. Hatalı giriş parametreleri nedeniyle oluşursa, bunu ilgili bir hatayla değiştirebilirsiniz. Başka bir durumda, bu hata, daha ayrıntılı bir araştırma raporu gerektiren geçersiz işlem veya yanlış sistem yapılandırması bildirir.

> E_SIGNATURE

Yanlış imza

> E_STATELOGIN

`%s` ekosisteminin bir üyesi değil

> E_TABLENOTFOUND

`%s` tablosu bulunamadı

> E_TOKENEXPIRED

`%s` oturumunun süresi doldu

> E_UNAUTHORIZED

Yetkisiz.

Giriş yapılmadıysa veya oturumun süresi dolduysa, `getuid, login` dışında herhangi bir komut
E_UNAUTHORIZED error.

> E_UNKNOWNUID
Unknown UID

> E_UPDATING

Düğüm blok zincirini güncelliyor

> E_STOPPING

Düğüm Durdu

> E_NOTIMPLEMENTED

Henüz uygulanmadı

> E_BANNED

Hesap adresi `%s` içinde yasaklandı

> E_CHECKROLE

Erişim reddedildi

## API'ler CLB tarafından kullanılamıyor
CLB düğümü için arabirim isteği kullanılamıyor:
* metrics
* txinfo
* txinfoMultiple
* appparam
* appparams
* appcontent
* history
* balance
* block
* maxblockid
* blocks
* detailed blocks
* ecosystemparams
* systemparams
* ecosystems
* ecosystemparam
* ecosystemname
* walletHistory
* tx_record

## Kimlik doğrulama
Kimlik doğrulama için [JWT token](#https://jwt.io/) kullanılır. JWT belirtecini aldıktan sonra, her istek başlığına yerleştirilmelidir: `Yetkilendirme: Taşıyıcı TOKEN_HERE`.

### getuid
GET/ benzersiz bir değer döndürür, özel anahtarla imzalar ve ardından [login](#login) komutunu kullanarak sunucuya geri gönderir.

Geçici bir JWT belirteci oluşturmak için, **login** çağrılırken belirteci **Yetkilendirme**'ye iletmeniz gerekir.

#### İstek
> GET /api/v2/getuid

#### Cevap

* uid

İmza numaraları.

* token

Oturum açma sırasında geçici belirteç iletildi.

Geçici bir tokenın ömrü 5 saniyedir.

* network_id

 Sunucu identifier.

 Yetkilendirme gerekli değilse, aşağıdaki bilgiler iade edilecektir:

* expire

 Son kullanma süresi.

* ecosystem

 Ecosystem ID.

* key_id

 Hesap adresi.

* address

 Cüzdan adresi `XXXX-XXXX-.....-XXXX`.

#### Cevap example

200 (OK)

Content-Type: application/json

```json
{
    "uid": "4999317241855959593",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE",
    "network_id": "4717243765193692211"
}
```

#### Hatalı Cevap
E_SERVER

### Giriş
POST/ Kullanıcı kimliğinin doğrulanması.

Benzersiz bir değer almak ve imzalamak için önce **getuid** komutu çağrılmalıdır. Getuid'in geçici JWT belirtecinin istek başlığında iletilmesi gerekir.

İstek başarılı olursa yanıtta alınan belirteç **Yetkilendirme**'ye dahil edilir.

#### İstek
> POST /api/v2/login

* [ecosystem]

 Ecosystem ID.

 Belirtilmezse, varsayılan olarak ilk ekosistemin kimliği.

* [expire]

JWT tokenın ömrü, saniye cinsinden varsayılan olarak 28800.

* [pubkey]

 Hesabın onaltılık sistemde public keyi.

* [key_id]

 Hesap adresi `XXXX-...-XXXX`.

 Public key blok zincirinde zaten depolanmışsa bu parametreyi kullanın. pubkey parametresi ile aynı anda kullanılamaz.

* signature

 Getuid aracılığıyla alınan UID imzası.

#### Cevap
* token

    JWT token.

* ecosystem

    Ecosystem ID.

* key_id

    Hesap adres ID

* address

    Cüzdan adresi `XXXX-XXXX-.....-XXXX`.

* notify_key

    Bildirim ID.

* isnode

   Hesap adresinin düğümün sahibi olup olmadığı. Değer: `true, false`.

* isowner

    Hesap adresinin ekosistemin yaratıcısı olup olmadığı. Değer: `doğru, yanlış`.

* obs

    Kayıtlı ekosistemin CLB olup olmadığı. Değer: `doğru, yanlış`.

#### Cevap example

200 (OK)

Content-Type: application/json

```json
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........AHDRDqDFBoWEHw-9lfIcLobehvNEeIYBB4BIb5J72aQ",
 "ecosystem":"1",
 "key_id":"54321",
 "address": "4321-....-2223"
}
```

#### Hatalı Cevap

E_SERVER, E_UNKNOWNUID, E_SIGNATURE, E_STATELOGIN, E_EMPTYPUBLIC

## Servis komutları
### Versiyon

GET/ Geçerli sunucunun sürümünü döndürür.

Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek
> GET /api/v2/version

#### Cevap example
```
200 (OK)
Content-Type: application/json
"1.2.6"
```

## Veri talebi işlevleri

### Balans

GET/ Mevcut ekosistemdeki hesap adresinin bakiyesini isteyin.

#### İstek

> GET /api/v2/balance/{wallet}

* wallet

Adres tanımlayıcı. Herhangi bir biçimde `int64, uint64, XXXX-...-XXXX` belirtebilirsiniz. Bu adres, kullanıcının şu anda oturum açtığı ekosistemde sorgulanacaktır.

#### Cevap

* amount

    En küçük birimin hesap bakiyesi.

* money

    Hesap bakiyesi.

#### Cevap example

200 (OK)

Content-Type: application/json

```json
{
 "amount": "877450000000000",
 "money": "877.45"
}
```

#### Hatalı Cevap
E_SERVER, E_INVALIDWALLET

### Bloklar
GET/, her bloktaki işlemlerle ilgili ek bilgileri içeren bir liste döndürür.
Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek
> GET /api/v2/blocks
* block_id

Sorgulanacak başlangıç ​​bloğunun yüksekliği.

* count

blok sayısı

#### Cevap

* Block Height

    Bloktaki işlemlerin listesi ve her işlemin ek bilgileri:
    * hash

        İşlem hash.
    * contract_name

        Kontrat Adı.
    * params

        Bir dizi sözleşme parametresi.
    * key_id

        İlk blok için, işlemi imzalayan ilk bloğun hesap adresi.
        Diğer tüm bloklar için, işlemi imzalayan hesabın adresi.
#### Cevap Örneği
```
200 (OK)
Content-Type: application/json
{"1":
 [{"hash":"O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=",
 "contract_name":"",
 "params":null,
 "key_id":-118432674655542910}]
}
```

#### Hatalı Cevap 

E_SERVER, E_NOTFOUND

### Detaylı bloklar

GET/, her bloktaki işlemlerle ilgili ayrıntılı ek bilgileri içeren bir liste döndürür.

Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek
> GET /api/v2/detailed_blocks

#### Cevap 
* Blok Height
    * Başlık bloğu

        Blok başlığı aşağıdaki alanları içerir:
        * block_id

            Block height.
        * time

            Blok oluşturma timestamp.
        * key_id

            Bloğu imzalayan hesabın adresi.
        * node_position

            Honor node listesinde bloğu oluşturan node konumu.
        * version

            Blok yapısı sürümü.
    * hash

        Blok hash.
    * node_position

        Honor node listesinde bloğu oluşturan node konumu.
    * key_id

        Bloğu imzalayan hesabın adresi.
    * time

        Blok oluşturma timestamp.
    * tx_count

        Bloktaki işlem sayısı.
    * rollback_hash

        Block rollback hash.
    * mrkl_root

        Blok işlemlerinin Merkel ağacı.
    * bin_data

        Blok başlığının, bloktaki tüm işlemlerin, önceki blok hashinin ve bloğu oluşturan düğümün özel anahtarının serileştirilmesi.
    * sys_update

       Blok, sistem parametrelerini güncellemek için işlemler içeriyor mu?
    * Transaction

        Bloktaki işlemlerin listesi ve her işlemin ek bilgileri:
        * hash

            İşlem hash.
        * contract_name

            Kontrat adı.
        * params

            Kontrat parametreleri.
        * key_id

            İşlemi imzalayan hesabın adresi.
        * time

            İşlem oluşturma timestamp.
        * type

            İşlem tipi.

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "1":
    {
        "header":
        {
            "block_id":1,
            "time":1551069320,
            "ecosystem_id":0,
            "key_id":-118432674655542910,
            "node_position":0,
            "version":1
        },
        "hash":"3NxhvswmpGvRdw8HdkrniI5Mx/q14Z4d5hwGKMp6KHI=",
        "ecosystem_id":0,
        "node_position":0,
        "key_id":-118432674655542910,
        "time":1551069320,
        "tx_count":1,
        "rollbacks_hash":"I2JHugpbdMNxBdNW1Uc0XnbiXFtzB74yD9AK5YI5i/k=",
        "mrkl_root":"MTZiMjY2NGJjOWY3MDAyODlhYjkyMDVhZDQwNDgxNzkxMjY1MWJjNjczNDkyZjk5MWI2Y2JkMjAxNTIwYjUyYg==",
        "bin_data":null,
        "sys_update":false,
        "gen_block":false,
        "stop_count":0,
        "transactions":[{
            "hash":"O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=","contract_name":"",
            "params":null,
            "key_id":0,
            "time":0,
            "type":0
        }]
    }
}
```
#### Hatalı Cevap 
E_SERVER, E_NOTFOUND

### <span id = "data-table-id-column-hash">/data/{table}/{id}/{column}/{hash}</span>
GET/ Belirtilen hash, belirtilen tablo, alan ve kayıttaki verilerle eşleşirse, bu istek verileri döndürür. Aksi takdirde, bir hata döndürülür.

Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek
> GET /data/{table}/{id}/{column}/{hash}

* table

    Tablo ismi.
* id

    Kayıt ID.
* column

    Alan adı.
* hash

    İstenen verilerin hash'i.

#### Cevap 
Ikili veri

### keyinfo
GET/, belirtilen adrese kayıtlı roller de dahil olmak üzere bir ekosistem listesi döndürür.
Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek
> GET /api/v2/keyinfo/{key_id}

* key_id

    Adres tanımlayıcı, herhangi bir biçimde `int64, uint64, XXXX-...-XXXX` şeklinde belirtebilirsiniz.

    Tüm ekosistemlerde sorgulanan istek.
#### Cevap 
* ecosystem

    Ecosystem ID.
* name

    ekosistem adı.
* roles

    Kimlik ve ad alanlarına sahip roller listesi.
#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Admin"},{"id":"2","name":"Developer"}]
}]
```
#### Hatalı Cevap 
E_SERVER, E_INVALIDWALLET

## Metrikleri al

### keys

GET/ Hesap adreslerinin sayısını verir.

#### İstek

> GET /api/v2/metrics/keys

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "count": 28
}
```

### blocks
GET/ Blok sayısını verir.

#### İstek
> GET /api/v2/metrics/blocks

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
 "count": 28
}
```

### İşlemler
GET/ Toplam işlem sayısını verir.

#### İstek
> GET /api/v2/metrics/transactions

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
 "count": 28
}
```
### Ekosistemler
GET/ Ekosistemlerin sayısını verir.

#### İstek
> GET /api/v2/metrics/ecosystems

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "count": 28
}
```

### fullnodes
GET/, honor node sayısını döndürür.

> GET /api/v2/metrics/fullnodes

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "count": 28
}
```

## Ekosistem
### ecosystemname

GET/, tanımlayıcısına göre ekosistemin adını döndürür.
Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek
> GET /api/v2/ecosystemname?id=..

* id

    Ekosistem ID.

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "ecosystem_name": "platform_ecosystem"
}
```

#### Hatalı Cevap 

E_PARAMNOTFOUND

### ecosystems
GET/ Ekosistemlerin sayısını verir.

> GET /api/v2/ecosystems/

#### Cevap 
* number

 Kurulan ekosistemlerin sayısı.

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "number": 100,
}
```

### <span id = "appparams-appid">appparams/{appID}</span>
GET/ Geçerli veya belirtilen ekosistemdeki uygulama parametrelerinin bir listesini döndürür.

#### İstek
> GET /api/v2/appparams

* [appid]

    Application ID.
* [ecosystem]

    Ecosystem ID. Belirtilmezse, mevcut ekosistemin parametreleri döndürülür.
* [names]

    Alınan parametrelerin listesi.
    Virgülle ayrılmış parametre adlarının listesini belirleyebilirsiniz. Örneğin: `/api/v2/appparams/1?names=name,mypar`.
#### Cevap 
* list
  
    Each element in the array contains the following parameters:
    * name, parameter name;
    * value, parameter value;
    * conditions, permission to change parameters.

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "list": [{
        "name": "name",
        "value": "MyState",
        "conditions": "true",
    },
    {
        "name": "mypar",
        "value": "My value",
        "conditions": "true",
    },
    ]
}
```

#### Hatalı Cevap 
E_ECOSYSTEM

### <span id = "appparam-appid-name">appparam/{appid}/{name}</span>
GET/ Geçerli veya belirtilen ekosistemdeki {appid} uygulamasının {name} parametresiyle ilgili bilgileri döndürür.

#### İstek
> GET /api/v2/appparam/{appid}/{name}[?ecosystem=1]

* appid

    Uygulama ID.
* name

    İstenen parametrenin adı.
* [ecosystem]

    Ekosistem Kimliği (isteğe bağlı parametre).
    Varsayılan olarak mevcut ekosistemi döndürür.
#### Cevap 

* id

    Parametre ID.
* name

    Parametre adı.
* value

    Parametre değeri.
* conditions

    Parametreleri değiştirme izni.

#### Cevap Örneği
200 (OK)
Content-Type: application/json

```json
{
    "id": "10",
    "name": "par",
    "value": "My value",
    "conditions": "true"
}
```
#### Hatalı Cevap 
E_ECOSYSTEM, E_PARAMNOTFOUND

### ecosystemparams
GET/ Ekosistem parametrelerinin listesini döndürür.

#### İstek
> GET /api/v2/ecosystemparams/[?ecosystem=...&names=...]

* [ecosystem]

    Ekosistem ID. Belirtilmezse mevcut ekosistem kimliği döndürülür.

* [names]
    Virgülle ayrılmış istek parametrelerinin listesi.
    Örnek `/api/v2/ecosystemparams/?names=name,currency,logo*`.

#### Cevap 
* list

    Dizideki her öğe aşağıdaki parametreleri içerir:
* name

    Parametre adı.
* value

    Parametre değeri.
* conditions

    Parametreleri değiştirme izni.

#### Cevap Örneği
200 (OK)
Content-Type: application/json

```json
{
    "list": [{
            "name": "name",
            "value": "MyState",
            "conditions": "true",
        },
        {
        "name": "currency",
        "value": "MY",
        "conditions": "true",
        },
    ]
}
```
#### Hatalı Cevap 
E_ECOSYSTEM

### <span id = "ecosystemparam-name">ecosystemparam/{name}</span>

GET/ Geçerli veya belirtilen ekosistemdeki {name} parametresiyle ilgili bilgileri döndürür.

#### İstek
> GET /api/v2/ecosystemparam/{name}[?ecosystem=1]
* name

    İstek parametresinin adı.
* [ecosystem]

    Ekosistem kimliğini belirtebilirsiniz. Varsayılan olarak, mevcut ekosistem id döndürülür.
#### Cevap 
* name

    Parametre adı.
* value

    Parametre değeri.
* conditions

    Parametreleri değiştirme izni.

#### Cevap Örneği
200 (OK)
Content-Type: application/json

```json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
}
```

#### Hatalı Cevap 
E_ECOSYSTEM

### <span id = "tables-limit-offset">tables/[?limit=…&offset=…]</span>

GET/ Ofseti ve giriş sayısını ayarlayabileceğiniz mevcut ekosistemin tablolarının listesini döndürür.

#### İstek
* [limit]

    Giriş sayısı, varsayılan olarak 25.
* [offset]

    Ofset, varsayılan olarak 0.
> GET /api/v2/tables

#### Cevap 
* count

    Tablodaki toplam girişler.
* list

    Dizideki her öğe aşağıdaki parametreleri içerir:
* name

    Ön eki olmayan tablo adı.
* count

    Tablodaki giriş sayısı.

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "count": "100"
    "list": [{
            "name": "accounts",
            "count": "10",
        },
        {
            "name": "citizens",
            "count": "5",
        },
    ]
}
```

### <span id = "table-name">table/{name}</span>
GET/ Mevcut ekosistem tarafından istenen tabloyla ilgili bilgileri döndürür.
Aşağıdaki alan bilgilerini döndürür:

* name

    Tablo ismi.
* insert

    Yeni girişler ekleme izni.
* new_column

    Yeni alanlar ekleme izni.
* update

    Girişleri değiştirme izni.
* columns

    Alanla ilgili bir dizi bilgi:
* name

    Alan adı.
* type

    Alan veri türü.
* perm

    Bu alanın değerini değiştirme izni.

#### İstek
> GET /api/v2/table/mytable

* name

    Ekosistem ön eki olmayan tablo adı.
#### Cevap 
* name

    Ekosistem ön eki olmayan tablo adı.
* insert

    Yeni girişler ekleme izni.
* new_column

    Yeni alanlar ekleme izni.
* update

    Girişleri değiştirme izni.
* conditions

    Tablo yapılandırmasını değiştirme izni.
* columns

    Alanla ilgili bir dizi bilgi:
* name

    Alan adı.
* type

    Alan veri türü.
* perm

    Bu alanın değerini değiştirme izni.
#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "name": "mytable",
    "insert": "ContractConditions(`MainCondition`)",
    "new_column": "ContractConditions(`MainCondition`)",
    "update": "ContractConditions(`MainCondition`)",
    "conditions": "ContractConditions(`MainCondition`)",
    "columns": [{
        "name": "mynum", 
        "type": "number", 
        "perm":"ContractConditions(`MainCondition`)" 
        },
        {"name": "mytext", 
        "type": "text", 
        "perm":"ContractConditions(`MainCondition`)" 
        }
    ]
}
```

#### Hatalı Cevap 
E_TABLENOTFOUND

### <span id = "list-name-limit-offset-colums">list/{name}[?limit=…&offset=…&columns=…]</span>

GET/ Geçerli ekosistemdeki belirtilen tablo girişlerinin listesini ve girişlerin ofsetini ve sayısını ayarlayabileceğiniz yeri döndürür.

#### İstek

* name

    Tablo adı.
* [limit]

    Giriş sayısı, varsayılan olarak 25'tir.
* [offset]

    Offset, 0 by default.
* [columns]

    İstenen sütunların virgülle ayrılmış listesi. Belirtilmezse, tüm sütunlar döndürülür. Çağrı durumlarında, id sütunu döndürülür.
> GET /api/v2/list/mytable?columns=name

#### Cevap 

* count

    Toplam girişler.
* list

    Dizideki her öğe aşağıdaki parametreleri içerir:
* id

    Entry ID.
    İstenen sütunların sırası.

#### Cevap Örneği

200 (OK)

Content-Type: application/json


```json
{
    "count": "10",
    "list": [{
        "id": "1",
        "name": "John",
    },
    {
        "id": "2",
        "name": "Mark",
    },
    ]
}
```

### <span id = "sections-limit-offset-lang">sections[?limit=…&offset=…&lang=]</span>

GET/ Mevcut ekosistemin tablo bölümlerindeki girişlerin listesini ve girişlerin ofset ve sayısının ayarlanabileceği yeri döndürür.

role_access alanı bir roller listesi içeriyorsa ve mevcut rolü içermiyorsa, hiçbir kayıt döndürülmez. Başlık alanındaki veriler, istek başlığındaki Kabul Et-Dil dil kaynağı ile değiştirilecektir.

#### İstek

* [limit]

    Giriş sayısı, varsayılan olarak 25.
* [offset]

    Offset, 0 by default.
* [lang]

    Bu alan, dil kaynaklarını veya yerelleştirme kodunu belirtir, örneğin: en, zh. Belirtilen dil kaynakları bulamazsanız, örneğin: en-US, o zaman en dil kaynakları grubunda arama yapın.

> GET /api/v2/sections

#### Cevap 

* count

    Tablo bölümlerindeki toplam giriş sayısı.
* list

    Dizideki her öğe, tablo bölümlerindeki tüm sütunların bilgilerini içerir.

#### Cevap Örneği
200 (OK)
Content-Type: application/json

```json
{
    "count": "2",
    "list": [{
        "id": "1",
        "title": "Development",
        "urlpage": "develop",
        ...
        },
    ]
}
```

#### Hatalı Cevap 
E_TABLENOTFOUND

### <span id = "row-name-id-colums">row/{name}/{id}[?columns=]</span>
### 

GET/ Geçerli ekosistemde belirtilen tablonun girişini döndürür. Döndürülecek sütunları belirtebilirsiniz.

#### İstek
* name

    Tablo ismi.
* id

    Giriş ID.
* [columns]

    İstenen sütunların virgülle ayrılmış listesi. Belirtilmezse, tüm sütunlar döndürülür. Her durumda, id sütunu döndürülür.

> GET /api/v2/row/mytable/10?columns=name

#### Cevap 

* value

    İstenen sütunların bir dizi değeri
    * id

    Giriş ID.
    * Sequence of İsteked columns. 

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "values": {
        "id": "10",
        "name": "John",
    }
}
```

#### Hatalı Cevap 
E_NOTFOUND

### systemparams
GET/ Returns the list of platform parameters.

#### İstek
> GET /api/v2/systemparams/[?names=...]

* [names]

    Virgülle ayrılmış bir istek parametreleri listesi. Örneğin, /api/v2/systemparams/?names=max_columns,max_indexes.
#### Cevap 
* list

    Dizideki her öğe aşağıdaki parametreleri içerir:
    * name

        Parametre adı.
* value

    Parametre değeri.
* conditions

    Parametreyi değiştirme izinleri.

#### Cevap Örneği
200 (OK)
Content-Type: application/json

```json
{
    "list": [{
        "name": "max_columns",
        "value": "100",
        "conditions": "ContractAccess("@1UpdateSysParam")",
    },
    {
        "name": "max_indexes",
        "value": "1",
        "conditions": "ContractAccess("@1UpdateSysParam")",
    },
    ]
}
```
#### Hatalı Cevap 
E_PARAMNOTFOUND

### <span id = "history-name-id">history/{name}/{id}</span>
GET/ Geçerli ekosistemde belirtilen tablodaki girişin değişiklik kaydını döndürür.

#### İstek
* name

    Tablo adı.
* id

    Giriş ID.

#### Cevap 
* list

    Öğeleri istenen girişin değiştirilmiş parametrelerini içeren bir dizideki her öğe.

#### Cevap Örneği

200 (OK)

Content-Type: application/json


```json
{
    "list": [{
        "name": "default_page",
        "value": "P(class, Default Ecosystem Page)"
        },
        {
        "menu": "default_menu"
        }
    ]
}
```

### <span id = "interface-page-menu-block-name">interface/{page|menu|block}/{name}</span>
GET/ Geçerli ekosistemin belirtilen tablosundaki (sayfalar, menü veya bloklar) ad alanının girişini döndürür.

> GET /api/v2/interface/page/default_page
#### İstek
* name

    Tabloda belirtilen girdinin adı.
#### Cevap 
* id

    Giriş ID.
* name

    Giriş adı.
* other

    Tablonun diğer sütunları.
#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "id": "1",
    "name": "default_page",
    "value": "P(Page content)",
    "default_menu": "default_menu",
    "validate_count": 1
}
```

#### Hatalı Cevap 
E_QUERY, E_NOTFOUND

## Contract functions

### <span id = "contracts-limit-offset">contracts[?limit=…&offset=…]</span>
GET/ Mevcut ekosistemdeki sözleşmelerin listesini verir ve girişlerin mahsup ve sayısını ayarlayabilir.

#### İstek
* [limit]

    Giriş sayısı, varsayılan olarak 25.
* [offset]

    Ofset, varsayılan olarak 0.
> GET /api/v2/contracts

#### Cevap 
* count

    Toplam giriş sayısı.
* list

    Dizideki her öğe aşağıdaki parametreleri içerir:
    * id

        Kontrat ID.
    * name

        Kontrat adı.
    * value

        Kontrat içeriği.
    * wallet_id

        Kontratı bağlı hesap adresi.
    * address

        Cüzdan adresi `XXXX-...-XXXX` kontrata bağlı.
    * ecosystem_id

        Kontratı ait olduğu ekosistemin ID.
    * app_id

        Kontratın ait olduğu uygulamanın ID.
    * conditions

        Kontratı değiştirme izinleri.
    * token_id

        Kontrat ücretini ödemek için kullanılan jetonun bulunduğu ekosistemin ID.
#### Cevap Örneği

 200 (OK)

 Content-Type: application/json

 
```json
 {
 "count": "10"
    "list": [{
        "id": "1",
        "name": "MainCondition",
        "token_id":"1",
        "wallet_id":"0",
        "value": "contract MainCondition {
                conditions {
                if(EcosysParam(`founder_account`)!=$key_id)
                {
                    warning `Sorry, you dont have access to this action.`
                }
                }
            }",
            "address":"0000-0000-0000-0000-0000",
            "conditions":"ContractConditions(`MainCondition`)"
        },
    ...
    ]
 }
 ```

### <span id = "contract-name">contract/{name}</span>
GET/ Belirtilen kontratın ilgili bilgilerini döndürür. Varsayılan olarak, kontrat mevcut ekosistemde sorgulanır.

#### İstek
* name

    Kontrat adı.
> GET /api/v2/contract/mycontract

#### Cevap 
* id

    Sanal makinede kontrat ID.
* name

    Ekosistem ID sahip kontrat adı "@1MainCondition".
* state

    Kontratın ait olduğu ekosistemin ID.
* walletid

    Kontrata bağlı hesap adresi.
* tokenid

    Kontrat ücretini ödemek için kullanılan token bulunduğu ekosistemin ID.
* address

    Cüzdan adresi `XXXX-...-XXXX` sözleşmeye bağlı.
* tableid

    Kontrat tablosundaki kontratın giriş ID.
* fields

    Dizi, kontrat veri bölümündeki her parametrenin yapı bilgilerini içerir:
    * name

    Parametre adı.
    * type

    Parametre türü.
    * optional

    Parametre seçeneği, true isteğe bağlı parametre anlamına gelir, false zorunlu parametre anlamına gelir.
#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "fields" : [
    {"name":"amount", "type":"int", "optional": false},
    {"name":"name", "type":"string", "optional": true}
    ],
    "id": 150,
    "name": "@1mycontract",
    "tableid" : 10,
}
```

#### Hatalı Cevap 
E_CONTRACT

### sendTX
POST/ Parametredeki işlemi alın ve işlem kuyruğuna ekleyin. İstek başarıyla yürütülürse, işlem hash döndürülür. Hash ile bloktaki ilgili işlemi elde edebilirsiniz. Bir hata yanıtı oluştuğunda, hash, hata metin mesajına dahil edilir.

#### İstek
* tx_key

    İşlem içeriği. Bu parametre ile herhangi bir isim belirleyebilir ve birden fazla işlem almayı destekleyebilirsiniz.
> POST /api/v2/sendTx
```
Headers:
Content-Type: multipart/form-data
Parameters:
tx1 - transaction 1
txN - transaction N
```

#### Cevap 
* hashes

    Array of transaction hashes:
* tx1

    Hash of transaction 1.
* txN

    Hash of transaction N.

#### Cevap Örneği
200 (OK)
Content-Type: application/json


```json
{
    "hashes": {
    "tx1": "67afbc435634.....",
    "txN": "89ce4498eaf7.....",
}
```
#### Hatalı Cevap 
E_LIMITTXSIZE,*E_BANNED*

### txstatus
POST/ Belirtilen işlem hashinin blok id ve hata mesajını döndürür. Blok id ve hata metin mesajının dönüş değeri boşsa, işlem bloğa dahil edilmemiştir.

#### İstek
* data
    JSON list of transaction hashes.
    ```
    {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
    ```
> POST /api/v2/txstatus/

#### Cevap 
* results
    Veri sözlüğünde, anahtar olarak işlem hash'i, değer olarak işlem detayı.

    hash

    İşlem hash.

    * blockid

    İşlem başarılı bir şekilde yürütülürse blok id döndürülür; işlem gerçekleştirilemezse, blok id 0'dır.
    * result

    $result değişkeni aracılığıyla işlem sonucunu döndürün.
    * errmsg

    İşlem gerçekleştirilemezse, bir hata metin mesajı döndürülür.

#### Cevap Örneği
200 (OK)

Content-Type: application/json


```json
{"results":
    {
        "hash1": {
        "blockid": "3123",
        "result": "",
        },
        "hash2": {
        "blockid": "3124",
        "result": "",
        }
    }
}
```

#### Hatalı Cevap 
E_HASHWRONG, E_HASHNOTFOUND

### <span id = "txinfo-hash">txinfo/{hash}</span>
GET/ Blok kimliği ve onay sayısı da dahil olmak üzere, işlemle ilişkili belirtilen hash bilgilerini döndürür. İsteğe bağlı parametreler belirtilirse, kontrat adı ve ilgili parametreler de döndürülebilir.

#### İstek
* hash

    İşlem hash.
* [contractinfo]

    Ayrıntılı kontrat parametresi tanımlayıcısı. İşlemle ilgili kontrat ayrıntılarını elde etmek için `contractinfo=1` belirtin.
> GET /api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1

#### Cevap 
* blockid

   İşlemin blok id içerir. Değer "0" ise, bu hash ile işlem bulunamaz.
* confirm

    Blok blokidinin onay sayısı.
* data
 
    `contentinfo=1` belirtilirse, sözleşme detayları bu parametreye döndürülecektir.

#### Cevap Örneği
200 (OK)

Content-Type: application/json

```json
{
    "blockid": "9",
    "confirm": 11,
    "data": {
        "block": "9",
        "contract": "@1NewContract",
        "params": {
            "ApplicationId": 1,
            "Conditions": "true",
            "Value": "contract crashci4b {\n\t\t\tdata {}\n\t\t}"
        }
    }
}
```

#### Hatalı Cevap 
E_HASHWRONG

### txinfoMultiple/
GET/ Bir işlemle ilgili olarak belirtilen hash bilgilerini döndürür.

#### İstek
* hash

    İşlem hashlerinin listesi.
* [contractinfo]

    Ayrıntılı kontrat parametresi tanımlayıcısı. İşlemle ilgili kontrat ayrıntılarını almak için `contractinfo=1` belirtin.
    ```
    {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
    ```
> GET /api/v2/txinfoMultiple/

#### Cevap 
* results

    Veri sözlüğünde, anahtar olarak işlem hash'leri ve değer olarak işlem ayrıntıları.

    doğramak

    İşlem hash.

    blockid

    İşlemi içeren blok kimliği. Değer "0" ise, bu hash ile işlem bulunamaz.

    onaylama

    Blok blokidinin onay sayısı.

    veri

    `contentinfo=1` belirtilirse, sözleşme detayları bu parametreye döndürülecektir.

#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{"results":
    {
        "hash1": {
        "blockid": "3123",
        "confirm": "5",
        },
        "hash2": {
        "blockid": "3124",
        "confirm": "3",
        }
    }
 }
```

#### Hatalı Cevap 
E_HASHWRONG

### <span id = "page-validators_count-name">/page/validators_count/{name}</span>
GET/ Belirtilen sayfayı doğrulamak için gereken düğüm sayısını döndürür.

#### İstek
* name

    Ekosistem id sahip sayfa adı: `@ecosystem_id%%page_name%`. Örneğin, "@1main_page".
> GET /api/v2/page/validators_count/@1page_name

#### Cevap 

* validate_count

    Belirtilen sayfayı doğrulamak için gereken node sayısı

#### Cevap Örneği
```
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

#### Hatalı Cevap 
E_NOTFOUND, E_SERVER

### <span id = "content-menu-page-name">content/menu|page/{name}</span>
POST/ Şablon motoru işlemenin sonucu olan, belirtilen sayfa veya menü adının kodunun JSON nesne ağacını döndürür.

#### İstek
* name

    Sayfa veya menü adı.
> POST /api/v2/content/page/default

#### Cevap 
* menu
 
    İçerik/sayfa/… isteğinde bulunulurken sayfanın menü adı
* menutree

    İçerik/sayfa/... isteğinde bulunulurken sayfa menüsünün bir JSON nesne ağacı
* title–head for the menu content/menu/…

    İçerik/menü/...
* tree

    Bir sayfanın veya menünün JSON nesne ağacı.
#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "tree": {"type":"......",
    "children": [
        {...},
        {...}
    ]
    },
}
```

#### Hatalı Cevap 
E_NOTFOUND

### <span id = "content-source-name">content/source/{name}</span>
POST/ Belirtilen sayfa adı kodunun JSON nesne ağacını döndürür. Herhangi bir işlevi yürütmez veya herhangi bir veri almaz. Döndürülen JSON nesne ağacı, sayfa şablonuna karşılık gelir ve görsel sayfa tasarımcısında kullanılabilir. Sayfa bulunamazsa, 404 hatası döndürülür. İstek """""""

* name

    Sayfa adı.
#### Cevap 

> POST /api/v2/content/source/default

* tree

    Sayfanın bir JSON nesne ağacı.
#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "tree": {"type":"......",
    "children": [
        {...},
        {...}
    ]
    },
}
```

#### Hatalı Cevap 
E_NOTFOUND, E_SERVER

### <span id = "content-hash-name">content/hash/{name}</span>
POST/ Belirtilen sayfa adının SHA256 hashi veya sayfa bulunamazsa 404 hatasını döndürür.

Bu istek için oturum açma yetkisi gerekli değildir. Diğer nodelara istekte bulunurken doğru hash almak için ekosistem, keyID, roleID, isMobile parametrelerini de iletmelisiniz. Diğer ekosistemlerden sayfa almak için, ekosistem idnin sayfa adının önüne eklenmesi gerekir. Örneğin: "@2sayfam".

#### İstek
* name

    Ekosistem id sahip sayfa adı.
* ecosystem

    Ekosistem ID.
* keyID

    Hesap adresi.
* roleID
 
    Rol ID.
* isMobile

    Mobil platformun parametre tanımlayıcısı.
> POST /api/v2/content/hash/default

#### Cevap 
* hex

    Hexadecimal hash.

#### Cevap Örneği
```
200 (OK)
Content-Type: application/json
{
 "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
}
```
#### Hatalı Cevap 
E_NOTFOUND, E_SERVER, E_HEAVYPAGE

### İçerik
POST/ Şablon parametresinden sayfa kodunu döndüren JSON nesnelerinin sayısı. İsteğe bağlı parametre kaynağı "true" veya "1" olarak belirtilirse, JSON nesne ağacı alınan herhangi bir işlevi ve veriyi yürütmez. JSON nesne ağacı, görsel sayfa tasarımcısında kullanılabilir.

Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek
* template

    Sayfa kodu.
* [source]

    `true` veya `1` olarak belirtilirse, JSON nesne ağacı, alınan herhangi bir işlevi ve veriyi yürütmez.
> POST /api/v2/content

#### Cevap 

* tree

    JSON nesne ağacı.
#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "tree": {"type":"......",
    "children": [
        {...},
        {...}
    ]
    },
}
```

#### Hatalı Cevap 
E_NOTFOUND, E_SERVER

### maxblockid
GET/ Geçerli nodedaki en yüksek bloğun idsini döndürür.

Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek

> GET /api/v2/maxblockid

#### Cevap 
* max_block_id

    Geçerli nodedaki en yüksek bloğun id.
#### Cevap Örneği

200 (OK)

Content-Type: application/json

```json
{
    "max_block_id" : 341,
}
```
#### Hatalı Cevap 
E_NOTFOUND

### <span id = "block-id">block/{id}</span>
GET/ Belirtilen ID ile bloğun ilgili bilgilerini döndürür.

Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek
* id
    Block ID.
> POST /api/v2/block/32

#### Cevap
* hash

    Hash of the block.
* key_id

    Bloğu imzalayan hesabın adresi.
* time

    Block generation timestamp.
* tx_count

    Bloktaki toplam işlem sayısı.
* rollbacks_hash

    Hash for block rollback.
* node_position

    Honor node listesinde bloğun konumu.

#### Cevap example

200 (OK)

Content-Type: application/json

```json
{
    "hash": "1x4S5s/zNUTopP2YK43SppEyvT2O4DW5OHSpQfp5Tek=",
    "key_id": -118432674655542910,
    "time": 1551145365,
    "tx_count": 3,
    "rollbacks_hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "node_position": 0,
}
```

#### Hatalı Cevap
E_NOTFOUND


### <span id = "avatar-ecosystem-member">avatar/{ecosystem}/{member}</span>
GET/ Üye tablosundaki kullanıcının avatarını döndürür (oturum açmadan kullanabilirsiniz).

#### İstek
* ecosystem

    Ekosistem ID.
* member

    Kullanıcının hesap adresi.
> GET /api/v2/avatar/1/-118432674655542910

#### Cevap
İçerik Tipi istek başlığının türü resimdir ve resim verileri yanıt gövdesinde döndürülür.

#### Cevap example
```
200 (OK)
Content-Type: image/png
```

#### Hatalı Cevap
E_NOTFOUND E_SERVER

### <span id = "config-centrifugo">config/centrifugo</span>
GET/ Centrifugo ana bilgisayar adresini ve portunu döndürür.
Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek
> GET /api/v2/config/centrifugo

#### Cevap
Yanıt biçimi `http://adres:port` şeklindedir, örneğin: `http://127.0.0.1:8100`.

#### Hatalı Cevap
E_SERVER

### updnotificator
POST/ Henüz gönderilmemiş tüm mesajları centrifugo bildirim hizmetine gönderin. Yalnızca belirtilen ekosistemler ve üyeler için mesaj gönderin.

Bu istek için oturum açma yetkisi gerekli değildir.

#### İstek
* id

    Üye hesap adresi. 
* ecosystem

    Ekosistem ID.
> POST /api/v2/updnotificator

#### Cevap example

200 (OK)

Content-Type: application/json

```json
{
    "result": true
}
```