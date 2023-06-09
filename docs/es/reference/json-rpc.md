# JSON-RPC Application Programming Interface

In order for a software application to interact with the IBAX blockchain (fetch block data or send transactions to the network), it must be connected to an IBAX network node.


Due to the generality and extensibility of the original REST API interface, it will become more and more complex with more and more interfaces and different clients. We realize the importance of interface unification to ensure that all clients can use the same set of specifications, regardless of the specific node and client implementation.


JSON-RPC  is  a  stateless,  lightweight  remote  procedure  call  (RPC)  protocol.  It  defines  a number of data structures and their processing rules. It is transport independent, as these concepts can be used in the same process, via an interface, hypertext transfer protocol, or in many different messaging environments. It uses JSON (RFC 4627) as the data format.



JSON-RPC is compatible with most of the REST API interfaces, retaining the original REST API interface, the client using the REST API interface can easily transfer to the JSON-RPC interface, part of the interface
- [/data/{id}/data/{hash}](api2.md#data-id-data-hash)
- [/data/{table}/id/{column}/{hash}](api2.md#data-table-id-column-hash)
- [avatar/{ecosystem}/{member}](api2.md#avatar-ecosystem-member) 

Available through the REST API interface.

## Client-side implementation
Each client can use a different programming language when  implementing  the JSON-RPC specification, and you can use the
[GO-SDK](https://github.com/IBAX-io/go-ibax-sdk)


## Curl example
The following provides examples of using the JSON RPC API by making curl requests to IBAX nodes. Each example includes a description of the particular endpoint, its parameters, the return type, and a working example of how it should be used.

Curl requests may return an error message related to the content type. This is because the --data option sets the content type to application/x-www-form-urlencoded. If your request has this problem, set the header manually by placing -H "Content-Type: application/json" at the beginning of the call. These examples also do not include the URL/Internet Protocol and port combination that must be the last parameter of the curl (e.g. 127.0.0.1:7079 A full curl request with this additional data takes the form of

``` text
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.maxBlockId","params":[],"id":1}' http://127.0.0.1:7079	
```

## Covenant 

### Hex
**Hexadecimal code**

When encoding byte arrays, hashes, and bytecode arrays: the encoding is hexadecimal, two hexadecimal digits per byte.

### Request type
**Uniform use**
- Content-Type: application/json

### Special markers 
#### Omitempty
This field is an optional parameter.

If there are multiple `Omitempty` fields in a row,
But only want to pass the value of a certain field, then you need to set the unwanted field to null (the field type null value), Example:
- **id** - *Number* - [Omitempty](#omitempty) id
- **name** - *String* - [Omitempty](#omitempty) Name
- **column** - *String* - [Omitempty](#omitempty) Filter column names

If only the name value is passed, then the request parameters are passed as follows
`"params":[0, "testname"]` - *Number* null value is 0

If only the column value is passed, then the request parameters are passed as follows
`"params":[0,"", "title,page"]` - *String* empty value for ""



#### Authorization
Authorization header, add Authorization to the request header, example:

**name** : Authorization **value** : Bearer +[login token](#ibax-login)
 
Example:
```` text
    //request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ey...." -d '{"jsonrpc":"2.0","method":"ibax.getContractInfo","params":["@1TokensSend"],"id":1}' http://127.0.0.1:7079

````

#### AccountOrKeyId
For the account address parameter, you can use two formats of addresses, for example
1. - *String* - Account Address `"XXXX-XXXX-XXXX-XXXX-XXXX"` or Account Id `"64842...538120"` .538120"`

2. - *Object* - Address object
    - **key_id** - *Number* - Account Id, Example: `{"key_id":-64842	38120}`
    - **account** - *String* - Account address, Example: `{"account": "1196-... -	-... -3496"}`

    **Account Id is preferred when both account address and account Id exist**. 
    
#### BlockOrHash
Block height or block HASH, example

1.	- *String*	-	Block	Height	`"100"`	or	Block	HASH`"4663aa47...a60753c18d9ba9cb4"`

2.	- *Object* - Block information object
        - **id** - *Number* - block height, example: `{"id":2}`
        - **hash**	-	*[Hex](#hex)	String*	-	Block	HASH,	Example:	`{"hash": "d36b8996c	c616d3043a0d02a0f59"}`

        **Block Height and Block HASH can only choose one**. 

### Batch requests
This feature can be used to reduce network latency, especially when acquiring a large number of largely independent data objects.

The following is an example of obtaining the highest block and total number of transactions:
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


### Error response handling

Returns status `200` in case the request is executed successfully.

If an error occurs, a JSON object with the following fields will be returned:

-	jsonrpc

    Error identifier.

-	id

    Error text message.

-	error
    -	code

        Response Status Code
    -	message

        Response Status Description

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


## JSON-RPC Namespaces

 ### ibax Namespace

#### Authentication Interface
- [ibax.getuid](#ibax-getuid)
- [ibax.login](#ibax-login)
- [ibax.getAuthStatus](#ibax-getauthstatus)

#### server-side command interface
- [ibax.getVersion](#ibax-getversion)

#### Data Request Function Interface
- [ibax.getBalance](#ibax-getbalance)
- [ibax.getBlocksTxInfo](#ibax-getblockstxinfo)
- [ibax.detailedBlocks](#ibax-detailedblocks)
- [ibax.getKeyInfo](#ibax-getkeyinfo)
- [ibax.detailedBlock](#ibax-detailedblock)

#### Get Metrics Interface
- [ibax.maxBlockId](#ibax-maxblockid)
- [ibax.getKeysCount](#ibax-getkeyscount)
- [ibax.getTxCount](#ibax-gettxcount)
- [ibax.getTransactionCount](#ibax-gettransactioncount)
- [ibax.getBlocksCountByNode](#ibax-getblockscountbynode)
- [ibax.honorNodesCount](#ibax-honornodescount)
- [ibax.getEcosystemCount](#ibax-getecosystemcount)

#### Ecosystem Interface
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

#### Contract Function Interface
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

### net Namespace
- [net.getNetwork](#net-getnetwork)
- [net.status](#net-status)

### rpc Namespace
- [rpc.modules](#rpc-modules)

### admin Namespace
- [admin.startJsonRpc](#admin-startjsonrpc)
- [admin.stopJsonRpc](#admin-stopjsonrpc)


### debug Namespace
- [debug.getNodeBanStat](#debug-getnodebanstat)
- [debug.getMemStat](#debug-getmemstat)
 


## JSON-RPC Interface Methods 

### **ibax.getUid**

[Authorization](#authorization) [Omitempty](#omitempty)

Generate a temporary JWT token,	which needs to be passed to [**Authorization**](#authorization) when calling **[login](#ibax-login)**

#### Parameters 
None

#### Return Value
- **uid** - *String* - The signature number.

- **token** - *String* - temporary token passed during login (temporary token has a 5 second lifespan).

- **network_id** - *String* - The network identifier.

- **cryptoer** - *String* - Elliptic curve algorithm.

- **hasher** - *String* - hash algorithm.

In the case that no authorization is required(the request contains [Authorization](#authorization), the following message will be returned.

- **expire** - *String* - Expiration time.

- **ecosystem** - *String* - Ecosystem ID.

- **key_id** - *String* - The account address.

- **address** - *String* - wallet address `XXXX-XXXXXX-XXXX-XXXX-XXXX`.

- **network_id** - *String* - The network identifier.

#### Example
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

### **ibax.login**
User authentication. [Authorization](#authorization)

The [**ibax.getUid**](#ibax-getuid) command should be called first in order to receive the unique value and sign it.
The temporary JWT token for getuid needs to be passed in the request header.
If the request is successful, the token received in the response is contained in [**Authorization**](#authorization).

#### Parameters

*Object* - Authentication call object
- **ecosystem_id** - *Number* - Ecosystem ID. if not specified, defaults to the first ecosystem ID.

- **expire** - *Number* - The lifecycle of the JWT token in seconds, default is 28800,8 hours.

- **public_key** - *[Hex](#hex) String* - Hexadecimal account public key.

- **key_id** - *String* -
    >	Account address `XXXX-... -XXXX`.
    >
    >	Use this parameter if the public key is already stored in the blockchain. It cannot be used with *pubkey*
    >	parameters are used together.

- **signature** - *String* -
    Use the private key to sign the uid received by getuid. 

    Signature data content:LOGIN+{$network_id}+uid

- **role_id** - *Number* - Role ID, default role 0


#### Return Value
*Object* - Authentication object
- **token** - *String* - JWT token.

- **ecosystem_id** - *String* - Ecosystem ID.

- **key_id** - *String* - Account Address ID

- **account** - *String* - wallet address `XXXX-XXXXXX-XXXX-XXXX-XXXX`.

- **notify_key** - *String* - The notification ID.

- **isnode** - *Bool* - Whether the account address is the owner of the node. Values: `true,false`.

- **isowner** - *Bool* - Whether the account address is the creator of this ecosystem. Values: `true,false`.

- **clb** - *Bool* - Whether the logged-in ecosystem is a CLB. Values: `true,false`.

- **timestamp** - *String* - current timestamp
 
- **roles** - *Array* list of roles, if there are no roles, the field is nil
    - **role_id** - *Number* - Role ID
    - **role_name** - *String* - Role name

#### Example
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

### **ibax.getAuthStatus** 
User authentication status 
[Authorization](#authorization)

#### Parameters 
None

#### Return Value
*Object* - Authentication status object
- **active** - *Bool* - The current user authentication status. Values: `true,false`

- **exp** - *Number* - [Omitempty](#omitempty) Token validity cutoff timestamp
 
#### Example
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

### **ibax.getVersion**
Returns the current server version.

#### Parameters 
None

#### Return Value
- **vesion** - *String* - version number (`big Version` + `branch name` + `git commit` + `time` + `node status`)

#### Example
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

### **ibax.getBalance**
Get the account address balance.
 
#### Parameters

- **key_id or account** - [*AccountOrKeyId*](#accountorkeyid) - account address `XXXX- XXXX-XXXX-XXXX-XXXX` or account ID

- **ecosystem_id** - *Number* - Ecosystem ID [Omitempty](#omitempty) Default 1 

#### Return Value
*Object* - Get the balance object
- **amount** - *String* - the minimum unit of the contract account balance.

- **total** - *String* - the total balance of the minimum unit account (amount + utxo).

- **utxo** - *String* - Minimum unit UTXO account balance.

- **digits** - *Number* - Accuracy

- **token_symbol** - *String* - Token symbols 

#### Example
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


### **ibax.getBlocksTxInfo**
Returns a list containing additional information about the transactions in each block. 

#### Parameters

- **block_id** - *Number* - the starting block height to query

- **count** - *Number* - number of blocks, default is 25, maximum request is 100 

#### Return Value
*Object* - Get the block information object
- **block_id** - *String* - block height
-	List of transactions in the block and additional information for each transaction:

    - **hash** - *[Hex](#hex) String* - The transaction hash.

    - **contract_name** - *String* - The name of the contract.

    - **params** - *Object* - contract parameters, contract fields can be queried via [ibax.getContractInfo](#ibax-getcontractinfo).

    - **key_id** - *Number* -
        For the first block, it is the account address of the first block that signed the transaction.

        For all other blocks, it is the address of the account that signed the transaction.

#### Example
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


### **ibax.detailedBlocks**
Returns a list containing detailed additional information about the transactions in each block.

#### Parameters
- **block_id** - *Number* - the height of the starting block to query

- **count** - *Number* - number of blocks, default is 25, maximum request is 100


#### Return Value
*Object* - Get the block details object
- **block_id** - *String* - block height
    - **header** - *Object* - block header The block header contains the following fields.
        - **block_id** - *Number* - the height of the block.
        - **time** - *Number* - block generation timestamp.
        - **key_id** - *Number* - the address of the account that signed the block.
        - **node_position** - *Number* - The position of the node that generated the block in the honor node list.
        - **version** - *Number* - the block structure version.
    - **hash** - *[Hex](#hex) String* - The block hash.
    - **node_position** - *Number* - The position of the node that generated the block in the honor node list.
    - **key_id** - *Number* - the address of the account that signed the block.
    - **time** - *Number* - block generation timestamp.
    - **tx_count** - *Number* - the number of transactions within the block.
    - **size** - *String* - the size of the block.
    - **rollback_hash** - *[Hex](#hex) String* - The block rollback hash.
    - **merkle_root** - *[Hex](#hex) String* - The merkle tree for this block transaction.
    - **bin_data** - *[Hex](#hex) String* - Serialization of the block header, all transactions within the block, the previous block hash, and the private key of the node that generated the block.
    -  **transactions** - *Object* - Transactions List of transactions in the block and additional information about each transaction:
        - **hash** - *[Hex](#hex) String* - The transaction hash.
        - **contract_name** - *String* - The name of the contract.
        - **params** - *Object* - contract parameters, contract fields can be queried via [ibax.getContractInfo](#ibax-getcontractinfo).
        - **key_id** - *Number* - The address of the account that signed the transaction.
        - **time** - *Number* - transaction generation timestamp (unit: ms).
        - **type** - *Number* - the type of the transaction.
        - **size** - *String* - The transaction size.

#### Example
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


### **ibax.getKeyInfo**
Returns a list of ecosystems with roles that are registered to the specified address.

#### Parameters
- **account** - *String* - Account Address

#### Return Value
*Object* - Specify the address eco-list object
- **account** - *String* - Account Address
- **ecosystems** - *Array* - Eco-List
    - **ecosystem** - *String* - Ecosystem id
    - **name** - *String* - Ecosystem name
    - **digits** - *Number* - Accuracy
    - **roles** - *Array* - list of roles.
        - **id** - *String* - role id
        - **name** - *String* - Character name
 

#### Example
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
 
### **ibax.detailedBlock**
Returns a detailed list of additional information about the transactions in the block.

#### Parameters
-	**Block or Hash** - *[BlockOrHash](#blockorhash)* - Block Height or Block Hash

#### Return Value
*Object* - Get the block details object
- **header** - *Object* - block header The block header contains the following fields.
    - **block_id** - *Number* - the height of the block. 
    - **time** - *Number* - block generation timestamp.
    - **key_id** - *Number* - the address of the account that signed the block.
    - **node_position** - *Number* - The position of the node that generated the block in the honor node list.
    -	**version** - *Number* - the block structure version.

- **hash** - *[Hex](#hex) String* - The block hash.
- **node_position** - *Number* - The position of the node that generated the block in the honor node list.
- **key_id** - *Number* - the address of the account that signed the block.
- **time** - *Number* - block generation timestamp.
- **tx_count** - *Number* - the number of transactions within the block.
- **size** - *String* - the size of the block.
- **rollback_hash** - *[Hex](#hex) String* - The block rollback hash.
- **merkle_root** - *[Hex](#hex) String* - The merkle tree for this block transaction.
- **bin_data** - *[Hex](#hex) String* - Serialization of the block header, all transactions within the block, the previous block hash, and the private key of the node that generated the block.
-  **transactions** - *Array* - Transactions List of transactions in the block and additional information about each transaction:
    - **hash** - *[Hex](#hex) String* - The transaction hash.
    - **contract_name** - *String* - The name of the contract.
    - **params** - *Object* - contract parameters, contract fields can be queried via [ibax.getContractInfo](#ibax-getcontractinfo).
    - **key_id** - *Number* - The address of the account that signed the transaction.
    - **time** - *Number* - transaction generation timestamp (unit: ms).
    - **type** - *Number* - the type of the transaction.
    - **size** - *String* - The transaction size.

#### Example
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

### **ibax.maxBlockId**
Get the highest block ID on the current node

#### Parameters 
None

#### Return Value
-	**Block Id** - *Number* - The highest block on the current node

#### Example
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


### **ibax.getKeysCount**
Get the total number of addresses on the current node

#### Parameters 
None
#### Return Value
- **Count** - *Number* - Total number of addresses 

#### Example
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


### **ibax.getTxCount**
Get the total number of transactions in the current node

#### Parameters 
None

#### Return Value
- **Count** - *Number* - Total number of transactions

#### Example
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


### **ibax.getTransactionCount** 
Get the number of block transactions

#### Parameters
- **block or hash** - *[BlockOrHash](#blockorhash)* - block height or block hash
 
#### Return Value
- **Count** - *Number* - Total number of blocks

#### Example
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


### **ibax.getBlocksCountByNode**
Get the number of node location packing blocks 
#### Parameters
- **nodePosition** - *Number* - node subscript

- **consensusMode** - *Number* - Consensus Mode, parameters (1: Creator Management Mode 2: DAO Governance Mode)

#### Return Value
*Object* - Get the node subscript packing number object
- **total_count** - *Number* - Total number of blocks

- **partial_count** - *Number* - Number of node subscript packing blocks 

#### Example
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


### **ibax.honorNodesCount** 
Get number of honor nodes

#### Parameters 
None

#### Return Value
- **Count** - *Number* - number of nodes

#### Example
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


### **ibax.getEcosystemCount** 
Number of ecosystem acquisitions

#### Parameters 
None

#### Return Value
- **Count** - *Number* - Ecological number

#### Example
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




### **ibax.ecosystemInfo** 
Access to ecological information

#### Parameters
- **ecosystem id** - *Number* - ecological ID

#### Return Value
- **id** - *Number* - Eco-ID
- **name** - *String* - Ecological name
- **digits** - *Number* - Accuracy
- **token_symbol** - *String* - Token symbols
- **token_name** - *String* - the name of the token
- **total_amount** - *String* - the number of issues (first issue, or `"0"` if not issued)
- **is_withdraw** - *Bool* - destructible `true:destructible false:undestructible`
- **withdraw** - *String* - amount of destruction (`"0"` if not destructible, or not destroyed)
- **is_emission** - *Bool* - may be incremented `true:may be incremented false:may not be incremented`
- **emission** - *String* - increment (`"0"` if no increment is available, or if no increment is available)
- **introduction** - *String* - Eco Introduction
- **logo** - *Number* - ecoLogo Id (corresponds to Binary table id), available through the RESTFUL API
- **creator** - *String* - Eco-creator

#### Example
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


### **ibax.appParams**
Returns a list of application parameters in the current or specified ecosystem 

[Authorization](#authorization)

#### Parameters
- **appid** - *Number* - the application ID.

- **ecosystem** - *Number* - [Omitempty](#omitempty) - Ecosystem ID;

    If unspecified or 0, the parameters of the current ecosystem will be returned.

- **names** - *String* - [Omitempty](#omitempty) - Filter the application parameter names.

    A comma-separated list of names, e.g.: `name1,name2`.

- **offset** - *Number* - [Omitempty](#omitempty) The offset, default is 0.

- **limit** - *Number* [Omitempty](#omitempty) The number of entries, default 100, max 100.
 
#### Return Value

*Array* - List of application parameters
- **app_id** - *Number* - Application ID
- **list** - *Number* - Each element of the array contains the following parameters
    - **id** - *String* - parameter ID, unique;
    - **name** - *String* - the name of the parameter;
    - **value** - *String* - the parameter value;
    - **conditions** - *String* - permissions to change parameters.

#### Example
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
 

### **ibax.getEcosystemParams** 
Get a list of ecosystem parameters
 
[Authorization](#authorization)

#### Parameters
- **ecosystem** - *Number* - [Omitempty](#omitempty) - Ecosystem ID 

    If 0 or no such parameter, default: current ecid.

- **names** - *String* - [Omitempty](#omitempty) - The name of the filter parameter.

    Comma-separated list of names, e.g.: `name1,name2`

    The *offset* and *limit* parameters are invalid when there is a filter parameter.

- **offset** - *Number* - [Omitempty](#omitempty) The offset, default is 0.

- **limit** - *Number* [Omitempty](#omitempty) The number of entries, default 100, max 100.


#### Return Value
- **list** - *Array* - Each element of the array contains the following parameters:
    - **id** - *String* - The id of the parameter, unique.
    - **name** - *String* - The name of the parameter.
    - **value** - *String* - The value of the parameter.
    - **conditions** - *String* - permissions to change parameters.

#### Example
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


### **ibax.getTableCount**
Returns a list of data tables for the current ecosystem.

Offset and number of entries can be set 

[Authorization](#authorization)
#### Parameters

- **offset** - *Number* - [Omitempty](#omitempty) The offset, default is 0.

- **limit** - *Number* [Omitempty](#omitempty) The number of entries, default 100, max 100.

#### Return Value
- **count** - *Number* - The total number of sheets of the current ecological data table.

- **list** - *Array* - Each element of the array contains the following parameters:
    - **name** - *String* - The name of the data table without prefix.
    - **count** - *String* - The number of entries in the data table.

#### Example
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
 

### **ibax.getTable**
Returns information about the current ecosystem request data table. 

[Authorization](#authorization)

#### Parameters
- **tableName** - *String* - Data table name

#### Return Value
- **name** - *String* - The name of the data table.

- **insert** - *String* - Add permission to add an entry.

- **new_column** - *String* - Add new field permission.

- **update** - *String* - Change entry permissions.

- **app_id** - *String* - The application id.

- **conditions** - *String* - Conditions for changing permissions.

- **columns** - *Array* - Array of information related to data table fields:
    - **name** - *String* - The name of the field.
    - **type** - *String* - The field data type.
    - **perm** - *String* - Permission to change the value of this field.
 
#### Example
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


### **ibax.getList**
Returns the entry of the specified data table. 

You can specify the columns to be returned.

You can set the offset and the number of entries. 

You can set the query criteria.

Hex encoding of data tables of type *BYTEA* (byte arrays, hashes, byte code arrays) 

[Authorization](#authorization)

#### Parameters
*Object* - Get the data table object
- **name** - *String* - The name of the data table.

- **limit** - *Number* - [Omitempty](#omitempty) The number of entries, default 25.

- **offset** - *Number* - [Omitempty](#omitempty) The offset, default is 0.

- **order** - *String* - [Omitempty](#omitempty) Sort by, default id ASC.

- **columns** - *String* - [Omitempty](#omitempty) A comma-separated list of requested columns, if not specified, all columns will be returned.

    The id column will be returned in all cases.

- **where** - *Object* - [Omitempty](#omitempty) 

    Query criteria

    Example:If you want to query id>2 and name = john
 
    You can use `where:{"id":{"$gt":2}, "name":{"$eq": "john"}}`

    For details, please refer to [DBFind](../topics/script.md#dbfind) where syntax 
    
#### Return Value
- **count** - *Number* - the total number of entries.
- **list** - *Array* - Each element of the array contains the following parameters:

    - **id** - *String* - The ID of the entry.
    - **...** - Other columns of the data table.

#### Example
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


### **ibax.getSections**
Return to the tab of the current ecosystem
List of table entries, you can set the offset and the number of entries.

If *role_access*
field contains a list of roles and does not include the current role, no record will be returned. *title*
The data in the field will be replaced by the *Accept-Language* language resource in the request header.

[Authorization](#authorization) 

#### Parameters

- *Object* - Get the actions request object
    - **limit** - *Number* - [Omitempty](#omitempty) - The number of entries, default 25 entries.

    - **offset** - *Number* - [Omitempty](#omitempty) - The offset, default is 0.

    - **lang** - *String* - [Omitempty](#omitempty) -

        This field specifies the multilingual resource code or localization, e.g. *en, zh*. If the specified multilingual resource is not found, e.g. *en-US*, then search in the Multilingual Resources group, **default**: **en**.

#### Return Value

- **count** - *Number* - the total number of tab entries.

- **list** - *Array* - Each element of the array contains information about all columns in the sections table.

#### Example
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
 

### **ibax.getRow**
Returns the entries of the specified data table in the current ecosystem. You can specify the columns to be returned.

[Authorization](#authorization) 
#### Parameters
- **tableName** - *String* - The name of the data table.

- **id** - *Number* - the ID of the entry.

- **columns** - *String* - [Omitempty](#omitempty)
 
    A comma-separated list of requested columns, if not specified, all columns will be returned.

    If you do not filter, you can place a blank "". 
    
    The id column will be returned in all cases.

- **whereColumn** - *String* - [Omitempty](#omitempty) - Find column name (only Number type columns can be found)

#### Return Value
- **value**- *Object* - object that receives column values
    - **id** - *String* - The ID of the entry.
    - **...** - The sequence of requested columns.

#### Example
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


### **ibax.systemParams**
Returns the list of platform parameters. 

[Authorization](#authorization)
#### Parameters
- **names** - *String* [Omitempty](#omitempty) - A list of request parameters, separated by commas.

    For example `names="name1,name2"`.

- **offset** - *Number* - [Omitempty](#omitempty) The offset, default is 0.

- **limit** - *Number* [Omitempty](#omitempty) The number of entries, default 100, max 100.

#### Return Value

-	**list** - *Array* - Each element of the array contains the following parameters:
    - **id** - *String* - Unique id
    - **name** - *String* - The name of the parameter.
    - **value** - *String* - The value of the parameter.
    - **conditions** - *String* - permissions to change parameters.

#### Example
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


### **ibax.history**
Returns the changed records of the entries of the specified data table in the current ecosystem

[Authorization](#authorization) 
#### Parameters

- **name** - *String* - The name of the data table.
- **tableId** - *Number* - the ID of the entry.

#### Return Value
- **list** - *Array* - Each element of the array contains change records for the requested entry.

#### Example
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


### **ibax.getPageRow**
Gets the current entry in the ecosystempages data table field. 

[Authorization](#authorization)

#### Parameters
- **name** - *String* - Specifies the name of the entry in the table.

#### Return Value
- **id** - *Number* - the ID of the entry.
- **name** - *String* - The name of the entry.
- **value** - *String* - The content.
- **menu** - *String* - Directory.
- **nodesCount** - *Number* - the number of nodes the page needs to validate
- **app_id** - *Number* - Application Id
- **conditions** - *String* - permissions to change parameters

#### Example
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


### **ibax.getMenuRow**
Gets the current entry in the ecosystem menu data table field.
 
[Authorization](#authorization)

#### Parameters
- **name** - *String* - Specifies the name of the entry in the table.

#### Return Value
- **id** - *Number* - the ID of the entry.
- **name** - *String* - The name of the entry.
- **title** - *String* - The title.
- **value** - *String* - The content.
- **conditions** - *String* - permissions to change parameters

#### Example
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


### **ibax.getSnippetRow**
Gets the current entry in the ecosystem snippet data table field. 

[Authorization](#authorization)

#### Parameters
- **name** - *String* - Specifies the name of the entry in the table. 

#### Return Value 
- **id** - *Number* - the ID of the entry.
- **name** - *String* - The name of the entry.
- **value** - *String* - The content.
- **conditions** - *String* - permissions to change parameters.

#### Example
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


### **ibax.getAppContent**
Get application related information (including page, snippet, menu) 

[Authorization](#authorization)

#### Parameters
- **id** - *Number* - Application id

#### Return Value
- **snippets** - *Array* - Array of code snippet information

    - **id** - *Number* - id
    - **name** - *String* - Code snippet name

- **pages** - *Array* - Array of page information

    - **id** - *Number* - id
    - **name** - *String* - page name
 
- **contracts** - *Array* - an array of contract information

    - **id** - *Number* - id
    - **name** - *String* - Contract name

#### Example
```text
    //Request
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


### **ibax.getMember** 
Get member information

#### Parameters
**account** - *String* - Member Information

**ecosystemId** - *Number* - ecoid


#### Return Value
- **id** - *Number* - member id
- **member_name** - *String* - Name
- **image_id** - *Number* - Avatar id
- **member_info** - *String* - Introduction


#### Example
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

### **ibax.getContracts**
Get the list of contracts in the current ecosystem, you can set the offset and the number of entries.

[Authorization](#authorization) 

#### Parameters
- **offset** - *Number* - [Omitempty](#omitempty) The offset, default is 0.
- **limit** - *Number* - [Omitempty](#omitempty) The number of entries, default 25.

#### Return Value
- **count** - *Number* - the total number of entries.

- **list** - *Array* - Each element of the array contains the following parameters:
    - **id** - *String* - Contract ID.
    - **name** - *String* - The name of the contract.
    - **value** - *String* - The content of the contract.
    - **wallet_id** - *String* - The address of the account to which the contract is bound.
    - **address** - *String* - the address of the contract-bound wallet `XXXX-... -XXXX`.
    - **ecosystem_id** - *String* - The ecosystem ID to which the contract belongs.
    - **app_id** - *String* - The ID of the application to which the contract belongs.
    - **conditions** - *String* - Change the permissions of the contract.
    - **token_id** - *String* - The ID of the ecosystem where the pass is used as a payment for the contract.


#### Example
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
 

### **ibax.getContractInfo**
Returns information about the specified contract. 

[Authorization](#authorization)

#### Parameters
- **contractName**	-	*String*	-	The	name	of	the	contract.	The	format	is `@ecosystem_id%%contractName%`, e.g. @1contractName (the specified eco1contract name contractName) or contractName (the current eco-contract name contractName).

#### Return Value

- **id** - *Number* - the contract ID in the VM.
- **name** - *String* - Contract name with ecosystem ID `@1MainCondition`.
- **state** - *Number* - the ecosystem ID to which the contract belongs.
- **walletid** - *String* - the address of the account to which the contract is bound
- **tokenid** - *String* - the ecosystem ID of the pass that is used as the payment for the contract.
- **address** - *String* - the address of the contract-bound wallet `XXXX-... -XXXX`.
- **tableid** - *String* - ID of the entry in the *contracts* table where the contract is located.
- **fields** - *Array* - array containing structural information for each parameter of the contract **data** section:
    - **name** - *String* - The name of the parameter.
    - **type** - *String* - The type of the parameter.
    - **optional** - *Bool* - parameter options, `true` means optional parameters, `false` means mandatory parameters.

#### Example
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
 

### **ibax.sendTx**
Receives the transactions in the parameters and adds them to the transaction queue, returning a transaction hash if the request is executed successfully. This hash yields the corresponding transaction within the block and is included in the error text message in case of an error response.

[Authorization](#authorization) 

#### Parameters
- *Object* - Transaction data object
    - **tx_key** - *String* - the content of the transaction, this parameter can specify any name and supports receiving multiple transactions.

#### Return Value
- **hashes** - *Array* - transaction hash arrays:
    - **tx1** - *String* - Hash of transaction 1.
    - **txN** - *String* - Hash of transaction N.

#### Example
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


### **ibax.txStatus**
Gets the block ID and error message of the specified transaction hash. If the return value of the block ID and error text message is null, then the transaction is not yet contained in the block.
 
[Authorization](#authorization)

#### Parameters
- **hashes** - *String* - transaction hash, split using `,`.

#### Return Value
- **hash** - *Object* - The transaction hash.
    - **blockid** - *String* - returns the block ID if the transaction was executed successfully;

        If the transaction execution fails, *blockid* will be `0`, and the corresponding block ID will be returned if the transaction execution error is penalized.

    - **result** - *String* - Returns the result of the transaction via the **\$result** variable.
    - **errmsg** - *Object* - [Omitempty](#omitempty) Returns an error text message if the execution of the transaction failed.
        - **type** - *String* - Error type
        - **error** - *String* - error message
    - **penalty** - *Number* - if the transaction execution fails, (0: no penalty 1: penalty)

#### Example
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


### **ibax.txInfo**
Returns information about the transaction for the specified hash, including the block ID and the number of confirmations. If optional parameters are specified, the contract name and its associated parameters can also be returned.

#### Parameters
- **hash** - *String* - The transaction hash.

- **contractinfo** - *Bool* [Omitempty](#omitempty) - Contract detail parameter identifier, get contract details related to this transaction, default is `false`

#### Return Value
- **blockid** - *Number* - The block ID containing the transaction.
    If the value is `0`, no transactions are found for this hash.
    If the transaction occurred on the current node, it can be obtained via [ibax.txStatus](#ibax-txstatus)

- **confirm** - *Number* - the number of node confirmations for this block *blockid*.

- **data** - *Object* - Returns contract details if `contentinfo=true` is specified. null if not specified
    - **block_id** - *Number* - block height
    - **block_hash** - *String* - block_hash
    - **address** - *String* - transaction creation address
    - **ecosystem** - *String* - transaction sending ecid
    - **hash** - *String* - transaction hash
    - **expedite** - *String* - expedited fee, or "" if not available
    - **contract_name** - *String* - Contract name
    - **params** - *Object* - contract parameters, contract fields can be queried via [ibax.getContractInfo](#ibax-getcontractinfo)
    - **created_at** - *Number* - when the transaction was created
    - **size** - *String* - transaction size unit: B;KiB;MiB;GiB;TiB
    - **status** - *String* - status (0:success 1:penalty)
 

#### Example
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


### **ibax.txInfoMultiple**
Returns transaction-related information for the specified hash list.

#### Parameters
- **hashes** - *Array* - A list of transaction hashes.
 
- **contractinfo** - *Bool* [Omitempty](#omitempty) - Contract detail parameter identifier, get contract details related to this transaction, default is `false`

#### Return Value
-	**results** - *Array* - Data dictionary with transaction hash as key and transaction details as value.
    - **hash** - *String* - The transaction hash.
        - **blockid** - *Number* - The block ID containing the transaction. if the value is `0`, then no transaction was found for that hash.
        - **confirm** - *Number* - the number of confirmations for this block *blockid*.
        - **data** - *Object* - If `contentinfo=true`is specified, the contract details are returned to this parameter. null when not specified
            - **block_id**- *Number* - Block height
            - **block_hash** - *String* - block_hash
            - **address** - *String* - transaction creation address
            - **ecosystem** - *String* - transaction sending ecid
            - **hash** - *String* - transaction hash
            - **expedite** - *String* - expedited fee, or "" if not available
            - **contract_name** - *String* - Contract name
            - **params** - *Object* - contract parameters, contract fields can be queried via [ibax.getContractInfo](#ibax-getcontractinfo)
            - **created_at** - *Number* - when the transaction was created
            - **size** - *String* - transaction size unit: B;KiB;MiB;GiB;TiB
            - **status** - *String* - status (0:success 1:penalty)

#### Example
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


### **ibax.getPageValidatorsCount**
Returns the number of nodes to be validated for the specified page.

#### Parameters
- **name**  -  *String*  -  page  name  in  the  format  `@ecosystem_id%%%page_name%`,  e.g. @1params_list (specifying ecology 1 page name params_list) or params_list (current ecology page name params_list)


#### Return Value
- **validate_count** - *Number* - Specifies the number of nodes to be validated by the page.
 
#### Example
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


### **ibax.getPage**
Gets the tree of code JSON objects for the specified page name, which is the result of processing by the templating engine.

[Authorization](#authorization)

#### Parameters
-	**name** - *String* - the name of the page with the ecosystem ID in the format `@ecosystem_id%%page_name%`, for example
`@1main_page`.

    If you don't have an ecosystem ID, the default is to find the current ecological page, e.g. `main_page`

#### Return Value
- **menu** - *String* - The name of the menu to which the page belongs.

- **menutree** - *Array* - JSON object tree of the page's menus.

- **tree** - *Array* - page JSON object tree. 

#### Example
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


### **ibax.getMenu**
Gets the tree of code JSON objects for the specified menu name, which is the result of processing by the template engine.

[Authorization](#authorization) 

#### Parameters
-	**name** - *String* -
    > Menu name with ecosystem ID in the format `@ecosystem_id%%%menu_name%`, e.g.
    > `@1main_menu`.
    > If you don't bring the ecosystem ID, the menu of the current ecology will be found by default, for example
    > `main_menu`
 
#### Return Value

- **title** - *String* - the menu title.

- **tree** - *Array* - Menu JSON object tree. 

#### Example
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


### **ibax.getSource**
Returns a tree of coded JSON objects for the specified page name. Does not execute any functions or receive any data. The returned JSON object tree corresponds to the page template and can be used in the visual page designer. If the page is not found, a 404 error is returned.


[Authorization](#authorization)
 
#### Parameters
-	**name** - *String* -
    Page  name  with  ecosystem  ID  in  the  format  `@ecosystem_id%%%page_name%`,  for example `@1main_page`.
    If you don't have an ecosystem ID, the default is to find the current ecological page e.g. `main_page`

#### Return Value
-	**tree** - *Array* - JSON object tree for the page.

#### Example
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


### **ibax.getPageHash**
Returns a SHA256 hash of the specified page name, or a 404 error if the page is not found.

To receive the correct hash when making requests to other nodes, you must also pass the
*ecosystem,key_id,role_id*
parameter. To receive pages from other ecosystems, the ecosystem ID must be prefixed to the page name. For example: `@2mypage`.

#### Parameters
- **name** - *String* - The name of the page with the ecosystem ID. The format is `@ecosystem_id%%%page_name%`, e.g. `@1main_page`, you can specify the eco ID

- **ecosystem** - *Number* - [Omitempty](#omitempty) Ecosystem ID.

- *Object* - [Omitempty](#omitempty) Get the specified page object
    - **key_id** - *String* - The account address.
    - **role_id** - *String* - The role ID.

#### Return Value
- *Object* -
    - **hash** - *String* - Hexadecimal hash.

#### Example
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


### **ibax.getContent**
Returns the number of JSON objects for the page code from the **template** parameter, if the optional parameter
**source** Specified as `true`, this JSON object tree does not perform any functions and receive data. This JSON object tree can be used in the visual page designer.

#### Parameters
- *Object*
    - **template** - *String* - page code.

    - **source** - *Bool* - If specified as `true`, the JSON object tree does not perform any functions and receives data.

#### Return Value
- **tree** - *Object* - JSON object tree.

#### Example
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


### **ibax.getBlockInfo**
Returns information about the specified block ID.

#### Parameters
-	**id** - *Number* - the height of the block. 

#### Return Value

- **hash** - *String* - The block hash value.

- **key_id** - *Number* - the address of the account that signed the block.

- **time** - *Number* block generation timestamp.

- **tx_count** - *Number* - the total number of transactions within the block.

- **rollbacks_hash** - *String* - The block rollback hash.

- **node_position** - *Number* - The position of the block in the honor node list.

- **consensus_mode** *Number* - Consensus mode, parameters (1: creator management mode 2: DAO governance mode)

#### Example
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


### **ibax.getConfig**
Get the host address and port of centrifugo

#### Parameters
- **option** - *String* - Configuration item

    1. "centrifugo" - messaging service


#### Return Value

- **centrifugo** - *String* - [Omitempty](#omitempty) host address and port of centrifugo Result format `http://address:port`, e.g.: `http://127.0.0.1:8100`.

#### Example
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




### **net.getNetwork** 
Get node information
 
#### Parameters 
None

#### Return Value
- **network_id** - *String* - The network identifier.
- **centrifugo_url** - *String* - centrifugo message service address
- **test** - *Bool* - whether it is a test chain
- **private** - *Bool* - whether the chain is private
- **honor_nodes** - *Object* - List of honor nodes
    - **tcp_address** - *String* - tcp address
    - **api_address** - *String* - api address
    - **public_key** - *String* - node public key
    - **unban_time** - *String* - Unlock time


#### Example
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
 

### **net.status**
Get the current node status

#### Parameters 
None

#### Return Value
- **status** - *String* - Node Status
    "node server status is running" - the node is running 
    "node server is updating" - node is being updated 
    "node server is stopped" - node suspended

#### Example
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




### **rpc.modules**
Get the currently registered JSON-RPC interface

#### Parameters 
None

#### Return Value
- *Array* - JSON-RPC interface array

#### Example
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




### **admin.startJsonRpc**
Can be used to switch between JSON-RPC change namespace services

#### Parameters
**methods** - *String* - JSON-RPC module, default: "ibax,net"

#### Return Value
- *bool* - execution status

#### Example
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


### **admin.stopJsonRpc** 
Close the JSON-RPC service

#### Parameters 
None

#### Return Value
- *bool* - execution status

#### Example
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



### **debug.getNodeBanStat** 
Get node disable status

#### Parameters 
None

#### Return Value
**node_position** - *Number* - node subscript
**status** - *Bool* - Disable status, `true` ban status, `false` not disabled

#### Example
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
 

### **debug.getMemStat**
Get the current node memory usage

#### Parameters 
None

#### Return Value
- **alloc** - *Number* - Number of bytes requested and still in use
- **sys** - *Number* - Number of bytes fetched from the system

#### Example
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
