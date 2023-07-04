# Demonio {#daemon}

En esta sección se describe cómo los nodos de la plataforma de blockchain IBAX interactúan entre sí desde un punto de vista técnico.

## Acerca del demonio del servidor {#about-the-server-daemon}

Debe ejecutarse en cada nodo de la red. El demonio del servidor ejecuta las diversas funciones del servidor y admite el protocolo de cadena de bloques de la plataforma de cadena de bloques IBAX.

El demonio distribuye bloques y transacciones en la red de la cadena de bloques, genera nuevos bloques y verifica los bloques y transacciones recibidos. El demonio puede prevenir problemas de bifurcación de la cadena de bloques.

### Nodo de Honor Demonio Protector {#honor-node-daemon}

El nodo de honor ejecuta los siguientes demonios de servidor:

> -   [Demonio BlockGenerator.](#blockgenerator-daemon)
>
>     > Genera nuevos bloques.
>
> -   [Demonio BlockCollection](#blockcollection-daemon)
>
>     > Descarga nuevos bloques de otros nodos.
>
> -   [Demonio Disseminator](#confirmations-daemon)
>
>     > Confirma que los bloques existentes en el nodo también existen en la mayoría de los demás nodos.
>
> -   Demonio Disseminator
>
>     > Distribuye transacciones y bloques a otros nodos principales.
>
> -   Demonio QueueParserBlocks
>
>     > Procesa los bloques en la cola de bloques, que contiene bloques de otros nodos.
>     >
>     > La lógica de procesamiento de bloques es la misma que la del demonio BlockCollection.
>
> -   Demonio QueueParserTx
>
>     > Verifica las transacciones en la cola de transacciones.
>
> -   Demonio Scheduler
>
>     > Ejecuta contratos según lo programado.

### Guardian node, proceso guardián. {#guardian-node-daemon}

Guardian Node ejecuta los siguientes procesos de servidor de demonio:

> -   [Demonio BlockCollection.](#blockcollection-daemon)
> -   [Demonio Confirmations](#confirmations-daemon)
> -   [Demonio Disseminator](#disseminator-daemon)
> -   QueueParserTx
> -   Scheduler

## BlockCollection es un proceso de guardián. {#blockcollection-daemon}

El proceso de demonio de BlocksCollection es responsable de descargar bloques y sincronizar la cadena de bloques con otros nodos de la red.

### Sincronización de blockchain {#blockchain-synchronization}

El proceso de BlocksCollection Daemon sincroniza la cadena de bloques mediante la determinación de la altura máxima de bloque en la red de la cadena de bloques, solicitando nuevos bloques y resolviendo bifurcaciones en la cadena de bloques.

#### Actualización de verificación de blockchain. {#check-for-blockchain-updates}

El proceso de vigilancia de BlocksCollection envía solicitudes del ID de bloque actual a todos los nodos honorables. 

Si el ID de bloque actual del nodo de este proceso es menor que el ID de bloque actual de cualquier nodo honorable, entonces se considera que el nodo de la red de la cadena de bloques está desactualizado.

#### Descargar un nuevo bloque. {#download-new-blocks}

El nodo que devuelve la altura máxima del bloque actual se considera el nodo más reciente.

El demonio descarga todos los bloques que aún no conoce.

#### Para resolver el problema de bifurcación: {#solving-the-fork-issue}

Si se detecta una bifurcación en la cadena de bloques, el proceso de vigilancia avanzará hacia atrás la bifurcación descargando todos los bloques hasta llegar al bloque padre común.

Una vez encontrado el bloque padre común, se realizará un rollback en la cadena de bloques del nodo del proceso de vigilancia y se agregarán los bloques correctos a la cadena de bloques hasta llegar al bloque más reciente.

### Tabla de datos {#tables-1}


El proceso de BlocksCollection utiliza las siguientes tablas de datos:

> -   block_chain
> -   transactions
> -   transactions_status
> -   info_block

### Solicitud {#request-1}

El programa BlockCollection envía la siguiente solicitud a otros programas de guardia:

> -   [Type 10](#type-10) apunta al ID de bloque más grande en todos los nodos de **nodos de honor**.
> -   [Type 7](#type-7) se refiere a los datos que apuntan al ID del bloque más grande.

## Demonio de BlockGenerator. {#blockgenerator-daemon}

El proceso de BlockGenerator genera nuevos bloques en segundo plano.

### Autenticación previa {#pre-verification}

El proceso de BlockGenerator Daemon planifica la generación de nuevos bloques analizando el último bloque de la cadena de bloques.

Se pueden generar nuevos bloques si se cumplen las siguientes condiciones:

> - El nodo que genera el último bloque se encuentra en la lista de nodos de Honor del nodo del proceso de BlockGenerator.
> - El tiempo más corto transcurrido desde la generación del último bloque no validado.

### Generación de bloques {#block-generation}

Después de que el proceso de protección genere un nuevo bloque, el nuevo bloque contendrá todas las nuevas transacciones. Estas transacciones pueden ser recibidas desde otros nodos del [Demonio Disseminator](#disseminator-daemon), o pueden ser generadas por el nodo de este proceso de protección. Los bloques generados se guardan en la base de datos del nodo de este proceso.

### Tabla de datos {#tables-2}

El programa BlockGenerator utiliza la siguiente tabla:

> -   block_chain (saves new blocks)
> -   transactions
> -   transactions_status
> -   info_block

### Solicitud {#request-2}

El proceso de BlockGenerator no envía ninguna solicitud a otros procesos de demonio.

## Demonio de Disseminator {#disseminator-daemon}

El proceso de Disseminator envía transacciones y bloques a todos los nodos Honor.

### Nodo de guardia {#guardian-node}

Cuando se trabaja en un nodo guardián, el daemon envía las transacciones generadas por su nodo a todos los nodos de honor.

### Nodo de Honor {#honor-node}

Cuando se trabaja en un nodo de honor, el proceso de guardián envía el hash de los bloques y transacciones generados a todos los nodos de honor.

Luego, los nodos de honor responden a las solicitudes de transacciones desconocidas de su nodo. El proceso de guardián envía los datos completos de la transacción como respuesta.

### Tabla de datos {#tables-3}

El proceso de guardián Disseminator utiliza las siguientes tablas:

> -   transactions

### Solicitud {#request-3}

El proceso de guardián Disseminator envía la siguiente solicitud a otros procesos de guardián:

> -   [Type 1](#type-1) Enviar transacciones y hash de bloques al nodo de honor.
> -   [Type 2](#type-2) Receive transaction data from the node of honor.

## Demonio de confirmaciones {#confirmations-daemon}

Confirmations es un proceso de vigilancia que verifica si todos los bloques de su nodo están presentes en la mayoría de los otros nodos.

### Confirmación de bloqueo {#block-confirmation}

Cuando varios nodos en la red han confirmado un bloque, se considera confirmado.

El daemon comienza a confirmar todos los bloques uno por uno, comenzando desde el primer bloque no confirmado en la base de datos.

Cada bloque se confirma de la siguiente manera:

> - Se envía una solicitud a todos los nodos honorables que contienen el ID del bloque que se está confirmando.
> - Todos los nodos honorables responden con el hash del bloque.
> - Si el valor hash de la respuesta coincide con el valor hash del bloque en el nodo del daemon, se incrementa el contador de confirmación. Si el hash no coincide, se incrementa el contador de no confirmación.

### Tabla de datos {#tables-4}

El proceso de confirmaciones del guardián utiliza la siguiente tabla de datos:

> -   confirmation
> -   info_block

### Solicitud {#request-4}

El demonio de Confirmaciones envía las siguientes solicitudes a otros demonios:
> -   [Type 4](#type-4) Solicitar el hash del bloque al nodo de honor.

## Protocolo de servicio TCP {#tcp-service-protocol}

El protocolo de servicio TCP funciona en nodos de honor y nodos completos. Utiliza un protocolo binario sobre TCP para manejar solicitudes de los procesos de BlocksCollection, Disseminator y Confirmation.

## Tipo de solicitud {#request-type}

Cada solicitud tiene un tipo definido por los primeros dos bytes de la solicitud.

### Tipo 1 {#type-1}

#### Solicitante de la solicitud {#request-sender-1}

El [Demonio de Disseminator](#disseminator-daemon) envió esta solicitud.

#### Solicitud de datos {#request-data-1}

Hash de transacciones y bloques.

#### Procesamiento de solicitud {#request-processing-1}

El hash del bloque se agrega a la cola de bloques.

Se verifica y analiza el hash de la transacción y se selecciona una transacción que aún no ha aparecido en el nodo.

#### Respuesta {#response-1}

No hay respuesta. Después de procesar esta solicitud, se enviará una solicitud [Tipo 2](#type-2).

### Tipo 2 {#type-2}

#### Remitente de la solicitud {#request-sender-2}

El [Demonio de Disseminator](#disseminator-daemon) envía esta solicitud.

#### Solicitud de datos {#request-data-2}

Datos de transacción, incluyendo el tamaño de los datos:

> -   *data_size* (4 bytes)
>
>     > El tamaño de los datos de la transacción, en bytes.
>
> -   *data* (data_size bytes)
>
>     > Los datos de la transacción.

#### Procesamiento de solicitud {#request-processing-2}

Verifica la transacción y la agrega a la cola de transacciones.

#### Respuesta {#response-2}

Ninguna.

### Tipo 4 {#type-4}

#### Solicitante de solicitud {#request-sender-3}

El [Demonio de confirmaciones](#confirmations-daemon) envía esta solicitud.

#### Datos de solicitud {#request-data-3}

ID del bloque.

#### Respuesta {#response-3}

Hash del bloque.

Si no existe un bloque con ese ID, se devuelve `0`.

### Tipo 7 {#type-7}

#### Remitente de la solicitud {#request-sender-4}

El [Demonio de BlockCollection](#blockcollection-daemon) envía esta solicitud.

#### Datos de la solicitud {#request-data-4}

ID del bloque.

> -   *block_id* (4 bytes)

#### Respuesta {#response-4}

Datos del bloque, incluido el tamaño de los datos.

> -   *data_size* (4 bytes)
>
>     > Tamaño de los datos del bloque, en bytes.
>
> -   *data* (data_size bytes)
>
>     > Datos del bloque.

Si no existe el bloque con ese ID, se cierra la conexión.

### Type 10 {#type-10}

#### Remitente de la solicitud {#request-sender-5}

La solicitud la envía el [Demonio de BlockCollection](#blockcollection-daemon).

#### Datos de la solicitud {#request-data-5}

ninguno

#### Respuesta {#response-5}

ID de bloque.

> -   *block_id* (4 bytes)
