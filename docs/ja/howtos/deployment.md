# IBAX ネットワークの展開 {#deployment-of-a-ibax-network}
このセクションでは、独自のブロックチェーン ネットワークを展開する方法を説明します。
## 導入例 {#an-deployment-example}

ブロックチェーン ネットワークは、例として次の 3 つのノードで展開されます。

3 つのネットワーク ノード:

   * ノード 1 はブロックチェーン ネットワーク内の最初のノードであり、新しいブロックを生成し、接続されているクライアントからトランザクションを送信できます。
   * ノード 2 は別の優等ノードで、新しいブロックを生成し、接続されているクライアントからトランザクションを送信できます。
   * ノード 3 はガーディアン ノードであり、新しいブロックを生成できませんが、接続されているクライアントからトランザクションを送信できます。

導入される 3 つのノードの構成:
* 各ノードは独自の PostgreSQL データベース システム インスタンスを使用します。
* 各ノードは独自の Centrifugo サービス インスタンスを使用します。
* サーバー側の github-backend は、他のバックエンド コンポーネントと同じホストにデプロイされます。

ノードによって使用されるサンプルのアドレスとポートを次の表に示します。

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

# デプロイフェーズ {#deploy-phase}

独自のブロックチェーンネットワークを展開するには、いくつかのステージで展開する必要があります：

