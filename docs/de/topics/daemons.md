# Dämon {#daemon}

In diesem Abschnitt beschreiben wir aus technischer Sicht, wie IBax-Knoten miteinander interagieren.

## Über den Server-Daemon {#about-the-server-daemon}
Der Server-Daemon muss auf jedem Netzwerkknoten laufen, der verschiedene Serverfunktionen ausführt und das Blockchain-Protokoll von IBax unterstützt. Im Blockchain-Netzwerk verteilt der Daemon Blöcke und Transaktionen, generiert neue Blöcke und verifiziert empfangene Blöcke und Transaktionen und kann das Fork-Problem vermeiden.
### Honor-Knoten-Daemon {#honor-node-daemon}
Ein Ehrenknoten führt die folgenden Server-Daemons aus:
* [BlockGenerator-Daemon](#blockgenerator-daemon)

     Generieren neuer Blöcke.

* [BlockCollection-Daemon](#blockcollection-daemon)

     Herunterladen neuer Blöcke von anderen Knoten.

* [Bestätigungs-Daemon](#confirmations-daemon)

     Bestätigen, dass Blöcke auf dem Knoten auch auf den meisten anderen Knoten vorhanden sind.

* [Disseminator-Daemon](#disseminator-daemon)

     Verteilen von Transaktionen und Blöcken an andere Ehrenknoten.
     
* QueueParserBlocks-Daemon

     Blöcke in der Warteschlange, die Blöcke von anderen Knoten enthält.

     Die Blockverarbeitungslogik ist die gleiche wie bei [BlockCollection-Daemon](#blockcollection-daemon).

* QueueParserTx-Daemon

     Überprüfung der Transaktionen in der Warteschlange.

* Scheduler-Daemon

     Laufende Verträge wie geplant.

### Guardian-Knoten-Daemon {#guardian-node-daemon}

Ein Wächterknoten führt die folgenden Server-Daemons aus:

* [BlockCollection-Daemon](#blockcollection-daemon)
* [Bestätigungs-Daemon](#confirmations-daemon)
* [Disseminator-Daemon](#disseminator-daemon)
* QueueParserTx
* Planer

## BlockCollection-Daemon {#blockcollection-daemon}

Dieser Daemon lädt Blöcke herunter und synchronisiert die Blockchain mit anderen Netzwerkknoten.

### Blockchain-Synchronisation {#blockchain-synchronization}

Dieser Daemon synchronisiert die Blockchain, indem er die maximale Blockhöhe im Blockchain-Netzwerk bestimmt, neue Blöcke anfordert und das Fork-Problem in der Blockchain löst.

#### Nach Blockchain-Updates suchen {#check-for-blockchain-updates}

Dieser Daemon sendet Anforderungen von der aktuellen Block-ID an alle Ehrenknoten.

Wenn die aktuelle Block-ID des Knotens, auf dem der Daemon läuft, kleiner ist als die aktuelle Block-ID eines beliebigen Ehrenknotens, gilt der Blockchain-Netzwerkknoten als veraltet.

#### Neue Blöcke herunterladen {#download-new-blocks}

Der Knoten, der die größte aktuelle Blockhöhe zurückgibt, wird als letzter Knoten betrachtet.
Der Daemon lädt alle unbekannten Blöcke herunter.

#### Lösung des Fork-Problems {#solving-the-fork-issue}

Wenn ein Fork in der Blockchain erkannt wird, verschiebt der Daemon den Fork rückwärts, indem er alle Blöcke in einen gemeinsamen übergeordneten Block herunterlädt.
Wenn der gemeinsame übergeordnete Block gefunden wird, wird ein Blockchain-Rollback auf dem Knoten durchgeführt, auf dem der Daemon ausgeführt wird, und der richtige Block wird zur Blockchain hinzugefügt, bis der neueste enthalten ist.

### Tabellen {#tables-1}

Der BlocksCollection-Daemon verwendet die folgenden Tabellen:

* block_chain
* Transaktionen
* Transaktionsstatus
* info_block
### Anfrage {#request-1}

Der BlockCollection-Daemon sendet die folgenden Anforderungen an andere Daemons:

* [Type 10](#type-10) zeigt auf die größte Block-ID unter allen Ehrenknoten.
* [Type 7](#type-7) zeigt auf die Daten mit der größten Block-ID.

## BlockGenerator-Dämon {#blockgenerator-daemon}

Der BlockGenerator-Daemon generiert neue Blöcke.

### Vorabüberprüfung {#pre-verification}

Der BlockGenerator-Daemon analysiert die neuesten Blöcke in der Blockchain, um neue Blockgenerierungspläne zu erstellen.

Wenn die folgenden Bedingungen erfüllt sind, kann ein neuer Block generiert werden:

* Der Knoten, der den letzten Block generiert hat, befindet sich in einem Knoten innerhalb der Ehrenknotenliste und führt den Daemon aus.
* Die kürzeste Zeit, seit der letzte nicht verifizierte Block generiert wurde.

### Blockgenerierung {#block-generation}
Ein vom Daemon generierter neuer Block enthält alle neuen Transaktionen, die vom [Disseminator-Daemon](#disseminator-daemon) anderer Knoten empfangen oder von dem Knoten generiert werden können, der den Daemon ausführt. Der generierte Block wird in der Node-Datenbank gespeichert.
### Tabellen {#tables-2}

Der BlockGenerator-Daemon verwendet die folgenden Tabellen:

* block_chain (speichert neue Blöcke)
* Transaktionen
* Transaktionsstatus
* info_block

### Anfrage {#request-2}

Der BlockGenerator-Daemon stellt keine Anfrage an andere Daemons.

## Disseminator-Daemon {#disseminator-daemon}

Der Disseminator-Daemon sendet Transaktionen und Blöcke an alle Ehrenknoten.

### Guardian-Knoten {#guardian-node}

Bei der Arbeit an einem Wächterknoten sendet der Daemon von seinem Knoten generierte Transaktionen an alle Ehrenknoten.
### Ehrenknoten {#honor-node}

Bei der Arbeit an einem Ehrenknoten sendet der Daemon generierte Blöcke und Transaktions-Hashes an alle Ehrenknoten.

Dann antwortet der Ehrenknoten auf Transaktionsanfragen, die ihm unbekannt sind. Als Antwort sendet der Daemon die vollständigen Transaktionsdaten.

### Tabellen {#tables-3}

Der Disseminator-Daemon verwendet die folgenden Tabellen:

* Transaktionen

### Anfrage {#request-3}

Der Disseminator-Daemon sendet die folgenden Anforderungen an andere Daemons:

* [Type 1](#type-1) Senden Sie Transaktionen und Block-Hashes an den Ehrenknoten.
* [Type 2](#type-2) Transaktionsdaten vom Ehrenknoten empfangen.

## Bestätigungs-Daemon {#confirmations-daemon}

Der Confirmations-Daemon prüft, ob alle Blöcke in seinem Knoten auf den meisten anderen Knoten vorhanden sind.

### Bestätigung blockieren {#block-confirmation}

Ein von mehreren Knoten im Netzwerk bestätigter Block wird als bestätigter Block betrachtet.

Der Daemon bestätigt nacheinander alle Blöcke, beginnend mit dem ersten, der derzeit nicht in der Datenbank bestätigt ist.

Jeder Block wird wie folgt bestätigt:

* Senden einer Anfrage, die die ID des zu bestätigenden Blocks enthält, an alle Ehrenknoten.
* Alle Ehrenknoten reagieren auf den Block-Hash.
* Wenn der geantwortete Hash mit dem Hash des Blocks auf dem Daemon-Knoten übereinstimmt, wird der Wert des Bestätigungszählers erhöht. Falls nicht, wird der Löschzählerwert erhöht.
### Tabellen {#tables-4}

Der Confirmations-Daemon verwendet die folgenden Tabellen:

* Bestätigung
* info_block

### Anfrage {#request-4}

Der Confirmations-Daemon sendet die folgenden Anfragen an andere Daemons:

* [Type 4](#type-4) Fordert Block-Hashes vom Honor-Knoten an.

## TCP-Dienstprotokoll {#tcp-service-protocol}

Das TCP-Dienstprotokoll arbeitet auf Ehrenknoten und Wächterknoten, die das Binärprotokoll auf TCP für Anfragen von den Daemons BlocksCollection, Disseminator und Confirmation verwenden.

## Anfragetyp {#request-type}

Jede Anfrage hat einen Typ, der durch die ersten zwei Bytes der Anfrage definiert ist.

## Typ 1 {#type-1}
#### Absender anfordern {#request-sender-1}

Diese Anfrage wird vom [Disseminator-Daemon] (#disseminator-daemon) gesendet.

#### Daten anfordern {#request-data-1}

Hashes der Transaktion und des Blocks.

#### Bearbeitung der Anfrage {#request-processing-1}

Der Block-Hash wird der Block-Warteschlange hinzugefügt.

Analysiert und verifiziert die Transaktions-Hashes und wählt Transaktionen aus, die noch nicht auf dem Knoten erschienen sind.

#### Antwort {#response-1}

Nein. Nach der Verarbeitung der Anfrage wird eine [Typ 2](#type-2)-Anfrage ausgegeben.

## Typ 2 {#type-2}

#### Absender anfordern {#request-sender-2}

Diese Anfrage wird vom [Disseminator-Daemon] (#disseminator-daemon) gesendet.

#### Daten anfordern {#request-data-2}

Die Transaktionsdaten, einschließlich der Datengröße:

* data_size (4 Bytes)

* Größe der Transaktionsdaten in Byte.

* Daten (data_size bytes)

Die Transaktionsdaten.

#### Bearbeitung der Anfrage {#request-processing-2}

Verifiziert die Transaktion und fügt sie der Transaktionswarteschlange hinzu.

#### Antwort {#response-2}

Nein.

## Typ 4 {#type-4}

#### Absender anfordern {#request-sender-3}

Diese Anfrage wird vom [Bestätigungs-Daemon] (#confirmations-daemon) gesendet.

#### Daten anfordern {#request-data-3}

Block-ID.

#### Antwort {#response-3}

Hash blockieren.

Gibt `0` zurück, wenn kein Block mit dieser ID vorhanden ist.

## Geben Sie 7 ein {#type-7}

#### Absender anfordern {#request-sender-4}

Diese Anfrage wird vom [BlockCollection-Daemon] (#blockcollection-daemon) gesendet.

#### Daten anfordern {#request-data-4}
Block-ID.

* block_id (4 Bytes)

#### Antwort {#response-4}

Die Blockdaten, einschließlich der Datengröße.

* data_size (4 Bytes)

* Größe der Blockdaten in Bytes.

* Daten (data_size bytes)

Die Blockdaten.

Die Verbindung wird geschlossen, wenn kein Block mit dieser ID vorhanden ist.

## Geben Sie 10 ein {#type-10}

#### Absender anfordern {#request-sender-5}
Diese Anfrage wird vom [BlockCollection-Daemon] (#blockcollection-daemon) gesendet.

#### Daten anfordern {#request-data-5}

Nein.

#### Antwort {#response-5}

Block-ID.

* block_id (4 Bytes)