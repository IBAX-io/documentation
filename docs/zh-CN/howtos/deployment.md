# IBAX区块链平台 区块链网络部署 {#deployment-of-a-ibax-network}

本章节演示如何部署自己的区块链网络。

## 部署示例 {#an-deployment-example}

以三个节点为示例部署区块链网络。

三个网络节点:

> -   节点1是区块链网络中的第一个节点，它可以生成新区块并从连接到它的客户端发送交易；
> -   节点2是另一个荣誉节点，它可以生成新区块并从连接到它的客户端发送交易；
> -   节点3是一个守护节点，它不能生成新区块，但可以从连接到它的客户端发送交易。

三个节点部署以下配置：

> -   每个节点都使用自己的PostgreSQL数据库系统实例；
> -   每个节点都使用自己的Centrifugo服务实例；
> -   [服务端](https://github.com/ibax-io/go-ibax) 与其他后端组件部署在同一主机上。

节点使用的示例地址和端口如下表所述：

|   |   |   |
|---|---|---|
| 节点 |组件|IP和端口|
| 1 |PostgreSQL|127.0.0.1:5432|
| 1 |Centrifugo|192.168.1.1:8000|
| 1 |go-ibax (TCP服务)|192.168.1.1:7078|
| 1 |go-ibax (API服务)|192.168.1.1:7079|
| 2 |PostgreSQL|127.0.0.1:5432|
| 2 |Centrifugo|192.168.1.2:8000|
| 2 |go-ibax (TCP服务)|192.168.1.2:7078|
| 2 |go-ibax (API服务)|192.168.1.2:7079|
| 3 |PostgreSQL|127.0.0.1:5432|
| 3 |Centrifugo|192.168.1.3:8000|
| 3 |go-ibax (TCP服务)|192.168.1.3:7078|
| 3 |go-ibax (API服务)|192.168.1.3:7079|

## 部署阶段 {#deploy-phase}

您自己的区块链网络必须分几个阶段部署：

1.  [服务端部署](#server-deployment)

    > 1.  [部署第一个节点](#deploy-the-first-node)
    > 2.  [部署其他节点](#deploy-other-nodes)

2.  [前端部署](#front-end-deployment)

3.  [区块链网络配置](#configure-the-blockchain-network)

    > 1.  [创建创始人的帐户](#create-the-creator-account)
    > 2.  [导入应用、角色和模版](#import-applications-roles-and-templates)
    > 3.  [将第一个节点添加到节点列表中](#add-the-first-node-to-the-node-list)

4.  [添加其他验证节点](#add-other-honor-nodes)

    > 1.  [将成员添加到共识角色](#add-members-into-the-consensus-role-group)
    > 2.  [创建节点所有者帐户](#create-the-owner-account-for-other-nodes)
    > 3.  [添加节点所有者为Validators角色并通过投票添加新验证节点](#assign-the-node-owner-with-the-validators-role)

## 服务端部署 {#server-deployment}

### 部署第一个节点 {#deploy-the-first-node}

第一个节点是一个特殊节点，因为它必须用于启动区块链网络。区块链的第一个区块由第一个节点生成，所有其他节点从中下载区块链。第一个节点的所有者为平台创始人。

### 依赖关系和环境设置{#dependencies-and-environment-settings}

#### sudo {#sudo}

Debian 9的所有命令必须以非root用户身份运行。但是某些系统命令需要执行超级用户权限。默认情况下，Debian 9上没有安装sudo，您必须先安装它。

1)  成为超级用户。

``` bash
su -
```

2)  升级您的系统。

``` bash
apt update -y && apt upgrade -y && apt dist-upgrade -y
```

3)  安装sudo。

``` bash
apt install sudo -y
```

4)  将您的用户添加到sudo组。

``` bash
usermod -a -G sudo user
```

5)  重启后，更改生效。

### Go 语言 {#golang}

按照 [官方文档](https://golang.org/doc/install#tarball) 的说明按照Go。

1)  从 [Golang官方网站](https://golang.org/dl/)或通过命令行下载最新的稳定版Go（\> 1.10.x）：

``` bash
wget https://dl.google.com/go/go1.11.2.linux-amd64.tar.gz
```

2)  将安装包解压缩到 `/usr/local`.

``` bash
tar -C /usr/local -xzf go1.11.2.linux-amd64.tar.gz
```

3)  添加 `/usr/local/go/bin` 到PATH环境变量 (位于 `/etc/profile` 或`$HOME/.profile`)。

``` bash
export PATH=$PATH:/usr/local/go/bin
```

4)  要使更改生效，请执行 `source` 该文件，例如：

``` bash
source $HOME/.profile
```

5)  删除临时文件：

``` bash
rm go1.11.2.linux-amd64.tar.gz
```

### PostgreSQL {#postgresql}

1)  安装PostgreSQL（\> v.10）和psql：

``` bash
sudo apt install -y postgresql
```

### Centrifugo {#centrifugo}

1)  从 [GitHub](https://github.com/centrifugal/centrifugo/releases/)或通过命令行下载Centrifugo 1.8.0版本：

``` bash
wget https://github.com/centrifugal/centrifugo/releases/download/v1.8.0/centrifugo-1.8.0-linux-amd64.zip \
&& unzip centrifugo-1.8.0-linux-amd64.zip \
&& mkdir centrifugo \
&& mv centrifugo-1.8.0-linux-amd64/* centrifugo/
```

2)  删除临时文件：

``` bash
rm -R centrifugo-1.8.0-linux-amd64 \
&& rm centrifugo-1.8.0-linux-amd64.zip
```

### 目录结构 {#directory-structure}

对于Debian 9 系统，建议将区块链平台使用的所有软件存储在单独的目录中。

在这里使用 `/opt/backenddir`目录，但您可以使用任何目录。在这种情况下，请相应地更改所有命令和配置文件。

1)  为区块链平台创建一个目录：

``` bash
sudo mkdir /opt/backenddir
```

2)  使您的用户成为该目录的所有者：

``` bash
sudo chown user /opt/backenddir/
```

3) 为Centrifugo、go-ibax 和节点数据创建子目录。所有节点数据都存储在名为`nodeX` 的目录中，其中 `X` 为节点号。根据要部署的节点，`node1`为节点1，`node2` 为节点2，以此类推。