- [IBAXネットワークの展開](#deployment-of-a-ibax-network)
  - [展開の例](#an-deployment-example)
  - [デプロイフェーズ](#deploy-phase)
  - [サーバーの展開](#server-deployment)
    - [最初のノードの展開](#deploy-the-first-node)
    - [依存関係と環境設定](#dependencies-and-environment-settings)
      - [sudo](#sudo)
    - [Golang](#golang)
    - [PostgreSQL](#postgresql)
    - [Centrifugo](#centrifugo)
    - [ディレクトリ構造](#directory-structure)
    - [データベースの作成](#create-a-database)
    - [Centrifugoの設定](#configure-centrifugo)
    - [go-ibaxのインストール](#install-go-ibax)
    - [最初のノードの設定](#configure-the-first-node)
    - [最初のノードサーバーの初期化](#initiate-the-first-node-server)
  - [他のノードの展開](#deploy-other-nodes)
    - [ノード2](#node-2)
    - [ノード3](#node-3)
  - [フロントエンドの展開](#front-end-deployment)
    - [ソフトウェアの前提条件](#software-prerequisites)
    - [Weaverアプリケーションのビルド](#build-a-weaver-application)
    - [ブロックチェーンネットワークの設定ファイルの追加](#add-the-configuration-file-for-the-blockchain-network)
    - [Weaver Webアプリケーションのビルド](#build-weaver-web-application)
  - [ブロックチェーンネットワークの設定](#configure-the-blockchain-network)
    - [作成者アカウントの作成](#create-the-creator-account)
    - [アプリケーション、ロール、テンプレートのインポート](#import-applications-roles-and-templates)
    - [最初のノードをノードリストに追加](#add-the-first-node-to-the-node-list)
  - [他のホノーノードの追加](#add-other-honor-nodes)
    - [コンセンサスロールグループにメンバーを追加](#add-members-into-the-consensus-role-group)
    - [他のノード用のオーナーアカウントの作成](#create-the-owner-account-for-other-nodes)
    - [ノードオーナーにバリデータの役割を割り当てる](#assign-the-node-owner-with-the-validators-role)



## サーバーの展開 {#server-deployment}

### 最初のノードの展開 {#deploy-the-first-node}

最初のノードは特別な役割を果たし、ブロックチェーンネットワークを起動するために不可欠です。最初のノードがブロックチェーンの最初のブロックを生成し、他のすべてのノードはそれからブロックチェーンをダウンロードします。最初のノードの所有者はプラットフォームの作成者です。

### 依存関係と環境設定 {#dependencies-and-environment-settings}

#### sudo {#sudo}

Debian 9のすべてのコマンドは、rootユーザーではないユーザーとして実行する必要があります。ただし、一部のシステムコマンドはスーパーユーザー権限で実行する必要があります。デフォルトでは、Debian 9にはsudoがインストールされていないため、まずsudoをインストールする必要があります。

1. スーパーユーザーになる。

```shell
su -
```

2. システムをアップグレードしてください。

```shell
apt update -y && apt upgrade -y && apt dist-upgrade -y
```

3. sudoをインストールします。

```shell
apt install sudo -y
```

4. ユーザーを sudo グループに追加します。

```shell
usermod -a -G sudo user
```

5. 再起動後、変更が有効になります。
   
### Golang {#golang}

[公式ドキュメント](https://golang.org/doc/install#tarball)に従って Go をインストールします。

1. Go の最新の安定バージョン (> 1.10.x) を [Golang 公式 Web サイト](https://golang.org/dl/) から、またはコマンド ラインを通じてダウンロードします。

```shell
wget https://dl.google.com/go/go1.11.2.linux-amd64.tar.gz
```

2. tar を使用して、tarball を `/usr/local` ディレクトリに抽出します。

```shell
tar -C /usr/local -xzf go1.11.2.linux-amd64.tar.gz
```

3. `/usr/local/go/bin` を PATH 環境変数 (`/etc/profile` または `$HOME/.profile` にあります) に追加します。

```shell
export PATH=$PATH:/usr/local/go/bin
```

1. `source` ファイルを実行して変更を有効にします。次に例を示します。

```shell
source $HOME/.profile
```

2. 一時ファイルを削除します。

```shell
rm go1.11.2.linux-amd64.tar.gz
```

### PostgreSQL {#postgresql}

1. PostgreSQL (> v.10) と psql をインストールします。

```shell
sudo apt install -y postgresql
```

### Centrifugo {#centrifugo}

1. Centrifugo V.1.8.0 を [GitHub](https://github.com/centrifugal/centrifugo/releases/) から、またはコマンド ラインからダウンロードします。

```shell
wget https://github.com/centrifugal/centrifugo/releases/download/v1.8.0/centrifugo-1.8.0-linux-amd64.zip \
&& unzip centrifugo-1.8.0-linux-amd64.zip \
&& mkdir centrifugo \
&& mv centrifugo-1.8.0-linux-amd64/* centrifugo/
```

2. 一時ファイルを削除します。

```shell
rm -R centrifugo-1.8.0-linux-amd64 \
&& rm centrifugo-1.8.0-linux-amd64.zip
```

### ディレクトリ構造 {#directory-structure}

Debian 9 システムの場合、ブロックチェーン プラットフォームで使用されるすべてのソフトウェアを別のディレクトリに保存することをお勧めします。

ここでは「/opt/backenddir」ディレクトリを使用していますが、任意のディレクトリを使用できます。 この場合、すべてのコマンドと設定ファイルを適宜変更してください。

1. ブロックチェーン プラットフォームのディレクトリを作成します。

```shell
sudo mkdir /opt/backenddir
```

2. ユーザーをディレクトリの所有者にします。

```shell
sudo chown user /opt/backenddir/
```

3. Centrifugo、go-ibax、およびノード データ用のサブディレクトリを作成します。 すべてのノード データは `nodeX` という名前のディレクトリに保存されます。ここで、`X` はノード番号です。 デプロイされるノードに応じて、`node1`はノード 1、`node2`はノード 2 などとなります。

```shell
mkdir /opt/backenddir/go-ibax \
mkdir /opt/backenddir/go-ibax/node1 \
mkdir /opt/backenddir/centrifugo \
```

### データベースの作成 {#create-a-database}

1. ユーザーのパスワード postgres をデフォルトのパスワード *123456* に変更します。 独自のパスワードを設定できますが、ノード構成ファイル *config.toml* で変更する必要があります。

```shell
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '123456'"
```

2. ノードの現在の状態データベース (例: **chaindb**) を作成します。

```shell
sudo -u postgres psql -c "CREATE DATABASE chaindb"
```

### Centrifugoの設定 {#configure-centrifugo}

1. Centrifugo 構成ファイルを作成します。

```shell
echo '{"secret":"CENT_SECRET"}' > /opt/backenddir/centrifugo/config.json
```

独自の *secret* を設定できますが、ノード構成ファイル *config.toml* でも変更する必要があります。

### go-ibaxのインストール {#install-go-ibax}

1. GitHub から github-backend をダウンロードします。
2. go-ibax バイナリ ファイルを `/opt/backenddir/go-ibax` ディレクトリにコピーします。 デフォルトの Go ワークスペースを使用している場合、バイナリ ファイルは `$HOME/go/bin` ディレクトリにあります。

```shell
cp $HOME/go/bin/go-ibax /opt/backenddir/go-ibax
```

### 最初のノードの設定 {#configure-the-first-node}

3. ノード 1 の構成ファイルを作成します。

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

4. ノードとアカウントの公開鍵と秘密鍵を含む、ノード 1 の鍵を生成します。
```shell
/opt/backenddir/go-ibax generateKeys \
 --config=/opt/backenddir/node1/config.toml
```

5. 最初のブロックを生成します。

> 注意
>
> 独自のブロックチェーン ネットワークを作成したい場合は、`--test=true` オプションを使用する必要があります。 そうしないと、新しいアカウントを作成できません。

```shell
/opt/backenddir/go-ibax generateFirstBlock \
 --config=/opt/backenddir/node1/config.toml \
 --test=true
```

6. データベースを初期化します。

```shell
/opt/backenddir/go-ibax initDatabase \
 --config=/opt/backenddir/node1/config.toml
```

### 最初のノードサーバーの初期化 {#initiate-the-first-node-server}

最初のノード サーバーを起動するには、次の 2 つのサービスを起動する必要があります。
* centrifugo
* go-ibax

これらのファイルを使用して [サービス](#https://wiki.debian.org/systemd/Services) を作成できなかった場合は、別のコンソールのディレクトリからバイナリ ファイルを実行する可能性があります。

1. centrifugoを実行します:

```shell
/opt/backenddir/centrifugo/centrifugo \
 -a 192.168.1.1 -p 8000 \
 --config /opt/backenddir/centrifugo/config.json
```

2. go-ibaxを実行します:

```shell
/opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node1/config.toml
```

## 他のノードの展開 {#deploy-other-nodes}

他のすべてのノード (ノード 2 およびノード 3) の展開は最初のものと似ていますが、次の 3 つの違いがあります。

* 最初のブロックは生成する必要はありません。 ただし、ノード 1 から現在のノードのデータ ディレクトリにコピーする必要があります。
* ノードは、`--nodesAddr` オプションを設定してノード 1 からブロックをダウンロードする必要があります。
* ノードは独自のアドレスとポートを使用する必要があります。

### ノード2 {#node-2}

以下に示す操作手順に従ってください。

1. [依存関係と環境設定](#dependencies-and-environment-settings)
2. [データベースの作成](#create-a-database)
3. [Centrifugo](#centrifugo)
4. [go-ibaxをインストールする](#install-go-ibax)
5. ノード 2 の構成ファイルを作成します。

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

6. 最初のブロック ファイルをノード 2 にコピーします。たとえば、scp を使用してノード 2 で次の操作を実行できます。

```shell
 scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node2/
```

7. ノードとアカウントの公開鍵と秘密鍵を含む、ノード 2 の鍵を生成します。

```shell
 /opt/backenddir/go-ibax generateKeys \
--config=/opt/backenddir/node2/config.toml
```

8. データベースを初期化します。

```shell
 ./go-ibax initDatabase --config\=node2/config.toml
```

9. centrifugoを実行します。

```shell
/opt/backenddir/centrifugo/centrifugo \
-a 192.168.1.2 -p 8000 \
--config/opt/backenddir/centrifugo/config.json
```

10. go-ibaxを実行します。

```shell
/opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node2/config.toml
```

その結果、ノードは最初のノードからブロックをダウンロードします。 このノードは検証ノードではないため、新しいブロックを生成できません。 ノード 2 は後で検証ノードのリストに追加されます。

### ノード3 {#node-3}

以下に示す操作手順に従ってください。

1. [依存関係と環境設定](#dependencies-and-environment-settings)
2. [データベースの作成](#create-a-database)
3. [Centrifugo](#Centrifugo)
4. [go-ibaxをインストールする](#install-go-ibax)
5. ノード 3 の構成ファイルを作成します。

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

6. 最初のブロック ファイルをノード 3 にコピーします。たとえば、scp を使用してノード 3 で次の操作を実行できます。

```shell
 scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node3/
```


7. ノードとアカウントの公開鍵と秘密鍵を含む、ノード 3 の鍵を生成します。

```shell
 /opt/backenddir/go-ibax generateKeys \
--config=/opt/backenddir/node3/config.toml
```

8. データベースを初期化します。

```shell
 ./go-ibax initDatabase --config=node3/config.toml
```

9. Centrifugoを実行します。

```shell
 /opt/backenddir/centrifugo/centrifugo \
-a 192.168.1.3 -p 8000 \
--config/opt/backenddir/centrifugo/config.json
```

10. go-ibaxeを実行します。

```shell
 /opt/backenddir/go-ibax start \
 --config=/opt/backenddir/node3/config.toml
```

その結果、ノードは最初のノードからブロックをダウンロードします。 このノードは検証ノードではないため、新しいブロックを生成できません。 クライアントはノードに接続でき、トランザクションをネットワークに送信できます。

## フロントエンドの展開 {#front-end-deployment}

Debian 9 (Stretch) 64 ビット公式リリースに **GNOME GUI** をインストールした後でのみ、`yarn` パッケージ マネージャーを使用して Govis クライアントを構築できます。

### ソフトウェアの前提条件 {#software-prerequisites}

1. Node.js 公式 Web サイトまたはコマンド ラインから Node.js LTS バージョン 8.11 をダウンロードします。

```shell
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash
```

2. Node.js をインストールします。

```shell
sudo apt install -y nodejs
```

1. Yarn バージョン 1.7.0 を、yarn の [Github](https://github.com/yarnpkg/yarn/releases) リポジトリから、またはコマンド ラインを通じてダウンロードします。

```shell
cd/opt/backenddir \
&& wget https://github.com/yarnpkg/yarn/releases/download/v1.7.0/yarn_1.7.0_all.deb
```

2. Yarnをインストールします。

```shell
sudo dpkg -i yarn_1.7.0_all.deb && rm yarn_1.7.0_all.deb
```

### Weaverアプリケーションのビルド {#build-a-weaver-application}

1. Git 経由で github-frontend から Weaver の最新バージョンをダウンロードします。

```shell
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/ibax-front.git
```

2. Yarn 経由で Weaver 依存関係をインストールします。

```shell
cd/opt/backenddir/ibax-front/ \
&& yarn install
```

### [ブロックチェーンネットワークの設定ファイルの追加 {#add-the-configuration-file-for-the-blockchain-network}

1. ノード接続に関する情報を含む *settings.json* ファイルを作成します。

```shell
cp/opt/backenddir/ibax-front/public/settings.json.dist \
 /opt/backenddir/ibax-front/public/public/settings.json
```
 
2. 任意のテキスト エディターで *settings.json* ファイルを編集し、次の形式で必要な設定を追加します。

```
http://Node_IP-address:Node_HTTP-Port
```

3 つのノードの *settings.json* ファイルの例:

```json
{
  "fullNodes": [
    "http://192.168.1.1:7079",
    "http://192.168.1.2:7079",
    "http://192.168.1.3:7079"
  ]
}
```

Weaver デスクトップ アプリケーションを構築する

1. yarn を使用してデスクトップ バージョンを構築します。

```shell
cd/opt/backenddir/ibax-front \
&& yarn build-desktop
```

2. デスクトップ バージョンは、AppImage サフィックス形式でパッケージ化されます。

```shell
yarn release --publish never -l
```

ビルド後、アプリケーションを使用することはできますが、接続構成を変更することはできません。 これらの設定を変更する必要がある場合は、新しいバージョンのアプリケーションを構築する必要があります。

### Weaver Webアプリケーションのビルド {#build-weaver-web-application}

1. Web アプリケーションを構築します。

```shell
cd/opt/backenddir/ibax-front/ \
&& yarn build
```

ビルド後、再頒布可能ファイルは /build ディレクトリに配置されます。 デプロイメントには任意の Web サーバーを使用できます。*settings.json* ファイルもこのディレクトリに配置する必要があります。 なお、接続設定を変更した場合、アプリケーションを再度ビルドする必要はありません。 代わりに、*settings.json* ファイルを編集し、Web サーバーを再起動します。

1. 開発またはテストの目的で、Yarn の Web サーバーを構築できます。


```shell
sudo yarn global add serve \
&& serve -s build
```

その後、Weaver Web アプリケーションが `http://localhost:5000` の場所で利用できるようになります。

## ブロックチェーンネットワークの設定 {#configure-the-blockchain-network}

### 作成者アカウントの作成 {#create-the-creator-account}

最初のノード所有者のアカウントを作成します。 このアカウントは新しいブロックチェーン プラットフォームの作成者であり、管理者アクセス権を持っています。

1. ウィーバーを実行します。

2. 次のデータを使用して既存のアカウントをインポートします。

–`/opt/backenddir/node1/PrivateKey` ファイルにあるノード所有者の秘密キーのバックアップをロードします。

> 注意
>
>このディレクトリには秘密鍵ファイルが 2 つあります。 `PrivateKey` ファイルは、ノード所有者のアカウントを作成するために使用されます。 `NodePrivateKey` ファイルはノード自体の秘密鍵であり、秘密にしておく必要があります。

3. アカウントにログインした後、この時点ではロールが作成されていないため、ロールなし オプションを選択してください。

### アプリケーション、ロール、テンプレートのインポート {#import-applications-roles-and-templates}

現時点では、ブロックチェーン プラットフォームは空白の状態です。 基本的なエコシステム機能をサポートするロール、テンプレート、アプリケーション フレームワークを追加することで構成できます。

1. アプリケーションリポジトリのクローンを作成します。

```shell
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/dapps.git
```

2. 「開発者」Developer >「Weaver でインポート」に移動します。

3. 次の順序に従ってアプリケーションをインポートします。
```
 A./opt/backenddir/dapps/system.json 
 B./opt/backenddir/dapps/conditions.json 
 C./opt/backenddir/dapps/basic.json 
 D./opt/backenddir/dapps/lang_res.json
```

4. 「管理者」Admin >「役割」Role に移動し、「デフォルトの役割のインストール」Default Role をクリックします。

5. 右上隅の構成ファイルメニューからシステムを終了します。

6. 管理者 Admin としてシステムにログインします。

7. 「ホーム」Home > 「投票」Vote > 「テンプレート リスト」Template List に移動し、「デフォルト テンプレートのインストール」Default Template をクリックします。

### 最初のノードをノードリストに追加 {#add-the-first-node-to-the-node-list}

1. 「開発者」Developer >「プラットフォームパラメータ」Platform Parameters に移動し、first_nodesパラメータをクリックします。

2. 最初のブロックチェーンネットワークノードのパラメータを指定します。

   * public_key - ノードの公開鍵は `/opt/backenddir/node1/NodePublicKey` ファイルにあります。

```
{"api_address":"http://192.168.1.1:7079","public_key":"%node_public_key%","tcp_address":"192.168.1.1:7078"}
```

## 他のホノーノードの追加 {#add-other-honor-nodes}

### コンセンサスロールグループにメンバーを追加 {#add-members-into-the-consensus-role-group}

デフォルトでは、コンセンサスロール (コンセンサス) グループのメンバーのみが、他のマスターノードを追加するために必要な投票に参加できます。 これは、新しいマスター ノードを追加する前に、エコシステムのメンバーをロールに割り当てる必要があることを意味します。
このセクションでは、作成者のアカウントがコンセンサス役割グループの唯一のメンバーとして指定されます。 運用環境では、このロールはガバナンスを実行するプラットフォーム メンバーに割り当てる必要があります。

1.「ホーム」Home >「役割」Role に移動し、「コンセンサス」をクリックします。

2.「割り当て」をクリックして、作成者のアカウントをロールに割り当てます。

### 他のノード用のオーナーアカウントの作成 {#create-the-owner-account-for-other-nodes}

1. Weaverを実行します。

2. 次のデータを使用して既存のアカウントをインポートします。
      – `/opt/backenddir/node2/PrivateKey` ファイルにあるノード所有者の秘密キーのバックアップをロードします。
     
3. アカウントにログインした後、この時点ではロールが作成されていないため、ロールなし オプションを選択してください。

4. 「Home」 > 「個人情報 Personal Information」に移動し、個人情報のタイトルをクリックします。

5. アカウントの詳細 (個人情報のタイトル、説明など) を追加します。

### ノードオーナーにバリデータの役割を割り当てる {#assign-the-node-owner-with-the-validators-role}

1. 新しいノード所有者による操作:
     1. 「Home」 > 「検証者 Verfier」 に移動します。
     2. 「リクエストの作成」 をクリックし、検証者候補者の申請フォームに記入します。
     3. 「リクエストの送信」をクリックします。
2. 作成者による操作：
     1. コンセンサスロール (コンセンサス) でログインします。
     2. 「Home」 > 「検証者 Verfier」に移動します。
     3. 「Play」 アイコンをクリックして、候補者の要求に従って投票を開始します。
     4. 「Home」 > 「投票 Vote」に移動し、「投票ステータスの更新 Update voting status」をクリックします。
     5. 投票名をクリックして、ノード所有者に投票します。

その結果、新しいノードの所有者のアカウントに検証者の役割が割り当てられ、新しいノードがマスター ノードのリストに追加されます。
