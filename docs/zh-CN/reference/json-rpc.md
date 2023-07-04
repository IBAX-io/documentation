# JSON-RPC 应用程序接口 {#json-rpc-application-programming-interface}

为了让软件应用程序与IBAX区块链交互（获取区块数据或向网络发送交易）,它必须连接到IBAX网络节点.


由于原有REST API接口的通用性与扩展性，它会随着接口越来越多，客户端的不同而变得越来越复杂，我们意识到接口统一重要性，保证所有客户端都能使用同一套规范，无论具体的节点与客户端实现如何。


JSON-RPC 是一种无状态的、轻量级远程过程调用 (RPC) 协议。 它定义了一些数据结构及其处理规则。 它与传输无关，因为这些概念可以在同一进程，通过接口、超文本传输协议或许多不同的消息传递环境中使用。 它使用 JSON (RFC 4627) 作为数据格式。



JSON-RPC兼容了大部分REST API接口，保留了原有的REST API接口，使用REST API接口的客户端可以很方便的向JSON-RPC接口转移，部分接口：
- [/data/{id}/data/{hash}](api2.md#data-id-data-hash)
- [/data/{table}/id/{column}/{hash}](api2.md#data-table-id-column-hash)
- [avatar/{ecosystem}/{member}](api2.md#avatar-ecosystem-member)

可通过REST API接口获取。


## 客户端实现 {#client-side-implementation}
每个客户端在执行 JSON-RPC 规范时可以使用不同的编程语言，你可以使用[GO-SDK](https://github.com/IBAX-io/go-ibax-sdk) 。


## Curl示例 {#curl-example}
下面提供了通过向IBAX节点发出 curl 请求来使用 JSON_RPC 应用程序接口的示例。 每个示例都包括对特定端点、其参数、返回类型的描述，以及应该如何使用它的工作示例。

Curl 请求可能会返回与内容类型相关的错误消息。 这是因为 --data 选项将内容类型设置为 application/x-www-form-urlencoded。 如果你的请求有此问题，请通过在调用开始时放置 -H "Content-Type: application/json" 来手动设置标头。 这些示例也未包括网址/互联网协议与端口组合，该组合必须是 curl 的最后一个参数（例如 127.0.0.1:7079 包含这些附加数据的完整 curl 请求采用以下形式：

``` text
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.maxBlockId","params":[],"id":1}' http://127.0.0.1:7079	
```

## 约定 {#covenant}

### Hex {#hex}
**十六进制编码**

当对字节数组、哈希、字节码数组进行编码时：编码为十六进制，每字节两个十六进制数字。

### 请求类型 {#request-type}
**统一使用** 
- Content-Type: application/json

### 特殊标记 {#special-markers}
#### Omitempty {#omitempty}
此字段为可选参数。

如果存在连续多个`Omitempty`字段，但是只想传某个字段的值，那么需要将不需要的字段置为空(该字段类型空值)，例：
- **id** - *Number* - [Omitempty](#omitempty) id
- **name** - *String* - [Omitempty](#omitempty) 名称
- **column** - *String* - [Omitempty](#omitempty) 筛选列名

如果只传name的值，那么请求参数按如下传递：

    `"params":[0,"testname"]` - *Number* 空值为0

如果只传column的值，那么请求参数按如下传递：

    `"params":[0,"","title,page"]` - *String* 空值为""



#### Authorization {#authorization}
Authorization 授权标头，请求头添加Authorization，示例：

**name** : Authorization **value** : Bearer +[login token](#ibax-login)

Example:
```` text
    //request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ey...." -d '{"jsonrpc":"2.0","method":"ibax.getContractInfo","params":["@1TokensSend"],"id":1}' http://127.0.0.1:7079

````

#### AccountOrKeyId {#accountorkeyid}
账户地址参数,可以使用两种格式的地址,例:
1. - *String* - 账户地址 `"XXXX-XXXX-XXXX-XXXX-XXXX"` 或 账户Id `"64842...538120"`

2. - *Object* - 地址对象
    - **key_id** -  *Number* - 账户Id,例: `{"key_id":-64842...38120}`
    - **account** - *String* - 账户地址,例: `{"account":"1196-...-...-...-3496"}`

    **账户地址和账户Id同时存在时优先使用账户Id**.

#### BlockOrHash {#blockorhash}
区块高度或区块HASH，例:

1. - *String* - 区块高度 `"100"` 或 区块HASH `"4663aa47...a60753c18d9ba9cb4"`

2. - *Object* - 区块信息对象
        - **id** -  *Number* - 区块高度,例: `{"id":2}`
        - **hash** - *[Hex](#hex) String* - 区块HASH,例: `{"hash":"d36b8996c...c616d3043a0d02a0f59"}`
        
        **区块高度和区块HASH只能选一个**.

### 批量请求 {#batch-requests}
此功能可用于减少网络延迟，特别是在获取大量基本独立的数据对象时。

下面是一个获取最高区块和总交易数例子：
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '[{"jsonrpc":"2.0","method":"ibax.getTxCount","id":1,"params":[]},{"jsonrpc":"2.0","method":"ibax.maxBlockId","id":2,"params":[]}]' http://127.0.0.1:7079

    //Response
    [
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": 149100
        },
        {
            "jsonrpc": "2.0",
            "id": 2,
            "result": 797
        }
    ]
```


### 错误响应处理 {#error-response-handling}

在请求执行成功的情况下返回状态 `200`。

如果出现错误，将返回带有以下字段的JSON对象：

-   jsonrpc

    错误标识符。

-   id

    错误文本信息。

-   error
    - code

        响应状态码
    - message

        响应状态描述

``` text
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32014,
        "message": "Unauthorized"
    }
}
```


## JSON-RPC Namespaces {#json-rpc-namespaces}

### ibax Namespace {#ibax-namespace}

#### 认证接口 {#authentication-interface}
- [ibax.getuid](#ibax-getuid)
- [ibax.login](#ibax-login)
- [ibax.getAuthStatus](#ibax-getauthstatus)

#### 服务端命令接口 {server-side-command-interface}
- [ibax.getVersion](#ibax-getversion)

#### 数据请求功能接口 {#data-request-function-interface}
- [ibax.getBalance](#ibax-getbalance)
- [ibax.getBlocksTxInfo](#ibax-getblockstxinfo)
- [ibax.detailedBlocks](#ibax-detailedblocks)
- [ibax.getKeyInfo](#ibax-getkeyinfo)
- [ibax.detailedBlock](#ibax-detailedblock)

#### 获取指标接口 {#get-metrics-interface}
- [ibax.maxBlockId](#ibax-maxblockid)
- [ibax.getKeysCount](#ibax-getkeyscount)
- [ibax.getTxCount](#ibax-gettxcount)
- [ibax.getTransactionCount](#ibax-gettransactioncount)
- [ibax.getBlocksCountByNode](#ibax-getblockscountbynode)
- [ibax.honorNodesCount](#ibax-honornodescount)
- [ibax.getEcosystemCount](#ibax-getecosystemcount)

#### 生态系统接口 {#ecosystem-interface}
- [ibax.ecosystemInfo](#ibax-ecosysteminfo)
- [ibax.appParams](#ibax-appparams)
- [ibax.getEcosystemParams](#ibax-getecosystemparams)
- [ibax.getTableCount](#ibax-gettablecount)
- [ibax.getTable](#ibax-gettable)
- [ibax.getList](#ibax-getlist)
- [ibax.getSections](#ibax-getsections)
- [ibax.getRow](#ibax-getrow)
- [ibax.systemParams](#ibax-systemparams)
- [ibax.history](#ibax-history)
- [ibax.getPageRow](#ibax-getpagerow)
- [ibax.getMenuRow](#ibax-getmenurow)
- [ibax.getSnippetRow](#ibax-getsnippetrow)
- [ibax.getAppContent](#ibax-getappcontent)
- [ibax.getMember](#ibax-getmember)

#### 合约功能接口 {#contract-function-interface}
- [ibax.getContracts](#ibax-getcontracts)
- [ibax.getContractInfo](#ibax-getcontractinfo)
- [ibax.sendTx](#ibax-sendtx)
- [ibax.txStatus](#ibax-txstatus)
- [ibax.txInfo](#ibax-txinfo)
- [ibax.txInfoMultiple](#ibax-txinfomultiple)
- [ibax.getPageValidatorsCount](#ibax-getpagevalidatorscount)
- [ibax.getPage](#ibax-getpage)
- [ibax.getMenu](#ibax-getmenu)
- [ibax.getSource](#ibax-getsource)
- [ibax.getPageHash](#ibax-getpagehash)
- [ibax.getContent](#ibax-getcontent)
- [ibax.getBlockInfo](#ibax-getblockinfo)
- [ibax.getConfig](#ibax-getconfig)

### net Namespace {#net-namespace}
- [net.getNetwork](#net-getnetwork)
- [net.status](#net-status)

### rpc Namespace {#rpc-namespace}
- [rpc.modules](#rpc-modules)

### admin Namespace {#admin-namespace}
- [admin.startJsonRpc](#admin-startjsonrpc)
- [admin.stopJsonRpc](#admin-stopjsonrpc)


### debug Namespace {#debug-namespace}
- [debug.getNodeBanStat](#debug-getnodebanstat)
- [debug.getMemStat](#debug-getmemstat)
 


## JSON-RPC 接口方法 {#json-rpc-interface-methods}

### **ibax.getUid** {#ibax-getuid}

[Authorization](#authorization) [Omitempty](#omitempty)

生成临时JWT令牌,在调用 **[login](#ibax.login)** 时需要将令牌传递给 [**Authorization**](#authorization)

**参数**
无

**返回值**
- **uid** - *String* - 签名数字。

- **token** - *String* -  登录时传递的临时令牌(临时令牌的生命周期为5秒)。

- **network_id** - *String* - 网络标识符。

- **cryptoer** - *String* - 椭圆曲线算法。

- **hasher** - *String* - hash算法。

在不需要授权的情况下(请求包含[Authorization](#authorization))，将返回以下信息: 

- **expire** - *String* - 过期时间。

- **ecosystem** - *String* - 生态系统ID。

- **key_id** - *String* - 账户地址。

- **address** - *String* - 钱包地址 `XXXX-XXXX-XXXX-XXXX-XXXX`。

- **network_id** - *String* - 网络标识符。

**示例**
```text
    //Request1
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getUid","params":[],"id":1}' http://127.0.0.1:7079

    //Response1
     {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "uid": "5823391950439015186",
            "token": "ey....",
            "network_id": "1",
            "cryptoer": "ECC_Secp256k1",
            "hasher": "KECCAK256"
        }
    }

    //Request2
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ey...." -d '{"jsonrpc":"2.0","method":"ibax.getUid","params":[],"id":1}' http://127.0.0.1:7079

    //Response2
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "expire": "7h59m49.5361126s",
            "ecosystem_id": "1",
            "key_id": "6667782293976713160",
            "address": "0666-7782-2939-7671-3160",
            "network_id": "1",
            "cryptoer": "ECC_Secp256k1",
            "hasher": "KECCAK256"
        }
    }
```

### **ibax.login** {#ibax-login}
用户身份验证。[Authorization](#authorization)

应首先调用 [**ibax.getUid**](#ibax-getuid) 命令，以便接收唯一值并对其进行签名。getuid的临时JWT令牌需要放在请求头中传递。如果请求成功，则响应中收到的令牌包含在 [**Authorization**](#authorization) 中。

**参数**

*Object* - 身份认证调用对象
- **ecosystem_id** - *Number* - 生态系统ID。如果未指定，默认为第一生态系统ID。

- **expire** - *Number* - JWT令牌的生命周期，以秒为单位，默认为28800,8小时。

- **public_key** - *[Hex](#hex) String* - 十六进制账户公钥。

- **key_id** - *String* -
    > 账户地址 `XXXX-...-XXXX`。
    >
    > 在公钥已经存储在区块链中的情况下使用此参数。不能与 *pubkey*
    > 参数一起使用。

- **signature** - *String* -
    使用私钥对getuid收到的uid签名。
    
    签名数据内容:LOGIN+{$network_id}+uid。

- **role_id** - *Number* - 角色ID，默认角色0。


**返回值**
*Object* - 身份认证对象
- **token** - *String* - JWT令牌。

- **ecosystem_id** - *String* - 生态系统ID。

- **key_id** - *String* - 账户地址ID。

- **account** - *String* - 钱包地址 `XXXX-XXXX-XXXX-XXXX-XXXX`。

- **notify_key** - *String* - 通知ID。

- **isnode** - *Bool* - 该账户地址是否是该节点的所有者。值： `true,false`。

- **isowner** - *Bool* - 该账户地址是否是该生态系统的创建者。值： `true,false`。

- **clb** - *Bool* - 登录的生态系统是否为 CLB 。值： `true,false`。

- **timestamp** - *String* - 当前时间戳。

- **roles** - *Array* 角色列表，如没有角色，字段为nil。
    - **role_id** - *Number* - 角色ID。
    - **role_name** - *String* - 角色名称。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.login","params":[{"ecosystem_id":1,"public_key":"04....","signature","46...","role_id":0}],"id":1}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "token": "ey...",
            "ecosystem_id": "1",
            "key_id": "6660819716178795186",
            "account": "0666-xxxx-xxxx-xxxx-5186",
            "notify_key": "ey....",
            "isnode": false,
            "isowner": false,
            "clb": false,
            "timestamp": "1678336163",
            "roles": nil //[{"role_id": 1, "role_name": "Developer"},{"role_id": 2, "role_name": "DevelopGovernancerer"}]
        }
    }
```

### **ibax.getAuthStatus** {#ibax-getauthstatus}
用户身份认证状态。
[Authorization](#authorization)

**参数**
无

**返回值**
*Object* - 身份认证状态对象。
- **active** - *Bool* - 当前用户身份认证状态， 值： `true,false`。

- **exp** - *Number* - [Omitempty](#omitempty) Token有效截止时间戳。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getAuthStatus","id":1}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "active": true,
            "exp": 1678354136
        }
    }
```

### **ibax.getVersion** {#ibax-getversion}
返回当前服务器版本。

**参数**
无

**返回值**
- **vesion** - *String* - 版本号(`big Version` + `branch name` + `git commit` + `time` + `node status`)。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getVersion","id":1}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": "1.3.0 branch.main commit.b57d4194 time.2023-03-08-09:30:29(UTC) node server status is running"
    }
```

### **ibax.getBalance** {#ibax-getbalance}
获取帐户地址余额。

**参数**

- **key_id or account** - *[AccountOrKeyId](#accountorkeyid)* - 账户地址 `XXXX-XXXX-XXXX-XXXX-XXXX` 或 账户ID。

- **ecosystem_id** - *Number* - 生态系统ID [Omitempty](#omitempty) 默认生态1。

**返回值**
*Object* - 获取余额对象。
- **amount** - *String* - 最小单位的合约帐户余额。

- **total** - *String* - 最小单位帐户总余额(amount + utxo）。

- **utxo** - *String* - 最小单位UTXO帐户余额。

- **digits** - *Number* - 精度。

- **token_symbol** - *String* - 代币符号。

**示例**
```text
    //Request1
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBalance","id":1,"params":["648...8120"]}' http://127.0.0.1:7079

    //Request2
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBalance","id":1,"params":["1196-...-...-...-3496",1]}' http://127.0.0.1:7079

    //Request3
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBalance","id":1,"params":[{"key_id":{$key_id}},1]}' http://127.0.0.1:7079 //keyId or account

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "amount": "9915319240441612",
            "digits": 12,
            "total": "9915319240441612",
            "utxo": "0",
            "token_symbol": "IBXC"
        }
    }
```


### **ibax.getBlocksTxInfo** {#ibax-getblockstxinfo}
返回其中包含每个区块中交易的相关附加信息列表。

**参数**

- **block_id** - *Number* - 要查询的起始区块高度。

- **count** - *Number* - 区块数量，默认为25，最大请求100。

**返回值**
*Object* - 获取区块信息对象。
- **block_id** - *String* - 区块高度。
- 区块中的交易列表以及每个交易的附加信息：
    
    - **hash** - *[Hex](#hex) String* - 交易哈希。

    - **contract_name** - *String* -  合约名称。

    - **params** - *Object* - 合约参数,合约字段可通过 [ibax.getContractInfo](#ibax-getcontractinfo) 查询。

    - **key_id** - *Number* - 对于第一个区块，是签署该交易的第一个区块的账户地址。

        对于所有其他区块，是签署该交易的账户地址。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBlocksTxInfo","id":1,"params":[1,2]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "1": [ //block_id
                {
                    "hash": "uXSaSrMWlbHpNlu049J5BDypC6MzBQ0/5VEfGQf+5aQ=",
                    "contract_name": "",
                    "params": null,
                    "key_id": 6667782293976713160
                }
            ],
            "2": [ //block_id
                {
                    "hash": "r8U9IKjtZ5Be5D4ak3zxLlDwn36CTdfIAsVvQhx7P3w=",
                    "contract_name": "@1NewUser",
                    "params": {
                        "Ecosystem": 1,
                        "NewPubkey": "d11ea197fe23152562c6f54c46335d9093f245ab5d22b13ff3e0e2132dc9ff38da77aa093945280c4cf5ad9e889c074dfd9080099982d8b2d4d100315e1cebc7"
                    },
                    "key_id": 6667782293976713160
                }
            ]
        }
    }
```


### **ibax.detailedBlocks** {#ibax-detailedblocks}
返回其中包含每个区块中交易的详细附加信息列表。

**参数**
- **block_id** - *Number* - 要查询的起始区块高度。

- **count** - *Number* - 区块数量，默认为25，最大请求100。


**返回值**
*Object* - 获取区块详情对象。
- **block_id** - *String* - 区块高度。
    - **header** - *Object* - 区块头 区块头包含以下字段:
        - **block_id** - *Number* - 区块高度。
        - **time** - *Number* - 区块生成时间戳。
        - **key_id** - *Number* - 签署该区块的账户地址。
        - **node_position** - *Number* - 在荣誉节点列表中生成区块的节点的位置。
        - **version** - *Number* - 区块结构版本。
    - **hash** - *[Hex](#hex) String* - 区块哈希。
    - **node_position** - *Number* - 在荣誉节点列表中生成区块的节点的位置。
    - **key_id** - *Number* - 签署该区块的账户地址。
    - **time** - *Number* - 区块生成时间戳。
    - **tx_count** - *Number* - 该区块内的交易数。
    - **size** - *String* - 该区块大小。
    - **rollback_hash** - *[Hex](#hex) String* - 区块回滚哈希值。
    - **merkle_root** - *[Hex](#hex) String* - 该区块交易的默克尔树。
    - **bin_data** - *[Hex](#hex) String* - 区块头、区块内所有交易、上一个区块哈希和生成该区块的节点私钥的序列化。
    -  **transactions** - *Object* - 交易 区块中的交易列表以及每个交易的附加信息：
        - **hash** - *[Hex](#hex) String* - 交易哈希。
        - **contract_name** - *String* - 合约名称。
        - **params** - *Object* - 合约参数,合约字段可通过 [ibax.getContractInfo](#ibax-getcontractinfo) 查询。
        - **key_id** - *Number* - 签署该交易的账户地址。
        - **time** - *Number* - 交易生成时间戳（unit：ms）。
        - **type** - *Number* - 交易类型。    
        - **size** - *String* - 交易大小。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlocks","id":1,"params":[1,2]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "1": { //block id
                "header": {
                    "block_id": 1,
                    "time": 1676512422,
                    "key_id": 6667782293976713160,
                    "node_position": 0,
                    "version": 3
                },
                "hash": "0d7d51b4c14bacbf45d812f73497ede8f22d678bc4be6e6848193f3b7262ac91",
                "node_position": 0,
                "key_id": 6667782293976713160,
                "time": 1676512422,
                "tx_count": 1,
                "size": "660.00B",
                "rollbacks_hash": "1a829923f2c9b1e259fdfb42cc1bc255e144dbfb352af7e072d0b9d61a94df15",
                "merkle_root": "36373332663064383331353264316333653639346431656436383734373634363463616363616564636632353232646335633736643066623737343931366363",
                "bin_data": "Cp4BCAEQppm...",
                "stop_count": 0,
                "transactions": [
                    {
                        "hash": "b9749a4ab31695b1e9365bb4e3d279043ca90ba333050d3fe5511f1907fee5a4",
                        "contract_name": "",
                        "params": null,
                        "key_id": 6667782293976713160,
                        "time": 1676512422406,
                        "type": 1,
                        "size": "250.00B"
                    }
                ]
            },
            "2": { //block id
                "header": {
                    "block_id": 2,
                    "time": 1676536235,
                    "key_id": 6667782293976713160,
                    "node_position": 0,
                    "version": 3
                },
                "hash": "dd13a30661d35e01df82027a6e6607eb47ee00765d69767dbb99e151676c2c96",
                "node_position": 0,
                "key_id": 6667782293976713160,
                "time": 1676536235,
                "tx_count": 1,
                "size": "1.53KiB",
                "rollbacks_hash": "9041312d69e6bcd37c91a2bfa066abaeb53b8398708937a618a89960bfadab3d",
                "merkle_root": "65366537383931353662613230356565396466353061316538656538643636323332316636616265623764633539616166346635343030383135386538643130",
                "bin_data": "Cp4BCAIQq9O...",
                "stop_count": 0,
                "transactions": [
                    {
                        "hash": "afc53d20a8ed67905ee43e1a937cf12e50f09f7e824dd7c802c56f421c7b3f7c",
                        "contract_name": "@1NewUser",
                        "params": {
                            "Ecosystem": 1,
                            "NewPubkey": "d11ea197fe23152562c6f54c46335d9093f245ab5d22b13ff3e0e2132dc9ff38da77aa093945280c4cf5ad9e889c074dfd9080099982d8b2d4d100315e1cebc7"
                        },
                        "key_id": 6667782293976713160,
                        "time": 1676536233945,
                        "type": 3,
                        "size": "390.00B"
                    }
                ]
            }
        }
    }
```


### **ibax.getKeyInfo** {#ibax-getkeyinfo}
返回一个生态系统列表，其中包含注册了指定地址的角色。

**参数**
- **account** - *String* - 账户地址。

**返回值**
*Object* - 指定地址生态列表对象。
- **account** - *String* - 账户地址。
- **ecosystems** - *Array* - 生态列表。
    - **ecosystem** - *String* - 生态系统id。
    - **name** - *String* - 生态系统名称。
    - **digits** - *Number* - 精度。
    - **roles** - *Array* - 角色列表。
        - **id** - *String* - 角色id 。
        - **name** - *String* - 角色名称。

 
**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getKeyInfo","id":1,"params":["0666-XXXX-XXXX-XXXX-5186"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "account": "0666-XXXX-XXXX-XXXX-5186",
            "ecosystems": [
                {
                    "ecosystem": "1",
                    "name": "platform ecosystem",
                    "digits": 12,
                    "roles": [
                        {
                            "id": "1",
                            "name": "Developer"
                        },
                        {
                            "id": "2",
                            "name": "Governancer"
                        }
                    ]
                }
            ]
        }
    }
```

### **ibax.detailedBlock** {#ibax-detailedblock}
返回区块中交易的详细附加信息列表。

**参数**
- **Block or Hash** - *[BlockOrHash](#blockorhash)* - 区块高度或区块Hash。

**返回值**
*Object* - 获取区块详情对象。
- **header** - *Object* - 区块头 区块头包含以下字段:
    - **block_id** - *Number* - 区块高度。
    - **time** - *Number* - 区块生成时间戳。
    - **key_id** - *Number* - 签署该区块的账户地址。
    - **node_position** - *Number* - 在荣誉节点列表中生成区块的节点的位置。
    - **version** - *Number* - 区块结构版本。

- **hash** - *[Hex](#hex) String* - 区块哈希。
- **node_position** - *Number* - 在荣誉节点列表中生成区块的节点的位置。
- **key_id** - *Number* - 签署该区块的账户地址。
- **time** - *Number* - 区块生成时间戳。
- **tx_count** - *Number* - 该区块内的交易数。
- **size** - *String* - 该区块大小。
- **rollback_hash** - *[Hex](#hex) String* - 区块回滚哈希值。
- **merkle_root** - *[Hex](#hex) String* - 该区块交易的默克尔树。
- **bin_data** - *[Hex](#hex) String* - 区块头、区块内所有交易、上一个区块哈希和生成该区块的节点私钥的序列化。
-  **transactions** - *Array* - 交易 区块中的交易列表以及每个交易的附加信息：
    - **hash** - *[Hex](#hex) String* - 交易哈希。
    - **contract_name** - *String* - 合约名称。
    - **params** - *Object* - 合约参数,合约字段可通过 [ibax.getContractInfo](#ibax-getcontractinfo) 查询。
    - **key_id** - *Number* - 签署该交易的账户地址。
    - **time** - *Number* - 交易生成时间戳（unit：ms）。
    - **type** - *Number* - 交易类型。    
    - **size** - *String* - 交易大小。

**示例**
```text
    //Request1
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlock","id":1,"params":["1"]}' http://127.0.0.1:7079

    //Request2
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlock","id":1,"params":["0d7d51b4c14bacbf45d812f7349...e6e6848193f3b7262ac91"]}' http://127.0.0.1:7079

    //Request3
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlock","id":1,"params":[{"id":1}]}' http://127.0.0.1:7079


    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "header": {
                "block_id": 1,
                "time": 1676512422,
                "key_id": 6667782293976713160,
                "node_position": 0,
                "version": 3
            },
            "hash": "0d7d51b4c14bacbf45d812f7349...e6e6848193f3b7262ac91",
            "node_position": 0,
            "key_id": 6667782293976713160,
            "time": 1676512422,
            "tx_count": 1,
            "size": "660.00B",
            "rollbacks_hash": "1a829923f2c9b1e259fdfb42cc1bc255e144dbfb352af7e072d0b9d61a94df15",
            "merkle_root": "3637333266306438333135...623737343931366363",
            "bin_data": "Cp4BCAEQppm2nwYgyI/8gLSVrsRcMkAFGTK6nxD86hfhgQX0dWzO8aYZExDN9UPm8sKkqeUbwrNliYuCJHvvdX+txINnM7+gDqtMF/1K43kc0gYC0u8uOiANfVG0wUusv0XYEvc0l+3o8i1ni8S+bmhIGT87cmKskUIgBEhSsqZwreVAfnj7KGPFHen8uWVCoHGG/jrtpruKEW1IA1ABYAESRDogQBBdW8EBBcF/1yuTqPczaeLubu5NRxS3v3vzwvFW5gFCIARIUrKmcK3lQH54+yhjxR3p/LllQqBxhv467aa7ihFtGkA2NzMyZjBkODMxNTJkMWMzZTY5NGQxZWQ2ODc0NzY0NjRjYWNjYWVkY2YyNTIyZGM1Yzc2ZDBmYjc3NDkxNmNjKugCeJxibFvmk5+enlp0YK1LUkhRYl5xYnJJZn7egSUuiSWJ7Uu9Uys9XS7HdOxY7SDPfmJJSGZu6mUGBgaG5Lc9y1YGlCblZCZ7p1YecejvOPzyp63tWeYpWS+nxBTv3biTOUTqg7vfgedPuXdbnjsmYX49a9mXA025NT4TbjQ65bQwbloQcjbQRG3ZudjjUxuL1/rlp6QimTfLcZNH0o/bie/SfiskTNm1tPrfmrrlbdfMklamXHR53XpxwSODSb1hX3Kvyb1fU+awbZVG8yaXmGqtO3wR8jPsP6y7vTW4JL/AL7WkPL8o2zm1qMSpNC8lJ/XAkpDU4hKwBxgYGBg3BhRlliWWpDrl5CdnJ2ckZuadh0oxrAT5tLgkMbfgMgMDY1v42yy2ZSEVHonFGUcUdpbM8tosNnXjS7PoLY8vVbLYrORebMzKa/80UF6S/d/TJcsDEitz8hNTjvwaueEHCAAA//+pZRGv",
            "stop_count": 0,
            "transactions": [
                {
                    "hash": "b9749a4ab31695b1e9365bb4e3d279043ca90ba333050d3fe5511f1907fee5a4",
                    "contract_name": "",
                    "params": null,
                    "key_id": 6667782293976713160,
                    "time": 1676512422406,
                    "type": 1,
                    "size": "250.00B"
                }
            ]
        }
    }
```

### **ibax.maxBlockId** {#ibax-maxblockid}
获取当前节点上的最高区块ID。

**参数**
无

**返回值**
- *Number* - 当前节点上的最高区块。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.maxBlockId","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 774
    }
```


### **ibax.getKeysCount** {#ibax-getkeyscount}
获取当前节点上的总地址数。

**参数**
无
**返回值**
- **Count** - *Number* - 总地址数。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getKeysCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 11
    }
