# Paramètres de la plateforme {#platform-parameters}

Voici les paramètres pour configurer IBAX. Ils s'appliquent au réseau blockchain et à tous les écosystèmes qui en font partie.

## Emplacement pour stocker les paramètres de la plateforme {#location-to-store-platform-parameters}

Les paramètres de la plateforme sont stockés dans la table des `paramètres système`.

Cette table se trouve dans le premier (par défaut) écosystème créé sur le réseau de la blockchain.

## Changement des paramètres de la plateforme {#change-of-platform-parameters}

Le changement des paramètres de la plateforme ne peut être effectué que par le biais d'un vote. Vous ne pouvez utiliser que le contrat UpdateSysParam pour modifier tout paramètre de la plateforme, qui est géré par des définitions dans le système juridique de la plateforme.

## Configurer les paramètres de la plateforme {#configure-platform-parameters}

### Configurer le réseau blockchain {#configure-the-blockchain-network}

Nœuds:

* [honor_nodes](#honor-nodes)
* [number of nodes](#number-of-nodes)

Interdictions de nœuds :

* [incorrect blocks per day](#incorrect-blocks-per-day)
* [node ban time](#node-ban-time)
* [node ban time local](#node-ban-time-local)

### Configurer un nouvel écosystème {#configure-a-new-ecosystem}

Page par défaut et menu:

* [default ecosystem page](#default-ecosystem-page)
* [default ecosystem menu](#default-ecosystem-menu)

Contrat par défaut:

* [default ecosystem contract](#default-ecosystem-contract)

### Configurer la base de données {#configure-the-database}

Limites de table:

* [max columns](#max-columns)
* [max indexes](#max-indexes)

### Configurer la génération de blocs {#configure-the-generation-of-blocks}

Limites de temps:

* [gap between blocks](#gap-between-blocks)
* [max block generation time](#max-block-generation-time)

Limites de transaction:

* [max tx block](#max-tx-block)
* [max tx block per user](#max-tx-block-per-user)

Limites de taille :

* [max tx size](#max-tx-size)
* [max block size](#max-block-size)
* [max forsign size](#max-forsign-size)

Limites de carburant :

* [max fuel block](#max-fuel-block)
* [max fuel tx](#max-fuel-tx)

Limites de blocage de retour en arrière :

* [rollback blocks](#rollback-blocks)

### Configure the fuel tokens {#configure-the-fuel-tokens}

Récompenses et commissions:

* [block reward](#block-reward)
* [commission wallet](#commission-wallet)
* [commission size](#commission-size)

Conversion du taux de consommation de carburant :

* [fuel rate](#fuel-rate)
* [price create rate](#price-create-rate)

Taille de la transaction et prix des données:

* [price tx data](#price-tx-data)
* [price tx size wallet](#price-tx-size-wallet)

Prix pour les nouveaux éléments :

* [price create ecosystem](#price-create-ecosystem)
* [price create table](#price-create-table)
* [price create column](#price-create-column)
* [price create contract](#price-create-contract)
* [price create menu](#price-create-menu)
* [price create page](#price-create-page)
* [price create application](#price-create-application)

Prix pour les opérations :
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

Paramètres dépréciés:

* [blockchain url](#blockchain-url)

## Détails des paramètres de la plateforme {#details-of-platform-parameters}

### block reward {#block-reward}

Le nombre de jetons IBXC accordés au nœud d'honneur qui génère le bloc.

Le compte qui reçoit la récompense est spécifié dans le paramètre [nœuds complets](#nœuds-complets).

### blockchain url {#blockchain-url}

Déprécié.

### commission size {#commission-size}

Pourcentage de la commission.

Le montant de la commission est calculé en pourcentage du coût total de la mise en œuvre du contrat. L'unité de la commission est IBXC.

La commission sera transférée à l'adresse du compte spécifiée dans le paramètre commission_wallet.

### commission wallet {#commission-wallet}

L'adresse du compte pour recevoir la commission.

Le montant de la commission est spécifié par le paramètre commission_size.

### default ecosystem contract {#default-ecosystem-contract}

Le code source du contrat par défaut dans le nouvel écosystème.

Ce contrat permet d'accéder au créateur de l'écosystème.

### default ecosystem menu {#default-ecosystem-menu}

Le code source du menu par défaut du nouvel écosystème.

### default ecosystem page {#default-ecosystem-page}

Le code source de la page par défaut du nouvel écosystème.

### fuel rate {#fuel-rate}

Les taux de change des différents jetons d'écosystème par unité de carburant.

Le format de ce paramètre :

`[["ecosystem_id", "token_to_fuel_rate"], ["ecosystem_id2", "token_to_fuel_rate2"], ...]`

* `ecosystem_id`

    Identifiant de l'écosystème.
* `token_to_fuel_rate`

    Taux de change du jeton par unité de carburant.

Par exemple:

`[["1","1000000000000"], ["2", "1000"]]`

Un jeton de l'écosystème 1 est échangé contre 1 000 000 000 000 unités de carburant. Un jeton de l'écosystème 2 est échangé contre 1 000 unités de carburant.

### price create rate {#price-create-rate}

Le taux de carburant d'un nouvel élément.

## honor nodes {#honor-nodes}

La liste des nœuds d'honneur du réseau blockchain.

Le format de ce paramètre :

`
[{"api_address":"https://apihost1:port1","public_key":"nodepub1","tcp_address":"tcphost1:port2"},{"api_address":"https://apihost2:port1","public_key":"nodepub2","tcp_address":"tcphost2:port2"}]
`

* `tcp_address`

     Adresse TCP et port de l'hôte du nœud.
     Les transactions et les nouveaux blocs seront envoyés à cette adresse d'hôte, qui peut également être utilisée pour obtenir la blockchain complète à partir du premier bloc.
* `api_address`

    Adresse API et port de l'hôte du nœud.
    Grâce à l'adresse API, vous pouvez accéder à n'importe quelle fonction de la plateforme sans utiliser Weaver. Voir les détails dans l'API RESTful.
* `public_key`

    Clé publique du nœud, utilisée pour vérifier la signature du bloc.


### gap between blocks {#gap-between-blocks}
L'intervalle de temps (en secondes) de génération de deux blocs sur un nœud.

Tous les nœuds du réseau l'utilisent pour déterminer quand générer un nouveau bloc. Si le nœud actuel ne génère pas de nouveau bloc dans cette période de temps, le tour passe au nœud suivant dans la liste des nœuds honorés.

La valeur minimale de ce paramètre est de `1` seconde.

### incorrect blocks per day {#incorrect-blocks-per-day}
Le nombre de blocs défectueux qu'un nœud est autorisé à générer par jour avant d'être banni.

Lorsque plus de la moitié des nœuds du réseau reçoivent le même nombre de blocs défectueux d'un nœud, ce dernier sera banni du réseau dans une période de temps spécifiée dans [temps de bannissement du nœud](#node-ban-time).

### max block generation time {#max-block-generation-time}
Le temps maximum pour générer un bloc, en millisecondes. Si un bloc n'est pas généré avec succès dans ce laps de temps, une erreur de délai d'attente sera signalée.

### max block size {#max-block-size}
La taille maximale d'un bloc, en octets.

### max columns {#max-columns}
Le nombre maximum de champs dans une seule table.

Cependant, cela n'inclut pas la colonne prédéfinie `id`.

### max forsign size {#max-forsign-size}
La taille maximale d'une signature de transaction en octets.

### max fuel block {#max-fuel-block}
Le montant maximum total des frais de carburant d'un seul bloc.

### max fuel tx {#max-fuel-tx}
Le montant maximum total des frais de carburant pour une seule transaction.

### max indexes {#max-indexes}
Le nombre maximum de champs de clé primaire dans une seule table.

### max tx block {#max-tx-block}
Le nombre maximum de transactions dans un seul bloc.

### max tx block per user {#max-tx-block-per-user}
Le nombre maximum de transactions d'un compte dans un bloc.

### max tx size {#max-tx-size}
La taille maximale d'une transaction en octets.

### node ban time {#node-ban-time}
La période d'interdiction globale du nœud, en millisecondes.

Lorsque plus de la moitié des nœuds du réseau reçoivent des blocs incorrects d'un nœud jusqu'au nombre de [blocs incorrects par jour](#incorrect-blocks-per-day), le nœud sera banni du réseau pour cette période de temps.

### node ban time local {#node-ban-time-local}
La période d'interdiction locale du nœud, en millisecondes.

Lorsqu'un nœud reçoit un bloc incorrect d'un autre nœud, il interdira localement le nœud de l'expéditeur pendant cette période de temps.

### number of nodes {#number-of-nodes}
Le nombre maximum de nœuds d'honneur dans le paramètre [full nodes](#full-nodes) .

### price create ecosystem {#price-create-ecosystem}
La taxe de carburant pour créer un nouvel écosystème unique.

Ce paramètre définit la taxe de carburant supplémentaire du contrat `@1NewEcosystem`. Lorsque le contrat est mis en œuvre, la taxe de carburant pour l'exécution des différentes fonctions de ce contrat sera également calculée et incluse dans le coût total.

Ce paramètre est calculé en unités de carburant. Utilisez le [fuel rate](#fuel-rate)  et le [price create rate](#price-create-rate) pour convertir les unités de carburant en jetons IBXC.

### price create application {#price-create-application}
La taxe de carburant pour créer une nouvelle application unique.

Ce paramètre définit la taxe de carburant supplémentaire du contrat `@1NewApplication`. Lorsque le contrat est mis en œuvre, la taxe de carburant pour l'exécution des différentes fonctions de ce contrat sera également calculée et incluse dans le coût total.

Ce paramètre est calculé en unités de carburant. Utilisez le [fuel rate](#fuel-rate) et le [price create rate](#price-create-rate) pour convertir les unités de carburant en jetons IBXC.

### price create table {#price-create-table}
Les frais de carburant pour créer une nouvelle table unique.

Ce paramètre définit le coût supplémentaire en carburant du contrat `@1NewTable`. Lorsque le contrat est mis en œuvre, le coût en carburant de l'exécution des différentes fonctions de ce contrat sera également calculé et inclus dans le coût total.

Ce paramètre est calculé en unités de carburant. Utilisez le [fuel rate](#fuel-rate) et le [price create rate](#price-create-rate) pour convertir les unités de carburant en jetons IBXC.

### price create column {#price-create-column}
Les frais de carburant pour créer un nouveau champ de table unique.

Ce paramètre définit le coût supplémentaire en carburant du contrat `@1NewColumn`. Lorsque le contrat est mis en œuvre, le coût en carburant de l'exécution des différentes fonctions de ce contrat sera également calculé et inclus dans le coût total.

Ce paramètre est calculé en unités de carburant. Utilisez le [fuel rate](#fuel-rate) et le [price create rate](#price-create-rate) pour convertir les unités de carburant en jetons IBXC.

### price create contract {#price-create-contract}
Les frais de carburant pour créer un nouveau contrat unique.

Ce paramètre définit le coût supplémentaire en carburant du contrat `@1NewContract`. Lorsque le contrat est mis en œuvre, le coût en carburant de l'exécution des différentes fonctions de ce contrat sera également calculé et inclus dans le coût total.

Ce paramètre est calculé en unités de carburant. Utilisez le [fuel rate](#fuel-rate) et le [price create rate](#price-create-rate) pour convertir les unités de carburant en jetons IBXC.

### price create menu {#price-create-menu}
Les frais de carburant pour créer un nouveau menu unique.

Ce paramètre définit le coût supplémentaire en carburant du contrat `@1NewMenu`. Lorsque le contrat est mis en œuvre, le coût en carburant de l'exécution des différentes fonctions de ce contrat sera également calculé et inclus dans le coût total.

Ce paramètre est calculé en unités de carburant. Utilisez le [fuel rate](#fuel-rate) et le [price create rate](#price-create-rate) pour convertir les unités de carburant en jetons IBXC.

### price create page {#price-create-page}
La taxe de carburant pour créer une nouvelle page unique.

Ce paramètre définit le coût supplémentaire en carburant du contrat `@1NewPage`. Lorsque le contrat est mis en œuvre, le coût en carburant de l'exécution des différentes fonctions de ce contrat sera également calculé et inclus dans le coût total.

Ce paramètre est calculé en unités de carburant. Utilisez le [fuel rate](#fuel-rate) et le [price create rate](#price-create-rate) pour convertir les unités de carburant en jetons IBXC.

### price exec address to id {#price-exec-address-to-id}
La taxe de carburant de l'appel à la fonction `AddressToId()`, calculée en unités de carburant.

### price exec bind wallet {#price-exec-bind-wallet}
La taxe de carburant de l'appel à la fonction `Activate()`, calculée en unités de carburant.

### price exec column condition {#price-exec-column-condition}
La taxe de carburant de l'appel à la fonction `ColumnCondition()`, calculée en unités de carburant. 

### price exec compile contract {#price-exec-compile-contract}
La taxe de carburant de l'appel à la fonction `CompileContract()`, calculée en unités de carburant.

### price exec contains {#price-exec-contains}
La taxe de carburant de l'appel à la fonction `Contains()`, calculée en unités de carburant.

### price exec contract by id {#price-exec-contract-by-id}
La taxe de carburant de l'appel à la fonction `GetContractById()`, calculée en unités de carburant.

### price exec contract by name {#price-exec-contract-by-name}
La taxe de carburant de l'appel à la fonction GetContractByName(), calculée en unités de carburant.

### price exec contracts list {#price-exec-contracts-list}
La taxe de carburant de l'appel à la fonction `ContractsList()`, calculée en unités de carburant.

### price exec create column {#price-exec-create-column}
La taxe de carburant de l'appel à la fonction `CreateColumn()`, calculée en unités de carburant.

### price exec create ecosystem {#price-exec-create-ecosystem}
La taxe de carburant de l'appel à la fonction `CreateEcosystem()`, calculée en unités de carburant.

### price exec create table {#price-exec-create-table}
La taxe de carburant de l'appel à la fonction `CreateTable()`, calculée en unités de carburant.

### price exec ecosys param {#price-exec-ecosys-param}
La taxe de carburant de l'appel à la fonction `EcosysParam()`, calculée en unités de carburant.

### price exec eval {#price-exec-eval}
La taxe de carburant de l'appel à la fonction `Eval()`, calculée en unités de carburant.

### price exec eval condition {#price-exec-eval-condition}
La taxe de carburant de l'appel à la fonction `EvalCondition()`, calculée en unités de carburant.

### price exec flush contract {#price-exec-flush-contract}
Les frais de carburant de l'appel à la fonction `FlushContract()`, calculés en unités de carburant.

### price exec has prefix {#price-exec-has-prefix}
La taxe de carburant de l'appel à la fonction `HasPrefix()`, calculée en unités de carburant.

### price exec id to address {#price-exec-id-to-address}
La taxe de carburant de l'appel à la fonction `IdToAddress()`, calculée en unités de carburant.

### price exec is object {#price-exec-is-object}
La taxe de carburant de l'appel de la fonction `IsObject()`, calculée en unités de carburant.

### price exec join {#price-exec-join}
La taxe de carburant de l'appel à la fonction `Join()`, calculée en unités de carburant.

### price exec json to map {#price-exec-json-to-map}
La taxe de carburant de l'appel à la fonction `JSONToMap()`, calculée en unités de carburant.

### price exec len {#price-exec-len}
La taxe de carburant de l'appel à la fonction `Len()`, calculée en unités de carburant.

### price exec perm column {#price-exec-perm-column}
La taxe de carburant de l'appel de la fonction `PermColumn()`, calculée en unités de carburant.

### price exec perm table {#price-exec-perm-table}
La taxe de carburant de l'appel de la fonction `PermTable()`, calculée en unités de carburant.

### price exec pub to id {#price-exec-pub-to-id}
La taxe de carburant de l'appel à la fonction `PubToID()`, calculée en unités de carburant.

### price exec replace {#price-exec-replace}
La taxe de carburant de l'appel à la fonction `Replace()`, calculée en unités de carburant.

### price exec sha256 {#price-exec-sha256}
La taxe de carburant de l'appel à la fonction `Sha256()`, calculée en unités de carburant.

### price exec size {#price-exec-size}
La taxe de carburant de l'appel à la fonction `Size()`, calculée en unités de carburant.

### price exec substr {#price-exec-substr}
La taxe de carburant de l'appel de la fonction `theSubstr()`, calculée en unités de carburant.

### price exec sys fuel {#price-exec-sys-fuel}
La taxe de carburant de l'appel à la fonction `SysFuel()`, calculée en unités de carburant.

### price exec sys param int {#price-exec-sys-param-int}
La taxe de carburant de l'appel de la fonction `SysParamInt()`, calculée en unités de carburant.

### price exec sys param string {#price-exec-sys-param-string}
La taxe de carburant de l'appel de la fonction `SysParamString()`, calculée en unités de carburant.

### price exec table conditions {#price-exec-table-conditions}
La taxe de carburant de l'appel à la fonction `TableConditions()`, calculée en unités de carburant. 

### price exec unbind wallet {#price-exec-unbind-wallet}
La taxe de carburant de l'appel à la fonction `Deactivate()`, calculée en unités de carburant.

### price exec update lang {#price-exec-update-lang}
La taxe de carburant de l'appel de la fonction `UpdateLang()`, calculée en unités de carburant.

### price exec validate condition {#price-exec-validate-condition}
La taxe de carburant de l'appel à la fonction `ValidateCondition()`, calculée en unités de carburant.

### price tx data {#price-tx-data}
La taxe de carburant pour chaque tranche de 1024 octets d'une transaction, calculée en unités de carburant.

### price tx size wallet {#price-tx-size-wallet}
La commission en fonction de la taille de la transaction, son unité est le jeton IBXC.

Sauf pour l'écosystème 1, des frais d'utilisation de l'espace de bloc seront facturés proportionnellement lors de la mise en œuvre d'un contrat dans d'autres écosystèmes, et son taux est de *price tx size wallet* jetons IBXC par mégaoctet.

### rollback blocks {#rollback-blocks}
Nombre maximum de blocs pouvant être annulés lors de la détection d'une bifurcation dans la blockchain.
