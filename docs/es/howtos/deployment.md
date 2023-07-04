# Despliegue de la plataforma IBAX Blockchain y la red IBAX {#deployment-of-a-ibax-network}

Este capítulo demuestra cómo desplegar su propia red blockchain.

## Ejemplo de despliegue {#an-deployment-example}

Despliegue una red blockchain con tres nodos como ejemplo.

Tres nodos de red:

> - El Nodo 1 es el primer nodo en la red blockchain, puede generar nuevos bloques y enviar transacciones desde clientes conectados a él;
> - El Nodo 2 es otro nodo validador, puede generar nuevos bloques y enviar transacciones desde clientes conectados a él;
> - El Nodo 3 es un nodo de vigilancia, no puede generar nuevos bloques, pero puede enviar transacciones desde clientes conectados a él.

La siguiente configuración se despliega para los tres nodos:

> - Cada nodo utiliza su propia instancia del sistema de base de datos PostgreSQL;
> - Cada nodo utiliza su propia instancia del servicio Centrifugo;
> - [servidor](https://github.com/ibax-io/go-ibax) se implementa en el mismo host que otros componentes de back-end.

Las direcciones y puertos de ejemplo utilizados por los nodos se describen en la siguiente tabla:

|   |   |   |
|---|---|---|
| Nodo | Componente | IP y puerto |
| 1 | PostgreSQL | 127.0.0.1:5432 |
| 1 | Centrifugo | 192.168.1.1:8000 |
| 1 | go-ibax (servicio TCP) | 192.168.1.1:7078 |
| 1 | go-ibax (servicio API) | 192.168.1.1:7079 |
| 2 | PostgreSQL | 127.0.0.1:5432 |
| 2 | Centrifugo | 192.168.1.2:8000 |
| 2 | go-ibax (servicio TCP) | 192.168.1.2:7078 |
| 2 | go-ibax (servicio API) | 192.168.1.2:7079 |
| 3 | PostgreSQL | 127.0.0.1:5432 |
| 3 | Centrifugo | 192.168.1.3:8000 |
| 3 | go-ibax (servicio TCP) | 192.168.1.3:7078 |
| 3 | go-ibax (servicio API) | 192.168.1.3:7079 |

## Fase de implementación {#deploy-phase}

Su propia red de blockchain debe ser implementada en varias fases:

1. [Implementación del servidor](#server-deployment)

    > 1. [Implementar el primer nodo](#deploy-the-first-node)
    > 2. [Implementar otros nodos](#deploy-other-nodes)

2. [Implementación del frontend](#front-end-deployment)

3. [Configuración de la red de blockchain](#configure-the-blockchain-network)

    > 1. [Crear la cuenta del creador](#create-the-creator-account)
    > 2. [Importar aplicaciones, roles y plantillas](#import-applications-roles-and-templates)
    > 3. [Agregar el primer nodo a la lista de nodos](#add-the-first-node-to-the-node-list)

4. [Agregar otros nodos de validación](#add-other-honor-nodes)

    > 1. [Agregar miembros al rol de consenso](#add-members-into-the-consensus-role-group)
    > 2. [Crear la cuenta del propietario del nodo](#create-the-owner-account-for-other-nodes)
    > 3. [Agregar el propietario del nodo como Validadores y agregar nuevos nodos de validación mediante votación](#assign-the-node-owner-with-the-validators-role)

## Despliegue del servidor {#server-deployment}

### Despliegue del primer nodo {#deploy-the-first-node}

El primer nodo es un nodo especial, ya que debe ser utilizado para iniciar la red de blockchain. El primer bloque de la cadena de bloques es generado por el primer nodo, y todos los demás nodos descargan la cadena de bloques desde él. El propietario del primer nodo es el fundador de la plataforma.

### Dependencias y configuración del entorno {#dependencies-and-environment-settings}

#### sudo {#sudo}

Todos los comandos en Debian 9 deben ser ejecutados como un usuario no root. Sin embargo, algunos comandos del sistema requieren permisos de superusuario. Por defecto, sudo no está instalado en Debian 9, por lo que debe ser instalado primero.

1) Convertirse en un superusuario.

``` bash
su -
```

2) Actualizar su sistema.

``` bash
apt update -y && apt upgrade -y && apt dist-upgrade -y
```

3) Instalar sudo.

``` bash
apt install sudo -y
```

4) Agregar su usuario al grupo sudo.
``` bash
usermod -a -G sudo user
```

5) Después de reiniciar, los cambios tendrán efecto.

### Lenguaje Go {#golang}

Siga las instrucciones en la [documentación oficial](https://golang.org/doc/install#tarball) para instalar Go.

1) Descargue la última versión estable de Go (> 1.10.x) desde el [sitio web oficial de Golang](https://golang.org/dl/) o mediante la línea de comandos:

``` bash
wget https://dl.google.com/go/go1.11.2.linux-amd64.tar.gz
```

2) Descomprima el paquete de instalación en `/usr/local`.

``` bash
tar -C /usr/local -xzf go1.11.2.linux-amd64.tar.gz
```

3) Agregue `/usr/local/go/bin` al PATH de su variable de entorno (ubicado en `/etc/profile` o `$HOME/.profile`).

``` bash
export PATH=$PATH:/usr/local/go/bin
```

4) Para que los cambios surtan efecto, ejecute `source` en ese archivo, por ejemplo:

``` bash
source $HOME/.profile
```

5) Elimine los archivos temporales:

``` bash
rm go1.11.2.linux-amd64.tar.gz
```

### PostgreSQL {#postgresql}

1) Instale PostgreSQL (\> v.10) y psql:

``` bash
sudo apt install -y postgresql
```

### Centrifugo {#centrifugo}

1) Descargue Centrifugo versión 1.8.0 desde [GitHub](https://github.com/centrifugal/centrifugo/releases/) o mediante la línea de comandos:

``` bash
wget https://github.com/centrifugal/centrifugo/releases/download/v1.8.0/centrifugo-1.8.0-linux-amd64.zip \
&& unzip centrifugo-1.8.0-linux-amd64.zip \
&& mkdir centrifugo \
&& mv centrifugo-1.8.0-linux-amd64/* centrifugo/
```

2) Eliminar archivos temporales:

``` bash
rm -R centrifugo-1.8.0-linux-amd64 \
&& rm centrifugo-1.8.0-linux-amd64.zip
```

### Estructura del directorio {#directory-structure}

Para el sistema Debian 9, se recomienda almacenar todos los software utilizados por la plataforma blockchain en un directorio separado.

Aquí se utiliza el directorio `/opt/backenddir`, pero puede utilizar cualquier directorio. En este caso, cambie todos los comandos y archivos de configuración en consecuencia.

1) Cree un directorio para la plataforma blockchain:

``` bash
sudo mkdir /opt/backenddir
```

2) Haga que su usuario sea el propietario de ese directorio:

``` bash
sudo chown user /opt/backenddir/
```

3) Cree subdirectorios para Centrifugo, go-ibax y los datos del nodo. Todos los datos del nodo se almacenan en un directorio llamado `nodeX`, donde `X` es el número del nodo. Dependiendo del nodo que se desee implementar, `node1` es el nodo 1, `node2` es el nodo 2, y así sucesivamente.

