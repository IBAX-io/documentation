# IBAX 네트워크 배포 {#deployment-of-a-ibax-network}
이 섹션에서는 직접 블록체인 네트워크를 배포하는 방법을 안내합니다.

## 배포 예제 (An deployment example) {#an-deployment-example}

다음과 같이 세 개의 노드로 구성된 예시 블록체인 네트워크를 배포할 것입니다.

세 개의 네트워크 노드:

  * 노드 1은 블록체인 네트워크에서 첫 번째 노드로, 클라이언트로부터 새로운 블록을 생성하고 트랜잭션을 보낼 수 있습니다.
  * 노드 2는 다른 의미있는 노드로, 클라이언트로부터 새로운 블록을 생성하고 트랜잭션을 보낼 수 있습니다.
  * 노드 3은 가디언 노드로, 새로운 블록을 생성할 수는 없지만, 클라이언트로부터 트랜잭션을 보낼 수 있습니다.

배포할 세 개의 노드의 구성:
* 각 노드는 독립적인 PostgreSQL 데이터베이스 시스템 인스턴스를 사용합니다.
* 각 노드는 독립적인 Centrifugo 서비스 인스턴스를 사용합니다.
* 서버 측 github-backend는 다른 백엔드 구성 요소와 동일한 호스트에 배포됩니다.

노드에서 사용되는 샘플 주소와 포트는 다음 표에 설명되어 있습니다:


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

## 배포 단계 (Deploy phase) {#deploy-phase}
자체 블록체인 네트워크는 여러 단계로 배포되어야 합니다.

