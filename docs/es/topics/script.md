# Contratos inteligentes {#smart-contracts}

<!-- TOC -->

- [Estructura de los contratos inteligentes](#contract-structure)
    - [Sección de datos](#data-section)
    - [Sección de condiciones](#conditions-section)
    - [Sección de acciones](#action-section)
- [Variables](#variables)
- [Contratos inteligentes anidados](#nested-contracts)
- [Carga de archivos](#file-upload)
- [Consultas en formato JSON](#queries-in-json-format)
- [Consultas con operaciones de fecha y hora](#queries-with-date-and-time-operations)
- [Lenguaje de contrato inteligente Needle](#needle-contract-language)
    - [Elementos y estructura básicos](#basic-elements-and-structure)
    - [Tipos de datos y variables](#data-types-and-variables)
    - [Arreglos](#array)
    - [Sentencias If y While](#if-and-while-statements)
    - [Funciones](#functions)
        - [Declaración de funciones](#function-declaration)
        - [Parámetros de longitud variable](#variable-length-parameters)
        - [Parámetros opcionales](#optional-parameters)
- [Clasificación de funciones Needle](#needle-functions-classification)
- [Referencia de funciones Needle](#needle-functions-reference)
    - [AppParam](#appparam)
    - [DBFind](#dbfind)
    - [DBRow](#dbrow)
    - [DBSelectMetrics](#dbselectmetrics)
    - [EcosysParam](#ecosysparam)
    - [GetHistory](#gethistory)
    - [GetHistoryRow](#gethistoryrow)
    - [GetColumnType](#getcolumntype)
    - [GetDataFromXLSX](#getdatafromxlsx)
    - [GetRowsCountXLSX](#getrowscountxlsx)
    - [LangRes](#langres)
    - [GetBlock](#getblock)
    - [DBInsert](#dbinsert)
    - [DBUpdate](#dbupdate)
    - [DBUpdateExt](#dbupdateext)
    - [DelColumn](#delcolumn)
    - [DelTable](#deltable)
    - [Append](#append)
    - [Join](#join)
    - [Split](#split)
    - [Len](#len)
    - [Row](#row)
    - [One](#one)
    - [GetMapKeys](#getmapkeys)
    - [SortedKeys](#sortedkeys)
    - [CallContract](#callcontract)
    - [ContractAccess](#contractaccess)
    - [ContractConditions](#contractconditions)
    - [EvalCondition](#evalcondition)
    - [GetContractById](#getcontractbyid)
    - [GetContractByName](#getcontractbyname)
    - [RoleAccess](#roleaccess)
    - [TransactionInfo](#transactioninfo)
    - [Throw](#throw)
    - [ValidateCondition](#validatecondition)
    - [AddressToId](#addresstoid)
    - [IdToAddress](#idtoaddress)
    - [PubToID](#pubtoid)
    - [DecodeBase64](#decodebase64)
    - [EncodeBase64](#encodebase64)
    - [Float](#float)
    - [HexToBytes](#hextobytes)
    - [FormatMoney](#formatmoney)
    - [Random](#random)
    - [Int](#int)
    - [Hash](#hash)
    - [Sha256](#sha256)
    - [Str](#str)
    - [JSONEncode](#jsonencode)
    - [JSONEncodeIndent](#jsonencodeindent)
    - [JSONDecode](#jsondecode)
    - [HasPrefix](#hasprefix)
    - [Contains](#contains)
    - [Replace](#replace)
    - [Size](#size)
    - [Sprintf](#sprintf)
    - [Substr](#substr)
    - [ToLower](#tolower)
    - [ToUpper](#toupper)
    - [TrimSpace](#trimspace)
    - [Floor](#floor)
    - [Log](#log)
    - [Log10](#log10)
    - [Pow](#pow)
    - [Round](#round)
    - [Sqrt](#sqrt)
    - [StringToBytes](#stringtobytes)
    - [BytesToString](#bytestostring)
    - [SysParamString](#sysparamstring)
    - [SysParamInt](#sysparamint)
    - [DBUpdateSysParam](#dbupdatesysparam)
    - [UpdateNotifications](#updatenotifications)
    - [UpdateRolesNotifications](#updaterolesnotifications)
    - [HTTPRequest](#httprequest)
    - [HTTPPostJSON](#httppostjson)
    - [BlockTime](#blocktime)
    - [DateTime](#datetime)
    - [UnixDateTime](#unixdatetime)
    - [CreateOBS](#createobs)
    - [GetOBSList](#getobslist)
    - [RunOBS](#runobs)
    - [StopOBS](#stopobs)
    - [RemoveOBS](#removeobs)
- [Sistema de contratos inteligentes.](#system-contracts)
    - [NewEcosystem](#newecosystem)
    - [EditEcosystemName](#editecosystemname)
    - [NewContract](#newcontract)
    - [EditContract](#editcontract)
    - [BindWallet](#bindwallet)
    - [UnbindWallet](#unbindwallet)
    - [NewParameter](#newparameter)
    - [EditParameter](#editparameter)
    - [NewMenu](#newmenu)
    - [EditMenu](#editmenu)
    - [AppendMenu](#appendmenu)
    - [NewPage](#newpage)
    - [EditPage](#editpage)
    - [AppendPage](#appendpage)
    - [NewBlock](#newblock)
    - [EditBlock](#editblock)
    - [NewTable](#newtable)
    - [EditTable](#edittable)
    - [NewColumn](#newcolumn)
    - [EditColumn](#editcolumn)
    - [NewLang](#newlang)
    - [EditLang](#editlang)
    - [Import](#import)
    - [ImportUpload](#importupload)
    - [NewAppParam](#newappparam)
    - [EditAppParam](#editappparam)
    - [NewDelayedContract](#newdelayedcontract)
    - [EditDelayedContract](#editdelayedcontract)
    - [UploadBinary](#uploadbinary)

<!-- /TOC -->


Los contratos inteligentes (en adelante, "contratos") son los elementos básicos de las aplicaciones. Los usuarios ejecutan contratos inteligentes en la página web generalmente como una sola operación, lo que resulta en la modificación o creación de entradas en la base de datos. Todas las operaciones de datos de la aplicación forman el sistema de contratos inteligentes, que interactúan entre sí a través de la base de datos o las funciones del contenido del contrato inteligente.

## Estructura del contrato inteligente {#contract-structure}

Se utiliza la palabra clave **contract** para declarar un contrato inteligente, seguido del nombre del contrato inteligente. El contenido del contrato inteligente debe estar entre llaves. La estructura del contrato inteligente consta de tres partes principales:

> 1. **data** - [Sección de datos](#data-section), que declara las variables de entrada de datos, incluyendo el nombre y el tipo de las variables;
> 2. **conditions** - [Sección de condiciones](#conditions-section), que verifica la corrección de los datos;
> 3. **action** - [Sección de acción](#action-section), que ejecuta las acciones de operación de datos.

``` js
contract MyContract {
    data {
        FromId int
        ToId   int
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

### Sección de datos {#data-section}

La sección `data` describe la entrada de datos del contrato inteligente y los parámetros de formulario recibidos.

La estructura de cada línea es la siguiente:

> -   *Nombre de la variable* - Solo acepta variables, no admite matrices;
> -   *Tipo de datos de la variable* - [Tipo de datos](#data-types-and-variables) de la variable;
> -   *opcional* - Parámetro opcional, elementos de formulario que no necesitan ser completados.

``` js
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

### Sección de condiciones {#conditions-section}

La sección `conditions` describe la validación de los datos recibidos.

Los siguientes comandos se utilizan para advertencias de error: error de gravedad `error`, error de advertencia `warning`, error de información `info`. Los tres comandos generarán un error que detendrá la ejecución del contrato inteligente y cada error imprimirá información de registro de error de un tipo diferente. Por ejemplo:

``` js
if fuel == 0 {
      error "fuel cannot be zero!"
}
if money < limit {
      warning Sprintf("You don't have enough money: %v < %v", money, limit)
}
if idexist > 0 {
      info "You have already been registered"
}
```

### Sección de Acción {#action-section}

La sección `action` describe el código principal del contrato inteligente, que recupera otros datos y registra los valores de resultado en una tabla de base de datos. Por ejemplo:

``` js
action {
    DBUpdate("keys", $key_id, {"-amount": $amount})
    DBUpdate("keys", $recipient, {"+amount": $amount, "pub": $Pub})
}
```

## Variables {#variables}

Las variables declaradas en la sección **data** se pasan a otras partes del contrato inteligente usando el símbolo `$` seguido del nombre de la variable. El símbolo `$` también se puede usar para declarar variables que no están en la sección de datos. Estas variables se consideran variables globales para este contrato inteligente y todos los contratos inteligentes anidados.

Se pueden usar variables predefinidas dentro del contrato inteligente, que contienen datos de transacción para la llamada al contrato inteligente:

> -   `$time` -- Marca de tiempo de la transacción;
> -   `$ecosystem_id` -- ID del ecosistema;
> -   `$block` -- ID del bloque que contiene la transacción;
> -   `$key_id` -- Dirección de la cuenta que firmó la transacción actual;
> -   `$type` -- ID del contrato inteligente en la máquina virtual;
> -   `$block_key_id` -- Dirección de la cuenta del nodo que generó el bloque;
> -   `$block_time` -- Marca de tiempo de generación del bloque;
> -   `$original_contract` -- El nombre del contrato inteligente que procesó originalmente la transacción. Si esta variable es una cadena vacía, significa que el contrato inteligente fue llamado durante el proceso de verificación. Para verificar si el contrato inteligente fue llamado por otro contrato inteligente o directamente desde la transacción, es necesario comparar los valores de *\$original_contract* y *\$this_contract*. Si son iguales, significa que el contrato inteligente fue llamado directamente desde la transacción;
> -   `$this_contract` -- El nombre del contrato inteligente que se está ejecutando actualmente;
> -   `$guest_key` -- Dirección de la cuenta de invitado;
> -   `$stack` -- Pila de matriz de contrato inteligente, de tipo *array*, que contiene todos los contratos inteligentes ejecutados, con el primer elemento de la matriz que representa el nombre del contrato inteligente que se está ejecutando actualmente y el último elemento que representa el nombre del contrato inteligente que procesó originalmente la transacción;
> -   `$node_position` -- Número de índice de la matriz de nodos de validación donde se encuentra el bloque;
> -   `$txhash` -- Hash de transacción;
> -   `$contract` -- Matriz de estructura de contrato inteligente actual.

Las variables predefinidas no solo se pueden acceder dentro del contrato inteligente, sino también en los campos de permiso que definen las condiciones de acceso para los elementos de la aplicación. Cuando se usan en campos de permiso, las variables predefinidas relacionadas con la información del bloque siempre son iguales a cero, como `$time`, `$block`, etc.

La variable predefinida `$result` se asigna al resultado de retorno del contrato inteligente.

``` js
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

## Contratos inteligentes anidados {#nested-contracts}

En la sección de *condiciones* y *acción* de un contrato inteligente, se pueden anidar otros contratos inteligentes. Los contratos inteligentes anidados se pueden llamar directamente, y los parámetros del contrato inteligente se especifican entre paréntesis después del nombre del contrato inteligente, por ejemplo, `@1NameContract(Params)`. También se puede llamar utilizando la función [CallContract](#callcontract).

## Carga de archivos {#file-upload}

Para cargar archivos en un formulario utilizando el formato `multipart/form-data`, el tipo de datos del contrato inteligente debe ser `file`.

``` js
contract Upload {
    data {
        File file
    }
    ...
}
```
[UploadBinary](#uploadbinary) es un contrato inteligente utilizado para cargar y almacenar archivos. En el editor de páginas, se puede utilizar la función [Binary](templates2.md#binary) del lenguaje Logicor para obtener el enlace de descarga del archivo.

## Consultas en formato JSON {#queries-in-json-format}

En el lenguaje de contrato inteligente, el tipo de formato **JSON** se puede especificar como tipo de campo. Se utiliza la sintaxis:
**columnname->fieldname** para manejar los campos de entrada. El valor obtenido se registra en **columnname.fieldname**.

La sintaxis anterior se puede utilizar en las funciones *Columns, One, Where* de [DBFind](templates2.md#dbfind).

``` js
var ret map
var val str
var list array
ret = DBFind("mytable").Columns("myname,doc,doc->ind").WhereId($Id).Row()
val = ret["doc.ind"]
val = DBFind("mytable").Columns("myname,doc->type").WhereId($Id).One("doc->type")
list = DBFind("mytable").Columns("myname,doc,doc->ind").Where("doc->ind = ?", "101")
val = DBFind("mytable").WhereId($Id).One("doc->check")
```

## Consulta de formato de fecha y hora {#queries-with-date-and-time-operations}

Las funciones del lenguaje de contrato inteligente no pueden consultar ni actualizar directamente la fecha y hora, pero se pueden utilizar las funciones y características de PostgreSQL en la cláusula Where, como se muestra en el ejemplo.
Por ejemplo, si se necesita comparar el campo *date_column* con la hora actual y *date_column* es de tipo timestamp, la expresión sería `date_column < NOW()`;
si *date_column* es de tipo Unix, la expresión sería `to_timestamp(date_column) > NOW()`.

``` js
Where("to_timestamp(date_column) > NOW()")
Where("date_column < NOW() - 30 * interval '1 day'")
```

La función Needle a continuación se encarga de procesar fechas y horas en formato SQL:

* [BlockTime](#blocktime)
* [DateTime](#datetime)
* [UnixDateTime](#unixdatetime)

## Lenguaje de contrato inteligente Needle {#needle-contract-language}

Este lenguaje incluye un conjunto de funciones, operadores y estructuras que permiten procesar algoritmos de datos y operaciones de base de datos.

En caso de que se tenga permiso para editar el contrato inteligente y la condición de permiso no sea `false`, se pueden realizar cambios en el contenido del contrato inteligente. El historial completo de cambios realizados en el contrato inteligente se almacena en la cadena de bloques y se puede conocer a través de Weaver.

Las operaciones de datos en la cadena de bloques son ejecutadas por la versión más reciente del contrato inteligente.

### Basic Elements and Structure {#basic-elements-and-structure}

### Data Types and Variables {#data-types-and-variables}

Cada variable debe definir un tipo de datos, por lo general, el tipo de datos se convierte automáticamente. Se pueden utilizar los siguientes tipos de datos:

> -   `bool` - valores booleanos, `true` y `false`;
>
> -   `bytes` - formato de bytes;
>
> -   `int` - entero de 64 bits;
>
> -   `array` - matriz de valores de cualquier tipo;
>
> -   `map` - matriz de objetos;
>
> -   `money` - tipo de entero grande;
>
> -   `float` - flotante de 64 bits;
>
> -   `string` - cadena de caracteres, entre comillas dobles o formato de escape: \"This is a string\" o \`This is a string\`;
>
> -   `file` - matriz de objetos:
>
>     > -   `Name` - nombre del archivo, tipo `string`;
>     > -   `MimeType` - formato de archivo **mime-type**, tipo `string`;
>     > -   `Body` - contenido del archivo, tipo `bytes`.

Todos los identificadores, incluidos los nombres de variables, funciones y contratos inteligentes, son sensibles a mayúsculas y minúsculas (MyFunc y myFunc son nombres diferentes).

Se utiliza la palabra clave **var** para declarar una variable, seguida del nombre y tipo de la variable. Las variables declaradas dentro de llaves deben ser utilizadas dentro de la misma pareja de llaves.

Las variables declaradas tienen un valor predeterminado de cero: el valor cero para los tipos de datos booleanos es `false`, el valor cero para todos los tipos de datos numéricos es `0`, el valor cero para los tipos de datos de cadena es una cadena vacía. Ejemplo de declaración de variable:

``` js
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

Este lenguaje admite dos tipos de arrays:

- `array` - un array con índices que comienzan en 0;
- `map` - un array de objetos.

Cuando se asignan y recuperan elementos de un array, el índice debe estar entre corchetes. Los arrays no admiten múltiples índices, no se puede tratar un elemento de un array como *myarr\[i\]\[j\]*.

``` js
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

Puedes definir un tipo de `array` especificando los elementos en `[]`. Para los arrays de tipo `map`, utiliza `{}`.

``` js
var my map
my={"key1": "value1", key2: i, "key3": $Name}
var mya array
mya=["value1", {key2: i}, $Name]
```

Puede utilizar esta inicialización en expresiones, por ejemplo, en los parámetros de una función.

``` js
DBFind...Where({id: 1})
```

Para matrices de objetos, debes especificar una clave. La clave se especifica como una cadena entre comillas dobles (`""`). Si el nombre de la clave solo contiene letras, números y guiones bajos, se pueden omitir las comillas dobles.

``` js
{key1: "value1", key2: "value2"}
```

El array puede contener cadenas de texto, números, cualquier tipo de nombre de variable y nombres de variable con el símbolo `$`. Admite arrays anidados, donde se pueden especificar diferentes mapeos o arrays como valores.

Las expresiones no pueden ser utilizadas como elementos de un array. En su lugar, se debe utilizar una variable para almacenar el resultado de la expresión y especificar esa variable como elemento del array.

``` js
[1+2, myfunc(), name["param"]] // don't do this
[1, 3.4, mystr, "string", $ext, myarr, mymap, {"ids": [1,2, i], company: {"Name": "MyCompany"}} ] // this is ok

var val string
val = my["param"]
MyFunc({key: val, sub: {name: "My name", "color": "Red"}})
```

### Declaraciones If y While {#if-and-while-statements}

El lenguaje de contrato inteligente admite declaraciones de condición estándar **if** y bucles **while**, que se pueden utilizar en contratos inteligentes y funciones. Estas declaraciones se pueden anidar entre sí.

Después de las palabras clave **if** y **while**, debe seguir una declaración de condición. Si la declaración de condición devuelve un número, se considera *falso* cuando su valor es 0.

*val == 0* es igual a *!val*, *val != 0* es igual a *val*. La declaración **if** puede tener un bloque de código **else**, que se ejecuta cuando la declaración de condición **if** es *falsa*.

Los siguientes operadores de comparación se pueden utilizar en declaraciones de condición: `<, >, >=, <=, ==, !=, ||, &&`.

``` js
if val > 10 || id != $block_key_id {
    ...
} else {
    ...
}
```

El bucle **while** ejecuta el bloque de código mientras la declaración de condición sea *verdadera*. La instrucción **break** se utiliza para salir del bucle, mientras que la instrucción **continue** se utiliza para saltar al inicio del bucle y continuar con la siguiente iteración.

``` js
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

Aparte de las declaraciones condicionales, needle también admite operaciones aritméticas estándar: `+`, `-`, `*`, `/`.

Los tipos de datos **string** y **bytes** se pueden utilizar como declaraciones condicionales. Si la longitud del tipo es mayor que cero, la condición es *verdadera*, de lo contrario es *falsa*.

### Funciones {#functions}

Las funciones pueden realizar operaciones en los datos recibidos por la sección de datos del contrato inteligente: leer y escribir datos en la base de datos, convertir tipos de valores y establecer interacciones entre contratos inteligentes.

#### Declaración de funciones {#function-declaration}

Se utiliza la palabra clave **func** para declarar una función, seguida del nombre de la función y la lista de argumentos y sus tipos de datos que se le pasan. Todos los argumentos se encierran entre paréntesis y se separan por comas. Después de los paréntesis, se debe declarar el tipo de datos del valor de retorno de la función. El cuerpo de la función debe estar entre llaves. Si la función no tiene argumentos, las llaves pueden omitirse. 
Se utiliza la palabra clave `return` para devolver el valor de retorno de la función.

``` js
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

La función no devolverá errores ya que todas las comprobaciones de errores se realizan automáticamente. Cuando se produce un error en cualquier función, el contrato inteligente detendrá su operación y mostrará una ventana que contiene una descripción del error.

#### Parámetros de longitud variable {#variable-length-parameters}

Las funciones pueden definir parámetros de longitud variable utilizando el símbolo `...` como el último tipo de parámetro de la función, lo que indica que es un parámetro de longitud variable y su tipo de datos es `array`. El parámetro de longitud variable contiene todas las variables desde la variable que se pasa al llamar a la función. Se pueden pasar variables de cualquier tipo, pero debe manejar conflictos con tipos de datos que no coinciden.

``` js
func sum(out string, values ...) {
    var i, res int

    while i < Len(values) {
       res = res + values[i]
       i = i + 1
    }
    Println(out, res)
}

func main() {
   sum("Sum:", 10, 20, 30, 40)
}
```

#### Parámetros opcionales {#optional-parameters}

Una función puede tener muchos parámetros, pero a veces solo necesitamos algunos de ellos al llamarla. En este caso, podemos declarar parámetros opcionales de la siguiente manera: `func myfunc(name string).Param1(param string).Param2(param2 int) {...}`, lo que nos permite llamar a la función y especificar los parámetros en cualquier orden: `myfunc("name").Param2(100)`.

Dentro del cuerpo de la función, podemos manejar estas variables como lo haríamos normalmente. Si no se llama a un parámetro opcional específico, su valor predeterminado será cero.
También podemos usar `...` para especificar parámetros de longitud variable: `func DBFind(table string).Where(request string, params ...)`. Luego podemos llamarlo así: `DBFind("mytable").Where({"id": $myid, "type": 2})`.

``` js
func DBFind(table string).Columns(columns string).Where(format string, tail ...)
         .Limit(limit int).Offset(offset int) string  {
   ...
}

func names() string {
   ...
   return DBFind("table").Columns("name").Where({"id": 100}).Limit(1)
}
```

## Clasificación de funciones de la función Needle {#needle-functions-classification}

Búsqueda en la base de datos de valores:

|                 |               |                 |
| --------------- | ------------- | --------------- |
| [AppParam](#appparam)        | [EcosysParam](#ecosysparam)   | [GetDataFromXLSX](#getdatafromxlsx) |
| [DBFind](#dbfind)          | [GetHistory](#gethistory)    | [GetRowsCountXLSX](#getrowscountxlsx) |
| [DBRow](#dbrow)           | [GetHistoryRow](#gethistoryrow) | [GetBlock](#getblock)        |
| [DBSelectMetrics](#dbselectmetrics) | [GetColumnType](#getcolumntype) | [LangRes](#langres)         |

Cambiar el valor de una tabla de datos:

|          |             |          |
| -------- | ----------- | -------- |
| [DBInsert](#dbinsert) | [DBUpdateExt](#dbupdateext) | [DelTable](#deltable) |
| [DBUpdate](#dbupdate) | [DelColumn](#delcolumn)   |          |


Operaciones de arreglo:

|        |      |            |
| ------ | ---- | ---------- |
| [Append](#append) | [Len](#len)  | [GetMapKeys](#getmapkeys) |
| [Join](#join)   | [Row](#row)  | [SortedKeys](#sortedkeys) |
| [Split](#split)  | [One](#one)  |            |

Contratos inteligentes y operaciones de permisos:

|                    |                   |                   |
| ------------------ | ----------------- | ----------------- |
| [CallContract](#callcontract)       | [GetContractById](#getcontractbyid)   | [TransactionInfo](#transactioninfo)   |
| [ContractAccess](#contractaccess)     | [RoleAccess](#roleaccess)        | [Throw](#throw)             |
| [ContractConditions](#contractconditions) | [GetContractByName](#getcontractbyname) | [ValidateCondition](#validatecondition) |
| [EvalCondition](#evalcondition)      |                   |                   |

Operación de dirección de billetera:

|             |             |         |
| ----------- | ----------- | ------- |
| [AddressToId](#addresstoid) | [IdToAddress](#idtoaddress) | [PubToID](#pubtoid) |

Operación de valores de variables:

|              |             |        |
| ------------ | ----------- | ------ |
| [DecodeBase64](#decodebase64) | [FormatMoney](#formatmoney) | [Hash](#hash)   |
| [EncodeBase64](#encodebase64) | [Random](#random)      | [Sha256](#sha256) |
| [Float](#float)        | [Int](#int)         | [Str](#str)    |
| [HexToBytes](#hextobytes)   |             |        |

Operaciones aritméticas:

|       |       |       |
| ----- | ----- | ----- |
| [Floor](#floor) | [Log10](#log10) | [Round](#round) |
| [Log](#log)   | [Pow](#pow)   | [Sqrt](#sqrt)  |

Operación de formato JSON:

|            |                  |            |
| ---------- | ---------------- | ---------- |
| [JSONEncode](#jsonencode) | [JSONEncodeIndent](#jsonencodeindent) | [JSONDecode](#jsondecode) |


Manipulación de cadenas:

|           |         |           |
| --------- | ------- | --------- |
| [HasPrefix](#hasprefix) | [Size](#size)    | [ToLower](#tolower)   |
| [Contains](#contains)  | [Sprintf](#sprintf) | [ToUpper](#toupper)   |
| [Replace](#replace)   | [Substr](#substr)  | [TrimSpace](#trimspace) |


Manipulación de bytes:

|               |               |      |
| ------------- | ------------- | ---- |
| [StringToBytes](#stringtobytes) | [BytesToString](#bytestostring) |      |


Operaciones de fecha y hora en formato SQL:

|           |          |              |
| --------- | -------- | ------------ |
| [BlockTime](#blocktime) | [DateTime](#datetime) | [UnixDateTime](#unixdatetime) |

Operación de parámetros de la plataforma:

|           |          |              |
| --------- | -------- | ------------ |
| [SysParamString](#sysparamstring) | [SysParamInt](#sysparamint) | [DBUpdateSysParam](#dbupdatesysparam) |
| [UpdateNotifications](#updatenotifications) | [UpdateRolesNotifications](#updaterolesnotifications) | |


Operación de la función de modo CLB:

|           |          |              |
| --------- | -------- | ------------ |
| [HTTPRequest](#httprequest) | [HTTPPostJSON](#httppostjson) | |


Operaciones de la función del nodo CLB principal:

|                         |                           |                  |
|-------------------------|---------------------------|------------------|
| [CreateOBS](#createobs) | [GetOBSList](#getobslist) | [RunOBS](#runobs) |
| [StopOBS](#stopobs)     | [RemoveOBS](#removeobs)   | |


## Referencia de la función Needle {#needle-functions-reference}

### AppParam {#appparam}

Devolver el valor de un parámetro de aplicación especificado (de la tabla de parámetros de aplicación *app_params*).

**Gramática**

``` text
AppParam(app int, name string, ecosystemid int) string
```

> app

    Identificación de la aplicación.

> name

    Nombre del parámetro de la aplicación.

> ecosystemid

    ID del ecosistema.

**Ejemplo**

``` js
AppParam(1, "app_account", 1)
```

### DBFind {#dbfind}

Buscar datos de una tabla específica según los parámetros especificados. Devuelve un array *array* compuesto por arrays de objetos *map*.

`.Row()` devuelve el primer elemento *map* del registro solicitado, mientras que `.One(column string)` devuelve el primer elemento *map* de la columna especificada en el registro solicitado.


**Gramática**

``` text
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

> table

    Nombre de la tabla de datos.

> сolumns

    Devuelve una lista de columnas. Si no se especifica, se devolverán todas las columnas.
    
    El valor es un array o una cadena separada por comas.

> where

    Búsqueda de condiciones.

    Ejemplo: `.Where({name: "John"})` o `.Where({"id": {"$gte": 4}})`.

    Este parámetro debe contener una matriz de objetos con condiciones de búsqueda. Esta matriz puede contener elementos anidados.
    
    Siguiendo la estructura sintáctica a continuación:

-   `{"field1": "value1", "field2" : "value2"}`

    > Equivalente a `field1 = "value1" AND field2 = "value2"`.

-   `{"field1": {"$eq":"value"}}`

    > Equivalente a `field = "value"`.

-   `{"field1": {"$neq": "value"}}`

    > Equivalente a `field != "value"`.

-   `{"field1: {"$in": [1,2,3]}`

    > Equivalente a `field IN (1,2,3)`.

-   `{"field1": {"$nin" : [1,2,3]}`

    > Equivalente a `field NOT IN (1,2,3)`.

-   `{"field": {"$lt": 12}}`

    > Equivalente a `field < 12`.

-   `{"field": {"$lte": 12}}`

    > Equivalente a `field <= 12`.

-   `{"field": {"$gt": 12}}`

    > Equivalente a `field > 12`.

-   `{"field": {"$gte": 12}}`

    > Equivalente a `field >= 12`.

-   `{"$and": [<expr1>, <expr2>, <expr3>]}`

    > Equivalente a `expr1 AND expr2 AND expr3`.

-   `{"$or": [<expr1>, <expr2>, <expr3>]}`

    > Equivalente a `expr1 OR expr2 OR expr3`.

-   `{field: {"$like": "value"}}`

    > Equivalente a `field like '%value%'` (búsqueda difusa).

-   `{field: {"$begin": "value"}}`

    > Equivalente a `field like 'value%'` (comienza con `value`).

-   `{field: {"$end": "value"}}`

    > Equivalente a `field like '%value'` (termina con `value`).

-   `{field: "$isnull"}`

    > Equivalente a `field is null`.

Por favor, asegúrese de no sobrescribir las claves del arreglo de objetos. Por ejemplo, si desea realizar una consulta con la sentencia `id>2 y id<5`, no puede utilizar `{id:{"$gt": 2}, id:{"$lt": 5}}`, ya que el primer elemento será sobrescrito por el segundo elemento. Debe utilizar la siguiente estructura de consulta:

``` js
{id: [{"$gt": 2}, {"$lt": 5}]}
```

``` js
{"$and": [{id:{"$gt": 2}}, {id:{"$lt": 5}}]}
```

> id

    Según el ID de búsqueda. Por ejemplo, `.WhereId(1)`.

> order

    Solía ordenar el conjunto de resultados en función de la columna especificada. Por defecto, se ordena por *id*.

Si la ordenación se realiza en función de un solo campo, se puede especificar como una cadena. Para ordenar en función de varios campos, se debe especificar una matriz de objetos de cadena:

Descendente: `{"field": "-1"}` es equivalente a `field desc`.

Ascendente: `{"field": "1"}` es equivalente a `field asc`.

    
> limit

    Devuelve el número de entradas. El valor predeterminado es de 25 entradas y el máximo es de 10000 entradas.

> offset

    Desplazamiento.

> ecosystemid

    ID del ecosistema. Por defecto, se consulta la tabla de datos del ecosistema actual.

**Ejemplo**

``` js
var i int
var ret string

ret = DBFind("contracts").Columns("id,value").Where({id: [{"$gt": 2}, {"$lt": 5}]}).Order("id")
while i < Len(ret) {
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

### DBRow {#dbrow}

Según los parámetros especificados, busca datos en la tabla de datos especificada. Devuelve un array *array* compuesto por un conjunto de objetos *map*.

**Gramática**

``` text
DBRow(table string)
    [.Columns(columns array|string)]
    [.Where(where map)]
    [.WhereId(id int)]
    [.Order(order array|string)]
    [.Ecosystem(ecosystemid int)] map
```

* table

    Nombre de la tabla de datos.


* columns

    Devuelve una lista de columnas. Si no se especifica, se devolverán todas las columnas.
    
    El valor es un array o una cadena separada por comas.

* where

    Criterios de búsqueda.
    
    Por ejemplo: `.Where({name: "John"})` o `.Where({"id": {"$gte": 4}})`.
    
    Para obtener información más detallada, consulte [DBFind](../topics/templates2.md#dbfind).

* id

    Buscar por ID. Por ejemplo, `.WhereId(1)`.

* order

    Se utiliza para ordenar el conjunto de resultados según la columna especificada. Por defecto, se ordena por *id*.

    Para obtener más información, consulte [DBFind](../topics/templates2.md#dbfind).

* ecosystemid

    ID del ecosistema. Por defecto, se busca la tabla de datos del ecosistema actual.

**Ejemplo**

``` js
var ret map
ret = DBRow("contracts").Columns(["id","value"]).Where({id: 1})
Println(ret)
```

### DBSelectMetrics {#dbselectmetrics}

Devolver datos agregados para las métricas.

Los estándares de las métricas se actualizarán cada 100 bloques generados. Los datos agregados se almacenarán diariamente.

**Gramática**

``` text
DBSelectMetrics(metric string, timeInterval string, aggregateFunc string) array
```

* metric

    Nombre del indicador.

* ecosystem_pages

    Número de páginas del ecosistema.

    Valor de retorno: *key* - ID del ecosistema, *value* - número de páginas del ecosistema.


* ecosystem_members

    Número de miembros del ecosistema.

    Valor de retorno: *key* - ID del ecosistema, *value* - número de miembros del ecosistema.


* ecosystem_tx

    Número de transacciones del ecosistema.

    Valor de retorno: *key* - ID del ecosistema, *value* - número de transacciones del ecosistema.

* timeInterval

    Intervalo de tiempo para la agregación de datos. Por ejemplo: `1 day`, `30 days`.

* aggregateFunc

    Función de agregación. Por ejemplo: `max`, `min`, `avg`.

**Ejemplo**

``` js
var rows array
rows = DBSelectMetrics("ecosystem_tx", "30 days", "avg")

var i int
while(i < Len(rows)) {
   var row map
   row = rows[i]
   i = i + 1
}
```

### EcosysParam {#ecosysparam}

Devolver el valor del parámetro especificado en la tabla de parámetros del ecosistema *parámetros*.

**Gramática**

``` text
EcosysParam(name string) string
```

* name

    Nombre del parámetro.

**Ejemplo**

``` js
Println(EcosysParam("founder_account"))
```

### GetHistory {#gethistory}

Recuperar el historial de cambios realizados en las entradas de una tabla de datos especificada.

**Gramática**

``` text
GetHistory(table string, id int) array
```

* table

    Nombre de la tabla de datos.


* id

    ID de entrada.


**Valor de retorno**

Devuelva una matriz de objetos de tipo *map*. Estas matrices especifican el historial de cambios de entradas en la tabla de datos.

Cada matriz contiene los campos de registro antes del próximo cambio.

Las matrices se ordenan en orden de cambio más reciente.

El campo *id* en la matriz apunta al campo *id* en la tabla *rollback_tx*. *block_id* representa el ID del bloque y *block_time* representa la marca de tiempo de generación del bloque.

**Ejemplo**

``` js
var list array
var item map
list = GetHistory("blocks", 1)
if Len(list) > 0 {
   item = list[0]
}
```

### GetHistoryRow {#gethistoryrow}

Devolver una única instantánea del historial de cambios de una entrada específica en una tabla de datos especificada.

**Gramática**

``` text
GetHistoryRow(table string, id int, rollbackId int) map
```

* table

    Nombre de la tabla de datos.

* id

    ID de entrada.

* rollbackId

    ID de entrada de la tabla *rollback_tx*.


``` js
$result = GetHistoryRow("contracts",205,2358)
```

### GetColumnType {#getcolumntype}

Devolver el tipo de datos de un campo especificado en una tabla especificada.

**Gramática**

``` text
GetColumnType(table, column string) string
```

* table

    Nombre de la tabla de datos.

* column

  Nombre del campo.

**Valor de retorno**

Devuelve los siguientes tipos: `text, varchar, number, money, double, bytes, json, datetime, double`。

**Ejemplo**

``` js
var coltype string
coltype = GetColumnType("members", "member_name")
```

### GetDataFromXLSX {#getdatafromxlsx}

Devolver datos de una hoja de cálculo *XLSX*.

**Gramática**

``` text
GetDataFromXLSX(binId int, line int, count int, sheet int) string
```

* binId

    ID en formato XLSX en la tabla binaria *binary*.

* line

    Comience la fila, por defecto comienza en 0.

* count

    número de filas a devolver.

* sheet

    Listado de números, por defecto comienza en 1.

**Ejemplo**

``` js
var a array
a = GetDataFromXLSX(3, 12, 10, 1)
```

### GetRowsCountXLSX {#getrowscountxlsx}

Devuelve el número de filas de un archivo XLSX especificado.

**Gramática**

``` text
GetRowsCountXLSX(binId int, sheet int) int
```

* binId

    ID en formato XLSX en la tabla binaria *binary*.

* sheet

    Listado de números, por defecto comienza en 1.

**Ejemplo**

``` js
var count int
count = GetRowsCountXLSX(binid, 1)
```

### LangRes {#langres}

Devolver recursos multilingües especificados. Su etiqueta *lang* es un código de idioma de dos caracteres, como: `en, es`. Si la etiqueta de idioma seleccionada no tiene recursos de idioma, devuelva los recursos de idioma de la etiqueta `es`.

**Gramática**

``` text
LangRes(label string, lang string) string
```

* label

    Nombre de recursos de idioma.

* lang

    Código de idioma de dos caracteres.

**Ejemplo**

``` js
warning LangRes("@1confirm", "en")
error LangRes("@1problems", "es")
```

### GetBlock {#getblock}

Devolver información relacionada con un bloque especificado.

**Gramática**

``` text
GetBlock(blockID int64) map
```

* blockID

    Identificador de bloque.

**Valor de retorno**

Devuelve una matriz de objetos:

-   *id*

    > Identificador de bloque.

-   *time*

    > Marca de tiempo de generación de bloque.

-   *key_id*

    > Generar la dirección de la cuenta del nodo de validación que creó este bloque.

**Ejemplo**

``` js
var b map
b = GetBlock(1)
Println(b)
```

### DBInsert {#dbinsert}

Agregar una entrada a una tabla de datos específica y devolver el ID de la entrada.

**Gramática**

``` text
DBInsert(table string, params map) int
```

* tblname

    Nombre de la tabla de datos.

* params

    Array de objetos, donde la clave es el nombre del campo y el valor es el valor a insertar.

**Ejemplo**

``` js
DBInsert("mytable", {name: "John Smith", amount: 100})
```

### DBUpdate {#dbupdate}

Cambiar el valor de la columna de una entrada especificada por ID en una tabla de datos especificada. Si el ID de entrada no existe en la tabla, devolver un error.

**Gramática**

``` text
DBUpdate(tblname string, id int, params map)
```

* tblname

    Nombre de la tabla de datos.

* id

    ID de entrada.

* params

    Array de objetos, donde la clave es el nombre del campo y el valor es el nuevo valor a cambiar.

**Ejemplo**

``` js
DBUpdate("mytable", myid, {name: "John Smith", amount: 100})
```

### DBUpdateExt {#dbupdateext}

Modificar los valores de las columnas que coinciden con la condición de búsqueda en una tabla de datos específica.

**Gramática**

``` text
DBUpdateExt(tblname string, where map, params map)
```

* tblname

    Nombre de la tabla de datos.

* where

    Condiciones de la consulta.

Para obtener información más detallada, consulte [DBFind](../topics/templates2.md#dbfind).


* params

    Array de objetos, donde la clave es el nombre del campo y el valor es el nuevo valor a cambiar.

**Ejemplo**

``` js
DBUpdateExt("mytable", {id: $key_id, ecosystem: $ecosystem_id}, {name: "John Smith", amount: 100})
```

### DelColumn {#delcolumn}

Eliminar un campo específico de una tabla. La tabla debe estar vacía.

**Gramática**

``` text
DelColumn(tblname string, column string)
```

* tblname

    Nombre de la tabla de datos.

* column

    necesita eliminar el campo.

``` js
DelColumn("mytable", "mycolumn")
```

### DelTable {#deltable}

Eliminar la tabla de datos especificada. La tabla debe estar vacía.

**Gramática**

``` text
DelTable(tblname string)
```

* tblname

    Nombre de la tabla de datos.

**Ejemplo**

``` js
DelTable("mytable")
```

### Append {#append}

Inserte cualquier tipo de *val* en el arreglo *src*.

**Gramática**

``` text
Append(src array, val anyType) array
```

* src

    La matriz original.

* val

    necesita valores a insertar.

**Ejemplo**

``` js
var list array
list = Append(list, "new_val")
```

### Join {#join}

Unir los elementos del arreglo *in* en una cadena con el separador *sep* especificado.

**Gramática**

``` text
Join(in array, sep string) string
```

* in

    Nombre del arreglo.

* sep

    Separador.

**Ejemplo**

``` js
var val string, myarr array
myarr[0] = "first"
myarr[1] = 10
val = Join(myarr, ",")
```

### Split {#split}

Divide la cadena *in* en elementos utilizando el separador *sep* y colócalos en un arreglo.

**Gramática**

``` text
Split(in string, sep string) array
```

* in

    Cadena de caracteres.

* sep

    Separador.

**Ejemplo**

``` js
var myarr array
myarr = Split("first,second,third", ",")
```

### Len {#len}

Devuelve el número de elementos en un arreglo especificado.

**Gramática**

``` text
Len(val array) int
```

* val

    Matriz.

**Ejemplo**

``` js
if Len(mylist) == 0 {
  ...
}
```

### Row {#row}

El parámetro *lista* no debe ser especificado en este caso.

Devolver el primer objeto de la matriz en la lista de matrices. Si la lista está vacía, devolver un resultado vacío. Esta función se utiliza principalmente en conjunto con la función [DBFind](templates2.md#dbfind) y no se pueden especificar parámetros al usarla.

**Gramática**

``` text
Row(list array) map
```

* list

    Array de objetos devuelto por la función **DBFind**.

**Ejemplo**

``` js
var ret map
ret = DBFind("contracts").Columns("id,value").WhereId(10).Row()
Println(ret)
```

### One {#one}

Devolver el valor del campo del primer objeto de la matriz en la lista de matrices. Si la matriz de la lista está vacía, devolver nil. Esta función se utiliza principalmente con la función [DBFind](templates2.md#dbfind) y no se puede especificar con parámetros cuando se utiliza.

**Gramática**

``` text
One(list array, column string) string
```

* list

  - Array de objetos devuelto por la función **DBFind**.

* column

  - Nombre del campo.

**Ejemplo**

``` js
var ret string
ret = DBFind("contracts").Columns("id,value").WhereId(10).One("value")
if ret != nil {
   Println(ret)
}
```

### GetMapKeys {#getmapkeys}

Retorna un array de claves de un array de objetos.

**Gramática**

``` text
GetMapKeys(val map) array
```

* val

  Objeto de matriz.

**Ejemplo**

``` js
var val map
var arr array
val["k1"] = "v1"
val["k2"] = "v2"
arr = GetMapKeys(val)
```

### SortedKeys {#sortedkeys}

Devuelve un array de claves de un array de objetos, ordenado en orden ascendente.

**Gramática**

``` text
SortedKeys(val map) array
```

* val

  Objeto de matriz.

**Ejemplo**

``` js
var val map
var arr array
val["k2"] = "v2"
val["k1"] = "v1"
arr = SortedKeys(val)
```

### CallContract {#callcontract}

Llame al contrato inteligente con el nombre especificado. Todos los parámetros de la sección de datos del contrato inteligente deben incluirse en una matriz de objetos. Esta función devuelve el valor asignado al variable **\$result** del contrato inteligente especificado.

**Gramática**

``` text
CallContract(name string, params map)
```

* name

  Nombre del contrato invocado.

* params

  Array asociativo de datos de entrada de un contrato inteligente.

**Ejemplo**

``` js
var par map
par["Name"] = "My Name"
CallContract("MyContract", par)
```

### ContractAccess {#contractaccess}

Verifique si el nombre de ejecución del contrato inteligente coincide con uno de los nombres enumerados en los parámetros. Se utiliza comúnmente para controlar el acceso del contrato inteligente a las tablas de datos. Especifique esta función en el campo de permisos al editar los campos de la tabla de datos o al insertar y agregar nuevos campos en la sección de permisos de la tabla.

**Gramática**

``` text
ContractAccess(name string, [name string]) bool
```

* name

  Nombre del contrato inteligente.

**Ejemplo**

``` js
ContractAccess("MyContract")
ContractAccess("MyContract","SimpleContract")
```

### ContractConditions {#contractconditions}

Llame a la sección de condiciones **conditions** de un contrato inteligente con el nombre especificado.

Para este tipo de contrato inteligente, la sección de datos debe estar vacía. Si la sección de condiciones se ejecuta sin errores, se devuelve *true*. Si se genera un error durante la ejecución, el contrato inteligente padre también terminará con este error.

Esta función se utiliza normalmente para controlar el acceso del contrato inteligente a las tablas y se puede llamar en el campo de permisos al editar las tablas del sistema.

**Gramática**

``` text
ContractConditions(name string, [name string]) bool
```

* name

  Nombre del contrato inteligente.

**Ejemplo**

``` js
ContractConditions("MainCondition")
```

### EvalCondition {#evalcondition}

Obtener el valor del campo *condfield* de los registros con el campo *'name'* de la tabla *tablename*, y verificar la condición del valor del campo *condfield*.

**Gramática**

``` text
EvalCondition(tablename string, name string, condfield string)
```

* tablename

  Nombre de la tabla de datos.

* name

  Buscar valores según el campo 'name'.

* condfield

  Nombre del campo que requiere verificación de condiciones.

**Ejemplo**

``` js
EvalCondition(`menu`, $Name, `conditions`)
```

### GetContractById {#getcontractbyid}

La función devuelve el nombre del contrato inteligente por su ID de contrato inteligente. Si no se puede encontrar el contrato inteligente, se devuelve una cadena vacía.

**Gramática**

``` text
GetContractById(id int) string
```

* id

  Encontrar el ID del contrato inteligente en la tabla de contratos inteligentes *contracts*.

**Ejemplo**

``` js
var name string
name = GetContractById($IdContract)
```

### GetContractByName {#getcontractbyname}

La función devuelve el ID del contrato inteligente por su nombre. Si no se puede encontrar el contrato inteligente, devuelve cero.

**Gramática**

``` text
GetContractByName(name string) int
```

* name

  El nombre del contrato inteligente en la tabla de contratos inteligentes *contracts*.

**Ejemplo**

``` js
var id int
id = GetContractByName(`NewBlock`)
```

### RoleAccess {#roleaccess}

Verificar si el ID de rol del llamador del contrato inteligente coincide con uno de los IDs especificados en los parámetros.

Se puede utilizar esta función para controlar el acceso a tablas de datos y otros datos en el contrato inteligente.

**Gramática**

``` text
RoleAccess(id int, [id int]) bool
```

* id

  角色ID。 

**Ejemplo**

``` js
RoleAccess(1)
RoleAccess(1, 3)
```

### TransactionInfo {#transactioninfo}

Buscar transacciones según el valor hash especificado y devolver información sobre los contratos inteligentes ejecutados y sus parámetros.

**Gramática**

``` text
TransactionInfo(hash: string)
```

* hash

  Formato de cadena hexadecimal de hash de transacción.

**Valor de retorno**

Esta función devuelve una cadena en formato JSON:

> ``` json
> {"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
> ```
* contract

  Nombre del contrato inteligente.
* params

  Datos que se pasan como parámetros a un contrato inteligente.

* block

  ID de bloque que procesó la transacción.

**Ejemplo**

``` js
var out map
out = JSONDecode(TransactionInfo(hash))
```

### Throw {#throw}

Crear un error del tipo *excepción*.

**Gramática**

``` text
Throw(ErrorId string, ErrDescription string)
```

* ErrorId

  Error de identificador.

* ErrDescription

  Descripción incorrecta.

**Valor de retorno**

El formato de los resultados para este tipo de transacción:

``` json
{"type":"exception","error":"Error description","id":"Error ID"}
```

**Ejemplo**

``` js
Throw("Problem", "There is a problem")
```

### ValidateCondition {#validatecondition}

Intentando compilar la condición especificada en el parámetro *condition*. Si ocurre algún error durante el proceso de compilación, se generará un error y se detendrá la llamada al contrato inteligente. Esta función tiene como objetivo verificar la corrección del formato de la condición.

**Gramática**

``` text
ValidateCondition(condition string, state int)
```

* condition

  Condiciones de formato que necesitan ser verificadas.

* state

  ID del ecosistema. Si se están verificando las condiciones globales, por favor especifique como 0.

**Ejemplo**

``` js
ValidateCondition(`ContractAccess("@1MyContract")`, 1)
```

### AddressToId {#addresstoid}

Devuelve la dirección de la cuenta correspondiente según la dirección de la billetera proporcionada. Si se especifica una dirección no válida, devuelve '0'.

**Gramática**

``` text
AddressToId(address string) int
```

* address

  Dirección de la billetera en formato `XXXX-...-XXXX` o en forma numérica.

**Ejemplo**

``` js
wallet = AddressToId($Recipient)
```

### IdToAddress {#idtoaddress}

De acuerdo con la dirección de la cuenta, devuelve la dirección de la billetera correspondiente. Si se especifica una dirección no válida, devuelve la dirección no válida 'inválida'.

**Gramática**

``` text
IdToAddress(id int) string
```

* id

  Dirección de cuenta.

**Ejemplo**

``` js
$address = IdToAddress($id)
```

### PubToID {#pubtoid}

Devuelve la dirección de la cuenta a través del formato de codificación hexadecimal de la clave pública.

**Gramática**

``` text
PubToID(hexkey string) int
```

* hexkey

  Clave pública en formato de codificación hexadecimal.

**Ejemplo**

``` js
var wallet int
wallet = PubToID("04fa5e78.....34abd6")
```

### DecodeBase64 {#decodebase64}

Devuelve una cadena especificando el formato de codificación base64.

**Gramática**

``` text
DecodeBase64(input string) string
```

* input

  La cadena de caracteres en formato Base64.

**Ejemplo**

``` js
val = DecodeBase64(mybase64)
```

### EncodeBase64 {#encodebase64}

Devuelve una Cadena de caracteres en formato base64 al especificar una cadena de entrada.

**Gramática**

``` text
EncodeBase64(input string) string
```

* input

  Necesita codificar la cadena.

**Ejemplo**

``` js
var base64str string
base64str = EncodeBase64("my text")
```

### Float {#float}

Convertir un entero o una cadena a un número decimal.

**Gramática**

``` text
Float(val int|string) float
```

* val

  Integer o cadena de caracteres.

**Ejemplo**

``` js
val = Float("567.989") + Float(232)
```

### HexToBytes {#hextobytes}

Convertir una cadena en formato de codificación hexadecimal a tipo de bytes *bytes*.

**Gramática**

``` text
HexToBytes(hexdata string) bytes
```

* hexdata

  Cadena de caracteres en formato de codificación hexadecimal.

**Ejemplo**

``` js
var val bytes
val = HexToBytes("34fe4501a4d80094")
```

### FormatMoney {#formatmoney}

Returna el valor de cadena de *exp / 10 \^ digit*.

**Gramática**

``` text
FormatMoney(exp string, digit int) string
```

* exp

  Formato de cadena de números.

* digit

  La expresión `exp/10^digit` tiene un exponente de 10, que puede ser positivo o negativo. Un valor positivo determina la cantidad de decimales después del punto decimal.

**Ejemplo**

``` js
s = FormatMoney("78236475917384", 0)
```

### Random {#random}

Retorna un número aleatorio entre min y max (min <= resultado < max). Tanto min como max deben ser números positivos.

**Gramática**

``` text
Random(min int, max int) int
```

* min

  El valor mínimo del número aleatorio.

* max

  El límite superior del número aleatorio. El número aleatorio generado será menor que ese valor.

**Ejemplo**

``` js
i = Random(10,5000)
```

### Int {#int}

Convertir un valor de cadena a un entero.

**Gramática**

``` text
Int(val string) int
```

* val

  Formato de cadena de números.

**Ejemplo**

``` js
mystr = "-37763499007332"
val = Int(mystr)
```

### Hash {#hash}

Devolver el hash de una matriz de bytes o cadena especificada, generado por la biblioteca de cifrado del sistema "crypto".

**Gramática**

``` text
Hash(val interface{}) string, error
```

* val

  Cadena de caracteres o matriz de bytes.

**Ejemplo**

``` js
var hash string
hash = Hash("Test message")
```

### Sha256 {#sha256}

Retorna el valor hash **SHA256** de una cadena especificada.

**Gramática**

``` text
Sha256(val string) string
```

* val

  Se necesita una cadena de caracteres para la operación de hash Sha256.

**Ejemplo**

``` js
var sha string
sha = Sha256("Test message")
```

### Str {#str}

Convertir un entero *int* o un número decimal *float* a una cadena de caracteres.

**Gramática**

``` text
Str(val int|float) string
```

* val

  Número entero o decimal.

**Ejemplo**

``` js
myfloat = 5.678
val = Str(myfloat)
```

### JSONEncode {#jsonencode}

Convertir números, cadenas o matrices a una cadena de formato JSON.

**Gramática**

``` text
JSONEncode(src int|float|string|map|array) string
```

* src

  Los datos a convertir.

**Ejemplo**

``` js
var mydata map
mydata["key"] = 1
var json string
json = JSONEncode(mydata)
```

### JSONEncodeIndent {#jsonencodeindent}

Utilice la indentación especificada para convertir números, cadenas o matrices en una cadena con formato JSON.

**Gramática**

``` text
JSONEncodeIndent(src int|float|string|map|array, indent string) string
```

* src

  Gracias por la información.

* indent

  Utilizado como una cadena para la indentación.

**Ejemplo**

``` js
var mydata map
mydata["key"] = 1
var json string
json = JSONEncodeIndent(mydata, "\t")
```

### JSONDecode {#jsondecode}

Convertir una cadena en formato JSON a un número, una cadena o un arreglo.

**Gramática**

``` text
JSONDecode(src string) int|float|string|map|array
```

* src

  String que contiene datos en formato JSON.

**Ejemplo**

``` js
var mydata map
mydata = JSONDecode(`{"name": "John Smith", "company": "Smith's company"}`)
```

### HasPrefix {#hasprefix}

Comprueba si una cadena comienza con una cadena especificada.

**Gramática**

``` text
HasPrefix(s string, prefix string) bool
```

* s

  Cadena de caracteres.

* prefix

  Prefijo a verificar.

**Valor de retorno**

Si una cadena comienza con una cadena especificada, devuelve `true`.

**Ejemplo**

``` js
if HasPrefix($Name, `my`) {
...
}
```

### Contains {#contains}

Comprueba si una cadena contiene una subcadena especificada.

**Gramática**

``` text
Contains(s string, substr string) bool
```

* s

  Cadena de caracteres.

* substr

  Subcadena.

**Valor de retorno**

Si una cadena contiene una subcadena, devuelve `true`.

**Ejemplo**

``` js
if Contains($Name, `my`) {
...
}
```

### Replace {#replace}

Reemplaza la cadena "old" (cadena antigua) por "new" (cadena nueva).

**Gramática**

``` text
Replace(s string, old string, new string) string
```

* s

  La cadena original.

* old

  La subcadena que se va a reemplazar.

* new

  Nueva cadena.

**Ejemplo**

``` js
s = Replace($Name, `me`, `you`)
```

### Size {#size}

Devuelve el número de bytes en la cadena especificada.

**Gramática**

``` text
Size(val string) int
```

* val

  Cadena de caracteres.

**Ejemplo**

``` js
var len int
len = Size($Name)
```

### Sprintf {#sprintf}

Esta función crea una cadena de acuerdo con una plantilla y parámetros especificados.

Los comodines disponibles son:

> -   `%d` (entero)
> -   `%s` (cadena de caracteres)
> -   `%f` (número de punto flotante)
> -   `%v` (cualquier tipo)

**Gramática**

``` text
Sprintf(pattern string, val ...) string
```

* pattern

  Plantilla de cadena.

**Ejemplo**

``` js
out = Sprintf("%s=%d", mypar, 6448)
```

### Substr {#substr}

Devuelve una subcadena obtenida de la cadena especificada, comenzando desde el desplazamiento *offset* (que por defecto comienza en 0) y con una longitud máxima limitada por *length*.

Si el desplazamiento o la longitud son menores que cero, o si el desplazamiento es mayor que el valor de la longitud limitada, se devuelve una cadena vacía.

Si la suma del desplazamiento y la longitud limitada es mayor que el número de bytes de la cadena, la subcadena se devolverá desde el desplazamiento hasta el final de la cadena especificada.

**Gramática**

``` text
Substr(s string, offset int, length int) string
```

* val

  Cadena de caracteres.

* offset

  Desplazamiento.

* length

  Longitud límite de subcadenas.

**Ejemplo**

``` js
var s string
s = Substr($Name, 1, 10)
```

### ToLower {#tolower}

Devuelve la cadena especificada en minúsculas.

**Gramática**

``` text
ToLower(val string) string
```

* val

  Cadena de caracteres.

**Ejemplo**

``` js
val = ToLower(val)
```

### ToUpper {#toupper}

Devuelve la cadena especificada en mayúsculas.

**Gramática**

``` text
ToUpper(val string) string
```

* val

  Cadena de caracteres.

**Ejemplo**

``` js
val = ToUpper(val)
```

### TrimSpace {#trimspace}

Elimina espacios, tabulaciones y saltos de línea iniciales y finales de la cadena especificada.

**Gramática**

``` text
TrimSpace(val string) string
```

* val

  Cadena de caracteres.

**Ejemplo**

``` js
var val string
val = TrimSpace("  mystr  ")
```

### Floor {#floor}

Devuelve el valor entero más grande menor o igual que el número, el flotante y la cadena especificados.

**Gramática**

``` text
Floor(x float|int|string) int
```

* x

  Números, flotadores y cadenas.

**Ejemplo**

``` js
val = Floor(5.6) // returns 5
```

### Log {#log}

Devuelve el logaritmo natural del número, float y cadena especificados.

**Gramática**

``` text
Log(x float|int|string) float
```

* x

  Números, flotadores y cadenas.

**Ejemplo**

``` js
val = Log(10)
```

### Log10 {#log10}

Devuelve el logaritmo en base 10 del número, float y cadena especificados.

**Gramática**

``` text
Log10(x float|int|string) float
```

* x

  Números, flotadores y cadenas.

**Ejemplo**

``` js
val = Log10(100)
```

### Pow {#pow}

Devuelve (x^y^), donde y es el exponente en base x.

**Gramática**

``` text
Pow(x float|int|string, y float|int|string) float
```

* x

  base.

* y

  índice.

**Ejemplo**

``` js
val = Pow(2, 3)
```

### Round {#round}

Devuelve el valor del número especificado redondeado al entero más cercano.

**Gramática**

``` text
Round(x float|int|string) int
```

* x

  Número.

**Ejemplo**

``` js
val = Round(5.6)
```

### Sqrt {#sqrt}

Devuelve la raíz cuadrada del número especificado.

``` text
Sqrt(x float|int|string) float
```

* x

  Número.

**Ejemplo**

``` js
val = Sqrt(225)
```

### StringToBytes {#stringtobytes}

Convierte una cadena en bytes.

**Gramática**

``` text
StringToBytes(src string) bytes
```

* src

  Cadena de caracteres.

**Ejemplo**

``` js
var b bytes
b = StringToBytes("my string")
```

### BytesToString {#bytestostring}

Convierte bytes a cadena.

**Gramática**

``` text
BytesToString(src bytes) string
```

* src

  Byte.

**Ejemplo**

``` js
var s string
s = BytesToString($Bytes)
```

### SysParamString {#sysparamstring}

Devuelve el valor del parámetro de plataforma especificado.

**Gramática**

``` text
SysParamString(name string) string
```

* name

  Nombre del parámetro.

**Ejemplo**

``` js
url = SysParamString(`blockchain_url`)
```

### SysParamInt {#sysparamint}

Devuelve el valor del parámetro de plataforma especificado como un número.

**Gramática**

``` text
SysParamInt(name string) int
```

* name

  Nombre del parámetro.

**Ejemplo**

``` js
maxcol = SysParam(`max_columns`)
```

### DBUpdateSysParam {#dbupdatesysparam}

Actualizar valores y condiciones para los parámetros de la plataforma. Si no desea cambiar el valor o la condición, especifique una cadena vacía en el parámetro correspondiente.

**Gramática**

``` text
DBUpdateSysParam(name, value, conditions string)
```

* name

  Nombre del parámetro de la plataforma.

* value

  Nuevo valor de los parámetros.

* conditions

  Nuevas condiciones para cambiar los parámetros.

**Ejemplo**

``` js
DBUpdateSysParam(`fuel_rate`, `400000000000`, ``)
```

### UpdateNotifications {#updatenotifications}

Obtener la lista de notificaciones de una clave específica de la base de datos y enviar las notificaciones obtenidas a Centrifugo.

**Gramática**

``` text
UpdateNotifications(ecosystemID int, keys int ...)
```

* ecosystemID

  ID del ecosistema.

* key

  Lista de direcciones de cuenta, separadas por comas. O puedes usar una matriz para especificar la lista de direcciones de cuenta.

**Ejemplo**

``` js
UpdateNotifications($ecosystem_id, $key_id, 23345355454, 35545454554)
UpdateNotifications(1, [$key_id, 23345355454, 35545454554] )
```

### UpdateRolesNotifications {#updaterolesnotifications}

Obtener la lista de notificaciones de todas las direcciones de cuenta para el ID de rol especificado en la base de datos y enviar las notificaciones obtenidas a Centrifugo.

**Gramática**

``` text
UpdateRolesNotifications(ecosystemID int, roles int ...)
```

* ecosystemID

  ID del ecosistema.

* roles

  Lista de ID de personajes, separados por comas. O puedes usar un array para especificar la lista de ID de personajes.

**Ejemplo**

``` js
UpdateRolesNotifications(1, 1, 2)
```

### HTTPRequest {#httprequest}

Envía una solicitud HTTP a la dirección especificada.

``` text

Esta función solo está disponible para contratos inteligentes CLB.

````

**Gramática**

``` text
HTTPRequest(url string, method string, heads map, pars map) string
```

* url

  Dirección de solicitud enviada.

* method

  Tipo de solicitud (GET o POST).

* heads

  Solicitud de encabezado, Objeto de matriz.

* pars

  Parámetros de solicitud.

**Ejemplo**

``` js
var ret string
var ret string 
var ret string
var pars, heads, json map
heads["Authorization"] = "Bearer " + $auth_token
pars["obs"] = "true"
ret = HTTPRequest("http://localhost:7079/api/v2/content/page/default_page", "POST", heads, pars)
json = JSONToMap(ret)
```

### HTTPPostJSON {#httppostjson}

La función es similar a la función *HTTPRequest*, pero envía una solicitud POST con una cadena como parámetro de solicitud.

``` text

La función solo se puede utilizar para contratos inteligentes CLB.

```

**Gramática**

``` text
HTTPPostJSON(url string, heads map, pars string) string
```

* url

  Dirección de solicitud enviada.

* heads

  Encabezado, matriz de objetos.

* pars

  Parámetro de solicitud, JSON string.

**Ejemplo**

``` js
var ret string
var ret string 
var ret string
var heads, json map
heads["Authorization"] = "Bearer " + $auth_token
ret = HTTPPostJSON("http://localhost:7079/api/v2/content/page/default_page", heads, `{"obs":"true"}`)
json = JSONToMap(ret)
```

### BlockTime {#blocktime}

Devuelve el tiempo de generación del bloque en formato SQL.

**Gramática**

``` text
BlockTime()
```

**Ejemplo**

``` js
var mytime string
mytime = BlockTime()
DBInsert("mytable", myid, {time: mytime})
```

### DateTime {#datetime}

Convertir el timestamp unixtime a una cadena con formato [YYYY-MM-DD HH:MI:SS].

**Gramática**

``` text
DateTime(unixtime int) string
```

**Ejemplo**

``` js
DateTime(1532325250)
```

### UnixDateTime {#unixdatetime}

Convertir una cadena en formato [YYYY-MM-DD HH:MI:SS] a una marca de tiempo Unix.

**Gramática**

``` text
UnixDateTime(datetime string) int
```

**Ejemplo**

``` js
UnixDateTime("2018-07-20 14:23:10")
```

### CreateOBS {#createobs}

Create a sub-CLB.

Esta función solo puede ser utilizada en el modo CLB principal.

**Gramática**

``` text
CreateOBS(OBSName string, DBUser string, DBPassword string, OBSAPIPort int)
```

* OBSName

   El nombre de CLB.

* DBUser

    El nombre del rol de la base de datos.

* DBPassword

    La contraseña de ese rol.

* OBSAPIPort

    El puerto de solicitud de API.

**Ejemplo**

``` js
CreateOBS("obsname", "obsuser", "obspwd", 8095)
```

### GetOBSList {#getobslist}

Devolver una lista de sub-CLBs.

Esta función solo se puede utilizar en modo CLB maestro.

**Gramática**

``` text
GetOBSList()
```

**Valor de retorno**

Una matriz de objetos donde la clave es el nombre CLB y el valor es el estado del proceso.

### RunOBS {#runobs}

Ejecutar el proceso de CLB.

Esta función solo se puede utilizar en modo CLB maestro.

**Gramática**

``` text
RunOBS(OBSName string)
```

* OBSName

  Nombre de CLB.

  Solo puede contener letras y números, no se pueden usar espacios.

### StopOBS {#stopobs}

Detenga el proceso del CLB especificado.

Esta función solo se puede utilizar en modo CLB maestro.

**Gramática**

``` text
StopOBS(OBSName string)
```

* OBSName

  Nombre de CLB.

  Solo puede contener letras y números, no se pueden usar espacios.

### RemoveOBS {#removeobs}

Eliminar el proceso de un CLB específico.

Esta función solo se puede utilizar en modo CLB maestro.

**Gramática**

``` text
RemoveOBS(OBSName string)
```

* OBSName

  Nombre de CLB.

  Solo puede contener letras y números, no se pueden usar espacios ni símbolos.

## System Contracts {#system-contracts}

El contrato inteligente del sistema se crea automáticamente al iniciar la plataforma de blockchain IBAX. Todos estos contratos inteligentes se crean en el primer ecosistema, por lo que es necesario especificar su nombre completo para llamarlos desde otros ecosistemas, por ejemplo, `@1NewContract`.

### NewEcosystem {#newecosystem}

Para crear un nuevo ecosistema, debes hacer referencia al campo *result* devuelto en [txstatus](../reference/api2.md#txstatus) para obtener el ID del ecosistema creado.

Parámetros:

> - *Name string* - El nombre del ecosistema, que puede ser cambiado.

### EditEcosystemName {#editecosystemname}

Cambiar el nombre del ecosistema en la tabla *1_ecosystems*, que solo existe en el primer ecosistema.

Parámetros:

> - *EcosystemID int* - ID del ecosistema al que se le cambiará el nombre;
> - *NewName string* - Nuevo nombre del ecosistema.

### NewContract {#newcontract}

Crear un nuevo contrato inteligente en el sistema ecológico actual.

Parámetros:

- *ApplicationId int* - La aplicación a la que pertenece el nuevo contrato inteligente;
- *Value string* - El código fuente del contrato inteligente, debe haber solo un contrato inteligente en la capa superior;
- *Conditions string* - Las condiciones para cambiar este contrato inteligente;
- *TokenEcosystem int \"opcional\"* - El ID del ecosistema, qué token se utilizará para las transacciones cuando se active el contrato inteligente.

### EditContract {#editcontract}

Editar el contrato inteligente en el ecosistema actual.

Parámetros:

> -   *Id int* - ID del contrato inteligente a cambiar;
> -   *Value string \"optional\"* - Código fuente del contrato inteligente;
> -   *Conditions string \"optional\"* - Condiciones para cambiar este contrato inteligente.

### BindWallet {#bindwallet}

Vincular el contrato inteligente a la dirección de la billetera actual en el ecosistema. Después de vincular el contrato, esta dirección pagará los costos de ejecución del contrato inteligente.
Parámetros:

> -   *Id int* - ID del contrato inteligente que se va a vincular.
> -   *WalletId string \"optional\"* - Dirección de la billetera a la que se vinculará el contrato inteligente.

### UnbindWallet {#unbindwallet}

Desvincular la dirección de la billetera del contrato inteligente del sistema actual, solo las direcciones que hayan vinculado ese contrato inteligente podrán desvincularlo. Después de que el contrato inteligente se desvincule, el usuario que lo ejecute pagará la tarifa de ejecución.

Parámetros:

> -   *Id int* - ID del contrato inteligente vinculado.

### Nuevo parámetro {#newparameter}

Se agregó un nuevo parámetro del sistema al sistema actual.

Parámetros:

> -   *Name string* - Nombre del parámetro;
> -   *Value string* - Valor del parámetro;
> -   *Conditions string* - Condiciones para cambiar el parámetro.

### EditParameter {#editparameter}

Modificar los parámetros del sistema ecológico existente en el sistema actual.

Parámetros:

> -   *Name string* - Nombre del parámetro a cambiar;
> -   *Value string* - Nuevo valor del parámetro;
> -   *Conditions string* - Nuevas condiciones para cambiar el parámetro.

### NewMenu {#newmenu}

Agregar un nuevo menú al sistema ecológico actual.

Parámetros:

> -   *Name string* - Nombre del menú;
> -   *Value string* - Código fuente del menú;
> -   *Title string \"optional\"* - Título del menú;
> -   *Conditions string* - Condiciones para cambiar el menú.

### EditMenu {#editmenu}

Cambiar el menú existente en el sistema ecológico actual.

Parámetros:

> -   *Id int* - ID del menú que se desea cambiar;
> -   *Value string \"optional\"* - Nuevo código fuente del menú;
> -   *Title string \"optional\"* - Nuevo título del menú;
> -   *Conditions string \"optional\"* - Nuevas condiciones para cambiar el menú.

### AppendMenu {#appendmenu}

Agregar el contenido del código fuente al menú existente en el sistema ecológico actual.

Parámetros:

> -   *Id int* - ID del menú;
> -   *Value string* - Código fuente a agregar.

### NewPage {#newpage}

Agregar una nueva página al ecosistema actual.

Parámetros:

> -   *Name string* - Nombre de la página;
> -   *Value string* - Código fuente de la página;
> -   *Menu string* - Nombre del menú asociado con la página;
> -   *Conditions string* - Condiciones para cambiar la página;
> -   *ValidateCount int \"optional\"* - Número de nodos requeridos para la validación de la página. Si este parámetro no se especifica, se utiliza el valor del parámetro de ecosistema *min_page_validate_count*. Este valor no puede ser menor que *min_page_validate_count* y mayor que *max_page_validate_count*;
> -   *ValidateMode int \"optional\"* - Modo de verificación de validez de la página. Un valor de 0 significa verificar la página cuando se carga. Un valor de 1 significa verificar la página cuando se carga y cuando se sale.

### EditPage {#editpage}

Modificar la página existente en el sistema actual.

Parámetros:

> -   *Id int* - ID de la página que se desea modificar;
> -   *Value string \"optional\"* - Nuevo código fuente de la página;
> -   *Menu string \"optional\"* - Nuevo nombre del menú asociado a la página;
> -   *Conditions string \"optional\"* - Nuevas condiciones para modificar la página;
> -   *ValidateCount int \"optional\"* - Número de nodos necesarios para validar la página. Si este parámetro no se especifica, se utiliza el valor del parámetro del sistema *min_page_validate_count*. Este valor no puede ser menor que *min_page_validate_count* y mayor que *max_page_validate_count*;
> -   *ValidateMode int \"optional\"* - Modo de validación de la página. El valor 0 indica que se debe validar la página al cargarla. El valor 1 indica que se debe validar la página al cargarla y al salir de ella.

### AppendPage {#appendpage}

Agregar el contenido del código fuente a la página existente en el sistema ecológico actual.

Parámetros:

> -   *Id int* - ID de la página que se desea modificar;
> -   *Value string* - Código fuente que se desea agregar.

### NewBlock {#newblock}

Agregar un módulo de página al sistema ecológico actual.

Parámetros:

> -   *Name string* - Nombre del módulo;
> -   *Value string* - Código fuente del módulo;
> -   *Conditions string* - Condiciones para cambiar el módulo.

### EditBlock {#editblock}

Cambiar el módulo de página existente en el ecosistema actual.

Parámetros

> -   *Id int* - ID del módulo que se desea cambiar;
> -   *Value string* - Nuevo código fuente del módulo;
> -   *Conditions string* - Nuevas condiciones para cambiar el módulo.

### NewTable {#newtable}

Agregar una nueva tabla de datos al ecosistema actual.

Parámetros:

- *ApplicationId int* - ID de la aplicación asociada a la tabla de datos;
- *Name string* - Nombre de la nueva tabla de datos;
- *Columns string* - Matriz de campos en formato JSON `[{"name":"...", "type":"...","index": "0", "conditions":"..."},...]`, donde:

    > -   *name* - Nombre del campo, solo caracteres latinos;
    > -   *type* - Tipo de datos `varchar,bytea,number,datetime,money,text,double,character`;
    > -   *index* - Campo no clave `0`, clave principal `1`;
    > -   *conditions* - Condiciones para cambiar los datos del campo, deben especificarse los permisos de acceso en formato JSON ```{"update":"ContractConditions(`MainCondition`)", "read":"ContractConditions(`MainCondition`)"} ```;

- *Permissions string* - Permisos de acceso en formato JSON `{"insert": "...", "new_column": "...", "update": "...", "read": "..."}`.

    > -   *insert* - Permiso para insertar entradas;
    > -   *new_column* - Permiso para agregar nuevas columnas;
    > -   *update* - Permiso para cambiar los datos de las entradas;
    > -   *read* - Permiso para leer los datos de las entradas.

### EditTable {#edittable}

Cambiar los permisos de acceso a la tabla de datos en el ecosistema actual.

Parámetros:

> -   *Name string* - Nombre de la tabla de datos.
> -   *InsertPerm string* - Permiso para insertar entradas en la tabla de datos;
> -   *UpdatePerm string* - Permiso para actualizar entradas en la tabla;
> -   *ReadPerm string* - Permiso para leer entradas en la tabla;
> -   *NewColumnPerm string* - Permiso para crear nuevas columnas en la tabla;

### NewColumn {#newcolumn}

Agregar un nuevo campo a la tabla de datos del ecosistema actual.

Parámetros:

> -   *TableName string* - Nombre de la tabla de datos;
> -   *Name string* - Nombre del campo de caracteres latinos;
> -   *Type string* - Tipo de datos;
>     `varchar,bytea,number,money,datetime,text,double,character`;
> -   *UpdatePerm string* - Permiso para cambiar el valor en la columna;
> -   *ReadPerm string* - Permiso para leer el valor en la columna.

### EditColumn {#editcolumn}

Cambiar los permisos de campo especificados en una tabla de datos en el ecosistema actual.

Parámetros:

> -   *TableName string* - Nombre de la tabla de datos;
> -   *Name string* - Nombre del campo de caracteres latinos que se desea cambiar;
> -   *UpdatePerm string* - Nuevo permiso para cambiar los valores en la columna;
> -   *ReadPerm string* - Nuevo permiso para leer los valores en la columna.

### NewLang {#newlang}

Agregar recursos multilingües al ecosistema actual, agregando permisos en el parámetro *changing_language* de los parámetros del sistema.

Parámetros:

> -   *Name string* - El nombre de los recursos multilingües en caracteres latinos;
> -   *Trans string* - Una cadena en formato JSON, donde el código de idioma de dos caracteres se utiliza como clave y la cadena de traducción se utiliza como valor. Por ejemplo: `{"en": "English text", "es": "texto en español"}`.

### EditLang {#editlang}

Cambiar los recursos de idioma en el sistema ecológico actual. Los permisos de cambio se establecen en el parámetro *changing_language* de los parámetros del sistema ecológico.

Parámetros:

> -   *Id int* - ID de recursos de idioma múltiple.
> -   *Trans* - Cadena de formato JSON, con códigos de idioma de dos caracteres como clave y cadenas de traducción como valor. Por ejemplo, `{"en": "English text", "es": "texto en español"`。

### Import {#import}

Importe la aplicación al ecosistema actual. Importe los datos cargados desde el contrato inteligente [ImportUpload](#importupload).

Parámetros:

> -   *Data string* - Los datos importados en formato de contenido de texto, que provienen de un archivo exportado del ecosistema.

### ImportUpload {#importupload}

Cargar el archivo de la aplicación externa en la tabla *buffer_data* del sistema ecológico actual para su posterior importación.

Parámetros:

> - *InputFile file* - Archivo que se escribirá en la tabla *buffer_data* del sistema ecológico actual.

### NewAppParam {#newappparam}

El ecosistema actual del sistema ha añadido nuevos parámetros de aplicación.

Parámetros:

> -   *ApplicationId int* - ID de la aplicación;
> -   *Name string* - Nombre del parámetro;
> -   *Value string* - Valor del parámetro;
> -   *Conditions string* - Permiso para cambiar el parámetro.

### EditAppParam {#editappparam}

Cambiar los parámetros de la aplicación existente en el ecosistema actual.

Parámetros:

> -   *Id int* - ID de parámetro de la aplicación;
> -   *Value string \"optional\"* - Nuevo valor del parámetro;
> -   *Conditions string \"optional\"* - Nuevos permisos para cambiar el parámetro.

### NewDelayedContract {#newdelayedcontract}

Agregar una nueva tarea al proceso de vigilancia del contrato inteligente de programación diferida.

El proceso de vigilancia del contrato inteligente de programación diferida ejecuta el contrato inteligente necesario para generar el bloque actual.

Parámetros:

> -   *Contract string* - Nombre del contrato inteligente;
> -   *EveryBlock int* - El contrato inteligente se ejecutará después de un número especificado de bloques;
> -   *Conditions string* - Permiso para cambiar la tarea;
> -   *BlockID int \"optional\"* - El ID del bloque en el que se iniciará el contrato inteligente. Si no se especifica, se calculará automáticamente como "ID del bloque actual" + *EveryBlock*;
> -   *Limit int \"optional\"* - El número de veces que se iniciará la tarea. Si no se especifica, la tarea de inicio del contrato inteligente se ejecutará infinitamente.

### EditDelayedContract {#editdelayedcontract}

Modificar la tarea en el proceso de vigilancia del contrato inteligente de programación de retraso.

Parámetros:

> -   *Id int* - ID de la tarea.
> -   *Contract string* - Nombre del contrato inteligente.
> -   *EveryBlock int* - El contrato inteligente se ejecutará después de un número de bloques especificado;
> -   *Conditions string* - Permiso para cambiar la tarea;
> -   *BlockID int \"optional\"* - El ID del bloque en el que se iniciará el contrato inteligente. Si no se especifica, se calculará automáticamente "ID del bloque actual" + *EveryBlock*;
> -   *Limit int \"optional\"* - El número de veces que se iniciará la tarea. Si no se especifica, la tarea de inicio del contrato inteligente se ejecutará un número ilimitado de veces.
> -   *Deleted int \"optional\"* - Cambio de tarea. El valor de `1` desactivará la tarea. El valor de `0` habilitará la tarea.

### UploadBinary {#uploadbinary}

En la tabla *X_binaries*, se agrega o sobrescribe un archivo estático. Al llamar al contrato inteligente a través de la API HTTP, el formato de solicitud debe usar `multipart/form-data`; el parámetro DataMimeType se utilizará junto con los datos del formulario.

Parámetros:

> -   *Name string* - Nombre del archivo estático;
> -   *Data bytes* - Contenido del archivo estático;
> -   *DataMimeType string \"optional\"* - *mime-type* del formato del archivo estático;
> -   *ApplicationId int* - Identificación de la aplicación asociada a la tabla *X_binaries*.

Si no se pasa el parámetro *DataMimeType*, se utilizará el formato `application/octet-stream` por defecto.
