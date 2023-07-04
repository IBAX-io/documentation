# Interfaz de programación de aplicaciones JSON-RPC {#json-rpc-application-programming-interface}

Para que las aplicaciones de software interactúen con la cadena de bloques IBAX (obtener datos de bloques o enviar transacciones a la red), deben conectarse a un nodo de red de IBAX.

Debido a la universalidad y escalabilidad de la interfaz de programación de aplicaciones REST API original, se vuelve cada vez más compleja a medida que se agregan más interfaces y se utilizan diferentes clientes. Nos dimos cuenta de la importancia de la unificación de la interfaz para garantizar que todos los clientes puedan utilizar el mismo conjunto de especificaciones, independientemente de cómo se implementen los nodos y los clientes específicos.

JSON-RPC es un protocolo de llamada a procedimiento remoto (RPC) sin estado y ligero. Define algunas estructuras de datos y sus reglas de procesamiento. Es independiente del transporte, ya que estos conceptos se pueden utilizar en el mismo proceso, a través de una interfaz, el protocolo de transferencia de hipertexto o muchos entornos de mensajería diferentes. Utiliza JSON (RFC 4627) como formato de datos.

JSON-RPC es compatible con la mayoría de las interfaces de programación de aplicaciones REST API y conserva la interfaz de programación de aplicaciones REST API original. Los clientes que utilizan la interfaz de programación de aplicaciones REST API pueden cambiar fácilmente a la interfaz de programación de aplicaciones JSON-RPC. Algunas interfaces son:

