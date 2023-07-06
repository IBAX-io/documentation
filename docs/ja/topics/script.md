
# スマートコントラクト {#smart-contracts}
   - [スマートコントラクト構造](#contract-structure)
     - [データセクション](#data-section)
     - [条件セクション](#conditions-section)
     - [アクションセクション](#action-section)
   - [変数](#variables)
   - [ネストされたコントラクト](#nested-contracts)
   - [ファイルアップロード](#file-upload)
   - [JSON形式のクエリ](#queries-in-json-format)
   - [日付と時刻の操作を伴うクエリ](#queries-with-date-and-time-operations)
   - [Needleスマートコントラクト言語](#needle-contract-language)
    - [基本要素と構造](#basic-elements-and-structure)
    - [データ型と変数](#data-types-and-variables)
    - [配列](#array)
    - [IfおよびWhileステートメント](#if-and-while-statements)
   - [関数](#functions)
    - [関数宣言](#function-declaration)
     - [可変長パラメータ](#variable-length-parameters)
     - [オプションパラメータ](#optional-parameters)
   - [Needle機能分類](#needle-functions-classification)
   - [Needle関数リファレンス](#needle-functions-reference)
    - [AppParam](#appparam)
    - [DBFind](#dbfind)
    - [DBRow](#dbrow)
    - [DBSelectMetrics](#dbselectmetrics)
    - [EcosysParam](#ecosysparam)
    - [GetHistory](#gethistory)
    - [GetHistoryRow](#gethistoryrow)
    - [GetColumnType](#getcolumntype)
    - [GetDataFromXLSX](#getdatafromxlsx)
    - [GetRowsCountXLSX](#getrowscountxlsx)
    - [LangRes](#langres)
    - [GetBlock](#getblock)
    - [DBInsert](#dbinsert)
    - [DBUpdate](#dbupdate)
    - [DBUpdateExt](#dbupdateext)
    - [DelColumn](#delcolumn)
    - [DelTable](#deltable)
    - [Append](#append)
    - [Join](#join)
    - [Split](#split)
    - [Len](#len)
    - [Row](#row)
    - [One](#one)
    - [GetMapKeys](#getmapkeys)
    - [SortedKeys](#sortedkeys)
    - [CallContract](#callcontract)
    - [ContractAccess](#contractaccess)
    - [ContractConditions](#contractconditions)
    - [EvalCondition](#evalcondition)
    - [GetContractById](#getcontractbyid)
    - [GetContractByName](#getcontractbyname)
    - [RoleAccess](#roleaccess)
    - [TransactionInfo](#transactioninfo)
    - [Throw](#throw)
    - [ValidateCondition](#validatecondition)
    - [AddressToId](#addresstoid)
    - [IdToAddress](#idtoaddress)
    - [PubToID](#pubtoid)
    - [DecodeBase64](#decodebase64)
    - [EncodeBase64](#encodebase64)
    - [Float](#float)
    - [HexToBytes](#hextobytes)
    - [FormatMoney](#formatmoney)
    - [Random](#random)
    - [Int](#int)
    - [Hash](#hash)
    - [Sha256](#sha256)
    - [Str](#str)
    - [JSONEncode](#jsonencode)
    - [JSONEncodeIndent](#jsonencodeindent)
    - [JSONDecode](#jsondecode)
    - [HasPrefix](#hasprefix)
    - [Contains](#contains)
    - [Replace](#replace)
    - [Size](#size)
    - [Sprintf](#sprintf)
    - [Substr](#substr)
    - [ToLower](#tolower)
    - [ToUpper](#toupper)
    - [TrimSpace](#trimspace)
    - [Floor](#floor)
    - [Log](#log)
    - [Log10](#log10)
    - [Pow](#pow)
    - [Round](#round)
    - [Sqrt](#sqrt)
    - [StringToBytes](#stringtobytes)
    - [BytesToString](#bytestostring)
    - [SysParamString](#sysparamstring)
    - [SysParamInt](#sysparamint)
    - [DBUpdateSysParam](#dbupdatesysparam)
    - [UpdateNotifications](#updatenotifications)
    - [UpdateRolesNotifications](#updaterolesnotifications)
    - [HTTPRequest](#httprequest)
    - [HTTPPostJSON](#httppostjson)
    - [BlockTime](#blocktime)
    - [DateTime](#datetime)
    - [UnixDateTime](#unixdatetime)
    - [CreateOBS](#createobs)
    - [GetOBSList](#getobslist)
    - [RunOBS](#runobs)
    - [StopOBS](#stopobs)
    - [RemoveOBS](#removeobs)
  - [システムスマートコントラクト](#system-contracts)
    - [NewEcosystem](#newecosystem)
    - [EditEcosystemName](#editecosystemname)
    - [NewContract](#newcontract)
    - [EditContract](#editcontract)
    - [BindWallet](#bindwallet)
    - [UnbindWallet](#unbindwallet)
    - [NewParameter](#newparameter)
    - [EditParameter](#editparameter)
    - [NewMenu](#newmenu)
    - [EditMenu](#editmenu)
    - [AppendMenu](#appendmenu)
    - [NewPage](#newpage)
    - [EditPage](#editpage)
    - [AppendPage](#appendpage)
    - [NewBlock](#newblock)
    - [EditBlock](#editblock)
    - [NewTable](#newtable)
    - [EditTable](#edittable)
    - [NewColumn](#newcolumn)
    - [EditColumn](#editcolumn)
    - [NewLang](#newlang)
    - [EditLang](#editlang)
    - [Import](#import)
    - [ImportUpload](#importupload)
    - [NewAppParam](#newappparam)
    - [EditAppParam](#editappparam)
    - [NewDelayedContract](#newdelayedcontract)
    - [EditDelayedContract](#editdelayedcontract)
    - [UploadBinary](#uploadbinary)


スマート コントラクト (以下、コントラクトと呼びます) は、アプリケーションの基本要素の 1 つです。 ユーザーによるページ上のコントラクトの実装は、通常、データベース エントリの更新または作成を目的とした 1 回の操作です。 アプリケーションのすべてのデータ操作はコントラクト システムを形成し、これらのコントラクトはデータベースまたはコントラクト コンテンツ関数を通じて相互に対話します。

## Cスマートコントラクト構造 {#contract-structure}

キーワード `contract` を使用してコントラクトを宣言し、その後にコントラクト名を続けます。コントラクトの内容は中括弧で囲む必要があります。 コントラクトは主に次の 3 つのセクションで構成されます。

1. **data** - [data section](#data-section)、変数名と変数タイプを含む入力データの変数を宣言します。

2. **conditions** - [conditions section](#conditions-section)、データの正確性を検証します。

3. **action** - [action section](#action-section)、データ操作を定義します。
```
contract MyContract {
  data {
    FromId int
    ToId int
    Amount money
  }
  func conditions {
    ...
  }
  func action {
    ...
  }
}
```



### データセクション {#data-section}

`data`セクションでは、コントラクトデータ入力と受信したフォーム パラメーターについて説明します。

シーケンスごとの各行の構造:

* 変数名 - 変数のみを受け取り、配列は受け取りません；
* 変数のデータ型 - 変数の[data type](#data-types-and-variables)；
* optional - オプションのパラメータで、フォーム要素に入力する必要はありません。


```
contract my {
  data {
  Name string
  RequestId int
  Photo file "optional"
  Amount money
  Private bytes
  }
  ...
}
```



### 条件セクション {#conditions-section}

`conditions`セクションでは、受け取ったデータの検証が説明されています。

次のコマンドはエラーワーニングに使用されます: 重大なエラー `error`、警告エラー `warning`、示唆的なエラー `info`。これらの3つのコマンドは、コントラクトの実行を終了するエラーを生成し、各エラーは異なるタイプのエラーログ情報を出力します。例えば:

```
if fuel == 0 {
    error "fuel cannot be zero!"
}
if money < limit {
    warning Sprintf("You don't have enough money: %v <%v", money, limit)
}
if idexist > 0 {
    info "You have already been registered"
}
```

### アクションセクション {#action-section}

`action`セクションでは、コントラクトの主なコードが説明されており、他のデータを取得し、結果の値をテーブルに記録します。例えば:

```
action {
DBUpdate("keys", $key_id, {"-amount": $amount})
DBUpdate("keys", $recipient, {"+amount": $amount, "pub": $Pub})
}
```



## 変数 {#variables}

データセクションで宣言された変数は、変数名の後に`$`記号を付けて他のコントラクトセクションに渡されます。`$`記号はデータセクション内にない他の変数を宣言するためにも使用できますが、これらはこのコントラクトと、このコントラクトにネストされるすべてのコントラクトのグローバル変数と見なされます。

コントラクトで事前定義された変数を使用できます。これには、コントラクトを呼び出したトランザクションデータが含まれます:

* `$time` - トランザクションのタイムスタンプ;
* `$ecosystem_id` - エコシステムID;
* `$block` - トランザクションを含むブロックのID;
* `$key_id` - 現在のトランザクションに署名したアカウントのアドレス;
* `$type` - 仮想マシン内のコントラクトID;
* `$block_key_id` - ブロックを生成したノードのアカウントアドレス;
* `$block_time` - ブロックの生成タイムスタンプ;
* `$original_contract` - トランザクションを最初に処理したコントラクトの名前。変数が空の文字列であれば、トランザクションの検証中にコントラクトが呼び出されることを意味します。コントラクトが別のコントラクトによって呼び出されたか、トランザクションに直接よって呼び出されたかを確認するには、$original_contractと$this_contractの値を比較する必要があります。値が等しい場合、トランザクションによってコントラクトが呼び出されることを意味します;
* `$this_contract` - 現在実行中のコントラクトの名前;
* `$guest_key` - ゲストアカウントのアドレス;
* `$stack` - データ型が配列のコントラクト配列スタックで、実行されたすべてのコントラクトを含みます。配列の最初の要素は現在実行中のコントラクトの名前を表し、最後の要素は最初にトランザクションを処理したコントラクトの名前を表します;
* `$node_position` - ブロックが位置する検証ノード配列のインデックス番号;
* `$txhash` - トランザクションのハッシュ;
* `$contract` - 現在のコントラクトの構造配列。

事前定義された変数はコントラクトだけでなく、アプリケーション要素のアクセス許可条件を定義する許可フィールドでも使用できます。許可フィールドで使用する場合、ブロック情報の事前定義変数は常にゼロと等しくなります（`$time`、`$block`など）。

事前定義変数`$result`にはコントラクトの返り値が割り当てられます。


```
contract my {
 data {
     Name string
     Amount money
 }
 func conditions {
     if $Amount <= 0 {
     error "Amount cannot be 0"
     }
     $ownerId = 1232
 }
 func action {
     var amount money
     amount = $Amount - 10
     DBUpdate("mytable", $ownerId, {name: $Name,amount: amount})
     DBUpdate("mytable2", $ownerId, {amount: 10})
 }
}
```

## ネストされたコントラクト {#nested-contracts}

コントラクトの`conditions`セクションと`action`セクションでは、コントラクトをネストすることができます。ネストされたコントラクトは直接呼び出すことができ、コントラクトのパラメータはコントラクト名の後にかっこ内で指定されます。例えば、`@1NameContract(Params)`といった形式です。また、[CallContract](#callcontract)関数を使用してネストされたコントラクトを呼び出すこともできます。

## ファイルアップロード {#file-upload}

`multipart/form-data` 形式のフォームを使用してファイルをアップロードするには、コントラクトのデータ型が `file` である必要があります。

```
contract Upload {
     data {
        File file
     }
     ...
}
```

[UploadBinary](#uploadbinary) コントラクトは、ファイルのアップロードと保存に使用されます。 ページエディタのLogicor言語関数[バイナリ](templates2.md#binary)を使用すると、ファイルのダウンロードリンクを取得できます。

## JSON形式のクエリ {#queries-in-json-format}

スマートコントラクト言語では、フィールドタイプとして**JSON**を指定することができます。エントリーフィールドを処理するためには、**columnname->fieldname**の構文を使用します。取得した値は**columnname.fieldname**に記録されます。上記の構文は、[DBFind](#dbfind)関数のColumns、One、Whereで使用することができます。

```
var ret map
var val str
var list array
ret = DBFind("mytable").Columns("myname,doc,doc->ind").WhereId($Id).Row()
val = ret["doc.ind"]
val = DBFind("mytable").Columns("myname,doc->type").WhereId($Id).One("doc->type")
list = DBFind("mytable").Columns("myname,doc,doc->ind").Where("doc->ind = ?", "101")
val = DBFind("mytable").WhereId($Id).One("doc->check")
```



## 日付と時刻の操作を伴うクエリ {#queries-with-date-and-time-operations}

スマート コントラクト言語関数を使用して日時を直接クエリしたり更新したりすることはできませんが、以下の例のように Where ステートメントで PostgreSQL の関数と機能を使用することができます。 たとえば、フィールド date_column を現在時刻と比較する必要があります。 date_column がタイムスタンプ型の場合、式は `date_column <NOW()` でなければなりません。 date_column が Unix 型の場合、式は `to_timestamp(date_column)> NOW()` である必要があります。

```
Where("to_timestamp(date_column)> NOW()")
Where("date_column <NOW() - 30 * interval '1 day'")
```

次の Needle 関数は、SQL 形式で日付と時刻を処理するために使用されます。

* [BlockTime](#blocktime)
* [DateTime](#datetime)
* [UnixDateTime](#unixdatetime)

## Needleスマートコントラクト言語 {#needle-contract-language}

コントラクト言語には、データ アルゴリズム処理とデータベース操作を実現できる一連の関数、演算子、構造が含まれています。

コントラクト書の編集権限が「false」に設定されていない場合、コントラクト内容を変更できます。 コントラクト変更の完全な履歴はブロックチェーンに保存され、Weaver で利用できます。

ブロックチェーン内のデータ操作は、最新バージョンのコントラクトに従って実行されます。

### 基本要素と構造 {#basic-elements-and-structure}

### データ型と変数 {#data-types-and-variables}

データ型は変数ごとに定義する必要があります。 通常、データ型は自動的に変換されます。 次のデータ型を使用できます。

* `bool` - ブール値、`true` または `false`
* `bytes` - バイト形式
* `Int` - 64ビット整数
* `Array` - 任意の型の配列
* `map` - オブジェクトの配列
* `money` - ビッグ整数
* `float` - 64ビット浮動小数点数
* `string` - 文字列はダブルクォートまたはエスケープ形式で定義する必要があります: "This is a string" もしくは \`This is a string\`
* `file` - オブジェクトの配列:
  * `Name` - ファイル名、`string` 型
  * `MimeType` - ファイルのMIMEタイプ、`string` 型
  * `Body` - ファイルの内容、`bytes` 型


変数、関数、コントラクトの名前を含むすべての識別子は大文字と小文字が区別されます (MyFunc と myFunc は別の名前です)。

**var** キーワードを使用して変数を宣言し、その後に変数の名前と型を指定します。 中かっこで宣言された変数は、同じ中かっこのペアで使用する必要があります。

宣言された変数のデフォルト値はゼロです。ブール型のゼロ値は false、すべての数値型のゼロ値は 0、文字列の場合は空の文字列のゼロ値です。 変数宣言の例:

```
func myfunc( val int) int {
  var mystr1 mystr2 string, mypar int
  var checked bool
  ...
  if checked {
    var temp int
    ...
  }
}
```



### 配列 {#array}

コントラクト言語は、次の 2 つの配列タイプをサポートします。
* `Array` - 0 から始まるインデックスを持つ配列。
* `map` - オブジェクトの配列。

配列要素を割り当てたり取得したりするときは、インデックスを角かっこで囲む必要があります。 配列では複数のインデックスはサポートされておらず、配列要素を myarr[i][j] として扱うことはできません。

```
var myarr array
var mymap map
var s string

myarr[0] = 100
myarr[1] = "This is a line"
mymap["value"] = 777
mymap["param"] = "Parameter"

s = Sprintf("%v, %v, %v", myarr[0] + mymap["value"], myarr[1], mymap["param"])
// s = 877, This is a line, Parameter
```

`[]` 内に要素を指定して配列型の配列を定義することもできます。 マップタイプ `arrays` の場合は、`{}` を使用してください。

```
var my map
my={"key1": "value1", key2: i, "key3": $Name}
var mya array
mya=["value1", {key2: i}, $Name]
```

このような初期化を式で使用できます。 たとえば、関数のパラメータで使用します。

```
DBFind...Where({id: 1})
```

オブジェクトの配列の場合は、キーを指定する必要があります。 キーは二重引用符 (`""`) で囲まれた文字列として指定します。 キー名が文字、数字、アンダースコアに限定されている場合は、二重引用符を省略できます。

```
{key1: "value1", key2: "value2"}
```

配列には、文字列、数値、任意の型の変数名、および「$」記号を含む変数名を含めることができます。 ネストされた配列をサポートします。 さまざまなマップまたは配列を値として指定できます。

式を配列要素として使用することはできません。 変数を使用して式の結果を保存し、この変数を配列要素として指定します。

```
[1+2, myfunc(), name["param"]] // don't do this
[1, 3.4, mystr, "string", $ext, myarr, mymap, {"ids": [1,2, i], company: {"Name": "MyCompany"}} ] // this is ok

var val string
val = my["param"]
MyFunc({key: val, sub: {name: "My name", "color": "Red"}})
```

### IfおよびWhileステートメント {#if-and-while-statements}

以下のコントラクト言語の例では、コントラクトや関数内で使用できる標準の**if**条件文と**while**ループがサポートされています。これらの文は相互にネストすることができます。

**if**と**while**は、条件文に続く必要があります。条件文が数値を返す場合、その値が0であれば偽と見なされます。

val == 0は!valと等価であり、val != 0はvalと等価です。**if**文には**else**コードブロックが存在し、**if**条件文が偽の場合に実行されます。

以下の比較演算子を条件文で使用することができます: `<, >, >=, <=, ==, !=, ||, &&`


```
if val> 10 || id != $block_key_id {
 ...
} else {
 ...
}
```

**while** ループの条件ステートメントが true の場合、コード ブロックが実行されます。 **break** は、コード ブロックのループを終了することを意味します。 ループを最初から開始する場合は、**Continue** を使用します。

```
var i int
while true {
  if i > 100 {
    break
  }
  ...
  if i == 50 {
    continue
  }
  ...
  i = i + 1
}
```

コンディショナル文に加えて、Needleは標準の算術演算もサポートしています: `+`, `-`, `*`, `/`。

文字列型とバイト型の変数は、条件文として使用することができます。型の長さがゼロより大きい場合、条件は真となります。そうでなければ偽です。

## 関数 {#functions}

関数は、コントラクトの [data section](#data-section) で受け取ったデータに対していくつかの操作を実行できます。つまり、データベースからのデータの読み取りと書き込み、値の型の変換、コントラクト間の対話の確立などです。

### 関数宣言 {#function-declaration}

func キーワードを使用して関数を宣言し、その後に名前と、関数に渡されるパラメータのリストとその型を指定します。 すべてのパラメータは括弧で囲まれ、カンマで区切られます。 括弧の後に、関数によって返される値のデータ型を宣言する必要があります。 関数本体は中括弧で囲む必要があります。 関数にパラメーターがない場合は、中括弧を省略できます。 関数から値を戻すには、`return` キーワードを使用します。

```
func myfunc(left int, right int) int {
    return left*right + left - right
}
func test int {
    return myfunc(10, 30) + myfunc(20, 50)
}
func ooops {
    error "Ooops..."
}
```

すべてのエラー チェックは自動的に実行されるため、関数はエラーを返しません。 いずれかの機能にエラーがある場合、コントラクトはその操作を終了し、ウィンドウにエラーの説明を表示します。

### 可変長パラメータ {#variable-length-parameters}

関数は可変長パラメータを定義できます。可変長パラメータを示すには、関数の最後のパラメータ タイプとして`...`記号を使用し、データ タイプは`array`です。 可変長パラメータには、パラメータが呼び出しで渡された時点からのすべての変数が含まれます。 すべてのタイプの変数を渡すことができますが、データタイプの不一致による競合に対処する必要があります。

```
func sum(out string, values ...) {
var i, res int

while i <Len(values) {

   res = res + values[i]

   i = i + 1

}

Println(out, res)

}

func main() {
  sum("Sum:", 10, 20, 30, 40)
}
```



### オプションパラメータ {#optional-parameters}

関数には多くのパラメータがありますが、呼び出す際にはそのうちの一部だけが必要な場合、次のようにオプションのパラメータを宣言することができます: `func myfunc(name string).Param1(param string).Param2(param2 int) {...}`。その後、指定したパラメータを任意の順序で呼び出すことができます: `myfunc("name").Param2(100)`。

関数本体では、これらの変数を通常通り扱うことができます。指定されたオプションのパラメータが呼び出されない場合、デフォルト値はゼロになります。また、...を使用して可変長のパラメータを指定することもできます: `func DBFind(table string).Where(request string, params ...)`。その後、次のように呼び出すことができます: `DBFind("mytable").Where({" id": $myid, "type": 2})`。


```
func DBFind(table string).Columns(columns string).Where(format string, tail ...)
  .Limit(limit int).Offset(offset int) string {
  ...
}

func names() string {
  ...
  return DBFind("table").Columns("name").Where({"id": 100}).Limit(1)
}
```

## Needle機能分類 {#needle-functions-classification}

データベースから値を取得します:

|                 |               |                 |
| --------------- | ------------- | --------------- |
| [AppParam](#appparam)        | [EcosysParam](#ecosysparam)   | [GetDataFromXLSX](#getdatafromxlsx) |
| [DBFind](#dbfind)          | [GetHistory](#gethistory)    | [GetRowsCountXLSX](#getrowscountxlsx) |
| [DBRow](#dbrow)           | [GetHistoryRow](#gethistoryrow) | [GetBlock](#getblock)        |
| [DBSelectMetrics](#dbselectmetrics) | [GetColumnType](#getcolumntype) | [LangRes](#langres)         |

テーブル内のデータを更新する:

|          |             |          |
| -------- | ----------- | -------- |
| [DBInsert](#dbinsert) | [DBUpdateExt](#dbupdateext) | [DelTable](#deltable) |
| [DBUpdate](#dbupdate) | [DelColumn](#delcolumn)   |          |

配列を使った操作:

|        |      |            |
| ------ | ---- | ---------- |
| [Append](#append) | [Len](#len)  | [GetMapKeys](#getmapkeys) |
| [Join](#join)   | [Row](#row)  | [SortedKeys](#sortedkeys) |
| [Split](#split)  | [One](#one)  |            |

スマートコントラクトと権限による操作:

|                    |                   |                   |
| ------------------ | ----------------- | ----------------- |
| [CallContract](#callcontract)       | [GetContractById](#getcontractbyid)   | [TransactionInfo](#transactioninfo)   |
| [ContractAccess](#contractaccess)     | [RoleAccess](#roleaccess)        | [Throw](#throw)             |
| [ContractConditions](#contractconditions) | [GetContractByName](#getcontractbyname) | [ValidateCondition](#validatecondition) |
| [EvalCondition](#evalcondition)      |                   |                   |


アドレスを使った操作:

|             |             |         |
| ----------- | ----------- | ------- |
| [AddressToId](#addresstoid) | [IdToAddress](#idtoaddress) | [PubToID](#pubtoid) |


変数値を使用した演算:

|              |             |        |
| ------------ | ----------- | ------ |
| [DecodeBase64](#decodebase64) | [FormatMoney](#formatmoney) | [Hash](#hash)   |
| [EncodeBase64](#encodebase64) | [Random](#random)      | [Sha256](#sha256) |
| [Float](#float)        | [Int](#int)         | [Str](#str)    |
| [HexToBytes](#hextobytes)   |             |        |

算術演算:

|       |       |       |
| ----- | ----- | ----- |
| [Floor](#floor) | [Log10](#log10) | [Round](#round) |
| [Log](#log)   | [Pow](#pow)   | [Sqrt](#sqrt)  |




JSONを使った操作:

|            |                  |            |
| ---------- | ---------------- | ---------- |
| [JSONEncode](#jsonencode) | [JSONEncodeIndent](#jsonencodeindent) | [JSONDecode](#jsondecode) |


文字列を使った操作:

|           |         |           |
| --------- | ------- | --------- |
| [HasPrefix](#hasprefix) | [Size](#size)    | [ToLower](#tolower)   |
| [Contains](#contains)  | [Sprintf](#sprintf) | [ToUpper](#toupper)   |
| [Replace](#replace)   | [Substr](#substr)  | [TrimSpace](#trimspace) |


バイトを使った操作:

|               |               |      |
| ------------- | ------------- | ---- |
| [StringToBytes](#stringtobytes) | [BytesToString](#bytestostring) |      |


SQL形式での日付と時刻の操作:

|           |          |              |
| --------- | -------- | ------------ |
| [BlockTime](#blocktime) | [DateTime](#datetime) | [UnixDateTime](#unixdatetime) |


プラットフォームパラメータを使用した操作:

|             |              |      |
| ----------- | ------------ | ---- |
| [HTTPRequest](#httprequest) | [HTTPPostJSON](#httppostjson) |      |




マスター CLB ノードの機能:

|            |         |           |
| ---------- | ------- | --------- |
| [CreateOBS](#createobs)  | [RunOBS](#runobs)  | [RemoveOBS](#removeobs) |
| [GetOBSList](#getobslist) | [StopOBS](#stopobs) |           |



## Needle関数リファレンス {#needle-functions-reference}


### AppParam {#appparam}

指定されたアプリケーション パラメータの値を (アプリケーション パラメータ テーブル app_params から) 返します。

**Syntax**

```
AppParam(app int, name string, ecosystemid int) string
```

* **App**

  アプリケーションID。

* **name**

    アプリケーションパラメータ名。

* **Ecosystemid**

    エコシステムID。

**例**

```
AppParam(1, "app_account", 1)
```



### DBFind {#dbfind}

指定されたパラメータを使用して指定されたテーブルのデータをクエリし、オブジェクト マップの配列で構成される配列を返します。

`.Row()` はクエリ内の最初のマップ要素を取得でき、`.One(column string)` はクエリ内の指定された列の最初のマップ要素を取得できます。

**Syntax**

```
DBFind(table string)
 [.Columns(columns array|string)]
 [.Where(where map)]
 [.WhereId(id int)]
 [.Order(order string)]
 [.Limit(limit int)]
 [.Offset(offset int)]
 [.Row()]
 [.One(column string)]
 [.Ecosystem(ecosystemid int)] array
```

* **table**

  テーブル名。

* **сolumns**

  列のリストを返します。 指定しない場合は、すべての列が返されます。

  値は配列またはカンマで区切られた文字列です。

* **where**

  クエリ条件。

   例: `.Where({name: "John"})` または `.Where({"id": {"$gte": 4}})`。

   このパラメータには、検索基準を含むオブジェクトの配列が含まれている必要があります。 配列にはネストされた要素を含めることができます。

   次の構文構造が使用されます。

  * `{"field1": "value1", "field2": "value2"}`
     `field1 = "value1" AND field2 = "value2"` と同等です。

  * `{"field1": {"$eq":"value"}}`
     `field = "value"` と同等です。

  * `{"field1": {"$neq": "value"}}`
     `field != "value"` と同等です。

  * `{"field1: {"$in": [1,2,3]}`
     `field IN (1,2,3)`に相当します。

  * `{"field1": {"$nin": [1,2,3]}`
     フィールド NOT IN (1,2,3) と同等です。

  * `{"field": {"$lt": 12}}`
     `field <12`と同等です。

  * `{"field": {"$lte": 12}}`
     f`ield <= 12`と同等。

  * `{"field": {"$gt": 12}}`
     `field> 12` と同等。

  * `{"field": {"$gte": 12}}`
     `field >= 12`と同等。

  * `{"$and": [<expr1>, <expr2>, <expr3>]}`
     `expr1 AND expr2 AND expr3` と同等です。

  * `{"$or": [<expr1>, <expr2>, <expr3>]}`
     `expr1 OR expr2 OR expr3` と同等です。

  * `{field: {"$like": "value"}}`
     `field like'%value%'` (あいまい検索) と同等です。

  * `{field: {"$begin": "value"}}`
     `field like'value%'` (`value` で始まります) と同等です。

  * `{field: {"$end": "value"}}`
     `field like'%value'` (`value` で終わる) と同等です。

  * `{field: "$isnull"}`
     フィールドが null に相当します。

     
オブジェクト配列のキーを上書きしないように注意してください。 たとえば、`id>2 and id<5` でクエリを実行する場合、`{id:{"$gt": 2}, id:{"$lt": 5}}` は使用できません。 最初の要素は 2 番目の要素によって上書きされます。 次のクエリ構造を使用する必要があります。

```
{id: [{"$gt": 2}, {"$lt": 5}]}
```
```
{"$and": [{id:{"$gt": 2}}, {id:{"$lt": 5}}]}
```

* **Id**

     IDによるクエリ。 たとえば、.WhereId(1)。

     

* **Order**

     結果セットを指定した列、またはデフォルトでは ID でソートするために使用されます。

      並べ替えにフィールドを 1 つだけ使用する場合は、それを文字列として指定できます。 複数のフィールドを並べ替えるには、文字列オブジェクトの配列を指定する必要があります。

      降順: `{"field": "-1"}` `field desc` と同等。

      昇順: `{"field": "1"}` `field asc` と同等。

* **limit**

     エントリの数を返します。 デフォルトでは 25 です。 最大数は 10,000 です。

* **Offset**

     オフセット。

* **Ecosystemid**

     エコシステムID。デフォルトでは、現在のエコシステムのテーブルがクエリされます。

     

**例**

```
var i int
var ret string
ret = DBFind("contracts").Columns("id,value").Where({id: [{"$gt": 2}, {"$lt": 5}]}).Order( "id")
while i <Len(ret) {
  var vals map
  vals = ret[0]
  Println(vals["value"])
  i = i + 1
}
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
  Println(ret)
  Println(ret)
  Println(ret)
}
```
    


### DBRow {#dbrow}

指定されたパラメータを使用して、指定されたテーブルのデータをクエリします。 オブジェクト マップの配列で構成される配列 array を返します。

**Syntax**

```
DBRow(table string)
 [.Columns(columns array|string)]
 [.Where(where map)]
 [.WhereId(id int)]
 [.Order(order array|string)]
 [.Ecosystem(ecosystemid int)] map
```

* **table**

  テーブル名。

* **columns**
  
  列のリストを返します。 指定しない場合は、すべての列が返されます。

   値は配列またはカンマで区切られた文字列です。
* **where**

  クエリ条件。

  例: `.Where({name: "John"})` または `.Where({"id": {"$gte": 4}})`。

  詳細については、「[DBFind](#dbfind)」を参照してください。

* **Id**
  
  IDによるクエリ。 たとえば、`.WhereId(1)` です。

* **Order**

  結果セットを指定した列、またはデフォルトでは ID でソートするために使用されます。

   詳細については、「[DBFind](#dbfind)」を参照してください。

* **Ecosystemid**

  エコシステムID。 デフォルトでは、現在のエコシステムのテーブルがクエリされます。

**例**

```
var ret map
ret = DBRow("contracts").Columns(["id","value"]).Where({id: 1})
Println(ret)
```



### DBSelectMetrics {#dbselectmetrics}

メトリクスの集計データを返します。

メトリクスは、100 ブロックが生成されるたびに更新されます。 そして、集計されたデータは1日周期で保存されます。

**Syntax**

```
DBSelectMetrics(metric string, timeInterval string, aggregateFunc string) array

```

* **metric**

  メトリクス名

  * **ecosystem_pages**
  
    エコシステムのページ数。

    戻り値: キー - エコシステム ID、値 - エコシステム ページの数。

  * **ecosystem_members**
  
    エコシステムのメンバーの数。

    戻り値: キー - エコシステム ID、値 - エコシステム メンバーの数。
  * **ecosystem_tx**

    エコシステムトランザクションの数。

    戻り値: キー - エコシステム ID、値 - エコシステム トランザクションの数。

* **timeInterval**

    メトリクス データを集計する時間間隔。 例: `1 日`、`30 日`。

* **aggregateFunc**

    集計関数。 たとえば、`最大`、`最小`、`平均`などです。

**例**

```
var rows array
rows = DBSelectMetrics("ecosystem_tx", "30 days", "avg")
var i int
while(i <Len(rows)) {
  var row map
  row = rows[i]
  i = i + 1
}
```



### EcosysParam {#ecosysparam}

エコシステム パラメーター テーブルのパラメーター内の指定されたパラメーターの値を返します。

**Syntax**

```
EcosysParam(name string) string

```

* **name**

  パラメータ名。

**例**

```
Println(EcosysParam("founder_account"))
```



### GetHistory {#gethistory}

指定されたテーブル内のエントリに対する変更履歴を返します。

**Syntax**

```
GetHistory(table string, id int) array

```

* **table**

  テーブル名。
* **Id**

  エントリーID。
> **Return value**

  テーブル内のエントリの変更履歴を指定する、マップ型のオブジェクトの配列を返します。

  各配列には、次の変更を行う前のレコードのフィールドが含まれています。
  配列は、最近の変更の順序で並べ替えられます。
  
  配列内の id フィールドは、rollback_tx テーブルの ID を指します。 block_id はブロック ID を表し、block_time はブロック生成のタイムスタンプを表します。

**例**

```
var list array
var item map
list = GetHistory("blocks", 1)
if Len(list) > 0 {
  item = list[0]
}
```



### GetHistoryRow {#gethistoryrow}

指定されたテーブル内の指定されたエントリの変更履歴から 1 つのスナップショットを返します。

**Syntax**

```
GetHistoryRow(table string, id int, rollbackId int) map
```



* **table**

  テーブル名。

* **Id**

  エントリーID。

* **rollbackId**

  rollback_tx テーブルのエントリ ID。

```
  $result = GetHistoryRow("contracts",205,2358)
```

  


### GetColumnType {#getcolumntype}

指定されたテーブル内の指定されたフィールドのデータ型を返します。

**Syntax**

```
GetColumnType(table, column string) string

```

* **table**

  テーブル名。
* **column**

  フィールド名。
> **Return value**

  次のタイプを返すことができます: `text, varchar, number, money, double, bytes, json, datetime, double`。

**例**

```
var coltype string
coltype = GetColumnType("members", "member_name")
```



### GetDataFromXLSX {#getdatafromxlsx}

XLSX スプレッドシートからデータを返します。

**Syntax**

```
GetDataFromXLSX(binId int, line int, count int, sheet int) string

```

* **binId**

  バイナリテーブルbinary内のXLSX形式のID。
* **line**

  開始行番号。デフォルトでは 0 から始まります。
* **count**

  返す必要がある行数。
* **sheet**

  デフォルトでは 1 から始まるリスト番号。

**例**

```
var a array
a = GetDataFromXLSX(3, 12, 10, 1)
```



### GetRowsCountXLSX {#getrowscountxlsx}

指定された XLSX ファイルの行数を返します。

**Syntax**

```
GetRowsCountXLSX(binId int, sheet int) int
```

* **binId**

  バイナリテーブルbinary内のXLSX形式のID。

* **sheet**

  デフォルトでは 1 から始まるリスト番号。

**例**

```
var count int
count = GetRowsCountXLSX(binid, 1)
```



### LangRes {#langres}

2 文字のコード (例: `en`、`ja`) として指定された、言語 lang の名前ラベルを持つ多言語リソースを返します。 選択した言語に対応する言語がない場合は、`en`ラベルの言語リソースが返されます。

**Syntax**

```
LangRes(label string, lang string) string
```

* **label**

  言語リソース名。
* **lang**

  2文字の言語コード。

**例**

```
warning LangRes("@1confirm", "en")
error LangRes("@1problems", "ja")
```



### GetBlock {#getblock}

指定されたブロックに関する関連情報を返します。

**Syntax**

```
GetBlock(blockID int64) map

```

* **blockID**

  ブロックID。
> **Return value**

  オブジェクトの配列を返します。
  * **id**
  
     ブロックID。
  * **time**
  
     ブロック生成のタイムスタンプ。
  * **key_id**
  
     検証ノードのアカウント アドレスがブロックを生成しました。

**例**

```
var b map
b = GetBlock(1)
Println(b)
```



### DBInsert {#dbinsert}

指定されたテーブルにエントリを追加し、エントリーIDを返します。

**Syntax**

```
DBInsert(table string, params map) int

```

* **tblname**

  テーブル名。
* **params**

  キーがフィールド名、値が挿入値であるオブジェクトの配列。

**例**

```
DBInsert("mytable", {name: "John Smith", amount: 100})
```



### DBUpdate {#dbupdate}

指定されたテーブル内の指定されたエントリ ID の列の値を変更します。 エントリ ID がテーブルに存在しない場合は、エラーが返されます。

**Syntax**

```
DBUpdate(tblname string, id int, params map)

```

* **tblname**

  テーブル名。
* **Id**

  エントリーID。
* **params**

  キーがフィールド名、値が変更後の新しい値であるオブジェクトの配列。

**例**

```
DBUpdate("mytable", myid, {name: "John Smith", amount: 100})
```



### DBUpdateExt {#dbupdateext}

クエリ条件に一致する、指定されたテーブル内の列の値を変更します。

**Syntax**

```
DBUpdateExt(tblname string, where map, params map)

```

* **tblname**

  テーブル名。
* **where**

  クエリ条件。

  詳細については、「[DBFind](#dbfind)」を参照してください。
* **params**

  キーがフィールド名、値が変更後の新しい値であるオブジェクトの配列。

**例**

```
DBUpdateExt("mytable", {id: $key_id, ecosystem: $ecosystem_id}, {name: "John Smith", amount: 100})
```



### DelColumn {#delcolumn}

指定されたテーブル内のレコードのないフィールドを削除します。

**Syntax**

```
DelColumn(tblname string, column string)

```

* **tblname**

  テーブル名。

* **column**

  削除するフィールド。

```
DelColumn("mytable", "mycolumn")
```

  


### DelTable {#deltable}

レコードのない指定されたテーブルを削除します。

**Syntax**

```
DelTable(tblname string)

```

* **tblname**

  テーブル名。

**例**

```
DelTable("mytable")
```



### Append {#append}

任意のタイプの val を src 配列に挿入します。

**Syntax**

Append(src array, val anyType) array

* **src**

  元の配列。
* **val**

  挿入される値。

**例**

```
var list array
list = Append(list, "new_val")
```



### Join {#join}

in 配列の要素を、指定された sep 区切り記号を使用して文字列に結合します。

**Syntax**

```
Join(in array, sep string) string

```

* **In**

  配列名。
* **sep**

  セパレーター。

**例**

```
 var val string, myarr array
 myarr[0] = "first"
 myarr[1] = 10
 val = Join(myarr, ",")
```



### Split {#split}

sep(セパレーター) セパレータを使用して、in 文字列を要素に分割し、配列に入れます。

**Syntax**

```
Split(in string, sep string) array
```

* **In**

   String.
*  **sep**

   Separator.

**例**

```
var myarr array
myarr = Split("first,second,third", ",")
```



### Len {#len}

指定された配列内の要素の数を返します。

**Syntax**

 

```
Len(val array) int
```

* **val**

   配列。

**例**

```
if Len(mylist) == 0 {
  ...
}
```



### Row {#row}

 この場合、list パラメータを指定してはなりません。 配列リストの最初のオブジェクト配列を返します。 リストが空の場合は、空の結果が返されます。 この関数は主に [DBFind](#dbfind) 関数と組み合わせて使用されます。 この機能を使用する場合、パラメータを指定することはできません。
**Syntax**

```
 Row(list array) map
```

* **list**

   DBFind 関数によって返されるオブジェクトの配列。

**例**

```
 var ret map
 ret = DBFind("contracts").Columns("id,value").WhereId(10).Row()
 Println(ret)
```



### One {#one}

 配列リスト内の最初のオブジェクト配列のフィールド値を返します。 リスト配列が空の場合は、nil が返されます。 これは主に [DBFind](#dbfind) 関数と組み合わせて使用されます。 この機能を使用する場合、パラメータを指定することはできません。

**Syntax**

```
One(list array, column string) string
```

*  **list**

  DBFind 関数によって返されるオブジェクトの配列。

* **column**

  フィールド名。

**例**

```
var ret string
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
  Println(ret)
}
```



### GetMapKeys {#getmapkeys}

オブジェクト配列内のキー配列を返します。

**Syntax**

 

```
GetMapKeys(val map) array
```

* **val**

    オブジェクト配列。

**例**

```
var val map
var arr array
val["k1"] = "v1"
val["k2"] = "v2"
arr = GetMapKeys(val)
```



### SortedKeys {#sortedkeys}

オブジェクト配列内のソートされたキー配列を返します。

**Syntax**

```
SortedKeys(val map) array

```

* **val**

    オブジェクト配列。

**例**

```
var val map
var arr array
val["k2"] = "v2"
val["k1"] = "v1"
arr = SortedKeys(val)
```



### CallContract {#callcontract}

指定された名前でコントラクトを呼び出します。 コントラクト内のデータ セクションのすべてのパラメーターはオブジェクト配列に含まれている必要があります。この関数は、指定されたコントラクトによって **$result** 変数に割り当てられた値を返します。

**Syntax**

```
CallContract(name string, params map)

```

* **name**

    呼び出されるスマート コントラクトの名前。
* **params**

    コントラクト入力データの連想配列。

**例**

```
var par map
par["Name"] = "My Name"
CallContract("MyContract", par)
```



### ContractAccess {#contractaccess}

実行されているコントラクトの名前が、パラメーターにリストされている名前のいずれかと一致するかどうかを確認します。 通常、テーブルへのコントラクト アクセスを制御するために使用されます。 テーブルフィールドを編集する場合、またはテーブルの権限セクションで新しい列フィールドを挿入および追加する場合は、権限フィールドでこの機能を指定してください。

**Syntax**

  

```
ContractAccess(name string, [name string]) bool
```

* **name**

    スマートコントラクト名。

**例**

```
ContractAccess("MyContract")
ContractAccess("MyContract","SimpleContract")
```



### ContractConditions {#contractconditions}

指定された名前でコントラクト内の条件セクションを呼び出します。

このタイプのスマート コントラクトの場合、データ セクションは空である必要があります。 条件セクションがエラーなく実行された場合、true を返します。 実行中にエラーが発生した場合、親スマート コントラクトもエラーにより終了します。 この関数は通常、テーブルへのコントラクトのアクセスを制御するために使用され、システム テーブルを編集するときに権限フィールドで呼び出すことができます。

**Syntax**

```
ContractConditions(name string, [name string]) bool

```

* **name**

    コントラクト名。

**例**

```
ContractConditions("MainCondition")
```



### EvalCondition {#evalcondition}

tablename テーブルから 'name' フィールドを持つレコードの condfield フィールドの値を取得し、condfield フィールド値の条件をチェックします。

**Syntax**

```
EvalCondition(tablename string, name string, condfield string)

```

* **tablename**

    テーブル名。
*  **name**

    `name`フィールドの値をクエリします。
*  **condfield**

    条件をチェックする必要があるフィールドの名前。

**例**

```
EvalCondition(`menu`, $Name, `conditions`)
```



### GetContractById {#getcontractbyid}

コントラクト ID によってコントラクト名を返します。 コントラクトが見つからない場合は、空の文字列が返されます。

**Syntax**

```
GetContractById(id int) string

```

* **Id**

  コントラクトテーブルのコントラクトIDです。

**例**

```
var name string
name = GetContractById($IdContract)
```



### GetContractByName {#getcontractbyname}

この関数は、コントラクト名によってそのコントラクトのIDを返します。コントラクトが見つからない場合は、ゼロが返されます。

**Syntax**

```
GetContractByName(name string) int
```

* **name**

    コントラクトテーブルのcontractsにおけるコントラクト名です。

**例**

```
var id int
id = GetContractByName(`NewBlock`)
```



### RoleAccess {#roleaccess}

コントラクト呼び出し元のロール ID がパラメーターで指定された ID のいずれかと一致するかどうかを確認します。

この関数を使用して、テーブルやその他のデータへのコントラクト アクセスを制御できます。

**Syntax**

 

```
RoleAccess(id int, [id int]) bool
```

* **Id**

    ロールID。

**例**

```
RoleAccess(1)
RoleAccess(1, 3)
```



### TransactionInfo {#transactioninfo}

指定されたハッシュ値によってトランザクションをクエリし、実行されたコントラクトとそのパラメータに関する情報を返します。

**Syntax**

```
TransactionInfo(hash: string)
```

  * **hash**

    16 進文字列形式のトランザクション ハッシュ。
  
> **Return value**

  この関数は、JSON 形式の文字列を返します。

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

  

  *   **contract**

      コントラクト名。
  
  *   **params**

      コントラクトパラメータに渡されるデータ。
  *   **block**

      トランザクションを処理したブロックの ID。

**例**

```
var out map
out = JSONDecode(TransactionInfo(hash))
```



### Throw {#throw}

  例外タイプのエラーを生成します。

**Syntax**

  

```
Throw(ErrorId string, ErrDescription string)
```

* **ErrorId**

    エラー識別子。

* **ErrDescription**

    エラーの説明。

>  **Return value**

  このタイプのトランザクション結果の形式は次のとおりです。

```
{"type":"exception","error":"Error description","id":"Error ID"}
```

**例**

```
Throw("Problem", "There is a problem")
```



### ValidateCondition {#validatecondition}

  条件パラメータで指定された条件をコンパイルしようとします。 コンパイル処理中にエラーが発生した場合、エラーが生成され、呼び出されたコントラクトは終了します。 この関数は、条件付き書式の正確性をチェックするように設計されています。

**Syntax**

```
ValidateCondition(condition string, state int)
```

* **condition**

    検証する必要がある条件付き書式。
* **state**

    エコシステムID。 グローバル条件をチェックする場合は0を指定してください。

**例**

```
ValidateCondition(`ContractAccess("@1MyContract")`, 1)
```



### AddressToId {#addresstoid}

ウォレットアドレスごとに対応するアカウントアドレスを返します。 無効なアドレスが指定された場合は、`0`が返されます。

**Syntax**

```
AddressToId(address string) int

```

*  Address

    「XXXX-...-XXXX」形式または数値形式のウォレットアドレス。

**例**

```
wallet = AddressToId($Recipient)
```



### IdToAddress {#idtoaddress}

アカウントアドレスごとに対応するウォレットアドレスを返します。 無効なアドレスが指定された場合は、無効なアドレス`invalid`が返されます。

**Syntax**

```
IdToAddress(id int) string

```

*  **Id**

    アカウントアドレス。

**例**

```
$address = IdToAddress($id)
```



### PubToID {#pubtoid}

アカウント アドレスは、16 進形式の公開鍵によって返されます。

**Syntax**

```
PubToID(hexkey string) int

```

*  **hexkey**

    16進数形式の公開鍵です。

**例**

  

```
var wallet int
wallet = PubToID("04fa5e78.....34abd6")
```



### DecodeBase64 {#decodebase64}

Base64形式を指定して文字列を返します。

**Syntax**

```
DecodeBase64(input string) string

```

*  **Input**

    Base64形式の文字列。

**例**

```
val = DecodeBase64(mybase64)
```



### EncodeBase64 {#encodebase64}

文字列を指定してbase64形式の文字列を返します。

**Syntax**

```
EncodeBase64(input string) string

```

*  **Input**

    エンコードされる文字列。

**例**

 

```
var base64str string
base64str = EncodeBase64("my text")
```



### Float {#float}

整数または文字列を浮動小数点数に変換します。

**Syntax**

```
Float(val int|string) float

```

* **val**

    整数または文字列です。

**例**

```
val = Float("567.989") + Float(232)
```



### HexToBytes {#hextobytes}

16進形式の文字列をバイト型のバイトに変換します。

**Syntax**

```
  HexToBytes(hexdata string) bytes

```

*  **hexdata**

    16進形式の文字列です。

**例**

```
var val bytes
val = HexToBytes("34fe4501a4d80094")
```



### FormatMoney {#formatmoney}

exp / 10 ^ digit の文字列値を返します。

**Syntax**

  

```
FormatMoney(exp string, digit int) string
```

* **Exp**

    文字列形式の数値。

* **digit**

    式 `Exp/10^digit` の 10 の指数 (正または負)。 正の値は小数点以下の桁を決定します。

**例**

```
  s = FormatMoney("78236475917384", 0)
```



### Random {#random}
```
Returns a random number between min and max (min <= result <max). Both min and max must be positive numbers.
```

**Syntax**

 

```
Random(min int, max int) int
```

* **min**

    The minimum value among random numbers.

* **max**

    The upper limit of random numbers. The random number generated will be less than this value.

**例**

```
i = Random(10,5000)
```



### Int {#int}

文字列形式の値を整数に変換します。

**Syntax**

```
Int(val string) int
```

* **val**

    文字列形式の数値。

**例**

```
mystr = "-37763499007332"
val = Int(mystr)
```



### Hash {#hash}

  システム暗号化ライブラリ crypto によって生成される、指定されたバイト配列または文字列のハッシュを返します。

**Syntax**

 

```
Hash(val interface{}) string, error
```

* **val**

    文字列またはバイト配列。

**例**

```
var hash string
hash = Hash("Test message")
```



### Sha256 {#sha256}

  指定された文字列の SHA256 ハッシュを返します。

**Syntax**

 

```
Sha256(val string) string
```

* **val**

    文字列には Sha256 ハッシュ操作が必要です。

**例**

```
var sha string
sha = Sha256("Test message")
```



### Str {#str}

整数 int または浮動小数点数 float を文字列に変換します。

**Syntax**

  

```
Str(val int|float) string
```

* **val**

    整数または浮動小数点数。

**例**

```
myfloat = 5.678
val = Str(myfloat)
```



### JSONEncode {#jsonencode}

数値、文字列、または配列を JSON 形式の文字列に変換します。

**Syntax**

```
JSONEncode(src int|float|string|map|array) string

```

* **src**

    変換するデータ。

**例**

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncode(mydata)
```



### JSONEncodeIndent {#jsonencodeindent}

指定されたインデントを使用して、数値、文字列、または配列を JSON 形式の文字列に変換します。

**Syntax**

```
JSONEncodeIndent(src int|float|string|map|array, indent string) string

```

* **src**

    変換するデータ。

* **Indent**

    文字列はインデントとして使用されます。

**例**

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncodeIndent(mydata, "\t")
```



### JSONDecode {#jsondecode}

JSON 形式の文字列を数値、文字列、または配列に変換します。

**Syntax**

```
JSONDecode(src string) int|float|string|map|array

```

*  **src**

    JSON 形式のデータを含む文字列。

**例**

```
var mydata map
mydata = JSONDecode(`{"name": "John Smith", "company": "Smith's company"}`)
```



### HasPrefix {#hasprefix}

文字列が指定された文字列で始まるかどうかを確認します。

**Syntax**

  

```
HasPrefix(s string, prefix string) bool
```

* **s**

    文字列。

* **prefix**

    チェックするプレフィックス。

> **Return value**

  文字列が指定された文字列で始まる場合、`true` が返されます。

**例**

```
if HasPrefix($Name, `my`) {
  ...
}
```



### Contains {#contains}

文字列に指定された部分文字列が含まれているかどうかを確認します。

**Syntax**

 

```
Contains(s string, substr string) bool
```

* **s**

    文字列。

* **substr**

    部分文字列。

> **Return value**

  文字列に部分文字列が含まれている場合は、`true`を返します。

**例**

```
if Contains($Name, `my`) {
  ...
}
```



### Replace {#replace}

文字列内の古い (古い文字列) を新しい (新しい文字列) に置き換えます。

**Syntax**

```
Replace(s string, old string, new string) string

```

* **s**

   元の文字列。

* **Old**

    置換する部分文字列。

* **new**

    新しい文字列。

**例**

```
s = Replace($Name, `me`, `you`)
```



### Size {#size}

指定された文字列のバイト数を返します。

**Syntax**

```
Size(val string) int

```

* **val**

    文字列。

**例**

```
var len int
len = Size($Name)
```



### Sprintf {#sprintf}

この関数は、指定されたテンプレートとパラメーターを使用して文字列を作成します。

Available wildcards:
* `%d` (integer)
* `%s` (string)
* `%f` (float)
* `%v` (any type)
**Syntax**

```
Sprintf(pattern string, val ...) string

```

* **pattern**

    文字列テンプレート。

**例**

```
out = Sprintf("%s=%d", mypar, 6448)
```



### Substr {#substr}

オフセット offset (デフォルトでは 0 から計算) から始まる指定された文字列から取得された部分文字列を返します。最大長は length に制限されます。

オフセットまたは長さがゼロより小さい場合、またはオフセットが長さより大きい場合は、空の文字列が返されます。

オフセットと長さの合計が文字列サイズより大きい場合は、オフセットから文字列の末尾までの部分文字列が返されます。

**Syntax**

```
Substr(s string, offset int, length int) string

```

* **val**

    文字列。

* **Offset**

    オフセット。

* **length**

    部分文字列の長さ。

**例**

```
var s string
s = Substr($Name, 1, 10)
```



### ToLower {#tolower}

指定された文字列を小文字で返します。

**Syntax**

```
ToLower(val string) string

```

* **val**

    文字列。

**例**

```
val = ToLower(val)
```



### ToUpper {#toupper}

指定された文字列を大文字で返します。

**Syntax**

```
ToUpper(val string) string

```

* **val**

    文字列。

**例**

```
val = ToUpper(val)
```



### TrimSpace {#trimspace}

指定された文字列の先頭と末尾のスペース、タブ、改行を削除します。

**Syntax**

```
TrimSpace(val string) string

```

* **val**

    文字列。

**例**

 

```
var val string
val = TrimSpace(" mystr ")
```



### Floor {#floor}

指定された数値、浮動小数点数値、および文字列以下の最大の整数値を返します。

**Syntax**

```
Floor(x float|int|string) int
```

* **x**

数値、浮動小数点数、文字列。

**例**

```
val = Floor(5.6) // returns 5
```



### Log {#log}

指定された数値、浮動小数点数値、文字列の自然対数を返します。

**Syntax**

```
Log(x float|int|string) float

```

*  **x**

    数値、浮動小数点数、文字列。

**例**

```
val = Log(10)
```



### Log10 {#log10}

指定された数値、浮動小数点数値、および文字列の底 10 の対数を返します。

**Syntax**

```
Log10(x float|int|string) float

```

* **x**

    数値、浮動小数点数、文字列。

**例**

 

```
val = Log10(100)
```



### Pow {#pow}

指定された基数を指定されたべき乗 (xy) で返します。

**Syntax**

```
Pow(x float|int|string, y float|int|string) float

```

* **x**

    ベース番号。

* **y**

    Exponent.

**例**

```
val = Pow(2, 3)

```

### Round {#round}

指定された数値を最も近い整数に四捨五入した値を返します。

**Syntax**

```
Round(x float|int|string) int

```

* **x**

    数値。

**例**

```
val = Round(5.6)
```

### Sqrt {#sqrt}

指定された数値の平方根を返します。

```
Sqrt(x float|int|string) float

```

* **x**

    数値。

**例**

```
val = Sqrt(225)
```



### StringToBytes {#stringtobytes}

文字列をバイトに変換します。

**Syntax**

```
StringToBytes(src string) bytes

```

* **src**

    文字列。

**例**

 

```
var b bytes
b = StringToBytes("my string")
```



### BytesToString {#bytestostring}

バイトを文字列に変換します。

**Syntax**

```
BytesToString(src bytes) string

```

* **src**

    バイト。

**例**

```
var s string
s = BytesToString($Bytes)
```



### SysParamString {#sysparamstring}

指定されたプラットフォーム パラメータの値を返します。

**Syntax**

```
SysParamString(name string) string

```

* **name**

    パラメータ名。

**例**

```
url = SysParamString(`blockchain_url`)
```



### SysParamInt {#sysparamint}

指定されたプラットフォーム パラメーターの値を数値の形式で返します。

**Syntax**

```
SysParamInt(name string) int

```

* **name**

    パラメータ名。

**例**

```
maxcol = SysParam(`max_columns`)
```



### DBUpdateSysParam {#dbupdatesysparam}

プラットフォームパラメータの値と条件を更新します。 値や条件を変更する必要がない場合は、該当パラメータに空文字列を指定してください。

**Syntax**

```
DBUpdateSysParam(name, value, conditions string)

```

* **name**

    パラメータ名。

* **value**

    パラメータの新しい値。

* **conditions**

    パラメータを更新するための新しい条件。

**例**

```
DBUpdateSysParam(`fuel_rate`, `400000000000`, ``)

```

### UpdateNotifications {#updatenotifications}

指定されたキーの通知リストをデータベースから取得し、取得した通知を Centrifugo に送信します。

**Syntax**

```
UpdateNotifications(ecosystemID int, keys int...)

```

* **EcosystemID**

    エコシステムID。

* **key**

    カンマで区切られたアカウント アドレスのリスト。 または、配列を使用してアカウント アドレスのリストを指定することもできます。

**例**

```
UpdateNotifications($ecosystem_id, $key_id, 23345355454, 35545454554)
UpdateNotifications(1, [$key_id, 23345355454, 35545454554])
```



### UpdateRolesNotifications {#updaterolesnotifications}

データベース内の指定されたロール ID のすべてのアカウント アドレスの通知リストを取得し、取得した通知を Centrifugo に送信します。

**Syntax**

```
UpdateRolesNotifications(ecosystemID int, roles int ...)

```

*  **EcosystemID**

    エコシステムID。

*  **roles**

    カンマで区切られたロール ID のリスト。 または、配列を使用してロール ID のリストを指定することもできます。

**例**

```
UpdateRolesNotifications(1, 1, 2)

```

### HTTPRequest {#httprequest}

指定されたアドレスに HTTP リクエストを送信します。
> 注意

> この機能は CLB 契約でのみ使用できます。

**Syntax**

```
HTTPRequest(url string, method string, heads map, pars map) string

```

* **Url**

   リクエストが送信されるアドレス。

* **method**

    リクエストのタイプ (GET または POST)。

* **heads**

    リクエストヘッダー、オブジェクトの配列。

* **pars**

    リクエストパラメータ。

**例**

```
var ret string
var ret string
var ret string
var pars, heads, json map
heads["Authorization"] = "Bearer "+ $auth_token
pars["obs"] = "true"
ret = HTTPRequest("http://localhost:7079/api/v2/content/page/default_page","POST", heads, pars)
json = JSONToMap(ret)
```



### HTTPPostJSON {#httppostjson}

この関数は HTTPRequest 関数に似ていますが、POST リクエストを送信し、リクエスト パラメータは文字列です。

> 注意

> この機能は CLB スマートコントラクトでのみ使用できます

**Syntax**

```
HTTPPostJSON(url string, heads map, pars string) string

```

* **Url**

    リクエストが送信されるアドレス。

* **heads**

    リクエストヘッダー、オブジェクトの配列。
* **pars**

    パラメータを JSON 文字列としてリクエストします。

**Example**

```
var ret string
var ret string
var ret string
var heads, json map
heads["Authorization"] = "Bearer "+ $auth_token
ret = HTTPPostJSON("http://localhost:7079/api/v2/content/page/default_page", heads, `{"obs":"true"}`)
json = JSONToMap(ret)
```



### BlockTime {#blocktime}

ブロックの生成時刻をSQL形式で返します。

**Syntax**

```
BlockTime()
```



**例**

```
var mytime string
mytime = BlockTime()
DBInsert("mytable", myid, {time: mytime})
```



### DateTime {#datetime}

タイムスタンプ unixtime を YYYY-MM-DD HH:MI:SS 形式の文字列に変換します。

**Syntax**

```
DateTime(unixtime int) string
```



**例**

```
DateTime(1532325250)

```

### UnixDateTime {#unixdatetime}

YYYY-MM-DD HH:MI:SS 形式の文字列をタイムスタンプ unixtime に変換します。

**Syntax**

```
UnixDateTime(datetime string) int
```



**例**

```
UnixDateTime("2018-07-20 14:23:10")
```



### CreateOBS {#createobs}

子CLBを作成します。

この機能はマスター CLB モードでのみ使用できます。

**Syntax**

```
CreateOBS(OBSName string, DBUser string, DBPassword string, OBSAPIPort int)

```

* **OBSName**

    CLB名。

* **DBUser**

    データベースのロール名。

*  **DBPassword**

    ロールのパスワード。

* **OBSAPIPort**

    API リクエストのポート。

**例**

```
CreateOBS("obsname", "obsuser", "obspwd", 8095)

```

### GetOBSList {#getobslist}

子 CLB のリストを返します。

この機能はマスター CLB モードでのみ使用できます。

**Syntax**

```
GetOBSList()

```

> **Return value**

オブジェクトの配列。キーは CLB 名、値はプロセス状態です。

### RunOBS {#runobs}

CLB を実行するプロセス。

この機能はマスター CLB モードでのみ使用できます。

**Syntax**

```
RunOBS(OBSName string)

```

* **OBSName**

  CLB名。

  文字と数字のみを含めることができ、スペース記号は使用できません。

### StopOBS {#stopobs}

指定した CLB のプロセスを停止します。

この機能はマスター CLB モードでのみ使用できます。

**Syntax**

```
StopOBS(OBSName string)

```

* **OBSName**

  CLB名。

  文字と数字のみを含めることができ、スペース記号は使用できません。

### RemoveOBS {#removeobs}

指定された CLB のプロセスを削除します。

この機能はマスター CLB モードでのみ使用できます。

**Syntax**

```
RemoveOBS(OBSName string)

```

* **OBSName**

CLB名。

文字と数字のみを含めることができ、スペース記号は使用できません。

## System Contracts {#system-contracts}

システム コントラクトは、IBax ブロックチェーン プラットフォームの起動時にデフォルトで作成されます。 これらすべての契約は最初のエコシステムで作成されました。 このため、他のエコシステムから呼び出すときは、`@1NewContract` のようにフルネームを指定する必要があります。

### NewEcosystem {#newecosystem}

このスマート コントラクトは新しいエコシステムを作成します。 作成されたエコシステムの ID を取得するには、[txstatus](../reference/api2.md#txstatus) で返された結果フィールドを引用する必要があります。

パラメーター：
   * **Name** 文字列 - エコシステムの名前。 後で変更することもできます。

### EditEcosystemName {#editecosystemname}

最初のエコシステムにのみ存在する 1_ecosystems テーブル内のエコシステムの名前を変更します。

パラメーター：
   * **EcosystemID** int - エコシステム ID の名前を変更します。
   * **NewName** string - エコシステムの新しい名前。

### NewContract {#newcontract}

現在のエコシステムに新しいコントラクトを作成します。

パラメーター：
   * **ApplicationId** int - 新しいコントラクトが属するアプリケーション。
   * **値** string - コントラクト ソース コード。 上位層にはコントラクトが 1 つだけ必要です。
   * **Conditions** string - 契約の条件を変更します。
   * **TokenEcosystem** int "optional" - エコシステムID。 コントラクトがアクティブ化されるときに、トランザクションにどのトークンが使用されるかを決定します。

### EditContract {#editcontract}

現在のエコシステムでコントラクトを編集します。

パラメーター：
   * **Id** int - 変更されたコントラクト ID。
   * **値** string "optional" - コントラクトのソース コード。
   * **Conditions** string "optional" - 契約の条件を変更します。

### BindWallet {#bindwallet}
現在のエコシステムのウォレット アドレスにコントラクトをバインドします。 スマート コントラクトを結び付けた後、スマート コントラクトの実行料金はこのアドレスに支払われます。

パラメーター：
   * **Id** int - バインドされるコントラクト ID。
   * **WalletId** string "optional" - コントラクトにバインドされたウォレット アドレス。

### UnbindWallet {#unbindwallet}

現在のエコシステムのウォレットアドレスからコントラクトのバインドを解除します。 コントラクトにバインドされているアドレスのみをバインド解除できます。 スマートコントラクトの拘束を解除した後、コントラクトを実行するユーザーは実行手数料を支払います。

パラメーター：
   * **Id** int - バインドされているコントラクトの ID。

### NewParameter {#newparameter}

A new ecosystem parameter has been added to the current ecosystem.

Parameters:
  * **Name** string - パラメータ名。
  * **Value** string - パラメータ値。
  * **Conditions** string - パラメータを変更する条件。

### EditParameter {#editparameter}

現在のエコシステム内の既存のエコシステムパラメータを変更します。

Parameters:
  * **Name** string - 変更するパラメータの名前。
  * **Value** string - 新しいパラメータ値。
  * **Conditions** string - パラメータを変更するための新しい条件。

### NewMenu {#newmenu}

現在のエコシステムに新しいメニューを追加します。

パラメータ:
  * **Name** string - メニュー名
  * **Value** string - メニューのソースコード
  * **Title** string "optional" - メニュータイトル
  * **Conditions** string - メニューを変更する条件

### EditMenu {#editmenu}

現在のエコシステムの既存のメニューを変更します。

パラメータ:
  * **Id** int - 変更するメニューのID
  * **Value** string "optional" - 新しいメニューのソースコード
  * **Title** string "optional" - 新しいメニューのタイトル
  * **Conditions** string "optional" - メニューを変更する新しい条件

### AppendMenu {#appendmenu}

現在のエコシステムの既存のメニューにソースコードのコンテンツを追加します。

パラメータ:
  * **Id** int - メニューのID
  * **Value** string - 追加するソースコード

### NewPage {#newpage}

現在のエコシステムに新しいページを追加します。

パラメータ:
  * **Name** string - ページの名前
  * **Value** string - ページのソースコード
  * **Menu** string - ページに関連付けられたメニューの名前
  * **Conditions** string - ページを変更するための条件
  * **ValidateCount** int "optional" - ページの検証に必要なノードの数。このパラメータが指定されていない場合、min_page_validate_countエコシステムパラメータの値が使用されます。このパラメータの値は、min_page_validate_count未満またはmax_page_validate_countを超えることはできません。
  * **ValidateMode** int "optional" - ページの妥当性チェックのモード。このパラメータの値が0の場合、ページが読み込まれる時点でチェックされます。このパラメータの値が1の場合、ページが読み込まれる時点やページを終了する時点でもチェックされます。


### EditPage {#editpage}

現在のエコシステム内の既存のページを変更します。

パラメータ:
  * **Id** int - 変更するページのID
  * **Value** string "optional" - 新しいページのソースコード
  * **Menu** string "optional" - ページに関連付けられる新しいメニューの名前
  * **Conditions** string "optional" - ページを変更するための新しい条件
  * **ValidateCount** int "optional" - ページの検証に必要なノードの数。このパラメータが指定されていない場合、min_page_validate_countエコシステムパラメータの値が使用されます。このパラメータの値は、min_page_validate_count未満またはmax_page_validate_countを超えることはできません。
  * **ValidateMode** int "optional" - ページの妥当性チェックのモード。このパラメータの値が0の場合、ページが読み込まれる時点でチェックされます。このパラメータの値が1の場合、ページが読み込まれる時点やページを終了する時点でもチェックされます。

### AppendPage {#appendpage}

現在のエコシステム内の既存のページにソースコードの内容を追加します。

パラメータ:
  * **Id** int - 変更するページのID
  * **Value** string - 追加するソースコード

### NewBlock {#newblock}

現在のエコシステムにページモジュールを追加します。

パラメータ:
  * **Name** string - モジュールの名前
  * **Value** string - モジュールのソースコード
  * **Conditions** string - モジュールを変更するための条件

### EditBlock {#editblock}

現在のエコシステム内のページモジュールを変更します。

パラメータ:
  * Id int - 変更するモジュールのID
  * Value string - 新しいモジュールのソースコード
  * Conditions string - モジュールを変更するための新しい条件

### NewTable {#newtable}

Adds a new table to the current ecosystem.

現在のエコシステムに新しいテーブルを追加します。

パラメーター：
  * **ApplicationId** int - 関連するテーブルのアプリケーションID
  * **Name** string - 新しいテーブルの名前
  * **Columns** string - JSON形式のフィールド配列 `[{"name":"...", "type":"...","index": "0", "conditions":".. ."},...]`。以下の項目が含まれます：
    * **name** - フィールド名（英字のみ）
    * **type** - データ型 `varchar,bytea,number,datetime,money,text,double,character`
    * **index** - 非主キーフィールド `0`、主キー `1`
    * **conditions** - フィールドデータを変更するための条件。アクセス許可はJSON形式で指定する必要があります `{"update":"ContractConditions(MainCondition)", "read":"ContractConditions(MainCondition)"}`
  * **Permissions** string - アクセス許可を示すJSON形式 `{"insert": "...", "new_column": "...", "update": "...", "read": ".. ."}`。以下の項目が含まれます：
    * **insert** - エントリの挿入権限
    * **new_column** - 新しい列の追加権限
    * **update** - エントリデータの変更権限
    * **read** - エントリデータの読み取り権限

### EditTable {#edittable}

現在のエコシステム内のテーブルのアクセス許可を変更します。

パラメーター：
   * **Name** string - テーブルの名前。
   * **InsertPerm** string - テーブルにエントリを挿入する権限。
   * **UpdatePerm** string - テーブル内のエントリを更新する権限。
   * **ReadPerm** string - テーブル内のエントリを読み取る権限。
   * **NewColumnPerm** string - 新しい列を作成する権限。

### NewColumn {#newcolumn}

現在のエコシステムのテーブルに新しいフィールドを追加します。

パラメーター：
   * **TableName** string - テーブル名。
   * **名前** string - ラテン文字のフィールド名。
   * **Type** string - データ型 `varchar,bytea,number,money,datetime,text,double,character`;
   * **UpdatePerm** string - 列の値を変更する権限。
   * **ReadPerm** string - 列の値を読み取る権限。

### EditColumn {#editcolumn}

現在のエコシステム内の指定されたテーブルフィールドの権限を変更します。

パラメーター：
   * **TableName** string - テーブル名。
   * **Name** string - 変更するラテン文字のフィールド名。
   * **UpdatePerm** string - 列の値を変更するための新しい権限。
   * **ReadPerm** string - 列の値を読み取るための新しい権限。

### NewLang {#newlang}

現在のエコシステムに言語リソースを追加します。そのための権限は、エコシステム パラメーターの Changing_Language パラメーターに設定されます。

パラメーター：

   * **Name** string  - ラテン文字での言語リソースの名前。
   * **Trans** string - 2 文字の lang コードをキーとし、翻訳された文字列を値とする JSON 形式の文字列。 例: `{"en": "英語テキスト"、"jp": "日本語テキスト"}`。

### EditLang {#editlang}

現在のエコシステム内の言語リソースを変更します。変更するための権限は、エコシステム パラメーターの Changing_Language パラメーターに設定されます。

パラメーター：

   * **Id** int - 言語リソース ID。
   * **Trans** - 2 文字の lang コードをキーとし、翻訳された文字列を値とする JSON 形式の文字列。例: `{"en": "英語テキスト"、"jp": "日本語テキスト"}`。

### Import {#import}

アプリケーションを現在のエコシステムにインポートし、[ImportUpload](#importupload) コントラクトからロードされたデータをインポートします。

パラメーター：

   * **データ** string - エコシステムによってエクスポートされたファイルから取得される、テキスト形式でインポートされたデータ。

### ImportUpload {#importupload}

後続のインポートのために、外部アプリケーション ファイルを現在のエコシステムのbuffer_data テーブルにロードします。

パラメーター：
   * **InputFile** ファイル - 現在のエコシステムのbuffer_data テーブルに書き込まれるファイル。

### NewAppParam {#newappparam}

新しいアプリケーションパラメータを現在のエコシステムに追加します。

パラメーター：
   * **ApplicationId** int - アプリケーション ID;
   * **Name** string - パラメータ名。
   * **alue** string - パラメータ値。
   * **Conditions** string - パラメーターを変更する権限。

### EditAppParam {#editappparam}

現在のエコシステム内の既存のアプリケーションパラメータを変更します。

パラメーター：
  * **Id** int - アプリケーション パラメータ ID。
  * **Value** string "optional" - 新しいパラメーター値。
  * **Conditions** string "optional" - パラメータを変更するための新しい権限。

### NewDelayedContract {#newdelayedcontract}

新しいタスクを遅延コントラクトスケジューラー デーモンに追加します。

遅延コントラクト スケジューラは、現在生成されているブロックに必要なコントラクトを実行します。

パラメーター：
  * **Contract** string - コントラクト名。
  * **EveryBlock** int - コントラクトはブロックの量ごとに実行されます。
  * Conditions string - タスクを変更する権限。
  * **BlockID** int "optional" - コントラクトを実行する必要があるブロック ID。 指定しない場合は、「現在のブロック ID」+EveryBlock を加算して自動的に計算されます。
  * **Limit** int "optional" - タスク実行の最大数。 指定しない場合、タスクは無制限に実行されます。

### EditDelayedContract {#editdelayedcontract}

遅延コントラクトスケジューラ デーモンのタスクを変更します。

パラメーター：
  * **Id** int - タスク ID;
  * **Contract** string - コントラクト名。
  * **EveryBlock** int - コントラクトはブロックの量ごとに実行されます。
  * **Conditions** string - タスクを変更する権限。
  * **BlockID** int "optional" - コントラクトを実行する必要があるブロック ID。 指定しない場合は、「現在のブロック ID」+EveryBlock を加算して自動的に計算されます。
  * **Limit** int "optional" - タスク実行の最大数。 指定しない場合、タスクは無制限に実行されます。
  * **Deleted** int "optional" - タスクの切り替え。 値「1」はタスクを無効にします。 値`0`はタスクを有効にします。

### UploadBinary {#uploadbinary}

X_binaries テーブルに静的ファイルを追加または上書きします。 HTTP API 経由でコントラクトを呼び出す場合、リクエストは`multipart/form-data`形式である必要があります。 DataMimeType パラメータはフォーム データと組み合わせて使用されます。

パラメーター：
  * **Name** string - 静的ファイルの名前。
  * **Data** bytes - 静的ファイルの内容。
  * **DataMimeType** string "optional" - 静的ファイルの MIME タイプ
  * **ApplicationId** int - X_binaries テーブルに関連付けられたアプリケーション ID

DataMimeType パラメータが渡されない場合、デフォルトで `application/octet-stream` 形式が使用されます。
