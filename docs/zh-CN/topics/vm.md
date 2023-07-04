# 编译器和虚拟机 {#compiler-and-virtual-machine}

<!-- TOC -->

- [源代码存储和编译](#source-code-storage-and-compilation)
- [虚拟机结构](#virtual-machine-structures)
    - [VM结构](#vm-structure)
    - [块结构](#block-structure)
    - [ObjInfo结构](#objinfo-structure)
        - [ContractInfo结构](#contractinfo-structure)
            - [FieldInfo结构](#fieldinfo-structure)
        - [FuncInfo结构](#funcinfo-structure)
            - [FuncName结构](#funcname-structure)
        - [ExtFuncInfo结构](#extfuncinfo-structure)
        - [VarInfo结构](#varinfo-structure)
        - [ObjExtend值](#objextend-value)
- [虚拟机指令](#virtual-machine-commands)
    - [ByteCode结构](#bytecode-structure)
    - [指令标识符](#command-identifiers)
    - [堆栈操作指令](#stack-operation-commands)
    - [Runtime结构](#runtime-structure)
        - [blockStack结构](#blockstack-structure)
    - [RunCode函数](#runcode-function)
    - [VM的其他函数操作](#other-functions-for-operations-with-vm)
- [编译器](#compiler)
- [词法分析器](#lexical-analyzer)
    - [lextable/lextable.go](#lextable-lextable-go)
    - [lex.go](#lex-go)
- [needle 语言](#needle-language)
    - [词法](#lexemes)
    - [类型](#types)
    - [表达式](#expressions)
    - [范围](#scope)
    - [智能合约执行](#contract-execution)
    - [巴科斯范式Backus--Naur Form (BNF)](#backus-naur-form-bnf)

<!-- /TOC -->

本节涉及程序编译和虚拟机中 needle 语言的操作。

## 源代码存储和编译 {#source-code-storage-and-compilation}

智能合约和功能用Golang语言编写，并存储在生态系统的智能合约表。

执行智能合约时，将从数据库中读取其源代码并将其编译为字节码。

智能合约更改后，其源代码将更新并保存在数据库中。然后编译该源代码，导致相应的虚拟机字节码也被改变。

字节码在任何地方都没有物理保存，因此当再次执行程序时，会重新编译源代码。

所有生态系统的智能合约表中描述的整个源代码都严格按顺序编译到一个虚拟机中，虚拟机的状态在所有节点上都相同。

调用智能合约时，虚拟机不会以任何方式更改其状态。执行任何智能合约或调用函数都发生在每个外部调用时创建的单独运行堆栈上。

每个生态系统都可以拥有一个所谓的虚拟生态系统，可以在一个节点内与区块链外的数据表一起使用，并且不能直接影响区块链或其他虚拟生态系统。在这种情况下，托管这样虚拟生态系统的节点会编译其智能合约并创建自己的虚拟机。

## 虚拟机结构  {#virtual-machine-structures}

### VM结构 {#vm-structure}

虚拟机按如下结构定义在内存中。

``` 
type VM struct {
    Block
    ExtCost       func(string) int64
    FuncCallsDB   map[string]struct{}
    Extern        bool
    ShiftContract int64
    logger        *log.Entry
}
```

VM结构具有以下元素：

> -   **Block** - 包含一个 [块结构](#块结构)；
> -   **ExtCost** - 一个函数，该函数返回执行外部golang函数的费用；
> -   **FuncCallsDB** - golang函数名称集合，该函数名返回执行成本作为第一个参数。这些函数使用 **EXPLAIN** 计算处理数据库的成本；
> -   **Extern** - 一个表示智能合约是否为外部智能合约的布尔标识，创建VM时，它设置为true，编译代码时不需要显示调用的智能合约。也就是说，它允许调用将来确定的智能合约代码；
> -   **ShiftContract** VM中第一个智能合约的ID；
> -   **logger** VM的错误日志输出。

### 块结构 {#block-structure}

虚拟机是由 **块Block** 对象类型组成的树。

块是包含一些字节码的独立单元。简单地说，您在语言的大括号(`{}`)中放入的所有内容都是一个块。

例如，下面的代码创建一个带有函数的块。该块又包含一个带有 *if* 语句的块，该语句又包含一个带有 *while* 语句的块。

``` 
func my() {
     if true {
          while false {
               ...
           }
     }
} 
```

块按如下结构定义在内存中。

``` 
type Block struct {
    Objects  map[string]*ObjInfo
    Type     int
    Owner    *OwnerInfo
    Info     interface{}
    Parent   *Block
    Vars     []reflect.Type
    Code     ByteCodes
    Children Blocks
}
```

块结构具有以下元素：

> -   **Objects** - 一个 [ObjInfo](#objinfo-structure) 指针类型的内部对象的映射。例如，如果块中有一个变量，那么可以通过它的名称获得关于它的信息；
> -   **Type** - 块的类型。块为函数时，类型为 **ObjFunc**。块为智能合约时，类型为 **ObjContract**；
> -   **Owner** - 一个 **OwnerInfo** 指针类型的结构。该结构包含有关已编译智能合约所有者的信息。它在智能合约编译期间指定或从 **contracts** 表中获取；
> -   **Info** - 包含有关对象的信息，这取决于块类型；
> -   **Parent** - 指向父块的指针；
> -   **Vars** - 一个包含当前块变量类型的数组；
> -   **Code** - 块本身字节码，当控制权传递给该块时会执行该块字节码，例如，函数调用或者循环体；
> -   **Children** - 一个包含子块的数组，例如，函数嵌套、循环、条件操作符。

### ObjInfo结构 {#objinfo-structure}

**ObjInfo** 结构包含有关内部对象的信息。

``` 
type ObjInfo struct {
   Type int
   Value interface{}
}
```

ObjInfo结构具有以下元素：

> -   **Type** 是对象类型。它可以是以下值之一：
>     -   **ObjContract** --[智能合约](#contractinfo-structure)；
>     -   **ObjFunc** -- 函数；
>     -   **ObjExtFunc** -- 外部golang函数；
>     -   **ObjVar** -- 变量；
>     -   **ObjExtend** -- \$name 变量。
> -   **Value** -- 包含每种类型的结构。

#### ContractInfo结构 {#contractinfo-structure}

指向 **ObjContract** 类型，**Value** 字段包含 **ContractInfo** 结构。

``` 
type ContractInfo struct {
    ID uint32
    Name string
    Owner *OwnerInfo
    Used map[string]bool
    Tx *[]*FieldInfo
}
```

ContractInfo结构具有以下元素：

> -   **ID** -- 智能合约ID。调用智能合约时，该值在区块链中显示；
> -   **Name** -- 智能合约名称；
> -   **Owner** -- 关于智能合约的其他信息；
> -   **Used** -- 已被调用的智能合约名称的映射；
> -   **Tx** -- 智能合约 [数据部分](script.md#data-section) 描述的数据数组。

#### FieldInfo结构 {#fieldinfo-structure}

FieldInfo结构用于 **ContractInfo** 结构并描述智能合约[数据部分](script.md#data-section) 的元素。

``` 
type FieldInfo struct {
      Name string
      Type reflect.Type
      Original uint32
      Tags string
}
```

FieldInfo结构具有以下元素：

> -   **Name** - 字段名称；
> -   **Type** - 字段类型；
> -   **Original** - 可选项字段；
> -   **Tags** -- 该字段的附加标签。

#### FuncInfo结构 {#funcinfo-structure}

指向 **ObjFunc** 类型，**Value** 字段包含 **FuncInfo** 结构。

``` 
type FuncInfo struct {
    Params []reflect.Type
    Results []reflect.Type
    Names *map[string]FuncName
    Variadic bool
    ID uint32
}
```

FuncInfo结构具有以下元素：

> -   **Params** -- 参数类型数组；
> -   **Results** -- 返回结果类型数组；
> -   **Names** -- 尾部函数的数据映射，例如，`DBFind().Columns ()`；
> -   **Variadic** -- 如果函数可以具有可变数量的参数，则为true；
> -   **ID** -- 函数ID。

#### FuncName结构 {#funcname-structure}

FuncName结构用于 **FuncInfo** 并描述尾部函数的数据。

``` 
type FuncName struct {
   Params []reflect.Type
   Offset []int
   Variadic bool
}
```

FuncName结构具有以下元素：

> -   **Params** -- 参数类型数组；
> -   **Offset** -- 这些变量的偏移量数组。实际上，所有参数在函数中都可以使用点 `.` 来初始化值；
> -   **Variadic** -- 如果尾部函数可以具有可变数量的参数。则为true。

#### ExtFuncInfo结构 {#extfuncinfo-structure}

指向 **ObjExtFunc** 类型，**Value** 字段包含 **ExtFuncInfo**结构。用于描述golang函数。

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

ExtFuncInfo结构具有以下元素：

> -   **Name**、**Params、Results** 参数和[FuncInfo](#funcinfo-structure) 结构相同；
> -   **Auto** -- 一个变量数组，如果有，则作为附加参数传递给函数，例如，*SmartContract* 类型的变量 *sc*；
> -   **Func** -- golang函数。

#### VarInfo结构 {#varinfo-structure}

指向 **ObjVar** 类型，**Value** 字段包含一个 **VarInfo** 结构。

``` 
type VarInfo struct {
   Obj *ObjInfo
   Owner *Block
}
```

VarInfo结构具有以下元素：

> -   **Obj** -- 关于变量类型和变量值的信息；
> -   **Owner** -- 指向所属块的指针。

#### ObjExtend值 {#objextend-value}

指向 **ObjExtend** 类型，**Value** 字段包含一个字符串，其中包含变量或函数的名称。

## 虚拟机指令 {#virtual-machine-commands}

### ByteCode结构 {#bytecode-structure}

字节码是 **ByteCode** 类型结构的序列。

``` 
type ByteCode struct {
   Cmd uint16
   Value interface{}
}
```

该结构具有以下字段：

> -   **Cmd** - 存储指令的标识符；
> -   **Value** - 包含操作数（值）。

通常情况，指令对堆栈的顶部元素执行操作，并在必要时将结果值写入其中。

### 指令标识符 {#command-identifiers}

*vm/cmds_list.go* 文件描述了虚拟机指令的标识符。

> -   **cmdPush** -- 将 *Value* 字段的值放到堆栈。例如，将数字和行放入堆栈；
> -   **cmdVar** -- 将变量的值放入堆栈。\*Value\* 包含一个指向 *VarInfo* 结构的指针以及关于该变量的信息；
> -   **cmdExtend** -- 将外部变量的值放入堆栈。\*Value\* 包含一个带有变量名称的字符串（以 `$` 开头）；
> -   **cmdCallExtend** -- 调用外部函数（名称以 `$` 开头）。函数的参数从堆栈中获取，函数的结果被放入堆栈。\*Value\* 包含一个函数名称（以 `$` 开头）；
> -   **cmdPushStr** -- 将 *Value* 中的字符串放入堆栈；
> -   **cmdCall** -- 调用虚拟机函数，\*Value\* 包含 **ObjInfo** 结构。该指令适用于 **ObjExtFunc** golang函数和 **ObjFunc** needle 函数。调用函数时，将从堆栈中获取其参数，并将结果值放入堆栈；
> -   **cmdCallVari** -- 类似于 **cmdCall** 指令，调用虚拟机函数。该指令用于调用具有可变数量参数的函数；
> -   **cmdReturn** -- 用于退出函数，返回值将放入到堆栈，不使用 *Value* 字段；
> -   **cmdIf** -- 将控制权转移到 **块** 结构中的字节码，该指令在 *Value* 字段中传递。仅当 *valueToBool* 函数调用堆栈顶部元素返回 `true` 时才会将控制权转移到堆栈。否则控制权转移到下一个指令；
> -   **cmdElse** -- 该指令的工作方式与 **cmdIf** 指令相同，但仅当 *valueToBool* 函数调用堆栈顶部元素返回 `false` 时控制权才会转移到指定的块；
> -   **cmdAssignVar** -- 从 *Value* 获取 **VarInfo** 类型的变量列表。这些变量使用 **cmdAssign** 指令获取值；
> -   **cmdAssign** -- 将堆栈中的值赋给 **cmdAssignVar** 指令获得的变量；
> -   **cmdLabel** -- 控制权在while循环期间被返回时定义一个标记；
> -   **cmdContinue** -- 该指令将控制权传递给 **cmdLabel** 标记。执行循环的新迭代时，不使用 *Value* ；
> -   **cmdWhile** -- 使用 *valueToBool* 检查堆栈的顶部元素。如果该值为 `true`，则从 *value* 字段调用 **块** 结构；
> -   **cmdBreak** -- 退出循环；
> -   **cmdIndex** -- 通过索引将 *map* 或 *array* 中的值放入堆栈，不使用 *Value*。例如：`(map | array) (index value) => (map | array [index value])`；
> -   **cmdSetIndex** -- 将堆栈顶部元素的值分配给 *map* 或 *array* 的元素，不使用 *Value*。例如：`(map | array) (index value) (value) => (map | array)`；
> -   **cmdFuncName** -- 添加的参数通过用点 `.` 划分顺序来描述。例如：`func name => Func (...) .Name (...)`；
> -   **cmdUnwrapArr** -- 如果堆栈顶部元素为数组，则定义一个布尔标记；
> -   **cmdMapInit** -- 初始化 *map* 的值；
> -   **cmdArrayInit** -- 初始化 *array* 的值；
> -   **cmdError** -- 当智能合约或者函数以某个指定的 `error, warning, info` 错误终止时，该指令创建。

### 堆栈操作指令 {#stack-operation-commands}


```` text
在当前版本中，这些指令是不完全的自动类型转换。例如:
`string + float | int | decimal => float | int | decimal`，`float + int | str => float`，但是
`int + string => runtime error`。
````

下面是直接处理堆栈的指令。这些指令中不使用 *Value* 字段。

-   **cmdNot** -- 逻辑否定。`(val) => (!ValueToBool(val))`；
-   **cmdSign** -- 符号变化。`(val) => (-val)`；
-   **cmdAdd** -- 加法。`(val1)(val2) => (val1 + val2)`；
-   **cmdSub** -- 减法。`(val1)(val2) => (val1 - val2)`；
-   **cmdMul** -- 乘法。`(val1)(val2) => (val1 * val2)`；
-   **cmdDiv** -- 除法。`(val1)(val2) => (val1 / val2)`；
-   **cmdAnd** -- 逻辑与。`(val1)(val2) => (valueToBool(val1) && valueToBool(val2))`；
-   **cmdOr** -- 逻辑或。`(val1)(val2) => (valueToBool(val1) || valueToBool(val2))`；
-   **cmdEqual** -- 等式比较，返回bool。`(val1)(val2) => (val1 == val2)`；
-   **cmdNotEq** -- 不等式比较，返回bool。`(val1)(val2) => (val1 != val2)`；
-   **cmdLess** -- 小于式比较，返回bool。`(val1)(val2) => (val1 < val2)`；
-   **cmdNotLess** -- 大于等于式比较，返回bool。`(val1)(val2) => (val1 >= val2)`；
-   **cmdGreat** -- 大于式比较，返回bool。`(val1)(val2) => (val1 > val2)`；
-   **cmdNotGreat** -- 小于等于式比较，返回bool。`(val1)(val2) => (val1 <= val2)`。

### Runtime结构 {#runtime-structure}

执行字节码不会影响虚拟机。例如，它允许在单个虚拟机中同时运行各种函数和智能合约。**Runtime** 结构用于运行函数和智能合约，以及任何表达式和字节码。

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

-   **stack** -- 执行字节码的堆栈；
-   **blocks** -- 块调用堆栈；
-   **vars** -- 变量堆栈。在块中调用字节码时，其变量将添加到该变量堆栈中。退出块后，变量堆栈的大小将返回到先前的值；
-   **extend** -- 指向外部变量值（`$name`）映射指针；
-   **vm** -- 虚拟机指针；
-   **cost** -- 执行结果的燃料单位；
-   **err** -- 执行时的错误。

#### blockStack结构 {#blockstack-structure}

blockStack结构用于 **Runtime** 结构。

``` 
type blockStack struct {
     Block *Block
     Offset int
}
```

-   **Block** -- 正在执行的块的指针；
-   **Offset** -- 在指定块的字节码中执行的最后一个指令的偏移量。

### RunCode函数 {#runcode-function}

字节码在 **RunCode**函数中执行。它包含一个循环，为每个字节码指令执行相应的操作。在处理字节码之前，必须初始化必要的数据。

在这里新块被添加到其他块中。

``` 
rt.blocks = append(rt.blocks, &blockStack{block, len(rt.vars)})
```

接下来，获得尾部函数的相关参数信息。这些参数包含在堆栈的最后一个元素中。

``` 
var namemap map[string][]interface{}
if block.Type == ObjFunc && block.Info.(*FuncInfo).Names != nil {
    if rt.stack[len(rt.stack)-1] != nil {
        namemap = rt.stack[len(rt.stack)-1].(map[string][]interface{})
    }
    rt.stack = rt.stack[:len(rt.stack)-1]
}
```

然后，必须使用初始值初始化当前块中定义的所有变量。

``` 
start := len(rt.stack)
varoff := len(rt.vars)
for vkey, vpar := range block.Vars {
   rt.cost--
   var value interface{}
```

由于函数中的变量也是变量，所以我们需要按照函数本身所描述的顺序从堆栈的最后一个元素中取出它们。

``` 
    if block.Type == ObjFunc && vkey < len(block.Info.(*FuncInfo).Params) {
      value = rt.stack[start-len(block.Info.(*FuncInfo).Params)+vkey]
    } else {
```

在此使用初始值初始化局部变量。

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

接下来，更新在尾部函数中传递的变量参数的值。

``` 
if namemap != nil {
  for key, item := range namemap {
    params := (*block.Info.(*FuncInfo).Names)[key]
    for i, value := range item {
       if params.Variadic && i >= len(params.Params)-1 {
```

如果传递的变量参数为可变数量的参数，那么将它们组合成一个变量数组。

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

之后，我们要做的就是删除作为函数参数从堆栈顶部传递的值，从而移动堆栈。我们已经将它们的值复制到一个变量数组中。

``` 
if block.Type == ObjFunc {
     start -= len(block.Info.(*FuncInfo).Params)
}
```

字节码指令循环执行结束后，我们必须正确地清除堆栈。

``` 
last := rt.blocks[len(rt.blocks)-1]
```

将当前块从块堆栈中删除。

``` 
rt.blocks = rt.blocks[:len(rt.blocks)-1]
if status == statusReturn {
```

如果成功退出已执行的函数，我们将返回值添加到上一个堆栈的尾部。

``` 
if last.Block.Type == ObjFunc {
   for count := len(last.Block.Info.(*FuncInfo).Results); count > 0; count-- {
     rt.stack[start] = rt.stack[len(rt.stack)-count]
     start++
   }
   status = statusNormal
 } else {
```

如您所见，如果我们不执行函数，那么我们就不会恢复堆栈状态并按原样退出函数。原因是函数中已经执行的循环和条件结构也是字节码块。

``` 
return
    }
}
rt.stack = rt.stack[:start]
```

### VM的其他函数操作 {#other-functions-for-operations-with-vm}

使用 **NewVM** 函数创建虚拟机。每个虚拟机都 **Extend** 函数添加了四个函数：**ExecContract、MemoryUsage、CallContract** 和 **Settings**。

``` 
for key, item := range ext.Objects {
    fobj := reflect.ValueOf(item).Type()
```

我们遍历所有传递的对象，只查看函数。

``` 
switch fobj.Kind() {
case reflect.Func:
```

根据接收到的相关该函数的信息填充 **ExtFuncInfo** 结构，并按名称将其结构添加到顶层的 **Objects** 映射。

``` 
data := ExtFuncInfo{key, make([]reflect.Type, fobj.NumIn()), make([]reflect.Type, fobj.NumOut()), 
   make([]string, fobj.NumIn()), fobj.IsVariadic(), item}
for i := 0; i < fobj.NumIn(); i++ {
```

**ExtFuncInfo** 结构有一个 **Auto** 参数数组。通常第一个参数为 `sc *SmartContract` 或 `rt *Runtime`，我们不能从 needle 语言中传递它们，因为在执行一些golang函数时它们对我们来说是必需的。因此，我们指定在调用函数时将自动使用这些变量。在这种情况下，上述四个函数的第一个参数为`rt *Runtime`。

``` 
if isauto, ok := ext.AutoPars[fobj.In(i).String()]; ok {
  data.Auto[i] = isauto
}
```

赋值有关参数的信息。

``` 
data.Params[i] = fobj.In(i)
}
```

以及返回值的类型。

``` 
for i := 0; i < fobj.NumOut(); i++ {
   data.Results[i] = fobj.Out(i)
}
```

向根 **Objects** 添加一个函数，这样编译器可以稍后在使用智能合约时找到它们。

``` 
vm.Objects[key] = &ObjInfo{ObjExtFunc, data}
    }
}
```

## 编译器 {#compiler}

*compile.go* 文件的函数负责编译从词法分析器获得的标记数组。编译可以有条件地分为两个级别，在高层级别，我们处理函数、智能合约、代码块、条件语句和循环语句、变量定义等等。在底层级别，我们编译循环和条件语句中的代码块或条件内的表达式。

首先，让我们描述简单的低层级别。在 **compileEval** 函数可以完成将表达式转换为字节码。由于我们是使用堆栈的虚拟机，因此有必要将普通的中缀记录表达式转换为后缀表示法或逆波兰表示法。例如，`1+2` 转换为 `12+`，然后将 `1` 和 `2`放入堆栈，然后我们对堆栈中的最后两个元素应用加法运算，并将结果写入堆栈。这种[转换算法](https://master.virmandy.net/perevod-iz-infiksnoy-notatsii-v-postfiksnuyu-obratnaya-polskaya-zapis/) 可以在互联网上找到。

全局变量 `opers = map [uint32] operPrior` 包含转换成逆波兰表示法时所必需的操作的优先级。

以下变量在 **compileEval** 函数开头定义：

> -   **buffer** -- 字节码指令的临时缓冲区；
> -   **bytecode** -- 字节码指令的最终缓冲区；
> -   **parcount** -- 调用函数时用于计算参数的临时缓冲区；
> -   **setIndex** -- 当我们分配 *map* 或 *array* 元素时，工作过程中的变量被设置为 [true]{.title-ref}。例如，`a["my"] = 10`，在这种情况下，我们需要使用指定的 **cmdSetIndex** 指令。

我们在一个循环体中获得一个标记并作出相应的处理，例如，如果找到大括号，然后停止解析表达式。在移动字符串时，我们会查看前一个语句是否是一个操作符以及是否在括号内，否则我们退出并解析表达式。

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

通常情况下，该算法本身对应于一种转换为逆波兰表示法的算法。考虑到一些必要的智能合约、函数、索引的调用，以及解析时不会遇到的其他事情和解析 *lexIdent* 类型标记的选项，我们将检查具有此名称的变量、函数或智能合约。如果没有找到任何相关内容而且这不是函数或智能合约调用，那么我们会指出错误。

``` 
objInfo, tobj := vm.findObj(lexem.Value.(string), block)
if objInfo == nil && (!vm.Extern || i > *ind || i >= len(*lexems)-2 || (*lexems)[i+1].Type != isLPar) {
      return fmt.Errorf(`unknown identifier %s`, lexem.Value.(string))
}
```

我们可能会遇到这样的情况，稍后将描述智能合约调用。在本例中，如果没有找到同名函数和变量，那么我们认为将调用智能合约。在该编译语言中，智能合约和函数调用没有区别。但是我们需要通过在字节码中使用的**ExecContract** 函数来调用智能合约。

> ``` 
> if objInfo.Type == ObjContract {
>     if objInfo.Value != nil {
>               objContract = objInfo.Value.(*Block)
>             }
>     objInfo, tobj = vm.findObj(`ExecContract`, block)
>     isContract = true
> }
> ```

我们将到目前为止的变量数量记录在 `count`中，该值也会随着函数参数数量一起写入堆栈。在每次后续检测参数时，我们只需在堆栈的最后一个元素中将该数量增加一个单位。

``` 
count := 0
if (*lexems)[i+2].Type != isRPar {
    count++
}
```

我们有已调用智能合约的列表参数 *Used*，因此我们需要为智能合约被调用的情况做标记。如果在没有参数的情况下调用智能合约，我们必须添加两个空参数去调用 **ExecContract**，以获得最少两个参数。

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

If we see that there is a square bracket next, then we add the **cmdIndex** command to get the value by the index.

``` 
if (*lexems)[i+1].Type == isLBrack {
     if objInfo == nil || objInfo.Type != ObjVar {
         return fmt.Errorf(`unknown variable %s`, lexem.Value.(string))
     }
    buffer = append(buffer, &ByteCode{cmdIndex, 0})
}
```

**CompileBlock** 函数可以生成对象树和与表达式无关的字节码。编译过程基于有限状态机，就像词法分析器一样，但是有以下不同之处。第一，我们不使用符号但使用标记；第二，我们会立即描述所有状态和转换中的 *states* 变量。它表示一个按标记类型索引的对象数组，每个标记都具有 *compileState* 的结构，并在 *NewState* 中指定一个新状态。如果我们已经解析清楚这是什么结构，那么就可以指定 *Func* 字段中处理程序的函数。

让我们以主状态为例回顾一下。

如果我们遇到换行符或注释，那么我们会保持相同的状态。如果我们遇到 **contract** 关键字，那么我们将状态更改为 *stateContract* 并开始解析该结构。如果我们遇到 **func** 关键字，那么我们将状态更改为 *stateFunc*。如果接收到其他标记，那么将调用生成错误的函数。

``` 
{ // stateRoot
   lexNewLine: {stateRoot, 0},
   lexKeyword | (keyContract << 8): {stateContract | statePush, 0},
   lexKeyword | (keyFunc << 8): {stateFunc | statePush, 0},
   lexComment: {stateRoot, 0},
   0: {errUnknownCmd, cfError},
},
```

假设我们遇到了 **func** 关键字，并且我们已将状态更改为 *stateFunc*。由于函数名必须跟在 **func** 关键字后面，因此在更改该函数名时，我们将保持相同的状态。对于所有其他标记，我们生成相应的错误。如果我们在标记标识符中获取了函数名称，那么我们转到 *stateFParams* 状态，其中我们可以获取函数的参数。

``` 
{ // stateFunc
    lexNewLine: {stateFunc, 0},
    lexIdent: {stateFParams, cfNameBlock},
    0: {errMustName, cfError},
},
```

上述操作的同时，我们将调用 **fNameBlock** 函数。应该注意的是，*块Block* 结构是使用 *statePush* 标记创建的，在这里我们从缓冲区中获取它并填充我们需要的数据。**fNameBlock** 函数适用于智能合约和函数(包括嵌套在其中的函数和智能合约)。它使用相应的结构填充 *Info* 字段，并将其自身写入父块的 *Objects* 中。这样以便我们可以通过指定的名称调用该函数或智能合约。同样，我们为所有状态和变量创建对应的函数。这些函数通常非常小，并且在构造虚拟机树时执行一些工作。

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

对于 **CompileBlock** 函数，它只是遍历所有标记并根据 *states* 中描述的标记切换状态。几乎所有附加标记对应附加程序代码。

> -   **statePush** -- 将 **块Block** 对象添加到对象树中；
> -   **statePop** -- 当块以结束花括号结束时使用；
> -   **stateStay** -- 当更改为新状态时，您需要保留当前标记；
> -   **stateToBlock** -- 转换到 **stateBlock** 状态，用于处理 *while* 和 *if*。当处理完表达式后，需要在大括号内处理块使用；
> -   **stateToBody** -- 转换到 **stateBody** 状态；
> -   **stateFork** -- 保存标记的位置。当表达式以标识符或带有 `$` 名称开头时使用，我们可以进行函数调用或赋值；
> -   **stateToFork** -- 用于获取存储在 **stateFork** 中的标记。该标记将传递给进程函数；
> -   **stateLabel** -- 用于插入 **cmdLabel** 指令。\*while\* 结构需要这个标记；
> -   **stateMustEval** -- 在 *if* 和 *while* 结构的开头检查条件表达式的可用性。

除了 **CompileBlock** 函数，还应该提到 **FlushBlock** 函数。但问题是块树是独立于现有虚拟机构建的，更准确地说，我们获取有关虚拟机中存在的函数和智能合约的信息，但我们将已编译的块收集到一个单独的树中。否则，如果在编译期间发生错误，我们必须将虚拟机的状态回滚到以前的状态。因此，我们单独去编译树，但编译成功后必须调用**FlushContract**函数。这个函数将完成的块树添加到当前虚拟机中。此时编译阶段就完成了。

## 词法分析器 {#lexical-analyzer}

词法分析器将传入的字符串处理并形成以下类型的标记序列：

> -   **lexSys** - 系统标记，例如：`{}`，`[]`，`()`，`,`，`.` 等；
> -   **lexOper** -- 操作标记，例如：`+`，`-`，`/`，`\`，`*`；
> -   **lexNumber** -- 数字；
> -   **lexident** -- 标识符；
> -   **lexNewline** -- 换行符；
> -   **lexString** -- 字符串；
> -   **lexComment** -- 注释；
> -   **lexKeyword** -- 关键字；
> -   **lexType** -- 类型；
> -   **lexExtend** -- 引用外部变量或函数，例如：`$myname`。

在当前版本中，初步借助于 [script/lextable/lextable.go](#lextable-lextable-go) 文件构造了一个转换表(有限状态机)来解析标记，并将其写入 *lex_table.go* 文件。通常情况下，您可以脱离该文件初始生成的转换表，可以在启动时立即在内存(`init()`)中创建一个转换表。词法分析本身发生在[lex.go](#lex-go) 文件中的 **lexParser**函数中。

### lextable/lextable.go {#lextable-lextable-go}

在这里我们定义了我们的语言用于操作的字母表，并描述有限状态机根据下一个接收到的符号从一种状态变化到另一种状态。

*states* 包含一个状态列表的JSON对象。

除特定符号外，`d` 用于表示状态中未指明的所有符号。

`n` 代表0x0a，`s` 代表空格，`q` 代表反引号，`Q` 代表双引号，`r` 代表字符 >= 128，`a` 代表AZ和az，`1` 代表1-9。

状态的名称是键，值对象中列出了可能的值。然后，对于每一组，都有一种新的状态需要转换。然后是标记的名称，如果我们需要返回到初始状态，第三个参数是服务标志，它指示了如何处理当前符号。

例如，我们有主状态和传入字符 `/`，`"/": ["solidus", "", "push next"],`

> -   **push** - 给指令记住它在一个单独的堆栈；
> -   **next** - 转到下一个字符，同时我们将状态更改为
>     **solidus**，之后，获取下一个角色并查看 **solidus** 的状态。

如果下一字符有 `/` 或 `/*`，那么我们转到注释 **comment** 状态，因为它们以 `//` 或 `/*`开头。显然，每个注释后续都有不同的状态，因为它们以不同的符号结束。

如果下一字符不是 `/` 和 `*`，那么我们将堆栈中的所有内容记录为 **lexOper** 类型的标记，清除堆栈并返回主状态。

以下模块将状态树转换为一个数值数组，并将其写入 *lex_table.go* 文件。

在第一个循环体中：

我们形成有效符号的字母表。

``` 
for ind, ch := range alphabet {
i := byte(ind)
```

此外，在 **state2int** 中，我们为每个状态提供了自己的序列标识符。

``` 
state2int := map[string]uint{`main`: 0}
if err := json.Unmarshal([]byte(states), &data); err == nil {
for key := range data {
if key != `main` {
state2int[key] = uint(len(state2int))
```

当我们遍历所有状态和状态中的每个集合以及该集合中的每个符号时，我们写入一个三字节的数字[新状态标识符（0= main）] + [标记类型（0-没有标记）] + [标记]。

*table* 数组的二维性在于它分为状态和来自 *alphabet* 数组的34个输入符号，它们以相同的顺序排列。

我们处于 *table* 零行上的 *main* 状态。取第一个字符，在 *alphabet* 数组中查找其索引，并从给定索引的列中获取值。从接收到的值开始，我们在低位字节接收标记。如果解析完成，第二个字节表示接收到的标记类型。在第三个字节中，我们接收下一个新状态的索引。

所有这些在 *lex.go* 中的 **lexParser** 函数中有更详细的描述。

如果想要添加一些新字符，则需要将它们添加到 *alphabet* 数组并增加 *AlphaSize* 常量。如果要添加新的符号组合，则应在状态中对其进行描述，类似于现有选项。在此之后，运行 *lextable.go* 文件来更新 *lex_table.go* 文件。

### lex.go {#lex-go}

**lexParser**
函数直接生成词法分析，并根据传入的字符串返回一个已接收标记的数组。让我们分析标记的结构。

``` 
type Lexem struct {
   Type uint32 // Type of the lexem
   Value interface{} // Value of lexem
   Line uint32 // Line of the lexem
   Column uint32 // Position inside the line
}
```

-   **Type** -- 标记类型。它有以下值之一：`lexSys, lexOper, lexNumber, lexIdent, lexString, lexComment, lexKeyword, lexType, lexExtend`；
-   **Value** -- 标记的值。值的类型取决于标记类型，让我们更详细地分析一下：
    - **lexSys** -- 包括括号，逗号等。在这种情况下，`Type = ch << 8 | lexSys`，请参阅 `isLPar ... isRBrack` 常量，该值为uint32位；
    - **lexOper** -- 值以uint32的形式表示等价的字符序列。请参阅 `isNot ... isOr` 常量；
    - **lexNumber** -- 数字存储为 *int64* 或 *float64*。如果数字有一个小数点，那么为 *float64*；
    - **lexIdent** -- 标识符存储为 *字符串string*；
    - **lexNewLine** -- 换行符。还用于计算行和标记位置；
    - **lexString** -- 行存储为 *字符串string*；
    - **lexComment** -- 注释存储为 *字符串string*；
    - **lexKeyword** -- 关键字仅存储相应的索引，请参阅 `keyContract ... keyTail` 常量。在这种情况下 `Type = KeyID << 8 | lexKeyword`。另外，应该注意的是，`true,false,nil` 关键字会立即转换为 **lexNumber** 类型的标记，并使用相应的 `bool` 和 `intreface {}` 类型；
    - **lexType** -- 该值包含相应的 `reflect.Type` 类型值；
    - **lexExtend** -- 以美元符号 `$` 开头的标识符。这些变量和函数从外部传递，因此分配给特殊类型的标记。该值包含字符串形式的名称，开头没有美元符号。
-   **Line** -- 标记所在行；
-   **Column** -- 标记的行内位置。

让我们详细分析 **lexParser** 函数。**todo** 函数根据当前状态和传入符号，查找字母表中的符号索引，并从转换表中获取一个新状态、标记标识符(如果有的话)和其他标记。解析本身包括对每下一个字符依次调用 **todo** 函数，并切换到新的状态。一旦接收到标记，我们就在输出准则中创建相应的标记并继续解析。应该注意的是，在解析过程中，我们不将标记符号累积到单独的堆栈或数组中，因为我们只是保存标记开始的偏移量。获得标记之后，我们将下一个标记的偏移量移动到当前解析位置。

剩下的就是检查解析中使用的词法状态标志：

> -   **lexfPush** -- 该标志意味着我们开始在一个新的标记中累积符号；
> -   **lexfNext** -- 必须将该字符添加到当前标记；
> -   **lexfPop** -- 接收标记完成，通常，使用该标志我们有解析标记的标识符类型；
> -   **lexfSkip** -- 该标志用于从解析中排除字符，例如，字符串中的控件斜线为 `\n \r \"`。它们会在该词法分析阶段自动替换。

## needle 语言 {#needle-language}

### 词法 {#lexemes}

程序的源代码必须采用UTF-8编码。

以下词法类型:

> -   **关键字** - `action`, `break`, `conditions`, `continue`,`contract`, `data`, `else`, `error`, `false`, `func`, `if`,`info`, `nil`, `return`, `settings`, `true`, `var`, `warning`,`while`；
> -   **数字** - 只接收十进制数字。有两种基本类型: **int** 和 **float**。 如果数字有一个小数点，它就变成了浮点数。
>     **float**。\**int*\* 类型等价于golang中的 **int64**。\**float*\*
>     类型等价于golang中的 **float64**。
> -   **字符串** - 字符串可以用双引号 (`"a string"`) 或反引号(\`a string\`)。这两种类型的字符串都可以包含换行符。双引号中的字符串可以包含双引号、换行符和用斜杠转义的回车符。例如，[\"This is a \"first string\".rnThis is a second string.\"]{.title-ref}。
> -   **注释** - 有两种类型的评论。单行注释使用两个斜杠符号(`//`)。例如，`// 这是单行注释`。多行注释使用斜杠和星号符号，可以跨越多行。例如，`/* 这是多行注释 */`.
> -   **标识符** - 由a-z和A-Z字母、UTF-8符号、数字和下划线组成的变量和函数的名称。名称可以以字母、下划线、`@` 或 `$` 符号开头。以 `$` 开头的名称为在 **数据部分**中定义的变量的名称。以 `$` 开头的名称还可以用于定义 **条件部分**和 **操作部分** 范围内的全局变量。生态系统的智能合约可以使用 `@`符号来调用。例如: `@1NewTable(...)`。

### 类型 {#types}

在 needle 类型旁边指定了相应的golang类型。

-   **bool** - bool，默认值为 **false**；
-   **bytes** - \[\]byte{}，默认值为空字节数组；
-   **int** - int64，默认值为 **0**；
-   **address** - uint64，默认值为 **0**；
-   **array** - \[\]interface{}，默认值为空数组；
-   **map** - map\[string\]interface{}，默认值为空对象数组；
-   **money** - decimal.Decimal，默认值为 **0**；
-   **float** - float64，默认值为 **0**；
-   **string** - string，默认值为空字符串；
-   **file** - map\[string\]interface{}，默认值为空对象数组。

这些类型的变量用 `var` 关键字定义。例如，`var var1, var2 int`。当这样定义一个变量时，它将获得其类型的默认值。

所有变量值都具有 *interface{}* 类型，然后将它们分配给所需的golang类型。因此，例如 *array* 和 *map* 类型是golang类型 *\[\]interface{}* 和 *map\[string\]interface{}*。这两种类型的数组都可以包含任何类型的元素。

### 表达式 {#expressions}

表达式可以包含算术运算、逻辑运算和函数调用。根据操作优先级从左到右计算所有表达式。如果操作优先级相同，评估也从左到右。

从最高优先级到最低优先级的操作列表:

-   **函数调用和圆括号** - 调用函数时，将从左到右计算传递的参数；
-   **一元运算** - 逻辑否定 `!` 和算术符号变化 `-`；
-   **乘法和除法** - 算术乘法 `*` 和除法 `/`；
-   **加法和减法** - 算术加法 `+` 和减法 `-`；
-   **逻辑比较** - `>= > > >=`；
-   **逻辑相等和不相等** - `== !=`；
-   **逻辑与** - `&&`；
-   **逻辑或** - `||`。

当评估逻辑与和逻辑或时，在任何情况下都会计算表达式的两侧。

needle 在编译时没有类型检查。在评估操作数时，会尝试将类型转换为更复杂的类型。复杂度顺序的类型可以按照如下：`string, int, float, money`，仅实现了部分类型转换。字符串类型支持加法操作，结果会使得字符串连接。例如，`string + string = string, money - int = money, int * float = float`。

对于函数，在执行时会对 `string` 和 `int` 类型执行类型检查。

**array** 和 **map** 类型可以通过索引来寻址。对于 **array** 类型，必须将 **int** 值指定为索引。对于 **map** 类型，必须指定变量或 **string**值。如果将值赋给索引大于当前最大索引的 **array**元素，则将向数组添加空元素。这些元素的初始化值为 **nil** 。例如: .. code:

    var my array
    my[5] = 0
    var mymap map
    mymap["index"] = my[3]

在条件逻辑值的表达式中（例如`if，while，&&，||，!`），类型会自动转换为逻辑值，如果类型不为默认值，则为true。

``` 
var mymap map
var val string
if mymap && val {
...
}
```

### 范围 {#scope}

大括号指定一个可以包含局部范围变量的块。默认情况下，变量的范围扩展到它自己的块和所有嵌套的块。在一个块中，可以使用现有变量的名称定义一个新变量。在这种情况下，具有相同名称的外部变量不可用。

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

### 智能合约执行 {#contract-execution}

当调用智能合约时，必须将 **data** 部分中定义的参数传递给它。在执行合约之前，虚拟机接收这些参数并将它们分配给相应的变量($Param)。然后调用预定义的 **conditions** 函数和 **action** 函数。

合约执行期间发生的错误可分为两种类型：形式错误和环境错误。形式错误使用特殊命令生成：`error, warning, info` 以及当内置函数返回 `err` 不等于 *nil* 时。

needle 语言不处理异常。任何错误都会终止合约的执行。由于在执行合约时创建了用于保存变量值的单独堆栈和结构，所以当合约执行完成时，golang垃圾回收机制将自动删除这些数据。

### 巴科斯范式Backus--Naur Form (BNF) {#backus-naur-form-bnf}

在计算机科学中，BNF是一种用于无上下文语法的符号技术，通常用于描述计算中使用的语言的语法。

-   \<decimal digit\> :

        '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

-   \<decimal number\> :

        <decimal digit> {<decimal digit>}

-   \<symbol code\> :

        '''<any symbol>'''

-   \<real number\> :

        ['-'] <decimal number'.'[<decimal number>]

-   \<integer number\> :

        ['-'] <decimal number> | <symbol code>

-   \<number\> :

        '<integer number> | <real number>'

-   \<letter\> :

        'A' | 'B' | ... | 'Z' | 'a' | 'b' | ... | 'z' | 0x80 | 0x81 | ... | 0xFF

-   \<space\> :

        '0x20'

-   \<tabulation\> :

        '0x09'

-   \<newline\> :

        '0x0D 0x0A'

-   \<special symbol\> :

        '!' | '"' | '$' | ''' | '(' | ')' | '\*' | '+' | ',' | '-' | '.' | '/' | '<' | '=' | '>' | '[' | '\\' | ']' | '_' | '|' | '}' | '{' | <tabulation> | <space> | <newline>

-   \<symbol\> :

        <decimal digit> | <letter> | <special symbol>

-   \<name\> :

        (<letter> | '_') {<letter> | '_' | <decimal digit>}

-   \<function name\> :

        <name>

-   \<variable name\> :

        <name>

-   \<type name\> :

        <name>

-   \<string symbol\> :

        <tabulation> | <space> | '!' | '#' | ... | '[' | ']' | ... 

-   \<string element\> :

        {<string symbol> | '\"' | '\n' | '\r' }

-   \<string\> :

        '"' { <string element> } '"' | '\`'  { <string element> } '\`'

-   \<assignment operator\> :

        '=' 

-   \<unary operator\> :

        '-'

-   \<binary operator\> :

        '==' | '!=' | '>' | '<' | '<=' | '>=' | '&&' | '||' | '\*' | '/' | '+' | '-' 

-   \<operator\> :

        <assignment operator> | <unary operator> | <binary operator>

-   \<parameters\> :

        <expression> {','<expression>}

-   \<contract call\> :

        <contract name> '(' [<parameters>] ')'

-   \<function call\> :

        <contract call> [{'.' <name> '(' [<parameters>] ')'}]

-   \<block contents\> :

        <block command> {<newline><block command>}

-   \<block\> :

        '{'<block contents>'}'

-   \<block command\> :

        (<block> | <expression> | <variables definition> | <if> | <while> | break | continue | return)

-   \<if\> :

        'if <expression><block> [else <block>]'

-   \<while\> :

        'while <expression><block>'

-   \<contract\> :

        'contract <name> '{'[<data section>] {<function>} [<conditions>] [<action>]'}''

-   \<data section\> :

        'data '{' {<data parameter><newline>} '}''

-   \<data parameter\> :

        <variable name> <type name> '"'{<tag>}'"' 

-   \<tag\> :

        'optional | image | file | hidden | text | polymap | map | address | signature:<name>'

-   \<conditions\> :

        'conditions <block>'

-   \<action\> :

        'action <block>'

-   \<function\> :

        'func <function name>'('[<variable description>{','<variable description>}]')'[{<tail>}] [<type name>] <block>'

-   \<variable description\> :

        <variable name> {',' <variable name>} <type name>

-   \<tail\> :

        '.'<function name>'('[<variable description>{','<variable description>}]')'

-   \<variables definition\> :

        'var <variable description>{','<variable description>}'