``` bash
mkdir /opt/backenddir/go-ibax \
mkdir /opt/backenddir/go-ibax/node1 \
mkdir /opt/backenddir/centrifugo \
```

### Crear una base de datos {#create-a-database}

1) Cambiar la contraseña de usuario postgres a la contraseña predeterminada *123456*. Puede establecer su propia contraseña, pero debe cambiarla en el archivo de configuración del nodo *config.toml*.

``` bash
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '123456'"
```

2) Crear una base de datos de estado actual del nodo, por ejemplo, **chaindb**:

``` bash
sudo -u postgres psql -c "CREATE DATABASE chaindb"
```

### Configurar Centrifugo {#configure-centrifugo}

1) Crear un archivo de configuración de Centrifugo:

``` bash
echo '{"secret":"CENT_SECRET"}' > /opt/backenddir/centrifugo/config.json
```

Puede configurar su *secreto* personal, pero también debe cambiarlo en el archivo de configuración del nodo *config.toml*.

### Instalación de go-ibax {#install-go-ibax}

1) Descargue desde GitHub <https://github.com/ibax-io/go-ibax>:
2) Copie el archivo binario de go-ibax en el directorio `/opt/backenddir/go-ibax`.
   Si está utilizando el [espacio de trabajo de Go predeterminado](https://golang.org/doc/code.html#Workspaces), el archivo binario se encuentra en el directorio `$HOME/go/bin`:

``` bash
cp $HOME/go/bin/go-ibax /opt/backenddir/go-ibax
```

### Configuración del primer nodo {#configure-the-first-node}

1) Cree el archivo de configuración del nodo 1:

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

4)  Generar las claves de nodo 1, incluyendo las claves públicas y privadas del nodo y las claves públicas y privadas de la cuenta:

