# Descripción de la plataforma blockchain IBAX {#ibax-overview}

- [Descripción de la plataforma blockchain IBAX](#ibax-overview)
    - [Características](#features)
    - [Arquitectura](#architecture)
        - [Red](#network)
        - [Nodo de honor](#honor-node)
        - [Transacciones](#transactions)
        - [Protocolo de red](#network-protocol)
        - [Verificación de bloques y transacciones](#block-and-transaction-verification)
        - [Base de datos](#database)
    - [Ecosistema](#ecolib)
        - [Entorno de desarrollo integrado](#ide)
        - [Aplicaciones](#applications)
        - [Tablas de datos](#tables)
        - [Parámetros del ecosistema](#ecosystem-parameters)
    - [Mecanismo de control de acceso](#access-rights-control-mechanism)
      - [Acciones de control de acceso](#access-control-actions)
      - [Métodos de gestión de derechos de acceso](#access-rights-management)
      - [Derechos exclusivos](#exclusive-rights)
    - [Ecosistema virtual privado](#virtual-private-ecosystem)
        - [Solicitud de recursos web](#requests-to-web-resources)
        - [Derechos de lectura de datos](#rights-to-read-data)
        - [Creación de CLB](#clb-creation)
        - [Uso de CLB](#clb-usage)


## Características {#features}

La plataforma de blockchain IBAX incluye un entorno integrado de desarrollo de aplicaciones que permite un sistema de control de acceso de múltiples niveles para datos, páginas de usuario y contratos inteligentes.

En cuanto a su estructura y funcionalidad, la plataforma de blockchain IBAX difiere significativamente de la mayoría de las plataformas de blockchain existentes:

> - El desarrollo y uso de aplicaciones en la plataforma de blockchain IBAX se realiza en un entorno de software autónomo llamado **ecosistema**. Cada ecosistema tiene sus propias reglas de miembros, que fueron establecidas inicialmente por el creador del ecosistema;
> - Las actividades del ecosistema se basan en el uso de **contratos inteligentes** para crear **registros**, como <font color=Red>tablas de bases de datos</font> y registros o actualizaciones de datos involucrados, mientras que en la mayoría de las otras plataformas de blockchain, las actividades se basan en el intercambio de transacciones entre cuentas;
> - El control de acceso a los **registros** y las relaciones entre los miembros del ecosistema son gestionados por un conjunto de reglas llamadas **leyes inteligentes**.


## Arquitectura {#architecture}

### Red {#network}

La plataforma de blockchain IBAX se construye sobre una red punto a punto (P2P).

Los nodos candidatos de honor en la red almacenan la base de datos de blockchain más reciente, que registra el estado más reciente de la plataforma de blockchain IBAX.

Los usuarios de la red pueden recibir datos enviando solicitudes a la base de datos de nodos candidatos de honor a través de Weaver o comandos REST API, y las nuevas solicitudes se envían a la red en formato binario de transacción después de ser firmadas por el usuario. Estas transacciones son esencialmente comandos de modificación de registros en la base de datos, y se agregan en forma de bloques, que luego se envían a la cadena de bloques de los nodos de la red. Cada nodo candidato de honor procesará las transacciones en el bloque para actualizar los datos correspondientes en su propia base de datos.

### Nodos de honor {#honor-node}

Los nodos candidatos de honor que tienen derecho a generar nuevos bloques se llaman nodos de honor. El número de nodos de honor está limitado por el parámetro [number_of_nodes](../reference/platform-parameters.md#number_of_nodes) en la tabla de parámetros de la plataforma.

Los nodos de honor son uno de los componentes clave de la red pública de IBAX. Verifican y ejecutan transacciones, recopilan información de transacciones de otros nodos y agregan transacciones a la cola. Utilizan un mecanismo de confirmación para verificar la corrección y validez de los nuevos bloques. En general, tienen dos estados: empaquetado y no empaquetado.

El nodo de honor en estado empaquetado tiene el mejor rendimiento. Recoge solicitudes de transacciones de la cola y verifica la validez y corrección de las transacciones, como la cantidad de transferencia, los permisos de operación de transacción y la ejecución precisa de la transacción. Todas las operaciones de transacción, ya sean correctas o incorrectas (las transacciones incorrectas se revertirán), se escriben en el bloque. Las transacciones ejecutadas se notifican a otros nodos de honor junto con el bloque a través de la difusión.

El nodo de honor en estado no empaquetado se encarga principalmente de verificar los bloques para garantizar que las transacciones en los bloques generados por los nodos empaquetados se ejecuten correctamente. Si se produce una excepción, se activará el mecanismo de manejo de excepciones, y la red IBAX volverá a verificar y revertir el bloque.

Para garantizar la eficiencia de la ejecución de transacciones, los nodos de honor recopilan continuamente información de transacciones.


### Transacciones {#transactions}

Las transacciones son generadas por [Weaver](../concepts/thesaurus.md#weaver), que incluyen los datos necesarios para ejecutar un contrato inteligente.

Las transacciones son firmadas por la clave privada del titular de la cuenta. La clave privada y la función de firma de `Weaver` pueden ser almacenadas en un navegador, cliente de software, tarjeta SIM o dispositivo físico especializado. En la implementación actual, la clave privada se almacena encriptada mediante el algoritmo ECDSA en el lado de `Weaver`. Las transacciones son firmadas utilizando el algoritmo ECDSA.

Cada transacción tiene la siguiente estructura de formato:

> - ID - ID del contrato ejecutado;
> - Params - parámetros enviados al contrato;
> - KeyID - ID del usuario que envía la transacción;
> - PublicKey - clave pública del nodo de honor;
> - Time - marca de tiempo en que se generó la transacción;
> - EcosystemID - ID del ecosistema en el que se generó la transacción;
> - ТokenEcosystem - ID del ecosistema, por defecto es 1, y su token se utiliza para pagar la tarifa de transacción.


### Protocolo de red {#network-protocol}

El usuario envía una transacción a un nodo de honor, donde se realiza una validación básica para asegurar la corrección del formato de la transacción, y luego se agrega a la cola de transacciones.
La transacción también se envía a otros nodos de honor en la red y se agrega a la cola de transacciones.

Los nodos de honor tienen el derecho de generar nuevos bloques en un período de tiempo determinado, según los parámetros de la plataforma [honor_nodes](../reference/platform-parameters.md#honor-nodes) y un algoritmo especial.
Los nodos de honor recuperan las transacciones de la cola y las envían al generador de bloques. Durante la generación de un nuevo bloque, también se procesan las transacciones en ese bloque: cada transacción se envía a la máquina virtual, la cual ejecuta el contrato correspondiente en los parámetros de la transacción, actualizando así los registros en la base de datos.

Se verifica si hay errores en el nuevo bloque generado. Si se valida correctamente, se envía el bloque a otros nodos de honor en la red.

Los otros nodos de honor agregan el nuevo bloque recibido a la cola de bloques. Después de validar el bloque, se agrega a la cadena de bloques del nodo de honor donde se encuentra el bloque, y se procesan las transacciones en el bloque, actualizando así los registros en la base de datos.

### Verificación de bloques y transacciones {#block-and-transaction-verification}

Los nodos honoríficos realizan la verificación de nuevos bloques después de su generación, así como la verificación de este bloque en todos los demás nodos honoríficos después de recibirlo, incluyendo las siguientes verificaciones:

> -   El primer byte de los datos recibidos debe ser 0, de lo contrario, los datos recibidos no se consideran un bloque;
>
> -   La marca de tiempo de generación del bloque recibido debe estar antes de la marca de tiempo actual;
>
> -   La marca de tiempo de generación del bloque debe corresponder al intervalo de tiempo en el que el nodo honorífico tiene derecho a generar un nuevo bloque;
>
> -   La altura del nuevo bloque debe ser mayor que la altura máxima del bloque en la cadena de bloques existente;
>
> -   No se debe superar el límite máximo de tarifas permitido para las transacciones en este bloque;
>
> -   Este bloque debe estar firmado correctamente con la clave del nodo de su nodo, y los datos de firma son:
>
>     > -   La altura del bloque, el valor hash del bloque anterior, la marca de tiempo del bloque, el ID del ecosistema en el que se encuentra el bloque y la dirección de la cuenta del nodo honorífico del bloque;
>     > -   La posición del nodo honorífico en la matriz de parámetros de plataforma [honor_nodes](../reference/platform-parameters.md#honor-nodes), el árbol de Merkle de todas las transacciones en este bloque (MrklRoot) y el valor hash de reversión del bloque anterior.

To check the correctness of each transaction in a block, do the following:

> -   The hash value of each transaction must be unique;
> -   A transaction signed with a key cannot exceed the limit [max_tx_block_per_user](../reference/platform-parameters.md#max-tx-block-per-user);
> -   It cannot exceed the maximum transaction size limit [max_tx_size](../reference/platform-parameters.md#max-tx-size);
> -   The transaction time cannot be greater than the block generation time, the transaction time cannot be greater than the block generation time plus 600 seconds, and cannot be less than the block generation time minus 86400 seconds;
> -   The transaction must be correctly signed;
> -   The user executing the contract must have a sufficient number of tokens in their account to pay for the transaction execution fee.

### Base de datos {#database}
La capa de almacenamiento de datos subyacente de la red IBAX es la base de datos <font color=Red>PostgreSQL</font>, completamente abierta al público.
Basado en el diseño de permisos de la plataforma del sistema operativo IBAX, los usuarios no tienen que preocuparse por la seguridad de los datos.
La red IBAX utiliza el concepto de diseño orientado a objetos y precompila los datos a través de la base de datos relacional PostgreSQL para mejorar la eficiencia del procesamiento de datos.

Si eres un experto técnico, es posible que estés interesado en el siguiente contenido, si no, puedes saltarlo.
① Todas las tablas sin prefijo numérico en el nombre pertenecen a la tabla de permisos básicos de la red IBAX.
② Todas las tablas con prefijo numérico en el nombre pertenecen a la tabla de permisos de ecoLibs.

## Ecosistema {#ecolib}

Es muy fácil para los usuarios, incluso los usuarios comunes, crear su propio ecoLib en la plataforma del sistema de red IBAX. Hemos integrado y desarrollado una aplicación que permite crear ecoLib con solo un clic.

Al crear un ecoLib, se pueden configurar los parámetros y reglas ecológicas, establecer una cuenta de administrador y un modelo de facturación. Lo más importante es que, para aplicar mejor el consenso DPoA en ecoLibs, el creador puede configurarlo escribiendo o importando su propio contrato.

Además, admitimos la emisión rápida de tokens ecoLib mediante la importación de plantillas de contrato.

Debido a las diferentes autorizaciones de consenso y gestión, ecoLib se divide en dos tipos: descentralizado y centralizado. En términos de tipo, no tienen ventajas o desventajas específicas. Debe elegir el adecuado según sus necesidades de servicio. ¿Qué pasa si puede hacerlo ahora pero no en el futuro? Puede cambiar los parámetros de ecoLib, incluso el mecanismo de consenso, tokens y métodos de gobierno en la plataforma del sistema de red IBAX. Puede dejarlo todo en manos del mecanismo autónomo mantenido por el administrador o miembros de ecoLib (dependiendo del tipo de ecoLib).

En la plataforma del sistema de red IBAX, un ecoLib tiene control total sobre los datos y el acceso a la base de datos y campos independientes. En el diseño de control de datos, admitimos la activación cuando se cumple una expresión lógica en el campo. Esta función permite ofrecer imaginación en servicios especiales, como monitoreo, cumplimiento lógico y activación según el tiempo y condiciones específicas.

Un ecoLib puede tener múltiples DApps, cada uno con parámetros independientes. ecoLib es como una plataforma donde puede implementar cualquier cosa que desee.

Para apoyar mejor a los desarrolladores del ecosistema, proporcionamos la herramienta de edición, gestión y desarrollo Weaver. Esto reducirá significativamente los costos de desarrollo, mantenimiento y gestión del ecosistema.

### Integrated Development Environment (IDE) {#ide}

Weaver includes a full set of Integrated Development Environment (IDE) for creating blockchain applications. Using this IDE does not require software developers to have a deep understanding of blockchain technology.

Weaver provides a database table management tool, smart contract editor, page editor, and other features required to create applications in the ecosystem without the need for any other software modules.

The IDE mainly includes the following parts:

> - Ecosystem parameter table;
> - Smart contract editor;
> - Database table management tool;
> - Page editor and visual page designer;
> - Multilingual resource editor;
> - Application import/export function.

### Aplicaciones {#applications}

Las aplicaciones son conjuntos de elementos que tienen acceso de configuración a tablas de bases de datos, contratos inteligentes y páginas de usuario. El ecosistema al que pertenecen los elementos de la aplicación se indica mediante el prefijo en el nombre del elemento, por ejemplo, <font color=Red>@1NombreElemento</font>, donde el ID del ecosistema se indica mediante el número <font color=Red>1</font> después del símbolo <font color=Red>@</font>. Cuando se utilizan elementos de la aplicación en el ecosistema actual, se puede omitir el prefijo <font color=Red>@1</font>. Estas aplicaciones pueden ejecutar funciones útiles o proporcionar diversos servicios.

### Tablas de datos {#tables}

En la base de datos de la plataforma de blockchain IBAX, cada ecosistema puede crear un número ilimitado de tablas de datos. Las tablas de datos de un ecosistema específico pueden ser identificadas mediante un prefijo que incluye el ID del ecosistema, el cual no se mostrará en Weaver dentro del ecosistema.

Las tablas de datos no están vinculadas ni pertenecen a ningún contrato de ninguna manera, y pueden ser utilizadas por todas las aplicaciones dentro del alcance de los permisos de acceso a las tablas de datos.

Cada ecosistema puede crear un conjunto de tablas de datos para el desarrollo de sus aplicaciones, sin excluir la posibilidad de acceder a las tablas de otros ecosistemas mediante la especificación del prefijo del nombre de la tabla.

Los registros de datos se pueden agregar a las tablas de datos mediante la configuración de permisos de acceso mediante contratos inteligentes. Los contratos inteligentes se utilizan para la gestión de permisos.

> Herramientas de gestión de tablas de datos

Las herramientas para gestionar las tablas de datos se pueden encontrar en el menú **Tablas de datos** de Weaver. Tienen las siguientes funciones:

- Ver la lista de tablas de datos y su contenido de entradas;
- Crear una nueva tabla de datos;
- Agregar campos de tabla y especificar el tipo de datos de campo: `Text`, `Date/Time`, `Varchar`, `Character`, `JSON`, `Number`, `Money`, `Double`, `Binary`;
    - Text corresponde a `text` en postgresql.
    - Date/Time corresponde a `timestamp` en postgresql.
    - Varchar corresponde a `varchar(102400)` en postgresql.
    - Character corresponde a `character(1) NOT NULL DEFAULT '0'` en postgresql.
    - JSON corresponde a `jsonb` en postgresql.
    - Number corresponde a `bigint NOT NULL DEFAULT '0'` en postgresql.
    - Money corresponde a `decimal (30, 0) NOT NULL DEFAULT '0'` en postgresql.
    - Double corresponde a `double precision` en postgresql.
    - Binary corresponde a `bytea NOT NULL DEFAULT '\x'` en postgresql.
    
- Administrar permisos para insertar datos, actualizar datos y cambiar la estructura de la tabla.

> Operaciones de datos de tabla

In order to better operate the database, both Needle and Logicor have the [DBFind](../topics/script.md#dbfind) function, which is used to retrieve values and data arrays from the data table.

The contract language [DBInsert](../topics/script.md#dbinsert) function is used to add entries to the data table. [DBUpdate](../topics/script.md#dbupdate) and [DBUpdateExt](../topics/script.md#dbupdateext) functions are used to update the values of existing entries. When updating values, the corresponding data in the data table is updated, and the blockchain adds a new transaction while retaining all historical transactions. The data in the data table can only be modified, not deleted.

In order to minimize the time it takes to execute the contract, the [DBFind](../topics/script.md#dbfind) function cannot query multiple data tables at the same time and does not support *JOIN* queries. Therefore, it is recommended to abandon the normalization of the data table specification of the application and store all available information in entries or duplicate information available in other data tables. This is not a mandatory measure, but a necessary condition for blockchain applications. In this case, the stored data should be complete data, even if the same data in other tables is updated, the data cannot be updated, which is synchronized in relational databases.

### Parámetros del ecosistema {#ecosystem-parameters}

La tabla de parámetros del ecosistema ( **1_parameters** ) se puede ver y editar desde el menú de parámetros del ecosistema de Weaver. Los parámetros del ecosistema se pueden dividir en los siguientes grupos:

> -   Parámetros generales: la cuenta del creador del ecosistema (founder_account) y otra información;
>
> -   Parámetros de permisos de acceso: definen los permisos de acceso a los elementos de la aplicación
>
>     > -   Cambiar la estructura de la tabla de datos ( *changing_tables* );
>     > -   Actualizar el contrato ( *changing_contracts* );
>     > -   Actualizar la página de usuario ( *changing_page* );
>     > -   Actualizar el menú ( *changing_menu* );
>     > -   Actualizar los recursos de varios idiomas ( *changing_language* ).
>
> -   Parámetros técnicos: definen el estilo del usuario ( *stylesheet* ), etc.;
>
> -   Parámetros de usuario: definen constantes o listas necesarias para el funcionamiento de la aplicación (separados por comas).

Se puede especificar un permiso de edición para cada parámetro del ecosistema.

Para recuperar el valor de los parámetros del ecosistema, se puede utilizar la función [EcosysParam](../topics/script.md#ecosysparam), pasando el nombre del parámetro del ecosistema como argumento a la función.

## Mecanismo de control de derechos de acceso {#access-rights-control-mechanism}

La plataforma de blockchain IBAX cuenta con un sistema de gestión de derechos de acceso de múltiples niveles. Se pueden configurar los derechos de acceso para crear y modificar cualquier elemento de la aplicación: contratos, tablas de datos, páginas de usuario, parámetros del ecosistema. También se puede configurar el permiso para cambiar los derechos de acceso.

Por defecto, todos los permisos en el ecosistema de la plataforma de blockchain IBAX son administrados por su fundador, lo cual está definido en el contrato **MainCondition** y cada ecosistema tiene este contrato por defecto. Sin embargo, después de crear contratos inteligentes, el control de derechos de acceso puede ser transferido a todos los miembros del ecosistema o a un grupo de dichos miembros.

### Acciones de control de derechos de acceso {#access-control-actions}

Los derechos de acceso se definen en el campo de permisos de la tabla de contratos (**1_contracts**), la tabla de datos (**1_tables**), la tabla de páginas de usuario (**1_pages**), la tabla de menús (**1_menu**) y la tabla de fragmentos de código (**1_blocks**), y se pueden encontrar en la sección correspondiente del menú de Weaver.

### Métodos de gestión de derechos de acceso {#access-rights-management}

Las reglas de los derechos de acceso se establecen en el campo de permisos al ingresar la expresión de contrato correspondiente **ContractConditions(\"@1MainCondition\")**, **ContractAccess(\"@1MainCondition\")** o una expresión lógica. Si el resultado de la expresión de solicitud es verdadero, se otorga el derecho de acceso, de lo contrario se deniega el derecho de acceso y se detienen las operaciones relacionadas.

The simple way to define permissions is to input a logical expression in the permission field. For example, `$key_id == 8919730491904441614`, where **\$keyid** represents the ID of the ecosystem member.

The most common and recommended way to define permissions is to use the `ContractConditions("@1ContractsName1","@1ContractsName2")` function, where the contract name **ContractsName** is passed as a parameter to the function, and the contract result must be the result of a logical expression (true or false).

Another way to define permissions is to use the `ContractAccess("@1ContractsName3","@1ContractsName4")` function. The eligible contracts **ContractsName** that can implement the corresponding operation can be passed as parameters to this function. For example, if the permission field of the *amount* column is configured as `ContractAccess("@1TokenTransfer")`, then to change the value in the *amount* column, only the **\@1TokenTransfer** contract can be executed to make the change. The permission to access the contract itself can be managed in the *conditions* section, which can be quite complex and may include many other contracts.

### Special Permissions {#exclusive-rights}

In order to address emergencies or situations critical to the operation of the ecosystem, the ecosystem parameter table (**1_parameters**) has many special parameters (**changing_contracts**, **changing_pages**, etc.) that define the permissions to access all contracts, data tables, and pages in the current ecosystem, which are configured using the contracts that play a key role.

## Virtual Private Ecosystem {#virtual-private-ecosystem}

The IBAX blockchain platform can create a virtual private ecosystem Cross Ledgers Base (CLB), which has the full functionality of a standard ecosystem, but works outside the blockchain. In CLB, contracts and template languages can be used and created, database tables can be used, and applications can be created using Weaver. Contracts on the blockchain ecosystem can be called using an interface.

### Solicitudes a recursos web {#solicitudes-a-recursos-web}

La principal diferencia entre CLB y el ecosistema estándar es que se pueden realizar solicitudes a cualquier recurso web dentro del contrato utilizando las funciones de contrato [HTTPRequest](../topics/script.md#httprequest) y [HTTPPostJSON](../topics/script.md#httppostjson) mediante el método de solicitud **HTTP/HTTPS**. Los parámetros que se pasan a esta función son: la URL, el método de solicitud (**GET** o **POST**), las cabeceras de solicitud y los parámetros de solicitud.

### Permisos de lectura de datos {#permisos-de-lectura-de-datos}

Dado que los datos en CLB no se almacenan en la cadena de bloques (pero se pueden leer), se puede configurar el permiso para leer tablas de datos. Se pueden establecer permisos de lectura para columnas individuales o para cualquier fila que utilice un contrato especial.

### Creación de CLB {#creación-de-clb}

Se pueden crear nodos CLB en la red. El administrador del nodo CLB define la lista de ecosistemas que pueden utilizar las funciones de CLB y especifica qué usuarios que tienen permisos de creador de ecosistemas pueden instalar aplicaciones, aceptar nuevos miembros y configurar permisos de acceso a recursos.

### Uso de CLB {#uso-de-clb}

CLB se puede utilizar para crear formularios de registro, enviar información de verificación a los usuarios por correo electrónico o teléfono, y almacenar datos de acceso público externos. Se pueden escribir y probar aplicaciones y luego importarlas al ecosistema de la cadena de bloques. En CLB, se pueden utilizar tareas de contrato de programación, se pueden crear oráculos para recibir datos de recursos web y enviar esos datos al ecosistema de la cadena de bloques.
