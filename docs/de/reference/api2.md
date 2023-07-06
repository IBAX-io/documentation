# RESTful API v2 {#restful-api-v2}

AAlle von Weaver bereitgestellten Funktionen, einschließlich Authentifizierung, Empfang von Ökosystemdaten, Fehlerbehandlung, Datenbanktabellenoperationen, Seiten- und Vertragsimplementierung, sind über die REST-API von IBAX verfügbar.

Mit der REST-API können Entwickler auf alle Plattformfunktionen zugreifen, ohne Weaver zu verwenden.

API-Befehlsaufrufe werden durch Adressieren von `/api/v2/command/[param]` ausgeführt, wobei `command` der Befehlsname und `param` ein zusätzlicher Parameter ist. Die Anfrageparameter müssen im Format `Content-Type: x-www-form-urlencoded` gesendet werden. Das Ergebnis der Serverantwort liegt im JSON-Format vor.

<!-- TOC -->

* [Fehlerbehandlung](#error-response-handling)
     * [Fehlerliste](#error-list)
- [Request Type](#request-type)
* [Authentifizierung](#authentication-interface)
     * [getuid](#getuid)
     * [Anmeldung](#login)

* [APIs für CLB nicht verfügbar](#server-side-command-interface)
* [Service commands](#service-commands)
    * [Ausführung](#version)

* [Datenanforderungsfunktionen](#data-request-function-interface)
     * [Guthaben](#balance)
     * [Blöcke](#blocks)
     * [detaillierte Blöcke](#detailed-blocks)
     * [/data/{id}/data/{hash}](#data-id-data-hash)
     * [/data/{table}/id/{column}/{hash}](#data-table-id-column-hash)
     * [Schlüsselinfo](#keyinfo)
     - [walletHistory](#wallethistory)
     - [listWhere/{name}](#listwhere-name)
     - [nodelistWhere/{name}](#nodelistwhere-name)
* [Metriken abrufen](#get-metrics-interface)
     * [Tasten](#metrics-keys)
     * [Blöcke](#metrics-blocks)
     * [Transaktionen](#metrics-transactions)
     * [Ökosysteme](#metrics-ecosystems)
     * [Vollständige Knoten](#metrics-honornodes)

* [Ökosystem](#ökosystem)
     * [Ökosystemname](#ecosystem-interface)
     * [Ökosysteme](#ecosystemname)
     * [appparams/{appID}](#appparams-appid)
     * [appparam/{appid}/{name}](#appparam-appid-name)
     * [Ökosystemparameter](#ecosystemparams)
     * [Ökosystemparam/{Name}](#ecosystemparam-name)
     * [tables/[?limit=…&offset=…]](#tables-limit-offset)
     * [Tabelle/{Name}](#table-name)
     * [list/{name}[?limit=…&offset=…&columns=…]](#list-name-limit-offset-columns)
     * [sections[?limit=…&offset=…&lang=]](#sections-limit-offset-lang)
     * [row/{name}/{id}[?columns=]](#row-name-id-columns)
     * [row/{name}/{column}/{id}](#row-name-column-id)
     * [Systemparameter](#systemparams)
     * [Geschichte/{Name}/{ID}](#history-name-id)
     * [interface/{page|menu|block}/{name}](#interface-page-menu-snippet-name)

* [Vertragsfunktionen](#contract-function-interface)
     * [verträge[?limit=…&offset=…]](#contracts-limit-offset)
     * [Vertrag/{Name}](#contract-name)
     * [sendeTX](#sendtx)
     * [txstatus](#txstatus)
     * [txinfo/{hash}](#txinfo-hash)
     * [txinfoMultiple/](#txinfomultiple)
     * [/page/validators_count/{name}](#page-validators-count-name)
     * [Inhalt/Menü|Seite/{Name}](#content-menu-page-name)
     * [Inhalt/Quelle/{Name}](#content-source-name)
     * [Inhalt/Hash/{Name}](#content-hash-name)
     * [Inhalt](#content)
     * [maxblockid](#maxblockid)
     * [block/{id}](#block-id)
     * [avatar/{ecosystem}/{member}](#avatar-ecosystem-member)
     * [config/zentrifuge](#config-centrifugo)
     * [updnotificator](#updnotificator)
     

<!-- /TOC -->

## Fehlerbehandlung {#error-response-handling}

Wenn die Anfrage erfolgreich ausgeführt wird, wird ein Statuscode `200` zurückgegeben. Tritt ein Fehler auf, wird zusätzlich zum Fehlerstatus ein JSON-Objekt mit folgenden Feldern zurückgegeben:

* Error

Fehlerkennung.

* Nachricht

Der im Fehlerfall zurückgegebene Text.

* Parameter

Zusätzliche Parameter des Fehlers, die im Fehlerfall im zurückgegebenen Text enthalten sein können.

> Response example

400 (Bad request)

Content-Type: application/json
```json
{
 "err": "E_INVALIDWALLET",
 "msg": "Wallet 1234-5678-9012-3444-3488 is not valid",
 "params": ["1234-5678-9012-3444-3488"]
}
```

### Fehlerliste {#error-list}

> `E_CONTRACT`
 
    No `%s` contract exists

> `E_DBNIL`

    Leere Datenbank

> `E_DELETEDKEY`

    Kontoadresse gesperrt

> `E_ECOSYSTEM`

    Ökosystem `%d` existiert nicht

> `E_EMPTYPUBLIC`

    Ungültiger öffentlicher Schlüssel für das Konto
> `E_KEYNOTFOUND`

    Kontoadresse nicht gefunden

> `E_HASHWRONG`

    Falscher Hash

> `E_HASHNOTFOUND`

    Nicht gefunden

> `E_HEAVYPAGE`

    Zu viele Seiten geladen

> `E_INVALIDWALLET`

    Ungültige Wallet-Adresse `%s`

> `E_LIMITTXSIZE`

    Größe einer Transaktion außerhalb des Limits

> `E_NOTFOUND`

    Seiten- oder Menüinhalt nicht gefunden

> `E_PARAMNOTFOUND`

    Parameter nicht gefunden

> `E_PERMISSION`

    Keine Erlaubnis
> `E_QUERY`

    Datenbankabfragefehler

> `E_RECOVERED`

    Die API hat einen Panikfehler.
    Gibt einen Fehler zurück, wenn ein Panikfehler vorliegt.
    Es bedeutet, dass Sie auf einen Fehler gestoßen sind, der lokalisiert und behoben werden muss.

> `E_SERVER`

    Serverfehler.
    Wenn es einen Fehler in der golang-Bibliotheksfunktion gibt, kehrt sie zurück. Das msg-Feld enthält den im Fehlerfall zurückgegebenen Text.

    Als Antwort auf jeden Befehl kann ein **E_SERVER**-Fehler auftreten. Wenn es aufgrund falscher Eingabeparameter auftritt, können Sie es in einen verwandten Fehler ändern. In einem anderen Fall meldet dieser Fehler einen ungültigen Betrieb oder eine falsche Systemkonfiguration, was einen detaillierteren Untersuchungsbericht erfordert.

> `E_SIGNATURE`

    Falsche Signatur

> `E_STATELOGIN`

    `%s` ist kein Mitglied des Ökosystems `%s`

> `E_TABLENOTFOUND`

    Tabelle `%s` nicht gefunden
> `E_TOKENEXPIRED`

    Sitzung `%s` ist abgelaufen

> `E_UNAUTHORIZED`

    Unbefugt.

    Wenn Sie nicht angemeldet sind oder die Sitzung abgelaufen ist, gibt jeder Befehl außer `getuid, login` einen

    E_UNAUTHORIZED-Fehler zurück.

> `E_UNKNOWNUID`

    Unbekannte UID

> `E_UPDATING`

    Der Knoten aktualisiert die Blockchain

> `E_STOPPING`

    Der Knoten wurde gestoppt

> `E_NOTIMPLEMENTED`

    Noch nicht implementiert

> `E_BANNED`

    Die Kontoadresse ist in `%s` verboten

> `E_CHECKROLE`

    Zugriff verweigert

    APIs sind für CLB nicht verfügbar

------------------------------------------------------------------------
> Schnittstellenanforderung für den CLB-Knoten nicht verfügbar:

* Metriken
* txinfo
* txinfoMultiple
* appparam
* appparams
* App-Inhalt
* Geschichte
* Balance
* Block
* maxblockid
* Blöcke
* detaillierte Blöcke
* Ökosystemparameter
* Systemparameter
* Ökosysteme
* Ökosystemparam
* Ökosystemname
* Brieftaschenverlauf
* tx_record
## Request Type {#request-type}
**Uniform use** 
- application/x-www-form-urlencoded





## Authentifizierung {#authentication-interface}
[JWT-Token](#https://jwt.io/) wird zur Authentifizierung verwendet. Nach Erhalt des JWT-Tokens muss es in jedem Request-Header platziert werden: `Authorization: Bearer TOKEN_HERE`.

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....... .I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE"
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

### Anmeldung {#login}
POST/ Authentifizierung der Benutzeridentität.

Der Befehl **getuid** sollte zuerst aufgerufen werden, um einen eindeutigen Wert zu erhalten und ihn zu signieren. Das temporäre JWT-Token von getuid muss im Anforderungsheader übergeben werden.

Wenn die Anfrage erfolgreich war, wird das in der Antwort erhaltene Token in **Autorisierung** aufgenommen.
**Anfrage**
> POST /api/v2/login

- `ecosystem`

  Ökosystem-ID.

  Wenn nicht angegeben, ID des ersten Ökosystems standardmäßig.

- `expire`

  Lebensdauer des JWT-Tokens in Sekunden, standardmäßig 28800.

- `pubkey`

  Hexadezimaler öffentlicher Schlüssel des Kontos.
  
- `key_id`

  Kontoadresse `XXXX-...-XXXX`.

  Verwenden Sie diesen Parameter, wenn der öffentliche Schlüssel bereits in der Blockchain gespeichert ist. Es kann nicht gleichzeitig mit dem Pubkey-Parameter verwendet werden.

- `signature`

  UID-Signatur erhalten über getuid.

**Response**

- `token`

     JWT-Token.

- `ecosystem_id`

     Ökosystem-ID.

- `key_id`

     Kontoadressen-ID

- `account`

     Wallet-Adresse `XXXX-...-XXXX`.

- `notify_key`

     Benachrichtigungs-ID.

- `isnode`

     Ob die Kontoadresse der Besitzer des Knotens ist. Wert: `true, false`.

- `isowner`

     Ob die Kontoadresse der Ersteller des Ökosystems ist. Wert: `true, false`.

- `clb`

     Ob das registrierte Ökosystem CLB ist. Wert: `true, false`.

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

## Dienstbefehle {#server-side-command-interface}
### Ausführung {#version}

GET/ Gibt die Version des aktuellen Servers zurück.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

**Anfrage**

> GET /api/v2/version

**Request**

``` text
GET
/api/v2/version
```

**Response Example**

``` text
200 (OK)
Content-Type: application/json
"1.3.0 branch.main commit.790..757 time.2021-08-23-08:20:19(UTC)"
```
## Datenabfragefunktionen {#data-request-function-interface}

### Balance {#balance}

GET/ Fordern Sie den Kontostand der Kontoadresse im aktuellen Ökosystem an.

**Request**

**Request**

``` text
GET
/api/v2/balance/{wallet}
```

- `wallet`

 Adresskennung. Sie können es in einem beliebigen Format `int64, uint64, XXXX-...-XXXX` angeben. Diese Adresse wird in dem Ökosystem abgefragt, in dem der Benutzer gerade angemeldet ist.

#### Antwort

**Response**

- `amount`

    > The minimum unit of contract account balance.

- `money`

    > Account balance.

- `total`

    > Account balance.

- `utxo`

    > UTXO account balance.

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "amount": "877450000000000",
    "money": "877.45",
    "total": "877450000000000",
    "utxo": "0"
} 
```

**Error Response**

*E_SERVER, E_INVALIDWALLET*

### Blöcke {#blocks}
GET/ gibt eine Liste zurück, die zusätzliche Informationen zu Transaktionen in jedem Block enthält.
Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

**Request**

``` text
GET 
/api/v2/blocks
```

- `block_id` [Omitempty](#omitempty) Default is 0

    > The height of the starting block to query.

- `count` [Omitempty](#omitempty) (default is 25, max request 1000)

    > Number of blocks.

**Response**

- `Block height`

    > List of transactions in the block and additional information for each transaction.
    >
    > > - `hash`
    > >
    > > > Trading Hash.
    > >
    > > - `contract_name`
    > >
    > > > Contract name.
    > >
    > > - `params`
    > >
    > > > Array of contract parameters.
    > >
    > > - `key_id`
    > >
    > > > For the first block, it is the account address of the first block that signed the transaction.
    > >
    > > > For all other blocks, is the address of the account that signed the transaction.

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{ "1":
    [{"hash": "O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=",
    "contract_name":"",
    "params":null,
    "key_id":-118432674655542910}]
}
```

**Error Response**

*E_SERVER, E_NOTFOUND*

### detaillierte Blöcke {#detailed-blocks}

GET/ gibt eine Liste mit detaillierten zusätzlichen Informationen zu Transaktionen in jedem Block zurück.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

**Request**

``` text
GET
/api/v2/detailed_blocks
```

- `block_id` [Omitempty](#omitempty) Default is 0

  > The height of the starting block to query.

- `count` [Omitempty](#omitempty) (default is 25, max request 1000)

  > Number of blocks.

**Response**

- `Block height` The block height.
  - `blockhead` The block header contains the following fields.
    - `block_id` Block height.
    - `time` Block generation timestamp.
    - `key_id` Sign the account address for the block.
    - `node_position` The location of the node that generated the block in the honor node list.
    - `version` Block structure version.
  - `hash` Block Hashing.
  - `node_position` the location of the node that generated the block in the honor node list.
  - `key_id` The address of the account that signed the block.
  - `time` Block generation timestamp.
  - `tx_count` Number of transactions within the block.
  - `size` The block size.
  - `rollback_hash` Block rollback hash.
  - `merkle_root` The block deals with the Merkle tree.
  - `bin_data` Serialization of the block header, all transactions within the block, the previous block hash, and the private key of the node that generated the block.
  - `transactions` List of transactions in the block and additional information about each transaction.
    - `hash` Trading hash.
    - `contract_name` Contract name.
    - `params` Contract parameters.
    - `key_id` Sign the account address for this transaction.
    - `time` Transaction generation timestamp.
    - `type` Transaction type.
    - `size` Trade Size.

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{"1":
    {"header":
        {"block_id":1,
        "time":1551069320,
        "ecosystem_id":0,
        "key_id":-118432674655542910,
        "node_position":0,
        "version":1},
    "hash":"3NxhvswmpGvRdw8HdkrniI5Mx/q14Z4d5hwGKMp6KHI=",
    "ecosystem_id":0,
    "node_position":0,
    "key_id":-118432674655542910,
    "time":1551069320,
    "tx_count":1,
    "size": "1.69KiB",
    "rollbacks_hash":"I2JHugpbdMNxBdNW1Uc0XnbiXFtzB74yD9AK5YI5i/k=",
    "mrkl_root":"MTZiMjY2NGJjOWY3MDAyODlhYjkyMDVhZDQwNDgxNzkxMjY1MWJjNjczNDkyZjk5MWI2Y2JkMjAxNTIwYjUyYg==",
    "bin_data":null,
    "sys_update":false,
    "gen_block":false,
    "stop_count":0,
    "transactions":[
        {
            "hash":"O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=",
            "contract_name":"",
            "params":null,
            "key_id":0,
            "time":0,
            "type":0,
            "size": "300.00B"
        }
    ]}
}
```

**Error Response**

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
GET/ Wenn der angegebene Hash mit den Daten in der angegebenen Tabelle, dem angegebenen Feld und dem angegebenen Datensatz übereinstimmt, gibt diese Anforderung die Daten zurück. Andernfalls wird ein Fehler zurückgegeben.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

**Request**

```text
GET
/data/{table}/id/{column}/{hash}
```

- `table`

     Tabellenname.
- `id`

     Datensatz-ID.
- `column`

     Feldname.
- `hash`

     Hash der angeforderten Daten.

**Response**
Binärdaten

**Response Example**

``` text
200 (OK)
Content-Type: *
Content-Disposition: attachment

SetVar(this_page, @1voting_list).(this_table, @1votings)
Include(@1pager_header)

SetTitle("$@1voting_list$")
Span(Class: text-muted h5 m0 mb ml-lg, Body: Span(Class: ml-sm, Body: "$@1votings_list_desc$"))
AddToolButton(Title: $@1templates_list$, Page: @1voting_templates_list, Icon: icon-pin)
AddToolButton(Title: $@1create$, Page: @1voting_create, Icon: icon-plus).Popup(60, $@1new_voting$)

```

**Error Response**

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### keyinfo {#keyinfo}

**GET**/ Return to a list of ecosystems, which contains the role of registered the specified address.

The request does not require login authorization.

**Request**

```text
GET
/api/v2/keyinfo/{address}
```

- `address`

    > Address identifier, you can specify `int64, uint64, xxxx -...-xxxx`.
    >
    > This request is query in all ecosystems.

**Response**

- `ecosystem`

    > Ecosystem ID.

- `name`

    > Ecosystem name.

- `roles`

    > Activities with *id* and *name* fields.

**Response Example**

``` text
200 (OK)
Content-Type: application/json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Governancer"},{"id":"2","name":"Developer"}]
}]
```

**Error Response**

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



## Get Metrics Interface

### metrics/keys {#metrics-keys}

**GET**/ Returns the number of ecosystem 1 account addresses.

**Request**

``` text
GET
/api/v2/metrics/keys
```

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/blocks {#metrics-blocks}

**GET**/ Returns the number of blocks.

**Request**

``` text
GET
/api/v2/metrics/blocks
```

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/transactions {#metrics-transactions}

**GET**/ Returns the total number of transactions.

**Request**

``` text
GET
/api/v2/metrics/transactions
```

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/ecosystems {#metrics-ecosystems}

**GET**/ Returns the number of ecosystems.

**Request**

``` text
GET
/api/v2/metrics/ecosystems
```

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/honornodes {#metrics-honornodes}

**GET**/ Returns the number of honor nodes.

This request does not require login authorization.

``` 
GET
/api/v2/metrics/honornodes
```

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

## Ecosystem Interface {#ecosystem-interface}

### ecosystemname {#ecosystemname}

**GET**/ Returns the name of the ecosystem by its identifier.

This request does not require login authorization.

``` text
GET
/api/v2/ecosystemname?id=1
```

- *id*

    > Ecosystem ID.

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "ecosystem_name": "platform_ecosystem"
}
```

**Error Response**

*E_PARAMNOTFOUND*

### appparams/{appid} {#appparams-appid}

[Authorization](#authorization)

**GET**/ Returns a list of application parameters in the current or specified ecosystem.

**Request**

``` text
GET
/api/v2/appparams/{appid}
```

- `appid`

    > Application ID.

- `ecosystem`

    > Ecosystem ID; if not specified, the current ecosystem parameter will be returned.

- `names`

    > The list of received parameters.
    >
    > You can specify a comma-separated list of parameter names, for example:`/api/v2/appparams/1?names=name,mypar`.

**Response**

- `list`

    > Each element of the array contains the following parameters.
    >
    > - `name`, the name of the parameter.
    > - `value`, the value of the parameter.
    > - `conditions`, change the permissions of the parameters.

**Response Example**

``` text
200 (OK)
Content-Type: application/json
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

**Error Response**

*E_ECOSYSTEM*

### appparam/{appid}/{name} {#appparam-appid-name}
GET/ Gibt Informationen zurück, die sich auf den Parameter {name} der Anwendung {appid} im aktuellen oder angegebenen Ökosystem beziehen.
**Anfrage**
> GET /api/v2/appparam/{appid}/{name}[?ecosystem=1]

- `appid`

    Anwendung ID.
- `name`

    Name des angeforderten Parameters.
- `ecosystem` [Omitempty](#omitempty)

Ökosystem-ID (optionaler Parameter).
     Gibt standardmäßig das aktuelle Ökosystem zurück.

**Response**
* Ich würde

     Parameter-ID.
* Name

     Parametername.
* Wert

     Parameterwert.
* Bedingungen

     Berechtigung zum Ändern von Parametern.

**Response Example**

200 (OK)
Inhaltstyp: application/json

```json
{
    "id": "10",
    "name": "par",
    "value": "My value",
    "conditions": "true"
}
```
**Error Response**
E_ECOSYSTEM, E_PARAMNOTFOUND

### Ökosystemparam {#ecosystemparams}
[Authorization](#authorization)
GET/ Gibt die Liste der Ökosystemparameter zurück.

**Request**
> GET /api/v2/ecosystemparams/[?ecosystem=...&names=...]

* `ecosystem` [Omitempty](#omitempty)

     Ökosystem-ID. Wenn nicht angegeben, wird die aktuelle Ökosystem-ID zurückgegeben.

* `names` [Omitempty](#omitempty)
     Liste der Anforderungsparameter, durch Kommas getrennt.

     Zum Beispiel: `/api/v2/ecosystemparams/?names=name,currency,logo`.
 
**Response**

- `list`

- `list`

    > Each element of the array contains the following parameters.
    >
    > - `name`
    >
    > > Parameter name.
    >
    > - `value`
    >
    > > Parameter value.
    >
    > - `conditions`
    >
    > > Change permissions for parameters.

**Response Example**

``` text
200 (OK)
Inhaltstyp: application/json

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
**Error Response**

*E_ECOSYSTEM*

### ecosystemparam/{name} {#ecosystemparam-name}

GET/ Gibt Informationen zum Parameter {Name} im aktuellen oder angegebenen Ökosystem zurück.

**Request**
> GET /api/v2/ecosystemparam/{name}[?ecosystem=1]
* `name`

    Name des Anforderungsparameters.
* `ecosystem`

    Sie können die Ökosystem-ID angeben. Standardmäßig wird die aktuelle Ökosystem-ID zurückgegeben.

**Response**
* `name`

    Parametername.
* `value`

    Parameterwert.
* `conditions`

    Berechtigung zum Ändern der Parameter.

**Response Example**
200 (OK)
Inhaltstyp: application/json

```json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
}
```

**Error Response**

*E_ECOSYSTEM*

### tables/[?limit=…&offset=…] {#tables-limit-offset}
[Authorization](#authorization)

GET/ Gibt die Liste der Tabellen des aktuellen Ökosystems zurück, in der Sie den Offset und die Anzahl der Einträge festlegen können.

**Request**
* `limit` [Omitempty](#omitempty)

    Anzahl der Einträge, standardmäßig 25.
* `offset` [Omitempty](#omitempty)

    Offset, standardmäßig 0.
> GET /api/v2/tables

#### Antwort
- `count`

    Gesamteinträge in der Tabelle.

  - `list`

      Jedes Element im Array enthält die folgenden Parameter:
  * name
  
    Tabellenname ohne Präfix.
  * count

    Anzahl der Einträge in der Tabelle.

**Response Example**

200 (OK)

Inhaltstyp: application/json

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

[Authorization](#authorization)

**GET**/ Returns information about the current ecosystem request data table.

**Request**

- `name`

    > Data table name.

``` text
GET
/api/v2/table/{table_name}
```

Returns the following field information.

- `name`

    Tabellenname ohne das Ökosystempräfix.
* `insert`

    Berechtigung zum Hinzufügen neuer Einträge.
* `new_column`

    Berechtigung zum Hinzufügen neuer Felder.
* `update`

   Berechtigung zum Ändern von Einträgen.
* conditions

    Berechtigung zum Ändern der Tabellenkonfiguration.
* `columns`

    > Array of field-related information.
    >
    > > - `name`
    > >
    > > > Field name.
    > >
    > > - `type`
    > >
    > > > Field data type.
    > >
    > > - `perm`
    > >
    > > > Change the permissions for the field value.

### list/{name}\[?limit=\... &offset=\... &columns=\... \] {#list-name-limit-offset-columns}

[Authorization](#authorization)

**GET**/
Returns a list of the specified data table entries in the current ecosystem. You can set the offset and the number of entries.

**Request**

- `name`

    > Data table name.

- `limit` [Omitempty](#omitempty)

    > Number of entries, default 25 entries.

- `offset` [Omitempty](#omitempty)

    > Offset, default is 0.

- `columns` [Omitempty](#omitempty)

    > A comma-separated list of requested columns, if not specified, all columns will be returned. The id column will be returned in all cases.

``` text
GET
/api/v2/list/mytable?columns=name
```

**Response**

- `count`

    > Total number of entries.

- `list`

    > Each element of the array contains the following parameters.
    >
    > > - `id`
    > >
    > > > Entry ID.
    > >
    > > - The sequence of request columns.

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "count": "10"
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

### sections\[?limit=\... &offset=\... &lang=\] {#sections-limit-offset-lang}

[Authorization](#authorization)

**GET**/ Returns the *sections* of the current ecosystem
List of table entries, you can set the offset and the number of entries.

If *role_access*
field contains a list of roles and does not include the current role, no record will be returned. *title*
The data in the field will be replaced by the *Accept-Language* language resource in the request header.

**Request**

- `limit` [Omitempty](#omitempty)

    > Number of entries, default 25 entries.

- `offset` [Omitempty](#omitempty)

    > Offset, default is 0.

- `lang` [Omitempty](#omitempty)

    > This field specifies the multilingual resource code or localization, e.g., *en, de*. If the specified multilingual resource is not found, e.g., *en-US*, then the multilingual resource group in
     Search in *en*.

``` text
GET
/api/v2/sections
```

**Response**

- `count`

    > *sections* Total number of table entries.

- `list`

    > Each element of the array contains information about all columns in the actions table.

**Response Example**

``` text
200 (OK)
Inhaltstyp: application/json

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

**Error Response**

*E_TABLENOTFOUND*

### row/{name}/{id}[?columns=] {#row-name-id-columns}

[Authorization](#authorization)

GET/ Gibt den Eintrag der angegebenen Tabelle im aktuellen Ökosystem zurück. Sie können die zurückzugebende(n) Spalte(n) angeben.

**Request**

- `name`

    Tabellenname.
- `id`

    Eintrags-ID.
- `columns` [Omitempty](#omitempty)

    Liste der angeforderten Spalten, getrennt durch Kommas. Wenn nicht angegeben, werden alle Spalten zurückgegeben. In allen Fällen wird die ID-Spalte zurückgegeben.

``` text
GET
/api/v2/row/mytable/10?columns=name
```

**Response**

- `value`

    Ein Array von Werten der angeforderten Spalten
    * id
        Eintrags-ID.

    * Reihenfolge der angeforderten Spalten.

**Response Example**

200 (OK)

Inhaltstyp: application/json

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
`` `

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

[Authorization](#authorization)

**GET**/ Returns a list of platform parameters.

**Request**

```text
GET
/api/v2/systemparams/[?names=...]
```

- `names` [Omitempty](#omitempty)

    A list of request parameters, separated by commas. For example
        `/api/v2/systemparams/?names=max_columns,max_indexes`.

**Response**

- `list`

    > Each element of the array contains the following parameters.
    >
    > > - `name`
    > >
    > > > Parameter name.
    > >
    > > - `value`
    > >
    > > > Parameter values.
    > >
    > > - `conditions`
    > >
    > > > Change the permission of the parameter.

**Response Example**

``` text
200 (OK)
Inhaltstyp: application/json

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

**Error Response**

*E_PARAMNOTFOUND*

### history/{name}/{id} {#history-name-id}

[Authorization](#authorization)

**GET**/ Returns the change record for the entry in the specified data table in the current ecosystem.

**Request**

``` text
GET
/api/v2/history?name=contracts&id=5
```

> - `name`
>
> Data Table Name.
>
> - `id`
>
> > Entry ID.

**Response**

> - `list`
>
> Each element of the array contains a change record for the requested entry.

**Response Example**

``` text
200 (OK)

Inhaltstyp: application/json


```json
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

[Authorization](#authorization)

**GET**/ Returns the current ecosystem in the specified data table (pages, menu or snippet) *name*
The entry for the field.

``` text
GET
/api/v2/interface/page/default_page
/api/v2/interface/menu/default_menu
/api/v2/interface/snippet/welcome
```

**Request**

- `name`

     Name des in der Tabelle angegebenen Eintrags.
#### Antwort
* `id`

     Eintrags-ID.
* `name`

     Eintragsname.
* `other`

     Andere Spalten der Tabelle.

**Response Example**

200 (OK)

Inhaltstyp: application/json

```json
{
    "id": "1",
    "name": "default_page",
    "value": "P(Page content)",
    "default_menu": "default_menu",
    "validate_count": 1
}
```

**Error Response**

*E_QUERY*, *E_NOTFOUND*

## Vertragsfunktionen {#contract-function-interface}

### contracts[?limit=…&offset=…] {#contracts-limit-offset}

[Authorization](#authorization)
GET/ Gibt die Liste der Verträge im aktuellen Ökosystem zurück und kann den Offset und die Anzahl der Einträge festlegen.

**Request**
* `limit`

    Anzahl der Einträge, standardmäßig 25.
* `offset`

    Offset, standardmäßig 0.
> GET /api/v2/contracts

**Response**

- `count`

    > Total number of entries.

- `list`

    > Each element of the array contains the following parameters.
    >
    > > - `id`
    > >
    > > > Contract ID.
    > >
    > > - `name`
    > >
    > > > Contract name.
    > >
    > > - `value`
    > >
    > > > Contract contents.
    > >
    > > - `wallet_id`
    > >
    > > > The account address to which the contract is tied.
    > >
    > > - `address`
    > >
    > > > Contract-bound wallet address `XXXX-... -XXXX`.
    > >
    > > - `ecosystem_id`
    > >
    > > > The ecosystem ID to which the contract belongs.
    > >
    > > - `app_id`
    > >
    > > > The application ID to which the contract belongs.
    > >
    > > - `conditions`
    > >
    > > > Change the permission of the contract.
    > >
    > > - `token_id`
    > >
    > > > The ID of the ecosystem where the pass is used to pay the contract fee.

**Response Example**

 200 (OK)

 Inhaltstyp: application/json

 
```text
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

### contract/{name} {#contract-name}
GET/ Gibt die relevanten Informationen des angegebenen Vertrags zurück. Standardmäßig wird der Vertrag im aktuellen Ökosystem abgefragt.

**Request**
* `name`

    > Contract name.

``` text
GET
/api/v2/contract/mycontract
```

**Response**

- `id`

     Vertrags-ID in VM.
* `name`

     Vertragsname „@1MainCondition“ mit der Ökosystem-ID.
* `state`

     ID des Ökosystems, zu dem der Vertrag gehört.
* `walletid`

     An den Vertrag gebundene Kontoadresse.
* `tokenid`

     Als ID des Ökosystems, in dem sich der Token befindet, der zur Zahlung der Vertragsgebühr verwendet wird.
* `address`

     An den Vertrag gebundene Wallet-Adresse `XXXX-...-XXXX`.
* `tableid`

     Eintrags-ID des Vertrags in der Vertragstabelle.
* `fields`

    > The array contains structural information for each parameter of the contract **data** section.
    >
    > > - `name`
    > >
    > > > Parameter name.
    > >
    > > - 
    > >
    > > `type`
    > >
    > > Parameter type.
    > >
    > > - `optional`
    > >
    > > > Parameter options, \`true\` means optional parameters, \`false\` means mandatory parameters.

**Response Example**

200 (OK)

Inhaltstyp: application/json

```json
{
    "fields" : [
    {"name":"amount", "type":"int", "optional": false},
    {"name":"name", "type":"string", "optional": true}
    ],
    "id": 150,
    "name": "@1mycontract",
    "tableid" : 10
}
```

**Error Response**

*E_CONTRACT*

### sendTX {#sendtx}
POST/ Empfangen Sie die Transaktion im Parameter und fügen Sie sie der Transaktionswarteschlange hinzu. Wenn die Anfrage erfolgreich ausgeführt wird, wird der Transaktions-Hash zurückgegeben. Mit dem Hash erhalten Sie die entsprechende Transaktion im Block. Wenn eine Fehlerantwort auftritt, wird der Hash in die Fehlertextnachricht eingefügt.

**Request**

- `tx_key`

 > Transaktionsinhalt. Sie können einen beliebigen Namen angeben und unterstützen den Empfang mehrerer Transaktionen mit diesem Parameter.
> POST /api/v2/sendTx
```
Headers:
Content-Type: multipart/form-data
Parameters:
tx1 - transaction 1
txN - transaction N
```

**Response**

- `hashes`

    > Transaction hash arrays.
    >
    > > - `tx1`
    > >
    > > > Trading 1 hash.
    > >
    > > - `txN`
    > >
    > > > Trading N's hash.

**Response Example**

200 (OK)
Inhaltstyp: application/json


```json
{
    "hashes": {
      "tx1": "67afbc435634.....",
      "txN": "89ce4498eaf7....."
    }
}
```

**Error Response**

*E_LIMITTXSIZE*,*E_BANNED*

### txstatus {#txstatus}

[Authorization](#authorization)

**POST**/
Returns the block ID and error message for the specified transaction hash. If the return values for the block ID and error text message are null, then the transaction is not yet contained in the block.

**Request**

- `data`

    > JSON list of transaction hashes.

``` text
{"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

``` text
POST
/api/v2/txstatus/
```

**Response**

- `results`

    > The transaction hash is used as the key and the transaction detail is used as the value in the data dictionary.
    >
    > `hash`
    >
    > > Trading Hash.
    > >
    > > - `blockid`
    > >
    > > If the transaction execution succeeds, the block ID is returned; if the transaction execution fails, the
    > > > `blockid` for [0]{.title-ref}.
    > >
    > > - `result`
    > >
    > > > Returns the result of the transaction via the **\$result** variable.
    > >
    > > - `errmsg`
    > >
    > > Returns an error text message if the execution of the transaction fails.

**Response Example**
200 (OK)

Inhaltstyp: application/json


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

**Error Response**

*E_HASHWRONG, E_HASHNOTFOUND*

### txinfo/{hash} {#txinfo-hash}
GET/ Gibt die Informationen des angegebenen Hashs zurück, die mit der Transaktion korrelieren, einschließlich der Block-ID und der Anzahl der Bestätigungen. Wenn optionale Parameter angegeben werden, können auch der Vertragsname und zugehörige Parameter zurückgegeben werden.

**Request**
* hash

    Transaktionshash.
* `contractinfo` [Omitempty](#omitempty)

Detaillierte Kennung des Vertragsparameters. Um Vertragsdetails zu erhalten, die sich auf die Transaktion beziehen, geben Sie `contractinfo=1` an.

> GET /api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1
#### Antwort
* `blockid`

     Enthält die Block-ID der Transaktion. Wenn der Wert `0` ist, kann keine Transaktion mit diesem Hash gefunden werden.
* `confirm`

     Anzahl der Bestätigungen des Blocks blockid.
* `data` [Omitempty](#omitempty)
 
     Wenn `contentinfo=1` angegeben ist, werden die Vertragsdetails an diesen Parameter zurückgegeben.

**Response Example**
200 (OK)

Inhaltstyp: application/json

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

**Error Response**

*E_HASHWRONG*

### txinfoMultiple {#txinfomultiple}
GET/ Gibt die Informationen des angegebenen Hashs zurück, die mit einer Transaktion korrelieren.

**Request**

- `data`
    - `hashes`
    > A list of transaction hashes.

- `contractinfo` [Omitempty](#omitempty)

    > Detaillierte Kennung des Vertragsparameters. Um Vertragsdetails in Bezug auf die Transaktion zu erhalten, geben Sie `contractinfo=1` an.

``` text
data: {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

``` text
GET
/api/v2/txinfoMultiple
```

**Response**

- `results`

     Im Datenwörterbuch Transaktions-Hashes als Schlüssel und Transaktionsdetails als Wert.
     
     
     * hash

     Transaktionshash.

     * blockid

     Block-ID, die die Transaktion enthält. Wenn der Wert `0` ist, kann keine Transaktion mit diesem Hash gefunden werden.

     * confirm

     Anzahl der Bestätigungen des Blocks blockid.

     * date

     Wenn `contentinfo=1` angegeben ist, werden die Vertragsdetails an diesen Parameter zurückgegeben.

**Response Example**

200 (OK)

Inhaltstyp: application/json

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

**Error Response**

*E_HASHWRONG*

### /page/validators_count/{name} {#page-validators-count-name}
GET/ Gibt die Anzahl der Knoten zurück, die zum Überprüfen der angegebenen Seite erforderlich sind.

**Request**

- `name`

    > Page name with ecosystem ID in the format `@ecosystem_id%%page_name%`, for example
    > `@1main_page`.
    > If you don't have an ecosystem ID, then search in the first ecosystem page by default

``` text
GET
/api/v2/page/validators_count/@2page_name
```

**Response**

- `validate_count`

    > Specifies the number of nodes to be validated for the page.

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

**Error Response**

*E_NOTFOUND, E_SERVER*

### content/menu|page/{name} {#content-menu-page-name}

[Authorization](#authorization)
POST/ Gibt den JSON-Objektbaum des Codes der angegebenen Seite oder des Menünamens zurück, der das Ergebnis der Vorlagen-Engine-Verarbeitung ist.

**Request**
- `name`

    Seiten- oder Menüname.
`` text
POST
/api/v2/content/page/default
```

**Response**
- `menu` || `title`
 
     Menüname der Seite bei Anforderung von Inhalt/Seite/…
- `menutree`

     Ein JSON-Objektbaum des Seitenmenüs beim Anfordern von Inhalt/Seite/…
- `title` --head for the menu *content/menu/\...*

     Menüname bei Anforderung von Inhalt/Menü/...
- `tree`

     Ein JSON-Objektbaum einer Seite oder eines Menüs.
**Response Example**

200 (OK)

Inhaltstyp: application/json

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

**Error Response**

`E_NOTFOUND`

### content/source/{name} {#content-source-name}

[Authorization](#authorization)

**POST**

Returns a tree of coded JSON objects for the specified page name. Does not execute any functions or receive any data. The returned JSON object tree corresponds to the page template and can be used in the visual page designer. If the page is not found, a 404 error is returned.

**Request**

- `name`

    > Page name with ecosystem ID in the format `@ecosystem_id%%page_name%`, for example
    > `@1main_page`.
    > If no ecosystem ID is included, then search for the current eco-page by default.

**Response**

``` text
POST
/api/v2/content/source/default
```

- `tree`

    > JSON object tree of the page.

**Response Example**

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

**Error Response**

*E_NOTFOUND, E_SERVER*

### content/hash/{name} {#content-hash-name}

**POST** 

Returns a SHA256 hash of the specified page name, or a 404 error if the page cannot be found.

This request does not require login authorization. To receive the correct hash when making requests to other nodes, you must also pass
*ecosystem,keyID,roleID,isMobile*
parameter. To receive pages from other ecosystems, the ecosystem ID must be prefixed to the page name. For example: `@2mypage`.

**Request**


``` text
POST
/api/v2/content/hash/default
```
- `name`

     Seitenname mit der Ökosystem-ID.
- `ecosystem`

     Ökosystem-ID.
- `keyID`

     Kontoadresse.
- `roleID`
 
     Rollen-ID.


**Response**

- `hash`

     Hexadezimaler Hash.

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
} 
```

**Error Response**

*E_NOTFOUND, E_SERVER, E_HEAVYPAGE*
E_NOTFOUND, E_SERVER, E_HEAVYPAGE

### Inhalt {#content}

**POST**

Returns the number of JSON objects for the page code from the **template** parameter, if the optional parameter
**source** is specified as
`true or 1`, then this JSON object tree does not perform any functions and receive data. This JSON object tree can be used in the visual page designer.

This request does not require login authorization.

**Request**

- `template`

    > Page code.

- `source`

    > If `true or 1` is specified, the JSON object tree does not perform any functions and receives data.

``` text
POST
/api/v2/content
```

**Response**

- `tree`

    > JSON object tree.

**Response Example**

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

**Error Response**

*E_NOTFOUND, E_SERVER*

### maxblockid {#maxblockid}
GET/ Gibt die ID des höchsten Blocks auf dem aktuellen Knoten zurück.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

**Request**

> GET /api/v2/maxblockid

**Response**
- `max_block_id`

ID des höchsten Blocks auf dem aktuellen Knoten.

**Response Example**

``` text
200 (OK)
Content-Type: application/json
{
    "max_block_id" : 341,
}
```
**Error Response**

*E_NOTFOUND*

### block/{id} {#block-id}
GET/ Gibt relevante Informationen des Blocks mit der angegebenen ID zurück.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

**Request**

- `id`

    > Block ID.

``` text
POST
/api/v2/block/32
```

**Response**
- `hash`

     Hash des Blocks.
- `key_id`

     Adresse des Kontos, das den Block signiert hat.
- `time`

     Zeitstempel der Blockgenerierung.
- `tx_count`

     Gesamtzahl der Transaktionen im Block.
- `rollbacks_hash`

     Hash für Block-Rollback.
- `node_position`

     Position des Blocks in der Liste der Ehrenknoten.

**Response Example**

``` text
200 (OK)
Inhaltstyp: application/json
{
    "hash": "1x4S5s/zNUTopP2YK43SppEyvT2O4DW5OHSpQfp5Tek=",
    "key_id": -118432674655542910,
    "time": 1551145365,
    "tx_count": 3,
    "rollbacks_hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "node_position": 0,
} 
```

**Error Response**

*E_NOTFOUND*


### avatar/{ecosystem}/{member} {#avatar-ecosystem-member}
GET/ Gibt den Avatar des Benutzers in der Mitgliedertabelle zurück (Sie können ihn ohne Anmeldung verwenden).

**Request**

- `ecosystem`

    > Ecosystem ID.

- `member`

    > The user's account address. (xxxx-... -xxxx)

``` text
GET
/api/v2/avatar/1/1234-2134-... -4321
```

**Response**

The request header *Content-Type* is the image type and the image data is returned in the response body.

**Response Example**

``` text
200 (OK)
Content-Type: image/png  
```

**Error Response**

*E_NOTFOUND* *E_SERVER*

### config/centrifugo {#config-centrifugo}

**GET**/ Returns the host address and port of centrifugo.

This request does not require login authorization.

**Request**

``` text
GET
/api/v2/config/centrifugo
```

**Response**

Response result format `http://address:port`, e.g.: `http://127.0.0.1:8100`.

**Error Response**

*E_SERVER*

### updnotificator {#updnotificator}
POST/ Senden Sie alle Nachrichten, die noch nicht gesendet wurden, an den Benachrichtigungsdienst von centrifugo. Senden Sie nur Nachrichten für bestimmte Ökosysteme und Mitglieder.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

**Request**
* `id`

    Kontoadresse des Mitglieds.
* `ecosystem`

    Ecosystem ID.
> POST /api/v2/updnotificator

**Response Example**

``` text
200 (OK)
Content-Type: application/json
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