- [/data/{id}/data/{hash}](api2.md#data-id-data-hash)
- [/data/{table}/id/{column}/{hash}](api2.md#data-table-id-column-hash)
- [avatar/{ecosystem}/{member}](api2.md#avatar-ecosystem-member)

Puede obtenerlo a través de la interfaz de API REST.

## Implementación del cliente {#client-side-implementation}

Cada cliente puede utilizar diferentes lenguajes de programación al ejecutar la especificación JSON-RPC. Puede utilizar [GO-SDK](https://github.com/IBAX-io/go-ibax-sdk).


## Ejemplo de Curl {#curl-example}

A continuación se proporciona un ejemplo de cómo utilizar la interfaz de aplicación JSON_RPC enviando una solicitud curl al nodo IBAX. Cada ejemplo incluye una descripción del punto final específico, sus parámetros, el tipo de retorno y un ejemplo de trabajo de cómo utilizarlo.

Las solicitudes de Curl pueden devolver mensajes de error relacionados con el tipo de contenido. Esto se debe a que la opción --data establece el tipo de contenido en application/x-www-form-urlencoded. Si tiene este problema en su solicitud, establezca manualmente el encabezado colocando -H "Content-Type: application/json" al comienzo de la llamada. Estos ejemplos tampoco incluyen la combinación de dirección web/protocolo e puerto, que debe ser el último parámetro de curl (por ejemplo, 127.0.0.1:7079). Una solicitud completa de curl que incluye estos datos adicionales se presenta en la siguiente forma:

``` text
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.maxBlockId","params":[],"id":1}' http://127.0.0.1:7079	
```

## Convenio {#covenant}

### Hexadecimal {#hex}

**Codificación hexadecimal**

Cuando se codifica una matriz de bytes, un hash o una matriz de bytes de código: se codifica en hexadecimal, con dos dígitos hexadecimales por byte.

### Tipo de solicitud {#request-type}

**Usar siempre**
- Content-Type: application/json

### Special Markers {#special-markers}
#### Omitempty {#omitempty}

Este campo es opcional.

Si hay varios campos `Omitempty` consecutivos, pero solo desea pasar el valor de un campo, debe dejar los campos no deseados vacíos (con un valor nulo para ese tipo de campo), por ejemplo:

- **id** - *Number* - [Omitempty](#omitempty) id
- **name** - *String* - [Omitempty](#omitempty) nombre
- **column** - *String* - [Omitempty](#omitempty) nombre de la columna de filtrado

Si solo se transmite el valor de "name", los parámetros de solicitud se transmiten de la siguiente manera:

    `"params":[0,"testname"]` - *Número* El valor vacío es 0

Si solo se transmite el valor de "column", los parámetros de solicitud se transmiten de la siguiente manera:

    `"params":[0,"","title,page"]` - *Cadena* El valor vacío es ""

#### Autorización {#authorization}
Encabezado de autorización, agregue el encabezado de autorización a la solicitud, ejemplo:

**name** : Authorization **value** : Bearer +[login token](#ibax-login)

Example:
```` text
    //request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ey...." -d '{"jsonrpc":"2.0","method":"ibax.getContractInfo","params":["@1TokensSend"],"id":1}' http://127.0.0.1:7079

````

#### AccountOrKeyId {#accountorkeyid}
Parámetro de dirección de cuenta, se pueden usar dos formatos de dirección, por ejemplo:
1. - *String* - Dirección de cuenta `"XXXX-XXXX-XXXX-XXXX-XXXX"` o ID de cuenta `"64842...538120"`

2. - *Object* - Objeto de dirección
    - **key_id** -  *Number* - ID de cuenta, por ejemplo: `{"key_id":-64842...38120}`
    - **account** - *String* - Dirección de cuenta, por ejemplo: `{"account":"1196-...-...-...-3496"}`

    **Si tanto la dirección de cuenta como el ID de cuenta están presentes, se utilizará primero el ID de cuenta**.

#### BlockOrHash {#blockorhash}
Altura del bloque o HASH del bloque, por ejemplo:

1. - *String* - Altura del bloque `"100"` o HASH del bloque `"4663aa47...a60753c18d9ba9cb4"`

2. - *Object* - Objeto de información del bloque
        - **id** -  *Number* - Altura del bloque, por ejemplo: `{"id":2}`
        - **hash** - *[Hex](#hex) String* - HASH del bloque, por ejemplo: `{"hash":"d36b8996c...c616d3043a0d02a0f59"}`
        
        **Solo se puede elegir una altura de bloque o un HASH de bloque**.

### Solicitudes en lote {#batch-requests}
Esta función se puede utilizar para reducir la latencia de la red, especialmente al obtener una gran cantidad de objetos de datos básicamente independientes.

A continuación se muestra un ejemplo de cómo obtener el bloque más alto y el número total de transacciones:
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '[{"jsonrpc":"2.0","method":"ibax.getTxCount","id":1,"params":[]},{"jsonrpc":"2.0","method":"ibax.maxBlockId","id":2,"params":[]}]' http://127.0.0.1:7079

    //Response
    [
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": 149100
        },
        {
            "jsonrpc": "2.0",
            "id": 2,
            "result": 797
        }
    ]
```


### Manejo de respuestas de error {#error-response-handling}

En caso de que la solicitud se ejecute correctamente, se devolverá el estado `200`.

Si ocurre un error, se devolverá un objeto JSON con los siguientes campos:

-   jsonrpc

    Identificador de error.

-   id

    Información de texto de error.

-   error
    - code

        Código de estado de respuesta
    - message

        Descripción del estado de respuesta

``` text
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32014,
        "message": "Unauthorized"
    }
}
```


## Espacios de nombres JSON-RPC {#json-rpc-namespaces}

### Espacio de nombres ibax {#ibax-namespace}

#### Interfaz de autenticación {#authentication-interface}
- [ibax.getuid](#ibax-getuid)
- [ibax.login](#ibax-login)
- [ibax.getAuthStatus](#ibax-getauthstatus)

#### Interfaz de comando del servidor {server-side-command-interface}
- [ibax.getVersion](#ibax-getversion)

#### Función de interfaz de solicitud de datos. {#data-request-function-interface}
- [ibax.getBalance](#ibax-getbalance)
- [ibax.getBlocksTxInfo](#ibax-getblockstxinfo)
- [ibax.detailedBlocks](#ibax-detailedblocks)
- [ibax.getKeyInfo](#ibax-getkeyinfo)
- [ibax.detailedBlock](#ibax-detailedblock)

#### Obtener la interfaz de indicadores. {#get-metrics-interface}
- [ibax.maxBlockId](#ibax-maxblockid)
- [ibax.getKeysCount](#ibax-getkeyscount)
- [ibax.getTxCount](#ibax-gettxcount)
- [ibax.getTransactionCount](#ibax-gettransactioncount)
- [ibax.getBlocksCountByNode](#ibax-getblockscountbynode)
- [ibax.honorNodesCount](#ibax-honornodescount)
- [ibax.getEcosystemCount](#ibax-getecosystemcount)

#### Interfaz del ecosistema. {#ecosystem-interface}
- [ibax.ecosystemInfo](#ibax-ecosysteminfo)
- [ibax.appParams](#ibax-appparams)
- [ibax.getEcosystemParams](#ibax-getecosystemparams)
- [ibax.getTableCount](#ibax-gettablecount)
- [ibax.getTable](#ibax-gettable)
- [ibax.getList](#ibax-getlist)
- [ibax.getSections](#ibax-getsections)
- [ibax.getRow](#ibax-getrow)
- [ibax.systemParams](#ibax-systemparams)
- [ibax.history](#ibax-history)
- [ibax.getPageRow](#ibax-getpagerow)
- [ibax.getMenuRow](#ibax-getmenurow)
- [ibax.getSnippetRow](#ibax-getsnippetrow)
- [ibax.getAppContent](#ibax-getappcontent)
- [ibax.getMember](#ibax-getmember)

#### Interfaz de funciones de contratos inteligentes. {#contract-function-interface}
- [ibax.getContracts](#ibax-getcontracts)
- [ibax.getContractInfo](#ibax-getcontractinfo)
- [ibax.sendTx](#ibax-sendtx)
- [ibax.txStatus](#ibax-txstatus)
- [ibax.txInfo](#ibax-txinfo)
- [ibax.txInfoMultiple](#ibax-txinfomultiple)
- [ibax.getPageValidatorsCount](#ibax-getpagevalidatorscount)
- [ibax.getPage](#ibax-getpage)
- [ibax.getMenu](#ibax-getmenu)
- [ibax.getSource](#ibax-getsource)
- [ibax.getPageHash](#ibax-getpagehash)
- [ibax.getContent](#ibax-getcontent)
- [ibax.getBlockInfo](#ibax-getblockinfo)
- [ibax.getConfig](#ibax-getconfig)

### Espacio de nombres net {#net-namespace}
- [net.getNetwork](#net-getnetwork)
- [net.status](#net-status)

### Espacio de nombres rpc {#rpc-namespace}
- [rpc.modules](#rpc-modules)

### Espacio de nombres de administrador {#admin-namespace}
- [admin.startJsonRpc](#admin-startjsonrpc)
- [admin.stopJsonRpc](#admin-stopjsonrpc)


### Espacio de nombres de depuración {#debug-namespace}
- [debug.getNodeBanStat](#debug-getnodebanstat)
- [debug.getMemStat](#debug-getmemstat)
 


## Métodos de interfaz JSON-RPC {#json-rpc-interface-methods}

### **ibax.getUid** {#ibax-getuid}

[Autorización](#authorization) [Omitempty](#omitempty)

Para generar un token JWT temporal, necesitas pasar el token a **[login](#ibax.login)** cuando lo llames.

[**Authorization**](#authorization)

**Parámetros**
- ninguno

**Return Value**

- **uid** - *String* - Número de firma.

- **token** - *String* - Token temporal pasado durante el inicio de sesión (la vida útil del token temporal es de 5 segundos).

- **network_id** - *String* - Identificador de red.

- **cryptoer** - *String* - Algoritmo de curva elíptica.

- **hasher** - *String* - Algoritmo de hash.

Si la solicitud contiene [Autorización](#authorization) y no requiere autorización, se devolverá la siguiente información:

- **expire** - *String* - Tiempo de expiración.

- **ecosystem** - *String* - ID de ecosistema.

- **key_id** - *String* - Dirección de cuenta.

- **address** - *String* - Dirección de billetera `XXXX-XXXX-XXXX-XXXX-XXXX`.

- **network_id** - *String* - Identificador de red.

**Ejemplo**
```text
    //Request1
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getUid","params":[],"id":1}' http://127.0.0.1:7079

    //Response1
     {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "uid": "5823391950439015186",
            "token": "ey....",
            "network_id": "1",
            "cryptoer": "ECC_Secp256k1",
            "hasher": "KECCAK256"
        }
    }

    //Request2
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ey...." -d '{"jsonrpc":"2.0","method":"ibax.getUid","params":[],"id":1}' http://127.0.0.1:7079

    //Response2
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "expire": "7h59m49.5361126s",
            "ecosystem_id": "1",
            "key_id": "6667782293976713160",
            "address": "0666-7782-2939-7671-3160",
            "network_id": "1",
            "cryptoer": "ECC_Secp256k1",
            "hasher": "KECCAK256"
        }
    }
```

### **ibax.login** {#ibax-login}
Autenticación de usuario. [Autorización](#authorization)

Debe llamar primero al comando [**ibax.getUid**](#ibax-getuid) para recibir un valor único y firmarlo.
El token JWT temporal de getuid debe transmitirse en el encabezado de la solicitud.
Si la solicitud es exitosa, el token recibido en la respuesta se incluye en [**Autorización**](#authorization).

**Parámetros**

*Object* - Objeto de llamada de autenticación de identidad.
- **ecosystem_id** - *Number* - Ecological system ID. Si no se especifica, se utilizará el ID del primer sistema ecológico por defecto.

- **expire** - *Number* - El ciclo de vida del token JWT, en segundos, es de forma predeterminada 28800, es decir, 8 horas.

- **public_key** - *[Hex](#hex) String* - Clave pública de cuenta en hexadecimal.

- **key_id** - *String* -
    > Dirección de cuenta `XXXX-...-XXXX`.
    >
    > Use este parámetro cuando la clave pública ya esté almacenada en la cadena de bloques. No se puede usar junto con el parámetro *pubkey*.

- **signature** - *String* -
    > Firmar el UID recibido por getuid con la clave privada.
    > 
    > Contenido de los datos firmados: LOGIN+{$network_id}+uid.

- **role_id** - *Number* - Role ID, role default 0.


**Return value**
*Object* - Asunto de verificación de identidad.
- **token** - *String* - Token JWT.

- **ecosystem_id** - *String* - ID del ecosistema.

- **key_id** - *String* - ID de dirección de cuenta.

- **account** - *String* - Dirección de la billetera `XXXX-XXXX-XXXX-XXXX-XXXX`.

- **notify_key** - *String* - ID de notificación.

- **isnode** - *Bool* - ¿Es esta la dirección de cuenta del propietario de este nodo? Valor: `true`,`false`.

- **isowner** - *Bool* - ¿Es esta dirección de cuenta el creador del sistema ecológico? Valor: `true`,`false`.

- **clb** - *Bool* - El sistema de inicio de sesión es CLB. Valor: `true`,`false`。

- **timestamp** - *String* - El sello de tiempo actual.

- **roles** - *Array* Listado de personajes, si no hay personajes, el campo es `nil`.
    - **role_id** - *Number* - ID de personaje.
    - **role_name** - *String* - Nombre del personaje.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.login","params":[{"ecosystem_id":1,"public_key":"04....","signature","46...","role_id":0}],"id":1}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "token": "ey...",
            "ecosystem_id": "1",
            "key_id": "6660819716178795186",
            "account": "0666-xxxx-xxxx-xxxx-5186",
            "notify_key": "ey....",
            "isnode": false,
            "isowner": false,
            "clb": false,
            "timestamp": "1678336163",
            "roles": nil //[{"role_id": 1, "role_name": "Developer"},{"role_id": 2, "role_name": "DevelopGovernancerer"}]
        }
    }
```

### **ibax.getAuthStatus** {#ibax-getauthstatus}
Estado de autenticación de identidad del usuario.
[Autorización](#authorization)

**Parámetros**
- ninguno

**Valor de retorno**
*Object* - Estado del objeto de autenticación de identidad.
- **active** - *Bool* - Estado de autenticación de usuario actual, valor: `true,false`。

- **exp** - *Number* - [Omitempty](#omitempty) Fecha de vencimiento del token en formato de marca de tiempo.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getAuthStatus","id":1}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "active": true,
            "exp": 1678354136
        }
    }
```

### **ibax.getVersion** {#ibax-getversion}
Devuelve la versión actual del servidor.

**Parámetros**
- ninguno

**Valor de retorno**
- **vesion** - *String* - Versión(`big Version` + `branch name` + `git commit` + `time` + `node status`)。

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getVersion","id":1}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": "1.3.0 branch.main commit.b57d4194 time.2023-03-08-09:30:29(UTC) node server status is running"
    }
```

### **ibax.getBalance** {#ibax-getbalance}
Obtener el saldo de la dirección de la cuenta.

**Parámetros**

- **key_id or account** - *[AccountOrKeyId](#accountorkeyid)* - Dirección de cuenta `XXXX-XXXX-XXXX-XXXX-XXXX` o ID de cuenta.

- **ecosystem_id** - *Number* - Identificación del sistema de ecosistema [Omitempty](#omitempty) 默认生态1。

**Valor de retorno**
*Object* - Obtener objeto de saldo.
- **amount** - *String* - El saldo de la cuenta del contrato inteligente de la unidad mínima.

- **total** - *String* - El saldo total de la cuenta de la unidad mínima. (amount + utxo)。

- **utxo** - *String* - El saldo de la cuenta UTXO es la cantidad mínima de unidades.

- **digits** - *Number* - Precisión.

- **token_symbol** - *String* - Símbolo del token.

**Ejemplo**
```text
    //Request1
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBalance","id":1,"params":["648...8120"]}' http://127.0.0.1:7079

    //Request2
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBalance","id":1,"params":["1196-...-...-...-3496",1]}' http://127.0.0.1:7079

    //Request3
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBalance","id":1,"params":[{"key_id":{$key_id}},1]}' http://127.0.0.1:7079 //keyId or account

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "amount": "9915319240441612",
            "digits": 12,
            "total": "9915319240441612",
            "utxo": "0",
            "token_symbol": "IBXC"
        }
    }
```


### **ibax.getBlocksTxInfo** {#ibax-getblockstxinfo}

Devuelve una lista de información adicional relevante para las transacciones en cada bloque.

(Nota: Esta traducción puede no ser precisa sin más contexto.)

**Parámetros**

- **block_id** - *Number* - Altura del bloque de inicio a consultar.

- **count** - *Number* - Número de bloques, por defecto es 25, con un máximo de 100 solicitudes.

**Valor de retorno**
*Object* - Obtener el objeto de información del bloque.

- **block_id** - *String* - Altura del bloque.
- Lista de transacciones en el bloque y la información adicional de cada transacción:
    
    - **hash** - *[Hex](#hex) String* - Hash de transacción.

    - **contract_name** - *String* -  Nombre del contrato inteligente.

    - **params** - *Object* - Parámetros de contrato inteligente, los campos de contrato inteligente se pueden consultar a través de [ibax.getContractInfo](#ibax-getcontractinfo).

    - **key_id** - *Number* -
        Para el primer bloque, es la dirección de cuenta del primer bloque que firma la transacción.

Para todos los demás bloques, es la dirección de cuenta que firma la transacción.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBlocksTxInfo","id":1,"params":[1,2]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "1": [ //block_id
                {
                    "hash": "uXSaSrMWlbHpNlu049J5BDypC6MzBQ0/5VEfGQf+5aQ=",
                    "contract_name": "",
                    "params": null,
                    "key_id": 6667782293976713160
                }
            ],
            "2": [ //block_id
                {
                    "hash": "r8U9IKjtZ5Be5D4ak3zxLlDwn36CTdfIAsVvQhx7P3w=",
                    "contract_name": "@1NewUser",
                    "params": {
                        "Ecosystem": 1,
                        "NewPubkey": "d11ea197fe23152562c6f54c46335d9093f245ab5d22b13ff3e0e2132dc9ff38da77aa093945280c4cf5ad9e889c074dfd9080099982d8b2d4d100315e1cebc7"
                    },
                    "key_id": 6667782293976713160
                }
            ]
        }
    }
```


### **ibax.detailedBlocks** {#ibax-detailedblocks}
Devuelve una lista que contiene información adicional detallada sobre las transacciones en cada bloque.

**Parámetros**
- **block_id** - *Number* - Altura del bloque de inicio a consultar.

- **count** - *Number* - Número de bloques, por defecto es 25, con un máximo de 100 solicitudes.


**Valor de retorno**
*Object* - Obtener el objeto de detalles del bloque.
- **block_id** - *String* - Altura del bloque.
    - **header** - *Object* - Encabezado de bloque. El encabezado de bloque contiene los siguientes campos:
        - **block_id** - *Number*- Altura del bloque.
        - **time** - *Number* - Marca de tiempo de generación de bloque.
        - **key_id** - *Number* - La dirección de cuenta que firmó el bloque.
        - **node_position** - *Number* - La posición del nodo que genera el bloque en la lista de nodos de nodo de honor.
        - **version** - *Number* - Versión de estructura de bloques.
    - **hash** - *[Hex](#hex) String* - Hash de bloque.
    - **node_position** - *Number* - En la lista de nodos de nodo de honor, se genera la posición del nodo que crea el bloque.
    - **key_id** - *Number* - Dirección de la cuenta que firma el bloque.
    - **time** - *Number* - Marca de tiempo de generación del bloque.
    - **tx_count** - *Number* - Número de transacciones en el bloque.
    - **size** - *String* - Tamaño del bloque.
    - **rollback_hash** - *[Hex](#hex) String* - El valor hash de la reversión de bloque.
    - **merkle_root** - *[Hex](#hex) String* - El árbol de Merkle de las transacciones del bloque.
    - **bin_data** - *[Hex](#hex) String* - Encabezado de bloque.todas las transacciones dentro del bloque, el hash del bloque anterior y la serialización de la clave privada del nodo que generó este bloque.
    -  **transactions** - *Object* - Transacciones. Lista de transacciones en el bloque y la información adicional de cada transacción:
        - **hash** - *[Hex](#hex) String* - Hash de transacción.
        - **contract_name** - *String* - Nombre del contrato inteligente.
        - **params** - *Object* - Parámetros de contrato inteligente, los campos de contrato inteligente se pueden consultar a través de [ibax.getContractInfo](#ibax-getcontractinfo).
        - **key_id** - *Number* - La dirección de la cuenta que firmó la transacción.
        - **time** - *Number* - Timestamp de generación de la transacción (unidad: ms).
        - **type** - *Number* - Tipo de transacción.   
        - **size** - *String* - Tamaño de la transacción.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlocks","id":1,"params":[1,2]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "1": { //block id
                "header": {
                    "block_id": 1,
                    "time": 1676512422,
                    "key_id": 6667782293976713160,
                    "node_position": 0,
                    "version": 3
                },
                "hash": "0d7d51b4c14bacbf45d812f73497ede8f22d678bc4be6e6848193f3b7262ac91",
                "node_position": 0,
                "key_id": 6667782293976713160,
                "time": 1676512422,
                "tx_count": 1,
                "size": "660.00B",
                "rollbacks_hash": "1a829923f2c9b1e259fdfb42cc1bc255e144dbfb352af7e072d0b9d61a94df15",
                "merkle_root": "36373332663064383331353264316333653639346431656436383734373634363463616363616564636632353232646335633736643066623737343931366363",
                "bin_data": "Cp4BCAEQppm...",
                "stop_count": 0,
                "transactions": [
                    {
                        "hash": "b9749a4ab31695b1e9365bb4e3d279043ca90ba333050d3fe5511f1907fee5a4",
                        "contract_name": "",
                        "params": null,
                        "key_id": 6667782293976713160,
                        "time": 1676512422406,
                        "type": 1,
                        "size": "250.00B"
                    }
                ]
            },
            "2": { //block id
                "header": {
                    "block_id": 2,
                    "time": 1676536235,
                    "key_id": 6667782293976713160,
                    "node_position": 0,
                    "version": 3
                },
                "hash": "dd13a30661d35e01df82027a6e6607eb47ee00765d69767dbb99e151676c2c96",
                "node_position": 0,
                "key_id": 6667782293976713160,
                "time": 1676536235,
                "tx_count": 1,
                "size": "1.53KiB",
                "rollbacks_hash": "9041312d69e6bcd37c91a2bfa066abaeb53b8398708937a618a89960bfadab3d",
                "merkle_root": "65366537383931353662613230356565396466353061316538656538643636323332316636616265623764633539616166346635343030383135386538643130",
                "bin_data": "Cp4BCAIQq9O...",
                "stop_count": 0,
                "transactions": [
                    {
                        "hash": "afc53d20a8ed67905ee43e1a937cf12e50f09f7e824dd7c802c56f421c7b3f7c",
                        "contract_name": "@1NewUser",
                        "params": {
                            "Ecosystem": 1,
                            "NewPubkey": "d11ea197fe23152562c6f54c46335d9093f245ab5d22b13ff3e0e2132dc9ff38da77aa093945280c4cf5ad9e889c074dfd9080099982d8b2d4d100315e1cebc7"
                        },
                        "key_id": 6667782293976713160,
                        "time": 1676536233945,
                        "type": 3,
                        "size": "390.00B"
                    }
                ]
            }
        }
    }
```


### **ibax.getKeyInfo** {#ibax-getkeyinfo}
Devuelve una lista de ecosistemas que contiene roles registrados con la dirección especificada.

**Parámetros**
- **account** - *String* - Dirección de cuenta.

**Valor de retorno**
*Object* - Lista de objetos de ecosistema de dirección especificada.
- **account** - *String* - Dirección de cuenta.
- **ecosystems** - *Array* - Lista de Ecosistemas.
    - **ecosystem** - *String* - ID del ecosistema.
    - **name** - *String* - Nombre del ecosistema.
    - **digits** - *Number* - Precisión.
    - **roles** - *Array* - Lista de personajes.
        - **id** - *String* - ID de personaje.
        - **name** - *String* - Nombre del personaje.

 
**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getKeyInfo","id":1,"params":["0666-XXXX-XXXX-XXXX-5186"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "account": "0666-XXXX-XXXX-XXXX-5186",
            "ecosystems": [
                {
                    "ecosystem": "1",
                    "name": "platform ecosystem",
                    "digits": 12,
                    "roles": [
                        {
                            "id": "1",
                            "name": "Developer"
                        },
                        {
                            "id": "2",
                            "name": "Governancer"
                        }
                    ]
                }
            ]
        }
    }
```

### **ibax.detailedBlock** {#ibax-detailedblock}
Return a detailed list of additional information for transactions in a block.

**Parámetros**
- **Block or Hash** - *[BlockOrHash](#blockorhash)* - Altura del bloque o Hash del bloque.

**Valor de retorno**
*Object* - Obtener el objeto de detalles del bloque.
- **header** - *Object* - Block header. El encabezado de bloque contiene los siguientes campos:
    - **block_id** - *Number*- Altura del bloque.
    - **time** - *Number* - Marca de tiempo de generación de bloque.
    - **key_id** - *Number* - La dirección de cuenta que firmó el bloque.
    - **node_position** - *Number* - La posición del nodo que genera el bloque en la lista de nodos de nodo de honor.
    - **version** - *Number* - Versión de estructura de bloques.

- **hash** - *[Hex](#hex) String* - Hash de bloque.
- **node_position** - *Number* - La posición del nodo que genera el bloque en la lista de nodos de nodo de honor.
- **key_id** - *Number* - Dirección de cuenta que firmó el bloque.
- **time** - *Number* - Marca de tiempo de generación de bloque.
- **tx_count** - *Number* - El número de transacciones dentro de este bloque.
- **size** - *String* - El tamaño del bloque.
- **rollback_hash** - *[Hex](#hex) String* - Hash de reversión de bloque.
- **merkle_root** - *[Hex](#hex) String* - Árbol de Merkle de las transacciones de este bloque.
- **bin_data** - *[Hex](#hex) String* - Block header, todas las transacciones dentro del bloque, el hash del bloque anterior y la serialización de la clave privada del nodo que generó este bloque.
-  **transactions** - *Array* - Transacciones. Lista de transacciones en el bloque y la información adicional de cada transacción:
    - **hash** - *[Hex](#hex) String* - Hash de transacción.
    - **contract_name** - *String* - Nombre del contrato inteligente.
    - **params** - *Object* - Parámetros de contrato inteligente, los campos de contrato inteligente se pueden consultar a través de [ibax.getContractInfo](#ibax-getcontractinfo).
    - **key_id** - *Number* - - **address** - *String* - Dirección de la cuenta que firmó la transacción.
- **time** - *Number* - Marca de tiempo de generación de la transacción (unidad: ms).
- **type** - *Number* - Tipo de transacción.
- **size** - *String* - Tamaño de la transacción.

**Ejemplo**
```text
    //Request1
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlock","id":1,"params":["1"]}' http://127.0.0.1:7079

    //Request2
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlock","id":1,"params":["0d7d51b4c14bacbf45d812f7349...e6e6848193f3b7262ac91"]}' http://127.0.0.1:7079

    //Request3
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.detailedBlock","id":1,"params":[{"id":1}]}' http://127.0.0.1:7079


    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "header": {
                "block_id": 1,
                "time": 1676512422,
                "key_id": 6667782293976713160,
                "node_position": 0,
                "version": 3
            },
            "hash": "0d7d51b4c14bacbf45d812f7349...e6e6848193f3b7262ac91",
            "node_position": 0,
            "key_id": 6667782293976713160,
            "time": 1676512422,
            "tx_count": 1,
            "size": "660.00B",
            "rollbacks_hash": "1a829923f2c9b1e259fdfb42cc1bc255e144dbfb352af7e072d0b9d61a94df15",
            "merkle_root": "3637333266306438333135...623737343931366363",
            "bin_data": "Cp4BCAEQppm2nwYgyI/8gLSVrsRcMkAFGTK6nxD86hfhgQX0dWzO8aYZExDN9UPm8sKkqeUbwrNliYuCJHvvdX+txINnM7+gDqtMF/1K43kc0gYC0u8uOiANfVG0wUusv0XYEvc0l+3o8i1ni8S+bmhIGT87cmKskUIgBEhSsqZwreVAfnj7KGPFHen8uWVCoHGG/jrtpruKEW1IA1ABYAESRDogQBBdW8EBBcF/1yuTqPczaeLubu5NRxS3v3vzwvFW5gFCIARIUrKmcK3lQH54+yhjxR3p/LllQqBxhv467aa7ihFtGkA2NzMyZjBkODMxNTJkMWMzZTY5NGQxZWQ2ODc0NzY0NjRjYWNjYWVkY2YyNTIyZGM1Yzc2ZDBmYjc3NDkxNmNjKugCeJxibFvmk5+enlp0YK1LUkhRYl5xYnJJZn7egSUuiSWJ7Uu9Uys9XS7HdOxY7SDPfmJJSGZu6mUGBgaG5Lc9y1YGlCblZCZ7p1YecejvOPzyp63tWeYpWS+nxBTv3biTOUTqg7vfgedPuXdbnjsmYX49a9mXA025NT4TbjQ65bQwbloQcjbQRG3ZudjjUxuL1/rlp6QimTfLcZNH0o/bie/SfiskTNm1tPrfmrrlbdfMklamXHR53XpxwSODSb1hX3Kvyb1fU+awbZVG8yaXmGqtO3wR8jPsP6y7vTW4JL/AL7WkPL8o2zm1qMSpNC8lJ/XAkpDU4hKwBxgYGBg3BhRlliWWpDrl5CdnJ2ckZuadh0oxrAT5tLgkMbfgMgMDY1v42yy2ZSEVHonFGUcUdpbM8tosNnXjS7PoLY8vVbLYrORebMzKa/80UF6S/d/TJcsDEitz8hNTjvwaueEHCAAA//+pZRGv",
            "stop_count": 0,
            "transactions": [
                {
                    "hash": "b9749a4ab31695b1e9365bb4e3d279043ca90ba333050d3fe5511f1907fee5a4",
                    "contract_name": "",
                    "params": null,
                    "key_id": 6667782293976713160,
                    "time": 1676512422406,
                    "type": 1,
                    "size": "250.00B"
                }
            ]
        }
    }
