# Lenguaje de plantillas {#template-language}

<!-- TOC -->

- [Construcción de páginas](#page-construction)
    - [Motor de plantillas](#template-engine)
    - [Creación de páginas](#create-pages)
        - [Diseñador de páginas visual](#visual-page-designer)
        - [Uso de estilos](#applicable-styles)
        - [Módulos de página](#page-module)
        - [Editor de recursos multilingües](#language-resource-editor)
- [Lenguaje de plantillas Logicor](#logicor-template-language)
    - [Visión general de Logicor](#logicor-overview)
      - [Use PageParams to pass parameters to pages](#use-pageparams-to-pass-parameters-to-pages)
      - [Calling contracts](#calling-contracts)
- [Clasificación de funciones de Logicor](#logicor-function-classification)
    - [Operaciones en variables](#operations-on-variables)
    - [Operaciones de navegación](#navigational-operations)
    - [Operaciones de datos](#data-manipulation)
    - [Presentación de datos](#data-presentation)
    - [Aceptación de datos](#accepting-of-data)
    - [Elementos de formato de datos](#data-formatting-elements)
    - [Elementos de formulario](#form-elements)
    - [Operaciones en bloques de código](#operations-on-code-blocks)
- [Referencias de funciones de Logicor](#logicor-function-references)
    - [Address](#address)
    - [AddressToId](#addresstoid)
    - [AddToolButton](#addtoolbutton)
    - [And](#and)
    - [AppParam](#appparam)
    - [ArrayToSource](#arraytosource)
    - [Binary](#binary)
    - [Button](#button)
    - [Calculate](#calculate)
    - [Chart](#chart)
    - [CmpTime](#cmptime)
    - [Code](#code)
    - [CodeAsIs](#codeasis)
    - [Data](#data)
    - [Custom](#custom)
    - [DateTime](#datetime)
    - [DBFind](#dbfind)
    - [Div](#div)
    - [EcosysParam](#ecosysparam)
    - [Em](#em)
    - [ForList](#forlist)
    - [Form](#form)
    - [GetColumnType](#getcolumntype)
    - [GetHistory](#gethistory)
    - [GetVar](#getvar)
    - [Hint](#hint)
    - [If](#if)
    - [Image](#image)
    - [ImageInput](#imageinput)
    - [Include](#include)
    - [Input](#input)
    - [InputErr](#inputerr)
    - [InputMap](#inputmap)
    - [JsonToSource](#jsontosource)
    - [Label](#label)
    - [LangRes](#langres)
    - [LinkPage](#linkpage)
    - [Map](#map)
    - [MenuGroup](#menugroup)
    - [MenuItem](#menuitem)
    - [Money](#money)
    - [Or](#or)
    - [P](#p)
    - [QRcode](#qrcode)
    - [RadioGroup](#radiogroup)
    - [Range](#range)
    - [Select](#select)
    - [SetTitle](#settitle)
    - [SetVar](#setvar)
    - [Span](#span)
    - [Strong](#strong)
    - [SysParam](#sysparam)
    - [Table](#table)
    - [TransactionInfo](#transactioninfo)
    - [VarAsIs](#varasis)
- [Estilo de aplicación adaptado para dispositivos móviles.](#app-styles-for-mobile-devices)
    - [Layout](#layout)
        - [Título](#title)
        - [Nombres de clase de énfasis](#strong-class-names)
        - [Color](#color)
    - [Cuadrícula](#grid)
    - [Panel](#panel)
    - [Formulario](#form-app)
    - [Botón](#button-app)
    - [Icono](#icon)

<!-- /TOC -->

## Construcción de páginas {#page-construction}

El entorno de desarrollo integrado de Weaver se crea utilizando la biblioteca *JavaScript React*, que incluye un editor de páginas y un diseñador de páginas visual. Las páginas son la parte fundamental de la aplicación, que proporcionan la recuperación y visualización de datos de tablas de bases de datos, la creación de formularios para recibir datos de entrada de los usuarios, la transmisión de datos a contratos y la navegación entre páginas de la aplicación.

Las páginas, al igual que los contratos, se almacenan en la cadena de bloques, lo que garantiza que no se puedan manipular cuando se cargan en el cliente de software.

### Motor de plantillas {#template-engine}

Los elementos de la página (página y menú) son creados por los desarrolladores en el editor de páginas de Weaver utilizando lenguaje de plantillas en el *motor de plantillas* de los nodos de validación.

Todas las páginas están construidas utilizando el lenguaje Logicor desarrollado por el equipo de desarrollo de la plataforma blockchain IBAX. Se utiliza el comando de API *content/\...* para solicitar páginas desde un nodo en la red.

El motor de plantillas envía como respuesta a este tipo de solicitudes no una página HTML, sino un código JSON compuesto por etiquetas HTML que forman un árbol según la estructura de la plantilla. Si desea probar el motor de plantillas, consulte la interfaz de API [content](../reference/api2.md#content).

### Creación de páginas {#create-pages}

Puede utilizar el editor de páginas para crear y editar páginas, que se puede encontrar en la sección **Páginas** de las herramientas de administración de Weaver. Este editor proporciona:

- Escribir código de página, resaltando las palabras clave del lenguaje de plantillas Logicor;
- Selección de menús que se mostrarán en la página;
- Edición de la página de menú;
- Configuración para cambiar los permisos de la página, especificando los nombres de contrato con permisos en la función *ContractConditions*, o especificando directamente los permisos de acceso en *Cambiar condiciones*;
- Iniciar el diseñador de páginas visual;
- Vista previa de la página.

#### Diseñador de páginas visual {#visual-page-designer}

El diseñador de páginas visual permite crear diseños de páginas sin necesidad de utilizar código de interfaz de usuario en Logicor.

El diseñador visual utiliza la función de arrastrar y soltar para establecer la posición de los elementos del formulario y el texto en la página, así como para configurar el tamaño de los bloques de la página.

El diseñador visual proporciona un conjunto de bloques listos para usar para mostrar modelos de datos estándar: con títulos, formularios y paneles de información. Después de crear una página en el diseñador visual, se puede escribir la lógica del programa que recibe los datos y las estructuras condicionales en el editor de la página.

En el futuro, planeamos crear un diseñador de páginas visual más completo.

#### Uso de estilos {#applicable-styles}

El estilo predeterminado para mostrar la página es el estilo de Bootstrap Angle de Angular. Si es necesario, el usuario puede crear su propio estilo. El estilo se almacena en el parámetro de estilo *stylesheet* de la tabla de parámetros del ecosistema.

#### Módulos de página {#page-module}

Para utilizar fragmentos de código en varias páginas, puedes crear módulos de página e incrustarlos en el código de la página. En los **Bloques de módulos** de Weaver puedes crear y editar estos módulos de página. Al igual que con las páginas, puedes definir permisos de edición.

#### Editor de recursos multilingües {#language-resource-editor}

Weaver incluye un mecanismo para localizar páginas utilizando la función de lenguaje de plantilla Logicor **LangRes**. Reemplaza las etiquetas de recursos de idioma en la página con las líneas de texto correspondientes para el idioma seleccionado por el usuario en el cliente de software o navegador. La sintaxis **\$label\$** se puede usar en lugar de la función **LangRes**. La traducción de mensajes en ventanas emergentes iniciadas por el contrato se realiza mediante la función **LangRes** del lenguaje Needle.

Los recursos de idioma se pueden crear y editar en la sección **Recursos de idioma** de Weaver. Un recurso de idioma consta de un nombre de etiqueta y su traducción en diferentes idiomas, marcados con el identificador de idioma de dos caracteres correspondiente (EN, ZH, JP, etc.).

Los permisos para agregar y modificar recursos de idioma se pueden definir y administrar de la misma manera que para otras tablas de datos.

## Lenguaje de plantillas Logicor {#logicor-template-language}

La función Logicor ofrece las siguientes operaciones:

- Recuperar valores de la base de datos: `DBFind`, que representa los datos recuperados de la base de datos como tablas y gráficos;
- Operaciones de asignación y visualización de valores de variables: `SetVar, GetVar, Data`;
- Visualización y comparación de valores de fecha/hora: `DateTime, Now, CmpTime`;
- Construir formularios con varios campos de entrada de datos de usuario: `Form, ImageInput, Input, RadioGroup, Select`;
- Validar los datos en los campos del formulario y mostrar mensajes de error: `Validate, InputErr`;
- Mostrar elementos de navegación: `AddToolButton, LinkPage, Button`;
- Llamar a contratos: `Button`;
- Crear elementos de diseño de página HTML, incluyendo varias etiquetas y clases CSS opcionales: `Div, P, Span, etc.`;
- Insertar imágenes en la página y cargar imágenes: `Image, ImageInput`;
- Mostrar fragmentos de diseño de página condicionalmente: `If, ElseIf, Else`;
- Crear menús de varios niveles;
- Localizar la página.

### Visión general de Logicor {#logicor-overview}

La página de plantilla de Logicor utiliza un lenguaje funcional que permite llamar funciones con la sintaxis `FuncName(parametros)` y anidar funciones dentro de otras. Los parámetros pueden ser especificados sin comillas y se pueden eliminar los que no sean necesarios.

```text
Text FuncName(parameter number 1, parameter number 2) another text.
FuncName(parameter 1,,,parameter 4)
```

Si un parámetro contiene una coma, debe estar entre comillas (backticks o comillas dobles). Si una función solo puede tener un parámetro, se puede usar una coma sin comillas. Además, si un parámetro tiene paréntesis derechos no emparejados, se deben usar comillas.

```text
FuncName("parameter number 1, the second part of first paremeter")
FuncName(`parameter number 1, the second part of first paremeter`)
```

Si se colocan los parámetros entre comillas, pero los parámetros en sí mismos contienen comillas, se pueden usar diferentes tipos de comillas o varias comillas en el texto.

```text
FuncName("parameter number 1, ""the second part of first"" paremeter")
FuncName(`parameter number 1, "the second part of first" paremeter`)
```

En la definición de una función, cada parámetro tiene un nombre específico. Puede llamar a la función en el orden en que se declararon los parámetros y especificar los argumentos, o especificar cualquier conjunto de argumentos en cualquier orden mediante `Parameter_name: Parameter_value`. Este método permite agregar nuevos parámetros de función de manera segura sin romper la compatibilidad con la plantilla actual.

```text
FuncName(myclass, This is value, Div(divclass, This is paragraph.))
FuncName(Body: Div(divclass, This is paragraph.))
FuncName(myclass, Body: Div(divclass, This is paragraph.))
FuncName(Value: This is value, Body: 
     Div(divclass, This is paragraph.)
)
FuncName(myclass, Value without Body)
```

La función puede devolver texto, generar elementos HTML (por ejemplo, `Input`), o crear elementos HTML con elementos HTML anidados (`Div, P, Span`). En este último caso, se utiliza un parámetro con el nombre predefinido **Body** para definir los elementos anidados. Por ejemplo, para anidar dos divs dentro de otro div, se puede hacer lo siguiente:

```text
Div(Body:
   Div(class1, This is the first div.)
   Div(class2, This is the second div.)
)
```

Para definir los elementos anidados descritos en el parámetro **Body**, puedes usar la siguiente notación: `FuncName(...){...}`. Los elementos anidados se especifican utilizando llaves:

```text
Div(){
   Div(class1){
      P(This is the first div.)
      Div(class2){
          Span(This is the second div.)
      }
   }
}
```

Si necesitas especificar repetidamente la misma función, puedes usar un punto `.` en lugar de escribir el nombre de la función cada vez. Por ejemplo, estos son equivalentes:

```text
Span(Item 1)Span(Item 2)Span(Item 3)
Span(Item 1).(Item 2).(Item 3)
```

El lenguaje permite el uso de la función **SetVar** para asignar variables, y el valor de la variable se puede referenciar usando `#name#`.

```text
SetVar(name, My Name)
Span(Your name: #name#)
```

Para hacer referencia a los recursos de lenguaje en el ecosistema, puedes usar `$langres$`, donde *langres* es el nombre de la fuente de lenguaje.

```text
Span($yourname$: #name#)
```

Se han predefinido las siguientes variables:

- `#key_id#` - Dirección de cuenta del usuario actual;
- `#ecosystem_id#` - ID del ecosistema actual;
- `#guest_key#` - Dirección de cuenta de invitado;
- `#isMobile#` - Si Weaver se está ejecutando en un dispositivo móvil, es 1.

#### PageParams {#use-pageparams-to-pass-parameters-to-pages}

Utiliza PageParams para pasar parámetros a la página.

Hay muchas funciones que admiten el parámetro **PageParams**, que se utiliza para pasar parámetros al redirigir a una nueva página. Por ejemplo: `PageParams: "param1=value1,param2=value2"`.

Los valores de los parámetros pueden ser simples cadenas o variables con valores de referencia. Al pasar los parámetros a la página, se crean variables con los nombres de los parámetros. Por ejemplo, `#param1#` y `#param2#`.

-   `PageParams: "hello=world"` - la nueva página recibe el parámetro hello con el valor world;
-   `PageParams: "hello=#world#"` - la nueva página recibe el parámetro hello con el valor de la variable world.

#### Val (#val)

Además, la función **Val** permite obtener datos del formulario que se especifican en la redirección.

- `PageParams: "hello=Val(world)"` - La nueva página recibe el parámetro hello con el valor del elemento del formulario world.

#### Llamar a un contrato inteligente. {#calling-contracts}

Logicor utiliza la función **Button** para realizar llamadas de contrato haciendo clic en un botón en el formulario. Una vez que se inicia este evento, los datos ingresados por el usuario en los campos del formulario de la página se pasarán al contrato.

Si el nombre del campo del formulario coincide con el nombre de la variable en la sección de datos del contrato que se llama, los datos se transferirán automáticamente.

La función **Button** permite abrir una ventana modal para que el usuario verifique la ejecución del contrato y, después de una ejecución exitosa del contrato, inicie una redirección a una página específica y pase algunos parámetros a esa página.

## Clasificación de funciones de Logicor {#logicor-function-classification}

### Operaciones en variables {#operations-on-variables}

|        |        |         |
| ------ | ------ | ------- |
| [GetVar](#getvar) | [SetVar](#setvar) | [VarAsIs](#varasis) |


### Operaciones de navegación. {#navigational-operations} 

|               |        |          |
| ------------- | ------ | -------- |
| [AddToolButton](#addtoolbutton) | [Button](#button) | [LinkPage](#linkpage) |


### Operaciones de datos {#data-manipulation}

|           |          |       |
| --------- | -------- | ----- |
| [Calculate](#calculate) | [DateTime](#datetime) | [Money](#money) |
| [CmpTime](#cmptime)   |          |       |

### Presentación de datos {#data-presentation}

|          |           |          |
| -------- | --------- | -------- |
| [Code](#code)     | [Hint](#hint)      | [MenuItem](#menuitem) |
| [CodeAsIs](#codeasis) | [Image](#image)     | [QRcode](#qrcode)   |
| [Chart](#chart)    | [MenuGroup](#menugroup) | [Table](#table)    |
| [ForList](#forlist)  |           |          |


### Aceptación de datos {#accepting-of-data}

|             |               |                 |
| ----------- | ------------- | --------------- |
| [Address](#address)     | [EcosysParam](#ecosysparam)   | [LangRes](#langres)         |
| [AddressToId](#addresstoid) | [GetHistory](#gethistory)    | [Range](#range)           |
| [AppParam](#appparam)    | [GetColumnType](#getcolumntype) | [SysParam](#sysparam)        |
| [Data](#data)        | [JsonToSource](#jsontosource)  | [Binary](#binary)          |
| [DBFind](#dbfind)      | [ArrayToSource](#arraytosource) | [TransactionInfo](#transactioninfo) |


### Elementos de formato de datos {#data-formatting-elements}

|      |          |        |
| ---- | -------- | ------ |
| [Div](#div)  | [SetTitle](#settitle) | [Span](#span)   |
| [Em](#em)   | [Label](#label)    | [Strong](#strong) |
| [P](#p)    |          |        |

### Elementos de formulario {#form-elements}

|            |            |          |
| ---------- | ---------- | -------- |
| [Form](#form)       | [InputErr](#inputerr)   | [InputMap](#inputmap) |
| [ImageInput](#imageinput) | [RadioGroup](#radiogroup) | [Map](#map)      |
| [Input](#input)      | [Select](#select)     |          |

### Operaciones en bloques de código {#operations-on-code-blocks}
|      |      |         |
| ---- | ---- | ------- |
| [If](#if)   | [Or](#or)   | [Include](#include) |
| [And](#and)  |      |         |

## Referencias de funciones de Logicor {#logicor-function-references}

### Address {#address}

La función devuelve la dirección de la billetera `xxxx-xxxx-...-xxxx` de la cuenta especificada; si no se especifica una dirección, se utiliza la dirección de la cuenta actual como parámetro.

**Gramática**

``` text
Address(account)
```

* Address

  * account

    账户地址。

**Ejemplo**

```text
Span(Your wallet: Address(#account#))
```

### AddressToId {#addresstoid}

Esta función devuelve la dirección de la cuenta para la dirección de la billetera especificada `xxxx-xxxx-...-xxxx`.

**Gramática**

``` text
AddressToId(Wallet)
```

* AddressToId

  * Wallet

    Dirección de billetera en formato `XXXX-...-XXXX`.

**Ejemplo**

```text
AddressToId(#wallet#)
```

### AddToolButton {#addtoolbutton}

Crear un panel de botones con el elemento **addtoolbutton**.

**Gramática**

``` text
AddToolButton(Title, Icon, Page, PageParams) 
    [.Popup(Width, Header)]
```

* AddToolButton

  * Title

    Título del botón.

  * Icon

    Estilo del icono del botón.

  * Page

    Nombre de la página a la que se redirige.

  * Pageparams

    Parámetros que se pasan a la página.

  * Popup

    Ventana emergente modal.

  * Header

    Título de la ventana.

  * Width

    Porcentaje de ancho de la ventana.

    El valor de este parámetro está en el rango de 1 a 100.

**Ejemplo**

```text
AddToolButton(Title: $@1broadcast$, Page: @1notifications_broadcast, Icon: icon-plus).Popup(Header: $@1notifications_broadcast$, Width: "50")
```

### And {#and}

La función devuelve el resultado de la operación lógica **and** de todos los argumentos listados entre paréntesis, separados por comas. Si uno de los argumentos es una cadena vacía, cero o `false`, su valor es `false`. En cualquier otro caso, su valor es `true`. Si el valor del argumento es `true`, la función devuelve `1`, en cualquier otro caso devuelve `0`.

**Gramática**

``` text
And(parameters)
```

**Ejemplo**

```text
If(And(#myval1#,#myval2#), Span(OK))
```

### AppParam {#appparam}

Muestra el valor del parámetro de la aplicación, tomado de la tabla *app_params* del ecosistema actual. Si existe un recurso de idioma con el nombre especificado, su valor se sustituirá automáticamente.

**Gramática**

``` text
AppParam(App, Name, Index, Source) 
```

* AppParam

  * App

    Identificación de la aplicación.

  * Name

    Nombre del parámetro.

  * Index

    Cuando el valor del parámetro es una lista separada por comas, se puede utilizar este parámetro.

    El índice del elemento del parámetro comienza en 1. Por ejemplo, si `type = full,light`, entonces `AppParam(1, type, 2)` devuelve `light`.

    Este parámetro no se puede utilizar junto con el parámetro *Source*.

  * Source

    Cuando el valor del parámetro es una lista separada por comas, se puede utilizar este parámetro.

    Crea un objeto *data* cuyos elementos son los valores especificados del parámetro. Este objeto se puede utilizar como fuente de datos para las funciones [Table](#table) y [Select](#select).

    Este parámetro no se puede utilizar junto con el parámetro *Index*.

**Ejemplo**

```text
AppParam(1, type, Source: mytype)
```

### ArrayToSource {#arraytosource}

Crear un elemento **arraytosource** y llenarlo con pares clave-valor de un arreglo JSON. Los datos resultantes se colocan en el elemento *Source*, que luego se puede utilizar en una función de entrada de origen (por ejemplo, [Table](#Table)).

**Gramática**

``` text
ArrayToSource(Source, Data)
```

* ArrayToSource

  * Source

    Nombre de la fuente de datos.

* Data

    Una matriz JSON o un nombre de variable (`#name#`) que contiene una matriz JSON.

**Ejemplo**

```text
ArrayToSource(src, #myjsonarr#)
ArrayToSource(dat, [1, 2, 3])
```

### Binary {#binary}

Devolver el enlace al archivo estático almacenado en la tabla binaria *binaries*.

**Gramática**

``` text
Binary(Name, AppID, MemberID)[.ById(ID)][.Ecosystem(ecosystem)]
```

* Binary

  * Name

    Nombre del archivo.

  * AppID

    Identificación de la aplicación.

  * MemberID

    Dirección de cuenta, por defecto 0.

  * ID

    ID de archivo estático.

  * ecosystem

    ID del ecosistema. Si no se especifica este parámetro, se solicita el archivo binario desde el ecosistema actual.

**Ejemplo**

```text
Image(Src: Binary("my_image", 1))
Image(Src: Binary().ById(2))
Image(Src: Binary().ById(#id#).Ecosystem(#eco#))
```

### Button {#button}

Crea un elemento HTML **button**. Este elemento crea un botón que se utiliza para llamar a un contrato o abrir una página.

**Gramática**

``` text
Button(Body, Page, Class, Contract, Params, PageParams)
    [.CompositeContract(Contract, Data)]
    [.Alert(Text, ConfirmButton, CancelButton, Icon)]
    [.Popup(Width, Header)]
    [.Style(Style)]
    [.ErrorRedirect((ErrorID,PageName,PageParams)]
```

* Button

  * Body

    Subtexto o elemento.

  * Page

    Nombre de la página redirigida.

  * Class

    Botón.

  * Contract

    Nombre del contrato inteligente invocado.

  * Params

    Lista de valores pasados al contrato. Por lo general, los valores de los parámetros del contrato (parte `data`) se obtienen de los elementos HTML con nombres similares al `id`. 

    Si el `id` del elemento es diferente al nombre del parámetro del contrato, se debe asignar en el formato `contractField1=idname1, contractField2=idname2`. 

    Este parámetro se devuelve como un objeto `{contractField1: idname1, contractField2: idname2}` en *attr*.

  * PageParams

    El formato de los parámetros pasados a la página de redirección es `pageField1=idname1, pageField2=idname2`.

    Las variables con los nombres de parámetros de destino `#pageField1` y `#pageField2` se crean en la página de destino y se les asignan los valores especificados. Para obtener más información sobre la especificación de pasos de parámetros, consulte [Cómo pasar parámetros a una página usando PageParams](#pageparams).

* CompositeContract

    "Se utiliza para agregar contratos adicionales a un botón. CompositeContract se puede utilizar varias veces."

  * Name

    Nombre del contrato.

  * Data

    The contract parameters are a JSON array.

* Alert

  Mostrar mensaje.

  * Text

    Mensaje de texto.

  * ConfirmButton

    El título del botón de confirmación.

  * CancelButton

    Título del botón Cancelar.

  * Icon

    Icono de botón.

* Popup

    Output ventana modal.

  * Header

    Título de la ventana.

  * Width

    Ancho de la ventana en porcentaje.

    El valor de este parámetro varía de 1 a 100.

* Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS.

* ErrorRedirect

    Especifique una página de redireccionamiento que se utilizará cuando la función `contractfundef-Throw`{.interpreted-text role="ref"} genere un error durante la ejecución del contrato.

    Puede haber varias llamadas a *ErrorRedirect*. Por lo tanto, al devolver el atributo *errredirect*, su clave es *ErrorID* y su valor es una lista de parámetros.

  * ErrorID

    ID de error.

  * PageName

    Nombre de la página de redireccionamiento.

  * PageParams

    Parámetros pasados a esta página.

**Ejemplo**

```text
Button(Submit, default_page, mybtn_class).Alert(Alert message)
Button(Contract: MyContract, Body:My Contract, Class: myclass, Params:"Name=myid,Id=i10,Value")
```

### Calculate {#calculate}

La función devuelve el resultado de la expresión aritmética pasada en el parámetro **Exp**. Se pueden utilizar las siguientes operaciones: `+, -, *, /` y paréntesis `()`.

**Gramática**

``` text
Calculate(Exp, Type, Prec)
```

* Calculate

  * Exp

    Arithmetic expression. Puede contener números y variables *nombre*.

  * Type

  Resultado del tipo de datos: int, float, dinero.

  Si no se especifica, si hay números con decimales, el tipo de resultado será float, en otros casos será int.

  * Prec

    El tipo de datos **float** y **money** especifican la cantidad de dígitos significativos después del punto decimal.

**Ejemplo**

```text
Calculate( Exp: (342278783438+5000)\*(#val#-932780000), Type: money, Prec:18 )
Calculate(10000-(34+5)\*#val#)
Calculate("((10+#val#-45)\*3.0-10)/4.5 + #val#", Prec: 4)      
```

### Chart {#chart}

Crear gráficos HTML.

**Gramática**

``` text
Chart(Type, Source, FieldLabel, FieldValue, Colors)
```

* Chart

  * Type

    Tipo de gráfico.

  * Source

    Nombre de la fuente de datos, por ejemplo, obtenido de la función [DBFind](#DBFind).

  * FieldLabel

    Nombre de los campos del encabezado.

  * FieldValue

    Nombre del campo de valor.

  * Colors

    Lista de colores.

**Ejemplo**

```text
Data(mysrc,"name,count"){
    John Silver,10
    "Mark, Smith",20
    "Unknown ""Person""",30
}
Chart(Type: "bar", Source: mysrc, FieldLabel: "name", FieldValue: "count", Colors: "red, green")
```

### CmpTime {#cmptime}

Esta función compara dos valores de tiempo en el mismo formato.

El formato admite unixtime, `YYYY-MM-DD HH:MM:SS`, y cualquier formato de tiempo, como desde el año hasta el segundo `YYYYMMDD`.

**Gramática**

``` text
CmpTime(Time1, Time2)
```

**Valor de retorno**

-   `-1` - Time1 \< Time2；
-   `0` - Time1 = Time2；
-   `1` - Time1 \> Time2。

**Ejemplo**

```text
If(CmpTime(#time1#, #time2#)<0){...}
```

### Code {#code}

Crear un elemento **code** para mostrar el código especificado.

La función reemplaza el valor de la variable con el valor de la variable (por ejemplo, `#name#`).

**Gramática**

``` text
Code(Text)
```

* Code

  * Text

    Código fuente.

**Ejemplo**

```text
Code( P(This is the first line.
    Span(This is the second line.))
)  
```

### CodeAsIs {#codeasis}

Crear un elemento **code** para mostrar el código especificado.

Esta función no reemplazará las variables por sus valores. Por ejemplo, `#name#` se mostrará tal cual.

**Gramática**

``` text
CodeAsIs(Text)
```

* CodeAsIs

  * Text

    Código fuente.

**Ejemplo**

```text
CodeAsIs( P(This is the #test1#.
    Span(This is the #test2#.))
)
```

### Data {#data}

Crear un elemento **data** y llenarlo con los datos especificados y colocarlo en *Source*, luego se puede recibir *Source* como entrada de datos en [Table](#Table) y otras funciones. La secuencia de nombres de columna corresponde a la secuencia de valores de entrada de *data*.

**Gramática**

``` text
Data(Source,Columns,Data) 
    [.Custom(Column){Body}]
```

* Data

  * Source

    Nombre de la fuente de datos. Puede asignar cualquier nombre que desee y luego pasarlo como origen de datos a otras funciones más adelante.

  * Columns

    Lista de nombres de columna separados por comas.

  * Data

   conjunto de datos.

    Cada registro debe estar en una línea separada. Los valores de las columnas deben estar separados por comas. *Data* y *Columns* deben tener el mismo orden.

    Para valores que contienen comas, se deben colocar entre comillas dobles (`"ejemplo1, ejemplo2", 1, 2`).

    Para valores que contienen comillas, se deben colocar entre dos comillas dobles (`""ejemplo", "ejemplo2"", 1, 2`).

### Custom {#custom}

Se puede asignar columnas de cálculo a *Data*. Por ejemplo, puede especificar plantillas de campo para botones y otros elementos de diseño de página. Estas plantillas de campo generalmente se asignan a [Table](#Table) y otras funciones para recibir datos.

Si desea asignar varias columnas de cálculo, utilice varias funciones *Custom*.

  * Column

    Columna. Debe especificar un nombre único.

  * Body

    Fragmento de código. Puede usar `#nombredecolumna#` para obtener valores de otras columnas en esta entrada y luego usar esos valores en el fragmento de código.

**Ejemplo**

```text
Data(mysrc,"id,name"){
    "1",John Silver
    2,"Mark, Smith"
    3,"Unknown ""Person"""
 }.Custom(link){Button(Body: View, Class: btn btn-link, Page: user, PageParams: "id=#id#"}
```

### DateTime {#datetime}

Muestra la hora y la fecha en el formato especificado.

**Gramática**

``` text
DateTime(DateTime, Format)
```

* DateTime

  * DateTime

    Representa la hora y la fecha `2006-01-02T15:04:05` en formato unixtime o estándar.

  * Format

    Formato de plantilla: formato de año de 2 dígitos `YY`, formato de año de 4 dígitos `YYYY`, mes `MM`, día `DD`, hora `HH`, minutos `MM`, segundos `SS`, por ejemplo: `YY/MM/DD HH:MM`.

    Si no se especifica o falta este parámetro, se utilizará el formato `YYYY-MM-DD HH:MI:SS`.

**Ejemplo**

``` text
DateTime(2017-11-07T17:51:08)
DateTime(#mytime#,HH:MI DD.MM.YYYY)
```

### DBFind {#dbfind}

Crear el elemento **dbfind**, llenarlo con los datos de la tabla *table* y colocarlo en la estructura *Source*. Esta estructura *Source* puede ser utilizada posteriormente como entrada de datos para la función [Table](#Table) y otras funciones que requieran datos de entrada de *Source*.

**Gramática**

``` text
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

* DBFind

  * table

    Nombre de la tabla de datos.

  * Source

    Nombre de la fuente de datos.

* Columns

  * columns

    La lista de campos devuelta, si no se especifica, devolverá todos los campos. Si hay campos de tipo JSON, se puede utilizar la siguiente sintaxis para manejar los campos de registro: `columnname->fieldname`. En este caso, el nombre del campo generado es `columnname.fieldname`.。

* Where

  * conditions

    Condiciones de búsqueda de datos. Consulte `contractfundef-DBFind`{.interpreted-text role="ref"}.

    Si hay campos de tipo JSON, se puede utilizar la siguiente sintaxis para manejar los campos de registro: `columnname->fieldname`.

* WhereId

    Según el ID de consulta, por ejemplo, `.WhereId(1)`.

  * id

    ID del elemento.

  * Order

    Ordenar por campo.

    Para obtener más información sobre la sintaxis de ordenación, consulte [DBFind](#DBFind).

  * name

    Nombre del campo.

* Limit

  * limit

    El número de entradas devueltas. El valor predeterminado es de 25 entradas y el máximo es de 10,000 entradas.

* offset

  Es la cantidad de desplazamiento.

* Count

  Se refiere al número total de filas que cumplen con la condición especificada en la cláusula *Where*.

  Además de almacenarse en una variable, también se devuelve el recuento total en el parámetro *count* del elemento *dbfind*.

  Si no se especifica *Where* y *WhereID*, se devolverá el número total de filas de la tabla de datos.

* countvar

  Es el nombre de la variable que almacena el recuento de filas.

* Ecosystem

  * id

    ID del ecosistema. Por defecto, los datos provienen de la tabla especificada en el ecosistema actual.

* Cutoff

    Utilizado para cortar y mostrar grandes cantidades de datos de texto.

  * columns

    Una lista de campos separados por comas que deben ser procesados por la función *Cutoff*.

    Los valores de los campos son reemplazados por un objeto JSON que tiene dos campos: enlace *link* y título *title*. Si el valor del campo es mayor a 32 caracteres, se devuelve un *link* que apunta a los primeros 32 caracteres del texto completo. Si el valor es exactamente de 32 caracteres o menos, el *link* está vacío y el *title* contiene el valor completo del campo.

* Custom

    Se puede asignar columnas de cálculo para *Data*. Por ejemplo, puede asignar plantillas de campo para botones y otros elementos de diseño de página.

    Estas plantillas de campo generalmente se asignan a `templatefundef-Table`{.interpreted-text role="ref"} y otras funciones para recibir datos.

    Si desea asignar varias columnas de cálculo, utilice varias funciones *Custom*.

  * Column

    Column name. Unique name must be specified.

  * Body

    Snippet de código. Puedes usar `#columnname#` para obtener valores de otras columnas en esta entrada y luego usar esos valores en el snippet de código.

* Vars

    La primera fila obtenida mediante la consulta genera un conjunto de variables con valores. Al especificar esta función, el parámetro *Limit* se establece automáticamente en 1 y solo se devuelve un registro.

  * Prefix

    Agregue un prefijo al nombre de la variable. El formato es `#prefijo_nombredecolumna#`, donde el nombre de la columna va seguido inmediatamente por un guión bajo. Si hay columnas que contienen campos JSON, las variables generadas usarán el siguiente formato: `#prefijo_nombredecolumna_campo#`.

**Ejemplo**

```text
DBFind(parameters,myparam)
DBFind(parameters,myparam).Columns(name,value).Where({name:"money"})
DBFind(parameters,myparam).Custom(myid){Strong(#id#)}.Custom(myname){
   Strong(Em(#name#))Div(myclass, #company#)
}
```

### Div {#div}

Crear un elemento HTML **div**.

**Gramática**

``` text
Div(Class, Body)
    [.Style(Style)]
    [.Show(Condition)]
    [.Hide(Condition)]
```

* Div

  * Class

    El nombre de la clase de este *div*.

  * Body

    elementos secundarios.

* Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS.

* Show

    Definir la condición para mostrar un Div.

  * Condition

    Ver *Ocultar* a continuación.

* Hide

    Defina la condición para ocultar un Div.

  * Condition

  El formato de la expresión es `InputName=Value`. Cuando todas las expresiones son verdaderas, *Condition* es verdadero. *Condition* es verdadero cuando el valor de `InputName` es igual a `Value`.

  Si se llaman múltiples *Show* o *Hide*, al menos un parámetro *Condition* debe ser verdadero.

**Ejemplo**

```text
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

### EcosysParam {#ecosysparam}

Esta función recupera los valores de los parámetros de la tabla de parámetros del ecosistema actual. Si el nombre del resultado devuelto tiene recursos de idioma, se traducirá en consecuencia.

**Gramática**

``` text
EcosysParam(Name, Index, Source)
```

* EcosysParam

  * Name

    Nombre del parámetro.

  * Index

    Si los parámetros de solicitud son una lista de elementos separados por comas, se puede especificar un índice que comience en 1. Por ejemplo, si `gender = male,female`, entonces `gender = male,female` devuelve `female`.

    Este parámetro no se puede utilizar junto con el parámetro *Source*.

  * Source

    Cuando el valor del parámetro es una lista separada por comas, se puede utilizar este parámetro.

    Crea un objeto *data* cuyos elementos son los valores especificados del parámetro. Este objeto se puede utilizar como fuente de datos para las funciones [Table](#Table) y [Select](#Select).

    Este parámetro no se puede utilizar junto con el parámetro *Index*.

```text
Address(EcosysParam(founder_account))
EcosysParam(gender, Source: mygender)

EcosysParam(Name: gender_list, Source: src_gender)
Select(Name: gender, Source: src_gender, NameColumn: name, ValueColumn: id)
```

### Em {#em}

Crea un elemento HTML **em**.

**Gramática**

``` text
Em(Body, Class)
```

* Em

  * Body

    Subtexto o elemento.

  * Class

    El nombre de la clase de *em*.

**Ejemplo**

```text
This is an Em(important news).
```

### ForList {#forlist}

Display the list of elements from the *Source* data source using the template format set in the *Body*, and create the **forlist** element.

**Gramática**

``` text
ForList(Source, Index){Body}
```

* ForList

  * Source

    Datos obtenidos de la función [DBFind](#dbfind) o [Data](#data).

  * Index

    La variable del contador de iteración. El conteo comienza en 1.

    Parámetro opcional. Si no se especifica, el valor del contador de iteración se escribirá en la variable *\[Source\] \_index*.

  * Body

    Template para insertar elementos.

```text
ForList(mysrc){Span(#mysrc_index#. #name#)}
```

### Form {#form}

Crear el elemento HTML **form**.

**Gramática**

``` text
Form(Class, Body) [.Style(Style)]
```

* Form

  * Body

    Subtexto o elemento.

  * Class

    El nombre de la clase de este *form*.

* Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS.

**Ejemplo**

```text
Form(class1 class2, Input(myid))
```

### GetColumnType {#getcolumntype}

Devolver los tipos de datos de los campos en una tabla especificada.

Los siguientes tipos son devueltos: `texto, varchar, número, dinero, doble, bytes, json, datetime, doble`.

**Gramática**

``` text
GetColumnType(Table, Column)
```

* GetColumnType

  * Table

    Nombre de la tabla de datos.

  * Column

    Nombre del campo.

**Ejemplo**

```text
SetVar(coltype,GetColumnType(members, member_name))Div(){#coltype#}
```

### GetHistory {#gethistory}

Crear el elemento **gethistory**, que utiliza el registro de cambios históricos de las entradas de una tabla de datos especificada para llenarlo. Los datos generados se colocarán en el elemento *Source*.

Este elemento se puede utilizar más adelante en una función de entrada de origen, como [Table](#Table).

El arreglo se ordena en orden de cambios más recientes. El campo *id* en el arreglo apunta al campo *id* de la tabla *rollback_tx*. *block_id* representa el ID del bloque y *block_time* representa la marca de tiempo de generación del bloque.

**Gramática**

``` text
GetHistory(Source, Name, Id, RollbackId)  
```

* GetHistory

  * Source

    Nombre de la fuente de datos.

  * Name

    Nombre de la tabla de datos.

  * Id

    ID de entrada.

  * RollbackId

    Optional parameter. Si se especifica, devuelve solo un registro de la tabla *rollback_tx* con el ID especificado.

**Ejemplo**

```text
GetHistory(blocks, BlockHistory, 1)
```

### GetVar {#getvar}

Esta función devuelve el valor de la variable especificada si ya existe, de lo contrario devuelve una cadena vacía.

Solo se creará el elemento **getvar** al solicitar la edición del árbol. La diferencia entre `GetVar(varname)` y `#varname#` es que si *varname* no existe, *GetVar* devolverá una cadena vacía, mientras que *#varname#* se interpretará como un valor de cadena.

**Gramática**

``` text
GetVar(Name)
```

* GetVar

  * Name

    Variable name.

**Ejemplo**

```text
If(GetVar(name)){#name#}.Else{Name is unknown}
```

### Hint {#hint}

Crear un elemento **hint** para proporcionar una sugerencia o pista.

**Gramática**

``` text
Hint(Icon,Title,Text)
```

* Hint

  * Icon

    Nombre del icono.

  * Title

    Título rápido.

  * Text

    Texto rápido.

**Ejemplo**

```text
Hint(Icon: "icon-wrench",Title:$@1pa_settings$,Text: This is a hint text)
```

### If {#if}

Declaración de condición. 

Devuelve el primer elemento secundario de *If* o *ElseIf* que cumpla con la *Condición*. De lo contrario, devuelve los elementos secundarios de *Else*.

**Gramática**

``` text
If(Condition){ Body } 
    [.ElseIf(Condition){ Body }]
    [.Else{ Body }]
```

* If

  * Condition

    Si la condición es igual a una *empty string*, *0*, o *false*, se considera que no se cumple la condición. En todos los demás casos, se considera que la condición se cumple.

  * Body

    elementos secundarios.

**Ejemplo**

```text
If(#value#){
   Span(Value)
}.ElseIf(#value2#){Span(Value 2)
}.ElseIf(#value3#){Span(Value 3)}.Else{
   Span(Nothing)
}
```

### Image {#image}

Crear el elemento HTML **imagen**.

**Gramática**

``` text
Image(Src, Alt, Class)
    [.Style(Style)]
```

* Image

  * Src

    Imagen de origen, archivo o `data:...`.

  * Alt

    Texto alternativo cuando no se puede mostrar una imagen.

  * Сlass

    Nombre de la clase de imagen.

**Ejemplo**

```text
Image(Src: Binary().ById(#id#), Class: preview).Style(height: 40px; widht 40px;)
```

### ImageInput {#imageinput}

Crear un elemento **imageinput** para cargar imágenes.

**Gramática**

``` text
ImageInput(Name, Width, Ratio, Format) 
```

* ImageInput

  * Name

    Nombre del elemento.

  * Width

    Ancho de recorte de la imagen.

  * Ratio

    Relación de aspecto o altura de la imagen.

  * Format

    El formato de carga de imágenes.

**Ejemplo**

```text
ImageInput(avatar, 100, 2/1)
```

### Include {#include}

Inserta la plantilla con el nombre especificado en el código de la página.

**Gramática**

``` text
Include(Name)
```

* Include

  * Name

    Nombre de la plantilla.

**Ejemplo**

```text
Div(myclass, Include(mywidget))
```

### Input {#input}

Crear el elemento HTML **input**.

**Gramática**

``` text
Input(Name, Class, Placeholder, Type, Value, Disabled)
    [.Validate(validation parameters)]
    [.Style(Style)]
```

* Input

  * Name

    Nombre del elemento.

  * Class

    Nombre de la clase.

  * Placeholder

    Mensaje de sugerencia para el valor esperado del campo de entrada.

  * Type

    *entrada* tipo.

  * Value

    Valor del elemento.

  * Disabled

    Desactivar el elemento *input*.

* Validate

    Validación de parámetros.

* Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS.

**Ejemplo**

```text
Input(Name: name, Type: text, Placeholder: Enter your name)
Input(Name: num, Type: text).Validate(minLength: 6, maxLength: 20)
```

### InputErr {#inputerr}

Crear el elemento **inputerr** para validar el texto de error.

**Gramática**

``` text
InputErr(Name,validation errors)]
```

* InputErr

  * Name

    Nombre del elemento correspondiente a [Input](#Input).

  * validation errors

    Mensaje de error de validación de uno o varios parámetros.

**Ejemplo**

```text
InputErr(Name: name, 
    minLength: Value is too short, 
    maxLength: The length of the value must be less than 20 characters)
```

### InputMap {#inputmap}

Create un campo de entrada de texto para la dirección. Proporcionar la funcionalidad de seleccionar coordenadas en el mapa.

**Gramática**

``` text
InputMap(Name, Type, MapType, Value)
```

* InputMap

  * Name

    Nombre del elemento.

  * Value

    Valor predeterminado.

    Este valor es un objeto en formato de cadena. Por ejemplo, `{"coords":[{"lat":number,"lng":number},]}` o `{"zoom":int, "center":{"lat":number,"lng":number}}`.

    Cuando se crea un InputMap utilizando un valor predefinido *Value*, el campo de dirección puede ser utilizado para almacenar el valor de la dirección, por lo que el campo de dirección no estará vacío.

  * Type

    Tipos de medición de puntos en el mapa:

    - *Polygon* - representa un área cerrada de múltiples puntos;
    - *Line* - representa una línea de múltiples puntos sin cerrar;
    - *Point* - representa una sola coordenada.

  * MapType

    Tipo de mapa.

    Este parámetro tiene los siguientes valores: `hybrid`, `roadmap`, `satellite`, `terrain`.

**Ejemplo**

```text
InputMap(Name: Coords,Type: polygon, MapType: hybrid, Value: `{"zoom":8, "center":{"lat":55.749942860682545,"lng":37.6207172870636}}`)
```

### JsonToSource {#jsontosource}

Crear un elemento **jsontosource** y llenarlo con pares de clave-valor de un arreglo JSON. Los datos resultantes se colocan en el elemento *Source*, que luego se puede utilizar en una función de entrada de origen, como [Table](#Table). Los registros en los datos resultantes se ordenan por orden alfabético de las claves JSON.

**Gramática**

``` text
JsonToSource(Source, Data)
```

* JsonToSource

  * Source

    Nombre de la fuente de datos.

  * Data

    JSON object or variable name containing a JSON object (`#name#`).

**Ejemplo**

```text
JsonToSource(src, #myjson#)
JsonToSource(dat, {"param":"value", "param2": "value 2"})
```

### Label {#label}

Crear el elemento HTML **label**.

**Gramática**

``` text
Label(Body, Class, For)
    [.Style(Style)]
```

* Label

  * Body

    Subtexto o elemento.

  * Class

    Nombre de la clase.

  * For

    Vincular a un elemento de formulario específico.

* Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS.

**Ejemplo**

```text
Label(The first item).
```

### LangRes {#langres}

Devuelve el recurso de idioma especificado. Si se solicita la edición del árbol, devuelve el elemento **langres**, que se puede referenciar utilizando el símbolo de formato abreviado **\$langres\$.**

**Gramática**

``` text
LangRes(Name)
```

* LangRes

  * Name

    Nombre de los recursos de lenguaje.

**Ejemplo**

```text
LangRes(name)
LangRes(myres)
```

### LinkPage {#linkpage}

Crear un elemento **linkpage** que enlace a la página.

**Gramática**

``` text
LinkPage(Body, Page, Class, PageParams)
    [.Style(Style)]
```

* LinkPage

  * Body

    Subtexto o elemento.

  * Page

    Nombre de la página redirigida.

  * Class

    Nombre de la categoría de botones.

  * PageParams

    Parámetros de la página redirigida.

* Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS

**Ejemplo**

```text
LinkPage(Class: #style_link# h5 text-bold, Page: @1roles_view, PageParams: "v_role_id=#recipient.role_id#")
```

### Map {#map}

Create un mapa visual y muestra las coordenadas en cualquier formato.

**Gramática**

``` text
Map(Hmap, MapType, Value)
```

* Map

  * Hmap

    Altura de los elementos HTML en la página.

    El valor predeterminado es 100.

  * Value

    Valor del mapa, objeto en formato de cadena.

    Por ejemplo, `{"coords":[{"lat":número,"lng":número},]}` o `{"zoom":entero, "center":{"lat":número,"lng":número}}`.

    Si no se especifica `center`, la ventana del mapa se ajustará automáticamente en función de las coordenadas especificadas.

  * MapType

    Tipo de mapa.

    Este parámetro tiene los siguientes valores: `hybrid`, `roadmap`, `satellite`, `terrain`.

**Ejemplo**

```text
Map(MapType:hybrid, Hmap:400, Value:{"coords":[{"lat":55.58774531752405,"lng":36.97260184619233},{"lat":55.58396161622043,"lng":36.973803475831005},{"lat":55.585222890513975,"lng":36.979811624024364},{"lat":55.58803635636347,"lng":36.978781655762646}],"area":146846.65783403456,"address":"Unnamed Road, Moscow, Russia, 143041"})
```

### MenuGroup {#menugroup}

Crear un submenú anidado en el menú y devolver el elemento **menugroup**. Antes de usar la sustitución de recursos de idioma, el parámetro **name** devuelve el valor de **Title**.

**Gramática**

``` text
MenuGroup(Title, Body, Icon)
```

* MenuGroup

  * Title

    Nombre del elemento del menú.

  * Body

    Elementos secundarios en un submenú.

  * Icon

    Icono.

**Ejemplo**

``` text
MenuGroup(My Menu){
    MenuItem(Interface, sys-interface)
    MenuItem(Dahsboard, dashboard_default)
}
```

### MenuItem {#menuitem}

Crear un elemento de menú y devolver el elemento **menuitem**.

**Gramática**

``` text
MenuItem(Title, Page, Params, Icon)
```

* MenuItem

  * Title

    Nombre del elemento del menú.

  * Page

    Nombre de la página redirigida.

  * Params

    Parámetros de la página redirigida.

  * Icon

    Icono.

**Ejemplo**

```text
MenuItem(Title:$@1roles$, Page:@1roles_list, Icon:"icon-pie-chart")
```

### Money {#money}

Returna el valor de cadena de *exp / 10 \^ digit*.

**Gramática**

``` text
Money(Exp, Digit)
```

* Money

  * Exp

    Formato de cadena de números.

  * Digit

    La expresión `exp/10^digit` tiene un exponente de 10, que puede ser positivo o negativo. Un valor positivo determina la cantidad de decimales después del punto decimal.

**Ejemplo**

```text
Money(Exp, Digit)
```

### Or {#or}

La función devuelve el resultado de la operación lógica **if** con todos los argumentos listados entre paréntesis separados por comas. Si un argumento no es una cadena vacía, cero o `false`, su valor es `true`, de lo contrario su valor es `false`.

Si el valor del argumento es `true`, la función devuelve `1`, de lo contrario devuelve `0`.

**Gramática**

``` text
Or(parameters)
```

**Ejemplo**

```text
If(Or(#myval1#,#myval2#), Span(OK))
```

### P {#p}

Crear un elemento HTML **p**.

**Gramática**

``` text
P(Body, Class) 
    [.Style(Style)]
```

* P

  * Body

    Subtexto o elemento.

  * Class

    Nombre de la clase.

* Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS.

**Ejemplo**

```text
P(This is the first line.
  This is the second line.)
```

### QRcode {#qrcode}

Crea un código QR con el texto especificado y genera un elemento **qrcode**.

**Gramática**

``` text
QRcode(Text)
```

* QRcode

  * Text

    Código QR.

**Ejemplo**

```text
QRcode(#name#)
```

### RadioGroup {#radiogroup}

Crear un elemento **radiogroup**.

**Gramática**

``` text
RadioGroup(Name, Source, NameColumn, ValueColumn, Value, Class) 
    [.Validate(validation parameters)] 
    [.Style(Style)]
```

* RadioGroup

  * Name

    Nombre del elemento.

  * Source

    Desde la fuente de datos obtenida de la función [DBFind](#DBFind) o [Data](#Data).

  * NameColumn

    Nombre de campo de la fuente de datos.

  * ValueColumn

    Nombre del valor de la fuente de datos.

    Los campos creados con [Custom](#data) no deben usarse en este parámetro.

  * Value

    Valor predeterminado.

  * Class

    Nombre de la clase.

* Validate

    Validación de parámetros.

* Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS.

**Ejemplo**

```text
RadioGroup(Name: type_decision, Source: numbers_type_decisions, NameColumn: name, ValueColumn: value)
```

### Range {#range}

Crear un elemento **range**, utilizando el paso *Step* desde *From* hasta *To* (sin incluir *To*) para rellenar elementos enteros. Los datos generados se colocarán en *Source*, que se puede utilizar más adelante en una función de entrada de origen (por ejemplo, [Table](#Table)). Si se especifican argumentos no válidos, se devolverá un *Source* vacío.

**Gramática**

``` text
Range(Source,From,To,Step)
```

* Range

  * Source

    Nombre de la fuente de datos.

  * From

    Valor inicial (i = From).

  * To

    Valor final (i < To).

  * Step

    El paso de cambio de valor, si no se especifica este parámetro, es 1 por defecto.

**Ejemplo**

```text
Range(my,0,5)
SetVar(from, 5).(to, -4).(step,-2)
Range(Source: neg, From: #from#, To: #to#, Step: #step#)
```

### Select {#select}

Crear un elemento HTML **select**.

**Gramática**

``` text
Select(Name, Source, NameColumn, ValueColumn, Value, Class) 
    [.Validate(validation parameters)]
    [.Style(Style)]
```

* Select

  * Name

    Nombre de los elementos.

  * Source

    Fuente de datos obtenida de la función [DBFind](#dbfind) o [Data](#data).

  * NameColumn

    Nombre de campo de la fuente de datos.

  * ValueColumn

    Nombre del valor de la fuente de datos.

    Los campos creados con [Custom](#custom) no deben usarse en este parámetro.

  * Value

    Valor predeterminado.

  * Class

    Nombre de la clase.

* Validate

    Validación de parámetros.

  * Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS.

**Ejemplo**

```text
DBFind(mytable, mysrc)
Select(mysrc, name) 
```

### SetTitle {#settitle}

Crear un elemento **settitle** para establecer el título de la página.

**Gramática**

``` text
SetTitle(Title)
```

* SetTitle

  * Title

    Título de la página.

**Ejemplo**

```text
SetTitle(My page)
```

### SetVar {#setvar}

Asignar el valor *Value* a la variable especificada *Name*.

**Gramática**

``` text
SetVar(Name, Value)
```

* SetVar

  * Name

    Variable name.

  * Value

    Un valor de variable, que puede contener una referencia a otra variable.

**Ejemplo**

```text
SetVar(name, John Smith).(out, I am #name#)
Span(#out#)      
```

### Span {#span}

Crear un elemento HTML **span**.

**Gramática**

``` text
Span(Body, Class)
    [.Style(Style)]
```

* Span

  * Body

    Subtexto o elemento.

  * Class

    Nombre de la clase.

* Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS.

**Ejemplo**

```text
This is Span(the first item, myclass1).
```

### Strong {#strong}

Crear el elemento HTML **strong**.

**Gramática**

``` text
Strong(Body, Class)
```

* Strong

  * Body

    Subtexto o elemento.

  * Class

    Nombre de la clase.

**Ejemplo**

```text
This is Strong(the first item, myclass1).
```

### SysParam {#sysparam}

Obtener el valor de un parámetro específico en la tabla de parámetros de la plataforma (*platform ecosystem*).

**Gramática**

``` text
SysParam(Name) 
```

* SysParam

  * Name

    Nombre del parámetro de la plataforma.

**Ejemplo**

```text
SysParam(max_columns)
```

### Table {#table}

Crear el elemento HTML **table**.

**Gramática**

``` text
Table(Source, Columns)
    [.Style(Style)]
```

* Table

  * Source

    El nombre del origen de datos especificado.

  * Columns

    Título y nombres de columna correspondientes, por ejemplo: `Título1=columna1, Título2=columna2`.

* Style

    Especifique los estilos CSS.

  * Style

    Estilos CSS.

**Ejemplo**

```text
DBFind(mytable, mysrc)
Table(mysrc,"ID=id,Name=name")
```

### TransactionInfo {#transactioninfo}

 La función busca una transacción por un valor de hash especificado y devuelve información sobre el contrato ejecutado y sus parámetros.

**Gramática**

``` text
TransactionInfo(Hash)
```

* TransactionInfo

  * Hash

    Formato de cadena hexadecimal de hash de transacción.

**Valor de retorno**

La función devuelve una cadena en formato JSON:

`{"contract":"NombreDelContrato", "params":{"clave": "val"}, "block": "N"}`

Donde:
  - *contract* - Nombre del contrato;
  - *params* - Datos que se pasan como parámetros al contrato;
  - *block* - ID del bloque que procesa la transacción.
**Ejemplo**

```text
P(TransactionInfo(#hash#))
```

### VarAsIs {#varasis}

Asistente virtual: Asignar el valor *Value* a la variable especificada *Name*. El valor de la variable especificada es el nombre de la variable en lugar de su valor.

Para la versión con reemplazo de variables, consulte [SetVar](#setvar).

**Gramática**

``` text
VarAsIs(Name, Value)
```

* VarAsIs

  * Name

    Variable name.

  * Value

    El valor de la variable, incluyendo el nombre de la variable dentro del valor, no será reemplazado. Por ejemplo, si *Value* es `ejemplo #nombredevariable#`, entonces el valor de la variable también será `ejemplo #nombredevariable#`.

El valor de la variable, incluyendo el nombre de la variable dentro del valor, no será reemplazado. Por ejemplo, si *Value* es `example #varname#`, entonces el valor de la variable también será `example #varname#`.

**Ejemplo**

```text
SetVar(Name,"John")
VarAsIs(name, I am #Name#)
Span(#name#) // I am #Name#
```

## Estilo de aplicación adaptado para dispositivos móviles {#app-styles-for-mobile-devices}

### Layout {#layout}

#### Título {#title}

-   `h1` \... `h6`

#### Nombres de clase de énfasis {#strong-class-names}

-   `.text-muted`
-   `.text-primary`
-   `.text-success`
-   `.text-info`
-   `.text-warning`
-   `.text-danger`

#### Color {#color}

-   `.bg-danger-dark`
-   `.bg-danger`
-   `.bg-danger-light`
-   `.bg-info-dark`
-   `.bg-info`
-   `.bg-info-light`
-   `.bg-primary-dark`
-   `.bg-primary`
-   `.bg-primary-light`
-   `.bg-success-dark`
-   `.bg-success`
-   `.bg-success-light`
-   `.bg-warning-dark`
-   `.bg-warning`
-   `.bg-warning-light`
-   `.bg-gray-darker`
-   `.bg-gray-dark`
-   `.bg-gray`
-   `.bg-gray-light`
-   `.bg-gray-lighter`

#### Cuadrícula {#grid}

-   `.row`
-   `.row.row-table`
-   `.col-xs-1` a `.col-xs-12` solo se pueden usar dentro de `.row.row-table`.

#### Panel {#panel}

-   `.panel`
-   `.panel.panel-heading`
-   `.panel.panel-body`
-   `.panel.panel-footer`

#### Formulario {#form-app}

-   `.form-control`

#### Botón {#button-app}

-   `.btn.btn-default`
-   `.btn.btn-link`
-   `.btn.btn-primary`
-   `.btn.btn-success`
-   `.btn.btn-info`
-   `.btn.btn-warning`
-   `.btn.btn-danger`

#### Icono {#icon}

- Todos los iconos de la clase "fa" provienen de FontAwesome: `fa fa-<nombre-del-icono></nombre-del-icono>`.
- Todos los iconos de la clase "icon" provienen de SimpleLineIcons: `icon-<nombre-del-icono>`.
