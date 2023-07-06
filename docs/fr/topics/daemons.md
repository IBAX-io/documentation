# Démon {#daemon}

Dans cette section, nous décrirons comment les nœuds IBax interagissent les uns avec les autres d'un point de vue technique.

## À propos du démon du serveur {#about-the-server-daemon}
Le démon du serveur doit s'exécuter sur chaque nœud du réseau, ce qui exécute diverses fonctions de serveur et prend en charge le protocole de blockchain d'IBax. Dans le réseau de blockchain, le démon distribue les blocs et les transactions, génère de nouveaux blocs, vérifie les blocs et les transactions reçus, et il peut éviter le problème de fork.

### Démon du nœud d'honneur {#honor-node-daemon}
Un nœud d'honneur exécute les démons de serveur suivants :
* [démon BlockGenerator](#blockgenerator-daemon)

    Génération de nouveaux blocs.

* [démon BlockCollection](#blockcollection-daemon)

    Téléchargement de nouveaux blocs à partir d'autres nœuds.

* [démon Confirmations](#confirmations-daemon)

    Confirmer que les blocs sur le nœud existent également sur la plupart des autres nœuds.

* [démon Disseminator](#disseminator-daemon)

    Distribution des transactions et des blocs vers d'autres nœuds honneurs.

* QueueParserBlocks démon

    Blocs dans la file d'attente, qui contient des blocs provenant d'autres nœuds.

    La logique de traitement des blocs est la même que celle du démon [démon BlockCollection](#blockcollection-daemon).

* QueueParserTx démon

    Vérification des transactions en attente.

* Scheduler démon

    Exécution des contrats selon le planning prévu.

### Démon du nœud gardien {#guardian-node-daemon}

Un nœud gardien exécute les démons de serveur suivants :

* [démon BlockCollection](#blockcollection-daemon)
* [démon Confirmations](#confirmations-daemon)
* [démon Disseminator](#disseminator-daemon)
* QueueParserTx
* Scheduler

## Démon BlockCollection {#blockcollection-daemon}

Ce démon télécharge des blocs et synchronise la blockchain avec d'autres nœuds du réseau.

### Synchronisation de la blockchain {#blockchain-synchronization}

Ce démon synchronise la blockchain en déterminant la hauteur maximale du bloc dans le réseau de la blockchain, en demandant de nouveaux blocs et en résolvant le problème de la fourche dans la blockchain.

#### Vérifiez les mises à jour de la blockchain {#check-for-blockchain-updates}

Ce démon envoie des requêtes de l'ID de bloc actuel à tous les nœuds honorés.

Si l'ID de bloc actuel du nœud exécutant le démon est inférieur à l'ID de bloc actuel de n'importe quel nœud honoré, le nœud du réseau blockchain est considéré comme obsolète.

#### Télécharger les nouveaux blocs {#download-new-blocks}

Le nœud qui renvoie la hauteur de bloc la plus élevée actuelle est considéré comme le dernier nœud.
Le démon télécharge tous les blocs inconnus.

#### Résoudre le problème de la fourche {#solving-the-fork-issue}

Si une fourchette est détectée dans la blockchain, le démon déplace la fourchette en arrière en téléchargeant tous les blocs jusqu'à un bloc parent commun.
Lorsque le bloc parent commun est trouvé, un retour en arrière de la blockchain est effectué sur le nœud exécutant le démon, et le bloc correct est ajouté à la blockchain jusqu'à ce que le dernier soit inclus.

### Table de données {#tables-1}

Le démon BlocksCollection utilise les tables suivantes :

* block_chain
* transactions
* transactions_status
* info_block

### Demande {#request-1}

Le démon BlockCollection envoie les requêtes suivantes aux autres démons :

* [Type 10](#type-10) pointe vers l'identifiant de bloc le plus grand parmi tous les nœuds honorés.
* [Type 7](#type-7) pointe vers les données avec l'identifiant de bloc le plus grand.

## Le démon BlockGenerator{#blockgenerator-daemon}

Le démon BlockGenerator génère de nouveaux blocs.

### Pré-vérification {#pre-verification}

Le démon BlockGenerator analyse les derniers blocs de la blockchain pour créer de nouveaux plans de génération de blocs.

Si les conditions suivantes sont remplies, un nouveau bloc peut être généré :

* Le nœud qui a généré le dernier bloc se trouve dans un nœud de la liste d'honneur et exécute le démon.
* Le laps de temps le plus court depuis la génération du dernier bloc non vérifié.

### Génération de blocs {#block-generation}

Un nouveau bloc généré par le démon contient toutes les nouvelles transactions, qui peuvent être reçues du [démon Disseminator](#disseminator-daemon) d'autres nœuds ou générées par le nœud exécutant le démon. Le bloc généré est stocké dans la base de données du nœud.

### Table de données {#tables-2}

Le démon BlockGenerator utilise les tables suivantes :

* block_chain (saves new blocks)
* transactions
* transactions_status
* info_block

### Demande {#request-2}

Le démon BlockGenerator ne fait aucune demande aux autres démons.

## Démon Disseminator {#disseminator-daemon}

Le démon Disseminator envoie des transactions et des blocs à tous les nœuds honorés.

### Nœud gardien {#guardian-node}

Lorsque vous travaillez sur un nœud gardien, le démon envoie les transactions générées par son nœud à tous les nœuds honorables.

### Nœud d'honneur{#honor-node}

Lorsqu'il travaille sur un nœud d'honneur, le démon envoie les blocs générés et les hachages de transaction à tous les nœuds d'honneur.

Ensuite, le nœud d'honneur répond aux demandes de transaction qui lui sont inconnues. Le démon envoie les données de transaction complètes en réponse.

### Table de données {#tables-3}

Le démon Disseminator utilise les tables suivantes :

* transactions

### Demande {#request-3}

Le démon Disseminator envoie les demandes suivantes à d'autres démons :

* [Type 1](#type-1) Envoyer des transactions et des hachages de bloc à l'hôte honor.
* [Type 2](#type-2) Recevoir des données de transaction de l'hôte honor.

## Démon de confirmations {#confirmations-daemon}

Le démon de confirmation vérifie si tous les blocs de son nœud existent sur la plupart des autres nœuds.

### Confirmation de bloc {#block-confirmation}

Un bloc confirmé par plusieurs nœuds dans le réseau est considéré comme un bloc confirmé.

Le démon confirme tous les blocs un par un, en commençant par le premier qui n'est pas encore confirmé dans la base de données.

Chaque bloc est confirmé de la manière suivante :

* En envoyant une demande contenant l'ID du bloc en cours de confirmation à tous les nœuds honorés.
* Tous les nœuds honorés répondent avec le hachage du bloc.
* Si le hachage renvoyé correspond au hachage du bloc sur le nœud du démon, la valeur du compteur de confirmation est augmentée. Sinon, la valeur du compteur d'annulation est augmentée.

### Table de données {#tables-4}

Le démon de confirmation utilise les tables suivantes :

* confirmation
* info_block

 ### Demande {#request-4}

Le démon de confirmation envoie les demandes suivantes aux autres démons :

* [Type 4](#type-4) Demande les hachages des blocs à partir du nœud d'honneur.

## Protocole de service TCP {#tcp-service-protocol}

Le protocole de service TCP fonctionne sur des nœuds honorables et des nœuds gardiens, qui utilisent le protocole binaire sur TCP pour les demandes des démons BlocksCollection, Disseminator et Confirmation.

## Type de demande {#request-type}

Chaque demande a un type défini par les deux premiers octets de la demande.

### Type 1 {#type-1}

# ### Demandeur de l'envoi {#request-sender-1}

Cette demande est envoyée par le [démon Disseminator](#disseminator-daemon).

# ### D'accord, je vais demander les données. {#request-data-1}

Hachages de la transaction et du bloc.

# ### Traitement de la demande {#request-processing-1}

Le hachage du bloc est ajouté à la file d'attente des blocs.

Analyse et vérifie les hachages des transactions, et sélectionne les transactions qui n'ont pas encore été présentes sur le nœud.

#### Réponse {#response-1}

Non. Après avoir traité la demande, une demande de [Type 2](#type-2) est émise.

### Type 2 {#type-2}

# ### Demandeur de l'expéditeur {#request-sender-2}

Cette demande est envoyée par le [démon Disseminator](#disseminator-daemon).

# ### Demande de données {#request-data-2}

Les données de transaction, y compris la taille des données :

* data_size (4 octets)

* Taille des données de la transaction, en octets.

* données (data_size octets)

Les données de la transaction.

# ### Traitement de la demande {#request-processing-2}

Vérifie la transaction et l'ajoute à la file d'attente des transactions.

#### Réponse {#response-2}

No.

### Type 4 {#type-4}

#### Demande de l'expéditeur{#request-sender-3}

Cette demande est envoyée par le [démon confirmations](#confirmations-daemon).

#### Demande de données {#request-data-3}

Identifiant de bloc.

#### Réponse {#response-3}

Hachage de bloc.

Renvoie `0` s'il n'y a pas de bloc avec cet identifiant.

### Type 7 {#type-7}

#### Demande de l'expéditeur{#request-sender-4}

Cette demande est envoyée par le [démon BlockCollection](#blockcollection-daemon).

#### Demande de données {#request-data-4}

Identifiant de bloc.

* block_id (4 octets)

#### Réponse {#response-4}

Les données du bloc, y compris la taille des données.

* data_size (4 octets)

* Taille des données du bloc, en octets.

* data (data_size octets)

Les données du bloc.

La connexion est fermée s'il n'y a pas de bloc avec cet identifiant.

### Type 10 {#type-10}

# ### Demande de l'expéditeur {#request-sender-5}

Cette demande est envoyée par le [démon BlockCollection].(#blockcollection-daemon).

# ### Demande de données {#request-data-5}

Non.

#### Réponse {#response-5}

Identifiant de bloc.

* block_id (4 octets)

