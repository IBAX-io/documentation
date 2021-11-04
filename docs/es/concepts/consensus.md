
# Decentralized Proof-of-Authority Consensus

* What is Decentralized Proof-of-Authority consensus

* Advantages of DPoA consensus

* DPoA consensus and common means of attack

* Implementation of DPoA consensus in IBAX

In this section, we will describe the Decentralized Proof-of-Authority consensus and its implementation in IBAX. 


 - [What is Decentralized Proof-of-Authority consensus](#what-is-decentralized-proof-of-authority-consensus)
  - [Advantages of DPoA consensus](#advantages-of-dpoa-consensus)
  - [DPoA consensus and common means of attack](#dpoa-consensus-and-common-means-of-attack)
    - [DoS](#dos)
    - [51 percent attack](#percent-attack-51)
  - [Implementation of DPoA consensus in IBAX](#implementation-of-dpoa-consensus-in-ibax)
    - [Honor node](#honor-node)
    - [Leader node](#leader-node)
    - [Generation of new blocks](#generation-of-new-blocks)
    - [Forks](#forks)

## What is Decentralized Proof-of-Authority consensus

Considering commercial application scenarios and real-world environments, IBAX Network has built a new consensus mechanism, DPoA (Decentralized Proof of Authority). 

Decentralization has always been our firm belief. It refers not only to IBAX’s infrastructure network environment. Instead, we will let decentralization take root in each ecoLib created in IBAX Network and use technical solutions to achieve a high degree of self-governance in each of them. For the purpose of highly distributed self-governance, we have made many changes in the overall architecture and technical implementation. However, in practice, we cannot avoid the centralized management concept. In order to find a balance between centralization and decentralization, in addition to the DPoA consensus mechanism, we have also formulated certain reward and incentive programs.

IBAX Network has created a new consensus mechanism that combines distribution, weak centralization, and a certification authority. We call it DPoA (Decentralized Proof of Authority). To ensure continuity for the entire IBAX Network, the consensus covers not only IBAX Public Network, but also ecoLibs created by each user and user group. This creates a truly self-governed, decentralized, fair, transparent, and fraud-proof Decentralized Autonomous Organization (DAO). 

DPoA has a prevention mechanism against network attacks and allows creation of Mint Nodes that guard the network and mint new IBXC coins. IBAXCoin holders can stake a part of their IBXC liquidity balance in Mint Nodes for Mint & Stake Emission Rewards. Minting and staking serve to increase the cost and difficulty of attacks and increase the total value of IBXC coins proportionally. With this mechanism, the probability and harm of any attack are infinitely close to zero. 


## Advantages of DPoA consensus

Compared to Proof-of-Work (PoW) or Proof-of-Stake (PoS) consensus, DPoA consensus has the following advantages:

* No need of high-performance hardware. Compared to PoW consensus, nodes implementing the DPoA consensus does not spend computational resources for solving complex mathematical logic tasks;

* The interval of time to generate new blocks is predictable, but that for  PoW and PoS consensuses are different;

* High transaction rate. Blocks are generated in a sequence at specified time interval by authorized network nodes, which increases the speed of transaction verification.

* Tolerance to compromised and malicious nodes, as long as 51% of nodes are not compromised. IBAX implements a mechanism of banning nodes and revoking block generation rights.

## DPoA consensus and common means of attack

### DoS

An attacker may send large amount of transactions and blocks to a targeted node in the network, making an attempt to disrupt its operation and make its services unavailable.

The DPoA mechanism is possible to defend against DoS attacks:

* Because network nodes are pre-authenticated, block generation rights can be granted only to nodes that can withstand DoS attacks.

* If a honor node is unavailable for a certain period, it can be excluded from the list of honor nodes.

### <spn id = "percent-attack-51">51 percent attack</span>

As to the scenario with the DPoA consensus, the 51% attack requires an attacker to obtain control over 51% of network nodes. But the scenario for the PoW consensus is different, which an attacker needs to obtain 51% of network computational power. Obtaining the control over nodes in a permissioned blockchain network is much harder than obtaining the computational power.

For example, in a network implementing the PoW consensus, an attacker can increase computation power (performance) of the controlled network segment thus increasing the percentage of controlled nodes. This makes no sense for DPoA consensus, because the computational power of the node has no impact on the blockchain network decisions.

## Implementation of DPoA consensus in IBAX

### Honor node

In IBAX, only honor nodes can generate new blocks, which maintain the blockchain network and the distributed ledger.

The list of honor nodes is kept in the blockchain registry. The order of nodes determines the sequence in which nodes generate new blocks.

### Leader node

The following formula determines the current **leader node**, i.e. a node that must generate a new block at the current time.

```
leader = ((time - first) / step) % nodes
```

> leader

Current leader node.

> time

Current time (UNIX).

> first

First block generation time (UNIX).

> step

Number of seconds in the block generation interval.

> nodes

Total number of honor nodes.

### Generation of new blocks

New blocks are generated by a [leader node](#leader-node) of the current time interval. At each time interval, the leader role is passed to the next honor node from the list of honor nodes.

![avatar](/block-generation.png)

a) Steps for Generation of new blocks

Main steps for generating a new block are as follows:

1. Collects all new transactions from the transaction queue of the node;

2. Executes transactions one by one. Invalid or inexecutable transactions are rejected;

3. Checks if the [block generation limits](../reference/platform-parameters.md#configure-the-generation-of-blocks) is in compliance; 

4. Generates a block with valid transactions and signs it with the private key of the honor node through the ECDSA algorithm;

5. Sends this block to other honor nodes.

b) Verification of new blocks

Steps for verifying new blocks on other honor nodes:

1.Receive a new block and verify:

    – whether the new block was generated by the leader node of a current interval;

    – whether there are no other blocks generated by the leader node of a current interval;

    – whether the new block is properly signed. 

2. Execute transactions from the block one by one. Check whether the transactions are executed successfully and within the [block generation limits](../reference/platform-parameters.md#configure-the-generation-of-blocks) .

3. Add or reject the block, depending on the previous step:

    – If block validation is successful, add the new block to the blockchain of the current node;

    – If block validation failed, reject the block and send a **bad block** transaction;

    – If the honor node that created this invalid block continues to generate bad blocks, it can be banned or excluded from the list of honor nodes.

### Forks

A **fork** is an alternative version of the blockchain, which contains one or more blocks that were generated independently from the rest of the blockchain.

Forks usually occur when a part of the network becomes desynchronized. Factors that are probably result in forks are high network latency, intentional or unintentional time limits violation, time desynchronization at nodes. If network nodes have a significant geographic distribution, block generation interval must be increased.

Forks are resolved by following the longest blockchain rule. When two blockchain versions are detected, honor nodes rollback the shorter one and accept the longer one. 

![avatar](/block-fork-resolution.png)