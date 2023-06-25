# Synchronisiertes Überwachungstool {#synchronized-monitoring-tool}

Desync_monitor ist ein spezielles Tool, mit dem überprüft werden kann, ob die Datenbank auf dem angegebenen Knoten synchronisiert wurde.

Das Tool kann als Daemon verwendet oder für eine einmalige Überprüfung gestartet werden.

Das Funktionsprinzip des Tools basiert auf Folgendem:

1.Jeder Block enthält den Hash aller Änderungen aller Transaktionen, fordern Sie den angegebenen Knoten auf, seine letzte Block-ID bereitzustellen;
2. Fordern Sie dann einen Block mit dieser ID von allen Knoten an und vergleichen Sie die obigen Hashes;
3.Wenn die Hashes unterschiedlich sind, wird eine Synchronisierungsfehlermeldung an die im Befehl angegebene E-Mail-Adresse gesendet.

## Standort {#location}

Das Tool befindet sich im Verzeichnis `tools/desync_monitor/`.
 
# Befehlszeilen-Flags {#command-prompt-flags}
Die folgenden Flags können von der Eingabeaufforderung aus verwendet werden:
* confPath - Pfad der Konfigurationsdatei. Der Standarddateiname ist `config.toml`;
* nodesList - Knotenliste des angeforderten Blocks, getrennt durch Kommas. Der Standardwert ist `127.0.0.1:7079`;
* daemonMode - Wird als Daemon gestartet und sollte verwendet werden, wenn alle N Sekunden eine Authentifizierung erforderlich ist. Dieses Flag ist standardmäßig auf `false` gesetzt;
* queryingPeriod - Wenn das Tool als Daemon gestartet wird, legt dieser Parameter das Zeitintervall (in Sekunden) zwischen den Prüfungen fest, standardmäßig "`1` Sekunde.
* alertMessageTo – Die E-Mail-Adresse, an die Synchronisierungswarnfehler gesendet werden.
    * alertMessageSubj - Betreff der Nachricht in der Warnmeldung, standardmäßig das Problem der `node synchronization`;
    * alertMessageFrom - Adresse, an die die Nachricht gesendet wurde.
    * smtpHost - SMTP-Server-Host, der zum Senden von E-Mails verwendet wird, standardmäßig `""`;
    * smtpPort - SMTP-Serverport, der zum Senden von E-Mail-Nachrichten verwendet wird, standardmäßig `25`;
    * smtpUsername - Benutzername des SMTP-Servers, standardmäßig `""`;
    * smtpPassword - SMTP-Serverpasswort, standardmäßig `""`.    

## Aufbau {#configuration}
Das Tool verwendet eine Konfigurationsdatei im toml-Format.

Standardmäßig sucht es nach der Datei config.toml in dem Ordner, in dem die Binärdatei gestartet werden soll.

Der Dateipfad kann mit dem Flag configPath geändert werden.

```
nodes_list = ["http://127.0.0.1:7079", "http://127.0.0.1:7002"]

[daemon]
daemon = false
querying_period = 1

[alert_message]
to = ""
subject = "problem with xxx nodes"
from = ""

[smtp]
host = ""
port = 25
username = ""
password = ""
```
### nodes_list {#nodes-list}
* nodes_list - Liste der Knoten (Hosts), die Informationen anfordern.

### [daemon] {#daemon}
Konfiguration des Daemon-Modus.
* daemon_mode – Ein Tool arbeitet als Daemon und führt Synchronisationsprüfungen durch.
* querying_period - Zeitintervall zwischen Synchronisationsprüfungen.

### [alert_message] {#alert-message}
Warnmeldungsparameter.
* an - E-Mail-Adresse des Empfängers von Synchronisierungsfehler-Warnmeldungen;
* Betreff - Betreff der Nachricht;
* von - E-Mail des Absenders.

### [smtp] {#smtp}
SMTP-Serverparameter (Simple Mail Transfer Protocol), die zum Senden von Synchronisierungsfehlermeldungen verwendet werden.
* Host – SMTP-Serverschlauch;
* port – SMTP-Server-Port;
* Benutzername – Benutzername des SMTP-Servers;
* Passwort – Passwort des SMTP-Servers;