``` bash
/opt/backenddir/go-ibax generateKeys \
    --config=/opt/backenddir/node1/config.toml
```

5) Generar el primer bloque:

````text
Si desea crear su propia red de blockchain, debe usar la opción `--test=true`. De lo contrario, no podrá crear una nueva cuenta.
````

``` bash
/opt/backenddir/go-ibax generateFirstBlock \
    --config=/opt/backenddir/node1/config.toml \
    --test=true
```

6) Inicializar la base de datos:

``` bash
/opt/backenddir/go-ibax initDatabase \
    --config=/opt/backenddir/node1/config.toml
```

### Iniciar el servidor del primer nodo {#initiate-the-first-node-server}

Para iniciar el servidor del primer nodo, debe iniciar dos servicios:

- centrifugo
- go-ibax

Si no ha creado estos archivos de [servicios](https://wiki.debian.org/systemd/Services), puede ejecutar los archivos binarios desde diferentes directorios en diferentes consolas.

1) Ejecutar centrifugo:

``` bash
/opt/backenddir/centrifugo/centrifugo \
    -a 192.168.1.1 -p 8000 \
    --config /opt/backenddir/centrifugo/config.json
```

2)  Ejecutar go-ibax:

``` bash
/opt/backenddir/go-ibax start \
    --config=/opt/backenddir/node1/config.toml
```

## Desplegar otros nodos {#deploy-other-nodes}

El despliegue de todos los demás nodos (nodo 2 y nodo 3) es similar al del primer nodo, pero hay tres diferencias:

-   No es necesario generar el primer bloque. Sin embargo, debe copiarse desde el directorio de datos del nodo 1 al nodo actual;
-   El nodo debe descargar bloques del nodo 1 mediante la opción de configuración `--nodesAddr`;
-   El nodo debe usar su propia dirección y puerto.

### Nodo 2 {#node-2}

Siga los siguientes pasos:

