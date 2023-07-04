
# 데몬 {#daemon}

이 섹션에서는 기술적인 관점에서 IBax 노드가 서로 상호 작용하는 방법에 대해 설명합니다.

## 서버 데몬에 대하여 {#about-the-server-daemon}

서버 데몬은 모든 네트워크 노드에서 실행되어 다양한 서버 기능을 수행하고 IBax의 블록체인 프로토콜을 지원해야 합니다. 블록체인 네트워크에서 데몬은 블록과 거래를 분배하고, 새로운 블록을 생성하며, 받은 블록과 거래를 검증하고, 포크 이슈를 방지할 수 있습니다.

### 영광 노드 데몬 {#honor-node-daemon}

영광 노드는 다음과 같은 서버 데몬을 실행합니다:

* [BlockGenerator daemon](#blockgenerator-daemon)

    새로운 블록 생성

* [BlockCollection daemon](#blockcollection-daemon)

    다른 노드에서 새로운 블록 다운로드

* [Confirmations daemon](#confirmations-daemon)

    해당 노드의 블록이 대부분의 다른 노드에도 존재하는지 확인

* [Disseminator daemon](#disseminator-daemon)

    거래와 블록을 다른 영광 노드로 배포

* QueueParserBlocks daemon

    큐에 있는 블록, 다른 노드에서 가져온 블록이 포함됨

    블록 처리 로직은 [BlockCollection daemon](#blockcollection-daemon)과 동일

* QueueParserTx daemon

    큐에 있는 거래 검증

* Scheduler daemon

    계약을 예약된 시간에 실행


### 수호자 노드 데몬 (Guardian Node Daemon) {#guardian-node-daemon}

수호자 노드는 다음과 같은 서버 데몬을 실행합니다:

* [BlockCollection daemon](#blockcollection-daemon)
* [Confirmations daemon](#confirmations-daemon)
* [Disseminator daemon](#disseminator-daemon)
* QueueParserTx
* Scheduler

## 블록 수집 데몬 (BlockCollection Daemon) {#blockcollection-daemon}

이 데몬은 블록을 다운로드하고 블록체인을 다른 네트워크 노드와 동기화합니다.

### 블록체인 동기화 {#blockchain-synchronization}

이 데몬은 블록체인 네트워크에서 최대 블록 높이를 결정하고, 새로운 블록을 요청하며, 블록체인에서 포크 이슈를 해결함으로써 블록체인을 동기화합니다.

#### 블록체인 업데이트 확인 {#check-for-blockchain-updates}

이 데몬은 현재 블록 ID부터 모든 영광 노드에게 요청을 보냅니다.

데몬을 실행 중인 노드의 현재 블록 ID가 어떤 영광 노드의 현재 블록 ID보다 작다면, 해당 블록체인 네트워크 노드는 오래된 것으로 간주됩니다.

#### 새 블록 다운로드 {#download-new-blocks}

가장 큰 현재 블록 높이를 반환하는 노드가 최신 노드로 간주됩니다.
데몬은 모든 알 수 없는 블록을 다운로드합니다.

#### 포크 문제 해결 {#solving-the-fork-issue}

블록체인에서 포크가 감지되면 데몬은 모든 블록을 공통 상위 블록으로 다운로드하여 포크를 뒤로 이동합니다.
공통 상위 블록이 발견되면 데몬을 실행하는 노드에서 블록체인 롤백이 수행되고 최신 블록이 포함될 때까지 올바른 블록이 블록체인에 추가됩니다.

### Tables {#tables-1}

BlocksCollection 데몬은 다음 테이블을 사용합니다.

* block_chain
* transactions
* transactions_status
* info_block

### Request {#request-1}

BlockCollection 데몬은 다음 요청을 다른 데몬으로 보냅니다.

* [Type 10](#type-10) 은 전체 명예 노드 중 가장 큰 블록 ID를 가리킵니다.
* [Type 7](#type-7) 은 블록 ID가 가장 큰 데이터를 가리킵니다.

## BlockGenerator 데몬 {#blockgenerator-daemon}

BlockGenerator 데몬은 새 블록을 생성합니다.

### 사전 검증 {#pre-verification}

BlockGenerator 데몬은 블록체인의 최신 블록을 분석하여 새로운 블록 생성 계획을 세웁니다.

다음 조건이 충족되면 새 블록을 생성할 수 있습니다.

* 최신 블록을 생성한 노드는 Honor Node 목록 내의 노드에 있으며 데몬을 실행합니다.
* 가장 최근에 검증되지 않은 블록이 생성된 이후 가장 짧은 시간입니다.

### 블록 생성 {#block-generation}

데몬에 의해 생성된 새로운 블록에는 다른 노드의 [Disseminator 데몬](#disseminator-daemon)에서 받거나 데몬을 실행하는 노드에서 생성할 수 있는 모든 새 트랜잭션이 포함됩니다. 생성된 블록은 노드 데이터베이스에 저장됩니다.

### Tables {#tables-2}

BlockGenerator 데몬은 다음 테이블을 사용합니다.

* block_chain (saves new blocks)
* transactions
* transactions_status
* info_block

### Request {#request-2}

BlockGenerator 데몬은 다른 데몬에 요청하지 않습니다.

## 디세미네이터 데몬 {#disseminator-daemon}

Disseminator 데몬은 트랜잭션과 블록을 모든 명예 노드로 보냅니다.

### 가디언 노드 {#guardian-node}

가디언 노드에서 작업할 때 데몬은 해당 노드에서 생성된 트랜잭션을 모든 명예 노드로 보냅니다.

### 명예노드 {#honor-node}

명예 노드에서 작업할 때 데몬은 생성된 블록과 트랜잭션 해시를 모든 명예 노드로 보냅니다.

그런 다음 Honor Node는 자신에게 알려지지 않은 트랜잭션 요청에 응답합니다. 데몬은 전체 트랜잭션 데이터를 응답으로 보냅니다.

### Tables {#tables-3}

Disseminator 데몬은 다음 테이블을 사용합니다.

* transactions

### Request {#request-3}

Disseminator 데몬은 다음 요청을 다른 데몬으로 보냅니다.

* [Type 1](#type-1) 트랜잭션 및 블록 해시를 Honor 노드로 보냅니다.
* [Type 2](#type-2) 아너노드로부터 트랜잭션 데이터를 받습니다.

## 확인 데몬 {#confirmations-daemon}

확인 데몬은 노드의 모든 블록이 대부분의 다른 노드에 있는지 확인합니다.

### 차단 확인 {#block-confirmation}

네트워크의 여러 노드에서 확인한 블록은 확인된 블록으로 간주됩니다.

데몬은 현재 데이터베이스에서 확인되지 않은 첫 번째 블록부터 하나씩 모든 블록을 확인합니다.

각 블록은 다음과 같은 방식으로 확인됩니다.

* 확인 중인 블록의 ID가 포함된 요청을 모든 명예 노드에 보냅니다.
* 모든 명예 노드는 블록 해시에 응답합니다.
* 응답한 해시가 데몬 노드에 있는 블록의 해시와 일치하면 확인 카운터 값이 증가합니다. 그렇지 않은 경우 취소 카운터 값이 증가합니다.

### Tables {#tables-4}

확인 데몬은 다음 테이블을 사용합니다.

* confirmation
* info_block

### Request {#request-4}

확인 데몬은 다음 요청을 다른 데몬으로 보냅니다.

* [Type 4](#type-4) 명예 노드에서 블록 해시를 요청합니다.

## TCP 서비스 프로토콜 {#tcp-service-protocol}

TCP 서비스 프로토콜은 명예 노드 및 가디언 노드에서 작동하며 TCP의 이진 프로토콜을 사용하여 BlocksCollection, Disseminator 및 Confirmation 데몬의 요청에 사용합니다.

## 요청 유형 {#request-type}

각 요청에는 요청의 처음 두 바이트로 정의된 유형이 있습니다.

## 유형 1 {#type-1}

#### 발신자 요청 {#request-sender-1}

이 요청은 [Disseminator 데몬](#disseminator-daemon)에 의해 전송됩니다.

#### 데이터 요청 {#request-data-1}

트랜잭션 및 블록의 해시.

#### 요청 처리 {#request-processing-1}

블록 해시가 블록 대기열에 추가됩니다.

트랜잭션 해시를 분석 및 검증하고 아직 노드에 나타나지 않은 트랜잭션을 선택합니다.

#### 응답 {#response-1}

아니요. 요청을 처리한 후 [Type 2](#type-2) 요청이 발행됩니다.

## 유형 2 {#type-2}

#### 발신자 요청 {#request-sender-2}

이 요청은 [Disseminator 데몬](#disseminator-daemon)에 의해 전송됩니다.

#### 데이터 요청 {#request-data-2}

데이터 크기를 포함한 트랜잭션 데이터:

* data_size(4바이트)

* 트랜잭션 데이터의 크기(바이트).

* 데이터(data_size 바이트)

거래 데이터입니다.

#### 요청 처리 {#request-processing-2}

트랜잭션을 확인하고 트랜잭션 대기열에 추가합니다.

#### 응답 {#response-2}

아니요.

## 유형 4 {#type-4}

#### 발신자 요청 {#request-sender-3}

이 요청은 [확인 데몬](#confirmations-daemon)에서 보냅니다.

#### 데이터 요청 {#request-data-3}

블록 ID.

#### 응답 {#response-3}

블록 해시.

이 ID를 가진 블록이 없으면 `0` 을 반환합니다.

## 유형 7 {#type-7}

#### 발신자 요청 {#request-sender-4}

이 요청은 [BlockCollection 데몬](#blockcollection-daemon)에서 보냅니다.

#### 데이터 요청 {#request-data-4}

블록 ID.

* block_id(4바이트)

#### 응답 {#response-4}

데이터 크기를 포함한 블록 데이터.

* data_size(4바이트)

* 블록 데이터의 크기(바이트).

* 데이터(data_size 바이트)

블록 데이터.

이 ID를 가진 블록이 없으면 연결이 닫힙니다.

## 유형 10 {#type-10}

#### 발신자 요청 {#request-sender-5}

이 요청은 [BlockCollection 데몬](#blockcollection-daemon)에서 보냅니다.

#### 데이터 요청 {#request-data-5}

아니요.

#### 응답 {#response-5}

블록 ID.

* block_id (4바이트)

