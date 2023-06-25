# コンパイラと仮想マシン（Virtual Machine）  {#compiler-and-virtual-machine}

- [ソースコードの保存とコンパイル](#source-code-storage-and-compilation)
- [仮想マシンの構造](#virtual-machine-structures)
  - [VMの構造](#vm-structure)
  - [ブロックの構造](#block-structure)
  - [ObjInfoの構造](#objinfo-structure)
    - [ContractInfoの構造](#contractinfo-structure)
    - [FieldInfoの構造](#fieldinfo-structure)
    - [FuncInfoの構造](#funcinfo-structure)
    - [FuncNameの構造](#funcname-structure)
    - [ExtFuncInfoの構造](#extfuncinfo-structure)
    - [VarInfoの構造](#varinfo-structure)
    - [ObjExtendの値](#objextend-value)
- [仮想マシンのコマンド](#virtual-machine-commands)
  - [ByteCodeの構造](#bytecode-structure)
  - [コマンド識別子](#command-identifiers)
  - [スタック操作コマンド](#stack-operation-commands)
  - [ランタイムの構造](#runtime-structure)
    - [blockStackの構造](#blockstack-structure)
  - [RunCode関数](#runcode-function)
  - [仮想マシンの他の操作用関数](#other-functions-for-operations-with-vm)
- [コンパイラ](#compiler)
- [字句解析器](#lexical-analyzer)
  - [lextable/lextable.go](#lextable-lextable-go)
  - [lex.go](#lex-go)
- [Needle言語](#needle-language)
  - [字句](#lexemes)
  - [型](#types)
  - [式](#expressions)
  - [スコープ](#scope)
  - [コントラクトの実行](#contract-execution)
  - [バッカス・ナウア形式（BNF）](#backus-naur-form-bnf)

このセクションでは、仮想マシン (VM) でのプログラムのコンパイルと Needle 言語の操作について説明します。

## ソースコードの保存とコンパイル {#source-code-storage-and-compilation}

コントラクトと関数はGolangで書かれ、エコシステムのコントラクトテーブルに保存されます。

コントラクトが実行されると、そのソースコードはデータベースから読み取られ、バイトコードにコンパイルされます。

コントラクトが変更されると、そのソースコードが更新され、データベースに保存されます。そして、ソースコードはコンパイルされ、対応する仮想マシンのバイトコードが更新されます。

バイトコードは物理的に保存されないため、プログラムが再実行されると再度コンパイルされます。

各エコシステムのコントラクトテーブルに記述されたソースコードは、厳密な順序で仮想マシンにコンパイルされ、すべてのノードで仮想マシンの状態が同じです。

コントラクトが呼び出されると、仮想マシンは状態を変更しません。任意のコントラクトの実行または関数の呼び出しは、外部呼び出し時に作成される個別の実行スタック上で行われます。

各エコシステムには、仮想エコシステムと呼ばれるものが存在することがあります。これはブロックチェーンの外部テーブルと組み合わせてノード内で使用され、ブロックチェーンや他の仮想エコシステムに直接的な影響を与えません。この場合、仮想エコシステムをホストするノードは、独自のコントラクトをコンパイルし、独自の仮想マシンを作成します。

## 仮想マシンの構造 {#virtual-machine-structures}

### VMの構造 {#vm-structure}

仮想マシンは、以下のような構造でメモリに組織化されます。

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

仮想マシンの構造は以下の要素を持っています：

* Block - [ブロックの構造](#ブロックの構造)を含む
* ExtCost - 外部のGolang関数の実行コストを返す関数
* FuncCallsDB - Golang関数名のコレクション。この関数は実行コストを最初のパラメータとして返します。これらの関数はEXPLAINを使用してデータベース処理のコストを計算します
* Extern - コントラクトが外部コントラクトであるかを示すブールフラグ。VMが作成されるとtrueに設定されます。コードがコンパイルされる際に呼び出されるコントラクトは表示されません。つまり、将来決まるコントラクトコードを呼び出すことができます
* ShiftContract - VM内の最初のコントラクトのID
* logger - VMのエラーログの出力

### ブロックの構造 {#block-structure}

仮想マシンは、**Block型**オブジェクトから構成されるツリーです。

ブロックは、いくつかのバイトコードを含む独立したユニットです。言語で中括弧(`{}`)内に記述するものすべてがブロックです。

例えば、以下のコードは関数を含むブロックを作成します。このブロックには、if文を含む別のブロックがあり、その中にはwhile文を含むさらなるブロックがあります。

```
func my() {
   if true {
      while false {
      ...
      }
   }
}
```

ブロックは以下のような構造でメモリに組織化されます。

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

ブロックの構造は以下の要素から成り立ちます:

* **Objects** - [ObjInfo](#ObjInfoの構造)というポインタ型の内部オブジェクトのマップです。例えば、ブロック内に変数がある場合は、その変数の情報を名前で取得することができます。
* **Type** - ブロックのタイプです。関数ブロックの場合は**ObjFunc**、コントラクトブロックの場合は**ObjContract**です。
* **Owner** - **OwnerInfo**というポインタ型の構造体です。この構造体には、コンパイルされたコントラクトの所有者に関する情報が含まれています。所有者情報はコンパイル時に指定されるか、**contracts**テーブルから取得されます。
* **Info** - ブロックタイプに依存するオブジェクトに関する情報が含まれています。
* **Parent** - 親ブロックへのポインタです。
* **Vars** - 現在のブロック変数の型を含む配列です。
* **Code** - ブロック自体のバイトコードです。制御権がブロックに渡された場合に実行される部分です。例えば、関数呼び出しやループの本体などが該当します。
* **Children** - サブブロックを含む配列です。関数のネストやループ、条件演算子などがサブブロックとして扱われます。

### ObjInfoの構造 {#objinfo-structure}

ObjInfoの構造は、内部オブジェクトに関する情報を含んでいます。

```
type ObjInfo struct {
   Type int
   Value interface{}
}
```



ObjInfoの構造は以下の要素から成り立ちます:

* **Type** - オブジェクトのタイプであり、以下のいずれかの値を持ちます:
  * **ObjContract** - [contractInfo](#ContractInfoの構造)
  * **ObjFunc** - 関数
  * **ObjExtFunc** - 外部のGolang関数
  * **ObjVar** - 変数
  * **ObjExtend** - $name変数
* **Value** - 各タイプの構造体が含まれています

#### ContractInfoの構造 {#contractinfo-structure}

**ObjContract**タイプを指し示し、**Value**フィールドには**ContractInfo**構造体が含まれています。

```
type ContractInfo struct {
   ID uint32
   Name string
   Owner *OwnerInfo
   Used map[string]bool
   Tx *[]*FieldInfo
}
```

ContractInfoの構造は以下の要素を持っています:

* **ID** - コントラクトのID。コントラクトを呼び出す際にブロックチェーンに表示されます。
* **Name** - コントラクトの名前。
* **Owner** - コントラクトに関するその他の情報。
* **Used** - 呼び出されたコントラクトの名前のマップ。
* **Tx** - コントラクトの[data section](script.md#データセクション)に記述されたデータ配列。

#### FieldInfoの構造 {#fieldinfo-structure}

**FieldInfo**構造体は**ContractInfo**構造体で使用され、コントラクトの[data section](script.md#データセクション)内の要素を説明します。

```
type FieldInfo struct {
   Name string
   Type reflect.Type
   Original uint32
   Tags string
}
```

FieldInfoの構造は以下の要素を持っています:

* **Name** - フィールド名
* **Type** - フィールドの型
* **Original** - オプションのフィールド
* **Tags** - このフィールドに対する追加のラベル

#### FuncInfoの構造 {#funcinfo-structure}

ObjFunc タイプを指しており、Value フィールドには FuncInfo 構造体が含まれています。

```
type FuncInfo struct {
   Params []reflect.Type
   Results []reflect.Type
   Names *map[string]FuncName
   Variadic bool
   ID uint32
}
```

FuncInfoの構造は以下の要素を持っています:

* **Params** - パラメータの型の配列
* **Results** - 戻り値の型の配列
* **Names** - テール関数のためのデータのマップ。例えば、`DBFind().Columns()`のような場合です。
* **Variadic** - 関数が可変長のパラメータを持つ場合はtrue
* **ID** - 関数のID

#### FuncNameの構造 {#funcname-structure}

FuncName 構造体は FuncInfo に使用され、tail 関数のデータを記述します。

```
type FuncName struct {
   Params []reflect.Type
   Offset []int
   Variadic bool
}
```

FuncNameの構造は以下の要素を持っています:

* **Params** - パラメータの型の配列
* **Offset** - 変数のオフセットの配列。実際には、関数内のすべてのパラメータの値をドット「.」で初期化することができます。
* **Variadic** - テール関数が可変長のパラメータを持つ場合はtrue

#### ExtFuncInfoの構造 {#extfuncinfo-structure}

ObjExtFuncタイプを指し示し、ValueフィールドにはExtFuncInfoの構造が含まれています。これはGolang関数を説明するために使用されます。

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

ExtFuncInfoの構造は以下の要素を持っています:

* **Name**、**Params**、**Results**のパラメータは[FuncInfo](#funcinfo-structure)と同じ構造を持ちます。
* **Auto** - 変数の配列。存在する場合、関数に追加のパラメータとして渡されます。例えば、SmartContract型の変数scです。
* **Func** - Golang関数

#### VarInfoの構造 {#varinfo-structure}

**ObjVar**タイプを指し示し、**Value**フィールドには**VarInfo**の構造が含まれています。

```
type VarInfo struct {
   Obj *ObjInfo
   Owner *Block
}
```

VarInfoの構造は以下の要素を持っています:

* **Obj** - 変数の型と値に関する情報
* **Owner** - オーナーブロックへのポインタ

#### ObjExtendの値 {#objextend-value}

**ObjExtend**タイプを指し示し、**Value**フィールドには変数や関数の名前を含む文字列が含まれています。

## 仮想マシンのコマンド {#virtual-machine-commands}

### ByteCodeの構造 {#bytecode-structure}

バイトコードは、**ByteCode**タイプの構造体のシーケンスです。

```
type ByteCode struct {
   Cmd uint16
   Value interface{}
}
```

この構造体は以下のフィールドを持っています:

* **Cmd** - ストレージコマンドの識別子です。
* **Value** - オペランド（値）が含まれています。

一般的に、コマンドはスタックのトップ要素に対して操作を行い、必要に応じて結果値を書き込みます。

### コマンド識別子 {#command-identifiers}

仮想マシンのコマンドの識別子は、vm/cmds_list.goファイルに記述されています。

* **cmdPush** - [Value] フィールドから値をスタックに格納します。例えば、数値や文字列をスタックに格納します。
* **cmdVar** - 変数の値をスタックに格納します。ValueフィールドにはVarInfo構造体へのポインタと変数に関する情報が含まれます。
* **cmdExtend** - 外部変数の値をスタックに格納します。Valueフィールドには変数名（\$で始まる）が含まれます。
* **cmdCallExtend** - 外部関数(\$で始まる)を呼び出します。関数のパラメータはスタックから取得され、結果はスタックに格納されます。Valueフィールドには関数名(\$で始まる)が含まれます。
* **cmdPushStr** - Valueフィールドの文字列をスタックに格納します。
* **cmdCall** - 仮想マシンの関数を呼び出します。Valueフィールドには **ObjInfo** 構造体が含まれます。このコマンドは、**ObjExtFunc**のGolang関数と**ObjFunc**のNeedle関数に適用されます。関数が呼び出されると、そのパラメータはスタックから取得され、結果値はスタックに格納されます。
* **cmdCallVari** - **cmdCall**コマンドと似ていますが、可変長のパラメータを持つ関数を呼び出すために使用されます。
* **cmdReturn** - 関数から出るために使用されます。戻り値はスタックに格納され、Valueフィールドは使用されません。
* **cmdIf** - スタックのトップ要素が*valueToBool*関数によって呼び出され、`true`が返される場合にのみ、Valueフィールドに渡された**block**構造に制御が移ります。そうでない場合は、次のコマンドに制御が移ります。
* **cmdElse** - このコマンドは**cmdIf**と同様に動作しますが、スタックのトップ要素が*valueToBool*関数によって呼び出され、`false`が返された場合に指定されたブロックに制御が移ります。
* **cmdAssignVar** - Valueから**VarInfo**型の変数のリストを取得します。これらの変数は**cmdAssign**コマンドを使用して値を取得します。
* **cmdAssign** - スタックの値を**cmdAssignVar**コマンドで取得した変数に割り当てます。
* **cmdLabel** - ループ中に制御が戻ったときにラベルを定義します。
* **cmdContinue** - このコマンドは**cmdLabel**ラベルに制御を移します。新しいループのイテレーションを実行する際にValueは使用されません。
* **cmdWhile** - スタックのトップ要素を**valueToBool**でチェックします。この値が`true`の場合、Valueフィールドに渡された**block**構造が呼び出されます。
* **cmdBreak** - ループを終了します。
* **cmdIndex** - mapまたは配列の値をインデックスでスタックに格納します。Valueは使用されません。例: `(map | array) (index value) => (map | array [index value])`
* **cmdSetIndex** - スタックのトップ要素の値をmapまたは配列の要素に割り当てます。Valueは使用されません。例: `(map | array) (index value) (value) => (map | array)`
* **cmdFuncName** - ドット`.`で区切られた順序で渡されるパラメータを追加します。例: `func name => Func (...) .Name (...)`
* **cmdUnwrapArr** - スタックのトップ要素が配列である場合に、真偽値フラグを定義します。
* **cmdMapInit** - mapの値を初期化します。
* **cmdArrayInit** - 配列の値を初期化します。
* **cmdError** - `error、warning、info` 

### スタック操作コマンド {#stack-operation-commands}

> 注意

> 現在のバージョンでは、これらのコマンドに対して自動型変換は完全に適用されません。例えば、

> `string + float | int | decimal => float | int | decimal, float + int | str => float, しかし int + string => 実行時エラー`。

以下は、直接スタックを処理するためのコマンドです。これらのコマンドではValueフィールドは使用されません。

* **cmdNot** - 論理否定。 `(val) => (!ValueToBool(val))`
* **cmdSign** - 符号の変更。 `(val) => (-val)`
* **cmdAdd** - 加算。 `(val1)(val2) => (val1 + val2)`
* **cmdSub** - 減算。 `(val1)(val2) => (val1 - val2)`
* **cmdMul** - 乗算。 `(val1)(val2) => (val1 * val2)`
* **cmdDiv** - 除算。 `(val1)(val2) => (val1 / val2)`
* **cmdAnd** - 論理積。 `(val1)(val2) => (valueToBool(val1) && valueToBool(val2))`
* **cmdOr** - 論理和。 `(val1)(val2) => (valueToBool(val1) || valueToBool(val2))`
* **cmdEqual** - 等しいかの比較結果を返す。 `(val1)(val2) => (val1 == val2)`
* **cmdNotEq** - 等しくないかの比較結果を返す。 `(val1)(val2) => (val1 != val2)`
* **cmdLess** - より小さいかの比較結果を返す。 `(val1)(val2) => (val1 < val2)`
* **cmdNotLess** - より大きいか、または等しいかの比較結果を返す。 `(val1)(val2) => (val1 >= val2)`
* **cmdGreat** - より大きいかの比較結果を返す。 `(val1)(val2) => (val1 > val2)`
* **cmdNotGreat** - より小さいか、または等しいかの比較結果を返す。 `(val1)(val2) => (val1 <= val2)`

### ランタイムの構造 {#runtime-structure}

バイトコードの実行は仮想マシンに影響を与えません。例えば、さまざまな関数やコントラクトを単一の仮想マシンで同時に実行することができます。ランタイムの構造は、関数やコントラクト、および任意の式やバイトコードを実行するために使用されます。

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

* **stack** - バイトコードを実行するためのスタック
* **blocks** - ブロック呼び出しのスタック
* **vars** - 変数のスタック。ブロック内でバイトコードが呼び出されると、その変数が変数のスタックに追加されます。ブロックを抜けると、変数のスタックのサイズは前の値に戻ります。
* **extend** - 外部変数（`$name`）の値のマップへのポインタ
* **vm** - 仮想マシンへのポインタ
* **cost** - 実行の結果得られるコストの燃料単位
* **err** - 実行中に発生したエラー

#### blockStackの構造 {#blockstack-structure}

blockStackの構造は、Runtimeの構造体で使用されます。

```
type blockStack struct {
   Block *Block
   Offset int
}
```

* **Block** - 実行中のブロックへのポインタ
* **Offset** - 指定されたブロックのバイトコード内で実行された最後のコマンドのオフセット

### RunCode関数 {#runcode-function}

バイトコードは **RunCode** 関数で実行されます。各バイトコードのコマンドに対して対応する操作を実行するループが含まれています。バイトコードを処理する前に、必要なデータを初期化する必要があります。

新しいブロックは他のブロックに追加されます。

```
rt.blocks = append(rt.blocks, &blockStack{block, len(rt.vars)})
```

次に、tail関数の関連パラメータの情報を取得します。 これらのパラメータはスタックの最後の要素に含まれています。

```
var namemap map[string][]interface{}
if block.Type == ObjFunc && block.Info.(*FuncInfo).Names != nil {
   if rt.stack[len(rt.stack)-1] != nil {
      namemap = rt.stack[len(rt.stack)-1].(map[string][]interface{})
   }
   rt.stack = rt.stack[:len(rt.stack)-1]
}
```

次に、現在のブロックで定義されているすべての変数を初期値で初期化する必要があります。

```
start := len(rt.stack)
varoff := len(rt.vars)
for vkey, vpar := range block.Vars {
   rt.cost--
   var value interface{}
```

関数内の変数も変数であるため、関数自体で記述された順序でスタックの最後の要素から変数を取得する必要があります。

```
   if block.Type == ObjFunc && vkey <len(block.Info.(*FuncInfo).Params) {
      value = rt.stack[start-len(block.Info.(*FuncInfo).Params)+vkey]
   } else {
```

ローカル変数を初期値で初期化します。

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

次に、tail 関数で渡される変数パラメーターの値を更新します。

```
if namemap != nil {
   for key, item := range namemap {
      params := (*block.Info.(*FuncInfo).Names)[key]
      for i, value := range item {
         if params.Variadic && i >= len(params.Params)-1 {
```

渡された変数パラメーターが可変数のパラメーターに属している場合、これらのパラメーターは変数の配列に結合されます。

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

あとはスタックの先頭から関数パラメータとして渡された値を削除することでスタックを移動するだけです。 それらの値を変数配列にコピーしました。

```
if block.Type == ObjFunc {
   start -= len(block.Info.(*FuncInfo).Params)
}
```

バイトコードのコマンドループが終了したら、スタックを正しくクリアする必要があります。

```
last := rt.blocks[len(rt.blocks)-1]
```

ブロックのスタックから現在のブロックを削除します。

```
rt.blocks = rt.blocks[:len(rt.blocks)-1]
if status == statusReturn {
```

すでに実行されている関数から正常に終了した場合は、戻り値を前のスタックの最後に追加します。

```
   if last.Block.Type == ObjFunc {
      for count := len(last.Block.Info.(*FuncInfo).Results); count > 0; count-- {
         rt.stack[start] = rt.stack[len(rt.stack)-count]
         start++
      }
      status = statusNormal
   } else {
```

ご覧のとおり、関数を実行しない場合はスタックの状態を復元せず、そのまま関数を終了します。 その理由は、関数内で実行されたループや条件構造もバイトコード ブロックであるためです。

```
   return

   }
}

rt.stack = rt.stack[:start]
```

### 仮想マシンの他の操作用関数 {#other-functions-for-operations-with-vm}

**NewVM** 関数を使用して仮想マシンを作成することができます。各仮想マシンには、**ExecContract**、**MemoryUsage**、**CallContract**、**Settings** の4つの関数が **Extend** 関数を介して追加されます。

```
for key, item := range ext.Objects {
   fobj := reflect.ValueOf(item).Type()
```

渡されたすべてのオブジェクトを調べて、関数のみを確認します。

```
   switch fobj.Kind() {
   case reflect.Func:
```

関数に関して受け取った情報に従って **ExtFuncInfo** 構造体にデータを入力し、その構造体を名前で最上位マップ **Objects** に追加します。

```
   data := ExtFuncInfo{key, make([]reflect.Type, fobj.NumIn()), make([]reflect.Type, fobj.NumOut()),
   make([]string, fobj.NumIn()), fobj.IsVariadic(), item}
   for i := 0; i <fobj.NumIn(); i++ {
```

**ExtFuncInfo** 構造体には **Auto** パラメーター配列があります。 通常、最初のパラメータは `sc *SmartContract` または `rt *Runtime` ですが、これらはいくつかの golang 関数を実行するために必要であるため、Needle 言語から渡すことはできません。 したがって、これらの関数が呼び出されたときにこれらの変数が自動的に使用されるように指定します。 この場合、上記 4 つの関数の最初のパラメータは `rt *Runtime` です。

```
   if isauto, ok := ext.AutoPars[fobj.In(i).String()]; ok {
      data.Auto[i] = isauto
   }
```

パラメータの割り当てに関する情報。

```
      data.Params[i] = fobj.In(i)
   }
```

そして戻り値の型。

```
for i := 0; i <fobj.NumOut(); i++ {
   data.Results[i] = fobj.Out(i)
}
```

ルート **Objects** に関数を追加して、後でコントラクトを使用するときにコンパイラーがそれらを見つけられるようにします。

```
      vm.Objects[key] = &ObjInfo{ObjExtFunc, data}
   }

}
```

## コンパイラ {#compiler}

compile.go ファイルの関数は、字句解析器から得られたトークンの配列をコンパイルする責任を持ちます。コンパイルは条件付きで2つのレベルに分けることができます。トップレベルでは、関数、コントラクト、コードブロック、条件文、ループ文、変数定義などに対処します。低レベルでは、コードブロック内の式やループおよび条件文の条件などをコンパイルします。

まず、簡単な低レベルから始めましょう。**compileEval** 関数では、式をバイトコードに変換することができます。スタックを使用する仮想マシンを使用しているため、通常の中置記録式を逆ポーランド記法に変換する必要があります。例えば、 `1+2` を `12+` に変換し、 `1` と `2` をスタックに入れます。その後、スタック内の最後の2つの要素に対して加算演算を適用し、結果をスタックに書き込みます。この変換アルゴリズムは、インターネット上で[見つけることができます](https://master.virmandy.net/perevod-iz-infiksnoy-notatsii-v-postfiksnuyu-obratnaya-polskaya-zapis/)。

グローバル変数 `opers = map [uint32] operPrior` には、逆ポーランド記法への変換に必要な操作の優先順位が含まれています。

**compileEval** 関数の最初に以下の変数が定義されています：

* **buffer** - バイトコードコマンドの一時バッファ
* **bytecode** - バイトコードコマンドの最終バッファ
* **parcount** - 関数呼び出し時のパラメータ計算に使用される一時バッファ
* **setIndex** - マップまたは配列の要素を割り当てる場合に変数が設定されます。例えば、 `a["my"] = 10`。この場合、指定された **cmdSetIndex** コマンドを使用する必要があります。

ループ内でトークンを取得し、それに応じて処理します。例えば、括弧が見つかると式のパースが停止されます。文字列を移動する際に、前のステートメントが演算子であり、かつ括弧の内部にあるかどうかをチェックし、そうでない場合は式のパースを終了します。

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

一般的には、アルゴリズム自体は逆ポーランド記法への変換アルゴリズムに対応しています。必要な契約、関数、インデックスの呼び出し、およびパース中に遭遇しなかった他の要素を考慮して、lexIdentタイプのトークンのパースオプションを考慮して、その名前の変数、関数、または契約をチェックします。何も見つからない場合、およびこれが関数または契約の呼び出しでない場合は、エラーが発生します。

```
objInfo, tobj := vm.findObj(lexem.Value.(string), block)
if objInfo == nil && (!vm.Extern || i> *ind || i >= len(*lexems)-2 || (*lexems)[i+1].Type != isLPar) {
   return fmt.Errorf(`unknown identifier %s`, lexem.Value.(string))
}
```

以下のような状況に遭遇することがあります。契約の呼び出しについては後で説明します。この例では、同じ名前の関数や変数が見つからない場合、契約を呼び出す必要があると考えます。このコンパイルされた言語では、契約の呼び出しと関数の呼び出しには違いがありません。ただし、バイトコードで使用される**ExecContract**関数を介して契約を呼び出す必要があります。


```
if objInfo.Type == ObjContract {
   if objInfo.Value != nil {
      objContract = objInfo.Value.(*Block)
   }
   objInfo, tobj = vm.findObj(`ExecContract`, block)
   isContract = true
}
```

`count`には、これまでの変数の数が記録されており、関数のパラメータの数とともにスタックに書き込まれます。パラメータの検出が行われるたびに、スタックの最後の要素に1を加えるだけで、この数を増やす必要があります。


```
count := 0
if (*lexems)[i+2].Type != isRPar {
   count++
}
```

コントラクトの呼び出しにおいて、呼び出されたパラメータのリストUsedが存在します。そのため、コントラクトが呼び出された場合には、このケースをマークする必要があります。もしパラメータなしでコントラクトが呼び出された場合、少なくとも2つの空のパラメータを追加して**ExecContract**を呼び出す必要があります。

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

もし次に角括弧がある場合、**cmdIndex**コマンドを追加してインデックスによって値を取得します。


```
if (*lexems)[i+1].Type == isLBrack {
   if objInfo == nil || objInfo.Type != ObjVar {
      return fmt.Errorf(`unknown variable %s`, lexem.Value.(string))
   }
   buffer = append(buffer, &ByteCode{cmdIndex, 0})
}
```


**CompileBlock**関数は、オブジェクトツリーや式に依存しないバイトコードを生成することができます。コンパイルプロセスは、レキシカルアナライザと同様に有限状態機械に基づいていますが、以下の点が異なります。まず、シンボルではなくトークンを使用します。次に、すべての状態と遷移で*states*変数を直接記述します。これは、トークンタイプでインデックスされるオブジェクトの配列を表しています。各トークンは*compileState*の構造を持ち、*NewState*で新しい状態を指定します。解決した構造が明確な場合、*Func*フィールドにハンドラーの関数を指定できます。

例として、主な状態を見直しましょう。

改行またはコメントが現れた場合、同じ状態のままにします。**contract**キーワードが現れた場合、状態を*stateContract*に変更し、構造の解析を開始します。**func**キーワードが現れた場合、状態を*stateFunc*に変更します。その他のトークンが受信された場合、エラーを生成する関数が呼び出されます。

```
{// stateRoot
   lexNewLine: {stateRoot, 0},
   lexKeyword | (keyContract << 8): {stateContract | statePush, 0},
   lexKeyword | (keyFunc << 8): {stateFunc | statePush, 0},
   lexComment: {stateRoot, 0},
   0: {errUnknownCmd, cfError},
},
```

例えば、**func**キーワードが現れ、状態が*stateFunc*に変更されたとします。関数名は**func**キーワードの後に続く必要があるため、関数名を変更する際には同じ状態のままにします。その他のトークンに対しては、対応するエラーを生成します。トークン識別子で関数名を取得した場合、*stateFParams*状態に移行し、関数のパラメータを取得できます。


```
{// stateFunc
   lexNewLine: {stateFunc, 0},
   lexIdent: {stateFParams, cfNameBlock},
   0: {errMustName, cfError},
},
```

上記の操作と同時に、**fNameBlock**関数を呼び出します。注意点として、Block構造体はstatePushマークで作成されます。ここで、バッファから取得し必要なデータを埋め込みます。**fNameBlock**関数は、関数や契約（それらにネストされたものも含む）に適しています。それは対応する構造体である*Info*フィールドを埋め、自身を親ブロックの*Objects*に書き込みます。これにより、指定した名前で関数または契約を呼び出すことができます。同様に、すべての状態と変数に対して対応する関数を作成します。これらの関数は通常非常に小さく、仮想マシンツリーの構築時にいくつかの作業を行います。


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

**CompileBlock**関数では、すべてのトークンを走査し、ステートに基づいてステートを切り替えます。ほとんどの追加トークンは、追加のプログラムコードに対応しています。

- **statePush** - **Block**オブジェクトをオブジェクトツリーに追加します。
- **statePop** - ブロックが閉じ括弧で終わる場合に使用されます。
- **stateStay** - 新しいステートに移行する際に、現在のマークを保持する必要があります。
- **stateToBlock** - *while*や*if*を処理するために**stateBlock**ステートに移行します。式の処理が終わった後、括弧内のブロックを処理する必要があります。
- **stateToBody** - **stateBody**ステートに移行します。
- **stateFork** - マークされた位置を保存します。識別子または`$`で始まる名前から式が始まる場合、関数呼び出しや代入が行われる可能性があります。
- **stateToFork** - **stateFork**に格納されたトークンを取得するために使用され、プロセス関数に渡されます。
- **stateLabel** - **cmdLabel**コマンドを挿入するために使用されます。*while*構造ではこのフラグが必要です。
- **stateMustEval** - *if*や*while*構造の先頭で条件式が利用可能かどうかをチェックします。

また、**CompileBlock**関数以外にも**FlushBlock**関数について触れる必要があります。ただし、問題はブロックツリーが既存の仮想マシンとは独立して構築されていることです。より具体的には、仮想マシンに存在する関数やコントラクトの情報を取得しますが、コンパイルされたブロックは別のツリーに収集されます。コンパイル中にエラーが発生した場合、仮想マシンを前の状態に戻す必要があります。そのため、コンパイルツリーは別途移動し、コンパイルが成功した後に**FlushContract**関数を呼び出す必要があります。この関数は完了したブロックツリーを現在の仮想マシンに追加します。コンパイルフェーズはこれで完了です。


## 字句解析器 {#lexical-analyzer}

字句解析器は入力文字列を処理し、以下の種類のトークンのシーケンスを形成します:

* **lexSys** - システムトークン、例: `{}, [], (), ,, .` など;
* **lexOper** - 演算子トークン、例: `+, -, /, \, *`;
* **lexNumber** - 数値;
* **lexident** - 識別子;
* **lexNewline** - 改行文字;
* **lexString** - 文字列;
* **lexComment** - コメント;
* **lexKeyword** - キーワード;
* **lexType** - 型;
* **lexExtend** - 外部変数や関数への参照、例: `$myname`。

現在のバージョンでは、トークンを解析するために最初に [script/lextable/lextable.go](#lextable-lextable-go) ファイルを使用して変換テーブル（有限状態機械）が初期に構築され、lex_table.go ファイルに書き込まれます。一般的には、ファイルで初期に生成された変換テーブルから解放され、起動時にメモリ内に変換テーブルを作成することができます。字句解析自体は、[lex.go](#lex-go) ファイルの lexParser 関数で行われます。


### lextable/lextable.go {#lextable-lextable-go}

ここでは、操作するアルファベットを定義し、受け取った次のシンボルに基づいて有限状態機械がどのように状態から別の状態に変化するかを説明します。

*states* は、状態のリストを含む JSON オブジェクトです。

特定のシンボル以外の場合、`d` は状態で指定されていないすべてのシンボルを示します。
`n` は 0x0a を、`s` は空白を、`q` はバッククォートを、`Q` はダブルクォートを、`r` は文字 >= 128 を、`a` は AZ と az を、`1` は 1-9 を示します。

これらの状態の名前はキーであり、可能な値は値オブジェクトにリストされています。次に、各グループに対して遷移するための新しい状態があります。その後にはトークンの名前があります。初期状態に戻る必要がある場合は、第3パラメーターがサービストークンであり、現在のシンボルの処理方法を示します。

たとえば、メインの状態と次の文字 `/` の場合、`"/": ["solidus", "", "push next"]` となります。

- **push** - 別のスタックに存在することを記憶するコマンドを与えます。
- **next** - 次の文字に進み、同時に状態を **solidus** に変更します。その後、次の文字を取得し、**solidus** の状態をチェックします。

次の文字が `/` または `/*` の場合、`//` または `/*` で始まるため、コメント **comment** の状態に移行します。明らかに、各コメントにはその後に異なる状態がありますが、異なる記号で終了します。

次の文字が `/` または `*` でない場合、スタック内のすべてのものを **lexOper** タイプのタグとして記録し、スタックをクリアしてメインの状態に戻ります。

次のモジュールでは、状態ツリーを数値配列に変換し、*lex_table.go* ファイルに書き込みます。

最初のループでは、有効なシンボルのアルファベットを形成します。


```
for ind, ch := range alphabet {
   i := byte(ind)
```

In addition, in **state2int**, we provide each state with its own sequence identifier.

```
   state2int := map[string]uint{`main`: 0}
   if err := json.Unmarshal([]byte(states), &data); err == nil {
   for key := range data {
   if key != `main` {
   state2int[key] = uint(len(state2int))
```

When we traverse all states and each set in a state and each symbol in a set, we write a three-byte number [new state identifier (0 = main)] + [token type ( 0-no token)] + [token].
The bidimensionality of the *table* array is that it is divided into states and 34 input symbols from the *alphabet* array, which are arranged in the same order.
We are in the *main* state on the zero row of the *table*. Take the first character, find its index in the *alphabet* array, and get the value from the column with the given index. Starting from the value received, we receive the token in the low byte. If the parsing is complete, the second byte indicates the type of token received. In the third byte, we receive the index of the next new state.
All of these are described in more detail in the **lexParser** function in *lex.go*.
If you want to add some new characters, you need to add them to the *alphabet* array and increase the quantity of the *AlphaSize* constant. If you want to add a new symbol combination, it should be described in the status, similar to the existing options. After the above operation, run the *lextable.go* file to update the *lex_table.go* file.

### lex.go {#lex-go}

The **lexParser** function directly generates lexical analysis and returns an array of received tags based on incoming strings. Let us analyze the structure of tokens.

```
type Lexem struct {
   Type  uint32 // Type of the lexem
   Value interface{} // Value of lexem
   Line  uint32 // Line of the lexem
   Column uint32 // Position inside the line
}
```

* **Type** - トークンのタイプ。次のいずれかの値を持ちます: `lexSys, lexOper, lexNumber, lexIdent, lexString, lexComment, lexKeyword, lexType, lexExtend`
* **Value** - トークンの値。値のタイプはトークンのタイプに依存します。詳細は次のようになります:
  * **lexSys** - 括弧、カンマなどが含まれます。この場合、`Type = ch << 8 | lexSys` となります。`isLPar ... isRBrack` 定数を参照し、その値は uint32 ビットです。
  * **lexOper** - 値は uint32 形式の等価な文字列です。`isNot ... isOr` 定数を参照してください。
  * **lexNumber** - 数値は int64 または float64 として格納されます。数値に小数点がある場合、float64 です。
  * **lexIdent** - 識別子は文字列として格納されます。
  * **lexNewLine** - 改行文字です。行とトークンの位置を計算するためにも使用されます。
  * **lexString** - 文字列は文字列として格納されます。
  * **lexComment** - コメントは文字列として格納されます。
  * **lexKeyword** - キーワードの場合、対応するインデックスのみが格納されます。`keyContract ... keyTail` 定数を参照してください。この場合、`Type = KeyID << 8 | lexKeyword` となります。さらに、`true, false, nil` のキーワードは直ちに lexNumber タイプのトークンに変換され、対応する `bool` 型および `interface {}` 型が使用されます。
  * **lexType** - この値には、対応する `reflect.Type` 型の値が含まれます。
  * **lexExtend** - `$` で始まる識別子。これらの変数と関数は外部から渡されるため、特別な種類のトークンに割り当てられます。この値には、先頭の $ を含まない名前が文字列として格納されます。
* **Line** - トークンが見つかった行番号。
* **Column** - トークンの行内位置。

**lexParser** 関数を詳細に解析しましょう。**todo** 関数は、現在の状態と入力されたシンボルに基づいて、アルファベット内のシンボルのインデックスを調べ、新しい状態、トークン識別子（存在する場合）、および変換テーブルから他のトークンを取得します。解析自体は、次の文字ごとに**todo**関数を呼び出し、新しい状態に切り替えながら進めることで行われます。タグを受け取ったら、対応するトークンを出力基準に作成し、解析プロセスを続行します。解析プロセスでは、トークンのシンボルを別のスタックや配列に蓄積することはせず、トークンの開始オフセットのみを保存します。トークンを取得した後、次のトークンのオフセットを現在の解析位置に移動します。

解析中に使用される字句ステータストークンをチェックします:

* **lexfPush** - このトークンは新しいトークンのシンボルの蓄積が開始されたことを意味します。
* **lexfNext** - 文字を現在のトークンに追加する必要があります。
* **lexfPop** - トークンの取得が完了しました。通常、解析されたトークンの識別子タイプがあります。
* **lexfSkip** - このトークンは解析から除外するために使用されます。たとえば、文字列内の制御スラッシュは \n \r \" です。これらは、字句解析の段階で自動的に置き換えられます。

## Needle言語 {#needle-language}

### 字句 {#lexemes}

プログラムのソースコードはUTF-8エンコーディングである必要があります。

次の字句タイプが処理されます:

* **Keywords** - ```action, break, conditions, continue, contract, data, else, error, false, func, If, info, nil, return, settings, true, var, warning, while```
* **Number** - 十進数のみが受け入れられます。基本的な2つのタイプがあります: **int** と **float**。数値に小数点が含まれている場合、それは **float** となります。**int** 型は golang の **int64** に相当し、**float** 型は golang の **float64** に相当します。
* **String** - 文字列は二重引用符 ```("a string")``` またはバッククォート ```(`a string`)``` で囲むことができます。両方のタイプの文字列は改行文字を含むことができます。二重引用符で囲まれた文字列には、スラッシュでエスケープされた二重引用符、改行文字、復帰文字を含めることができます。例: ```"This is a \"first string\".\r\nThis is a second string."```
* **Comment** - 2つのタイプのコメントがあります。1行コメントは2つのスラッシュ (//) を使用します。例: // This is a single-line comment. 複数行コメントはスラッシュとアスタリスク記号を使用し、複数行にわたることができます。例: ```/* This is a multi-line comment */```
* **Identifier** - 変数や関数の名前は、a-zおよびA-Zの文字、UTF-8のシンボル、数字、アンダースコアで構成されます。名前は文字、アンダースコア、```@``` または ```$``` で始まることができます。```$``` で始まる名前は、**dataセクション**で定義された変数の名前です。```$``` で始まる名前は、**conditionsセクション**および**actionセクション**のスコープでグローバル変数を定義するためにも使用できます。エコシステムの契約は ```@``` 記号を使用して呼び出すことができます。例: ```@1NewTable(...)```

### 型 {#types}

Needleの型の横に対応するgolangの型が指定されています。

* **bool** - bool, デフォルトは **false**;
* **bytes** - []byte{}, デフォルトは空のバイト配列;
* **int** - int64, デフォルトは **0**;
* **address** - uint64, デフォルトは **0**;
* **array** - []interface{}, デフォルトは空の配列;
* **map** - map[string]interface{}, デフォルトは空のオブジェクト配列;
* **money** - decimal, デフォルトは **0**;
* **float** - float64, デフォルトは **0**;
* **string** - string, デフォルトは空の文字列;
* **file** - map[string]interface{}, デフォルトは空のオブジェクト配列;

これらの変数の型は ```var``` キーワードで定義されます。例: ```var var1, var2 int```。このように定義すると、変数は型に応じたデフォルト値で初期化されます。

すべての変数の値はinterface{}型であり、必要なgolangの型に代入されます。したがって、例えば、arrayとmapの型はgolangの []interface{} および map[string]interface{} です。両方の配列タイプは任意の型の要素を含むことができます。


### 式 {#expressions}

式には算術演算、論理演算、関数呼び出しが含まれることがあります。すべての式は演算子の優先順位に従って左から右に評価されます。優先順位が等しい場合、演算子は左から右に評価されます。

演算の優先順位は高から低へと続きます：

* **関数呼び出しと括弧** - 関数が呼び出されると、渡されたパラメータは左から右に計算されます。
* **単項演算** - 論理否定 ```!``` および算術符号変更 ```-```
* **乗算と除算** - 算術乗算 ```*``` および除算 ```/```
* **加算と減算** - 算術加算 ```+``` および減算 ```-```
* **論理比較** - ```>=>> >=```
* **論理等価と不等価** - ```== !=```
* **論理 AND** - ```&&```
* **論理 OR** - ```||```

論理 AND および OR の評価では、式の両側が常に評価されます。

Needleでは、コンパイル中に型チェックは行われません。オペランドの評価時には、型をより複雑な型に変換しようとします。複雑さの順序に応じた型は次のようになります：```string、int、float、money```。型変換の一部しか実装されていません。string 型では、加算演算がサポートされ、結果は文字列の連結になります。例えば、```string + string = string, money - int = money, int * float = float```。

関数の場合、実行時に ```string``` 型および ```int``` 型の型チェックが行われます。

**array** 型および **map** 型は、インデックスでアクセスできます。**array** 型の場合、インデックスとして **int** 値を指定する必要があります。**map** 型の場合、変数または **string** 値を指定する必要があります。インデックスが現在の最大インデックスよりも大きい **array** 要素に値を割り当てる場合、配列に空の要素が追加されます。これらの要素の初期値は **nil** です。例えば： .. code:


```
var my array
my[5] = 0
var mymap map
mymap["index"] = my[3]
```

In expressions of conditional logical values (such as `if, while, &&, ||, !`), the type is automatically converted to a logical value. If the type is not the default value, it is true.

```
var mymap map
var val string
if mymap && val {
...
}
```

### スコープ {#scope}

中括弧は、ローカルスコープ変数を含むことができるブロックを指定します。デフォルトでは、変数のスコープはその独自のブロックとすべてのネストされたブロックに拡張されます。ブロック内で、既存の変数の名前を使用して新しい変数を定義することができます。ただし、この場合、同じ名前の外部変数は利用できなくなります。


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

### コントラクトの実行 {#contract-execution}

コントラクトを呼び出す際には、**data** で定義されたパラメータを渡す必要があります。コントラクトを実行する前に、仮想マシンはこれらのパラメータを受け取り、対応する変数（$Param）に割り当てます。その後、事前に定義された **conditions** 関数と **action** 関数が呼び出されます。

コントラクトの実行中に発生するエラーは、フォームエラーと環境エラーの2つのタイプに分類されます。フォームエラーは、特別なコマンド（`error, warning, info`）や、組み込み関数が `err` を *nil* 以外に返す場合に生成されます。

Needle言語では例外処理は行われません。任意のエラーがコントラクトの実行を終了させます。コントラクトの実行時には、別々のスタックと変数値保存用の構造体が作成されるため、ゴミ回収メカニズムがこれらのデータを自動的に削除します。

### バッカス・ナウア形式（BNF） {#backus-naur-form-bnf}

コンピュータ科学では、BNFはコンテキストフリー構文の表記技法であり、通常、コンピューティングで使用される言語の構文を記述するために使用されます。


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