```


### **ibax.getTxCount** {#ibax-gettxcount}
获取当前节点总交易数。

**参数**
无

**返回值**
- **Count** - *Number* - 总交易数。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getTxCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 149068
    }
```


### **ibax.getTransactionCount** {#ibax-gettransactioncount}
获取区块交易数。

**参数**
- **block or hash**  - *[BlockOrHash](#blockorhash)* - 区块高度或区块Hash。

**返回值**
- **Count** - *Number* - 区块总数量。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getTransactionCount","id":1,"params":["efc386f7573269610a34af9cc722f775cca8183ccaa0ed7a96db61ef0bde6d1c"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 337
    }
```


### **ibax.getBlocksCountByNode** {#ibax-getblockscountbynode}
获取节点位置打包区块数。
**参数**
- **nodePosition** - *Number* - 节点下标。

- **consensusMode** - *Number* - 共识模式，参数（1: 创建者管理模式 2:DAO治理模式）。

**返回值**
*Object* - 获取节点下标打包数对象。
- **total_count** - *Number* - 总区块数。

- **partial_count** - *Number* - 节点下标打包区块数。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBlocksCountByNode","id":1,"params":[0,1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "total_count": 774,
            "partial_count": 774
        }
    }
```


### **ibax.honorNodesCount** {#ibax-honornodescount}
获取荣誉节点数量。

