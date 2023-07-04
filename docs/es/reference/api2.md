# API RESTful v2 {#restful-api-v2}

Todos los servicios ofrecidos por Weaver, incluyendo autenticación, recepción de datos del ecosistema, manejo de errores, operaciones de tablas de bases de datos, páginas y ejecución de contratos inteligentes, pueden ser accedidos a través de la API REST de la plataforma IBAX blockchain.

Al utilizar la API REST, los desarrolladores pueden acceder a cualquier función de la plataforma sin necesidad de utilizar Weaver.

Las llamadas a los comandos de la API se realizan mediante la dirección `/api/v2/command/[param]`, donde `command` es el nombre del comando y `param` son los parámetros adicionales. Los parámetros de solicitud deben ser enviados en formato `Content-Type: x-www-form-urlencoded`. La respuesta del servidor es en formato JSON.

<!-- TOC -->

- [RESTful API v2](#restful-api-v2)
    - [Manejo de respuestas de error](#error-response-handling)
        - [Lista de errores](#error-list)
    - [Tipo de solicitud](#request-type)
    - [Interfaz de autenticación](#authentication-interface)
        - [getuid](#getuid)
        - [login](#login)
    - [Interfaz de comandos del servidor](#server-side-command-interface)
        - [version](#version)
    - [Interfaz de funciones de solicitud de datos](#data-request-function-interface)
        - [balance](#balance)
        - [blocks](#blocks)
        - [detailed_blocks](#detailed-blocks)
        - [/data/{id}/data/{hash}](#data-id-data-hash)
        - [/data/{table}/id/{column}/{hash}](#data-table-id-column-hash)
        - [keyinfo](#keyinfo)
        - [walletHistory](#wallethistory)
        - [listWhere/{name}](#listwhere-name)
        - [nodelistWhere/{name}](#nodelistwhere-name)
    - [Obtener la interfaz de indicadores.](#get-metrics-interface)
        - [metrics/keys](#metrics-keys)
        - [metrics/blocks](#metrics-blocks)
        - [metrics/transactions](#metrics-transactions)
        - [metrics/ecosystems](#metrics-ecosystems)
        - [metrics/honornodes](#metrics-honornodes)
    - [Interfaz del ecosistema.](#ecosystem-interface)
        - [ecosystemname](#ecosystemname)
        - [appparams/{appID}](#appparams-appid)
        - [appparam/{appid}/{name}](#appparam-appid-name)
        - [ecosystemparams](#ecosystemparams)
        - [ecosystemparam/{name}](#ecosystemparam-name)
        - [tables/\[?limit=\... &offset=\... \]](#tables-limit-offset)
        - [table/{name}](#table-name)
        - [list/{name}\[?limit=\... &offset=\... &columns=\... \]](#list-name-limit-offset-columns)
        - [sections\[?limit=\... &offset=\... &lang=\]](#sections-limit-offset-lang)
        - [row/{name}/{id}\[?columns=\]](#row-name-id-columns)
        - [row/{name}/{column}/{id}](#row-name-column-id)
        - [systemparams](#systemparams)
        - [history/{name}/{id}](#history-name-id)
        - [interface/{page|menu|snippet}/{name}](#interface-page-menu-snippet-name)
    - [Interfaz de funciones de contratos inteligentes.](#contract-function-interface)
        - [contracts\[?limit=\... &offset=\... \]](#contracts-limit-offset)
        - [contract/{name}](#contract-name)
        - [sendTX](#sendtx)
        - [txstatus](#txstatus)
        - [txinfo/{hash}](#txinfo-hash)
        - [txinfoMultiple](#txinfomultiple)
        - [/page/validators_count/{name}](#page-validators-count-name)
    	- [content/menu\|page/{name}](#content-menu-page-name)
    	- [content/source/{name}](#content-source-name)
    	- [content/hash/{name}](#content-hash-name)
        - [content](#content)
        - [maxblockid](#maxblockid)
        - [block/{id}](#block-id)
        - [avatar/{ecosystem}/{member}](#avatar-ecosystem-member)
        - [config/centrifugo](#config-centrifugo)
        - [updnotificator](#updnotificator)

<!-- /TOC -->

## Manejo de respuestas de error {#error-response-handling}

En caso de que la solicitud se ejecute correctamente, se devolverá un estado `200`. Si ocurre un error, además del estado de error, se devolverá un objeto JSON con los siguientes campos:

-   **error**

    > Identificador de error.

-   **msg**

    > Información de texto de error.

-   **params**

    > Matriz de parámetros adicionales de error, que se pueden incluir en el mensaje de error.

``` text
400 (Bad preguntar)
Content-Type: application/json
{
    "err": "E_INVALIDWALLET",
    "msg": "Wallet 1234-5678-9012-3444-3488 is not valid",
    "params": ["1234-5678-9012-3444-3488"]
}
```

### Lista de errores {#error-list}

> `E_CONTRACT`

    El contrato inteligente `%s` no existe

> `E_DBNIL`

    La base de datos está vacía

> `E_DELETEDKEY`

    La dirección de la cuenta está congelada

> `E_ECOSYSTEM`

    El ecosistema `%d` no existe

> `E_EMPTYPUBLIC`

    La clave pública de la cuenta no es válida

> `E_KEYNOTFOUND`

    La dirección de la cuenta no se encontró

> `E_HASHWRONG`

    El hash no es correcto

> `E_HASHNOTFOUND`

    El hash no se encontró

> `E_HEAVYPAGE`

    Se cargaron demasiadas páginas

> `E_INVALIDWALLET`

    La dirección de la billetera `%s` no es válida

> `E_LIMITTXSIZE`

    El tamaño de la transacción ha excedido el límite

> `E_NOTFOUND`

    No se encontró el contenido de la página o menú

> `E_PARAMNOTFOUND`

    El parámetro no se encontró

> `E_PERMISSION`

    No tiene permiso

> `E_QUERY`

    Error en la consulta de la base de datos

> `E_RECOVERED`

    Se produjo un error de pánico en la API.

    Si se produce un error de pánico, se devuelve un error.

    Este error significa que ha encontrado un error que necesita ser buscado y reparado.

> `E_SERVER`

    Error del servidor.

    Si hay un error en una función de la biblioteca de Golang, se devuelve con el campo *msg* que contiene información de texto de error.

    El error **E_SERVER** puede ocurrir al responder cualquier comando. Si se debe a una entrada de parámetro incorrecta, se puede cambiar a un error relacionado.
    En otro caso, este error informa de una operación inválida o una configuración del sistema incorrecta, lo que requiere un informe de investigación más detallado.

> `E_SIGNATURE`

    Firma incorrecta

> `E_STATELOGIN`

    `%s` no es miembro del ecosistema `%s`

> `E_TABLENOTFOUND`

    No se encontró la tabla de datos `%s`

> `E_TOKENEXPIRED`

    La sesión ha caducado `%s`

> `E_UNAUTHORIZED`

    No autorizado.

    Cualquier comando, excepto `getuid, login`, devuelve el error **E_UNAUTHORIZED** si se ejecuta sin iniciar sesión o si la sesión ha caducado.

> `E_UNKNOWNUID`

    UID desconocido

> `E_UPDATING`

    El nodo está actualizando la cadena de bloques

> `E_STOPPING`

    El nodo se ha detenido

> `E_NOTIMPLEMENTED`

    No implementado todavía

> `E_BANNED`

    Esta dirección de cuenta está prohibida en `%s`

> `E_CHECKROLE`

    Acceso denegado

    Interfaz no disponible en CLB

------------------------------------------------------------------------

> Solicitud de interfaz con nodo CLB no disponible:

-   metrics
-   txinfo
-   txinfoMultiple
-   appparam
-   appparams
-   appcontent
-   history
-   balance
-   block
-   maxblockid
-   blocks
-   detailed_blocks
-   ecosystemparams
-   systemparams
-   ecosystems
-   ecosystemparam
-   ecosystemname
-   walletHistory
-   tx_record

## Tipo de solicitud {#request-type}
**Utilizar de manera uniforme**
- application/x-www-form-urlencoded


## Interfaz de autenticación {#authentication-interface}

[Token JWT](https://jwt.io)
se utiliza para la autenticación. Después de recibir el token JWT, debe colocarlo en cada encabezado de solicitud: `Authorization: Bearer TOKEN_HERE`.

### getuid {#getuid}

**GET**/ Devuelve un valor único, lo firma con una clave privada y luego lo envía de vuelta al servidor con el comando [login](#login).

Genera un token JWT temporal, que debe pasarse al llamar a **login** en la autorización.

**Solicitud**

```text
GET
/api/v2/getuid
```

**Response**

- `uid`

    > Número de firma.

- `token`

    > Token temporal pasado durante el inicio de sesión.
    >
    > El tiempo de vida del token temporal es de 5 segundos.

- `network_id`

    > Identificador del servidor.

- `cryptoer`

    > Algoritmo de curva elíptica.

- `hasher`

    > Algoritmo de hash.

**Ejemplo de respuesta 1**

```text
200 (OK)
Content-Type: application/json
{
    "uid": "4999317241855959593",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........I7LY6XX4IP12En6nr8UPklE9U4qicqg3K9KEzGq_8zE",
    "network_id": "4717243765193692211"
}
```

En caso de que no se requiera autorización (la solicitud no incluye **Authorization**), se devolverá la siguiente información:

- `expire`

    > Tiempo de expiración.

- `ecosystem`

    > ID del ecosistema.

- `key_id`

    > Dirección de la cuenta.

- `address`

    > Dirección de la billetera `XXXX-XXXX-.....-XXXX`.

- `network_id`

    > Identificador del servidor.

**Ejemplo de respuesta 2**

```text
200 (OK)
Content-Type: application/json
{
    "expire": "2159h59m49.4310543s",
    "ecosystem_id": "1",
    "key_id": "-654321",
    "address": "1196-......-3496",
    "network_id": "1"
}
```

**Error de respuesta**

*E_SERVER*

### login {#login}

**POST**/ Autenticación de usuario.

> Se debe llamar primero al comando **getuid** para recibir un valor único y firmarlo. El token JWT temporal de getuid debe ser enviado en el encabezado de la solicitud.
>
> Si la solicitud es exitosa, el token recibido se incluirá en el encabezado **Authorization**.

```text
POST
/api/v2/login
```

- `ecosystem`

    > ID del ecosistema.
    >
    > Si no se especifica, se utiliza el primer ID de ecosistema por defecto.

- `expire`

    > Tiempo de vida útil del token JWT en segundos. Por defecto es 28800.

- `pubkey`

    > Clave pública de la cuenta en formato hexadecimal.

- `key_id`

    > Dirección de la cuenta en formato `XXXX-...-XXXX`.
    >
    > Se utiliza este parámetro cuando la clave pública ya está almacenada en la cadena de bloques. No se puede utilizar junto con el parámetro *pubkey*.

- `signature`

    > Firma del uid recibido por getuid utilizando la clave privada.
    > Contenido de los datos firmados:
    ``` text
        LOGIN+{$network_id}+uid
    ```

**Respuesta**

- `token`

    > Token JWT.

- `ecosystem_id`

    > ID del ecosistema.

- `key_id`

    > ID de la dirección de la cuenta.

- `account`

    > Dirección de la cartera en formato `XXXX-XXXX-.....-XXXX`.

- `notify_key`

    > ID de notificación.

- `isnode`

    > Indica si la dirección de la cuenta es del propietario del nodo. Valores: `true,false`.

- `isowner`

    > Indica si la dirección de la cuenta es del creador del ecosistema. Valores: `true,false`.

- `clb`

    > Indica si el ecosistema de inicio de sesión es CLB. Valores: `true,false`.

- `roles` [Omitempty](#omitempty)

    > Lista de roles: `[{ID de rol, nombre de rol}]`.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...30l665h3v7lH85rs5jgk0",
	"ecosystem_id": "1",
	"key_id": "-54321",
	"account": "1285-...-7743-4282",
	"notify_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....._JTFfheD0K4CfMbvVNpOJVMNDPx25zIDGir9g3ZZM0w",
	"timestamp": "1451309883",
	"roles": [
		{
			"role_id": 1,
			"role_name": "Developer"
		}
	]
}      
```

**Respuesta de error**

*E_SERVER, E_UNKNOWNUID, E_SIGNATURE, E_STATELOGIN, E_EMPTYPUBLIC*

## Interfaz de comando del lado del servidor {#server-side-command-interface}

### versión {#version}

**GET**/ Retorna la versión actual del servidor.

Esta solicitud no requiere autorización de inicio de sesión.

**Solicitud**

```text
GET
/api/v2/version
```

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
"1.3.0 branch.main commit.790..757 time.2021-08-23-08:20:19(UTC)"
```

## Interfaz de Función de Solicitud de Datos {#data-request-function-interface}

### balance {#balance}

**GET**/ solicita el saldo de la dirección de la cuenta en el ecosistema actual.

Esta solicitud no requiere autorización de inicio de sesión.

```text
GET
/api/v2/balance/{wallet}
```

- `wallet`

    Dirección identificadora, puede ser especificada en cualquier formato `int64, uint64, XXXX-...-XXXX`. Consultar esta dirección en el ecosistema en el que el usuario ha iniciado sesión actualmente.

- `ecosistema` [Omitempty](#omitempty) Ecosistema predeterminado 1

    > ID del ecosistema predeterminado, por defecto es 1.

**Respuesta**

- `amount`

    > El saldo mínimo de la cuenta del contrato inteligente en la unidad más pequeña.

- `money`

    > El saldo de la cuenta.

- `total`

    > El saldo de la cuenta.

- `utxo`

    > El saldo de la cuenta de UTXO.

-   *digits*

    > La precisión.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "amount": "877450000000000",
    "money": "877.45",
    "total": "877450000000000",
    "digits": 6,
    "utxo": "0"
}      
```

**Respuesta de error**

*E_SERVER, E_INVALIDWALLET*

### blocks {#blocks}

**GET**/ Devuelve una lista que contiene información adicional sobre las transacciones en cada bloque.

Esta solicitud no requiere autorización de inicio de sesión.

**Solicitud**

```text
GET 
/api/v2/blocks
```

- `block_id` [Omitempty](#omitempty) por defecto es 0

    > La altura del bloque de inicio que se desea consultar.

- `count` [Omitempty](#omitempty) (por defecto es 25, máximo de solicitudes es 1000)

    > La cantidad de bloques que se desean consultar.

**Respuesta**

- Altura del bloque

    > Lista de transacciones en el bloque y la información adicional de cada transacción:
    >
    > > - `hash`
    > >
    > >     > Hash de la transacción.
    > >
    > > - `contract_name`
    > >
    > >     > Nombre del contrato inteligente.
    > >
    > > - `params`
    > >
    > >     > Array de parámetros del contrato inteligente.
    > >
    > > - `key_id`
    > >
    > >     > Para el primer bloque, es la dirección de la cuenta del primer bloque que firmó la transacción.
    > >     >
    > >     > Para todos los demás bloques, es la dirección de la cuenta que firmó la transacción.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{"1":
    [{"hash":"O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=",
    "contract_name":"",
    "params":null,
    "key_id":-118432674655542910}]
}
```

**Respuesta de error**

*E_SERVER, E_NOTFOUND*

### detailed_blocks {#detailed-blocks}

**GET**/ Return a detailed list of additional information for transactions in each block.

This request does not require login authorization.

**Solicitud**

```text
GET
/api/v2/detailed_blocks
```

- `block_id` [Omitempty](#omitempty) Por defecto es 0.

> Altura del bloque inicial que se desea consultar.

- `count` [Omitempty](#omitempty) (por defecto es 25, máximo de solicitudes es 1000)

> Cantidad de bloques.

**Respuesta**

- `Block height` Altura del bloque
- `blockhead` Encabezado del bloque que contiene los siguientes campos:
  - `block_id` Altura del bloque.
  - `time` Marca de tiempo de generación del bloque.
  - `key_id` Dirección de la cuenta que firmó el bloque.
  - `node_position` Posición del nodo que generó el bloque en la lista de nodos honoríficos.
  - `version` Versión de la estructura del bloque.
- `hash` Hash del bloque.
- `node_position` Posición del nodo que generó el bloque en la lista de nodos honoríficos.
- `key_id` Dirección de la cuenta que firmó el bloque.
- `time` Marca de tiempo de generación del bloque.
- `tx_count` Número de transacciones en el bloque.
- `size` Tamaño del bloque.
- `rollback_hash` Valor hash de reversión del bloque.
- `merkle_root` Árbol de Merkle de las transacciones del bloque.
- `bin_data` Serialización del encabezado del bloque, todas las transacciones del bloque, el hash del bloque anterior y la clave privada del nodo que generó el bloque.
- `transactions` Lista de transacciones en el bloque y la información adicional de cada transacción:
  - `hash` Hash de la transacción.
  - `contract_name` Nombre del contrato inteligente.
  - `params` Parámetros del contrato inteligente.
  - `key_id` Dirección de la cuenta que firmó la transacción.
  - `time` Marca de tiempo de generación de la transacción.
  - `type` Tipo de transacción.
  - `size` Tamaño de la transacción.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{"1":
    {"header":
        {"block_id":1,
        "time":1551069320,
        "ecosystem_id":0,
        "key_id":-118432674655542910,
        "node_position":0,
        "version":1},
    "hash":"3NxhvswmpGvRdw8HdkrniI5Mx/q14Z4d5hwGKMp6KHI=",
    "ecosystem_id":0,
    "node_position":0,
    "key_id":-118432674655542910,
    "time":1551069320,
    "tx_count":1,
    "size": "1.69KiB",
    "rollbacks_hash":"I2JHugpbdMNxBdNW1Uc0XnbiXFtzB74yD9AK5YI5i/k=",
    "mrkl_root":"MTZiMjY2NGJjOWY3MDAyODlhYjkyMDVhZDQwNDgxNzkxMjY1MWJjNjczNDkyZjk5MWI2Y2JkMjAxNTIwYjUyYg==",
    "bin_data":null,
    "sys_update":false,
    "gen_block":false,
    "stop_count":0,
    "transactions":[
        {
            "hash":"O1LhrjKznrYa0z5n5cej6p5Y1j5E9v/oV27VPRJmfgo=",
            "contract_name":"",
            "params":null,
            "key_id":0,
            "time":0,
            "type":0,
            "size": "300.00B"
        }
    ]}
}
```

**Respuesta de error**

*E_SERVER, E_NOTFOUND*
### /data/{id}/data/{hash} {#data-id-data-hash}

**GET**/
Si se especifica un hash que coincide con los datos en la tabla binaria, el campo y el registro, se devolverán los datos en esta solicitud. De lo contrario, se devolverá un error.

Esta solicitud no requiere autorización de inicio de sesión.

**Solicitud**

```text
GET
/data/{id}/data/{hash}
```

- `id`

    - `hash`

    > El hash de la solicitud de datos.

**Respuesta**

> Datos binarios

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: *
{
    "name": "NFT Miner",
    "conditions": "ContractConditions(\"@1DeveloperCondition\")",
    "data": [
        {
            "Type": "contracts",
            "Name": "NewNFTMiner",
        },
        ...
    ]
}
```

**Respuesta de error**

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### /data/{table}/id/{column}/{hash} {#data-table-id-column-hash}

**GET**/
Si el hash especificado coincide con los datos en la tabla, campo y registro especificados, se devolverán los datos. De lo contrario, se devolverá un error.

Esta solicitud no requiere autorización de inicio de sesión.

**Solicitud**

```text
GET
/data/{table}/id/{column}/{hash}
```

- `table`

    - `id`

    > Identificador del registro.

- `column`

    > Nombre de la columna de la tabla de datos, solo puede ser uno.

- `hash`

    > Hash de la solicitud de datos.

**Respuesta**

> Datos binarios

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/octet-stream
Content-Disposition: attachment

SetVar(this_page, @1voting_list).(this_table, @1votings)
Include(@1pager_header)

SetTitle("$@1voting_list$")
Span(Class: text-muted h5 m0 mb ml-lg, Body: Span(Class: ml-sm, Body: "$@1votings_list_desc$"))
AddToolButton(Title: $@1templates_list$, Page: @1voting_templates_list, Icon: icon-pin)
AddToolButton(Title: $@1create$, Page: @1voting_create, Icon: icon-plus).Popup(60, $@1new_voting$)

```

**Respuesta de error**

*E_SERVER, E_NOTFOUND, E_HASHWRONG*


### keyinfo {#keyinfo}

**GET**/ Devolver una lista de ecosistemas que contengan roles registrados en la dirección especificada.

Esta solicitud no requiere autorización de inicio de sesión.

**Solicitud**

```text
GET
/api/v2/keyinfo/{address}
```

- `address`

    > Address identifier, puede ser especificado en cualquier formato `int64, uint64, XXXX-...-XXXX`.
    >
    > Esta solicitud busca en todos los ecosistemas.

**Respuesta**

- `ecosystem`

    > Identificador del ecosistema.

- `name`

    > Nombre del ecosistema.

- `roles`

    > Lista de roles con campos *id* y *nombre*.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
[{
    "ecosystem":"1",
    "name":"platform ecosystem",
    "roles":[{"id":"1","name":"Governancer"},{"id":"2","name":"Developer"}]
}]
```

**Respuesta de error**

*E_SERVER, E_INVALIDWALLET*

### walletHistory {#wallethistory}
**GET**/ "Devolver el historial de transacciones de la cuenta actual, buscando en orden descendente según el ID."

[Authorization](#authorization)

**Solicitud**

- `searchType`

  > Tipo de búsqueda (ingreso: transferencia entrante, egreso: transferencia saliente, todo: todo, por defecto).

- `page` [Omitempty](#omitempty)
  > Número de página de búsqueda, por defecto es la primera página, mínimo 1.

- `limit` [Omitempty](#omitempty)
  > Número de entradas por página, por defecto son 20 entradas. Mínimo 1, máximo 500.

```text
GET
/api/v2/walletHistory?searchType=all&page=1&limit=10
```

**Respuesta**

- `total`

  > Número total de entradas.
- `page`

  > Número de página actual.

- `limit`

  > Número de entradas buscadas actualmente.

- Cada elemento en el array `list` contiene los siguientes parámetros:
    - `id` ID de la entrada.
    - `sender_id` ID de la clave de envío.
    - `sender_add` Dirección de la cuenta de envío.
    - `recipient_id` ID de la clave de recepción.
    - `recipient_add` Dirección de la cuenta de recepción.
    - `amount` Cantidad de la transacción.
    - `comment` Comentario de la transacción.
    - `block_id` Altura del bloque.
    - `tx_hash` Hash de la transacción.
    - `created_at` Tiempo de creación de la transacción en milisegundos.
    - `money` Cantidad de la transacción.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "page": 1,
    "limit": 10,
    "total": 617,
    "list": [
        {
            "id": 650,
            "sender_id": 666081971617879...,
            "sender_add": "0666-0819-7161-xxxx-5186",
            "recipient_id": 666081971617879...,
            "recipient_add": "0666-0819-7161-xxxx-5186",
            "amount": "242250000",
            "comment": "taxes for execution of @1Export contract",
            "block_id": 209,
            "tx_hash": "a213bc767d710a223856d83515d53518075b56fb9e9c063bce8a256c20ff0775",
            "created_at": 1666001092090,
            "money": "0.00024225"
        }
        ...
    ]
}  
```

**Respuesta de error**

*E_SERVER*



### listWhere/{name} {#listwhere-name}
**POST**/ Retrieve entries from a specified data table in the current ecosystem. It is possible to specify the columns to be returned.

[Authorization](#authorization)

**Solicitud**

- `name`

  > Nombre de la tabla de datos.

- `limit` [Omitempty](#omitempty)

> Número de entradas, por defecto 25.

- `offset` [Omitempty](#omitempty)

> Desplazamiento, por defecto 0.

- `order` [Omitempty](#omitempty)

> Orden de clasificación, por defecto id ASC.

- `columns` [Omitempty](#omitempty)

> Lista de columnas solicitadas, separadas por comas. Si no se especifica, se devolverán todas las columnas. En todos los casos, se devolverá la columna id.

- `where` [Omitempty](#omitempty)

> Condiciones de consulta
> 
> Ejemplo: si desea consultar id>2 y name = john
> 
> Puede usar: where:{"id":{"$gt":2},"name":{"$eq":"john"}}
> 
> Para más detalles, consulte la sintaxis where de [DBFind](../topics/script.md#dbfind).

```text
POST
/api/v2/listWhere/mytable
```

**Respuesta**

- `count`

  > Número total de entradas.
- `list`
  > Cada elemento del array contiene los siguientes parámetros:
  - `id`
    > ID de la entrada.
  - `...`
    > Otras columnas de la tabla de datos.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": 1,
    "list": [
        {
            "account": "xxxx-0819-7161-xxxx-xxxx",
            "ecosystem": "1",
            "id": "12",
            "key": "avatar",
            "value": "{\"binary_id\": 4}"
        }
    ]
}
```

**Respuesta de error**

*E_SERVER*,*E_TABLENOTFOUND*


### nodelistWhere/{name} {#nodelistwhere-name}
**POST**/ Recupere las entradas de una tabla de datos especificada. Puede especificar las columnas que se devolverán. Realice la codificación hexadecimal en los datos de tipo *BYTEA* en la tabla.

[Authorization](#authorization)

**Solicitud**

- `name`

  > Nombre de la tabla de datos.

- `limit` [Omitempty](#omitempty)

> Número de entradas, por defecto 25 entradas.

- `offset` [Omitempty](#omitempty)

> Desplazamiento, por defecto 0.

- `order` [Omitempty](#omitempty)

> Método de ordenamiento, por defecto id ASC.

- `columns` [Omitempty](#omitempty)

> Lista de columnas solicitadas, separadas por comas. Si no se especifica, se devolverán todas las columnas. En todos los casos, se devolverá la columna id.

- `where` [Omitempty](#omitempty)

> Condiciones de consulta
>
> Ejemplo: si desea consultar id>2 y name = john
>
> Puede usar: where:{"id":{"$gt":2},"name":{"$eq":"john"}}
>
> Para más detalles, consulte la sintaxis where de [DBFind](../topics/script.md#dbfind).

```text
POST
/api/v2/nodelistWhere/mytable
```

**Respuesta**

- `count`

  > Número total de entradas.
- `lista`
  > Cada elemento del array contiene los siguientes parámetros:
    - `id`
      > ID de la entrada.
    - `...`
      > Otras columnas de la tabla de datos.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": 1,
    "list": [
        {
            "account": "xxxx-0819-7161-xxxx-xxxx",
            "ecosystem": "1",
            "id": "12",
            "key": "avatar",
            "value": "{\"binary_id\": 4}"
        }
    ]
}
```

**Respuesta de error**

*E_SERVER*,*E_TABLENOTFOUND*


## Obtener la interfaz de indicadores. {#get-metrics-interface}

### metrics/keys {#metrics-keys}

**GET**/ Lo siento, como modelo de lenguaje de IA, no tengo acceso a información específica sobre cuentas en Ecosystem 1. ¿Hay algo más en lo que pueda ayudarte?

**Solicitud**

```text
GET
/api/v2/metrics/keys
```

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/blocks {#metrics-blocks}

**GET**/ Devuelve la cantidad de bloques.

**Solicitud**

```text
GET
/api/v2/metrics/blocks
```

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/transactions {#metrics-transactions}

**GET**/ Devolver el número total de transacciones.

**Solicitud**

```text
GET
/api/v2/metrics/transactions
```

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/ecosystems {#metrics-ecosystems}

**GET**/ Devuelve la cantidad de ecosistemas.

**Solicitud**

```text
GET
/api/v2/metrics/ecosystems
```

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

### metrics/honornodes {#metrics-honornodes}

**GET**/ La cantidad de nodos de honor.

This request does not require login authorization.

``` 
GET
/api/v2/metrics/honornodes
```

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": 28
}
```

## Interfaz del ecosistema. {#ecosystem-interface}

### ecosystemname {#ecosystemname}

**GET**Devuelva el nombre del ecosistema a través de su identificador.

This request does not require login authorization.

```text
GET
/api/v2/ecosystemname?id=1
```

-   *id*

    > ID del ecosistema.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "ecosystem_name": "platform_ecosystem"
}
```

**Respuesta de error**

*E_PARAMNOTFOUND*

### appparams/{appid} {#appparams-appid}

[Authorization](#authorization)

**GET**/ Devuelve la lista de parámetros de la aplicación actual o especificada en el ecosistema.


**Solicitud**

```text
GET
/api/v2/appparams/{appid}
```

- `appid`

    > Identificación de la aplicación.

- `ecosystem`

    > Ecological system ID; si no se especifica, se devolverán los parámetros del sistema ecológico actual.

- `names`

    > Lista de parámetros recibidos.
    >
    > Se pueden especificar una lista de nombres de parámetros separados por comas, por ejemplo: `/api/v2/appparams/1?names=name,mypar`.

**Respuesta**

- `list`

    > Cada elemento en el arreglo contiene los siguientes parámetros:
   > 
   > - `name`, nombre del parámetro;
   > - `value`, valor del parámetro;
   > - `conditions`, permisos para cambiar el parámetro.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "list": [{ 
        "name": "name",
        "value": "MyState",
        "conditions": "true",
    }, 
    { 
        "name": "mypar",
        "value": "My value",
        "conditions": "true",
    }, 
    ]
}      
```

**Respuesta de error**

*E_ECOSYSTEM*

### appparam/{appid}/{name} {#appparam-appid-name}

[Authorization](#authorization)

**GET**/ Devuelve información relevante del parámetro **{name}** de la aplicación **{appid}** en el ecosistema actual o especificado.


**Solicitud**

```text
GET
/api/v2/appparam/{appid}/{name}[?ecosystem=1]
```

- `appid`

    > Application ID.

- `name`

    > Nombre del parámetro solicitado.

- `ecosystem` [Omitempty](#omitempty)

    > ID del ecosistema (parámetro opcional).
    >
    > Devuelve el ecosistema actual por defecto.

**Respuesta**

- `id`

    - `ID de parámetro`

    > Identificador del parámetro.

- `name`

    > Nombre del parámetro.

- `value``

    > Valor del parámetro.

- `conditions`

    > Permisos para cambiar el parámetro.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "id": "10",
    "name": "par",
    "value": "My value",
    "conditions": "true"
}      
```

**Respuesta de error**

*E_ECOSYSTEM, E_PARAMNOTFOUND*

### ecosystemparams {#ecosystemparams}

[Authorization](#authorization)

**GET**/ Devolver la lista de parámetros del ecosistema.

**Solicitud**

```text
GET
/api/v2/ecosystemparams/[?ecosystem=...&names=...]
```

- `ecosystem` [Omitempty](#omitempty)

    > Ecological system ID. Si no se especifica, se devolverá el ID del sistema ecológico actual.

- `names` [Omitempty](#omitempty)

    > Parámetros de solicitud, separados por comas.
    >
    > Ejemplo:`/api/v2/ecosystemparams/?names=name,currency,logo`.

**Respuesta**

- `list`

    > Cada elemento en el arreglo contiene los siguientes parámetros:
    >
    > - `name`
    >
    >     Nombre del parámetro.
    >
    > - `value`
    >
    >     > Parámetro valor.
    >
    > - `conditions`
    >
    >     > Cambiar los permisos de los parámetros.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "list": [{ 
        "name": "name",
        "value": "MyState",
        "conditions": "true",
    }, 
    { 
        "name": "currency",
        "value": "MY",
        "conditions": "true",
    }, 
    ]
}      
```

**Respuesta de error**

*E_ECOSYSTEM*

### ecosystemparam/{name} {#ecosystemparam-name}

[Authorization](#authorization)

**GET**/ Devuelve información relevante sobre el parámetro **{name}** en el ecosistema actual o especificado.

**Solicitud**

```text
GET
/api/v2/ecosystemparam/{name}[?ecosystem=1]
```

- `name`

    > Nombre del parámetro solicitado.

- `ecosystem` [Omitempty](#omitempty)

    > Sí, se puede especificar el ID del ecosistema. Por defecto, se devuelve el ID del ecosistema actual.

**Respuesta**

- `name`

    > Nombre del parámetro.

- `value`

    > Parámetro valor.

- `conditions`

    > Cambiar los permisos de los parámetros.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "name": "currency",
    "value": "MYCUR",
    "conditions": "true"
}      
```

**Respuesta de error**

*E_ECOSYSTEM*

### tables/\[?limit=\... &offset=\... \] {#tables-limit-offset}

[Authorization](#authorization)

**GET**/ Devuelve una lista de tablas de datos del ecosistema actual. Se pueden establecer el desplazamiento y el número de entradas.

**Solicitud**

- `limit` [Omitempty](#omitempty)

    > Número de entradas, por defecto 100 entradas, máximo 1000 entradas.

- `offset` [Omitempty](#omitempty)

    > Offset, por defecto es 0.

```text
GET
/api/v2/tables?limit=...&offset=...
```

**Respuesta**

- `count`

    > Número total de entradas en la tabla de datos.

- `list`

    > Cada elemento en el arreglo contiene los siguientes parámetros:
    >
    > > - `name`
    > >
    > >     > Nombre de tabla de datos sin prefijo.
    > >
    > > - `count`
    > >
    > >     > Número de entradas en la tabla de datos.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": "100"
    "list": [{ 
        "name": "accounts",
        "count": "10",
    }, 
    { 
        "name": "citizens",
        "count": "5",
   }, 
    ]
}    
```

### table/{name} {#table-name}

[Authorization](#authorization)

**GET**/ Devuelve información relevante sobre la tabla de datos solicitada por el ecosistema actual.

**Solicitud**

- `name`

    > Nombre de la tabla de datos.

```text
GET
/api/v2/table/{table_name}
```

Devuelve la siguiente información de campo:

- `name`

    > Nombre de la tabla de datos.

- `insert`

    > Permiso para agregar una entrada nueva.

- `new_column`

    > Agregar permisos de campo.

- `update`

    > Cambiar los permisos del elemento.

- `columns`

    > Array de información relacionada con los campos:
    >
    > > - `name`
    > >
    > >     > Field name.
    > >
    > > - `type`
    > >
    > >     > Campo de tipo de datos.
    > >
    > > - `perm`
    > >
    > >     > Cambiar los permisos para modificar el valor de este campo.


### list/{name}\[?limit=\... &offset=\... &columns=\... \] {#list-name-limit-offset-columns}

[Authorization](#authorization)

**GET**/ Devuelva una lista de entradas de tabla de datos específicas en el ecosistema actual. Puede establecer un desplazamiento y un número de entradas.

**Solicitud**

- `name`

    > Nombre de la tabla de datos.

- `limit` [Omitempty](#omitempty)

    > Número de entradas predeterminado: 25 entradas.

- `offset` [Omitempty](#omitempty)

    > Offset, por defecto es 0.

- `columns` [Omitempty](#omitempty)

    > Solicite la lista de columnas separadas por comas. Si no se especifica, se devolverán todas las columnas. En todos los casos, se devolverá la columna de identificación (id).

```text
GET
/api/v2/list/mytable?columns=name
```

**Respuesta**

- `count`

    > Número total de entradas.

- `list`

    > Cada elemento en el arreglo contiene los siguientes parámetros:
    >
    > > - `id`
    > >
    > >     > ID del elemento.
    > >
    > > -   Solicitar la secuencia de columnas.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": "10"
    "list": [{ 
        "id": "1",
        "name": "John",
    }, 
    { 
        "id": "2",
        "name": "Mark",
   }, 
    ]
}   
```

### sections\[?limit=\... &offset=\... &lang=\] {#sections-limit-offset-lang}

[Authorization](#authorization)

**GET**/ Devuelve una lista de entradas de la tabla *sections* del ecosistema actual, se puede establecer un desplazamiento y un número de entradas. 

Si el campo *role_access* contiene una lista de roles y no incluye el rol actual, no se devolverán registros. 

Los datos en el campo *title* serán reemplazados por los recursos de idioma de la cabecera de solicitud *Accept-Language*.

**Solicitud**

- `limit` [Omitempty](#omitempty)

    > Número de entradas predeterminado: 25 entradas.

- `offset` [Omitempty](#omitempty)

    > Offset, por defecto es 0.

- `lang` [Omitempty](#omitempty)

    > This field specifies the code or localization of a multilingual resource, for example: *en, zh*. If the specified multilingual resource, such as *en-US*, is not found, it will be searched in the multilingual resource group *en*.

```text
GET
/api/v2/sections
```

**Respuesta**

- `count`

    > *secciones* Número total de entradas en la tabla.

- `list`

    > Cada elemento en el arreglo contiene información de todas las columnas en la tabla "sections".

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": "2"
    "list": [{
        "id": "1",
        "title": "Development",
       "urlpage": "develop",
       ...
    },
    ]
}
```

**Respuesta de error**

*E_TABLENOTFOUND*

### row/{name}/{id}\[?columns=\] {#row-name-id-columns}

[Authorization](#authorization)

**GET**/ Devuelve las entradas de la tabla de datos especificada en el ecosistema actual. Se pueden especificar las columnas que se desean devolver.

**Solicitud**

- `name`

    > Nombre de la tabla de datos.

- `id`

    > ID de entrada.

- `columns` [Omitempty](#omitempty)

    > Solicite la lista de columnas separadas por comas. Si no se especifica, se devolverán todas las columnas. En todos los casos, se devolverá la columna de identificación (id).

```text
GET
/api/v2/row/mytable/10?columns=name
```

**Respuesta**

- `value`

    > Array que recibe los valores de la columna.
    >
    > > - `id`
    > >
    > >     > ID del elemento.
    > >
    > > -   Solicito la secuencia de columnas.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "values": {
    "id": "10",
    "name": "John",
    }
}   
```

**Respuesta de error**

*E_NOTFOUND*

### row/{name}/{column}/{id} {#row-name-colorn-id}

[Authorization] (#authorization)

**GET**/ Devuelve las entradas de la tabla de datos especificada en el ecosistema actual. Se pueden especificar las columnas que se desean devolver.

**Solicitud**

- `Name`

    > Nombre de la tabla de datos.

- `colorn`

    > Nombre de columna de la tabla de datos.

- `ID`

    > ID del elemento.

- `columns` [omitempty](#omitempty)

    > Solicite la lista de columnas separadas por comas. Si no se especifica, se devolverán todas las columnas. En todos los casos, se devolverá la columna de identificación (id).

```text
GET
/api/v2/row/mytable/name/John?columns=name
```

**Respuesta**

- `value`

    > 接收列值的数组
    >
    > > -   *id*
    > >
    > >     > ID de entrada.
    > >
    > > -   The sequence of the request column.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "values": {
    "id": "10",
    "name": "John",
    }
}   
```

**Respuesta de error**

*E_NOTFOUND*

### systemparams {#systemparams}

[Authorization](#authorization)

**GET**/ Returns a list of platform parameters.

**Solicitud**

```text
GET
/api/v2/systemparams/[?names=...]
```

- `names` [Omitempty](#omitempty)

Una lista de parámetros de solicitud, separados por comas. Por ejemplo:
    `/api/v2/systemparams/?names=max_columns,max_indexes`。

**Respuesta**

- `list`

    > Cada elemento de la matriz contiene los siguientes parámetros:
    >
    > > - `name`
    > >
    > >     > Nombre del parámetro.
    > >
    > > - `value`
    > >
    > >     > Parámetro valor.
    > >
    > > - `conditions`
    > >
    > >     > Cambiar los permisos de los parámetros.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "list": [{ 
        "name": "max_columns",
        "value": "100",
        "conditions": "ContractAccess("@1UpdateSysParam")",
    }, 
    { 
        "name": "max_indexes",
        "value": "1",
        "conditions": "ContractAccess("@1UpdateSysParam")",
    }, 
    ]
}      
```

**Respuesta de error**

*E_PARAMNOTFOUND*

### history/{name}/{id} {#history-name-id}

[Authorization](#authorization)

**GET**/ Devuelve los registros de cambios para las entradas en la tabla de datos especificada en el ecosistema actual.

**Solicitud**

```text
GET
/api/v2/history?name=contracts&id=5
```

> - `name`
>
>     > Nombre de la tabla de datos.
>
> - `id`
>
>     > ID de entrada.

**Respuesta**

> - `list`
>
>     > Cada elemento en el array contiene los registros de cambios para el elemento solicitado.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "list": [
        {
            "name": "default_page",
            "value": "P(class, Default Ecosystem Page)"
        },
        {
            "menu": "default_menu"
        }
    ]
}
```

### interface/{page|menu|snippet}/{name} {#interface-page-menu-snippet-name}

[Authorization](#authorization)

**GET**/ Devuelve las entradas del campo *name* de la tabla de datos especificada (pages, menu o snippet) del ecosistema actual.

```text
GET
/api/v2/interface/page/default_page
/api/v2/interface/menu/default_menu
/api/v2/interface/snippet/welcome
```

**Solicitud**

- `name`

    > Nombre de la entrada en la tabla especificada.

**Respuesta**

- `id`

    > ID de entrada.

- `name`

    > Nombre del elemento.

- `other`

    > Las otras columnas de esta tabla.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "id": "1",
    "name": "default_page",
    "value": "P(Page content)",
    "default_menu": "default_menu",
    "validate_count": 1
}   
```

**Respuesta de error**

*E_QUERY*, *E_NOTFOUND*

## Contract Function Interface {#contract-function-interface}

### contracts\[?limit=\... &offset=\... \] {#contracts-limit-offset}

[Authorization](#authorization)

**GET**/ Devuelve una lista de contratos inteligentes en el ecosistema actual, se puede establecer un desplazamiento y un número de entradas.

**Solicitud**

- `limit` [Omitempty](#omitempty)

    > Número de entradas predeterminado: 25 entradas.

- `offset` [Omitempty](#omitempty)

    > Offset, por defecto es 0.

```text
GET
/api/v2/contracts
```

**Respuesta**

- `count`

    > Número total de entradas.

- `list`

    > Cada elemento en el arreglo contiene los siguientes parámetros:
    >
    > > - `id`
    > >
    > >     > ID de contrato inteligente.
    > >
    > > - `name`
    > >
    > >     > Nombre del contrato inteligente.
    > >
    > > - `value`
    > >
    > >     > Contenido del contrato inteligente:
    > >
    > > - `wallet_id`
    > >
    > >     > Dirección de cuenta vinculada al contrato inteligente.
    > >
    > > - `address`
    > >
    > >     > Dirección de billetera vinculada al contrato inteligente `XXXX-...-XXXX`.
    > >
    > > - `ecosystem_id`
    > >
    > >     > ID del ecosistema al que pertenece el contrato inteligente.
    > >
    > > - `app_id`
    > >
    > >     > ID de la aplicación a la que pertenece el contrato inteligente.
    > >
    > > - `conditions`
    > >
    > >     > Cambiar los permisos del contrato inteligente.
    > >
    > > - `token_id`
    > >
    > >     > ID del ecosistema donde se encuentra el token utilizado para pagar la tarifa del contrato inteligente.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "count": "10"
    "list": [{ 
        "id": "1",
        "name": "MainCondition",
        "token_id": "1", 
        "wallet_id": "0", 
        "value": "contract MainCondition {
                conditions {
                if(EcosysParam(`founder_account`)!=$key_id)
                {
                    warning `Sorry, you dont have access to this action.`
                }
                }
            }",
            "address":"0000-0000-0000-0000-0000",
            "conditions":"ContractConditions(`MainCondition`)"
        },
    ...
    ]
 }
 ```

### contract/{name} {#contract-name}

[Authorization](#authorization)

**GET**/ Retrieve information related to a specified smart contract. By default, the smart contract will be searched within the current ecosystem.

**Solicitud**

- `name`

    > Nombre del contrato inteligente.

```text
GET
/api/v2/contract/mycontract
```

**Respuesta**

- `id`

    > ID de contrato inteligente en una máquina virtual (VM).

- `name`

    > Nombre del contrato inteligente con ID del sistema ecológico "@1MainCondition".

- `state`

    > ID del ecosistema al que pertenece el contrato inteligente.

- `walletid`

    > Dirección de cuenta vinculada al contrato inteligente.

- `tokenid`

    > ID del ecosistema donde se encuentra el token utilizado como tarifa para los contratos inteligentes de pago.

- `address`

    > Dirección de billetera vinculada al contrato inteligente: `XXXX-...-XXXX`.

- `tableid`

    > ID del elemento en la tabla *contracts* donde se encuentra el contrato inteligente.

- `fields`

    > The structure information of each parameter in the **data** section of the smart contract is included in the array.
    >
    > > - `name`
    > >
    > >     > Nombre del parámetro.
    > >
    > > - `type`
    > >
    > >      Tipo de parámetro.
    > >
    > > - `optional`
    > >
    > >     > Opciones de parámetros, \`true\` indica un parámetro opcional, \`false\` indica un parámetro obligatorio.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "fields" : [
        {"name":"amount", "type":"int", "optional": false},
        {"name":"name", "type":"string", "optional": true}
    ],
    "id": 150,
    "name": "@1mycontract",
    "tableid" : 10,
}      
```

**Respuesta de error**

*E_CONTRACT*

### sendTX {#sendtx}

[Authorization](#authorization)

**POST**/ Agregar la transacción recibida en los parámetros a la cola de transacciones y, si la solicitud se ejecuta correctamente, devolver el hash de la transacción. Este hash se puede utilizar para obtener la transacción correspondiente en el bloque y, en caso de una respuesta de error, el hash se incluirá en el mensaje de texto de error.

**Solicitud**

- `tx_key`

    > Contenido de la transacción, este parámetro puede especificar cualquier nombre y admite recibir múltiples transacciones.

```text
POST
/api/v2/sendTx

Headers:
Content-Type: multipart/form-data

Parameters:
tx1 - 交易1
txN - 交易N
```

**Respuesta**

- `hashes`

    > Array de hash de transacciones:
    >
    > > - `tx1`
    > >
    > >     > El hash de la transacción 1.
    > >
    > > - `txN`
    > >
    > >     > Hash de la transacción N.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "hashes": {
        "tx1": "67afbc435634.....",
        "txN": "89ce4498eaf7.....",
}
```

**Respuesta de error**

*E_LIMITTXSIZE*,*E_BANNED*

### txstatus {#txstatus}

[Authorization](#authorization)

**POST**/ La función devuelve el ID del bloque y un mensaje de error para la transacción especificada. Si los valores devueltos para el ID del bloque y el mensaje de error están vacíos, significa que la transacción aún no ha sido incluida en ningún bloque.

**Solicitud**

- `data`

    > Lista JSON de hash de transacciones.

```text
{"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

```text
POST
/api/v2/txstatus/
```

**Respuesta**

- `results`

    > En el diccionario de datos, el hash de la transacción sirve como clave y los detalles de la transacción sirven como valor.
    >
    > `hash`
    >
    > > Transaction hash.
    > >
    > > - `blockid`
    > >
    > >     > Si la transacción se ejecuta correctamente, se devolverá el ID del bloque; si la transacción falla, *blockid* será [0]{.title-ref}.
    > >
    > > - `result`
    > >
    > >     > Devuelve el resultado de la transacción a través de la variable **\$result**.
    > >
    > > - `errmsg`
    > >
    > >     > Si la transacción no se ejecuta correctamente, devuelve un mensaje de texto de error.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{"results":
  {
    "hash1": {
         "blockid": "3123",
         "result": "",
     },
     "hash2": {
          "blockid": "3124",
          "result": "",
     }
   }
 }
```

**Respuesta de error**

*E_HASHWRONG, E_HASHNOTFOUND*

### txinfo/{hash} {#txinfo-hash}

Esta solicitud no requiere autorización de inicio de sesión.

**GET**/

Devolver información relacionada con la transacción para un hash especificado, incluyendo el ID del bloque y el número de confirmaciones. Si se especifican parámetros opcionales, también puede devolver el nombre del contrato inteligente y sus parámetros relacionados.

**Solicitud**

- `hash`

    > Transacción hash.

- `contractinfo` [Omitempty](#omitempty)

    > Identificación detallada de los parámetros del contrato inteligente. Para obtener detalles del contrato inteligente relacionados con esta transacción, se debe especificar `contractinfo=1`.

```text
GET
/api/v2/txinfo/c7ef367b494c7ce855f09aa3f1f2af7402535ea627fa615ebd63d437db5d0c8a?contractinfo=1
```

**Respuesta**

- `blockid`

    > Incluye el ID de bloque de la transacción. Si el valor es `0`, no se puede encontrar la transacción con ese hash.

- `confirm`

    > El número de confirmaciones para el bloque *blockid*.

- `data` [Omitempty](#omitempty)

    > Si se especifica `contentinfo=1`, los detalles del contrato inteligente se devolverán a ese parámetro.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "blockid": "9",
    "confirm": 11,
    "data": {
        "block": "9",
        "contract": "@1NewContract",
        "params": {
            "ApplicationId": 1,
            "Conditions": "true",
            "Value": "contract crashci4b {\n\t\t\tdata {}\n\t\t}"
        }
    }
}
```

**Respuesta de error**

*E_HASHWRONG*

### txinfoMultiple {#txinfomultiple}

Esta solicitud no requiere autorización de inicio de sesión.

**GET**/ 

Devolver información relacionada con la transacción para un hash especificado.

**Solicitud**

- `data`
    - `hashes`
    > Lista de hash de transacciones.

- `contractinfo` [Omitempty](#omitempty)

    > Identificación detallada de los parámetros del contrato inteligente. Para obtener detalles del contrato inteligente relacionados con esta transacción, se debe especificar `contractinfo=1`.

```text
data: {"hashes":["contract1hash", "contract2hash", "contract3hash"]}
```

```text
GET
/api/v2/txinfoMultiple
```

**Respuesta**

- `results`

    > En el diccionario de datos, el hash de la transacción sirve como clave y los detalles de la transacción sirven como valor.
    >
    > > `hash`
    > >
    > > > Transacción hash.
    > > >
    > > > `blockid`
    > > >
    > > > > Incluye el ID de bloque de la transacción. Si el valor es `0`, no se puede encontrar la transacción con ese hash.
    > > >
    > > > `confirm`
    > > >
    > > > > El número de confirmaciones para el bloque *blockid*.
    > > >
    > > > `data`
    > > >
    > > > > Si se especifica `contentinfo=1`, los detalles del contrato inteligente se devolverán a ese parámetro.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{"results":
  { 
    "hash1": {
         "blockid": "3123",
         "confirm": "5",
     },
     "hash2": {
          "blockid": "3124",
          "confirm": "3",
     }
   }
 }
```

**Respuesta de error**

*E_HASHWRONG*

### /page/validators_count/{name} {#page-validators-count-name}
Esta solicitud no requiere autorización de inicio de sesión.

**GET**

Devuelve el número de nodos de validación necesarios para acceder a la página especificada.

**Solicitud**

- `name`

    > Nombre de página con ID de ecosistema, en formato `@ecosystem_id%%page_name%`, por ejemplo `@1main_page`.
    
    > Si no se proporciona un ID de ecosistema, se buscará la página en el primer ecosistema.

```text
GET
/api/v2/page/validators_count/@2page_name
```

**Respuesta**

- `validate_count`

    > Número de nodos requeridos para la validación de la página especificada.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{"validate_count":1}
```

**Respuesta de error**

*E_NOTFOUND, E_SERVER*

### content/menu\|page/{name} {#content-menu-page-name}

[Authorization](#authorization)

**POST**

Devuelve el código del árbol de objetos JSON de la página o nombre de menú especificado, que es el resultado del procesamiento del motor de plantillas.

**Solicitud**

- `name`
    > Nombre de página o menú con ID de ecosistema, en formato `@ecosystem_id%%page_name%`, por ejemplo `@1main_page`.
    
    > Si no se proporciona un ID de ecosistema, se buscará la página o menú en el ecosistema actual.

```text
POST
/api/v2/content/page/default
```

**Respuesta**

- `menu` || `title`

    > Cuando se solicita *content/page/\...*, el nombre del menú al que pertenece la página.

- `menutree`

    > Cuando se solicita *content/page/\...*, se devuelve el árbol de objetos JSON del menú de la página.

- `title` --head for the menu *content/menu/\...*

    > Cuando se solicita *content/menu/\...*, se obtiene el título del menú.

- `tree`

    > Árbol de objetos JSON de página o menú.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "tree": {"type":"......", 
          "children": [
               {...},
               {...}
          ]
    },
}      
```

**Respuesta de error**

`E_NOTFOUND`

### content/source/{name} {#content-source-name}

[Authorization](#authorization)

**POST**

Devolver un árbol de objetos JSON de código para el nombre de página especificado. No se ejecutan funciones ni se reciben datos. El árbol de objetos JSON devuelto corresponde a la plantilla de página y se puede utilizar en el diseñador de páginas visual. Si no se encuentra la página, se devuelve un error 404.

**Solicitud**

- `name`

    > cosystem_id%%page_name%`, por ejemplo `@1main_page`.
    
    > Si no se proporciona un ID de ecosistema, se buscará la página en el ecosistema actual.

**Respuesta**

```text
POST
/api/v2/content/source/default
```

- `tree`

    > Árbol de objetos JSON de la página.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "tree": {"type":"......", 
          "children": [
               {...},
               {...}
          ]
    },
}      
```

**Respuesta de error**

*E_NOTFOUND, E_SERVER*


### content/hash/{name} {#content-hash-name}

**POST** 

Devuelva el hash SHA256 de la página especificada por su nombre. Si la página no se encuentra, se devolverá un error 404.

Esta solicitud no requiere autorización de inicio de sesión. Para recibir el hash correcto al hacer solicitudes a otros nodos, también debe pasar los parámetros *ecosystem, keyID, roleID*.

Para recibir una página de otros ecosistemas, debe agregar el prefijo del ID del ecosistema al nombre de la página. Por ejemplo: `@2mypage`.

**Solicitud**


```text
POST
/api/v2/content/hash/default
```
- `name`

    > Nombre de página con ID de sistema ecológico.

- `ecosystem`

    > ID del ecosistema.

- `keyID`

    > Dirección de cuenta.

- `roleID`

    > ID de personaje.


**Respuesta**

- `hash`

    > Hexadecimal hash value.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "hash": "b631b8c28761b5bf03c2cfbc2b49e4b6ade5a1c7e2f5b72a6323e50eae2a33c6"
}      
```

**Respuesta de error**

*E_NOTFOUND, E_SERVER, E_HEAVYPAGE*

### content {#content}

**POST**

La solicitud devuelve un objeto JSON que representa el código de la página a partir del parámetro **template**. Si se especifica el parámetro opcional **source** como `true` o `1`, el árbol de objetos JSON no ejecutará ninguna función ni recibirá datos. Este árbol de objetos JSON se puede utilizar en el diseñador de páginas visual.

Esta solicitud no requiere autorización de inicio de sesión.

**Solicitud**

- `template`

    > código de página.

- `source`

    > Si se especifica como `true` o `1`, el árbol de objetos JSON no ejecuta ninguna función ni recibe datos.

```text
POST
/api/v2/content
```

**Respuesta**

- `tree`

    > Objeto de árbol JSON.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "tree": {"type":"......", 
          "children": [
               {...},
               {...}
          ]
    },
}      
```

**Respuesta de error**

*E_NOTFOUND, E_SERVER*

### maxblockid {#maxblockid}

**GET**/ Devuelve el ID del bloque más alto en el nodo actual.

Esta solicitud no requiere autorización de inicio de sesión.

**Solicitud**

```text
GET
/api/v2/maxblockid
```

**Respuesta**

- `max_block_id`

    > ID del bloque más alto en el nodo actual.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "max_block_id" : 341,
}
```

**Respuesta de error**

*E_NOTFOUND*

### block/{id} {#block-id}

**GET**/ Devuelve información relacionada con el ID de bloque especificado.

Esta solicitud no requiere autorización de inicio de sesión.

**Solicitud**

- `id`

    > Identificador de bloque.

```text
POST
/api/v2/block/32
```

**Respuesta**

- `hash`

    > Valor hash del bloque.

- `key_id`

    > Dirección de cuenta que firmó el bloque.

- `time`

    > Marca de tiempo de generación de bloque.

- `tx_count`

    > El número total de transacciones dentro de este bloque.

- `rollbacks_hash`

    > Hash de reversión de bloques.

- `node_position`

    > El bloque se encuentra en la posición de la lista de Nodos de Honor. 

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "hash": "1x4S5s/zNUTopP2YK43SppEyvT2O4DW5OHSpQfp5Tek=",
    "key_id": -118432674655542910,
    "time": 1551145365,
    "tx_count": 3,
    "rollbacks_hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "node_position": 0,
}      
```

**Respuesta de error**

*E_NOTFOUND*

### avatar/{ecosystem}/{member} {#avatar-ecosystem-member}

**GET**/ Devuelve el avatar del usuario en la tabla *member* (se puede usar sin iniciar sesión).

**Solicitud**

- `ecosystem`

    > ID del sistema ecológico.

- `member`

    > Dirección de cuenta del usuario. (xxxx-...-xxxx)

```text
GET
/api/v2/avatar/1/1234-2134-...-4321
```

**Respuesta**

El encabezado de solicitud *Content-Type* es para el tipo de imagen, y los datos de la imagen se devuelven en el cuerpo de la respuesta.

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: image/png  
```

**Respuesta de error**

*E_NOTFOUND* *E_SERVER*

### config/centrifugo {#config-centrifugo}

**GET**/ Devuelve la dirección y el puerto del host de Centrifugo.

Esta solicitud no requiere autorización de inicio de sesión.

**Solicitud**

```text
GET
/api/v2/config/centrifugo
```

**Respuesta**

El formato de respuesta es `http://dirección:puerto`, por ejemplo: `http://127.0.0.1:8100`.

**Respuesta de error**

*E_SERVER*

### updnotificator {#updnotificator}

**POST**/

(obsoleto)

Envía todos los mensajes que no han sido enviados al servicio de notificación de centrífugo. Solo envíe mensajes para ecosistemas y miembros específicos.

Esta solicitud no requiere autorización de inicio de sesión.

**Solicitud**

- `id`

    > Dirección de cuenta del miembro.

- `ecosystem`

    > ID del ecosistema.

```text
POST
/api/v2/updnotificator
```

**Ejemplo de respuesta**

```text
200 (OK)
Content-Type: application/json
{
    "result": true
}      
```


### Entendido, ¿en qué puedo ayudarte? {#special-instructions}

#### Omitempty {#omitempty}
Si un campo tiene la propiedad "omitempty", significa que ese campo es un parámetro opcional.

#### Authorization {#authorization}
Si la interfaz tiene una etiqueta de Authorization, significa que esta interfaz requiere autorización de inicio de sesión. Agregue Authorization en la cabecera de la solicitud. Ejemplo:

key = Authorization
value = "Bearer +[login token](#login)"

```text
    Authorization   Bearer eyJhbGciOiJI.....kBZgGIlPhfXNZJ73RiZtM
```
