# RESTful API v2

AAlle von Weaver bereitgestellten Funktionen, einschließlich Authentifizierung, Empfang von Ökosystemdaten, Fehlerbehandlung, Datenbanktabellenoperationen, Seiten- und Vertragsimplementierung, sind über die REST-API von IBAX verfügbar.

Mit der REST-API können Entwickler auf alle Plattformfunktionen zugreifen, ohne Weaver zu verwenden.

API-Befehlsaufrufe werden durch Adressieren von „/api/v2/command/[param]“ ausgeführt, wobei `command` der Befehlsname und `param` ein zusätzlicher Parameter ist. Die Anfrageparameter müssen im Format `Content-Type: x-www-form-urlencoded` gesendet werden. Das Ergebnis der Serverantwort liegt im JSON-Format vor.

* [Fehlerbehandlung](#Fehlerbehandlung)
     * [Fehlerliste](#Fehlerliste)

* [Authentifizierung](#authentication)
     * [getuid](#getuid)
     * [Anmeldung](#einloggen)

* [APIs für CLB nicht verfügbar](#apis-unavailable-to-clb)
* [Service commands](#service-commands)
    * [Ausführung](#ausführung)

* [Datenanforderungsfunktionen](#data-request-functions)
     * [Guthaben](#Guthaben)
     * [Blöcke](#Blöcke)
     * [detaillierte Blöcke](#detaillierte-Blöcke)
     * [/data/{table}/{id}/{column}/{hash}](#data-table-id-column-hash)
     * [Schlüsselinfo](#Schlüsselinfo)

* [Metriken abrufen](#get-metrics)
     * [Tasten](#Tasten)
     * [Blöcke](#Blöcke)
     * [Transaktionen](#Transaktionen)
     * [Ökosysteme](#Ökosysteme)
     * [Vollständige Knoten](#vollständige-knoten)

* [Ökosystem](#ökosystem)
     * [Ökosystemname](#ökosystemname)
     * [Ökosysteme](#ökosysteme)
     * [appparams/{appID}](#appparams-appid)
     * [appparam/{appid}/{name}](#appparam-appid-name)
     * [Ökosystemparameter](#ökosystemparameter)
     * [Ökosystemparam/{Name}](#ökosystemparam-Name)
     * [tables/[?limit=…&offset=…]](#tables-limit-offset)
     * [Tabelle/{Name}](#tabellenname)
     * [list/{name}[?limit=…&offset=…&columns=…]](#list-name-limit-offset-colums)
     * [sections[?limit=…&offset=…&lang=]](#sections-limit-offset-lang)
     * [row/{name}/{id}[?columns=]](#row-name-id-colums)
     * [Systemparameter](#systemparameter)
     * [Geschichte/{Name}/{ID}](#geschichte-Name-ID)
     * [interface/{page|menu|block}/{name}](#interface-page-menu-block-name)

* [Vertragsfunktionen](#vertragsfunktionen)
     * [verträge[?limit=…&offset=…]](#verträge-limit-offset)
     * [Vertrag/{Name}](#vertragsname)
     * [sendeTX](#sendetx)
     * [txstatus](#txstatus)
     * [txinfo/{hash}](#txinfo-hash)
     * [txinfoMultiple/](#txinfomultiple)
     * [/page/validators_count/{name}](#page-validators_count-name)
     * [Inhalt/Menü|Seite/{Name}](#inhalt-Menü-Seitenname)
     * [Inhalt/Quelle/{Name}](#name der Inhaltsquelle)
     * [Inhalt/Hash/{Name}](#inhalt-Hash-Name)
     * [Inhalt](#inhalt)
     * [maxblockid](#maxblockid)
     * [block/{id}](#block-id)
     * [avatar/{ecosystem}/{member}](#avatar-ecosystem-member)
     * [config/zentrifuge](#config-zentrifuge)
     * [updnotificator](#updnotificator)

## Fehlerbehandlung

Wenn die Anfrage erfolgreich ausgeführt wird, wird ein Statuscode `200` zurückgegeben. Tritt ein Fehler auf, wird zusätzlich zum Fehlerstatus ein JSON-Objekt mit folgenden Feldern zurückgegeben:

* Error

Fehlerkennung.

* Nachricht

Der im Fehlerfall zurückgegebene Text.

* Parameter

Zusätzliche Parameter des Fehlers, die im Fehlerfall im zurückgegebenen Text enthalten sein können.

> Response example

400 (Bad request)

Content-Type: application/json
```json
{
 "err": "E_INVALIDWALLET",
 "msg": "Wallet 1234-5678-9012-3444-3488 is not valid",
 "params": ["1234-5678-9012-3444-3488"]
}
```

### Fehlerliste

> E_VERTRAG

Vertrag `%s` existiert nicht

> E_DBNIL

Leere Datenbank

> E_DELETEDKEY

Kontoadresse gesperrt

> E_ÖKOSYSTEM

Ökosystem `%d` existiert nicht

> E_EMPTYPUBLIC

Ungültiger öffentlicher Schlüssel für das Konto
> E_KEYNOTFOUND

Kontoadresse nicht gefunden

> E_HASHFALSCH

Falscher Hash

> E_HASHNOTFOUND

Nicht gefunden

> E_HEAVYPAGE

Zu viele Seiten geladen

> E_INVALIDWALLET

Ungültige Wallet-Adresse `%s`

> E_LIMITTXSIZE

Größe einer Transaktion außerhalb des Limits

> E_NICHT GEFUNDEN

Seiten- oder Menüinhalt nicht gefunden

> E_PARAMNICHT GEFUNDEN

Parameter nicht gefunden

> E_PERMISSION

Keine Erlaubnis
> E_QUERY

Datenbankabfragefehler

> E_WIEDERHERGESTELLT

Die API hat einen Panikfehler.
Gibt einen Fehler zurück, wenn ein Panikfehler vorliegt.
Es bedeutet, dass Sie auf einen Fehler gestoßen sind, der lokalisiert und behoben werden muss.

> E_SERVER

Serverfehler.
Wenn es einen Fehler in der golang-Bibliotheksfunktion gibt, kehrt sie zurück. Das msg-Feld enthält den im Fehlerfall zurückgegebenen Text.

Als Antwort auf jeden Befehl kann ein **E_SERVER**-Fehler auftreten. Wenn es aufgrund falscher Eingabeparameter auftritt, können Sie es in einen verwandten Fehler ändern. In einem anderen Fall meldet dieser Fehler einen ungültigen Betrieb oder eine falsche Systemkonfiguration, was einen detaillierteren Untersuchungsbericht erfordert.

> E_SIGNATUR

Falsche Signatur

> E_STATELOGIN

`%s` ist kein Mitglied des Ökosystems `%s`

> E_TABLENOTFOUND

Tabelle `%s` nicht gefunden
> E_TOKENABGELAUFEN

Sitzung `%s` ist abgelaufen

> E_UNAUTHORIZED

Unbefugt.

Wenn Sie nicht angemeldet sind oder die Sitzung abgelaufen ist, gibt jeder Befehl außer `getuid, login` einen

E_UNAUTHORIZED-Fehler zurück.

> E_UNKNOWNUID

Unbekannte UID

> E_AKTUALISIEREN

Der Knoten aktualisiert die Blockchain

> E_STOPP

Der Knoten wurde gestoppt

> E_NOIMPLEMENTED

Noch nicht implementiert

> E_GESPERRT

Die Kontoadresse ist in `%s` verboten

> E_CHECKROLE

Zugriff verweigert
## APIs sind für CLB nicht verfügbar

Schnittstellenanforderung für den CLB-Knoten nicht verfügbar:

* Metriken
* txinfo
* txinfoMultiple
* appparam
* appparams
* App-Inhalt
* Geschichte
* Balance
* Block
* maxblockid
* Blöcke
* detaillierte Blöcke
* Ökosystemparameter
* Systemparameter
* Ökosysteme
* Ökosystemparam
* Ökosystemname
* Brieftaschenverlauf
* tx_record
## Authentifizierung
[JWT-Token](#https://jwt.io/) wird zur Authentifizierung verwendet. Nach Erhalt des JWT-Tokens muss es in jedem Request-Header platziert werden: `Authorization: Bearer TOKEN_HERE`.

### getuid
GET/ gibt einen eindeutigen Wert zurück, signiert ihn mit dem privaten Schlüssel und sendet ihn dann mit dem Befehl [login](#login) an den Server zurück.

Um ein temporäres JWT-Token zu generieren, müssen Sie das Token an **Authorization** übergeben, wenn Sie **login** aufrufen.

#### Anfrage
> GET /api/v2/getuid
#### Antwort

* Flüssigkeit

Signaturnummern.

* Zeichen

Während der Anmeldung übergebenes temporäres Token.

Die Lebensdauer eines temporären Tokens beträgt 5 Sekunden.

* Netzwerk ID

  Serverkennung.

  Wenn keine Autorisierung erforderlich ist, werden die folgenden Informationen zurückgegeben:

* erlöschen

  Ablaufzeit.

* Ökosystem

  Ökosystem-ID.

* key_id

  Kontoadresse.

* die Anschrift

  Wallet-Adresse „XXXX-XXXX-.....-XXXX“.

#### Antwortbeispiel

200 (in Ordnung)

Inhaltstyp: application/json

```json
{
    "uid": "4999317241855959593",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE",
    "network_id": "4717243765193692211"
}
```
#### Fehlerantwort
E_SERVER

### Anmeldung
POST/ Authentifizierung der Benutzeridentität.

Der Befehl **getuid** sollte zuerst aufgerufen werden, um einen eindeutigen Wert zu erhalten und ihn zu signieren. Das temporäre JWT-Token von getuid muss im Anforderungsheader übergeben werden.

Wenn die Anfrage erfolgreich war, wird das in der Antwort erhaltene Token in **Autorisierung** aufgenommen.
#### Anfrage
> POST /api/v2/login

* [Ökosystem]

  Ökosystem-ID.

  Wenn nicht angegeben, ID des ersten Ökosystems standardmäßig.

* [erlöschen]

  Lebensdauer des JWT-Tokens in Sekunden, standardmäßig 28800.

* [Publikumsschlüssel]

  Hexadezimaler öffentlicher Schlüssel des Kontos.
  
* [Schlüssel_ID]

  Kontoadresse `XXXX-...-XXXX`.

  Verwenden Sie diesen Parameter, wenn der öffentliche Schlüssel bereits in der Blockchain gespeichert ist. Es kann nicht gleichzeitig mit dem Pubkey-Parameter verwendet werden.

* Unterschrift

  UID-Signatur erhalten über getuid.

#### Antwort

* Zeichen

     JWT-Token.

* Ökosystem

     Ökosystem-ID.

* key_id

     Kontoadressen-ID

* die Anschrift

     Wallet-Adresse `XXXX-...-XXXX`.

* Notify_key

     Benachrichtigungs-ID.

* isnode

     Ob die Kontoadresse der Besitzer des Knotens ist. Wert: `true, false`.

* Ist Besitzer

     Ob die Kontoadresse der Ersteller des Ökosystems ist. Wert: `true, false`.

* obs

     Ob das registrierte Ökosystem CLB ist. Wert: `true, false`.

#### Antwortbeispiel

200 (OK)

Content-Type: application/json

```json
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........AHDRDqDFBoWEHw-9lfIcLobehvNEeIYBB4BIb5J72aQ",
 "ecosystem":"1",
 "key_id":"54321",
 "address": "4321-....-2223"
}
```
#### Fehlerantwort

E_SERVER, E_UNKNOWNUID, E_SIGNATURE, E_STATELOGIN, E_EMPTYPUBLIC

## Dienstbefehle
### Ausführung

GET/ Gibt die Version des aktuellen Servers zurück.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.
#### Anfrage
> GET /api/v2/version

#### Antwortbeispiel

```
200 (OK)
Content-Type: application/json
"1.2.6"
```
## Datenabfragefunktionen

### Balance

GET/ Fordern Sie den Kontostand der Kontoadresse im aktuellen Ökosystem an.

#### Anfrage

> GET /api/v2/balance/{wallet}

* Brieftasche

 Adresskennung. Sie können es in einem beliebigen Format `int64, uint64, XXXX-...-XXXX` angeben. Diese Adresse wird in dem Ökosystem abgefragt, in dem der Benutzer gerade angemeldet ist.

#### Antwort

* Menge

     Kontostand der kleinsten Einheit.

* Geld

     Kontostand.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
 "amount": "877450000000000",
 "money": "877.45"
}
```
#### Fehlerantwort
E_SERVER, E_INVALIDWALLET

### Blöcke
GET/ gibt eine Liste zurück, die zusätzliche Informationen zu Transaktionen in jedem Block enthält.
Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

#### Anfrage
> GET /api/v2/blocks
* block_id

  Höhe des abzufragenden Startblocks.

* Anzahl

  Anzahl der Blöcke
#### Antwort

* Blockhöhe

     Die Liste der Transaktionen im Block und die zusätzlichen Informationen zu jeder Transaktion:
     * Haschisch

         Transaktionshash.
     * Vertragsname

         Vertragsname.
     * Parameter

         Ein Array von Vertragsparametern.
     * key_id

         Für den ersten Block die Kontoadresse des ersten Blocks, der die Transaktion signiert hat.
         Für alle anderen Blöcke die Adresse des Kontos, das die Transaktion signiert hat.
#### Antwortbeispiel
```
200 (OK)
Content-Type: application/json
{"1":
 [{"hash":"O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=",
 "contract_name":"",
 "params":null,
 "key_id":-118432674655542910}]
}
```

#### Fehlerantwort

E_SERVER, E_NICHT GEFUNDEN

### detaillierte Blöcke

GET/ gibt eine Liste mit detaillierten zusätzlichen Informationen zu Transaktionen in jedem Block zurück.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

#### Anfrage
> GET /api/v2/detailed_blocks
#### Antwort
* Blockhöhe
     * Kopfzeile blockieren

         Der Blockkopf enthält die folgenden Felder:
         * block_id

             Blockhöhe.
         * Zeit

             Zeitstempel der Blockgenerierung.
         * key_id

             Die Adresse des Kontos, das den Block signiert hat.
         * Knotenposition

             Die Position des Knotens, der den Block in der Liste der Ehrenknoten generiert.
         * Ausführung

             Version mit Blockstruktur.
    * Haschisch

         Hash blockieren.
     * Knotenposition

         Position des Knotens, der den Block generiert hat, in der Liste der Ehrenknoten.
     * key_id

         Adresse des Kontos, das den Block signiert hat.
     * Zeit

         Zeitstempel der Blockgenerierung.
     * tx_count

         Anzahl der Transaktionen im Block.
     * rollback_hash

         Rollback-Hash blockieren.
     * mrkl_root

         Merkel Transaktionsbaum des Blocks.
     * bin_data

         Serialisierung des Blockheaders, aller Transaktionen im Block, des vorherigen Blockhashs und des privaten Schlüssels des Knotens, der den Block generiert hat.
     * sys_update

         Enthält der Block Transaktionen zum Aktualisieren von Systemparametern.
     * Transaktion
Die Liste der Transaktionen im Block und die zusätzlichen Informationen zu jeder Transaktion:
         * Haschisch

             Transaktionshash.
         * Vertragsname

             Vertragsname.
         * Parameter

             Vertragsparameter.
         * key_id

             Adresse des Kontos, das die Transaktion unterzeichnet hat.
         * Zeit

             Zeitstempel der Transaktionsgenerierung.
         * Typ

             Art der Transaktion.
#### Antwortbeispiel
200 (OK)

Inhaltstyp: application/json

```json
{
    "1":
    {
        "header":
        {
            "block_id":1,
            "time":1551069320,
            "ecosystem_id":0,
            "key_id":-118432674655542910,
            "node_position":0,
            "version":1
        },
        "hash":"3NxhvswmpGvRdw8HdkrniI5Mx/q14Z4d5hwGKMp6KHI=",
        "ecosystem_id":0,
        "node_position":0,
        "key_id":-118432674655542910,
        "time":1551069320,
        "tx_count":1,
        "rollbacks_hash":"I2JHugpbdMNxBdNW1Uc0XnbiXFtzB74yD9AK5YI5i/k=",
        "mrkl_root":"MTZiMjY2NGJjOWY3MDAyODlhYjkyMDVhZDQwNDgxNzkxMjY1MWJjNjczNDkyZjk5MWI2Y2JkMjAxNTIwYjUyYg==",
        "bin_data":null,
        "sys_update":false,
        "gen_block":false,
        "stop_count":0,
        "transactions":[{
            "hash":"O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=","contract_name":"",
            "params":null,
            "key_id":0,
            "time":0,
            "type":0
        }]
    }
}
```
#### Fehlerantwort
E_SERVER, E_NOTFOUND

### <span id = "data-table-id-column-hash">/data/{table}/{id}/{column}/{hash}</span>
GET/ Wenn der angegebene Hash mit den Daten in der angegebenen Tabelle, dem angegebenen Feld und dem angegebenen Datensatz übereinstimmt, gibt diese Anforderung die Daten zurück. Andernfalls wird ein Fehler zurückgegeben.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

#### Anfrage
> GET /data/{table}/{id}/{column}/{hash}

* Tisch

     Tabellenname.
* Ich würde

     Datensatz-ID.
* Säule

     Feldname.
* Haschisch

     Hash der angeforderten Daten.

#### Antwort
Binärdaten

### Schlüsselinfo
GET/ gibt eine Liste von Ökosystemen zurück, einschließlich Rollen, die bei der angegebenen Adresse registriert sind.
Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.
#### Anfrage
> GET /api/v2/keyinfo/{key_id}

* key_id

     Adresskennung, Sie können ein beliebiges Format `int64, uint64, XXXX-...-XXXX` angeben.

     Anfrage in allen Ökosystemen abgefragt.
#### Antwort
* Ökosystem

     Ökosystem-ID.
* Name

     Name des Ökosystems.
* Rollen

     Eine Liste von Rollen mit den ID- und Namensfeldern.
#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Admin"},{"id":"2","name":"Developer"}]
}]
```
#### Fehlerantwort
E_SERVER, E_INVALIDWALLET

## Metriken abrufen

### Schlüssel

GET/ Gibt die Anzahl der Kontoadressen zurück.

#### Anfrage

> GET /api/v2/metrics/keys

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "count": 28
}
```
### Blöcke
GET/ Gibt die Anzahl der Blöcke zurück.

#### Anfrage
> GET /api/v2/metrics/blocks

#### Antwortbeispiel

200 (OK)

Inhaltstyp application/json

```json
{
 "count": 28
}
```
### Transaktionen
GET/ Gibt die Gesamtzahl der Transaktionen zurück.

#### Anfrage
> GET /api/v2/metrics/transactions

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
 "count": 28
}
```

### Ökosysteme
GET/ Gibt die Anzahl der Ökosysteme zurück.

#### Anfrage
> GET /api/v2/metrics/ecosystems

#### Antwortbeispiel
200 (OK)

Inhaltstyp: application/json

```json
{
    "count": 28
}
```
### Vollknoten
GET/ gibt die Anzahl der Ehrenknoten zurück.

> GET /api/v2/metrics/fullnodes

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "count": 28
}
```
## Ökosystem
### Ökosystemname

GET/ gibt den Namen des Ökosystems anhand seiner Kennung zurück.
Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

#### Anfrage
> GET /api/v2/ecosystemname?id=..

* Ich würde

     Ökosystem-ID.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "ecosystem_name": "platform_ecosystem"
}
```
#### Fehlerantwort

E_PARAMNICHT GEFUNDEN

### Ökosysteme
GET/ Gibt die Anzahl der Ökosysteme zurück.

> GET /api/v2/ecosystems/

#### Antwort
* Anzahl

  Die Anzahl der installierten Ökosysteme.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "number": 100,
}
```

### <span id = "appparams-appid">appparams/{appID}</span>
GET/ Gibt eine Liste von Anwendungsparametern im aktuellen oder angegebenen Ökosystem zurück.

#### Anfrage
> GET /api/v2/appparams

* [appid]

    Anwendung ID.
* [ecosystem]

Ökosystem-ID. Wenn nicht angegeben, werden die Parameter des aktuellen Ökosystems zurückgegeben.
* [names]

    Liste der empfangenen Parameter.
     Sie können die Liste der Parameternamen durch Kommas getrennt angeben. Zum Beispiel: `/api/v2/appparams/1?names=name,mypar`.
#### Antwort
* aufführen
  
     Jedes Element im Array enthält die folgenden Parameter:
     * Name, Parametername;
     * Wert, Parameterwert;
     * Bedingungen, Erlaubnis zum Ändern von Parametern.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "list": [{
        "name": "name",
        "value": "MyState",
        "conditions": "true",
    },
    {
        "name": "mypar",
        "value": "My value",
        "conditions": "true",
    },
    ]
}
```

#### Fehlerantwort
E_ECOSYSTEM

### <span id = "appparam-appid-name">appparam/{appid}/{name}</span>
GET/ Gibt Informationen zurück, die sich auf den Parameter {name} der Anwendung {appid} im aktuellen oder angegebenen Ökosystem beziehen.
#### Anfrage
> GET /api/v2/appparam/{appid}/{name}[?ecosystem=1]

* appid

    Anwendung ID.
* name

    Name des angeforderten Parameters.
* [ecosystem]

Ökosystem-ID (optionaler Parameter).
     Gibt standardmäßig das aktuelle Ökosystem zurück.

#### Antwort
* Ich würde

     Parameter-ID.
* Name

     Parametername.
* Wert

     Parameterwert.
* Bedingungen

     Berechtigung zum Ändern von Parametern.

#### Antwortbeispiel

200 (OK)
Inhaltstyp: application/json

```json
{
    "id": "10",
    "name": "par",
    "value": "My value",
    "conditions": "true"
}
```
#### Fehlerantwort
E_ECOSYSTEM, E_PARAMNOTFOUND

### Ökosystemparam
GET/ Gibt die Liste der Ökosystemparameter zurück.

#### Anfrage
> GET /api/v2/ecosystemparams/[?ecosystem=...&names=...]

* [Ökosystem]

     Ökosystem-ID. Wenn nicht angegeben, wird die aktuelle Ökosystem-ID zurückgegeben.

* [Namen]
     Liste der Anforderungsparameter, durch Kommas getrennt.

     Zum Beispiel: `/api/v2/ecosystemparams/?names=name,currency,logo*`.
 #### Antwort
* aufführen

     Jedes Element im Array enthält die folgenden Parameter:
* Name

     Parametername.
* Wert

     Parameterwert.
* Bedingungen

     Berechtigung zum Ändern von Parametern.

#### Antwortbeispiel
200 (OK)
Inhaltstyp: application/json

```json
{
    "list": [{
            "name": "name",
            "value": "MyState",
            "conditions": "true",
        },
        {
        "name": "currency",
        "value": "MY",
        "conditions": "true",
        },
    ]
}
```
#### Fehlerantwort
E_ECOSYSTEM

### <span id = "ecosystemparam-name">ecosystemparam/{name}</span>

GET/ Gibt Informationen zum Parameter {Name} im aktuellen oder angegebenen Ökosystem zurück.

#### Anfrage
> GET /api/v2/ecosystemparam/{name}[?ecosystem=1]
* name

    Name des Anforderungsparameters.
* [ecosystem]

    Sie können die Ökosystem-ID angeben. Standardmäßig wird die aktuelle Ökosystem-ID zurückgegeben.

#### Antwort
* name

    Parametername.
* value

    Parameterwert.
* conditions

    Berechtigung zum Ändern der Parameter.

#### Antwortbeispiel
200 (OK)
Inhaltstyp: application/json

```json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
}
```

#### Fehlerantwort
E_ECOSYSTEM

### <span id = "tables-limit-offset">tables/[?limit=…&offset=…]</span>

GET/ Gibt die Liste der Tabellen des aktuellen Ökosystems zurück, in der Sie den Offset und die Anzahl der Einträge festlegen können.

#### Anfrage
* [limit]

    Anzahl der Einträge, standardmäßig 25.
* [offset]

    Offset, standardmäßig 0.
> GET /api/v2/tables

#### Antwort
* count

    Gesamteinträge in der Tabelle.

* list

    Jedes Element im Array enthält die folgenden Parameter:
* name

    Tabellenname ohne Präfix.
* count

   Anzahl der Einträge in der Tabelle.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "count": "100"
    "list": [{
            "name": "accounts",
            "count": "10",
        },
        {
            "name": "citizens",
            "count": "5",
        },
    ]
}
```

### <span id = "table-name">table/{name}</span>
GET/ Gibt Informationen zu der vom aktuellen Ökosystem angeforderten Tabelle zurück.
Gibt die folgenden Feldinformationen zurück:

* name

    Tabellenname
* insert

    Berechtigung zum Hinzufügen neuer Einträge.
* new_column

    Berechtigung zum Hinzufügen neuer Felder.
* update

   Berechtigung zum Ändern von Einträgen.

* columns

    Eine Reihe von feldbezogenen Informationen:
* name

    Feldname.
* type

    Felddatentyp.
* perm

    Berechtigung zum Ändern des Werts dieses Felds.

#### Anfrage
> GET /api/v2/table/mytable

* name

    Tabellenname ohne das Ökosystempräfix.
#### Antwort
* name

    Tabellenname ohne das Ökosystempräfix.
* insert

    Berechtigung zum Hinzufügen neuer Einträge.
* new_column

    Berechtigung zum Hinzufügen neuer Felder.
* update

   Berechtigung zum Ändern von Einträgen.
* conditions

    Berechtigung zum Ändern der Tabellenkonfiguration.
* columns

    Eine Reihe von feldbezogenen Informationen:
* name

    Feldname.
* type

    Felddatentyp.
* perm

    Berechtigung zum Ändern des Werts dieses Felds.
#### Antwortbeispiel
200 (OK)

Inhaltstyp: application/json

```json
{
    "name": "mytable",
    "insert": "ContractConditions(`MainCondition`)",
    "new_column": "ContractConditions(`MainCondition`)",
    "update": "ContractConditions(`MainCondition`)",
    "conditions": "ContractConditions(`MainCondition`)",
    "columns": [{
        "name": "mynum", 
        "type": "number", 
        "perm":"ContractConditions(`MainCondition`)" 
        },
        {"name": "mytext", 
        "type": "text", 
        "perm":"ContractConditions(`MainCondition`)" 
        }
    ]
}
```

#### Fehlerantwort
E_TABLENOTFOUND

### <span id = "list-name-limit-offset-colums">list/{name}[?limit=…&offset=…&columns=…]</span>
GET/ Gibt die Liste der angegebenen Tabelleneinträge im aktuellen Ökosystem zurück, und wo Sie den Offset und die Anzahl der Einträge festlegen können.

#### Anfrage

* name

    Tabellenname.
* [limit]

    Die Anzahl der Einträge, standardmäßig 25.
* [offset]

    Offset, standardmäßig 0.
* [columns]
    Liste der angeforderten Spalten, getrennt durch Kommas. Wenn nicht angegeben, werden alle Spalten zurückgegeben. In Anruffällen wird die ID-Spalte zurückgegeben.
> GET /api/v2/list/mytable?columns=name

#### Antwort

* count

    Einträge insgesamt.
* list

    Jedes Element im Array enthält die folgenden Parameter:
* id

     Eintrags-ID.
     Reihenfolge der angeforderten Spalten.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json


```json
{
    "count": "10",
    "list": [{
        "id": "1",
        "name": "John",
    },
    {
        "id": "2",
        "name": "Mark",
    },
    ]
}
```

### <span id = "sections-limit-offset-lang">sections[?limit=…&offset=…&lang=]</span>

GET/ Gibt die Liste der Einträge in Tabellenabschnitten des aktuellen Ökosystems zurück, und wo der Offset und die Anzahl der Einträge festgelegt werden können.

Wenn das Feld role_access eine Liste von Rollen und nicht die aktuelle Rolle enthält, wird kein Datensatz zurückgegeben. Die Daten im Titelfeld werden durch die Sprachressource Accept-Language im Anforderungsheader ersetzt.

#### Anfrage

* [limit]

  Anzahl der Einträge, standardmäßig 25.
* [offset]

   Offset, standardmäßig 0.
* [lang]

    Dieses Feld gibt die Sprachressourcen oder den Lokalisierungscode an, zum Beispiel: en, zh. Wenn keine Sprachressourcen angegeben sind, zum Beispiel: en-US, suchen Sie in der Sprachressourcengruppe en.

> GET /api/v2/sections

#### Antwort
* count

    Gesamtzahl der Einträge in Tabellenabschnitten.
* list

    Jedes Element im Array enthält die Informationen aller Spalten in den Tabellenabschnitten.

#### Antwortbeispiel
200 (OK)
Inhaltstyp: application/json

```json
{
    "count": "2",
    "list": [{
        "id": "1",
        "title": "Development",
        "urlpage": "develop",
        ...
        },
    ]
}
```

#### Fehlerantwort
E_TABLENOTFOUND

### <span id = "row-name-id-colums">row/{name}/{id}[?columns=]</span>
### 
GET/ Gibt den Eintrag der angegebenen Tabelle im aktuellen Ökosystem zurück. Sie können die zurückzugebende(n) Spalte(n) angeben.

#### Request
* name

    Tabellenname.
* id

    Eintrags-ID.
* [columns]

    Liste der angeforderten Spalten, getrennt durch Kommas. Wenn nicht angegeben, werden alle Spalten zurückgegeben. In allen Fällen wird die ID-Spalte zurückgegeben.

> GET /api/v2/row/mytable/10?columns=name

#### Response

* value

    Ein Array von Werten der angeforderten Spalten
    * id
        Eintrags-ID.

    * Reihenfolge der angeforderten Spalten.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "values": {
        "id": "10",
        "name": "John",
    }
}
```

#### Error response
E_NOTFOUND
### Systemparam
GET/ Gibt die Liste der Plattformparameter zurück.

#### Anfrage
> GET /api/v2/systemparams/[?names=...]

* [name]

     Eine durch Kommas getrennte Liste von Anforderungsparametern. Beispiel: /api/v2/systemparams/?names=max_columns,max_indexes.
#### Antwort
* list

        Jedes Element im Array enthält die folgenden Parameter:
     * Name

         Parametername.
* value

     Parameterwert.
* conditions

     Berechtigungen zum Ändern des Parameters.

#### Antwortbeispiel
200 (OK)
Inhaltstyp: application/json

```json
{
    "list": [{
        "name": "max_columns",
        "value": "100",
        "conditions": "ContractAccess("@1UpdateSysParam")",
    },
    {
        "name": "max_indexes",
        "value": "1",
        "conditions": "ContractAccess("@1UpdateSysParam")",
    },
    ]
}
```
#### Error response
E_PARAMNOTFOUND

### <span id = "history-name-id">history/{name}/{id}</span>
GET/ Gibt den Änderungsdatensatz des Eintrags in der angegebenen Tabelle im aktuellen Ökosystem zurück.
#### Anfrage
* Name

     Tabellenname.
* ID

     Eintrags-ID.

 #### Antwort
* list

     Jedes Element in einem Array, dessen Elemente geänderte Parameter des angeforderten Eintrags enthalten.

#### Antwortbeispiel
200 (OK)

Inhaltstyp: application/json


```json
{
    "list": [{
        "name": "default_page",
        "value": "P(class, Default Ecosystem Page)"
        },
        {
        "menu": "default_menu"
        }
    ]
}
```

### <span id = "interface-page-menu-block-name">interface/{page|menu|block}/{name}</span>
GET/ Gibt den Eintrag des Namensfelds in der angegebenen Tabelle (Seiten, Menü oder Blöcke) des aktuellen Ökosystems zurück.

> GET /api/v2/interface/page/default_page
#### Anfrage
* Name

     Name des in der Tabelle angegebenen Eintrags.
#### Antwort
* id

     Eintrags-ID.
* name

     Eintragsname.
* other

     Andere Spalten der Tabelle.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "id": "1",
    "name": "default_page",
    "value": "P(Page content)",
    "default_menu": "default_menu",
    "validate_count": 1
}
```

#### Error response
E_QUERY, E_NOTFOUND

## Vertragsfunktionen

### <span id = "contracts-limit-offset">contracts[?limit=…&offset=…]</span>
GET/ Gibt die Liste der Verträge im aktuellen Ökosystem zurück und kann den Offset und die Anzahl der Einträge festlegen.

#### Anfrage
* [limit]

    Anzahl der Einträge, standardmäßig 25.
* [offset]

    Offset, standardmäßig 0.
> GET /api/v2/contracts

#### Antwort
* Anzahl

     Gesamtzahl der Einträge.
* aufführen

     Jedes Element im Array enthält die folgenden Parameter:
     * id

         Vertrags-ID.
     * name

         Vertragsname.
     * value

         Vertragsinhalt.
     * wallet_id

         An den Vertrag gebundene Kontoadresse.
     * address

         An den Vertrag gebundene Wallet-Adresse `XXXX-...-XXXX`.
     * ecosystem-ID

         ID des Ökosystems, zu dem der Vertrag gehört.
     * app_id

         ID der Anwendung, zu der der Vertrag gehört.
     * conditions

         Berechtigungen zur Vertragsänderung.
     * token_id

         ID des Ökosystems, in dem sich der Token befindet, der zur Zahlung der Vertragsgebühr verwendet wird.
#### Antwortbeispiel

 200 (OK)

 Inhaltstyp: application/json

 
```json
 {
 "count": "10"
    "list": [{
        "id": "1",
        "name": "MainCondition",
        "token_id":"1",
        "wallet_id":"0",
        "value": "contract MainCondition {
                conditions {
                if(EcosysParam(`founder_account`)!=$key_id)
                {
                    warning `Sorry, you dont have access to this action.`
                }
                }
            }",
            "address":"0000-0000-0000-0000-0000",
            "conditions":"ContractConditions(`MainCondition`)"
        },
    ...
    ]
 }
 ```

### <span id = "contract-name">contract/{name}</span>
GET/ Gibt die relevanten Informationen des angegebenen Vertrags zurück. Standardmäßig wird der Vertrag im aktuellen Ökosystem abgefragt.

#### Anfrage
* name

    Vertragsname.
> GET /api/v2/contract/mycontract

#### Antwort
* id

     Vertrags-ID in VM.
* name

     Vertragsname „@1MainCondition“ mit der Ökosystem-ID.
* state

     ID des Ökosystems, zu dem der Vertrag gehört.
* wallet-id

     An den Vertrag gebundene Kontoadresse.
* token-ID

     Als ID des Ökosystems, in dem sich der Token befindet, der zur Zahlung der Vertragsgebühr verwendet wird.
* address

     An den Vertrag gebundene Wallet-Adresse `XXXX-...-XXXX`.
* table-id

     Eintrags-ID des Vertrags in der Vertragstabelle.
* fields

     Das Array enthält die Strukturinformationen jedes Parameters im Datenabschnitt des Vertrags:
     * Name

     Parametername.
     * Type

     Parametertyp.
     * Optional

     Parameteroption, true bedeutet optionaler Parameter, false bedeutet obligatorischer Parameter.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "fields" : [
    {"name":"amount", "type":"int", "optional": false},
    {"name":"name", "type":"string", "optional": true}
    ],
    "id": 150,
    "name": "@1mycontract",
    "tableid" : 10,
}
```

#### Error response
E_CONTRACT

### sendTX
POST/ Empfangen Sie die Transaktion im Parameter und fügen Sie sie der Transaktionswarteschlange hinzu. Wenn die Anfrage erfolgreich ausgeführt wird, wird der Transaktions-Hash zurückgegeben. Mit dem Hash erhalten Sie die entsprechende Transaktion im Block. Wenn eine Fehlerantwort auftritt, wird der Hash in die Fehlertextnachricht eingefügt.

#### Anfrage
* tx_key

Transaktionsinhalt. Sie können einen beliebigen Namen angeben und unterstützen den Empfang mehrerer Transaktionen mit diesem Parameter.
> POST /api/v2/sendTx
```
Headers:
Content-Type: multipart/form-data
Parameters:
tx1 - transaction 1
txN - transaction N
```
#### Antwort
* Hashes

     Array von Transaktions-Hashes:
* tx1

     Hash der Transaktion 1.
* txN

     Hash der Transaktion N.

#### Antwortbeispiel

200 (OK)
Inhaltstyp: application/json


```json
{
    "hashes": {
    "tx1": "67afbc435634.....",
    "txN": "89ce4498eaf7.....",
}
```
#### Error response
E_LIMITTXSIZE,*E_BANNED*

### txstatus
POST/ Gibt die Block-ID und die Fehlermeldung des angegebenen Transaktions-Hash zurück. Ist der Rückgabewert der Block-ID und Fehlermeldung leer, wurde die Transaktion nicht in den Block aufgenommen.

#### Anfrage
* data
    JSON list of transaction hashes.
    ```
    {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
    ```
> POST /api/v2/txstatus/

#### Antwort
* Ergebnisse
    Im Datenwörterbuch ist der Transaktions-Hash der Schlüssel, während das Transaktionsdetail der Wert ist.

    * hash

    Transaktionshash.

    * blockid

    Wenn die Transaktion erfolgreich ausgeführt wird, wird die Block-ID zurückgegeben; Wenn die Transaktion nicht ausgeführt werden konnte, ist die Block-ID 0.

    * result

    Geben Sie das Transaktionsergebnis über die Variable $result zurück.
    * errmsg

    Wenn die Transaktion nicht ausgeführt werden kann, wird eine Fehlertextnachricht zurückgegeben.

#### Antwortbeispiel
200 (OK)

Inhaltstyp: application/json


```json
{"results":
    {
        "hash1": {
        "blockid": "3123",
        "result": "",
        },
        "hash2": {
        "blockid": "3124",
        "result": "",
        }
    }
}
```

#### Error response
E_HASHWRONG, E_HASHNOTFOUND

### <span id = "txinfo-hash">txinfo/{hash}</span>
GET/ Gibt die Informationen des angegebenen Hashs zurück, die mit der Transaktion korrelieren, einschließlich der Block-ID und der Anzahl der Bestätigungen. Wenn optionale Parameter angegeben werden, können auch der Vertragsname und zugehörige Parameter zurückgegeben werden.

#### Anfrage
* hash

    Transaktionshash.
* [contractinfo]

Detaillierte Kennung des Vertragsparameters. Um Vertragsdetails zu erhalten, die sich auf die Transaktion beziehen, geben Sie `contractinfo=1` an.

> GET /api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1
#### Antwort
* blockid

     Enthält die Block-ID der Transaktion. Wenn der Wert `0` ist, kann keine Transaktion mit diesem Hash gefunden werden.
* bestätigen Sie

     Anzahl der Bestätigungen des Blocks blockid.
* Daten
 
     Wenn `contentinfo=1` angegeben ist, werden die Vertragsdetails an diesen Parameter zurückgegeben.

#### Antwortbeispiel
200 (OK)

Inhaltstyp: application/json

```json
{
    "blockid": "9",
    "confirm": 11,
    "data": {
        "block": "9",
        "contract": "@1NewContract",
        "params": {
            "ApplicationId": 1,
            "Conditions": "true",
            "Value": "contract crashci4b {\n\t\t\tdata {}\n\t\t}"
        }
    }
}
```

#### Error response
E_HASHWRONG

### txinfoMultiple/
GET/ Gibt die Informationen des angegebenen Hashs zurück, die mit einer Transaktion korrelieren.

#### Anfrage
* hash

    Liste der Transaktions-Hashes.
* [contractinfo]

Detaillierte Kennung des Vertragsparameters. Um Vertragsdetails in Bezug auf die Transaktion zu erhalten, geben Sie `contractinfo=1` an.

    ```
    {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
    ```
> GET /api/v2/txinfoMultiple/
#### Antwort
* Ergebnisse

     Im Datenwörterbuch Transaktions-Hashes als Schlüssel und Transaktionsdetails als Wert.

     * hash

     Transaktionshash.

     * blockid

     Block-ID, die die Transaktion enthält. Wenn der Wert `0` ist, kann keine Transaktion mit diesem Hash gefunden werden.

     * confirm

     Anzahl der Bestätigungen des Blocks blockid.

     * date

     Wenn `contentinfo=1` angegeben ist, werden die Vertragsdetails an diesen Parameter zurückgegeben.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{"results":
    {
        "hash1": {
        "blockid": "3123",
        "confirm": "5",
        },
        "hash2": {
        "blockid": "3124",
        "confirm": "3",
        }
    }
 }
```

#### Error response
E_HASHWRONG

### <span id = "page-validators_count-name">/page/validators_count/{name}</span>
GET/ Gibt die Anzahl der Knoten zurück, die zum Überprüfen der angegebenen Seite erforderlich sind.

#### Anfrage
* name

    Seitenname mit Ökosystem-ID in einem Format: `@ecosystem_id%%page_name%`. Zum Beispiel: `@1main_page`.
> GET /api/v2/page/validators_count/@1page_name

#### Antwort

* validate_count

   Anzahl der Knoten, die zum Überprüfen der angegebenen Seite erforderlich sind

#### Antwortbeispiel
```
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

#### Error response
E_NOTFOUND, E_SERVER

### <span id = "content-menu-page-name">content/menu|page/{name}</span>
POST/ Gibt den JSON-Objektbaum des Codes der angegebenen Seite oder des Menünamens zurück, der das Ergebnis der Vorlagen-Engine-Verarbeitung ist.

#### Anfrage
* name

    Seiten- oder Menüname.
> POST /api/v2/content/page/default

#### Antwort
* menu
 
     Menüname der Seite bei Anforderung von Inhalt/Seite/…
* menutree

     Ein JSON-Objektbaum des Seitenmenüs beim Anfordern von Inhalt/Seite/…
* * title–head for the menu content/menu/…

     Menüname bei Anforderung von Inhalt/Menü/...
* tree

     Ein JSON-Objektbaum einer Seite oder eines Menüs.
#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "tree": {"type":"......",
    "children": [
        {...},
        {...}
    ]
    },
}
```

#### Error response
E_NOTFOUND

### <span id = "content-source-name">content/source/{name}</span>
POST/ Gibt den JSON-Objektbaum des angegebenen Seitennamencodes zurück. Führt keine Funktion aus und empfängt keine Daten. Der zurückgegebene JSON-Objektbaum entspricht der Seitenvorlage und kann im visuellen Seitendesigner verwendet werden. Wenn die Seite nicht gefunden werden kann, wird ein 404-Fehler zurückgegeben. Anfrage """""""

* name

   Seitenname.
#### Antwort

> POST /api/v2/content/source/default

* tree

    Eine JSON-Objektstruktur der Seite.
#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "tree": {"type":"......",
    "children": [
        {...},
        {...}
    ]
    },
}
```

#### Error response
E_NOTFOUND, E_SERVER

### <span id = "content-hash-name">content/hash/{name}</span>
POST/ Gibt den SHA256-Hash des angegebenen Seitennamens zurück oder den Fehler 404, wenn die Seite nicht gefunden werden kann.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich. Um den korrekten Hash zu erhalten, wenn Sie eine Anfrage an andere Knoten stellen, müssen Sie auch die Parameter „Ökosystem“, „keyID“, „roleID“ und „isMobile“ übergeben. Um Seiten von anderen Ökosystemen zu erhalten, muss die Ökosystem-ID dem Seitennamen vorangestellt werden. Zum Beispiel: `@2meineseite`.
#### Anfrage
* name

     Seitenname mit der Ökosystem-ID.
* ecosystem

     Ökosystem-ID.
* key-ID

     Kontoadresse.
* role-ID
 
     Rollen-ID.

* isMobile

     Parameterkennung der mobilen Plattform.
> POST /api/v2/content/hash/default
#### Antwort
* Hex

     Hexadezimaler Hash.

#### Antwortbeispiel
```
200 (OK)
Inhaltstyp: application/json
{
 "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
}
```
#### Fehlerantwort
E_NOTFOUND, E_SERVER, E_HEAVYPAGE
### Inhalt

POST/ Die Anzahl der JSON-Objekte, die den Seitencode aus dem Vorlagenparameter zurückgeben. Wenn der optionale Parameter source als `true` oder `1` angegeben ist, führt der JSON-Objektbaum keine Funktion aus und empfängt keine Daten. Der JSON-Objektbaum kann im visuellen Seitendesigner verwendet werden.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

#### Anfrage
* template

    Der Seitencode.
* [source]

    Bei Angabe von `true` oder `1` führt der JSON-Objektbaum keine Funktionen und empfangenen Daten aus.
> POST /api/v2/content

#### Antwort

* tree

    JSON-Objektbaum.
#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "tree": {"type":"......",
    "children": [
        {...},
        {...}
    ]
    },
}
```

#### Fehlerantwort
E_NOTFOUND, E_SERVER

### maxblockid
GET/ Gibt die ID des höchsten Blocks auf dem aktuellen Knoten zurück.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

#### Anfrage

> GET /api/v2/maxblockid

#### Antwort
* max_block_id

ID des höchsten Blocks auf dem aktuellen Knoten.
#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "max_block_id" : 341,
}
```
#### Fehlerantwort
E_NOTFOUND

### <span id = "block-id">block/{id}</span>
GET/ Gibt relevante Informationen des Blocks mit der angegebenen ID zurück.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

#### Anfrage
* Ich würde
     Block-ID.
> POST /api/v2/block/32

#### Antwort
* hash

     Hash des Blocks.
* key_id

     Adresse des Kontos, das den Block signiert hat.
* time

     Zeitstempel der Blockgenerierung.
* tx_count

     Gesamtzahl der Transaktionen im Block.
* rollbacks_hash

     Hash für Block-Rollback.
* node_position

     Position des Blocks in der Liste der Ehrenknoten.

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "hash": "1x4S5s/zNUTopP2YK43SppEyvT2O4DW5OHSpQfp5Tek=",
    "key_id": -118432674655542910,
    "time": 1551145365,
    "tx_count": 3,
    "rollbacks_hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "node_position": 0,
}
```

#### Fehlerantwort
E_NOTFOUND


### <span id = "avatar-ecosystem-member">avatar/{ecosystem}/{member}</span>
GET/ Gibt den Avatar des Benutzers in der Mitgliedertabelle zurück (Sie können ihn ohne Anmeldung verwenden).

#### Anfrage
* ecosystem

    Ecosystem ID.
* member

    Kontoadresse des Benutzers.
> GET /api/v2/avatar/1/-118432674655542910
#### Antwort
Der Typ des Anforderungsheaders Content-Type ist image, und die Bilddaten werden im Antworttext zurückgegeben.

#### Antwortbeispiel
```
200 (OK)
Content-Type: image/png
```

#### Fehlerantwort
E_NOTFOUND E_SERVER

### <span id = "config-centrifugo">config/centrifugo</span>
GET/ Gibt die Hostadresse und den Port von centrifugo zurück.
Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

#### Anfrage
> GET /api/v2/config/centrifugo

#### Antwort
Das Antwortformat ist `http://address:port`, zum Beispiel: `http://127.0.0.1:8100`.

#### Error response
E_SERVER

### updnotificator
POST/ Senden Sie alle Nachrichten, die noch nicht gesendet wurden, an den Benachrichtigungsdienst von centrifugo. Senden Sie nur Nachrichten für bestimmte Ökosysteme und Mitglieder.

Für diese Anfrage ist keine Anmeldeberechtigung erforderlich.

#### Anfrage
* id

    Kontoadresse des Mitglieds.
* ecosystem

    Ecosystem ID.
> POST /api/v2/updnotificator

#### Antwortbeispiel

200 (OK)

Inhaltstyp: application/json

```json
{
    "result": true
}
```