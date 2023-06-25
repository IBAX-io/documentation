# Template Language {#template-language}

  - [Page construction](#page-construction)
    - [Template engine](#template-engine)
    - [Create pages](#create-pages)
      - [Visual page designer](#visual-page-designer)
      - [Applicable styles](#applicable-styles)
      - [Page module](#page-module)
      - [Language resource editor](#language-resource-editor)
  - [Logicor template language](#logicor-template-language)
    - [Logicor overview](#logicor-overview)
      - [Use PageParams to pass parameters to pages](#use-pageparams-to-pass-parameters-to-pages)
      - [Calling contracts](#calling-contracts)
  - [Logicor function classification](#logicor-function-classification)
    - [Operations on variables:](#operations-on-variables)
    - [Navigational operations:](#navigational-operations)
    - [Data manipulation:](#data-manipulation)
    - [Data presentation:](#data-presentation)
    - [Accepting of data:](#accepting-of-data)
    - [Data formatting elements:](#data-formatting-elements)
    - [Form elements:](#form-elements)
    - [Operations on code blocks:](#operations-on-code-blocks)
  - [Logicor function references](#logicor-function-references)
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

## Page construction {#page-construction}

Weaver's Integrated Development Environment (IDE) is created using React, a JavaScript library. It has a page editor and a visual page designer. Pages are basic parts of an application, which are used to retrieve and display data from tables, create forms for receiving user input data, pass data to contracts, and navigate between application pages. Like contracts, pages are stored in the blockchain, which can ensure they are tamper-proof when loaded in the software client.

### Template engine {#template-engine}

Page elements (pages and menus) are formed by developers in the template engine of a verification node using the template language in Weaver's page editor. All pages are constructed using the Logicor language developed by IBAX's development team. Use content/... API commands to request pages from nodes on the network. What the template engine sent as a response to this type of request is not an HTML page, but a JSON code composed of HTML tags that form a tree in accordance with the template structure. If you want to test the template engine, you can refer to the [content](../reference/api2.md#content) API command.

### Create pages {#create-pages}

You can use the page editor to create and edit pages, which can be found in the Pages section of Weaver's management tool. The editor can be used to:

* Write the page code, highlight the keywords of the Logicor template language;
* Select and display menus on pages;
* Edit the menu page;
* Configure the permission to change pages, by specifying the contract name with permission in the ContractConditions function, or by directly specifying the access permission in Change conditions;
* Start the visual page designer;
* Preview pages.

#### Visual page designer {#visual-page-designer}

The visual page designer can be used to create page layouts without using interface codes in the Logicor language. With it, you can set the position of form elements and text on pages by dragging and dropping such elements, and configure the size of page blocks. It provides a set of ready-to-use blocks for presenting standard data models: with titles, forms and information panels. After creating a page in the visual page designer, you can write program logic for receiving data and conditional structure in the page editor. In the future, we plan to create a visual page designer with additional functions.

#### Applicable styles {#applicable-styles}

By default, pages are presented with Angular's Bootstrap Angle style. Users can create their own styles according to needs. The style is stored in the style parameter stylesheet in the ecosystem parameter table.

#### Page module {#page-module}

To use a code block in multiple pages, you can create a page module to hold and embed it into the page code. Page modules can be created and edited in Weaver's Module Blocks. Like pages, editing permissions can be defined.

#### Language resource editor {#language-resource-editor}

Weaver includes a mechanism for page localization using a function **LangRes** of the Logicor template language. It could replace language resource tags on the page with text lines corresponding to the language selected by the user in the software client or browser. You can use the short syntax **$lable$** instead of the **LangRes** function. The translation of messages in popups initiated by the contract is performed by Needle's **LangRes** function.

You can create and edit language resources in the Language resources section of Weaver. A language resource consists of label names and corresponding translation of such name in different languages, as well as the corresponding two-letter language identifier (EN, ZH, JP, etc.).

The permissions for adding and changing language resources can be defined in the same way as other tables.

## Logicor template language {#logicor-template-language}

Logicor functions provide the following operations:

* Retrieving values from the database: ```DBFind```, showing data retrieved from the database as tables and charts;
* Data operations for assigning and displaying variable values: ```SetVar, GetVar, Data```;
* Displaying and comparing date/time values: ```DateTime, Now, CmpTime```;
* Use various user data input fields to build forms: ```Form, ImageInput, Input, RadioGroup, Select```;
* Verify the data in the form field by displaying error messages: ```Validate, InputErr```;
* Displaying the navigation elements: ```AddToolButton, LinkPage, Button```;
* Calling contracts: ```Button```;
* Creating HTML page layout elements, including various tags, and choosing specific css classes: ```Div, P, Span, etc```;
* Embedding and unloading images onto pages: ```Image, ImageInput```;
* Displaying conditions of page layout fragment: ```If, ElseIf, Else```;
* Creating multi-level menus;
* Page localization.

### Logicor overview {#logicor-overview}

The Logicor page template language is a functional language that allows a function calling another function ```FuncName(parameters)``` and nesting functions into each other. You can specify parameters without quotes, and delete unnecessary parameters.

If the parameter contains a comma, it should be enclosed in quotes (backquotes or double quotes). If a function can only have one parameter, you can use a comma without quotes. In addition, if the parameter has an unpaired closing parenthesis, quotes should be used.

If you put a parameter in quotes, but the parameter itself contains quotes, you can use different types of quotes or multiple quotes in the text.

In the function definition, each parameter has a specific name. You can call the function and specify the parameters in the order of declaration, or any parameter set in any order of name: ```Parameter_name: Parameter_value```. Using this method, you can safely add new function parameters without breaking compatibility with the current template:

Functions can return texts, generate HTML elements (e.g. ```Input```), or create HTML elements with nested HTML elements (```Div, P, Span```). In the latter case, a parameter with the predefined name Body is used to define the nested element. For example, nesting two divs in another div looks like this:

To define the nested elements described in the Body parameter, the following notation can be used: ```FuncName(...){...}```. Nested elements should be specified with braces:

If you need to specify the same function multiple times in succession, you can use the dot `.` instead of writing its name every time. For example, the following are the same:

With this language, you can assign a variable with the SetVar function and refer its value with `#name#`.

To refer to the language resources of the ecosystem, you can use `$langres$`, where langres is the language name.

The following variables are predefined:

* `#key_id#` - Account address of the current user;
* `#ecosystem_id#` - Current ecosystem ID;
* `#guest_key#` - Address of the guest account;
* `#isMobile#` - 1, if Weaver runs on a mobile device.

#### Use PageParams to pass parameters to pages {#use-pageparams-to-pass-parameters-to-pages}

Many functions support the PageParams parameter, which is used to pass parameters when redirecting to a new page. For example: PageParams: `"param1=value1,param2=value2"`. The parameter value can be a simple string or a variable with a reference value. When passing parameters to pages, a variable with the parameter name is created, e.g. `#param1#` and `#param2#`.

* `PageParams: "hello=world"` - The new page receives the hello parameter with world as the value;
* `PageParams: "hello=#world#"` - The new page receives the hello parameter with the value of the world variable.

In addition, the Val function can get data from forms, which is specified in the redirection.

* `PageParams: "hello=Val(world)"` - The new page receives the hello parameter with the value of the world form element.

#### Calling contracts {#calling-contracts}

Logicor implements contract calls by clicking the Button function in a form. Once an event is triggered, the data entered by the user in a form field on the page will be passed to the contract. If the form field name corresponds to the variable name in the data section of the contract called, the data will be automatically transferred. The Button function allows to open a modal window for the user to verify the contract execution, and initiate the redirection to the specified page when the contract is successfully executed, and pass certain parameters to the page.

## Logicor function classification {#logicor-function-classification}

### Operations on variables: {#operations-on-variables}

|        |        |         |
| ------ | ------ | ------- |
| [GetVar](#getvar) | [SetVar](#setvar) | [VarAsIs](#varasis) |

### Navigational operations: {#navigational-operations} 

|               |        |          |
| ------------- | ------ | -------- |
| [AddToolButton](#addtoolbutton) | [Button](#button) | [LinkPage](#linkpage) |

### Data manipulation: {#data-manipulation}

|           |          |       |
| --------- | -------- | ----- |
| [Calculate](#calculate) | [DateTime](#datetime) | [Money](#money) |
| [CmpTime](#cmptime)   |          |       |

### Data presentation: {#data-presentation}

|          |           |          |
| -------- | --------- | -------- |
| [Code](#code)     | [Hint](#hint)      | [MenuItem](#menuitem) |
| [CodeAsIs](#codeasis) | [Image](#image)     | [QRcode](#qrcode)   |
| [Chart](#chart)    | [MenuGroup](#menugroup) | [Table](#table)    |
| [ForList](#forlist)  |           |          |

### Accepting of data: {#accepting-of-data}

|             |               |                 |
| ----------- | ------------- | --------------- |
| [Address](#address)     | [EcosysParam](#ecosysparam)   | [LangRes](#langres)         |
| [AddressToId](#addresstoid) | [GetHistory](#gethistory)    | [Range](#range)           |
| [AppParam](#appparam)    | [GetColumnType](#getcolumntype) | [SysParam](#sysparam)        |
| [Data](#data)        | [JsonToSource](#jsontosource)  | [Binary](#binary)          |
| [DBFind](#dbfind)      | [ArrayToSource](#arraytosource) | [TransactionInfo](#transactioninfo) |

### Data formatting elements: {#data-formatting-elements}

|      |          |        |
| ---- | -------- | ------ |
| [Div](#div)  | [SetTitle](#settitle) | [Span](#span)   |
| [Em](#em)   | [Label](#label)    | [Strong](#strong) |
| [P](#p)    |          |        |

### Form elements: {#form-elements}

|            |            |          |
| ---------- | ---------- | -------- |
| [Form](#form)       | [InputErr](#inputerr)   | [InputMap](#inputmap) |
| [ImageInput](#imageinput) | [RadioGroup](#radiogroup) | [Map](#map)      |
| [Input](#input)      | [Select](#select)     |          |

### Operations on code blocks: {#operations-on-code-blocks}

|      |      |         |
| ---- | ---- | ------- |
| [If](#if)   | [Or](#or)   | [Include](#include) |
| [And](#and)  |      |         |



## Logicor function references {#logicor-function-references}

### Address {#address}

This function returns the wallet address `xxxx-xxxx-...-xxxx` of a specific account address; if no address is specified, the account address of the current user will be used as the parameter.

**Syntax**

```
Address(account)

```
> Address
  * `account`
  
    Account address.

**Example**

```
Span(Your wallet: Address(#account#))
```

### AddressToId {#addresstoid}

It returns the account address of a specific wallet address xxxx-xxxx-...-xxxx.

**Syntax**

```
AddressToId(Wallet)
```

> AddressToId
  * `Wallet`
  
    The wallet address in XXXX-...-XXXX format.

**Example**

```
AddressToId(#wallet#)
```

### AddToolButton {#addtoolbutton}

Create a button panel with an addtoolbutton element.

**Syntax**

```
AddToolButton(Title, Icon, Page, PageParams)
 [.Popup(Width, Header)]
```



> AddToolButton

  * `Title`
  
    Button title.

  * `Icon`
  
    Button icon style.

  * `Page`
  
    Name of the page redirects to.

  * `PageParams`
  
    The parameters passed to the page.

    

> Popup

  The modal window pops up.
  * `Header`

    Title of the window.
  * `Width`

      Percentage of window width.
      Its range is 1 to 100.

**Example**

```
AddToolButton(Title: $@1broadcast$, Page: @1notifications_broadcast, Icon: icon-plus).Popup(Header: $@1notifications_broadcast$, Width: "50")
```

### And {#and}

It returns the result of an and logical operation. All parameters listed in parentheses are separated by commas. If one of the parameters is an empty string, zero or `false`, the parameter value is `false`, otherwise the parameter value is `true`. If the parameter value is `true`, the function returns `1`, otherwise it returns `0`.

**Syntax**

```
And(parameters)
```

**Example**

```
If(And(#myval1#,#myval2#), Span(OK))
```

### AppParam {#appparam}

Output the application parameter value, which is taken from the app_params table of the current ecosystem. If there is a language resource with the specified name, its value will be automatically replaced.

**Syntax**
```
AppParam(App, Name, Index, Source)

```

> AppParam
  * `App`
  
    Application ID.
  * `Name`

    Parameter name.
  * `Index`

    It can be used when the parameter value is a comma-separated list.
    The parameter elements index, starting from 1. For example, if `type = full,light`, then `AppParam(1, type, 2)` returns `light`.
    It cannot be used in conjunction with the Source parameter.
  * `Source`

    It can be used when the parameter value is a comma-separated list.
    Create a data object whose elements are the values of specific parameters. This object can be used as a data source for the [Table](#table) and [Select](#select) functions.
    It cannot be used in conjunction with the Index parameter.

**Example**

```
AppParam(1, type, Source: mytype)
```

### ArrayToSource {#arraytosource}

Create an arraytosource element and fill it with the key-value pairs of a JSON array. The data obtained is put into the Source element, which can be used later in the source input function (e.g. Table).

**Syntax**
```
ArrayToSource(Source, Data)

```

> ArrayToSource
  * `Source`
  
    Data source name.
  * `Data`

    A JSON array or a variable name containing a JSON array (`#name#`).

**Example**

```
ArrayToSource(src, #myjsonarr#)
ArrayToSource(dat, [1, 2, 3])
```

### Binary {#binary}

Returns links to static files stored in the binary table binaries.

**Syntax**
```
Binary(Name, AppID, MemberID)[.ById(ID)][.Ecosystem(ecosystem)]
```

> Binary
  * `Name`
  
    File name.
  * `AppID`
  
    Application ID.
  * `MemberID`

    Account address, 0 by default.
  * `ID`

    Static file ID.
  * `Ecosystem`

    Ecosystem ID. If it is not specified, the binary file is requested from the current ecosystem.

**Example**

```
Image(Src: Binary("my_image", 1))
Image(Src: Binary().ById(2))
Image(Src: Binary().ById(#id#).Ecosystem(#eco#))
```

### Button {#button}

Create a button HTML element which will create a button to call a contract or open a page.

**Syntax**
```
Button(Body, Page, Class, Contract, Params, PageParams)
 [.CompositeContract(Contract, Data)]
 [.Alert(Text, ConfirmButton, CancelButton, Icon)]
 [.Popup(Width, Header)]
 [.Style(Style)]
 [.ErrorRedirect(ErrorID,PageName,PageParams)]
```

> Button
  * `Body`
  
    Child text or element.
  * `Page`

    Name of the page redirects to.
  * `Class`

    Button class.
  * `Contract`

    Name of the contract called.
  * `Params`

    The list of values passed to the contract. Normally, the value of the contract parameter (the data section) is obtained from an HTML element (such as an input field) of id with a similar name. If the element id is different from the name of the contract parameter, then the value should be assigned in the format of contractField1=idname1, contractField2=idname2. This parameter is returned to attr as the object {contractField1: idname1, contractField2: idname2}.
  * `PageParams`

    The format of parameters passed to the redirect page is pageField1=idname1, pageField2=idname2. Variables with target page parameter names #pageField1 and #pageField2 are created on the target page and assigned the specified values. See more specifications for parameter passing Use PageParams to pass parameters to pages).
  
> CompositeContract

  Used to add additional contracts to the button. CompositeContract can be used multiple times.
  * `Name`

    Name of the contract.
  * `Data`

    The contract parameters are JSON arrays.
> Alert

  Display the message.
  * `Text`

    Text of the message.
  * `ConfirmButton`
  
    Title of the Confirm button.
  * `CancelButton`

    Title of the Cancel button.
  * `Icon`

    Button icon.
> Popup

  Output modal window.
  * `Header`

    Window title.
  * `Width`

    Percentage of window width.
    Its range is 1 to 100.
> Style

  The CSS style specified.
  * `Style`

    CSS style.
> ErrorRedirect

 Specify and redirect to a page when the :ref:contractfundef-Throw function generates an error during contract execution. There can be several ErrorRedirect calls. Therefore, when returning the *errredirect* attribute, the attribute key is ErrorID and the value is the parameters list.

  * `ErrorID`

    Error ID.

  * `PageName`

    Name of the redirect page.

  * `PageParams`

    Parameters passed to the page.

**Example**

```
Button(Submit, default_page, mybtn_class).Alert(Alert message)
Button(Contract: MyContract, Body:My Contract, Class: myclass, Params:"Name=myid,Id=i10,Value")
```

### Calculate {#calculate}
It returns the result of the arithmetic expression passed in the Exp parameter. The following operations are applicable: +, -, *, / and brackets ().

**Syntax**
```
Calculate(Exp, Type, Prec)
```

> Calculate
  * `Exp`

    An arithmetic expression, containing numbers and the #name# variable.
  * `Type`

    Result data type: int, float, money. If not specified, it is float if there is a number with a decimal point, otherwise it is int.
  * `Prec`

    float and money data, with two significant digits after the decimal point.

**Example**

```
Calculate( Exp: (342278783438+5000)\*(#val#-932780000), Type: money, Prec:18 )
Calculate(10000-(34+5)\*#val#)
Calculate("((10+#val#-45)\*3.0-10)/4.5 + #val#", Prec: 4)
```

### Chart {#chart}

Create HTML charts.

**Syntax**
```
Chart(Type, Source, FieldLabel, FieldValue, Colors)
```

> Chart
  * `Type`

    Chart type.
  * `Source`

    Name of the data source, e.g., obtained from the [DBFind](#dbfind) function.
  * `FieldLabel`

    Name of the header field.
  * `FieldValue`

    Name of the value field.
  * `Colors`

    List of colors.

**Example**

```
Data(mysrc,"name,count"){
    John Silver,10
    "Mark, Smith",20
    "Unknown ""Person""",30
}
Chart(Type: "bar", Source: mysrc, FieldLabel: "name", FieldValue: "count", Colors: "red, green")
```

### CmpTime {#cmptime}

It compares two time values in the same format.
It supports unixtime, `YYYY-MM-DD HH:MM:SS` and any time format, such as `YYYYMMDD`.

**Syntax**

```
CmpTime(Time1, Time2)
```


Return value

* `-1` - Time1 <Time2;
* `0` - Time1 = Time2;
* `1` - Time1> Time2.

**Example**

```
If(CmpTime(#time1#, #time2#)<0){...}
```

### Code {#code}

Create a code element to display the specified code.

It substitute a variable with the value of the variable (for example, `#name#`).
**Syntax**
```
Code(Text)
```

> Code
  * `Text`

    Source code.

**Example**

```
Code( P(This is the first line.
    Span(This is the second line.))
)
```

### CodeAsIs {#codeasis}

Create a code element to display the specified code.
It does not replace a variable with its value. For example, `#name#` will be displayed as is.

**Syntax**
```
CodeAsIs(Text)
```

> CodeAsIs
  * `Text`

    Source code.

**Example**

```
CodeAsIs( P(This is the #test1#.
    Span(This is the #test2#.))
)
```

### Data {#data}

Create a data element, fill it with the specified data and put it in Source. Then, you can receive Source as a data input in [Table](#table) and other functions. The sequence of column names corresponds to the sequence of data entry values.

**Syntax**
```
Data(Source,Columns,Data)
 [.Custom(Column){Body}]
```

> Data
  * `Source`

    Name of the data source. You can specify any name that will be passed to other functions later as a data source.

  * `Columns`

    A list of column names, separated by commas.

  * `Data`

    Data set.

    One record per line. Column values must be separated by commas. Data and Columns should be set in the same order.

    Values with commas should be enclosed in double quotes (`"example1, example2", 1, 2`). Quoted values should be put in two double quotes (`"""example", "example2""", 1, 2`).

    

### Custom {#custom}

    You can assign calculated columns to Data. For example, you can specify field templates for buttons and other page layout elements. These field templates are usually assigned to [Table](#table) and other functions to receive data.
    Use multiple Custom functions if you want to assign multiple calculated columns.

  * `Column`

    Column name, which is unique and compulsory.

  * `Body`

    Code block. You can use `#columnname#` to get values from other columns in the entry, and then use those values in code blocks.

**Example**

```
Data(mysrc,"id,name"){
    "1",John Silver
    2,"Mark, Smith"
    3,"Unknown ""Person"""
 }.Custom(link){Button(Body: View, Class: btn btn-link, Page: user, PageParams: "id=#id#"}
```

### DateTime {#datetime}

Display the time and date in the specified format.

**Syntax**
```
DateTime(DateTime, Format)
```

> DateTime
  * `DateTime`

    Time and date expressed in unixtime or standard format `2006-01-02T15:04:05`.
  * `Format`

    Format template: year in 2-digit format `YY`, 4-digit format `YYYY`, month in `MM`, day in `DD`, hour in `HH`, minute in `MM`, second in `SS`, e.g.: `YY/MM/DD HH:MM`.
    If it is not specified or missing, `YYYY-MM-DD HH:MI:SS` will be used.

**Example**

```
DateTime(2017-11-07T17:51:08)
DateTime(#mytime#,HH:MI DD.MM.YYYY)
```

### DBFind {#dbfind}

Create a dbfind element, fill it with the data of the table table and put it in the Source structure, which can later be used for the input data of [Table](#table) and other functions Source.

**Syntax**
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

    Table name.
  * `Source`

    Data source name.

> Columns
  * `columns`

    If not specified, a list of all fields will be returned. If there is a JSON type field, you can use the following syntax to process the record field: `columnname->fieldname`. In this case, the field name generated is `columnname.fieldname`.

> Where
  * `conditions`

   Data query conditions. See DBFind.
   If there is a JSON type field, you can use the following syntax to process the record field:      `columnname->fieldname`.

> WhereId
  Query by ID, e.g. `.WhereId(1)`.
  * `Id`

   Entry ID.

> Order
  Sort by field.
  For more information about the sorting syntax, see [DBFind](#dbfind).
  * `name`

   Field Name

> Limit
  * `limit`
  
    The number of entries returned, 25 by default. The maximum number is 10,000.

> Offset
  * `Offset`

    Offset.

> Count

  Specify the total number of rows of the Where condition.
  In addition to storing it in a variable, the total count is returned in the count parameter of the dbfind element.

  If Where and WhereID are not specified, the total count of rows in the table will be returned.

  * `countvar`

    Name of the variable that holds the row count.

> Ecosystem
  * `Id`

   Ecosystem ID. By default, the data comes from the specified table in the current ecosystem.

> Cutoff

  Used to cut and display large amounts of text data.
  * `columns`

   A comma-separated list of fields that must be processed by the Cutoff function.
   The field value will be replaced by a JSON object that has two fields: link link and title title. If the field value contains more than 32 characters, link pointing to the first 32 characters of the full text is returned. If the field value contains 32 characters or less, link is set to void and title contains the complete field value.

> Custom

  You can assign calculated columns to Data. For example, you can specify field templates for buttons and other page layout elements. These field templates are usually assigned to [Table](#table) and other functions to receive data.
  If you want to assign multiple calculated columns, use multiple Custom functions.
  * `Column`

   Column name, which is unique and compulsory.
  * `Body`

   Code block. You can use `#columnname#` to get values from other columns in the entry, and then use those values in code blocks.

> Vars

  The first row obtained by the query will generate a set of variables with values. When it is specified, the Limit parameter automatically becomes 1, and only one (1) record is returned.
  * `Prefix`

   The prefix added to the variable name. Its format is `#prefix_columnname#`, where the column name immediately follows the underscore symbol. If there is a column containing a JSON field, the variable generated will be in the following format: `#prefix_columnname_field#`.

**Example**

```
DBFind(parameters,myparam)
DBFind(parameters,myparam).Columns(name,value).Where({name:"money"})
DBFind(parameters,myparam).Custom(myid){Strong(#id#)}.Custom(myname){
   Strong(Em(#name#))Div(myclass, #company#)
}
```

### Div {#div}

Create a div HTML element.

**Syntax**
```
Div(Class, Body)
 [.Style(Style)]
 [.Show(Condition)]
 [.Hide(Condition)]
```

> Div
  * `Class`

    Class name of the div.
  * `Body`

    Child element.
> Style

  The CSS style specified.
  * `Style`

   CSS style.
> Show

 Define the conditions for displaying Div.
   * `Condition`

   See Hide below.
> Hide

 Define the conditions for hiding Div.
   * `Condition`

   The expression format is `InputName=Value`, when all expressions are true, *Condition* is true, and when the value of `InputName` is equal to `Value`, *Condition* is true. If multiple *Show* or *Hide* are called, there must be at least one *Condition* parameter is true.

**Example**

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

### EcosysParam {#ecosysparam}

This function obtains parameter values from the ecosystem parameter table of the current ecosystem. If the returned result name contains the language resources, it will be translated accordingly.

**Syntax**
```
EcosysParam(Name, Index, Source)
```

> EcosysParam
  * `Name`

    Parameter name.
  * `Index`

    If the requested parameter is a list of comma-separated elements, you can specify an index starting from 1. For example, if `gender = male,female`, then `gender = male,female` returns `female`.
    It cannot be used in conjunction with the Source parameter.
  * `Source`

    It can be used when the parameter value is a comma-separated list.
    Create a data object whose elements are the values of the specified parameters. This object can be used as a data source for the [Table](#table) and [Select](#select) functions.
    It cannot be used in conjunction with the Index parameter.

```
Address(EcosysParam(founder_account))
EcosysParam(gender, Source: mygender)

EcosysParam(Name: gender_list, Source: src_gender)
Select(Name: gender, Source: src_gender, NameColumn: name, ValueColumn: id)
```

### Em {#em}

Create an em HTML element.

**Syntax**
```
Em(Body, Class)
```

> Em
  * `Body`

    Child text or element.
  * `Class`

    The em class name.

**Example**

```
This is an Em(important news).
```

### ForList {#forlist}

Display the list of elements in the Source data source in the template format set in Body and create a **forlist** element.

**Syntax**
```
ForList(Source, Index){Body}
```

> ForList
  * `Source`

    Data source obtained from the [DBFind](#dbfind) or [Data](#data) function.
  * `Index`

    The variable of the iteration counter, starting from 1.
    An optional parameter. If not specified, the iteration count value will be written to the [Source] _index variable.
  * `Body`

    Template for inserting elements.

```
ForList(mysrc){Span(#mysrc_index#. #name#)}
```

### Form {#form}
   Create a form HTML element.

**Syntax**
```
Form(Class, Body) [.Style(Style)]
```
> Form
  * `Body`

    Child text or element.
  * `Class`

    Class name of the form.
> Style
  The CSS style specified.
  * `Style`

   CSS style.

**Example**

```
Form(class1 class2, Input(myid))
```

### GetColumnType {#getcolumntype}

Returns the field data type of a specific table.

Types returned include: `text, varchar, number, money, double, bytes, json, datetime, double`.
**Syntax**

```
GetColumnType(Table, Column)
```

> GetColumnType
  * `Table`

    Table name.
  * `Column`

    Field name.

**Example**

```
SetVar(coltype,GetColumnType(members, member_name))Div(){#coltype#}
```

### GetHistory {#gethistory}

Create a gethistory element and fill it with the history change records of the entries in the specified table. The data generated will be placed in the Source element, which can be used later in the source input function (for example, [Table](#table)).
The array is sorted in order from the last modified.
The id field in the array points to the id of the rollback_tx table. block_id represents the block ID, block_time represents the block generation timestamp.

**Syntax**
```
GetHistory(Source, Name, Id, RollbackId)
```

> GetHistory
  * `Source`

    Data source name.
  * `Name`

    Table name.
  * `Id`

    Entry ID.
  * `RollbackId`

    An optional parameter. If specified, only one record with the specified ID will be returned from the rollback_tx table.

**Example**

```
GetHistory(blocks, BlockHistory, 1)
```

### GetVar {#getvar}

It returns the value of the specified variable that already exists, or an empty string if it does not exist.
The getvar element is only created when an editable tree is requested. The difference between `GetVar(varname)` and `#varname` is that if varname does not exist, GetVar will return an empty string, while #varname# will be interpreted as a string value.

**Syntax**
```
GetVar(Name)
```

> GetVar
  * `Name`

    Variable name.

**Example**

```
If(GetVar(name)){#name#}.Else{Name is unknown}
```

### Hint {#hint}

Create a hint element for hints.

**Syntax**
```
Hint(Icon,Title,Text)
```

> Hint
  * `Icon`

    Icon name.
  * `Title`

    Hint title.
  * `Text`

    Hint text.

**Example**

```
Hint(Icon: "icon-wrench",Title:$@1pa_settings$,Text: This is a hint text)
```

### If {#if}

Condition statement.
Returns the first If or ElseIf child element that satisfies Condition. Otherwise, return the Else child element.

**Syntax**
```
If(Condition){ Body}
 [.ElseIf(Condition){ Body }]
 [.Else{ Body }]
```

> If
  * `Condition`

    If the condition is equal to an empty string, 0 or false, it is considered that the condition is not met. In all other cases, this condition is considered to be satisfied.
  * `Body`

    Child element.

**Example**

```
If(#value#){
   Span(Value)
}.ElseIf(#value2#){Span(Value 2)
}.ElseIf(#value3#){Span(Value 3)}.Else{
   Span(Nothing)
}
```

### Image {#image}
Create a image HTML element.

**Syntax**
```
Image(Src, Alt, Class)
 [.Style(Style)]
```

> Image
  * `Src`

    Image source, file or `data:...`
  * `Alt`

    Alternative text when the image cannot be displayed.
  * `Сlass`

    Image class name.

**Example**

```
Image(Src: Binary().ById(#id#), Class: preview).Style(height: 40px; widht 40px;)
```

### ImageInput {#imageinput}

Create an imageinput element to upload an image.

**Syntax**
```
ImageInput(Name, Width, Ratio, Format)
```

> ImageInput
  * `Name`

    Element name.
  * `Width`

    Width of the cropped image.
  * `Ratio`

    Aspect ratio or image height.
  * `Format`

    The format of the uploaded image.

**Example**

```
ImageInput(avatar, 100, 2/1)
```

### Include {#include}

Insert the template with a specified name into the page code.

**Syntax**
```
Include(Name)
```

> Include
  * `Name`

    Template name.

**Example**

```
Div(myclass, Include(mywidget))
```

### Input {#input}

Create an input HTML element.

**Syntax**
```
Input(Name, Class, Placeholder, Type, Value, Disabled)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Input
  * `Name`

    Element name.
  * `Class`

    Class name.
  * `Placeholder`

    Prompt for the expected value of the input field.
  * `Type`

    input type.
  * `Value`

    Element value.
  * `Disabled`

    Disable the input element.
> Validate

  Validate the parameter.
> Style

  The CSS style specified.
  * `Style`

    CSS style.

**Example**

```
Input(Name: name, Type: text, Placeholder: Enter your name)
Input(Name: num, Type: text).Validate(minLength: 6, maxLength: 20)
```

### InputErr {#inputerr}

Create an inputerr element to validate the error text.

**Syntax**
```
InputErr(Name,validation errors)]
```

> InputErr
  * `Name`

    Corresponds to the name of the [Input](#input) element.
  * `validation errors`

    Validation error message for one or more parameters.

**Example**

```
InputErr(Name: name,
minLength: Value is too short,
maxLength: The length of the value must be less than 20 characters)
```

### InputMap {#inputmap}

Create an text input field for address, able to select coordinates on the map.

**Syntax**
```
InputMap(Name, Type, MapType, Value)
```

> InputMap
  * `Name`

    Element name.
  * `Value`

    Default value.
    The value is an object in string format. For example, `{"coords":[{"lat":number,"lng":number},]}` or `{"zoom":int, "center":{"lat":number,"lng": number}}`. When the InputMap is created with the predefined Value, the address field can be used to save the address value, so the it is not void.
  * `Type`

    Type of map spot mapping:
    * `polygon` - indicates the area of a multi-spot closed loop;
    * `Line` - means a polyline with multiple points without closed loop;
    * `Point` - indicates a single point coordinate.
  * `MapType`

    Map type.
    It has the following values: `hybrid, roadmap, satellite, terrain`.

**Example**

```
InputMap(Name: Coords,Type: polygon, MapType: hybrid, Value: `{"zoom":8, "center":{"lat":55.749942860682545,"lng":37.6207172870636}}`)
```

### JsonToSource {#jsontosource}

Create a jsontosource element and fill it with the key-value pairs of a JSON array. The data obtained is put into the Source element, which can be used later in the source input function (e.g. [Table](#table)).
The records in the result data are sorted alphabetically by JSON key.

**Syntax**
```
JsonToSource(Source, Data)
```

> JsonToSource
  * `Source`

    Data source name.
  * `Data`

    A JSON object or a variable name containing a JSON object (`#name#`).

**Example**

```
JsonToSource(src, #myjson#)
JsonToSource(dat, {"param":"value", "param2": "value 2"})
```

### Label {#label}

Create a label HTML element.

**Syntax**
```
Label(Body, Class, For)
 [.Style(Style)]
```

> Label
  * `Body`

    Child text or element.
  * `Class`

    Class name.
  * `For`

    Bind to a form element.
> `StyleThe`:CSS style specified.
  * `Style`

    CSS style.

**Example**

```
Label(The first item).
```

### LangRes {#langres}

Returns a specific language resource. If requested to edit the tree, the langres element is returned, and you may use the short format symbol $langres$.
**Syntax**

```
LangRes(Name)
```

> LangRes
  * `Name`

    Name of the language resource.

**Example**

```
LangRes(name)
LangRes(myres)
```

### LinkPage {#linkpage}

Create a linkpage element, linking to the page.
**Syntax**

```
LinkPage(Body, Page, Class, PageParams)
 [.Style(Style)]
```

> LinkPage
  * `Body`

    Child text or element.
  * `Page`

    Name of the redirect page.
  * `Class`

    Button class name.
  * `PageParams`

    Redirect page parameters.
> Style

  The CSS style specified.
  * `Style`

  CSS styles
  
**Example**

```
LinkPage(Class: #style_link# h5 text-bold, Page: @1roles_view, PageParams: "v_role_id=#recipient.role_id#")
```

### Map {#map}

Create a visual map and display coordinates in any format.

**Syntax**
```
Map(Hmap, MapType, Value)
```

> Map
  * `Hmap`

    Height of an HTML element on the page.
    The default value is 100.
  * `Value`

    Map value, an object in string format.
    For example, `{"coords":[{"lat":number,"lng":number},]}` or `{"zoom":int, "center":{"lat":number,"lng": number}}`. If `center` is not specified, the map window will automatically adjust according to the specified coordinates.
  * `MapType`

    Map type.
    It has the following values: `hybrid, roadmap, satellite, terrain`.

**Example**

```
Map(MapType:hybrid, Hmap:400, Value:{"coords":[{"lat":55.58774531752405,"lng":36.97260184619233},{"lat":55.58396161622043,"lng":36.973803475831005},{"lat":55.585222890513975,"lng":36.979811624024364},{"lat":55.58803635636347,"lng":36.978781655762646}],"area":146846.65783403456,"address":"Unnamed Road, Moscow, Russia, 143041"})
```

### MenuGroup {#menugroup}

Create a nested submenu in the menu and return the menugroup element. Before replacing it with the language resource, the name parameter will return the value of Title.

**Syntax**
```
MenuGroup(Title, Body, Icon)
```
> MenuGroup

  * `Title`

    Name of the menu item.

  * `Body`

    Child elements in a submenu.

  * `Icon`

    Icon.

**Example**

```
MenuGroup(My Menu){
    MenuItem(Interface, sys-interface)
    MenuItem(Dahsboard, dashboard_default)
}
```

### MenuItem {#menuitem}

Create a menu item and return the menuitem element.

**Syntax**
```
MenuItem(Title, Page, Params, Icon)
```

> MenuItem

  * `Title`

    Name of the menu item.

  * `Page`

    Name of the redirect page.

  * `Params`

    Redirect page parameters.

  * `Icon`

    Icon.

**Example**

```
MenuItem(Title:$@1roles$, Page:@1roles_list, Icon:"icon-pie-chart")
```

### Money {#money}

Returns the string value of exp / 10 ^ digit.

**Syntax**
```
Money(Exp, Digit)
```

> Money

  * `Exp`

    A number in string format.

  * `Digit`

    The exponent of 10 in the expression `Exp/10^digit`. The value can be positive or negative, and a positive value determines the number of digits after the decimal point.

**Example**

```
Money(Exp, Digit)
```

### Or {#or}

It returns the result of an if logical operation. All parameters listed in parentheses are separated by commas. If having one parameter that is value is not an empty string, zero or `false`, the parameter value is `true`, otherwise the parameter value is `false`. If the parameter value is `true`, the function returns `1`, otherwise it returns `0`.

**Syntax**
```
Or(parameters)
```


**Example**

```
If(Or(#myval1#,#myval2#), Span(OK))
```

### P {#p}

Create a p HTML element.

**Syntax**
```
P(Body, Class)
 [.Style(Style)]
```

> P

  * `Body`

    Child text or element.

  * `Class`

    Class name.

> Style

The CSS style specified.

  * `Style`

    CSS style.

**Example**

```
P(This is the first line.
  This is the second line.)
```

### QRcode {#qrcode}

Returns the QR code with the specified text and create a qrcode element.

**Syntax**
```
QRcode(Text)
```

> QRcode
  * `Text`

    QR code text.

**Example**

```
QRcode(#name#)
```

### RadioGroup {#radiogroup}

Create a radiogroup element.

**Syntax**
```
RadioGroup(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> RadioGroup

  * `Name`

    Element name.

  * `Source`

    Data source obtained from the DBFind or Data function.

  * `NameColumn`

    Field name of the data source.

  * `ValueColumn`

    Value name of the data source.
    Fields created with Custom cannot be used in this parameter.

  * `Value`

    Default value.

  * `Class`

    Class name.

> Validate

  Validate the parameter.

> Style

  The CCS style specified.

  * `Style`

    CSS style.

**Example**

```
RadioGroup(Name: type_decision, Source: numbers_type_decisions, NameColumn: name, ValueColumn: value)
```

### Range {#range}

Create a range element, use step size Step from From to To (not including To) to fill integer elements. The data generated will be put into Source and can be used later in the function of the source input (e.g. [Table](#table)). If an invalid parameter is specified, an empty Source is returned.

**Syntax**
```
Range(Source,From,To,Step)
```

> Range

  * `Source`

    Data source name.

  * `From`

    Starting value (i = From).

  * `To`

    End value (i <To).

  * `Step`

    Step of value change. If it is not specified, the default value is 1.

**Example**

```
Range(my,0,5)
SetVar(from, 5).(to, -4).(step,-2)
Range(Source: neg, From: #from#, To: #to#, Step: #step#)
```

### Select {#select}

Create a select HTML element.

**Syntax**
```
Select(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Select

  * `Name`

    Element name.

  * `Source`

    Data source obtained from the [DBFind](#dbfind) or [Data](#data) function.

  * `NameColumn`

    Field name of the data source.

  * `ValueColumn`

    Value name of the data source.
    Fields created with [Custom](#custom) cannot be used in this parameter.

  * `Value`

    Default value.

  * `Class`

    Class name.

> Validate

  Validate the parameter.

> Style

  The CCS style specified.

  * `Style`

    CSS style.

**Example**

```
DBFind(mytable, mysrc)
Select(mysrc, name)
```

### SetTitle {#settitle}

To set the page title and create a settitle element.

**Syntax**
```
SetTitle(Title)
```

> SetTitle
  * `Title`

    Page title.

**Example**

```
SetTitle(My page)
```

### SetVar {#setvar}

Assign the value Value to the specified variable Name.

**Syntax**
```
SetVar(Name, Value)
```

> SetVar

  * `Name`

    Variable name.

  * `Value`

    Variable value, may contain a reference to another variable.

**Example**

```
SetVar(name, John Smith).(out, I am #name#)
Span(#out#)
```

### Span {#span}

Create a span HTML element.

**Syntax**
```
Span(Body, Class)
 [.Style(Style)]
```

> Span

  * `Body`

    Child text or element.

  * `Class`

    Class name.

> Style

  The CCS style specified.

  * `Style`

    CSS style.

**Example**

```
This is Span(the first item, myclass1).
```

### Strong {#strong}

Create a strong HTML element.

**Syntax**
```
Strong(Body, Class)
```

> Strong

  * `Body`

    Child text or element.

  * `Class`

    Class name.

**Example**

```
This is Strong(the first item, myclass1).
```

### SysParam {#sysparam}

Get the value of a specific parameter in the platform parameter table system_parameters.

**Syntax**
```
SysParam(Name)
```

> SysParam
  * `Name`

    Name of the platform parameter.

**Example**

```
SysParam(max_columns)
```

### Table {#table}

Create a table HTML element.

**Syntax**
```
Table(Source, Columns)
 [.Style(Style)]
```

> Table

  * `Source`

    Name of a specific data source.

  * `Columns`

    Title and corresponding column name, e.g.: Title1=column1,Title2=column2.

> Style

  The CSS style specified.

  * `Style`

    CSS style.

**Example**

```
DBFind(mytable, mysrc)
Table(mysrc,"ID=id,Name=name")
```

### TransactionInfo {#transactioninfo}

It queries transactions by specified hash and returns information about the executed contracts and their parameters.

**Syntax**
```
TransactionInfo(Hash)
```

> TransactionInfo
  * `Hash`

    Transaction hashes in hexadecimal string format.
> Return value

  It returns a string in JSON format:

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

Where:

* `contract` - Contract name;
* `params` - Data passed to the contract parameters;
* `block` - ID of the block that processed the transaction.

**Example**

```
P(TransactionInfo(#hash#))
```

### VarAsIs {#varasis}

Assigns the value Value to a specific variable Name, which is the name of a specific variable instead of its value.

For versions with variable substitution, see [SetVar](#setvar).
**Syntax**
```
VarAsIs(Name, Value)
```

> VarAsIs

  * `Name`

    Variable name.

  * `Value`

    A variable value. Variable name in the value will not be substituted. For example, if Value is example #varname#, then the variable value is also example #varname#.

**Example**

```
SetVar(Name,"John")
VarAsIs(name, I am #Name#)
Span(#name#) // I am #Name#
```

## App styles for mobile devices {#app-styles-for-mobile-devices}

### Layout {#layout}

#### Title {#title}

* `h1`… `h6`

#### Strong-class names {#strong-class-names}

* `.text-muted`
* `.text-primary`
* `.text-success`
* `.text-info`
* `.text-warning`
* `.text-danger`

#### Color {#color}

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

#### Grid {#grid}

* `.row`
* `.row.row-table`
* `.col-xs-1`… `.col-xs-12`, only used in `.row.row-table`.

#### Panel {#panel}

* `.panel`
* `.panel.panel-heading`
* `.panel.panel-body`
* `.panel.panel-footer`

#### Form {#form-app}

* `.form-control`

#### Button {#button-app}

* `.btn.btn-default`
* `.btn.btn-link`
* `.btn.btn-primary`
* `.btn.btn-success`
* `.btn.btn-info`
* `.btn.btn-warning`
* `.btn.btn-danger`

#### Icon {#icon}

* All fa-class icons are from FontAwesome: `fa fa-<icon-name></icon-name>`.
* All icon-class icons are from SimpleLineIcons: `icon-<icon-name>`.
