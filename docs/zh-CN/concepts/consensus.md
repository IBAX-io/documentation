# 权威证明共识 {#decentralized-proof-of-authority-consensus}
<!-- TOC -->

- [什么是去中心化权威证明共识](#what-is-decentralized-proof-of-authority-consensus)
- [DPoA共识优势](#advantages-of-dpoa-consensus)
- [DPoA共识常见攻击手段](#dpoa-consensus-and-common-means-of-attack)
    - [拒绝服务攻击](#dos)
    - [51%攻击](#percent-attack-51)
- [IBAX中DPoA共识的实现](#implementation-of-dpoa-consensus-in-ibax)
    - [荣誉节点](#honor-node)
    - [领导节点](#leader-node)
    - [生成新区块](#generation-of-new-blocks)
    - [分叉](#forks)

<!-- /TOC -->

该章节描述权威证明共识及其在 IBAX区块链平台 中的实现。

## 什么是去中心化权威证明共识 {#what-is-decentralized-proof-of-authority-consensus}

IBAX Network考虑商业应用场景和现实环境，构建了一种新的共识机制DPoA（Decentralized Proof of Authority）。

去中心化一直是我们坚定的信念。 它不仅仅指 IBAX 的基础设施网络环境。 相反，我们将让去中心化在 IBAX Network 中创建的每个 ecoLib 中生根，并使用技术解决方案在每个生态中实现高度自治。 为了实现高度分布式的自治，我们在整体架构和技术实现上做了很多改动。 但是，在实践中，我们不能避免集中管理的概念。 为了在中心化和去中心化之间找到平衡点，除了DPoA共识机制，我们还制定了一定的奖励和激励方案。

IBAX 网络创建了一种新的共识机制，将分布式、弱中心化和证书授权相结合。 我们称之为 DPoA（去中心化的权威证明）。 为了保证整个 IBAX 网络的连续性，共识不仅包括 IBAX 公共网络，还包括每个用户和用户组创建的 ecoLibs。这将创建一个真正自治、去中心化、公平、透明和防欺诈的去中心化自治组织 (DAO)。

DPoA 具有防止网络攻击的机制，并允许创建保护网络和铸造新 IBXC 代币的铸币节点。 IBAXCoin 持有者可以将其 IBXC 流动性余额的一部分质押在 Mint 节点中，以获得 Mint & Stake Emission Rewards。铸造和质押有助于增加攻击的成本和难度，并按比例增加 IBXC 币的总价值。 有了这种机制，任何攻击的概率和危害都无限接近于零。

## DPoA共识优势 {#advantages-of-dpoa-consensus}

与工作量证明PoW和权益证明PoS共识机制相比，DPoA具有以下几点优势：

-   不需要高性能硬件，与PoW共识相比，DPoA共识不要求节点花费计算资源来解决复杂的数学逻辑；
-   生成新区块的时间间隔可预测，对于PoW和PoS共识，这个时间会有所不同；
-   高交易率，授权的网络节点按指定的时间间隔按顺序生成块，这提高了交易验证的速度；
-   容忍被攻击和恶意节点，只要51％的节点不受攻击。IBAX区块链平台实现了节点的禁止和撤销区块生成权的机制。

## DPoA共识常见攻击手段 {#dpoa-consensus-and-common-means-of-attack}

### 拒绝服务攻击 {#dos}

攻击者向目标网络节点发送大量交易和区块，试图中断节点活动使其不可用。

DPoA机制可以抵御这种攻击：

> -   由于网络节点已预先通过身份验证，因此只能为可承受DoS攻击的节点授予区块生成权限；
> -   如果某个荣誉节点在一段时间内不可用，则可以将其从荣誉节点列表中排除。

###  51%攻击 {#percent-attack-51}

在DPoA共识中，51％的攻击要求攻击者获得对51％的网络节点的控制权。这与攻击者需要获得51％的网络计算能力的Pow共识的51％攻击不同。获得许可区块链网络中的节点控制权比获得计算能力要困难得多。

例如，在PoW共识网络中，攻击者可以增加受控网络段的计算能力（性能），从而增加受控百分比。这对于DPoA共识没有意义，因为节点的计算能力对区块链网络决策没有影响。

## IBAX中DPoA共识的实现 {#implementation-of-dpoa-consensus-in-ibax}

### 荣誉节点 {#honor-node}

在 IBAX区块链平台 只有 荣誉节点才有权产生新区块，这些节点维护区块链网络和分布式账本。

荣誉节点列表保存在区块链注册表中。此列表中的节点顺序决定了节点生成新区块的顺序。

#### 领导节点 {#leader-node}
领导节点是在当前时间生成新区块的荣誉节点，以下公式确定当前荣誉节点列表中的领导节点:

``` text
leader = ((time - first) / step) % nodes
```

> leader 

    当前荣誉节点列表的索引，根据索引即可表示其为领导节点。

> time
    
    当前时间（UNIX）。

> first

    创始区块生成时间 (UNIX）。

> step

    区块生成间隔中的秒数。
> nodes

    荣誉节点总数量。

#### 生成新区块 {#generation-of-new-blocks}

新区块由当前时间间隔的[领导节点](#leader-node)生成。在每个时间间隔，领导节点从荣誉节点列表传递到下一个荣誉节点。

![image](/block-generation.png)

a) 新区块生成步骤

主要步骤如下：

> 1.  从节点的交易队列中收集所有新交易；
> 2.  逐个执行交易，无效或无法执行的交易将被拒绝；
> 3.  检查是否符合[区块生成限制范围](../reference/platform-parameters.md#configure-the-generation-of-blocks) ；
> 4.  生成具有有效交易的新区块，并使用荣誉节点的节点私钥通过ECDSA算法对其区块进行签名；
> 5.  将该区块发送到其他荣誉节点。

b) 验证新区块

其他荣誉节点验证步骤:

> 1.  接收并验证新区块:
>
>     > -   新区块是否由当前时间间隔的 领导节点 生成；
>     > -   当前时间间隔的 领导节点 没有生成其他区块；
>     > -   新区块被正确签名。
>
> 2.  逐个执行区块中的交易。检查交易是否成功执行并且在[区块生成限制范围](../reference/platform-parameters.md#configure-the-generation-of-blocks) 内。
>
> 3.  接受或拒绝该区块，具体取决于上一步:
>
>     > -   如果区块验证成功，则将新区块添加到当前节点的区块链中；
>     > -   如果区块验证失败，则拒绝该区块，标记该区块并发送 **坏区块**交易；
>     > -   如果生成坏区块的荣誉节点继续生成该类坏区块，则可以从荣誉节点列表中禁用或排除该荣誉节点。

### 分叉 {#forks}

**分叉**是区块链的替代版本。分叉包含一个或多个独立于区块链其余部分生成的区块。

分叉通常在发生网络节点的一部分不同步，影响分叉概率的因素是高网络延迟，有意或无意的时间限制违规，节点的系统时间不同步。如果网络节点具有显着的地理分布，则必须增加区块生成间隔。

通过遵循最长的区块链规则来解析分叉。当检测到两个版本的区块链时，荣誉节点将回滚较短版本并接受较长版本。

![image](/block-fork-resolution.png)