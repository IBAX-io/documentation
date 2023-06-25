# 同期モニタリングツール {#synchronized-monitoring-tool}

Desync_monitorは、指定されたノード上のデータベースが同期されているかどうかを確認するための特別なツールです。

このツールはデーモンとして使用するか、ワンタイムチェックを実行するために起動することができます。

ツールの動作原理は次のとおりです：

1. 各ブロックには、すべてのトランザクションの変更のハッシュが含まれており、指定されたノードに最後のブロックIDを提供するようにリクエストします。
2. 次に、すべてのノードからこのIDのブロックをリクエストし、上記のハッシュを比較します。
3. ハッシュが異なる場合、指定されたコマンドのメールアドレスに同期エラーメッセージが送信されます。

## ロケーション {#location}
このツールは `tools/desync_monitor/` ディレクトリにあります。

## コマンドプロンプトフラグ {#command-prompt-flags}
次のフラグをコマンドプロンプトから使用できます：
* confPath - 設定ファイルのパス。デフォルトのファイル名は `config.toml` です。
* nodesList - リクエストされたブロックのノードリスト。カンマで区切られます。デフォルトは `127.0.0.1:7079` です。
* daemonMode - デーモンとして起動し、N秒ごとに認証が必要な場合に使用する必要があります。デフォルトではこのフラグは `false` に設定されています。
* queryingPeriod - ツールがデーモンとして起動された場合、このパラメータはチェック間隔（秒単位）を設定します。デフォルトは `1` 秒です。
* alertMessageTo - 同期警告エラーが送信されるメールアドレスです。
    * alertMessageSubj - 警告メッセージの件名。デフォルトでは `node synchronization` 問題です。
    * alertMessageFrom - メッセージが送信されたアドレス。
    * smtpHost - メール送信に使用するSMTPサーバーホスト。デフォルトでは `""` です。
    * smtpPort - メールメッセージの送信に使用するSMTPサーバーポート。デフォルトでは `25` です。
    * smtpUsername - SMTPサーバーのユーザー名。デフォルトでは `""` です。
    * smtpPassword - SMTPサーバーのパスワード。デフォルトでは `""` です。

## 設定 {#configuration}
このツールはtoml形式の設定ファイルを使用します。

デフォルトでは、バイナリファイルを起動するフォルダ内のconfig.tomlファイルを探します。

ファイルパスはconfigPathフラグで変更できます。


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

### nodes_list {#nodes-list}
* nodes_list - 情報をリクエストするノード（ホスト）のリスト。

### [daemon] {#daemon}
デーモンモードの設定。
* daemon_mode - ツールがデーモンとして動作し、同期チェックを実行します。
* querying_period - 同期チェック間の時間間隔。

### [alert_message] {#alert-message}
警告メッセージのパラメータ。
* to - 同期エラー警告メッセージの受信者のメールアドレス；
* subject - メッセージの件名；
* from - 送信者のメールアドレス。

### [smtp] {#smtp}
シンプルメール転送プロトコル（SMTP）サーバーのパラメーターで、同期エラーメッセージの送信に使用されます。
* host - SMTPサーバーのホスト；
* port - SMTPサーバーのポート；
* username - SMTPサーバーのユーザー名；
* password - SMTPサーバーのパスワード。