**参数**
无

**返回值**
- **Count** - *Number* - 节点数量。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.honorNodesCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 1
    }
```


### **ibax.getEcosystemCount** {#ibax-getecosystemcount}
获取生态系统的数量。

**参数**
无

**返回值**
- **Count** - *Number* - 生态数。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getEcosystemCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 2
    }
```




### **ibax.ecosystemInfo** {#ibax-ecosysteminfo}
获取生态信息。

**参数**
- **ecosystem id** - *Number* - 生态ID。

**返回值**
- **id** - *Number* - 生态ID。
- **name** - *String* - 生态名称。
- **digits** - *Number* - 精度。
- **token_symbol** - *String* - 代币符号。
- **token_name** - *String* - 代币名称。
- **total_amount** - *String* - 发行量（第一次发行量，如未发行则为 `"0"`）。
- **is_withdraw** - *Bool* - 可销毁 `true:可销毁 false:不可销毁`。
- **withdraw** - *String* - 销毁量（如不可销毁，或未销毁则为 `"0"`）。
- **is_emission** - *Bool* - 可增发 `true:可增发 false:不可增发`。
- **emission** - *String* - 增发量 (如不可增发，或未增发则为 `"0"`)。
- **introduction** - *String* - 生态简介。
- **logo** - *Number* - 生态Logo Id（对应Binary table id），可通过RESTFUL API 获取。
- **creator** - *String* - 生态创建者。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.ecosystemInfo","id":1,"params":[1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 2,
        "result": {
            "id": 5,
            "name": "test name",
            "digits": 6,
            "token_symbol": "test",
            "token_name": "test Coin",
            "total_amount": "10000",
            "is_withdraw": true,
            "withdraw": "100000000000900000",
            "is_emission": true,
            "emission": "100000000001000000",
            "introduction": "this is a test introduction",
            "logo": 6,
            "creator": "0666-0819-7161-7879-5186"
        }
    }
