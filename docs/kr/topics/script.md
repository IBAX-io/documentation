# Smart Contracts {#smart-contracts}

# 스마트 계약
  - [계약 구조](#contract-structure)
    - [데이터 섹션](#data-section)
    - [조건 섹션](#conditions-section)
    - [액션 섹션](#action-section)
  - [변수](#variables)
  - [중첩된 계약](#nested-contracts)
  - [파일 업로드](#file-upload)
  - [JSON 형식의 쿼리](#queries-in-json-format)
  - [날짜 및 시간 연산이 포함된 쿼리](#queries-with-date-and-time-operations)
  - [Needle 계약 언어](#needle-contract-language)
    - [기본 요소 및 구조](#basic-elements-and-structure)
    - [데이터 유형 및 변수](#data-types-and-variables)
    - [배열](#array)
    - [If 및 While 문](#if-and-while-statements)
  - [함수](#functions)
    - [함수 선언](#function-declaration)
    - [가변 길이 매개변수](#variable-length-parameters)
    - [옵션 매개변수](#optional-parameters)
  - [Needle 함수 분류](#needle-functions-classification)
  - [Needle 함수 참조](#needle-functions-reference)
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
  - [시스템 계약](#system-contracts)
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



스마트 계약(이하 계약)은 애플리케이션의 기본 요소 중 하나입니다. 사용자가 페이지에서 계약을 구현하는 것은 일반적으로 데이터베이스 항목을 업데이트하거나 만드는 것이 목적인 단일 작업입니다. 애플리케이션의 모든 데이터 작업은 계약 시스템을 형성하며 이러한 계약은 데이터베이스 또는 계약 콘텐츠 기능을 통해 서로 상호 작용합니다.

## 계약 구조  (Contract Structure) {#contract-structure}

아래와 같은 형식으로 `contract` 키워드를 사용하여 계약을 선언합니다. 계약 이름 뒤에 중괄호로 계약 내용을 감싸야 합니다. 계약은 주로 세 가지 섹션으로 구성됩니다:

1. **data** - [data section](#data-section)에서는 입력 데이터의 변수 이름과 변수 유형을 선언합니다.

2. **conditions** - [conditions section](#conditions-section)에서는 데이터의 정확성을 검증합니다.

3. **action** - [action section](#action-section)에서는 데이터 조작을 정의합니다.

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


### 데이터 섹션 (Data section) {#data-section}

`data` 섹션에서는 계약 데이터 입력 및 수신된 폼 매개변수를 설명합니다.

각 줄의 구조는 다음과 같습니다:

* Variable name - 변수만 수신하고 배열은 수신하지 않습니다.
* Variable data type - 변수의 [data type](#data-types-and-variables);
* optional - 폼 요소에 기입하지 않아도 되는 선택적 매개변수입니다.


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



### 조건 섹션 (Conditions section) {#conditions-section}

`conditions` 섹션은 수신된 데이터의 검증을 설명합니다.

다음 명령은 오류 경고에 사용됩니다: 심각한 오류 `error`, 경고 오류 `warning`, 암시적 오류 `info`. 이 세 가지 명령은 계약 실행을 종료하는 오류를 생성하고 각 오류는 다른 유형의 오류 로그 정보를 인쇄합니다. 예를 들어:

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

### 액션 섹션 (Action section) {#action-section}

`action` 섹션은 다른 데이터를 검색하고 결과 값을 테이블에 기록하는 계약의 주요 코드를 설명합니다. 예를 들어:

```
action {
DBUpdate("keys", $key_id, {"-amount": $amount})
DBUpdate("keys", $recipient, {"+amount": $amount, "pub": $Pub})
}
```



## 변수 (Variables) {#variables}

데이터 섹션에 선언된 변수는 `$` 기호와 변수 이름을 통해 다른 계약 섹션으로 전달됩니다. `$` 기호는 데이터 섹션에 없는 다른 변수를 선언하는 데에도 사용할 수 있으며, 이 변수는 이 계약 및 이 계약이 중첩된 모든 계약의 전역 변수로 간주됩니다.

미리 정의된 변수는 스마트 계약을 호출한 트랜잭션 데이터를 포함하는 계약에서 사용할 수 있습니다.

* `$time` - 트랜잭션 타임스탬프;
* `$ecosystem_id` - 생태계 ID;
* `$block` - 트랜잭션을 포함하는 블록의 ID;
* `$key_id` - 현재 트랜잭션에 서명한 계정의 주소;
* `$type` - 가상 머신에서의 계약 ID;
* `$block_key_id` - 블록을 생성한 노드의 계정 주소;
* `$block_time` - 블록 생성 타임스탬프;
* `$original_contract` - 초기에 트랜잭션을 처리한 계약의 이름. 이 변수가 빈 문자열이면 트랜잭션 유효성 검증 중에 계약이 호출되었음을 의미합니다. 계약이 다른 계약에 의해 호출되었는지 아니면 직접 트랜잭션에 의해 호출되었는지 확인하려면 $original_contract와 $this_contract의 값을 비교해야 합니다. 두 값이 동일하면 계약이 트랜잭션에 의해 호출된 것을 의미합니다;
* `$this_contract` - 현재 실행 중인 계약의 이름;
* `$guest_key` - 게스트 계정 주소;
* `$stack` - 데이터 유형이 배열인 계약 배열 스택으로, 실행된 모든 계약을 포함합니다. 배열의 첫 번째 요소는 현재 실행 중인 계약의 이름을 나타내고, 마지막 요소는 초기에 트랜잭션을 처리한 계약의 이름을 나타냅니다;
* `$node_position` - 블록이 위치한 검증 노드 배열의 인덱스 번호;
* `$txhash` - 트랜잭션 해시;
* `$contract` - 현재 계약 구조 배열.


미리 정의된 변수는 계약뿐만 아니라 애플리케이션 요소의 액세스 권한 조건을 정의하는 권한 필드에서도 액세스할 수 있습니다. 권한 필드에서 사용될 때 블록 정보에 대한 미리 정의된 변수는 `$time`, `$block` 등과 같이 항상 0입니다.

미리 정의된 변수 `$result`는 계약의 반환 결과와 함께 할당됩니다.

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

## 중첩된 계약 (Nested Contracts) {#nested-contracts}

계약의 조건 및 작업 섹션에 계약을 중첩할 수 있습니다. 중첩된 계약은 직접 호출할 수 있으며 계약 매개변수는 계약 이름 뒤에 괄호 안에 지정됩니다(예: `@1NameContract(Params)`). [CallContract](#callcontract) 함수를 사용하여 중첩 계약을 호출할 수도 있습니다.

## 파일 업로드 (File upload) {#file-upload}

`multipart/form-data` 형식의 양식을 사용하여 파일을 업로드하려면 계약서의 데이터 유형이 `file`이어야 합니다.

```
contract Upload {
     data {
        File file
     }
     ...
}
```

[UploadBinary](#uploadbinary) 계약은 파일을 업로드하고 저장하는 데 사용됩니다. 페이지 편집기의 Logicor 언어 기능 [Binary](templates2.md#binary)를 사용하면 파일 다운로드 링크를 얻을 수 있습니다.

## JSON 형식의 쿼리 (Queries in JSON format) {#queries-in-json-format}

계약 언어에서 **JSON**을 필드 유형으로 지정할 수 있습니다. **columnname->fieldname** 구문을 사용하여 항목 필드를 처리할 수 있습니다. 얻은 값은 **columnname.fieldname**에 기록됩니다. 위 구문은 [DBFind](#dbfind) 함수의 Columns,One,Where에서 사용할 수 있습니다.

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



## 날짜 및 시간 연산이 포함된 쿼리 (Queries with date and time operations) {#queries-with-date-and-time-operations}

계약 언어 함수로 날짜와 시간을 직접 쿼리하고 업데이트할 수는 없지만, 아래 예시와 같이 Where 문에서 PostgreSQL 함수와 기능을 사용할 수 있습니다. 예를 들어 date_column 필드를 현재 시간과 비교해야 합니다. date_column이 타임스탬프 유형인 경우 표현식은 `date_column <NOW()`여야 합니다. date_column이 Unix 유형인 경우 표현식은 `to_timestamp(date_column)> NOW()`여야 합니다.

```
Where("to_timestamp(date_column)> NOW()")
Where("date_column <NOW() - 30 * interval '1 day'")
```

다음 Needle 함수는 SQL 형식의 날짜 및 시간을 처리하는 데 사용됩니다.

* [BlockTime](#blocktime)
* [DateTime](#datetime)
* [UnixDateTime](#unixdatetime)

## Needle 계약 언어 (Needle contract language) {#needle-contract-language}

계약 언어에는 데이터 알고리즘 처리 및 데이터베이스 작업을 실현할 수 있는 일련의 함수, 연산자 및 구조가 포함됩니다.

계약 편집 권한이 `false`로 설정되어 있지 않으면 계약 내용을 수정할 수 있습니다. 계약 변경의 전체 이력은 Weaver에서 사용할 수 있는 블록체인에 저장됩니다.

블록체인의 데이터 작업은 최신 버전의 계약에 따라 실행됩니다.

### 기본 요소 및 구조 (Basic elements and structure) {#basic-elements-and-structure}

### 데이터 유형 및 변수 (Data types and variables) {#data-types-and-variables}

데이터 유형은 모든 변수에 정의되어야 합니다. 일반적으로 데이터 유형은 자동으로 변환됩니다. 다음과 같은 데이터 유형을 사용할 수 있습니다:

* `bool` - 불리언, `true` 또는 `false`;
* `bytes` - 바이트 형식;
* `Int` - 64비트 정수;
* `Array` - 어떤 유형의 배열;
* `map` - 객체 배열;
* `money` - 큰 정수;
* `float` - 64비트 부동 소수점 숫자;
* `string` - 문자열은 큰 따옴표나 이스케이프 형식으로 정의되어야 합니다: "This is a string" 또는 \`This is a string\`;
* `file` - 객체 배열:
  * `Name` - 파일 이름, `string` 유형;
  * `MimeType` - 파일의 **MIME 타입**, `string` 유형;
  * `Body` - 파일 내용, `bytes` 유형.

변수, 함수 및 계약의 이름을 포함한 모든 식별자는 대소문자를 구분합니다 (MyFunc와 myFunc은 다른 이름입니다).

변수를 선언하려면 **var** 키워드를 사용하고 변수의 이름과 유형을 지정해야 합니다. 중괄호 내에서 선언된 변수는 동일한 중괄호 쌍 내에서 사용되어야 합니다.

선언된 모든 변수의 기본값은 0입니다. bool 유형의 기본값은 false이고, 모든 숫자 유형의 기본값은 0이며, 문자열의 기본값은 빈 문자열입니다. 변수 선언의 예시:

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



### 배열 (Array) {#array}

계약 언어는 두 가지 유형의 배열을 지원합니다:
* `Array` - 인덱스가 0부터 시작하는 배열;
* `map` - 객체의 배열.

배열 요소를 할당하고 검색할 때는 인덱스를 대괄호에 위치시켜야 합니다. 배열에서 여러 개의 인덱스를 지원하지 않으며, 배열 요소를 myarr[i][j]와 같이 처리할 수 없습니다.

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

`[]`에 요소를 지정하여 배열 유형의 배열을 정의할 수도 있습니다. 지도 유형 `arrays`의 경우 `{}`를 사용하세요.

```
var my map
my={"key1": "value1", key2: i, "key3": $Name}
var mya array
mya=["value1", {key2: i}, $Name]
```

식에서 이러한 초기화를 사용할 수 있습니다. 예를 들어 함수 매개변수에 사용합니다.

```
DBFind...Where({id: 1})
```

개체 배열의 경우 키를 지정해야 합니다. 키는 큰따옴표(`""`)로 묶인 문자열로 지정됩니다. 키 이름이 문자, 숫자 및 밑줄로 제한되는 경우 큰따옴표를 생략할 수 있습니다.

```
{key1: "value1", key2: "value2"}
```

배열은 문자열, 숫자, 모든 유형의 변수 이름 및 `$` 기호가 있는 변수 이름을 포함할 수 있습니다. 중첩 배열을 지원합니다. 다른 맵 또는 배열을 값으로 지정할 수 있습니다.

식은 배열 요소로 사용할 수 없습니다. 변수를 사용하여 식 결과를 저장하고 이 변수를 배열 요소로 지정합니다.

```
[1+2, myfunc(), name["param"]] // don't do this
[1, 3.4, mystr, "string", $ext, myarr, mymap, {"ids": [1,2, i], company: {"Name": "MyCompany"}} ] // this is ok

var val string
val = my["param"]
MyFunc({key: val, sub: {name: "My name", "color": "Red"}})
```

### If 및 While 문 (If and While statements) {#if-and-while-statements}

계약 언어는 계약 및 함수에서 사용할 수 있는 표준 **if** 조건문 및 **while** 루프를 지원합니다. 이러한 명령문은 서로 중첩될 수 있습니다.

**if** 및 **while** 뒤에는 조건문이 와야 합니다. 조건문이 숫자를 반환하면 값이 0일 때 거짓으로 간주됩니다.

val == 0은 !val과 같고 val != 0은 val과 같습니다. **if** 문은 **else** 코드 블록을 가질 수 있으며 **else**는 **if** 조건문이 거짓일 때 실행됩니다.

다음 비교 연산자는 조건문에서 사용할 수 있습니다: `<, >, >=, <=, ==, !=, ||, &&`

```
if val> 10 || id != $block_key_id {
 ...
} else {
 ...
}
```

코드 블록은 **while** 루프의 조건문이 참일 때 실행됩니다. **break**는 코드 블록의 루프를 종료하는 것을 의미합니다. 루프를 처음부터 시작하려면 **continue**을 사용하세요.

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

조건문 외에도 Needle은 `+`, `-`, `*`, `/`와 같은 표준 산술 연산도 지원합니다.

문자열 및 바이트 유형의 변수를 조건문으로 사용할 수 있습니다. 유형의 길이가 0보다 크면 조건이 참이고 그렇지 않으면 거짓입니다.

### 함수 (Functions) {#functions}

함수는 계약의 [data section](#data-section) 에서 수신한 데이터에 대해 일부 작업을 수행할 수 있습니다. 데이터베이스에서 데이터 읽기 및 쓰기, 값 유형 변환, 계약 간의 상호 작용 설정.

#### 함수 선언 (Function declaration) {#function-declaration}

func 키워드를 사용하여 함수를 선언하고 그 뒤에 이름과 전달된 매개변수 목록 및 해당 유형을 사용합니다. 모든 매개변수는 괄호로 묶고 쉼표로 구분합니다. 괄호 뒤에는 함수가 반환하는 값의 데이터 유형을 선언해야 합니다. 함수 본문은 중괄호로 묶어야 합니다. 함수에 매개변수가 없으면 중괄호를 생략할 수 있습니다. 함수에서 값을 반환하려면 `return` 키워드를 사용하십시오.

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

모든 오류 검사가 자동으로 수행되기 때문에 함수는 오류를 반환하지 않습니다. 기능에 오류가 있는 경우 계약은 해당 작업을 종료하고 오류 설명을 창에 표시합니다.

#### 가변 길이 매개변수 (Variable-length parameters) {#variable-length-parameters}

함수는 가변 길이 매개변수를 정의할 수 있으며 `...` 기호를 함수의 마지막 매개변수 유형으로 사용하여 `array` 데이터 유형으로 가변 길이 매개변수를 나타낼 수 있습니다. 가변 길이 매개변수에는 매개변수가 호출에 전달된 시점부터의 모든 변수가 포함됩니다. 모든 유형의 변수를 전달할 수 있지만 데이터 유형의 불일치 충돌을 처리해야 합니다.

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



#### 옵션 매개변수 (Optional parameters) {#optional-parameters}

함수는 많은 매개변수를 가지지만 호출할 때에는 그 중 일부만 필요할 수 있습니다. 이 경우, 다음과 같이 선택적 매개변수를 선언할 수 있습니다: `func myfunc(name string).Param1(param string).Param2(param2 int) {...}`, 그런 다음 호출할 때 지정된 매개변수를 원하는 순서로 호출할 수 있습니다: `myfunc("name").Param2(100)`.

함수 본문에서는 이러한 변수들을 일반적으로 처리할 수 있습니다. 지정된 선택적 매개변수가 호출되지 않은 경우, 기본값은 0입니다. 또한 ...을 사용하여 가변 길이 매개변수를 지정할 수도 있습니다: `func DBFind(table string).Where(request string, params ...)` 그리고 이를 호출할 수 있습니다: `DBFind("mytable").Where({" id": $myid, "type": 2})`


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

## Needle 함수 분류 (Needle functions classification) {#needle-functions-classification}

데이터베이스에서 값 검색:

|                 |               |                 |
| --------------- | ------------- | --------------- |
| [AppParam](#appparam)        | [EcosysParam](#ecosysparam)   | [GetDataFromXLSX](#getdatafromxlsx) |
| [DBFind](#dbfind)          | [GetHistory](#gethistory)    | [GetRowsCountXLSX](#getrowscountxlsx) |
| [DBRow](#dbrow)           | [GetHistoryRow](#gethistoryrow) | [GetBlock](#getblock)        |
| [DBSelectMetrics](#dbselectmetrics) | [GetColumnType](#getcolumntype) | [LangRes](#langres)         |

테이블의 데이터 업데이트:

|          |             |          |
| -------- | ----------- | -------- |
| [DBInsert](#dbinsert) | [DBUpdateExt](#dbupdateext) | [DelTable](#deltable) |
| [DBUpdate](#dbupdate) | [DelColumn](#delcolumn)   |          |

어레이 작업:

|        |      |            |
| ------ | ---- | ---------- |
| [Append](#append) | [Len](#len)  | [GetMapKeys](#getmapkeys) |
| [Join](#join)   | [Row](#row)  | [SortedKeys](#sortedkeys) |
| [Split](#split)  | [One](#one)  |            |

계약 및 권한이 있는 작업:

|                    |                   |                   |
| ------------------ | ----------------- | ----------------- |
| [CallContract](#callcontract)       | [GetContractById](#getcontractbyid)   | [TransactionInfo](#transactioninfo)   |
| [ContractAccess](#contractaccess)     | [RoleAccess](#roleaccess)        | [Throw](#throw)             |
| [ContractConditions](#contractconditions) | [GetContractByName](#getcontractbyname) | [ValidateCondition](#validatecondition) |
| [EvalCondition](#evalcondition)      |                   |                   |


주소가 있는 작업:

|             |             |         |
| ----------- | ----------- | ------- |
| [AddressToId](#addresstoid) | [IdToAddress](#idtoaddress) | [PubToID](#pubtoid) |


변수 값을 사용한 작업:

|              |             |        |
| ------------ | ----------- | ------ |
| [DecodeBase64](#decodebase64) | [FormatMoney](#formatmoney) | [Hash](#hash)   |
| [EncodeBase64](#encodebase64) | [Random](#random)      | [Sha256](#sha256) |
| [Float](#float)        | [Int](#int)         | [Str](#str)    |
| [HexToBytes](#hextobytes)   |             |        |

산술 연산:

|       |       |       |
| ----- | ----- | ----- |
| [Floor](#floor) | [Log10](#log10) | [Round](#round) |
| [Log](#log)   | [Pow](#pow)   | [Sqrt](#sqrt)  |




JSON 작업:

|            |                  |            |
| ---------- | ---------------- | ---------- |
| [JSONEncode](#jsonencode) | [JSONEncodeIndent](#jsonencodeindent) | [JSONDecode](#jsondecode) |


문자열 작업:

|           |         |           |
| --------- | ------- | --------- |
| [HasPrefix](#hasprefix) | [Size](#size)    | [ToLower](#tolower)   |
| [Contains](#contains)  | [Sprintf](#sprintf) | [ToUpper](#toupper)   |
| [Replace](#replace)   | [Substr](#substr)  | [TrimSpace](#trimspace) |


바이트 작업:

|               |               |      |
| ------------- | ------------- | ---- |
| [StringToBytes](#stringtobytes) | [BytesToString](#bytestostring) |      |


SQL 형식의 날짜 및 시간 작업:

|           |          |              |
| --------- | -------- | ------------ |
| [BlockTime](#blocktime) | [DateTime](#datetime) | [UnixDateTime](#unixdatetime) |


플랫폼 매개변수를 사용한 작업:
|           |          |              |
| --------- | -------- | ------------ |
| [SysParamString](#sysparamstring) | [SysParamInt](#sysparamint) | [DBUpdateSysParam](#dbupdatesysparam) |
| [UpdateNotifications](#updatenotifications) | [UpdateRolesNotifications](#updaterolesnotifications) | |

플랫폼 매개변수를 사용한 작업:
|             |              |      |
| ----------- | ------------ | ---- |
| [HTTPRequest](#httprequest) | [HTTPPostJSON](#httppostjson) |      |




마스터 CLB 노드의 기능:

|            |         |           |
| ---------- | ------- | --------- |
| [CreateOBS](#createobs)  | [RunOBS](#runobs)  | [RemoveOBS](#removeobs) |
| [GetOBSList](#getobslist) | [StopOBS](#stopobs) |           |



## Needle 함수 참조 (Needle functions reference) {#needle-functions-reference}


### AppParam {#appparam}

지정된 응용 프로그램 매개변수의 값을 반환합니다 (응용 프로그램 매개변수 테이블 app_params에서).

#### 구문

```
AppParam(app int, name string, ecosystemid int) string
```

* **App**

  애플리케이션 ID.

* **name**

    애플리케이션 매개변수 이름.

* **Ecosystemid**

    생태계 ID.

#### 예

```
AppParam(1, "app_account", 1)
```



### DBFind {#dbfind}

지정된 매개변수를 사용하여 지정된 테이블에서 데이터를 쿼리하고 객체 맵의 배열로 구성된 배열 배열을 반환합니다.

`.Row()`는 쿼리에서 첫 번째 맵 요소를 가져올 수 있고, `.One(열 문자열)`은 쿼리에서 지정된 열의 첫 번째 맵 요소를 가져올 수 있습니다.

#### 구문

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

  테이블 이름.

* **сolumns**

  열 목록을 반환합니다. 지정하지 않으면 모든 열이 반환됩니다.

  값은 배열이거나 쉼표로 구분된 문자열입니다.

* **where**

  쿼리 조건.

   예: `.Where({name: "John"})` 또는 `.Where({"id": {"$gte": 4}})`.

   이 매개변수는 검색 기준이 있는 객체 배열을 포함해야 합니다. 배열은 중첩된 요소를 포함할 수 있습니다.

   다음 구문 구조가 사용됩니다.

  * `{"field1": "value1", "field2": "value2"}`
     `field1 = "value1" AND field2 = "value2"`와 동일합니다.

  * `{"field1": {"$eq":"value"}}`
     `field = "value"`와 동일합니다.

  * `{"field1": {"$neq": "value"}}`
     `field != "value"`와 동일합니다.

  * `{"field1: {"$in": [1,2,3]}`
     `field IN (1,2,3)`와 동일합니다.

  * `{"field1": {"$nin": [1,2,3]}`
     `field NOT IN (1,2,3)`와 동일합니다.

  * `{"field": {"$lt": 12}}`
     `field < 12`와 동일합니다.

  * `{"field": {"$lte": 12}}`
     `field <= 12`와 동일합니다.

  * `{"field": {"$gt": 12}}`
     `field > 12`와 동일합니다.

  * `{"field": {"$gte": 12}}`
     `field >= 12`와 동일합니다.

  * `{"$and": [<expr1>, <expr2>, <expr3>]}`
     `expr1 AND expr2 AND expr3`와 동일합니다.

  * `{"$or": [<expr1>, <expr2>, <expr3>]}`
     `expr1 OR expr2 OR expr3`와 동일합니다.

  * `{field: {"$like": "value"}}`
     `field like '%value%'`와 동일합니다 (퍼지 검색).

  * `{field: {"$begin": "value"}}`
     `field like 'value%'`와 동일합니다 (value로 시작).

  * `{field: {"$end": "value"}}`
     `field like '%value'`와 동일합니다 (value로 끝남).

  * `{field: "$isnull"}`
     `field is null`와 동일합니다.


     

객체 배열의 키를 덮어쓰지 않도록 하십시오. 예를 들어 `id>2 및 id<5`로 쿼리하려는 경우 `{id:{"$gt": 2}, id:{"$lt": 5}}`를 사용할 수 없습니다. 첫 번째 요소는 두 번째 요소로 덮어씁니다. 다음 쿼리 구조를 사용해야 합니다.

```
{id: [{"$gt": 2}, {"$lt": 5}]}
```
```
{"$and": [{id:{"$gt": 2}}, {id:{"$lt": 5}}]}
```

* **Id**

     ID로 쿼리합니다. 예를 들어, .WhereId(1).

     

* **Order**

    지정된 열 또는 기본적으로 ID별로 결과 집합을 정렬하는 데 사용됩니다.

    정렬에 하나의 필드만 사용하는 경우 문자열로 지정할 수 있습니다. 여러 필드를 정렬하려면 문자열 객체의 배열을 지정해야 합니다.

    내림차순: `{"field": "-1"}` `field desc`와 동일합니다.

    오름차순: `{"field": "1"}` `field asc`와 동일합니다.

* **limit**

     항목 수를 반환합니다. 25, 기본적으로. 최대 수는 10,000입니다.

* **Offset**

     오프셋.

* **Ecosystemid**

     생태계 ID. 기본적으로 현재 생태계의 테이블이 쿼리됩니다.

     

#### 예

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

​     


### DBRow {#dbrow}

지정된 매개변수를 사용하여 지정된 테이블에서 데이터를 쿼리합니다. 객체 맵의 배열로 구성된 배열 배열을 반환합니다.

#### 구문

```
DBRow(table string)
 [.Columns(columns array|string)]
 [.Where(where map)]
 [.WhereId(id int)]
 [.Order(order array|string)]
 [.Ecosystem(ecosystemid int)] map
```

* **table**

  테이블 이름입니다.

* **columns**

  열의 목록을 반환합니다. 지정하지 않으면 모든 열이 반환됩니다.

  값은 배열이거나 쉼표로 구분된 문자열입니다.

* **where**

  쿼리 조건입니다.

  예시: `.Where({name: "John"})` 또는 `.Where({"id": {"$gte": 4}})`.

  자세한 내용은 [DBFind](#dbfind)를 참조하세요.

* **Id**

  ID로 쿼리합니다. 예시: `.WhereId(1)`.

* **Order**

  결과 집합을 지정된 열 또는 기본값인 id로 정렬하는 데 사용됩니다.

  자세한 내용은 [DBFind](#dbfind)를 참조하세요.

* **Ecosystemid**

  생태계 ID입니다. 기본적으로 현재 생태계의 테이블을 쿼리합니다.


#### 예

```
var ret map
ret = DBRow("contracts").Columns(["id","value"]).Where({id: 1})
Println(ret)
```



### DBSelectMetrics {#dbselectmetrics}

메트릭의 집계된 데이터를 반환합니다.

메트릭은 100개의 블록이 생성될 때마다 업데이트됩니다. 그리고 집계된 데이터는 1일 주기로 저장됩니다.

#### 구문

```
DBSelectMetrics(metric string, timeInterval string, aggregateFunc string) array

```

* **metric**

  메트릭 이름

  * **ecosystem_pages**
  
    생태계 페이지 수.

    반환 값: 키 - 생태계 ID, 값 - 생태계 페이지 수.

  * **ecosystem_members**
  
    생태계 구성원 수.

    반환 값: 키 - 생태계 ID, 값 - 생태계 구성원 수.

  * **ecosystem_tx**

    생태계 거래 수.

    반환 값: 키 - 생태계 ID, 값 - 생태계 트랜잭션 수.

* **timeInterval**

    메트릭 데이터 집계를 위한 시간 간격입니다. 예: `1 day`, `30 days`.

* **aggregateFunc**

    함수를 집계합니다. 예: `max`, `min`, `avg`.

#### 예

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

생태계 매개변수 테이블 매개변수에서 지정된 매개변수의 값을 반환합니다.

#### 구문

```
EcosysParam(name string) string

```

* **name**

  매개변수 이름.

#### 예

```
Println(EcosysParam("founder_account"))
```



### GetHistory {#gethistory}

지정된 테이블의 항목에 대한 변경 내역을 반환합니다.

#### 구문

```
GetHistory(table string, id int) array

```

* **table**

  테이블 이름.
* **Id**

  항목 ID.
> **Return value**

  테이블의 항목에 대한 변경 기록을 지정하는 맵 유형의 개체 배열을 반환합니다.

  각 배열에는 다음 변경을 수행하기 전에 레코드의 필드가 포함됩니다.
  배열은 가장 최근에 변경된 순서대로 정렬됩니다.
  
  배열의 id 필드는 rollback_tx 테이블의 id를 가리킵니다. block_id는 블록 ID를 나타내고 block_time은 블록 생성 타임스탬프를 나타냅니다.

#### 예

```
var list array
var item map
list = GetHistory("blocks", 1)
if Len(list) > 0 {
  item = list[0]
}
```



### GetHistoryRow {#gethistoryrow}

지정된 테이블의 지정된 항목의 변경 기록에서 단일 스냅샷을 반환합니다.

#### 구문

```
GetHistoryRow(table string, id int, rollbackId int) map
```



* **table**

  테이블 이름.

* **Id**

  항목 ID.

* **rollbackId**

  rollback_tx 테이블의 항목 ID입니다.

```
  $result = GetHistoryRow("contracts",205,2358)
```

  


### GetColumnType {#getcolumntype}

지정된 테이블에서 지정된 필드의 데이터 유형을 반환합니다.

#### 구문

```
GetColumnType(table, column string) string

```

* **table**

  테이블 이름.
* **column**

  분야 명.

> **Return value**

  반환될 수 있는 유형은 `text, varchar, number, money, double, bytes, json, datetime, double`입니다.

#### 예

```
var coltype string
coltype = GetColumnType("members", "member_name")
```



### GetDataFromXLSX {#getdatafromxlsx}

XLSX 스프레드시트에서 데이터를 반환합니다.

#### 구문

```
GetDataFromXLSX(binId int, line int, count int, sheet int) string

```

* **binId**

  이진 테이블 이진에서 XLSX 형식의 ID입니다.

* **line**

  기본적으로 0부터 시작하는 시작 줄 번호입니다.

* **count**

  반환해야 하는 행 수입니다.

* **sheet**

  기본적으로 1부터 시작하는 목록 번호입니다.


#### 예

```
var a array
a = GetDataFromXLSX(3, 12, 10, 1)
```



### GetRowsCountXLSX {#getrowscountxlsx}

지정된 XLSX 파일의 줄 수를 반환합니다.

#### 구문

```
GetRowsCountXLSX(binId int, sheet int) int
```

* **binId**

  이진 테이블 이진에서 XLSX 형식의 ID입니다.

* **sheet**

  기본적으로 1부터 시작하는 목록 번호입니다.

#### 예

```
var count int
count = GetRowsCountXLSX(binid, 1)
```



### LangRes {#langres}

언어 lang에 대한 이름 레이블이 있는 다국어 리소스를 반환하며, 두 문자 코드로 지정됩니다(예: `en`, `kr`). 선택한 언어에 대한 언어가 없으면 `en` 레이블의 언어 리소스가 반환됩니다.

#### 구문

```
LangRes(label string, lang string) string
```

* **label**

  Language resource name.
* **lang**

  Two-character language code.

#### 예

```
warning LangRes("@1confirm", "en")
error LangRes("@1problems", "kr")
```



### GetBlock {#getblock}

지정된 블록에 대한 관련 정보를 반환합니다.

#### 구문

```
GetBlock(blockID int64) map

```

* **blockID**

  블록 ID.

> **Return value**

  객체 배열을 반환합니다.

  * **id**
  
     블록 ID.

  * **time**
  
     블록 생성 타임스탬프.

  * **key_id**
  
     검증 노드의 계정 주소가 블록을 생성했습니다.

#### 예

```
var b map
b = GetBlock(1)
Println(b)
```



### DBInsert {#dbinsert}

지정된 테이블에 항목을 추가하고 항목 ID를 반환합니다.

#### 구문

```
DBInsert(table string, params map) int

```

* **tblname**

  테이블 이름.

* **params**

  키가 필드 이름이고 값이 삽입된 값인 개체의 배열입니다.

#### 예

```
DBInsert("mytable", {name: "John Smith", amount: 100})
```



### DBUpdate {#dbupdate}

지정된 테이블에서 지정된 항목 ID의 열 값을 변경합니다. 항목 ID가 테이블에 없으면 오류가 반환됩니다.

#### 구문

```
DBUpdate(tblname string, id int, params map)

```

* **tblname**

  테이블 이름.
* **Id**

  항목 ID.
* **params**

  필드 이름이 키이고 변경 후의 새 값이 값인 객체 배열입니다.

#### 예

```
DBUpdate("mytable", myid, {name: "John Smith", amount: 100})
```



### DBUpdateExt {#dbupdateext}

쿼리 조건과 일치하는 지정된 테이블의 열 값을 변경합니다.

#### 구문

```
DBUpdateExt(tblname string, where map, params map)

```

* **tblname**

  테이블 이름.

* **where**

  쿼리 조건.

  자세한 내용은 [DBFind](#dbfind)를 참조하세요.
  
* **params**

  키가 필드 이름이고 값이 변경 후 새 값인 개체 배열입니다.

#### 예

```
DBUpdateExt("mytable", {id: $key_id, ecosystem: $ecosystem_id}, {name: "John Smith", amount: 100})
```



### DelColumn {#delcolumn} 

레코드가 없는 지정된 테이블의 필드를 삭제합니다.

#### 구문

```
DelColumn(tblname string, column string)

```

* **tblname**

  테이블 이름.

* **column**

  삭제할 필드입니다.

```
DelColumn("mytable", "mycolumn")
```


### DelTable {#deltable}

레코드가 없는 지정된 테이블을 삭제합니다.

#### 구문

```
DelTable(tblname string)

```

* **tblname**

  테이블 이름.

#### 예

```
DelTable("mytable")
```



### Append {#append}

모든 유형의 val을 src 배열에 삽입합니다.

#### 구문

Append(src array, val anyType) array

* **src**

  원래 배열입니다.

* **val**

  삽입할 값입니다.

#### 예

```
var list array
list = Append(list, "new_val")
```



### Join {#join}

지정된 sep 구분자로 배열의 요소를 문자열로 결합합니다.

#### 구문

```
Join(in array, sep string) string

```

* **In**

  어레이 이름.
* **sep**

  분리 기호 (Separator).

#### 예

```
 var val string, myarr array
 myarr[0] = "first"
 myarr[1] = 10
 val = Join(myarr, ",")
```



### Split {#split}

sep 구분자를 사용하여 in 문자열을 요소로 분할하고 배열에 넣습니다.

#### 구문

```
Split(in string, sep string) array
```

* **In**

   끈.

*  **sep**

   분리 기호 (Separator).

#### 예

```
var myarr array
myarr = Split("first,second,third", ",")
```



### Len {#len}

지정된 배열의 요소 수를 반환합니다.

#### 구문

```
Len(val array) int
```

* **val**

   정렬.

#### 예

```
if Len(mylist) == 0 {
  ...
}
```



### Row {#row}

 이 경우 목록 매개변수를 지정하지 않아야 합니다. 배열 목록의 첫 번째 객체 배열을 반환합니다. 목록이 비어 있으면 빈 결과가 반환됩니다. 이 함수는 주로 [DBFind](#dbfind) 함수와 함께 사용됩니다. 이 기능을 사용할 때 매개변수를 지정할 수 없습니다.

#### 구문

```
 Row(list array) map
```

* **list**

   DBFind 함수에서 반환된 개체 배열입니다.

#### 예

```
 var ret map
 ret = DBFind("contracts").Columns("id,value").WhereId(10).Row()
 Println(ret)
```



### One {#one}

 배열 목록에서 첫 번째 객체 배열의 필드 값을 반환합니다. 목록 배열이 비어있으면 nil 이 반환됩니다. 이 함수는 주로 [DBFind](#dbfind) 함수와 함께 사용됩니다. 이 함수를 사용할 때는 매개변수를 지정할 수 없습니다.


#### 구문

```
One(list array, column string) string
```

*  **list**

  DBFind 함수에서 반환된 개체 배열입니다.

* **column**

  분야 명.

#### 예

```
var ret string
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
  Println(ret)
}
```



### GetMapKeys {#getmapkeys}

객체 배열의 키 배열을 반환합니다.

#### 구문

```
GetMapKeys(val map) array
```

* **val**

    객체 배열.

#### 예

```
var val map
var arr array
val["k1"] = "v1"
val["k2"] = "v2"
arr = GetMapKeys(val)
```



### SortedKeys {#sortedkeys}

객체 배열에서 정렬된 키 배열을 반환합니다.

#### 구문

```
SortedKeys(val map) array

```

* **val**

    객체 배열.

#### 예

```
var val map
var arr array
val["k2"] = "v2"
val["k1"] = "v1"
arr = SortedKeys(val)
```



### CallContract {#callcontract}

지정된 이름으로 스마트 계약을 호출합니다. 계약에 있는 데이터 섹션의 모든 매개변수는 개체 배열에 포함되어야 합니다. 이 함수는 지정된 계약에 의해 **$result** 변수에 할당된 값을 반환합니다.

#### 구문

```
CallContract(name string, params map)

```

* **name**

    호출되는 계약의 이름입니다.

* **params**

    계약 입력 데이터의 연관 배열입니다.

#### 예

```
var par map
par["Name"] = "My Name"
CallContract("MyContract", par)
```



### ContractAccess {#contractaccess}

실행 중인 계약의 이름이 매개변수에 나열된 이름 중 하나와 일치하는지 확인합니다. 일반적으로 테이블에 대한 계약 액세스를 제어하는 데 사용됩니다. 테이블 필드를 편집하거나 테이블의 권한 섹션에 새 열 필드를 삽입 및 추가할 때 권한 필드에 이 기능을 지정하십시오.

#### 구문

  

```
ContractAccess(name string, [name string]) bool
```

* **name**

    스마트 계약 이름.

#### 예

```
ContractAccess("MyContract")
ContractAccess("MyContract","SimpleContract")
```



### ContractConditions {#contractconditions}

지정된 이름으로 계약서의 조건 섹션을 호출합니다.

이 계약 유형의 경우 데이터 섹션이 비어 있어야 합니다. 조건 섹션이 오류 없이 실행되면 true를 반환합니다. 실행 중 오류가 발생하면 오류로 인해 상위 계약도 종료됩니다. 이 함수는 일반적으로 테이블에 대한 계약의 액세스를 제어하는 데 사용되며 시스템 테이블을 편집할 때 권한 필드에서 호출할 수 있습니다.

#### 구문

```
ContractConditions(name string, [name string]) bool

```

* **name**

   계약명.

#### 예

```
ContractConditions("MainCondition")
```



### EvalCondition {#evalcondition}

tablename 테이블에서 'name' 필드가 있는 레코드의 condfield 필드 값을 가져오고 condfield 필드 값의 조건을 확인합니다.

#### 구문

```
EvalCondition(tablename string, name string, condfield string)

```

* **tablename**

    테이블 이름.

*  **name**

    'name' 필드로 값을 쿼리합니다.

*  **condfield**

    조건을 확인해야 하는 필드의 이름입니다.

#### 예

```
EvalCondition(`menu`, $Name, `conditions`)
```



### GetContractById {#getcontractbyid}

계약 ID로 계약 이름을 반환합니다. 계약서를 찾을 수 없으면 빈 문자열이 반환됩니다.

#### 구문

```
GetContractById(id int) string

```

* **Id**

  계약 테이블 계약의 계약 ID입니다.

#### 예

```
var name string
name = GetContractById($IdContract)
```



### GetContractByName {#getcontractbyname}

이 함수는 계약 이름으로 계약 ID를 반환합니다. 계약서를 찾을 수 없으면 0이 반환됩니다.

#### 구문

```
GetContractByName(name string) int
```

* **name**

    계약 테이블 계약의 계약 이름입니다.

#### 예

```
var id int
id = GetContractByName(`NewBlock`)
```



### RoleAccess {#roleaccess}

계약 호출자의 역할 ID가 매개변수에 지정된 ID 중 하나와 일치하는지 확인합니다.

이 기능을 사용하여 테이블 및 기타 데이터에 대한 계약 액세스를 제어할 수 있습니다.

#### 구문


```
RoleAccess(id int, [id int]) bool
```

* **Id**

    역할 ID.

#### 예

```
RoleAccess(1)
RoleAccess(1, 3)
```



### TransactionInfo {#transactioninfo}

지정된 해시 값으로 트랜잭션을 쿼리하고 실행된 계약 및 해당 매개변수에 대한 정보를 반환합니다.

#### 구문

```
TransactionInfo(hash: string)
```

  * **hash**

    16진수 문자열 형식의 트랜잭션 해시입니다.
  
> **Return value**

  이 함수는 JSON 형식의 문자열을 반환합니다.

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

  

  *   **contract**

      계약명.
  
  *   **params**

      계약 매개변수에 전달된 데이터입니다.

  *   **block**

      트랜잭션을 처리한 블록의 ID입니다.

#### 예

```
var out map
out = JSONDecode(TransactionInfo(hash))
```



### Throw {#throw}

  예외 유형의 오류를 생성합니다.

#### 구문

  

```
Throw(ErrorId string, ErrDescription string)
```

* **ErrorId**

    오류 식별자.

* **ErrDescription**

    오류 설명.

>  **Return value**

  이 유형의 거래 결과 형식은 다음과 같습니다.

```
{"type":"exception","error":"Error description","id":"Error ID"}
```

#### 예

```
Throw("Problem", "There is a problem")
```



### ValidateCondition {#validatecondition}

  조건 매개변수로 지정된 조건을 컴파일하려고 시도합니다. 컴파일 과정에서 오류가 발생하면 오류가 발생하고 호출된 계약이 종료됩니다. 이 기능은 조건부 형식의 정확성을 확인하도록 설계되었습니다.

#### 구문

```
ValidateCondition(condition string, state int)
```

* **condition**

    확인해야 하는 조건부 형식입니다.

* **state**

    생태계 ID. 전역 조건을 확인하는 경우 0으로 지정하십시오.

#### 예

```
ValidateCondition(`ContractAccess("@1MyContract")`, 1)
```



### AddressToId {#addresstoid}

지갑 주소로 해당 계정 주소를 반환합니다. 유효하지 않은 주소를 지정하면 "`0`" 이 반환됩니다.

#### 구문

```
AddressToId(address string) int

```

*  Address

    `XXXX-...-XXXX` 형식 또는 숫자 형식의 지갑 주소입니다.

#### 예

```
wallet = AddressToId($Recipient)
```



### IdToAddress {#idtoaddress}

계정 주소별로 해당 지갑 주소를 반환합니다. 유효하지 않은 주소를 지정하면 유효하지 않은 주소 `invalid` 가 반환됩니다.

#### 구문

```
IdToAddress(id int) string

```

*  **Id**

    계정 주소.

#### 예

```
$address = IdToAddress($id)
```



### PubToID {#pubtoid}

계정 주소는 16진수 형식의 공개 키로 반환됩니다.

#### 구문

```
PubToID(hexkey string) int

```

*  **hexkey**

    16진수 형식의 공개 키입니다.

#### 예

  

```
var wallet int
wallet = PubToID("04fa5e78.....34abd6")
```



### DecodeBase64 {#decodebase64}

base64 형식을 지정하여 문자열을 반환합니다.

#### 구문

```
DecodeBase64(input string) string

```

*  **Input**

    base64 형식의 문자열입니다.

#### 예

```
val = DecodeBase64(mybase64)
```



### EncodeBase64 {#encodebase64}

문자열을 지정하여 base64 형식의 문자열을 반환합니다.

#### 구문

```
EncodeBase64(input string) string

```

*  **Input**

    인코딩할 문자열입니다.

#### 예

 

```
var base64str string
base64str = EncodeBase64("my text")
```



### Float {#float}

정수 또는 문자열을 부동 숫자로 변환합니다.

#### 구문

```
Float(val int|string) float

```

* **val**

    정수 또는 문자열.

#### 예

```
val = Float("567.989") + Float(232)
```



### HexToBytes {#hextobytes}

16진수 형식의 문자열을 바이트 유형 바이트로 변환합니다.

#### 구문

```
  HexToBytes(hexdata string) bytes

```

*  **hexdata**

    16진수 형식의 문자열입니다.

#### 예

```
var val bytes
val = HexToBytes("34fe4501a4d80094")
```



### FormatMoney {#formatmoney}

exp / 10 ^ 숫자의 문자열 값을 반환합니다.

#### 구문

  

```
FormatMoney(exp string, digit int) string
```

* **Exp**

    문자열 형식의 숫자입니다.

* **digit**

    `Exp/10^digit` 표현식에서 10의 지수(양수 또는 음수)입니다. 양수 값은 소수 자릿수를 결정합니다.

#### 예

```
  s = FormatMoney("78236475917384", 0)
```



### Random {#random}

```
Returns a random number between min and max (min <= result <max). Both min and max must be positive numbers.
```

#### 구문

 

```
Random(min int, max int) int
```

* **min**

    랜덤 숫자 중 최소값을 반환합니다.

* **max**

    랜덤 숫자의 상한선입니다. 생성된 랜덤 숫자는 이 값보다 작을 것입니다.


#### 예

```
i = Random(10,5000)
```



### Int {#int}

문자열 형식의 값을 정수로 변환합니다.

#### 구문

```
Int(val string) int
```

* **val**

    문자열 형식의 숫자입니다.

#### 예

```
mystr = "-37763499007332"
val = Int(mystr)
```



### Hash {#hash}

  시스템 암호화 라이브러리 crypto에 의해 생성된 지정된 바이트 배열 또는 문자열의 해시를 반환합니다.

#### 구문

 

```
Hash(val interface{}) string, error
```

* **val**

    문자열 또는 바이트 배열.

#### 예

```
var hash string
hash = Hash("Test message")
```



### Sha256 {#sha256}

  지정된 문자열의 SHA256 해시를 반환합니다.

#### 구문

 

```
Sha256(val string) string
```

* **val**

    문자열에는 Sha256 해시 작업이 필요합니다.

#### 예

```
var sha string
sha = Sha256("Test message")
```



### Str {#str}

정수 int 또는 float float 숫자를 문자열로 변환합니다.

#### 구문

  

```
Str(val int|float) string
```

* **val**

    정수 또는 실수.

#### 예

```
myfloat = 5.678
val = Str(myfloat)
```



### JSONEncode {#jsonencode}

숫자, 문자열 또는 배열을 JSON 형식의 문자열로 변환합니다.

#### 구문

```
JSONEncode(src int|float|string|map|array) string

```

* **src**

    변환할 데이터.

#### 예

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncode(mydata)
```



### JSONEncodeIndent {#jsonencodeindent}

지정된 들여쓰기를 사용하여 숫자, 문자열 또는 배열을 JSON 형식의 문자열로 변환합니다.

#### 구문

```
JSONEncodeIndent(src int|float|string|map|array, indent string) string

```

* **src**

    변환할 데이터.

* **Indent**

    문자열은 들여쓰기로 사용됩니다.

#### 예

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncodeIndent(mydata, "\t")
```



### JSONDecode {#jsondecode}

JSON 형식의 문자열을 숫자, 문자열 또는 배열로 변환합니다.

#### 구문

```
JSONDecode(src string) int|float|string|map|array

```

*  **src**

    JSON 형식의 데이터를 포함하는 문자열입니다.

#### 예

```
var mydata map
mydata = JSONDecode(`{"name": "John Smith", "company": "Smith's company"}`)
```



### HasPrefix {#hasprefix}

문자열이 지정된 문자열로 시작하는지 확인합니다.

#### 구문

  

```
HasPrefix(s string, prefix string) bool
```

* **s**

    문자열.

* **prefix**

    확인할 접두사입니다.

> **Return value**

  문자열이 지정된 문자열로 시작하면 `true`가 반환됩니다.

#### 예

```
if HasPrefix($Name, `my`) {
  ...
}
```



### Contains {#contains}

문자열에 지정된 하위 문자열이 포함되어 있는지 확인합니다.

#### 구문

 

```
Contains(s string, substr string) bool
```

* **s**

    문자열.

* **substr**

    하위 문자열.

> **Return value**

  문자열에 하위 문자열이 포함되어 있으면 `true` 를 반환합니다.

#### 예

```
if Contains($Name, `my`) {
  ...
}
```



### Replace {#replace}

문자열에서 old(이전 문자열)를 new(새 문자열)로 바꿉니다.

#### 구문

```
Replace(s string, old string, new string) string

```

* **s**

    원래 문자열입니다.

* **Old**

    바꿀 하위 문자열입니다.

* **new**

    새 문자열입니다.

#### 예

```
s = Replace($Name, `me`, `you`)
```



### Size {#size}

지정된 문자열의 바이트 수를 반환합니다.

#### 구문

```
Size(val string) int

```

* **val**

    문자열.

#### 예

```
var len int
len = Size($Name)
```



### Sprintf {#sprintf}

이 함수는 지정된 템플릿과 매개변수를 사용하여 문자열을 생성합니다.

사용 가능한 와일드카드:
* `%d` (정수)
* `%s` (문자열)
* `%f` (부동소수점)
* `%v` (임의의 타입)

#### 구문

```
Sprintf(pattern string, val ...) string

```

* **pattern**

    문자열 템플릿.

#### 예

```
out = Sprintf("%s=%d", mypar, 6448)
```



### Substr {#substr}

지정된 문자열에서 offset (기본값으로부터 0 으로 계산)부터 시작하여 최대 길이 length로 얻은 부분 문자열을 반환합니다.

만약 offset 또는 length 가 0보다 작거나, offset이 문자열 길이보다 큰 경우 빈 문자열이 반환됩니다.

만약 offset 과 length의 합이 문자열의 크기보다 큰 경우, offset부터 문자열의 끝까지의 부분 문자열이 반환됩니다.


#### 구문

```
Substr(s string, offset int, length int) string

```

* **val**

    문자열.

* **Offset**

    오프셋 (Offset).

* **length**

    하위 문자열의 길이입니다.

#### 예

```
var s string
s = Substr($Name, 1, 10)
```



### ToLower {#tolower}

지정된 문자열을 소문자로 반환합니다.

#### 구문

```
ToLower(val string) string

```

* **val**

    문자열.

#### 예

```
val = ToLower(val)
```



### ToUpper {#toupper}

지정된 문자열을 대문자로 반환합니다.

#### 구문

```
ToUpper(val string) string

```

* **val**

    문자열.

#### 예

```
val = ToUpper(val)
```



### TrimSpace {#trimspace}

지정된 문자열의 선행 및 후행 공백, 탭 및 개행을 삭제합니다.

#### 구문

```
TrimSpace(val string) string

```

* **val**

    문자열.

#### 예

 

```
var val string
val = TrimSpace(" mystr ")
```



### Floor {#floor}

지정된 숫자, 부동 숫자 및 문자열보다 작거나 같은 가장 큰 정수 값을 반환합니다.

#### 구문

```
Floor(x float|int|string) int
```

* **x**

    숫자, 부동 숫자 및 문자열입니다.

#### 예

```
val = Floor(5.6) // returns 5
```



### Log {#log}

지정된 숫자, 부동 숫자 및 문자열의 자연 로그를 반환합니다.

#### 구문

```
Log(x float|int|string) float

```

*  **x**

    숫자, 부동 숫자 및 문자열입니다.

#### 예

```
val = Log(10)
```



### Log10 {#log10}

지정된 숫자, 실수 숫자 및 문자열의 밑이 10인 로그를 반환합니다.

#### 구문

```
Log10(x float|int|string) float

```

* **x**

    숫자, 부동 숫자 및 문자열입니다.

#### 예

 

```
val = Log10(100)
```



### Pow {#pow}

지정된 기준을 지정된 거듭제곱(xy)으로 반환합니다.

#### 구문

```
Pow(x float|int|string, y float|int|string) float

```

* **x**

    기본 번호.

* **y**

    멱지수.

#### 예

```
val = Pow(2, 3)

```

### Round {#round}

가장 가까운 정수로 반올림된 지정된 숫자 값을 반환합니다.

#### 구문

```
Round(x float|int|string) int

```

* **x**

    숫자.

#### 예

```
val = Round(5.6)
```

### Sqrt {#sqrt}

지정된 숫자의 제곱근을 반환합니다.

```
Sqrt(x float|int|string) float

```

* **x**

    숫자.

#### 예

```
val = Sqrt(225)
```



### StringToBytes {#stringtobytes}

문자열을 바이트로 변환합니다.

#### 구문

```
StringToBytes(src string) bytes

```

* **src**

    문자열.

#### 예

 

```
var b bytes
b = StringToBytes("my string")
```



### BytesToString {#bytestostring}

바이트를 문자열로 변환합니다.

#### 구문

```
BytesToString(src bytes) string

```

* **src**

    바이트 (Byte).

#### 예

```
var s string
s = BytesToString($Bytes)
```



### SysParamString {#sysparamstring}

지정된 플랫폼 매개변수의 값을 반환합니다.

#### 구문

```
SysParamString(name string) string

```

* **name**

    매개변수 이름.

#### 예

```
url = SysParamString(`blockchain_url`)
```



### SysParamInt {#sysparamint}

지정된 플랫폼 매개변수의 값을 숫자 형식으로 반환합니다.

#### 구문

```
SysParamInt(name string) int

```

* **name**

    매개변수 이름.

#### 예

```
maxcol = SysParam(`max_columns`)
```



### DBUpdateSysParam {#dbupdatesysparam}

플랫폼 매개변수의 값과 조건을 업데이트합니다. 값이나 조건을 변경할 필요가 없다면 해당 매개변수에 빈 문자열을 지정하십시오.

#### 구문

```
DBUpdateSysParam(name, value, conditions string)

```

* **name**

    매개변수 이름.

* **value**

    매개변수의 새 값입니다.

* **conditions**

    매개변수 업데이트를 위한 새로운 조건.

#### 예

```
DBUpdateSysParam(`fuel_rate`, `400000000000`, ``)

```

### UpdateNotifications {#updatenotifications}

데이터베이스에서 지정된 키의 알림 목록을 가져와서 얻은 알림을 Centrifugo 로 보냅니다.

#### 구문

```
UpdateNotifications(ecosystemID int, keys int...)

```

* **EcosystemID** 

    생태계 ID.

* **key**

    쉼표로 구분된 계정 주소 목록입니다. 또는 배열을 사용하여 계정 주소 목록을 지정할 수 있습니다.

#### 예

```
UpdateNotifications($ecosystem_id, $key_id, 23345355454, 35545454554)
UpdateNotifications(1, [$key_id, 23345355454, 35545454554])
```



### UpdateRolesNotifications {#updaterolesnotifications}

데이터베이스에서 지정된 역할 ID의 모든 계정 주소에 대한 알림 목록을 획득하고 획득한 알림을 Centrifugo 로 보냅니다.

#### 구문

```
UpdateRolesNotifications(ecosystemID int, roles int ...)

```

*  **EcosystemID**

    생태계 ID.

*  **roles**

    쉼표로 구분된 역할 ID 목록입니다. 또는 배열을 사용하여 역할 ID 목록을 지정할 수 있습니다.

#### 예

```
UpdateRolesNotifications(1, 1, 2)

```

### HTTPRequest {#httprequest}

지정된 주소로 HTTP 요청을 보냅니다.

> 참고

> 이 기능은 CLB 계약에서만 사용할 수 있습니다.

#### 구문

```
HTTPRequest(url string, method string, heads map, pars map) string

```

* **Url**

    요청을 보낼 주소입니다.

* **method**

    요청 유형(GET 또는 POST).

* **heads**

    요청 헤더, 객체의 배열입니다.

* **pars**

    매개변수를 요청합니다.

#### 예

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

이 함수는 HTTPRequest 함수와 유사하지만 POST 요청을 보내고 요청 매개변수는 문자열입니다.

> 참고

> 이 기능은 CLB 계약에서만 사용할 수 있습니다.

#### 구문

```
HTTPPostJSON(url string, heads map, pars string) string

```

* **Url**

    요청을 보낼 주소입니다.

* **heads**

    요청 헤더, 객체의 배열입니다.

* **pars**

    파라미터를 JSON 문자열로 요청합니다.

#### Example

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

블록의 생성 시간을 SQL 형식으로 반환합니다.

#### Syntax

```
BlockTime()
```



#### 예

```
var mytime string
mytime = BlockTime()
DBInsert("mytable", myid, {time: mytime})
```



### DateTime {#datetime}

타임스탬프 unixtime을 YYYY-MM-DD HH:MI:SS 형식의 문자열로 변환합니다.

#### 구문

```
DateTime(unixtime int) string
```



#### 예

```
DateTime(1532325250)

```

### UnixDateTime {#unixdatetime}

YYYY-MM-DD HH:MI:SS 형식의 문자열을 타임스탬프 unixtime으로 변환합니다.

#### 구문

```
UnixDateTime(datetime string) int
```



#### 예

```
UnixDateTime("2018-07-20 14:23:10")
```



### CreateOBS {#createobs}

하위 CLB를 생성합니다.

이 기능은 마스터 CLB 모드에서만 사용할 수 있습니다.

#### 구문

```
CreateOBS(OBSName string, DBUser string, DBPassword string, OBSAPIPort int)

```

* **OBSName**

    CLB 이름.

* **DBUser**

    데이터베이스의 역할 이름입니다.

*  **DBPassword**

    역할의 암호입니다.

* **OBSAPIPort**

    API 요청의 포트입니다.

#### 예

```
CreateOBS("obsname", "obsuser", "obspwd", 8095)

```

### GetOBSList {#getobslist}

하위 CLB 목록을 반환합니다.

이 기능은 마스터 CLB 모드에서만 사용할 수 있습니다.

#### 구문

```
GetOBSList()

```

> **Return value**

키가 CLB 이름이고 값이 프로세스 상태인 개체 배열입니다.

### RunOBS {#runobs}

CLB를 실행하는 프로세스.

이 기능은 마스터 CLB 모드에서만 사용할 수 있습니다.

#### 구문

```
RunOBS(OBSName string)

```

* **OBSName**

  CLB 이름.

  영문과 숫자만 가능하며 공백 기호는 사용할 수 없습니다.

### StopOBS {#stopobs}

지정된 CLB의 프로세스를 중지합니다.

이 기능은 마스터 CLB 모드에서만 사용할 수 있습니다.

#### 구문

```
StopOBS(OBSName string)

```

* **OBSName**

  CLB 이름.

  영문과 숫자만 가능하며 공백 기호는 사용할 수 없습니다.

### RemoveOBS {#removeobs}

지정된 CLB의 프로세스를 삭제합니다.

이 기능은 마스터 CLB 모드에서만 사용할 수 있습니다.

#### 구문

```
RemoveOBS(OBSName string)

```

* **OBSName**

CLB 이름.

영문과 숫자만 가능하며 공백 기호는 사용할 수 없습니다.

## 시스템 계약 (System Contracts) {#system-contracts}

시스템 스마트 계약은 IBax 블록체인 플랫폼이 실행될 때 기본적으로 생성됩니다. 이 모든 계약은 첫 번째 생태계에서 생성되었습니다. 이것이 다른 생태계에서 호출할 때 `@1NewContract`와 같이 전체 이름을 지정해야 하는 이유입니다.

### NewEcosystem {#newecosystem}

이 스마트 계약은 새로운 생태계를 생성합니다. 생성된 생태계의 ID를 얻으려면 [txstatus](../reference/api2.md#txstatus)에서 반환된 result 필드를 인용해야 합니다.

매개변수:
  * **Name** string - 생태계의 이름. 이후에 변경할 수 있습니다.

### EditEcosystemName {#editecosystemname}

첫 번째 생태계에만 존재하는 1_ecosystems 테이블의 생태계 이름을 변경합니다.

매개변수:
  * **EcosystemID** int - 생태계 ID의 이름을 변경합니다.
  * **NewName** string - 생태계의 새 이름.


### NewContract {#newcontract}

현재 생태계에 새로운 스마트 계약을 생성합니다.

매개변수:
  * **ApplicationId** int - 새로운 계약이 속하는 응용 프로그램;
  * **Value** string - 계약 소스 코드. 상위 레벨에는 하나의 계약만 있어야 합니다.
  * **Conditions** string - 계약의 조건을 변경합니다.
  * **TokenEcosystem** int "optional" - 생태계 ID입니다. 계약이 활성화될 때 거래에 사용될 토큰을 결정합니다.

### EditContract {#editcontract}

현재 생태계에서 계약을 편집합니다.

매개변수:
  * **Id** int - 변경할 계약 ID;
  * **Value** string "optional" - 계약의 소스 코드;
  * **Conditions** string "optional" - 계약의 조건을 변경합니다.

### BindWallet {#bindwallet}

현재 생태계에서 스마트 계약을 지갑 주소에 바인딩합니다. 계약과 바인딩된 후, 계약 실행 수수료는 이 주소에서 지불됩니다.

매개변수:
  * **Id** int - 바인딩할 계약 ID.
  * **WalletId** string "optional" - 계약에 바인딩할 지갑 주소.

### UnbindWallet {#unbindwallet}

현재 생태계에서 계약과 지갑 주소의 바인딩을 해제합니다. 계약에 바인딩된 주소만 해제할 수 있습니다. 계약을 바인딩 해제한 후에는 계약을 실행하는 사용자가 실행 수수료를 지불합니다.

매개변수:
  * **Id** int - 바인딩을 해제할 계약의 ID.


### NewParameter {#newparameter}

현재 생태계에 새로운 생태계 매개변수가 추가되었습니다.

매개변수:
  * **Name** string - 매개변수 이름;
  * **Value** string - 매개변수 값;
  * **Conditions** string - 매개변수를 변경하기 위한 조건.

### EditParameter {#editparameter}

현재 생태계에서 기존 생태계 매개변수를 변경합니다.

매개변수:
  * **Name** string - 변경할 매개변수의 이름;
  * **Value** string - 새로운 매개변수 값;
  * **Conditions** string - 매개변수를 변경하기 위한 새로운 조건.

### NewMenu {#newmenu}

현재 생태계에 새로운 메뉴를 추가합니다.

매개변수:
  * **Name** string - 메뉴 이름;
  * **Value** string - 메뉴 소스 코드;
  * **Title** string "optional" - 메뉴 제목;
  * **Conditions** string - 메뉴를 변경하기 위한 조건.


### EditMenu {#editmenu}

현재 생태계에서 기존 메뉴를 변경합니다.

매개변수:
  * **Id** int - 변경할 메뉴의 ID;
  * **Value** string "optional" - 새로운 메뉴의 소스 코드;
  * **Title** string "optional" - 새로운 메뉴의 제목;
  * **Conditions** string "optional" - 메뉴를 변경하기 위한 새로운 조건.

### AppendMenu {#appendmenu}

현재 생태계에 기존 메뉴에 소스 코드 내용을 추가합니다.

매개변수:
  * **Id** int - 메뉴의 ID;
  * **Value** string - 추가할 소스 코드.


### NewPage {#newpage}

현재 생태계에 새로운 페이지를 추가합니다.

매개변수:
  * **Name** string - 페이지 이름;
  * **Value** string - 페이지의 소스 코드;
  * **Menu** string - 페이지와 관련된 메뉴 이름;
  * **Conditions** string - 페이지를 변경하기 위한 조건;
  * **ValidateCount** int "optional" - 페이지 유효성 검사에 필요한 노드 수. 이 매개변수를 지정하지 않으면 min_page_validate_count 생태계 매개변수 값이 사용됩니다. 이 매개변수의 값은 min_page_validate_count보다 작거나 max_page_validate_count보다 크지 않아야 합니다.

  * **ValidateMode** int "optional" - 페이지 유효성 검사 모드. 이 매개변수의 값이 0이면 페이지가 로드될 때 확인되고, 값이 1이면 페이지가 로드되거나 페이지를 떠날 때 확인됩니다.


### EditPage {#editpage}

현재 생태계에서 기존 페이지를 변경합니다.

매개변수:
  * **Id** int - 변경할 페이지의 ID;
  * **Value** string "optional" - 새로운 페이지의 소스 코드;
  * **Menu** string "optional" - 페이지와 관련된 새로운 메뉴 이름;
  * **Conditions** string "optional" - 페이지를 변경하기 위한 새로운 조건;
  * **ValidateCount** int "optional" - 페이지 유효성 검사에 필요한 노드 수. 이 매개변수를 지정하지 않으면 min_page_validate_count 생태계 매개변수 값이 사용됩니다. 이 매개변수의 값은 min_page_validate_count보다 작거나 max_page_validate_count보다 크지 않아야 합니다.
  * **ValidateMode** int "optional" - 페이지 유효성 검사 모드. 이 매개변수의 값이 0이면 페이지가 로드될 때 확인되고, 값이 1이면 페이지가 로드되거나 페이지를 떠날 때 확인됩니다.


### AppendPage {#appendpage}

기존 페이지에 소스 내용을 추가합니다.

매개변수:
* **Id** int - 변경할 페이지의 ID;
* **Value** string - 추가할 소스 코드.

### NewBlock {#newblock}

현재 생태계에 페이지 모듈을 추가합니다.

매개변수:
  * **Name** string - 모듈의 이름;
  * **Value** string - 모듈의 소스 코드;
  * **Conditions** string - 모듈을 변경하기 위한 조건.

### EditBlock {#editblock}

현재 생태계에서 기존 페이지 모듈을 변경합니다.

매개변수:
  * **Id** int - 변경할 모듈의 ID;
  * **Value** string - 새로운 모듈의 소스 코드;
  * **Conditions** string - 모듈을 변경하기 위한 새로운 조건.


### NewTable {#newtable}

현재 생태계에 새로운 테이블을 추가합니다.

매개변수:
  * **ApplicationId** int - 관련 테이블의 애플리케이션 ID;
  * **Name** string - 새로운 테이블의 이름;
  * **Columns** string - 필드 배열을 JSON 형식으로 나타낸 문자열 `[{"name":"...", "type":"...","index": "0", "conditions":".. ."},...]`, 여기서
    * **name** - 필드 이름, 라틴 문자만 사용 가능;
    * **type** - 데이터 유형 `varchar,bytea,number,datetime,money,text,double,character`;
    * **index** - 비 기본 키 필드는 `0`, 기본 키는 `1`;
    * **conditions** - 필드 데이터를 변경하기 위한 조건, JSON 형식으로 "`{"update":"ContractConditions(MainCondition)", "read":"ContractConditions(MainCondition)"}`"와 같이 지정해야 합니다.
  * **Permissions** string - JSON 형식의 접근 권한 `{"insert": "...", "new_column": "...", "update": "...", "read": ".. ."}`.
    * **insert** - 항목 삽입 권한;
    * **new_column** - 새로운 열 추가 권한;
    * **update** - 항목 데이터 변경 권한;
    * **read** - 항목 데이터 읽기 권한.

### EditTable {#edittable}

현재 생태계의 테이블의 접근 권한을 변경합니다.

매개변수:
  * **Name** string - 테이블 이름;
  * **InsertPerm** string - 테이블에 항목을 삽입하는 권한;
  * **UpdatePerm** string - 테이블의 항목을 업데이트하는 권한;
  * **ReadPerm** string - 테이블의 항목을 읽는 권한;
  * **NewColumnPerm** string - 새로운 열을 생성하는 권한;

### NewColumn {#newcolumn}

현재 생태계의 테이블에 새로운 필드를 추가합니다.

매개변수:
  * **TableName** string - 테이블 이름;
  * **Name** string - 라틴 문자로 된 필드 이름;
  * **Type** string - 데이터 유형 `varchar,bytea,number,money,datetime,text,double,character`;
  * **UpdatePerm** string - 열 값 변경 권한;
  * **ReadPerm** string - 열 값 읽기 권한.


### EditColumn {#editcolumn}

현재 생태계에서 지정된 테이블 필드의 권한을 변경합니다.

매개변수:
  * **TableName** string - 테이블 이름;
  * **Name** string - 변경할 라틴 문자로 된 필드 이름;
  * **UpdatePerm** string - 열 값 변경을 위한 새로운 권한;
  * **ReadPerm** string - 열 값 읽기를 위한 새로운 권한.

### NewLang {#newlang}

현재 생태계에 언어 리소스를 추가하며, 이를 위한 권한은 생태계 매개변수의 changing_language로 설정됩니다.

매개변수:

  * **Name** string - 라틴 문자로 된 언어 리소스 이름;
  * **Trans** string - JSON 형식의 문자열, 키로는 두 글자로 된 언어 코드를 사용하고 값으로는 번역된 문자열을 사용합니다. 예를 들어 `{"en": "영어 텍스트", "kr": "중국어 텍스트"}`.


### EditLang {#editlang}

현재 생태계의 언어 자원을 변경하며, 이를 위한 권한은 생태계 매개변수의 changing_language 매개변수에 설정됩니다.

매개변수:

  * **Id** int - 언어 리소스 ID.
  * **Trans** - JSON 형식의 문자열, 키로는 두 글자로 된 언어 코드를 사용하고 값으로는 번역된 문자열을 사용합니다. 예를 들어 `{"en": "영어 텍스트", "kr": "중국어 텍스트"}`.

### Import {#import}

현재 생태계로 애플리케이션을 가져오고, [ImportUpload](#importupload) 계약에서로드된 데이터를 가져옵니다.

매개변수:

  * **Data** string - 생태계에서 내보낸 파일에서 가져온 텍스트 형식의 데이터입니다.

### ImportUpload {#importupload}

외부 애플리케이션 파일을 현재 생태계의 buffer_data 테이블로로드하여 후속 가져오기에 사용합니다.

매개변수:
  * **InputFile** file - 현재 생태계의 buffer_data 테이블에 기록된 파일입니다.


### NewAppParam {#newappparam}

현재 생태계에 새로운 애플리케이션 매개변수를 추가합니다.

매개변수:
  * **ApplicationId** int - 애플리케이션 ID;
  * **Name** string - 매개변수 이름;
  * **Value** string - 매개변수 값;
  * **Conditions** string - 매개변수를 변경할 수 있는 권한.

### EditAppParam {#editappparam}

현재 생태계에서 기존의 애플리케이션 매개변수를 변경합니다.

매개변수:
  * **Id** int - 애플리케이션 매개변수 ID;
  * **Value** string "optional" - 새로운 매개변수 값;
  * **Conditions** string "optional" - 매개변수를 변경할 권한.

### NewDelayedContract {#newdelayedcontract}

지연 계약 스케줄러 데몬에 새로운 작업을 추가합니다.

지연된 계약 스케줄러는 현재 생성된 블록에서 필요한 계약을 실행합니다.

매개변수:
  * **Contract** string - 계약 이름;
  * **EveryBlock** int - 지정된 블록 수마다 계약이 실행됩니다;
  * **Conditions** string - 작업을 변경할 수 있는 권한;
  * **BlockID** int "optional" - 계약을 실행해야 하는 블록 ID입니다. 지정하지 않으면 "현재 블록 ID" + EveryBlock으로 자동 계산됩니다;
  * **Limit** int "optional" - 작업 실행의 최대 횟수입니다. 지정하지 않으면 작업은 무제한으로 실행됩니다.


### EditDelayedContract {#editdelayedcontract}

지연된 계약 스케줄러 데몬에서 작업을 변경합니다.

매개변수:
  * **Id** int - 작업 ID;
  * **Contract** string - 계약 이름;
  * **EveryBlock** int - 지정된 블록 수마다 계약이 실행됩니다;
  * **Conditions** string - 작업을 변경할 수 있는 권한;
  * **BlockID** int "optional" - 계약을 실행해야 하는 블록 ID입니다. 지정하지 않으면 "현재 블록 ID" + EveryBlock으로 자동 계산됩니다;
  * **Limit** int "optional" - 작업 실행의 최대 횟수입니다. 지정하지 않으면 작업은 무제한으로 실행됩니다.
  * **Deleted** int "optional" - 작업 전환. 값이 `1`인 경우 작업이 비활성화됩니다. 값이 `0`인 경우 작업이 활성화됩니다.

### UploadBinary {#uploadbinary}

X_binaries 테이블에 정적 파일을 추가하거나 덮어씁니다. HTTP API를 통해 계약을 호출할 때, 요청은 `multipart/form-data` 형식이어야 하며, DataMimeType 매개변수는 폼 데이터와 함께 사용됩니다.

매개변수:
  * **Name** string - 정적 파일의 이름;
  * **Data** bytes - 정적 파일의 내용;
  * **DataMimeType** string "optional" - mime-type 형식의 정적 파일;
  * **ApplicationId** int - X_binaries 테이블과 관련된 애플리케이션 ID입니다.

  DataMimeType 매개변수를 전달하지 않으면 기본적으로 `application/octet-stream` 형식을 사용합니다.
