# 플랫폼 매개변수 {#platform-parameters}

플랫폼 매개변수는 IBAX 블록체인 플랫폼의 구성 매개변수입니다. 이러한 매개변수는 블록체인 네트워크와 네트워크 내의 모든 생태계에 적용됩니다.

## 플랫폼 매개변수 저장 위치 {#location-to-store-platform-parameters}

플랫폼 매개변수는 `platform ecosystem` 데이터 테이블에 저장됩니다.

이 데이터 테이블은 블록체인 네트워크에서 생성된 첫 번째 (기본) 생태계에 있습니다.

## 플랫폼 매개변수 변경 {#change-of-platform-parameters}

플랫폼 매개변수를 변경하려면 투표 후에만 가능합니다. 플랫폼 매개변수 변경은 **UpdateSysParam** 스마트 계약을 사용하여만 수행할 수 있으며, 이 스마트 계약의 관리는 플랫폼의 법적 시스템에서 정의됩니다.

## 플랫폼 매개변수 구성 {#configure-platform-parameters}

### 블록체인 네트워크 구성 {#configure-the-blockchain-network}

노드:

* [honor_nodes](#honor-nodes)
* [number of nodes](#number-of-nodes)


노드 금지령:

* [incorrect blocks per day](#incorrect-blocks-per-day)
* [node ban time](#node-ban-time)
* [node ban time local](#node-ban-time-local)

### 새로운 생태계 구성 {#configure-a-new-ecosystem}

기본 페이지와 메뉴:

* [default ecosystem page](#default-ecosystem-page)
* [default ecosystem menu](#default-ecosystem-menu)


기본 스마트 계약:

-   [default ecosystem contract](#default-ecosystem-contract)

### 데이터베이스 구성 {#configure-the-database}

데이터 테이블 제한:

* [max columns](#max-columns)
* [max indexes](#max-indexes)

### 블록 생성 구성 {#configure-the-generation-of-blocks}

시간 제한:

* [gap between blocks](#gap-between-blocks)
* [max block generation time](#max-block-generation-time)


거래 수량 제한:

* [max tx block](#max-tx-block)
* [max tx block per user](#max-tx-block-per-user)


크기 제한:

* [max tx size](#max-tx-size)
* [max block size](#max-block-size)
* [max forsign size](#max-forsign-size)


연료 제한:

* [max fuel block](#max-fuel-block)
* [max fuel tx](#max-fuel-tx)


블록 롤백 제한:

* [rollback blocks](#rollback-blocks)

## 연료 토큰 구성 {#configure-the-fuel-tokens}

보상과 수수료:

* [block reward](#block-reward)
* [commission wallet](#commission-wallet)
* [commission size](#commission-size)

연료 소비율 변환:

* [fuel rate](#fuel-rate)
* [price create rate](#price-create-rate)

거래 규모, 데이터 및 가격:

* [price tx data](#price-tx-data)
* [price tx size wallet](#price-tx-size-wallet)

새로운 요소 가격:

* [price create ecosystem](#price-create-ecosystem)
* [price create table](#price-create-table)
* [price create column](#price-create-column)
* [price create contract](#price-create-contract)
* [price create menu](#price-create-menu)
* [price create page](#price-create-page)
* [price create application](#price-create-application)

운영 가격:

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


## 폐기된 설정 {#depreciated}

사용되지 않는 매개변수:

* [blockchain url](#blockchain-url)

## 플랫폼 매개변수 세부 정보 {#details-of-platform-parameters}

### block reward {#block-reward}

> IBXC 토큰의 수를 부여하여 블록 생성에 대한 명예 노드를 지정합니다.
>
> 보상을 받을 계정은 [honor_nodes](#honor-nodes) 매개변수로 지정됩니다.

### blockchain url {#blockchain-url}

> 이 매개변수는 사용되지 않습니다.

### commission size {#commission-size}

> 수수료 비율.
>
> 이 수수료 금액은 스마트 계약 실행 총 비용에 대한 백분율로 계산됩니다. 이 수수료 토큰의 단위는 IBXC입니다.
>
> 수수료는 [commission_wallet](#commission-wallet) 매개변수에 지정된 계정 주소로 이체됩니다.

### commission wallet {#commission-wallet}

> 수수료를 받을 계정 주소입니다.
>
> 수수료의 양은 [commission_size](#commission-size) 매개변수로 지정됩니다.

### default ecosystem contract {#default-ecosystem-contract}

> 새로운 생태계의 기본 스마트 계약 소스 코드입니다.
>
> 이 스마트 계약은 생태계 창조자에게 액세스 권한을 제공합니다.

### default ecosystem menu {#default-ecosystem-menu}

> 새로운 생태계의 기본 메뉴 소스 코드입니다.

### default ecosystem page {#default-ecosystem-page}

> 새로운 생태계의 기본 페이지의 소스 코드입니다.

### fuel rate {#fuel-rate}

> 서로 다른 생태계는 연료 단위에 대해 다른 비율을 가지고 있습니다.
>
> 이 매개변수의 형식:
>
> > `[["ecosystem_id", "token_to_fuel_rate"], ["ecosystem_id2", "token_to_fuel_rate2"], ...]`
> >
> > -   `ecosystem_id`
> >
> >     > 생태계 식별자.
> >
> > -   `token_to_fuel_rate`
> >
> >     > 토큰의 연료 단위에 대한 요금입니다.
>
> 예를 들어:
>
> > `[["1","1000000000000"], ["2", "1000"]]`
> >
> > 생태계 1의 토큰이 1,000,000,000,000개의 연료 단위로 교환되었습니다. 생태계 2의 토큰이 1,000개의 연료 단위로 교환되었습니다.

### price create rate {#price-create-rate}

> 새로운 요소의 연료 효율입니다.

## honor nodes {#honor-nodes}

블록체인 네트워크의 명예 노드 목록입니다.

이 매개변수의 형식은 다음과 같습니다:
>
> > `[{"api_address":"https://apihost1:port1","public_key":"nodepub1","tcp_address":"tcphost1:port2"},{"api_address":"https://apihost2:port1","public_key":"nodepub2","tcp_address":"tcphost2:port2"}]`
> >
> > -   `tcp_address`
> >
> >     > 노드 호스트의 TCP 주소와 포트입니다.
> >     >
> >     > 거래 및 새로운 블록은 해당 호스트 주소로 전송됩니다. 이 호스트 주소는 첫 번째 블록부터 전체 블록체인을 가져오는 데에도 사용될 수 있습니다.
> >
> > -   `api_address`
> >
> >     > 노드 호스트의 API 주소와 포트입니다.
> > API 주소를 통해 Weaver를 사용하지 않고도 플랫폼의 모든 기능에 액세스할 수 있습니다. 자세한 내용은 [RESTful API](api2.md)를 참조하십시오.
> >
> > -   `public_key`
> >
> >     > 노드의 공개 키입니다. 이 공개 키는 블록 서명을 검증하는 데 사용됩니다.

### gap between blocks {#gap-between-blocks}

> 블록 생성 전후의 시간 간격 (초 단위)입니다.
>
> 네트워크의 모든 노드는 새로운 블록을 생성할 때 사용하며, 현재 노드가 이 시간 동안 새로운 블록을 생성하지 않으면 영광 노드 목록의 다음 노드로 전환됩니다.
>
> 이 매개변수의 최소값은 `1`초입니다.

### incorrect blocks per day {#incorrect-blocks-per-day}

> 매일 노드는 금지 명령이 내려지기 전에 생성할 수 있는 잘못된 블록의 수입니다.
>
> 네트워크에서 절반 이상의 노드가 특정 노드로부터 이 수의 잘못된 블록을 받으면, 해당 노드는 [node_ban_time](#node-ban-time) 동안 네트워크에서 금지됩니다.

### max block generation time {#max-block-generation-time}

> 블록 생성의 최대 시간은 밀리초 단위로 설정되며, 해당 시간 내에 블록 생성에 성공하지 못하면 시간 초과 오류가 발생합니다.

### max block size {#max-block-size}

> 블록의 최대 크기는 바이트 단위로 측정됩니다.

### max columns {#max-columns}

> 단일 데이터 테이블의 최대 필드 수입니다.
>
> 이 최대값은 미리 정의된 `id` 열을 포함하지 않습니다.

### max forsign size {#max-forsign-size}

> 거래 서명의 최대 크기는 바이트 단위로 측정됩니다.

### max fuel block {#max-fuel-block}

> 단일 블록의 최대 총 연료 비용입니다.

### max fuel tx {#max-fuel-tx}

> 단일 거래의 최대 총 연료 비용입니다.

### max indexes {#max-indexes}

> 단일 데이터 테이블에서의 최대 기본 키 필드 수입니다.

### max tx block {#max-tx-block}

> 단일 블록 내에서의 최대 거래 수입니다.

### max tx block per user {#max-tx-block-per-user}

> 한 블록 내에서의 최대 거래 수입니다.

### max tx size {#max-tx-size}

> 최대 거래 크기, 바이트 단위로 측정합니다.

### node ban time {#node-ban-time}

> 노드의 전역 금지 기간은 밀리초 단위로 측정됩니다.
>
> 네트워크에서 절반 이상의 노드가 특정 노드로부터 [incorrect_blocks_per_day](#incorrect-blocks-per-day) 개수의 잘못된 블록을 받을 경우, 해당 노드는 해당 기간 동안 네트워크에서 금지됩니다.

### node ban time local {#node-ban-time-local}

> 노드의 로컬 금지 기간은 밀리초 단위로 측정됩니다.
>
> 한 노드가 다른 노드로부터 잘못된 블록을 받았을 때, 해당 기간 동안 노드는 송신자 노드를 로컬로 금지합니다.

### number of nodes {#number-of-nodes}

> [honor_nodes](#honor_nodes) 파라미터는 최대 명예 노드 수입니다.

### price create ecosystem {#price-create-ecosystem}

> 새로운 단일 생태계의 연료 비용을 생성합니다.
>
> 이 매개변수는 `@1NewEcosystem`을 정의합니다. 스마트 계약의 추가 연료 비용입니다. 이 스마트 계약을 실행할 때, 이 계약의 각 함수를 실행하는 데 필요한 연료 비용도 계산되어 총 비용에 포함됩니다.
>
> 이 매개변수는 연료 단위로 계산됩니다. [fuel_rate](#fuel-rate)와 [price_create_rate](#price-create-rate)를 사용하여 연료 단위를 IBXC 토큰으로 변환할 수 있습니다.

### price create application {#price-create-application}

새로운 단일 애플리케이션의 연료 비용을 생성합니다.

이 매개변수는 `@1NewApplication` 계약의 추가 연료 비용을 정의합니다. 이 계약을 실행할 때, 이 계약의 각 함수를 실행하는 데 필요한 연료 비용도 계산되어 총 비용에 포함됩니다.

이 매개변수는 연료 단위로 계산됩니다. [fuel_rate](#fuel-rate)와 [price_create_rate](#price-create-rate)를 사용하여 연료 단위를 IBXC 토큰으로 변환할 수 있습니다.

### price create table {#price-create-table}

새로운 단일 데이터 테이블의 연료 비용을 생성합니다.

이 매개변수는 `@1NewTable`을 정의합니다. 계약의 추가 연료 비용입니다. 이 계약을 실행할 때, 이 계약의 각 함수를 실행하는 데 필요한 연료 비용도 계산되어 총 비용에 포함됩니다.

이 매개변수는 연료 단위로 계산됩니다. [fuel_rate](#fuel-rate)와 [price_create_rate](#price-create-rate)를 사용하여 연료 단위를 IBXC 토큰으로 변환할 수 있습니다.

### price create column {#price-create-column}

새로운 단일 테이블 필드의 연료 비용을 생성합니다.

이 매개변수는 `@1NewColumn` 계약의 추가 연료 비용을 정의합니다. 이 계약을 실행할 때, 이 계약의 각 함수를 실행하는 데 필요한 연료 비용도 계산되어 총 비용에 포함됩니다.

이 매개변수는 연료 단위로 계산됩니다. [fuel_rate](#fuel-rate)와 [price-create-rate](#price-create-rate)를 사용하여 연료 단위를 IBXC 토큰으로 변환할 수 있습니다.

### price create contract {#price-create-contract}

> 새로운 단일 계약을 생성하는 데 필요한 연료 비용입니다.
>
> 이 매개변수는 `@1NewContract` 계약의 추가 연료 비용을 정의합니다. 이 계약을 실행할 때, 이 계약의 각 함수를 실행하는 데 필요한 연료 비용도 계산되어 총 비용에 포함됩니다.
>
> 이 매개변수는 연료 단위로 정의됩니다. [fuel_rate](#fuel-rate)와 [price_create_rate](#price-create-rate)를 사용하여 연료 단위를 IBXC 토큰으로 변환할 수 있습니다.

### price create menu {#price-create-menu}

새로운 단일 메뉴의 연료 비용을 생성합니다.

이 매개변수는 `@1NewMenu` 계약의 추가 연료 비용을 정의합니다. 이 계약을 실행할 때, 이 계약의 각 함수를 실행하는 데 필요한 연료 비용도 계산되어 총 비용에 포함됩니다.

이 매개변수는 연료 단위로 계산됩니다. [fuel_rate](#fuel-rate)와 [price_create_rate](#price-create-rate)를 사용하여 연료 단위를 IBXC 토큰으로 변환할 수 있습니다.

### price create page {#price-create-page}

새로운 단일 페이지의 연료 비용을 생성합니다.

이 매개변수는 `@1NewPage` 계약의 추가 연료 비용을 정의합니다. 이 계약을 실행할 때, 이 계약의 각 함수를 실행하는 데 필요한 연료 비용도 계산되어 총 비용에 포함됩니다.

이 매개변수는 연료 단위로 계산됩니다. [fuel_rate](#fuel-rate)와 [price_create_rate](#price-create-rate)를 사용하여 연료 단위를 IBXC 토큰으로 변환할 수 있습니다.

### price exec address to id {#price-exec-address-to-id}

> `AddressToId()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec bind wallet {#price-exec-bind-wallet}

> `Activate()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec column condition {#price-exec-column-condition}

> `ColumnCondition()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec compile contract {#price-exec-compile-contract}

> `CompileContract()` 함수를 호출하는 연료 비용은 연료 단위로 계산됩니다.

### price exec contains contains {#price-exec-contains}

> `Contains()` 함수를 호출하는 연료 비용은 연료 단위로 계산됩니다.

### price exec contract by id {#price-exec-contract-by-id}

> `GetContractById()` 함수를 호출하는 연료 비용은 연료 단위로 계산됩니다.

### price exec contract by name {#price-exec-contract-by-name}

> `GetContractByName()` 함수를 호출하는 연료 비용은 연료 단위로 계산됩니다.

### price exec contracts list {#price-exec-contracts-list}

> `ContractsList()` 함수를 호출하는 연료 비용은 연료 단위로 계산됩니다.

### price exec create column {#price-exec-create-column}

> `CreateColumn()` 함수를 호출하는 연료 비용은 연료 단위로 계산됩니다.

### price exec create ecosystem {#price-exec-create-ecosystem}

> `CreateEcosystem()` 함수를 호출하는 연료 비용은 연료 단위로 계산됩니다.

### price exec create table {#price-exec-create-table}

> `CreateTable()` 함수를 호출하는 연료 비용은 연료 단위로 계산됩니다.

### price exec ecosys param {#price-exec-ecosys-param}

> `EcosysParam()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec eval {#price-exec-eval}

> `Eval()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec eval condition {#price-exec-eval-condition}

> `EvalCondition()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec flush contract {#price-exec-flush-contract}

> `FlushContract()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec has prefix {#price-exec-has-prefix}

> `HasPrefix()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec id to address {#price-exec-id-to-address}

> `IdToAddress()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec is object {#price-exec-is-object}

> `IsObject()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec join {#price-exec-join}

> `Join()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec json to map {#price-exec-json-to-map}

> `JSONToMap()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec len {#price-exec-len}

> `Len()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec perm column {#price-exec-perm-column}

> `PermColumn()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec perm table {#price-exec-perm-table}

> `PermTable()` 함수를 호출하여 연료 비용을 연료 단위로 계산합니다.

### price exec pub to id {#price-exec-pub-to-id}

> `PubToID()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec replace {#price-exec-replace}

> `Replace()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec sha256 {#price-exec-sha256}

> `Sha256()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec size {#price-exec-size}

> `Size()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec substr {#price-exec-substr}

> `Substr()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec sys fuel {#price-exec-sys-fuel}

> `SysFuel()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec sys param int {#price-exec-sys-param-int}

> `SysParamInt()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec sys param string {#price-exec-sys-param-string}

> `SysParamString()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec table conditions {#price-exec-table-conditions}

> `TableConditions()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec unbind wallet {#price-exec-unbind-wallet}

> `Deactivate()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec update lang {#price-exec-update-lang}

> `UpdateLang()` 함수를 호출하는 연료 비용을 연료 단위로 계산합니다.

### price exec validate condition {#price-exec-validate-condition}

> `ValidateCondition()` 함수를 호출하는 연료 비용은 연료 단위로 계산됩니다.

### price tx data {#price-tx-data}

> 트랜잭션당 1024 바이트 데이터의 연료 비용은 연료 단위로 계산됩니다.

### price tx size wallet {#price-tx-size-wallet}

> 트랜잭션 크기 비용은 IBXC 토큰으로 계산됩니다.
>
> 생태계 1을 제외한 다른 생태계에서 계약을 실행하면 블록 공간 사용료가 비례하여 발생하며, 1 메가 트랜잭션 크기당 **price_tx_size_wallet** IBXC 토큰 비용이 발생합니다.

### rollback blocks {#rollback-blocks}

> 在블록체인에서 포크를 감지했을 때 롤백할 수 있는 최대 블록 수입니다.