```


### **ibax.appParams** {#ibax-appparams}
返回当前或指定生态系统中的应用程序参数列表。

[Authorization](#authorization)

**参数**
- **appid** - *Number* - 应用程序ID。

- **ecosystem** - *Number* - [Omitempty](#omitempty) - 生态系统ID；

    如果未指定或为0，将返回当前生态系统的参数。

- **names** - *String* - [Omitempty](#omitempty) - 筛选应用参数名称。
    
    由逗号分隔的名称列表，例如: `name1,name2`。

- **offset** - *Number* - [Omitempty](#omitempty) 偏移量，默认为0。

- **limit** - *Number* [Omitempty](#omitempty) 条目条数，默认10条,最多100条。
 
**返回值**

*Array* - 应用参数列表。
- **app_id** - *Number* - 应用程序ID。
- **list** - *Number* - 数组中的每个元素包含以下参数。
    - **id** - *String* - 参数ID，唯一；
    - **name** - *String* - 参数名称；
    - **value** - *String* - 参数值；
    - **conditions** - *String* - 更改参数的权限。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.appParams","id":1,"params":[1,1,"role_developer,role_governancer"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "app_id": 1,
            "list": [
                {
                    "id": "4",
                    "name": "role_developer",
                    "value": "1",
                    "conditions": "ContractConditions(\"MainCondition\")"
                },
                {
                    "id": "5",
                    "name": "role_governancer",
                    "value": "2",
                    "conditions": "ContractConditions(\"MainCondition\")"
                }
            ]
        }
    }
```


### **ibax.getEcosystemParams** {#ibax-getecosystemparams}
获取生态系统参数列表。

