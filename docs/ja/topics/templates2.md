# テンプレート言語

   - [ページ構成](#pページ構成)
    - [テンプレートエンジン](#テンプレートエンジン)
    - [ページの作成](#ページの作成)
      - [ビジュアルページデザイナー](#ビジュアルページデザイナー)
      - [適用可能なスタイル](#適用可能なスタイル)
      - [ページモジュール](#ページモジュール)
      - [言語リソースエディタ](#言語リソースエディタ)
  - [Logicalテンプレート言語](#Logicalテンプレート言語)
    - [Logicalの概要](#lLogicalの概要)
      - [PageParamsを使用してパラメータをページに渡す](#PageParamsを使用してパラメータをページに渡す)
      - [スマートコントラクトの呼び出し](#スマートコントラクトの呼び出し)
  - [Logicalの機能分類](#Logicalの機能分類)
    - [変数の操作:](#変数の操作)
    - [ナビゲーション操作:](#nナビゲーション操作)
    - [データ操作:](#データ操作)
    - [データのプレゼンテーション:](#データのプレゼンテーション)
    - [データの受け入れ:](#データの受け入れ)
    - [データフォーマット要素:](#データフォーマット要素)
    - [フォーム要素:](#フォーム要素)
    - [コードブロックに対する操作:](#コードブロックに対する操作)
  - [Logicor関数のリファレンス](#logicor関数のリファレンス)
    - [Address](#address)
    - [AddressToId](#addresstoid)
    - [AddToolButton](#addtoolbutton)
    - [And](#and)
    - [AppParam](#appparam)
    - [ArrayToSource](#arraytosource)
    - [Binary](#binary)
    - [Button](#button)
    - [Calculate](#calculate)
    - [Chart](#chart)
    - [CmpTime](#cmptime)
    - [Code](#code)
    - [CodeAsIs](#codeasis)
    - [Data](#data)
    - [Custom](#custom)
    - [DateTime](#datetime)
    - [DBFind](#dbfind)
    - [Div](#div)
    - [EcosysParam](#ecosysparam)
    - [Em](#em)
    - [ForList](#forlist)
    - [Form](#form)
    - [GetColumnType](#getcolumntype)
    - [GetHistory](#gethistory)
    - [GetVar](#getvar)
    - [Hint](#hint)
    - [If](#if)
    - [Image](#image)
    - [ImageInput](#imageinput)
    - [Include](#include)
    - [Input](#input)
    - [InputErr](#inputerr)
    - [InputMap](#inputmap)
    - [JsonToSource](#jsontosource)
    - [Label](#label)
    - [LangRes](#langres)
    - [LinkPage](#linkpage)
    - [Map](#map)
    - [MenuGroup](#menugroup)
    - [MenuItem](#menuitem)
    - [Money](#money)
    - [Or](#or)
    - [P](#p)
    - [QRcode](#qrcode)
    - [RadioGroup](#radiogroup)
    - [Range](#range)
    - [Select](#select)
    - [SetTitle](#settitle)
    - [SetVar](#setvar)
    - [Span](#span)
    - [Strong](#strong)
    - [SysParam](#sysparam)
    - [Table](#table)
    - [TransactionInfo](#transactioninfo)
    - [VarAsIs](#varasis)
  - [App styles for mobile devices](#app-styles-for-mobile-devices)
    - [Layout](#layout)
      - [Title](#title)
      - [Strong-class names](#strong-class-names)
      - [Color](#color)
      - [Grid](#grid)
      - [Panel](#panel)
      - [Form](#form-app)
      - [Button](#button-app)
      - [Icon](#icon)

## ページ構成

Weaver の統合開発環境 (IDE) は、JavaScript ライブラリである React を使用して作成されます。 ページエディターとビジュアルページデザイナーが備わっています。 ページはアプリケーションの基本的な部分であり、テーブルからのデータの取得と表示、ユーザー入力データを受信するフォームの作成、契約へのデータの受け渡し、およびアプリケーション ページ間の移動に使用されます。 契約書と同様に、ページはブロックチェーンに保存されるため、ソフトウェア クライアントに読み込まれる際の改ざん防止が保証されます。

### テンプレートエンジン

ページ要素 (ページとメニュー) は、開発者が Weaver のページ エディターのテンプレート言語を使用して検証ノードのテンプレート エンジンで形成します。 すべてのページは、IBAX の開発チームによって開発された Logicor 言語を使用して構築されています。 content/... API コマンドを使用して、ネットワーク上のノードからページをリクエストします。 この種のリクエストに対してテンプレート エンジンが応答として送信するのは、HTML ページではなく、テンプレートの構造に従ってツリーを形成する HTML タグで構成される JSON コードです。 テンプレート エンジンをテストする場合は、[content](../reference/api2.md#content) API コマンドを参照できます。

### ページの作成

ページ エディターを使用してページを作成および編集できます。ページ エディターは、Weaver 管理ツールの [ページ] セクションにあります。 エディターは次の目的で使用できます。

* ページ コードを記述し、Logicor テンプレート言語のキーワードを強調表示します。
* ページ上のメニューを選択して表示します。
* メニューページを編集します。
* ContractConditions関数に権限のある契約名を指定するか、変更条件に直接アクセス権限を指定してページ変更権限を設定します。
* ビジュアル ページ デザイナーを開始します。
* プレビューページ。

#### ビジュアルページデザイナー

ビジュアル ページ デザイナーを使用すると、Logicor 言語のインターフェイス コードを使用せずにページ レイアウトを作成できます。 これを使用すると、フォーム要素やテキストをページ上でドラッグ アンド ドロップすることで位置を設定したり、ページ ブロックのサイズを設定したりできます。 これは、タイトル、フォーム、情報パネルなどの標準データ モデルを表示するための、すぐに使用できるブロックのセットを提供します。 ビジュアル ページ デザイナーでページを作成した後、ページ エディターでデータと条件構造を受信するためのプログラム ロジックを作成できます。 将来的には、追加機能を備えたビジュアル ページ デザイナーを作成する予定です。

#### 適用可能なスタイル

デフォルトでは、ページは Angular のブートストラップ角度スタイルで表示されます。 ユーザーはニーズに応じて独自のスタイルを作成できます。 スタイルは、エコシステム パラメーター テーブルのスタイル パラメーター スタイルシートに保存されます。

#### ページモジュール

複数のページでコード ブロックを使用するには、ページ モジュールを作成してそれを保持し、ページ コードに埋め込むことができます。 ページ モジュールは、Weaver のモジュール ブロックで作成および編集できます。 ページと同様に、編集権限を定義できます。

#### 言語リソースエディタ

Weaver には、Logicor テンプレート言語の関数 **LangRes** を使用したページ ローカリゼーションのメカニズムが含まれています。 ページ上の言語リソース タグを、ソフトウェア クライアントまたはブラウザでユーザーが選択した言語に対応するテキスト行に置き換えることができます。 **LangRes** 関数の代わりに、短い構文 **$lable$** を使用できます。 コントラクトによって開始されたポップアップ内のメッセージの翻訳は、Needle の **LangRes** 関数によって実行されます。

Weaver の言語リソース セクションで言語リソースを作成および編集できます。 言語リソースは、ラベル名とその名前のさまざまな言語での対応する翻訳、および対応する 2 文字の言語識別子 (EN、ZH、JP など) で構成されます。

言語リソースの追加および変更の権限は、他のテーブルと同様に定義できます。

## Logicalテンプレート言語

ロジック関数は次の操作を提供します。

* データベースからの値の取得: ```DBFind```、データベースから取得したデータを表とグラフとして表示します。
* 変数値の割り当てと表示のためのデータ操作: ```SetVar, GetVar, Data```;
* 日付/時刻値の表示と比較: ```DateTime, Now, CmpTime```;
* さまざまなユーザー データ入力フィールドを使用してフォームを構築します: ```Form、ImageInput、Input、RadioGroup、Select```;
* エラー メッセージを表示して、フォーム フィールドのデータを検証します。
* ナビゲーション要素の表示: ```AddToolButton、LinkPage、Button```;
* コントラクトの呼び出し: ```Button```;
* さまざまなタグを含む HTML ページ レイアウト要素を作成し、特定の CSS クラス: ```Div、P、Span など``` を選択します。
* ページへの画像の埋め込みとアンロード: ```Image, ImageInput```;
* ページレイアウトフラグメントの表示条件: ```If, ElseIf, Else```;
* マルチレベルメニューの作成;
* ページのローカリゼーション。

### Logicalの概要

Logical ページ テンプレート言語は、関数が別の関数 ``FuncName(parameters)`` を呼び出したり、関数を相互にネストしたりできる関数型言語です。 パラメータを引用符なしで指定したり、不要なパラメータを削除したりできます。

パラメータにカンマが含まれる場合は、引用符 (逆引用符または二重引用符) で囲む必要があります。 関数にパラメータを 1 つだけ指定できる場合は、引用符なしでコンマを使用できます。 さらに、パラメータに対になっていない右括弧がある場合は、引用符を使用する必要があります。

パラメータを引用符で囲んで、パラメータ自体に引用符が含まれている場合は、テキスト内で異なる種類の引用符または複数の引用符を使用できます。

関数定義では、各パラメータに特定の名前が付けられます。 関数を呼び出して、宣言の順序でパラメータを指定することも、任意のパラメータ セットを任意の名前の順序で指定することもできます (```Parameter_name: Parameter_value```)。 この方法を使用すると、現在のテンプレートとの互換性を損なうことなく、新しい関数パラメータを安全に追加できます。

関数はテキストを返したり、HTML 要素を生成したり (例えば ```Input```)、またはネストされた HTML 要素を含む HTML 要素を作成したりできます (```Div, P, Span```)。 後者の場合、事前定義された名前 Body を持つパラメーターを使用して、ネストされた要素を定義します。 たとえば、2 つの div を別の div にネストすると、次のようになります。

Body パラメータに記述されたネストされた要素を定義するには、```FuncName(...){...}``` という表記法を使用できます。 ネストされた要素は中括弧で指定する必要があります。

同じ関数を連続して複数回指定する必要がある場合は、毎回名前を記述する代わりにドット `.` を使用できます。 たとえば、次のようなものは同じです。

この言語では SetVar 関数で変数を代入し、`#name#` でその値を参照することができます。

エコシステムの言語リソースを参照するには、「$langres$」を使用できます。ここで、langres は言語名です。

次の変数が事前定義されています。

* `#key_id#` - 現在のユーザーのアカウント アドレス。
* `#ecosystem_id#` - 現在のエコシステム ID。
* `#guest_key#` - ゲスト アカウントのアドレス。
* `#isMobile#` - 1，Weaver がモバイル デバイス上で実行される場合。

#### PageParamsを使用してパラメータをページに渡す

多くの関数は、新しいページにリダイレクトするときにパラメータを渡すために使用される PageParams パラメータをサポートしています。 例: PageParams: `"param1=value1,param2=value2"`。 パラメーター値は、単純な文字列または参照値を持つ変数にすることができます。 パラメータをページに渡すと、パラメータ名を持つ変数が作成されます。 `#param1#` と `#param2#`。

* `PageParams: "hello=world"` - 新しいページは、値として world を持つ hello パラメータを受け取ります。
* `PageParams: "hello=#world#"` - 新しいページは、world 変数の値を持つ hello パラメータを受け取ります。

さらに、Val 関数は、リダイレクトで指定されたフォームからデータを取得できます。

* `PageParams: "hello=Val(world)"` - 新しいページは、world フォーム要素の値を持つ hello パラメーターを受け取ります。

#### スマートコントラクトの呼び出し

Logicalor は、フォーム内の Button 関数をクリックすることでコントラクト呼び出しを実装します。 イベントがトリガーされると、ユーザーがページ上のフォーム フィールドに入力したデータがコントラクトに渡されます。 フォームのフィールド名が、呼び出されたコントラクトのデータ セクションの変数名に対応する場合、データは自動的に転送されます。 Button 関数を使用すると、ユーザーがコントラクトの実行を確認するためのモーダル ウィンドウを開いて、コントラクトが正常に実行されたときに指定されたページへのリダイレクトを開始し、特定のパラメーターをページに渡すことができます。

## Logicalの機能分類

### 変数の操作: 

|        |        |         |
| ------ | ------ | ------- |
| [GetVar](#getvar) | [SetVar](#setvar) | [VarAsIs](#varasis) |

### ナビゲーション操作: 

|               |        |          |
| ------------- | ------ | -------- |
| [AddToolButton](#addtoolbutton) | [Button](#button) | [LinkPage](#linkpage) |

### データ操作: 

|           |          |       |
| --------- | -------- | ----- |
| [Calculate](#calculate) | [DateTime](#datetime) | [Money](#money) |
| [CmpTime](#cmptime)   |          |       |

### データのプレゼンテーション: 

|          |           |          |
| -------- | --------- | -------- |
| [Code](#code)     | [Hint](#hint)      | [MenuItem](#menuitem) |
| [CodeAsIs](#codeasis) | [Image](#image)     | [QRcode](#qrcode)   |
| [Chart](#chart)    | [MenuGroup](#menugroup) | [Table](#table)    |
| [ForList](#forlist)  |           |          |

### データの受け入れ: 

|             |               |                 |
| ----------- | ------------- | --------------- |
| [Address](#address)     | [EcosysParam](#ecosysparam)   | [LangRes](#langres)         |
| [AddressToId](#addresstoid) | [GetHistory](#gethistory)    | [Range](#range)           |
| [AppParam](#appparam)    | [GetColumnType](#getcolumntype) | [SysParam](#sysparam)        |
| [Data](#data)        | [JsonToSource](#jsontosource)  | [Binary](#binary)          |
| [DBFind](#dbfind)      | [ArrayToSource](#arraytosource) | [TransactionInfo](#transactioninfo) |

### データフォーマット要素: 

|      |          |        |
| ---- | -------- | ------ |
| [Div](#div)  | [SetTitle](#settitle) | [Span](#span)   |
| [Em](#em)   | [Label](#label)    | [Strong](#strong) |
| [P](#p)    |          |        |

### フォーム要素: 

|            |            |          |
| ---------- | ---------- | -------- |
| [Form](#form)       | [InputErr](#inputerr)   | [InputMap](#inputmap) |
| [ImageInput](#imageinput) | [RadioGroup](#radiogroup) | [Map](#map)      |
| [Input](#input)      | [Select](#select)     |          |

### コードブロックに対する操作: 

|      |      |         |
| ---- | ---- | ------- |
| [If](#if)   | [Or](#or)   | [Include](#include) |
| [And](#and)  |      |         |



## Logicor関数のリファレンス

### Address

この関数は、特定のアカウント アドレスのウォレット アドレス `xxxx-xxxx-...-xxxx` を返します。 アドレスが指定されていない場合は、現在のユーザーのアカウント アドレスがパラメータとして使用されます。

#### Syntax

```
Address(account)

```
> Address
  * `account`
  
    アカウントアドレス。

#### 例

```
Span(Your wallet: Address(#account#))
```

### AddressToId

特定のウォレットアドレス xxxx-xxxx-...-xxxx のアカウントアドレスを返します。

#### Syntax

```
AddressToId(Wallet)
```

> AddressToId
  * `Wallet`
  
    XXXX-...-XXXX 形式のウォレット アドレス。

#### 例

```
AddressToId(#wallet#)
```

### AddToolButton

addtoolbutton 要素を使用してボタン パネルを作成します。

#### Syntax

```
AddToolButton(Title, Icon, Page, PageParams)
 [.Popup(Width, Header)]
```



> AddToolButton

  * `Title`
  
    ボタンのタイトル。

  * `Icon`
  
    ボタンアイコンのスタイル。

  * `Page`
  
    リダイレクト先のページの名前。

  * `PageParams`
  
    ページに渡されるパラメータ。

    

> Popup

  モーダルウィンドウがポップアップします。

  * `Header`

    Title of the window.
  * `Width`

      ウィンドウ幅のパーセンテージ。
      範囲は 1 ～ 100 です。

#### 例

```
AddToolButton(Title: $@1broadcast$, Page: @1notifications_broadcast, Icon: icon-plus).Popup(Header: $@1notifications_broadcast$, Width: "50")
```

### And

and 論理演算の結果を返します。 括弧内にリストされているすべてのパラメータはカンマで区切られています。 パラメータの 1 つが空の文字列、ゼロまたは `false` である場合、パラメータ値は `false` になり、それ以外の場合、パラメータ値は `true` になります。 パラメータ値が「true」の場合、関数は「1」を返し、それ以外の場合は「0」を返します。

#### Syntax

```
And(parameters)
```

#### 例

```
If(And(#myval1#,#myval2#), Span(OK))
```

### AppParam

現在のエコシステムの app_params テーブルから取得したアプリケーション パラメーター値を出力します。 指定した名前の言語リソースが存在する場合、その値は自動的に置き換えられます。

#### Syntax
```
AppParam(App, Name, Index, Source)

```

> AppParam
  * `App`
  
    アプリケーションID。
  * `Name`

    パラメータ名。
  * `Index`

    パラメータ値がカンマ区切りリストの場合に使用できます。
    パラメータ要素のインデックスは 1 から始まります。たとえば、`type = full,light` の場合、`AppParam(1, type, 2)` は `light` を返します。
    Source パラメーターと組み合わせて使用することはできません。
  * `Source`

    パラメータ値がカンマ区切りリストの場合に使用できます。
    特定のパラメータの値を要素とするデータ オブジェクトを作成します。 このオブジェクトは、[Table](#table) および [Select](#select) 関数のデータ ソースとして使用できます。
    Index パラメーターと組み合わせて使用することはできません。

#### 例

```
AppParam(1, type, Source: mytype)
```

### ArrayToSource

arraytosource 要素を作成し、JSON 配列のキーと値のペアを入力します。 取得されたデータは Source 要素に入れられ、後でソース入力関数 (例: Table) で使用できます。

#### Syntax
```
ArrayToSource(Source, Data)

```

> ArrayToSource
  * `Source`
  
    データソース名。
  * `Data`

    JSON 配列、または JSON 配列を含む変数名 (`#name#`)。

#### 例

```
ArrayToSource(src, #myjsonarr#)
ArrayToSource(dat, [1, 2, 3])
```

### Binary

バイナリ テーブル バイナリに格納されている静的ファイルへのリンクを返します。

#### Syntax
```
Binary(Name, AppID, MemberID)[.ById(ID)][.Ecosystem(ecosystem)]
```

> Binary
  * `Name`
  
    ファイル名。
  * `AppID`
  
    アプリケーションID。
  * `MemberID`

    アカウントアドレス。デフォルトでは 0。
  * `ID`

    静的ファイル ID。
  * `Ecosystem`

    エコシステムID。 指定しない場合は、現在のエコシステムからバイナリ ファイルが要求されます。

#### 例

```
Image(Src: Binary("my_image", 1))
Image(Src: Binary().ById(2))
Image(Src: Binary().ById(#id#).Ecosystem(#eco#))
```

### Button

コントラクトを呼び出すか、ページを開くためのボタンを作成するボタン HTML 要素を作成します。

#### Syntax
```
Button(Body, Page, Class, Contract, Params, PageParams)
 [.CompositeContract(Contract, Data)]
 [.Alert(Text, ConfirmButton, CancelButton, Icon)]
 [.Popup(Width, Header)]
 [.Style(Style)]
 [.ErrorRedirect((ErrorID,PageName,PageParams)]
```

> Button
  * `Body`
  
    子のテキストまたは要素。
  * `Page`

    リダイレクト先のページの名前。
  * `Class`

    ボタンクラス。
  * `Contract`

    呼び出された契約の名前。
  * `Params`

    コントラクトに渡される値のリスト。 通常、コントラクトパラメータ（データセクション）の値は、類似した名前のidのHTML要素（入力フィールドなど）から取得されます。 要素 ID が契約パラメータの名前と異なる場合は、contractField1=idname1、contractField2=idname2 の形式で値を割り当てる必要があります。 このパラメータは、オブジェクト {contractField1: idname1, ContractField2: idname2} として attr に返されます。
  * `PageParams`

    リダイレクト ページに渡されるパラメータの形式は、pageField1=idname1、pageField2=idname2 です。 ターゲット ページ パラメータ名 #pageField1 および #pageField2 を持つ変数がターゲット ページ上に作成され、指定された値が割り当てられます。 パラメーターの受け渡しに関する詳細な仕様を参照してください。 PageParams を使用してパラメーターをページに渡します)。
  
> CompositeContract

  ボタンに追加のコントラクトを追加するために使用されます。 CompositeContract は複数回使用できます。
  * `Name`

    契約の名前。
  * `Data`

    コントラクトパラメータはJSON配列です。
> Alert

  Display the message.
  * `Text`

    メッセージのテキスト。
  * `ConfirmButton`
  
    確認ボタンのタイトル。
  * `CancelButton`

    「キャンセル」ボタンのタイトル。
  * `Icon`

    ボタンアイコン。
> Popup

  モーダルウィンドウを出力します。
  * `Header`

    ウィンドウのタイトル。
  * `Width`

    ウィンドウ幅のパーセンテージ。
    I範囲は 1 ～ 100 です。
> Style

  指定された CSS スタイル。
  * `Style`

    CSS スタイル。
> ErrorRedirect

 :ref:contractfundef-Throw 関数がコントラクト実行中にエラーを生成した場合に、ページを指定してリダイレクトします。 複数の ErrorRedirect 呼び出しが存在する可能性があります。 したがって、*errredirect* 属性を返す場合、属性キーは ErrorID で、値はパラメーター リストになります。

  * `ErrorID`

    エラーID。

  * `PageName`

    リダイレクトページの名前。

  * `PageParams`

    ページに渡されるパラメータ。

#### 例

```
Button(Submit, default_page, mybtn_class).Alert(Alert message)
Button(Contract: MyContract, Body:My Contract, Class: myclass, Params:"Name=myid,Id=i10,Value")
```

### Calculate
Exp パラメータで渡された算術式の結果を返します。 次の演算が適用できます: +、-、* 、/、および括弧 ()。

#### Syntax
```
Calculate(Exp, Type, Prec)
```

> Calculate
  * `Exp`

    数値と #name# 変数を含む算術式。
  * `Type`

    結果のデータ型: int、float、money。 指定しない場合、小数点付きの数値がある場合は float、それ以外の場合は int になります。
  * `Prec`

    float and money data, with two significant digits after the decimal point.

#### 例

```
Calculate( Exp: (342278783438+5000)\*(#val#-932780000), Type: money, Prec:18 )
Calculate(10000-(34+5)\*#val#)
Calculate("((10+#val#-45)\*3.0-10)/4.5 + #val#", Prec: 4)
```

### Chart

HTML グラフを作成します。

#### Syntax
```
Chart(Type, Source, FieldLabel, FieldValue, Colors)
```

> Chart
  * `Type`

    チャートの種類。
  * `Source`

    データ ソースの名前。たとえば、[DBFind](#dbfind) 関数から取得されます。
  * `FieldLabel`

    ヘッダーフィールドの名前。
  * `FieldValue`

    値フィールドの名前。
  * `Colors`

    色のリスト。

#### 例

```
Data(mysrc,"name,count"){
    John Silver,10
    "Mark, Smith",20
    "Unknown ""Person""",30
}
Chart(Type: "bar", Source: mysrc, FieldLabel: "name", FieldValue: "count", Colors: "red, green")
```

### CmpTime

同じ形式の 2 つの時間値を比較します。
unixtime、`YYYY-MM-DD HH:MM:SS`、および `YYYYMMDD` などの任意の時刻形式をサポートします。

#### Syntax

```
CmpTime(Time1, Time2)
```


Return value

* `-1` - Time1 < Time2;
* `0` - Time1 = Time2;
* `1` - Time1 > Time2.

#### 例

```
If(CmpTime(#time1#, #time2#)<0){...}
```

### Code

指定されたコードを表示するコード要素を作成します。

変数をその変数の値で置き換えます (たとえば、`#name#`)。

#### Syntax
```
Code(Text)
```

> Code
  * `Text`

    ソースコード。

#### 例

```
Code( P(This is the first line.
    Span(This is the second line.))
)
```

### CodeAsIs

指定されたコードを表示するコード要素を作成します。
変数をその値で置き換えるわけではありません。 たとえば、`#name#`はそのまま表示されます。

#### Syntax
```
CodeAsIs(Text)
```

> CodeAsIs
  * `Text`

    ソースコード。

#### 例

```
CodeAsIs( P(This is the #test1#.
    Span(This is the #test2#.))
)
```

### Data

データ要素を作成し、指定されたデータを入力してソースに配置します。 その後、[Table](#table)やその他の関数のデータ入力としてSourceを受け取ることができます。 列名のシーケンスは、データエントリ値のシーケンスに対応します。

#### Syntax
```
Data(Source,Columns,Data)
 [.Custom(Column){Body}]
```

> Data
  * `Source`

    データソースの名前。 後でデータ ソースとして他の関数に渡される任意の名前を指定できます。

  * `Columns`

    カンマで区切られた列名のリスト。

  * `Data`

    データセット。

    1 行に 1 つのレコード。 列の値はカンマで区切る必要があります。 データと列は同じ順序で設定する必要があります。

    カンマを含む値は二重引用符で囲む必要があります (`"example1, example2", 1, 2`)。 引用符で囲まれた値は 2 つの二重引用符 (`"""example"、"example2"""、1、2`) で囲む必要があります。

    

### Custom

    計算列をデータに割り当てることができます。 たとえば、ボタンやその他のページ レイアウト要素のフィールド テンプレートを指定できます。 これらのフィールド テンプレートは通常、データを受信するために [Table](#table) およびその他の関数に割り当てられます。
    複数の計算列を割り当てる場合は、複数のカスタム関数を使用します。

  * `Column`

    列名。一意であり必須です。

  * `Body`

    コードブロック。 `#columnname#` を使用してエントリ内の他の列から値を取得し、それらの値をコード ブロックで使用できます。

#### 例

```
Data(mysrc,"id,name"){
    "1",John Silver
    2,"Mark, Smith"
    3,"Unknown ""Person"""
 }.Custom(link){Button(Body: View, Class: btn btn-link, Page: user, PageParams: "id=#id#"}
```

### DateTime

    指定された形式で時刻と日付を表示します。

#### Syntax
```
DateTime(DateTime, Format)
```

> DateTime
  * `DateTime`

    unixtime または標準形式 `2006-01-02T15:04:05` で表現された時刻と日付。

  * `Format`

    書式テンプレート: 年は 2 桁形式 `YY`、4 桁形式 `YYYY`、月は `MM`、日は `DD`、時は `HH`、分は `MM`、秒は `SS` 例: `YY/MM/DD HH:MM`。
    指定されていないか欠落している場合は、`YYYY-MM-DD HH:MI:SS` が使用されます。

#### 例

```
DateTime(2017-11-07T17:51:08)
DateTime(#mytime#,HH:MI DD.MM.YYYY)
```

### DBFind

dbfind 要素を作成し、テーブル table のデータを入力して Source 構造に配置します。これは、後で [Table](#table) や他の関数 Source の入力データに使用できます。

#### Syntax
```
DBFind(table, Source)
    [.Columns(columns)]
    [.Where(conditions)]
    [.WhereId(id)]
    [.Order(name)]
    [.Limit(limit)]
    [.Offset(offset)]
    [.Count(countvar)]
    [.Ecosystem(id)]
    [.Cutoff(columns)]
    [.Custom(Column){Body}]
    [.Vars(Prefix)]
```

> DBFind
  * `table`

    テーブル名。

  * `Source`

    データソース名。

> Columns
  * `columns`

    指定しない場合は、すべてのフィールドのリストが返されます。 JSON タイプのフィールドがある場合は、構文 `columnname->fieldname` を使用してレコード フィールドを処理できます。 この場合、生成されるフィールド名は `columnname.fieldname` です。

> Where
  * `conditions`

   データクエリ条件。 「DBFind」を参照してください。
   JSON タイプのフィールドがある場合は、構文 `columnname->fieldname` を使用してレコード フィールドを処理できます。

> WhereId
  ID によるクエリ (例: `.WhereId(1)`。

  * `Id`

   エントリーID。

> Order
  フィールドごとに並べ替えます。
  ソート構文の詳細については、「[DBFind](#dbfind)」を参照してください。

  * `name`

   フィールド名

> Limit
  * `limit`
  
    返されるエントリの数。デフォルトでは 25 です。 最大数は 10,000 です。

> Offset
  * `Offset`

    オフセット。

> Count

  Where 条件の合計行数を指定します。
  合計カウントは、変数に格納するだけでなく、dbfind 要素の count パラメーターで返されます。

  Where と WhereID が指定されていない場合は、テーブル内の行の合計数が返されます。

  * `countvar`

    行数を保持する変数の名前。

> Ecosystem
  * `Id`

   エコシステムID。 デフォルトでは、データは現在のエコシステム内の指定されたテーブルから取得されます。

> Cutoff

  大量のテキストデータを切り取って表示する場合に使用します。

  * `columns`

   Cutoff 関数で処理する必要があるフィールドのカンマ区切りのリスト。
   フィールド値は、link link と title title という 2 つのフィールドを持つ JSON オブジェクトに置き換えられます。 フィールド値に 32 文字を超える文字が含まれている場合は、全文の最初の 32 文字を指すリンクが返されます。 フィールド値が 32 文字以下の場合、リンクは無効に設定され、タイトルには完全なフィールド値が含まれます。

> Custom

  計算列をデータに割り当てることができます。 たとえば、ボタンやその他のページ レイアウト要素のフィールド テンプレートを指定できます。 これらのフィールド テンプレートは通常、データを受信するために [Table](#table) およびその他の関数に割り当てられます。
   複数の計算列を割り当てる場合は、複数のカスタム関数を使用します。
  * `Column`

   列名。一意であり必須です。
  * `Body`

   コードブロック。 `#columnname#` を使用してエントリ内の他の列から値を取得し、それらの値をコード ブロックで使用できます。

> Vars

  クエリによって取得された最初の行は、値を含む変数のセットを生成します。 これを指定すると、Limit パラメーターは自動的に 1 になり、1 つのレコードのみが返されます。
  * `Prefix`

   The prefix added to the 変数名。 Its format is `#prefix_columnname#`, where the column name immediately follows the underscore symbol. If there is a column containing a JSON field, the variable generated will be in the following format: `#prefix_columnname_field#`.

#### 例

```
DBFind(parameters,myparam)
DBFind(parameters,myparam).Columns(name,value).Where({name:"money"})
DBFind(parameters,myparam).Custom(myid){Strong(#id#)}.Custom(myname){
   Strong(Em(#name#))Div(myclass, #company#)
}
```

### Div

div HTML 要素を作成します。

#### Syntax
```
Div(Class, Body)
 [.Style(Style)]
 [.Show(Condition)]
 [.Hide(Condition)]
```

> Div
  * `Class`

    div のクラス名。
  * `Body`

    子要素。
> Style

  指定された CSS スタイル。
  * `Style`

   CSS スタイル。
> Show

 Divを表示する条件を定義します。
   * `Condition`

   以下の「非表示」を参照してください。
> Hide

 Define the conditions for hiding Div.
   * `Condition`

   式の形式は `InputName=Value` です。すべての式が true の場合、*Condition* は true であり、`InputName` の値が `Value` と等しい場合、*Condition* は true です。 複数の *Show* または *Hide* が呼び出される場合、少なくとも 1 つの *Condition* パラメーターが true である必要があります。

#### 例

```
Form(){
    Div(text-left){
        Input(Name: "broadcast", Type: "checkbox", Value: "false")
    }
    Div(text-left){
        hello
    }.Show("broadcast=false")
    Div(text-left){
        world
    }.Hide("broadcast=false")
}
```

### EcosysParam

この関数は、現在の生態系の生態系パラメータ テーブルからパラメータ値を取得します。 返された結果名に言語リソースが含まれている場合は、それに応じて翻訳されます。

#### Syntax
```
EcosysParam(Name, Index, Source)
```

> EcosysParam
  * `Name`

    パラメータ名。
  * `Index`

    要求されたパラメータがコンマで区切られた要素のリストである場合、1 から始まるインデックスを指定できます。たとえば、`gender = Male, Female` の場合、`gender = Male, Female` は ` Female` を返します。
    Source パラメーターと組み合わせて使用することはできません。
  * `Source`

    パラメータ値がカンマ区切りリストの場合に使用できます。
    指定されたパラメータの値を要素とするデータ オブジェクトを作成します。 このオブジェクトは、[Table](#table) および [Select](#select) 関数のデータ ソースとして使用できます。
    Index パラメーターと組み合わせて使用することはできません。

```
Address(EcosysParam(founder_account))
EcosysParam(gender, Source: mygender)

EcosysParam(Name: gender_list, Source: src_gender)
Select(Name: gender, Source: src_gender, NameColumn: name, ValueColumn: id)
```

### Em

em HTML 要素を作成します。

#### Syntax
```
Em(Body, Class)
```

> Em
  * `Body`

    子のテキストまたは要素。

  * `Class`

    em クラス名。

#### 例

```
This is an Em(important news).
```

### ForList

Sourceデータソース内の要素の一覧をBodyで設定したテンプレート形式で表示し、**forlist**要素を作成します。

#### Syntax
```
ForList(Source, Index){Body}
```

> ForList
  * `Source`

    [DBFind](#dbfind) または [Data](#data) 関数から取得されたデータ ソース。
  * `Index`

    1 から始まる反復カウンターの変数。
    オプションのパラメータ。 指定しない場合、反復カウント値は [Source] _index 変数に書き込まれます。
  * `Body`

    要素を挿入するためのテンプレート。

```
ForList(mysrc){Span(#mysrc_index#. #name#)}
```

### Form
   フォームの HTML 要素を作成します。

#### Syntax
```
Form(Class, Body) [.Style(Style)]
```
> Form
  * `Body`

    子のテキストまたは要素。
  * `Class`

    フォームのクラス名。
> Style
  指定された CSS スタイル。
  * `Style`

   CSS スタイル。

#### 例

```
Form(class1 class2, Input(myid))
```

### GetColumnType

特定のテーブルのフィールドのデータ型を返します。

返される型には、`text、varchar、number、money、double、bytes、json、datetime、double` が含まれます。

#### Syntax

```
GetColumnType(Table, Column)
```

> GetColumnType
  * `Table`

    テーブル名。

  * `Column`

    フィールド名。

#### 例

```
SetVar(coltype,GetColumnType(members, member_name))Div(){#coltype#}
```

### GetHistory

gethistory 要素を作成し、指定されたテーブル内のエントリの履歴変更レコードをその要素に入力します。 生成されたデータは Source 要素に配置され、後でソース入力関数 ([Table](#table) など) で使用できます。
配列は最後に変更されたものから順にソートされます。
配列内の id フィールドは、rollback_tx テーブルの ID を指します。 block_id はブロック ID を表し、block_time はブロック生成のタイムスタンプを表します。

#### Syntax
```
GetHistory(Source, Name, Id, RollbackId)
```

> GetHistory
  * `Source`

    データソース名。
  * `Name`

    テーブル名。
  * `Id`

    エントリーID。
  * `RollbackId`

    オプションのパラメータ。 指定した場合、指定した ID を持つ 1 つのレコードだけが rollback_tx テーブルから返されます。

#### 例

```
GetHistory(blocks, BlockHistory, 1)
```

### GetVar

すでに存在する指定された変数の値を返します。存在しない場合は空の文字列を返します。
getvar 要素は、編集可能なツリーが要求された場合にのみ作成されます。 `GetVar(varname)` と `#varname` の違いは、varname が存在しない場合、GetVar は空の文字列を返すのに対し、#varname# は文字列値として解釈されることです。

#### Syntax
```
GetVar(Name)
```

> GetVar
  * `Name`

    変数名。

#### 例

```
If(GetVar(name)){#name#}.Else{Name is unknown}
```

### Hint

ヒント用のヒント要素を作成します。

#### Syntax
```
Hint(Icon,Title,Text)
```

> Hint
  * `Icon`

    アイコン名。
  * `Title`

    ヒントのタイトル。
  * `Text`

    ヒントテキスト。

#### 例

```
Hint(Icon: "icon-wrench",Title:$@1pa_settings$,Text: This is a hint text)
```

### If

条件ステートメント。
Condition を満たす最初の If または ElseIf 子要素を返します。 それ以外の場合は、Else 子要素を返します。

#### Syntax
```
If(Condition){ Body}
 [.ElseIf(Condition){ Body }]
 [.Else{ Body }]
```

> If
  * `Condition`

    条件が空の文字列、0、または false に等しい場合、条件は満たされていないと見なされます。 それ以外の場合はすべて、この条件が満たされているとみなされます。
  * `Body`

    子要素。

#### 例

```
If(#value#){
   Span(Value)
}.ElseIf(#value2#){Span(Value 2)
}.ElseIf(#value3#){Span(Value 3)}.Else{
   Span(Nothing)
}
```

### Image
画像のHTML要素を作成します。

#### Syntax
```
Image(Src, Alt, Class)
 [.Style(Style)]
```

> Image
  * `Src`

    画像ソース、ファイル、または `data:...`
  * `Alt`

    画像が表示できない場合の代替テキスト。
  * `Сlass`

    Image クラス名。

#### 例

```
Image(Src: Binary().ById(#id#), Class: preview).Style(height: 40px; widht 40px;)
```

### ImageInput

画像をアップロードするために imageinput 要素を作成します。

#### Syntax
```
ImageInput(Name, Width, Ratio, Format)
```

> ImageInput
  * `Name`

    要素名。
  * `Width`

    トリミングされた画像の幅。
  * `Ratio`

    アスペクト比または画像の高さ。
  * `Format`

    アップロードされた画像の形式。

#### 例

```
ImageInput(avatar, 100, 2/1)
```

### Include

指定した名前のテンプレートをページ コードに挿入します。

#### Syntax
```
Include(Name)
```

> Include
  * `Name`

    テンプレート名。

#### 例

```
Div(myclass, Include(mywidget))
```

### Input

入力 HTML 要素を作成します。

#### Syntax
```
Input(Name, Class, Placeholder, Type, Value, Disabled)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Input
  * `Name`

    要素名。
  * `Class`

    クラス名。
  * `Placeholder`

    入力フィールドの期待値の入力を求めるプロンプトが表示されます。

  * `Type`

    入力方式。
  * `Value`

    要素の値。
  * `Disabled`

    入力要素を無効にします。
> Validate

  パラメータを検証します。
> Style

  指定された CSS スタイル。
  * `Style`

    CSS スタイル。

#### 例

```
Input(Name: name, Type: text, Placeholder: Enter your name)
Input(Name: num, Type: text).Validate(minLength: 6, maxLength: 20)
```

### InputErr

inputerr 要素を作成して、エラー テキストを検証します。

#### Syntax
```
InputErr(Name,validation errors)]
```

> InputErr
  * `Name`

    [Input](#input) 要素の名前に対応します。
  * `validation errors`

    1 つ以上のパラメータの検証エラー メッセージ。

#### 例

```
InputErr(Name: name,
minLength: Value is too short,
maxLength: The length of the value must be less than 20 characters)
```

### InputMap

マップ上の座標を選択できるウォレットアドレスのテキスト入力フィールドを作成します。

#### Syntax
```
InputMap(Name, Type, MapType, Value)
```

> InputMap
  * `Name`

    要素名。
  * `Value`

    デフォルト値。
     値は文字列形式のオブジェクトです。 たとえば、`{"coords":[{"lat":number,"lng":number},]}` または `{"zoom":int, "center":{"lat":number,"lng" : 番号}}`。 事前定義された値を使用してInputMapが作成されると、ウォレットアドレスフィールドを使用してアドレス値を保存できるため、アドレス値は無効になりません。
  * `Type`

    マップスポットマッピングのタイプ:
     * `polygon` - マルチスポットの閉じたループの領域を示します。
     * `Line` - 閉じたループのない複数の点を持つポリラインを意味します。
     * `Point` - 単一点の座標を示します。
  * `MapType`

    マップの種類。
    これには、「ハイブリッド、ロードマップ、衛星、地形」という値があります。

#### 例

```
InputMap(Name: Coords,Type: polygon, MapType: hybrid, Value: `{"zoom":8, "center":{"lat":55.749942860682545,"lng":37.6207172870636}}`)
```

### JsonToSource

jsontosource 要素を作成し、JSON 配列のキーと値のペアを入力します。 取得されたデータは Source 要素に入れられ、後でソース入力関数 (例: [Table](#table)) で使用できます。
結果データ内のレコードは、JSON キーによってアルファベット順に並べ替えられます。

#### Syntax
```
JsonToSource(Source, Data)
```

> JsonToSource
  * `Source`

    データソース名。
  * `Data`

    JSON オブジェクト、または JSON オブジェクトを含む変数名 (`#name#`)。

#### 例

```
JsonToSource(src, #myjson#)
JsonToSource(dat, {"param":"value", "param2": "value 2"})
```

### Label

ラベルの HTML 要素を作成します。

#### Syntax
```
Label(Body, Class, For)
 [.Style(Style)]
```

> Label
  * `Body`

    子のテキストまたは要素。
  * `Class`

    クラス名。
  * `For`

    フォーム要素にバインドします。
> `StyleThe`:CSS style specified.
  * `Style`

    CSS スタイル。

#### 例

```
Label(The first item).
```

### LangRes

特定の言語リソースを返します。 ツリーの編集を要求された場合は、langres 要素が返され、短い形式のシンボル $langres$ を使用できます。
#### Syntax

```
LangRes(Name)
```

> LangRes
  * `Name`

    言語リソースの名前。

#### 例

```
LangRes(name)
LangRes(myres)
```

### LinkPage

ページにリンクする linkpage 要素を作成します。
#### Syntax

```
LinkPage(Body, Page, Class, PageParams)
 [.Style(Style)]
```

> LinkPage
  * `Body`

    子のテキストまたは要素。
  * `Page`

    リダイレクトページの名前。
  * `Class`

    Button クラス名。
  * `PageParams`

    ページパラメータをリダイレクトします。
> Style

  指定された CSS スタイル。
  * `Style`

  CSS スタイル。
  
#### 例

```
LinkPage(Class: #style_link# h5 text-bold, Page: @1roles_view, PageParams: "v_role_id=#recipient.role_id#")
```

### Map

ビジュアルマップを作成し、任意の形式で座標を表示します。

#### Syntax
```
Map(Hmap, MapType, Value)
```

> Map
  * `Hmap`

    ページ上の HTML 要素の高さ。
    デフォルト値は 100 です。
  * `Value`

    マップ値、文字列形式のオブジェクト。
     たとえば、`{"coords":[{"lat":number,"lng":number},]}` または `{"zoom":int, "center":{"lat":number,"lng":number}}`。 `center` が指定されていない場合、マップ ウィンドウは指定された座標に従って自動的に調整されます。
  * `MapType`

    マップの種類。
    これには、「ハイブリッド、ロードマップ、衛星、地形」という値があります。

#### 例

```
Map(MapType:hybrid, Hmap:400, Value:{"coords":[{"lat":55.58774531752405,"lng":36.97260184619233},{"lat":55.58396161622043,"lng":36.973803475831005},{"lat":55.585222890513975,"lng":36.979811624024364},{"lat":55.58803635636347,"lng":36.978781655762646}],"area":146846.65783403456,"address":"Unnamed Road, Moscow, Russia, 143041"})
```

### MenuGroup

メニュー内にネストされたサブメニューを作成し、menugroup要素を返します。タイトルの言語リソースで置き換える前に、nameパラメータはTitleの値を返します。

#### Syntax
```
MenuGroup(Title, Body, Icon)
```
> MenuGroup

  * `Title`

    メニュー項目の名前。

  * `Body`

    サブメニューの子要素。

  * `Icon`

    アイコン。

#### 例

```
MenuGroup(My Menu){
    MenuItem(Interface, sys-interface)
    MenuItem(Dahsboard, dashboard_default)
}
```

### MenuItem

メニュー項目を作成し、menuitem 要素を返します。

#### Syntax
```
MenuItem(Title, Page, Params, Icon)
```

> MenuItem

  * `Title`

    メニュー項目の名前。

  * `Page`

    リダイレクトページの名前。

  * `Params`

    ページパラメータをリダイレクトします。

  * `Icon`

    アイコン。

#### 例

```
MenuItem(Title:$@1roles$, Page:@1roles_list, Icon:"icon-pie-chart")
```

### Money

exp / 10 ^ 桁の文字列値を返します。

#### Syntax
```
Money(Exp, Digit)
```

> Money

  * `Exp`

    文字列形式の数値。

  * `Digit`

    式 `Exp/10^digit` の 10 の指数。 値は正または負にすることができ、正の値によって小数点以下の桁数が決まります。

#### 例

```
Money(Exp, Digit)
```

### Or

if 論理演算の結果を返します。 括弧内にリストされているすべてのパラメータはカンマで区切られています。 値が空の文字列、ゼロ、または `false` ではないパラメータを 1 つ持つ場合、パラメータ値は `true` になり、それ以外の場合はパラメータ値は `false` になります。 パラメータ値が「true」の場合、関数は「1」を返し、それ以外の場合は「0」を返します。

#### Syntax
```
Or(parameters)
```


#### 例

```
If(Or(#myval1#,#myval2#), Span(OK))
```

### P

p HTML 要素を作成します。

#### Syntax
```
P(Body, Class)
 [.Style(Style)]
```

> P

  * `Body`

    子のテキストまたは要素。

  * `Class`

    クラス名。

> Style

指定された CSS スタイル。

  * `Style`

    CSS スタイル。

#### 例

```
P(This is the first line.
  This is the second line.)
```

### QRcode

指定されたテキストを含む QR コードを返し、qrcode 要素を作成します。

#### Syntax
```
QRcode(Text)
```

> QRcode
  * `Text`

    QRコードのテキスト。

#### 例

```
QRcode(#name#)
```

### RadioGroup

radiogroup 要素を作成します。

#### Syntax
```
RadioGroup(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> RadioGroup

  * `Name`

    要素名。

  * `Source`

    DBFind または Data 関数から取得されたデータ ソース。

  * `NameColumn`

    フィールド名 of the data source.

  * `ValueColumn`

    データソースの値の名前。
    Custom で作成されたフィールドは、このパラメーターでは使用できません。

  * `Value`

    デフォルト値。

  * `Class`

    クラス名。

> Validate

  パラメータを検証します。

> Style

  指定された CCS スタイル。

  * `Style`

    CSS スタイル。

#### 例

```
RadioGroup(Name: type_decision, Source: numbers_type_decisions, NameColumn: name, ValueColumn: value)
```

### Range

range 要素を作成し、From から To までのステップ サイズ (To は含まない) を使用して整数要素を埋めます。 生成されたデータは Source に置かれ、後でソース入力の関数で使用できます (例: [Table](#table))。 無効なパラメータが指定された場合は、空の Source が返されます。

#### Syntax
```
Range(Source,From,To,Step)
```

> Range

  * `Source`

    データソース名。

  * `From`

    開始値 (i = 開始値)。

  * `To`

    終了値 (i < To)。

  * `Step`

    値が変化するステップ。 指定しない場合、デフォルト値は 1 です。

#### 例

```
Range(my,0,5)
SetVar(from, 5).(to, -4).(step,-2)
Range(Source: neg, From: #from#, To: #to#, Step: #step#)
```

### Select

選択した HTML 要素を作成します。

#### Syntax
```
Select(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Select

  * `Name`

    要素名。

  * `Source`

    [DBFind](#dbfind) または [Data](#data) 関数から取得されたデータ ソース。

  * `NameColumn`

    フィールド名 of the data source.

  * `ValueColumn`

    データソースの値の名前。
    [Custom](#custom)で作成したフィールドはこのパラメータでは使用できません。

  * `Value`

    デフォルト値。

  * `Class`

    クラス名。

> Validate

  パラメータを検証します。

> Style

  指定された CCS スタイル。

  * `Style`

    CSS スタイル。

#### 例

```
DBFind(mytable, mysrc)
Select(mysrc, name)
```

### SetTitle

ページ タイトルを設定し、settitle 要素を作成します。

#### Syntax
```
SetTitle(Title)
```

> SetTitle
  * `Title`

    ページタイトル。

#### 例

```
SetTitle(My page)
```

### SetVar

値 Value を指定された変数 Name に割り当てます。

#### Syntax
```
SetVar(Name, Value)
```

> SetVar

  * `Name`

    変数名。

  * `Value`

    変数値には、別の変数への参照が含まれる場合があります。

#### 例

```
SetVar(name, John Smith).(out, I am #name#)
Span(#out#)
```

### Span

スパン HTML 要素を作成します。

#### Syntax
```
Span(Body, Class)
 [.Style(Style)]
```

> Span

  * `Body`

    子のテキストまたは要素。

  * `Class`

    クラス名。

> Style

  指定された CCS スタイル。

  * `Style`

    CSS スタイル。

#### 例

```
This is Span(the first item, myclass1).
```

### Strong

強力な HTML 要素を作成します。

#### Syntax
```
Strong(Body, Class)
```

> Strong

  * `Body`

    子のテキストまたは要素。

  * `Class`

    クラス名。

#### 例

```
This is Strong(the first item, myclass1).
```

### SysParam

プラットフォーム パラメーター テーブル system_parameters 内の特定のパラメーターの値を取得します。

#### Syntax
```
SysParam(Name)
```

> SysParam
  * `Name`

    プラットフォームパラメータの名前。

#### 例

```
SysParam(max_columns)
```

### Table

テーブルの HTML 要素を作成します。

#### Syntax
```
Table(Source, Columns)
 [.Style(Style)]
```

> Table

  * `Source`

    特定のデータ ソースの名前。

  * `Columns`

    タイトルと対応する列名。例: Title1=column1,Title2=column2。

> Style

  指定された CSS スタイル。

  * `Style`

    CSS スタイル。

#### 例

```
DBFind(mytable, mysrc)
Table(mysrc,"ID=id,Name=name")
```

### TransactionInfo

指定されたハッシュによってトランザクションをクエリし、実行されたコントラクトとそのパラメータに関する情報を返します。

#### Syntax
```
TransactionInfo(Hash)
```

> TransactionInfo
  * `Hash`

    16 進文字列形式のトランザクション ハッシュ。
> Return value

  JSON 形式で文字列を返します:

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

どこ：

* `contract` - 契約名。
* `params` - コントラクトパラメータに渡されるデータ。
* `block` - トランザクションを処理したブロックの ID。

#### 例

```
P(TransactionInfo(#hash#))
```

### VarAsIs

値 Value を特定の変数 Name (値の代わりに特定の変数の名前) に割り当てます。

変数置換を備えたバージョンについては、[SetVar](#setvar) を参照してください。
#### Syntax
```
VarAsIs(Name, Value)
```

> VarAsIs

  * `Name`

    変数名。

  * `Value`

    変数値。 値内の変数名は置換されません。 たとえば、値が example #varname# の場合、変数値も example #varname# になります。

#### 例

```
SetVar(Name,"John")
VarAsIs(name, I am #Name#)
Span(#name#) // I am #Name#
```

## App styles for mobile devices

### Layout

#### Title

* `h1`… `h6`

#### Strong-class names

* `.text-muted`
* `.text-primary`
* `.text-success`
* `.text-info`
* `.text-warning`
* `.text-danger`

#### Color

* `.bg-danger-dark`
* `.bg-danger`
* `.bg-danger-light`
* `.bg-info-dark`
* `.bg-info`
* `.bg-info-light`
* `.bg-primary-dark`
* `.bg-primary`
* `.bg-primary-light`
* `.bg-success-dark`
* `.bg-success`
* `.bg-success-light`
* `.bg-warning-dark`
* `.bg-warning`
* `.bg-warning-light`
* `.bg-gray-darker`
* `.bg-gray-dark`
* `.bg-gray`
* `.bg-gray-light`
* `.bg-gray-lighter`

#### Grid

* `.row`
* `.row.row-table`
* `.col-xs-1`… `.col-xs-12`, only used in `.row.row-table`.

#### Panel

* `.panel`
* `.panel.panel-heading`
* `.panel.panel-body`
* `.panel.panel-footer`

#### <span id ="form-app">Form</span>

* `.form-control`

#### <span id = "button-app">Button</span>

* `.btn.btn-default`
* `.btn.btn-link`
* `.btn.btn-primary`
* `.btn.btn-success`
* `.btn.btn-info`
* `.btn.btn-warning`
* `.btn.btn-danger`

#### Icon

* すべての「fa-class icons」は FontAwesome：`fa fa-<icon-name></icon-name>`。
* すべての「icon-class icons」は SimpleLineIcons: `icon-<icon-name>` からのものです。
