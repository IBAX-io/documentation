# Synchronized Monitoring Tool {#synchronized-monitoring-tool}

Desync_monitor is a special tool that can be used to verify whether the database on the specified node has been synchronized.

The tool can be used as a daemon or can be started to perform a one-time check.

The operating principle of the tool is based on the following:

1. Each block contains the hash of all changes of all transactions, request the specified node to provide its last block ID;
2. Then request a block with this ID from all nodes and compare the above hashes;
3. If the hashes are different, a synchronization error message will be sent to the email address specified in the command.

## Location {#location}

The tool is located in the `tools/desync_monitor/` directory.

## Command prompt flags {#command-prompt-flags}

The following flags can be used from the command prompt:

> -   **confPath** -- Path of the configuration file. The default file name is `config.toml`;
> -   **nodesList** -- Node list of the requested block, separated by commas. The default is `127.0.0.1:7079`;
> -   **daemonMode** -- Started as a daemon and should be used when authentication is required every N seconds. This flag is set to `false` by default;
> -   **queryingPeriod** -- If the tool is started as a daemon, this parameter sets the time interval (in seconds) between checks, `1` second by default.

-   **alertMessageTo** -- The email address to which synchronization warning errors will be sent.

    > -   **alertMessageSubj** -- Message subject in the warning message, the `node synchronization` problem by default;
    > -   **alertMessageFrom** -- Address where the message was sent.
    > -   **smtpHost** -- SMTP server host, used to send emails, the `""` by default;
    > -   **smtpPort** -- SMTP server port, used to send email messages, `25` by default;
    > -   **smtpUsername** -- SMTP server username, `""` by default;
    > -   **smtpPassword** -- SMTP server password, `""` by default.

## Configuration {#configuration}

The tool uses a configuration file in toml format.

By default, it will look for the config.toml file in the folder where to start up the binary file.

The file path can be changed with the **configPath**.

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

* nodes_list - List of nodes (hosts) requesting information.

### [daemon] {#daemon}

Configuration of the daemon mode.

> -   **daemon_mode** -- A tool works as a daemon and performs synchronization checks.
> -   **querying_period** -- Time interval between synchronization checks.

### [alert_message] {#alert-message}

Warning message parameters.

> -   **to** -- recipient's e-mail of synchronization error warning messages;
> -   **subject** -- message subject;
> -   **from** -- sender's e-mail.

### [smtp] {#smtp}

Simple Mail Transfer Protocol (SMTP) server parameters, used to send synchronization error messages.

> -   **host** -- SMTP server hose;
> -   **port** -- SMTP server port; 
> -   **username** -- SMTP server user name; 
> -   **password** --SMTP server password; 