[Authorization](#authorization)

**参数**
- **ecosystem** - *Number* - [Omitempty](#omitempty) - 生态系统ID。
    
    如果为0或者无此参数时，默认：当前生态id。

- **names** - *String* - [Omitempty](#omitempty) - 筛选参数名称。
    
    由逗号分隔的名称列表，例如: `name1,name2`。
    
    当有筛选参数时,*offset* 与 *limit* 参数无效。

- **offset** - *Number* - [Omitempty](#omitempty) 偏移量，默认为0。

- **limit** - *Number* [Omitempty](#omitempty) 条目条数，默认10条,最多100条。


**返回值**
- **list** - *Array* - 数组中的每个元素包含以下参数：
    - **id** - *String* - 参数id，唯一。
    - **name** - *String* - 参数名称。
    - **value** - *String* - 参数值。
    - **conditions** - *String* - 更改参数的权限。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getEcosystemParams","id":1,"params":[0,"changing_app_params,changing_language"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "list": [
                {
                    "id": "9",
                    "name": "changing_app_params",
                    "value": "ContractConditions(\"DeveloperCondition\")",
                    "conditions": "ContractConditions(\"DeveloperCondition\")"
                },
                {
                    "id": "4",
                    "name": "changing_language",
                    "value": "ContractConditions(\"DeveloperCondition\")",
                    "conditions": "ContractConditions(\"DeveloperCondition\")"
                }
            ]
        }
    }
```


### **ibax.getTableCount** {#ibax-gettablecount}
返回当前生态系统的数据表列表。

可以设置偏移量和条目条数。

[Authorization](#authorization)
**参数**

- **offset** - *Number* - [Omitempty](#omitempty) 偏移量，默认为0。

- **limit** - *Number* [Omitempty](#omitempty) 条目条数，默认25条,最多100条。

**返回值**
- **count** - *Number* - 当前生态数据表总张数。

- **list** - *Array* - 数组中的每个元素包含以下参数：
    - **name** - *String* - 无前缀的数据表名称。
    - **count** - *String* - 数据表中的条目数。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getTableCount","id":1,"params":[0,2]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 32,
            "list": [
                {
                    "name": "app_params",
                    "count": "41"
                },
                {
                    "name": "applications",
                    "count": "7"
                }
            ]
        }
    }
```


### **ibax.getTable** {#ibax-gettable}
返回当前生态系统请求数据表的相关信息。

[Authorization](#authorization)

**参数**
- **tableName** - *String* - 数据表名称。

**返回值**
- **name** - *String* - 数据表名称。

- **insert** - *String* - 新增条目的权限。

- **new_column** - *String* - 新增字段权限。

- **update** - *String* - 更改条目权限。

- **app_id** - *String* - 应用程序id。

- **conditions** - *String* - 更改权限的条件。

- **columns** - *Array* - 数据表字段相关信息数组：
    - **name** - *String* - 字段名称。
    - **type** - *String* - 字段数据类型。
    - **perm** - *String* - 更改该字段值的权限。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getTable","id":1,"params":["app_params"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "name": "app_params",
            "insert": "ContractConditions(\"DeveloperCondition\")",
            "new_column": "ContractConditions(\"@1MainCondition\")",
            "update": "ContractAccess(\"@1EditAppParam\")",
            "conditions": "ContractConditions(\"@1MainCondition\")",
            "app_id": "1",
            "columns": [
                {
                    "name": "value",
                    "type": "text",
                    "perm": "ContractAccess(\"@1EditAppParam\")"
                },
                {
                    "name": "app_id",
                    "type": "number",
                    "perm": "ContractAccess(\"@1ItemChangeAppId\")"
                },
                {
                    "name": "ecosystem",
                    "type": "number",
                    "perm": "false"
                },
                {
                    "name": "conditions",
                    "type": "text",
                    "perm": "ContractAccess(\"@1EditAppParam\")"
                },
                {
                    "name": "permissions",
                    "type": "json",
                    "perm": "ContractConditions(\"@1MainCondition\")"
                },
                {
                    "name": "name",
                    "type": "varchar",
                    "perm": "false"
                }
            ]
        }
    }
```


### **ibax.getList** {#ibax-getlist}
返回指定数据表的条目。

可以指定要返回的列。

可以设置偏移量和条目条数。

可以设置查询条件。

对数据表中类型为*BYTEA*(字节数组、哈希、字节码数组)做16进制编码处理。

[Authorization](#authorization)

**参数**
*Object* - 获取数据表对象。
- **name** - *String* - 数据表名称。

- **limit** - *Number* - [Omitempty](#omitempty) 条目条数，默认25条。

- **offset** - *Number* - [Omitempty](#omitempty) 偏移量，默认为0。

- **order** - *String* - [Omitempty](#omitempty) 排序方式，默认id ASC。

- **columns** - *String* - [Omitempty](#omitempty) 请求列的列表，以逗号分隔，如果未指定，将返回所有列。

    在所有情况下都会返回id列。   

- **where** - *Object* - [Omitempty](#omitempty)

    查询条件，Example:如果要查询 id>2 和 name = john，

    你可以使用 `where:{"id":{"$gt":2},"name":{"$eq":"john"}}`，
    
    详情请参考[DBFind](../topics/script.md#dbfind) where 语法。

**返回值**
- **count** - *Number* - 条目总数。
- **list** - *Array* - 数组中的每个元素包含以下参数：

    - **id** - *String* - 条目ID。
    - **...** - 数据表其他列。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getList","id":1,"params":[{"name":"@1history","where":{"$and": [{"id":{"$gt": 2}}, {"id":{"$lt": 5}}]}}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 2,
            "list": [
                {
                    "amount": "1000000000000000000",
                    "block_id": "4",
                    "comment": "UTXO",
                    "created_at": "1676538080433",
                    "ecosystem": "1",
                    "id": "3",
                    "recipient_balance": "1000000000000000000",
                    "recipient_id": "666...160",
                    "sender_balance": "1000000000000000000",
                    "sender_id": "666...3160",
                    "status": "0",
                    "txhash": "2ac156c0ce55c10fd485cb9d59f50e3f9b269fb9bb69571d3c2eeae033d6c6cc",
                    "type": "24",
                    "value_detail": "NULL"
                }
            ]
        }
    }
```


### **ibax.getSections** {#ibax-getsections}
返回当前生态系统的 选项卡表条目的列表，可以设置偏移量和条目条数。

如果 *role_access*字段包含角色列表，并且不包括当前角色，则不会返回记录。*title*字段内数据将被请求头的 *Accept-Language* 语言资源替换。

[Authorization](#authorization)

**参数**

- *Object* - 获取sections请求对象。
    - **limit** - *Number* - [Omitempty](#omitempty) - 条目条数，默认25条。

    - **offset** - *Number* - [Omitempty](#omitempty) - 偏移量，默认为0。

    - **lang** - *String* - [Omitempty](#omitempty) - 
        
        该字段指定多语言资源代码或本地化，例如：*en，zh*。如果未找到指定的多语言资源，例如：*en-US*，则在多语言资源组, **default**: **en** 中搜索。

**返回值**

- **count** - *Number* - 选项卡 条目总数。

- **list** - *Array* - 数组中每个元素都包含sections表中所有列的信息。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getSections","id":1,"params":[{"offset":0,"limit":2}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 2,
            "list": [
                {
                    "ecosystem": "1",
                    "id": "1",
                    "page": "default_page",
                    "roles_access": "[]",
                    "status": "2",
                    "title": "Home",
                    "urlname": "home"
                },
                {
                    "ecosystem": "1",
                    "id": "2",
                    "page": "developer_index",
                    "roles_access": "[]",
                    "status": "1",
                    "title": "Developer",
                    "urlname": "developer"
                }
            ]
        }
    }
```


### **ibax.getRow** {#ibax-getrow}
返回当前生态系统中指定数据表的条目。可以指定要返回的列。

[Authorization](#authorization)
**参数**
- **tableName** - *String* - 数据表名称。

- **id** - *Number* - 条目ID。

- **columns** - *String* - [Omitempty](#omitempty)

    请求列的列表，以逗号分隔，如果未指定，将返回所有列。
    
    如不筛选可置空""。
    
    在所有情况下都会返回id列。

- **whereColumn** - *String* - [Omitempty](#omitempty) - 查找列名（只可查找Number类型列）。

**返回值**
- **value**- *Object* - 接收列值的对象。
    - **id** - *String* - 条目ID。
    - **...** - 请求列的序列。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getRow","id":1,"params":["@1history",4,"id,sender_id,recipient_id,amount,ecosystem,created_at","id"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "value": {
                "amount": "680388766240",
                "created_at": "1677222830899",
                "ecosystem": "1",
                "id": "296",
                "recipient_id": "6667782293976713160",
                "sender_id": "6660819716178795186"
            }
        }
    }
```


### **ibax.systemParams** {#ibax-systemparams}
返回平台参数列表。

[Authorization](#authorization)
**参数**
- **names** - *String* [Omitempty](#omitempty) - 请求参数列表，用逗号分隔。

    例如 `names="name1,name2"`。当有筛选参数时,*offset* 与 *limit* 参数无效。

- **offset** - *Number* - [Omitempty](#omitempty) 偏移量，默认为0。

- **limit** - *Number* [Omitempty](#omitempty) 条目条数，默认10条,最多100条。

**返回值**

-   **list** - *Array* - 数组中每个元素包含以下参数：
    - **id** - *String* - 唯一id。
    - **name** - *String* - 参数名称。
    - **value** - *String* - 参数值。
    - **conditions** - *String* - 更改参数的权限。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.systemParams","id":1,"params":["gap_between_blocks,honor_nodes"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "list": [
                {
                    "id": "4",
                    "name": "gap_between_blocks",
                    "value": "2",
                    "conditions": "ContractAccess(\"@1UpdatePlatformParam\")"
                },
                {
                    "id": "6",
                    "name": "honor_nodes",
                    "value": "",
                    "conditions": "ContractAccess(\"@1UpdatePlatformParam\")"
                }
            ]
        }
    }
```


### **ibax.history** {#ibax-history}
返回当前生态系统中指定数据表中条目的更改记录。

[Authorization](#authorization)
**参数**

- **name** - *String* - 数据表名称。
- **tableId** - *Number* - 条目ID。

**返回值**
- **list** - *Array* - 数组中每个元素包含所请求条目的更改记录。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.history","id":1,"params":["contracts",1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "list": [
                {
                    "conditions": "ContractConditions(\"MainCondition\")",
                    "ecosystem": "1",
                    "value": "// This contract is used to set \"developer\" rights....."
                }
            ]
        }
    }
```


### **ibax.getPageRow** {#ibax-getpagerow}
获取当前生态系统pages数据表字段的条目。

[Authorization](#authorization)

**参数**
- **name** - *String* - 指定表中条目的名称。

**返回值**
- **id** - *Number* - 条目ID。
- **name** - *String* - 条目名称。
- **value** - *String* - 内容。
- **menu** - *String* - 目录。
- **nodesCount** - *Number* - 页面所需验证的节点数。
- **app_id** - *Number* - 应用Id。
- **conditions** - *String* - 更改参数的权限。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getPageRow","id":1,"params":["default_page"]}' http://127.0.0.1:7079


    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 5,
            "name": "default_page",
            "value": "If(#account_id# == #guest_account#){\n    Include(@1apps_description)\n}.Else{\n    Include(@1profile)\n}",
            "menu": "default_menu",
            "nodesCount": 1,
            "app_id": 1,
            "conditions": "ContractConditions(\"@1DeveloperCondition\")"
        }
    }
```


### **ibax.getMenuRow** {#ibax-getmenurow}
获取当前生态系统menu数据表字段的条目。

[Authorization](#authorization)

**参数**
- **name** - *String* - 指定表中条目的名称。

**返回值**
- **id** - *Number* - 条目ID。
- **name** - *String* - 条目名称。
- **title** - *String* - 标题。
- **value** - *String* - 内容。
- **conditions** - *String* - 更改参数的权限。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getMenuRow","id":1,"params":["default_menu"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 2,
            "name": "default_menu",
            "title": "default",
            "value": "\nMenuItem.....",
            "conditions": "ContractConditions(\"@1DeveloperCondition\")"
        }
    }
```


### **ibax.getSnippetRow** {#ibax-getsnippetrow}
获取当前生态系统snippet数据表字段的条目。

[Authorization](#authorization)

**参数**
- **name** - *String* - 指定表中条目的名称。

**返回值**
- **id** - *Number* - 条目ID。
- **name** - *String* - 条目名称。
- **value** - *String* - 内容。
- **conditions** - *String* - 更改参数的权限。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getSnippetRow","id":1,"params":["welcome"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 12,
            "name": "welcome",
            "value": "Div(content-wrapper)....",
            "conditions": "ContractConditions(\"@1DeveloperCondition\")"
        }
    }
```


### **ibax.getAppContent** {#ibax-getappcontent}
获取应用相关信息（包括page、snippet、menu）。

[Authorization](#authorization)

**参数**
- **id** - *Number* - 应用id。

**返回值**
- **snippets** - *Array* - 代码片段信息数组。

    - **id** - *Number* - id。
    - **name** - *String* - 代码片段名称。

- **pages** - *Array* - 页面信息数组。

    - **id** - *Number* - id。
    - **name** - *String* - 页面名称。

- **contracts** - *Array* - 合约信息数组。

    - **id** - *Number* - id。
    - **name** - *String* - 合约名称。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}}" -d '{"jsonrpc":"2.0","method":"ibax.getAppContent","id":1,"params":[1]}' http://127.0.0.1:7079
    
    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "snippets": [ //if not app snippets is null array,example:[]
                {
                    "id": 2,
                    "name": "developer_link"
                },
                {
                    "id": 3,
                    "name": "export_info"
                }
            ],
            "pages": [  //if not app pages is null array,example:[]
                {
                    "id": 6,
                    "name": "menus_list"
                },
                {
                    "id": 7,
                    "name": "params_edit"
                }
            ],
            "contracts": [  //if not app contracts is null array,example:[]
                {
                    "id": 2,
                    "name": "MainCondition"
                },
                {
                    "id": 33,
                    "name": "NodeOwnerCondition"
                }
            ]
        }
    }
```


### **ibax.getMember** {#ibax-getmember}
获取成员信息。

**参数**
**account** - *String* - 成员信息。

**ecosystemId** - *Number* - 生态id。


**返回值**
- **id** - *Number* - 成员id。
- **member_name** - *String* - 名称。
- **image_id** - *Number* - 头像id。
- **member_info** - *String* - 简介。


**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}}" -d '{"jsonrpc":"2.0","method":"ibax.getMember","id":1,"params":["1497-2036-4953-3607-1121",1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 14,
            "member_name": "som",
            "image_id": 5,           
            "member_info": "{\"information\": \"Everything will be okay in the end. If it's not okay, it's not the end.\"}"
        }
    }
