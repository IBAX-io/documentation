# 应用程序开发教程 {#tutorial-for-application-development}

本章节介绍如何在 IBAX区块链平台 编写一个简单的应用程序。

  - [目标](#the-goal)
  - [第1部分：环境](#part-1-the-environment)
  - [第2部分：合约](#part-2-contract)
    - [创始人账户](#creator-account)
    - [新应用程序](#new-application)
    - [新数据表](#new-database-table)
    - [新合约](#new-contract)
      - [合约代码部分](#contract-code)
      - [创建合约](#create-a-contract)
      - [合约名称](#contract-name)
      - [数据部分](#data)
      - [条件部分](#conditions)
      - [操作部分](#action)
      - [完整合约代码](#full-contract-code)
      - [保存并执行](#save-and-run)
  - [第3部分：页面](#part-3-page)
    - [新字段](#new-field)
    - [更改合约](#update-the-contract)
    - [页面](#page)
      - [设计器视图](#designer-views)
      - [开发者视图](#developer-view)
      - [获取数据表数据](#fetch-data-from-the-database-table)
      - [保存页面](#save-the-page)
  - [第4部分：应用程序](#part-4-application)
    - [菜单](#menu)
      - [添加菜单项](#add-a-menu-item)
      - [测试新菜单项](#test-the-new-menu-item)
    - [发送消息](#send-a-message)
      - [表单](#form)
    - [表格导航](#form-navigation)
      - [导航按钮](#navigation-buttons)
      - [变量](#variables)
      - [条目计数](#entry-count)
      - [表格偏移量](#table-offset)
      - [按钮代码](#button-code)
      - [页面刷新](#page-refreshing)
  - [结论](#conclusions)


## 目标 {#the-goal}

应用程序开始时很简单，随着教程的深入，其复杂性也在增加。

应用程序的最终版本在数据表中存储为简单消息（字符串），其中包含时间戳和消息发送者的帐户标识符。
用户可以访问这些消息列表并从应用程序页面添加新消息。该应用程序的页面可以从生态系统菜单中访问。

## 第1部分：环境 {#part-1-the-environment}

**Weaver** 

Weaver 是 IBAX区块链平台 的唯一客户端，Weaver 为所有用户和生态系统角色提供功能。
应用程序开发人员可以在 Weaver 中开发和测试应用程序，生态系统管理员使用 Weaver 来管理生态系统，用户可以通过 Weaver 与生态系统应用进行交互。

在本教程中，你将在 Weaver 中编写合约代码、页面模版代码和执行其他所有操作。
Weaver 还提供一种恢复、保存和执行合约代码，管理数据结构（数据表），分配访问权限和创建应用程序的方法。

每个节点都有自己的 Weaver 实例。

## 第2部分：合约 {#part-2-contract}

您的第一个简单的应用程序为"Hello，World！"。

```
应用程序在表中存储为字符串。它没有任何用户页面。
```
### 创始人账户 {#creator-account}

具有 *Developer* 角色的帐户可以使用生态系统的"root"特权。默认情况下，该角色可以访问所有操作。
在新的生态系统中，创始人帐户被分配给*Developer*角色。
您必须使用这个帐户来引入生态系统的重大更改，比如创建新的应用程序和数据表。

使用创始人的帐户登录生态系统。

### 新应用程序 {#new-application}

一旦您作为生态系统的创始人登录，您就可以创建一个新的应用程序。

创建新应用程序：

> 1.  转到 **Developer** 选项卡；
>
> 2.  在左侧的菜单中选择 **应用程序**；
>
> 3.  在 **应用程序** 页面选择 **创建**；
>
> 4.  在 **名称** 字段中指定应用程序的名称；
>
> 5.  在 **更改条件** 指定 `true`：
>
>     > `true` 表示任何人都可以更改应用程序；
>     >
>     > 另一种选择是指定
>     > `ContractConditions("MainCondition")`。除了创始人之外，将禁止任何人对进行应用程序更改。
>
> 6.  您的应用程序将显示在应用程序列表中，单击指定应用程序的名称字段使其激活。
>    ````
>    在 *Developer*选项卡中选择应用程序可以更轻松地导航与所选应用程序相关的资源,它对生态系统没有影响。
>    无论选择哪一个，所有生态系统应用程序仍然可用。
>    ````

### 新数据表 {#new-database-table}

要存储数据，应用程序需要一个数据表。在 Weaver 创建该数据表。

创建数据表：

> 1.  在 **Developer** 选项卡，选择 **应用程序** > **APP** > **数据表**；
>
>     > 这显示所选应用程序的所有数据表。如果该列表为空，则您的应用还没有任何数据表。
>
> 2.  单击 **创建**；
>
>     > Weaver 将显示创建数据表页面。
>
> 3.  在 **名称** 字段中指定您的数据表名称；
>
>     > 本教程使用 `apptable` 数据表名称。
>
> 4.  添加列。名为 `message`，其类型为 `Text`；
>
>     > 结果，该数据表必须有两列： `id` (预定义)和`message`。您稍后会添加更多列。
>    ![image](/app-tut-table.png)
>
> 5.  对于读写权限，在每个字段指定为 `true`；
>
>     > 这将允许任何人在数据表上执行插入条目、更改条目、添加列和读取条目数据；
>     >
>     > 作为选项，您可以限定读写权限给创始人帐户，在这种情况下，
      请在该字段中指定为`ContractConditions("MainCondition")`。

### 新合约 {#new-contract}

#### 合约代码部分 {#contract-code}

每个合约都有三个部分，更多请参阅：[合约结构](../topics/script.md#contract-structure) 。

#### 创建合约 {#create-a-contract}

1.  在 **Developer** 选项卡选择 **应用程序** > **APP** > *合约*；

    > 这将显示所选应用程序的所有合约。新应用程序该列表将为空。

2.  单击 *创建*；

    > 将在编辑器中打开一个新的合约模版。

空合约模版如下所示：

``` js
contract ... {
    data {

    }
    conditions {

    }
    action {

    }
}
```

#### 合约名称 {#contract-name}

首先，给合约命名。

``` js
contract AppContract {
```

#### 数据部分 {#data}

填写 `data` 部分。

在如下示例中，`Message` 是变量名称，`string` 是其类型。

``` js
data {
    Message string
}
```

#### 条件部分 {#conditions}

填写 `conditions` 部分。简单的验证条件是指定的字符串不能为空，如果 `Message` 长度为 `0`，则合约将在执行时生成带有已定义的消息警告。

``` js
conditions {
    // avoid writing empty strings
    if Size($Message) == 0 {
        error "Message is empty"
    }
}
```

#### 操作部分 {#action}

填写 `action` 部分。 简单的操作是将 `Message` 写入数据表中。

``` js
action {
    DBInsert("apptable", {message: $Message})
}
```

#### 完整合约代码 {#full-contract-code}

以下部分是完整合约的代码。

IBAX区块链平台 的所有合约都像这样构建，包含 `data`、`conditions` 和 `action` 部分。

``` js
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

#### 保存并执行 {#save-and-run}

合约准备进行测试：

> 1.  在编辑器菜单中，单击 **保存**；
>
>     > 这样就会更改合约代码，更改的版本可供所有网络节点使用。
>
> 2.  在编辑器菜单中，单击 **执行**；
>
>     > 这将显示 **执行合约** 页面。
>
> 3.  在 **执行合约** 页面。填写合约的输入参数；
>
>     > 该合约有一个参数 `Message`，所以在 **键** 指定 `Message`，在 **值** 指定 `Hello, World`。
>     >
>     > ![image](/app-tut-execute.png)
>
> 4.  单击 **执行**。
>
>     > 结果将显示在右侧。

如果成功添加了字符串，则结果将包含引入更改交易的区块ID和结果代码。

``` js
{
   "block": "31",
   "result": null
}
```

## 第3部分：页面 {#part-3-page}

在合约生效之后，是时候把它扩展成更有用的东西了。在这部分中，您将实现UI和其他功能。


````
该应用程序将字符串存储在表中，就像日志中的条目一样。每个字符串都有一个作者和一个时间戳。

用户可以从应用程序页面查看存储的字符串列表，此时该页面是一个简单的表格。
````

### 新字段 {#new-field}

与之前一样，从 **Developer** 选项卡 > **应用程序** > **APP** > **数据表** 页面编辑数据表；

将以下字段添加到 `apptable` 数据表：

-   `author` 字段，类型 `Number`，**更改** 设置为 `true`；

    > 该字段将存储作者帐户的标识符。

-   `timestamp` 字段，类型 `Date/Time`，**更改** 设置为 `true`。

### 更改合约 {#update-the-contract}

更改合约代码来处理作者ID和时间戳。

作者ID是生态系统帐户ID。时间戳是以Unix时间格式执行合约的日期和时间。

这两个值都由 [预定义变量](../topics/script.md#variable) 提供。所以无需输入或验证预定义变量，因此仅在操作部分中进行更改。

更改合约，以便在添加消息时将作者的ID和时间戳写入数据表中。作者的ID由 `$key_id` 定义，时间戳由定义 `$time`。

``` js
action {
    DBInsert("apptable", {message: $Message, author: $key_id, timestamp: $time})
}
```

### 页面 {#page}

对于此部分，应用程序的页面是一个显示存储在表中的信息的简单页面。

就像所有其他资源一样，可以在 Weaver 中创建UI页面：

1.  导航到 **Developer** 选项卡 > **应用程序** > **APP** > **页面**；

2.  单击 **创建**；

    > 可视化设计器将在新选项卡中打开。

#### 设计器视图 {#designer-views}

默认页面为空。您可以使用预定义的结构快速填充页面。

> ![image](/app-tut-designer.png)

创建一个基本的表单：

1.  在右侧的视图选择器中，单击 **视图化（Designer）**；

    > 视图将切换到可视化设计器。

2.  从左侧菜单中，选择 **Search** > **Table With Header** 并将其拖到页面上。

    > 将出现包含多个元素的表格。

#### 开发者视图 {#developer-view}

IBAX区块链平台 的用户页面用 [模版语言](../topics/templates2.md) 编写。您需要为页面编写代码，因此请切换到开发者（Developer）的视图。

> ![image](/app-tut-developer.png)

切换到开发者（Developer）视图。

1.  在右侧的视图选择器中，单击 **开发者**。

    > 视图将切换到包含页面代码的代码编辑器。

#### 获取数据表数据 {#fetch-data-from-the-database-table}

目前为止，页面模版并没有做什么。接下来就得更改代码，以便页面显示来自 `apptable` 表的数据。

1. 想要请求表中数据，使用 [DBFind](../topics/script.md#dbfind) 函数；

    > 以下示例中该函数调用从 `apptable` 表中获取数据，并将其放入
    `src_table` 源中。并按时间戳字段对其进行排序。该 `src_table`
    源稍后用作页面上表视图的数据源。
    >
    > ``` js
    > DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)
    > ```

2. 想要显示 `src_table` 源中的数据，在 `Table` 函数中将其指定为一个源以及列标题。

    > ``` js
    > Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
    > ```

3. 在右侧的视图选择器中，单击 **预览** 以检查数据是否正确显示。

#### 完整页面代码 {#full-page-code-1}

以下是该部分的完整页面代码。该基本页面将在稍后进行扩展。

``` js
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)

Div(Class: panel panel-primary) {
    Div(Class: panel-heading, Body: Table block)
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
    Div(Class: panel-footer text-right) {
        Button(Class: btn btn-primary, Contract: ContractName, Body: More)
    }
}
```

#### 保存页面 {#save-the-page}

单击 **保存** 以保存页面：

1.  在 **页面名称** 字段中为页面指定 `AppPage` 或任何其他名称；
2.  在 **菜单** 中选择 `default_menu`；
3.  指定 **更改条件** 为 `true`；
4.  单击 **确认**。

## 第4部分：应用程序 {#part-4-application}

在前面的部分中，您创建了一个合约，一个用于存储数据的表，以及一个用于显示该数据的基本UI页面。

在该部分中，您将确定最终的应用程序，因此它的外观和操作类似于实际应用程序。

### 菜单 {#menu}

页面需要链接到一个菜单，例如，在 **Home** 选项卡上显示的 `default_page` 页面链接到默认生态系统菜单 `default_menu`。

由于应用程序教程很简单（只有一个页面），因此无需为其创建单独的菜单。默认菜单中的新菜单项就足够了。


> 您可以通过在 **Developer** 选项卡 > **应用程序** > **APP** > **页面**
中编辑页面属性来定义页面显示的菜单。例如，如果您的应用程序有多个页面，则可能需要创建一个菜单以在这些页面之间导航并将其分配给应用程序的所有页面。


#### 添加菜单项 {#add-a-menu-item}

与所有其他资源一样，可以在 Weaver 中创建和编辑菜单：

1.  导航到 **Developer** 选项卡 > **菜单**;

    > ![image](/app-tut-menu-list.png)

2.  单击 `default_menu` 条目名称；

    > 编辑器将在新选项卡中打开。

3.  将新菜单项添加到模版的末尾。该菜单项将打开应用程序页面。该图标来自 [FontAwesome](https://fontawesome.com/icons) 图标集。

    > ``` js
    > MenuItem(Title:Messages, Page:AppPage, Icon:"fa fa-envelope")
    > ```

4.  单击 **保存**。

#### 测试新菜单项 {#test-the-new-menu-item}

检查新菜单项是否有效：

1.  打开 **Home** 选项卡；

2.  单击菜单中的 **刷新**；

    > 将出现标题为 *Messages* 的条目项；
    >
    > ![image](/app-tut-menu-messages.png)

3.  单击 **Messages**.

    > 该应用程序的页面将打开。

### 发送消息 {#send-a-message}

Logicor 中的按钮可以执行合约和打开页面，具体取决于参数。
[Button](../topics/templates2.md#button) 函数有合约的两个参数：

-   `Contract`

    > 激活的合约名称。

-   `Params`

    > 合约的输入参数。

#### 表单 {#form}

要将数据发送到合约，请将表单添加到应用程序页面。该表单必须具有消息的输入字段，以及将激活AppContract合约的按钮。

以下是该类表格的示例。它嵌套在自己的 [Div](../topics/templates2.md#div) 中。
将它放在包含表单视图的Div元素之后，该表单定义了 [Input](../topics/templates2.md#input) 字段有一个已定义的名称 `message_input`。
按钮使用这个名称向合约发送 `Message` 参数值。最后，[Val](../topics/templates2.md#val) 函数用于获取输入字段的值。

```text
Div(Class: panel panel-primary) {
  Form() {
        Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
        Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)")
  }
}
```

您可能会注意到通过发送消息测试该新功能时，表单不会刷新。这将在 [页面刷新](#page-refresh) 介绍。

### 表格导航 {#form-navigation}

页面上的默认表格视图第一页仅显示25个条目。添加一个简单的导航，允许用户导航所有表格条目。

#### 导航按钮 {#navigation-buttons}

该导航将使用两个按钮。每个按钮都会重新加载应用程序的页面并将参数传递给它。

> -   *Previous*
>     按钮将显示前25个条目。如果没有其他条目，则不会显示该按钮；
> -   *Next* 按钮将显示下25个条目。如果没有其他条目，则不会显示该按钮。

#### 变量 {#variables}

该导航需要两个变量来存储表视图状态：

> -   `#table_view_offset#`
>
>     > 该变量存储当前表视图偏移量。
>     >
>     > 导航按钮将在重新加载页面时将其作为参数传递。
>
> -   `#record_count#`
>
>     > 该变量存储表中的条目总数。
>     >
>     > 将计算该值。

#### 条目计数 {#entry-count}

要计算 `#record_count#`，请修改现有的 [DBFind](../topics/templates2.md#dbfind) 函数调用。在 `. count()` 调用中指定的变量将存储条目计数。

> ```text
> DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count)
> ```

#### 表格偏移量 {#table-offset}

必须在打开页面时将表视图偏移传递给页面。如果 `#table_view_offset#` 未获得值则指定为 `0`。

将以下代码添加到页面的顶部。

> ``` text
> If(GetVar(table_view_offset)){
> }.Else{
>     SetVar(table_view_offset, 0)
> }
> ```

再次修改 [DBFind](../topics/templates2.md#dbfind) 函数调用。这次它必须使用新的表视图偏移量。

> ``` text
> DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
> ```

#### 按钮代码 {#button-code}

找到定义页脚的 [Div](../topics/templates2.md#div) 函数调用：`Div(Class:panel-footer text-right)`。将按钮代码添加到其中。

> ``` text
> Div(Class: panel-footer text-right) {
>
> }
> ```

*Previous* 按钮只有在至少有一个 *Next* 要返回时才会显示。当添加按钮时，将计算页面的新表视图偏移量 `offset_previous`。参数被传递到重新打开页面的 `PageParams` 参数中。

> ``` text
> If(#table_view_offset# >= 25) {
>     SetVar(offset_previous, Calculate(#table_view_offset# - 25))
>     Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
> }
> ```

仅当总记录数大于页面上显示的数量时，才会显示 *Next* 按钮。当添加按钮时，将计算页面的新表视图偏移量 `offset_next`。参数被传递到重新打开页面的 `PageParams` 参数中。

> ``` text
> If(#record_count# >= Calculate(#table_view_offset# + 25)) {
>     SetVar(offset_next, Calculate(#table_view_offset# + 25))
>     Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
> }
> ```

![image](/app-tut-navigation.png)

添加按钮后，保存页面并从 *Home* > *Messages* 菜单项进行测试。

#### 页面刷新 {#page-refreshing}

实现的最后一项功能就是自动更新位于页面上的表格，当用户发送新消息时，它必须显示在表格中。

除了执行合同之外，您还可以通过 *Send* 按钮重新打开当前页面来实现这一点。必须将 `#table_view_offset#` 参数传递到该页面，而不进行任何更改。

添加 `Page` 和 `PageParams` 参数到 *Send* 按钮，代码如下所示：

``` text
Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
```

### 完整页面代码 {#full-page-code-2}

这部分介绍了应用程序页面的许多更改。以下是该应用程序页面的完整代码。

``` text
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

## 结论 {#conclusions}

本教程将介绍生态系统的基本应用程序。它没有为应用程序开发者解析其他重要的主题，
比如布局样式、管理访问权限以及应用程序和资源之间的交互。有关这些高级主题的更多信息，请参阅其他文档。
