# Tutorial für die Anwendungsentwicklung {#tutorial-for-application-development}

In diesem Abschnitt zeigen wir Ihnen, wie Sie eine einfache Anwendung im IBAX-Netzwerk entwickeln.
- [Das Ziel](#the-goal)
   - [Teil 1: Die Umwelt](#part-1-the-environment)
   - [Teil 2: Vertrag](#part-2-contract)
     - [Creator-Konto](#creator-account)
     - [Neuer Antrag](#new-application)
     - [Neue Datenbanktabelle](#new-database-table)
     - [Neuer Vertrag](#new-contract)
       - [Vertragscode](#contract-code)
       - [Vertrag erstellen](#create-a-contract)
       - [Vertragsname](#contract-name)
       - [Daten](#data)
       - [Bedingungen](#conditions)
       - [Aktion](#action)
       - [Vollständiger Vertragscode](#full-contract-code)
       - [Speichern und ausführen](#save-and-run)
  - [Teil 3: Seite](#part-3-page)
     - [Neues Feld](#new-field)
     - [Vertrag aktualisieren](#update-the-contract)
     - [Seite](#page)
       - [Designer-Ansichten](#designer-views)
       - [Entwickleransicht](#developer-view)
       - [Daten aus der Datenbanktabelle holen](#fetch-data-from-the-database-table)
       - [Seite speichern](#save-the-page)
  - [Teil 4: Bewerbung](#part-4-application)
     - [Menü](#menu)
       - [Einen Menüpunkt hinzufügen](#add-a-menu-item)
       - [Neues Menüelement testen](#test-the-new-menu-item)
     - [Nachricht senden](#send-a-message)
       - [Formular](#form)
     - [Formularnavigation](#form-navigation)
       - [Navigationsschaltflächen](#navigation-buttons)
       - [Variablen](#variables)
       - [Anzahl der Einträge](#entry-count)
       - [Tabellenoffset](#table-offset)
       - [Schaltflächencode](#button-code)
       - [Seitenaktualisierung](#page-refreshing)
   - [Schlussfolgerungen](#conclusions)

## Das Ziel {#the-goal}

Die Anwendung beginnt mit einfachen Funktionen, wird aber im Laufe des Tutorials immer komplexer.

In der endgültigen Version der Anwendung werden einige einfache Nachrichten (Strings) in einer Datenbanktabelle gespeichert, die die Zeitstempel und Kontokennungen der Absender enthält. Benutzer können die Nachrichtenliste anzeigen und eine neue Nachricht von der Anwendungsseite hinzufügen, auf die über das Menü des Ökosystems zugegriffen werden kann.
## Teil 1: Die Umwelt {#part-1-the-environment}

**Weber**

Als einziger Client von IBAX stellt Weaver Funktionen für alle Benutzer und Ökosystemrollen bereit. Damit können Anwendungsentwickler ihre Anwendungen entwickeln und testen, Ökosystemadministratoren können ihre Ökosysteme verwalten, während Benutzer mit den Ökosystemen interagieren können.

In diesem Tutorial codieren Sie Verträge, Seitenvorlagen und führen alle anderen Aktionen in Weaver aus. Weaver bietet auch eine Möglichkeit, Vertragscodes wiederherzustellen, zu speichern und auszuführen, Datenstrukturen (Datenbanktabellen) zu verwalten, Zugriffsberechtigungen zuzuweisen und Anwendungen zu erstellen.

Jeder Knoten hat seine eigene Weaver-Instanz.
## Teil 2: Vertrag {#part-2-contract}

Ihre erste einfache Anwendung ist „Hello, World!“.

> Hinweis

> In dieser Anwendung werden Zeichenfolgen in einer Datenbanktabelle gespeichert, und es gibt keine Benutzerseite.

### Creator-Konto {#creator-account}

Konten mit der Entwicklerrolle werden die „Root“-Privilegien des Ökosystems zugewiesen. Standardmäßig kann diese Rolle auf alle Aktionen zugreifen. In einem neuen Ökosystem wird dem Erstellerkonto die Admin-Rolle zugewiesen, die Sie verwenden müssen, um größere Änderungen am Ökosystem vorzunehmen, z. B. das Erstellen neuer Anwendungen und Datenbanktabellen.

Melden Sie sich mit dem Erstellerkonto beim Ökosystem an.
### Neue Bewerbung {#new-application}

Sobald Sie sich als Ersteller des Ökosystems angemeldet haben, können Sie eine neue Anwendung erstellen.

Erstellen Sie eine neue Anwendung:
1. Gehen Sie zur Registerkarte Entwickler;

  2. Wählen Sie Anwendung im Menü auf der linken Seite;

  3. Wählen Sie Neu auf der Anwendungsseite;

  4. Geben Sie den Anwendungsnamen im Feld Name an;

  5. Bedingungen auf `true` setzen;

  `true` bedeutet, dass jeder Änderungen an der Anwendung vornehmen kann;

  Eine weitere Option ist `ContractConditions("MainCondition")`, was bedeutet, dass niemand außer dem Ersteller Änderungen an der Anwendung vornehmen kann.

  6. Ihre Anwendung wird in der Anwendungsliste angezeigt, klicken Sie auf das Namensfeld einer bestimmten Anwendung, um sie zu aktivieren.
  > Hinweis

> Sie können auf relevante Ressourcen zugreifen, indem Sie auf der Registerkarte „Entwickler“ auf eine Anwendung klicken, ohne Auswirkungen auf das Ökosystem. Egal für welche Sie sich entscheiden, alle Ökosystemanwendungen sind weiterhin verfügbar.

### Neue Datenbanktabelle {#new-database-table}
Erstellen Sie zum Speichern der Daten eine Datenbanktabelle für die Anwendung in Weaver.

Erstellen Sie eine Datentabelle:

  1. Wählen Sie auf der Registerkarte „Entwickler“ Anwendung – Name > Datenbanktabelle;

  Hier werden alle Datenbanktabellen zur ausgewählten Anwendung angezeigt. Wenn die Liste leer ist, wurden noch keine Datenbanktabellen für Ihre Anwendung erstellt.

  2. Klicken Sie auf Neu;

  Weaver zeigt Ihnen die Seite zum Erstellen einer neuen Datenbanktabelle.

  3. Geben Sie den Namen im Feld Name an;
  In diesem Tutorial lautet der Name der Datenbanktabelle `apptable`.

  4. Fügen Sie die Spalte `message` hinzu, legen Sie ihren Typ als `Text` fest;

    Diese Tabelle muss zwei Spalten haben: `id` (vordefiniert) und `message`. Sie werden später weitere Spalten hinzufügen.

  5. Setzen Sie in Bezug auf die Lese- und Schreibberechtigungen jedes Feld auf `true`;

    Dies ermöglicht es jedem, Einträge in die Datenbanktabelle einzufügen, zu aktualisieren, Spalten hinzuzufügen und Eintragsdaten zu lesen;

    Optional können Sie die Lese- und Schreibrechte für das Erstellerkonto reservieren. Setzen Sie in diesem Fall dieses Feld auf `ContractConditions("MainCondition")`.
### Neuer Vertrag {#new-contract}

#### Vertragscode {#contract-code}

Jeder Vertrag besteht aus drei Teilen. Weitere Einzelheiten finden Sie unter: [Contract scructure](../topics/script.md#contract-structure)。

#### Vertrag erstellen {#create-a-contract}
1. Wählen Sie auf der Registerkarte „Entwickler“ Anwendung – Name > Vertrag;

  Hier werden alle Verträge im Zusammenhang mit der Bewerbung angezeigt. Bei Neuanmeldungen ist die Liste leer.

2. Klicken Sie auf Neu;

  Im Editor wird eine neue Vertragsvorlage angezeigt.

Eine leere Vertragsvorlage wird wie folgt angezeigt:


```
contract ... {
    data {

    }
    conditions {

    }
    action {

    }
}
```
#### Vertragsname {#contract-name}

Bitte geben Sie zunächst den Vertragsnamen an.


```  
    contract AppContract {

    }
```
#### Daten {#data}

Füllen Sie den Abschnitt `data` aus.

Im folgenden Beispiel bezieht sich `message` auf den Variablennamen, während `string` auf den Variablentyp verweist.

```
    data {
        Message string
    }
```
#### Bedingungen {#conditions}

Füllen Sie den Abschnitt "`condition`" aus. Eine einfache Überprüfungsbedingung besteht darin, leere Zeichenfolgen zu vermeiden. Wenn die Länge von `Message` `0` ist, wird eine vordefinierte Warnmeldung bei der Ausführung des Vertrags ausgelöst.

```
conditions {
    // avoid writing empty strings
    if Size($Message) == 0 {
        error "Message is empty"
    }
}
```
#### Handlung {#action}

Füllen Sie den Abschnitt `action` aus. Eine einfache Aktion besteht darin, `Message` in die Datentabelle zu schreiben.

```
    action {
        DBInsert("apptable", {message: $Message})
    }
```
#### Vollständiger Vertragscode {#full-contract-code}

Der vollständige Vertragscode wird unten angezeigt.

Alle Verträge in IBAX werden so aufgebaut, einschließlich der Abschnitte `data`, `condition` und `action`.

```
contract AppContract {
    data {
        Message string
    }
    conditions {
        // avoid writing empty strings
        if Size($Message) == 0 {
            error "Message is empty"
        }
    }
    action {
        DBInsert("apptable", {message: $Message})
    }
}
```
#### Speichern und ausführen {#save-and-run}

Jetzt bereiten wir uns darauf vor, den Vertrag zu testen:

1. Klicken Sie im Menü des Editors auf Speichern;

  Dadurch wird der Vertragscode aktualisiert und die aktualisierte Version steht allen Netzwerkknoten zur Verfügung.

2. Klicken Sie im Menü des Editors auf Ausführen;

  Dadurch wird die Seite Vertrag ausführen angezeigt.

3. Geben Sie auf der Seite Vertrag ausführen die Eingabeparameter des Vertrags ein; 

 Da dieser Vertrag einen Parameter `Message` hat, setzen Sie `Message` im feld schlüssel und `Hello, World` im feld wert.

4. Click run.

  The result will be displayed at the right.

If successfully added some strings, then, the result will contain the block ID and result code to introduce the change of transactions.

```
{
 "block": "31",
 "result": null
}
```
## Teil 3: Seite {#part-3-page}

Wenn der Vertrag in Kraft tritt, ist es an der Zeit, ihn um etwas Sinnvolles zu erweitern. In diesem Teil implementieren Sie die Benutzeroberfläche und andere Funktionen.

Klasse

In dieser Anwendung werden Zeichenfolgen wie Einträge in einem Protokoll in einer Datenbanktabelle gespeichert. Jede Zeichenfolge hat einen Autor und einen Zeitstempel.

Benutzer können die Liste der auf der Anwendungsseite gespeicherten Zeichenfolgen anzeigen, die dann als einfaches Formular angezeigt wird.

### Neues Feld {#new-field}

Bearbeiten Sie wie zuvor die Datenbanktabelle auf der Registerkarte Entwickler > Anwendung - Name > Seite Datenbanktabelle;

* Fügen Sie die folgenden Felder in `apptable` hinzu:

* `author`, Feldtyp `number`, setze Change auf `true`;

* Dieses Feld speichert die Kennung des Autorenkontos.

* `timestamp` , Feldtyp `Date/Time`, setze Change auf `true`.

### Aktualisieren Sie den Vertrag {#update-the-contract}

Wir werden den Vertragscode aktualisieren, um die Autoren-ID und den Zeitstempel zu verarbeiten.

Die Autoren-ID ist die Konto-ID des Ökosystems. Der Zeitstempel ist das Datum und die Uhrzeit der Vertragsausführung im Unix-Zeitformat.

Da beide Werte von den [Predefined variables](../topics/script.md#variables) bereitgestellt werden und die vordefinierten Variablen nicht eingegeben oder überprüft werden müssen, können sie nur im Aktionsteil aktualisiert werden.

Aktualisieren Sie den Vertrag, um die Autoren-ID und den Zeitstempel in die Datenbanktabelle zu schreiben, wenn Sie eine Nachricht hinzufügen, wobei die Autoren-ID durch `$key_id` definiert wird, während der Zeitstempel durch `$time` definiert wird.

```
action {
 DBInsert("apptable", {message: $Message, author: $key_id, timestamp: $time})
}
```
### Buchseite {#page}

Bei der Anwendungsseite handelt es sich um eine einfache Seite, auf der die in der Datenbanktabelle gespeicherten Nachrichten angezeigt werden.

Wie alle anderen Ressourcen können Sie die UI-Seite in Weaver erstellen:

1. Navigieren Sie zur Registerkarte Entwickler, klicken Sie auf Anwendung – Name > Seite;

2.Klicken Sie auf Neu;
  Der visuelle Designer wird in einem neuen Tab geöffnet.

#### Designeransichten {#designer-views}
Die Standardseite ist leer. Sie können die vordefinierte Struktur verwenden, um die Seite schnell auszufüllen.

Erstellen Sie eine einfache Tabelle:

1. Klicken Sie in der Ansichtsauswahl rechts auf Designer;
  Die Ansicht wird auf den visuellen Designer umgeschaltet.

2. Wählen Sie im Menü links Tabelle mit Kopfzeile und ziehen Sie sie auf die Seite.
     Auf der Seite wird eine Tabelle mit mehreren Elementen angezeigt.
#### Entwickleransicht

Da die Benutzerseite von IBAX mit einer [Template Language](../topics/templates2.md) codiert ist, wechseln Sie bitte beim Schreiben des Seitencodes in die Entwickleransicht.

Wechseln Sie in die Entwickleransicht.

1. Klicken Sie in der Ansichtsauswahl rechts auf Entwickler.

  Die Ansicht wird auf den Editor mit einem Reiter umgeschaltet, der den Seitencode enthält.

#### Daten aus der Datenbanktabelle holen {#fetch-data-from-the-database-table}

Bisher nichts mit der Seitenvorlage gemacht. Als Nächstes werden wir den Code aktualisieren, damit die Seite Daten von `apptable` anzeigen kann.
1. Anfordern von Daten aus der Datenbanktabelle mit der Funktion [DBFind](../topics/script.md#dbfind);

  Im folgenden Beispiel wird dieser Funktionsaufruf verwendet, um Daten aus `apptable` abzurufen. Die Daten werden in die Quelle `src_table` gestellt und nach dem Zeitstempelfeld sortiert. `src_table` wird später als Datenquelle für die Seite in der Tabellenansicht verwendet.

 ```
    DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)
 ```

2. Um die Daten aus `src_table` anzuzeigen, geben Sie diese als Datenquelle und den Header in der `Table`-Funktion an.

```
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
```

3. Klicken Sie rechts in der Ansichtsauswahl auf Vorschau, um zu prüfen, ob die Daten korrekt angezeigt werden.

#### Ganzseitiger Code {#full-page-code-1}

Das Folgende ist der ganzseitige Code für diesen Teil. Diese Basisseite wird später erweitert.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)

Div(Class: panel panel-primary) {
    Div(Class: panel-heading, Body: Table block)
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
    Div(Class: panel-footer text-right) {
    Button(Class: btn btn-primary, Contract: ContractName, Body: More)
    }
}

```
#### Seite speichern {#save-the-page}

Klicken Sie auf Speichern, um die Seite zu speichern:

1. Geben Sie `AppPage` oder einen anderen Namen für die Seite im Feld „Seitenname“ an;

2. Wählen Sie `default_menu` im Menü;

3. Bedingungen auf `true` setzen;

4. Klicken Sie auf OK.

## Teil 4: Bewerbung {#part-4-application}

In den vorherigen Abschnitten haben Sie einen Vertrag, eine Tabelle zum Speichern von Daten und eine einfache UI-Seite zum Anzeigen dieser Daten erstellt.

In diesem Teil werden Sie die Anwendung fertigstellen, damit ihr Aussehen und ihre Aktionen denen einer tatsächlichen ähneln.

### Speisekarte {#menu}

Die Seite muss mit einem Menü verknüpft sein, z. B. ist `default_page`, das auf der Registerkarte „Startseite“ angezeigt wird, mit dem standardmäßigen Ökosystemmenü `default_menu` verknüpft.

Da dieses Anwendungs-Tutorial sehr einfach ist (nur eine Seite hat), muss dafür kein separates Menü erstellt werden. Der neue Menüpunkt im Standardmenü genügt.

> Hinweis

> Sie können das Seitenmenü definieren, indem Sie die Seiteneigenschaften auf der Registerkarte Entwickler > Anwendung - Name > Seite bearbeiten. Wenn Ihre App beispielsweise mehrere Seiten hat, müssen Sie möglicherweise ein Menü erstellen, um zwischen diesen Seiten zu navigieren, und es allen Seiten der App zuweisen.

#### Menüpunkt hinzufügen {#add-a-menu-item}

Wie alle anderen Ressourcen können Menüs in Weaver erstellt und bearbeitet werden:

1. Navigieren Sie zur Registerkarte Entwickler > Menü;

2. Klicken Sie auf den Namen des Eintrags `default_menu`;

  Im Editor wird ein neuer Tab geöffnet.

3. Fügen Sie am Ende der Vorlage einen neuen Menüpunkt hinzu, der zum Öffnen der Anwendungsseite verlinkt wird und dessen Symbol aus dem Symbolsatz [FontAwesome](https://fontawesome.com/icons) stammt.

```
    MenuItem(Title:Messages, Page:AppPage, Icon:"fa fa-envelope")
```
4. Klicken Sie auf Speichern.

#### Testen Sie das neue Menüelement {#test-the-new-menu-item}

Prüfen Sie, ob der neue Menüpunkt gültig ist:

1. Öffnen Sie die Registerkarte Startseite;

2. Klicken Sie im Menü auf Aktualisieren;

     Ein Eintrag mit einer Kopfzeile von Nachrichten wird angezeigt;

3. Klicken Sie auf Nachrichten.

     Die Bewerbungsseite wird geöffnet.

### Eine Nachricht schicken {#send-a-message}

Die Schaltflächen in Logicor können je nach Parameter zum Ausführen von Verträgen und Aufrufen von Seiten verwendet werden.
Die Funktion [Button](../topics/templates2.md#button) hat zwei Vertragsparameter:

* `Contract`.

      Name des aktivierten Vertrags.

* `Params`

     Eingabeparameter des Vertrags.

#### Form {#form}

Um Daten an den Vertrag zu senden, fügen Sie auf der Antragsseite ein Formular hinzu, das über ein Eingabefeld für eine Nachricht und einen Button zur Aktivierung des Vertrags AppContract verfügen muss.

Im Folgenden finden Sie ein Beispiel für diese Art von Formular. Es ist in einem eigenen [Div](../topics/templates2.md#div) verschachtelt. Platzieren Sie es nach dem Div-Element, das die Formularansicht enthält, wodurch definiert wird, dass das Feld [Input](../topics/templates2.md#input) einen vordefinierten Namen `message_input` hat. Die Schaltfläche verwendet diesen Namen, um den Wert von `message` an den Vertrag zu senden. Schließlich wird die Funktion [Val](../topics/templates2.md#calling-contracts) verwendet, um den Wert des Eingabefelds zu erhalten.

```
Div(Class: panel panel-primary) {
 Form() {
 Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
 Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)")
 }
}
```

Möglicherweise stellen Sie fest, dass das Formular beim Testen dieser neuen Funktion durch Senden einer Nachricht nicht aktualisiert wird. Dies wird in [Seitenaktualisierung](#page-refreshing) eingeführt.

### Formularnavigation {#form-navigation}

In der Standardansicht kann das Formular auf der Seite nur 25 Einträge auf der ersten Seite anzeigen. Daher können Sie einige einfache Schaltflächen hinzufügen, um Benutzer zu allen Formulareinträgen zu navigieren.
#### Navigationstasten {#navigation-buttons}

Es wird zwei Navigationsschaltflächen geben, und jede von ihnen könnte die Anwendungsseite neu laden und die Parameter an sie übergeben.

* Die Schaltfläche Zurück zeigt die ersten 25 Einträge an. Wenn keine weiteren Einträge vorhanden sind, wird die Schaltfläche nicht angezeigt;

* Die Schaltfläche Weiter zeigt die nächsten 25 Einträge an. Wenn keine weiteren Einträge vorhanden sind, wird die Schaltfläche nicht angezeigt.
#### Variablen {#variables}

Die Navigationsschaltflächen erfordern zwei Variablen zum Speichern der Tabellenansichtszustände:


*  `#table_view_offset#`

Diese Variable speichert den Offset der aktuellen Tabellenansicht.

Die Navigationsschaltflächen übergeben es als Parameter, wenn die Seite neu geladen wird.

*  `#record_count#`

Diese Variable speichert die Gesamtzahl der Einträge in der Tabelle.

  Der Wert wird berechnet.
  
#### Anzahl der Einträge {#entry-count}

Um `#record_count#` zu zählen, ändern Sie bitte den bestehenden Funktionsaufruf [DBFind](../topics/script.md#dbfind). Die im `.count()`-Aufruf angegebene Variable speichert die Eintragsanzahl.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count)
```
#### Tabellen-Offset {#table-offset}

Der Offset der Tabellenansicht muss beim Öffnen der Seite an die Seite übergeben werden. Wenn `#table_view_offset#` keinen Wert bekommt, setzen Sie ihn auf 0.

Fügen Sie oben auf der Seite den folgenden Code hinzu.

```
If(GetVar(table_view_offset)){

}.Else{
    SetVar(table_view_offset, 0)
}
```

Ändern Sie den Funktionsaufruf [DBFind](../topics/script.md#dbfind) erneut. Dieses Mal muss es den neuen Offset der Tabellenansicht verwenden.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
```
#### Tastencode {#button-code}

Suchen Sie den Funktionsaufruf [Div](../topics/templates2.md#div), der die Fußzeile definiert: `Div(Class:panel-footer text-right)`. Fügen Sie den Schaltflächencode hinzu.

```
Div(Class: panel-footer text-right) {
}
```
Die Schaltfläche *Zurück* wird nur angezeigt, wenn mindestens ein Weiter zum Zurückkehren vorhanden ist. Beim Hinzufügen einer Schaltfläche wird der neue Tabellenansichts-Offset `offset_ previous` der Seite berechnet. Die Parameter werden an `PageParams` der erneut geöffneten Seite übergeben.

```
If(#table_view_offset# >= 25) {
    SetVar(offset_previous, Calculate(#table_view_offset# - 25))
    Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
}
```
Die Schaltfläche Weiter wird nur angezeigt, wenn die Gesamtzahl der Datensätze größer ist als die auf der Seite angezeigte Zahl. Wenn eine Schaltfläche hinzugefügt wird, wird der neue Tabellenansichts-Offset `offset_next` der Seite berechnet. Die Parameter werden an `PageParams` der erneut geöffneten Seite übergeben.

```
If(#record_count# >= Calculate(#table_view_offset# + 25)) {
    SetVar(offset_next, Calculate(#table_view_offset# + 25))
    Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
}
```

Nachdem Sie diese Schaltflächen hinzugefügt haben, speichern Sie die Seite und testen Sie sie über das Menüelement Startseite > Nachrichten.

#### Seite wird aktualisiert {#page-refreshing}

Die letzte zu implementierende Funktion ist die automatische Aktualisierung der Tabelle auf der Seite. Wenn Benutzer eine neue Nachricht senden, muss diese in der Tabelle angezeigt werden.

Neben der Vertragsabwicklung können Sie auch über die Schaltfläche Senden die aktuelle Seite erneut öffnen, um dasselbe zu erreichen. `#table_view_offset#` muss unverändert an die Seite übergeben werden.

Fügen Sie „Page“ und `PageParams` zur Schaltfläche „Senden“ hinzu. Der Code lautet wie folgt:

```
Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
```

### Vollständiger Seitencode {#full-page-code-2}

Dieser Teil beschreibt viele Änderungen an der Anwendungsseite. Das Folgende ist der vollständige Code der Anwendungsseite.

```
If(GetVar(table_view_offset)){
}.Else{
    SetVar(table_view_offset, 0)
}
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
    Div(Class: panel panel-primary) {
        Div(Class: panel-heading, Body: Table block)
        Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
        Div(Class: panel-footer text-right) {
            If(#table_view_offset# >= 25) {
                SetVar(offset_previous, Calculate(#table_view_offset# - 25))
                Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
            }
            If(#record_count# >= Calculate(#table_view_offset# + 25)) {
                SetVar(offset_next, Calculate(#table_view_offset# + 25))
                Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
            }
        }
    }
    Div(Class: panel panel-primary) {
    Form() {
        Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
        Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
    }
}
```

## Schlussfolgerungen {#conclusions}

Anstatt andere wichtige Themen für Anwendungsentwickler zu erläutern, wie z. B. Layoutstile, Verwaltung von Zugriffsberechtigungen und Interaktion zwischen Anwendungen und Ressourcen, führt dieses Tutorial ein, wie eine grundlegende Anwendung für ein Ökosystem erstellt wird. Weitere Informationen zu diesen fortgeschrittenen Themen finden Sie in anderen relevanten Dokumenten.