```

### **ibax.maxBlockId** {#ibax-maxblockid}
Obtener el ID del bloque más alto en el nodo actual.

**Parámetros**
- ninguno

**Valor de retorno**
- *Number* - El bloque más alto en el nodo actual.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.maxBlockId","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 774
    }
```


### **ibax.getKeysCount** {#ibax-getkeyscount}
Obtener el número total de direcciones en el nodo actual.

**Parámetros**
- ninguno

**Valor de retorno**
- **Count** - *Number* - Número total de direcciones.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getKeysCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 11
    }
```


### **ibax.getTxCount** {#ibax-gettxcount}
Obtener el número total de transacciones en el nodo actual.

**Parámetros**
- ninguno

**Valor de retorno**
- **Count** - *Number* - Número total de transacciones.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getTxCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 149068
    }
```


### **ibax.getTransactionCount** {#ibax-gettransactioncount}
Obtener el número de transacciones de un bloque.

**Parámetros**
- **block or hash**  - *[BlockOrHash](#blockorhash)* - Altura del bloque o Hash del bloque.

**Valor de retorno**
- **Count** - *Number* - Cantidad total de bloques.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getTransactionCount","id":1,"params":["efc386f7573269610a34af9cc722f775cca8183ccaa0ed7a96db61ef0bde6d1c"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 337
    }
