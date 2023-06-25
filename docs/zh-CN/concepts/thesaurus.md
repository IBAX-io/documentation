# 术语和定义 {#terms-and-definitions}

  - [区块链相关术语](#blockchain-terms)
    - [区块链](#blockchain)
    - [对等网络](#peer-to-peer-network)
    - [哈希](#hash)
    - [区块](#block)
    - [区块验证](#block-verification)
    - [共识](#consensus)
    - [通证](#token)
    - [标识符](#identification)
    - [唯一标识符](#unique-identification)
    - [私钥](#private-key)
    - [公钥](#public-key)
    - [数字签名](#digital-signature)
    - [智能合约](#smart-contract)
    - [交易费用](#transaction-fee)
    - [双重支付](#double-spend)
    - [加密](#encryption)
    - [私有链](#private-blockchain)
    - [公有链](#public-blockchain)
    - [权威证明](#proof-of-authority)
  - [IBAX区块链平台术语](#ibax-terms)
    - [测试网](#testnet)
    - [主网](#mainnet)
    - [燃料](#gas-fee)
    - [账户地址](#account-address)
    - [钱包地址](#wallet-address)
    - [Weaver](#weaver)
    - [生态系统](#ecolib)
    - [生态系统参数](#ecolib-parameters)
    - [生态系统成员](#ecolib-members)
    - [虚拟专用生态系统](#virtual-private-ecolib)
    - [去中心化权威证明](#decentralized-proof-of-authority)
    - [Needle](#needle)
    - [Logicor](#logicor)
    - [集成开发环境](#integrated-development-environment-ide)
    - [页面编辑器](#page-editor)
    - [可视化页面设计器](#visual-page-designer)
    - [合约编辑器](#contract-editor)
    - [多语言资源](#multilingual-resources)
    - [导出应用程序](#application-export)
    - [导入应用程序](#application-import)
    - [智能法律](#smart-law)
    - [法律制度](#legal-system)
    - [应用程序](#application)
    - [页面](#page)
    - [代码片段](#code-segment)
    - [访问权限](#access-rights)
    - [荣誉节点](#honor-node)
    - [守护节点](#guardian-node)
    - [并发事务处理](#concurrent-transaction-processing)



## 区块链相关术语 {#blockchain-terms}

### 区块链 {#blockchain}

> 一种存储数据的信息系统，在系统内传输和处理数据，可以防止数据被伪造和丢失，同时保持数据可靠性；
> 通过以下方式实现数据保护：
>
> > 1.  将数据写入一系列加密区块的区块链中；
> > 2.  在对等网络中分散存储区块链副本；
> > 3.  使用共识机制对所有节点上的区块链进行同步；
> > 4.  通过在区块链中存储数据传输和处理合约的算法，确保在使用网络执行数据操作时，保证数据可靠性。

### 对等网络 {#peer-to-peer-network}

> 由计算机网络的对等节点组成（没有中央服务器）。

### 哈希 {#hash}

> 又叫做散列，任意文件或数据集长度的二进制值映射为较短的固定长度的二进制值。

### 区块 {#block}

> 在验证交易的格式和签名之后，由荣誉节点分组到特定数据结构中的交易集合。
> 一个区块包含一个哈希指针作为到前一个区块的链接，这是确保区块链加密安全性的措施之一。

### 区块验证 {#block-verification}

> 验证区块结构、生成时间、与前一个区块的兼容性、交易签名以及交易与区块数据的对应关系的正确性。

### 共识 {#consensus}

> 荣誉节点 在向区块链添加新区块过程中使用的验证协议或该类协议的算法。

### 交易 {#transaction-1}

> 区块链网络上的数据传输操作或区块链中该类事务的记录。

### 通证 {#token}

> 区块链上可流通的加密数字权益证明。存储在寄存器中的一组可识别的数字记录，包括在这些记录之间交换权利份额的机制。

### 标识符 {#identification}

> 用于识别系统中用户的加密程序。

### 唯一标识符 {#unique-identification}

> 将账户和用户联系起来的程序，需要法律和组织的努力或其他程序来实现生物识别，以便将用户名与实际用户联系起来。

### 私钥 {#private-key}

> 由其拥有者密存的一串字符串，用于该拥有者访问在网络上的虚拟帐户并签署交易。

### 公钥 {#public-key}

> 用于检查私钥真实性的一串字符，公钥由私钥唯一派生生成。

### 数字签名 {#digital-signature}

> 文档或消息经数据加密处理后获得的属性，数字签名用于检查文档的完整性（没有修改）和真实性（验证发件人的身份）。

### 智能合约 {#smart-contract}

> 在区块链中的执行数据存储操作的程序，所有合约都存储在区块链中。

### 交易费用 {#transaction-fee}

> 向 荣誉节点 支付执行交易的费用。

### 双重支付 {#double-spend}

> 一种对区块链网络攻击方法，结果是一笔交易花费两次同样的通证。
>
> 在区块链分叉时会导致这种攻击发生。只有当攻击者控制了网络验证能力的50%以上时，才能执行该类攻击。

### 加密 {#encryption}

> 一种数字数据转换的方式，只有拥有对应解密密钥的一方才能读取它。

### 私有链 {#private-blockchain}

> 所有节点和数据访问权限由单个组织（政府、公司或私人）集中控制的区块链网络。

### 公有链 {#public-blockchain}

> 不受任何组织控制的区块链网络，所有决策都是通过在网络参与者之间达成共识来决定，每个人都可以获取和访问区块链网络的数据。

### 权威证明  {#proof-of-authority}
> 权威证明（PoA），IBAX 网络创建了一种新的共识机制，将分布式、弱中心化和证书授权相结合。 
> 我们称之为 PoA（权威证明）。 为了保证整个 IBAX 网络的连续性，共识不仅包括 IBAX 公共网络，
> 还包括每个用户和用户组创建的 ecoLibs。 
> 这将创建一个真正自治、去中心化、公平、透明和防欺诈的去中心化自治组织 (DAO)。

## IBAX区块链平台术语 {#ibax-terms}

### 测试网 {#testnet}

> 用于测试的区块链网络版本。

### 主网 {#mainnet}

> 区块链网络主版本。

### 交易事务 {#transaction-2}

> 调用合约并将参数传递给合约的操作命令，荣誉节点执行交易的结果是数据库的更新。

### 燃料 {#gas-fee}

> 用于计算在节点网络上执行某些操作的费用的常规单位，燃料汇率由 荣誉节点投票决定。

### 账户地址 {#account-address}

> 存储通证的数据记录，可以通过一对密钥（私钥和公钥）访问。

### 钱包地址 {#wallet-address}

> 节点网络上用户的字符编码标识符，作为该用户的虚拟帐户的名称。

### Weaver {#weaver}

> 用于连接节点网络的软件客户端，有桌面版本和Web浏览器版本。
>
> Weaver 集成了平台开发环境，包括创建和编辑数据表、页面和合约。用户可在 Weaver 构建生态系统、创建和使用应用程序。

### 生态系统 {#ecolib}

> 一个相对封闭或开放的软件编程环境，包括了应用程序和生态系统成员。
>
> 生态系统成员可以发行属于生态系统的专属通证、使用智能合约建立成员间的交互规则、设置成员访问应用程序元素的权限。

### 生态系统参数 {#ecolib-parameters}

> 一组可配置的生态系统参数，有生态系统创建者账户、更改应用程序元素权限等参数，在参数表中可更改。

### 生态系统成员 {#ecolib-members}

> 可以访问特定生态系统和应用程序功能的用户。

### 虚拟专用生态系统 {#virtual-private-ecolib}

> 虚拟专用生态系统 Cross Ledgers Base （ CLB ），它具有标准生态系统的全套功能，但在区块链之外工作。
> 在 CLB中，可以使用和创建合约和模板语言、数据库表，可以使用 Weaver创建应用程序。
> 可以使用接口方式调用区块链生态系统上的合约。

### 去中心化权威证明 {#decentralized-proof-of-authority}

> 去中心化权威证明（DPoA）是一种新的共识算法，可提供高性能和容错性。
> 在 DPoA 中，生成新区块的权利授予已经证明有这样做的节点，并且这些节点必须经过初步验证。

### Needle {#needle}

> 用于创建智能合约的脚本语言，可以处理从用户页面接收的数据功能，以及用于在数据库表中执行的值操作。
>
> 可以在 Weaver 的编辑器中创建和编辑合约。

### Logicor {#logicor}

> 用于创建页面的模版语言，可以从数据库表中获取值、构建用户页面、
> 将用户输入数据传递到合约的**data** 部分。

### 集成开发环境 {#integrated-development-environment-ide}

> 集成开发环境Integrated Development Environment（IDE）是一组用于创建应用程序的软件工具。
>
> Weaver的集成开发环境包括合约编辑器，页面编辑器，数据库表管理工具，
> 多语言资源编辑器以及应用程序导出和导入功能。集成开发环境与基于语义工具的可视化页面设计器相辅相成。

### 页面编辑器 {#page-editor}

> Weaver 中通过直接在屏幕上排列基本应用程序元素HTML容器，表单域，按钮等工具，
> 可以来创建应用程序页面。

### 可视化页面设计器 {#visual-page-designer}

> Weaver 中创建应用程序页面的工具，包括界面设计器和 Logicor语言的页面代码生成器。

### 合约编辑器 {#contract-editor}

> Weaver 中使用可视化页面创建合约的工具。

### 多语言资源 {#multilingual-resources}

> Weaver中应用程序页面本地化的模块，它将应用程序页面上的标签与所选语言的文本值相关联。

### 导出应用程序 {#application-export}

> 将应用程序的所有数据表、页面和合约等源代码保存为文件。

### 导入应用程序 {#application-import}

> 将应用程序包含在导出文件中的所有数据表，页面和合约加载到生态系统中。

### 智能法律 {#smart-law}

> 是包含监管信息的一组特殊智能合约。用于管理控制合约的操作和寄存器访问权限。

### 法律制度 {#legal-system}

> 在智慧法律中制定的一套规则机制，该规则可以规范生态系统用户之间的关系，定义更改协议参数的程序规则，还有定义各种具有挑战性的解决方案。

### 应用程序 {#application}

> 在 Weaver 的集成开发环境中创建功能完备的软件产品。
>
> 应用程序是具有配置访问权限的数据库表、智能合约和用户页面等元素的集合。

### 页面 {#page}

> 使用 Logicor 模板语言编写的程序代码从而在屏幕上形成一个可交互的界面。

### 代码片段 {#code-segment}

> 使用 Logicor 模板语言编写的程序代码，可以重复包含在应用程序页面中的代码块。

### 访问权限 {#access-rights}

> 获取创建和编辑数据表，合约和页面的访问权限的条件。
>
> 对数据表的访问权限可以设置添加行和列，以及编辑列中值的权限。

### 荣誉节点 {#honor-node}

> 网络节点中有权生成和验证区块的节点。

### 守护节点 {#guardian-node}

> 网络上的一个节点，用于存储完整区块链的最新版本。

### 并发事务处理 {#concurrent-transaction-processing}

> 一种通过同时处理来自不同生态系统的数据来提高交易处理速度的方法。
