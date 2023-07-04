
# アプリケーション開発チュートリアル {#tutorial-for-application-development}

このセクションでは、IBAXネットワーク上でシンプルなアプリケーションを開発する方法を説明します。

- [目標](#the-goal)
- [パート1：環境](#part-1-the-environment)
- [パート2：スマートコントラクト](#part-2-contract)
    - [作成者アカウント](#creator-account)
    - [新規アプリケーション](#new-application)
    - [新規データベーステーブル](#new-database-table)
    - [新規スマートコントラクト](#new-contract)
        - [スマートコントラクトコード](#contract-code)
        - [スマートコントラクトの作成](#create-a-contract)
        - [スマートコントラクト名](#contract-name)
        - [データ](#data)
        - [条件](#conditions)
        - [アクション](#action)
        - [完全なスマートコントラクトコード](#full-contract-code)
        - [保存して実行](#save-and-run)
- [パート3：ページ](#part-3-page)
    - [新規フィールド](#new-field)
    - [スマートコントラクトの更新](#update-the-contract)
    - [ページ](#page)
        - [デザイナービュー](#designer-views)
        - [開発者ビュー](#developer-view)
        - [データベーステーブルからのデータの取得](#fetch-data-from-the-database-table)
	- [ページの全体コード](#full-page-code-1)
        - [ページの保存](#save-the-page)
- [パート4：アプリケーション](#part-4-application)
    - [メニュー](#menu)
        - [メニューアイテムの追加](#add-a-menu-item)
        - [新しいメニューアイテムのテスト](#test-the-new-menu-item)
    - [メッセージの送信](#send-a-message)
        - [フォーム](#form)
    - [フォームのナビゲーション](#form-navigation)
        - [ナビゲーションボタン](#navigation-buttons)
        - [変数](#variables)
        - [エントリ数](#entry-count)
        - [テーブルオフセット](#table-offset)
        - [ボタンコード](#button-code)
        - [ページのリフレッシュ](#page-refreshing)
    - [ページ全体のコード](#full-page-code-2)
- [結論](#conclusions)


## 目標 {#the-goal}

チュートリアルでは、最初はシンプルな機能から始めて、徐々に複雑さを増していきます。

アプリケーションの最終バージョンでは、いくつかのシンプルなメッセージ（文字列）がデータベーステーブルに格納されます。このテーブルには、送信者のタイムスタンプとアカウント識別子も含まれます。ユーザーはメッセージの一覧を表示し、エコシステムのメニューからアクセスできるアプリケーションページから新しいメッセージを追加することができます。

## パート1：環境 {#part-1-the-environment}

**Weaver**

WeaverはIBAXの唯一のクライアントであり、すべてのユーザーとエコシステムの役割に対して機能を提供します。アプリケーション開発者は、Weaverを使用してアプリケーションを開発およびテストできます。エコシステムの管理者はエコシステムを管理し、ユーザーはエコシステムと対話できます。

このチュートリアルでは、Weaverを使用してスマートコントラクトのコーディングやページテンプレートの作成など、すべての操作を行います。Weaverはスマートコントラクトコードの復元、保存、実行、データ構造（データベーステーブル）の管理、アクセス許可の割り当て、アプリケーションの作成などもサポートしています。

各ノードには独自のWeaverインスタンスがあります。

## パート2：スマートコントラクト {#part-2-contract}

最初のシンプルなアプリケーションは "Hello, World!" です。

> 注意
>
> このアプリケーションでは、文字列はデータベーステーブルに格納され、ユーザーページはありません。

### 作成者アカウント {#creator-account}

開発者の役割を持つアカウントには、エコシステムの`root`特権が割り当てられます。デフォルトでは、この役割はすべてのアクションにアクセスできます。新しいエコシステムでは、作成者アカウントには管理者の役割が割り当てられます。作成者アカウントを使用して、新しいアプリケーションやデータベーステーブルなど、エコシステムの重要な変更を行う必要があります。

作成者アカウントでエコシステムにログインします。

### 新規アプリケーション {#new-application}

エコシステムの作成者としてログインしたら、新しいアプリケーションを作成できます。

新しいアプリケーションを作成します：

1. 開発者タブに移動してください。

2. 左側のメニューで「アプリケーション」を選択してください。

3. アプリケーションページで「新規作成」を選択してください。

4. 「名前」フィールドにアプリケーション名を指定してください。

5. 条件を`true`に設定してください。


`true`は、誰でもアプリケーションに変更を加えることができることを意味します。

もう一つのオプションは`ContractConditions("MainCondition")`で、これは作成者以外はアプリケーションに変更を加えることができません。

6. 特定のアプリケーションの「名前」フィールドをクリックしてアクティブにします。

> 注意
>
> デベロッパータブのアプリケーションをクリックすると、関連するリソースにアクセスできますが、エコシステムには影響しません。どのアプリケーションを選んでも、エコシステムのすべてのアプリケーションにアクセスできます。


### 新しいデータベーステーブル {#new-database-table}

データを保存するために、Weaverでアプリケーションのためのデータベーステーブルを作成します。

データベーステーブルを作成する手順：

1. デベロッパータブで、「アプリケーション - 名前 > データベーステーブル」を選択します。

選択したアプリケーションに関連するすべてのデータベーステーブルが表示されます。リストが空の場合は、まだアプリケーションにデータベーステーブルが作成されていません。

2. 「新規」をクリックします。

Weaverは、新しいデータベーステーブルを作成するためのページを表示します。

3. 「名前」フィールドに名前を指定します。

このチュートリアルでは、データベーステーブルの名前は`apptable`とします。

4. `message`列を追加し、そのタイプを`Text`に設定します。

このテーブルには、`id`（事前定義済み）と`message`の2つの列が必要です。後でさらに列を追加します。

5. 読み取りと書き込みの権限について、各フィールドを`true`に設定します。

これにより、誰でもデータベーステーブルにエントリを挿入、更新、列を追加し、エントリデータを読み取ることができます。

オプションとして、読み取りと書き込みの権限を作成者アカウントに予約することもできます。その場合は、このフィールドを`ContractConditions("MainCondition")`に設定します。

### 新しいスマートコントラクト {#new-contract}

#### スマートコントラクトコード {#contract-code}

各スマートコントラクトには3つのパートがあります。詳細については、[スマートコントラクトの構造](../topics/script.md#contract-structure)をご覧ください。

#### スマートコントラクトの作成 {#create-a-contract}

1. デベロッパータブで、「アプリケーション - 名前 > スマートコントラクト」を選択します。

アプリケーションに関連するすべてのスマートコントラクトがここに表示されます。新しいアプリケーションの場合は、リストは空です。

2. 「新規」をクリックします。

エディタに新しいスマートコントラクトのテンプレートが表示されます。

以下は空のスマートコントラクトテンプレートの例です：


```
contract ... {
    data {

    }
    conditions {

    }
    action {

    }
}
```

#### スマートコントラクト名 {#contract-name}

まず、スマートコントラクト名を指定してください。

```  
    contract AppContract {

    }
```

#### データ {#data}

`data`セクションを入力してください。

以下の例では、`Message`は変数名を表し、`string`は変数の型を表しています。


```
    data {
        Message string
    }
```

#### 条件 {#conditions}

`conditions`セクションを入力してください。空の文字列を回避するための簡単な検証条件を設定します。もし`Message`の長さが`0`の場合、スマートコントラクトを実装する際に予め定義された警告メッセージがトリガーされます。

```
conditions {
    // avoid writing empty strings
    if Size($Message) == 0 {
        error "Message is empty"
    }
}
```

#### アクション  {#action}

`action`セクションを入力してください。簡単なアクションとして、`Message`をデータテーブルに書き込むことがあります。

```
    action {
        DBInsert("apptable", {message: $Message})
    }
```

#### フルコントラクトコード  {#full-contract-code}

以下にフルコントラクトコードを示します。

IBAXの全てのスマートコントラクトは、`data`、`conditions`、`action`のセクションを含めてこのように構築されます。

```
contract AppContract {
    data {
        Message string
    }
    conditions {
        // avoid writing empty strings
        if Size($Message) == 0 {
            error "Message is empty"
        }
    }
    action {
        DBInsert("apptable", {message: $Message})
    }
}
```
#### 保存して実行  {#save-and-run}

以下の手順でスマートコントラクトのテストを準備します：

1. エディタのメニューで「保存」をクリックしてください；

 これにより、スマートコントラクトコードが更新され、更新されたバージョンがすべてのネットワークノードで利用可能になります。

2. エディタのメニューで「実行」をクリックしてください；

 これにより、スマートコントラクトを実行するページが表示されます。

3. 「スマートコントラクトを実行する」ページで、スマートコントラクトの入力パラメータを入力してください；

 このスマートコントラクトはパラメータ `Message` を持っているため、Keyフィールドに `Message` を、Valueフィールドに `Hello, World` を設定してください。

4. 「実行」をクリックしてください。

 結果は右側に表示されます。

もし文字列を正常に追加できた場合、結果にはトランザクションの変更を示すブロックIDと結果コードが含まれます。

```
{
 "block": "31",
 "result": null
}
```

## パート3：ページ {#part-3-page}

スマートコントラクトが有効になったら、それを何か有用なものに拡張する時が来ました。このパートでは、UIやその他の機能を実装します。

注意

このアプリケーションでは、文字列はログのエントリのようにデータベーステーブルに保存されます。各文字列には著者とタイムスタンプがあります。

ユーザーはアプリケーションページで保存されている文字列のリストを表示できます。これは単純なフォームとして表示されます。

### 新しいフィールド {#new-field}

前と同様に、データベーステーブルを編集します。開発者タブ > アプリケーション - 名前 > データベーステーブルページに移動してください。

以下のフィールドを `apptable` に追加してください：

* `author`、フィールドタイプは `Number`、Changeを `true` に設定してください。

 このフィールドには著者アカウントの識別子が格納されます。

* `timestamp`、フィールドタイプは `Date/Time`、Changeを `true` に設定してください。

### スマートコントラクトの更新 {#update-the-contract}

スマートコントラクトコードを更新して、著者IDとタイムスタンプを処理します。

著者IDはエコシステムのアカウントIDです。タイムスタンプはスマートコントラクトの実行日時をUnix時間形式で表します。

両方の値は[事前定義された変数](../topics/script.md#variables)によって提供され、入力や検証の必要はないため、アクションの部分でのみ更新されます。

スマートコントラクトを更新して、メッセージを追加する際に著者IDとタイムスタンプをデータベーステーブルに書き込むようにしてください。著者IDは `$key_id` で定義され、タイムスタンプは `$time` で定義されます。


```
action {
 DBInsert("apptable", {message: $Message, author: $key_id, timestamp: $time})
}
```

### ページ {#page}

アプリケーションページは、データベーステーブルに保存されたメッセージが表示されるシンプルなページです。

他のリソースと同様に、WeaverでUIページを作成できます。

1. 開発者タブに移動し、アプリケーション - 名前 > ページをクリックしてください。

2. 「新規作成」をクリックしてください。
   ビジュアルデザイナーが新しいタブで開かれます。

#### デザイナービュー {#designer-views}

デフォルトのページは空です。事前に定義された構造を使用してページを素早く埋めることができます。

基本的なテーブルを作成します。

1. 右側のビューセレクターで「デザイナー」をクリックしてください。
   ビューがビジュアルデザイナーに切り替わります。

2. 左側のメニューで「ヘッダー付きテーブル」を選択し、ページにドラッグします。
   複数の要素を含むテーブルがページに表示されます。

#### 開発者ビュー {#developer-view}

IBAXのユーザーページは[テンプレート言語](../topics/templates2.md)でコード化されているため、ページコードを記述する際には開発者ビューに切り替えてください。

開発者ビューに切り替えてください。

1. 右側のビューセレクターで「開発者」をクリックしてください。
   ページコードを保持するタブがあるエディタに切り替わります。

#### データベーステーブルからデータを取得する {#fetch-data-from-the-database-table}

現時点では、ページテンプレートには何も行われていません。次に、コードを更新してページが`apptable`からデータを表示できるようにします。

1. [DBFind](../topics/script.md#dbfind)関数を使用してデータベーステーブルからデータを取得してください。

   以下の例では、この関数呼び出しは`apptable`からデータを取得します。データは`src_table`に配置され、タイムスタンプフィールドでソートされます。`src_table`は後でテーブルビューのページのデータソースとして使用されます。


 ```
    DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)
 ```

2. `src_table` からのデータを表示するには、`Table` 関数のデータ ソースおよびヘッダーとして指定します。

```
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
```

3. 右側のビューセレクターで「プレビュー」をクリックして、データが正しく表示されるか確認してください。

#### ページの全体コード {#full-page-code-1}

以下はこのパートの完全なページコードです。この基本的なページは後で拡張されます。


```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)

Div(Class: panel panel-primary) {
    Div(Class: panel-heading, Body: Table block)
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
    Div(Class: panel-footer text-right) {
    Button(Class: btn btn-primary, Contract: ContractName, Body: More)
    }
}

```

#### ページを保存する {#save-the-page}

ページを保存するには、保存をクリックしてください：

1. 「ページ名」フィールドに`AppPage`または任意の名前を指定してください。

2. メニューで`default_menu`を選択してください。

3. 条件を`true`に設定してください。

4. OKをクリックしてください。

## パート4：アプリケーション {#part-4-application}

前のセクションでは、スマートコントラクトを作成し、データを保存するためのテーブルを作成し、そのデータを表示するための基本的なUIページを作成しました。

このパートでは、アプリケーションを最終的に完成させ、外観や動作が実際のアプリケーションに類似するようにします。

### メニュー {#menu}

ページはメニューにリンクする必要があります。たとえば、ホームタブに表示される`default_page`は、デフォルトのエコシステムメニュー`default_menu`にリンクされています。

このアプリケーションチュートリアルは非常にシンプルです（1つのページしかないため）、それに個別のメニューを作成する必要はありません。デフォルトメニューの新しいメニューアイテムで十分です。

> 注意
>
> ページのプロパティを編集して、ページメニューを定義することもできます。開発者タブ > アプリケーション - 名前 > ページでページのプロパティを編集します。たとえば、アプリに複数のページがある場合、これらのページ間を移動するためのメニューを作成し、それをアプリのすべてのページに割り当てる必要があります。

#### メニューアイテムの追加 {#add-a-menu-item}

他のリソースと同様に、メニューはWeaverで作成および編集できます：

1. 開発者タブに移動し、メニューをクリックしてください。

2. `default_menu`のエントリの「名前」をクリックしてください。
   エディタに新しいタブが開きます。

3. テンプレートの末尾に新しいメニューアイテムを追加してください。このメニューアイテムは、アプリケーションページを開くためのリンクと、そのアイコンは[FontAwesome](https://fontawesome.com/icons)アイコンセットから取得されます。

```
    MenuItem(Title:Messages, Page:AppPage, Icon:"fa fa-envelope")
```

4. 保存をクリックしてください。

#### 新しいメニューアイテムのテスト {#test-the-new-menu-item}

新しいメニューアイテムが有効かどうかを確認してください：

1. ホームタブを開いてください。

2. メニューで「更新」をクリックしてください。
   「メッセージ」のヘッダーが表示されます。

3. 「メッセージ」をクリックしてください。
   アプリケーションページが開かれます。

### メッセージの送信 {#send-a-message}

Logicorのボタンは、パラメータに応じてスマートコントラクトを実行したりページを開いたりするために使用できます。

[Button](../topics/templates2.md#button)関数には2つのスマートコントラクトパラメータがあります：

*  `Contract`

     有効化されたスマートコントラクトの名前。

*  `Params`

    コントラクトのパラメータを入力します。

#### フォーム {#form}

スマートコントラクトにデータを送信するために、アプリケーションページにフォームを追加します。このフォームには、メッセージ用の入力フィールドとスマートコントラクトAppContractをアクティブにするためのボタンが必要です。

以下はこの種のフォームの例です。これは独自の[Div](../topics/templates2.md#div)内にネストされています。フォームビューを含むDiv要素の後に配置されており、[Input](../topics/templates2.md#input)フィールドには事前に定義された名前`message_input`が設定されています。ボタンはこの名前を使用して`Message`の値をスマートコントラクトに送信します。最後に、[Val](../topics/templates2.md#calling-contracts)関数を使用して入力フィールドの値を取得します。


```
Div(Class: panel panel-primary) {
 Form() {
 Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
 Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)")
 }
}
```

実際にメッセージを送信してこの新機能をテストすると、フォームがリフレッシュされないことに気付くかもしれません。これについては[ページのリフレッシュ](#page-refreshing)で説明します。

### フォームのナビゲーション {#form-navigation}

デフォルトのビューでは、ページ上のフォームは最初のページで25のエントリしか表示できません。そのため、いくつかのシンプルなボタンを追加して、ユーザーをすべてのフォームエントリにナビゲートできるようにします。

#### ナビゲーションボタン {#navigation-buttons}

2つのナビゲーションボタンがあり、それぞれがアプリケーションページをリロードしてパラメータを渡すことができます。

* 「前へ」ボタンは最初の25のエントリを表示します。他のエントリがない場合、ボタンは表示されません。

* 「次へ」ボタンは次の25のエントリを表示します。他のエントリがない場合、ボタンは表示されません。

#### 変数 {#variables}

ナビゲーションボタンには、テーブルビューの状態を格納するための2つの変数が必要です：

* `#table_view_offset#`

 この変数は現在のテーブルビューのオフセットを格納します。

 ナビゲーションボタンは、ページがリロードされる際にこの変数をパラメータとして渡します。

* `#record_count#`

 この変数はテーブル内のエントリの総数を格納します。

 値は計算されます。

#### エントリ数のカウント {#entry-count}

`#record_count#`をカウントするために、既存の[DBFind](../topics/script.md#dbfind)関数呼び出しを修正してください。`.count()`呼び出しで指定された変数にエントリ数が格納されます。


```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count)
```

#### テーブルオフセット {#table-offset}

テーブルビューのオフセットは、ページが開かれる際にページに渡す必要があります。`#table_view_offset#`に値が設定されない場合は、0に設定してください。

以下のコードをページの先頭に追加してください。

```
If(GetVar(table_view_offset)){

}.Else{
    SetVar(table_view_offset, 0)
}
```

[DBFind](../topics/script.md#dbfind) 関数呼び出しを再度変更します。 今回は、新しいテーブル ビュー オフセットを使用する必要があります。

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
```

#### ボタンのコード {#button-code}

フッターを定義する[Div](../topics/templates2.md#div)関数呼び出し`Div(Class:panel-footer text-right)`を見つけてください。その中にボタンのコードを追加してください。

```
Div(Class: panel-footer text-right) {
}
```

*Previous* ボタンは、返す次へが少なくとも 1 つある場合にのみ表示されます。 ボタンを追加すると、ページの新しいテーブル ビュー オフセット `offset_previous` が計算されます。 パラメータは、再度開かれたページの `PageParams` に渡されます。

```
If(#table_view_offset# >= 25) {
    SetVar(offset_previous, Calculate(#table_view_offset# - 25))
    Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
}
```

「次へ」ボタンは、レコードの総数がページに表示されている数より大きい場合にのみ表示されます。 ボタンが追加されると、ページの新しいテーブル ビュー オフセット `offset_next` が計算されます。 パラメータは、再度開かれたページの `PageParams` に渡されます。

```
If(#record_count# >= Calculate(#table_view_offset# + 25)) {
    SetVar(offset_next, Calculate(#table_view_offset# + 25))
    Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
}
```

これらのボタンを追加した後、ページを保存し、ホーム > メッセージのメニューアイテムからテストしてください。

#### ページのリフレッシュ {#page-refreshing}

実装する最後の機能は、ページ上のテーブルを自動的に更新することです。ユーザーが新しいメッセージを送信すると、テーブルに表示される必要があります。

スマートコントラクトの実装に加えて、同じ効果を得るためにSendボタンを使用して現在のページを再オープンすることもできます。`#table_view_offset#`は変更せずにページに渡す必要があります。

Sendボタンに`Page`と`PageParams`を追加し、コードは次のようになります：


```
Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
```


#### ページ全体のコード {#full-page-code-2}

このパートでは、アプリケーションページに多くの変更が加えられます。以下はアプリケーションページの完全なコードです。

```
If(GetVar(table_view_offset)){
}.Else{
    SetVar(table_view_offset, 0)
}
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
    Div(Class: panel panel-primary) {
        Div(Class: panel-heading, Body: Table block)
        Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
        Div(Class: panel-footer text-right) {
            If(#table_view_offset# >= 25) {
                SetVar(offset_previous, Calculate(#table_view_offset# - 25))
                Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
            }
            If(#record_count# >= Calculate(#table_view_offset# + 25)) {
                SetVar(offset_next, Calculate(#table_view_offset# + 25))
                Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
            }
        }
    }
    Div(Class: panel panel-primary) {
    Form() {
        Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
        Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
    }
}
```

## 結論 {#conclusions}

このチュートリアルでは、レイアウトスタイル、アクセス権限管理、アプリケーションとリソースの相互作用など、アプリケーション開発者にとって重要な他のトピックについては説明しませんでした。これはエコシステム向けの基本的なアプリケーションの作成方法を紹介しています。これらの高度なトピックに関する詳細な情報については、他の関連文書を参照してください。

