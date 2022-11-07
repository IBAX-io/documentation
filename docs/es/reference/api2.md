# RESTful API v2

Weaver
All functions provided, including authentication, ecosystem data reception, error handling, database table manipulation, page and contract execution are available through
IBAX Blockchain Platform's REST API is available.

By using the REST API, developers can access any of the platform's features without using Weaver.

API command calls are executed by addressing `/api/v2/command/[param]`, where `command`
is the command name and `param` is the additional parameter. The request parameters must be specified using the
`Content-Type: x-www-form-urlencoded`
The format is sent. The server response result is in JSON format.

<!-- TOC -->

- [Error response handling](#error-response-handling)
    - [Error list](#error-list)
- [Request Type](#request-type)
- [Authentication Interface](#authentication-interface)
    - [getuid](#getuid)
    - [login](#login)
- [Server Side command interface](#server-side-command-interface)
    - [version](#version)
- [Data Request Function Interface](#data-request-function-interface)
    - [balance](#balance)
    - [blocks](#blocks)
    - [detailed_blocks](#detailed-blocks)
    - [/data/{id}/data/{hash}](#data-id-data-hash)
    - [/data/{table}/id/{column}/{hash}](#data-table-id-column-hash)
    - [keyinfo](#keyinfo)
    - [walletHistory](#wallethistory)
    - [listWhere/{name}](#listWhere-name)
    - [nodelistWhere/{name}](#nodelistWhere-name)
- [Get Metrics Interface](#get-metrics-interface)
    - [metrics/keys](#metrics-keys)
    - [metrics/blocks](#metrics-blocks)
    - [metrics/transactions](#metrics-transactions)
    - [metrics/ecosystems](#metrics-ecosystems)
    - [metrics/honornodes](#metrics-honornodes)
- [Ecosystem Interface](#ecosystem-interface)
    - [ecosystemname](#ecosystemname)
    - [appparams/{appID}](#appparams-appid)
    - [appparam/{appid}/{name}](#appparam-appid-name)
    - [ecosystemparams](#ecosystemparams)
    - [ecosystemparam/{name}](#ecosystemparam-name)
    - [tables/\[?limit=\... &offset=\... \]](#tables-limit-offset)
    - [table/{name}](#table-name)
    - [list/{name}\[?limit=\... &offset=\... &columns=\... \]](#list-name-limit-offset-columns)
    - [sections\[?limit=\... &offset=\... &lang=\]](#sections-limit-offset-lang)
    - [row/{name}/{id}\[?columns=\]](#row-name-id-columns)
    - [row/{name}/{column}/{id}](#row-name-column-id)
    - [systemparams](#systemparams)
    - [history/{name}/{id}](#history-name-id)
    - [interface/{page|menu|snippet}/{name}](#interface-page-menu-snippet-name)
- [Contract Function Interface](#contract-function-interface)
    - [contracts\[?limit=\... &offset=\... \]](#contracts-limit-offset)
    - [contract/{name}](#contract-name)
    - [sendTX](#sendtx)
    - [txstatus](#txstatus)
    - [txinfo/{hash}](#txinfo-hash)
    - [txinfoMultiple](#txinfomultiple)
    - [/page/validators_count/{name}](#page-validators-count-name)
    - [content/menu\|page/{name}](#content-menu-page-name)
    - [content/source/{name}](#content-source-name)
    - [content/hash/{name}](#content-hash-name)
    - [content](#content)
    - [maxblockid](#maxblockid)
    - [block/{id}](#block-id)
    - [avatar/{ecosystem}/{member}](#avatar-ecosystem-member)
    - [config/centrifugo](#config-centrifugo)
    - [updnotificator](#updnotificator)

<!-- /TOC -->

## Error response handling

Return status in case of successful request execution
`200`. If an error occurs, in addition to the error status, a JSON object with the following fields will be returned.

- **error**

    > Error identifier.

- **msg**

    > Error text message.

- **params**

    > An array of additional parameters that can be placed in the error message.

#### Response Example
``` text
400 (Bad request)
Content-Type: application/json
{
    "err": "E_INVALIDWALLET",
    "msg": "Wallet 1234-5678-9012-3444-3488 is not valid",
    "params": ["1234-5678-9012-3444-3488"]
}
```

### Error list

> E_CONTRACT
 
  No `%s` contract exists

> E_DBNIL

    Database is empty

> E_DELETEDKEY

    Account address is frozen

> E_ECOSYSTEM

    Ecosystem `%d` does not exist

> E_EMPTYPUBLIC

    Invalid account public key

> E_KEYNOTFOUND

    Account address not found

> E_HASHWRONG

    Incorrect hash

> E_HASHNOTFOUND

    Hash not found

> E_HEAVYPAGE

    Too much page loading

> E_INVALIDWALLET

    Wallet address `%s` Invalid

> E_LIMITTXSIZE

    The transaction size has exceeded the limit

> E_NOTFOUND

    Page or menu content not found

> E_PARAMNOTFOUND

    Parameters not found

> E_PERMISSION

    No permission

> E_QUERY

    Database query error

> E_RECOVERED

    API panic error occurs.

    If a panic error occurs, an error is returned.

    This error means that you have encountered a bug that needs to be found and fixed.

> E_SERVER

    Server error.

    Return if there is an error in the golang library function. The \*msg\* field contains the error text message.

    **E_SERVER** may appear in response to any command Error. 
    If it occurs due to an incorrect input parameter, it can be changed to a related error. In another case, this error reports an invalid operation or incorrect system configuration, which requires a more detailed investigation report.

> E_SIGNATURE

    Incorrect signature

> E_STATELOGIN

    `%s` is not a member of the ecosystem `%s`

> E_TABLENOTFOUND

    Data sheet `%s` not found

> E_TOKENEXPIRED

    The session has expired `%s`

> E_UNAUTHORIZED

    Unauthorized.

    In case no login is performed or the session expires, 
    except for `getuid, login` Any command other than **E_UNAUTHORIZED** returns an error.

> E_UNKNOWNUID

    Unknown UID

> E_UPDATING

    Nodes are updating the blockchain

> E_STOPPING

    Node is stopped

> E_NOTIMPLEMENTED

    Not yet achieved

> E_BANNED

    This account address is prohibited in `%s`

> E_CHECKROLE

    Access denied

    CLB Unavailable Interface

------------------------------------------------------------------------

> Interface requests for which the CLB node is not available.

- metrics
- txinfo
- txinfoMultiple
- appparam
- appparams
- appcontent
- history
- balance
- block
- maxblockid
- blocks
- detailed_blocks
- ecosystemparams
- systemparams
- ecosystems
- ecosystemparam
- ecosystemname
- walletHistory
- tx_record

## Request Type
**Uniform use** 
- application/x-www-form-urlencoded

## Authentication Interface

[JWT token](https://jwt.io)
Used for authentication. The JWT token must be placed in each request header after it is received: `Authorization: Bearer TOKEN_HERE`.

### getuid

**GET**/ returns a unique value, signs it with the private key, and then uses
The [login](#login) command sends it back to the server.

Generate a temporary JWT token that needs to be passed to **Authorization** when calling **login**.

#### Request

``` text
GET
/api/v2/getuid
```

#### Response

- *uid*

    > Signature number.

- *token*

    > The temporary token passed during login.
    >
    > The life cycle of a temporary token is 5 seconds.

- *network_id*

    > Server identifier.

- *cryptoer*

    > Elliptic curve algorithm.

- *hasher*

    > hash algorithm.

#### Response Example 1

``` text
200 (OK)
Content-Type: application/json
{
    "uid": "4999317241855959593",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....... .I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE"
    "network_id": "4717243765193692211"
}
```

In the case that no authorization is required (the request contains **Authorization**), the following message will be returned:

- *expire*

    > Expiration time.

- *ecosystem*

    > Ecosystem ID.

- *key_id*

    > Account address.

- *address*

    > Wallet address `XXXX-XXXX-..... -XXXX`.

- *network_id*

    > Server identifier.

#### Response Example 2

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

#### Error Response

*E_SERVER*

### login

**POST**/ User authentication.

> **getuid** should be called first
> command in order to receive the unique value and sign it. getuid's temporary JWT token needs to be passed in the request header.
>
> If the request is successful, the token received in the response is contained in **Authorization**.

#### Request

``` text
POST
/api/v2/login
```

- *\[ecosystem\]*

    > Ecosystem ID.
    >
    > If not specified, defaults to the first ecosystem ID.

- *\[expire\]*

    > Lifecycle of the JWT token, in seconds, default is 28800.

- *\[pubkey\]*

    > Hexadecimal account public key.

- *\[key_id\]*

    > Account address `XXXX-... -XXXX`.
    >
    > Use this parameter if the public key is already stored in the blockchain. It cannot be used with *pubkey*
    > parameters are used together.

- *signature*

    > The uid signature received via getuid.

#### Response

- *token*

    > JWT token.

- *ecosystem_id*

    > Ecosystem ID.

- *key_id*

    > Account Address ID

- *account*

    > Wallet address `XXXX-XXXX-..... -XXXX`.

- *notify_key*

    > Notification ID.

- *isnode*

    > Whether the account address is the owner of the node. Values: `true,false`.

- *isowner*

    > Whether the account address is the creator of the ecosystem. Values: `true,false`.

- *clb*

    > Whether the logged-in ecosystem is CLB. Values: `true,false`.

- *roles* [Omitempty](#omitempty)

    > Role list: `[{Role ID,Role Name}]`.

#### Response Example

``` text
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

#### Error Response

*E_SERVER, E_UNKNOWNUID, E_SIGNATURE, E_STATELOGIN, E_EMPTYPUBLIC*

## Server Side command interface

### version

**GET**/ Returns the current server version.

This request does not require login authorization.

#### Request

``` text
GET
/api/v2/version
```

#### Response Example

``` text
200 (OK)
Content-Type: application/json
"1.3.0 branch.main commit.790..757 time.2021-08-23-08:20:19(UTC)"
```

## Data Request Function Interface

### balance

**GET**/ Requests the balance of the account address in the current ecosystem.

This request does not require login authorization.

#### Request

``` text
GET
/api/v2/balance/{wallet}
```

- *wallet

    > Address identifier, can be specified in any format `int64, uint64, XXXX-... -XXXX`. Look up the address in the ecosystem where the user is currently logged in.

- *\[ecosystem\]* [Omitempty](#omitempty) Default eco1

    > Ecosystem id.

#### Response

- *amount*

    > The minimum unit of contract account balance.

- *money*

    > Account balance.

- *total*

    > Account balance.

- *utxo*

    > UTXO account balance.

#### Response Example

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

#### Error Response

*E_SERVER, E_INVALIDWALLET*

### blocks

**GET**/ Returns a list containing additional information related to the transactions in each block.

This request does not require login authorization.

#### Request

``` text
GET 
/api/v2/blocks
```

- *block_id* [Omitempty](#omitempty) Default is 0

    > The height of the starting block to query.

- *count* [Omitempty](#omitempty) (default is 25, max request 1000)

    > Number of blocks.

#### Response

- Block height

    > List of transactions in the block and additional information for each transaction.
    >
    > > - *hash*
    > >
    > > > Trading Hash.
    > >
    > > - *contract_name*
    > >
    > > > Contract name.
    > >
    > > - *params*
    > >
    > > > Array of contract parameters.
    > >
    > > - *key_id*
    > >
    > > > For the first block, it is the account address of the first block that signed the transaction.
    > >
    > > > For all other blocks, is the address of the account that signed the transaction.

#### Response Example

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

#### Error Response

*E_SERVER, E_NOTFOUND*

### <span id = "detailed-blocks">detailed_blocks</span>

**GET**/ Returns a list containing detailed additional information about the transactions in each block.

This request does not require login authorization.

#### Request

``` text
GET
/api/v2/detailed_blocks
```

- *block_id* [Omitempty](#omitempty) Default is 0

  > The height of the starting block to query.

- *count* [Omitempty](#omitempty) (default is 25, max request 1000)

  > Number of blocks.

#### Response

- Block height

    > - *blockhead*
    >
    > > The block header contains the following fields.
    > >
    > > > - *block_id*
    > >
    > > > > Block height.
    > >
    > > > - *time*
    > >
    > > > > Block generation timestamp.
    > >
    > > > - *key_id*
    > >
    > > > > Sign the account address for the block.
    > >
    > > > - *node_position*
    > >
    > > > > The location of the node that generated the block in the honor node list.
    > >
    > > > - *version*
    > >
    > > > > Block structure version.
    >
    > - *hash*
    >
    > > Block Hashing.
    >
    > - *node_position*
    >
    > the location of the node that generated the block in the honor node list.
    >
    > - *key_id*
    >
    > > The address of the account that signed the block.
    >
    > - *time*
    >
    > > Block generation timestamp.
    >
    > - *tx_count*
    >
    > > Number of transactions within the block.
    >
    > - *size*
    >
    > > The block size.
    >
    > - *rollback_hash*
    >
    > > Block rollback hash.
    >
    > - *merkle_root*
    >
    > > The block deals with the Merkle tree.
    >
    > - *bin_data*
    >
    > > Serialization of the block header, all transactions within the block, the previous block hash, and the private key of the node that generated the block.
    >
    > - *trading*
    >
    > > List of transactions in the block and additional information about each transaction.
    > >
    > > > - *hash*
    > >
    > > > > Trading hash.
    > >
    > > > - *contract_name*
    > >
    > > > > Contract name.
    > >
    > > > - *params*
    > >
    > > > > Contract parameters.
    > >
    > > > - *key_id*
    > >
    > > > > Sign the account address for this transaction.
    > >
    > > > - *time*
    > >
    > > > > Transaction generation timestamp.
    > >
    > > > - *type*
    > >
    > > > > Transaction type.
    > >
    > > > - *size*
    > >
    > > > > Trade Size.

#### Response Example

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

#### Error Response

*E_SERVER, E_NOTFOUND*

### keyinfo

**GET**/ Returns a list of ecosystems with roles registered to the specified address.

This request does not require login authorization.

#### Request

``` text
GET
/api/v2/keyinfo/{key_id}
```

- *key_id*

    > Address identifier, can be specified in any format `int64, uint64, XXXX-... -XXXX`.
    >
    > The request is queried in all ecosystems.

#### Response

- *ecosystem*

    > Ecosystem ID.

- *name*

    > Ecosystem name.

- *roles*

    > A list of roles with *id* and *name* fields.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Governancer"},{"id":"2","name":"Developer"}]
}]
```

#### Error Response

*E_SERVER, E_INVALIDWALLET*

### <span id = "data-id-data-hash">/data/{id}/data/{hash}</span>

**GET**/ If the specified hash matching the data in the binary watch, field, and records, this request will return the data. Otherwise, return error.

The request does not require login authorization.

#### Request

```default
GET
/data/{id}/data/{hash}
```

- *id*

    > Record ID.

- *hash*

    > Hash request data.

#### Response

> Binary data

#### Response Example

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

#### Error Response

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### <span id = "data-table-id-column-hash">/data/{table}/id/{column}/{hash}</span>

**GET**/ If the specified hash matches the data in the specified table, field, and records, the request will return the data. Otherwise, return error.

The request does not require login authorization.

#### Request

```default
GET
/data/{table}/id/{column}/{hash}
```

- *table*

    > Data table name.

- *id*

    > Record ID.

- *column*

    > Data table name, only one

- *hash*

    > Hash request data.

#### Response

> Binary data

#### Response Example

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

#### Error Response

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### keyinfo

**GET**/ Return to a list of ecosystems, which contains the role of registered the specified address.

The request does not require login authorization.

#### Request

```default
GET
/api/v2/keyinfo/{address}
```

- *address*

    > Address identifier, you can specify `int64, uint64, xxxx -...-xxxx`.
    >
    > This request is query in all ecosystems.

#### Response

- *ecosystem*

    > Ecosystem ID.

- *name*

    > Ecological system name.

- *roles*

    > Activities with *id* and *name* fields.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Governancer"},{"id":"2","name":"Developer"}]
}]
```

#### Error Response

*E_SERVER, E_INVALIDWALLET*

### walletHistory
**GET**/ Return to the current account transaction history record, find it according to the ID of the ID

[Authorization](#authorization)

#### Request

- *searchType*

  > Find Type (Income: Turn into Outcom: Turn out all: All, default).

- *\[page\]* [Omitempty](#omitempty)
  > Find the number of pages, the first page default, min: 1

- *\[limit\]* [Omitempty](#omitempty)

  > Credit number, default 20 articles. min: 1, MAX: 500

``` text
GET
/api/v2/walletHistory?searchType=all&page=1&limit=10
```

#### Response

- *total*

  > Total number of entries.
- *page*

  > Number of current page.

- *limit*

  > Currently find the number of bars.

- *list*
  > Each element in the array contains the following parameters:
    - *id*
      > Stripe ID.
    - *sender_id*
      > Send key_id
    - *sender_add*
      > Send the account address
    - *recipient_id*
      > Accept key_id
    - *recipient_add*
      > Accept the account address
    - *amount*
      > Transaction amount
    - *comment*
      > Trading remarks
    - *block_id*
      > Block height
    - *tx_hash*
      > Trading hash
    - *created_at*
      > Transaction creation time, millisecond time stamp
    - *money*
      > Transaction amount

#### Response Example

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

#### Error Response

*E_SERVER*



### <span id = "listWhere-name">listWhere/{name}</span>
**GET**/ Return to the entry of the data table specified in the current ecosystem. You can specify columns to be returned.

[Authorization](#authorization)

#### Request

- *name*

  > Data table name.

-   *\[limit\]* [Omitempty](#omitempty)

    > Credit number, default 25.

-   *\[offset\]* [Omitempty](#omitempty)

    > Disposal, default to 0.

-   *\[order\]* [Omitempty](#omitempty)

    > Sorting method, default `id ASC`.

-   *\[columns\]* [Omitempty](#omitempty)

    > The list of request columns is separated by commas. If it is not specified, all columns will be returned. In all cases, the `id` column will be returned.

-   *\[where\]* [Omitempty](#omitempty)

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

#### Response

- *count*

  > Total number of entries.
- *list*
  > Each element in the array contains the following parameters:
  - *id*
    > Stripe ID.
  - *...*
    > Data tables other columns

#### Response Example

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

#### Error Response

*E_SERVER*,*E_TABLENOTFOUND*


###  <span id = "nodelistWhere-name">nodelistWhere/{name}</span>
**GET**/ Return to the specified data table. You can specify columns to be returned. The type in the data table is **BYTEA** Do hexadecimal encoding processing

[Authorization](#authorization)

#### Request

- *name*

  > Data table name.

-   *\[limit\]* [Omitempty](#omitempty)

    > Credit number, default 25.

-   *\[offset\]* [Omitempty](#omitempty)

    > Disposal, default to 0.

-   *\[order\]* [Omitempty](#omitempty)

    > Sorting method, default `id ASC`.

-   *\[columns\]* [Omitempty](#omitempty)

    > The list of request columns is separated by commas. If it is not specified, all columns will be returned. In all cases, the `id` column will be returned.

-   *\[where\]* [Omitempty](#omitempty)

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

#### Response

- *count*

  > Total number of entries.
- *list*
  > Each element in the array contains the following parameters:
    - *id*
      > Stripe ID.
    - *...*
      > Data tables other columns

#### Response Example

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

#### Error Response

*E_SERVER*,*E_TABLENOTFOUND*



## Get Metrics Interface

### <span id = "metrics-keys">metrics/keys</span>

**GET**/ Returns the number of ecosystem 1 account addresses.

#### Request

``` text
GET
/api/v2/metrics/keys
```

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### <span id = "metrics-blocks">metrics/blocks</span>

**GET**/ Returns the number of blocks.

#### Request

``` text
GET
/api/v2/metrics/blocks
```

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### <span id = "metrics-transactions">metrics/transactions</span>

**GET**/ Returns the total number of transactions.

#### Request

``` text
GET
/api/v2/metrics/transactions
```

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### <span id = "metrics-ecosystems">metrics/ecosystems</span>

**GET**/ Returns the number of ecosystems.

#### Request

``` text
GET
/api/v2/metrics/ecosystems
```

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/honornodes

**GET**/ Returns the number of honor nodes.

This request does not require login authorization.

``` 
GET
/api/v2/metrics/honornodes
```

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

## Ecosystem Interface

### ecosystemname

**GET**/ Returns the name of the ecosystem by its identifier.

This request does not require login authorization.

``` text
GET
/api/v2/ecosystemname?id=1
```

- *id*

    > Ecosystem ID.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "ecosystem_name": "platform_ecosystem"
}
```

#### Error Response

*E_PARAMNOTFOUND*

### <span id = "appparams-appid">appparams/{appid}</span>

[Authorization](#authorization)

**GET**/ Returns a list of application parameters in the current or specified ecosystem.

#### Request

``` text
GET
/api/v2/appparams/{appid}
```

- *\[appid\]*

    > Application ID.

- *\[ecosystem\]*

    > Ecosystem ID; if not specified, the current ecosystem parameter will be returned.

- *\[names\]*

    > The list of received parameters.
    >
    > You can specify a comma-separated list of parameter names, for example:`/api/v2/appparams/1?names=name,mypar`.

#### Response

- *list*

    > Each element of the array contains the following parameters.
    >
    > - *name*, the name of the parameter.
    > - *value*, the value of the parameter.
    > - *conditions*, change the permissions of the parameters.

#### Response Example

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

#### Error Response

*E_ECOSYSTEM*

### <span id = "appparam-appid-name">appparam/{appid}/{name}</span>

[Authorization](#authorization)

**GET**/ Returns the parameter **{appid}** of the application **{name}** in the current or specified ecosystem
The information related to the

#### Request

``` text
GET
/api/v2/appparam/{appid}/{name}[?ecosystem=1]
```

- *appid*

    > Application ID.

- *name*

    > The name of the requested parameter.

- *\[ecosystem\]* [Omitempty](#omitempty)

    > Ecosystem ID (optional parameter).
    >
    > Returns the current ecosystem by default.

#### Response

- *id*

    > Parameter ID.

- *name*

    > Parameter name.

- *value*

    > The parameter value.

- *conditions*

    > Permission to change parameters.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "id": "10",
    "name": "par",
    "value": "My value",
    "conditions": "true"
} 
```

#### Error Response

*E_ECOSYSTEM, E_PARAMNOTFOUND*

### ecosystemparams 

[Authorization](#authorization)

**GET**/ Returns a list of ecosystem parameters.

#### Request

``` text
GET
/api/v2/ecosystemparams/[?ecosystem=... &names=...]
```

- *\[ecosystem\]* [Omitempty](#omitempty)

    > Ecosystem ID. if not specified, the current ecosystem ID will be returned.

- *\[names\]* [Omitempty](#omitempty)

    > List of request parameters, separated by commas.
    >
    > For example: `/api/v2/ecosystemparams/?names=name,currency,logo`.

#### Response

- *list*

    > Each element of the array contains the following parameters.
    >
    > - *name*
    >
    > > Parameter name.
    >
    > - *value*
    >
    > > Parameter value.
    >
    > - *conditions*
    >
    > > Change permissions for parameters.

#### Response Example

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
        "name": "currency",
        "value": "MY",
        "conditions": "true",
    }, 
    ]
} 
```

#### Error Response

*E_ECOSYSTEM*

### <span id = "ecosystemparam-name">ecosystemparam/{name}</span>

[Authorization](#authorization)

**GET**/ Returns information about the parameter **{name}** in the current or specified ecosystem.

#### Request

``` text
GET
/api/v2/ecosystemparam/{name}[?ecosystem=1]
```

- *name*

    > The name of the requested parameter.

- *\[ecosystem\]* [Omitempty](#omitempty)

    > The default is to return the current ecosystem ID.

#### Response

- *name*

    > Parameter name.

- *value*

    > The parameter value.

- *conditions*

    > Permission to change parameters.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
} 
```

#### Error Response

*E_ECOSYSTEM*

### <span id = "tables-limit-offset">tables/\[?limit=\... &offset=\... \]</span>

[Authorization](#authorization)

**GET**/ Returns a list of data tables for the current ecosystem. You can set the offset and the number of entries.

#### Request

- *\[limit\]* [Omitempty](#omitempty)

    > Number of entries, default 100, maximum 1000.

- *\[offset\]* [Omitempty](#omitempty)

    > Offset, default is 0.

``` text
GET
/api/v2/tables?limit=... &offset=...
```

#### Response

- *count*

    > The total number of entries in the data table.

- *list*

    > Each element of the array contains the following parameters.
    >
    > > - *name*
    > >
    > > > Data table name without prefix.
    > >
    > > - *count*
    > >
    > > > The number of entries in the data table.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
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

[Authorization](#authorization)

**GET**/ Returns information about the current ecosystem request data table.

#### Request

- *\[name\]*

    > Data table name.

``` text
GET
/api/v2/table/{table_name}
```

Returns the following field information.

- *name*

    > Data table name.

- *insert*

    > Permission to add new entries.

- *new_column*

    > Add field permissions.

- *update*

    > Change entry permissions.

- *columns*

    > Array of field-related information.
    >
    > > - *name*
    > >
    > > > Field name.
    > >
    > > - *type*
    > >
    > > > Field data type.
    > >
    > > - *perm*
    > >
    > > > Change the permissions for the field value.

### <span id = "list-name-limit-offset-columns">list/{name}\[?limit=\... &offset=\... &columns=\... \]</span>

[Authorization](#authorization)

**GET**/
Returns a list of the specified data table entries in the current ecosystem. You can set the offset and the number of entries.

#### Request

- *name*

    > Data table name.

- *\[limit\]* [Omitempty](#omitempty)

    > Number of entries, default 25 entries.

- *\[offset\]* [Omitempty](#omitempty)

    > Offset, default is 0.

- *\[columns\]* [Omitempty](#omitempty)

    > A comma-separated list of requested columns, if not specified, all columns will be returned. The id column will be returned in all cases.

``` text
GET
/api/v2/list/mytable?columns=name
```

#### Response

- *count*

    > Total number of entries.

- *list*

    > Each element of the array contains the following parameters.
    >
    > > - *id*
    > >
    > > > Entry ID.
    > >
    > > - The sequence of request columns.

#### Response Example

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

### <span id = "sections-limit-offset-lang">sections\[?limit=\... &offset=\... &lang=\]</span>

[Authorization](#authorization)

**GET**/ Returns the *sections* of the current ecosystem
List of table entries, you can set the offset and the number of entries.

If *role_access*
field contains a list of roles and does not include the current role, no record will be returned. *title*
The data in the field will be replaced by the *Accept-Language* language resource in the request header.

#### Request

- *\[limit\]* [Omitempty](#omitempty)

    > Number of entries, default 25 entries.

- *\[offset\]* [Omitempty](#omitempty)

    > Offset, default is 0.

- *\[lang\]* [Omitempty](#omitempty)

    > This field specifies the multilingual resource code or localization, e.g., *en, zh*. If the specified multilingual resource is not found, e.g., *en-US*, then the multilingual resource group in
     Search in *en*.

``` text
GET
/api/v2/sections
```

#### Response

- *count*

    > *sections* Total number of table entries.

- *list*

    > Each element of the array contains information about all columns in the actions table.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "count": "2"
    "list": [{
        "id": "1",
        "title": "Development",
       "urlpage": "develop",
       ...
    },
    ]
}
```

#### Error Response

*E_TABLENOTFOUND*

### <span id = "row-name-id-columns">row/{name}/{id}\[?columns=\]< /span>

[Authorization](#authorization)

**GET**/ Returns the entry for the specified data table in the current ecosystem. You can specify the columns to be returned.

#### Request

- *name*

    > Data table name.

- *id*

    > Entry ID.

- *\[columns\]* [Omitempty](#omitempty)

    > A comma-separated list of requested columns, if not specified, all columns will be returned. The id column will be returned in all cases.

``` text
GET
/api/v2/row/mytable/10?columns=name
```

#### Response

- *value*

    > Array of received column values
    >
    > > - *id*
    > >
    > > > Entry ID.
    > >
    > > - The sequence of request columns.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "values": {
    "id": "10",
    "name": "John",
    }
} 
```

#### Error Response

*E_NOTFOUND*

### <span id = "row-name-colorn-id">row/{name}/{column}/{id} </span>

[Authorization] (#Authorization)

**GET**/ Return to the entry of the data table specified in the current ecosystem. You can specify columns to be returned.

#### Request

- *Name *

     > Data table name.

- *colorn *

     > Data list name.

- *ID *

     > Stripe ID.

- * \ [columns \] * [omitempty] (#omitempty)

     > The list of request lists is separated by commas. If it is not specified, all columns will be returned. In all cases, the ID column will be returned.

`` `default
GET
/API/V2/ROW/MyTable/name/John? Columns = name
`` `

#### Response

- *Value *

     > Array of receiving column values
     Forecast
     > - *ID *
     >>
     >>> Strip ID.
     >>
     > - -The sequence of the request column.

#### Response Example

`` `default
200 (OK)
Content-type: Application/JSON
{{
     "Values": {
     "ID": "10",
     "name": "John",
     }
}
`` `

#### Error Response

*E_NOTFOUND*

### systemparams 

[Authorization](#authorization)

**GET**/ Returns a list of platform parameters.

#### Request

``` text
GET
/api/v2/systemparams/[?names=...]
```

- 

    *\[names\]* [Omitempty](#omitempty)

    A list of request parameters, separated by commas. For example
        `/api/v2/systemparams/?names=max_columns,max_indexes`.

#### Response

- *list*

    > Each element of the array contains the following parameters.
    >
    > > - *name*
    > >
    > > > Parameter name.
    > >
    > > - *value*
    > >
    > > > Parameter values.
    > >
    > > - *conditions*
    > >
    > > > Change the permission of the parameter.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
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

#### Error Response

*E_PARAMNOTFOUND*

### <span id = "history-name-id">history/{name}/{id}</span>

[Authorization](#authorization)

**GET**/ Returns the change record for the entry in the specified data table in the current ecosystem.

#### Request

``` text
GET
/api/v2/history?name=contracts&id=5
```

> - *name*
>
> Data Table Name.
>
> - *id*
>
> > Entry ID.

#### Response

> - *list*
>
> Each element of the array contains a change record for the requested entry.

#### Response Example

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

### <span id = "interface-page-menu-snippet-name">interface/{page|menu|snippet}/{name}</span>

[Authorization](#authorization)

**GET**/ Returns the current ecosystem in the specified data table (pages, menu or snippet) *name*
The entry for the field.

``` text
GET
/api/v2/interface/page/default_page
/api/v2/interface/menu/default_menu
/api/v2/interface/snippet/welcome
```

#### Request

- *name*

    > Specifies the name of the entry in the table.

#### Response

- *id*

    > Entry ID.

- *name*

    > Entry name.

- *other*

    > Other columns of the table.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "id": "1",
    "name": "default_page",
    "value": "P(Page content)",
    "default_menu": "default_menu",
    "validate_count": 1
} 
```

#### Error Response

*E_QUERY*, *E_NOTFOUND*

## Contract Function Interface

### <span id = "contracts-limit-offset">contracts\[?limit=\... &offset=\... \]</span>

[Authorization](#authorization)

**GET**/ Returns a list of contracts in the current ecosystem, with the ability to set offsets and the number of entries.

#### Request

- *\[limit\]* [Omitempty](#omitempty)

    > Number of entries, default 25 entries.

- *\[offset\]* [Omitempty](#omitempty)

    > Offset, default is 0.

``` text
GET
/api/v2/contracts
```

#### Response

- *count*

    > Total number of entries.

- *list*

    > Each element of the array contains the following parameters.
    >
    > > - *id*
    > >
    > > > Contract ID.
    > >
    > > - *name*
    > >
    > > > Contract name.
    > >
    > > - *value*
    > >
    > > > Contract contents.
    > >
    > > - *wallet_id*
    > >
    > > > The account address to which the contract is tied.
    > >
    > > - *address*
    > >
    > > > Contract-bound wallet address `XXXX-... -XXXX`.
    > >
    > > - *ecosystem_id*
    > >
    > > > The ecosystem ID to which the contract belongs.
    > >
    > > - *app_id*
    > >
    > > > The application ID to which the contract belongs.
    > >
    > > - *conditions*
    > >
    > > > Change the permission of the contract.
    > >
    > > - *token_id*
    > >
    > > > The ID of the ecosystem where the pass is used to pay the contract fee.

#### Response Example

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
  if(EcosysParam(`founder_account`)! =$key_id)
  {
      warning `Sorry, you dont have access to this action.`
    }
  }
}",
"address": "0000-0000-0000-0000-0000-0000",
"conditions": "ContractConditions(`MainCondition`)"        
 }, 
...
  ]
} 
```

### <span id = "contract-name">contract/{name}</span>

[Authorization](#authorization)

**GET**/ Returns information about the specified contract. The default is to query the contract in the current ecosystem.

#### Request

- *name*

    > Contract name.

``` text
GET
/api/v2/contract/mycontract
```

#### Response

- *id*

    > Contract ID in VM.

- *name*

    > Contract name with ecosystem ID `@1MainCondition`.

- *state*

    > The ecosystem ID of the contract.

- *walletid

    > The address of the account to which the contract is tied.

- *tokenid*

    > The ecosystem ID of the pass that is used to pay for the contract.

- *address*

    > Contract-bound wallet address `XXXX-... -XXXX`.

- *tableid*

    ID of the entry in the > *contracts* table where the contract is located.

- *fields*
- 

    > The array contains structural information for each parameter of the contract **data** section.
    >
    > > - *name*
    > >
    > > > Parameter name.
    > >
    > > - 
    > >
    > > *type*
    > >
    > > Parameter type.
    > >
    > > - *optional*
    > >
    > > > Parameter options, \`true\` means optional parameters, \`false\` means mandatory parameters.

#### Response Example

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

#### Error Response

*E_CONTRACT*

### sendTX 

[Authorization](#authorization)

**POST**/
Receives the transactions in the parameters and adds them to the transaction queue, returning a transaction hash if the request is executed successfully. This hash yields the corresponding transaction within the block and is included in the error text message in case of an Error Response.

#### Request

- *tx_key*

    > Transaction content, this parameter can specify any name and supports receiving multiple transactions.

``` text
POST
/api/v2/sendTx

Headers:
Content-Type: multipart/form-data

Parameters:
tx1 - Transaction 1
txN - Trading N
```

#### Response

- *hashes*

    > Transaction hash arrays.
    >
    > > - *tx1*
    > >
    > > > Trading 1 hash.
    > >
    > > - *txN*
    > >
    > > > Trading N's hash.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "hashes": {
        "tx1": "67afbc435634..... ",
        "txN": "89ce4498eaf7..... ",
}
```

#### Error Response

*E_LIMITTXSIZE*,*E_BANNED*

### txstatus 

[Authorization](#authorization)

**POST**/
Returns the block ID and error message for the specified transaction hash. If the return values for the block ID and error text message are null, then the transaction is not yet contained in the block.

#### Request

- *data*

    > JSON list of transaction hashes.

``` text
{"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

``` text
POST
/api/v2/txstatus/
```

#### Response

- *results*

    > The transaction hash is used as the key and the transaction detail is used as the value in the data dictionary.
    >
    > *hash*
    >
    > > Trading Hash.
    > >
    > > - *blockid*
    > >
    > > If the transaction execution succeeds, the block ID is returned; if the transaction execution fails, the
    > > > *blockid* for [0]{.title-ref}.
    > >
    > > - *result*
    > >
    > > > Returns the result of the transaction via the **\$result** variable.
    > >
    > > - *errmsg*
    > >
    > > Returns an error text message if the execution of the transaction fails.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{ "results":
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

#### Error Response

*E_HASHWRONG, E_HASHNOTFOUND*

### <span id = "txinfo-hash">txinfo/{hash}</span>

This request does not require login authorization.

**GET**/

Returns information about the transaction for the specified hash, including the block ID and the number of confirmations. Also returns the contract name and its associated parameters, if optional parameters are specified.

#### Request

- *hash*

    > Transaction hash.

- *\[contractinfo\]* [Omitempty](#omitempty)

    > Contract detail parameter identifier, to get the contract details related to this transaction, specify `contractinfo=1`.

``` text
GET
/api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1
```

#### Response

- *blockid*

    > If the value is `0`, then no transaction was found for that hash.

- *confirm*

    > The number of acknowledgements for this block *blockid*.

- *data* [Omitempty](#omitempty)

    > If `contentinfo=1` is specified, the contract details are returned to this parameter.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "blockid": "9",
    "confirm": 11,
    "data": {
        "block": "9",
        "contract": "@1NewContract",
        "params": {
            "ApplicationId": 1,
            "Conditions": "true",
            "Value": "contract crashci4b {\n\t\t\tdata {}\n\t\t\t}"
        }
    }
}
```

#### Error Response

*E_HASHWRONG*

### txinfoMultiple

This request does not require login authorization.

**GET**/ 

Returns the transaction-related information for the specified hash.

#### Request

- *data*
    - *hashes*
    > A list of transaction hashes.

- *\[contractinfo\]* [Omitempty](#omitempty)

    > Contract detail parameter identifier, to get the contract details related to this transaction, specify `contractinfo=1`.

``` text
data: {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

``` text
GET
/api/v2/txinfoMultiple
```

#### Response

- *results*

    > The transaction hash is used as the key and the transaction detail is used as the value in the data dictionary.
    >
    > > *hash*
    > >
    > > > Trading Hash.
    > >
    > > > *blockid*
    > >
    > If the value is `0`, then no transaction was found for that hash.
    > >
    > > > *confirm*
    > >
    > > > Number of acknowledgements for this block *blockid*.
    > >
    > > > *data*
    > >
    > > > If `contentinfo=1` is specified, the contract details are returned to this parameter.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{ "results":
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

#### Error Response

*E_HASHWRONG*

### <span id = "page-validators-count-name">/page/validators_count/{name}</span>
This request does not require login authorization.

**GET**

Returns the number of nodes to be validated for the specified page.

#### Request

- *name*

    > Page name with ecosystem ID in the format `@ecosystem_id%%page_name%`, for example
    > `@1main_page`.
    > If you don't have an ecosystem ID, then search in the first ecosystem page by default

``` text
GET
/api/v2/page/validators_count/@2page_name
```

#### Response

- *validate_count*

    > Specifies the number of nodes to be validated for the page.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

#### Error Response

*E_NOTFOUND, E_SERVER*

### <span id = "content-menu-page-name">content/menu\|page/{name}</span>

[Authorization](#authorization)

**POST**

Returns a tree of code JSON objects for the specified page or menu name, which is the result of processing by the template engine.

#### Request

- *name*

    > Page name or menu name with ecosystem ID in the format `@ecosystem_id%%page_name%`, for example
    > `@1main_page`.
    > If no ecosystem ID is included, then search for the current ecosystem page or menu by default

``` text
POST
/api/v2/content/page/default
```

#### Response

- *menu* || *title*

    > request *content/page/\...* The name of the menu to which the page belongs when requesting it.

- *menutree*

    > request *content/page/\...* The page's menu JSON object tree when requested.

- *title*--head for the menu *content/menu/\...*

    > request *content/menu/\...* Menu title when requested.

- *tree*

    > Page or menu JSON object tree.

#### Response Example

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

#### Error Response

*E_NOTFOUND*

### <span id = "content-source-name">content/source/{name}</span>

[Authorization](#authorization)

**POST**

Returns a tree of coded JSON objects for the specified page name. Does not execute any functions or receive any data. The returned JSON object tree corresponds to the page template and can be used in the visual page designer. If the page is not found, a 404 error is returned.
Request """""""

- *name*

    > Page name with ecosystem ID in the format `@ecosystem_id%%page_name%`, for example
    > `@1main_page`.
    > If no ecosystem ID is included, then search for the current eco-page by default.

#### Response

``` text
POST
/api/v2/content/source/default
```

- *tree*

    > JSON object tree of the page.

#### Response Example

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

#### Error Response

*E_NOTFOUND, E_SERVER*

### <span id = "content-hash-name">content/hash/{name}</span>

**POST** 

Returns a SHA256 hash of the specified page name, or a 404 error if the page cannot be found.

This request does not require login authorization. To receive the correct hash when making requests to other nodes, you must also pass
*ecosystem,keyID,roleID,isMobile*
parameter. To receive pages from other ecosystems, the ecosystem ID must be prefixed to the page name. For example: `@2mypage`.

#### Request


``` text
POST
/api/v2/content/hash/default
```
- *name*

    > The name of the page with the ecosystem ID.

- *ecosystem*

    > Ecosystem ID.

- *keyID*

    > Account address.

- *roleID*

    > Role ID.

- *isMobile*

    > The parameter identification of the mobile platform.



#### Response

- *hash*

    > Hexadecimal hash.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
} 
```

#### Error Response

*E_NOTFOUND, E_SERVER, E_HEAVYPAGE*

### content

**POST**

Returns the number of JSON objects for the page code from the **template** parameter, if the optional parameter
**source** is specified as
`true or 1`, then this JSON object tree does not perform any functions and receive data. This JSON object tree can be used in the visual page designer.

This request does not require login authorization.

#### Request

- *template*

    > Page code.

- *\[source\]*

    > If `true or 1` is specified, the JSON object tree does not perform any functions and receives data.

``` text
POST
/api/v2/content
```

#### Response

- *tree*

    > JSON object tree.

#### Response Example

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

#### Error Response

*E_NOTFOUND, E_SERVER*

### maxblockid

**GET**/ Returns the highest block ID on the current node.

This request does not require login authorization.

#### Request

``` text
GET
/api/v2/maxblockid
```

#### Response

- *max_block_id*

    > The highest block ID on the current node.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "max_block_id" : 341,
}
```

#### Error Response

*E_NOTFOUND*

### <span id = "block-id">block/{id}</span>

**GET**/ Returns information about the specified block ID.

This request does not require login authorization.

#### Request

- *id*

    > Block ID.

``` text
POST
/api/v2/block/32
```

#### Response

- *hash*

    > Block hash.

- *key_id*

    > The address of the account that signed the block.

- *time*

    > Block generation timestamp.

- *tx_count*

    > Total number of transactions in the block.

- *rollbacks_hash*

    > Block rollback hash.

- *node_position*

    > The position of the block in the honor node list.

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "hash": "1x4S5s/zNUTopP2YK43SppEyvT2O4DW5OHSpQfp5Tek=",
    "key_id": -118432674655542910,
    "time": 1551145365,
    "tx_count": 3,
    "rollbacks_hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "node_position": 0,
} 
```

#### Error Response

*E_NOTFOUND*

### <span id = "avatar-ecosystem-member">avatar/{ecosystem}/{member}</span>

**GET**/ Returns the avatar of the user in the *member* table (available without login).

#### Request

- *ecosystem*

    > Ecosystem ID.

- *member*

    > The user's account address. (xxxx-... -xxxx)

``` text
GET
/api/v2/avatar/1/1234-2134-... -4321
```

#### Response

The request header *Content-Type* is the image type and the image data is returned in the response body.

#### Response Example

``` text
200 (OK)
Content-Type: image/png  
```

#### Error Response

*E_NOTFOUND* *E_SERVER*

### <span id = "config-centrifugo">config/centrifugo</span>

**GET**/ Returns the host address and port of centrifugo.

This request does not require login authorization.

#### Request

``` text
GET
/api/v2/config/centrifugo
```

#### Response

Response result format `http://address:port`, e.g.: `http://127.0.0.1:8100`.

#### Error Response

*E_SERVER*

### updnotificator

**POST**/

(Discarded)

Sends all messages that have not yet been sent to the centrifugo notification service. Sends only messages for the specified ecosystem and members.

This request does not require login authorization.

#### Request

- *id*

    > Member's account address.

- *ecosystem*

    > Ecosystem ID.

``` text
POST
/api/v2/updnotificator
```

#### Response Example

``` text
200 (OK)
Content-Type: application/json
{
    "result": true
} 
```

### Special instructions

#### Omitempty
If the field has an omitempty attribute, it means that the field is an optional parameter

#### Authorization
If the interface with Authorization tag, that this interface requires login authorization, add Authorization to the request header, example.

key = Authorization
value = "Bearer + [login token](#login)"

``` text
Authorization Bearer eyJhbGciOiJI..... kBZgGIlPhfXNZJ73RiZtM
```