```

### **ibax.getContracts** {#ibax-getcontracts}
获取当前生态系统中的合约列表，可以设置偏移量和条目条数。

[Authorization](#authorization)

**参数**
- **offset** - *Number* - [Omitempty](#omitempty) 偏移量，默认为0。
- **limit** - *Number* - [Omitempty](#omitempty) 条目条数，默认25条。

**返回值**
- **count** - *Number* - 条目总数。

- **list** - *Array* - 数组中每个元素包含以下参数：
    - **id** - *String* - 合约ID。
    - **name** - *String* - 合约名称。
    - **value** - *String* - 合约内容。
    - **wallet_id** - *String* - 合约绑定的账户地址。
    - **address** - *String* - 合约绑定的钱包地址 `XXXX-...-XXXX`。
    - **ecosystem_id** - *String* - 合约所属的生态系统ID。
    - **app_id** - *String* - 合约所属的应用程序ID。
    - **conditions** - *String* - 更改合约的权限。
    - **token_id** - *String* - 作为支付合约费用的通证所在的生态系统ID。


**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getContracts","id":1,"params":[0,1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 293,
            "list": [
                {
                    "address": "0000-0000-0000-0000-0000",
                    "app_id": "1",
                    "conditions": "ContractConditions(\"@1DeveloperCondition\")",
                    "ecosystem_id": "1",
                    "id": "1",
                    "name": "DeveloperCondition",
                    "token_id": "1",
                    "value": "// This contract is used to ...",
                    "wallet_id": "0"
                }
            ]
        }
    }
```


### **ibax.getContractInfo** {#ibax-getcontractinfo}
返回指定合约的相关信息。

[Authorization](#authorization)

**参数**
- **contractName** - *String* - 合约名称。格式为 `@ecosystem_id%%contractName%`,例@1contractName(指定生态1合约名称contractName)或者contractName(当前生态合约名称contractName)。
    
**返回值**

- **id** - *Number* - VM中合约ID。
- **name** - *String* - 带生态系统ID的合约名称 `@1MainCondition`。
- **state** - *Number* - 合约所属的生态系统ID。
- **walletid** - *String* - 合约绑定的账户地址
- **tokenid** - *String* - 作为支付合约费用的通证所在的生态系统ID。
- **address** - *String* - 合约绑定的钱包地址 `XXXX-...-XXXX`。
- **tableid** - *String* - *contracts* 表中合约所在的条目ID。
- **fields** - *Array* - 数组中包含合约 **data** 部分每个参数的结构信息：
    - **name** - *String* - 参数名称。
    - **type** - *String* - 参数类型。
    - **optional** - *Bool* - 参数选项，`true` 表示可选参数，`false` 表示必选参数。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getContractInfo","id":1,"params":["@1TokensSend"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 5098,
            "state": 1,
            "tableid": "98",
            "walletid": "0",
            "tokenid": "1",
            "address": "0000-0000-0000-0000-0000",
            "fields": [
                {
                    "name": "Amount",
                    "type": "money",
                    "optional": false
                },
                {
                    "name": "Recipient",
                    "type": "string",
                    "optional": true
                },
                {
                    "name": "iName",
                    "type": "string",
                    "optional": true
                },
                {
                    "name": "Comment",
                    "type": "string",
                    "optional": true
                },
                {
                    "name": "Ecosystem",
                    "type": "int",
                    "optional": true
                }
            ],
            "name": "@1TokensSend"
        }
    }
```


### **ibax.sendTx** {#ibax-sendtx}
接收参数中的交易并将其添加到交易队列，如果请求执行成功，则返回交易哈希。该哈希可获得区块内对应的交易，在发生错误响应时，该哈希包含在错误文本信息中。

[Authorization](#authorization)

**参数**
- *Object* - 交易数据对象
    - **tx_key** - *String* - 交易内容，该参数可指定任何名称，支持接收多个交易。

**返回值**
- **hashes** - *Array* - 交易哈希数组：
   - **tx1** - *String* - 交易1的哈希。
   - **txN** - *String* - 交易N的哈希。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.sendTx","id":1,"params":[{"tx1":...,"txN":...}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "hashes":[
                {"hash1":"hash1"},
                {"hashN":"hashN"}
            ]
        }
    }
```


### **ibax.txStatus** {#ibax-txstatus}
获取指定交易哈希的区块ID和错误信息，如果区块ID和错误文本信息的返回值为空，则该交易尚未包含在区块中。

