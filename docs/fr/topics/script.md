# Contrats intelligents {#smart-contracts}
  - [Structure du contrat](#contract-structure)
    - [Section des données](#data-section)
    - [Section des conditions](#conditions-section)
    - [Section des actions](#action-section)
  - [Variables](#variables)
  - [Contrats imbriqués](#nested-contracts)
  - [Téléchargement de fichiers](#file-upload)
  - [Requêtes au format JSON](#queries-in-json-format)
  - [Requêtes avec des opérations de date et d'heure](#queries-with-date-and-time-operations)
  - [Langage du contrat NEEDLE](#needle-contract-language)
    - [Éléments de base et structure](#basic-elements-and-structure)
    - [Types de données et variables](#data-types-and-variables)
    - [Tableau](#array)
    - [Instructions If et While](#if-and-while-statements)
  - [Fonctions](#functions)
    - [Déclaration de fonction](#function-declaration)
    - [Paramètres de longueur variable](#variable-length-parameters)
    - [Paramètres facultatifs](#optional-parameters)
  - [Classification des fonctions Needle](#needle-functions-classification)
  - [Référence des fonctions Needle](#needle-functions-reference)
    - [AppParam](#appparam)
    - [DBFind](#dbfind)
    - [DBRow](#dbrow)
    - [DBSelectMetrics](#dbselectmetrics)
    - [EcosysParam](#ecosysparam)
    - [GetHistory](#gethistory)
    - [GetHistoryRow](#gethistoryrow)
    - [GetColumnType](#getcolumntype)
    - [GetDataFromXLSX](#getdatafromxlsx)
    - [GetRowsCountXLSX](#getrowscountxlsx)
    - [LangRes](#langres)
    - [GetBlock](#getblock)
    - [DBInsert](#dbinsert)
    - [DBUpdate](#dbupdate)
    - [DBUpdateExt](#dbupdateext)
    - [DelColumn](#delcolumn)
    - [DelTable](#deltable)
    - [Append](#append)
    - [Join](#join)
    - [Split](#split)
    - [Len](#len)
    - [Row](#row)
    - [One](#one)
    - [GetMapKeys](#getmapkeys)
    - [SortedKeys](#sortedkeys)
    - [CallContract](#callcontract)
    - [ContractAccess](#contractaccess)
    - [ContractConditions](#contractconditions)
    - [EvalCondition](#evalcondition)
    - [GetContractById](#getcontractbyid)
    - [GetContractByName](#getcontractbyname)
    - [RoleAccess](#roleaccess)
    - [TransactionInfo](#transactioninfo)
    - [Throw](#throw)
    - [ValidateCondition](#validatecondition)
    - [AddressToId](#addresstoid)
    - [IdToAddress](#idtoaddress)
    - [PubToID](#pubtoid)
    - [DecodeBase64](#decodebase64)
    - [EncodeBase64](#encodebase64)
    - [Float](#float)
    - [HexToBytes](#hextobytes)
    - [FormatMoney](#formatmoney)
    - [Random](#random)
    - [Int](#int)
    - [Hash](#hash)
    - [Sha256](#sha256)
    - [Str](#str)
    - [JSONEncode](#jsonencode)
    - [JSONEncodeIndent](#jsonencodeindent)
    - [JSONDecode](#jsondecode)
    - [HasPrefix](#hasprefix)
    - [Contains](#contains)
    - [Replace](#replace)
    - [Size](#size)
    - [Sprintf](#sprintf)
    - [Substr](#substr)
    - [ToLower](#tolower)
    - [ToUpper](#toupper)
    - [TrimSpace](#trimspace)
    - [Floor](#floor)
    - [Log](#log)
    - [Log10](#log10)
    - [Pow](#pow)
    - [Round](#round)
    - [Sqrt](#sqrt)
    - [StringToBytes](#stringtobytes)
    - [BytesToString](#bytestostring)
    - [SysParamString](#sysparamstring)
    - [SysParamInt](#sysparamint)
    - [DBUpdateSysParam](#dbupdatesysparam)
    - [UpdateNotifications](#updatenotifications)
    - [UpdateRolesNotifications](#updaterolesnotifications)
    - [HTTPRequest](#httprequest)
    - [HTTPPostJSON](#httppostjson)
    - [BlockTime](#blocktime)
    - [DateTime](#datetime)
    - [UnixDateTime](#unixdatetime)
    - [CreateOBS](#createobs)
    - [GetOBSList](#getobslist)
    - [RunOBS](#runobs)
    - [StopOBS](#stopobs)
    - [RemoveOBS](#removeobs)
  - [Contrats intelligents du système](#system-contracts)
    - [NewEcosystem](#newecosystem)
    - [EditEcosystemName](#editecosystemname)
    - [NewContract](#newcontract)
    - [EditContract](#editcontract)
    - [BindWallet](#bindwallet)
    - [UnbindWallet](#unbindwallet)
    - [NewParameter](#newparameter)
    - [EditParameter](#editparameter)
    - [NewMenu](#newmenu)
    - [EditMenu](#editmenu)
    - [AppendMenu](#appendmenu)
    - [NewPage](#newpage)
    - [EditPage](#editpage)
    - [AppendPage](#appendpage)
    - [NewBlock](#newblock)
    - [EditBlock](#editblock)
    - [NewTable](#newtable)
    - [EditTable](#edittable)
    - [NewColumn](#newcolumn)
    - [EditColumn](#editcolumn)
    - [NewLang](#newlang)
    - [EditLang](#editlang)
    - [Import](#import)
    - [ImportUpload](#importupload)
    - [NewAppParam](#newappparam)
    - [EditAppParam](#editappparam)
    - [NewDelayedContract](#newdelayedcontract)
    - [EditDelayedContract](#editdelayedcontract)
    - [UploadBinary](#uploadbinary)


Le contrat intelligent (ci-après dénommé le contrat) est l'un des éléments de base d'une application. L'implémentation d'un contrat sur une page par l'utilisateur est généralement une opération unique dont le but est de mettre à jour ou de créer une entrée dans une base de données. Toutes les opérations de données d'une application forment un système de contrats, et ces contrats interagissent les uns avec les autres grâce aux fonctions de contenu de la base de données ou du contrat.

## Structure du contrat {#contract-structure}

Utilisez le mot-clé `contract` pour déclarer un contrat, suivi du nom du contrat, et le contenu du contrat doit être enclos entre des accolades. Un contrat se compose principalement de trois sections :

1. **data** - [section des données](#data-section), où sont déclarées les variables des données d'entrée, y compris le nom de la variable et le type de la variable ;

2. **conditions** - [section des conditions](#conditions-section), où l'on vérifie la justesse des données ;

3. **action** - [section des actions](#action-section), où l'on définit les manipulations des données.

```
contract MyContract {
  data {
    FromId int
    ToId int
    Amount money
  }
  func conditions {
    ...
  }
  func action {
    ...
  }
}
```



### Section des données {#data-section}

La section `data` décrit les entrées de données du contrat et les paramètres de formulaire reçus.

La structure de chaque ligne par séquence :

* Nom de la variable - ne reçoit que des variables, pas des tableaux ;
* Type de données de la variable - le [type de données](#data-types-and-variables) de la variable ;
* optionnel - un paramètre facultatif qui n'a pas besoin d'être rempli dans l'élément de formulaire.

```
contract my {
  data {
  Name string
  RequestId int
  Photo file "optional"
  Amount money
  Private bytes
  }
  ...
}
```



### Section des conditions {#conditions-section}

La section "conditions" décrit la validation des données reçues.

Les commandes suivantes sont utilisées pour les avertissements d'erreur : erreurs graves `error`, erreurs avertissement `warning`, erreurs suggestives `info`. Ces trois commandes généreront une erreur qui mettra fin à l'exécution des contrats, et chaque erreur affichera un type différent d'informations de journal d'erreur. Par exemple :

```
if fuel == 0 {
    error "fuel cannot be zero!"
}
if money < limit {
    warning Sprintf("You don't have enough money: %v <%v", money, limit)
}
if idexist > 0 {
    info "You have already been registered"
}
```

### Section d'action {#action-section}

La section "action" décrit le code principal du contrat, qui récupère d'autres données et enregistre les valeurs de résultat dans des tables. Par exemple:

```
action {
DBUpdate("keys", $key_id, {"-amount": $amount})
DBUpdate("keys", $recipient, {"+amount": $amount, "pub": $Pub})
}
```



## Variables {#variables}

Les variables déclarées dans la section des données sont transmises aux autres sections du contrat via le symbole `$` suivi du nom de la variable. Le symbole `$` peut également être utilisé pour déclarer d'autres variables qui ne se trouvent pas dans la section des données, et qui sont considérées comme des variables globales de ce contrat et de tous les contrats dans lesquels ce contrat est imbriqué.

Des variables prédéfinies peuvent être utilisées dans les contrats, elles contiennent les données de transaction qui ont appelé le contrat :

* `$time` - horodatage de la transaction;
* `$ecosystem_id` - ID de l'écosystème;
* `$block` - ID du bloc contenant la transaction;
* `$key_id` - adresse du compte ayant signé la transaction actuelle;
* `$type` - ID du contrat dans la machine virtuelle;
* `$block_key_id` - adresse du compte du nœud ayant généré le bloc;
* `$block_time` - horodatage de génération du bloc;
* `$original_contract` - nom du contrat qui a initialement traité la transaction. Cela signifie que le contrat est appelé lors de la validation de la transaction si la variable est une chaîne vide. Pour vérifier si le contrat est appelé par un autre contrat ou directement par la transaction, vous devez comparer les valeurs de $original_contract et $this_contract. Cela signifie que le contrat est appelé par la transaction s'ils sont égaux;
* `$this_contract` - nom du contrat actuellement en cours d'exécution;
* `$guest_key` - adresse du compte invité;
* `$stack` - pile de tableaux de contrats avec un type de données de tableau, contenant tous les contrats exécutés. Le premier élément du tableau représente le nom du contrat actuellement en cours d'exécution, tandis que le dernier élément représente le nom du contrat qui a initialement traité la transaction;
* `$node_position` - le numéro d'index du tableau de nœuds de vérification où se trouve le bloc;
* `$txhash` - hachage de la transaction;
* `$contract` - tableau de structure de contrat actuel.

Les variables prédéfinies peuvent être utilisées non seulement dans les contrats, mais aussi dans les champs de permission qui définissent les conditions d'accès des éléments de l'application. Lorsqu'elles sont utilisées dans les champs de permission, les variables prédéfinies pour les informations de bloc sont toujours égales à zéro, telles que `$time`, `$block`, etc.

Une variable prédéfinie `$result` est assignée avec le résultat de retour du contrat.

```
contract my {
 data {
     Name string
     Amount money
 }
 func conditions {
     if $Amount <= 0 {
     error "Amount cannot be 0"
     }
     $ownerId = 1232
 }
 func action {
     var amount money
     amount = $Amount - 10
     DBUpdate("mytable", $ownerId, {name: $Name,amount: amount})
     DBUpdate("mytable2", $ownerId, {amount: 10})
 }
}
```

## Contrats imbriqués {#nested-contracts}

Vous pouvez imbriquer des contrats dans les sections des conditions et des actions du contrat. Les contrats imbriqués peuvent être appelés directement, et les paramètres du contrat sont spécifiés entre parenthèses après le nom du contrat, par exemple, `@1NomContrat(Paramètres)`. Vous pouvez également appeler des contrats imbriqués avec la fonction [CallContract](#callcontract).

## Téléchargement de fichier {#file-upload}

Pour télécharger un fichier en utilisant un formulaire au format `multipart/form-data`, le type de données du contrat doit être `file`.

```
contract Upload {
     data {
  	   File file
     }
     ...
}
```

Le contrat [UploadBinary](#uploadbinary) est utilisé pour télécharger et stocker des fichiers. Avec la fonction [Binary](templates2.md#binary) du langage Logicor dans l'éditeur de page, vous pouvez obtenir le lien de téléchargement du fichier.

## Requêtes au format JSON {#queries-in-json-format}

Dans le langage du contrat, **JSON** peut être spécifié comme type de champ. Vous pouvez utiliser la syntaxe : **columnname->fieldname** pour traiter le champ d'entrée. La valeur obtenue est enregistrée dans **columnname.fieldname**. La syntaxe ci-dessus peut être utilisée dans les colonnes, les conditions et les clauses "Where" de la fonction [DBFind](#dbfind).

```
var ret map
var val str
var list array
ret = DBFind("mytable").Columns("myname,doc,doc->ind").WhereId($Id).Row()
val = ret["doc.ind"]
val = DBFind("mytable").Columns("myname,doc->type").WhereId($Id).One("doc->type")
list = DBFind("mytable").Columns("myname,doc,doc->ind").Where("doc->ind = ?", "101")
val = DBFind("mytable").WhereId($Id).One("doc->check")
```



## Requêtes avec des opérations de date et d'heure {#queries-with-date-and-time-operations}

Vous ne pouvez pas interroger directement et mettre à jour la date et l'heure avec les fonctions du langage de contrat, mais vous pouvez utiliser les fonctions et fonctionnalités de PostgreSQL dans la clause Where comme dans l'exemple ci-dessous. Par exemple, vous devez comparer le champ date_column avec l'heure actuelle. Si date_column est de type timestamp, l'expression devrait être `date_column < NOW()`; si date_column est de type Unix, l'expression devrait être `to_timestamp(date_column) > NOW()`.

```
Where("to_timestamp(date_column)> NOW()")
Where("date_column <NOW() - 30 * interval '1 day'")
```

La fonction Needle suivante est utilisée pour traiter la date et l'heure au format SQL :

* [BlockTime](#blocktime)
* [DateTime](#datetime)
* [UnixDateTime](#unixdatetime)

## Langage du contrat NEEDLE {#needle-contract-language}

Le langage du contrat comprend un ensemble de fonctions, d'opérateurs et de structures, qui permettent de réaliser le traitement algorithmique des données et les opérations de base de données.

Le contenu du contrat peut être modifié si l'autorisation de modification du contrat n'est pas définie sur "fausse". L'historique complet des modifications du contrat est stocké dans la blockchain, ce qui est disponible dans Weaver.

Les opérations de données dans la blockchain sont exécutées conformément à la dernière version du contrat.

### Éléments de base et structure {#basic-elements-and-structure}

### Types de données et variables {#data-types-and-variables}

Le type de données doit être défini pour chaque variable. Normalement, les types de données sont convertis automatiquement. Les types de données suivants peuvent être utilisés :

* `bool` - Booléen, `true` ou `false`;
* `bytes` - un format de byte;
* `Int` - un entier sur 64 bits;
* `Array` - un tableau de n'importe quel type;
* `map` - un tableau d'objets;
* `money` - un grand entier;
* `float` - un nombre à virgule flottante sur 64 bits;
* `string` - une chaîne de caractères doit être définie avec des guillemets doubles ou un format d'échappement : "Ceci est une chaîne de caractères" ou \`Ceci est une chaîne de caractères\`;
* `file` - un tableau d'objets :
  * `Name` - nom du fichier, de type `string`;
  * `MimeType` - type MIME du fichier, de type `string`;
  * `Body` - contenu du fichier, de type `bytes`.

Tous les identifiants, y compris les noms de variables, de fonctions et de contrats, sont sensibles à la casse (MyFunc et myFunc sont des noms différents).

Utilisez le mot-clé **var** pour déclarer une variable, suivi du nom et du type de la variable. Les variables déclarées entre accolades doivent être utilisées dans la même paire d'accolades.

La valeur par défaut de toute variable déclarée est zéro : la valeur zéro du type booléen est false, la valeur zéro de tous les types numériques est 0, et la valeur zéro pour les chaînes de caractères est une chaîne vide. Un exemple de déclaration de variable :

```
func myfunc( val int) int {
  var mystr1 mystr2 string, mypar int
  var checked bool
  ...
  if checked {
    var temp int
    ...
  }
}
```



### Tableau {#array}

Le langage du contrat prend en charge deux types de tableaux :
* `Array` - un tableau dont l'index commence à 0 ;
* `map` - un tableau d'objets.

Lors de l'allocation et de la récupération des éléments d'un tableau, l'indice doit être placé entre crochets. Les index multiples ne sont pas pris en charge dans le tableau, et les éléments du tableau ne peuvent pas être traités comme myarr[i][j].

```
var myarr array
var mymap map
var s string

myarr[0] = 100
myarr[1] = "This is a line"
mymap["value"] = 777
mymap["param"] = "Parameter"

s = Sprintf("%v, %v, %v", myarr[0] + mymap["value"], myarr[1], mymap["param"])
// s = 877, This is a line, Parameter
```

Vous pouvez également définir des tableaux de type tableau en spécifiant les éléments entre `[]`. Pour les tableaux de type map, veuillez utiliser `{}`.

```
var my map
my={"key1": "value1", key2: i, "key3": $Name}
var mya array
mya=["value1", {key2: i}, $Name]
```

Vous pouvez utiliser cette initialisation dans les expressions. Par exemple, utilisez-la dans les paramètres de fonction.

```
DBFind...Where({id: 1})
```

Pour un tableau d'objets, vous devez spécifier une clé. Les clés sont spécifiées en tant que chaînes de caractères entre guillemets doubles (`""`). Si le nom de la clé est limité aux lettres, aux chiffres et aux underscores, vous pouvez omettre les guillemets doubles.

```
{key1: "value1", key2: "value2"}
```

Un tableau peut contenir des chaînes de caractères, des nombres, des noms de variables de n'importe quel type, et des noms de variables avec le symbole `$`. Il prend en charge les tableaux imbriqués. Vous pouvez spécifier différentes cartes ou tableaux en tant que valeurs.

Les expressions ne peuvent pas être utilisées comme éléments de tableau. Utilisez une variable pour stocker le résultat de l'expression et spécifiez cette variable en tant qu'élément de tableau.

```
[1+2, myfunc(), name["param"]] // don't do this
[1, 3.4, mystr, "string", $ext, myarr, mymap, {"ids": [1,2, i], company: {"Name": "MyCompany"}} ] // this is ok

var val string
val = my["param"]
MyFunc({key: val, sub: {name: "My name", "color": "Red"}})
```

### If et While déclarations {#if-and-while-statements}

Le langage du contrat prend en charge les déclarations conditionnelles standard **if** et les boucles **while**, qui peuvent être utilisées dans les contrats et les fonctions. Ces déclarations peuvent être imbriquées les unes dans les autres.

Les déclarations **if** et **while** doivent être suivies d'une déclaration conditionnelle. Si la déclaration conditionnelle renvoie un nombre, elle est considérée comme fausse lorsque sa valeur est 0.

val == 0 est équivalent à !val, val != 0 est équivalent à val. L'instruction **if** peut avoir un bloc de code **else**, et le **else** est exécuté lorsque la déclaration conditionnelle **if** est fausse.

Les opérateurs de comparaison suivants peuvent être utilisés dans les déclarations conditionnelles : `<, >, >=, <=, ==, !=, ||, &&`

```
if val> 10 || id != $block_key_id {
 ...
} else {
 ...
}
```

Le bloc de code est exécuté lorsque la condition de l'instruction **while** est vraie. **break** signifie terminer la boucle du bloc de code. Si vous souhaitez recommencer une boucle depuis le début, utilisez **continue**.

```
var i int
while true {
  if i > 100 {
    break
  }
  ...
  if i == 50 {
    continue
  }
  ...
  i = i + 1
}
```

En plus des instructions conditionnelles, Needle prend également en charge les opérations arithmétiques standard : `+`, `-`, `*`, `/`.

Les variables de type chaîne de caractères et octets peuvent être utilisées comme condition. Si la longueur du type est supérieure à zéro, la condition est vraie, sinon elle est fausse.

### Fonctions {#functions}

Les fonctions peuvent effectuer des opérations sur les données reçues par la [section de données](#data-section) d'un contrat : lire et écrire des données dans la base de données, convertir le type de valeur et établir l'interaction entre les contrats.

#### Déclaration de fonction {#function-declaration}

Utilisez le mot-clé `func` pour déclarer une fonction, suivi du nom et de la liste des paramètres qui lui sont passés ainsi que de leurs types. Tous les paramètres sont enclos entre parenthèses et séparés par des virgules. Après les parenthèses, le type de données de la valeur renvoyée par la fonction doit être déclaré. Le corps de la fonction doit être enclos entre accolades. Si la fonction n'a pas de paramètres, les accolades peuvent être omises. Pour renvoyer une valeur à partir d'une fonction, utilisez le mot-clé `return`.

```
func myfunc(left int, right int) int {
    return left*right + left - right
}
func test int {
    return myfunc(10, 30) + myfunc(20, 50)
}
func ooops {
    error "Ooops..."
}
```

La fonction ne renvoie pas d'erreurs, car toutes les vérifications d'erreur sont effectuées automatiquement. Si une erreur se produit dans n'importe quelle fonction, le contrat mettra fin à son fonctionnement et affichera la description de l'erreur dans une fenêtre.

#### Paramètres de longueur variable {#variable-length-parameters}

Les fonctions peuvent définir des paramètres de longueur variable, utilisez le symbole `...` comme dernier type de paramètre de la fonction pour indiquer des paramètres de longueur variable, avec un type de données `array`. Les paramètres de longueur variable incluent toutes les variables à partir du moment où le paramètre est passé dans l'appel. Tous les types de variables peuvent être passés, mais vous devez gérer les conflits de types de données incompatibles.

```
func sum(out string, values ...) {
var i, res int

while i <Len(values) {

   res = res + values[i]

   i = i + 1

}

Println(out, res)

}

func main() {
  sum("Sum:", 10, 20, 30, 40)
}
```



#### Paramètres optionnels {#optional-parameters}

Une fonction a de nombreux paramètres, mais nous n'avons besoin que de certains d'entre eux lors de son appel. Dans ce cas, vous pouvez déclarer des paramètres optionnels de la manière suivante : `func myfunc(name string).Param1(param string).Param2(param2 int) {...}`, puis vous pouvez appeler les paramètres spécifiés dans n'importe quel ordre : `myfunc("nom").Param2(100)`.

Dans le corps de la fonction, vous pouvez manipuler ces variables normalement. Si aucun paramètre optionnel spécifié n'est appelé, leurs valeurs par défaut sont zéro. Vous pouvez également utiliser ... pour spécifier un paramètre de longueur variable : `func DBFind(table string).Where(request string, params ...)` puis l'appeler : `DBFind("matable").Where({" id": $monid, "type": 2})`.

```
func DBFind(table string).Columns(columns string).Where(format string, tail ...)
  .Limit(limit int).Offset(offset int) string {
  ...
}

func names() string {
  ...
  return DBFind("table").Columns("name").Where({"id": 100}).Limit(1)
}
```

## Classification des fonctions Needle {#needle-functions-classification}

Récupération des valeurs de la base de données :

|                 |               |                 |
| --------------- | ------------- | --------------- |
| [AppParam](#appparam)        | [EcosysParam](#ecosysparam)   | [GetDataFromXLSX](#getdatafromxlsx) |
| [DBFind](#dbfind)          | [GetHistory](#gethistory)    | [GetRowsCountXLSX](#getrowscountxlsx) |
| [DBRow](#dbrow)           | [GetHistoryRow](#gethistoryrow) | [GetBlock](#getblock)        |
| [DBSelectMetrics](#dbselectmetrics) | [GetColumnType](#getcolumntype) | [LangRes](#langres)         |

Mise à jour des données dans les tables :

|          |             |          |
| -------- | ----------- | -------- |
| [DBInsert](#dbinsert) | [DBUpdateExt](#dbupdateext) | [DelTable](#deltable) |
| [DBUpdate](#dbupdate) | [DelColumn](#delcolumn)   |          |

Opérations avec des tableaux :

|        |      |            |
| ------ | ---- | ---------- |
| [Append](#append) | [Len](#len)  | [GetMapKeys](#getmapkeys) |
| [Join](#join)   | [Row](#row)  | [SortedKeys](#sortedkeys) |
| [Split](#split)  | [One](#one)  |            |

Opérations avec des contrats et des autorisations:

|                    |                   |                   |
| ------------------ | ----------------- | ----------------- |
| [CallContract](#callcontract)       | [GetContractById](#getcontractbyid)   | [TransactionInfo](#transactioninfo)   |
| [ContractAccess](#contractaccess)     | [RoleAccess](#roleaccess)        | [Throw](#throw)             |
| [ContractConditions](#contractconditions) | [GetContractByName](#getcontractbyname) | [ValidateCondition](#validatecondition) |
| [EvalCondition](#evalcondition)      |                   |                   |


Opérations avec des adresses :

|             |             |         |
| ----------- | ----------- | ------- |
| [AddressToId](#addresstoid) | [IdToAddress](#idtoaddress) | [PubToID](#pubtoid) |


Opérations avec des valeurs de variables:

|              |             |        |
| ------------ | ----------- | ------ |
| [DecodeBase64](#decodebase64) | [FormatMoney](#formatmoney) | [Hash](#hash)   |
| [EncodeBase64](#encodebase64) | [Random](#random)      | [Sha256](#sha256) |
| [Float](#float)        | [Int](#int)         | [Str](#str)    |
| [HexToBytes](#hextobytes)   |             |        |

Opérations arithmétiques :

|       |       |       |
| ----- | ----- | ----- |
| [Floor](#floor) | [Log10](#log10) | [Round](#round) |
| [Log](#log)   | [Pow](#pow)   | [Sqrt](#sqrt)  |




Opérations avec JSON:

|            |                  |            |
| ---------- | ---------------- | ---------- |
| [JSONEncode](#jsonencode) | [JSONEncodeIndent](#jsonencodeindent) | [JSONDecode](#jsondecode) |


Opérations avec des chaînes de caractères:

|           |         |           |
| --------- | ------- | --------- |
| [HasPrefix](#hasprefix) | [Size](#size)    | [ToLower](#tolower)   |
| [Contains](#contains)  | [Sprintf](#sprintf) | [ToUpper](#toupper)   |
| [Replace](#replace)   | [Substr](#substr)  | [TrimSpace](#trimspace) |


Opérations avec des octets :

|               |               |      |
| ------------- | ------------- | ---- |
| [StringToBytes](#stringtobytes) | [BytesToString](#bytestostring) |      |


Opérations avec date et heure au format SQL :

|           |          |              |
| --------- | -------- | ------------ |
| [BlockTime](#blocktime) | [DateTime](#datetime) | [UnixDateTime](#unixdatetime) |


Opérations avec les paramètres de la plateforme:
|           |          |              |
| --------- | -------- | ------------ |
| [SysParamString](#sysparamstring) | [SysParamInt](#sysparamint) | [DBUpdateSysParam](#dbupdatesysparam) |
| [UpdateNotifications](#updatenotifications) | [UpdateRolesNotifications](#updaterolesnotifications) | |

Fonctionnement du mode CLB :
|             |              |      |
| ----------- | ------------ | ---- |
| [HTTPRequest](#httprequest) | [HTTPPostJSON](#httppostjson) |      |




Fonctions pour les nœuds maîtres CLB :

|            |         |           |
| ---------- | ------- | --------- |
| [CreateOBS](#createobs)  | [RunOBS](#runobs)  | [RemoveOBS](#removeobs) |
| [GetOBSList](#getobslist) | [StopOBS](#stopobs) |           |



## Référence des fonctions Needle {#needle-functions-reference}


### AppParam {#appparam}

Retourne la valeur d'un paramètre d'application spécifié (à partir de la table des paramètres d'application app_params).

**Syntaxe**

```
AppParam(app int, name string, ecosystemid int) string
```

* **App**

  Identifiant de l'application.

* **name**

    Nom du paramètre de l'application.

* **Ecosystemid**

    Identifiant de l'écosystème.

**Exemple**

```
AppParam(1, "app_account", 1)
```



### DBFind {#dbfind}

Interroge les données d'une table spécifiée avec les paramètres spécifiés et renvoie un tableau de tableaux d'objets map.

`.Row()` permet d'obtenir le premier élément map dans la requête, `.One(column string)` permet d'obtenir le premier élément map d'une colonne spécifiée dans la requête.

**Syntaxe**

```
DBFind(table string)
 [.Columns(columns array|string)]
 [.Where(where map)]
 [.WhereId(id int)]
 [.Order(order string)]
 [.Limit(limit int)]
 [.Offset(offset int)]
 [.Row()]
 [.One(column string)]
 [.Ecosystem(ecosystemid int)] array
```

* **table**

  Nom de la table.

* **colonnes**

  Retourne une liste de colonnes. Si non spécifié, toutes les colonnes seront renvoyées.

  La valeur est un tableau ou une chaîne de caractères séparée par des virgules.

* **où**

  Conditions de requête.

Exemple: `.Where({name: "John"})` ou `.Where({"id": {"$gte": 4}})`.

Ce paramètre doit contenir un tableau d'objets avec des critères de recherche. Le tableau peut contenir des éléments imbriqués.

Les constructions syntaxiques suivantes sont utilisées :
* `{"field1": "value1", "field2": "value2"}`
     Équivalent à `field1 = "value1" ET field2 = "value2"`.

* `{"field1": {"$eq":"value"}}`
     Équivalent à `field = "value"`.

* `{"field1": {"$neq": "value"}}`
     Équivalent à `field != "value"`.

* `{"field1: {"$in": [1,2,3]}}`
     Équivalent à `field IN (1,2,3)`.

* `{"field1": {"$nin": [1,2,3]}}`
     Équivalent à `field NOT IN (1,2,3)`.

* `{"field": {"$lt": 12}}`
     Équivalent à `field < 12`.

* `{"field": {"$lte": 12}}`
     Équivalent à `field <= 12`.

* `{"field": {"$gt": 12}}`
     Équivalent à `field > 12`.

* `{"field": {"$gte": 12}}`
     Équivalent à `field >= 12`.

* `{"$and": [<expr1>, <expr2>, <expr3>]}` 
     Équivalent à `expr1 ET expr2 ET expr3`.

* `{"$or": [<expr1>, <expr2>, <expr3>]}` 
     Équivalent à `expr1 OU expr2 OU expr3`.

* `{field: {"$like": "value"}}`
     Équivalent à `field like '%value%'` (recherche floue).

* `{field: {"$begin": "value"}}`
     Équivalent à `field like 'value%'` (commence par `value`).

* `{field: {"$end": "value"}}`
     Équivalent à `field like '%value'` (se termine par `value`).

* `{field: "$isnull"}`
     Équivalent à `field is null`.

     

Assurez-vous de ne pas écraser les clés des tableaux d'objets. Par exemple, si vous souhaitez interroger avec `id>2 et id<5`, vous ne pouvez pas utiliser `{id:{"$gt": 2}, id:{"$lt": 5}}`, car le premier élément sera écrasé par le deuxième élément. Vous devriez utiliser la structure de requête suivante :
```
{id: [{"$gt": 2}, {"$lt": 5}]}
```
```
{"$and": [{id:{"$gt": 2}}, {id:{"$lt": 5}}]}
```

> Id

    Requêtes par ID. Par exemple, .WhereId(1).

     

> Order

    Utilisé pour trier l'ensemble de résultats par une colonne spécifiée, ou par id par défaut.

    Si vous utilisez uniquement un champ pour le tri, vous pouvez le spécifier en tant que chaîne de caractères. Pour trier plusieurs champs, vous devez spécifier un tableau d'objets de chaînes de caractères :

    Ordre décroissant : `{"field": "-1"}` Équivalent à `field desc`.

    Ordre croissant : `{"field": "1"}` Équivalent à `field asc`.

> limit

    Renvoie le nombre d'entrées. 25, par défaut. Le nombre maximum est de 10 000.

> Offset

    Décalage.

> Ecosystemid

    Identifiant de l'écosystème. Par défaut, la table de l'écosystème actuel est interrogée.

     

**Exemple**

```
var i int
var ret string
ret = DBFind("contracts").Columns("id,value").Where({id: [{"$gt": 2}, {"$lt": 5}]}).Order( "id")
while i <Len(ret) {
  var vals map
  vals = ret[0]
  Println(vals["value"])
  i = i + 1
}
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
  Println(ret)
  Println(ret)
  Println(ret)
}
```


### DBRow {#dbrow}

Interroge les données d'une table spécifiée avec les paramètres spécifiés. Renvoie un tableau de tableaux d'objets map.

**Syntaxe**

```
DBRow(table string)
 [.Columns(columns array|string)]
 [.Where(where map)]
 [.WhereId(id int)]
 [.Order(order array|string)]
 [.Ecosystem(ecosystemid int)] map
```

* **table**

  Nom de la table.

* **columns**
  
  Retourne une liste de colonnes. Si non spécifié, toutes les colonnes seront renvoyées.

  La valeur est un tableau ou une chaîne de caractères séparée par des virgules.

* **où**

  Conditions de requête.

  Par exemple : `.Where({name: "John"})` ou `.Where({"id": {"$gte": 4}})`.

  Pour plus de détails, consultez [DBFind](#dbfind).

* **Id**
  
  Requête par ID. Par exemple, `.WhereId(1)`.

* **Order**

  Utilisé pour trier l'ensemble des résultats par une colonne spécifiée, ou par id par défaut.

  Pour plus de détails, voir [DBFind](#dbfind).

* **Ecosystemid**

  Identifiant de l'écosystème. Par défaut, la table de l'écosystème actuel est interrogée.

**Exemple**

```
var ret map
ret = DBRow("contracts").Columns(["id","value"]).Where({id: 1})
Println(ret)
```



### DBSelectMetrics {#dbselectmetrics}

Retourne les données agrégées d'une métrique.

Les métriques sont mises à jour à chaque fois que 100 blocs sont générés. Et les données agrégées sont stockées sur un cycle de 1 jour.

**Syntaxe**

```
DBSelectMetrics(metric string, timeInterval string, aggregateFunc string) array

```

* **metric**

  Nom de la métrique

  * **ecosystem_pages**
  
    Nombre de pages d'écosystème.

    Valeur de retour : clé - ID de l'écosystème, valeur - nombre de pages d'écosystème.
  * **ecosystem_members**
  
    Nombre de membres de l'écosystème.

    Valeur de retour : clé - ID de l'écosystème, valeur - nombre de membres de l'écosystème.
  * **ecosystem_tx**

    Nombre de transactions de l'écosystème.

    Valeur de retour : clé - ID de l'écosystème, valeur - nombre de transactions de l'écosystème.

* **timeInterval**

    Intervalle de temps pour l'agrégation des données de la métrique. Par exemple : `1 jour`, `30 jours`.

* **aggregateFunc**

    Fonction d'agrégation. Par exemple, `max`, `min`, `avg`.

**Exemple**

```
var rows array
rows = DBSelectMetrics("ecosystem_tx", "30 days", "avg")
var i int
while(i <Len(rows)) {
  var row map
  row = rows[i]
  i = i + 1
}
```



### EcosysParam {#ecosysparam}

Retourne la valeur d'un paramètre spécifié dans la table des paramètres de l'écosystème.

**Syntaxe**

```
EcosysParam(name string) string

```

* **name**

  Nom du paramètre.

**Exemple**

```
Println(EcosysParam("founder_account"))
```



### GetHistory {#gethistory}

Retourne l'historique des modifications apportées aux entrées d'une table spécifiée.

**Syntaxe**

```
GetHistory(table string, id int) array

```

* **table**

  Nom de la table.

* **Id**

  Identifiant d'entrée.

**Valeur de retour**

  Retourne un tableau d'objets de type map, qui spécifient l'historique des modifications apportées aux entrées des tables.

  Chaque tableau contient les champs d'un enregistrement avant de procéder à la prochaine modification.
  Le tableau est trié par ordre des modifications les plus récentes.

  Le champ id dans le tableau pointe vers l'id de la table rollback_tx. block_id représente l'ID du bloc, tandis que block_time représente l'horodatage de génération du bloc.

**Exemple**

```
var list array
var item map
list = GetHistory("blocks", 1)
if Len(list) > 0 {
  item = list[0]
}
```



### GetHistoryRow {#gethistoryrow}

Retourne un instantané unique de l'historique des modifications d'une entrée spécifiée dans une table spécifiée.

**Syntaxe**

```
GetHistoryRow(table string, id int, rollbackId int) map
```



* **table**

  Nom de la table.

* **Id**

  Identifiant de l'entrée.

* **rollbackId**

  rollback_tx The entry ID of the table.

```
  $result = GetHistoryRow("contracts",205,2358)
```

  


### GetColumnType {#getcolumntype}

Returns the data type of a specified field in a specified table.

**Syntaxe**

```
GetColumnType(table, column string) string

```

* **table**

  Table name.
* **column**

  Field Name.
> **Valeur de retour**

  The following types can be returned: `text, varchar, number, money, double, bytes, json, datetime, double`.

**Exemple**

```
var coltype string
coltype = GetColumnType("members", "member_name")
```



### GetDataFromXLSX {#getdatafromxlsx}

Returns data from XLSX spreadsheets.

**Syntaxe**

```
GetDataFromXLSX(binId int, line int, count int, sheet int) string

```

* **binId**

  ID in XLSX format in the binary table binary.
* **line**

  The starting line number, starting from 0 by default.
* **count**

  The number of rows that need to be returned.
* **sheet**

  List number, starting from 1 by default.

**Exemple**

```
var a array
a = GetDataFromXLSX(3, 12, 10, 1)
```



### GetRowsCountXLSX {#getrowscountxlsx}

Returns the number of lines in a specified XLSX file.

**Syntaxe**

```
GetRowsCountXLSX(binId int, sheet int) int
```

* **binId**

  ID in XLSX format in the binary table binary.
* **sheet**

  List number, starting from 1 by default.

**Exemple**

```
var count int
count = GetRowsCountXLSX(binid, 1)
```



### LangRes {#langres}

Returns a multilingual resource with name label for language lang, specified as a two-character code, for example: `en`, `fr`. If there is no language for a selected language, then the language resource of the `en` label is returned.

**Syntaxe**

```
LangRes(label string, lang string) string
```

* **label**

  Language resource name.
* **lang**

  Two-character language code.

**Exemple**

```
warning LangRes("@1confirm", "en")
error LangRes("@1problems", "fr")
```



### GetBlock {#getblock}

Returns relevant information about a specified block.

**Syntaxe**

```
GetBlock(blockID int64) map

```

* **blockID**

  Block ID.
> **Valeur de retour**

  Return an array of objects:
  * **id**
  
     Block ID.
  * **time**
  
     Block generation timestamp.
  * **key_id**
  
     The account address of the verification node generated the block.

**Exemple**

```
var b map
b = GetBlock(1)
Println(b)
```



### DBInsert {#dbinsert}

Adds an entry to a specified table and return the entry ID.

**Syntaxe**

```
DBInsert(table string, params map) int

```

* **tblname**

  Table name.
* **params**

  An array of objects where keys are field names and values are inserted values.

**Exemple**

```
DBInsert("mytable", {name: "John Smith", amount: 100})
```



### DBUpdate {#dbupdate}

Changes the column value of a specified entry ID in a specified table. If the entry ID does not exist in the table, an error is returned.

**Syntaxe**

```
DBUpdate(tblname string, id int, params map)

```

* **tblname**

  Table name.

* **Id**

  Identifiant de l'entrée.

* **params**

  Un tableau d'objets où les clés sont les noms des champs et les valeurs sont les nouvelles valeurs après les modifications.

**Exemple**

```
DBUpdate("mytable", myid, {name: "John Smith", amount: 100})
```



### DBUpdateExt {#dbupdateext}

Modifie la valeur d'une colonne dans une table spécifiée qui correspond à la condition de requête.

**Syntaxe**

```
DBUpdateExt(tblname string, where map, params map)

```

* **tblname**

  Nom de la table.

* **où**

  Conditions de requête.

  Pour plus de détails, consultez [DBFind](#dbfind).

* **params**

  Un tableau d'objets où les clés sont les noms des champs et les valeurs sont les nouvelles valeurs après les modifications.

**Exemple**

```
DBUpdateExt("mytable", {id: $key_id, ecosystem: $ecosystem_id}, {name: "John Smith", amount: 100})
```



### DelColumn {#delcolumn}

Supprime un champ dans une table spécifiée qui ne contient aucun enregistrement.

**Syntaxe**

```
DelColumn(tblname string, column string)

```

* **tblname**

  Nom de la table.

* **column**

  Le champ à supprimer.

```
DelColumn("mytable", "mycolumn")
```

  


### DelTable {#deltable}

Supprime une table spécifiée qui ne contient aucun enregistrement.

**Syntaxe**

```
DelTable(tblname string)

```

* **tblname**

  Nom de la table.

**Exemple**

```
DelTable("mytable")
```



### Append {#append}

Insère n'importe quel type de valeur dans le tableau src.

**Syntaxe**

Ajouter (src tableau, val anyType) tableau

* **src**

  Le tableau original.
* **val**

  La valeur à insérer.

**Exemple**

```
var list array
list = Append(list, "new_val")
```



### Join {#join}

Combine les éléments du tableau en une chaîne de caractères avec un séparateur spécifié.

**Syntaxe**

```
Join(in array, sep string) string

```

* **In**

  Nom du tableau.
* **sep**

  Séparateur.

**Exemple**

```
 var val string, myarr array
 myarr[0] = "first"
 myarr[1] = 10
 val = Join(myarr, ",")
```



### Split {#split}

Utilisez le séparateur "sep" pour diviser la chaîne d'entrée en éléments et les placer dans un tableau.

**Syntaxe**

```
Split(in string, sep string) array
```

* **In**

   Chaîne.
*  **sep**

   Séparateur.

**Exemple**

```
var myarr array
myarr = Split("first,second,third", ",")
```



### Len {#len}

Retourne le nombre d'éléments dans un tableau spécifié.

**Syntaxe**

 

```
Len(val array) int
```

* **val**

   Tableau.

**Exemple**

```
if Len(mylist) == 0 {
  ...
}
```



### Row {#row}

 Le paramètre de liste ne doit pas être spécifié dans ce cas. Renvoyez le premier tableau d'objets dans la liste d'arrays. Si la liste est vide, un résultat vide est renvoyé. Cette fonction est principalement utilisée en conjonction avec la fonction [DBFind](#dbfind). Lors de l'utilisation de cette fonction, vous ne pouvez pas spécifier de paramètres.

**Syntaxe**

```
 Row(list array) map
```

* **list**

   Le tableau d'objets retourné par la fonction DBFind.

**Exemple**

```
 var ret map
 ret = DBFind("contracts").Columns("id,value").WhereId(10).Row()
 Println(ret)
```



### One {#one}

 Retourne la valeur du champ du premier objet du tableau dans la liste d'arrays. Si la liste est vide, nil est retourné. Cela est principalement utilisé en conjonction avec la fonction [DBFind](#dbfind). Lors de l'utilisation de cette fonction, vous ne pouvez pas spécifier de paramètres.

**Syntaxe**

```
One(list array, column string) string
```

*  **list**

  Le tableau d'objets retourné par la fonction DBFind.

* **column**

  Nom du champ.

**Exemple**

```
var ret string
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
  Println(ret)
}
```



### GetMapKeys {#getmapkeys}

Retourne le tableau de clés dans le tableau d'objets.

**Syntaxe**

```
GetMapKeys(val map) array
```

* **val**

    Tableau d'objets.

**Exemple**

```
var val map
var arr array
val["k1"] = "v1"
val["k2"] = "v2"
arr = GetMapKeys(val)
```



### SortedKeys {#sortedkeys}

Retourne un tableau de clés triées dans le tableau d'objets.

**Syntaxe**

```
SortedKeys(val map) array

```

* **val**

    Tableau d'objets.

**Exemple**

```
var val map
var arr array
val["k2"] = "v2"
val["k1"] = "v1"
arr = SortedKeys(val)
```



### CallContract {#callcontract}

Appelle le contrat avec un nom spécifié. Tous les paramètres de la section de données dans le contrat doivent être inclus dans un tableau d'objets. Cette fonction renvoie la valeur assignée à la variable **$result** par un contrat spécifié.

**Syntaxe**

```
CallContract(name string, params map)

```

* **name**

    Le nom du contrat qui est appelé.

* **params**

    Un tableau associatif des données d'entrée du contrat.

**Exemple**

```
var par map
par["Name"] = "My Name"
CallContract("MyContract", par)
```



### ContractAccess {#contractaccess}

Vérifie si le nom du contrat en cours d'exécution correspond à l'un des noms répertoriés dans les paramètres. Cela est généralement utilisé pour contrôler l'accès du contrat aux tables. Lors de la modification des champs de table ou de l'insertion et de l'ajout de nouveaux champs de colonne dans la section des autorisations de la table, veuillez spécifier cette fonction dans les champs d'autorisations.

**Syntaxe**

  

```
ContractAccess(name string, [name string]) bool
```

* **name**

    Nom du contrat.

**Exemple**

```
ContractAccess("MyContract")
ContractAccess("MyContract","SimpleContract")
```



### ContractConditions {#contractconditions}

Appelle la section des conditions dans le contrat avec un nom spécifié.

Pour ce type de contrats, la section des données doit être vide. Si la section des conditions est exécutée sans erreur, elle renvoie true. S'il y a une erreur pendant l'exécution, le contrat parent sera également résilié en raison de l'erreur. Cette fonction est généralement utilisée pour contrôler l'accès du contrat aux tables et peut être appelée dans les champs de permission lors de la modification des tables système.

**Syntaxe**

```
ContractConditions(name string, [name string]) bool

```

* **name**

    Nom du contrat.

**Exemple**

```
ContractConditions("MainCondition")
```



### EvalCondition {#evalcondition}

Obtient la valeur du champ condfield dans l'enregistrement avec un champ 'name' de la table tablename, et vérifie les conditions de la valeur du champ condfield.

**Syntaxe**

```
EvalCondition(tablename string, name string, condfield string)

```

* **tablename**

    Nom de la table.

*  **name**

    Interroge la valeur avec le champ 'name'.

*  **condfield**

    Le nom du champ dont les conditions doivent être vérifiées.

**Exemple**

```
EvalCondition(`menu`, $Name, `conditions`)
```



### GetContractById {#getcontractbyid}

Retourne le nom du contrat en fonction de l'ID du contrat. Si le contrat n'est pas trouvé, une chaîne vide est renvoyée.

**Syntaxe**

```
GetContractById(id int) string

```

* **Id**

  L'identifiant du contrat dans la table des contrats est contracts.

**Exemple**

```
var name string
name = GetContractById($IdContract)
```



### GetContractByName {#getcontractbyname}

Cette fonction renvoie l'ID de contrat correspondant à son nom de contrat. Si le contrat n'est pas trouvé, zéro est renvoyé.

**Syntaxe**

```
GetContractByName(name string) int
```

* **name**

    Le nom du contrat dans la table des contrats est "contrats".

**Exemple**

```
var id int
id = GetContractByName(`NewBlock`)
```



### RoleAccess {#roleaccess}

Vérifie si l'ID du rôle de l'appelant du contrat correspond à l'un des IDs spécifiés dans le paramètre.

Vous pouvez utiliser cette fonction pour contrôler l'accès du contrat aux tables et autres données.

**Syntaxe**

 

```
RoleAccess(id int, [id int]) bool
```

* **Id**

    Identifiant de rôle.

**Exemple**

```
RoleAccess(1)
RoleAccess(1, 3)
```



### TransactionInfo {#transactioninfo}

Requêtes les transactions par valeur de hachage spécifiée et renvoie des informations sur le contrat exécuté et ses paramètres.

**Syntaxe**

```
TransactionInfo(hash: string)
```

  * **hash**

    Hachage de transaction au format de chaîne hexadécimale.
  
> **Valeur de retour**

  Cette fonction renvoie une chaîne au format JSON.

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

  

  *   **contract**

      Nom du contrat.
  
  *   **params**

      Données transmises aux paramètres du contrat.

  *   **block**

      ID du bloc qui a traité la transaction.

**Exemple**

```
var out map
out = JSONDecode(TransactionInfo(hash))
```



### Throw {#throw}

  Génère une erreur de type exception.

**Syntaxe**

  

```
Throw(ErrorId string, ErrDescription string)
```

* **ErrorId**

    Identifiant d'erreur.

* **ErrDescription**

    Description de l'erreur.

>  **Valeur de retour**

  Le format de ce type de transaction est le suivant:

```
{"type":"exception","error":"Error description","id":"Error ID"}
```

**Exemple**

```
Throw("Problem", "There is a problem")
```



### ValidateCondition {#validatecondition}

  Tente de compiler les conditions spécifiées par le paramètre de condition. S'il y a une erreur pendant le processus de compilation, une erreur est générée et le contrat appelé est terminé. Cette fonction est conçue pour vérifier la correction du format conditionnel.

**Syntaxe**

```
ValidateCondition(condition string, state int)
```

* **condition**

    Le format conditionnel qui doit être vérifié.

* **state**

    Identifiant de l'écosystème. Si vous vérifiez l'état mondial, veuillez le spécifier comme 0.

**Exemple**

```
ValidateCondition(`ContractAccess("@1MyContract")`, 1)
```



### AddressToId {#addresstoid}

Retourne l'adresse de compte correspondante en fonction de l'adresse de portefeuille. Si une adresse invalide est spécifiée, '0' est retourné.

**Syntaxe**

```
AddressToId(address string) int

```

*  Address

    Adresse de portefeuille au format `XXXX-...-XXXX` ou au format numérique.

**Exemple**

```
wallet = AddressToId($Recipient)
```



### IdToAddress {#idtoaddress}

Retourne l'adresse de portefeuille correspondante à l'adresse du compte. Si une adresse invalide est spécifiée, l'adresse invalide 'invalid' est renvoyée.

**Syntaxe**

```
IdToAddress(id int) string

```

*  **Id**

    Adresse du compte.

**Exemple**

```
$address = IdToAddress($id)
```



### PubToID {#pubtoid}

L'adresse du compte est renvoyée par la clé publique au format hexadécimal.

**Syntaxe**

```
PubToID(hexkey string) int

```

*  **hexkey**

    La clé publique au format hexadécimal.

**Exemple**

  

```
var wallet int
wallet = PubToID("04fa5e78.....34abd6")
```



### DecodeBase64 {#decodebase64}

Retourne une chaîne en spécifiant le format base64

**Syntaxe**

```
DecodeBase64(input string) string

```

*  **Input**

    Chaîne au format base64.

**Exemple**

```
val = DecodeBase64(mybase64)
```



### EncodeBase64 {#encodebase64}

Retourne une chaîne au format base64 en spécifiant une chaîne.

**Syntaxe**

```
EncodeBase64(input string) string

```

*  **Input**

    La chaîne à encoder.

**Exemple**

 

```
var base64str string
base64str = EncodeBase64("my text")
```



### Float {#float}

Convertit un entier ou une chaîne de caractères en nombre décimal.

**Syntaxe**

```
Float(val int|string) float

```

* **val**

    Un entier ou une chaîne de caractères.

**Exemple**

```
val = Float("567.989") + Float(232)
```



### HexToBytes {#hextobytes}

Convertit une chaîne au format hexadécimal en octets de type byte.

**Syntaxe**

```
  HexToBytes(hexdata string) bytes

```

*  **hexdata**

    Une chaîne au format hexadécimal.

**Exemple**

```
var val bytes
val = HexToBytes("34fe4501a4d80094")
```



### FormatMoney {#formatmoney}

Retourne la valeur de chaîne de exp / 10 ^ digit.

**Syntaxe**

  

```
FormatMoney(exp string, digit int) string
```

* **Exp**

    Un nombre au format de chaîne de caractères.

* **digit**

    L'exposant (positif ou négatif) de 10 dans l'expression `Exp/10^digit`. Les valeurs positives déterminent les décimales.

**Exemple**

```
  s = FormatMoney("78236475917384", 0)
```



### Random {#random}
```
Returns a random number between min and max (min <= result <max). Both min and max must be positive numbers.
```

**Syntaxe**

 

```
Random(min int, max int) int
```

* **min**

    La valeur minimale parmi les nombres aléatoires.

* **max**

    La limite supérieure des nombres aléatoires. Le nombre aléatoire généré sera inférieur à cette valeur.

**Exemple**

```
i = Random(10,5000)
```



### Int {#int}

Convertit une valeur au format chaîne de caractères en un entier.

**Syntaxe**

```
Int(val string) int
```

* **val**

    Un nombre au format de chaîne de caractères.

**Exemple**

```
mystr = "-37763499007332"
val = Int(mystr)
```



### Hash {#hash}

  Retourne le hachage d'un tableau d'octets ou d'une chaîne spécifiée, qui est généré par la bibliothèque de chiffrement système crypto.

**Syntaxe**

 

```
Hash(val interface{}) string, error
```

* **val**

    Une chaîne de caractères ou un tableau d'octets.

**Exemple**

```
var hash string
hash = Hash("Test message")
```



### Sha256 {#sha256}

  Retourne le hachage SHA256 d'une chaîne spécifiée.

**Syntaxe**

 

```
Sha256(val string) string
```

* **val**

    Une chaîne nécessite l'opération de hachage Sha256.

**Exemple**

```
var sha string
sha = Sha256("Test message")
```



### Str {#str}

Convertit un nombre entier int ou un nombre à virgule flottante float en une chaîne de caractères.

**Syntaxe**

  

```
Str(val int|float) string
```

* **val**

    Un nombre entier ou décimal.

**Exemple**

```
myfloat = 5.678
val = Str(myfloat)
```



### JSONEncode {#jsonencode}

Convertit un nombre, une chaîne de caractères ou un tableau en une chaîne de caractères au format JSON.

**Syntaxe**

```
JSONEncode(src int|float|string|map|array) string

```

* **src**

    Data to convert.

**Exemple**

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncode(mydata)
```



### JSONEncodeIndent {#jsonencodeindent}

Utilise l'indentation spécifiée pour convertir un nombre, une chaîne de caractères ou un tableau en une chaîne au format JSON.

**Syntaxe**

```
JSONEncodeIndent(src int|float|string|map|array, indent string) string

```

* **src**

    Données à convertir.

* **Indent**

    La chaîne sera utilisée comme indentation.

**Exemple**

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncodeIndent(mydata, "\t")
```



### JSONDecode {#jsondecode}

Convertit une chaîne au format JSON en nombre, chaîne de caractères ou tableau.

**Syntaxe**

```
JSONDecode(src string) int|float|string|map|array

```

*  **src**

    Une chaîne contenant des données au format JSON.

**Exemple**

```
var mydata map
mydata = JSONDecode(`{"name": "John Smith", "company": "Smith's company"}`)
```



### HasPrefix {#hasprefix}

Vérifie si la chaîne commence par une chaîne spécifiée.

**Syntaxe**

  

```
HasPrefix(s string, prefix string) bool
```

* **s**

    Une chaîne de caractères.

* **prefix**

    Le préfixe à vérifier.

> **Valeur de retour**

  Si la chaîne commence par une chaîne spécifiée, `true` est renvoyé.

**Exemple**

```
if HasPrefix($Name, `my`) {
  ...
}
```



### Contains {#contains}

Vérifie si la chaîne de caractères contient une sous-chaîne spécifiée.

**Syntaxe**

 

```
Contains(s string, substr string) bool
```

* **s**

    Une chaîne de caractères.

* **substr**

    Une sous-chaîne.

> **Valeur de retour**

  Si la chaîne contient la sous-chaîne, elle renvoie `true`.

**Exemple**

```
if Contains($Name, `my`) {
  ...
}
```



### Remplacer {#replace}

Remplacez l'ancien (la vieille chaîne) par le nouveau (la nouvelle chaîne) dans la chaîne.

**Syntaxe**

```
Replace(s string, old string, new string) string

```

* **s**

    La chaîne originale.

* **Old**

    La sous-chaîne à remplacer.

* **new**

    La nouvelle chaîne.

**Exemple**

```
s = Replace($Name, `me`, `you`)
```



### Size {#size}

Retourne le nombre d'octets dans une chaîne spécifiée.

**Syntaxe**

```
Size(val string) int

```

* **val**

    Une chaîne de caractères.

**Exemple**

```
var len int
len = Size($Name)
```



### Sprintf {#sprintf}

Cette fonction crée une chaîne de caractères en utilisant le modèle et les paramètres spécifiés.

Jokers disponibles :
* `%d` (entier)
* `%s` (chaîne de caractères)
* `%f` (nombre à virgule flottante)
* `%v` (n'importe quel type)

**Syntaxe**

```
Sprintf(pattern string, val ...) string

```

* **pattern**

    Un modèle de chaîne.

**Exemple**

```
out = Sprintf("%s=%d", mypar, 6448)
```



### Substr {#substr}

Retourne la sous-chaîne obtenue à partir d'une chaîne spécifiée en commençant à l'offset (calculé à partir de 0 par défaut), et la longueur maximale est limitée à length.

Si l'offset ou la longueur est inférieure à zéro, ou si l'offset est supérieur à la longueur, une chaîne vide est renvoyée.

Si la somme de l'offset et de la longueur est supérieure à la taille de la chaîne, alors la sous-chaîne sera renvoyée à partir de l'offset jusqu'à la fin de la chaîne.

**Syntaxe**

```
Substr(s string, offset int, length int) string

```

* **val**

    Une chaîne de caractères.

* **Offset**

    Décalage.

* **length**

    Longueur de la sous-chaîne.

**Exemple**

```
var s string
s = Substr($Name, 1, 10)
```



### ToLower {#tolower}

Renvoie une chaîne spécifiée en minuscules.

**Syntaxe**

```
ToLower(val string) string

```

* **val**

    Une chaîne de caractères.

**Exemple**

```
val = ToLower(val)
```



### ToUpper {#toupper}

Renvoie une chaîne spécifiée en majuscules.

**Syntaxe**

```
ToUpper(val string) string

```

* **val**

    Une chaîne de caractères.

**Exemple**

```
val = ToUpper(val)
```



### TrimSpace {#trimspace}

Supprime les espaces, les tabulations et les sauts de ligne en début et en fin d'une chaîne spécifiée.

**Syntaxe**

```
TrimSpace(val string) string

```

* **val**

    Une chaîne de caractères.

**Exemple**

 

```
var val string
val = TrimSpace(" mystr ")
```



### Floor {#floor}

Renvoie la plus grande valeur entière inférieure ou égale à un nombre spécifié, un nombre à virgule flottante et une chaîne de caractères.

**Syntaxe**

```
Floor(x float|int|string) int
```

* **x**

    Un nombre, un nombre décimal et une chaîne de caractères.

**Exemple**

```
val = Floor(5.6) // returns 5
```



### Log {#log}

Retourne le logarithme naturel d'un nombre spécifié, d'un nombre à virgule flottante et d'une chaîne de caractères.

**Syntaxe**

```
Log(x float|int|string) float

```

*  **x**

    Un nombre, un nombre décimal et une chaîne de caractères.

**Exemple**

```
val = Log(10)
```



### Log10 {#log10}

Renvoie le logarithme en base 10 d'un nombre, d'un nombre flottant et d'une chaîne spécifiés.

**Syntaxe**

```
Log10(x float|int|string) float

```

* **x**

    Un nombre, un nombre décimal et une chaîne de caractères.

**Exemple**

 

```
val = Log10(100)
```



### Pow {#pow}

Renvoie la base spécifiée à la puissance spécifiée (xy).

**Syntaxe**

```
Pow(x float|int|string, y float|int|string) float

```

* **x**

    Numéro de base.

* **y**

    Exposant.

**Exemple**

```
val = Pow(2, 3)

```

### Round {#round}

Renvoie la valeur d'un nombre spécifié arrondi à l'entier le plus proche.

**Syntaxe**

```
Round(x float|int|string) int

```

* **x**

    Un numéro.

**Exemple**

```
val = Round(5.6)
```

### Sqrt {#sqrt}

Retourne la racine carrée d'un nombre spécifié.

```
Sqrt(x float|int|string) float

```

* **x**

    Un numéro.

**Exemple**

```
val = Sqrt(225)
```



### StringToBytes {#stringtobytes}

Convertit une chaîne de caractères en octets.

**Syntaxe**

```
StringToBytes(src string) bytes

```

* **src**

    Une chaîne de caractères.

**Exemple**

 

```
var b bytes
b = StringToBytes("my string")
```



### BytesToString {#bytestostring}

Convertit des octets en chaîne de caractères.

**Syntaxe**

```
BytesToString(src bytes) string

```

* **src**

    Octet.

**Exemple**

```
var s string
s = BytesToString($Bytes)
```



### SysParamString {#sysparamstring}

Retourne la valeur d'un paramètre de plateforme spécifié.

**Syntaxe**

```
SysParamString(name string) string

```

* **name**

    Nom du paramètre.

**Exemple**

```
url = SysParamString(`blockchain_url`)
```



### SysParamInt {#sysparamint}

Retourne la valeur d'un paramètre de plateforme spécifié sous forme de nombre.

**Syntaxe**

```
SysParamInt(name string) int

```

* **name**

    Nom du paramètre.

**Exemple**

```
maxcol = SysParam(`max_columns`)
```



### DBUpdateSysParam {#dbupdatesysparam}

Met à jour la valeur et les conditions d'un paramètre de plateforme. Si vous n'avez pas besoin de modifier la valeur ou les conditions, veuillez spécifier une chaîne vide dans le paramètre correspondant.

**Syntaxe**

```
DBUpdateSysParam(name, value, conditions string)

```

* **name**

    Nom du paramètre.

* **value**

    Nouvelle valeur d'un paramètre.

* **conditions**

    Nouvelles conditions pour mettre à jour un paramètre.

**Exemple**

```
DBUpdateSysParam(`fuel_rate`, `400000000000`, ``)

```

### UpdateNotifications {#updatenotifications}

Obtient la liste des notifications d'une clé spécifiée depuis la base de données, et envoie la notification obtenue à Centrifugo.

**Syntaxe**

```
UpdateNotifications(ecosystemID int, keys int...)

```

* **EcosystemID**

    Identifiant de l'écosystème.

* **key**

    Une liste d'adresses de compte, séparées par des virgules. Ou vous pouvez utiliser un tableau pour spécifier une liste d'adresses de compte.

**Exemple**

```
UpdateNotifications($ecosystem_id, $key_id, 23345355454, 35545454554)
UpdateNotifications(1, [$key_id, 23345355454, 35545454554])
```



### UpdateRolesNotifications {#updaterolesnotifications}

Obtient la liste des notifications de toutes les adresses de compte d'un ID de rôle spécifié dans la base de données, et envoie la notification obtenue à Centrifugo.

**Syntaxe**

```
UpdateRolesNotifications(ecosystemID int, roles int ...)

```

*  **EcosystemID**

    Identifiant de l'écosystème.

*  **roles**

    Une liste d'identifiants de rôles, séparés par des virgules. Ou vous pouvez utiliser un tableau pour spécifier une liste d'identifiants de rôles.

**Exemple**

```
UpdateRolesNotifications(1, 1, 2)

```

### HTTPRequest {#httprequest}

Envoie des requêtes HTTP à l'adresse spécifiée.

> Remarque

> Cette fonction ne peut être utilisée que dans les contrats CLB.

**Syntaxe**

```
HTTPRequest(url string, method string, heads map, pars map) string

```

* **Url**

    Adresse à laquelle la demande sera envoyée.

* **method**

    Type de requête (GET ou POST).

* **heads**

    Un tableau d'en-têtes de requête, d'objets.

* **pars**

    Paramètres de la demande.

**Exemple**

```
var ret string
var ret string
var ret string
var pars, heads, json map
heads["Authorization"] = "Bearer "+ $auth_token
pars["obs"] = "true"
ret = HTTPRequest("http://localhost:7079/api/v2/content/page/default_page","POST", heads, pars)
json = JSONToMap(ret)
```



### HTTPPostJSON {#httppostjson}

Cette fonction est similaire à la fonction HTTPRequest, mais elle envoie une requête POST et les paramètres de la requête sont des chaînes de caractères.

> Remarque

> Cette fonction ne peut être utilisée que dans les contrats CLB.

**Syntaxe**

```
HTTPPostJSON(url string, heads map, pars string) string

```

* **Url**

    Adresse à laquelle la demande sera envoyée.

* **heads**

    Un tableau d'en-têtes de requête, d'objets.

* **pars**

    Paramètres de requête sous forme de chaîne JSON.

**Exemple**

```
var ret string
var ret string
var ret string
var heads, json map
heads["Authorization"] = "Bearer "+ $auth_token
ret = HTTPPostJSON("http://localhost:7079/api/v2/content/page/default_page", heads, `{"obs":"true"}`)
json = JSONToMap(ret)
```



### BlockTime {#blocktime}

Retourne le temps de génération du bloc au format SQL.

**Syntaxe**

```
BlockTime()
```



**Exemple**

```
var mytime string
mytime = BlockTime()
DBInsert("mytable", myid, {time: mytime})
```



### DateTime {#datetime}

Convertit le timestamp unixtime en une chaîne de caractères au format YYYY-MM-DD HH:MI:SS.

**Syntaxe**

```
DateTime(unixtime int) string
```



**Exemple**

```
DateTime(1532325250)

```

### UnixDateTime {#unixdatetime}

Convertit une chaîne au format YYYY-MM-DD HH:MI:SS en un horodatage unixtime

**Syntaxe**

```
UnixDateTime(datetime string) int
```



**Exemple**

```
UnixDateTime("2018-07-20 14:23:10")
```



### CreateOBS {#createobs}

Crée un CLB enfant.

Cette fonction ne peut être utilisée qu'en mode CLB maître.

**Syntaxe**

```
CreateOBS(OBSName string, DBUser string, DBPassword string, OBSAPIPort int)

```

* **OBSName**

    Nom du CLB.

* **DBUser**

    Le nom du rôle de la base de données.

*  **DBPassword**

    Le mot de passe du rôle.

* **OBSAPIPort**

    Le port de la requête API.

**Exemple**

```
CreateOBS("obsname", "obsuser", "obspwd", 8095)

```

### GetOBSList {#getobslist}

Retourne la liste des CLBs enfants.

Cette fonction ne peut être utilisée qu'en mode CLB maître.

**Syntaxe**

```
GetOBSList()

```

> **Valeur de retour**

Un tableau d'objets, où la clé est le nom du CLB et la valeur est l'état du processus.

### RunOBS {#runobs}

Un processus en cours d'exécution du CLB.

Cette fonction ne peut être utilisée que dans le mode maître du CLB.

**Syntaxe**

```
RunOBS(OBSName string)

```

* **OBSName**

  Nom du CLB.

  Il ne peut contenir que des lettres et des chiffres, et le symbole d'espace ne peut pas être utilisé.

### StopOBS {#stopobs}

Arrêtez le processus d'un CLB spécifié.

Cette fonction ne peut être utilisée qu'en mode CLB maître.

**Syntaxe**

```
StopOBS(OBSName string)

```

* **OBSName**

  Nom du CLB.

  Il ne peut contenir que des lettres et des chiffres, et le symbole d'espace ne peut pas être utilisé.

### RemoveOBS {#removeobs}

Supprime le processus d'un CLB spécifié.

Cette fonction ne peut être utilisée qu'en mode CLB maître.

**Syntaxe**

```
RemoveOBS(OBSName string)

```

* **OBSName**

Nom du CLB.

Il ne peut contenir que des lettres et des chiffres, et le symbole d'espace ne peut pas être utilisé.

## System Contracts {#system-contracts}

Les contrats système sont créés par défaut lorsque la plateforme blockchain IBax est lancée. Tous ces contrats ont été créés dans le premier écosystème. C'est pourquoi vous devez spécifier leurs noms complets lors de leur appel à partir d'autres écosystèmes, par exemple, `@1NewContract`.

### NewEcosystem {#newecosystem}

Ce contrat crée un nouvel écosystème. Pour obtenir l'ID de l'écosystème créé, vous devez citer le champ de résultat retourné dans [txstatus](../reference/api2.md#txstatus).

Paramètres:

  * **Name** - *string* - nom de l'écosystème. Il peut être modifié ultérieurement.

### EditEcosystemName {#editecosystemname}

Modifie le nom de l'écosystème dans la table 1_ecosystems qui n'existe que dans le premier écosystème.

Paramètres:

  * **EcosystemID** - *int* - change le nom de l'ID de l'écosystème;
  * **NewName** - *string* - nouveau nom de l'écosystème.

### NewContract {#newcontract}

Crée un nouveau contrat dans l'écosystème actuel.

Paramètres:

  * **ApplicationId** - *int* - l'application à laquelle appartient un nouveau contrat;
  * **Value** - *string* - code source du contrat. La couche supérieure ne doit avoir qu'un seul contrat;
  * **Conditions** - *string* - modifie les conditions du contrat;
  * **TokenEcosystem** - *int "optionnel"* - ID de l'écosystème. Il détermine quel jeton sera utilisé pour les transactions lorsque le contrat est activé.

### EditContract {#editcontract}

Modifie le contrat dans l'écosystème actuel.

Paramètres:

  * **Id** - *int* - l'ID du contrat modifié;
  * **Value** - *string "optionnel"* - code source du contrat;
  * **Conditions** - *string "optionnel"* - modifie les conditions du contrat.

### BindWallet {#bindwallet}
Liaison du contrat à l'adresse du portefeuille dans l'écosystème actuel. Après liaison avec le contrat, les frais d'exécution du contrat seront payés sous cette adresse.

Paramètres:

  * **Id** - *int* - l'ID du contrat à lier.
  * **WalletId** - *string "optionnel"* - l'adresse du portefeuille liée au contrat.

### UnbindWallet {#unbindwallet}

Détacher le contrat de l'adresse du portefeuille dans l'écosystème actuel. Seules les adresses liées au contrat peuvent être détachées. Après avoir détaché le contrat, les utilisateurs qui exécutent le contrat devront payer les frais d'exécution.

Paramètres:

  * **Id** - *int* - l'ID du contrat en cours de liaison.

### NewParameter {#newparameter}

Un nouveau paramètre d'écosystème a été ajouté à l'écosystème actuel.

Paramètres:

  * **Nom** - *string* - nom du paramètre;
  * **Valeur** - *string* - valeur du paramètre;
  * **Conditions** - *string* - conditions pour modifier le paramètre.

### EditParameter {#editparameter}

Modifie les paramètres de l'écosystème existant dans l'écosystème actuel.

Paramètres:

  * **Nom** - *string* - nom du paramètre à modifier;
  * **Valeur** - *string* - nouvelle valeur du paramètre;
  * **Conditions** - *string* - nouvelles conditions pour modifier le paramètre.

### NewMenu {#newmenu}

Ajoute un nouveau menu dans l'écosystème actuel.

Paramètres:

  * **Nom** - *string* - nom du menu;
  * **Valeur** - *string* - code source du menu;
  * **Titre** - *string "optional"* - titre du menu;
  * **Conditions** - *string* - conditions pour changer le menu.

### EditMenu {#editmenu}

Modifie le menu existant dans l'écosystème actuel.

Paramètres:

  * **Id** - *int* - ID du menu à modifier ;
  * **Value** - *string "optionnel"* - code source du nouveau menu ;
  * **Title** - *string "optionnel"* - titre du nouveau menu ;
  * **Conditions** - *string "optionnel"* - nouvelles conditions pour modifier le menu.

### AppendMenu {#appendmenu}

Ajoute le contenu du code source aux menus existants dans l'écosystème actuel

Paramètres:

  * **Id** - *int* - ID du menu ;
  * **Value** - *string* - code source à ajouter.

### NewPage {#newpage}

Ajoute une nouvelle page dans l'écosystème actuel.

Paramètres:

  * **Nom** - *String* - nom de la page ;
  * **Valeur** - *String* - code source de la page ;
  * **Menu** - *String* - nom du menu associé à la page ;
  * **Conditions** - *String* - conditions pour changer la page ;
  * **ValidateCount** - *int "optionnel"* - nombre de nœuds requis pour la validation de la page. Si ce paramètre n'est pas spécifié, la valeur du paramètre d'écosystème min_page_validate_count est utilisée. La valeur de ce paramètre ne peut pas être inférieure à min_page_validate_count et supérieure à max_page_validate_count ;

  * **ValidateMode** - *int "optional"* - mode de vérification de validité de la page. La page sera vérifiée lorsqu'elle est chargée si la valeur de ce paramètre est 0 ; ou vérifiée lorsqu'elle est chargée ou quitte la page si la valeur de ce paramètre est 1.

### EditPage {#editpage}

Modifie les pages existantes dans l'écosystème actuel.

Paramètres:

  * **Id** - *int* - ID de la page à modifier;
  * **Value** - *string "optional"* - code source de la nouvelle page ;
  * **Menu** - *string "optional"* - nom du nouveau menu associé à la page ;
  * **Conditions** - *string "optional"* - nouvelles conditions pour modifier la page ;
  * **ValidateCount** - *int "optional"* - nombre de nœuds requis pour la validation de la page. Si ce paramètre n'est pas spécifié, la valeur du paramètre d'écosystème min_page_validate_count est utilisée. La valeur de ce paramètre ne peut être inférieure à min_page_validate_count et supérieure à max_page_validate_count ;
  * **ValidateMode** - *int "optional"* - mode de vérification de la validité de la page. La page sera vérifiée lors de son chargement si la valeur de ce paramètre est 0 ; ou vérifiée lors de son chargement ou de sa sortie de la page si la valeur de ce paramètre est 1.

### AppendPage {#appendpage}

Ajoute le contenu source aux pages existantes dans l'écosystème actuel.

Paramètres:

* **Id** - *int* - ID de la page à modifier;
* **Value** - *string* - Le code source à ajouter.

### NewBlock {#newblock}

Ajoute un module de page à l'écosystème actuel.

Paramètres:

  * **Nom** - *string* - nom du module;
  * **Valeur** - *string* - code source du module;
  * **Conditions** - *string* - conditions pour modifier le module.

### EditBlock {#editblock}

Modifie les modules de page existants dans l'écosystème actuel.

Paramètres:

  * Id - *int* - module ID à changer;
  * Value - *string* - code source du nouveau module;
  * Conditions - *string* - nouvelles conditions pour changer le module.

### NewTable {#newtable}

Ajoute une nouvelle table à l'écosystème actuel.

Paramètres:

  * **ApplicationId** - *int* - ID de l'application de la table associée ;
  * **Name** - *string* - nom de la nouvelle table ;
  * **Columns** - *string* - tableau de champs au format JSON `[{"name":"...", "type":"...","index": "0", "conditions":".. ."},...]`, où
    * **name** - nom du champ, uniquement des caractères latins ;
    * **type** - type de données `varchar,bytea,number,datetime,money,text,double,character`;
    * **index** - champ non clé primaire `0`, clé primaire `1`;
    * **conditions** - conditions pour modifier les données du champ, et les autorisations d'accès doivent être spécifiées au format JSON "`{"update":"ContractConditions(MainCondition)", "read":"ContractConditions(MainCondition)"}`;
  * **Permissions** - *string* - autorisations d'accès au format JSON `{"insert": "...", "new_column": "...", "update": "...", "read": ".. ."}`.
    * **insert** - autorisation d'insérer des entrées ;
    * **new_column** - autorisation d'ajouter une nouvelle colonne ;
    * **update** - autorisation de modifier les données de l'entrée ;
    * **read** - autorisation de lire les données de l'entrée.

### EditTable {#edittable}

Modifie les permissions d'accès d'une table dans l'écosystème actuel.

Paramètres:

  * **Name** - *string* - nom de la table ;
  * **InsertPerm** - *string* - autorisation d'insérer des entrées dans la table ;
  * **UpdatePerm** - *string* - autorisation de mettre à jour les entrées dans la table ;
  * **ReadPerm** - *string* - autorisation de lire les entrées dans la table ;
  * **NewColumnPerm** - *string* - autorisation de créer une nouvelle colonne ;

### NewColumn {#newcolumn}

Ajoute un nouveau champ à la table de l'écosystème actuel.

Paramètres:

  * **TableName** - *string* - nom de la table ;
  * **Name** - *string* - nom du champ en caractères latins ;
  * **Type** - *string* - type de données `varchar,bytea,number,money,datetime,text,double,character`;
  * **UpdatePerm** - *string* - autorisation de modifier la valeur dans la colonne ;
  * **ReadPerm** - *string* - autorisation de lire la valeur dans la colonne.

### EditColumn {#editcolumn}

Modifie les permissions d'un champ de table spécifié dans l'écosystème actuel.

Paramètres:

  * **TableName** - *string* - nom de la table ;
  * **Name** - *string* - nom du champ en caractères latins à modifier ;
  * **UpdatePerm** - *string* - nouvelle autorisation pour modifier la valeur dans la colonne ;
  * **ReadPerm** - *string* - nouvelle autorisation pour lire la valeur dans la colonne.

### NewLang {#newlang}

Ajoute des ressources linguistiques à l'écosystème actuel, et la permission de le faire est définie dans le paramètre changing_language des paramètres de l'écosystème.

Paramètres:

  * **Name** - *string* - nom des ressources linguistiques en caractères latins
  * **Trans** - *string* - chaîne au format JSON, avec un code de langue à deux caractères comme clé et la chaîne traduite comme valeur. Par exemple, `{"en": "Texte en anglais", "fr": "Texte en français"}`.

### EditLang {#editlang}

Modifie les ressources linguistiques dans l'écosystème actuel, et l'autorisation de le faire est définie dans le paramètre changing_language de l'écosystème.

Paramètres:

  * **Id** - *int* - ressources linguistiques ID.
  * **Trans** - *string* En format JSON, avec un code de langue à deux caractères comme clé et la chaîne traduite comme valeur. Par exemple, `{"en": "Texte en anglais", "fr": "Texte en français"}`.

### Import {#import}

Importe une application dans l'écosystème actuel et importe les données chargées à partir du contrat [ImportUpload](#importupload).

Paramètres:

  * **Data** - *string* - Données importées au format texte, provenant d'un fichier exporté par l'écosystème.

### ImportUpload {#importupload}

Charge un fichier d'application externe dans la table buffer_data de l'écosystème actuel pour une importation ultérieure.

Paramètres:

  * **InputFile** - *file* - un fichier écrit dans la table buffer_data de l'écosystème actuel.

### NewAppParam {#newappparam}

Ajoute de nouveaux paramètres d'application à l'écosystème actuel. 

Paramètres:

  * **ApplicationId** - *int* - ID de l'application ;
  * **Name** - *string* - nom du paramètre ;
  * **Value** - *string* - valeur du paramètre ;
  * **Conditions** - *string* - autorisation de modifier le paramètre.

### EditAppParam {#editappparam}

Modifie les paramètres de l'application existante dans l'écosystème actuel.

Paramètres:

  * **Id** - *int* - ID du paramètre de l'application ;
  * **Value** - *string "optional"* - nouvelle valeur du paramètre ;
  * **Conditions** - *string "optional"* - nouvelles autorisations pour modifier le paramètre.

### NewDelayedContract {#newdelayedcontract}

Ajoute une nouvelle tâche au démon planificateur des contrats retardés.

Le planificateur des contrats retardés exécute les contrats requis par le bloc actuellement généré.

Paramètres:

  * **Contract** - *string* - nom du contrat ;
  * **EveryBlock** - *int* - le contrat sera exécuté tous les X blocs ;
  * **Conditions** - *string* - autorisation de modifier la tâche ;
  * **BlockID** - *int "optional"* - l'ID du bloc où le contrat doit être exécuté. S'il n'est pas spécifié, il sera calculé automatiquement en ajoutant l'ID du "bloc courant" + EveryBlock ;
  * **Limit** - *int "optional"* - le nombre maximum d'exécutions de la tâche. S'il n'est pas spécifié, la tâche sera exécutée un nombre illimité de fois.

### EditDelayedContract {#editdelayedcontract}

Modifie une tâche dans le démon planificateur des contrats retardés.

Paramètres:

  * **Id** - *int* - ID de la tâche ;
  * **Contract** - *string* - nom du contrat ;
  * **EveryBlock** - *int* - le contrat sera exécuté tous les X blocs ;
  * **Conditions** - *string* - autorisation de modifier la tâche ;
  * **BlockID** - *int "optional"* - l'ID du bloc où le contrat doit être exécuté. S'il n'est pas spécifié, il sera calculé automatiquement en ajoutant l'ID du "bloc courant" + EveryBlock ;
  * **Limit** - *int "optional"* - le nombre maximum d'exécutions de la tâche. S'il n'est pas spécifié, la tâche sera exécutée un nombre illimité de fois ;
  * **Deleted** - *int "optional"* - bascule de la tâche. Une valeur de `1` désactivera la tâche. Une valeur de `0` activera la tâche.

### UploadBinary {#uploadbinary}

Ajoute ou remplace un fichier statique dans la table X_binaries. Lors de l'appel d'un contrat via l'API HTTP, la requête doit être au format `multipart/form-data`; le paramètre DataMimeType sera utilisé en conjonction avec les données du formulaire.

Paramètres:

  * **Name** - *string* - nom du fichier statique ;
  * **Data** - *bytes* - contenu du fichier statique ;
  * **DataMimeType** - *string "optional"* - un fichier statique au format mime-type ;
  * **ApplicationId** - *int* - l'ID de l'application associée à la table X_binaries.

  Si le paramètre DataMimeType n'est pas spécifié, le format `application/octet-stream` est utilisé par défaut.