```


### **ibax.getBlocksCountByNode** {#ibax-getblockscountbynode}
Obtener la posición del nodo y el número de bloques empaquetados.

**Parámetros**
- **nodePosition** - *Number* - Nodo índice.

- **consensusMode** - *Number* - Modo de consenso, parámetros (1: modo de gestión del creador; 2: modo de gobernanza DAO).

**Valor de retorno**
*Object* - Obtener el índice del nodo y empaquetar el objeto de cantidad.
- **total_count** - *Number* - Número total de bloques.

- **partial_count** - *Number* - Número de bloques empaquetados en el índice del nodo.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBlocksCountByNode","id":1,"params":[0,1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "total_count": 774,
            "partial_count": 774
        }
    }
```


### **ibax.honorNodesCount** {#ibax-honornodescount}
Obtener la cantidad de nodos de honor.

**Parámetros**
- ninguno

**Valor de retorno**
- **Count** - *Number* - Número de nodos.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.honorNodesCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 1
    }
```


### **ibax.getEcosystemCount** {#ibax-getecosystemcount}
Obtener la cantidad de ecosistemas.

**Parámetros**
- ninguno

**Valor de retorno**
- **Count** - *Number* - Número de ecosistemas.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getEcosystemCount","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": 2
    }
```




### **ibax.ecosystemInfo** {#ibax-ecosysteminfo}
Obtener información sobre el ecosistema.

**Parámetros**
- **ecosystem id** - *Number* - Identificación del ecosistema.

