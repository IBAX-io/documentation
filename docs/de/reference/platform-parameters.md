# Plattformparameter
Dies sind Parameter zur Konfiguration von IBAX. Sie gelten für das Blockchain-Netzwerk und alle darin enthaltenen Ökosysteme.

## Ort zum Speichern von Plattformparametern
Plattformparameter werden in der Tabelle `system parameters` gespeichert.

Diese Tabelle befindet sich im ersten (Standard-)Ökosystem, das im Blockchain-Netzwerk erstellt wurde.

## Änderung der Plattformparameter
Eine Änderung der Plattformparameter kann nur durch Abstimmung erfolgen. Sie können den UpdateSysParam-Vertrag nur verwenden, um Plattformparameter zu ändern, die durch Definitionen im Rechtssystem der Plattform verwaltet werden.

## Plattformparameter konfigurieren
### Konfigurieren Sie das Blockchain-Netzwerk

Knoten:
* [Volle Knoten](#volle-knoten)
* [Anzahl der Knoten](#anzahl-der-knoten)

Knotenverbote:
* [falsche Blöcke pro Tag](#falsche-Blöcke-pro-Tag)
* [node ban time](#node-ban-time)
* [node ban time local](#node-ban-time-local)

### Konfigurieren Sie ein neues Ökosystem
Standardseite und Menü:
* [Standard-Ökosystemseite](#default-ecosystem-page)
* [Standard-Ökosystem-Menü](#default-ecosystem-menu)

Standardvertrag:
* [Standard-Ökosystemvertrag](#default-ecosystem-contract)

### Konfigurieren Sie die Datenbank

Tischlimits:
* [Max Spalte](#max-spalte)
* [Max Indizes](#max-indizes)
### Generierung von Blöcken konfigurieren
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

### Konfigurieren Sie die Tankmarken
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
     - [Abgeschrieben](#abgeschrieben)
  - [Details der Plattformparameter](#details-of-platform-parameters)
     - [Blockbelohnung](#block-belohnung)
     - [Blockchain-URL](#Blockchain-URL)
     - [Provisionsgröße](#provisionsgröße)
     - [Provisionsgeldbörse](#provisionsgeldbörse)
     - [Standard-Ökosystemvertrag](#default-ecosystem-contract)
     - [Standard-Ökosystem-Menü](#default-ecosystem-menu)
     - [Standard-Ökosystemseite](#default-ecosystem-page)
     - [Kraftstoffrate](#Kraftstoffrate)
     - [Preiserstellungsrate](#preiserstellungsrate)
     - [Vollständige Knoten](#vollständige-knoten)
     - [Lücke zwischen Blöcken](#lücke-zwischen-Blöcken)
     - [Falsche Blöcke pro Tag](#falsche-Blöcke-pro-Tag)
     - [Max. Blockgenerierungszeit](#max-block-generation-time)
     - [Maximale Blockgröße](#max-Blockgröße)
     - [Max Spalten](#max-spalten)
     - [maximale Zeichengröße](#max-forsign-size)
     - [max. Kraftstoffblock](#max-Kraftstoffblock)
     - [max. Kraftstoffverbrauch](#max-fuel-tx)
     - [maximale Indizes](#max-Indizes)
     - [max. Sendeblock](#max-tx-Block)
     - [max. Sendeblock pro Benutzer](#max-tx-block-per-user)
     - [maximale Sendegröße](#max-tx-Größe)
     - [node ban time](#node-ban-time)
     - [node ban time local](#node-ban-time-local)
     - [Anzahl der Knoten](#anzahl-der-knoten)
     - [Preis-Ökosystem erstellen](#preis-ökosystem-erstellen)
     - [Preiserstellungsantrag](#preiserstellungsantrag)
     - [Preistabelle erstellen](#preistabelle-erstellen)
     - [Preiserstellungsspalte](#Preiserstellungsspalte)
     - [Preiserstellungsvertrag](#Preiserstellungsvertrag)
     - [Preiserstellungsmenü](#price-create-menu)
     - [Preiserstellungsseite](#Preiserstellungsseite)
     - [Preis-Exec-Adresse zu ID](#Preis-Exec-Adresse-zu-ID)
     - [Preis-Exec-Bind-Wallet] (#preis-Exec-Bind-Wallet)
     - [Preisausführungsspaltenbedingung](#Preisausführungsspaltenbedingung)
     - [Preis-Exec-Vertrag kompilieren](#Preis-Exec-Compile-Vertrag)
     - [Preisexec enthält](#Preisexec-enthält)
     - [Preisausführungsvertrag nach ID](#Preisausführungsvertrag-nach-ID)
     - [Preisausführungsvertrag nach Name](#Preisausführungsvertrag-nach-Name)
     - [Liste der Price-Exec-Verträge](#price-exec-contracts-list)
     - [Preis-Exec-Spalte erstellen](#preis-exec-spalte-erstellen)
     - [Price Exec Ecosystem erstellen](#price-exec-ökosystem-erstellen)
     - [Preis-Exec-Tabelle erstellen](#preis-exec-tabelle-erstellen)
     - [Preis-Exec-Ecosys-Param](#Preis-Exec-Ecosys-Param)
     - [Preis-Auswertung](#preis-Auswertung)
     - [Preisauswertungsbedingung](#preisauswertungsbedingung)
     - [Preis-Exec-Flush-Vertrag](#preis-Exec-Flush-Vertrag)
     - [Preis-Exec hat Präfix](#preis-Exec-hat-Präfix)
     - [Preisausführungs-ID zur Adresse](#preisausführungs-ID-zur-Adresse)
     - [Preisexec ist Objekt](#preisexec-ist-Objekt)
     - [Preis-Exec-Join](#preis-Exec-Join)
     - [Preis-exec-json zur Karte](#price-exec-json-to-map)
     - [Preis-Ausführungslänge](#preis-Ausführungslänge)
     - [Preis-Exec-Perm-Spalte](#preis-Exec-Perm-Spalte)
     - [Preis-Exec-Perm-Tabelle] (#preis-exec-perm-tabelle)
     - [Preis-Exec-Pub zu ID](#preis-Exec-Pub-zu-ID)
     - [Preisexec ersetzen](#preis-Exec-Ersetzen)
     - [Preis exec sha256](#preis-exec-sha256)
     - [Preisausführungsgröße](#preisausführungsgröße)
     - [Preis-Exec-Substr](#Preis-Exec-Substr)
     - [Preis-Exec-System-Kraftstoff](#Preis-Exec-System-Kraftstoff)
     - [Preis-exec-sys-param-int](#preis-exec-sys-param-int)
     - [Preis-Exec-Systemparameter-String] (#preis-exec-system-param-string)
     - [Bedingungen der Preisausführungstabelle](#Preisausführungstabellenbedingungen)
     - [Preisexec-Brieftasche lösen](#preis-exec-brieftasche-lösen)
     - [Preis-Exec-Update-Sprache](#price-exec-Update-Sprache)
     - [Bedingung für Preisausführung validieren](#bedingung-für-preisausführung-validieren)
     - [Preis-TX-Daten](#preis-TX-Daten)
     - [Preis tx-Größe Brieftasche](#preis-tx-größe-brieftasche)
     - [Rollback-Blöcke](#rollback-blöcke)

<!-- /TOC -->

### Abgeschrieben
Abgeschriebene Parameter:
* [Blockchain-URL](#Blockchain-URL)

## Details der Plattformparameter

### Blockbelohnung
Die Anzahl der IBXC-Token, die dem Ehrenknoten gewährt wurden, der den Block generiert.
Das Konto, das die Belohnung erhält, wird im Parameter [full nodes](#full-nodes) angegeben.

### Blockchain-URL
Abgeschrieben.

### Provisionsgröße
Prozentsatz der Provision.

Die Höhe der Provision wird als Prozentsatz der Gesamtkosten der Vertragsdurchführung berechnet. Die Einheit des Provisionstokens ist IBXC.

Die Provision wird an die im Parameter provisions_wallet angegebene Kontoadresse überwiesen.

### Provisionsgeldbörse
Die Kontoadresse, um die Provision zu erhalten.

Die Höhe der Provision wird durch den Parameter provisions_größe angegeben.

### Standard-Ökosystemvertrag
Der Quellcode des Standardvertrags im neuen Ökosystem.

Dieser Vertrag bietet Zugang zum Ökosystem-Ersteller.
### Standard-Ökosystem-Menü
Der Quellcode des Standardmenüs des neuen Ökosystems.

### Standard-Ökosystemseite
Der Quellcode der Standardseite des neuen Ökosystems.

### Kraftstoffrate
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

### Preiserstellungsrate
Die Brennstoffrate eines neuen Elements.

### vollständige Knoten
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


### Lücke zwischen Blöcken
Das Zeitintervall (in Sekunden) zum Generieren von zwei Blöcken auf einem Knoten.

Alle Knoten im Netzwerk verwenden es, um zu bestimmen, wann ein neuer Block generiert werden soll. Wenn der aktuelle Knoten innerhalb dieses Zeitraums keinen neuen Block erzeugt, geht die Reihe zum nächsten Knoten in der Liste der Ehrenknoten über.

Der Mindestwert dieses Parameters ist `1` Sekunde.

### falsche Blöcke pro Tag
Die Anzahl der fehlerhaften Blöcke, die ein Knoten pro Tag generieren darf, bevor er gesperrt wird.

Wenn mehr als die Hälfte der Knoten im Netzwerk die gleiche Anzahl fehlerhafter Blöcke von einem Knoten erhalten, wird der Knoten innerhalb eines in [node ban time](#node-ban-time) festgelegten Zeitraums aus dem Netzwerk gesperrt.

### max block generation time
The maximum time for generating a block, in milliseconds. If a block is not successfully generated within this time period, a timeout error will be reported.

### maximale Blockgröße
Die maximale Größe eines Blocks in Bytes.

### max. Spalten
Die maximale Anzahl von Feldern in einer einzelnen Tabelle.

Sie enthält jedoch nicht die vordefinierte Spalte `id`.

### maximale Forsign-Größe
Die maximale Größe einer Transaktionssignatur in Bytes.

### maximaler Kraftstoffblock
Die maximale Gesamttreibstoffgebühr eines einzelnen Blocks.

### max. Kraftstoffverbrauch
Die maximale Gesamttreibstoffgebühr einer einzelnen Transaktion.

### maximale Indizes
Die maximale Anzahl von Primärschlüsselfeldern in einer einzelnen Tabelle.

### max. Sendeblock
Die maximale Anzahl von Transaktionen in einem einzelnen Block.

### max. Sendeblock pro Benutzer
Die maximale Anzahl von Transaktionen eines Kontos in einem Block.

### maximale Sendegröße
Die maximale Größe einer Transaktion in Bytes.

### Node-Sperrzeit
Der globale Sperrzeitraum des Knotens in Millisekunden.
Wenn mehr als die Hälfte der Knoten im Netzwerk fehlerhafte Blöcke von einem Knoten bis zur Anzahl von [falschen Blöcken pro Tag](#incorrect-blocks-per-day) erhalten, wird der Knoten für diesen Zeitraum im Netzwerk gesperrt .

### Knotensperrzeit lokal
Die lokale Sperrzeit des Knotens in Millisekunden.

Wenn ein Knoten einen falschen Block von einem anderen Knoten empfängt, wird er den Knoten des Absenders während dieses Zeitraums lokal sperren.
### Anzahl der Knoten
Die maximale Anzahl an Honor-Knoten im Parameter [full nodes](#full-nodes).

### Preis schafft Ökosystem
Die Kraftstoffgebühr, um ein neues einheitliches Ökosystem zu schaffen.

Dieser Parameter definiert die zusätzliche Treibstoffgebühr des `@1NewEcosystem`-Vertrags. Bei Vertragsabschluss wird auch die Treibstoffgebühr für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.
### Preis Anwendung erstellen
Die Kraftstoffgebühr zum Erstellen einer neuen Einzelanwendung.

Dieser Parameter definiert die zusätzliche Treibstoffgebühr des `@1NewApplication`-Vertrags. Bei Vertragsabschluss wird auch die Treibstoffgebühr für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.
### Preis Tabelle erstellen
Die Kraftstoffgebühr zum Erstellen einer neuen einzelnen Tabelle.

Dieser Parameter definiert die zusätzlichen Treibstoffkosten des `@1NewTable`-Vertrags. Bei Vertragsabschluss werden auch die Treibstoffkosten für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.

Spalte ### Preis erstellen
Die Kraftstoffgebühr zum Erstellen eines neuen einzelnen Tabellenfeldes.

Dieser Parameter definiert die zusätzlichen Treibstoffkosten des `@1NewColumn`-Vertrags. Bei Vertragsabschluss werden auch die Treibstoffkosten für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.
### Preis Vertrag erstellen
Die Treibstoffgebühr ist ein neuer Einzelvertrag zu erstellen.

Dieser Parameter definiert die zusätzlichen Treibstoffkosten des `@1NewContract`-Vertrags. Bei Vertragsabschluss werden auch die Treibstoffkosten für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.

### Preis Menü erstellen
Die Kraftstoffgebühr zum Erstellen eines neuen Einzelmenüs.

Dieser Parameter definiert die zusätzlichen Treibstoffkosten des `@1NewMenu`-Vertrags. Bei Vertragsabschluss werden auch die Treibstoffkosten für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.
### Seite zum Erstellen von Preisen
Die Treibstoffgebühr zum Erstellen einer neuen einzelnen Seite.

Dieser Parameter definiert die zusätzlichen Treibstoffkosten des `@1NewPage`-Vertrags. Bei Vertragsabschluss werden auch die Treibstoffkosten für die Ausführung verschiedener Funktionen dieses Vertrages berechnet und in die Gesamtkosten einbezogen.

Dieser Parameter wird in Kraftstoffeinheiten berechnet. Verwenden Sie [fuel rate](#fuel-rate) und [price create rate](#price-create-rate), um Treibstoffeinheiten in IBXC-Token umzuwandeln.

### price exec address to id
Die Kraftstoffgebühr für den Aufruf der Funktion `AddressToId()`, berechnet in Kraftstoffeinheiten.

### Price Exec Bind Wallet
Die Treibstoffgebühr für den Aufruf der `Activate()`-Funktion, berechnet in Treibstoffeinheiten.

### Bedingung der Preisausführungsspalte
Die Kraftstoffgebühr für den Aufruf der Funktion `ColumnCondition()`, berechnet in Kraftstoffeinheiten.

### Price Exec kompilieren Vertrag
Die Kraftstoffgebühr für den Aufruf der Funktion `CompileContract()`, berechnet in Kraftstoffeinheiten.

### Preisexe enthält
Die Kraftstoffgebühr für den Aufruf der `Contains()`-Funktion, berechnet in Kraftstoffeinheiten.

### Preisausführungsvertrag nach ID
Die Kraftstoffgebühr für den Aufruf der Funktion `GetContractById()`, berechnet in Kraftstoffeinheiten.

### Price Exec-Vertrag nach Namen
Die Kraftstoffgebühr für den Aufruf der Funktion `GetContractByName()`, berechnet in Kraftstoffeinheiten.

### Liste der Price Exec-Verträge
Die Kraftstoffgebühr für den Aufruf der Funktion `ContractsList()`, berechnet in Kraftstoffeinheiten.

### Preis-Exec-Spalte erstellen
Die Kraftstoffgebühr für den Aufruf der Funktion `CreateColumn()`, berechnet in Kraftstoffeinheiten.

### Price Exec schafft ein Ökosystem
Die Treibstoffgebühr für den Aufruf der Funktion `CreateEcosystem()`, berechnet in Treibstoffeinheiten.

### Preisausführung Tabelle erstellen
Die Kraftstoffgebühr für den Aufruf der Funktion `CreateTable()`, berechnet in Kraftstoffeinheiten.

### Preis Ausführung Ecosys Param
Die Kraftstoffgebühr für den Aufruf der Funktion `EcosysParam()`, berechnet in Kraftstoffeinheiten.
### Preisausw
Die Kraftstoffgebühr für den Aufruf der Funktion `Eval()`, berechnet in Kraftstoffeinheiten.

### Preisausführungszustand
Die Kraftstoffgebühr für den Aufruf der Funktion `EvalCondition()`, berechnet in Kraftstoffeinheiten.

### Price Exec Flush-Vertrag
Die Kraftstoffgebühr für den Aufruf der Funktion `FlushContract()`, berechnet in Kraftstoffeinheiten.

### Price Exec hat Präfix
Die Kraftstoffgebühr für den Aufruf der Funktion `HasPrefix()`, berechnet in Kraftstoffeinheiten.

### Preisausführungs-ID an Adresse
Die Kraftstoffgebühr für den Aufruf der Funktion `IdToAddress()`, berechnet in Kraftstoffeinheiten.

### Preisexec ist Objekt
Die Kraftstoffgebühr für den Aufruf der Funktion `IsObject()`, berechnet in Kraftstoffeinheiten.

### Price Exec beitreten
Die Treibstoffgebühr für den Aufruf der `Join()`-Funktion, berechnet in Treibstoffeinheiten.

### Price exec json zur Karte
Die Kraftstoffgebühr für den Aufruf der Funktion `JSONToMap()`, berechnet in Kraftstoffeinheiten.

### Preis ausf. len
Die Kraftstoffgebühr für den Aufruf der Funktion `Len()`, berechnet in Kraftstoffeinheiten.

### Preis exec perma Spalte
Die Treibstoffgebühr für den Aufruf der Funktion `PermColumn()`, berechnet in Treibstoffeinheiten.

### Price Exec Perm-Tabelle
Die Treibstoffgebühr für den Aufruf der Funktion `PermTable()`, berechnet in Treibstoffeinheiten.

### Preis Exec Pub zu ID
Die Kraftstoffgebühr für den Aufruf der Funktion `PubToID()`, berechnet in Kraftstoffeinheiten.

### Preis exec ersetzen
Die Treibstoffgebühr für den Aufruf der `Replace()`-Funktion, berechnet in Treibstoffeinheiten.

### Preis exec sha256
Die Kraftstoffgebühr für den Aufruf der Funktion `Sha256()`, berechnet in Kraftstoffeinheiten.

### Preisausführungsgröße
Die Kraftstoffgebühr für den Aufruf der Funktion `Size()`, berechnet in Kraftstoffeinheiten.

### Preis Exec Substr
Die Treibstoffgebühr für den Aufruf der Funktion `theSubstr()`, berechnet in Treibstoffeinheiten.

### Preis exec sys Kraftstoff
Die Kraftstoffgebühr für den Aufruf der Funktion `SysFuel()`, berechnet in Kraftstoffeinheiten.

### Preis Ausführung Systemparameter Int
Die Treibstoffgebühr für den Aufruf der Funktion `SysParamInt()`, berechnet in Treibstoffeinheiten.

### price exec sys param string
Die Treibstoffgebühr für den Aufruf der Funktion `SysParamString()`, berechnet in Treibstoffeinheiten.

### Price Exec-Tabellenbedingungen
Die Kraftstoffgebühr für den Aufruf der Funktion `TableConditions()`, berechnet in Kraftstoffeinheiten.

### Price Exec Wallet entbinden
Die Treibstoffgebühr für den Aufruf der `Deactivate()`-Funktion, berechnet in Treibstoffeinheiten.

### Preis-Exec-Update-Sprache
Die Treibstoffgebühr für den Aufruf der `UpdateLang()`-Funktion, berechnet in Treibstoffeinheiten.

### Preisausf. Bedingung validieren
Die Kraftstoffgebühr für den Aufruf der Funktion `ValidateCondition()`, berechnet in Kraftstoffeinheiten.

### Preis-TX-Daten
Die Treibstoffgebühr für alle 1024 Byte einer Transaktion, berechnet in Treibstoffeinheiten.

### Preis TX-Brieftasche
Die Gebühr nach Transaktionsgröße, ihre Einheit ist das IBXC-Token.

Mit Ausnahme des Ökosystems 1 fällt bei der Umsetzung eines Vertrags in anderen Ökosystemen anteilig eine Nutzungsgebühr für Blockspeicherplatz an, und ihr Satz beträgt *Preis für die Tx-Wallet* IBXC-Token pro Megabyte.

### Rollback-Blöcke
Maximale Anzahl von Blöcken, die zurückgesetzt werden können, wenn ein Fork in der Blockchain erkannt wird.