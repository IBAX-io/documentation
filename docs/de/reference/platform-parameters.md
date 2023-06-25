# Plattformparameter {#platform-parameters}
Dies sind Parameter zur Konfiguration von IBAX. Sie gelten für das Blockchain-Netzwerk und alle darin enthaltenen Ökosysteme.

## Ort zum Speichern von Plattformparametern {#location-to-store-platform-parameters}
Plattformparameter werden in der Tabelle `system parameters` gespeichert.

Diese Tabelle befindet sich im ersten (Standard-)Ökosystem, das im Blockchain-Netzwerk erstellt wurde.

## Änderung der Plattformparameter {#change-of-platform-parameters}
Eine Änderung der Plattformparameter kann nur durch Abstimmung erfolgen. Sie können den UpdateSysParam-Vertrag nur verwenden, um Plattformparameter zu ändern, die durch Definitionen im Rechtssystem der Plattform verwaltet werden.

## Plattformparameter konfigurieren {#configure-platform-parameters}
### Konfigurieren Sie das Blockchain-Netzwerk {#configure-the-blockchain-network}

Knoten:
* [Volle Knoten](#volle-knoten)
* [Anzahl der Knoten](#anzahl-der-knoten)

Knotenverbote:
* [falsche Blöcke pro Tag](#falsche-Blöcke-pro-Tag)
* [node ban time](#node-ban-time)
* [node ban time local](#node-ban-time-local)

### Konfigurieren Sie ein neues Ökosystem {#configure-a-new-ecosystem}
Standardseite und Menü:
* [Standard-Ökosystemseite](#default-ecosystem-page)
* [Standard-Ökosystem-Menü](#default-ecosystem-menu)

Standardvertrag:
* [Standard-Ökosystemvertrag](#default-ecosystem-contract)

### Konfigurieren Sie die Datenbank {#configure-the-database}

Tischlimits:
* [Max Spalte](#max-spalte)
* [Max Indizes](#max-indizes)
### Generierung von Blöcken konfigurieren {#configure-the-generation-of-blocks}
Zeitbegrenzungen:
* [Lücke zwischen Blöcken](#Lücke-zwischen-Blöcken)
* [max. Blockgenerierungszeit](#max-block-generation-time)

Transaktionslimits:
* [max. Sendeblock](#max-tx-Block)
* [max. Sendeblock pro Benutzer](#max-tx-block-per-user)

Größenbeschränkungen:
* [maximale Sendegröße](#max-tx-Größe)
* [maximale Blockgröße](#max-Blockgröße)
* [maximale Zeichengröße](#max-forsign-size)

Kraftstoffgrenzen:
* [max. Kraftstoffblock](#max.-Kraftstoffblock)
* [max. Kraftstoffverbrauch](#max-fuel-tx)

Rollback-Limits blockieren:
* [Rollback-Blöcke](#Rollback-Blöcke)

### Konfigurieren Sie die Tankmarken {#configure-the-fuel-tokens}
Prämien und Provisionen:
* [Block-Belohnung](#Block-Belohnung)
* [Provisionsgeldbörse](#provisionsgeldbörse)
* [Provisionsgröße](#provisionsgröße)

Kraftstoffratenumrechnung:
* [Kraftstoffrate](#Kraftstoffrate)
* [Preiserstellungsrate](#Preiserstellungsrate)

Transaktionsgröße und Datenpreis:
* [Preis-TX-Daten](#Preis-TX-Daten)
* [Preis tx Größe Geldbörse](#price-tx-size-wallet)

Price for new elements:
* [Preis schaffen Ökosystem](#preis-schaffen-ökosystem)
* [Preis Tabelle erstellen](#preis-tabelle-erstellen)
* [Preiserstellungsspalte](#Preiserstellungsspalte)
* [Preiserstellungsvertrag](#Preiserstellungsvertrag)
* [Preiserstellungsmenü](#price-create-menu)
* [Preiserstellungsseite](#Preiserstellungsseite)
* [Preiserstellungsanwendung](#Preiserstellungsanwendung)
Price for operations:
<!-- TOC -->
- [Plattformparameter](#platform-parameters)
   - [Speicherort für Plattformparameter](#location-to-store-platform-parameters)
   - [Änderung der Plattformparameter](#change-of-platform-parameters)
   - [Plattformparameter konfigurieren](#configure-platform-parameters)
     - [Blockchain-Netzwerk konfigurieren](#configure-the-blockchain-network)
     - [Neues Ökosystem konfigurieren](#configure-a-new-ecosystem)
     - [Datenbank konfigurieren](#configure-the-database)
     - [Generierung von Blöcken konfigurieren](#configure-the-generation-of-blocks)
     - [Treibstoffmarken konfigurieren](#configure-the-fuel-tokens)
     - [Abgeschrieben](#depreciated)
  - [Details der Plattformparameter](#details-of-platform-parameters)
     - [Blockbelohnung](#block-reward)
     - [Blockchain-URL](#blockchain-url)
     - [Provisionsgröße](#commission-size)
     - [Provisionsgeldbörse](#commission-wallet)
     - [Standard-Ökosystemvertrag](#default-ecosystem-contract)
     - [Standard-Ökosystem-Menü](#default-ecosystem-menu)
     - [Standard-Ökosystemseite](#default-ecosystem-page)
     - [Kraftstoffrate](#fuel-rate)
     - [Preiserstellungsrate](#price-create-rate)
     - [Vollständige Knoten](#full-nodes)
     - [Lücke zwischen Blöcken](#gap-between-blocks)
     - [Falsche Blöcke pro Tag](#incorrect-blocks-per-day)
     - [Max. Blockgenerierungszeit](#max-block-generation-time)
     - [Maximale Blockgröße](#max-block-size)
     - [Max Spalten](#max-columns)
     - [maximale Zeichengröße](#max-forsign-size)
     - [max. Kraftstoffblock](#max-fuel-block)
     - [max. Kraftstoffverbrauch](#max-fuel-tx)
     - [maximale Indizes](#max-indexes)
     - [max. Sendeblock](#max-tx-block)
     - [max. Sendeblock pro Benutzer](#max-tx-block-per-user)
     - [maximale Sendegröße](#max-tx-size)
     - [node ban time](#node-ban-time)
     - [node ban time local](#node-ban-time-local)
     - [Anzahl der Knoten](#number-of-nodes)
     - [Preis-Ökosystem erstellen](#price-create-ecosystem)
     - [Preiserstellungsantrag](#price-create-application)
     - [Preistabelle erstellen](#price-create-table)
     - [Preiserstellungsspalte](#price-create-column)
     - [Preiserstellungsvertrag](#price-create-menu)
     - [Preiserstellungsmenü](#price-create-page)
     - [Preiserstellungsseite](#Preiserstellungsseite)
     - [Preis-Exec-Adresse zu ID](#price-exec-address-to-id)
     - [Preis-Exec-Bind-Wallet] (#price-exec-bind-wallet)
     - [Preisausführungsspaltenbedingung](#price-exec-column-condition)
     - [Preis-Exec-Vertrag kompilieren](#price-exec-compile-contract)
     - [Preisexec enthält](#price-exec-contains)
     - [Preisausführungsvertrag nach ID](#price-exec-contract-by-id)
     - [Preisausführungsvertrag nach Name](#price-exec-contract-by-name)
     - [Liste der Price-Exec-Verträge](#price-exec-contracts-list)
     - [Preis-Exec-Spalte erstellen](#price-exec-create-column)
     - [Price Exec Ecosystem erstellen](#price-exec-create-ecosystem)
     - [Preis-Exec-Tabelle erstellen](#price-exec-create-table)
     - [Preis-Exec-Ecosys-Param](#price-exec-ecosys-param)
     - [Preis-Auswertung](#price-exec-eval)
     - [Preisauswertungsbedingung](#price-exec-eval-condition)
     - [Preis-Exec-Flush-Vertrag](#price-exec-flush-contract)
     - [Preis-Exec hat Präfix](#price-exec-has-prefix)
     - [Preisausführungs-ID zur Adresse](#price-exec-id-to-address)
     - [Preisexec ist Objekt](#price-exec-is-object)
     - [Preis-Exec-Join](#price-exec-join)
     - [Preis-exec-json zur Karte](#price-exec-json-to-map)
     - [Preis-Ausführungslänge](#price-exec-len)
     - [Preis-Exec-Perm-Spalte](#price-exec-perm-column)
     - [Preis-Exec-Perm-Tabelle](#price-exec-perm-table)
     - [Preis-Exec-Pub zu ID](#price-exec-pub-to-id)
     - [Preisexec ersetzen](#price-exec-replace)
     - [Preis exec sha256](#price-exec-sha256)
     - [Preisausführungsgröße](#price-exec-size)
     - [Preis-Exec-Substr](#price-exec-substr)
     - [Preis-Exec-System-Kraftstoff](#price-exec-sys-fuel)
     - [Preis-exec-sys-param-int](#price-exec-sys-param-int)
     - [Preis-Exec-Systemparameter-String](#price-exec-sys-param-string)
     - [Bedingungen der Preisausführungstabelle](#price-exec-table-conditions)
     - [Preisexec-Brieftasche lösen](#price-exec-unbind-wallet)
     - [Preis-Exec-Update-Sprache](#price-exec-update-lang)
     - [Bedingung für Preisausführung validieren](#price-exec-validate-condition)
     - [Preis-TX-Daten](#price-tx-data)
     - [Preis tx-Größe Brieftasche](#price-tx-size-wallet)
     - [Rollback-Blöcke](#rollback-blocks)

<!-- /TOC -->

### Abgeschrieben {#depreciated}
Abgeschriebene Parameter:
* [Blockchain-URL](#blockchain-url)

## Details der Plattformparameter {#details-of-platform-parameters}

### Blockbelohnung {#block-reward}
Die Anzahl der IBXC-Token, die dem Ehrenknoten gewährt wurden, der den Block generiert.
Das Konto, das die Belohnung erhält, wird im Parameter [full nodes](#full-nodes) angegeben.

### Blockchain-URL {#blockchain-url}
Abgeschrieben.

### Provisionsgröße {#commission-size}
Prozentsatz der Provision.

Die Höhe der Provision wird als Prozentsatz der Gesamtkosten der Vertragsdurchführung berechnet. Die Einheit des Provisionstokens ist IBXC.

Die Provision wird an die im Parameter provisions_wallet angegebene Kontoadresse überwiesen.

### Provisionsgeldbörse {#commission-wallet}
Die Kontoadresse, um die Provision zu erhalten.

Die Höhe der Provision wird durch den Parameter provisions_größe angegeben.

### Standard-Ökosystemvertrag {#default-ecosystem-contract}
Der Quellcode des Standardvertrags im neuen Ökosystem.

Dieser Vertrag bietet Zugang zum Ökosystem-Ersteller.
### Standard-Ökosystem-Menü {#default-ecosystem-menu}
Der Quellcode des Standardmenüs des neuen Ökosystems.

### Standard-Ökosystemseite {#default-ecosystem-page}
Der Quellcode der Standardseite des neuen Ökosystems.

### Kraftstoffrate {#fuel-rate}
Die Wechselkurse verschiedener Ökosystem-Token nach Kraftstoffeinheit.

Das Format dieses Parameters:

`[["ecosystem_id", "token_to_fuel_rate"], ["ecosystem_id2", "token_to_fuel_rate2"], ...]`

* ``ecosystem_id``

    Ecosystem ID.
* `token_to_fuel_rate`

    Wechselkurs des Tokens nach Kraftstoffeinheit.

Zum Beispiel:

`[["1","1000000000000"], ["2", "1000"]]`

Ein Token des Ökosystems 1 wird gegen 1.000.000.000.000 Kraftstoffeinheiten eingetauscht. Ein Token des Ökosystems 2 wird gegen 1.000 Kraftstoffeinheiten eingetauscht.

### Preiserstellungsrate {#price-create-rate}
Die Brennstoffrate eines neuen Elements.

### vollständige Knoten {#full-nodes}
Die Liste der Ehrenknoten des Blockchain-Netzwerks.

Das Format dieses Parameters:
`
[{"api_address":"https://apihost1:port1","public_key":"nodepub1","tcp_address":"tcphost1:port2"},{"api_address":"https://apihost2:port1","public_key":"nodepub2","tcp_address":"tcphost2:port2"}]
`

* `tcp_address`

     TCP-Adresse und Port des Knotenhosts.
      Transaktionen und neue Blöcke werden an diese Hostadresse gesendet, die auch verwendet werden kann, um die vollständige Blockchain aus dem ersten Block zu erhalten.
* `api_address`

     API-Adresse und Port des Knotenhosts.
     Über die API-Adresse können Sie auf alle Funktionen der Plattform zugreifen, ohne Weaver zu verwenden. Siehe Details in RESTful-API.
* `public_key`

Öffentlicher Schlüssel des Knotens, der zur Überprüfung der Blocksignatur verwendet wird.


### Lücke zwischen Blöcken {#gap-between-blocks}
Das Zeitintervall (in Sekunden) zum Generieren von zwei Blöcken auf einem Knoten.

Alle Knoten im Netzwerk verwenden es, um zu bestimmen, wann ein neuer Block generiert werden soll. Wenn der aktuelle Knoten innerhalb dieses Zeitraums keinen neuen Block erzeugt, geht die Reihe zum nächsten Knoten in der Liste der Ehrenknoten über.

Der Mindestwert dieses Parameters ist `1` Sekunde.

### falsche Blöcke pro Tag {#incorrect-blocks-per-day}
Die Anzahl der fehlerhaften Blöcke, die ein Knoten pro Tag generieren darf, bevor er gesperrt wird.

Wenn mehr als die Hälfte der Knoten im Netzwerk die gleiche Anzahl fehlerhafter Blöcke von einem Knoten erhalten, wird der Knoten innerhalb eines in [node ban time](#node-ban-time) festgelegten Zeitraums aus dem Netzwerk gesperrt.

### max block generation time {#max-block-generation-time}
The maximum time for generating a block, in milliseconds. If a block is not successfully generated within this time period, a timeout error will be reported.

### maximale Blockgröße {#max-block-size}
Die maximale Größe eines Blocks in Bytes.

### max. Spalten {#max-columns}
Die maximale Anzahl von Feldern in einer einzelnen Tabelle.

Sie enthält jedoch nicht die vordefinierte Spalte `id`.

### maximale Forsign-Größe {#max-forsign-size}
Die maximale Größe einer Transaktionssignatur in Bytes.

### maximaler Kraftstoffblock {#max-fuel-block}
Die maximale Gesamttreibstoffgebühr eines einzelnen Blocks.

### max. Kraftstoffverbrauch {#max-fuel-tx}
Die maximale Gesamttreibstoffgebühr einer einzelnen Transaktion.

### maximale Indizes {#max-indexes}
Die maximale Anzahl von Primärschlüsselfeldern in einer einzelnen Tabelle.

### max. Sendeblock {#max-tx-block}
Die maximale Anzahl von Transaktionen in einem einzelnen Block.

### max. Sendeblock pro Benutzer {#max-tx-block-per-user}
Die maximale Anzahl von Transaktionen eines Kontos in einem Block.

### maximale Sendegröße {#max-tx-size}
Die maximale Größe einer Transaktion in Bytes.

### Node-Sperrzeit {#node-ban-time}
Der globale Sperrzeitraum des Knotens in Millisekunden.
Wenn mehr als die Hälfte der Knoten im Netzwerk fehlerhafte Blöcke von einem Knoten bis zur Anzahl von [falschen Blöcken pro Tag](#incorrect-blocks-per-day) erhalten, wird der Knoten für diesen Zeitraum im Netzwerk gesperrt .

### Knotensperrzeit lokal {#node-ban-time-local}
Die lokale Sperrzeit des Knotens in Millisekunden.

Wenn ein Knoten einen falschen Block von einem anderen Knoten empfängt, wird er den Knoten des Absenders während dieses Zeitraums lokal sperren.
### Anzahl der Knoten {#number-of-nodes}
Die maximale Anzahl an Honor-Knoten im Parameter [full nodes](#full-nodes).

### Preis schafft Ökosystem {#price-create-ecosystem}
Die Kraftstoffgebühr, um ein neues einheitliches Ökosystem zu schaffen.

Dieser Parameter definiert die zusätzliche Treibstoffgebühr des `@1NewEcosystem`-Vertrags. Bei Vertragsabschluss wird auch die Treibstoffgebühr für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.
### Preis Anwendung erstellen {#price-create-application}
Die Kraftstoffgebühr zum Erstellen einer neuen Einzelanwendung.

Dieser Parameter definiert die zusätzliche Treibstoffgebühr des `@1NewApplication`-Vertrags. Bei Vertragsabschluss wird auch die Treibstoffgebühr für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.
### Preis Tabelle erstellen {#price-create-table}
Die Kraftstoffgebühr zum Erstellen einer neuen einzelnen Tabelle.

Dieser Parameter definiert die zusätzlichen Treibstoffkosten des `@1NewTable`-Vertrags. Bei Vertragsabschluss werden auch die Treibstoffkosten für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.

### price create column {#price-create-column}
Die Kraftstoffgebühr zum Erstellen eines neuen einzelnen Tabellenfeldes.

Dieser Parameter definiert die zusätzlichen Treibstoffkosten des `@1NewColumn`-Vertrags. Bei Vertragsabschluss werden auch die Treibstoffkosten für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.
### Preis Vertrag erstellen {#price-create-contract}
Die Treibstoffgebühr ist ein neuer Einzelvertrag zu erstellen.

Dieser Parameter definiert die zusätzlichen Treibstoffkosten des `@1NewContract`-Vertrags. Bei Vertragsabschluss werden auch die Treibstoffkosten für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.

### Preis Menü erstellen {#price-create-menu}
Die Kraftstoffgebühr zum Erstellen eines neuen Einzelmenüs.

Dieser Parameter definiert die zusätzlichen Treibstoffkosten des `@1NewMenu`-Vertrags. Bei Vertragsabschluss werden auch die Treibstoffkosten für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.
### Seite zum Erstellen von Preisen {#price-create-page}
Die Treibstoffgebühr zum Erstellen einer neuen einzelnen Seite.

Dieser Parameter definiert die zusätzlichen Treibstoffkosten des `@1NewPage`-Vertrags. Bei Vertragsabschluss werden auch die Treibstoffkosten für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.

### price exec address to id {#price-exec-address-to-id}
Die Kraftstoffgebühr für den Aufruf der Funktion `AddressToId()`, berechnet in Kraftstoffeinheiten.

### Price Exec Bind Wallet {#price-exec-bind-wallet}
Die Treibstoffgebühr für den Aufruf der `Activate()`-Funktion, berechnet in Treibstoffeinheiten.

### Bedingung der Preisausführungsspalte {#price-exec-column-condition}
Die Kraftstoffgebühr für den Aufruf der Funktion `ColumnCondition()`, berechnet in Kraftstoffeinheiten.

### Price Exec kompilieren Vertrag {#price-exec-compile-contract}
Die Kraftstoffgebühr für den Aufruf der Funktion `CompileContract()`, berechnet in Kraftstoffeinheiten.

### Preisexe enthält {#price-exec-contains}
Die Kraftstoffgebühr für den Aufruf der `Contains()`-Funktion, berechnet in Kraftstoffeinheiten.

### Preisausführungsvertrag nach ID {#price-exec-contract-by-id}
Die Kraftstoffgebühr für den Aufruf der Funktion `GetContractById()`, berechnet in Kraftstoffeinheiten.

### Price Exec-Vertrag nach Namen {#price-exec-contract-by-name}
Die Kraftstoffgebühr für den Aufruf der Funktion `GetContractByName()`, berechnet in Kraftstoffeinheiten.

### Liste der Price Exec-Verträge {#price-exec-contracts-list}
Die Kraftstoffgebühr für den Aufruf der Funktion `ContractsList()`, berechnet in Kraftstoffeinheiten.

### Preis-Exec-Spalte erstellen {#price-exec-create-column}
Die Kraftstoffgebühr für den Aufruf der Funktion `CreateColumn()`, berechnet in Kraftstoffeinheiten.

### Price Exec schafft ein Ökosystem {#price-exec-create-ecosystem}
Die Treibstoffgebühr für den Aufruf der Funktion `CreateEcosystem()`, berechnet in Treibstoffeinheiten.

### Preisausführung Tabelle erstellen {#price-exec-create-table}
Die Kraftstoffgebühr für den Aufruf der Funktion `CreateTable()`, berechnet in Kraftstoffeinheiten.

### Preis Ausführung Ecosys Param {#price-exec-ecosys-param}
Die Kraftstoffgebühr für den Aufruf der Funktion `EcosysParam()`, berechnet in Kraftstoffeinheiten.
### Preisausw {#price-exec-eval}
Die Kraftstoffgebühr für den Aufruf der Funktion `Eval()`, berechnet in Kraftstoffeinheiten.

### Preisausführungszustand {#price-exec-eval-condition}
Die Kraftstoffgebühr für den Aufruf der Funktion `EvalCondition()`, berechnet in Kraftstoffeinheiten.

### Price Exec Flush-Vertrag {#price-exec-flush-contract}
Die Kraftstoffgebühr für den Aufruf der Funktion `FlushContract()`, berechnet in Kraftstoffeinheiten.

### Price Exec hat Präfix {#price-exec-has-prefix}
Die Kraftstoffgebühr für den Aufruf der Funktion `HasPrefix()`, berechnet in Kraftstoffeinheiten.

### Preisausführungs-ID an Adresse {#price-exec-id-to-address}
Die Kraftstoffgebühr für den Aufruf der Funktion `IdToAddress()`, berechnet in Kraftstoffeinheiten.

### Preisexec ist Objekt {#price-exec-is-object}
Die Kraftstoffgebühr für den Aufruf der Funktion `IsObject()`, berechnet in Kraftstoffeinheiten.

### Price Exec beitreten {#price-exec-join}
Die Treibstoffgebühr für den Aufruf der `Join()`-Funktion, berechnet in Treibstoffeinheiten.

### Price exec json zur Karte {#price-exec-json-to-map}
Die Kraftstoffgebühr für den Aufruf der Funktion `JSONToMap()`, berechnet in Kraftstoffeinheiten.

### Preis ausf. len {#price-exec-len}
Die Kraftstoffgebühr für den Aufruf der Funktion `Len()`, berechnet in Kraftstoffeinheiten.

### Preis exec perma Spalte {#price-exec-perm-column}
Die Treibstoffgebühr für den Aufruf der Funktion `PermColumn()`, berechnet in Treibstoffeinheiten.

### Price Exec Perm-Tabelle {#price-exec-perm-table}
Die Treibstoffgebühr für den Aufruf der Funktion `PermTable()`, berechnet in Treibstoffeinheiten.

### Preis Exec Pub zu ID {#price-exec-pub-to-id}
Die Kraftstoffgebühr für den Aufruf der Funktion `PubToID()`, berechnet in Kraftstoffeinheiten.

### Preis exec ersetzen {#price-exec-replace}
Die Treibstoffgebühr für den Aufruf der `Replace()`-Funktion, berechnet in Treibstoffeinheiten.

### Preis exec sha256 {#price-exec-sha256}
Die Kraftstoffgebühr für den Aufruf der Funktion `Sha256()`, berechnet in Kraftstoffeinheiten.

### Preisausführungsgröße {#price-exec-size}
Die Kraftstoffgebühr für den Aufruf der Funktion `Size()`, berechnet in Kraftstoffeinheiten.

### Preis Exec Substr {#price-exec-substr}
Die Treibstoffgebühr für den Aufruf der Funktion `theSubstr()`, berechnet in Treibstoffeinheiten.

### Preis exec sys Kraftstoff {#price-exec-sys-fuel}
Die Kraftstoffgebühr für den Aufruf der Funktion `SysFuel()`, berechnet in Kraftstoffeinheiten.

### Preis Ausführung Systemparameter Int {#price-exec-sys-param-int}
Die Treibstoffgebühr für den Aufruf der Funktion `SysParamInt()`, berechnet in Treibstoffeinheiten.

### price exec sys param string {#price-exec-sys-param-string}
Die Treibstoffgebühr für den Aufruf der Funktion `SysParamString()`, berechnet in Treibstoffeinheiten.

### Price Exec-Tabellenbedingungen {#price-exec-table-conditions}
Die Kraftstoffgebühr für den Aufruf der Funktion `TableConditions()`, berechnet in Kraftstoffeinheiten.

### Price Exec Wallet entbinden {#price-exec-unbind-wallet}
Die Treibstoffgebühr für den Aufruf der `Deactivate()`-Funktion, berechnet in Treibstoffeinheiten.

### Preis-Exec-Update-Sprache {#price-exec-update-lang}
Die Treibstoffgebühr für den Aufruf der `UpdateLang()`-Funktion, berechnet in Treibstoffeinheiten.

### Preisausf. Bedingung validieren {#price-exec-validate-condition}
Die Kraftstoffgebühr für den Aufruf der Funktion `ValidateCondition()`, berechnet in Kraftstoffeinheiten.

### Preis-TX-Daten {#price-tx-data}
Die Treibstoffgebühr für alle 1024 Byte einer Transaktion, berechnet in Treibstoffeinheiten.

### Preis TX-Brieftasche {#price-tx-size-wallet}
Die Gebühr nach Transaktionsgröße, ihre Einheit ist das IBXC-Token.

Mit Ausnahme des Ökosystems 1 fällt bei der Umsetzung eines Vertrags in anderen Ökosystemen anteilig eine Nutzungsgebühr für Blockspeicherplatz an, und ihr Satz beträgt *Preis für die Tx-Wallet* IBXC-Token pro Megabyte.

### Rollback-Blöcke {#rollback-blocks}
Maximale Anzahl von Blöcken, die zurückgesetzt werden können, wenn ein Fork in der Blockchain erkannt wird.