**Valor de retorno**
- **id** - *Number* - Identificación del ecosistema.
- **name** - *String* - Nombre del ecosistema.
- **digits** - *Number* - Precisión.
- **token_symbol** - *String* - Símbolo del token.
- **token_name** - *String* - Nombre del token.
- **total_amount** - *String* - Cantidad de emisión (cantidad de emisión inicial, si no se ha emitido, es `"0"`).
- **is_withdraw** - *Bool* - puede ser destruido `true `: destruible, `false`: no destruible。
- **withdraw** - *String* - Cantidad destruida（`"0"` si no se puede destruir o no se destruye）。
- **is_emission** - *Bool* - Se puede emitir adicionalmente `true`: se puede emitir más acciones; `fales`: no se puede emitir más acciones.。
- **emission** - *String* - Monto de emisión adicional ("0"` si no hay emisión adicional, o si no hay emisión adicional)。
- **introduction** - *String* - Introducción al ecosistema.
- **logo** - *Number* - Identificación del logotipo del ecosistema (correspondiente a la identificación de la tabla binaria), que se puede obtener a través de la API RESTFUL.
- **creator** - *String* - Creador de ecosistemas.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.ecosystemInfo","id":1,"params":[1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 2,
        "result": {
            "id": 5,
            "name": "test name",
            "digits": 6,
            "token_symbol": "test",
            "token_name": "test Coin",
            "total_amount": "10000",
            "is_withdraw": true,
            "withdraw": "100000000000900000",
            "is_emission": true,
            "emission": "100000000001000000",
            "introduction": "this is a test introduction",
            "logo": 6,
            "creator": "0666-0819-7161-7879-5186"
        }
    }
```


### **ibax.appParams** {#ibax-appparams}
Devolver la lista de parámetros de aplicación en el ecosistema actual o especificado.

[Autorización](#authorization)

**Parámetros**
- **appid** - *Number* - Identificación de la aplicación.

- **ecosystem** - *Number* - [Omitempty](#omitempty) - ID del ecosistema.

    Si no se especifica o se establece en 0, devolverá los parámetros del ecosistema actual.

- **names** - *String* - [Omitempty](#omitempty) - Filtrar nombres de parámetros de la aplicación.
    
    Lista de nombres separados por comas, por ejemplo: `name1, name2`.

- **offset** - *Number* - [Omitempty](#omitempty) Offset, por defecto es 0.

- **limit** - *Number* [Omitempty](#omitempty) Número de entradas, por defecto 10 entradas, máximo 100 entradas.
 
**Valor de retorno**

*Array* - Lista de parámetros de la aplicación.
- **app_id** - *Number* - Identificación de la aplicación.
- **list** - *Number* - Cada elemento en el arreglo contiene los siguientes parámetros.
    - **id** - *String* - Parameter ID, único.
    - **name** - *String* - Nombre del parámetro.
    - **value** - *String* - Valor del parámetro.
    - **conditions** - *String* - Cambiar los permisos de los parámetros.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.appParams","id":1,"params":[1,1,"role_developer,role_governancer"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "app_id": 1,
            "list": [
                {
                    "id": "4",
                    "name": "role_developer",
                    "value": "1",
                    "conditions": "ContractConditions(\"MainCondition\")"
                },
                {
                    "id": "5",
                    "name": "role_governancer",
                    "value": "2",
                    "conditions": "ContractConditions(\"MainCondition\")"
                }
            ]
        }
    }
```


### **ibax.getEcosystemParams** {#ibax-getecosystemparams}
Obtener la lista de parámetros del ecosistema.

[Autorización](#authorization)

**Parámetros**
- **ecosystem** - *Number* - [Omitempty](#omitempty) - ID del ecosistema.
    
    If it is 0 or there is no such parameter, the default is: the current ecological ID.

- **names** - *String* - [Omitempty](#omitempty) - Nombre de parámetros de filtrado.

Lista de nombres separados por comas, por ejemplo: `name1, name2`.

Cuando hay parámetros de filtrado, los parámetros *offset* y *limit* no son válidos.

- **offset** - *Number* - [Omitempty](#omitempty) Offset, por defecto es 0.

- **limit** - *Number* [Omitempty](#omitempty) Número de entradas, por defecto 10 entradas, máximo 100 entradas.


**Valor de retorno**
- **list** - *Array* - Cada elemento en el arreglo contiene los siguientes parámetros:
    - **id** - *String* - Parameter id, único.
    - **name** - *String* - Nombre del parámetro。
    - **value** - *String* - Valor del parámetro。
    - **conditions** - *String* - Cambiar los permisos de los parámetros.。

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getEcosystemParams","id":1,"params":[0,"changing_app_params,changing_language"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "list": [
                {
                    "id": "9",
                    "name": "changing_app_params",
                    "value": "ContractConditions(\"DeveloperCondition\")",
                    "conditions": "ContractConditions(\"DeveloperCondition\")"
                },
                {
                    "id": "4",
                    "name": "changing_language",
                    "value": "ContractConditions(\"DeveloperCondition\")",
                    "conditions": "ContractConditions(\"DeveloperCondition\")"
                }
            ]
        }
    }
```


### **ibax.getTableCount** {#ibax-gettablecount}

Devolver una lista de tablas de datos para el ecosistema actual. 

Se pueden establecer el desplazamiento y el número de elementos.

[Autorización](#authorization)

**Parámetros**

- **offset** - *Number* - [Omitempty](#omitempty) Offset, por defecto es 0.

- **limit** - *Number* [Omitempty](#omitempty) Número de entradas, por defecto 25 entradas, máximo 100 entradas.

**Valor de retorno**
- **count** - *Number* - Actualmente, ¿cuántas tablas de datos ecológicos hay en total?

- **list** - *Array* - Cada elemento en el arreglo contiene los siguientes parámetros:
    - **name** - *String* - Nombre de tabla de datos sin prefijo.
    - **count** - *String* - Número de entradas en la tabla de datos.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getTableCount","id":1,"params":[0,2]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 32,
            "list": [
                {
                    "name": "app_params",
                    "count": "41"
                },
                {
                    "name": "applications",
                    "count": "7"
                }
            ]
        }
    }
```


### **ibax.getTable** {#ibax-gettable}
Por favor, proporcione más contexto sobre lo que se refiere con "solicitud de datos de la tabla del ecosistema actual" para poder proporcionar una traducción precisa.

[Autorización](#authorization)

**Parámetros**
- **tableName** - *String* - Nombre de la tabla de datos.

**Valor de retorno**
- **name** - *String* - Nombre de la tabla de datos.

- **insert** - *String* - Permiso para agregar entradas.

- **new_column** - *String* - Agregar permisos de campo.

- **update** - *String* - Cambiar los permisos de entrada.

- **app_id** - *String* - Identificación de la aplicación.

- **conditions** - *String* - Condiciones para cambiar los permisos.

- **columns** - *Array* - Array de información relacionada con los campos de la tabla de datos:
    - **name** - *String* - Nombre del campo.
    - **type** - *String* - Tipo de datos del campo.
    - **perm** - *String* - Cambiar los permisos para modificar el valor de este campo.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getTable","id":1,"params":["app_params"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "name": "app_params",
            "insert": "ContractConditions(\"DeveloperCondition\")",
            "new_column": "ContractConditions(\"@1MainCondition\")",
            "update": "ContractAccess(\"@1EditAppParam\")",
            "conditions": "ContractConditions(\"@1MainCondition\")",
            "app_id": "1",
            "columns": [
                {
                    "name": "value",
                    "type": "text",
                    "perm": "ContractAccess(\"@1EditAppParam\")"
                },
                {
                    "name": "app_id",
                    "type": "number",
                    "perm": "ContractAccess(\"@1ItemChangeAppId\")"
                },
                {
                    "name": "ecosystem",
                    "type": "number",
                    "perm": "false"
                },
                {
                    "name": "conditions",
                    "type": "text",
                    "perm": "ContractAccess(\"@1EditAppParam\")"
                },
                {
                    "name": "permissions",
                    "type": "json",
                    "perm": "ContractConditions(\"@1MainCondition\")"
                },
                {
                    "name": "name",
                    "type": "varchar",
                    "perm": "false"
                }
            ]
        }
    }
```


### **ibax.getList** {#ibax-getlist}

Recupere entradas de una tabla de datos especificada.

Puede especificar las columnas a devolver.

Puede establecer el desplazamiento y el número de entradas a devolver.

Puede establecer condiciones de consulta.

Para las tablas de datos con un tipo de *BYTEA* (matriz de bytes, hash, matriz de bytes de código), realice la codificación hexadecimal.

[Autorización](#authorization)

**Parámetros**
*Object* - Obtener el objeto de la tabla de datos.
- **name** - *String* - Nombre de la tabla de datos.

- **limit** - *Number* - [Omitempty](#omitempty) Número de entradas predeterminado: 25 entradas.

- **offset** - *Number* - [Omitempty](#omitempty) Offset, por defecto es 0.

- **order** - *String* - [Omitempty](#omitempty) Sorting method, default id ASC. (Orden de clasificación, por defecto id ASC.)

- **columns** - *String* - [Omitempty](#omitempty) Solicitud de lista de columnas, separadas por comas. Si no se especifica, se devolverán todas las columnas. En todos los casos, se devolverá la columna de identificación (id).

- **where** - *Object* - [Omitempty](#omitempty)

    Consulta de condiciones, Ejemplo: Si desea buscar id>2 y name = john,

    puede usar `where:{"id":{"$gt":2},"name":{"$eq":"john"}}`,
    
    Para más detalles, consulte la sintaxis de where en [DBFind](../topics/script.md#dbfind).

**Valor de retorno**
- **count** - *Number* - Número total de entradas.
- **list** - *Array* - Cada elemento en el arreglo contiene los siguientes parámetros:

    - **id** - *String* - ID de entrada.
    - **...** - Otras columnas de la tabla de datos.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getList","id":1,"params":[{"name":"@1history","where":{"$and": [{"id":{"$gt": 2}}, {"id":{"$lt": 5}}]}}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 2,
            "list": [
                {
                    "amount": "1000000000000000000",
                    "block_id": "4",
                    "comment": "UTXO",
                    "created_at": "1676538080433",
                    "ecosystem": "1",
                    "id": "3",
                    "recipient_balance": "1000000000000000000",
                    "recipient_id": "666...160",
                    "sender_balance": "1000000000000000000",
                    "sender_id": "666...3160",
                    "status": "0",
                    "txhash": "2ac156c0ce55c10fd485cb9d59f50e3f9b269fb9bb69571d3c2eeae033d6c6cc",
                    "type": "24",
                    "value_detail": "NULL"
                }
            ]
        }
    }
```


### **ibax.getSections** {#ibax-getsections}
Return a list of tabular entries for the current ecosystem, with the ability to set an offset and number of entries. 

If the *role_access* field contains a list of roles and does not include the current role, no records will be returned. 

The data in the *title* field will be replaced by the language resource of the *Accept-Language* header.

[Autorización](#authorization)

**Parámetros**

- *Object* - Obtener el objeto de solicitud `sections`.
    - **limit** - *Number* - [Omitempty](#omitempty) - Número de entradas predeterminado: 25 entradas.

    - **offset** - *Number* - [Omitempty](#omitempty) - Offset, por defecto es 0.

    - **lang** - *String* - [Omitempty](#omitempty) - 
        
        Este campo especifica el código o la localización del recurso multilingüe, por ejemplo: *en, es*. Si el recurso multilingüe especificado, como *en-US*, no se encuentra, se buscará en el grupo de recursos multilingües **predeterminado**: **en**.

**Valor de retorno**

- **count** - *Number* - Número total de elementos de la pestaña.

- **list** - *Array* - Cada elemento en el arreglo contiene información de todas las columnas en la tabla "sections".

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getSections","id":1,"params":[{"offset":0,"limit":2}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 2,
            "list": [
                {
                    "ecosystem": "1",
                    "id": "1",
                    "page": "default_page",
                    "roles_access": "[]",
                    "status": "2",
                    "title": "Home",
                    "urlname": "home"
                },
                {
                    "ecosystem": "1",
                    "id": "2",
                    "page": "developer_index",
                    "roles_access": "[]",
                    "status": "1",
                    "title": "Developer",
                    "urlname": "developer"
                }
            ]
        }
    }
```


### **ibax.getRow** {#ibax-getrow}
Retrieve entries from a specified data table in the current ecosystem. It is possible to specify the columns to be returned.

[Autorización](#authorization)
**Parámetros**
- **tableName** - *String* - Nombre de la tabla de datos.

- **id** - *Number* - ID de entrada.

- **columns** - *String* - [Omitempty](#omitempty)

    Solicitud de lista de columnas, separadas por comas. Si no se especifica, se devolverán todas las columnas. 
    
    Si no hay filtro, se puede dejar en blanco `""`. 
    
    En todos los casos, se devolverá la columna de identificación (id).

- **whereColumn** - *String* - [Omitempty](#omitempty) - Encuentre el nombre de la columna (solo se pueden encontrar columnas de tipo Número)。

**Valor de retorno**
- **value**- *Object* - Objeto que recibe los valores de la columna.
    - **id** - *String* - ID de entrada.
    - **...** - Solicitar la secuencia de columnas.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getRow","id":1,"params":["@1history",4,"id,sender_id,recipient_id,amount,ecosystem,created_at","id"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "value": {
                "amount": "680388766240",
                "created_at": "1677222830899",
                "ecosystem": "1",
                "id": "296",
                "recipient_id": "6667782293976713160",
                "sender_id": "6660819716178795186"
            }
        }
    }
```


### **ibax.systemParams** {#ibax-systemparams}
Aquí está la lista de parámetros de la plataforma.

[Autorización](#authorization)
**Parámetros**
- **names** - *String* [Omitempty](#omitempty) - Lista de parámetros de solicitud, separados por comas.

Por ejemplo, `names="name1,name2"`.
Cuando hay parámetros de filtrado, los parámetros *offset* y *limit* no son válidos.

- **offset** - *Number* - [Omitempty](#omitempty) Offset, por defecto es 0.

- **limit** - *Number* [Omitempty](#omitempty) Número de entradas, por defecto 10 entradas, máximo 100 entradas.

**Valor de retorno**

-   **list** - *Array* - Cada elemento en el arreglo contiene los siguientes.

 parámetros:
    - **id** - *String* - Identificador único.
    - **name** - *String* - Nombre del parámetro。
    - **value** - *String* - Valor del parámetro。
    - **conditions** - *String* - Cambiar los permisos de los parámetros.。

**Ejemplo**

```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.systemParams","id":1,"params":["gap_between_blocks,honor_nodes"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "list": [
                {
                    "id": "4",
                    "name": "gap_between_blocks",
                    "value": "2",
                    "conditions": "ContractAccess(\"@1UpdatePlatformParam\")"
                },
                {
                    "id": "6",
                    "name": "honor_nodes",
                    "value": "",
                    "conditions": "ContractAccess(\"@1UpdatePlatformParam\")"
                }
            ]
        }
    }
```


### **ibax.history** {#ibax-history}

Retrieve the change records of entries in the specified table in the current ecosystem.

[Autorización](#authorization)
**Parámetros**

- **name** - *String* - Nombre de la tabla de datos.
- **tableId** - *Number* - ID de entrada.

**Valor de retorno**
- **list** - *Array* - Cada elemento de la matriz contiene un registro de cambios en el elemento solicitado.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.history","id":1,"params":["contracts",1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "list": [
                {
                    "conditions": "ContractConditions(\"MainCondition\")",
                    "ecosystem": "1",
                    "value": "// This contract is used to set \"developer\" rights....."
                }
            ]
        }
    }
```


### **ibax.getPageRow** {#ibax-getpagerow}
Obtener las entradas de los campos de la tabla de datos de páginas del ecosistema actual.

[Autorización](#authorization)

**Parámetros**
- **name** - *String* - Nombre de la entrada en la tabla especificada.

**Valor de retorno**
- **id** - *Number* - ID de entrada.
- **name** - *String* - Nombre del elemento.
- **value** - *String* - Contenido.
- **menu** - *String* - Índice.
- **nodesCount** - *Number* - Número de nodos que requieren validación en la página.
- **app_id** - *Number* - Identificación de la aplicación.
- **conditions** - *String* - Cambiar los permisos de los parámetros.。

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getPageRow","id":1,"params":["default_page"]}' http://127.0.0.1:7079


    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 5,
            "name": "default_page",
            "value": "If(#account_id# == #guest_account#){\n    Include(@1apps_description)\n}.Else{\n    Include(@1profile)\n}",
            "menu": "default_menu",
            "nodesCount": 1,
            "app_id": 1,
            "conditions": "ContractConditions(\"@1DeveloperCondition\")"
        }
    }
```


### **ibax.getMenuRow** {#ibax-getmenurow}
Obtener las entradas de los campos de la tabla de datos del menú del ecosistema actual.

[Autorización](#authorization)

**Parámetros**
- **name** - *String* - Nombre de la entrada en la tabla especificada.

**Valor de retorno**
- **id** - *Number* - ID de entrada.
- **name** - *String* - Nombre del elemento.
- **title** - *String* - Título.
- **value** - *String* - Contenido.
- **conditions** - *String* - Cambiar los permisos de los parámetros.。

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getMenuRow","id":1,"params":["default_menu"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 2,
            "name": "default_menu",
            "title": "default",
            "value": "\nMenuItem.....",
            "conditions": "ContractConditions(\"@1DeveloperCondition\")"
        }
    }
```


### **ibax.getSnippetRow** {#ibax-getsnippetrow}
Obtener las entradas de los campos de la tabla de datos de `snippet` del ecosistema actual.

[Autorización](#authorization)

**Parámetros**
- **name** - *String* - Nombre de la entrada en la tabla especificada.

**Valor de retorno**
- **id** - *Number* - ID de entrada.
- **name** - *String* - Nombre del elemento.
- **value** - *String* - Contenido.
- **conditions** - *String* - Cambiar los permisos de los parámetros.。

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getSnippetRow","id":1,"params":["welcome"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 12,
            "name": "welcome",
            "value": "Div(content-wrapper)....",
            "conditions": "ContractConditions(\"@1DeveloperCondition\")"
        }
    }
```


### **ibax.getAppContent** {#ibax-getappcontent}
Obtener información relevante de la aplicación (incluyendo `page`, `snippet` y `menu`).

[Autorización](#authorization)

**Parámetros**
- **id** - *Number* - Identificación de la aplicación.

**Valor de retorno**
- **snippets** - *Array* - Array de información de fragmentos de código.

    - **id** - *Number* - id.
    - **name** - *String* - Nombre del fragmento de código.

- **pages** - *Array* - Array de información de la página.

    - **id** - *Number* - id.
    - **name** - *String* - Nombre de la página.

- **contracts** - *Array* - Array de información de contratos inteligentes.

    - **id** - *Number* - id.
    - **name** - *String* - Nombre del contrato inteligente.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}}" -d '{"jsonrpc":"2.0","method":"ibax.getAppContent","id":1,"params":[1]}' http://127.0.0.1:7079
    
    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "snippets": [ //if not app snippets is null array,example:[]
                {
                    "id": 2,
                    "name": "developer_link"
                },
                {
                    "id": 3,
                    "name": "export_info"
                }
            ],
            "pages": [  //if not app pages is null array,example:[]
                {
                    "id": 6,
                    "name": "menus_list"
                },
                {
                    "id": 7,
                    "name": "params_edit"
                }
            ],
            "contracts": [  //if not app contracts is null array,example:[]
                {
                    "id": 2,
                    "name": "MainCondition"
                },
                {
                    "id": 33,
                    "name": "NodeOwnerCondition"
                }
            ]
        }
    }
```


### **ibax.getMember** {#ibax-getmember}
Obtener información del miembro.

**Parámetros**
**account** - *String* - Información de miembros.

**ecosystemId** - *Number* - Identificación del ecosistema.


**Valor de retorno**
- **id** - *Number* - ID de miembro.
- **member_name** - *String* - Nombre.
- **image_id** - *Number* - ID de imagen de perfil.
- **member_info** - *String* - Descripción.


**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}}" -d '{"jsonrpc":"2.0","method":"ibax.getMember","id":1,"params":["1497-2036-4953-3607-1121",1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 14,
            "member_name": "som",
            "image_id": 5,           
            "member_info": "{\"information\": \"Everything will be okay in the end. If it's not okay, it's not the end.\"}"
        }
    }
```

### **ibax.getContracts** {#ibax-getcontracts}
Obtener la lista de contratos inteligentes en el ecosistema actual, se puede establecer un desplazamiento y un número de entradas.

[Autorización](#authorization)

**Parámetros**
- **offset** - *Number* - [Omitempty](#omitempty) Offset, por defecto es 0.
- **limit** - *Number* - [Omitempty](#omitempty) Número de entradas predeterminado: 25 entradas.

**Valor de retorno**
- **count** - *Number* - Número total de entradas.

- **list** - *Array* - Cada elemento en el arreglo contiene los siguientes parámetros:
    - **id** - *String* - ID de contrato inteligente.
    - **name** - *String* - Nombre del contrato inteligente.
    - **value** - *String* - Contenido de contratos inteligentes.
    - **wallet_id** - *String* - Dirección de cuenta vinculada al contrato inteligente.
    - **address** - *String* - Dirección de la billetera vinculada al contrato inteligente `XXXX-...-XXXX`.
    - **ecosystem_id** - *String* - ID del ecosistema al que pertenece el contrato inteligente.
    - **app_id** - *String* - ID de la aplicación a la que pertenece el contrato inteligente.
    - **conditions** - *String* - Cambiar los permisos del contrato inteligente.
    - **token_id** - *String* - ID del ecosistema donde se encuentra el token utilizado como tarifa para los contratos inteligentes de pago.


**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getContracts","id":1,"params":[0,1]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "count": 293,
            "list": [
                {
                    "address": "0000-0000-0000-0000-0000",
                    "app_id": "1",
                    "conditions": "ContractConditions(\"@1DeveloperCondition\")",
                    "ecosystem_id": "1",
                    "id": "1",
                    "name": "DeveloperCondition",
                    "token_id": "1",
                    "value": "// This contract is used to ...",
                    "wallet_id": "0"
                }
            ]
        }
    }
```


### **ibax.getContractInfo** {#ibax-getcontractinfo}
"Devuelve información relevante sobre un contrato inteligente específico."

[Autorización](#authorization)

**Parámetros**
- **contractName** - *String* - Nombre del contrato inteligente. El formato es `@ecosystem_id%%contractName%`, por ejemplo @1contractName (nombre del contrato inteligente en el ecosistema 1) o contractName (nombre del contrato inteligente actual en el ecosistema).
    
**Valor de retorno**

- **id** - *Number* - ID de contrato inteligente en una máquina virtual (VM).
- **name** - *String* - Nombre del contrato inteligente con ID del ecosistema `@1MainCondition`.
- **state** - *Number* - ID del ecosistema al que pertenece el contrato inteligente.
- **walletid** - *String* - Dirección de la cuenta a la que está vinculado el contrato inteligente.
- **tokenid** - *String* - - **ecosistemaID** - *String* - ID del ecosistema donde se encuentra el token utilizado como tarifa para el contrato inteligente de pago.
- **address** - *String* - Dirección de la billetera vinculada al contrato inteligente en formato `XXXX-...-XXXX`.
- **tableid** - *String* - ID de la entrada del contrato inteligente en la tabla *contracts*.
- **fields** - *Array* - La información de estructura de cada parámetro en la sección **data** de un contrato inteligente en una matriz incluye:
- **name** - *String* - Nombre del parámetro.
- **type** - *String* - Tipo de parámetro.
    - **optional** - *Bool* - Parameter options, `true` indicates optional parameter, `false` indicates required parameter.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getContractInfo","id":1,"params":["@1TokensSend"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "id": 5098,
            "state": 1,
            "tableid": "98",
            "walletid": "0",
            "tokenid": "1",
            "address": "0000-0000-0000-0000-0000",
            "fields": [
                {
                    "name": "Amount",
                    "type": "money",
                    "optional": false
                },
                {
                    "name": "Recipient",
                    "type": "string",
                    "optional": true
                },
                {
                    "name": "iName",
                    "type": "string",
                    "optional": true
                },
                {
                    "name": "Comment",
                    "type": "string",
                    "optional": true
                },
                {
                    "name": "Ecosystem",
                    "type": "int",
                    "optional": true
                }
            ],
            "name": "@1TokensSend"
        }
    }
