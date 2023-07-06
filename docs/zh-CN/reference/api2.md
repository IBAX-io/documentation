# RESTful API v2 {#restful-api-v2}

Weaver提供的所有功能，包括身份验证，生态系统数据接收，错误处理，数据库表操作，页面和智能合约执行都可通过IBAX区块链平台 的REST API获得。

通过使用REST API，开发者可以在不使用 Weaver 的情况下访问平台的任何功能。

API命令调用通过寻址执行 `/api/v2/command/[param]`，其中 `command`是命令名称，`param` 是附加参数。请求参数必须使用`Content-Type: x-www-form-urlencoded`格式发送。服务器响应结果为JSON格式。

<!-- TOC -->

- [RESTful API v2](#restful-api-v2)
    - [错误响应处理](#error-response-handling)
        - [错误列表](#error-list)
    - [请求类型](#request-type)
    - [认证接口](#authentication-interface)
        - [getuid](#getuid)
        - [login](#login)
    - [服务端命令接口](#server-side-command-interface)
        - [version](#version)
    - [数据请求功能接口](#data-request-function-interface)
        - [balance](#balance)
        - [blocks](#blocks)
        - [detailed_blocks](#detailed-blocks)
        - [/data/{id}/data/{hash}](#data-id-data-hash)
        - [/data/{table}/id/{column}/{hash}](#data-table-id-column-hash)
        - [keyinfo](#keyinfo)
        - [walletHistory](#wallethistory)
        - [listWhere/{name}](#listwhere-name)
        - [nodelistWhere/{name}](#nodelistwhere-name)
    - [获取指标接口](#get-metrics-interface)
        - [metrics/keys](#metrics-keys)
        - [metrics/blocks](#metrics-blocks)
        - [metrics/transactions](#metrics-transactions)
        - [metrics/ecosystems](#metrics-ecosystems)
        - [metrics/honornodes](#metrics-honornodes)
    - [生态系统接口](#ecosystem-interface)
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
    - [智能合约功能接口](#contract-function-interface)
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

## 错误响应处理 {#error-response-handling}

在请求执行成功的情况下返回状态`200`。如果出现错误，除了错误状态之外，将返回带有以下字段的JSON对象：

-   **error**

    > 错误标识符。

-   **msg**

    > 错误文本信息。

-   **params**

    > 错误的附加参数数组，可以将其放入错误信息中。

``` text
400 (Bad 请求)
Content-Type: application/json
{
    "err": "E_INVALIDWALLET",
    "msg": "Wallet 1234-5678-9012-3444-3488 is not valid",
    "params": ["1234-5678-9012-3444-3488"]
}
```

### 错误列表 {#error-list}

> `E_CONTRACT`

    不存在 `%s` 智能合约

> `E_DBNIL`

    数据库为空

> `E_DELETEDKEY`

    账户地址已冻结

> `E_ECOSYSTEM`

    生态系统 `%d` 不存在

> `E_EMPTYPUBLIC`

    账户公钥无效

> `E_KEYNOTFOUND`

    账户地址未找到

> `E_HASHWRONG`

    哈希不正确

> `E_HASHNOTFOUND`

    哈希未找到

> `E_HEAVYPAGE`

    页面加载过多

> `E_INVALIDWALLET`

    钱包地址 `%s` 无效

> `E_LIMITTXSIZE`

    该交易大小已超出限制

> `E_NOTFOUND`

    页面或菜单内容未找到

> `E_PARAMNOTFOUND`

    参数未找到

> `E_PERMISSION`

    没有权限

> `E_QUERY`

    数据库查询错误

> `E_RECOVERED`

    API发生恐慌性错误。

    如果出现恐慌性错误，则返回错误。

    这个错误意味着您遇到了一个需要查找和修复的bug。

> `E_SERVER`

    服务器错误。

    如果在golang库函数中有错误，则返回。\*msg\* 字段包含错误文本信息。

    在响应任何命令时都可能出现 **E_SERVER**错误。如果由于输入参数不正确而出现，则可以将其更改为相关错误。
    在另一种情况下，这个错误报告无效的操作或不正确的系统配置，这需要更详细的调查报告。

> `E_SIGNATURE`

    签名不正确

> `E_STATELOGIN`

    `%s` 不是生态系统 `%s` 内的成员

> `E_TABLENOTFOUND`

    数据表 `%s` 未找到

> `E_TOKENEXPIRED`

    会话已失效 `%s`

> `E_UNAUTHORIZED`

    未经授权。

    在没有执行登录或会话过期的情况下，除 `getuid、login`之外，任何命令都返回 **E_UNAUTHORIZED** 错误。

> `E_UNKNOWNUID`

    未知UID

> `E_UPDATING`

    节点正在更新区块链

> `E_STOPPING`

    节点已停止

> `E_NOTIMPLEMENTED`

    尚未实现

> `E_BANNED`

    该账户地址在 `%s` 禁止使用

> `E_CHECKROLE`

    拒绝访问

    CLB 不可用接口

------------------------------------------------------------------------

> CLB 节点不可用的接口请求：

-   metrics
-   txinfo
-   txinfoMultiple
-   appparam
-   appparams
-   appcontent
-   history
-   balance
-   block
-   maxblockid
-   blocks
-   detailed_blocks
-   ecosystemparams
-   systemparams
-   ecosystems
-   ecosystemparam
-   ecosystemname
-   walletHistory
-   tx_record

## 请求类型 {#request-type}
**统一使用** 
- application/x-www-form-urlencoded


## 认证接口 {#authentication-interface}

[JWT token](https://jwt.io)
用于认证。收到JWT令牌后必须将其放在每个请求头中：`Authorization: Bearer TOKEN_HERE`。

### getuid {#getuid}

**GET**/ 返回一个唯一值， 使用私钥对其签名，然后使用[login](#login) 命令将其发送回服务器。

生成临时JWT令牌，在调用 **login** 时需要将令牌传递给 **Authorization**。

**请求**

```text
GET
/api/v2/getuid
```

**响应**

- `uid`

    > 签名数字。

- `token`

    > 登录时传递的临时令牌。
    >
    > 临时令牌的生命周期为5秒。

- `network_id`

    > 服务器标识符。

- `cryptoer`

    > 椭圆曲线算法。

- `hasher`

    > hash算法。

**响应示例1**

```text
200 (OK)
Content-Type: application/json
{
    "uid": "4999317241855959593",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE"
    "network_id": "4717243765193692211"
}
```

在不需要授权的情况下(请求包含**Authorization**)，将返回以下信息:

- `expire`

    > 过期时间。

- `ecosystem`

    > 生态系统ID。

- `key_id`

    > 账户地址。

- `address`

    > 钱包地址 `XXXX-XXXX-.....-XXXX`。

- `network_id`

    > 服务器标识符。

**响应示例2**

```text
200 (OK)
Content-Type: application/json
{
    "expire": "2159h59m49.4310543s",
    "ecosystem_id": "1",
    "key_id": "-654321",
    "address": "1196-......-3496",
    "network_id": "1"
}
```

**错误响应**

*E_SERVER*

### login {#login}

**POST**/ 用户身份验证。

> 应首先调用 **getuid** 命令，以便接收唯一值并对其进行签名。getuid的临时JWT令牌需要放在请求头中传递。
>
> 如果请求成功，则响应中收到的令牌包含在 **Authorization** 中。


**请求**

```text
POST
/api/v2/login
```

- `ecosystem`

    > 生态系统ID。
    >
    > 如果未指定，默认为第一个生态系统ID。

- `expire`

    > JWT令牌的生命周期，以秒为单位，默认为28800。

- `pubkey`

    > 十六进制账户公钥。

- `key_id`

    > 账户地址 `XXXX-...-XXXX`。
    >
    > 在公钥已经存储在区块链中的情况下使用此参数。不能与 *pubkey*
    > 参数一起使用。

- `signature`

    > 使用私钥对getuid收到的uid签名。签名数据内容:
    ``` text
        LOGIN+{$network_id}+uid
    ```

**响应**

- `token`

    > JWT令牌。

- `ecosystem_id`

    > 生态系统ID。

- `key_id`

    > 账户地址ID

- `account`

    > 钱包地址 `XXXX-XXXX-.....-XXXX`。

- `notify_key`

    > 通知ID。

- `isnode`

    > 该账户地址是否是该节点的所有者。值： `true,false`。

- `isowner`

    > 该账户地址是否是该生态系统的创建者。值： `true,false`。

- `clb`

    > 登录的生态系统是否为 CLB 。值： `true,false`。

- `roles` [Omitempty](#omitempty)

    > 角色列表： `[{角色ID,角色名称}]`。


**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...30l665h3v7lH85rs5jgk0",
    "ecosystem_id": "1",
    "key_id": "-54321",
    "account": "1285-...-7743-4282",
    "notify_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....._JTFfheD0K4CfMbvVNpOJVMNDPx25zIDGir9g3ZZM0w",
    "timestamp": "1451309883",
    "roles": [
        {
            "role_id": 1,
            "role_name": "Developer"
        }
    ]
}      
```

**错误响应**

*E_SERVER, E_UNKNOWNUID, E_SIGNATURE, E_STATELOGIN, E_EMPTYPUBLIC*

## 服务端命令接口 {#server-side-command-interface}

### version {#version}

**GET**/ 返回当前服务器版本。

该请求不需要登录授权。

**请求**

```text
GET
/api/v2/version
```

**响应示例**

```text
200 (OK)
Content-Type: application/json
"1.3.0 branch.main commit.790..757 time.2021-08-23-08:20:19(UTC)"
```

## 数据请求功能接口 {#data-request-function-interface}

### balance {#balance}

**GET**/ 请求当前生态系统中帐户地址的余额。

该请求不需要登录授权。


**请求**

```text
GET
/api/v2/balance/{wallet}
```

- `wallet`

    > 地址标识符，可以任何格式指定 `int64, uint64, XXXX-...-XXXX`。 在用户当前登录的生态系统中查询该地址。

- `ecosystem` [Omitempty](#omitempty) Default ecosystem 1

    > 生态系统id，默认生态1。

**响应**

- `amount`

    > 最小单位的智能合约帐户余额。

- `money`

    > 帐户余额。

- `total`

    > 帐户余额。

- `utxo`

    > UTXO帐户余额。
 
-   *digits*

    > 精度。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "amount": "877450000000000",
    "money": "877.45",
    "total": "877450000000000",
    "digits": 6,
    "utxo": "0"
}      
```

**错误响应**

*E_SERVER, E_INVALIDWALLET*

### blocks {#blocks}

**GET**/ 返回其中包含每个区块中交易的相关附加信息列表。

该请求不需要登录授权。

**请求**

```text
GET 
/api/v2/blocks
```

- `block_id` [Omitempty](#omitempty) 默认为0

    > 要查询的起始区块高度。

- `count` [Omitempty](#omitempty) (默认为25，最大请求1000)

    > 区块数量。

**响应**

-   区块高度

    > 区块中的交易列表以及每个交易的附加信息：
    >
    > > -   `hash`
    > >
    > >     > 交易哈希。
    > >
    > > -   `contract_name`
    > >
    > >     > 智能合约名称。
    > >
    > > -   `params`
    > >
    > >     > 合约参数数组。
    > >
    > > -   `key_id`
    > >
    > >     > 对于第一个区块，是签署该交易的第一个区块的账户地址。
    > >     >
    > >     > 对于所有其他区块，是签署该交易的账户地址。

**响应示例**

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

**错误响应**

*E_SERVER, E_NOTFOUND*

### detailed_blocks {#detailed-blocks}

**GET**/ 返回其中包含每个区块中交易的详细附加信息列表。

该请求不需要登录授权。

**请求**

```text
GET
/api/v2/detailed_blocks
```

- `block_id` [Omitempty](#omitempty) 默认为0

  > 要查询的起始区块高度。

- `count` [Omitempty](#omitempty) (默认为25，最大请求1000)

  > 区块数量。

**响应**

- `Block height` 区块高度
 - `blockhead` 区块头包含以下字段：
   - `block_id` 区块高度。
   - `time` 区块生成时间戳。
   - `key_id` 签署该区块的账户地址。
   - `node_position` 在荣誉节点列表中生成区块的节点的位置。
   - `version` 区块结构版本。
 - `hash` 区块哈希。
 - `node_position` 在荣誉节点列表中生成区块的节点的位置。
 - `key_id` 签署该区块的账户地址。
 - `time` 区块生成时间戳。
 - `tx_count` 该区块内的交易数。
 - `size` 该区块大小。
 - `rollback_hash` 区块回滚哈希值。
 - `merkle_root` 该区块交易的默克尔树。
 - `bin_data` 区块头、区块内所有交易、上一个区块哈希和生成该区块的节点私钥的序列化。
 - `transactions` 区块中的交易列表以及每个交易的附加信息：
   - `hash` 交易哈希。
   - `contract_name` 合约名称。
   - `params` 合约参数。
   - `key_id` 签署该交易的账户地址。
   - `time` 交易生成时间戳。
   - `type` 交易类型。    
   - `size` 交易大小。

**响应示例**

```text
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

**错误响应**

*E_SERVER, E_NOTFOUND*
### /data/{id}/data/{hash} {#data-id-data-hash}

**GET**/
如果指定哈希与二进制表、字段和记录中的数据匹配，则此请求将返回数据。否则返回错误。

该请求不需要登录授权。

**请求**

```text
GET
/data/{id}/data/{hash}
```

- `id`

    > 记录ID。

- `hash`

    > 请求数据的哈希。

**响应**

> 二进制数据

**响应示例**

```text
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

**错误响应**

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### /data/{table}/id/{column}/{hash} {#data-table-id-column-hash}

**GET**/
如果指定哈希与指定表、字段和记录中的数据匹配，则此请求将返回数据。否则返回错误。

该请求不需要登录授权。

**请求**

```text
GET
/data/{table}/id/{column}/{hash}
```

- `table`

    > 数据表名。

- `id`

    > 记录ID。

- `column`

    > 数据表列名,只能是一个

- `hash`

    > 请求数据的哈希。

**响应**

> 二进制数据

**响应示例**

```text
200 (OK)
Content-Type: application/octet-stream
Content-Disposition: attachment

SetVar(this_page, @1voting_list).(this_table, @1votings)
Include(@1pager_header)

SetTitle("$@1voting_list$")
Span(Class: text-muted h5 m0 mb ml-lg, Body: Span(Class: ml-sm, Body: "$@1votings_list_desc$"))
AddToolButton(Title: $@1templates_list$, Page: @1voting_templates_list, Icon: icon-pin)
AddToolButton(Title: $@1create$, Page: @1voting_create, Icon: icon-plus).Popup(60, $@1new_voting$)

```

**错误响应**

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### keyinfo {#keyinfo}

**GET**/ 返回一个生态系统列表，其中包含注册了指定地址的角色。

该请求不需要登录授权。

**请求**

```text
GET
/api/v2/keyinfo/{address}
```

- `address`

    > 地址标识符，可以任何格式指定 `int64, uint64, XXXX-...-XXXX`。
    >
    > 该请求在所有生态系统中查询。

**响应**

- `ecosystem`

    > 生态系统ID。

- `name`

    > 生态系统名称。

- `roles`

    > 具有 *id* 和 *name* 字段的角色列表。

**响应示例**

```text
200 (OK)
Content-Type: application/json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Governancer"},{"id":"2","name":"Developer"}]
}]
```

**错误响应**

*E_SERVER, E_INVALIDWALLET*

### walletHistory {#wallethistory}
**GET**/ 返回当前账户交易历史记录,根据id倒序查找

[Authorization](#authorization)

**请求**

- `searchType`

  > 查找类型(income:转入 outcome:转出 all:全部,默认)。

- `page` [Omitempty](#omitempty)
  > 查找页数,默认第一页,min:1

- `limit` [Omitempty](#omitempty)

  > 条目条数，默认20条。min:1，max:500

```text
GET
/api/v2/walletHistory?searchType=all&page=1&limit=10
```

**响应**

- `total`

  > 条目总数。
- `page`

  > 当前页数。

- `limit`

  > 当前查找条数。

- `list` 数组中的每个元素包含以下参数：
    - `id` 条目ID。
    - `sender_id` 发送key_id
    - `sender_add` 发送账户地址
    - `recipient_id` 接受key_id
    - `recipient_add` 接受账户地址
    - `amount` 交易额
    - `comment` 交易备注
    - `block_id` 区块高度
    - `tx_hash` 交易hash
    - `created_at` 交易创建时间，毫秒时间戳
    - `money` 交易额

**响应示例**

```text
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

**错误响应**

*E_SERVER*



### listWhere/{name} {#listwhere-name}
**POST**/ 返回当前生态系统中指定数据表的条目。可以指定要返回的列。

[Authorization](#authorization)

**请求**

- `name`

  > 数据表名称。

-   `limit` [Omitempty](#omitempty)

    > 条目条数，默认25条。

-   `offset` [Omitempty](#omitempty)

    > 偏移量，默认为0。

-   `order` [Omitempty](#omitempty)

    > 排序方式，默认id ASC。

-   `columns` [Omitempty](#omitempty)

    > 请求列的列表，以逗号分隔，如果未指定，将返回所有列。在所有情况下都会返回id列。   

-   `where` [Omitempty](#omitempty)

    > 查询条件
    > 
    > Example:如果要查询 id>2 和 name = john
    > 
    > 你可以使用：where:{"id":{"$gt":2},"name":{"$eq":"john"}}
    > 
    > 详情请参考[DBFind](../topics/script.md#dbfind) where 语法

```text
POST
/api/v2/listWhere/mytable
```

**响应**

- `count`

  > 条目总数。
- `list`
  > 数组中的每个元素包含以下参数：
  - `id`
    > 条目ID。
  - `...`
    > 数据表其他列

**响应示例**

```text
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

**错误响应**

*E_SERVER*,*E_TABLENOTFOUND*


### nodelistWhere/{name} {#nodelistwhere-name}
**POST**/ 返回指定数据表的条目。可以指定要返回的列。对数据表中类型为*BYTEA*做16进制编码处理

[Authorization](#authorization)

**请求**

- `name`

  > 数据表名称。

-   `limit` [Omitempty](#omitempty)

    > 条目条数，默认25条。

-   `offset` [Omitempty](#omitempty)

    > 偏移量，默认为0。

-   `order` [Omitempty](#omitempty)

    > 排序方式，默认id ASC。

-   `columns` [Omitempty](#omitempty)

    > 请求列的列表，以逗号分隔，如果未指定，将返回所有列。在所有情况下都会返回id列。

-   `where` [Omitempty](#omitempty)

    > 查询条件
    >
    > Example:如果要查询 id>2 和 name = john
    >
    > 你可以使用：where:{"id":{"$gt":2},"name":{"$eq":"john"}}
    >
    > 详情请参考[DBFind](../topics/script.md#dbfind) where 语法

```text
POST
/api/v2/nodelistWhere/mytable
```

**响应**

- `count`

  > 条目总数。
- `list`
  > 数组中的每个元素包含以下参数：
    - `id`
      > 条目ID。
    - `...`
      > 数据表其他列

**响应示例**

```text
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

**错误响应**

*E_SERVER*,*E_TABLENOTFOUND*


## 获取指标接口 {#get-metrics-interface}

### metrics/keys {#metrics-keys}

**GET**/ 返回生态1账户地址数量。

**请求**

```text
GET
/api/v2/metrics/keys
```

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/blocks {#metrics-blocks}

**GET**/ 返回区块数量。

**请求**

```text
GET
/api/v2/metrics/blocks
```

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/transactions {#metrics-transactions}

**GET**/ 返回交易总数量。

**请求**

```text
GET
/api/v2/metrics/transactions
```

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/ecosystems {#metrics-ecosystems}

**GET**/ 返回生态系统的数量。

**请求**

```text
GET
/api/v2/metrics/ecosystems
```

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/honornodes {#metrics-honornodes}

**GET**/ 返回荣誉节点的数量。

该请求不需要登录授权。

``` 
GET
/api/v2/metrics/honornodes
```

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

## 生态系统接口 {#ecosystem-interface}

### ecosystemname {#ecosystemname}

**GET**/ 通过其标识符返回生态系统的名称。

该请求不需要登录授权。

```text
GET
/api/v2/ecosystemname?id=1
```

-   *id*

    > 生态系统ID。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "ecosystem_name": "platform_ecosystem"
}
```

**错误响应**

*E_PARAMNOTFOUND*

### appparams/{appid} {#appparams-appid}

[Authorization](#authorization)

**GET**/ 返回当前或指定生态系统中的应用程序参数列表。


**请求**

```text
GET
/api/v2/appparams/{appid}
```

- `appid`

    > 应用程序ID。

- `ecosystem`

    > 生态系统ID；如果未指定，将返回当前生态系统的参数。

- `names`

    > 接收的参数列表。
    >
    > 可以指定由逗号分隔的参数名称列表，例如:`/api/v2/appparams/1?names=name,mypar`。

**响应**

- `list`

    > 数组中的每个元素包含以下参数：
    >
    > -   `name`，参数名称；
    > -   `value`，参数值；
    > -   `conditions`，更改参数的权限。

**响应示例**

```text
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

**错误响应**

*E_ECOSYSTEM*

### appparam/{appid}/{name} {#appparam-appid-name}

[Authorization](#authorization)

**GET**/ 返回当前或指定生态系统中应用程序 **{appid}** 的参数 **{name}** 的相关信息。


**请求**

```text
GET
/api/v2/appparam/{appid}/{name}[?ecosystem=1]
```

- `appid`

    > 应用程序ID。

- `name`

    > 请求的参数的名称。

- `ecosystem` [Omitempty](#omitempty)

    > 生态系统ID（可选参数）。
    >
    > 默认返回当前的生态系统。

**响应**

- `id`

    > 参数ID。

- `name`

    > 参数名称。

- `value`

    > 参数值。

- `conditions`

    > 更改参数的权限。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "id": "10",
    "name": "par",
    "value": "My value",
    "conditions": "true"
}      
```

**错误响应**

*E_ECOSYSTEM, E_PARAMNOTFOUND*

### ecosystemparams {#ecosystemparams}

[Authorization](#authorization)

**GET**/ 返回生态系统参数列表。

**请求**

```text
GET
/api/v2/ecosystemparams/[?ecosystem=...&names=...]
```

- `ecosystem` [Omitempty](#omitempty)

    > 生态系统ID。如果未指定，将返回当前生态系统ID。

- `names` [Omitempty](#omitempty)

    > 请求参数列表，以逗号分隔。
    >
    > 例如: `/api/v2/ecosystemparams/?names=name,currency,logo`.

**响应**

- `list`

    > 数组中的每个元素包含以下参数：
    >
    > - `name`
    >
    >     > 参数名称。
    >
    > - `value`
    >
    >     > 参数值。
    >
    > - `conditions`
    >
    >     > 更改参数的权限。

**响应示例**

```text
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

**错误响应**

*E_ECOSYSTEM*

### ecosystemparam/{name} {#ecosystemparam-name}

[Authorization](#authorization)

**GET**/ 返回当前或指定生态系统中参数 **{name}** 的相关信息。

**请求**

```text
GET
/api/v2/ecosystemparam/{name}[?ecosystem=1]
```

- `name`

    > 请求的参数名称。

- `ecosystem` [Omitempty](#omitempty)

    > 可以指定生态系统ID。默认返回当前的生态系统ID。

**响应**

- `name`

    > 参数名称。

- `value`

    > 参数值。

- `conditions`

    > 更改参数的权限。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
}      
```

**错误响应**

*E_ECOSYSTEM*

### tables/\[?limit=\... &offset=\... \] {#tables-limit-offset}

[Authorization](#authorization)

**GET**/ 返回当前生态系统的数据表列表。可以设置偏移量和条目条数。

**请求**

- `limit` [Omitempty](#omitempty)

    > 条目条数，默认100条,最多1000条。

- `offset` [Omitempty](#omitempty)

    > 偏移量，默认为0。

```text
GET
/api/v2/tables?limit=...&offset=...
```

**响应**

- `count`

    > 数据表中的条目总数。

- `list`

    > 数组中的每个元素包含以下参数：
    >
    > > - `name`
    > >
    > >     > 无前缀的数据表名称。
    > >
    > > - `count`
    > >
    > >     > 数据表中的条目数。

**响应示例**

```text
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

### table/{name} {#table-name}

[Authorization](#authorization)

**GET**/ 返回当前生态系统请求数据表的相关信息。

**请求**

- `name`

    > 数据表名称。

```text
GET
/api/v2/table/{table_name}
```

返回以下字段信息：

- `name`

    > 数据表名称。

- `insert`

    > 新增条目的权限。

- `new_column`

    > 新增字段权限。

- `update`

    > 更改条目权限。

- `columns`

    > 字段相关信息数组：
    >
    > > - `name`
    > >
    > >     > 字段名称。
    > >
    > > - `type`
    > >
    > >     > 字段数据类型。
    > >
    > > - `perm`
    > >
    > >     > 更改该字段值的权限。


### list/{name}\[?limit=\... &offset=\... &columns=\... \] {#list-name-limit-offset-columns}

[Authorization](#authorization)

**GET**/
返回当前生态系统中指定数据表条目的列表。可以设置偏移量和条目条数。

**请求**

- `name`

    > 数据表名称。

- `limit` [Omitempty](#omitempty)

    > 条目条数，默认25条。

- `offset` [Omitempty](#omitempty)

    > 偏移量，默认为0。

- `columns` [Omitempty](#omitempty)

    > 请求列的列表，以逗号分隔，如果未指定，将返回所有列。在所有情况下都会返回id列。

```text
GET
/api/v2/list/mytable?columns=name
```

**响应**

- `count`

    > 条目总数。

- `list`

    > 数组中的每个元素包含以下参数：
    >
    > > - `id`
    > >
    > >     > 条目ID。
    > >
    > > -   请求列的序列。

**响应示例**

```text
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

**GET**/ 返回当前生态系统的 *sections*表条目的列表，可以设置偏移量和条目条数。

如果 *role_access*字段包含角色列表，并且不包括当前角色，则不会返回记录。 *title* 字段内数据将被请求头的 *Accept-Language* 语言资源替换。

**请求**

- `limit` [Omitempty](#omitempty)

    > 条目条数，默认25条。

- `offset` [Omitempty](#omitempty)

    > 偏移量，默认为0。

- `lang` [Omitempty](#omitempty)

    > 该字段指定多语言资源代码或本地化，例如：*en，zh*。如果未找到指定的多语言资源，例如：*en-US*，则在多语言资源组 *en* 中搜索。

```text
GET
/api/v2/sections
```

**响应**

- `count`

    > *sections* 表条目总数。

- `list`

    > 数组中每个元素都包含sections表中所有列的信息。

**响应示例**

```text
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

**错误响应**

*E_TABLENOTFOUND*

### row/{name}/{id}\[?columns=\] {#row-name-id-columns}

[Authorization](#authorization)

**GET**/ 返回当前生态系统中指定数据表的条目。可以指定要返回的列。

**请求**

- `name`

    > 数据表名称。

- `id`

    > 条目ID。

- `columns` [Omitempty](#omitempty)

    > 请求列的列表，以逗号分隔，如果未指定，将返回所有列。在所有情况下都会返回id列。

```text
GET
/api/v2/row/mytable/10?columns=name
```

**响应**

- `value`

    > 接收列值的数组
    >
    > > - `id`
    > >
    > >     > 条目ID。
    > >
    > > -   请求列的序列。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "values": {
    "id": "10",
    "name": "John",
    }
}   
```

**错误响应**

*E_NOTFOUND*

### row/{name}/{column}/{id} {#row-name-colorn-id}

[Authorization] (#authorization)

**GET**/ 返回当前生态系统中指定数据表的条目。可以指定要返回的列。

**请求**

- `Name`

    > 数据表名称。

- `colorn`

    > 数据表列名。

- `ID`

    > 条目ID。

- `columns` [omitempty](#omitempty)

    > 请求列的列表，以逗号分隔，如果未指定，将返回所有列。在所有情况下都会返回id列。

```text
GET
/api/v2/row/mytable/name/John?columns=name
```

**响应**

- `value`

    > 接收列值的数组
    >
    > > -   *id*
    > >
    > >     > 条目ID。
    > >
    > > -   请求列的序列。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "values": {
    "id": "10",
    "name": "John",
    }
}   
```

**错误响应**

*E_NOTFOUND*

### systemparams {#systemparams}

[Authorization](#authorization)

**GET**/ 返回平台参数列表。

**请求**

```text
GET
/api/v2/systemparams/[?names=...]
```

- `names` [Omitempty](#omitempty)

请求参数列表，用逗号分隔。例如`/api/v2/systemparams/?names=max_columns,max_indexes`。

**响应**

- `list`

    > 数组中每个元素包含以下参数：
    >
    > > - `name`
    > >
    > >     > 参数名称。
    > >
    > > - `value`
    > >
    > >     > 参数值。
    > >
    > > - `conditions`
    > >
    > >     > 更改参数的权限。

**响应示例**

```text
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

**错误响应**

*E_PARAMNOTFOUND*

### history/{name}/{id} {#history-name-id}

[Authorization](#authorization)

**GET**/ 返回当前生态系统中指定数据表中条目的更改记录。

**请求**

```text
GET
/api/v2/history?name=contracts&id=5
```

> - `name`
>
>     > 数据表名称。
>
> - `id`
>
>     > 条目ID。

**响应**

> - `list`
>
>     > 数组中每个元素包含所请求条目的更改记录。

**响应示例**

```text
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

[Authorization](#authorization)

**GET**/ 返回当前生态系统指定数据表（pages，menu或snippet）中 *name* 字段的条目。

```text
GET
/api/v2/interface/page/default_page
/api/v2/interface/menu/default_menu
/api/v2/interface/snippet/welcome
```

**请求**

- `name`

    > 指定表中条目的名称。

**响应**

- `id`

    > 条目ID。

- `name`

    > 条目名称。

- `other`

    > 该表的其他列。

**响应示例**

```text
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

**错误响应**

*E_QUERY*, *E_NOTFOUND*

## Contract Function Interface {#contract-function-interface}

### contracts\[?limit=\... &offset=\... \] {#contracts-limit-offset}

[Authorization](#authorization)

**GET**/ 返回当前生态系统中的合约列表，可以设置偏移量和条目条数。

**请求**

- `limit` [Omitempty](#omitempty)

    > 条目条数，默认25条。

- `offset` [Omitempty](#omitempty)

    > 偏移量，默认为0。

```text
GET
/api/v2/contracts
```

**响应**

- `count`

    > 条目总数。

- `list`

    > 数组中每个元素包含以下参数：
    >
    > > - `id`
    > >
    > >     > 合约ID。
    > >
    > > - `name`
    > >
    > >     > 合约名称。
    > >
    > > - `value`
    > >
    > >     > 合约内容。
    > >
    > > - `wallet_id`
    > >
    > >     > 合约绑定的账户地址。
    > >
    > > - `address`
    > >
    > >     > 合约绑定的钱包地址 `XXXX-...-XXXX`。
    > >
    > > - `ecosystem_id`
    > >
    > >     > 合约所属的生态系统ID。
    > >
    > > - `app_id`
    > >
    > >     > 合约所属的应用程序ID。
    > >
    > > - `conditions`
    > >
    > >     > 更改合约的权限。
    > >
    > > - `token_id`
    > >
    > >     > 作为支付合约费用的通证所在的生态系统ID。

**响应示例**

```text
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

[Authorization](#authorization)

**GET**/ 返回指定合约的相关信息。默认在当前生态系统中查询合约。

**请求**

- `name`

    > 合约名称。

```text
GET
/api/v2/contract/mycontract
```

**响应**

- `id`

    > VM中合约ID。

- `name`

    > 带生态系统ID的合约名称 `@1MainCondition`。

- `state`

    > 合约所属的生态系统ID。

- `walletid`

    > 合约绑定的账户地址。

- `tokenid`

    > 作为支付合约费用的通证所在的生态系统ID。

- `address`

    > 合约绑定的钱包地址 `XXXX-...-XXXX`。

- `tableid`

    > *contracts* 表中合约所在的条目ID。

- `fields`

    > 数组中包含合约 **data** 部分每个参数的结构信息：
    >
    > > - `name`
    > >
    > >     > 参数名称。
    > >
    > > - `type`
    > >
    > >      参数类型。
    > >
    > > - `optional`
    > >
    > >     > 参数选项，\`true\` 表示可选参数，\`false\` 表示必选参数。

**响应示例**

```text
200 (OK)
Content-Type: application/json
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

**错误响应**

*E_CONTRACT*

### sendTX {#sendtx}

[Authorization](#authorization)

**POST**/
接收参数中的交易并将其添加到交易队列，如果请求执行成功，则返回交易哈希。该哈希可获得区块内对应的交易，在发生错误响应时，该哈希包含在错误文本信息中。

**请求**

- `tx_key`

    > 交易内容，该参数可指定任何名称，支持接收多个交易。

```text
POST
/api/v2/sendTx

Headers:
Content-Type: multipart/form-data

Parameters:
tx1 - 交易1
txN - 交易N
```

**响应**

- `hashes`

    > 交易哈希数组：
    >
    > > - `tx1`
    > >
    > >     > 交易1的哈希。
    > >
    > > - `txN`
    > >
    > >     > 交易N的哈希。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "hashes": {
        "tx1": "67afbc435634.....",
        "txN": "89ce4498eaf7.....",
}
```

**错误响应**

*E_LIMITTXSIZE*,*E_BANNED*

### txstatus {#txstatus}

[Authorization](#authorization)

**POST**/
返回指定交易哈希的区块ID和错误信息，如果区块ID和错误文本信息的返回值为空，则该交易尚未包含在区块中。

**请求**

- `data`

    > 交易哈希的JSON列表。

```text
{"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

```text
POST
/api/v2/txstatus/
```

**响应**

- `results`

    > 数据字典中交易哈希作为键，交易详细作为值。
    >
    > `hash`
    >
    > > 交易哈希。
    > >
    > > - `blockid`
    > >
    > >     > 如果交易执行成功，则返回区块ID； 如果交易执行失败，则 *blockid* 为 [0]{.title-ref}。
    > >
    > > - `result`
    > >
    > >     > 通过 **\$result** 变量返回交易结果。
    > >
    > > - `errmsg`
    > >
    > >     > 如果执行交易失败，则返回错误文本信息。

**响应示例**

```text
200 (OK)
Content-Type: application/json
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

**错误响应**

*E_HASHWRONG, E_HASHNOTFOUND*

### txinfo/{hash} {#txinfo-hash}

该请求不需要登录授权。

**GET**/

返回指定哈希的交易相关信息，包括区块ID和确认数。如果指定可选参数，还可返回合约名称及其相关参数。

**请求**

- `hash`

    > 交易哈希。

- `contractinfo` [Omitempty](#omitempty)

    > 合约详细参数标识，要获取该交易相关的合约详情，需指定 `contractinfo=1`。

```text
GET
/api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1
```

**响应**

- `blockid`

    > 包含该交易的区块ID。如果该值为 `0`，则找不到该哈希的交易。

- `confirm`

    > 该区块 *blockid* 的确认数。

- `data` [Omitempty](#omitempty)

    > 如果指定了 `contentinfo=1`，则合约详情返回给该参数。

**响应示例**

```text
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
            "Value": "contract crashci4b {\n\t\t\tdata {}\n\t\t}"
        }
    }
}
```

**错误响应**

*E_HASHWRONG*

### txinfoMultiple {#txinfomultiple}

该请求不需要登录授权。

**GET**/ 

返回指定哈希的交易相关信息。

**请求**

- `data`
    - `hashes`
    > 交易哈希列表。

- `contractinfo` [Omitempty](#omitempty)

    > 合约详细参数标识，要获取该交易相关的合约详情，需指定`contractinfo=1`。

```text
data: {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

```text
GET
/api/v2/txinfoMultiple
```

**响应**

- `results`

    > 数据字典中交易哈希作为键，交易详细作为值。
    >
    > > `hash`
    > >
    > > > 交易哈希。
    > > >
    > > > `blockid`
    > > >
    > > > > 包含该交易的区块ID。如果该值为 `0`，则找不到该哈希的交易。
    > > >
    > > > `confirm`
    > > >
    > > > > 该区块 *blockid* 的确认数。
    > > >
    > > > `data`
    > > >
    > > > > 如果指定了 `contentinfo=1`，则合约详情返回给该参数。

**响应示例**

```text
200 (OK)
Content-Type: application/json
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

**错误响应**

*E_HASHWRONG*

### /page/validators_count/{name} {#page-validators-count-name}
该请求不需要登录授权。

**GET**

返回指定页面所需验证的节点数。

**请求**

- `name`

    > 带生态系统ID的页面名称，格式为 `@ecosystem_id%%page_name%`，例如 `@1main_page`。 如果不带生态系统ID，则默认查找第一生态的页面。

```text
GET
/api/v2/page/validators_count/@2page_name
```

**响应**

- `validate_count`

    > 指定页面所需验证的节点数。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

**错误响应**

*E_NOTFOUND, E_SERVER*

### content/menu\|page/{name} {#content-menu-page-name}

[Authorization](#authorization)

**POST**

返回指定页面或菜单名称的代码JSON对象树，这是模版引擎处理的结果。

**请求**

- `name`
    > 带生态系统ID的页面名称或菜单名称，格式为 `@ecosystem_id%%page_name%`，例如 `@1main_page`。 如果不带生态系统ID，则默认查找当前生态的页面或菜单。

```text
POST
/api/v2/content/page/default
```

**响应**

- `menu` || `title`

    > 请求 *content/page/\...* 时，页面所属的菜单名称。

- `menutree`

    > 请求 *content/page/\...* 时，页面的菜单JSON对象树。

- `title` --head for the menu *content/menu/\...*

    > 请求 *content/menu/\...* 时，菜单标题。

- `tree`

    > 页面或菜单JSON对象树。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "tree": {"type":"......", 
          "children": [
               {...},
               {...}
          ]
    },
}      
```

**错误响应**

`E_NOTFOUND`

### content/source/{name} {#content-source-name}

[Authorization](#authorization)

**POST**

返回指定页面名称的代码JSON对象树。不执行任何函数或接收任何数据。返回的JSON对象树对应于页面模版，可以在可视化页面设计器中使用。如果找不到页面，则返回404错误。

**请求**

- `name`

    > 带生态系统ID的页面名称，格式为 `@ecosystem_id%%page_name%`，例如 `@1main_page`。
    > 如果不带生态系统ID，则默认查找当前生态的页面。

**响应**

```text
POST
/api/v2/content/source/default
```

- `tree`

    > 页面的JSON对象树。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "tree": {"type":"......", 
          "children": [
               {...},
               {...}
          ]
    },
}      
```

**错误响应**

*E_NOTFOUND, E_SERVER*


### content/hash/{name} {#content-hash-name}

**POST** 

返回指定页面名称的SHA256哈希，如果找不到页面，则返回404错误。

该请求不需要登录授权。要向其他节点发出请求时接收正确的哈希，还必须传递 *ecosystem,keyID,roleID* 参数。要从其他生态系统接收页面，生态系统ID必须在页面名称中添加前缀。例如：`@2mypage`。

**请求**


```text
POST
/api/v2/content/hash/default
```
- `name`

    > 带生态系统ID的页面名称。

- `ecosystem`

    > 生态系统ID。

- `keyID`

    > 账户地址。

- `roleID`

    > 角色ID。


**响应**

- `hash`

    > 十六进制哈希值。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
}      
```

**错误响应**

*E_NOTFOUND, E_SERVER, E_HEAVYPAGE*

### content {#content}

**POST**

从 **template** 参数返回页面代码的JSON对象数，如果将可选参数 **source** 指定为`true或1`，则该JSON对象树不执行任何函数和接收数据。该JSON对象树可以在可视化页面设计器中使用。

该请求不需要登录授权。

**请求**

- `template`

    > 页面代码。

- `source`

    > 如果指定为 `true或1`，则JSON对象树不执行任何函数和接收数据。

```text
POST
/api/v2/content
```

**响应**

- `tree`

    > JSON对象树。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "tree": {"type":"......", 
          "children": [
               {...},
               {...}
          ]
    },
}      
```

**错误响应**

*E_NOTFOUND, E_SERVER*

### maxblockid {#maxblockid}

**GET**/ 返回当前节点上的最高区块ID。

该请求不需要登录授权。

**请求**

```text
GET
/api/v2/maxblockid
```

**响应**

- `max_block_id`

    > 当前节点上的最高区块ID。

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "max_block_id" : 341,
}
```

**错误响应**

*E_NOTFOUND*

### block/{id} {#block-id}

**GET**/ 返回指定区块ID的相关信息。

该请求不需要登录授权。

**请求**

- `id`

    > 区块ID。

```text
POST
/api/v2/block/32
```

**响应**

- `hash`

    > 区块哈希值。

- `key_id`

    > 签署该区块的账户地址。

- `time`

    > 区块生成时间戳。

- `tx_count`

    > 该区块内的交易总数。

- `rollbacks_hash`

    > 区块回滚哈希值。

- `node_position`

    > 该区块在荣誉节点列表的位置。

**响应示例**

```text
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

**错误响应**

*E_NOTFOUND*

### avatar/{ecosystem}/{member} {#avatar-ecosystem-member}

**GET**/ 返回 *member* 表中用户的头像（无需登录即可使用）。

**请求**

- `ecosystem`

    > 生态系统ID。

- `member`

    > 用户的账户地址。(xxxx-...-xxxx)

```text
GET
/api/v2/avatar/1/1234-2134-...-4321
```

**响应**

请求头 *Content-Type* 为图像类型，图像数据在响应体中返回。

**响应示例**

```text
200 (OK)
Content-Type: image/png  
```

**错误响应**

*E_NOTFOUND* *E_SERVER*

### config/centrifugo {#config-centrifugo}

**GET**/ 返回centrifugo的主机地址和端口。

该请求不需要登录授权。

**请求**

```text
GET
/api/v2/config/centrifugo
```

**响应**

响应结果格式 `http://address:port`，例如: `http://127.0.0.1:8100`。

**错误响应**

*E_SERVER*

### updnotificator {#updnotificator}

**POST**/

(已弃用)

发送尚未发送到centrifugo通知服务的所有消息。仅发送指定生态系统和成员的消息。

该请求不需要登录授权。

**请求**

- `id`

    > 成员的账户地址。

- `ecosystem`

    > 生态系统ID。

```text
POST
/api/v2/updnotificator
```

**响应示例**

```text
200 (OK)
Content-Type: application/json
{
    "result": true
}      
```


### 特殊说明 {#special-instructions}

#### Omitempty {#omitempty}
如字段带有omitempty属性，表示此字段为可选参数

#### Authorization {#authorization}
如接口带有Authorization标签，表示此接口需要login授权，请求头添加Authorization，示例：

key = Authorization
value = "Bearer +[login token](#login)"

```text
    Authorization   Bearer eyJhbGciOiJI.....kBZgGIlPhfXNZJ73RiZtM
```