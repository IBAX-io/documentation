# IBAX Überblick {#ibax-overview}

- [IBAX Überblick](#ibax-overview)
  - [Merkmale](#features)
  - [Architektur](#architecture)
    - [Netzwerk](#network)
    - [Honor Node](#honor-node)
    - [Transaktionen](#transactions)
    - [Netzwerkprotokoll](#network-protocol)
    - [Transaktionsverifizierung](#block-and-transaction-verification)
    - [Datenbank](#database)
  - [ECOLIB](#ecolib)
    - [IDE](#ide)
    - [Anwendungen](#applications)
    - [Tische](#tables)
    - [Ökosystem Parameter](#ecosystem-parameters)
  - [Kontrollmechanismus für Zugriffsrechte](#access-rights-control-mechanism)
    - [Zugriffsrechteverwaltung](#access-rights-management)
    - [Exklusive Rechte](#exclusive-rights)
  - [Virtuelles privates Ökosystem](#virtual-private-ecosystem)
    - [Anfragen an Webressourcen](#requests-to-web-resources)
    - [Rechte zum Lesen von Daten](#rights-to-read-data)
    - [CLB Schaffung](#clb-creation)
    - [CLB Verwendung](#clb-usage)
    
## Merkmale {#features}

Das IBAX Network (IBAX) verfügt über eine integrierte Anwendungsentwicklungsumgebung (IDE). Es ist ein mehrstufiges Zugriffskontrollsystem für Daten, Benutzerseiten und intelligente Verträge.

In Bezug auf seine Struktur und Funktionen unterscheidet sich IBAX erheblich von den meisten bestehenden Blockchain-Plattformen:

* Die Entwicklung und Nutzung von IBAX-Anwendungen erfolgt in einer autonomen Softwareumgebung namens **ökosystem**. Jedes Ökosystem hat seine eigenen Mitgliedschaftsregeln, die zunächst vom Ersteller festgelegt werden;


* Ökosystemaktivitäten, wie die Daten, die in Datensätzen oder Aktualisierungen von <font color=Red>Datenbanktabellen</font> enthalten sind, basieren auf **Registern**, die mit **intelligente Verträge** erstellt wurden. Bei den meisten anderen Blockchain-Plattformen basieren die Aktivitäten auf dem Transaktionsaustausch zwischen Konten;

* Der Zugriff auf **registrieren** und die Kontrolle der Beziehungen zwischen den Mitgliedern des Ökosystems werden durch eine Reihe von Regeln verwaltet, die als **intelligente Gesetze** bezeichnet werden.

## Architektur {#architecture}

### Netzwerk {#network}

IBAX basiert auf einem Peer-to-Peer (P2P)-Netzwerk.

Guardian-Knoten im Netzwerk speichern die neueste Version der Blockchain-Datenbank, die den neuesten Status der Blockchain von IBAX aufzeichnet.

Netzwerkbenutzer können Daten empfangen, indem sie Anfragen von der Guardian Node-Datenbank über **Weaver**- oder REST-API-Befehle senden. Nach der Unterzeichnung durch Benutzer werden neue Anforderungen als Transaktionen im Binärformat an das Netzwerk gesendet. Im Wesentlichen handelt es sich bei diesen Transaktionen um Befehle zum Ändern relevanter Datenbankeinträge. Transaktionen werden in Blöcken aggregiert und diese Blöcke werden an die Blockchains aller Netzwerkknoten gesendet. Jeder Wächterknoten verarbeitet die Transaktionen im Block und aktualisiert dadurch die entsprechenden Daten in der Datenbank.

### Honor Node {#honor-node}

Ein Wächterknoten, der privilegiert ist, neue Blöcke im Netzwerk zu erzeugen, wird Ehrenknoten genannt. Die maximale Anzahl von Ehrenknoten wird durch [Anzahl der Knoten](../reference/platform-parameters.md#Anzahl der Knoten) in der Plattformparametertabelle definiert, was zeigt, dass die Anzahl von Ehrenknoten begrenzt ist.

Ein Ehrenknoten ist eine der Schlüsselkomponenten des IBAX Public Network. Es führt Transaktionen aus und validiert sie, sammelt Transaktionsinformationen von anderen Knoten, fügt Transaktionen zur Warteschlange hinzu und überprüft die Korrektheit und Gültigkeit neuer Blöcke mithilfe des Bestätigungsmechanismus. Im Allgemeinen hat es zwei Zustände: Verpackung und Aufverpackung.

Ein Honor Node im Verpackungszustand liefert die höchste Leistung. Es erhält auszuführende Transaktionsanforderungen aus der Transaktionswarteschlange und verifiziert die Signaturgültigkeit und Korrektheit von Transaktionen, z. Überweisungsbetrag, Erlaubnis für Transaktionsvorgänge und genaue Ausführung von Transaktionen. Alle korrekten oder falschen Transaktionsoperationen (falsche Transaktionen werden rückgängig gemacht) werden in den Block geschrieben. Bei falschen Transaktionen wird eine Strafgasgebühr erhoben. Ausgeführte Transaktionen werden anderen Honor Nodes zusammen mit der Blockierung durch Broadcasting mitgeteilt.

Ein Ehrenknoten im Nichtverpackungszustand ist hauptsächlich für die Blockverifizierung verantwortlich, um sicherzustellen, dass von einem Verpackungsknoten generierte In-Block-Transaktionen korrekt ausgeführt werden. Im Falle einer Anomalie wird der Ausnahmebehandlungsmechanismus ausgelöst und das IBAX-Netzwerk wird den Block zurücksetzen und erneut verifizieren.

Um die Effizienz der Transaktionsausführung sicherzustellen, sammeln Honor Nodes ständig Transaktionsinformationen. 

### Transaktionen {#transactions}

Transaktionen, einschließlich Daten, die zur Implementierung von **intelligente Verträge** verwendet werden, werden von Weaver generiert.

Transaktionen werden von Benutzern mit einem privaten Schlüssel signiert. Der private Schlüssel und die Weaver-Signaturfunktion können in Browsern, Software-Clients, SIM-Karten oder dedizierten physischen Geräten gespeichert werden. In der aktuellen Implementierung wird der private Schlüssel mit dem ECDSA-Algorithmus verschlüsselt und auf der Weaver-Seite gespeichert. Alle Transaktionen werden mit dem ECDSA-Algorithmus signiert.

Die Struktur einer Transaktion entspricht dem folgenden Format:

* ID - ID des implementierten Vertrags;

* Params - an den Vertrag gesendete Parameter;

* KeyID - ID des Benutzers, der die Transaktion sendet;

* PublicKey - öffentlicher Schlüssel des Ehrenknotens;

* Zeit - von der Transaktion generierter Zeitstempel;

* EcosystemID - ID des Ökosystems, in dem die Transaktion durchgeführt wird;

* ТokenEcosystem - ID des Ökosystems, standardmäßig 1, und darin enthaltene Token werden verwendet, um die Transaktionskosten zu decken.

### Netzwerkprotokoll {#network-protocol}

Transaktionen werden von Benutzern an Ehrenknoten gesendet, wo sie einer grundlegenden Überprüfung unterzogen werden, um sicherzustellen, dass die Formate korrekt sind, und dann der Warteschlange hinzugefügt werden. Transaktionen werden auch an andere Ehrenknoten im Netzwerk gesendet und der jeweiligen Warteschlange hinzugefügt.

Ein Ehrenknoten hat das Privileg, innerhalb eines bestimmten Zeitraums, der durch den Plattformparameter **full_nodes** und einen speziellen Algorithmus bestimmt wird, neue Blöcke zu generieren. Ehrenknoten rufen Transaktionen aus Warteschlangen ab und senden sie an den Blockgenerator. Beim Generieren eines neuen Blocks werden auch Transaktionen in einem solchen Block verarbeitet: Jede Transaktion wird an eine virtuelle Maschine gesendet, wo der Vertrag entsprechend den Transaktionsparametern implementiert wird, wodurch Datensätze in der Datenbank aktualisiert werden.

Neue Blöcke sollten überprüft werden, um sicherzustellen, dass keine Fehler vorliegen, bevor sie an andere Ehrenknoten in anderen Netzwerken gesendet werden.

Ein neuer Block wird der Blockwarteschlange hinzugefügt, wenn er von einem anderen Ehrenknoten empfangen wird, und nach Überprüfung der Blockchain des Ehrenknotens, wo er sich befindet, um Transaktionen in dem Block zu verarbeiten und dadurch Datensätze in der Datenbank zu aktualisieren.

### Transaktionsverifizierung {#block-and-transaction-verification}

Nach dem Generieren oder Empfangen eines neuen Blocks wird dieser auf allen anderen Ehrenknoten verifiziert, die Folgendes abdecken:

* Das erste Byte der empfangenen Daten sollte 0 sein. Andernfalls werden die empfangenen Daten nicht als Block betrachtet;

* Der Zeitstempel der empfangenen Blockgenerierung sollte vor dem aktuellen Zeitstempel liegen;

* Der Zeitstempel der Blockerzeugung sollte dem Zeitintervall entsprechen, in dem der Ehrenknoten das Recht hat, neue Blöcke zu erzeugen;

* Die Höhe eines neuen Blocks sollte größer sein als die Höhe des größten Blocks in der bestehenden Blockchain;

* Es darf die maximal zulässigen Ausgaben für alle Transaktionen im Block nicht überschreiten;

* Der Block muss ordnungsgemäß mit dem geheimen Schlüssel des Knotens signiert sein, auf dem er sich befindet. Die Signaturdaten sollten enthalten:

  * Die Höhe des Blocks, der Hash des vorherigen Blocks, der Zeitstempel des Blocks, die ID des Ökosystems, in dem sich der Block befindet, und die Kontoadresse des Ehrenknotens des Blocks;

  * Die Position des Ehrenknotens im Array full_nodes des Plattformparameters, die Merkel Root (MrklRoot) aller Transaktionen im Block und der Revert-Hash des vorherigen Blocks.

Um die Korrektheit jeder Transaktion im Block mit den folgenden Methoden zu überprüfen:

* Der Hash jeder Transaktion muss eindeutig sein;

* Eine schlüsselsignierte Transaktion kann das Limit nicht überschreiten ([max_tx_block_per_user](../reference/platform-parameters.md#max-tx-block-per-user));

* Es darf die Grenze der maximalen Transaktionsgröße nicht überschreiten ([max_tx_size](../reference/platform-parameters.md#max-tx-size));

* Die Transaktionszeit darf weder größer als die Blockgenerierungszeit noch größer als die Blockgenerierungszeit plus 600 Sekunden sein und darf nicht kleiner als die Blockgenerierungszeit minus 86400 Sekunden sein;

* Die Transaktion muss ordnungsgemäß unterzeichnet werden;

* Der Benutzer, der den Vertrag umsetzt, muss genügend Token auf seinem Konto haben, um die Transaktionskosten zu bezahlen.

### Datenbank {#database}
 
 Die zugrunde liegende Datenspeicherschicht des IBAX-Netzwerks ist eine vollständig öffentlich zugängliche „`PGSQL`-Datenbank. Basierend auf dem Berechtigungsdesign der IBAX Operating System Platform müssen sich Benutzer keine Sorgen um die Datensicherheit machen. Mit einer objektorientierten Designphilosophie kompiliert IBAX Network Daten über eine relationale PGSQL-Datenbank vor und verbessert die Datenverarbeitungseffizienz.

Das Folgende könnte Sie interessieren, wenn Sie ein technischer Spezialist sind, oder überspringen Sie es einfach, wenn Sie es nicht sind.
①Alle Tische ohne Zahlenpräfix im Namen gehören zu Berechtigungstabellen von IBAX Network Basic; 
② Alle Tabellen mit einem Zahlenpräfix im Namen gehören zu Berechtigungstabellen von ecoLibs.

## ECOLIB {#ecolib}

Es ist für Benutzer, sogar normale Benutzer, ganz einfach, eine eigene ecoLib auf der IBAX Network System Platform zu erstellen. Wir haben eine Anwendung integriert und entwickelt, bei der die Erstellung von ecoLibs nur einen Klick erfordert.

Beim Erstellen einer ecoLib können Sie die Ökosystemparameter und -regeln konfigurieren und das Administratorkonto und das Abrechnungsmodell festlegen. Um den DPoA-Konsens innerhalb von ecoLibs besser anwenden zu können, können Ersteller ihn am wichtigsten einrichten, indem sie ihre eigenen Verträge schreiben oder importieren.

Wir unterstützen die schnelle Ausgabe von ecoLib-Token durch den Import von Vertragsvorlagen.

Aufgrund der Unterschiede in Konsens- und Verwaltungsberechtigungen fallen ecoLibs in dezentralisierte und zentralisierte. Sie haben keine spezifischen Vor- oder Nachteile je nach Typ. Sie sollten das passende für Ihre Serviceanforderungen auswählen. Was tun, wenn es im Moment OK ist, aber nicht für die Zukunft? Sie können ecoLib-Parameter, sogar den Konsensmechanismus, das Token und die Governance-Methode, auf der IBAX Network System Platform ändern. Sie können alles dem Selbstverwaltungsmechanismus überlassen, der vom ecoLib-Administrator oder Mitgliedern (je nach ecoLib-Typ) gepflegt wird.

Auf der IBAX Network System Platform verfügt eine ecoLib über vollständige Datenkontrollberechtigungen und Berechtigungen zum Entwerfen und Zugreifen auf unabhängige Datenbanktabellen und -felder. Im Berechtigungsdesign der Datenkontrolle unterstützen wir das Auslösen, wenn ein Feld einen logischen Ausdruck erfüllt. Diese Funktion bietet Raum für Fantasie bei speziellen Diensten wie Überwachung, Logikbefriedigung und Triggerung nach Zeit und bestimmten Bedingungen.

Es kann mehrere DApps in einer ecoLib geben, und jede von ihnen kann unabhängige Parameter haben. Eine ecoLib ist wie eine Plattform, auf der Sie alles implementieren können, was Sie wollen.

Um Entwickler von Ökosystemen besser zu unterstützen, stellen wir das Bearbeitungs-, Verwaltungs- und Entwicklungstool Weaver zur Verfügung. Es wird die Kosten für die Entwicklung, Wartung und Verwaltung des Ökosystems erheblich reduzieren.

### IDE {#ide}

Weaver verfügt über eine vollständig integrierte Entwicklungsumgebung (IDE) zum Erstellen von Blockchain-Anwendungen, die von Softwareentwicklern kein tiefes Verständnis der Blockchain-Technologie erfordert.

Weaver bietet ein Tabellenverwaltungstool, einen Vertragseditor, einen Seiteneditor und andere Funktionen, die zum Erstellen von Anwendungen im Ökosystem ohne die Unterstützung eines Softwaremoduls erforderlich sind.

Die IDE umfasst hauptsächlich die folgenden Teile:

* Liste der Ökosystemparameter;

* Vertragsredakteur;

* Tabellenverwaltungstool;

* Seiteneditor und visueller Seitendesigner;

* Editor für mehrsprachige Ressourcen;

* Import-/Exportfunktionen für Anwendungen.

### Anwendungen {#applications}

Eine Anwendung ist eine Sammlung von Elementen wie Datenbanktabellen, Smart Contracts und Benutzerseiten mit Zugriffsrechten für die Konfiguration. Das Ökosystem, zu dem das Anwendungselement gehört, wird durch das Präfix im Elementnamen angegeben, z. B.`@1ElementName`, wobei die Ökosystem-ID durch die Zahl `1` nach dem Symbol `@` angegeben wird. Bei der Verwendung von Anwendungselementen im aktuellen Ökosystem kann das Präfix `@1` weggelassen werden. Diese Anwendungen können nützliche Funktionen ausführen oder verschiedene Dienste implementieren.

### Tische {#tables}

In der Datenbank von IBAX kann jedes Ökosystem eine unbegrenzte Anzahl von Tabellen erstellen. Tabellen eines bestimmten Ökosystems können durch ein Präfix identifiziert werden, das die Ökosystem-ID enthält, die in Weaver nicht angezeigt wird.

Ein Tisch ist in keiner Weise gebunden und gehört zu einem bestimmten Vertrag. Sie kann von allen Anwendungen im Rahmen der Zugriffsrechte der Tabelle genutzt werden.

Jedes Ökosystem kann einen Satz von Datentabellen zum Entwickeln seiner Anwendungen erstellen oder möglicherweise auf Datentabellen anderer Ökosysteme zugreifen, indem es das Tabellennamenpräfix angibt.

Durch die Konfiguration von Zugriffsrechten durch intelligente Gesetze werden Daten in Tabellen protokolliert. Intelligente Gesetze werden für die Rechteverwaltung verwendet.

 >  Tabellenverwaltungstool

Sie finden das Tabellenverwaltungstool im Weaver-Menü Tabelle, das die folgenden Funktionen abdeckt:

* Zeigen Sie die Liste der Tabellen und ihrer Einträge an;

* Erstellen Sie neue Tabellen;

* Fügen Sie ein Tabellenfeld hinzu und geben Sie seinen Datentyp an, z 
  - `Text` correspond `postgresql` `text`
  - `Date/Time` correspond `postgresql` `timestamp`
  - `Varchar` correspond `postgresql` `varchar(102400)`
  - `Character` correspond `postgresql` `character(1) NOT NULL DEFAULT '0'`
  - `JSON` correspond `postgresql` `jsonb`
  - `Number` correspond `postgresql` `bigint NOT NULL DEFAULT '0'`
  - `Money` correspond `postgresql` `decimal (30, 0) NOT NULL DEFAULT '0'`
  - `Double` correspond `postgresql` `double precision`
  - `Binary` correspond `postgresql` `bytea NOT NULL DEFAULT '\x'`

* Verwalten Sie Berechtigungen zum Einfügen, Aktualisieren von Daten und Ändern der Tabellenstruktur.

> Manipulation von Tabellendaten

Für eine bessere Datenbankmanipulation haben sowohl Needle als auch Logicor die Funktion **DBFind**, die verwendet wird, um Werte und Datenarrays aus Tabellen abzurufen.

Die Funktion **DBInsert** der Vertragssprache dient zum Hinzufügen von Einträgen zu Tabellen. Die Funktionen **DBUpdate** und **DBUpdateExt** werden verwendet, um den Wert eines vorhandenen Eintrags zu aktualisieren. Während der Aktualisierung werden die entsprechenden Daten in den Tabellen aktualisiert, und die Blockchain fügt neue Transaktionen hinzu, während alle historischen Transaktionen beibehalten werden. Daten in Tabellen können nur geändert und nicht gelöscht werden.

Um die Vertragsimplementierungszeit zu minimieren, kann die **DBFind**-Funktion nicht mehrere Tabellen gleichzeitig abfragen, und JOIN wird nicht unterstützt. Daher empfehlen wir, Anwendungstabellen nicht zu normalisieren, sondern alle verfügbaren Informationen in Einträgen zu speichern oder die verfügbaren Informationen in anderen Tabellen zu wiederholen. Dies ist nicht obligatorisch, aber für eine Blockchain-Anwendung erforderlich. In diesem Fall sollten Daten vollständig gespeichert werden, die nicht aktualisiert werden können, selbst wenn dieselben Daten in anderen Tabellen aktualisiert werden, obwohl sie in einer relationalen Datenbank synchron aktualisiert werden.

### Ökosystem Parameter {#ecosystem-parameters}

Sie können die Liste der Ökosystemparameter (**1_parameters**) im Weaver-Menü anzeigen und bearbeiten. Ökosystemparameter können in folgende Gruppen eingeteilt werden:

* Allgemeine Parameter: das Konto des Erstellers des Ökosystems (founder_account) und andere Informationen;

* Parameter für Zugriffsrechte: werden verwendet, um Zugriffsberechtigungen für Anwendungselemente zu definieren

     * Ändern Sie die Tabellenstruktur (changing_tables);

     * den Vertrag ändern (changing_contracts);

     * Benutzerseite wechseln (changing_page);

     * das Menü ändern (changing_menu);

     * Ändern Sie die mehrsprachigen Ressourcen (changing_language).

* Technische Parameter: verwendet, um die Benutzerstile (Stylesheet) zu definieren;

* Benutzerparameter: werden verwendet, um Konstanten oder Listen (durch Kommas getrennt) zu definieren, die für den Anwendungsbetrieb erforderlich sind.

Sie können die Bearbeitungsberechtigung für Parameter jedes Ökosystems angeben.

Sie können die Funktion EcosysParam verwenden, um den Wert eines Ökosystemparameters abzurufen, indem Sie ihm den Titel des Ökosystemparameters als Parameter übergeben.

## Kontrollmechanismus für Zugriffsrechte {#access-rights-control-mechanism}
IBAX verfügt über ein mehrstufiges Zugriffsberechtigungsverwaltungssystem. Durch die Konfiguration von Zugriffsrechten können Sie beliebige Anwendungselemente wie Verträge, Tabellen, Benutzerseiten und Ökosystemparameter erstellen und ändern. Sie können die Zugriffsrechte auch über die Konfiguration ändern.

Standardmäßig werden alle Rechte im IBAX-Ökosystem von seinem Ersteller verwaltet, der im MainCondition-Vertrag jedes Ökosystems definiert ist. Aber nach der Schaffung intelligenter Gesetze kann die Zugriffskontrolle auf alle oder eine Gruppe von Ökosystemmitgliedern übertragen werden.
Kontrolle der Zugriffsrechte

Die Zugriffsrechte werden in Vertragstabellen (**1_contracts** ), Datentabellen (**1_tables** ), Benutzerseitentabellen (**1_pages** ), Menütabellen (**1_menu** ) und Codeblöcken definiert Tabellen (**1_blocks** ). Die entsprechenden Menüs finden Sie in Weaver.

### Zugriffsrechteverwaltung {#access-rights-management}

Die Regeln der Zugriffsrechte werden konfiguriert, indem die entsprechenden Vertragsausdrücke **ContractConditions(“@1MainCondition”)**, **ContractAccess(“@1MainCondition”)** oder logische Ausdrücke im Berechtigungsfeld ausgefüllt werden. Wenn das Ergebnis des Anforderungsausdrucks erfolgreich ist (true), wird der Zugriff gewährt. Andernfalls wird der Zugriff verweigert und zugehörige Operationen werden beendet.

Der einfache Weg, Rechte zu definieren, besteht darin, einen logischen Ausdruck in das rechte Feld einzugeben. Beispiel: `$key_id == 8919730491904441614` wobei **$keyid** die ID eines Ökosystemmitglieds darstellt.

Die gebräuchlichste und empfohlene Methode zum Definieren von Rechten ist die Verwendung der Funktion `ContractConditions("@1ContractsName1","@1ContractsName2")`. Der Vertragsname **ContractsName** wird als Parameter an die Funktion übergeben, und das Vertragsergebnis muss das Ergebnis eines logischen Ausdrucks (true oder false) sein.

Eine andere Möglichkeit, Rechte zu definieren, ist die Verwendung der Funktion `ContractAccess("@1ContractsName3","@1ContractsName4")`. Als Parameter kann der Funktion der Vertrag **ContractsName** übergeben werden, der zur Implementierung der entsprechenden Operation qualifiziert ist. Wenn beispielsweise das rechte Feld der Betragsspalte als `ContractAccess("@1TokenTransfer")` konfiguriert ist, dann können Sie den Vertrag **@1TokenTransfer** nur implementieren, wenn Sie den Wert in der Betragsspalte ändern möchten. Das Zugriffsrecht auf den Vertrag selbst kann im Bereich Bedingungen verwaltet werden, der ziemlich komplex ist und viele andere Verträge enthalten kann.

### Exklusive Rechte {#exclusive-rights}
Bei Notfällen oder Situationen, die für den Betrieb eines Ökosystems kritisch sind, gibt es viele spezielle Parameter in der Liste der Ökosystemparameter (**1_parameters**) (wie *changing_contracts*, *changing_pages* ) usw., die definiert Zugriffsrechte auf alle Verträge, Datentabellen und Seiten des aktuellen Ökosystems. Diese Rechte werden durch Schlüsselverträge konfiguriert.

## Virtuelles privates Ökosystem {#virtual-private-ecosystem}

In IBAX können Sie ein virtuelles privates Ökosystem erstellen – **Cross Ledgers Base (CLB)**. Ein CLB hat die volle Funktionalität des Standard-Ökosystems, arbeitet aber außerhalb der Blockchain. In CLB können Sie Verträge und Vorlagensprachen sowie Tabellen verwenden und erstellen und mit Weaver Anwendungen erstellen. Sie können Verträge im Blockchain-Ökosystem über die API aufrufen.

### Anfragen an Webressourcen {#requests-to-web-resources}

    Der Hauptunterschied zwischen einem CLB und einem Standard-Ökosystem besteht darin, dass Sie Vertragsfunktionen ([HTTPRequest](../topics/script.md#httprequest)) und ([HTTPPostJSON](../topics/script.md#httppostjson )) jede Webressource innerhalb des Vertrags über HTTP/HTTPS-Anfragen anzufordern. Zu den an diese Funktion übergebenen Parametern gehören: URLs, Anforderungsmethoden (GET oder POST), Anforderungsheader und Anforderungsparameter.

### Rechte zum Lesen von Daten {#rights-to-read-data}

Obwohl es lesbar ist, werden Daten in CLB nicht in der Blockchain gespeichert. Sie können die Leseberechtigung für Datenbanktabellen erteilen. Sie können Leserechte für einzelne Spalten oder für jede Zeile mit einem speziellen Vertrag festlegen.

### CLB Schaffung {#clb-creation}

Sie können einen CLB-Knoten im Netzwerk erstellen. Wie vordefiniert, ist der CLB-Knotenadministrator berechtigt, die Ökosystemliste mit der CLB-Funktionalität zu verwenden und einen Benutzer mit Ökosystemerstellerrechten zu benennen, um Anwendungen zu installieren, neue Mitglieder zu erhalten und die Ressourcenzugriffsberechtigungen zu konfigurieren.

### CLB Verwendung {#clb-usage}

Sie können einen CLB verwenden, um Registrierungsformulare zu erstellen, Verifizierungsinformationen per E-Mail oder Telefon an Benutzer zu senden und öffentlich zugängliche Daten zu speichern. Sie können Anwendungen schreiben und testen und sie dann in das Blockchain-Ökosystem importieren. In einem CLB können Sie Planungsvertragsaufgaben verwenden, Oracle-Maschinen erstellen, um Daten von Webressourcen zu empfangen, und diese Daten an das Blockchain-Ökosystem senden.
