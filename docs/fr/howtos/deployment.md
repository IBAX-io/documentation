# Déploiement d'un réseau IBAX {#deployment-of-a-ibax-network}

Dans cette section, nous vous montrerons comment déployer votre propre réseau blockchain.

## Un exemple de déploiement {#an-deployment-example}

Un réseau blockchain sera déployé avec les trois nœuds suivants à titre d'exemple.

Trois nœuds du réseau :

  * Le nœud 1 est le premier nœud du réseau blockchain, qui peut générer de nouveaux blocs et envoyer des transactions à partir des clients qui y sont connectés ;
  * Le nœud 2 est un autre nœud honorable, qui peut générer de nouveaux blocs et envoyer des transactions à partir des clients qui y sont connectés ;
  * Le nœud 3 est un nœud gardien, qui ne peut pas générer de nouveaux blocs, mais peut envoyer des transactions à partir des clients qui y sont connectés.

Configurations des trois nœuds à déployer :

* Chaque nœud utilise sa propre instance du système de base de données PostgreSQL ;
* Chaque nœud utilise sa propre instance du service Centrifugo ;
* Le côté serveur de github-backend est déployé sur le même hôte que les autres composants backend.

Les adresses et ports d'échantillon utilisés par les nœuds sont décrits dans le tableau suivant :


| Nœud |       Composant       |    IP et port     |
| :--: | :-------------------: | :--------------: |
|  1   |      PostgreSQL       |  127.0.0.1:5432  |
|  1   |      Centrifugo       | 192.168.1.1:8000 |
|  1   | go-ibax (TCP service) | 192.168.1.1:7078 |
|  1   | go-ibax (API service) | 192.168.1.1:7079 |
|  2   |      PostgreSQL       |  127.0.0.1:5432  |
|  2   |      Centrifugo       | 192.168.1.2:8000 |
|  2   | go-ibax (TCP service) | 192.168.1.2:7078 |
|  2   | go-ibax (API service) | 192.168.1.2:7079 |
|  3   |      PostgreSQL       |  127.0.0.1:5432  |
|  3   |      Centrifugo       | 192.168.1.3:8000 |
|  3   | go-ibax (TCP service) | 192.168.1.3:7078 |
|  3   | go-ibax (API service) | 192.168.1.3:7079 |

