
# FAQ

  - [1.Please briefly describe IBAX?](#question-1)
  - [2.Is IBax applicable for Bitcoin, Ethereum or other blockchains?](#question-2)
  - [3.What are the main differences between IBax and other public blockchain platforms with built-in mechanisms for executing smart contracts?](#question-3)
  - [4.Do you have your own cryptocurrency?](#question-4)
  - [5.What is a honor node and who can maintain it?](#question-5)
  - [6.What is a platform ecosystem?](#question-6)
  - [7.Who can create an ecosystem?](#question-7)
  - [8.How do users become members of the ecosystem?](#question-8)
  - [9.Can one user create multiple ecosystems?](#question-9)
  - [10.What is a platform application?](#question-10)
  - [11.What programming language is used to create the application?](#question-11)
  - [12.What software is used to create applications and interact with users?](#question-12)
  - [13.Can platform contracts use third-party APIs to access data?](#question-13)
  - [14.Can the contract stored in the blockchain be changed?](#question-14)
  - [15.What is smart law?](#question-15)
  - [16.Can the contract call and execute other contracts?](#question-16)
  - [17.Does the application run with a master contract?](#question-17)
  - [18.Can the application be localized for different languages?](#question-18)
  - [19.Can I create a page without using a template language?](#question-19)
  - [20.Are the pages stored in the blockchain?](#question-20)
  - [21.What types of databases can be used for contract operations?](#question-21)
  - [22.How to manage access to the data in the database table?](#question-22)
  - [23.Can an application in an ecosystem exchange data with other applications from another ecosystem?](#question-23)
  - [24.Should all applications in a new ecosystem be written from scratch?](#question-24)
  - [25.Are there any fees for the operation of applications?](#question-25)
  - [26.Who pays for the operation of applications?](#question-26)
  - [27.How to protect the applications in the ecosystem from attacks due to vulnerabilities?](#question-27)
  - [28.What new features will be implemented in future plans?](#question-28)
  - [29.How to prove its operability?](#question-29)

### <span id = "question-1">1.Please briefly describe IBAX?</span>

  * It is a blockchain platform that aims to build a digital ecosystem based on an integrated application development environment that has a multi-level permission system for managing the access rights to data, interfaces, and smart contracts.

### <span id = "question-2">2.Is IBax applicable for Bitcoin, Ethereum or other blockchains?</span>

  * Not applicable. IBax is built on the basis of its own original blockchain.

### <span id = "question-3">3.What are the main differences between IBax and other public blockchain platforms with built-in mechanisms for executing smart contracts?</span>

  * IBax has unique features that cannot be found in the above-mentioned blockchains:
    *  has an integrated application development environment in a single client software;
      *  the special template language Logicor for page design and the contract language Needle coordinate with each other;
      *  has a multi-level permission system for managing the access rights to data, interfaces and smart contracts, in which permissions can be granted to members, roles and contracts;
      * the ecosystem, used to create blockchain applications and autonomous software environments for users to interact with them;
      * the legal system, a set of rules written in smart laws (dedicated smart contracts), regulates the relationship between platform users and defines the process of changing protocol parameters for problem solving.

### <span id = "question-4">4.Do you have your own cryptocurrency?</span>

  * Yes, IBax uses its own token, IBXC.

### <span id = "question-5">5.What is a honor node and who can maintain it?</span>

  * The honor node is the network node that has the authority to verify transactions and generate new blocks.
  * Any network node with sufficient processing power and fault tolerance can become a honor node. IBax uses a Proof of Authority (PoA) consensus mechanism. Nodes can become verification nodes based on ecosystem voting, but only ecosystems that are proven by the platform's token owner to have normal operational capabilities can participate in such voting. Using this authorization algorithm, the master node is run by major ecosystems because it is in their best interest to maintain the network operation.

### <span id = "question-6">6.What is a platform ecosystem?</span>

  * An ecosystem is actually an autonomous software environment used to create blockchain applications and the operations of users in them.

### <span id = "question-7">7.Who can create an ecosystem?</span>

  * All users of the platform can create new ecosystems.

### <span id = "question-8">8.How do users become members of the ecosystem?</span>

  * Users may be registered as members of any existing ecosystem. The ecosystem strategy defines different member admission procedures, which publishes key public information of the new ecosystem in a dedicated ecosystem catalog.

### <span id = "question-9">9.Can one user create multiple ecosystems?</span>

  * Yes, each user can create any number of ecosystems and can also become a member of multiple ecosystems.

### <span id = "question-10">10.What is a platform application?</span>

  * An application is a complete software product that implements a function or service. The application consists of database tables, contracts and pages.
### <span id = "question-11">11.What programming language is used to create the application?</span>
  * The contract is written in the Needle language, which is developed by the platform team, For more information, see: [Smart Contract](../topics/script.md).

  * The page is written in Logicor language, which is a page template language. For more information, see: [Template Language](../topics/templates2.md).

### <span id = "question-12">12.What software is used to create applications and interact with users?</span>

  * The application program is written and executed in Weaver, no other software is required.

### <span id = "question-13">13.Can platform contracts use third-party APIs to access data?</span>

  * No, the contract can only directly access the data stored in the blockchain. [CLB](about-the-platform.md#virtual-private-ecosystem) is used to process external data sources.

### <span id = "question-14">14.Can the contract stored in the blockchain be changed?</span>

  * Yes, the contract can be changed. The permission to change the contract is specified by its creator, who can grant the permission to refuse to change, or grant permission to make changes with contracts or by members, or configure a complex set of conditions in the smart law.
  * Weaver provides access to all versions of contracts.

### <span id = "question-15">15.What is smart law?</span>

  * Smart law is a contract designed to control and restrict the operation of conventional contracts, thereby controlling and restricting the activities of ecosystem members.
  * A set of smart laws can be regarded as the legal system of an ecosystem.

### <span id = "question-16">16.Can the contract call and execute other contracts?</span>

  * Yes, the contract can call other contracts by direct addressing and provide parameters for it, or call the contract by link name. For more information, see: [Smart Contract](../topics/script.md).

### <span id = "question-17">17.Does the application run with a master contract?</span>

  * No, the contract is an autonomous program module that performs certain functions. Each contract is configured to receive specified data, then check the correctness of these data, and perform some operations that are recorded in the database as transactions.

### <span id = "question-18">18.Can the application be localized for different languages?</span>

  * Yes, Weaver has a built-in localization support mechanism and can create pages in any language.

### <span id = "question-19">19.Can I create a page without using a template language?</span>

  * Yes, it can be done using the platform [RESTful API](../reference/api2.md) v2.

### <span id = "question-20">20.Are the pages stored in the blockchain?</span>

  * Yes, the pages and contracts are stored in the blockchain, which prevents them from being forged.

### <span id = "question-21">21.What types of databases can be used for contract operations?</span>

  * Currently, PostgreSQL is used.

### <span id = "question-22">22.How to manage access to the data in the database table?</span>

  * You can add new fields, new entries, or change the permissions of the data in columns for ecosystem members, roles, or specified contract configurations. Except for contracts created by performing specific operations.

### <span id = "question-23">23.Can an application in an ecosystem exchange data with other applications from another ecosystem?</span>

  * Yes, data exchange can be organized through global data tables that apply to all ecosystems.

### <span id = "question-24">24.Should all applications in a new ecosystem be written from scratch?</span>

  * No, every new ecosystem has some applications out of the box:
      * A mechanism to manage ecosystem members and roles;
      * Issuing and configuring other tokens;
      *  A voting system;
      *  A notification system;
      *  A messenger between ecosystem members.

 These applications can be edited and configured to meet the special needs of any ecosystem.

### <span id = "question-25">25.Are there any fees for the operation of applications?</span>

  * Yes, the use of the resources of the honor node requires payment in the platform.

### <span id = "question-26">26.Who pays for the operation of applications?</span>

 For corresponding account addresses, there are currently 4 ways to pay for the operation of applications:
  * For contract callers, the fee will be paid from the user's account by default when the user calls the contract; 
  * For contract binding parties, the fee will be paid from the binding account specified by the contract creator;
  * For ecosystem creators, the fee of all applications within an ecosystem will be paid by the ecosystem creator respectively;

  * Exclusive ecosystem wallet. Each ecosystem has an exclusive account. If the ecosystem creator activated it, the fee of all applications within the ecosystem will be paid from this account.

 Order of payment precedence: Exclusive ecosystem wallet> Ecosystem creator> Contract binding party> Contract caller.

### <span id = "question-27">27.How to protect the applications in the ecosystem from attacks due to vulnerabilities?</span>

  * The platform team also knows that there is no way to completely avoid errors in the application code, especially considering that the application can be written by any user. This is why we decided to establish a mechanism to eliminate the consequences of exploiting vulnerabilities. The legal system can stop the attack operation of the application and use some transactions to restore it to its original state. The legal system stipulates the permissions to execute such contracts and the voting procedures for granting these permissions.

### <span id = "question-28">28.What new features will be implemented in future plans?</span>

  * Visual smart contract designer;


  * Support for hybrid databases (SQL and NoSQL);

  * Parallel multi-threaded processing of transactions from different ecosystems;

  * Perform resource-intensive calculations on the client;

  * Ecosystem hosting and computing power exchange;

  * Child nodes, only store some blocks on the server;

  * Semantic references (ontology) are used to unify the operation of data in the platform.

### <span id = "question-29">29.How to prove its operability?</span>

  * A number of proof of concept projects and cases have been implemented on the IBax Network: a socialized tax collection and electronic invoice generation and circulation system, a medical apparatus and instruments supervision, forgery prevention and tracing system, a financing and supervision system, a voting/poll system, business registration, trade finance tools, assets registration contract management system, etc.