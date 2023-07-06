# API RESTful v2 {#restful-api-v2}

**Weaver**

Toutes les fonctions fournies, y compris l'authentification, la réception des données de l'écosystème, la gestion des erreurs, la manipulation des tables de la base de données, l'exécution des pages et des contrats sont disponibles via l'API REST de la plateforme IBAX Blockchain.

En utilisant l'API REST, les développeurs peuvent accéder à toutes les fonctionnalités de la plateforme sans utiliser Weaver.

Les appels de commandes API sont exécutés en adressant `/api/v2/commande/[param]`, où `commande` est le nom de la commande et `param` est le paramètre supplémentaire. Les paramètres de la requête doivent être spécifiés en utilisant le `Content-Type: x-www-form-urlencoded`.

Le format est envoyé. La réponse du serveur est renvoyée au format JSON.

<!-- TOC -->

- [Gestion des réponses d'erreur](#error-response-handling)
    - [Liste d'erreurs](#error-list)
- [Type de requête](#request-type)
- [Interface d'authentification](#authentication-interface)
    - [getuid](#getuid)
    - [login](#login)
- [Interface de commande côté serveur](#server-side-command-interface)
    - [version](#version)
- [Interface de fonction de demande de données](#data-request-function-interface)
    - [balance](#balance)
    - [blocks](#blocks)
    - [detailed_blocks](#detailed-blocks)
    - [/data/{id}/data/{hash}](#data-id-data-hash)
    - [/data/{table}/id/{column}/{hash}](#data-table-id-column-hash)
    - [keyinfo](#keyinfo)
    - [walletHistory](#wallethistory)
    - [listWhere/{name}](#listwhere-name)
    - [nodelistWhere/{name}](#nodelistwhere-name)
- [Interface de récupération des métriques](#get-metrics-interface)
    - [metrics/keys](#metrics-keys)
    - [metrics/blocks](#metrics-blocks)
    - [metrics/transactions](#metrics-transactions)
    - [metrics/ecosystems](#metrics-ecosystems)
    - [metrics/honornodes](#metrics-honornodes)
- [Interface de l'écosystème](#ecosystem-interface)
    - [ecosystemname](#ecosystemname)
    - [appparams/{appID}](#appparams-appid)
    - [appparam/{appid}/{name}](#appparam-appid-name)
    - [ecosystemparams](#ecosystemparams)
    - [ecosystemparam/{name}](#ecosystemparam-name)
    - [tables/\[?limit=\... &offset=\... \]](#tables-limit-offset)
    - [table/{name}](#table-name)
    - [list/{name}\[?limit=\... &offset=\... &columns=\... \]](#list-name-limit-offset-columns)
    - [sections\[?limit=\... &offset=\... &lang=\]](#sections-limit-offset-lang)
    - [row/{name}/{id}\[?columns=\]](#row-name-id-columns)
    - [row/{name}/{column}/{id}](#row-name-column-id)
    - [systemparams](#systemparams)
    - [history/{name}/{id}](#history-name-id)
    - [interface/{page|menu|snippet}/{name}](#interface-page-menu-snippet-name)
- [Interface de fonction de contrat](#contract-function-interface)
    - [contracts\[?limit=\... &offset=\... \]](#contracts-limit-offset)
    - [contract/{name}](#contract-name)
    - [sendTX](#sendtx)
    - [txstatus](#txstatus)
    - [txinfo/{hash}](#txinfo-hash)
    - [txinfoMultiple](#txinfomultiple)
    - [/page/validators_count/{name}](#page-validators-count-name)
    - [content/menu\|page/{name}](#content-menu-page-name)
    - [content/source/{name}](#content-source-name)
    - [content/hash/{name}](#content-hash-name)
    - [content](#content)
    - [maxblockid](#maxblockid)
    - [block/{id}](#block-id)
    - [avatar/{ecosystem}/{member}](#avatar-ecosystem-member)
    - [config/centrifugo](#config-centrifugo)
    - [updnotificator](#updnotificator)


<!-- /TOC -->

## Gestion des réponses d'erreur {#error-response-handling}

Statut de retour en cas d'exécution réussie de la requête `200`. Si une erreur se produit, en plus du statut d'erreur, un objet JSON avec les champs suivants sera renvoyé.

- **error**

    > Identifiant d'erreur.

- **msg**

    > Message d'erreur.

- **params**

    > Un tableau de paramètres supplémentaires pouvant être placés dans le message d'erreur.

**Exemple de réponse**

``` text
400 (Bad request)
Content-Type: application/json
{
    "err": "E_INVALIDWALLET",
    "msg": "Wallet 1234-5678-9012-3444-3488 is not valid",
    "params": ["1234-5678-9012-3444-3488"]
}
```

### Liste d'erreurs {#error-list}

> `E_CONTRACT`
 
    Aucun contrat `%s` n'existe

> `E_DBNIL`

    La base de données est vide

> `E_DELETEDKEY`

    L'adresse du compte est gelée

> `E_ECOSYSTEM`

    L'écosystème `%d` n'existe pas

> `E_EMPTYPUBLIC`

    Clé publique du compte invalide

> `E_KEYNOTFOUND`

    Adresse du compte introuvable

> `E_HASHWRONG`

    Hash incorrect

> `E_HASHNOTFOUND`

    Hash introuvable

> `E_HEAVYPAGE`

    Trop de chargement de page

> `E_INVALIDWALLET`

    Adresse du portefeuille `%s` invalide

> `E_LIMITTXSIZE`

    La taille de la transaction a dépassé la limite

> `E_NOTFOUND`

    Page ou contenu du menu introuvable

> `E_PARAMNOTFOUND`

    Paramètres introuvables

> `E_PERMISSION`

    Pas de permission

> `E_QUERY`

    Erreur de requête de base de données

> `E_RECOVERED`

    Une erreur de panique de l'API s'est produite.

    Si une erreur de panique se produit, une erreur est renvoyée.

    Cette erreur signifie que vous avez rencontré un bogue qui doit être identifié et corrigé.

> `E_SERVER`

    Erreur du serveur.

    Renvoyé s'il y a une erreur dans la fonction de la bibliothèque golang. Le champ \*msg\* contient le message d'erreur.

    **E_SERVER** peut apparaître en réponse à n'importe quelle erreur de commande. 
    S'il se produit en raison d'un paramètre d'entrée incorrect, il peut être modifié en une erreur associée. Dans un autre cas, cette erreur signale une opération invalide ou une configuration système incorrecte, ce qui nécessite un rapport d'enquête plus détaillé.

> `E_SIGNATURE`

    Signature incorrecte

> `E_STATELOGIN`

    `%s` n'est pas membre de l'écosystème `%s`

> `E_TABLENOTFOUND`

    Feuille de données `%s` introuvable

> `E_TOKENEXPIRED`

    La session a expiré `%s`

> `E_UNAUTHORIZED`

    Non autorisé.

    En cas de non connexion ou d'expiration de la session, à l'exception de `getuid, login`, toute commande autre que **E_UNAUTHORIZED** renvoie une erreur.

> `E_UNKNOWNUID`

    UID inconnu

> `E_UPDATING`

    Les nœuds mettent à jour la blockchain

> `E_STOPPING`

    Le nœud est arrêté

> `E_NOTIMPLEMENTED`

    Pas encore implémenté

> `E_BANNED`

    Cette adresse de compte est interdite dans `%s`

> `E_CHECKROLE`

    Accès refusé

    Interface CLB non disponible

------------------------------------------------------------------------

> Demandes d'interface pour lesquelles le nœud CLB n'est pas disponible.

- metrics
- txinfo
- txinfoMultiple
- appparam
- appparams
- appcontent
- history
- balance
- block
- maxblockid
- blocks
- detailed_blocks
- ecosystemparams
- systemparams
- ecosystems
- ecosystemparam
- ecosystemname
- walletHistory
- tx_record

## Type de demande {#request-type}
**Utilisation uniforme** 
- application/x-www-form-urlencoded

## Interface d'authentification {#authentication-interface}

[JWT token](https://jwt.io)
Utilisé pour l'authentification. Le jeton JWT doit être placé dans l'en-tête de chaque requête après l'avoir reçu : `Authorization: Bearer TOKEN_HERE`.

### getuid {#getuid}

**GET**/ retourne une valeur unique, la signe avec la clé privée, puis l'utilise.

La commande [login](#login) l'envoie de retour au serveur.

Génère un jeton JWT temporaire qui doit être transmis à **Authorization** lors de l'appel à **login**.
 
**Demande**

``` text
GET
/api/v2/getuid
```

**Réponse**

- `uid`

    > Numéro de signature.

- `token`

    > Le jeton temporaire passé lors de la connexion.
    >
    > Le cycle de vie d'un jeton temporaire est de 5 secondes.

- `network_id`

    > Identifiant du serveur.

- `cryptoer`

    > Algorithme de courbe elliptique.

- `hasher`

    > Algorithme de hachage.

**Exemple de réponse 1**

``` text
200 (OK)
Content-Type: application/json
```json
{
    "uid": "4999317241855959593",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE",
    "network_id": "4717243765193692211"
}
```

Dans le cas où aucune autorisation n'est requise (la demande contient **Authorization**), le message suivant sera renvoyé :

- `expire`

    > Temps d'expiration.

- `ecosystem`

    > ID de l'écosystème.

- `key_id`

    > Adresse du compte.

- `address`

    > Adresse du portefeuille `XXXX-XXXX-..... -XXXX`.

- `network_id`

    > Identifiant du serveur.

**Response Example 2**

``` text
200 (OK)
Content-Type: application/json
{
    "expire": "2159h59m49.4310543s",
    "ecosystem_id": "1",
    "key_id": "-654321",
    "address": "1196-...... -3496",
    "network_id": "1"
}
```

**Réponse d'erreur**

*E_SERVER*

### login {#login}

**POST**/ Authentification de l'utilisateur.

> **getuid** doit être appelé en premier pour recevoir la valeur unique et la signer. Le jeton JWT temporaire de getuid doit être transmis dans l'en-tête de la requête.
>
> Si la requête réussit, le jeton reçu dans la réponse est contenu dans **Authorization**.

**Demande**

``` text
POST
/api/v2/login
```

- `ecosystem` (écosystème)

    > Identifiant de l'écosystème.
    >
    > Si non spécifié, il est par défaut défini sur le premier identifiant d'écosystème.

- `expire` (expiration)

    > Durée de vie du jeton JWT, en secondes, par défaut 28800.

- `pubkey` (clé publique)

    > Clé publique du compte en format hexadécimal.

- `key_id` (identifiant de clé)

    > Adresse du compte au format `XXXX-...-XXXX`.
    >
    > Utilisez ce paramètre si la clé publique est déjà stockée dans la blockchain. Il ne peut pas être utilisé avec les paramètres *pubkey* en même temps.

- `signature` (signature)

    > La signature uid reçue via getuid.

**Réponse**

- `token`

    > Jeton JWT.

- `ecosystem_id`

    > ID de l'écosystème.

- `key_id`

    > ID de l'adresse du compte.

- `account`

    > Adresse du portefeuille `XXXX-XXXX-..... -XXXX`.

- `notify_key`

    > ID de notification.

- `isnode`

    > Indique si l'adresse du compte est le propriétaire du nœud. Valeurs : `true,false`.

- `isowner`

    > Indique si l'adresse du compte est le créateur de l'écosystème. Valeurs : `true,false`.

- `clb`

    > Indique si l'écosystème connecté est CLB. Valeurs : `true,false`.

- `roles` [Omitempty](#omitempty)

    > Liste des rôles : `[{ID du rôle, Nom du rôle}]`.

**Exemple de réponse**

```text
200 (OK)
Content-Type: application/json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....30l665h3v7lH85rs5jgk0",
    "ecosystem_id": "1",
    "key_id": "-54321",
    "account": "1285-... -7743-4282",
    "notify_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..... _JTFfheD0K4CfMbvVNpOJVMNDPx25zIDGir9g3ZZM0w",
    "timestamp": "1451309883",
    "roles": [
        {
            "role_id": 1,
            "role_name": "Developer"
        }
    ]
} 
```

**Réponse d'erreur**

*E_SERVER, E_UNKNOWNUID, E_SIGNATURE, E_STATELOGIN, E_EMPTYPUBLIC*

## Interface de commande côté serveur {#server-side-command-interface}

### version {#version}

**GET**/ Retourne la version actuelle du serveur.

Cette demande ne nécessite pas d'autorisation de connexion.

**Demande**

``` text
GET
/api/v2/version
```

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
"1.3.0 branch.main commit.790..757 time.2021-08-23-08:20:19(UTC)"
```

## Data Request Function Interface {#data-request-function-interface}

### balance {#balance}

**GET**/ Demande le solde de l'adresse du compte dans l'écosystème actuel.

Cette demande ne nécessite pas d'autorisation de connexion.

**Demande**

``` text
GET
/api/v2/balance/{wallet}
```

- `portefeuille`

    > Identifiant d'adresse, peut être spécifié dans n'importe quel format `int64, uint64, XXXX-... -XXXX`. Recherchez l'adresse dans l'écosystème où l'utilisateur est actuellement connecté.

- `écosystème` [Omitempty](#omitempty) Écosystème par défaut 1

    > Identifiant de l'écosystème.

**Réponse**

- `montant`

    > L'unité minimale du solde du compte de contrat.

- `argent`

    > Solde du compte.

- `total`

    > Solde du compte.

- `utxo`

    > Solde du compte UTXO.

-   *chiffres*

    > précision.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "amount": "877450000000000",
    "money": "877.45",
    "total": "877450000000000",
    "digits": 6,
    "utxo": "0"
} 
```

**Réponse d'erreur**

*E_SERVER, E_INVALIDWALLET*

### blocks {#blocks}

**GET**/ Retourne une liste contenant des informations supplémentaires liées aux transactions dans chaque bloc.

Cette demande ne nécessite pas d'autorisation de connexion.

**Demande**

``` text
GET 
/api/v2/blocks
```

- `block_id` [Omitempty](#omitempty) La valeur par défaut est 0

    > La hauteur du bloc de départ à interroger.

- `count` [Omitempty](#omitempty) (par défaut 25, requête maximale 1000)

    > Nombre de blocs.

**Réponse**

- `Hauteur de bloc`

    > Liste des transactions dans le bloc et des informations supplémentaires pour chaque transaction.
    >
    > > - `hash`
    > >
    > > > Hash de la transaction.
    > >
    > > - `contract_name`
    > >
    > > > Nom du contrat.
    > >
    > > - `params`
    > >
    > > > Tableau des paramètres du contrat.
    > >
    > > - `key_id`
    > >
    > > > Pour le premier bloc, il s'agit de l'adresse du compte du premier bloc qui a signé la transaction.
    > >
    > > > Pour tous les autres blocs, c'est l'adresse du compte qui a signé la transaction.

**Exemple de réponse**

```text
200 (OK)
Content-Type: application/json
{ "1":
    [{"hash": "O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=",
    "contract_name":"",
    "params":null,
    "key_id":-118432674655542910}]
}
```

**Réponse d'erreur**

*E_SERVER, E_NOTFOUND*

### detailed_blocks {#detailed-blocks}

**GET**/ Retourne une liste contenant des informations détaillées supplémentaires sur les transactions de chaque bloc.

Cette demande ne nécessite pas d'autorisation de connexion.

**Demande**

``` text
GET
/api/v2/detailed_blocks
```

- `block_id` [Omitempty](#omitempty) La valeur par défaut est 0

  > La hauteur du bloc de départ à interroger.

- `count` [Omitempty](#omitempty) (par défaut 25, requête maximale 1000)

  > Nombre de blocs.

**Réponse**

- `Block height` La hauteur du bloc.
  - `blockhead` L'en-tête du bloc contient les champs suivants.
    - `block_id` Hauteur du bloc.
    - `time` Horodatage de génération du bloc.
    - `key_id` Adresse du compte qui a signé le bloc.
    - `node_position` L'emplacement du nœud qui a généré le bloc dans la liste des nœuds d'honneur.
    - `version` Version de la structure du bloc.
  - `hash` Hash du bloc.
  - `node_position` L'emplacement du nœud qui a généré le bloc dans la liste des nœuds d'honneur.
  - `key_id` L'adresse du compte qui a signé le bloc.
  - `time` Horodatage de génération du bloc.
  - `tx_count` Nombre de transactions dans le bloc.
  - `size` La taille du bloc.
  - `rollback_hash` Hash de rollback du bloc.
  - `merkle_root` Le bloc traite l'arbre de Merkle.
  - `bin_data` Sérialisation de l'en-tête du bloc, de toutes les transactions du bloc, du hash du bloc précédent et de la clé privée du nœud qui a généré le bloc.
  - `transactions` Liste des transactions dans le bloc et des informations supplémentaires sur chaque transaction.
    - `hash` Hash de la transaction.
    - `contract_name` Nom du contrat.
    - `params` Paramètres du contrat.
    - `key_id` Adresse du compte qui a signé cette transaction.
    - `time` Horodatage de génération de la transaction.
    - `type` Type de transaction.
    - `size` Taille de la transaction.


**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{"1":
    {"header":
        {"block_id":1,
        "time":1551069320,
        "ecosystem_id":0,
        "key_id":-118432674655542910,
        "node_position":0,
        "version":1},
    "hash":"3NxhvswmpGvRdw8HdkrniI5Mx/q14Z4d5hwGKMp6KHI=",
    "ecosystem_id":0,
    "node_position":0,
    "key_id":-118432674655542910,
    "time":1551069320,
    "tx_count":1,
    "size": "1.69KiB",
    "rollbacks_hash":"I2JHugpbdMNxBdNW1Uc0XnbiXFtzB74yD9AK5YI5i/k=",
    "mrkl_root":"MTZiMjY2NGJjOWY3MDAyODlhYjkyMDVhZDQwNDgxNzkxMjY1MWJjNjczNDkyZjk5MWI2Y2JkMjAxNTIwYjUyYg==",
    "bin_data":null,
    "sys_update":false,
    "gen_block":false,
    "stop_count":0,
    "transactions":[
        {
            "hash":"O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=",
            "contract_name":"",
            "params":null,
            "key_id":0,
            "time":0,
            "type":0,
            "size": "300.00B"
        }
    ]}
}
```

**Réponse d'erreur**

*E_SERVER, E_NOTFOUND*

### /data/{id}/data/{hash} {#data-id-data-hash}

**GET**/ Si le hachage spécifié correspond aux données de la montre binaire, du champ et des enregistrements, cette demande renverra les données. Sinon, une erreur sera renvoyée.

La demande ne nécessite pas d'autorisation de connexion.

**Demande**

```text
GET
/data/{id}/data/{hash}
```

- `id`

    > Identifiant d'enregistrement.

- `hash`

    > Hacher les données de la requête.

**Réponse**

> Données binaires

**Exemple de réponse**

``` text
200 (OK)
Content-Type: *
{
    "name": "NFT Miner",
    "conditions": "ContractConditions(\"@1DeveloperCondition\")",
    "data": [
        {
            "Type": "contracts",
            "Name": "NewNFTMiner",
        },
        ...
    ]
}
```

**Réponse d'erreur**

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### /data/{table}/id/{column}/{hash} {#data-table-id-column-hash}

**GET**/ Si le hachage spécifié correspond aux données dans la table, le champ et les enregistrements spécifiés, la requête renverra les données. Sinon, une erreur sera renvoyée.

La requête ne nécessite pas d'autorisation de connexion.

**Demande**

```text
GET
/data/{table}/id/{column}/{hash}
```

- `table`

    > Nom de la table de données.

- `id`

    > Identifiant d'enregistrement.

- `column`

    > Nom de la table de données, un seul

- `hash`

    > Données de demande de hachage.

**Réponse**

> Données binaires

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/octet-stream
Content-Disposition: attachment

SetVar(this_page, @1voting_list).(this_table, @1votings)
Include(@1pager_header)

SetTitle("$@1voting_list$")
Span(Class: text-muted h5 m0 mb ml-lg, Body: Span(Class: ml-sm, Body: "$@1votings_list_desc$"))
AddToolButton(Title: $@1templates_list$, Page: @1voting_templates_list, Icon: icon-pin)
AddToolButton(Title: $@1create$, Page: @1voting_create, Icon: icon-plus).Popup(60, $@1new_voting$)

```

**Réponse d'erreur**

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### keyinfo {#keyinfo}

**GET**/ Retournez à une liste d'écosystèmes, qui contient le rôle d'enregistrement de l'adresse spécifiée.

La demande ne nécessite pas d'autorisation de connexion.

**Demande**

```text
GET
/api/v2/keyinfo/{address}
```

- `address`

    > Identifiant de l'adresse, vous pouvez spécifier `int64, uint64, xxxx -...-xxxx`.
    >
    > Cette requête est une recherche dans tous les écosystèmes.

**Réponse**

- `ecosystem`

    > Identifiant de l'écosystème.

- `name`

    > Nom de l'écosystème.

- `roles`

    > Activités avec les champs *id* et *nom*.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Governancer"},{"id":"2","name":"Developer"}]
}]
```

**Réponse d'erreur**

*E_SERVER, E_INVALIDWALLET*

### walletHistory {#wallethistory}
**GET**/ Retournez à l'historique des transactions du compte courant, recherchez-le en fonction de l'identifiant de l'ID.

[Authorization](#authorization)

**Demande**

- `searchType`

  > Trouver le type (Revenu : Convertir en Résultat : Tout, par défaut).

- `page` [Omitempty](#omitempty)
  > Trouver le nombre de pages, la première page par défaut, min : 1

- `limit` [Omitempty](#omitempty)
  > Nombre de crédits, 20 articles par défaut. min : 1, MAX : 500

``` text
GET
/api/v2/walletHistory?searchType=all&page=1&limit=10
```

**Réponse**

- `total`

  > Nombre total d'entrées.

- `page`

  > Numéro de la page actuelle.

- `limit`

  > Actuellement, trouvez le nombre de bars.

- `list` Chaque élément dans le tableau contient les paramètres suivants :

    - `id` ID Stripe.
    - `sender_id` ID de l'expéditeur.
    - `sender_add` Adresse du compte de l'expéditeur.
    - `recipient_id` ID du destinataire.
    - `recipient_add` Adresse du compte du destinataire.
    - `amount` Montant de la transaction.
    - `comment` Remarques sur la transaction.
    - `block_id` Hauteur du bloc.
    - `tx_hash` Hash de la transaction.
    - `created_at` Heure de création de la transaction, en millisecondes.
    - `money` Montant de la transaction.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "page": 1,
    "limit": 10,
    "total": 617,
    "list": [
        {
            "id": 650,
            "sender_id": 666081971617879...,
            "sender_add": "0666-0819-7161-xxxx-5186",
            "recipient_id": 666081971617879...,
            "recipient_add": "0666-0819-7161-xxxx-5186",
            "amount": "242250000",
            "comment": "taxes for execution of @1Export contract",
            "block_id": 209,
            "tx_hash": "a213bc767d710a223856d83515d53518075b56fb9e9c063bce8a256c20ff0775",
            "created_at": 1666001092090,
            "money": "0.00024225"
        }
        ...
    ]
}  
```

**Réponse d'erreur**

*E_SERVER*



### listWhere/{name} {#listwhere-name}

**GET**/ Retournez à l'entrée du tableau de données spécifié dans l'écosystème actuel. Vous pouvez spécifier les colonnes à retourner.

[Authorization](#authorization)

**Demande**

- `name`

  > Nom de la table de données.

-   `limit` [Omitempty](#omitempty)

    > Numéro de crédit, par défaut 25.

-   `offset` [Omitempty](#omitempty)

    > Disposition, par défaut 0.

-   `order` [Omitempty](#omitempty)

    > Méthode de tri, par défaut `id ASC`.

-   `columns` [Omitempty](#omitempty)

    > La liste des colonnes demandées est séparée par des virgules. Si elle n'est pas spécifiée, toutes les colonnes seront renvoyées. Dans tous les cas, la colonne `id` sera renvoyée.

-   `where` [Omitempty](#omitempty)

    > Condition de requête
    >
    > Exemple : Si vous souhaitez interroger id> 2 et name = john
    >
    > Vous pouvez utiliser : where: {"id": {"$ gt": 2}, "name": {"$eq": "john"}}
    >
    > Pour plus de détails, veuillez vous référer à la syntaxe [DBFind](../ topics/script.md#dbfind) where.

```text
POST
/api/v2/listWhere/mytable
```

**Réponse**

- `count`

  > Nombre total d'entrées.
- `list`
  > Chaque élément dans le tableau contient les paramètres suivants :
  - `id`
    > ID Stripe.
  - `...`
    > Autres colonnes des tables de données.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 1,
    "list": [
        {
            "account": "xxxx-0819-7161-xxxx-xxxx",
            "ecosystem": "1",
            "id": "12",
            "key": "avatar",
            "value": "{\"binary_id\": 4}"
        }
    ]
}
```

**Réponse d'erreur**

*E_SERVER*,*E_TABLENOTFOUND*


### nodelistWhere/{name} {#nodelistwhere-name}

**GET**/ Retournez à la table de données spécifiée. Vous pouvez spécifier les colonnes à retourner. Effectue un encodage hexadécimal des types de données **BYTEA** dans la table.

[Authorization](#authorization)

**Demande**

- `name`

  > Nom de la table de données.

-   `limit` [Omitempty](#omitempty)

    > Numéro de crédit, par défaut 25.

-   `offset` [Omitempty](#omitempty)

    > Disposition, par défaut à 0.

-   `order` [Omitempty](#omitempty)

    > Méthode de tri, par défaut `id ASC`.

-   `columns` [Omitempty](#omitempty)

    > La liste des colonnes demandées est séparée par des virgules. Si elle n'est pas spécifiée, toutes les colonnes seront renvoyées. Dans tous les cas, la colonne `id` sera renvoyée.

-   `where` [Omitempty](#omitempty)

    > Condition de requête
    >
    > Exemple : Si vous souhaitez interroger id> 2 et name = john
    >
    > Vous pouvez utiliser : where: {"id": {"$ gt": 2}, "name": {"$eq": "john"}}
    >
    > Pour plus de détails, veuillez vous référer à la syntaxe [DBFind](../ topics/script.md#dbfind) where.

``` text
GET
/api/v2/nodelistWhere/mytable
```

**Réponse**

- `count`

  > Nombre total d'entrées.

- `list`
  > Chaque élément dans le tableau contient les paramètres suivants :
    - `id`
      > ID Stripe.
    - `...`
      > Autres colonnes des tables de données.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 1,
    "list": [
        {
            "account": "xxxx-0819-7161-xxxx-xxxx",
            "ecosystem": "1",
            "id": "12",
            "key": "avatar",
            "value": "{\"binary_id\": 4}"
        }
    ]
}
```

**Réponse d'erreur**

*E_SERVER*,*E_TABLENOTFOUND*



## Obtenir l'interface des métriques {#get-metrics-interface}

### metrics/keys {#metrics-keys}

**GET**/ Retourne le nombre d'adresses de compte de l'écosystème 1.

**Demande**

``` text
GET
/api/v2/metrics/keys
```

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/blocks {#metrics-blocks}

**GET**/ Retourne le nombre de blocs.

**Demande**

``` text
GET
/api/v2/metrics/blocks
```

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/transactions {#metrics-transactions}

**GET**/ Returns the total number of transactions.

**Demande**

``` text
GET
/api/v2/metrics/transactions
```

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/ecosystems {#metrics-ecosystems}

**GET**/ Returns the number of ecosystems.

**Demande**

``` text
GET
/api/v2/metrics/ecosystems
```

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/honornodes {#metrics-honornodes}

**GET**/ Retourne le nombre de nœuds d'honneur.

Cette demande ne nécessite pas d'autorisation de connexion.

``` 
GET
/api/v2/metrics/honornodes
```

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

## Interface de l'écosystème {#ecosystem-interface}

### ecosystemname {#ecosystemname}

**GET**/ Retourne le nom de l'écosystème par son identifiant.

Cette demande ne nécessite pas d'autorisation de connexion.

``` text
GET
/api/v2/ecosystemname?id=1
```

- *id*

    > Identifiant de l'écosystème.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "ecosystem_name": "platform_ecosystem"
}
```

**Réponse d'erreur**

*E_PARAMNOTFOUND*

### appparams/{appid} {#appparams-appid}

[Authorization](#authorization)

**GET**/ Renvoie une liste de paramètres d'application dans l'écosystème actuel ou spécifié.

**Demande**

``` text
GET
/api/v2/appparams/{appid}
```

- `appid`

    > Identifiant de l'application.

- `ecosystem`

    > Identifiant de l'écosystème ; si non spécifié, le paramètre d'écosystème actuel sera renvoyé.

- `names`

    > La liste des paramètres reçus.
    >
    > Vous pouvez spécifier une liste de noms de paramètres séparés par des virgules, par exemple : `/api/v2/appparams/1?names=name,mypar`.

**Réponse**

- `list`

    > Chaque élément du tableau contient les paramètres suivants.
    >
    > - `nom`, le nom du paramètre.
    > - `valeur`, la valeur du paramètre.
    > - `conditions`, modifier les permissions des paramètres.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "list": [{ 
        "name": "name",
        "value": "MyState",
        "conditions": "true",
    }, 
    { 
        "name": "mypar",
        "value": "My value",
        "conditions": "true",
    }, 
    ]
} 
```

**Réponse d'erreur**

*E_ECOSYSTEM*

### appparam/{appid}/{name} {#appparam-appid-name}

[Authorization](#authorization)

**GET**/ Renvoie des informations sur le paramètre **{name}** de l'application **{appid}** dans l'écosystème actuel ou spécifié.

**Demande**

``` text
GET
/api/v2/appparam/{appid}/{name}[?ecosystem=1]
```

- `appid`

    > Identifiant de l'application.

- `name`

    > Le nom du paramètre demandé.

- `ecosystem` [Omitempty](#omitempty)

    > Identifiant de l'écosystème (paramètre facultatif).
    >
    > Renvoie l'écosystème actuel par défaut.

**Réponse**

- `id`

    > Identifiant du paramètre.

- `name`

    > Nom du paramètre.

- `value`

    > La valeur du paramètre.

- `conditions`

    > Autorisation de modifier les paramètres.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "id": "10",
    "name": "par",
    "value": "My value",
    "conditions": "true"
} 
```

**Réponse d'erreur**

*E_ECOSYSTEM, E_PARAMNOTFOUND*

### ecosystemparams {#ecosystemparams}

[Authorization](#authorization)

**GET**/ Renvoie une liste de paramètres de l'écosystème.

**Demande**

``` text
GET
/api/v2/ecosystemparams/[?ecosystem=... &names=...]
```

- `ecosystem` [Omitempty](#omitempty)

    > Identifiant de l'écosystème. if not specified, the current ecosystem ID will be returned.

- `names` [Omitempty](#omitempty)

    > Liste des paramètres de demande, séparés par des virgules.
    >
    > Par exemple: `/api/v2/ecosystemparams/?names=name,currency,logo`.

**Réponse**

- `list`

    > Chaque élément du tableau contient les paramètres suivants.
    >
    > - `name`
    >
    > > Nom du paramètre.
    >
    > - `value`
    >
    > > Valeur du paramètre.
    >
    > - `conditions`
    >
    > > Modifier les autorisations pour les paramètres.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "list": [{ 
        "name": "name",
        "value": "MyState",
        "conditions": "true",
    }, 
    { 
        "name": "currency",
        "value": "MY",
        "conditions": "true",
    }, 
    ]
} 
```

**Réponse d'erreur**

*E_ECOSYSTEM*

### ecosystemparam/{name} {#ecosystemparam-name}

[Authorization](#authorization)

**GET**/ Renvoie des informations sur le paramètre **{name}** dans l'écosystème actuel ou spécifié.

**Demande**

``` text
GET
/api/v2/ecosystemparam/{name}[?ecosystem=1]
```

- `name`

    > Le nom du paramètre demandé.

- `ecosystem` [Omitempty](#omitempty)

    > La valeur par défaut est de renvoyer l'ID de l'écosystème actuel.

**Réponse**

- `name`

    > Nom du paramètre.

- `value`

    > La valeur du paramètre.

- `conditions`

    > Autorisation de modifier les paramètres.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
} 
```

**Réponse d'erreur**

*E_ECOSYSTEM*

### tables/\[?limit=\... &offset=\... \] {#tables-limit-offset}

[Authorization](#authorization)

**GET**/ Retourne une liste de tables de données pour l'écosystème actuel. Vous pouvez définir le décalage et le nombre d'entrées.

**Demande**

- `limit` [Omitempty](#omitempty)

    > Nombre d'entrées, par défaut 100, maximum 1000.

- `offset` [Omitempty](#omitempty)

    > Décalage, la valeur par défaut est 0.

``` text
GET
/api/v2/tables?limit=... &offset=...
```

**Réponse**

- `count`

    > Le nombre total d'entrées dans le tableau de données.

- `list`

    > Chaque élément du tableau contient les paramètres suivants.
    >
    > > - `name`
    > >
    > > > Nom de la table de données sans préfixe.
    > >
    > > - `count`
    > >
    > > > Le nombre d'entrées dans la table de données.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": "100"
    "list": [{ 
        "name": "accounts",
        "count": "10",
    }, 
    { 
        "name": "citizens",
        "count": "5",
   }, 
    ]
} 
```

### table/{name} {#table-name}

[Authorization](#authorization)

**GET**/ Renvoie des informations sur la table de données de la demande actuelle de l'écosystème.

**Demande**

- `name`

    > Nom de la table de données.

``` text
GET
/api/v2/table/{table_name}
```

Renvoie les informations de champ suivantes.

- `name`

    > Nom de la table de données.

- `insert`

    > Permission d'ajouter de nouvelles entrées.

- `new_column`

    > Ajouter des permissions de champ.

- `update`

    > Modifier les permissions d'entrée.

- `columns`

    > Tableau d'informations liées au champ.
    >
    > > - `name`
    > >
    > > > Nom du champ.
    > >
    > > - `type`
    > >
    > > > Type de données du champ.
    > >
    > > - `perm`
    > >
    > > > Modifier les permissions pour la valeur du champ.

### list/{name}\[?limit=\... &offset=\... &columns=\... \] {#list-name-limit-offset-columns}

[Authorization](#authorization)

**GET**/
Renvoie une liste des entrées de table de données spécifiées dans l'écosystème actuel. Vous pouvez définir le décalage et le nombre d'entrées.

**Demande**

- `name`

    > Nom de la table de données.

- `limit` [Omitempty](#omitempty)

    > Nombre d'entrées, par défaut 25 entrées.

- `offset` [Omitempty](#omitempty)

    > Décalage, par défaut est 0.

- `columns` [Omitempty](#omitempty)

    > Une liste de colonnes demandées, séparées par des virgules. Si non spécifié, toutes les colonnes seront renvoyées. La colonne id sera renvoyée dans tous les cas.

``` text
GET
/api/v2/list/mytable?columns=name
```

**Réponse**

- `count`

    > Nombre total d'entrées.

- `list`

    > Chaque élément du tableau contient les paramètres suivants.
    >
    > > - `id`
    > >
    > > > ID de l'entrée.
    > >
    > > - La séquence des colonnes de requête.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": "10"
    "list": [{ 
        "id": "1",
        "name": "John",
    }, 
    { 
        "id": "2",
        "name": "Mark",
   }, 
    ]
} 
```

### sections\[?limit=\... &offset=\... &lang=\] {#sections-limit-offset-lang}

[Authorization](#authorization)

**GET**/ Retourne une liste d'entrées dans la table *sections* de l'écosystème actuel, avec la possibilité de définir un décalage et un nombre d'entrées.

Si le champ *role_access* contient une liste de rôles et n'inclut pas le rôle actuel, aucun enregistrement ne sera renvoyé. Les données dans le champ *title* seront remplacées par la ressource linguistique spécifiée dans l'en-tête de la requête *Accept-Language*.

**Demande**

- `limit` [Omitempty](#omitempty)

    > Nombre d'entrées, par défaut 25 entrées.

- `offset` [Omitempty](#omitempty)

    > Décalage, par défaut est 0.

- `lang` [Omitempty](#omitempty)

    > Ce champ spécifie le code de ressource multilingue ou la localisation, par exemple, *en, de*. Si la ressource linguistique spécifiée n'est pas trouvée, par exemple, *en-US*, elle recherchera dans le groupe de ressources linguistiques *en*.

``` text
GET
/api/v2/sections
```

**Réponse**

- `count`

    > *sections* Nombre total d'entrées de table.

- `list`

    > Chaque élément du tableau contient des informations sur toutes les colonnes de la table des actions.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": "2"
    "list": [{
        "id": "1",
        "title": "Development",
       "urlpage": "develop",
       ...
    },
    ]
}
```

**Réponse d'erreur**

*E_TABLENOTFOUND*

### row/{name}/{id}\[?columns=\] {#row-name-id-columns}

[Authorization](#authorization)

**GET**/ Retourne l'entrée pour la table de données spécifiée dans l'écosystème actuel. Vous pouvez spécifier les colonnes à retourner.

**Demande**

- `name`

    > Nom de la table de données.

- `id`

    > Identifiant d'entrée.

- `columns` [Omitempty](#omitempty)

    > Une liste de colonnes demandées, séparées par des virgules. Si aucune colonne n'est spécifiée, toutes les colonnes seront renvoyées. La colonne "id" sera renvoyée dans tous les cas.

``` text
GET
/api/v2/row/mytable/10?columns=name
```

**Réponse**

- `value`

    > Tableau des valeurs de colonne reçues
    >
    > > - `id`
    > >
    > > > Identifiant d'entrée.
    > >
    > > - La séquence des colonnes de demande.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "values": {
    "id": "10",
    "name": "John",
    }
} 
```

**Réponse d'erreur**

*E_NOTFOUND*

### row/{name}/{column}/{id} {#row-name-colorn-id}

[Authorization] (#authorization)

**GET**/ Retournez à l'entrée du tableau de données spécifié dans l'écosystème actuel. Vous pouvez spécifier les colonnes à retourner.

**Demande**

- `Name`

     > Nom de la table de données.

- `colorn`

     > Liste des données de nom.

- `ID`

     > Identifiant Stripe.

- `columns` [omitempty] (#omitempty)

     > La liste des listes de demandes est séparée par des virgules. Si cela n'est pas spécifié, toutes les colonnes seront renvoyées. Dans tous les cas, la colonne ID sera renvoyée.

```text
GET
/api/v2/row/mytable/name/John?columns=name
```

**Réponse**

- `value`

     > Tableau des valeurs de colonnes de réception
     Prévision
     > - `ID`
     >>
     >>> Supprimer l'ID.
     >>
     > - -La séquence de la colonne de demande.

**Exemple de réponse**

```text
200 (OK)
Content-Type: application/json
{
    "values": {
    "id": "10",
    "name": "John",
    }
}   
```

**Réponse d'erreur**

*E_NOTFOUND*

### systemparams {#systemparams}

[Authorization](#authorization)

**GET**/ Renvoie une liste de paramètres de plateforme.

**Demande**

``` text
GET
/api/v2/systemparams/[?names=...]
```

- `names` [Omitempty](#omitempty)

    Une liste de paramètres de requête, séparés par des virgules. Par exemple:
        `/api/v2/systemparams/?names=max_columns,max_indexes`.

**Réponse**

- `list`

    > Chaque élément du tableau contient les paramètres suivants.
    >
    > > - `name`
    > >
    > > > Nom du paramètre.
    > >
    > > - `value`
    > >
    > > > Valeurs des paramètres.
    > >
    > > - `conditions`
    > >
    > > > Changer la permission du paramètre.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "list": [{ 
        "name": "max_columns",
        "value": "100",
        "conditions": "ContractAccess("@1UpdateSysParam")",
    }, 
    { 
        "name": "max_indexes",
        "value": "1",
        "conditions": "ContractAccess("@1UpdateSysParam")",
    }, 
    ]
} 
```

**Réponse d'erreur**

*E_PARAMNOTFOUND*

### history/{name}/{id} {#history-name-id}

[Authorization](#authorization)

**GET**/ Retourne l'enregistrement des modifications pour l'entrée dans la table de données spécifiée dans l'écosystème actuel.

**Demande**

``` text
GET
/api/v2/history?name=contracts&id=5
```

> - `name`
>
> Nom de la table de données.
>
> - `id`
>
> > Identifiant d'entrée.

**Réponse**

> - `list`
>
> Chaque élément du tableau contient un enregistrement de modification pour l'entrée demandée.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "list": [
        {
            "name": "default_page",
            "value": "P(class, Default Ecosystem Page)"
        },
        {
            "menu": "default_menu"
        }
    ]
}
```

### interface/{page|menu|snippet}/{name} {#interface-page-menu-snippet-name}

[Authorization](#authorization)

**GET**/ Renvoie les entrées du champ *name* dans la table de données spécifiée du système écologique (pages, menu ou snippet).

``` text
GET
/api/v2/interface/page/default_page
/api/v2/interface/menu/default_menu
/api/v2/interface/snippet/welcome
```

**Demande**

- `name`

    > Spécifiez le nom de l'entrée dans la table.

**Réponse**

- `id`

    > Identifiant d'entrée.

- `name`

    > Nom de l'entrée.

- `other`

    > Autres colonnes du tableau.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "id": "1",
    "name": "default_page",
    "value": "P(Page content)",
    "default_menu": "default_menu",
    "validate_count": 1
} 
```

**Réponse d'erreur**

*E_QUERY*, *E_NOTFOUND*

## Contract Function Interface {#contract-function-interface}

### contracts\[?limit=\... &offset=\... \] {#contracts-limit-offset}

[Authorization](#authorization)

**GET**/ Retourne une liste de contrats dans l'écosystème actuel, avec la possibilité de définir des décalages et le nombre d'entrées.

**Demande**

- `limit` [Omitempty](#omitempty)

    > Nombre d'entrées, par défaut 25 entrées.

- `offset` [Omitempty](#omitempty)

    > Décalage, la valeur par défaut est 0.

``` text
GET
/api/v2/contracts
```

**Réponse**

- `count`

    > Nombre total d'entrées.

- `list`

    > Chaque élément du tableau contient les paramètres suivants.
    >
    > > - `id`
    > >
    > > > ID du contrat.
    > >
    > > - `name`
    > >
    > > > Nom du contrat.
    > >
    > > - `value`
    > >
    > > > Contenu du contrat.
    > >
    > > - `wallet_id`
    > >
    > > > Adresse du compte auquel le contrat est lié.
    > >
    > > - `address`
    > >
    > > > Adresse du portefeuille lié au contrat `XXXX-... -XXXX`.
    > >
    > > - `ecosystem_id`
    > >
    > > > ID de l'écosystème auquel le contrat appartient.
    > >
    > > - `app_id`
    > >
    > > > ID de l'application auquel le contrat appartient.
    > >
    > > - `conditions`
    > >
    > > > Modifier la permission du contrat.
    > >
    > > - `token_id`
    > >
    > > > ID de l'écosystème où le pass est utilisé pour payer les frais du contrat.


**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "count": "10"
    "list": [{ 
        "id": "1",
        "name": "MainCondition",
        "token_id": "1", 
        "wallet_id": "0", 
        "value": "contract MainCondition {
                conditions {
                if(EcosysParam(`founder_account`)!=$key_id)
                {
                    warning `Sorry, you dont have access to this action.`
                }
                }
            }",
            "address":"0000-0000-0000-0000-0000",
            "conditions":"ContractConditions(`MainCondition`)"
        },
    ...
    ]
 }
 ```

### contract/{name} {#contract-name}

[Authorization](#authorization)

**GET**/ Renvoie des informations sur le contrat spécifié. Par défaut, la requête concerne le contrat dans l'écosystème actuel.

**Demande**

- `name`

    > Nom du contrat intelligent.

``` text
GET
/api/v2/contract/mycontract
```

**Réponse**

- `id`

    > ID du contrat dans la machine virtuelle.

- `name`

    > Nom du contrat avec l'ID de l'écosystème `@1MainCondition`.

- `state`

    > L'ID de l'écosystème du contrat.

- `walletid`

    > L'adresse du compte auquel le contrat est lié.

- `tokenid`

    > L'ID de l'écosystème du pass utilisé pour payer le contrat.

- `address`

    > Adresse du portefeuille lié au contrat `XXXX-... -XXXX`.

- `tableid`

    > ID de l'entrée dans la table *contracts* où se trouve le contrat.

- `fields`

    > Le tableau contient des informations structurelles pour chaque paramètre de la section **data** du contrat.
    >
    > > - `name`
    > >
    > > > Nom du paramètre.
    > >
    > > - `type`
    > >
    > > > Type de paramètre.
    > >
    > > - `optional`
    > >
    > > > Options du paramètre, \`true\` signifie que le paramètre est facultatif, \`false\` signifie que le paramètre est obligatoire.


**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "fields" : [
        {"name": "amount", "type": "int", "optional": false},
        {"name": "name", "type": "string", "optional": true}
    ],
    "id": 150,
    "name":"@1mycontract",
    "tableid" : 10,
} 
```

**Réponse d'erreur**

*E_CONTRACT*

### sendTX {#sendtx}

[Authorization](#authorization)

**POST**/
Reçoit les transactions dans les paramètres et les ajoute à la file d'attente des transactions, renvoyant un hachage de transaction si la requête est exécutée avec succès. Ce hachage permet d'obtenir la transaction correspondante dans le bloc et est inclus dans le message d'erreur en cas de réponse d'erreur.

**Demande**

- `tx_key`

    > Contenu de la transaction, ce paramètre peut spécifier n'importe quel nom et prend en charge la réception de plusieurs transactions.

``` text
POST
/api/v2/sendTx

Headers:
Content-Type: multipart/form-data

Parameters:
tx1 - Transaction 1
txN - Trading N
```

**Réponse**

- `hashes`

    > Tableau de hachages de transactions.
    >
    > > - `tx1`
    > >
    > > > Hachage de la transaction 1.
    > >
    > > - `txN`
    > >
    > > > Hachage de la transaction N.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "hashes": {
        "tx1": "67afbc435634..... ",
        "txN": "89ce4498eaf7..... ",
}
```

**Réponse d'erreur**

*E_LIMITTXSIZE*,*E_BANNED*

### txstatus {#txstatus}

[Authorization](#authorization)

**POST**/
Retourne l'ID du bloc et le message d'erreur pour le hachage de transaction spécifié. Si les valeurs de retour pour l'ID du bloc et le message d'erreur sont nulles, alors la transaction n'est pas encore contenue dans le bloc.

**Demande**

- `data`

    > Liste JSON des hachages de transaction.

``` text
{"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

``` text
POST
/api/v2/txstatus/
```

**Réponse**

- `results`

    > La clé de la transaction est le hash et les détails de la transaction sont la valeur dans le dictionnaire de données.
    >
    > `hash`
    >
    > > Hash de la transaction.
    > >
    > > - `blockid`
    > >
    > >     > Si la transaction est exécutée avec succès, l'ID du bloc sera renvoyé. Si la transaction échoue, le *blockid* sera [0]{.title-ref}.
    > >
    > > - `result`
    > >
    > >     > Renvoie le résultat de la transaction via la variable **\$result**.
    > >
    > > - `errmsg`
    > >
    > >     > Renvoie un message d'erreur si l'exécution de la transaction échoue.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{ "results":
  {
    "hash1": {
         "blockid": "3123",
         "result": "",
     },
     "hash2": {
          "blockid": "3124",
          "result": "",
     }
   }
 }
```

**Réponse d'erreur**

*E_HASHWRONG, E_HASHNOTFOUND*

### txinfo/{hash} {#txinfo-hash}

Cette demande ne nécessite pas d'autorisation de connexion.

**GET**/

Renvoie des informations sur la transaction pour le hachage spécifié, y compris l'ID du bloc et le nombre de confirmations. Renvoie également le nom du contrat et ses paramètres associés, si des paramètres optionnels sont spécifiés.

**Demande**

- `hash`

    > Hash de transaction.

- `contractinfo` [Omitempty](#omitempty)

    > Identifiant du paramètre de détails du contrat, pour obtenir les détails du contrat liés à cette transaction, veuillez spécifier `contractinfo=1`.

``` text
GET
/api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1
```

**Réponse**

- `blockid`

    > Si la valeur est `0`, alors aucune transaction n'a été trouvée pour ce hachage.

- `confirm`

    > Le nombre de confirmations pour ce bloc *blockid*.

- `data` [Omitempty](#omitempty)

    > Si `contentinfo=1` est spécifié, les détails du contrat sont renvoyés à ce paramètre.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "blockid": "9",
    "confirm": 11,
    "data": {
        "block": "9",
        "contract": "@1NewContract",
        "params": {
            "ApplicationId": 1,
            "Conditions": "true",
            "Value": "contract crashci4b {\n\t\t\tdata {}\n\t\t\t}"
        }
    }
}
```

**Réponse d'erreur**

*E_HASHWRONG*

### txinfoMultiple {#txinfomultiple}

Cette demande ne nécessite pas d'autorisation de connexion.

**GET**/ 

Retourne les informations liées à la transaction pour le hachage spécifié.

**Demande**

- `data`
    - `hashes`
    > Une liste de hachages de transactions.

- `contractinfo` [Omitempty](#omitempty)

    > Identifiant du paramètre de détails du contrat, pour obtenir les détails du contrat liés à cette transaction, veuillez spécifier `contractinfo=1`.

``` text
data: {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

``` text
GET
/api/v2/txinfoMultiple
```

**Réponse**

- `results`

    > La clé utilisée est le hachage de la transaction et le détail de la transaction est utilisé comme valeur dans le dictionnaire de données.
    >
    > > `hash`
    > >
    > > > Trading Hash. (Trading de hachage)
    > >
    > > > `blockid`
    > >
    > Si la valeur est `0`, alors aucune transaction n'a été trouvée pour ce hachage.
    > >
    > > > `confirm`
    > >
    > > > Nombre de reconnaissances pour ce bloc *blockid*.
    > >
    > > > `data`
    > >
    > > > Si `contentinfo=1` est spécifié, les détails du contrat sont renvoyés à ce paramètre.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{ "results":
  { 
    "hash1": {
         "blockid": "3123",
         "confirm": "5",
     },
     "hash2": {
          "blockid": "3124",
          "confirm": "3",
     }
   }
 }
```

**Réponse d'erreur**

*E_HASHWRONG*

### /page/validators_count/{name} {#page-validators-count-name}
Cette demande ne nécessite pas d'autorisation de connexion.

**GET**

Retourne le nombre de nœuds à valider pour la page spécifiée.

**Demande**

- `name`

    > Nom de la page avec l'ID de l'écosystème au format `@ecosystem_id%%nom_de_la_page%`, par exemple :
    >
    > `@1page_principale`.
    >
    > Si vous n'avez pas d'ID d'écosystème, recherchez par défaut dans la première page de l'écosystème.

``` text
GET
/api/v2/page/validators_count/@2page_name
```

**Réponse**

- `validate_count`

    > Spécifie le nombre de nœuds à valider pour la page.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

**Réponse d'erreur**

*E_NOTFOUND, E_SERVER*

### content/menu\|page/{name} {#content-menu-page-name}

[Authorization](#authorization)

**POST**

Retourne un arbre d'objets JSON de code pour la page ou le nom du menu spécifié, qui est le résultat du traitement par le moteur de template.

**Demande**

- `name`

    > Nom de la page ou du menu avec l'ID de l'écosystème au format `@ecosystem_id%%nom_de_la_page%`, par exemple :
    >
    > `@1page_principale`.
    >
    > Si aucun ID d'écosystème n'est inclus, recherchez par défaut la page ou le menu de l'écosystème actuel.

``` text
POST
/api/v2/content/page/default
```

**Réponse**

- `menu` || `title`

    > demande *content/page/\...* Le nom du menu auquel la page appartient lors de la demande.

- `menutree`

    > demande *content/page/\...* L'arborescence JSON de l'objet menu de la page lorsqu'elle est demandée.

- `title` --head pour le menu *content/menu/\...*

    > demande *content/menu/\...* Titre du menu lorsqu'il est demandé.

- `tree`

    > Arborescence JSON de la page ou du menu.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "tree": {"type":"......" , 
          "children": [
               {...} ,
               {...}
          ]
    },
} 
```

**Réponse d'erreur**

`E_NOTFOUND`

### content/source/{name} {#content-source-name}

[Authorization](#authorization)

**POST**

Retourne un arbre d'objets JSON codés pour le nom de page spécifié. N'exécute aucune fonction ni ne reçoit de données. L'arbre d'objets JSON retourné correspond au modèle de page et peut être utilisé dans le concepteur de page visuel. Si la page n'est pas trouvée, une erreur 404 est renvoyée.

**Demande**

- `name`

    > Nom de la page avec l'ID de l'écosystème au format `@ecosystem_id%%nom_de_la_page%`, par exemple :
    >
    > `@1page_principale`.
    >
    > Si aucun ID d'écosystème n'est inclus, recherchez par défaut la page éco actuelle.

**Réponse**

``` text
POST
/api/v2/content/source/default
```

- `tree`

    > Arbre d'objet JSON de la page.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "tree": {"type":"......" , 
          "children": [
               {...} ,
               {...}
          ]
    },
} 
```

**Réponse d'erreur**

*E_NOTFOUND, E_SERVER*

### content/hash/{name} {#content-hash-name}

**POST** 

Retourne un hachage SHA256 du nom de page spécifié, ou une erreur 404 si la page ne peut pas être trouvée.

Cette requête ne nécessite pas d'autorisation de connexion. Pour recevoir le hachage correct lors de l'envoi de demandes à d'autres nœuds, vous devez également passer les paramètres *ecosystem, keyID, roleID, isMobile*. Pour recevoir des pages d'autres écosystèmes, l'ID de l'écosystème doit être préfixé au nom de la page. Par exemple : `@2mapage`.

**Demande**


``` text
POST
/api/v2/content/hash/default
```
- `name`

    > Le nom de la page avec l'identifiant de l'écosystème.

- `ecosystem`

    > Identifiant de l'écosystème.

- `keyID`

    > Adresse du compte.

- `roleID`

    > Identifiant du rôle.


**Réponse**

- `hash`

    > Hachage hexadécimal.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
} 
```

**Réponse d'erreur**

*E_NOTFOUND, E_SERVER, E_HEAVYPAGE*

### content {#content}

**POST**

Renvoie le nombre d'objets JSON pour le code de la page à partir du paramètre **template**, si le paramètre optionnel **source** est spécifié comme `true ou 1`, alors cet arbre d'objets JSON ne réalise aucune fonction et ne reçoit pas de données.

Cet arbre d'objets JSON peut être utilisé dans le concepteur de pages visuelles.

Cette requête ne nécessite pas d'autorisation de connexion.

**Demande**

- `template`

    > Code de la page.

- `source`

    > Si `true or 1` est spécifié, l'arbre d'objets JSON n'exécute aucune fonction et reçoit des données.

``` text
POST
/api/v2/content
```

**Réponse**

- `tree`

    > Arbre d'objet JSON.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "tree": {"type":"......" , 
          "children": [
               {...} ,
               {...}
          ]
    },
} 
```

**Réponse d'erreur**

*E_NOTFOUND, E_SERVER*

### maxblockid {#maxblockid}

**GET**/ Retourne l'ID du bloc le plus élevé sur le nœud actuel.

Cette demande ne nécessite pas d'autorisation de connexion.

**Demande**

``` text
GET
/api/v2/maxblockid
```

**Réponse**

- `max_block_id`

    > Le plus haut identifiant de bloc sur le nœud actuel.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "max_block_id" : 341,
}
```

**Réponse d'erreur**

*E_NOTFOUND*

### block/{id} {#block-id}

**GET**/ Retourne des informations sur l'identifiant de bloc spécifié.

Cette demande ne nécessite pas d'autorisation de connexion.

**Demande**

- `id`

    > Identifiant de bloc.

``` text
POST
/api/v2/block/32
```

**Réponse**

- `hash`

    > Hash du bloc.

- `key_id`

    > L'adresse du compte qui a signé le bloc.

- `time`

    > Horodatage de génération du bloc.

- `tx_count`

    > Nombre total de transactions dans le bloc.

- `rollbacks_hash`

    > Hash de rollback du bloc.

- `node_position`

    > La position du bloc dans la liste des nœuds honorés.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "hash": "1x4S5s/zNUTopP2YK43SppEyvT2O4DW5OHSpQfp5Tek=",
    "key_id": -118432674655542910,
    "time": 1551145365,
    "tx_count": 3,
    "rollbacks_hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "node_position": 0,
} 
```

**Réponse d'erreur**

*E_NOTFOUND*

### avatar/{ecosystem}/{member} {#avatar-ecosystem-member}

**GET**/ Retourne l'avatar de l'utilisateur dans la table *member* (disponible sans connexion).

**Demande**

- `ecosystem`

    > Identifiant de l'écosystème.

- `member`

    > L'adresse du compte de l'utilisateur. (xxxx-... -xxxx)

``` text
GET
/api/v2/avatar/1/1234-2134-... -4321
```

**Réponse**

L'en-tête de requête *Content-Type* est le type d'image et les données de l'image sont renvoyées dans le corps de la réponse.

**Exemple de réponse**

``` text
200 (OK)
Content-Type: image/png  
```

**Réponse d'erreur**

*E_NOTFOUND* *E_SERVER*

### config/centrifugo {#config-centrifugo}

**GET**/ Retourne l'adresse hôte et le port de centrifugo.

Cette demande ne nécessite pas d'autorisation de connexion.

**Demande**

``` text
GET
/api/v2/config/centrifugo
```

**Réponse**

Format de résultat de réponse `http://adresse:port`, par exemple : `http://127.0.0.1:8100`.

**Réponse d'erreur**

*E_SERVER*

### updnotificator {#updnotificator}

**POST**/

(Mis au rebut)

Envoie tous les messages qui n'ont pas encore été envoyés au service de notification Centrifugo. Envoie uniquement les messages pour l'écosystème et les membres spécifiés.

Cette demande ne nécessite pas d'autorisation de connexion.

**Demande**

- `id`

    > Adresse du compte du membre.

- `ecosystem`

    > Identifiant de l'écosystème.

``` text
POST
/api/v2/updnotificator
```

**Exemple de réponse**

``` text
200 (OK)
Content-Type: application/json
{
    "result": true
} 
```

### Instructions spéciales {#special-instructions}

#### Omitempty {#omitempty}

Si le champ a un attribut omitempty, cela signifie que le champ est un paramètre facultatif.

#### Authorization {#authorization}

Si l'interface a une balise d'autorisation, cela signifie que cette interface nécessite une autorisation de connexion. Veuillez ajouter l'autorisation à l'en-tête de la requête. Voici un exemple :

key = Authorization
value = "Bearer + [login token](#login)"

``` text
Authorization Bearer eyJhbGciOiJI..... kBZgGIlPhfXNZJ73RiZtM
```