## Phase de déploiement {#deploy-phase}
Votre propre réseau blockchain doit être déployé en plusieurs étapes:
- [Déploiement d'un réseau IBAX](#deployment-of-a-ibax-network)
  - [Exemple de déploiement](#an-deployment-example)
  - [Phase de déploiement](#deploy-phase)
  - [Déploiement du serveur](#server-deployment)
    - [Déploiement du premier nœud](#deploy-the-first-node)
    - [Dépendances et paramètres d'environnement](#dependencies-and-environment-settings)
      - [sudo](#sudo)
    - [Golang](#golang)
    - [PostgreSQL](#postgresql)
    - [Centrifugo](#centrifugo)
    - [Structure des répertoires](#directory-structure)
    - [Créer une base de données](#create-a-database)
    - [Configurer Centrifugo](#configure-centrifugo)
    - [Installer go-ibax](#install-go-ibax)
    - [Configurer le premier nœud](#configure-the-first-node)
    - [Initialiser le serveur du premier nœud](#initiate-the-first-node-server)
  - [Déploiement des autres nœuds](#deploy-other-nodes)
    - [Nœud 2](#node-2)
    - [Nœud 3](#node-3)
  - [Déploiement de l'interface utilisateur](#front-end-deployment)
    - [Prérequis logiciels](#software-prerequisites)
    - [Construire une application Weaver](#build-a-weaver-application)
    - [Ajouter le fichier de configuration pour le réseau blockchain](#add-the-configuration-file-for-the-blockchain-network)
    - [Construire l'application Weaver Web](#build-weaver-web-application)
  - [Configurer le réseau blockchain](#configure-the-blockchain-network)
    - [Créer le compte créateur](#create-the-creator-account)
    - [Importer les applications, les rôles et les modèles](#import-applications-roles-and-templates)
    - [Ajouter le premier nœud à la liste des nœuds](#add-the-first-node-to-the-node-list)
  - [Ajouter d'autres nœuds d'honneur](#add-other-honor-nodes)
    - [Ajouter des membres au groupe de rôles du consensus](#add-members-into-the-consensus-role-group)
    - [Créer le compte propriétaire pour les autres nœuds](#create-the-owner-account-for-other-nodes)
    - [Assigner au propriétaire du nœud le rôle de validateur](#assign-the-node-owner-with-the-validators-role)


## Déploiement du serveur {#server-deployment}

### Déployer le premier nœud {#deploy-the-first-node}

Le premier nœud est spécial car il est essentiel pour lancer le réseau blockchain. Le premier bloc de la blockchain est généré par le premier nœud, et tous les autres nœuds téléchargent la blockchain à partir de celui-ci. Le propriétaire du premier nœud est le créateur de la plateforme.

### Dépendances et paramètres de l'environnement {#dependencies-and-environment-settings}

#### sudo {#sudo}

Toutes les commandes de Debian 9 doivent être exécutées en tant qu'utilisateur non root. Cependant, certaines commandes système nécessitent des permissions de super utilisateur pour être exécutées. Par défaut, sudo n'est pas installé sur Debian 9, vous devez l'installer d'abord.

1. Devenez un super utilisateur.

```shell
su -
```

2. Mettez à jour votre système.

```shell
apt update -y && apt upgrade -y && apt dist-upgrade -y
```

3. Installer sudo.

```shell
apt install sudo -y
```

4. Ajoutez votre utilisateur au groupe sudo.

```shell
usermod -a -G sudo user
```

5. Après le redémarrage, les modifications prennent effet.
   
### Golang {#golang}

Installez Go selon les [Documents Officiels](https://golang.org/doc/install#tarball).

1. Téléchargez la dernière version stable de Go (> 1.10.x) depuis le [site officiel de Golang](https://golang.org/dl/) ou via la ligne de commande :

```shell
wget https://dl.google.com/go/go1.11.2.linux-amd64.tar.gz
```

2. Utilisez tar pour extraire l'archive tar dans le répertoire `/usr/local`.

```shell
tar -C /usr/local -xzf go1.11.2.linux-amd64.tar.gz
```

3. Ajoutez `/usr/local/go/bin` aux variables d'environnement PATH (qui se trouvent dans `/etc/profile` ou `$HOME/.profile`).

```shell
export PATH=$PATH:/usr/local/go/bin
```

1. Exécutez le fichier `source` pour que les modifications prennent effet, par exemple :

```shell
source $HOME/.profile
```

2. Supprimer les fichiers temporaires.

```shell
rm go1.11.2.linux-amd64.tar.gz
```

### PostgreSQL {#postgresql}

1. Installez PostgreSQL (> v.10) et psql:

```shell
sudo apt install -y postgresql
```

### Centrifugo {#centrifugo}

1. Téléchargez Centrifugo V.1.8.0 depuis [GitHub](https://github.com/centrifugal/centrifugo/releases/) ou via la ligne de commande :

```shell
wget https://github.com/centrifugal/centrifugo/releases/download/v1.8.0/centrifugo-1.8.0-linux-amd64.zip \
&& unzip centrifugo-1.8.0-linux-amd64.zip \
&& mkdir centrifugo \
&& mv centrifugo-1.8.0-linux-amd64/* centrifugo/
```

2. Supprimer les fichiers temporaires.

```shell
rm -R centrifugo-1.8.0-linux-amd64 \
&& rm centrifugo-1.8.0-linux-amd64.zip
```

### Structure du répertoire {#directory-structure}

Pour le système Debian 9, il est recommandé de stocker tous les logiciels utilisés par la plateforme blockchain dans un répertoire séparé.

Le répertoire `/opt/backenddir` est utilisé ici, mais vous pouvez utiliser n'importe quel répertoire. Dans ce cas, veuillez modifier toutes les commandes et les fichiers de configuration en conséquence.

1. Créez un répertoire pour la plateforme blockchain :

```shell
sudo mkdir /opt/backenddir
```

2. Faites de votre utilisateur le propriétaire du répertoire.

```shell
sudo chown user /opt/backenddir/
```

3. Créez des sous-répertoires pour Centrifugo, go-ibax et les données du nœud. Toutes les données du nœud sont stockées dans un répertoire nommé `nodeX`, où `X` est le numéro du nœud. Selon le nœud à déployer, `node1` est le Nœud 1, `node2` est le Nœud 2, et ainsi de suite.

```shell
mkdir /opt/backenddir/go-ibax \
mkdir /opt/backenddir/go-ibax/node1 \
mkdir /opt/backenddir/centrifugo \
```

### Créer une base de données {#create-a-database}

1. Changer le mot de passe utilisateur postgres au mot de passe par défaut *123456*. Vous pouvez définir votre propre mot de passe, mais vous devez le modifier dans le fichier de configuration du nœud *config.toml*.

```shell
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '123456'"
```

2. Créez une base de données d'état actuel pour le nœud, par exemple **chaindb** :

```shell
sudo -u postgres psql -c "CREATE DATABASE chaindb"
```

### Configurer Centrifugo {#configure-centrifugo}

1. Créez le fichier de configuration Centrifugo :

```shell
echo '{"secret":"CENT_SECRET"}' > /opt/backenddir/centrifugo/config.json
```

Vous pouvez définir votre propre *secret*, mais vous devez également le modifier dans le fichier de configuration du nœud *config.toml*.

### Installer go-ibax {#install-go-ibax}

1. Téléchargez github-backend depuis GitHub :
2. Copiez le fichier binaire go-ibax dans le répertoire `/opt/backenddir/go-ibax`. Si vous utilisez l'espace de travail Go par défaut, les fichiers binaires se trouvent dans le répertoire `$HOME/go/bin`.

```shell
cp $HOME/go/bin/go-ibax /opt/backenddir/go-ibax
```

### Configure the first node {#configure-the-first-node}

3. Créez le fichier de configuration pour le Node 1 :

```shell
/opt/backenddir/go-ibax config \
 --dataDir=/opt/backenddir/node1 \
 --dbName=chaindb \
 --centSecret="CENT_SECRET" --centUrl=http://192.168.1.1:8000 \
 --httpHost=192.168.1.1 \
 --httpPort=7079 \
 --tcpHost=192.168.1.1 \
 --tcpPort=7078
```

4. Générer les clés du Node 1, y compris les clés publique et privée du nœud et du compte :
```shell
/opt/backenddir/go-ibax generateKeys \
 --config=/opt/backenddir/node1/config.toml
```

5. Générer le premier bloc :

> Remarque
>
> Si vous souhaitez créer votre propre réseau blockchain, vous devez utiliser l'option `--test=true`. Sinon, vous ne pourrez pas créer de nouveau compte.

```shell
/opt/backenddir/go-ibax generateFirstBlock \
 --config=/opt/backenddir/node1/config.toml \
 --test=true
```

6. Initialiser la base de données.

```shell
/opt/backenddir/go-ibax initDatabase \
 --config=/opt/backenddir/node1/config.toml
```

###Initialiser le premier serveur de nœuds {#initiate-the-first-node-server}

Pour démarrer le premier serveur de nœuds, vous devez démarrer les deux services suivants :
* centrifugo
* go-ibax

Si vous n'avez pas réussi à créer [des services](https://wiki.debian.org/systemd/Services) avec ces fichiers, vous pouvez exécuter les fichiers binaires à partir de différents terminaux.

1. Exécutez centrifugo :

```shell
/opt/backenddir/centrifugo/centrifugo \
 -a 192.168.1.1 -p 8000 \
 --config /opt/backenddir/centrifugo/config.json
```

2. Exécutez go-ibax:

```shell
/opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node1/config.toml
```

## Déployer d'autres nœuds {#deploy-other-nodes}

Bien que le déploiement de tous les autres nœuds (Nœud 2 et Nœud 3) soit similaire au premier, il existe trois différences :

* Vous n'avez pas besoin de générer le premier bloc. Mais il doit être copié depuis le répertoire de données du nœud 1 vers le nœud actuel ;
* Le nœud doit télécharger les blocs depuis le nœud 1 en configurant l'option `--nodesAddr` ;
* Le nœud doit utiliser ses propres adresses et ports.

### Noeud 2 {#node-2}

Suivez les instructions opérationnelles indiquées ci-dessous :

1. [Dépendances et paramètres d'environnement](#dependencies-and-environment-settings)
2. [Créer une base de données](#create-a-database)
3. [Centrifugo](#centrifugo)
4. [Installer go-ibax](#install-go-ibax)
5. Créer le fichier de configuration pour le Node 2 :

```shell
 /opt/backenddir/go-ibax config \
--dataDir=/opt/backenddir/node2 \
--dbName=chaindb \
--centSecret="CENT_SECRET" --centUrl=http://192.168.1.2:8000 \
--httpHost=192.168.1.2 \
--httpPort=7079 \
--tcpHost=192.168.1.2 \
--tcpPort=7078 \
--nodesAddr=192.168.1.1
```

6. Copiez le premier fichier de bloc vers le Node 2. Par exemple, vous pouvez effectuer cette opération sur le Node 2 via scp :

```shell
 scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node2/
```

7. Générer les clés de Node 2, y compris les clés publique et privée du nœud et du compte :

```shell
 /opt/backenddir/go-ibax generateKeys \
--config=/opt/backenddir/node2/config.toml
```

8. Initialiser la base de données.

```shell
 ./go-ibax initDatabase --config\=node2/config.toml
```

9. Exécutez centrifugo:

```shell
/opt/backenddir/centrifugo/centrifugo \
-a 192.168.1.2 -p 8000 \
--config/opt/backenddir/centrifugo/config.json
```

10. Exécutez go-ibax:

```shell
/opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node2/config.toml
```

En conséquence, le nœud télécharge le bloc à partir du premier nœud. Comme ce nœud n'est pas un nœud de vérification, il ne peut pas générer un nouveau bloc. Le nœud 2 sera ajouté ultérieurement à la liste des nœuds de vérification.

### Noeud 3{#node-3}

Suivez les instructions opérationnelles indiquées ci-dessous :

1. [Dépendances et paramètres d'environnement](#dependencies-and-environment-settings)

2. [Créer une base de données](#create-a-database)

3. [Centrifugo](#centrifugo)

4. [Installer go-ibax](#install-go-ibax)

5. Créer le fichier de configuration pour le nœud 3 :

```shell
 /opt/backenddir/go-ibax config \
--dataDir=/opt/backenddir/node3 \
--dbName=chaindb \
--centSecret="CENT_SECRET" --centUrl=http://192.168.1.3:8000 \
--httpHost=192.168.1.3 \
--httpPort=7079 \
--tcpHost=192.168.1.3 \
--tcpPort=7078 \
--nodesAddr=192.168.1.1
```

6. Copiez le premier fichier de bloc vers le Node 3. Par exemple, vous pouvez effectuer cette opération sur le Node 3 via scp :

```shell
 scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node3/
```


7. Générer la clé du Node 3, comprenant les clés publique et privée du nœud ainsi que du compte :

```shell
 /opt/backenddir/go-ibax generateKeys \
--config=/opt/backenddir/node3/config.toml
```

8. Initialiser la base de données.

```shell
 ./go-ibax initDatabase --config=node3/config.toml
```

9. Exécutez centrifugo:

```shell
 /opt/backenddir/centrifugo/centrifugo \
-a 192.168.1.3 -p 8000 \
--config/opt/backenddir/centrifugo/config.json
```

10. Exécutez go-ibax:

```shell
 /opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node3/config.toml
```

En conséquence, le nœud télécharge le bloc à partir du premier nœud. Comme ce nœud n'est pas un nœud de vérification, il ne peut pas générer un nouveau bloc. Le client peut être connecté au nœud et peut envoyer des transactions au réseau.

## Déploiement front-end {#front-end-deployment}

Seulement après avoir installé **GNOME GUI** sur Debian 9 (Stretch) 64-bit Official Release, le client Govis peut être construit avec le gestionnaire de paquets `yarn`.

### Prérequis logiciels {#software-prerequisites}

1. Téléchargez la version LTS 8.11 de Node.js depuis le site officiel de Node.js ou via la ligne de commande :

```shell
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash
```

2. Installer Node.js:

```shell
sudo apt install -y nodejs
```

1. Téléchargez la version 1.7.0 de Yarn à partir du dépôt [Github](https://github.com/yarnpkg/yarn/releases) de Yarn ou via la ligne de commande :

```shell
cd/opt/backenddir \
&& wget https://github.com/yarnpkg/yarn/releases/download/v1.7.0/yarn_1.7.0_all.deb
```

2. Installer Yarn:

```shell
sudo dpkg -i yarn_1.7.0_all.deb && rm yarn_1.7.0_all.deb
```

### Créez une application Weaver {#build-a-weaver-application}

1. Téléchargez la dernière version de Weaver depuis github-frontend via git :

```shell
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/ibax-front.git
```

2. Installer les dépendances de Weaver via Yarn:

```shell
cd/opt/backenddir/ibax-front/ \
&& yarn install
```

### Ajoutez le fichier de configuration pour le réseau blockchain. {#add-the-configuration-file-for-the-blockchain-network}

1. Créez un fichier *settings.json* qui contient des informations sur la connexion du nœud :

```shell
cp/opt/backenddir/ibax-front/public/settings.json.dist \
 /opt/backenddir/ibax-front/public/public/settings.json
```
 
2. Modifiez le fichier *settings.json* dans n'importe quel éditeur de texte et ajoutez les paramètres requis dans ce format :

```
http://Node_IP-address:Node_HTTP-Port
```

Exemples de fichiers *settings.json* pour les trois nœuds :

```json
{
  "fullNodes": [
    "http://192.168.1.1:7079",
    "http://192.168.1.2:7079",
    "http://192.168.1.3:7079"
  ]
}
```

Construire une application de bureau Weaver

1. Utilisez yarn pour construire la version de bureau :

```shell
cd/opt/backenddir/ibax-front \
&& yarn build-desktop
```

2. La version de bureau sera empaquetée dans le format de suffixe AppImage.

```shell
yarn release --publish never -l
```

Après la construction, votre application peut être utilisée, mais sa configuration de connexion ne peut pas être modifiée. Si ces paramètres doivent être modifiés, une nouvelle version de l'application doit être construite.

### Construire une application web Weaver {#build-weaver-web-application}

1. Créez une application web.

```shell
cd/opt/backenddir/ibax-front/ \
&& yarn build
```

Après la construction, les fichiers redistribuables seront placés dans le répertoire /build. Vous pouvez utiliser n'importe quel serveur web de votre choix pour le déploiement, et le fichier *settings.json* doit également être placé dans ce répertoire. Notez que si les paramètres de connexion sont modifiés, il n'est pas nécessaire de reconstruire l'application. Au lieu de cela, modifiez le fichier *settings.json* et redémarrez le serveur web.

1. À des fins de développement ou de test, vous pouvez construire le serveur web de Yarn :


```shell
sudo yarn global add serve \
&& serve -s build
```

Après cela, votre application web Weaver sera disponible à l'adresse suivante : `http://localhost:5000`.

## Configurer le réseau blockchain {#configure-the-blockchain-network}

### Créez le compte créateur {#create-the-creator-account}

Créez un compte pour le propriétaire du premier nœud. Ce compte est le créateur de la nouvelle plateforme blockchain et a un accès administrateur.

1. Lancez Weaver;

2. Importez le compte existant en utilisant les données suivantes:

    - Chargez la sauvegarde de la clé privée du propriétaire du nœud située dans le fichier `/opt/backenddir/node1/PrivateKey`.

> Remarque
>
> Il y a deux fichiers de clé privée dans ce répertoire. Le fichier `PrivateKey` est utilisé pour créer le compte du propriétaire du nœud. Le fichier `NodePrivateKey` est la clé privée du nœud lui-même et doit être gardé secret.

3. Après vous être connecté à votre compte, puisqu'aucun rôle n'a été créé pour le moment, veuillez sélectionner l'option Sans rôle.

### Importer des applications, des rôles et des modèles {#import-applications-roles-and-templates}

À l'heure actuelle, la plateforme blockchain est dans un état vierge. Vous pouvez la configurer en ajoutant des rôles, des modèles et des frameworks d'application qui prennent en charge les fonctions de base de l'écosystème.

1. Clonez le dépôt de l'application ;

```shell
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/dapps.git
```

2. Accédez à Développeur > Importer dans Weaver;

3. Importez les applications dans l'ordre suivant:

```
 A./opt/backenddir/dapps/system.json 
 B./opt/backenddir/dapps/conditions.json 
 C./opt/backenddir/dapps/basic.json 
 D./opt/backenddir/dapps/lang_res.json
```

4. Accédez à Admin> Rôle, et cliquez sur Installer le rôle par défaut ;

5. Quittez le système via le menu du fichier de configuration dans le coin supérieur droit ;

6. Connectez-vous au système en tant qu'administrateur ;

7. Accédez à Accueil> Vote> Liste des modèles, et cliquez sur Installer le modèle par défaut.

### Ajoutez le premier nœud à la liste des nœuds {#add-the-first-node-to-the-node-list}

1. Accédez à Développeur> Paramètres de la plateforme, et cliquez sur le paramètre first_nodes;

2. Spécifiez les paramètres du premier nœud du réseau blockchain.

  * public_key - La clé publique du nœud se trouve dans le fichier `/opt/backenddir/node1/NodePublicKey`.

```
{"api_address":"http://192.168.1.1:7079","public_key":"%node_public_key%","tcp_address":"192.168.1.1:7078"}
```

## Ajoutez d'autres nœuds d'honneur {#add-other-honor-nodes}

### Ajouter des membres dans le groupe de rôle de consensus {#add-members-into-the-consensus-role-group}

Par défaut, seuls les membres du groupe de rôle Consensus peuvent participer au vote nécessaire pour ajouter d'autres nœuds principaux. Cela signifie qu'avant d'ajouter un nouveau nœud principal, les membres de l'écosystème doivent être assignés au rôle.
Dans cette section, le compte du créateur est désigné comme le seul membre du groupe de rôle Consensus. Dans un environnement de production, ce rôle doit être attribué aux membres de la plateforme qui exercent la gouvernance.

1. Accédez à Accueil > Rôle et cliquez sur Consensus ;

2. Cliquez sur Assigner pour attribuer le compte du créateur au rôle.

### Créez le compte propriétaire pour les autres nœuds. {#create-the-owner-account-for-other-nodes}

1. Exécutez Weaver;

2. Importez le compte existant en utilisant les données suivantes:
     - Chargez la sauvegarde de la clé privée du propriétaire du nœud située dans le fichier `/opt/backenddir/node2/PrivateKey`.

3. Après vous être connecté au compte, puisqu'aucun rôle n'a été créé à ce moment-là, veuillez sélectionner l'option Sans rôle.

4. Accédez à Accueil> Informations personnelles, et cliquez sur le titre des informations personnelles;

5. Ajoutez les détails du compte (titre des informations personnelles, description, etc.).

### Attribuer le propriétaire du nœud au rôle de Validateur. {#assign-the-node-owner-with-the-validators-role}

1. Opérations par le nouveau propriétaire du nœud :
    1. Accédez à Accueil> Vérificateur ;
    2. Cliquez sur Créer une demande et remplissez le formulaire de candidature du vérificateur ;
    3. Cliquez sur envoyer la demande.
2. Opérations par le créateur :
    1. Connectez-vous avec un rôle de consensus (Consensus) ;
    2. Accédez à Accueil> Vérificateur ;
    3. Cliquez sur l'icône "Lecture" pour commencer le vote selon la demande du candidat ;
    4. Accédez à Accueil > Vote, et cliquez sur Mettre à jour le statut du vote ;
    5. Cliquez sur le nom du vote et votez pour le propriétaire du nœud.

En conséquence, le compte du propriétaire du nouveau nœud est attribué au rôle de validateur, et le nouveau nœud est ajouté à la liste des nœuds principaux.
