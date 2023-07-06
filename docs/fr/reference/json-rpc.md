# Interface de programmation d'application JSON-RPC {#json-rpc-application-programming-interface}

Pour qu'une application logicielle puisse interagir avec la blockchain IBAX (récupérer des données de bloc ou envoyer des transactions au réseau), elle doit être connectée à un nœud du réseau IBAX.

En raison de la généralité et de l'extensibilité de l'interface API REST d'origine, celle-ci deviendra de plus en plus complexe avec de plus en plus d'interfaces et de clients différents. Nous réalisons l'importance de l'unification des interfaces pour garantir que tous les clients puissent utiliser le même ensemble de spécifications, indépendamment du nœud spécifique et de l'implémentation du client.

JSON-RPC est un protocole d'appel de procédure à distance (RPC) léger et sans état. Il définit un certain nombre de structures de données et leurs règles de traitement. Il est indépendant du transport, car ces concepts peuvent être utilisés dans le même processus, via une interface, un protocole de transfert hypertexte ou dans de nombreux environnements de messagerie différents. Il utilise JSON (RFC 4627) comme format de données.

JSON-RPC est compatible avec la plupart des interfaces API REST, en conservant l'interface API REST d'origine, le client utilisant l'interface API REST peut facilement passer à l'interface JSON-RPC, une partie de l'interface :

