# Smart Contracts {#smart-contracts}
  - [Contract Structure](#contract-structure)
    - [Data section](#data-section)
    - [Conditions section](#conditions-section)
    - [Action section](#action-section)
  - [Variables](#variables)
  - [Nested Contracts](#nested-contracts)
  - [File upload](#file-upload)
  - [Queries in JSON format](#queries-in-json-format)
  - [Queries with date and time operations](#queries-with-date-and-time-operations)
  - [Needle contract language](#needle-contract-language)
    - [Basic elements and structure](#basic-elements-and-structure)
    - [Data types and variables](#data-types-and-variables)
    - [Array](#array)
    - [If and While statements](#if-and-while-statements)
  - [Functions](#functions)
    - [Function declaration](#function-declaration)
    - [Variable-length parameters](#variable-length-parameters)
    - [Optional parameters](#optional-parameters)
  - [Needle functions classification](#needle-functions-classification)
  - [Needle functions reference](#needle-functions-reference)
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
  - [System Contracts](#system-contracts)
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


Smart Contract (hereinafter referred to as Contract) is one of the basic elements of an application. The implementation of a contract on a page by the user is usually a single operation that the purpose is to update or create a database entry. All data operations of an application form a contract system, and these contracts interact with each other through database or contract content functions.

## Contract Structure {#contract-structure}

Use the keyword `contract` to declare a contract, followed by the contract name, and the contract content must be enclosed in braces. A contract mainly consists of three sections:

1. **data** - [data section](#data-section), where declares the variables of the input data, including variable name and variable type;

2. **conditions** - [conditions section](#conditions-section), where validates the correctness of the data;

3. **action** - [action section](#action-section), where defines the data manipulations.
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



### Data section {#data-section}

The `data` section describes the contract data inputs and the form parameters received.

The structure of each line by sequence:

* Variable name - only receive variables, not arrays;
* Variable data type - the [data type](#data-types-and-variables) of the variable;
* optional - an optional parameter that do not need to fill in the form element.

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



### Conditions section {#conditions-section}

The `conditions` section describes the validation of data received.

The following commands are used for error warnings: serious errors `error`, warning errors `warning`, suggestive errors `info`. These three commands will generate an error that terminates the execution of contracts, and each error will print a different type of error log information. For example:

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

### Action section {#action-section}

The `action` section describes the main code of the contract, which retrieves other data and records the result values in tables. For example:

```
action {
DBUpdate("keys", $key_id, {"-amount": $amount})
DBUpdate("keys", $recipient, {"+amount": $amount, "pub": $Pub})
}
```



## Variables {#variables}

Variables declared in the data section are passed to other contract sections through the `$` symbol followed by the variable name. The `$` symbol can also be used to declare other variables that are not within the data section, which are considered as global variables of this contract and all contracts that this contract is nested.

Pre-defined variables can be used in contracts, which contain transaction data that called the contract:

* `$time` - transaction timestamp;
* `$ecosystem_id` - ecosystem ID;
* `$block` - ID of the block containing the transaction;
* `$key_id` - address of the account that signed the current transaction;
* `$type` - contract ID in the virtual machine;
* `$block_key_id` - account address of the node generated the block;
* `$block_time` - block generation timestamp;
* `$original_contract` - name of the contract that initially processed the transaction. It means the contract is called during transaction validation if the variable is an empty string. To check whether the contract is called by another contract or directly by the transaction, you need to compare the values of $original_contract and $this_contract. It means that the contract is called by the transaction if they are equal;
* `$this_contract` - name of the contract currently being executed;
* `$guest_key` - guest account address;
* `$stack` - contract array stack with a data type of array, containing all contracts executed. The first element of the array represents the name of the contract currently being executed, while the last element represents the name of the contract that initially processed the transaction;
* `$node_position` - the index number of the verification node array where the block is located;
* `$txhash` - transaction hash;
* `$contract` - the current contract structure array.

Predefined variables can be accessed not only in contracts, but also in permission fields that defines the access permission conditions of the application elements. When used in permission fields, predefined variables for block information are always equal to zero, such as `$time`, `$block`, etc.

A predefined variable `$result` is assigned with the return result of the contract.

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

## Nested Contracts {#nested-contracts}

You can nest contracts in the conditions and action sections of the contract. Nested contracts can be called directly, and the contract parameters are specified in parentheses after the contract name, for example, `@1NameContract(Params)`. You may also call nested contracts with the [CallContract](#callcontract) function.

## File upload {#file-upload}

To upload a file using a form in the format of `multipart/form-data`, the data type of the contract must be `file`.

```
contract Upload {
     data {
        File file
     }
     ...
}
```

The [UploadBinary](#uploadbinary) contract is used to upload and store files. With the Logicor language function [Binary](templates2.md#binary) in the page editor, you can get the file download link.

## Queries in JSON format {#queries-in-json-format}

In the contract language, **JSON** can be specified as a field type. You can use the syntax: **columnname->fieldname** to process the entry field. The value obtained is recorded in **columnname.fieldname**. The above syntax can be used in Columns,One,Where of the [DBFind](#dbfind) function.

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



## Queries with date and time operations {#queries-with-date-and-time-operations}

You cannot directly query and update the date and time with the contract language functions, but you can use PostgreSQL functions and features in the Where statement as in the example below. For example, you need to compare the field date_column with the current time. If date_column is a timestamp type, the expression should be `date_column <NOW()`; if date_column is a Unix type, the expression should be `to_timestamp(date_column)> NOW()`.

```
Where("to_timestamp(date_column)> NOW()")
Where("date_column <NOW() - 30 * interval '1 day'")
```

The following Needle function is used to process date and time in SQL format:

* [BlockTime](#blocktime)
* [DateTime](#datetime)
* [UnixDateTime](#unixdatetime)

## Needle contract language {#needle-contract-language}

The contract language includes a set of functions, operators and structures, which can realize data algorithm processing and database operations.

The contract content can be modified if the contract editing permission is not set to `false`. The complete history of contract changes is stored in the blockchain, which is available in Weaver.

Data operations in the blockchain are executed in accordance with the latest version of the contract.

### Basic elements and structure {#basic-elements-and-structure}

### Data types and variables {#data-types-and-variables}

Data type must be defined for every variables. Normally, data types are converted automatically. The following data types can be used:

* `bool` - Boolean, `true` or `false`;
* `bytes` - a byte format;
* `Int` - a 64-bit integer;
* `Array` - an array of any type;
* `map` - an object array;
* `money` - a big integer;
* `float` - a 64-bit float number;
* `string` - a string must be defined with double quotes or escape format: "This is a string" or \`This is a string\`;
* `file` - an object array:
  * `Name` - file name, `string` type;
  * `MimeType` - **mime-type** file, `string` type;
  * `Body` - file content, `bytes` type.

All identifiers, including the names of variables, functions and contracts, are case sensitive (MyFunc and myFunc are different names).

Use the **var** keyword to declare a variable, followed by the name and type of the variable. Variables declared in braces must be used in the same pair of braces.

The default value of any variable declared is zero: the zero value of bool type is false, the zero value of all numeric types is 0, and the zero value, for strings, empty strings. An example of variable declaration:

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



### Array {#array}

The contract language supports two array types:
* `Array` - an array with index starting from 0;
* `map` - an array of objects.

When allocating and retrieving array elements, the index must be placed in square brackets. Multiple indexes are not supported in the array, and the array elements cannot be treated as myarr[i][j].

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

You can also define arrays of array type by specifying elements in `[]`. For map type `arrays`, please use `{}`.

```
var my map
my={"key1": "value1", key2: i, "key3": $Name}
var mya array
mya=["value1", {key2: i}, $Name]
```

You can use such initialization in expressions. For example, use it in function parameters.

```
DBFind...Where({id: 1})
```

For an array of objects, you must specify a key. Key are specified as strings in double quotes (`""`). If the key name is limited to letters, numbers and underscores, you can omit the double quotes.

```
{key1: "value1", key2: "value2"}
```

An array can contain strings, numbers, variable names of any type, and variable names with the `$` symbol. It supports nested arrays. You can specify different maps or arrays as values.

Expressions cannot be used as array elements. Use a variable to store the expression result and specify this variable as an array element.

```
[1+2, myfunc(), name["param"]] // don't do this
[1, 3.4, mystr, "string", $ext, myarr, mymap, {"ids": [1,2, i], company: {"Name": "MyCompany"}} ] // this is ok

var val string
val = my["param"]
MyFunc({key: val, sub: {name: "My name", "color": "Red"}})
```

### If and While statements {#if-and-while-statements}

The contract language supports standard **if** conditional statements and **while** loops, which can be used in contracts and functions. These statements can be nested within each other.

**if** and **while** must be followed by a conditional statement. If the conditional statement returns a number, it is regarded as false when its value is 0.

val == 0 is equal to !val, val != 0 is equal to val. The **if** statement can have an **else** code block, and the **else** is executed when the **if** conditional statement is false.

The following comparison operators can be used in conditional statements: `<, >, >=, <=, ==, !=, ||, &&`

```
if val> 10 || id != $block_key_id {
 ...
} else {
 ...
}
```

The code block is executed when the conditional statement of the **while** loop is true. **break** means to terminate the loop of the code block. If you want to start a loop from the beginning, use **continue**.

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

In addition to conditional statements, Needle also supports standard arithmetic operations: `+`, `-`, `*`, `/`.

Variables of string and bytes types can be used as a conditional statement. If the length of the type is greater than zero, the condition is true, otherwise it is false.

### Functions {#functions}

Functions can perform some operations on the data received by the [data section](#data-section) of a contract: read and write data from the database, convert the type of value, and establish the interaction between contracts.

#### Function declaration {#function-declaration}

Use the func keyword to declare a function, followed by the name and the list of parameters passed to it and their types. All parameters are enclosed in parentheses and separated by commas. After the parentheses, the data type of the value returned by the function must be declared. The function body must be enclosed in braces. If the function has no parameters, the braces can be omitted. To return a value from a function, use the `return` keyword.

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

Function do not return errors, because all error checks are performed automatically. If there is an error in any function, the contract will terminate its operation and present the error description in a window.

#### Variable-length parameters {#variable-length-parameters}

Functions can define variable-length parameters, use the `...` symbol as the last parameter type of the function to indicate variable-length parameters, with a data type of `array`. Variable-length parameters include all variables from the time the parameter is passed in the call. All types of variables can be passed, but you need to deal with conflicts of mismatching of data types.

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



#### Optional parameters {#optional-parameters}

A function has many parameters, but we only need some of them when calling it. In this case, you can declare optional parameters in the following way: `func myfunc(name string).Param1(param string).Param2(param2 int) {...}`, then you can call the specified parameters in any order: `myfunc("name").Param2(100)`.

In the function body, you can handle these variables normally. If no specified optional parameters called, their default values are zero. You can also use ... to specify a variable-length parameter: `func DBFind(table string).Where(request string, params ...)` and then call it: `DBFind("mytable").Where({" id": $myid, "type": 2})`

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

## Needle functions classification {#needle-functions-classification}

Retrieving values from the database:

|                 |               |                 |
| --------------- | ------------- | --------------- |
| [AppParam](#appparam)        | [EcosysParam](#ecosysparam)   | [GetDataFromXLSX](#getdatafromxlsx) |
| [DBFind](#dbfind)          | [GetHistory](#gethistory)    | [GetRowsCountXLSX](#getrowscountxlsx) |
| [DBRow](#dbrow)           | [GetHistoryRow](#gethistoryrow) | [GetBlock](#getblock)        |
| [DBSelectMetrics](#dbselectmetrics) | [GetColumnType](#getcolumntype) | [LangRes](#langres)         |

Updating data in tables:

|          |             |          |
| -------- | ----------- | -------- |
| [DBInsert](#dbinsert) | [DBUpdateExt](#dbupdateext) | [DelTable](#deltable) |
| [DBUpdate](#dbupdate) | [DelColumn](#delcolumn)   |          |

Operations with arrays:

|        |      |            |
| ------ | ---- | ---------- |
| [Append](#append) | [Len](#len)  | [GetMapKeys](#getmapkeys) |
| [Join](#join)   | [Row](#row)  | [SortedKeys](#sortedkeys) |
| [Split](#split)  | [One](#one)  |            |

Operations with contracts and permissions:

|                    |                   |                   |
| ------------------ | ----------------- | ----------------- |
| [CallContract](#callcontract)       | [GetContractById](#getcontractbyid)   | [TransactionInfo](#transactioninfo)   |
| [ContractAccess](#contractaccess)     | [RoleAccess](#roleaccess)        | [Throw](#throw)             |
| [ContractConditions](#contractconditions) | [GetContractByName](#getcontractbyname) | [ValidateCondition](#validatecondition) |
| [EvalCondition](#evalcondition)      |                   |                   |


Operations with addresses:

|             |             |         |
| ----------- | ----------- | ------- |
| [AddressToId](#addresstoid) | [IdToAddress](#idtoaddress) | [PubToID](#pubtoid) |


Operations with variable values:

|              |             |        |
| ------------ | ----------- | ------ |
| [DecodeBase64](#decodebase64) | [FormatMoney](#formatmoney) | [Hash](#hash)   |
| [EncodeBase64](#encodebase64) | [Random](#random)      | [Sha256](#sha256) |
| [Float](#float)        | [Int](#int)         | [Str](#str)    |
| [HexToBytes](#hextobytes)   |             |        |

Arithmetic operations:

|       |       |       |
| ----- | ----- | ----- |
| [Floor](#floor) | [Log10](#log10) | [Round](#round) |
| [Log](#log)   | [Pow](#pow)   | [Sqrt](#sqrt)  |




Operations with JSON:

|            |                  |            |
| ---------- | ---------------- | ---------- |
| [JSONEncode](#jsonencode) | [JSONEncodeIndent](#jsonencodeindent) | [JSONDecode](#jsondecode) |


Operations with strings:

|           |         |           |
| --------- | ------- | --------- |
| [HasPrefix](#hasprefix) | [Size](#size)    | [ToLower](#tolower)   |
| [Contains](#contains)  | [Sprintf](#sprintf) | [ToUpper](#toupper)   |
| [Replace](#replace)   | [Substr](#substr)  | [TrimSpace](#trimspace) |


Operations with bytes:

|               |               |      |
| ------------- | ------------- | ---- |
| [StringToBytes](#stringtobytes) | [BytesToString](#bytestostring) |      |


Operations with date and time in SQL format:

|           |          |              |
| --------- | -------- | ------------ |
| [BlockTime](#blocktime) | [DateTime](#datetime) | [UnixDateTime](#unixdatetime) |


Operations with platform parameters:
|           |          |              |
| --------- | -------- | ------------ |
| [SysParamString](#sysparamstring) | [SysParamInt](#sysparamint) | [DBUpdateSysParam](#dbupdatesysparam) |
| [UpdateNotifications](#updatenotifications) | [UpdateRolesNotifications](#updaterolesnotifications) | |

CLB mode function operation:
|             |              |      |
| ----------- | ------------ | ---- |
| [HTTPRequest](#httprequest) | [HTTPPostJSON](#httppostjson) |      |




Functions for master CLB nodes:

|            |         |           |
| ---------- | ------- | --------- |
| [CreateOBS](#createobs)  | [RunOBS](#runobs)  | [RemoveOBS](#removeobs) |
| [GetOBSList](#getobslist) | [StopOBS](#stopobs) |           |



## Needle functions reference {#needle-functions-reference}


### AppParam {#appparam}

Returns the value of a specified application parameter (from the application parameter table app_params).

**Syntax**

```
AppParam(app int, name string, ecosystemid int) string
```

* **App**

  Application ID.

* **name**

    Application parameter name.

* **Ecosystemid**

    Ecosystem ID.

**Example**

```
AppParam(1, "app_account", 1)
```



### DBFind {#dbfind}

Queries data from a specified table with the specified parameters and returns an array array consisting of an array of objects map.

`.Row()` can get the first map element in the query, `.One(column string)` can get the first map element of a specified column in the query.

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

  Table name.

* **сolumns**

  Returns a list of columns. If not specified, all columns will be returned.

  The value is an array or a string separated by commas.

* **where**

  Query conditions.

  Example: `.Where({name: "John"})` or `.Where({"id": {"$gte": 4}})`.

  This parameter must contain an array of objects with search criteria. The array can contain nested elements.

  Following syntactic constructions are used:
  * `{"field1": "value1", "field2": "value2"}`
     Equivalent to `field1 = "value1" AND field2 = "value2"`.

  * `{"field1": {"$eq":"value"}}`
     Equivalent to `field = "value"`.

  * `{"field1": {"$neq": "value"}}`
     Equivalent to `field != "value"`.

  * `{"field1: {"$in": [1,2,3]}`
     Equivalent to `field IN (1,2,3)`.

  * `{"field1": {"$nin": [1,2,3]}`
     Equivalent to field NOT IN (1,2,3).

  * `{"field": {"$lt": 12}}`
     Equivalent to `field <12`.

  * `{"field": {"$lte": 12}}`
     Equivalent to f`ield <= 12`.

  * `{"field": {"$gt": 12}}`
     Equivalent to `field> 12`.

  * `{"field": {"$gte": 12}}`
     Equivalent to `field >= 12`.

  * `{"$and": [<expr1>, <expr2>, <expr3>]}`
     Equivalent to `expr1 AND expr2 AND expr3`.

  * `{"$or": [<expr1>, <expr2>, <expr3>]}`
     Equivalent to `expr1 OR expr2 OR expr3`.

  * `{field: {"$like": "value"}}`
     Equivalent to `field like'%value%'` (fuzzy search).

  * `{field: {"$begin": "value"}}`
     Equivalent to `field like'value%'` (starts with `value`).

  * `{field: {"$end": "value"}}`
     Equivalent to `field like'%value'` (ends with `value`).

  * `{field: "$isnull"}`
     Equivalent to field is null.

     

Make sure not to overwrite the keys of object arrays. For example, if you want to query with `id>2 and id<5`, you cannot use `{id:{"$gt": 2}, id:{"$lt": 5}}`, because the first element will be overwritten by the second element. You should use the following query structure:
```
{id: [{"$gt": 2}, {"$lt": 5}]}
```
```
{"$and": [{id:{"$gt": 2}}, {id:{"$lt": 5}}]}
```

* **Id**

     Queries by ID. For example, .WhereId(1).

     

* **Order**

     Used to sort the result set by a specified column, or by id by default.

     If you use only one field for sorting, you can specify it as a string. To sort multiple fields, you need to specify an array of string objects:

     Descending order: `{"field": "-1"}` Equivalent to `field desc`.

     Ascending order: `{"field": "1"}` Equivalent to `field asc`.

* **limit**

     Returns the number of entries. 25, by default. The maximum number is 10,000.

* **Offset**

     Offset.

* **Ecosystemid**

     Ecosystem ID. By default, the table of the current ecosystem is queried.

     

**Example**

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

Queries data from a specified table with the specified parameters. Returns an array array consisting of an array of objects map.

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

  Table name.

* **columns**
  
  Returns a list of columns. If not specified, all columns will be returned.

  The value is an array or a string separated by commas.
* **where**

  Query conditions.

  For example: `.Where({name: "John"})` or `.Where({"id": {"$gte": 4}})`.

  For more details, see [DBFind](#dbfind).
* **Id**
  
  Query by ID. For example, `.WhereId(1)`.

* **Order**

  Used to sort the result set by a specified column, or by id by default.

  For more details, see [DBFind](#dbfind).

* **Ecosystemid**

  Ecosystem ID. By default, the table of the current ecosystem is queried.

**Example**

```
var ret map
ret = DBRow("contracts").Columns(["id","value"]).Where({id: 1})
Println(ret)
```



### DBSelectMetrics {#dbselectmetrics}

Returns the aggregated data of a metric.

The metrics are updated each time 100 blocks are generated. And the aggregated data is stored on a 1-day cycle.

**Syntax**

```
DBSelectMetrics(metric string, timeInterval string, aggregateFunc string) array

```

* **metric**

  Metric name

  * **ecosystem_pages**
  
    Number of ecosystem pages.

    Return value: key - ecosystem ID, value - number of ecosystem pages.
  * **ecosystem_members**
  
    Number of ecosystem members.

    Return value: key - ecosystem ID, value - number of ecosystem members.
  * **ecosystem_tx**

    Number of ecosystem transactions.

    Return value: key - ecosystem ID, value - number of ecosystem transactions.

* **timeInterval**

    The time interval for aggregating metric data. For example: `1 day`, `30 days`.

* **aggregateFunc**

    Aggregate function. For example, `max`, `min`, `avg`.

**Example**

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

Returns the value of a specified parameter in the ecosystem parameters table parameters.

**Syntax**

```
EcosysParam(name string) string

```

* **name**

  Parameter name.

**Example**

```
Println(EcosysParam("founder_account"))
```



### GetHistory {#gethistory}

Returns the history of changes to entries in a specified table.

**Syntax**

```
GetHistory(table string, id int) array

```

* **table**

  Table name.
* **Id**

  Entry ID.

**Return value**

  Returns an array of objects of type map, which specify the history of changes to entries in tables.

  Each array contains the fields of a record before making the next change.
  The array is sorted by order of most recent changes.
  
  The id field in the array points to the id of the rollback_tx table. block_id represents the block ID, while block_time represents the block generation timestamp.

**Example**

```
var list array
var item map
list = GetHistory("blocks", 1)
if Len(list) > 0 {
  item = list[0]
}
```



### GetHistoryRow {#gethistoryrow}

Returns a single snapshot from the change history of a specified entry in a specified table.

**Syntax**

```
GetHistoryRow(table string, id int, rollbackId int) map
```



* **table**

  Table name.

* **Id**

  Entry ID.

* **rollbackId**

  rollback_tx The entry ID of the table.

```
  $result = GetHistoryRow("contracts",205,2358)
```

  


### GetColumnType {#getcolumntype}

Returns the data type of a specified field in a specified table.

**Syntax**

```
GetColumnType(table, column string) string

```

* **table**

  Table name.
* **column**

  Field Name.
> **Return value**

  The following types can be returned: `text, varchar, number, money, double, bytes, json, datetime, double`.

**Example**

```
var coltype string
coltype = GetColumnType("members", "member_name")
```



### GetDataFromXLSX {#getdatafromxlsx}

Returns data from XLSX spreadsheets.

**Syntax**

```
GetDataFromXLSX(binId int, line int, count int, sheet int) string

```

* **binId**

  ID in XLSX format in the binary table binary.
* **line**

  The starting line number, starting from 0 by default.
* **count**

  The number of rows that need to be returned.
* **sheet**

  List number, starting from 1 by default.

**Example**

```
var a array
a = GetDataFromXLSX(3, 12, 10, 1)
```



### GetRowsCountXLSX {#getrowscountxlsx}

Returns the number of lines in a specified XLSX file.

**Syntax**

```
GetRowsCountXLSX(binId int, sheet int) int
```

* **binId**

  ID in XLSX format in the binary table binary.
* **sheet**

  List number, starting from 1 by default.

**Example**

```
var count int
count = GetRowsCountXLSX(binid, 1)
```



### LangRes {#langres}

Returns a multilingual resource with name label for language lang, specified as a two-character code, for example: `en`, `de`. If there is no language for a selected language, then the language resource of the `en` label is returned.

**Syntax**

```
LangRes(label string, lang string) string
```

* **label**

  Language resource name.
* **lang**

  Two-character language code.

**Example**

```
warning LangRes("@1confirm", "en")
error LangRes("@1problems", "de")
```



### GetBlock {#getblock}

Returns relevant information about a specified block.

**Syntax**

```
GetBlock(blockID int64) map

```

* **blockID**

  Block ID.
> **Return value**

  Return an array of objects:
  * **id**
  
     Block ID.
  * **time**
  
     Block generation timestamp.
  * **key_id**
  
     The account address of the verification node generated the block.

**Example**

```
var b map
b = GetBlock(1)
Println(b)
```



### DBInsert {#dbinsert}

Adds an entry to a specified table and return the entry ID.

**Syntax**

```
DBInsert(table string, params map) int

```

* **tblname**

  Table name.
* **params**

  An array of objects where keys are field names and values are inserted values.

**Example**

```
DBInsert("mytable", {name: "John Smith", amount: 100})
```



### DBUpdate {#dbupdate}

Changes the column value of a specified entry ID in a specified table. If the entry ID does not exist in the table, an error is returned.

**Syntax**

```
DBUpdate(tblname string, id int, params map)

```

* **tblname**

  Table name.
* **Id**

  Entry ID.
* **params**

  An array of objects where keys are field names and values are new values after changes.

**Example**

```
DBUpdate("mytable", myid, {name: "John Smith", amount: 100})
```



### DBUpdateExt {#dbupdateext}

Changes the value of a column in a specified table that matches the query condition.

**Syntax**

```
DBUpdateExt(tblname string, where map, params map)

```

* **tblname**

  Table name.
* **where**

  Query conditions.

  For more details, see [DBFind](#dbfind).
* **params**

  An array of objects where keys are field names and values are new values after changes.

**Example**

```
DBUpdateExt("mytable", {id: $key_id, ecosystem: $ecosystem_id}, {name: "John Smith", amount: 100})
```



### DelColumn {#delcolumn}

Deletes a field in a specified table that has no records.

**Syntax**

```
DelColumn(tblname string, column string)

```

* **tblname**

  Table name.

* **column**

  The field to be deleted.

```
DelColumn("mytable", "mycolumn")
```

  


### DelTable {#deltable}

Deletes a specified table that has e no records.

**Syntax**

```
DelTable(tblname string)

```

* **tblname**

  Table name.

**Example**

```
DelTable("mytable")
```



### Append {#append}

Inserts any type of val into the src array.

**Syntax**

Append(src array, val anyType) array

* **src**

  The original array.
* **val**

  The value to be inserted.

**Example**

```
var list array
list = Append(list, "new_val")
```



### Join {#join}

Combines elements of the in array into a string with a specified sep separator.

**Syntax**

```
Join(in array, sep string) string

```

* **In**

  Array name.
* **sep**

  Separator.

**Example**

```
 var val string, myarr array
 myarr[0] = "first"
 myarr[1] = 10
 val = Join(myarr, ",")
```



### Split {#split}

Uses the sep separator to split the in string into elements and put them into an array.

**Syntax**

```
Split(in string, sep string) array
```

* **In**

   String.
*  **sep**

   Separator.

**Example**

```
var myarr array
myarr = Split("first,second,third", ",")
```



### Len {#len}

Returns the number of elements in a specified array.

**Syntax**

 

```
Len(val array) int
```

* **val**

   Array.

**Example**

```
if Len(mylist) == 0 {
  ...
}
```



### Row {#row}

 The list parameter must not be specified in this case. Return the first object array in the array list. If the list is empty, an empty result is returned. This function is mostly used in conjunction with the [DBFind](#dbfind) function. When using this function, you cannot specify parameters.

**Syntax**

```
 Row(list array) map
```

* **list**

   The array of objects returned by the DBFind function.

**Example**

```
 var ret map
 ret = DBFind("contracts").Columns("id,value").WhereId(10).Row()
 Println(ret)
```



### One {#one}

 Returns the field value of the first object array in the array list. If the list array is empty, nil is returned. It is mostly used in conjunction with the [DBFind](#dbfind) function. When using this function, you cannot specify parameters.

**Syntax**

```
One(list array, column string) string
```

*  **list**

  The array of objects returned by the DBFind function.

* **column**

  Field Name.

**Example**

```
var ret string
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
  Println(ret)
}
```



### GetMapKeys {#getmapkeys}

Returns the key array in the object array.

**Syntax**

```
GetMapKeys(val map) array
```

* **val**

    Object array.

**Example**

```
var val map
var arr array
val["k1"] = "v1"
val["k2"] = "v2"
arr = GetMapKeys(val)
```



### SortedKeys {#sortedkeys}

Returns a sorted key array in the object array.

**Syntax**

```
SortedKeys(val map) array

```

* **val**

    Object array.

**Example**

```
var val map
var arr array
val["k2"] = "v2"
val["k1"] = "v1"
arr = SortedKeys(val)
```

### CallContract {#callcontract}

Calls the contract with a specified name. All parameters of the data section in the contract must be included in an object array. This function returns the value assigned to the **$result** variable by a specified contract.

**Syntax**

```
CallContract(name string, params map)

```

* **name**

    The name of the contract being called.
* **params**

    An associative array of the contract input data.

**Example**

```
var par map
par["Name"] = "My Name"
CallContract("MyContract", par)
```

### ContractAccess {#contractaccess}

Checks if the name of contract being executed matches one of the names listed in the parameters. Usually it is used to control contract access to tables. When editing table fields or inserting and adding new column fields in the permissions section of the table, please specify this function in the permissions fields.

**Syntax**

```
ContractAccess(name string, [name string]) bool
```

* **name**

    Contract name.

**Example**

```
ContractAccess("MyContract")
ContractAccess("MyContract","SimpleContract")
```


### ContractConditions {#contractconditions}

Calls the conditions section in the contract with a specified name.

For this type of contracts, the data section must be empty. If the conditions section is executed without error, it returns true. If there is an error during execution, the parent contract will also be terminated due to the error. This function is usually used to control the contract's access to tables and can be called in the permission fields when editing system tables.

**Syntax**

```
ContractConditions(name string, [name string]) bool

```

* **name**

    Contract name.

**Example**

```
ContractConditions("MainCondition")
```


### EvalCondition {#evalcondition}

Gets the value of the condfield field in the record with a 'name' field from the tablename table, and checks the conditions of the condfield field value.

**Syntax**

```
EvalCondition(tablename string, name string, condfield string)

```

* **tablename**

    Table name.
*  **name**

    Queries the value with the 'name' field.
*  **condfield**

    The name of the field whose conditions needs to be checked.

**Example**

```
EvalCondition(`menu`, $Name, `conditions`)
```


### GetContractById {#getcontractbyid}

Returns its contract name by contract ID. If not found the contract, an empty string is returned.

**Syntax**

```
GetContractById(id int) string

```

* **Id**

  The contract ID in the contract table contracts.

**Example**

```
var name string
name = GetContractById($IdContract)
```



### GetContractByName {#getcontractbyname}

This function returns its contract ID by contract name. If not found the contract, zero is returned.

**Syntax**

```
GetContractByName(name string) int
```

* **name**

    The contract name in the contract table contracts.

**Example**

```
var id int
id = GetContractByName(`NewBlock`)
```



### RoleAccess {#roleaccess}

Checks whether the role ID of the contract caller matches one of the IDs specified in the parameter.

You can use this function to control contract access to tables and other data.

**Syntax**

 

```
RoleAccess(id int, [id int]) bool
```

* **Id**

    Role ID.

**Example**

```
RoleAccess(1)
RoleAccess(1, 3)
```



### TransactionInfo {#transactioninfo}

Queries transactions by specified hash value and returns information about the contract executed and its parameters.

**Syntax**

```
TransactionInfo(hash: string)
```

  * **hash**

    Transaction hash in hexadecimal string format.
  
> **Return value**

  This function returns a string in JSON format:

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

  

  *   **contract**

      Contract name.
  
  *   **params**

      Data passed to contract parameters.
  *   **block**

      ID of the block that processed the transaction.

**Example**

```
var out map
out = JSONDecode(TransactionInfo(hash))
```



### Throw {#throw}

  Generates an error of type exception.

**Syntax**

  

```
Throw(ErrorId string, ErrDescription string)
```

* **ErrorId**

    Error identifier.

* **ErrDescription**

    Error description.

>  **Return value**

  The format of this type of transaction results:

```
{"type":"exception","error":"Error description","id":"Error ID"}
```

**Example**

```
Throw("Problem", "There is a problem")
```



### ValidateCondition {#validatecondition}

  Tries to compile the conditions specified by the condition parameter. If there is an error during the compilation process, an error is generated and the contract called is terminated. This function is designed to check the correctness of the conditional format.

**Syntax**

```
ValidateCondition(condition string, state int)
```

* **condition**

    The conditional format that needs to be verified.
* **state**

    Ecosystem ID. If you check the global condition, please specify it as 0.

**Example**

```
ValidateCondition(`ContractAccess("@1MyContract")`, 1)
```



### AddressToId {#addresstoid}

Returns the corresponding account address by wallet address. If an invalid address is specified, '0' is returned.

**Syntax**

```
AddressToId(address string) int

```

*  Address

    Wallet address in `XXXX-...-XXXX` format or number format.

**Example**

```
wallet = AddressToId($Recipient)
```



### IdToAddress {#idtoaddress}

Returns the corresponding wallet address by account address. If an invalid address is specified, the invalid address 'invalid' is returned.

**Syntax**

```
IdToAddress(id int) string

```

*  **Id**

    Account address.

**Example**

```
$address = IdToAddress($id)
```



### PubToID {#pubtoid}

The account address is returned by public key in hexadecimal format.

**Syntax**

```
PubToID(hexkey string) int

```

*  **hexkey**

    The public key in hexadecimal format.

**Example**

  

```
var wallet int
wallet = PubToID("04fa5e78.....34abd6")
```



### DecodeBase64 {#decodebase64}

Returns a string by specifying the base64 format

**Syntax**

```
DecodeBase64(input string) string

```

*  **Input**

    String in base64 format.

**Example**

```
val = DecodeBase64(mybase64)
```



### EncodeBase64 {#encodebase64}

Returns a string in base64 format by specifying a string.

**Syntax**

```
EncodeBase64(input string) string

```

*  **Input**

    The string to be encoded.

**Example**

 

```
var base64str string
base64str = EncodeBase64("my text")
```



### Float {#float}

Converts an integer or string to a float number.

**Syntax**

```
Float(val int|string) float

```

* **val**

    An integer or string.

**Example**

```
val = Float("567.989") + Float(232)
```



### HexToBytes {#hextobytes}

Converts a string in hexadecimal format to byte type bytes.

**Syntax**

```
  HexToBytes(hexdata string) bytes

```

*  **hexdata**

    A string in hexadecimal format.

**Example**

```
var val bytes
val = HexToBytes("34fe4501a4d80094")
```



### FormatMoney {#formatmoney}

Returns the string value of exp / 10 ^ digit.

**Syntax**

  

```
FormatMoney(exp string, digit int) string
```

* **Exp**

    A number in string format.
* **digit**

    The exponent (positive or negative) of 10 in the expression `Exp/10^digit`. Positive values determine decimal places.

**Example**

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

**Example**

```
i = Random(10,5000)
```



### Int {#int}

Converts a value in string format to an integer.

**Syntax**

```
Int(val string) int
```

* **val**

    A number in string format.

**Example**

```
mystr = "-37763499007332"
val = Int(mystr)
```



### Hash {#hash}

  Returns the hash of a specified byte array or string, which is generated by the system encryption library crypto.

**Syntax**

 

```
Hash(val interface{}) string, error
```

* **val**

    A string or byte array.

**Example**

```
var hash string
hash = Hash("Test message")
```



### Sha256 {#sha256}

  Returns the SHA256 hash of a specified string.

**Syntax**

 

```
Sha256(val string) string
```

* **val**

    A string requires the Sha256 hash operation.

**Example**

```
var sha string
sha = Sha256("Test message")
```



### Str {#str}

Converts an integer int or float float number to a string.

**Syntax**

  

```
Str(val int|float) string
```

* **val**

    An integer or float number.

**Example**

```
myfloat = 5.678
val = Str(myfloat)
```



### JSONEncode {#jsonencode}

Converts a number, string or array to a string in JSON format.

**Syntax**

```
JSONEncode(src int|float|string|map|array) string

```

* **src**

    Data to convert.

**Example**

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncode(mydata)
```



### JSONEncodeIndent {#jsonencodeindent}

Uses the specified indentation to convert a number, string, or array to a string in JSON format.

**Syntax**

```
JSONEncodeIndent(src int|float|string|map|array, indent string) string

```

* **src**

    Data to convert.

* **Indent**

    The string will be used as indentation.

**Example**

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncodeIndent(mydata, "\t")
```



### JSONDecode {#jsondecode}

Converts a string in JSON format to a number, string or array.

**Syntax**

```
JSONDecode(src string) int|float|string|map|array

```

*  **src**

    A string containing data in JSON format.

**Example**

```
var mydata map
mydata = JSONDecode(`{"name": "John Smith", "company": "Smith's company"}`)
```



### HasPrefix {#hasprefix}

Checks whether the string starts with a specified string.

**Syntax**

  

```
HasPrefix(s string, prefix string) bool
```

* **s**

    A string.

* **prefix**

    The prefix to check.

> **Return value**

  If the string starts with a specified string, `true` is returned.

**Example**

```
if HasPrefix($Name, `my`) {
  ...
}
```



### Contains {#contains}

Checks whether the string contains a specified substring.

**Syntax**

 

```
Contains(s string, substr string) bool
```

* **s**

    A string.

* **substr**

    A substring.

> **Return value**

  If the string contains the substring, it returns `true`.

**Example**

```
if Contains($Name, `my`) {
  ...
}
```



### Replace {#replace}

Replaces old (the old string) with new (the new string) in the string.

**Syntax**

```
Replace(s string, old string, new string) string

```

* **s**

    The original string.

* **Old**

    The substring to replace.

* **new**

    The new string.

**Example**

```
s = Replace($Name, `me`, `you`)
```



### Size {#size}

Returns the number of bytes in a specified string.

**Syntax**

```
Size(val string) int

```

* **val**

    A string.

**Example**

```
var len int
len = Size($Name)
```



### Sprintf {#sprintf}

This function creates a string using the specified template and parameters.

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

    A string template.

**Example**

```
out = Sprintf("%s=%d", mypar, 6448)
```



### Substr {#substr}

Returns the substring obtained from a specified string starting from the offset offset (calculated from 0 by default), and the maximum length is limited to length.

If the offset or length is less than zero, or the offset is greater than the length, an empty string is returned.

If the sum of the offset and length is greater than the string size, then, the substring will be returned starting from the offset to the end of the string.

**Syntax**

```
Substr(s string, offset int, length int) string

```

* **val**

    A string.

* **Offset**

    Offset.

* **length**

    Length of the substring.

**Example**

```
var s string
s = Substr($Name, 1, 10)
```



### ToLower {#tolower}

Returns a specified string in lowercase.

**Syntax**

```
ToLower(val string) string

```

* **val**

    A string.

**Example**

```
val = ToLower(val)
```



### ToUpper {#toupper}

Returns a specified string in uppercase.

**Syntax**

```
ToUpper(val string) string

```

* **val**

    A string.

**Example**

```
val = ToUpper(val)
```



### TrimSpace {#trimspace}

Deletes the leading and trailing spaces, tabs and newlines of a specified string.

**Syntax**

```
TrimSpace(val string) string

```

* **val**

    A string.

**Example**

 

```
var val string
val = TrimSpace(" mystr ")
```



### Floor {#floor}

Returns the largest integer value less than or equal to a specified number, float number, and string.

**Syntax**

```
Floor(x float|int|string) int
```

* **x**

    A number, float number, and string.

**Example**

```
val = Floor(5.6) // returns 5
```



### Log {#log}

Returns the natural logarithm of a specified number, float number, and string.

**Syntax**

```
Log(x float|int|string) float

```

*  **x**

    A number, float number, and string.

**Example**

```
val = Log(10)
```



### Log10 {#log10}

Returns the base-10 logarithm of a specified number, float number, and string.

**Syntax**

```
Log10(x float|int|string) float

```

* **x**

    A number, float number, and string.

**Example**

 

```
val = Log10(100)
```



### Pow {#pow}

Returns the specified base to the specified power (xy).

**Syntax**

```
Pow(x float|int|string, y float|int|string) float

```

* **x**

    Base number.

* **y**

    Exponent.

**Example**

```
val = Pow(2, 3)

```

### Round {#round}

Returns the value of a specified number rounded to the nearest integer.

**Syntax**

```
Round(x float|int|string) int

```

* **x**

    A number.

**Example**

```
val = Round(5.6)
```

### Sqrt {#sqrt}

Returns the square root of a specified number.

```
Sqrt(x float|int|string) float

```

* **x**

    A number.

**Example**

```
val = Sqrt(225)
```



### StringToBytes {#stringtobytes}

Converts a string to bytes.

**Syntax**

```
StringToBytes(src string) bytes

```

* **src**

    A string.

**Example**

 

```
var b bytes
b = StringToBytes("my string")
```



### BytesToString {#bytestostring}

Converts bytes to string.

**Syntax**

```
BytesToString(src bytes) string

```

* **src**

    Byte.

**Example**

```
var s string
s = BytesToString($Bytes)
```



### SysParamString {#sysparamstring}

Returns the value of a specified platform parameter.

**Syntax**

```
SysParamString(name string) string

```

* **name**

    Parameter name.

**Example**

```
url = SysParamString(`blockchain_url`)
```



### SysParamInt {#sysparamint}

Returns the value of a specified platform parameter in the form of a number.

**Syntax**

```
SysParamInt(name string) int

```

* **name**

    Parameter name.

**Example**

```
maxcol = SysParam(`max_columns`)
```



### DBUpdateSysParam {#dbupdatesysparam}

Updates the value and conditions of a platform parameter. If you do not need to change the value or conditions, please specify an empty string in the corresponding parameter.

**Syntax**

```
DBUpdateSysParam(name, value, conditions string)

```

* **name**

    Parameter name.

* **value**

    New value of a parameter.

* **conditions**

    New conditions for updating a parameter.

**Example**

```
DBUpdateSysParam(`fuel_rate`, `400000000000`, ``)

```

### UpdateNotifications {#updatenotifications}

Obtains the notification list of a specified key from the database, and sends the notification obtained to Centrifugo.

**Syntax**

```
UpdateNotifications(ecosystemID int, keys int...)

```

* **EcosystemID**

    Ecosystem ID.

* **key**

    A list of account addresses, separated by commas. Or you can use an array to specify a list of account addresses.

**Example**

```
UpdateNotifications($ecosystem_id, $key_id, 23345355454, 35545454554)
UpdateNotifications(1, [$key_id, 23345355454, 35545454554])
```



### UpdateRolesNotifications {#updaterolesnotifications}

Obtains the notification list of all account addresses of a specified role ID in the database, and sends the notification obtained to Centrifugo.

**Syntax**

```
UpdateRolesNotifications(ecosystemID int, roles int ...)

```

*  **EcosystemID**

    Ecosystem ID.

*  **roles**

    A list of role IDs, separated by commas. Or you can use an array to specify a list of role IDs.

**Example**

```
UpdateRolesNotifications(1, 1, 2)

```

### HTTPRequest {#httprequest}

Sends HTTP requests to the specified address.
> Note

> This function can only be used in CLB contracts.

**Syntax**

```
HTTPRequest(url string, method string, heads map, pars map) string

```

* **Url**

    Address, to which the request will be sent.

* **method**

    Request type (GET or POST).

* **heads**

    An array of request headers, objects.

* **pars**

    Request parameters.

**Example**

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

This function is similar to the HTTPRequest function, but it sends a POST request and the request parameters are strings.

>  Note

>  This function can only be used in CLB contracts

**Syntax**

```
HTTPPostJSON(url string, heads map, pars string) string

```

* **Url**

    Address, to which the request will be sent.

* **heads**

    An array of request headers, objects.
* **pars**

    Request parameters as a JSON string. 

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

Returns the generation time of the block in SQL format.

**Syntax**

```
BlockTime()
```



**Example**

```
var mytime string
mytime = BlockTime()
DBInsert("mytable", myid, {time: mytime})
```



### DateTime {#datetime}

Converts the timestamp unixtime to a string in YYYY-MM-DD HH:MI:SS format.

**Syntax**

```
DateTime(unixtime int) string
```



**Example**

```
DateTime(1532325250)

```

### UnixDateTime {#unixdatetime}

Converts a string in YYYY-MM-DD HH:MI:SS format to a timestamp unixtime

**Syntax**

```
UnixDateTime(datetime string) int
```



**Example**

```
UnixDateTime("2018-07-20 14:23:10")
```



### CreateOBS {#createobs}

Creates a child CLB.

This function can only be used in the master CLB mode.

**Syntax**

```
CreateOBS(OBSName string, DBUser string, DBPassword string, OBSAPIPort int)

```

* **OBSName**

    CLB name.

* **DBUser**

    The role name of the database.

*  **DBPassword**

    The password of the role.

* **OBSAPIPort**

    The port of the API request.

**Example**

```
CreateOBS("obsname", "obsuser", "obspwd", 8095)

```

### GetOBSList {#getobslist}

Returns the list of child CLBs.

This function can only be used in the master CLB mode.

**Syntax**

```
GetOBSList()

```

> **Return value**

An array of objects, where the key is the CLB name and the value is the process state.

### RunOBS {#runobs}

A process running the CLB.

This function can only be used in the master CLB mode.

**Syntax**

```
RunOBS(OBSName string)

```

* **OBSName**

  CLB name.

  It can only contain letters and numbers, and the space symbol cannot be used.

### StopOBS {#stopobs}

Stop the process of a specified CLB.

This function can only be used in the master CLB mode.

**Syntax**

```
StopOBS(OBSName string)

```

* **OBSName**

  CLB name.

  It can only contain letters and numbers, and the space symbol cannot be used.

### RemoveOBS {#removeobs}

Deletes the process of a specified CLB.

This function can only be used in the master CLB mode.

**Syntax**

```
RemoveOBS(OBSName string)

```

* **OBSName**

CLB name.

It can only contain letters and numbers, and the space symbol cannot be used.

## System Contracts {#system-contracts}

System contracts are created by default when the IBax blockchain platform is launched. All these contracts were created in the first ecosystem. This is why you need to specify their full names when calling them from other ecosystems, for example, `@1NewContract`.

### NewEcosystem {#newecosystem}

This contract creates a new ecosystem. To obtain the ID of the ecosystem created, you must quote the result filed returned in [txstatus](../reference/api2.md#txstatus).

Parameters:
  * **Name** string - name of the ecosystem. It can be changed later.

### EditEcosystemName {#editecosystemname}

Changes the name of the ecosystem in the 1_ecosystems table that only exists in the first ecosystem.

Parameters:
  * **EcosystemID** int - changes the name of the ecosystem ID;
  * **NewName** string - new name of the ecosystem.

### NewContract {#newcontract}

Creates a new contract in the current ecosystem.

Parameters:
  * **ApplicationId** int - the application to which a new contract belongs;
  * **Value** string - contract source code. The upper layer must have only one contract;
  * **Conditions** string - changes the conditions of the contract;
  * **TokenEcosystem** int "optional" - ecosystem ID. It determines which token will be used for transactions when the contract is activated.

### EditContract {#editcontract}

Edits the contract in the current ecosystem.

Parameters:
  * **Id** int - the contract ID changed;
  * **Value** string "optional" - source code of the contract;
  * **Conditions** string "optional" - changes the conditions of the contract.

### BindWallet {#bindwallet}
Binding the contract to the wallet address in the current ecosystem. After binding with the contract, the contract execution fee will be paid under this address. 

Parameters:
  * **Id** int - the contract ID to be bound.
  * **WalletId** string "optional" - the wallet address bound to the contract.

### UnbindWallet {#unbindwallet}

Unbinding the contract from the wallet address in the current ecosystem. Only addresses bound to the contract can be unbound. After unbinding the contract, users who execute the contract will pay the execution fee.

Parameters:
  * **Id** int - the ID of the contract being bound.

### NewParameter {#newparameter}

A new ecosystem parameter has been added to the current ecosystem.

Parameters:
  * **Name** string - parameter name;
  * **Value** string - parameter value;
  * **Conditions** string - conditions to change the parameter.

### EditParameter {#editparameter}

Changes existing ecosystem parameters in the current ecosystem.

Parameters:
  * **Name** string - name of the parameter to be changed;
  * **Value** string - new parameter value;
  * **Conditions** string - new conditions to change the parameter.

### NewMenu {#newmenu}

Adds a new menu in the current ecosystem.

Parameters:
  * **Name** string - menu name;
  * **Value** string - menu source code;
  * **Title** string "optional" - menu title;
  * **Conditions** string - conditions to change the menu.

### EditMenu {#editmenu}

Changes the existing menu in the current ecosystem.

Parameters:
  * **Id** int - menu ID to be changed;
  * **Value** string "optional" - source code of the new menu;
  * **Title** string "optional" - title of the new menu;
  * **Conditions** string "optional" - new conditions to change the menu.

### AppendMenu {#appendmenu}

Adds the source code content to existing menus in the current ecosystem

Parameters:
  * **Id** int - menu ID;
  * **Value** string - source code to be added.

### NewPage {#newpage}

Adds a new page in the current ecosystem.

Parameters:
  * **Name** string - name of the page;
  * **Value** string - source code of the page;
  * **Menu** string - name of the menu associated with the page;
  * **Conditions** string - conditions to change the page;
  * **ValidateCount** int "optional" - number of nodes required for page validation. If this parameter is not specified, the min_page_validate_count ecosystem parameter value is used. The value of this parameter cannot be less than min_page_validate_count and greater than max_page_validate_count;

  * **ValidateMode** int "optional" - mode of page validity check. The page will be checked when it is loaded if the value of this parameter is 0; or checked when it is loaded or exit the page if the value of this parameter is 1. 

### EditPage {#editpage}

Changes existing pages in the current ecosystem.

Parameters:
  * **Id** int - ID of the page to be changed;
  * **Value** string "optional" - source code of the new page;
  * **Menu** string "optional" - name of the new menu associated with the page;
  * **Conditions** string "optional" - new conditions to change the page;
  * **ValidateCount** int "optional" - number of nodes required for page validation. If this parameter is not specified, the min_page_validate_count ecosystem parameter value is used. The value of this parameter cannot be less than min_page_validate_count and greater than max_page_validate_count;
  * **ValidateMode** int "optional" - mode of page validity check. The page will be checked when it is loaded if the value of this parameter is 0; or checked when it is loaded or exit the page if the value of this parameter is 1. 

### AppendPage {#appendpage}

Adds the source content to existing pages in the current ecosystem.

Parameters:
* **Id** int - ID of the page to be changed;
* **Value** string - the source code to be added.

### NewBlock {#newblock}

Adds a page module to the current ecosystem.

Parameters:
  * **Name** string - name of the module;
  * **Value** string - source code of the module;
  * **Conditions** string - conditions to change the module.

### EditBlock {#editblock}

Changes existing page modules in the current ecosystem.

Parameters:
  * Id int - module ID to be changed;
  * Value string - source code of the new module;
  * Conditions string - new conditions to change the module.

### NewTable {#newtable}

Adds a new table to the current ecosystem.

Parameters:
  * **ApplicationId** int - application ID of the associated table;
  * **Name** string - name of the new table;
  * **Columns** string - field array in JSON format `[{"name":"...", "type":"...","index": "0", "conditions":".. ."},...]`, where
    * **name** - field name, only Latin characters;
    * **type** - data type `varchar,bytea,number,datetime,money,text,double,character`;
    * **index** - non-primary key field `0`, primary key `1`;
    * **conditions** - conditions to change the field data, and the access permissions must be specified in JSON format "`{"update":"ContractConditions(MainCondition)", "read":"ContractConditions(MainCondition)"}`;
  * **Permissions** string - access permissions in JSON format `{"insert": "...", "new_column": "...", "update": "...", "read": ".. ."}`.
    * **insert** - permission to insert entries;
    * **new_column** - permission to add a new column;
    * **update** - permission to change entry data;
    * **read** - permission to read entry data.

### EditTable {#edittable}

Changes the access permissions of a table in the current ecosystem.

Parameters:
  * **Name** string - name of the table;
  * **InsertPerm** string - permission to insert entries into the table;
  * **UpdatePerm** string - permission to update entries in the table;
  * **ReadPerm** string - permission to read entries in the table;
  * **NewColumnPerm** string - permission to create a new column;

### NewColumn {#newcolumn}

Adds a new field to the table of the current ecosystem.

Parameters:
  * **TableName** string - table name;
  * **Name** string - field name in Latin characters;
  * **Type** string - data type `varchar,bytea,number,money,datetime,text,double,character`;
  * **UpdatePerm** string - permission to change the value in the column;
  * **ReadPerm** string - permission to read the value in the column.

### EditColumn {#editcolumn}

Changes the permission of a specified table field in the current ecosystem.

Parameters:
  * **TableName** string - table name;
  * **Name** string - field name in Latin characters to be changed;
  * **UpdatePerm** string - new permission to change the value in the column;
  * **ReadPerm** string - new permission to read the value in the column.

### NewLang {#newlang}

Adds language resources to the current ecosystem, and the permission to do so is set in the changing_language parameter of the ecosystem parameters.

Parameters:

  * **Name** string - name of the language resources in Latin characters;
  * **Trans** string - string in JSON format, with a two-character lang code as the key and the translated string as the value. For example, `{"en": "English text", "de": "deutscher text"}`.

### EditLang {#editlang}

Changes the language resources in the current ecosystem, and the permission to do so is set in the changing_language parameter of the ecosystem parameter.

Parameters:

  * **Id** int - language resources ID.
  * **Trans** - string in JSON format, with a two-character lang code as the key and the translated string as the value. For example, `{"en": "English text", "de": "deutscher text"}`.

### Import {#import}

Imports an application into the current ecosystem and imports the data loaded from the [ImportUpload](#importupload) contract.

Parameters:

  * **Data** string - data imported in text format, which comes from a file exported by the ecosystem.

### ImportUpload {#importupload}

Loads an external application file into the buffer_data table of the current ecosystem for subsequent import.

Parameters:
  * **InputFile** file - a file written to the buffer_data table of the current ecosystem.

### NewAppParam {#newappparam}

Adds new application parameters to the current ecosystem.

Parameters:
  * **ApplicationId** int - application ID;
  * **Name** string - parameter name;
  * **Value** string - parameter value;
  * **Conditions** string - permission to change the parameter.

### EditAppParam {#editappparam}

Changes existing application parameters in the current ecosystem.

Parameters:
  * **Id** int - application parameter ID;
  * **Value** string "optional" - new parameter value;
  * **Conditions** string "optional" - new permissions to change the parameter.

### NewDelayedContract {#newdelayedcontract}

Adds a new task to the delayed contracts scheduler daemon.

The delayered contracts scheduler runs contracts required by the currently generated block.

Parameters:
  * **Contract** string - contract name;
  * **EveryBlock** int - the contract will be executed every such amount of blocks;
  * Conditions string - permission to change the task;
  * **BlockID** int "optional" - the block ID where the contract must be executed. If not specified, it will be calculated automatically by adding the "current block ID" + EveryBlock;
  * **Limit** int "optional" - the maximum number of task execution. If not specified, the task will be executed for an unlimited times.

### EditDelayedContract {#editdelayedcontract}

Changes a task in the delayed contracts scheduler daemon. 

Parameters:
  * **Id** int - task ID;
  * **Contract** string - contract name;
  * **EveryBlock** int - the contract will be executed every such amount of blocks;
  * **Conditions** string - permission to change the task;
  * **BlockID** int "optional" - the block ID where the contract must be executed. If not specified, it will be calculated automatically by adding the "current block ID" + EveryBlock;
  * **Limit** int "optional" - the maximum number of task execution. If not specified, the task will be executed for an unlimited times.
  * **Deleted** int "optional" - task switching. A value of `1` will disable the task. A value of `0` will enable the task.

### UploadBinary {#uploadbinary}

Adds or overwrites a static file in the X_binaries table. When calling a contract via HTTP API, the request must be in `multipart/form-data` format; the DataMimeType parameter will be used in conjunction with the form data.

Parameters:
  * **Name** string - name of the static file;
  * **Data** bytes - content of the static file;
  * **DataMimeType** string "optional" - a static file in mime-type format;
  * **ApplicationId** int - the application ID associated with the X_binaries table.

  If the DataMimeType parameter is not passed, the `application/octet-stream` format is used by default.
