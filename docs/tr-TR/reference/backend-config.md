# Sunucu Yapılandırma Dosyası {#server-configuration-file}

Bu bölümde, sunucu yapılandırma dosyasındaki parametreleri tanıtacağız.
## Sunucu yapılandırma dosyasına giriş  {#introduction-to-the-server-configuration-file}

Sunucu yapılandırma dosyası, IBAX'in düğüm yapılandırmasını tanımlar.
## Konum {#location}

Bu dosya sunucunun çalışma dizininde bulunur ve `config.toml` olarak adlandırılır.
## Bölümler {#sections}

Yapılandırma dosyası aşağıdaki bölümlerden oluşur:

> genel bölüm

DataDir çalışma dizini, FirstBlockPath ilk blok dizini ve diğer parametreleri tanımlar.

> [TCPServer]

TCP hizmet parametrelerini tanımlar.

TCPServer, düğümler arasındaki ağ etkileşimi için kullanılır.

> [HTTP]

HTTP hizmet parametrelerini tanımlar.

HTTPServer, RESTful API'ler sağlar.

> [DB]

PostgreSQL düğüm veritabanının parametrelerini tanımlar.

> [StatsD]

Düğüm işlem göstergesi toplayıcı StatsD'nin parametrelerini tanımlar.

> [Centrifugo]

Centrifugo bildirim hizmetinin parametrelerini tanımlar.

> [Log]

Günlük hizmeti Günlüğünün parametrelerini tanımlar.

> [TokenMovement]

Token dolaşım hizmeti TokenMovement'in parametrelerini tanımlar.

## Örnek bir yapılandırma dosyası {#an-example-configuration-file}
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
