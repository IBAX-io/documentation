# 智能合约 {#smart-contracts}

<!-- TOC -->

- [智能合约结构](#contract-structure)
    - [数据部分](#data-section)
    - [条件部分](#conditions-section)
    - [操作部分](#action-section)
- [变量](#variables)
- [嵌套智能合约](#nested-contracts)
- [文件上传](#file-upload)
- [JSON格式查询语句](#queries-in-json-format)
- [日期时间格式查询语句](#queries-with-date-and-time-operations)
- [needle 智能合约语言](#needle-contract-language)
    - [基本要素和结构](#basic-elements-and-structure)
    - [数据类型和变量](#data-types-and-variables)
    - [数组](#array)
    - [If和While语句](#if-and-while-statements)
    - [函数](#functions)
        - [函数声明](#function-declaration)
        - [可变长度参数](#variable-length-parameters)
        - [可选参数](#optional-parameters)
- [needle 函数功能分类](#needle-functions-classification)
- [needle 函数参考](#needle-functions-reference)
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
- [系统智能合约](#system-contracts)
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

<!-- /TOC -->


用户在页面中执行智能合约通常是单个操作，结果是更改或创建数据库的条目。应用程序的所有数据操作形成了智能合约系统，这些智能合约通过数据库或者智能合约内容的函数彼此交互。

## 智能合约结构 {#contract-structure}

使用 **contract**关键字声明智能合约，后面接上智能合约名称，智能合约内容必须用大括号括起来。智能合约结构有三个主要部分：

> 1.  **data** - [数据部分](#data-section)，声明输入数据的变量，包括变量名称和变量类型；
> 2.  **conditions** - [条件部分](#conditions-section)，验证数据的正确性；
> 3.  **action** - [操作部分](#action-section)，执行数据操作的动作。

``` js
contract MyContract {
    data {
        FromId int
        ToId   int
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

### 数据部分 {#data-section}

`data` 部分描述了智能合约数据输入以及接收的表单参数。

每行的依次顺序结构：

> -   *变量名称* - 只接收变量，不支持接收数组；
> -   *变量数据类型* - 变量的 [数据类型](#data-types-and-variables)；
> -   *optional* - 可选参数，不需要填充的表单元素。

``` js
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

### 条件部分 {#conditions-section}

`conditions` 部分描述了对接收的数据进行验证。

以下命令用于错误警告：严重性错误 `error`、警告性错误`warning`、提示性错误`info`，这三种命令都会生成一个终止智能合约执行的错误，每个错误都会打印不同类型的错误日志信息。例如：

``` js
if fuel == 0 {
      error "fuel cannot be zero!"
}
if money < limit {
      warning Sprintf("You don't have enough money: %v < %v", money, limit)
}
if idexist > 0 {
      info "You have already been registered"
}
```

### 操作部分 {#action-section}

`action`部分描述了智能合约的主要代码，该代码检索其他数据并将结果值记录到数据库表中。例如：

``` js
action {
    DBUpdate("keys", $key_id, {"-amount": $amount})
    DBUpdate("keys", $recipient, {"+amount": $amount, "pub": $Pub})
}
```

## 变量 {#variables}

**data** 部分声明的变量通过 `$`符号后面跟上变量名称传递给其他智能合约部分。`$`符号也可以声明其他不在数据部分内的变量。这些变量被认为是这个智能合约和所有嵌套该智能合约的全局变量。

智能合约内可以使用预定义变量，这些变量包含调用该智能合约的交易数据：

> -   `$time` -- 交易时间戳；
> -   `$ecosystem_id` -- 生态系统ID；
> -   `$block` -- 包含该交易的区块ID；
> -   `$key_id` -- 签署当前交易的账户地址；
> -   `$type` 虚拟机中智能合约ID；
> -   `$block_key_id` -- 生成区块的节点账户地址；
> -   `$block_time` -- 区块生成时间戳；
> -   `$original_contract` -- 最初进行交易处理的智能合约名称。如果该变量为空字符串，表示交易在验证过程中调用了该智能合约。要检查该智能合约是由另一个智能合约调用还是直接从交易调用，需要比较 *\$original_contract* 和 *\$this_contract* 的值。 如果它们相等，则表示智能合约是从交易调用的；
> -   `$this_contract` -- 当前执行智能合约名称；
> -   `$guest_key` -- 访客账户地址；
> -   `$stack` -- 智能合约数组堆栈，\*array\* 类型，包含所有执行的智能合约，数组第一个元素表示当前执行的智能合约名称，最后一个元素表示最初进行交易处理的智能合约名称；
> -   `$node_position` -- 区块所在的验证节点数组的索引号；
> -   `$txhash` -- 交易哈希；
> -   `$contract` -- 当前智能合约结构数组。

预定义变量不仅可以在智能合约中访问，还可以在定义应用程序元素的访问权限条件的权限字段中访问。当用于权限字段时，关于区块信息的预定义变量始终等于零，例如`$time`， `$block` 等。

预定义变量 `$result` 赋值于智能合约的返回结果。

``` js
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

## 嵌套智能合约 {#nested-contracts}

在智能合约的 *conditions* 和 *action*部分可以嵌套合约。嵌套合约可以直接调用，合约参数在其合约名称后面的括号中指定，例如，`@1NameContract(Params)`。也可以使用[CallContract](#CallContract) 函数调用。

## 文件上传 {#file-upload}

使用 `multipart/form-data` 格式的表单上传文件，合约的数据类型必须是`file`。

``` js
contract Upload {
    data {
        File file
    }
    ...
}
```
[UploadBinary](#UploadBinary) 合约用于上传和存储文件。在页面编辑器使用 Logicor 语言的函数[Binary](templates2.md#binary) 可以获取文件下载链接。

## JSON格式查询语句 {#queries-in-json-format}

在合约语言中，**JSON** 格式类型可以指定为字段类型。使用语法：

**columnname->fieldname** 来处理条目字段。获得的值记录在**columnname.fieldname**。 

上述语法可以在[DBFind](templates2.md#dbfind) 函数的*Columns,One,Where* 中使用。

``` js
var ret map
var val str
var list array
ret = DBFind("mytable").Columns("myname,doc,doc->ind").WhereId($Id).Row()
val = ret["doc.ind"]
val = DBFind("mytable").Columns("myname,doc->type").WhereId($Id).One("doc->type")
list = DBFind("mytable").Columns("myname,doc,doc->ind").Where("doc->ind = ?", "101")
val = DBFind("mytable").WhereId($Id).One("doc->check")
```

## 日期时间格式查询语句 {#queries-with-date-and-time-operations}

合约语言函数不能直接查询和更新日期时间，但是可以像示例中在Where语句中使用PostgreSQL的函数和功能。例如，需要比较字段*date_column* 和当前时间，如果 *date_column*是timestamp类型，那么表达式为 `date_column < NOW()`；如果 *date_column*是Unix类型，那么表达式为 `to_timestamp(date_column) > NOW()`。

``` js
Where("to_timestamp(date_column) > NOW()")
Where("date_column < NOW() - 30 * interval '1 day'")
```

以下 Needle 函数是处理SQL格式的日期和时间：

* [BlockTime](#blocktime)
* [DateTime](#datetime)
* [UnixDateTime](#unixdatetime)

## needle 合约语言 {#needle-contract-language}

该语言包括一组函数、运算符和结构，可实现数据算法处理和数据库操作。

在编辑合约权限不为 `false`的条件下，合约内容可以修改。对合约更改的完整历史记录存储在区块链中，从Weaver 可获知更改情况。

区块链中的数据操作由最新版本的合约执行。

### 基本要素和结构 {#basic-elements-and-structure}

### 数据类型和变量 {#data-types-and-variables}

每个变量必须定义数据类型，通常情况下，数据类型会自动转换。可以使用以下数据类型：

> -   `bool` - 布尔值，`true` 和 `false`；
>
> -   `bytes` - 字节格式；
>
> -   `int` - 64位整数型；
>
> -   `array` - 任意类型值的数组；
>
> -   `map` - 对象数组；
>
> -   `money` - 大整数类型；
>
> -   `float` - 64位浮点型；
>
> -   `string` - 字符串，双引号或转义格式： \"This is a string\" 或者
>     \`This is a string\`；
>
> -   `file` - 对象数组：
>
>     > -   `Name` - 文件名称，`string` 类型；
>     > -   `MimeType` - **mime-type** 文件格式，`string` 类型；
>     > -   `Body` - 文件内容，，`bytes` 类型。

所有标识符，包括变量、函数和合约等的名称都区分大小写（MyFunc和myFunc是不同的名称）。

使用 **var**关键字声明变量，后跟变量的名称和类型。在大括号内声明的变量必须在同一对大括号内使用。

声明的变量具有默认零值：bool类型的零值false，所有数字类型的零值0，字符串类型的零值空字符串，变量声明示例：

``` js
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

### 数组 {#array}

该语言支持两种数组类型：

-   `array` - 索引从0开始的数组；
-   `map` - 对象数组。

分配和检索数组元素时，索引必须放在方括号中。数组中不支持多个索引，不能将数组元素作为 *myarr\[i\]\[j\]* 来处理。

``` js
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

您还可以在 `[]` 通过指定元素定义 `array` 类型。对于 `map`类型数组，请使用 `{}`。

``` js
var my map
my={"key1": "value1", key2: i, "key3": $Name}
var mya array
mya=["value1", {key2: i}, $Name]
```

您可以在表达式中使用这样的初始化。例如，在函数参数中使用。

``` js
DBFind...Where({id: 1})
```

对于对象数组，您必须指定一个键。键用双引号（`""`）指定字符串。如果键名仅限于字母，数字和下划线，则可以省略双引号。

``` js
{key1: "value1", key2: "value2"}
```

数组可以包含字符串、数字、任何类型的变量名称和带 `$`符号的变量名称。支持嵌套数组，可以将不同的映射或数组指定为值。

表达式不能用作数组元素，使用一个变量来存储表达式结果并指定这个变量为数组元素。

``` js
[1+2, myfunc(), name["param"]] // don't do this
[1, 3.4, mystr, "string", $ext, myarr, mymap, {"ids": [1,2, i], company: {"Name": "MyCompany"}} ] // this is ok

var val string
val = my["param"]
MyFunc({key: val, sub: {name: "My name", "color": "Red"}})
```

### If和While语句 {#if-and-while-statements}

合约语言支持标准 **if** 条件语句和 **while**循环，可以在合约和函数中使用。这些语句可以相互嵌套。

**if** 和 **while** 关键字后必须跟条件语句。如果条件语句返回一个数字，则当其值为0，被视为*false*。

*val == 0* 等于 *!val*，*val != 0* 等于 *val*。**if** 语句可以有**else** 代码块，在 **if** 条件语句为 *false* 时执行 **else** 。

以下比较运算符可用于条件语句：`<, >, >=, <=, ==, !=, ||, &&`

``` js
if val > 10 || id != $block_key_id {
    ...
} else {
    ...
}
```

**while** 循环的条件语句为 *true* 时执行代码块。**break**表示结束代码块的循环，想要从头开始循环请使用 **continue**。

``` js
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

除了条件语句外，needle 还支持标准的算术运算：`+`, `-`, `*`, `/`。

**string** 和 **bytes**类型可以作为条件语句，如果类型长度大于零时，条件为 *true*，反之为 *false*。

### 函数 {#functions}

函数可以对合约 [数据部分](#data-section)接收的数据执行一些操作：读取和写入数据库的数据、转换值的类型以及建立合约之间的交互。

#### 函数声明 {#function-declaration}

使用 **func**关键词声明一个函数，后面是函数名称和传递给它的参数列表及其参数类型，所有参数都用小括号括起来，用逗号分隔。在小括号之后，必须声明函数返回值的数据类型。函数体必须用大括号括起来。如果函数没有参数，那么大括号可以省略。使用`return` 关键字返回函数返回值。

``` js
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

函数不会返回错误，因为所有错误检查都是自动执行的。当在任何函数中出现错误时，合约将停止其操作并显示包含错误描述的窗口。

#### 可变长度参数 {#variable-length-parameters}

函数可以定义可变长度参数，使用 `...`符号作为函数的最后一个参数类型，表示可变长度参数，其数据类型为`array`。可变长度参数包含从调用传递该参数变量开始的所有变量。任何类型的变量都可以传递，但是您需要处理与数据类型不匹配的冲突。

``` js
func sum(out string, values ...) {
    var i, res int

    while i < Len(values) {
       res = res + values[i]
       i = i + 1
    }
    Println(out, res)
}

func main() {
   sum("Sum:", 10, 20, 30, 40)
}
```

#### 可选参数 {#optional-parameters}

函数有很多参数，但在调用它时我们只需要其中某些参数。这样的情况下，您可以通过以下方式声明可选参数：`func myfunc(name string).Param1(param string).Param2(param2 int) {...}`，这样您就可以调用任意顺序指定的参数：`myfunc("name").Param2(100)`。

在函数体中，您可以像正常处理这些变量。如果未调用指定的可选参数，它们默认为零值。您还可以使用`...`指定可变长度参数：`func DBFind(table string).Where(request string, params ...)`。然后调用它：`DBFind("mytable").Where({"id": $myid, "type": 2})`。

``` js
func DBFind(table string).Columns(columns string).Where(format string, tail ...)
         .Limit(limit int).Offset(offset int) string  {
   ...
}

func names() string {
   ...
   return DBFind("table").Columns("name").Where({"id": 100}).Limit(1)
}
```

## needle 函数功能分类 {#needle-functions-classification}

数据库检索值：

|                 |               |                 |
| --------------- | ------------- | --------------- |
| [AppParam](#appparam)        | [EcosysParam](#ecosysparam)   | [GetDataFromXLSX](#getdatafromxlsx) |
| [DBFind](#dbfind)          | [GetHistory](#gethistory)    | [GetRowsCountXLSX](#getrowscountxlsx) |
| [DBRow](#dbrow)           | [GetHistoryRow](#gethistoryrow) | [GetBlock](#getblock)        |
| [DBSelectMetrics](#dbselectmetrics) | [GetColumnType](#getcolumntype) | [LangRes](#langres)         |

更改数据表值：

|          |             |          |
| -------- | ----------- | -------- |
| [DBInsert](#dbinsert) | [DBUpdateExt](#dbupdateext) | [DelTable](#deltable) |
| [DBUpdate](#dbupdate) | [DelColumn](#delcolumn)   |          |


数组操作：

|        |      |            |
| ------ | ---- | ---------- |
| [Append](#append) | [Len](#len)  | [GetMapKeys](#getmapkeys) |
| [Join](#join)   | [Row](#row)  | [SortedKeys](#sortedkeys) |
| [Split](#split)  | [One](#one)  |            |

合约和权限操作：

|                    |                   |                   |
| ------------------ | ----------------- | ----------------- |
| [CallContract](#callcontract)       | [GetContractById](#getcontractbyid)   | [TransactionInfo](#transactioninfo)   |
| [ContractAccess](#contractaccess)     | [RoleAccess](#roleaccess)        | [Throw](#throw)             |
| [ContractConditions](#contractconditions) | [GetContractByName](#getcontractbyname) | [ValidateCondition](#validatecondition) |
| [EvalCondition](#evalcondition)      |                   |                   |

地址操作：

|             |             |         |
| ----------- | ----------- | ------- |
| [AddressToId](#addresstoid) | [IdToAddress](#idtoaddress) | [PubToID](#pubtoid) |

变量值操作：

|              |             |        |
| ------------ | ----------- | ------ |
| [DecodeBase64](#decodebase64) | [FormatMoney](#formatmoney) | [Hash](#hash)   |
| [EncodeBase64](#encodebase64) | [Random](#random)      | [Sha256](#sha256) |
| [Float](#float)        | [Int](#int)         | [Str](#str)    |
| [HexToBytes](#hextobytes)   |             |        |

算术运算：

|       |       |       |
| ----- | ----- | ----- |
| [Floor](#floor) | [Log10](#log10) | [Round](#round) |
| [Log](#log)   | [Pow](#pow)   | [Sqrt](#sqrt)  |

JSON格式操作：

|            |                  |            |
| ---------- | ---------------- | ---------- |
| [JSONEncode](#jsonencode) | [JSONEncodeIndent](#jsonencodeindent) | [JSONDecode](#jsondecode) |


字符串操作：

|           |         |           |
| --------- | ------- | --------- |
| [HasPrefix](#hasprefix) | [Size](#size)    | [ToLower](#tolower)   |
| [Contains](#contains)  | [Sprintf](#sprintf) | [ToUpper](#toupper)   |
| [Replace](#replace)   | [Substr](#substr)  | [TrimSpace](#trimspace) |


字节操作：

|               |               |      |
| ------------- | ------------- | ---- |
| [StringToBytes](#stringtobytes) | [BytesToString](#bytestostring) |      |


SQL格式的日期和时间操作：

|           |          |              |
| --------- | -------- | ------------ |
| [BlockTime](#blocktime) | [DateTime](#datetime) | [UnixDateTime](#unixdatetime) |

平台参数操作：

|           |          |              |
| --------- | -------- | ------------ |
| [SysParamString](#sysparamstring) | [SysParamInt](#sysparamint) | [DBUpdateSysParam](#dbupdatesysparam) |
| [UpdateNotifications](#updatenotifications) | [UpdateRolesNotifications](#updaterolesnotifications) | |


CLB 模式函数操作：

|           |          |              |
| --------- | -------- | ------------ |
| [HTTPRequest](#httprequest) | [HTTPPostJSON](#httppostjson) | |


主 CLB 节点函数操作：

|                         |                           |                  |
|-------------------------|---------------------------|------------------|
| [CreateOBS](#createobs) | [GetOBSList](#getobslist) | [RunOBS](#runobs) |
| [StopOBS](#stopobs)     | [RemoveOBS](#removeobs)   | |


## needle 函数参考 {#needle-functions-reference}

### AppParam {#appparam}

返回指定应用程序参数的值（来自应用程序参数表 *app_params*）。

**语法**

``` text
AppParam(app int, name string, ecosystemid int) string
```

> app

    应用程序ID。

> name

    应用程序参数名称。

> ecosystemid

    生态系统ID。

**示例**

``` js
AppParam(1, "app_account", 1)
```

### DBFind {#dbfind}

根据指定参数从指定数据表中查询数据。返回一个由对象数组 *map* 组成的数组*array*。

`.Row()` 可获得请求记录的第一个 *map* 元素，`.One(column string)` 可获得请求记录中指定列的第一个 *map* 元素。

**语法**

``` text
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

> table

    数据表名称。

> сolumns

    返回列的列表。如果未指定，则将返回所有列。
    该值为数组或使用逗号分隔的字符串。

> where

    查询条件。

    示例： `.Where({name: "John"})` 或者 `.Where({"id": {"$gte": 4}})`。
    
    此参数必须包含具有搜索条件的对象数组。该数组可以包含嵌套元素。
    
    遵循句法结构如下：

-   `{"field1": "value1", "field2" : "value2"}`

    > 等价于 `field1 = "value1" AND field2 = "value2"`。

-   `{"field1": {"$eq":"value"}}`

    > 等价于 `field = "value"`。

-   `{"field1": {"$neq": "value"}}`

    > 等价于 `field != "value"`。

-   `{"field1: {"$in": [1,2,3]}`

    > 等价于 `field IN (1,2,3)`。

-   `{"field1": {"$nin" : [1,2,3]}`

    > 等价于 `field NOT IN (1,2,3)`。

-   `{"field": {"$lt": 12}}`

    > 等价于 `field < 12`。

-   `{"field": {"$lte": 12}}`

    > 等价于 `field <= 12`。

-   `{"field": {"$gt": 12}}`

    > 等价于 `field > 12`。

-   `{"field": {"$gte": 12}}`

    > 等价于 `field >= 12`。

-   `{"$and": [<expr1>, <expr2>, <expr3>]}`

    > 等价于 `expr1 AND expr2 AND expr3`。

-   `{"$or": [<expr1>, <expr2>, <expr3>]}`

    > 等价于 `expr1 OR expr2 OR expr3`。

-   `{field: {"$like": "value"}}`

    > 等价于 `field like '%value%'` (模糊搜索)。

-   `{field: {"$begin": "value"}}`

    > 等价于 `field like 'value%'` (以 `value` 开头)。

-   `{field: {"$end": "value"}}`

    > 等价于 `field like '%value'` (以 `value` 结尾)。

-   `{field: "$isnull"}`

    > 等价于 `field is null`。

请确保不要覆盖对象数组的键。例如，如果想用 `id>2 and id<5`语句查询，不能使用`{id:{"$gt": 2}, id:{"$lt": 5}}`，因为第一个元素会被第二个元素覆盖。应该使用如下结构查询：

``` js
{id: [{"$gt": 2}, {"$lt": 5}]}
```

``` js
{"$and": [{id:{"$gt": 2}}, {id:{"$lt": 5}}]}
```

> id

    根据ID查询。例如，`.WhereId(1)`。

> order

    用于根据指定的列对结果集进行排序。默认按照 *id* 排序。
    如果仅用一个字段进行排序，则可以将其指定为字符串。多个字段排序需要指定一个字符串对象数组：
    
降序： `{"field": "-1"}` 等价于 `field desc`。

升序： `{"field": "1"}` 等价于 `field asc`。
    
> limit

    返回条目数。默认25条，最大10000条。

> offset

    偏移量。

> ecosystemid

    生态系统ID。默认为查询当前生态系统的数据表。

**示例**

``` js
var i int
var ret string

ret = DBFind("contracts").Columns("id,value").Where({id: [{"$gt": 2}, {"$lt": 5}]}).Order("id")
while i < Len(ret) {
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

根据指定参数从指定数据表中查询数据。返回一个由对象数组 *map* 组成的数组*array*。

**语法**

``` text
DBRow(table string)
    [.Columns(columns array|string)]
    [.Where(where map)]
    [.WhereId(id int)]
    [.Order(order array|string)]
    [.Ecosystem(ecosystemid int)] map
```

* table

    数据表名称。


* columns

    返回列的列表。如果未指定，则将返回所有列。

    该值为数组或使用逗号分隔的字符串。

* where

    查询条件。

    例如： `.Where({name: "John"})` 或者 `.Where({"id": {"$gte": 4}})`。

    更多详细信息，请参考[DBFind](../topics/templates2.md#dbfind) 。

* id

    根据ID查询。例如，`.WhereId(1)`。

* order

    用于根据指定的列对结果集进行排序。默认按照 *id* 排序。

    更多详细信息，请参考[DBFind](../topics/templates2.md#dbfind) 。

* ecosystemid

    生态系统ID。默认为查询当前生态系统的数据表。

**示例**

``` js
var ret map
ret = DBRow("contracts").Columns(["id","value"]).Where({id: 1})
Println(ret)
```

### DBSelectMetrics {#dbselectmetrics}

返回指标的聚合数据。

每生成100个区块时都会更新指标标准。以1天为周期存储聚合数据。

**语法**

``` text
DBSelectMetrics(metric string, timeInterval string, aggregateFunc string) array
```

* metric

    指标名称。

* ecosystem_pages

    生态系统页面数。

    返回值: *key* - 生态系统ID， *value* - 生态系统页面数。


* ecosystem_members

    生态系统成员数。

    返回值: *key* - 生态系统ID， *value* - 生态系统成员数。


* ecosystem_tx

    生态系统交易数。

    返回值: *key* - 生态系统ID， *value* - 生态系统交易数。

* timeInterval

    聚合指标数据的时间间隔。例如：`1 day`， `30 days`。

* aggregateFunc

    聚合函数。例如 `max`, `min`, `avg`。

**示例**

``` js
var rows array
rows = DBSelectMetrics("ecosystem_tx", "30 days", "avg")

var i int
while(i < Len(rows)) {
   var row map
   row = rows[i]
   i = i + 1
}
```

### EcosysParam {#ecosysparam}

返回生态系统参数表 *parameters* 指定参数的值。

**语法**

``` text
EcosysParam(name string) string
```

* name

    参数名称。

**示例**

``` js
Println(EcosysParam("founder_account"))
```

### GetHistory {#gethistory}

返回指定数据表中条目更改的历史记录。

**语法**

``` text
GetHistory(table string, id int) array
```

* table

    数据表名称。


* id

    条目ID。


**返回值**

返回 *map* 类型的对象数组。这些数组指定数据表中条目更改的历史记录。

每个数组都包含下一次更改之前的记录字段。

数组按从最近更改顺序排序。

数组中 *id* 字段指向 *rollback_tx* 表的 *id*。*block_id*代表区块ID，*block_time* 代表区块生成时间戳。

**示例**

``` js
var list array
var item map
list = GetHistory("blocks", 1)
if Len(list) > 0 {
   item = list[0]
}
```

### GetHistoryRow {#gethistoryrow}

从指定数据表中指定条目的更改历史记录返回单个快照。

**语法**

``` text
GetHistoryRow(table string, id int, rollbackId int) map
```

* table

    数据表名称。

* id

    条目ID。

* rollbackId

    *rollback_tx* 表的条目ID。


``` js
$result = GetHistoryRow("contracts",205,2358)
```

### GetColumnType {#getcolumntype}

返回指定表中指定字段的数据类型。

**语法**

``` text
GetColumnType(table, column string) string
```

* table

    数据表名称。

* column

  字段名称。

**返回值**

返回以下类型: `text, varchar, number, money, double, bytes, json, datetime, double`。

**示例**

``` js
var coltype string
coltype = GetColumnType("members", "member_name")
```

### GetDataFromXLSX {#getdatafromxlsx}

从 *XLSX* 电子表格返回数据。

**语法**

``` text
GetDataFromXLSX(binId int, line int, count int, sheet int) string
```

* binId

    二进制表 *binary* 中XLSX格式的ID。

* line

    开始行数，默认从0开始。

* count

    需要返回的行数。

* sheet

    列表编号，默认从1开始。

**示例**

``` js
var a array
a = GetDataFromXLSX(3, 12, 10, 1)
```

### GetRowsCountXLSX {#getrowscountxlsx}

返回指定XLSX文件行数。

**语法**

``` text
GetRowsCountXLSX(binId int, sheet int) int
```

* binId

    二进制表 *binary* 中XLSX格式的ID。

* sheet

    列表编号，默认从1开始。

**示例**

``` js
var count int
count = GetRowsCountXLSX(binid, 1)
```

### LangRes {#langres}

返回指定多语言资源。其标签 *lang*为双字符语言代码，例如：`en, zh`。如果所选的语言标签没有语言资源，则返回`en` 标签的语言资源。

**语法**

``` text
LangRes(label string, lang string) string
```

* label

    语言资源名称。

* lang

    双字符语言代码。

**示例**

``` js
warning LangRes("@1confirm", "en")
error LangRes("@1problems", "zh")
```

### GetBlock {#getblock}

返回指定区块的相关信息。

**语法**

``` text
GetBlock(blockID int64) map
```

* blockID

    区块ID。

**返回值**

返回一个对象数组：

-   *id*

    > 区块ID。

-   *time*

    > 区块生成时间戳。

-   *key_id*

    > 生成该区块的验证节点账户地址。

**示例**

``` js
var b map
b = GetBlock(1)
Println(b)
```

### DBInsert {#dbinsert}

添加条目到指定数据表并返回条目的ID。

**语法**

``` text
DBInsert(table string, params map) int
```

* tblname

    数据表名称。

* params

    对象数组，其中键是字段名称，值是插入的值。

**示例**

``` js
DBInsert("mytable", {name: "John Smith", amount: 100})
```

### DBUpdate {#dbupdate}

更改指定数据表中指定条目ID的列值，如果该表中不存在该条目ID，则返回错误。

**语法**

``` text
DBUpdate(tblname string, id int, params map)
```

* tblname

    数据表名称。

* id

    条目ID。

* params

    对象数组，其中键是字段名称，值是更改的新值。

**示例**

``` js
DBUpdate("mytable", myid, {name: "John Smith", amount: 100})
```

### DBUpdateExt {#dbupdateext}

更改指定数据表中与查询条件的匹配的列值。

**语法**

``` text
DBUpdateExt(tblname string, where map, params map)
```

* tblname

    数据表名称。

* where

    查询条件。

更多详细信息，请参考 [DBFind](../topics/templates2.md#dbfind) 。


* params

    对象数组，其中键是字段名称，值是更改的新值。

**示例**

``` js
DBUpdateExt("mytable", {id: $key_id, ecosystem: $ecosystem_id}, {name: "John Smith", amount: 100})
```

### DelColumn {#delcolumn}

删除指定表中的字段。该表必须没有记录。

**语法**

``` text
DelColumn(tblname string, column string)
```

* tblname

    数据表名称。

* column

    需要删除的字段。

``` js
DelColumn("mytable", "mycolumn")
```

### DelTable {#deltable}

删除指定的数据表。该表必须没有记录。

**语法**

``` text
DelTable(tblname string)
```

* tblname

    数据表名称。

**示例**

``` js
DelTable("mytable")
```

### Append {#append}

将任何类型的 *val* 插入到 *src* 数组中。

**语法**

``` text
Append(src array, val anyType) array
```

* src

    原始数组。

* val

    需要插入的值。

**示例**

``` js
var list array
list = Append(list, "new_val")
```

### Join {#join}

将 *in* 数组的元素合并到具有指定 *sep* 分隔符的字符串中。

**语法**

``` text
Join(in array, sep string) string
```

* in

    数组名称。

* sep

    分隔符。

**示例**

``` js
var val string, myarr array
myarr[0] = "first"
myarr[1] = 10
val = Join(myarr, ",")
```

### Split {#split}

使用 *sep* 分隔符将 *in* 字符串拆分为元素，并将它们放入数组中。

**语法**

``` text
Split(in string, sep string) array
```

* in

    字符串。

* sep

    分隔符。

**示例**

``` js
var myarr array
myarr = Split("first,second,third", ",")
```

### Len {#len}

返回指定数组元素个数。

**语法**

``` text
Len(val array) int
```

* val

    数组。

**示例**

``` js
if Len(mylist) == 0 {
  ...
}
```

### Row {#row}

The *list* parameter must not be specified in this case. 返回数组列表的第一个对象数组。如果列表为空，则返回结果为空。该函数主要与[DBFind](templates2.md#dbfind)函数一起使用，使用时该函数不能指定参数。

**语法**

``` text
Row(list array) map
```

* list

    由 **DBFind** 函数返回的对象数组。

**示例**

``` js
var ret map
ret = DBFind("contracts").Columns("id,value").WhereId(10).Row()
Println(ret)
```

### One {#one}

返回数组列表中第一个对象数组的字段值。如果列表数组为空，则返回nil。该函数主要与[DBFind](templates2.md#dbfind)函数一起使用，使用时该函数不能指定参数。

**语法**

``` text
One(list array, column string) string
```

* list

  - 由 **DBFind** 函数返回的对象数组。

* column

  - 字段名称。

**示例**

``` js
var ret string
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
   Println(ret)
}
```

### GetMapKeys {#getmapkeys}

返回对象数组中的键数组。

**语法**

``` text
GetMapKeys(val map) array
```

* val

  对象数组。

**示例**

``` js
var val map
var arr array
val["k1"] = "v1"
val["k2"] = "v2"
arr = GetMapKeys(val)
```

### SortedKeys {#sortedkeys}

返回对象数组中的键数组，该数组已排序。

**语法**

``` text
SortedKeys(val map) array
```

* val

  对象数组。

**示例**

``` js
var val map
var arr array
val["k2"] = "v2"
val["k1"] = "v1"
arr = SortedKeys(val)
```

### CallContract {#callcontract}

调用指定名称的合约。合约数据部分的所有参数必须列入一个对象数组中。该函数返回指定合约分配给**\$result** 变量的值。

**语法**

``` text
CallContract(name string, params map)
```

* name

  被调用合同的名称。

* params

  合约输入数据的关联数组。

**示例**

``` js
var par map
par["Name"] = "My Name"
CallContract("MyContract", par)
```

### ContractAccess {#contractaccess}

检查执行合约的名称是否与参数中列出的名称之一匹配。通常用于控制合约对数据表访问。编辑数据表字段或在表权限部分的插入和新列字段时，在权限字段中指定该函数。

**语法**

``` text
ContractAccess(name string, [name string]) bool
```

* name

  合约名称。

**示例**

``` js
ContractAccess("MyContract")
ContractAccess("MyContract","SimpleContract")
```

### ContractConditions {#contractconditions}

从指定名称的合约中调用 **conditions** 条件部分。

对于该类的合约，数据部分必须为空。如果条件部分执行没有错误，则返回*true*。如果在执行期间生成错误，则父合约也将以此错误结束。该函数通常用于控制合约对表的访问，并且可以在编辑系统表时在权限字段中调用。

**语法**

``` text
ContractConditions(name string, [name string]) bool
```

* name

  合约名称。

**示例**

``` js
ContractConditions("MainCondition")
```

### EvalCondition {#evalcondition}

从 *tablename* 表中获取带有 *\'name\'* 字段记录中的 *condfield*字段的值，并检查 *condfield* 字段值的条件。

**语法**

``` text
EvalCondition(tablename string, name string, condfield string)
```

* tablename

  数据表名称。

* name

  根据 'name' 字段查询值。

* condfield

  需要检查条件的字段名称。

**示例**

``` js
EvalCondition(`menu`, $Name, `conditions`)
```

### GetContractById {#getcontractbyid}

该函数通过合约ID返回其合约名称。如果找不到合约，则返回空字符串。

**语法**

``` text
GetContractById(id int) string
```

* id

  在合约表 *contracts* 的合约ID。

**示例**

``` js
var name string
name = GetContractById($IdContract)
```

### GetContractByName {#getcontractbyname}

该函数通过合约名称返回其合约ID。如果找不到合约，则返回零。

**语法**

``` text
GetContractByName(name string) int
```

* name

  在合约表 *contracts* 的合约名称。

**示例**

``` js
var id int
id = GetContractByName(`NewBlock`)
```

### RoleAccess {#roleaccess}

检查合约调用者的角色ID是否与参数中指定的ID之一匹配。

使用该函数可以控制对数据表和其他数据的合约访问。

**语法**

``` text
RoleAccess(id int, [id int]) bool
```

* id

  角色ID。 

**示例**

``` js
RoleAccess(1)
RoleAccess(1, 3)
```

### TransactionInfo {#transactioninfo}

按指定的哈希值查询交易并返回已执行的合约及其参数的信息。

**语法**

``` text
TransactionInfo(hash: string)
```

* hash

  十六进制字符串格式的交易哈希。

**返回值**

该函数返回json格式的字符串：

> ``` json
> {"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
> ```
* contract

  合约名称。
* params

  传递给合约参数的数据。

* block

  处理该交易的区块ID。

**示例**

``` js
var out map
out = JSONDecode(TransactionInfo(hash))
```

### Throw {#throw}

生成 *exception* 异常类型的错误。

**语法**

``` text
Throw(ErrorId string, ErrDescription string)
```

* ErrorId

  错误标识符。

* ErrDescription

  错误描述。

**返回值**

该类交易结果的格式：

``` json
{"type":"exception","error":"Error description","id":"Error ID"}
```

**示例**

``` js
Throw("Problem", "There is a problem")
```

### ValidateCondition {#validatecondition}

尝试编译 *condition*参数指定的条件。如果在编译过程中发生错误，则生成错误并终止调用合约。该函数旨在检查条件格式的正确性。

**语法**

``` text
ValidateCondition(condition string, state int)
```

* condition

  需要验证的条件格式。

* state

  生态系统ID。如果检查全局条件，请指定为0。

**示例**

``` js
ValidateCondition(`ContractAccess("@1MyContract")`, 1)
```

### AddressToId {#addresstoid}

根据钱包地址返回对应的账户地址。如果指定了无效的地址，则返回 \'0\'。

**语法**

``` text
AddressToId(address string) int
```

* address

  钱包地址 `XXXX-...-XXXX` 格式或数字形式。

**示例**

``` js
wallet = AddressToId($Recipient)
```

### IdToAddress {#idtoaddress}

根据账户地址返回对应的钱包地址。如果指定了无效的地址，则返回无效地址\'invalid\'。

**语法**

``` text
IdToAddress(id int) string
```

* id

  账户地址。

**示例**

``` js
$address = IdToAddress($id)
```

### PubToID {#pubtoid}

通过十六进制编码格式的公钥返回帐户地址。

**语法**

``` text
PubToID(hexkey string) int
```

* hexkey

  十六进制编码格式的公钥。

**示例**

``` js
var wallet int
wallet = PubToID("04fa5e78.....34abd6")
```

### DecodeBase64 {#decodebase64}

通过指定base64编码格式返回字符串。

**语法**

``` text
DecodeBase64(input string) string
```

* input

  base64编码格式字符串。

**示例**

``` js
val = DecodeBase64(mybase64)
```

### EncodeBase64 {#encodebase64}

通过指定字符串返回base64编码格式的字符串。

**语法**

``` text
EncodeBase64(input string) string
```

* input

  需要编码的字符串。

**示例**

``` js
var base64str string
base64str = EncodeBase64("my text")
```

### Float {#float}

将整数或字符串转换为浮点数。

**语法**

``` text
Float(val int|string) float
```

* val

  整数或字符串。

**示例**

``` js
val = Float("567.989") + Float(232)
```

### HexToBytes {#hextobytes}

将十六进制编码格式的字符串转换为字节类型 *bytes*。

**语法**

``` text
HexToBytes(hexdata string) bytes
```

* hexdata

  十六进制编码格式的字符串。

**示例**

``` js
var val bytes
val = HexToBytes("34fe4501a4d80094")
```

### FormatMoney {#formatmoney}

返回 *exp / 10 \^ digit* 的字符串值。

**语法**

``` text
FormatMoney(exp string, digit int) string
```

* exp

  数字的字符串格式。

* digit

  `exp/10^digit`
表达式中10的指数，该值可以是正数或负数。正值决定了小数点后的位数。

**示例**

``` js
s = FormatMoney("78236475917384", 0)
```

### Random {#random}

返回min和max之间的随机数（min <= result <max）。min和max都必须是正数。

**语法**

``` text
Random(min int, max int) int
```

* min

  随机数的最小值。

* max

  随机数的上限。生成的随机数将小于该值。

**示例**

``` js
i = Random(10,5000)
```

### Int {#int}

将字符串值转换为整数。

**语法**

``` text
Int(val string) int
```

* val

  数字的字符串格式。

**示例**

``` js
mystr = "-37763499007332"
val = Int(mystr)
```

### Hash {#hash}

返回指定字节数组或字符串的哈希，由系统加密库crypto生成的哈希。

**语法**

``` text
Hash(val interface{}) string, error
```

* val

  字符串或字节数组。

**示例**

``` js
var hash string
hash = Hash("Test message")
```

### Sha256 {#sha256}

返回指定字符串的 **SHA256** 哈希值。

**语法**

``` text
Sha256(val string) string
```

* val

  需要 **Sha256** 哈希运算的字符串。

**示例**

``` js
var sha string
sha = Sha256("Test message")
```

### Str {#str}

将整数 *int* 或浮点数 *float* 转换为字符串。

**语法**

``` text
Str(val int|float) string
```

* val

  整数或浮点数。

**示例**

``` js
myfloat = 5.678
val = Str(myfloat)
```

### JSONEncode {#jsonencode}

将数字、字符串或数组转换为JSON格式的字符串。

**语法**

``` text
JSONEncode(src int|float|string|map|array) string
```

* src

  需转换的数据。

**示例**

``` js
var mydata map
mydata["key"] = 1
var json string
json = JSONEncode(mydata)
```

### JSONEncodeIndent {#jsonencodeindent}

使用指定的缩进将数字、字符串或数组转换为JSON格式的字符串。

**语法**

``` text
JSONEncodeIndent(src int|float|string|map|array, indent string) string
```

* src

  需要转换的数据。

* indent

  用作缩进的字符串。

**示例**

``` js
var mydata map
mydata["key"] = 1
var json string
json = JSONEncodeIndent(mydata, "\t")
```

### JSONDecode {#jsondecode}

将JSON格式的字符串转换为数字，字符串或数组。

**语法**

``` text
JSONDecode(src string) int|float|string|map|array
```

* src

  包含JSON格式数据的字符串。

**示例**

``` js
var mydata map
mydata = JSONDecode(`{"name": "John Smith", "company": "Smith's company"}`)
```

### HasPrefix {#hasprefix}

检查字符串是否以指定的字符串开头。

**语法**

``` text
HasPrefix(s string, prefix string) bool
```

* s

  字符串。

* prefix

  需要检查的前缀。

**返回值**

如果字符串以指定的字符串开头，则返回 `true`。

**示例**

``` js
if HasPrefix($Name, `my`) {
...
}
```

### Contains {#contains}

检查字符串是否包含指定的子字符串。

**语法**

``` text
Contains(s string, substr string) bool
```

* s

  字符串。

* substr

  子字符串。

**返回值**

如果字符串包含子字符串，则返回 `true`。

**示例**

``` js
if Contains($Name, `my`) {
...
}
```

### Replace {#replace}

把字符串中的 old（旧字符串） 替换成 new(新字符串)。

**语法**

``` text
Replace(s string, old string, new string) string
```

* s

  原始字符串。

* old

  将被替换的子字符串。

* new

  新字符串。

**示例**

``` js
s = Replace($Name, `me`, `you`)
```

### Size {#size}

返回指定字符串的字节数。

**语法**

``` text
Size(val string) int
```

* val

  字符串。

**示例**

``` js
var len int
len = Size($Name)
```

### Sprintf {#sprintf}

该函数根据指定的模板和参数创建一个字符串。

可用的通配符：

> -   `%d` (整数)
> -   `%s` (字符串)
> -   `%f` (浮点型)
> -   `%v` (任何类型)

**语法**

``` text
Sprintf(pattern string, val ...) string
```

* pattern

  字符串的模板。

**示例**

``` js
out = Sprintf("%s=%d", mypar, 6448)
```

### Substr {#substr}

返回从偏移量 *offset*(默认从0开始计算)开始的指定字符串中获取的子字符串，其最大长度限制为*length*。

如果偏移量或长度限制小于零、偏移量大于长度限制的值，则返回一个空字符串。

如果偏移量和长度限制的总和大于字符串字节数，则子字符串将从偏移量开始返回到指定字符串的末尾。

**语法**

``` text
Substr(s string, offset int, length int) string
```

* val

  字符串。

* offset

  偏移量。

* length

  子字符串的长度限制。

**示例**

``` js
var s string
s = Substr($Name, 1, 10)
```

### ToLower {#tolower}

以小写形式返回指定的字符串。

**语法**

``` text
ToLower(val string) string
```

* val

  字符串。

**示例**

``` js
val = ToLower(val)
```

### ToUpper {#toupper}

以大写形式返回指定的字符串。

**语法**

``` text
ToUpper(val string) string
```

* val

  字符串。

**示例**

``` js
val = ToUpper(val)
```

### TrimSpace {#trimspace}

删除指定字符串的前后空格、制表符和换行符号。

**语法**

``` text
TrimSpace(val string) string
```

* val

  字符串。

**示例**

``` js
var val string
val = TrimSpace("  mystr  ")
```

### Floor {#floor}

返回小于或等于指定数字、浮点数和字符串的最大整数值。

**语法**

``` text
Floor(x float|int|string) int
```

* x

  数字、浮点数和字符串。

**示例**

``` js
val = Floor(5.6) // returns 5
```

### Log {#log}

返回指定数字、浮点数和字符串的自然对数。

**语法**

``` text
Log(x float|int|string) float
```

* x

  数字、浮点数和字符串。

**示例**

``` js
val = Log(10)
```

### Log10 {#log10}

返回指定数字、浮点数和字符串的以10为底的对数。

**语法**

``` text
Log10(x float|int|string) float
```

* x

  数字、浮点数和字符串。

**示例**

``` js
val = Log10(100)
```

### Pow {#pow}

返回(x^y^)，y是以x为基数的指数。

**语法**

``` text
Pow(x float|int|string, y float|int|string) float
```

* x

  基数。

* y

  指数。

**示例**

``` js
val = Pow(2, 3)
```

### Round {#round}

返回指定数字四舍五入到最近整数的值。

**语法**

``` text
Round(x float|int|string) int
```

* x

  数字。

**示例**

``` js
val = Round(5.6)
```

### Sqrt {#sqrt}

返回指定数字的平方根。

``` text
Sqrt(x float|int|string) float
```

* x

  数字。

**示例**

``` js
val = Sqrt(225)
```

### StringToBytes {#stringtobytes}

将字符串转换为字节。

**语法**

``` text
StringToBytes(src string) bytes
```

* src

  字符串。

**示例**

``` js
var b bytes
b = StringToBytes("my string")
```

### BytesToString {#bytestostring}

将字节转换为字符串。

**语法**

``` text
BytesToString(src bytes) string
```

* src

  字节。

**示例**

``` js
var s string
s = BytesToString($Bytes)
```

### SysParamString {#sysparamstring}

返回指定平台参数的值。

**语法**

``` text
SysParamString(name string) string
```

* name

  参数名称。

**示例**

``` js
url = SysParamString(`blockchain_url`)
```

### SysParamInt {#sysparamint}

以数字的形式返回指定平台参数的值。

**语法**

``` text
SysParamInt(name string) int
```

* name

  参数名称。

**示例**

``` js
maxcol = SysParam(`max_columns`)
```

### DBUpdateSysParam {#dbupdatesysparam}

更新平台参数的值和条件。如果您不需要更改值或条件，请在相应参数中指定空字符串。

**语法**

``` text
DBUpdateSysParam(name, value, conditions string)
```

* name

  平台参数名称。

* value

  参数的新值。

* conditions

  更改参数的新条件。

**示例**

``` js
DBUpdateSysParam(`fuel_rate`, `400000000000`, ``)
```

### UpdateNotifications {#updatenotifications}

从数据库中获取指定键的通知列表，并将获取的通知发送到Centrifugo。

**语法**

``` text
UpdateNotifications(ecosystemID int, keys int ...)
```

* ecosystemID

  生态系统ID。

* key

  账户地址列表，以逗号分隔。或您可以使用一个数组指定账户地址列表。

**示例**

``` js
UpdateNotifications($ecosystem_id, $key_id, 23345355454, 35545454554)
UpdateNotifications(1, [$key_id, 23345355454, 35545454554] )
```

### UpdateRolesNotifications {#updaterolesnotifications}

获取数据库中指定角色ID的所有账户地址的通知列表，并将获取的通知发送到Centrifugo。

**语法**

``` text
UpdateRolesNotifications(ecosystemID int, roles int ...)
```

* ecosystemID

  生态系统ID。

* roles

  角色ID列表，以逗号分隔。或您可以使用一个数组指定角色ID列表。

**示例**

``` js
UpdateRolesNotifications(1, 1, 2)
```

### HTTPRequest {#httprequest}

将HTTP请求发送到指定的地址。

``` text
该函数仅可用于 CLB 合约。
````

**语法**

``` text
HTTPRequest(url string, method string, heads map, pars map) string
```

* url

  发送的请求地址。

* method

  请求类型（GET或POST）。

* heads

  请求头，对象数组。

* pars

  请求参数。

**示例**

``` js
var ret string
var ret string 
var ret string
var pars, heads, json map
heads["Authorization"] = "Bearer " + $auth_token
pars["obs"] = "true"
ret = HTTPRequest("http://localhost:7079/api/v2/content/page/default_page", "POST", heads, pars)
json = JSONToMap(ret)
```

### HTTPPostJSON {#httppostjson}

该函数类似于 *HTTPRequest* 函数，但它发送POST请求，请求参数为字符串。

``` text
该函数仅可用于 CLB 合约。
```

**语法**

``` text
HTTPPostJSON(url string, heads map, pars string) string
```

* url

  发送的请求地址。

* heads

  请求头，对象数组。

* pars

  请求参数，JSON字符串。

**示例**

``` js
var ret string
var ret string 
var ret string
var heads, json map
heads["Authorization"] = "Bearer " + $auth_token
ret = HTTPPostJSON("http://localhost:7079/api/v2/content/page/default_page", heads, `{"obs":"true"}`)
json = JSONToMap(ret)
```

### BlockTime {#blocktime}

以SQL格式返回区块的生成时间。

**语法**

``` text
BlockTime()
```

**示例**

``` js
var mytime string
mytime = BlockTime()
DBInsert("mytable", myid, {time: mytime})
```

### DateTime {#datetime}

将时间戳unixtime转换为 [YYYY-MM-DD HH：MI：SS]{.title-ref} 格式的字符串。

**语法**

``` text
DateTime(unixtime int) string
```

**示例**

``` js
DateTime(1532325250)
```

### UnixDateTime {#unixdatetime}

将 [YYYY-MM-DD HH：MI：SS]{.title-ref} 格式的字符串转换为时间戳unixtime。

**语法**

``` text
UnixDateTime(datetime string) int
```

**示例**

``` js
UnixDateTime("2018-07-20 14:23:10")
```

### CreateOBS {#createobs}

创建子 CLB 。

该函数只能在主 CLB 模式下使用。

**语法**

``` text
CreateOBS(OBSName string, DBUser string, DBPassword string, OBSAPIPort int)
```

* OBSName

  CLB 的名称。

* DBUser

  数据库的角色名称。

* DBPassword

  该角色的密码。

* OBSAPIPort

  API请求的端口。

**示例**

``` js
CreateOBS("obsname", "obsuser", "obspwd", 8095)
```

### GetOBSList {#getobslist}

返回子 CLB 列表。

该函数只能在主 CLB 模式下使用。

**语法**

``` text
GetOBSList()
```

**返回值**

一个对象数组，其中键是 CLB 名称和值是进程状态。

### RunOBS {#runobs}

运行 CLB 的进程。

该函数只能在主 CLB 模式下使用。

**语法**

``` text
RunOBS(OBSName string)
```

* OBSName

  CLB 名称。

只能包含字母和数字，不能使用空格符号。

### StopOBS {#stopobs}

停止指定 CLB 的进程。

该函数只能在主 CLB 模式下使用。

**语法**

``` text
StopOBS(OBSName string)
```

* OBSName

  CLB 名称。

只能包含字母和数字，不能使用空格符号。

### RemoveOBS {#removeobs}

删除指定 CLB 的进程。

该函数只能在主 CLB 模式下使用。

**语法**

``` text
RemoveOBS(OBSName string)
```

* OBSName

  CLB 名称。

  只能包含字母和数字，不能使用空格符号。

## System Contracts {#system-contracts}

系统合约是在启动 IBAX区块链平台时默认创建的。所有这些合约都是在第一个生态系统中创建的，这就是为什么你需要指定其全名来从其他生态系统中调用它们， 例如，`@1NewContract`。

### NewEcosystem {#newecosystem}

创建一个新的生态系统，要获取创建的生态系统ID，必须引用在[txstatus](../reference/api2.md#txstatus) 中返回的 *result* 字段

参数：

> -   *Name string* - 生态系统的名称，可以更改该名称。

### EditEcosystemName {#editecosystemname}

更改 *1_ecosystems* 表中生态系统的名称，该表仅存在于第一个生态系统中。

参数：

> -   *EcosystemID int* - 更改其名称的生态系统ID；
> -   *NewName string* - 生态系统新名称。

### NewContract {#newcontract}

在当前生态系统中创建一个新合约。

参数：

- *ApplicationId int* - 新合约所属的应用程序；
- *Value string* - 合约源码，上层必须只有一个合约；
- *Conditions string* - 更改该合约的条件；
- *TokenEcosystem int \"optional\"* - 生态系统ID，当合约被激活时，将使用哪种通证进行交易。

### EditContract {#editcontract}

编辑当前生态系统中的合约。

参数：

> -   *Id int* - 更改的合约ID；
> -   *Value string \"optional\"* - 合约源码；
> -   *Conditions string \"optional\"* - 更改该合约的条件。

### BindWallet {#bindwallet}

将合约绑定到当前生态系统中的钱包地址。合同绑定后，该地址将支付执行该合约的费用。参数：

> -   *Id int* - 要绑定的合约ID。
> -   *WalletId string \"optional\"* - 合约绑定的钱包地址。

### UnbindWallet {#unbindwallet}

从当前生态系统中的钱包地址取消绑定合约，只有已绑定该合约的地址才能取消绑定。合约未绑定后，执行合约的用户将支付执行费用。

参数：

> -   *Id int* - 绑定的合同ID。

### NewParameter {#newparameter}

早当前生态系统添加了一个新生态系统参数。

参数：

> -   *Name string* - 参数名称；
> -   *Value string* - 参数值；
> -   *Conditions string* - 更改参数的条件。

### EditParameter {#editparameter}

更改当前生态系统中的现有生态系统参数。

参数：

> -   *Name string* - 要更改的参数名称；
> -   *Value string* - 新参数值；
> -   *Conditions string* - 更改参数的新条件。

### NewMenu {#newmenu}

在当前生态系统中添加一个新菜单。

参数：

> -   *Name string* - 菜单名称；
> -   *Value string* - 菜单源码；
> -   *Title string \"optional\"* - 菜单标题；
> -   *Conditions string* - 更改菜单的条件。

### EditMenu {#editmenu}

更改当前生态系统中的现有菜单。

参数：

> -   *Id int* - 要更改的菜单ID；
> -   *Value string \"optional\"* - 新菜单源码；
> -   *Title string \"optional\"* - 新菜单标题；
> -   *Conditions string \"optional\"* - 更改菜单的新条件。

### AppendMenu {#appendmenu}

将源码内容添加到当前生态系统中的现有菜单。

参数：

> -   *Id int* - 菜单ID；
> -   *Value string* - 要添加的源码。

### NewPage {#newpage}

在当前生态系统中添加新页面。

参数：

> -   *Name string* - 页面名称；
> -   *Value string* - 页面源码；
> -   *Menu string* - 关联该页面的菜单名称；
> -   *Conditions string* - 更改页面的条件；
> -   *ValidateCount int \"optional\"* - 页面验证所需的节点数。如果未指定此参数，则使用 *min_page_validate_count* 生态系统参数值。
      该值不能小于 *min_page_validate_count* 且大于 *max_page_validate_count*；
> -   *ValidateMode int \"optional\"* - 页面有效性检查模式。值为0表示在加载页面时检查页面。值为1表示在加载和离开页面时检查页面。

### EditPage {#editpage}

更改当前生态系统中的现有页面。

参数：

> -   *Id int* - 要更改的页面ID；
> -   *Value string \"optional\"* - 新页面源码；
> -   *Menu string \"optional\"* - 关联该页面的新菜单名称；
> -   *Conditions string \"optional\"* - 更改页面的新条件；
> -   *ValidateCount int \"optional\"* - 页面验证所需的节点数。如果未指定此参数，则使用 *min_page_validate_count* 生态系统参数值。
      该值不能小于 *min_page_validate_count* 且大于 *max_page_validate_count*；
> -   *ValidateMode int \"optional\"* - 页面有效性检查模式。值为0表示在加载页面时检查页面。值为1表示在加载和离开页面时检查页面。

### AppendPage {#appendpage}

将源码内容添加到当前生态系统中的现有页面。

参数：

> -   *Id int* - 要更改的页面ID；
> -   *Value string* - 要添加的源码。

### NewBlock {#newblock}

在当前生态系统添加一个页面模块。

参数：

> -   *Name string* - 模块名称；
> -   *Value string* - 模块源码；
> -   *Conditions string* - 更改模块的条件。

### EditBlock {#editblock}

更改当前生态系统中的现有页面模块。

Parameters

> -   *Id int* - 要更改的模块ID；
> -   *Value string* - 新模块源码；
> -   *Conditions string* - 更改模块的新条件。

### NewTable {#newtable}

在当前生态系统中添加一个新数据表。

参数：

- *ApplicationId int* - 关联数据表的应用程序ID；

- *Name string* - 新数据表名称；

- *Columns string* - JSON格式的字段数组`[{"name":"...", "type":"...","index": "0", "conditions":"..."},...]`，其中：

    > -   *name* - 字段名称，仅限拉丁字符；
    > -   *type* - 数据类型 `varchar,bytea,number,datetime,money,text,double,character`；
    > -   *index* - 非主键字段 `0`，主键 `1`；
    > -   *conditions* - 更改字段中数据的条件，必须以JSON格式指定访问权限 ```{"update":"ContractConditions(`MainCondition`)", "read":"ContractConditions(`MainCondition`)"} ```；

- *Permissions string* - JSON格式访问权限`{"insert": "...", "new_column": "...", "update": "...", "read": "..."}`。

    > -   *insert* - 插入条目的权限；
    > -   *new_column* - 添加新列的权限；
    > -   *update* - 更改条目数据的权限；
    > -   *read* - 读取条目数据的权限。

### EditTable {#edittable}

更改当前生态系统中数据表的访问权限。

参数：

> -   *Name string* - 数据表名称。
> -   *InsertPerm string* - 将条目插入数据表中的权限；
> -   *UpdatePerm string* - 更新表中条目的权限；
> -   *ReadPerm string* - 读取表中条目的权限；
> -   *NewColumnPerm string* -创建新列的权限；

### NewColumn {#newcolumn}

在当前生态系统的数据表中添加一个新字段。

参数：

> -   *TableName string* - 数据表名称；
> -   *Name string* - 拉丁字符字段名称；
> -   *Type string* - 数据类型;
>     `varchar,bytea,number,money,datetime,text,double,character`；
> -   *UpdatePerm string* - 更改列中值的权限；
> -   *ReadPerm string* - 读取列中值的权限。

### EditColumn {#editcolumn}

更改当前生态系统中的指定数据表字段的权限。

参数：

> -   *TableName string* - 数据表名称；
> -   *Name string* - 要更改的拉丁字符字段名称；
> -   *UpdatePerm string* - 更改列中值的新权限；
> -   *ReadPerm string* - 读取列中值的新权限。

### NewLang {#newlang}

在当前生态系统中新增多语言资源，添加权限在生态系统参数的 *changing_language* 参数中设置。

参数：

> -   *Name string* - 拉丁字符多语言资源的名称；
> -   *Trans string* - JSON格式的字符串，双字符语言代码作为键，翻译字符串作为值。例如:`{"en": "English text", "zh": "Chinese text"}`。

### EditLang {#editlang}

更改当前生态系统中的语言资源。更改权限在生态系统参数的 *changing_language* 参数中设置。

参数：

> -   *Id int* - 多语言资源ID。
> -   *Trans* - JSON格式的字符串，双字符语言代码作为键，翻译字符串作为值。例如，`{"en": "English text", "zh": "Chinese text"}`。

### Import {#import}

将应用程序导入当前生态系统。导入来自[ImportUpload](#importupload) 合约加载的数据。

参数：

> -   *Data string* - 以文本内容格式导入的数据，该数据来自生态系统导出的文件。

### ImportUpload {#importupload}

将外部应用程序文件加载到当前生态系统的 *buffer_data* 表中，以便后续导入。

参数：

> -   *InputFile file* - 写入当前生态系统的 *buffer_data* 表的文件。

### NewAppParam {#newappparam}

当前生态系统添加新的应用程序参数。

参数：

> -   *ApplicationId int* - 应用程序ID；
> -   *Name string* - 参数名称；
> -   *Value string* - 参数值；
> -   *Conditions string* - 更改参数的权限。

### EditAppParam {#editappparam}

更改当前生态系统中的现有应用程序参数。

参数：

> -   *Id int* - 应用程序参数ID；
> -   *Value string \"optional\"* - 新参数值；
> -   *Conditions string \"optional\"* - 更改参数的新权限。

### NewDelayedContract {#newdelayedcontract}

向延迟调度合约守护进程添加新任务。

延迟调度合约守护进程运行当前生成的区块所需的合约。

参数：

> -   *Contract string* - 合约名称；
> -   *EveryBlock int* - 合约将在指定每隔区块数量后执行；
> -   *Conditions string* - 更改任务的权限；
> -   *BlockID int \"optional\"* - 开始启动合约的区块ID，如果未指定，则自动计算"当前区块ID"+*EveryBlock*；
> -   *Limit int \"optional\"* - 任务的启动次数，如果未指定，则启动合约的任务将无限次执行。

### EditDelayedContract {#editdelayedcontract}

更改延迟调度合约守护进程中的任务。

参数：

> -   *Id int* - 任务ID。
> -   *Contract string* - 合约名称。
> -   *EveryBlock int* - 合约将在指定每隔区块数量后执行；
> -   *Conditions string* - 更改任务的权限；
> -   *BlockID int \"optional\"* - 开始启动合约的区块ID，如果未指定，则自动计算"当前区块ID"+ *EveryBlock*；
> -   *Limit int \"optional\"* - 任务的启动次数，如果未指定，则启动合约的任务将无限次执行。
> -   *Deleted int \"optional\"* - 任务切换。值为 `1` 将禁用该任务。值为 `0` 将启用该任务。

### UploadBinary {#uploadbinary}

在 *X_binaries* 表中添加或覆盖静态文件。通过HTTP API调用合约时，请求格式必须使用`multipart/form-data`；

该DataMimeType参数将与表单数据一起使用。

参数：

> -   *Name string* - 静态文件名称；
> -   *Data bytes* - 静态文件的内容；
> -   *DataMimeType string \"optional\"* - *mime-type* 文件格式的静态文件；
> -   *ApplicationId int* - 关联 *X_binaries* 表的应用程序ID。

如果未传递 *DataMimeType* 参数，则默认使用 `application/octet-stream` 格式。
