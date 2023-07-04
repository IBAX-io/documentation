# IBAX 개발 튜토리얼  {#ibax-development-tutorial}

## 시작 가이드 {#getting-started-guide}
- [명령 줄 도구를 사용하여 첫 번째 스마트 계약 배포하기](#deploy-first-smart-contract-via-command-line-tool)
- [명령 줄 도구 Eco 개발](#command-line-tool-eco-development)

## 배포 {#deployment}
- [명령 줄 도구를 사용하여 애플리케이션 배포하기](#deploy-application-using-command-line-tools)
- [명령 줄 도구를 사용하여 생태학적 구성하기](#ecological-configuration-using-command-line-tool)

## 고급 가이드 {#advanced-guide}
- [애플리케이션 패키징 도구를 사용하여 애플리케이션 배포하기](#deploy-applications-using-application-packaging-tool)


## 명령 줄 도구를 사용하여 첫 번째 스마트 계약 배포하기  {#deploy-first-smart-contract-via-command-line-tool}
우리는 [명령 줄 도구](https://github.com/IBAX-io/ibax-cli) 를 통해 IBAX 블록체인에 스마트 계약을 배포하고 스마트 계약을 호출하는 방법을 배우게 될 것입니다.
첫 번째 스마트 계약으로, [로컬 테스트 네트워크](../concepts/blockchain-layers.md) 에 배포했습니다. 로컬 네트워크 배포 방법은 [네트워크 배포](../howtos/deployment.md) 를 참조하시면 됩니다.
따라서 오버헤드 없이 원하는대로 배포하고 실행할 수 있습니다.

### 애플리케이션 생성  {#create-application}
애플리케이션을 생성하기 위해 contract @1NewApplication을 호출합니다. 이 contract에는 애플리케이션 이름 매개변수와 수정 권한 [매개변수](../concepts/about-the-platform.md#access-rights-control-mechanism) 가 있습니다.


```text
1  $ ibax-cli console
2    
3  Welcome to the IBAX console!
4  To exit, press ctrl-d or type exit
5  >callContract @1NewApplication {"Name": "testapp", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
6  
7  {
8    "block_id": 1217,
9    "hash": "6327161d2202c33c06d34ab4ed9b509c05fc2cbb15cf260c6d3d404a6f640028",
10   "penalty": 0,
11   "err": "31"
12 }
```

다음은 각 줄별로 설명되어 있습니다:
- 1행, 커맨드 라인 터미널 시작
- 5행, contract @1NewApplication을 호출하여 애플리케이션 이름 `testapp`과 애플리케이션 수정 권한 `@1DeveloperCondition`과 함께 애플리케이션을 생성합니다.
- 8행, 트랜잭션에 의해 생성된 블록 ID
- 9행, 트랜잭션에 의해 생성된 블록 해시
- 10행, 트랜잭션 실행 실패 시 (0: 벌금 없음, 1: 벌금 있음)
- 11행, 트랜잭션 실행 실패 시 오류 텍스트 메시지를 반환하며, 블록 ID가 반환되면 err 필드는 애플리케이션 ID입니다.

물론 이 contract에서 사용 가능한 필드와 필드 유형을 확인하려면 `getContractInfo` 메서드를 호출하여 다음과 같은 contract 정보를 반환할 수 있습니다:

```text
>getContractInfo @1NewApplication

{
    "id": 5022,
    "state": 1,
    "tableid": "22",
    "walletid": "0",
    "tokenid": "1",
    "address": "0000-0000-0000-0000-0000",
    "fields": [
        {
            "name": "Name",
            "type": "string",
            "optional": false
        },
        {
            "name": "Conditions",
            "type": "string",
            "optional": false
        },
        {
            "name": "VotingId",
            "type": "int",
            "optional": true
        }
    ],
    "name": "@1NewApplication",
    "app_id": 1,
    "ecosystem": 1,
    "conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```
`fields` 필드는 매개변수 `name`, `type`, `optional`,
`Name` 및 `Conditions`는 필수이고 `VotingId`는 선택 사항입니다. [contract/name](../reference/api2.md#contract-name) API 메서드를 참조하세요.


### 스마트 컨트랙트 작성 {#writing-contracts}
[Needle](../topics/script.md#needle-contract-language) 을 사용하여 스마트 컨트랙트를 작성합니다.
간단한 덧셈 연산을 구현합니다. 컨트랙트의 소스 코드는 다음과 같으며, 컨트랙트를 `SumMath.sim`으로 저장합니다.

```text
1    contract SumMath {
2        data {
3            A int
4            B int
5        }
6        conditions {
7    
8        }
9        action {
10            var sum int
11            sum = $A + $B
12            $result = sum
13        }
14    }
```
다음은 각 줄에 대한 설명입니다:
- 1번째 줄에서 SumMath라는 이름의 컨트랙트를 정의합니다.
- 2번째 줄은 [데이터 섹션](../topics/script.md#data-section) 입니다.
- 3-4번째 줄에서는 두 개의 64비트 정수형 입력 매개변수 `A B`를 정의합니다.
- 6번째 줄은 [조건 섹션](../topics/script.md#conditions-section) 입니다.
- 9번째 줄은 [연산 섹션](../topics/script.md#action-section) 입니다. 우리는 변수 sum을 정의하여 A+B의 결과를 받습니다.
sum의 값을 $result에 할당하여 컨트랙트의 결과로 설정합니다. 물론 A+B의 값을 $result에 직접 할당하는 것도 가능하지만, 이는 예시로 보여주기 위한 것입니다.


### 컨트랙트 생성 {#create-contract}
컨트랙트를 생성하는 방법은 두 가지가 있으며, 첫 번째 방법은 다음과 같습니다:
첫 번째 단계에서는 json 형식의 컨트랙트 매개변수 파일을 작성합니다.

```json
{
  "ApplicationId": 31,
  "Value": "contract SumMath {\n    data {\n        A int\n        B int\n    }\n    conditions {\n\n    }\n    action {\n        var sum int\n        sum = $A + $B\n        $result = sum\n    }\n}",
  "Conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```

`ApplicationId`은 어플리케이션 ID이고, `Value`는 컨트랙트 소스 코드이며, 특수 문자를 이스케이프 처리해야 합니다. `Conditions`은 컨트랙트 수정 권한입니다.

이를 `SumMathParams.json`이라고 이름 지었습니다.

두 번째 단계에서는 `@1NewContract`를 호출하여 컨트랙트를 생성합니다.

```
1    >callContract @1NewContract -f=./data/SumMathParams.json
2    {
3        "block_id": 1238,
4        "hash": "f3fe7aff8a613c96299723b7e9af0682aa8cabe7becf67a485e2a77a974f58b6",
5        "penalty": 0,
6        "err": "328"
7    }
```

두 번째 방법: 
저장된 컨트랙트 소스 파일을 컨트랙트 매개변수에 직접 전달합니다. 매개변수 형식은 `paramsName` + `-` + "file", `paramsName-file` 형식입니다. 예시로는 다음과 같습니다.

```shell
1    >callContract @1NewContract {"ApplicationId": 31, "Value-file": "SumMath.sim", "Conditions": "true"}    
2    {
3        "block_id": 2055,
4        "hash": "cdf25060669cf7cba137278...26ca463fd5d458f3402a5f0137f693db",
5        "penalty": 0,
6        "err": "368"
7    }
```

다음은 각 줄별로 설명되어 있습니다:
- 1번째 줄: 컨트랙트 @1NewContract를 호출하여 컨트랙트를 생성합니다. -f는 파일을 사용하여 컨트랙트 매개변수를 가져옵니다.
- 3번째 줄: 트랜잭션에 의해 생성된 블록 ID입니다.
- 4번째 줄: 트랜잭션에 의해 생성된 블록 해시입니다.
- 5번째 줄: 트랜잭션 실행 실패 여부입니다 (0: 패널티 없음, 1: 패널티 있음).
- 6번째 줄: 트랜잭션 실행 실패 시 오류 텍스트 메시지가 반환되며, 블록 ID가 반환되면 err 필드는 컨트랙트의 ID입니다.

이제 방금 배포한 컨트랙트를 호출해 보겠습니다.

```shell
1  >callContract @5SumMath {"A":1, "B":2}
2  
3  {
4      "block_id": 1239,
5      "hash": "7fa09da0b9f65634119a910f9d91aaf4927208278efd62961499ef7e4f4c8c9c",
6      "penalty": 0,
7      "err": "3"
8  }
```
호출이 완료되었고, 결과는 다음과 같습니다. 각 줄별로 설명하겠습니다:
- 첫 번째 줄은 컨트랙트를 호출합니다. 여기서는 생태계 ID가 5인 생태계에 컨트랙트를 배포합니다. 물론 현재 생태계 ID가 5인 경우, 동일한 생태계 내에서는 `callContract SumMath {"A":1, "B":2}`와 같은 방식으로 호출할 수도 있습니다.
- 3번째 줄은 트랜잭션에 의해 생성된 블록 ID입니다.
- 4번째 줄은 트랜잭션에 의해 생성된 블록 해시입니다.
- 5번째 줄은 트랜잭션 실행 실패 여부입니다 (0: 패널티 없음, 1: 패널티 있음).
- 6번째 줄은 트랜잭션 실행 실패 시 오류 텍스트 메시지가 반환되며, 블록 ID가 반환되면 err 필드는 컨트랙트의 결과입니다. 이 값은 `$result`의 값입니다.


## 명령줄 도구 에코 개발 {#command-line-tool-eco-development}
이 튜토리얼에서는 다음을 배우게 됩니다:

1. [생태계 생성](#step-1-create-ecosystem)
2. [애플리케이션 생성](#step-2-create-application)
3. [데이터 테이블 생성](#step-3-create-table)
4. [애플리케이션 매개변수 생성](#step-4-create-application-parameters)
5. [컨트랙트 생성 및 배포](#step-5-create-contract-deploy-contract)
6. [생태계 매개변수 생성](#step-6-create-ecological-parameters)
7. [로컬라이제이션 추가](#step-7-add-localization)
8. [컨트랙트 수정](#step-8-modify-the-contract)
9. [데이터 테이블 권한 수정](#step-9-modify-data-table-permissions)

IBAX 생태계와 애플리케이션의 작동 방식과 위치를 더욱 명확히 이해하기 위해, 간단한 마인드 맵으로 더 잘 이해할 수 있습니다:
![image](/ibax-eco.png)

IBAX 네트워크는 많은 [생태계](../concepts/about-the-platform.md#ecolib) 를 가질 수 있음을 알 수 있습니다.
각 생태계는 여러 [응용 프로그램](../concepts/about-the-platform.md#applications) 을 가질 수 있습니다.
각 애플리케이션에는 [계약](../concepts/thesaurus.md#smart-contract) 이 있습니다.
[테이블](../concepts/about-the-platform.md#tables).
생태학에는 생태적 매개변수가 있고 애플리케이션에는 애플리케이션 매개변수가 있습니다.

### Step 1. 생태계 생성 {#step-1-create-ecosystem}

우리는 [command line tool](https://github.com/IBAX-io/ibax-cli) 을 사용하여 @1NewEcosystem 컨트랙트를 호출하여 생태계를 생성하는 것으로 시작합니다.
생태계 이름을 변경하려면 다음을 호출하세요.


`@1EditEcosystemName` contract.

```shell
1    $ ibax-cli console
2    
3    Welcome to the IBAX console!
4    To exit, press ctrl-d or type exit
5    >callContract @1NewEcosystem {"Name": "goodBoy school"}
6    
7    {
8        "block_id": 1199,
9        "hash": "a1dc90c1772545c16394b9521...227676b27b145743556a8973dd",
10       "penalty": 0,
11       "err": "18"
12   }
```

다음은 각 줄에 대한 설명입니다:
- 1번 줄은 명령 줄 콘솔 프로그램을 시작합니다.
- 5번 줄에서 `@1NewEcosystem` 컨트랙트를 호출하여 테스트 생태계라는 이름으로 생태계를 생성합니다.
- 8번 줄은 트랜잭션으로 생성된 블록 ID입니다.
- 9번 줄은 트랜잭션으로 생성된 블록 해시입니다.
- 10번 줄은 트랜잭션 실행이 실패한 경우(0: 벌금 없음, 1: 벌금 있음)입니다.
- 11번 줄은 트랜잭션 실행이 실패한 경우 오류 텍스트 메시지가 반환되며, 블록 ID가 반환되면 err 필드는 생태계의 ID로 설정됩니다(`18`).

그런 다음 명령 도구의 `config.yml`을 구성하여 `ecosystem`을 생성된 ecid `18`로 설정하고 명령 줄 콘솔 프로그램을 다시 시작하십시오.



```shell
>exit
INFO[0002] Exit

$ vim data/config.yml

$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit
>
```

### Step 2. 애플리케이션 만들기 {#step-2-create-application}

계약 `@1NewApplication`을 호출하여 애플리케이션 이름 매개변수와 수정 [권한 매개변수](../concepts/about-the-platform.md#access-rights-control-mechanism) 가 있는 애플리케이션을 생성합니다.

```text
1  >callContract @1NewApplication {"Name": "GradesRecorder", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
2  
3  {
4     "block_id": 1246,
5     "hash": "85ab8953d26d0d1047fc610866115331babfaf88c80792d50b41826185c9f6f8",
6     "penalty": 0,
7     "err": "47"
8  }
```

만약 애플리케이션 권한을 수정해야 한다면 `EditApplication` 컨트랙트를 호출할 수 있습니다.

다음은 각 라인에 대한 설명입니다:
- 1번 라인: `@1NewApplication` 컨트랙트를 호출하여 `GradesRecorder`라는 애플리케이션을 생성합니다. 애플리케이션 수정 권한은 개발자 권한인 `@1DeveloperCondition`입니다.
- 4번 라인: 트랜잭션으로 생성된 블록 ID입니다.
- 5번 라인: 트랜잭션으로 생성된 블록 해시입니다.
- 6번 라인: 트랜잭션 실행 실패 여부입니다 (0: 벌금 없음, 1: 벌금 있음).
- 7번 라인: 트랜잭션 실행 실패 시 오류 메시지가 반환됩니다. 블록 ID가 반환되면, err 필드에는 애플리케이션의 ID인 `47`이 포함됩니다.

학생들의 성적을 기록하는 간단한 애플리케이션 예시를 작성해보겠습니다.
데이터 테이블 필드에는 학생 정보, 학년 `grade`, 반 `class`, 과목별 성적 `mathematics, physics, literature`, 종합 점수 `overall_score`, 평가 `score`, 생성 타임스탬프 (밀리초) `created_at`이 포함됩니다.

### Step 3. 테이블 만들기 {#step-3-create-table}

  첫 번째 단계에서는 계약 매개변수 파일을 json 형식으로 작성합니다.

```json
{
  "ApplicationId": 47,
  "Name": "grade_info",
  "ColumnsArr": [
    "student",
    "grade",
    "class",
    "mathematics",
    "physics",
    "literature",
    "overall_score",
    "score",
    "created_at"
  ],
  "TypesArr": [
    "varchar",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "varchar",
    "number"
  ],
  "InsertPerm": "ContractConditions(\"MainCondition\")",
  "UpdatePerm": "ContractConditions(\"MainCondition\")",
  "ReadPerm": "true",
  "NewColumnPerm": "ContractConditions(\"MainCondition\")"
}
```

`ApplicationId`는 애플리케이션 ID이고, `Name`은 생성된 데이터 테이블인 `test_table`의 이름입니다.
`ColumnsArr`는 데이터 테이블 필드의 배열이고, `TypesArr`는 데이터 테이블 필드의 타입을 나타냅니다. 이는 9가지 [타입](../concepts/about-the-platform.md#tables) 중 하나입니다.
`varchar`, `character`, `json`, `number`, `datetime`, `double`, `money`, `text`, `bytea`입니다. 필드 이름과 필드 타입은 일대일 대응입니다.
`InsertPerm`은 데이터 테이블의 새로운 항목 추가 권한을 나타내며, `UpdatePerm`은 데이터 테이블의 항목 수정 권한을 나타냅니다. `ReadPerm`은 데이터 테이블의 데이터 읽기 권한을 나타내며, `NewColumnPerm`은 데이터 테이블의 새로운 필드 추가 권한을 나타냅니다.
[권한 제어](../concepts/about-the-platform.md#access-rights-control-mechanism) 를 참조하면, 여기서는 현재 생태계 생성자에게 `ContractConditions(\"MainCondition\")`을 사용할 수 있습니다.

우리는 이를 createTable.json이라고 이름 지어주고, 그 후에 컨트랙트를 호출하여 데이터 테이블 `@1NewTableJoint`를 생성합니다.


```text
>callContract @1NewTableJoint -f ./createTestTable.json
```

### 데이터 테이블 필드 권한 수정 {#modify-data-table-field-permissions}

데이터 테이블 필드 권한을 수정할 수 있습니다. 데이터 테이블 필드 권한에는 읽기 권한과 업데이트 권한이 포함됩니다. 읽기 권한은 컨트랙트에서 `DBFind.Columns` 필터 필드 또는 [list](../reference/api2.md#list-name-limit-offset-columns) 쿼리와 같은 인터페이스를 사용하여 데이터를 조회할 때 사용되며, 권한이 없는 경우 권한 오류가 발생합니다. 업데이트 권한은 데이터 테이블 필드를 업데이트하는 권한입니다. `student` 필드의 읽기 및 업데이트 권한을 `false`로 설정하지만, 물론 일부 컨트랙트에서 조작할 수 있도록 설정할 수도 있습니다. `@1EditColumn` 컨트랙트를 호출하여 데이터 테이블 필드 권한을 수정합니다.


```shell
>callContract @1EditColumn {"TableName": "grade_info", "Name": "student", "UpdatePerm": "false", "ReadPerm": "false"}
```


우리는 여러 개의 애플리케이션 매개 변수 `grade_best_type`, `grade_type_a+`, `grade_type_a`, `grade_type_b+`, `grade_type_b`, `grade_type_c`, 성적 등급 유형을 생성할 수 있습니다.


### Step 4. 애플리케이션 매개 변수 생성하기 {#step-4-create-application-parameters}
`@1NewAppParam` 계약을 호출하여 애플리케이션 매개 변수를 생성합니다. 애플리케이션 매개 변수를 수정하려면 `@1EditAppParam` 계약을 호출할 수 있습니다.


```text
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_best_type", "Value": "A+", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_a+", "Value": "{\"max\": 101,\"min\": 90}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_a", "Value": "{\"max\": 90,\"min\": 80}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_b+", "Value": "{\"max\": 80,\"min\": 70}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_b", "Value": "{\"max\": 70,\"min\": 60}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_c", "Value": "{\"max\": 60,\"min\": 0}", "Conditions": "ContractConditions(\"MainCondition\")"}
```
`grade_best_type`은 최상의 등급 유형입니다.
`grade_type_a+`은 등급이 `A+`인 조건을 트리거하는 등급 조건입니다. 점수가 90 이상 101 미만인 경우 등급은 `A+`이며, 다른 매개 변수들도 유사합니다.


### Step 5. 계약 생성 및 배포 {#step-5-create-contract-deploy-contract}

우리는 학생의 성적 정보와 각 과목에 대한 최종 평가를 기록하기 위한 계약을 생성하고, 정보를 입력할 때 각 과목의 학생의 성적 클래스와 등급을 입력합니다.
각 과목의 입력 점수를 기반으로 평균 계산을 수행하여 총점 `overallScore`과 최종 등급 `score`을 얻습니다.
계약이 호출되면 방금 생성한 데이터 테이블 `grade_info`에 레코드를 생성합니다.

먼저 계약을 작성하고 `NewRecord.sim`으로 이름을 지정합니다.



```text
1	contract NewRecord {				
2	    data {				
3	        Student string				
4	        Grade int				
5	        Class int				
6	        Mathematics int				
7	        Physics int				
8	        Literature int				
9	    }				
10	    func getScore(a b c int) map{				
11	        var m map				
12	        var overallScore int				
13	        overallScore = (a+b+c) / 3				
14	        m["overallScore"] = overallScore				
15	        if overallScore >= $gradeTypeABest["min"] && overallScore < $gradeTypeABest["max"] {				
16	            m["score"] = "A+"				
17	        }elif overallScore >= $gradeTypeA["min"] && overallScore < $gradeTypeA["max"] {				
18	            m["score"] = "A"				
19	        }elif overallScore >= $gradeTypeBBest["min"] && overallScore < $gradeTypeBBest["max"] {				
20	            m["score"] = "B+"				
21	        }elif overallScore >= $gradeTypeB["min"] && overallScore < $gradeTypeB["max"] {				
22	            m["score"] = "B"				
23	        }elif overallScore >= $gradeTypeC["min"] && overallScore < $gradeTypeC["max"]{				
24	            m["score"] = "C"				
25	        }else{				
26	            m["score"] = "Notset"				
27	        }				
28	        return m				
29	    }				
30	    func safeJsonDecode(m string) map {				
31	        var res map				
32	        if Size(m) > 0 {				
33	            res = JSONDecode(m)				
34	        }				
35	        return res				
36	    }				
37					
38	    conditions {				
39	        if Size($Student) == 0 {				
40	            warning "Student Can not be empty"				
41	        }				
42	        if $Class <= 0{				
43	            warning "Class cannot be less than or equal to zero"				
44	        }				
45	        if $Grade <= 0{				
46	            warning "Grade cannot be less than or equal to zero"				
47	        }				
48	        if $Mathematics < 0 {				
49	            warning "Mathematics cannot be less than zero"				
50	        }				
51	        if $Physics < 0 {				
52	            warning "Physics cannot be less than zero"				
53	        }				
54	        if $Literature < 0 {				
55	            warning "Literature cannot be less than zero"				
56	        }				
57	        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{				
58	            warning "Score cannot exceed 100"				
59	        }				
60	        var app map				
61	        app = DBFind("@1applications").Columns("id,ecosystem").Where({"ecosystem": 18,"name":"GradesRecorder","deleted":0}).Row()				
62	        if !app {				
63	            warning LangRes("@1app_not_found")				
64	        }				
65					
66	        var app_id int				
67	        app_id = Int(app["id"])				
68	        $eId = Int(app["ecosystem"])				
69	        $gradeBestType = AppParam(app_id, "grade_best_type", $eId)				
70	        $gradeTypeABest = safeJsonDecode(AppParam(app_id, "grade_type_a+", $eId))				
71	        $gradeTypeA = safeJsonDecode(AppParam(app_id, "grade_type_a", $eId))				
72	        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, "grade_type_b+", $eId))				
73	        $gradeTypeB = safeJsonDecode(AppParam(app_id, "grade_type_b", $eId))				
74	        $gradeTypeC = safeJsonDecode(AppParam(app_id, "grade_type_c", $eId))				
75	    }				
76	    action {				
77	        var m map 				
78	        m = getScore($Mathematics,$Physics,$Literature)				
79	        var in map				
80	        in["student"] = $Student				
81	        in["class"] = $Class				
82	        in["grade"] = $Grade				
83	        in["mathematics"] = $Mathematics				
84	        in["physics"] = $Physics 				
85	        in["literature"] = $Literature 				
86	        in["overall_score"] = m["overallScore"]				
87	        in["score"] = m["score"]				
88	        in["created_at"] = $time				
89	        DBInsert("@"+ Str($eId)+"grade_info", in)				
90	    }				
91	}				
```

다음은 라인별로 설명됩니다:
- 2번 라인, [데이터 섹션](../topics/script.md#data-section) 에서 입력 매개변수인 `Student` 학생 이름, `Grade` 학년, `Class` 학급, `Mathematics` 수학 점수, `Physics` 물리 점수, `Literature` 문학 점수를 정의합니다.
- 10번 라인, getScore 함수는 각 과목의 점수를 기반으로 총점과 최종 등급을 생성합니다.
- 30번 라인, safeJsonDecode 함수는 문자열을 json 디코딩하여 맵으로 변환합니다.
- 38번 라인, [조건부 섹션](../topics/script.md#conditions-section)
- 39번 라인, [작업 섹션](../topics/script.md#action-section)

계약이 호출되면 먼저 조건부 부분을 거쳐 계약의 입력 매개변수가 유효한지 확인합니다. 예를 들어 학생 이름 `$Student`이 비어 있는지 확인하는 부분 (39번 라인)과 그렇지 않으면 오류 메시지 `"Student Can not be empty"` (30번 라인)을 반환합니다.
모든 입력 매개변수가 확인되면 61번 라인에서 [DBFind](../topics/script.md#dbfind) 를 사용하여 ecid `18`과 애플리케이션 이름이 `GradesRecorder`인 애플리케이션의 데이터베이스에서 정보를 검색합니다. `deleted=0`인 애플리케이션 정보가 삭제되지 않은 경우입니다.
69번부터 74번 라인에서 [AppParam](../topics/script.md#appparam) 을 사용하여 애플리케이션 매개변수를 검색합니다. 예를 들어 `$gradeBestType = AppParam(app_id, "grade_best_type", $eId)` (69번 라인)와 같이 사용합니다.
만약 애플리케이션 매개변수가 json 형식으로 저장된 경우, 예를 들어 `grade_type_a`라면, `$gradeTypeABest = safeJsonDecode(AppParam(app_id, "grade_type_a+", $eId))`와 같이 사용하여 safeJsonDecode 함수를 통해 애플리케이션 매개변수를 맵 형식으로 가져올 수 있습니다.

그런 다음 작업 부분으로 이동하여 getScore 함수를 호출하여 결과로 나온 총점과 최종 등급을 가져옵니다 (10번 라인). 맵을 사용하여 학생 성적 정보를 저장하기 위해 79번 라인에서 맵을 정의하고,
[DBInsert](../topics/script.md#dbinsert) 를 사용하여 데이터를 데이터 테이블 `@18grade_info`에 삽입합니다.

계약을 생성하는 방법에는 두 가지가 있으며 그 중 첫 번째는 다음과 같습니다.
  먼저 json 형식으로 계약 매개변수 파일을 작성합니다:


```json
{
  "ApplicationId": 47,
  "Value": "contract NewRecord {\n    data {\n        Student string\n        Grade int\n        Class int\n        Mathematics int\n        Physics int\n        Literature int\n    }\n    func getScore(a b c int) map{\n        var m map\n        var overallScore int\n        overallScore = (a+b+c) / 3\n        m[\"overallScore\"] = overallScore\n        if overallScore >= $gradeTypeABest[\"min\"] && overallScore < $gradeTypeABest[\"max\"] {\n            m[\"score\"] = \"A+\"\n        }elif overallScore >= $gradeTypeA[\"min\"] && overallScore < $gradeTypeA[\"max\"] {\n            m[\"score\"] = \"A\"\n        }elif overallScore >= $gradeTypeBBest[\"min\"] && overallScore < $gradeTypeBBest[\"max\"] {\n            m[\"score\"] = \"B+\"\n        }elif overallScore >= $gradeTypeB[\"min\"] && overallScore < $gradeTypeB[\"max\"] {\n            m[\"score\"] = \"B\"\n        }elif overallScore >= $gradeTypeC[\"min\"] && overallScore < $gradeTypeC[\"max\"]{\n            m[\"score\"] = \"C\"\n        }else{\n            m[\"score\"] = \"Notset\"\n        }\n        return m\n    }\n    func safeJsonDecode(m string) map {\n        var res map\n        if Size(m) > 0 {\n            res = JSONDecode(m)\n        }\n        return res\n    }\n\n    conditions {\n        if Size($Student) == 0 {\n            warning \"Student Can not be empty\"\n        }\n        if $Class <= 0{\n            warning \"Class cannot be less than or equal to zero\"\n        }\n         if $Grade <= 0{\n            warning \"Grade cannot be less than or equal to zero\"\n        }\n        if $Mathematics < 0 {\n            warning \"Mathematics cannot be less than zero\"\n        }\n        if $Physics < 0 {\n            warning \"Physics cannot be less than zero\"\n        }\n        if $Literature < 0 {\n            warning \"Literature cannot be less than zero\"\n        }\n        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{\n            warning \"Score cannot exceed 100\"\n        }\n        var app map\n        app = DBFind(\"@1applications\").Columns(\"id,ecosystem\").Where({\"ecosystem\": 18,\"name\":\"GradesRecorder\",\"deleted\":0}).Row()\n        if !app {\n            warning LangRes(\"@1app_not_found\")\n        }\n\n        var app_id int\n        app_id = Int(app[\"id\"])\n        $eId = Int(app[\"ecosystem\"])\n        $gradeBestType = AppParam(app_id, \"grade_best_type\", $eId)\n        $gradeTypeABest = safeJsonDecode(AppParam(app_id, \"grade_type_a+\", $eId))\n        $gradeTypeA = safeJsonDecode(AppParam(app_id, \"grade_type_a\", $eId))\n        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, \"grade_type_b+\", $eId))\n        $gradeTypeB = safeJsonDecode(AppParam(app_id, \"grade_type_b\", $eId))\n        $gradeTypeC = safeJsonDecode(AppParam(app_id, \"grade_type_c\", $eId))\n    }\n    action {\n        var m map \n        m = getScore($Mathematics,$Physics,$Literature)\n        var in map\n        in[\"student\"] = $Student\n        in[\"class\"] = $Class\n        in[\"grade\"] = $Grade\n        in[\"mathematics\"] = $Mathematics\n        in[\"physics\"] = $Physics \n        in[\"literature\"] = $Literature \n        in[\"overall_score\"] = m[\"overallScore\"]\n        in[\"score\"] = m[\"score\"]\n        in[\"created_at\"] = $time\n        DBInsert(\"@\"+ Str($eId)+\"grade_info\", in)\n    }\n}",
  "Conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```

여기서 'ApplicationId'는 특수 문자에 대해 이스케이프해야 하는 애플리케이션 ID이고 'Conditions'는 계약 수정 권한입니다.
`NewRecordParams.json`으로 저장하는 `Value` 계약 소스 코드:


계약을 작성한 후 CreateContract`@1NewContract`를 호출하여 계약을 배포해야 합니다.

```text
1    >>callContract @1NewContract -f=./data/NewRecordParams.json
2    {
3        "block_id": 1262,
4        "hash": "d896f12f685835f6cf71705e1ba...4d8bcc0a1406f7b0b6482b2d230fc",
5        "penalty": 0,
6        "err": "348"
7    }
```
다음은 행으로 설명됩니다.
- 1행: 컨트랙트 `@1NewContract`를 호출하여 컨트랙트를 생성하고, -f는 파일을 사용하여 방금 생성된 `NewRecord.json` 파일을 컨트랙트 매개변수로 가져옵니다.
- 3행, 트랜잭션에 의해 생성된 블록 ID
- 4행, 트랜잭션에 의해 생성된 블록 해시
- 5행, 트랜잭션 실행 실패 시 (0: 페널티 없음 1: 페널티)
- 6행에서 트랜잭션 실행이 실패하면 오류 문자 메시지가 리턴되고, 블록 ID가 리턴되면 컨트랙트의 id인 err 필드는 `348`입니다.

두 번째 방법:
저장된 계약 소스 파일은 다음과 같이 `paramsName` + `-` + "file",`paramsName-file` 매개변수 형식으로 계약 매개변수에 직접 전달됩니다.

```shell
callContract @1NewContract {"ApplicationId": 47, "Value-file": "NewRecord.sim", "Conditions": "ContractConditions(\"@1DeveloperCondition\ ")"}
```

방금 생성한 계약을 호출해 보겠습니다.

```text
1  >callContract @18NewRecord {"Student": "tom", "Grade": 1, "Class": 1, "Mathematics": 18, "Physics": 57, "Literature": 93}
2  
3  {
4     "block_id": 1263,
5     "hash": "1b964a47fe6c5fd43ea55a752d01edb5ad576432fd6f63315344d87999a0473d",
6     "penalty": 0,
7     "err": ""
8  }
```
호출이 완료된 다음 데이터 테이블에 레코드가 저장되었는지 확인합니다.

```text
>getList @18grade_info
{
    "count": 1,
    "list": [
        {
            "class": "1",
            "created_at": "1683698914109",
            "grade": "1",
            "id": "9",
            "literature": "93",
            "mathematics": "18",
            "overall_score": "56",
            "physics": "57",
            "score": "C",
            "student": "tom"
        }
    ]
}
```
전체 등급이 56이고 등급이 C인 `student` tom이라는 레코드가 데이터 테이블에 이미 있음을 알 수 있습니다.

위의 예는 연구 및 연구 목적일 뿐이므로 데이터 테이블 쓰기 권한, 계약 수정 권한 등과 같은 실제 상황에 따라 관련 매개변수를 변경해야 합니다.
 
예를 들어, 한 사람만 이 새 레코드 계약을 호출할 수 있고 다른 사람은 호출할 수 없도록 지정하려는 경우 생태학적 매개변수 `new_record_account`를 설정할 수 있습니다.

### Step 6. 생태 매개변수 생성 {#step-6-create-ecological-parameters}

계약 `@1NewParameter`를 호출하면 에코 매개변수가 생성됩니다.
`@1parameters` 테이블의 `new_record_account`, 에코 매개변수를 수정해야 하는 경우 `@1EditParameter`를 호출할 수 있습니다.

```text
>callContract @1NewParameter {"Name": "new_record_account", "Value": "6667782293976713160", "Conditions": "ContractConditions(\"MainCondition\")"}

{
    "block_id": 1416,
    "hash": "12fc87ce6a70e2fc993ab9ffe623311f1c50edd1157595ce6183c38c93960cae",
    "penalty": 0,
    "err": "273"
}
```
우리는 생태 매개변수 `new_record_account`를 생성하고 값을 keyId `6667782293976713160`으로 설정하고 현재 생태 생성자가 수정할 수 있음을 의미하는`ContractConditions("MainCondition")`에 대한 권한을 수정합니다.
트랜잭션이 성공적으로 실행되면 "err" 필드의 생태 매개변수 id는 `273`입니다.

### Step 7. 현지화 추가 {#step-7-add-localization}
`@1NewLangJoint` 계약을 호출하여 `@1languages` 테이블에 매개변수를 생성하는 현지화 매개변수`account_not_access`를 생성하고 `@1EditLangJoint`를 통해 현지화 매개변수를 수정할 수 있습니다.

```shell
callContract @1NewLangJoint {"Name": "account_not_access", "LocaleArr": ["en", "ja"], "ValueArr": ["Sorry, you do not have access to this action", "申し訳ありませんが、このアクションにアクセスする権限がありません"]}
```

### Step 8. 스마트 계약 수정 {#step-8-modify-the-contract}
다음으로 `conditions`에 다음 코드를 추가하여 계약 소스 코드의 `conditions` 섹션을 수정해야 합니다.

```text
conditions {
  if EcosysParam("new_record_account") != $key_id {
      warning LangRes("account_not_access")
  }
}
```
계약 @1EditContract를 수정하기 위해 호출합니다. 여기서 `Id`는 계약 ID이고 `Value`:는 계약 소스 코드입니다.

```text
>callContract @1EditContract {"Id": 348, "Value": "contract NewRecord {\n    data {\n        Student string\n        Grade int\n        Class int\n        Mathematics int\n        Physics int\n        Literature int\n    }\n    func getScore(a b c int) map{\n        var m map\n        var overallScore int\n        overallScore = (a+b+c) / 3\n        m[\"overallScore\"] = overallScore\n        if overallScore >= $gradeTypeABest[\"min\"] && overallScore < $gradeTypeABest[\"max\"] {\n            m[\"score\"] = \"A+\"\n        }elif overallScore >= $gradeTypeA[\"min\"] && overallScore < $gradeTypeA[\"max\"] {\n            m[\"score\"] = \"A\"\n        }elif overallScore >= $gradeTypeBBest[\"min\"] && overallScore < $gradeTypeBBest[\"max\"] {\n            m[\"score\"] = \"B+\"\n        }elif overallScore >= $gradeTypeB[\"min\"] && overallScore < $gradeTypeB[\"max\"] {\n            m[\"score\"] = \"B\"\n        }elif overallScore >= $gradeTypeC[\"min\"] && overallScore < $gradeTypeC[\"max\"]{\n            m[\"score\"] = \"C\"\n        }else{\n            m[\"score\"] = \"Notset\"\n        }\n        return m\n    }\n    func safeJsonDecode(m string) map {\n        var res map\n        if Size(m) > 0 {\n            res = JSONDecode(m)\n        }\n        return res\n    }\n\n    conditions {\n        if EcosysParam(\"new_record_account\") != $key_id {\n            warning LangRes(\"account_not_access\")\n        }\n        if Size($Student) == 0 {\n            warning \"Student Can not be empty\"\n        }\n        if $Class <= 0{\n            warning \"Class cannot be less than or equal to zero\"\n        }\n         if $Grade <= 0{\n            warning \"Grade cannot be less than or equal to zero\"\n        }\n        if $Mathematics < 0 {\n            warning \"Mathematics cannot be less than zero\"\n        }\n        if $Physics < 0 {\n            warning \"Physics cannot be less than zero\"\n        }\n        if $Literature < 0 {\n            warning \"Literature cannot be less than zero\"\n        }\n        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{\n            warning \"Score cannot exceed 100\"\n        }\n        var app map\n        app = DBFind(\"@1applications\").Columns(\"id,ecosystem\").Where({\"ecosystem\": 18,\"name\":\"GradesRecorder\",\"deleted\":0}).Row()\n        if !app {\n            warning LangRes(\"@1app_not_found\")\n        }\n\n        var app_id int\n        app_id = Int(app[\"id\"])\n        $eId = Int(app[\"ecosystem\"])\n        $gradeBestType = AppParam(app_id, \"grade_best_type\", $eId)\n        $gradeTypeABest = safeJsonDecode(AppParam(app_id, \"grade_type_a+\", $eId))\n        $gradeTypeA = safeJsonDecode(AppParam(app_id, \"grade_type_a\", $eId))\n        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, \"grade_type_b+\", $eId))\n        $gradeTypeB = safeJsonDecode(AppParam(app_id, \"grade_type_b\", $eId))\n        $gradeTypeC = safeJsonDecode(AppParam(app_id, \"grade_type_c\", $eId))\n    }\n    action {\n        var m map \n        m = getScore($Mathematics,$Physics,$Literature)\n        var in map\n        in[\"student\"] = $Student\n        in[\"class\"] = $Class\n        in[\"grade\"] = $Grade\n        in[\"mathematics\"] = $Mathematics\n        in[\"physics\"] = $Physics \n        in[\"literature\"] = $Literature \n        in[\"overall_score\"] = m[\"overallScore\"]\n        in[\"score\"] = m[\"score\"]\n        in[\"created_at\"] = $time\n        DBInsert(\"@\"+ Str($eId)+\"grade_info\", in)\n    }\n}"}
```


#### Step 9. 데이터 테이블 권한 수정 {#step-9-modify-data-table-permissions}
여기서 데이터 테이블의 삽입 권한, ecreator에 대한 원래 권한 `ContractConditions("MainCondition")`, 계약 설정 `new_record_account`는 ecreator가 아닙니다.
따라서 `ContractConditions("MainCondition")`을 변경하여 계약이 `ContractAccess("@18NewRecord")`에서 작동할 수 있도록 지정하십시오.
계약 `@1EditTable`을 호출하여 데이터 테이블 권한을 수정하십시오.

```text
>callContract @1EditTable {"Name": "@18grade_info", "InsertPerm": "ContractAccess(\"@18NewRecord\")", "UpdatePerm": "ContractConditions(\"MainCondition\")", "ReadPerm": "true", "NewColumnPerm": "ContractConditions(\"MainCondition\")"}
```

그런 다음 방금 수정한 계약을 호출하고 새 레코드를 만듭니다.

```text
1  >callContract @18NewRecord {"Student": "tom", "Grade": 1, "Class": 1, "Mathematics": 18, "Physics": 57, "Literature": 93}
2  
3  {
4      "block_id": 1435,
5      "hash": "7d4b06d3738133f9c2ec775935478cd2d6c20fd04eca275769afd0f8e6a4f687",
6      "penalty": 1,
7      "err": "{\"type\":\"warning\",\"error\":\"Sorry, you do not have access to this action\"}"
8  }
```
방금 설정한 현지화 매개변수`account_not_access`가 작동하는 것을 확인할 수 있습니다.

권한 오류가 보고되고 현재 사용자에게 작업 권한이 없으며 keyId가 `6667782293976713160`인 계정으로 전환하고 명령줄 도구인 `account info`를 통해 현재 사용자의 정보를 얻을 수 있습니다.
명령줄 도구 config.yml을 설정하고 keyId가 '6667782293976713160'인 계정으로 전환합니다.
설정이 완료되면 컨트랙트를 다시 호출합니다.

```text
>callContract @18NewRecord {"Student": "tini", "Grade": 1, "Class": 3, "Mathematics": 69, "Physics": 89, "Literature": 98}

{
    "block_id": 1436,
    "hash": "93327dafb7bae9f9f66718eb87020a7bca4c00060f4bd0a243b49eea304c52e6",
    "penalty": 0,
    "err": ""
}
```
호출이 완료되고 `getList @18grade_info`를 통해 데이터 테이블을 쿼리하며 결과는 예상대로입니다.

이 기사가 IBAX 네트워크 작동 방식과 명확하고 안전한 'Needle' 코드를 작성하는 방법에 대해 자세히 알아보는 데 도움이 되었기를 바랍니다.


## 명령줄 도구를 사용하여 애플리케이션 배포 {#deploy-application-using-command-line-tools}

이 자습서에서는 다음 방법을 배웁니다.
- 1. [수출 신청](#export-application)
- 2. [신청서 가져오기](#import-application)

이 자습서를 시작하기 전에 자신만의 응용 프로그램이 있어야 하고 생태학 및 응용 프로그램의 개념을 알아야 합니다. [시작 안내서](#getting-started-guide) 를 참조할 수 있습니다.
[명령줄 도구](https://github.com/IBAX-io/ibax-cli) 를 통해 IBAX 블록체인에서 애플리케이션을 가져올 것입니다. 애플리케이션 내보내기


### 수출 신청 {#export-application}
 현재 계정 정보를 조회하려면 `account info`를 호출하세요. 여기에서 로그인 ecid는 `9`입니다. 현재 애플리케이션을 조회하려면 `getList` 명령을 호출하세요.

```shell
$ ibax-cli console
   
Welcome to the IBAX console!
To exit, press ctrl-d or type exit
>account info
{
    "public_key": "04d11ea197fe23152562c6f54c4...889c074dfd9080099982d8b2d4d100315e1cebc7",     
    "ecosystem_id": 9,
    "key_id": 6660819...78795186,
    "account": "0666-0819-...-7879-5186"
}

>getList @1applications -w={"ecosystem": 9}

{
    "count": 6,
    "list": [
        {
            "conditions": "true",
            "deleted": "0",
            "ecosystem": "9",
            "id": "36",
            "name": "testapp",
            "uuid": "00000000-0000-0000-0000-000000000000"
        }
        ...
    ]
}
```

현재 생태계에 6개의 애플리케이션이 있음을 알 수 있습니다. `export` 명령을 사용하여 `id`가 `36`인 애플리케이션을 내보냅니다.

```shell
>export 36 -f=./data.json

{
    "name": "./data.json",
    "type": "application/json",
    "value": ""
}
```

여기서 -f 매개변수는 현재 디렉토리에 `data.json` 파일에 내보낸 애플리케이션을 저장합니다.
만약 -f 매개변수가 없다면, 애플리케이션 데이터는 명령 터미널에 출력됩니다.


`export` 명령어는 애플리케이션을 내보내는 과정을 캡슐화합니다. 위의 명령어를 사용하여 애플리케이션을 내보내거나, 다음과 같은 단계를 사용할 수 있습니다:
`@1ExportNewApp` contract를 호출하여 새로운 애플리케이션을 내보내면, 내보낸 애플리케이션에 대한 `1_buffer_data` 테이블에 레코드가 생성됩니다.


```shell
>callContract @1ExportNewApp {"ApplicationId": 36}
```

`@1Export` contract를 호출하여 애플리케이션을 내보내고, `1_buffer_data` 테이블에서 선택한 애플리케이션을 찾아 모든 애플리케이션 리소스를 생성된 JSON 문자열로 내보냅니다.
생성된 JSON 문자열은 현재 에코시스템의 `1_binaries` 테이블에 기록됩니다.


```shell
>callContract @1Export
```

`getList` 명령으로 `1_binaries` 테이블의 데이터를 쿼리합니다.

```shell
>getList @1binaries -w={"name": "export", "account": "0666-0819-...-7879-5186", "ecosystem": 9, "app_id": 36} -l=1 -c="id,hash"

{
    "count": 1,
    "list": [
        {
            "hash": "8542cb57b77e0ae2c...92c3e05dbbe35ab646789be5b8ba8",
            "id": "14"
        }
    ]
}
```

바이너리 ID와 해시를 가져옵니다.
바이너리 파일을 내보내려면 `binaryVerify` 명령을 호출하십시오.

```shell
>binaryVerify 14 8542cb57b77e0ae2c...92c3e05dbbe35ab646789be5b8ba8 -f=./data.json

{
    "name": "./data.json",     
    "type": "application/json",
    "value": ""
}
```
 
### 수입 신청 {#import-application}
애플리케이션을 가져오려면 `import` 명령을 사용하고 가져올 애플리케이션 파일을 지정하려면 `-f` 매개변수를 사용하십시오.

```shell
$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit

>import -f . /data.json
```

`import` 명령은 애플리케이션 가져오기의 단계를 캡슐화합니다. 위의 명령을 사용하여 애플리케이션을 가져올 수 있습니다.

또는 다음과 같은 단계를 사용할 수도 있습니다. 이는 학습 및 연구를 위한 편의를 위해 다음과 같이 제공됩니다:
- 단계 1
`@1ImportUpload` 계약을 호출하여 새 애플리케이션을 가져오면 내보낸 애플리케이션에 대한 `1_buffer_data` 테이블에 레코드가 생성됩니다.
`@1ImportUpload` 계약 매개변수 `Data`는 `file` [유형](../topics/vm.md#types) 입니다.
`Data`에는 `Name` 파일 이름 (문자열), `MimeType` 파일 유형 (문자열), `Body` ([]byte) 파일 내용이 포함됩니다.
애플리케이션 파일 데이터를 base64로 인코딩하고 `Body`에 전달해야하며, `base64Encode` 명령을 사용하여 base64로 인코딩 할 수 있습니다.



```shell
>base64Encode -f=./data.json

Encode:ewoJIm5hbWUiOiAid...CQkJIlR5cGUiOiAiY29udHJhY3RzIiwKCQkJIk5hbWUiOiAiSGVsbG9Xb3JsZCIsCgkJCSJWYWx1ZSI6...

>callContract @1ImportUpload {"Data": {"Name": "filename", "MimeType": "mimeType", "Body": "ewoJIm5hbWUiOiAid...CQkJIlR5cGUiOiAiY29udHJhY3RzIiwKCQkJIk5hbWUiOiAiSGVsbG9Xb3JsZCIsCgkJCSJWYWx1ZSI6..."}}
```

-	단계 2
호출이 완료되면 `getList` 명령을 사용하여 `1_buffer_data` 테이블의 데이터를 쿼리합니다.

```shell
>getList @1buffer_data -w={"key": "import", "account": "0666-0819-xxxx-7879-5186", "ecosystem": 19} -l=1 -c=value->'data'

{
    "count": 1,
    "list": [
        {
            "id": "22",
            "value.data": "[{"Data": "[a,b]"}, {"Data": "[c,d]"}]"
        }
    ]
}
```

- 단계 3
value.data->Data의 데이터를 1차원 배열 [a,b,c,d]로 어셈블합니다.
그런 다음 다음 내용으로 계약 매개 변수 파일 `importParams.json`을 만듭니다.

```json
{"Data":"[a,b,c,d]"}
```

-	단계 4
계약 `@1Import`를 호출하여 애플리케이션 데이터를 가져옵니다.

```shell
>callContract @1Import -f=./importParams.json
```


## 생태 파라미터를 구성하기 위해 명령 줄 도구를 사용합니다. {#ecological-configuration-using-command-line-tool}

이 자습서에서는 다음 방법을 배웁니다.
- 1. [생태계 가입 신청](#apply-to-join-the-ecosystem)
- 2. [생태계 구성원 추가](#add-ecosystem-members)
- 3. [역할 관리](#role-management)
- 4. [토큰 발행](#issuance-of-token) 
- 5. [생태계 공제](#eco-deduction)
- 6. [DAO 생태계 운영](#dao-governance-ecosystem)


Before starting this tutorial, you need to have an application of your own and know the concept of ecosystem and application, you can refer to [Getting Started Guide](#getting-started-guide)
We will do the ecological configuration on the IBAX blockchain via [command line tool](https://github.com/IBAX-io/ibax-cli)

### 생태계 가입 신청 (Apply to join the ecosystem) {#apply-to-join-the-ecosystem}

우리는 `@1MembershipRequest` 컨트랙트를 호출하여 생태계 가입을 요청할 수 있습니다.
다음 예:

```shell
>callContract @1MembershipRequest {"EcosystemId": 19}
```

생태 ID가 `19`인 생태에 가입 요청, `@1MembershipRequest` 계약은 생태를 호출하는 데 제한을 두며 기본 생태에서만 호출할 수 있습니다.
신청이 성공하면 대상 생태계 관리자가 신청을 받게 되며, 생태 관리자가 신청을 승인해야만 대상 생태에 합류한 것으로 간주됩니다.
물론 대상 생태가 공개된 경우 대상 생태에 직접 가입할 수 있습니다.

### 생태계 구성원 추가 (Add ecosystem members) {#add-ecosystem-members}

생태계가 막 생성되었을 때 생태계 구성원은 생태계 생성자일 뿐이며, 다른 구성원을 초대해야 하는 경우 초대받은 사람의 공개 키를 알고 계약 `@1MembershipAdd`를 호출하여 구성원을 추가해야 합니다. :

```shell
>callContract @1MembershipAdd {"Keys": "04f2c1780ca0aa0f343d0e541c77811...3b0d5bf3a9903253aad6e78c966b5f91ffb32703884020"}
```

생태계가 공개되어 누구나 가입할 수 있는 경우 기본적으로 공개되지 않는 생태계 매개변수 `free_membership` = 1을 설정할 수 있습니다.
일단 설정되면 에코시스템에 참여하기 위해 승인을 받을 필요가 없습니다.


```shell
>callContract @1NewParameter {"Name": "free_membership", "Value": "1", "Conditions": "ContractConditions(\"MainCondition\")"}
```

`free_membership` 매개변수를 설정하지 않으면 다른 구성원이 생태계 가입을 신청할 때 신청 알림을 받게 됩니다.


`@1MembershipDecide` 계약 승인 신청을 호출합니다. 계약 매개변수 `NotificId`는 알림 ID이고, 'Accept'는 해결 표시이고, 해결 표시 `1`은 전달됩니다.

```shell
>callContract @1MembershipDecide {"NotificId": 6, "Accept": 1}
```

### 계정 동결 (Freezing of accounts) {#freezing-of-accounts}

계정을 동결하려면 `@1DeleteMember` 컨트랙트를 호출하세요. 이 작업은 복원할 수 없습니다.

```shell
>callContract @1DeleteMember {"MemberAccount": "1539-2715-xxxx-1679-5385"}
```

### 역할 관리 (Role management) {#role-management}

- [새 역할 생성](#new-role-creation)
- [역할 멤버 추가](#adding-role-members)
- [역할 멤버 삭제](#delete-role-members)
- [역할 관리자 수정](#modify-role-manager)
- [역할 삭제](#delete-role)


#### 새 역할 생성 (New role creation) {#new-role-creation}

`@1RolesCreate` 계약을 호출하여 새 역할, 역할 이름 `student`, 유형 `2`(1 - 할당 가능 2 - 투표 유형 3 - 시스템에 의해 선출됨)을 생성합니다.

```shell
>callContract @1RolesCreate {"Name": "student", "Type": 2}
{
    "block_id": 1685,
    "hash": "5321f2231a...d0d80158b62766395f14d0ff7",
    "penalty": 0,
    "err": "21"
}
```
반환 결과에는 역할 ID `21`이 포함됩니다.

#### 역할 멤버 추가 (Adding Role Members) {#adding-role-members}

두 가지 방법이 있습니다. 첫 번째 방법은 생태계 구성원이 응용 프로그램을 시작하고 계약 `@1RolesRequest` 요청을 호출하여 역할의 구성원으로 추가하는 것입니다. 여기서 `Rid`는 역할 ID입니다.

```shell
>callContract @1RolesRequest {"Rid": 21}
```

두 번째 방법은 역할 관리자가 역할 구성원을 할당하고 역할 관리자가 `@1RolesAssign` 계약을 호출하여 구성원을 역할에 추가하는 것입니다.

```shell
>callContract @1RolesAssign {"MemberAccount": "0666-7782-xxxx-7671- 3160", "Rid": 21}
```

#### 역할 멤버 삭제 (Delete role members) {#delete-role-members}

먼저 다음과 같이 getList를 통해 쿼리할 수 있는 역할의 구성원을 확인합니다.

```shell
>getList @1roles_participants -w={"ecosystem": 18, "role->id": "21", "deleted": 0}

{
    "count": 3,
    "list": [
        {
            "appointed": "{\"account\": \"1273-2644-xxxx-5846-6598\", \"image_id\": \"0\", \"member_name\": \"founder\"}",
            "date_created": "1684916023",
            "date_deleted": "0",
            "deleted": "0",
            "ecosystem": "18",
            "id": "21",
            "member": "{\"account\": \"1273-2644-xxxx-5846-6598\", \"image_id\": \"0\", \"member_name\": \"founder\"}",
            "role": "{\"id\": \"20\", \"name\": \"teacher\", \"type\": \"1\", \"image_id\": \"0\"}"
        }
        ...
    ]
}
```

여기서 `where` 조건 `ecosystem`은 생태계를 지정하고 `role->id`는 역할 ID를 지정하고 `deleted`: 0은 삭제되지 않음을 지정합니다.
멤버가 `1273-2644-xxxx-5846-6598`인 역할, 즉 `id`가 `21`인 역할을 제거하려는 경우 3개의 행이 있음을 알 수 있습니다.
관리자는 계약 `@1RolesUnassign`을 호출하여 다음과 같이 역할 구성원을 제거할 수 있습니다.

```shell
>callContract @1RolesUnassign {"RowId": 21}
```

#### 역할 관리자 수정 (Modify Role Manager) {#modify-role-manager}

현재 생태계 역할을 살펴보겠습니다.

```shell
>getList @1roles -w={"ecosystem": 18}

{
    "count": 5,
    "list": [
        {
            "company_id": "0",
            "creator": "{\"account\": \"1273-2644-xxxx-5846-6598\", \"image_id\": \"0\", \"member_name\": \"founder\"}",
            "date_created": "1684910917",
            "date_deleted": "0",
            "default_page": "",
            "deleted": "0",
            "ecosystem": "18",
            "id": "20",
            "image_id": "0",
            "role_name": "teacher",
            "role_type": "1",
            "roles_access": "[]"
        }
        ...
    ]
}
```

여기서 `roles_access`는 현재 역할에 대한 관리 역할이며 배열이며 둘 이상일 수 있습니다.
`@1RolesAccessManager` 계약을 호출하여 `teacher` 역할에 관리 역할을 추가합니다. 여기서 계약 매개변수 `Action` 관리 연산자(`clean`, `remove`, `add`), `Rid` 역할 ID는 역할의 Rid Manager인 `ManagerRid`를 관리해야 합니다.

```shell
>callContract @1RolesAccessManager {"Action": "add", "Rid": 20, "ManagerRid": 13}

{
    "block_id": 1745,
    "hash": "e2eb8ff0dc309ec7652db...bbbe58bca4ca574804e46c2f63653eb73104",
    "penalty": 0,
    "err": ""
}
```

#### 역할 삭제 (Delete Role) {#delete-role}

역할을 삭제하기 위해 `@1RolesDelete` 계약을 호출할 수 있습니다. 계약 매개변수 `Rid`는 관리할 역할의 ID이고 `Ops`는 운영자입니다(`D`는 삭제, R`은 복원임).

```shell
>callContract @1RolesDelete {"Rid": 24, "Ops": "D"}

{
    "block_id": 1785,
    "hash": "1ebf99a04f504fc3d2...4ecfbdfc419bf3dbf39df0013dca913f844",
    "penalty": 0,
    "err": ""
}
```


### 토큰 발행 (Issuance of Token) {#issuance-of-token}

- [생태계 생성](#create-ecosystem)
- [기본 애플리케이션 설치](#installing-basic-applications)
- [토큰 발행](#token-issuance)


#### 생태계 생성 (Create ecosystem) {#create-ecosystem}

생태계를 만들고 `@1NewEcosystem` 계약을 호출합니다.

```shell
>callContract @1NewEcosystem {"Name": "Test Ecosystem"}
{
    "block_id": 1787,
    "hash": "384f35ef93243c9dd4f53b9298873b356b25b31cf7c6a6be7600ee7694d77006",
    "penalty": 0,
    "err": "21"
}
```

그런 다음 명령줄 도구 구성을 수정하여 새로 생성된 에코시스템 "21"에 로그인합니다.

#### 기본 애플리케이션 설치 {#installing-basic-applications}

다음과 같이 계약을 호출하여 기본 애플리케이션을 설치합니다.

```shell
1  >callContract @1PlatformAppsInstall
2  >callContract @1RolesInstall
3  >callContract @1AppInstall {"ApplicationId": 5}
4  >callContract @1AppInstall {"ApplicationId": 6}
```

1행, 플랫폼 애플리케이션 설치
2행, 기본 역할 설치
3-4행에서 에코 구성 및 토큰 발행 애플리케이션을 설치합니다. 애플리케이션 ID '5,6'은 다음과 같이 getList를 통해 쿼리할 수 있습니다.

```shell
>getList @1applications -w={"ecosystem": 1, "$or": [{"name": "Token emission"},{"name": "Ecosystems catalog"}]} -c="name,ecosystem"

{
    "count": 2,
    "list": [
        {
            "ecosystem": "1",
            "id": "5",
            "name": "Token emission"
        },
        {
            "ecosystem": "1",
            "id": "6",
            "name": "Ecosystems catalog"
        }
    ]
}
```
 
#### 토큰 발행 {#token-issuance}

새로운 생태계이기 때문에 토큰 발행을 설정하고 `@1TeSettings` 계약을 호출하여 토큰을 발행할 수 있는 역할을 지정해야 합니다.

```shell
>callContract @1TeSettings {"RoleDeveloper": 30}
```

여기서 `RoleDeveloper`는 `@1roles` 데이터 테이블을 통해 얻을 수 있는 현재 생태학적 역할 ID입니다.

**Token Issuance** `@1NewToken` 컨트랙트를 호출하여 토큰을 발행합니다.

```shell
>callContract @1NewToken {"Symbol": "TEST", "Name": "TEST Coin", "Amount": "10000000000000000" ,"Digits": "12"}
```

여기서 계약 매개변수 `Symbol`은 토큰 기호, `Name`은 토큰 이름, `Amount`는 총 금액, `Digits`는 정밀도입니다.

**Token Emission**

```shell
>callContract @1TeEmission {"Amount": 1000000000000}
```

**Destroy tokens**

```shell
>callContract @1TeBurn {"Amount": 1000000000000}
```

기본 토큰 증분 및 토큰 폐기가 허용되며 `@1TeChange`로 설정할 수 있습니다. 여기서 `TypeChange`는 유형(`emission` 증분, `withdraw` 소멸)입니다.
`Value`는 켜짐/꺼짐 상태(`1` 켜짐, `2` 꺼짐)입니다. 예:

**Close Additions** 참고: 닫은 후에는 켤 수 없습니다.


```shell
>callContract @1TeChange {"TypeChange": "emission", "Value": 2}
```

**Turn off destruction**, 파괴를 다시 켜고 싶다면 `Value`를 `1`로 설정하면 됩니다.


```shell
>callContract @1TeChange {"TypeChange": "withdraw", "Value": 2}
```

### 생태계 공제 {#eco-deduction}

에코 공제를 설정하기 전에 [백서](https://github.com/IBAX-io/whitepaper) 에서 확인할 수 있는 IBAX 수수료 모델을 이해해야 합니다.
 
먼저 에코 지갑 주소를 설정하고 `@1EditParameter` 컨트랙트를 호출하고 에코 파라미터를 수정합니다.


```shell
>callContract @1EditParameter {"Id": 334, "Value": "1273-2644-xxxx-5846-6598"}
```
where `Id` is the ecowallet `ecosystem_wallet` parameter id, which can be queried as follows:
```shell
>getList @1parameters -w={"ecosystem": 22, "name": "ecosystem_wallet"}
```

`Value` 값은 구속될 에코월렛의 주소이며, 컨트랙트는 해당 주소에서 지불하는 가스비를 생성합니다. 주소에는 현재 생태계에 충분한 토큰이 있어야 하며 수정이 성공하기 전에 바인딩된 주소에서 동의해야 합니다.


다음과 같이 다중 생태 공제를 설정하기 위해 `@1EcoFeeModeManage` 계약을 호출합니다.

```shell
>callContract @1EcoFeeModeManage {"FollowFuel": 0.01, "CombustionFlag": 1, "VmCostFlag": 2, "VmCostConversionRate": 100, "StorageConversionRate": 100, "StorageFlag": 2, "ExpediteFlag": 1}
```

다음은 계약 매개변수 필드에 대한 정의입니다:
- `FollowFuel` 매개변수는 Follow eco1 비율의 배수입니다.
- `CombustionFlag`는 ecotrade 가스 수수료 연소 여부입니다. 1- 아니오, 2- 예
- `CombustionPercent`는 가스 수수료 연소 백분율입니다. 가스 수수료 연소가 켜져 있을 때만 유효하며, 1에서 100까지의 값을 취하며, 꺼져 있을 때는 0입니다.
- `VmCostFlag`는 VM 비용 플래그로 직접 지불 또는 대리 지불로 설정됩니다. 1- 직접 지불, 2- 대리 지불
- `StorageFlag`는 저장소 수수료 플래그로 직접 지불 또는 대리 지불로 설정됩니다. 1- 직접 지불, 2- 대리 지불
- `ExpediteFlag`는 가속 수수료 플래그로 직접 지불 또는 대리 지불로 설정됩니다. 1- 직접 지불, 2- 대리 지불
- `VmCostConversionRate`는 가상 머신 비용 변환율로, 대리 지불에만 유효하며, 소수점 2자리로 표시되며, 0보다 큰 값입니다.
- `StorageConversionRate`는 저장소 비용 변환율로, 대리 지불에만 유효하며, 소수점 2자리로 표시되며, 0보다 큰 값입니다.

위의 설정을 사용하면, 생태계 내에서 사용자가 계약을 호출할 때 발생하는 모든 거래 수수료가 현재 생태계의 생태지갑에서 지불됩니다.
모든 사용자는 생태계 내에서 발생하는 가스 비용만을 지불하면 됩니다. 물론 실제 필요에 따라 비용 매개변수를 조정할 수 있습니다.


### DAO 생태계 운영 {#dao-governance-ecosystem}

DAO 관리 생태계로 변경하기 전에, 현재 생태계에서 토큰을 발행했는지 확인해야 합니다. DAO 관리 생태계로 변경된 후에는 생태계의 모든 제안이 관리위원회 멤버들에 의해 투표됩니다.
DAO 관리 이사회는 더 이상 생태계 개발자들에 의해 독점적으로 관리되지 않으며, 생태계 보유주 중 상위 50명의 대표들이 선출됩니다.

`@1EditControlMode` 계약을 호출하여 생태계 관리 모드를 DAO 관리 모드로 변경합니다.

```shell
>callContract @1EditControlMode {"Value": 2}
```

생성자 모델을 나타내는 `Value` 매개변수 값으로 `1`을 사용하고, DAO 관리 모델을 나타내는 경우 `2`를 사용합니다.

우리는 애플리케이션을 생성해 볼 수 있습니다:


```shell
>callContract @1NewApplication {"Name": "testApp", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
```

이 단계에서는 애플리케이션을 생성하기 전에 DAO 관리위원회에 의해 DAO 관리 제안이 생성되고 투표됩니다. 유효한 제안은 투표에 참여한 총 표의 75% 중 68%의 승인율을 가져야 합니다.

DAO 관리의 범위는 다음과 같습니다:

1. 애플리케이션, 계약, 페이지, 코드 스니펫, 탭, 메뉴, 애플리케이션 매개변수, 데이터 테이블 및 필드 추가, 삭제 및 변경
2. 다국어 수정
3. DAO 및 생성자 모델 전환
4. 생태계 매개변수 편집
5. 역할, 역할 멤버 할당 및 제거
6. 추가 및 소멸 통화 발행
7. 플랫폼 매개변수 수정
8. 생태계 정보 수정
9. 지연 계약 수정
10. 투표 템플릿 수정
 

## 명령 줄 도구를 사용하여 애플리케이션 배포하기 {#deploy-applications-using-application-packaging-tool}

이 튜토리얼을 시작하기 전에 [IBAX 애플리케이션 패키징 도구](https://github.com/IBAX-io/app-tool) 를 다운로드해야 합니다. 이 도구를 사용하여 IBAX 애플리케이션을 패키징해야 합니다.

다음 디렉터리 구조에 따라 애플리케이션 파일을 저장해야 합니다.


```text
- APP Name
    - app_params
        params1.csv
        params2.csv
        ...
    - contracts
        contract1.sim
        contract2.sim
        ...
    - tables
        tableName1.json
        tableName2.json
        ...
    config.json
```

아래 그림과 같이:

```shell
airdrop$ ls *
config.json

app_params:
dedicated_account.csv  lock_percent.csv  per_period_sec.csv  period_count.csv

contracts:
AddAirdrop.sim  ClaimAirdrop.sim  SpeedAirdrop.sim

tables:
airdrop_info.json
```

`app_params` 디렉토리는 매개변수 이름 + 파일 형식 `.csv`를 사용하여 이름이 지정된 애플리케이션 매개변수 파일을 저장하며 파일의 내용은 매개변수 값입니다.
`contracts` 디렉토리는 `.sim` 파일 형식으로 계약을 보유하고 있으며 파일의 내용은 계약 소스 코드입니다.
`tables` 디렉토리는 다음과 같이 `json` 파일 형식으로 애플리케이션 데이터 테이블 구조를 보유합니다.

```json
[
  { "name": "account", "conditions": "{\"read\": \"true\", \"update\": \"ContractConditions(\"MainCondition\")\"}", "type": "varchar" },
  { "name": "balance_amount", "conditions": "true", "type": "money" },
  { "name": "stake_amount", "conditions": "true", "type": "money" },
  { "name": "surplus", "conditions": "true", "type": "number" },
  { "name": "total_amount", "conditions": "true", "type": "money" }
]
```

`name`은 데이터 테이블 필드 이름이며, `conditions`은 데이터 테이블 필드 권한이고, `type`은 필드 유형입니다.

1단계에서는 config.json 파일을 생성하고 다음 내용을 airdrop 디렉토리에 저장합니다.


```text
{
    "name": "Airdrop",
    "conditions": "ContractConditions(\"@1MainCondition\")"
}
```

`name`은 애플리케이션의 이름이고, `conditions`는 애플리케이션을 수정하는 권한입니다. 그런 다음 airdrop 디렉토리에 저장합니다.

2단계에서는 애플리케이션을 패키징합니다. 다음 명령어를 사용하면 현재 디렉토리에 애플리케이션 `airdrop.json`이 생성됩니다. 계약이나 애플리케이션 매개변수를 수정한 경우에는 애플리케이션을 다시 패키징해야 합니다.


```shell
$ ./app-tool airdrop/
```

애플리케이션을 다음과 같이 [command line tool](https://github.com/IBAX-io/ibax-cli) 을 통해 가져올 수 있습니다:
`import` 명령어를 사용하여 애플리케이션을 가져옵니다. `-f` 매개변수를 사용하여 가져올 애플리케이션 파일을 지정합니다.


```shell
$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit

>import -f ./airdrop.json
```

물론 애플리케이션이 있다면 다음 명령어를 사용하여 완전한 디렉토리 구조를 생성할 수도 있습니다:


 ```shell
$ app-tool.exe airdrop.json
```

