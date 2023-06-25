# 平台参数 {#platform-parameters}

平台参数是 IBAX区块链平台的配置参数。这些参数适用于区块链网络和网络中的所有生态系统。

## 存储平台参数的位置 {#location-to-store-platform-parameters}

平台参数存储在 `platform ecosystem` 数据表。

该数据表在区块链网络上创建的第一个（默认）生态系统中。

## 更改平台参数 {#change-of-platform-parameters}

必须在投票通过后才能更改平台参数。更改平台参数只能使用**UpdateSysParam** 合约，该合约的管理在平台的法律系统中定义。

## 平台参数配置 {#configure-platform-parameters}

### 区块链网络配置 {#configure-the-blockchain-network}

节点:

* [honor_nodes](#honor-nodes)
* [number of nodes](#number-of-nodes)


节点禁令:

* [incorrect blocks per day](#incorrect-blocks-per-day)
* [node ban time](#node-ban-time)
* [node ban time local](#node-ban-time-local)

### 新生态系统配置 {#configure-a-new-ecosystem}

默认页面和菜单:

* [default ecosystem page](#default-ecosystem-page)
* [default ecosystem menu](#default-ecosystem-menu)


默认合约:

-   [default ecosystem contract](#default-ecosystem-contract)

### 数据库配置 {#configure-the-database}

数据表限制:

* [max columns](#max-columns)
* [max indexes](#max-indexes)

### 区块生成配置 {#configure-the-generation-of-blocks}

时间限制:

* [gap between blocks](#gap-between-blocks)
* [max block generation time](#max-block-generation-time)


交易数量限制:

* [max tx block](#max-tx-block)
* [max tx block per user](#max-tx-block-per-user)


大小限制:

* [max tx size](#max-tx-size)
* [max block size](#max-block-size)
* [max forsign size](#max-forsign-size)


燃料限制:

* [max fuel block](#max-fuel-block)
* [max fuel tx](#max-fuel-tx)


区块回滚限制:

* [rollback blocks](#rollback-blocks)

## 燃料通证配置 {#configure-the-fuel-tokens}

奖励和佣金:

* [block reward](#block-reward)
* [commission wallet](#commission-wallet)
* [commission size](#commission-size)

燃料费率转换:

* [fuel rate](#fuel-rate)
* [price create rate](#price-create-rate)

交易大小数据价格:

* [price tx data](#price-tx-data)
* [price tx size wallet](#price-tx-size-wallet)

新建元素价格:

* [price create ecosystem](#price-create-ecosystem)
* [price create table](#price-create-table)
* [price create column](#price-create-column)
* [price create contract](#price-create-contract)
* [price create menu](#price-create-menu)
* [price create page](#price-create-page)
* [price create application](#price-create-application)

运营价格:
<!-- TOC -->

- [Platform Parameters](#platform-parameters)
  - [Location to store platform parameters](#location-to-store-platform-parameters)
  - [Change of platform parameters](#change-of-platform-parameters)
  - [Configure platform parameters](#configure-platform-parameters)
    - [Configure the blockchain network](#configure-the-blockchain-network)
    - [Configure a new ecosystem](#configure-a-new-ecosystem)
    - [Configure the database](#configure-the-database)
    - [Configure the generation of blocks](#configure-the-generation-of-blocks)
    - [Configure the fuel tokens](#configure-the-fuel-tokens)
    - [Depreciated](#depreciated)
  - [Details of platform parameters](#details-of-platform-parameters)
    - [block reward](#block-reward)
    - [blockchain url](#blockchain-url)
    - [commission size](#commission-size)
    - [commission wallet](#commission-wallet)
    - [default ecosystem contract](#default-ecosystem-contract)
    - [default ecosystem menu](#default-ecosystem-menu)
    - [default ecosystem page](#default-ecosystem-page)
    - [fuel rate](#fuel-rate)
    - [price create rate](#price-create-rate)
    - [full nodes](#full-nodes)
    - [gap between blocks](#gap-between-blocks)
    - [incorrect blocks per day](#incorrect-blocks-per-day)
    - [max block generation time](#max-block-generation-time)
    - [max block size](#max-block-size)
    - [max columns](#max-columns)
    - [max forsign size](#max-forsign-size)
    - [max fuel block](#max-fuel-block)
    - [max fuel tx](#max-fuel-tx)
    - [max indexes](#max-indexes)
    - [max tx block](#max-tx-block)
    - [max tx block per user](#max-tx-block-per-user)
    - [max tx size](#max-tx-size)
    - [node ban time](#node-ban-time)
    - [node ban time local](#node-ban-time-local)
    - [number of nodes](#number-of-nodes)
    - [price create ecosystem](#price-create-ecosystem)
    - [price create application](#price-create-application)
    - [price create table](#price-create-table)
    - [price create column](#price-create-column)
    - [price create contract](#price-create-contract)
    - [price create menu](#price-create-menu)
    - [price create page](#price-create-page)
    - [price exec address to id](#price-exec-address-to-id)
    - [price exec bind wallet](#price-exec-bind-wallet)
    - [price exec column condition](#price-exec-column-condition)
    - [price exec compile contract](#price-exec-compile-contract)
    - [price exec contains](#price-exec-contains)
    - [price exec contract by id](#price-exec-contract-by-id)
    - [price exec contract by name](#price-exec-contract-by-name)
    - [price exec contracts list](#price-exec-contracts-list)
    - [price exec create column](#price-exec-create-column)
    - [price exec create ecosystem](#price-exec-create-ecosystem)
    - [price exec create table](#price-exec-create-table)
    - [price exec ecosys param](#price-exec-ecosys-param)
    - [price exec eval](#price-exec-eval)
    - [price exec eval condition](#price-exec-eval-condition)
    - [price exec flush contract](#price-exec-flush-contract)
    - [price exec has prefix](#price-exec-has-prefix)
    - [price exec id to address](#price-exec-id-to-address)
    - [price exec is object](#price-exec-is-object)
    - [price exec join](#price-exec-join)
    - [price exec json to map](#price-exec-json-to-map)
    - [price exec len](#price-exec-len)
    - [price exec perm column](#price-exec-perm-column)
    - [price exec perm table](#price-exec-perm-table)
    - [price exec pub to id](#price-exec-pub-to-id)
    - [price exec replace](#price-exec-replace)
    - [price exec sha256](#price-exec-sha256)
    - [price exec size](#price-exec-size)
    - [price exec substr](#price-exec-substr)
    - [price exec sys fuel](#price-exec-sys-fuel)
    - [price exec sys param int](#price-exec-sys-param-int)
    - [price exec sys param string](#price-exec-sys-param-string)
    - [price exec table conditions](#price-exec-table-conditions)
    - [price exec unbind wallet](#price-exec-unbind-wallet)
    - [price exec update lang](#price-exec-update-lang)
    - [price exec validate condition](#price-exec-validate-condition)
    - [price tx data](#price-tx-data)
    - [price tx size wallet](#price-tx-size-wallet)
    - [rollback blocks](#rollback-blocks)

<!-- /TOC -->


## 弃用配置 {#depreciated}

已弃用参数:

* [blockchain url](#blockchain-url)

## 平台参数详情 {#details-of-platform-parameters}

### block reward {#block-reward}

> 授予生成区块的 荣誉节点 的 IBXC 通证数量。
>
> 接受奖励的帐户在 [honor_nodes](#honor_nodes) 参数中指定。

### blockchain url {#blockchain-url}

> 该参数已弃用。

### commission size {#commission-size}

> 佣金百分比。
>
> 这笔佣金数量为执行合约总费用按百分比计算得出。该佣金通证单位 IBXC。
>
> 佣金将转移到 [commission_wallet](#commission_wallet) 参数中指定的帐户地址。

### commission wallet {#commission-wallet}

> 收取佣金的账户地址。
>
> 佣金数量由 [commission_size](#commission_size) 参数指定。

### default ecosystem contract {#default-ecosystem-contract}

> 新生态系统默认合约的源代码。
>
> 该合约为生态系统创建者提供访问权限。

### default ecosystem menu {#default-ecosystem-menu}

> 新生态系统的默认菜单的源代码。

### default ecosystem page {#default-ecosystem-page}

> 新生态系统的默认页面的源代码。

### fuel rate {#fuel-rate}

> 不同生态系统通证对燃料单位的费率。
>
> 该参数的格式：
>
> > `[["ecosystem_id", "token_to_fuel_rate"], ["ecosystem_id2", "token_to_fuel_rate2"], ...]`
> >
> > -   `ecosystem_id`
> >
> >     > 生态系统ID。
> >
> > -   `token_to_fuel_rate`
> >
> >     > 通证对燃料单位的费率。
>
> 例如:
>
> > `[["1","1000000000000"], ["2", "1000"]]`
> >
> > 生态系统1的一个通证被交换到1000000000000个燃料单位。生态系统2的一个通证被交换到1000个燃料单位。

### price create rate {#price-create-rate}

> 新建元素的燃料费率。

## honor nodes {#honor-nodes}

> 区块链网络的 荣誉节点 列表。
>
> 该参数的格式：
>
> > `[{"api_address":"https://apihost1:port1","public_key":"nodepub1","tcp_address":"tcphost1:port2"},{"api_address":"https://apihost2:port1","public_key":"nodepub2","tcp_address":"tcphost2:port2"}]`
> >
> > -   `tcp_address`
> >
> >     > 节点主机的TCP地址和端口。
> >     >
> >     > 交易和新区块将发送到该主机地址。该主机地址还可用于从第一个区块开始获取完整的区块链。
> >
> > -   `api_address`
> >
> >     > 节点主机的API地址和端口。
> >     >
> >     > 通过API地址可以在不使用 Weaver 的情况下访问平台的任何功能。详情[RESTful API](api2.md) 。
> >
> > -   `public_key`
> >
> >     > 节点的公钥。此公钥用于验证区块签名。

### gap between blocks {#gap-between-blocks}

> 节点生成前后区块的时间间隔(以秒为单位)。
>
> 网络中的所有节点都使用它来确定何时生成新区块，如果当前节点在此时间段内未生成新区块，则转向传递到 荣誉节点 列表中的下一个节点。
>
> 该参数最小值为 `1` 秒。

### incorrect blocks per day {#incorrect-blocks-per-day}

> 节点每天在被禁令前允许生成的坏区块数量。
>
> 当网络中超过一半的节点从某个节点收到此数量的坏区块时，此节点将在 [node_ban_time](#node_ban_time) 时间内从网络中被禁令。

### max block generation time {#max-block-generation-time}

> 生成区块的最大时间，单位毫秒，该时间内如果未能成功生成区块，则报错超时。

### max block size {#max-block-size}

> 区块最大大小，单位字节。

### max columns {#max-columns}

> 单个数据表的最大字段数。
>
> 这个最大值不包括预定义的 `id` 列。

### max forsign size {#max-forsign-size}

> 交易签名最大大小，单位字节。

### max fuel block {#max-fuel-block}

> 单个区块的最大总燃料费用。

### max fuel tx {#max-fuel-tx}

> 单笔交易的最高总燃料费用。

### max indexes {#max-indexes}

> 单个数据表中的最大主键字段数。

### max tx block {#max-tx-block}

> 单个区块中的最大交易数。

### max tx block per user {#max-tx-block-per-user}

> 一个账户在一个区块内的最大交易数。

### max tx size {#max-tx-size}

> 最大交易大小，以字节为单位。

### node ban time {#node-ban-time}

> 节点的全局禁令期，以毫秒为单位。
>
> 当网络中超过一半的节点从某个节点收到坏区块达到 [incorrect_blocks_per_day](#incorrect_blocks_per_day) 数量时，该节点将在该时间内从网络中被禁令。

### node ban time local {#node-ban-time-local}

> 节点的本地禁令期，以毫秒为单位。
>
> 当一个节点从另一个节点接收到不正确的块时，它将在这段时间内本地禁令发送方节点。

### number of nodes {#number-of-nodes}

> [honor_nodes](#honor_nodes) 参数中的最大荣誉节点数量。

### price create ecosystem {#price-create-ecosystem}

> 创建新单个生态系统的燃料费用。
>
> 该参数定义了 `@1NewEcosystem`。
> 合约的额外燃料费用。执行该合约时，还会计算执行本合约各项函数的燃料费用，并计入总费用。
>
> 该参数以燃料单位计算。使用 [fuel_rate](#fuel_rate) 和 [price_create_rate](#price_create_rate) 将燃料单位转换为IBXC 通证。

### price create application {#price-create-application}

> 创建新单个应用程序的燃料费用。
>
> 该参数定义了 `@1NewApplication` 合约的额外燃料费用。执行该合约时，还会计算执行本合约各项函数的燃料费用，并计入总费用。
>
> 该参数以燃料单位计算。使用 [fuel_rate](#fuel_rate) 和 [price_create_rate](#price_create_rate) 将燃料单位转换为IBXC 通证。

### price create table {#price-create-table}

> 创建新单个数据表的燃料费用。
>
> 该参数定义了 `@1NewTable`。
> 合约的额外燃料费用。执行该合约时，还会计算执行本合约各项函数的燃料费用，并计入总费用。
>
> 该参数以燃料单位计算。使用 [fuel_rate](#fuel_rate) 和 [price_create_rate](#price_create_rate) 将燃料单位转换为IBXC 通证。

### price create column {#price-create-column}

> 创建新单个表字段的燃料费用。
>
> 该参数定义了 `@1NewColumn`合约的额外燃料费用。执行该合约时，还会计算执行本合约各项函数的燃料费用，并计入总费用。
>
> 该参数以燃料单位计算。使用 [fuel_rate](#fuel_rate) 和 [price_create_rate](#price_create_rate) 将燃料单位转换为IBXC 通证。

### price create contract {#price-create-contract}

> 创建新单个合约的燃料费用。
>
> 该参数定义了 `@1NewContract`合约的额外燃料费用。执行该合约时，还会计算执行本合约各项函数的燃料费用，并计入总费用。
>
> 该参数以燃料单位计算。使用 [fuel_rate](#fuel_rate) 和 [price_create_rate](#price_create_rate) 将燃料单位转换为IBXC 通证。

### price create menu {#price-create-menu}

> 创建新单个菜单的燃料费用。
>
> 该参数定义了 `@1NewMenu`合约的额外燃料费用。执行该合约时，还会计算执行本合约各项函数的燃料费用，并计入总费用。
>
> 该参数以燃料单位计算。使用 [fuel_rate](#fuel_rate) 和 [price_create_rate](#price_create_rate) 将燃料单位转换为IBXC 通证。

### price create page {#price-create-page}

> 创建新单个页面的燃料费用。
>
> 该参数定义了 `@1NewPage`合约的额外燃料费用。执行该合约时，还会计算执行本合约各项函数的燃料费用，并计入总费用。
>
> 该参数以燃料单位计算。使用 [fuel_rate](#fuel_rate) 和 [price_create_rate](#price_create_rate) 将燃料单位转换为IBXC 通证。

### price exec address to id {#price-exec-address-to-id}

> 调用 `AddressToId()`函数的燃料费用，以燃料单位计算。

### price exec bind wallet {#price-exec-bind-wallet}

> 调用 `Activate()`函数的燃料费用，以燃料单位计算。

### price exec column condition {#price-exec-column-condition}

> 调用 `ColumnCondition()`函数的燃料费用，以燃料单位计算。

### price exec compile contract {#price-exec-compile-contract}

> 调用 `CompileContract()`函数的燃料费用，以燃料单位计算。

### price exec contains {#price-exec-contains}

> 调用 `Contains()`函数的燃料费用，以燃料单位计算。

### price exec contract by id {#price-exec-contract-by-id}

> 调用 `GetContractById()`函数的燃料费用，以燃料单位计算。

### price exec contract by name {#price-exec-contract-by-name}

> 调用 `GetContractByName()`函数的燃料费用，以燃料单位计算。

### price exec contracts list {#price-exec-contracts-list}

> 调用 `ContractsList()`函数的燃料费用，以燃料单位计算。

### price exec create column {#price-exec-create-column}

> 调用 `CreateColumn()`函数的燃料费用，以燃料单位计算。

### price exec create ecosystem {#price-exec-create-ecosystem}

> 调用 `CreateEcosystem()`函数的燃料费用，以燃料单位计算。

### price exec create table {#price-exec-create-table}

> 调用 `CreateTable()`函数的燃料费用，以燃料单位计算。

### price exec ecosys param {#price-exec-ecosys-param}

> 调用 `EcosysParam()`函数的燃料费用，以燃料单位计算。

### price exec eval {#price-exec-eval}

> 调用 `Eval()`函数的燃料费用，以燃料单位计算。

### price exec eval condition {#price-exec-eval-condition}

> 调用 `EvalCondition()`函数的燃料费用，以燃料单位计算。

### price exec flush contract {#price-exec-flush-contract}

> 调用 `FlushContract()`函数的燃料费用，以燃料单位计算。

### price exec has prefix {#price-exec-has-prefix}

> 调用 `HasPrefix()`函数的燃料费用，以燃料单位计算。

### price exec id to address {#price-exec-id-to-address}

> 调用 `IdToAddress()`函数的燃料费用，以燃料单位计算。

### price exec is object {#price-exec-is-object}

> 调用 `IsObject()`函数的燃料费用，以燃料单位计算。

### price exec join {#price-exec-join}

> 调用 `Join()`函数的燃料费用，以燃料单位计算。

### price exec json to map {#price-exec-json-to-map}

> 调用 `JSONToMap()`函数的燃料费用，以燃料单位计算。

### price exec len {#price-exec-len}

> 调用 `Len()`函数的燃料费用，以燃料单位计算。

### price exec perm column {#price-exec-perm-column}

> 调用 `PermColumn()`函数的燃料费用，以燃料单位计算。

### price exec perm table {#price-exec-perm-table}

> 调用 `PermTable()`函数的燃料费用，以燃料单位计算。

### price exec pub to id {#price-exec-pub-to-id}

> 调用 `PubToID()`函数的燃料费用，以燃料单位计算。

### price exec replace {#price-exec-replace}

> 调用 `Replace()`函数的燃料费用，以燃料单位计算。

### price exec sha256 {#price-exec-sha256}

> 调用 `Sha256()`函数的燃料费用，以燃料单位计算。

### price exec size {#price-exec-size}

> 调用 `Size()`函数的燃料费用，以燃料单位计算。

### price exec substr {#price-exec-substr}

> 调用 `Substr()`函数的燃料费用，以燃料单位计算。

### price exec sys fuel {#price-exec-sys-fuel}

> 调用 `SysFuel()`函数的燃料费用，以燃料单位计算。

### price exec sys param int {#price-exec-sys-param-int}

> 调用 `SysParamInt()`函数的燃料费用，以燃料单位计算。

### price exec sys param string {#price-exec-sys-param-string}

> 调用 `SysParamString()`函数的燃料费用，以燃料单位计算。

### price exec table conditions {#price-exec-table-conditions}

> 调用 `TableConditions()`函数的燃料费用，以燃料单位计算。

### price exec unbind wallet {#price-exec-unbind-wallet}

> 调用 `Deactivate()`函数的燃料费用，以燃料单位计算。

### price exec update lang {#price-exec-update-lang}

> 调用 `UpdateLang()`函数的燃料费用，以燃料单位计算。

### price exec validate condition {#price-exec-validate-condition}

> 调用 `ValidateCondition()`函数的燃料费用，以燃料单位计算。

### price tx data {#price-tx-data}

> 交易每1024字节数据的燃料费用，以燃料单位计算。

### price tx size wallet {#price-tx-size-wallet}

> 交易大小费用，以 IBXC 通证为单位。
>
> 除生态系统1之外，在其它生态系统内执行合约将按照比例产生区块空间使用费用，每兆交易大小产生**price_tx_size_wallet** IBXC 通证费用。

### rollback blocks {#rollback-blocks}

> 在区块链中检测到分叉时可以回滚的最大区块数。
