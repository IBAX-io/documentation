# Compiler and Virtual Machine {#compiler-and-virtual-machine}

  - [Source code storage and compilation](#source-code-storage-and-compilation)
  - [Virtual machine structures](#virtual-machine-structures)
    - [VM Structure](#vm-structure)
    - [Block structure](#block-structure)
    - [ObjInfo structure](#objinfo-structure)
      - [ContractInfo structure](#contractinfo-structure)
      - [FieldInfo structure](#fieldinfo-structure)
      - [FuncInfo structure](#funcinfo-structure)
      - [FuncName Structure](#funcname-structure)
      - [ExtFuncInfo structure](#extfuncinfo-structure)
      - [VarInfo structure](#varinfo-structure)
      - [ObjExtend value](#objextend-value)
  - [Virtual machine commands](#virtual-machine-commands)
    - [ByteCode structure](#bytecode-structure)
    - [Command identifiers](#command-identifiers)
    - [Stack operation commands](#stack-operation-commands)
    - [Runtime structure](#runtime-structure)
      - [blockStack structure](#blockstack-structure)
    - [RunCode function](#runcode-function)
    - [Other functions for operations with VM](#other-functions-for-operations-with-vm)
  - [Compiler](#compiler)
  - [Lexical analyzer](#lexical-analyzer)
    - [lextable/lextable.go](#lextable-lextable-go)
    - [lex.go](#lex-go)
  - [Needle language](#needle-language)
    - [Lexemes](#lexemes)
    - [Types](#types)
    - [Expressions](#expressions)
    - [Scope](#scope)
    - [Contract execution](#contract-execution)
    - [Backus–Naur Form (BNF)](#backus-naur-form-bnf)

This section involves program compilation and Needle language operations in the Virtual Machine (VM).

## Source code storage and compilation {#source-code-storage-and-compilation}

Contracts and functions are written with Golang and stored in the contract tables of ecosystems.

When a contract is executed, its source code will be read from the database and compiled into bytecode.

When a contract is changed, its source code will be updated and saved in the database. Then, the source code is compiled, thereby updating the bytecode in the corresponding virtual machine. 

As bytecodes are not physically saved, it will be compiled anew when the program is executed again.

The entire source code described in the contract table of each ecosystem is compiled into a virtual machine in strict order, and the status of the virtual machine is the same on all nodes.

When the contract is called, the virtual machine will not change its status in any way. The execution of any contract or calling of any function occurs on a separate running stack created during each external call.

Each ecosystem can have a so-called virtual ecosystem, which can be used within a node in conjunction with tables outside the blockchain, without direct affection on the blockchain or other virtual ecosystems. In this case, the node hosting such a virtual ecosystem will compile its contract and create its own virtual machine.

## Virtual machine structures {#virtual-machine-structures}

### VM Structure {#vm-structure}

A virtual machine is organized in memory as a structure like below.
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

A VM structure has the following elements:
* Block - contains a [block structure](#block-structure);
* ExtCost - a function returns the cost of executing an external golang function;
* FuncCallsDB - a collection of Golang function names. This function returns the execution cost as the first parameter. These functions use EXPLAIN to calculate the cost of database processing;
* Extern - a Boolean flag indicating whether a contract is an external contract. It is set to true when a VM is created. Contracts called are not displayed when the code is compiled. In other words, it allows to call the contract code determined in the future;
* ShiftContract - ID of the first contract in the VM;
* logger - VM error log output.

### Block structure {#block-structure}

A virtual machine is a tree composed of **Block type** objects.

A block is an independent unit that contains some bytecodes. In simple terms, everything you put in the braces (`{}`) in the language is a block.

For example, the following code would create a block with functions. This block also contains another block with an if statement, which contains a block with a while statement.

```
func my() {
   if true {
      while false {
      ...
      }
   }
}
```

The block is organized in the memory as a structure like below.
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

A block structure consists of the following elements:

* **Objects** - a map of internal objects of the pointer type [ObjInfo](#objinfo-structure). For example, if there is a variable in the block, you can get information about it by its name;
* **Type** - the type of the block. For a function block, its type is **ObjFunc**; for a contract block, its type is **ObjContract**;
* **Owner** - a structure of **OwnerInfo** pointer type. This structure contains information about the owner of the compiled contract, which is specified during contract compilation or obtained from the **contracts** table;
* **Info** - it contains information about the object, which depends on the block type;
* **Parent** - a pointer to the parent block;
* **Vars** - an array containing the types of current block variables;
* **Code** - the bytecode of the block itself, which will be executed when the control rights are passed to the block, for example, function calls or loop bodies;
* **Children** - an array containing sub-blocks, such as function nesting, loops, conditional operators.

### ObjInfo structure {#objinfo-structure}

The ObjInfo structure contains information about internal objects.

```
type ObjInfo struct {
   Type int
   Value interface{}
}
```

The ObjInfo structure has the following elements:

* **Type** is the object type, which has any of the following values:

   * **ObjContract** – [contract](#contractinfo-structure);
   * **ObjFunc** - function;
   * **ObjExtFunc** - external golang function;
   * **ObjVar** - variable;
   * **ObjExtend** - $name variable.
* **Value** – it contains the structure of each type.

#### ContractInfo structure {#contractinfo-structure}

Pointing to the **ObjContract** type, and the **Value** field contains a **ContractInfo** structure.

```
type ContractInfo struct {
   ID uint32
   Name string
   Owner *OwnerInfo
   Used map[string]bool
   Tx *[]*FieldInfo
}
```

The ContractInfo structure has the following elements:

* **ID** - contract ID, displayed in the blockchain when calling the contract;
* **Name** - contract name;
* **Owner** - other information about the contract;
* **Used** - map of contracts names that has been called;
* **Tx** - a data array described in the [data section](script.md#data-section) of the contract.

#### FieldInfo structure {#fieldinfo-structure}

The FieldInfo structure is used in the **ContractInfo** structure and describes elements in [data section](script.md#data-section) of a contract.

```
type FieldInfo struct {
   Name string
   Type reflect.Type
   Original uint32
   Tags string
}
```

The FieldInfo structure has the following elements:

* **Name** - field name;
* **Type** - field type;
* **Original** - optional field;
* **Tags** - additional labels for this field.

#### FuncInfo structure {#funcinfo-structure}

Pointing to the ObjFunc type, and the Value field contains a FuncInfo structure.


```
type FuncInfo struct {
   Params []reflect.Type
   Results []reflect.Type
   Names *map[string]FuncName
   Variadic bool
   ID uint32
}
```

The FuncInfo structure has the following elements:

* **Params** - an array of parameter types;
* **Results** - an array of returned types;
* **Names** - map of data for tail functions, for example, `DBFind().Columns ()`;
* **Variadic** - true if the function can have a variable number of parameters;
* **ID** - function ID.

#### FuncName Structure {#funcname-structure}

The FuncName structure is used for FuncInfo and describes the data of a tail function.
```
type FuncName struct {
   Params []reflect.Type
   Offset []int
   Variadic bool
}
```

The FuncName structure has the following elements:

* **Params** - an array of parameter types;
* **Offset** - the array of offsets for these variables. In fact, the values of all parameters in a function can be initialized with the dot .;
* **Variadic** - true if the tail function can have a variable number of parameters.

#### ExtFuncInfo structure {#extfuncinfo-structure}

Pointing to the ObjExtFunc type, and the Value field contains a ExtFuncInfo structure. It is used to describe golang functions.
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

The ExtFuncInfo structure has the following elements:

* **Name**, **Params**, **Results** parameters have the same structure as [FuncInfo](#funcinfo-structure);
* **Auto** - an array of variables. If any, passes to the function as an additional parameter. For example, a variable of type SmartContract sc;
* **Func** - golang functions.

#### VarInfo structure {#varinfo-structure}

Pointing to the **ObjVar** type, and the **Value** field contains a **VarInfo** structure.
```
type VarInfo struct {
   Obj *ObjInfo
   Owner *Block
}
```

The VarInfo structure has the following elements:

* **Obj** - information about the type and value of the variable;
* **Owner** - Pointer to the owner block.

#### ObjExtend value {#objextend-value}

Pointing to the **ObjExtend** type, and the **Value** field contains a string containing the name of the variable or function.

## Virtual machine commands {#virtual-machine-commands}
### ByteCode structure {#bytecode-structure}

A bytecode is a sequence of **ByteCode** type structures.
```
type ByteCode struct {
   Cmd uint16
   Value interface{}
}
```

This structure has the following fields:

* **Cmd** - the identifier of the storage commands;
* **Value** - contains the operand (value).

In general, commands perform an operation on the top element of the stack and writes the result value into it if necessary.

### Command identifiers {#command-identifiers}

Identifiers of the virtual machine commands are described in the vm/cmds_list.go file.

* **cmdPush** – put a value from the Value field to the stack. For example, put numbers and lines to the stack;
* **cmdVar** - put the value of a variable to the stack. Value contains a pointer to the VarInfo structure and information about the variable;
* **cmdExtend** – put the value of an external variable to the stack. Value contains a string with the variable name (starting with $);
* **cmdCallExtend** – call an external function (starting with `$`). The parameters of the function are obtained from the stack, and the results are placed to the stack. Value contains a function name (starting with `$`);
* **cmdPushStr** – put the string in Value to the stack;
* **cmdCall** - calls the virtual machine function. Value contains a **ObjInfo** structure. This command is applicable to the **ObjExtFunc** golang function and **ObjFunc** Needle function. If a function is called, its parameters will be obtained from the stack and the result values will be placed to the stack;
* **cmdCallVari** - similar to the **cmdCall** command, it calls the virtual machine function. This command is used to call a function with a variable number of parameters;
* **cmdReturn** - used to exit the function. The return values will be put to the stack, and the Value field is not used;
* **cmdIf** – transfer control to the bytecode in the **block** structure, which is passed in the Value field. The control will be transferred to the stack only when the top element of the stack is called by the *valueToBool* function and returned `true`. Otherwise, the control will be transferred to the next command;
* **cmdElse** - this command works in the same way as the **cmdIf**, but only when the top element of the stack is called by the valueToBool function and returned `false`, the control will be transferred to the specified block;
* **cmdAssignVar** – get a list of variables of type **VarInfo** from Value. These variables use the **cmdAssign** command to get the value;
* **cmdAssign** – assign the value in the stack to the variable obtained by the **cmdAssignVar** command;
* **cmdLabel** - defines a label when control is returned during the while loop;
* **cmdContinue** - this command transfers control to the **cmdLabel** label. When executing a new iteration of the loop, Value is not used;
* **cmdWhile** – use valueToBool to check the top element of the stack. If this value is `true`, the **block** structure will be called from the value field;
* **cmdBreak** - exits the loop;
* **cmdIndex** – put the value in map or array into the stack by index, without using Value. For example, `(map | array) (index value) => (map | array [index value])`;
* **cmdSetIndex** – assigns the value of the top element of the stack to elements of map or array, without using Value. For example, `(map | array) (index value) (value) => (map | array)`;
* **cmdFuncName** - adds parameters that are passed using sequential descriptions divided by dot . For example, `func name => Func (...) .Name (...)`;
* **cmdUnwrapArr** - defines a Boolean flag if the top element of the stack is an array;
* **cmdMapInit** – initializes the value of map;
* **cmdArrayInit** – initializes the value of array;
* **cmdError** - this command is created when a contract or function terminates with a specified `error, warning, info`.

### Stack operation commands {#stack-operation-commands}
> Note

> In the current version, automatic type conversion is not fully applicable for these commands. For example, 

> `string + float | int | decimal => float | int | decimal, float + int | str => float, but int + string => runtime error`.

The following are commands for direct stack processing. The Value field is not used in these commands.

* **cmdNot** - logical negation. `(val) => (!ValueToBool(val))`;
* **cmdSign** - change of sign. `(val) => (-val)`;
* **cmdAdd** - addition. `(val1)(val2) => (val1 + val2)`;
* **cmdSub** - subtraction. `(val1)(val2) => (val1-val2)`;
* **cmdMul** - multiplication. `(val1)(val2) => (val1 * val2)`;
* **cmdDiv** - division. `(val1)(val2) => (val1 / val2)`;
* **cmdAnd** - logical AND. `(val1)(val2) => (valueToBool(val1) && valueToBool(val2))`;
* **cmdOr** - logical OR. `(val1)(val2) => (valueToBool(val1) || valueToBool(val2))`;
* **cmdEqual** - equality comparison, bool is returned. `(val1)(val2) => (val1 == val2)`;
* **cmdNotEq** - inequality comparison, bool is returned. `(val1)(val2) => (val1 != val2)`;
* **cmdLess** - less-than comparison, bool is returned. `(val1)(val2) => (val1 <val2)`;
* **cmdNotLess** - greater-than-or-equal comparison, bool is returned. `(val1)(val2) => (val1 >= val2)`;
* **cmdGreat** - greater-than comparison, bool is returned. `(val1)(val2) => (val1> val2)`;
* **cmdNotGreat** - less-than-or-equal comparison, bool is returned. `(val1)(val2) => (val1 <= val2)`.

### Runtime structure {#runtime-structure}

The execution of bytecodes will not affect the virtual machine. For example, it allows various functions and contracts to run simultaneously in a single virtual machine. The Runtime structure is used to run functions and contracts, as well as any expressions and bytecode.
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

* **stack** - the stack to execute the bytecode;
* **blocks** - block calls stack;
* **vars** - stack of variables. Its variable will be added to the stack of variables when the bytecode is called in the block. After exiting the block, the size of the stack of variables will return to the previous value;
* **extend** - a pointer to map with values of external variables (`$name`);
* **vm** - a virtual machine pointer;
* **cost** - fuel unit of the resulting cost of execution;
* **err** - error occurred during execution.

#### blockStack structure {#blockstack-structure}

The blockStack structure is used in the Runtime structure.
```
type blockStack struct {
   Block *Block
   Offset int
}
```

* **Block** - a pointer to the block being executed;
* **Offset** – the offset of the last command executed in the bytecode of the specified block.

### RunCode function {#runcode-function}

Bytecodes are executed in the **RunCode** function. It contains a loop that performs the corresponding operation for each bytecode command. Before processing a bytecode, the data required must be initialized.

New blocks are added to other blocks.

```
rt.blocks = append(rt.blocks, &blockStack{block, len(rt.vars)})
```

Next, get the information of relevant parameters of the tail function. These parameters are contained in the last element of the stack.
```
var namemap map[string][]interface{}
if block.Type == ObjFunc && block.Info.(*FuncInfo).Names != nil {
   if rt.stack[len(rt.stack)-1] != nil {
      namemap = rt.stack[len(rt.stack)-1].(map[string][]interface{})
   }
   rt.stack = rt.stack[:len(rt.stack)-1]
}
```

Then, all variables defined in the current block must be initialized with their initial values.
```
start := len(rt.stack)
varoff := len(rt.vars)
for vkey, vpar := range block.Vars {
   rt.cost--
   var value interface{}
```
Since variables in the function are also variables, we need to retrieve them from the last element of the stack in the order described by the function itself.
```
   if block.Type == ObjFunc && vkey <len(block.Info.(*FuncInfo).Params) {
      value = rt.stack[start-len(block.Info.(*FuncInfo).Params)+vkey]
   } else {
```

Initialize local variables with their initial values.
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

Next, update the values of variable parameters passed in the tail function.
```
if namemap != nil {
   for key, item := range namemap {
      params := (*block.Info.(*FuncInfo).Names)[key]
      for i, value := range item {
         if params.Variadic && i >= len(params.Params)-1 {
```

If variable parameters passed belongs to a variable number of parameters, then these parameters will be combined into an array of variables.
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

After that, all we have to do is delete values passed from the top of the stack as function parameters, thereby moving the stack. We have copied their values into a variable array.

```
if block.Type == ObjFunc {
   start -= len(block.Info.(*FuncInfo).Params)
}
```


When a bytecode command loop finished, we must clear the stack correctly.
```
last := rt.blocks[len(rt.blocks)-1]
```

Delete the current block from the stack of blocks.

```
rt.blocks = rt.blocks[:len(rt.blocks)-1]
if status == statusReturn {
```

If successfully exited from a function already executed, we will add the return value to the end of the previous stack.
```
   if last.Block.Type == ObjFunc {
      for count := len(last.Block.Info.(*FuncInfo).Results); count > 0; count-- {
         rt.stack[start] = rt.stack[len(rt.stack)-count]
         start++
      }
      status = statusNormal
   } else {
```
As you can see, if we do not execute the function, then we will not restore the stack status and exit the function as is. The reason is that loops and conditional structures that have been executed in the function are also bytecode blocks.
```
   return

   }
}

rt.stack = rt.stack[:start]
```

### Other functions for operations with VM {#other-functions-for-operations-with-vm}

Your may create a virtual machine with the **NewVM** function. Each virtual machine will be added with four functions, such as **ExecContract**, **MemoryUsage**, **CallContract**, and **Settings**, through the **Extend** function.

```
for key, item := range ext.Objects {
   fobj := reflect.ValueOf(item).Type()
```

We traverse all the objects passed and only look at the functions.

```
   switch fobj.Kind() {
   case reflect.Func:
```
We fill the **ExtFuncInfo** structure according to the information received about the function, and add its structure to the top level map **Objects** by name. 

```
   data := ExtFuncInfo{key, make([]reflect.Type, fobj.NumIn()), make([]reflect.Type, fobj.NumOut()),
   make([]string, fobj.NumIn()), fobj.IsVariadic(), item}
   for i := 0; i <fobj.NumIn(); i++ {
```

The **ExtFuncInfo** structure has an **Auto** parameter array. Usually the first parameter is `sc *SmartContract` or `rt *Runtime`, we cannot pass them from theNeedle language, because they are necessary for us to execute some golang functions. Therefore, we specify that these variables will be used automatically when these functions are called. In this case, the first parameter of the above four functions is `rt *Runtime`.
```
   if isauto, ok := ext.AutoPars[fobj.In(i).String()]; ok {
      data.Auto[i] = isauto
   }
```

Information about assigning the parameters.
```
      data.Params[i] = fobj.In(i)
   }
```

And the types of return values.
```
for i := 0; i <fobj.NumOut(); i++ {
   data.Results[i] = fobj.Out(i)
}
```
Adds a function to the root **Objects** so that the compiler can find them later when using the contract.
```
      vm.Objects[key] = &ObjInfo{ObjExtFunc, data}
   }

}
```

## Compiler {#compiler}

Functions in the compile.go file are responsible for compiling the array of tokens obtained from the lexical analyzer. Compilation can be divided into two levels conditionally. At the top level, we deal with functions, contracts, code blocks, conditional and loop statements, variable definitions, and so on. At the lower level, we compile expressions in code blocks or conditions in loops and conditional statements.

First, we will start from the simple lower level. In the **compileEval** function, expressions can be converted to bytecode. Since we use a virtual machine with a stack, it is necessary to convert ordinary infix record expressions into postfix notation or reverse Polish notation. For example, we convert `1+2` to `12+` and put `1` and `2` to the stack. Then, we apply the addition operation to the last two elements in the stack and write the result to the stack. You can find this [conversion](https://master.virmandy.net/perevod-iz-infiksnoy-notatsii-v-postfiksnuyu-obratnaya-polskaya-zapis/) algorithm on the Internet.

The global variable `opers = map [uint32] operPrior` contains the priority of operations required for conversion to inverse Polish notation.

The following variables are defined at the beginning of the **compileEval** function:

* **buffer** - temporary buffer for bytecode commands;
* **bytecode** - final buffer of bytecode commands;
* **parcount** - temporary buffer used to calculate parameters when calling a function;
* **setIndex** - variables in the work process will be set to true when we assign map or array elements. For example, `a["my"] = 10`. In this case, we need to use the specified **cmdSetIndex** command.

We get a token in a loop and process it accordingly. For example, expression paring will be stopped if braces are found. When moving the string, we check whether the previous statement is an operation and whether it is inside the parentheses, otherwise it will exit the expression is parsed.

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

In general, the algorithm itself corresponds to an algorithm for converting to inverse Polish notation. With the consideration of the calling of necessary contracts, functions, and indexes, as well as other things not encountered during parsing and options for parsing lexIdent type tokens, then, variables, functions or contracts with this name will be checked. If nothing is found and this is not a function or contract call, then it will indicate an error.

```
objInfo, tobj := vm.findObj(lexem.Value.(string), block)
if objInfo == nil && (!vm.Extern || i> *ind || i >= len(*lexems)-2 || (*lexems)[i+1].Type != isLPar) {
   return fmt.Errorf(`unknown identifier %s`, lexem.Value.(string))
}
```

We may encounter such a situation, and the contract call will be described later. In this example, if no functions or variables with the same name are found, then we think it is necessary to call a contract. In this compiled language, there is no difference between contracts and function calls. But we need to call the contract through the **ExecContract** function used in the bytecode.

```
if objInfo.Type == ObjContract {
   if objInfo.Value != nil {
      objContract = objInfo.Value.(*Block)
   }
   objInfo, tobj = vm.findObj(`ExecContract`, block)
   isContract = true
}
```

We record the number of variables so far in `count`, which will also be written to the stack along with the number of function parameters. In each subsequent detection of parameters, we only need to increase this number by one unit at the last element of the stack.

```
count := 0
if (*lexems)[i+2].Type != isRPar {
   count++
}
```

We have a list Used of called parameters for contracts, then we need to mark the case of the contract is called. If the contract is called without parameters, we must add two empty parameters to call **ExecContract** to get at least two parameters.

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

The **CompileBlock** function can generate object trees and expression-independent bytecodes. The compilation process is based on a finite state machine, just like a lexical analyzer, but with the following differences. First, we do not use symbols but tokens; second, we will immediately describe the *states* variables in all states and transitions. It represents an array of objects indexed by token type. Each token has a structure of *compileState*, and a new state is specified in *NewState*. If it is clear what structure we have resolved, we can specify the function of the handler in the *Func* field.

Let us review the main state as an example.

If we encounter a newline or comment, then we will remain in the same state. If we encounter the **contract** keyword, then we change the state to *stateContract* and start parsing the structure. If we encounter the **func** keyword, then we change the state to *stateFunc*. If other tokens are received, the function generating error will be called.

```
{// stateRoot
   lexNewLine: {stateRoot, 0},
   lexKeyword | (keyContract << 8): {stateContract | statePush, 0},
   lexKeyword | (keyFunc << 8): {stateFunc | statePush, 0},
   lexComment: {stateRoot, 0},
   0: {errUnknownCmd, cfError},
},
```

Suppose we encountered the **func** keyword and we have changed the state to *stateFunc*. Since the function name must follow the **func** keyword, we will keep the same state when changing the function name. For all other tokens, we will generate corresponding errors. If we get the function name in the token identifier, then we go to the *stateFParams* state, where we can get the parameters of the function.

```
{// stateFunc
   lexNewLine: {stateFunc, 0},
   lexIdent: {stateFParams, cfNameBlock},
   0: {errMustName, cfError},
},
```

At the same time as the above operations, we will call the **fNameBlock** function. It should be noted that the Block structure is created with the statePush mark, where we get it from the buffer and fill it with the data we need. The **fNameBlock** function is suitable for contracts and functions (including those nested in them). It fills the *Info* field with the corresponding structure and writes itself into the *Objects* of the parent block. In this way, we can call the function or contract with the specified name. Similarly, we create corresponding functions for all states and variables. These functions are usually very small and perform some duties when constructing the virtual machine tree.

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

For the **CompileBlock** function, it just traverses all the tokens and switches states according to the tokens described in states. Almost all additional tokens correspond to additional program codes.

* **statePush** – adds the **Block** object to the object tree;
* **statePop** - used when the block ends with a closing brace;
* **stateStay** - you need to keep the current mark when changing to a new state;
* **stateToBlock** - transition to the **stateBlock** state for processing *while* and *if*. After processing expressions, you need to process blocks within the braces;
* **stateToBody** - transition to the **stateBody** state;
* **stateFork** - save the marked position. When the expression starts with an identifier or a name with `$`, we can make function calls or assignments;
* **stateToFork** – used to get the token stored in **stateFork**, which will be passed to the process function;
* **stateLabel** – used to insert **cmdLabel** commands. *while* structure requires this flag;
* **stateMustEval** – check the availability of conditional expressions at the beginning of *if* and *while* structures.

In addition to the **CompileBlock** function, the **FlushBlock** function should also be mentioned. But the problem is that the block tree is constructed independently of existing virtual machines. More precisely, we obtain information about functions and contracts that exist in a virtual machine, but we collect the compiled blocks into a separate tree. Otherwise, if an error occurs during compilation, we must roll back the virtual machine to the previous state. Therefore, we go to the compilation tree separately, but after the compilation is successful, the **FlushContract** function must be called. This function adds the completed block tree to the current virtual machine. The compilation phase is now complete.

## Lexical analyzer {#lexical-analyzer}

The lexical analyzer processes incoming strings and forms a sequence of tokens of the following types :

* **lexSys** - system token, for example: `{}, [], (), ,, .` etc;
* **lexOper** - operation token, for example: `+, -, /, \, *`;
* **lexNumber** - number;
* **lexident** - identifier;
* **lexNewline** - newline character;
* **lexString** - string;
* **lexComment** - comment;
* **lexKeyword** - keyword;
* **lexType** - type;
* **lexExtend** - reference to external variables or functions, for example: `$myname`.

In the current version, a conversion table (finite state machine) is initially constructed with the help of the [lextable.go](#lextable-lextable-go) file to parse the tokens, which is written to the lex_table.go file. In general, you can get rid of the conversion table initially generated by the file and create a conversion table in the memory (`init()`) immediately upon startup. The lexical analysis itself occurs in the lexParser function in the [lex.go](#lex-go) file.

### lextable/lextable.go {#lextable-lextable-go}

Here we define the alphabet to operate and describe how the finite state machine changes from one state to another based on the next received symbol.

*states* is a JSON object containing a list of states.

Except for specific symbols, `d` stands for all symbols not specified in the state.
`n` stands for 0x0a, `s` stands for space, `q` stands for backquote, `Q` stands for double quote, `r` stands for character >= 128, `a` stands for AZ and az, and `1` stands for 1- 9.

The name of these states are keys, and the possible values are listed in the value object. Then, there is a new state to make transitions for each group. Then there is the name of the token. If we need to return to the initial state, the third parameter is the service token, which indicates how to handle the current symbol.

For example, we have the main state and the incoming characters `/`, `"/": ["solidus", "", "push next"]`,

* **push** - gives the command to remember that it is in a separate stack ;

* **next** - goes to the next character, and at the same time we change the status to **solidus**. After that, gets the next character and check the status of **solidus**.

If the next character has `/` or `/*`, then we go to the comment **comment** state because they start with `//` or `/*`. Obviously, each comment has a different state afterwards, because they end with a different symbol.

If the next character is not `/` and `*`, then we record everything in the stack as **lexOper** type tags, clear the stack and return to the main state.

The following module converts the state tree into a numeric array and writes it into the *lex_table.go* file.

In the first loop:

We form an alphabet of valid symbols.

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

### lex-go {#lex-go}
The **lexParser** function directly generates lexical analysis and returns an array of received tags based on incoming strings. Let us analyze the structure of tokens.

```
type Lexem struct {
   Type  uint32 // Type of the lexem
   Value interface{} // Value of lexem
   Line  uint32 // Line of the lexem
   Column uint32 // Position inside the line
}
```

* **Type** - token type. It has one of the following values: `lexSys, lexOper, lexNumber, lexIdent, lexString, lexComment, lexKeyword, lexType, lexExtend`;

* **Value** – token value. The type of value depends on the token type, Let us analyze it in more detail:
   * **lexSys** - includes brackets, commas, etc. In this case, `Type = ch << 8 | lexSys`, please refer to the `isLPar ... isRBrack` constant, and its value is uint32 bits;
   * **lexOper** - the value represents an equivalent character sequence in the form of uint32. See the `isNot ... isOr` constants;
   * **lexNumber** - numbers are stored as int64 or float64. If the number has a decimal point, it is float64;
   * **lexIdent** - identifiers are stored as string;
   * **lexNewLine** - newline character. Also used to calculate the row and token position;
   * **lexString** - lines are stored as string;
   * **lexComment** - comments are stored as string;
   * **lexKeyword** - for keywords, only the corresponding indexes are stored, see the `keyContract ... keyTail` constant. In this case `Type = KeyID << 8 | lexKeyword`. In addition, it should be noted that the `true, false, nil` keywords will be immediately converted to lexNumber type tokens, and the corresponding `bool` and `intreface {}` types will be used;
   * **lexType** – this value contains the corresponding `reflect.Type` type value;
   * **lexExtend** – identifiers beginning with a `$`. These variables and functions are passed from the outside and are therefore assigned to special types of tokens. This value contains the name as a string without a $ at the beginning.

* **Line** - the line where the token is found;

* **Column** - in-line position of the token.

Let us analyze the **lexParser** function in detail. The **todo** function looks up the symbol index in the alphabet based on the current state and the incoming symbol, and obtains a new state, token identifier (if any), and other tokens from the conversion table. The parsing itself involves calling the **todo** function in turn for each next character and switching to a new state. Once the tag is received, we create the corresponding token in the output criteria and continue the parsing process. It should be noted that during the parsing process, we do not accumulate the token symbols into a separate stack or array, because we only save the offset of the start of the token. After getting the token, we move the offset of the next token to the current parsing position.

All that remains is to check the lexical status tokens used in the parsing:

* **lexfPush** - this token means that we start to accumulate symbols in a new token;
* **lexfNext** - the character must be added to the current token;
* **lexfPop** - the receipt of the token is complete. Usually, with this flag we have the identifier type of the parsed token;
* **lexfSkip** - this token is used to exclude characters from parsing. For example, the control slashes in the string are \n \r \". They will be automatically replaced during the lexical analysis stage.

## Needle language {#needle-language}
### Lexemes {#lexemes}

The source code of a program must be in UTF-8 encoding.

The following lexical types are processed:

* **Keywords** - ```action, break, conditions, continue, contract, data, else, error, false, func, If, info, nil, return, settings, true, var, warning, while```;
* **Number** - only decimal numbers are accepted. There are two basic types: **int** and **float**. If the number has a decimal point, it becomes a float **float**. **int** type is equivalent to **int64** in golang, while **float** type is equivalent to **float64** in golang.
* **String** - the string can be enclosed in double quotes ```("a string")``` or backquotes ```(\`a string\`)```. Both types of strings can contain newline characters. Strings in double quotes can contain double quotes, newline characters, and carriage returns escaped with slashes. For example, ```"This is a \"first string\".\r\nThis is a second string."```.
* **Comment** - there are two types of comments. Single-line comments use two slashes (//). For example, // This is a single-line comment. Multi-line comments use slash and asterisk symbols and can span multiple lines. For example, ```/* This is a multi-line comment */```.
* **Identifier** - the names of variables and functions composed of a-z and A-Z letters, UTF-8 symbols, numbers and underscores. The name can start with a letter, underscore, ```@``` or ```$```. The name starting with ```$``` is the name of the variable defined in the **data section**. The name starting with ```$``` can also be used to define global variables in the scope of **conditions** and **action sections**. Ecosystem contracts can be called using the ```@``` symbol. For example: ```@1NewTable(...)```.

### Types {#types}

Corresponding golang types are specified next to theNeedle types.

* **bool** - bool, **false** by default;
* **bytes** - []byte{}, an empty byte array by default;
* **int** - int64, **0** by default;
* **address** - uint64, **0** by default;
* **array** - []interface{}, an empty array by default;
* **map** - map[string]interface{}, an empty object array by default;
* **money** - decimal. Decimal, **0** by default;
* **float** - float64, **0** by default;
* **string** - string, an empty string by default;
* **file** - map[string]interface{}, an empty object array by default.

These types of variables are defined with the ```var``` keyword. For example, ```var var1, var2 int```. When defined in this way, a variable will be assigned with a default value by type.

All variable values are of the interface{} type, and then they are assigned to the required golang types. Therefore, for example, array and map types are golang types []interface{} and map[string]interface{}. Both types of arrays can contain elements of any type.

### Expressions {#expressions}

An expression may include arithmetic operations, logical operations, and function calls. All expressions are evaluated from left to right by priority of operators. If having an equal priority, operators are evaluated from left to right.

Priority of operations from high to low:

* **Function call and parentheses** - when a function is called, passed parameters will be calculated from left to right;
* **Unary Operation** - logical negation ```!``` and arithmetic sign change ```-```;
* **Multiplication and Division** - arithmetic multiplication ```*``` and division ```/```;
* **Addition and Subtraction** - arithmetic addition ```+``` and subtraction ```-```;
* **Logical comparison** - ```>=>> >=```;
* **Logical equality and inequality** - ```== !=```;
* **Logical AND** - ```&&```;
* **Logical OR** - ```||```.

When evaluating logical AND and OR, both sides of the expression are evaluated in any case.

Needle has no type checking during compilation. When evaluating operands, an attempt is made to convert the type to a more complex type. The type of complexity order can be as follows: ```string, int, float, money```. Only part of the type conversions is implemented. The string type supports addition operations, and the result will be string concatenation. For example, ```string + string = string, money-int = money, int * float = float```.

For functions, type checking is performed on the ```string``` and ```int``` types during execution.

**array** and **map** types can be addressed by index. For the **array** type, the **int** value must be specified as the index. For the **map** type, a variable or **string** value must be specified. If you assign a value to an **array** element whose index is greater than the current maximum index, an empty element will be added to the array. The initial value of these elements is **nil**. For example: .. code:
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

### Scope {#scope}

Braces specify a block that can contain local scope variables. By default, the scope of a variable extends to its own blocks and all nested blocks. In a block, you can define a new variable using the name of an existing variable. However, in this case, external variables with the same name become unavailable.
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

### Contract execution {#contract-execution}

When calling a contract, parameters defined in **data** must be passed to it. Before executing a contract, the virtual machine receives these parameters and assigns them to the corresponding variables ($Param). Then, the predefined **conditions** function and **action** function are called.

Errors that occur during contract execution can be divided into two types: form errors and environment errors. Form errors are generated using special commands: `error, warning, info` and when the built-in function returns `err` not equal to *nil*.

The Needle language does not handle exceptions. Any error will terminate the execution of contracts. Since a separate stack and structure for saving variable values are created when a contract is executed, the golang garbage collection mechanism will automatically delete these data when a contract is executed.

### Backus–Naur Form (BNF) {#backus-naur-form-bnf}

In computer science, BNF is a notation technique for context-free syntax and is usually used to describe the syntax of the language used in computing.

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