``` bash
mkdir /opt/backenddir/go-ibax \
mkdir /opt/backenddir/go-ibax/node1 \
mkdir /opt/backenddir/centrifugo \
```

### 创建数据库 {#create-a-database}

1) 将用户密码postgres更改为默认密码*123456*。您可以设置自己的密码，但必须在节点配置文件 *config.toml*中进行更改。

``` bash
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '123456'"
```

2)  创建节点当前状态数据库，例如 **chaindb**:

``` bash
sudo -u postgres psql -c "CREATE DATABASE chaindb"
```

### 配置Centrifugo {#configure-centrifugo}

1)  创建Centrifugo配置文件：

``` bash
echo '{"secret":"CENT_SECRET"}' > /opt/backenddir/centrifugo/config.json
```

您可以设置自己的 *secret*，但是您还必须在节点配置文件 *config.toml* 中更改它。

### 安装 go-ibax {#install-go-ibax}

1) 从GitHub下载 <https://github.com/ibax-io/go-ibax>：
2) 将 go-ibax 二进制文件复制到 `/opt/backenddir/go-ibax`目录。如果您使用的是[默认的Go工作区](https://golang.org/doc/code.html#Workspaces) 则二进制文件位于 `$HOME/go/bin` 目录：

``` bash
cp $HOME/go/bin/go-ibax /opt/backenddir/go-ibax
```

### 配置第一个节点 {#configure-the-first-node}

1)  创建节点1配置文件：

``` bash
/opt/backenddir/go-ibax config \
    --dataDir=/opt/backenddir/node1 \
    --dbName=chaindb \
    --centSecret="CENT_SECRET" --centUrl=http://192.168.1.1:8000 \
    --httpHost=192.168.1.1 \
    --httpPort=7079 \
    --tcpHost=192.168.1.1 \
    --tcpPort=7078
```

4)  生成节点1的密钥，包括节点公私钥和账户公私钥：

``` bash
/opt/backenddir/go-ibax generateKeys \
    --config=/opt/backenddir/node1/config.toml
```

5)  生成第一个区块：

````text
如果您要创建自己的区块链网络。你必须使用该 `--test=true` 选项。否则您将无法创建新帐户。
````

