# 守护进程 {#daemon}

该章节介绍 IBAX区块链平台 节点如何从技术角度相互交互。

## 关于服务端守护进程 {#about-the-server-daemon}

它需在每个网络节点上运行。服务端守护进程执行服务端各个功能并支持IBAX区块链平台的区块链协议。守护进程在区块链网络中分发区块和交易、生成新区块、验证接收到的区块和交易。守护进程可以防止区块链分叉问题。

### 荣誉节点守护进程 {#honor-node-daemon}

荣誉节点 运行以下服务端守护进程：

> -   [BlockGenerator守护进程](#blockgenerator-daemon)
>
>     > 生成新区块。
>
> -   [BlockCollection守护进程](#blockcollection-daemon)
>
>     > 从其他节点下载新区块。
>
> -   [Confirmations守护进程](#confirmations-daemon)
>
>     > 确认节点上存在的区块也存在于大多数其他节点上。
>
> -   [Disseminator守护进程](#disseminator-daemon)
>
>     > 将交易和区块分发给其他主节点。
>
> -   QueueParserBlocks 守护进程
>
>     > 处理区块队列中的区块，区块队列包含来自其他节点的区块。
>     >
>     > 区块处理逻辑和 [BlockCollection守护进程](#blockcollection-daemon) 相同。
>
> -   QueueParserTx 守护进程
>
>     > 验证交易队列中的交易。
>
> -   Scheduler 守护进程
>
>     > 按任务计划运行合约。

### 守护节点 守护进程 {#guardian-node-daemon}

守护节点 运行以下服务端守护进程：

> -   [BlockCollection守护进程](#blockcollection-daemon)
> -   [Confirmations守护进程](#confirmations-daemon)
> -   [Disseminator守护进程](#disseminator-daemon)
> -   QueueParserTx
> -   Scheduler

## BlockCollection守护进程 {#blockcollection-daemon}

BlocksCollection守护进程下载区块并将区块链与其他网络节点同步。

### 区块链同步 {#blockchain-synchronization}

BlocksCollection守护进程通过确定区块链网络中的最大区块高度，请求新区块以及解决区块链中的分叉来同步区块链。

#### 区块链更新检查 {#check-for-blockchain-updates}

BlocksCollection守护进程将当前区块ID的请求发送到所有 荣誉节点。

如果该守护进程的节点的当前区块ID小于任何 荣誉节点的当前区块ID，则该区块链网络节点被认为是过时的。

#### 下载新区块 {#download-new-blocks}

返回最大当前区块高度的节点被视为最新节点。

该守护进程下载所有尚未知道的区块。

#### 解决分叉 {#solving-the-fork-issue}

如果在区块链中检测到分叉，则该守护进程通过将所有区块下载到共同的父区块来向后移动分叉。

找到共同的父区块后，将在该守护进程的节点区块链上执行回滚，并将正确的区块添加到区块链中，直到最新的区块。

### 数据表 {#tables-1}


BlocksCollection守护进程使用以下数据表：

> -   block_chain
> -   transactions
> -   transactions_status
> -   info_block

### 请求 {#request-1}

BlockCollection守护程序向其他守护程序发出以下请求：

> -   [Type 10](#type-10)指向所有 **荣誉节点** 中最大的区块ID。
> -   [Type 7](#type-7)指向最大区块ID的数据。

## BlockGenerator守护进程 {#blockgenerator-daemon}

BlockGenerator守护进程生成新区块。

### 预验证 {#pre-verification}

BlockGenerator守护进程通过分析区块链中的最新区块来计划新的区块生成。

如果满足以下条件，则可以生成新区块：

> -   生成最新区块的节点位于荣誉节点列表中守护进程节点。
> -   自最新未验证区块生成以来经过的最短时间。

### 区块生成 {#block-generation}

该守护进程生成新区块后，新区块包含所有新交易。这些交易可以从其他节点的[Disseminator守护进程](#disseminator-daemon)接收，也可以由该守护进程的节点生成。生成的区块保存在该节点数据库中。

### 数据表 {#tables-2}

BlockGenerator守护程序使用以下表：

> -   block_chain (saves new blocks)
> -   transactions
> -   transactions_status
> -   info_block

### 请求 {#request-2}

BlockGenerator守护进程不向其他守护进程发出任何请求。

## Disseminator守护进程 {#disseminator-daemon}

Disseminator守护进程将交易和区块发送到所有 荣誉节点。

### 守护节点 {#guardian-node}

在 守护节点 上工作时，守护进程将其节点生成的交易发送到所有 荣誉节点。

### 荣誉节点 {#honor-node}

在荣誉节点上工作时，守护进程会将生成的区块和交易的哈希值发送到所有荣誉节点。

然后，荣誉节点响应其节点未知的交易请求。守护进程发送完整的交易数据作为响应。

### 数据表 {#tables-3}

Disseminator守护进程使用以下表：

> -   transactions

### 请求 {#request-3}

Disseminator守护进程向其他守护进程发出以下请求：

> -   [Type 1](#type-1) 向 荣誉节点发送交易和区块哈希。
> -   [Type 2](#type-2) 从 荣誉节点接收交易数据。

## Confirmations守护进程 {#confirmations-daemon}

Confirmations守护进程检查其节点中的所有区块是否存在于大多数其他节点上。

### 区块确认 {#block-confirmation}

当网络中的多个节点已确认区块时，将认为该区块已被确认。

该守护进程从数据库中当前未确认的第一个区块开始逐个确认所有区块。

每个区块都以这种方式确认：

> -   向所有荣誉节点发送请求，该请求包含了正在确认的区块ID。
> -   所有荣誉节点对该区块的哈希进行响应。
> -   如果响应的哈希值与守护进程节点上的区块的哈希值匹配，则会增加确认计数器。如果哈希不匹配，取消确认计数器将增加。

### 数据表 {#tables-4}

Confirmations守护进程使用以下数据表：

> -   confirmation
> -   info_block

### 请求 {#request-4}

Confirmations守护进程向其他守护进程发出以下请求：

> -   [Type 4](#type-4) 向荣誉节点请求区块哈希。

## TCP服务协议 {#tcp-service-protocol}

TCP服务协议在 荣誉节点和全节点上工作，TCP服务协议使用TCP上的二进制协议来处理来自BlocksCollection、Disseminator和Confirmation守护进程的请求。

## 请求类型 {#request-type}

每个请求都有一个由请求的前两个字节定义的类型。

### Type 1 {#type-1}

#### 请求发送者 {#request-sender-1}

[Disseminator守护进程](#disseminator-daemon) 发送该请求。

#### 请求数据 {#request-data-1}

交易和区块哈希。

#### 请求处理 {#request-processing-1}

区块哈希被添加到区块队列中。

对交易哈希进行解析验证，并选择节点上尚未出现的交易。

#### 响应 {#response-1}

无。处理该请求后会发出 [Type 2](#type-2) 请求。

### Type 2 {#type-2}

#### 请求发送者 {#request-sender-2}

[Disseminator守护进程](#disseminator-daemon) 发送该请求。

#### 请求数据 {#request-data-2}

交易数据，包括数据大小：

> -   *data_size* (4个字节)
>
>     > 交易数据的大小，以字节为单位。
>
> -   *data* (data_size个字节)
>
>     > 交易数据。

#### 请求处理 {#request-processing-2}

验证交易并将其添加到交易队列中。

#### 响应 {#response-2}

无。

### Type 4 {#type-4}

#### 请求发送者 {#request-sender-3}

[Confirmations守护进程](#confirmations-daemon) 发送该请求。

#### 请求数据 {#request-data-3}

区块ID。

#### 响应 {#response-3}

区块哈希。

如果不存在该ID的区块，则返回 `0`。

### Type 7 {#type-7}

#### 请求发送者 {#request-sender-4}

[BlockCollection守护进程](#blockcollection-daemon) 发送该请求。

#### 请求数据 {#request-data-4}

区块ID。

> -   *block_id* (4个字节)

#### 响应 {#response-4}

区块数据，包括数据大小。

> -   *data_size* (4个字节)
>
>     > 区块数据的大小，以字节为单位。
>
> -   *data* (data_size个字节)
>
>     > 区块数据。

如果不存在该ID的区块，则关闭连接。

### Type 10 {#type-10}

#### 请求发送者 {#request-sender-5}

[BlockCollection守护进程](#blockcollection-daemon) 发送该请求。

#### 请求数据 {#request-data-5}

无

#### 响应 {#response-5}

区块ID。

> -   *block_id* (4个字节)
