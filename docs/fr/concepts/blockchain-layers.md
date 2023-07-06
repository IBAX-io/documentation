# Le réseau IBAX {#the-ibax-network}

Dans cette section, nous vous expliquerons comment utiliser IBAX.

- [Le réseau IBAX](#the-ibax-network)
  - [Développeurs d'applications](#application-developers)
  - [Membres d'ECOLIB](#ecolib-members)
  - [Applications ECOLIB et applications de plateforme](#ecolib-applications-and-platform-applications)
  - [Modèle sous-jacent](#underlying-model)
  - [Mise en œuvre](#implementation)
  


Si vous êtes intéressé par le développement, l'utilisation ou la gestion des applications dans IBAX, vous n'avez peut-être pas besoin de le comprendre du tout.

Dans IBAX, la blockchain et le réseau blockchain sont cachés aux membres d'ECOLIB, aux administrateurs et aux développeurs d'applications.
IBAX propose une [API RESTful](../reference/api2.md) pour tous les groupes d'utilisateurs, qui offre un accès distribué et inviolable à l'état global de la blockchain.

## Développeurs d'applications {#application-developers}

En termes techniques, l'**état global** est un ensemble de données, qui est implémenté via la base de données d'IBAX. 
Du point de vue des développeurs d'applications, une application interagit avec la base de données en interrogeant, en insérant et en mettant à jour des tables.

Dans IBAX, les transactions sont écrites dans la blockchain en implémentant divers contrats intelligents. Ces transactions appelleront des codes de contrat intelligent implémentés par les nœuds du réseau blockchain, qui mettront à jour l'état global (base de données) en conséquence.

Pour les développeurs d'applications, un contrat intelligent est une fonction à laquelle des données seront écrites dans la base de données lorsqu'elle est implémentée. 
Les pages sont comme des scripts et le code de la page est un ensemble de fonctions de modèle de page, certaines de ces fonctions affichent des éléments de page, tandis que d'autres données proviennent de la base de données. 
Les développeurs d'applications n'ont pas besoin de comprendre ce que sont les transactions, la génération de blocs et les algorithmes de consensus, il suffit de les utiliser.

## Membres d'ECOLIB {#ecolib-members}

Les applications écrites par les développeurs s'exécutent dans un environnement appelé [ECOLIB](thesaurus.md#ecolib).
Une application sert généralement à un but spécifique et accomplit diverses tâches en collaboration avec plusieurs autres applications.

Un utilisateur doit devenir membre d'un ECOLIB s'il souhaite accéder aux applications qui s'y trouvent, et il peut être membre de plusieurs ECOLIB différents en même temps.

Les membres d'ECOLIB peuvent consulter et modifier la base de données à partir des pages de l'application, tout comme remplir des formulaires, cliquer sur des boutons et naviguer entre les pages d'une application web classique.

## Applications ECOLIB et applications de plateforme {#ecolib-applications-and-platform-applications}

Les applications peuvent être classées en **applications ECOLIB** et **applications de plateforme**.

> Applications ECOLIB

Une application ECOLIB met en œuvre certaines fonctions uniques ou des processus métier spécifiques à un ECOLIB, mais elle n'est disponible que dans cet ECOLIB.

> Applications de plateforme

Une application de plateforme est applicable à tous les ECOLIBs. Toute application peut être développée en tant qu'application de plateforme. Les développeurs d'IBAX fourniraient des applications de plateforme qui soutiennent les fonctions principales de gouvernance des ECOLIBs, telles que le vote, la notification et la gestion des rôles des membres de l'ECOLIB.

## Modèle sous-jacent {#underlying-model}

> Définition des couches

IBAX est composé de plusieurs couches :

* Couche d'interaction utilisateur

    Les membres d'ECOLIB interagissent avec l'application via des pages et des éléments de page.

* Couche d'application

    Les développeurs d'applications interagissent avec l'état global (tables de données) via des codes de contrat intelligent et des codes de page.

* Couche d'état global

    Met à jour et synchronise l'état global (base de données) en fonction des opérations écrites dans le grand livre distribué (blockchain).

* Couche blockchain

    Met à jour le grand livre distribué avec de nouveaux blocs. Les opérations (transactions) enregistrées dans les nouveaux blocs doivent être effectuées sur l'état global.

* Couche réseau de nœuds

    Implémente le protocole du réseau IBAX, qui distribue, vérifie les transactions et génère de nouveaux blocs sur le réseau de nœuds. De même, les nouveaux blocs sont distribués et vérifiés par le réseau de nœuds.

    Le grand livre distribué de tous les nœuds est maintenu synchronisé. En cas de conflits dans un nœud, le nœud identifiera les blockchains considérées comme valides et les blockchains invalides seront annulées en conséquence.

* Couche de transaction

    Les transactions sont la base de la génération de blocs et des protocoles blockchain, et les transactions elles-mêmes sont le résultat des opérations effectuées au niveau de l'interaction utilisateur. Les transactions sont générées par Weaver.

    Lorsqu'un utilisateur ou un développeur effectue une opération telle que cliquer sur un bouton sur une page ou implémenter un contrat intelligent à partir de l'éditeur de code, Weaver convertira cette opération en une transaction et l'enverra au nœud réseau auquel il est connecté.

Par conséquent, le flux des transactions est le suivant:

  * Une opération utilisateur sur une page utilisateur deviendra une transaction;
  * La transaction est contenue dans un bloc;
  * Le bloc est inclus dans la blockchain;
  * Le changement d'opération entraînera un changement d'état global de la blockchain, et cette opération sera appliquée à la base de données;
  * Tout changement de base de données sera reflété dans l'application.

## Mise en œuvre {#implementation}

IBAX a deux composants majeurs, à savoir le serveur [go-ibax](https://github.com/IBAX-io/go-ibax) et Weaver [Code source](https://github.com/IBAX-io/weaver).

Weaver:
  * Fournit les pages utilisateur;
  * Fournit l'IDE pour le développement d'applications;
  * Stocke les clés publiques des comptes utilisateur et effectue l'autorisation;
  * Demande les données de la base de données depuis les pages d'application et affiche les pages d'application aux utilisateurs;
  * Envoie des transactions au serveur via [API REST](../reference/api2.md);
  
    Afin de créer automatiquement des transactions en fonction des opérations utilisateur, Weaver convertira ces opérations en transactions lorsque les développeurs d'applications implémenteront un contrat intelligent depuis l'IDE.

Serveur:
  * Conserve l'état global (base de données) du nœud;
  * Implémentation du protocole de la blockchain;
  * Implémentation des codes de contrat intelligent dans la [Machine Virtuelle](../topics/vm.md) IBAX;
  * Implémentation des codes de page dans le [Moteur de Modèles](../topics/templates2.md);
  * Implémentation de l'[API RESTful](../reference/api2.md).
  
