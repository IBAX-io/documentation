# Serverkonfigurationsdatei

In diesem Abschnitt stellen wir Parameter in der Serverkonfigurationsdatei vor.
## Einführung in die Serverkonfigurationsdatei

Die Serverkonfigurationsdatei definiert die Knotenkonfiguration von IBAX.
## Standort

Diese Datei befindet sich im Arbeitsverzeichnis des Servers und heißt `config.toml`.
## Abschnitte

Die Konfigurationsdatei besteht aus den folgenden Abschnitten:

> Allgemeiner Teil

Es definiert das Arbeitsverzeichnis DataDir, das erste Blockverzeichnis FirstBlockPath und andere Parameter.

> [TCP-Server]

Es definiert die TCP-Dienstparameter.

TCPServer wird für die Netzwerkinteraktion zwischen Knoten verwendet.
> [HTTP]

Es definiert die HTTP-Dienstparameter.

HTTPServer bietet RESTful-APIs.

> [DB]

Es definiert Parameter der PostgreSQL-Knotendatenbank.

> [StatistikD]

Es definiert Parameter des Kollektors StatsD für die Knotenbetriebsanzeige.

> [Zentrifuge]

Es definiert Parameter des Benachrichtigungsdienstes Centrifugo.

> [Protokoll]

Es definiert Parameter des Protokolldienstes Log.

> [TokenBewegung]

Es definiert Parameter des Token-Zirkulationsdienstes TokenMovement.

## Eine Beispielkonfigurationsdatei

```
PidFilePath = "/IBAX-data/go-ibax.pid"
LockFilePath = "/IBAX-data/go-ibax.lock"
DataDir = "/IBAX-data"
KeysDir = "/IBAX-data"
TempDir = "/var/folders/_l/9md_m4ms1651mf5pbng1y1xh0000gn/T/IBAX-temp"
FirstBlockPath = "/IBAX-data/1block"
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
  Name = "IBAX"
  Host = "127.0.0.1"
  Port = 5432
  User = "postgres"
  Password = "123456"
  LockTimeout = 5000

[StatsD]
  Host = "127.0.0.1"
  Port = 8125
  Name = "IBAX"

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
