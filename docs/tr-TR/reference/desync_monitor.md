# Senkronize İzleme Aracı {#synchronized-monitoring-tool}

Desync_monitor, belirtilen düğümdeki veritabanının senkronize edilip edilmediğini doğrulamak için kullanılabilecek özel bir araçtır.

Araç, arka plan programı olarak kullanılabilir veya tek seferlik bir kontrol gerçekleştirmek için başlatılabilir.

Aletin çalışma prensibi aşağıdakilere dayanmaktadır:

1.Her blok, tüm işlemlerin tüm değişikliklerinin karmasını içerir, belirtilen düğümden son blok kimliğini sağlamasını isteyin;
2.Ardından tüm düğümlerden bu ID ile bir blok talep edin ve yukarıdaki hash'leri karşılaştırın;
3.Eğer hashler farklı ise, komutta belirtilen e-posta adresine bir senkronizasyon hata mesajı gönderilecektir.

## Konum {#location}
Araç, `tools/desync_monitor/` dizininde bulunur.

## Komut istemi bayrakları {#command-prompt-flags}
Komut isteminden aşağıdaki bayraklar kullanılabilir:
* confPath - Yapılandırma dosyasının yolu. Varsayılan dosya adı `config.toml`dur;
* nodeList - İstenen bloğun virgülle ayrılmış düğüm listesi. Varsayılan "127.0.0.1:7079"dur;
* daemonMode - Bir arka plan programı olarak başlatılır ve her N saniyede bir kimlik doğrulama gerektiğinde kullanılmalıdır. Bu bayrak varsayılan olarak "yanlış" olarak ayarlanmıştır;
* queryingPeriod - Araç bir arka plan programı olarak başlatılırsa, bu parametre kontroller arasındaki zaman aralığını (saniye cinsinden) varsayılan olarak "1" saniye olarak ayarlar.
* alertMessageTo – Senkronizasyon uyarı hatalarının gönderileceği e-posta adresi.
    * alertMessageSubj - Uyarı mesajındaki mesaj konusu, varsayılan olarak `düğüm senkronizasyonu` sorunu;
    * alertMessageFrom - Mesajın gönderildiği adres.
    * smtpHost - e-posta göndermek için kullanılan SMTP sunucusu ana bilgisayarı, varsayılan olarak `""`;
    * smtpPort - e-posta mesajları göndermek için kullanılan SMTP sunucu bağlantı noktası, varsayılan olarak "25";
    * smtpUsername - SMTP sunucusu kullanıcı adı, varsayılan olarak `""`;
    * smtpPassword - SMTP sunucu şifresi, varsayılan olarak `""`.

## Yapılandırma {#configuration}
Araç, toml formatında bir yapılandırma dosyası kullanır.

Varsayılan olarak, ikili dosyanın başlatılacağı klasördeki config.toml dosyasını arayacaktır.

Dosya yolu, configPath bayrağıyla değiştirilebilir.

```
nodes_list = ["http://127.0.0.1:7079", "http://127.0.0.1:7002"]

[daemon]
daemon = false
querying_period = 1

[alert_message]
to = ""
subject = "problem with xxx nodes"
from = ""

[smtp]
host = ""
port = 25
username = ""
password = ""
```

### node_list {#nodes-list}
* knot_list - Bilgi isteyen düğümlerin (ana bilgisayarların) listesi.

### [arka plan programı] {#daemon}
Daemon modunun konfigürasyonu.
* daemon_mode – Bir araç, bir arka plan programı olarak çalışır ve senkronizasyon kontrollerini gerçekleştirir.
* querying_period - Senkronizasyon kontrolleri arasındaki zaman aralığı.

### [uyarı mesajı] {#alert-message}
Uyarı mesajı parametreleri.
* için - alıcının senkronizasyon hatası uyarı mesajlarının e-postası;
* konu - mesaj konusu;
* gönderenin e-posta adresinden.

### [smtp] {#smtp}
Senkronizasyon hata mesajlarını göndermek için kullanılan Basit Posta Aktarım Protokolü (SMTP) sunucu parametreleri.
* ana bilgisayar – SMTP sunucu host;
* bağlantı noktası –SMTP sunucu bağlantı noktası;
* kullanıcı adı – SMTP sunucusu kullanıcı adı;
* şifre –SMTP sunucu şifresi;