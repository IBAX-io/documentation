# Archivo de configuración del servidor {#server-configuration-file}

Esta sección describe los parámetros del archivo de configuración del servidor.

## Introducción al archivo de configuración del servidor {#introduction-to-the-server-configuration-file}

El archivo de configuración del servidor define la configuración del nodo de la plataforma de blockchain IBAX.

## Ubicación {#location}

Este archivo se encuentra en el directorio de trabajo del servidor y se llama `config.toml`.

## Secciones {#sections}

El archivo de configuración tiene las siguientes secciones:

> Parte normal

    Se define el directorio de trabajo DataDir, la ruta del primer bloque FirstBlockPath y otros parámetros.

> [TCPServer]

    Se definen los parámetros del servicio TCP.

    TCPServer se utiliza para la interacción de red entre nodos.

> [HTTP]

    Se definen los parámetros del servicio HTTP.

    HTTPServer proporciona una API RESTful.

> [DB]

    Se definen los parámetros de la base de datos del nodo PostgreSQL.

> [StatsD]

    Se definen los parámetros del recolector de métricas de operación del nodo StatsD.

> [Centrifugo]

    Se definen los parámetros del servicio de notificación Centrifugo.

> [Log]

    Se definen los parámetros del servicio de registro Log.

> [TokenMovement]

    Se definen los parámetros del servicio de circulación de tokens TokenMovement.

## Ejemplo de archivo de configuración {#an-example-configuration-file}

``` js
PidFilePath = "/ibax-data/go-ibax.pid"
LockFilePath = "/ibax-data/go-ibax.lock"
DataDir = "/ibax-data"
KeysDir = "/ibax-data"
TempDir = "/var/folders/_l/9md_m4ms1651mf5pbng1y1xh0000gn/T/ibax-temp"
FirstBlockPath = "/ibax-data/1block"
TLS = false
TLSCert = ""
TLSKey = ""
OBSMode = "none"
HTTPServerMaxBodySize = 1048576
MaxPageGenerationTime = 3000
NodesAddr = []

[TCPServer]
  Host = "127.0.0.1"
  Port = 7078

[HTTP]
  Host = "127.0.0.1"
  Port = 7079

[DB]
  Name = "ibax"
  Host = "127.0.0.1"
  Port = 5432
  User = "postgres"
  Password = "123456"
  LockTimeout = 5000

[StatsD]
  Host = "127.0.0.1"
  Port = 8125
  Name = "ibax"

[Centrifugo]
  Secret = "127.0.0.1"
  URL = "127.0.0.1"

[Log]
  LogTo = "stdout"
  LogLevel = "ERROR"
  LogFormat = "text"
  [Log.Syslog]
  Facility = "kern"
  Tag = "go-ibax"

[TokenMovement]
  Host = ""
  Port = 0
  Username = ""
  Password = ""
  To = ""
  From = ""
  Subject = ""
```
