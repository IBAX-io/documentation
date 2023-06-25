# プラットフォームパラメータ {#platform-parameters}
これらは IBAX を設定するためのパラメーターです。 これらは、ブロックチェーン ネットワークとその中のすべてのエコシステムに適用できます。

## プラットフォームパラメータを保存する場所 {#location-to-store-platform-parameters}
プラットフォーム パラメータは「システム パラメータ」テーブルに保存されます。

このテーブルは、ブロックチェーン ネットワーク上に作成された最初の (デフォルト) エコシステムにあります。

## プラットフォームパラメータの変更 {#change-of-platform-parameters}
プラットフォームパラメータの変更は投票によってのみ行うことができます。 UpdateSysParam コントラクトを使用してのみ、プラットフォームの法的システムの定義によって管理されるプラットフォーム パラメーターを変更できます。

## プラットフォームパラメータを設定する {#configure-platform-parameters}
### ブロックチェーン ネットワークを構成する {#configure-the-blockchain-network}

ノード:
* [full nodes](#full-nodes)
* [number of nodes](#number-of-nodes)

Node bans:
* [incorrect blocks per day](#incorrect-blocks-per-day)
* [node ban time](#node-ban-time)
* [node ban time local](#node-ban-time-local)

### 新しいエコシステムを構成する {#configure-a-new-ecosystem}

デフォルトのページとメニュー:
* [default ecosystem page](#default-ecosystem-page)
* [default ecosystem menu](#default-ecosystem-menu)

デフォルトのスマートコントラクト:
* [default ecosystem contract](#default-ecosystem-contract)

### データベースを構成する {#configure-the-database}

テーブルの制限:
* [max columns](#max-columns)
* [max indexes](#max-indexes)

### ブロックの生成を構成する {#configure-the-generation-of-blocks}
制限時間:
* [gap between blocks](#gap-between-blocks)
* [max block generation time](#max-block-generation-time)

トランザクション制限:
* [max tx block](#max-tx-block)
* [max tx block per user](#max-tx-block-per-user)

サイズ制限:
* [max tx size](#max-tx-size)
* [max block size](#max-block-size)
* [max forsign size](#max-forsign-size)

燃料制限:
* [max fuel block](#max-fuel-block)
* [max fuel tx](#max-fuel-tx)

ブロックのロールバック制限:
* [rollback blocks](#rollback-blocks)

### 燃料トークンを構成する {#configure-the-fuel-tokens}
報酬とコミッション:
* [block reward](#block-reward)
* [commission wallet](#commission-wallet)
* [commission size](#commission-size)

燃料比率換算:
* [fuel rate](#fuel-rate)
* [price create rate](#price-create-rate)

トランザクションサイズとデータ料金:
* [price tx data](#price-tx-data)
* [price tx size wallet](#price-tx-size-wallet)

新しい要素の価格:
* [price create ecosystem](#price-create-ecosystem)
* [price create table](#price-create-table)
* [price create column](#price-create-column)
* [price create contract](#price-create-contract)
* [price create menu](#price-create-menu)
* [price create page](#price-create-page)
* [price create application](#price-create-application)

操作の価格:
<!-- TOC -->

- [Platform Parameters](#platform-parameters)
  - [Location to store platform parameters](#location-to-store-platform-parameters)
  - [Change of platform parameters](#change-of-platform-parameters)
  - [Configure platform parameters](#configure-platform-parameters)
    - [Configure the blockchain network](#configure-the-blockchain-network)
    - [Configure a new ecosystem](#configure-a-new-ecosystem)
    - [Configure the database](#configure-the-database)
    - [Configure the generation of blocks](#configure-the-generation-of-blocks)
    - [Configure the fuel tokens](#configure-the-fuel-tokens)
    - [Depreciated](#depreciated)
  - [Details of platform parameters](#details-of-platform-parameters)
    - [block reward](#block-reward)
    - [blockchain url](#blockchain-url)
    - [commission size](#commission-size)
    - [commission wallet](#commission-wallet)
    - [default ecosystem contract](#default-ecosystem-contract)
    - [default ecosystem menu](#default-ecosystem-menu)
    - [default ecosystem page](#default-ecosystem-page)
    - [fuel rate](#fuel-rate)
    - [price create rate](#price-create-rate)
    - [full nodes](#full-nodes)
    - [gap between blocks](#gap-between-blocks)
    - [incorrect blocks per day](#incorrect-blocks-per-day)
    - [max block generation time](#max-block-generation-time)
    - [max block size](#max-block-size)
    - [max columns](#max-columns)
    - [max forsign size](#max-forsign-size)
    - [max fuel block](#max-fuel-block)
    - [max fuel tx](#max-fuel-tx)
    - [max indexes](#max-indexes)
    - [max tx block](#max-tx-block)
    - [max tx block per user](#max-tx-block-per-user)
    - [max tx size](#max-tx-size)
    - [node ban time](#node-ban-time)
    - [node ban time local](#node-ban-time-local)
    - [number of nodes](#number-of-nodes)
    - [price create ecosystem](#price-create-ecosystem)
    - [price create application](#price-create-application)
    - [price create table](#price-create-table)
    - [price create column](#price-create-column)
    - [price create contract](#price-create-contract)
    - [price create menu](#price-create-menu)
    - [price create page](#price-create-page)
    - [price exec address to id](#price-exec-address-to-id)
    - [price exec bind wallet](#price-exec-bind-wallet)
    - [price exec column condition](#price-exec-column-condition)
    - [price exec compile contract](#price-exec-compile-contract)
    - [price exec contains](#price-exec-contains)
    - [price exec contract by id](#price-exec-contract-by-id)
    - [price exec contract by name](#price-exec-contract-by-name)
    - [price exec contracts list](#price-exec-contracts-list)
    - [price exec create column](#price-exec-create-column)
    - [price exec create ecosystem](#price-exec-create-ecosystem)
    - [price exec create table](#price-exec-create-table)
    - [price exec ecosys param](#price-exec-ecosys-param)
    - [price exec eval](#price-exec-eval)
    - [price exec eval condition](#price-exec-eval-condition)
    - [price exec flush contract](#price-exec-flush-contract)
    - [price exec has prefix](#price-exec-has-prefix)
    - [price exec id to address](#price-exec-id-to-address)
    - [price exec is object](#price-exec-is-object)
    - [price exec join](#price-exec-join)
    - [price exec json to map](#price-exec-json-to-map)
    - [price exec len](#price-exec-len)
    - [price exec perm column](#price-exec-perm-column)
    - [price exec perm table](#price-exec-perm-table)
    - [price exec pub to id](#price-exec-pub-to-id)
    - [price exec replace](#price-exec-replace)
    - [price exec sha256](#price-exec-sha256)
    - [price exec size](#price-exec-size)
    - [price exec substr](#price-exec-substr)
    - [price exec sys fuel](#price-exec-sys-fuel)
    - [price exec sys param int](#price-exec-sys-param-int)
    - [price exec sys param string](#price-exec-sys-param-string)
    - [price exec table conditions](#price-exec-table-conditions)
    - [price exec unbind wallet](#price-exec-unbind-wallet)
    - [price exec update lang](#price-exec-update-lang)
    - [price exec validate condition](#price-exec-validate-condition)
    - [price tx data](#price-tx-data)
    - [price tx size wallet](#price-tx-size-wallet)
    - [rollback blocks](#rollback-blocks)

<!-- /TOC -->

### Depreciated {#depreciated}
廃止されたパラメータ:
* [blockchain url](#blockchain-url)

## プラットフォームパラメータの詳細 {#details-of-platform-parameters}

### ブロックリワード {#block-reward}
ブロックを生成する名誉ノードに付与されるIBXCトークンの数。

報酬を受け取るアカウントは、[full nodes](#full-nodes)パラメータで指定されます。

### ブロックチェーンURL {#blockchain-url}
廃止されました。

### 手数料の大きさ {#commission-size}
手数料のパーセンテージ。

手数料の金額は、コントラクトの実装コストの総額のパーセンテージとして計算されます。手数料トークンの単位はIBXCです。

手数料は、commission_walletパラメータで指定されたアカウントアドレスに送金されます。

### 手数料ウォレット {#commission-wallet}
手数料を受け取るアカウントアドレス。

手数料の金額は、commission_sizeパラメータで指定されます。

### デフォルトエコシステムコントラクト {#default-ecosystem-contract}
新しいエコシステムのデフォルトコントラクトのソースコード。

このコントラクトは、エコシステム作成者にアクセスを提供します。

### デフォルトエコシステムメニュー {#default-ecosystem-menu}
新しいエコシステムのデフォルトメニューのソースコード。

### デフォルトエコシステムページ {#default-ecosystem-page}
新しいエコシステムのデフォルトページのソースコード。

### 燃料レート {#fuel-rate}
燃料ユニットによる異なるエコシステムトークンの交換レート。

このパラメータの形式:

`[["ecosystem_id", "token_to_fuel_rate"], ["ecosystem_id2", "token_to_fuel_rate2"], ...]`

* ``ecosystem_id``

    エコシステムID。
* `token_to_fuel_rate`

    燃料ユニットによるトークンの交換レート。

例:

`[["1","1000000000000"], ["2", "1000"]]`

エコシステム1のトークン1つは1,000,000,000,000の燃料ユニットと交換されます。エコシステム2のトークン1つは1,000の燃料ユニットと交換されます。

エコシステム 1 の 1 トークンは 1,000,000,000,000 燃料ユニットと交換されます。 Ecosystem 2 の 1 トークンは 1,000 燃料ユニットと交換されます。

### 価格作成率 {#price-create-rate}
新しい要素の燃料比率。

### フルノード {#full-nodes}
ブロックチェーンネットワークの優等ノードのリスト。

このパラメータの形式は次のとおりです。

`
[{"api_address":"https://apihost1:port1","public_key":"nodepub1","tcp_address":"tcphost1:port2"},{"api_address":"https://apihost2:port1","public_key":"nodepub2","tcp_address":"tcphost2:port2"}]
`

* `tcp_address`

    ノードホストのTCPアドレスとポート。
    このホストアドレスに対してトランザクションや新しいブロックが送信され、最初のブロックから完全なブロックチェーンを取得するためにも使用できます。

* `api_address`

    ノードホストのAPIアドレスとポート。
    APIアドレスを介して、Weaverを使用せずにプラットフォームの任意の機能にアクセスすることができます。RESTful APIの詳細については、詳細をご覧ください。

* `public_key`

    ノードの公開鍵。これはブロックの署名を検証するために使用されます。

### gap between blocks {#gap-between-blocks}

ノード上で2つのブロックを生成する間隔（秒単位）。

ネットワーク内のすべてのノードは、新しいブロックを生成するタイミングを決定するためにこれを使用します。現在のノードがこの時間内に新しいブロックを生成しない場合、次の名誉ノードリスト内のノードにターンが移ります。

このパラメータの最小値は「1」秒です。

### incorrect blocks per day {#incorrect-blocks-per-day}

ノードが許可される1日あたりの不正なブロックの数。

ネットワーク内のノードの半数以上が同じ数の不正なブロックを受信すると、指定された時間内にノードはネットワークから禁止されます。 [node ban time]（#node-ban-time）を参照してください。

### max block generation time {#max-block-generation-time}

ブロック生成の最大時間（ミリ秒単位）。この時間内にブロックが正常に生成されない場合、タイムアウトエラーが報告されます。

### max block size {#max-block-size}
ブロックの最大サイズ（バイト単位）。

### max columns {#max-columns}
単一のテーブル内のフィールドの最大数です。

ただし、事前定義された `id` 列は含まれていません。

### max forsign size {#max-forsign-size}
トランザクションの署名の最大サイズ（バイト単位）。

### max fuel block {#max-fuel-block}
単一ブロックの最大燃料手数料の合計。

### max fuel tx {#max-fuel-tx}
単一トランザクションの最大燃料手数料。

### max indexes {#max-indexes}
単一のテーブル内のプライマリキーの最大数です。

### max tx block {#max-tx-block}
単一ブロック内のトランザクションの最大数。

### max tx block per user {#max-tx-block-per-user}
ブロック内のアカウントの最大トランザクション数。

### max tx size {#max-tx-size}
トランザクションの最大サイズ（バイト単位）。

### node ban time {#node-ban-time}
ノードのグローバルな禁止期間（ミリ秒単位）。

ネットワーク内のノードの半数以上が、特定のノードから[incorrect blocks per day](#incorrect-blocks-per-day)の数までの不正なブロックを受信すると、ノードはこの時間だけネットワークから禁止されます。

### node ban time local {#node-ban-time-local}
ノードのローカルな禁止期間（ミリ秒単位）。

ノードが別のノードから不正なブロックを受信した場合、この期間中は送信元のノードをローカルに禁止します。

### number of nodes {#number-of-nodes}
[full nodes](#full-nodes)パラメータの名誉ノードの最大数。

### price create ecosystem {#price-create-ecosystem}
新しい単一エコシステムを作成するための燃料手数料。

このパラメータは、`@1NewEcosystem` コントラクトの追加燃料手数料を定義します。コントラクトが実行されると、このコントラクトのさまざまな機能を実行するための燃料手数料も計算され、総コストに含まれます。

このパラメータは燃料単位で計算されます。[fuel rate](#fuel-rate)および[price create rate](#price-create-rate)を使用して、燃料単位をIBXCトークンに変換します。

### price create application {#price-create-application}
新しい単一アプリケーションを作成するための燃料手数料。

このパラメータは、`@1NewApplication` コントラクトの追加燃料手数料を定義します。コントラクトが実行されると
### price create contract {#price-create-column}
新しい単一契約を作成するための燃料手数料。

このパラメータは、`@1NewContract` コントラクトの追加燃料手数料を定義します。コントラクトが実行されると、このコントラクトのさまざまな機能を実行するための燃料手数料も計算され、総コストに含まれます。

このパラメータは燃料単位で計算されます。[fuel rate](#fuel-rate) および [price create rate](#price-create-rate) を使用して、燃料単位をIBXCトークンに変換します。

### price create menu {#price-create-menu}
新しい単一メニューを作成するための燃料手数料。

このパラメータは、`@1NewMenu` コントラクトの追加燃料手数料を定義します。コントラクトが実行されると、このコントラクトのさまざまな機能を実行するための燃料手数料も計算され、総コストに含まれます。

このパラメータは燃料単位で計算されます。[fuel rate](#fuel-rate) および [price create rate](#price-create-rate) を使用して、燃料単位をIBXCトークンに変換します。

### price create page {#price-create-page}
新しい単一ページを作成するための燃料手数料。

このパラメータは、`@1NewPage` コントラクトの追加燃料手数料を定義します。コントラクトが実行されると、このコントラクトのさまざまな機能を実行するための燃料手数料も計算され、総コストに含まれます。

このパラメータは燃料単位で計算されます。[fuel rate](#fuel-rate) および [price create rate](#price-create-rate) を使用して、燃料単位をIBXCトークンに変換します。

### price exec address to id {#price-exec-address-to-id}
`AddressToId()` 関数の燃料手数料。燃料単位で計算されます。

### price exec bind wallet {#price-exec-bind-wallet}
`Activate()` 関数の燃料手数料。燃料単位で計算されます。

### price exec column condition {#price-exec-column-condition}
`ColumnCondition()` 関数の燃料手数料。燃料単位で計算されます。

### price exec compile contract {#price-exec-compile-contract}
`CompileContract()` 関数の燃料手数料。燃料単位で計算されます。

### price exec contains {#price-exec-contains}
`Contains()` 関数の燃料手数料。燃料単位で計算されます。

### price exec contract by id {#price-exec-contract-by-id}
`GetContractById()` 関数の燃料手数料。燃料単位で計算されます。

### price exec contract by name {#price-exec-contract-by-name}
`GetContractByName()` 関数の燃料手数料。燃料単位で計算されます。

### price exec contracts list {#price-exec-contracts-list}
`ContractsList()` 関数の燃料手数料。燃料単位で計算されます。

### price exec create column {#price-exec-create-column}
`CreateColumn()` 関数の燃料手数料。燃料単位で計算されます。

### price exec create ecosystem {#price-exec-create-ecosystem}
`CreateEcosystem()` 関数の燃料手数料。燃料単位で計算されます。

### price exec create table {#price-exec-create-table}
`CreateTable()` 関数の燃料手数料。燃料単位で計算されます。

### price exec ecosys param {#price-exec-ecosys-param}
`EcosysParam()` 関数の燃料手数料。燃料単位で計算されます。

### price exec eval {#price-exec-eval}
`Eval()` 関数の燃料手数料。燃料単位で計算されます。

### price exec eval condition {#price-exec-eval-condition}
`EvalCondition()` 関数の燃料手数料。燃料単位で計算されます。

### price exec flush contract {#price-exec-flush-contract}
`FlushContract()` 関数の燃料手数料。燃料単位で計算されます。

### price exec has prefix {#price-exec-has-prefix}
`HasPrefix()` 関数の燃料手数料。燃料単位で計算されます。

### price exec id to address {#price-exec-id-to-address}
`IdToAddress()` 関数の燃料手数料。燃料単位で計算されます。

### price exec is object {#price-exec-is-object}
`IsObject()` 関数の燃料手数料。燃料単位で計算されます。

### price exec join {#price-exec-join}
`Join()` 関数の燃料手数料。燃料単位で計算されます。

### price exec json to map {#price-exec-json-to-map}
`JSONToMap()` 関数の燃料手数料。燃料単位で計算されます。

### price exec len {#price-exec-len}
`Len()` 関数の燃料手数料。燃料単位で計算されます。

### price exec perm column {#price-exec-perm-column}
`PermColumn()` 関数の燃料手数料。燃料単位で計算されます。

### price exec perm table {#price-exec-perm-table}
`PermTable()` 関数の燃料手数料。燃料単位で計算されます。

### price exec pub to id {#price-exec-pub-to-id}
`PubToID()` 関数の燃料手数料。燃料単位で計算されます。

### price exec replace {#price-exec-replace}
`Replace()` 関数の燃料手数料。燃料単位で計算されます。

### price exec sha256 {#price-exec-sha256}
`Sha256()` 関数の燃料手数料。燃料単位で計算されます。

### price exec size {#price-exec-size}
`Size()` 関数の燃料手数料。燃料単位で計算されます。

### price exec substr {#price-exec-substr}
`Substr()` 関数の燃料手数料。燃料単位で計算されます。

### price exec sys fuel {#price-exec-sys-fuel}
`SysFuel()` 関数の燃料手数料。燃料単位で計算されます。

### price exec sys param int {#price-exec-sys-param-int}
`SysParamInt()` 関数の燃料手数料。燃料単位で計算されます。

### price exec sys param string {#price-exec-sys-param-string}
`SysParamString()` 関数の燃料手数料。燃料単位で計算されます。

### price exec table conditions {#price-exec-table-conditions}
`TableConditions()` 関数の燃料手数料。燃料単位で計算されます。

### price exec unbind wallet {#price-exec-unbind-wallet}
`Deactivate()` 関数の燃料手数料。燃料単位で計算されます。

### price exec update lang {#price-exec-update-lang}
`UpdateLang()` 関数の燃料手数料。燃料単位で計算されます。

### price exec validate condition {#price-exec-validate-condition}
`ValidateCondition()` 関数の燃料手数料。燃料単位で計算されます。

### price tx data {#price-tx-data}
トランザクションごとの1024バイトあたりの燃料手数料。燃料単位で計算されます。

### price tx size wallet {#price-tx-size-wallet}
トランザクションサイズごとの手数料。単位はIBXCトークンです。

エコシステム1以外のエコシステムで契約を実装する場合、メガバイトごとのブロックスペースの使用料が比例して発生し、そのレートは *price tx size wallet* IBXCトークンです。

### rollback blocks {#rollback-blocks}
ブロックチェーンでフォークを検出した場合にロールバックできるブロックの最大数です。
