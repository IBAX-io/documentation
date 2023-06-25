# 同步监控工具 {#synchronized-monitoring-tool}

Desync_monitor是一种特殊工具，可用于验证指定节点上的数据库是否已同步。

该工具可以作为守护进程使用，也可以启动以执行一次性检查。

该工具的操作原理基于以下内容：

> 1.  每个区块包含所有交易的所有更改的哈希，请求指定的节点提供其最后一个区块ID；
> 2.  然后从所有节点请求具有该ID的区块，并比较上述哈希；
> 3.  如果哈希不同，会将同步错误消息发送到命令中指定的电子邮件地址。

## 位置 {#location}

该工具位于 `tools/desync_monitor/`。

## 命令提示标志 {#command-prompt-flags}

可以从命令提示符使用以下标志：

> -   **confPath** -- 配置文件的路径。默认文件名为 `config.toml`；
> -   **nodesList** -- 请求区块的节点列表，以逗号分隔。默认为`127.0.0.1:7079`；
> -   **daemonMode** -- 作为守护进程启动，应该在每N秒需要验证的情况下使用。该标志默认设置为 `false`；
> -   **queryingPeriod** -- 如果工具作为守护进程启动，该参数设置检查之间的时间间隔(以秒为单位)。默认为 `1` 秒。

-   **alertMessageTo** -- 将向其发送同步警告错误的电子邮件地址。

    > -   **alertMessageSubj** -- 在警告消息中的消息主题，默认为节点同步问题；
    > -   **alertMessageFrom** -- 发送消息的地址。
    > -   **smtpHost** -- SMTP服务器主机，用于发送电子邮件，默认为`""`；
    > -   **smtpPort** -- SMTP服务器端口，用于发送电子邮件消息，默认为`25`；
    > -   **smtpUsername** -- SMTP服务器用户名，默认为 `""`；
    > -   **smtpPassword** -- SMTP服务器密码，默认为 `""`。

## 配置 {#configuration}

该工具使用toml格式的配置文件。

默认情况下，它会在启动二进制文件的文件夹中查找 *config.toml* 文件。

可以使用 **configPath** 标志更改文件路径。

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

> -   **nodes_list** -- 请求信息的节点（主机）列表。

### [daemon] {#daemon}

守护进程模式配置。

> -   **daemon_mode** -- 工具作为守护进程工作并执行同步检查。
> -   **querying_period** -- 同步检查之间的时间间隔。

### [alert_message] {#alert-message}

警告消息参数。

> -   **to** -- 同步错误警告消息的收件地址；
> -   **subject** -- 消息主题；
> -   **from** -- 发件地址。

### [smtp] {#smtp}

简单邮件传输协议 (Simple Mail Transfer Protocol, SMTP)
服务器的参数，用于发送同步错误消息。

> -   **host** -- SMTP服务器主机；
> -   **port** --SMTP服务器端口；
> -   **username** -- SMTP服务器用户名；
> -   **password** --SMTP服务器密码；
