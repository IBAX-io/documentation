# Vorlagensprache

   - [Seitenaufbau](#seitenaufbau)
     - [Vorlagen-Engine](#vorlagen-engine)
     - [Seiten erstellen](#seiten-erstellen)
       - [Visueller Seitendesigner](#visueller-seitendesigner)
       - [Anwendbare Stile](#anwendbare-stile)
       - [Seitenmodul](#seitenmodul)
       - [Sprachressourcen-Editor](#Sprachressourcen-Editor)
  - [Logicor-Vorlagensprache](#logicor-vorlagensprache)
     - [Logicor-Übersicht](#logicor-übersicht)
       - [PageParams verwenden, um Parameter an Seiten zu übergeben](#pageparams-verwenden-um-parameter-an-seiten-zu-übergeben)
       - [Anrufverträge](#Anrufverträge)
  - [Logicor-Funktionsklassifizierung](#logicor-funktionsklassifizierung)
     - [Operationen auf Variablen:](#operationen-auf-Variablen)
     - [Navigationsoperationen:](#navigationsoperationen)
     - [Datenmanipulation:](#Datenmanipulation)
     - [Datenpräsentation:](#datenpräsentation)
     - [Übernahme von Daten:](#übernahme-von-daten)
     - [Datenformatierungselemente:](#datenformatierungselemente)
     - [Formularelemente:](#formularelemente)
     - [Operationen auf Codeblöcken:](#Operationen-auf-Codeblöcken)
  - [Logicor-Funktionsreferenzen](#logicor-function-references)
     - [Adresse](#Adresse)
     - [AddressToId] (#addresstoid)
     - [AddToolButton](#addtoolbutton)
     - [Und](#und)
     - [AppParam](#appparam)
     - [ArrayToSource](#arraytosource)
     - [Binär](#binär)
     - [Schaltfläche](#Schaltfläche)
     - [Berechnen](#berechnen)
     - [Diagramm](#Diagramm)
     - [CmpTime](#cmptime)
     - [Code](#code)
     - [CodeAsIs](#Codeasis)
     - [Daten](#Daten)
     - [Benutzerdefiniert](#benutzerdefiniert)
     - [DatumUhrzeit](#DatumUhrzeit)
     - [DBFind](#dbfind)
     - [Div](#div)
     - [EcosysParam](#ecosysParam)
     - [Em](#em)
     - [FürListe](#fürListe)
     - [Formular](#Formular)
     -  [Spaltentyp holen](#spaltentyp-holen)
     - [GetHistory](#gethistory)
     - [GetVar](#getvar)
     - [Hinweis](#Hinweis)
     - [Wenn](#wenn)
     - [Bild](#Bild)
     - [Bildeingabe](#Bildeingabe)
     - [Einschließen](#einschließen)
     - [Eingabe](#Eingabe)
     - [EingabeFehler](#Eingabefehler)
     - [InputMap](#Eingabemap)
     - [JsonToSource](#jsontosource)
     - [Etikett](#Etikett)
     - [LangRes](#langres)
     - [Linkseite](#linkseite)
     - [Karte](#Karte)
    - [Menügruppe](#Menügruppe)
     - [MenuItem](#menuitem)
     - [Geld](#Geld)
     - [Oder](#oder)
     - [P](#p)
     - [QRcode](#qrcode)
     - [Funkgruppe](#Funkgruppe)
     - [Bereich](#Bereich)
     - [Auswählen](#auswählen)
     - [SetTitle](#settitle)
     - [SetVar](#setvar)
     - [Spanne](#Spanne)
     - [Stark](#stark)
     - [SysParam](#sysparam)
     - [Tabelle](#Tabelle)
     - [Transaktionsinfo](#transaktionsinfo)
     - [VarAsIs](#varasis)
  - [App-Stile für Mobilgeräte](#app-styles-for-mobile-devices)
     - [Layout](#Layout)
       - [Titel](#Titel)
       - [Starke Klassennamen](#starke-Klassennamen)
       - [Farbe](#Farbe)
       - [Gitter](#Gitter)
       - [Leiste](#Leiste)
       - [Formular](#form-app)
       - [Schaltfläche](#Schaltfläche-App)
       - [Symbol](#Symbol)

## Seitenaufbau

Die integrierte Entwicklungsumgebung (IDE) von Weaver wird mit React, einer JavaScript-Bibliothek, erstellt. Es hat einen Seiteneditor und einen visuellen Seitendesigner. Seiten sind grundlegende Teile einer Anwendung, die zum Abrufen und Anzeigen von Daten aus Tabellen, zum Erstellen von Formularen zum Empfangen von Benutzereingabedaten, zum Übergeben von Daten an Verträge und zum Navigieren zwischen Anwendungsseiten verwendet werden. Seiten werden wie Verträge in der Blockchain gespeichert, wodurch sie beim Laden in den Software-Client manipulationssicher sein können.
### Template-Engine

Seitenelemente (Seiten und Menüs) werden von Entwicklern in der Template-Engine eines Verifizierungsknotens unter Verwendung der Template-Sprache im Seiteneditor von Weaver gebildet. Alle Seiten werden mit der vom IBAX-Entwicklungsteam entwickelten Logicor-Sprache erstellt. Verwenden Sie content/... API-Befehle, um Seiten von Knoten im Netzwerk anzufordern. Was die Template-Engine als Antwort auf diese Art von Anfrage sendet, ist keine HTML-Seite, sondern ein JSON-Code, der sich aus HTML-Tags zusammensetzt, die gemäß der Template-Struktur einen Baum bilden. Wenn Sie die Vorlagen-Engine testen möchten, können Sie auf den API-Befehl [content](../reference/api2.md#content) verweisen.

### Seiten erstellen

Sie können den Seiteneditor verwenden, um Seiten zu erstellen und zu bearbeiten, die Sie im Abschnitt „Seiten“ des Verwaltungstools von Weaver finden. Der Editor kann verwendet werden, um:

* Schreiben Sie den Seitencode, markieren Sie die Schlüsselwörter der Logicor-Template-Sprache;
* Menüs auf Seiten auswählen und anzeigen;
* Bearbeiten Sie die Menüseite;
* Konfigurieren Sie die Berechtigung zum Wechseln von Seiten, indem Sie den Vertragsnamen mit Berechtigung in der Funktion ContractConditions angeben oder indem Sie die Zugriffsberechtigung direkt in Bedingungen ändern angeben;
* Starten Sie den visuellen Seitendesigner;
* Vorschauseiten.

#### Visueller Seitendesigner

Der visuelle Seitendesigner kann verwendet werden, um Seitenlayouts zu erstellen, ohne Schnittstellencodes in der Sprache Logicor zu verwenden. Damit können Sie die Position von Formularelementen und Text auf Seiten durch Ziehen und Ablegen solcher Elemente festlegen und die Größe von Seitenblöcken konfigurieren. Es bietet eine Reihe von gebrauchsfertigen Blöcken zur Präsentation von Standarddatenmodellen: mit Titeln, Formularen und Informationstafeln. Nachdem Sie eine Seite im visuellen Seitendesigner erstellt haben, können Sie Programmlogik zum Empfangen von Daten und einer bedingten Struktur im Seiteneditor schreiben. Für die Zukunft planen wir die Erstellung eines visuellen Seitendesigners mit zusätzlichen Funktionen.

#### Anwendbare Stile

Standardmäßig werden Seiten im Bootstrap Angle-Stil von Angular dargestellt. Benutzer können je nach Bedarf ihre eigenen Stile erstellen. Der Stil wird im Stilparameter-Stylesheet in der Ecosystem-Parametertabelle gespeichert.

#### Seitenmodul

Um einen Codeblock auf mehreren Seiten zu verwenden, können Sie ein Seitenmodul erstellen, um es zu speichern und in den Seitencode einzubetten. Seitenmodule können in Weavers Modulblöcken erstellt und bearbeitet werden. Wie Seiten können Bearbeitungsrechte definiert werden.

#### Editor für Sprachressourcen

Weaver enthält einen Mechanismus zur Seitenlokalisierung unter Verwendung einer Funktion **LangRes** der Logicor-Template-Sprache. Es könnte Sprachressourcen-Tags auf der Seite durch Textzeilen ersetzen, die der vom Benutzer im Software-Client oder Browser ausgewählten Sprache entsprechen. Anstelle der **LangRes**-Funktion kann auch die Kurzsyntax **$lable$** verwendet werden. Die Übersetzung von Nachrichten in Popups, die vom Vertrag initiiert werden, wird von Needles **LangRes**-Funktion durchgeführt.

Sie können Sprachressourcen im Bereich Sprachressourcen von Weaver erstellen und bearbeiten. Eine Sprachressource besteht aus Bezeichnungsnamen und entsprechenden Übersetzungen solcher Namen in verschiedenen Sprachen sowie der entsprechenden zweibuchstabigen Sprachkennung (EN, ZH, JP usw.).

Die Berechtigungen zum Hinzufügen und Ändern von Sprachressourcen können wie bei anderen Tabellen definiert werden.

## Logicor-Vorlagensprache

Logicor-Funktionen bieten die folgenden Operationen:

* Abrufen von Werten aus der Datenbank: ```DBFind```, zeigt aus der Datenbank abgerufene Daten als Tabellen und Diagramme;
* Datenoperationen zum Zuweisen und Anzeigen von Variablenwerten: ```SetVar, GetVar, Data```;
* Anzeigen und Vergleichen von Datums-/Zeitwerten: ```DateTime, Now, CmpTime```;
* Verwenden Sie verschiedene Eingabefelder für Benutzerdaten, um Formulare zu erstellen: ```Form, ImageInput, Input, RadioGroup, Select```;
* Überprüfen Sie die Daten im Formularfeld, indem Sie Fehlermeldungen anzeigen: ```Validate, InputErr```;
* Anzeige der Navigationselemente: ```AddToolButton, LinkPage, Button```;
* Verträge aufrufen: ```Button```;
* Erstellen von HTML-Seitenlayoutelementen, einschließlich verschiedener Tags, und Auswählen bestimmter CSS-Klassen: ```Div, P, Span, etc```;
* Einbetten und Entladen von Bildern auf Seiten: ```Image, ImageInput```;
* Anzeigebedingungen des Seitenlayoutfragments: ```If, ElseIf, Else```;
* Erstellen von mehrstufigen Menüs;
* Seitenlokalisierung.

### Logicor-Übersicht

Die Logicor-Seitenvorlagensprache ist eine funktionale Sprache, die es einer Funktion ermöglicht, eine andere Funktion ```FuncName(parameters)``` aufzurufen und Funktionen ineinander zu verschachteln. Sie können Parameter ohne Anführungszeichen angeben und unnötige Parameter löschen.

Wenn der Parameter ein Komma enthält, sollte es in Anführungszeichen (Backquotes oder doppelte Anführungszeichen) gesetzt werden. Wenn eine Funktion nur einen Parameter haben kann, können Sie ein Komma ohne Anführungszeichen verwenden. Außerdem sollten Anführungszeichen verwendet werden, wenn der Parameter eine ungepaarte schließende Klammer hat.

Wenn Sie einen Parameter in Anführungszeichen setzen, der Parameter selbst aber Anführungszeichen enthält, können Sie verschiedene Arten von Anführungszeichen oder mehrere Anführungszeichen im Text verwenden.

In der Funktionsdefinition hat jeder Parameter einen bestimmten Namen. Sie können die Funktion aufrufen und die Parameter in der Reihenfolge der Deklaration oder einen beliebigen Parametersatz in beliebiger Namensreihenfolge angeben: ```Parametername: Parameterwert```. Mit dieser Methode können Sie sicher neue Funktionsparameter hinzufügen, ohne die Kompatibilität mit der aktuellen Vorlage zu beeinträchtigen:

Funktionen können Texte zurückgeben, HTML-Elemente erzeugen (z. B. ```Input```), oder HTML-Elemente mit verschachtelten HTML-Elementen erzeugen (```Div, P, Span```). Im letzteren Fall wird ein Parameter mit dem vordefinierten Namen Body verwendet, um das verschachtelte Element zu definieren. Das Verschachteln von zwei Divs in einem anderen Div sieht beispielsweise so aus:

Um die im Body-Parameter beschriebenen verschachtelten Elemente zu definieren, kann die folgende Notation verwendet werden: ```FuncName(...){...}```. Verschachtelte Elemente sollten mit geschweiften Klammern angegeben werden:

Wenn Sie dieselbe Funktion mehrmals hintereinander angeben müssen, können Sie den Punkt `.` verwenden, anstatt jedes Mal ihren Namen zu schreiben. Zum Beispiel sind die folgenden gleich:

Mit dieser Sprache können Sie eine Variable mit der SetVar-Funktion zuweisen und ihren Wert mit `#name#` referenzieren.

Um auf die Sprachressourcen des Ökosystems zu verweisen, können Sie `$langres$` verwenden, wobei langres der Sprachname ist.

Folgende Variablen sind vordefiniert:

* `#key_id#` - Kontoadresse des aktuellen Benutzers;
* `#ecosystem_id#` - Aktuelle Ökosystem-ID;
* `#guest_key#` - Adresse des Gastkontos;
* `#isMobile#` - 1, wenn Weaver auf einem Mobilgerät läuft.

#### Verwenden Sie PageParams, um Parameter an Seiten zu übergeben

Viele Funktionen unterstützen den PageParams-Parameter, der zum Übergeben von Parametern beim Umleiten auf eine neue Seite verwendet wird. Zum Beispiel: PageParams: `"param1=value1,param2=value2"`. Der Parameterwert kann ein einfacher String oder eine Variable mit Referenzwert sein. Beim Übergeben von Parametern an Seiten wird eine Variable mit dem Parameternamen erstellt, z. `#param1#` und `#param2#`.

* `PageParams: "hello=world"` - Die neue Seite erhält den hallo-Parameter mit world als Wert;
* `PageParams: "hello=#world#"` - Die neue Seite erhält den hallo-Parameter mit dem Wert der world-Variablen.

Darüber hinaus kann die Val-Funktion Daten aus Formularen abrufen, die in der Umleitung angegeben sind.

* `PageParams: "hello=Val(world)"` - Die neue Seite erhält den hallo-Parameter mit dem Wert des World-Formular-Elements.

#### Verträge anrufen

Logicor implementiert Vertragsaufrufe durch Anklicken der Button-Funktion in einem Formular. Sobald ein Ereignis ausgelöst wird, werden die vom Benutzer in einem Formularfeld auf der Seite eingegebenen Daten an den Vertrag übergeben. Entspricht der Formularfeldname dem Variablennamen im Datenteil des aufgerufenen Vertrages, werden die Daten automatisch übertragen. Die Schaltflächenfunktion ermöglicht es, ein modales Fenster für den Benutzer zu öffnen, um die Vertragsausführung zu überprüfen, und bei erfolgreicher Vertragsausführung die Umleitung auf die angegebene Seite zu initiieren und bestimmte Parameter an die Seite zu übergeben.

## Logicor-Funktionsklassifizierung

### Operationen auf Variablen:

|        |        |         |
| ------ | ------ | ------- |
| [GetVar](#getvar) | [SetVar](#setvar) | [VarAsIs](#varasis) |

### Navigationsoperationen:

|               |        |          |
| ------------- | ------ | -------- |
| [AddToolButton](#addtoolbutton) | [Button](#button) | [LinkPage](#linkpage) |

### Datenmanipulation:

|           |          |       |
| --------- | -------- | ----- |
| [Calculate](#calculate) | [DateTime](#datetime) | [Money](#money) |
| [CmpTime](#cmptime)   |          |       |

### Datenpräsentation:

|          |           |          |
| -------- | --------- | -------- |
| [Code](#code)     | [Hint](#hint)      | [MenuItem](#menuitem) |
| [CodeAsIs](#codeasis) | [Image](#image)     | [QRcode](#qrcode)   |
| [Chart](#chart)    | [MenuGroup](#menugroup) | [Table](#table)    |
| [ForList](#forlist)  |           |          |

### Übernahme der Daten:

|             |               |                 |
| ----------- | ------------- | --------------- |
| [Address](#address)     | [EcosysParam](#ecosysparam)   | [LangRes](#langres)         |
| [AddressToId](#addresstoid) | [GetHistory](#gethistory)    | [Range](#range)           |
| [AppParam](#appparam)    | [GetColumnType](#getcolumntype) | [SysParam](#sysparam)        |
| [Data](#data)        | [JsonToSource](#jsontosource)  | [Binary](#binary)          |
| [DBFind](#dbfind)      | [ArrayToSource](#arraytosource) | [TransactionInfo](#transactioninfo) |

### Datenformatierungselemente:

|      |          |        |
| ---- | -------- | ------ |
| [Div](#div)  | [SetTitle](#settitle) | [Span](#span)   |
| [Em](#em)   | [Label](#label)    | [Strong](#strong) |
| [P](#p)    |          |        |

### Formularelemente:

|            |            |          |
| ---------- | ---------- | -------- |
| [Form](#form)       | [InputErr](#inputerr)   | [InputMap](#inputmap) |
| [ImageInput](#imageinput) | [RadioGroup](#radiogroup) | [Map](#map)      |
| [Input](#input)      | [Select](#select)     |          |

### Operationen auf Codeblöcken:

|      |      |         |
| ---- | ---- | ------- |
| [If](#if)   | [Or](#or)   | [Include](#include) |
| [And](#and)  |      |         |


## Logicor-Funktionsreferenzen

### Die Anschrift

Diese Funktion gibt die Wallet-Adresse `xxxx-xxxx-...-xxxx` einer bestimmten Kontoadresse zurück; wenn keine Adresse angegeben ist, wird die Kontoadresse des aktuellen Benutzers als Parameter verwendet.

#### Syntax

```
Address(account)

```
> Address
  * `account`
  
    Account address.

#### Beispiel

```
Span(Your wallet: Address(#account#))
```

### AddressToId

Es gibt die Kontoadresse einer bestimmten Wallet-Adresse xxxx-xxxx-...-xxxx zurück.

#### Syntax


```
AddressToId(Wallet)
```

> AddressToId
  * `Wallet`
  
    The wallet address in XXXX-...-XXXX format.

#### Beispiel

```
AddressToId(#wallet#)
```
### Werkzeugschaltfläche hinzufügen

Erstellen Sie ein Schaltflächenpanel mit einem addtoolbutton-Element.

#### Syntax


```
AddToolButton(Title, Icon, Page, PageParams)
 [.Popup(Width, Header)]
```


> Werkzeugschaltfläche hinzufügen

   * `Title` .
  
     Schaltflächentitel.

   * `symbol`.
  
     Button-Icon-Stil.

   * `Seite`
  
     Name der Seite, auf die umgeleitet wird.

   * `Seitenparameter`
  
     Die an die Seite übergebenen Parameter.
    
> Popup

   Das modale Fenster erscheint.
   * `header`

     Titel des Fensters.
   * `width`

       Prozentsatz der Fensterbreite.
       Der Bereich liegt zwischen 1 und 100.


#### Beispiel

```
AddToolButton(Title: $@1broadcast$, Page: @1notifications_broadcast, Icon: icon-plus).Popup(Header: $@1notifications_broadcast$, Width: "50")
```
### Und

Es gibt das Ergebnis einer logischen Operation und zurück. Alle in Klammern aufgeführten Parameter sind durch Kommas getrennt. Wenn einer der Parameter eine leere Zeichenkette, Null oder `false` ist, ist der Parameterwert `false`, andernfalls ist der Parameterwert `true`. Wenn der Parameterwert "true" ist, gibt die Funktion `1` zurück, andernfalls gibt sie `0` zurück.

#### Syntax

```
And(parameters)
```

#### Beispiel

```
If(And(#myval1#,#myval2#), Span(OK))
```

### AppParam

Geben Sie den Anwendungsparameterwert aus, der aus der app_params-Tabelle des aktuellen Ökosystems entnommen wird. Wenn es eine Sprachressource mit dem angegebenen Namen gibt, wird ihr Wert automatisch ersetzt.

#### Syntax
```
AppParam(App, Name, Index, Source)

```

> AppParam
  * `App`
  
    Application ID.
  * `Name`

    Parameter name.
  * `Index`

    It can be used when the parameter value is a comma-separated list.
    The parameter elements index, starting from 1. For example, if `type = full,light`, then `AppParam(1, type, 2)` returns `light`.
    It cannot be used in conjunction with the Source parameter.
  * `Source`

    It can be used when the parameter value is a comma-separated list.
    Create a data object whose elements are the values of specific parameters. This object can be used as a data source for the [Table](#table) and [Select](#select) functions.
    It cannot be used in conjunction with the Index parameter.

#### Beispiel

```
AppParam(1, type, Source: mytype)
```
### ArrayToSource

Erstellen Sie ein arraytosource-Element und füllen Sie es mit den Schlüssel-Wert-Paaren eines JSON-Arrays. Die erhaltenen Daten werden in das Source-Element eingefügt, das später in der Quelleneingabefunktion (z. B. Tabelle) verwendet werden kann.

#### Syntax
```
ArrayToSource(Source, Data)

```
> ArrayZuQuelle
   * `source`
  
     Name der Datenquelle.
   * `data`.

     Ein JSON-Array oder ein Variablenname, der ein JSON-Array enthält (`#name#`).

#### Beispiel

```
ArrayToSource(src, #myjsonarr#)
ArrayToSource(dat, [1, 2, 3])
```

### Binär

Gibt Links zu statischen Dateien zurück, die in den Binärdateien der Binärtabelle gespeichert sind.

#### Syntax

```
Binary(Name, AppID, MemberID)[.ById(ID)][.Ecosystem(ecosystem)]
```

> Binär
   * `Name`.
  
     Dateinamen.
   * `AppID`
  
     Anwendungs-ID.
   * `Member-ID`

     Kontoadresse, standardmäßig 0.
   * `ID`.

     Statische Datei-ID.
   * `Ecosystem`

     Ökosystem-ID. Wenn es nicht angegeben ist, wird die Binärdatei vom aktuellen Ökosystem angefordert.

#### Beispiel

```
Image(Src: Binary("my_image", 1))
Image(Src: Binary().ById(2))
Image(Src: Binary().ById(#id#).Ecosystem(#eco#))
```

### Taste

Erstellen Sie ein Schaltflächen-HTML-Element, das eine Schaltfläche zum Aufrufen eines Vertrags oder zum Öffnen einer Seite erstellt.

#### Syntax

```
Button(Body, Page, Class, Contract, Params, PageParams)
 [.CompositeContract(Contract, Data)]
 [.Alert(Text, ConfirmButton, CancelButton, Icon)]
 [.Popup(Width, Header)]
 [.Style(Style)]
 [.ErrorRedirect((ErrorID,PageName,PageParams)]
```

> Taste
  * `Body`
  
    Untergeordneter Text oder untergeordnetes Element.
  * `Page`

    Name der Seite, auf die umgeleitet wird.
  * `Class`

    Knopf Klasse.
  * `Contract`

    Name des aufgerufenen Vertrags.
  * `Params`

    Die Liste der an den Vertrag übergebenen Werte. Normalerweise wird der Wert des Vertragsparameters (der Datenabschnitt) von einem HTML-Element (z. B. einem Eingabefeld) von id mit einem ähnlichen Namen erhalten. Wenn sich die Element-ID vom Namen des Vertragsparameters unterscheidet, sollte der Wert im Format contractField1=idname1, contractField2=idname2 zugewiesen werden. Dieser Parameter wird als Objekt {contractField1: idname1, contractField2: idname2} an attr zurückgegeben.
  * `PageParams`

    Das Format der an die Weiterleitungsseite übergebenen Parameter ist pageField1=idname1, pageField2=idname2. Variablen mit den Zielseitenparameternamen #pageField1 und #pageField2 werden auf der Zielseite angelegt und mit den angegebenen Werten belegt. Siehe weitere Spezifikationen für die Parameterübergabe Verwenden Sie PageParams, um Parameter an Seiten zu übergeben).
  
> Zusammengesetzter Vertrag

    Wird verwendet, um der Schaltfläche zusätzliche Verträge hinzuzufügen. CompositeContract kann mehrfach verwendet werden.
  * `Name`

    Name of the contract.
  * `Data`

    Die Vertragsparameter sind JSON-Arrays.
> Alert

  Zeigen Sie die Nachricht an.
  * `Text`

    Text der Nachricht.
  * `ConfirmButton`
  
    Titel der Schaltfläche Bestätigen.
  * `CancelButton`

    Titel der Schaltfläche Abbrechen.
  * `Icon`

    Schaltflächensymbol.
> Popup

  Modales Ausgabefenster.
  * `Header`

    Fenstertitel.
  * `Width`

    Prozentsatz der Fensterbreite.
     Der Bereich liegt zwischen 1 und 100.
> Stil

  Der angegebene CSS-Stil.
  * `Style`

    CSS stil.
> Fehlerumleitung

Angeben und Weiterleiten auf eine Seite, wenn die Funktion :ref:contractfundef-Throw während der Vertragsausführung einen Fehler generiert. Es kann mehrere ErrorRedirect-Aufrufe geben. Daher ist bei der Rückgabe des Attributs *errredirect* der Attributschlüssel ErrorID und der Wert die Parameterliste.


  * `ErrorID`

    Error ID.

  * `PageName`

    Name der Weiterleitungsseite.

  * `PageParams`

    An die Seite übergebene Parameter.

#### Beispiel

```
Button(Submit, default_page, mybtn_class).Alert(Alert message)
Button(Contract: MyContract, Body:My Contract, Class: myclass, Params:"Name=myid,Id=i10,Value")
```

### Berechnung
Es gibt das Ergebnis des arithmetischen Ausdrucks zurück, der im Parameter Exp übergeben wurde. Die folgenden Operationen sind anwendbar: +, -, *, / und Klammern ().

#### Syntax
```
Calculate(Exp, Type, Prec)
```

> Berechnung
  * `Exp`

    Ein arithmetischer Ausdruck, der Zahlen und die Variable #name# enthält.
  * `Type`

    Ergebnisdatentyp: int, float, money. Wenn nicht angegeben, ist es Float, wenn es eine Zahl mit einem Dezimalpunkt gibt, sonst ist es Int.
  * `Prec`

    Float- und Gelddaten, mit zwei signifikanten Stellen nach dem Dezimalkomma.

#### Beispiel

```
Calculate( Exp: (342278783438+5000)\*(#val#-932780000), Type: money, Prec:18 )
Calculate(10000-(34+5)\*#val#)
Calculate("((10+#val#-45)\*3.0-10)/4.5 + #val#", Prec: 4)
```

### Diagramm

Erstellen Sie HTML-Diagramme.

#### Syntax
```
Chart(Type, Source, FieldLabel, FieldValue, Colors)
```

> Chart
  * `Type`

    Diagramm Typ.
  * `Source`

    Name der Datenquelle, z. B. erhalten aus der Funktion [DBFind](#dbfind).
  * `FieldLabel`

    Name des Header-Felds.
  * `FieldValue`

    Name des Wertefelds.
  * `Colors`

    Liste der Farben.

#### Beispiel

```
Data(mysrc,"name,count"){
    John Silver,10
    "Mark, Smith",20
    "Unknown ""Person""",30
}
Chart(Type: "bar", Source: mysrc, FieldLabel: "name", FieldValue: "count", Colors: "red, green")
```

### CmpTime

Es vergleicht zwei Zeitwerte im gleichen Format.
Es unterstützt Unixtime, `YYYY-MM-DD HH:MM:SS` und jedes Zeitformat wie `YYYYMMDD`.

#### Syntax

```
CmpTime(Time1, Time2)
```


Rückgabewert:


* `-1` - Time1 <Time2;
* `0` - Time1 = Time2;
* `1` - Time1> Time2.

#### Beispiel

```
If(CmpTime(#time1#, #time2#)<0){...}
```

### Code
Erstellen Sie ein Codeelement, um den angegebenen Code anzuzeigen.

Es ersetzt eine Variable durch den Wert der Variablen (z. B. `#name#`).

#### Syntax
```
Code(Text)
```

> Code
  * `Text`

    Quellcode.

#### Beispiel

```
Code( P(This is the first line.
    Span(This is the second line.))
)
```

### CodeAsIs

Erstellen Sie ein Codeelement, um den angegebenen Code anzuzeigen.
Es ersetzt keine Variable durch ihren Wert. Beispielsweise wird `#name#` unverändert angezeigt.

#### Syntax
```
CodeAsIs(Text)
```

> CodeAsIs
  * `Text`

    Source code.

#### Beispiel

```
CodeAsIs( P(This is the #test1#.
    Span(This is the #test2#.))
)
```

### Daten

Erstellen Sie ein Datenelement, füllen Sie es mit den angegebenen Daten und legen Sie es in Quelle ab. Dann können Sie Source als Dateneingabe in [Table](#table) und anderen Funktionen erhalten. Die Reihenfolge der Spaltennamen entspricht der Reihenfolge der Dateneingabewerte.

#### Syntax
```
Data(Source,Columns,Data)
 [.Custom(Column){Body}]
```

> Data
  * `Source`

    Name der Datenquelle. Als Datenquelle können Sie einen beliebigen Namen angeben, der später an andere Funktionen übergeben wird.

  * `Columns`

    Eine durch Kommas getrennte Liste von Spaltennamen.

  * `Data`
    Datensatz.

     Ein Datensatz pro Zeile. Spaltenwerte müssen durch Kommas getrennt werden. Daten und Spalten sollten in derselben Reihenfolge festgelegt werden.

    Werte mit Kommas sollten in doppelte Anführungszeichen gesetzt werden (`"example1, example2", 1, 2`). Werte in Anführungszeichen sollten in zwei doppelte Anführungszeichen gesetzt werden (`"""example", "example2""", 1, 2`).

    
### Benutzerdefiniert

     Sie können Daten berechnete Spalten zuweisen. Beispielsweise können Sie Feldvorlagen für Schaltflächen und andere Seitenlayoutelemente angeben. Diese Feldvorlagen werden normalerweise [Table](#table) und anderen Funktionen zum Empfangen von Daten zugewiesen.
     Verwenden Sie mehrere benutzerdefinierte Funktionen, wenn Sie mehrere berechnete Spalten zuweisen möchten.


  * `Column`

    Spaltenname, der eindeutig und obligatorisch ist.

  * `Body`

    Codeblock. Sie können `#columnname#` verwenden, um Werte aus anderen Spalten im Eintrag zu erhalten, und diese Werte dann in Codeblöcken verwenden.

#### Beispiel

```
Data(mysrc,"id,name"){
    "1",John Silver
    2,"Mark, Smith"
    3,"Unknown ""Person"""
 }.Custom(link){Button(Body: View, Class: btn btn-link, Page: user, PageParams: "id=#id#"}
```

### Terminzeit

Zeigt Uhrzeit und Datum im angegebenen Format an.

#### Syntax

```
DateTime(DateTime, Format)
```

> DateTime
  * `DateTime`

    Uhrzeit und Datum, ausgedrückt im Unixtime- oder Standardformat `2006-01-02T15:04:05`.
  * `Format`

    Formatvorlage: Jahr im 2-stelligen Format `YY`, 4-stelliges Format `YYYY`, Monat in `MM`, Tag in `DD`, Stunde in `HH`, Minute in `MM`, Sekunde in `SS` , z. B.: `JJ/MM/TT HH:MM`.
     Wenn es nicht angegeben ist oder fehlt, wird `YYYY-MM-DD HH:MI:SS` verwendet.

#### Beispiel

```
DateTime(2017-11-07T17:51:08)
DateTime(#mytime#,HH:MI DD.MM.YYYY)
```

### DBFind

Erstellen Sie ein dbfind-Element, füllen Sie es mit den Daten der Tabelle table und fügen Sie es in die Source-Struktur ein, die später für die Eingabedaten von [Table](#table) und anderen Funktionen Source verwendet werden kann.

#### Syntax
```
DBFind(table, Source)
    [.Columns(columns)]
    [.Where(conditions)]
    [.WhereId(id)]
    [.Order(name)]
    [.Limit(limit)]
    [.Offset(offset)]
    [.Count(countvar)]
    [.Ecosystem(id)]
    [.Cutoff(columns)]
    [.Custom(Column){Body}]
    [.Vars(Prefix)]
```

> DBFind
  * `table`

    Tabellenname.
  * `Source`

    Name der Datenquelle.

> Säulen
  * `columns`

    Wenn nicht angegeben, wird eine Liste aller Felder zurückgegeben. Wenn ein Feld vom Typ JSON vorhanden ist, können Sie die folgende Syntax verwenden, um das Datensatzfeld zu verarbeiten: `columnname->fieldname`. In diesem Fall lautet der generierte Feldname `columnname.fieldname`.

> Woher
  * `conditions`

   Datenabfragebedingungen. Siehe DBFind.
   Wenn ein Feld vom Typ JSON vorhanden ist, können Sie die folgende Syntax verwenden, um das Datensatzfeld zu verarbeiten:
        `columnname->fieldname`.

> WhereId
  Query by ID, e.g. `.WhereId(1)`.
  * `Id`

   Entry ID.

> Befehl
   Nach Feld sortieren.
  Weitere Informationen zur Sortiersyntax finden Sie unter [DBFind](#dbfind).
  * `name`

   Feldname

>   Grenze
  * `limit`
  
    Die Anzahl der zurückgegebenen Einträge, standardmäßig 25. Die maximale Anzahl beträgt 10.000.

> Offset
  * `Offset`

    Offset.

> Zählen

   Geben Sie die Gesamtzahl der Zeilen der Wo-Bedingung an.
   Die Gesamtzahl wird nicht nur in einer Variablen gespeichert, sondern auch im count-Parameter des dbfind-Elements zurückgegeben.

   Wenn Where und WhereID nicht angegeben sind, wird die Gesamtzahl der Zeilen in der Tabelle zurückgegeben.

   * `countvar`

     Name der Variablen, die die Zeilenanzahl enthält.
     
> Ökosystem
   * `ID`

    Ökosystem-ID. Standardmäßig stammen die Daten aus der angegebenen Tabelle im aktuellen Ökosystem.

> Cutoff

Wird zum Ausschneiden und Anzeigen großer Textdatenmengen verwendet.
   * `columns`

    Eine durch Kommas getrennte Liste von Feldern, die von der Cutoff-Funktion verarbeitet werden müssen.
    Der Feldwert wird durch ein JSON-Objekt ersetzt, das zwei Felder hat: link link und title title. Wenn der Feldwert mehr als 32 Zeichen enthält, wird ein Link zurückgegeben, der auf die ersten 32 Zeichen des Volltexts zeigt. Wenn der Feldwert 32 Zeichen oder weniger enthält, wird der Link auf ungültig gesetzt und der Titel enthält den vollständigen Feldwert.

> Benutzerdefiniert

  Sie können Daten berechnete Spalten zuweisen. Beispielsweise können Sie Feldvorlagen für Schaltflächen und andere Seitenlayoutelemente angeben. Diese Feldvorlagen werden normalerweise [Table](#table) und anderen Funktionen zum Empfangen von Daten zugewiesen.
   Wenn Sie mehrere berechnete Spalten zuweisen möchten, verwenden Sie mehrere benutzerdefinierte Funktionen.

  * `Column`

   Spaltenname, der eindeutig und obligatorisch ist.

  * `Body`

  Codeblock. Sie können `#columnname#` verwenden, um Werte aus anderen Spalten im Eintrag zu erhalten, und diese Werte dann in Codeblöcken verwenden.

> Vars

  Die erste von der Abfrage erhaltene Zeile generiert eine Reihe von Variablen mit Werten. Wenn er angegeben wird, wird der Limit-Parameter automatisch 1, und es wird nur ein (1) Datensatz zurückgegeben.

  * `Prefix`

   Das dem Variablennamen hinzugefügte Präfix. Sein Format ist `#prefix_columnname#`, wobei der Spaltenname direkt auf den Unterstrich folgt. Wenn eine Spalte ein JSON-Feld enthält, hat die generierte Variable das folgende Format: `#prefix_columnname_field#`.


#### Beispiel

```
DBFind(parameters,myparam)
DBFind(parameters,myparam).Columns(name,value).Where({name:"money"})
DBFind(parameters,myparam).Custom(myid){Strong(#id#)}.Custom(myname){
   Strong(Em(#name#))Div(myclass, #company#)
}
```

### Div

Erstellen Sie ein div-HTML-Element.

#### Syntax
```
Div(Class, Body)
 [.Style(Style)]
 [.Show(Condition)]
 [.Hide(Condition)]
```

> Div
  * `Class`

    Klassenname der div.
  * `Body`

    Untergeordnetes Element.
> Stil

  Der angegebene CSS-Stil.
  * `Style`

   CSS stil.
> Zeigen

Definieren Sie die Bedingungen für die Anzeige von Div.
   * `Condition`

  Siehe Ausblenden unten.
>   Ausblenden

 Definieren Sie die Bedingungen für das Ausblenden von Div.
   * `Condition`

   Das Ausdrucksformat ist `InputName=Value`, wenn alle Ausdrücke wahr sind, ist *Condition* wahr, und wenn der Wert von `InputName` gleich `Value` ist, ist *Condition* wahr. Wenn mehrere *Show* oder *Hide* aufgerufen werden, muss mindestens ein *Condition*-Parameter wahr sein.

#### Beispiel

```
Form(){
    Div(text-left){
        Input(Name: "broadcast", Type: "checkbox", Value: "false")
    }
    Div(text-left){
        hello
    }.Show("broadcast=false")
    Div(text-left){
        world
    }.Hide("broadcast=false")
}
```

### EcosysParam

Diese Funktion erhält Parameterwerte aus der Ökosystemparametertabelle des aktuellen Ökosystems. Wenn der zurückgegebene Ergebnisname die Sprachressourcen enthält, wird er entsprechend übersetzt.

#### Syntax
```
EcosysParam(Name, Index, Source)
```

> EcosysParam
  * `Name`

    Parametername.
  * `Index`

    Wenn der angeforderte Parameter eine Liste von durch Kommas getrennten Elementen ist, können Sie einen Index beginnend mit 1 angeben. Beispiel: if `gender = male,female`, dann `gender = male,female` kehrt zurück `female`.

Er kann nicht in Verbindung mit dem Source-Parameter verwendet werden.

  * `Source`

    Es kann verwendet werden, wenn der Parameterwert eine durch Kommas getrennte Liste ist.
     Erstellen Sie ein Datenobjekt, dessen Elemente die Werte der angegebenen Parameter sind. Dieses Objekt kann als Datenquelle für die Funktionen [Table](#table) und [Select](#select) verwendet werden.
     Er kann nicht in Verbindung mit dem Index-Parameter verwendet werden.

```
Address(EcosysParam(founder_account))
EcosysParam(gender, Source: mygender)

EcosysParam(Name: gender_list, Source: src_gender)
Select(Name: gender, Source: src_gender, NameColumn: name, ValueColumn: id)
```

### Em

Erstellen Sie ein em-HTML-Element. 

#### Syntax
```
Em(Body, Class)
```

> Em
  * `Body`

    Untergeordneter Text oder untergeordnetes Element.
  * `Class`

    Der em-Klassenname.

#### Beispiel

```
This is an Em(important news).
```

### ForList

Zeigen Sie die Liste der Elemente in der Quelldatenquelle im Vorlagenformat an, das in Body festgelegt ist, und erstellen Sie ein **forlist**-Element.

#### Syntax
```
ForList(Source, Index){Body}
```

> ForList
  * `Source`

    Datenquelle, die von der Funktion [DBFind](#dbfind) oder [Data](#data) abgerufen wird.
  * `Index`

     Die Variable des Iterationszählers, beginnend bei 1.
     Ein optionaler Parameter. Wenn nicht angegeben, wird der Iterationszählerwert in die Variable [Source] _index geschrieben.

  * `Body`

   Vorlage zum Einfügen von Elementen.

```
ForList(mysrc){Span(#mysrc_index#. #name#)}
```

### Form
   Erstellen Sie ein Formular-HTML-Element.

#### Syntax
```
Form(Class, Body) [.Style(Style)]
```
> Form
  * `Body`

    Untergeordneter Text oder untergeordnetes Element.

  * `Class`

    Klassenname des Formulars.

> Style
  The CSS style specified.
  * `Style`

   CSS stil.

#### Beispiel

```
Form(class1 class2, Input(myid))
```

### GetColumnType

Gibt den Felddatentyp einer bestimmten Tabelle zurück.

Zu den zurückgegebenen Typen gehören: `text, varchar, number, money, double, bytes, json, datetime, double`.

#### Syntax

```
GetColumnType(Table, Column)
```

> GetColumnType
  * `Table`

    Tabellenname.
  * `Column`

    Feldname.

#### Beispiel

```
SetVar(coltype,GetColumnType(members, member_name))Div(){#coltype#}
```
### Verlauf abrufen

Erstellen Sie ein gethistory-Element und füllen Sie es mit den Änderungshistoriendatensätzen der Einträge in der angegebenen Tabelle. Die generierten Daten werden im Quellelement platziert, das später in der Quelleingabefunktion verwendet werden kann (z. B. [Table](#table)).
Das Array wird in der Reihenfolge der letzten Änderung sortiert.
Das ID-Feld im Array zeigt auf die ID der rollback_tx-Tabelle. block_id stellt die Block-ID dar, block_time stellt den Zeitstempel der Blockgenerierung dar.


#### Syntax
```
GetHistory(Source, Name, Id, RollbackId)
```

> GetHistory
  * `Source`

    Name der Datenquelle.
  * `Name`

    Tabellenname.
  * `Id`

    Entry ID.
  * `RollbackId`

    Ein optionaler Parameter. Wenn angegeben, wird nur ein Datensatz mit der angegebenen ID aus der Tabelle rollback_tx zurückgegeben.

#### Beispiel

```
GetHistory(blocks, BlockHistory, 1)
```

### GetVar

Es gibt den Wert der angegebenen Variablen zurück, die bereits vorhanden ist, oder eine leere Zeichenfolge, wenn sie nicht vorhanden ist.
Das getvar-Element wird nur erstellt, wenn ein bearbeitbarer Baum angefordert wird. Der Unterschied zwischen `GetVar(varname)` und `#varname` besteht darin, dass GetVar einen leeren String zurückgibt, wenn varname nicht existiert, während #varname# als Stringwert interpretiert wird.

#### Syntax
```
GetVar(Name)
```

> GetVar
  * `Name`

    Variable name.

#### Beispiel

```
If(GetVar(name)){#name#}.Else{Name is unknown}
```

### Hinweis

Erstellen Sie ein Hinweiselement für Hinweise.

#### Syntax
```
Hint(Icon,Title,Text)
```

> Hint
  * `Icon`

    Symbolname.
  * `Title`

    Hinweis Titel.
  * `Text`

    Hinweistext.

#### Beispiel

```
Hint(Icon: "icon-wrench",Title:$@1pa_settings$,Text: This is a hint text)
```

### If

Bedingungsaussage.
Gibt das erste untergeordnete If- oder ElseIf-Element zurück, das Bedingung erfüllt. Geben Sie andernfalls das untergeordnete Else-Element zurück.

#### Syntax
```
If(Condition){ Body}
 [.ElseIf(Condition){ Body }]
 [.Else{ Body }]
```

> If
  * `Condition`

    Wenn die Bedingung gleich einer leeren Zeichenfolge, 0 oder falsch ist, wird davon ausgegangen, dass die Bedingung nicht erfüllt ist. In allen anderen Fällen gilt diese Bedingung als erfüllt.
  * `Body`

    Untergeordnetes Element.

#### Beispiel

```
If(#value#){
   Span(Value)
}.ElseIf(#value2#){Span(Value 2)
}.ElseIf(#value3#){Span(Value 3)}.Else{
   Span(Nothing)
}
```

### Bild
Erstellen Sie ein Bild-HTML-Element.

#### Syntax
```
Image(Src, Alt, Class)
 [.Style(Style)]
```

> Image
  * `Src`

    Bildquelle, Datei bzw `data:...`
  * `Alt`

    Alternativtext, wenn das Bild nicht angezeigt werden kann.
  * `Сlass`

    Bildklassenname.

#### Beispiel

```
Image(Src: Binary().ById(#id#), Class: preview).Style(height: 40px; widht 40px;)
```

### Bildeingabe

Erstellen Sie ein imageinput-Element, um ein Bild hochzuladen.

#### Syntax
```
ImageInput(Name, Width, Ratio, Format)
```

> ImageInput
  * `Name`

    Elementname.
  * `Width`

    Breite des zugeschnittenen Bildes.
  * `Ratio`

    Seitenverhältnis oder Bildhöhe.
  * `Format`

    Das Format des hochgeladenen Bildes.

#### Beispiel

```
ImageInput(avatar, 100, 2/1)
```

### Enthalten

Fügen Sie die Vorlage mit einem bestimmten Namen in den Seitencode ein.

#### Syntax
```
Include(Name)
```

> Include
  * `Name`

    Vorlagenname.

#### Beispiel

```
Div(myclass, Include(mywidget))
```

### Eingabe

Erstellen Sie ein Eingabe-HTML-Element.

#### Syntax
```
Input(Name, Class, Placeholder, Type, Value, Disabled)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Eingang
  * `Name`

    Elementname.
  * `Class`

    Klassenname.
  * `Placeholder`

    Fordern Sie den erwarteten Wert des Eingabefelds an.
  * `Type`

    Eingabetyp.
  * `Value`

    Elementwert.
  * `Disabled`

    Deaktivieren Sie das Eingabeelement.
> Validate

  Validieren Sie den Parameter.
> Style

  Der angegebene CSS-Stil.
  * `Style`

    CSS style.

#### Beispiel

```
Input(Name: name, Type: text, Placeholder: Enter your name)
Input(Name: num, Type: text).Validate(minLength: 6, maxLength: 20)
```

### InputErr

Erstellen Sie ein inputerr-Element, um den Fehlertext zu validieren.

#### Syntax
```
InputErr(Name,validation errors)]
```

> InputErr
  * `Name`

    Entspricht dem Namen des Elements [Input](#input).
  * `validation errors`

  Validierungsfehlermeldung für einen oder mehrere Parameter.

#### Beispiel

```
InputErr(Name: name,
minLength: Value is too short,
maxLength: The length of the value must be less than 20 characters)
```

### InputMap

Erstellen Sie ein Texteingabefeld für die Adresse, um Koordinaten auf der Karte auszuwählen.

#### Syntax

```
InputMap(Name, Typ, Kartentyp, Wert)
```

> InputMap
  * `Name`

    Elementname.
  * `Value`

    Standardwert.
    Der Wert ist ein Objekt im String-Format. Zum Beispiel, `{"coords":[{"lat":number,"lng":number},]}` or `{"zoom":int, "center":{"lat":number,"lng": number}}`. Wenn die InputMap mit dem vordefinierten Wert erstellt wird, kann das Adressfeld verwendet werden, um den Adresswert zu speichern, damit er nicht ungültig wird.
  * `Type`

    Art der Kartenpunktkartierung:
    * `polygon` - gibt den Bereich einer geschlossenen Schleife mit mehreren Punkten an;
    * `Line` - bedeutet eine Polylinie mit mehreren Punkten ohne geschlossene Schleife;
    * `Point` - gibt eine einzelne Punktkoordinate an.
  * `MapType`

    Kartentyp.
     Es hat folgende Werte: `hybrid, roadmap, satellite, terrain`.

#### Beispiel

```
InputMap(Name: Coords,Type: polygon, MapType: hybrid, Value: `{"zoom":8, "center":{"lat":55.749942860682545,"lng":37.6207172870636}}`)
```

### JsonToSource

Erstellen Sie ein jsontosource-Element und füllen Sie es mit den Schlüssel-Wert-Paaren eines JSON-Arrays. Die erhaltenen Daten werden in das Source-Element gestellt, das später in der Source-Eingabefunktion verwendet werden kann (z. B. [Table](#table)).
Die Datensätze in den Ergebnisdaten sind alphabetisch nach JSON-Schlüssel sortiert.

#### Syntax
```
JsonToSource(Source, Data)
```

> JsonToSource
  * `Source`

    Name der Datenquelle.
  * `Data`

     Ein JSON-Objekt oder ein Variablenname, der ein JSON-Objekt enthält (`#name#`).

#### Beispiel

```
JsonToSource(src, #myjson#)
JsonToSource(dat, {"param":"value", "param2": "value 2"})
```

### Label

Erstellen Sie ein Label-HTML-Element.

#### Syntax
```
Label(Body, Class, For)
 [.Style(Style)]
```

> Label
  * `Body`

    Untergeordneter Text oder untergeordnetes Element.
  * `Class`

    Klassenname.
  * `For`

    An ein Formularelement binden.
> `StyleThe`:CSS-Stil angegeben.
  * `Style`

    CSS stil.

#### Beispiel

```
Label(The first item).
```

### LangRes

Gibt eine bestimmte Sprachressource zurück. Wenn Sie aufgefordert werden, den Baum zu bearbeiten, wird das langres-Element zurückgegeben, und Sie können das Kurzformatsymbol $langres$ verwenden.

#### Syntax

```
LangRes(Name)
```

> LangRes
  * `Name`

    Name der Sprachressource.

#### Beispiel

```
LangRes(name)
LangRes(myres)
```

### LinkPage

Erstellen Sie ein linkpage-Element, das auf die Seite verlinkt.

#### Syntax

```
LinkPage(Body, Page, Class, PageParams)
 [.Style(Style)]
```

> LinkPage
  * `Body`

    Untergeordneter Text oder untergeordnetes Element.
  * `Page`

    Name der Weiterleitungsseite.
  * `Class`

    Name der Schaltflächenklasse.
  * `PageParams`

    Seitenparameter umleiten.
> Style

  Der angegebene CSS-Stil.
  * `Style`

  CSS stil
  
#### Beispiel

```
LinkPage(Class: #style_link# h5 text-bold, Page: @1roles_view, PageParams: "v_role_id=#recipient.role_id#")
```

### Map

Erstellen Sie eine visuelle Karte und zeigen Sie Koordinaten in einem beliebigen Format an.

#### Syntax
```
Map(Hmap, MapType, Value)
```

> Map
  * `Hmap`

     Höhe eines HTML-Elements auf der Seite.
     Der Standardwert ist 100.

  * `Value`

    Kartenwert, ein Objekt im Zeichenfolgenformat.
    Zum Beispiel, `{"coords":[{"lat":number,"lng":number},]}` or `{"zoom":int, "center":{"lat":number,"lng": number}}`. Ob `center` nicht angegeben ist, passt sich das Kartenfenster automatisch an die angegebenen Koordinaten an.

  * `MapType`

    Kartentyp.
    Es hat folgende Werte: `hybrid, roadmap, satellite, terrain`.

#### Beispiel

```
Map(MapType:hybrid, Hmap:400, Value:{"coords":[{"lat":55.58774531752405,"lng":36.97260184619233},{"lat":55.58396161622043,"lng":36.973803475831005},{"lat":55.585222890513975,"lng":36.979811624024364},{"lat":55.58803635636347,"lng":36.978781655762646}],"area":146846.65783403456,"address":"Unnamed Road, Moscow, Russia, 143041"})
```

### MenuGroup

Erstellen Sie ein verschachteltes Untermenü im Menü und geben Sie das menugroup-Element zurück. Bevor er durch die Sprachressource ersetzt wird, gibt der name-Parameter den Wert von Title zurück.

#### Syntax
```
MenuGroup(Title, Body, Icon)
```
> MenuGroup

  * `Title`

    Name des Menüpunkts.

  * `Body`

    Untergeordnete Elemente in einem Untermenü.

  * `Icon`

    Icon.

#### Beispiel

```
MenuGroup(My Menu){
    MenuItem(Interface, sys-interface)
    MenuItem(Dahsboard, dashboard_default)
}
```

### MenuItem

Erstellen Sie ein Menüelement und geben Sie das Element menuitem zurück.

#### Syntax
```
MenuItem(Title, Page, Params, Icon)
```

> MenuItem

  * `Title`

    Name des Menüpunkts.

  * `Page`

    Name der Weiterleitungsseite.

  * `Params`

    Seitenparameter umleiten.

  * `Icon`

    Icon.

#### Beispiel

```
MenuItem(Title:$@1roles$, Page:@1roles_list, Icon:"icon-pie-chart")
```

### Geld

Gibt den Zeichenfolgenwert von exp / 10 ^ Ziffer zurück.

#### Syntax

```
Money(Exp, Digit)
```

> Money

  * `Exp`

   Eine Zahl im Zeichenfolgenformat.

  * `Digit`

    Der Exponent von 10 im Ausdruck `Exp/10^digit`. Der Wert kann positiv oder negativ sein, und ein positiver Wert bestimmt die Anzahl der Nachkommastellen.

#### Beispiel

```
Money(Exp, Digit)
```

### Or
Es gibt das Ergebnis einer if-Logikoperation zurück. Alle in Klammern aufgeführten Parameter sind durch Kommas getrennt. Wenn ein Parameter, der Wert ist, keine leere Zeichenfolge, Null oder `false` ist, ist der Parameterwert `true`, andernfalls ist der Parameterwert `false`. Wenn der Parameterwert "true" ist, gibt die Funktion `1` zurück, andernfalls gibt sie `0` zurück.

#### Syntax
```
Or(parameters)
```


#### Beispiel

```
If(Or(#myval1#,#myval2#), Span(OK))
```

### P

Erstellen Sie ein p-HTML-Element.

#### Syntax
```
P(Body, Class)
 [.Style(Style)]
```

> P

  * `Body`

    Untergeordneter Text oder untergeordnetes Element.

  * `Class`

    Klassenname.

> Stil

Der angegebene CSS-Stil.

  * `Style`

    CSS stil.

#### Beispiel

```
P(This is the first line.
  This is the second line.)
```

### QRcode

Gibt den QR-Code mit dem angegebenen Text zurück und erstellt ein qrcode-Element.

#### Syntax
```
QRcode(Text)
```

> QRcode
  * `Text`

    QR code text.

#### Beispiel

```
QRcode(#name#)
```

### RadioGroup

Erstellen Sie ein Radiogroup-Element.

#### Syntax
```
RadioGroup(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> RadioGroup

  * `Name`

    Elementname.

  * `Source`

    Datenquelle, die von der Funktion DBFind oder Data abgerufen wird.

  * `NameColumn`

    Feldname der Datenquelle.

  * `ValueColumn`

     Wertname der Datenquelle.
     Mit Benutzerdefiniert erstellte Felder können in diesem Parameter nicht verwendet werden.

  * `Value`

    Standardwert.

  * `Class`

    Klassenname.

> Validate

  Validieren Sie den Parameter.

> Style

  Der angegebene CCS-Stil.

  * `Style`

    CSS stil.

#### Beispiel

```
RadioGroup(Name: type_decision, Source: numbers_type_decisions, NameColumn: name, ValueColumn: value)
```

### Bereich

Erstellen Sie ein Bereichselement, verwenden Sie die Schrittgröße Step from From to To (ohne To), um Integer-Elemente zu füllen. Die generierten Daten werden in Source abgelegt und können später in der Funktion der Source-Eingabe verwendet werden (z. B. [Table](#table)). Wenn ein ungültiger Parameter angegeben wird, wird eine leere Quelle zurückgegeben.

#### Syntax
```
Range(Source,From,To,Step)
```

> Range

  * `Source`

    Name der Datenquelle.

  * `From`

    Startwert (i = Von).

  * `To`

    Endwert (i <To).

  * `Step`

    Schritt der Wertänderung. Wenn es nicht angegeben ist, ist der Standardwert 1.

#### Beispiel

```
Range(my,0,5)
SetVar(from, 5).(to, -4).(step,-2)
Range(Source: neg, From: #from#, To: #to#, Step: #step#)
```

### Auswählen

Erstellen Sie ein ausgewähltes HTML-Element.

#### Syntax
```
Select(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Select

  * `Name`

    Elementname.

  * `Source`

    Datenquelle, die von der Funktion [DBFind](#dbfind) oder [Data](#data) abgerufen wird.

  * `NameColumn`

    Feldname der Datenquelle.

  * `ValueColumn`

     Wertname der Datenquelle.
     Mit [Custom](#custom) erstellte Felder können in diesem Parameter nicht verwendet werden.

  * `Value`

    Standardwert.

  * `Class`

    Klassenname.

> Validate

  Validieren Sie den Parameter.

> Style

  Der angegebene CCS-Stil.

  * `Style`

    CSS stil.

#### Beispiel

```
DBFind(mytable, mysrc)
Select(mysrc, name)
```

### SetTitle

Zum Festlegen des Seitentitels und zum Erstellen eines settitle-Elements.

#### Syntax
```
SetTitle(Title)
```

> Titel festlegen
  * `Title`

    Seitentitel.

#### Beispiel

```
SetTitle(My page)
```

### SetVar

Weisen Sie der angegebenen Variablen Name den Wert Value zu.

#### Syntax
```
SetVar(Name, Value)
```

> SetVar

  * `Name`

    Variable name.

  * `Value`

    Variablenwert, kann einen Verweis auf eine andere Variable enthalten.

#### Beispiel

```
SetVar(name, John Smith).(out, I am #name#)
Span(#out#)
```

### Span

Erstellen Sie ein span-HTML-Element.

#### Syntax
```
Span(Body, Class)
 [.Style(Style)]
```

> Span

  * `Body`

    Untergeordneter Text oder untergeordnetes Element.

  * `Class`

    Klassenname.

> Style

  Der angegebene CCS-Stil.

  * `Style`

    CSS stil.

####  Beispiel

```
This is Span(the first item, myclass1).
```

### Stark

Erstellen Sie ein starkes HTML-Element.

#### Syntax
```
Strong(Body, Class)
```

> Strong

  * `Body`

    Untergeordneter Text oder untergeordnetes Element.

  * `Class`

    Klassenname.

#### Beispiel

```
This is Strong(the first item, myclass1).
```

### SysParam

Rufen Sie den Wert eines bestimmten Parameters in der Plattformparametertabelle system_parameters ab.

#### Syntax
```
SysParam(Name)
```

> SysParam
  * `Name`

    Name des Plattformparameters.

#### Beispiel

```
SysParam(max_columns)
```

### Tisch

Erstellen Sie ein Tabellen-HTML-Element.

#### Syntax
```
Table(Source, Columns)
 [.Style(Style)]
```

> Table

  * `Source`

    Name einer bestimmten Datenquelle.

  * `Columns`

    Titel und zugehöriger Spaltenname, e.g.: Title1=column1,Title2=column2.

> Style

  Der angegebene CSS-Stil.

  * `Style`

    CSS stil.

#### Beispiel

```
DBFind(mytable, mysrc)
Table(mysrc,"ID=id,Name=name")
```

### Transaktionsinfo

Es fragt Transaktionen nach einem bestimmten Hash ab und gibt Informationen über die ausgeführten Verträge und ihre Parameter zurück.

#### Syntax
```
TransactionInfo(Hash)
```

> TransactionInfo
  * `Hash`

    Transaktions-Hashes im hexadezimalen Zeichenfolgenformat.
> Rückgabewert

  Es gibt eine Zeichenfolge im JSON-Format zurück:

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

Woher:

* `contract` - Vertragsname;
* `params` - An die Vertragsparameter übergebene Daten;
* `block` - ID des Blocks, der die Transaktion verarbeitet hat.

#### Beispiel

```
P(TransactionInfo(#hash#))
```

### VarAsIs

Weist einem bestimmten Variablennamen den Wert Wert zu, der der Name einer bestimmten Variablen anstelle ihres Wertes ist.

Für Versionen mit Variablensubstitution siehe [SetVar](#setvar).

#### Syntax
```
VarAsIs(Name, Value)
```

> VarAsIs

  * `Name`

    Variablennamen.

  * `Value`

    Ein variabler Wert. Der Variablenname im Wert wird nicht ersetzt. Wenn der Wert beispielsweise Beispiel #varname# ist, dann ist der Variablenwert auch Beispiel #varname#.

#### Beispiel

```
SetVar(Name,"John")
VarAsIs(name, I am #Name#)
Span(#name#) // I am #Name#
```

## App-Stile für Mobilgeräte

### Layout

#### Titel

* `h1`… `h6`

#### Starke Klassennamen

* `.text-muted`
* `.text-primary`
* `.text-success`
* `.text-info`
* `.text-warning`
* `.text-danger`

#### Farbe

* `.bg-danger-dark`
* `.bg-danger`
* `.bg-danger-light`
* `.bg-info-dark`
* `.bg-info`
* `.bg-info-light`
* `.bg-primary-dark`
* `.bg-primary`
* `.bg-primary-light`
* `.bg-success-dark`
* `.bg-success`
* `.bg-success-light`
* `.bg-warning-dark`
* `.bg-warning`
* `.bg-warning-light`
* `.bg-gray-darker`
* `.bg-gray-dark`
* `.bg-gray`
* `.bg-gray-light`
* `.bg-gray-lighter`

#### Netz

* `.row`
* `.row.row-table`
* `.col-xs-1`… `.col-xs-12`, only used in `.row.row-table`.

#### Panel

* `.panel`
* `.panel.panel-heading`
* `.panel.panel-body`
* `.panel.panel-footer`

#### <span id ="form-app">Form</span>

* `.form-control`

#### <span id = "button-app">Button</span>

* `.btn.btn-default`
* `.btn.btn-link`
* `.btn.btn-primary`
* `.btn.btn-success`
* `.btn.btn-info`
* `.btn.btn-warning`
* `.btn.btn-danger`

#### Symbol

* All fa-class icons are from FontAwesome: `fa fa-<icon-name></icon-name>`.
* All icon-class icons are from SimpleLineIcons: `icon-<icon-name>`.