[Authorization](#authorization)

**参数**
- **hashes** - *String* - 交易哈希,使用 `,` 分割。

**返回值**
- **hash** - *Object* - 交易哈希。
    - **blockid** - *String* - 如果交易执行成功，则返回区块ID； 

        如果交易执行失败，则 *blockid* 为 `0`, 如果交易执行错误被惩罚会返回对应区块ID。
    
    - **result** - *String* - 通过 **\$result** 变量返回交易结果。
    - **errmsg** - *Object* - [Omitempty](#omitempty) 如果执行交易失败，则返回错误文本信息。
        - **type** - *String* - 错误类型。
        - **error** - *String* - 错误信息。
    - **penalty** - *Number* - 如果交易执行失败，（0：无惩罚 1：惩罚）。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.txStatus","id":1,"params":["cf46ef1ce7ecfcf48ccf209577fb8a2130426b71adc3a3855aff7f68d114fca9,4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 2,
        "result": {
            "4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b": {
                "blockid": "793",
                "result": "",
                "penalty": 0
            },
            "cf46ef1ce7ecfcf48ccf209577fb8a2130426b71adc3a3855aff7f68d114fca9": {
                "blockid": "793",
                "errmsg": {
                    "type": "warning",
                    "error": "platform ecosystem can not be burning Tokens"
                },
                "result": "",
                "penalty": 1
            }
        }
    }
```


### **ibax.txInfo** {#ibax-txinfo}
返回指定哈希的交易相关信息，包括区块ID和确认数。如果指定可选参数，还可返回合约名称及其相关参数。

**参数**
- **hash** - *String* - 交易哈希。

- **contractinfo** - *Bool* [Omitempty](#omitempty) - 合约详细参数标识，获取该交易相关的合约详情,默认为`false`。

**返回值**
- **blockid** - *Number* - 包含该交易的区块ID。如果该值为 `0`，则找不到该哈希的交易。如果交易发生在当前节点上，可通过[ibax.txStatus](#ibax-txstatus)获取。

- **confirm** - *Number* - 该区块 *blockid* 的节点确认数。

- **data** - *Object* - 如果指定了 `contentinfo=true`，则返回合约详情信息。未指定时为null。
    - **block_id** - *Number* - 区块高度。
    - **block_hash** - *String* - 区块hash。
    - **address** - *String* - 交易创建地址。
    - **ecosystem** - *String* - 交易发送生态id。
    - **hash** - *String* - 交易hash。
    - **expedite** - *String* - 加急费,如果没有则为""。
    - **contract_name** - *String* - 合约名称。
    - **params** - *Object* - 合约参数,合约字段可通过 [ibax.getContractInfo](#ibax-getcontractinfo) 查询。
    - **created_at** - *Number* - 交易产生时间。
    - **size** - *String* - 交易大小 unit：B;KiB;MiB;GiB;TiB。
    - **status** - *String* - 状态（0:成功 1:惩罚）。


**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.txInfo","id":1,"params":["020d8c004b3a0c00a6bfffa36e2746509295e5ea6dbb14e7cd6098c3d906bb58",true]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "blockid": "796",
            "confirm": 0,
            "data": {
                "block_id": 796,
                "block_hash": "bccbc3cf47b49bee5fb7321810884db49b73f5114b0a6fcd234dd3fdf9c22ef4",
                "address": "0666-7782-2939-7671-3160",
                "ecosystem": 2,
                "hash": "020d8c004b3a0c00a6bfffa36e2746509295e5ea6dbb14e7cd6098c3d906bb58",
                "expedite": "1",
                "contract_name": "@1TokensSend",
                "params": {
                    "Amount": "1000000000000",
                    "Recipient": "0666-7782-2939-7671-3160"
                },
                "created_at": 1678774455841,
                "size": "213.00B",
                "status": 1
            }
        }
    }
```


### **ibax.txInfoMultiple** {#ibax-txinfomultiple}
返回指定哈希列表的交易相关信息。

**参数**
- **hashes** - *Array* - 交易哈希列表。

- **contractinfo** - *Bool* [Omitempty](#omitempty) - 合约详细参数标识，获取该交易相关的合约详情,默认为`false`。

**返回值**
-   **results** - *Array* - 数据字典中交易哈希作为键，交易详细作为值。
    - **hash** - *String* - 交易哈希。
        - **blockid** - *Number* - 包含该交易的区块ID。如果该值为 `0`，则找不到该哈希的交易。
        - **confirm** - *Number* - 该区块 *blockid* 的确认数。
        - **data** - *Object* - 如果指定了 `contentinfo=true`，则合约详情返回给该参数。未指定时为null。
            - **block_id**- *Number* - 区块高度。
            - **block_hash** - *String* - 区块hash。
            - **address** - *String* - 交易创建地址。
            - **ecosystem** - *String* - 交易发送生态id。
            - **hash** - *String* - 交易hash。
            - **expedite** - *String* - 加急费,如果没有则为""
            - **contract_name** - *String* - 合约名称。
            - **params** - *Object* - 合约参数,合约字段可通过 [ibax.getContractInfo](#ibax-getcontractinfo) 查询。
            - **created_at** - *Number* - 交易产生时间
            - **size** - *String* - 交易大小 unit：B;KiB;MiB;GiB;TiB。
            - **status** - *String* - 状态（0:成功 1:惩罚）。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getPageValidatorsCount","id":1,"params":[["1875b4fc02a8bf5ccf0d3fbce83011dd6711d8d325c7d731ac659b8beffc0284","4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b"],true]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "results": {
                "1875b4fc02a8bf5ccf0d3fbce83011dd6711d8d325c7d731ac659b8beffc0284": {
                    "blockid": 0,
                    "confirm": 0,
                    "data": null
                },
                "4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b": {
                    "blockid": 793,
                    "confirm": 0,
                    "data": {
                        "block_id": 793,
                        "block_hash": "ef3b2f2e18662e0b8bba136a209e30c5aae76d9a82e0b21209786f62fe5676e4",
                        "address": "0666-0819-7161-7879-5186",
                        "ecosystem": 1,
                        "hash": "4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b",
                        "expedite": "1",
                        "contract_name": "@1TokensSend",
                        "params": {
                            "Amount": "200",
                            "Comment": "Hello Dear",
                            "Recipient": "1196-2490-5275-7101-3496"
                        },
                        "created_at": 1678765099072,
                        "size": "297.00B",
                        "status": 0
                    }
                }
            }
        }
    }
```


### **ibax.getPageValidatorsCount** {#ibax-getpagevalidatorscount}
返回指定页面所需验证的节点数。

**参数**
- **name** - *String* - 页面名称，格式为 `@ecosystem_id%%page_name%`,例@1params_list(指定生态1页面名称params_list)或者params_list(当前生态页面名称params_list)。


**返回值**
- **validate_count** - *Number* - 指定页面所需验证的节点数。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getPageValidatorsCount","id":1,"params":["@1params_list"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "validate_count": 1
        }
    }
```


### **ibax.getPage** {#ibax-getpage}
获取指定页面名称的代码JSON对象树，这是模版引擎处理的结果。

[Authorization](#authorization)

**参数**
-   **name** - *String* - 带生态系统ID的页面名称，格式为 `@ecosystem_id%%page_name%`，例如 `@1main_page`。

    如果不带生态系统ID，则默认查找当前生态的页面，例如 `main_page`。

**返回值**
- **menu** - *String* - 页面所属的菜单名称。

- **menutree** - *Array* - 页面的菜单JSON对象树。

- **tree** - *Array* - 页面JSON对象树。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getPage","id":1,"params":["@1params_list"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "menu": "developer_menu",
            "menutree": [
                {
                    "tag": "menuitem",
                    "attr": {
                        "icon": "icon-cloud-upload",
                        "page": "@1import_upload",
                        "title": "Import"
                    }
                }
                ...
            ],
            "tree": [
                {
                    ....
                }
                ...
            ],
            "nodesCount": 1
        }
    }
```


### **ibax.getMenu** {#ibax-getmenu}
获取指定菜单名称的代码JSON对象树，这是模版引擎处理的结果。

[Authorization](#authorization)

**参数**
-   **name** - *String* -
    > 带生态系统ID的菜单名称，格式为 `@ecosystem_id%%menu_name%`，例如 `@1main_menu`。如果不带生态系统ID，则默认查找当前生态的菜单，例如 `main_menu`

**返回值**

- **title** - *String* - 菜单标题。

- **tree** - *Array* - 菜单JSON对象树。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getMenu","id":1,"params":["@1default_menu"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "title": "default",
            "tree": [
                {
                    "tag": "menuitem",
                    "attr": {
                        "icon": "icon-cloud-upload",
                        "page": "@1import_upload",
                        "title": "Import"
                    }
                }
                ...
            ]
        }
    }
```


### **ibax.getSource** {#ibax-getsource}
返回指定页面名称的代码JSON对象树。不执行任何函数或接收任何数据。返回的JSON对象树对应于页面模版，可以在可视化页面设计器中使用。如果找不到页面，则返回404错误。