```


### **ibax.sendTx** {#ibax-sendtx}
Agregar la transacción en la cola de transacciones recibidas como parámetro y, si la solicitud se ejecuta correctamente, devolver el hash de la transacción. Este hash se puede utilizar para obtener la transacción correspondiente en el bloque. En caso de que ocurra un error en la respuesta, el hash se incluirá en el mensaje de error.

[Autorización](#authorization)

**Parámetros**
- *Object* - Objeto de datos de transacción.
    - **tx_key** - *String* - Contenido de la transacción, este parámetro puede especificar cualquier nombre y admite la recepción de múltiples transacciones.

**Valor de retorno**
- **hashes** - *Array* - Array de hash de transacciones:
   - **tx1** - *String* - Hash de la transacción 1.
   - **txN** - *String* - Hash de la transacción N.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.sendTx","id":1,"params":[{"tx1":...,"txN":...}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "hashes":[
                {"hash1":"hash1"},
                {"hashN":"hashN"}
            ]
        }
    }
```


### **ibax.txStatus** {#ibax-txstatus}
Obtener el ID del bloque y el mensaje de error de una transacción específica. Si los valores devueltos del ID del bloque y el mensaje de error están vacíos, significa que la transacción aún no ha sido incluida en un bloque.

[Autorización](#authorization)

**Parámetros**
- **hashes** - *String* - Hash de transacción, separados por `,`.

**Valor de retorno**
- **hash** - *Object* - Hash de transacción.
    - **blockid** - *String* - Si la transacción se ejecuta correctamente, devolverá el ID del bloque; Si la ejecución de la transacción falla, *blockid* será `0`. Si el error de ejecución de la transacción es castigado, se devolverá el ID de bloque correspondiente.
    
    - **result** - *String* - Utilizando la variable **\$result**, se devuelve el resultado de la transacción.
    - **errmsg** - *Object* - [Omitempty](#omitempty) Si la transacción falla, se devuelve un mensaje de error.
        - **type** - *String* - Tipo de error.
        - **error** - *String* - Mensaje de error.
    - **penalty** - *Number* - Si la transacción falla, (0: sin penalización, 1: con penalización).

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.txStatus","id":1,"params":["cf46ef1ce7ecfcf48ccf209577fb8a2130426b71adc3a3855aff7f68d114fca9,4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 2,
        "result": {
            "4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b": {
                "blockid": "793",
                "result": "",
                "penalty": 0
            },
            "cf46ef1ce7ecfcf48ccf209577fb8a2130426b71adc3a3855aff7f68d114fca9": {
                "blockid": "793",
                "errmsg": {
                    "type": "warning",
                    "error": "platform ecosystem can not be burning Tokens"
                },
                "result": "",
                "penalty": 1
            }
        }
    }
```


### **ibax.txInfo** {#ibax-txinfo}
Devolver información relacionada con la transacción para un hash especificado, incluyendo el ID del bloque y el número de confirmaciones. Si se especifican parámetros opcionales, también puede devolver el nombre del contrato inteligente y sus parámetros relacionados.

**Parámetros**
- **hash** - *String* - Hash de transacción.

- **contractinfo** - *Bool* [Omitempty](#omitempty) - Identificación detallada de los parámetros del contrato inteligente, para obtener detalles del contrato inteligente relacionados con la transacción. El valor predeterminado es `false`.

**Valor de retorno**
- **blockid** - *Number* - Incluye el ID de bloque de la transacción.
Si el valor es `0`, no se puede encontrar la transacción con ese hash.
Si la transacción ocurre en el nodo actual, se puede obtener a través de [ibax.txStatus](#ibax-txstatus).

- **confirm** - *Number* - El número de confirmaciones de nodos para este bloque *blockid*.

- **data** - *Object* - Si se especifica `contentinfo=true`, se devolverán los detalles de la información del contrato inteligente. Será nulo si no se especifica.
    - **block_id** - *Number*- Altura del bloque.
    - **block_hash** - *String* - Hash del bloque.
    - **address** - *String* - Dirección de creación de la transacción.
    - **ecosystem** - *String* - ID del ecosistema de envío de la transacción.
    - **hash** - *String* - Hash de la transacción.
    - **expedite** - *String* - Tarifa de aceleración, si no hay, es `""`.
    - **contract_name** - *String* - Nombre del contrato inteligente.
    - **params** - *Object* - Parámetros del contrato inteligente, los campos del contrato inteligente se pueden consultar a través de [ibax.getContractInfo](#ibax-getcontractinfo).
    - **created_at** - *Number* - Tiempo de creación de la transacción.
    - **size** - *String* - Tamaño de la transacción unit: B; KiB; MiB; GiB; TiB.
    - **status** - *String* - Estado (0: éxito 1: castigo).


**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.txInfo","id":1,"params":["020d8c004b3a0c00a6bfffa36e2746509295e5ea6dbb14e7cd6098c3d906bb58",true]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "blockid": "796",
            "confirm": 0,
            "data": {
                "block_id": 796,
                "block_hash": "bccbc3cf47b49bee5fb7321810884db49b73f5114b0a6fcd234dd3fdf9c22ef4",
                "address": "0666-7782-2939-7671-3160",
                "ecosystem": 2,
                "hash": "020d8c004b3a0c00a6bfffa36e2746509295e5ea6dbb14e7cd6098c3d906bb58",
                "expedite": "1",
                "contract_name": "@1TokensSend",
                "params": {
                    "Amount": "1000000000000",
                    "Recipient": "0666-7782-2939-7671-3160"
                },
                "created_at": 1678774455841,
                "size": "213.00B",
                "status": 1
            }
        }
    }
```


### **ibax.txInfoMultiple** {#ibax-txinfomultiple}
Return transaction-related information for a specified list of hashes.

**Parámetros**
- **hashes** - *Array* - Lista de hash de transacciones.

- **contractinfo** - *Bool* [Omitempty](#omitempty) - Identificación detallada de los parámetros del contrato inteligente, para obtener detalles del contrato inteligente relacionados con la transacción. El valor predeterminado es `false`.

**Valor de retorno**
-   **results** - *Array* - En el diccionario de datos, el hash de la transacción se utiliza como clave y los detalles de la transacción se utilizan como valor.
    - **hash** - *String* - Hash de la transacción.
        - **blockid** - *Number* - ID del bloque que contiene la transacción. Si este valor es `0`, la transacción con este hash no se puede encontrar.
        - **confirm** - *Number* - Número de confirmaciones para el bloque *blockid*.
        - **data** - *Object* - Si se especifica `contentinfo=true`, se devuelve la información detallada del contrato inteligente para este parámetro. De lo contrario, es `nulo`.
            - **block_id**- *Number*- Altura del bloque.
            - **block_hash** - *String* - - **hash de bloque** - *String* - Hash del bloque.
            - **address** - *String* - Dirección de creación de la transacción.
            - **ecosystem** - *String* - ID del ecosistema al que se envió la transacción.
            - **hash** - *String* - Hash de la transacción.
            - **expedite** - *String* - Tarifa de urgencia, si no hay, es "".
            - **contract_name** - *String* - Nombre del contrato inteligente.
            - **params** - *Object* - Parámetros del contrato inteligente, los campos del contrato inteligente se pueden consultar a través de [ibax.getContractInfo](#ibax-getcontractinfo).
            - **created_at** - *Number* - Tiempo de creación de la transacción.
            - **size** - *String* - Tamaño de la transacción unidad: B; KiB; MiB; GiB; TiB.
            - **status** - *String* - Estado (0: éxito 1: castigo).

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getPageValidatorsCount","id":1,"params":[["1875b4fc02a8bf5ccf0d3fbce83011dd6711d8d325c7d731ac659b8beffc0284","4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b"],true]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "results": {
                "1875b4fc02a8bf5ccf0d3fbce83011dd6711d8d325c7d731ac659b8beffc0284": {
                    "blockid": 0,
                    "confirm": 0,
                    "data": null
                },
                "4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b": {
                    "blockid": 793,
                    "confirm": 0,
                    "data": {
                        "block_id": 793,
                        "block_hash": "ef3b2f2e18662e0b8bba136a209e30c5aae76d9a82e0b21209786f62fe5676e4",
                        "address": "0666-0819-7161-7879-5186",
                        "ecosystem": 1,
                        "hash": "4a458232de2ab2a3f5361da68e409b925c775346d14139263a69c0e8ecf0166b",
                        "expedite": "1",
                        "contract_name": "@1TokensSend",
                        "params": {
                            "Amount": "200",
                            "Comment": "Hello Dear",
                            "Recipient": "1196-2490-5275-7101-3496"
                        },
                        "created_at": 1678765099072,
                        "size": "297.00B",
                        "status": 0
                    }
                }
            }
        }
    }
