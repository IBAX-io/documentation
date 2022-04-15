# Bereitstellung eines IBAX-Netzwerks
In diesem Abschnitt zeigen wir Ihnen, wie Sie Ihr eigenes Blockchain-Netzwerk bereitstellen.
## Ein Bereitstellungsbeispiel

Als Beispiel wird ein Blockchain-Netzwerk mit den folgenden drei Knoten bereitgestellt.

Drei Netzwerkknoten:
* Knoten 1 ist der erste Knoten im Blockchain-Netzwerk, der neue Blöcke generieren und Transaktionen von mit ihm verbundenen Clients senden kann;
   * Knoten 2 ist ein weiterer Ehrenknoten, der neue Blöcke generieren und Transaktionen von mit ihm verbundenen Clients senden kann;
   * Knoten 3 ist ein Wächterknoten, der keine neuen Blöcke generieren kann, aber Transaktionen von mit ihm verbundenen Clients senden kann.

Konfigurationen der drei bereitzustellenden Knoten:
* Jeder Knoten verwendet seine eigene PostgreSQL-Datenbanksysteminstanz;
* Jeder Knoten verwendet seine eigene Centrifugo-Dienstinstanz;
* Das serverseitige Github-Backend wird auf demselben Host bereitgestellt wie andere Backend-Komponenten.

Die von den Knoten verwendeten Beispieladressen und Ports sind in der folgenden Tabelle beschrieben:

| Node |       Component       |    IP & port     |
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

## Bereitstellungsphase

