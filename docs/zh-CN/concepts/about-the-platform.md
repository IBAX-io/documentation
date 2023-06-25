# IBAX区块链平台 概述 {#ibax-overview}

- [IBAX区块链平台 概述](#ibax-overview)
    - [特性](#features)
    - [架构](#architecture)
        - [网络](#network)
        - [荣誉节点](#honor-node)
        - [交易](#transactions)
        - [网络协议](#network-protocol)
        - [区块和交易验证](#block-and-transaction-verification)
        - [数据库](#database)
    - [生态系统](#ecolib)
        - [集成开发环境](#ide)
        - [应用程序](#applications)
        - [数据表](#tables)
        - [生态系统参数](#ecosystem-parameters)
    - [访问权限控制机制](#access-rights-control-mechanism)
      - [访问权限控制操作](#access-control-actions)
      - [访问权限管理方法](#access-rights-management)
      - [特殊权限](#exclusive-rights)
    - [虚拟专用生态系统](#virtual-private-ecosystem)
        - [请求web资源](#requests-to-web-resources)
        - [读取数据权限](#rights-to-read-data)
        - [创建 CLB](#clb-creation)
        - [使用 CLB](#clb-usage)

## 特性 {#features}

IBAX区块链平台包括一个集成的应用程序开发环境，可以对数据、用户页面和智能合约进行多级访问权限控制系统。

就其结构和功能而言，IBAX区块链平台 与大多数现有的区块链平台有较大不同：

> -   IBAX区块链平台 应用程序的开发和使用在名为 **生态系统** 的自治软件环境中，
      > 每个生态系统都有自己的成员规则，这些规则最初是由生态系统创建者建立的；
> -   生态系统的活动基于使用 **智能合约** 去创建 **寄存器**，例如 <font color=Red>数据库表</font> 和记录或更新所涉及的数据，
      > 而在大多数其他区块链平台中，活动基于在账户之间交易交换；
> -   对 **寄存器** 的访问权限和生态系统成员间的关系控制由一套称为 **智能法律** 的规则来管理。

## 架构 {#architecture}

### 网络 {#network}

IBAX区块链平台 基于点对点(P2P)网络构建。

网络中的候选荣誉节点存储着最新版本的区块链数据库，其中记录了IBAX区块链平台的区块链最新状态。

网络用户可通过使用 Weaver 或REST API命令从 候选荣誉节点数据库发送请求来接收数据，
新请求被用户签名后以交易的二进制格式发送到网络。
这些交易本质上是修改数据库中记录的命令，交易以区块的形式聚合在一起，
然后将区块发送到网络节点的区块链中，每个候选荣誉节点 将处理该区块中的交易，从而更新其数据库中的相应数据。

### 荣誉节点 {#honor-node}

网络中有权生成新区块的候选荣誉节点称为 荣誉节点。
在平台参数表中[number_of_nodes](../reference/platform-parameters.md#number_of_nodes) 定义了荣誉节点数量，
这表明荣誉节点的数量是有限的。

荣誉节点是 IBAX 公网的关键组件之一。它执行和验证交易，从其他节点收集交易信息，将交易添加到队列中，
并使用确认机制验证新块的正确性和有效性。一般来说，它有两种状态：打包和非打包状态。

打包状态下的荣耀节点性能最高。它从事务队列中获取要执行的事务请求，并验证事务的签名有效性和正确性，
例如转账金额、交易操作权限、交易准确执行。所有的交易操作，无论正确或错误（错误的交易将被回滚），都将被写入块中。
错误的交易会产生惩罚性的gas费用。通过广播将执行的交易与区块一起通知给其他荣誉节点。

非打包状态的荣誉节点主要负责区块验证，保证打包节点产生的区块内交易被正确执行。
如果出现异常，将触发异常处理机制，IBAX网络将回滚并重新验证区块。

为保证交易执行效率，荣耀节点不断收集交易信息。


### 交易 {#transactions}

交易由 [Weaver](../concepts/thesaurus.md#weaver) 生成，其中包括用于执行智能合约的数据。

交易由用户持有人的私钥进行签名。私钥和 `Weaver` 的签名函数可以存储在浏览器、软件客户端，SIM卡或专用物理设备上。
在当前实现中，私钥通过ECDSA算法加密保存在`Weaver`端中。使用ECDSA算法对交易进行签名。

每笔交易有以下格式结构:

> -   ID - 执行合约的ID；
> -   Params - 发送给合约的参数；
> -   KeyID - 发送交易的用户ID；
> -   PublicKey - 荣誉节点 的节点公钥；
> -   Time - 交易产生时间戳；
> -   EcosystemID - 交易产生的所在生态系统ID；
> -   ТokenEcosystem - 生态系统ID，默认为 1，其生态内的通证用于支付交易费用。

### 网络协议 {#network-protocol}

用户将交易发送到一个荣誉节点，该交易在该节点进行基本验证以确保交易格式的正确性，然后将交易添加到交易队列中。
该交易还会发送到网络上的其他荣誉节点，并将交易添加到交易队列中。

荣誉节点在特定时间段内有权产生新区块，时间段根据[honor_nodes](../reference/platform-parameters.md#honor-nodes) 平台参数和特殊算法决定，
荣誉节点从交易队列中检索交易并将交易发送到区块生成器。在产生新区块的期间，
也会对该新区块中的交易进行处理：将每个交易发送到虚拟机，虚拟机执行交易参数中对应的合约，从而更新数据库中的记录。

验证新区块是否出现错误，如果验证通过，则将该区块发送到其他网络上的其他荣誉节点。

其他荣誉节点将接收到的新区块添加到区块队列，在验证该区块通过后，该区块会被添加到区块所在的荣誉节点区块链中，
并处理该区块中的交易，从而更新数据库中的记录。

### 区块和交易验证 {#block-and-transaction-verification}

荣誉节点在产生新区块块之后执行新区块验证，以及在收到此区块后在所有其他荣誉节点上验证此区块，包括以下验证：

> -   接收的数据第一个字节应该是为 0，如果不是，则接收的数据不被视为区块；
>
> -   接收的区块的生成时间戳应该在当前时间戳之前；
>
> -   区块的生成时间戳应该与 荣誉节点 有权产生新区块的时间间隔相对应；
>
> -   新区块高度应该大于现有区块链上最大区块高度；
>
> -   不能超过该区块允许交易的最大费用限额；
>
> -   该区块必须被其节点的节点密钥正确签名，签名数据为：
>
>     > -   该区块高度、前一个区块的哈希值、该区块时间戳、该区块所在的生态系统ID、该区块的荣誉节点 的账户地址；
>     > -   荣誉节点在平台参数 [honor_nodes](../reference/platform-parameters.md#honor-nodes) 数组的位置、 该区块中所有交易的默克尔树（MrklRoot）、前一个区块的回滚哈希值。

通过以下方式检查区块中的每笔事务的正确性：

> -   每笔交易的哈希值必须是唯一的；
> -   一个密钥签名的交易不能超过限制[max_tx_block_per_user](../reference/platform-parameters.md#max-tx-block-per-user) ；
> -   不能超过最大交易大小限制[max_tx_size](../reference/platform-parameters.md#max-tx-size) ；
> -   交易时间不能大于区块生成时间，交易时间不能大于区块生成时间加上600秒，不能小于区块生成时间减去86400秒；
> -   交易必须被正确签名；
> -   执行合约的用户必须在其帐户中具有足够数量的通证来支付执行交易所需的费用。

### 数据库 {#database}
IBAX 网络的底层数据存储层是 <font color=Red>PostgreSQL</font> 数据库完全向公众开放。
基于IBAX操作系统平台的权限设计，用户无需担心数据安全。 
IBAX Network采用面向对象的设计理念，通过关系型PostgreSQL数据库对数据进行预编译，提高数据处理效率。

如果您是技术专家，您可能对以下内容感兴趣，如果不是，请跳过它。  
① 所有名称中不带数字前缀的表都属于 IBAX Network Basic 的权限表；  
② 所有名称中带有数字前缀的表都属于ecoLibs的权限表。

## 生态系统 {#ecolib}

用户，甚至普通用户，在 IBAX 网络系统平台上创建自己的 ecoLib 都非常容易。 
我们集成并开发了一个应用程序，只需单击一下即可创建 ecoLib。

创建ecoLib时，可以配置生态参数和规则，设置管理员账号和计费模式。 
最重要的是，为了更好地在 ecoLibs 中应用 DPoA 共识，创建者可以通过编写或导入自己的合约来设置它。

我们通过导入合约模板来支持ecoLib代币的快速发行。

由于共识和管理权限的不同，ecoLib 分为去中心化和中心化两种。 按类型划分，它们没有特定的优势或劣势。 
您应该根据您的服务需求选择合适的。 
如果现在可以但将来不行怎么办？ 
您可以在 IBAX 网络系统平台上更改 ecoLib 参数，甚至是共识机制、代币和治理方法。 
您可以将其全部交给由 ecoLib 管理员或成员维护的自治机制（取决于 ecoLib 类型）。

在IBAX网络系统平台上，一个ecoLib拥有完整的数据控制权限以及设计和访问独立数据库表和字段的权限。 
在数据控制权限设计中，我们支持在字段满足逻辑表达式时触发。 
此功能允许在特殊服务中提供想象空间，例如监控、逻辑满足以及按时间和特定条件触发。

一个 ecoLib 中可能有多个 DApp，每个 DApp 可以有独立的参数。 
ecoLib 就像一个平台，您可以在其中实现任何您想要的东西。

为了更好地支持生态系统开发者，我们提供了编辑、管理和开发工具 Weaver。 
它将大大降低生态系统的开发、维护和管理成本。

### 集成开发环境 {#ide}

Weaver包括用于创建区块链应用程序的全套集成开发环境（IDE）。
使用此IDE不需要软件开发人员对区块链技术有深刻的了解。

Weaver提供了数据库表管理工具，合约编辑器，页面编辑器以及在生态系统中创建应用程序所需的其他功能，而无需借助任何其他软件模块。

IDE主要包括以下部分:

> -   生态系统参数表；
> -   合约编辑器；
> -   数据库表管理工具；
> -   页面编辑器和可视化页面设计器；
> -   多语言资源编辑器；
> -   应用程序导入/导出功能。

### 应用程序 {#applications}

应用程序是具有配置访问权限的数据库表、智能合约和用户页面等元素的集合。应用程序元素所属的生态系统由元素名称中的前缀表示，例如<font color=Red>@1ElementName</font>，
其中生态系统ID在 <font color=Red>@</font> 符号后的数字 <font color=Red>1</font>表示。
在当前生态系统中使用应用程序元素时，可以省略前缀<font color=Red>@1</font>。
这些应用程序可执行有用的功能或实现各种服务。

### 数据表 {#tables}

在 IBAX区块链平台数据库，每个生态系统可以创建无限数量的数据表。特定生态系统的数据表可以通过包含生态系统ID的前缀来标识，
该生态系统ID在该生态系统中不会显示在Weaver 中。

数据表不以任何方式绑定和属于某个合约，在数据表访问权限范围内，其可以被所有应用程序使用。

每个生态系统都可以为其应用程序的开发创建一组数据表。这并不排除通过指定表名前缀来访问其他生态系统表的可能性。

通过智能法律配置访问权限来将数据记录至数据表。智能法律用于权限管理。

> 数据表管理工具

用于管理数据表的工具可从 Weaver 的 **数据表** 菜单中找到。具有以下功能：

-   查看数据表列表及其条目内容；
-   创建新数据表；
-   添加表字段并指定字段数据类型：`Text` ， `Date/Time` ， `Varchar` , `Character` ， `JSON` ， `Number` ， `Money` ， `Double` ，`Binary`；
    - Text 对应postgresql `text`。
    - Date/Time 对应postgresql `timestamp`。
    - Varchar 对应postgresql `varchar(102400)`。
    - Character 对应postgresql `character(1) NOT NULL DEFAULT '0'`。
    - JSON 对应postgresql `jsonb`。
    - Number 对应postgresql `bigint NOT NULL DEFAULT '0'`。
    - Money 对应postgresql `decimal (30, 0) NOT NULL DEFAULT '0'`。
    - Double 对应postgresql `double precision`。
    - Binary 对应postgresql `bytea NOT NULL DEFAULT '\x'`。
    
-   管理插入数据、更新数据和更改表结构的权限。

> 表数据操作

为了更好数据库操作，Needle  和 Logicor  都具有[DBFind](../topics/script.md#dbfind) 函数，
该函数用于从数据表中检索值和数据数组。

合约语言 [DBInsert](../topics/script.md#dbinsert) 函数用于向数据表添加条目。
[DBUpdate](../topics/script.md#dbupdate) 和[DBUpdateExt](../topics/script.md#dbupdateext) 函数用于更新现有条目的值，
当更新值时，数据表对应数据会更新，而区块链会添加新的交易，同时保留着所有历史交易。数据表的数据只可以被修改，不能被删除。

为了最大程度缩短执行合约的时间，[DBFind](../topics/script.md#dbfind) 函数不能同时查询多个数据表，
不支持 *JOIN*进行查询，因此建议放弃应用程序的数据表规范化，而是将所有可用的信息存储在条目中或者重复其他数据表可用的信息。
这不是一种强制性措施，而是区块链应用程序的必要条件。就这种情况而言，存储的数据应该是完整的数据，即使其他表的相同数据更新了，
该数据也是无法更新的，这在关系型数据库中该数据是同步更新的。

### 生态系统参数 {#ecosystem-parameters}

生态系统参数表（ **1_parameters** ）可从 Weaver 生态系统参数菜单查看和编辑。生态系统参数可分为以下几组：

> -   常规参数：生态系统创建者的帐户（founder_account）以及其他信息；
>
> -   访问权限参数：定义应用程序元素的访问权限
>
>     > -   更新数据表结构（ *changing_tables* ）；
>     > -   更新合约（ *changing_contracts* ）；
>     > -   更新用户页面（ *changing_page* ）；
>     > -   更新菜单（ *changing_menu* ）；
>     > -   更新多语言资源 （ *changing_language* )。
>
> -   技术参数：定义用户样式( *stylesheet* )等；
>
> -   用户参数：定义应用程序工作所需的常量或列表（以逗号分隔）。

可以为每个生态系统的参数指定编辑权限。

要检索生态系统参数的值，可使用[EcosysParam](../topics/script.md#ecosysparam) 函数，
将生态系统参数名称作为参数传递给该函数。

## 访问权限控制机制 {#access-rights-control-mechanism}

IBAX区块链平台拥有多级访问权限管理系统。
可以配置访问权限来创建和更改应用程序的任何元素：合约，数据表，用户页面，生态系统参数。
也可以配置更改访问权限的权限。

默认情况下，IBAX区块链平台 生态系统中的所有权限都由其创始人管理，这在**MainCondition**合约中定义，
默认情况下每个生态系统都有这个合约。但是在创建智能法律之后，访问权限控制可以转移到所有生态系统成员或一组此类成员。

### 访问权限控制操作 {#access-control-actions}

访问权限在合约表（ **1_contracts** ）、数据表（ **1_tables**）、用户页面表（ **1_pages** ）、
菜单表（ **1_menu** ），代码片段表（**1_blocks** ）的权限字段中定义，可以 Weaver 找到对应的菜单部分。

### 访问权限管理方法 {#access-rights-management}

访问权限的规则在权限字段填入对应合约表达式**ContractConditions(\"@1MainCondition\")** 、
**ContractAccess(\"@1MainCondition\")**或者逻辑表达式，如果请求表示式的结果通过（true），则授予访问权限。
否则拒绝访问权限并终止相关操作。

定义权限的简单方法是在权限字段输入逻辑表达式。例如`$key_id == 8919730491904441614`，其中 **\$keyid** 表示生态系统成员的ID。

定义权限的最通用和推荐的方法是使用`ContractConditions("@1ContractsName1","@1ContractsName2")`函数，
合约名称 **ContractsName**作为参数传递给该函数，合约结果必须是逻辑表达式的结果（true或者false）。

定义权限的另一种方法是使用`ContractAccess("@1ContractsName3","@1ContractsName4")`函数。
有资格实现相应操作的合约 **ContractsName**可以作为参数传递给该函数。
例如，如果 *amount* 列的权限字段配置为`ContractAccess("@1TokenTransfer")`，那么想要更改 *amount*列中的值，
只能执行 **\@1TokenTransfer**合约来更改。访问合约本身的权限可以在条件部分 *conditions*进行管理。
它们可能相当复杂，可能包含许多其他合约。

### 特殊权限 {#exclusive-rights}

考虑到解决突发情况或对生态系统运行至关重要的情况，生态系统参数表（**1_parameters** ）有许多特殊参数（**changing_contracts**、**changing_pages**）等，
参数定义了访问当前生态系统的所有合约，数据表和页面的权限，这些权限使用起关键作用的合约配置的。

## 虚拟专用生态系统 {#virtual-private-ecosystem}

IBAX区块链平台 可以创建虚拟专用生态系统 Cross Ledgers Base(CLB)，它具有标准生态系统的全套功能，
但在区块链之外工作。在 CLB中，可以使用和创建合约和模板语言、数据库表，可以使用 Weaver 创建应用程序。
可以使用接口方式调用区块链生态系统上的合约。

### 请求web资源 {#requests-to-web-resources}

> CLB
> 和标准生态系统之间的主要区别在于可以使用[HTTPRequest](../topics/script.md#httprequest) 和[HTTPPostJSON](../topics/script.md#httppostjson) 合约函数通过 **HTTP / HTTPS**请求方式在合约内向任何Web资源发出请求。
> 传递给此函数的参数为：URL，请求方法（**GET**或**POST**），
> 请求头和请求参数。

### 读取数据权限 {#rights-to-read-data}

由于 CLB 中的数据未保存到区块链（但可用于读取），因此可以选择配置读取数据表的权限。可以为单独的列设置读取权限，
也可以为使用特殊合约的任何行设置读取权限。

### 创建 CLB {#clb-creation}

可以在网络上创建 CLB 节点。 CLB 节点的管理员定义允许使用 CLB功能的生态系统列表，
并指定将拥有生态系统创建者权限的用户可以安装应用程序，接受新成员以及配置资源访问权限。

### 使用 CLB {#clb-usage}

CLB可以创建注册表单，通过邮件或者电话向用户发送验证信息，存储在外部公共访问的数据。可以编写和测试应用程序，
然后将应用程序导入至区块链生态系统。在CLB中可以使用调度合约任务，可以创建预言机，用于从web资源接收数据并发送该数据至区块链生态系统中。