> 1.  [Dependencias y configuración del entorno](#dependencies-and-environment-settings)
>
> 2.  [Crear una base de datos](#create-a-database)
>
> 3.  [Centrifugo](#centrifugo)
>
> 4.  [Instalar go-ibax](#install-go-ibax)
>
> 5.  Crear el archivo de configuración del nodo 2:
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
> 6.  1. Copie el primer archivo de bloque a la segunda nodo, por ejemplo, puede hacerlo en el nodo 2 a través de `scp`:

> ``` bash
> scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node2/
> ```

2. Genere las claves para el nodo 2, incluyendo las claves públicas y privadas del nodo y de la cuenta:

> ``` bash
> /opt/backenddir/go-ibax generateKeys \
>     --config=/opt/backenddir/node2/config.toml
> ```

3. Inicialice la base de datos:

> ``` bash
> ./go-ibax initDatabase --config=node2/config.toml
> ```

4. Ejecute Centrifugo:

> ``` bash
> /opt/backenddir/centrifugo/centrifugo \
>      -a 192.168.1.2 -p 8000 \
>      --config/opt/backenddir/centrifugo/config.json
> ```

5. Ejecute go-ibax:

> ``` bash
> /opt/backenddir/go-ibax start \
>     --config=/opt/backenddir/node2/config.toml
> ```

Como resultado, el nodo descargará el bloque desde el primer nodo. Este nodo no es un nodo de validación, por lo que no puede generar nuevos bloques. El nodo 2 se agregará a la lista de nodos de validación más adelante.

### Nodo 3 {#node-3}

Siguiendo la siguiente serie de operaciones:

1. [Dependencias y configuración del entorno](#dependencies-and-environment-settings)
2. [Crear una base de datos](#create-a-database)
3. [Centrifugo](#centrifugo)
4. [Instalar go-ibax](#install-go-ibax)
5. Crear el archivo de configuración del nodo 3:

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

6.  1. Copie el primer archivo de bloque a la Node 3, por ejemplo, puede hacerlo en la Node 3 a través de `scp`:

    > ``` bash
    > scp user@192.168.1.1:/opt/backenddir/node1/1block /opt/backenddir/node3/
    > ```

7. Genere las claves para la Node 3, incluyendo las claves públicas y privadas de la Node y las claves públicas y privadas de la cuenta:

    > ``` bash
    > /opt/backenddir/go-ibax generateKeys \
    >     --config=/opt/backenddir/node3/config.toml
    > ```

8. Inicialice la base de datos:

    > ``` bash
    > ./go-ibax initDatabase --config=node3/config.toml
    > ```

9. Ejecute Centrifugo:

    > ``` bash
    > /opt/backenddir/centrifugo/centrifugo \
    >     -a 192.168.1.3 -p 8000 \
    >     --config/opt/backenddir/centrifugo/config.json
    > ```

10. Ejecute go-ibax:

    ``` bash
    /opt/backenddir/go-ibax start \
        --config=/opt/backenddir/node3/config.toml
    ```

Como resultado, la Node descargará el bloque desde la primera Node. Esta Node no es una Node de validación, por lo que no puede generar nuevos bloques. Los clientes pueden conectarse a esta Node y enviar transacciones a la red.

## Implementación de Front-End {#front-end-deployment}

Solo se puede construir el cliente Govis utilizando el administrador de paquetes `yarn` si se instala **GNOMEGUI** en la versión oficial de Debian 9 (Stretch) de 64 bits, disponible en el [sitio web oficial](https://www.debian.org/CD/http-ftp/#stable).

### Requisitos previos del software {#software-prerequisites}

> Node.js

1) Descargue Node.js LTS versión 8.11 desde el [sitio web oficial de Node.js](https://nodejs.org/en/download/) o mediante la línea de comandos:

``` bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash
```

2)  Para instalar Node.js:

``` bash
sudo apt install -y nodejs
```

> Yarn

1)  Descarga Yarn versión 1.7.0 desde el repositorio de Github de Yarn (https://github.com/yarnpkg/yarn/releases) o mediante la línea de comandos.

``` bash
cd/opt/backenddir \
&& wget https://github.com/yarnpkg/yarn/releases/download/v1.7.0/yarn_1.7.0_all.deb
```

2)  Instalar Yarn:

``` bash
sudo dpkg -i yarn_1.7.0_all.deb && rm yarn_1.7.0_all.deb
```

### Construir una aplicación Weaver {#build-a-weaver-application}

1) Descargue la última versión de Weaver desde <https://github.com/ibax-io/ibax-front> a través de git:

``` bash
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/ibax-front.git
```

2) Instalar las dependencias de Weaver a través de Yarn:

``` bash
cd/opt/backenddir/ibax-front/ \
&& yarn install
```

### Agregar la configuración de la red blockchain {#add-the-configuration-file-for-the-blockchain-network}

1) Crear un archivo *settings.json* que contenga información sobre la conexión de los nodos:

``` bash
cp/opt/backenddir/ibax-front/public/settings.json.dist \
   /opt/backenddir/ibax-front/public/public/settings.json
```

2) Editar el archivo *settings.json* en cualquier editor de texto y agregar las configuraciones necesarias en el siguiente formato:

``` text
http://Node_IP-address:Node_HTTP-Port
```

Ejemplo de archivo *settings.json* con tres nodos:

``` json
{
    "fullNodes": [
        "http://192.168.1.1:7079",
        "http://192.168.1.2:7079",
        "http://192.168.1.3:7079"
    ]
}
```

Construyendo la aplicación de escritorio Weaver

1) Construyendo la versión de escritorio con yarn:

``` bash
cd/opt/backenddir/ibax-front \
&& yarn build-desktop
```

2)  El escritorio se empaquetará en formato de sufijo AppImage:

``` bash
yarn release --publish never -l
```

Después de la construcción, su aplicación estará lista para usar, pero su [configuración de conexión](#add-the-configuration-file-for-the-blockchain-network) no se podrá cambiar. Si necesita cambiar estas configuraciones, deberá construir una nueva versión de la aplicación.

### Construir la aplicación web de Weaver {#build-weaver-web-application}

1) Construir la aplicación web:

``` bash
cd/opt/backenddir/ibax-front/ \
&& yarn build
```

Después de la construcción, los archivos publicables se colocarán en el directorio *build*. Puede utilizar cualquier servidor web que elija para implementarlos, y el archivo *settings.json* también debe colocarse en ese directorio. Tenga en cuenta que si cambia la configuración de conexión, no es necesario volver a construir la aplicación, simplemente edite el archivo *settings.json* y reinicie el servidor web.

2) Para fines de desarrollo o prueba, puede construir el servidor web de Yarn:

``` bash
sudo yarn global add serve \
&& serve -s build
```

Afterwards, your Weaver Web application will be available at the following location: `http://localhost:5000`.

## Blockchain Network Configuration {#configure-the-blockchain-network}

### Create the Creator Account {#create-the-creator-account}

Crear una cuenta para el primer propietario del nodo. Esta cuenta es el creador de la nueva plataforma blockchain y tiene acceso de administrador.

1) Ejecutar Weaver;