- [IBAX 네트워크 배포](#deployment-of-a-ibax-network)
  - [배포 예제](#an-deployment-example)
  - [배포 단계](#deploy-phase)
  - [서버 배포](#server-deployment)
    - [첫 번째 노드 배포](#deploy-the-first-node)
    - [의존성 및 환경 설정](#dependencies-and-environment-settings)
      - [sudo](#sudo)
    - [Golang](#golang)
    - [PostgreSQL](#postgresql)
    - [Centrifugo](#centrifugo)
    - [디렉토리 구조](#directory-structure)
    - [데이터베이스 생성](#create-a-database)
    - [Centrifugo 구성](#configure-centrifugo)
    - [go-ibax 설치](#install-go-ibax)
    - [첫 번째 노드 구성](#configure-the-first-node)
    - [첫 번째 노드 서버 초기화](#initiate-the-first-node-server)
  - [다른 노드 배포](#deploy-other-nodes)
    - [노드 2](#node-2)
    - [노드 3](#node-3)
  - [프론트엔드 배포](#front-end-deployment)
    - [소프트웨어 전제 조건](#software-prerequisites)
    - [Weaver 애플리케이션 빌드](#build-a-weaver-application)
    - [블록체인 네트워크를 위한 구성 파일 추가](#add-the-configuration-file-for-the-blockchain-network)
    - [Weaver 웹 애플리케이션 빌드](#build-weaver-web-application)
  - [블록체인 네트워크 구성](#configure-the-blockchain-network)
    - [창조자 계정 생성](#create-the-creator-account)
    - [애플리케이션, 역할 및 템플릿 가져오기](#import-applications-roles-and-templates)
    - [첫 번째 노드를 노드 목록에 추가](#add-the-first-node-to-the-node-list)
  - [다른 의미있는 노드 추가](#add-other-honor-nodes)
    - [콘센서스 역할 그룹에 구성원 추가](#add-members-into-the-consensus-role-group)
    - [다른 노드의 소유자 계정 생성](#create-the-owner-account-for-other-nodes)
    - [노드 소유자에게 Validators 역할 할당](#assign-the-node-owner-with-the-validators-role)


## 서버 배포 (Server deployment) {#server-deployment}

### 첫 번째 노드 배포 (Deploy the first node) {#deploy-the-first-node}

첫 번째 노드는 블록체인 네트워크를 시작하는 데 필수적이기 때문에 특별한 노드입니다. 블록체인의 첫 번째 블록은 첫 번째 노드에서 생성되며 다른 모든 노드는 여기에서 블록체인을 다운로드합니다. 첫 번째 노드의 소유자는 플랫폼 생성자입니다.

### 의존성 및 환경 설정 (Dependencies and environment settings) {#dependencies-and-environment-settings}

#### sudo {#sudo}

Debian 9의 모든 명령은 루트가 아닌 사용자로 실행해야 합니다. 그러나 일부 시스템 명령을 실행하려면 수퍼유저 권한이 필요합니다. 기본적으로 sudo는 Debian 9에 설치되지 않으므로 먼저 설치해야 합니다.

1. 슈퍼 유저가 되십시오.

```shell
su -
```

2. 시스템을 업그레이드하십시오.

```shell
apt update -y && apt upgrade -y && apt dist-upgrade -y
```

3. sudo를 설치합니다.

```shell
apt install sudo -y
```

4. sudo 그룹에 사용자를 추가합니다.

```shell
usermod -a -G sudo user
```

5. 다시 시작하면 변경 사항이 적용됩니다.
   
### Golang {#golang}

[공식 문서](https://golang.org/doc/install#tarball)에 따라 Go를 설치합니다.

1. [Golang 공식 웹사이트](https://golang.org/dl/) 또는 명령줄을 통해 안정적인 최신 버전의 Go(> 1.10.x)를 다운로드합니다.

```shell
wget https://dl.google.com/go/go1.11.2.linux-amd64.tar.gz
```

2. tar를 사용하여 tarball을 `/usr/local` 디렉토리에 추출합니다.

```shell
tar -C /usr/local -xzf go1.11.2.linux-amd64.tar.gz
```

3. `/usr/local/go/bin`을 PATH 환경 변수에 추가합니다(`/etc/profile` 또는 `$HOME/.profile`에 있음).

```shell
export PATH=$PATH:/usr/local/go/bin
```

1. `source` 파일을 실행하여 변경 사항을 적용합니다. 예를 들면 다음과 같습니다.

```shell
source $HOME/.profile
```

2. 임시 파일 삭제:

```shell
rm go1.11.2.linux-amd64.tar.gz
```

### PostgreSQL {#postgresql}

1. PostgreSQL(> v.10) 및 psql을 설치합니다.

```shell
sudo apt install -y postgresql
```

### Centrifugo {#centrifugo}

1. [GitHub](https://github.com/centrifugal/centrifugo/releases/) 또는 명령줄을 통해 Centrifugo V.1.8.0을 다운로드합니다.

```shell
wget https://github.com/centrifugal/centrifugo/releases/download/v1.8.0/centrifugo-1.8.0-linux-amd64.zip \
&& unzip centrifugo-1.8.0-linux-amd64.zip \
&& mkdir centrifugo \
&& mv centrifugo-1.8.0-linux-amd64/* centrifugo/
```

2. 임시 파일 삭제:

```shell
rm -R centrifugo-1.8.0-linux-amd64 \
&& rm centrifugo-1.8.0-linux-amd64.zip
```

### 디렉토리 구조 (Directory structure) {#directory-structure}

Debian 9 시스템의 경우 블록체인 플랫폼에서 사용하는 모든 소프트웨어를 별도의 디렉토리에 저장하는 것이 좋습니다.

여기서는 `/opt/backenddir` 디렉토리가 사용되지만 아무 디렉토리나 사용할 수 있습니다. 이 경우 모든 명령과 구성 파일을 적절하게 변경하십시오.

1. 블록체인 플랫폼용 디렉토리를 생성합니다.

```shell
sudo mkdir /opt/backenddir
```

2. 사용자를 디렉터리의 소유자로 만듭니다.

```shell
sudo chown user /opt/backenddir/
```

3. Centrifugo, go-ibax 및 노드 데이터용 하위 디렉토리를 만듭니다. 모든 노드 데이터는 `nodeX`라는 디렉토리에 저장되며 여기서 `X`는 노드 번호입니다. 배포할 노드에 따라 'node1'은 노드 1, 'node2'는 노드 2 등입니다.

```shell
mkdir /opt/backenddir/go-ibax \
mkdir /opt/backenddir/go-ibax/node1 \
mkdir /opt/backenddir/centrifugo \
```

### 데이터베이스 생성 (Create a database) {#create-a-database}

1. 사용자 비밀번호 postgres를 기본 비밀번호 *123456*으로 변경합니다. 자신의 암호를 설정할 수 있지만 노드 구성 파일 *config.toml*에서 변경해야 합니다.

```shell
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '123456'"
```

2. **chaindb**와 같은 노드의 현재 상태 데이터베이스를 생성합니다.

```shell
sudo -u postgres psql -c "CREATE DATABASE chaindb"
```

### Centrifugo 구성 (Configure Centrifugo) {#configure-centrifugo}

1. Centrifugo 구성 파일을 생성합니다.

```shell
echo '{"secret":"CENT_SECRET"}' > /opt/backenddir/centrifugo/config.json
```

고유한 *secret*을 설정할 수 있지만 노드 구성 파일 *config.toml*에서도 변경해야 합니다.

### go-ibax 설치 (Install go-ibax) {#install-go-ibax}

1. GitHub에서 github-backend를 다운로드합니다.
2. go-ibax 바이너리 파일을 `/opt/backenddir/go-ibax` 디렉터리에 복사합니다. 기본 Go 작업 영역을 사용하는 경우 바이너리 파일은 `$HOME/go/bin` 디렉터리에 있습니다.

```shell
cp $HOME/go/bin/go-ibax /opt/backenddir/go-ibax
```

### 첫 번째 노드 구성 (Configure the first node) {#configure-the-first-node}

3. 노드 1에 대한 구성 파일을 생성합니다.

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

4. 노드와 계정의 공개 및 개인 키를 포함하여 노드 1의 키를 생성합니다.

```shell
/opt/backenddir/go-ibax generateKeys \
 --config=/opt/backenddir/node1/config.toml
```

5. 첫 번째 블록 생성:

> 참고
>
> 자체 블록체인 네트워크를 생성하려면 `--test=true` 옵션을 사용해야 합니다. 그렇지 않으면 새 계정을 만들 수 없습니다.

```shell
/opt/backenddir/go-ibax generateFirstBlock \
 --config=/opt/backenddir/node1/config.toml \
 --test=true
```

6. 데이터베이스를 초기화합니다.

```shell
/opt/backenddir/go-ibax initDatabase \
 --config=/opt/backenddir/node1/config.toml
```

### 첫 번째 노드 서버 초기화 (Initiate the first node server) {#initiate-the-first-node-server}

첫 번째 노드 서버를 시작하려면 다음 두 서비스를 시작해야 합니다.
* 원심분리기
* 고이백스

이러한 파일로 [services](https://wiki.debian.org/systemd/Services)를 만들지 못한 경우 다른 콘솔의 디렉터리에서 바이너리 파일을 실행할 수 있습니다.

1. 원심분리기를 실행합니다.

```shell
/opt/backenddir/centrifugo/centrifugo \
 -a 192.168.1.1 -p 8000 \
 --config /opt/backenddir/centrifugo/config.json
```

2. go-ibax를 실행합니다.

```shell
/opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node1/config.toml
```

## 다른 노드 배포 (Deploy other nodes) {#deploy-other-nodes}

다른 모든 노드(노드 2 및 노드 3)의 배포는 첫 번째와 유사하지만 세 가지 차이점이 있습니다.

* 첫 번째 블록을 생성할 필요가 없습니다. 그러나 노드 1에서 현재 노드 데이터 디렉터리로 복사해야 합니다.
* 노드는 `--nodesAddr` 옵션을 구성하여 노드 1에서 블록을 다운로드해야 합니다.
* 노드는 자체 주소와 포트를 사용해야 합니다.

### 노드 2 (Node 2) {#node-2}

아래와 같이 작동 지침을 따르십시오.

1. [종속성 및 환경 설정](#dependencies-and-environment-settings)
2. [데이터베이스 생성](#create-a-database)
3. [센트리퓨고](#centrifugo)
4. [go-ibax 설치](#install-go-ibax)
5. 노드 2에 대한 구성 파일을 생성합니다.

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

6. 첫 번째 블록 파일을 노드 2에 복사합니다. 예를 들어 노드 2에서 scp를 통해 이 작업을 수행할 수 있습니다.

```shell
 scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node2/
```

7. 노드와 계정의 공개 및 개인 키를 포함하여 노드 2의 키를 생성합니다.

```shell
 /opt/backenddir/go-ibax generateKeys \
--config=/opt/backenddir/node2/config.toml
```

8. 데이터베이스를 시작합니다.

```shell
 ./go-ibax initDatabase --config\=node2/config.toml
```

9. 원심 분리:

```shell
/opt/backenddir/centrifugo/centrifugo \
-a 192.168.1.2 -p 8000 \
--config/opt/backenddir/centrifugo/config.json
```

10. go-ibax를 실행합니다.

```shell
/opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node2/config.toml
```

결과적으로 노드는 첫 번째 노드에서 블록을 다운로드합니다. 이 노드는 검증 노드가 아니므로 새로운 블록을 생성할 수 없습니다. 노드 2는 나중에 검증 노드 목록에 추가됩니다.

### 노드 3 (Node 3) {#node-3}

아래와 같이 작동 지침을 따르십시오.

1. [종속성 및 환경 설정](#dependencies-and-environment-settings)

2. [데이터베이스 생성](#create-a-database)

3. [센트리퓨고](#centrifugo)

4. [go-ibax 설치](#install-go-ibax)

5. 노드 3에 대한 구성 파일을 생성합니다.

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

6. 첫 번째 블록 파일을 노드 3에 복사합니다. 예를 들어 scp를 통해 노드 3에서 이 작업을 수행할 수 있습니다.

```shell
 scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node3/
```


7. 노드와 계정의 공개 및 개인 키를 포함하여 노드 3의 키를 생성합니다.

```shell
 /opt/backenddir/go-ibax generateKeys \
--config=/opt/backenddir/node3/config.toml
```

8. 데이터베이스를 시작합니다.

```shell
 ./go-ibax initDatabase --config=node3/config.toml
```

9. 원심 분리:

```shell
 /opt/backenddir/centrifugo/centrifugo \
-a 192.168.1.3 -p 8000 \
--config/opt/backenddir/centrifugo/config.json
```

10. go-ibax를 실행합니다.

```shell
 /opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node3/config.toml
```

결과적으로 노드는 첫 번째 노드에서 블록을 다운로드합니다. 이 노드는 검증 노드가 아니므로 새로운 블록을 생성할 수 없습니다. 클라이언트는 노드에 연결될 수 있으며 트랜잭션을 네트워크로 보낼 수 있습니다.

## 프론트엔드 배포 (Front-end deployment) {#front-end-deployment}

Debian 9(Stretch) 64비트 공식 릴리스에 **GNOME GUI**를 설치한 후에만 `yarn` 패키지 관리자로 Govis 클라이언트를 빌드할 수 있습니다.

### 소프트웨어 전제 조건 (Software prerequisites) {#software-prerequisites}

1. Node.js 공식 웹 사이트 또는 명령줄을 통해 Node.js LTS 버전 8.11을 다운로드합니다.

```shell
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash
```

2. Node.js를 설치합니다.

```shell
sudo apt install -y nodejs
```

1. Yarn의 [Github](https://github.com/yarnpkg/yarn/releases) 리포지토리 또는 명령줄을 통해 Yarn 버전 1.7.0을 다운로드합니다.

```shell
cd/opt/backenddir \
&& wget https://github.com/yarnpkg/yarn/releases/download/v1.7.0/yarn_1.7.0_all.deb
```

2. 원사 설치:

```shell
sudo dpkg -i yarn_1.7.0_all.deb && rm yarn_1.7.0_all.deb
```

### Weaver 애플리케이션 빌드 (Build a Weaver application) {#build-a-weaver-application}

1. git을 통해 github-frontend에서 최신 버전의 Weaver를 다운로드합니다.

```shell
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/ibax-front.git
```

2. Yarn을 통해 Weaver 종속성을 설치합니다.

```shell
cd/opt/backenddir/ibax-front/ \
&& yarn install
```

### 블록체인 네트워크를 위한 구성 파일 추가 (Add the configuration file for the blockchain network) {#add-the-configuration-file-for-the-blockchain-network}

1. 노드 연결에 대한 정보가 포함된 *settings.json* 파일을 생성합니다.

```shell
cp/opt/backenddir/ibax-front/public/settings.json.dist \
  /opt/backenddir/ibax-front/public/public/settings.json
```
 
2. 텍스트 편집기에서 *settings.json* 파일을 편집하고 필요한 설정을 다음 형식으로 추가합니다.

```
http://노드_IP-주소:노드_HTTP-포트
```

세 노드에 대한 *settings.json* 파일의 예:

```json
{
  "fullNodes": [
    "http://192.168.1.1:7079",
    "http://192.168.1.2:7079",
    "http://192.168.1.3:7079"
  ]
}
```

Weaver 데스크톱 애플리케이션 구축

1. 원사를 사용하여 데스크톱 버전을 빌드합니다.

```shell
cd/opt/backenddir/ibax-front \
&& yarn build-desktop
```

2. 데스크톱 버전은 AppImage 접미사 형식으로 패키징됩니다.

```shell
yarn release --publish never -l
```

빌드 후에는 애플리케이션을 사용할 수 있지만 연결 구성은 변경할 수 없습니다. 이러한 설정을 변경해야 하는 경우 애플리케이션의 새 버전을 빌드해야 합니다.

### Weaver 웹 애플리케이션 빌드 (Build Weaver Web Application) {#build-weaver-web-application}

1. 웹 애플리케이션 구축:

```shell
cd/opt/backenddir/ibax-front/ \
&& yarn build
```

빌드 후 재배포 가능 파일은 /build 디렉터리에 배치됩니다. 원하는 웹 서버를 배포에 사용할 수 있으며 *settings.json* 파일도 이 디렉터리에 있어야 합니다. 연결 설정이 변경되면 애플리케이션을 다시 빌드할 필요가 없습니다. 대신 *settings.json* 파일을 편집하고 웹 서버를 다시 시작하십시오.

1. 개발 또는 테스트 목적으로 Yarn의 웹 서버를 구축할 수 있습니다.


```shell
sudo yarn global add serve \
&& serve -s build
```

그런 다음 Weaver 웹 애플리케이션은 `http://localhost:5000` 위치에서 사용할 수 있습니다.

## 블록체인 네트워크 구성 (Configure the blockchain network) {#configure-the-blockchain-network}

### 창조자 계정 생성 (Create the creator account) {#create-the-creator-account}

첫 번째 노드 소유자의 계정을 만듭니다. 이 계정은 새로운 블록체인 플랫폼의 생성자이며 관리자 액세스 권한이 있습니다.

1.Weaver를 실행합니다.

2. 다음 데이터를 사용하여 기존 계정을 가져옵니다.

– `/opt/backenddir/node1/PrivateKey` 파일에 있는 노드 소유자의 개인 키 백업을 로드합니다.

> 참고
>
>이 디렉터리에는 두 개의 개인 키 파일이 있습니다. `PrivateKey` 파일은 노드 소유자의 계정을 만드는 데 사용됩니다. `NodePrivateKey` 파일은 노드 자체의 개인 키이며 비밀로 유지되어야 합니다.

3. 계정에 로그인한 후 현재 역할이 생성되지 않았으므로 역할 없음 옵션을 선택하십시오.

### 애플리케이션, 역할 및 템플릿 가져오기 (Import applications, roles and templates) {#import-applications-roles-and-templates}

현재 블록체인 플랫폼은 공백 상태입니다. 기본 에코시스템 기능을 지원하는 역할, 템플릿 및 애플리케이션 프레임워크를 추가하여 구성할 수 있습니다.

1. 애플리케이션 리포지토리를 복제합니다.

```shell
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/dapps.git
```

2. Weaver에서 개발자 > 가져오기로 이동합니다.

3. 다음 순서에 따라 애플리케이션을 가져옵니다:

```
 A./opt/backenddir/dapps/system.json 
 B./opt/backenddir/dapps/conditions.json 
 C./opt/backenddir/dapps/basic.json 
 D./opt/backenddir/dapps/lang_res.json
```

4. Weaver에서 관리자 > 역할로 이동하고, 기본 역할을 설치합니다.

5. 오른쪽 상단의 구성 파일 메뉴를 통해 시스템을 종료합니다.

6. 관리자로 시스템에 로그인합니다.

7. 홈 > 투표 > 템플릿 목록으로 이동하고, 기본 템플릿을 설치합니다.

### 첫 번째 노드를 노드 목록에 추가 (Add the first node to the node list) {#add-the-first-node-to-the-node-list}

1. 개발자 > 플랫폼 매개변수로 이동하고, first_nodes 매개변수를 클릭합니다.

2. 첫 번째 블록체인 네트워크 노드의 매개변수를 지정합니다.

   - public_key - 노드의 공개 키는 `/opt/backenddir/node1/NodePublicKey` 파일에 위치합니다.

```
{"api_address":"http://192.168.1.1:7079","public_key":"%node_public_key%","tcp_address":"192.168.1.1:7078"}
```

## 다른 의미있는 노드 추가 (Add other honor nodes) {#add-other-honor-nodes}

### 콘센서스 역할 그룹에 구성원 추가 (Add members into the consensus role group) {#add-members-into-the-consensus-role-group}

기본적으로, 다른 마스터 노드를 추가하기 위해 필요한 투표에는 일치 역할 (Consensus) 그룹의 구성원만 참여할 수 있습니다. 따라서 새로운 마스터 노드를 추가하기 전에 생태계의 구성원이 역할에 할당되어야 합니다.
이 섹션에서는 생성자 계정을 일치 역할 그룹의 유일한 구성원으로 지정합니다. 실제 운영 환경에서는 이 역할을 거버넌스를 수행하는 플랫폼 구성원에게 할당해야 합니다.

1. 홈 > 역할으로 이동하고, Consensus를 클릭합니다.

2. 할당을 클릭하여 생성자 계정을 역할에 할당합니다.


### 다른 노드의 소유자 계정 생성 (Create the owner account for other nodes) {#create-the-owner-account-for-other-nodes}

1. Weaver를 실행합니다.

2. 다음 데이터를 사용하여 기존 계정을 가져옵니다:
    - `/opt/backenddir/node2/PrivateKey` 파일에 있는 노드 소유자의 개인 키 백업을 로드합니다.

3. 계정에 로그인한 후, 현재 시점에서 역할이 생성되지 않았으므로 "Without role" 옵션을 선택하십시오.

4. 홈 > 개인 정보로 이동하고, 개인 정보의 제목을 클릭합니다.

5. 계정 세부 정보 (개인 정보 제목, 설명 등)를 추가합니다.


### 노드 소유자에게 Validators 역할 할당 (Assign the node owner with the Validators role) {#assign-the-node-owner-with-the-validators-role}

1. 새로운 노드 소유자의 작업:
    1. 홈 > 검증자로 이동합니다.
    2. "요청 생성"을 클릭하고, 검증자 후보의 신청 양식을 작성합니다.
    3. "요청 보내기"를 클릭합니다.

2. 생성자의 작업:
    1. 합의 역할 (Consensus)로 로그인합니다.
    2. 홈 > 검증자로 이동합니다.
    3. 후보의 요청에 따라 투표를 시작하기 위해 "재생" 아이콘을 클릭합니다.
    4. 홈 > 투표로 이동하고, "투표 상태 업데이트"를 클릭합니다.
    5. 투표 이름을 클릭하고, 노드 소유자에 대해 투표합니다.

결과적으로, 새로운 노드 소유자의 계정은 검증자 역할이 할당되며, 새로운 노드가 주요 노드 목록에 추가됩니다.
