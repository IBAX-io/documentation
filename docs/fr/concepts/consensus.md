
# Consensus de preuve d'autorité décentralisée {#decentralized-proof-of-authority-consensus}

* Qu'est-ce que le consensus décentralisé Proof-of-Authority (DPoA) ?

* Avantages du consensus DPoA

* Consensus DPoA et moyens courants d'attaque

* Mise en œuvre du consensus DPoA dans IBAX

Dans cette section, nous décrirons le consensus décentralisé Proof-of-Authority (DPoA) et sa mise en œuvre dans IBAX.


 - [Qu'est-ce que le consensus décentralisé de preuve d'autorité ?](#what-is-decentralized-proof-of-authority-consensus)
  - [Avantages du consensus DPoA](#advantages-of-dpoa-consensus)
  - [Consensus DPoA et moyens courants d'attaque](#dpoa-consensus-and-common-means-of-attack)
    - [DoS](#dos)
    - [Attaque à 51 pour cent](#percent-attack-51)
  - [Implémentation du consensus DPoA dans IBAX](#implementation-of-dpoa-consensus-in-ibax)
    - [Nœud d'honneur](#honor-node)
    - [Nœud leader](#leader-node)
    - [Génération de nouveaux blocs](#generation-of-new-blocks)
    - [Fourches](#forks)


## Qu'est-ce que le consensus décentralisé de preuve d'autorité ? {#what-is-decentralized-proof-of-authority-consensus}

En tenant compte des scénarios d'application commerciale et des environnements réels, IBAX Network a mis en place un nouveau mécanisme de consensus, DPoA (Proof of Authority décentralisé).

La décentralisation a toujours été notre conviction profonde. Cela ne concerne pas seulement l'environnement du réseau d'infrastructure d'IBAX. Au contraire, nous permettrons à la décentralisation de s'enraciner dans chaque écoLib créé dans le réseau IBAX et utiliserons des solutions techniques pour atteindre un haut degré d'autogouvernance dans chacun d'entre eux. Dans le but d'une autogouvernance hautement distribuée, nous avons apporté de nombreux changements dans l'architecture globale et la mise en œuvre technique. Cependant, dans la pratique, nous ne pouvons pas éviter le concept de gestion centralisée. Afin de trouver un équilibre entre centralisation et décentralisation, en plus du mécanisme de consensus DPoA, nous avons également formulé certains programmes de récompense et d'incitation.

IBAX Network a créé un nouveau mécanisme de consensus qui combine la distribution, la centralisation faible et une autorité de certification. Nous l'appelons DPoA (Proof of Authority décentralisé). Pour assurer la continuité de l'ensemble du réseau IBAX, le consensus couvre non seulement le réseau public IBAX, mais aussi les écoLibs créés par chaque utilisateur et groupe d'utilisateurs. Cela crée une organisation autonome décentralisée, équitable, transparente et à l'épreuve de la fraude, véritablement autogouvernée (DAO).

DPoA dispose d'un mécanisme de prévention contre les attaques réseau et permet la création de nœuds Mint qui protègent le réseau et créent de nouvelles pièces IBXC. Les détenteurs d'IBAXCoin peuvent miser une partie de leur solde de liquidité IBXC dans les nœuds Mint pour des récompenses d'émission de Mint & Stake. Le minting et le staking servent à augmenter le coût et la difficulté des attaques et à augmenter la valeur totale des pièces IBXC de manière proportionnelle. Grâce à ce mécanisme, la probabilité et les dommages de toute attaque sont infiniment proches de zéro.

## Avantages du consensus DPoA {#advantages-of-dpoa-consensus}

Comparé aux consensus de Preuve de Travail (PoW) ou de Preuve d'Enjeu (PoS), le consensus DPoA présente les avantages suivants :

* Pas besoin de matériel performant. Comparé au consensus PoW, les nœuds implémentant le consensus DPoA ne dépensent pas de ressources de calcul pour résoudre des tâches logiques mathématiques complexes.

* L'intervalle de temps pour générer de nouveaux blocs est prévisible, contrairement aux consensus PoW et PoS qui sont différents.

* Taux de transaction élevé. Les blocs sont générés en séquence à intervalle de temps spécifié par les nœuds autorisés du réseau, ce qui augmente la vitesse de vérification des transactions.

* Tolérance aux nœuds compromis et malveillants, tant que 51% des nœuds ne sont pas compromis. IBAX met en œuvre un mécanisme d'interdiction des nœuds et de révocation des droits de génération de blocs.

## Consensus DPoA et moyens courants d'attaque {#dpoa-consensus-and-common-means-of-attack}

### DoS {#dos}

Un attaquant peut envoyer une grande quantité de transactions et de blocs à un nœud ciblé dans le réseau, dans le but de perturber son fonctionnement et rendre ses services indisponibles.

Le mécanisme DPoA permet de se défendre contre les attaques par déni de service (DoS) :

* Étant donné que les nœuds du réseau sont pré-authentifiés, seuls les nœuds capables de résister aux attaques DoS peuvent se voir accorder des droits de génération de blocs.

* Si un nœud d'honneur est indisponible pendant une certaine période, il peut être exclu de la liste des nœuds d'honneur.

### Attaque à 51 pour cent {#percent-attack-51}

En ce qui concerne le scénario avec le consensus DPoA, une attaque de 51% nécessite à l'attaquant de prendre le contrôle de 51% des nœuds du réseau. Mais le scénario pour le consensus PoW est différent, car un attaquant doit obtenir 51% de la puissance de calcul du réseau. Obtenir le contrôle des nœuds dans un réseau blockchain autorisé est beaucoup plus difficile que d'obtenir la puissance de calcul.

Par exemple, dans un réseau mettant en œuvre le consensus PoW, un attaquant peut augmenter la puissance de calcul (les performances) du segment de réseau contrôlé, augmentant ainsi le pourcentage de nœuds contrôlés. Cela n'a aucun sens pour le consensus DPoA, car la puissance de calcul du nœud n'a aucun impact sur les décisions du réseau blockchain.

## Implémentation du consensus DPoA dans IBAX {#implementation-of-dpoa-consensus-in-ibax}

### Nœud d'honneur {#honor-node}

Dans IBAX, seuls les nœuds honorables peuvent générer de nouveaux blocs, ce qui maintient le réseau blockchain et le registre distribué.

La liste des nœuds honorables est conservée dans le registre blockchain. L'ordre des nœuds détermine la séquence dans laquelle les nœuds génèrent de nouveaux blocs.

### Nœud leader{#leader-node}

Le nœud leader est le nœud d'honneur qui génère un nouveau bloc à l'heure actuelle. La formule suivante détermine le nœud leader dans la liste actuelle des nœuds d'honneur.

``` text
leader = ((time - first) / step) % nodes
```

> leader

    Nœud leader actuel.

> time

    Heure actuelle (UNIX).

> first

    Temps de génération du premier bloc (UNIX).

> step

   Nombre de secondes dans l'intervalle de génération de blocs.

> nodes

    Nombre total de nœuds d'honneur.

#### Génération de nouveaux blocs {#generation-of-new-blocks}

Les nouveaux blocs sont générés par un [nœud leader](#leader-node) de l'intervalle de temps actuel. À chaque intervalle de temps, le rôle de leader est transmis au prochain nœud honorifique de la liste des nœuds honorifiques.

![avatar](/block-generation.png)

a) Étapes de génération des nouveaux blocs

Les principales étapes pour générer un nouveau bloc sont les suivantes :

1. Collecte toutes les nouvelles transactions de la file d'attente des transactions du nœud ;

2. Exécute les transactions une par une. Les transactions invalides ou inapplicables sont rejetées ;

3. Vérifie si les [limites de génération de blocs](../reference/platform-parameters.md#configure-the-generation-of-blocks) sont respectées ;

4. Génère un bloc avec des transactions valides et le signe avec la clé privée du nœud honorifique grâce à l'algorithme ECDSA ;

5. Envoie ce bloc aux autres nœuds honorifiques.

b) Vérification des nouveaux blocs

Étapes pour vérifier les nouveaux blocs sur d'autres nœuds honorifiques :

1. Recevoir un nouveau bloc et vérifier :

    - si le nouveau bloc a été généré par le nœud leader d'un intervalle actuel ;
    
    - s'il n'y a pas d'autres blocs générés par le nœud leader d'un intervalle actuel ;
    
    - si le nouveau bloc est correctement signé.
    
2. Exécuter les transactions du bloc une par une. Vérifier si les transactions sont exécutées avec succès et dans les limites de génération de blocs.

3. Ajouter ou rejeter le bloc, en fonction de l'étape précédente :

    - Si la validation du bloc est réussie, ajouter le nouveau bloc à la blockchain du nœud actuel ;
    
    - Si la validation du bloc a échoué, rejeter le bloc et envoyer une transaction de **mauvais bloc** ;
    
    - Si le nœud honorifique qui a créé ce bloc invalide continue de générer des mauvais blocs, il peut être banni ou exclu de la liste des nœuds honorifiques.

### Fourchettes {#forks}

Une **fourchette** est une version alternative de la blockchain, qui contient un ou plusieurs blocs générés indépendamment du reste de la blockchain.

Les fourches se produisent généralement lorsque certaines parties du réseau deviennent désynchronisées. Les facteurs qui peuvent entraîner des fourches sont probablement une latence réseau élevée, une violation intentionnelle ou non intentionnelle des limites de temps, une désynchronisation temporelle des nœuds. Si les nœuds du réseau sont répartis géographiquement, l'intervalle de génération des blocs doit être augmenté.

Les fourches sont résolues en suivant la règle de la plus longue blockchain. Lorsque deux versions de la blockchain sont détectées, les nœuds honorent la plus longue et annulent la plus courte.

![avatar](/block-fork-resolution.png)
