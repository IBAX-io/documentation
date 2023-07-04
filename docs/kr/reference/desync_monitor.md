# 실시간 모니터링 도구 {#synchronized-monitoring-tool}

Desync_monitor는 지정된 노드의 데이터베이스가 동기화되었는지 확인하는 특수 도구입니다.

이 도구는 데몬으로 사용하거나 일회성 검사를 실행하는 데 사용할 수 있습니다.

이 도구의 작동 원리는 다음과 같습니다:

> 1. 각 블록에는 모든 거래의 변경 내용에 대한 해시가 포함되어 있으며, 지정된 노드에 마지막 블록 ID를 요청합니다.
> 2. 그런 다음 해당 ID를 가진 블록을 모든 노드에서 요청하고 위의 해시를 비교합니다.
> 3. 해시가 다른 경우, 동기화 오류 메시지가 지정된 이메일 주소로 전송됩니다.

## 위치 {#location}

이 도구는 `tools/desync_monitor/`에 위치해 있습니다.

## 명령 프롬프트 플래그 {#command-prompt-flags}

다음 플래그를 사용하여 명령 프롬프트에서 사용할 수 있습니다:

> -   **confPath** -- 구성 파일의 경로입니다. 기본 파일 이름은 `config.toml`입니다.
> -   **nodesList** -- 블록을 요청할 노드 목록입니다. 쉼표로 구분됩니다. 기본값은 `127.0.0.1:7079`입니다.
> -   **daemonMode** -- 데몬 모드로 실행하여 N초마다 확인해야 할 경우 사용합니다. 이 플래그는 기본적으로 `false`로 설정됩니다.
> -   **queryingPeriod** -- 도구를 데몬 모드로 실행할 경우, 확인 간의 시간 간격(초)을 설정합니다. 기본값은 `1`초입니다.

-   **alertMessageTo** -- 동기화 경고 오류를 받을 이메일 주소입니다.

    > -   **alertMessageSubj** -- 경고 메시지의 제목입니다. 기본값은 "노드 동기화 문제"입니다.
    > -   **alertMessageFrom** -- 메시지를 보내는 주소입니다.
    > -   **smtpHost** -- 이메일을 보내기 위한 SMTP 서버 호스트입니다. 기본값은 `""`입니다.
    > -   **smtpPort** -- 이메일 메시지를 보내기 위한 SMTP 서버 포트입니다. 기본값은 `25`입니다.
    > -   **smtpUsername** -- SMTP 서버 사용자 이름입니다. 기본값은 `""`입니다.
    > -   **smtpPassword** -- SMTP 서버 비밀번호입니다. 기본값은 `""`입니다.

## 구성 {#configuration}

이 도구는 toml 형식의 구성 파일을 사용합니다.

기본적으로 실행 파일이 있는 폴더에서 *config.toml* 파일을 찾습니다.

**configPath** 플래그를 사용하여 파일 경로를 변경할 수 있습니다.

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

> -   **nodes_list** -- 요청 정보의 노드(호스트) 목록을 요청합니다.

### [daemon] {#daemon}

데몬 모드 구성.

> - **daemon_mode** -- 도구가 데몬으로 작동하고 동기화 검사를 수행합니다.
> - **querying_period** -- 동기화 검사 간의 시간 간격.

### [alert_message] {#alert-message}

경고 메시지 매개변수.

> - **to** -- 동기화 오류 경고 메시지를 받을 수신자 주소;
> - **subject** -- 메시지 주제;
> - **from** -- 발신자 주소.

### [smtp] {#smtp}

동기화 오류 메시지를 보내기 위한 (Simple Mail Transfer Protocol SMTP) 서버 매개변수.

> - **host** -- SMTP 서버 호스트;
> - **port** -- SMTP 서버 포트;
> - **username** -- SMTP 서버 사용자 이름;
> - **password** -- SMTP 서버 비밀번호;
