# JSON-RPC API {#json-rpc-application-programming-interface}

IBAX 네트워크와 상호 작용하기 위해 소프트웨어 응용 프로그램은 IBAX 네트워크 노드에 연결해야 합니다.

기존 REST API 인터페이스의 일반성과 확장성으로 인해 인터페이스가 점점 더 많아지고 클라이언트가 다양해질수록 복잡해지는 것을 인식하였습니다. 우리는 인터페이스의 통일성을 중요시하고, 구체적인 노드와 클라이언트 구현에 관계없이 모든 클라이언트가 동일한 규격을 사용할 수 있도록 보장하고자 합니다.

JSON-RPC는 상태를 가지지 않는 가벼운 원격 프로시저 호출(RPC) 프로토콜입니다. 데이터 구조와 처리 규칙을 정의합니다. 전송과는 관련이 없으며, 이러한 개념은 동일한 프로세스 내에서 인터페이스, HTTP 또는 다양한 메시지 전달 환경을 통해 사용할 수 있습니다. 데이터 형식으로 JSON(RFC 4627)을 사용합니다.

JSON-RPC는 대부분의 REST API 인터페이스와 호환되며, 기존의 REST API 인터페이스를 유지하면서 REST API 인터페이스를 사용하는 클라이언트는 JSON-RPC 인터페이스로 쉽게 전환할 수 있습니다. 일부 인터페이스는 다음과 같습니다:
- [/data/{id}/data/{hash}](api2.md#data-id-data-hash)
- [/data/{table}/id/{column}/{hash}](api2.md#data-table-id-column-hash)
- [avatar/{ecosystem}/{member}](api2.md#avatar-ecosystem-member)

REST API를 통해 얻을 수 있습니다.


## 클라이언트 측 구현 {#client-side-implementation}
각 클라이언트는 JSON-RPC 사양을 실행하는 데 다른 프로그래밍 언어를 사용할 수 있습니다. [GO-SDK](https://github.com/IBAX-io/go-ibax-sdk)를 사용할 수 있습니다.


## Curl 예제 {#curl-example}
아래는 IBAX 노드에 curl 요청을 보내 JSON-RPC 애플리케이션 인터페이스를 사용하는 예제입니다. 각 예제에는 특정 엔드포인트, 해당 매개변수 및 반환 유형에 대한 설명, 그리고 작동 예제를 사용하는 방법이 포함되어 있습니다.

Curl 요청은 콘텐츠 유형과 관련된 오류 메시지를 반환할 수 있습니다. 이는 --data 옵션으로 콘텐츠 유형을 application/x-www-form-urlencoded로 설정하기 때문입니다. 이 문제가 발생하는 경우 호출 시작 시 -H "Content-Type: application/json"을 사용하여 수동으로 헤더를 설정하십시오. 이러한 예제에는 또한 URL/인터넷 프로토콜 및 포트 조합이 포함되어 있지 않으며, 이 조합은 curl의 마지막 매개변수여야 합니다 (예: 127.0.0.1:7079). 이러한 추가 데이터를 포함하는 완전한 curl 요청은 다음과 같은 형식을 취합니다:

``` text
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.maxBlockId","params":[],"id":1}' http://127.0.0.1:7079
```

## 계약 {#covenant}

### Hex {#hex}
**16진수 인코딩**

바이트 배열, 해시 또는 바이트 코드 배열을 인코딩할 때는 각 바이트마다 두 개의 16진수 숫자로 표현하는 16진수 형식을 사용합니다.

### 요청 유형 {#request-type}
**항상 사용하세요**
- Content-Type: application/json

### 특수 표시{#special-markers}
#### Omitempty {#omitempty}
이 필드는 선택적 매개변수입니다.

만약 연속으로 여러 개의 `Omitempty` 필드가 존재하지만, 특정 필드의 값만 전달하려면, 필요하지 않은 필드를 비워야 합니다(해당 필드의 값은 빈 값이어야 함). 예시:
- **id** - *Number* - [Omitempty](#omitempty) id
- **name** - *String* - [Omitempty](#omitempty) 이름
- **column** - *String* - [Omitempty](#omitempty) 필터링할 열 이름

만약 name의 값만 전달하려면, 요청 매개변수는 다음과 같이 전달됩니다:

    `"params":[0,"testname"]` - *Number* 빈 값은 0입니다.

만약 column의 값만 전달하려면, 요청 매개변수는 다음과 같이 전달됩니다:

    `"params":[0,"","title,page"]` - *String* 빈 값은 ""입니다.



#### Authorization {#authorization}
Authorization 인증 헤더, 요청 헤더에 Authorization 추가, 예시:

**name** : Authorization **value** : Bearer +[login token](#ibax-login)

Example:
```` text
    //request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ey...." -d '{"jsonrpc":"2.0","method":"ibax.getContractInfo","params":["@1TokensSend"],"id":1}' http://127.0.0.1:7079

````

#### AccountOrKeyId {#accountorkeyid}
계정 주소 매개변수는 두 가지 형식의 주소를 사용할 수 있습니다. 예시:

1. - *String* - 계정 주소 `"XXXX-XXXX-XXXX-XXXX-XXXX"` 또는 계정 ID `"64842...538120"`

2. - *Object* - 주소 객체
    - **key_id** -  *Number* - 계정 ID, 예시: `{"key_id":-64842...38120}`
    - **account** - *String* - 계정 주소, 예시: `{"account":"1196-...-...-...-3496"}`

    **계정 주소와 계정 ID가 동시에 존재할 경우 계정 ID를 우선 사용합니다**.

#### BlockOrHash {#blockorhash}
블록 높이 또는 블록 해시, 예시:

1. - *String* - 블록 높이 `"100"` 또는 블록 해시 `"4663aa47...a60753c18d9ba9cb4"`

2. - *Object* - 블록 정보 객체
        - **id** -  *Number* - 블록 높이, 예시: `{"id":2}`
        - **hash** - *[Hex](#hex) String* - 블록 해시, 예시: `{"hash":"d36b8996c...c616d3043a0d02a0f59"}`
        
        **블록 높이와 블록 해시 중 하나만 선택할 수 있습니다**.

### 일괄 요청 {#batch-requests}
이 기능은 특히 대량의 독립적인 데이터 개체를 가져올 때 네트워크 지연을 줄이는 데 사용할 수 있습니다.

다음은 최고 블록과 총 거래 수를 가져오는 예시입니다:
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


### 오류 응답 처리{#error-response-handling}

요청이 성공적으로 실행되었을 경우 상태 코드 `200`을 반환합니다.

오류가 발생한 경우 다음 필드를 포함한 JSON 객체를 반환합니다:

-   jsonrpc

    오류 식별자.

-   id

    오류 텍스트 정보.

-   error
    - code

        응답 상태 코드
    - message

        응답 상태 설명

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

#### 인증 인터페이스 {#authentication-interface}
- [ibax.getuid](#ibax-getuid)
- [ibax.login](#ibax-login)
- [ibax.getAuthStatus](#ibax-getauthstatus)

#### 서버 명령 인터페이스 {#server-side-command-interface}
- [ibax.getVersion](#ibax-getversion)

#### 데이터 요청 기능 인터페이스 {#data-request-function-interface}
- [ibax.getBalance](#ibax-getbalance)
- [ibax.getBlocksTxInfo](#ibax-getblockstxinfo)
- [ibax.detailedBlocks](#ibax-detailedblocks)
- [ibax.getKeyInfo](#ibax-getkeyinfo)
- [ibax.detailedBlock](#ibax-detailedblock)

#### 지표 인터페이스를 가져옵니다. {#get-metrics-interface}
- [ibax.maxBlockId](#ibax-maxblockid)
- [ibax.getKeysCount](#ibax-getkeyscount)
- [ibax.getTxCount](#ibax-gettxcount)
- [ibax.getTransactionCount](#ibax-gettransactioncount)
- [ibax.getBlocksCountByNode](#ibax-getblockscountbynode)
- [ibax.honorNodesCount](#ibax-honornodescount)
- [ibax.getEcosystemCount](#ibax-getecosystemcount)

#### 생태계 인터페이스 {#ecosystem-interface}
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

#### 스마트 계약 기능 인터페이스 {#contract-function-interface}
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
 


## JSON-RPC 인터페이스 메서드 {#json-rpc-interface-methods}

### **ibax.getUid** {#ibax-getuid}

[Authorization](#authorization) [Omitempty](#omitempty)

임시 JWT 토큰을 생성하고 **[login](#ibax.login)**을 호출할 때 토큰을 [**Authorization**](#authorization)에 전달해야 합니다.

**매개변수**
없음

**반환값**
- **uid** - *String* - 서명된 숫자입니다.

- **token** - *String* - 로그인할 때 전달되는 임시 토큰(임시 토큰의 수명은 5초입니다).

- **network_id** - *String* - 네트워크 식별자입니다.

- **cryptoer** - *String* - 타원 곡선 알고리즘입니다.

- **hasher** - *String* - 해시 알고리즘입니다.

인증이 필요하지 않은 경우(요청에 [Authorization](#authorization)가 포함되지 않은 경우) 다음 정보가 반환됩니다:

- **expire** - *String* - 만료 시간입니다.

- **ecosystem** - *String* - 생태계 ID입니다.

- **key_id** - *String* - 계정 주소입니다.

- **address** - *String* - 지갑 주소 `XXXX-XXXX-XXXX-XXXX-XXXX`입니다.

- **network_id** - *String* - 네트워크 식별자입니다.

**예시**
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
사용자 인증. [Authorization](#authorization)

먼저 [**ibax.getUid**](#ibax-getuid) 명령을 호출하여 고유한 값을 받고 서명해야합니다. getuid의 임시 JWT 토큰은 요청 헤더에 전달되어야합니다. 요청이 성공하면 응답에서 받은 토큰은 [**Authorization**](#authorization)에 포함됩니다.

**매개변수**

*Object* - 인증 호출 객체
- **ecosystem_id** - *Number* - 생태계 ID. 지정되지 않은 경우 기본값은 첫 번째 생태계 ID입니다.

- **expire** - *Number* - JWT 토큰의 수명 (초). 기본값은 28800, 8시간입니다.

- **public_key** - *[Hex](#hex) String* - 16진수 계정 공개 키.

- **key_id** - *String* -
    > 계정 주소 `XXXX-...-XXXX`.
    >
    > 공개 키가 이미 블록 체인에 저장된 경우이 매개 변수를 사용하십시오. *pubkey* 매개 변수와 함께 사용할 수 없습니다.

- **signature** - *String* -
    getuid에서 받은 uid를 개인 키로 서명합니다.
    
    서명 데이터 내용: LOGIN + {$network_id} + uid.

- **role_id** - *Number* - 역할 ID, 기본 역할 0입니다.


**반환 값**
*Object* - 인증 객체
- **token** - *String* - JWT 토큰.

- **ecosystem_id** - *String* - 생태계 ID.

- **key_id** - *String* - 계정 주소 ID.

- **account** - *String* - 지갑 주소 `XXXX-XXXX-XXXX-XXXX-XXXX`.

- **notify_key** - *String* - 알림 ID.

- **isnode** - *Bool* - 해당 계정 주소가 노드 소유자인지 여부. 값: `true,false`.

- **isowner** - *Bool* - 해당 계정 주소가 생태계 생성자인지 여부. 값: `true,false`.

- **clb** - *Bool* - 로그인한 생태계가 CLB인지 여부. 값: `true,false`.

- **timestamp** - *String* - 현재 타임스탬프.

- **roles** - *Array* - 역할 목록, 역할이 없는 경우 nil.
    - **role_id** - *Number* - 역할 ID.
    - **role_name** - *String* - 역할 이름.

**예시**
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
사용자 신분 인증 상태.
[Authorization](#authorization)

**매개 변수**
죄송합니다, 번역할 내용이 없습니다. 다른 내용을 입력해주세요.

**반환 값**
*Object* - 인증 상태 객체입니다.
- **active** - *Bool* - 현재 사용자의 인증 상태입니다. 값: `true,false`.

- **exp** - *Number* - [Omitempty](#omitempty) 토큰의 유효한 만료 시간입니다.

**예시**
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
현재 서버 버전을 반환합니다.

**매개변수**
없음

**반환 값**
- **vesion** - *String* - 버전 번호(`big Version` + `branch name` + `git commit` + `time` + `node status`)。

**예시**
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
계정 주소 잔액을 가져옵니다.

**매개 변수**

- **key_id or account** - *[AccountOrKeyId](#accountorkeyid)* - 계정 주소 `XXXX-XXXX-XXXX-XXXX-XXXX` 또는 계정 ID입니다.

- **ecosystem_id** - *Number* - 생태계 ID [Omitempty](#omitempty)의 기본값은 1입니다.

**반환 값**
*Object* - 잔액 객체를 가져옵니다.
- **amount** - *String* - 계약 계정의 최소 단위 잔액입니다.

- **total** - *String* - 계정의 최소 단위 총 잔액 (amount + utxo).

- **utxo** - *String* - 최소 단위 UTXO 계정 잔액입니다.

- **digits** - *Number* - 정밀도입니다.

- **token_symbol** - *String* - 토큰 심볼입니다.

**예시**
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
각 블록에 포함된 거래의 관련 추가 정보 목록을 반환합니다.

**매개 변수**

- **block_id** - *Number* - 조회할 시작 블록 높이입니다.

- **count** - *Number* - 블록 수, 기본값은 25이며, 최대 요청은 100입니다.

**반환 값**
*Object* - 블록 정보 객체를 가져옵니다.
- **block_id** - *String* - 블록 높이입니다.
- 블록에 포함된 거래 목록 및 각 거래의 추가 정보:
    
    - **hash** - *[Hex](#hex) 문자열* - 거래 해시입니다.

    - **contract_name** - *String* - 스마트 계약 이름입니다.

    - **params** - *객체* - 스마트 계약 매개변수입니다. 스마트 계약 필드는 [ibax.getContractInfo](#ibax-getcontractinfo)를 통해 조회할 수 있습니다.

    - **key_id** - *숫자* - 첫 번째 블록에서는 해당 거래를 서명한 첫 번째 블록의 계정 주소입니다.

        다른 모든 블록에서는 해당 거래를 서명한 계정 주소입니다.

**예시**
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
각 블록에 포함된 거래의 상세한 추가 정보 목록을 반환합니다.

**매개 변수**
- **block_id** - *숫자* - 조회할 시작 블록 높이입니다.

- **count** - *숫자* - 블록 수입니다. 기본값은 25이며, 최대 요청 수는 100입니다.


**반환 값**
*Object* - 블록 세부 정보를 가져옵니다.
- **block_id** - *String* - 블록 높이입니다.
    - **header** - *Object* - 블록 헤더입니다. 블록 헤더에는 다음과 같은 필드가 포함됩니다:
        - **block_id** - *Number* - 블록 높이입니다.
        - **time** - *Number* - 블록 생성 타임스탬프입니다.
        - **key_id** - *Number* - 해당 블록에 서명한 계정 주소입니다.
        - **node_position** - *Number* - 블록을 생성한 노드의 위치입니다.
        - **version** - *Number* - 블록 구조 버전입니다.
    - **hash** - *[Hex](#hex) String* - 블록 해시입니다.
    - **node_position** - *Number* - 블록을 생성한 노드의 위치입니다.
    - **key_id** - *Number* - 해당 블록에 서명한 계정 주소입니다.
    - **time** - *Number* - 블록 생성 타임스탬프입니다.
    - **tx_count** - *Number* - 블록 내의 트랜잭션 수입니다.
    - **size** - *String* - 블록의 크기입니다.
    - **rollback_hash** - *[Hex](#hex) String* - 블록 롤백 해시 값입니다.
    - **merkle_root** - *[Hex](#hex) String* - 블록의 트랜잭션에 대한 머클 트리입니다.
    - **bin_data** - *[Hex](#hex) String* - 블록 헤더, 블록 내 모든 트랜잭션, 이전 블록 해시 및 해당 블록을 생성한 노드의 개인 키의 직렬화입니다.
    - **transactions** - *Object* - 트랜잭션입니다. 블록에 포함된 트랜잭션 목록과 각 트랜잭션의 추가 정보입니다:
        - **hash** - *[Hex](#hex) String* - 트랜잭션 해시입니다.
        - **contract_name** - *String* - 스마트 계약 이름입니다.
        - **params** - *Object* - 스마트 계약 매개변수입니다. 스마트 계약 필드는 [ibax.getContractInfo](#ibax-getcontractinfo)를 통해 조회할 수 있습니다.
        - **key_id** - *Number* - 해당 트랜잭션에 서명한 계정 주소입니다.
        - **time** - *Number* - 트랜잭션 생성 타임스탬프 (단위: ms)입니다.
        - **type** - *Number* - 트랜잭션 유형입니다.
        - **size** - *String* - 트랜잭션 크기입니다.

**예시**
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
특정 주소에 등록된 역할이 포함된 생태계 목록을 반환합니다.

**매개 변수**
- **account** - *String* - 계정 주소.

**반환 값**
*Object* - 지정된 주소의 생태계 목록 객체.
- **account** - *String* - 계정 주소.
- **ecosystems** - *Array* - 생태계 목록.
    - **ecosystem** - *String* - 생태계 시스템 ID.
    - **name** - *String* - 생태계 시스템 이름.
    - **digits** - *Number* - 정밀도.
    - **roles** - *Array* - 역할 목록.
        - **id** - *String* - 역할 ID.
        - **name** - *String* - 역할 이름.

 
**예시**
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
거래의 상세한 부가 정보 목록을 블록 내에서 반환합니다.

**매개 변수**
- **Block or Hash** - *[BlockOrHash](#blockorhash)* - 블록 높이 또는 블록 해시.

**반환 값**
*Object* - 블록 세부 정보를 가져옵니다.
- **header** - *Object* - 블록 헤더 블록 헤더에는 다음과 같은 필드가 포함됩니다:
    - **block_id** - *Number* - 블록 높이.
    - **time** - *Number* - 블록 생성 타임스탬프.
    - **key_id** - *Number* - 해당 블록에 서명한 계정 주소.
    - **node_position** - *Number* - 블록을 생성한 노드의 위치.
    - **version** - *Number* - 블록 구조 버전.

- **hash** - *[Hex](#hex) String* - 블록 해시.
- **node_position** - *Number* - 블록을 생성한 노드의 위치.
- **key_id** - *Number* - 해당 블록에 서명한 계정 주소.
- **time** - *Number* - 블록 생성 타임스탬프.
- **tx_count** - *Number* - 블록 내의 트랜잭션 수.
- **size** - *String* - 블록 크기.
- **rollback_hash** - *[Hex](#hex) String* - 블록 롤백 해시 값.
- **merkle_root** - *[Hex](#hex) String* - 블록 내 트랜잭션의 머클 트리.
- **bin_data** - *[Hex](#hex) String* - 블록 헤더, 블록 내 모든 트랜잭션, 이전 블록 해시 및 해당 블록을 생성한 노드의 개인 키의 직렬화.
- **transactions** - *Array* - 트랜잭션 블록에 포함된 트랜잭션 목록 및 각 트랜잭션의 추가 정보:
    - **hash** - *[Hex](#hex) String* - 트랜잭션 해시.
    - **contract_name** - *String* - 스마트 계약 이름.
    - **params** - *Object* - 스마트 계약 매개변수. 스마트 계약 필드는 [ibax.getContractInfo](#ibax-getcontractinfo)를 통해 조회할 수 있습니다.
    - **key_id** - *Number* - 해당 트랜잭션에 서명한 계정 주소.
    - **time** - *Number* - 트랜잭션 생성 타임스탬프 (단위: ms).
    - **type** - *Number* - 트랜잭션 유형.
    - **size** - *String* - 트랜잭션 크기.

**예시**
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
현재 노드의 최고 블록 ID를 가져옵니다.

**매개변수**
없음

**반환 값**
- *Number* - 현재 노드의 최고 블록입니다.

**예시**
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
현재 노드에 있는 총 주소 수를 가져옵니다.

**매개변수**
없음
**반환 값**
- **Count** - *Number* - 총 주소 수.

**예시**
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
현재 노드의 총 거래 수를 가져옵니다.

**매개변수**
없음

**반환 값**
- **Count** - *Number* - 총 거래 수.

**예시**
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
블록의 거래 수를 가져옵니다.

**매개 변수**
- **block or hash**  - *[BlockOrHash](#blockorhash)* - 블록 높이 또는 블록 해시입니다.

**반환 값**
- **Count** - *Number* - 구역 총 수량.

**예시**
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
노드 위치와 패킹된 블록 수를 가져옵니다.
**매개 변수**
- **nodePosition** - *숫자* - 노드 인덱스.

- **consensusMode** - *숫자* - 합의 모드, 매개변수 (1: 창시자 관리 모드 2: DAO 거버넌스 모드).

**반환 값**
*객체* - 노드 인덱스 패킹 수 객체를 가져옵니다.
- **total_count** - *숫자* - 총 블록 수입니다.
- **partial_count** - *숫자* - 노드 인덱스 패킹된 블록 수입니다.

**예시**
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
영광 노드의 수를 얻습니다.

**매개변수**
없음

**반환 값**
- **Count** - *Number* - 노드 수.

**예시**
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
생태계의 수를 얻으십시오.

**매개변수**
없음

**반환 값**
- **Count** - *Number* - 생태계 수.

**예시**
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
생태계 정보를 가져옵니다.

**매개 변수**
- **ecosystem id** - *Number* - 생태계 ID.

**반환 값**
- **id** - *Number* - 생태계 ID.
- **name** - *String* - 생태계 이름.
- **digits** - *Number* - 정밀도.
- **token_symbol** - *String* - 토큰 심볼.
- **token_name** - *String* - 토큰 이름.
- **total_amount** - *String* - 발행량 (첫 발행량, 발행되지 않은 경우 "0").
- **is_withdraw** - *Bool* - 소각 가능 여부 (`true`: 소각 가능, `false`: 소각 불가능).
- **withdraw** - *String* - 소각량 (소각 불가능하거나 소각되지 않은 경우 "0").
- **is_emission** - *Bool* - 추가 발행 가능 여부 (`true`: 추가 발행 가능, `false`: 추가 발행 불가능).
- **emission** - *String* - 추가 발행량 (추가 발행 불가능하거나 추가 발행되지 않은 경우 "0").
- **introduction** - *String* - 생태계 소개.
- **logo** - *Number* - 생태계 로고 ID (Binary 테이블 ID에 해당), RESTful API를 통해 얻을 수 있음.
- **creator** - *String* - 생태계 생성자.

**예시**
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
현재 또는 지정된 생태계에서의 애플리케이션 매개변수 목록을 반환합니다.

[Authorization](#authorization)

**매개 변수**
- **appid** - *Number* - 애플리케이션 ID.

- **ecosystem** - *Number* - [Omitempty](#omitempty) - 생태계 ID;

    지정되지 않거나 0이면 현재 생태계의 매개변수를 반환합니다.

- **names** - *String* - [Omitempty](#omitempty) - 애플리케이션 매개변수 이름 필터링.
    
    쉼표로 구분된 이름 목록입니다. 예: `name1,name2`.

- **offset** - *Number* - [Omitempty](#omitempty) 오프셋, 기본값은 0입니다.

- **limit** - *Number* - [Omitempty](#omitempty) 항목 수, 기본값은 10이며 최대 100입니다.
 
**반환 값**

*배열* - 응용 프로그램 매개 변수 목록.
- **app_id** - *숫자* - 응용 프로그램 ID.
- **list** - *숫자* - 배열의 각 요소는 다음 매개 변수를 포함합니다.
    - **id** - *String* - 매개 변수 ID, 고유합니다.
    - **name** - *String* - 매개 변수 이름.
    - **value** - *String* - 매개 변수 값.
    - **conditions** - *String* - 매개 변수를 변경하는 권한.

**예시**
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
생태계 매개 변수 목록을 가져옵니다.

[Authorization](#authorization)

**매개 변수**
- **ecosystem** - *Number* - [Omitempty](#omitempty) - 생태계 ID입니다.

    0이거나 이 매개변수가 없는 경우 기본값은 현재 생태계 ID입니다.

- **names** - *String* - [Omitempty](#omitempty) - 필터링할 매개변수 이름입니다.

    쉼표로 구분된 이름 목록입니다. 예: `name1,name2`.

    필터링 매개변수가 있는 경우 *offset* 및 *limit* 매개변수는 무시됩니다.

- **offset** - *Number* - [Omitempty](#omitempty) - 오프셋 값입니다. 기본값은 0입니다.

- **limit** - *Number* - [Omitempty](#omitempty) - 항목 수입니다. 기본값은 10이며 최대 100입니다.


**반환 값**
- **list** - *Array* - 배열의 각 요소는 다음 매개변수를 포함합니다:
    - **id** - *String* - 매개변수 ID입니다. 고유합니다.
    - **name** - *String* - 매개변수 이름입니다.
    - **value** - *String* - 매개변수 값입니다.
    - **conditions** - *String* - 매개변수 변경 권한입니다.

**예시**
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
현재 생태계의 데이터 테이블 목록을 반환합니다.

오프셋과 항목 수를 설정할 수 있습니다.

[Authorization](#authorization)
**매개 변수**

- **offset** - *숫자* - [Omitempty](#omitempty) 오프셋 값으로 기본값은 0입니다.

- **limit** - *숫자* [Omitempty](#omitempty) 항목 수로 기본값은 25이며 최대 100개입니다.

**반환 값**
- **count** - *숫자* - 현재 생태 데이터 테이블의 총 개수입니다.

- **list** - *배열* - 각 요소는 다음 매개변수를 포함합니다:
    - **name** - *String* - 접두사가 없는 데이터 테이블 이름입니다.
    - **count** - *String* - 데이터 테이블의 항목 수입니다.

**예시**
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
현재 생태계에서 데이터 테이블에 대한 관련 정보를 반환합니다.

[Authorization](#authorization)

**매개 변수**
- **tableName** - *String* - 데이터 테이블 이름.

**반환 값**
- **name** - *String* - 데이터 테이블 이름.

- **insert** - *String* - 항목 추가 권한.

- **new_column** - *String - 새로운 열 권한.

- **update** - *String - 항목 변경 권한.

- **app_id** - *String* - 애플리케이션 ID.

- **conditions** - *String* - 권한 변경 조건.

- **columns** - *Array - 데이터 테이블 필드 관련 정보 배열:
    - **name** - *String* - 필드 이름.
    - **type** - *String* - 필드 데이터 유형.
    - **perm** - *String* - 해당 필드 값을 변경하는 권한.


**예시**
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
지정된 데이터 테이블의 항목을 반환합니다.

반환할 열을 지정할 수 있습니다.

오프셋과 항목 수를 설정할 수 있습니다.

쿼리 조건을 설정할 수 있습니다.

데이터 테이블에서 *BYTEA*(바이트 배열, 해시, 바이트 코드 배열) 유형을 16진수로 인코딩 처리합니다.

[Authorization](#authorization)

**매개 변수**
*Object* - 데이터 테이블 객체를 가져옵니다.
- **name** - *String* - 데이터 테이블 이름.

- **limit** - *Number* - [Omitempty](#omitempty) 항목 수 제한, 기본값은 25입니다.

- **offset** - *Number* - [Omitempty](#omitempty) 오프셋, 기본값은 0입니다.

- **order** - *String* - [Omitempty](#omitempty) 정렬 순서, 기본값은 id ASC입니다.

- **columns** - *String* - [Omitempty](#omitempty) 요청할 열 목록, 쉼표로 구분됩니다. 지정하지 않으면 모든 열이 반환됩니다.

    모든 경우에 id 열이 반환됩니다.

- **where** - *Object* - [Omitempty](#omitempty)

    쿼리 조건, 예: id>2 및 name = john을 조회하려면 `where:{"id":{"$gt":2},"name":{"$eq":"john"}}`를 사용할 수 있습니다.
    
    자세한 내용은 [DBFind](../topics/script.md#dbfind) where 구문을 참조하세요.

**반환 값**
- **count** - *Number* - 항목 총 수.
- **list** - *Array* - 배열의 각 요소는 다음 매개변수를 포함합니다:

    - **id** - *String* - 항목 ID.
    - **...** - 데이터 테이블의 다른 열.

**예시**
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
현재 생태계의 탭 목록 항목을 반환합니다. 오프셋과 항목 수를 설정할 수 있습니다.

*role_access* 필드에 역할 목록이 포함되어 있고 현재 역할이 포함되어 있지 않으면 레코드가 반환되지 않습니다. *title* 필드 내 데이터는 요청 헤더의 *Accept-Language* 언어 리소스로 대체됩니다.

[Authorization](#authorization)

**매개 변수**

- *Object* - sections 요청 객체를 가져옵니다.
    - **limit** - *Number* - [Omitempty](#omitempty) - 항목 수 제한, 기본값은 25입니다.

    - **offset** - *Number* - [Omitempty](#omitempty) - 오프셋, 기본값은 0입니다.

    - **lang** - *String* - [Omitempty](#omitempty) - 
        이 필드는 다국어 리소스 코드 또는 로캘을 지정합니다. 예를 들어: *en, kr*. 지정된 다국어 리소스를 찾을 수 없는 경우, 예를 들어: *en-US*, 다국어 리소스 그룹에서 **default**: **en**을 검색합니다.

**반환 값**

- **count** - *Number* - 탭 항목의 총 수입니다.

- **list** - *Array* - 배열의 각 요소는 sections 테이블의 모든 열 정보를 포함합니다.

**예시**
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
지정된 데이터 테이블의 항목을 현재 생태계에서 반환합니다. 반환할 열을 지정할 수 있습니다.

[Authorization](#authorization)
**매개 변수**

- **tableName** - *String* - 데이터 테이블 이름.

- **id** - *Number* - 항목 ID.

- **columns** - *String* - [Omitempty](#omitempty)

    요청한 열의 목록을 쉼표로 구분하여 지정합니다. 지정하지 않으면 모든 열을 반환합니다.
    
    필터링하지 않을 경우 ""로 설정할 수 있습니다.
    
    모든 경우에 id 열이 반환됩니다.

- **whereColumn** - *String* - [Omitempty](#omitempty) - 찾을 열 이름 (숫자 유형 열만 찾을 수 있음).

**반환 값**
- **value**- *Object* - 열 값이 들어있는 객체.
    - **id** - *String* - 항목 ID.
    - **...** - 요청한 열의 시퀀스.

**예시**
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
플랫폼 매개변수 목록을 반환합니다.

[Authorization](#authorization)
**매개 변수**
- **names** - *String* [Omitempty](#omitempty) - 요청 매개변수 목록을 쉼표로 구분한 문자열입니다.

    예: `names="name1,name2"`. 필터링 매개변수가 있는 경우 *offset* 및 *limit* 매개변수는 무시됩니다.

- **offset** - *Number* - [Omitempty](#omitempty) 오프셋 값으로 기본값은 0입니다.

- **limit** - *Number* [Omitempty](#omitempty) 항목 수로 기본값은 10이며 최대 100입니다.

**반환 값**

- **list** - *Array* - 배열의 각 요소는 다음 매개변수를 포함합니다:
    - **id** - *String* - 고유한 ID입니다.
    - **name** - *String* - 매개변수 이름입니다.
    - **value** - *String* - 매개변수 값입니다.
    - **conditions** - *String* - 매개변수 변경 권한입니다.

**예시**
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
지정된 데이터 테이블의 항목 변경 기록을 현재 생태계에서 반환합니다.

[Authorization](#authorization)

**반환 값**
- **list** - *Array* - 각 요소는 요청된 항목의 변경 기록을 포함합니다.

- **이름** - *String - 데이터 테이블 이름.
- **tableId** - *Number* - 항목 ID.

**반환 값**
- **list** - *Array* - 요청한 항목의 변경 기록을 포함하는 각 요소가 있는 배열.

**예시**
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
현재 생태계 시스템의 페이지 데이터 테이블 필드 항목을 가져옵니다.

[Authorization](#authorization)

**매개 변수**
- **name** - *String* - 지정된 표의 항목 이름입니다.

**반환 값**
- **id** - *Number* - 항목 ID.
- **name** - *String* - 항목 이름.
- **value** - *String* - 내용.
- **menu** - *String* - 메뉴.
- **nodesCount** - *Number* - 페이지에서 필요한 노드 수.
- **app_id** - *Number* - 애플리케이션 ID.
- **conditions** - *String* - 매개변수 변경 권한.

**예시**
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
현재 생태계 메뉴 데이터 테이블의 필드 항목을 가져옵니다.

[Authorization](#authorization)

**매개 변수**
- **name** - *String* - 지정된 표의 항목 이름입니다.

**반환 값**
- **id** - *Number* - 항목 ID.
- **name** - *String* - 항목 이름.
- **title** - *String* - 제목.
- **value** - *String* - 내용.
- **conditions** - *String* - 매개변수 변경 권한.

**예시**
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
현재 생태계 스니펫 데이터 테이블의 필드 항목을 가져옵니다.

[Authorization](#authorization)

**매개 변수**
- **name** - *String* - 지정된 표의 항목 이름입니다.

**반환 값**
- **id** - *Number* - 항목 ID.
- **name** - *String* - 항목 이름.
- **value** - *String* - 내용.
- **conditions** - *String* - 매개변수 변경 권한.

**예시**
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
애플리케이션 관련 정보 (페이지, 스니펫, 메뉴 포함)를 가져옵니다.

[Authorization](#authorization)

**매개 변수**
- **id** - *Number* - 응용 프로그램 ID.

**반환 값**

- **snippets** - *Array* - 코드 조각 정보 배열.

    - **id** - *Number* - 아이디.
    - **name** - *String* - 코드 조각 이름.

- **pages** - *Array* - 페이지 정보 배열.

    - **id** - *Number* - 아이디.
    - **name** - *String* - 페이지 이름.

- **contracts** - *Array* - 계약 정보 배열.

    - **id** - *Number* - 아이디.
    - **name** - *String* - 계약 이름.
**예시**
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


### **ibax.getMember** {#ibax-getmember}
멤버 정보를 가져옵니다.

**매개 변수**
**account** - *String* - 멤버 정보.

**ecosystemId** - *Number* - 생태 아이디.


**반환 값**
- **id** - *Number* - 멤버 아이디.
- **member_name** - *String* - 이름.
- **image_id** - *Number* - 프로필 사진 아이디.
- **member_info** - *String* - 소개.


**예시**
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
현재 생태계에서의 계약 목록을 가져올 수 있으며, 오프셋과 항목 수를 설정할 수 있습니다.

[Authorization](#authorization)

**매개 변수**
- **offset** - *Number* - [Omitempty](#omitempty) 오프셋, 기본값은 0입니다.
- **limit** - *Number* - [Omitempty](#omitempty) 항목 수, 기본값은 25입니다.

**반환 값**
- **count** - *Number* - 총 항목 수.

- **list** - *Array* - 각 요소는 다음 매개변수를 포함합니다:
    - **id** - *String* - 계약 ID입니다.
    - **name** - *String* - 계약 이름입니다.
    - **value** - *String* - 계약 내용입니다.
    - **wallet_id** - *String* - 계약이 바인딩된 계정 주소입니다.
    - **address** - *String* - 계약이 바인딩된 지갑 주소 `XXXX-...-XXXX`입니다.
    - **ecosystem_id** - *String* - 계약이 속한 생태계 ID입니다.
    - **app_id** - *String* - 계약이 속한 애플리케이션 ID입니다.
    - **conditions** - *String* - 계약을 변경하는 권한입니다.
    - **token_id** - *String* - 계약 수수료로 지불되는 토큰이 속한 생태계 ID입니다.


**예시**
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
지정된 계약의 관련 정보를 반환합니다.

[Authorization](#authorization)

**매개 변수**
- **contractName** - *String* - 계약 이름입니다. 형식은 `@ecosystem_id%%contractName%`이며, 예를 들어 @1contractName(생태계 1에서 지정된 계약 이름 contractName) 또는 contractName(현재 생태계 계약 이름 contractName)과 같습니다.
    
**반환 값**

- **id** - *Number* - VM에서의 계약 ID입니다.
- **name** - *String* - 생태계 ID가 포함된 계약 이름 `@1MainCondition`입니다.
- **state** - *Number* - 계약이 속한 생태계 ID입니다.
- **walletid** - *String* - 계약이 바인딩된 계정 주소입니다.
- **tokenid** - *String* - 계약 수수료로 지불되는 토큰이 속한 생태계 ID입니다.
- **address** - *String* - 계약이 바인딩된 지갑 주소 `XXXX-...-XXXX`입니다.
- **tableid** - *String* - *contracts* 테이블에서 계약이 위치한 항목 ID입니다.
- **fields** - *Array* - 배열에는 계약 **data** 부분의 각 매개변수의 구조 정보가 포함됩니다:
    - **name** - *String* - 매개변수 이름입니다.
    - **type** - *String* - 매개변수 유형입니다.
    - **optional** - *Bool* - 매개변수 옵션입니다. `true`는 선택적 매개변수를 나타내고, `false`는 필수 매개변수를 나타냅니다.

**예시**
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
매개변수로 받은 거래를 거래 대기열에 추가하고, 요청이 성공적으로 실행되면 거래 해시를 반환합니다. 이 해시를 사용하여 해당 거래를 블록 내에서 얻을 수 있으며, 오류 응답이 발생할 경우 해당 해시는 오류 텍스트 메시지에 포함됩니다.

[Authorization](#authorization)

**매개 변수**
- *Object* - 거래 데이터 개체
    - **tx_key** - *String* - 거래 내용, 이 매개 변수는 임의의 이름을 지정할 수 있으며, 여러 거래를 받을 수 있습니다.

**반환 값**
- **해시** - *Array* - 거래 해시 배열:
   - **tx1** - *String* - 거래 1의 해시.
   - **txN** - *String* - 거래 N의 해시.

**예시**
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
지정된 거래 해시의 블록 ID와 오류 메시지를 가져옵니다. 블록 ID와 오류 텍스트 메시지의 반환 값이 비어있으면 해당 거래는 아직 블록에 포함되지 않았습니다.

[Authorization](#authorization)

**매개 변수**
- **hashes** - *String* - 거래 해시, `,`로 구분하여 사용하십시오.

**반환 값**

- **hash** - *Object* - 거래 해시입니다.
    - **blockid** - *String* - 거래가 성공적으로 실행되면 블록 ID가 반환됩니다.
    
        거래가 실패하면 *blockid*는 `0`이 되며, 거래 실행 오류로 인해 처벌이 있을 경우 해당 블록 ID가 반환됩니다.
    
    - **result** - *String* - 거래 결과를 **\$result** 변수로 반환합니다.
    - **errmsg** - *Object* - [Omitempty](#omitempty) 거래 실행 실패 시 오류 텍스트 정보가 반환됩니다.
        - **type** - *String* - 오류 유형입니다.
        - **error** - *String* - 오류 메시지입니다.
    - **penalty** - *Number* - 거래 실행 실패 시 (0: 처벌 없음, 1: 처벌 있음)입니다.

**예시**
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
지정된 해시의 거래 관련 정보를 반환합니다. 이 정보에는 블록 ID와 확인 수가 포함됩니다. 선택적 매개변수를 지정하면 계약 이름과 관련 매개변수도 반환할 수 있습니다.

**매개 변수**
- **hash** - *String* - 거래 해시.

- **contractinfo** - *Bool* [Omitempty](#omitempty) - 계약의 자세한 매개변수 식별자를 가져와 해당 거래에 관련된 계약 세부 정보를 얻습니다. 기본값은 `false`입니다.

**반환 값**
- **blockid** - *Number* - 해당 거래를 포함하는 블록 ID입니다. 값이 `0`이면 해당 해시의 거래를 찾을 수 없습니다. 거래가 현재 노드에서 발생한 경우 [ibax.txStatus](#ibax-txstatus)를 통해 확인할 수 있습니다.

- **confirm** - *Number* - 해당 블록 *blockid*의 노드 확인 수입니다.

- **데이터** - *Object* - `contentinfo=true`가 지정된 경우 계약 세부 정보를 반환합니다. 지정되지 않은 경우 null입니다.
    - **block_id** - *Number* - 블록 높이입니다.
    - **block_hash** - *String* - 블록 해시입니다.
    - **address** - *String* - 트랜잭션 생성 주소입니다.
    - **ecosystem** - *String* - 트랜잭션 전송 생태계 ID입니다.
    - **hash** - *String* - 트랜잭션 해시입니다.
    - **expedite** - *String* - 긴급 수수료입니다. 없으면 ""입니다.
    - **contract_name** - *String* - 계약 이름입니다.
    - **params** - *Object* - 계약 매개변수입니다. 계약 필드는 [ibax.getContractInfo](#ibax-getcontractinfo)를 통해 조회할 수 있습니다.
    - **created_at** - *Number* - 트랜잭션 생성 시간입니다.
    - **size** - *String* - 트랜잭션 크기 단위: B;KiB;MiB;GiB;TiB입니다.
    - **status** - *String* - 상태 (0: 성공 1: 벌점)입니다.


**예시**
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
지정된 해시 목록의 거래 관련 정보를 반환합니다.

**매개 변수**
- **hashes** - *Array* - 거래 해시 목록입니다.

- **contractinfo** - *Bool* [Omitempty](#omitempty) - 계약의 자세한 매개변수 식별자를 가져와 해당 거래에 관련된 계약 세부 정보를 얻습니다. 기본값은 `false`입니다.

**반환 값**

- **results** - *Array* - 거래 해시를 키로 사용하여 거래 세부 정보를 값으로 하는 데이터 사전입니다.
    - **hash** - *String* - 거래 해시입니다.
        - **blockid** - *Number - 해당 거래를 포함하는 블록의 ID입니다. 값이 `0`이면 해당 해시의 거래를 찾을 수 없습니다.
        - **confirm** - *Number* - 블록 ID가 있는 블록의 확인 수입니다.
        - **data** - *Object* - `contentinfo=true`가 지정된 경우 이 매개변수에는 계약 세부 정보가 반환됩니다. 지정되지 않은 경우 null입니다.
            - **block_id** - *Number* - 블록 높이입니다.
            - **block_hash** - *String* - 블록 해시입니다.
            - **address** - *String* - 거래 생성 주소입니다.
            - **ecosystem** - *String* - 거래 전송 생태계 ID입니다.
            - **hash** - *String* - 거래 해시입니다.
            - **expedite** - *String* - 긴급 수수료가 있으면 표시되고, 없으면 ""입니다.
            - **contract_name** - *String* - 계약 이름입니다.
            - **params** - *Object* - 계약 매개변수입니다. 계약 필드는 [ibax.getContractInfo](#ibax-getcontractinfo)를 통해 조회할 수 있습니다.
            - **created_at** - *Number* - 거래 생성 시간입니다.
            - **size** - *String* - 거래 크기 단위: B;KiB;MiB;GiB;TiB입니다.
            - **status** - *String* - 상태 (0: 성공, 1: 벌점)입니다.

**예시**
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
지정된 페이지에 필요한 인증 노드 수를 반환합니다.

**매개 변수**
- **name** - *String* - 페이지 이름은 `@ecosystem_id%%page_name%` 형식으로 작성되며, 예를 들어 @1params_list(생태계 1의 페이지 이름 params_list) 또는 params_list(현재 생태계의 페이지 이름 params_list)와 같이 사용됩니다.


**반환 값**
- **validate_count** - *Number* - 지정된 페이지에서 필요한 노드 수를 확인합니다.

**예시**
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
지정된 페이지 이름의 코드 JSON 객체 트리를 가져옵니다. 이것은 템플릿 엔진의 처리 결과입니다.

[Authorization](#authorization)

**매개 변수**
-   **name** - *String* - 페이지 이름에 생태계 ID가 포함되어 있으며, 형식은 `@ecosystem_id%%page_name%`입니다. 예를 들어 `@1main_page`와 같습니다.

    생태계 ID가 포함되지 않은 경우, 현재 생태계의 페이지를 기본적으로 찾습니다. 예를 들어 `main_page`입니다.

**반환 값**
- **menu** - *String* - 페이지가 속하는 메뉴 이름입니다.

- **menutree** - *Array* - 페이지의 메뉴 JSON 객체 트리입니다.

- **tree** - *Array* - 페이지의 JSON 객체 트리입니다.


**예시**
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
지정된 메뉴 이름의 코드 JSON 객체 트리를 가져옵니다. 이것은 템플릿 엔진에서 처리한 결과입니다.

[Authorization](#authorization)

**매개 변수**
-   **name** - *String* -
    > 생태계 ID가 포함된 메뉴 이름은 `@ecosystem_id%%menu_name%` 형식으로 작성됩니다. 예를 들어 `@1main_menu`와 같습니다. 생태계 ID가 없는 경우에는 현재 생태계의 메뉴를 기본으로 찾습니다. 예를 들어 `main_menu`입니다.

**반환 값**

- **title** - *String* - 메뉴 제목.

- **tree** - *Array* - 메뉴 JSON 객체 트리입니다.

**예시**
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
지정된 페이지 이름의 코드 JSON 객체 트리를 반환합니다. 어떤 함수도 실행하지 않고 어떤 데이터도 받지 않습니다. 반환된 JSON 객체 트리는 페이지 템플릿에 해당하며, 시각적인 페이지 디자이너에서 사용할 수 있습니다. 페이지를 찾을 수 없는 경우 404 오류를 반환합니다.


[Authorization](#authorization)

**매개 변수**
-   **name** - *String* -
    생태계 ID가 포함된 페이지 이름은 `@ecosystem_id%%page_name%` 형식으로 작성됩니다. 예를 들어 `@1main_page`와 같습니다. 생태계 ID가 없는 경우에는 현재 생태계에서 해당 페이지를 찾습니다. 예를 들어 `main_page`입니다.
    
**반환 값**
-   **tree** - *Array* - 페이지의 JSON 객체 트리입니다.

**예시**
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
지정된 페이지 이름의 SHA256 해시를 반환하고 페이지를 찾을 수 없는 경우 404 오류를 반환합니다.

다른 노드에 요청을 보낼 때 올바른 해시를 받으려면 *ecosystem, key_id, role_id* 매개변수를 전달해야 합니다. 다른 생태계에서 페이지를 받으려면 페이지 이름에 생태계 ID를 접두사로 추가해야 합니다. 예를 들어: `@2mypage`.

**매개 변수**
- **name** - *String* - 생태계 ID가 포함된 페이지 이름입니다. 형식은 `@ecosystem_id%%page_name%`이며, 예를 들어 `@1main_page`와 같이 생태계 ID를 지정할 수 있습니다.

- **ecosystem** - *Number* - [Omitempty](#omitempty) 생태계 식별자.

- *Object* - [Omitempty](#omitempty) 지정된 페이지 개체를 가져옵니다.
    - **key_id** - *String* - 계정 주소입니다.
    - **role_id** - *String* - 역할 ID입니다.

**반환 값**
- *Object* -
    - **hash** - *String* - 십육진수 해시 값.

**예시**
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
**template** 매개변수에서 페이지 코드의 JSON 객체 트리를 반환합니다. 선택적 매개변수로 **source**를 `true`로 지정하면 해당 JSON 객체 트리는 함수를 실행하거나 데이터를 받지 않습니다. 이 JSON 객체 트리는 시각적 페이지 디자이너에서 사용할 수 있습니다.

**매개 변수**
- *Object*
    - **template** - *String* - 페이지 코드입니다.

    - **source** - *Bool* - 만약 `true`로 지정되면 JSON 객체 트리는 어떠한 함수도 실행하거나 데이터를 받지 않습니다.

**반환 값**
- **tree** - *Object* - JSON 객체 트리.

**예시**
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
지정된 블록 ID의 관련 정보를 반환합니다.

**매개 변수**
- **id** - *Number* - 블록 높이.

**반환 값**

- **hash** - *String* - 블록의 해시 값입니다.

- **key_id** - *Number* - 해당 블록을 서명한 계정 주소입니다.

- **time** - *Number* - 블록 생성 타임스탬프입니다.

- **tx_count** - *Number* - 해당 블록 내의 전체 거래 수입니다.

- **rollbacks_hash** - *String* - 블록 롤백 해시 값입니다.

- **node_position** - *Number* - 블록이 명예 노드 목록에서의 위치입니다.

- **consensus_mode** - *Number* - 합의 모드입니다. (1: 생성자 관리 모드, 2: DAO 거버넌스 모드)

**예시**
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
centrifugo의 호스트 주소와 포트를 가져옵니다.

**매개 변수**
- **option** - *String* - 구성 항목.

    1."centrifugo" - 메시지 서비스.


**반환 값**

- **centrifugo** - *String* - [Omitempty](#omitempty) centrifugo的主机地址和端口 结果格式 `http://address:port`，例如: `http://127.0.0.1:8100`。

**예시**
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
노드 정보를 가져옵니다.

**매개변수**
없음

**반환 값**
- **network_id** - *String* - 네트워크 식별자입니다.
- **centrifugo_url** - *String* - centrifugo 메시지 서비스 주소입니다.
- **test** - *Bool* - 테스트 체인 여부입니다.
- **private** - *Bool* - 개인 체인 여부입니다.
- **honor_nodes** - *Object* - 명예 노드 목록입니다.
    - **tcp_address** - *String* - TCP 주소입니다.
    - **api_address** - *String* - API 주소입니다.
    - **public_key** - *String* - 노드 공개 키입니다.
    - **unban_time** - *String* - 잠금 해제 시간입니다.


**예시**
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
현재 노드 상태를 가져옵니다.

**매개변수**
없음

**반환 값**
- **status** - *String* - 노드 상태입니다.
    "node server status is running" - 노드가 실행 중입니다.
    "node server is updating" - 노드가 업데이트 중입니다.
    "node server is stopped" - 노드가 일시 중지되었습니다.

**예시**
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
현재 등록된 JSON-RPC 인터페이스를 가져옵니다.

**매개변수**
없음

**반환 값**
- *Array* - JSON-RPC 인터페이스 배열입니다.

**예시**
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
JSON-RPC 네임스페이스 서비스 변경을 위해 사용할 수 있습니다.

**매개 변수**
**methods** - *String* - JSON-RPC 모듈, 기본값: "ibax,net"입니다.

**반환 값**
- *bool* - 진행 상태입니다.

**예시**
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
JSON-RPC 서비스를 종료합니다.

**매개변수**
없음

**반환 값**
- *bool* - 진행 상태입니다.

**예시**
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
노드의 비활성 상태를 가져옵니다.

**매개변수**
없음

**반환 값**

- **node_position** - *Number* - 노드 인덱스.

- **status** - *Bool* - 비활성 상태, `true`는 금지 상태를 의미하며, `false`는 비활성화되지 않음을 의미합니다.

**예시**
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
현재 노드의 메모리 사용 상황을 가져옵니다.

**매개변수**
없음

**반환 값**

- **alloc** - *Number* - 사용 중인 바이트 수입니다.

- **sys** - *Number* - 시스템에서 가져온 바이트 수입니다.

**예시**
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

