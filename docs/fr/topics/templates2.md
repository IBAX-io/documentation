# Langage de modèle {#template-language}

  - [Construction de pages](#page-construction)
    - [Moteur de templates](#template-engine)
    - [Créer des pages](#create-pages)
      - [Concepteur visuel de pages](#visual-page-designer)
      - [Styles applicables](#applicable-styles)
      - [Module de page](#page-module)
      - [Éditeur de ressources linguistiques](#language-resource-editor)
  - [Langage de template Logicor](#logicor-template-language)
    - [Aperçu de Logicor](#logicor-overview)
      - [Utiliser PageParams pour transmettre des paramètres aux pages](#use-pageparams-to-pass-parameters-to-pages)
      - [Appel de contrats](#calling-contracts)
  - [Classification des fonctions Logicor](#logicor-function-classification)
    - [Opérations sur les variables :](#operations-on-variables)
    - [Opérations de navigation :](#navigational-operations)
    - [Manipulation des données :](#data-manipulation)
    - [Présentation des données :](#data-presentation)
    - [Acceptation des données :](#accepting-of-data)
    - [Éléments de mise en forme des données :](#data-formatting-elements)
    - [Éléments de formulaire :](#form-elements)
    - [Opérations sur les blocs de code :](#operations-on-code-blocks)
  - [Références des fonctions Logicor](#logicor-function-references)
    - [Address](#address)
    - [AddressToId](#addresstoid)
    - [AddToolButton](#addtoolbutton)
    - [And](#and)
    - [AppParam](#appparam)
    - [ArrayToSource](#arraytosource)
    - [Binary](#binary)
    - [Button](#button)
    - [Calculate](#calculate)
    - [Chart](#chart)
    - [CmpTime](#cmptime)
    - [Code](#code)
    - [CodeAsIs](#codeasis)
    - [Data](#data)
    - [Custom](#custom)
    - [DateTime](#datetime)
    - [DBFind](#dbfind)
    - [Div](#div)
    - [EcosysParam](#ecosysparam)
    - [Em](#em)
    - [ForList](#forlist)
    - [Form](#form)
    - [GetColumnType](#getcolumntype)
    - [GetHistory](#gethistory)
    - [GetVar](#getvar)
    - [Hint](#hint)
    - [If](#if)
    - [Image](#image)
    - [ImageInput](#imageinput)
    - [Include](#include)
    - [Input](#input)
    - [InputErr](#inputerr)
    - [InputMap](#inputmap)
    - [JsonToSource](#jsontosource)
    - [Label](#label)
    - [LangRes](#langres)
    - [LinkPage](#linkpage)
    - [Map](#map)
    - [MenuGroup](#menugroup)
    - [MenuItem](#menuitem)
    - [Money](#money)
    - [Or](#or)
    - [P](#p)
    - [QRcode](#qrcode)
    - [RadioGroup](#radiogroup)
    - [Range](#range)
    - [Select](#select)
    - [SetTitle](#settitle)
    - [SetVar](#setvar)
    - [Span](#span)
    - [Strong](#strong)
    - [SysParam](#sysparam)
    - [Table](#table)
    - [TransactionInfo](#transactioninfo)
    - [VarAsIs](#varasis)
  - [Styles d'application pour les appareils mobiles](#app-styles-for-mobile-devices)
    - [Disposition](#layout)
      - [Titre](#title)
      - [Noms de classes forts](#strong-class-names)
      - [Couleur](#color)
      - [Grille](#grid)
      - [Panneau](#panel)
      - [Formulaire](#form-app)
      - [Bouton](#button-app)
      - [Icône](#icon)

## Construction de la page {#page-construction}

L'environnement de développement intégré (IDE) de Weaver est créé en utilisant React, une bibliothèque JavaScript. Il dispose d'un éditeur de pages et d'un concepteur de pages visuel. Les pages sont des parties essentielles d'une application, utilisées pour récupérer et afficher des données à partir de tables, créer des formulaires pour recevoir des données d'entrée utilisateur, transmettre des données à des contrats et naviguer entre les pages de l'application. Comme les contrats, les pages sont stockées dans la blockchain, ce qui garantit leur intégrité lorsqu'elles sont chargées dans le client logiciel.

### Moteur de templates {#template-engine}

Les éléments de page (pages et menus) sont créés par les développeurs dans le moteur de templates d'un nœud de vérification en utilisant le langage de template de l'éditeur de pages de Weaver. Toutes les pages sont construites en utilisant le langage Logicor développé par l'équipe de développement d'IBAX. Utilisez les commandes API content/... pour demander des pages aux nœuds du réseau. Ce que le moteur de templates renvoie en réponse à ce type de requête n'est pas une page HTML, mais un code JSON composé de balises HTML qui forment un arbre selon la structure du template. Si vous souhaitez tester le moteur de templates, vous pouvez vous référer à la commande API [content](../reference/api2.md#content).

### Créer des pages {#create-pages}

Vous pouvez utiliser l'éditeur de pages pour créer et modifier des pages, qui se trouvent dans la section Pages de l'outil de gestion de Weaver. L'éditeur peut être utilisé pour :

* Écrire le code de la page, mettre en évidence les mots-clés du langage de template Logicor ;
* Sélectionner et afficher des menus sur les pages ;
* Modifier la page du menu ;
* Configurer l'autorisation de modification des pages, en spécifiant le nom du contrat avec l'autorisation dans la fonction ContractConditions, ou en spécifiant directement l'autorisation d'accès dans les conditions de modification ;
* Démarrer le concepteur de pages visuel ;
* Prévisualiser les pages.

#### Concepteur de pages visuel {#visual-page-designer}

Le concepteur de pages visuel peut être utilisé pour créer des mises en page de pages sans utiliser de codes d'interface dans le langage Logicor. Avec lui, vous pouvez définir la position des éléments de formulaire et du texte sur les pages en les faisant glisser et en les déposant, et configurer la taille des blocs de page. Il fournit un ensemble de blocs prêts à l'emploi pour présenter des modèles de données standard : avec des titres, des formulaires et des panneaux d'information. Après avoir créé une page dans le concepteur de pages visuel, vous pouvez écrire la logique du programme pour recevoir des données et une structure conditionnelle dans l'éditeur de pages. À l'avenir, nous prévoyons de créer un concepteur de pages visuel avec des fonctions supplémentaires.

#### Styles applicables {#applicable-styles}

Par défaut, les pages sont présentées avec le style Bootstrap Angle d'Angular. Les utilisateurs peuvent créer leurs propres styles selon leurs besoins. Le style est stocké dans le paramètre de feuille de style du paramètre d'écosystème.

#### Module de page {#page-module}

Pour utiliser un bloc de code dans plusieurs pages, vous pouvez créer un module de page pour le contenir et l'intégrer dans le code de la page. Les modules de page peuvent être créés et modifiés dans les blocs de module de Weaver. Comme pour les pages, les autorisations de modification peuvent être définies.

#### Éditeur de ressources linguistiques {#language-resource-editor}

Weaver inclut un mécanisme de localisation des pages en utilisant une fonction **LangRes** du langage de modèle Logicor. Il peut remplacer les balises de ressources linguistiques sur la page par des lignes de texte correspondant à la langue sélectionnée par l'utilisateur dans le client logiciel ou le navigateur. Vous pouvez utiliser la syntaxe abrégée **$lable$** au lieu de la fonction **LangRes**. La traduction des messages dans les fenêtres contextuelles initiées par le contrat est effectuée par la fonction **LangRes** de Needle.

Vous pouvez créer et modifier des ressources linguistiques dans la section Ressources linguistiques de Weaver. Une ressource linguistique est composée de noms d'étiquettes et de la traduction correspondante de ces noms dans différentes langues, ainsi que de l'identifiant de langue à deux lettres correspondant (EN, ZH, JP, etc.).

Les autorisations d'ajout et de modification des ressources linguistiques peuvent être définies de la même manière que pour les autres tables.

## Langage de modèle Logicor {#logicor-template-language}

Les fonctions Logicor fournissent les opérations suivantes :

* Récupérer des valeurs de la base de données : ```DBFind```, afficher les données récupérées de la base de données sous forme de tableaux et de graphiques ;
* Opérations sur les données pour attribuer et afficher des valeurs de variables : ```SetVar, GetVar, Data``` ;
* Afficher et comparer des valeurs de date/heure : ```DateTime, Now, CmpTime``` ;
* Utiliser différents champs de saisie de données utilisateur pour construire des formulaires : ```Form, ImageInput, Input, RadioGroup, Select``` ;
* Vérifier les données dans le champ du formulaire en affichant des messages d'erreur : ```Validate, InputErr``` ;
* Afficher les éléments de navigation : ```AddToolButton, LinkPage, Button``` ;
* Appeler des contrats : ```Button``` ;
* Créer des éléments de mise en page HTML, y compris diverses balises et choisir des classes CSS spécifiques : ```Div, P, Span, etc``` ;
* Intégrer et décharger des images sur les pages : ```Image, ImageInput``` ;
* Afficher les conditions d'un fragment de mise en page de la page : ```If, ElseIf, Else``` ;
* Créer des menus multi-niveaux ;
* Localisation de la page.

### Aperçu de Logicor {#logicor-overview}

Le langage de modèle de page Logicor est un langage fonctionnel qui permet à une fonction d'appeler une autre fonction ```NomFonction(paramètres)``` et de les imbriquer les unes dans les autres. Vous pouvez spécifier des paramètres sans guillemets et supprimer les paramètres inutiles.

Si le paramètre contient une virgule, il doit être encadré de guillemets (guillemets inversés ou guillemets doubles). Si une fonction ne peut avoir qu'un seul paramètre, vous pouvez utiliser une virgule sans guillemets. De plus, si le paramètre comporte une parenthèse fermante non appariée, des guillemets doivent être utilisés.

Si vous mettez un paramètre entre guillemets, mais que le paramètre lui-même contient des guillemets, vous pouvez utiliser différents types de guillemets ou plusieurs guillemets dans le texte.

Dans la définition de la fonction, chaque paramètre a un nom spécifique. Vous pouvez appeler la fonction et spécifier les paramètres dans l'ordre de déclaration, ou tout ensemble de paramètres dans n'importe quel ordre de nom : ```Nom_paramètre: Valeur_paramètre```. En utilisant cette méthode, vous pouvez ajouter en toute sécurité de nouveaux paramètres de fonction sans rompre la compatibilité avec le modèle actuel :

Les fonctions peuvent renvoyer du texte, générer des éléments HTML (par exemple, ```Input```), ou créer des éléments HTML avec des éléments HTML imbriqués (```Div, P, Span```). Dans ce dernier cas, un paramètre avec le nom prédéfini Body est utilisé pour définir l'élément imbriqué. Par exemple, l'imbrication de deux divs dans un autre div ressemble à ceci :

Pour définir les éléments imbriqués décrits dans le paramètre Body, la notation suivante peut être utilisée : ```NomFonction(...){...}```. Les éléments imbriqués doivent être spécifiés entre accolades :

Si vous avez besoin de spécifier la même fonction plusieurs fois de suite, vous pouvez utiliser le point `.` au lieu d'écrire son nom à chaque fois. Par exemple, les exemples suivants sont identiques :

Avec ce langage, vous pouvez attribuer une variable avec la fonction SetVar et faire référence à sa valeur avec `#nom#`.

Pour faire référence aux ressources linguistiques de l'écosystème, vous pouvez utiliser `$langres$`, où langres est le nom de la langue.

Les variables suivantes sont prédéfinies :

* `#key_id#` - Adresse du compte de l'utilisateur actuel;
* `#ecosystem_id#` - ID de l'écosystème actuel;
* `#guest_key#` - Adresse du compte invité;
* `#isMobile#` - 1, si Weaver s'exécute sur un appareil mobile.

#### Utilisez PageParams pour transmettre des paramètres aux pages {#use-pageparams-to-pass-parameters-to-pages}

De nombreuses fonctions prennent en charge le paramètre `PageParams`, qui est utilisé pour transmettre des paramètres lors de la redirection vers une nouvelle page. Par exemple : `PageParams:"param1=valeur1,param2=valeur2"`. La valeur du paramètre peut être une chaîne simple ou une variable avec une valeur de référence. Lors de la transmission de paramètres aux pages, une variable avec le nom du paramètre est créée, par exemple `#param1#` et `#param2#`.

- `PageParams:"hello=monde"` - La nouvelle page reçoit le paramètre `hello` avec `monde` comme valeur ;
- `PageParams:"hello=#monde#"` - La nouvelle page reçoit le paramètre `hello` avec la valeur de la variable `monde`.

De plus, la fonction `Val` permet d'obtenir des données à partir de formulaires, qui sont spécifiées dans la redirection.

- `PageParams:"hello=Val(monde)"` - La nouvelle page reçoit le paramètre `hello` avec la valeur de l'élément de formulaire `monde`.


#### Appels de contrats {#calling-contracts}

Logicor implémente les appels de contrat en cliquant sur la fonction Button dans un formulaire. Une fois qu'un événement est déclenché, les données saisies par l'utilisateur dans un champ de formulaire sur la page seront transmises au contrat. Si le nom du champ de formulaire correspond au nom de la variable dans la section des données du contrat appelé, les données seront automatiquement transférées. La fonction Button permet d'ouvrir une fenêtre modale pour que l'utilisateur puisse vérifier l'exécution du contrat, et d'initier la redirection vers la page spécifiée lorsque le contrat est exécuté avec succès, et de transmettre certains paramètres à la page.

## Classification des fonctions Logicor {#logicor-function-classification}

### Opérations sur les variables: {#operations-on-variables}

|        |        |         |
| ------ | ------ | ------- |
| [GetVar](#getvar) | [SetVar](#setvar) | [VarAsIs](#varasis) |

### Opérations de navigation: {#navigational-operations} 

|               |        |          |
| ------------- | ------ | -------- |
| [AddToolButton](#addtoolbutton) | [Button](#button) | [LinkPage](#linkpage) |

### Manipulation des données: {#data-manipulation}

|           |          |       |
| --------- | -------- | ----- |
| [Calculate](#calculate) | [DateTime](#datetime) | [Money](#money) |
| [CmpTime](#cmptime)   |          |       |

### Présentation des données: {#data-presentation}

|          |           |          |
| -------- | --------- | -------- |
| [Code](#code)     | [Hint](#hint)      | [MenuItem](#menuitem) |
| [CodeAsIs](#codeasis) | [Image](#image)     | [QRcode](#qrcode)   |
| [Chart](#chart)    | [MenuGroup](#menugroup) | [Table](#table)    |
| [ForList](#forlist)  |           |          |

### Acceptation des données: {#accepting-of-data}

|             |               |                 |
| ----------- | ------------- | --------------- |
| [Address](#address)     | [EcosysParam](#ecosysparam)   | [LangRes](#langres)         |
| [AddressToId](#addresstoid) | [GetHistory](#gethistory)    | [Range](#range)           |
| [AppParam](#appparam)    | [GetColumnType](#getcolumntype) | [SysParam](#sysparam)        |
| [Data](#data)        | [JsonToSource](#jsontosource)  | [Binary](#binary)          |
| [DBFind](#dbfind)      | [ArrayToSource](#arraytosource) | [TransactionInfo](#transactioninfo) |

### Éléments de formatage des données: {#data-formatting-elements}

|      |          |        |
| ---- | -------- | ------ |
| [Div](#div)  | [SetTitle](#settitle) | [Span](#span)   |
| [Em](#em)   | [Label](#label)    | [Strong](#strong) |
| [P](#p)    |          |        |

### Éléments de formulaire: {#form-elements}

|            |            |          |
| ---------- | ---------- | -------- |
| [Form](#form)       | [InputErr](#inputerr)   | [InputMap](#inputmap) |
| [ImageInput](#imageinput) | [RadioGroup](#radiogroup) | [Map](#map)      |
| [Input](#input)      | [Select](#select)     |          |

### Opérations sur les blocs de code: {#operations-on-code-blocks}

|      |      |         |
| ---- | ---- | ------- |
| [If](#if)   | [Or](#or)   | [Include](#include) |
| [And](#and)  |      |         |



## Références de fonctions Logicor {#logicor-function-references}

### Address {#address}

Cette fonction renvoie l'adresse du portefeuille `xxxx-xxxx-...-xxxx` d'une adresse de compte spécifique ; si aucune adresse n'est spécifiée, l'adresse du compte de l'utilisateur actuel sera utilisée comme paramètre.

**Syntaxe**

```
Address(account)

```
> Address
  * `account`
  
    Adresse du compte.

**Exemple**

```
Span(Your wallet: Address(#account#))
```

### AddressToId {#addresstoid}

Il renvoie l'adresse du compte d'une adresse de portefeuille spécifique xxxx-xxxx-...-xxxx.

**Syntaxe**

```
AddressToId(Wallet)
```

> AddressToId
  * `Wallet`
  
    L'adresse du portefeuille au format XXXX-...-XXXX.

**Exemple**

```
AddressToId(#wallet#)
```

### AddToolButton {#addtoolbutton}

Créez un panneau de boutons avec un élément addtoolbutton.

**Syntaxe**

```
AddToolButton(Title, Icon, Page, PageParams)
 [.Popup(Width, Header)]
```



> AddToolButton

  * `Title`
  
    Titre du bouton.

  * `Icon`
  
    Style d'icône du bouton.

  * `Page`
  
    Nom de la page de redirection.

  * `PageParams`
  
    Les paramètres transmis à la page.

    

> Popup

  La fenêtre modale apparaît.

  * `Header`

    Titre de la fenêtre.

  * `Width`

    Pourcentage de la largeur de la fenêtre.
    Sa plage va de 1 à 100.

**Exemple**

```
AddToolButton(Title: $@1broadcast$, Page: @1notifications_broadcast, Icon: icon-plus).Popup(Header: $@1notifications_broadcast$, Width: "50")
```

### And {#and}

Il renvoie le résultat d'une opération logique "et". Tous les paramètres énumérés entre parenthèses sont séparés par des virgules. Si l'un des paramètres est une chaîne vide, zéro ou `false`, la valeur du paramètre est `false`, sinon la valeur du paramètre est `true`. Si la valeur du paramètre est `true`, la fonction renvoie `1`, sinon elle renvoie `0`.

**Syntaxe**

```
And(parameters)
```

**Exemple**

```
If(And(#myval1#,#myval2#), Span(OK))
```

### AppParam {#appparam}

Affichez la valeur du paramètre d'application, qui est extraite de la table app_params de l'écosystème actuel. Si une ressource linguistique avec le nom spécifié existe, sa valeur sera automatiquement remplacée.

**Syntaxe**
```
AppParam(App, Name, Index, Source)

```

> AppParam

  * `App`
  
    Identifiant de l'application.

  * `Name`

    Nom du paramètre.

  * `Index`

    Il peut être utilisé lorsque la valeur du paramètre est une liste séparée par des virgules.
    Les éléments du paramètre sont indexés à partir de 1. Par exemple, si `type = full,light`, alors `AppParam(1, type, 2)` renvoie `light`.
    Il ne peut pas être utilisé en conjonction avec le paramètre Source.

  * `Source`

    Il peut être utilisé lorsque la valeur du paramètre est une liste séparée par des virgules.
    Créez un objet de données dont les éléments sont les valeurs de paramètres spécifiques. Cet objet peut être utilisé comme source de données pour les fonctions [Table](#table) et [Select](#select).
    Il ne peut pas être utilisé en conjonction avec le paramètre Index.

**Exemple**

```
AppParam(1, type, Source: mytype)
```

### ArrayToSource {#arraytosource}

Créez un élément arraytosource et remplissez-le avec les paires clé-valeur d'un tableau JSON. Les données obtenues sont placées dans l'élément Source, qui peut être utilisé ultérieurement dans la fonction d'entrée source (par exemple, Table).

**Syntaxe**
```
ArrayToSource(Source, Data)

```

> ArrayToSource

  * `Source`
  
    Nom de la source de données.

  * `Data`

    Un tableau JSON ou un nom de variable contenant un tableau JSON (`#name#`).

**Exemple**

```
ArrayToSource(src, #myjsonarr#)
ArrayToSource(dat, [1, 2, 3])
```

### Binary {#binary}

Renvoie les liens vers les fichiers statiques stockés dans la table binaire "binaries".

**Syntaxe**
```
Binary(Name, AppID, MemberID)[.ById(ID)][.Ecosystem(ecosystem)]
```

> Binary

  * `Name`
  
    Nom du fichier.

  * `AppID`
  
    ID de l'application.

  * `MemberID`

    Adresse du compte, 0 par défaut.

  * `ID`

    ID du fichier statique.
    
  * `Ecosystem`

    ID de l'écosystème. S'il n'est pas spécifié, le fichier binaire est demandé à l'écosystème actuel.

**Exemple**

```
Image(Src: Binary("my_image", 1))
Image(Src: Binary().ById(2))
Image(Src: Binary().ById(#id#).Ecosystem(#eco#))
```

### Button {#button}

Créez un élément HTML de type bouton qui permettra d'appeler un contrat ou d'ouvrir une page.

**Syntaxe**
```
Button(Body, Page, Class, Contract, Params, PageParams)
 [.CompositeContract(Contract, Data)]
 [.Alert(Text, ConfirmButton, CancelButton, Icon)]
 [.Popup(Width, Header)]
 [.Style(Style)]
 [.ErrorRedirect(ErrorID,PageName,PageParams)]
```

> Button

  * `Body`
  
    Texte ou élément enfant.

  * `Page`

    Nom de la page vers laquelle la redirection est effectuée.

  * `Class`

    Classe du bouton.

  * `Contract`

    Nom du contrat appelé.

  * `Params`

    Liste de valeurs passées au contrat. Normalement, la valeur du paramètre du contrat (section des données) est obtenue à partir d'un élément HTML (tel qu'un champ de saisie) d'identifiant portant un nom similaire. Si l'identifiant de l'élément est différent du nom du paramètre du contrat, alors la valeur doit être assignée dans le format suivant : contractField1=idname1, contractField2=idname2. Ce paramètre est renvoyé à attr sous la forme de l'objet {contractField1: idname1, contractField2: idname2}.

  * `PageParams`

    Format des paramètres passés à la page de redirection : pageField1=idname1, pageField2=idname2. Des variables portant les noms de paramètres de la page cible, tels que #pageField1 et #pageField2, sont créées sur la page cible et se voient attribuer les valeurs spécifiées. Voir plus de spécifications pour le passage de paramètres Utiliser PageParams pour passer des paramètres aux pages.

  
> CompositeContract

  Utilisé pour ajouter des contrats supplémentaires au bouton. CompositeContract peut être utilisé plusieurs fois.

  * `Name`

   Nom du contrat.

  * `Data`

    Les paramètres du contrat sont des tableaux JSON.

> Alert

  Display the message.

  * `Text`

    Texte du message.

  * `ConfirmButton`
  
    Titre du bouton de confirmation.

  * `CancelButton`

    Titre du bouton Annuler.

  * `Icon`

    Icône du bouton.

> Popup

  Fenêtre modale de sortie.

  * `Header`

    Titre de la fenêtre.

  * `Width`

    Pourcentage de la largeur de la fenêtre.
    Sa plage va de 1 à 100.

> Style

  Le style CSS spécifié.

  * `Style`

    Style CSS.

> ErrorRedirect

 Spécifiez et redirigez vers une page lorsque la fonction :ref:contractfundef-Throw génère une erreur lors de l'exécution du contrat. Il peut y avoir plusieurs appels ErrorRedirect. Par conséquent, lors du retour de l'attribut *errredirect*, la clé de l'attribut est ErrorID et la valeur est la liste des paramètres.

  * `ErrorID`

    Erreur ID.

  * `PageName`

   Nom de la page de redirection.

  * `PageParams`

    Paramètres transmis à la page.

**Exemple**

```
Button(Submit, default_page, mybtn_class).Alert(Alert message)
Button(Contract: MyContract, Body:My Contract, Class: myclass, Params:"Name=myid,Id=i10,Value")
```

### Calculate {#calculate}
Il renvoie le résultat de l'expression arithmétique passée en paramètre Exp. Les opérations suivantes sont applicables : +, -, *, / et les parenthèses ().

**Syntaxe**
```
Calculate(Exp, Type, Prec)
```

> Calculate

  * `Exp`

    Une expression arithmétique, contenant des nombres et la variable #name#.

  * `Type`

    Type de données du résultat : int, float, argent. Si non spécifié, il s'agit d'un float s'il y a un nombre avec un point décimal, sinon c'est un int.

  * `Prec`

    données de type float et argent, avec deux chiffres significatifs après la virgule.

**Exemple**

```
Calculate( Exp: (342278783438+5000)\*(#val#-932780000), Type: money, Prec:18 )
Calculate(10000-(34+5)\*#val#)
Calculate("((10+#val#-45)\*3.0-10)/4.5 + #val#", Prec: 4)
```

### Chart {#chart}

Créez des graphiques HTML.

**Syntaxe**
```
Chart(Type, Source, FieldLabel, FieldValue, Colors)
```

> Chart

  * `Type`

    Type de graphique.

  * `Source`

    Nom de la source de données, par exemple, obtenu à partir de la fonction [DBFind](#dbfind).

  * `FieldLabel`

    Nom du champ d'en-tête.

  * `FieldValue`

    Nom du champ de valeur.
    
  * `Colors`

    Liste de couleurs.


**Exemple**

```
Data(mysrc,"name,count"){
    John Silver,10
    "Mark, Smith",20
    "Unknown ""Person""",30
}
Chart(Type: "bar", Source: mysrc, FieldLabel: "name", FieldValue: "count", Colors: "red, green")
```

### CmpTime {#cmptime}

Il compare deux valeurs de temps dans le même format.
Il prend en charge unixtime, `YYYY-MM-DD HH:MM:SS` et tout autre format de temps, tel que `YYYYMMDD`.

**Syntaxe**

```
CmpTime(Time1, Time2)
```


Valeur de retour

* `-1` - Time1 <Time2;
* `0` - Time1 = Time2;
* `1` - Time1> Time2.

**Exemple**

```
If(CmpTime(#time1#, #time2#)<0){...}
```

### Code {#code}

Créez un élément de code pour afficher le code spécifié.

Il substitue une variable par la valeur de la variable (par exemple, `#name#`).

**Syntaxe**
```
Code(Text)
```

> Code

  * `Text`

    Code source.

**Exemple**

```
Code( P(This is the first line.
    Span(This is the second line.))
)
```

### CodeAsIs {#codeasis}

Créez un élément de code pour afficher le code spécifié.
Il ne remplace pas une variable par sa valeur. Par exemple, `#name#` sera affiché tel quel.

**Syntaxe**
```
CodeAsIs(Text)
```

> CodeAsIs
  * `Text`

    Source code.

**Exemple**

```
CodeAsIs( P(This is the #test1#.
    Span(This is the #test2#.))
)
```

### Data {#data}

Créez un élément de données, remplissez-le avec les données spécifiées et placez-le dans Source. Ensuite, vous pouvez recevoir Source en tant qu'entrée de données dans [Tableau](#tableau) et d'autres fonctions. La séquence des noms de colonnes correspond à la séquence des valeurs de saisie des données.

**Syntaxe**
```
Data(Source,Columns,Data)
 [.Custom(Column){Body}]
```

> Data
  * `Source`

    Nom de la source de données. Vous pouvez spécifier n'importe quel nom qui sera utilisé ultérieurement dans d'autres fonctions en tant que source de données.

  * `Columns`

    Une liste de noms de colonnes, séparés par des virgules.

  * `Data`

    Ensemble de données.

    Un enregistrement par ligne. Les valeurs des colonnes doivent être séparées par des virgules. Les données et les colonnes doivent être définies dans le même ordre.

    Les valeurs contenant des virgules doivent être placées entre guillemets doubles (`"exemple1, exemple2", 1, 2`). Les valeurs entre guillemets doivent être mises entre deux guillemets doubles (`"""exemple", "exemple2""", 1, 2`).

    

### Custom {#custom}

    Vous pouvez attribuer des colonnes calculées aux données. Par exemple, vous pouvez spécifier des modèles de champ pour les boutons et autres éléments de mise en page de la page. Ces modèles de champ sont généralement attribués à [Table](#table) et à d'autres fonctions pour recevoir des données.
    Utilisez plusieurs fonctions personnalisées si vous souhaitez attribuer plusieurs colonnes calculées.

  * `Column`

    Nom de colonne, qui est unique et obligatoire.

  * `Body`

    Bloc de code. Vous pouvez utiliser `#nomcolonne#` pour obtenir les valeurs des autres colonnes de l'entrée, puis utiliser ces valeurs dans des blocs de code.

**Exemple**

```
Data(mysrc,"id,name"){
    "1",John Silver
    2,"Mark, Smith"
    3,"Unknown ""Person"""
 }.Custom(link){Button(Body: View, Class: btn btn-link, Page: user, PageParams: "id=#id#"}
```

### DateTime {#datetime}

Afficher l'heure et la date dans le format spécifié.

**Syntaxe**
```
DateTime(DateTime, Format)
```

> DateTime

  * `DateTime`

    Heure et date exprimées en unixtime ou au format standard `2006-01-02T15:04:05`.

  * `Format`

    Modèle de format : année au format à 2 chiffres `YY`, au format à 4 chiffres `YYYY`, mois en `MM`, jour en `DD`, heure en `HH`, minute en `MM`, seconde en `SS`, par exemple : `YY/MM/DD HH:MM`.
    S'il n'est pas spécifié ou manquant, `YYYY-MM-DD HH:MI:SS` sera utilisé.


**Exemple**

```
DateTime(2017-11-07T17:51:08)
DateTime(#mytime#,HH:MI DD.MM.YYYY)
```

### DBFind {#dbfind}

Créez un élément dbfind, remplissez-le avec les données de la table table et placez-le dans la structure Source, qui peut ensuite être utilisée pour les données d'entrée de [Table](#table) et d'autres fonctions Source.

**Syntaxe**
```
DBFind(table, Source)
    [.Columns(columns)]
    [.Where(conditions)]
    [.WhereId(id)]
    [.Order(name)]
    [.Limit(limit)]
    [.Offset(offset)]
    [.Count(countvar)]
    [.Ecosystem(id)]
    [.Cutoff(columns)]
    [.Custom(Column){Body}]
    [.Vars(Prefix)]
```

> DBFind

  * `table`

    Nom de la table.
* `Source`

    Nom de la source de données.

> Colonnes

  * `columns`

    Si non spécifié, une liste de tous les champs sera renvoyée. Si un champ de type JSON est présent, vous pouvez utiliser la syntaxe suivante pour traiter le champ de l'enregistrement : `columnname->fieldname`. Dans ce cas, le nom de champ généré est `columnname.fieldname`.

> Where

  * `conditions`

   Conditions de requête de données. Voir DBFind.
   Si un champ est de type JSON, vous pouvez utiliser la syntaxe suivante pour traiter le champ de l'enregistrement : `nomcolonne->nomchamp`.

> WhereId

  Requête par ID, par exemple `.WhereId(1)`.

  * `Id`

    Identifiant d'entrée.

> Order

  Trier par champ.
  Pour plus d'informations sur la syntaxe de tri, voir [DBFind](#dbfind).

  * `name`

    Nom du champ

> Limit

  * `limit`
  
    Le nombre d'entrées retournées est de 25 par défaut. Le nombre maximum est de 10 000.

> Offset

  * `Offset`

    Décalage.

> Count

  Spécifiez le nombre total de lignes de la condition Where.
  En plus de le stocker dans une variable, le compte total est retourné dans le paramètre count de l'élément dbfind.

  Si Where et WhereID ne sont pas spécifiés, le compte total des lignes dans la table sera retourné.

  * `countvar`

    Nom de la variable qui contient le nombre de lignes.

> Ecosystem

  * `Id`

   Identifiant de l'écosystème. Par défaut, les données proviennent de la table spécifiée dans l'écosystème actuel.

> Cutoff

  Utilisé pour découper et afficher de grandes quantités de données textuelles.

  * `columns`

    Une liste de champs séparés par des virgules qui doivent être traités par la fonction Cutoff.
    La valeur du champ sera remplacée par un objet JSON qui contient deux champs : link et title. Si la valeur du champ contient plus de 32 caractères, le lien pointant vers les 32 premiers caractères du texte complet est renvoyé. Si la valeur du champ contient 32 caractères ou moins, le lien est défini comme vide et le titre contient la valeur complète du champ.

> Custom

  Vous pouvez attribuer des colonnes calculées aux données. Par exemple, vous pouvez spécifier des modèles de champ pour les boutons et autres éléments de mise en page de la page. Ces modèles de champ sont généralement attribués à [Table](#table) et d'autres fonctions pour recevoir des données.
  Si vous souhaitez attribuer plusieurs colonnes calculées, utilisez plusieurs fonctions personnalisées.

  * `Column`

    Nom de colonne, qui est unique et obligatoire.

  * `Body`

    Bloc de code. Vous pouvez utiliser `#nomcolonne#` pour obtenir les valeurs des autres colonnes de l'entrée, puis utiliser ces valeurs dans des blocs de code.

> Vars

  La première ligne obtenue par la requête générera un ensemble de variables avec des valeurs. Lorsqu'il est spécifié, le paramètre Limit devient automatiquement 1, et seul un (1) enregistrement est renvoyé.

  * `Prefix`

    Le préfixe ajouté au nom de la variable. Son format est `#prefixe_nomcolonne#`, où le nom de la colonne suit immédiatement le symbole du trait de soulignement. Si une colonne contient un champ JSON, la variable générée sera dans le format suivant : `#prefixe_nomcolonne_champ#`.

**Exemple**

```
DBFind(parameters,myparam)
DBFind(parameters,myparam).Columns(name,value).Where({name:"money"})
DBFind(parameters,myparam).Custom(myid){Strong(#id#)}.Custom(myname){
   Strong(Em(#name#))Div(myclass, #company#)
}
```

### Div {#div}

Créez un élément div HTML.

**Syntaxe**
```
Div(Class, Body)
 [.Style(Style)]
 [.Show(Condition)]
 [.Hide(Condition)]
```

> Div

  * `Class`

    Nom de la classe de la div.

  * `Body`

    Élément enfant.

> Style

  Le style CSS spécifié.

  * `Style`

   Style CSS.

> Show

 Définissez les conditions d'affichage de la Div.

   * `Condition`

   Voir ci-dessous.

> Hide

 Définissez les conditions pour masquer une Div.

   * `Condition`

  Le format de l'expression est `NomEntrée=Valeur`, lorsque toutes les expressions sont vraies, *Condition* est vraie, et lorsque la valeur de `NomEntrée` est égale à `Valeur`, *Condition* est vraie. Si plusieurs *Afficher* ou *Masquer* sont appelés, il doit y avoir au moins un paramètre *Condition* qui est vrai.

**Exemple**

```
Form(){
    Div(text-left){
        Input(Name: "broadcast", Type: "checkbox", Value: "false")
    }
    Div(text-left){
        hello
    }.Show("broadcast=false")
    Div(text-left){
        world
    }.Hide("broadcast=false")
}
```

### EcosysParam {#ecosysparam}

Cette fonction obtient les valeurs des paramètres à partir du tableau des paramètres de l'écosystème actuel. Si le nom du résultat retourné contient des ressources linguistiques, il sera traduit en conséquence.

**Syntaxe**
```
EcosysParam(Name, Index, Source)
```

> EcosysParam

  * `Name`

    Nom du paramètre.

  * `Index`

    Si le paramètre demandé est une liste d'éléments séparés par des virgules, vous pouvez spécifier un index à partir de 1. Par exemple, si `gender = male,female`, alors `gender = male,female` renvoie `female`.
    Il ne peut pas être utilisé en conjonction avec le paramètre Source.

  * `Source`

    Il peut être utilisé lorsque la valeur du paramètre est une liste séparée par des virgules.
    Créez un objet de données dont les éléments sont les valeurs des paramètres spécifiés. Cet objet peut être utilisé comme source de données pour les fonctions [Table](#table) et [Select](#select).
    Il ne peut pas être utilisé en conjonction avec le paramètre Index.

```
Address(EcosysParam(founder_account))
EcosysParam(gender, Source: mygender)

EcosysParam(Name: gender_list, Source: src_gender)
Select(Name: gender, Source: src_gender, NameColumn: name, ValueColumn: id)
```

### Em {#em}

Créez un élément HTML "em".

**Syntaxe**
```
Em(Body, Class)
```

> Em

  * `Body`

    Enfant texte ou élément.

  * `Class`

    Le nom de la classe em.

**Exemple**

```
This is an Em(important news).
```

### ForList {#forlist}

Afficher la liste des éléments dans la source de données Source dans le format de modèle défini dans le corps et créer un élément **forlist**.

**Syntaxe**
```
ForList(Source, Index){Body}
```

> ForList

  * `Source`

    Source de données obtenue à partir de la fonction [DBFind](#dbfind) ou [Data](#data).

  * `Index`

    La variable du compteur d'itération, commençant à partir de 1.
    Un paramètre facultatif. Si non spécifié, la valeur du compteur d'itération sera écrite dans la variable [Source] _index.

  * `Body`

    Modèle pour insérer des éléments.

```
ForList(mysrc){Span(#mysrc_index#. #name#)}
```

### Form {#form}

  Créez un élément de formulaire HTML.

**Syntaxe**
```
Form(Class, Body) [.Style(Style)]
```
> Form

  * `Body`

    Enfant texte ou élément.

  * `Class`

    Nom de la classe du formulaire.

> Style

  Le style CSS spécifié.

  * `Style`

   Style CSS.

**Exemple**

```
Form(class1 class2, Input(myid))
```

### GetColumnType {#getcolumntype}

Renvoie le type de données du champ d'une table spécifique.

Les types renvoyés comprennent : `texte, varchar, nombre, argent, double, octets, json, datetime, double`.

**Syntaxe**

```
GetColumnType(Table, Column)
```

> GetColumnType

  * `Table`

    Nom de la table.

  * `Column`

    Nom du champ.

**Exemple**

```
SetVar(coltype,GetColumnType(members, member_name))Div(){#coltype#}
```

### GetHistory {#gethistory}

Créez un élément gethistory et remplissez-le avec les enregistrements de modification de l'historique des entrées dans la table spécifiée. Les données générées seront placées dans l'élément Source, qui pourra être utilisé ultérieurement dans la fonction d'entrée source (par exemple, [Table](#table)).

Le tableau est trié dans l'ordre des dernières modifications.
Le champ id dans le tableau pointe vers l'id de la table rollback_tx. block_id représente l'ID du bloc, block_time représente l'horodatage de génération du bloc.

**Syntaxe**
```
GetHistory(Source, Name, Id, RollbackId)
```

> GetHistory

  * `Source`

    Nom de la source de données.

  * `Name`

    Nom de la table.

  * `Id`

    Identifiant d'entrée.

  * `RollbackId`

    Un paramètre facultatif. S'il est spécifié, seul un enregistrement avec l'ID spécifié sera renvoyé de la table rollback_tx.

**Exemple**

```
GetHistory(blocks, BlockHistory, 1)
```

### GetVar {#getvar}

Il renvoie la valeur de la variable spécifiée si elle existe déjà, ou une chaîne vide si elle n'existe pas.

L'élément getvar est créé uniquement lorsqu'un arbre modifiable est demandé. La différence entre `GetVar(varname)` et `#varname` est que si varname n'existe pas, GetVar renverra une chaîne vide, tandis que #varname# sera interprété comme une valeur de chaîne.

**Syntaxe**
```
GetVar(Name)
```

> GetVar

  * `Name`

    Nom de variable.

**Exemple**

```
If(GetVar(name)){#name#}.Else{Name is unknown}
```

### Hint {#hint}

Créez un élément d'indice pour les indices.

**Syntaxe**
```
Hint(Icon,Title,Text)
```

> Astuce
  * `Icon`

    Nom de l'icône.
  * `Title`

    Titre de l'astuce.
  * `Text`

    Texte de l'astuce.


**Exemple**

```
Hint(Icon: "icon-wrench",Title:$@1pa_settings$,Text: This is a hint text)
```

### If {#if}

Déclaration conditionnelle.

Renvoie le premier élément enfant If ou ElseIf qui satisfait la condition. Sinon, renvoie l'élément enfant Else.

**Syntaxe**
```
If(Condition){ Body}
 [.ElseIf(Condition){ Body }]
 [.Else{ Body }]
```

> If
  * `Condition`

    Si la condition est égale à une chaîne vide, 0 ou false, on considère que la condition n'est pas remplie. Dans tous les autres cas, on considère que cette condition est satisfaite.
  * `Body`

    Élément enfant.

**Exemple**

```
If(#value#){
   Span(Value)
}.ElseIf(#value2#){Span(Value 2)
}.ElseIf(#value3#){Span(Value 3)}.Else{
   Span(Nothing)
}
```

### Image {#image}
Créez un élément HTML d'image.

**Syntaxe**
```
Image(Src, Alt, Class)
 [.Style(Style)]
```

> Image

  * `Src`

    Source de l'image, fichier ou `data:...`

  * `Alt`

    Texte alternatif lorsque l'image ne peut pas être affichée.

  * `Сlass`

    Nom de la classe de l'image.

**Exemple**

```
Image(Src: Binary().ById(#id#), Class: preview).Style(height: 40px; widht 40px;)
```

### ImageInput {#imageinput}

Créez un élément imageinput pour télécharger une image.

**Syntaxe**
```
ImageInput(Name, Width, Ratio, Format)
```

> ImageInput

  * `Name`

    Nom de l'élément.

  * `Width`

    Largeur de l'image recadrée.

  * `Ratio`

    Ratio d'aspect ou hauteur de l'image.
    
  * `Format`

    Format de l'image téléchargée.


**Exemple**

```
ImageInput(avatar, 100, 2/1)
```

### Include {#include}

Insérez le modèle avec un nom spécifié dans le code de la page.

**Syntaxe**
```
Include(Name)
```

> Include

  * `Name`

    Nom du modèle.

**Exemple**

```
Div(myclass, Include(mywidget))
```

### Input {#input}

Créez un élément HTML d'entrée.

**Syntaxe**
```
Input(Name, Class, Placeholder, Type, Value, Disabled)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Input

  * `Name`

    Nom de l'élément.

  * `Class`

    Nom de classe.

  * `Placeholder`

    Invite pour la valeur attendue du champ de saisie.

  * `Type`

    Type de saisie.

  * `Value`

    Valeur de l'élément.

  * `Disabled`

    Désactiver l'élément de saisie.

> Validate

  Valider le paramètre.

> Style

  Style CSS spécifié.
  
  * `Style`

    Style CSS.


**Exemple**

```
Input(Name: name, Type: text, Placeholder: Enter your name)
Input(Name: num, Type: text).Validate(minLength: 6, maxLength: 20)
```

### InputErr {#inputerr}

Créez un élément inputerr pour valider le texte d'erreur.

**Syntaxe**
```
InputErr(Name,validation errors)]
```

> InputErr

  * `Name`

    Correspond au nom de l'élément [Input](#input).

  * `Erreurs de validation`

    Message d'erreur de validation pour un ou plusieurs paramètres.

**Exemple**

```
InputErr(Name: name,
minLength: Value is too short,
maxLength: The length of the value must be less than 20 characters)
```

### InputMap {#inputmap}

Créez un champ de saisie de texte pour l'adresse, capable de sélectionner des coordonnées sur la carte.

**Syntaxe**
```
InputMap(Name, Type, MapType, Value)
```

> InputMap

  * `Name`

    Nom de l'élément.

  * `Value`

    Valeur par défaut.
    La valeur est un objet au format de chaîne de caractères. Par exemple, `{"coords":[{"lat":nombre,"lng":nombre},]}` ou `{"zoom":entier, "center":{"lat":nombre,"lng": nombre}}`. Lorsque InputMap est créé avec la valeur prédéfinie, le champ d'adresse peut être utilisé pour enregistrer la valeur de l'adresse, de sorte qu'elle ne soit pas vide.

  * `Type`

    Type de mappage des spots sur la carte :
    
    * `polygon` - indique la zone d'une boucle fermée à plusieurs spots ;
    * `Line` - représente une polyligne avec plusieurs points sans boucle fermée ;
    * `Point` - indique les coordonnées d'un seul point.
    
  * `MapType`

    Type de carte.
    Il peut prendre les valeurs suivantes : `hybrid, roadmap, satellite, terrain`.


**Exemple**

```
InputMap(Name: Coords,Type: polygon, MapType: hybrid, Value: `{"zoom":8, "center":{"lat":55.749942860682545,"lng":37.6207172870636}}`)
```

### JsonToSource {#jsontosource}

Créez un élément jsontosource et remplissez-le avec les paires clé-valeur d'un tableau JSON. Les données obtenues sont placées dans l'élément Source, qui peut être utilisé ultérieurement dans la fonction d'entrée source (par exemple, [Tableau](#tableau)).

Les enregistrements dans les données résultantes sont triés alphabétiquement par clé JSON.

**Syntaxe**
```
JsonToSource(Source, Data)
```

> JsonToSource

  * `Source`

    Nom de la source de données.

  * `Data`

    Un objet JSON ou un nom de variable contenant un objet JSON (`#name#`).

**Exemple**

```
JsonToSource(src, #myjson#)
JsonToSource(dat, {"param":"value", "param2": "value 2"})
```

### Label {#label}

Créez un élément d'étiquette HTML.

**Syntaxe**
```
Label(Body, Class, For)
 [.Style(Style)]
```

> Label

  * `Body`

    Enfant texte ou élément.

  * `Class`

    Nom de la classe.

  * `For`

    Lier à un élément de formulaire.

> `StyleThe`: Style CSS spécifié.

  * `Style`

    Style CSS.

**Exemple**

```
Label(The first item).
```

### LangRes {#langres}

Renvoie une ressource linguistique spécifique. Si vous demandez à modifier l'arbre, l'élément langres est renvoyé et vous pouvez utiliser le symbole de format court $langres$.

**Syntaxe**

```
LangRes(Name)
```

> LangRes

  * `Name`

    Nom de la ressource linguistique.

**Exemple**

```
LangRes(name)
LangRes(myres)
```

### LinkPage {#linkpage}

Créez un élément de lien vers la page.

**Syntaxe**

```
LinkPage(Body, Page, Class, PageParams)
 [.Style(Style)]
```

> LinkPage

  * `Body`

    Texte ou élément enfant.

  * `Page`

    Nom de la page de redirection.

  * `Class`

    Nom de la classe du bouton.

  * `PageParams`

    Paramètres de la page de redirection.
    
> Style

  Style CSS spécifié.

  * `Style`

    Styles CSS

  
**Exemple**

```
LinkPage(Class: #style_link# h5 text-bold, Page: @1roles_view, PageParams: "v_role_id=#recipient.role_id#")
```

### Map {#map}

Créez une carte visuelle et affichez les coordonnées dans n'importe quel format.

**Syntaxe**
```
Map(Hmap, MapType, Value)
```

> Map

  * `Hmap`

    Hauteur d'un élément HTML sur la page.

    La valeur par défaut est 100.

  * `Value`

    Valeur de la carte, un objet au format string.
    Par exemple, `{"coords":[{"lat":number,"lng":number},]}` ou `{"zoom":int, "center":{"lat":number,"lng": number}}`. Si `center` n'est pas spécifié, la fenêtre de la carte s'ajustera automatiquement en fonction des coordonnées spécifiées.
    
  * `MapType`

    Type de carte.
    
    Il a les valeurs suivantes: `hybrid, roadmap, satellite, terrain`.


**Exemple**

```
Map(MapType:hybrid, Hmap:400, Value:{"coords":[{"lat":55.58774531752405,"lng":36.97260184619233},{"lat":55.58396161622043,"lng":36.973803475831005},{"lat":55.585222890513975,"lng":36.979811624024364},{"lat":55.58803635636347,"lng":36.978781655762646}],"area":146846.65783403456,"address":"Unnamed Road, Moscow, Russia, 143041"})
```

### MenuGroup {#menugroup}

Créez un sous-menu imbriqué dans le menu et renvoyez l'élément menugroup. Avant de le remplacer par la ressource linguistique, le paramètre name renverra la valeur de Title.

**Syntaxe**
```
MenuGroup(Title, Body, Icon)
```
> MenuGroup

  * `Title`

    Nom de l'élément de menu.

  * `Body`

    Éléments enfants dans un sous-menu.

  * `Icon`

    Icône.

**Exemple**

```
MenuGroup(My Menu){
    MenuItem(Interface, sys-interface)
    MenuItem(Dahsboard, dashboard_default)
}
```

### MenuItem {#menuitem}

Créez un élément de menu et renvoyez l'élément de menu.

**Syntaxe**
```
MenuItem(Title, Page, Params, Icon)
```

> MenuItem

  * `Title`

    Nom de l'élément de menu.

  * `Page`

    Nom de la page de redirection.

  * `Params`

    Paramètres de redirection de la page.

  * `Icon`

    Icône.

**Exemple**

```
MenuItem(Title:$@1roles$, Page:@1roles_list, Icon:"icon-pie-chart")
```

### Money {#money}

Retourne la valeur de chaîne de exp / 10 ^ digit.

**Syntaxe**
```
Money(Exp, Digit)
```

> Money

  * `Exp`

    Un nombre au format chaîne de caractères.

  * `Digit`

    L'exposant de 10 dans l'expression `Exp/10^digit`. La valeur peut être positive ou négative, et une valeur positive détermine le nombre de chiffres après la virgule.

**Exemple**

```
Money(Exp, Digit)
```

### Or {#or}

Il renvoie le résultat d'une opération logique if. Tous les paramètres énumérés entre parenthèses sont séparés par des virgules. Si un paramètre a une valeur différente d'une chaîne vide, zéro ou `false`, la valeur du paramètre est `true`, sinon la valeur du paramètre est `false`. Si la valeur du paramètre est `true`, la fonction renvoie `1`, sinon elle renvoie `0`.

**Syntaxe**
```
Or(parameters)
```


**Exemple**

```
If(Or(#myval1#,#myval2#), Span(OK))
```

### P {#p}

Créez un élément p HTML.

**Syntaxe**
```
P(Body, Class)
 [.Style(Style)]
```

> P

  * `Body`

    Enfant texte ou élément.

  * `Class`

    Nom de la classe.

> Style

Le style CSS spécifié.

  * `Style`

    Style CSS.

**Exemple**

```
P(This is the first line.
  This is the second line.)
```

### QRcode {#qrcode}

Retourne le code QR avec le texte spécifié et crée un élément qrcode.

**Syntaxe**
```
QRcode(Text)
```

> QRcode

  * `Text`

    Texte du code QR.

**Exemple**

```
QRcode(#name#)
```

### RadioGroup {#radiogroup}

Créez un élément radiogroup.

**Syntaxe**
```
RadioGroup(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> RadioGroup

  * `Name`

    Nom de l'élément.

  * `Source`

    Source de données obtenue à partir de la fonction DBFind ou Data.

  * `NameColumn`

    Nom du champ de la source de données.

  * `ValueColumn`

    Nom de la valeur de la source de données.
    Les champs créés avec Custom ne peuvent pas être utilisés dans ce paramètre.

  * `Value`

    Valeur par défaut.

  * `Class`

    Nom de classe.

> Validate

  Valider le paramètre.

> Style

  Le style CSS spécifié.

  * `Style`

    Style CSS.

**Exemple**

```
RadioGroup(Name: type_decision, Source: numbers_type_decisions, NameColumn: name, ValueColumn: value)
```

### Range {#range}

Créez un élément de plage, utilisez une taille de pas Step de De à À (sans inclure À) pour remplir les éléments entiers. Les données générées seront placées dans Source et pourront être utilisées ultérieurement dans la fonction de l'entrée source (par exemple, [Tableau](#tableau)). Si un paramètre invalide est spécifié, une Source vide est renvoyée.

**Syntaxe**
```
Range(Source,From,To,Step)
```

> Range

  * `Source`

    Nom de la source de données.

  * `From`

    Valeur de départ (i = De).

  * `To`

    Valeur de fin (i < À).

  * `Step`

    Étape de changement de valeur. Si elle n'est pas spécifiée, la valeur par défaut est 1.

**Exemple**

```
Range(my,0,5)
SetVar(from, 5).(to, -4).(step,-2)
Range(Source: neg, From: #from#, To: #to#, Step: #step#)
```

### Select {#select}

Créez un élément HTML de sélection.

**Syntaxe**
```
Select(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Select

  * `Name`

    Nom de l'élément.

  * `Source`

    Nom de la source de données obtenue à partir de la fonction [DBFind](#dbfind) ou [Data](#data).

  * `NameColumn`

    Nom du champ de la source de données.

  * `ValueColumn`

    Nom de la valeur de la source de données.
    Les champs créés avec [Custom](#custom) ne peuvent pas être utilisés dans ce paramètre.

  * `Value`

    Valeur par défaut.

  * `Class`

    Nom de la classe.

> Validate

  Valider le paramètre.

> Style

  Le style CSS spécifié.

  * `Style`

    Style CSS.

**Exemple**

```
DBFind(mytable, mysrc)
Select(mysrc, name)
```

### SetTitle {#settitle}

Pour définir le titre de la page et créer un élément settitle.

**Syntaxe**
```
SetTitle(Title)
```

> SetTitle

  * `Title`

    Titre de la page.

**Exemple**

```
SetTitle(My page)
```

### SetVar {#setvar}

Attribuer la valeur Value à la variable spécifiée Name.

**Syntaxe**
```
SetVar(Name, Value)
```

> SetVar

  * `Name`

    Nom de variable.

  * `Value`

    La valeur de la variable peut contenir une référence à une autre variable.

**Exemple**

```
SetVar(name, John Smith).(out, I am #name#)
Span(#out#)
```

### Span {#span}

Créez un élément HTML span.

**Syntaxe**
```
Span(Body, Class)
 [.Style(Style)]
```

> Span

  * `Body`

    Enfant texte ou élément.

  * `Class`

    Nom de la classe.

> Style

  Le style CCS spécifié.

  * `Style`

    Style CSS.

**Exemple**

```
This is Span(the first item, myclass1).
```

### Strong {#strong}

Créez un élément HTML fort.

**Syntaxe**
```
Strong(Body, Class)
```

> Strong

  * `Body`

    Enfant texte ou élément.

  * `Class`

    Nom de la classe.

**Exemple**

```
This is Strong(the first item, myclass1).
```

### SysParam {#sysparam}

Obtenez la valeur d'un paramètre spécifique dans la table des paramètres de la plateforme system_parameters.

**Syntaxe**
```
SysParam(Name)
```

> SysParam

  * `Name`

    Nom du paramètre de la plateforme.

**Exemple**

```
SysParam(max_columns)
```

### Table {#table}

Créez un élément de tableau HTML.

**Syntaxe**
```
Table(Source, Columns)
 [.Style(Style)]
```

> Table

  * `Source`

    Nom d'une source de données spécifique.

  * `Columns`

    Titre et nom de colonne correspondant, par exemple : Titre1=colonne1, Titre2=colonne2.

> Style

  Le style CSS spécifié.

  * `Style`

    Style CSS.

**Exemple**

```
DBFind(mytable, mysrc)
Table(mysrc,"ID=id,Name=name")
```

### TransactionInfo {#transactioninfo}

It queries transactions by specified hash and returns information about the executed contracts and their parameters.

**Syntaxe**
```
TransactionInfo(Hash)
```

> TransactionInfo

  * `Hash`

    Hachages de transaction au format de chaîne hexadécimale.

> Return value

  Il renvoie une chaîne au format JSON.

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

Where:

* `contract` - Nom du contrat;
* `params` - Données transmises aux paramètres du contrat;
* `block` - ID du bloc qui a traité la transaction.

**Exemple**

```
P(TransactionInfo(#hash#))
```

### VarAsIs {#varasis}

Attribue la valeur Value à une variable spécifique Name, qui est le nom d'une variable spécifique au lieu de sa valeur.

Pour les versions avec substitution de variable, voir [SetVar](#setvar).

**Syntaxe**
```
VarAsIs(Name, Value)
```

> VarAsIs

  * `Name`

    Nom de variable.

  * `Value`

    Une valeur de variable. Le nom de la variable dans la valeur ne sera pas substitué. Par exemple, si la valeur est exemple #nomvariable#, alors la valeur de la variable sera également exemple #nomvariable#.

**Exemple**

```
SetVar(Name,"John")
VarAsIs(name, I am #Name#)
Span(#name#) // I am #Name#
```

## Styles d'application pour les appareils mobiles{#app-styles-for-mobile-devices}

### Layout {#layout}

#### Title {#title}

* `h1`… `h6`

#### Strong-class names {#strong-class-names}

* `.text-muted`
* `.text-primary`
* `.text-success`
* `.text-info`
* `.text-warning`
* `.text-danger`

#### Color {#color}

* `.bg-danger-dark`
* `.bg-danger`
* `.bg-danger-light`
* `.bg-info-dark`
* `.bg-info`
* `.bg-info-light`
* `.bg-primary-dark`
* `.bg-primary`
* `.bg-primary-light`
* `.bg-success-dark`
* `.bg-success`
* `.bg-success-light`
* `.bg-warning-dark`
* `.bg-warning`
* `.bg-warning-light`
* `.bg-gray-darker`
* `.bg-gray-dark`
* `.bg-gray`
* `.bg-gray-light`
* `.bg-gray-lighter`

#### Grid {#grid}

* `.row`
* `.row.row-table`
* `.col-xs-1`… `.col-xs-12`, uniquement utilisé dans `.row.row-table`.

#### Panel {#panel}

* `.panel`
* `.panel.panel-heading`
* `.panel.panel-body`
* `.panel.panel-footer`

#### Form {#form-app}

* `.form-control`

#### Button {#button-app}

* `.btn.btn-default`
* `.btn.btn-link`
* `.btn.btn-primary`
* `.btn.btn-success`
* `.btn.btn-info`
* `.btn.btn-warning`
* `.btn.btn-danger`

#### Icon {#icon}

* Tous les icônes de classe fa sont de FontAwesome: `fa fa-<icon-name></icon-name>`.
* Tous les icônes de classe icon sont de SimpleLineIcons: `icon-<icon-name>`.