2) Importar la cuenta existente con los siguientes datos:

    - La copia de seguridad de la clave privada del propietario del nodo se encuentra en el archivo `/opt/backenddir/node1/PrivateKey`.

    ```text
    There are two private key files in this directory. The `PrivateKey`
    file is for the node owner's account and can create the node owner's account. The `NodePrivateKey`
    file is the private key for the node itself and must be kept secret.
     ```

3) Después de iniciar sesión en la cuenta, seleccionar la opción *Sin rol* ya que aún no se han creado roles.

### Importar aplicaciones, roles y plantillas {#import-applications-roles-and-templates}

En este momento, la plataforma blockchain está en blanco. Puede configurarla agregando roles, plantillas y marcos de aplicación que admitan funciones básicas del ecosistema.

1) Clonar el repositorio de la aplicación;

``` bash
cd/opt/backenddir \
&& git clone https://github.com/ibax-io/dapps.git
```

2) Navegue a *Developer* \> *Import* en Weaver;

3) Importe las aplicaciones en este orden:

    > A./opt/backenddir/dapps/system.json
    > B./opt/backenddir/dapps/conditions.json
    > C./opt/backenddir/dapps/basic.json
    > D./opt/backenddir/dapps/lang_res.json

4) Navegue a *Developer* \> *Roles*, y luego haga clic en *Instalar roles predeterminados*;

5) Salga del sistema a través del menú de perfil en la esquina superior derecha;

6) Inicie sesión en el sistema con el rol de *Developer*;

7) Navegue a *Home* \> *Votación* \> *Lista de plantillas*, y luego haga clic en *Instalar plantilla predeterminada*.

### Agregar el primer nodo a la lista de nodos {#add-the-first-node-to-the-node-list}

1) Navegue a *Developer* \> *Parámetros de plataforma*, y luego haga clic en el parámetro *first_nodes*;

2) Especifique los parámetros del primer nodo de la red de blockchain.

    > -   **public_key** - La clave pública del nodo se encuentra en el archivo `/opt/backenddir/node1/NodePublicKey`.

    ```json
    {"api_address":"http://192.168.1.1:7079","public_key":"%node_public_key%","tcp_address":"192.168.1.1:7078"}
    ```

## Agregar otros nodos de honor {#add-other-honor-nodes}

### Agregar miembros al grupo de roles de consenso {#add-members-into-the-consensus-role-group}

Por defecto, solo los miembros del rol de consenso (Consensus) pueden participar en la votación necesaria para agregar otros nodos de honor. Esto significa que antes de agregar nuevos nodos de honor, se debe designar a los miembros del ecosistema para ese rol.

En esta sección, la cuenta del fundador se designa como el único miembro del rol de consenso. En un entorno de producción, este rol debe asignarse a los miembros que ejecutan la gobernanza de la plataforma.

1) Navegue a *Inicio* \> *Roles*, y luego haga clic en el rol de consenso (Consensus);
2) Haga clic en *Asignar* para asignar la cuenta del fundador a ese rol.

### Crear la cuenta del propietario de los nodos adicionales {#create-the-owner-account-for-other-nodes}

1) Ejecutar Weaver;

2) Importar la cuenta existente con los siguientes datos:

    > - La copia de seguridad de la clave privada del propietario del nodo se encuentra en el archivo `/opt/backenddir/node2/PrivateKey`.

3) Iniciar sesión en la cuenta y seleccionar la opción *Without role* ya que aún no se ha creado ningún rol;

4) Navegar a *Home* \> *Información personal* y hacer clic en el nombre de la información personal;

5) Agregar los detalles de la cuenta (nombre de la información personal, descripción, etc.).

### Asignar el propietario del nodo como Validador {#assign-the-node-owner-with-the-validators-role}

1) Acciones del nuevo propietario del nodo:

    > A. Navegar a *Home* > *Validadores*;
    > B. Hacer clic en *Crear solicitud* y completar el formulario de solicitud del candidato a validador;
    > C. Hacer clic en *Enviar solicitud*.

2) Acciones del fundador:

    > A. Iniciar sesión con el rol de consenso (Consensus);
    > B. Navegar a *Home* > *Validadores*;
    > C. Hacer clic en el icono de "reproducir" según la solicitud del candidato;
    > D. Navegar a *Home* > *Votación* y hacer clic en *Actualizar estado de votación*;
    > E. Hacer clic en el nombre de la votación y votar por el propietario del nodo.

Como resultado, la cuenta del nuevo propietario del nodo se asigna al rol de *Validador* y el nuevo nodo se agrega a la lista de nodos honoríficos.
