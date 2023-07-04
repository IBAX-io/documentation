# Compilador y máquina virtual {#compiler-and-virtual-machine}

<!-- TOC -->
  - [Almacenamiento y compilación de código fuente](#source-code-storage-and-compilation)
  - [Estructuras de la máquina virtual](#virtual-machine-structures)
    - [Estructura VM](#vm-structure)
    - [Estructura de bloque](#block-structure)
    - [Estructura ObjInfo](#objinfo-structure)
      - [Estructura ContractInfo](#contractinfo-structure)
        - [Estructura FieldInfo](#fieldinfo-structure)
      - [Estructura FuncInfo](#funcinfo-structure)
        - [Estructura FuncName](#funcname-structure)
      - [Estructura ExtFuncInfo](#extfuncinfo-structure)
      - [Estructura VarInfo](#varinfo-structure)
      - [Valor ObjExtend](#objextend-value)
  - [Instrucciones de la máquina virtual](#virtual-machine-commands)
    - [Estructura ByteCode](#bytecode-structure)
    - [Identificadores de comando](#command-identifiers)
    - [Instrucciones de operación de pila](#stack-operation-commands)
    - [Estructura Runtime](#runtime-structure)
      - [Estructura blockStack](#blockstack-structure)
    - [Función RunCode](#runcode-function)
    - [Otras funciones de la VM](#other-functions-for-operations-with-vm)
  - [Compilador](#compiler)
  - [Analizador léxico](#lexical-analyzer)
    - [lextable/lextable.go](#lextable-lextable-go)
    - [lex.go](#lex-go)
  - [Lenguaje Needle](#needle-language)
    - [Lexemas](#lexemes)
    - [Tipos](#types)
    - [Expresiones](#expressions)
    - [Ámbito](#scope)
    - [Ejecución de contratos](#contract-execution)
    - [Forma Backus-Naur (BNF)](#backus-naur-form-bnf)


<!-- /TOC -->

Esta sección cubre la compilación de programas y operaciones en el lenguaje Needle en la máquina virtual.

## Almacenamiento y compilación de código fuente {#source-code-storage-and-compilation}

Los contratos inteligentes y las funciones están escritos en lenguaje Go y se almacenan en la tabla de contratos inteligentes del ecosistema.

Al ejecutar un contrato inteligente, se lee su código fuente de la base de datos y se compila en bytecode.

Cuando se realiza un cambio en el contrato inteligente, su código fuente se actualiza y se guarda en la base de datos. Luego, se compila el código fuente, lo que resulta en un cambio en el bytecode correspondiente.

El bytecode no se almacena físicamente en ningún lugar, por lo que cuando se ejecuta el programa nuevamente, se vuelve a compilar el código fuente.

Todo el código fuente descrito en la tabla de contratos inteligentes del ecosistema se compila estrictamente en orden en una máquina virtual, cuyo estado es el mismo en todos los nodos.

Cuando se llama a un contrato inteligente, la máquina virtual no cambia su estado de ninguna manera. La ejecución de cualquier contrato inteligente o llamada a función ocurre en una pila de ejecución separada creada en cada llamada externa.

Cada ecosistema puede tener un llamado "ecosistema virtual", que se puede utilizar junto con una tabla de datos fuera de la cadena en un solo nodo y no puede afectar directamente a la cadena de bloques o a otros ecosistemas virtuales. En este caso, el nodo que aloja este ecosistema virtual compilará sus contratos inteligentes y creará su propia máquina virtual.

## Estructuras de la máquina virtual  {#virtual-machine-structures}

### Estructura VM {#vm-structure}

La máquina virtual se define en la memoria de acuerdo con la siguiente estructura.

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

La estructura VM tiene los siguientes elementos:

> - **Block** - Contiene una [estructura de bloque](#block-structure);
> - **ExtCost** - Una función que devuelve el costo de ejecución de una función externa de Golang;
> - **FuncCallsDB** - Una colección de nombres de funciones de Golang que devuelven el costo de procesamiento de la base de datos como primer parámetro. Estas funciones utilizan **EXPLAIN** para calcular el costo;
> - **Extern** - Una identificación booleana que indica si el contrato inteligente es externo. Cuando se crea la VM, se establece en verdadero y no es necesario llamar explícitamente al contrato inteligente compilado. Esto permite llamar al código del contrato inteligente que se determinará en el futuro;
> - **ShiftContract** - El ID del primer contrato inteligente en la VM;
> - **logger** - La salida de registro de errores de la VM.

### Estructura de bloque {#block-structure}

La máquina virtual está compuesta por un árbol de objetos del tipo **Block type**.

Un bloque es una unidad independiente que contiene algunos bytes de código. En pocas palabras, todo lo que se coloca dentro de los corchetes (`{}`) de un lenguaje es un bloque.

Por ejemplo, el siguiente código crea un bloque con una función. Este bloque contiene otro bloque con una declaración *if*, que a su vez contiene otro bloque con una declaración *while*.

``` 
func my() {
     if true {
          while false {
               ...
           }
     }
} 
```

El bloque se define en la memoria con la siguiente estructura:

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

La estructura de bloque tiene los siguientes elementos:

> -   **Objects** - Un mapeo de objetos internos de tipo puntero [ObjInfo](#objinfo-structure). Por ejemplo, si hay una variable en el bloque, se puede obtener información sobre ella a través de su nombre;
> -   **Typeo** - El tipo de bloque. Cuando el bloque es una función, el tipo es **ObjFunc**. Cuando el bloque es un contrato inteligente, el tipo es **ObjContract**;
> -   **Owner** - Una estructura de tipo puntero **OwnerInfo**. Esta estructura contiene información sobre el propietario del contrato inteligente compilado. Se especifica durante la compilación del contrato inteligente o se obtiene de la tabla **contracts**;
> -   **Info** - Contiene información sobre el objeto, que depende del tipo de bloque;
> -   **Parent** - Un puntero que apunta al bloque padre;
> -   **Vars** - Un array que contiene el tipo de variables del bloque actual;
> -   **Code** - El bytecode del bloque en sí mismo, que se ejecutará cuando el control se transfiera a este bloque, por ejemplo, en una llamada de función o en un bucle;
> -   **Children*** - Un array que contiene bloques secundarios, como funciones anidadas, bucles y operadores condicionales.

### Estructura ObjInfo {#objinfo-structure}

La estructura **ObjInfo** contiene información sobre objetos internos.

``` 
type ObjInfo struct {
   Type int
   Value interface{}
}
```

La estructura ObjInfo tiene los siguientes elementos:

> - **Type** es el tipo de objeto. Puede ser uno de los siguientes valores:
>     - **ObjContract** -- [Contrato inteligente](#contractinfo-structure)；
>     - **ObjFunc** -- función;
>     - **ObjExtFunc** -- función externa de golang;
>     - **ObjVar** -- variable;
>     - **ObjExtend** -- variable \$name.
> - **Value** -- contiene la estructura de cada tipo.

#### Estructura ContractInfo {#contractinfo-structure}

Apunta al tipo **ObjContract**, el campo **Value** contiene la estructura **ContractInfo**.

``` 
type ContractInfo struct {
    ID uint32
    Name string
    Owner *OwnerInfo
    Used map[string]bool
    Tx *[]*FieldInfo
}
```

#### Estructura FieldInfo {#fieldinfo-structure}

La estructura FieldInfo se usa en la estructura **ContractInfo** y describe los elementos del contrato inteligente [sección de datos](script.md#data-section).

``` 
type FieldInfo struct {
      Name string
      Type reflect.Type
      Original uint32
      Tags string
}
```

La estructura FieldInfo tiene los siguientes elementos:

> -   **Name** - Nombre del campo;
> -   **Type** - Tipo de campo;
> -   **Original** - Campo opcional;
> -   **Tags** -- Etiquetas adicionales para el campo.

#### Estructura FuncInfo {#funcinfo-structure}

La estructura FuncInfo apunta al tipo **ObjFunc**, el campo **Value** contiene la estructura **FuncInfo**.
``` 
type FuncInfo struct {
    Params []reflect.Type
    Results []reflect.Type
    Names *map[string]FuncName
    Variadic bool
    ID uint32
}
```

La estructura FuncInfo tiene los siguientes elementos:

> - **Params** -- un array de tipos de parámetros;
> - **Results** -- un array de tipos de resultados;
> - **Names** -- un mapeo de datos de la función de cola, por ejemplo, `DBFind().Columns()`;
> - **Variadic** -- si la función puede tener un número variable de parámetros, es verdadero;
> - **ID** -- el ID de la función.


#### Estructura FuncName {#funcname-structure}

La estructura FuncName se utiliza en **FuncInfo** y describe los datos de la función de cola.

``` 
type FuncName struct {
   Params []reflect.Type
   Offset []int
   Variadic bool
}
```

La estructura FuncName tiene los siguientes elementos:

> -   **Params** -- un array de tipos de parámetros;
> -   **Offset** -- un array de desplazamientos de estas variables. De hecho, todos los parámetros pueden inicializarse en la función utilizando el punto `.`;
> -   **Variadic** -- si la función de la cola puede tener un número variable de parámetros, es verdadero.

#### Estructura ExtFuncInfo {#extfuncinfo-structure}

**ObjExtFunc** es un tipo que apunta a una función externa y el campo **Value** contiene la estructura **ExtFuncInfo**. Se utiliza para describir una función de Golang.

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

La estructura ExtFuncInfo tiene los siguientes elementos:

> -   **Name**, **Params**, **Results** son los mismos parámetros que la estructura [FuncInfo](#funcinfo-structure);
> -   **Auto** -- un arreglo de variables que se pasan como parámetros adicionales a la función, por ejemplo, la variable de tipo *SmartContract* llamada *sc*;
> -   **Func** -- una función de golang.

#### Estructura VarInfo {#varinfo-structure}

La estructura VarInfo apunta al tipo **ObjVar**, y el campo **Value** contiene una estructura **VarInfo**.

``` 
type VarInfo struct {
   Obj *ObjInfo
   Owner *Block
}
```

La estructura VarInfo tiene los siguientes elementos:

> - **Obj** -- Información sobre el tipo de variable y su valor;
> - **Owner** -- Puntero al bloque al que pertenece.

#### Valor ObjExtend {#objextend-value}

Apunta al tipo **ObjExtend**, el campo **Value** contiene una cadena que incluye el nombre de una variable o función.

## Instrucciones de la máquina virtual {#virtual-machine-commands}

### Estructura ByteCode {#bytecode-structure}

Un bytecode es una secuencia de estructuras de tipo **ByteCode**.

``` 
type ByteCode struct {
   Cmd uint16
   Value interface{}
}
```

La estructura tiene los siguientes campos:

> - **Cmd** - Almacena el identificador de la instrucción;
> - **Value** - Contiene el operando (valor).

En general, la instrucción opera en el elemento superior de la pila y, si es necesario, escribe el resultado en ella.

### Identificadores de comando {#command-identifiers}

El archivo *vm/cmds_list.go* describe los identificadores de las instrucciones de la máquina virtual.

> -   **cmdPush** -- Coloca el valor del campo *Value* en la pila. Por ejemplo, coloca números y líneas en la pila;
> -   **cmdVar** -- Coloca el valor de la variable en la pila. *Value* contiene un puntero a la estructura *VarInfo* y la información sobre la variable;
> -   **cmdExtend** -- Coloca el valor de la variable externa en la pila. *Value* contiene una cadena con el nombre de la variable (comenzando con `$`);
> -   **cmdCallExtend** -- Llama a una función externa (cuyo nombre comienza con `$`). Los argumentos de la función se obtienen de la pila y el resultado se coloca en la pila. *Value* contiene el nombre de la función (comenzando con `$`);
> -   **cmdPushStr** -- Coloca la cadena del campo *Value* en la pila;
> -   **cmdCall** -- Llama a una función de la máquina virtual. *Value* contiene la estructura **ObjInfo**. Esta instrucción se utiliza para las funciones **ObjExtFunc** de Golang y las funciones **ObjFunc** de Needle. Cuando se llama a la función, se obtienen sus argumentos de la pila y se coloca el valor del resultado en la pila;
> -   **cmdCallVari** -- Similar a la instrucción **cmdCall**, llama a una función de la máquina virtual. Esta instrucción se utiliza para llamar a funciones con un número variable de argumentos;
> -   **cmdReturn** -- Se utiliza para salir de una función. El valor de retorno se coloca en la pila y no se utiliza el campo *Value*;
> -   **cmdIf** -- Transfiere el control al bytecode en la estructura **bloque** que se pasa en el campo *Value*. El control se transfiere a la pila solo si la función *valueToBool* devuelve `true` para el elemento superior de la pila. De lo contrario, el control se transfiere a la siguiente instrucción;
> -   **cmdElse** -- Funciona de la misma manera que la instrucción **cmdIf**, pero el control se transfiere a la estructura especificada solo si la función *valueToBool* devuelve `false` para el elemento superior de la pila;
> -   **cmdAssignVar** -- Obtiene una lista de variables de tipo **VarInfo** del campo *Value*. Estas variables obtienen sus valores mediante la instrucción **cmdAssign**;
> -   **cmdAssign** -- Asigna los valores de la pila a las variables obtenidas mediante la instrucción **cmdAssignVar**;
> -   **cmdLabel** -- Define una etiqueta que se utiliza para devolver el control durante un ciclo while;
> -   **cmdContinue** -- Transfiere el control a la etiqueta **cmdLabel**. No se utiliza el campo *Value* al ejecutar una nueva iteración del ciclo;
> -   **cmdWhile** -- Utiliza la función *valueToBool* para comprobar el elemento superior de la pila. Si este valor es `true`, se llama a la estructura **bloque** del campo *value*;
> -   **cmdBreak** -- Sale del ciclo;
> -   **cmdIndex** -- Coloca el valor del *map* o *array* en la pila mediante un índice. No se utiliza el campo *Value*. Por ejemplo: `(map | array) (index value) => (map | array [index value])`;
> -   **cmdSetIndex** -- Asigna el valor del elemento superior de la pila a un elemento del *map* o *array*. No se utiliza el campo *Value*. Por ejemplo: `(map | array) (index value) (value) => (map | array)`;
> -   **cmdFuncName** -- Describe los parámetros agregados mediante puntos `.`. Por ejemplo: `func name => Func (...) .Name (...)`;
> -   **cmdUnwrapArr** -- Define una bandera booleana si el elemento superior de la pila es un array;
> -   **cmdMapInit** -- Inicializa los valores del *map*;
> -   **cmdArrayInit** -- Inicializa los valores del *array*;
> -   **cmdError** -- Se crea cuando el contrato inteligente o la función se detienen debido a un error especificado (`error, warning, info`).


### Instrucciones de operación de pila {#stack-operation-commands}


```` text
En la versión actual, estos comandos no tienen una conversión de tipo completamente automática. Por ejemplo:
`string + float | int | decimal => float | int | decimal`，`float + int | str => float`，pero `int + string => runtime error`。
````

Aquí están las instrucciones que manejan directamente la pila. Estas instrucciones no utilizan el campo *Value*.

- **cmdNot** -- Negación lógica. `(val) => (!ValueToBool(val))`;
- **cmdSign** -- Cambio de signo. `(val) => (-val)`;
- **cmdAdd** -- Suma. `(val1)(val2) => (val1 + val2)`;
- **cmdSub** -- Resta. `(val1)(val2) => (val1 - val2)`;
- **cmdMul** -- Multiplicación. `(val1)(val2) => (val1 * val2)`;
- **cmdDiv** -- División. `(val1)(val2) => (val1 / val2)`;
- **cmdAnd** -- Operación lógica AND. `(val1)(val2) => (valueToBool(val1) && valueToBool(val2))`;
- **cmdOr** -- Operación lógica OR. `(val1)(val2) => (valueToBool(val1) || valueToBool(val2))`;
- **cmdEqual** -- Comparación de igualdad, devuelve bool. `(val1)(val2) => (val1 == val2)`;
- **cmdNotEq** -- Comparación de desigualdad, devuelve bool. `(val1)(val2) => (val1 != val2)`;
- **cmdLess** -- Comparación de menor que, devuelve bool. `(val1)(val2) => (val1 < val2)`;
- **cmdNotLess** -- Comparación de mayor o igual que, devuelve bool. `(val1)(val2) => (val1 >= val2)`;
- **cmdGreat** -- Comparación de mayor que, devuelve bool. `(val1)(val2) => (val1 > val2)`;
- **cmdNotGreat** -- Comparación de menor o igual que, devuelve bool. `(val1)(val2) => (val1 <= val2)`.

### Estructura Runtime {#runtime-structure}

La ejecución del bytecode no afecta a la máquina virtual. Por ejemplo, permite que varias funciones y contratos inteligentes se ejecuten simultáneamente en una sola máquina virtual. 

La estructura **Runtime** se utiliza para ejecutar funciones y contratos inteligentes, así como cualquier expresión y bytecode.


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

- **stack** -- La pila que ejecuta el bytecode;
- **blocks** -- La pila de llamadas de bloques;
- **vars** -- La pila de variables. Cuando se llama al bytecode dentro de un bloque, sus variables se agregarán a esta pila de variables. Después de salir del bloque, el tamaño de la pila de variables volverá a su valor anterior;
- **extend** -- Puntero de mapeo de valores de variables externas (`$name`);
- **vm** -- Puntero de la máquina virtual;
- **cost** -- Unidad de combustible para el resultado de la ejecución;
- **err** -- Error durante la ejecución.

#### Estructura blockStack {#blockstack-structure}

La estructura blockStack se utiliza en la estructura **Runtime**.

``` 
type blockStack struct {
     Block *Block
     Offset int
}
```

- **Block** -- Puntero al bloque en ejecución;
- **Offset** -- Desplazamiento de la última instrucción ejecutada en el bytecode del bloque especificado.

### Función RunCode {#runcode-function}

El bytecode se ejecuta en la función **RunCode**. Contiene un bucle que ejecuta la operación correspondiente para cada instrucción del bytecode. Antes de procesar el bytecode, es necesario inicializar los datos necesarios.

Aquí se añade un nuevo bloque a otros bloques.

``` 
rt.blocks = append(rt.blocks, &blockStack{block, len(rt.vars)})
```

A continuación, se obtiene la información de los parámetros relevantes de la función de cola. Estos parámetros están contenidos en el último elemento de la pila.

``` 
var namemap map[string][]interface{}
if block.Type == ObjFunc && block.Info.(*FuncInfo).Names != nil {
    if rt.stack[len(rt.stack)-1] != nil {
        namemap = rt.stack[len(rt.stack)-1].(map[string][]interface{})
    }
    rt.stack = rt.stack[:len(rt.stack)-1]
}
```

Entonces, es necesario inicializar todas las variables definidas en el bloque actual con sus valores iniciales.

``` 
start := len(rt.stack)
varoff := len(rt.vars)
for vkey, vpar := range block.Vars {
   rt.cost--
   var value interface{}
```

Debido a que las variables en una función también son variables, necesitamos extraerlas del último elemento de la pila en el orden descrito por la función en sí.

``` 
    if block.Type == ObjFunc && vkey < len(block.Info.(*FuncInfo).Params) {
      value = rt.stack[start-len(block.Info.(*FuncInfo).Params)+vkey]
    } else {
```

Inicializar la variable local con el valor inicial aquí.

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

Siguiente, actualice los valores de los parámetros de variables que se pasan en la función de cola.

``` 
if namemap != nil {
  for key, item := range namemap {
    params := (*block.Info.(*FuncInfo).Names)[key]
    for i, value := range item {
       if params.Variadic && i >= len(params.Params)-1 {
```

Si los parámetros de variable pasados son un número variable de parámetros, entonces combinarlos en un arreglo variable.

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

Después, lo que tenemos que hacer es eliminar los valores que se pasaron como parámetros de función desde la parte superior de la pila, para así mover la pila. Ya hemos copiado sus valores en un arreglo de variables.

``` 
if block.Type == ObjFunc {
     start -= len(block.Info.(*FuncInfo).Params)
}
```

Después de que se complete la ejecución del ciclo de instrucciones de bytecode, es necesario limpiar correctamente la pila.

``` 
last := rt.blocks[len(rt.blocks)-1]
```

Eliminar el bloque actual de la pila de bloques.

``` 
rt.blocks = rt.blocks[:len(rt.blocks)-1]
if status == statusReturn {
```

Si salimos con éxito de una función que ha sido ejecutada, agregaremos el valor de retorno al final de la pila anterior.

``` 
if last.Block.Type == ObjFunc {
   for count := len(last.Block.Info.(*FuncInfo).Results); count > 0; count-- {
     rt.stack[start] = rt.stack[len(rt.stack)-count]
     start++
   }
   status = statusNormal
 } else {
```

Como puede ver, si no ejecutamos la función, no restauraremos el estado de la pila y saldremos de la función tal como está. La razón es que los bucles y estructuras condicionales que ya se han ejecutado en la función también son bloques de código de bytes.

``` 
return
    }
}
rt.stack = rt.stack[:start]
```

### Otras funciones de la VM {#other-functions-for-operations-with-vm}

Utilice la función **NewVM** para crear una máquina virtual. Cada máquina virtual tiene la función **Extend** que agrega cuatro funciones: **ExecContract, MemoryUsage, CallContract** y **Settings**.

``` 
for key, item := range ext.Objects {
    fobj := reflect.ValueOf(item).Type()
```

Nosotros iteramos a través de todos los objetos pasados y solo miramos las funciones.

``` 
switch fobj.Kind() {
case reflect.Func:
```

De acuerdo con la información relevante recibida sobre la función, llene la estructura **ExtFuncInfo** y agréguela al mapa de **Objects** de nivel superior por nombre.

``` 
data := ExtFuncInfo{key, make([]reflect.Type, fobj.NumIn()), make([]reflect.Type, fobj.NumOut()), 
   make([]string, fobj.NumIn()), fobj.IsVariadic(), item}
for i := 0; i < fobj.NumIn(); i++ {
```

La estructura **ExtFuncInfo** tiene un array de parámetros llamado **Auto**. Normalmente, el primer parámetro es `sc *SmartContract` o `rt *Runtime`. 

No podemos pasarlos desde el lenguaje Needle, ya que son necesarios para ejecutar algunas funciones de Golang. Por lo tanto, especificamos que estos variables se utilizarán automáticamente al llamar a la función.

En este caso, el primer parámetro de las cuatro funciones mencionadas es `rt *Runtime`.

``` 
if isauto, ok := ext.AutoPars[fobj.In(i).String()]; ok {
  data.Auto[i] = isauto
}
```

Asignar información sobre el parámetro.

``` 
data.Params[i] = fobj.In(i)
}
```

y el tipo del valor devuelto.

``` 
for i := 0; i < fobj.NumOut(); i++ {
   data.Results[i] = fobj.Out(i)
}
```

Agregar una función a la raíz **Objects**, de esta manera el compilador podrá encontrarlas más tarde cuando se utilice el contrato inteligente.

``` 
vm.Objects[key] = &ObjInfo{ObjExtFunc, data}
    }
}
```

## Compilador {#compiler}

El archivo *compile.go* contiene funciones encargadas de compilar el array de tokens obtenido del analizador léxico. La compilación puede dividirse en dos niveles condicionalmente, en el nivel superior, se manejan funciones, contratos inteligentes, bloques de código, declaraciones condicionales y de bucle, definiciones de variables, entre otros. En el nivel inferior, compilamos bloques de código en bucles y declaraciones condicionales o expresiones dentro de condiciones.

En primer lugar, describamos el nivel inferior de manera simple. La función **compileEval** puede completar la conversión de una expresión en bytecode. Dado que estamos utilizando una máquina virtual de pila, es necesario convertir una expresión de registro de infijo normal a notación de sufijo o notación polaca inversa. Por ejemplo, `1+2` se convierte en `12+`, luego colocamos `1` y `2` en la pila, luego aplicamos la operación de suma a los dos últimos elementos de la pila y escribimos el resultado en la pila. Este [algoritmo de conversión](https://master.virmandy.net/perevod-iz-infiksnoy-notatsii-v-postfiksnuyu-obratnaya-polskaya-zapis/) se puede encontrar en Internet.

La variable global `opers = map [uint32] operPrior` contiene la prioridad de las operaciones necesarias para convertir a notación polaca inversa.

Las siguientes variables se definen al comienzo de la función **compileEval**:

> - **buffer** -- un búfer temporal para las instrucciones de bytecode;
> - **bytecode** -- un búfer final para las instrucciones de bytecode;
> - **parcount** -- un búfer temporal para calcular los parámetros al llamar a una función;
> - **setIndex** -- una variable que se establece en [true]{.title-ref} durante el proceso de trabajo al asignar elementos a un *map* o *array*. Por ejemplo, en el caso de `a["my"] = 10`, necesitamos usar la instrucción **cmdSetIndex** especificada.

Obtenemos una marca en un bucle y realizamos la acción correspondiente, por ejemplo, si encontramos una llave, detenemos el análisis de la expresión. Al mover una cadena, verificamos si la sentencia anterior es un operador y si está dentro de paréntesis, de lo contrario, salimos y analizamos la expresión.

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

En circunstancias normales, este algoritmo corresponde a un algoritmo de conversión a notación polaca inversa. Teniendo en cuenta algunas llamadas necesarias a contratos inteligentes, funciones e índices, así como otras cosas que no se encuentran durante el análisis del marcador de tipo *lexIdent*, comprobaremos si hay una variable, función o contrato inteligente con este nombre. Si no se encuentra ningún contenido relevante y esto no es una llamada a una función o contrato inteligente, se indicará un error.

``` 
objInfo, tobj := vm.findObj(lexem.Value.(string), block)
if objInfo == nil && (!vm.Extern || i > *ind || i >= len(*lexems)-2 || (*lexems)[i+1].Type != isLPar) {
      return fmt.Errorf(`unknown identifier %s`, lexem.Value.(string))
}
```

Podríamos encontrarnos en una situación en la que describiremos una llamada de contrato inteligente más adelante. En este ejemplo, si no se encuentra una función o variable con el mismo nombre, consideramos que se llamará al contrato inteligente.

En este lenguaje de programación, no hay diferencia entre la llamada de contrato inteligente y la llamada de función. Pero necesitamos llamar al contrato inteligente utilizando la función **ExecContract** utilizada en el bytecode.

> ``` 
> if objInfo.Type == ObjContract {
>     if objInfo.Value != nil {
>               objContract = objInfo.Value.(*Block)
>             }
>     objInfo, tobj = vm.findObj(`ExecContract`, block)
>     isContract = true
> }
> ```

En este código, estamos registrando la cantidad de variables hasta el momento en la variable `count`, la cual también se escribe en la pila junto con la cantidad de argumentos de la función. Cada vez que se verifica un argumento posteriormente, simplemente necesitamos aumentar la cantidad en una unidad en el último elemento de la pila.

``` 
count := 0
if (*lexems)[i+2].Type != isRPar {
    count++
}
```

Tenemos un parámetro de lista *Used* que indica los contratos inteligentes que han sido llamados, por lo que necesitamos marcar cuando se llama a un contrato inteligente. Si se llama al contrato inteligente sin ningún parámetro, debemos agregar dos parámetros vacíos para llamar a **ExecContract** y obtener al menos dos parámetros.

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

Si vemos que hay un corchete cuadrado al lado, entonces agregamos el comando **cmdIndex** para obtener el valor por el índice.

``` 
if (*lexems)[i+1].Type == isLBrack {
     if objInfo == nil || objInfo.Type != ObjVar {
         return fmt.Errorf(`unknown variable %s`, lexem.Value.(string))
     }
    buffer = append(buffer, &ByteCode{cmdIndex, 0})
}
```

La función **CompileBlock** puede generar un árbol de objetos y bytecode independiente de expresiones. El proceso de compilación se basa en una máquina de estados finitos, al igual que un analizador léxico, pero con las siguientes diferencias.

En primer lugar, no usamos símbolos sino etiquetas.

En segundo lugar, describimos inmediatamente todas las variables de estado y transición en *states*. 

Esto representa un arreglo de objetos indexados por tipo de etiqueta, cada etiqueta tiene una estructura de *compileState* y se especifica un nuevo estado en *NewState*.

Si ya hemos entendido esta estructura, podemos especificar la función de manejador en el campo *Func*.

Tomemos como ejemplo el estado principal.

Si encontramos un salto de línea o un comentario, mantendremos el mismo estado. Si encontramos la palabra clave **contract**, cambiaremos el estado a *stateContract* y comenzaremos a analizar esa estructura.

Si encontramos la palabra clave **func**, cambiaremos el estado a *stateFunc*. Si recibimos cualquier otra etiqueta, se llamará a una función que genere un error.

``` 
{ // stateRoot
   lexNewLine: {stateRoot, 0},
   lexKeyword | (keyContract << 8): {stateContract | statePush, 0},
   lexKeyword | (keyFunc << 8): {stateFunc | statePush, 0},
   lexComment: {stateRoot, 0},
   0: {errUnknownCmd, cfError},
},
```

Supongamos que nos encontramos con la palabra clave **func** y hemos cambiado el estado a *stateFunc*. Debido a que el nombre de la función debe seguir la palabra clave **func**, al cambiar el nombre de la función mantendremos el mismo estado. Para todos los demás tokens, generaremos un error correspondiente.

Si obtenemos el nombre de la función en el token de identificador, pasamos al estado *stateFParams*, donde podemos obtener los parámetros de la función.

``` 
{ // stateFunc
    lexNewLine: {stateFunc, 0},
    lexIdent: {stateFParams, cfNameBlock},
    0: {errMustName, cfError},
},
```

Durante la operación anterior, llamamos a la función **fNameBlock**. Es importante tener en cuenta que la estructura *Block* se crea utilizando la marca *statePush*, y aquí la obtenemos del búfer y llenamos los datos que necesitamos. La función **fNameBlock** se utiliza para contratos inteligentes y funciones (incluyendo funciones y contratos inteligentes anidados).

Utiliza la estructura correspondiente para llenar el campo *Info* y se escribe a sí misma en los *Objects* del bloque padre. De esta manera, podemos llamar a esta función o contrato inteligente mediante el nombre especificado.

Del mismo modo, creamos funciones correspondientes para todos los estados y variables. Estas funciones suelen ser muy pequeñas y realizan algunas tareas al construir el árbol de la máquina virtual.

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

Para la función **CompileBlock**, simplemente recorre todas las etiquetas y cambia el estado según lo descrito en *states*. Casi todas las etiquetas adicionales corresponden a código de programa adicional.

> -   **statePush** -- Agrega el objeto **Block** al árbol de objetos;
> -   **statePop** -- Se utiliza cuando el bloque termina con una llave de cierre;
> -   **stateStay** -- Cuando se cambia a un nuevo estado, es necesario mantener la etiqueta actual;
> -   **stateToBlock** -- Cambia al estado **stateBlock**, utilizado para procesar *while* y *if*. Después de procesar la expresión, es necesario procesar el bloque dentro de las llaves;
> -   **stateToBody** -- Cambia al estado **stateBody**;
> -   **stateFork** -- Guarda la posición de la etiqueta. Se utiliza cuando la expresión comienza con un identificador o un nombre que comienza con `$`, lo que indica una llamada a función o una asignación;
> -   **stateToFork** -- Se utiliza para obtener la etiqueta almacenada en **stateFork**. Esta etiqueta se pasará a la función de procesamiento;
> -   **stateLabel** -- Se utiliza para insertar la instrucción **cmdLabel**. La estructura *while* necesita esta etiqueta;
> -   **stateMustEval** -- Verifica la disponibilidad de la expresión condicional al comienzo de las estructuras *if* y *while*.

Aparte de la función **CompileBlock**, también se debe mencionar la función **FlushBlock**.

Pero el problema es que el árbol de bloques es independiente de la construcción actual de la máquina virtual, es decir, obtenemos información sobre las funciones y contratos inteligentes existentes en la máquina virtual, pero recopilamos los bloques ya compilados en un árbol separado.

De lo contrario, si ocurre un error durante la compilación, debemos revertir el estado de la máquina virtual a un estado anterior. Por lo tanto, compilamos el árbol por separado, pero después de una compilación exitosa, debemos llamar a la función **FlushContract**.

Esta función agregará el árbol de bloques completado a la máquina virtual actual. En este punto, la fase de compilación se ha completado.

## Analizador léxico {#lexical-analyzer}

El analizador léxico procesa la cadena de entrada y forma una secuencia de tokens de los siguientes tipos:

- **lexSys** - Token de sistema, como: `{}`, `[]`, `()`, `,`, `.`, etc.;
- **lexOper** - Token de operación, como: `+`, `-`, `/`, `\`, `*`;
- **lexNumber** - Número;
- **lexident** - Identificador;
- **lexNewline** - Salto de línea;
- **lexString** - Cadena de caracteres;
- **lexComment** - Comentario;
- **lexKeyword** - Palabra clave;
- **lexType** - Tipo;
- **lexExtend** - Referencia a variables o funciones externas, como: `$myname`.

En la versión actual, se construyó una tabla de conversión (máquina de estados finitos) con la ayuda del archivo [script/lextable/lextable.go](#lextable-lextable-go) para analizar tokens y escribirlos en el archivo *lex_table.go*. En general, se puede separar de la tabla de conversión inicial generada por ese archivo y crear una tabla de conversión en memoria (`init()`) inmediatamente al inicio.

El análisis léxico en sí ocurre en la función **lexParser** en el archivo [lex.go](#lex-go).

### lextable/lextable.go {#lextable-lextable-go}

Aquí definimos nuestro alfabeto de operación y describimos cómo una máquina de estados finitos cambia de un estado a otro según el siguiente símbolo recibido.

*states* contiene un objeto JSON con una lista de estados.

Excepto por símbolos específicos, `d` se utiliza para representar todos los símbolos no especificados en el estado.

`n` representa 0x0a, `s` representa un espacio, `q` representa una comilla simple, `Q` representa una comilla doble, `r` representa caracteres >= 128, `a` representa AZ y az, `1` representa 1-9.

El nombre del estado es la clave y el objeto de valor enumera los posibles valores. Luego, para cada conjunto, hay un nuevo estado al que se debe cambiar. Luego viene el nombre de la etiqueta, si necesitamos volver al estado inicial, el tercer parámetro es una marca de servicio que indica cómo procesar el símbolo actual.

Por ejemplo, tenemos un estado principal y un carácter de entrada "/", `"/": ["solidus", "", "push next"],`

> -   **push** - hace que la instrucción recuerde que está en una pila separada;
> -   **next** - pasa al siguiente carácter, mientras cambiamos el estado a **solidus**, luego obtenemos el siguiente carácter y miramos el estado de **solidus**.

Si el siguiente carácter es "/" o "/*", entonces pasamos al estado de comentario **comment**, ya que comienzan con "//" o "/*".
Obviamente, cada comentario tiene un estado posterior diferente, ya que terminan con diferentes símbolos.

Si el siguiente carácter no es "/" ni "*", entonces registramos todo el contenido de la pila como una marca de tipo **lexOper**, limpiamos la pila y volvemos al estado principal.

El siguiente módulo convierte el árbol de estados en una matriz numérica y lo escribe en el archivo *lex_table.go*.

En el primer bucle:

Formamos un alfabeto de símbolos válidos.

``` 
for ind, ch := range alphabet {
i := byte(ind)
```

Además, en **state2int**, proporcionamos un identificador de secuencia único para cada estado.

``` 
state2int := map[string]uint{`main`: 0}
if err := json.Unmarshal([]byte(states), &data); err == nil {
for key := range data {
if key != `main` {
state2int[key] = uint(len(state2int))
```

Cuando recorremos todos los estados y cada conjunto en el estado y cada símbolo en el conjunto, escribimos un número de tres bytes [identificador de nuevo estado (0=principal)] + [tipo de marca (0-sin marca)] + [marca].

La bidimensionalidad del array *table* se debe a que se divide en estados y 34 símbolos de entrada del array *alphabet*, que se ordenan en el mismo orden.

Estamos en el estado *main* en la fila cero de la tabla *table*. Tomamos el primer carácter, buscamos su índice en el array *alphabet* y obtenemos el valor de la columna correspondiente al índice dado.

A partir del valor recibido, recibimos la marca en el byte de menor orden. Si se completa el análisis, el segundo byte indica el tipo de marca recibida. En el tercer byte, recibimos el índice del nuevo estado siguiente.

Todo esto se describe con más detalle en la función **lexParser** en *lex.go*.

Si desea agregar nuevos caracteres, debe agregarlos al array *alphabet* y aumentar la constante *AlphaSize*.
Si desea agregar nuevas combinaciones de símbolos, debe describirlas en el estado, similar a las opciones existentes. Después de esto, ejecute el archivo *lextable.go* para actualizar el archivo *lex_table.go*.

### lex.go {#lex-go}

**lexParser**

La función genera directamente el análisis léxico y devuelve una matriz de tokens recibidos según la cadena de entrada proporcionada. Analicemos la estructura de los tokens.

``` 
type Lexem struct {
   Type uint32 // Type of the lexem
   Value interface{} // Value of lexem
   Line uint32 // Line of the lexem
   Column uint32 // Position inside the line
}
```

- **Type** -- Tipo de marcador. Tiene uno de los siguientes valores: `lexSys, lexOper, lexNumber, lexIdent, lexString, lexComment, lexKeyword, lexType, lexExtend`;
- **Value** -- Valor del marcador. El tipo de valor depende del tipo de marcador, analicemos más detalladamente:
    - **lexSys** -- Incluye paréntesis, comas, etc. En este caso, `Type = ch << 8 | lexSys`, consulte las constantes `isLPar ... isRBrack`, este valor es uint32;
    - **lexOper** -- El valor se representa como una secuencia de caracteres equivalente en forma de uint32. Consulte las constantes `isNot ... isOr`;
    - **lexNumber** -- El número se almacena como *int64* o *float64*. Si el número tiene un punto decimal, es *float64*;
    - **lexIdent** -- El identificador se almacena como *string*;
    - **lexNewLine** -- Salto de línea. También se utiliza para calcular la línea y la posición del marcador;
    - **lexString** -- La cadena se almacena como *string*;
    - **lexComment** -- El comentario se almacena como *string*;
    - **lexKeyword** -- La palabra clave solo almacena el índice correspondiente, consulte las constantes `keyContract ... keyTail`. En este caso, `Type = KeyID << 8 | lexKeyword`.
       Además, debe tenerse en cuenta que las palabras clave `true, false, nil` se convierten inmediatamente en un marcador de tipo **lexNumber** y se utilizan los tipos correspondientes `bool` e `intreface {}`;
    - **lexType** -- Este valor contiene el valor de tipo `reflect.Type` correspondiente;
    - **lexExtend** -- Identificador que comienza con el símbolo `$`. Estas variables y funciones se pasan desde el exterior, por lo que se asignan a un tipo de marcador especial. Este valor contiene el nombre en forma de cadena, sin el símbolo `$` al principio.
- **Líne** -- Línea en la que se encuentra el marcador;
- **Column** -- Posición del marcador dentro de la línea.

Vamos a analizar en detalle la función **lexParser**. La función **todo** busca el índice del símbolo en el alfabeto y recupera un nuevo estado, un identificador de token (si lo hay) y otras banderas de la tabla de transición en función del estado actual y el símbolo entrante.

El análisis en sí implica llamar a la función **todo** para cada carácter siguiente y cambiar a un nuevo estado. Una vez que se recibe un token, creamos el token correspondiente en el criterio de salida y continuamos analizando.

Cabe señalar que durante el análisis, no acumulamos tokens de símbolos en una pila o matriz separada, ya que solo guardamos el desplazamiento donde comienza el token. Después de obtener el token, movemos el desplazamiento del siguiente token a la posición actual de análisis.

La parte restante es verificar las banderas de estado léxico utilizadas en el análisis:

> - **lexfPush** -- Esta bandera significa que comenzamos a acumular símbolos en un nuevo token;
> - **lexfNext** -- Este carácter debe agregarse al token actual;
> - **lexfPop** -- Se recibe el token y, por lo general, tenemos el tipo de identificador de token para el análisis;
> - **lexfSkip** -- Esta bandera se utiliza para excluir caracteres del análisis, como barras de control en cadenas `\n \r \"`. Se reemplazan automáticamente durante la fase de análisis léxico.

## Lenguaje Needle {#needle-language}

### Lexemas {#lexemes}

El código fuente del programa debe estar codificado en UTF-8.

Los siguientes tipos léxicos:

> -   **Palabras clave** - `action`, `break`, `conditions`, `continue`,
>     `contract`, `data`, `else`, `error`, `false`, `func`, `if`,
>     `info`, `nil`, `return`, `settings`, `true`, `var`, `warning`,
>     `while`;
> -   **Números** - Solo se aceptan números decimales. Hay dos tipos básicos: **int** y **float**. Si un número tiene un punto decimal, se convierte en un número de punto flotante **float**. El tipo **int** es equivalente a **int64** en golang. El tipo **float** es equivalente a **float64** en golang.
> -   **Cadenas** - Las cadenas pueden estar entre comillas dobles (`"una cadena"`) o acentos graves (`\`una cadena\``). Ambos tipos de cadenas pueden contener saltos de línea. Las cadenas entre comillas dobles pueden contener comillas dobles, saltos de línea y retornos de carro escapados con una barra invertida. Por ejemplo, `"Esto es una \"primera cadena\".rnEsto es una segunda cadena."`. 
> -   **Comentarios** - Hay dos tipos de comentarios. Los comentarios de una sola línea usan dos barras inclinadas hacia adelante (`//`). Por ejemplo, `// Este es un comentario de una sola línea`. Los comentarios de varias líneas usan una barra inclinada hacia adelante y un asterisco (`/* */`) y pueden abarcar varias líneas. Por ejemplo, `/* Este es un comentario de varias líneas */`.
> -   **Identificadores** - Nombres de variables y funciones que consisten en letras a-z y A-Z, símbolos UTF-8, números y guiones bajos. Los nombres pueden comenzar con una letra, guión bajo, `@` o `$`. Los nombres que comienzan con `$` son nombres de variables definidos en la **sección de datos**. Los nombres que comienzan con `$` también se pueden usar para definir variables globales dentro de la **sección de condiciones** y la **sección de acciones**. Los contratos inteligentes del ecosistema pueden usar el símbolo `@` para la invocación. Por ejemplo: `@1NewTable(...)`.

### Tipos {#types}

En la clase Needle, se especifica el tipo correspondiente de golang junto a ella.

- **bool** - bool, con un valor predeterminado de **false**;
- **bytes** - \[\]byte{}, con un valor predeterminado de una matriz de bytes vacía;
- **int** - int64, con un valor predeterminado de **0**;
- **address** - uint64, con un valor predeterminado de **0**;
- **array** - \[\]interface{}, con un valor predeterminado de una matriz vacía;
- **map** - map\[string\]interface{}, con un valor predeterminado de un objeto de matriz vacío;
- **money** - decimal.Decimal, con un valor predeterminado de **0**;
- **float** - float64, con un valor predeterminado de **0**;
- **string** - string, con un valor predeterminado de una cadena vacía;
- **file** - map\[string\]interface{}, con un valor predeterminado de un objeto de matriz vacío.

Estos tipos de variables se definen utilizando la palabra clave `var`. Por ejemplo, `var var1, var2 int`. Cuando se define una variable de esta manera, recibirá el valor predeterminado de su tipo.

Todos los valores de variables tienen el tipo *interface{}*, y luego se asignan al tipo de golang requerido. Por lo tanto, por ejemplo, los tipos *array* y *map* son tipos de golang *\[\]interface{}* y *map\[string\]interface{}*.

Ambos tipos de matrices pueden contener elementos de cualquier tipo.

### Expresiones {#expressions}

Las expresiones pueden contener operaciones aritméticas, operaciones lógicas y llamadas a funciones. Todas las expresiones se evalúan de izquierda a derecha según su prioridad de operación. Si la prioridad de la operación es la misma, la evaluación también es de izquierda a derecha.

La lista de operaciones de mayor a menor prioridad:

- **Llamadas a funciones y paréntesis** - Al llamar a una función, los parámetros pasados se evalúan de izquierda a derecha;
- **Operaciones unarias** - Negación lógica `!` y cambio de signo aritmético `-`;
- **Multiplicación y división** - Multiplicación aritmética `*` y división `/`;
- **Suma y resta** - Suma aritmética `+` y resta `-`;
- **Comparación lógica** - `>= > > >=`;
- **Igualdad y desigualdad lógica** - `== !=`;
- **AND lógico** - `&&`;
- **OR lógico** - `||`.

Al evaluar el AND lógico y el OR lógico, siempre se evalúan ambos lados de la expresión.

Needle no tiene comprobación de tipos en tiempo de compilación. Al evaluar operandos, intenta convertir el tipo a un tipo más complejo. El orden de complejidad para los tipos puede ser el siguiente: `string, int, float, money`, y solo se implementan conversiones de tipo parcial. El tipo de cadena admite operaciones de suma, lo que resulta en concatenación de cadenas. Por ejemplo, `string + string = string, money - int = money, int * float = float`.

Para las funciones, se realiza una comprobación de tipos en los tipos `string` e `int` durante la ejecución.

El tipo **array** y el tipo **map** pueden ser direccionados mediante índices.

Para el tipo **array**, se debe especificar un valor **int** como índice. Para el tipo **map**, se debe especificar una variable o un valor **string** como índice.

Si se asigna un valor a un elemento de un **array** con un índice mayor al índice máximo actual, se añadirán elementos vacíos al array. Estos elementos tendrán un valor de inicialización de **nil**. Por ejemplo: .. código:


    var my array
    my[5] = 0
    var mymap map
    mymap["index"] = my[3]

En las expresiones de lógica condicional (por ejemplo, `if`, `while`, `&&`, `||`, `!`), el tipo se convertirá automáticamente en un valor lógico, si el tipo no es el valor predeterminado, entonces será verdadero.

``` 
var mymap map
var val string
if mymap && val {
...
}
```

### Ámbito {#scope}

Las llaves especifican un bloque que puede contener variables de ámbito local. Por defecto, el ámbito de la variable se extiende a su propio bloque y a todos los bloques anidados. En un bloque, se puede definir una nueva variable con el nombre de una variable existente. En este caso, la variable externa con el mismo nombre no está disponible.

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

### Ejecución de contratos {#contract-execution}

Al llamar a un contrato inteligente, los parámetros definidos en la sección **data** deben ser pasados a él. Antes de ejecutar el contrato inteligente, la máquina virtual recibe estos parámetros y los asigna a las variables correspondientes ($Param).

Luego se llaman la función predefinida **conditions** y la función **action**.

Los errores que ocurren durante la ejecución de un contrato inteligente se pueden dividir en dos tipos: errores formales y errores ambientales. Los errores formales se generan utilizando comandos especiales: `error, warning, info` y cuando la función incorporada devuelve `err` no igual a *nil*.

El lenguaje Needle no maneja excepciones. Cualquier error terminará la ejecución del contrato inteligente. Dado que se crea una pila separada y una estructura para almacenar valores de variables al ejecutar un contrato inteligente, el mecanismo de recolección de basura de golang eliminará automáticamente estos datos cuando se complete la ejecución del contrato inteligente.

### Forma Backus-Naur (BNF) {#backus-naur-form-bnf}

En informática, BNF es una técnica de símbolos utilizada para gramáticas libres de contexto, generalmente utilizada para describir la sintaxis de los lenguajes utilizados en informática.

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
