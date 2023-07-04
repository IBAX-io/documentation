# RESTful API v2 {#restful-api-v2}

Weaver IBAX 블록체인 플랫폼의 REST API를 통해 인증, 생태계 데이터 수신, 오류 처리, 데이터베이스 테이블 조작, 페이지 및 컨트랙트 실행을 포함한 모든 기능을 제공합니다.

REST API를 사용하면 Weaver를 사용하지 않고도 플랫폼의 모든 기능에 액세스할 수 있습니다.

API 명령 호출은 `/api/v2/command/[param]`로 주소 지정을 통해 실행됩니다. 여기서 `command`는 명령어 이름이고 `param`은 추가 매개변수입니다. 요청 매개변수는 `Content-Type: x-www-form-urlencoded` 형식으로 지정되어야 합니다. 서버 응답 결과는 JSON 형식으로 반환됩니다.

<!-- TOC -->

- [오류 응답 처리](#error-response-handling)
    - [오류 목록](#error-list)
- [요청 유형](#request-type)
- [인증 인터페이스](#authentication-interface)
    - [getuid](#getuid)
    - [login](#login)
- [서버 측 명령 인터페이스](#server-side-command-interface)
    - [version](#version)
- [데이터 요청 기능 인터페이스](#data-request-function-interface)
    - [balance](#balance)
    - [blocks](#blocks)
    - [detailed_blocks](#detailed-blocks)
    - [/data/{id}/data/{hash}](#data-id-data-hash)
    - [/data/{table}/id/{column}/{hash}](#data-table-id-column-hash)
    - [keyinfo](#keyinfo)
    - [walletHistory](#wallethistory)
    - [listWhere/{name}](#listwhere-name)
    - [nodelistWhere/{name}](#nodelistwhere-name)
- [메트릭스 인터페이스](#get-metrics-interface)
    - [metrics/keys](#metrics-keys)
    - [metrics/blocks](#metrics-blocks)
    - [metrics/transactions](#metrics-transactions)
    - [metrics/ecosystems](#metrics-ecosystems)
    - [metrics/honornodes](#metrics-honornodes)
- [생태계 인터페이스](#ecosystem-interface)
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

## 오류 응답 처리 {#error-response-handling}

요청이 성공적으로 실행된 경우 반환 상태
`200`. 오류가 발생한 경우 오류 상태 외에도 다음 필드를 가진 JSON 객체가 반환됩니다.

- **error**

    > 오류 식별자.

- **msg**

    > 오류 텍스트 메시지.

- **params**

    > 오류 메시지에 추가로 추가될 수 있는 추가 매개 변수의 배열.

#### 응답 예제

``` text
400 (Bad 요청 예시)
Content-Type: application/json
{
    "err": "E_INVALIDWALLET",
    "msg": "Wallet 1234-5678-9012-3444-3488 is not valid",
    "params": ["1234-5678-9012-3444-3488"]
}
```

### 오류 목록 {#error-list}

> E_CONTRACT
 
  `%s` 계약이 존재하지 않습니다.

> E_DBNIL

    데이터베이스가 비어 있습니다.

> E_DELETEDKEY

    계정 주소가 동결되었습니다.

> E_ECOSYSTEM

    생태계 `%d`가 존재하지 않습니다.

> E_EMPTYPUBLIC

    잘못된 계정 공개 키입니다.

> E_KEYNOTFOUND

    계정 주소를 찾을 수 없습니다.

> E_HASHWRONG

    잘못된 해시입니다.

> E_HASHNOTFOUND

    해시를 찾을 수 없습니다.

> E_HEAVYPAGE

    페이지 로딩이 너무 많습니다.

> E_INVALIDWALLET

    지갑 주소 `%s`가 잘못되었습니다.

> E_LIMITTXSIZE

    트랜잭션 크기가 제한을 초과했습니다.

> E_NOTFOUND

    페이지 또는 메뉴 내용을 찾을 수 없습니다.

> E_PARAMNOTFOUND

    매개 변수를 찾을 수 없습니다.

> E_PERMISSION

    권한이 없습니다.

> E_QUERY

    데이터베이스 쿼리 오류입니다.

> E_RECOVERED

    API 패닉 오류가 발생했습니다.

    패닉 오류가 발생하면 오류가 반환됩니다.

    이 오류는 버그를 발견하고 수정해야 함을 의미합니다.

> E_SERVER

    서버 오류입니다.

    golang 라이브러리 함수에 오류가 있는 경우 반환됩니다. \*msg\* 필드에는 오류 텍스트 메시지가 포함됩니다.

    **E_SERVER**는 어떤 명령의 오류로 인해 발생할 수 있습니다. 
    입력 매개 변수가 잘못된 경우 관련 오류로 변경할 수 있습니다. 다른 경우에는 이 오류는 잘못된 작업이나 올바르지 않은 시스템 구성을 나타내며, 자세한 조사 보고서가 필요합니다.

> E_SIGNATURE

    잘못된 서명입니다.

> E_STATELOGIN

    `%s`은(는) 생태계 `%s`의 구성원이 아닙니다.

> E_TABLENOTFOUND

    데이터 시트 `%s`을(를) 찾을 수 없습니다.

> E_TOKENEXPIRED

    세션이 만료되었습니다 `%s`

> E_UNAUTHORIZED

    인증되지 않음.

    로그인이 수행되지 않았거나 세션이 만료된 경우, 
    **getuid, login**을 제외한 모든 명령은 **E_UNAUTHORIZED** 오류를 반환합니다.

> E_UNKNOWNUID

    알 수 없는 UID입니다.

> E_UPDATING

    노드가 블록체인을 업데이트 중입니다.

> E_STOPPING

    노드가 중지되었습니다.

> E_NOTIMPLEMENTED

    아직 구현되지 않았습니다.

> E_BANNED

    이 계정 주소는 `%s`에서 금지되었습니다.

> E_CHECKROLE

    액세스가 거부되었습니다.

    CLB 사용 불가 인터페이스

------------------------------------------------------------------------

> CLB 노드를 사용할 수 없는 인터페이스 요청.

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

## 청 유형 {#request-type}

**균일한 사용** 
- application/x-www-form-urlencoded

## 인증 인터페이스 {#authentication-interface}

[JWT 토큰](https://jwt.io)
인증에 사용됩니다. JWT 토큰은 수신된 후 각 요청 헤더에 배치되어야 합니다: `Authorization: Bearer TOKEN_HERE`.

### getuid {#getuid}

**GET**/은 고유한 값을 반환하고 개인 키로 서명한 다음
[login](#login) 명령은 이를 서버로 다시 보냅니다.

**login**을 호출할 때 **Authorization**에 전달해야 하는 임시 JWT 토큰을 생성합니다.

#### 요청 예시

``` text
GET
/api/v2/getuid
```

#### 응답

- *uid*

    > 서명 번호입니다.

- *token*

    > 로그인 중 전달된 임시 토큰입니다.
    >
    > 임시 토큰의 수명은 5초입니다.

- *network_id*

    > 서버 식별자입니다.

- *cryptoer*

    > 타원 곡선 알고리즘입니다.

- *hasher*

    > 해시 알고리즘입니다.

#### 응답 예시 1

``` text
200 (OK)
Content-Type: application/json
{
    "uid": "4999317241855959593",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....... .I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE"
    "network_id": "4717243765193692211"
}
```

다음은 인증이 필요하지 않은 경우 (요청에 **Authorization**이 포함되지 않은 경우) 반환되는 메시지입니다:

- *expire*

    > 만료 시간입니다.

- *ecosystem*

    > 생태계 ID입니다.

- *key_id*

    > 계정 주소입니다.

- *address*

    > 지갑 주소 `XXXX-XXXX-.....-XXXX`입니다.

- *network_id*

    > 서버 식별자입니다.

#### 응답 예시 2

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

#### 에러 응답

*E_SERVER*

### login {#login}

**POST**/ 사용자 인증.

> 고유한 값을 받고 그것을 서명하기 위해 **getuid**를 호출해야 합니다.
> 요청 헤더에 getuid의 임시 JWT 토큰을 전달해야 합니다.
>
> 요청이 성공하면 응답으로 받은 토큰이 **Authorization**에 포함됩니다.

#### 요청 예시

``` text
POST
/api/v2/login
```
- *\[ecosystem\]*

    > 생태계 ID.
    >
    > 지정되지 않으면 첫 번째 생태계 ID로 기본 설정됩니다.

- *\[expire\]*

    > JWT 토큰의 수명, 초 단위, 기본값은 28800입니다.

- *\[pubkey\]*

    > 16진수 계정 공개 키.

- *\[key_id\]*

    > 계정 주소 `XXXX-... -XXXX`.
    >
    > 공개 키가 이미 블록체인에 저장된 경우 이 매개변수를 사용합니다. *pubkey* 매개변수와 함께 사용할 수 없습니다.

- *signature*

    > getuid를 통해 받은 uid 서명.

#### 응답

- *token*

    > JWT 토큰.

- *ecosystem_id*

    > 생태계 ID.

- *key_id*

    > 계정 주소 ID.

- *account*

    > 월렛 주소 `XXXX-XXXX-..... -XXXX`.

- *notify_key*

    > 알림 ID.

- *isnode*

    > 계정 주소가 노드 소유자인지 여부. 값: `true,false`.

- *isowner*

    > 계정 주소가 생태계 생성자인지 여부. 값: `true,false`.

- *clb*

    > 로그인한 생태계가 CLB인지 여부. 값: `true,false`.

- *roles* [Omitempty](#omitempty)

    > 역할 목록: `[{Role ID,Role Name}]`.

#### 응답 예시

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

#### 에러 응답

*E_SERVER, E_UNKNOWNUID, E_SIGNATURE, E_STATELOGIN, E_EMPTYPUBLIC*

## 서버 측 명령 인터페이스 {#server-side-command-interface}

### 버전 {#version}

**GET**/ 현재 서버 버전을 반환합니다.

이 요청은 로그인 인증을 필요로하지 않습니다.

#### 요청 예시

``` text
GET
/api/v2/version
```

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
"1.3.0 branch.main commit.790..757 time.2021-08-23-08:20:19(UTC)"
```

## 데이터 요청 기능 인터페이스 {#data-request-function-interface}

### balance {#balance}

**GET**/ 현재 생태계의 계정 주소의 잔액을 요청합니다.

이 요청은 로그인 인증을 필요로하지 않습니다.

#### 요청 예시

``` text
GET
/api/v2/balance/{wallet}
```

- *wallet*

    > 주소 식별자로, `int64, uint64, XXXX-...-XXXX`와 같은 형식으로 지정할 수 있습니다. 사용자가 현재 로그인한 생태계에서 주소를 조회합니다.

- *\[ecosystem\]* [Omitempty](#omitempty) Default eco1

    > 생태계 ID.

#### 응답

- *amount*

    > 계약 계정 잔액의 최소 단위입니다.

- *money*

    > 계정 잔액입니다.

- *total*

    > 계정 잔액입니다.

- *utxo*

    > UTXO 계정 잔액입니다.

#### 응답 예시

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

#### 에러 응답

*E_SERVER, E_INVALIDWALLET*

### blocks {#blocks}

**GET**/ 각 블록의 트랜잭션에 관련된 추가 정보를 포함하는 목록을 반환합니다.

이 요청은 로그인 인증이 필요하지 않습니다.

#### 요청 예시

``` text
GET 
/api/v2/blocks
```
- *block_id* [Omitempty](#omitempty) 기본값은 0입니다.

    > 조회할 시작 블록의 높이입니다.

- *count* [Omitempty](#omitempty) (기본값은 25이며, 최대 요청 수는 1000입니다.)

    > 블록의 개수입니다.

#### 응답

- 블록 높이

    > 블록 내의 트랜잭션 목록과 각 트랜잭션에 대한 추가 정보입니다.
    >
    > > - *hash*
    > >
    > > > 거래 해시입니다.
    > >
    > > - *contract_name*
    > >
    > > > 컨트랙트 이름입니다.
    > >
    > > - *params*
    > >
    > > > 컨트랙트 매개변수의 배열입니다.
    > >
    > > - *key_id*
    > >
    > > > 첫 번째 블록의 경우 트랜잭션을 서명한 첫 번째 블록의 계정 주소입니다.
    > >
    > > > 다른 모든 블록의 경우 트랜잭션을 서명한 계정의 주소입니다.

#### 응답 예시

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

#### 에러 응답

*E_SERVER, E_NOTFOUND*

### detailed_blocks {#detailed-blocks}

**GET**/ 각 블록의 트랜잭션에 대한 상세한 추가 정보가 포함된 목록을 반환합니다.

이 요청은 로그인 인증이 필요하지 않습니다.

#### 요청 예시

``` text
GET
/api/v2/detailed_blocks
```

**GET**/ 각 블록의 트랜잭션에 대한 상세한 추가 정보가 포함된 목록을 반환합니다.

이 요청은 로그인 인증이 필요하지 않습니다.

- *block_id* [Omitempty](#omitempty) 기본값은 0

  > 조회할 시작 블록의 높이입니다.

- *count* [Omitempty](#omitempty) (기본값은 25, 최대 요청은 1000)

  > 블록 수입니다.

#### 응답

- 블록 높이

    > - *blockhead*
    >
    > > 블록 헤더에는 다음 필드가 포함됩니다.
    > >
    > > > - *block_id*
    > >
    > > > > 블록 높이입니다.
    > >
    > > > - *time*
    > >
    > > > > 블록 생성 타임스탬프입니다.
    > >
    > > > - *key_id*
    > >
    > > > > 트랜잭션에 서명한 블록의 계정 주소입니다.
    > >
    > > > - *node_position*
    > >
    > > > > 블록을 생성한 노드의 위치입니다. (honor node 목록 내)
    > >
    > > > - *version*
    > >
    > > > > 블록 구조 버전입니다.
    >
    > - *hash*
    >
    > > 블록 해시입니다.
    >
    > - *node_position*
    >
    > > 블록을 생성한 노드의 위치입니다.
    >
    > - *key_id*
    >
    > > 블록에 서명한 계정의 주소입니다.
    >
    > - *time*
    >
    > > 블록 생성 타임스탬프입니다.
    >
    > - *tx_count*
    >
    > > 블록 내의 트랜잭션 수입니다.
    >
    > - *size*
    >
    > > 블록 크기입니다.
    >
    > - *rollback_hash*
    >
    > > 블록 롤백 해시입니다.
    >
    > - *merkle_root*
    >
    > > 블록에서 사용되는 Merkle 트리입니다.
    >
    > - *bin_data*
    >
    > > 블록 헤더, 블록 내의 모든 트랜잭션, 이전 블록 해시, 블록을 생성한 노드의 개인 키의 직렬화입니다.
    >
    > - *trading*
    >
    > > 블록 내의 트랜잭션 목록과 각 트랜잭션에 대한 추가 정보입니다.
    > >
    > > > - *hash*
    > >
    > > > > 트랜잭션 해시입니다.
    > >
    > > > - *contract_name*
    > >
    > > > > 계약 이름입니다.
    > >
    > > > - *params*
    > >
    > > 계약 매개변수입니다.
    > >
    > > > - *key_id*
    > >
    > > > > 이 트랜잭션에 대한 계정 주소에 서명합니다.
    > >
    > > > - *time*
    > >
    > > > > 트랜잭션 생성 타임스탬프입니다.
    > >
    > > > - *type*
    > >
    > > > > 트랜잭션 유형입니다.
    > >
    > > > - *size*
    > >
    > > > > 거래 크기입니다.

#### 응답 예시

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

#### 에러 응답

*E_SERVER, E_NOTFOUND*

### /data/{id}/data/{hash}  {#data-id-data-hash}

**GET**/ 지정된 해시가 이진 시계, 필드 및 레코드의 데이터와 일치하는 경우, 이 요청은 데이터를 반환합니다. 그렇지 않은 경우, 오류가 반환됩니다.

이 요청은 로그인 인증을 필요로하지 않습니다.

#### 요청 예시

```text
GET
/data/{id}/data/{hash}
```
- *id*

    > 레코드 ID.

- *hash*

    > 요청 데이터의 해시.

#### 응답

> 이진 데이터

#### 응답 예시

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

#### 에러 응답

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### /data/{table}/id/{column}/{hash} {#data-table-id-column-hash}

**GET**/ 지정된 테이블, 필드 및 레코드의 데이터와 지정된 해시가 일치하는 경우, 요청에 대한 데이터가 반환됩니다. 그렇지 않으면 오류가 반환됩니다.

이 요청은 로그인 인증을 필요로하지 않습니다.

#### 요청 예시

```text
GET
/data/{table}/id/{column}/{hash}
```
- *table*

    > 데이터 테이블 이름.

- *id*

    > 레코드 ID.

- *column*

    > 데이터 테이블 이름, 하나만 가능합니다.

- *hash*

    > 요청 데이터의 해시.

#### 응답

> 바이너리 데이터

#### 응답 예시

``` text
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

#### 에러 응답

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### keyinfo {#keyinfo}

**GET**/ 지정된 주소를 등록한 역할이 포함된 생태계 목록으로 돌아갑니다.

요청에 로그인 인증이 필요하지 않습니다.

#### 요청 예시

```text
GET
/api/v2/keyinfo/{address}
```

- *address*

    > 주소 식별자입니다. `int64, uint64, xxxx -...-xxxx`와 같은 형식으로 지정할 수 있습니다.
    >
    > 이 요청은 모든 생태계에서 쿼리됩니다.

#### 응답

- *ecosystem*

    > 생태계 ID.

- *name*

    > 생태계 이름.

- *roles*

    > *id*와 *name* 필드를 가진 활동들.

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Governancer"},{"id":"2","name":"Developer"}]
}]
```

#### 에러 응답

*E_SERVER, E_INVALIDWALLET*

### walletHistory {#wallethistory}

**GET**/ 현재 계정의 거래 내역 기록을 반환하며, ID에 따라 해당 내역을 찾습니다.

[권한 부여](#authorization)

#### 요청

- *searchType*

  > 찾을 유형 (Income: 수입, Outcome: 지출, All: 전체, 기본값).

- *\[page\]* [Omitempty](#omitempty)

  > 페이지 번호, 기본값은 첫 번째 페이지, 최소값: 1

- *\[limit\]* [Omitempty](#omitempty)

  > 표시할 거래 수, 기본값은 20개, 최소값: 1, 최대값: 500


``` text
GET
/api/v2/walletHistory?searchType=all&page=1&limit=10
```

#### 응답

- *total*

  > 항목의 총 개수.

- *page*

  현재 페이지 번호.

- *limit*

  > 한 번에 조회할 항목 수.

- *list*
  > 배열의 각 요소는 다음 매개변수를 포함합니다:
    - *id*
      > Stripe ID.
    - *sender_id*
      > 발송 key_id
    - *sender_add*
      > 발송 계정 주소
    - *recipient_id*
      > 수신 key_id
    - *recipient_add*
      > 수신 계정 주소
    - *amount*
      > 거래 금액
    - *comment*
      > 거래 비고
    - *block_id*
      > 블록 높이
    - *tx_hash*
      > 거래 해시
    - *created_at*
      > 거래 생성 시간, 밀리초 타임스탬프
    - *money*
      > 거래 금액


#### 응답 예시

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

#### 에러 응답

*E_SERVER*



### listWhere/{name} {#listwhere-name}

#### 요청 예시

**GET**/ 현재 생태계에서 지정된 데이터 테이블의 항목을 반환합니다. 반환할 열을 지정할 수 있습니다.

[인증](#authorization)

- *name*

  > 데이터 테이블 이름.

-   *\[limit\]* [Omitempty](#omitempty)

    > 한 페이지당 불러올 데이터 수, 기본값 25입니다.

-   *\[offset\]* [Omitempty](#omitempty)

    > 반환 시작 위치, 기본값은 0입니다.

-   *\[order\]* [Omitempty](#omitempty)

    > 정렬 방식, 기본값은 `id ASC`입니다.

-   *\[columns\]* [Omitempty](#omitempty)

    > 쉼표로 구분된 반환할 열의 목록입니다. 지정되지 않으면 모든 열을 반환합니다. 모든 경우에 `id` 열이 반환됩니다.

-   *\[where\]* [Omitempty](#omitempty)

    > 질의 조건
    >
    > 예시: id> 2 및 name = john을 조회하려면
    >
    > 다음을 사용할 수 있습니다: where: {"id": {"$ gt": 2}, "name": {"$eq": "john"}}
    >
    > 자세한 내용은 [DBFind](../topics/script.md#dbfind) Where 구문을 참조하세요.

``` text
GET
/api/v2/listWhere/mytable
```

#### 응답

- *count*

  > 항목의 총 개수.
  
- *list*
  
  > 배열의 각 요소는 다음 매개변수를 포함합니다:
  
  - *id*
  
    > Stripe ID
  
  - *...*
  
    > 데이터 테이블의 다른 열

#### 응답 예시

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

#### 에러 응답

*E_SERVER*,*E_TABLENOTFOUND*


###  nodelistWhere/{name} {#nodelistwhere-name}

**GET**/특정 데이터 테이블로 돌아갑니다. 반환할 열을 지정할 수 있습니다. 데이터 테이블의 유형은 **BYTEA**이며, 16진수 인코딩 처리를 합니다.

[인증](#authorization)

#### 요청

- *name*

  > 데이터 테이블 이름.

-   *\[limit\]* [Omitempty](#omitempty)

    > 크레딧 번호, 기본값은 25입니다.

-   *\[offset\]* [Omitempty](#omitempty)

    > 처분, 기본값은 0입니다.

-   *\[order\]* [Omitempty](#omitempty)

    > 정렬 방법, 기본 `id ASC`.

-   *\[columns\]* [Omitempty](#omitempty)

    > 요청 열 목록은 쉼표로 구분됩니다. 지정하지 않으면 모든 열이 반환됩니다. 모든 경우에 `id` 열이 반환됩니다.

-   *\[where\]* [Omitempty](#omitempty)

    > 쿼리 조건
    >
    > 예: id> 2 및 name = john을 조회하려면
    >
    > 다음과 같이 사용할 수 있습니다 : where: {"id": {"$gt": 2}, "name": {"$eq": "john"}}
    >
    > 자세한 내용은 [DBFind](../ topics/script.md#dbfind) where 구문을 참조하십시오.

``` text
GET
/api/v2/nodelistWhere/mytable
```

#### 응답

- *count*

  > 엔트리의 총 개수.
  
- *list*
  
  > 배열의 각 요소에는 다음 매개변수가 포함됩니다:
  
    - *id*
    
      > Stripe ID.

    - *...*
    
      > 데이터 테이블의 다른 열.

#### 응답 예시

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

#### 에러 응답

*E_SERVER*,*E_TABLENOTFOUND*



## 메트릭 인터페이스 가져오기 {#get-metrics-interface}

### metrics/keys {#metrics-keys}

**GET**/ 생태계 1 계정 주소의 수를 반환합니다.

#### 요청 예시

``` text
GET
/api/v2/metrics/keys
```

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/blocks {#metrics-blocks}

**GET**/ 블록 수를 반환합니다.

#### 요청 예시

``` text
GET
/api/v2/metrics/blocks
```

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/transactions {#metrics-transactions}

**GET**/ 총 트랜잭션 수를 반환합니다.

#### 요청 예시

``` text
GET
/api/v2/metrics/transactions
```

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/ecosystems {#metrics-ecosystems}

**GET**/ 생태계의 수를 반환합니다.

#### 요청 예시

``` text
GET
/api/v2/metrics/ecosystems
```

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/honornodes {#metrics-honornodes}

**GET**/ 명예 노드 수를 반환합니다.

이 요청에는 로그인 인증이 필요하지 않습니다.

``` 
GET
/api/v2/metrics/honornodes
```

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

## 생태계 인터페이스 {#ecosystem-interface}

### ecosystemname {#ecosystemname}

**GET**/ 식별자로 생태계의 이름을 반환합니다.

이 요청에는 로그인 인증이 필요하지 않습니다.

``` text
GET
/api/v2/ecosystemname?id=1
```

- *id*

    > 생태계 ID.

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "ecosystem_name": "platform_ecosystem"
}
```

#### 에러 응답

*E_PARAMNOTFOUND*

### appparams/{appid} {#appparams-appid}

[권한 부여](#authorization)

**GET**/ 현재 또는 지정된 생태계의 애플리케이션 매개변수 목록을 반환합니다.

#### 요청 예시

``` text
GET
/api/v2/appparams/{appid}
```
- *\[appid\]*

    > 애플리케이션 ID.

- *\[ecosystem\]*

    > 생태계 ID; 지정되지 않은 경우 현재 생태계 매개변수가 반환됩니다.

- *\[names\]*

    > 수신된 매개변수의 목록입니다.
    >
    > 쉼표로 구분된 매개변수 이름의 목록을 지정할 수 있습니다. 예: `/api/v2/appparams/1?names=name,mypar`.

#### 응답

- *list*

    > 배열의 각 요소는 다음 매개변수를 포함합니다.
    >
    > - *name*, 매개변수의 이름입니다.
    > - *value*, 매개변수의 값입니다.
    > - *conditions*, 매개변수의 권한을 변경합니다.

#### 응답 예시

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

#### 에러 응답

*E_ECOSYSTEM*

### appparam/{appid}/{name} {#appparam-appid-name}

[권한 부여](#authorization)

**GET**/ 현재 또는 지정된 생태계에서 애플리케이션 **{name}**의 **{appid}** 매개변수를 반환합니다.
다음과 관련된 정보:

#### 요청 예시

``` text
GET
/api/v2/appparam/{appid}/{name}[?ecosystem=1]
```

- *appid*

    > 애플리케이션 ID입니다.

- *name*

    > 요청한 매개변수의 이름입니다.

- *\[ecosystem\]* [Omitempty](#omitempty)

    > 에코시스템 ID (선택적 매개변수)입니다.
    >
    > 기본값으로 현재 에코시스템을 반환합니다.

#### 응답

- *id*

    > 매개변수 ID입니다.

- *name*

    > 매개변수 이름입니다.

- *value*

    > 매개변수 값입니다.

- *conditions*

    > 매개변수 변경 권한입니다.

#### 응답 예시

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

#### 에러 응답

*E_ECOSYSTEM, E_PARAMNOTFOUND*

### ecosystemparams {#ecosystemparams}

[권한 부여](#authorization)

**GET**/ 생태계 매개변수 목록을 반환합니다.

#### 요청 예시

``` text
GET
/api/v2/ecosystemparams/[?ecosystem=... &names=...]
```

- *\[ecosystem\]* [Omitempty](#omitempty)

    > 에코시스템 ID입니다. 지정하지 않으면 현재 에코시스템 ID가 반환됩니다.

- *\[names\]* [Omitempty](#omitempty)

    > 쉼표로 구분된 요청 매개변수의 목록입니다.
    >
    > 예시: `/api/v2/ecosystemparams/?names=name,currency,logo`.

#### 응답

- *list*

    > 배열의 각 요소는 다음과 같은 매개변수를 포함합니다.
    >
    > - *name*
    >
    > > 매개변수 이름입니다.
    >
    > - *value*
    >
    > > 매개변수 값입니다.
    >
    > - *conditions*
    >
    > > 매개변수 변경 권한입니다.

#### 응답 예시

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

#### 에러 응답

*E_ECOSYSTEM*

### ecosystemparam/{name} {#ecosystemparam-name}

[권한 부여](#authorization)

**GET**/ 현재 또는 지정된 생태계에서 **{name}** 매개변수에 대한 정보를 반환합니다.

#### 요청 예시

``` text
GET
/api/v2/ecosystemparam/{name}[?ecosystem=1]
```

- *name*

    > 요청된 매개변수의 이름입니다.

- *\[ecosystem\]* [Omitempty](#omitempty)

    > 기본값은 현재 에코시스템 ID를 반환합니다.

#### 응답

- *name*

    > 매개변수 이름입니다.

- *value*

    > 매개변수 값입니다.

- *conditions*

    > 매개변수 변경 권한입니다.

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
} 
```

#### 에러 응답

*E_ECOSYSTEM*

### tables/\[?limit=\... &offset=\... \] {#tables-limit-offset}

[권한 부여](#authorization)

**GET**/ 현재 에코시스템의 데이터 테이블 목록을 반환합니다. 오프셋과 항목 수를 설정할 수 있습니다.

#### 요청

- *\[limit\]* [Omitempty](#omitempty)

    > 항목 수, 기본값은 100이며, 최대 1000입니다.

- *\[offset\]* [Omitempty](#omitempty)

    > 오프셋, 기본값은 0입니다.

``` text
GET
/api/v2/tables?limit=... &offset=...
```

#### 응답

- *count*

    > 데이터 테이블에 있는 항목의 총 수.

- *list*

    > 배열의 각 요소는 다음과 같은 매개변수를 포함합니다.
    >
    > > - *name*
    > >
    > > > 접두사를 제외한 데이터 테이블의 이름입니다.
    > >
    > > - *count*
    > >
    > > > 데이터 테이블에 있는 항목 수입니다.

#### 응답 예시

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

### table/{name} {#table-name}

[권한 부여](#authorization)

**GET**/ 현재 생태계 요청 데이터 테이블에 대한 정보를 반환합니다.

#### 요청

- *\[name\]*

    > 데이터 테이블 이름입니다.

``` text
GET
/api/v2/table/{table_name}
```
다음과 같은 필드 정보를 반환합니다.

- *name*

    > 데이터 테이블 이름입니다.

- *insert*

    > 새 항목을 추가할 권한입니다.

- *new_column*

    > 필드를 추가할 권한입니다.

- *update*

    > 항목을 변경할 권한입니다.

- *columns*

    > 필드에 관련된 정보의 배열입니다.
    >
    > > - *name*
    > >
    > > > 필드 이름입니다.
    > >
    > > - *type*
    > >
    > > > 필드 데이터 유형입니다.
    > >
    > > - *perm*
    > >
    > > > 필드 값의 변경 권한입니다.

### list/{name}\[?limit=\... &offset=\... &columns=\... \] {#list-name-limit-offset-columns}

[권한 부여](#authorization)

**GET**/ 현재 생태계에서 지정된 데이터 테이블 항목의 목록을 반환합니다. 오프셋과 항목 수를 설정할 수 있습니다.

#### 요청

- *name*

    > 데이터 테이블 이름입니다.

- *\[limit\]* [Omitempty](#omitempty)

    > 항목 수입니다. 기본값은 25개 항목입니다.

- *\[offset\]* [Omitempty](#omitempty)

    > 오프셋입니다. 기본값은 0입니다.

- *\[columns\]* [Omitempty](#omitempty)

    > 요청한 열의 쉼표로 구분된 목록입니다. 지정되지 않은 경우 모든 열이 반환됩니다. id 열은 모든 경우에 반환됩니다.

``` text
GET
/api/v2/list/mytable?columns=name
```

#### 응답

- *count*

    > 항목의 총 개수입니다.

- *list*

    > 배열의 각 요소는 다음 매개변수를 포함합니다.
    >
    > > - *id*
    > >
    > > > 항목 ID입니다.
    > >
    > > - 요청 열의 순서입니다.

#### 응답 예시

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

[권한 부여](#authorization)

**GET**/ 현재 생태계의 *sections*를 반환합니다. 테이블 항목의 목록을 가져올 수 있으며, 오프셋과 항목의 개수를 설정할 수 있습니다.

*role_access* 필드에는 역할 목록이 포함되어 있고 현재 역할이 포함되지 않은 경우 레코드가 반환되지 않습니다.

*title* 필드의 데이터는 요청 헤더의 *Accept-Language* 언어 리소스로 대체됩니다.

#### 요청 예시

- *\[limit\]* [Omitempty](#omitempty)

    > 항목의 개수, 기본값은 25개입니다.

- *\[offset\]* [Omitempty](#omitempty)

    > O오프셋, 기본값은 0입니다.

- *\[lang\]* [Omitempty](#omitempty)

    > 이 필드는 다국어 리소스 코드 또는 로캘을 지정합니다. 예를 들어 en, kr입니다. 지정된 다국어 리소스를 찾을 수 없는 경우, 예를 들어 en-US인 경우 en으로 다국어 리소스 그룹에서 검색합니다.
    *en* 에서 검색하세요.


``` text
GET
/api/v2/sections
```

#### 응답

- *count*

    > *sections* 테이블 항목의 총 개수.

- *list*

    > 배열의 각 요소에는 actions 테이블의 모든 열에 대한 정보가 포함됩니다.


#### 응답 예시

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

#### 에러 응답

*E_TABLENOTFOUND*

### row/{name}/{id}\[?columns=\] {#row-name-id-columns}

[권한 부여](#authorization)

**GET**/ 현재 생태계에서 지정된 데이터 테이블의 항목을 반환합니다. 반환할 열을 지정할 수 있습니다.

#### 요청

- *name*

    > 데이터 테이블 이름.

- *id*

    > 항목 ID.

- *\[columns\]* [Omitempty](#omitempty)

    > 요청된 열의 쉼표로 구분된 목록입니다. 지정하지 않은 경우 모든 열이 반환됩니다. id 열은 모든 경우에 반환됩니다.

``` text
GET
/api/v2/row/mytable/10?columns=name
```

#### 응답

- *value*

    > 받은 열 값의 배열
    >
    > > - *id*
    > >
    > > > 엔트리 ID.
    > >
    > > - 요청된 열의 순서.

#### 응답 예시

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

#### 에러 응답

*E_NOTFOUND*

### row/{name}/{column}/{id} {#row-name-colorn-id}

[Authorization] (#authorization)

**GET**/ 현재 생태계에서 지정된 데이터 테이블의 항목을 반환합니다. 반환할 열을 지정할 수 있습니다.

#### 요청

- *Name*

     > 데이터 테이블 이름.

- *colorn*

     > 데이터 목록 이름.

- *ID*

     > 스트라이프 ID.

- *\[columns\]* [Omitempty](#omitempty)

     > 쉼표로 구분된 요청 열의 목록입니다. 지정하지 않으면 모든 열이 반환됩니다. ID 열은 모든 경우에 반환됩니다.

`` `default
GET
/api/v2/row/mytable/name/John?columns=name
```

#### 응답

- *Value*

     > 수신한 열 값의 배열
     >
     > > - *ID*
     > >
     > > > 스트립 ID.
     > >
     > > - 요청 열의 순서.

#### 응답 예시

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

#### 에러 응답

*E_NOTFOUND*

### systemparams {#systemparams}

[권한 부여](#authorization)

**GET**/ 플랫폼 매개변수 목록을 반환합니다.

#### 요청 예시

``` text
GET
/api/v2/systemparams/[?names=...]
```
- *\[names\]* [Omitempty](#omitempty)

    쉼표로 구분된 요청 매개변수의 목록입니다. 예를 들어 `/api/v2/systemparams/?names=max_columns,max_indexes`입니다.

#### 응답

- *list*

    > 배열의 각 요소는 다음 매개변수를 포함합니다.
    >
    > > - *name*
    > >
    > > > 매개변수 이름입니다.
    > >
    > > - *value*
    > >
    > > > 매개변수 값입니다.
    > >
    > > - *conditions*
    > >
    > > > 매개변수의 권한을 변경합니다.

#### 응답 예시

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

#### 에러 응답

*E_PARAMNOTFOUND*

### history/{name}/{id} {#history-name-id}

[권한 부여](#authorization)

**GET**/ 현재 생태계에서 지정된 데이터 테이블의 항목에 대한 변경 기록을 반환합니다.

#### 요청 예시

``` text
GET
/api/v2/history?name=contracts&id=5
```
> - *name*
>
>     데이터 테이블 이름입니다.
>
> - *id*
>
>     엔트리 ID입니다.

#### 응답

> - *list*
>
>     배열의 각 요소는 요청된 엔트리의 변경 기록을 포함합니다.

#### 응답 예시

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

[권한 부여](#authorization)

**GET**/ 지정된 데이터 테이블(페이지, 메뉴 또는 스니펫)의 현재 생태계를 반환합니다. *이름*
필드에 대한 항목입니다.

``` text
GET
/api/v2/interface/page/default_page
/api/v2/interface/menu/default_menu
/api/v2/interface/snippet/welcome
```

#### 요청 예시

- *name*

    > 테이블의 항목 이름을 지정합니다.

#### 응답

- *id*

    > 항목 ID입니다.

- *name*

    > 항목 이름입니다.

- *other*

    > 테이블의 다른 열들입니다.

#### 응답 예시

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

#### 에러 응답

*E_QUERY*, *E_NOTFOUND*

## 계약 함수 인터페이스 {#contract-function-interface}

### contracts\[?limit=\... &offset=\... \] {#contracts-limit-offset}

[권한 부여](#authorization)

**GET**/ 오프셋 및 항목 수를 설정할 수 있는 기능과 함께 현재 생태계의 계약 목록을 반환합니다.

#### 요청 예시

- *\[limit\]* [Omitempty](#omitempty)

    > 항목 개수입니다. 기본값은 25개입니다.

- *\[offset\]* [Omitempty](#omitempty)

    > 오프셋입니다. 기본값은 0입니다.

``` text
GET
/api/v2/contracts
```

#### 응답

- *count*

    > 항목의 총 개수입니다.

- *list*

    > 배열의 각 요소는 다음과 같은 매개변수를 포함합니다.
    >
    > > - *id*
    > >
    > > > 계약 ID입니다.
    > >
    > > - *name*
    > >
    > > > 계약 이름입니다.
    > >
    > > - *value*
    > >
    > > > 계약 내용입니다.
    > >
    > > - *wallet_id*
    > >
    > > > 계약과 연결된 계정 주소입니다.
    > >
    > > - *address*
    > >
    > > > 계약과 연결된 지갑 주소 `XXXX-...-XXXX`입니다.
    > >
    > > - *ecosystem_id*
    > >
    > > > 계약이 속한 생태계 ID입니다.
    > >
    > > - *app_id*
    > >
    > > > 계약이 속한 애플리케이션 ID입니다.
    > >
    > > - *conditions*
    > >
    > > > 계약의 권한을 변경합니다.
    > >
    > > - *token_id*
    > >
    > > > 계약 수수료를 지불하는 데 사용되는 패스가 속한 생태계의 ID입니다.

#### 응답 예시

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

[권한 부여](#authorization)

**GET**/ 지정된 계약에 대한 정보를 반환합니다. 기본값은 현재 생태계에서 계약을 쿼리하는 것입니다.

#### 요청 예시

- *name*

    > 계약 이름.

``` text
GET
/api/v2/contract/mycontract
```

#### 응답

- *id*

    > VM에서의 계약 ID.

- *name*

    > 생태계 ID `@1MainCondition`와 함께 사용되는 계약 이름.

- *state*

    > 계약의 생태계 ID.

- *walletid*

    > 계약이 연결된 계정의 주소.

- *tokenid*

    > 계약 비용으로 사용되는 패스의 생태계 ID.

- *address*

    > 계약에 바인딩 된 지갑 주소 `XXXX-...-XXXX`.

- *tableid*

    > 계약이 위치한 *contracts* 테이블의 항목 ID.

- *fields*

    > 이 배열은 계약 **데이터** 섹션의 각 매개 변수의 구조 정보를 포함합니다.
    >
    > > - *name*
    > >
    > > > 매개 변수 이름입니다.
    > >
    > > - *type*
    > >
    > > > 매개 변수 유형입니다.
    > >
    > > - *optional*
    > >
    > > > 매개 변수 옵션입니다. \`true\`는 선택적 매개 변수를 의미하고, \`false\`는 필수 매개 변수를 의미합니다.

#### 응답 예시

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

#### 에러 응답

*E_CONTRACT*

### sendTX {#sendtx} 

[권한 부여](#authorization)

**POST**/
매개변수의 트랜잭션을 수신하고 트랜잭션 대기열에 추가하고 요청이 성공적으로 실행되면 트랜잭션 해시를 반환합니다. 이 해시는 블록 내에서 해당 트랜잭션을 생성하며 오류 응답의 경우 오류 텍스트 메시지에 포함됩니다.

#### 요청 예시

- *tx_key*

    > 거래 내용, 이 매개 변수는 임의의 이름을 지정할 수 있으며 여러 거래를 받을 수 있습니다.

``` text
POST
/api/v2/sendTx

Headers:
Content-Type: multipart/form-data

Parameters:
tx1 - Transaction 1
txN - Trading N
```

#### 응답

- *hashes*

    > 거래 해시 배열.
    >
    > > - *tx1*
    > >
    > > > 거래 1의 해시.
    > >
    > > - *txN*
    > >
    > > > 거래 N의 해시.

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "hashes": {
        "tx1": "67afbc435634..... ",
        "txN": "89ce4498eaf7..... ",
}
```

#### 에러 응답

*E_LIMITTXSIZE*,*E_BANNED*

### txstatus {#txstatus}

[권한 부여](#authorization)

**POST**/ 지정된 트랜잭션 해시에 대한 블록 ID와 오류 메시지를 반환합니다. 블록 ID와 오류 텍스트 메시지의 반환 값이 null이면 해당 트랜잭션이 아직 블록에 포함되지 않았습니다.

#### 요청 예시

- *data*

    > 트랜잭션 해시의 JSON 목록입니다.

``` text
{"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

``` text
POST
/api/v2/txstatus/
```

#### 응답

- *results*

    > 데이터 사전에서 트랜잭션 해시를 키로 사용하고 트랜잭션 세부 정보를 값으로 사용합니다.
    >
    > - *hash*
    >
    >     > 트랜잭션 해시.
    >     >
    >     > - *blockid*
    >     >
    >     >     > 트랜잭션 실행이 성공하면 블록 ID가 반환됩니다. 트랜잭션 실행이 실패하면 [0]{.title-ref}의 *blockid*가 반환됩니다.
    >     >
    >     > - *result*
    >     >
    >     >     > **\$result** 변수를 통해 트랜잭션 결과를 반환합니다.
    >     >
    >     > - *errmsg*
    >     >
    >     >     > 트랜잭션 실행이 실패하면 오류 텍스트 메시지를 반환합니다.

#### 응답 예시

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

#### 에러 응답

*E_HASHWRONG, E_HASHNOTFOUND*

### txinfo/{hash} {#txinfo-hash}

이 요청에는 로그인 인증이 필요하지 않습니다.

**얻다**/

블록 ID 및 확인 횟수를 포함하여 지정된 해시에 대한 트랜잭션에 대한 정보를 반환합니다. 선택적 매개변수가 지정된 경우 계약 이름 및 관련 매개변수도 반환합니다.

#### 요청 예시

- *hash*

    > 트랜잭션 해시.

- *\[contractinfo\]* [Omitempty](#omitempty)

    > 계약 세부 정보 매개 변수 식별자입니다. 이 트랜잭션과 관련된 계약 세부 정보를 얻으려면 `contractinfo=1`을 지정합니다.

``` text
GET
/api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1
```

#### 응답

- *blockid*

    > 값이 `0`인 경우 해당 해시에 대한 트랜잭션이 발견되지 않았습니다.

- *confirm*

    > 이 *blockid*에 대한 확인 수.

- *data* [Omitempty](#omitempty)

    > `contentinfo=1`이 지정된 경우 계약 세부 정보가 이 매개 변수로 반환됩니다.

#### 응답 예시

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

#### 에러 응답

*E_HASHWRONG*

### txinfoMultiple {#txinfomultiple}

이 요청에는 로그인 인증이 필요하지 않습니다.

**GET**/ 

지정된 해시에 대한 트랜잭션 관련 정보를 반환합니다.

#### 요청 예시

- *data*
    - *hashes*
        > 트랜잭션 해시의 목록입니다.

- *\[contractinfo\]* [Omitempty](#omitempty)

    > 계약 세부 정보와 관련된 계약 세부 정보 매개 변수 식별자입니다. 계약 세부 정보를 가져오려면 `contractinfo=1`을 지정합니다.

``` text
data: {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

``` text
GET
/api/v2/txinfoMultiple
```

#### 응답

- *results*

    > 트랜잭션 해시는 데이터 사전에서 키로 사용되며 트랜잭션 세부 정보는 값으로 사용됩니다.
    >
    > > *hash*
    > >
    > > > 거래 해시입니다.
    > >
    > > > *blockid*
    > >
    > > 값이 `0`이면 해당 해시에 대한 트랜잭션이 발견되지 않았습니다.
    > >
    > > > *confirm*
    > >
    > > > 이 블록 *blockid*에 대한 인정 횟수입니다.
    > >
    > > > *data*
    > >
    > > > `contentinfo=1`이 지정된 경우, 계약 세부 정보가 이 매개 변수로 반환됩니다.

#### 응답 예시

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

#### 에러 응답

*E_HASHWRONG*

### /page/validators_count/{name} {#page-validators-count-name}

이 요청에는 로그인 인증이 필요하지 않습니다.

**GET**/ 
지정된 페이지에 대해 확인할 노드 수를 반환합니다.

#### 요청

- *name*

    > 페이지 이름은 `@ecosystem_id%%page_name%` 형식으로 지정하며, 예를 들어 `@1main_page`입니다.
    > 생태계 ID가 없는 경우, 기본적으로 첫 번째 생태계 페이지에서 검색합니다.

``` text
GET
/api/v2/page/validators_count/@2page_name
```

#### 응답

- *validate_count*

    > 페이지에 대해 확인할 노드 수를 지정합니다.

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

#### 에러 응답

*E_NOTFOUND, E_SERVER*

### content/menu\|page/{name} {#content-menu-page-name}

[권한 부여](#authorization)

**POST**

템플릿 엔진에서 처리한 결과인 지정된 페이지 또는 메뉴 이름에 대한 코드 JSON 객체 트리를 반환합니다.

#### 요청 예시

- *name*

    > 페이지 이름 또는 메뉴 이름입니다. 형식은 `@ecosystem_id%%page_name%`이며 예를 들어 `@1main_page`입니다.
    > 생태계 ID가 포함되지 않은 경우 기본적으로 현재 생태계의 페이지 또는 메뉴를 검색합니다.

``` text
POST
/api/v2/content/page/default
```

#### 응답

- *menu* 또는 *title*

    > 요청 시 *content/page/\...* 해당 페이지가 속한 메뉴의 이름입니다.

- *menutree*

    > 요청 시 *content/page/\...* 페이지의 메뉴 JSON 객체 트리입니다.

- *title* -- *content/menu/\...*의 메뉴 *head*에 대한 제목입니다.

    > 요청 시 *content/menu/\...* 메뉴 제목입니다.

- *tree*

    > 페이지 또는 메뉴의 JSON 객체 트리입니다.

#### 응답 예시

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

#### 에러 응답

*E_NOTFOUND*

### content/source/{name} {#content-source-name}

[권한 부여](#authorization)

**POST**

지정된 페이지 이름에 대한 코딩된 JSON 개체의 트리를 반환합니다. 기능을 실행하거나 데이터를 수신하지 않습니다. 반환된 JSON 개체 트리는 페이지 템플릿에 해당하며 시각적 페이지 디자이너에서 사용할 수 있습니다. 페이지를 찾을 수 없으면 404 오류가 반환됩니다.
요구 """""""

- *name*

    > 페이지 이름입니다. 생태계 ID를 포함하여 `@ecosystem_id%%page_name%` 형식으로 지정합니다. 예를 들어, `@1main_page`입니다.
    > 생태계 ID가 포함되어 있지 않으면, 기본적으로 현재 페이지를 찾습니다.

#### 응답

``` text
POST
/api/v2/content/source/default
```

- *tree*

    > 페이지의 JSON 개체 트리입니다.

#### 응답 예시

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

#### 에러 응답

*E_NOTFOUND, E_SERVER*

### content/hash/{name} {#content-hash-name}

**POST** 

지정된 페이지 이름의 SHA256 해시를 반환하거나, 페이지를 찾을 수 없는 경우 404 오류를 반환합니다.

이 요청은 로그인 인증을 필요로하지 않습니다. 다른 노드에 요청을 보낼 때 올바른 해시를 받으려면
*ecosystem, keyID, roleID, isMobile*
매개변수도 전달해야합니다. 다른 생태계에서 페이지를 받으려면 페이지 이름 앞에 생태계 ID를 접두어로 사용해야합니다. 예를 들어: `@2mypage`.

#### 요청 예시


``` text
POST
/api/v2/content/hash/default
```

- *name*

    > 생태계 ID가 포함된 페이지 이름.

- *ecosystem*

    > 생태계 ID.

- *keyID*

    > 계정 주소.

- *roleID*

    > 역할 ID.

- *isMobile*

    > 모바일 플랫폼의 매개 변수 식별.

#### 응답

- *hash*

    > 16진수 해시.

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
} 
```

#### 에러 응답

*E_NOTFOUND, E_SERVER, E_HEAVYPAGE*

### content {#content}

**POST**

**template** 매개 변수에서 페이지 코드의 JSON 개체 수를 반환합니다. 선택적 매개 변수 **source**를 `true 또는 1`로 지정한 경우 이 JSON 개체 트리는 기능을 수행하지 않고 데이터를 수신하지 않습니다. 이 JSON 개체 트리는 시각적 페이지 디자이너에서 사용할 수 있습니다.

이 요청은 로그인 인증이 필요하지 않습니다.

#### 요청

- *template*

    > 페이지 코드입니다.

- *\[source\]*

    > `true 또는 1`로 지정한 경우 JSON 개체 트리는 기능을 수행하지 않고 데이터를 수신하지 않습니다.

``` text
POST
/api/v2/content
```

#### 응답

- *tree*

    > JSON 객체 트리.

#### 응답 예시

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

#### 에러 응답

*E_NOTFOUND, E_SERVER*

### maxblockid {#maxblockid}

**GET**/ 현재 노드에서 가장 높은 블록 ID를 반환합니다.

이 요청에는 로그인 인증이 필요하지 않습니다.

#### 요청 예시

``` text
GET
/api/v2/maxblockid
```

#### 응답

- *max_block_id*

    > 현재 노드에서 가장 높은 블록 ID입니다.

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "max_block_id" : 341,
}
```

#### 에러 응답

*E_NOTFOUND*

### block/{id} {#block-id}

**GET**/ 지정된 블록 ID에 대한 정보를 반환합니다.

이 요청에는 로그인 인증이 필요하지 않습니다.

#### 요청 예시

- *id*

    > 블록 ID.

``` text
POST
/api/v2/block/32
```

#### 응답


- *hash*

    > 블록 해시.

- *key_id*

    > 블록을 서명한 계정 주소.

- *time*

    > 블록 생성 타임스탬프.

- *tx_count*

    > 블록 내의 전체 거래 수.

- *rollbacks_hash*

    > 블록 롤백 해시.

- *node_position*

    > 영광 노드 목록에서의 블록 위치.

#### 응답 예시

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

#### 에러 응답

*E_NOTFOUND*

### avatar/{ecosystem}/{member} {#avatar-ecosystem-member}

**GET**/ *member* 테이블(로그인 없이 사용 가능)에서 사용자의 아바타를 반환합니다.

#### 요청 예시

- *ecosystem*

    > 생태계 ID.

- *member*

    > 사용자의 계정 주소. (xxxx-... -xxxx)

``` text
GET
/api/v2/avatar/1/1234-2134-... -4321
```

#### 응답

요청 헤더 *Content-Type*은 이미지 유형이며 이미지 데이터는 응답 본문에 반환됩니다.

#### 응답 예시

``` text
200 (OK)
Content-Type: image/png  
```

#### 에러 응답

*E_NOTFOUND* *E_SERVER*

### config/centrifugo {#config-centrifugo}

**GET**/ centrifugo의 호스트 주소와 포트를 반환합니다.

이 요청에는 로그인 인증이 필요하지 않습니다.

#### 요청 예시

``` text
GET
/api/v2/config/centrifugo
```

#### 응답

응답 결과 형식 `http://address:port`, 예: `http://127.0.0.1:8100`.

#### 에러 응답

*E_SERVER*

### updnotificator {#updnotificator}

**POST**/

(폐기)

아직 전송되지 않은 모든 메시지를 centrifugo 알림 서비스로 전송합니다. 지정된 생태계 및 구성원에 대한 메시지만 보냅니다.

이 요청에는 로그인 인증이 필요하지 않습니다.

#### 요청 예시

- *id*

    > 회원의 계정 주소.

- *ecosystem*

    > 생태계 ID.

``` text
POST
/api/v2/updnotificator
```

#### 응답 예시

``` text
200 (OK)
Content-Type: application/json
{
    "result": true
} 
```

### 특별한 지시사항이 있으신가요? {#special-instructions}

#### 비어 있음 {#omitempty}
Omitempty 속성이 있는 필드는 선택적인 매개변수를 의미합니다.

#### 인증 {#authorization}
Authorization 태그가 있는 인터페이스는 로그인 인증이 필요한 인터페이스입니다. 요청 헤더에 Authorization을 추가해야 합니다. 예시:

key = Authorization
value = "Bearer + [login token](#login)"

``` text
Authorization Bearer eyJhbGciOiJI..... kBZgGIlPhfXNZJ73RiZtM
```