# サーバー設定ファイル {#server-configuration-file}

このセクションでは、サーバー設定ファイルのパラメータについて説明します。
## サーバー設定ファイルの概要 {#introduction-to-the-server-configuration-file}

サーバー設定ファイルは、IBAXのノード設定を定義します。
## 位置 {#location}

このファイルは、サーバーの作業ディレクトリにあり、`config.toml`という名前で保存されています。
## セクション {#sections}

設定ファイルには、次のセクションが含まれています：

> generalセクション

作業ディレクトリDataDir、最初のブロックディレクトリFirstBlockPathなどのパラメータを定義します。

> [TCPServer]

TCPサービスのパラメータを定義します。

TCPServerは、ノード間のネットワークのやり取りに使用されます。

> [HTTP]

HTTPサービスのパラメータを定義します。

HTTPServerは、RESTful APIを提供します。

> [DB]

PostgreSQLノードデータベースのパラメータを定義します。

> [StatsD]

ノードの操作指標収集ツールStatsDのパラメータを定義します。

> [Centrifugo]

通知サービスCentrifugoのパラメータを定義します。

> [Log]

ログサービスLogのパラメータを定義します。

> [TokenMovement]

トークンの流通サービスTokenMovementのパラメータを定義します。

## サンプル設定ファイル {#an-example-configuration-file}

```
PidFilePath = "/IBAX-data/go-ibax.pid"
LockFilePath = "/IBAX-data/go-ibax.lock"
DataDir = "/IBAX-data"
KeysDir = "/IBAX-data"
TempDir = "/var/folders/_l/9md_m4ms1651mf5pbng1y1xh0000gn/T/IBAX-temp"
FirstBlockPath = "/IBAX-data/1block"
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
  Name = "IBAX"
  Host = "127.0.0.1"
  Port = 5432
  User = "postgres"
  Password = "123456"
  LockTimeout = 5000

[StatsD]
  Host = "127.0.0.1"
  Port = 8125
  Name = "IBAX"

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
