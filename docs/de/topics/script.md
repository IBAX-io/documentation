# Intelligente Verträge {#smart-contracts}
   - [Vertragsstruktur](#contract-structure)
     - [Datenabschnitt](#data-section)
     - [Abschnitt Bedingungen](#conditions-section)
     - [Aktionsabschnitt](#action-section)
   - [Variablen](#variables)
   - [Verschachtelte Verträge](#nested-contracts)
   - [Datei-Upload](#file-upload)
   - [Abfragen im JSON-Format](#queries-in-json-format)
   - [Abfragen mit Datums- und Zeitoperationen](#queries-with-date-and-time-operations)
   - [Nadelvertragssprache](#needle-contract-language)
     - [Basiselemente und Struktur](#basic-elements-and-structure)
     - [Datentypen und Variablen](#data-types-and-variables)
     - [Reihe](#array)
     - [If- und While-Anweisungen](#if-and-while-statements)
  - [Funktionen](#functions)
     - [Funktionsdeklaration](#function-declaration)
     - [Parameter variabler Länge](#variable-length-parameters)
     - [Optionale Parameter](#optional-parameters)
   - [Klassifizierung der Nadelfunktionen](#needle-functions-classification)
   - [Referenz der Nadelfunktionen](#needle-functions-reference)
    - [AppParam](#appparam)
    - [DBSuche](#dbfind)
    - [DBReihe](#dbrow)
    - [DBWählen Sie Metriken aus](#dbselectmetrics)
    - [EcosysParam](#ecosysparam)
    - [WerdenGeschichte](#gethistory)
    - [Verlaufszeile erhalten](#gethistoryrow)
    - [Spaltentyp erhalten](#getcolumntype)
    - [Daten abrufen vonXLSX](#getdatafromxlsx)
    - [Reihe bekommen CountXLSX](#getrowscountxlsx)
    - [LangRes](#langres)
    - [Block bekommen](#getblock)
    - [DBEinfügung](#dbinsert)
    - [DBAktualisieren](#dbupdate)
    - [DBAktualisierenExt](#dbupdateext)
    - [Spalte löschen](#delcolumn)
    - [Tabelle löschen](#deltable)
    - [Anhängen](#append)
    - [Beitreten](#join)
    - [Teilt](#split)
    - [Len](#len)
    - [Reihe](#row)
    - [One](#one)
    - [Kartenschlüssel erhalten](#getmapkeys)
    - [Sortierte Schlüssel](#sortedkeys)
    - [Anrufvertrag](#callcontract)
    - [Vertragszugang](#contractaccess)
    - [Vertragsbedingungen](#contractconditions)
    - [Eval Zustand](#evalcondition)
    - [Vertrag erhalten von ID](#getcontractbyid)
    - [Vertrag namentlich erhalten](#getcontractbyname)
    - [Rollenzugriff](#roleaccess)
    - [Transaktionsinfo](#transactioninfo)
    - [Wurf](#throw)
    - [Bedingung validieren](#validatecondition)
    - [Adresse an ID](#addresstoid)
    - [ID an Adresse](#idtoaddress)
    - [Pub zu ID](#pubtoid)
    - [DekodierenBase64](#decodebase64)
    - [KodierenBase64](#encodebase64)
    - [Schweben](#float)
    - [HexToBytes](#hextobytes)
    - [Geld formatieren](#formatmoney)
    - [Zufällig](#random)
    - [Int](#int)
    - [Hash](#hash)
    - [Sha256](#sha256)
    - [Str](#str)
    - [JSONEncode](#jsonencode)
    - [JSONEncodeIndent](#jsonencodeindent)
    - [JSONDecode](#jsondecode)
    - [HasPrefix](#hasprefix)
    - [Enthält](#contains)
    - [Ersetzen](#replace)
    - [Größe](#size)
    - [Sprintf](#sprintf)
    - [Substr](#substr)
    - [Zu senken](#tolower)
    - [NachOber](#toupper)
    - [TrimSpace](#trimspace)
    - [Boden](#floor)
    - [Protokoll](#log)
    - [Protokoll10](#log10)
    - [Puh](#pow)
    - [Runden](#round)
    - [Quadrat](#sqrt)
    - [Zeichenfolge zu Bytes](#stringtobytes)
    - [Byte zu Zeichenfolge](#bytestostring)
    - [SysParamString](#sysparamstring)
    - [SysParamInt](#sysparamint)
    - [DBAktualisierenSysParam](#dbupdatesysparam)
    - [Benachrichtigungen aktualisieren](#updatenotifications)
    - [UpdateRoles-Benachrichtigungen](#updaterolesnotifications)
    - [HTTPRequest](#httprequest)
    - [HTTPPostJSON](#httppostjson)
    - [Blockzeit](#blocktime)
    - [Terminzeit](#datetime)
    - [Unix-DateTime](#unixdatetime)
    - [OBS erstellen](#createobs)
    - [WerdenOBSList](#getobslist)
    - [LaufOBS](#runobs)
    - [HaltOBS](#stopobs)
    - [EntfernenOBS](#removeobs)
  - [Systemverträge](#system-contracts)
    - [Neues Ökosystem](#newecosystem)
    - [Ökosystemname bearbeiten](#editecosystemname)
    - [Neuer Vertrag](#newcontract)
    - [Vertrag bearbeiten](#editcontract)
    - [Brieftasche binden](#bindwallet)
    - [Wallet entbinden](#unbindwallet)
    - [Neuer Parameter](#newparameter)
    - [Parameter bearbeiten](#editparameter)
    - [NeuesMenü](#newmenu)
    - [Menü bearbeiten](#editmenu)
    - [Menü anhängen](#appendmenu)
    - [Neue Seite](#newpage)
    - [Seite bearbeiten](#editpage)
    - [Seite anhängen](#appendpage)
    - [NeuerBlock](#newblock)
    - [Block bearbeiten](#editblock)
    - [NeueTabelle](#newtable)
    - [Tabelle bearbeiten](#edittable)
    - [NeueSpalte](#newcolumn)
    - [Spalte bearbeiten](#editcolumn)
    - [NeuLang](#newlang)
    - [BearbeitenLang](#editlang)
    - [Importieren](#import)
    - [ImportHochladen](#importupload)
    - [NewAppParam](#newappparam)
    - [BearbeitenAppParam](#editappparam)
    - [Neuer verzögerter Vertrag](#newdelayedcontract)
    - [Verspäteten Vertrag bearbeiten](#editdelayedcontract)
    - [Binär hochladen](#uploadbinary)

Smart Contract (im Folgenden Vertrag genannt) ist eines der Grundelemente einer Anwendung. Die Implementierung eines Vertrages auf einer Seite durch den Benutzer ist in der Regel ein einmaliger Vorgang, dessen Zweck es ist, einen Datenbankeintrag zu aktualisieren oder zu erstellen. Alle Datenoperationen einer Anwendung bilden ein Vertragssystem, und diese Verträge interagieren miteinander durch Datenbank- oder Vertragsinhaltsfunktionen.

## Vertragsstruktur {#contract-structure}

Verwenden Sie das Schlüsselwort `vertrag`, um einen Vertrag zu deklarieren, gefolgt vom Vertragsnamen, und der Vertragsinhalt muss in geschweiften Klammern eingeschlossen sein. Ein Vertrag besteht im Wesentlichen aus drei Teilen:

1. **Daten** – [data section](#data-section), wobei die Variablen der Eingabedaten deklariert werden, einschließlich Variablenname und Variablentyp;

2. **conditions** – [conditions section](#conditions-section), wo die Korrektheit der Daten validiert wird;

3. **action** – [action section](#action-section), wobei die Datenmanipulationen definiert werden.

```
contract MyContract {
  data {
    FromId int
    ToId int
    Amount money
  }
  func conditions {
    ...
  }
  func action {
    ...
  }
}
```



### Datenbereich {#data-section}

Der Abschnitt `data` beschreibt die Vertragsdateneingaben und die empfangenen Formularparameter.

Die Struktur jeder Zeile nach Sequenz:

* Variablenname - empfängt nur Variablen, keine Arrays;
* Variablendatentyp - der [date type](#Datentypen-und-Variablen) der Variablen;
* optional - ein optionaler Parameter, der das Formularelement nicht ausfüllen muss.

```
contract my {
  data {
  Name string
  RequestId int
  Photo file "optional"
  Amount money
  Private bytes
  }
  ...
}
```



### Abschnitt Bedingungen {#conditions-section}

Der Abschnitt `condition` beschreibt die Validierung der empfangenen Daten.

Die folgenden Befehle werden für Fehlerwarnungen verwendet: schwerwiegende Fehler `error`, warnende Fehler `warning`, suggestive Fehler `info`. Diese drei Befehle erzeugen einen Fehler, der die Ausführung von Verträgen beendet, und jeder Fehler druckt eine andere Art von Fehlerprotokollinformationen. Zum Beispiel:

```
if fuel == 0 {
    error "fuel cannot be zero!"
}
if money < limit {
    warning Sprintf("You don't have enough money: %v <%v", money, limit)
}
if idexist > 0 {
    info "You have already been registered"
}
```

### Aktionsabschnitt {#action-section}

Der Abschnitt `action` beschreibt den Hauptcode des Vertrags, der andere Daten abruft und die Ergebniswerte in Tabellen aufzeichnet. Zum Beispiel:


```
action {
DBUpdate("keys", $key_id, {"-amount": $amount})
DBUpdate("keys", $recipient, {"+amount": $amount, "pub": $Pub})
}
```



## Variablen {#variables}

Im Datenabschnitt deklarierte Variablen werden über das `$`-Symbol gefolgt vom Variablennamen an andere Vertragsabschnitte übergeben. Das Symbol „$“ kann auch verwendet werden, um andere Variablen zu deklarieren, die sich nicht im Datenabschnitt befinden und als globale Variablen dieses Vertrags und aller Verträge gelten, in die dieser Vertrag verschachtelt ist.

In Verträgen können vordefinierte Variablen verwendet werden, die Transaktionsdaten enthalten, die den Vertrag aufgerufen haben:


* `$time` - Transaktionszeitstempel;
* `$ecosystem_id` - Ökosystem-ID;
* `$block` - ID des Blocks, der die Transaktion enthält;
* `$key_id` - Adresse des Kontos, das die aktuelle Transaktion unterzeichnet hat;
* `$type` - Vertrags-ID in der virtuellen Maschine;
* `$block_key_id` - Kontoadresse des Knotens, der den Block erzeugt hat;
* `$block_time` - Zeitstempel der Blockgenerierung;
* `$original_contract` -Name des Vertrags, der die Transaktion ursprünglich verarbeitet hat. Dies bedeutet, dass der Vertrag während der Transaktionsvalidierung aufgerufen wird, wenn die Variable eine leere Zeichenfolge ist. Um zu prüfen, ob der Vertrag von einem anderen Vertrag oder direkt von der Transaktion aufgerufen wird, müssen Sie die Werte von $original_contract und $this_contract vergleichen. Das bedeutet, dass der Vertrag von der Transaktion aufgerufen wird, wenn sie gleich sind;
* `$this_contract` - Name des aktuell ausgeführten Vertrages;
* `$guest_key` - Adresse des Gastkontos;
* `$stack` - Contract Array Stack mit dem Datentyp Array, der alle ausgeführten Contracts enthält. Das erste Element des Arrays stellt den Namen des Vertrags dar, der gerade ausgeführt wird, während das letzte Element den Namen des Vertrags darstellt, der die Transaktion ursprünglich verarbeitet hat;
* `$node_position` - die Indexnummer des Verifizierungsknotenarrays, wo sich der Block befindet;
* `$txhash` - Transaktions-Hash;
* `$contract` - das aktuelle Vertragsstruktur-Array.

Auf vordefinierte Variablen kann nicht nur in Verträgen zugegriffen werden, sondern auch in Berechtigungsfeldern, die die Zugriffsberechtigungsbedingungen der Anwendungselemente definieren. Bei Verwendung in Berechtigungsfeldern sind vordefinierte Variablen für Blockinformationen immer gleich Null, wie z. B. `$time`, `$block` usw.

Eine vordefinierte Variable `$result` wird mit dem Rückgabeergebnis des Vertrags zugewiesen.
```
contract my {
 data {
     Name string
     Amount money
 }
 func conditions {
     if $Amount <= 0 {
     error "Amount cannot be 0"
     }
     $ownerId = 1232
 }
 func action {
     var amount money
     amount = $Amount - 10
     DBUpdate("mytable", $ownerId, {name: $Name,amount: amount})
     DBUpdate("mytable2", $ownerId, {amount: 10})
 }
}
```

## Verschachtelte Verträge {#nested-contracts}

Sie können Verträge in den Abschnitten „Bedingungen“ und „Aktionen“ des Vertrags verschachteln. Verschachtelte Verträge können direkt aufgerufen werden, und die Vertragsparameter werden in Klammern hinter dem Vertragsnamen angegeben, z. B. `@1NameContract(Params)`. Sie können auch verschachtelte Verträge mit der Funktion [CallContract](#callcontract) aufrufen.

## Datei-Upload {#file-upload}

Um eine Datei über ein Formular im Format `multipart/form-data` hochzuladen, muss der Datentyp des Vertrages `file` sein.
```
contract Upload {
     data {
  	   File file
     }
     ...
}
```

Der Vertrag [UploadBinary](#uploadbinary) wird zum Hochladen und Speichern von Dateien verwendet. Mit der Logicor-Sprachfunktion [Binary](templates2.md#binary) im Seiteneditor erhalten Sie den Link zum Herunterladen der Datei.

## Abfragen im JSON-Format {#queries-in-json-format}

In der Vertragssprache kann als Feldtyp **JSON** angegeben werden. Sie können die Syntax: **columnname->fieldname** verwenden, um das Eingabefeld zu verarbeiten. Der erhaltene Wert wird in **columnname.fieldname** aufgezeichnet. Die obige Syntax kann in Columns,One,Where der Funktion [DBFind](#dbfind) verwendet werden.

```
var ret map
var val str
var list array
ret = DBFind("mytable").Columns("myname,doc,doc->ind").WhereId($Id).Row()
val = ret["doc.ind"]
val = DBFind("mytable").Columns("myname,doc->type").WhereId($Id).One("doc->type")
list = DBFind("mytable").Columns("myname,doc,doc->ind").Where("doc->ind = ?", "101")
val = DBFind("mytable").WhereId($Id).One("doc->check")
```



## Abfragen mit Datums- und Zeitoperationen {#queries-with-date-and-time-operations}

Sie können das Datum und die Uhrzeit nicht direkt mit den Vertragssprachenfunktionen abfragen und aktualisieren, aber Sie können PostgreSQL-Funktionen und -Features in der Where-Anweisung wie im folgenden Beispiel verwenden. Beispielsweise müssen Sie das Feld date_column mit der aktuellen Uhrzeit vergleichen. Wenn date_column ein Zeitstempeltyp ist, sollte der Ausdruck `date_column <NOW()` sein; wenn date_column ein Unix-Typ ist, sollte der Ausdruck `to_timestamp(date_column)> NOW()` lauten.

```
Where("to_timestamp(date_column)> NOW()")
Where("date_column <NOW() - 30 * interval '1 day'")
```

Die folgende Needle-Funktion wird verwendet, um Datum und Uhrzeit im SQL-Format zu verarbeiten:

* [Blockzeit](#blocktime)
* [Terminzeit](#datetime)
* [Unix-DateTime](#unixdatetime)

## Nadelvertragssprache {#needle-contract-language}

Die Vertragssprache umfasst eine Reihe von Funktionen, Operatoren und Strukturen, die Datenalgorithmusverarbeitung und Datenbankoperationen realisieren können.

Der Vertragsinhalt kann geändert werden, wenn die Vertragsbearbeitungsberechtigung nicht auf `false` gesetzt ist. Die komplette Historie der Vertragsänderungen wird in der Blockchain gespeichert, die in Weaver verfügbar ist.

Datenoperationen in der Blockchain werden gemäß der neuesten Vertragsversion ausgeführt.

### Grundelemente und Struktur {#basic-elements-and-structure}

### Datentypen und Variablen {#data-types-and-variables}

Der Datentyp muss für jede Variable definiert werden. Normalerweise werden Datentypen automatisch konvertiert. Folgende Datentypen können verwendet werden:

* `bool` - Boolesch, `true` oder `false`;
* `bytes` - ein Byte-Format;
* `Int` - eine 64-Bit-Ganzzahl;
* `Array` - ein Array beliebigen Typs;
* `map` - ein Objektarray;
* `money` - eine große Ganzzahl;
* `float` - eine 64-Bit-Float-Zahl;
* `string` - eine Zeichenkette muss mit doppelten Anführungszeichen oder Escape-Format definiert werden: "Dies ist eine Zeichenkette" oder \`Dies ist eine Zeichenkette\`;

* `file` - ein Objekt-Array:
  * `Name` - Dateinamen, `string` Typ;
  * `MimeType` - **mime-type** Datei, `string` Typ;
  * `Body` - Dateiinhalt, `bytes` typ.

Alle Bezeichner, einschließlich der Namen von Variablen, Funktionen und Verträgen, sind zwischen Groß- und Kleinschreibung zu unterscheiden (MyFunc und myFunc sind unterschiedliche Namen).

Verwenden Sie das Schlüsselwort **var**, um eine Variable zu deklarieren, gefolgt vom Namen und Typ der Variablen. In geschweiften Klammern deklarierte Variablen müssen in demselben Klammerpaar verwendet werden.

Der Standardwert jeder deklarierten Variablen ist Null: Der Nullwert des bool-Typs ist falsch, der Nullwert aller numerischen Typen ist 0 und der Nullwert für Zeichenfolgen, leere Zeichenfolgen. Ein Beispiel für eine Variablendeklaration:

```
func myfunc( val int) int {
  var mystr1 mystr2 string, mypar int
  var checked bool
  ...
  if checked {
    var temp int
    ...
  }
}
```


### Array {#array}

Die Vertragssprache unterstützt zwei Array-Typen:
* `Array` - ein Array mit Index beginnend bei 0;
* `map` - ein Array von Objekten.

Beim Allokieren und Abrufen von Array-Elementen muss der Index in eckige Klammern gesetzt werden. Mehrere Indizes werden im Array nicht unterstützt, und die Array-Elemente können nicht als myarr[i][j] behandelt werden.

```
var myarr array
var mymap map
var s string

myarr[0] = 100
myarr[1] = "This is a line"
mymap["value"] = 777
mymap["param"] = "Parameter"

s = Sprintf("%v, %v, %v", myarr[0] + mymap["value"], myarr[1], mymap["param"])
// s = 877, This is a line, Parameter
```

Sie können auch Arrays vom Typ Array definieren, indem Sie Elemente in `[]` angeben. Für den Kartentyp `arrays` verwenden Sie bitte `{}`.

```
var my map
my={"key1": "value1", key2: i, "key3": $Name}
var mya array
mya=["value1", {key2: i}, $Name]
```

Sie können eine solche Initialisierung in Ausdrücken verwenden. Verwenden Sie es beispielsweise in Funktionsparametern.

```
DBFind...Where({id: 1})
```

Für ein Array von Objekten müssen Sie einen Schlüssel angeben. Schlüssel werden als Zeichenfolgen in doppelten Anführungszeichen (`""`) angegeben. Wenn der Schlüsselname auf Buchstaben, Zahlen und Unterstriche beschränkt ist, können Sie die doppelten Anführungszeichen weglassen.

```
{key1: "value1", key2: "value2"}
```

Ein Array kann Zeichenfolgen, Zahlen, Variablennamen beliebigen Typs und Variablennamen mit dem Symbol `$` enthalten. Es unterstützt verschachtelte Arrays. Sie können verschiedene Maps oder Arrays als Werte angeben.

Ausdrücke können nicht als Array-Elemente verwendet werden. Verwenden Sie eine Variable, um das Ergebnis des Ausdrucks zu speichern, und geben Sie diese Variable als Array-Element an.

```
[1+2, myfunc(), name["param"]] // don't do this
[1, 3.4, mystr, "string", $ext, myarr, mymap, {"ids": [1,2, i], company: {"Name": "MyCompany"}} ] // this is ok

var val string
val = my["param"]
MyFunc({key: val, sub: {name: "My name", "color": "Red"}})
```

### If- und While-Anweisungen {#if-and-while-statements}

Die Vertragssprache unterstützt standardmäßige **if**-Bedingungsanweisungen und **while**-Schleifen, die in Verträgen und Funktionen verwendet werden können. Diese Anweisungen können ineinander verschachtelt werden.

Auf **if** und **while** muss eine bedingte Anweisung folgen. Wenn die bedingte Anweisung eine Zahl zurückgibt, wird sie als falsch angesehen, wenn ihr Wert 0 ist.

val == 0 ist gleich !val, val != 0 ist gleich val. Die **if**-Anweisung kann einen **else**-Codeblock haben, und **else** wird ausgeführt, wenn die **if**-Bedingungsanweisung falsch ist.

Die folgenden Vergleichsoperatoren können in bedingten Anweisungen verwendet werden: `<, >, >=, <=, ==, !=, ||, &&`

```
if val> 10 || id != $block_key_id {
 ...
} else {
 ...
}
```

Der Codeblock wird ausgeführt, wenn die bedingte Anweisung der **while**-Schleife wahr ist. **break** bedeutet, die Schleife des Codeblocks zu beenden. Wenn Sie eine Schleife von Anfang an beginnen möchten, verwenden Sie **continue**.

```
var i int
while true {
  if i > 100 {
    break
  }
  ...
  if i == 50 {
    continue
  }
  ...
  i = i + 1
}
```

Zusätzlich zu bedingten Anweisungen unterstützt Needle auch Standardarithmetikoperationen: `+`, `-`, `*`, `/`.

Variablen vom Typ String und Bytes können als bedingte Anweisung verwendet werden. Wenn die Länge des Typs größer als Null ist, ist die Bedingung wahr, andernfalls ist sie falsch.

## Funktionen {#functions}

Funktionen können einige Operationen mit den vom [data section](#data-section) eines Vertrags empfangenen Daten ausführen: Daten aus der Datenbank lesen und schreiben, den Werttyp konvertieren und die Interaktion zwischen Verträgen herstellen.

### Funktionsdeklaration {#function-declaration}

Verwenden Sie das Schlüsselwort func, um eine Funktion zu deklarieren, gefolgt vom Namen und der Liste der übergebenen Parameter und ihrer Typen. Alle Parameter sind in Klammern eingeschlossen und durch Kommas getrennt. Nach den Klammern muss der Datentyp des von der Funktion zurückgegebenen Werts deklariert werden. Der Funktionskörper muss in geschweifte Klammern eingeschlossen werden. Wenn die Funktion keine Parameter hat, können die geschweiften Klammern weggelassen werden. Um einen Wert von einer Funktion zurückzugeben, verwenden Sie das Schlüsselwort `return`.

```
func myfunc(left int, right int) int {
    return left*right + left - right
}
func test int {
    return myfunc(10, 30) + myfunc(20, 50)
}
func ooops {
    error "Ooops..."
}
```

Funktion gibt keine Fehler zurück, da alle Fehlerprüfungen automatisch durchgeführt werden. Wenn in irgendeiner Funktion ein Fehler auftritt, beendet der Vertrag seinen Betrieb und zeigt die Fehlerbeschreibung in einem Fenster an.

### Parameter variabler Länge {#variable-length-parameters}

Funktionen können Parameter mit variabler Länge definieren, verwenden Sie das Symbol `...` als letzten Parametertyp der Funktion, um Parameter mit variabler Länge mit einem Datentyp von `Array` anzugeben. Parameter mit variabler Länge umfassen alle Variablen ab dem Zeitpunkt, an dem der Parameter im Aufruf übergeben wird. Alle Arten von Variablen können übergeben werden, aber Sie müssen mit Konflikten durch Nichtübereinstimmung von Datentypen umgehen.

```
func sum(out string, values ...) {
var i, res int

while i <Len(values) {

   res = res + values[i]

   i = i + 1

}

Println(out, res)

}

func main() {
  sum("Sum:", 10, 20, 30, 40)
}
```



### Optionale Parameter {#optional-parameters}

Eine Funktion hat viele Parameter, aber wir brauchen nur einige davon, wenn wir sie aufrufen. In diesem Fall können Sie optionale Parameter folgendermaßen deklarieren: `func myfunc(name string).Param1(param string).Param2(param2 int) {...}`, dann können Sie die angegebenen Parameter in beliebiger Reihenfolge aufrufen : `myfunc("name").Param2(100)`.

Im Funktionskörper können Sie diese Variablen ganz normal behandeln. Wenn keine angegebenen optionalen Parameter aufgerufen werden, sind ihre Standardwerte Null. Sie können auch ... verwenden, um einen Parameter variabler Länge anzugeben: `func DBFind(table string).Where(request string, params ...)` und dann aufrufen: `DBFind("mytable").Where({ " id": $myid, "type": 2})`

```
func DBFind(table string).Columns(columns string).Where(format string, tail ...)
  .Limit(limit int).Offset(offset int) string {
  ...
}

func names() string {
  ...
  return DBFind("table").Columns("name").Where({"id": 100}).Limit(1)
}
```

## Needle Funktionsklassifizierung {#needle-functions-classification}

Abrufen von Werten aus der Datenbank:

|                 |               |                 |
| --------------- | ------------- | --------------- |
| [AppParam](#appparam)        | [EcosysParam](#ecosysparam)   | [GetDataFromXLSX](#getdatafromxlsx) |
| [DBFind](#dbfind)          | [GetHistory](#gethistory)    | [GetRowsCountXLSX](#getrowscountxlsx) |
| [DBRow](#dbrow)           | [GetHistoryRow](#gethistoryrow) | [GetBlock](#getblock)        |
| [DBSelectMetrics](#dbselectmetrics) | [GetColumnType](#getcolumntype) | [LangRes](#langres)         |

Daten in Tabellen aktualisieren:

|          |             |          |
| -------- | ----------- | -------- |
| [DBInsert](#dbinsert) | [DBUpdateExt](#dbupdateext) | [DelTable](#deltable) |
| [DBUpdate](#dbupdate) | [DelColumn](#delcolumn)   |          |

Operationen mit Arrays:

|        |      |            |
| ------ | ---- | ---------- |
| [Append](#append) | [Len](#len)  | [GetMapKeys](#getmapkeys) |
| [Join](#join)   | [Row](#row)  | [SortedKeys](#sortedkeys) |
| [Split](#split)  | [One](#one)  |            |

Operationen mit Verträgen und Genehmigungen:

|                    |                   |                   |
| ------------------ | ----------------- | ----------------- |
| [CallContract](#callcontract)       | [GetContractById](#getcontractbyid)   | [TransactionInfo](#transactioninfo)   |
| [ContractAccess](#contractaccess)     | [RoleAccess](#roleaccess)        | [Throw](#throw)             |
| [ContractConditions](#contractconditions) | [GetContractByName](#getcontractbyname) | [ValidateCondition](#validatecondition) |
| [EvalCondition](#evalcondition)      |                   |                   |


Operationen mit Adressen:

|             |             |         |
| ----------- | ----------- | ------- |
| [AddressToId](#addresstoid) | [IdToAddress](#idtoaddress) | [PubToID](#pubtoid) |


Operationen mit variablen Werten:

|              |             |        |
| ------------ | ----------- | ------ |
| [DecodeBase64](#decodebase64) | [FormatMoney](#formatmoney) | [Hash](#hash)   |
| [EncodeBase64](#encodebase64) | [Random](#random)      | [Sha256](#sha256) |
| [Float](#float)        | [Int](#int)         | [Str](#str)    |
| [HexToBytes](#hextobytes)   |             |        |

Rechenoperationen:

|       |       |       |
| ----- | ----- | ----- |
| [Floor](#floor) | [Log10](#log10) | [Round](#round) |
| [Log](#log)   | [Pow](#pow)   | [Sqrt](#sqrt)  |




Operationen mit JSON:

|            |                  |            |
| ---------- | ---------------- | ---------- |
| [JSONEncode](#jsonencode) | [JSONEncodeIndent](#jsonencodeindent) | [JSONDecode](#jsondecode) |


Operationen mit Strings:

|           |         |           |
| --------- | ------- | --------- |
| [HasPrefix](#hasprefix) | [Size](#size)    | [ToLower](#tolower)   |
| [Contains](#contains)  | [Sprintf](#sprintf) | [ToUpper](#toupper)   |
| [Replace](#replace)   | [Substr](#substr)  | [TrimSpace](#trimspace) |


Operationen mit Bytes:

|               |               |      |
| ------------- | ------------- | ---- |
| [StringToBytes](#stringtobytes) | [BytesToString](#bytestostring) |      |


Operationen mit Datum und Uhrzeit im SQL-Format:

|           |          |              |
| --------- | -------- | ------------ |
| [BlockTime](#blocktime) | [DateTime](#datetime) | [UnixDateTime](#unixdatetime) |


Operationen mit Plattformparametern:

|             |              |      |
| ----------- | ------------ | ---- |
| [HTTPRequest](#httprequest) | [HTTPPostJSON](#httppostjson) |      |




Funktionen für Master-CLB-Knoten:

|            |         |           |
| ---------- | ------- | --------- |
| [CreateOBS](#createobs)  | [RunOBS](#runobs)  | [RemoveOBS](#removeobs) |
| [GetOBSList](#getobslist) | [StopOBS](#stopobs) |           |



## Needle Funktionen Referenz {#needle-functions-reference}


### AppParam {#appparam}

Gibt den Wert eines angegebenen Anwendungsparameters (aus der Anwendungsparametertabelle app_params) zurück.

**Syntax**

```
AppParam(app int, name string, ecosystemid int) string
```

* **App**

  Application ID.

* **name**

    Name des Anwendungsparameters.

* **Ecosystemid**

    Ökosystem-ID.

**Beispiel**

```
AppParam(1, "app_account", 1)
```



### DBFind {#dbfind}

Fragt Daten aus einer angegebenen Tabelle mit den angegebenen Parametern ab und gibt ein Array zurück, das aus einem Array von Objekten besteht.

`.Row()` kann das erste Kartenelement in der Abfrage erhalten, `.One(column string)` kann das erste Kartenelement einer angegebenen Spalte in der Abfrage erhalten.

**Syntax**

```
DBFind(table string)
 [.Columns(columns array|string)]
 [.Where(where map)]
 [.WhereId(id int)]
 [.Order(order string)]
 [.Limit(limit int)]
 [.Offset(offset int)]
 [.Row()]
 [.One(column string)]
 [.Ecosystem(ecosystemid int)] array
```

* **table**

 Tabellenname.

* **сolumns**

   Gibt eine Liste von Spalten zurück. Wenn nicht angegeben, werden alle Spalten zurückgegeben.

   Der Wert ist ein Array oder ein durch Kommas getrennter String.

* **where**

  Query conditions.

  Beispiel: `.Where({name: "John"})` or `.Where({"id": {"$gte": 4}})`.

  Dieser Parameter muss ein Array von Objekten mit Suchkriterien enthalten. Das Array kann verschachtelte Elemente enthalten.

   Folgende syntaktische Konstruktionen werden verwendet:
  * `{"field1": "value1", "field2": "value2"}`
     Gleichwertig `field1 = "value1" AND field2 = "value2"`.

  * `{"field1": {"$eq":"value"}}`
     Gleichwertig `field = "value"`.

  * `{"field1": {"$neq": "value"}}`
     Gleichwertig `field != "value"`.

  * `{"field1: {"$in": [1,2,3]}`
     Gleichwertig`field IN (1,2,3)`.

  * `{"field1": {"$nin": [1,2,3]}`
     Äquivalent zum Feld NOT IN (1,2,3).

  * `{"field": {"$lt": 12}}`
     Gleichwertig `field <12`.

  * `{"field": {"$lte": 12}}`
     Gleichwertig f`ield <= 12`.

  * `{"field": {"$gt": 12}}`
     Gleichwertig `field> 12`.

  * `{"field": {"$gte": 12}}`
     Gleichwertig `field >= 12`.

  * `{"$and": [<expr1>, <expr2>, <expr3>]}`
     Gleichwertig `expr1 AND expr2 AND expr3`.

  * `{"$or": [<expr1>, <expr2>, <expr3>]}`
     Gleichwertig `expr1 OR expr2 OR expr3`.

  * `{field: {"$like": "value"}}`
     Gleichwertig `field like'%value%'` (fuzzy search).

  * `{field: {"$begin": "value"}}`
     Gleichwertig `field like'value%'` (starts with `value`).

  * `{field: {"$end": "value"}}`
     Gleichwertig `field like'%value'` (ends with `value`).

  * `{field: "$isnull"}`
     Äquivalent zum Feld ist null.

     

Achten Sie darauf, die Schlüssel von Objekt-Arrays nicht zu überschreiben. Wenn Sie beispielsweise mit `id>2 und id<5` abfragen möchten, können Sie `{id:{"$gt": 2}, id:{"$lt": 5}}` nicht verwenden, da die Das erste Element wird durch das zweite Element überschrieben. Sie sollten die folgende Abfragestruktur verwenden:
```
{id: [{"$gt": 2}, {"$lt": 5}]}
```
```
{"$and": [{id:{"$gt": 2}}, {id:{"$lt": 5}}]}
```

* **Id**

     Abfragen nach ID. Beispiel: .WhereId(1).

     

* **Befehl**

      Wird verwendet, um die Ergebnismenge nach einer bestimmten Spalte oder standardmäßig nach ID zu sortieren.

      Wenn Sie nur ein Feld zum Sortieren verwenden, können Sie es als Zeichenfolge angeben. Um mehrere Felder zu sortieren, müssen Sie ein Array von String-Objekten angeben:

      Absteigende Reihenfolge: `{"field": "-1"}` Äquivalent zu `field desc`.

      Aufsteigende Reihenfolge: `{"field": "1"}` Äquivalent zu `field asc`.

* **Grenze**

      Gibt die Anzahl der Einträge zurück. 25, standardmäßig. Die maximale Anzahl beträgt 10.000.

* **Versatz**

      Versatz.

* **Ökosystemid**

      Ökosystem-ID. Standardmäßig wird die Tabelle des aktuellen Ökosystems abgefragt.

     

**Beispiel**

```
var i int
var ret string
ret = DBFind("contracts").Columns("id,value").Where({id: [{"$gt": 2}, {"$lt": 5}]}).Order( "id")
while i <Len(ret) {
  var vals map
  vals = ret[0]
  Println(vals["value"])
  i = i + 1
}
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
  Println(ret)
  Println(ret)
  Println(ret)
}
```

​     


### DBZeile {#dbrow}

Fragt Daten aus einer angegebenen Tabelle mit den angegebenen Parametern ab. Gibt ein Array zurück, bestehend aus einem Array von Objekten map.

**Syntax**

```
DBRow(table string)
 [.Columns(columns array|string)]
 [.Where(where map)]
 [.WhereId(id int)]
 [.Order(order array|string)]
 [.Ecosystem(ecosystemid int)] map
```

* **table**

  Tabellenname.

* **columns**
  
  Gibt eine Liste von Spalten zurück. Wenn nicht angegeben, werden alle Spalten zurückgegeben.

   Der Wert ist ein Array oder ein durch Kommas getrennter String.

* **where**

  Bedingungen abfragen.

  Zum Beispiel: `.Where({name: "John"})` or `.Where({"id": {"$gte": 4}})`.

  Weitere Einzelheiten finden Sie unter [DBFind](#dbfind).
* **Id**
  
  Abfrage nach ID. Zum Beispiel, `.WhereId(1)`.

* **Befehl**

   Wird verwendet, um die Ergebnismenge nach einer bestimmten Spalte oder standardmäßig nach ID zu sortieren.

   Weitere Einzelheiten finden Sie unter [DBFind](#dbfind).

* **Ökosystemid**

   Ökosystem-ID. Standardmäßig wird die Tabelle des aktuellen Ökosystems abgefragt.

**Beispiel**


```
var ret map
ret = DBRow("contracts").Columns(["id","value"]).Where({id: 1})
Println(ret)
```



### DBSelectMetrics {#dbselectmetrics}

Gibt die aggregierten Daten einer Metrik zurück.

Die Metriken werden jedes Mal aktualisiert, wenn 100 Blöcke generiert werden. Und die aggregierten Daten werden in einem 1-Tages-Zyklus gespeichert.

**Syntax**

```
DBSelectMetrics(metric string, timeInterval string, aggregateFunc string) array

```

* **metric**

  Metrikname

  * **ecosystem_pages**
  
    Anzahl der Ökosystemseiten.

     Rückgabewert: Schlüssel - Ökosystem-ID, Wert - Anzahl der Ökosystemseiten.
  * **ecosystem_members**
    Anzahl der Ökosystemmitglieder.

     Rückgabewert: Schlüssel - Ökosystem-ID, Wert - Anzahl der Ökosystemmitglieder.
  * **ecosystem_tx**

     Anzahl der Ökosystemtransaktionen.

     Rückgabewert: Schlüssel - Ökosystem-ID, Wert - Anzahl der Ökosystemtransaktionen.

* **timeInterval**

    Das Zeitintervall zum Aggregieren von Metrikdaten. Zum Beispiel: `1 day`, `30 days`.

* **aggregateFunc**

    Aggregatfunktion. Zum Beispiel, `max`, `min`, `avg`.

**Beispiel**

```
var rows array
rows = DBSelectMetrics("ecosystem_tx", "30 days", "avg")
var i int
while(i <Len(rows)) {
  var row map
  row = rows[i]
  i = i + 1
}
```



### EcosysParam {#ecosysparam}

Gibt den Wert eines angegebenen Parameters in den Parametern der Ökosystemparametertabelle zurück.

**Syntax**

```
EcosysParam(name string) string

```

* **name**

  Parametername.

**Beispiel**

```
Println(EcosysParam("founder_account"))
```



### GetHistory {#gethistory}

Gibt den Verlauf der Änderungen an Einträgen in einer angegebenen Tabelle zurück.

**Syntax**

```
GetHistory(table string, id int) array

```

* **table**

  Tabellenname.
* **Id**

  Eintrags-ID.
> **Rückgabewert**

   Gibt ein Array von Objekten vom Typ map zurück, die den Änderungsverlauf von Einträgen in Tabellen angeben.

   Jedes Array enthält die Felder eines Datensatzes, bevor die nächste Änderung vorgenommen wird.
   Das Array ist nach der Reihenfolge der letzten Änderungen sortiert.
  
   Das ID-Feld im Array zeigt auf die ID der rollback_tx-Tabelle. block_id stellt die Block-ID dar, während block_time den Zeitstempel der Blockgenerierung darstellt.

**Beispiel**

```
var list array
var item map
list = GetHistory("blocks", 1)
if Len(list) > 0 {
  item = list[0]
}
```



### GetHistoryRow {#gethistoryrow}

Gibt einen einzelnen Snapshot aus dem Änderungsverlauf eines angegebenen Eintrags in einer angegebenen Tabelle zurück.

**Syntax**

```
GetHistoryRow(table string, id int, rollbackId int) map
```



* **table**

  Tabellenname.

* **Id**

  Eintrags-ID.

* **rollbackId**

  rollback_tx die Eintrags-ID der Tabelle.

```
  $result = GetHistoryRow("contracts",205,2358)
```

  


### GetColumnType {#getcolumntype}

Gibt den Datentyp eines angegebenen Felds in einer angegebenen Tabelle zurück.

**Syntax**

```
GetColumnType(table, column string) string

```

* **table**

  Tabellenname.
* **column**

  Field Name.
> **Return value**

  Folgende Typen können zurückgegeben werden: `text, varchar, number, money, double, bytes, json, datetime, double`.

**Beispiel**

```
var coltype string
coltype = GetColumnType("members", "member_name")
```



### Daten abrufen vonXLSX {#getdatafromxlsx}

Gibt Daten aus XLSX-Tabellen zurück.

**Syntax**

```
GetDataFromXLSX(binId int, line int, count int, sheet int) string

```

* **binId**

   ID im XLSX-Format in der Binärtabelle binär.
* **line**

   Die Startzeilennummer, beginnend standardmäßig bei 0.
* **count**

   Die Anzahl der Zeilen, die zurückgegeben werden müssen.
* **sheet**

   Listennummer, beginnend standardmäßig bei 1.

**Beispiel**

```
var a array
a = GetDataFromXLSX(3, 12, 10, 1)
```



### GetRowsCountXLSX {#getrowscountxlsx}

Gibt die Anzahl der Zeilen in einer angegebenen XLSX-Datei zurück.

**Syntax**

```
GetRowsCountXLSX(binId int, sheet int) int
```

* **binId**

  ID in XLSX format in the binary table binary.
* **sheet**

  List number, starting from 1 by default.

**Beispiel**

```
var count int
count = GetRowsCountXLSX(binid, 1)
```



### LangRes {#langres}

Gibt eine mehrsprachige Ressource mit Namensbeschriftung für die Sprache lang zurück, die als zweistelliger Code angegeben ist, zum Beispiel: `en`, `zh`. Wenn für eine ausgewählte Sprache keine Sprache vorhanden ist, wird die Sprachressource des `en`-Labels zurückgegeben.,
**Syntax**

```
LangRes(label string, lang string) string
```

* **label**

  Name der Sprachressource.
* **lang**

  Zweistelliger Sprachcode.

**Beispiel**

```
warning LangRes("@1confirm", "en")
error LangRes("@1problems", "zh")
```



### Block bekommen {#getblock}

Gibt relevante Informationen zu einem angegebenen Block zurück.

**Syntax**

```
GetBlock(blockID int64) map

```

***blockID**

   Block-ID.
> **Return value**

   Gibt ein Array von Objekten zurück:
   * **Ich würde**
  
      Block-ID.
   * **Time**
  
      Zeitstempel der Blockgenerierung.
   * **key_id**
  
      Die Kontoadresse des Verifizierungsknotens hat den Block generiert.

**Beispiel**

```
var b map
b = GetBlock(1)
Println(b)
```



### DBEinfügen {#dbinsert}

Fügt einer angegebenen Tabelle einen Eintrag hinzu und gibt die Eintrags-ID zurück.

**Syntax**

```
DBInsert(table string, params map) int

```

* **tblname**

   Tabellenname.
* **Parameter**

   Ein Array von Objekten, bei dem Schlüssel Feldnamen und Werte eingefügte Werte sind.

**Beispiel**

```
DBInsert("mytable", {name: "John Smith", amount: 100})
```


### DB-Update {#dbupdate}

Ändert den Spaltenwert einer angegebenen Eintrags-ID in einer angegebenen Tabelle. Wenn die Eintrags-ID nicht in der Tabelle vorhanden ist, wird ein Fehler zurückgegeben.

**Syntax**

```
DBUpdate(tblname string, id int, params map)

```

* **tblname**

   Tabellenname.
* **Id**

   Eintrags-ID.
* **Params**

   Ein Array von Objekten, bei dem Schlüssel Feldnamen und Werte neue Werte nach Änderungen sind.

**Beispiel**

```
DBUpdate("mytable", myid, {name: "John Smith", amount: 100})
```



### DB-UpdateExt {#dbupdateext}

Ändert den Wert einer Spalte in einer angegebenen Tabelle, die der Abfragebedingung entspricht.

**Syntax**

```
DBUpdateExt(tblname string, where map, params map)

```

* **tblname**

  Tabellenname.
* **where**

   Bedingungen abfragen.

   Weitere Einzelheiten finden Sie unter [DBFind](#dbfind).
* **params**

Ein Array von Objekten, bei dem Schlüssel Feldnamen und Werte neue Werte nach Änderungen sind.

**Beispiel**

```
DBUpdateExt("mytable", {id: $key_id, ecosystem: $ecosystem_id}, {name: "John Smith", amount: 100})
```



### Spalte löschen {#delcolumn}

Löscht ein Feld in einer angegebenen Tabelle, das keine Datensätze enthält.

**Syntax**

```
DelColumn(tblname string, column string)

```

* **tblname**

  Table name.

* **column**

  The field to be deleted.

```
DelColumn("mytable", "mycolumn")
```

  


### Spalte löschen {#deltable}

Löscht eine angegebene Tabelle, die keine Datensätze enthält.

**Syntax**

```
DelTable(tblname string)

```

* **tblname**

  Table name.

**Beispiel***

```
DelTable("mytable")
```



### Anhängen {#append}

Fügt einen beliebigen Werttyp in das src-Array ein.

**Syntax**

Append(src array, val anyType) array

* **src**

  Das ursprüngliche Array.
* **val**

  Der einzufügende Wert.

**Beispiel**

```
var list array
list = Append(list, "new_val")
```



### Beitreten {#join}

Kombiniert Elemente des in-Arrays zu einer Zeichenfolge mit einem angegebenen Sep-Trennzeichen.

**Syntax**

```
Join(in array, sep string) string

```

* **In**

  Array-Name.
* **sep**

  Separator.

**Beispiel**

```
 var val string, myarr array
 myarr[0] = "first"
 myarr[1] = 10
 val = Join(myarr, ",")
```



### Teilt {#split}

Verwendet das Trennzeichen sep, um den in-String in Elemente aufzuteilen und sie in ein Array einzufügen.

**Syntax**

```
Split(in string, sep string) array
```

* **In**

   String.
*  **sep**

   Separator.

**Beispiel***

```
var myarr array
myarr = Split("first,second,third", ",")
```



### Len {#len}

Gibt die Anzahl der Elemente in einem angegebenen Array zurück.

**Syntax**

 

```
Len(val array) int
```

* **val**

   Array.

**Beispiel***

```
if Len(mylist) == 0 {
  ...
}
```



### Reihe {#row}

 Der Listenparameter darf in diesem Fall nicht angegeben werden. Gibt das erste Objekt-Array in der Array-Liste zurück. Wenn die Liste leer ist, wird ein leeres Ergebnis zurückgegeben. Diese Funktion wird meistens in Verbindung mit der Funktion [DBFind](#dbfind) verwendet. Bei Verwendung dieser Funktion können Sie keine Parameter angeben.

**Syntax**

```
 Row(list array) map
```

* **list**

Das Array von Objekten, das von der DBFind-Funktion zurückgegeben wird.

**Beispiel**

```
 var ret map
 ret = DBFind("contracts").Columns("id,value").WhereId(10).Row()
 Println(ret)
```



### Ein {#one}

 Gibt den Feldwert des ersten Objekt-Arrays in der Array-Liste zurück. Wenn das Listenarray leer ist, wird nil zurückgegeben. Es wird meistens in Verbindung mit der Funktion [DBFind](#dbfind) verwendet. Bei Verwendung dieser Funktion können Sie keine Parameter angeben.

**Syntax**

```
One(list array, column string) string
```

*  **list**

  The array of objects returned by the DBFind function.

* **column**

  Feldname.

**Beispiel**

```
var ret string
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
  Println(ret)
}
```



### Holen Sie sich Kartenschlüssel {#getmapkeys}

Gibt das Schlüsselarray im Objektarray zurück.

**Syntax**

 

```
GetMapKeys(val map) array
```

* **val**

    Objekt-Array.

**Beispiel**

```
var val map
var arr array
val["k1"] = "v1"
val["k2"] = "v2"
arr = GetMapKeys(val)
```



### Sortierte Schlüssel {#sortedkeys}

Gibt ein sortiertes Schlüsselarray im Objektarray zurück.

**Syntax**

```
SortedKeys(val map) array

```

* **val**

    Objeckt array.

**Beispiel**

```
var val map
var arr array
val["k2"] = "v2"
val["k1"] = "v1"
arr = SortedKeys(val)
```



### Anrufvertrag {#callcontract}

Ruft den Vertrag mit einem angegebenen Namen auf. Alle Parameter des Datenabschnitts im Vertrag müssen in einem Objektarray enthalten sein. Diese Funktion gibt den Wert zurück, der der Variable **$result** durch einen bestimmten Vertrag zugewiesen wurde.

**Syntax**

```
CallContract(name string, params map)

```

* **name**

    Der Name des aufgerufenen Vertrags.
* **params**

   Ein assoziatives Array der Vertragseingabedaten.

**Beispiel**

```
var par map
par["Name"] = "My Name"
CallContract("MyContract", par)
```



### Vertragszugang {#contractaccess}

Überprüft, ob der Name des ausgeführten Vertrags mit einem der in den Parametern aufgeführten Namen übereinstimmt. Normalerweise wird es verwendet, um den Vertragszugriff auf Tabellen zu steuern. Beim Bearbeiten von Tabellenfeldern oder beim Einfügen und Hinzufügen neuer Spaltenfelder im Berechtigungsabschnitt der Tabelle geben Sie diese Funktion bitte in den Berechtigungsfeldern an.

**Syntax**

  

```
ContractAccess(name string, [name string]) bool
```

* **name**

    Vertragsname.

**Beispiel**

```
ContractAccess("MyContract")
ContractAccess("MyContract","SimpleContract")
```



### Vertragsbedingungen {#contractconditions}

Ruft den Abschnitt Bedingungen im Vertrag mit einem angegebenen Namen auf.

Für diese Art von Verträgen muss der Datenabschnitt leer sein. Wenn der Abschnitt Bedingungen ohne Fehler ausgeführt wird, gibt er wahr zurück. Kommt es bei der Ausführung zu einem Fehler, wird auch der Muttervertrag aufgrund des Fehlers gekündigt. Diese Funktion dient in der Regel dazu, den Zugriff des Vertrags auf Tabellen zu steuern und kann bei der Bearbeitung von Systemtabellen in den Berechtigungsfeldern aufgerufen werden.

**Syntax**

```
ContractConditions(name string, [name string]) bool

```

* **name**

    Vertragsname.

**Beispiel**

```
ContractConditions("MainCondition")
```



### Eval Zustand {#evalcondition}

Ruft den Wert des condfield-Felds im Datensatz mit einem 'name'-Feld aus der tablename-Tabelle ab und prüft die Bedingungen des condfield-Feldwerts.

**Syntax**

```
EvalCondition(tablename string, name string, condfield string)

```

* **tablename**

    Tabellenname.
*  **name**

    Fragt den Wert mit dem Feld „Name“ ab.
*  **condfield**

    Der Name des Felds, dessen Bedingungen überprüft werden müssen.

**Beispiel**

```
EvalCondition(`menu`, $Name, `conditions`)
```



### Vertrag per ID erhalten {#getcontractbyid}

Gibt seinen Vertragsnamen nach Vertrags-ID zurück. Wenn der Vertrag nicht gefunden wird, wird eine leere Zeichenfolge zurückgegeben.

**Syntax**

```
GetContractById(id int) string

```

* **Id**

  Die Vertrags-ID in den Verträgen der Vertragstabelle.

**Beispiel**


```
var name string
name = GetContractById($IdContract)
```



### Vertrag nach Namen abrufen {#getcontractbyname}

Diese Funktion gibt ihre Vertrags-ID nach Vertragsname zurück. Wenn der Vertrag nicht gefunden wird, wird Null zurückgegeben.

**Syntax**

```
GetContractByName(name string) int
```

* **name**

    Der Vertragsname in der Vertragstabelle Contracts.

**Beispiel**

```
var id int
id = GetContractByName(`NewBlock`)
```



### Rollenzugriff {#roleaccess}

Überprüft, ob die Rollen-ID des Vertragsaufrufers mit einer der im Parameter angegebenen IDs übereinstimmt.

Mit dieser Funktion können Sie den Vertragszugriff auf Tabellen und andere Daten steuern.

**Syntax**

 

```
RoleAccess(id int, [id int]) bool
```

* **Id**

    Role ID.

**Beispiel***

```
RoleAccess(1)
RoleAccess(1, 3)
```



### Transaktionsinfo {#transactioninfo}

Fragt Transaktionen anhand des angegebenen Hash-Werts ab und gibt Informationen über den ausgeführten Vertrag und seine Parameter zurück.

**Syntax**

```
TransactionInfo(hash: string)
```

  * **hash**

    Transaktions-Hash im hexadezimalen Zeichenfolgenformat.
  
> **Return value**

  Diese Funktion gibt einen String im JSON-Format zurück:

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

  

  *   **contract**

      Vertragsname.
  
  *   **params**

     An Vertragsparameter übergebene Daten.
  *   **block**

      ID des Blocks, der die Transaktion verarbeitet hat.

**Beispiel**

```
var out map
out = JSONDecode(TransactionInfo(hash))
```



### Wurf {#throw}

   Erzeugt einen Fehler vom Typ Ausnahme.

**Syntax**

  

```
Throw(ErrorId string, ErrDescription string)
```

* **ErrorId**

    Fehlerkennung.

* **ErrDescription**

    Fehlerbeschreibung.

>  **Return value**

  Das Format dieser Art von Transaktionsergebnissen:

```
{"type":"exception","error":"Error description","id":"Error ID"}
```

**Beispiel**

```
Throw("Problem", "There is a problem")
```



### Bedingung validieren {#validatecondition}

   Versucht, die vom Bedingungsparameter angegebenen Bedingungen zu kompilieren. Tritt während des Kompiliervorgangs ein Fehler auf, wird ein Fehler generiert und der aufgerufene Vertrag beendet. Diese Funktion dient dazu, die Korrektheit des bedingten Formats zu überprüfen.

**Syntax**

```
ValidateCondition(condition string, state int)
```

* **Condition**

     Das bedingte Format, das überprüft werden muss.
* **State**

     Ökosystem-ID. Wenn Sie die globale Bedingung überprüfen, geben Sie sie bitte als 0 an.

**Beispiel**

```
ValidateCondition(`ContractAccess("@1MyContract")`, 1)
```



### Adresse bis ID {#addresstoid}

Gibt die entsprechende Kontoadresse nach Wallet-Adresse zurück. Wenn eine ungültige Adresse angegeben wird, wird '0' zurückgegeben.

**Syntax**

```
AddressToId(address string) int

```

*  Address

    Wallet address in `XXXX-...-XXXX` format or number format.

**Beispiel**

```
wallet = AddressToId($Recipient)
```



### ID zu Adresse {#idtoaddress}

Gibt die entsprechende Brieftaschenadresse nach Kontoadresse zurück. Wenn eine ungültige Adresse angegeben wird, wird die ungültige Adresse `invalid` zurückgegeben.

**Syntax**

```
IdToAddress(id int) string

```

*  **Id**

    Kontoadresse.

**Beispiel**

```
$address = IdToAddress($id)
```



### Pub zu ID {#pubtoid}

Die Kontoadresse wird per öffentlichem Schlüssel im Hexadezimalformat zurückgegeben.

**Syntax**

```
PubToID(hexkey string) int

```

*  **hexkey**

    Der öffentliche Schlüssel im Hexadezimalformat.

**Beispiel**

  

```
var wallet int
wallet = PubToID("04fa5e78.....34abd6")
```



### DekodierenBase64 {#decodebase64}

Gibt eine Zeichenfolge zurück, indem das base64-Format angegeben wird

**Syntax**

```
DecodeBase64(input string) string

```

*  **Input**

    String in base64 format.

**Beispiel**

```
val = DecodeBase64(mybase64)
```



### KodierenBase64 {#encodebase64}

Gibt eine Zeichenfolge im Base64-Format zurück, indem eine Zeichenfolge angegeben wird.

**Syntax**

```
EncodeBase64(input string) string

```

*  **Input**

    Die zu codierende Zeichenfolge.

**Beispiel**

 

```
var base64str string
base64str = EncodeBase64("my text")
```



### Schweben {#float}

Konvertiert eine ganze Zahl oder einen String in eine Gleitkommazahl.

**Syntax**

```
Float(val int|string) float

```

* **val**

    Eine Ganzzahl oder Zeichenfolge.

**Beispiel**

```
val = Float("567.989") + Float(232)
```



### HexToBytes {#hextobytes}

Konvertiert eine Zeichenfolge im Hexadezimalformat in Bytes vom Typ Bytes.

**Syntax**

```
  HexToBytes(hexdata string) bytes

```

*  **hexdata**

   Eine Zeichenfolge im Hexadezimalformat.

**Beispiel**

```
var val bytes
val = HexToBytes("34fe4501a4d80094")
```



### Geld formatieren {#formatmoney}

Gibt den Zeichenfolgenwert von exp / 10 ^ Ziffer zurück.


**Syntax**

  

```
FormatMoney(exp string, digit int) string
```

* **Exp**

    A number in string format.
* **digit**

    Der Exponent (positiv oder negativ) von 10 im Ausdruck `Exp/10^digit`. Positive Werte bestimmen Nachkommastellen.

**Beispiel**

```
  s = FormatMoney("78236475917384", 0)
```



### Zufällig {#random}
```
Returns a random number between min and max (min <= result <max). Both min and max must be positive numbers.
```

**Syntax**

 

```
Random(min int, max int) int
```

* **min**

    Der Mindestwert unter den Zufallszahlen.

* **max**

    Die Obergrenze von Zufallszahlen. Die generierte Zufallszahl ist kleiner als dieser Wert.

**Beispiel**

```
i = Random(10,5000)
```



### Int {#int}

Konvertiert einen Wert im String-Format in eine ganze Zahl.

**Syntax**

```
Int(val string) int
```

* **val**

    Eine Zahl im Zeichenfolgenformat.

**Beispiel**

```
mystr = "-37763499007332"
val = Int(mystr)
```



### Hash {#hash}

  Gibt den Hash eines angegebenen Byte-Arrays oder -Strings zurück, der von der Systemverschlüsselungsbibliothek crypto generiert wird.

**Syntax**

 

```
Hash(val interface{}) string, error
```

* **val**

    Ein String- oder Byte-Array.

**Beispiel**

```
var hash string
hash = Hash("Test message")
```



### Sha256 {#sha256}

  Gibt den SHA256-Hash einer angegebenen Zeichenfolge zurück.

**Syntax**

 

```
Sha256(val string) string
```

* **val**

    Eine Zeichenfolge erfordert die Sha256-Hash-Operation.

**Beispiel**

```
var sha string
sha = Sha256("Test message")
```



### Str {#str}

Wandelt eine Integer-Int- oder Float-Float-Zahl in einen String um.

**Syntax**

  

```
Str(val int|float) string
```

* **val**

    Eine Integer- oder Gleitkommazahl.

**Beispiel**

```
myfloat = 5.678
val = Str(myfloat)
```



### JSONEncode {#jsonencode}

Konvertiert eine Zahl, einen String oder ein Array in einen String im JSON-Format.

**Syntax**

```
JSONEncode(src int|float|string|map|array) string

```

* **src**

    Zu konvertierende Daten.

**Beispiel**

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncode(mydata)
```



### JSONEncodeIndent {#jsonencodeindent}

Uses the specified indentation to convert a number, string, or array to a string in JSON format.

**Syntax**

```
JSONEncodeIndent(src int|float|string|map|array, indent string) string

```

* **Src**

     Zu konvertierende Daten.

* **Indent**

     Die Zeichenfolge wird als Einrückung verwendet.

**Beispiel**

  

```
var mydata map
mydata["key"] = 1
var json string
json = JSONEncodeIndent(mydata, "\t")
```



### JSONDecode {#jsondecode}

Konvertiert einen String im JSON-Format in eine Zahl, einen String oder ein Array.

**Syntax**

```
JSONDecode(src string) int|float|string|map|array

```

*  **src**

    Eine Zeichenfolge, die Daten im JSON-Format enthält.

**Beispiel**

```
var mydata map
mydata = JSONDecode(`{"name": "John Smith", "company": "Smith's company"}`)
```



### HasPrefix {#hasprefix}

Überprüft, ob die Zeichenfolge mit einer angegebenen Zeichenfolge beginnt.

**Syntax**

  

```
HasPrefix(s string, prefix string) bool
```

* **s**

     Ein Faden.

* **prefix**

     Das zu überprüfende Präfix.

> **Return value**

   Wenn die Zeichenfolge mit einer angegebenen Zeichenfolge beginnt, wird `true` zurückgegeben.

**Beispiel**

```
if HasPrefix($Name, `my`) {
  ...
}
```



### Enthält {#contains}

Überprüft, ob die Zeichenfolge eine angegebene Teilzeichenfolge enthält.
**Syntax**

 

```
Contains(s string, substr string) bool
```

* **s**

     Ein Faden.

* **substr**

     Eine Teilzeichenfolge.

> **Return value**

   Wenn der String den Teilstring enthält, gibt er `true` zurück.

**Beispiel**

```
if Contains($Name, `my`) {
  ...
}
```



### Ersetzen {#replace}

Ersetzt alt (die alte Zeichenfolge) durch neu (die neue Zeichenfolge) in der Zeichenfolge.

**Syntax**

```
Replace(s string, old string, new string) string

```

* **s**

     Die ursprüngliche Zeichenfolge.

* **Old**

     Die zu ersetzende Teilzeichenfolge.

* **New**

     Die neue Saite.

**Beispiel**
```
s = Replace($Name, `me`, `you`)
```



### Größe {#size}

Gibt die Anzahl der Bytes in einer angegebenen Zeichenfolge zurück.

**Syntax**

```
Size(val string) int

```

* **val**

    Ein Faden.

**Beispiel**

```
var len int
len = Size($Name)
```



### Sprintf {#sprintf}

Diese Funktion erstellt eine Zeichenfolge unter Verwendung der angegebenen Vorlage und Parameter.

Verfügbare Platzhalter:
* `%d` (integer)
* `%s` (string)
* `%f` (float)
* `%v` (any type)
**Syntax**

```
Sprintf(pattern string, val ...) string

```

* **pattern**

    Eine Zeichenfolgenvorlage.

**Beispiel**

```
out = Sprintf("%s=%d", mypar, 6448)
```



### Substr {#substr}

Gibt die Teilzeichenfolge zurück, die aus einer angegebenen Zeichenfolge erhalten wird, beginnend mit dem Offset offset (standardmäßig von 0 berechnet), und die maximale Länge ist auf length beschränkt.

Wenn der Offset oder die Länge kleiner als Null oder der Offset größer als die Länge ist, wird eine leere Zeichenfolge zurückgegeben.

Wenn die Summe aus Offset und Länge größer als die Stringgröße ist, wird der Teilstring ab dem Offset bis zum Ende des Strings zurückgegeben.

**Syntax**

```
Substr(s string, offset int, length int) string

```

* **val**

    Ein Faden.

* **Offset**

    Offset.

* **length**

    Länge des Teilstrings.

**Beispiel**

```
var s string
s = Substr($Name, 1, 10)
```



### ToLower {#tolower}

Gibt eine angegebene Zeichenfolge in Kleinbuchstaben zurück.

**Syntax**

```
ToLower(val string) string

```

* **val**

    Ein Faden.

**Beispiel**

```
val = ToLower(val)
```



### ToUpper {#toupper}

Gibt eine angegebene Zeichenfolge in Großbuchstaben zurück.

**Syntax**

```
ToUpper(val string) string

```

* **val**

    Ein Faden.

**Beispiel**

```
val = ToUpper(val)
```



### TrimSpace {#trimspace}

Löscht die führenden und nachfolgenden Leerzeichen, Tabulatoren und Zeilenumbrüche einer angegebenen Zeichenfolge.

**Syntax**

```
TrimSpace(val string) string

```

* **val**

    Ein Faden.

**Beispiel**

 

```
var val string
val = TrimSpace(" mystr ")
```



### Boden {#floor}

Gibt den größten ganzzahligen Wert zurück, der kleiner oder gleich einer angegebenen Zahl, Gleitkommazahl und Zeichenfolge ist.

**Syntax**

```
Floor(x float|int|string) int
```

* **x**

    Eine Zahl, eine Gleitkommazahl und eine Zeichenfolge.

**Beispiel**

```
val = Floor(5.6) // returns 5
```



### Protokoll {#log}

Gibt den natürlichen Logarithmus einer angegebenen Zahl, Gleitkommazahl und Zeichenfolge zurück.

**Syntax**

```
Log(x float|int|string) float

```

*  **x**

    Eine Zahl, eine Gleitkommazahl und eine Zeichenfolge.

**Beispiel**

```
val = Log(10)
```



### Protokoll10 {#log10}

Gibt den Basis-10-Logarithmus einer angegebenen Zahl, Gleitkommazahl und Zeichenfolge zurück.

**Syntax**

```
Log10(x float|int|string) float

```

* **x**

    A number, float number, and string.

**Beispiel**

 

```
val = Log10(100)
```



### Puh {#pow}

Gibt die angegebene Basis zur angegebenen Potenz (xy) zurück.

**Syntax**

```
Pow(x float|int|string, y float|int|string) float

```

* **x**

   Basisnummer.

* **y**

    Exponent.

**Beispiel**

```
val = Pow(2, 3)

```

### Runde {#round}

Gibt den Wert einer angegebenen Zahl gerundet auf die nächste ganze Zahl zurück.

**Syntax**

```
Round(x float|int|string) int

```

* **x**

    Eine Zahl.

**Beispiel**

```
val = Round(5.6)
```

### Quadrat {#sqrt}

Gibt die Quadratwurzel einer angegebenen Zahl zurück.

```
Sqrt(x float|int|string) float

```

* **x**

    Eine Zahl.

**Beispiel**

```
val = Sqrt(225)
```



### StringToBytes {#stringtobytes}

Konvertiert einen String in Bytes.

**Syntax**

```
StringToBytes(src string) bytes

```

* **src**

    Ein Faden.

**Beispiel**

 

```
var b bytes
b = StringToBytes("my string")
```



### BytesToString {#bytestostring}

Konvertiert Bytes in Strings.

**Syntax**

```
BytesToString(src bytes) string

```

* **src**

    Byte.

**Beispiel**

```
var s string
s = BytesToString($Bytes)
```



### SysParamString {#sysparamstring}

Gibt den Wert eines angegebenen Plattformparameters zurück.

**Syntax**

```
SysParamString(name string) string

```

* **name**

    Parametername.

**Beispiel**

```
url = SysParamString(`blockchain_url`)
```



### SysParamInt {#sysparamint}

Gibt den Wert eines angegebenen Plattformparameters in Form einer Zahl zurück.

**Syntax**

```
SysParamInt(name string) int

```

* **name**

    Parametername.

**Beispiel**

```
maxcol = SysParam(`max_columns`)
```



### DBUpdateSysParam {#dbupdatesysparam}

Aktualisiert den Wert und die Bedingungen eines Plattformparameters. Wenn Sie den Wert oder die Bedingungen nicht ändern müssen, geben Sie im entsprechenden Parameter bitte eine leere Zeichenfolge an.

**Syntax**

```
DBUpdateSysParam(name, value, conditions string)

```

* **Name**

     Parametername.

* **value**

     Neuer Wert eines Parameters.

* **conditions**

     Neue Bedingungen für die Aktualisierung eines Parameters.

**Beispiel**

```
DBUpdateSysParam(`fuel_rate`, `400000000000`, ``)

```

### UpdateNotifications {#updatenotifications}

Ruft die Benachrichtigungsliste eines angegebenen Schlüssels aus der Datenbank ab und sendet die erhaltene Benachrichtigung an Centrifugo.

**Syntax**

```
UpdateNotifications(ecosystemID int, keys int...)

```

* **EcosystemID**

    Ecosystem ID.

* **key**

    Eine durch Kommas getrennte Liste von Kontoadressen. Oder Sie können ein Array verwenden, um eine Liste mit Kontoadressen anzugeben.

**Beispiel**

```
UpdateNotifications($ecosystem_id, $key_id, 23345355454, 35545454554)
UpdateNotifications(1, [$key_id, 23345355454, 35545454554])
```



### UpdateRolesNotifications {#updaterolesnotifications}

Ruft die Benachrichtigungsliste aller Kontoadressen einer angegebenen Rollen-ID in der Datenbank ab und sendet die erhaltene Benachrichtigung an Centrifugo.


**Syntax**

```
UpdateRolesNotifications(ecosystemID int, roles int ...)

```

*  **EcosystemID**

    Ökosystem-ID.

*  **roles**

    Eine durch Kommas getrennte Liste von Rollen-IDs. Oder Sie können ein Array verwenden, um eine Liste von Rollen-IDs anzugeben.

**Beispiel**

```
UpdateRolesNotifications(1, 1, 2)

```

### HTTPRequest {#httprequest}

Sendet HTTP-Anforderungen an die angegebene Adresse.
> Hinweis

> Diese Funktion ist nur in CLB-Verträgen nutzbar.

**Syntax**

```
HTTPRequest(url string, method string, heads map, pars map) string

```

* **Url**

    Adresse, an die die Anfrage gesendet wird.

* **method**

    Request type (GET or POST).

* **heads**

    Ein Array von Anforderungsheadern, Objekten.

* **pars**

    Parameter anfordern.

**Beispiel**

```
var ret string
var ret string
var ret string
var pars, heads, json map
heads["Authorization"] = "Bearer "+ $auth_token
pars["obs"] = "true"
ret = HTTPRequest("http://localhost:7079/api/v2/content/page/default_page","POST", heads, pars)
json = JSONToMap(ret)
```



### HTTPPostJSON {#httppostjson}

Diese Funktion ähnelt der HTTPRequest-Funktion, sendet jedoch eine POST-Anforderung und die Anforderungsparameter sind Zeichenfolgen.

> Hinweis

> Diese Funktion ist nur in CLB-Verträgen nutzbar

**Syntax**

```
HTTPPostJSON(url string, heads map, pars string) string

```

* **Url**

    Adresse, an die die Anfrage gesendet wird.

* **heads**

    Ein Array von Anforderungsheadern, Objekten.
* **pars**

    Fordern Sie Parameter als JSON-String an.

**Beispiel**

```
var ret string
var ret string
var ret string
var heads, json map
heads["Authorization"] = "Bearer "+ $auth_token
ret = HTTPPostJSON("http://localhost:7079/api/v2/content/page/default_page", heads, `{"obs":"true"}`)
json = JSONToMap(ret)
```



### BlockTime {#blocktime}

Gibt die Generierungszeit des Blocks im SQL-Format zurück.

**Syntax**

```
BlockTime()
```



**Beispiel**

```
var mytime string
mytime = BlockTime()
DBInsert("mytable", myid, {time: mytime})
```



### Terminzeit {#datetime}

Konvertiert den Zeitstempel unixtime in einen String im Format YYYY-MM-DD HH:MI:SS.

**Syntax**

```
DateTime(unixtime int) string
```



**Beispiel**

```
DateTime(1532325250)

```

### UnixDateTime {#unixdatetime}

Konvertiert einen String im Format JJJJ-MM-TT HH:MI:SS in einen Zeitstempel unixtime

**Syntax**

```
UnixDateTime(datetime string) int
```



**Beispiel**

```
UnixDateTime("2018-07-20 14:23:10")
```



### OBS erstellen {#createobs}

Erstellt einen untergeordneten CLB.

Diese Funktion kann nur im Master-CLB-Modus verwendet werden.

**Syntax**

```
CreateOBS(OBSName string, DBUser string, DBPassword string, OBSAPIPort int)

```

* **OBSName**

    CLB-Name.

* **DBUser**

    Der Rollenname der Datenbank.

*  **DBPassword**

   Das Passwort der Rolle.

* **OBSAPIPort**

    Der Port der API-Anforderung.

**Beispiel**

```
CreateOBS("obsname", "obsuser", "obspwd", 8095)

```

### GetOBSList {#getobslist}

Gibt die Liste der untergeordneten CLBs zurück.

Diese Funktion kann nur im Master-CLB-Modus verwendet werden.

**Syntax**

```
GetOBSList()

```

> **Rückgabewert**

Ein Array von Objekten, wobei der Schlüssel der CLB-Name und der Wert der Prozessstatus ist.

### LaufOBS {#runobs}

Ein Prozess, der den CLB ausführt.

Diese Funktion kann nur im Master-CLB-Modus verwendet werden.

**Syntax**

```
RunOBS(OBSName string)

```

* **OBSName**

  CLB-Name.

   Es darf nur Buchstaben und Zahlen enthalten, das Leerzeichen darf nicht verwendet werden.

### StoppenOBS {#stopobs}

Stoppt den Prozess eines angegebenen CLB.

Diese Funktion kann nur im Master-CLB-Modus verwendet werden.

**Syntax**

```
StopOBS(OBSName string)

```

* **OBSName**

  CLB-Name.

   Es darf nur Buchstaben und Zahlen enthalten, das Leerzeichen darf nicht verwendet werden.

### LöschenOBS {#removeobs}

Löscht den Prozess eines angegebenen CLB.

Diese Funktion kann nur im Master-CLB-Modus verwendet werden.

**Syntax**

```
RemoveOBS(OBSName string)

```

* **OBSName**

CLB-Name.

Es darf nur Buchstaben und Zahlen enthalten, das Leerzeichen darf nicht verwendet werden.

## Systemverträge {#system-contracts}

Systemverträge werden standardmäßig erstellt, wenn die IBax-Blockchain-Plattform gestartet wird. Alle diese Verträge wurden im ersten Ökosystem erstellt. Aus diesem Grund müssen Sie ihre vollständigen Namen angeben, wenn Sie sie aus anderen Ökosystemen aufrufen, z. B. `@1NewContract`.

### Neues Ökosystem {#newecosystem}

Dieser Vertrag schafft ein neues Ökosystem. Um die ID des erstellten Ökosystems zu erhalten, müssen Sie das in [txstatus](../reference/api2.md#txstatus) zurückgegebene Ergebnisfeld zitieren.

Parameter:
   * Zeichenfolge **Name** - Name des Ökosystems. Es kann später geändert werden.
   
### Ökosystemname-bearbeiten {#editecosystemname}

Ändert den Namen des Ökosystems in der Tabelle 1_ecosystems, das nur im ersten Ökosystem existiert.

Parameters:
  * **EcosystemID** int - changes the name of the ecosystem ID;
  * **NewName** string - new name of the ecosystem.

### Neuer Vertrag {#newcontract}

Erstellt einen neuen Vertrag im aktuellen Ökosystem.

Parameters:
  * **ApplicationId** int - die Anwendung, zu der ein neuer Vertrag gehört;
  * **Value** string - Vertrag Quellcode. Die obere Schicht darf nur einen Vertrag haben;
  * **Conditions** string - die Vertragsbedingungen ändert;
  * **TokenEcosystem** int "optional" - Ökosystem-ID. Es bestimmt, welches Token für Transaktionen verwendet wird, wenn der Vertrag aktiviert wird.

### Vertrag bearbeiten {#editcontract}

Bearbeitet den Vertrag im aktuellen Ökosystem.

Parameters:
  * **Id** int - die Vertrags-ID hat sich geändert;
  * **Value** Zeichenfolge "optional" - Quellcode des Vertrags;
  * **Conditions** string "optional" - ändert die Vertragsbedingungen.

### Geldbörse binden {#bindwallet}
Binden des Vertrags an die Wallet-Adresse im aktuellen Ökosystem. Nach Zustandekommen des Vertrages wird die Vertragsabwicklungsgebühr unter dieser Adresse bezahlt.

Parameters:
  * **Id** int - die zu bindende Vertrags-ID.
  * **WalletId** string "optional" - die an den Vertrag gebundene Wallet-Adresse.

### Wallet entbinden {#unbindwallet}

Lösen des Vertrags von der Wallet-Adresse im aktuellen Ökosystem. Nur vertragsgebundene Adressen können entbunden werden. Nach dem Entbinden des Vertrages zahlen Benutzer, die den Vertrag ausführen, die Ausführungsgebühr.

Parameters:
  * **Id** int - die ID des zu bindenden Vertrags.

### NeuerParameter {#newparameter}

A new ecosystem parameter has been added to the current ecosystem.

Parameter:
   * Zeichenfolge **Name** - Parametername;
   * Zeichenfolge **Value** - Parameterwert;
   * Zeichenfolge **Conditions** - Bedingungen zum Ändern des Parameters.

### Parameter bearbeiten {#editparameter}

Chängt bestehende Ökosystemparameter in das aktuelle Ökosystem ein.

Parameter:
   * Zeichenfolge **Name** - Name des zu ändernden Parameters;
   * Zeichenfolge **Value** - neuer Parameterwert;
   * Zeichenfolge **Conditions** - neue Bedingungen zum Ändern des Parameters.

### NeuesMenü {#newmenu}

Fügt ein neues Menü im aktuellen Ökosystem hinzu.

Parameter:
   * Zeichenfolge **Name** - Name des Menüs;
   * Zeichenfolge **Value** - Quellcode des Menüs;
   * **Title** Zeichenfolge "optional" - Menütitel;
   * Zeichenfolge **Conditions** - Bedingungen zum Wechseln des Menüs.

### Menü bearbeiten {#editmenu}

Chängt das vorhandene Menü in das aktuelle Ökosystem ein.

Parameter:
   * **Id** int - zu ändernde Menü-ID;
   * **Value** string "optional" - Quellcode des neuen Menüs;
   * **Title** string "optional" - Titel des neuen Menüs;
   * **Conditions** Zeichenfolge "optional" - neue Bedingungen zum Ändern des Menüs.

### Menü anhängen {#appendmenu}

Afügt den Quellcodeinhalt zu bestehenden Menüs im aktuellen Ökosystem hinzu

Parameter:
   * **Id** int - Menü-ID;
   * Zeichenfolge **Value** - hinzuzufügender Quellcode.

### Neue Seite {#newpage}

Fügt eine neue Seite im aktuellen Ökosystem hinzu.

Parameter:
   * Zeichenfolge **Name** - Name der Seite;
   * Zeichenfolge **Value** - Quellcode der Seite;
   * Zeichenfolge **Menü** - Name des mit der Seite verknüpften Menüs;
   * Zeichenfolge **Conditions** - Bedingungen zum Wechseln der Seite;
   * **ValidateCount** int "optional" - Anzahl der Knoten, die für die Seitenvalidierung erforderlich sind. Wenn dieser Parameter nicht angegeben ist, wird der Wert des Ökosystemparameters min_page_validate_count verwendet. Der Wert dieses Parameters darf nicht kleiner als min_page_validate_count und größer als max_page_validate_count sein;

   * **ValidateMode** int "optional" - Modus der Seitengültigkeitsprüfung. Die Seite wird beim Laden überprüft, wenn der Wert dieses Parameters 0 ist; oder überprüft, wenn es geladen wird, oder verlassen Sie die Seite, wenn der Wert dieses Parameters 1 ist.

### Seite bearbeiten {#editpage}

Ändert vorhandene Seiten im aktuellen Ökosystem.

Parameter:
   * **Id** int - ID der zu ändernden Seite;
   * **Value** string "optional" - Quellcode der neuen Seite;
   * Zeichenfolge **Menü** "optional" - Name des neuen Menüs, das der Seite zugeordnet ist;
   * **Conditions** string "optional" - neue Bedingungen zum Wechseln der Seite;
   * **ValidateCount** int "optional" - Anzahl der Knoten, die für die Seitenvalidierung erforderlich sind. Wenn dieser Parameter nicht angegeben ist, wird der Wert des Ökosystemparameters min_page_validate_count verwendet. Der Wert dieses Parameters darf nicht kleiner als min_page_validate_count und größer als max_page_validate_count sein;
   * **ValidateMode** int "optional" - Modus der Seitengültigkeitsprüfung. Die Seite wird beim Laden überprüft, wenn der Wert dieses Parameters 0 ist; oder überprüft, wenn es geladen wird, oder verlassen Sie die Seite, wenn der Wert dieses Parameters 1 ist.

### Seite anhängen {#appendpage}

Fügt den Quellinhalt zu vorhandenen Seiten im aktuellen Ökosystem hinzu.

Parameter:
* **Id** int - ID der zu ändernden Seite;
* Zeichenfolge **Value** - der hinzuzufügende Quellcode.

### Neuer Block {#newblock}

Fügt dem aktuellen Ökosystem ein Seitenmodul hinzu.

Parameter:
   * Zeichenfolge **Name** - Name des Moduls;
   * String **Value** - Quellcode des Moduls;
   * Zeichenfolge **Conditions** - Bedingungen zum Wechseln des Moduls.

### Block bearbeiten {#editblock}

Changes existing page modules in the current ecosystem.

Parameter:
   * Id int - zu ändernde Modul-ID;
   * Value string - Quellcode des neuen Moduls;
   * Bedingungszeichenfolge - neue Bedingungen zum Wechseln des Moduls.

### NeueTabelle {#newtable}

Fügt dem aktuellen Ökosystem eine neue Tabelle hinzu.

Parameter:
  * **ApplicationId** int - Anwendungs-ID der zugeordneten Tabelle;
  * Zeichenfolge **Name** - Name der neuen Tabelle;
  * **Columns** string - Feldarray im JSON-Format `[{"name":"...", "type":"...","index": "0", "conditions":". . ."},...]`, wobei
    * **name** - Feldname, nur lateinische Zeichen;
    * **Typ** - Datentyp `varchar,bytea,number,datetime,money,text,double,character`;
    * **index** - Nicht-Primärschlüsselfeld `0`, Primärschlüssel `1`;
    * **Conditions** - Bedingungen zum Ändern der Felddaten und die Zugriffsberechtigungen müssen im JSON-Format "`{"update":"ContractConditions(MainCondition)", "read":"ContractConditions(MainCondition)"}` angegeben werden ;
  * Zeichenfolge **Berechtigungen** - Zugriffsberechtigungen im JSON-Format `{"insert": "...", "new_column": "...", "update": "...", "read": " .. ."}`.
    * **insert** - Erlaubnis zum Einfügen von Einträgen;
    * **new_column** - Berechtigung zum Hinzufügen einer neuen Spalte;
    * **update** - Erlaubnis, Eingabedaten zu ändern;
    * **read** - Erlaubnis, Eintragsdaten zu lesen.

### Tabelle bearbeiten {#edittable}

Ändert die Zugriffsberechtigungen einer Tabelle im aktuellen Ökosystem.

Parameter:
   * Zeichenfolge **Name** - Name der Tabelle;
   * String **InsertPerm** - Berechtigung zum Einfügen von Einträgen in die Tabelle;
   * Zeichenfolge **UpdatePerm** - Berechtigung zum Aktualisieren von Einträgen in der Tabelle;
   * Zeichenfolge **ReadPerm** - Berechtigung zum Lesen von Einträgen in der Tabelle;
   * String **NewColumnPerm** - Berechtigung zum Erstellen einer neuen Spalte;

### NeueSpalte {#newcolumn}

Fügt der Tabelle des aktuellen Ökosystems ein neues Feld hinzu.

Parameter:
   * **TableName** Zeichenfolge - Tabellenname;
   * Zeichenfolge **Name** - Feldname in lateinischen Buchstaben;
   * **Type** string - Datentyp `varchar,bytea,number,money,datetime,text,double,character`;
   * Zeichenfolge **UpdatePerm** - Berechtigung zum Ändern des Werts in der Spalte;
   * Zeichenfolge **ReadPerm** - Berechtigung zum Lesen des Werts in der Spalte.

### Spalte bearbeiten {#editcolumn}

Chängt die Berechtigung eines bestimmten Tabellenfelds im aktuellen Ökosystem.

Parameter:
   * **TableName** Zeichenfolge - Tabellenname;
   * String **Name** - zu ändernder Feldname in lateinischen Buchstaben;
   * Zeichenfolge **UpdatePerm** - neue Berechtigung zum Ändern des Werts in der Spalte;
   * Zeichenfolge **ReadPerm** - neue Berechtigung zum Lesen des Werts in der Spalte.

### NeuSprache {#newlang}

Fügt dem aktuellen Ökosystem Sprachressourcen hinzu, und die Berechtigung dazu wird im Changing_language-Parameter der Ökosystemparameter festgelegt.

Parameter:

   * Zeichenfolge **Name** - Name der Sprachressourcen in lateinischen Buchstaben;
   * **Trans** String - String im JSON-Format, mit einem zweistelligen Langcode als Schlüssel und dem übersetzten String als Wert. Beispiel: `{"en": "englischer Text", "zh": "chinesischer Text"}`.

### BearbeitenSprache {#editlang}

Ändert die Sprachressourcen im aktuellen Ökosystem, und die Berechtigung dazu wird im Parameter „changing_language“ des Parameters „Ökosystem“ festgelegt.

Parameter:

   * **Id** int - Sprachressourcen-ID.
   * **Trans** - Zeichenfolge im JSON-Format mit einem zweistelligen Langcode als Schlüssel und der übersetzten Zeichenfolge als Wert. Beispiel: `{"en": "englischer Text", "zh": "chinesischer Text"}`.

### Importieren {#import}

Importiert eine Anwendung in das aktuelle Ökosystem und importiert die aus dem [ImportUpload](#importupload)-Vertrag geladenen Daten.

Parameter:

   * Zeichenfolge **Data** - im Textformat importierte Daten, die aus einer vom Ökosystem exportierten Datei stammen.

### ImportHochladen {#importupload}

Lädt eine externe Anwendungsdatei in die Tabelle buffer_data des aktuellen Ökosystems für den anschließenden Import.

Parameter:
   * Datei **InputFile** - eine Datei, die in die Tabelle buffer_data des aktuellen Ökosystems geschrieben wird.

### NewAppParam {#newappparam}

Fügt dem aktuellen Ökosystem neue Anwendungsparameter hinzu.

Parameter:
   * **ApplicationId** int - Anwendungs-ID;
   * Zeichenfolge **Name** - Parametername;
   * Zeichenfolge **Value** - Parameterwert;
   * Zeichenfolge **Conditions** - Berechtigung zum Ändern des Parameters.

### App-Param bearbeiten {#editappparam}

Ändert bestehende Anwendungsparameter im aktuellen Ökosystem.

Parameter:
   * **Id** int - Anwendungsparameter-ID;
   * **Value** string "optional" - neuer Parameterwert;
   * **Conditions** Zeichenfolge "optional" - neue Berechtigungen zum Ändern des Parameters.

### Neuer verzögerter Vertrag {#newdelayedcontract}

Fügt dem Scheduler-Daemon für verzögerte Verträge eine neue Aufgabe hinzu.

Der Scheduler für verzögerte Verträge führt Verträge aus, die von dem aktuell erzeugten Block benötigt werden.

Parameter:
   * Zeichenfolge **Contract** - Vertragsname;
   * **EveryBlock** int - der Kontrakt wird für jede solche Anzahl von Blöcken ausgeführt;
   * Bedingungszeichenfolge - Erlaubnis, die Aufgabe zu ändern;
   * **BlockID** int "optional" - die Block-ID, wo der Vertrag ausgeführt werden muss. Wenn nicht angegeben, wird sie automatisch berechnet, indem die "aktuelle Block-ID" + EveryBlock addiert wird;
   * **Limit** int "optional" - die maximale Anzahl der Aufgabenausführungen. Wenn nicht angegeben, wird die Aufgabe unbegrenzt oft ausgeführt.

### Verspäteten Vertrag bearbeiten {#editdelayedcontract}

Ändert eine Aufgabe im Scheduler-Daemon für verzögerte Verträge.

Parameter:
   * **Id** int - Task-ID;
   * Zeichenfolge **Contract** - Vertragsname;
   * **EveryBlock** int - der Kontrakt wird für jede solche Anzahl von Blöcken ausgeführt;
   * Zeichenfolge **Bedingungen** - Erlaubnis, die Aufgabe zu ändern;
   * **BlockID** int "optional" - die Block-ID, wo der Vertrag ausgeführt werden muss. Wenn nicht angegeben, wird sie automatisch berechnet, indem die "aktuelle Block-ID" + EveryBlock addiert wird;
   * **Limit** int "optional" - die maximale Anzahl der Aufgabenausführungen. Wenn nicht angegeben, wird die Aufgabe unbegrenzt oft ausgeführt.
   * **Deleted** int "optional" - Taskwechsel. Ein Wert von "1" deaktiviert die Aufgabe. Ein Wert von "0" aktiviert die Aufgabe.

### Binär hochladen {#uploadbinary}

Fügt eine statische Datei in der X_binaries-Tabelle hinzu oder überschreibt sie. Beim Aufruf eines Vertrags über die HTTP-API muss die Anfrage im Format „multipart/form-data“ vorliegen; Der DataMimeType-Parameter wird in Verbindung mit den Formulardaten verwendet.

Parameter:
   * Zeichenfolge **Name** - Name der statischen Datei;
   * **Data** Bytes - Inhalt der statischen Datei;
   * **DataMimeType** string "optional" - eine statische Datei im Mime-Type-Format;
   * **ApplicationId** int – die der X_binaries-Tabelle zugeordnete Anwendungs-ID.

   Wenn der DataMimeType-Parameter nicht übergeben wird, wird standardmäßig das `application/octet-stream`-Format verwendet.