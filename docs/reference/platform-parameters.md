# Platform Parameters {#platform-parameters}

These are parameters to configure IBAX. They are applicable to the blockchain network and all ecosystems within it.

## Location to store platform parameters {#location-to-store-platform-parameters}

Platform parameters are stored in the `system parameters` table.

This table is located in the first (default) ecosystem created on the blockchain network.

## Change of platform parameters {#change-of-platform-parameters}

Change of platform parameters can only be made through voting. You can only use the UpdateSysParam contract to change any platform parameter, which is managed by definitions in the legal system of the platform.

## Configure platform parameters {#configure-platform-parameters}

### Configure the blockchain network {#configure-the-blockchain-network}

Nodes:

* [honor_nodes](#honor-nodes)
* [number of nodes](#number-of-nodes)

Node bans:

* [incorrect blocks per day](#incorrect-blocks-per-day)
* [node ban time](#node-ban-time)
* [node ban time local](#node-ban-time-local)

### Configure a new ecosystem {#configure-a-new-ecosystem}

Default page and menu:

* [default ecosystem page](#default-ecosystem-page)
* [default ecosystem menu](#default-ecosystem-menu)

Default contract: 

* [default ecosystem contract](#default-ecosystem-contract)

### Configure the database {#configure-the-database}

Table limits:

* [max columns](#max-columns)
* [max indexes](#max-indexes)

### Configure the generation of blocks {#configure-the-generation-of-blocks}
Time limits:

* [gap between blocks](#gap-between-blocks)
* [max block generation time](#max-block-generation-time)

Transaction limits:

* [max tx block](#max-tx-block)
* [max tx block per user](#max-tx-block-per-user)

Size limits:

* [max tx size](#max-tx-size)
* [max block size](#max-block-size)
* [max forsign size](#max-forsign-size)

Fuel limits:

* [max fuel block](#max-fuel-block)
* [max fuel tx](#max-fuel-tx)

Block rollback limits:

* [rollback blocks](#rollback-blocks)

### Configure the fuel tokens {#configure-the-fuel-tokens}

Rewards and commissions:

* [block reward](#block-reward)
* [commission wallet](#commission-wallet)
* [commission size](#commission-size)

Fuel rate conversion:

* [fuel rate](#fuel-rate)
* [price create rate](#price-create-rate)

Transaction size and data price:

* [price tx data](#price-tx-data)
* [price tx size wallet](#price-tx-size-wallet)

Price for new elements:

* [price create ecosystem](#price-create-ecosystem)
* [price create table](#price-create-table)
* [price create column](#price-create-column)
* [price create contract](#price-create-contract)
* [price create menu](#price-create-menu)
* [price create page](#price-create-page)
* [price create application](#price-create-application)

Price for operations:
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

## Depreciated {#depreciated}

Depreciated parameters:

* [blockchain url](#blockchain-url)

## Details of platform parameters {#details-of-platform-parameters}

### block reward {#block-reward}

The number of IBXC tokens granted to the honor node that generates the block.

The account that receives the reward is specified in the [full nodes](#full-nodes) parameter.

### blockchain url {#blockchain-url}

Depreciated. 

### commission size {#commission-size}

Percentage of the commission.

The amount of the commission is calculated as a percentage of the total cost of implement the contract. The unit of the commission token is IBXC.

The commission will be transferred to the account address specified in the commission_wallet parameter.

### commission wallet {#commission-wallet}

The account address to receive the commission.

The amount of commission is specified by the commission_size parameter.

### default ecosystem contract {#default-ecosystem-contract}

The source code of the default contract in the new ecosystem.

This contract provides access to the ecosystem creator.

### default ecosystem menu {#default-ecosystem-menu}

The source code of the default menu of the new ecosystem.

### default ecosystem page {#default-ecosystem-page}

The source code of the default page of the new ecosystem.

### fuel rate {#fuel-rate}

The exchange rates of different ecosystem tokens by fuel unit.

The format of this parameter:

`[["ecosystem_id", "token_to_fuel_rate"], ["ecosystem_id2", "token_to_fuel_rate2"], ...]`

* `ecosystem_id`

    Ecosystem ID.
* `token_to_fuel_rate`

    Exchange rate of the token by fuel unit.

For example:

`[["1","1000000000000"], ["2", "1000"]]`

One token of Ecosystem 1 is exchanged for 1,000,000,000,000 fuel units. One token of Ecosystem 2 is exchanged for 1,000 fuel units.

### price create rate {#price-create-rate}

The fuel rate of a new element.

## honor nodes {#honor-nodes}

The list of honor nodes of the blockchain network.

The format of this parameter: 

`
[{"api_address":"https://apihost1:port1","public_key":"nodepub1","tcp_address":"tcphost1:port2"},{"api_address":"https://apihost2:port1","public_key":"nodepub2","tcp_address":"tcphost2:port2"}]
`

* `tcp_address`

     TCP address and port of the node host.
     Transactions and new blocks will be sent to this host address, which can also be used to obtain the complete blockchain from the first block.
* `api_address`

    API address and port of the node host.
    Through the API address, you can access any function of the platform without using Weaver. See details in RESTful API.
* `public_key`

    Public key of the node, which is used to verify the block signature.


### gap between blocks {#gap-between-blocks}

The time interval (in seconds) of generating two blocks on a node.

All nodes in the network use it to determine when to generate a new block. If the current node does not generate a new block within this time period, the turn passes to the next node in the list of honor nodes.

The minimum value of this parameter is `1` second.

### incorrect blocks per day {#incorrect-blocks-per-day}

The number of bad blocks that a node is allowed to generate per day before being banned.

When more than half of the nodes in the network receive the same number of bad blocks from a node, the node will be banned from the network within a time period specified in [node ban time](#node-ban-time).

### max block generation time {#max-block-generation-time}

The maximum time for generating a block, in milliseconds. If a block is not successfully generated within this time period, a timeout error will be reported.

### max block size {#max-block-size}
The maximum size of a block, in bytes.

### max columns {#max-columns}
The maximum number of fields in a single table.

However, it does not include the predefined `id` column.

### max forsign size {#max-forsign-size}
The maximum size of a transaction signature in bytes. 

### max fuel block {#max-fuel-block}
The maximum total fuel fee of a single block.

### max fuel tx {#max-fuel-tx}
The maximum total fuel fee of a single transaction.

### max indexes {#max-indexes}
The maximum number of primary key fields in a single table.

### max tx block {#max-tx-block}
The maximum number of transactions in a single block.

### max tx block per user {#max-tx-block-per-user}
The maximum number of transactions of an account in a block.

### max tx size {#max-tx-size}
The maximum size of a transaction in bytes.

### node ban time {#node-ban-time}

The global ban period of the node, in milliseconds.

When more than half of the nodes in the network receive bad blocks from a node up to the number of [incorrect blocks per day](#incorrect-blocks-per-day), the node will be banned in the network for this time period.

### node ban time local {#node-ban-time-local}

The local ban period of the node, in milliseconds.

When a node receives an incorrect block from another node, it will locally ban the sender's node during this time period.

### number of nodes {#number-of-nodes}

The maximum number of honor nodes in the [full nodes](#full-nodes) parameter. 

### price create ecosystem {#price-create-ecosystem}

The fuel fee to create a new single ecosystem.

This parameter defines the additional fuel fee of the `@1NewEcosystem` contract. When the contract is implemented, the fuel fee for executing various functions of this contract will also be calculated and included in the total cost.

This parameter is calculated in fuel units. Use [fuel rate](#fuel-rate) and [price create rate](#price-create-rate) to convert fuel units to IBXC tokens.

### price create application {#price-create-application}

The fuel fee to create a new single application.

This parameter defines the additional fuel fee of the `@1NewApplication` contract. When the contract is implemented, the fuel fee for executing various functions of this contract will also be calculated and included in the total cost.

This parameter is calculated in fuel units. Use [fuel rate](#fuel-rate) and [price create rate](#price-create-rate) to convert fuel units to IBXC tokens.

### price create table {#price-create-table}
The fuel fee to create a new single table.

This parameter defines the additional fuel cost of the `@1NewTable` contract. When the contract is implemented, the fuel cost for executing various functions of this contract will also be calculated and included in the total cost.

This parameter is calculated in fuel units. Use [fuel rate](#fuel-rate) and [price create rate](#price-create-rate) to convert fuel units to IBXC tokens.

### price create column {#price-create-column}

The fuel fee to create a new single table field.

This parameter defines the additional fuel cost of the `@1NewColumn` contract. When the contract is implemented, the fuel cost for executing various functions of this contract will also be calculated and included in the total cost.

This parameter is calculated in fuel units. Use [fuel rate](#fuel-rate) and [price create rate](#price-create-rate) to convert fuel units to IBXC tokens.

### price create contract {#price-create-contract}

The fuel fee to create a new single contract.

This parameter defines the additional fuel cost of the `@1NewContract` contract. When the contract is implemented, the fuel cost for executing various functions of this contract will also be calculated and included in the total cost.

This parameter is calculated in fuel units. Use [fuel rate](#fuel-rate) and [price create rate](#price-create-rate) to convert fuel units to IBXC tokens.

### price create menu {#price-create-menu}

The fuel fee to create a new single menu.

This parameter defines the additional fuel cost of the `@1NewMenu` contract. When the contract is implemented, the fuel cost for executing various functions of this contract will also be calculated and included in the total cost.

This parameter is calculated in fuel units. Use [fuel rate](#fuel-rate) and [price create rate](#price-create-rate) to convert fuel units to IBXC tokens.

### price create page {#price-create-page}
The fuel fee to create a new single page.

This parameter defines the additional fuel cost of the `@1NewPage` contract. When the contract is implemented, the fuel cost for executing various functions of this contract will also be calculated and included in the total cost.

This parameter is calculated in fuel units. Use [fuel rate](#fuel-rate) and [price create rate](#price-create-rate) to convert fuel units to IBXC tokens.

### price exec address to id {#price-exec-address-to-id}
The fuel fee of calling the `AddressToId()` function, calculated in fuel units. 

### price exec bind wallet {#price-exec-bind-wallet}
The fuel fee of calling the `Activate()` function, calculated in fuel units. 

### price exec column condition {#price-exec-column-condition}
The fuel fee of calling the `ColumnCondition()` function, calculated in fuel units. 

### price exec compile contract {#price-exec-compile-contract}
The fuel fee of calling the `CompileContract()` function, calculated in fuel units. 

### price exec contains {#price-exec-contains}
The fuel fee of calling the `Contains()` function, calculated in fuel units. 

### price exec contract by id {#price-exec-contract-by-id}
The fuel fee of calling the `GetContractById()` function, calculated in fuel units. 

### price exec contract by name {#price-exec-contract-by-name}
The fuel fee of calling the GetContractByName() function, calculated in fuel units. 

### price exec contracts list {#price-exec-contracts-list}
The fuel fee of calling the `ContractsList()` function, calculated in fuel units. 

### price exec create column {#price-exec-create-column}
The fuel fee of calling the `CreateColumn()` function, calculated in fuel units. 

### price exec create ecosystem {#price-exec-create-ecosystem}
The fuel fee of calling the `CreateEcosystem()` function, calculated in fuel units. 

### price exec create table {#price-exec-create-table}
The fuel fee of calling the `CreateTable()` function, calculated in fuel units. 

### price exec ecosys param {#price-exec-ecosys-param}
The fuel fee of calling the `EcosysParam()` function, calculated in fuel units. 

### price exec eval {#price-exec-eval}
The fuel fee of calling the `Eval()` function, calculated in fuel units. 

### price exec eval condition {#price-exec-eval-condition}
The fuel fee of calling the `EvalCondition()` function, calculated in fuel units. 

### price exec flush contract {#price-exec-flush-contract}
The fuel fee of calling the `FlushContract()` function, calculated in fuel units. 

### price exec has prefix {#price-exec-has-prefix}
The fuel fee of calling the `HasPrefix()` function, calculated in fuel units. 

### price exec id to address {#price-exec-id-to-address}
The fuel fee of calling the `IdToAddress()` function, calculated in fuel units. 

### price exec is object {#price-exec-is-object}
The fuel fee of calling the `IsObject()` function, calculated in fuel units. 

### price exec join {#price-exec-join}
The fuel fee of calling the `Join()` function, calculated in fuel units. 

### price exec json to map {#price-exec-json-to-map}
The fuel fee of calling the `JSONToMap()` function, calculated in fuel units. 

### price exec len {#price-exec-len}
The fuel fee of calling the `Len()` function, calculated in fuel units. 

### price exec perm column {#price-exec-perm-column}
The fuel fee of calling the `PermColumn()` function, calculated in fuel units. 

### price exec perm table {#price-exec-perm-table}
The fuel fee of calling the `PermTable()` function, calculated in fuel units. 

### price exec pub to id {#price-exec-pub-to-id}
The fuel fee of calling the `PubToID()` function, calculated in fuel units. 

### price exec replace {#price-exec-replace}
The fuel fee of calling the `Replace()` function, calculated in fuel units. 

### price exec sha256 {#price-exec-sha256}
The fuel fee of calling the `Sha256()` function, calculated in fuel units. 

### price exec size {#price-exec-size}
The fuel fee of calling the `Size()` function, calculated in fuel units. 

### price exec substr {#price-exec-substr}
The fuel fee of calling `theSubstr()` function, calculated in fuel units. 

### price exec sys fuel {#price-exec-sys-fuel}
The fuel fee of calling the `SysFuel()` function, calculated in fuel units. 

### price exec sys param int {#price-exec-sys-param-int}
The fuel fee of calling the `SysParamInt()` function, calculated in fuel units. 

### price exec sys param string {#price-exec-sys-param-string}
The fuel fee of calling the `SysParamString()` function, calculated in fuel units. 

### price exec table conditions {#price-exec-table-conditions}
The fuel fee of calling the `TableConditions()` function, calculated in fuel units. 

### price exec unbind wallet {#price-exec-unbind-wallet}
The fuel fee of calling the `Deactivate()` function, calculated in fuel units. 

### price exec update lang {#price-exec-update-lang}
The fuel fee of calling the `UpdateLang()` function, calculated in fuel units. 

### price exec validate condition {#price-exec-validate-condition}
The fuel fee of calling the `ValidateCondition()` function, calculated in fuel units. 

### price tx data {#price-tx-data}
The fuel fee for every 1024 bytes of a transaction, calculated in fuel units. 

### price tx size wallet {#price-tx-size-wallet}
The fee by transaction size, its unit is the IBXC token.

Except the ecosystem 1, a block space usage fee will be incurred proportionally when implementing a contract in other ecosystems, and its rate is *price tx size wallet* IBXC tokens per megabyte.

### rollback blocks {#rollback-blocks}
Maximum number of blocks that can be rolled back when detecting a fork in the blockchain.