``` bash
/opt/backenddir/go-ibax generateFirstBlock \
    --config=/opt/backenddir/node1/config.toml \
    --test=true
```

6)  初始化数据库：

``` bash
/opt/backenddir/go-ibax initDatabase \
    --config=/opt/backenddir/node1/config.toml
```

### 启动第一个节点服务端 {#initiate-the-first-node-server}

要启动第一个节点服务端，您必须启动两个服务：

-   centrifugo
-   go-ibax

如果您没有将这些文件创建[services](https://wiki.debian.org/systemd/Services) ，那么您可以从不同控制台的目录中执行二进制文件。

1)  运行centrifugo:

``` bash
/opt/backenddir/centrifugo/centrifugo \
    -a 192.168.1.1 -p 8000 \
    --config /opt/backenddir/centrifugo/config.json
```

2)  运行 go-ibax:

``` bash
/opt/backenddir/go-ibax start \
    --config=/opt/backenddir/node1/config.toml
```

## 部署其他节点 {#deploy-other-nodes}

所有其他节点（节点2和节点3）的部署与第一个节点类似，但有三个不同之处：

-   您不需要生成第一个区块。但是它必须从节点1复制到当前节点数据目录；
-   该节点必须通过配置 `--nodesAddr` 选项从节点1下载区块；
-   该节点必须使用自己的地址和端口。

### 节点2 {#node-2}

按照以下一系列操作：