```


### **ibax.getPageValidatorsCount** {#ibax-getpagevalidatorscount}
"Devuelve el número de nodos de validación necesarios para acceder a la página especificada."

**Parámetros**
- **name** - *String* - Nombre de la página, con formato `@ecosystem_id%%page_name%`, por ejemplo @1params_list (nombre de la página params_list en el ecosistema 1) o params_list (nombre de la página params_list en el ecosistema actual).


**Valor de retorno**
- **validate_count** - *Number* - Número de nodos requeridos para la validación de la página especificada.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getPageValidatorsCount","id":1,"params":["@1params_list"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "validate_count": 1
        }
    }
```


### **ibax.getPage** {#ibax-getpage}
Obtener el árbol de objetos JSON de código para el nombre de página especificado, este es el resultado del procesamiento del motor de plantillas.

[Autorización](#authorization)

**Parámetros**
-   **name** - *String* - Nombre de página con ID de ecosistema, en formato `@ecosystem_id%%nombre_de_página`, por ejemplo `@1main_page`.

    Si no se proporciona un ID de ecosistema, se buscará por defecto la página en el ecosistema actual, como `main_page`.

**Valor de retorno**
- **menu** - *String* - Nombre del menú al que pertenece la página.

- **menutree** - *Array* - Árbol de objetos JSON del menú de la página.

- **tree** - *Array* - Árbol de objetos JSON de la página.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getPage","id":1,"params":["@1params_list"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "menu": "developer_menu",
            "menutree": [
                {
                    "tag": "menuitem",
                    "attr": {
                        "icon": "icon-cloud-upload",
                        "page": "@1import_upload",
                        "title": "Import"
                    }
                }
                ...
            ],
            "tree": [
                {
                    ....
                }
                ...
            ],
            "nodesCount": 1
        }
    }
```


### **ibax.getMenu** {#ibax-getmenu}
Obtener el árbol de objetos JSON de código para el nombre de menú especificado, este es el resultado del procesamiento del motor de plantillas.

[Autorización](#authorization)

**Parámetros**
-   **name** - *String* -
    Nombre del menú con ID de ecosistema, en formato `@ecosystem_id%%menu_name%`, por ejemplo `@1main_menu`.
Si no se proporciona el ID de ecosistema, se buscará el menú en el ecosistema actual por defecto, por ejemplo `main_menu`.

**Valor de retorno**

- **title** - *String* - Título del menú.

- **tree** - *Array* - Árbol de objetos JSON del menú.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getMenu","id":1,"params":["@1default_menu"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "title": "default",
            "tree": [
                {
                    "tag": "menuitem",
                    "attr": {
                        "icon": "icon-cloud-upload",
                        "page": "@1import_upload",
                        "title": "Import"
                    }
                }
                ...
            ]
        }
    }
```


### **ibax.getSource** {#ibax-getsource}

Devuelve un árbol de objetos JSON de código para el nombre de página especificado. No se ejecuta ninguna función ni se recibe ningún dato. El árbol de objetos JSON devuelto corresponde a la plantilla de página y se puede utilizar en el diseñador de páginas visual. Si no se encuentra la página, se devuelve un error 404.