Ihr eigenes Blockchain-Netzwerk muss in mehreren Schritten bereitgestellt werden:
- [Bereitstellung eines IBAX-Netzwerks](#bereitstellung-eines-ibax-netzwerk)
  - [Ein Bereitstellungsbeispiel](#ein-bereitstellungsbeispiel)
  - [Bereitstellungsphase](#bereitstellungsphase)
  - [Serverbereitstellung](#serverbereitstellung
    - [Stellen Sie den ersten Knoten bereit](#stellen-sie-den-ersten-knoten-bereit])
    - [Abhängigkeiten und Umgebungseinstellungen](#abhängigkeiten-und-umgebungseinstellungen)
      - [sudo](#sudo)
    - [Golang](#golang)
    - [PostgreSQL](#postgresql)
    - [Centrifugo](#centrifugo)
    - [Verzeichnisaufbau](#verzeichnisaufbau
    - [Eine Datenbank erstellen](#eine-datenbank-erstellen)
    - [Konfigurieren Centrifugo](#konfigurieren-centrifugo)
    - [Go-ibax installieren](#go-ibax installieren)
    - [Konfigurieren Sie den ersten Knoten](#konfigurieren-sie-den-ersten-Knoten)
    - [Initiieren Sie den ersten Knotenserver](#initiieren-sie-den-ersten-knotenserver)
  - [Andere Knoten bereitstellen](#andere-knoten-bereitstellen])
    - [Knoten 2](#knoten-2)
    - [Knoten 3](#knoten-3)
  - [Front-End-Bereitstellung](#front-end-bereitstellung)
    - [Software-Voraussetzungen](#software-voraussetzungen)
    - [Erstellen Sie eine Weaver-Anwendung](#erstellen-sie-eine-weaver-anwendung)
    - [Fügen Sie die Konfigurationsdatei für das Blockchain-Netzwerk hinzu](#Fügen-sie-die-Konfigurationsdatei-für-das-Blockchain-netzwerk-hinzu])
    - [Erstellen Sie eine Weaver-Webanwendung](#erstellen-sie-eine-weaver-webanwendung)
  - [Konfigurieren Sie das Blockchain-Netzwerk](#konfigurieren-sie-das-blockchain-netzwerk)
    - [Erstellen Sie das Creator-Konto](#erstellen-sie-das-creator-konto)
    - [Importieren Sie Anwendungen, Rollen und Vorlagen](#importieren-sie-anwendungen,rollen-und-vorlagen)
    - [Fügen Sie den ersten Knoten zur Knotenliste hinzu](#Fügen-sie-den-ersten-knoten-zur-knotenliste-hinzu)
  - [Füge weitere Ehrenknoten hinzu](#füge-weitere-ehrenknoten-hinzu)
    - [Fügen Sie der Consensus-Rollengruppe Mitglieder hinzu](#Fügen-sie-der-consensus-rollengruppe-mitglieder-hinzu)
    - [Erstellen Sie das Eigentümerkonto für andere Knoten](#erstellen-sie-das-eigentümerkonto-für-andere-knoten)
    - [Weisen Sie dem Knoteneigentümer die Rolle „Validierer“ zu](#weisen-sie-dem-knoteneigentümer-die-rolle-validierer-zu)

## Serverbereitstellung

### Stellen Sie den ersten Knoten bereit

Der erste Knoten ist ein besonderer, da er für den Start des Blockchain-Netzwerks unerlässlich ist. Der erste Block der Blockchain wird vom ersten Knoten generiert, und alle anderen Knoten würden die Blockchain von ihm herunterladen. Der Eigentümer des ersten Knotens ist der Plattformersteller.

### Abhängigkeiten und Umgebungseinstellungen

#### sudo
Alle Befehle von Debian 9 müssen als Nicht-Root-Benutzer ausgeführt werden. Einige Systembefehle erfordern jedoch zur Ausführung Superuser-Berechtigungen. Standardmäßig ist sudo nicht auf Debian 9 installiert, Sie müssen es zuerst installieren.

1. Superuser werden.

```shell
su -
```

2. Aktualisieren Sie Ihr System.

```shell
apt update -y && apt upgrade -y && apt dist-upgrade -y
```

3. Sudo installieren

```shell
apt install sudo -y
```

4. Fügen Sie Ihren Benutzer der sudo-Gruppe hinzu.

```shell
usermod -a -G sudo user
```

5. Nach dem Neustart werden die Änderungen wirksam.
   
### Golang

Installieren Sie Go gemäß der [Official Documents](https://golang.org/doc/install#tarball). 
1. Laden Sie die neueste stabile Version von Go (> 1.10.x) von der [offiziellen Golang-Website] (https://golang.org/dl/) oder über die Befehlszeile herunter:


```shell
wget https://dl.google.com/go/go1.11.2.linux-amd64.tar.gz
```

2. Verwenden Sie tar, um den Tarball in das Verzeichnis `/usr/local` zu extrahieren.

```shell
tar -C /usr/local -xzf go1.11.2.linux-amd64.tar.gz
```

3. Fügen Sie `/usr/local/go/bin` zu den PATH-Umgebungsvariablen hinzu (zu finden unter `/etc/profile` oder `$HOME/.profile`).

```shell
export PATH=$PATH:/usr/local/go/bin
```

1. Führen Sie die `source` aus, damit die Änderungen wirksam werden, zum Beispiel:


```shell
source $HOME/.profile
```

2. Temporäre Dateien löschen:

```shell
rm go1.11.2.linux-amd64.tar.gz
```

### PostgreSQL

1. Installieren Sie PostgreSQL (> v.10) and psql:

```shell
sudo apt install -y postgresql
```

### Centrifugo

1. Download Centrifugo V.1.8.0 aus [GitHub](https://github.com/centrifugal/centrifugo/releases/) oder über die Kommandozeile:

```shell
wget https://github.com/centrifugal/centrifugo/releases/download/v1.8.0/centrifugo-1.8.0-linux-amd64.zip \
&& unzip centrifugo-1.8.0-linux-amd64.zip \
&& mkdir centrifugo \
&& mv centrifugo-1.8.0-linux-amd64/* centrifugo/
```

2. Temporäre Dateien löschen:

```shell
rm -R centrifugo-1.8.0-linux-amd64 \
&& rm centrifugo-1.8.0-linux-amd64.zip
```
### Verzeichnisaufbau

Für das Debian 9-System wird empfohlen, die gesamte von der Blockchain-Plattform verwendete Software in einem separaten Verzeichnis zu speichern.
Hier wird das Verzeichnis `/opt/backenddir` verwendet, aber Sie können jedes Verzeichnis verwenden. Bitte ändern Sie in diesem Fall alle Befehle und Konfigurationsdateien entsprechend.

1. Erstellen Sie ein Verzeichnis für die Blockchain-Plattform:

```shell
sudo mkdir /opt/backenddir
```

2. Machen Sie Ihren Benutzer zum Eigentümer des Verzeichnisses:

```shell
sudo chown user /opt/backenddir/
```

3. Erstellen Sie Unterverzeichnisse für Centrifugo, go-ibax und Knotendaten. Alle Knotendaten werden in einem Verzeichnis namens `nodeX` gespeichert, wobei `X` die Knotennummer ist. Gemäß dem bereitzustellenden Knoten ist `node1` Knoten 1, `node2` ist Knoten 2 und so weiter.

```shell
mkdir /opt/backenddir/go-ibax \
mkdir /opt/backenddir/go-ibax/node1 \
mkdir /opt/backenddir/centrifugo \
```

### Erstellen Sie eine Datenbank

1. Ändern Sie das Benutzerpasswort postgres auf das Standardpasswort *123456*. Sie können Ihr eigenes Passwort festlegen, aber Sie müssen es in der Knotenkonfigurationsdatei *config.toml* ändern.
```shell
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '123456'"
```

2. Erstellen Sie eine aktuelle Zustandsdatenbank für den Knoten, zum Beispiel **chaindb**:

```shell
sudo -u postgres psql -c "CREATE DATABASE chaindb"
```

### Konfigurieren Centrifugo

1. Erstellen Sie die Centrifugo-Konfigurationsdatei:

```shell
echo '{"secret":"CENT_SECRET"}' > /opt/backenddir/centrifugo/config.json
```

Sie können Ihr eigenes *Geheimnis* festlegen, aber Sie müssen es auch in der Knotenkonfigurationsdatei *config.toml* ändern.

### go-ibax installieren

1. Github-Backend von GitHub herunterladen:
2. Kopieren Sie die go-ibax-Binärdatei in das Verzeichnis `/opt/backenddir/go-ibax`. Wenn Sie den standardmäßigen Go-Arbeitsbereich verwenden, befinden sich die Binärdateien im Verzeichnis `$HOME/go/bin` :

```shell
cp $HOME/go/bin/go-ibax /opt/backenddir/go-ibax
```

### Konfigurieren Sie den ersten Knoten

3. Erstellen Sie die Konfigurationsdatei für Knoten 1:

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

4. Generieren Sie die Schlüssel von Knoten 1, einschließlich der öffentlichen und privaten Schlüssel des Knotens und des Kontos:

```shell
/opt/backenddir/go-ibax generateKeys \
 --config=/opt/backenddir/node1/config.toml
```

5. Generieren Sie den ersten Block:

> Hinweis
>
> Wenn Sie Ihr eigenes Blockchain-Netzwerk erstellen möchten, müssen Sie die Option `--test=true` verwenden. Andernfalls können Sie kein neues Konto erstellen.

```shell
/opt/backenddir/go-ibax generateFirstBlock \
 --config=/opt/backenddir/node1/config.toml \
 --test=true
```

6. Initialisieren Sie die Datenbank:

```shell
/opt/backenddir/go-ibax initDatabase \
 --config=/opt/backenddir/node1/config.toml
```

### Initiiere den ersten Node-Server

Um den ersten Knotenserver zu starten, müssen Sie die folgenden zwei Dienste starten:
* centrifugo
* go-ibax

Wenn Sie mit diesen Dateien [Dienste](#https://wiki.debian.org/systemd/Services) nicht erstellen konnten, können Sie Binärdateien aus Verzeichnissen in verschiedenen Konsolen ausführen.

1. Lauf centrifugo:

```shell
/opt/backenddir/centrifugo/centrifugo \
 -a 192.168.1.1 -p 8000 \
 --config /opt/backenddir/centrifugo/config.json
```

2. Lauf go-ibax:

```shell
/opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node1/config.toml
```

## Andere Knoten bereitstellen

Obwohl die Bereitstellung aller anderen Knoten (Knoten 2 und Knoten 3) der ersten ähnlich ist, gibt es drei Unterschiede:

* Sie müssen den ersten Block nicht generieren. Aber es muss von Knoten 1 in das aktuelle Knotendatenverzeichnis kopiert werden;
* Der Knoten muss Blöcke von Knoten 1 herunterladen, indem er die Option `--nodesAddr` konfiguriert;
* Der Knoten muss seine eigenen Adressen und Ports verwenden.

### Knoten 2

Befolgen Sie die nachstehenden Betriebsanweisungen:
1. [Abhängigkeiten und Umgebungseinstellungen](#dependencies-and-environment-settings)
2. [Datenbank erstellen](#create-a-database)
3. [Zentrifuge](#Zentrifuge)
4. [go-ibax installieren](#install-go-ibax)
5. Erstellen Sie die Konfigurationsdatei für Knoten 2:

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

6. Kopieren Sie die erste Blockdatei auf Knoten 2. Sie können diese Operation beispielsweise auf Knoten 2 über scp ausführen:

```shell
 scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node2/
```

7. Generieren Sie die Schlüssel von Knoten 2, einschließlich der öffentlichen und privaten Schlüssel des Knotens und des Kontos:

```shell
 /opt/backenddir/go-ibax generateKeys \
--config=/opt/backenddir/node2/config.toml
```

8. Starten Sie die Datenbank:

```shell
 ./go-ibax initDatabase --config\=node2/config.toml
```

9. Lauf centrifugo:

```shell
/opt/backenddir/centrifugo/centrifugo \
-a 192.168.1.2 -p 8000 \
--config/opt/backenddir/centrifugo/config.json
```

10. Lauf go-ibax:

```shell
/opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node2/config.toml
```

As a result, the node downloads the block from the first node. As this node is not a verification node, it cannot generate a new block. Node 2 will be added to the list of verification nodes later.

### Knoten 3

Befolgen Sie die nachstehenden Betriebsanweisungen:
1. [Abhängigkeiten und Umgebungseinstellungen](#dependencies-and-environment-settings)

2. [Datenbank erstellen](#create-a-database)

3. [Zentrifuge](#Zentrifuge)

4. [go-ibax installieren](#install-go-ibax)

5. Erstellen Sie die Konfigurationsdatei für Knoten 3:

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

6. Kopieren Sie die erste Blockdatei auf Knoten 3. Sie können diese Operation beispielsweise auf Knoten 3 über scp ausführen:

```shell
 scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node3/
```


7.Generieren Sie den Schlüssel von Knoten 3, einschließlich der öffentlichen und privaten Schlüssel des Knotens und des Kontos:

```shell
 /opt/backenddir/go-ibax generateKeys \
--config=/opt/backenddir/node3/config.toml
```

8.Initiieren Sie die Datenbank:

```shell
 ./go-ibax initDatabase --config=node3/config.toml
```

9.Lauf centrifugo:

```shell
 /opt/backenddir/centrifugo/centrifugo \
-a 192.168.1.3 -p 8000 \
--config/opt/backenddir/centrifugo/config.json
```

10.Lauf go-ibax:

```shell
 /opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node3/config.toml
```
Als Ergebnis lädt der Knoten den Block vom ersten Knoten herunter. Da dieser Knoten kein Verifizierungsknoten ist, kann er keinen neuen Block erzeugen. Der Client kann mit dem Knoten verbunden sein und Transaktionen an das Netzwerk senden.

## Front-End-Bereitstellung

Erst nach der Installation von **GNOME GUI** auf Debian 9 (Stretch) 64-Bit Official Release kann der Govis-Client mit dem `Yarn`-Paketmanager erstellt werden.

### Softwarevoraussetzungen

1. Laden Sie Node.js LTS Version 8.11 von der offiziellen Website von Node.js oder über die Befehlszeile herunter:

```shell
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash
```

2. Installieren Node.js:

```shell
sudo apt install -y nodejs
```

1. Laden Sie Yarn Version 1.7.0 aus dem [Github](https://github.com/yarnpkg/yarn/releases)-Repository von Garn oder über die Befehlszeile herunter:

```shell
cd/opt/backenddir \
&& wget https://github.com/yarnpkg/yarn/releases/download/v1.7.0/yarn_1.7.0_all.deb
```

2. Installieren Yarn:

```shell
sudo dpkg -i yarn_1.7.0_all.deb && rm yarn_1.7.0_all.deb
```
### Erstellen Sie eine Weaver-Anwendung

1. Laden Sie die neueste Version von Weaver vom Github-Frontend über Git herunter:

```shell
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/ibax-front.git
```

2. Installieren Sie Weaver-Abhängigkeiten über Yarn:

```shell
cd/opt/backenddir/ibax-front/ \
&& yarn install
```
### Fügen Sie die Konfigurationsdatei für das Blockchain-Netzwerk hinzu

1. Erstellen Sie eine *settings.json*-Datei, die Informationen zur Knotenverbindung enthält:

```shell
cp/opt/backenddir/ibax-front/public/settings.json.dist \
 /opt/backenddir/ibax-front/public/public/settings.json
```
 
2. Bearbeiten Sie die Datei *settings.json* in einem beliebigen Texteditor und fügen Sie die erforderlichen Einstellungen in diesem Format hinzu:

```
http://Node_IP-address:Node_HTTP-Port
```

Beispiele für *settings.json*-Dateien für die drei Knoten:

```json
{
  "fullNodes": [
    "http://192.168.1.1:7079",
    "http://192.168.1.2:7079",
    "http://192.168.1.3:7079"
  ]
}
```
Erstellen Sie die Weaver Desktop-Anwendung

1. Verwenden Sie Garn, um die Desktop-Version zu erstellen:

```shell
cd/opt/backenddir/ibax-front \
&& yarn build-desktop
```

2. Die Desktop-Version wird im AppImage-Suffixformat gepackt:

```shell
yarn release --publish never -l
```

Nach dem Erstellen kann Ihre Anwendung verwendet werden, aber ihre Verbindungskonfiguration kann nicht geändert werden. Wenn diese Einstellungen geändert werden müssen, muss eine neue Version der Anwendung erstellt werden.

### Weaver-Webanwendung erstellen

1. Erstellen Sie eine Webanwendung:

```shell
cd/opt/backenddir/ibax-front/ \
&& yarn build
```
Nach dem Erstellen werden die verteilbaren Dateien im Verzeichnis /build abgelegt. Sie können einen beliebigen Webserver Ihrer Wahl für die Bereitstellung verwenden, und die Datei *settings.json* muss ebenfalls in diesem Verzeichnis abgelegt werden. Beachten Sie, dass bei einer Änderung der Verbindungseinstellungen die Anwendung nicht erneut erstellt werden muss. Bearbeiten Sie stattdessen die Datei *settings.json* und starten Sie den Webserver neu.

1. Für Entwicklungs- oder Testzwecke können Sie den Webserver von Yarn erstellen:

```shell
sudo yarn global add serve \
&& serve -s build
```

Danach ist Ihre Weaver-Webanwendung an folgendem Ort verfügbar: `http://localhost:5000`.

## Konfigurieren Sie das Blockchain-Netzwerk

### Erstellerkonto erstellen

Erstellen Sie ein Konto für den ersten Knoteneigentümer. Dieses Konto ist der Ersteller der neuen Blockchain-Plattform und hat Administratorzugriff.

1.Weaver ausführen;

2.Importieren Sie das vorhandene Konto mit den folgenden Daten:

–Laden Sie die Sicherung des privaten Schlüssels des Knoteneigentümers, der sich in der Datei `/opt/backenddir/node1/PrivateKey` befindet.

> Hinweis
>
>In diesem Verzeichnis befinden sich zwei private Schlüsseldateien. Die Datei `PrivateKey` wird verwendet, um das Konto des Knoteneigentümers zu erstellen. Die `NodePrivateKey`-Datei ist der private Schlüssel des Knotens selbst und muss geheim gehalten werden.

3. Nachdem Sie sich beim Konto angemeldet haben, wählen Sie bitte die Option Ohne Rolle, da zu diesem Zeitpunkt noch keine Rolle erstellt wurde.
### Anwendungen, Rollen und Vorlagen importieren

Zu diesem Zeitpunkt befindet sich die Blockchain-Plattform in einem leeren Zustand. Sie können es konfigurieren, indem Sie Rollen, Vorlagen und Anwendungsframeworks hinzufügen, die grundlegende Ökosystemfunktionen unterstützen.

1. Klonen Sie das Anwendungs-Repository;

```shell
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/dapps.git
```

2. Navigieren Sie zu Entwickler> Importieren in Weaver;

3. Importieren Sie Anwendungen gemäß der folgenden Reihenfolge:

```
 A./opt/backenddir/dapps/system.json 
 B./opt/backenddir/dapps/conditions.json 
 C./opt/backenddir/dapps/basic.json 
 D./opt/backenddir/dapps/lang_res.json
```
4. Navigieren Sie zu Admin > Rolle und klicken Sie auf Standardrolle installieren;

5. Verlassen Sie das System über das Konfigurationsdateimenü in der oberen rechten Ecke;

6.Melden Sie sich als Admin beim System an;

7. Navigieren Sie zu Start > Abstimmung > Vorlagenliste und klicken Sie auf Standardvorlage installieren.

### Den ersten Knoten zur Knotenliste hinzufügen

1. Navigieren Sie zu Entwickler > Plattformparameter und klicken Sie auf den Parameter first_nodes;

2.Geben Sie die Parameter des ersten Blockchain-Netzwerkknotens an.


  * public_key - The public key of the node is located in the `/opt/backenddir/node1/NodePublicKey` file;

```
{"api_address":"http://192.168.1.1:7079","public_key":"%node_public_key%","tcp_address":"192.168.1.1:7078"}
```

## Weitere Ehrenknoten hinzufügen

### Mitglieder zur Consensus-Rollengruppe hinzufügen

Standardmäßig können nur Mitglieder in der Konsensus-Rollengruppe (Consensus) an der Abstimmung teilnehmen, die erforderlich ist, um andere Master-Knoten hinzuzufügen. Das bedeutet, dass vor dem Hinzufügen einer neuen Masternode Mitglieder des Ökosystems der Rolle zugewiesen werden müssen.
In diesem Abschnitt wird das Konto des Erstellers als einziges Mitglied der Konsens-Rollengruppe festgelegt. In einer Produktionsumgebung muss diese Rolle Plattformmitgliedern zugewiesen werden, die Governance durchführen.

1. Navigieren Sie zu Start > Rolle und klicken Sie auf Konsens;

2.Klicken Sie auf Zuweisen, um das Konto des Erstellers der Rolle zuzuweisen.

### Erstellen Sie das Eigentümerkonto für andere Knoten
1. Weber ausführen;

2. Importieren Sie das bestehende Konto mit den folgenden Daten:
      – Laden Sie die Sicherung des privaten Schlüssels des Node-Eigentümers, der sich in der Datei `/opt/backenddir/node2/PrivateKey`
     
3. Nachdem Sie sich beim Konto angemeldet haben, wählen Sie bitte die Option Ohne Rolle, da zu diesem Zeitpunkt noch keine Rolle erstellt wurde.

4. Navigieren Sie zu Startseite > Persönliche Informationen und klicken Sie auf den Titel der persönlichen Informationen;

5. Fügen Sie Kontodetails hinzu (persönliche Informationen, Titel, Beschreibung usw.).
1. Operationen des neuen Knoteneigentümers:
     1. Navigieren Sie zu Start > Prüfer;
     2. Klicken Sie auf Anfrage erstellen und füllen Sie das Antragsformular des Prüferkandidaten aus;
     3. Klicken Sie auf Anfrage senden.
2. Operationen des Erstellers:
     1. Melden Sie sich mit einer Konsensrolle an (Consensus);
     2. Navigieren Sie zu Start > Prüfer;
     3. Klicken Sie auf das Symbol „Spielen“, um die Abstimmung gemäß der Anfrage des Kandidaten zu starten;
     4. Navigieren Sie zu Startseite > Abstimmen und klicken Sie auf Abstimmungsstatus aktualisieren;
     5. Klicken Sie auf den Abstimmungsnamen und stimmen Sie für den Knoteneigentümer ab.

Als Ergebnis wird dem Konto des Eigentümers des neuen Knotens die Validator-Rolle zugewiesen, und der neue Knoten wird der Liste der Master-Knoten hinzugefügt.
