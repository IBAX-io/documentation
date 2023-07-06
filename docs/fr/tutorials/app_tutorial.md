# Tutoriel pour le développement d'applications {#tutorial-for-application-development}

In this section, we will show you how to  develop a simple application on the IBAX Network.

  - [L'objectif](#the-goal)
  - [Partie 1: L'environnement](#part-1-the-environment)
  - [Partie 2: Contrat](#part-2-contract)
    - [Compte créateur](#creator-account)
    - [Nouvelle application](#new-application)
    - [Nouvelle table de base de données](#new-database-table)
    - [Nouveau contrat](#new-contract)
      - [Code du contrat](#contract-code)
      - [Créer un contrat](#create-a-contract)
      - [Nom du contrat](#contract-name)
      - [Données](#data)
      - [Conditions](#conditions)
      - [Action](#action)
      - [Code complet du contrat](#full-contract-code)
      - [Enregistrer et exécuter](#save-and-run)
  - [Partie 3: Page](#part-3-page)
    - [Nouveau champ](#new-field)
    - [Mettre à jour le contrat](#update-the-contract)
    - [Page](#page)
      - [Vues du concepteur](#designer-views)
      - [Vue développeur](#developer-view)
      - [Récupérer des données depuis la table de base de données](#fetch-data-from-the-database-table)
      - [Code complet de la page](#full-page-code-1)
      - [Enregistrer la page](#save-the-page)
  - [Partie 4: Application](#part-4-application)
    - [Menu](#menu)
      - [Ajouter un élément de menu](#add-a-menu-item)
      - [Tester le nouvel élément de menu](#test-the-new-menu-item)
    - [Envoyer un message](#send-a-message)
      - [Formulaire](#form)
    - [Navigation du formulaire](#form-navigation)
      - [Boutons de navigation](#navigation-buttons)
      - [Variables](#variables)
      - [Nombre d'entrées](#entry-count)
      - [Décalage de la table](#table-offset)
      - [Code du bouton](#button-code)
      - [Actualisation de la page](#page-refreshing)
    - [Code complet de la page](#full-page-code-2)
  - [Conclusions](#conclusions)


## L'objectif {#the-goal}

L'application commence par des fonctions simples mais devient de plus en plus complexe au fur et à mesure du tutoriel.

Dans la version finale de l'application, quelques messages simples (chaînes de caractères) sont stockés dans une table de base de données, qui contient les horodatages et les identifiants de compte des expéditeurs. Les utilisateurs peuvent consulter la liste des messages et ajouter un nouveau message depuis la page de l'application, accessible depuis le menu de l'écosystème.

## Partie 1 : L'Environnement {#part-1-the-environment}

**Weaver** 

En tant que seul client d'IBAX, Weaver fournit des fonctions pour tous les utilisateurs et les rôles de l'écosystème. Avec lui, les développeurs d'applications peuvent développer et tester leurs applications, les administrateurs d'écosystème peuvent gérer leurs écosystèmes, tandis que les utilisateurs peuvent interagir avec les écosystèmes.

Dans ce tutoriel, vous allez coder des contrats, des modèles de pages et effectuer toutes les autres actions dans Weaver. Weaver offre également un moyen de restaurer, sauvegarder et exécuter des codes de contrat, de gérer les structures de données (tables de base de données), d'attribuer des permissions d'accès et de créer des applications.

Chaque nœud a sa propre instance de Weaver.

## Partie 2: Contrat {#part-2-contract}

Votre première application simple est "Bonjour, le monde !".

```
> In this application, strings will be stored in a database table, and there is not a user page. 
```
### Compte créateur {#creator-account}

Les comptes avec le rôle de développeur se verront attribuer les privilèges "root" de l'écosystème. Par défaut, ce rôle peut accéder à toutes les actions. Dans un nouvel écosystème, le compte créateur se verra attribuer le rôle d'administrateur, que vous devez utiliser pour apporter des modifications majeures à l'écosystème, telles que la création de nouvelles applications et de nouvelles tables de base de données.

Connectez-vous à l'écosystème en utilisant le compte créateur.

### Nouvelle application {#new-application}

Une fois connecté en tant que créateur de l'écosystème, vous pouvez créer une nouvelle application.

Créer une nouvelle application :

> 1. Allez dans l'onglet **Développeur** ;
>
> 2. Sélectionnez **Application** dans le menu à gauche ;
>
> 3. Sélectionnez **Nouveau** sur la page de l'application ;
>
> 4. Spécifiez le nom de l'application dans le champ **APP** ;
>
> 5. Définissez les **Conditions** sur `true` ;
>
>    > `true` signifie que n'importe qui peut apporter des modifications à l'application ;
>    >
>    > Une autre option est `ContractConditions("MainCondition")`, ce qui signifie que personne ne peut apporter de modifications à l'application, sauf le créateur.
>
> 6. Votre application sera affichée dans la liste des applications. Cliquez sur le champ Nom d'une application spécifique pour l'activer.
>   ````
>   Vous pouvez accéder aux ressources pertinentes en cliquant sur une application dans l'onglet Développeur, sans impact sur l'écosystème. Peu importe celle que vous choisissez, toutes les applications de l'écosystème restent disponibles.
>   ````

### Nouvelle table de base de données {#new-database-table}

Pour stocker les données, créez une table de base de données pour l'application dans Weaver.

Créez une table de données :

> 1. Dans l'onglet **Développeur**, sélectionnez **Application** > **APP** > **Table de base de données** ;
>
>    > Toutes les tables de base de données liées à l'application sélectionnée seront affichées ici. Si la liste est vide, cela signifie qu'aucune table de base de données n'a encore été créée pour votre application.
>
> 2. Cliquez sur **Nouveau** ;
>
>    > Weaver vous montrera la page pour créer une nouvelle table de base de données.
>
> 3. Spécifiez le nom dans le champ **Nom** ;
>
>    > Dans ce tutoriel, le nom de la table de base de données sera `apptable`.
>
> 4. Ajoutez la colonne `message`, définissez son type comme `Texte` ;
>
>    > Cette table doit avoir deux colonnes : `id` (prédéfini) et `message`. Vous allez ajouter d'autres colonnes plus tard.
>    > ![image](/app-tut-table.png)

> 5. En ce qui concerne les autorisations de lecture et d'écriture, définissez chaque champ sur `true` ;
>
>    > Cela permettra à n'importe qui d'insérer, de mettre à jour des entrées, d'ajouter des colonnes et de lire les données d'entrée sur la table de base de données ;
>    >
>    > En option, vous pouvez réserver les autorisations de lecture et d'écriture au compte créateur. Dans ce cas, définissez ce champ sur `ContractConditions("MainCondition")`.

### Nouveau contrat {#new-contract}

#### Code de contrat {#contract-code}

Chaque contrat se compose de trois parties. Pour plus de détails, veuillez consulter : [Structure du contrat](../topics/script.md#structure-du-contrat).

#### Créer un contrat {#create-a-contract}

1. Dans l'onglet **Développeur**, sélectionnez **Application** > **APP** > **Contrat**;

   > Tous les contrats liés à l'application seront affichés ici. La liste est vide pour les nouvelles applications.

2. Cliquez sur Nouveau;

   > Un nouveau modèle de contrat sera affiché dans l'éditeur.

Un modèle de contrat vide est affiché comme suit :

``` js
contract ... {
    data {

    }
    conditions {

    }
    action {

    }
}
```

#### Nom du contrat {#contract-name}

D'abord, veuillez préciser le nom du contrat. 

``` js
contract AppContract {

}
```

#### Données {#data}

Remplissez la section `data`.

Dans l'exemple suivant, `Message` fait référence au nom de la variable, tandis que `string` fait référence au type de variable.

``` js
data {
    Message string
}
```

#### Conditions {#conditions}

Remplissez la section `conditions`. Une condition de vérification simple consiste à éviter les chaînes vides. Si la longueur de `Message` est `0`, un message d'avertissement prédéfini sera déclenché lors de la mise en œuvre du contrat. 

``` js
conditions {
    // avoid writing empty strings
    if Size($Message) == 0 {
        error "Message is empty"
    }
}
```

#### z {#action}

Remplissez la section `action`. Une action simple consiste à écrire `Message` dans le tableau de données.

``` js
action {
    DBInsert("apptable", {message: $Message})
}
```

#### Code complet du contrat {#full-contract-code}

Le code complet du contrat est présenté ci-dessous.

Tous les contrats dans IBAX seront construits de cette manière, y compris les sections `data`, `conditions` et `action`.

``` js
contract AppContract {
    data {
        Message string
    }
    conditions {
        // avoid writing empty strings
        if Size($Message) == 0 {
            error "Message is empty"
        }
    }
    action {
        DBInsert("apptable", {message: $Message})
    }
}
```

#### Enregistrer et exécuter {#save-and-run}

Maintenant, nous nous préparons à tester le contrat :

> 1. Cliquez sur Enregistrer dans le menu de l'éditeur ;
>
>    > Cela mettra à jour le code du contrat et la version mise à jour sera disponible pour tous les nœuds du réseau.
>
> 2. Cliquez sur Exécuter dans le menu de l'éditeur ;
>
>    > Cela affichera la page Exécuter le contrat.
>
> 3. Dans la page Exécuter le contrat, remplissez les paramètres d'entrée du contrat ;
>
>    > Comme ce contrat a un paramètre `Message`, définissez `Message` dans le champ Clé et `Bonjour, le monde` dans le champ Valeur.
>    >
>    > ![image](/app-tut-execute.png)
>
> 4. Cliquez sur Exécuter.
>
>    > Le résultat sera affiché à droite.

Si vous avez ajouté avec succès des chaînes, alors le résultat contiendra l'ID du bloc et le code de résultat pour présenter le changement des transactions.

``` js
{
   "block": "31",
   "result": null
}
```

## Partie 3: Page {#part-3-page}

Lorsque le contrat devient effectif, il est temps de l'étendre à quelque chose d'utile. Dans cette partie, vous allez implémenter l'interface utilisateur et d'autres fonctions.


````
Dans cette application, les chaînes de caractères seront stockées dans une table de base de données, comme des entrées dans un journal. Chaque chaîne aura un auteur et une horodatage.

Les utilisateurs peuvent consulter la liste des chaînes stockées sur la page de l'application, qui est affichée sous la forme d'un formulaire simple.
````

### Nouveau champ {#new-field}

Comme précédemment, modifiez la table de la base de données dans l'onglet **Développeur** > **Application** > **APP** > **Table de base de données** ;

Ajoutez les champs suivants dans `apptable` :

* `author`, type de champ `Nombre`, définissez **Changer** sur `true`;

Ce champ stockera l'identifiant du compte de l'auteur.

* `timestamp`, type de champ `Date/Heure`, définissez **Changer** sur `true`.

### Mettre à jour le contrat {#update-the-contract}

Nous allons mettre à jour le code du contrat pour gérer l'ID de l'auteur et le timestamp.

L'ID de l'auteur est l'ID du compte de l'écosystème. Le timestamp est la date et l'heure d'exécution du contrat au format Unix.

Étant donné que les deux valeurs sont fournies par les [Variables prédéfinies](../topics/script.md#variables) et qu'il n'est pas nécessaire de les saisir ou de les vérifier, elles ne peuvent être mises à jour que dans la partie action.

Mettez à jour le contrat pour écrire l'ID de l'auteur et le timestamp dans la table de la base de données lors de l'ajout d'un message, où l'ID de l'auteur est défini par `$key_id`, tandis que le timestamp est défini par `$time`.

``` js
action {
    DBInsert("apptable", {message: $Message, author: $key_id, timestamp: $time})
}
```

### Page {#page}

Pour la page d'application, c'est une page simple qui affiche les messages stockés dans la table de la base de données.

Comme pour toutes les autres ressources, vous pouvez créer la page UI dans Weaver :

1. Accédez à l'onglet **Développeur**, cliquez sur **Application** > **APP** > **Page** ;

2. Cliquez sur **Nouveau** ;

   > Le concepteur visuel s'ouvrira dans un nouvel onglet.

#### Vues du concepteur {#designer-views}

La page par défaut est vide. Vous pouvez utiliser la structure prédéfinie pour remplir rapidement la page.

> ![image](/app-tut-designer.png)

Créez une table de base :

1. Dans le sélecteur de vue à droite, cliquez sur Concepteur ;

   > La vue sera basculée vers le concepteur visuel.

2. Dans le menu à gauche, sélectionnez Tableau avec en-tête et faites-le glisser sur la page.

   > Un tableau avec plusieurs éléments s'affichera sur la page.

#### Vue du développeur {#developer-view}

Comme la page utilisateur d'IBAX est codée avec un [langage de modèle](../topics/templates2.md), veuillez passer en mode Développeur lorsque vous écrivez le code de la page.

> ![image](/app-tut-developer.png)

Passer à la vue Développeur.

1. Dans le sélecteur de vue à droite, cliquez sur **Développeur**.

   > La vue sera basculée vers l'éditeur avec un onglet contenant le code de la page.

#### Récupérer des données à partir de la table de la base de données {#fetch-data-from-the-database-table}

Jusqu'à présent, rien n'a été fait avec le modèle de page. Dans la suite, nous mettrons à jour le code pour permettre à la page d'afficher les données de `apptable`.

1. Pour demander des données à partir de la table de la base de données avec la fonction [DBFind](../topics/script.md#dbfind) ;

   > Dans l'exemple suivant, cet appel de fonction est utilisé pour récupérer des données à partir de `apptable`. Les données seront placées dans la source `src_table` et triées par le champ de timestamp. `src_table` sera ensuite utilisée comme source de données pour la page en vue tableau.
    >
    > ``` js
    > DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)
    > ```

2. Pour afficher les données de `src_table`, spécifiez-le en tant que source de données et en-tête dans la fonction `Table`.

    > ``` js
    > Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
    > ```

3. Dans le sélecteur de vue à droite, cliquez sur **Aperçu** pour vérifier si les données sont affichées correctement.

#### Code de la page complète {#full-page-code-1}

Le code complet de cette partie est le suivant. Cette page de base sera développée ultérieurement.

``` js
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)

Div(Class: panel panel-primary) {
    Div(Class: panel-heading, Body: Table block)
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
    Div(Class: panel-footer text-right) {
        Button(Class: btn btn-primary, Contract: ContractName, Body: More)
    }
}
```

#### Enregistrer la page {#save-the-page}

Cliquez sur **Enregistrer** pour sauvegarder la page :

1. Spécifiez `AppPage` ou tout autre nom pour la page dans le champ **Nom de la page** ;
2. Sélectionnez `default_menu` dans le **Menu** ;
3. Définissez les **Conditions** à `true` ;
4. Cliquez sur **OK**.

## Partie 4: Application {#part-4-application}

Dans les sections précédentes, vous avez créé un contrat, une table pour stocker des données et une page d'interface utilisateur de base pour afficher ces données.

Dans cette partie, vous allez finaliser l'application pour que son apparence et ses actions soient similaires à celles d'une application réelle.

### Menu {#menu}

La page doit être liée à un menu, par exemple, la page `default_page` affichée dans l'onglet **Accueil** est liée au menu par défaut de l'écosystème `default_menu`.

Comme ce tutoriel d'application est très simple (n'ayant qu'une seule page), il n'est pas nécessaire de créer un menu séparé pour cela. Le nouvel élément de menu dans le menu par défaut est suffisant.

> Vous pouvez définir le menu de la page en modifiant les propriétés de la page dans l'onglet **Développeur** > **Application** > **APP** > **Page**. Par exemple, si votre application comporte plusieurs pages, vous devrez peut-être créer un menu pour naviguer entre ces pages et l'assigner à toutes les pages de l'application.


#### Ajouter un élément de menu {#add-a-menu-item}

Comme toutes les autres ressources, les menus peuvent être créés et modifiés dans Weaver :

1. Accédez à l'onglet **Développeur** > **Menu** ;

   > ![image](/app-tut-menu-list.png)

2. Cliquez sur le nom de l'entrée `default_menu` ;

   > Un nouvel onglet s'ouvrira dans l'éditeur.

3. Ajoutez un nouvel élément de menu à la fin du modèle, qui sera lié à la page de l'application et dont l'icône provient de l'ensemble d'icônes [FontAwesome](https://fontawesome.com/icons).

    > ``` js
    > MenuItem(Title:Messages, Page:AppPage, Icon:"fa fa-envelope")
    > ```

4. Cliquez sur **Enregistrer**.

#### Tester le nouveau plat du menu {#test-the-new-menu-item}

Vérifiez si le nouvel élément de menu est valide :

1. Ouvrez l'onglet **Accueil** ;

2. Cliquez sur **Actualiser** dans le menu ;

    > Une entrée avec un en-tête Messages apparaîtra ;
    >
    > ![image](/app-tut-menu-messages.png)

3. Cliquez sur **Messages**.

    La page de l'application s'ouvrira.

### Envoyer un message {#send-a-message}

Les boutons dans Logicor peuvent être utilisés pour implémenter des contrats et ouvrir des pages, en fonction des paramètres.

La fonction [Button](../topics/templates2.md#button) a deux paramètres de contrat :

* `Contract`

    Nom du contrat activé.

* `Params`

    Paramètres d'entrée du contrat.

#### Formulaire {#form}

Pour envoyer des données au contrat, ajoutez un formulaire sur la page de l'application, qui doit comporter un champ de saisie pour un message et un bouton pour activer le contrat AppContract.

Voici un exemple de ce type de formulaire. Il est imbriqué dans sa propre [Div](../topics/templates2.md#div). Placez-le après l'élément Div qui contient la vue du formulaire, qui définit que le champ [Input](../topics/templates2.md#input) a un nom prédéfini `message_input`. Le bouton utilise ce nom pour envoyer la valeur de `Message` au contrat. Enfin, la fonction [Val](../topics/templates2.md#calling-contracts) est utilisée pour obtenir la valeur du champ de saisie.

```text
Div(Class: panel panel-primary) {
  Form() {
        Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
        Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)")
  }
}
```

Vous pouvez remarquer que lors de la test de cette nouvelle fonctionnalité en envoyant un message, le formulaire ne se rafraîchit pas. Cela sera introduit dans [page refresh](#page-refreshing).

### Navigation du formulaire {#form-navigation}

Sous la vue par défaut, le formulaire sur la page ne peut afficher que 25 entrées sur la première page. Par conséquent, vous pouvez ajouter quelques boutons simples pour permettre aux utilisateurs de naviguer vers toutes les entrées du formulaire.

#### Boutons de navigation {#navigation-buttons}

Il y aura deux boutons de navigation, et chacun d'eux pourra recharger la page de l'application et lui transmettre les paramètres.

> - Le bouton *Précédent* affichera les 25 premières entrées. S'il n'y a pas d'autres entrées, le bouton ne sera pas affiché ;
> - Le bouton *Suivant* affichera les 25 entrées suivantes. S'il n'y a pas d'autres entrées, le bouton ne sera pas affiché.

#### Variables {#variables}

Les boutons de navigation nécessitent deux variables pour stocker les états de la vue du tableau :

> - `#table_view_offset#`
>
>      > Cette variable stocke le décalage de la vue du tableau actuelle.
>      >
>      > Les boutons de navigation le transmettront en tant que paramètre lors du rechargement de la page.
>
> - `#record_count#`
>
>      > Cette variable stocke le nombre total d'entrées dans le tableau.
>
>      > La valeur sera calculée.

#### Nombre d'entrées {#entry-count}

Pour compter `#record_count#`, veuillez modifier l'appel de la fonction [DBFind](../topics/script.md#dbfind) existante. La variable spécifiée dans l'appel `.count()` stockera le nombre d'entrées.

> ```text
> DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count)
> ```

#### Décalage de la table {#table-offset}

La décalage de la vue de la table doit être transmis à la page lors de son ouverture. Si `#table_view_offset#` n'obtient pas de valeur, définissez-le à 0.

Ajoutez le code suivant en haut de la page.

> ``` text
> If(GetVar(table_view_offset)){
> }.Else{
>     SetVar(table_view_offset, 0)
> }
> ```

Modifiez à nouveau l'appel de la fonction [DBFind](../topics/script.md#dbfind). Cette fois-ci, utilisez le nouvel offset de la vue de table.

> ``` text
> DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
> ```

#### Code du bouton {#button-code}

Trouvez l'appel de fonction [Div](../topics/templates2.md#div) qui définit le pied de page : `Div(Class:panel-footer text-right)`. Ajoutez le code du bouton à l'intérieur.

> ``` text
> Div(Class: panel-footer text-right) {
>
> }
> ```

Le bouton *Précédent* n'apparaîtra que s'il y a au moins un suivant à retourner. Lors de l'ajout d'un bouton, le décalage `offset_previous` de la nouvelle vue de tableau de la page sera calculé. Les paramètres sont transmis à `PageParams` de la page réouverte.

> ``` text
> If(#table_view_offset# >= 25) {
>     SetVar(offset_previous, Calculate(#table_view_offset# - 25))
>     Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
> }
> ```

Le bouton Suivant ne sera affiché que lorsque le nombre total d'enregistrements est supérieur au nombre affiché sur la page. Lorsqu'un bouton est ajouté, le nouvel offset de la vue de tableau `offset_next` de la page sera calculé. Les paramètres sont transmis à `PageParams` de la page réouverte.

> ``` text
> If(#record_count# >= Calculate(#table_view_offset# + 25)) {
>     SetVar(offset_next, Calculate(#table_view_offset# + 25))
>     Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
> }
> ```

![image](/app-tut-navigation.png)

Après avoir ajouté ces boutons, enregistrez la page et testez-la à partir du menu Accueil > Messages.

#### Actualisation de la page {#page-refreshing}

La dernière fonction à implémenter consiste à mettre à jour automatiquement le tableau sur la page. Lorsque les utilisateurs envoient un nouveau message, il doit être affiché dans le tableau.

En plus de mettre en œuvre le contrat, vous pouvez également utiliser le bouton Envoyer pour rouvrir la page actuelle afin d'obtenir le même résultat. `#table_view_offset#` doit être transmis à la page sans aucun changement.

Ajoutez `Page` et `PageParams` au bouton Envoyer, le code est le suivant:

``` text
Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
```

### Code de la page complète {#full-page-code-2}

Cette partie décrit de nombreux changements apportés à la page de candidature. Voici le code complet de la page de candidature.

``` text
If(GetVar(table_view_offset)){
}.Else{
    SetVar(table_view_offset, 0)
}
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
    Div(Class: panel panel-primary) {
        Div(Class: panel-heading, Body: Table block)
        Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
        Div(Class: panel-footer text-right) {
            If(#table_view_offset# >= 25) {
                SetVar(offset_previous, Calculate(#table_view_offset# - 25))
                Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
            }
            If(#record_count# >= Calculate(#table_view_offset# + 25)) {
                SetVar(offset_next, Calculate(#table_view_offset# + 25))
                Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
            }
        }
    }
    Div(Class: panel panel-primary) {
    Form() {
        Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
        Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
    }
}
```

## Conclusions (fr: Conclusions) {#conclusions}

Au lieu de développer d'autres sujets importants pour les développeurs d'applications, tels que les styles de mise en page, la gestion des autorisations d'accès et l'interaction entre les applications et les ressources, ce tutoriel présente comment créer une application de base pour un écosystème. Pour plus d'informations sur ces sujets avancés, consultez d'autres documents pertinents.