- [/data/{id}/data/{hash}](api2.md#data-id-data-hash)
- [/data/{table}/id/{column}/{hash}](api2.md#data-table-id-column-hash)
- [avatar/{ecosystem}/{member}](api2.md#avatar-ecosystem-member) 

Disponible via l'interface de l'API REST.

## Client-side implementation {#client-side-implementation}

Chaque client peut utiliser un langage de programmation différent lors de la mise en œuvre de la spécification JSON-RPC, et vous pouvez utiliser le [GO-SDK](https://github.com/IBAX-io/go-ibax-sdk).


## Exemple de Curl {#curl-example}

Les exemples suivants montrent comment utiliser l'API JSON RPC en effectuant des requêtes curl vers les nœuds IBAX. Chaque exemple comprend une description de l'endpoint spécifique, de ses paramètres, du type de retour et un exemple fonctionnel de son utilisation.

Les requêtes curl peuvent renvoyer un message d'erreur lié au type de contenu. Cela est dû à l'option --data qui définit le type de contenu sur application/x-www-form-urlencoded. Si votre requête rencontre ce problème, définissez manuellement l'en-tête en ajoutant -H "Content-Type: application/json" au début de l'appel. Ces exemples n'incluent pas non plus l'URL/protocole Internet et la combinaison de port qui doivent être le dernier paramètre de la commande curl (par exemple, 127.0.0.1:7079). Une requête curl complète avec ces données supplémentaires aurait la forme suivante :

``` text
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.maxBlockId","params":[],"id":1}' http://127.0.0.1:7079 
```

## Alliance {#covenant}

### Hex {#hex}
**Code hexadécimal**

Lors de l'encodage des tableaux de bytes, des hachages et des tableaux de bytecode : l'encodage est en hexadécimal, avec deux chiffres hexadécimaux par byte.

### Type de demande {#request-type}
**Utilisation uniforme**
- Content-Type: application/json

### Marqueurs spéciaux {#special-markers}
#### Omitempty {#omitempty}

Ce champ est un paramètre facultatif.

Si plusieurs champs "Omitempty" se suivent, mais que vous ne souhaitez passer que la valeur d'un certain champ, vous devez définir le champ indésirable sur null (la valeur null du type de champ), par exemple :

- **id** - *Number* - [Omitempty](#omitempty) id
- **name** - *String* - [Omitempty](#omitempty) Nom
- **column** - *String* - [Omitempty](#omitempty) Filtrer les noms de colonnes

Si seule la valeur du nom est transmise, alors les paramètres de la requête sont transmis comme suit:

`"params":[0, "testname"]` - *Number* La valeur nulle est 0.

Si seule la valeur de la colonne est transmise, alors les paramètres de la requête sont transmis comme suit: 

`"params":[0,"", "title,page"]` - *String* valeur vide pour ""



#### Authorization {#authorization}

En-tête d'autorisation, ajoutez l'autorisation à l'en-tête de la requête, exemple :

**name** : Authorization **value** : Bearer +[login token](#ibax-login)
 
Example:
```` text
    //request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ey...." -d '{"jsonrpc":"2.0","method":"ibax.getContractInfo","params":["@1TokensSend"],"id":1}' http://127.0.0.1:7079

````

#### AccountOrKeyId {#accountorkeyid}

Pour le paramètre d'adresse du compte, vous pouvez utiliser deux formats d'adresses, par exemple :

1. - *String* - Adresse du compte `"XXXX-XXXX-XXXX-XXXX-XXXX"` ou ID du compte `"64842...538120"` .538120"`

2. - *Object* - Objet d'adresse
    - **key_id** - *Number* - ID du compte, Exemple : `{"key_id":-64842...38120}`
    - **account** - *String* - Adresse du compte, Exemple : `{"account": "1196-...-...-...-3496"}`

    **L'ID du compte est préféré lorsque l'adresse du compte et l'ID du compte existent tous deux**.
    
#### BlockOrHash {#blockorhash}

Block height or block HASH, example:

1. - *String* - Hauteur du bloc `"100"` ou HASH du bloc `"4663aa47...a60753c18d9ba9cb4"`

2. - *Object* - Objet d'informations sur le bloc
        - **id** - *Number* - Hauteur du bloc, Exemple : `{"id":2}`
        - **hash** - *Chaîne en [hexadécimal](#hex)* - HASH du bloc, Exemple : `{"hash": "d36b8996c...c616d3043a0d02a0f59"}`

        **La hauteur du bloc et le HASH du bloc ne peuvent être choisis qu'un seul**.


### Demandes groupées {#batch-requests}

Cette fonctionnalité peut être utilisée pour réduire la latence du réseau, en particulier lors de l'acquisition d'un grand nombre d'objets de données largement indépendants.

Voici un exemple d'obtention du bloc le plus élevé et du nombre total de transactions :

```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '[{"jsonrpc":"2.0","method":"ibax.getTxCount","id":1,"params":[]},{"jsonrpc":"2.0","method":"ibax.maxBlockId","id":2,"params":[]}]' http://127.0.0.1:7079

    //Response
    [
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": 149100
        },
        {
            "jsonrpc": "2.0",
            "id": 2,
            "result": 797
        }
    ]
```


### Gestion des réponses d'erreur {#error-response-handling}

Renvoie le statut `200` en cas d'exécution réussie de la requête.

En cas d'erreur, un objet JSON avec les champs suivants sera renvoyé :

- jsonrpc

    Identifiant d'erreur.

- id

    Message texte d'erreur.

- error
    - code

        Code de statut de réponse.
    - message

        Description du statut de réponse.

``` text
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32014,
        "message": "Unauthorized"
    }
}
```


## JSON-RPC Namespaces {#json-rpc-namespaces}

 ### ibax Namespace {#ibax-namespace}

#### Interface d'authentification {#authentication-interface}
- [ibax.getuid](#ibax-getuid)
- [ibax.login](#ibax-login)
- [ibax.getAuthStatus](#ibax-getauthstatus)

#### Interface de commande côté serveur {#server-side-command-interface}
- [ibax.getVersion](#ibax-getversion)

#### DInterface de fonction de demande ATA {#data-request-function-interface}
- [ibax.getBalance](#ibax-getbalance)
- [ibax.getBlocksTxInfo](#ibax-getblockstxinfo)
- [ibax.detailedBlocks](#ibax-detailedblocks)
- [ibax.getKeyInfo](#ibax-getkeyinfo)
- [ibax.detailedBlock](#ibax-detailedblock)

#### Obtenir l'interface des métriques {#get-metrics-interface}
- [ibax.maxBlockId](#ibax-maxblockid)
- [ibax.getKeysCount](#ibax-getkeyscount)
- [ibax.getTxCount](#ibax-gettxcount)
- [ibax.getTransactionCount](#ibax-gettransactioncount)
- [ibax.getBlocksCountByNode](#ibax-getblockscountbynode)
- [ibax.honorNodesCount](#ibax-honornodescount)
- [ibax.getEcosystemCount](#ibax-getecosystemcount)

#### Interface de l'écosystème {#ecosystem-interface}
- [ibax.ecosystemInfo](#ibax-ecosysteminfo)
- [ibax.appParams](#ibax-appparams)
- [ibax.getEcosystemParams](#ibax-getecosystemparams)
- [ibax.getTableCount](#ibax-gettablecount)
- [ibax.getTable](#ibax-gettable)
- [ibax.getList](#ibax-getlist)
- [ibax.getSections](#ibax-getsections)
- [ibax.getRow](#ibax-getrow)
- [ibax.systemParams](#ibax-systemparams)
- [ibax.history](#ibax-history)
- [ibax.getPageRow](#ibax-getpagerow)
- [ibax.getMenuRow](#ibax-getmenurow)
- [ibax.getSnippetRow](#ibax-getsnippetrow)
- [ibax.getAppContent](#ibax-getappcontent)
- [ibax.getMember](#ibax-getmember)

#### Interface de fonction de contrat {#contract-function-interface}
- [ibax.getContracts](#ibax-getcontracts)
- [ibax.getContractInfo](#ibax-getcontractinfo)
- [ibax.sendTx](#ibax-sendtx)
- [ibax.txStatus](#ibax-txstatus)
- [ibax.txInfo](#ibax-txinfo)
- [ibax.txInfoMultiple](#ibax-txinfomultiple)
- [ibax.getPageValidatorsCount](#ibax-getpagevalidatorscount)
- [ibax.getPage](#ibax-getpage)
- [ibax.getMenu](#ibax-getmenu)
- [ibax.getSource](#ibax-getsource)
- [ibax.getPageHash](#ibax-getpagehash)
- [ibax.getContent](#ibax-getcontent)
- [ibax.getBlockInfo](#ibax-getblockinfo)
- [ibax.getConfig](#ibax-getconfig)

### net Namespace {#net-namespace}
- [net.getNetwork](#net-getnetwork)
- [net.status](#net-status)

### rpc Namespace {#rpc-namespace}
- [rpc.modules](#rpc-modules)

### admin Namespace {#admin-namespace}
- [admin.startJsonRpc](#admin-startjsonrpc)
- [admin.stopJsonRpc](#admin-stopjsonrpc)


### debug Namespace {#debug-namespace}
- [debug.getNodeBanStat](#debug-getnodebanstat)
- [debug.getMemStat](#debug-getmemstat)
 


## Méthodes de l'interface JSON-RPC {#json-rpc-interface-methods}

### **ibax.getUid** {#ibax-getuid}

[Authorization](#authorization) [Omitempty](#omitempty)

Générer un jeton JWT temporaire, qui doit être passé à [**Authorization**](#authorization) lors de l'appel à **[login](#ibax-login)**.

**Paramètres**
- Aucun

**Valeur de retour**
- **uid** - *String* - Le numéro de signature.

- **token** - *String* - Jeton temporaire transmis lors de la connexion (le jeton temporaire a une durée de vie de 5 secondes).

- **network_id** - *String* - L'identifiant du réseau.

- **cryptoer** - *String* - Algorithme de courbe elliptique.

- **hasher** - *String* - Algorithme de hachage.

Dans le cas où aucune autorisation n'est requise (la requête contient [Authorization](#authorization)), le message suivant sera renvoyé.

- **expire** - *String* - Heure d'expiration.

- **ecosystem** - *String* - ID de l'écosystème.

- **key_id** - *String* - L'adresse du compte.

- **address** - *String* - Adresse du portefeuille `XXXX-XXXXXX-XXXX-XXXX-XXXX`.

- **network_id** - *String* - L'identifiant du réseau.


**Exemple**
```text
    //Request1
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getUid","params":[],"id":1}' http://127.0.0.1:7079

    //Response1
     {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "uid": "5823391950439015186",
            "token": "ey....",
            "network_id": "1",
            "cryptoer": "ECC_Secp256k1",
            "hasher": "KECCAK256"
        }
    }

    //Request2
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ey...." -d '{"jsonrpc":"2.0","method":"ibax.getUid","params":[],"id":1}' http://127.0.0.1:7079

    //Response2
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "expire": "7h59m49.5361126s",
            "ecosystem_id": "1",
            "key_id": "6667782293976713160",
            "address": "0666-7782-2939-7671-3160",
            "network_id": "1",
            "cryptoer": "ECC_Secp256k1",
            "hasher": "KECCAK256"
        }
    }
```

### **ibax.login** {#ibax-login}
Authentification de l'utilisateur.

[Authorization](#authorization)

La commande [**ibax.getUid**](#ibax-getuid) doit être appelée en premier pour recevoir la valeur unique et la signer.

Le jeton JWT temporaire pour getuid doit être passé dans l'en-tête de la requête.

Si la requête est réussie, le jeton reçu dans la réponse est contenu dans [**Authorization**](#authorization).

**Paramètres**

*Object* - Objet d'appel d'authentification

- **ecosystem_id** - *Number* - ID de l'écosystème. Si non spécifié, la valeur par défaut est le premier ID d'écosystème.

- **expire** - *Number* - Durée de vie du jeton JWT en secondes, par défaut 28800, soit 8 heures.

- **public_key** - *[Hex](#hex) String* - Clé publique du compte au format hexadécimal.

- **key_id** - *String* -
    > Adresse du compte `XXXX-... -XXXX`.
    >
    > Utilisez ce paramètre si la clé publique est déjà stockée dans la blockchain. Il ne peut pas être utilisé avec les
    > paramètres *pubkey* lorsque ceux-ci sont utilisés ensemble.

- **signature** - *String* -

    Utilisez la clé privée pour signer le UID reçu par la méthode getuid. 

    Contenu des données de signature : LOGIN+{$network_id}+uid

- **role_id** - *Number* - ID du rôle, rôle par défaut 0.


**Valeur de retour**
*Object* - Objet d'authentification

- **token** - *String* - Jeton JWT.

- **ecosystem_id** - *String* - ID de l'écosystème.

- **key_id** - *String* - ID de l'adresse du compte.

- **account** - *String* - Adresse du portefeuille `XXXX-XXXXXX-XXXX-XXXX-XXXX`.

- **notify_key** - *String* - ID de notification.

- **isnode** - *Bool* - Indique si l'adresse du compte est le propriétaire du nœud. Valeurs : `true,false`.

- **isowner** - *Bool* - Indique si l'adresse du compte est le créateur de cet écosystème. Valeurs : `true,false`.

- **clb** - *Bool* - Indique si l'écosystème connecté est un CLB. Valeurs : `true,false`.

- **timestamp** - *String* - Horodatage actuel.

- **roles** - *Array* - Liste des rôles, si aucun rôle n'est disponible, le champ est nul.
    - **role_id** - *Number* - ID du rôle.
    - **role_name** - *String* - Nom du rôle.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.login","params":[{"ecosystem_id":1,"public_key":"04....","signature","46...","role_id":0}],"id":1}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "token": "ey...",
            "ecosystem_id": "1",
            "key_id": "6660819716178795186",
            "account": "0666-xxxx-xxxx-xxxx-5186",
            "notify_key": "ey....",
            "isnode": false,
            "isowner": false,
            "clb": false,
            "timestamp": "1678336163",
            "roles": nil //[{"role_id": 1, "role_name": "Developer"},{"role_id": 2, "role_name": "DevelopGovernancerer"}]
        }
    }
```

### **ibax.getAuthStatus** {#ibax-getauthstatus}
Statut d'authentification de l'utilisateur.

[Authorization](#authorization)

**Paramètres**
- Aucun

**Valeur de retour**
*Object* - Objet de statut d'authentification
- **active** - *Bool* - Le statut actuel d'authentification de l'utilisateur. Valeurs : `true,false`.

- **exp** - *Number* - [Omitempty](#omitempty) Horodatage de la limite de validité du jeton.
 
**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getAuthStatus","id":1}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "active": true,
            "exp": 1678354136
        }
    }
```

### **ibax.getVersion** {#ibax-getversion}
Retourne la version actuelle du serveur.

**Paramètres** 
- Aucun

**Valeur de retour**
- **vesion** - *String* - numéro de version (`big Version` + `branch name` + `git commit` + `time` + `node status`)

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getVersion","id":1}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": "1.3.0 branch.main commit.b57d4194 time.2023-03-08-09:30:29(UTC) node server status is running"
    }
```

### **ibax.getBalance** {#ibax-getbalance}
Obtenez le solde de l'adresse du compte.
 
**Paramètres**

- **key_id or account** - [*AccountOrKeyId*](#accountorkeyid) - adresse du compte `XXXX-XXXX-XXXX-XXXX-XXXX` ou ID du compte

- **ecosystem_id** - *Number* - ID de l'écosystème [Omitempty](#omitempty) Par défaut, 1

**Valeur de retour**
*Object* - Objet d'obtention du solde

- **amount** - *String* - la plus petite unité de solde du compte de contrat.

- **total** - *String* - solde total du compte d'unité minimale (amount + utxo).

- **utxo** - *String* - solde du compte UTXO d'unité minimale.

- **digits** - *Number* - Précision

- **token_symbol** - *String* - Symboles de jeton

**Exemple**
```text
    //Request1
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBalance","id":1,"params":["648...8120"]}' http://127.0.0.1:7079

    //Request2
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBalance","id":1,"params":["1196-...-...-...-3496",1]}' http://127.0.0.1:7079

    //Request3
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBalance","id":1,"params":[{"key_id":{$key_id}},1]}' http://127.0.0.1:7079 //keyId or account

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "amount": "9915319240441612",
            "digits": 12,
            "total": "9915319240441612",
            "utxo": "0",
            "token_symbol": "IBXC"
        }
    }
```


### **ibax.getBlocksTxInfo** {#ibax-getblockstxinfo}

Retourne une liste contenant des informations supplémentaires sur les transactions dans chaque bloc.

**Paramètres**

- **block_id** - *Number* - la hauteur du bloc de départ à interroger

- **count** - *Number* - nombre de blocs, par défaut est 25, la demande maximale est de 100

**Valeur de retour**
*Object* - Obtenez l'objet d'information de bloc.

- **block_id** - *String* - hauteur de bloc
- Liste des transactions dans le bloc et informations supplémentaires pour chaque transaction:

    - **hash** - *[Hex](#hex) String* - Le hash de transaction.

    - **contract_name** - *String* - Le nom du contrat.

    - **params** - *Object* - Les paramètres du contrat, les champs du contrat peuvent être interrogés via [ibax.getContractInfo](#ibax-getcontractinfo).

    - **key_id** - *Number* -

        Pour le premier bloc, il s'agit de l'adresse du compte du premier bloc qui a signé la transaction.

        Pour tous les autres blocs, il s'agit de l'adresse du compte qui a signé la transaction.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBlocksTxInfo","id":1,"params":[1,2]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "1": [ //block_id
                {
                    "hash": "uXSaSrMWlbHpNlu049J5BDypC6MzBQ0/5VEfGQf+5aQ=",
                    "contract_name": "",
                    "params": null,
                    "key_id": 6667782293976713160
                }
            ],
            "2": [ //block_id
                {
                    "hash": "r8U9IKjtZ5Be5D4ak3zxLlDwn36CTdfIAsVvQhx7P3w=",
                    "contract_name": "@1NewUser",
                    "params": {
                        "Ecosystem": 1,
                        "NewPubkey": "d11ea197fe23152562c6f54c46335d9093f245ab5d22b13ff3e0e2132dc9ff38da77aa093945280c4cf5ad9e889c074dfd9080099982d8b2d4d100315e1cebc7"
                    },
                    "key_id": 6667782293976713160
                }
            ]
        }
    }
```


### **ibax.detailedBlocks** {#ibax-detailedblocks}

Retourne une liste contenant des informations détaillées supplémentaires sur les transactions dans chaque bloc.

**Paramètres**
- **block_id** - *Number* - La hauteur du bloc de départ à interroger.

- **count** - *Number* - nombre de blocs, par défaut est 25, la demande maximale est de 100


**Valeur de retour**
*Object* - Obtenez l'objet des détails du bloc.

- **block_id** - *String* - hauteur du bloc
    - **header** - *Object* - en-tête du bloc. L'en-tête du bloc contient les champs suivants.
        - **block_id** - *Number* - la hauteur du bloc.
        - **time** - *Number* - horodatage de génération du bloc.
        - **key_id** - *Number* - l'adresse du compte qui a signé le bloc.
        - **node_position** - *Number* - la position du nœud qui a généré le bloc dans la liste des nœuds honorés.
        - **version** - *Number* - la version de la structure du bloc.
    - **hash** - *[Hex](#hex) String* - le hash du bloc.
    - **node_position** - *Number* - la position du nœud qui a généré le bloc dans la liste des nœuds honorés.
    - **key_id** - *Number* - l'adresse du compte qui a signé le bloc.
    - **time** - *Number* - horodatage de génération du bloc.
    - **tx_count** - *Number* - le nombre de transactions dans le bloc.
    - **size** - *String* - la taille du bloc.
    - **rollback_hash** - *[Hex](#hex) String* - le hash de retrait du bloc.
    - **merkle_root** - *[Hex](#hex) String* - l'arbre de Merkle pour cette transaction de bloc.
    - **bin_data** - *[Hex](#hex) String* - sérialisation de l'en-tête du bloc, de toutes les transactions dans le bloc, du hash du bloc précédent et de la clé privée du nœud qui a généré le bloc.
    -  **transactions** - *Object* - Transactions. Liste des transactions dans le bloc et des informations supplémentaires sur chaque transaction :
        - **hash** - *[Hex](#hex) String* - le hash de la transaction.
        - **contract_name** - *String* - le nom du contrat.
        - **params** - *Object* - les paramètres du contrat, les champs du contrat peuvent être interrogés via [ibax.getContractInfo](#ibax-getcontractinfo).
        - **key_id** - *Number* - l'adresse du compte qui a signé la transaction.
        - **time** - *Number* - horodatage de génération de la transaction (unité : ms).
        - **type** - *Number* - le type de la transaction.
        - **size** - *String* - la taille de la transaction.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlocks","id":1,"params":[1,2]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "1": { //block id
                "header": {
                    "block_id": 1,
                    "time": 1676512422,
                    "key_id": 6667782293976713160,
                    "node_position": 0,
                    "version": 3
                },
                "hash": "0d7d51b4c14bacbf45d812f73497ede8f22d678bc4be6e6848193f3b7262ac91",
                "node_position": 0,
                "key_id": 6667782293976713160,
                "time": 1676512422,
                "tx_count": 1,
                "size": "660.00B",
                "rollbacks_hash": "1a829923f2c9b1e259fdfb42cc1bc255e144dbfb352af7e072d0b9d61a94df15",
                "merkle_root": "36373332663064383331353264316333653639346431656436383734373634363463616363616564636632353232646335633736643066623737343931366363",
                "bin_data": "Cp4BCAEQppm...",
                "stop_count": 0,
                "transactions": [
                    {
                        "hash": "b9749a4ab31695b1e9365bb4e3d279043ca90ba333050d3fe5511f1907fee5a4",
                        "contract_name": "",
                        "params": null,
                        "key_id": 6667782293976713160,
                        "time": 1676512422406,
                        "type": 1,
                        "size": "250.00B"
                    }
                ]
            },
            "2": { //block id
                "header": {
                    "block_id": 2,
                    "time": 1676536235,
                    "key_id": 6667782293976713160,
                    "node_position": 0,
                    "version": 3
                },
                "hash": "dd13a30661d35e01df82027a6e6607eb47ee00765d69767dbb99e151676c2c96",
                "node_position": 0,
                "key_id": 6667782293976713160,
                "time": 1676536235,
                "tx_count": 1,
                "size": "1.53KiB",
                "rollbacks_hash": "9041312d69e6bcd37c91a2bfa066abaeb53b8398708937a618a89960bfadab3d",
                "merkle_root": "65366537383931353662613230356565396466353061316538656538643636323332316636616265623764633539616166346635343030383135386538643130",
                "bin_data": "Cp4BCAIQq9O...",
                "stop_count": 0,
                "transactions": [
                    {
                        "hash": "afc53d20a8ed67905ee43e1a937cf12e50f09f7e824dd7c802c56f421c7b3f7c",
                        "contract_name": "@1NewUser",
                        "params": {
                            "Ecosystem": 1,
                            "NewPubkey": "d11ea197fe23152562c6f54c46335d9093f245ab5d22b13ff3e0e2132dc9ff38da77aa093945280c4cf5ad9e889c074dfd9080099982d8b2d4d100315e1cebc7"
                        },
                        "key_id": 6667782293976713160,
                        "time": 1676536233945,
                        "type": 3,
                        "size": "390.00B"
                    }
                ]
            }
        }
    }
```


### **ibax.getKeyInfo** {#ibax-getkeyinfo}
Retourne une liste d'écosystèmes avec les rôles qui sont enregistrés à l'adresse spécifiée.

**Paramètres**
- **account** - *String* - Adresse du compte

**Valeur de retour**
*Object* - Précisez l'adresse de l'objet eco-list.
- **account** - *String* - Adresse du compte
- **ecosystems** - *Array* - Liste des écosystèmes
    - **ecosystem** - *String* - Identifiant de l'écosystème
    - **name** - *String* - Nom de l'écosystème
    - **digits** - *Number* - Précision
    - **roles** - *Array* - Liste des rôles
        - **id** - *String* - Identifiant du rôle
        - **name** - *String* - Nom du personnage
 

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getKeyInfo","id":1,"params":["0666-XXXX-XXXX-XXXX-5186"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "account": "0666-XXXX-XXXX-XXXX-5186",
            "ecosystems": [
                {
                    "ecosystem": "1",
                    "name": "platform ecosystem",
                    "digits": 12,
                    "roles": [
                        {
                            "id": "1",
                            "name": "Developer"
                        },
                        {
                            "id": "2",
                            "name": "Governancer"
                        }
                    ]
                }
            ]
        }
    }
```
 
### **ibax.detailedBlock** {#ibax-detailedblock}
Retourne une liste détaillée d'informations supplémentaires sur les transactions dans le bloc.

**Paramètres**
- **Block or Hash** - *[BlockOrHash](#blockorhash)* - Hauteur de bloc ou hachage de bloc

**Valeur de retour**
*Object* - Obtenez l'objet de détails de bloc.
- **header** - *Object* - En-tête de bloc. L'en-tête de bloc contient les champs suivants.
    - **block_id** - *Number* - Hauteur du bloc.
    - **time** - *Number* - Horodatage de génération du bloc.
    - **key_id** - *Number* - Adresse du compte qui a signé le bloc.
    - **node_position** - *Number* - Position du nœud qui a généré le bloc dans la liste des nœuds honorables.
    - **version** - *Number* - Version de la structure du bloc.

- **hash** - *[Hex](#hex) String* - Hash du bloc.
- **node_position** - *Number* - Position du nœud qui a généré le bloc dans la liste des nœuds honorables.
- **key_id** - *Number* - Adresse du compte qui a signé le bloc.
- **time** - *Number* - Horodatage de génération du bloc.
- **tx_count** - *Number* - Nombre de transactions dans le bloc.
- **size** - *String* - Taille du bloc.
- **rollback_hash** - *[Hex](#hex) String* - Hash de retour en arrière du bloc.
- **merkle_root** - *[Hex](#hex) String* - Arbre de Merkle pour cette transaction de bloc.
- **bin_data** - *[Hex](#hex) String* - Sérialisation de l'en-tête du bloc, de toutes les transactions dans le bloc, du hash précédent du bloc et de la clé privée du nœud qui a généré le bloc.
- **transactions** - *Array* - Liste des transactions dans le bloc et des informations supplémentaires sur chaque transaction :
    - **hash** - *[Hex](#hex) String* - Hash de la transaction.
    - **contract_name** - *String* - Nom du contrat.
    - **params** - *Object* - Paramètres du contrat. Les champs du contrat peuvent être consultés via [ibax.getContractInfo](#ibax-getcontractinfo).
    - **key_id** - *Number* - Adresse du compte qui a signé la transaction.
    - **time** - *Number* - Horodatage de génération de la transaction (unité : ms).
    - **type** - *Number* - Type de la transaction.
    - **size** - *String* - Taille de la transaction.

**Exemple**
```text
    //Request1
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlock","id":1,"params":["1"]}' http://127.0.0.1:7079

    //Request2
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlock","id":1,"params":["0d7d51b4c14bacbf45d812f7349...e6e6848193f3b7262ac91"]}' http://127.0.0.1:7079

    //Request3
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlock","id":1,"params":[{"id":1}]}' http://127.0.0.1:7079


    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "header": {
                "block_id": 1,
                "time": 1676512422,
                "key_id": 6667782293976713160,
                "node_position": 0,
                "version": 3
            },
            "hash": "0d7d51b4c14bacbf45d812f7349...e6e6848193f3b7262ac91",
            "node_position": 0,
            "key_id": 6667782293976713160,
            "time": 1676512422,
            "tx_count": 1,
            "size": "660.00B",
            "rollbacks_hash": "1a829923f2c9b1e259fdfb42cc1bc255e144dbfb352af7e072d0b9d61a94df15",
            "merkle_root": "3637333266306438333135...623737343931366363",
            "bin_data": "Cp4BCAEQppm2nwYgyI/8gLSVrsRcMkAFGTK6nxD86hfhgQX0dWzO8aYZExDN9UPm8sKkqeUbwrNliYuCJHvvdX+txINnM7+gDqtMF/1K43kc0gYC0u8uOiANfVG0wUusv0XYEvc0l+3o8i1ni8S+bmhIGT87cmKskUIgBEhSsqZwreVAfnj7KGPFHen8uWVCoHGG/jrtpruKEW1IA1ABYAESRDogQBBdW8EBBcF/1yuTqPczaeLubu5NRxS3v3vzwvFW5gFCIARIUrKmcK3lQH54+yhjxR3p/LllQqBxhv467aa7ihFtGkA2NzMyZjBkODMxNTJkMWMzZTY5NGQxZWQ2ODc0NzY0NjRjYWNjYWVkY2YyNTIyZGM1Yzc2ZDBmYjc3NDkxNmNjKugCeJxibFvmk5+enlp0YK1LUkhRYl5xYnJJZn7egSUuiSWJ7Uu9Uys9XS7HdOxY7SDPfmJJSGZu6mUGBgaG5Lc9y1YGlCblZCZ7p1YecejvOPzyp63tWeYpWS+nxBTv3biTOUTqg7vfgedPuXdbnjsmYX49a9mXA025NT4TbjQ65bQwbloQcjbQRG3ZudjjUxuL1/rlp6QimTfLcZNH0o/bie/SfiskTNm1tPrfmrrlbdfMklamXHR53XpxwSODSb1hX3Kvyb1fU+awbZVG8yaXmGqtO3wR8jPsP6y7vTW4JL/AL7WkPL8o2zm1qMSpNC8lJ/XAkpDU4hKwBxgYGBg3BhRlliWWpDrl5CdnJ2ckZuadh0oxrAT5tLgkMbfgMgMDY1v42yy2ZSEVHonFGUcUdpbM8tosNnXjS7PoLY8vVbLYrORebMzKa/80UF6S/d/TJcsDEitz8hNTjvwaueEHCAAA//+pZRGv",
            "stop_count": 0,
            "transactions": [
                {
                    "hash": "b9749a4ab31695b1e9365bb4e3d279043ca90ba333050d3fe5511f1907fee5a4",
                    "contract_name": "",
                    "params": null,
                    "key_id": 6667782293976713160,
                    "time": 1676512422406,
                    "type": 1,
                    "size": "250.00B"
                }
            ]
        }
    }
```

### **ibax.maxBlockId** {#ibax-maxblockid}
Obtenez l'ID du bloc le plus élevé sur le nœud actuel.

**Paramètres** 
- Aucun

**Valeur de retour**
- **Block Id** - *Number* - Le bloc le plus élevé sur le nœud actuel

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.maxBlockId","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 774
    }
```


### **ibax.getKeysCount** {#ibax-getkeyscount}
Obtenez le nombre total d'adresses sur le nœud actuel.

**Paramètres** 
- Aucun

**Valeur de retour**
- **Count** - *Number* - Nombre total d'adresses

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getKeysCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 11
    }
```


### **ibax.getTxCount** {#ibax-gettxcount}
Obtenez le nombre total de transactions dans le nœud actuel.

**Paramètres** 
- Aucun

**Valeur de retour**
- **Count** - *Number* - Nombre total de transactions

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getTxCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 149068
    }
```


### **ibax.getTransactionCount** {#ibax-gettransactioncount}
Obtenez le nombre de transactions de bloc.

**Paramètres**
- **block or hash** - *[BlockOrHash](#blockorhash)* - hauteur de bloc ou hachage de bloc
 
**Valeur de retour**
- **Count** - *Number* - Nombre total de blocs

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getTransactionCount","id":1,"params":["efc386f7573269610a34af9cc722f775cca8183ccaa0ed7a96db61ef0bde6d1c"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 337
    }
```


### **ibax.getBlocksCountByNode** {#ibax-getblockscountbynode}
Obtenez le nombre de blocs d'emballage de localisation de nœuds.

**Paramètres**
- **nodePosition** - *Number* - nœud en indice

- **consensusMode** - *Number* - Mode de consensus, paramètres (1: Mode de gestion du créateur; 2: Mode de gouvernance DAO)

**Valeur de retour**
*Object* - Obtenez l'objet de numéro d'emballage de sous-script de nœud.
- **total_count** - *Number* - Nombre total de blocs

- **partial_count** - *Number* - Nombre de nœuds pour l'emballage de blocs en indice

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBlocksCountByNode","id":1,"params":[0,1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "total_count": 774,
            "partial_count": 774
        }
    }
```


### **ibax.honorNodesCount** {#ibax-honornodescount}
Obtenir le nombre de nœuds d'honneur

**Paramètres** 
- Aucun

**Valeur de retour**
- **Count** - *Number* - nombre de nœuds

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.honorNodesCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 1
    }
```


### **ibax.getEcosystemCount** {#ibax-getecosystemcount}
Nombre d'acquisitions d'écosystèmes

**Paramètres** 
- Aucun

**Valeur de retour**
- **Count** - *Number* - Numéro d'écosystème

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getEcosystemCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 2
    }
```




### **ibax.ecosystemInfo** {#ibax-ecosysteminfo}
Accès aux informations sur l'écosystème

**Paramètres**
- **ecosystem id** - *Number* - Identifiant de l'écosystème

**Valeur de retour**
- **id** - *Number* - ID de l'écosystème.
- **name** - *String* - Nom de l'écosystème.
- **digits** - *Number* - Précision.
- **token_symbol** - *String* - Symboles du jeton.
- **token_name** - *String* - Nom du jeton.
- **total_amount** - *String* - Nombre d'émissions (première émission ou `"0"` s'il n'y a pas eu d'émission).
- **is_withdraw** - *Bool* - Destructible (`true`: destructible, `false`: non destructible).
- **withdraw** - *String* - Montant de destruction (`"0"` s'il n'est pas destructible ou non détruit).
- **is_emission** - *Bool* - Incrémentable (`true`: incrémentable, `false`: non incrémentable).
- **emission** - *String* - Incrément (`"0"` s'il n'y a pas d'incrément disponible ou s'il n'y a pas d'incrément).
- **introduction** - *String* - Introduction à l'écosystème.
- **logo** - *Number* - ID du logo de l'écosystème (correspond à l'ID de la table binaire), disponible via l'API RESTful.
- **creator** - *String* - Créateur de l'écosystème.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.ecosystemInfo","id":1,"params":[1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 2,
        "result": {
            "id": 5,
            "name": "test name",
            "digits": 6,
            "token_symbol": "test",
            "token_name": "test Coin",
            "total_amount": "10000",
            "is_withdraw": true,
            "withdraw": "100000000000900000",
            "is_emission": true,
            "emission": "100000000001000000",
            "introduction": "this is a test introduction",
            "logo": 6,
            "creator": "0666-0819-7161-7879-5186"
        }
    }
```


### **ibax.appParams** {#ibax-appparams}
Retourne une liste de paramètres d'application dans l'écosystème actuel ou spécifié.

[Authorization](#authorization)

**Paramètres**
- **appid** - *Number* - l'identifiant de l'application.

- **ecosystem** - *Number* - [Omitempty](#omitempty) - ID de l'écosystème.
    
    Si non spécifié ou égal à 0, les paramètres de l'écosystème actuel seront renvoyés.

- **names** - *String* - [Omitempty](#omitempty) - Filtrer les noms de paramètres d'application.
    
    Une liste de noms séparés par des virgules, par exemple : `nom1, nom2`.

- **offset** - *Number* - [Omitempty](#omitempty) L'offset, par défaut est 0.

- **limit** - *Number* [Omitempty](#omitempty) Le nombre d'entrées, par défaut 100, maximum 100.
 
**Valeur de retour**

*Array* - Liste des paramètres d'application
- **app_id** - *Number* - ID de l'application.
- **list** - *Number* - Chaque élément du tableau contient les paramètres suivants :

    - **id** - *String* - ID du paramètre, unique ;
    - **name** - *String* - le nom du paramètre ;
    - **value** - *String* - la valeur du paramètre ;
    - **conditions** - *String* - autorisations pour modifier les paramètres.


**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.appParams","id":1,"params":[1,1,"role_developer,role_governancer"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "app_id": 1,
            "list": [
                {
                    "id": "4",
                    "name": "role_developer",
                    "value": "1",
                    "conditions": "ContractConditions(\"MainCondition\")"
                },
                {
                    "id": "5",
                    "name": "role_governancer",
                    "value": "2",
                    "conditions": "ContractConditions(\"MainCondition\")"
                }
            ]
        }
    }
```
 

### **ibax.getEcosystemParams** {#ibax-getecosystemparams}
Obtenez une liste des paramètres de l'écosystème.
 
[Authorization](#authorization)

**Paramètres**
- **ecosystem** - *Number* - [Omitempty](#omitempty) - Identifiant de l'écosystème

   Si 0 ou aucun tel paramètre, par défaut : ecid actuel.

- **names** - *String* - [Omitempty](#omitempty) - Le nom du paramètre de filtre.

    Liste de noms séparés par des virgules, par exemple : `nom1, nom2`

    Les paramètres *offset* et *limit* sont invalides lorsqu'il y a un paramètre de filtre.

- **offset** - *Number* - [Omitempty](#omitempty) Le décalage, par défaut est 0.

- **limit** - *Number* [Omitempty](#omitempty) Le nombre d'entrées, par défaut 100, maximum 100.


**Valeur de retour**
- **list** - *Array* - Chaque élément du tableau contient les paramètres suivants :
    - **id** - *String* - L'ID du paramètre, unique.
    - **name** - *String* - Le nom du paramètre.
    - **value** - *String* - La valeur du paramètre.
    - **conditions** - *String* - Autorisations pour modifier les paramètres.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getEcosystemParams","id":1,"params":[0,"changing_app_params,changing_language"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "list": [
                {
                    "id": "9",
                    "name": "changing_app_params",
                    "value": "ContractConditions(\"DeveloperCondition\")",
                    "conditions": "ContractConditions(\"DeveloperCondition\")"
                },
                {
                    "id": "4",
                    "name": "changing_language",
                    "value": "ContractConditions(\"DeveloperCondition\")",
                    "conditions": "ContractConditions(\"DeveloperCondition\")"
                }
            ]
        }
    }
```


### **ibax.getTableCount** {#ibax-gettablecount}
Retourne une liste de tables de données pour l'écosystème actuel.

Le décalage et le nombre d'entrées peuvent être définis.

[Authorization](#authorization)

**Paramètres**

- **offset** - *Number* - [Omitempty](#omitempty) Le décalage, par défaut 0.

- **limit** - *Number* [Omitempty](#omitempty) Le nombre d'entrées, par défaut 100, maximum 100.

**Valeur de retour**
- **count** - *Number* - Le nombre total de feuilles de la table de données de l'écosystème actuel.

- **list** - *Array* - Chaque élément du tableau contient les paramètres suivants :
    - **name** - *String* - Le nom de la table de données sans préfixe.
    - **count** - *String* - Le nombre d'entrées dans la table de données.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getTableCount","id":1,"params":[0,2]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 32,
            "list": [
                {
                    "name": "app_params",
                    "count": "41"
                },
                {
                    "name": "applications",
                    "count": "7"
                }
            ]
        }
    }
```
 

### **ibax.getTable** {#ibax-gettable}
Renvoie des informations sur la table de données de la demande actuelle de l'écosystème.

[Authorization](#authorization)

**Paramètres**
- **tableName** - *String* - Nom de la table de données.

**Valeur de retour**
- **name** - *String* - Le nom de la table de données.

- **insert** - *String* - Autorisation d'ajouter une entrée.

- **new_column** - *String* - Autorisation d'ajouter un nouveau champ.

- **update** - *String* - Autorisation de modifier une entrée.

- **app_id** - *String* - L'ID de l'application.

- **conditions** - *String* - Conditions pour modifier les autorisations.

- **columns** - *Array* - Tableau d'informations relatives aux champs de la table de données :
    - **name** - *String* - Le nom du champ.
    - **type** - *String* - Le type de données du champ.
    - **perm** - *String* - Autorisation de modifier la valeur de ce champ.
 
**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getTable","id":1,"params":["app_params"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "name": "app_params",
            "insert": "ContractConditions(\"DeveloperCondition\")",
            "new_column": "ContractConditions(\"@1MainCondition\")",
            "update": "ContractAccess(\"@1EditAppParam\")",
            "conditions": "ContractConditions(\"@1MainCondition\")",
            "app_id": "1",
            "columns": [
                {
                    "name": "value",
                    "type": "text",
                    "perm": "ContractAccess(\"@1EditAppParam\")"
                },
                {
                    "name": "app_id",
                    "type": "number",
                    "perm": "ContractAccess(\"@1ItemChangeAppId\")"
                },
                {
                    "name": "ecosystem",
                    "type": "number",
                    "perm": "false"
                },
                {
                    "name": "conditions",
                    "type": "text",
                    "perm": "ContractAccess(\"@1EditAppParam\")"
                },
                {
                    "name": "permissions",
                    "type": "json",
                    "perm": "ContractConditions(\"@1MainCondition\")"
                },
                {
                    "name": "name",
                    "type": "varchar",
                    "perm": "false"
                }
            ]
        }
    }
```


### **ibax.getList** {#ibax-getlist}

Retourne l'entrée de la table de données spécifiée.

Vous pouvez spécifier les colonnes à retourner.

Vous pouvez définir le décalage et le nombre d'entrées.

Vous pouvez définir les critères de requête.

Encodage hexadécimal des tables de données de type *BYTEA* (tableaux de bytes, hachages, tableaux de code bytes)

[Authorization](#authorization)

**Paramètres**
*Object* - Obtenez l'objet de la table de données.
- **name** - *String* - Le nom de la table de données.

- **limit** - *Number* - [Omitempty](#omitempty) Le nombre d'entrées, par défaut 25.

- **offset** - *Number* - [Omitempty](#omitempty) Le décalage, par défaut 0.

- **order** - *String* - [Omitempty](#omitempty) Trier par, par défaut id ASC.

- **columns** - *String* - [Omitempty](#omitempty) Une liste de colonnes demandées, séparées par des virgules. Si non spécifié, toutes les colonnes seront renvoyées.

    La colonne id sera renvoyée dans tous les cas.

- **where** - *Object* - [Omitempty](#omitempty) 

    Critères de requête

    Exemple : Si vous souhaitez interroger id>2 et name = john
 
    Vous pouvez utiliser `where:{"id":{"$gt":2}, "name":{"$eq": "john"}}`

    Pour plus de détails, veuillez vous référer à la syntaxe where de [DBFind](../topics/script.md#dbfind).


**Valeur de retour**
- **count** - *Number* - le nombre total d'entrées.
- **list** - *Array* - Chaque élément du tableau contient les paramètres suivants :

    - **id** - *String* - L'ID de l'entrée.
    - **...** - Autres colonnes de la table de données.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getList","id":1,"params":[{"name":"@1history","where":{"$and": [{"id":{"$gt": 2}}, {"id":{"$lt": 5}}]}}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 2,
            "list": [
                {
                    "amount": "1000000000000000000",
                    "block_id": "4",
                    "comment": "UTXO",
                    "created_at": "1676538080433",
                    "ecosystem": "1",
                    "id": "3",
                    "recipient_balance": "1000000000000000000",
                    "recipient_id": "666...160",
                    "sender_balance": "1000000000000000000",
                    "sender_id": "666...3160",
                    "status": "0",
                    "txhash": "2ac156c0ce55c10fd485cb9d59f50e3f9b269fb9bb69571d3c2eeae033d6c6cc",
                    "type": "24",
                    "value_detail": "NULL"
                }
            ]
        }
    }
``` 


### **ibax.getSections** {#ibax-getsections}

Revenir à l'onglet de la liste actuelle des entrées de table de l'écosystème, vous pouvez définir le décalage et le nombre d'entrées.

Si le champ *role_access* contient une liste de rôles et n'inclut pas le rôle actuel, aucun enregistrement ne sera renvoyé.

Les données dans le champ *title* seront remplacées par la ressource de langue *Accept-Language* dans l'en-tête de la requête.

[Authorization](#authorization) 

**Paramètres**

- *Object* - Obtenez l'objet de demande d'actions.
    - **limit** - *Number* - [Omitempty](#omitempty) - Le nombre d'entrées, par défaut 25 entrées.

    - **offset** - *Number* - [Omitempty](#omitempty) - Le décalage, par défaut est 0.

    - **lang** - *String* - [Omitempty](#omitempty) -

        Ce champ spécifie le code de ressource multilingue ou de localisation, par exemple *en, de*. Si la ressource multilingue spécifiée n'est pas trouvée, par exemple *en-US*, alors recherchez dans le groupe de ressources multilingues, **default**: **en**.

**Valeur de retour**

- **count** - *Number* - le nombre total d'entrées d'onglets.

- **list** - *Array* - Chaque élément du tableau contient des informations sur toutes les colonnes de la table des sections.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getSections","id":1,"params":[{"offset":0,"limit":2}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 2,
            "list": [
                {
                    "ecosystem": "1",
                    "id": "1",
                    "page": "default_page",
                    "roles_access": "[]",
                    "status": "2",
                    "title": "Home",
                    "urlname": "home"
                },
                {
                    "ecosystem": "1",
                    "id": "2",
                    "page": "developer_index",
                    "roles_access": "[]",
                    "status": "1",
                    "title": "Developer",
                    "urlname": "developer"
                }
            ]
        }
    }
```
 

### **ibax.getRow** {#ibax-getrow}
Renvoie les entrées de la table de données spécifiée dans l'écosystème actuel. Vous pouvez spécifier les colonnes à renvoyer.

[Authorization](#authorization)

**Paramètres**
- **tableName** - *String* - Le nom de la table de données.

- **id** - *Number* - l'ID de l'entrée.

- **columns** - *String* - [Omitempty](#omitempty)
 
    Une liste de colonnes demandées, séparées par des virgules. Si aucune colonne n'est spécifiée, toutes les colonnes seront renvoyées.

    Si vous ne filtrez pas, vous pouvez laisser un espace vide "".

    La colonne "id" sera renvoyée dans tous les cas.

- **whereColumn** - *String* - [Omitempty](#omitempty) - Trouver le nom de la colonne (seules les colonnes de type Nombre peuvent être trouvées)

**Valeur de retour**
- **value**- *Object* - objet qui reçoit les valeurs de colonne
    - **id** - *String* - L'ID de l'entrée.
    - **...** - La séquence des colonnes demandées.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getRow","id":1,"params":["@1history",4,"id,sender_id,recipient_id,amount,ecosystem,created_at","id"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "value": {
                "amount": "680388766240",
                "created_at": "1677222830899",
                "ecosystem": "1",
                "id": "296",
                "recipient_id": "6667782293976713160",
                "sender_id": "6660819716178795186"
            }
        }
    }
```


### **ibax.systemParams** {#ibax-systemparams}
Retourne la liste des paramètres de la plateforme.

[Authorization](#authorization)

**Paramètres**
- **names** - *String* [Omitempty](#omitempty) - Une liste de paramètres de requête, séparés par des virgules.

    Par exemple `names="name1,name2"`.

- **offset** - *Number* - [Omitempty](#omitempty) Le décalage, par défaut est 0.

- **limit** - *Number* [Omitempty](#omitempty) Le nombre d'entrées, par défaut 100, maximum 100.

**Valeur de retour**

- **list** - *Array* - Chaque élément du tableau contient les paramètres suivants:
    - **id** - *String* - Identifiant unique
    - **name** - *String* - Le nom du paramètre.
    - **value** - *String* - La valeur du paramètre.
    - **conditions** - *String* - Permissions pour modifier les paramètres.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.systemParams","id":1,"params":["gap_between_blocks,honor_nodes"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "list": [
                {
                    "id": "4",
                    "name": "gap_between_blocks",
                    "value": "2",
                    "conditions": "ContractAccess(\"@1UpdatePlatformParam\")"
                },
                {
                    "id": "6",
                    "name": "honor_nodes",
                    "value": "",
                    "conditions": "ContractAccess(\"@1UpdatePlatformParam\")"
                }
            ]
        }
    }
```


### **ibax.history** {#ibax-history}
Retourne les enregistrements modifiés des entrées de la table de données spécifiée dans l'écosystème actuel.

[Authorization](#authorization) 

**Paramètres**

- **nom** - *String* - Le nom de la table de données.
- **tableId** - *Number* - l'ID de l'entrée.

**Valeur de retour**
- **list** - *Array* - Chaque élément du tableau contient des enregistrements de modifications pour l'entrée demandée.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.history","id":1,"params":["contracts",1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "list": [
                {
                    "conditions": "ContractConditions(\"MainCondition\")",
                    "ecosystem": "1",
                    "value": "// This contract is used to set \"developer\" rights....."
                }
            ]
        }
    }
```


### **ibax.getPageRow** {#ibax-getpagerow}
Obtient l'entrée actuelle dans le champ de la table de données "ecosystempages".

[Authorization](#authorization)

**Paramètres**
- **name** - *String* - Spécifiez le nom de l'entrée dans la table.

**Valeur de retour**
- **id** - *Number* - l'ID de l'entrée.
- **name** - *String* - Le nom de l'entrée.
- **value** - *String* - Le contenu.
- **menu** - *String* - Répertoire.
- **nodesCount** - *Number* - le nombre de nœuds nécessaires à la validation de la page
- **app_id** - *Number* - Identifiant de l'application
- **conditions** - *String* - permissions pour modifier les paramètres

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getPageRow","id":1,"params":["default_page"]}' http://127.0.0.1:7079


    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 5,
            "name": "default_page",
            "value": "If(#account_id# == #guest_account#){\n    Include(@1apps_description)\n}.Else{\n    Include(@1profile)\n}",
            "menu": "default_menu",
            "nodesCount": 1,
            "app_id": 1,
            "conditions": "ContractConditions(\"@1DeveloperCondition\")"
        }
    }
```


### **ibax.getMenuRow** {#ibax-getmenurow}
Obtient l'entrée actuelle dans le champ de tableau de données du menu de l'écosystème.
 
[Authorization](#authorization)

**Paramètres**
- **name** - *String* - Spécifiez le nom de l'entrée dans la table.

**Valeur de retour**
- **id** - *Number* - l'ID de l'entrée.
- **name** - *String* - Le nom de l'entrée.
- **title** - *String* - Le titre.
- **value** - *String* - Le contenu.
- **conditions** - *String* - permissions pour modifier les paramètres.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getMenuRow","id":1,"params":["default_menu"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 2,
            "name": "default_menu",
            "title": "default",
            "value": "\nMenuItem.....",
            "conditions": "ContractConditions(\"@1DeveloperCondition\")"
        }
    }
```


### **ibax.getSnippetRow** {#ibax-getsnippetrow}
Obtient l'entrée actuelle dans le champ de la table de données de l'extrait de l'écosystème.

[Authorization](#authorization)

**Paramètres**
- **name** - *String* - Spécifiez le nom de l'entrée dans la table.

**Valeur de retour** 
- **id** - *Number* - l'ID de l'entrée.
- **name** - *String* - Le nom de l'entrée.
- **value** - *String* - Le contenu.
- **conditions** - *String* - permissions pour modifier les paramètres.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getSnippetRow","id":1,"params":["welcome"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 12,
            "name": "welcome",
            "value": "Div(content-wrapper)....",
            "conditions": "ContractConditions(\"@1DeveloperCondition\")"
        }
    }
```


### **ibax.getAppContent** {#ibax-getappcontent}
Obtenir des informations relatives à l'application (y compris la page, l'extrait, le menu) 

[Authorization](#authorization)

**Paramètres**
- **id** - *Number* - Identifiant de l'application

**Valeur de retour**
- **snippets** - *Array* - Tableau d'informations sur les extraits de code

    - **id** - *Number* - identifiant
    - **name** - *String* - Nom du code extrait

- **pages** - *Array* - Tableau d'informations de page

    - **id** - *Number* - identifiant
    - **name** - *String* - Nom de la page

- **contracts** - *Array* - un tableau d'informations sur les contrats

    - **id** - *Number* - identifiant
    - **name** - *String* - Nom du contrat

**Exemple**
```text
    //Request
    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "snippets": [ //if not app snippets is null array,example:[]
                {
                    "id": 2,
                    "name": "developer_link"
                },
                {
                    "id": 3,
                    "name": "export_info"
                }
            ],
            "pages": [  //if not app pages is null array,example:[]
                {
                    "id": 6,
                    "name": "menus_list"
                },
                {
                    "id": 7,
                    "name": "params_edit"
                }
            ],
            "contracts": [  //if not app contracts is null array,example:[]
                {
                    "id": 2,
                    "name": "MainCondition"
                },
                {
                    "id": 33,
                    "name": "NodeOwnerCondition"
                }
            ]
        }
    }
```


### **ibax.getMember** {#ibax-getmember}
Obtenir les informations des membres

**Paramètres**
- **account** - *String* - Informations sur le membre

- **ecosystemId** - *Number* - Identifiant de l'écosystème


**Valeur de retour**
- **id** - *Number* - identifiant du membre
- **member_name** - *String* - Nom
- **image_id** - *Number* - identifiant de l'avatar
- **member_info** - *String* - Introduction


**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}}" -d '{"jsonrpc":"2.0","method":"ibax.getMember","id":1,"params":["1497-2036-4953-3607-1121",1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 14,
            "member_name": "som",
            "image_id": 5,           
            "member_info": "{\"information\": \"Everything will be okay in the end. If it's not okay, it's not the end.\"}"
        }
    }
```

### **ibax.getContracts** {#ibax-getcontracts}
Obtenez la liste des contrats dans l'écosystème actuel, vous pouvez définir le décalage et le nombre d'entrées.

[Authorization](#authorization) 

**Paramètres**
- **offset** - *Number* - [Omitempty](#omitempty) Le décalage, par défaut est 0.
- **limit** - *Number* - [Omitempty](#omitempty) Le nombre d'entrées, par défaut 25.

**Valeur de retour**
- **count** - *Number* - Le nombre total d'entrées.

- **list** - *Array* - Chaque élément du tableau contient les paramètres suivants :
    - **id** - *String* - ID du contrat.
    - **name** - *String* - Le nom du contrat.
    - **value** - *String* - Le contenu du contrat.
    - **wallet_id** - *String* - L'adresse du compte auquel le contrat est lié.
    - **address** - *String* - L'adresse du portefeuille lié au contrat `XXXX-... -XXXX`.
    - **ecosystem_id** - *String* - L'ID de l'écosystème auquel le contrat appartient.
    - **app_id** - *String* - L'ID de l'application à laquelle le contrat appartient.
    - **conditions** - *String* - Modifier les autorisations du contrat.
    - **token_id** - *String* - L'ID de l'écosystème où le jeton est utilisé comme paiement pour le contrat.


**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getContracts","id":1,"params":[0,1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 293,
            "list": [
                {
                    "address": "0000-0000-0000-0000-0000",
                    "app_id": "1",
                    "conditions": "ContractConditions(\"@1DeveloperCondition\")",
                    "ecosystem_id": "1",
                    "id": "1",
                    "name": "DeveloperCondition",
                    "token_id": "1",
                    "value": "// This contract is used to ...",
                    "wallet_id": "0"
                }
            ]
        }
    }
```
 

### **ibax.getContractInfo** {#ibax-getcontractinfo}
Renvoie des informations sur le contrat spécifié.

[Authorization](#authorization)

**Paramètres**
- **contractName** - *String* - Le nom du contrat. Le format est `@ecosystem_id%%contractName%`, par exemple @1contractName (le nom du contrat eco1contract spécifié contractName) ou contractName (le nom du contrat eco-contract actuel contractName).

**Valeur de retour**

- **id** - *Number* - l'ID du contrat dans la VM.
- **name** - *String* - Nom du contrat avec l'ID d'écosystème `@1MainCondition`.
- **state** - *Number* - l'ID d'écosystème auquel le contrat appartient.
- **walletid** - *String* - l'adresse du compte auquel le contrat est lié.
- **tokenid** - *String* - l'ID d'écosystème du pass utilisé comme paiement pour le contrat.
- **address** - *String* - l'adresse du portefeuille lié au contrat `XXXX-... -XXXX`.
- **tableid** - *String* - ID de l'entrée dans la table *contracts* où se trouve le contrat.
- **fields** - *Array* - tableau contenant des informations structurelles pour chaque paramètre de la section **data** du contrat :
    - **name** - *String* - Le nom du paramètre.
    - **type** - *String* - Le type du paramètre.
    - **optional** - *Bool* - options du paramètre, `true` signifie que les paramètres sont optionnels, `false` signifie que les paramètres sont obligatoires.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getContractInfo","id":1,"params":["@1TokensSend"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 5098,
            "state": 1,
            "tableid": "98",
            "walletid": "0",
            "tokenid": "1",
            "address": "0000-0000-0000-0000-0000",
            "fields": [
                {
                    "name": "Amount",
                    "type": "money",
                    "optional": false
                },
                {
                    "name": "Recipient",
                    "type": "string",
                    "optional": true
                },
                {
                    "name": "iName",
                    "type": "string",
                    "optional": true
                },
                {
                    "name": "Comment",
                    "type": "string",
                    "optional": true
                },
                {
                    "name": "Ecosystem",
                    "type": "int",
                    "optional": true
                }
            ],
            "name": "@1TokensSend"
        }
    }
```
 

### **ibax.sendTx** {#ibax-sendtx}

Reçoit les transactions dans les paramètres et les ajoute à la file d'attente des transactions, renvoyant un hachage de transaction si la requête est exécutée avec succès. Ce hachage permet d'obtenir la transaction correspondante dans le bloc et est inclus dans le message d'erreur en cas de réponse erronée.

[Authorization](#authorization) 

**Paramètres**
- *Object* - Objet de données de transaction
    - **tx_key** - *String* - Le contenu de la transaction, ce paramètre peut spécifier n'importe quel nom et prend en charge la réception de plusieurs transactions.

**Valeur de retour**
- **hashes** - *Array* - Tableau de hachages de transactions:
    - **tx1** - *String* - Hachage de la transaction 1.
    - **txN** - *String* - Hachage de la transaction N.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.sendTx","id":1,"params":[{"tx1":...,"txN":...}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "hashes":[
                {"hash1":"hash1"},
                {"hashN":"hashN"}
            ]
        }
    }
```


### **ibax.txStatus** {#ibax-txstatus}

Obtient l'ID du bloc et le message d'erreur du hachage de transaction spécifié. Si la valeur de retour de l'ID du bloc et du message d'erreur est nulle, alors la transaction n'est pas encore contenue dans le bloc.
 
[Authorization](#authorization)

**Paramètres**
- **hashes** - *String* - Hachage de transaction, séparé par des virgules.

**Valeur de retour**
- **hash** - *Object* - Le hash de la transaction.
    - **blockid** - *String* - renvoie l'ID du bloc si la transaction a été exécutée avec succès ;

        Si l'exécution de la transaction échoue, *blockid* sera `0`, et l'ID de bloc correspondant sera renvoyé si l'erreur d'exécution de la transaction est pénalisée.

    - **result** - *String* - Renvoie le résultat de la transaction via la variable **\$result**.
    - **errmsg** - *Object* - [Omitempty](#omitempty) Renvoie un message d'erreur texte si l'exécution de la transaction a échoué.
        - **type** - *String* - Type d'erreur
        - **error** - *String* - Message d'erreur
    - **penalty** - *Number* - si l'exécution de la transaction échoue, (0 : pas de pénalité ; 1 : pénalité)

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.txStatus","id":1,"params":["cf46ef1ce7ecfcf48ccf209577fb8a2130426b71adc3a3855aff7f68d114fca9,4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 2,
        "result": {
            "4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b": {
                "blockid": "793",
                "result": "",
                "penalty": 0
            },
            "cf46ef1ce7ecfcf48ccf209577fb8a2130426b71adc3a3855aff7f68d114fca9": {
                "blockid": "793",
                "errmsg": {
                    "type": "warning",
                    "error": "platform ecosystem can not be burning Tokens"
                },
                "result": "",
                "penalty": 1
            }
        }
    }
```


### **ibax.txInfo** {#ibax-txinfo}

Renvoie des informations sur la transaction pour le hachage spécifié, y compris l'ID du bloc et le nombre de confirmations. Si des paramètres optionnels sont spécifiés, le nom du contrat et ses paramètres associés peuvent également être renvoyés.

**Paramètres**
- **hash** - *String* - Le hash de transaction.

- **contractinfo** - *Bool* [Omitempty](#omitempty) - Identifiant du paramètre de détail du contrat, obtenir les détails du contrat liés à cette transaction, la valeur par défaut est `false`.

**Valeur de retour**
- **blockid** - *Number* - L'ID du bloc contenant la transaction.
Si la valeur est `0`, aucune transaction n'est trouvée pour ce hachage.
Si la transaction s'est produite sur le nœud actuel, elle peut être obtenue via [ibax.txStatus](#ibax-txstatus).

- **confirm** - *Number* - Le nombre de confirmations de nœuds pour ce bloc *blockid*.

- **data** - *Object* - Renvoie les détails du contrat si `contentinfo=true` est spécifié. Null sinon.
    - **block_id** - *Number* - hauteur du bloc
    - **block_hash** - *String* - hash du bloc
    - **address** - *String* - adresse de création de la transaction
    - **ecosystem** - *String* - ecid d'envoi de la transaction
    - **hash** - *String* - hash de la transaction
    - **expedite** - *String* - frais accélérés, ou "" si non disponible
    - **contract_name** - *String* - Nom du contrat
    - **params** - *Object* - paramètres du contrat, les champs du contrat peuvent être interrogés via [ibax.getContractInfo](#ibax-getcontractinfo)
    - **created_at** - *Number* - quand la transaction a été créée
    - **size** - *String* - taille de la transaction unité: B;KiB;MiB;GiB;TiB
    - **status** - *String* - statut (0: succès ; 1: pénalité)
 

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.txInfo","id":1,"params":["020d8c004b3a0c00a6bfffa36e2746509295e5ea6dbb14e7cd6098c3d906bb58",true]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "blockid": "796",
            "confirm": 0,
            "data": {
                "block_id": 796,
                "block_hash": "bccbc3cf47b49bee5fb7321810884db49b73f5114b0a6fcd234dd3fdf9c22ef4",
                "address": "0666-7782-2939-7671-3160",
                "ecosystem": 2,
                "hash": "020d8c004b3a0c00a6bfffa36e2746509295e5ea6dbb14e7cd6098c3d906bb58",
                "expedite": "1",
                "contract_name": "@1TokensSend",
                "params": {
                    "Amount": "1000000000000",
                    "Recipient": "0666-7782-2939-7671-3160"
                },
                "created_at": 1678774455841,
                "size": "213.00B",
                "status": 1
            }
        }
    }
```


### **ibax.txInfoMultiple** {#ibax-txinfomultiple}
Retourne les informations liées aux transactions pour la liste de hachages spécifiée.

**Paramètres**
- **hashes** - *Array* - Une liste de hachages de transactions.
 
- **contractinfo** - *Bool* [Omitempty](#omitempty) - Identifiant du paramètre de détail du contrat, obtenir les détails du contrat liés à cette transaction, la valeur par défaut est `false`.

**Valeur de retour**
- **results** - *Array* - Dictionnaire de données avec la transaction hash comme clé et les détails de la transaction comme valeur.
    - **hash** - *String* - Le hash de la transaction.
        - **blockid** - *Number* - L'ID du bloc contenant la transaction. Si la valeur est `0`, cela signifie qu'aucune transaction n'a été trouvée pour ce hash.
        - **confirm** - *Number* - Le nombre de confirmations pour ce bloc *blockid*.
        - **data** - *Object* - Si `contentinfo=true` est spécifié, les détails du contrat sont renvoyés dans ce paramètre. Null sinon.
            - **block_id**- *Number* - Hauteur du bloc
            - **block_hash** - *String* - Hash du bloc
            - **address** - *String* - Adresse de création de la transaction
            - **ecosystem** - *String* - ECID d'envoi de la transaction
            - **hash** - *String* - Hash de la transaction
            - **expedite** - *String* - Frais accélérés, ou "" si non disponible
            - **contract_name** - *String* - Nom du contrat
            - **params** - *Object* - Paramètres du contrat, les champs du contrat peuvent être interrogés via [ibax.getContractInfo](#ibax-getcontractinfo)
            - **created_at** - *Number* - Date de création de la transaction
            - **size** - *String* - Taille de la transaction unité: B;KiB;MiB;GiB;TiB
            - **status** - *String* - Statut (0: succès ; 1: pénalité)

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getPageValidatorsCount","id":1,"params":[["1875b4fc02a8bf5ccf0d3fbce83011dd6711d8d325c7d731ac659b8beffc0284","4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b"],true]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "results": {
                "1875b4fc02a8bf5ccf0d3fbce83011dd6711d8d325c7d731ac659b8beffc0284": {
                    "blockid": 0,
                    "confirm": 0,
                    "data": null
                },
                "4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b": {
                    "blockid": 793,
                    "confirm": 0,
                    "data": {
                        "block_id": 793,
                        "block_hash": "ef3b2f2e18662e0b8bba136a209e30c5aae76d9a82e0b21209786f62fe5676e4",
                        "address": "0666-0819-7161-7879-5186",
                        "ecosystem": 1,
                        "hash": "4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b",
                        "expedite": "1",
                        "contract_name": "@1TokensSend",
                        "params": {
                            "Amount": "200",
                            "Comment": "Hello Dear",
                            "Recipient": "1196-2490-5275-7101-3496"
                        },
                        "created_at": 1678765099072,
                        "size": "297.00B",
                        "status": 0
                    }
                }
            }
        }
    }
```


### **ibax.getPageValidatorsCount** {#ibax-getpagevalidatorscount}

Retourne le nombre de nœuds à valider pour la page spécifiée.

**Paramètres**

- **name** - *String* - nom de la page dans le format `@ecosystem_id%%%nom_de_la_page%`, par exemple @1params_list (en spécifiant l'écosystème 1, nom de la page params_list) ou params_list (nom de la page actuelle de l'écosystème params_list).


**Valeur de retour**
- **validate_count** - *Number* - Specifies the number of nodes to be validated by the page.
 
**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getPageValidatorsCount","id":1,"params":["@1params_list"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "validate_count": 1
        }
    }
```


### **ibax.getPage** {#ibax-getpage}

Obtient l'arbre des objets JSON de code pour le nom de page spécifié, qui est le résultat du traitement par le moteur de templating.

[Authorization](#authorization)

**Paramètres**
- **name** - *String* - Le nom de la page avec l'ID de l'écosystème au format `@ecosystem_id%%nom_de_la_page%`, par exemple `@1page_principale`.

    Si vous n'avez pas d'identifiant d'écosystème, la valeur par défaut est de trouver la page actuelle de l'écosystème, par exemple `main_page`.

**Valeur de retour**
- **menu** - *String* - Le nom du menu auquel la page appartient.

- **menutree** - *Array* - Arbre d'objet JSON des menus de la page.

- **tree** - *Array* - Arbre d'objet JSON de la page.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getPage","id":1,"params":["@1params_list"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "menu": "developer_menu",
            "menutree": [
                {
                    "tag": "menuitem",
                    "attr": {
                        "icon": "icon-cloud-upload",
                        "page": "@1import_upload",
                        "title": "Import"
                    }
                }
                ...
            ],
            "tree": [
                {
                    ....
                }
                ...
            ],
            "nodesCount": 1
        }
    }
```


### **ibax.getMenu** {#ibax-getmenu}

Obtient l'arbre des objets JSON de code pour le nom de menu spécifié, qui est le résultat du traitement par le moteur de template.

[Authorization](#authorization) 

**Paramètres**
- **name** - *String* -
    > Nom du menu avec l'ID de l'écosystème au format `@ecosystem_id%%%nom_du_menu%`, par exemple:
    > `@1main_menu`.
    > Si vous ne fournissez pas l'identifiant de l'écosystème, le menu de l'écosystème actuel sera affiché par défaut, par exemple:
    > `main_menu`
 
**Valeur de retour**

- **title** - *String* - Le titre du menu.

- **tree** - *Array* - Arbre d'objet JSON du menu.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getMenu","id":1,"params":["@1default_menu"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "title": "default",
            "tree": [
                {
                    "tag": "menuitem",
                    "attr": {
                        "icon": "icon-cloud-upload",
                        "page": "@1import_upload",
                        "title": "Import"
                    }
                }
                ...
            ]
        }
    }
```


### **ibax.getSource** {#ibax-getsource}

Retourne un arbre d'objets JSON codés pour le nom de page spécifié. N'exécute aucune fonction ni ne reçoit de données. L'arbre d'objets JSON retourné correspond au modèle de page et peut être utilisé dans le concepteur de page visuel. Si la page n'est pas trouvée, une erreur 404 est renvoyée.


[Authorization](#authorization)
 
**Paramètres**
- **name** - *String* -
    Nom de page avec l'ID de l'écosystème au format `@ecosystem_id%%%nom_de_page%`, par exemple `@1main_page`.
    Si vous n'avez pas d'ID d'écosystème, la valeur par défaut est de trouver la page actuelle de l'écosystème, par exemple `main_page`.

**Valeur de retour**
- **tree** - *Array* - JSON object tree for the page.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getSource","id":1,"params":["@1params_list"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "tree": [
                {
                    "tag": "dbfind",
                    "attr": {
                        "name": "@1applications"
                    },
                    "tail": [
                        {
                            "tag": "where",
                            "attr": {
                                "where": "{\"ecosystem\": \"#ecosystem_id#\", \"name\": \"System\"}"
                            }
                        }
                        ...
                    ]
                },
                {
                    "tag": "setvar",
                    "attr": {
                        "name": "role_developer_id",
                        "value": "AppParam(Ecosystem: #ecosystem_id#, App: #application_id#, Name: role_developer)"
                    }
                },
                {
                    "tag": "dbfind",
                    "attr": {
                        "name": "@1roles_participants"
                    },
                    "tail": [
                        {
                            "tag": "where",
                            "attr": {
                                "where": "{\"ecosystem\": \"#ecosystem_id#\", \"$and\": [{\"role->id\": {\"$in\": [#role_developer_id#]}}, {\"role->id\": \"#role_id#\"}], \"member->account\": \"#account_id#\", \"deleted\": 0}"
                            }
                        }
                        ...
                    ]
                },
                {
                    "tag": "if",
                    "attr": {
                        "condition": "#developer_access_id#>0"
                    },
                    "children": [
                        {
                            "tag": "setvar",
                            "attr": {
                                "name": "this_page",
                                "value": "@1params_list"
                            }
                        }
                        ...
                    ],
                    "tail": [
                        {
                            "tag": "else",
                            "children": [
                                {
                                    "tag": "settitle",
                                    "attr": {
                                        "title": "$@1ecosystem_parameters$"
                                    }
                                }
                                ...
                            ]
                        }
                    ]
                }
            ]
        }
    }
```


### **ibax.getPageHash** {#ibax-getpagehash}

Retourne un hachage SHA256 du nom de page spécifié, ou une erreur 404 si la page n'est pas trouvée.

Pour recevoir le hachage correct lors de l'envoi de requêtes à d'autres nœuds, vous devez également passer le paramètre *ecosystem,key_id,role_id*. Pour recevoir des pages d'autres écosystèmes, l'ID de l'écosystème doit être préfixé au nom de la page. Par exemple : `@2mapage`.

**Paramètres**

- **name** - *String* - Le nom de la page avec l'ID de l'écosystème. Le format est `@ecosystem_id%%%nom_de_la_page%`, par exemple `@1page_principale`, vous pouvez spécifier l'ID de l'écosystème.

- **ecosystem** - *Number* - [Omitempty](#omitempty) Identifiant de l'écosystème.

- *Object* - [Omitempty](#omitempty) Obtenez l'objet de page spécifié.
    - **key_id** - *String* - L'adresse du compte.
    - **role_id** - *String* - L'ID du rôle.

**Valeur de retour**
- *Object* -
    - **hash** - *String* - Hachage hexadécimal.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getPageHash","id":1,"params":["@1params_list",0,{"role_id":"1","key_id":"-6484253546138538120"}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "hash": "fc5ed3b5e879dd5521dfb792e815019bd8411851e850e75a3590d71e950a0465"
        }
    }
```


### **ibax.getContent** {#ibax-getcontent}

Renvoie le nombre d'objets JSON pour le code de la page à partir du paramètre **template**, si le paramètre optionnel **source** est spécifié comme `true`, cet arbre d'objets JSON ne réalise aucune fonction et ne reçoit pas de données. Cet arbre d'objets JSON peut être utilisé dans le concepteur de pages visuelles.

**Paramètres**
- *Object*
    - **template** - *String* - Code de la page.

    - **source** - *Bool* - Si spécifié comme `true`, l'arbre d'objets JSON n'exécute aucune fonction et reçoit des données.

**Valeur de retour**
- **tree** - *Object* - Arbre d'objet JSON.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getContent","id":1,"params":[{"template","..."source":true}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "tree": {
                "type":"......", 
                "children": [
                    {...},
                    {...}
                ]
            }
        }
    }
      
```


### **ibax.getBlockInfo** {#ibax-getblockinfo}
Renvoie des informations sur l'ID de bloc spécifié.

**Paramètres**
- **id** - *Number* - la hauteur du bloc.

**Valeur de retour**

- **hash** - *String* - La valeur du hash du bloc.

- **key_id** - *Number* - l'adresse du compte qui a signé le bloc.

- **time** - *Number* - horodatage de la génération du bloc.

- **tx_count** - *Number* - le nombre total de transactions dans le bloc.

- **rollbacks_hash** - *String* - Le hash de retour en arrière du bloc.

- **node_position** - *Number* - La position du bloc dans la liste des nœuds honorés.

- **consensus_mode** *Number* - Mode de consensus, paramètres (1: mode de gestion du créateur ; 2: mode de gouvernance DAO).

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBlockInfo","id":1,"params":[12]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "hash": "Hl+/VvYFFu4iq4zLrRDGHBhm7DM7llEAfEJyaX2Q3is=",
            "key_id": 6667782293976713160,
            "time": 1677134955,
            "tx_count": 1,
            "rollbacks_hash": "o37QAighKMb8WqbEHAqCQb5bOfMvOqV0WoTaN631q74=",
            "node_position": 0,
            "consensus_mode": 1
        }
    }
```


### **ibax.getConfig** {#ibax-getconfig}
Obtenez l'adresse hôte et le port de centrifugo.

**Paramètres**
- **option** - *String* - Élément de configuration

    1. "centrifugo" - Service de messagerie


**Valeur de retour**

- **centrifugo** - *String* - [Omitempty](#omitempty) adresse de l'hôte et du port de centrifugo Format de résultat `http://adresse:port`, par exemple : `http://127.0.0.1:8100`.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getConfig","id":1,"params":["centrifugo"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "centrifugo":"http://127.0.0.1:8100"
        }
    }
```




### **net.getNetwork** {#net-getnetwork}
Obtenir les informations du nœud.
 
**Paramètres** 
- Aucun

**Valeur de retour**
- **network_id** - *String* - L'identifiant du réseau.
- **centrifugo_url** - *String* - Adresse du service de messagerie Centrifugo.
- **test** - *Bool* - Indique s'il s'agit d'une chaîne de test.
- **private** - *Bool* - Indique si la chaîne est privée.
- **honor_nodes** - *Object* - Liste des nœuds honorés.
    - **tcp_address** - *String* - Adresse TCP.
    - **api_address** - *String* - Adresse de l'API.
    - **public_key** - *String* - Clé publique du nœud.
    - **unban_time** - *String* - Heure de déverrouillage.


**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"net.getNetwork","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "network_id": "1",
            "centrifugo_url": "127.0.0.1",
            "test": false,
            "private": false,
            "honor_nodes": [
                {
                    "tcp_address": "127.0.0.1:7078",
                    "api_address": "http://127.0.0.1:7078",
                    "public_key": "049a41b24862f8db61ee66fb206094baa57bfeac7ea786d63662a964d144eb85d1a0e230928d56f46dd61eefac7640b6aa2883b2445c7b2adc0e581f983ff0aedb",
                    "unban_time": "-62135596800"
                }
            ]
        }
    }
```
 

### **net.status** {#net-status}
Obtenez l'état actuel du nœud.

**Paramètres** 
- Aucun

**Valeur de retour**
- **status** - *String* - État du nœud
    "L'état du serveur du nœud est en cours d'exécution" - le nœud est en cours d'exécution
    "Le serveur du nœud est en cours de mise à jour" - le nœud est en cours de mise à jour
    "Le serveur du nœud est arrêté" - le nœud est suspendu

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"net.status","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": "node server status is running"
    }
```




### **rpc.modules** {#rpc-modules}
Obtenez l'interface JSON-RPC actuellement enregistrée.

**Paramètres**
- Aucun

**Valeur de retour**
- *Array* - Interface JSON-RPC en tableau

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"rpc.modules","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": [
            "net.getNetwork",
            "ibax.getAppContent",
            "ibax.honorNodesCount",
            "ibax.maxBlockId",
            "ibax.detailedBlock",
            "ibax.getConfig",
            "ibax.getTableCount",
            "ibax.getMenu"
        ]
    }
```




### **admin.startJsonRpc** {#admin-startjsonrpc}
Peut être utilisé pour basculer entre les services de changement d'espace de noms JSON-RPC.

**Paramètres**
- **methods** - *String* - Module JSON-RPC, par défaut : "ibax,net"

**Valeur de retour**
- *bool* - état d'exécution

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"admin.startJsonRpc","id":1,"params":["ibax,net,admin"]}' http://127.0.0.1:8385

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": true
    }
```


### **admin.stopJsonRpc** {#admin-stopjsonrpc}
Fermez le service JSON-RPC.

**Paramètres** 
- Aucun

**Valeur de retour**
- *bool* - Statut d'exécution

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"admin.stopJsonRpc","id":1,"params":[]}' http://127.0.0.1:8385

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": true
    }
```



### **debug.getNodeBanStat** {#debug-getnodebanstat}
Obtenir l'état de désactivation du nœud.

**Paramètres** 
- Aucun

**Valeur de retour**
**node_position** - *Number* - Indice de nœud.
**status** - *Bool* - Statut désactivé, statut de bannissement `true`, non désactivé `false`.

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"debug.getNodeBanStat","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": [
            {
                "node_position": 0,
                "status": true
            }
        ]
    }
```
 

### **debug.getMemStat** {#debug-getmemstat}
Obtenez l'utilisation actuelle de la mémoire du nœud.

**Paramètres** 
- Aucun

**Valeur de retour**
- **alloc** - *Number* - Nombre d'octets demandés et encore utilisés.
- **sys** - *Number* - Nombre d'octets récupérés du système

**Exemple**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"debug.getMemStat","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "alloc": 11537432,
            "sys": 35329248
        }
    }
```
