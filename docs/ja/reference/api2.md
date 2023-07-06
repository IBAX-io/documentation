# RESTful API v2 {#restful-api-v2}

ウィーバー （Weaver)
認証、エコシステム データの受信、エラー処理、データベース テーブルの操作、ページおよびコントラクトの実行を含む、提供されるすべての機能は、
IBAX Blockchain PlatformのREST APIが利用可能です。

REST API を使用すると、開発者は Weaver を使用せずにプラットフォームの機能にアクセスできます。

API コマンド呼び出しは、`/api/v2/command/[param]` をアドレス指定することによって実行されます。ここで、`command`
はコマンド名で、`param`は追加のパラメータです。 リクエストパラメータは、
`Content-Type: x-www-form-urlencoded`
フォーマットで送信されます。 サーバーの応答結果は JSON 形式です。

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
    - [listWhere/{name}](#listwhere-name)
    - [nodelistWhere/{name}](#nodelistwhere-name)
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

## エラー応答処理 {#error-response-handling}

リクエストの実行が成功した場合にステータスを返す
「200」。 エラーが発生した場合は、エラーステータスに加えて、次のフィールドを含む JSON オブジェクトが返されます。

- **エラー**

     > エラー識別子。

- **メッセージ**

     > エラー テキスト メッセージ。

- **パラメータ**

     > エラー メッセージに配置できる追加パラメータの配列。

**応答例**
``` text
400 (Bad request)
Content-Type: application/json
{
    "err": "E_INVALIDWALLET",
    "msg": "Wallet 1234-5678-9012-3444-3488 is not valid",
    "params": ["1234-5678-9012-3444-3488"]
}
```

### Error list {#error-list}

> `E_CONTRACT`
 
   `%s` コントラクトが存在しません

> `E_DBNIL`

     データベースが空です

> `E_DELETEDKEY`

     アカウントアドレスが凍結されている

> `E_ECOSYSTEM`

     エコシステム `%d` は存在しません

> `E_EMPTYPUBLIC`

     無効なアカウント公開キー

> `E_KEYNOTFOUND`

     アカウントアドレスが見つかりません

> `E_HASHWRONG`

     不正なハッシュ

> `E_HASHNOTFOUND`

     ハッシュが見つかりません

> `E_HEAVYPAGE`

     ページの読み込みが多すぎる

> `E_INVALIDWALLET`

     ウォレットアドレス「%s」が無効です

> `E_LIMITTXSIZE`

     トランザクションサイズが制限を超えました

> `E_NOTFOUND`

     ページまたはメニューのコンテンツが見つかりません

> `E_PARAMNOTFOUND`

     パラメータが見つかりません

> `E_PERMISSION`

     全く許可しません

> `E_QUERY`

     データベースクエリエラー

> `E_RECOVERED`

     APIパニックエラーが発生します。

     パニックエラーが発生した場合はエラーを返します。

     このエラーは、見つけて修正する必要があるバグが発生したことを意味します。

> `E_SERVER`

     サーバーエラー。

     golang ライブラリ関数にエラーがある場合に戻ります。 \*msg\* フィールドにはエラー テキスト メッセージが含まれます。

     **E_SERVER** は、コマンド エラーに応答して表示される場合があります。
     入力パラメータが間違っているためにエラーが発生した場合は、関連するエラーに変更できます。 別のケースでは、このエラーは無効な操作または不正なシステム構成を報告するため、より詳細な調査レポートが必要になります。

> `E_SIGNATURE`

    Incorrect signature

> `E_STATELOGIN`

    `%s` is not a member of the ecosystem `%s`

> `E_TABLENOTFOUND`

    Data sheet `%s` not found

> `E_TOKENEXPIRED`

    The session has expired `%s`

> `E_UNAUTHORIZED`

    Unauthorized.

    In case no login is performed or the session expires, 
    except for `getuid, login` Any command other than **E_UNAUTHORIZED** returns an error.

> `E_UNKNOWNUID`

    Unknown UID

> `E_UPDATING`

    Nodes are updating the blockchain

> `E_STOPPING`

    Node is stopped

> `E_NOTIMPLEMENTED`

    Not yet achieved

> `E_BANNED`

    This account address is prohibited in `%s`

> `E_CHECKROLE`

    Access denied

    CLB Unavailable Interface

------------------------------------------------------------------------

> CLB ノードが使用できないインターフェース要求。

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

## リクエストの種類 {#request-type}
**制服の使用**
- application/x-www-form-urlencoded

## Authentication Interface {#authentication-interface}

[JWT token](https://jwt.io)
認証に使用されます。 JWT トークンは、受信後に各リクエスト ヘッダーに配置する必要があります: `Authorization: Bearer TOKEN_HERE`。

### getuid {#getuid}

**GET**/ は一意の値を返し、秘密キーで署名してから、
[login](#login) コマンドは、それをサーバーに送り返します。

**login** を呼び出すときに **Authorization** に渡す必要がある一時的な JWT トークンを生成します。

**請求**

``` text
GET
/api/v2/getuid
```

**応答**

- `uid`

    > 署名番号。

- `token`

    > ログイン時に渡される一時トークン。
    >
    > 一時トークンのライフサイクルは 5 秒です。

- `network_id`

    > サーバー識別子。

- `cryptoer`

    > 楕円曲線アルゴリズム。

- `hasher`

    > ハッシュアルゴリズム。

**応答例1** 

``` text
200 (OK)
Content-Type: application/json
{
    "uid": "4999317241855959593",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....... .I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE"
    "network_id": "4717243765193692211"
}
```

認証が不要な場合（リクエストに **Authorization** が含まれている場合）には、以下のメッセージが返されます：

- `expire`

    > 有効期限です。

- `ecosystem`

    エコシステム* > エコシステムID。

- `key_id`

    > アカウントアドレス。

- `address`

    > ウォレットアドレス `XXXX-XXXX-.... -XXXX`です。

- `network_id`

    > サーバーの識別子です。

**応答例2** 

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

**エラー応答**

*E_SERVER*

### login {#login}

**POST**/ User authentication.

> **getuid**を最初に呼び出す必要があります。
> getuidの一時的なJWTトークンは、リクエストヘッダで渡す必要があります。
>
> リクエストに成功した場合、レスポンスで受け取ったトークンは **Authorization** に含まれます。

**請求**

``` text
POST
/api/v2/login
```

- `ecosystem`

    > エコシステムID。
    >
    > 指定しない場合、デフォルトで最初のエコシステム ID が使用されます。

- `expire`

    > JWT トークンのライフサイクル (秒単位)、デフォルトは 28800 です。

- `pubkey`

    > 16 進数のアカウント公開キー。

- `key_id`

    > アカウントアドレス `XXXX-... -XXXX`。
    >
    > 公開キーがすでにブロックチェーンに保存されている場合は、このパラメータを使用します。 *pubkey* と一緒に使用することはできません
    > パラメータが併用されます。

- `signature`

    > getuid 経由で受信した uid 署名。

**応答**

- `token`

    > JWT トークン。

- `ecosystem_id`

    > エコシステムID。

- `key_id`

    > アカウントアドレスID。

- `account`

    > ウォレットアドレス `XXXX-XXXX-..... -XXXX`。

- `notify_key`

    > 通知 ID。

- `isnode`

    > アカウントアドレスがノードの所有者であるかどうか。 値:  `true,false`.

- `isowner`

    > アカウントアドレスがエコシステムの作成者であるかどうか。 値: `true,false`.

- `clb`

    > ログインしたエコシステムが CLB かどうか。 値: `true,false`.

- `roles` [Omitempty](#omitempty)

    >  ロールリスト: `[{Role ID,Role Name}]`.

**応答例**

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

**エラー応答**

*E_SERVER, E_UNKNOWNUID, E_SIGNATURE, E_STATELOGIN, E_EMPTYPUBLIC*

## Server Side command interface {#server-side-command-interface}

### version {#version}

**GET**/ 現在のサーバーのバージョンを返します。

このリクエストにはログイン認証は必要ありません。

**請求**

``` text
GET
/api/v2/version
```

**応答例**

``` text
200 (OK)
Content-Type: application/json
"1.3.0 branch.main commit.790..757 time.2021-08-23-08:20:19(UTC)"
```

## Data Request Function Interface {#data-request-function-interface}

### balance {#balance}

**GET**/ 現在のエコシステムのアカウント アドレスの残高をリクエストします。

このリクエストにはログイン認証は必要ありません。

**請求**

``` text
GET
/api/v2/balance/{wallet}
```

- `wallet`

    > アドレス識別子は、`int64、uint64、XXXX-... -XXXX`の任意の形式で指定できます。 ユーザーが現在ログインしているエコシステム内のアドレスを検索します。

- `ecosystem` [Omitempty](#omitempty) デフォルトの ecosystem 1

     > エコシステム ID。

**応答**

- `amount`

    > The minimum unit of contract account balance.

- `money`

    > Account balance.

- `total`

    > Account balance.

- `utxo`

    > UTXO account balance.

**応答例**

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

**エラー応答**

*E_SERVER, E_INVALIDWALLET*

### blocks {#blocks}

**GET**/ 各ブロック内のトランザクションに関連する追加情報を含むリストを返します。

このリクエストにはログイン認証は必要ありません。

**請求**

``` text
GET 
/api/v2/blocks
```

- `block_id` [Omitempty](#omitempty) デフォルトは 0

     > クエリする開始ブロックの高さ。

- `count` [Omitempty](#omitempty) (デフォルトは 25、最大リクエストは 1000)

     > ブロックの数。

**応答**

- `Block height`

    > ブロック内のトランザクションのリストと各トランザクションの追加情報。
    > > - `hash`
    > >
    > > > 取引ハッシュ。
    > >
    > > - `contract_name`
    > >
    > > > 契約名。
    > >
    > > - `params`
    > >
    > > > コントラクトパラメータの配列。
    > >
    > > - `key_id`
    > >
    > > > 最初のブロックの場合、トランザクションに署名した最初のブロックのアカウント アドレスです。
    > >
    > > > 他のすべてのブロックの場合、トランザクションに署名したアカウントのアドレスです。

**応答例**

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

**エラー応答**

*E_SERVER, E_NOTFOUND*

### detailed_blocks {#detailed-blocks}

**GET**/ 各ブロック内のトランザクションに関する詳細な追加情報を含むリストを返します。

このリクエストにはログイン認証は必要ありません。

**請求**

``` text
GET
/api/v2/detailed_blocks
```

- `block_id` [Omitempty](#omitempty) デフォルトは 0

   > クエリする開始ブロックの高さ。

- `count` [Omitempty](#omitempty) (デフォルトは 25、最大リクエストは 1000)

   > ブロックの数。

**応答**

- `Block height` The block height.
 - `blockhead` ブロックヘッダには次のフィールドが含まれています。
  - `block_id` ブロックの高さ。
  - `time` ブロックの生成タイムスタンプ。
  - `key_id` ブロックに署名するアカウントのアドレス。
  - `node_position` ブロックを生成したノードの位置（名誉ノードリスト内）。
  - `version` ブロックの構造バージョン。
 - `hash` ブロックのハッシュ。
 - `node_position` ブロックを生成したノードの位置（名誉ノードリスト内）。
 - `key_id` ブロックに署名したアカウントのアドレス。
 - *time* ブロックの生成タイムスタンプ。
 - *tx_count* ブロック内のトランザクション数。
 - *size* ブロックのサイズ。
 - *rollback_hash* ブロックのロールバックハッシュ。
 - *merkle_root* ブロックのマークルツリー。
 - *bin_data* ブロックヘッダ、ブロック内のすべてのトランザクション、前のブロックのハッシュ、およびブロックを生成したノードの秘密鍵のシリアル化。
 - *transactions* ブロック内のトランザクションのリストと各トランザクションに関する追加情報。
  - *hash* トランザクションのハッシュ。
  - *contract_name* コントラクトの名前。
  - *params* コントラクトのパラメータ。
  - *key_id* このトランザクションに署名するアカウントのアドレス。
  - *time* トランザクションの生成タイムスタンプ。
  - *type* トランザクションのタイプ。
  - *size* トランザクションのサイズ。


**応答例**

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

**エラー応答**

*E_SERVER, E_NOTFOUND*

### /data/{id}/data/{hash} {#data-id-data-hash}

**GET**/ 指定されたハッシュがバイナリウォッチ、フィールド、およびレコード内のデータと一致する場合、このリクエストはデータを返します。一致しない場合はエラーを返します。

このリクエストではログインの認証は必要ありません。


**請求**

```text
GET
/data/{id}/data/{hash}
```

- `id`
    > レコードのID。

- `hash`
    > リクエストデータのハッシュ。


**応答**

> バイナリデータ

**応答例**

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

**エラー応答**

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### /data/{table}/id/{column}/{hash} {#data-table-id-column-hash}

**GET**/ 指定したハッシュが指定されたテーブル、フィールド、およびレコードのデータと一致する場合、リクエストはデータを返します。一致しない場合はエラーを返します。

このリクエストではログインの認証は必要ありません。

**請求**

```text
GET
/data/{table}/id/{column}/{hash}
```

- `table`

    > データテーブルの名前。

- `id`

    > レコードID。

- `column`

    > データテーブルの名前（1つのみ）。

- `hash`

    > ハッシュリクエストデータ。


**応答**

> バイナリデータ

**応答例**

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

**エラー応答**

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### keyinfo {#keyinfo}

**GET**/ 指定したアドレスに登録された役割を持つエコシステムのリストを返します。

このリクエストではログイン認証は必要ありません。

**請求**

```text
GET
/api/v2/keyinfo/{address}
```

- `address`

    > Address identifier, you can specify `int64, uint64, xxxx -...-xxxx`.
    >
    > This request is query in all ecosystems.

**応答**

- `ecosystem`

    > エコシステムのIDです。

- `name`

    > エコシステムの名前です。

- `roles`

    > *id* と *name* フィールドを持つ役割のリストです。

**応答例**

``` text
200 (OK)
Content-Type: application/json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Governancer"},{"id":"2","name":"Developer"}]
}]
```

**エラー応答**

*E_SERVER, E_INVALIDWALLET*

### walletHistory {#wallethistory}
**GET**/ 現在のアカウントのトランザクション履歴レコードを返します。IDによって検索されます。

[Authorization](#authorization)

**請求**

- `searchType`

  > 検索タイプ（収入：Income, 支出：Outcom, 全て：All, デフォルト：All）。

- `page` [Omitempty](#omitempty)
  > ページ番号を指定します。デフォルトは最初のページで、最小値は1です。

- `limit` [Omitempty](#omitempty)

  > 取得するトランザクション数を指定します。デフォルトは20件で、最小値は1、最大値は500です。


``` text
GET
/api/v2/walletHistory?searchType=all&page=1&limit=10
```

**応答**

- `total`

  > 全エントリの合計数。
- `page`

  > 現在のページ番号。
- `limit`

  > 現在の検索数。
- `list` 配列内の各要素は以下のパラメータを含みます：
    - `id` ストライプID。
    - `sender_id` 送信元のkey_id。
    - `sender_add` 送信元のアカウントアドレス。
    - `recipient_id` 受信元のkey_id。
    - `recipient_add` 受信元のアカウントアドレス。
    - `amount` トランザクションの金額。
    - `comment` 取引の備考。
    - `block_id` ブロックの高さ。
    - `tx_hash` トランザクションのハッシュ。
    - `created_at` トランザクションの作成時刻（ミリ秒のタイムスタンプ）。
    - `money` トランザクションの金額。


**応答例**

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

**エラー応答**

*E_SERVER*



### listWhere/{name} {#listwhere-name}
**GET**/ 現在のエコシステムで指定されているデータ テーブルのエントリに戻ります。 返される列を指定できます。

[Authorization](#authorization)

**請求**

- `name`

  > データテーブルの名前。

-   `limit` [Omitempty](#omitempty)

  > 取得するレコードの最大数。デフォルトは25。

-   `offset` [Omitempty](#omitempty)

  > ページネーションのオフセット。デフォルトは0。

-   `order` [Omitempty](#omitempty)

  > ソート方法。デフォルトは `id ASC`。

-   `columns` [Omitempty](#omitempty)

  > 取得する列のリストをカンマ区切りで指定します。指定しない場合、すべての列が返されます。ただし、`id`列は常に返されます。

-   `where` [Omitempty](#omitempty)

  > クエリの条件を指定します。
  >
  > 例: id > 2 かつ name = "john" をクエリしたい場合
  >
  > `where: {"id": {"$gt": 2}, "name": {"$eq": "john"}}` のように使用します。
  >
  > 詳細は [DBFind](../ topics/script.md#dbfind) の where 構文を参照してください。


``` text
GET
/api/v2/listWhere/mytable
```

**応答**

- `count`

  > エントリーの総数。
- `list`
  > 配列内の各要素には以下のパラメータが含まれます:
  - `id`
    > ストライプID.
  - `...`
    > データテーブルの他の列


**応答例**

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

**エラー応答**

*E_SERVER*,*E_TABLENOTFOUND*


### nodelistWhere/{name} {#nodelistwhere-name}
**GET**/ 指定したデータテーブルに戻ります。 返される列を指定できます。 データテーブルの型は **BYTEA** です。 16 進数のエンコード処理を行います。

[Authorization](#authorization)

**請求**

- `name`

  > データテーブル名。

-   `limit` [Omitempty](#omitempty)

    > 取得するエントリー数。デフォルトは25。

-   `offset` [Omitempty](#omitempty)

    > 取得するエントリーのオフセット。デフォルトは0。

-   `order` [Omitempty](#omitempty)

    > ソート方法。デフォルトは `id ASC`。

-   `columns` [Omitempty](#omitempty)

    > 取得するカラムのリスト。カンマで区切って指定します。指定しない場合、すべてのカラムが返されます。ただし、`id`カラムは常に返されます。

-   `where` [Omitempty](#omitempty)

    > クエリの条件
    >
    > 例: id> 2 かつ name = john をクエリしたい場合
    >
    > 以下のように使用します: where: {"id": {"$ gt": 2}, "name": {"$eq": "john"}}
    >
    > 詳細については、[DBFind](../ topics/script.md#dbfind) の where 構文を参照してください。


``` text
GET
/api/v2/nodelistWhere/mytable
```

**応答**

- `count`

  > エントリーの総数。
- `list`
  > 配列内の各要素には以下のパラメータが含まれます:
    - `id`
      > ストライプのID。
    - `...`
      > データテーブルの他のカラム


**応答例**

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

**エラー応答**

*E_SERVER*,*E_TABLENOTFOUND*



## Get Metrics Interface

### metrics/keys {#metrics-keys}

**GET**/ エコシステム 1 アカウントのアドレスの数を返します。

**請求**

``` text
GET
/api/v2/metrics/keys
```

**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/blocks {#metrics-blocks}

**GET**/ ブロック数を返します。

**請求**

``` text
GET
/api/v2/metrics/blocks
```

**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/transactions {#metrics-transactions}

**GET**/ トランザクションの合計数を返します。

**請求**

``` text
GET
/api/v2/metrics/transactions
```

**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/ecosystems {#metrics-ecosystems}

**GET**/ エコシステムの数を返します。

**請求**

``` text
GET
/api/v2/metrics/ecosystems
```

**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/honornodes {#metrics-honornodes}

**GET**/ オナーノードの数を返します。

このリクエストにはログイン認証は必要ありません。

``` 
GET
/api/v2/metrics/honornodes
```

**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

## Ecosystem Interface {#ecosystem-interface}

### ecosystemname {#ecosystemname}

**GET**/ エコシステムの名前をその識別子で返します。

このリクエストにはログイン認証は必要ありません。

``` text
GET
/api/v2/ecosystemname?id=1
```

- *id*

    > エコシステムID。

**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "ecosystem_name": "platform_ecosystem"
}
```

**エラー応答**

*E_PARAMNOTFOUND*

### appparams/{appid} {#appparams-appid}

[Authorization](#authorization)

**GET**/ 現在または指定されたエコシステム内のアプリケーション パラメーターのリストを返します。

**請求**

``` text
GET
/api/v2/appparams/{appid}
```

- `appid`

    > アプリケーションのID。

- `ecosystem`

    > エコシステムのID。指定しない場合、現在のエコシステムのパラメータが返されます。

- `names`

    > 取得するパラメータのリスト。
    >
    > カンマ区切りでパラメータ名を指定できます。例: `/api/v2/appparams/1?names=name,mypar`。

**応答**

- `list`

    > 配列の各要素には、以下のパラメータが含まれます。
    >
    > - *name*：パラメータの名前。
    > - *value*：パラメータの値。
    > - *conditions*：パラメータの権限を変更します。

**応答例**

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

**エラー応答**

*E_ECOSYSTEM*

### appparam/{appid}/{name} {#appparam-appid-name}

[Authorization](#authorization)

**GET**/ 現在または指定されたエコシステム内のアプリケーション **{name}** のパラメータ **{appid}** を返します
に関連する情報は、

**請求**

``` text
GET
/api/v2/appparam/{appid}/{name}[?ecosystem=1]
```

- `appid`

    > アプリケーションID。

- `name`

    > リクエストされたパラメータの名前。

- `ecosystem` [Omitempty](#omitempty)

    > エコシステムのID（省略可能なパラメータ）。
    >
    > デフォルトでは現在のエコシステムが返されます。


**応答**

- `id`

    > パラメータのID。

- `name`

    > パラメータの名前。

- `value`

    > パラメータの値。

- `conditions`

    > パラメータの変更権限。


**応答例**

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

**エラー応答**

*E_ECOSYSTEM, E_PARAMNOTFOUND*

### ecosystemparams {#ecosystemparams}

[Authorization](#authorization)

**GET**/ エコシステムパラメータのリストを返します。

**請求**

``` text
GET
/api/v2/ecosystemparams/[?ecosystem=... &names=...]
```

- `ecosystem` [Omitempty](#omitempty)

    > Ecosystem IDが指定されていない場合、現在のエコシステムIDが返されます。

- `names` [Omitempty](#omitempty)

    > カンマで区切られた要求パラメータのリストです。
    >
    > 例: `/api/v2/ecosystemparams/?names=name,currency,logo`。


**応答**

- `list`

    > 各要素は、次のパラメータを含んでいます。
    >
    > - `name`
    >
    > > パラメータの名前。
    >
    > - `value`
    >
    > > パラメータの値。
    >
    > - `conditions`
    >
    > > パラメータの変更権限。


**応答例**

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

**エラー応答**

*E_ECOSYSTEM*

### ecosystemparam/{name} {#ecosystemparam-name}

[Authorization](#authorization)

**GET**/ 現在または指定されたエコシステムのパラメータ **{name}** に関する情報を返します。

**請求**

``` text
GET
/api/v2/ecosystemparam/{name}[?ecosystem=1]
```

- `name`

    > 要求されたパラメータの名前。

- `ecosystem` [Omitempty](#omitempty)

    > デフォルトでは、現在のエコシステム ID が返されます。

**応答**

> 各要素は、次のパラメータを含んでいます。
    >
    > - `name`
    >
    > > パラメータの名前。
    >
    > - `value`
    >
    > > パラメータの値。
    >
    > - `conditions`
    >
    > > パラメータの変更権限。

**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
} 
```

**エラー応答**

*E_ECOSYSTEM*

### tables/\[?limit=\... &offset=\... \] {#tables-limit-offset}

[Authorization](#authorization)

**GET**/ 現在のエコシステムのデータ テーブルのリストを返します。 オフセットとエントリ数を設定できます。

**請求**

- `limit` [Omitempty](#omitempty)

    > エントリの数、デフォルトは100、最大は1000です。

- `offset` [Omitempty](#omitempty)

    > オフセット、デフォルトは0です。


``` text
GET
/api/v2/tables?limit=... &offset=...
```

**応答**

- `count`

    > データテーブル内のエントリの総数。

- `list`

    > 配列の各要素には、次のパラメータが含まれています。
    >
    > > - `name`
    > >
    > > > プレフィックスなしのデータテーブル名。
    > >
    > > - `count`
    > >
    > > > データテーブル内のエントリ数。


**応答例**

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

[Authorization](#authorization)

**GET**/ 現在のエコシステム リクエスト データ テーブルに関する情報を返します。

**請求**

- `name`

    > データテーブル名。

``` text
GET
/api/v2/table/{table_name}
```

- `name`

    > データテーブル名。

- `insert`

    > 新しいエントリを追加する権限。

- `new_column`

    > フィールド追加の権限。

- `update`

    > エントリを変更する権限。

- `columns`

    > フィールドに関連する情報の配列。
    >
    > > - `name`
    > >
    > > > フィールド名。
    > >
    > > - `type`
    > >
    > > > フィールドのデータ型。
    > >
    > > - `perm`
    > >
    > > > フィールド値の変更権限。

### list/{name}\[?limit=\... &offset=\... &columns=\... \] {#list-name-limit-offset-columns}

[Authorization](#authorization)

**GET**/ 現在のエコシステム内の指定されたデータ テーブル エントリのリストを返します。 オフセットとエントリ数を設定できます。

**請求**

- `name`

    > データテーブル名。

- `limit` [Omitempty](#omitempty)

    > エントリ数、デフォルトは25エントリ。

- `offset` [Omitempty](#omitempty)

    > オフセット、デフォルトは0。

- `columns` [Omitempty](#omitempty)

    > 要求されたカラムのカンマ区切りリスト。指定されていない場合、すべてのカラムが返されます。idカラムは常に返されます。

``` text
GET
/api/v2/list/mytable?columns=name
```

**応答**

- `count`

    > エントリの総数。

- `list`

    > 配列の各要素には、次のパラメータが含まれています。
    >
    > > - `id`
    > >
    > > > エントリのID。
    > >
    > > - 要求されたカラムのシーケンス。


**応答例**

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

**GET**/ 現在のエコシステムの *セクション* を返します
テーブルエントリのリストでは、オフセットとエントリ数を設定できます。

*role_access* の場合
フィールドにロールのリストが含まれており、現在のロールが含まれていない場合、レコードは返されません。 *タイトル*
フィールドのデータは、リクエスト ヘッダーの *Accept-Language* 言語リソースに置き換えられます。

**請求**

- `limit` [Omitempty](#omitempty)

    > エントリの数。デフォルトは25エントリ。

- `offset` [Omitempty](#omitempty)

    > オフセット。デフォルトは0。

- `lang` [Omitempty](#omitempty)

    > このフィールドは、マルチ言語リソースコードまたはローカライゼーションを指定します。例えば、*en, ja*です。指定したマルチ言語リソースが見つからない場合、例えば*en-US*の場合は、
     *en*のマルチ言語リソースグループを検索します。


``` text
GET
/api/v2/sections
```

**応答**

- `count`

    > *sections* テーブルのエントリーの総数。

- `list`

    > 配列の各要素には、アクションテーブルのすべての列に関する情報が含まれています。

**応答例**

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

**エラー応答**

*E_TABLENOTFOUND*

### row/{name}/{id}\[?columns=\] {#row-name-id-columns}

[Authorization](#authorization)

**GET**/ 現在のエコシステム内の指定されたデータ テーブルのエントリを返します。 返される列を指定できます。

**請求**

- `name`

    > データテーブル名。

- `id`

    > エントリーのID。

- `columns` [Omitempty](#omitempty)

    > 要求された列のカンマ区切りリスト。指定されていない場合、すべての列が返されます。ID列は常に返されます。

``` text
GET
/api/v2/row/mytable/10?columns=name
```

**応答**

- `value`

    > 受信した列の値の配列です。
    >
    > > - `id`
    > >
    > > > エントリーのIDです。
    > >
    > > - 要求された列のシーケンスです。


**応答例**

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

**エラー応答**

*E_NOTFOUND*

### row/{name}/{column}/{id} {#row-name-colorn-id}

[Authorization] (#authorization)

**GET**/ 現在のエコシステムで指定されているデータ テーブルのエントリに戻ります。 返される列を指定できます。

**請求**

- `Name`

    > データテーブルの名前です。

- `colorn`

    > データリストの名前です。

- `ID`

    > ストライプIDです。

- `columns` [omitempty] (#omitempty)

    > 要求されたリストのリストです。カンマで区切られています。指定されていない場合、すべての列が返されます。ID列はすべての場合に返されます。

```text
GET
/API/V2/ROW/MyTable/name/John? Columns = name
```

**応答**

- `Value`

    > 受信カラムの値の配列です。

    - `ID`

        > ストライプIDです。

    - その他の要求カラムのシーケンス


**応答例**

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

**エラー応答**

*E_NOTFOUND*

### systemparams {#systemparams}

[Authorization](#authorization)

**GET**/ プラットフォーム パラメータのリストを返します。

**請求**

``` text
GET
/api/v2/systemparams/[?names=...]
```

- `names` [Omitempty](#omitempty)

    カンマで区切られたリクエストパラメータのリスト。 例えば
        `/api/v2/systemparams/?names=max_columns,max_indexes`.

**応答**

- `list`

    > 配列の各要素は以下のパラメータを含んでいます。

    - `name`

        > パラメータ名です。

    - `value`

        > パラメータの値です。

    - `conditions`

        > パラメータの権限を変更します。


**応答例**

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

**エラー応答**

*E_PARAMNOTFOUND*

### history/{name}/{id} {#history-name-id}

[Authorization](#authorization)

**GET**/ 現在のエコシステム内の指定されたデータ テーブル内のエントリの変更レコードを返します。

**請求**

``` text
GET
/api/v2/history?name=contracts&id=5
```

- `name`

    > データテーブルの名前です。

- `id`

    > エントリーのIDです。


**応答**

> - `list`
>
> 配列の各要素には、要求されたエントリの変更レコードが含まれます。

**応答例**

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

[Authorization](#authorization)

**GET**/ 指定されたデータ テーブル (ページ、メニュー、またはスニペット) *name* 内の現在のエコシステムを返します
フィールドのエントリ。

``` text
GET
/api/v2/interface/page/default_page
/api/v2/interface/menu/default_menu
/api/v2/interface/snippet/welcome
```

**請求**

- `name`

    > テーブル内のエントリの名前を指定します。

**応答**

- `id`

    > エントリーID。

- `name`

    > エントリー名。

- `other`

    > テーブルの他の列。

**応答例**

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

**エラー応答**

*E_QUERY*, *E_NOTFOUND*

## Contract Function Interface {#contract-function-interface}

### contracts\[?limit=\... &offset=\... \] {#contracts-limit-offset}

[Authorization](#authorization)

**GET**/ 現在のエコシステム内のコントラクトのリストを返します。オフセットとエントリ数を設定できます。

**請求**

- `limit` [Omitempty](#omitempty)

    > オフセット、デフォルトは 0 です。

- `offset` [Omitempty](#omitempty)

    > オフセット。デフォルトは 0 です。

``` text
GET
/api/v2/contracts
```

**応答**

- `count`

    > エントリーの総数です。

- `list`

    > 配列の各要素には、以下のパラメータが含まれています。
    >
    > > - `id`
    > >
    > > > コントラクトのIDです。
    > >
    > > - `name`
    > >
    > > > コントラクトの名前です。
    > >
    > > - `value`
    > >
    > > > コントラクトの内容です。
    > >
    > > - `wallet_id`
    > >
    > > > コントラクトが紐づいているアカウントのアドレスです。
    > >
    > > - `address`
    > >
    > > > コントラクトに紐づいているウォレットアドレス `XXXX-...-XXXX` です。
    > >
    > > - `ecosystem_id`
    > >
    > > > コントラクトが所属しているエコシステムのIDです。
    > >
    > > - `app_id`
    > >
    > > > コントラクトが所属しているアプリケーションのIDです。
    > >
    > > - `conditions`
    > >
    > > > コントラクトの権限を変更します。
    > >
    > > - `token_id`
    > >
    > > > コントラクト料金支払いに使用されるパスが所属するエコシステムのIDです。


**応答例**

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

### contract/{name} {#contract-name}

[Authorization](#authorization)

**GET**/ 指定されたコントラクトに関する情報を返します。 デフォルトでは、現在のエコシステムでコントラクトをクエリします。

**請求**

- *name*

    > Contract name.

``` text
GET
/api/v2/contract/mycontract
```

**応答**

- `id`

    > コントラクトのVM内のIDです。

- `name`

    > エコシステムID `@1MainCondition` を持つコントラクト名です。

- `state`

    > コントラクトのエコシステムIDです。

- `walletid`

    > コントラクトが紐づいているアカウントのアドレスです。

- `tokenid`

    > コントラクトの支払いに使用されるパスのエコシステムIDです。

- `address`

    > コントラクトに紐づいているウォレットアドレス `XXXX-...-XXXX` です。

- `tableid`

    > コントラクトが存在する *contracts* テーブル内のエントリーのIDです。

- `fields`

    > 配列には、コントラクトの **data** セクションの各パラメータの構造情報が含まれています。
    >
    > > - `name`
    > >
    > > > パラメータ名です。
    > >

    > > - `type`
    > >
    > >  パラメータのタイプです。
    > >
    > > - *optional*
    > >
    > >  パラメータのオプションです。 \`true\` はオプションパラメータを示し、\`false\` は必須パラメータを示します。


**応答例**

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

**エラー応答**

*E_CONTRACT*

### sendTX {#sendtx}

[Authorization](#authorization)

**POST**/
パラメータでトランザクションを受け取り、それらをトランザクション キューに追加し、リクエストが正常に実行された場合はトランザクション ハッシュを返します。 このハッシュはブロック内の対応するトランザクションを生成し、エラー応答の場合はエラー テキスト メッセージに含まれます。

**請求**

- `tx_key`

    > トランザクションの内容。このパラメータは任意の名前を指定でき、複数のトランザクションの受信をサポートします。

``` text
POST
/api/v2/sendTx

Headers:
Content-Type: multipart/form-data

Parameters:
tx1 - Transaction 1
txN - Trading N
```

**応答**

- `hashes`

    > トランザクションのハッシュの配列です。
    >
    > > - `tx1`
    > >
    > > > トランザクション1のハッシュです。
    > >
    > > - `txN`
    > >
    > > > トランザクションNのハッシュです。


**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "hashes": {
        "tx1": "67afbc435634..... ",
        "txN": "89ce4498eaf7..... ",
}
```

**エラー応答**

*E_LIMITTXSIZE*,*E_BANNED*

### txstatus {#txstatus}

[Authorization](#authorization)

**POST**/
指定されたトランザクション ハッシュのブロック ID とエラー メッセージを返します。 ブロック ID とエラー テキスト メッセージの戻り値が null の場合、トランザクションはまだブロックに含まれていません。

**請求**

- *data*

    > トランザクション ハッシュの JSON リスト。

``` text
{"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

``` text
POST
/api/v2/txstatus/
```

**応答**

- `results`

    > トランザクションのハッシュをキーとし、データ辞書内のトランザクション詳細を値として使用します。
    >
    > `hash`
    >
    > > トランザクションのハッシュです。
    > >
    > > - `blockid`
    > >
    > > トランザクションの実行が成功した場合、ブロックのIDが返されます。トランザクションの実行が失敗した場合、[0]{.title-ref} のブロックIDが返されます。
    > >
    > > - `result`
    > >
    > > トランザクションの結果を **\$result** 変数を通じて返します。
    > >
    > > - `errmsg`
    > >
    > > トランザクションの実行に失敗した場合、エラーテキストメッセージが返されます。


**応答例**

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

**エラー応答**

*E_HASHWRONG, E_HASHNOTFOUND*

### txinfo/{hash} {#txinfo-hash}

このリクエストにはログイン認証は必要ありません。

**GET**/

ブロック ID や確認の数など、指定されたハッシュのトランザクションに関する情報を返します。 オプションのパラメーターが指定されている場合は、コントラクト名とそれに関連するパラメーターも返します。

**請求**

- `hash`

    > トランザクションのハッシュ。

- `contractinfo` [Omitempty](#omitempty)

    > 契約詳細パラメータ識別子。このトランザクションに関連する契約詳細を取得するには、`contractinfo=1` を指定します。

``` text
GET
/api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1
```

**応答**

- `blockid`

    > 値が「0」の場合、そのハッシュに対するトランザクションは見つかりませんでした。

- `confirm`

    > このブロック *blockid* の承認数です。

- `data` [Omitempty](#omitempty)

    > `contentinfo=1` が指定されている場合、このパラメータには契約の詳細が返されます。


**応答例**

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

**エラー応答**

*E_HASHWRONG*

### txinfoMultiple {#txinfomultiple}

このリクエストにはログイン認証は必要ありません。

**GET**/ 

指定されたハッシュのトランザクション関連情報を返します。

**請求**

- `data`
    - `hashes`
        > トランザクションハッシュのリストです。

- `contractinfo` [Omitempty](#omitempty)

    > 契約の詳細に関連するこのトランザクションの契約詳細パラメーター識別子を指定するには、`contractinfo=1`を指定します。

``` text
data: {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

``` text
GET
/api/v2/txinfoMultiple
```

**応答**

- `results`
    > トランザクションハッシュがデータ辞書のキーとして使用され、トランザクションの詳細が値として使用されます。
    >
    > > `hash`
    > >
    > > > トランザクションハッシュ。
    > >
    > > > `blockid`
    > >
    > > > そのハッシュに対してトランザクションが見つからない場合は、値が `0` です。
    > >
    > > > `confirm`
    > >
    > > > このブロック *blockid* の承認数。
    > >
    > > > `data`
    > >
    > > > `contentinfo=1` が指定されている場合、契約の詳細がこのパラメーターに返されます。


**応答例**

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

**エラー応答**

*E_HASHWRONG*

### /page/validators_count/{name} {#page-validators-count-name}
このリクエストにはログイン認証は必要ありません。

**GET**

指定されたページで検証されるノードの数を返します。

**請求**

- `name`

    > `@ecosystem_id%%page_name%` 形式のエコシステム ID を含むページ名、たとえば
     > `@1main_page`。
     > エコシステム ID をお持ちでない場合は、デフォルトで最初のエコシステム ページを検索します

``` text
GET
/api/v2/page/validators_count/@2page_name
```

**応答**

- `validate_count`

    > ページに対して検証するノードの数を指定します。

**応答例**

``` text
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

**エラー応答**

*E_NOTFOUND, E_SERVER*

### content/menu\|page/{name} {#content-menu-page-name}

[Authorization](#authorization)

**POST**

テンプレート エンジンによる処理の結果である、指定されたページまたはメニュー名のコード JSON オブジェクトのツリーを返します。

**請求**

- `name`

    > `@ecosystem_id%%page_name%` 形式のエコシステム ID を含むページ名またはメニュー名 (例:
     > `@1main_page`。
     > エコシステム ID が含まれていない場合は、デフォルトで現在のエコシステム ページまたはメニューを検索します。

``` text
POST
/api/v2/content/page/default
```

**応答**

- `menu` || `title`
    > リクエスト *content/page/\...* でリクエストされたページが所属するメニューの名前です。

- `menutree`
    > リクエスト *content/page/\...* でリクエストされたページのメニューのJSONオブジェクトツリーです。

- `title` --head for the menu *content/menu/\...*
    > リクエスト *content/menu/\...* でリクエストされたメニューのタイトルです。

- `tree`
    > ページまたはメニューのJSONオブジェクトツリーです。


**応答例**

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

**エラー応答**

`E_NOTFOUND`

### content/source/{name} {#content-source-name}

[Authorization](#authorization)

**POST**

指定されたページ名のコード化された JSON オブジェクトのツリーを返します。 関数の実行やデータの受信は行いません。 返された JSON オブジェクト ツリーはページ テンプレートに対応しており、ビジュアル ページ デザイナーで使用できます。 ページが見つからない場合は、404 エラーが返されます。
Request """""""

- `name`

    > `@ecosystem_id%%page_name%` 形式のエコシステム ID を含むページ名、たとえば
    > `@1main_page`。
    > エコシステム ID が含まれていない場合は、デフォルトで現在のエコ ページを検索します。

**応答**

``` text
POST
/api/v2/content/source/default
```

- `tree`

    > JSON object tree of the page.

**応答例**

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

**エラー応答**

*E_NOTFOUND, E_SERVER*

### content/hash/{name} {#content-hash-name}

**POST** 

指定されたページ名の SHA256 ハッシュを返します。ページが見つからない場合は 404 エラーを返します。

このリクエストにはログイン認証は必要ありません。 他のノードにリクエストを行うときに正しいハッシュを受け取るには、以下も渡す必要があります。
*ecosystem,keyID,roleID,isMobile*パラメータ。 他のエコシステムからページを受信するには、エコシステム ID をページ名の前に付ける必要があります。 例: `@2mypage`。

**請求**


``` text
POST
/api/v2/content/hash/default
```
- `name`

    > エコシステム ID を含むページの名前。

- `ecosystem`
    > エコシステムIDです。


- `keyID`
    > アカウントアドレスです。


- `roleID`
    > ロールIDです。    





**応答**

- `hash`

    > 16 進数のハッシュ。

**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
} 
```

**エラー応答**

*E_NOTFOUND, E_SERVER, E_HEAVYPAGE*

### content {#content}

**POST**

**template** パラメータからページ コードの JSON オブジェクトの数を返します。オプションのパラメータ **source** が「true または 1」に指定されている場合、この JSON オブジェクト ツリーは関数を実行せず、データを受け取りません。 。 この JSON オブジェクト ツリーは、ビジュアル ページ デザイナーで使用できます。

このリクエストにはログイン認証は必要ありません。

**請求**

- `template`

    > ページコード。

- `source`

    > `true or 1` が指定された場合、JSON オブジェクト ツリーは何も機能せずにデータを受け取ります。

``` text
POST
/api/v2/content
```

**応答**

- `tree`

    > JSON オブジェクト ツリー。

**応答例**

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

**エラー応答**

*E_NOTFOUND, E_SERVER*

### maxblockid {#maxblockid}

**GET**/ 
現在のノード上の最大のブロック ID を返します。

このリクエストにはログイン認証は必要ありません。

**請求**

``` text
GET
/api/v2/maxblockid
```

**応答**

- `max_block_id`

    > 現在のノード上の最大のブロック ID。

**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "max_block_id" : 341,
}
```

**エラー応答**

*E_NOTFOUND*

### block/{id} {#block-id}

**GET**/ 

指定されたブロック ID に関する情報を返します。

このリクエストにはログイン認証は必要ありません。

**請求**

- `id`

    > Block ID.

``` text
POST
/api/v2/block/32
```

**応答**

- `hash`
    > ブロックのハッシュです。

- `key_id`
    > ブロックに署名したアカウントのアドレスです。

- `time`
    > ブロックの生成タイムスタンプです。

- `tx_count`
    > ブロック内のトランザクションの合計数です。

- `rollbacks_hash`
    > ブロックのロールバックハッシュです。

- `node_position`
    > ブロックのノード位置です。


**応答例**

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

**エラー応答**

*E_NOTFOUND*

### avatar/{ecosystem}/{member} {#avatar-ecosystem-member}

**GET**/
*member* テーブル内のユーザーのアバターを返します (ログインなしで利用可能)。

**請求**

- `ecosystem`

    > エコシステムID。

- `member`

    > ユーザーのアカウントアドレス。 (xxxx-... -xxxx)

``` text
GET
/api/v2/avatar/1/1234-2134-... -4321
```

**応答**

リクエスト ヘッダー *Content-Type* は画像タイプであり、画像データは応答本文で返されます。

**応答例**

``` text
200 (OK)
Content-Type: image/png  
```

**エラー応答**

*E_NOTFOUND* *E_SERVER*

### config/centrifugo {#config-centrifugo}

**GET**/ 

centrifugo のホストアドレスとポートを返します。

このリクエストにはログイン認証は必要ありません。

**請求**

``` text
GET
/api/v2/config/centrifugo
```

**応答**

応答結果の形式は `http://address:port`、例: `http://127.0.0.1:8100`。

**エラー応答**

*E_SERVER*

### updnotificator {#updnotificator}

**POST**/
(廃棄)

まだ送信されていないすべてのメッセージを centrifugo 通知サービスに送信します。 指定されたエコシステムとメンバーにメッセージのみを送信します。

このリクエストにはログイン認証は必要ありません。

**請求**

- `id`

    > メンバーのアカウントアドレス。

- `ecosystem`

    > エコシステムID。

``` text
POST
/api/v2/updnotificator
```

**応答例**

``` text
200 (OK)
Content-Type: application/json
{
    "result": true
} 
```

### Special instructions {#special-instructions}

#### Omitempty {#omitempty}
フィールドにomitempty属性がある場合、それはフィールドがオプションのパラメータであることを意味します。

#### Authorization {#authorization}
Authorizationタグのあるインターフェースでログイン認証が必要なインターフェースの場合、リクエストヘッダーにAuthorizationを追加するなどします。

key = Authorization
value = "Bearer + [login token](#login)"

``` text
Authorization Bearer eyJhbGciOiJI..... kBZgGIlPhfXNZJ73RiZtM
```
