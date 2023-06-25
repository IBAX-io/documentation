# Compiler und virtuelle Maschine {#compiler-and-virtual-machine}

  - [Speicherung und Kompilierung des Quellcodes](#source-code-storage-and-compilation)
  - [Strukturen virtueller Maschinen](#virtual-machine-structures)
    - [VM-Struktur](#vm-structure)
    - [Blockstruktur](#block-structure)
    - [ObjInfo-Struktur](#objinfo-structure)
      - [ContractInfo-Struktur](#contractinfo-structure)
      - [FieldInfo-Struktur](#fieldinfo-structure)
      - [FuncInfo-Struktur](#funcinfo-structure)
      - [Funktionsname-Struktur](#funcname-structure)
      - [ExtFuncInfo-Struktur](#extfuncinfo-structure)
      - [VarInfo-Struktur](#varinfo-structure)
      - [ObjExtend-Wert](#objextend-value)
  - [Befehle für virtuelle Maschinen](#virtual-machine-commands)
    - [ByteCode-Struktur](#bytecode-structure)
    - [Befehlskennungen](#command-identifiers)
    - [Befehle für Stapeloperationen](#stack-operation-commands)
    - [Laufzeitstruktur](#runtime-structure)
      - [blockStack-Struktur](#blockstack-structure)
    - [RunCode-Funktion] (#runcode-function)
    - [Andere Funktionen für Operationen mit VM](#other-functions-for-operations-with-vm)
  - [Compiler](#compiler)
  - [Lexikalanalyse](#lexical-analyzer)
    - [lextable/lextable.go](#lextable-lextable-go)
    - [lex.go](#lex-go)
  - [Nadelsprache](#needle-language)
    - [Lexeme](#lexemes)
    - [Typen](#types)
    - [Ausdrücke](#expressions)
    - [Bereich](#scope)
    - [Vertragsausführung](#contract-execution)
    - [Backus-Naur-Form (BNF)](#backus-naur-form-bnf)

Dieser Abschnitt umfasst Programmkompilierung und Needle-Language-Operationen in der virtuellen Maschine (VM).
## Speicherung und Kompilierung des Quellcodes {#source-code-storage-and-compilation}

Verträge und Funktionen werden mit Golang geschrieben und in den Vertragstabellen von Ökosystemen gespeichert.

Wenn ein Vertrag ausgeführt wird, wird sein Quellcode aus der Datenbank gelesen und in Bytecode kompiliert.

Wenn ein Vertrag geändert wird, wird sein Quellcode aktualisiert und in der Datenbank gespeichert. Dann wird der Quellcode kompiliert, wodurch der Bytecode in der entsprechenden virtuellen Maschine aktualisiert wird.

Da Bytecodes nicht physikalisch gespeichert werden, werden sie bei einer erneuten Programmausführung neu kompiliert.

Der gesamte in der Vertragstabelle jedes Ökosystems beschriebene Quellcode wird in einer strengen Reihenfolge in eine virtuelle Maschine kompiliert, und der Status der virtuellen Maschine ist auf allen Knoten gleich.

Beim Vertragsaufruf ändert die virtuelle Maschine ihren Status in keiner Weise. Die Ausführung eines Vertrages oder das Aufrufen einer Funktion erfolgt auf einem separaten laufenden Stack, der während jedes externen Aufrufs erstellt wird.

Jedes Ökosystem kann ein sogenanntes virtuelles Ökosystem haben, das innerhalb eines Knotens in Verbindung mit Tabellen außerhalb der Blockchain verwendet werden kann, ohne direkten Einfluss auf die Blockchain oder andere virtuelle Ökosysteme. In diesem Fall erstellt der Knoten, der ein solches virtuelles Ökosystem hostet, seinen Vertrag und erstellt seine eigene virtuelle Maschine.
## Strukturen virtueller Maschinen {#virtual-machine-structures}

### VM-Struktur {#vm-structure}

Eine virtuelle Maschine ist im Arbeitsspeicher als Struktur wie unten organisiert.

```
type VM struct {
   Block
   ExtCost func(string) int64
   FuncCallsDB map[string]struct{}
   Extern bool
   ShiftContract int64
   logger *log.Entry
}
```
Eine VM-Struktur hat die folgenden Elemente:
* Block - enthält eine [Blockstruktur] (#block-structure);
* ExtCost - eine Funktion gibt die Kosten für die Ausführung einer externen Golang-Funktion zurück;
* FuncCallsDB - eine Sammlung von Golang-Funktionsnamen. Diese Funktion gibt die Ausführungskosten als ersten Parameter zurück. Diese Funktionen verwenden EXPLAIN, um die Kosten der Datenbankverarbeitung zu berechnen;
* Extern – ein Boolesches Flag, das angibt, ob ein Vertrag ein externer Vertrag ist. Es wird auf „true“ gesetzt, wenn eine VM erstellt wird. Aufgerufene Verträge werden beim Kompilieren des Codes nicht angezeigt. Mit anderen Worten, es ermöglicht, den in Zukunft festgelegten Vertragscode aufzurufen;
* Schichtvertrag – ID des ersten Vertrags in der VM;
* logger - Ausgabe des VM-Fehlerprotokolls.
### Blockstruktur {#block-structure}

Eine virtuelle Maschine ist ein Baum, der aus **Blocktyp**-Objekten besteht.

Ein Block ist eine unabhängige Einheit, die einige Bytecodes enthält. Einfach ausgedrückt ist alles, was Sie in der Sprache in die geschweiften Klammern (`{}`) setzen, ein Block.

Der folgende Code würde beispielsweise einen Block mit Funktionen erstellen. Dieser Block enthält auch einen weiteren Block mit einer if-Anweisung, der wiederum einen Block mit einer while-Anweisung enthält.

```
func my() {
   if true {
      while false {
      ...
      }
   }
}
```

Der Block ist im Speicher als Struktur wie unten organisiert.
```
type Block struct {
   Objects map[string]*ObjInfo
   Type int
   Owner *OwnerInfo
   Info interface{}
   Parent *Block
   Vars []reflect.Type
   Code ByteCodes
   Children Blocks
}
```
Eine Blockstruktur besteht aus folgenden Elementen:

* **Objekte** - eine Abbildung interner Objekte des Zeigertyps [ObjInfo](#objInfo-Struktur). Wenn der Block beispielsweise eine Variable enthält, können Sie anhand ihres Namens Informationen darüber erhalten.
* **Typ** - der Typ des Blocks. Bei einem Funktionsblock ist sein Typ **ObjFunc**; für einen Vertragsblock ist sein Typ **ObjContract**;
* **Eigentümer** – eine Struktur vom Zeigertyp **Eigentümerinfo**. Diese Struktur enthält Informationen über den Eigentümer des kompilierten Vertrags, der während der Vertragserstellung angegeben oder aus der Tabelle **Verträge** erhalten wird;
* **Info** - enthält Informationen über das Objekt, die vom Blocktyp abhängen;
* **Parent** – ein Zeiger auf den Elternblock;
* **Vars** - ein Array, das die Typen der aktuellen Blockvariablen enthält;
* **Code** - der Bytecode des Blocks selbst, der ausgeführt wird, wenn die Kontrollrechte an den Block übergeben werden, zum Beispiel Funktionsaufrufe oder Schleifenkörper;
* **Children** - ein Array mit Unterblöcken, wie z. B. Funktionsverschachtelung, Schleifen, bedingte Operatoren.
### ObjInfo-Struktur {#objinfo-structure}

Die ObjInfo-Struktur enthält Informationen über interne Objekte.

```
type ObjInfo struct {
   Type int
   Value interface{}
}
```
Die ObjInfo-Struktur hat die folgenden Elemente:

* **Typ** ist der Objekttyp, der einen der folgenden Werte hat:
    * **ObjContract** – [Vertrag](#contractInfo-Struktur);
    * **ObjFunc** - Funktion;
    * **ObjExtFunc** - externe Golang-Funktion;
    * **ObjVar** - Variable;
    * **ObjExtend** - $name-Variable.
* **Wert** – enthält die Struktur jedes Typs.

#### ContractInfo-Struktur {#contractinfo-structure}

Zeigt auf den Typ **ObjContract**, und das Feld **Value** enthält eine **ContractInfo**-Struktur.

```
type ContractInfo struct {
   ID uint32
   Name string
   Owner *OwnerInfo
   Used map[string]bool
   Tx *[]*FieldInfo
}
```
Die ContractInfo-Struktur hat die folgenden Elemente:

* **ID** - Vertrags-ID, die beim Aufruf des Vertrags in der Blockchain angezeigt wird;
* **Name** - Vertragsname;
* **Eigentümer** - andere Informationen zum Vertrag;
* **Verwendet** - Karte der aufgerufenen Vertragsnamen;
* **Tx** – ein Datenarray, das im [Datenabschnitt](script.md#data-section) des Vertrags beschrieben wird.

#### FieldInfo-Struktur {#fieldinfo-structure}

Die FieldInfo-Struktur wird in der **ContractInfo**-Struktur verwendet und beschreibt Elemente im [Datenabschnitt](script.md#data-section) eines Vertrags.

```
type FieldInfo struct {
   Name string
   Type reflect.Type
   Original uint32
   Tags string
}
```
Die FieldInfo-Struktur hat die folgenden Elemente:

* **Name** - Feldname;
* **Typ** - Feldtyp;
* **Original** - optionales Feld;
* **Tags** - zusätzliche Beschriftungen für dieses Feld.

#### FuncInfo-Struktur {#funcinfo-structure}

Zeigt auf den ObjFunc-Typ, und das Value-Feld enthält eine FuncInfo-Struktur.
```
type FuncInfo struct {
   Params []reflect.Type
   Results []reflect.Type
   Names *map[string]FuncName
   Variadic bool
   ID uint32
}
```
Die FuncInfo-Struktur hat die folgenden Elemente:

* **Params** - ein Array von Parametertypen;
* **Ergebnisse** - ein Array zurückgegebener Typen;
* **Namen** - Abbildung von Daten für Tail-Funktionen, zum Beispiel `DBFind().Columns ()`;
* **Variadic** - wahr, wenn die Funktion eine variable Anzahl von Parametern haben kann;
* **ID** - Funktions-ID.

#### FuncName-Struktur {#funcname-structure}

Die Struktur FuncName wird für FuncInfo verwendet und beschreibt die Daten einer Tail-Funktion.
```
type FuncName struct {
   Params []reflect.Type
   Offset []int
   Variadic bool
}
```
Die FuncName-Struktur hat die folgenden Elemente:

* **Params** - ein Array von Parametertypen;
* **Offset** - das Array von Offsets für diese Variablen. Tatsächlich können die Werte aller Parameter in einer Funktion mit dem Punkt . initialisiert werden;
* **Variadic** - true, wenn die Tail-Funktion eine variable Anzahl von Parametern haben kann.

#### ExtFuncInfo-Struktur {#extfuncinfo-structure}

Zeigt auf den ObjExtFunc-Typ, und das Value-Feld enthält eine ExtFuncInfo-Struktur. Es wird verwendet, um Golang-Funktionen zu beschreiben.
```
type ExtFuncInfo struct {
   Name string
   Params []reflect.Type
   Results []reflect.Type
   Auto []string
   Variadic bool
   Func interface{}
}
```
Die ExtFuncInfo-Struktur hat die folgenden Elemente:

* Die Parameter **Name**, **Params**, **Results** haben die gleiche Struktur wie [FuncInfo](#funcinfo-structure);
* **Auto** - ein Array von Variablen. Wird gegebenenfalls als zusätzlicher Parameter an die Funktion übergeben. Beispielsweise eine Variable vom Typ SmartContract sc;
* **Func** - Golang-Funktionen.

#### VarInfo-Struktur {#varinfo-structure}

Zeigt auf den Typ **ObjVar**, und das Feld **Value** enthält eine **VarInfo**-Struktur.
```
type VarInfo struct {
   Obj *ObjInfo
   Owner *Block
}
```
Die VarInfo-Struktur hat die folgenden Elemente:

* **Obj** - Informationen über Typ und Wert der Variablen;
* **Eigentümer** - Zeiger auf den Eigentümerblock.

#### ObjExtend-Wert {#objextend-value}

Zeigt auf den Typ **ObjExtend**, und das Feld **Value** enthält eine Zeichenfolge, die den Namen der Variablen oder Funktion enthält.

## Befehle für virtuelle Maschinen {#virtual-machine-commands}
### ByteCode-Struktur {#bytecode-structure}

Ein Bytecode ist eine Folge von Strukturen vom Typ **ByteCode**.
```
type ByteCode struct {
   Cmd uint16
   Value interface{}
}
```

Diese Struktur hat die folgenden Felder:

* **Cmd** - der Bezeichner der Speicherbefehle;
* **Wert** - enthält den Operanden (Wert).

Im Allgemeinen führen Befehle eine Operation auf dem obersten Element des Stapels aus und schreiben bei Bedarf den Ergebniswert hinein.

### Befehlskennungen {#command-identifiers}
Bezeichner der Befehle der virtuellen Maschine sind in der Datei vm/cmds_list.go beschrieben.

* **cmdPush** – legt einen Wert aus dem Value-Feld auf den Stack. Legen Sie zum Beispiel Zahlen und Linien auf den Stapel;
* **cmdVar** - Legt den Wert einer Variablen auf den Stack. Value enthält einen Zeiger auf die VarInfo-Struktur und Informationen über die Variable;
* **cmdExtend** – legt den Wert einer externen Variablen auf den Stack. Wert enthält eine Zeichenfolge mit dem Variablennamen (beginnend mit $);
* **cmdCallExtend** – Aufruf einer externen Funktion (beginnend mit $). Die Parameter der Funktion werden aus dem Stapel abgerufen und die Ergebnisse auf dem Stapel abgelegt. Wert enthält einen Funktionsnamen (beginnend mit $);
* **cmdPushStr** – legt den String in Value auf den Stack;
* **cmdCall** - ruft die Funktion der virtuellen Maschine auf. Wert enthält eine **ObjInfo**-Struktur. Dieser Befehl gilt für die Golang-Funktion **ObjExtFunc** und die Needle-Funktion **ObjFunc**. Wenn eine Funktion aufgerufen wird, werden ihre Parameter vom Stapel abgerufen und die Ergebniswerte werden auf dem Stapel abgelegt;
* **cmdCallVari** - Ähnlich wie der Befehl **cmdCall** ruft er die Funktion der virtuellen Maschine auf. Dieser Befehl wird verwendet, um eine Funktion mit einer variablen Anzahl von Parametern aufzurufen;
* **cmdReturn** - wird verwendet, um die Funktion zu verlassen. Die Rückgabewerte werden auf den Stack gelegt und das Value-Feld wird nicht verwendet;
* **cmdIf** – übergibt die Kontrolle an den Bytecode in der Struktur **block**, der im Feld Wert übergeben wird. Das Steuerelement wird nur dann auf den Stack übertragen, wenn das oberste Element des Stacks von der *valueToBool*-Funktion aufgerufen und `true` zurückgegeben wird. Andernfalls wird die Steuerung an den nächsten Befehl übergeben;
* **cmdElse** - dieser Befehl funktioniert auf die gleiche Weise wie **cmdIf**, aber nur wenn das oberste Element des Stacks von der valueToBool-Funktion aufgerufen und `false` zurückgegeben wird, wird die Steuerung an die übertragen angegebener Block;
* **cmdAssignVar** – erhält eine Liste von Variablen des Typs **VarInfo** von Value. Diese Variablen verwenden den Befehl **cmdAssign**, um den Wert abzurufen;
* **cmdAssign** – weist den Wert im Stack der Variablen zu, die durch den Befehl **cmdAssignVar** erhalten wurde;
* **cmdLabel** - definiert ein Label, wenn die Steuerung während der While-Schleife zurückgegeben wird;
* **cmdContinue** - Dieser Befehl überträgt die Steuerung an das Label **cmdLabel**. Beim Ausführen einer neuen Iteration der Schleife wird Value nicht verwendet;
* **cmdWhile** – Verwenden Sie valueToBool, um das oberste Element des Stapels zu überprüfen. Wenn dieser Wert „true“ ist, wird die Struktur **block** aus dem Wertefeld aufgerufen;
* **cmdBreak** - beendet die Schleife;
* **cmdIndex** – legt den Wert in der Map oder im Array nach Index in den Stack, ohne Value zu verwenden. Beispiel: `(map | array) (index value) => (map | array [index value])`;
* **cmdSetIndex** – weist den Wert des obersten Elements des Stapels den Elementen der Karte oder des Arrays zu, ohne Value zu verwenden. Beispiel: `(map | array) (index value) (value) => (map | array)`;
* **cmdFuncName** - fügt Parameter hinzu, die mit sequentiellen Beschreibungen geteilt durch Punkt übergeben werden. Beispiel: `func name => Fun (...) .Name (...)`;
* **cmdUnwrapArr** - definiert ein boolesches Flag, wenn das oberste Element des Stapels ein Array ist;
* **cmdMapInit** – initialisiert den Wert von map;
* **cmdArrayInit** – initialisiert den Wert des Arrays;
* **cmdError** - Dieser Befehl wird erstellt, wenn ein Vertrag oder eine Funktion mit einem angegebenen `error, warning, info` beendet wird.

### Stack-Operationsbefehle {#stack-operation-commands}
> Hinweis

> In der aktuellen Version ist die automatische Typkonvertierung für diese Befehle nicht vollständig anwendbar. Zum Beispiel,

> `string + float | int | decimal => float | int | decimal, float + int | str => float, but int + string => runtime error`.

Das Folgende sind Befehle für die direkte Stack-Verarbeitung. Das Feld Wert wird in diesen Befehlen nicht verwendet.

* **cmdNot** - logische Negation. `(val) => (!ValueToBool(val))`;
* **cmdSign** - Vorzeichenwechsel. `(val) => (-val)`;
* **cmdAdd** - Ergänzung. `(val1)(val2) => (val1 + val2)`;
* **cmdSub** - Subtraktion. `(val1)(val2) => (val1-val2)`;
* **cmdMul** - Multiplikation. `(val1)(val2) => (val1 * val2)`;
* **cmdDiv** - Division. `(val1)(val2) => (val1 / val2)`;
* **cmdAnd** - logisches UND. `(val1)(val2) => (valueToBool(val1) && valueToBool(val2))`;
* **cmdOr** - logisches ODER. `(val1)(val2) => (valueToBool(val1) || valueToBool(val2))`;
* **cmdEqual** - Gleichheitsvergleich, bool wird zurückgegeben. `(val1)(val2) => (val1 == val2)`;
* **cmdNotEq** - Ungleichheitsvergleich, bool wird zurückgegeben. `(val1)(val2) => (val1 != val2)`;
* **cmdLess** - Kleiner-als-Vergleich, bool wird zurückgegeben. `(val1)(val2) => (val1 <val2)`;
* **cmdNotLess** - Größer-gleich-Vergleich, bool wird zurückgegeben. `(val1)(val2) => (val1 >= val2)`;
* **cmdGreat** - Größer-als-Vergleich, bool wird zurückgegeben. `(val1)(val2) => (val1> val2)`;
* **cmdNotGreat** - Kleiner-gleich-Vergleich, bool wird zurückgegeben. `(val1)(val2) => (val1 <= val2)`.

### Laufzeitstruktur {#runtime-structure}


Die Ausführung von Bytecodes wirkt sich nicht auf die virtuelle Maschine aus. Beispielsweise können verschiedene Funktionen und Verträge gleichzeitig in einer einzigen virtuellen Maschine ausgeführt werden. Die Runtime-Struktur wird verwendet, um Funktionen und Verträge sowie beliebige Ausdrücke und Bytecode auszuführen.

```
type RunTime struct {
   stack []interface{}
   blocks []*blockStack
   vars []interface{}
   extend *map[string]interface{}
   vm *VM
   cost int64
   err error
}
```
* **stack** - der Stack zum Ausführen des Bytecodes;
* **blocks** - Stack für Blockaufrufe;
* **vars** - Stapel von Variablen. Seine Variable wird dem Stapel von Variablen hinzugefügt, wenn der Bytecode im Block aufgerufen wird. Nach dem Verlassen des Blocks kehrt die Größe des Variablenstapels zum vorherigen Wert zurück;
* **extend** - ein Zeiger zum Abbilden mit Werten externer Variablen (`$name`);
* **vm** - ein Zeiger einer virtuellen Maschine;
* **cost** - Kraftstoffeinheit der resultierenden Ausführungskosten;
* **err** - Fehler während der Ausführung aufgetreten.

#### blockStack-Struktur {#blockstack-structure}

Die blockStack-Struktur wird in der Runtime-Struktur verwendet.
```
type blockStack struct {
   Block *Block
   Offset int
}
```
* **Block** – ein Zeiger auf den ausgeführten Block;
* **Offset** – der Offset des letzten ausgeführten Befehls im Bytecode des angegebenen Blocks.

### RunCode-Funktion {#runcode-function}

Bytecodes werden in der Funktion **RunCode** ausgeführt. Es enthält eine Schleife, die die entsprechende Operation für jeden Bytecode-Befehl durchführt. Vor der Verarbeitung eines Bytecodes müssen die erforderlichen Daten initialisiert werden.

Neue Blöcke werden zu anderen Blöcken hinzugefügt.

```
rt.blocks = append(rt.blocks, &blockStack{block, len(rt.vars)})
```
Rufen Sie als Nächstes die Informationen zu den relevanten Parametern der Tail-Funktion ab. Diese Parameter sind im letzten Element des Stapels enthalten.

```
var namemap map[string][]interface{}
if block.Type == ObjFunc && block.Info.(*FuncInfo).Names != nil {
   if rt.stack[len(rt.stack)-1] != nil {
      namemap = rt.stack[len(rt.stack)-1].(map[string][]interface{})
   }
   rt.stack = rt.stack[:len(rt.stack)-1]
}
```

Anschließend müssen alle im aktuellen Block definierten Variablen mit ihren Anfangswerten initialisiert werden.
```
start := len(rt.stack)
varoff := len(rt.vars)
for vkey, vpar := range block.Vars {
   rt.cost--
   var value interface{}
```
Da Variablen in der Funktion auch Variablen sind, müssen wir sie vom letzten Element des Stacks in der von der Funktion selbst beschriebenen Reihenfolge abrufen.

```
   if block.Type == ObjFunc && vkey <len(block.Info.(*FuncInfo).Params) {
      value = rt.stack[start-len(block.Info.(*FuncInfo).Params)+vkey]
   } else {
```

Lokale Variablen mit ihren Anfangswerten initialisieren.
```
      value = reflect.New(vpar).Elem().Interface()

      if vpar == reflect.TypeOf(map[string]interface{}{}) {

         value = make(map[string]interface{})
      } else if vpar == reflect.TypeOf([]interface{}{}) {
         value = make([]interface{}, 0, len(rt.vars)+1)
      }
   }
   rt.vars = append(rt.vars, value)
}
```

Aktualisieren Sie als Nächstes die Werte der variablen Parameter, die in der Tail-Funktion übergeben werden.
```
if namemap != nil {
   for key, item := range namemap {
      params := (*block.Info.(*FuncInfo).Names)[key]
      for i, value := range item {
         if params.Variadic && i >= len(params.Params)-1 {
```

Wenn übergebene variable Parameter zu einer variablen Anzahl von Parametern gehören, werden diese Parameter zu einem Array von Variablen kombiniert.

```
            off := varoff + params.Offset[len(params.Params)-1]
            rt.vars[off] = append(rt.vars[off].([]interface{}), value)
         } else {
            rt.vars[varoff+params.Offset[i]] = value
         }
      }
   }
}
```

Danach müssen wir nur noch Werte löschen, die von der Spitze des Stacks als Funktionsparameter übergeben wurden, wodurch der Stack verschoben wird. Wir haben ihre Werte in ein Variablenarray kopiert.

```
if block.Type == ObjFunc {
   start -= len(block.Info.(*FuncInfo).Params)
}
```


Wenn eine Bytecode-Befehlsschleife beendet ist, müssen wir den Stack korrekt leeren.
```
last := rt.blocks[len(rt.blocks)-1]
```

Löschen Sie den aktuellen Block aus dem Blockstapel.

```
rt.blocks = rt.blocks[:len(rt.blocks)-1]
if status == statusReturn {
```

Wenn eine bereits ausgeführte Funktion erfolgreich beendet wird, fügen wir den Rückgabewert am Ende des vorherigen Stacks hinzu.
```
   if last.Block.Type == ObjFunc {
      for count := len(last.Block.Info.(*FuncInfo).Results); count > 0; count-- {
         rt.stack[start] = rt.stack[len(rt.stack)-count]
         start++
      }
      status = statusNormal
   } else {
```
Wie Sie sehen können, stellen wir den Stack-Status nicht wieder her und beenden die Funktion unverändert, wenn wir die Funktion nicht ausführen. Der Grund ist, dass Schleifen und bedingte Strukturen, die in der Funktion ausgeführt wurden, ebenfalls Bytecode-Blöcke sind.
```
   return

   }
}

rt.stack = rt.stack[:start]
```

### Weitere Funktionen für Operationen mit VM {#other-functions-for-operations-with-vm}

Mit der Funktion **NewVM** können Sie eine virtuelle Maschine erstellen. Jeder virtuellen Maschine werden über die Funktion **Extend** vier Funktionen hinzugefügt, z. B. **ExecContract**, **MemoryUsage**, **CallContract** und **Settings**.

```
for key, item := range ext.Objects {
   fobj := reflect.ValueOf(item).Type()
```

Wir durchlaufen alle übergebenen Objekte und betrachten nur die Funktionen.

```
   switch fobj.Kind() {
   case reflect.Func:
```

Wir füllen die **ExtFuncInfo**-Struktur gemäß den über die Funktion erhaltenen Informationen und fügen ihre Struktur namentlich der Top-Level-Map **Objects** hinzu.

```
   data := ExtFuncInfo{key, make([]reflect.Type, fobj.NumIn()), make([]reflect.Type, fobj.NumOut()),
   make([]string, fobj.NumIn()), fobj.IsVariadic(), item}
   for i := 0; i <fobj.NumIn(); i++ {
```
Die **ExtFuncInfo**-Struktur hat ein **Auto**-Parameter-Array. Normalerweise ist der erste Parameter `sc *SmartContract` oder `rt *Runtime`, wir können sie nicht von der Sprache Needle übergeben, da sie für uns notwendig sind, um einige Golang-Funktionen auszuführen. Daher legen wir fest, dass diese Variablen automatisch verwendet werden, wenn diese Funktionen aufgerufen werden. In diesem Fall ist der erste Parameter der obigen vier Funktionen `rt *Runtime`.

```
   if isauto, ok := ext.AutoPars[fobj.In(i).String()]; ok {
      data.Auto[i] = isauto
   }
```

Informationen zur Parametrierung.
```
      data.Params[i] = fobj.In(i)
   }
```

Und die Typen der Rückgabewerte.
```
for i := 0; i <fobj.NumOut(); i++ {
   data.Results[i] = fobj.Out(i)
}
```
Fügt eine Funktion zu den **Objekten** des Stammverzeichnisses hinzu, damit der Compiler sie später finden kann, wenn er den Vertrag verwendet.
```
      vm.Objects[key] = &ObjInfo{ObjExtFunc, data}
   }

}
```

## Compiler {#compiler}

Funktionen in der Datei compile.go sind für das Kompilieren des Token-Arrays verantwortlich, das vom lexikalischen Analysator erhalten wird. Die Zusammenstellung kann bedingt in zwei Ebenen unterteilt werden. Auf der obersten Ebene beschäftigen wir uns mit Funktionen, Verträgen, Codeblöcken, Bedingungs- und Schleifenanweisungen, Variablendefinitionen und so weiter. Auf der unteren Ebene kompilieren wir Ausdrücke in Codeblöcke oder Bedingungen in Schleifen und bedingte Anweisungen.

Zunächst beginnen wir mit der einfachen unteren Ebene. In der Funktion **compileEval** können Ausdrücke in Bytecode umgewandelt werden. Da wir eine virtuelle Maschine mit einem Stack verwenden, ist es notwendig, gewöhnliche Infix-Record-Ausdrücke in Postfix-Notation oder umgekehrte polnische Notation umzuwandeln. Zum Beispiel wandeln wir „1+2“ in „12+“ um und legen „1“ und „2“ auf den Stack. Dann wenden wir die Additionsoperation auf die letzten beiden Elemente im Stack an und schreiben das Ergebnis in den Stack. Sie finden diesen [Konvertierungs-](https://master.virmandy.net/perevod-iz-infiksnoy-notatsii-v-postfiksnuyu-obratnaya-polskaya-zapis/) Algorithmus im Internet.

Die globale Variable „opers = map [uint32] operPrior“ enthält die Priorität der Operationen, die für die Konvertierung in die inverse polnische Notation erforderlich sind.

Die folgenden Variablen werden am Anfang der Funktion **compileEval** definiert:
* **Puffer** - temporärer Puffer für Bytecode-Befehle;
* **Bytecode** - letzter Puffer von Bytecode-Befehlen;
* **parcount** - temporärer Puffer, der zum Berechnen von Parametern beim Aufrufen einer Funktion verwendet wird;
* **setIndex** - Variablen im Arbeitsprozess werden auf true gesetzt, wenn wir Map- oder Array-Elemente zuweisen. Beispiel: `a["my"] = 10`. In diesem Fall müssen wir den angegebenen Befehl **cmdSetIndex** verwenden.

Wir erhalten ein Token in einer Schleife und verarbeiten es entsprechend. Beispielsweise wird die Ausdruckstrennung gestoppt, wenn geschweiften Klammern gefunden werden. Beim Verschieben der Zeichenfolge prüfen wir, ob die vorherige Anweisung eine Operation ist und ob sie innerhalb der Klammern steht, andernfalls wird der Ausdruck beendet und analysiert.

```
case isRCurly, isLCurly:
   i--
   if prevLex == isComma || prevLex == lexOper {
      return errEndExp
   }
   break main
case lexNewLine:
   if i > 0 && ((*lexems)[i-1].Type == isComma || (*lexems)[i-1].Type == lexOper) {
      continue main
   }
   for k := len(buffer) - 1; k >= 0; k-- {
   if buffer[k].Cmd == cmdSys {
      continue main
   }
}
break main

```
Im Allgemeinen entspricht der Algorithmus selbst einem Algorithmus zum Umwandeln in die inverse polnische Notation. Unter Berücksichtigung des Aufrufs notwendiger Verträge, Funktionen und Indizes sowie anderer Dinge, die beim Parsing nicht vorkommen, und Optionen zum Parsing von Token vom Typ lexIdent werden dann Variablen, Funktionen oder Verträge mit diesem Namen überprüft. Wenn nichts gefunden wird und es sich nicht um einen Funktions- oder Vertragsaufruf handelt, wird ein Fehler angezeigt.

```
objInfo, tobj := vm.findObj(lexem.Value.(string), block)
if objInfo == nil && (!vm.Extern || i> *ind || i >= len(*lexems)-2 || (*lexems)[i+1].Type != isLPar) {
   return fmt.Errorf(`unknown identifier %s`, lexem.Value.(string))
}
```

Wir können auf eine solche Situation stoßen, und der Vertragsaufruf wird später beschrieben. Wenn in diesem Beispiel keine Funktionen oder Variablen mit demselben Namen gefunden werden, halten wir es für notwendig, einen Vertrag aufzurufen. In dieser kompilierten Sprache gibt es keinen Unterschied zwischen Verträgen und Funktionsaufrufen. Aber wir müssen den Vertrag über die Funktion **ExecContract** aufrufen, die im Bytecode verwendet wird.
```
if objInfo.Type == ObjContract {
   if objInfo.Value != nil {
      objContract = objInfo.Value.(*Block)
   }
   objInfo, tobj = vm.findObj(`ExecContract`, block)
   isContract = true
}
```
Die Anzahl der bisherigen Variablen erfassen wir in `count`, die zusammen mit der Anzahl der Funktionsparameter auch auf den Stack geschrieben werden. Bei jeder weiteren Erkennung von Parametern müssen wir diese Zahl nur am letzten Element des Stapels um eine Einheit erhöhen.


```
count := 0
if (*lexems)[i+2].Type != isRPar {
   count++
}
```
Wir haben eine Liste mit aufgerufenen Parametern für Verträge verwendet, dann müssen wir den Fall markieren, in dem der Vertrag aufgerufen wird. Wenn der Vertrag ohne Parameter aufgerufen wird, müssen wir zwei leere Parameter hinzufügen, um **ExecContract** aufzurufen, um mindestens zwei Parameter zu erhalten.
```
if isContract {
   name := StateName((*block)[0].Info.(uint32), lexem.Value.(string))
   for j := len(*block) - 1; j >= 0; j-- {
   topblock := (*block)[j]
      if topblock.Type == ObjContract {
         if topblock.Info.(*ContractInfo).Used == nil {
            topblock.Info.(*ContractInfo).Used = make(map[string]bool)
         }
         topblock.Info.(*ContractInfo).Used[name] = true
      }
   }
   bytecode = append(bytecode, &ByteCode{cmdPush, name})
   if count == 0 {
      count = 2
      bytecode = append(bytecode, &ByteCode{cmdPush, ""})
      bytecode = append(bytecode, &ByteCode{cmdPush, ""})
   }
   count++
}
```

Wenn wir sehen, dass als nächstes eine eckige Klammer steht, fügen wir den Befehl **cmdIndex** hinzu, um den Wert durch den Index zu erhalten.
```
if (*lexems)[i+1].Type == isLBrack {
   if objInfo == nil || objInfo.Type != ObjVar {
      return fmt.Errorf(`unknown variable %s`, lexem.Value.(string))
   }
   buffer = append(buffer, &ByteCode{cmdIndex, 0})
}
```
Die Funktion **CompileBlock** kann Objektbäume und ausdrucksunabhängige Bytecodes generieren. Der Kompilierungsprozess basiert auf einer endlichen Zustandsmaschine, genau wie ein lexikalischer Analysator, aber mit den folgenden Unterschieden. Erstens verwenden wir keine Symbole, sondern Tokens; zweitens werden wir gleich die *states*-Variablen in allen Zuständen und Übergängen beschreiben. Es stellt ein Array von Objekten dar, die nach Tokentyp indiziert sind. Jedes Token hat eine Struktur von *compileState*, und ein neuer Status wird in *NewState* angegeben. Wenn klar ist, welche Struktur wir aufgelöst haben, können wir die Funktion des Handlers im Feld *Func* angeben.

Betrachten wir den Hauptzustand als Beispiel.

Wenn wir auf einen Zeilenumbruch oder einen Kommentar stoßen, bleiben wir im selben Zustand. Wenn wir auf das Schlüsselwort **contract** stoßen, ändern wir den Status in *stateContract* und beginnen mit dem Parsen der Struktur. Wenn wir auf das Schlüsselwort **func** stoßen, ändern wir den Status in *stateFunc*. Wenn andere Token empfangen werden, wird die Funktion, die einen Fehler generiert, aufgerufen.

```
{// stateRoot
   lexNewLine: {stateRoot, 0},
   lexKeyword | (keyContract << 8): {stateContract | statePush, 0},
   lexKeyword | (keyFunc << 8): {stateFunc | statePush, 0},
   lexComment: {stateRoot, 0},
   0: {errUnknownCmd, cfError},
},
```
Angenommen, wir sind auf das Schlüsselwort **func** gestoßen und haben den Status in *stateFunc* geändert. Da der Funktionsname auf das Schlüsselwort **func** folgen muss, behalten wir denselben Zustand bei, wenn wir den Funktionsnamen ändern. Für alle anderen Token werden wir entsprechende Fehler generieren. Wenn wir den Funktionsnamen in der Token-ID erhalten, gehen wir zum *stateFParams*-Zustand, wo wir die Parameter der Funktion erhalten können.
```
{// stateFunc
   lexNewLine: {stateFunc, 0},
   lexIdent: {stateFParams, cfNameBlock},
   0: {errMustName, cfError},
},
```
Gleichzeitig mit den obigen Operationen rufen wir die Funktion **fNameBlock** auf. Es sollte beachtet werden, dass die Blockstruktur mit der statePush-Markierung erstellt wird, wo wir sie aus dem Puffer holen und mit den Daten füllen, die wir benötigen. Die **fNameBlock**-Funktion eignet sich für Verträge und Funktionen (einschließlich der darin verschachtelten). Er füllt das *Info*-Feld mit der entsprechenden Struktur und schreibt sich in die *Objects* des übergeordneten Blocks. Auf diese Weise können wir die Funktion oder den Vertrag mit dem angegebenen Namen aufrufen. Ebenso erstellen wir entsprechende Funktionen für alle Zustände und Variablen. Diese Funktionen sind normalerweise sehr klein und führen einige Aufgaben beim Erstellen des Baums der virtuellen Maschine aus.
```
func fNameBlock(buf *[]*Block, state int, lexem *Lexem) error {
   var itype int
   prev := (*buf)[len(*buf)-2]
   fblock := (*buf)[len(*buf)-1]
   name := lexem.Value.(string)
   switch state {
      case stateBlock:
         itype = ObjContract
         name = StateName((*buf)[0].Info.(uint32), name)
         fblock.Info = &ContractInfo{ID: uint32(len(prev.Children) - 1), Name: name,
         Owner: (*buf)[0].Owner}
      default:
         itype = ObjFunc
         fblock.Info = &FuncInfo{}
   }
   fblock.Type = itype
   prev.Objects[name] = &ObjInfo{Type: itype, Value: fblock}
   return nil
}
```
Für die Funktion **CompileBlock** durchläuft sie einfach alle Tokens und wechselt die Zustände gemäß den in den Zuständen beschriebenen Tokens. Fast alle zusätzlichen Token entsprechen zusätzlichen Programmcodes.

* **statePush** – fügt das Objekt **Block** zum Objektbaum hinzu;
* **statePop** - wird verwendet, wenn der Block mit einer schließenden geschweiften Klammer endet;
* **stateStay** - Sie müssen die aktuelle Markierung beibehalten, wenn Sie in einen neuen Status wechseln;
* **stateToBlock** - Übergang in den Zustand **stateBlock** zur Verarbeitung von *while* und *if*. Nach der Verarbeitung von Ausdrücken müssen Sie Blöcke innerhalb der geschweiften Klammern verarbeiten;
* **stateToBody** - Übergang in den Zustand **stateBody**;
* **stateFork** - speichert die markierte Position. Wenn der Ausdruck mit einem Bezeichner oder einem Namen mit `$` beginnt, können wir Funktionsaufrufe oder Zuweisungen vornehmen;
* **stateToFork** – wird verwendet, um das in **stateFork** gespeicherte Token abzurufen, das an die Prozessfunktion übergeben wird;
* **stateLabel** – wird zum Einfügen von **cmdLabel**-Befehlen verwendet. *während* die Struktur dieses Flag erfordert;
* **stateMustEval** – prüft die Verfügbarkeit von bedingten Ausdrücken am Anfang von *if*- und *while*-Strukturen.

Neben der Funktion **CompileBlock** ist auch die Funktion **FlushBlock** zu nennen. Das Problem besteht jedoch darin, dass der Blockbaum unabhängig von vorhandenen virtuellen Maschinen erstellt wird. Genauer gesagt erhalten wir Informationen über Funktionen und Verträge, die in einer virtuellen Maschine vorhanden sind, aber wir sammeln die kompilierten Blöcke in einem separaten Baum. Andernfalls, wenn während der Kompilierung ein Fehler auftritt, müssen wir die virtuelle Maschine auf den vorherigen Zustand zurücksetzen. Daher gehen wir separat zum Kompilierungsbaum, aber nachdem die Kompilierung erfolgreich ist, muss die Funktion **FlushContract** aufgerufen werden. Diese Funktion fügt den fertigen Blockbaum zur aktuellen virtuellen Maschine hinzu. Die Kompilierungsphase ist nun abgeschlossen.

## Lexikalischer Analysator {#lexical-analyzer}
Der lexikalische Analysator verarbeitet eingehende Zeichenfolgen und bildet eine Folge von Token der folgenden Typen:
* **lexSys** - Systemtoken, zum Beispiel: `{}, [], (), ,, .` usw.;
* **lexOper** - Vorgangstoken, zum Beispiel: `+, -, /, \, *`;
* **lexNumber** - Zahl;
* **lexident** - Kennung;
* **lexNewline** - Zeilenumbruchzeichen;
* **lexString** - Zeichenkette;
* **lexComment** - Kommentar;
* **lexKeyword** - Schlüsselwort;
* **lexType** - Typ;
* **lexExtend** - Verweis auf externe Variablen oder Funktionen, zum Beispiel: `$myname`.

In der aktuellen Version wird zunächst mit Hilfe der Datei [script/lextable/lextable.go](#lextablelextablego) eine Konvertierungstabelle (finite state machine) zum Parsen der Tokens aufgebaut, die in die Datei lex_table.go geschrieben wird. Im Allgemeinen können Sie die ursprünglich von der Datei generierte Konvertierungstabelle loswerden und direkt beim Start eine Konvertierungstabelle im Speicher erstellen (`init()`). Die lexikalische Analyse selbst findet in der lexParser-Funktion in der Datei [lex.go](#lex-go) statt.

### lextable/lextable.go {#lextable-lextable-go}

Hier definieren wir das zu betreibende Alphabet und beschreiben, wie die endliche Zustandsmaschine basierend auf dem nächsten empfangenen Symbol von einem Zustand in einen anderen wechselt.

*states* ist ein JSON-Objekt, das eine Liste von Zuständen enthält.
Mit Ausnahme bestimmter Symbole steht „d“ für alle Symbole, die nicht im Staat angegeben sind.
„n“ steht für 0x0a, „s“ steht für Leerzeichen, „q“ steht für Backquote, „Q“ steht für doppeltes Anführungszeichen, „r“ steht für Zeichen >= 128, „a“ steht für AZ und az und „ 1` steht für 1-9.

Die Namen dieser Zustände sind Schlüssel, und die möglichen Werte sind im Wertobjekt aufgelistet. Dann gibt es einen neuen Zustand, um Übergänge für jede Gruppe vorzunehmen. Dann gibt es noch den Namen des Tokens. Wenn wir zum Anfangszustand zurückkehren müssen, ist der dritte Parameter das Service-Token, das angibt, wie mit dem aktuellen Symbol umgegangen werden soll.

Zum Beispiel haben wir den Hauptzustand und die eingehenden Zeichen `/`, `"/": ["solidus", "", "push next"]`,

* **push** - gibt den Befehl, sich daran zu erinnern, dass es sich in einem separaten Stack befindet ;
* **nächster** - geht zum nächsten Zeichen, und gleichzeitig ändern wir den Status auf **solidus**. Ruft danach das nächste Zeichen ab und überprüft den Status von **solidus**.

Wenn das nächste Zeichen `/` oder `/*` hat, gehen wir zum Kommentarstatus **Kommentar**, weil sie mit `//` oder `/*` beginnen. Offensichtlich hat jeder Kommentar danach einen anderen Zustand, weil sie mit einem anderen Symbol enden.

Wenn das nächste Zeichen nicht `/` und `*` ist, dann zeichnen wir alles im Stack als Tags vom Typ **lexOper** auf, leeren den Stack und kehren zum Hauptzustand zurück.
Das folgende Modul konvertiert den Zustandsbaum in ein numerisches Array und schreibt es in die Datei *lex_table.go*.

In der ersten Schleife:

Wir bilden ein Alphabet gültiger Symbole.

```
for ind, ch := range alphabet {
   i := byte(ind)
```
Darüber hinaus versehen wir in **state2int** jeden Zustand mit einer eigenen Sequenzkennung.

```
   state2int := map[string]uint{`main`: 0}
   if err := json.Unmarshal([]byte(states), &data); err == nil {
   for key := range data {
   if key != `main` {
   state2int[key] = uint(len(state2int))
```
Wenn wir alle Zustände und jede Menge in einem Zustand und jedes Symbol in einer Menge durchlaufen, schreiben wir eine Drei-Byte-Zahl [neue Zustandskennung (0 = Haupt)] + [Tokentyp (0-kein Token)] + [Token] .
Die Zweidimensionalität des Arrays *table* besteht darin, dass es in Zustände und 34 Eingabesymbole aus dem Array *alphabet* unterteilt ist, die in derselben Reihenfolge angeordnet sind.
Wir befinden uns im *Hauptzustand* in der Nullzeile der *Tabelle*. Nehmen Sie das erste Zeichen, finden Sie seinen Index im Array *alphabet* und erhalten Sie den Wert aus der Spalte mit dem angegebenen Index. Ausgehend vom empfangenen Wert erhalten wir den Token im Low-Byte. Wenn die Analyse abgeschlossen ist, zeigt das zweite Byte den Typ des empfangenen Tokens an. Im dritten Byte erhalten wir den Index des nächsten neuen Zustands.
All dies wird ausführlicher in der Funktion **lexParser** in *lex.go* beschrieben.
Wenn Sie einige neue Zeichen hinzufügen möchten, müssen Sie sie dem Array *alphabet* hinzufügen und die Menge der Konstante *AlphaSize* erhöhen. Wenn Sie eine neue Symbolkombination hinzufügen möchten, sollte diese ähnlich wie bei den bestehenden Optionen im Status beschrieben werden. Führen Sie nach dem obigen Vorgang die Datei *lextable.go* aus, um die Datei *lex_table.go* zu aktualisieren.

### lex.go {#lex-go}
Die **lexParser**-Funktion generiert direkt eine lexikalische Analyse und gibt basierend auf eingehenden Zeichenfolgen ein Array empfangener Tags zurück. Lassen Sie uns die Struktur von Token analysieren.

```
type Lexem struct {
   Type  uint32 // Type of the lexem
   Value interface{} // Value of lexem
   Line  uint32 // Line of the lexem
   Column uint32 // Position inside the line
}
```
* **Type** - Token-Typ. Es hat einen der folgenden Werte: `lexSys, lexOper, lexNumber, lexIdent, lexString, lexComment, lexKeyword, lexType, lexExtend`;
* **Value** – Wert des Tokens. Die Art des Werts hängt vom Token-Typ ab. Lassen Sie uns das genauer analysieren:
   * **lexSys** - enthält Klammern, Kommas usw. In diesem Fall `Type = ch << 8 | lexSys“, beziehen Sie sich bitte auf die Konstante „isLPar ... isRBrack“, und ihr Wert ist uint32 Bits;
   * **lexOper** - der Wert stellt eine äquivalente Zeichenfolge in Form von uint32 dar. Siehe die `isNot ... isOr`-Konstanten;
   * **lexNumber** - Zahlen werden als int64 oder float64 gespeichert. Wenn die Zahl einen Dezimalpunkt hat, ist sie Float64;
   * **lexIdent** - Identifikatoren werden als String gespeichert;
   * **lexNewLine** - Zeilenumbruchzeichen. Wird auch zur Berechnung der Reihen- und Tokenposition verwendet;
   * **lexString** - Zeilen werden als String gespeichert;
   * **lexComment** - Kommentare werden als String gespeichert;
   * **lexKeyword** - für Schlüsselwörter werden nur die entsprechenden Indizes gespeichert, siehe `keyContract ... keyTail`-Konstante. In diesem Fall `Type = KeyID << 8 | lexKeyword`. Außerdem ist zu beachten, dass die Schlüsselwörter „true, false, nil“ sofort in Token vom Typ „lexNumber“ umgewandelt und die entsprechenden Typen „bool“ und „interface {}“ verwendet werden;
   * **lexType** – dieser Wert enthält den entsprechenden „reflect.Type“-Typwert;
   * **lexExtend** – Bezeichner, die mit einem `$` beginnen. Diese Variablen und Funktionen werden von außen übergeben und sind daher speziellen Arten von Token zugeordnet. Dieser Wert enthält den Namen als String ohne $ am Anfang.
* **Line** - die Zeile, in der das Token gefunden wird;
* **Column** - Inline-Position des Tokens.
Lassen Sie uns die Funktion **lexParser** im Detail analysieren. Die **todo**-Funktion schlägt den Symbolindex im Alphabet basierend auf dem aktuellen Status und dem eingehenden Symbol nach und erhält einen neuen Status, Token-Identifikator (falls vorhanden) und andere Token aus der Umwandlungstabelle. Das Parsing selbst beinhaltet das Aufrufen der **todo**-Funktion der Reihe nach für jedes nächste Zeichen und das Wechseln in einen neuen Zustand. Sobald das Tag empfangen wurde, erstellen wir das entsprechende Token in den Ausgabekriterien und setzen den Parsing-Prozess fort. Es sollte beachtet werden, dass wir während des Parsing-Prozesses die Token-Symbole nicht in einem separaten Stack oder Array akkumulieren, weil wir nur den Offset des Starts des Tokens speichern. Nachdem wir das Token erhalten haben, verschieben wir den Offset des nächsten Tokens an die aktuelle Parsing-Position.

Es bleibt nur noch, die beim Parsing verwendeten lexikalischen Status-Token zu überprüfen:
* **lexfPush** - dieses Token bedeutet, dass wir beginnen, Symbole in einem neuen Token zu sammeln;
* **lexfNext** - das Zeichen muss dem aktuellen Token hinzugefügt werden;
* **lexfPop** - Der Empfang des Tokens ist abgeschlossen. Normalerweise haben wir mit diesem Flag den Bezeichnertyp des geparsten Tokens;
* **lexfSkip** - Dieses Token wird verwendet, um Zeichen vom Parsen auszuschließen. Beispielsweise sind die Kontrollschrägstriche in der Zeichenfolge \n \r \". Sie werden während der lexikalischen Analysephase automatisch ersetzt.

## Needle Sprache {#needle-language}
### Lexemes {#lexemes}
Der Quellcode eines Programms muss in UTF-8-Kodierung vorliegen.

Die folgenden lexikalischen Typen werden verarbeitet:

* **Schlüsselwörter** - ```action, break, conditions, Continue, Contract, data, else, error, false, func, If, info, nil, return, settings, true, var, warning, while``` ;
* **Zahl** - nur Dezimalzahlen werden akzeptiert. Es gibt zwei Grundtypen: **int** und **float**. Wenn die Zahl einen Dezimalpunkt hat, wird sie zu einem Float **float**. Der Typ **int** entspricht in Golang **int64**, während der Typ **float** in Golang **float64** entspricht.
* **String** - Der String kann in doppelte Anführungszeichen ```("ein String")``` oder Backquotes ```(\`ein String\`)``` eingeschlossen werden. Beide Arten von Zeichenfolgen können Zeilenumbruchzeichen enthalten. Zeichenfolgen in doppelten Anführungszeichen können doppelte Anführungszeichen, Zeilenumbruchzeichen und mit Schrägstrichen maskierte Wagenrückläufe enthalten. Beispiel: ```"Dies ist eine \"erste Zeichenfolge\".\r\nDies ist eine zweite Zeichenfolge."```.
* **Kommentar** - Es gibt zwei Arten von Kommentaren. Einzeilige Kommentare verwenden zwei Schrägstriche (//). Beispiel: // Dies ist ein einzeiliger Kommentar. Mehrzeilige Kommentare verwenden Schrägstriche und Sternchen und können sich über mehrere Zeilen erstrecken. Beispiel: ```/* Dies ist ein mehrzeiliger Kommentar */```.
* **Bezeichner** - die Namen von Variablen und Funktionen, die aus Buchstaben a-z und A-Z, UTF-8-Symbolen, Zahlen und Unterstrichen bestehen. Der Name kann mit einem Buchstaben, Unterstrich, ```@``` oder ```$``` beginnen. Der Name, der mit ```$``` beginnt, ist der Name der Variablen, die im **Datenabschnitt** definiert ist. Der mit ```$``` beginnende Name kann auch verwendet werden, um globale Variablen im Bereich von **Bedingungen** und **Aktionsabschnitten** zu definieren. Ökosystemverträge können über das Symbol ```@``` aufgerufen werden. Zum Beispiel: ```@1NewTable(...)```.

### Typen {#types}

Neben den Nadeltypen sind entsprechende Golang-Typen angegeben.
* **bool** - bool, standardmäßig **false**;
* **bytes** - []byte{}, standardmäßig ein leeres Byte-Array;
* **int** - standardmäßig int64, **0**;
* **address** - uint64, standardmäßig **0**;
* **array** - []interface{}, standardmäßig ein leeres Array;
* **map** - map[string]interface{}, standardmäßig ein leeres Objekt-Array;
* **money** - Dezimalzahl. Dezimal, standardmäßig **0**;
* **float** - float64, standardmäßig **0**;
* **string** - String, standardmäßig ein leerer String;
* **file** - map[string]interface{}, standardmäßig ein leeres Objekt-Array.
Diese Variablentypen werden mit dem Schlüsselwort ```var``` definiert. Beispiel: ```var var1, var2 int```. Bei dieser Definition wird einer Variablen ein Standardwert nach Typ zugewiesen.

Alle Variablenwerte sind vom Typ interface{} und werden dann den erforderlichen Golang-Typen zugewiesen. Daher sind beispielsweise Array- und Map-Typen Golang-Typen []interface{} und map[string]interface{}. Beide Arten von Arrays können Elemente beliebigen Typs enthalten.

### Ausdrücke {#expressions}

Ein Ausdruck kann arithmetische Operationen, logische Operationen und Funktionsaufrufe enthalten. Alle Ausdrücke werden von links nach rechts nach Priorität der Operatoren ausgewertet. Bei gleicher Priorität werden Operatoren von links nach rechts ausgewertet.

Priorität der Operationen von hoch nach niedrig:
* **Funktionsaufruf und Klammern** - Beim Aufruf einer Funktion werden übergebene Parameter von links nach rechts berechnet;
* **Unäre Operation** - logische Negation ```!``` und arithmetischer Vorzeichenwechsel ```-```;
* **Multiplikation und Division** - arithmetische Multiplikation ```*``` und Division ```/```;
* **Addition und Subtraktion** - arithmetische Addition ```+``` und Subtraktion ```-```;
* **Logischer Vergleich** - ```>=>> >=```;
* **Logische Gleichheit und Ungleichheit** - ```== !=```;
* **Logisches UND** - ```&&```;
* **Logisches ODER** - ```||```.

Bei der Auswertung von logischem AND und OR werden in jedem Fall beide Seiten des Ausdrucks ausgewertet.

Needle hat keine Typprüfung während der Kompilierung. Beim Auswerten von Operanden wird versucht, den Typ in einen komplexeren Typ umzuwandeln. Die Art der Komplexitätsreihenfolge kann wie folgt sein: ```string, int, float, money```. Nur ein Teil der Typkonvertierungen ist implementiert. Der Zeichenfolgentyp unterstützt Additionsoperationen, und das Ergebnis ist eine Zeichenfolgenverkettung. Beispiel: ```string + string = string, money-int = money, int * float = float```.

Bei Funktionen wird während der Ausführung eine Typprüfung für die Typen ```string``` und ```int``` durchgeführt.
Die Typen **array** und **map** können per Index adressiert werden. Beim Typ **array** muss als Index der Wert **int** angegeben werden. Für den Typ **Map** muss eine Variable oder ein **String**-Wert angegeben werden. Wenn Sie einem **Array**-Element einen Wert zuweisen, dessen Index größer als der aktuelle maximale Index ist, wird dem Array ein leeres Element hinzugefügt. Der Anfangswert dieser Elemente ist **nil**. Zum Beispiel: .. Code:
```
var my array
my[5] = 0
var mymap map
mymap["index"] = my[3]
```
In Ausdrücken mit bedingten logischen Werten (z. B. `if, while, &&, ||, !`) wird der Typ automatisch in einen logischen Wert konvertiert. Wenn der Typ nicht der Standardwert ist, ist er wahr.
```
var mymap map
var val string
if mymap && val {
...
}
```
### Zielfernrohr {#scope}

Klammern geben einen Block an, der lokale Bereichsvariablen enthalten kann. Standardmäßig erstreckt sich der Geltungsbereich einer Variablen auf ihre eigenen Blöcke und alle verschachtelten Blöcke. In einem Block können Sie eine neue Variable mit dem Namen einer vorhandenen Variablen definieren. In diesem Fall sind jedoch externe Variablen mit demselben Namen nicht mehr verfügbar.
```
var a int
a = 3
{
   var a int
   a = 4
   Println(a) // 4
}
Println(a) // 3
```
### Vertragsabwicklung {#contract-execution}

Beim Aufruf eines Contracts müssen ihm in **data** definierte Parameter übergeben werden. Vor Ausführung eines Auftrags erhält die virtuelle Maschine diese Parameter und weist sie den entsprechenden Variablen ($Param) zu. Dann werden die vordefinierten Funktionen **conditions** und **action** aufgerufen.

Fehler, die während der Vertragsausführung auftreten, können in zwei Arten unterteilt werden: Formularfehler und Umgebungsfehler. Formularfehler werden mit speziellen Befehlen generiert: `error, warning, info` und wenn die eingebaute Funktion `err` ungleich *nil* zurückgibt.

Die Needle-Sprache behandelt keine Ausnahmen. Jeder Fehler wird die Ausführung von Verträgen beenden. Da ein separater Stack und eine separate Struktur zum Speichern von Variablenwerten erstellt werden, wenn ein Vertrag ausgeführt wird, löscht der Golang-Garbage-Collection-Mechanismus diese Daten automatisch, wenn ein Vertrag ausgeführt wird.

### Backus–Naur Form (BNF) {#backus-naur-form-bnf}
In der Informatik ist BNF eine Notationstechnik für kontextfreie Syntax und wird normalerweise verwendet, um die Syntax der beim Rechnen verwendeten Sprache zu beschreiben.

* &lt;decimal digit&gt;
```
'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
```

* &lt;decimal number&gt;
```
<decimal digit> {<decimal digit>}
```

* &lt;symbol code&gt;
```
'''<any symbol>'''
```

* &lt;real number&gt;
```
['-'] <decimal number'.'[<decimal number>]
```

* &lt;integer number&gt;
```
['-'] <decimal number> | <symbol code>
```

* &lt;number&gt;
```
'<integer number> | <real number>'
```

* &lt;letter&gt;
```
'A' |'B' | ... |'Z' |'a' |'b' | ... |'z' | 0x80 | 0x81 | ... | 0xFF
```

* &lt;space&gt;
```
'0x20'
```

* &lt;tabulation&gt;
```
'0x09'
```

* &lt;newline&gt;
```
'0x0D 0x0A'
```

* &lt;special symbol&gt;
```
'!' |'"' |'$' |''' |'(' |')' |'\*' |'+' |',' |'-' |'.' |'/ '|'<' |'=' |'>' |'[' |'\\' |']' |'_' |'|' |'}' | '{' | <tabulation> | <space> | <newline>
```

* &lt;symbol&gt;
```
<decimal digit> | <letter> | <special symbol>
```

* &lt;name&gt;
```
(<letter> |'_') {<letter> |'_' | <decimal digit>}
```

* &lt;function name&gt;
```
<name>
```

* &lt;variable name&gt;
```
<name>
```

* &lt;type name&gt;
```
<name>
```

* &lt;string symbol&gt;
```
<tabulation> | <space> |'!' |'#' | ... |'[' |']' | ...
```

* &lt;string element&gt;
```
{<string symbol> |'\"' |'\n' |'\r'}
```

* &lt;string&gt;
```
'"' {<string element>}'"' |'\`' {<string element>}'\`'
```

* &lt;assignment operator&gt;
```
'='
```

* &lt;unary operator&gt;
```
'-'
```

* &lt;binary operator&gt;
```
'==' |'!=' |'>' |'<' |'<=' |'>=' |'&&' |'||' |'\*' |'/' |'+ '|'-'
```

* &lt;operator&gt;
```
<assignment operator> | <unary operator> | <binary operator>
```

* &lt;parameters&gt;
```
<expression> {','<expression>}
```

* &lt;contract call&gt;
```
<contract name>'(' [<parameters>]')'
```

* &lt;function call&gt;
```
<contract call> [{'.' <name>'(' [<parameters>]')'}]
```

* &lt;block contents&gt;
```
<block command> {<newline><block command>}
```

* &lt;block&gt;
```
'{'<block contents>'}'
```

* &lt;block command&gt;
```
(<block> | <expression> | <variables definition> | <if> | <while> | break | continue | return)
```

* &lt;if&gt;
```
'if <expression><block> [else <block>]'
```

* &lt;while&gt;
```
'while <expression><block>'
```

* &lt;contract&gt;
```
'contract <name> '{'[<data section>] {<function>} [<conditions>] [<action>]'}''
```

* &lt;data section&gt;
```
'data '{' {<data parameter><newline>} '}''
```

* &lt;data parameter&gt;
```
<variable name> <type name>'"'{<tag>}'"'
```

* &lt;tag&gt;
```
'optional | image | file | hidden | text | polymap | map | address | signature:<name>'
```

* &lt;conditions&gt;
```
'conditions <block>'
```

* &lt;action&gt;
```
'action <block>'
```

* &lt;function&gt;
```
'func <function name>'('[<variable description>{','<variable description>}]')'[{<tail>}] [<type name>] <block>'
```

* &lt;variable description&gt;
```
<variable name> {',' <variable name>} <type name>
```

* &lt;tail&gt;
```
'.'<function name>'('[<variable description>{','<variable description>}]')'
```

* &lt;variables definition&gt;
```
'var <variable description>{','<variable description>}'
```


