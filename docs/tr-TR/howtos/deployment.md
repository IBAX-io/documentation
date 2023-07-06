# Bir IBAX Ağının Kurulması {#deployment-of-a-ibax-network}
Bu bölümde, size kendi blok zinciri ağınızı nasıl kuracağınızı göstereceğiz.
## Bir dağıtım örneği {#an-deployment-example}

Örnek olarak aşağıdaki üç düğümle bir blok zinciri ağı kurulacaktır.

Üç ağ düğümü:

  * Düğüm 1, blok zinciri ağındaki yeni bloklar oluşturabilen ve kendisine bağlı istemcilerden işlemler gönderebilen ilk düğümdür;
  * Düğüm 2, kendisine bağlı istemcilerden yeni bloklar oluşturabilen ve işlemler gönderebilen başka bir onur düğümüdür;
  * Düğüm 3, yeni bloklar oluşturamayan ancak kendisine bağlı istemcilerden işlem gönderebilen bir koruyucu düğümdür.

Dağıtılacak üç düğümün yapılandırmaları:
* Her düğüm kendi PostgreSQL veritabanı sistemi örneğini kullanır;
* Her düğüm kendi Centrifugo hizmet örneğini kullanır;
* Sunucu tarafı github arka ucu, diğer arka uç bileşenleriyle aynı ana bilgisayara dağıtılır.

Düğümler tarafından kullanılan örnek adresler ve bağlantı noktaları aşağıdaki tabloda açıklanmıştır:

| Node |       Component       |    IP & port     |
| :--: | :-------------------: | :--------------: |
|  1   |      PostgreSQL       |  127.0.0.1:5432  |
|  1   |      Centrifugo       | 192.168.1.1:8000 |
|  1   | go-ibax (TCP service) | 192.168.1.1:7078 |
|  1   | go-ibax (API service) | 192.168.1.1:7079 |
|  2   |      PostgreSQL       |  127.0.0.1:5432  |
|  2   |      Centrifugo       | 192.168.1.2:8000 |
|  2   | go-ibax (TCP service) | 192.168.1.2:7078 |
|  2   | go-ibax (API service) | 192.168.1.2:7079 |
|  3   |      PostgreSQL       |  127.0.0.1:5432  |
|  3   |      Centrifugo       | 192.168.1.3:8000 |
|  3   | go-ibax (TCP service) | 192.168.1.3:7078 |
|  3   | go-ibax (API service) | 192.168.1.3:7079 |

