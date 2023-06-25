
# デーモン {#daemon}

このセクションでは、技術的な観点からIBaxノード同士がどのように相互作用するかについて説明します。

## サーバーデーモンについて {#about-the-server-daemon}
サーバーデーモンは、ネットワークノード上で実行される必要があります。これはさまざまなサーバー機能を実行し、IBaxのブロックチェーンプロトコルをサポートします。ブロックチェーンネットワークでは、デーモンはブロックやトランザクションの配布、新しいブロックの生成、受信したブロックやトランザクションの検証を行い、フォークの問題を回避することができます。

### 名誉ノードデーモン {#honor-node-daemon}
名誉ノードは次のサーバー デーモンを実行します。

* [BlockGenerator daemon](#blockgenerator-daemon)

    新しいブロックを生成します。

* [BlockCollection daemon](#blockcollection-daemon)

    他のノードから新しいブロックをダウンロードします。

* [Confirmations daemon](#confirmations-daemon)

    ノード上のブロックが他のほとんどのノードにも存在することを確認します。

* [Disseminator daemon](#disseminator-daemon)

    トランザクションとブロックを他の信頼ノードに配布します。

* QueueParserBlocks daemon

    キュー内のブロックで、他のノードからのブロックを含みます。

    ブロック処理ロジックは[BlockCollection daemon](#blockcollection-daemon)と同じです。

* QueueParserTx daemon

    キュー内のトランザクションを検証します。

* Scheduler daemon

    スケジュールされた契約を実行します。

### ガーディアンノードデーモン {#guardian-node-daemon}

ガーディアンノードは以下のサーバーデーモンを実行します：


* [BlockCollection daemon](#blockcollection-daemon)
* [Confirmations daemon](#confirmations-daemon)
* [Disseminator daemon](#disseminator-daemon)
* QueueParserTx
* Scheduler

## BlockCollection daemon {#blockcollection-daemon}

このデーモンはブロックをダウンロードし、他のネットワークノードとブロックチェーンを同期します。

### ブロックチェーンの同期 {#blockchain-synchronization}

このデーモンは、ブロックチェーンネットワーク内の最大ブロック高さを決定し、新しいブロックを要求し、ブロックチェーンのフォーク問題を解決することで、ブロックチェーンを同期します。

#### ブロックチェーンの更新を確認する {#check-for-blockchain-updates}

このデーモンは、現在のブロックIDからすべての信頼ノードにリクエストを送信します。

デーモンを実行しているノードの現在のブロックIDが、どの信頼ノードの現在のブロックIDよりも小さい場合、ブロックチェーンネットワークノードは時代遅れと見なされます。

#### 新しいブロックをダウンロードする {#download-new-blocks}

最大の現在のブロック高さを返すノードが最新のノードと見なされます。
デーモンは、すべての未知のブロックをダウンロードします。

#### フォーク問題の解決 {#solving-the-fork-issue}

ブロックチェーンでフォークが検出された場合、デーモンは共通の親ブロックまでブロックをダウンロードしてフォークを後退させます。
共通の親ブロックが見つかったら、デーモンを実行しているノードでブロックチェーンのロールバックが行われ、最新のブロックが含まれるまで正しいブロックがブロックチェーンに追加されます。

### テーブル {#tables-1}

BlocksCollectionデーモンは次のテーブルを使用します：

* block_chain
* transactions
* transactions_status
* info_block


### リクエスト {#request-1}

BlockCollectionデーモンは、他のデーモンに対して次のリクエストを送信します：

* [Type 10](#type-10)は、すべての信頼ノードの中で最大のブロックIDを指します。
* [Type 7](#type-7)は、最大のブロックIDを持つデータを指します。

## BlockGenerator daemon {#blockgenerator-daemon}

BlockGeneratorデーモンは新しいブロックを生成します。

### 事前検証 {#pre-verification}

BlockGeneratorデーモンは、ブロックチェーンの最新ブロックを分析して新しいブロック生成計画を立てます。

以下の条件が満たされている場合、新しいブロックを生成できます：

* 最新のブロックを生成したノードが、信頼ノードリスト内のノードであり、デーモンを実行していること。
* 最新の未検証ブロックが生成されてからの経過時間が最も短いこと。

### ブロック生成 {#block-generation}

デーモンによって生成される新しいブロックには、他のノードの[Disseminatorデーモン](#disseminator-daemon)から受け取ることができるすべての新しいトランザクションが含まれます。また、デーモンを実行しているノードで生成されることもあります。生成されたブロックは、ノードのデータベースに保存されます。


### テーブル {#tables-2}

BlockGeneratorデーモンは以下のテーブルを使用します：

* block_chain（新しいブロックを保存する）
* transactions
* transactions_status
* info_block

### リクエスト {#request-2}

BlockGeneratorデーモンは他のデーモンに対してリクエストを行いません。

## Disseminatorデーモン {#disseminator-daemon}

Disseminatorデーモンは、トランザクションとブロックをすべての信頼ノードに送信します。

### ガーディアンノード {#guardian-node}

ガーディアンノードで作業している場合、デーモンはノードで生成されたトランザクションをすべての信頼ノードに送信します。

### 信頼ノード {#honor-node}

信頼ノードで作業している場合、デーモンは生成されたブロックとトランザクションのハッシュをすべての信頼ノードに送信します。

その後、信頼ノードは自身が知らないトランザクションのリクエストに応答します。デーモンは完全なトランザクションデータを応答として送信します。

### テーブル {#tables-3}

Disseminatorデーモンは以下のテーブルを使用します：

* transactions

### リクエスト {#request-3}

Disseminatorデーモンは他のデーモンに対して次のリクエストを送信します：

* [Type 1](#type-1)：トランザクションとブロックのハッシュを信頼ノードに送信します。
* [Type 2](#type-2)：信頼ノードからトランザクションデータを受信します。

## Confirmationsデーモン {#confirmations-daemon}

Confirmationsデーモンは、自身のノードに存在するすべてのブロックがほとんどの他のノードに存在するかどうかをチェックします。

### ブロックの確認 {#block-confirmation}

ネットワーク内の複数のノードによって確認されたブロックは、確認済みのブロックと見なされます。

デーモンは、データベース内で現在確認されていない最初のブロックから順番にすべてのブロックを確認します。

各ブロックは以下の方法で確認されます：

* 確認中のブロックのIDを含むリクエストをすべての信頼ノードに送信します。
* すべての信頼ノードがブロックのハッシュに応答します。
* 応答されたハッシュがデーモンノード上のブロックのハッシュと一致する場合、確認カウンタの値が増加します。一致しない場合は、キャンセルカウンタの値が増加します。

### テーブル {#tables-4}

Confirmationsデーモンは以下のテーブルを使用します：

* confirmation
* info_block

### リクエスト {#request-4}

Confirmationsデーモンは他のデーモンに対して次のリクエストを送信します：

* [Type 4](#type-4)：信頼ノードからブロックのハッシュをリクエストします。

## TCPサービスプロトコル {#tcp-service-protocol}

TCPサービスプロトコルは、BlocksCollection、Disseminator、Confirmationデーモンへのリクエストにおいて、バイナリプロトコルを使用し、信頼ノードとガーディアンノード上で動作します。

## リクエストタイプ {#request-type}

各リクエストには、リクエストの最初の2バイトで定義されるタイプがあります。


## Type 1 {#type-1}

#### リクエスト送信元 {#request-sender-1}

このリクエストは[Disseminatorデーモン](#disseminator-daemon)によって送信されます。

#### リクエストデータ {#request-data-1}

トランザクションとブロックのハッシュ。

#### リクエスト処理 {#request-processing-1}

ブロックのハッシュがブロックキューに追加されます。

トランザクションのハッシュを分析および検証し、ノード上にまだ表示されていないトランザクションを選択します。

#### レスポンス {#response-1}

なし。リクエストの処理後、[Type 2](#type-2)のリクエストが発行されます。

## Type 2 {#type-2}

#### リクエスト送信元 {#request-sender-2}

このリクエストは[Disseminatorデーモン](#disseminator-daemon)によって送信されます。

#### リクエストデータ {#request-data-2}

データサイズを含むトランザクションデータ：

* data_size (4バイト)

  トランザクションデータのバイト数。

* data (data_sizeバイト)

  トランザクションデータ。

#### リクエスト処理 {#request-processing-2}

トランザクションを検証し、トランザクションキューに追加します。

#### レスポンス {#response-2}

なし。

## Type 4 {#type-4}

#### リクエスト送信元 {#request-sender-3}

このリクエストは[Confirmationsデーモン](#confirmations-daemon)によって送信されます。

#### リクエストデータ {#request-data-3}

ブロックID。

#### レスポンス {#response-3}

ブロックハッシュ。

このIDのブロックが存在しない場合は`0`を返します。

## Type 7 {#type-7}

#### リクエスト送信元 {#request-sender-4}

このリクエストは[BlockCollectionデーモン](#blockcollection-daemon)によって送信されます。

#### Request data {#request-data-4}

ブロックID。

* block_id (4 bytes)

#### レスポンス {#response-4}

ブロックデータを含む、データサイズを含むレスポンス。

* data_size (4バイト)

  ブロックデータのバイト数。

* data (data_sizeバイト)

  ブロックデータ。

このIDのブロックが存在しない場合、接続は閉じられます。

## Type 10 {#type-10}

#### リクエスト送信元 {#request-sender-5}

このリクエストは[BlockCollection daemon](#blockcollection-daemon)によって送信されます。

#### リクエストデータ {#request-data-5}

なし。

#### レスポンス {#response-5}

ブロックID。

* block_id (4 bytes)