> 1.  [依赖关系和环境设置](#dependencies-and-environment-settings)
>
> 2.  [创建数据库](#create-a-database)
>
> 3.  [Centrifugo](#Centrifugo)
>
> 4.  [安装 go-ibax](#install-go-ibax)
>
> 5.  创建节点2配置文件：
>
>     > ``` bash
>     > /opt/backenddir/go-ibax config \
>     >     --dataDir=/opt/backenddir/node2 \
>     >     --dbName=chaindb \
>     >     --centSecret="CENT_SECRET" --centUrl=http://192.168.1.2:8000 \
>     >     --httpHost=192.168.1.2 \
>     >     --httpPort=7079 \
>     >     --tcpHost=192.168.1.2 \
>     >     --tcpPort=7078 \
>     >     --nodesAddr=192.168.1.1
>     > ```
>
> 6.  复制第一个区块文件到节点2，例如，您可以通过 `scp` 在节点2执行该操作：
>
>     > ``` bash
>     > scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node2/
>     > ```
>
> 7.  生成节点2的密钥，包括节点公私钥和账户公私钥：
>
>     > ``` bash
>     > /opt/backenddir/go-ibax generateKeys \
>     >     --config=/opt/backenddir/node2/config.toml
>     > ```
>
> 8.  初始化数据库：
>
>     > ``` bash
>     > ./go-ibax initDatabase --config=node2/config.toml
>     > ```
>
> 9.  运行centrifugo:
>
>     > ``` bash
>     > /opt/backenddir/centrifugo/centrifugo \
>     >      -a 192.168.1.2 -p 8000 \
>     >      --config/opt/backenddir/centrifugo/config.json
>     > ```
>
> 10. 运行 go-ibax:
>
>     ``` bash
>     /opt/backenddir/go-ibax start \
>         --config=/opt/backenddir/node2/config.toml
>     ```

结果，节点从第一个节点下载区块。该节点不是验证节点，因此无法生成新区块。节点2将后面添加到验证节点列表中。

### 节点3 {#node-3}

按照以下一系列操作：

1.  [依赖关系和环境设置](#dependencies-and-environment-settings)
2.  [创建数据库](#create-a-database)
3.  [Centrifugo](#centrifugo)
4.  [安装 go-ibax](#install-go-ibax)
5.  创建节点3配置文件：

    > ``` bash
    > /opt/backenddir/go-ibax config \
    >     --dataDir=/opt/backenddir/node3 \
    >     --dbName=chaindb \
    >     --centSecret="CENT_SECRET" --centUrl=http://192.168.1.3:8000 \
    >     --httpHost=192.168.1.3 \
    >     --httpPort=7079 \
    >     --tcpHost=192.168.1.3 \
    >     --tcpPort=7078 \
    >     --nodesAddr=192.168.1.1
    > ```

6.  复制第一个区块文件到节点3，例如，您可以通过 `scp` 在节点3执行该操作：

    > ``` bash
    > scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node3/
    > ```

7.  生成节点3的密钥，包括节点公私钥和账户公私钥：

    > ``` bash
    > /opt/backenddir/go-ibax generateKeys \
    >     --config=/opt/backenddir/node3/config.toml
    > ```

8.  初始化数据库：

    > ``` bash
    > ./go-ibax initDatabase --config=node3/config.toml
    > ```

9.  运行centrifugo:

    > ``` bash
    > /opt/backenddir/centrifugo/centrifugo \
    >     -a 192.168.1.3 -p 8000 \
    >     --config/opt/backenddir/centrifugo/config.json
    > ```

10. 运行 go-ibax:

    ``` bash
    /opt/backenddir/go-ibax start \
        --config=/opt/backenddir/node3/config.toml
    ```

结果，节点从第一个节点下载区块。该节点不是验证节点，因此无法生成新区块。客户端可以连接到该节点，它可以将交易发送到网络。

## 前端部署 {#front-end-deployment}

只有在Debian 9(Stretch)64位[官方发行版](https://www.debian.org/CD/http-ftp/#stable) 上安装 **GNOMEGUI**，Govis客户端才能由 `yarn` 包管理器构建。

### 软件先决条件 {#software-prerequisites}

> Node.js

1)  从 [Node.js官方网站](https://nodejs.org/en/download/)或通过命令行下载Node.js LTS版本8.11 ：

``` bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash
```

2)  安装Node.js:

``` bash
sudo apt install -y nodejs
```

> Yarn

1)  从 [yarn的Github仓库](https://github.com/yarnpkg/yarn/releases)或通过命令行下载Yarn版本1.7.0 ：

``` bash
cd/opt/backenddir \
&& wget https://github.com/yarnpkg/yarn/releases/download/v1.7.0/yarn_1.7.0_all.deb
```

2)  安装Yarn:

``` bash
sudo dpkg -i yarn_1.7.0_all.deb && rm yarn_1.7.0_all.deb
```

### 构建 Weaver 应用程序 {#build-a-weaver-application}

1)  通过git从 <https://github.com/ibax-io/ibax-front> 下载 Weaver 的最新版本：

``` bash
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/ibax-front.git
```

2)  通过Yarn安装 Weaver 依赖项：

``` bash
cd/opt/backenddir/ibax-front/ \
&& yarn install
```

### 添加区块链网络配置 {#add-the-configuration-file-for-the-blockchain-network}

1)  创建包含有关节点连接信息的 *settings.json* 文件：

``` bash
cp/opt/backenddir/ibax-front/public/settings.json.dist \
   /opt/backenddir/ibax-front/public/public/settings.json
```

2)  在任何文本编辑器中编辑 *settings.json* 文件，并以此格式添加所需的设置：

``` text
http://Node_IP-address:Node_HTTP-Port
```

三个节点的 *settings.json* 文件示例：

``` json
{
    "fullNodes": [
        "http://192.168.1.1:7079",
        "http://192.168.1.2:7079",
        "http://192.168.1.3:7079"
    ]
}
```

构建 Weaver 桌面版应用程序

1)  使用yarn构建桌面版：

``` bash
cd/opt/backenddir/ibax-front \
&& yarn build-desktop
```

2)  桌面版将打包成AppImage后缀格式:

``` bash
yarn release --publish never -l
```

构建之后，您的应用程序就可以使用了，但是其[连接配置](#add-the-configuration-file-for-the-blockchain-network) 将无法更改。如果这些设置需要更改，则必须构建新版本的应用程序。

### 构建 Weaver Web应用程序 {#build-weaver-web-application}

1)  构建Web应用程序：

``` bash
cd/opt/backenddir/ibax-front/ \
&& yarn build
```

构建之后，可再发行文件将放置到 *build*目录中。您可以使用您选择的任何Web服务器进行部署，*settings.json*文件也必须放在该目录。请注意，如果连接设置发生更改，则无需再次构建应用程序。而是编辑*settings.json* 文件并重新启动Web服务器。

2)  出于开发或测试目的，您可以构建Yarn的Web服务器：

