# 서버 구성 파일 {#server-configuration-file}

이 섹션에서는 서버 구성 파일 매개변수에 대해 설명합니다.

## 서버 구성 파일 소개 {#introduction-to-the-server-configuration-file}

서버 구성 파일은 IBAX 블록체인 플랫폼 노드의 구성을 정의합니다.

## 위치 {#location}

이 파일은 서버 작업 디렉토리에 `config.toml`이라는 이름으로 위치합니다.

## 섹션 {#sections}

구성 파일에는 다음과 같은 섹션이 있습니다.

> 일반 부분

    작업 디렉토리 DataDir, 첫 번째 블록 디렉토리 FirstBlockPath 등의 매개변수를 정의합니다.

> [TCPServer]

    TCP 서버 매개변수를 정의합니다.

    TCPServer는 노드 간의 네트워크 상호작용에 사용됩니다.

> [HTTP]

    HTTP 서버 매개변수를 정의합니다.

    HTTPServer는 RESTful API를 제공합니다.

> [DB]

    PostgreSQL 노드 데이터베이스 매개변수를 정의합니다.

> [StatsD]

    작업 지표 수집기인 StatsD의 매개변수를 정의합니다.

> [Centrifugo]

    알림 서비스 Centrifugo의 매개변수를 정의합니다.

> [Log]

    로그 서비스 Log의 매개변수를 정의합니다.

> [TokenMovement]

    토큰 이동 서비스 TokenMovement의 매개변수를 정의합니다.

## 설정 파일 예시 {#an-example-configuration-file}

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