[Authorization](#authorization)

**参数**
-   **name** - *String* -
    带生态系统ID的页面名称，格式为 `@ecosystem_id%%page_name%`，例如 `@1main_page`。如果不带生态系统ID，则默认查找当前生态的页面例如 `main_page`。
    
**返回值**
-   **tree** - *Array* - 页面的JSON对象树。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getSource","id":1,"params":["@1params_list"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "tree": [
                {
                    "tag": "dbfind",
                    "attr": {
                        "name": "@1applications"
                    },
                    "tail": [
                        {
                            "tag": "where",
                            "attr": {
                                "where": "{\"ecosystem\": \"#ecosystem_id#\", \"name\": \"System\"}"
                            }
                        }
						...
                    ]
                },
                {
                    "tag": "setvar",
                    "attr": {
                        "name": "role_developer_id",
                        "value": "AppParam(Ecosystem: #ecosystem_id#, App: #application_id#, Name: role_developer)"
                    }
                },
                {
                    "tag": "dbfind",
                    "attr": {
                        "name": "@1roles_participants"
                    },
                    "tail": [
                        {
                            "tag": "where",
                            "attr": {
                                "where": "{\"ecosystem\": \"#ecosystem_id#\", \"$and\": [{\"role->id\": {\"$in\": [#role_developer_id#]}}, {\"role->id\": \"#role_id#\"}], \"member->account\": \"#account_id#\", \"deleted\": 0}"
                            }
                        }
						...
                    ]
                },
                {
                    "tag": "if",
                    "attr": {
                        "condition": "#developer_access_id#>0"
                    },
                    "children": [
                        {
                            "tag": "setvar",
                            "attr": {
                                "name": "this_page",
                                "value": "@1params_list"
                            }
                        }
						...
                    ],
                    "tail": [
                        {
                            "tag": "else",
                            "children": [
                                {
                                    "tag": "settitle",
                                    "attr": {
                                        "title": "$@1ecosystem_parameters$"
                                    }
                                }
								...
                            ]
                        }
                    ]
                }
            ]
        }
    }
```


### **ibax.getPageHash** {#ibax-getpagehash}
返回指定页面名称的SHA256哈希，如果找不到页面，则返回404错误。

要向其他节点发出请求时接收正确的哈希，还必须传递 *ecosystem,key_id,role_id*参数。要从其他生态系统接收页面，生态系统ID必须在页面名称中添加前缀。例如：`@2mypage`。

**参数**
- **name** - *String* - 带生态系统ID的页面名称。格式为 `@ecosystem_id%%page_name%`，例如 `@1main_page`,可指定生态ID

- **ecosystem** - *Number* - [Omitempty](#omitempty) 生态系统ID。

- *Object* - [Omitempty](#omitempty) 获取指定页面对象。
    - **key_id** - *String* - 账户地址。
    - **role_id** - *String* - 角色ID。

**返回值**
- *Object* -
    - **hash** - *String* - 十六进制哈希值。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getPageHash","id":1,"params":["@1params_list",0,{"role_id":"1","key_id":"-6484253546138538120"}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "hash": "fc5ed3b5e879dd5521dfb792e815019bd8411851e850e75a3590d71e950a0465"
        }
    }
```


### **ibax.getContent** {#ibax-getcontent}
从 **template** 参数返回页面代码的JSON对象数，如果将可选参数。**source** 指定为 `true`，则该JSON对象树不执行任何函数和接收数据。该JSON对象树可以在可视化页面设计器中使用。

**参数**
- *Object*
    - **template** - *String* - 页面代码。

    - **source** - *Bool* - 如果指定为 `true`，则JSON对象树不执行任何函数和接收数据。

**返回值**
- **tree** - *Object* - JSON对象树。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getContent","id":1,"params":[{"template","..."source":true}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "tree": {
                "type":"......", 
                "children": [
                    {...},
                    {...}
                ]
            }
        }
    }
      
```


### **ibax.getBlockInfo** {#ibax-getblockinfo}
返回指定区块ID的相关信息。

**参数**
- **id** - *Number* - 区块高度。

**返回值**

- **hash** - *String* - 区块哈希值。

- **key_id** - *Number* - 签署该区块的账户地址。

- **time** - *Number* 区块生成时间戳。

- **tx_count** - *Number* - 该区块内的交易总数。

- **rollbacks_hash** - *String* - 区块回滚哈希值。

- **node_position** - *Number* - 该区块在荣誉节点列表的位置。

- **consensus_mode** *Number* - 共识模式，参数（1: 创建者管理模式 2:DAO治理模式）

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBlockInfo","id":1,"params":[12]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "hash": "Hl+/VvYFFu4iq4zLrRDGHBhm7DM7llEAfEJyaX2Q3is=",
            "key_id": 6667782293976713160,
            "time": 1677134955,
            "tx_count": 1,
            "rollbacks_hash": "o37QAighKMb8WqbEHAqCQb5bOfMvOqV0WoTaN631q74=",
            "node_position": 0,
            "consensus_mode": 1
        }
    }
```


### **ibax.getConfig** {#ibax-getconfig}
获取centrifugo的主机地址和端口。

**参数**
- **option** - *String* - 配置项。

    1."centrifugo" - 消息服务。


**返回值**

- **centrifugo** - *String* - [Omitempty](#omitempty) centrifugo的主机地址和端口 结果格式 `http://address:port`，例如: `http://127.0.0.1:8100`。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getConfig","id":1,"params":["centrifugo"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "centrifugo":"http://127.0.0.1:8100"
        }
    }
```




### **net.getNetwork** {#net-getnetwork}
获取节点信息。

**参数**
无

**返回值**
- **network_id** - *String* - 网络标识符。
- **centrifugo_url** - *String* - centrifugo消息服务地址。
- **test** - *Bool* - 是否为测试链。
- **private** - *Bool* - 是否为私有链。
- **honor_nodes** - *Object* - 荣誉节点列表。
    - **tcp_address** - *String* - tcp地址。
    - **api_address** - *String* - api地址。
    - **public_key** - *String* - 节点公钥。
    - **unban_time** - *String* - 解锁时间。


**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"net.getNetwork","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "network_id": "1",
            "centrifugo_url": "127.0.0.1",
            "test": false,
            "private": false,
            "honor_nodes": [
                {
                    "tcp_address": "127.0.0.1:7078",
                    "api_address": "http://127.0.0.1:7078",
                    "public_key": "049a41b24862f8db61ee66fb206094baa57bfeac7ea786d63662a964d144eb85d1a0e230928d56f46dd61eefac7640b6aa2883b2445c7b2adc0e581f983ff0aedb",
                    "unban_time": "-62135596800"
                }
            ]
        }
    }
```


### **net.status** {#net-status}
获取当前节点状态。

**参数**
无

**返回值**
- **status** - *String* - 节点状态。
    "node server status is running" - 节点运行中。
    "node server is updating" - 节点更新中。
    "node server is stopped" - 节点暂停。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"net.status","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": "node server status is running"
    }
```




### **rpc.modules** {#rpc-modules}
获取当前已注册的JSON-RPC接口。

**参数**
无

**返回值**
- *Array* - JSON-RPC接口数组。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"rpc.modules","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": [
            "net.getNetwork",
            "ibax.getAppContent",
            "ibax.honorNodesCount",
            "ibax.maxBlockId",
            "ibax.detailedBlock",
            "ibax.getConfig",
            "ibax.getTableCount",
            "ibax.getMenu"
        ]
    }
```




### **admin.startJsonRpc** {#admin-startjsonrpc}
可用于切换JSON-RPC更改命名空间服务。

**参数**
**methods** - *String* - JSON-RPC 模块,default: "ibax,net"。

**返回值**
- *bool* - 执行状态。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"admin.startJsonRpc","id":1,"params":["ibax,net,admin"]}' http://127.0.0.1:8385

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": true
    }
```


### **admin.stopJsonRpc** {#admin-stopjsonrpc}
关闭JSON-RPC服务。

**参数**
无

**返回值**
- *bool* - 执行状态。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"admin.stopJsonRpc","id":1,"params":[]}' http://127.0.0.1:8385

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": true
    }
```



### **debug.getNodeBanStat** {#debug-getnodebanstat}
获取节点禁用状态。

**参数**
无

**返回值**

- **node_position** - *Number* - 节点下标。

- **status** - *Bool* - 禁用状态，`true`禁令状态，`false`未禁用。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"debug.getNodeBanStat","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": [
            {
                "node_position": 0,
                "status": true
            }
        ]
    }
```


### **debug.getMemStat** {#debug-getmemstat}
获取当前节点内存使用情况。

**参数**
无

**返回值**

- **alloc** - *Number* - 已申请且仍在使用的字节数。

- **sys** - *Number* - 从系统中获取的字节数。

**示例**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"debug.getMemStat","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "alloc": 11537432,
            "sys": 35329248
        }
    }
```

