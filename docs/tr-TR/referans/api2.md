# RESTful API v2

All functions provided by Weaver, including authentication, ecosystem data reception, error handling, database table operations, pages and contracts implementation are available by using IBAX's REST API.

With REST API, developers can access all platform functions without using Weaver.

API command calls are executed by addressing `/api/v2/command/[param]`, where `command` is the command name and `param` is an additional parameter. The request parameters must be sent in the format `Content-Type: x-www-form-urlencoded`. The server response result is in JSON format.


* [Error handling](#error-handling)
    * [Error list](#error-list)

* [Authentication](#authentication)
    * [getuid](#getuid)
    * [login](#login)

* [APIs unavailable to CLB](#apis-unavailable-to-clb)

* [Service commands](#service-commands)
    * [version](#version)

* [Data request functions](#data-request-functions)
    * [balance](#balance)
    * [blocks](#blocks)
    * [detailed blocks](#detailed-blocks)
    * [/data/{table}/{id}/{column}/{hash}](#data-table-id-column-hash)
    * [keyinfo](#keyinfo)

* [Get metrics](#get-metrics)
    * [keys](#keys)
    * [blocks](#blocks)
    * [transactions](#transactions)
    * [ecosystems](#ecosystems)
    * [fullnodes](#fullnodes)

* [Ecosystem](#ecosystem)
    * [ecosystemname](#ecosystemname)
    * [ecosystems](#ecosystems)
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


## Error handling

If the request is executed successfully, a status code `200` is returned. If an error occurs, in addition to the error status, a JSON object with the following fields will be returned:

* error

Error identifier. 

* msg

The text returned in case of an error.

* params

Additional parameters of the error, which may be contained in the text returned in case of an error. 

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

### Error list

> E_CONTRACT

contract `%s` does not exist

> E_DBNIL

Blank database

> E_DELETEDKEY

Account address suspended 

> E_ECOSYSTEM

Ecosystem `%d` does not exist

> E_EMPTYPUBLIC

Invalid public key for the account 

> E_KEYNOTFOUND

Account address not found 

> E_HASHWRONG

Wrong hash 

> E_HASHNOTFOUND

Has not found 

> E_HEAVYPAGE

Too many pages loaded 

> E_INVALIDWALLET

Invalid wallet address `%s` 

> E_LIMITTXSIZE

Size of a transaction out of limit

> E_NOTFOUND

Page or menu content not found

> E_PARAMNOTFOUND

Parameter not found 

> E_PERMISSION

No permission 

> E_QUERY

Database query error 

> E_RECOVERED

The API has an panic error.
Return an error if has a panic error.
It means you had encountered a bug to be located and fixed.

> E_SERVER

Server error. 
If there is an error in the golang library function, it returns. The msg field contains the text in returned in case of an error.

An **E_SERVER** error may occur in response to any command. If it occurs due to incorrect input parameters, you can change it to a related error. In another case, this error reports invalid operation or incorrect system configuration, which requires a more detailed investigation report.

> E_SIGNATURE

Incorrect signature 

> E_STATELOGIN

`%s` is not a member of the ecosystem `%s`

> E_TABLENOTFOUND

Table `%s` not found 

> E_TOKENEXPIRED

Session `%s` has expired

> E_UNAUTHORIZED

Unauthorized.

If not logged in or the session expired, any command except `getuid, login` will return an E_UNAUTHORIZED error.

> E_UNKNOWNUID
Unknown UID

> E_UPDATING

The node is updating the blockchain

> E_STOPPING

The node has stopped

> E_NOTIMPLEMENTED

Not yet implemented

> E_BANNED

The account address is forbidden in `%s`

> E_CHECKROLE

Access denied

## APIs unavailable to CLB
Interface request unavailable to the CLB node:
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

## Authentication
[JWT token](#https://jwt.io/) is used for authentication. After receiving the JWT token, it must be placed in each request header: `Authorization: Bearer TOKEN_HERE`.

### getuid
GET/ returns a unique value, signed it with the private key, and then sent it back to the server using the [login](#login) command.

To generate a temporary JWT token, you need to pass the token to **Authorization** when calling **login**.

#### Request
> GET /api/v2/getuid

#### Response

* uid

Signature numbers.

* token

Temporary token passed during login.

Lifetime of a temporary token is 5 seconds.

* network_id

 Server identifier.

 If authorization is not required, the following information will be returned: 

* expire

 Expiration time.

* ecosystem

 Ecosystem ID.

* key_id

 Account address.

* address

 Wallet address `XXXX-XXXX-.....-XXXX`.

#### Response example

200 (OK)

Content-Type: application/json

```json
{
    "uid": "4999317241855959593",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE",
    "network_id": "4717243765193692211"
}
```

#### Error response
E_SERVER

### login
POST/ Authentication of user identity.

The **getuid** command should be called first to receive a unique value and sign it. The temporary JWT token of getuid needs to be passed in the request header.

If the request was successful, the token received in the response is included in **Authorization**.

#### Request
> POST /api/v2/login

* [ecosystem]

 Ecosystem ID.

 If not specified, ID of the first ecosystem by default.

* [expire]

 Lifetime of the JWT token, in seconds, 28800 by default.

* [pubkey]

 Hexadecimal public key of the account.

* [key_id]

 Account address `XXXX-...-XXXX`.

 Use this parameter when the public key is already stored in the blockchain. It cannot be used with the pubkey parameter at the same time.

* signature

 UID signature received through getuid.

#### Response
* token

    JWT token.

* ecosystem

    Ecosystem ID.

* key_id

    Account address ID

* address

    Wallet address `XXXX-XXXX-.....-XXXX`.

* notify_key

    Notification ID.

* isnode

    Whether the account address is the owner of the node. Value: `true,false`.

* isowner

    Whether the account address is the creator of the ecosystem. Value: `true,false`.

* obs

    Whether the registered ecosystem is CLB. Value: `true,false`.

#### Response example

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

#### Error response

E_SERVER, E_UNKNOWNUID, E_SIGNATURE, E_STATELOGIN, E_EMPTYPUBLIC

## Service commands
### version

GET/ Returns the version of the current server.

Login authorization is not required for this request.

#### Request
> GET /api/v2/version

#### Response example
```
200 (OK)
Content-Type: application/json
"1.2.6"
```

## Data request functions

### balance

GET/ Request the balance of the account address in the current ecosystem.

#### Request

> GET /api/v2/balance/{wallet}

* wallet

 Address identifier. You can specify it in any format `int64, uint64, XXXX-...-XXXX`. This address will be queried in the ecosystem the user is currently logged in. 

#### Response

* amount

    Account balance of the smallest unit.

* money

    Account balance.

#### Response example

200 (OK)

Content-Type: application/json

```json
{
 "amount": "877450000000000",
 "money": "877.45"
}
```

#### Error response
E_SERVER, E_INVALIDWALLET

### blocks
GET/ returns a list containing additional information related to transactions in each block.
Login authorization is not required for this request.

#### Request
> GET /api/v2/blocks
* block_id

 Height of the starting block to be queried.

* count

 Number of blocks

#### Response

* Block height

    The list of transactions in the block and the additional information of each transaction:
    * hash

        Transaction hash.
    * contract_name

        Contract name.
    * params

        An array of contract parameters.
    * key_id

        For the first block, account address of the first block that signed the transaction.
        For all other blocks, address of the account that signed the transaction.
#### Response example
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

#### Error response

E_SERVER, E_NOTFOUND

### detailed blocks

GET/ returns a list containing detailed additional information related to transactions in each block.

Login authorization is not required for this request.

#### Request
> GET /api/v2/detailed_blocks

#### Response
* Block height
    * Block header

        The block header contains the following fields:
        * block_id

            Block height.
        * time

            Block generation timestamp.
        * key_id

            The address of the account that signed the block.
        * node_position

            The position of the node that generates the block in the list of honor nodes.
        * version

            Block structure version.
    * hash

        Block hash.
    * node_position

        Position of the node that generated the block in the list of honor nodes.
    * key_id

        Address of the account that signed the block.
    * time

        Block generation timestamp.
    * tx_count

        Number of transactions in the block.
    * rollback_hash

        Block rollback hash.
    * mrkl_root

        Merkel tree of transactions of the block.
    * bin_data

        Serialization of the block header, all transactions in the block, the previous block hash, and the private key of the node that generated the block.
    * sys_update

        Does the block contain transactions to update system parameters.
    * Transaction

        The list of transactions in the block and the additional information of each transaction:
        * hash

            Transaction hash.
        * contract_name

            Contract name.
        * params

            Contract parameters.
        * key_id

            Address of the account that signed the transaction.
        * time

            Transaction generation timestamp.
        * type

            Transaction type.

#### Response example

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
#### Error response
E_SERVER, E_NOTFOUND

### <span id = "data-table-id-column-hash">/data/{table}/{id}/{column}/{hash}</span>
GET/ If the specified hash matches the data in the specified table, field and record, this request will return the data. Otherwise, an error is returned.

Login authorization is not required for this request.

#### Request
> GET /data/{table}/{id}/{column}/{hash}

* table

    Table name.
* id

    Record ID.
* column

    Field name.
* hash

    Hash of the requested data.

#### Response
Binary data

### keyinfo
GET/ returns a list of ecosystems, including roles registered with the specified address.
Login authorization is not required for this request.

#### Request
> GET /api/v2/keyinfo/{key_id}

* key_id

    Address identifier, you can specify it any format `int64, uint64, XXXX-...-XXXX`.

    Request queried in all ecosystems.
#### Response
* ecosystem

    Ecosystem ID.
* name

    Ecosystem name.
* roles

    A list of roles with the id and name fields.
#### Response example

200 (OK)

Content-Type: application/json

```json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Admin"},{"id":"2","name":"Developer"}]
}]
```
#### Error response
E_SERVER, E_INVALIDWALLET

## Get metrics

### keys

GET/ Returns the number of account addresses.

#### Request

> GET /api/v2/metrics/keys

#### Response example

200 (OK)

Content-Type: application/json

```json
{
    "count": 28
}
```

### blocks
GET/ Returns the number of blocks.

#### Request
> GET /api/v2/metrics/blocks

#### Response example

200 (OK)

Content-Type: application/json

```json
{
 "count": 28
}
```

### transactions
GET/ Returns the total number of transactions.

#### Request
> GET /api/v2/metrics/transactions

#### Response example

200 (OK)

Content-Type: application/json

```json
{
 "count": 28
}
```
### ecosystems
GET/ Returns the number of ecosystems.

#### Request
> GET /api/v2/metrics/ecosystems

#### Response example

200 (OK)

Content-Type: application/json

```json
{
    "count": 28
}
```

### fullnodes
GET/ returns the number of honor nodes.

> GET /api/v2/metrics/fullnodes

#### Response example

200 (OK)

Content-Type: application/json

```json
{
    "count": 28
}
```

## Ecosystem
### ecosystemname

GET/ returns the name of the ecosystem by its identifier.
Login authorization is not required for this request.

#### Request
> GET /api/v2/ecosystemname?id=..

* id

    Ecosystem ID.

#### Response example

200 (OK)

Content-Type: application/json

```json
{
    "ecosystem_name": "platform_ecosystem"
}
```

#### Error response

E_PARAMNOTFOUND

### ecosystems
GET/ Returns the number of ecosystems.

> GET /api/v2/ecosystems/

#### Response
* number

 The number of ecosystems installed.

#### Response example

200 (OK)

Content-Type: application/json

```json
{
    "number": 100,
}
```

### <span id = "appparams-appid">appparams/{appID}</span>
GET/ Returns a list of application parameters in the current or specified ecosystem.

#### Request
> GET /api/v2/appparams

* [appid]

    Application ID.
* [ecosystem]

    Ecosystem ID. If not specified, the parameters of the current ecosystem will be returned.
* [names]

    List of parameters received. 
    You can specify the list of parameter names separated by commas. For example: `/api/v2/appparams/1?names=name,mypar`.
#### Response
* list
  
    Each element in the array contains the following parameters:
    * name, parameter name;
    * value, parameter value;
    * conditions, permission to change parameters.

#### Response example

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

#### Error response
E_ECOSYSTEM

### <span id = "appparam-appid-name">appparam/{appid}/{name}</span>
GET/ Returns information related to the parameter {name} of the application {appid} in the current or specified ecosystem.

#### Request
> GET /api/v2/appparam/{appid}/{name}[?ecosystem=1]

* appid

    Application ID.
* name

    Name of the parameter requested.
* [ecosystem]

    Ecosystem ID (optional parameter).
    Returns the current ecosystem by default.
#### Response

* id

    Parameter ID.
* name

    Parameter name.
* value

    Parameter value.
* conditions

    Permission to change parameters.

#### Response example
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
#### Error response
E_ECOSYSTEM, E_PARAMNOTFOUND

### ecosystemparams
GET/ Returns the list of ecosystem parameters.

#### Request
> GET /api/v2/ecosystemparams/[?ecosystem=...&names=...]

* [ecosystem]

    Ecosystem ID. If not specified, the current ecosystem ID will be returned.

* [names]
    List of request parameters, separated by commas.

    For example: `/api/v2/ecosystemparams/?names=name,currency,logo*`.

#### Response
* list

    Each element in the array contains the following parameters:
* name

    Parameter name.
* value

    Parameter value.
* conditions

    Permission to change parameters.

#### Response example
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
#### Error response
E_ECOSYSTEM

### <span id = "ecosystemparam-name">ecosystemparam/{name}</span>

GET/ Returns information related to the parameter {name} in the current or specified ecosystem.

#### Request
> GET /api/v2/ecosystemparam/{name}[?ecosystem=1]
* name

    Name of the request parameter.
* [ecosystem]

    You can specify the ecosystem ID. By default, the current ecosystem ID is returned.
#### Response
* name

    Parameter name.
* value

    Parameter value.
* conditions

    Permission to change the parameters.

#### Response example
200 (OK)
Content-Type: application/json

```json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
}
```

#### Error response
E_ECOSYSTEM

### <span id = "tables-limit-offset">tables/[?limit=…&offset=…]</span>

GET/ Returns the list of tables of the current ecosystem, where you can set the offset and the number of entries.

#### Request
* [limit]

    Number of entries, 25 by default.
* [offset]

    Offset, 0 by default.
> GET /api/v2/tables

#### Response
* count

    Total entries in the table.
* list

    Each element in the array contains the following parameters:
* name

    Table name without the prefix.
* count

    Number of entries in the table.

#### Response example

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
GET/ Returns information related to the table requested by the current ecosystem.
Returns the following field information:

* name

    Table name.
* insert

    Permission to add new entries.
* new_column

    Permission to add new fields.
* update

    Permission to change entries.
* columns

    An array of field related information:
* name

    Field name.
* type

    Field data type.
* perm

    Permission to change the value of this field.

#### Request
> GET /api/v2/table/mytable

* name

    Table name without the ecosystem prefix.
#### Response
* name

    Table name without the ecosystem prefix.
* insert

    Permission to add new entries.
* new_column

    Permission to add new fields.
* update

    Permission to change entries.
* conditions

    Permission to change table configuration.
* columns

    An array of field related information:
* name

    Field name.
* type

    Field data type.
* perm

    Permission to change the value of this field.
#### Response example

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

#### Error response
E_TABLENOTFOUND

### <span id = "list-name-limit-offset-colums">list/{name}[?limit=…&offset=…&columns=…]</span>

GET/ Returns the list of specified table entries in the current ecosystem, and where you can set the offset and the number of entries.

#### Request

* name

    Table name.
* [limit]

    The number of entries, 25 by default.
* [offset]

    Offset, 0 by default.
* [columns]

    List of requested columns, separated by commas. If not specified, all columns will be returned. In call cases, the id column is returned.
> GET /api/v2/list/mytable?columns=name

#### Response

* count

    Total entries.
* list

    Each element in the array contains the following parameters:
* id

    Entry ID.
    Sequence of requested columns.

#### Response example

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

GET/ Returns the list of entries in table sections of the current ecosystem, and where the offset and number of entries can be set.

If the role_access field contains a list of roles and does not include the current role, no record will be returned. The data in the title field will be replaced by the Accept-Language language resource in the request header.

#### Request

* [limit]

    Number of entries, 25 by default.
* [offset]

    Offset, 0 by default.
* [lang]

    This field specifies the language resources or localization code, for example: en, zh. If find no language resources specified, for example: en-US, then, search in the language resources group en.

> GET /api/v2/sections

#### Response

* count

    Total number of entries in table sections.
* list

    Each element in the array contains the information of all columns in the table sections.

#### Response example
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

#### Error response
E_TABLENOTFOUND

### <span id = "row-name-id-colums">row/{name}/{id}[?columns=]</span>
### 

GET/ Returns the entry of the specified table in the current ecosystem. You can specify the column(s) to be returned.

#### Request
* name

    Table name.
* id

    Entry ID.
* [columns]

    List of requested columns, separated by commass. If not specified, all columns will be returned. In all cases, the id column is returned.

> GET /api/v2/row/mytable/10?columns=name

#### Response

* value

    An array of values of the requested columns
    * id

    Entry ID.
    * Sequence of requested columns. 

#### Response example

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

#### Error response
E_NOTFOUND

### systemparams
GET/ Returns the list of platform parameters.

#### Request
> GET /api/v2/systemparams/[?names=...]

* [names]

    A list of request parameters, separated by commass. For example, /api/v2/systemparams/?names=max_columns,max_indexes.
#### Response
* list

    Each element in the array contains the following parameters:
    * name

        Parameter name.
* value

    Parameter value.
* conditions

    Permissions to change the parameter.

#### Response example
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
#### Error response
E_PARAMNOTFOUND

### <span id = "history-name-id">history/{name}/{id}</span>
GET/ Returns the change record of the entry in the specified table in the current ecosystem.

#### Request
* name

    Table name.
* id

    Entry ID.

#### Response
* list

    Each element in an array, the elements of which contain modified parameters of the requested entry.

#### Response example

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
GET/ Returns the entry of the name field in the specified table (pages, menu or blocks) of the current ecosystem.

> GET /api/v2/interface/page/default_page
#### Request
* name

    Name of the entry specified in the table.
#### Response
* id

    Entry ID.
* name

    Entry name.
* other

    Other columns of the table.
#### Response example

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

#### Error response
E_QUERY, E_NOTFOUND

## Contract functions

### <span id = "contracts-limit-offset">contracts[?limit=…&offset=…]</span>
GET/ Returns the list of contracts in the current ecosystem, and can set the offset and number of entries.

#### Request
* [limit]

    Number of entries, 25 by default.
* [offset]

    Offset, 0 by default.
> GET /api/v2/contracts

#### Response
* count

    Total number of entries.
* list

    Each element in the array contains the following parameters:
    * id

        Contract ID.
    * name

        Contract name.
    * value

        Contract content.
    * wallet_id

        Account address bound to the contract.
    * address

        Wallet address `XXXX-...-XXXX` bound to the contract.
    * ecosystem_id

        ID of the ecosystem which the contract belongs.
    * app_id

        ID of the application which the contract belongs.
    * conditions

        Permissions to change the contract.
    * token_id

        ID of the ecosystem where the token used to pay the contract fee is located.
#### Response example

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
GET/ Returns the relevant information of the specified contract. By default, the contract is queried in the current ecosystem.

#### Request
* name

    Contract name.
> GET /api/v2/contract/mycontract

#### Response
* id

    Contract ID in VM.
* name

    Contract name `@1MainCondition` with the ecosystem ID.
* state

    ID of the ecosystem which the contract belongs.
* walletid

    Account address bound to the contract.
* tokenid

    As the ID of the ecosystem where the token used to pay the contract fee is located.
* address

    Wallet address `XXXX-...-XXXX` bound to the contract.
* tableid

    Entry ID of the contract in the contracts table.
* fields

    The array contains the structure information of each parameter in the data section of the contract:
    * name

    Parameter name.
    * type

    Parameter type.
    * optional

    Parameter option, true means optional parameter, false means mandatory parameter.
#### Response example

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

#### Error response
E_CONTRACT

### sendTX
POST/ Receive the transaction in the parameter and add it to the transaction queue. If the request is executed successfully, the transaction hash is returned. With the hash, you can obtain the corresponding transaction in the block. When an error response occurs, the hash is included in the error text message.

#### Request
* tx_key

    Transaction content. You can specify any name and supports receiving multiple transactions with this parameter.
> POST /api/v2/sendTx
```
Headers:
Content-Type: multipart/form-data
Parameters:
tx1 - transaction 1
txN - transaction N
```

#### Response
* hashes

    Array of transaction hashes:
* tx1

    Hash of transaction 1.
* txN

    Hash of transaction N.

#### Response example
200 (OK)
Content-Type: application/json


```json
{
    "hashes": {
    "tx1": "67afbc435634.....",
    "txN": "89ce4498eaf7.....",
}
```
#### Error response
E_LIMITTXSIZE,*E_BANNED*

### txstatus
POST/ Returns the block ID and error message of the specified transaction hash. If the return value of the block ID and error text message is empty, the transaction has not been included in the block.

#### Request
* data
    JSON list of transaction hashes.
    ```
    {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
    ```
> POST /api/v2/txstatus/

#### Response
* results
    In the data dictionary, transaction hash as the key, while the transaction detail as the value.

    hash

    Transaction hash.

    * blockid

    If the transaction is executed successfully, the block ID is returned; if failed to execute the transaction, the blockid is 0.
    * result

    Return the transaction result through the $result variable.
    * errmsg

    If failed to execute the transaction, an error text message will be returned.

#### Response example
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

#### Error response
E_HASHWRONG, E_HASHNOTFOUND

### <span id = "txinfo-hash">txinfo/{hash}</span>
GET/ Returns the information of the specified hash correlating to the transaction, including the block ID and the number of confirmations. If optional parameters are specified, the contract name and related parameters can also be returned.

#### Request
* hash

    Transaction hash.
* [contractinfo]

    Detailed contract parameter identifier. To obtain contract details correlating to the transaction, specify `contractinfo=1`.
> GET /api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1

#### Response
* blockid

    Contains the block ID of the transaction. If the value is `0`, no transaction with this hash can be found.
* confirm

    Number of confirmations of the block blockid.
* data
 
    If `contentinfo=1` is specified, the contract details will be returned to this parameter.

#### Response example
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

#### Error response
E_HASHWRONG

### txinfoMultiple/
GET/ Returns the information of the specified hash correlating to a transaction.

#### Request
* hash

    List of transaction hashes.
* [contractinfo]

    Detailed contract parameter identifier. To obtain contract details related to the transaction, specify `contractinfo=1`.
    ```
    {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
    ```
> GET /api/v2/txinfoMultiple/

#### Response
* results

    In the data dictionary, transaction hashes as the key and transaction details as the value.

    hash

    Transaction hash.

    blockid

    Block ID containing the transaction. If the value is `0`, no transaction with this hash can be found.

    confirm

    Number of confirmations of the block blockid.

    data

    If `contentinfo=1` is specified, the contract details will be return to this parameter.

#### Response example

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

#### Error response
E_HASHWRONG

### <span id = "page-validators_count-name">/page/validators_count/{name}</span>
GET/ Returns the number of nodes required to verify the specified page.

#### Request
* name

    Page name with ecosystem ID in a format: `@ecosystem_id%%page_name%`. For example `@1main_page`.
> GET /api/v2/page/validators_count/@1page_name

#### Response

* validate_count

    Number of nodes required to verify the specified page

#### Response example
```
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

#### Error response
E_NOTFOUND, E_SERVER

### <span id = "content-menu-page-name">content/menu|page/{name}</span>
POST/ Returns the JSON object tree of the code of specified page or menu name, which is the result of the template engine processing.

#### Request
* name

    Page or menu name.
> POST /api/v2/content/page/default

#### Response
* menu
 
    Menu name of the page when requesting content/page/…
* menutree

    A JSON object tree of the page menu when requesting content/page/…
* title–head for the menu content/menu/…

    Menu name when requesting content/menu/...
* tree

    A JSON object tree of a page or menu.
#### Response example

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

#### Error response
E_NOTFOUND

### <span id = "content-source-name">content/source/{name}</span>
POST/ Returns the JSON object tree of the specified page name code. Does not execute any function or receive any data. The returned JSON object tree corresponds to the page template and can be used in the visual page designer. If the page cannot be found, a 404 error is returned. Request """""""

* name

    Page name.
#### Response

> POST /api/v2/content/source/default

* tree

    A JSON object tree of the page.
#### Response example

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

#### Error response
E_NOTFOUND, E_SERVER

### <span id = "content-hash-name">content/hash/{name}</span>
POST/ Returns the SHA256 hash of the page name specified , or 404 error if the page cannot be found.

Login authorization is not required for this request. To receive the correct hash when making a request to other nodes, you must also pass the ecosystem, keyID, roleID, isMobile parameters. To receive pages from other ecosystems, the ecosystem ID must be prefixed to the page name. For example: `@2mypage`.

#### Request
* name

    Page name with the ecosystem ID.
* ecosystem

    Ecosystem ID.
* keyID

    Account address.
* roleID
 
    Role ID.
* isMobile

    Parameter identifier of the mobile platform.
> POST /api/v2/content/hash/default

#### Response
* hex

    Hexadecimal hash.

#### Response example
```
200 (OK)
Content-Type: application/json
{
 "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
}
```
#### Error response
E_NOTFOUND, E_SERVER, E_HEAVYPAGE

### content
POST/ The number of JSON objects that return the page code from the template parameter. If the optional parameter source is specified as `true` or `1`, the JSON object tree does not execute any function and data received. The JSON object tree can be used in the visual page designer.

Login authorization is not required for this request.

#### Request
* template

    The page code.
* [source]

    If specified as `true` or `1`, the JSON object tree does not execute any function and data received.
> POST /api/v2/content

#### Response

* tree

    JSON object tree.
#### Response example

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

#### Error response
E_NOTFOUND, E_SERVER

### maxblockid
GET/ Returns the ID of the highest block on the current node.

Login authorization is not required for this request.

#### Request

> GET /api/v2/maxblockid

#### Response
* max_block_id

    ID of the highest block on the current node.
#### Response example

200 (OK)

Content-Type: application/json

```json
{
    "max_block_id" : 341,
}
```
#### Error response
E_NOTFOUND

### <span id = "block-id">block/{id}</span>
GET/ Returns relevant information of the block with the ID specified.

Login authorization is not required for this request.

#### Request
* id
    Block ID.
> POST /api/v2/block/32

#### Response
* hash

    Hash of the block.
* key_id

    Address of the account that signed the block.
* time

    Block generation timestamp.
* tx_count

    Total number of transactions in the block.
* rollbacks_hash

    Hash for block rollback.
* node_position

    Position of the block in the list of honor nodes.

#### Response example

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

#### Error response
E_NOTFOUND


### <span id = "avatar-ecosystem-member">avatar/{ecosystem}/{member}</span>
GET/ Returns the avatar of the user in the member table (you can use it without logging in).

#### Request
* ecosystem

    Ecosystem ID.
* member

    Account address of the user.
> GET /api/v2/avatar/1/-118432674655542910

#### Response
The type of the request header Content-Type is image, and the image data is returned in the response body.

#### Response example
```
200 (OK)
Content-Type: image/png
```

#### Error response
E_NOTFOUND E_SERVER

### <span id = "config-centrifugo">config/centrifugo</span>
GET/ Returns the host address and port of centrifugo.
Login authorization is not required for this request.

#### Request
> GET /api/v2/config/centrifugo

#### Response
The response format is `http://address:port`, for example: `http://127.0.0.1:8100`.

#### Error response
E_SERVER

### updnotificator
POST/ Send all messages that have not yet been sent to the centrifugo notification service. Only send messages for ecosystems and members specified.

Login authorization is not required for this request.

#### Request
* id

    Member account address. 
* ecosystem

    Ecosystem ID.
> POST /api/v2/updnotificator

#### Response example

200 (OK)

Content-Type: application/json

```json
{
    "result": true
}
```