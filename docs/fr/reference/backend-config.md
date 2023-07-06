# Fichier de configuration du serveur {#server-configuration-file}

Dans cette section, nous allons introduire les paramètres dans le fichier de configuration du serveur.

## Introduction au fichier de configuration du serveur {#introduction-to-the-server-configuration-file}

Le fichier de configuration du serveur définit la configuration du nœud d'IBAX.

## Emplacement {#location}

Ce fichier se trouve dans le répertoire de travail du serveur et porte le nom `config.toml`.

## Sections {#sections}

Le fichier de configuration comprend les sections suivantes :

> Section générale

Il définit le répertoire de travail DataDir, le répertoire du premier bloc FirstBlockPath et d'autres paramètres.

> [TCPServer]

Il définit les paramètres du service TCP.

TCPServer est utilisé pour l'interaction réseau entre les nœuds.

> [HTTP]

Il définit les paramètres du service HTTP.

HTTPServer fournit des API RESTful.

> [DB]

Il définit les paramètres de la base de données du nœud PostgreSQL.

> [StatsD]

Il définit les paramètres du collecteur d'indicateurs d'opération du nœud StatsD.

> [Centrifugo]

Il définit les paramètres du service de notification Centrifugo.

> [Log]

Il définit les paramètres du service de journalisation Log.

> [TokenMovement]

Il définit les paramètres du service de circulation des jetons TokenMovement.

## Un fichier de configuration exemple {#an-example-configuration-file}

``` js
PidFilePath = "/ibax-data/go-ibax.pid"
LockFilePath = "/ibax-data/go-ibax.lock"
DataDir = "/ibax-data"
KeysDir = "/ibax-data"
TempDir = "/var/folders/_l/9md_m4ms1651mf5pbng1y1xh0000gn/T/ibax-temp"
FirstBlockPath = "/ibax-data/1block"
TLS = false
TLSCert = ""
TLSKey = ""
OBSMode = "none"
HTTPServerMaxBodySize = 1048576
MaxPageGenerationTime = 3000
NodesAddr = []

[TCPServer]
  Host = "127.0.0.1"
  Port = 7078

[HTTP]
  Host = "127.0.0.1"
  Port = 7079

[DB]
  Name = "ibax"
  Host = "127.0.0.1"
  Port = 5432
  User = "postgres"
  Password = "123456"
  LockTimeout = 5000

[StatsD]
  Host = "127.0.0.1"
  Port = 8125
  Name = "ibax"

[Centrifugo]
  Secret = "127.0.0.1"
  URL = "127.0.0.1"

[Log]
  LogTo = "stdout"
  LogLevel = "ERROR"
  LogFormat = "text"
  [Log.Syslog]
  Facility = "kern"
  Tag = "go-ibax"

[TokenMovement]
  Host = ""
  Port = 0
  Username = ""
  Password = ""
  To = ""
  From = ""
  Subject = ""
```
