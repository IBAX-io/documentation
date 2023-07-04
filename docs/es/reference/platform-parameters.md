# Parámetros de la plataforma {#platform-parameters}

Los parámetros de la plataforma son los parámetros de configuración de la plataforma de blockchain IBAX. Estos parámetros se aplican a la red de blockchain y a todo el ecosistema en la red.

## Ubicación para almacenar los parámetros de la plataforma {#location-to-store-platform-parameters}

Los parámetros de la plataforma se almacenan en la tabla de datos del "Platform Ecosystem".

Esta tabla de datos se crea en el primer (predeterminado) ecosistema creado en la red de blockchain.

## Cambio de los parámetros de la plataforma {#change-of-platform-parameters}

Los parámetros de la plataforma solo se pueden cambiar después de que se aprueben mediante votación. El cambio de los parámetros de la plataforma solo se puede realizar mediante el contrato `UpdateSysParam`, cuya gestión está definida en el sistema legal de la plataforma.

## Configuración de los parámetros de la plataforma {#configure-platform-parameters}

### Configuración de la red de blockchain {#configure-the-blockchain-network}

Nodo:

* [honor_nodes](#honor-nodes)
* [número de nodos](#number-of-nodes)


Nodo de prohibición:

* [bloques incorrectos por día](#incorrect-blocks-per-day)
* [Tiempo de prohibición de nodo](#node-ban-time)
* [Tiempo de prohibición de nodo local.](#node-ban-time-local)

### Configuración de un nuevo ecosistema {#configure-a-new-ecosystem}

Página y menú predeterminados:

* [página predeterminada del ecosistema](#default-ecosystem-page)
* [Menú de ecosistema predeterminado](#default-ecosystem-menu)


Contrato predeterminado del ecosistema:

- [contrato predeterminado del ecosistema](#default-ecosystem-contract)

### Configuración de la base de datos {#configure-the-database}

Restricciones de la tabla de datos:

* [máximo de columnas](#max-columns)
* [máximo de índices](#max-indexes)

### Configuración de generación de bloques {#configure-the-generation-of-blocks}

Límites de tiempo:

* [intervalo entre bloques](#gap-between-blocks)
* [tiempo máximo de generación de bloques](#max-block-generation-time)


Límites de cantidad de transacciones:

* [máximo de transacciones por bloque](#max-tx-block)
* [máximo de transacciones por usuario por bloque](#max-tx-block-per-user)


Límites de tamaño:

* [tamaño máximo de transacción](#max-tx-size)
* [tamaño máximo de bloque](#max-block-size)
* [tamaño máximo de firma](#max-forsign-size)


Limitaciones de combustible:

* [bloque máximo de combustible](#max-fuel-block)
* [transacción máxima de combustible](#max-fuel-tx)

Limitaciones de reversión de bloque:

* [bloques de reversión](#rollback-blocks)

## Configuración de tokens de combustible {#configure-the-fuel-tokens}

Recompensas y comisiones:

* [recompensa por bloque](#block-reward)
* [cartera de comisión](#commission-wallet)
* [tamaño de comisión](#commission-size)

Conversión de la tasa de combustible:

* [tasa de combustible](#fuel-rate)
* [precio crear tasa](#price-create-rate)

Precio de los datos de transacción de tamaño:

* [precio de datos de tx](#price-tx-data)
* [precio tamaño de transacción billetera](#price-tx-size-wallet)

Precio de creación de ecosistema: 

* [precio crear ecosistema](#price-create-ecosystem)
* [precio crear tabla](#price-create-table)
* [precio crear columna](#price-create-column)
* [precio crear contrato inteligente](#price-create-contract)
* [precio crear menú](#price-create-menu)
* [Página de creación de precios](#price-create-page)
* [precio crear aplicación](#price-create-application)

Precio de operación:
<!-- TOC -->

- [Parámetros de la plataforma](#platform-parameters)
  - [Location to store platform parameters](#location-to-store-platform-parameters)
  - [Cambio de parámetros de plataforma.](#change-of-platform-parameters)
  - [Configurar parámetros de la plataforma.](#configure-platform-parameters)
    - [Configurar la red blockchain](#configure-the-blockchain-network)
    - [Configurar un nuevo ecosistema.](#configure-a-new-ecosystem)
    - [Configurar la base de datos](#configure-the-database)
    - [Configurar la generación de bloques](#configure-the-generation-of-blocks)
    - [Configurar los tokens de combustible.](#configure-the-fuel-tokens)
    - [Depreciado](#depreciated)
  - [Detalles de los parámetros de la plataforma.](#details-of-platform-parameters)
    - [recompensa por bloque](#block-reward)
    - [URL de blockchain](#blockchain-url)
    - [tamaño de comisión](#commission-size)
    - [cartera de comisión](#commission-wallet)
    - [contrato de ecosistema predeterminado](#default-ecosystem-contract)
    - [Menú de ecosistema predeterminado](#default-ecosystem-menu)
    - [Página de ecosistema predeterminada](#default-ecosystem-page)
    - [tasa de combustible](#fuel-rate)
    - [precio crear tasa](#price-create-rate)
    - [nodos completos](#full-nodes)
    - [espacio entre bloques](#gap-between-blocks)
    - [bloques incorrectos por día](#incorrect-blocks-per-day)
    - [Tiempo máximo de generación de bloque](#max-block-generation-time)
    - [tamaño máximo de bloque](#max-block-size)
    - [máximo de columnas](#max-columns)
    - [Tamaño máximo de archivo adjunto.](#max-forsign-size)
    - [Bloque de combustible máximo](#max-fuel-block)
    - [máximo combustible tx](#max-fuel-tx)
    - [índices máximos](#max-indexes)
    - [Máximo bloque de transacción (Max Tx Block)](#max-tx-block)
    - [Máximo de bloques de transacción por usuario.](#max-tx-block-per-user)
    - [tamaño máximo de transacción](#max-tx-size)
    - [Tiempo de prohibición de nodo](#node-ban-time)
    - [Tiempo de prohibición de nodo local.](#node-ban-time-local)
    - [número de nodos](#number-of-nodes)
    - [precio crear ecosistema](#price-create-ecosystem)
    - [precio crear aplicación](#price-create-application)
    - [precio crear tabla](#price-create-table)
    - [precio crear columna](#price-create-column)
    - [precio crear contrato inteligente](#price-create-contract)
    - [precio crear menú](#price-create-menu)
    - [Página de creación de precios](#price-create-page)
    - [precio ejecutivo dirección a identificación](#price-exec-address-to-id)
    - [precio ejecutivo de billetera de enlace](#price-exec-bind-wallet)
    - [condición de columna de ejecución de precio](#price-exec-column-condition)
    - [precio ejecutar compilar contrato](#price-exec-compile-contract)
    - [precio ejecutivo contiene](#price-exec-contains)
    - [precio del contrato de ejecución por identificación](#price-exec-contract-by-id)
    - [precio del contrato ejecutivo por nombre](#price-exec-contract-by-name)
    - [lista de contratos de ejecución de precios](#price-exec-contracts-list)
    - [precio ejecutivo crear columna](#price-exec-create-column)
    - [precio ejecutivo crear ecosistema](#price-exec-create-ecosystem)
    - [precio exec crear tabla](#price-exec-create-table)
    - [precio ejecutivo del parámetro ecosys](#price-exec-ecosys-param)
    - [precio ejecutivo evaluación](#price-exec-eval)
    - [price exec eval condition](#price-exec-eval-condition)
    - [precio ejecutivo de contrato de descarga](#price-exec-flush-contract)
    - [El precio ejecutivo tiene un prefijo.](#price-exec-has-prefix)
    - [precio ejecutivo ID a dirección](#price-exec-id-to-address)
    - [El precio ejecutivo es un objeto.](#price-exec-is-object)
    - [precio ejecutivo unirse](#price-exec-join)
    - [precio exec json a mapa](#price-exec-json-to-map)
    - [precio ejecutivo len](#price-exec-len)
    - [precio ejecutivo columna](#price-exec-perm-column)
    - [precio de ejecución de la tabla de permisos](#price-exec-perm-table)
    - [precio ejecutivo de publicación a identificación](#price-exec-pub-to-id)
    - [precio ejecutivo reemplazar](#price-exec-replace)
    - [precio ejecutivo sha256](#price-exec-sha256)
    - [precio tamaño ejecutivo](#price-exec-size)
    - [precio exec substr](#price-exec-substr)
    - [precio ejecutivo del combustible del sistema](#price-exec-sys-fuel)
    - [precio ejecutar sistema parámetro int](#price-exec-sys-param-int)
    - [precio ejecutar sistema parámetro cadena](#price-exec-sys-param-string)
    - [condiciones de la tabla de ejecución de precios](#price-exec-table-conditions)
    - [precio ejecutar desvincular billetera](#price-exec-unbind-wallet)
    - [precio ejecutivo actualización idioma](#price-exec-update-lang)
    - [precio ejecutar validar condición](#price-exec-validate-condition)
    - [datos de precio de transacción](#price-tx-data)
    - [precio tamaño de transacción billetera](#price-tx-size-wallet)
    - [revertir bloques](#rollback-blocks)

<!-- /TOC -->


## Configuración obsoleta {#depreciated}

Parámetros obsoletos:

* [blockchain url](#blockchain-url)

## Detalles de los parámetros de la plataforma {#details-of-platform-parameters}

### Recompensa por bloque {#block-reward}

Concede la cantidad de tokens IBXC a los nodos de honor que generan bloques. La cuenta que recibe la recompensa se especifica en el parámetro [honor_nodes](#honor-nodes).

### Blockchain url {#blockchain-url}

> Este parámetro está obsoleto.

### Tamaño de comisión {#commission-size}

> Porcentaje de comisión.
>
> La cantidad de esta comisión se calcula como un porcentaje del costo total del contrato ejecutado. La unidad de token de esta comisión es IBXC.
>
> La comisión se transferirá a la dirección de cuenta especificada en el parámetro [commission_wallet](#commission-wallet).

### Cartera de comisión {#commission-wallet}

> Dirección de la cuenta que recibe la comisión.
>
> La cantidad de comisión se especifica mediante el parámetro [commission_size](#commission-size).

### Contrato de ecosistema predeterminado {#default-ecosystem-contract}

> Código fuente del contrato predeterminado del ecosistema.
>
> Este contrato proporciona acceso al creador del ecosistema.

### Menú predeterminado del ecosistema {#default-ecosystem-menu}

> Código fuente del menú predeterminado del ecosistema.

### Página predeterminada del ecosistema {#default-ecosystem-page}

> Código fuente de la página predeterminada del ecosistema.

### Tasa de combustible {#fuel-rate}

Tarifa de unidades de combustible para tokens de diferentes ecosistemas.

El formato de este parámetro es:
>
> > `[["ecosystem_id", "token_to_fuel_rate"], ["ecosystem_id2", "token_to_fuel_rate2"], ...]`
> >
> > -   `ecosystem_id`
> >
> >     > ID del ecosistema.
> >
> > -   `token_to_fuel_rate`
> >
> >     > Tarifa de tokens para unidades de combustible.
>
> Por ejemplo:
>
> > `[["1","1000000000000"], ["2", "1000"]]`
> >
> > Un token del ecosistema 1 fue intercambiado por 1000000000000 unidades de combustible. Un token del ecosistema 2 fue intercambiado por 1000 unidades de combustible.

### Precio crear tasa {#price-create-rate}

> ID del ecosistema.

## Nodos de honor {#honor-nodes}

> Lista de nodos de honor en la red de blockchain.
>
> El formato de este parámetro es:
>
> > `[{"api_address":"https://apihost1:port1","public_key":"nodepub1","tcp_address":"tcphost1:port2"},{"api_address":"https://apihost2:port1","public_key":"nodepub2","tcp_address":"tcphost2:port2"}]`
> >
> > -   `tcp_address`
> >
> >     > Dirección TCP y puerto del host del nodo.
> >     >
> >     > Las transacciones y los nuevos bloques se enviarán a esta dirección de host. Esta dirección de host también se puede utilizar para obtener la cadena de bloques completa desde el primer bloque.
> >
> > -   `api_address`
> >
> >    > Dirección y puerto de la API del host del nodo.
> >    >
> >    > A través de la dirección de la API, se puede acceder a cualquier función de la plataforma sin necesidad de utilizar Weaver. Para más detalles, consulte [RESTful API](api2.md).
> >
> > -   `public_key`
> >
> >     > La clave pública del nodo. Esta clave pública se utiliza para verificar las firmas de los bloques.

### Espacio entre bloques {#gap-between-blocks}

> Intervalo de tiempo (en segundos) entre la generación de bloques antes y después del nodo.
>
> Todos los nodos en la red lo utilizan para determinar cuándo generar un nuevo bloque. Si el nodo actual no genera un nuevo bloque durante este período de tiempo, se pasa al siguiente nodo en la lista de nodos honorarios.
>
> El valor mínimo para este parámetro es de `1` segundo.

### Bloques incorrectos por día {#incorrect-blocks-per-day}

> La cantidad de bloques malos permitidos que se generan diariamente en un nodo antes de ser prohibidos.
>
> Cuando más de la mitad de los nodos en la red reciben esta cantidad de bloques malos de un nodo en particular, ese nodo será prohibido en la red durante [node_ban_time](#node-ban-time) tiempo.

### Tiempo máximo de generación de bloque {#max-block-generation-time}

> El tiempo máximo para generar un bloque, en milisegundos, si el bloque no se genera correctamente dentro de este tiempo, se informará un error y se agotará el tiempo de espera.

### Tamaño máximo de bloque {#max-block-size}

> El tamaño máximo del bloque, en bytes.

### Max columns {#max-columns}

> El número máximo de campos en una tabla de datos individual.
>
> Este valor máximo no incluye la columna `id` predefinida.

### Tamaño máximo de archivo adjunto. {#max-forsign-size}

> El tamaño máximo de la firma de transacción, en bytes.

### Bloque de combustible máximo {#max-fuel-block}

> El costo máximo total de combustible para un solo bloque.

### Máximo combustible tx {#max-fuel-tx}

> El costo total máximo de gas para una transacción única.

### Índices máximos {#max-indexes}

> El número máximo de campos de clave principal en una tabla de datos individual.

### Máximo bloque de transacción {#max-tx-block}

> El número máximo de transacciones en un solo bloque.

### Máximo de bloques de transacción por usuario. {#max-tx-block-per-user}

> El número máximo de transacciones de una cuenta en un bloque.

### Tamaño máximo de transacción {#max-tx-size}

> Máximo tamaño de transacción, en bytes.

### Node ban time {#node-ban-time}

> Global ban period for nodes, in milliseconds.
>
> Cuando más de la mitad de los nodos en la red reciben de un nodo un número de bloques incorrectos igual a [incorrect_blocks_per_day](#incorrect-blocks-per-day), ese nodo será prohibido en la red durante ese tiempo.

### Tiempo de prohibición de nodo local. {#node-ban-time-local}

> Período de embargo local del nodo, en milisegundos.
>
> Cuando un nodo recibe un bloque incorrecto de otro nodo, durante ese tiempo el nodo receptor prohibirá localmente al nodo emisor de enviar más información.

### Número de nodos {#number-of-nodes}

> El parámetro `honor_nodes` se refiere a la cantidad máxima de nodos de honor.

### Precio crear ecosistema {#price-create-ecosystem}

> Crear un nuevo costo de combustible del ecosistema individual.
> 
> Este parámetro define `@1NewEcosystem`. El costo adicional de combustible del contrato. Al ejecutar este contrato, también se calculará el costo de combustible de cada función ejecutada en este contrato y se incluirá en el costo total.
> 
> Este parámetro se calcula en unidades de combustible. Utilice [fuel_rate](#fuel-rate) y [price_create_rate](#price-create-rate) para convertir las unidades de combustible en tokens IBXC.

### Precio crear aplicación {#price-create-application}

> Crear el costo de combustible para una nueva aplicación individual.
> 
> Este parámetro define el costo de combustible adicional para el contrato `@1NewApplication`. Al ejecutar este contrato, también se calculará el costo de combustible para ejecutar las funciones de este contrato y se incluirá en el costo total.
> 
> Este parámetro se calcula en unidades de combustible. Utilice [fuel_rate](#fuel-rate) y [price_create_rate](#price-create-rate) para convertir las unidades de combustible a tokens IBXC.

### Precio crear tabla {#price-create-table}

> Crear una nueva tabla de datos individual para los costos de combustible.
> 
> Este parámetro define `@1NewTable`.
> 
> Los costos de combustible adicionales del contrato. Al ejecutar este contrato, también se calcularán los costos de combustible de cada función ejecutada en este contrato y se incluirán en el costo total.
> 
> Este parámetro se calcula en unidades de combustible. Utilice [fuel_rate](#fuel-rate) y [price_create_rate](#price-create-rate) para convertir las unidades de combustible en tokens IBXC.

### Precio crear columna {#price-create-column}

> Crear un nuevo campo de tabla individual para los costos de combustible.
> 
> Este parámetro define los costos de combustible adicionales del contrato `@1NewColumn`. Al ejecutar este contrato, también se calcularán los costos de combustible de las funciones de este contrato y se incluirán en el costo total.
> 
> Este parámetro se calcula en unidades de combustible. Utilice [fuel_rate](#fuel-rate) y [price_create_rate](#price-create-rate) para convertir las unidades de combustible en tokens IBXC.

### Precio crear contrato {#price-create-contract}

> Crear un nuevo contrato individual con costo de combustible.
> 
> Este parámetro define el costo adicional de combustible para el contrato `@1NewContract`. Al ejecutar este contrato, también se calculará el costo de combustible para ejecutar las funciones de este contrato y se incluirá en el costo total.
> 
> Este parámetro se calcula en unidades de combustible. Utilice [fuel_rate](#fuel-rate) y [price_create_rate](#price-create-rate) para convertir las unidades de combustible a tokens IBXC.

### Precio crear menú {#price-create-menu}

> Crear el costo de combustible para un nuevo menú individual.
> 
> Este parámetro define el costo adicional de combustible para el contrato `@1NewMenu`. Al ejecutar este contrato, también se calculará el costo de combustible para ejecutar las funciones de este contrato y se incluirá en el costo total.
> 
> Este parámetro se calcula en unidades de combustible. Utilice [fuel_rate](#fuel-rate) y [price_create_rate](#price-create-rate) para convertir las unidades de combustible a tokens IBXC.

### Página de creación de precios {#price-create-page}

> Crear el costo de combustible para una nueva página individual.
> 
> Este parámetro define el costo adicional de combustible para el contrato `@1NewPage`. Al ejecutar este contrato, también se calculará el costo de combustible para ejecutar las funciones de este contrato y se incluirá en el costo total.
> 
> Este parámetro se calcula en unidades de combustible. Utilice [fuel_rate](#fuel-rate) y [price_create_rate](#price-create-rate) para convertir las unidades de combustible a tokens IBXC.

### Precio ejecutivo dirección a identificación {#price-exec-address-to-id}

> El costo de combustible para llamar a la función `AddressToId()`, se calcula en unidades de combustible.

### Precio ejecutivo de billetera vinculada {#price-exec-bind-wallet}

> El costo de la función `Activate()` al llamarla se calcula en unidades de combustible.

### Condición de columna de ejecución de precio {#price-exec-column-condition}

> Calcular el costo de combustible utilizando la función `ColumnCondition()` y expresarlo en unidades de combustible.

### Precio ejecutar compilar contrato {#price-exec-compile-contract}

> El costo de combustible para llamar a la función `CompileContract()` se calcula en unidades de combustible.

### Precio ejecutivo contiene {#price-exec-contains}

> El costo de combustible que utiliza la función `Contains()`, se calcula en unidades de combustible.

### Precio del contrato de ejecución por identificación {#price-exec-contract-by-id}

> El costo de combustible para llamar a la función `GetContractById()` se calcula en unidades de combustible.

### Precio del contrato ejecutivo por nombre {#price-exec-contract-by-name}

> precio del contrato ejecutivo por nombre

### Lista de contratos de ejecución de precios {#price-exec-contracts-list}

> El costo de gas para llamar a la función `ContractsList()` se calcula en unidades de gas.

### Precio ejecutivo crear columna {#price-exec-create-column}

> Calcular el costo de combustible de la función `CreateColumn()`, en unidades de combustible.

### Precio ejecutivo crear ecosistema {#price-exec-create-ecosystem}

> El costo de combustible para llamar a la función `CreateEcosystem()`, se calcula en unidades de combustible.

### Precio exec crear tabla {#price-exec-create-table}

> El costo de combustible para llamar a la función `CreateTable()` se calcula en unidades de combustible.

### Precio ejecutivo del parámetro ecosys {#price-exec-ecosys-param}

> Obtener el costo de combustible al llamar a la función `EcosysParam()`, expresado en unidades de combustible.

### Precio ejecutivo evaluación {#price-exec-eval}

> El costo de gas para llamar a la función `Eval()` se calcula en unidades de combustible.

### precio, ejecución, evaluación, condición {#price-exec-eval-condition}

> El costo de gasolina de llamar a la función `EvalCondition()` se calcula en unidades de combustible.

### Precio ejecutar contrato de descarga {#price-exec-flush-contract}

> El costo de combustible para llamar a la función `FlushContract()` se calcula en unidades de combustible.

### El precio ejecutivo tiene un prefijo. {#price-exec-has-prefix}

> El costo de combustible de llamar a la función `HasPrefix()` se calcula en unidades de combustible.

### Precio ejecutivo ID a dirección {#price-exec-id-to-address}

> El costo de combustible para llamar a la función `IdToAddress()` se calcula en unidades de combustible.

### El precio ejecutivo es un objeto. {#price-exec-is-object}

> El costo de gas para llamar a la función `IsObject()` se calcula en unidades de combustible por unidad de combustible.

### Precio ejecutivo unirse {#price-exec-join}

> El costo de gasolina de llamar a la función `Join()` se calcula en unidades de combustible.

### Precio exec json a mapa {#price-exec-json-to-map}

> Calcular el costo de combustible en unidades de combustible utilizando la función `JSONToMap()`.

### Precio ejecutivo len {#price-exec-len}

> El costo de gas para llamar la función `Len()`, se calcula en unidades de gas.

### Precio ejecutivo columna {#price-exec-perm-column}

> El costo de gasolina para llamar a la función `PermColumn()` se calcula en unidades de combustible.

### Precio de ejecución de la tabla de permisos {#price-exec-perm-table}

> El costo de combustible de llamar a la función `PermTable()` se calcula en unidades de combustible por unidad de tiempo.

### Precio ejecutivo de publicación a identificación {#price-exec-pub-to-id}

> El costo de combustible para llamar a la función `PubToID()` se calcula en unidades de combustible.

### Precio ejecutivo reemplazar {#precio-ejecutivo-reemplazar}

> El costo de combustible de la función `Replace()` se calcula en unidades de combustible.

### Precio ejecutivo sha256 {#price-exec-sha256}

> El costo de gas para llamar a la función `Sha256()`, se calcula en unidades de gas.

### Precio tamaño ejecutivo {#price-exec-size}

> El costo de combustible de llamar a la función `Size()`, se calcula en unidades de combustible.

### Precio exec sustr {#price-exec-substr}

> El costo de combustible de la función `Substr()` se calcula en unidades de combustible.

### Precio ejecutivo del combustible del sistema {#price-exec-sys-fuel}

> El costo de combustible de la función `SysFuel()` se calcula en unidades de combustible.

### Precio ejecutar sistema parámetro int {#price-exec-sys-param-int}

> Obtener el costo de combustible utilizando la función `SysParamInt()`, expresado en unidades de combustible.

### Precio ejecutar sistema parámetro cadena {#price-exec-sys-param-string}

> Obtener el costo de combustible utilizando la función `SysParamString()`, calculado en unidades de combustible.

### Condiciones de la tabla de ejecución de precios {#price-exec-table-conditions}

> Calcular el costo de combustible utilizando la función `TableConditions()` y expresarlo en unidades de combustible.

### Precio ejecutar desvincular billetera {#price-exec-unbind-wallet}

> El costo de combustible de llamar a la función `Deactivate()` se calcula en unidades de combustible por unidad.

### Precio ejecutivo actualización idioma {#price-exec-update-lang}

> El costo de combustible de llamar a la función `UpdateLang()` se calcula en unidades de combustible.

### Precio ejecutar validar condición {#price-exec-validate-condition}

> Calcular el costo de combustible de la función `ValidateCondition()` en unidades de combustible.

### Datos de precio de transacción {#price-tx-data}

> Tarifa de gas por cada 1024 bytes de datos en una transacción, calculada en unidades de gas.

### Precio tamaño de transacción billetera {#price-tx-size-wallet}

> Transaction size fees, in units of IBXC tokens.
>
> En todos los ecosistemas, excepto en el ecosistema 1, la ejecución de contratos en otros ecosistemas generará una tarifa proporcional por el uso del espacio de bloque, de 1 por cada megabyte de tamaño de transacción.

**precio_tamaño_tx_cartera** 

> Tarifas IBXC.

### revertir bloques {#rollback-blocks}

> El número máximo de bloques que se pueden revertir cuando se detecta una bifurcación en la cadena de bloques.
