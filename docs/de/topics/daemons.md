# Dämon

In diesem Abschnitt beschreiben wir aus technischer Sicht, wie IBax-Knoten miteinander interagieren.

## Über den Server-Daemon
Der Server-Daemon muss auf jedem Netzwerkknoten laufen, der verschiedene Serverfunktionen ausführt und das Blockchain-Protokoll von IBax unterstützt. Im Blockchain-Netzwerk verteilt der Daemon Blöcke und Transaktionen, generiert neue Blöcke und verifiziert empfangene Blöcke und Transaktionen und kann das Fork-Problem vermeiden.
### Honor-Knoten-Daemon
Ein Ehrenknoten führt die folgenden Server-Daemons aus:
* [BlockGenerator-Daemon](#blockgenerator-Daemon)

     Generieren neuer Blöcke.

* [BlockCollection-Daemon](#blockcollection-Daemon)

     Herunterladen neuer Blöcke von anderen Knoten.

* [Bestätigungs-Daemon](#confirmations-Daemon)

     Bestätigen, dass Blöcke auf dem Knoten auch auf den meisten anderen Knoten vorhanden sind.

* [Disseminator-Daemon](#disseminator-Daemon)

     Verteilen von Transaktionen und Blöcken an andere Ehrenknoten.
     
* QueueParserBlocks-Daemon

     Blöcke in der Warteschlange, die Blöcke von anderen Knoten enthält.

     Die Blockverarbeitungslogik ist die gleiche wie bei [BlockCollection-Daemon](#blockcollection-daemon).

* QueueParserTx-Daemon

     Überprüfung der Transaktionen in der Warteschlange.

* Scheduler-Daemon

     Laufende Verträge wie geplant.

### Guardian-Knoten-Daemon

Ein Wächterknoten führt die folgenden Server-Daemons aus:

* [BlockCollection-Daemon](#blockcollection-Daemon)
* [Bestätigungs-Daemon](#confirmations-Daemon)
* [Disseminator-Daemon](#disseminator-Daemon)
* QueueParserTx
* Planer

## BlockCollection-Daemon

Dieser Daemon lädt Blöcke herunter und synchronisiert die Blockchain mit anderen Netzwerkknoten.

### Blockchain-Synchronisation

Dieser Daemon synchronisiert die Blockchain, indem er die maximale Blockhöhe im Blockchain-Netzwerk bestimmt, neue Blöcke anfordert und das Fork-Problem in der Blockchain löst.

#### Nach Blockchain-Updates suchen

Dieser Daemon sendet Anforderungen von der aktuellen Block-ID an alle Ehrenknoten.

Wenn die aktuelle Block-ID des Knotens, auf dem der Daemon läuft, kleiner ist als die aktuelle Block-ID eines beliebigen Ehrenknotens, gilt der Blockchain-Netzwerkknoten als veraltet.

#### Neue Blöcke herunterladen

Der Knoten, der die größte aktuelle Blockhöhe zurückgibt, wird als letzter Knoten betrachtet.
Der Daemon lädt alle unbekannten Blöcke herunter.

#### Lösung des Fork-Problems

Wenn ein Fork in der Blockchain erkannt wird, verschiebt der Daemon den Fork rückwärts, indem er alle Blöcke in einen gemeinsamen übergeordneten Block herunterlädt.
Wenn der gemeinsame übergeordnete Block gefunden wird, wird ein Blockchain-Rollback auf dem Knoten durchgeführt, auf dem der Daemon ausgeführt wird, und der richtige Block wird zur Blockchain hinzugefügt, bis der neueste enthalten ist.

### Tabellen

Der BlocksCollection-Daemon verwendet die folgenden Tabellen:

* block_chain
* Transaktionen
* Transaktionsstatus
* info_block
### Anfrage

Der BlockCollection-Daemon sendet die folgenden Anforderungen an andere Daemons:

* [Type 10](#type-10) zeigt auf die größte Block-ID unter allen Ehrenknoten.
* [Type 7](#type-7) zeigt auf die Daten mit der größten Block-ID.

## BlockGenerator-Dämon

Der BlockGenerator-Daemon generiert neue Blöcke.

### Vorabüberprüfung

Der BlockGenerator-Daemon analysiert die neuesten Blöcke in der Blockchain, um neue Blockgenerierungspläne zu erstellen.

Wenn die folgenden Bedingungen erfüllt sind, kann ein neuer Block generiert werden:

* Der Knoten, der den letzten Block generiert hat, befindet sich in einem Knoten innerhalb der Ehrenknotenliste und führt den Daemon aus.
* Die kürzeste Zeit, seit der letzte nicht verifizierte Block generiert wurde.

### Blockgenerierung
Ein vom Daemon generierter neuer Block enthält alle neuen Transaktionen, die vom [Disseminator-Daemon](#disseminator-daemon) anderer Knoten empfangen oder von dem Knoten generiert werden können, der den Daemon ausführt. Der generierte Block wird in der Node-Datenbank gespeichert.
### Tabellen

Der BlockGenerator-Daemon verwendet die folgenden Tabellen:

* block_chain (speichert neue Blöcke)
* Transaktionen
* Transaktionsstatus
* info_block

### Anfrage

Der BlockGenerator-Daemon stellt keine Anfrage an andere Daemons.

## Disseminator-Daemon

Der Disseminator-Daemon sendet Transaktionen und Blöcke an alle Ehrenknoten.

### Guardian-Knoten

Bei der Arbeit an einem Wächterknoten sendet der Daemon von seinem Knoten generierte Transaktionen an alle Ehrenknoten.
### Ehrenknoten

Bei der Arbeit an einem Ehrenknoten sendet der Daemon generierte Blöcke und Transaktions-Hashes an alle Ehrenknoten.

Dann antwortet der Ehrenknoten auf Transaktionsanfragen, die ihm unbekannt sind. Als Antwort sendet der Daemon die vollständigen Transaktionsdaten.

### Tabellen

Der Disseminator-Daemon verwendet die folgenden Tabellen:

* Transaktionen

### Anfrage

Der Disseminator-Daemon sendet die folgenden Anforderungen an andere Daemons:

* [Type 1](#type-1) Senden Sie Transaktionen und Block-Hashes an den Ehrenknoten.
* [Type 2](#type-2) Transaktionsdaten vom Ehrenknoten empfangen.

## Bestätigungs-Daemon

Der Confirmations-Daemon prüft, ob alle Blöcke in seinem Knoten auf den meisten anderen Knoten vorhanden sind.

### Bestätigung blockieren

Ein von mehreren Knoten im Netzwerk bestätigter Block wird als bestätigter Block betrachtet.

Der Daemon bestätigt nacheinander alle Blöcke, beginnend mit dem ersten, der derzeit nicht in der Datenbank bestätigt ist.

Jeder Block wird wie folgt bestätigt:

* Senden einer Anfrage, die die ID des zu bestätigenden Blocks enthält, an alle Ehrenknoten.
* Alle Ehrenknoten reagieren auf den Block-Hash.
* Wenn der geantwortete Hash mit dem Hash des Blocks auf dem Daemon-Knoten übereinstimmt, wird der Wert des Bestätigungszählers erhöht. Falls nicht, wird der Löschzählerwert erhöht.
### Tabellen

Der Confirmations-Daemon verwendet die folgenden Tabellen:

* Bestätigung
* info_block

### Anfrage

Der Confirmations-Daemon sendet die folgenden Anfragen an andere Daemons:

* [Type 4](#type-4) Fordert Block-Hashes vom Honor-Knoten an.

## TCP-Dienstprotokoll

Das TCP-Dienstprotokoll arbeitet auf Ehrenknoten und Wächterknoten, die das Binärprotokoll auf TCP für Anfragen von den Daemons BlocksCollection, Disseminator und Confirmation verwenden.

## Anfragetyp

Jede Anfrage hat einen Typ, der durch die ersten zwei Bytes der Anfrage definiert ist.

## Typ 1
#### Absender anfordern

Diese Anfrage wird vom [Disseminator-Daemon] (#disseminator-daemon) gesendet.

#### Daten anfordern

Hashes der Transaktion und des Blocks.

#### Bearbeitung der Anfrage

Der Block-Hash wird der Block-Warteschlange hinzugefügt.

Analysiert und verifiziert die Transaktions-Hashes und wählt Transaktionen aus, die noch nicht auf dem Knoten erschienen sind.

#### Antwort

Nein. Nach der Verarbeitung der Anfrage wird eine [Typ 2](#type-2)-Anfrage ausgegeben.

## Typ 2

#### Absender anfordern

Diese Anfrage wird vom [Disseminator-Daemon] (#disseminator-daemon) gesendet.

#### Daten anfordern

Die Transaktionsdaten, einschließlich der Datengröße:

* data_size (4 Bytes)

* Größe der Transaktionsdaten in Byte.

* Daten (data_size bytes)

Die Transaktionsdaten.

#### Bearbeitung der Anfrage

Verifiziert die Transaktion und fügt sie der Transaktionswarteschlange hinzu.

#### Antwort

Nein.

## Typ 4

#### Absender anfordern

Diese Anfrage wird vom [Bestätigungs-Daemon] (#confirmations-Daemon) gesendet.

#### Daten anfordern

Block-ID.

#### Antwort

Hash blockieren.

Gibt `0` zurück, wenn kein Block mit dieser ID vorhanden ist.

## Geben Sie 7 ein

#### Absender anfordern

Diese Anfrage wird vom [BlockCollection-Daemon] (#blockcollection-Daemon) gesendet.

#### Daten anfordern
Block-ID.

* block_id (4 Bytes)

#### Antwort

Die Blockdaten, einschließlich der Datengröße.

* data_size (4 Bytes)

* Größe der Blockdaten in Bytes.

* Daten (data_size bytes)

Die Blockdaten.

Die Verbindung wird geschlossen, wenn kein Block mit dieser ID vorhanden ist.

## Geben Sie 10 ein

#### Absender anfordern
Diese Anfrage wird vom [BlockCollection-Daemon] (#blockcollection-Daemon) gesendet.

#### Daten anfordern

Nein.

#### Antwort

Block-ID.

* block_id (4 Bytes)