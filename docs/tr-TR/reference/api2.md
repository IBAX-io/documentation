# RESTful API v2 {#restful-api-v2}

Kimlik doğrulama, ekosistem veri alımı, hata işleme, veritabanı tablosu işlemleri, sayfalar ve sözleşmelerin uygulanması dahil olmak üzere Weaver tarafından sağlanan tüm işlevler, IBAX'in REST API'si kullanılarak kullanılabilir.

REST API ile geliştiriciler, Weaver kullanmadan tüm platform işlevlerine erişebilir.

API komut çağrıları, `/api/v2/command/[param]` adresiyle yürütülür; burada "komut" komut adıdır ve "param" ek bir parametredir. İstek parametreleri 'Content-Type: x-www-form-urlencoded' formatında gönderilmelidir. Sunucu yanıtı sonucu JSON biçimindedir.


<!-- TOC -->

* [Kimlik doğrulama](#error-response-handling)
    * [Error list](#error-list)
* [Request Type](#request-type)
* [Authentication Interface](#authentication-interface)
    * [getuid](#getuid)
    * [Giriş](#login)
* [Servis komutları](#server-side-command-interface)
    * [Versiyon](#version)

* [Veri talebi işlevleri](#data-request-function-interface)
    * [Balans](#balance)
    * [Bloklar](#blocks)
    * [Detaylı bloklar](#detailed-blocks)
    * [/data/{id}/data/{hash}](#data-id-data-hash)
    * [/data/{table}/{id}/{column}/{hash}](#data-table-id-column-hash)
    * [keyinfo](#keyinfo)

    * [Metrikleri al](#wallethistory)
    * [listWhere/{name}](#listwhere-name)
    * [nodelistWhere/{name}](#nodelistwhere-name)
* [Get Metrics Interface](#get-metrics-interface)
    * [keys](#metrics-keys)
    * [blocks](#metrics-blocks)
    * [işlemler](#metrics-transactions)
    * [ekosistemler](#metrics-ecosystems)
    * [fullnodes](#metrics-honornodes)

* [Ekosistem](#ecosystem-interface)
    * [ekosistemadı](#ecosystemname)
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
    * [interface/{page|menu|snippet}/{name}](#interface-page-menu-snippet-name)

* [Contract functions](#contract-function-interface)
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

<!-- /TOC -->

## Hata yönetimi {#error-response-handling}

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

### Hata listesi {#error-list}

> `E_CONTRACT`

`%s` kontratı mevcut değil

> `E_DBNIL`

Boş database

> `E_DELETEDKEY`

Hesap adresi askıya alındı

> `E_ECOSYSTEM`

Ekosistem "%d" mevcut değil

> `E_EMPTYPUBLIC`

Hesap için geçersiz public key

> `E_KEYNOTFOUND`

Hesap adresi bulunamadı

> `E_HASHWRONG`

Yanlış hash

> `E_HASHNOTFOUND`

Hash bulunamadı

> `E_HEAVYPAGE`

Çok fazla sayfa yüklendi

> `E_INVALIDWALLET`

Geçersiz cüzdan adresi "%s" 

> `E_LIMITTXSIZE`

Limit dışı bir işlemin boyutu

> `E_NOTFOUND`

Sayfa veya menü içeriği bulunamadı

> `E_PARAMNOTFOUND`

Parametre bulunamadı

> `E_PERMISSION`

İzin yok

> `E_QUERY`

Veritabanı sorgu hatası

> `E_RECOVERED`

API'de panik hatası var.
Panik hatası varsa bir hata döndürün.
Bulunması ve düzeltilmesi gereken bir hatayla karşılaştığınız anlamına gelir.

> `E_SERVER`

Server hatası.
golang library işlevinde bir hata varsa, geri döner. Mesaj alanı, bir hata durumunda döndürülen metni içerir.

Herhangi bir komuta yanıt olarak bir **E_SERVER** hatası oluşabilir. Hatalı giriş parametreleri nedeniyle oluşursa, bunu ilgili bir hatayla değiştirebilirsiniz. Başka bir durumda, bu hata, daha ayrıntılı bir araştırma raporu gerektiren geçersiz işlem veya yanlış sistem yapılandırması bildirir.

> `E_SIGNATURE`

Yanlış imza

> `E_STATELOGIN`

`%s` ekosisteminin bir üyesi değil

> `E_TABLENOTFOUND`

`%s` tablosu bulunamadı

> `E_TOKENEXPIRED`

`%s` oturumunun süresi doldu

> `E_UNAUTHORIZED`

Yetkisiz.

Giriş yapılmadıysa veya oturumun süresi dolduysa, `getuid, login` dışında herhangi bir komut
E_UNAUTHORIZED error.

> `E_UNKNOWNUID`
Unknown UID

> `E_UPDATING`

Düğüm blok zincirini güncelliyor

> `E_STOPPING`

Düğüm Durdu

> `E_NOTIMPLEMENTED`

Henüz uygulanmadı

> `E_BANNED`

Hesap adresi `%s` içinde yasaklandı

> `E_CHECKROLE`

Erişim reddedildi

> API'ler CLB tarafından kullanılamıyor CLB düğümü için arabirim isteği kullanılamıyor:
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
## Request Type {#request-type}
**Uniform use** 
- application/x-www-form-urlencoded

## Authentication Interface {#authentication-interface}

[JWT token](https://jwt.io)
Used for authentication. The JWT token must be placed in each request header after it is received: `Authorization: Bearer TOKEN_HERE`.

### getuid {#getuid}

**GET**/ returns a unique value, signs it with the private key, and then uses
The [login](#login) command sends it back to the server.

Generate a temporary JWT token that needs to be passed to **Authorization** when calling **login**.
 
**Request**

``` text
GET
/api/v2/getuid
```

**Response**

- `uid`

    > Signature number.

- `token`

    > The temporary token passed during login.
    >
    > The life cycle of a temporary token is 5 seconds.

- `network_id`

    > Server identifier.

- `cryptoer`

    > Elliptic curve algorithm.

- `hasher`

    > hash algorithm.

**Response Example 1**

``` text
200 (OK)
Content-Type: application/json
```json
{
    "uid": "4999317241855959593",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE",
    "network_id": "4717243765193692211"
}
```

In the case that no authorization is required (the request contains **Authorization**), the following message will be returned:

- `expire`

    > Expiration time.

- `ecosystem`

    > Ecosystem ID.

- `key_id`

    > Account address.

- `address`

    > Wallet address `XXXX-XXXX-..... -XXXX`.

- `network_id`

    > Server identifier.

**Response Example 2**

``` text
200 (OK)
Content-Type: application/json
{
    "expire": "2159h59m49.4310543s",
    "ecosystem_id": "1",
    "key_id": "-654321",
    "address": "1196-...... -3496",
    "network_id": "1"
}
```

**Error Response**

*E_SERVER*

### login {#login}

**POST**/ User authentication.

> **getuid** should be called first
> command in order to receive the unique value and sign it. getuid's temporary JWT token needs to be passed in the request header.
>
> If the request is successful, the token received in the response is contained in **Authorization**.

**Request**

``` text
POST
/api/v2/login
```

- `ecosystem`

    > Ecosystem ID.
    >
    > If not specified, defaults to the first ecosystem ID.

- `expire`

    > Lifecycle of the JWT token, in seconds, default is 28800.

- `pubkey`

    > Hexadecimal account public key.

- `key_id`

    > Account address `XXXX-... -XXXX`.
    >
    > Use this parameter if the public key is already stored in the blockchain. It cannot be used with *pubkey*
    > parameters are used together.

- `signature`

    > The uid signature received via getuid.

**Response**

- `token`

    > JWT token.

- `ecosystem_id`

    > Ecosystem ID.

- `key_id`

    > Account Address ID

- `account`

    > Wallet address `XXXX-XXXX-..... -XXXX`.

- `notify_key`

    > Notification ID.

- `isnode`

    > Whether the account address is the owner of the node. Values: `true,false`.

- `isowner`

    > Whether the account address is the creator of the ecosystem. Values: `true,false`.

- `clb`

    > Whether the logged-in ecosystem is CLB. Values: `true,false`.

- `roles` [Omitempty](#omitempty)

    > Role list: `[{Role ID,Role Name}]`.

**Response Example**

```text
200 (OK)
Content-Type: application/json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....30l665h3v7lH85rs5jgk0",
    "ecosystem_id": "1",
    "key_id": "-54321",
    "account": "1285-... -7743-4282",
    "notify_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..... _JTFfheD0K4CfMbvVNpOJVMNDPx25zIDGir9g3ZZM0w",
    "timestamp": "1451309883",
    "roles": [
        {
            "role_id": 1,
            "role_name": "Developer"
        }
    ]
} 
```

**Error Response**

*E_SERVER, E_UNKNOWNUID, E_SIGNATURE, E_STATELOGIN, E_EMPTYPUBLIC*

## Servis komutları {#server-side-command-interface}
### Versiyon {#version}

GET/ Geçerli sunucunun sürümünü döndürür.

Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**
> GET /api/v2/version

**Cevap Örneği**
```
200 (OK)
Content-Type: application/json
"1.2.6"
```

## Veri talebi işlevleri {#data-request-function-interface}

### Balans {#balance}

GET/ Mevcut ekosistemdeki hesap adresinin bakiyesini isteyin.

**İstek**

> GET /api/v2/balance/{wallet}

* wallet

Adres tanımlayıcı. Herhangi bir biçimde `int64, uint64, XXXX-...-XXXX` belirtebilirsiniz. Bu adres, kullanıcının şu anda oturum açtığı ekosistemde sorgulanacaktır.

**Cevap**

* amount

    En küçük birimin hesap bakiyesi.

* money

    Hesap bakiyesi.

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
 "amount": "877450000000000",
 "money": "877.45"
}
```

**Hatalı Cevap**
E_SERVER, E_INVALIDWALLET

### Bloklar {#blocks}
GET/, her bloktaki işlemlerle ilgili ek bilgileri içeren bir liste döndürür.
Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**
> GET /api/v2/blocks
* block_id

Sorgulanacak başlangıç ​​bloğunun yüksekliği.

* count

blok sayısı

**Cevap**

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

**Cevap Örneği**
```text
200 (OK)
Content-Type: application/json
{"1":
 [{"hash":"O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=",
 "contract_name":"",
 "params":null,
 "key_id":-118432674655542910}]
}
```

**Hatalı Cevap** 

E_SERVER, E_NOTFOUND

### Detaylı bloklar {#detailed-blocks}

GET/, her bloktaki işlemlerle ilgili ayrıntılı ek bilgileri içeren bir liste döndürür.

Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**
> GET /api/v2/detailed_blocks

**Cevap** 
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

**Cevap Örneği**

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
**Hatalı Cevap** 

*E_SERVER, E_NOTFOUND*

### /data/{id}/data/{hash} {#data-id-data-hash}

**GET**/ If the specified hash matching the data in the binary watch, field, and records, this request will return the data. Otherwise, return error.

The request does not require login authorization.

**Request**

```text
GET
/data/{id}/data/{hash}
```

- `id`

    > Record ID.

- `hash`

    > Hash request data.

**Response**

> Binary data

**Response Example**

``` text
200 (OK)
Content-Type: *
{
    "name": "NFT Miner",
    "conditions": "ContractConditions(\"@1DeveloperCondition\")",
    "data": [
        {
            "Type": "contracts",
            "Name": "NewNFTMiner",
        },
        ...
    ]
}
```

**Error Response**

*E_SERVER, E_NOTFOUND, E_HASHWRONG*

### /data/{table}/{id}/{column}/{hash} {#data-table-id-column-hash}
GET/ Belirtilen hash, belirtilen tablo, alan ve kayıttaki verilerle eşleşirse, bu istek verileri döndürür. Aksi takdirde, bir hata döndürülür.

Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**
> GET /data/{table}/{id}/{column}/{hash}

- `table`

    Tablo ismi.
- `id`

    Kayıt ID.
- `column`

    Alan adı.
- `hash`

    İstenen verilerin hash'i.

**Cevap** 
Ikili veri

### keyinfo {#keyinfo}
GET/, belirtilen adrese kayıtlı roller de dahil olmak üzere bir ekosistem listesi döndürür.
Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**
> GET /api/v2/keyinfo/{key_id}

* key_id

    Adres tanımlayıcı, herhangi bir biçimde `int64, uint64, XXXX-...-XXXX` şeklinde belirtebilirsiniz.

    Tüm ekosistemlerde sorgulanan istek.
**Cevap** 
- `ecosystem`

    Ecosystem ID.
- `name`

    ekosistem adı.
- `roles`

    Kimlik ve ad alanlarına sahip roller listesi.
**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Governancer"},{"id":"2","name":"Developer"}]
}]
```
**Hatalı Cevap** 

*E_SERVER, E_INVALIDWALLET*
### walletHistory {#wallethistory}
**GET**/ Return to the current account transaction history record, find it according to the ID of the ID

[Authorization](#authorization)

**Request**

- `searchType`

  > Find Type (Income: Turn into Outcom: Turn out all: All, default).

- `page` [Omitempty](#omitempty)
  > Find the number of pages, the first page default, min: 1

- `limit` [Omitempty](#omitempty)

  > Credit number, default 20 articles. min: 1, MAX: 500

``` text
GET
/api/v2/walletHistory?searchType=all&page=1&limit=10
```

**Response**

- `total`

  > Total number of entries.
- `page`

  > Number of current page.

- `limit`

  > Currently find the number of bars.

- `list` Each element in the array contains the following parameters:
    - `id` Stripe ID.
    - `sender_id` Send key_id
    - `sender_add` Send the account address
    - `recipient_id` Accept key_id
    - `recipient_add` Accept the account address
    - `amount` Transaction amount
    - `comment` Trading remarks
    - `block_id` Block height
    - `tx_hash` Trading hash
    - `created_at` Transaction creation time, millisecond time stamp
    - `money` Transaction amount

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "page": 1,
    "limit": 10,
    "total": 617,
    "list": [
        {
            "id": 650,
            "sender_id": 666081971617879...,
            "sender_add": "0666-0819-7161-xxxx-5186",
            "recipient_id": 666081971617879...,
            "recipient_add": "0666-0819-7161-xxxx-5186",
            "amount": "242250000",
            "comment": "taxes for execution of @1Export contract",
            "block_id": 209,
            "tx_hash": "a213bc767d710a223856d83515d53518075b56fb9e9c063bce8a256c20ff0775",
            "created_at": 1666001092090,
            "money": "0.00024225"
        }
        ...
    ]
}  
```

**Error Response**

*E_SERVER*



### listWhere/{name} {#listwhere-name}
**GET**/ Return to the entry of the data table specified in the current ecosystem. You can specify columns to be returned.

[Authorization](#authorization)

**Request**

- `name`

  > Data table name.

-   `limit` [Omitempty](#omitempty)

    > Credit number, default 25.

-   `offset` [Omitempty](#omitempty)

    > Disposal, default to 0.

-   `order` [Omitempty](#omitempty)

    > Sorting method, default `id ASC`.

-   `columns` [Omitempty](#omitempty)

    > The list of request columns is separated by commas. If it is not specified, all columns will be returned. In all cases, the `id` column will be returned.

-   `where` [Omitempty](#omitempty)

    > Query condition
    >
    > Example: If you want to query id> 2 and name = john
    >
    > You can use: where: {"id": {"$ gt": 2}, "name": {"$eq": "john"}}
    >
    > For details, please refer to [DBFind](../ topics/script.md#dbfind) where syntax

``` text
GET
/api/v2/listWhere/mytable
```

**Response**

- `count`

  > Total number of entries.
- `list`
  > Each element in the array contains the following parameters:
  - `id`
    > Stripe ID.
  - `...`
    > Data tables other columns

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 1,
    "list": [
        {
            "account": "xxxx-0819-7161-xxxx-xxxx",
            "ecosystem": "1",
            "id": "12",
            "key": "avatar",
            "value": "{\"binary_id\": 4}"
        }
    ]
}
```

**Error Response**

*E_SERVER*,*E_TABLENOTFOUND*


### nodelistWhere/{name} {#nodelistwhere-name}
**GET**/ Return to the specified data table. You can specify columns to be returned. The type in the data table is **BYTEA** Do hexadecimal encoding processing

[Authorization](#authorization)

**Request**

- `name`

  > Data table name.

-   `limit` [Omitempty](#omitempty)

    > Credit number, default 25.

-   `offset` [Omitempty](#omitempty)

    > Disposal, default to 0.

-   `order` [Omitempty](#omitempty)

    > Sorting method, default `id ASC`.

-   `columns` [Omitempty](#omitempty)

    > The list of request columns is separated by commas. If it is not specified, all columns will be returned. In all cases, the `id` column will be returned.

-   `where` [Omitempty](#omitempty)

    > Query condition
    >
    > Example: If you want to query id> 2 and name = john
    >
    > You can use: where: {"id": {"$ gt": 2}, "name": {"$eq": "john"}}
    >
    > For details, please refer to [DBFind](../ topics/script.md#dbfind) where syntax

``` text
GET
/api/v2/nodelistWhere/mytable
```

**Response**

- `count`

  > Total number of entries.
- `list`
  > Each element in the array contains the following parameters:
    - `id`
      > Stripe ID.
    - `...`
      > Data tables other columns

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 1,
    "list": [
        {
            "account": "xxxx-0819-7161-xxxx-xxxx",
            "ecosystem": "1",
            "id": "12",
            "key": "avatar",
            "value": "{\"binary_id\": 4}"
        }
    ]
}
```

**Error Response**

*E_SERVER*,*E_TABLENOTFOUND*

## Get Metrics Interface {#get-metrics-interface}

### metrics/keys {#metrics-keys}

GET/ Hesap adreslerinin sayısını verir.

**İstek**

> GET /api/v2/metrics/keys

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
    "count": 28
}
```

### metrics/blocks {#metrics-blocks}
GET/ Blok sayısını verir.

**İstek**
> GET /api/v2/metrics/blocks

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
 "count": 28
}
```

### metrics/transactions {#metrics-transactions}
GET/ Toplam işlem sayısını verir.

**İstek**
> GET /api/v2/metrics/transactions

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
 "count": 28
}
```
### metrics/ecosystems {#metrics-ecosystems}
GET/ Ekosistemlerin sayısını verir.

**İstek**
> GET /api/v2/metrics/ecosystems

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
    "count": 28
}
```

### metrics/honornodes {#metrics-honornodes}
**GET**/, honor node sayısını döndürür.

``` 
GET
/api/v2/metrics/honornodes
```

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
    "count": 28
}
```

## Ekosistem {#ecosystem-interface}
### ecosystemname {#ecosystemname}

GET/, tanımlayıcısına göre ekosistemin adını döndürür.
Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**
> GET /api/v2/ecosystemname?id=..

* id

    Ekosistem ID.

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
    "ecosystem_name": "platform_ecosystem"
}
```

**Hatalı Cevap** 

E_PARAMNOTFOUND

### appparams/{appid} {#appparams-appid}
GET/ Geçerli veya belirtilen ekosistemdeki uygulama parametrelerinin bir listesini döndürür.

**İstek**

``` text
GET
/api/v2/appparams/{appid}
```

* `appid`

    Application ID.
* `ecosystem`

    Ecosystem ID. Belirtilmezse, mevcut ekosistemin parametreleri döndürülür.
* `names`

    Alınan parametrelerin listesi.
    Virgülle ayrılmış parametre adlarının listesini belirleyebilirsiniz. Örneğin: `/api/v2/appparams/1?names=name,mypar`.
**Cevap** 
* `list`
  
    Each element in the array contains the following parameters:
    * `name`, parameter name;
    * `value`, parameter value;
    * `conditions`, permission to change parameters.

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
    "list": [{
        "name": "name",
        "value": "MyState",
        "conditions": "true"
    },
    {
        "name": "mypar",
        "value": "My value",
        "conditions": "true"
    }
    ]
}
```

**Hatalı Cevap** 
E_ECOSYSTEM

### appparam/{appid}/{name} {#appparam-appid-name}
GET/ Geçerli veya belirtilen ekosistemdeki {appid} uygulamasının {name} parametresiyle ilgili bilgileri döndürür.

**İstek**

``` text
GET
/api/v2/appparam/{appid}/{name}[?ecosystem=1]
```


* `appid`

    Uygulama ID.
* `name`

    İstenen parametrenin adı.

* `ecosystem` [Omitempty](#omitempty)

    Ekosistem Kimliği (isteğe bağlı parametre).
    Varsayılan olarak mevcut ekosistemi döndürür.
**Cevap** 

* `id`

    Parametre ID.
* `name`

    Parametre adı.
* `value`

    Parametre değeri.
* `conditions`

    Parametreleri değiştirme izni.

**Cevap Örneği**
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
**Hatalı Cevap** 
E_ECOSYSTEM, E_PARAMNOTFOUND

### ecosystemparams {#ecosystemparams}
GET/ Ekosistem parametrelerinin listesini döndürür.

**İstek**
> GET /api/v2/ecosystemparams/[?ecosystem=...&names=...]

* `ecosystem` [Omitempty](#omitempty)

    Ekosistem ID. Belirtilmezse mevcut ekosistem kimliği döndürülür.

* `names` [Omitempty](#omitempty)
    Virgülle ayrılmış istek parametrelerinin listesi.
    Örnek `/api/v2/ecosystemparams/?names=name,currency,logo*`.

**Cevap** 
* `list`

    Dizideki her öğe aşağıdaki parametreleri içerir:
	* `name`

	    Parametre adı.
	* `value`

	    Parametre değeri.
	* `conditions`

	    Parametreleri değiştirme izni.

**Cevap Örneği**
200 (OK)
Content-Type: application/json

```json
{
    "list": [{
            "name": "name",
            "value": "MyState",
            "conditions": "true"
        },
        {
        "name": "currency",
        "value": "MY",
        "conditions": "true"
        }
    ]
}
```
**Hatalı Cevap** 
E_ECOSYSTEM

### ecosystemparam/{name} {#ecosystemparam-name}

GET/ Geçerli veya belirtilen ekosistemdeki {name} parametresiyle ilgili bilgileri döndürür.

**İstek**


``` text
GET
/api/v2/ecosystemparam/{name}[?ecosystem=1]
```
- `name`

    İstek parametresinin adı.

- `ecosystem` [Omitempty](#omitempty)

    Ekosistem kimliğini belirtebilirsiniz. Varsayılan olarak, mevcut ekosistem id döndürülür.
**Cevap** 
- `name`

    Parametre adı.
- `value`

    Parametre değeri.
- `conditions`

    Parametreleri değiştirme izni.

**Cevap Örneği**
200 (OK)
Content-Type: application/json

```json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
}
```

**Hatalı Cevap** 
E_ECOSYSTEM

### tables/\[?limit=\... &offset=\... \] {#tables-limit-offset}

GET/ Ofseti ve giriş sayısını ayarlayabileceğiniz mevcut ekosistemin tablolarının listesini döndürür.

**İstek**

- `limit` [Omitempty](#omitempty)

    Giriş sayısı, varsayılan olarak 25.

- `offset` [Omitempty](#omitempty)

    Ofset, varsayılan olarak 0.

``` text
GET
/api/v2/tables?limit=... &offset=...
```

**Cevap** 
- `count`

    Tablodaki toplam girişler.
- `list`

    Dizideki her öğe aşağıdaki parametreleri içerir:
	* `name`

	    Ön eki olmayan tablo adı.
	* `count`

	    Tablodaki giriş sayısı.

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
    "count": "100",
    "list": [{
            "name": "accounts",
            "count": "10"
        },
        {
            "name": "citizens",
            "count": "5"
        }
    ]
}
```

### table/{name} {#table-name}
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

**İstek**

``` text
GET
/api/v2/table/{table_name}
```

* name

    Ekosistem ön eki olmayan tablo adı.
**Cevap** 
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
**Cevap Örneği**

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

**Hatalı Cevap** 
E_TABLENOTFOUND

### list/{name}\[?limit=\... &offset=\... &columns=\... \] {#list-name-limit-offset-columns}

GET/ Geçerli ekosistemdeki belirtilen tablo girişlerinin listesini ve girişlerin ofsetini ve sayısını ayarlayabileceğiniz yeri döndürür.

**İstek**

* name

    Tablo adı.
* [limit]

    Giriş sayısı, varsayılan olarak 25'tir.
* [offset]

    Offset, 0 by default.
* [columns]

    İstenen sütunların virgülle ayrılmış listesi. Belirtilmezse, tüm sütunlar döndürülür. Çağrı durumlarında, id sütunu döndürülür.
> GET /api/v2/list/mytable?columns=name

**Cevap** 

* count

    Toplam girişler.
* list

    Dizideki her öğe aşağıdaki parametreleri içerir:
* id

    Entry ID.
    İstenen sütunların sırası.

**Cevap Örneği**

200 (OK)

Content-Type: application/json


```json
{
    "count": "10",
    "list": [{
        "id": "1",
        "name": "John"
    },
    {
        "id": "2",
        "name": "Mark"
    }
    ]
}
```

### sections\[?limit=\... &offset=\... &lang=\] {#sections-limit-offset-lang}

GET/ Mevcut ekosistemin tablo bölümlerindeki girişlerin listesini ve girişlerin ofset ve sayısının ayarlanabileceği yeri döndürür.

role_access alanı bir roller listesi içeriyorsa ve mevcut rolü içermiyorsa, hiçbir kayıt döndürülmez. Başlık alanındaki veriler, istek başlığındaki Kabul Et-Dil dil kaynağı ile değiştirilecektir.

**İstek**

* [limit]

    Giriş sayısı, varsayılan olarak 25.
* [offset]

    Offset, 0 by default.
* [lang]

    Bu alan, dil kaynaklarını veya yerelleştirme kodunu belirtir, örneğin: en, zh. Belirtilen dil kaynakları bulamazsanız, örneğin: en-US, o zaman en dil kaynakları grubunda arama yapın.

> GET /api/v2/sections

**Cevap** 

* count

    Tablo bölümlerindeki toplam giriş sayısı.
* list

    Dizideki her öğe, tablo bölümlerindeki tüm sütunların bilgilerini içerir.

**Cevap Örneği**
200 (OK)
Content-Type: application/json

```text
{
    "count": "2",
    "list": [{
        "id": "1",
        "title": "Development",
        "urlpage": "develop",
        ...
        }
    ]
}
```

**Hatalı Cevap** 
E_TABLENOTFOUND

### row/{name}/{id}\[?columns=\] {#row-name-id-columns}

[Authorization](#authorization)

GET/ Geçerli ekosistemde belirtilen tablonun girişini döndürür. Döndürülecek sütunları belirtebilirsiniz.

**İstek**
* name

    Tablo ismi.
* id

    Giriş ID.
* [columns]

    İstenen sütunların virgülle ayrılmış listesi. Belirtilmezse, tüm sütunlar döndürülür. Her durumda, id sütunu döndürülür.

> GET /api/v2/row/mytable/10?columns=name

**Cevap** 

* value

    İstenen sütunların bir dizi değeri
    * id

    Giriş ID.
    * Sequence of İsteked columns. 

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
    "values": {
        "id": "10",
        "name": "John"
    }
}
```

**Error Response**

*E_NOTFOUND*

### row/{name}/{column}/{id} {#row-name-colorn-id}

[Authorization] (#authorization)

**GET**/ Return to the entry of the data table specified in the current ecosystem. You can specify columns to be returned.

**Request**

- `Name`

     > Data table name.

- `colorn`

     > Data list name.

- `ID`

     > Stripe ID.

- `columns` [omitempty] (#omitempty)

     > The list of request lists is separated by commas. If it is not specified, all columns will be returned. In all cases, the ID column will be returned.

```text
GET
/API/V2/ROW/MyTable/name/John? Columns = name
```

**Response**

- `Value`

     > Array of receiving column values
     Forecast
     > - `ID`
     >>
     >>> Strip ID.
     >>
     > - -The sequence of the request column.

**Response Example**

```text
200 (OK)
Content-type: Application/JSON
{{
     "Values": {
     "ID": "10",
     "name": "John",
     }
}
```

**Error Response**

*E_NOTFOUND*

### systemparams {#systemparams}
GET/ Returns the list of platform parameters.

**İstek**

``` text
GET
/api/v2/systemparams/[?names=...]
```

- `names` [Omitempty](#omitempty)

    Virgülle ayrılmış bir istek parametreleri listesi. Örneğin, /api/v2/systemparams/?names=max_columns,max_indexes.
**Cevap** 
- `list`

    Dizideki her öğe aşağıdaki parametreleri içerir:
    * name

        Parametre adı.
    * value

    	Parametre değeri.
    * conditions

    	Parametreyi değiştirme izinleri.

**Cevap Örneği**
200 (OK)
Content-Type: application/json

```text
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
**Hatalı Cevap** 
E_PARAMNOTFOUND

### history/{name}/{id} {#history-name-id}
GET/ Geçerli ekosistemde belirtilen tablodaki girişin değişiklik kaydını döndürür.

**İstek**
* name

    Tablo adı.
* id

    Giriş ID.

**Cevap** 
* list

    Öğeleri istenen girişin değiştirilmiş parametrelerini içeren bir dizideki her öğe.

**Cevap Örneği**

``` text
200 (OK)
Content-Type: application/json
{
    "list": [
        {
            "name": "default_page",
            "value": "P(class, Default Ecosystem Page)"
        },
        {
            "menu": "default_menu"
        }
    ]
}
```

### interface/{page|menu|snippet}/{name} {#interface-page-menu-snippet-name}
GET/ Geçerli ekosistemin belirtilen tablosundaki (sayfalar, menü veya bloklar) ad alanının girişini döndürür.

``` text
GET
/api/v2/interface/page/default_page
/api/v2/interface/menu/default_menu
/api/v2/interface/snippet/welcome
```
**İstek**
- `name`

    Tabloda belirtilen girdinin adı.
**Cevap** 
- `id`

    Giriş ID.
- `name`

    Giriş adı.
- `other`

    Tablonun diğer sütunları.
**Cevap Örneği**

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

**Hatalı Cevap** 
E_QUERY, E_NOTFOUND

## Contract functions {#contract-function-interface}

### contracts\[?limit=\... &offset=\... \] {#contracts-limit-offset}
GET/ Mevcut ekosistemdeki sözleşmelerin listesini verir ve girişlerin mahsup ve sayısını ayarlayabilir.
[Authorization](#authorization)

**İstek**

- `limit` [Omitempty](#omitempty)

    Giriş sayısı, varsayılan olarak 25.

- `offset` [Omitempty](#omitempty)

    Ofset, varsayılan olarak 0.
> GET /api/v2/contracts

**Cevap** 
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

**Cevap Örneği**

``` text
200 (OK)
Content-Type: application/json
{
    "count": "10"
    "list": [{ 
        "id": "1",
        "name": "MainCondition",
        "token_id": "1", 
        "wallet_id": "0", 
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

### contract/{name} {#contract-name}
GET/ Belirtilen kontratın ilgili bilgilerini döndürür. Varsayılan olarak, kontrat mevcut ekosistemde sorgulanır.

**İstek**
- `name`

    Kontrat adı.
> GET /api/v2/contract/mycontract

**Cevap** 
- `id`

    Sanal makinede kontrat ID.
- `name`

    Ekosistem ID sahip kontrat adı "@1MainCondition".
- `state`

    Kontratın ait olduğu ekosistemin ID.
- `walletid`

    Kontrata bağlı hesap adresi.
- `tokenid`

    Kontrat ücretini ödemek için kullanılan token bulunduğu ekosistemin ID.
- `address`

    Cüzdan adresi `XXXX-...-XXXX` sözleşmeye bağlı.
- `tableid`

    Kontrat tablosundaki kontratın giriş ID.
- `fields`

    Dizi, kontrat veri bölümündeki her parametrenin yapı bilgilerini içerir:
    * `name`

    Parametre adı.
    * `type`

    Parametre türü.
    * `optional`

    Parametre seçeneği, true isteğe bağlı parametre anlamına gelir, false zorunlu parametre anlamına gelir.
**Cevap Örneği**

``` text
200 (OK)
Content-Type: application/json
{
    "fields" : [
        {"name": "amount", "type": "int", "optional": false},
        {"name": "name", "type": "string", "optional": true}
    ],
    "id": 150,
    "name":"@1mycontract",
    "tableid" : 10,
} 
```

**Hatalı Cevap** 
E_CONTRACT

### sendTX {#sendtx}
POST/ Parametredeki işlemi alın ve işlem kuyruğuna ekleyin. İstek başarıyla yürütülürse, işlem hash döndürülür. Hash ile bloktaki ilgili işlemi elde edebilirsiniz. Bir hata yanıtı oluştuğunda, hash, hata metin mesajına dahil edilir.
[Authorization](#authorization)

**İstek**
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

**Cevap** 
- `hashes`

    Array of transaction hashes:
* `tx1`

    Hash of transaction 1.
* `txN`

    Hash of transaction N.

**Cevap Örneği**
200 (OK)
Content-Type: application/json


```json
{
    "hashes": {
      "tx1": "67afbc435634.....",
      "txN": "89ce4498eaf7....."
    }
}
```
**Hatalı Cevap** 
E_LIMITTXSIZE,*E_BANNED*

### txstatus {#txstatus}

POST/ Belirtilen işlem hashinin blok id ve hata mesajını döndürür. Blok id ve hata metin mesajının dönüş değeri boşsa, işlem bloğa dahil edilmemiştir.
[Authorization](#authorization)

**İstek**
* data
    JSON list of transaction hashes.
    ```
    {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
    ```
> POST /api/v2/txstatus/

**Cevap** 
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

**Cevap Örneği**
200 (OK)

Content-Type: application/json


```json
{"results":
    {
        "hash1": {
          "blockid": "3123",
          "result": ""
        },
        "hash2": {
          "blockid": "3124",
          "result": ""
        }
    }
}
```

**Hatalı Cevap** 
E_HASHWRONG, E_HASHNOTFOUND

### txinfo/{hash} {#txinfo-hash}
GET/ Blok kimliği ve onay sayısı da dahil olmak üzere, işlemle ilişkili belirtilen hash bilgilerini döndürür. İsteğe bağlı parametreler belirtilirse, kontrat adı ve ilgili parametreler de döndürülebilir.

**İstek**
- `hash`

    İşlem hash.
* [contractinfo]

    Ayrıntılı kontrat parametresi tanımlayıcısı. İşlemle ilgili kontrat ayrıntılarını elde etmek için `contractinfo=1` belirtin.
> GET /api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1

**Cevap** 
* blockid

   İşlemin blok id içerir. Değer "0" ise, bu hash ile işlem bulunamaz.
* confirm

    Blok blokidinin onay sayısı.
* data
 
    `contentinfo=1` belirtilirse, sözleşme detayları bu parametreye döndürülecektir.

**Cevap Örneği**
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

**Hatalı Cevap** 
E_HASHWRONG

### txinfoMultiple {#txinfomultiple}
GET/ Bir işlemle ilgili olarak belirtilen hash bilgilerini döndürür.

**İstek**
* hash

    İşlem hashlerinin listesi.
* [contractinfo]

    Ayrıntılı kontrat parametresi tanımlayıcısı. İşlemle ilgili kontrat ayrıntılarını almak için `contractinfo=1` belirtin.
    ```
    {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
    ```
> GET /api/v2/txinfoMultiple/

**Cevap** 
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

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{"results":
    {
        "hash1": {
          "blockid": "3123",
          "confirm": "5"
        },
        "hash2": {
          "blockid": "3124",
          "confirm": "3"
        }
    }
 }
```

**Hatalı Cevap** 
E_HASHWRONG

### /page/validators_count/{name} {#page-validators-count-name}
GET/ Belirtilen sayfayı doğrulamak için gereken düğüm sayısını döndürür.

**İstek**
* name

    Ekosistem id sahip sayfa adı: `@ecosystem_id%%page_name%`. Örneğin, "@1main_page".
> GET /api/v2/page/validators_count/@1page_name

**Cevap** 

* validate_count

    Belirtilen sayfayı doğrulamak için gereken node sayısı

**Cevap Örneği**
```
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

**Hatalı Cevap** 
E_NOTFOUND, E_SERVER

### content/menu\|page/{name} {#content-menu-page-name}
POST/ Şablon motoru işlemenin sonucu olan, belirtilen sayfa veya menü adının kodunun JSON nesne ağacını döndürür.

**İstek**
* name

    Sayfa veya menü adı.
> POST /api/v2/content/page/default

**Cevap** 
* menu
 
    İçerik/sayfa/… isteğinde bulunulurken sayfanın menü adı
* menutree

    İçerik/sayfa/... isteğinde bulunulurken sayfa menüsünün bir JSON nesne ağacı
* title–head for the menu content/menu/…

    İçerik/menü/...
* tree

    Bir sayfanın veya menünün JSON nesne ağacı.
**Cevap Örneği**

``` text
200 (OK)
Content-Type: application/json
{
    "tree": {"type":"......" , 
          "children": [
               {...} ,
               {...}
          ]
    },
} 
```

**Hatalı Cevap** 
E_NOTFOUND

### content/source/{name} {#content-source-name}
POST/ Belirtilen sayfa adı kodunun JSON nesne ağacını döndürür. Herhangi bir işlevi yürütmez veya herhangi bir veri almaz. Döndürülen JSON nesne ağacı, sayfa şablonuna karşılık gelir ve görsel sayfa tasarımcısında kullanılabilir. Sayfa bulunamazsa, 404 hatası döndürülür. İstek """""""

* name

    Sayfa adı.
**Cevap** 

> POST /api/v2/content/source/default

* tree

    Sayfanın bir JSON nesne ağacı.
**Cevap Örneği**

200 (OK)

Content-Type: application/json

```text
{
    "tree": {"type":"......",
    "children": [
        {...},
        {...}
    ]
    },
}
```

**Hatalı Cevap** 
E_NOTFOUND, E_SERVER

### content/hash/{name} {#content-hash-name}
POST/ Belirtilen sayfa adının SHA256 hashi veya sayfa bulunamazsa 404 hatasını döndürür.

Bu istek için oturum açma yetkisi gerekli değildir. Diğer nodelara istekte bulunurken doğru hash almak için ekosistem, keyID, roleID, isMobile parametrelerini de iletmelisiniz. Diğer ekosistemlerden sayfa almak için, ekosistem idnin sayfa adının önüne eklenmesi gerekir. Örneğin: "@2sayfam".

**İstek**
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

**Cevap** 
* hex

    Hexadecimal hash.

**Cevap Örneği**
```
200 (OK)
Content-Type: application/json
{
    "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
} 
```
**Hatalı Cevap** 
E_NOTFOUND, E_SERVER, E_HEAVYPAGE

### content {#content}
POST/ Şablon parametresinden sayfa kodunu döndüren JSON nesnelerinin sayısı. İsteğe bağlı parametre kaynağı "true" veya "1" olarak belirtilirse, JSON nesne ağacı alınan herhangi bir işlevi ve veriyi yürütmez. JSON nesne ağacı, görsel sayfa tasarımcısında kullanılabilir.

Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**
* template

    Sayfa kodu.
* [source]

    `true` veya `1` olarak belirtilirse, JSON nesne ağacı, alınan herhangi bir işlevi ve veriyi yürütmez.
> POST /api/v2/content

**Cevap** 

* tree

    JSON nesne ağacı.
**Cevap Örneği**

200 (OK)

Content-Type: application/json

```text
{
    "tree": {"type":"......",
    "children": [
        {...},
        {...}
    ]
    },
}
```

**Hatalı Cevap** 
E_NOTFOUND, E_SERVER

### maxblockid {#maxblockid}
GET/ Geçerli nodedaki en yüksek bloğun idsini döndürür.

Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**

> GET /api/v2/maxblockid

**Cevap** 
* max_block_id

    Geçerli nodedaki en yüksek bloğun id.
**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
    "max_block_id" : 341
}
```
**Hatalı Cevap** 
E_NOTFOUND

### block/{id} {#block-id}
GET/ Belirtilen ID ile bloğun ilgili bilgilerini döndürür.

Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**
* id
    Block ID.
> POST /api/v2/block/32

**Cevap**
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

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
    "hash": "1x4S5s/zNUTopP2YK43SppEyvT2O4DW5OHSpQfp5Tek=",
    "key_id": -118432674655542910,
    "time": 1551145365,
    "tx_count": 3,
    "rollbacks_hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "node_position": 0
}
```

**Hatalı Cevap**
E_NOTFOUND


### avatar/{ecosystem}/{member} {#avatar-ecosystem-member}
GET/ Üye tablosundaki kullanıcının avatarını döndürür (oturum açmadan kullanabilirsiniz).

**İstek**
* ecosystem

    Ekosistem ID.
* member

    Kullanıcının hesap adresi.
> GET /api/v2/avatar/1/-118432674655542910

**Cevap**
İçerik Tipi istek başlığının türü resimdir ve resim verileri yanıt gövdesinde döndürülür.

**Cevap Örneği**
```
200 (OK)
Content-Type: image/png
```

**Hatalı Cevap**
E_NOTFOUND E_SERVER

### config/centrifugo {#config-centrifugo}
GET/ Centrifugo ana bilgisayar adresini ve portunu döndürür.
Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**
> GET /api/v2/config/centrifugo

**Cevap**
Yanıt biçimi `http://adres:port` şeklindedir, örneğin: `http://127.0.0.1:8100`.

**Hatalı Cevap**
E_SERVER

### updnotificator {#updnotificator}
POST/ Henüz gönderilmemiş tüm mesajları centrifugo bildirim hizmetine gönderin. Yalnızca belirtilen ekosistemler ve üyeler için mesaj gönderin.

Bu istek için oturum açma yetkisi gerekli değildir.

**İstek**
* id

    Üye hesap adresi. 
* ecosystem

    Ekosistem ID.
> POST /api/v2/updnotificator

**Cevap Örneği**

200 (OK)

Content-Type: application/json

```json
{
    "result": true
}
```

### Special instructions {#special-instructions}

#### Omitempty {#omitempty}
If the field has an omitempty attribute, it means that the field is an optional parameter

#### Authorization {#authorization}
If the interface with Authorization tag, that this interface requires login authorization, add Authorization to the request header, example.

key = Authorization
value = "Bearer + [login token](#login)"

``` text
Authorization Bearer eyJhbGciOiJI..... kBZgGIlPhfXNZJ73RiZtM
```