## Dağıtım aşaması {#deploy-phase}
Kendi blok zinciri ağınız birkaç aşamada devreye alınmalıdır:
- [Bir IBAX Ağının Dağıtımı](#deployment-of-a-ibax-network)
  - [Bir dağıtım örneği](#an-deployment-example)
  - [Dağıtım aşaması](#deploy-phase)
  - [Sunucu dağıtımı](#server-deployment)
    - [İlk düğümü dağıtın](#deploy-the-first-node)
    - [Bağımlılıklar ve ortam ayarları](#dependencies-and-environment-settings)
      - [sudo](#sudo)
    - [Golang](#golang)
    - [PostgreSQL](#postgresql)
    - [Centrifugo](#centrifugo)
    - [Dizin yapısı](#directory-structure)
    - [Veritabanı oluştur](#create-a-database)
    - [Centrifugo'yu Yapılandır](#configure-centrifugo)
    - [go-ibax'ı yükleyin](#install-go-ibax)
    - [İlk düğümü yapılandırın](#configure-the-first-node)
    - [İlk düğüm sunucusunu başlat](#initiate-the-first-node-server)
  - [Diğer düğümleri dağıtın](#deploy-other-nodes)
    - [Düğüm 2](#node-2)
    - [Düğüm 3](#node-3)
  - [Frontend dağıtım](#front-end-deployment)
    - [Yazılım önkoşulları](#software-prerequisites)
    - [Bir Weaver uygulaması oluşturun](#build-a-weaver-application)
    - [Blockchain ağı için yapılandırma dosyasını ekleyin](#add-the-configuration-file-for-the-blockchain-network)
    - [Weaver Web Uygulaması Oluşturun](#build-weaver-web-application)
  - [Blockchain ağını yapılandırın](#configure-the-blockchain-network)
    - [İçerik oluşturucu hesabını oluşturun](#create-the-creator-account)
    - [Uygulamaları, rolleri ve şablonları içe aktarın](#import-applications-roles-and-templates)
    - [İlk düğümü düğüm listesine ekleyin](#add-the-first-node-to-the-node-list)
  - [Diğer onur düğümleri ekleyin](#add-other-honor-nodes)
    - [Konsensüs rol grubuna üye ekleyin](#add-members-into-the-consensus-role-group)
    - [Diğer düğümler için sahip hesabı oluşturun](#create-the-owner-account-for-other-nodes)
    - [Düğüm sahibini Doğrulayıcı rolüyle atayın](#assign-the-node-owner-with-the-validators-role)

## Sunucu dağıtımı {#server-deployment}

### İlk düğümü dağıtın {#deploy-the-first-node}

İlk düğüm özel bir düğümdür çünkü blok zinciri ağını başlatmak çok önemlidir. Blok zincirinin ilk bloğu, ilk düğüm tarafından oluşturulur ve diğer tüm düğümler blok zincirini ondan indirir. İlk düğümün sahibi platform yaratıcısıdır.

### Bağımlılıklar ve ortam ayarları {#dependencies-and-environment-settings}

#### sudo {#sudo}

Debian 9'un tüm komutları, root olmayan bir kullanıcı olarak çalıştırılmalıdır. Ancak, bazı sistem komutlarının yürütülmesi için süper kullanıcı izinleri gerekir. Varsayılan olarak, sudo Debian 9'da kurulu değildir, önce onu kurmalısınız.

1. Süper kullanıcı olun.

```shell
su -
```

2. Sisteminizi yükseltin.

```shell
apt update -y && apt upgrade -y && apt dist-upgrade -y
```

3. Install sudo。

```shell
apt install sudo -y
```

4. Kullanıcınızı sudo grubuna ekleyin.

```shell
usermod -a -G sudo user
```

5. Yeniden başlattıktan sonra değişiklikler geçerli olur.
   
### Golang {#golang}

Go'yu [Resmi Dokümantasyona](https://golang.org/doc/install#tarball) göre yükleyin.

1. Go'nun en son kararlı sürümünü (> 1.10.x) [Golang resmi web sitesinden](https://golang.org/dl/) veya komut satırından indirin:

```shell
wget https://dl.google.com/go/go1.11.2.linux-amd64.tar.gz
```

2. Tarball'ı `/usr/local` dizinine çıkarmak için tar kullanın.

```shell
tar -C /usr/local -xzf go1.11.2.linux-amd64.tar.gz
```

3. PATH ortam değişkenlerine `/usr/local/go/bin` ekleyin (`/etc/profile` veya `$HOME/.profile` konumunda bulunur).

```shell
export PATH=$PATH:/usr/local/go/bin
```

1. Değişikliklerin etkili olması için "source" dosyasını çalıştırın, örneğin:

```shell
source $HOME/.profile
```

2. Geçici dosyaları silin:

```shell
rm go1.11.2.linux-amd64.tar.gz
```

### PostgreSQL {#postgresql}

1. PostgreSQL (> v.10) ve psql'yi kurun:

```shell
sudo apt install -y postgresql
```

### Centrifugo {#centrifugo}

1. Centrifugo V.1.8.0'ı [GitHub](https://github.com/centrifugal/centrifugo/releases/) adresinden veya komut satırından indirin:

```shell
wget https://github.com/centrifugal/centrifugo/releases/download/v1.8.0/centrifugo-1.8.0-linux-amd64.zip \
&& unzip centrifugo-1.8.0-linux-amd64.zip \
&& mkdir centrifugo \
&& mv centrifugo-1.8.0-linux-amd64/* centrifugo/
```

2. Geçici dosyaları silin:

```shell
rm -R centrifugo-1.8.0-linux-amd64 \
&& rm centrifugo-1.8.0-linux-amd64.zip
```

### Dizin yapısı {#directory-structure}

Debian 9 sistemi için blockchain platformu tarafından kullanılan tüm yazılımların ayrı bir dizinde saklanması önerilir.

`/opt/backenddir` dizini burada kullanılır, ancak herhangi bir dizini kullanabilirsiniz. Bu durumda, lütfen tüm komutları ve yapılandırma dosyalarını buna göre değiştirin.

1. Blok zinciri platformu için bir dizin oluşturun:

```shell
sudo mkdir /opt/backenddir
```

2. Kullanıcınızı dizinin sahibi yapın:

```shell
sudo chown user /opt/backenddir/
```

3. Centrifugo, go-ibax ve düğüm verileri için alt dizinler oluşturun. Tüm düğüm verileri, "X" düğüm numarası olmak üzere "nodeX" adlı bir dizinde depolanır. Dağıtılacak düğüme göre, "düğüm1" Düğüm 1'dir, "düğüm2" Düğüm 2'dir vb.

```shell
mkdir /opt/backenddir/go-ibax \
mkdir /opt/backenddir/go-ibax/node1 \
mkdir /opt/backenddir/centrifugo \
```

### Veritabanı oluştur {#create-a-database}

1. Kullanıcı parolasını postgres varsayılan parolası *123456* ile değiştirin. Kendi parolanızı belirleyebilirsiniz, ancak bunu *config.toml* düğüm yapılandırma dosyasında değiştirmelisiniz.

```shell
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '123456'"
```

2. Düğüm için geçerli bir durum veritabanı oluşturun, örneğin **chaindb**:

```shell
sudo -u postgres psql -c "CREATE DATABASE chaindb"
```

### Centrifugo Yapılandırın {#configure-centrifugo}

1. Centrifugo yapılandırma dosyasını oluşturun:

```shell
echo '{"secret":"CENT_SECRET"}' > /opt/backenddir/centrifugo/config.json
```

Kendi *gizlinizi* ayarlayabilirsiniz, ancak bunu *config.toml* düğüm yapılandırma dosyasında da değiştirmelisiniz.

### go-ibax'ı kurun {#install-go-ibax}

1. GitHub'dan github-backend'i indirin:
2. go-ibax ikili dosyasını `/opt/backenddir/go-ibax` dizinine kopyalayın. Varsayılan Go çalışma alanını kullanıyorsanız, ikili dosyalar `$HOME/go/bin` dizininde bulunur:

```shell
cp $HOME/go/bin/go-ibax /opt/backenddir/go-ibax
```

### İlk düğümü yapılandırın {#configure-the-first-node}

3. Düğüm 1 için yapılandırma dosyasını oluşturun:

```shell
/opt/backenddir/go-ibax config \
 --dataDir=/opt/backenddir/node1 \
 --dbName=chaindb \
 --centSecret="CENT_SECRET" --centUrl=http://192.168.1.1:8000 \
 --httpHost=192.168.1.1 \
 --httpPort=7079 \
 --tcpHost=192.168.1.1 \
 --tcpPort=7078
```

4. Düğümün ve hesabın genel ve özel anahtarları dahil olmak üzere Düğüm 1'in anahtarlarını oluşturun:
```shell
/opt/backenddir/go-ibax generateKeys \
 --config=/opt/backenddir/node1/config.toml
```

5. İlk bloğu oluşturun:

> Not
>
> Kendi blok zinciri ağınızı oluşturmak istiyorsanız, `--test=true' seçeneğini kullanmalısınız. Aksi takdirde yeni bir hesap oluşturamazsınız.

```shell
/opt/backenddir/go-ibax generateFirstBlock \
 --config=/opt/backenddir/node1/config.toml \
 --test=true
```

6. Veritabanını başlatın:

```shell
/opt/backenddir/go-ibax initDatabase \
 --config=/opt/backenddir/node1/config.toml
```

### İlk düğüm sunucusunu başlatın {#initiate-the-first-node-server}

İlk düğüm sunucusunu başlatmak için aşağıdaki iki hizmeti başlatmanız gerekir:
* Centrifugo
* go-ibax

Bu dosyalarla [hizmetler](https://wiki.debian.org/systemd/Services) oluşturamadıysanız, farklı konsollardaki dizinlerden ikili dosyaları çalıştırabilirsiniz.

1. Centrifugo çalıştırın:

```shell
/opt/backenddir/centrifugo/centrifugo \
 -a 192.168.1.1 -p 8000 \
 --config /opt/backenddir/centrifugo/config.json
```

2. go-ibax'ı çalıştırın:

```shell
/opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node1/config.toml
```

## Diğer düğümleri dağıtın {#deploy-other-nodes}

Diğer tüm düğümlerin (Düğüm 2 ve Düğüm 3) konuşlandırılması birincisine benzer olsa da, üç fark vardır:

* İlk bloğu oluşturmanız gerekmez. Ancak, Düğüm 1'den geçerli düğüm veri dizinine kopyalanması gerekir;
* Düğüm, `--nodesAddr` seçeneğini yapılandırarak Düğüm 1'den blokları indirmelidir;
* Düğüm kendi adreslerini ve portlarını kullanmalıdır.

### Düğüm 2 {#node-2}

Aşağıda gösterildiği gibi çalıştırma talimatlarını izleyin:

1. [Bağımlılıklar ve ortam ayarları](#dependencies-and-environment-settings)
2. [Veritabanı oluştur](#create-a-database)
3. [Centrifugo](#Centrifugo)
4. [go-ibax'ı yükleyin](#install-go-ibax)
5. Düğüm 2 için yapılandırma dosyasını oluşturun:

```shell
 /opt/backenddir/go-ibax config \
--dataDir=/opt/backenddir/node2 \
--dbName=chaindb \
--centSecret="CENT_SECRET" --centUrl=http://192.168.1.2:8000 \
--httpHost=192.168.1.2 \
--httpPort=7079 \
--tcpHost=192.168.1.2 \
--tcpPort=7078 \
--nodesAddr=192.168.1.1
```

6. İlk blok dosyasını Düğüm 2'ye kopyalayın. Örneğin, bu işlemi Düğüm 2 üzerinden scp üzerinden gerçekleştirebilirsiniz:

```shell
 scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node2/
```

7. Düğümün ve hesabın genel ve özel anahtarları dahil olmak üzere Düğüm 2'nin anahtarlarını oluşturun:

```shell
 /opt/backenddir/go-ibax generateKeys \
--config=/opt/backenddir/node2/config.toml
```

8. Veritabanını başlatın:

```shell
 ./go-ibax initDatabase --config\=node2/config.toml
```

9. Çalıştır centrifugo:

```shell
/opt/backenddir/centrifugo/centrifugo \
-a 192.168.1.2 -p 8000 \
--config/opt/backenddir/centrifugo/config.json
```

10. Çalıştır go-ibax:

```shell
/opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node2/config.toml
```

Sonuç olarak, düğüm bloğu ilk düğümden indirir. Bu düğüm bir doğrulama düğümü olmadığı için yeni bir blok oluşturamaz. Düğüm 2, daha sonra doğrulama düğümleri listesine eklenecektir.

### Düğüm 3 {#node-3}

Aşağıda gösterildiği gibi çalıştırma talimatlarını izleyin:

1. [Bağımlılıklar ve ortam ayarları](#dependencies-and-environment-settings)

2. [Veritabanı oluştur](#create-a-database)

3. [Centrifugo](#Centrifugo)

4. [go-ibax'ı yükleyin](#install-go-ibax)

5. Düğüm 3 için yapılandırma dosyasını oluşturun:

```shell
 /opt/backenddir/go-ibax config \
--dataDir=/opt/backenddir/node3 \
--dbName=chaindb \
--centSecret="CENT_SECRET" --centUrl=http://192.168.1.3:8000 \
--httpHost=192.168.1.3 \
--httpPort=7079 \
--tcpHost=192.168.1.3 \
--tcpPort=7078 \
--nodesAddr=192.168.1.1
```

6. İlk blok dosyasını Düğüm 3'e kopyalayın. Örneğin, bu işlemi Düğüm 3'te scp aracılığıyla gerçekleştirebilirsiniz:

```shell
 scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node3/
```

7. Düğümün ve hesabın genel ve özel anahtarları dahil olmak üzere Düğüm 3'ün anahtarını oluşturun:

```shell
 /opt/backenddir/go-ibax generateKeys \
--config=/opt/backenddir/node3/config.toml
```

8. Veritabanını başlatın:

```shell
 ./go-ibax initDatabase --config=node3/config.toml
```

9.Çalıştır centrifugo:

```shell
 /opt/backenddir/centrifugo/centrifugo \
-a 192.168.1.3 -p 8000 \
--config/opt/backenddir/centrifugo/config.json
```

10.Çalıştır go-ibax:

```shell
 /opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node3/config.toml
```

Sonuç olarak, düğüm bloğu ilk düğümden indirir. Bu düğüm bir doğrulama düğümü olmadığı için yeni bir blok oluşturamaz. İstemci düğüme bağlı olabilir ve ağa işlemler gönderebilir.

## Front-end dağıtımı {#front-end-deployment}

Yalnızca Debian 9 (Stretch) 64-bit Resmi Sürümüne **GNOME GUI** yüklendikten sonra, Govis istemcisi "yarn" paket yöneticisiyle oluşturulabilir.

### Yazılım önkoşulları {#software-prerequisites}

1. Node.js LTS sürüm 8.11'i Node.js resmi web sitesinden veya komut satırından indirin:

```shell
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash
```

2. Node.js'yi yükleyin:

```shell
sudo apt install -y nodejs
```

1. Yarn [Github](https://github.com/yarnpkg/yarn/releases) deposundan veya komut satırından Yarn 1.7.0 sürümünü indirin:

```shell
cd/opt/backenddir \
&& wget https://github.com/yarnpkg/yarn/releases/download/v1.7.0/yarn_1.7.0_all.deb
```

2. Kur Yarn:

```shell
sudo dpkg -i yarn_1.7.0_all.deb && rm yarn_1.7.0_all.deb
```

### Bir Weaver uygulaması oluşturun {#build-a-weaver-application}

1. Weaver'ın en son sürümünü github-frontend'den git aracılığıyla indirin:

```shell
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/ibax-front.git
```

2. Install Weaver dependencies via Yarn:

```shell
cd/opt/backenddir/ibax-front/ \
&& yarn install
```

### Blok zinciri ağı için yapılandırma dosyasını ekleyin {#add-the-configuration-file-for-the-blockchain-network}

1. Düğüm bağlantısı hakkında bilgi içeren bir *settings.json* dosyası oluşturun:

```shell
cp/opt/backenddir/ibax-front/public/settings.json.dist \
 /opt/backenddir/ibax-front/public/public/settings.json
```
 
2. *settings.json* dosyasını herhangi bir metin düzenleyicide düzenleyin ve gerekli ayarları bu biçimde ekleyin:

```
http://Node_IP-address:Node_HTTP-Port
```

Üç düğüm için *settings.json* dosyası örnekleri:

```json
{
  "fullNodes": [
    "http://192.168.1.1:7079",
    "http://192.168.1.2:7079",
    "http://192.168.1.3:7079"
  ]
}
```

Weaver Masaüstü Uygulaması Oluşturun

1.Masaüstü sürümünü oluşturmak için yarn kullanın:

```shell
cd/opt/backenddir/ibax-front \
&& yarn build-desktop
```

2.Masaüstü sürümü, AppImage son eki biçiminde paketlenecektir:

```shell
yarn release --publish never -l
```

Oluşturulduktan sonra uygulamanız kullanılabilir ancak bağlantı konfigürasyonu değiştirilemez. Bu ayarların değiştirilmesi gerekiyorsa, uygulamanın yeni bir sürümü oluşturulmalıdır.

### Weaver Web Uygulaması Oluşturun {#build-weaver-web-application}

1. Bir web uygulaması oluşturun:

```shell
cd/opt/backenddir/ibax-front/ \
&& yarn build
```

Oluşturulduktan sonra yeniden dağıtılabilir dosyalar /build dizinine yerleştirilecektir. Dağıtım için istediğiniz herhangi bir web sunucusunu kullanabilirsiniz ve *settings.json* dosyası da bu dizine yerleştirilmelidir. Bağlantı ayarları değiştirilirse uygulamayı yeniden oluşturmaya gerek olmadığını unutmayın. Bunun yerine *settings.json* dosyasını düzenleyin ve web sunucusunu yeniden başlatın.

1. Geliştirme veya test amacıyla Yarn'ın web sunucusunu oluşturabilirsiniz:

```shell
sudo yarn global add serve \
&& serve -s build
```

Bundan sonra, Weaver web uygulamanız şu konumda kullanılabilir olacaktır: `http://localhost:5000`.

## Blok zinciri ağını yapılandırın {#configure-the-blockchain-network}

### İçerik oluşturucu hesabını oluşturun {#create-the-creator-account}

İlk düğüm sahibi için bir hesap oluşturun. Bu hesap, yeni blok zinciri platformunun yaratıcısıdır ve yönetici erişimine sahiptir.

1. Weaver'ı çalıştırın;

2. Aşağıdaki verileri kullanarak mevcut hesabı içe aktarın:

– `/opt/backenddir/node1/PrivateKey` dosyasında bulunan düğüm sahibinin özel anahtarının yedeğini yükleyin.

> Not
>
>Bu dizinde iki özel anahtar dosyası vardır. `PrivateKey` dosyası, düğüm sahibinin hesabını oluşturmak için kullanılır. 'NodePrivateKey' dosyası, düğümün kendisinin özel anahtarıdır ve gizli tutulmalıdır.

3.Hesaba giriş yaptıktan sonra, şu anda herhangi bir rol oluşturulmadığı için lütfen Rolsüz seçeneğini seçiniz.

### Uygulamaları, rolleri ve şablonları içe aktarın {#import-applications-roles-and-templates}

Şu anda, blockchain platformu boş bir durumda. Temel ekosistem işlevlerini destekleyen roller, şablonlar ve uygulama çerçeveleri ekleyerek yapılandırabilirsiniz.

1.Uygulama deposunu klonlayın;

```shell
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/dapps.git
```

2. Weaver'da Geliştirici> İçe Aktar'a gidin;

3. Uygulamaları aşağıdaki sıraya göre içe aktarın:
```
 A./opt/backenddir/dapps/system.json 
 B./opt/backenddir/dapps/conditions.json 
 C./opt/backenddir/dapps/basic.json 
 D./opt/backenddir/dapps/lang_res.json
```

4. Yönetici> Rol'e gidin ve Varsayılan Rolü Yükle'ye tıklayın;

5.Sağ üst köşedeki konfigürasyon dosyası menüsünden sistemden çıkın;

6.Sisteme Yönetici olarak giriş yapın;

7. Ana Sayfa> Oy> Şablon Listesi'ne gidin ve Varsayılan Şablonu Yükle'ye tıklayın.

### İlk düğümü düğüm listesine ekleyin {#add-the-first-node-to-the-node-list}

1.Geliştirici> Platform Parametreleri'ne gidin ve first_nodes parametresini tıklayın;

2.İlk blok zinciri ağ düğümünün parametrelerini belirtin.

  * public_key - Düğümün genel anahtarı `/opt/backenddir/node1/NodePublicKey` dosyasında bulunur;

```
{"api_address":"http://192.168.1.1:7079","public_key":"%node_public_key%","tcp_address":"192.168.1.1:7078"}
```

## Başka Honor düğümleri ekleyin {#add-other-honor-nodes}

### Konsensüs rol grubuna üye ekleyin {#add-members-into-the-consensus-role-group}

Varsayılan olarak, yalnızca fikir birliği rolü (Consensus) grubundaki üyeler, diğer ana düğümleri eklemek için gereken oylamaya katılabilir. Bu, yeni bir ana düğüm eklemeden önce ekosistem üyelerinin role atanması gerektiği anlamına gelir.
Bu bölümde, içerik oluşturucunun hesabı, fikir birliği rol grubunun tek üyesi olarak belirlenir. Bir üretim ortamında, bu rolün yönetişimi gerçekleştiren platform üyelerine atanması gerekir.

1. Ana Sayfa> Rol'e gidin ve Konsensüs'e tıklayın;

2. Oluşturanın hesabını role atamak için Ata'yı tıklayın.

### Diğer düğümler için sahip hesabı oluşturun {#create-the-owner-account-for-other-nodes}

1. Weaver'ı çalıştırın;

2. Aşağıdaki verileri kullanarak mevcut hesabı içe aktarın:
     – `/opt/backenddir/node2/PrivateKey` dosyasında bulunan düğüm sahibinin özel anahtarının yedeğini yükleyin.
     
3. Hesaba giriş yaptıktan sonra, şu anda herhangi bir rol oluşturulmadığı için lütfen Rolsüz seçeneğini seçin.

4. Ana Sayfa> Kişisel Bilgiler'e gidin ve kişisel bilgilerin başlığına tıklayın;

5. Hesap ayrıntılarını ekleyin (kişisel bilgi başlığı, açıklama vb.).

### Doğrulayıcı rolüyle düğüm sahibini atayın {#assign-the-node-owner-with-the-validators-role}

1. Yeni düğüm sahibi tarafından yapılan işlemler:
    1. Ana Sayfa> Doğrulayıcı'ya gidin;
    2. Talep Oluştur'a tıklayın ve doğrulayıcı adayın başvuru formunu doldurun;
    3. İstek gönder'e tıklayın.
2. Oluşturucu tarafından yapılan işlemler:
    1. Konsensüs rolüyle oturum açın (Consensus);
    2. Ana Sayfa> Doğrulayıcı'ya gidin;
    3. Adayın isteğine göre oylamaya başlamak için "Oynat" simgesine tıklayın;
    4. Ana Sayfa> Oy'a gidin ve Oylama durumunu güncelle'yi tıklayın;
    5. Oylama adına tıklayın ve düğüm sahibi için oy verin.

Sonuç olarak, yeni düğümün sahibinin hesabına Doğrulayıcı rolü atanır ve yeni düğüm, ana düğümler listesine eklenir.