# JSON-RPC アプリケーション プログラミング インターフェイス

ソフトウェア アプリケーションが IBAX ブロックチェーンと対話するには (ブロック データを取得したり、トランザクションをネットワークに送信したり)、ソフトウェア アプリケーションは IBAX ネットワーク ノードに接続されている必要があります。


元の REST API インターフェイスの汎用性と拡張性により、インターフェイスとクライアントの数がますます増え、ますます複雑になります。 私たちは、特定のノードやクライアントの実装に関係なく、すべてのクライアントが同じ仕様セットを使用できるようにするためのインターフェイスの統合の重要性を認識しています。


JSON-RPC は、ステートレスで軽量なリモート プロシージャ コール (RPC) プロトコルです。 これは、多数のデータ構造とその処理ルールを定義します。 これらの概念は、インターフェイス、ハイパーテキスト転送プロトコル、または多くの異なるメッセージング環境を介して同じプロセスで使用できるため、トランスポートに依存しません。 データ形式として JSON (RFC 4627) を使用します。



JSON-RPC は、ほとんどの REST API インターフェイスと互換性があり、元の REST API インターフェイスを保持しており、REST API インターフェイスを使用するクライアントは、インターフェイスの一部である JSON-RPC インターフェイスに簡単に転送できます。
- [/data/{id}/data/{hash}](api2.md#data-id-data-hash)
- [/data/{table}/id/{column}/{hash}](api2.md#data-table-id-column-hash)
- [avatar/{ecosystem}/{member}](api2.md#avatar-ecosystem-member) 

REST API インターフェイスを通じて利用できます。

## Client-sideの実装
SON-RPC 仕様を実装する場合、各クライアントは異なるプログラミング言語を使用できます。
[GO-SDK](https://github.com/IBAX-io/go-ibax-sdk)


## Curlの例
以下に、IBAX ノードに対してcurlリクエストを行うことによるJSON RPC APIの使用例を示します。 各例には、特定のエンドポイント、そのパラメーター、戻り値の型、およびその使用方法の実例の説明が含まれています。

Curl リクエストは、コンテンツ タイプに関連するエラー メッセージを返す場合があります。 これは、 --data オプションによってコンテンツ タイプが application/x-www-form-urlencoded に設定されるためです。 リクエストにこの問題がある場合は、呼び出しの先頭に -H "Content-Type: application/json" を配置して、ヘッダーを手動で設定します。 これらの例には、curl の最後のパラメータである必要がある URL/インターネット プロトコルとポートの組み合わせも含まれていません (例: 127.0.0.1:7079)。この追加データを含む完全なcurl リクエストは次の形式になります。

``` text
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.maxBlockId","params":[],"id":1}' http://127.0.0.1:7079	
```

## 契約

### Hex
**16進数コード**

バイト配列、ハッシュ、およびバイトコード配列をエンコードする場合: エンコードは 16 進数で、1 バイトあたり 2 桁の 16 進数になります。

### リクエストの種類
**Uniformの使用**
- Content-Type: application/json

### 特殊マーカー
#### Omitempty

このフィールドはオプションのパラメータです。

行に複数の `Omitempty` フィールドがある場合、
特定のフィールドの値のみを渡したい場合は、不要なフィールドを null（フィールドタイプの null 値）に設定する必要があります。例：

- **id** - *Number* - [Omitempty](#omitempty) id
- **name** - *String* - [Omitempty](#omitempty) Name
- **column** - *String* - [Omitempty](#omitempty) Filter column names

名前の値のみが渡される場合、リクエストパラメータは以下のように渡されます
`"params":[0, "testname"]` - *Number* null 値は 0

カラムの値のみが渡される場合、リクエストパラメータは以下のように渡されます
`"params":[0,"", "title,page"]` - *String* 空の値は


#### Authorization
認証ヘッダー、リクエストヘッダーにAuthorizationを追加します。例：

**name** : Authorization
**value** : Bearer +[ログイントークン](#ibax-login)

例：
```` text
    //request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ey...." -d '{"jsonrpc":"2.0","method":"ibax.getContractInfo","params":["@1TokensSend"],"id":1}' http://127.0.0.1:7079

````

#### AccountOrKeyId
アカウントアドレスのパラメータでは、2つの形式のアドレスを使用できます。例えば
1. - *String* - アカウントアドレス `"XXXX-XXXX-XXXX-XXXX-XXXX"` またはアカウントID `"64842...538120"`

2. - *Object* - アドレスオブジェクト
   - **key_id** - *Number* - アカウントID、例: `{"key_id":-64842   38120}`
   - **account** - *String* - アカウントアドレス、例: `{"account": "1196-... - -... -3496"}`

   **アカウントIDが存在する場合、アカウントアドレスとアカウントIDの両方がある場合はアカウントIDが優先されます**。

#### BlockOrHash
ブロックの高さまたはブロックのハッシュ、例:

1.  - *String*  -   ブロックの高さ `"100"` または ブロックのハッシュ   `"4663aa47...a60753c18d9ba9cb4"`

2.  - *Object* - ブロック情報オブジェクト
    - **id** - *Number* - ブロックの高さ、例: `{"id":2}`
    - **hash** - *[Hex](#hex) String* - ブロックのハッシュ、例: `{"hash": "d36b8996c   c616d3043a0d02a0f59"}`

    **ブロックの高さとブロックのハッシュはどちらか一方を選択できます**。

### バッチリクエスト
この機能は、特に大量の大部分が独立したデータオブジェクトを取得する場合にネットワークのレイテンシを低減するために使用できます。

以下は、最高ブロックとトランザクションの総数を取得する例です：

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


### エラーレスポンスの処理

リクエストが正常に実行された場合、ステータスコード `200` が返されます。

エラーが発生した場合、以下のフィールドを持つJSONオブジェクトが返されます:

- jsonrpc
    エラー識別子。
- id
    エラーテキストメッセージ。
- error
    - code
        レスポンスステータスコード
    - message
        レスポンスステータスの説明


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


## JSON-RPC ネームスペース

### ibax ネームスペース

#### 認証インターフェース
- [ibax.getuid](#ibax-getuid)
- [ibax.login](#ibax-login)
- [ibax.getAuthStatus](#ibax-getauthstatus)

#### server-sideのコマンドインターフェイス
- [ibax.getVersion](#ibax-getversion)

#### データリクエスト機能インターフェース
- [ibax.getBalance](#ibax-getbalance)
- [ibax.getBlocksTxInfo](#ibax-getblockstxinfo)
- [ibax.detailedBlocks](#ibax-detailedblocks)
- [ibax.getKeyInfo](#ibax-getkeyinfo)
- [ibax.detailedBlock](#ibax-detailedblock)

#### メトリクスの取得インターフェイス
- [ibax.maxBlockId](#ibax-maxblockid)
- [ibax.getKeysCount](#ibax-getkeyscount)
- [ibax.getTxCount](#ibax-gettxcount)
- [ibax.getTransactionCount](#ibax-gettransactioncount)
- [ibax.getBlocksCountByNode](#ibax-getblockscountbynode)
- [ibax.honorNodesCount](#ibax-honornodescount)
- [ibax.getEcosystemCount](#ibax-getecosystemcount)

#### エコシステムインターフェース
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

#### スマートコントラクト機能インターフェース
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

### ネット名前空間
- [net.getNetwork](#net-getnetwork)
- [net.status](#net-status)

### rpc名前空間
- [rpc.modules](#rpc-modules)

### admin名前空間
- [admin.startJsonRpc](#admin-startjsonrpc)
- [admin.stopJsonRpc](#admin-stopjsonrpc)


### debug名前空間
- [debug.getNodeBanStat](#debug-getnodebanstat)
- [debug.getMemStat](#debug-getmemstat)
 


## JSON-RPC インターフェースメソッド

### **ibax.getUid**

[Authorization](#authorization) [Omitempty](#omitempty)

[**login**](#ibax-login)を呼び出す際に、[**Authorization**](#authorization)に渡す必要がある一時的なJWTトークンを生成します。

#### パラメーター
なし

#### 戻り値
- **uid** - *String* - 署名の数値。

- **token** - *String* - ログイン時に渡される一時トークン（一時トークンの寿命は5秒）。

- **network_id** - *String* - ネットワークの識別子。

- **cryptoer** - *String* - 楕円曲線アルゴリズム。

- **hasher** - *String* - ハッシュアルゴリズム。

認証が必要ない場合（リクエストに[Authorization](#authorization)が含まれている場合）、以


- **expire** - *String* - 有効期限。

- **ecosystem** - *String* - エコシステムID。

- **key_id** - *String* - アカウントアドレス。

- **address** - *String* - ウォレットアドレス `XXXX-XXXXXX-XXXX-XXXX-XXXX`。

- **network_id** - *String* - ネットワークの識別子。

#### 例
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
ユーザー認証。[Authorization](#authorization)

最初に[**ibax.getUid**](#ibax-getuid)コマンドを呼び出して、一意の値を受信し、署名する必要があります。getuidの一時的なJWTトークンは、リクエストヘッダーに渡す必要があります。リクエストが成功した場合、レスポンスで受信したトークンは[**Authorization**](#authorization)に含まれます。

#### パラメーター

*Object* - 認証呼び出しオブジェクト
- **ecosystem_id** - *Number* - エコシステムID。指定されていない場合、最初のエコシステムIDにデフォルト設定されます。

- **expire** - *Number* - JWTトークンのライフサイクル（秒単位）、デフォルトは28800、8時間です。

- **public_key** - *[Hex](#hex) String* - 16進数のアカウント公開鍵。

- **key_id** - *String* -
    >   アカウントアドレス「XXXX-...-XXXX」。
    >
    >   公開鍵がすでにブロックチェーンに保存されている場合、このパラメーターを使用します。*pubkey*パラメーターとは一緒に使用できません。

- **signature** - *String* -
    getuidで受信したuidに対して、秘密鍵を使用して署名します。

    署名データの内容：LOGIN+{$network_id}+uid

- **role_id** - *Number* - ロールID、デフォルトロール0



#### 戻り値
*Object* - 認証オブジェクト
- **token** - *String* - JWTトークン。

- **ecosystem_id** - *String* - エコシステムID。

- **key_id** - *String* - アカウントアドレスID

- **account** - *String* - ウォレットアドレス「XXXX-XXXXXX-XXXX-XXXX-XXXX」。

- **notify_key** - *String* - 通知ID。

- **isnode** - *Bool* - アカウントアドレスがノードのオーナーであるかどうか。値：`true,false`。

- **isowner** - *Bool* - アカウントアドレスがこのエコシステムの作成者であるかどうか。値：`true,false`。

- **clb** - *Bool* - ログインしたエコシステムがCLBであるかどうか。値：`true,false`。

- **timestamp** - *String* - 現在のタイムスタンプ

- **roles** - *Array* - ロールのリスト。ロールがない場合、このフィールドはnilです。
    - **role_id** - *Number* - ロールID
    - **role_name** - *String* - ロール名

#### 例

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
ユーザー認証ステータス
[Authorization](#authorization)

#### パラメーター
なし

#### 戻り値
*Object* - 認証ステータスオブジェクト
- **active** - *Bool* - 現在のユーザー認証ステータス。値：`true,false`

- **exp** - *Number* - [Omitempty](#omitempty) トークン有効期限の切り捨てタイムスタンプ

#### 例
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
現在のサーバーバージョンを返します。

#### パラメーター
なし

#### 戻り値
- **vesion** - *String* - バージョン番号（`big Version` + `branch name` + `git commit` + `time` + `node status`）

#### 例
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

### ibax.getBalance
アカウントアドレスの残高を取得します。

#### パラメーター

- key_idまたはaccount - [*AccountOrKeyId*](#accountorkeyid) - アカウントアドレス \`XXXX- XXXX-XXXX-XXXX-XXXX\` またはアカウントID

- ecosystem_id - *Number* - エコシステムID [Omitempty](#*omitempty*) デフォルト1 


#### 戻り値
*Object* - 残高オブジェクトを取得する
- **amount** - **String** - 契約アカウント残高の最小単位。

- **total** - **String** - 最小単位のアカウントの総残高（amount+utxo）。

- **utxo** - **String** - 最小単位のUTXOアカウント残高。

- **digits** - **Number** - 精度

- **token_symbol** - **String** - トークンシンボル


#### 例
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
ブロック内のトランザクションに関する追加情報が含まれたリストを返します。

#### パラメーター

- **block_id** - *Number* - クエリする開始ブロック高

- **count** - *Number* - ブロック数、デフォルトは25、最大リクエスト数は100

#### 戻り値
*Object* - ブロック情報オブジェクトを取得する
- **block_id** - *String* - ブロック高
- 各トランザクションの追加情報を含むブロック内のトランザクションのリスト：

   - **hash** - *[Hex](#hex) String* - トランザクションのハッシュ。

    - **contract_name** - *String* - コントラクトの名前。

    - **params** - *Object* - コントラクトパラメーター。[ibax.getContractInfo](#ibax-getcontractinfo)を使用して、コントラクトフィールドをクエリできます。

    - **key_id** - *Number* -
        最初のブロックの場合、トランザクションに署名した最初のブロックのアカウントアドレスです。

        他のすべてのブロックの場合、トランザクションに署名したアカウントのアドレスです。

#### 例
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
R各ブロック内のトランザクションに関する詳細情報を含むリストを返します。

#### パラメーター
- **block_id** - *Number* - クエリの開始ブロック高

- **count** - *Number* - ブロック数。デフォルトは 25 ですが、最大要求数は 100 です。

#### 戻り値
*Object* - ブロックの詳細情報オブジェクト
- **block_id** - *String* - ブロック高
    - **header** - *Object* - ブロックヘッダー。ブロックヘッダーには、次のフィールドが含まれます。
        - **block_id** - *Number* - ブロックの高さ。
        - **time** - *Number* - ブロック生成タイムスタンプ。
        - **key_id** - *Number* - ブロックに署名したアカウントのアドレス。
        - **node_position** - *Number* - ブロックを生成したノードの栄誉ノードリスト内の位置。
        - **version** - *Number* - ブロック構造バージョン。
    - **hash** - *[Hex](#hex) String* - ブロックのハッシュ。
    - **node_position** - *Number* - ブロックを生成したノードの栄誉ノードリスト内の位置。
    - **key_id** - *Number* - ブロックに署名したアカウントのアドレス。
    - **time** - *Number* - ブロック生成タイムスタンプ。
    - **tx_count** - *Number* - ブロック内のトランザクション数。
    - **size** - *String* - ブロックのサイズ。
    - **rollback_hash** - *[Hex](#hex) String* - ブロックのロールバックハッシュ。
    - **merkle_root** - *[Hex](#hex) String* - このブロックトランザクションのマークルツリー。
    - **bin_data** - *[Hex](#hex) String* - ブロックヘッダー、ブロック内のすべてのトランザクション、前のブロックハッシュ、およびブロックを生成したノードの秘密鍵のシリアル化。
    -  **transactions** - *Object* - トランザクションリスト。ブロック内の各トランザクションに関する追加情報が含まれます。
        - **hash** - *[Hex](#hex) String* - トランザクションのハッシュ。
        - **contract_name** - *String* - コントラクトの名前。
        - **params** - *Object* - コントラクトパラメーター。[ibax.getContractInfo](#ibax-getcontractinfo)を使用して、コントラクトフィールドをクエリできます。
        - **key_id** - *Number* - トランザクションに署名したアカウントのアドレス。
        - **time** - *Number* - トランザクション生成タイムスタンプ（単位：ミリ秒）。
        - **type** - *Number* - トランザクションのタイプ。
        - **size** - *String* - トランザクションのサイズ。

#### 例
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
指定されたアドレスに登録されている役割を持つエコシステムのリストを返します。

#### パラメーター
- **account** - *String* - アカウントアドレス

#### 戻り値
*Object* - アドレスエコリストオブジェクトを指定します。
- **account** - *String* - アカウントアドレス
- **ecosystems** - *Array* - エコリスト
    - **ecosystem** - *String* - エコシステム ID
    - **name** - *String* - エコシステム名
    - **digits** - *Number* - 精度
    - **roles** - *Array* - 役割のリスト。
        - **id** - *String* - 役割 ID
        - **name** - *String* - キャラ


#### 例
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
ブロック内のトランザクションに関する詳細な情報のリストを返します。

#### パラメーター
- **Block or Hash** - *[BlockOrHash](#blockorhash)* - ブロックの高さまたはブロックハッシュ

#### 戻り値
*Object* - ブロックの詳細オブジェクトを取得します。
- **header** - *Object* - ブロックヘッダー。以下のフィールドが含まれます。
    - **block_id** - *Number* - ブロックの高さ
    - **time** - *Number* - ブロックの生成タイムスタンプ
    - **key_id** - *Number* - ブロックに署名したアカウントのアドレス
    - **node_position** - *Number* - ブロックを生成したノードのHonorノードリスト内の位置
    - **version** - *Number* - ブロック構造のバージョン

- **hash** - *[Hex](#hex) String* - ブロックのハッシュ
- **node_position** - *Number* - ブロックを生成したノードのHonorノードリスト内の位置
- **key_id** - *Number* - ブロックに署名したアカウントのアドレス
- **time** - *Number* - ブロックの生成タイムスタンプ
- **tx_count** - *Number* - ブロック内のトランザクション数
- **size** - *String* - ブロックのサイズ
- **rollback_hash** - *[Hex](#hex) String* - ブロックのロールバックハッシュ
- **merkle_root** - *[Hex](#hex) String* - このブロックのトランザクションのマークルツリー
- **bin_data** - *[Hex](#hex) String* - ブロックヘッダー、ブロック内のすべてのトランザクション、前のブロックハッシュ、およびブロックを生成したノードの秘密鍵のシリアル化
- **transactions** - *Array* - トランザクション。ブロック内のトランザクションのリストと各トランザクションに関する追加情報。
    - **hash** - *[Hex](#hex) String* - トランザクションのハッシュ
    - **contract_name** - *String* - コントラクト名
    - **params** - *Object* - コントラクトパラメータ。コントラクトのフィールドは、[ibax.getContractInfo](#ibax-getcontractinfo)を介してクエリできます。
    - **key_id** - *Number* - トランザクションに署名したアカウントのアドレス
    - **time** - *Number* - トランザクションの生成タイムスタンプ（単位：ms）
    - **type** - *Number* - トランザクションのタイプ
    - **size** - *String* - トランザクションのサイズ

#### 例
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

#### パラメーター 
なし

#### 戻り値 
- **Block Id** - *Number* - 現在のノード上の最高ブロック

#### 例
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
現在のノード上のアドレスの総数を取得する

#### パラメーター 
なし
#### 戻り値
- **Count** - *Number* - Total number of addresses 

#### 例
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
現在のノード上のトランザクションの総数を取得します。

#### パラメーター 
なし

#### 戻り値
- **Count** - *Number* - Total number of transactions

#### 例
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
ブロックトランザクションの数を取得する

#### パラメーター 
- **block or hash** - *[BlockOrHash](#blockorhash)* - ブロック高さまたはブロックハッシュ
 
#### 戻り値
- **Count** - *Number* - ブロックの総数

#### 例
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
Gノードロケーションパッキングブロックの数を取得する

#### パラメーター
- **nodePosition** - *Number* - ノードサブスクリプト
- **consensusMode** - *Number* - コンセンサスモード。パラメーター (1: Creator Managementモード、2: DAO Governanceモード)

#### 戻り値
*Object* - ノードサブスクリプトのパッキング数オブジェクトを取得します。
- **total_count** - *Number* - ブロックの総数
- **partial_count** - *Number* - ノードサブスクリプトのパッキングブロック数

#### 例
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
名誉ノード数を取得する

#### パラメーター
なし

#### 戻り値
- **Count** - *Number* - ノードの数
#### 例
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
エコシステムの獲得数を取得する

#### パラメーター
なし

#### 戻り値
- **Count** - *Number* - エコロジー番号

#### 例
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
エコロジー情報にアクセスする

#### パラメーター
- **ecosystem id** - *Number* - エコロジーID

#### 戻り値
- **id** - *Number* - エコID
- **name** - *String* - エコロジー名
- **digits** - *Number* - 精度
- **token_symbol** - *String* - トークンシンボル
- **token_name** - *String* - トークンの名称
- **total_amount** - *String* - 発行量（初回発行、発行していない場合は `"0"`）
- **is_withdraw** - *Bool* - 破棄可能性 `true:破棄可能 false:破棄不可能`
- **withdraw** - *String* - 破棄量（破棄不可能な場合、または破棄されていない場合は `"0"`）
- **is_emission** - *Bool* - 増発可能性 `true:増発可能 false:増発不可能`
- **emission** - *String* - 増発量（増発不可能な場合、または増発がない場合は `"0"`）
- **introduction** - *String* - エコの紹介
- **logo** - *Number* - エコロゴのID（バイナリテーブルIDに対応）、RESTFUL APIで利用可能
- **creator** - *String* - エコ作成者

#### 例
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
現在のエコシステムまたは指定されたエコシステムのアプリケーションパラメータのリストを返します

[Authorization](#authorization)

#### パラメーター
- **appid** - *Number* - アプリケーションID。
- **ecosystem** - *Number* - [Omitempty](#omitempty) - エコシステムID;

    指定されていない場合、または0の場合、現在のエコシステムのパラメータが返されます。

- **names** - *String* - [Omitempty](#omitempty) - アプリケーションパラメータ名をフィルタリングします。

    カンマで区切られた名前のリスト、例：`name1,name2`。

- **offset** - *Number* - [Omitempty](#omitempty) オフセット、デフォルトは0です。

- **limit** - *Number* - [Omitempty](#omitempty) エントリ数、デフォルトは100、最大100。

#### 戻り値
*Array* - アプリケーションパラメータのリスト
- **app_id** - *Number* - アプリケーションID
- **list** - *Number* - 配列の各要素には、次のパラメータが含まれます。
    - **id** - *String* - パラメータID、ユニーク。
    - **name** - *String* - パラメータ名。
    - **value** - *String* - パラメータ値。
    - **conditions** - *String* - パラメータを変更するための権限。

#### 例
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
エコシステムパラメータのリストを取得する

[Authorization](#authorization)

#### パラメーター
- **ecosystem** - *Number* - [Omitempty](#omitempty) - エコシステムID

    もし0またはそのようなパラメータがない場合、デフォルト: 現在のecid。

- **names** - *String* - [Omitempty](#omitempty) - フィルタパラメータの名前。

    カンマで区切られた名前のリスト、例：`name1,name2`。

    フィルタパラメータがある場合、*offset*と*limit*パラメータは無効です。

- **offset** - *Number* - [Omitempty](#omitempty) オフセット、デフォルトは0です。

- **limit** - *Number* - [Omitempty](#omitempty) エントリ数、デフォルトは100、最大100。

#### 戻り値
- **list** - *Array* - 配列の各要素には、次のパラメータが含まれます。
    - **id** - *String* - パラメータのID、ユニーク。
    - **name** - *String* - パラメータの名前。
    - **value** - *String* - パラメータの値。
    - **conditions** - *String* - パラメータを変更するための権限。

#### 例
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
現在のエコシステムに関するデータテーブルのリストを返します。

Offset and number of entries can be set 

[Authorization](#authorization)
#### パラメーター

- **offset** - *Number* - [Omitempty] オフセット。デフォルトは0です。

- **limit** - *Number* - [Omitempty] エントリの数。デフォルトは100で、最大は100です。

#### 戻り値
- **count** - *Number* - 現在のエコロジカルデータテーブルの総シート数。

- **list** - *Array* - 配列の各要素には次のパラメーターが含まれています：
    - **name** - *String* - プレフィックスなしのデータテーブルの名前。
    - **count** - *String* - データテーブル内のエントリ数。

#### 例
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
R現在のエコシステムのリクエストデータテーブルに関する情報を返します。

[Authorization](#authorization)

#### パラメーター
- **tableName** - *String* - データテーブル名

#### 返り値
- **name** - *String* - データテーブルの名前。

- **insert** - *String* - エントリを追加する権限。

- **new_column** - *String* - 新しいフィールドを追加する権限。

- **update** - *String* - エントリの権限を変更する権限。

- **app_id** - *String* - アプリケーションID。

- **conditions** - *String* - 権限を変更するための条件。

- **columns** - *Array* - データテーブルフィールドに関連する情報の配列：
    - **name** - *String* - フィールドの名前。
    - **type** - *String* - フィールドのデータ型。
    - **perm** - *String* - このフィールドの値を変更する権限。


#### 例
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
指定されたデータテーブルのエントリを返します。

返される列を指定することができます。

オフセットとエントリの数を設定することができます。

クエリ条件を設定することができます。

タイプが *BYTEA*（バイト配列、ハッシュ、バイトコード配列）のデータテーブルのヘックスエンコーディング

[Authorization](#authorization)

#### パラメーター
*Object* - データテーブルオブジェクトを取得します。
- **name** - *String* - データテーブルの名前。

- **limit** - *Number* - [Omitempty] エントリの数。デフォルトは25です。

- **offset** - *Number* - [Omitempty] オフセット。デフォルトは0です。

- **order** - *String* - [Omitempty] ソート方法。デフォルトはid ASCです。

- **columns** - *String* - [Omitempty] 要求された列のコンマ区切りのリスト。指定されていない場合はすべての列が返されます。

    id列は常に返されます。

- **where** - *Object* - [Omitempty] クエリ条件

    例：id > 2 かつ name = john をクエリしたい場合は、`where:{"id":{"$gt":2}, "name":{"$eq": "john"}}` を使用します。

    詳細については、[DBFind](../topics/script.md#dbfind) のwhere構文を参照してください。

#### 返り値
- **count** - *Number* - エントリの総数。
- **list** - *Array* - 配列の各要素には次のパラメーターが含まれています：

    - **id** - *String* - エントリのID。
    - **...** - データテーブルの他の列。

#### 例
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
現在のエコシステムのタブに戻ります。
テーブルエントリのリストで、オフセットとエントリ数を設定できます。

もし *role_access* フィールドがロールのリストを含み、現在のロールが含まれていない場合、レコードは返されません。*title* フィールドのデータは、リクエストヘッダーの *Accept-Language* 言語リソースによって置き換えられます。

[Authorization](#authorization)

#### パラメーター

- *Object* - アクションリクエストオブジェクトを取得します。
    - **limit** - *Number* - [Omitempty](#omitempty) - エントリの数。デフォルトは25です。

    - **offset** - *Number* - [Omitempty](#omitempty) - オフセット。デフォルトは0です。

    - **lang** - *String* - [Omitempty](#omitempty) - このフィールドは、マルチリンガルリソースコードまたはローカライゼーションを指定します。例：*en, zh*。指定されたマルチリンガルリソースが見つからない場合、例えば *en-US* の場合は、マルチリンガルリソースグループで検索します。**デフォルト**: **en**。

#### 返り値

- **count** - *Number* - タブエントリの総数。

- **list** - *Array* - 配列の各要素には、セクションテーブルのすべての列に関する情報が含まれています。

#### 例
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
現在のエコシステムの指定されたデータテーブルのエントリを返します。返される列を指定することができます。

[Authorization](#authorization)

#### パラメーター
- **tableName** - *String* - データテーブルの名前。

- **id** - *Number* - エントリのID。

- **columns** - *String* - [Omitempty](#omitempty) 

    要求された列のコンマ区切りのリスト。指定されていない場合、すべての列が返されます。

    フィルタリングしない場合は、空白 "" を指定できます。

    id列は常に返されます。

- **whereColumn** - *String* - [Omitempty](#omitempty) - 検索する列名（Number型の列のみ検索可能）

#### 返り値
- **value** - *Object* - 列の値を受け取るオブジェクト
    - **id** - *String* - エントリのID。
    - **...** - 要求された列のシーケンス。

#### 例
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
プラットフォームパラメータのリストを返します。

[Authorization](#authorization)

#### パラメーター
- **names** - *String* - [Omitempty](#omitempty) - カンマで区切られたリクエストパラメータのリスト。

    例：`names="name1,name2"`。

- **offset** - *Number* - [Omitempty](#omitempty) - オフセット。デフォルトは0です。

- **limit** - *Number* - [Omitempty](#omitempty) - エントリの数。デフォルトは100で、最大は100です。

#### 返り値

- **list** - *Array* - 配列の各要素には次のパラメーターが含まれています：
    - **id** - *String* - ユニークなID
    - **name** - *String* - パラメーターの名前。
    - **value** - *String* - パラメーターの値。
    - **conditions** - *String* - パラメーターを変更する権限。


#### 例
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
現在のエコシステムの指定されたデータテーブルのエントリの変更レコードを返します。

[Authorization](#authorization)

#### パラメーター

- **name** - *String* - データテーブルの名前。
- **tableId** - *Number* - エントリのID。

#### 返り値
- **list** - *Array* - 配列の各要素には、要求されたエントリの変更レコードが含まれています。

#### 例
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
エコシステムページデータテーブルのフィールドで、現在のエントリを取得します。

[Authorization](#authorization)

#### パラメーター
- **name** - *String* - テーブル内のエントリの名前を指定します。

#### 返り値
- **id** - *Number* - エントリのID。
- **name** - *String* - エントリの名前。
- **value** - *String* - コンテンツ。
- **menu** - *String* - ディレクトリ。
- **nodesCount** - *Number* - ページが検証するノードの数。
- **app_id** - *Number* - アプリケーションID。
- **conditions** - *String* - パラメーターを変更する権限。

#### 例
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
エコシステムメニューデータテーブルのフィールドで、現在のエントリを取得します。

[Authorization](#authorization)

#### パラメーター
- **name** - *String* - テーブル内のエントリの名前を指定します。

#### 返り値
- **id** - *Number* - エントリのID。
- **name** - *String* - エントリの名前。
- **title** - *String* - タイトル。
- **value** - *String* - コンテンツ。
- **conditions** - *String* - パラメーターを変更する権限。


#### 例
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
エコシステムスニペットデータテーブルのフィールドから、現在のエントリを取得します。

[Authorization](#authorization)

#### パラメーター
- **name** - *String* - テーブル内のエントリの名前を指定します。

#### 返り値
- **id** - *Number* - エントリのID。
- **name** - *String* - エントリの名前。
- **value** - *String* - コンテンツ。
- **conditions** - *String* - パラメーターを変更する権限。


#### 例
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
アプリケーションに関連する情報（ページ、スニペット、メニューなど）を取得します。

[Authorization](#authorization)

#### パラメーター
- **id** - *Number* - アプリケーションID

#### 返り値
- **snippets** - *Array* - コードスニペット情報の配列
    - **id** - *Number* - ID
    - **name** - *String* - コードスニペット名

- **pages** - *Array* - ページ情報の配列
    - **id** - *Number* - ID
    - **name** - *String* - ページ名

- **contracts** - *Array* - コントラクト情報の配列
    - **id** - *Number* - ID
    - **name** - *String* - コントラクト名


#### 例
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
メンバー情報を取得します。

#### パラメーター
- **account** - *String* - メンバー情報
- **ecosystemId** - *Number* - エコシステムID

#### 返り値
- **id** - *Number* - メンバーID
- **member_name** - *String* - 名前
- **image_id** - *Number* - アバターのID
- **member_info** - *String* - 自己紹介



#### 例
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
現在のエコシステムのコントラクトのリストを取得します。オフセットとエントリ数を設定することができます。

[Authorization](#authorization)

#### パラメーター
- **offset** - *Number* - [Omitempty](#omitempty) オフセット。デフォルトは0です。
- **limit** - *Number* - [Omitempty](#omitempty) エントリ数。デフォルトは25です。

#### 返り値
- **count** - *Number* - エントリの総数。

- **list** - *Array* - 配列の各要素には、次のパラメータが含まれます：
    - **id** - *String* - コントラクトID。
    - **name** - *String* - コントラクトの名前。
    - **value** - *String* - コントラクトの内容。
    - **wallet_id** - *String* - コントラクトがバインドされているアカウントのアドレス。
    - **address** - *String* - コントラクトにバインドされたウォレットのアドレス `XXXX-...-XXXX`。
    - **ecosystem_id** - *String* - コントラクトが所属するエコシステムのID。
    - **app_id** - *String* - コントラクトが所属するアプリケーションのID。
    - **conditions** - *String* - コントラクトの権限を変更します。
    - **token_id** - *String* - コントラクトの支払いに使用されるパスのエコシステムID。



#### 例
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
指定されたコントラクトの情報を返します。

[Authorization](#authorization)

#### パラメーター
- **contractName** - *String* - コントラクトの名前。形式は `@ecosystem_id%%contractName%` です。例：@1contractName（指定されたエコシステムID1のcontractNameコントラクト）またはcontractName（現在のエコシステムのcontractNameコントラクト）。

#### 返り値
- **id** - *Number* - VM内のコントラクトID。
- **name** - *String* - エコシステムIDを含むコントラクト名 `@1MainCondition`。
- **state** - *Number* - コントラクトが所属するエコシステムのID。
- **walletid** - *String* - コントラクトがバインドされているアカウントのアドレス。
- **tokenid** - *String* - コントラクトの支払いに使用されるパスのエコシステムID。
- **address** - *String* - コントラクトにバインドされたウォレットのアドレス `XXXX-...-XXXX`。
- **tableid** - *String* - コントラクトが配置されている*contracts*テーブルのエントリのID。
- **fields** - *Array* - コントラクトの**data**セクションの各パラメータの構造情報が含まれる配列：
    - **name** - *String* - パラメータの名前。
    - **type** - *String* - パラメータの型。
    - **optional** - *Bool* - パラメータのオプション。`true` はオプションパラメータを意味し、`false` は必須パラメータを意味します。

#### 例
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
パラメーターでトランザクションを受け取り、それらをトランザクションキューに追加し、リクエストが正常に実行された場合はトランザクションのハッシュを返します。このハッシュはブロック内の対応するトランザクションを指し示し、エラーレスポンスの場合にはエラーテキストメッセージに含まれます。

[Authorization](#authorization)

#### パラメーター
- *Object* - トランザクションデータオブジェクト
    - **tx_key** - *String* - トランザクションの内容です。このパラメーターは任意の名前を指定でき、複数のトランザクションを受け取ることができます。

#### 返り値
- **hashes** - *Array* - トランザクションハッシュの配列：
    - **tx1** - *String* - トランザクション1のハッシュ。
    - **txN** - *String* - トランザクションNのハッシュ。

#### 例
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
指定されたトランザクションハッシュのブロックIDとエラーメッセージを取得します。ブロックIDとエラーテキストメッセージの返り値がnullの場合、トランザクションはまだブロックに含まれていません。

[Authorization](#authorization)

#### パラメーター
- **hashes** - *String* - トランザクションハッシュ。`,`で区切って指定します。

#### 返り値
- **hash** - *Object* - トランザクションハッシュ
    - **blockid** - *String* - トランザクションが正常に実行された場合、ブロックIDが返されます。
    
        トランザクションの実行が失敗した場合、*blockid* は `0` となり、トランザクションの実行エラーがペナルティにより処理された場合は、対応するブロックIDが返されます。
        
    - **result** - *String* - トランザクションの結果を **\$result** 変数で返します。
    - **errmsg** - *Object* - [Omitempty](#omitempty) トランザクションの実行に失敗した場合、エラーテキストメッセージが返されます。
        - **type** - *String* - エラーのタイプ
        - **error** - *String* - エラーメッセージ
    - **penalty** - *Number* - トランザクションの実行が失敗した場合、(0: ペナルティなし、1: ペナルティあり)

#### 例
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
指定されたハッシュに関するトランザクションの情報を返します。ブロックIDと確認数を含みます。オプションのパラメータが指定された場合、コントラクト名と関連するパラメータも返すことができます。

#### パラメーター
- **hash** - *String* - トランザクションのハッシュ。
- **contractinfo** - *Bool* [Omitempty](#omitempty) - コントラクトの詳細パラメータ識別子。このトランザクションに関連するコントラクトの詳細を取得します。デフォルトは `false` です。

#### 返り値
- **blockid** - *Number* - トランザクションが含まれるブロックのID。
    値が `0` の場合、このハッシュに対するトランザクションは見つかりません。
    トランザクションが現在のノードで発生した場合、[ibax.txStatus](#ibax-txstatus) を通じて取得できます。

- **confirm** - *Number* - このブロック *blockid* のノードの確認数。

- **data** - *Object* - `contractinfo=true` が指定された場合、コントラクトの詳細情報が返されます。指定されていない場合は null が返されます。
    - **block_id** - *Number* - ブロックの高さ
    - **block_hash** - *String* - ブロックのハッシュ
    - **address** - *String* - トランザクションの作成アドレス
    - **ecosystem** - *String* - トランザクションの送信エコシステムID
    - **hash** - *String* - トランザクションのハッシュ
    - **expedite** - *String* - 速達料金、利用できない場合は ""
    - **contract_name** - *String* - コントラクト名
    - **params** - *Object* - コントラクトのパラメータ、[ibax.getContractInfo](#ibax-getcontractinfo) を介してコントラクトフィールドをクエリできます
    - **created_at** - *Number* - トランザクションの作成日時
    - **size** - *String* - トランザクションのサイズ、単位: B;KiB;MiB;GiB;TiB
    - **status** - *String* - ステータス (0: 成功 1: ペナルティ)


#### 例
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
指定されたハッシュリストに関するトランザクションに関する情報を返します。

#### パラメーター
- **hashes** - *Array* - トランザクションのハッシュのリスト。
 
- **contractinfo** - *Bool* [Omitempty](#omitempty) - コントラクトの詳細パラメータ識別子。このトランザクションに関連するコントラクトの詳細を取得します。デフォルトは `false` です。

#### 返り値
-   **results** - *Array* - トランザクションのハッシュをキー、トランザクションの詳細を値とするデータ辞書。
    - **hash** - *String* - トランザクションのハッシュ。
        - **blockid** - *Number* - トランザクションが含まれるブロックのID。値が `0` の場合、そのハッシュに対するトランザクションは見つかりません。
        - **confirm** - *Number* - このブロック *blockid* の確認数。
        - **data** - *Object* - `contentinfo=true` が指定された場合、このパラメータにはコントラクトの詳細が返されます。指定されていない場合は null です。
            - **block_id**- *Number* - ブロックの高さ
            - **block_hash** - *String* - ブロックのハッシュ
            - **address** - *String* - トランザクションの作成アドレス
            - **ecosystem** - *String* - トランザクションの送信エコシステムID
            - **hash** - *String* - トランザクションのハッシュ
            - **expedite** - *String* - 速達料金、利用できない場合は ""
            - **contract_name** - *String* - コントラクト名
            - **params** - *Object* - コントラクトのパラメータ、[ibax.getContractInfo](#ibax-getcontractinfo) を介してコントラクトフィールドをクエリできます
            - **created_at** - *Number* - トランザクションの作成日時
            - **size** - *String* - トランザクションのサイズ、単位: B;KiB;MiB;GiB;TiB
            - **status** - *String* - ステータス (0:成功 1:ペナルティ)


#### 例
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
指定されたページに対して検証する必要があるノードの数を返します。

#### パラメーター
- **name** - *String* - ページ名。`@ecosystem_id%%%page_name%` の形式で指定します。例: @1params_list (エコロジー1のページ名 params_list) や params_list (現在のエコロジーのページ名 params_list)。

#### 返り値
- **validate_count** - *Number* - ページに対して検証する必要があるノードの数を指定します。

#### 例
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
指定されたページ名のコードJSONオブジェクトのツリーを取得します。このツリーはテンプレートエンジンによる処理の結果です。

[Authorization](#authorization)

#### パラメーター
-   **name** - *String* - ページ名。`@ecosystem_id%%page_name%` の形式で指定します。例: `@1main_page`。

    エコシステムIDが指定されていない場合、現在のエコロジーのページを検索します。例: `main_page`

#### 返り値
- **menu** - *String* - ページが所属するメニューの名前です。
- **menutree** - *Array* - ページのメニューのJSONオブジェクトツリーです。
- **tree** - *Array* - ページのJSONオブジェクトツリーです。

#### 例
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
指定されたメニュー名のコードJSONオブジェクトツリーを取得します。このメニューはテンプレートエンジンによる処理の結果です。

[Authorization](#authorization)

#### パラメーター
-   **name** - *String* -
    > メニュー名は `@ecosystem_id%%%menu_name%` の形式で指定します。例： `@1main_menu`。
    > エコシステムIDを指定しない場合は、デフォルトで現在のエコロジーのメニューが見つかります。例： `main_menu`

#### 返り値

- **title** - *String* - メニューのタイトル。

- **tree** - *Array* - メニューのJSONオブジェクトツリー。


#### 例
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

指定されたページ名のコード化されたJSONオブジェクトツリーを返します。いかなる関数も実行せず、データを受信しません。返されるJSONオブジェクトツリーは、ページのテンプレートに対応し、ビジュアルページデザイナーで使用することができます。ページが見つからない場合は、404エラーが返されます。

[Authorization](#authorization)

#### パラメーター
-   **name** - *String* -
    ページ名は `@ecosystem_id%%%page_name%` の形式で指定します。例： `@1main_page`。
    エコシステムIDを持たない場合は、デフォルトで現在のエコロジーのページが見つかります。例： `main_page`

#### 返り値
-   **tree** - *Array* - ページのJSONオブジェクトツリー。


#### 例
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

指定されたページ名のSHA256ハッシュを返します。ページが見つからない場合は404エラーが返されます。

他のノードにリクエストを行う際に正しいハッシュを受け取るためには、*ecosystem,key_id,role_id* パラメーターも渡す必要があります。他のエコシステムからページを受け取るには、ページ名の前にエコシステムIDを付ける必要があります。例：`@2mypage`。

#### パラメーター
- **name** - *String* - エコシステムIDを含むページの名前。形式は `@ecosystem_id%%%page_name%` です。例： `@1main_page`。エコシステムIDを指定することもできます。

- **ecosystem** - *Number* - [Omitempty](#omitempty) エコシステムID。

- *Object* - [Omitempty](#omitempty) 指定されたページオブジェクトを取得する場合
    - **key_id** - *String* - アカウントアドレス。
    - **role_id** - *String* - ロールID。

#### 返り値
- *Object* -
    - **hash** - *String* - 16進数のハッシュ値。

#### 例
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
オプションのパラメーター **source** が `true` と指定されている場合、**template** パラメーターのページコードからJSONオブジェクトの数を返します。このJSONオブジェクトツリーは、関数を実行せずにデータを受信しないものです。このJSONオブジェクトツリーは、ビジュアルページデザイナーで使用することができます。

#### パラメーター
- *Object*
    - **template** - *String* - ページコード。
    - **source** - *Bool* - `true` と指定されている場合、JSONオブジェクトツリーは関数を実行せずにデータを受信しません。

#### 返り値
- **tree** - *Object* - JSONオブジェクトツリー。

#### 例
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
指定されたブロックIDに関する情報を返します。

#### パラメーター
- **id** - *Number* - ブロックの高さ。

#### 返り値

- **hash** - *String* - ブロックのハッシュ値。
- **key_id** - *Number* - ブロックに署名したアカウントのアドレス。
- **time** - *Number* - ブロックの生成タイムスタンプ。
- **tx_count** - *Number* - ブロック内のトランザクションの総数。
- **rollbacks_hash** - *String* - ブロックのロールバックハッシュ。
- **node_position** - *Number* - ブロックのエンドポイントリスト内での位置。
- **consensus_mode** - *Number* - コンセンサスモード（1: クリエーターマネージメントモード、2: DAOガバナンスモード）。


#### 例
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
centrifugoのホストアドレスとポートを取得します。

#### パラメーター
- **option** - *String* - 設定項目

    1. "centrifugo" - メッセージングサービス

#### 返り値

- **centrifugo** - *String* - [Omitempty](#omitempty) centrifugoのホストアドレスとポート。結果の形式は `http://address:port` となります。例: `http://127.0.0.1:8100`。


#### 例
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
ノードの情報を取得します。

#### パラメーター
なし

#### 返り値
- **network_id** - *String* - ネットワークの識別子。
- **centrifugo_url** - *String* - centrifugoメッセージサービスのアドレス。
- **test** - *Bool* - テストチェーンであるかどうか。
- **private** - *Bool* - チェーンがプライベートであるかどうか。
- **honor_nodes** - *Object* - honorノードのリスト。
    - **tcp_address** - *String* - TCPアドレス。
    - **api_address** - *String* - APIアドレス。
    - **public_key** - *String* - ノードの公開鍵。
    - **unban_time** - *String* - アンバンの時間。


#### 例
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
現在のノードのステータスを取得します。

#### パラメーター
なし

#### 返り値
- **status** - *String* - ノードのステータス
    - "node server status is running" - ノードが稼働中です
    - "node server is updating" - ノードが更新中です
    - "node server is stopped" - ノードが停止中です


#### 例
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
現在登録されているJSON-RPCインターフェースを取得します。

#### パラメーター
なし

#### 返り値
- *Array* - JSON-RPCインターフェースの配列


#### 例
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
JSON-RPCの名前空間サービスの切り替えに使用できます。

#### パラメーター
**methods** - *String* - JSON-RPCモジュール、デフォルト値: "ibax,net"

#### 返り値
- *bool* - 実行のステータス

#### 例
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
JSON-RPCサービスを閉じることができます。

#### パラメーター
なし

#### 返り値
- *bool* - 実行のステータス


#### 例
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
ノードの無効化状態を取得します。

#### パラメーター
なし

#### 返り値
**node_position** - *Number* - ノードの添字
**status** - *Bool* - 無効化の状態。`true`は無効化されていることを示し、`false`は無効化されていないことを示します。


#### 例
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
現在のノードのメモリ使用状況を取得します。

#### パラメーター
なし

#### 返り値
- **alloc** - *Number* - リクエストされたバイト数およびまだ使用中のバイト数
- **sys** - *Number* - システムから取得されたバイト数


#### 例
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
