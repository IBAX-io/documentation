# 服务端配置文件 {#server-configuration-file}

该章节介绍服务端配置文件参数。

## 服务端配置文件简介 {#introduction-to-the-server-configuration-file}

服务端配置文件定义了 IBAX区块链平台 节点的配置。

## 位置 {#location}

该文件位于服务端工作目录下，名为 `config.toml`。

## 部分 {#sections}

配置文件有以下几个部分：

> 普通部分

    定义工作目录DataDir，第一个区块目录FirstBlockPath等参数。

> [TCPServer]

    定义TCP服务参数。

    TCPServer用于节点之间的网络交互。

> [HTTP]

    定义HTTP服务参数。

    HTTPServer提供RESTful API。

> [DB]

    定义节点数据库PostgreSQL的参数。

> [StatsD]

    定义节点操作指标收集器StatsD的参数。

> [Centrifugo]

    定义通知服务Centrifugo的参数。

> [Log]

    定义了日志服务Log的参数。

> [TokenMovement]

    定义了通证流通服务TokenMovement的参数。

## 配置文件示例 {#an-example-configuration-file}

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
