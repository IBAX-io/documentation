# Server Configuration File {#server-configuration-file}

In this section, we will introduce parameters in the server configuration file. 

## Introduction to the server configuration file {#introduction-to-the-server-configuration-file}

The server configuration file defines the node configuration of IBAX.

## Location {#location}

This file is located in the working directory of the server and is named `config.toml`.

## Sections {#sections}

The configuration file consists the following sections:

> general section

It defines the working directory DataDir, the first block directory FirstBlockPath and other parameters.

> [TCPServer]

It defines the TCP service parameters.

TCPServer is used for the network interaction between nodes.

> [HTTP]

It defines the HTTP service parameters.

HTTPServer provides RESTful APIs.

> [DB]

It defines parameters of the PostgreSQL node database.

> [StatsD]

It defines parameters of the node operation indicator collector StatsD.

> [Centrifugo]

It defines parameters of the notification service Centrifugo.

> [Log]

It defines parameters of the log service Log.

> [TokenMovement]

It defines parameters of the token circulation service TokenMovement.

## An example configuration file {#an-example-configuration-file}

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
