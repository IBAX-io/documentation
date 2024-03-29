# Daemon {#daemon}

In this section, we will describe how IBax nodes interact with each other from a technical perspective.

## About the server daemon {#about-the-server-daemon}

The server daemon needs to run on every network node, which executes various server functions and supports IBax's blockchain protocol. In the blockchain network, the daemon distributes blocks and transactions, generates new blocks, and verifies blocks and transactions received, and it can avoid the fork issue.

### Honor node daemon {#honor-node-daemon}

A honor node runs the following server daemons:

* [BlockGenerator daemon](#blockgenerator-daemon)

    Generating new blocks.

* [BlockCollection daemon](#blockcollection-daemon)

    Downloading new blocks from other nodes.

* [Confirmations daemon](#confirmations-daemon)

    Confirming that blocks on the node also exist on most other nodes.

* [Disseminator daemon](#disseminator-daemon)

    Distributing transactions and blocks to other honor nodes.

* QueueParserBlocks daemon

    Blocks in the queue, which contains blocks from other nodes.

    Block processing logic is the same as [BlockCollection daemon](#blockcollection-daemon).

* QueueParserTx daemon

    Verifying the transactions in queue.

* Scheduler daemon

    Running contracts as scheduled.

### Guardian node daemon {#guardian-node-daemon}

A guardian node runs the following server daemons:

* [BlockCollection daemon](#blockcollection-daemon)
* [Confirmations daemon](#confirmations-daemon)
* [Disseminator daemon](#disseminator-daemon)
* QueueParserTx
* Scheduler

## BlockCollection daemon {#blockcollection-daemon}

This daemon downloads blocks and synchronizes the blockchain with other network nodes.

### Blockchain synchronization {#blockchain-synchronization}

This daemon synchronizes the blockchain by determining the maximum block height in the blockchain network, requesting new blocks, and solving the fork issue in the blockchain.

#### Check for blockchain updates {#check-for-blockchain-updates}

This daemon sends requests from the current block ID to all honor nodes.

If the current block ID of the node running the daemon is less than the current block ID of any honor node, the blockchain network node is considered out of date.

#### Download new blocks {#download-new-blocks}

The node that returns the largest current block height is considered the latest node.
The daemon downloads all unknown blocks.

#### Solving the fork issue {#solving-the-fork-issue}

If a fork is detected in the blockchain, the daemon moves the fork backward by downloading all blocks to a common parent block.
When found the common parent block, a blockchain rollback is performed on the node running the daemon, and the correct block is added to the blockchain until the latest one is included.

### Tables {#tables-1}

The BlocksCollection daemon uses the following tables:

* block_chain
* transactions
* transactions_status
* info_block

### Request {#request-1}

The BlockCollection daemon sends the following requests to other daemons:

* [Type 10](#type-10) points to the largest block ID among all honor nodes.
* [Type 7](#type-7) points to the data with the largest block ID.

## BlockGenerator daemon {#blockgenerator-daemon}

The BlockGenerator daemon generates new blocks.

### Pre-verification {#pre-verification}

The BlockGenerator daemon analyzes the latest blocks in the blockchain to make new block generation plans. 

If the following conditions are met, a new block can be generated:

* The node that generated the latest block is in a node within the honor node list and runs the daemon.
* The shortest time since the latest unverified block was generated.

### Block generation {#block-generation}

A new block generated by the daemon contains all new transactions, which can be received from the [Disseminator daemon](#disseminator-daemon) of other nodes or generated by the node running the daemon. The block generated is stored in the node database.

### Tables {#tables-2}

The BlockGenerator daemon uses the following tables:

* block_chain (saves new blocks)
* transactions
* transactions_status
* info_block

### Request {#request-2}

The BlockGenerator daemon does not make any request to other daemons.

## Disseminator daemon {#disseminator-daemon}

The Disseminator daemon sends transactions and blocks to all honor nodes.

### Guardian node {#guardian-node}

When working on a guardian node, the daemon sends transactions generated by its node to all honor nodes.

### Honor node {#honor-node}

When working on a honor node, the daemon sends blocks generated and transaction hashes to all honor nodes.

Then, the honor node responds to transaction requests unknown to it. The daemon sends the complete transaction data as a response.

### Tables {#tables-3}

The Disseminator daemon uses the following tables:

* transactions

### Request {#request-3}

The Disseminator daemon sends the following requests to other daemons:

* [Type 1](#type-1) Send transactions and block hashes to the honor node.
* [Type 2](#type-2) Receive transaction data from the honor node.

## Confirmations daemon {#confirmations-daemon}

The Confirmations daemon checks whether all the blocks in its node exist on most other nodes.

### Block confirmation {#block-confirmation}

A block confirmed by multiple node in the network is considered as a confirmed block.

The daemon confirms all blocks one by one starting from the first that is currently not confirmed in the database.

Each block is confirmed in the way as follows:

* Sending a request containing the ID of the block being confirmed to all honor nodes.
* All honor nodes respond to the block hash.
* If the hash responded matches the hash of the block on the daemon node, the confirmation counter value is increased. If not, the cancellation counter value is increased.

### Tables {#tables-4}

The Confirmations daemon uses the following tables:

* confirmation
* info_block

### Request {#request-4}

The Confirmations daemon sends the following requests to other daemons:

* [Type 4](#type-4) Request block hashes from the honor node.

## TCP service protocol {#tcp-service-protocol}

The TCP service protocol works on honor nodes and guardian nodes, which uses the binary protocol on TCP to requests from the BlocksCollection, Disseminator, and Confirmation daemons.

## Request type {#request-type}

Each request has a type defined by the first two bytes of the request.

### Type 1 {#type-1}

#### Request sender {#request-sender-1}

This request is sent by the [Disseminator daemon](#disseminator-daemon).

#### Request data {#request-data-1}

Hashes of the transaction and block.

#### Request processing {#request-processing-1}

The block hash is added to the block queue.

Analyzes and verifies the transaction hashes, and select transactions that have not yet appeared on the node.

#### Response {#response-1}

No. After processing the request, a [Type 2](#type-2) request is issued.

### Type 2 {#type-2}

#### Request sender {#request-sender-2}

This request is sent by the [Disseminator daemon](#disseminator-daemon).

#### Request data {#request-data-2}

The transaction data, including the data size:

* data_size (4 bytes)

* Size of the transaction data, in bytes.

* data (data_size bytes)

The transaction data.

#### Request processing {#request-processing-2}

Verifies the transaction and add it to the transaction queue.

#### Response {#response-2}

No.

### Type 4 {#type-4}

#### Request sender {#request-sender-3}

This request is sent by the [Confirmations daemon](#confirmations-daemon).

#### Request data {#request-data-3}

Block ID.

#### Response {#response-3}

Block hash.

Returns `0` if not having a block with this ID.

### Type 7 {#type-7}

#### Request sender {#request-sender-4}

This request is sent by the [BlockCollection daemon](#blockcollection-daemon).

#### Request data {#request-data-4}

Block ID.

* block_id (4 bytes)

#### Response {#response-4}

The block data, including data size.

* data_size (4 bytes)

* Size of the block data, in bytes.

* data (data_size bytes)

The block data.

The connection is closed if not having a block with this ID.

### Type 10 {#type-10}

#### Request sender {#request-sender-5}

This request is sent by the [BlockCollection daemon](#blockcollection-daemon).

#### Request data {#request-data-5}

No.

#### Response {#response-5}

Block ID.

* block_id (4 bytes)

