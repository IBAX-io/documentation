# Compilateur et Machine Virtuelle {#compiler-and-virtual-machine}

  - [Stockage et compilation du code source](#source-code-storage-and-compilation)
  - [Structures de la machine virtuelle](#virtual-machine-structures)
    - [Structure VM](#vm-structure)
    - [Structure de bloc](#block-structure)
    - [Structure ObjInfo](#objinfo-structure)
      - [Structure ContractInfo](#contractinfo-structure)
      - [Structure FieldInfo](#fieldinfo-structure)
      - [Structure FuncInfo](#funcinfo-structure)
      - [Structure FuncName](#funcname-structure)
      - [Structure ExtFuncInfo](#extfuncinfo-structure)
      - [Structure VarInfo](#varinfo-structure)
      - [Valeur ObjExtend](#objextend-value)
  - [Commandes de la machine virtuelle](#virtual-machine-commands)
    - [Structure ByteCode](#bytecode-structure)
    - [Identifiants de commande](#command-identifiers)
    - [Commandes d'opérations de la pile](#stack-operation-commands)
    - [Structure d'exécution](#runtime-structure)
      - [Structure blockStack](#blockstack-structure)
    - [Fonction RunCode](#runcode-function)
    - [Autres fonctions pour les opérations avec la VM](#other-functions-for-operations-with-vm)
  - [Compilateur](#compiler)
  - [Analyseur lexical](#lexical-analyzer)
    - [lextable/lextable.go](#lextable-lextable-go)
    - [lex.go](#lex-go)
  - [Langage Needle](#needle-language)
    - [Lexèmes](#lexemes)
    - [Types](#types)
    - [Expressions](#expressions)
    - [Portée](#scope)
    - [Exécution de contrat](#contract-execution)
    - [Forme de Backus-Naur (BNF)](#backus-naur-form-bnf)


Cette section concerne la compilation du programme et les opérations du langage Needle dans la machine virtuelle (VM).

## Stockage et compilation du code source {#source-code-storage-and-compilation}

Les contrats intelligents et les fonctions sont écrits en Golang et stockés dans les tables de contrat des écosystèmes.

Lorsqu'un contrat est exécuté, son code source est lu depuis la base de données et compilé en bytecode.

Lorsqu'un contrat est modifié, son code source est mis à jour et enregistré dans la base de données. Ensuite, le code source est compilé, mettant à jour le bytecode dans la machine virtuelle correspondante.

Comme les bytecodes ne sont pas physiquement enregistrés, ils seront compilés à nouveau lorsque le programme sera exécuté à nouveau.

L'ensemble du code source décrit dans la table de contrat de chaque écosystème est compilé dans une machine virtuelle dans un ordre strict, et l'état de la machine virtuelle est le même sur tous les nœuds.

Lorsque le contrat est appelé, la machine virtuelle ne change pas son état de quelque manière que ce soit. L'exécution de tout contrat ou l'appel de toute fonction se produit sur une pile d'exécution distincte créée lors de chaque appel externe.

Chaque écosystème peut avoir un écosystème virtuel, qui peut être utilisé à l'intérieur d'un nœud en conjonction avec des tables en dehors de la blockchain, sans affecter directement la blockchain ou d'autres écosystèmes virtuels. Dans ce cas, le nœud hébergeant un tel écosystème virtuel compilera son contrat et créera sa propre machine virtuelle.

## Structures de machines virtuelles {#virtual-machine-structures}

### Structure VM {#vm-structure}

Une machine virtuelle est organisée en mémoire sous la forme d'une structure comme ci-dessous.

```
type VM struct {
   Block
   ExtCost func(string) int64
   FuncCallsDB map[string]struct{}
   Extern bool
   ShiftContract int64
   logger *log.Entry
}
```

Une structure de VM comprend les éléments suivants :
* Block - contient une [structure de bloc](#block-structure);
* ExtCost - une fonction qui retourne le coût d'exécution d'une fonction externe en Golang;
* FuncCallsDB - une collection de noms de fonctions en Golang. Cette fonction retourne le coût d'exécution en tant que premier paramètre. Ces fonctions utilisent EXPLAIN pour calculer le coût du traitement de la base de données;
* Extern - un indicateur booléen indiquant si un contrat est un contrat externe. Il est défini sur true lorsqu'une VM est créée. Les contrats appelés ne sont pas affichés lors de la compilation du code. En d'autres termes, cela permet d'appeler le code de contrat déterminé ultérieurement;
* ShiftContract - ID du premier contrat dans la VM;
* logger - sortie du journal d'erreurs de la VM.

### Structure de bloc {#block-structure}

A virtual machine is a tree composed of **Block type** objects.

A block is an independent unit that contains some bytecodes. In simple terms, everything you put in the braces (`{}`) in the language is a block.

For example, the following code would create a block with functions. This block also contains another block with an if statement, which contains a block with a while statement.

```
func my() {
   if true {
      while false {
      ...
      }
   }
}
```

The block is organized in the memory as a structure like below.
```
type Block struct {
   Objects map[string]*ObjInfo
   Type int
   Owner *OwnerInfo
   Info interface{}
   Parent *Block
   Vars []reflect.Type
   Code ByteCodes
   Children Blocks
}
```

Une structure de bloc se compose des éléments suivants :

* **Objects** - une carte d'objets internes de type pointeur [ObjInfo](#objinfo-structure). Par exemple, s'il y a une variable dans le bloc, vous pouvez obtenir des informations à son sujet par son nom ;
* **Type** - le type du bloc. Pour un bloc de fonction, son type est **ObjFunc** ; pour un bloc de contrat, son type est **ObjContract** ;
* **Owner** - une structure de type pointeur **OwnerInfo**. Cette structure contient des informations sur le propriétaire du contrat compilé, qui est spécifié lors de la compilation du contrat ou obtenu à partir de la table **contracts** ;
* **Info** - il contient des informations sur l'objet, qui dépend du type de bloc ;
* **Parent** - un pointeur vers le bloc parent ;
* **Vars** - un tableau contenant les types des variables du bloc actuel ;
* **Code** - le bytecode du bloc lui-même, qui sera exécuté lorsque les droits de contrôle sont transmis au bloc, par exemple, les appels de fonction ou les corps de boucle ;
* **Children** - un tableau contenant des sous-blocs, tels que des fonctions imbriquées, des boucles, des opérateurs conditionnels.

### Structure ObjInfo {#objinfo-structure}

La structure ObjInfo contient des informations sur les objets internes.
```
type ObjInfo struct {
   Type int
   Value interface{}
}
```

La structure ObjInfo a les éléments suivants:

* **Type** est le type d'objet, qui peut avoir l'une des valeurs suivantes :
   * **ObjContract** - [contrat](#structure-du-contrat) ;
   * **ObjFunc** - fonction ;
   * **ObjExtFunc** - fonction externe golang ;
   * **ObjVar** - variable ;
   * **ObjExtend** - variable $name.
* **Value** - il contient la structure de chaque type.

#### Structure ContractInfo {#contractinfo-structure}

Pointant vers le type **ObjContract**, et le champ **Value** contient une structure **ContractInfo**.

```
type ContractInfo struct {
   ID uint32
   Name string
   Owner *OwnerInfo
   Used map[string]bool
   Tx *[]*FieldInfo
}
```

La structure ContractInfo comprend les éléments suivants :

* **ID** - ID du contrat, affiché dans la blockchain lors de l'appel du contrat;
* **Name** - nom du contrat;
* **Owner** - autres informations sur le contrat;
* **Used** - carte des noms de contrats qui ont été appelés;
* **Tx** - un tableau de données décrit dans la section [data section](script.md#data-section) du contrat.

#### Structure FieldInfo {#fieldinfo-structure}

La structure FieldInfo est utilisée dans la structure **ContractInfo** et décrit les éléments dans [data section](script.md#data-section) d'un contrat.

```
type FieldInfo struct {
   Name string
   Type reflect.Type
   Original uint32
   Tags string
}
```

La structure FieldInfo a les éléments suivants :

* **Name** - nom du champ;
* **Type** - type de champ;
* **Original** - champ facultatif;
* **Tags** - étiquettes supplémentaires pour ce champ.

#### Structure FuncInfo {#funcinfo-structure}

Pointant vers le type ObjFunc, et le champ Value contient une structure FuncInfo.

```
type FuncInfo struct {
   Params []reflect.Type
   Results []reflect.Type
   Names *map[string]FuncName
   Variadic bool
   ID uint32
}
```

La structure FuncInfo comprend les éléments suivants :

* **Params** - un tableau de types de paramètres;
* **Results** - un tableau de types de retour;
* **Names** - une carte de données pour les fonctions de queue, par exemple, `DBFind().Columns()`;
* **Variadic** - vrai si la fonction peut avoir un nombre variable de paramètres;
* **ID** - ID de la fonction.

#### Structure NomFonction {#funcname-structure}

La structure FuncName est utilisée pour FuncInfo et décrit les données d'une fonction de queue.

```
type FuncName struct {
   Params []reflect.Type
   Offset []int
   Variadic bool
}
```

La structure FuncName a les éléments suivants :

* **Params** - un tableau de types de paramètres;
* **Offset** - le tableau des décalages pour ces variables. En fait, les valeurs de tous les paramètres dans une fonction peuvent être initialisées avec le point .;
* **Variadic** - vrai si la fonction de queue peut avoir un nombre variable de paramètres.

#### Structure ExtFuncInfo {#extfuncinfo-structure}

Pointant vers le type ObjExtFunc, et le champ Value contient une structure ExtFuncInfo. Il est utilisé pour décrire les fonctions golang.

```
type ExtFuncInfo struct {
   Name string
   Params []reflect.Type
   Results []reflect.Type
   Auto []string
   Variadic bool
   Func interface{}
}
```

La structure ExtFuncInfo comprend les éléments suivants :

* **Name**, **Params**, **Results** les paramètres ont la même structure que [FuncInfo](#structure-funcinfo);
* **Auto** - un tableau de variables. Si présent, il est transmis à la fonction en tant que paramètre supplémentaire. Par exemple, une variable de type SmartContract sc;
* **Func** - fonctions golang.

#### Structure VarInfo {#varinfo-structure}

En pointant vers le type **ObjVar**, et le champ **Value** contient une structure **VarInfo**.

```
type VarInfo struct {
   Obj *ObjInfo
   Owner *Block
}
```

La structure VarInfo a les éléments suivants :

* **Obj** - informations sur le type et la valeur de la variable;
* **Owner** - Pointeur vers le bloc propriétaire.

#### ObjExtend valeur {#objextend-value}

En pointant vers le type **ObjExtend**, et le champ **Value** contient une chaîne de caractères contenant le nom de la variable ou de la fonction.

## Commandes de machine virtuelle {#virtual-machine-commands}
### Structure du ByteCode {#bytecode-structure}

Un bytecode est une séquence de structures de type **ByteCode**.

```
type ByteCode struct {
   Cmd uint16
   Value interface{}
}
```

Cette structure a les champs suivants:

* **Cmd** - l'identifiant des commandes de stockage;
* **Value** - contient l'opérande (valeur).

En général, les commandes effectuent une opération sur l'élément supérieur de la pile et écrivent la valeur résultante si nécessaire.

### Identifiants de commande {#command-identifiers}

Les identifiants des commandes de la machine virtuelle sont décrits dans le fichier vm/cmds_list.go.

* **cmdPush** - mettre une valeur du champ `Value` dans la pile. Par exemple, mettre des nombres et des lignes dans la pile;
* **cmdVar** - mettre la valeur d'une variable dans la pile. `Value` contient un pointeur vers la structure `VarInfo` et des informations sur la variable;
* **cmdExtend** - mettre la valeur d'une variable externe dans la pile. `Value` contient une chaîne de caractères avec le nom de la variable (commençant par `$`);
* **cmdCallExtend** - appeler une fonction externe (commençant par `$`). Les paramètres de la fonction sont obtenus à partir de la pile et les résultats sont placés dans la pile. `Value` contient le nom de la fonction (commençant par `$`);
* **cmdPushStr** - mettre la chaîne de caractères contenue dans `Value` dans la pile;
* **cmdCall** - appelle la fonction de la machine virtuelle. `Value` contient une structure `ObjInfo`. Cette commande s'applique à la fonction golang `ObjExtFunc` et à la fonction Needle `ObjFunc`. Si une fonction est appelée, ses paramètres sont obtenus à partir de la pile et les valeurs de résultat sont placées dans la pile;
* **cmdCallVari** - similaire à la commande **cmdCall**, elle appelle la fonction de la machine virtuelle. Cette commande est utilisée pour appeler une fonction avec un nombre variable de paramètres;
* **cmdReturn** - utilisée pour sortir de la fonction. Les valeurs de retour seront placées dans la pile et le champ `Value` n'est pas utilisé;
* **cmdIf** - transfère le contrôle vers le bytecode dans la structure `block`, qui est transmis dans le champ `Value`. Le contrôle sera transféré dans la pile uniquement lorsque l'élément supérieur de la pile est appelé par la fonction `valueToBool` et retourne `true`. Sinon, le contrôle sera transféré à la commande suivante;
* **cmdElse** - cette commande fonctionne de la même manière que **cmdIf**, mais seulement lorsque l'élément supérieur de la pile est appelé par la fonction `valueToBool` et retourne `false`, le contrôle sera transféré au bloc spécifié;
* **cmdAssignVar** - obtenir une liste de variables de type `VarInfo` à partir de `Value`. Ces variables utilisent la commande **cmdAssign** pour obtenir la valeur;
* **cmdAssign** - assigner la valeur de la pile à la variable obtenue par la commande **cmdAssignVar**;
* **cmdLabel** - définit une étiquette lorsque le contrôle est renvoyé pendant la boucle while;
* **cmdContinue** - cette commande transfère le contrôle vers l'étiquette **cmdLabel**. Lors de l'exécution d'une nouvelle itération de la boucle, `Value` n'est pas utilisé;
* **cmdWhile** - utilise `valueToBool` pour vérifier l'élément supérieur de la pile. Si cette valeur est `true`, la structure `block` sera appelée depuis le champ `Value`;
* **cmdBreak** - quitte la boucle;
* **cmdIndex** - mettre la valeur de la map ou du tableau dans la pile par index, sans utiliser `Value`. Par exemple, `(map | tableau) (index valeur) => (map | tableau [index valeur])`;
* **cmdSetIndex** - assigne la valeur de l'élément supérieur de la pile aux éléments de la map ou du tableau, sans utiliser `Value`. Par exemple, `(map | tableau) (index valeur) (valeur) => (map | tableau)`;
* **cmdFuncName** - ajoute les paramètres qui sont passés en utilisant des descriptions séquentielles divisées par un point `. Par exemple, `func name => Func (...) .Name (...)`;
* **cmdUnwrapArr** - définit un indicateur booléen si l'élément supérieur de la pile est un tableau;
* **cmdMapInit** - initialise la valeur de la map;
* **cmdArrayInit** - initialise la valeur du tableau;
* **cmdError** - cette commande est créée lorsque qu'un contrat ou une fonction se termine avec une erreur, un avertissement ou une information spécifiée.


### Commandes d'opérations de pile {#stack-operation-commands}

> Remarque

> Dans la version actuelle, la conversion automatique de type n'est pas entièrement applicable pour ces commandes. Par exemple,

> `string + float | int | decimal => float | int | decimal, float + int | str => float, mais int + string => erreur d'exécution`.

Les commandes suivantes sont destinées au traitement direct de la pile. Le champ Valeur n'est pas utilisé dans ces commandes.

* **cmdNot** - logical negation. `(val) => (!ValueToBool(val))`;
* **cmdSign** - change of sign. `(val) => (-val)`;
* **cmdAdd** - addition. `(val1)(val2) => (val1 + val2)`;
* **cmdSub** - subtraction. `(val1)(val2) => (val1 - val2)`;
* **cmdMul** - multiplication. `(val1)(val2) => (val1 * val2)`;
* **cmdDiv** - division. `(val1)(val2) => (val1 / val2)`;
* **cmdAnd** - logical AND. `(val1)(val2) => (valueToBool(val1) && valueToBool(val2))`;
* **cmdOr** - logical OR. `(val1)(val2) => (valueToBool(val1) || valueToBool(val2))`;
* **cmdEqual** - equality comparison, bool is returned. `(val1)(val2) => (val1 == val2)`;
* **cmdNotEq** - inequality comparison, bool is returned. `(val1)(val2) => (val1 != val2)`;
* **cmdLess** - less-than comparison, bool is returned. `(val1)(val2) => (val1 < val2)`;
* **cmdNotLess** - greater-than-or-equal comparison, bool is returned. `(val1)(val2) => (val1 >= val2)`;
* **cmdGreat** - greater-than comparison, bool is returned. `(val1)(val2) => (val1 > val2)`;
* **cmdNotGreat** - less-than-or-equal comparison, bool is returned. `(val1)(val2) => (val1 <= val2)`;

### Structure de Runtime {#runtime-structure}

L'exécution des octets de code n'affectera pas la machine virtuelle. Par exemple, cela permet à différentes fonctions et contrats de s'exécuter simultanément dans une seule machine virtuelle. La structure Runtime est utilisée pour exécuter des fonctions et des contrats, ainsi que des expressions et des octets de code.

```
type RunTime struct {
   stack []interface{}
   blocks []*blockStack
   vars []interface{}
   extend *map[string]interface{}
   vm *VM
   cost int64
   err error
}
```

* **stack** - la pile d'exécution du bytecode;
* **blocks** - la pile des appels de blocs;
* **vars** - la pile des variables. Ses variables seront ajoutées à la pile des variables lors de l'appel du bytecode dans le bloc. Après la sortie du bloc, la taille de la pile des variables reviendra à sa valeur précédente;
* **extend** - un pointeur vers une carte avec les valeurs des variables externes (`$name`);
* **vm** - un pointeur vers la machine virtuelle;
* **cost** - l'unité de carburant du coût d'exécution résultant;
* **err** - une erreur s'est produite lors de l'exécution.

#### structure de blockStack {#blockstack-structure}

La structure blockStack est utilisée dans la structure Runtime.

```
type blockStack struct {
   Block *Block
   Offset int
}
```

* **Block** - un pointeur vers le bloc en cours d'exécution;
* **Offset** - le décalage de la dernière commande exécutée dans le bytecode du bloc spécifié.

### Fonction RunCode {#runcode-function}

Les octets de code sont exécutés dans la fonction **RunCode**. Elle contient une boucle qui effectue l'opération correspondante pour chaque commande d'octet de code. Avant de traiter un octet de code, les données requises doivent être initialisées.

De nouveaux blocs sont ajoutés à d'autres blocs.

```
rt.blocks = append(rt.blocks, &blockStack{block, len(rt.vars)})
```

Ensuite, obtenez les informations des paramètres pertinents de la fonction "tail". Ces paramètres sont contenus dans le dernier élément de la pile.

```
var namemap map[string][]interface{}
if block.Type == ObjFunc && block.Info.(*FuncInfo).Names != nil {
   if rt.stack[len(rt.stack)-1] != nil {
      namemap = rt.stack[len(rt.stack)-1].(map[string][]interface{})
   }
   rt.stack = rt.stack[:len(rt.stack)-1]
}
```

Ensuite, toutes les variables définies dans le bloc actuel doivent être initialisées avec leurs valeurs initiales.

```
start := len(rt.stack)
varoff := len(rt.vars)
for vkey, vpar := range block.Vars {
   rt.cost--
   var value interface{}
```
Puisque les variables dans la fonction sont également des variables, nous devons les récupérer à partir du dernier élément de la pile dans l'ordre décrit par la fonction elle-même.

```
   if block.Type == ObjFunc && vkey <len(block.Info.(*FuncInfo).Params) {
      value = rt.stack[start-len(block.Info.(*FuncInfo).Params)+vkey]
   } else {
```

Initialisez les variables locales avec leurs valeurs initiales.

```
      value = reflect.New(vpar).Elem().Interface()

      if vpar == reflect.TypeOf(map[string]interface{}{}) {

         value = make(map[string]interface{})
      } else if vpar == reflect.TypeOf([]interface{}{}) {
         value = make([]interface{}, 0, len(rt.vars)+1)
      }
   }
   rt.vars = append(rt.vars, value)
}
```

Ensuite, mettez à jour les valeurs des paramètres variables passés dans la fonction tail.

```
if namemap != nil {
   for key, item := range namemap {
      params := (*block.Info.(*FuncInfo).Names)[key]
      for i, value := range item {
         if params.Variadic && i >= len(params.Params)-1 {
```

Si les paramètres de variable passés appartiennent à un nombre variable de paramètres, alors ces paramètres seront combinés dans un tableau de variables.

```
            off := varoff + params.Offset[len(params.Params)-1]
            rt.vars[off] = append(rt.vars[off].([]interface{}), value)
         } else {
            rt.vars[varoff+params.Offset[i]] = value
         }
      }
   }
}
```

Après cela, tout ce que nous avons à faire est de supprimer les valeurs passées depuis le sommet de la pile en tant que paramètres de fonction, déplaçant ainsi la pile. Nous avons copié leurs valeurs dans un tableau de variables.

```
if block.Type == ObjFunc {
   start -= len(block.Info.(*FuncInfo).Params)
}
```


Lorsqu'une boucle de commande bytecode est terminée, nous devons vider correctement la pile.

```
last := rt.blocks[len(rt.blocks)-1]
```

Supprimer le bloc actuel de la pile de blocs.

```
rt.blocks = rt.blocks[:len(rt.blocks)-1]
if status == statusReturn {
```

Si la sortie de la fonction s'est effectuée avec succès, nous ajouterons la valeur de retour à la fin de la pile précédente.

```
   if last.Block.Type == ObjFunc {
      for count := len(last.Block.Info.(*FuncInfo).Results); count > 0; count-- {
         rt.stack[start] = rt.stack[len(rt.stack)-count]
         start++
      }
      status = statusNormal
   } else {
```

Comme vous pouvez le voir, si nous n'exécutons pas la fonction, alors nous ne restaurerons pas l'état de la pile et sortirons de la fonction telle quelle. La raison en est que les boucles et les structures conditionnelles qui ont été exécutées dans la fonction sont également des blocs de code bytecode.

```
   return

   }
}

rt.stack = rt.stack[:start]
```

### Autres fonctions pour les opérations avec la VM {#other-functions-for-operations-with-vm}

Vous pouvez créer une machine virtuelle avec la fonction **NewVM**. Chaque machine virtuelle sera ajoutée avec quatre fonctions, telles que **ExecContract**, **MemoryUsage**, **CallContract** et **Settings**, grâce à la fonction **Extend**.

```
for key, item := range ext.Objects {
   fobj := reflect.ValueOf(item).Type()
```

Nous parcourons tous les objets passés et ne regardons que les fonctions.

```
   switch fobj.Kind() {
   case reflect.Func:
```

Nous remplissons la structure **ExtFuncInfo** en fonction des informations reçues sur la fonction, et ajoutons sa structure à la carte de niveau supérieur **Objects** par nom.

```
   data := ExtFuncInfo{key, make([]reflect.Type, fobj.NumIn()), make([]reflect.Type, fobj.NumOut()),
   make([]string, fobj.NumIn()), fobj.IsVariadic(), item}
   for i := 0; i <fobj.NumIn(); i++ {
```

La structure **ExtFuncInfo** a un tableau de paramètres **Auto**. Habituellement, le premier paramètre est `sc *SmartContract` ou `rt *Runtime`, nous ne pouvons pas les passer depuis le langage Needle, car ils sont nécessaires pour exécuter certaines fonctions golang. Par conséquent, nous spécifions que ces variables seront utilisées automatiquement lorsque ces fonctions sont appelées. Dans ce cas, le premier paramètre des quatre fonctions ci-dessus est `rt *Runtime`.

```
   if isauto, ok := ext.AutoPars[fobj.In(i).String()]; ok {
      data.Auto[i] = isauto
   }
```

Informations sur l'attribution des paramètres.

```
      data.Params[i] = fobj.In(i)
   }
```

Et les types de valeurs de retour.

```
for i := 0; i <fobj.NumOut(); i++ {
   data.Results[i] = fobj.Out(i)
}
```

Ajoute une fonction à la racine **Objects** afin que le compilateur puisse les trouver ultérieurement lors de l'utilisation du contrat.

```
      vm.Objects[key] = &ObjInfo{ObjExtFunc, data}
   }

}
```

## Compilateur {#compiler}

Les fonctions dans le fichier compile.go sont responsables de la compilation du tableau de jetons obtenus à partir de l'analyse lexicale. La compilation peut être divisée en deux niveaux de manière conditionnelle. Au niveau supérieur, nous traitons des fonctions, des contrats, des blocs de code, des déclarations conditionnelles et de boucle, des définitions de variables, etc. Au niveau inférieur, nous compilons les expressions dans les blocs de code ou les conditions dans les boucles et les déclarations conditionnelles.

Tout d'abord, nous commencerons par le niveau inférieur simple. Dans la fonction **compileEval**, les expressions peuvent être converties en bytecode. Étant donné que nous utilisons une machine virtuelle avec une pile, il est nécessaire de convertir les expressions d'enregistrement infixes ordinaires en notation postfixe ou en notation polonaise inverse. Par exemple, nous convertissons `1+2` en `12+` et plaçons `1` et `2` dans la pile. Ensuite, nous appliquons l'opération d'addition aux deux derniers éléments de la pile et écrivons le résultat dans la pile. Vous pouvez trouver cet algorithme de [conversion](https://master.virmandy.net/perevod-iz-infiksnoy-notatsii-v-postfiksnuyu-obratnaya-polskaya-zapis/) sur Internet.

La variable globale `opers = map [uint32] operPrior` contient la priorité des opérations nécessaires pour la conversion en notation polonaise inverse.

Les variables suivantes sont définies au début de la fonction **compileEval**:

* **buffer** - tampon temporaire pour les commandes de bytecode ;
* **bytecode** - tampon final des commandes de bytecode ;
* **parcount** - tampon temporaire utilisé pour calculer les paramètres lors de l'appel d'une fonction ;
* **setIndex** - les variables dans le processus de travail seront définies sur true lorsque nous attribuons des éléments de carte ou de tableau. Par exemple, `a["my"] = 10`. Dans ce cas, nous devons utiliser la commande **cmdSetIndex** spécifiée.

Nous obtenons un jeton dans une boucle et le traitons en conséquence. Par exemple, l'appariement des expressions s'arrêtera si des parenthèses sont trouvées. Lors du déplacement de la chaîne, nous vérifions si l'instruction précédente est une opération et si elle se trouve entre parenthèses, sinon elle sortira de l'expression analysée.

```
case isRCurly, isLCurly:
   i--
   if prevLex == isComma || prevLex == lexOper {
      return errEndExp
   }
   break main
case lexNewLine:
   if i > 0 && ((*lexems)[i-1].Type == isComma || (*lexems)[i-1].Type == lexOper) {
      continue main
   }
   for k := len(buffer) - 1; k >= 0; k-- {
   if buffer[k].Cmd == cmdSys {
      continue main
   }
}
break main

```

En général, l'algorithme lui-même correspond à un algorithme de conversion en notation polonaise inverse. Avec la prise en compte de l'appel des contrats, fonctions et index nécessaires, ainsi que d'autres éléments non rencontrés lors de l'analyse syntaxique et des options pour l'analyse des jetons de type lexIdent, alors les variables, fonctions ou contrats avec ce nom seront vérifiés. Si rien n'est trouvé et que ce n'est pas un appel de fonction ou de contrat, alors une erreur sera indiquée.

```
objInfo, tobj := vm.findObj(lexem.Value.(string), block)
if objInfo == nil && (!vm.Extern || i> *ind || i >= len(*lexems)-2 || (*lexems)[i+1].Type != isLPar) {
   return fmt.Errorf(`unknown identifier %s`, lexem.Value.(string))
}
```

Nous pourrions rencontrer une telle situation, et l'appel de contrat sera décrit ultérieurement. Dans cet exemple, si aucune fonction ou variable avec le même nom n'est trouvée, alors nous pensons qu'il est nécessaire d'appeler un contrat. Dans ce langage compilé, il n'y a pas de différence entre les contrats et les appels de fonction. Mais nous devons appeler le contrat à travers la fonction **ExecContract** utilisée dans le bytecode.

```
if objInfo.Type == ObjContract {
   if objInfo.Value != nil {
      objContract = objInfo.Value.(*Block)
   }
   objInfo, tobj = vm.findObj(`ExecContract`, block)
   isContract = true
}
```

Nous enregistrons le nombre de variables jusqu'à présent dans `count`, qui sera également écrit dans la pile avec le nombre de paramètres de la fonction. À chaque détection ultérieure de paramètres, nous devons simplement augmenter ce nombre d'une unité sur le dernier élément de la pile.

```
count := 0
if (*lexems)[i+2].Type != isRPar {
   count++
}
```

Nous avons une liste appelée "Used" de paramètres pour les contrats, puis nous devons marquer le cas où le contrat est appelé. Si le contrat est appelé sans paramètres, nous devons ajouter deux paramètres vides pour appeler **ExecContract** et obtenir au moins deux paramètres.

```
if isContract {
   name := StateName((*block)[0].Info.(uint32), lexem.Value.(string))
   for j := len(*block) - 1; j >= 0; j-- {
   topblock := (*block)[j]
      if topblock.Type == ObjContract {
         if topblock.Info.(*ContractInfo).Used == nil {
            topblock.Info.(*ContractInfo).Used = make(map[string]bool)
         }
         topblock.Info.(*ContractInfo).Used[name] = true
      }
   }
   bytecode = append(bytecode, &ByteCode{cmdPush, name})
   if count == 0 {
      count = 2
      bytecode = append(bytecode, &ByteCode{cmdPush, ""})
      bytecode = append(bytecode, &ByteCode{cmdPush, ""})
   }
   count++
}
```

Si nous voyons qu'il y a une parenthèse carrée à côté, alors nous ajoutons la commande **cmdIndex** pour obtenir la valeur par l'index.

```
if (*lexems)[i+1].Type == isLBrack {
   if objInfo == nil || objInfo.Type != ObjVar {
      return fmt.Errorf(`unknown variable %s`, lexem.Value.(string))
   }
   buffer = append(buffer, &ByteCode{cmdIndex, 0})
}
```

La fonction **CompileBlock** peut générer des arbres d'objets et des octets de code indépendants de l'expression. Le processus de compilation est basé sur une machine à états finis, tout comme un analyseur lexical, mais avec les différences suivantes. Premièrement, nous n'utilisons pas de symboles mais des jetons ; deuxièmement, nous décrirons immédiatement les variables *states* dans tous les états et transitions. Il représente un tableau d'objets indexés par type de jeton. Chaque jeton a une structure de *compileState*, et un nouvel état est spécifié dans *NewState*. Si la structure que nous avons résolue est claire, nous pouvons spécifier la fonction du gestionnaire dans le champ *Func*.

Prenons l'état principal comme exemple.

Si nous rencontrons un saut de ligne ou un commentaire, nous resterons dans le même état. Si nous rencontrons le mot-clé **contract**, alors nous changeons l'état en *stateContract* et commençons à analyser la structure. Si nous rencontrons le mot-clé **func**, alors nous changeons l'état en *stateFunc*. Si d'autres jetons sont reçus, la fonction générant une erreur sera appelée.

```
{// stateRoot
   lexNewLine: {stateRoot, 0},
   lexKeyword | (keyContract << 8): {stateContract | statePush, 0},
   lexKeyword | (keyFunc << 8): {stateFunc | statePush, 0},
   lexComment: {stateRoot, 0},
   0: {errUnknownCmd, cfError},
},
```

Supposons que nous rencontrions le mot-clé **func** et que nous ayons changé l'état en *stateFunc*. Étant donné que le nom de la fonction doit suivre le mot-clé **func**, nous conserverons le même état lors du changement du nom de la fonction. Pour tous les autres jetons, nous générerons des erreurs correspondantes. Si nous obtenons le nom de la fonction dans l'identificateur du jeton, alors nous passons à l'état *stateFParams*, où nous pouvons obtenir les paramètres de la fonction.

```
{// stateFunc
   lexNewLine: {stateFunc, 0},
   lexIdent: {stateFParams, cfNameBlock},
   0: {errMustName, cfError},
},
```

En même temps que les opérations ci-dessus, nous appellerons la fonction **fNameBlock**. Il convient de noter que la structure Block est créée avec la marque statePush, où nous l'obtenons à partir du tampon et la remplissons avec les données dont nous avons besoin. La fonction **fNameBlock** convient aux contrats et aux fonctions (y compris celles qui sont imbriquées). Elle remplit le champ *Info* avec la structure correspondante et s'écrit elle-même dans les *Objets* du bloc parent. De cette manière, nous pouvons appeler la fonction ou le contrat avec le nom spécifié. De même, nous créons des fonctions correspondantes pour tous les états et variables. Ces fonctions sont généralement très petites et effectuent certaines tâches lors de la construction de l'arbre de la machine virtuelle.

```
func fNameBlock(buf *[]*Block, state int, lexem *Lexem) error {
   var itype int
   prev := (*buf)[len(*buf)-2]
   fblock := (*buf)[len(*buf)-1]
   name := lexem.Value.(string)
   switch state {
      case stateBlock:
         itype = ObjContract
         name = StateName((*buf)[0].Info.(uint32), name)
         fblock.Info = &ContractInfo{ID: uint32(len(prev.Children) - 1), Name: name,
         Owner: (*buf)[0].Owner}
      default:
         itype = ObjFunc
         fblock.Info = &FuncInfo{}
   }
   fblock.Type = itype
   prev.Objects[name] = &ObjInfo{Type: itype, Value: fblock}
   return nil
}
```

Pour la fonction **CompileBlock**, elle parcourt simplement tous les jetons et change d'état en fonction des jetons décrits dans les états. Presque tous les jetons supplémentaires correspondent à des codes de programme supplémentaires.

* **statePush** - ajoute l'objet **Block** à l'arbre d'objets;
* **statePop** - utilisé lorsque le bloc se termine par une accolade fermante;
* **stateStay** - vous devez conserver la marque actuelle lors du passage à un nouvel état;
* **stateToBlock** - transition vers l'état **stateBlock** pour traiter les instructions *while* et *if*. Après le traitement des expressions, vous devez traiter les blocs à l'intérieur des accolades;
* **stateToBody** - transition vers l'état **stateBody**;
* **stateFork** - enregistre la position marquée. Lorsque l'expression commence par un identifiant ou un nom avec `$`, nous pouvons effectuer des appels de fonction ou des affectations;
* **stateToFork** - utilisé pour obtenir le jeton stocké dans **stateFork**, qui sera transmis à la fonction de traitement;
* **stateLabel** - utilisé pour insérer des commandes **cmdLabel**. La structure *while* nécessite ce drapeau;
* **stateMustEval** - vérifie la disponibilité des expressions conditionnelles au début des structures *if* et *while*.

En plus de la fonction **CompileBlock**, la fonction **FlushBlock** devrait également être mentionnée. Mais le problème est que l'arbre de blocs est construit indépendamment des machines virtuelles existantes. Plus précisément, nous obtenons des informations sur les fonctions et les contrats qui existent dans une machine virtuelle, mais nous collectons les blocs compilés dans un arbre séparé. Sinon, en cas d'erreur lors de la compilation, nous devons revenir à l'état précédent de la machine virtuelle. Par conséquent, nous accédons à l'arbre de compilation séparément, mais après que la compilation a réussi, la fonction **FlushContract** doit être appelée. Cette fonction ajoute l'arbre de blocs terminé à la machine virtuelle actuelle. La phase de compilation est maintenant terminée.

## Analyseur lexical {#lexical-analyzer}

L'analyseur lexical traite les chaînes entrantes et forme une séquence de jetons des types suivants :

* **lexSys** - jeton système, par exemple : `{}, [], (), ,, .` etc ;
* **lexOper** - jeton d'opération, par exemple : `+, -, /, \, *` ;
* **lexNumber** - nombre ;
* **lexident** - identifiant ;
* **lexNewline** - caractère de saut de ligne ;
* **lexString** - chaîne de caractères ;
* **lexComment** - commentaire ;
* **lexKeyword** - mot-clé ;
* **lexType** - type ;
* **lexExtend** - référence à des variables ou fonctions externes, par exemple : `$myname`.

Dans la version actuelle, une table de conversion (machine à états finis) est initialement construite à l'aide du fichier [lextable.go](#lextable-lextable-go) pour analyser les jetons, qui est ensuite écrit dans le fichier lex_table.go. En général, vous pouvez vous débarrasser de la table de conversion générée initialement par le fichier et créer une table de conversion en mémoire (`init()`) immédiatement au démarrage. L'analyse lexicale elle-même se produit dans la fonction lexParser du fichier [lex.go](#lex-go).

### lextable/lextable.go {#lextable-lextable-go}

Ici, nous définissons l'alphabet sur lequel nous opérons et décrivons comment la machine à états finis change d'un état à un autre en fonction du symbole suivant reçu.

*states* est un objet JSON contenant une liste d'états.

Sauf pour des symboles spécifiques, `d` représente tous les symboles non spécifiés dans l'état.
`n` représente 0x0a, `s` représente un espace, `q` représente une apostrophe inversée, `Q` représente des guillemets doubles, `r` représente un caractère >= 128, `a` représente AZ et az, et `1` représente les chiffres de 1 à 9.

Le nom de ces états est une clé, et les valeurs possibles sont répertoriées dans l'objet valeur. Ensuite, il y a un nouvel état pour effectuer des transitions pour chaque groupe. Ensuite, il y a le nom du jeton. Si nous devons revenir à l'état initial, le troisième paramètre est le jeton de service, qui indique comment traiter le symbole actuel.

Par exemple, nous avons l'état principal et les caractères entrants `/`, `"/": ["solidus", "", "push next"]`,

* **push** - donne la commande de se souvenir qu'il est dans une pile séparée ;
* **next*** - passe au caractère suivant et en même temps nous changeons le statut en **solidus**. Ensuite, obtient le caractère suivant et vérifie le statut de **solidus**.

Si le prochain caractère est `/` ou `/*`, alors nous passons à l'état de commentaire **comment** car ils commencent par `//` ou `/*`. Évidemment, chaque commentaire a un état différent par la suite, car ils se terminent par un symbole différent.

Si le prochain caractère n'est pas `/` et `*`, alors nous enregistrons tout dans la pile en tant que balises de type **lexOper**, nous vidons la pile et revenons à l'état principal.

Le module suivant convertit l'arbre d'état en un tableau numérique et l'écrit dans le fichier *lex_table.go*.

Dans la première boucle :

Nous formons un alphabet de symboles valides.

```
for ind, ch := range alphabet {
   i := byte(ind)
```

De plus, dans **state2int**, nous attribuons à chaque état un identifiant de séquence propre.

```
   state2int := map[string]uint{`main`: 0}
   if err := json.Unmarshal([]byte(states), &data); err == nil {
   for key := range data {
   if key != `main` {
   state2int[key] = uint(len(state2int))
```

Lorsque nous parcourons tous les états, chaque ensemble dans un état et chaque symbole dans un ensemble, nous écrivons un nombre de trois octets [identifiant nouvel état (0 = principal)] + [type de jeton (0-pas de jeton)] + [jeton].
La bidimensionnalité du tableau *table* est qu'il est divisé en états et 34 symboles d'entrée du tableau *alphabet*, qui sont disposés dans le même ordre.

Nous sommes dans l'état *principal* sur la ligne zéro du tableau *table*. Prenez le premier caractère, trouvez son index dans le tableau *alphabet* et obtenez la valeur de la colonne avec l'index donné. À partir de la valeur obtenue, nous recevons le jeton dans le octet de poids faible. Si l'analyse est terminée, le deuxième octet indique le type de jeton reçu. Dans le troisième octet, nous recevons l'index du prochain nouvel état.
Tout cela est décrit plus en détail dans la fonction **lexParser** dans le fichier *lex.go*.

Si vous souhaitez ajouter de nouveaux caractères, vous devez les ajouter au tableau *alphabet* et augmenter la quantité de la constante *AlphaSize*. Si vous souhaitez ajouter une nouvelle combinaison de symboles, elle doit être décrite dans l'état, similaire aux options existantes. Après l'opération ci-dessus, exécutez le fichier *lextable.go* pour mettre à jour le fichier *lex_table.go*.

### lex-go {#lex-go}
La fonction **lexParser** génère directement une analyse lexicale et renvoie un tableau de balises reçues en fonction des chaînes entrantes. Analysons la structure des jetons.

```
type Lexem struct {
   Type  uint32 // Type of the lexem
   Value interface{} // Value of lexem
   Line  uint32 // Line of the lexem
   Column uint32 // Position inside the line
}
```

* **Type** - type de jeton. Il a l'une des valeurs suivantes : `lexSys, lexOper, lexNumber, lexIdent, lexString, lexComment, lexKeyword, lexType, lexExtend` ;
* **Value** - valeur du jeton. Le type de valeur dépend du type de jeton. Analysons cela plus en détail :
* **lexSys** - comprend des crochets, des virgules, etc. Dans ce cas, `Type = ch << 8 | lexSys`, veuillez vous référer à la constante `isLPar ... isRBrack`, et sa valeur est un entier non signé de 32 bits ;
   * **lexOper** - la valeur représente une séquence de caractères équivalente sous forme de uint32. Voir les constantes `isNot ... isOr` ;
   * **lexNumber** - les nombres sont stockés en tant que int64 ou float64. S'il y a un point décimal, c'est un float64 ;
   * **lexIdent** - les identifiants sont stockés en tant que chaîne de caractères ;
   * **lexNewLine** - caractère de saut de ligne. Utilisé également pour calculer la ligne et la position du jeton ;
   * **lexString** - les lignes sont stockées en tant que chaîne de caractères ;
   * **lexComment** - les commentaires sont stockés en tant que chaîne de caractères ;
   * **lexKeyword** - pour les mots-clés, seuls les index correspondants sont stockés, voir la constante `keyContract ... keyTail`. Dans ce cas, `Type = KeyID << 8 | lexKeyword`. De plus, il convient de noter que les mots-clés `true, false, nil` seront immédiatement convertis en jetons de type lexNumber, et les types correspondants `bool` et `intreface {}` seront utilisés ;
   * **lexType** - cette valeur contient la valeur de type `reflect.Type` correspondante ;
   * **lexExtend** - identifiants commençant par un `$`. Ces variables et fonctions sont transmises de l'extérieur et sont donc attribuées à des types de jetons spéciaux. Cette valeur contient le nom en tant que chaîne de caractères sans le $ au début.
* **Line** - la ligne où se trouve le jeton ;
* **Column** - la position dans la ligne du jeton.

Analysons en détail la fonction **lexParser**. La fonction **todo** recherche l'index du symbole dans l'alphabet en fonction de l'état actuel et du symbole entrant, et obtient un nouvel état, un identifiant de jeton (le cas échéant) et d'autres jetons à partir de la table de conversion. L'analyse elle-même consiste à appeler la fonction **todo** successivement pour chaque caractère suivant et à passer à un nouvel état. Une fois que la balise est reçue, nous créons le jeton correspondant dans le critère de sortie et continuons le processus d'analyse. Il convient de noter que pendant le processus d'analyse, nous n'accumulons pas les symboles de jeton dans une pile ou un tableau séparé, car nous ne sauvegardons que le décalage du début du jeton. Après avoir obtenu le jeton, nous déplaçons le décalage du prochain jeton vers la position d'analyse actuelle.

Il ne reste plus qu'à vérifier les jetons d'état lexical utilisés dans l'analyse :

* **lexfPush** - ce jeton signifie que nous commençons à accumuler des symboles dans un nouveau jeton ;
* **lexfNext** - le caractère doit être ajouté au jeton actuel ;
* **lexfPop** - la réception du jeton est terminée. Généralement, avec ce drapeau, nous avons le type d'identifiant du jeton analysé ;
* **lexfSkip** - ce jeton est utilisé pour exclure des caractères de l'analyse. Par exemple, les barres obliques de contrôle dans la chaîne sont \n \r \". Ils seront automatiquement remplacés lors de l'étape d'analyse lexicale.

## Langage Needle {#needle-language}
### Lexemes {#lexemes}

Le code source d'un programme doit être encodé en UTF-8.

Les types lexicaux suivants sont traités :

* **Keywords** - ```action, break, conditions, continue, contract, data, else, error, false, func, If, info, nil, return, settings, true, var, warning, while```;
* **Number** - seuls les nombres décimaux sont acceptés. Il existe deux types de base : **int** et **float**. Si le nombre comporte un point décimal, il devient un **float**. Le type **int** est équivalent à **int64** en golang, tandis que le type **float** est équivalent à **float64** en golang.
* **String** - la chaîne de caractères peut être encadrée par des guillemets doubles ```("une chaîne de caractères")``` ou des guillemets inversés ```(\`une chaîne de caractères\`)```. Les deux types de chaînes peuvent contenir des caractères de nouvelle ligne. Les chaînes entre guillemets doubles peuvent contenir des guillemets doubles, des caractères de nouvelle ligne et des retours chariot échappés avec des barres obliques inverses. Par exemple, ```"Ceci est une \"première chaîne\".\r\nCeci est une deuxième chaîne."```.
* **Comment** - il existe deux types de commentaires. Les commentaires sur une seule ligne utilisent deux barres obliques (//). Par exemple, // Ceci est un commentaire sur une seule ligne. Les commentaires sur plusieurs lignes utilisent le symbole barre oblique et astérisque et peuvent s'étendre sur plusieurs lignes. Par exemple, ```/* Ceci est un commentaire sur plusieurs lignes */```.
* **Identifier** - les noms de variables et de fonctions sont composés de lettres a-z et A-Z, de symboles UTF-8, de chiffres et de traits de soulignement. Le nom peut commencer par une lettre, un trait de soulignement, ```@``` ou ```$```. Le nom commençant par ```$``` est le nom de la variable définie dans la **section data**. Le nom commençant par ```$``` peut également être utilisé pour définir des variables globales dans la portée des **sections conditions** et **action**. Les contrats de l'écosystème peuvent être appelés à l'aide du symbole ```@```. Par exemple : ```@1NouvelleTable(...)```.

### Types {#types}

Les types correspondants en golang sont spécifiés à côté des types Needle.

* **bool** - bool, **false** by default;
* **bytes** - []byte{}, un tableau vide de bytes par défaut;
* **int** - int64, **0** par défaut;
* **address** - uint64, **0** par défaut;
* **array** - []interface{}, un tableau vide par défaut;
* **map** - map[string]interface{}, un objet vide par défaut;
* **money** - decimal. Decimal, **0** par défaut;
* **float** - float64, **0** par défaut;
* **string** - string, une chaîne vide par défaut;
* **file** - map[string]interface{}, un objet vide par défaut.

Ces types de variables sont définis avec le mot-clé ```var```. Par exemple, ```var var1, var2 int```. Lorsqu'ils sont définis de cette manière, une variable sera affectée à une valeur par défaut selon son type.

Toutes les valeurs des variables sont de type interface{}, puis elles sont affectées aux types golang requis. Par conséquent, par exemple, les types array et map sont les types golang []interface{} et map[string]interface{}. Les deux types de tableaux peuvent contenir des éléments de n'importe quel type.

### Expressions {#expressions}

Une expression peut inclure des opérations arithmétiques, des opérations logiques et des appels de fonctions. Toutes les expressions sont évaluées de gauche à droite en fonction de la priorité des opérateurs. En cas de priorité égale, les opérateurs sont évalués de gauche à droite.

Priorité des opérations de haut en bas :

* **Appel de fonction et parenthèses** - lorsqu'une fonction est appelée, les paramètres passés sont calculés de gauche à droite ;
* **Opération unaire** - négation logique `!` et changement de signe arithmétique `-` ;
* **Multiplication et Division** - multiplication arithmétique `*` et division `/` ;
* **Addition et Soustraction** - addition arithmétique `+` et soustraction `-` ;
* **Comparaison logique** - `>=>> >=` ;
* **Égalité et inégalité logiques** - `== !=` ;
* **ET logique** - `&&` ;
* **OU logique** - `||`.

Lors de l'évaluation des opérateurs logiques ET et OU, les deux côtés de l'expression sont évalués dans tous les cas.

Needle ne vérifie pas les types lors de la compilation. Lors de l'évaluation des opérandes, une tentative est faite pour convertir le type en un type plus complexe. L'ordre de complexité des types peut être le suivant : ```string, int, float, money```. Seules certaines conversions de types sont implémentées. Le type string prend en charge les opérations d'addition, et le résultat sera une concaténation de chaînes de caractères. Par exemple, ```string + string = string, money-int = money, int * float = float```.

Pour les fonctions, une vérification des types est effectuée sur les types ```string``` et ```int``` lors de l'exécution.

**array** et **map** types peuvent être adressés par index. Pour le type **array**, la valeur **int** doit être spécifiée comme index. Pour le type **map**, une variable ou une valeur **string** doit être spécifiée. Si vous assignez une valeur à un élément de l'**array** dont l'index est supérieur à l'index maximum actuel, un élément vide sera ajouté à l'array. La valeur initiale de ces éléments est **nil**. Par exemple: .. code:

```
var my array
my[5] = 0
var mymap map
mymap["index"] = my[3]
```
In expressions of conditional logical values (such as `if, while, &&, ||, !`), the type is automatically converted to a logical value. If the type is not the default value, it is true.
```
var mymap map
var val string
if mymap && val {
...
}
```
### Portée {#scope}

Les accolades spécifient un bloc qui peut contenir des variables à portée locale. Par défaut, la portée d'une variable s'étend à ses propres blocs et à tous les blocs imbriqués. Dans un bloc, vous pouvez définir une nouvelle variable en utilisant le nom d'une variable existante. Cependant, dans ce cas, les variables externes portant le même nom deviennent indisponibles.

```
var a int
a = 3
{
   var a int
   a = 4
   Println(a) // 4
}
Println(a) // 3
```

### Exécution de contrat intelligent {#contract-execution}

Lors de l'appel d'un contrat intelligent, les paramètres définis dans **data** doivent lui être transmis. Avant d'exécuter un contrat, la machine virtuelle reçoit ces paramètres et les assigne aux variables correspondantes ($Param). Ensuite, la fonction prédéfinie **conditions** et la fonction **action** sont appelées.

Les erreurs survenant lors de l'exécution d'un contrat peuvent être divisées en deux types : les erreurs de formulaire et les erreurs d'environnement. Les erreurs de formulaire sont générées à l'aide de commandes spéciales : `error, warning, info` et lorsque la fonction intégrée renvoie `err` différent de *nil*.

Le langage Needle ne gère pas les exceptions. Toute erreur mettra fin à l'exécution des contrats. Étant donné qu'une pile séparée et une structure pour sauvegarder les valeurs des variables sont créées lors de l'exécution d'un contrat, le mécanisme de collecte des déchets de golang supprimera automatiquement ces données lors de l'exécution d'un contrat.

### Forme de Backus-Naur (BNF) {#backus-naur-form-bnf}

En informatique, BNF est une technique de notation pour la syntaxe sans contexte et est généralement utilisée pour décrire la syntaxe du langage utilisé en informatique.

* &lt;decimal digit&gt;
```
'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
```

* &lt;decimal number&gt;
```
<decimal digit> {<decimal digit>}
```

* &lt;symbol code&gt;
```
'''<any symbol>'''
```

* &lt;real number&gt;
```
['-'] <decimal number'.'[<decimal number>]
```

* &lt;integer number&gt;
```
['-'] <decimal number> | <symbol code>
```

* &lt;number&gt;
```
'<integer number> | <real number>'
```

* &lt;letter&gt;
```
'A' |'B' | ... |'Z' |'a' |'b' | ... |'z' | 0x80 | 0x81 | ... | 0xFF
```

* &lt;space&gt;
```
'0x20'
```

* &lt;tabulation&gt;
```
'0x09'
```

* &lt;newline&gt;
```
'0x0D 0x0A'
```

* &lt;special symbol&gt;
```
'!' |'"' |'$' |''' |'(' |')' |'\*' |'+' |',' |'-' |'.' |'/ '|'<' |'=' |'>' |'[' |'\\' |']' |'_' |'|' |'}' | '{' | <tabulation> | <space> | <newline>
```

* &lt;symbol&gt;
```
<decimal digit> | <letter> | <special symbol>
```

* &lt;name&gt;
```
(<letter> |'_') {<letter> |'_' | <decimal digit>}
```

* &lt;function name&gt;
```
<name>
```

* &lt;variable name&gt;
```
<name>
```

* &lt;type name&gt;
```
<name>
```

* &lt;string symbol&gt;
```
<tabulation> | <space> |'!' |'#' | ... |'[' |']' | ...
```

* &lt;string element&gt;
```
{<string symbol> |'\"' |'\n' |'\r'}
```

* &lt;string&gt;
```
'"' {<string element>}'"' |'\`' {<string element>}'\`'
```

* &lt;assignment operator&gt;
```
'='
```

* &lt;unary operator&gt;
```
'-'
```

* &lt;binary operator&gt;
```
'==' |'!=' |'>' |'<' |'<=' |'>=' |'&&' |'||' |'\*' |'/' |'+ '|'-'
```

* &lt;operator&gt;
```
<assignment operator> | <unary operator> | <binary operator>
```

* &lt;parameters&gt;
```
<expression> {','<expression>}
```

* &lt;contract call&gt;
```
<contract name>'(' [<parameters>]')'
```

* &lt;function call&gt;
```
<contract call> [{'.' <name>'(' [<parameters>]')'}]
```

* &lt;block contents&gt;
```
<block command> {<newline><block command>}
```

* &lt;block&gt;
```
'{'<block contents>'}'
```

* &lt;block command&gt;
```
(<block> | <expression> | <variables definition> | <if> | <while> | break | continue | return)
```

* &lt;if&gt;
```
'if <expression><block> [else <block>]'
```

* &lt;while&gt;
```
'while <expression><block>'
```

* &lt;contract&gt;
```
'contract <name> '{'[<data section>] {<function>} [<conditions>] [<action>]'}''
```

* &lt;data section&gt;
```
'data '{' {<data parameter><newline>} '}''
```

* &lt;data parameter&gt;
```
<variable name> <type name>'"'{<tag>}'"'
```

* &lt;tag&gt;
```
'optional | image | file | hidden | text | polymap | map | address | signature:<name>'
```

* &lt;conditions&gt;
```
'conditions <block>'
```

* &lt;action&gt;
```
'action <block>'
```

* &lt;function&gt;
```
'func <function name>'('[<variable description>{','<variable description>}]')'[{<tail>}] [<type name>] <block>'
```

* &lt;variable description&gt;
```
<variable name> {',' <variable name>} <type name>
```

* &lt;tail&gt;
```
'.'<function name>'('[<variable description>{','<variable description>}]')'
```

* &lt;variables definition&gt;
```
'var <variable description>{','<variable description>}'
```