[Autorización](#authorization)

**Parámetros**
-   **name** - *String* -
    Nombre de página con ID de ecosistema, el formato es `@id_de_ecosistema%%nombre_de_página`, por ejemplo `@1pagina_principal`.
    Si no se proporciona un ID de ecosistema, buscará la página en el ecosistema actual, por ejemplo `pagina_principal`.
    
**Valor de retorno**
-   **tree** - *Array* - Árbol de objetos JSON de la página.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {$Token}" -d '{"jsonrpc":"2.0","method":"ibax.getSource","id":1,"params":["@1params_list"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "tree": [
                {
                    "tag": "dbfind",
                    "attr": {
                        "name": "@1applications"
                    },
                    "tail": [
                        {
                            "tag": "where",
                            "attr": {
                                "where": "{\"ecosystem\": \"#ecosystem_id#\", \"name\": \"System\"}"
                            }
                        }
						...
                    ]
                },
                {
                    "tag": "setvar",
                    "attr": {
                        "name": "role_developer_id",
                        "value": "AppParam(Ecosystem: #ecosystem_id#, App: #application_id#, Name: role_developer)"
                    }
                },
                {
                    "tag": "dbfind",
                    "attr": {
                        "name": "@1roles_participants"
                    },
                    "tail": [
                        {
                            "tag": "where",
                            "attr": {
                                "where": "{\"ecosystem\": \"#ecosystem_id#\", \"$and\": [{\"role->id\": {\"$in\": [#role_developer_id#]}}, {\"role->id\": \"#role_id#\"}], \"member->account\": \"#account_id#\", \"deleted\": 0}"
                            }
                        }
						...
                    ]
                },
                {
                    "tag": "if",
                    "attr": {
                        "condition": "#developer_access_id#>0"
                    },
                    "children": [
                        {
                            "tag": "setvar",
                            "attr": {
                                "name": "this_page",
                                "value": "@1params_list"
                            }
                        }
						...
                    ],
                    "tail": [
                        {
                            "tag": "else",
                            "children": [
                                {
                                    "tag": "settitle",
                                    "attr": {
                                        "title": "$@1ecosystem_parameters$"
                                    }
                                }
								...
                            ]
                        }
                    ]
                }
            ]
        }
    }
```


### **ibax.getPageHash** {#ibax-getpagehash}

Devolver el hash SHA256 de la página especificada por su nombre. Si la página no se encuentra, se devuelve un error 404.

Para recibir el hash correcto al hacer una solicitud a otros nodos, también se deben pasar los parámetros *ecosystem, key_id, role_id*. Para recibir una página de otros ecosistemas, se debe agregar el prefijo del ID del ecosistema al nombre de la página. Por ejemplo: `@2mypage`.

**Parámetros**
- **name** - *String* - Nombre de página con ID de ecosistema. El formato es `@ecosystem_id%%page_name%`, por ejemplo `@1main_page`, se puede especificar el ID de ecosistema.

- **ecosystem** - *Number* - [Omitempty](#omitempty) ID del ecosistema.

- *Object* - [Omitempty](#omitempty) - Obtener el objeto de página especificado.
    - **key_id** - *String* - Dirección de cuenta.
    - **role_id** - *String* - ID de personaje.

**Valor de retorno**
- *Object* -
    - **hash** - *String* - Valor hash en hexadecimal.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getPageHash","id":1,"params":["@1params_list",0,{"role_id":"1","key_id":"-6484253546138538120"}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "hash": "fc5ed3b5e879dd5521dfb792e815019bd8411851e850e75a3590d71e950a0465"
        }
    }
```


### **ibax.getContent** {#ibax-getcontent}

Devuelve un objeto JSON de código de página desde el parámetro **template**, si se proporciona el parámetro opcional **source** como `true`, el árbol de objetos JSON no ejecutará ninguna función ni recibirá datos. Este árbol de objetos JSON se puede utilizar en el diseñador de páginas visual.

**Parámetros**
- *Object*
    - **template** - *String* - Código de página.

    - **source** - *Bool* - Si se especifica como `true`, el árbol de objetos JSON no ejecuta ninguna función ni recibe datos.

**Valor de retorno**
- **tree** - *Object* - Árbol de objetos JSON.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getContent","id":1,"params":[{"template","..."source":true}]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "tree": {
                "type":"......", 
                "children": [
                    {...},
                    {...}
                ]
            }
        }
    }
      
```


### **ibax.getBlockInfo** {#ibax-getblockinfo}
"Devuelve información relacionada con el ID de bloque especificado."

**Parámetros**
- **id** - *Number*- Altura del bloque.

**Valor de retorno**

- **hash** - *String* - Valor hash del bloque.

- **key_id** - *Number* - Dirección de cuenta que firmó el bloque.

- **time** - *Number* - Marca de tiempo de generación de bloque.

- **tx_count** - *Number* - El número total de transacciones dentro de este bloque.

- **rollbacks_hash** - *String* - Valor hash de reversión de bloque.

- **node_position** - *Number* - Esta sección se encuentra en la posición de la lista de nodos de honor.

- **consensus_mode** *Number* - Modo de consenso, parámetros (1: Modo de gestión del creador; 2: Modo de gobernanza DAO)

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getBlockInfo","id":1,"params":[12]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "hash": "Hl+/VvYFFu4iq4zLrRDGHBhm7DM7llEAfEJyaX2Q3is=",
            "key_id": 6667782293976713160,
            "time": 1677134955,
            "tx_count": 1,
            "rollbacks_hash": "o37QAighKMb8WqbEHAqCQb5bOfMvOqV0WoTaN631q74=",
            "node_position": 0,
            "consensus_mode": 1
        }
    }
```


### **ibax.getConfig** {#ibax-getconfig}
Obtener la dirección y el puerto del host de `centrifugo`.

**Parámetros**
- **option** - *String* - Configuración.

    1."centrifugo" - Servicio de mensajería.


**Valor de retorno**

- **centrifugo** - *String* - [Omitempty](#omitempty) - La dirección y el puerto del host de `centrifugo`, en formato `http://address:port`, por ejemplo: `http://127.0.0.1:8100`.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"ibax.getConfig","id":1,"params":["centrifugo"]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "centrifugo":"http://127.0.0.1:8100"
        }
    }
```




### **net.getNetwork** {#net-getnetwork}
Obtener información del nodo.

**Parámetros**
- ninguno

**Valor de retorno**
- **network_id** - *String* - Identificador de red.
- **centrifugo_url** - *String* - Dirección del servicio de mensajes de Centrifugo.
- **test** - *Bool* - ¿Es una red de prueba?
- **private** - *Bool* - ¿Es una red privada?
- **honor_nodes** - *Object* - Lista de nodos de honor.
    - **tcp_address** - *String* - Dirección TCP.
    - **api_address** - *String* - Dirección API.
    - **public_key** - *String* - Clave pública del nodo.
    - **unban_time** - *String* - Tiempo de desbloqueo.


**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"net.getNetwork","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "network_id": "1",
            "centrifugo_url": "127.0.0.1",
            "test": false,
            "private": false,
            "honor_nodes": [
                {
                    "tcp_address": "127.0.0.1:7078",
                    "api_address": "http://127.0.0.1:7078",
                    "public_key": "049a41b24862f8db61ee66fb206094baa57bfeac7ea786d63662a964d144eb85d1a0e230928d56f46dd61eefac7640b6aa2883b2445c7b2adc0e581f983ff0aedb",
                    "unban_time": "-62135596800"
                }
            ]
        }
    }
```


### **net.status** {#net-status}
Obtener el estado actual del nodo.

**Parámetros**
- ninguno

**Valor de retorno**
- **status** - *String* - Estado del nodo.
    `node server status is running` - Nodo en ejecución.
    `node server is updating` - Actualización de Node en progreso.
    `node server is stopped` - Nodo en pausa.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"net.status","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": "node server status is running"
    }
```




### **rpc.modules** {#rpc-modules}
Obtener la interfaz JSON-RPC registrada actualmente.

**Parámetros**
- ninguno

**Valor de retorno**
- *Array* - Array de interfaces JSON-RPC.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"rpc.modules","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": [
            "net.getNetwork",
            "ibax.getAppContent",
            "ibax.honorNodesCount",
            "ibax.maxBlockId",
            "ibax.detailedBlock",
            "ibax.getConfig",
            "ibax.getTableCount",
            "ibax.getMenu"
        ]
    }
```




### **admin.startJsonRpc** {#admin-startjsonrpc}
Puede ser utilizado para cambiar el servicio de espacio de nombres de JSON-RPC.

**Parámetros**
**methods** - *String* - Módulo JSON-RPC, por defecto: "ibax,net".

**Valor de retorno**
- *bool* - Estado de ejecución.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"admin.startJsonRpc","id":1,"params":["ibax,net,admin"]}' http://127.0.0.1:8385

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": true
    }
```


### **admin.stopJsonRpc** {#admin-stopjsonrpc}
Cerrar el servicio JSON-RPC.

**Parámetros**
- ninguno

**Valor de retorno**
- *bool* - Estado de ejecución.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"admin.stopJsonRpc","id":1,"params":[]}' http://127.0.0.1:8385

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": true
    }
```



### **debug.getNodeBanStat** {#debug-getnodebanstat}
Obtener el estado de desactivación del nodo.

**Parámetros**
- ninguno

**Valor de retorno**
**node_position** - *Number* - Nodo índice.
**status** - *Bool* - Estado deshabilitado, estado de prohibición `true`, `fales` no deshabilitado.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"debug.getNodeBanStat","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": [
            {
                "node_position": 0,
                "status": true
            }
        ]
    }
```


### **debug.getMemStat** {#debug-getmemstat}
Obtener el uso actual de memoria del nodo.

**Parámetros**
- Ninguno

**Valor de retorno**
- **alloc** - *Number* - El número de bytes que han sido solicitados y todavía están en uso.
- **sys** - *Number* - El número de bytes obtenidos del sistema y que aún están en uso.

**Ejemplo**
```text
    //Request
    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"debug.getMemStat","id":1,"params":[]}' http://127.0.0.1:7079

    //Response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "alloc": 11537432,
            "sys": 35329248
        }
    }
```

