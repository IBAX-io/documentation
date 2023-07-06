# Aperçu d'IBAX {#ibax-overview}

- [Aperçu d'IBAX](#ibax-overview)
  - [Fonctionnalités](#features)
  - [Architecture](#architecture)
    - [Réseau](#network)
    - [Nœud Honor](#honor-node)
    - [Transactions](#transactions)
    - [Protocole réseau](#network-protocol)
    - [Vérification des blocs et des transactions](#block-and-transaction-verification)
    - [Base de données](#database)
  - [ECOLIB](#ecolib)
    - [IDE](#ide)
    - [Applications](#applications)
    - [Tables](#tables)
    - [Paramètres de l'écosystème](#ecosystem-parameters)
  - [Mécanisme de contrôle des droits d'accès](#access-rights-control-mechanism)
    - [Actions de contrôle d'accès](#access-control-actions)
    - [Gestion des droits d'accès](#access-rights-management)
    - [Droits exclusifs](#exclusive-rights)
  - [Écosystème virtuel privé](#virtual-private-ecosystem)
    - [Demandes vers des ressources web](#requests-to-web-resources)
    - [Droits de lecture des données](#rights-to-read-data)
    - [Création de CLB](#clb-creation)
    - [Utilisation de CLB](#clb-usage)

## Fonctionnalités {#features}

Le réseau IBAX (IBAX) dispose d'un environnement de développement d'applications intégré (IDE). Il s'agit d'un système de contrôle d'accès multi-niveaux pour les données, les pages utilisateur et les contrats intelligents.

En termes de structure et de fonctions, IBAX est assez différent des plateformes blockchain existantes :

* Le développement et l'utilisation des applications IBAX se font dans un environnement logiciel autonome appelé **écosystème**. Chaque écosystème a ses propres règles d'adhésion établies initialement par le créateur ;

* Les activités de l'écosystème, telles que les données impliquées dans les enregistrements ou les mises à jour de **tables de base de données**, sont basées sur des **registres** créés avec des **contrats intelligents**. Dans la plupart des autres plateformes blockchain, les activités sont basées sur l'échange de transactions entre les comptes ;

* L'accès aux **registres** et le contrôle des relations entre les membres de l'écosystème sont gérés par un ensemble de règles appelées **lois intelligentes**.

## Architecture {#architecture}

### Réseau {#network}

IBAX est construit sur un réseau pair à pair (P2P).

Les nœuds gardiens du réseau stockent la dernière version de la base de données blockchain, qui enregistre le dernier état de la blockchain d'IBAX.

Network users can receive data by sending requests from the guardian node database via **Weaver** or REST API commands. After signing by users, new requests are sent to the network as transactions in binary format. 
Essentially, these transactions are commands to modify relevant database records. 
Transactions are aggregated in blocks, and such blocks are sent to the blockchains of all network nodes. 
Each guardian node will process the transactions in the block, thereby updating the corresponding data in the database.

### Nœud d'honneur {#honor-node}

Un nœud gardien qui est privilégié pour générer de nouveaux blocs dans le réseau est appelé un nœud d'honneur. 
Le nombre maximum de nœuds d'honneur est défini par [number_of_nodes](../reference/platform-parameters.md#number-of-nodes) dans le tableau des paramètres de la plateforme, montrant que le nombre de nœuds d'honneur est limité.

Un nœud d'honneur est l'un des composants clés du réseau public IBAX. 
Il exécute et valide les transactions, collecte les informations de transaction des autres nœuds, ajoute les transactions à la file d'attente et vérifie la justesse et la validité des nouveaux blocs en utilisant le mécanisme de confirmation. En général, il a deux états : l'emballage et le non-emballage.

Un nœud d'honneur dans l'état d'emballage offre les meilleures performances. Il obtient les demandes de transaction à exécuter à partir de la file d'attente des transactions et vérifie la validité de la signature et la justesse des transactions, par exemple le montant du transfert, l'autorisation des opérations de transaction et l'exécution précise des transactions. 

Toutes les opérations transactionnelles, correctes ou incorrectes (les transactions incorrectes seront annulées), seront écrites dans le bloc. 

Les transactions incorrectes entraîneront des frais de gaz punitifs. Les transactions exécutées sont notifiées aux autres nœuds d'honneur avec le bloc via une diffusion.

Un nœud d'honneur dans l'état de non-emballage est principalement responsable de la vérification des blocs pour s'assurer que les transactions dans le bloc générées par un nœud d'emballage sont exécutées correctement. En cas d'anomalie, il déclenchera le mécanisme de gestion des exceptions et le réseau IBAX effectuera un retour en arrière et une nouvelle vérification du bloc.

Afin de garantir l'efficacité de l'exécution des transactions, les nœuds d'honneur collectent en permanence des informations sur les transactions.

### Transactions (fr: Transactions) {#transactions}
Les transactions, y compris les données utilisées pour mettre en œuvre les **contrats intelligents**, sont générées par Weaver.

Les transactions sont signées par les utilisateurs avec une clé privée. La clé privée et la fonction de signature de Weaver peuvent être stockées dans les navigateurs, les clients logiciels, les cartes SIM ou des dispositifs physiques dédiés. Dans l'implémentation actuelle, la clé privée est chiffrée avec l'algorithme ECDSA et stockée du côté de Weaver. Toutes les transactions sont signées avec l'algorithme ECDSA.

La structure d'une transaction est conforme au format suivant :

> -   ID - ID du contrat intelligent mis en œuvre ;
> -   Params - paramètres envoyés au contrat intelligent ;
> -   KeyID - ID de l'utilisateur envoyant la transaction ;
> -   PublicKey - clé publique du nœud honoraire ;
> -   Time - horodatage généré par la transaction ;
> -   EcosystemID - ID de l'écosystème où la transaction est effectuée ;
> -   ТokenEcosystem - ID de l'écosystème, 1 par défaut, et les jetons à l'intérieur sont utilisés pour couvrir les frais de transaction.

### Protocole réseau {#network-protocol}

Les transactions seront envoyées aux nœuds honorés par les utilisateurs, où elles seront soumises à une vérification de base pour s'assurer que les formats sont corrects, puis elles seront ajoutées à la file d'attente.
Les transactions sont également envoyées à d'autres nœuds honorés du réseau et ajoutées à leur file d'attente respective.

Un nœud honoré a le privilège de générer de nouveaux blocs pendant une période de temps spécifique, déterminée par le paramètre de la plateforme **full_nodes** et un algorithme spécial.
Les nœuds honorés récupèrent les transactions des files d'attente et les envoient au générateur de blocs.

Lors de la génération d'un nouveau bloc, les transactions de ce bloc sont également traitées : chaque transaction est envoyée à une machine virtuelle, où le contrat intelligent correspondant aux paramètres de la transaction est implémenté, mettant ainsi à jour les enregistrements dans la base de données.

Les nouveaux blocs doivent être vérifiés pour s'assurer qu'il n'y a pas d'erreurs avant d'être envoyés à d'autres nœuds honorés sur d'autres réseaux.

Un nouveau bloc sera ajouté à la file d'attente des blocs lorsqu'il est reçu par un autre nœud honoré, puis, après vérification, il sera ajouté à la blockchain du nœud honoré où il se trouve pour traiter les transactions du bloc et mettre à jour les enregistrements dans la base de données.

### Vérification des blocs et des transactions {#block-and-transaction-verification}

Après avoir généré ou reçu un nouveau bloc, il sera vérifié sur tous les autres nœuds honorables, qui couvrent ce qui suit:

> - Le premier octet des données reçues doit être 0. Sinon, les données reçues ne seront pas considérées comme un bloc;
>
> - Le timestamp de génération du bloc reçu doit être antérieur au timestamp actuel;
>
> - Le timestamp de génération du bloc doit correspondre à l'intervalle de temps pendant lequel le nœud honoré a le privilège de générer de nouveaux blocs;
>
> - La hauteur d'un nouveau bloc doit être supérieure à la hauteur du plus grand bloc de la blockchain existante;
>
> - Il ne peut pas dépasser les dépenses maximales autorisées pour toutes les transactions dans le bloc;
>
> - Le bloc doit être correctement signé avec la clé secrète du nœud dans lequel il se trouve. Les données de signature doivent contenir:
>
>     > - La hauteur du bloc, le hash du bloc précédent, le timestamp du bloc, l'ID de l'écosystème où se trouve le bloc et l'adresse du nœud honoré du bloc;
>     > - La position du nœud honoré dans le tableau full_nodes des paramètres de la plateforme, la racine de Merkel (MrklRoot) de toutes les transactions dans le bloc et le hash de retour du bloc précédent.

Pour vérifier la validité de chaque transaction dans le bloc, utilisez les méthodes suivantes:

> - Le hachage de chaque transaction doit être unique ;
> - Une transaction signée par clé ne peut pas dépasser la limite ([max_tx_block_per_user](../reference/platform-parameters.md#max-tx-block-per-user)) ;
> - Elle ne peut pas dépasser la limite de la taille maximale de transaction ([max_tx_size](../reference/platform-parameters.md#max-tx-size)) ;
> - Le temps de transaction ne peut être supérieur au temps de génération de bloc ni supérieur au temps de génération de bloc plus 600 secondes, et il ne peut être inférieur au temps de génération de bloc moins 86400 secondes ;
> - La transaction doit être correctement signée ;
> - L'utilisateur qui implémente le contrat intelligent doit avoir suffisamment de jetons sur son compte pour payer les frais de transaction.

### Base de données {#database}
La couche de stockage de données sous-jacente du réseau IBAX est une base de données `PGSQL` entièrement ouverte au public. 
Basé sur la conception de permission de la plateforme du système d'exploitation IBAX, les utilisateurs n'ont pas besoin de se soucier de la sécurité des données. 
Avec une philosophie de conception orientée objet, le réseau IBAX précompile les données via une base de données relationnelle PGSQL et améliore l'efficacité du traitement des données. 

Vous pourriez être intéressé par ce qui suit si vous êtes un spécialiste technique, ou vous pouvez simplement le sauter si vous ne l'êtes pas.
① Toutes les tables sans préfixe numérique dans leur nom appartiennent aux tables de permission de base du réseau IBAX ;
② Toutes les tables avec un préfixe numérique dans leur nom appartiennent aux tables de permission d'ecoLibs.

## ECOLIB {#ecolib}

Il est assez facile pour les utilisateurs, même les utilisateurs ordinaires, de créer leur propre écoLib sur la plateforme du système réseau IBAX. 
Nous avons intégré et développé une application où la création d'écoLib ne nécessite qu'un seul clic. 

Lors de la création d'un écoLib, vous pouvez configurer les paramètres et règles de l'écosystème, et définir le compte administrateur et le modèle de tarification. 
Plus important encore, pour appliquer le consensus DPoA au sein des écoLibs, les créateurs peuvent le configurer en écrivant ou en important leurs propres contrats intelligents. 

Nous soutenons l'émission rapide de jetons écoLib en important des modèles de contrats intelligents.

En raison des différences de consensus et de permissions de gestion, les écoLibs se divisent en décentralisés et centralisés. 
Ils n'ont aucun avantage ou inconvénient spécifique par type. Vous devriez choisir celui qui convient le mieux à vos besoins de service. 
Que faire si cela convient pour le moment mais pas pour l'avenir ? 
Vous pouvez modifier les paramètres de l'écoLib, même le mécanisme de consensus, le jeton et la méthode de gouvernance, sur la plateforme du système réseau IBAX. 
Vous pouvez tout laisser au mécanisme d'autogouvernance maintenu par l'administrateur ou les membres de l'écoLib (selon le type d'écoLib). 

Sur la plateforme du système réseau IBAX, un écoLib dispose de permissions de contrôle complet des données et de permissions pour concevoir et accéder à des tables et champs de base de données indépendants. 
Dans la conception des permissions de contrôle des données, nous prenons en charge le déclenchement lorsque un champ satisfait une expression logique. 
Cette fonctionnalité permet d'imaginer des services spéciaux tels que la surveillance, la satisfaction logique et le déclenchement en fonction du temps et de conditions spécifiques. 

Il peut y avoir plusieurs DApps dans un écoLib, et chacun d'entre eux peut avoir des paramètres indépendants. 
Un écoLib est comme une plateforme où vous pouvez implémenter tout ce que vous voulez. 

Afin de mieux soutenir les développeurs d'écosystèmes, nous fournissons l'outil d'édition, de gestion et de développement Weaver. 
Il réduira considérablement les coûts de développement, de maintenance et de gestion de l'écosystème.

### IDE {#ide}

Weaver dispose d'un environnement de développement intégré (IDE) complet pour créer des applications blockchain, qui ne nécessite pas aux développeurs de logiciels d'avoir une compréhension approfondie de la technologie blockchain.

Weaver fournit un outil de gestion de table, un éditeur de smart contract, un éditeur de page et d'autres fonctions nécessaires pour créer des applications dans l'écosystème, sans le support d'un module logiciel quelconque.

L'IDE comprend principalement les parties suivantes :

> - liste des paramètres de l'écosystème ;
> - éditeur de smart contract ;
> - outil de gestion de table ;
> - éditeur de page et concepteur de page visuel ;
> - éditeur de ressources multilingues ;
> - fonctions d'import/export d'applications.

### Applications {#applications}

Une application est une collection d'éléments tels que des tables de base de données, des smart contracts et des pages utilisateur avec des droits d'accès pour la configuration.
L'écosystème auquel l'élément de l'application appartient est indiqué par le préfixe dans le nom de l'élément, tel que <font color=Red>@1NomElement</font>, où l'ID de l'écosystème est indiqué par le nombre <font color=Red>1</font> après le symbole <font color=Red>@</font>.
Lors de l'utilisation des éléments de l'application dans l'écosystème actuel, le préfixe <font color=Red>@1</font> peut être omis.
Ces applications peuvent effectuer des fonctions utiles ou mettre en œuvre divers services.

### Tables {#tables}

Dans la base de données d'IBAX, chaque écosystème peut créer un nombre illimité de tables.
Les tables d'un écosystème spécifique peuvent être identifiées par un préfixe contenant l'ID de l'écosystème, qui ne sera pas affiché dans Weaver.

Une table n'est liée d'aucune manière et appartient à un certain contrat intelligent. Elle peut être utilisée par toutes les applications dans le cadre des droits d'accès de la table.

Chaque écosystème peut créer un ensemble de tables de données pour développer ses applications ou éventuellement accéder aux tables de données d'autres écosystèmes en spécifiant le préfixe du nom de la table.

En configurant les droits d'accès via des lois intelligentes, les données sont enregistrées dans les tables. Les lois intelligentes sont utilisées pour la gestion des droits.

> Outil de gestion des tables

Vous pouvez trouver l'outil de gestion des tables dans le menu Table de Weaver, qui comprend les fonctions suivantes :

- Afficher la liste des tables et de leurs entrées ;
- Créer de nouvelles tables ;
-   Ajoutez un champ de tableau et spécifiez son type de données, tel que`Text` ， `Date/Time` ， `Varchar` , `Character` ， `JSON` ， `Number` ， `Money` ， `Double` ，`Binary`；
  - `Text` correspond à `texte` `postgresql`
  - `Date/Time` correspond à `timestamp` dans `postgresql`.
  - `Varchar` correspond à `postgresql` `varchar(102400)`
  - `Character` correspond à `postgresql` `character(1) NOT NULL DEFAULT '0'`
  - `JSON` correspond à `postgresql` `jsonb`
  - `Number` correspond à `postgresql` `bigint NOT NULL DEFAULT '0'`
  - `Money` correspond à `postgresql` `decimal (30, 0) NOT NULL DEFAULT '0'`
  - `Double` correspond à `double precision` dans `postgresql`
  - `Binary` correspond à `bytea NOT NULL DEFAULT '\x'` dans `postgresql`

- Gérer les privilèges pour insérer, mettre à jour les données et modifier la structure de la table.

> Manipulation des données de la table

Pour une meilleure manipulation de la base de données, Needle et Logicor disposent tous deux de la fonction **DBFind**, qui est utilisée pour récupérer des valeurs et des tableaux de données à partir des tables.

La fonction [DBInsert](../topics/script.md#dbinsert) du langage de contrat intelligent est utilisée pour ajouter des entrées aux tables. Les fonctions [DBUpdate](../topics/script.md#dbupdate) et [DBUpdateExt](../topics/script.md#dbupdateext) sont utilisées pour mettre à jour la valeur d'une entrée existante. 
Lors de la mise à jour, les données correspondantes dans les tables seront mises à jour et la blockchain ajoutera de nouvelles transactions tout en conservant toutes les transactions historiques. 
Les données dans les tables ne peuvent être modifiées que et ne peuvent pas être supprimées.

Afin de minimiser le temps de mise en œuvre du contrat, la fonction [DBFind](../topics/script.md#dbfind) ne peut pas interroger plusieurs tables simultanément et la jointure n'est pas prise en charge. 
Par conséquent, nous vous recommandons de ne pas normaliser les tables d'application, mais de stocker toutes les informations disponibles dans les entrées ou de répéter les informations disponibles dans d'autres tables. 
Ceci n'est pas obligatoire mais nécessaire pour une application blockchain. 
Dans ce cas, les données doivent être stockées intégralement, ce qui ne peut pas être mis à jour même si les mêmes données dans d'autres tables sont mises à jour, bien qu'elles soient mises à jour de manière synchrone dans une base de données relationnelle.

### Paramètres de l'écosystème {#ecosystem-parameters}

Vous pouvez consulter et modifier la liste des paramètres de l'écosystème (**1_parameters**) dans le menu de Weaver. Les paramètres de l'écosystème peuvent être divisés en groupes suivants :

> - Paramètres généraux : le compte du créateur de l'écosystème (founder_account) et d'autres informations ;
>
> - Paramètres de droits d'accès : utilisés pour définir les permissions d'accès pour les éléments de l'application

>     > - modifier la structure de la table (changing_tables) ;
>     > - modifier le contrat intelligent (changing_contracts) ;
>     > - modifier la page utilisateur (changing_page) ;
>     > - modifier le menu (changing_menu) ;
>     > - modifier les ressources multilingues (changing_language).


> - Paramètres techniques : utilisés pour définir les styles utilisateur (feuille de style) ;

> - Paramètres utilisateur : utilisés pour définir des constantes ou des listes (séparées par des virgules) nécessaires au fonctionnement de l'application.

Vous pouvez spécifier les autorisations de modification pour les paramètres de chaque écosystème.

Vous pouvez utiliser la fonction [EcosysParam](../topics/script.md#ecosysparam) pour récupérer la valeur d'un paramètre d'écosystème en passant le titre du paramètre d'écosystème en tant que paramètre.

## Mécanisme de contrôle des droits d'accès {#access-rights-control-mechanism}

IBAX dispose d'un système de gestion des autorisations d'accès à plusieurs niveaux.
En configurant les droits d'accès, vous pouvez créer et modifier n'importe quel élément d'application, tel que les contrats intelligents, les tables, les pages utilisateur, les paramètres d'écosystème. Vous pouvez également modifier les droits d'accès via la configuration.

Par défaut, tous les droits dans l'écosystème IBAX sont gérés par son créateur, qui est défini dans le contrat intelligent MainCondition de chaque écosystème.
Mais après la création de lois intelligentes, le contrôle d'accès peut être transféré à tous ou à un groupe de membres de l'écosystème.
Contrôle des droits d'accès

### Actions de contrôle d'accès {#access-control-actions}

Les droits d'accès sont définis dans les tables des contrats intelligents (**1_contracts**), les tables de données (**1_tables**), les tables de pages utilisateur (**1_pages**), les tables de menus (**1_menu**) et les tables de blocs de code (**1_blocks**). 
Vous pouvez trouver les menus correspondants dans Weaver.

### Gestion des droits d'accès {#access-rights-management}

Les règles des droits d'accès sont configurées en remplissant les expressions correspondantes des contrats intelligents **ContractConditions("@1MainCondition")**, **ContractAccess("@1MainCondition")** ou des expressions logiques dans le champ des permissions. 
Si le résultat de l'expression de demande est vrai (true), alors l'accès est accordé. 
Sinon, l'accès est refusé et les opérations associées sont interrompues.

La manière la plus simple de définir des droits est d'entrer une expression logique dans le champ des droits. Par exemple, `$key_id == 8919730491904441614`, où **$key_id** représente l'ID d'un membre de l'écosystème.

La façon la plus courante et recommandée de définir des droits est d'utiliser la fonction `ContractConditions("@1ContractsName1","@1ContractsName2")`. 
Le nom du contrat intelligent **ContractsName** est passé à la fonction en tant que paramètre, et le résultat du contrat doit être le résultat d'une expression logique (vrai ou faux).

Une autre façon de définir des droits est d'utiliser la fonction `ContractAccess("@1ContractsName3","@1ContractsName4")`. 
Le contrat intelligent **ContractsName** qualifié pour implémenter l'opération correspondante peut être passé à la fonction en tant que paramètre. 
Par exemple, si le champ de droit de la colonne montant est configuré comme `ContractAccess("@1TokenTransfer")`, alors vous ne pouvez implémenter que le contrat intelligent **@1TokenTransfer** si vous souhaitez modifier la valeur dans la colonne montant. 
Le droit d'accès au contrat intelligent lui-même peut être géré dans la section des conditions, 
qui sont assez complexes et peuvent contenir de nombreux autres contrats intelligents.

### Droits exclusifs {#exclusive-rights}

En cas d'urgence ou de situations critiques pour le fonctionnement d'un écosystème, il existe de nombreux paramètres spéciaux dans la liste des paramètres de l'écosystème (**1_parameters**) (tels que **changing_contracts**, **changing_pages**, etc.), 
qui définissent les droits d'accès à tous les contrats intelligents, tables de données et pages de l'écosystème actuel. Ces droits sont configurés par des contrats clés.

## Écosystème virtuel privé {#virtual-private-ecosystem}

Dans IBAX, vous pouvez créer un écosystème virtuel privé - **Cross Ledgers Base (CLB)**.
Un CLB possède toutes les fonctionnalités de l'écosystème standard, mais fonctionne en dehors de la blockchain. Dans CLB, vous pouvez utiliser et créer des contrats intelligents et des langages de modèle, des tables, et utiliser Weaver pour créer des applications.
Vous pouvez appeler des contrats intelligents sur l'écosystème de la blockchain via une API.

### Requêtes vers des ressources web {#requests-to-web-resources}

CLB
> La principale différence entre un CLB et un écosystème standard est que vous pouvez utiliser les fonctions de contrat intelligent [HTTPRequest](../topics/script.md#httprequest) et [HTTPPostJSON](../topics/script.md#httppostjson) pour demander n'importe quelle ressource web à l'intérieur du contrat intelligent via des requêtes **HTTP / HTTPS**.
> Les paramètres transmis à cette fonction comprennent: les URL, les méthodes de requête (GET ou POST),
> les en-têtes de requête et les paramètres de requête.

### Droits de lecture des données {#rights-to-read-data}

Bien qu'il soit lisible, les données dans CLB ne sont pas enregistrées dans la blockchain. Vous pouvez choisir d'accorder la permission de lecture aux tables de la base de données.
Vous pouvez définir des droits de lecture pour des colonnes individuelles, ou pour n'importe quelle ligne en utilisant un contrat intelligent spécial.

### Création de CLB {#clb-creation}

Vous pouvez créer un nœud CLB sur le réseau. Par défaut, l'administrateur du nœud CLB est autorisé à utiliser la liste des écosystèmes avec la fonctionnalité CLB,
et désigner un utilisateur avec les privilèges de créateur d'écosystème pour installer des applications, recevoir de nouveaux membres et configurer les permissions d'accès aux ressources.

### Utilisation de CLB {#clb-usage}

Vous pouvez utiliser un CLB pour créer des formulaires d'inscription, envoyer des informations de vérification aux utilisateurs par e-mail ou téléphone, et stocker des données accessibles au public. 
Vous pouvez écrire et tester des applications, puis les importer dans l'écosystème de la blockchain. Dans un CLB, vous pouvez utiliser des tâches de contrat de planification, créer des machines oracle pour recevoir des données à partir de ressources web et envoyer ces données à l'écosystème de la blockchain.