``` bash
sudo yarn global add serve \
&& serve -s build
```

之后，您的 Weaver Web应用程序将在以下位置可用: `http://localhost:5000`。

## 区块链网络配置 {#configure-the-blockchain-network}

### 创建创始人的帐户 {#create-the-creator-account}

为第一个节点所有者创建一个帐户。该帐户是新区块链平台的创始人，并具有管理员访问权限。

1) 运行 Weaver；

2) 使用以下数据导入现有帐户：

    - 节点所有者私钥的备份加载位于`/opt/backenddir/node1/PrivateKey` 文件中。

    ```text
    该目录中有两个私钥文件:
   `PrivateKey` 文件用于节点所有者的帐户，可创建节点所有者的帐户。
   `NodePrivateKey` 文件是节点本身的私钥，必须保密。
     ```

3) 登录该账户后，由于此时尚未创建角色，因此请选择 *Without role* 选项。

### 导入应用、角色和模版 {#import-applications-roles-and-templates}

此时，区块链平台处于空白状态。您可以通过添加支持基本生态系统功能的角色、模版和应用程序框架来配置它。

1)  克隆应用程序存储库；

``` bash
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/dapps.git
```

2)  在 Weaver 中导航到 *Developer* \> *导入*；

3)  按此顺序导入应用：

    > A./opt/backenddir/dapps/system.json
    > B./opt/backenddir/dapps/conditions.json
    > C./opt/backenddir/dapps/basic.json
    > D./opt/backenddir/dapps/lang_res.json

4)  导航到 *Developer* \> *角色*，然后单击 *安装默认角色*；

5)  通过右上角的配置文件菜单退出系统；

6)  以 *Developer* 角色登录系统；

7)  导航到 *Home* \> *投票* \> *模版列表*，然后单击 *安装默认模版*。

### 将第一个节点添加到节点列表中 {#add-the-first-node-to-the-node-list}

1)  导航到 *Developer* \> *平台参数*，然后单击 *first_nodes* 参数；

2)  指定第一个区块链网络节点的参数。

    > -   **public_key** - 节点公钥位于`/opt/backenddir/node1/NodePublicKey` 文件；

    ```json
    {"api_address":"http://192.168.1.1:7079","public_key":"%node_public_key%","tcp_address":"192.168.1.1:7078"}
    ```

## 添加其他荣誉节点 {#add-other-honor-nodes}

### 将成员添加到共识角色 {#add-members-into-the-consensus-role-group}

默认情况下，只有共识角色（Consensus）的成员才能参与添加其他 荣誉节点所需的投票。这意味着在添加新的 荣誉节点之前，必须为该角色指定生态系统的成员。

在本章节中，创始人的帐户被指定为共识角色的唯一成员。在生产环境中，必须将该角色分配给平台执行治理的成员。

1)  导航到 *Home* \> *角色* ，然后单击共识角色（Consensus）；
2)  单击 *分配* 将创始人的帐户分配给该角色。

### 创建其他节点所有者帐户 {#create-the-owner-account-for-other-nodes}

1)  运行 Weaver；

2)  使用以下数据导入现有帐户：

    > -   节点所有者私钥的备份加载位于`/opt/backenddir/node2/PrivateKey` 文件中。

3)  登录该账户后，由于此时尚未创建角色，因此请选择 *Without role* 选项；

4)  导航到 *Home* \> *个人信息*，然后单击个人信息名称；

5)  添加帐户详细信息（个人信息名称，说明等）。

### 添加节点所有者为Validators角色 {#assign-the-node-owner-with-the-validators-role}

1)  新节点所有者操作：

    > A.  导航到 *Home* > *验证者*；
    > B.  单击 *创建请求* 并填写验证者候选人的申请表；
    > C.  单击 *发送请求*。

2)  创始人操作:

    > A.  以共识角色（Consensus）登录；
    > B.  导航到 *Home* > *验证者*；
    > C.  根据候选人的请求点击"播放"图标开始投票；
    > D.  导航到 *Home* > *投票*，然后单击 *更新投票状态*；
    > E.  单击投票名称并为节点所有者投票。

结果，新节点所有者的帐户被分配给 *Validator* 角色，并且新节点也被添加到荣誉节点列表中。
