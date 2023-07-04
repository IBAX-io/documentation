# Tutorial de desarrollo de aplicaciones {#tutorial-for-application-development}

Este capítulo explica cómo escribir una aplicación simple en la plataforma de blockchain de IBAX Network.

  - [Objetivo](#the-goal)
  - [Parte 1: El entorno](#part-1-the-environment)
  - [Parte 2: Contrato inteligente](#part-2-contract)
    - [Cuenta del fundador](#creator-account)
    - [Nueva aplicación](#new-application)
    - [Nueva tabla de datos](#new-database-table)
    - [Nuevo contrato inteligente](#new-contract)
      - [Sección de código del contrato](#contract-code)
      - [Crear un contrato inteligente](#create-a-contract)
      - [Nombre del contrato inteligente](#contract-name)
      - [Sección de datos](#data)
      - [Sección de condiciones](#conditions)
      - [Sección de acciones](#action)
      - [Código completo del contrato inteligente](#full-contract-code)
      - [Guardar y ejecutar](#save-and-run)
  - [Parte 3: Página](#part-3-page)
    - [Nuevo campo](#new-field)
    - [Actualizar el contrato inteligente](#update-the-contract)
    - [Página](#page)
      - [Vista de diseño](#designer-views)
      - [Vista de desarrollador](#developer-view)
      - [Obtener datos de la tabla de la base de datos](#fetch-data-from-the-database-table)
      - [Código de página completa](#full-page-code-1)
      - [Guardar la página](#save-the-page)
  - [Parte 4: Aplicación](#part-4-application)
    - [Menú](#menu)
      - [Agregar un elemento de menú](#add-a-menu-item)
      - [Probar el nuevo elemento de menú](#test-the-new-menu-item)
    - [Enviar un mensaje](#send-a-message)
      - [Formulario](#form)
    - [Navegación en la tabla](#form-navigation)
      - [Botones de navegación](#navigation-buttons)
      - [Variables](#variables)
      - [Recuento de entradas](#entry-count)
      - [Desplazamiento de la tabla](#table-offset)
      - [Código del botón](#button-code)
      - [Actualizar la página](#page-refreshing)
      - [Código de página completa](#full-page-code-2)
  - [Conclusiones](#conclusions)



## Objetivo {#the-goal}

El inicio de la aplicación es muy simple, pero a medida que se profundiza en el tutorial, su complejidad aumenta.

La versión final de la aplicación se almacena en una tabla de datos como un mensaje simple (cadena), que incluye una marca de tiempo y el identificador de cuenta del remitente del mensaje. Los usuarios pueden acceder a esta lista de mensajes y agregar nuevos mensajes desde la página de la aplicación. La página de esta aplicación se puede acceder desde el menú del ecosistema.


## Primera parte: Entorno {#part-1-the-environment}

**Weaver** 

Weaver es el único cliente de la plataforma blockchain IBAX, proporcionando funcionalidad para todos los usuarios y roles del ecosistema. Los desarrolladores de aplicaciones pueden desarrollar y probar aplicaciones en Weaver, los administradores del ecosistema usan Weaver para administrar el ecosistema, y los usuarios pueden interactuar con las aplicaciones del ecosistema a través de Weaver.

En este tutorial, escribirás código de contrato inteligente, código de plantilla de página y realizarás todas las demás operaciones en Weaver. Weaver también proporciona una forma de recuperar, guardar y ejecutar código de contrato inteligente, administrar estructuras de datos (tablas), asignar derechos de acceso y crear aplicaciones.

Cada nodo tiene su propia instancia de Weaver.

## Parte 2: Contratos inteligentes {#part-2-contract}

Su primera aplicación simple es "¡Hola, mundo!"

```
La aplicación se almacena como una cadena en una tabla. No tiene ninguna interfaz de usuario.
```
### Cuenta del fundador {#creator-account}

Una cuenta con el rol de *Developer* puede utilizar el privilegio "root" del ecosistema. Por defecto, este rol tiene acceso a todas las operaciones. En el nuevo ecosistema, la cuenta del fundador se asigna al rol de *Developer*. Debe utilizar esta cuenta para introducir cambios importantes en el ecosistema, como la creación de nuevas aplicaciones y tablas de datos.

Inicie sesión en el ecosistema utilizando la cuenta del fundador.

### Nueva aplicación {#new-application}

Una vez que inicie sesión como fundador del ecosistema, podrá crear una nueva aplicación.

Para crear una nueva aplicación:

> 1. Vaya a la pestaña **Develope**;
>
> 2. Seleccione **Aplicaciones** en el menú de la izquierda;
>
> 3. En la página de **Aplicaciones**, seleccione **Crear**;
>
> 4. Especifique el nombre de la aplicación en el campo **Nombre**;
>
> 5. Especifique `true` en **Cambiar condiciones**:
>
>     > `true` significa que cualquier persona puede cambiar la aplicación;
>     >
>     > Otra opción es especificar `ContractConditions("MainCondition")`. Esto prohibirá que cualquier persona, excepto el fundador, realice cambios en la aplicación.
>
> 6. Su aplicación aparecerá en la lista de aplicaciones. Haga clic en el campo de nombre de la aplicación especificada para activarla.
>    ````
>    Seleccionar una aplicación en la pestaña *Desarrollador* facilita la navegación de los recursos relacionados con la aplicación seleccionada, pero no afecta al ecosistema.
>    Todas las aplicaciones del ecosistema siguen estando disponibles, independientemente de la selección.
>    ````

### Nueva tabla de datos {#new-database-table}

Para almacenar datos, la aplicación necesita una tabla de datos. Cree la tabla de datos en Weaver.

Creación de una tabla de datos:

> 1. En la pestaña **Developer**, seleccione **Aplicaciones** > **APP** > **Tablas de datos**;
>
>     > Esto muestra todas las tablas de datos para la aplicación seleccionada. Si la lista está vacía, su aplicación aún no tiene ninguna tabla de datos.
>
> 2. Haga clic en **Crear**;
>
>     > Weaver mostrará la página de creación de tabla de datos.
>
> 3. Especifique el nombre de su tabla de datos en el campo **Nombre**;
>
>     > Este tutorial utiliza el nombre de tabla de datos `apptable`.
>
> 4. Agregue una columna llamada `message` con un tipo de `Texto`;
>
>     > Como resultado, la tabla de datos debe tener dos columnas: `id` (predefinido) y `message`. Agregará más columnas más adelante.
>    ![image](/app-tut-table.png)
>
> 5. Para los permisos de lectura y escritura, especifique `true` para cada campo;
>
>     > Esto permitirá que cualquier persona realice inserciones, actualizaciones, agregue columnas y lea datos de elementos en la tabla de datos;
>     >
>     > Como opción, puede limitar los permisos de lectura y escritura a la cuenta fundadora, en cuyo caso, especifique `ContractConditions("MainCondition")` en ese campo.

### Nuevo contrato inteligente. {#new-contract}

#### Sección de código del contrato {#contract-code}

Cada contrato inteligente consta de tres partes. Para obtener más información, consulte: [Estructura del contrato inteligente](../topics/script.md#contract-structure).

#### Crear un contrato inteligente {#create-a-contract}

1. En la pestaña de **Developer**, selecciona **Aplicaciones** > **APP** > *Contratos inteligentes*;

    > Esto mostrará todos los contratos inteligentes de la aplicación seleccionada. Para una nueva aplicación, esta lista estará vacía.

2. Haz clic en *Crear*;

    > Se abrirá una nueva plantilla de contrato inteligente en el editor.

La plantilla de contrato inteligente vacía se muestra a continuación:

``` js
contract ... {
    data {

    }
    conditions {

    }
    action {

    }
}
```

#### Nombre del contrato inteligente {#contract-name}

Primero, nombra el contrato inteligente.

``` js
contract AppContract {
```

#### Sección de datos datos {#data}

Complete la sección `data`.

En el siguiente ejemplo, `Message` es el nombre de la variable y `string` es su tipo.

``` js
data {
    Message string
}
```

#### Sección de condiciones {#conditions}

Complete la sección `conditions`. La condición de validación simple es especificar que la cadena proporcionada no puede estar vacía. Si la longitud de `Message` es `0`, el contrato inteligente generará un mensaje de advertencia con el mensaje definido durante la ejecución. 

``` js
conditions {
    // avoid writing empty strings
    if Size($Message) == 0 {
        error "Message is empty"
    }
}
```

#### Sección de acciones {#action}

Fill in the `action` section. The simple action is to write the `Message` into a database table. 

(Rellenar la sección `action`. La acción simple es escribir el `Message` en una tabla de base de datos.)

``` js
action {
    DBInsert("apptable", {message: $Message})
}
```

#### Código completo del contrato inteligente {#full-contract-code}

El siguiente fragmento es el código completo del contrato inteligente.

Todos los contratos inteligentes en la plataforma de blockchain IBAX están construidos de esta manera, incluyendo las secciones de `data`, `conditions` y `action`.

``` js
contract AppContract {
    data {
        Message string
    }
    conditions {
        // avoid writing empty strings
        if Size($Message) == 0 {
            error "Message is empty"
        }
    }
    action {
        DBInsert("apptable", {message: $Message})
    }
}
```

#### Guardar y ejecutar {#save-and-run}

Prueba de contrato inteligente en preparación:

> 1. En el menú del editor, haga clic en **Guardar**;
>
>     > Esto cambiará el código del contrato inteligente y la versión modificada estará disponible para todos los nodos de la red.
>
> 2. En el menú del editor, haga clic en **Ejecutar**;
>
>     > Esto mostrará la página **Ejecutar contrato inteligente**.
>
> 3. En la página **Ejecutar contrato inteligente**, complete los parámetros de entrada del contrato inteligente;
>
>     > Este contrato inteligente tiene un parámetro `Mensaje`, por lo que en **Clave** especifique `Mensaje` y en **Valor** especifique `Hola, mundo`.
>     >
>     > ![image](/app-tut-execute.png)
>
> 4. Haga clic en **Ejecutar**.
>
>     > El resultado se mostrará en el lado derecho.

Si se ha agregado con éxito una cadena, el resultado contendrá el ID del bloque que introduce el cambio de transacción y el código de resultado.

``` js
{
   "block": "31",
   "result": null
}
```

## Parte 3: Página {#part-3-page}

Después de que el contrato inteligente entre en vigencia, es hora de expandirlo en algo más útil. En esta sección, implementará la interfaz de usuario y otras funciones.

```
Esta aplicación almacenará cadenas en una tabla, al igual que las entradas en un registro. Cada cadena tendrá un autor y una marca de tiempo.

Los usuarios podrán ver la lista de cadenas almacenadas desde la página de la aplicación, que será una tabla simple.
```

### Nuevo campo {#new-field}

Como antes, edite la tabla de datos desde la página de la pestaña **Developer** > **Aplicaciones** > **APP** > **Tablas de datos**;

Agregue los siguientes campos a la tabla de datos `apptable`:

-   Campo `author`, tipo `Number`, **cambiar** configuración a `true`;

    > Este campo almacenará el identificador de la cuenta del autor.

-   Campo `timestamp`, tipo `Date/Time`, **cambiar** configuración a `true`.

### Actualizar el contrato inteligente {#update-the-contract}

Modificar el código del contrato inteligente para manejar el ID del autor y la marca de tiempo.

El ID del autor es la cuenta del sistema en el ecosistema. La marca de tiempo es la fecha y hora en que se ejecuta el contrato inteligente en formato Unix.

Ambos valores son proporcionados por una [variable predefinida](../topics/script.md#variables). Por lo tanto, no es necesario ingresar o verificar variables predefinidas, solo se cambian en la sección de operaciones.

Cambie el contrato inteligente para escribir el ID del autor y la marca de tiempo en la tabla de datos al agregar un mensaje. El ID del autor está definido por `$key_id` y la marca de tiempo está definida por `$time`.

``` js
action {
    DBInsert("apptable", {message: $Message, author: $key_id, timestamp: $time})
}
```

### Página {#page}

Para esta sección, la página de la aplicación es una página simple que muestra la información almacenada en una tabla.

Al igual que con todos los demás recursos, se puede crear una página de interfaz de usuario en Weaver:

1. Navegue a la pestaña **Developer** > **Aplicación** > **APP** > **Página**;

2. Haga clic en **Crear**;

   > El diseñador visual se abrirá en una nueva pestaña.

#### Vista de diseño {#designer-views}

La página predeterminada está vacía. Puede utilizar estructuras predefinidas para llenar rápidamente la página.

> ![image](/app-tut-designer.png)

Crear un formulario básico:

1. En el selector de vistas de la derecha, haga clic en **Visualización (Designer)**;

> La vista cambiará al diseñador visual.

2. Desde el menú de la izquierda, seleccione **Búsqueda** > **Tabla con encabezado** y arrástrelo a la página.

> Aparecerá una tabla que contiene varios elementos.

#### Vista de desarrollador {#developer-view}

La página de usuario de la plataforma de blockchain IBAX está escrita en lenguaje de plantilla. Necesitas escribir código para la página, así que cambia a la vista de desarrollador.

> ![image](/app-tut-developer.png)

Cambia a la vista de desarrollador.

1. En el selector de vista a la derecha, haz clic en **Developer**.

   > La vista cambiará al editor de código que contiene el código de la página.

#### Obtener datos de la tabla de la base de datos {#fetch-data-from-the-database-table}

Hasta ahora, la plantilla de la página no ha hecho nada. A continuación, debes cambiar el código para que la página muestre los datos de la tabla `apptable`.

1. Para solicitar datos de la tabla, utiliza la función [DBFind](../topics/script.md#dbfind);

   > En el siguiente ejemplo, esta función llama a la tabla `apptable` para obtener datos y los coloca en la fuente `src_table`. Luego, los ordena por el campo de marca de tiempo. Esta fuente `src_table` se utilizará más adelante como fuente de datos para la vista de tabla en la página.
   >
   > ``` js
   > DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)
   > ```

2. Para mostrar los datos de la fuente `src_table`, especifica la fuente y los títulos de las columnas en la función `Table`.

   > ``` js
   > Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
   > ```

3. Haz clic en **Vista previa** en el selector de vista a la derecha para comprobar si los datos se muestran correctamente.

#### Código de página completa {#full-page-code-1}

A continuación se muestra el código de página completo para esa sección. Esta página básica se ampliará más adelante.

``` js
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)

Div(Class: panel panel-primary) {
    Div(Class: panel-heading, Body: Table block)
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
    Div(Class: panel-footer text-right) {
        Button(Class: btn btn-primary, Contract: ContractName, Body: More)
    }
}
```

#### Guardar la página {#save-the-page}

Haz clic en **Guardar** para guardar la página:

1. En el campo **Nombre de la página**, especifica `AppPage` o cualquier otro nombre para la página;
2. En **Menú**, selecciona `default_menu`;
3. Especifica la **Condición de cambio** como `true`;
4. Haz clic en **Confirmar**.

## Parte 4: Aplicación {#part-4-application}

En la sección anterior, creaste un contrato inteligente, una tabla para almacenar datos y una página de interfaz de usuario básica para mostrar esos datos.

En esta sección, determinarás la aplicación final para que tenga una apariencia y operación similar a una aplicación real.

### Menú {#menu}

La página necesita estar vinculada a un menú, por ejemplo, la página `default_page` que se muestra en la pestaña **Home** se vincula al menú predeterminado del sistema `default_menu`.

Dado que el tutorial de la aplicación es muy simple (solo tiene una página), no es necesario crear un menú separado para él. Los nuevos elementos de menú en el menú predeterminado son suficientes.

Puede definir el menú que se muestra en la página editando las propiedades de la página en **Developer** > **Aplicación** > **APP** > **Página**. Por ejemplo, si su aplicación tiene varias páginas, es posible que necesite crear un menú para navegar entre ellas y asignarlo a todas las páginas de la aplicación.


#### Agregar un elemento de menú {#add-a-menu-item}

En Weaver, al igual que con todos los demás recursos, se pueden crear y editar menús:

1. Navega a la pestaña **Developer** > **Menú**;

   > ![image](/app-tut-menu-list.png)

2. Haz clic en el nombre del elemento `default_menu`;

   > El editor se abrirá en una nueva pestaña.

3. Agrega un nuevo elemento de menú al final de la plantilla. Este elemento de menú abrirá una página de la aplicación. El icono proviene del conjunto de iconos [FontAwesome](https://fontawesome.com/icons).

   > ``` js
   > MenuItem(Título:Mensajes, Página:PáginaDeAplicación, Icono:"fa fa-envelope")
   > ```

4. Haz clic en **Guardar**.

#### Probar el nuevo elemento de menú {#test-the-new-menu-item}

Verificar si la nueva opción de menú es válida:

1. Abre la pestaña **Home**;

2. Haz clic en **Actualizar** en el menú;

    > Aparecerá una entrada de elemento con el título *Mensajes*;
    >
    > ![image](/app-tut-menu-messages.png)

3. Haz clic en **Mensajes**.

    > Se abrirá la página de la aplicación.

### Enviar un mensaje {#send-a-message}

Los botones en Logicor pueden ejecutar contratos inteligentes y abrir páginas, dependiendo de los parámetros. La función [Button](../topics/templates2.md#button) tiene dos parámetros para contratos inteligentes:

-   `Contract`

    > El nombre del contrato inteligente activado.

-   `Params`

    > Los parámetros de entrada del contrato inteligente.

#### Formulario {#form}

Para enviar datos al contrato inteligente, agregue un formulario a la página de la aplicación. Este formulario debe tener un campo de entrada para el mensaje y un botón que active el contrato AppContract.

A continuación se muestra un ejemplo de este tipo de formulario. Está anidado en su propio [Div](../topics/templates2.md#div). Colóquelo después del elemento Div que contiene la vista del formulario. El formulario define un campo de entrada [Input](../topics/templates2.md#input) con un nombre definido `message_input`. El botón utiliza este nombre para enviar el valor del parámetro `Message` al contrato. Finalmente, la función [Val](../topics/templates2.md#val) se utiliza para obtener el valor del campo de entrada.

```text
Div(Class: panel panel-primary) {
  Form() {
        Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
        Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)")
  }
}
```

Es posible que notes que al probar esta nueva función enviando un mensaje, el formulario no se actualiza. Esto se explicará en la sección de [actualización de página](#page-refreshing).

### Navegación en la tabla {#form-navigation}

En la página, la vista de tabla predeterminada solo muestra 25 entradas en la primera página. Agrega una navegación sencilla que permita al usuario navegar por todas las entradas de la tabla.

#### Botones de navegación {#navigation-buttons}

Este navegador utilizará dos botones. Cada botón volverá a cargar la página de la aplicación y pasará parámetros a ella.

> - El botón *Anterior* mostrará los primeros 25 elementos. Si no hay más elementos, el botón no se mostrará;
> - El botón *Siguiente* mostrará los siguientes 25 elementos. Si no hay más elementos, el botón no se mostrará.

#### Variables {#variables}

La navegación requiere dos variables para almacenar el estado de la vista de tabla:

> - `#table_view_offset#`
>
>   > Esta variable almacena el desplazamiento actual de la vista de tabla.
>   >
>   > Los botones de navegación lo pasarán como parámetro al recargar la página.
>
> - `#record_count#`
>
>   > Esta variable almacena el número total de entradas en la tabla.
>   >
>   > Se calculará este valor.

#### Recuento de entradas {#entry-count}

Para calcular `#record_count#`, modifique la llamada existente a la función [DBFind](../topics/templates2.md#dbfind). La variable especificada en la llamada `.count()` almacenará el recuento de entradas.

> ```text
> DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count)
> ```

#### Desplazamiento de la tabla {#table-offset}

Debe pasar el desplazamiento de la vista de tabla a la página al abrir la página. Si `#table_view_offset#` no tiene un valor, especifíquelo como `0`.

Agregue el siguiente código en la parte superior de la página.

> ``` text
> If(GetVar(table_view_offset)){
> }.Else{
>     SetVar(table_view_offset, 0)
> }
> ```

Modificar de nuevo la llamada a la función [DBFind](../topics/templates2.md#dbfind). Esta vez debe utilizar el nuevo desplazamiento de la vista de tabla.

> ``` text
> DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
> ```

#### Código del botón {#button-code}

Encuentra la llamada a la función [Div](../topics/templates2.md#div) que define el pie de página: `Div(Class:panel-footer text-right)`. Agrega el código del botón dentro de ella.

> ``` text
> Div(Class: panel-footer text-right) {
>
> }
> ```

El botón "Anterior" solo se mostrará si hay al menos un botón "Siguiente" al que volver. Cuando se agrega un botón, se calcula el nuevo desplazamiento de la vista de tabla de la página `offset_previous`. El parámetro se pasa al parámetro `PageParams` al volver a abrir la página.

> ``` text
> If(#table_view_offset# >= 25) {
>     SetVar(offset_previous, Calculate(#table_view_offset# - 25))
>     Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
> }
> ```

Solo se mostrará el botón *Siguiente* si el número total de registros es mayor que la cantidad mostrada en la página. Cuando se agrega un botón, se calculará el nuevo desplazamiento de la vista de tabla de la página `offset_next`. El parámetro se pasa al parámetro `PageParams` al volver a abrir la página.

> ``` text
> If(#record_count# >= Calculate(#table_view_offset# + 25)) {
>     SetVar(offset_next, Calculate(#table_view_offset# + 25))
>     Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
> }
> ```

![image](/app-tut-navigation.png)

Después de agregar el botón, guarda la página y prueba desde el elemento de menú *Home* > *Mensajes*.

#### Actualizar la página {#page-refreshing}

La última funcionalidad implementada es la actualización automática de la tabla en la página, cuando el usuario envía un nuevo mensaje, éste debe mostrarse en la tabla.

Además de ejecutar el contrato, también se puede lograr esto al volver a abrir la página actual mediante el botón *Send*. Se debe pasar el parámetro `#table_view_offset#` a esa página sin realizar ningún cambio.

Agregue los parámetros `Page` y `PageParams` al botón *Send*, como se muestra en el siguiente código:

``` text
Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
```

### Código de página completa {#full-page-code-2}

Esta parte describe muchos cambios en la página de la aplicación. Aquí está el código completo de la página de la aplicación.

``` text
If(GetVar(table_view_offset)){
}.Else{
    SetVar(table_view_offset, 0)
}

DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)

Div(Class: panel panel-primary) {
 Div(Class: panel-heading, Body: Table block)
 Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
 Div(Class: panel-footer text-right) {

  If(#table_view_offset# >= 25) {
    SetVar(offset_previous, Calculate(#table_view_offset# - 25))
    Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
  }

  If(#record_count# >= Calculate(#table_view_offset# + 25)) {
    SetVar(offset_next, Calculate(#table_view_offset# + 25))
    Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
  }

 }
}

Div(Class: panel panel-primary) {
  Form() {
        Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
        Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
  }
} 
```

## Conclusiones {#conclusions}

Este tutorial presentará las aplicaciones básicas del ecosistema. No aborda otros temas importantes para los desarrolladores de aplicaciones, como el diseño de la interfaz, la gestión de permisos de acceso y la interacción entre aplicaciones y recursos. Para obtener más información sobre estos temas avanzados, consulte otros documentos.
