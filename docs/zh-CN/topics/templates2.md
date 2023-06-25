# 模版语言 {#template-language}

<!-- TOC -->

- [页面构建](#page-construction)
    - [模版引擎](#template-engine)
    - [创建页面](#create-pages)
        - [可视化页面设计器](#visual-page-designer)
        - [样式使用](#applicable-styles)
        - [页面模块](#page-module)
        - [多语言资源编辑器](#language-resource-editor)
- [Logicor 模版语言](#logicor-template-language)
    - [Logicor 概述](#Logicor-overview)
- [Logicor 函数功能分类](#logicor-function-classification)
    - [变量操作](#operations-on-variables)
    - [导航操作](#navigational-operations)
    - [数据操作](#data-manipulation)
    - [显示数据](#data-presentation)
    - [接收数据](#accepting-of-data)
    - [数据格式化元素](#data-formatting-elements)
    - [表单元素](#form-elements)
    - [代码片段操作](#operations-on-code-blocks)
- [Logicor 函数参考](#logicor-function-references)
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
- [适配移动设备的应用程序样式](#app-styles-for-mobile-devices)
    - [排版](#layout)
        - [标题](#title)
        - [强调类类名](#strong-class-names)
        - [颜色](#color)
    - [网格](#grid)
    - [面板](#panel)
    - [表单](#form-app)
    - [按钮](#button-app)
    - [图标](#icon)

<!-- /TOC -->

## 页面构建 {#page-construction}

Weaver 的集成开发环境使用 *JavaScript React库*创建，包括页面编辑器和可视化页面设计器。
页面是应用程序的基本组成部分，它提供从数据库表中检索和显示数据，创建用于接收用户输入数据的表单，将数据传递给合约以及在应用程序页面之间导航。
页面和合约一样，都存储在区块链中，这可以确保在软件客户端中加载它们时防止篡改。

### 模版引擎 {#template-engine}

页面元素（页面和菜单）是由开发者在 Weaver 的页面编辑器中使用模版语言在验证节点的 *模版引擎*中形成的。
所有页面均使用由 IBAX区块链平台 开发团队开发的 Logicor 语言构建。使用 *content/\...* API命令从网络上的节点请求页面。
模版引擎作为对此类请求的回复发送的内容不是HTML页面，而是由HTML标记组成的JSON代码，这些标记根据模版结构形成树模版引擎对此类请求的响应发送的不是HTML页面，
而是由HTML标记组成的JSON代码，这些标记根据模版结构形成树。如果想要测试模版引擎可参考[content](../reference/api2.md#content) API接口。

### 创建页面 {#create-pages}

可以使用页面编辑器创建和编辑页面，该编辑器可在 Weaver 的管理工具的**页面Pages** 部分中找到。该编辑器提供：

-   编写页面代码，突出显示 Logicor 模版语言的关键字；
-   选择菜单，这些菜单将显示在页面上；
-   编辑菜单页面；
-   配置更改页面的权限，通过在 *ContractConditions* 函数中指定具有权限的合约名称，或通过在 *更改条件Change conditions* 中直接指定访问权限；
-   启动可视化页面设计器；
-   页面预览。

#### 可视化页面设计器 {#visual-page-designer}

可视化页面设计器可以创建页面设计而无需借助 Logicor语言中的界面代码。
视图化Designer可以使用拖放操作在页面上设置表单元素和文本的位置，以及配置页面块大小。
视图化提供了一组用于显示标准数据模型的即用型块：带有标题，表单和信息面板。在视图化中创建页面后，可在页面编辑器中编写接收数据和条件结构的程序逻辑。
未来我们计划创建一个更加完整的可视化页面设计器。

#### 样式使用 {#applicable-styles}

默认使用Angular的Bootstrap Angle类样式风格显示页面。如果需要，用户可以创建自己的样式。样式存储在生态系统参数表的样式参数 *stylesheet* 中。

#### 页面模块 {#page-module}

要在多个页面中使用代码片段，可以创建页面模块并将其嵌入到页面代码。在 Weaver 的 **模块Blocks**中可创建和编辑这些页面模块。 和页面一样，可定义编辑权限。

#### 多语言资源编辑器 {#language-resource-editor}

Weaver 包括一个使用 Logicor 模版语言的函数 **LangRes**进行页面本地化的机制。
它将页面上的语言资源标签替换为用户在软件客户端或浏览器中选择的语言对应的文本行。
可以使用简短的语法 **\$lable\$** 代替 **LangRes**函数。由合约发起的弹出窗口中的消息翻译是由 needle 语言的 **LangRes**函数执行的。

可以在 Weaver 的 **多语言资源Language resources**部分中创建和编辑语言资源。
语言资源由一个标签名称和该名称在不同语言中的翻译组成，并标记相应的双字符语言标识符(EN、ZH、JP等)。

可以使用与其他数据表相同的方式定义添加和更改语言资源的权限。

## Logicor 模版语言 {#logicor-template-language}

Logicor 函数提供以下操作：

-   从数据库中检索值：`DBFind`，将从数据库检索的数据表示为表格和图表；
-   分配和显示变量值的数据操作：`SetVar, GetVar, Data`；
-   显示和比较日期/时间值：`DateTime, Now, CmpTime`；
-   使用各种用户数据输入字段构建表单：`Form, ImageInput, Input, RadioGroup, Select`；
-   通过显示错误消息验证表单字段中的数据：`Validate, InputErr`；
-   导航元素的显示：`AddToolButton, LinkPage, Button`；
-   调用合约：`Button`；
-   创建HTML页面布局元素，包括各种标签，可选择指定css类：
    `Div, P, Span, 等`；
-   将图像嵌入页面并上传图像：`Image, ImageInput`；
-   页面布局片段的条件显示： `If, ElseIf, Else`；
-   创建多级菜单；
-   页面本地化。

### Logicor 概述 {#logicor-overview}

Logicor 页面模版语言是一种函数式语言，允许使用函数调用函数`FuncName(parameters)`，并将函数嵌套到彼此中。 可以指定参数而不带引号,可以删除不必要的参数。

```text
Text FuncName(parameter number 1, parameter number 2) another text.
FuncName(parameter 1,,,parameter 4)
```

如果参数包含逗号，应将其括在引号（后引号或双引号）中。如果一个函数只能有一个参数，可以在其中使用逗号而不带引号。此外，如果参数具有不成对的右括号，应使用引号。

```text
FuncName("parameter number 1, the second part of first paremeter")
FuncName(`parameter number 1, the second part of first paremeter`)
```

如果将参数放在引号中，但参数本身包含引号，可以在文本中使用不同类型的引号或多个引号。

```text
FuncName("parameter number 1, ""the second part of first"" paremeter")
FuncName(`parameter number 1, "the second part of first" paremeter`)
```

在函数定义中，每个参数都有一个特定的名称。您可以按声明的顺序调用函数和指定参数，或者按名称的任意顺序指定任何参数集：`Parameter_name: Parameter_value`。该方法允许安全地添加新的函数参数，而不会破坏与当前模版的兼容性：

```text
FuncName(myclass, This is value, Div(divclass, This is paragraph.))
FuncName(Body: Div(divclass, This is paragraph.))
FuncName(myclass, Body: Div(divclass, This is paragraph.))
FuncName(Value: This is value, Body: 
     Div(divclass, This is paragraph.)
)
FuncName(myclass, Value without Body)
```

函数可以返回文本，生成HTML元素（例如，`Input`），或者创建具有嵌套HTML元素的HTML元素（`Div，P，Span`）。在后一种情况下，使用具有预定义名称 **Body** 的参数来定义嵌套元素。例如，在另一个div中嵌套两个div如下所示：

```text
Div(Body:
   Div(class1, This is the first div.)
   Div(class2, This is the second div.)
)
```

要定义 **Body** 参数中描述的嵌套元素，可以使用以下表示：`FuncName(...){...}`。嵌套元素用花括号指定:

```text
Div(){
   Div(class1){
      P(This is the first div.)
      Div(class2){
          Span(This is the second div.)
      }
   }
}
```

如果需要连续多次指定相同的函数，则可以使用点号 `.`,而不是每次都写入函数名。例如，以下是相同的：

```text
Span(Item 1)Span(Item 2)Span(Item 3)
Span(Item 1).(Item 2).(Item 3)
```

该语言可以使用 **SetVar** 函数分配变量，引用变量值使用 `#name#`。

```text
SetVar(name, My Name)
Span(Your name: #name#)
```

要引用生态系统的语言资源，可以使用 `$langres$`，其中 *langres* 是语言源的名称。

```text
Span($yourname$: #name#)
```

预定义了以下变量：

-   `#key_id#` - 当前用户的帐户地址；
-   `#ecosystem_id#` - 当前生态系统ID；
-   `#guest_key#` - 访客账户地址；
-   `#isMobile#` - 如果 Weaver 在移动设备上运行，则为1。

#### PageParams {#use-pageparams-to-pass-parameters-to-pages}
使用PageParams将参数传递给页面。
有很多函数都支持 **PageParams**参数，该参数用于在重定向到新页面时传递参数。例如：`PageParams: "param1=value1,param2=value2"`。
参数值既可以是简单的字符串，也可以是具有引用值的变量。将参数传递给页面时，会创建带参数名称的变量。例如，`#param1#`和 `#param2#`。

-   `PageParams: "hello=world"` - 新页面以world为值接收hello参数；
-   `PageParams: "hello=#world#"` - 新页面接收带有world变量值的hello参数。

#### Val (#val)
    此外，**Val** 函数允许从表单中获取数据，这些数据是在重定向中指定的。

-   `PageParams: "hello=Val(world)"` - 新页面接收带有world表单元素值的hello参数。

#### 调用合约 {#calling-contracts}

Logicor 通过单击表单中的按钮 **Button**函数来实现合约调用。一旦启动该事件，用户在页面表单字段中输入的数据将传递给合约，
如果表单字段的名称对应于被调用合约的数据部分中的变量名称，则会自动传输数据。
**Button**函数允许打开一个模式窗口，用于用户验证合约执行，并在成功执行合约后启动重定向到指定页面的操作，并将某些参数传递到该页面。

## Logicor 函数功能分类 {#logicor-function-classification}

### 变量操作 {#operations-on-variables}

|        |        |         |
| ------ | ------ | ------- |
| [GetVar](#getvar) | [SetVar](#setvar) | [VarAsIs](#varasis) |


### 导航操作 {#navigational-operations} 

|               |        |          |
| ------------- | ------ | -------- |
| [AddToolButton](#addtoolbutton) | [Button](#button) | [LinkPage](#linkpage) |


### 数据操作 {#data-manipulation}

|           |          |       |
| --------- | -------- | ----- |
| [Calculate](#calculate) | [DateTime](#datetime) | [Money](#money) |
| [CmpTime](#cmptime)   |          |       |

### 显示数据 {#data-presentation}

|          |           |          |
| -------- | --------- | -------- |
| [Code](#code)     | [Hint](#hint)      | [MenuItem](#menuitem) |
| [CodeAsIs](#codeasis) | [Image](#image)     | [QRcode](#qrcode)   |
| [Chart](#chart)    | [MenuGroup](#menugroup) | [Table](#table)    |
| [ForList](#forlist)  |           |          |


### 接收数据 {#accepting-of-data}

|             |               |                 |
| ----------- | ------------- | --------------- |
| [Address](#address)     | [EcosysParam](#ecosysparam)   | [LangRes](#langres)         |
| [AddressToId](#addresstoid) | [GetHistory](#gethistory)    | [Range](#range)           |
| [AppParam](#appparam)    | [GetColumnType](#getcolumntype) | [SysParam](#sysparam)        |
| [Data](#data)        | [JsonToSource](#jsontosource)  | [Binary](#binary)          |
| [DBFind](#dbfind)      | [ArrayToSource](#arraytosource) | [TransactionInfo](#transactioninfo) |


### 数据格式化元素 {#data-formatting-elements}

|      |          |        |
| ---- | -------- | ------ |
| [Div](#div)  | [SetTitle](#settitle) | [Span](#span)   |
| [Em](#em)   | [Label](#label)    | [Strong](#strong) |
| [P](#p)    |          |        |

### 表单元素 {#form-elements}

|            |            |          |
| ---------- | ---------- | -------- |
| [Form](#form)       | [InputErr](#inputerr)   | [InputMap](#inputmap) |
| [ImageInput](#imageinput) | [RadioGroup](#radiogroup) | [Map](#map)      |
| [Input](#input)      | [Select](#select)     |          |

### 代码片段操作 {#operations-on-code-blocks}
|      |      |         |
| ---- | ---- | ------- |
| [If](#if)   | [Or](#or)   | [Include](#include) |
| [And](#and)  |      |         |

## Logicor 函数参考 {#logicor-function-references}

### Address {#address}

该函数返回指定账户地址的钱包地址`xxxx-xxxx-...-xxxx`；如果没有指定地址，以当前用户的账户地址作为参数。

**语法**

``` text
Address(account)
```

* Address

  * account

    账户地址。

**示例**

```text
Span(Your wallet: Address(#account#))
```

### AddressToId {#addresstoid}

该函数返回指定钱包地址 `xxxx-xxxx-...-xxxx` 的账户地址。

**语法**

``` text
AddressToId(Wallet)
```

* AddressToId

  * Wallet

    钱包地址 `XXXX-...-XXXX` 格式。

**示例**

```text
AddressToId(#wallet#)
```

### AddToolButton {#addtoolbutton}

创建一个 **addtoolbutton** 元素的按钮面板。

**语法**

``` text
AddToolButton(Title, Icon, Page, PageParams) 
    [.Popup(Width, Header)]
```

* AddToolButton

  * Title

    按钮标题。

  * Icon

    按钮图标样式。

  * Page

    跳转的页面名称。

  * PageParams

    传递给页面的参数。

  * Popup

    弹出模态窗口。

  * Header

    窗口标题。

  * Width

    窗口宽度百分比。

    该参数的值范围是1到100。

**示例**

```text
AddToolButton(Title: $@1broadcast$, Page: @1notifications_broadcast, Icon: icon-plus).Popup(Header: $@1notifications_broadcast$, Width: "50")
```

### And {#and}

该函数返回执行 **and** 逻辑运算的结果，括号中列出的所有参数以逗号分隔。
如果有一个参数为空字符串、零或`false`，参数值为 `false`，其他情况参数值为 `true`。如果参数值为`true`，则该函数返回 `1`，其他情况返回 `0`。

**语法**

``` text
And(parameters)
```

**示例**

```text
If(And(#myval1#,#myval2#), Span(OK))
```

### AppParam {#appparam}

输出应用程序参数值，该值取自当前生态系统的 *app_params*表。如果存在具有指定定名称的语言资源，其值将自动替换。

**语法**

``` text
AppParam(App, Name, Index, Source) 
```

* AppParam

  * App

    应用程序ID。

  * Name

    参数名称。

  * Index

    当参数值是以逗号分隔的列表时，可以使用该参数。

    参数元素的索引，从1开始。例如，如果 `type = full,light`，那么 `AppParam(1, type, 2)` 返回 `light`。

    该参数不能与 *Source* 参数一起使用。

  * Source

    当参数值是以逗号分隔的列表时，可以使用该参数。

    创建 *data* 对象，该对象的元素是指定参数的值。该对象可用作[Table](#table) 和 [Select](#select) 函数的数据源。

    该参数不能与 *Index* 参数一起使用。

**示例**

```text
AppParam(1, type, Source: mytype)
```

### ArrayToSource {#arraytosource}

创建一个 **arraytosource**元素，并用JSON数组的键值对填充它。得到的数据被放入 *Source*元素，该元素稍后可以在源输入的函数中使用(例如[Table](#Table))。

**语法**

``` text
ArrayToSource(Source, Data)
```

* ArrayToSource

  * Source

    数据源名称。

* Data

    JSON数组或包含JSON数组的变量名称（`#name#`）。

**示例**

```text
ArrayToSource(src, #myjsonarr#)
ArrayToSource(dat, [1, 2, 3])
```

### Binary {#binary}

返回存储在二进制表 *binaries* 中的静态文件的链接。

**语法**

``` text
Binary(Name, AppID, MemberID)[.ById(ID)][.Ecosystem(ecosystem)]
```

* Binary

  * Name

    文件名称。

  * AppID

    应用程序ID。

  * MemberID

    账户地址，默认0。

  * ID

    静态文件ID。

  * ecosystem

    生态系统ID。如果未指定该参数，从当前生态系统请求二进制文件。

**示例**

```text
Image(Src: Binary("my_image", 1))
Image(Src: Binary().ById(2))
Image(Src: Binary().ById(#id#).Ecosystem(#eco#))
```

### Button {#button}

创建一个 **button** HTML元素。该元素创建一个按钮，用于调用合约或打开页面。

**语法**

``` text
Button(Body, Page, Class, Contract, Params, PageParams)
    [.CompositeContract(Contract, Data)]
    [.Alert(Text, ConfirmButton, CancelButton, Icon)]
    [.Popup(Width, Header)]
    [.Style(Style)]
    [.ErrorRedirect((ErrorID,PageName,PageParams)]
```

* Button

  * Body

    子文本或元素。

  * Page

    重定向的页面名称。

  * Class

    按钮类。

  * Contract

    调用的合约名称。

  * Params

    传递给合约的值列表。通常情况下，合约参数的值（`data`部分）是从具有相似名称的 `id` 的HTML元素(例如输入字段)中获得。
    如果元素`id` 与合约参数的名称不同，那么应该使用`contractField1=idname1, contractField2=idname2`格式赋值。
    该参数作为对象`{contractField1: idname1, contractField2: idname2}` 返回给 *attr*。

  * PageParams

    传递给重定向页面的参数的格式`pageField1=idname1, pageField2=idname2`。
    目标页面参数名称为`#pageField1` 和 `#pageField2`的变量在目标页面上创建，并分配指定的值。更多参数传递规范[使用PageParams将参数传递给页面](#pageparams)。

* CompositeContract

    用于为按钮添加额外合约。CompositeContract可以多次使用。

  * Name

    合约名称。

  * Data

    合约参数为JSON数组。

* Alert

  显示消息。

  * Text

    消息文本。

  * ConfirmButton

    确认按钮标题。

  * CancelButton

    取消按钮标题。

  * Icon

    按钮图标。

* Popup

    输出模态窗口。

  * Header

    窗口标题。

  * Width

    窗口宽度百分比。

    该参数的值范围是1到100。

* Style

    指定CSS样式。

  * Style

    CSS样式。

* ErrorRedirect

    指定一个重定向页面，当`contractfundef-Throw`{.interpreted-text role="ref"} 函数在合约执行期间生成错误时，将使用该重定向页面。
    可以有几个*ErrorRedirect* 调用。因此返回\*errredirect\*属性时，其属性的键为*ErrorID* ，值为参数列表。

  * ErrorID

    错误ID。

  * PageName

    重定向页面的名称。

  * PageParams

    传递给该页面的参数。

**示例**

```text
Button(Submit, default_page, mybtn_class).Alert(Alert message)
Button(Contract: MyContract, Body:My Contract, Class: myclass, Params:"Name=myid,Id=i10,Value")
```

### Calculate {#calculate}

该函数返回 **Exp** 参数中传递的算术表达式的结果。可以使用以下操作：`+, -, *, /` 和括号`()`。

**语法**

``` text
Calculate(Exp, Type, Prec)
```

* Calculate

  * Exp

    算术表达式。可以包含数字和 *# name*＃ 变量。

  * Type

    结果数据类型：int, float,money。
    如果未指定，如果有带小数点的数字，则结果类型为float，其他情况则为int。

  * Prec

    **float** 和 **money** 类型指定小数点后的有效位数。

**示例**

```text
Calculate( Exp: (342278783438+5000)\*(#val#-932780000), Type: money, Prec:18 )
Calculate(10000-(34+5)\*#val#)
Calculate("((10+#val#-45)\*3.0-10)/4.5 + #val#", Prec: 4)      
```

### Chart {#chart}

创建HTML图表。

**语法**

``` text
Chart(Type, Source, FieldLabel, FieldValue, Colors)
```

* Chart

  * Type

    图表类型。

  * Source

    数据源的名称，例如，从[DBFind](#DBFind) 函数获取。

  * FieldLabel

    标头的字段的名称。

  * FieldValue

    值的字段的名称。

  * Colors

    颜色列表。

**示例**

```text
Data(mysrc,"name,count"){
    John Silver,10
    "Mark, Smith",20
    "Unknown ""Person""",30
}
Chart(Type: "bar", Source: mysrc, FieldLabel: "name", FieldValue: "count", Colors: "red, green")
```

### CmpTime {#cmptime}

该函数比较相同格式的两个时间值。

格式支持 unixtime，`YYYY-MM-DD HH:MM:SS` 和任意时间格式，例如从年到秒 `YYYYMMDD`。

**语法**

``` text
CmpTime(Time1, Time2)
```

**返回值**

-   `-1` - Time1 \< Time2；
-   `0` - Time1 = Time2；
-   `1` - Time1 \> Time2。

**示例**

```text
If(CmpTime(#time1#, #time2#)<0){...}
```

### Code {#code}

创建用于显示指定代码的 **code** 元素。

该函数用变量的值替换变量(例如 `#name#`)。

**语法**

``` text
Code(Text)
```

* Code

  * Text

    源代码。

**示例**

```text
Code( P(This is the first line.
    Span(This is the second line.))
)  
```

### CodeAsIs {#codeasis}

创建用于显示指定代码的 **code** 元素。

此函数不会将变量替换为其值。例如，`#name#` 将按原样显示。

**语法**

``` text
CodeAsIs(Text)
```

* CodeAsIs

  * Text

    源代码。

**示例**

```text
CodeAsIs( P(This is the #test1#.
    Span(This is the #test2#.))
)
```

### Data {#data}

创建一个 **data** 元素并用指定的数据填充它并放入 *Source* 中，然后可以在[Table](#Table) 和其他函数中接收*Source* 作为数据输入。列名序列对应于 *data* 条目值的序列。

**语法**

``` text
Data(Source,Columns,Data) 
    [.Custom(Column){Body}]
```

* Data

  * Source

    数据源名称。您可以指定任何名称，稍后可以将其作为数据源传递到其他函数中。

  * Columns

    列名的列表，以逗号分隔。

  * Data

    数据集。

    每行一条记录。列值必须用逗号分隔。*Data* 和 *Columns*应设置相同的顺序。

    对于带有逗号的值，将该值放在双引号中 (`"example1, example2", 1, 2`)。
    对于带引号的值，将该值放在两个双引号中(`"""example", "example2""", 1, 2`)。

* Custom

    可以为 *Data*分配计算列。例如，您可以为按钮和其他页面布局元素指定字段模版。这些字段模版通常分配给[Table](#Table)和其他函数来接收数据。

    如果想要分配多个计算列，请使用多个 *Custom* 函数。

  * Column

    列名。必须指定唯一名称。

  * Body

    代码片段。您可以使用 `#columnname#`从该条目中的其他列获取值，然后在代码片段中使用这些值。

**示例**

```text
Data(mysrc,"id,name"){
    "1",John Silver
    2,"Mark, Smith"
    3,"Unknown ""Person"""
 }.Custom(link){Button(Body: View, Class: btn btn-link, Page: user, PageParams: "id=#id#"}
```

### DateTime {#datetime}

以指定格式显示时间和日期。

**语法**

``` text
DateTime(DateTime, Format)
```

* DateTime

  * DateTime

    以unixtime或标准格式表示时间和日期 `2006-01-02T15:04:05`。

  * Format

    格式模版: 2位数年份格式 `YY`，4位数年份格式 `YYYY`，月份 `MM`，天数`DD`，小时 `HH`，分钟 `MM`，秒数 `SS`，例如：`YY/MM/DD HH:MM`。

    如果没有指定或缺少该参数，将使用 `YYYY-MM-DD HH:MI:SS` 格式。

**示例**

``` text
DateTime(2017-11-07T17:51:08)
DateTime(#mytime#,HH:MI DD.MM.YYYY)
```

### DBFind {#dbfind}

创建 **dbfind** 元素，用 *table* 表的数据填充它并将其放到 *Source*结构中。该 *Source* 结构可以在随后用于[Table](#Table) 和其他函数 *Source*的输入数据。

**语法**

``` text
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

* DBFind

  * table

    数据表名称。

  * Source

    数据源名称。

* Columns

  * columns

    返回的字段列表，如果未指定，将返回所有字段。如果存在JSON类型的字段，可以使用以下语法来处理记录字段：`columnname->fieldname`。在这种情况下，生成的字段名称为`columnname.fieldname`。

* Where

  * conditions

    数据查询条件。请参阅 `contractfundef-DBFind`{.interpreted-text role="ref"}。

    如果存在JSON类型的字段，可以使用以下语法来处理记录字段：`columnname->fieldname`。

* WhereId

    根据ID查询，例如，`.WhereId(1)`。

  * id

    条目ID。

  * Order

    按字段排序。

    有关排序语法的详细信息，请参阅[DBFind](#DBFind)。

  * name

    字段名称

* Limit

  * limit

    返回的条目数。默认为25条，最大数为10000条。

* Offset

  * offset

    偏移量。

* Count

    指定 *Where* 条件的总行数。

    除了存储在变量中之外，还会在 *dbfind* 元素的 *count* 参数中返回总计数。

    如果未指定 *Where* 和 *WhereID*，将返回数据表的总行数。

  * countvar

    保存行计数的变量名称。

* Ecosystem

  * id

    生态系统ID。默认情况下，数据来自当前生态系统中的指定表。

* Cutoff

    用于剪切和显示大量文本数据。

  * columns

    由逗号分隔的字段列表，这些字段必须由 *Cutoff* 函数处理。

    字段值被一个JSON对象替换，该对象有两个字段: 链接 *link* 和标题 *title*。
    如果字段值大于32个字符，则返回指向全文前32个字符的*link*。如果值为32个字符且更短，则 *link* 为空，\*title\* 包含完整的字段值。

* Custom

    可以为 *Data*分配计算列。例如，您可以为按钮和其他页面布局元素指定字段模版。
    这些字段模版通常分配给`templatefundef-Table`{.interpreted-text role="ref"} 和其他函数来接收数据。

    如果想要分配多个计算列，请使用多个 *Custom* 函数。

  * Column

    列名。必须指定唯一名称。

  * Body

    代码片段。您可以使用 `#columnname#`从该条目中的其他列获取值，然后在代码片段中使用这些值。

* Vars

    通过查询获得的第一行生成一组具有值的变量。当指定这个函数时，*Limit*参数自动变为1，并且只返回一条记录。

  * Prefix

    添加到变量名称的前缀。格式为`#prefix_columnname#`，其中列名紧跟下划线符号。如果有包含JSON字段的列，那么生成的变量将采用以下格式：`#prefix_columnname_field#`。

**示例**

```text
DBFind(parameters,myparam)
DBFind(parameters,myparam).Columns(name,value).Where({name:"money"})
DBFind(parameters,myparam).Custom(myid){Strong(#id#)}.Custom(myname){
   Strong(Em(#name#))Div(myclass, #company#)
}
```

### Div {#div}

创建 **div** HTML元素。

**语法**

``` text
Div(Class, Body)
    [.Style(Style)]
    [.Show(Condition)]
    [.Hide(Condition)]
```

* Div

  * Class

    该 *div* 的类名。

  * Body

    子元素。

* Style

    指定CSS样式。

  * Style

    CSS样式。

* Show

    定义显示Div的条件。

  * Condition

    见下面 *Hide*。

* Hide

    定义隐藏Div的条件。

  * Condition

    表达式格式 `InputName=Value`，当所有表达式都为真时，*Condition* 为真，当 `InputName` 的值等于 `Value`，*Condition*为真。
    如果调用了多个 *Show* 或 *Hide*，则至少有一个 *Condition* 参数必须为真。

**示例**

```text
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

### EcosysParam {#ecosysparam}

该函数从当前生态系统的生态系统参数表中获取参数值。如果返回结果名称有语言资源，则会相应地进行翻译。

**语法**

``` text
EcosysParam(Name, Index, Source)
```

* EcosysParam

  * Name

    参数名称。

  * Index

    如果请求的参数是以逗号分隔的元素列表，可以指定从1开始的索引。
    例如，如果`gender = male,female`，那么 `gender = male,female` 返回 `female`。

    该参数不能与 *Source* 参数一起使用。

  * Source

    当参数值是以逗号分隔的列表时，可以使用该参数。

    创建 *data* 对象，该对象的元素是指定参数的值。该对象可用作[Table](#Table) 和 [Select](#Select) 函数的数据源。

    该参数不能与 *Index* 参数一起使用。

```text
Address(EcosysParam(founder_account))
EcosysParam(gender, Source: mygender)

EcosysParam(Name: gender_list, Source: src_gender)
Select(Name: gender, Source: src_gender, NameColumn: name, ValueColumn: id)
```

### Em {#em}

创建 **em** HTML元素。

**语法**

``` text
Em(Body, Class)
```

* Em

  * Body

    子文本或元素。

  * Class

    该 *em* 的类名。

**示例**

```text
This is an Em(important news).
```

### ForList {#forlist}

以 *Body* 中设置的模版格式显示 *Source* 数据源中的元素列表，并创建 **forlist** 元素。

**语法**

``` text
ForList(Source, Index){Body}
```

* ForList

  * Source

    从 [DBFind](#dbfind) 或 [Data](#data) 函数获取的数据源。

  * Index

    迭代计数器的变量。计数从1开始。

    可选参数。如果未指定，则将迭代计数值写入 *\[Source\] \_index* 变量。

  * Body

    用于插入元素的模版。

```text
ForList(mysrc){Span(#mysrc_index#. #name#)}
```

### Form {#form}

创建 **form** HTML元素。

**语法**

``` text
Form(Class, Body) [.Style(Style)]
```

* Form

  * Body

    子文本或元素。

  * Class

    该 *form* 的类名。

* Style

    指定CSS样式。

  * Style

    CSS样式。

**示例**

```text
Form(class1 class2, Input(myid))
```

### GetColumnType {#getcolumntype}

返回指定数据表的字段数据类型。

返回以下类型：`text, varchar, number, money, double, bytes, json, datetime, double`。

**语法**

``` text
GetColumnType(Table, Column)
```

* GetColumnType

  * Table

    数据表名称。

  * Column

    字段名称。

**示例**

```text
SetVar(coltype,GetColumnType(members, member_name))Div(){#coltype#}
```

### GetHistory {#gethistory}

创建 **gethistory** 元素，使用指定数据表的条目的历史更改记录来填充它。生成的数据将放入 *Source* 元素中。
该元素稍后可以在源输入的函数中使用，例如 [Table](#Table) 。

数组按从最近更改顺序排序。

数组中 *id* 字段指向 *rollback_tx* 表的 *id*。*block_id* 代表区块ID，*block_time* 代表区块生成时间戳。

**语法**

``` text
GetHistory(Source, Name, Id, RollbackId)  
```

* GetHistory

  * Source

    数据源名称。

  * Name

    数据表名称。

  * Id

    条目ID。

  * RollbackId

    可选参数。如果指定，只从 *rollback_tx* 表返回一个具有指定ID的记录。

**示例**

```text
GetHistory(blocks, BlockHistory, 1)
```

### GetVar {#getvar}

该函数返回已存在的指定变量值，如果不存在则返回空字符串。

只有在请求编辑树时，才会创建 **getvar** 元素。`GetVar(varname)` 和 `#varname` 间的区别是，如果 *varname* 不存在，*GetVar*将返回一个空字符串，而 *#varname#* 将被解释为一个字符串值。

**语法**

``` text
GetVar(Name)
```

* GetVar

  * Name

    变量名称。

**示例**

```text
If(GetVar(name)){#name#}.Else{Name is unknown}
```

### Hint {#hint}

创建 **hint** 元素，用于提示。

**语法**

``` text
Hint(Icon,Title,Text)
```

* Hint

  * Icon

    图标名称。

  * Title

    提示标题。

  * Text

    提示文本。

**示例**

```text
Hint(Icon: "icon-wrench",Title:$@1pa_settings$,Text: This is a hint text)
```

### If {#if}

条件声明。

返回满足 *Condition* 的第一个 *If* 或 *ElseIf* 的子元素。否则返回 *Else* 的子元素。

**语法**

``` text
If(Condition){ Body } 
    [.ElseIf(Condition){ Body }]
    [.Else{ Body }]
```

* If

  * Condition

    如果条件等于 *空字符串*，*0* 或 *false*，则认为该条件未满足。在所有其他情况下，该条件被认为是满足的。

  * Body

    子元素。

**示例**

```text
If(#value#){
   Span(Value)
}.ElseIf(#value2#){Span(Value 2)
}.ElseIf(#value3#){Span(Value 3)}.Else{
   Span(Nothing)
}
```

### Image {#image}

创建 **image** HTML元素。

**语法**

``` text
Image(Src, Alt, Class)
    [.Style(Style)]
```

* Image

  * Src

    图像源，文件或 `data:...`。

  * Alt

    无法显示图像时的替代文本。

  * Сlass

    图像类名。

**示例**

```text
Image(Src: Binary().ById(#id#), Class: preview).Style(height: 40px; widht 40px;)
```

### ImageInput {#imageinput}

为图像上传创建 **imageinput** 元素。

**语法**

``` text
ImageInput(Name, Width, Ratio, Format) 
```

* ImageInput

  * Name

    元素名称。

  * Width

    裁剪图像的宽度。

  * Ratio

    宽高比或图像高度。

  * Format

    上传图像的格式。

**示例**

```text
ImageInput(avatar, 100, 2/1)
```

### Include {#include}

将具有指定名称的模版插入到页面代码中。

**语法**

``` text
Include(Name)
```

* Include

  * Name

    模版名称。

**示例**

```text
Div(myclass, Include(mywidget))
```

### Input {#input}

创建 **input** HTML元素。

**语法**

``` text
Input(Name, Class, Placeholder, Type, Value, Disabled)
    [.Validate(validation parameters)]
    [.Style(Style)]
```

* Input

  * Name

    元素名称。

  * Class

    类名。

  * Placeholder

    输入字段预期值的提示信息。

  * Type

    *input* 类型。

  * Value

    元素值。

  * Disabled

    禁用 *input* 元素。

* Validate

    验证参数。

* Style

    指定CSS样式。

  * Style

    CSS样式。

**示例**

```text
Input(Name: name, Type: text, Placeholder: Enter your name)
Input(Name: num, Type: text).Validate(minLength: 6, maxLength: 20)
```

### InputErr {#inputerr}

创建 **inputerr** 元素，用于验证错误文本。

**语法**

``` text
InputErr(Name,validation errors)]
```

* InputErr

  * Name

    对应于[Input](#Input) 元素的名称。

  * validation errors

    一个或多个参数的验证错误消息。

**示例**

```text
InputErr(Name: name, 
    minLength: Value is too short, 
    maxLength: The length of the value must be less than 20 characters)
```

### InputMap {#inputmap}

创建地址文本输入字段。提供在地图上选择坐标的功能。

**语法**

``` text
InputMap(Name, Type, MapType, Value)
```

* InputMap

  * Name

    元素名称。

  * Value

    默认值。

    该值是字符串格式的对象。例如，`{"coords":[{"lat":number,"lng":number},]}`或 `{"zoom":int, "center":{"lat":number,"lng":number}}`。
    当使用预定义的 *Value* 创建InputMap时，地址字段可用于保存地址值，因此地址字段不为空。

  * Type

    地图标点测绘类型：

    - *polygon* - 表示多点闭环的面积；
    - *Line* - 表示多点无闭环的折线；
    - *Point* - 表示单点坐标。

  * MapType

    地图类型。

    该参数有以下值: `hybrid`, `roadmap`, `satellite`, `terrain`。

**示例**

```text
InputMap(Name: Coords,Type: polygon, MapType: hybrid, Value: `{"zoom":8, "center":{"lat":55.749942860682545,"lng":37.6207172870636}}`)
```

### JsonToSource {#jsontosource}

创建一个 **jsontosource**元素，并用JSON数组的键值对填充它。得到的数据被放入 *Source* 元素，
该元素稍后可以在源输入的函数中使用例如：[Table](#Table)。

结果数据中的记录按JSON键的字母顺序排序。

**语法**

``` text
JsonToSource(Source, Data)
```

* JsonToSource

  * Source

    数据源名称。

  * Data

    JSON对象或包含JSON对象的变量名称（`#name#`）。

**示例**

```text
JsonToSource(src, #myjson#)
JsonToSource(dat, {"param":"value", "param2": "value 2"})
```

### Label {#label}

创建 **label** HTML元素。

**语法**

``` text
Label(Body, Class, For)
    [.Style(Style)]
```

* Label

  * Body

    子文本或元素。

  * Class

    类名。

  * For

    绑定到某个表单元素。

* Style

    指定CSS样式。

  * Style

    CSS样式。

**示例**

```text
Label(The first item).
```

### LangRes {#langres}

返回指定的语言资源。如果请求对树进行编辑，则返回 **langres** 元素，可以使用简短格式符号 **\$langres\$**。

**语法**

``` text
LangRes(Name)
```

* LangRes

  * Name

    语言资源的名称。

**示例**

```text
LangRes(name)
LangRes(myres)
```

### LinkPage {#linkpage}

创建 **linkpage** 元素，指向页面的链接。

**语法**

``` text
LinkPage(Body, Page, Class, PageParams)
    [.Style(Style)]
```

* LinkPage

  * Body

    子文本或元素。

  * Page

    重定向的页面名称。

  * Class

    按钮类名。

  * PageParams

    重定向的页面参数。

* Style

    指定CSS样式。

  * Style

    CSS styles

**示例**

```text
LinkPage(Class: #style_link# h5 text-bold, Page: @1roles_view, PageParams: "v_role_id=#recipient.role_id#")
```

### Map {#map}

创建可视化地图，并以任意格式显示坐标。

**语法**

``` text
Map(Hmap, MapType, Value)
```

* Map

  * Hmap

    页面上的HTML元素高度。

    默认值为100。

  * Value

    地图值，字符串格式的对象。

    例如， `{"coords":[{"lat":number,"lng":number},]}` 或者`{"zoom":int, "center":{"lat":number,"lng":number}}`。
    如果没有指定`center` ，则地图窗口将根据指定的坐标自动调整。

  * MapType

    地图类型。

    该参数有以下值: `hybrid`, `roadmap`, `satellite`, `terrain`。

**示例**

```text
Map(MapType:hybrid, Hmap:400, Value:{"coords":[{"lat":55.58774531752405,"lng":36.97260184619233},{"lat":55.58396161622043,"lng":36.973803475831005},{"lat":55.585222890513975,"lng":36.979811624024364},{"lat":55.58803635636347,"lng":36.978781655762646}],"area":146846.65783403456,"address":"Unnamed Road, Moscow, Russia, 143041"})
```

### MenuGroup {#menugroup}

在菜单中创建一个嵌套的子菜单，并返回 **menugroup**元素，在使用语言资源替换之前，**name** 参数返回 **Title** 的值。

**语法**

``` text
MenuGroup(Title, Body, Icon)
```

* MenuGroup

  * Title

    菜单项名称。

  * Body

    子菜单中的子元素。

  * Icon

    图标。

**示例**

``` text
MenuGroup(My Menu){
    MenuItem(Interface, sys-interface)
    MenuItem(Dahsboard, dashboard_default)
}
```

### MenuItem {#menuitem}

创建一个菜单项并返回 **menuitem** 元素。

**语法**

``` text
MenuItem(Title, Page, Params, Icon)
```

* MenuItem

  * Title

    菜单项名称。

  * Page

    重定向的页面名称。

  * Params

    重定向的页面参数。

  * Icon

    图标。

**示例**

```text
MenuItem(Title:$@1roles$, Page:@1roles_list, Icon:"icon-pie-chart")
```

### Money {#money}

返回 *exp / 10 \^ digit* 的字符串值。

**语法**

``` text
Money(Exp, Digit)
```

* Money

  * Exp

    数字的字符串格式。

  * Digit

    `exp/10^digit`表达式中10的指数，该值可以是正数或负数。正值决定了小数点后的位数。

**示例**

```text
Money(Exp, Digit)
```

### Or {#or}

该函数返回执行 **if** 逻辑运算的结果，括号中列出的所有参数以逗号分隔。如果有一个参数不为空字符串、零或 `false`，参数值为 `true`，其他情况参数值为 `false`。
如果参数值为`true`，则该函数返回 `1`，其他情况返回 `0`。

**语法**

``` text
Or(parameters)
```

**示例**

```text
If(Or(#myval1#,#myval2#), Span(OK))
```

### P {#p}

创建 **p** HTML元素。

**语法**

``` text
P(Body, Class) 
    [.Style(Style)]
```

* P

  * Body

    子文本或元素。

  * Class

    类名。

* Style

    指定CSS样式。

  * Style

    CSS样式。

**示例**

```text
P(This is the first line.
  This is the second line.)
```

### QRcode {#qrcode}

返回带有指定文本的二维码，并创建 **qrcode** 元素。

**语法**

``` text
QRcode(Text)
```

* QRcode

  * Text

    二维码文字。

**示例**

```text
QRcode(#name#)
```

### RadioGroup {#radiogroup}

创建 **radiogroup** 元素。

**语法**

``` text
RadioGroup(Name, Source, NameColumn, ValueColumn, Value, Class) 
    [.Validate(validation parameters)] 
    [.Style(Style)]
```

* RadioGroup

  * Name

    元素名称。

  * Source

    从 [DBFind](#DBFind) 或 [Data](#Data) 函数获取的数据源。

  * NameColumn

    数据源的字段名称。

  * ValueColumn

    数据源的值名称。

    使用 [Custom](#data) 创建的字段不得在该参数中使用。

  * Value

    默认值。

  * Class

    类名。

* Validate

    验证参数。

* Style

    指定CSS样式。

  * Style

    CSS样式。

**示例**

```text
RadioGroup(Name: type_decision, Source: numbers_type_decisions, NameColumn: name, ValueColumn: value)
```

### Range {#range}

创建 **range** 元素，使用步长 *Step* 从 *From* 到 *To* （不包括 *To*）填充整数元素。生成的数据将放入 *Source*中，
稍后可以在源输入的函数中使用(例如 [Table](#Table))。如果指定无效参数，则返回空的 *Source*。

**语法**

``` text
Range(Source,From,To,Step)
```

* Range

  * Source

    数据源名称。

  * From

    起始值(i = From)。

  * To

    结束值(i < To)。

  * Step

    数值变化步长，如果未指定该参数，默认为1。

**示例**

```text
Range(my,0,5)
SetVar(from, 5).(to, -4).(step,-2)
Range(Source: neg, From: #from#, To: #to#, Step: #step#)
```

### Select {#select}

创建 **select** HTML元素。

**语法**

``` text
Select(Name, Source, NameColumn, ValueColumn, Value, Class) 
    [.Validate(validation parameters)]
    [.Style(Style)]
```

* Select

  * Name

    元素的名称。

  * Source

    从 [DBFind](#dbfind) 或[Data](#data) 函数获取的数据源。

  * NameColumn

    数据源的字段名称。

  * ValueColumn

    数据源的值名称。

    使用 [Custom](#Custom) 创建的字段不得在该参数中使用。

  * Value

    默认值。

  * Class

    类名。

* Validate

    验证参数。

  * Style

    指定CSS样式。

  * Style

    CSS样式。

**示例**

```text
DBFind(mytable, mysrc)
Select(mysrc, name) 
```

### SetTitle {#settitle}

设置页面标题，创建 **settitle** 元素。

**语法**

``` text
SetTitle(Title)
```

* SetTitle

  * Title

    页面标题。

**示例**

```text
SetTitle(My page)
```

### SetVar {#setvar}

分配值 *Value* 给指定变量 *Name*。

**语法**

``` text
SetVar(Name, Value)
```

* SetVar

  * Name

    变量名称。

  * Value

    变量值，可以包含对另一个变量的引用。

**示例**

```text
SetVar(name, John Smith).(out, I am #name#)
Span(#out#)      
```

### Span {#span}

创建 **span** HTML元素。

**语法**

``` text
Span(Body, Class)
    [.Style(Style)]
```

* Span

  * Body

    子文本或元素。

  * Class

    类名。

* Style

    指定CSS样式。

  * Style

    CSS样式。

**示例**

```text
This is Span(the first item, myclass1).
```

### Strong {#strong}

创建 **strong** HTML元素。

**语法**

``` text
Strong(Body, Class)
```

* Strong

  * Body

    子文本或元素。

  * Class

    类名。

**示例**

```text
This is Strong(the first item, myclass1).
```

### SysParam {#sysparam}

获取平台参数表 *platform ecosystem* 中指定参数的值。

**语法**

``` text
SysParam(Name) 
```

* SysParam

  * Name

    平台参数名称。

**示例**

```text
SysParam(max_columns)
```

### Table {#table}

创建 **table** HTML元素。

**语法**

``` text
Table(Source, Columns)
    [.Style(Style)]
```

* Table

  * Source

    指定的数据源名称。

  * Columns

    标题和相应的列名，例如： `Title1=column1,Title2=column2`。

* Style

    指定CSS样式。

  * Style

    CSS样式。

**示例**

```text
DBFind(mytable, mysrc)
Table(mysrc,"ID=id,Name=name")
```

### TransactionInfo {#transactioninfo}

该函数按指定哈希值查询交易并返回有关已执行的合约及其参数的信息。

**语法**

``` text
TransactionInfo(Hash)
```

* TransactionInfo

  * Hash

    十六进制字符串格式的交易哈希。

**返回值**

该函数返回json格式的字符串：

`{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}`

其中：
  - *contract* - 合约名称；
  - *params* - 传递给合约参数的数据；
  - *block* - 处理该交易的区块ID。

**示例**

```text
P(TransactionInfo(#hash#))
```

### VarAsIs {#varasis}

分配值 *Value* 给指定变量 *Name*。指定的变量值为指定的变量名而不是它们的值。

对于具有变量替换的版本，请参阅 [SetVar](#setvar).

**语法**

``` text
VarAsIs(Name, Value)
```

* VarAsIs

  * Name

    变量名称。

  * Value

    变量值，值中的变量名称不会被替换。 例如，如果 *Value* 是`example #varname#`，那么变量的值也是 `example #varname#`。

**示例**

```text
SetVar(Name,"John")
VarAsIs(name, I am #Name#)
Span(#name#) // I am #Name#
```

## 适配移动设备的应用程序样式 {#app-styles-for-mobile-devices}

### 排版 {#layout}

#### 标题 {#title}

-   `h1` \... `h6`

#### 强调类类名 {#strong-class-names}

-   `.text-muted`
-   `.text-primary`
-   `.text-success`
-   `.text-info`
-   `.text-warning`
-   `.text-danger`

#### 颜色 {#color}

-   `.bg-danger-dark`
-   `.bg-danger`
-   `.bg-danger-light`
-   `.bg-info-dark`
-   `.bg-info`
-   `.bg-info-light`
-   `.bg-primary-dark`
-   `.bg-primary`
-   `.bg-primary-light`
-   `.bg-success-dark`
-   `.bg-success`
-   `.bg-success-light`
-   `.bg-warning-dark`
-   `.bg-warning`
-   `.bg-warning-light`
-   `.bg-gray-darker`
-   `.bg-gray-dark`
-   `.bg-gray`
-   `.bg-gray-light`
-   `.bg-gray-lighter`

#### 网格 {#grid}

-   `.row`
-   `.row.row-table`
-   `.col-xs-1` \... `.col-xs-12` 仅限于使用在 `.row.row-table` 中。

#### 面板 {#panel}

-   `.panel`
-   `.panel.panel-heading`
-   `.panel.panel-body`
-   `.panel.panel-footer`

#### 表单 {#form-app}

-   `.form-control`

#### 按钮 {#button-app}

-   `.btn.btn-default`
-   `.btn.btn-link`
-   `.btn.btn-primary`
-   `.btn.btn-success`
-   `.btn.btn-info`
-   `.btn.btn-warning`
-   `.btn.btn-danger`

#### 图标 {#icon}

-   所有fa类图标来自FontAwesome: `fa fa-<icon-name></icon-name>`。
-   所有icon类图标来自SimpleLineIcons: `icon-<icon-name>`。
