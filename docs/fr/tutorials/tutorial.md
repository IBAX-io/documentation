# Tutoriel de développement IBAX {#ibax-development-tutorial}

## Guide de démarrage {#getting-started-guide}
- [Déployer le premier contrat intelligent via l'outil en ligne de commande](#deploy-first-smart-contract-via-command-line-tool)
- [Développement de l'écosystème de l'outil en ligne de commande](#command-line-tool-eco-development)

## Déploiement {#deployment}
- [Déployer une application à l'aide des outils en ligne de commande](#deploy-application-using-command-line-tools)
- [Configuration écologique à l'aide de l'outil en ligne de commande](#ecosystem-configuration-using-command-line-tool)

## Guide Avancé {#advanced-guide}
- [Déployer des applications à l'aide de l'outil d'emballage d'application](#deploy-applications-using-application-packaging-tool)


## Déployer le premier smart contract via l'outil en ligne de commande {#deploy-first-smart-contract-via-command-line-tool}
Nous allons déployer des [smart contracts](../concepts/thesaurus.md#smart-contract) sur la blockchain IBAX via l'[outil en ligne de commande](https://github.com/IBAX-io/ibax-cli) et apprendre comment invoquer des smart contracts.
En tant que premier smart contract, nous l'avons déployé sur le [réseau de test local](../concepts/blockchain-layers.md). Pour savoir comment déployer un réseau local, vous pouvez vous référer à [Déploiement du réseau](../howtos/deployment.md),
ainsi vous pouvez le déployer et l'exécuter comme vous le souhaitez sans aucun surcoût.

### Créer une application {#create-application}
Appelez le contrat @1NewApplication pour créer l'application, qui a un paramètre de nom d'application et un paramètre de [permission de modification](../concepts/about-the-platform.md#access-rights-control-mechanism).

```text
1  $ ibax-cli console
2    
3  Bienvenue dans la console IBAX !
4  Pour quitter, appuyez sur ctrl-d ou tapez exit
5  >callContract @1NewApplication {"Name": "testapp", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
6  
7  {
8    "block_id": 1217,
9    "hash": "6327161d2202c33c06d34ab4ed9b509c05fc2cbb15cf260c6d3d404a6f640028",
10   "penalty": 0,
11   "err": "31"
12 }
```

Les éléments suivants sont expliqués par ligne :
- Ligne 1, démarrer le terminal de ligne de commande
- Ligne 5, appeler le contrat @1NewApplication pour créer une application avec le nom d'application `testapp` et la permission de modification de l'application `@1DeveloperCondition` avec la permission du développeur
- Ligne 8, l'identifiant de bloc généré par la transaction
- Ligne 9, le hachage de bloc généré par la transaction
- Ligne 10, si l'exécution de la transaction échoue (0 : pas de pénalité, 1 : pénalité)
- Ligne 11, si l'exécution de la transaction échoue, un message d'erreur est renvoyé, et si l'identifiant de bloc est renvoyé, le champ err est l'identifiant de l'application

Bien sûr, si vous souhaitez voir quels champs et types de champs sont disponibles dans ce contrat, vous pouvez appeler la méthode `getContractInfo`, qui renverra les informations sur le contrat comme suit:

```text
>getContractInfo @1NewApplication

{
    "id": 5022,
    "state": 1,
    "tableid": "22",
    "walletid": "0",
    "tokenid": "1",
    "address": "0000-0000-0000-0000-0000",
    "fields": [
        {
            "name": "Name",
            "type": "string",
            "optional": false
        },
        {
            "name": "Conditions",
            "type": "string",
            "optional": false
        },
        {
            "name": "VotingId",
            "type": "int",
            "optional": true
        }
    ],
    "name": "@1NewApplication",
    "app_id": 1,
    "ecosystem": 1,
    "conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```

Le champ `fields` est constitué des paramètres du contrat, incluant le nom du paramètre `name`, `type`, `optional`, `Name` et `Conditions` sont requis, `VotingId` est optionnel, consultez la méthode API [contract/name](../reference/api2.md#contract-name)


### Rédaction de contrats {#writing-contracts}

Nous utilisons [Needle](../topics/script.md#needle-contract-language) pour écrire un contrat intelligent.
Nous implémentons une opération d'addition simple, le code source du contrat est le suivant, nous enregistrons le contrat sous le nom `SumMath.sim`.

```text
1    contract SumMath {
2        data {
3            A int
4            B int
5        }
6        conditions {
7    
8        }
9        action {
10            var sum int
11            sum = $A + $B
12            $result = sum
13        }
14    }
```
Le suivant est expliqué par ligne :
- À la ligne 1, nous définissons un contrat avec le nom SumMath.
- Ligne 2, [Section des données](../topics/script.md#data-section).
- Aux lignes 3-4, nous définissons deux paramètres de type entier 64 bits en entrée, `A` et `B`.
- Ligne 6, [Section conditionnelle](../topics/script.md#conditions-section).
- Ligne 9, [Section des opérations](../topics/script.md#action-section). Nous définissons une variable `sum` pour recevoir le résultat de A+B.
Nous assignons la valeur de `sum` à `$result`, en tant que résultat du contrat. Bien sûr, il est possible d'assigner directement la valeur de A+B à `$result`, mais cela peut être montré comme un exemple.

### Créer un contrat {#create-contract}

Il existe deux façons de créer un contrat, dont la première est la suivante :
Dans la première étape, nous rédigeons un fichier de paramètres de contrat au format json :

```json
{
  "ApplicationId": 31,
  "Value": "contract SumMath {\n    data {\n        A int\n        B int\n    }\n    conditions {\n\n    }\n    action {\n        var sum int\n        sum = $A + $B\n        $result = sum\n    }\n}",
  "Conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```
où `ApplicationId` est l'identifiant de l'application, `Value` est le code source du contrat, il est nécessaire d'échapper les caractères spéciaux, `Conditions` sont les droits de modification du contrat.

Nous l'avons nommé SumMathParams.json.

La deuxième étape consiste à appeler la création d'un contrat @1NewContract:

```
1    >callContract @1NewContract -f=./data/SumMathParams.json
2    {
3        "block_id": 1238,
4        "hash": "f3fe7aff8a613c96299723b7e9af0682aa8cabe7becf67a485e2a77a974f58b6",
5        "penalty": 0,
6        "err": "328"
7    }
```

Deuxième méthode :
Le fichier source du contrat enregistré est directement transmis aux paramètres du contrat dans le format de paramètre `nomParamètre` + `-` + "fichier", `nomParamètre-fichier` comme suit :

```shell
1    >callContract @1NewContract {"ApplicationId": 31, "Value-file": "SumMath.sim", "Conditions": "true"}    
2    {
3        "block_id": 2055,
4        "hash": "cdf25060669cf7cba137278...26ca463fd5d458f3402a5f0137f693db",
5        "penalty": 0,
6        "err": "368"
7    }
```

Le suivant est expliqué par ligne :
- Ligne 1 : Appeler le contrat @1NewContract pour créer le contrat, -f utilise le fichier pour importer les paramètres du contrat
- Ligne 3 : L'identifiant de bloc généré par la transaction
- Ligne 4 : Le hachage de bloc généré par la transaction
- Ligne 5 : Si l'exécution de la transaction échoue (0 : pas de pénalité, 1 : pénalité)
- Ligne 6 : Si l'exécution de la transaction échoue, un message d'erreur est renvoyé, et si l'identifiant de bloc est renvoyé, le champ err est l'identifiant du contrat


Essayons d'appeler le contrat que nous venons de déployer.

```shell
1  >callContract @5SumMath {"A":1, "B":2}
2  
3  {
4      "block_id": 1239,
5      "hash": "7fa09da0b9f65634119a910f9d91aaf4927208278efd62961499ef7e4f4c8c9c",
6      "penalty": 0,
7      "err": "3"
8  }
```

L'appel est terminé et le résultat est conforme aux attentes, comme expliqué ci-dessous par ligne :
- La première ligne appelle le contrat, ici nous déployons le contrat dans l'écosystème avec l'identifiant écologique 5. Bien sûr, si l'identifiant écologique actuel est 5, dans le même écosystème, vous pouvez également appeler `callContract SumMath {"A":1, "B":2}` de cette manière.
- Ligne 3, l'identifiant de bloc généré par la transaction.
- Ligne 4, le hachage de bloc généré par la transaction.
- Ligne 5, si l'exécution de la transaction échoue (0 : pas de pénalité, 1 : pénalité).
- Ligne 6, si l'exécution de la transaction échoue, un message d'erreur est renvoyé, et si l'identifiant de bloc est renvoyé, le champ err est le résultat du contrat, qui est la valeur de `$result`.


## Outil en ligne de commande pour le développement écologique {#command-line-tool-eco-development}

Dans ce tutoriel, vous apprendrez comment :

- 1. [Créer un écosystème](#step-1-create-ecosystem)
- 2. [Créer une application](#step-2-create-application)
- 3. [Créer une table](#step-3-create-table)
- 4. [Créer des paramètres d'application](#step-4-create-application-parameters)
- 5. [Créer et déployer un contrat](#step-5-create-contract-deploy-contract)
- 6. [Créer des paramètres écologiques](#step-6-create-ecological-parameters)
- 7. [Ajouter la localisation](#step-7-add-localization)
- 8. [Modifier le contrat](#step-8-modify-the-contract)
- 9. [Modifier les autorisations de la table de données](#step-9-modify-data-table-permissions)

Afin de comprendre plus clairement à quoi ressemble l'écosystème et les applications IBAX et ce qu'ils font, il est préférable de comprendre où l'écosystème et les applications devraient appartenir, et nous pouvons mieux comprendre avec une carte mentale simple :
![image](/ibax-eco.png)

Il est possible de constater que les réseaux IBAX peuvent avoir de nombreux [Écosystèmes](../concepts/about-the-platform.md#ecolib). 
Chaque écosystème peut avoir plusieurs [applications](../concepts/about-the-platform.md#applications).
Chaque application possède un [contrat](../concepts/thesaurus.md#smart-contract).
[Tables](../concepts/about-the-platform.md#tables).
Chaque écosystème possède des paramètres écologiques, chaque application possède des paramètres d'application.

### Étape 1 : Créer un écosystème {#step-1-create-ecosystem}

Nous commençons par créer un écosystème en utilisant l'outil en ligne de commande (https://github.com/IBAX-io/ibax-cli), en appelant le contrat @1NewEcosystem.
Si vous souhaitez changer le nom de l'écosystème, vous pouvez appeler le contrat @1EditEcosystemName.

```shell
1    $ ibax-cli console
2    
3    Welcome to the IBAX console!
4    To exit, press ctrl-d or type exit
5    >callContract @1NewEcosystem {"Name": "goodBoy school"}
6    
7    {
8        "block_id": 1199,
9        "hash": "a1dc90c1772545c16394b9521...227676b27b145743556a8973dd",
10       "penalty": 0,
11       "err": "18"
12   }
```

Les éléments suivants sont expliqués par ligne :
- Ligne 1, qui lance le programme de console de ligne de commande
- Ligne 5, appelle le contrat `@1NewEcosystem` pour créer un écosystème avec le nom "test ecosystem"
- Ligne 8, l'identifiant de bloc généré par la transaction
- Ligne 9, le hachage de bloc généré par la transaction
- Ligne 10, si l'exécution de la transaction échoue (0 : pas de pénalité, 1 : pénalité)
- Ligne 11, si l'exécution de la transaction échoue, un message d'erreur est renvoyé, et si l'identifiant de bloc est renvoyé, le champ d'erreur est l'identifiant de l'écosystème en tant que `18`

Ensuite, nous configurons l'outil de commande `config.yml`, nous définissons `ecosystem` sur l'ecid créé `18` et redémarrons le programme de console de ligne de commande:

```shell
>exit
INFO[0002] Exit

$ vim data/config.yml

$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit
>
```

### Étape 2 : Créer une application {#step-2-create-application}

Appeler le contrat `@1NewApplication` pour créer l'application, qui a un paramètre de nom d'application et un paramètre de modification [Paramètre de Permission](../concepts/about-the-platform.md#access-rights-control-mechanism)

```text
1  >callContract @1NewApplication {"Name": "GradesRecorder", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
2  
3  {
4     "block_id": 1246,
5     "hash": "85ab8953d26d0d1047fc610866115331babfaf88c80792d50b41826185c9f6f8",
6     "penalty": 0,
7     "err": "47"
8  }
```

Si vous devez modifier les autorisations de l'application, vous pouvez appeler le contrat `EditApplication`.


Ce qui suit est expliqué par ligne :
- Ligne 1, appelez le contrat @1NewApplication pour créer une application, le nom de l'application est `GradesRecorder`, la permission de modification de l'application est la permission du développeur `@1DeveloperCondition`.
- Ligne 4, l'ID de bloc généré par la transaction.
- Ligne 5, le hachage de bloc généré par la transaction.
- Ligne 6, si l'exécution de la transaction échoue (0 : pas de pénalité, 1 : pénalité).
- Ligne 7, si l'exécution de la transaction échoue, un message d'erreur est renvoyé, et si l'ID de bloc est renvoyé, le champ err contient l'ID de l'application qui est `47`.

Écrivons un exemple simple d'une application qui suit les notes des étudiants.
Les champs de la table de données comprennent les informations sur l'étudiant, la note `grade`, la classe `class`, les notes de matières `mathématiques, physique, littérature`, le score global `overall_score`, la note `score`, le timestamp de création (ms) `created_at`.

### Étape 3 : Créer une table {#step-3-create-table}

 Dans la première étape, nous rédigeons un fichier de paramètres de contrat au format json :

```json
{
  "ApplicationId": 47,
  "Name": "grade_info",
  "ColumnsArr": [
    "student",
    "grade",
    "class",
    "mathematics",
    "physics",
    "literature",
    "overall_score",
    "score",
    "created_at"
  ],
  "TypesArr": [
    "varchar",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "varchar",
    "number"
  ],
  "InsertPerm": "ContractConditions(\"MainCondition\")",
  "UpdatePerm": "ContractConditions(\"MainCondition\")",
  "ReadPerm": "true",
  "NewColumnPerm": "ContractConditions(\"MainCondition\")"
}
```

où `ApplicationId` est l'identifiant de l'application, `Name` est le nom de la table de données créée `test_table`. 
`ColumnsArr` est un tableau de champs de la table de données, `TypesArr` est le type des champs de la table de données, comprenant 9 [types](../concepts/about-the-platform.md#tables) `varchar`, `character`, `json`, `number`, `datetime`, `double`, `money`, `text`, `bytea`, le nom du champ et le type de champ sont en correspondance un à un. `InsertPerm` pour la permission de nouvelle entrée dans la table de données, `UpdatePerm` pour la permission de mise à jour des entrées de la table de données, `ReadPerm` pour la permission de lecture des données de la table de données, `NewColumnPerm` pour la permission de nouveau champ de la table de données.

En référence au [Contrôle des autorisations](../concepts/about-the-platform.md#access-rights-control-mechanism), ici `ContractConditions(\"MainCondition\")` est disponible pour le créateur de l'écosystème actuel.

Nous l'appelons createTable.json, puis nous appelons le contrat pour créer la table de données `@1NewTableJoint`.

```text
>callContract @1NewTableJoint -f ./createTestTable.json
```

#### Modifier les autorisations des champs de la table de données {#modify-data-table-field-permissions}

Nous pouvons modifier les autorisations des champs de la table de données. Les autorisations des champs de la table de données comprennent les autorisations de lecture et de mise à jour. Les autorisations de lecture permettent d'utiliser le filtre `DBFind.Columns` dans le contrat ou des interfaces telles que [list](../reference/api2.md#list-name-limit-offset-columns) pour effectuer des requêtes. Si aucune autorisation n'est accordée, une erreur de permission sera signalée.
La permission de mise à jour est la permission de modifier les champs de la table de données.
Nous avons défini les autorisations de lecture et de mise à jour du champ "student" sur "false", mais bien sûr, elles peuvent être rendues opérationnelles par certains contrats.
Appelez le contrat `@1EditColumn` pour modifier les autorisations des champs de la table de données.

```shell
>callContract @1EditColumn {"TableName": "grade_info", "Name": "student", "UpdatePerm": "false", "ReadPerm": "false"}
```

Nous pouvons créer plusieurs paramètres d'application : `grade_best_type`, `grade_type_a+`, `grade_type_a`, `grade_type_b+`, `grade_type_b`, `grade_type_c`, type de notation des grades.

### Étape 4 : Créer les paramètres de l'application {#step-4-create-application-parameters}

Appelez le contrat `@1NewAppParam` pour créer les paramètres de l'application. Si vous souhaitez modifier les paramètres de l'application, vous pouvez appeler le contrat `@1EditAppParam`.

```text
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_best_type", "Value": "A+", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_a+", "Value": "{\"max\": 101,\"min\": 90}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_a", "Value": "{\"max\": 90,\"min\": 80}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_b+", "Value": "{\"max\": 80,\"min\": 70}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_b", "Value": "{\"max\": 70,\"min\": 60}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_c", "Value": "{\"max\": 60,\"min\": 0}", "Conditions": "ContractConditions(\"MainCondition\")"}
```

Où `grade_best_type` est le meilleur type de notation.

`grade_type_a+` est la condition déclenchée par la notation `A+`, lorsque le score est supérieur ou égal à 90 et inférieur à 101, la notation est `A+`, les autres paramètres sont similaires.


### Étape 5 : Créer un contrat et le déployer. {#step-5-create-contract-deploy-contract}

Nous créons un contrat pour enregistrer les informations de notes des étudiants et leur note finale pour chaque matière, et nous saisissons la classe et la note de l'étudiant pour chaque matière lors de la saisie des informations.

En fonction des notes saisies pour chaque matière, nous effectuons un calcul de moyenne pour obtenir la note globale `overallScore` et la note finale `score`.
Lorsque le contrat est appelé, il créera un enregistrement dans la table de données que nous venons de créer `grade_info`.

D'abord, nous écrivons un contrat et le nommons `NewRecord.sim`

```text
1 contract NewRecord {
2       data {
3         Student string
4         Grade int
5         Class int
6         Mathematics int
7         Physics int
8         Literature int
9       }
10     func getScore(a b c int) map{
11          var m map
12          var overallScore int
13          overallScore = (a+b+c) / 3
14          m["overallScore"] = overallScore
15          if overallScore >= $gradeTypeABest["min"] && overallScore < $gradeTypeABest["max"] {
16              m["score"] = "A+"
17          }elif overallScore >= $gradeTypeA["min"] && overallScore < $gradeTypeA["max"] {
18              m["score"] = "A"
19          }elif overallScore >= $gradeTypeBBest["min"] && overallScore < $gradeTypeBBest["max"] {
20              m["score"] = "B+"
21          }elif overallScore >= $gradeTypeB["min"] && overallScore < $gradeTypeB["max"] {
22              m["score"] = "B"
23          }elif overallScore >= $gradeTypeC["min"] && overallScore < $gradeTypeC["max"]{
24              m["score"] = "C"
25          }else{
26              m["score"] = "Notset"
27          }
28          return m
29      }
30      func safeJsonDecode(m string) map {
31          var res map
32          if Size(m) > 0 {
33             res = JSONDecode(m)
34          }
35          return res
36      }
37
38      conditions {
39          if Size($Student) == 0 {
40            warning "Student Can not be empty"
41          }
42          if $Class <= 0{
43              warning "Class cannot be less than or equal to zero"
44          }
45          if $Grade <= 0{
46              warning "Grade cannot be less than or equal to zero"
47          }
48          if $Mathematics < 0 {
49              warning "Mathematics cannot be less than zero"
50          }
51          if $Physics < 0 {
52              warning "Physics cannot be less than zero"
53          }
54          if $Literature < 0 {
55              warning "Literature cannot be less than zero"
56          }
57          if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{
58              warning "Score cannot exceed 100"
59          }
60          var app map
61          app = DBFind("@1applications").Columns("id,ecosystem").Where({"ecosystem": 18,"name":"GradesRecorder","deleted":0}).Row()
62          if !app {
63              warning LangRes("@1app_not_found")
64          }
65
66          var app_id int
67          app_id = Int(app["id"])
68          $eId = Int(app["ecosystem"])
69          $gradeBestType = AppParam(app_id, "grade_best_type", $eId)
70          $gradeTypeABest = safeJsonDecode(AppParam(app_id, "grade_type_a+", $eId))
71          $gradeTypeA = safeJsonDecode(AppParam(app_id, "grade_type_a", $eId))
72          $gradeTypeBBest = safeJsonDecode(AppParam(app_id, "grade_type_b+", $eId))
73          $gradeTypeB = safeJsonDecode(AppParam(app_id, "grade_type_b", $eId))
74          $gradeTypeC = safeJsonDecode(AppParam(app_id, "grade_type_c", $eId))
75      }
76      action {
77          var m map
78          m = getScore($Mathematics,$Physics,$Literature)
79          var in map
80          in["student"] = $Student
81          in["class"] = $Class
82          in["grade"] = $Grade
83          in["mathematics"] = $Mathematics
84          in["physics"] = $Physics
85          in["literature"] = $Literature
86          in["overall_score"] = m["overallScore"]
87          in["score"] = m["score"]
88          in["created_at"] = $time
89          DBInsert("@"+ Str($eId)+"grade_info", in)
90      }
91  }
```

Ce qui suit est expliqué par ligne:

- Ligne 2, [section des données](../topics/script.md#data-section) définit les paramètres d'entrée `Student` nom de l'étudiant, `Grade` classe, `Class` classe, `Mathematics` score en mathématiques, `Physics` score en physique, `Literature` score en littérature.
- Ligne 10, la fonction getScore, produit un score composite et une note finale basée sur le score de chaque matière.
- Ligne 30, la fonction safeJsonDecode, décode la chaîne JSON et la convertit en map.
- Ligne 38, [section conditionnelle](../topics/script.md#conditions-section).
- Ligne 39, [section des opérations](../topics/script.md#action-section).

Comme vous pouvez le voir, lorsque le contrat est appelé, il passe d'abord par la partie conditionnelle, vérifiant que les paramètres d'entrée du contrat sont valides, tels que le nom de l'étudiant `if Size($Student) == 0 {` est vide (ligne 39), et s'il l'est, un message d'erreur est renvoyé `"L'étudiant ne peut pas être vide"` (ligne 30). Après avoir vérifié tous les paramètres d'entrée, à la ligne 61, utilisez [DBFind](../topics/script.md#dbfind) pour récupérer les informations de la base de données pour l'application avec l'ecid `18` et le nom de l'application `GradesRecorder` et les informations de l'application avec `deleted=0` ne sont pas supprimées.

Aux lignes 69-74, utilisez [AppParam](../topics/script.md#appparam) pour récupérer les paramètres de l'application, par exemple `$gradeBestType = AppParam(app_id, "grade_best_type", $ eId)` (ligne 69).

Si le paramètre de l'application est stocké au format json, tel que `grade_type_a`, vous pouvez vous référer à `$gradeTypeABest = safeJsonDecode(AppParam(app_id, "grade_type_a+", $eId))`, qui obtiendra le paramètre de l'application par la fonction safeJsonDecode au format map.

Ensuite, passez à la partie opérationnelle, appelez la fonction getScore pour obtenir le score composite résultant et la note finale (ligne 10), utilisez une map pour stocker, ligne 79, définissez une map pour stocker les informations de réussite de l'étudiant, et
[DBInsert](../topics/script.md#dbinsert) Insérez les données dans la table de données `@18grade_info`.

Il existe deux façons de créer un contrat, la première consiste à:
Tout d'abord, nous écrivons un fichier de paramètres de contrat au format json:

```json
{
  "ApplicationId": 47,
  "Value": "contract NewRecord {\n    data {\n        Student string\n        Grade int\n        Class int\n        Mathematics int\n        Physics int\n        Literature int\n    }\n    func getScore(a b c int) map{\n        var m map\n        var overallScore int\n        overallScore = (a+b+c) / 3\n        m[\"overallScore\"] = overallScore\n        if overallScore >= $gradeTypeABest[\"min\"] && overallScore < $gradeTypeABest[\"max\"] {\n            m[\"score\"] = \"A+\"\n        }elif overallScore >= $gradeTypeA[\"min\"] && overallScore < $gradeTypeA[\"max\"] {\n            m[\"score\"] = \"A\"\n        }elif overallScore >= $gradeTypeBBest[\"min\"] && overallScore < $gradeTypeBBest[\"max\"] {\n            m[\"score\"] = \"B+\"\n        }elif overallScore >= $gradeTypeB[\"min\"] && overallScore < $gradeTypeB[\"max\"] {\n            m[\"score\"] = \"B\"\n        }elif overallScore >= $gradeTypeC[\"min\"] && overallScore < $gradeTypeC[\"max\"]{\n            m[\"score\"] = \"C\"\n        }else{\n            m[\"score\"] = \"Notset\"\n        }\n        return m\n    }\n    func safeJsonDecode(m string) map {\n        var res map\n        if Size(m) > 0 {\n            res = JSONDecode(m)\n        }\n        return res\n    }\n\n    conditions {\n        if Size($Student) == 0 {\n            warning \"Student Can not be empty\"\n        }\n        if $Class <= 0{\n            warning \"Class cannot be less than or equal to zero\"\n        }\n         if $Grade <= 0{\n            warning \"Grade cannot be less than or equal to zero\"\n        }\n        if $Mathematics < 0 {\n            warning \"Mathematics cannot be less than zero\"\n        }\n        if $Physics < 0 {\n            warning \"Physics cannot be less than zero\"\n        }\n        if $Literature < 0 {\n            warning \"Literature cannot be less than zero\"\n        }\n        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{\n            warning \"Score cannot exceed 100\"\n        }\n        var app map\n        app = DBFind(\"@1applications\").Columns(\"id,ecosystem\").Where({\"ecosystem\": 18,\"name\":\"GradesRecorder\",\"deleted\":0}).Row()\n        if !app {\n            warning LangRes(\"@1app_not_found\")\n        }\n\n        var app_id int\n        app_id = Int(app[\"id\"])\n        $eId = Int(app[\"ecosystem\"])\n        $gradeBestType = AppParam(app_id, \"grade_best_type\", $eId)\n        $gradeTypeABest = safeJsonDecode(AppParam(app_id, \"grade_type_a+\", $eId))\n        $gradeTypeA = safeJsonDecode(AppParam(app_id, \"grade_type_a\", $eId))\n        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, \"grade_type_b+\", $eId))\n        $gradeTypeB = safeJsonDecode(AppParam(app_id, \"grade_type_b\", $eId))\n        $gradeTypeC = safeJsonDecode(AppParam(app_id, \"grade_type_c\", $eId))\n    }\n    action {\n        var m map \n        m = getScore($Mathematics,$Physics,$Literature)\n        var in map\n        in[\"student\"] = $Student\n        in[\"class\"] = $Class\n        in[\"grade\"] = $Grade\n        in[\"mathematics\"] = $Mathematics\n        in[\"physics\"] = $Physics \n        in[\"literature\"] = $Literature \n        in[\"overall_score\"] = m[\"overallScore\"]\n        in[\"score\"] = m[\"score\"]\n        in[\"created_at\"] = $time\n        DBInsert(\"@\"+ Str($eId)+\"grade_info\", in)\n    }\n}",
  "Conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```

Où `ApplicationId` est l'identifiant de l'application, qui doit être échappé pour les caractères spéciaux, et `Conditions` est la permission de modification du contrat.

Code source du contrat `Value`, que nous enregistrons sous le nom `NewRecordParams.json`.


Après avoir rédigé le contrat, nous devons le déployer en appelant CreateContract`@1NewContract`.

```text
1    >>callContract @1NewContract -f=./data/NewRecordParams.json
2    {
3        "block_id": 1262,
4        "hash": "d896f12f685835f6cf71705e1ba...4d8bcc0a1406f7b0b6482b2d230fc",
5        "penalty": 0,
6        "err": "348"
7    }
```

La ligne suivante est expliquée par ligne :

- Ligne 1 : appeler le contrat `@1NewContract` pour créer le contrat, -f utilise le fichier pour importer le fichier `NewRecord.json` nouvellement créé en tant que paramètre du contrat.
- Ligne 3 : l'identifiant de bloc généré par la transaction.
- Ligne 4 : le hachage de bloc généré par la transaction.
- Ligne 5 : si l'exécution de la transaction échoue (0 : pas de pénalité, 1 : pénalité).
- Ligne 6 : si l'exécution de la transaction échoue, un message d'erreur est renvoyé, et si l'identifiant de bloc est renvoyé, le champ d'erreur contient l'identifiant du contrat qui est `348`.

Deuxième méthode :
Le fichier source du contrat enregistré est directement transmis aux paramètres du contrat dans le format de paramètre `nomParamètre` + `-` + "fichier", `nomParamètre-fichier` comme suit :

```shell
callContract @1NewContract {"ApplicationId": 47, "Value-file": "NewRecord.sim", "Conditions": "ContractConditions(\"@1DeveloperCondition\ ")"}
```

Essayons d'appeler le contrat que nous venons de créer.

```text
1  >callContract @18NewRecord {"Student": "tom", "Grade": 1, "Class": 1, "Mathematics": 18, "Physics": 57, "Literature": 93}
2  
3  {
4     "block_id": 1263,
5     "hash": "1b964a47fe6c5fd43ea55a752d01edb5ad576432fd6f63315344d87999a0473d",
6     "penalty": 0,
7     "err": ""
8  }
```
The call is complete, and then we check to see if the data table has saved a record
```text
>getList @18grade_info
{
    "count": 1,
    "list": [
        {
            "class": "1",
            "created_at": "1683698914109",
            "grade": "1",
            "id": "9",
            "literature": "93",
            "mathematics": "18",
            "overall_score": "56",
            "physics": "57",
            "score": "C",
            "student": "tom"
        }
    ]
}
```
Vous pouvez voir qu'il y a déjà un enregistrement dans la table de données, `student` tom avec une note globale de 56 et une note de C.

L'exemple ci-dessus est uniquement à des fins d'étude et de recherche, vous devez modifier les paramètres pertinents en fonction de la situation réelle, tels que la permission d'écriture dans la table de données, la permission de modification de contrat, etc.

Par exemple, si nous voulons spécifier qu'une seule personne peut appeler ce nouveau contrat et que personne d'autre ne peut l'appeler, nous pouvons définir un paramètre écologique `new_record_account`.

### Étape 6 : Créer des paramètres écologiques {#step-6-create-ecosystem-parameters}

Appeler le contrat `@1NewParameter` créera l'éco-paramètre `new_record_account` dans la table `@1parameters`. Si vous avez besoin de modifier l'éco-paramètre, vous pouvez appeler `@1EditParameter`.

```text
>callContract @1NewParameter {"Name": "new_record_account", "Value": "6667782293976713160", "Conditions": "ContractConditions(\"MainCondition\")"}

{
    "block_id": 1416,
    "hash": "12fc87ce6a70e2fc993ab9ffe623311f1c50edd1157595ce6183c38c93960cae",
    "penalty": 0,
    "err": "273"
}
```
Nous créons un paramètre d'écosystème appelé `new_record_account`, nous définissons la valeur sur la cléId `6667782293976713160`, nous modifions les permissions pour `ContractConditions("MainCondition")`, ce qui signifie que le créateur écologique actuel peut modifier.
Lorsque la transaction est exécutée avec succès, l'identifiant du paramètre écologique dans le champ "err" est `273`.

### Étape 7 : ajouter la localisation {#step-7-add-localization}

Vous pouvez appeler le contrat `@1NewLangJoint` pour créer le paramètre de localisation `account_not_access`, qui créera le paramètre dans la table `@1languages`, et vous pouvez modifier le paramètre de localisation via `@1EditLangJoint`.

```shell
callContract @1NewLangJoint {"Name": "account_not_access", "LocaleArr": ["en", "ja"], "ValueArr": ["Sorry, you do not have access to this action", "申し訳ありませんが、このアクションにアクセスする権限がありません"]}
```

### Étape 8 Modifier le contrat {#step-8-modify-the-contract}

Ensuite, nous devons modifier la section `conditions` du code source du contrat en ajoutant le code suivant aux `conditions`.

```text
conditions {
  if EcosysParam("new_record_account") != $key_id {
      warning LangRes("account_not_access")
  }
}
```

Appeler pour modifier le contrat @1EditContract, où `Id` est l'identifiant du contrat, `Value` est le code source du contrat.

```text
>callContract @1EditContract {"Id": 348, "Value": "contract NewRecord {\n    data {\n        Student string\n        Grade int\n        Class int\n        Mathematics int\n        Physics int\n        Literature int\n    }\n    func getScore(a b c int) map{\n        var m map\n        var overallScore int\n        overallScore = (a+b+c) / 3\n        m[\"overallScore\"] = overallScore\n        if overallScore >= $gradeTypeABest[\"min\"] && overallScore < $gradeTypeABest[\"max\"] {\n            m[\"score\"] = \"A+\"\n        }elif overallScore >= $gradeTypeA[\"min\"] && overallScore < $gradeTypeA[\"max\"] {\n            m[\"score\"] = \"A\"\n        }elif overallScore >= $gradeTypeBBest[\"min\"] && overallScore < $gradeTypeBBest[\"max\"] {\n            m[\"score\"] = \"B+\"\n        }elif overallScore >= $gradeTypeB[\"min\"] && overallScore < $gradeTypeB[\"max\"] {\n            m[\"score\"] = \"B\"\n        }elif overallScore >= $gradeTypeC[\"min\"] && overallScore < $gradeTypeC[\"max\"]{\n            m[\"score\"] = \"C\"\n        }else{\n            m[\"score\"] = \"Notset\"\n        }\n        return m\n    }\n    func safeJsonDecode(m string) map {\n        var res map\n        if Size(m) > 0 {\n            res = JSONDecode(m)\n        }\n        return res\n    }\n\n    conditions {\n        if EcosysParam(\"new_record_account\") != $key_id {\n            warning LangRes(\"account_not_access\")\n        }\n        if Size($Student) == 0 {\n            warning \"Student Can not be empty\"\n        }\n        if $Class <= 0{\n            warning \"Class cannot be less than or equal to zero\"\n        }\n         if $Grade <= 0{\n            warning \"Grade cannot be less than or equal to zero\"\n        }\n        if $Mathematics < 0 {\n            warning \"Mathematics cannot be less than zero\"\n        }\n        if $Physics < 0 {\n            warning \"Physics cannot be less than zero\"\n        }\n        if $Literature < 0 {\n            warning \"Literature cannot be less than zero\"\n        }\n        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{\n            warning \"Score cannot exceed 100\"\n        }\n        var app map\n        app = DBFind(\"@1applications\").Columns(\"id,ecosystem\").Where({\"ecosystem\": 18,\"name\":\"GradesRecorder\",\"deleted\":0}).Row()\n        if !app {\n            warning LangRes(\"@1app_not_found\")\n        }\n\n        var app_id int\n        app_id = Int(app[\"id\"])\n        $eId = Int(app[\"ecosystem\"])\n        $gradeBestType = AppParam(app_id, \"grade_best_type\", $eId)\n        $gradeTypeABest = safeJsonDecode(AppParam(app_id, \"grade_type_a+\", $eId))\n        $gradeTypeA = safeJsonDecode(AppParam(app_id, \"grade_type_a\", $eId))\n        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, \"grade_type_b+\", $eId))\n        $gradeTypeB = safeJsonDecode(AppParam(app_id, \"grade_type_b\", $eId))\n        $gradeTypeC = safeJsonDecode(AppParam(app_id, \"grade_type_c\", $eId))\n    }\n    action {\n        var m map \n        m = getScore($Mathematics,$Physics,$Literature)\n        var in map\n        in[\"student\"] = $Student\n        in[\"class\"] = $Class\n        in[\"grade\"] = $Grade\n        in[\"mathematics\"] = $Mathematics\n        in[\"physics\"] = $Physics \n        in[\"literature\"] = $Literature \n        in[\"overall_score\"] = m[\"overallScore\"]\n        in[\"score\"] = m[\"score\"]\n        in[\"created_at\"] = $time\n        DBInsert(\"@\"+ Str($eId)+\"grade_info\", in)\n    }\n}"}
```


#### Étape 9 Modifier les autorisations de la table de données {#step-9-modify-data-table-permissions}

Ici, nous devons modifier l'autorisation d'insertion de la table de données, l'autorisation d'origine `ContractConditions("MainCondition")` pour l'écréateur, et le paramètre de contrat `new_record_account` n'est pas l'écréateur.

Donc, il suffit de modifier `ContractConditions("MainCondition")` pour spécifier que le contrat peut opérer sur `ContractAccess("@18NewRecord")`.

Appelez le contrat `@1EditTable` pour modifier les autorisations de la table de données.

```text
>callContract @1EditTable {"Name": "@18grade_info", "InsertPerm": "ContractAccess(\"@18NewRecord\")", "UpdatePerm": "ContractConditions(\"MainCondition\")", "ReadPerm": "true", "NewColumnPerm": "ContractConditions(\"MainCondition\")"}
```

Ensuite, appelez le contrat que vous venez de modifier et créez un nouvel enregistrement.

```text
1  >callContract @18NewRecord {"Student": "tom", "Grade": 1, "Class": 1, "Mathematics": 18, "Physics": 57, "Literature": 93}
2  
3  {
4      "block_id": 1435,
5      "hash": "7d4b06d3738133f9c2ec775935478cd2d6c20fd04eca275769afd0f8e6a4f687",
6      "penalty": 1,
7      "err": "{\"type\":\"warning\",\"error\":\"Sorry, you do not have access to this action\"}"
8  }
```

Vous pouvez voir que le paramètre de localisation que nous venons de définir, `account_not_access`, fonctionne.

Nous avons constaté que l'erreur de permission est signalée, l'utilisateur actuel n'a pas l'autorisation d'effectuer des opérations. Nous passons au compte avec l'identifiant de clé `6667782293976713160` et nous pouvons obtenir les informations de l'utilisateur actuel à l'aide de l'outil en ligne de commande `account info`.

Configurez le fichier de configuration de l'outil en ligne de commande config.yml et passez au compte avec l'identifiant de clé `6667782293976713160`.

Une fois la configuration terminée, appelez à nouveau le contrat.


```text
>callContract @18NewRecord {"Student": "tini", "Grade": 1, "Class": 3, "Mathematics": 69, "Physics": 89, "Literature": 98}

{
    "block_id": 1436,
    "hash": "93327dafb7bae9f9f66718eb87020a7bca4c00060f4bd0a243b49eea304c52e6",
    "penalty": 0,
    "err": ""
}
```

L'appel est terminé, interrogeant la table de données via `getList @18grade_info`, et le résultat est conforme aux attentes.

Nous espérons que cet article vous a aidé à en savoir plus sur le fonctionnement du réseau IBAX et sur la façon d'écrire un code `Needle` clair et sécurisé.


## Déployer une application à l'aide d'outils en ligne de commande {#deploy-application-using-command-line-tools}

Dans ce tutoriel, vous apprendrez comment :

- 1. [Exporter une application](#export-application)
- 2. [Importer une application](#import-application)

Avant de commencer ce tutoriel, vous devez avoir votre propre application et connaître le concept d'écosystème et d'application. Vous pouvez vous référer au [Guide de démarrage](#getting-started-guide).

Nous importerons l'application sur la blockchain IBAX via l'outil en ligne de commande [ibax-cli](https://github.com/IBAX-io/ibax-cli). Exporter une application.


### Exporter l'application {#export-application}

 Appeler `account info` pour interroger les informations du compte actuel, ici le login ecid est `9`, appeler la commande `getList` pour interroger les applications associées à l'ecid actuel.

```shell
$ ibax-cli console
   
Welcome to the IBAX console!
To exit, press ctrl-d or type exit
>account info
{
    "public_key": "04d11ea197fe23152562c6f54c4...889c074dfd9080099982d8b2d4d100315e1cebc7",     
    "ecosystem_id": 9,
    "key_id": 6660819...78795186,
    "account": "0666-0819-...-7879-5186"
}

>getList @1applications -w={"ecosystem": 9}

{
    "count": 6,
    "list": [
        {
            "conditions": "true",
            "deleted": "0",
            "ecosystem": "9",
            "id": "36",
            "name": "testapp",
            "uuid": "00000000-0000-0000-0000-000000000000"
        }
        ...
    ]
}
```

Nous pouvons voir que l'écosystème actuel compte 6 applications. Nous utilisons la commande `export` pour exporter l'application avec l'`id` de `36`.

```shell
>export 36 -f=./data.json

{
    "name": "./data.json",
    "type": "application/json",
    "value": ""
}
```

Le paramètre -f ici enregistre l'application exportée dans le fichier `data.json` dans le répertoire actuel.
Si aucun paramètre -f n'est spécifié, les données de l'application seront affichées dans le terminal de commande.

La commande `export` encapsule les étapes pour exporter une application. Vous pouvez utiliser la commande ci-dessus pour exporter une application, ou suivre les étapes suivantes, comme suit :

Appeler le contrat `@1ExportNewApp` pour exporter une nouvelle application générera un enregistrement dans la table `1_buffer_data` pour l'application exportée.

```shell
>callContract @1ExportNewApp {"ApplicationId": 36}
```

Appelez le contrat `@1Export` pour exporter l'application, recherchez l'application sélectionnée dans la table `1_buffer_data`, et exportez toutes les ressources de l'application vers la chaîne JSON générée.

La chaîne JSON générée sera écrite dans la table `1_binaries` de l'écosystème actuel.

```shell
>callContract @1Export
```

Interrogez les données dans la table `1_binaries` avec la commande `getList`.

```shell
>getList @1binaries -w={"name": "export", "account": "0666-0819-...-7879-5186", "ecosystem": 9, "app_id": 36} -l=1 -c="id,hash"

{
    "count": 1,
    "list": [
        {
            "hash": "8542cb57b77e0ae2c...92c3e05dbbe35ab646789be5b8ba8",
            "id": "14"
        }
    ]
}
```

Obtenez l'identifiant binaire et le hachage.

Appelez la commande `binaryVerify` pour exporter le fichier binaire.

```shell
>binaryVerify 14 8542cb57b77e0ae2c...92c3e05dbbe35ab646789be5b8ba8 -f=./data.json

{
    "name": "./data.json",     
    "type": "application/json",
    "value": ""
}
```
 
### Importer l'application {#import-application}

Utilisez la commande `import` pour importer une application, avec le paramètre `-f` pour spécifier le fichier d'application à importer.

```shell
$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit

>import -f . /data.json
```

The `import` command encapsulates the steps to import an application, you can use the above command to import an application

Or use the following steps, which, for ease of study and research, are as follows:

- Étape 1 :
Appeler le contrat `@1ImportUpload` pour importer une nouvelle application générera un enregistrement dans la table `1_buffer_data` pour l'application exportée.
`@1ImportUpload` Le paramètre du contrat `Data` est `file` [type](../topics/vm.md#types).
Il contient les mots-clés `Name` pour le nom du fichier (chaîne de caractères), `MimeType` pour le type de fichier (chaîne de caractères), `Body` pour le contenu du fichier ([]byte).
Vous devez encoder en base64 les données du fichier de l'application et les passer dans `Body`, vous pouvez utiliser la commande `base64Encode` pour les encoder en base64.

```shell
>base64Encode -f=./data.json

Encode:ewoJIm5hbWUiOiAid...CQkJIlR5cGUiOiAiY29udHJhY3RzIiwKCQkJIk5hbWUiOiAiSGVsbG9Xb3JsZCIsCgkJCSJWYWx1ZSI6...

>callContract @1ImportUpload {"Data": {"Name": "filename", "MimeType": "mimeType", "Body": "ewoJIm5hbWUiOiAid...CQkJIlR5cGUiOiAiY29udHJhY3RzIiwKCQkJIk5hbWUiOiAiSGVsbG9Xb3JsZCIsCgkJCSJWYWx1ZSI6..."}}
```

- Étape 2 :
Après que l'appel est terminé, utilisez la commande `getList` pour interroger les données dans la table `1_buffer_data`.

```shell
>getList @1buffer_data -w={"key": "import", "account": "0666-0819-xxxx-7879-5186", "ecosystem": 19} -l=1 -c=value->'data'

{
    "count": 1,
    "list": [
        {
            "id": "22",
            "value.data": "[{"Data": "[a,b]"}, {"Data": "[c,d]"}]"
        }
    ]
}
```

- Étape 3 :
Assemblez les données de value.data->Data dans un tableau unidimensionnel, [a,b,c,d].
Ensuite, créez un fichier de paramètres de contrat `importParams.json`, avec le contenu suivant :

```json
{"Data":"[a,b,c,d]"}
```

- Étape 4 : Appelez le contrat `@1Import` pour importer les données de l'application.

```shell
>callContract @1Import -f=./importParams.json
```


## Configuration écologique à l'aide d'un outil en ligne de commande {#ecosystem-configuration-using-command-line-tool}

Dans ce tutoriel, vous apprendrez comment :

- 1. [Postuler pour rejoindre l'écosystème](#apply-to-join-the-ecosystem)
- 2. [Ajouter des membres de l'écosystème](#add-ecosystem-members)
- 3. [Gestion des rôles](#role-management)
- 4. [Émission de jetons](#issuance-of-token) 
- 5. [Déduction écologique](#eco-deduction)
- 6. [Écosystème de gouvernance DAO](#dao-governance-ecosystem)

Avant de commencer ce tutoriel, vous devez avoir votre propre application et connaître le concept d'écosystème et d'application. Vous pouvez vous référer au [Guide de démarrage](#getting-started-guide).

Nous allons effectuer la configuration écologique sur la blockchain IBAX via l'outil en ligne de commande [ibax-cli](https://github.com/IBAX-io/ibax-cli).

### Postuler pour rejoindre l'écosystème{#apply-to-join-the-ecosystem}

Nous pouvons appeler le contrat `@1MembershipRequest` pour demander à rejoindre l'écosystème.

L'exemple suivant:

```shell
>callContract @1MembershipRequest {"EcosystemId": 19}
```

Demande de rejoindre l'écosystème avec l'identifiant écologique `19`, le contrat `@1MembershipRequest` impose une restriction sur l'appel de l'écosystème, seul l'écosystème de base peut être appelé.

Lorsque la demande est acceptée, le gestionnaire de l'écosystème cible recevra une demande et elle ne sera considérée comme faisant partie de l'écosystème cible que lorsque la demande sera approuvée par le gestionnaire de l'écosystème.

Bien sûr, si l'écosystème cible est public, vous pouvez le rejoindre directement.

### Ajouter des membres de l'écosystème {#add-ecosystem-members}

Lorsque l'écosystème vient d'être créé, le seul membre de l'écosystème est le créateur de l'écosystème. Lorsque vous souhaitez inviter d'autres membres à rejoindre, vous devez connaître la clé publique de la personne invitée, puis appeler le contrat `@1MembershipAdd` pour ajouter des membres.

```shell
>callContract @1MembershipAdd {"Keys": "04f2c1780ca0aa0f343d0e541c77811...3b0d5bf3a9903253aad6e78c966b5f91ffb32703884020"}
```

Si l'écosystème est public et permet à n'importe qui de rejoindre, vous pouvez définir le paramètre de l'écosystème `free_membership` = 1, qui n'est pas public par défaut.

Une fois configuré, vous n'avez pas besoin d'être approuvé pour rejoindre votre écosystème.

```shell
>callContract @1NewParameter {"Name": "free_membership", "Value": "1", "Conditions": "ContractConditions(\"MainCondition\")"}
```

Si vous ne définissez pas le paramètre `free_membership`, lorsque d'autres membres demandent à rejoindre votre écosystème, vous recevrez une notification de demande.

Appelez l'application d'approbation du contrat `@1MembershipDecide`, les paramètres du contrat `NotificId` sont l'identifiant de la notification, 'Accept' est la marque de résolution, la marque de résolution `1` est acceptée.

```shell
>callContract @1MembershipDecide {"NotificId": 6, "Accept": 1}
```

#### Blocage des comptes {#freezing-of-accounts}

Appeler le contrat `@1DeleteMember` pour geler le compte, notez que cette opération ne peut pas être restaurée.

```shell
>callContract @1DeleteMember {"MemberAccount": "1539-2715-xxxx-1679-5385"}
```

### Gestion des rôles {#role-management}

- [Création d'un nouveau rôle](#new-role-creation)
- [Ajouter un membre au rôle](#adding-role-members)
- [Supprimer un membre du rôle](#delete-role-members)
- [Modifier le gestionnaire du rôle](#modify-role-manager)
- [Supprimer le rôle](#delete-role)

#### Création d'un nouveau rôle {#new-role-creation}

Appeler le contrat `@1RolesCreate` pour créer un nouveau rôle, nom du rôle `student`, type `2` (1 - Assignable 2 - Élu par vote 3 - Système).

```shell
>callContract @1RolesCreate {"Name": "student", "Type": 2}
{
    "block_id": 1685,
    "hash": "5321f2231a...d0d80158b62766395f14d0ff7",
    "penalty": 0,
    "err": "21"
}
```
Le résultat de retour contient l'identifiant de rôle `21`.

#### Ajout de membres de rôle {#adding-role-members}

Il existe deux méthodes, la première méthode consiste à ce que le membre de l'écosystème initie la demande d'application en appelant le contrat `@1RolesRequest` pour demander à être ajouté en tant que membre du rôle, où `Rid` est l'identifiant du rôle.

```shell
>callContract @1RolesRequest {"Rid": 21}
```

Dans la deuxième méthode, le gestionnaire de rôles attribue des membres de rôle, et le gestionnaire de rôles appelle le contrat `@1RolesAssign` pour ajouter des membres au rôle.

```shell
>callContract @1RolesAssign {"MemberAccount": "0666-7782-xxxx-7671- 3160", "Rid": 21}
```

#### Supprimer les membres du rôle {#delete-role-members}

Tout d'abord, nous voyons quels membres un rôle possède, que nous pouvons interroger via getList, comme suit:

```shell
>getList @1roles_participants -w={"ecosystem": 18, "role->id": "21", "deleted": 0}

{
    "count": 3,
    "list": [
        {
            "appointed": "{\"account\": \"1273-2644-xxxx-5846-6598\", \"image_id\": \"0\", \"member_name\": \"founder\"}",
            "date_created": "1684916023",
            "date_deleted": "0",
            "deleted": "0",
            "ecosystem": "18",
            "id": "21",
            "member": "{\"account\": \"1273-2644-xxxx-5846-6598\", \"image_id\": \"0\", \"member_name\": \"founder\"}",
            "role": "{\"id\": \"20\", \"name\": \"teacher\", \"type\": \"1\", \"image_id\": \"0\"}"
        }
        ...
    ]
}
```

Où la condition `where` `ecosystem` spécifie l'écosystème, `role->id` spécifie l'identifiant du rôle et `deleted`: 0 spécifie non supprimé.

Nous pouvons voir que nous avons 3 lignes, si nous voulons supprimer le rôle avec le membre `1273-2644-xxxx-5846-6598`, c'est-à-dire le rôle avec l'`id` de `21`.

Les administrateurs peuvent appeler le contrat `@1RolesUnassign` pour supprimer les membres du rôle, comme suit:

```shell
>callContract @1RolesUnassign {"RowId": 21}
```

#### Modifier le gestionnaire de rôles {#modify-role-manager}

Regardons les rôles écologiques actuels :

```shell
>getList @1roles -w={"ecosystem": 18}

{
    "count": 5,
    "list": [
        {
            "company_id": "0",
            "creator": "{\"account\": \"1273-2644-xxxx-5846-6598\", \"image_id\": \"0\", \"member_name\": \"founder\"}",
            "date_created": "1684910917",
            "date_deleted": "0",
            "default_page": "",
            "deleted": "0",
            "ecosystem": "18",
            "id": "20",
            "image_id": "0",
            "role_name": "teacher",
            "role_type": "1",
            "roles_access": "[]"
        }
        ...
    ]
}
```

où `roles_access` est le rôle administratif pour le rôle actuel, qui est un tableau et peut en avoir plusieurs.

Nous ajoutons un rôle administratif au rôle `teacher` en appelant le contrat `@1RolesAccessManager`, où les paramètres du contrat sont `Action` l'opérateur administratif (`clean`, `remove`, `add`), `Rid` l'ID du rôle à gérer, `ManagerRid` l'ID du gestionnaire de rôle.

```shell
>callContract @1RolesAccessManager {"Action": "add", "Rid": 20, "ManagerRid": 13}

{
    "block_id": 1745,
    "hash": "e2eb8ff0dc309ec7652db...bbbe58bca4ca574804e46c2f63653eb73104",
    "penalty": 0,
    "err": ""
}
```

#### Supprimer le rôle {#delete-role}

Nous pouvons appeler le contrat `@1RolesDelete` pour supprimer des rôles, où les paramètres du contrat `Rid` sont l'ID du rôle à gérer et `Ops` est l'opérateur (`D` pour supprimer, `R` pour restaurer).

```shell
>callContract @1RolesDelete {"Rid": 24, "Ops": "D"}

{
    "block_id": 1785,
    "hash": "1ebf99a04f504fc3d2...4ecfbdfc419bf3dbf39df0013dca913f844",
    "penalty": 0,
    "err": ""
}
```


### Émission de jeton {#issuance-of-token}

- [Créer un écosystème](#create-ecosystem)
- [Installer des applications de base](#installing-basic-applications)
- [Émission de jetons](#token-issuance)

#### Créer un écosystème {#create-ecosystem}

Créez un écosystème, appelez le contrat `@1NewEcosystem`.

```shell
>callContract @1NewEcosystem {"Name": "Test Ecosystem"}
{
    "block_id": 1787,
    "hash": "384f35ef93243c9dd4f53b9298873b356b25b31cf7c6a6be7600ee7694d77006",
    "penalty": 0,
    "err": "21"
}
```

Ensuite, nous modifions la configuration de l'outil en ligne de commande pour se connecter à cet écosystème nouvellement créé : "21".

#### Installation des applications de base {#installing-basic-applications}

Appelez le contrat pour installer l'application de base, comme suit :

```shell
1  >callContract @1PlatformAppsInstall
2  >callContract @1RolesInstall
3  >callContract @1AppInstall {"ApplicationId": 5}
4  >callContract @1AppInstall {"ApplicationId": 6}
```
Ligne 1, installez l'application de plateforme ;

Ligne 2, installez le rôle par défaut ;

Ligne 3-4, installez l'application de configuration écologique et d'émission de jetons, où l'ID de l'application `5,6` peut être consulté via getList comme suit :

```shell
>getList @1applications -w={"ecosystem": 1, "$or": [{"name": "Token emission"},{"name": "Ecosystems catalog"}]} -c="name,ecosystem"

{
    "count": 2,
    "list": [
        {
            "ecosystem": "1",
            "id": "5",
            "name": "Token emission"
        },
        {
            "ecosystem": "1",
            "id": "6",
            "name": "Ecosystems catalog"
        }
    ]
}
```
 
#### Émission de jetons {#token-issuance}

Parce qu'il s'agit d'un nouvel écosystème, vous devez configurer l'émission de jetons, appelez le contrat `@1TeSettings` pour spécifier les rôles pouvant émettre des jetons.

```shell
>callContract @1TeSettings {"RoleDeveloper": 30}
```

Où `RoleDeveloper` est l'identifiant actuel du rôle écologique, qui peut être obtenu via la table de données `@1roles`.


**Émission de jetons** Appeler le contrat `@1NewToken` pour émettre des jetons.

```shell
>callContract @1NewToken {"Symbol": "TEST", "Name": "TEST Coin", "Amount": "10000000000000000" ,"Digits": "12"}
```

Où les paramètres du contrat `Symbol` sont le symbole du jeton, `Name` est le nom du jeton, `Amount` est le montant total et `Digits` est la précision.

**Émission de jetons**

```shell
>callContract @1TeEmission {"Amount": 1000000000000}
```

**Détruire les jetons**

```shell
>callContract @1TeBurn {"Amount": 1000000000000}
```

Incrément de jeton par défaut et destruction de jeton sont autorisés, vous pouvez les désactiver en utilisant `@1TeChange`, où `TypeChange` est le type (`emission` pour l'incrément, `withdraw` pour la destruction).

`Value` est l'état activé/désactivé (`1` activé, `2` désactivé), par exemple:
**Ajouts fermés**.

Note: Ne peut pas être activé après la fermeture.

```shell
>callContract @1TeChange {"TypeChange": "emission", "Value": 2}
```

**Désactiver la destruction**, si vous souhaitez réactiver la destruction, il suffit de définir la valeur de `Value` sur `1`.

```shell
>callContract @1TeChange {"TypeChange": "withdraw", "Value": 2}
```

### Déduction de l'écosystème {#eco-deduction}

Avant de mettre en place des déductions écologiques, vous devez comprendre le modèle de frais IBAX, qui peut être trouvé dans le [livre blanc](https://github.com/IBAX-io/whitepaper).

Nous commençons par définir l'adresse du portefeuille écologique, appelons le contrat `@1EditParameter` et modifions les paramètres écologiques.

```shell
>callContract @1EditParameter {"Id": 334, "Value": "1273-2644-xxxx-5846-6598"}
```

Où `Id` est l'identifiant du paramètre `ecosystem_wallet` de l'ecowallet, qui peut être interrogé comme suit :

```shell
>getList @1parameters -w={"ecosystem": 22, "name": "ecosystem_wallet"}
```

La valeur `Value` est l'adresse de l'ecowallet qui sera liée, et le contrat génère les frais de gaz, qui sont payés par cette adresse. L'adresse doit avoir suffisamment de jetons dans l'écosystème actuel et doit être approuvée par l'adresse liée avant que la modification ne soit réussie.

Appeler le contrat `@1EcoFeeModeManage` pour configurer la déduction multi-écologique, comme suit :

```shell
>callContract @1EcoFeeModeManage {"FollowFuel": 0.01, "CombustionFlag": 1, "VmCostFlag": 2, "VmCostConversionRate": 100, "StorageConversionRate": 100, "StorageFlag": 2, "ExpediteFlag": 1}
```

Où les champs de paramètres du contrat sont définis comme suit :

- Le paramètre `FollowFuel` est un multiple du taux d'éco-suivi 1.
- `CombustionFlag` indique s'il faut activer la combustion des frais de gaz d'éco-échange, 1 - non, 2 - oui.
- `CombustionPercent` est le pourcentage de combustion, uniquement valable lorsque la combustion des frais de gaz est activée, prend des valeurs de 1 à 100, 0 lorsque ce n'est pas activé.
- `VmCostFlag` est le drapeau des coûts de VM, définissant le paiement direct ou par procuration, 1 - paiement direct, 2 - paiement par procuration.
- `StorageFlag` est le drapeau des frais de stockage, définissant le paiement direct ou par procuration, 1 - paiement direct, 2 - paiement par procuration.
- `ExpediteFlag` est le drapeau des frais d'expédition accélérée, définissant le paiement direct ou par procuration, 1 - paiement direct, 2 - paiement par procuration.
- `VmCostConversionRate` est le taux de conversion des coûts de la machine virtuelle, avec 2 décimales, uniquement valable pour les paiements par procuration, supérieur à zéro.
- `StorageConversionRate` est le taux de conversion des coûts de stockage, avec 2 décimales, uniquement valable pour les paiements par procuration, supérieur à zéro.

Si vous utilisez les paramètres ci-dessus, tous les frais de transaction encourus par les utilisateurs invoquant des contrats au sein de l'écosystème seront payés par le portefeuille écologique de la configuration écologique actuelle.

Tous les utilisateurs n'ont besoin de payer que les frais de gaz encourus au sein de l'écosystème. Bien sûr, vous pouvez ajuster les paramètres de coût selon vos besoins réels.


### Écosystème de gouvernance DAO {#dao-governance-ecosystem}

Avant de modifier vers un écosystème de gouvernance DAO, vous devez vous assurer que l'écosystème actuel a émis des jetons, et après la modification vers un écosystème de gouvernance DAO, toutes les propositions de l'écosystème seront soumises au vote des membres du comité de gouvernance.

Le Conseil de gouvernance DAO n'est plus géré uniquement par les développeurs de l'écosystème, mais les 50 principaux représentants des détenteurs de l'écosystème sont élus.


Call the `@1EditControlMode` contract to change the eco governance mode to DAO governance mode.
```shell
>callContract @1EditControlMode {"Value": 2}
```

Où le paramètre `Value` `1` représente le modèle du créateur et `2` représente le modèle de gouvernance DAO.

Nous pouvons essayer de créer une application.

```shell
>callContract @1NewApplication {"Name": "testApp", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
```

À ce stade, une proposition de gouvernance DAO est générée et votée par le Conseil de gouvernance de la DAO avant la création de l'application. Une proposition valide nécessite un taux d'approbation de 68% sur 75% des votes exprimés.

Le champ d'application de la gouvernance DAO comprend :

1. Ajouter, supprimer et modifier des applications, des contrats, des pages, des extraits de code, des onglets, des menus, des paramètres d'application, des tables de données et des champs.
2. Modifier le multilingue.
3. Changer le modèle de DAO et de créateur.
4. Modifier les paramètres écologiques.
5. Rôle, assigner ou supprimer des membres de rôle.
6. Émettre une monnaie de destruction supplémentaire.
7. Modifier les paramètres de la plateforme.
8. Modifier les informations écologiques.
9. Modification des contrats différés.
10. Modifier le modèle de vote.
 

## Déployer des applications à l'aide d'un outil d'emballage d'applications {#deploy-applications-using-application-packaging-tool}

Avant de commencer ce tutoriel, vous devez télécharger [Outil de conditionnement d'application IBAX](https://github.com/IBAX-io/app-tool). Nous devons utiliser cet outil pour empaqueter l'application IBAX.

Nous devons stocker les fichiers de l'application selon la structure de répertoire suivante :

```text
- APP Name
    - app_params
        params1.csv
        params2.csv
        ...
    - contracts
        contract1.sim
        contract2.sim
        ...
    - tables
        tableName1.json
        tableName2.json
        ...
    config.json
```

Comme indiqué ci-dessous:

```shell
airdrop$ ls *
config.json

app_params:
dedicated_account.csv  lock_percent.csv  per_period_sec.csv  period_count.csv

contracts:
AddAirdrop.sim  ClaimAirdrop.sim  SpeedAirdrop.sim

tables:
airdrop_info.json
```

Le répertoire `app_params` stocke le fichier des paramètres de l'application, nommé en utilisant le nom du paramètre + le format de fichier `.csv`, le contenu du fichier étant la valeur du paramètre.

Le répertoire `contracts` contient les contrats, au format de fichier `.sim`, et le contenu du fichier est le code source du contrat.

Le répertoire `tables` contient la structure de la table de données de l'application au format de fichier `json`, comme suit:

```json
[
  { "name": "account", "conditions": "{\"read\": \"true\", \"update\": \"ContractConditions(\"MainCondition\")\"}", "type": "varchar" },
  { "name": "balance_amount", "conditions": "true", "type": "money"},
  { "name": "stake_amount", "conditions": "true", "type": "money"},
  { "name": "surplus", "conditions": "true", "type": "number"},
  { "name": "total_amount", "conditions": "true", "type": "money"}
]
```

`name` est le nom du champ du tableau de données, `conditions` est la permission du champ du tableau de données, et `type` est le type de champ.

À l'étape 1, nous générons un fichier config.json et le sauvegardons dans le répertoire airdrop avec le contenu suivant :

```text
{
    "name": "Airdrop",
    "conditions": "ContractConditions(\"@1MainCondition\")"
}
```

Là où `name` est le nom de l'application, `conditions` : est l'autorisation de modifier l'application, puis l'enregistrer dans le répertoire airdrop.

Étape 2, empaquetez l'application, la commande suivante générera l'application `airdrop.json` dans le répertoire actuel. Si vous modifiez le contrat ou les paramètres de l'application, vous devez reconditionner l'application.

```shell
$ ./app-tool airdrop/
```

Nous pouvons importer l'application via l'outil en ligne de commande [command line tool](https://github.com/IBAX-io/ibax-cli) comme suit :

Utilisez la commande `import` pour importer une application, avec le paramètre `-f` pour spécifier le fichier d'application à importer.

```shell
$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit

>import -f ./airdrop.json
```

Bien sûr, si vous avez une application, vous pouvez également générer la structure complète du répertoire avec la commande suivante:

 ```shell
$ app-tool.exe airdrop.json
```

