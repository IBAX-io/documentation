# Herramienta de monitoreo sincronizado {#synchronized-monitoring-tool}

Desync_monitor es una herramienta especial que se utiliza para verificar si la base de datos en un nodo especificado está sincronizada.

Esta herramienta se puede utilizar como un proceso en segundo plano o se puede iniciar para realizar una verificación única.

El funcionamiento de esta herramienta se basa en lo siguiente:

> 1. Cada bloque contiene el hash de todos los cambios de todas las transacciones. Se solicita al nodo especificado que proporcione su último ID de bloque.
> 2. Luego, se solicitan bloques de todos los nodos que tienen ese ID y se comparan los hashes mencionados anteriormente.
> 3. Si los hashes son diferentes, se enviará un mensaje de error de sincronización a la dirección de correo electrónico especificada en el comando.

## Ubicación {#location}

Esta herramienta se encuentra en `tools/desync_monitor/`.

## Banderas del símbolo del sistema {#command-prompt-flags}

Se pueden utilizar las siguientes banderas desde el símbolo del sistema:

> -   **confPath** -- Ruta al archivo de configuración. El nombre de archivo predeterminado es `config.toml`;
> -   **nodesList** -- Lista de nodos para solicitar bloques, separados por comas. El valor predeterminado es `127.0.0.1:7079`;
> -   **daemonMode** -- Iniciar como un demonio, debe usarse cuando se necesita verificar cada N segundos. Esta bandera está establecida en `false` de forma predeterminada;
> -   **queryingPeriod** -- Si la herramienta se inicia como un demonio, este parámetro establece el intervalo de tiempo (en segundos) entre comprobaciones. El valor predeterminado es `1` segundo.

-   **alertMessageTo** -- Dirección de correo electrónico a la que se enviarán las alertas de error de sincronización.

    > -   **alertMessageSubj** -- Asunto del mensaje en el mensaje de alerta, el valor predeterminado es problema de sincronización del nodo;
    > -   **alertMessageFrom** -- Dirección desde la que se envía el mensaje.
    > -   **smtpHost** -- Host del servidor SMTP utilizado para enviar correos electrónicos, el valor predeterminado es `""`;
    > -   **smtpPort** -- Puerto del servidor SMTP utilizado para enviar mensajes de correo electrónico, el valor predeterminado es `25`;
    >   - **smtpUsername** -- Nombre de usuario del servidor SMTP, el valor predeterminado es `""`;
    >   - **smtpPassword** -- Contraseña del servidor SMTP, el valor predeterminado es `""`.

## Configuración {#configuration}

Esta herramienta utiliza un archivo de configuración en formato toml.

Por defecto, buscará el archivo *config.toml* en la carpeta donde se inició el archivo binario.

Puede cambiar la ruta del archivo utilizando la opción **configPath**.

```text
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

### nodes_list {#nodes-list}

> -   **nodes_list** - Lista de nodos (hosts) que solicitan información.

### [daemon] {#daemon}

Configuración del modo de proceso de demonio.

> - **daemon_mode** -- La herramienta funciona como un proceso de demonio y realiza comprobaciones de sincronización.
> - **querying_period** -- El intervalo de tiempo entre las comprobaciones de sincronización.

### [alert_message] {#alert-message}

Parámetros de mensaje de advertencia.

> - **to** -- Dirección de correo electrónico del destinatario para el mensaje de advertencia sincrónico;
> - **subject** -- Tema del mensaje;
> - **from** -- Dirección de correo electrónico del remitente.

### [smtp] {#smtp}

Parámetros del servidor de Protocolo de Transferencia de Correo Simple (Simple Mail Transfer Protocol, SMTP) para enviar mensajes de advertencia sincrónicos.

> - **host** -- Servidor SMTP;
> - **port** -- Puerto del servidor SMTP;
> - **username** -- Nombre de usuario del servidor SMTP;
> - **password** -- Contraseña del servidor SMTP;
