# IBAX 開発チュートリアル {#ibax-development-tutorial}

## 初めての利用ガイド {#getting-started-guide}
- [コマンドラインツールを使用して最初のスマートコントラクトをデプロイする](#deploy-first-smart-contract-via-command-line-tool)
- [コマンドラインツールを使用したエコ開発](#command-line-tool-eco-development)

## デプロイ {#deployment}
- [コマンドラインツールを使用してアプリケーションをデプロイする](#deploy-application-using-command-line-tools)
- [コマンドラインツールを使用したエコ設定](#ecosystem-configuration-using-command-line-tool)

## 高度なガイド {#advanced-guide}
- [アプリケーションパッケージングツールを使用してアプリケーションをデプロイする](#deploy-applications-using-application-packaging-tool)

## コマンドラインツールを使用して最初のスマートコントラクトをデプロイする {#deploy-first-smart-contract-via-command-line-tool}
IBAX ブロックチェーン上にスマートコントラクトをデプロイし、スマートコントラクトの呼び出し方を学ぶために、[コマンドラインツール](https://github.com/IBAX-io/ibax-cli)を使用します。
最初のスマートコントラクトとして、それを[ローカルテストネットワーク](../concepts/blockchain-layers.md)にデプロイします。ローカルネットワークのデプロイ方法については、[ネットワークデプロイ](../howtos/deployment.md)を参照してください。
これにより、オーバーヘッドなしで自由にデプロイして実行できます。

### アプリケーションの作成  {#create-application}
@1NewApplication というコントラクトを呼び出して、アプリケーションを作成します。アプリケーション名のパラメータと[アクセス権制御メカニズム](../concepts/about-the-platform.md#access-rights-control-mechanism)の修正パラメータがあります。

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

以下は行ごとに説明されています：
-   1行目、コマンドラインターミナルを起動します。
-   5行目、@1NewApplication コントラクトを呼び出して、アプリケーション名を `testapp`、アプリケーションの修正権限を `@1DeveloperCondition`（開発者権限）で作成します。
-   8行目、トランザクションによって生成されたブロックIDです。
-   9行目、トランザクションによって生成されたブロックハッシュです。
-   10行目、トランザクションの実行が失敗した場合は (0: ペナルティなし 1: ペナルティあり) です。
-   11行目、トランザクションの実行が失敗した場合はエラーテキストメッセージが返され、ブロックIDが返される場合は err フィールドがアプリケーションのIDです。

もちろん、このコントラクトで利用可能なフィールドやフィールドのタイプを確認したい場合は、`getContractInfo` メソッドを呼び出すことができます。以下はコントラクト情報の返り値です：

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
`fields` フィールドは、コントラクトのパラメータを含みます。パラメータの名前 `name`、`type`、`optional` が含まれています。
`Name` と `Conditions` は必須であり、`VotingId` はオプションです。[contract/name](../reference/api2.md#contract-name) API メソッドを参照してください。

### コントラクトの記述 {#writing-contracts}
[Needle](../topics/script.md#needle-contract-language) を使用して、以下のような簡単な足し算の操作を行うスマートコントラクトを記述します。コントラクトのソースコードは以下の通りであり、`SumMath.sim` として保存します。

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
以下は、行ごとに説明されています：
- 1行目では、SumMathという名前のコントラクトを定義しています。
- 2行目では、[Dataセクション](../topics/script.md#data-section)を定義しています。
- 3-4行目では、2つの入力64ビット整数型パラメータ `A B` を定義しています。
- 6行目では、[Conditionalセクション](../topics/script.md#conditions-section)を定義しています。
- 9行目では、[Operationsセクション](../topics/script.md#action-section)を定義しています。変数sumを定義し、A+Bの結果を受け取ります。

sumの値を$resultに代入し、コントラクトの結果として表示します。もちろん、A+Bの値を直接$resultに代入することも可能ですが、例として示すことができます。


### コントラクトの作成 {#create-contract}
コントラクトの作成方法は2つありますが、最初の方法は以下の通りです：
最初のステップでは、json形式のコントラクトパラメータファイルを作成します：
```json
{
  "ApplicationId": 31,
  "Value": "contract SumMath {\n    data {\n        A int\n        B int\n    }\n    conditions {\n\n    }\n    action {\n        var sum int\n        sum = $A + $B\n        $result = sum\n    }\n}",
  "Conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```
ここで、`ApplicationId` はアプリケーション ID、`Value` はコントラクトのソース コード、特殊文字をエスケープする必要があります、`Conditions` はコントラクトの変更権限です

SumMathParams.json という名前を付けました。


2 番目のステップでは、コントラクトを作成する @1NewContract を呼び出します。
```
1    >callContract @1NewContract -f=./data/SumMathParams.json
2    {
3        "block_id": 1238,
4        "hash": "f3fe7aff8a613c96299723b7e9af0682aa8cabe7becf67a485e2a77a974f58b6",
5        "penalty": 0,
6        "err": "328"
7    }
```

2 番目の方法:
保存されたコントラクト ソース ファイルは、次のようにパラメータ形式 `paramsName` + `-` + "file",`paramsName-file` でコントラクト パラメータに直接渡されます。
```shell
1    >callContract @1NewContract {"ApplicationId": 31, "Value-file": "SumMath.sim", "Conditions": "true"}    
2    {
3        "block_id": 2055,
4        "hash": "cdf25060669cf7cba137278...26ca463fd5d458f3402a5f0137f693db",
5        "penalty": 0,
6        "err": "368"
7    }
```

以下を行ごとに説明します。
- 行 1: コントラクト @1NewContract を呼び出してコントラクトを作成します。 -f はファイルを使用してコントラクト パラメーターをインポートします。
- 行 3、トランザクションによって生成されたブロック ID
- 行 4、トランザクションによって生成されたブロック ハッシュ
- 5 行目、トランザクションの実行が失敗した場合 (0: ペナルティなし 1: ペナルティ)
- 6 行目、トランザクションの実行が失敗した場合、エラー テキスト メッセージが返され、ブロック ID が返された場合、err フィールドはコントラクトの ID になります。


デプロイしたばかりのコントラクトを呼び出してみましょう
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
呼び出しは完了し、以下の行ごとに説明されているように、結果は期待どおりになります。
- 最初の行はコントラクトを呼び出します。ここでは、エコロジー ID 5 のエコロジーにコントラクトをデプロイします。もちろん、現在のエコロジー ID が 5 の場合は、同じエコロジー内で `callContract SumMath {"A":1 を呼び出すこともできます。 , "B":2}` このように
- 行 3、トランザクションによって生成されたブロック ID
- 行 4、トランザクションによって生成されたブロック ハッシュ
- 5 行目、トランザクションの実行が失敗した場合 (0: ペナルティなし 1: ペナルティ)
- 6 行目、トランザクションの実行が失敗した場合、エラー テキスト メッセージが返され、ブロック ID が返された場合、err フィールドはコントラクトの結果、つまり `$result` の値になります。

## コマンドラインツールのエコ開発 {#command-line-tool-eco-development}
このチュートリアルでは、次の方法を学びます。

- 1.[エコシステムの作成](#step-1-create-ecosystem)
- 2.[アプリケーションの作成](#step-2-create-application)
- 3.[テーブルの作成](#step-3-create-table)
- 4.[アプリケーションパラメータの作成](#step-4-create-application-parameters)
- 5.[コントラクトの作成とデプロイ](#step-5-create-contract-deploy-contract)
- 6.[生態パラメータの作成](#step-6-create-ecosystem-parameters)
- 7.[ローカリゼーションを追加](#step-7-add-localization)
- 8.[契約変更](#step-8-modify-the-contract)
- 9.[データテーブル権限の変更](#step-9-modify-data-table-permissions)



以下は、IBAXのエコロジーとアプリケーションがどのようなものであり、それらが何をするのかをより明確に理解するために、エコロジーとアプリケーションがどこに所属するべきかを理解することが好ましいです。簡単なマインドマップでより良く理解できます:

![image](/ibax-eco.png)

IBAXネットワークには複数の[エコロジー](../concepts/about-the-platform.md#ecolib)が存在することがわかります。
各エコロジーには複数の[アプリケーション](../concepts/about-the-platform.md#applications)が存在することができます。
各アプリケーションには[スマートコントラクト](../concepts/thesaurus.md#smart-contract)が存在します。
[テーブル](../concepts/about-the-platform.md#tables)もあります。
エコロジーにはエコロジーパラメータ、アプリケーションにはアプリケーションパラメータがあります。

### ステップ 1 エコシステムの作成  {#step-1-create-ecosystem}
まず、[コマンドラインツール](https://github.com/IBAX-io/ibax-cli)を使用してエコシステムを作成します。@1NewEcosystemコントラクトを呼び出します。
エコシステム名を変更したい場合は、`@1EditEcosystemName`コントラクトを呼び出すことができます。

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

以下の内容を行ごとに説明します：
- 行1: コマンドラインコンソールプログラムを起動します。
- 行5: `@1NewEcosystem`コントラクトを呼び出して、テストエコシステムという名前のエコシステムを作成します。
- 行8: トランザクションによって生成されたブロックIDです。
- 行9: トランザクションによって生成されたブロックハッシュです。
- 行10: トランザクションの実行が失敗した場合のステータスです（0: ペナルティなし 1: ペナルティあり）。
- 行11: トランザクションの実行が失敗した場合、エラーテキストメッセージが返されます。ブロックIDが返された場合、エラーフィールドはエコロジーのIDとなります（18）。

次に、コマンドツールの`config.yml`を設定し、作成したエコシステムのecid（18）を`ecosystem`に設定し、コマンドラインコンソールプログラムを再起動します。
```shell
>exit
INFO[0002] Exit

$ vim data/config.yml

$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit
>
```

### ステップ 2 アプリケーションの作成 {#step-2-create-application}
`@1NewApplication`コントラクトを呼び出して、アプリケーションを作成します。このコントラクトにはアプリケーション名のパラメータと変更権限のパラメータがあります。

[Permission Parameter](../concepts/about-the-platform.md#access-rights-control-mechanism)については、アクセス権制御メカニズムのドキュメントを参照してください。

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
アプリケーションの権限を変更する必要がある場合は、`EditApplication` コントラクトを呼び出すことができます。


以下を行ごとに説明します。
- 1 行目、コントラクト @1NewApplication を呼び出してアプリケーションを作成します。アプリケーション名は `GradesRecorder`、アプリケーションの変更権限は開発者権限 `@1DeveloperCondition` です。
- 行 4、トランザクションによって生成されたブロック ID
- 行 5、トランザクションによって生成されたブロック ハッシュ
- 6 行目、トランザクションの実行が失敗した場合 (0: ペナルティなし 1: ペナルティ)
- 7 行目、トランザクションの実行が失敗した場合はエラー テキスト メッセージが返され、ブロック ID が返された場合は、アプリケーションの ID である err フィールドは `47` になります。

学生の成績を記録するアプリケーションのシンプルな例を書いてみましょう。
データテーブルのフィールドには、学生情報、成績（`grade`）、クラス（`class`）、科目の成績（`mathematics`、`physics`、`literature`）、総合スコア（`overall_score`）、評価（`score`）、作成タイムスタンプ（ミリ秒）（`created_at`）が含まれます。

### ステップ 3 テーブルの作成 {#step-3-create-table}
  最初のステップでは、コントラクト パラメータ ファイルを json 形式で作成します。
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
ここで、`ApplicationId` はアプリケーション ID、`Name` は作成されたデータ テーブル `test_teble` の名前です。
`ColumnsArr` はデータ テーブル フィールドの配列であり、`TypesArr` は 9 つの [タイプ](../concepts/about-the-platform.md#tables) を含むデータ テーブル フィールドのタイプです。
`varchar`,`character`,`json`,`number`,`datetime`,`double`,`money`,`text`,`bytea`、フィールド名とフィールド型は 1 対 1 に対応します 。
データテーブルの新規エントリ権限の場合は `InsertPerm`、データテーブルの更新エントリ権限の場合は `UpdatePerm`、データテーブルのデータ読み取り権限の場合は `ReadPerm`、データテーブルの新規フィールド権限の場合は `NewColumnPerm`
  [Permission Control](../concepts/about-the-platform.md#access-rights-control-mechanism) を参照すると、現在のエコシステム作成者はここで「ContractConditions(\"MainCondition\")」を利用できます。

これに createTable.json という名前を付け、データ テーブル `@1NewTableJoint` を作成するコントラクトを呼び出します
```text
>callContract @1NewTableJoint -f ./createTestTable.json
```

#### データテーブルフィールドの権限を変更する {#modify-data-table-field-permissions}
データ テーブル フィールドの権限を変更できます。データ テーブル フィールドの権限には、読み取り権限と更新権限が含まれます。読み取り権限には、
`DBFind.Columns` フィルター フィールドまたは [list](../reference/api2.md#list-name-limit-offset-columns) クエリなどのインターフェイスを使用するコントラクト内で、
権限がない場合は、権限エラーが報告されます。
更新権限は、データテーブルのフィールドを更新する権限です。
ここでは`student`フィールドの読み取りおよび更新権限を「false」に設定していますが、もちろん、何らかの契約によって操作可能に設定することもできます。
`@1EditColumn` コントラクトを呼び出して、データ テーブルのフィールド権限を変更します
```shell
>callContract @1EditColumn {"TableName": "grade_info", "Name": "student", "UpdatePerm": "false", "ReadPerm": "false"}
```


いくつかのアプリケーションパラメータ`grade_best_type`、`grade_type_a+`、`grade_type_a`、`grade_type_b+`、`grade_type_b`、`grade_type_c`、グレード評価タイプを作成できます。

### ステップ 4 アプリケーションパラメータの作成 {#step-4-create-application-parameters}
コントラクト `@1NewAppParam` を呼び出してアプリケーション パラメータを作成します。アプリケーション パラメータを変更したい場合は、コントラクト `@1EditAppParam` を呼び出すことができます。
```text
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_best_type", "Value": "A+", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_a+", "Value": "{\"max\": 101,\"min\": 90}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_a", "Value": "{\"max\": 90,\"min\": 80}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_b+", "Value": "{\"max\": 80,\"min\": 70}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_b", "Value": "{\"max\": 70,\"min\": 60}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_c", "Value": "{\"max\": 60,\"min\": 0}", "Conditions": "ContractConditions(\"MainCondition\")"}
```
`grade_best_type`は最高の評価タイプです。
`grade_type_a+`は`A+`の評価でトリガーされる条件で、スコアが90以上101未満の場合、評価は`A+`となります。他のパラメータも同様です。

### ステップ 5 コントラクトの作成 コントラクトの展開 {#step-5-create-contract-deploy-contract}

学生の成績情報と各教科の最終評価を記録するための契約を作成し、情報を入力する際には学生の成績クラスと成績を各教科ごとに入力します。
各教科の入力スコアに基づいて平均計算を行い、総合スコア`overallScore`と最終評価`score`を取得します。
契約が呼び出されると、私たちが作成したデータテーブル`grade_info`にレコードが作成されます。

まず、契約を作成し、`NewRecord.sim`という名前を付けます。

```text
1 contract NewRecord {
2       data {
3         Student string
4         Grade int
5         Class int
6         Mathematics int
7         Physics int
8         Literature int
9       }
10     func getScore(a b c int) map{
11          var m map
12          var overallScore int
13          overallScore = (a+b+c) / 3
14          m["overallScore"] = overallScore
15          if overallScore >= $gradeTypeABest["min"] && overallScore < $gradeTypeABest["max"] {
16              m["score"] = "A+"
17          }elif overallScore >= $gradeTypeA["min"] && overallScore < $gradeTypeA["max"] {
18              m["score"] = "A"
19          }elif overallScore >= $gradeTypeBBest["min"] && overallScore < $gradeTypeBBest["max"] {
20              m["score"] = "B+"
21          }elif overallScore >= $gradeTypeB["min"] && overallScore < $gradeTypeB["max"] {
22              m["score"] = "B"
23          }elif overallScore >= $gradeTypeC["min"] && overallScore < $gradeTypeC["max"]{
24              m["score"] = "C"
25          }else{
26              m["score"] = "Notset"
27          }
28          return m
29      }
30      func safeJsonDecode(m string) map {
31          var res map
32          if Size(m) > 0 {
33             res = JSONDecode(m)
34          }
35          return res
36      }
37
38      conditions {
39          if Size($Student) == 0 {
40            warning "Student Can not be empty"
41          }
42          if $Class <= 0{
43              warning "Class cannot be less than or equal to zero"
44          }
45          if $Grade <= 0{
46              warning "Grade cannot be less than or equal to zero"
47          }
48          if $Mathematics < 0 {
49              warning "Mathematics cannot be less than zero"
50          }
51          if $Physics < 0 {
52              warning "Physics cannot be less than zero"
53          }
54          if $Literature < 0 {
55              warning "Literature cannot be less than zero"
56          }
57          if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{
58              warning "Score cannot exceed 100"
59          }
60          var app map
61          app = DBFind("@1applications").Columns("id,ecosystem").Where({"ecosystem": 18,"name":"GradesRecorder","deleted":0}).Row()
62          if !app {
63              warning LangRes("@1app_not_found")
64          }
65
66          var app_id int
67          app_id = Int(app["id"])
68          $eId = Int(app["ecosystem"])
69          $gradeBestType = AppParam(app_id, "grade_best_type", $eId)
70          $gradeTypeABest = safeJsonDecode(AppParam(app_id, "grade_type_a+", $eId))
71          $gradeTypeA = safeJsonDecode(AppParam(app_id, "grade_type_a", $eId))
72          $gradeTypeBBest = safeJsonDecode(AppParam(app_id, "grade_type_b+", $eId))
73          $gradeTypeB = safeJsonDecode(AppParam(app_id, "grade_type_b", $eId))
74          $gradeTypeC = safeJsonDecode(AppParam(app_id, "grade_type_c", $eId))
75      }
76      action {
77          var m map
78          m = getScore($Mathematics,$Physics,$Literature)
79          var in map
80          in["student"] = $Student
81          in["class"] = $Class
82          in["grade"] = $Grade
83          in["mathematics"] = $Mathematics
84          in["physics"] = $Physics
85          in["literature"] = $Literature
86          in["overall_score"] = m["overallScore"]
87          in["score"] = m["score"]
88          in["created_at"] = $time
89          DBInsert("@"+ Str($eId)+"grade_info", in)
90      }
91  }
```
以下は各行の説明です：
- 2行目は、[データセクション](../topics/script.md#data-section)で、入力パラメータ`Student`（学生の名前）、`Grade`（成績）、`Class`（クラス）、`Mathematics`（数学の得点）、`Physics`（物理の得点）、`Literature`（文学の得点）を定義しています。
- 10行目は、各教科の得点に基づいて総合スコアと最終評価を算出する`getScore`関数です。
- 30行目は、文字列をJSONデコードしてマップに変換する`safeJsonDecode`関数です。
- 38行目は、[条件セクション](../topics/script.md#conditions-section)です。
- 39行目は、[操作セクション](../topics/script.md#action-section)です。

契約が呼び出されると、まず条件部分を実行し、契約の入力パラメータが有効かどうかを検証します。たとえば、学生の名前`if Size($Student) == 0 {`が空であるかどうかを検証し、空である場合はエラーメッセージ`"Student Can not be empty"`を返します（30行目）。すべての入力パラメータが検証された後、61行目で[DBFind](../topics/script.md#dbfind)を使用して、ecid `18`およびアプリケーション名`GradesRecorder`を持つアプリケーションのデータベースから情報を取得し、`deleted=0`で削除されていないアプリケーション情報を取得します。
69行目から74行目では、[AppParam](../topics/script.md#appparam)を使用してアプリケーションパラメータを取得します。たとえば、`$gradeBestType = AppParam(app_id, "grade_best_type", $eId)`（69行目）です。
アプリケーションパラメータがJSON形式で格納されている場合は、`grade_type_a`などのように、`safeJsonDecode(AppParam(app_id, "grade_type_a+", $eId))`を参照して、safeJsonDecode関数でアプリケーションパラメータをマップ形式に変換できます。

その後、操作部分に進み、getScore関数を呼び出して総合スコアと最終評価を取得します（10行目）。結果をマップに保存し、79行目で学生の成績情報を保存するためのマップを定義し、[DBInsert](../topics/script.md#dbinsert)を使用してデータをデータテーブル`@18grade_info`に挿入します。

契約を作成する方法は2つありますが、最初の方法は次のとおりです。まず、JSON形式の契約パラメータファイルを作成します：

```json
{
  "ApplicationId": 47,
  "Value": "contract NewRecord {\n    data {\n        Student string\n        Grade int\n        Class int\n        Mathematics int\n        Physics int\n        Literature int\n    }\n    func getScore(a b c int) map{\n        var m map\n        var overallScore int\n        overallScore = (a+b+c) / 3\n        m[\"overallScore\"] = overallScore\n        if overallScore >= $gradeTypeABest[\"min\"] && overallScore < $gradeTypeABest[\"max\"] {\n            m[\"score\"] = \"A+\"\n        }elif overallScore >= $gradeTypeA[\"min\"] && overallScore < $gradeTypeA[\"max\"] {\n            m[\"score\"] = \"A\"\n        }elif overallScore >= $gradeTypeBBest[\"min\"] && overallScore < $gradeTypeBBest[\"max\"] {\n            m[\"score\"] = \"B+\"\n        }elif overallScore >= $gradeTypeB[\"min\"] && overallScore < $gradeTypeB[\"max\"] {\n            m[\"score\"] = \"B\"\n        }elif overallScore >= $gradeTypeC[\"min\"] && overallScore < $gradeTypeC[\"max\"]{\n            m[\"score\"] = \"C\"\n        }else{\n            m[\"score\"] = \"Notset\"\n        }\n        return m\n    }\n    func safeJsonDecode(m string) map {\n        var res map\n        if Size(m) > 0 {\n            res = JSONDecode(m)\n        }\n        return res\n    }\n\n    conditions {\n        if Size($Student) == 0 {\n            warning \"Student Can not be empty\"\n        }\n        if $Class <= 0{\n            warning \"Class cannot be less than or equal to zero\"\n        }\n         if $Grade <= 0{\n            warning \"Grade cannot be less than or equal to zero\"\n        }\n        if $Mathematics < 0 {\n            warning \"Mathematics cannot be less than zero\"\n        }\n        if $Physics < 0 {\n            warning \"Physics cannot be less than zero\"\n        }\n        if $Literature < 0 {\n            warning \"Literature cannot be less than zero\"\n        }\n        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{\n            warning \"Score cannot exceed 100\"\n        }\n        var app map\n        app = DBFind(\"@1applications\").Columns(\"id,ecosystem\").Where({\"ecosystem\": 18,\"name\":\"GradesRecorder\",\"deleted\":0}).Row()\n        if !app {\n            warning LangRes(\"@1app_not_found\")\n        }\n\n        var app_id int\n        app_id = Int(app[\"id\"])\n        $eId = Int(app[\"ecosystem\"])\n        $gradeBestType = AppParam(app_id, \"grade_best_type\", $eId)\n        $gradeTypeABest = safeJsonDecode(AppParam(app_id, \"grade_type_a+\", $eId))\n        $gradeTypeA = safeJsonDecode(AppParam(app_id, \"grade_type_a\", $eId))\n        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, \"grade_type_b+\", $eId))\n        $gradeTypeB = safeJsonDecode(AppParam(app_id, \"grade_type_b\", $eId))\n        $gradeTypeC = safeJsonDecode(AppParam(app_id, \"grade_type_c\", $eId))\n    }\n    action {\n        var m map \n        m = getScore($Mathematics,$Physics,$Literature)\n        var in map\n        in[\"student\"] = $Student\n        in[\"class\"] = $Class\n        in[\"grade\"] = $Grade\n        in[\"mathematics\"] = $Mathematics\n        in[\"physics\"] = $Physics \n        in[\"literature\"] = $Literature \n        in[\"overall_score\"] = m[\"overallScore\"]\n        in[\"score\"] = m[\"score\"]\n        in[\"created_at\"] = $time\n        DBInsert(\"@\"+ Str($eId)+\"grade_info\", in)\n    }\n}",
  "Conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```

ここで、`ApplicationId` はアプリケーション ID であり、特殊文字を使用するにはエスケープする必要があります。また、`Conditions` はコントラクト変更権限です。
`Value`コントラクトのソース コード。`NewRecordParams.json`として保存します。


コントラクトを作成した後、CreateContract`@1NewContract` を呼び出してコントラクトをデプロイする必要があります。
```text
1    >>callContract @1NewContract -f=./data/NewRecordParams.json
2    {
3        "block_id": 1262,
4        "hash": "d896f12f685835f6cf71705e1ba...4d8bcc0a1406f7b0b6482b2d230fc",
5        "penalty": 0,
6        "err": "348"
7    }
```
以下は、行ごとに説明します：
- 1行目：契約を作成するために`@1NewContract`契約を呼び出します。-fオプションは、契約パラメータとして作成したファイル`NewRecord.json`をインポートするために使用されます。
- 3行目：トランザクションによって生成されたブロックID
- 4行目：トランザクションによって生成されたブロックハッシュ
- 5行目：トランザクションの実行が失敗した場合（0：ペナルティなし 1：ペナルティあり）
- 6行目：トランザクションの実行が失敗した場合、エラーテキストメッセージが返され、ブロックIDが返された場合、エラーフィールドに契約のIDが示されます（348）

2番目の方法：
保存された契約のソースファイルを、パラメータ形式の`paramsName` + `-` + "file"で直接契約のパラメータとして渡します。`paramsName-file`は次のようになります：
```shell
callContract @1NewContract {"ApplicationId": 47, "Value-file": "NewRecord.sim", "Conditions": "ContractConditions(\"@1DeveloperCondition\ ")"}
```

先ほど作成したコントラクトを呼び出してみましょう
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

呼び出しが完了したら、データテーブルにレコードが保存されているかどうかを確認します。
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

データ テーブルには、総合評価 56、グレード C の「student」トムというレコードがすでに存在していることがわかります。

上記の例は調査研究のみを目的としており、データテーブルの書き込み権限や契約変更権限など、実際の状況に応じて関連パラメータを変更する必要があります。
 
たとえば、この新しいレコード コントラクトを 1 人だけが呼び出すことができ、他の人は呼び出せないように指定したい場合は、エコロジカル パラメータ `new_record_account` を設定できます。

### ステップ 6 生態学的パラメータの作成 {#step-6-create-ecosystem-parameters}
コントラクト `@1NewParameter` を呼び出すと、エコパラメータが作成されます
`@1parameters` テーブルの `new_record_account` で、エコパラメータを変更する必要がある場合は、`@1EditParameter` を呼び出します。
```text
>callContract @1NewParameter {"Name": "new_record_account", "Value": "6667782293976713160", "Conditions": "ContractConditions(\"MainCondition\")"}

{
    "block_id": 1416,
    "hash": "12fc87ce6a70e2fc993ab9ffe623311f1c50edd1157595ce6183c38c93960cae",
    "penalty": 0,
    "err": "273"
}
```
エコロジカル パラメータ `new_record_account` を作成し、値を keyId `6667782293976713160` に設定し、権限を `ContractConditions("MainCondition")` に変更します。これは、現在のエコロジカル作成者が変更できることを意味します。
トランザクションが正常に実行された場合、「err」フィールドの生態パラメータ ID は「273」になります。

### ステップ 7 ローカリゼーションを追加する {#step-7-add-localization}
`@1NewLangJoint` コントラクトを呼び出してローカリゼーション パラメーター`account_not_access` を作成すると、`@1langages` テーブルにパラメーターが作成され、`@1EditLangJoint` を介してローカリゼーション パラメーターを変更できます。
```shell
callContract @1NewLangJoint {"Name": "account_not_access", "LocaleArr": ["en", "ja"], "ValueArr": ["Sorry, you do not have access to this action", "申し訳ありませんが、このアクションにアクセスする権限がありません"]}
```

### ステップ 8 契約を変更する {#step-8-modify-the-contract}
次に、次のコードを `conditions` に追加して、コントラクト ソース コードの `conditions` セクションを変更する必要があります。
```text
conditions {
  if EcosysParam("new_record_account") != $key_id {
      warning LangRes("account_not_access")
  }
}
```
コントラクト @1EditContract を変更するために呼び出します。`Id` はコントラクト ID、`Value`: はコントラクトのソース コードです。
```text
>callContract @1EditContract {"Id": 348, "Value": "contract NewRecord {\n    data {\n        Student string\n        Grade int\n        Class int\n        Mathematics int\n        Physics int\n        Literature int\n    }\n    func getScore(a b c int) map{\n        var m map\n        var overallScore int\n        overallScore = (a+b+c) / 3\n        m[\"overallScore\"] = overallScore\n        if overallScore >= $gradeTypeABest[\"min\"] && overallScore < $gradeTypeABest[\"max\"] {\n            m[\"score\"] = \"A+\"\n        }elif overallScore >= $gradeTypeA[\"min\"] && overallScore < $gradeTypeA[\"max\"] {\n            m[\"score\"] = \"A\"\n        }elif overallScore >= $gradeTypeBBest[\"min\"] && overallScore < $gradeTypeBBest[\"max\"] {\n            m[\"score\"] = \"B+\"\n        }elif overallScore >= $gradeTypeB[\"min\"] && overallScore < $gradeTypeB[\"max\"] {\n            m[\"score\"] = \"B\"\n        }elif overallScore >= $gradeTypeC[\"min\"] && overallScore < $gradeTypeC[\"max\"]{\n            m[\"score\"] = \"C\"\n        }else{\n            m[\"score\"] = \"Notset\"\n        }\n        return m\n    }\n    func safeJsonDecode(m string) map {\n        var res map\n        if Size(m) > 0 {\n            res = JSONDecode(m)\n        }\n        return res\n    }\n\n    conditions {\n        if EcosysParam(\"new_record_account\") != $key_id {\n            warning LangRes(\"account_not_access\")\n        }\n        if Size($Student) == 0 {\n            warning \"Student Can not be empty\"\n        }\n        if $Class <= 0{\n            warning \"Class cannot be less than or equal to zero\"\n        }\n         if $Grade <= 0{\n            warning \"Grade cannot be less than or equal to zero\"\n        }\n        if $Mathematics < 0 {\n            warning \"Mathematics cannot be less than zero\"\n        }\n        if $Physics < 0 {\n            warning \"Physics cannot be less than zero\"\n        }\n        if $Literature < 0 {\n            warning \"Literature cannot be less than zero\"\n        }\n        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{\n            warning \"Score cannot exceed 100\"\n        }\n        var app map\n        app = DBFind(\"@1applications\").Columns(\"id,ecosystem\").Where({\"ecosystem\": 18,\"name\":\"GradesRecorder\",\"deleted\":0}).Row()\n        if !app {\n            warning LangRes(\"@1app_not_found\")\n        }\n\n        var app_id int\n        app_id = Int(app[\"id\"])\n        $eId = Int(app[\"ecosystem\"])\n        $gradeBestType = AppParam(app_id, \"grade_best_type\", $eId)\n        $gradeTypeABest = safeJsonDecode(AppParam(app_id, \"grade_type_a+\", $eId))\n        $gradeTypeA = safeJsonDecode(AppParam(app_id, \"grade_type_a\", $eId))\n        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, \"grade_type_b+\", $eId))\n        $gradeTypeB = safeJsonDecode(AppParam(app_id, \"grade_type_b\", $eId))\n        $gradeTypeC = safeJsonDecode(AppParam(app_id, \"grade_type_c\", $eId))\n    }\n    action {\n        var m map \n        m = getScore($Mathematics,$Physics,$Literature)\n        var in map\n        in[\"student\"] = $Student\n        in[\"class\"] = $Class\n        in[\"grade\"] = $Grade\n        in[\"mathematics\"] = $Mathematics\n        in[\"physics\"] = $Physics \n        in[\"literature\"] = $Literature \n        in[\"overall_score\"] = m[\"overallScore\"]\n        in[\"score\"] = m[\"score\"]\n        in[\"created_at\"] = $time\n        DBInsert(\"@\"+ Str($eId)+\"grade_info\", in)\n    }\n}"}
```


#### ステップ 9 データテーブルの権限を変更する {#step-9-modify-data-table-permissions}
ここでは、データテーブルの挿入権限、ecreator の元の権限 `ContractConditions("MainCondition")`、および ecreator ではないコントラクト設定 `new_record_account` を変更する必要があります。
したがって、`ContractConditions("MainCondition")` を変更して、コントラクトが `ContractAccess("@18NewRecord")` で操作できるように指定するだけです。
データ テーブルのアクセス許可を変更するには、コントラクト `@1EditTable` を呼び出します。
```text
>callContract @1EditTable {"Name": "@18grade_info", "InsertPerm": "ContractAccess(\"@18NewRecord\")", "UpdatePerm": "ContractConditions(\"MainCondition\")", "ReadPerm": "true", "NewColumnPerm": "ContractConditions(\"MainCondition\")"}
```

次に、変更したばかりのコントラクトを呼び出し、新しいレコードを作成します
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
先ほど設定したローカリゼーション パラメータ`account_not_access`が機能していることがわかります。

権限エラーが報告され、現在のユーザーには操作権限がないことがわかりました。keyId `6667782293976713160` のアカウントに切り替えます。コマンド ライン ツール `アカウント情報` を使用して現在のユーザーの情報を取得できます。
コマンド ライン ツール config.yml を設定し、keyId `6667782293976713160` のアカウントに切り替えます。
設定完了後、再度契約を呼び出します
```text
>callContract @18NewRecord {"Student": "tini", "Grade": 1, "Class": 3, "Mathematics": 69, "Physics": 89, "Literature": 98}

{
    "block_id": 1436,
    "hash": "93327dafb7bae9f9f66718eb87020a7bca4c00060f4bd0a243b49eea304c52e6",
    "penalty": 0,
    "err": ""
}
```
T呼び出しは完了し、`getList @18grade_info` を介してデータテーブルをクエリし、結果は期待通りです。

この記事がIBAXネットワークの動作や明確で安全な`Needle`コードの書き方についての理解に役立つことを願っています。


## コマンドラインツールを使用したアプリケーションの展開 {#deploy-application-using-command-line-tools}
このチュートリアルでは、以下の手順を学びます：
- 1. [アプリケーションのエクスポート](#export-application)
- 2. [アプリケーションのインポート](#import-application)

このチュートリアルを始める前に、独自のアプリケーションを持っていてエコロジーとアプリケーションの概念を理解している必要があります。[はじめにガイド](#getting-started-guide)を参照してください。
[コマンドラインツール](https://github.com/IBAX-io/ibax-cli) を使用してIBAXブロックチェーンにアプリケーションをインポートします。Export Application


### アプリケーションのエクスポート {#export-application}
現在のアカウント情報をクエリするために `account info` を呼び出します。ここでログインしているエコロジーIDは `9` です。現在のエコロジーIDでアプリケーションをクエリするために `getList` コマンドを呼び出します。

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
現在のエコロジーには 6 つのアプリケーションがあることがわかります。`export`コマンドを使用して、`id`が`36`のアプリケーションをエクスポートします。
```shell
>export 36 -f=./data.json

{
    "name": "./data.json",
    "type": "application/json",
    "value": ""
}
```
ここで -f パラメータを指定すると、エクスポートされたアプリケーションが現在のディレクトリの `data.json` ファイルに保存されます。
-f パラメータがない場合、アプリケーション データはコマンド ターミナルに出力されます。


`export`コマンドは、アプリケーションをエクスポートする手順をカプセル化します。 上記のコマンドを使用してアプリケーションをエクスポートすることも、次の手順を使用することもできます。
新しいアプリケーションをエクスポートするためにコントラクト `@1ExportNewApp` を呼び出すと、エクスポートされたアプリケーションのレコードが `1_buffer_data` テーブルに生成されます。
```shell
>callContract @1ExportNewApp {"ApplicationId": 36}
```


コントラクト `@1Export` を呼び出してアプリケーションをエクスポートし、選択したアプリケーションを `1_buffer_data` テーブルで見つけて、すべてのアプリケーション リソースを生成された JSON 文字列にエクスポートします。
生成された JSON 文字列は、現在のエコシステムの「1_binaries」テーブルに書き込まれます。
```shell
>callContract @1Export
```

`getList` コマンドを使用して、`1_binaries` テーブル内のデータをクエリします。
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
バイナリIDとハッシュを取得する
`binaryVerify` コマンドを呼び出してバイナリ ファイルをエクスポートします
```shell
>binaryVerify 14 8542cb57b77e0ae2c...92c3e05dbbe35ab646789be5b8ba8 -f=./data.json

{
    "name": "./data.json",     
    "type": "application/json",
    "value": ""
}
```
 
### アプリケーションのインポート {#import-application}
`import` コマンドを使用してアプリケーションをインポートし、`-f` パラメータを使用してインポートするアプリケーション ファイルを指定します
```shell
$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit

>import -f . /data.json
```

`import`コマンドはアプリケーションをインポートする手順をカプセル化しています。上記のコマンドを使用してアプリケーションをインポートできます。

または、調査と研究を容易にするために、次の手順を使用します。
-   ステップ1
新しいアプリケーションをインポートするためにコントラクト `@1ImportUpload` を呼び出すと、エクスポートされたアプリケーションのレコードが `1_buffer_data` テーブルに生成されます。
`@1ImportUpload` コントラクト パラメーター `Data` は `file` [type](../topics/vm.md#types) です。
キーワード「Name」ファイル名（文字列）、「MimeType」ファイルタイプ（文字列）、「Body」（[]バイト）ファイル内容が含まれます。
アプリケーションファイルデータをbase64エンコードして「Body」に渡す必要があります。「base64Encode」コマンドを使用してbase64エンコードできます。
```shell
>base64Encode -f=./data.json

Encode:ewoJIm5hbWUiOiAid...CQkJIlR5cGUiOiAiY29udHJhY3RzIiwKCQkJIk5hbWUiOiAiSGVsbG9Xb3JsZCIsCgkJCSJWYWx1ZSI6...

>callContract @1ImportUpload {"Data": {"Name": "filename", "MimeType": "mimeType", "Body": "ewoJIm5hbWUiOiAid...CQkJIlR5cGUiOiAiY29udHJhY3RzIiwKCQkJIk5hbWUiOiAiSGVsbG9Xb3JsZCIsCgkJCSJWYWx1ZSI6..."}}
```

- ステップ12
呼び出しが完了したら、`getList`コマンドを使用して「1_buffer_data」テーブル内のデータをクエリします。
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

- ステップ3
value.data->Data のデータを 1 次元配列 [a,b,c,d] に組み立てます。
次に、次の内容を含むコントラクト パラメーター ファイル`importParams.json`を作成します。
```json
{"Data":"[a,b,c,d]"}
```

- ステップ4
コントラクト `@1Import` を呼び出してアプリケーション データをインポートします
```shell
>callContract @1Import -f=./importParams.json
```


## エコロジーの設定（コマンドラインツールを使用） {#ecosystem-configuration-using-command-line-tool}

このチュートリアルでは、以下の手順を実行します:
1. [エコロジーへの参加申請](#apply-to-join-the-ecosystem)
2. [エコロジーメンバーの追加](#add-ecosystem-members)
3. [アカウントの凍結](#freezing-of-accounts) 
4. [役割管理](#role-management)
5. [トークンの発行](#issuance-of-token)
6. [エコロジー控除](#eco-deduction)
7. [DAOガバナンスエコロジー](#dao-governance-ecosystem)


このチュートリアルを開始する前に、独自のアプリケーションを用意し、エコロジーとアプリケーションの概念を理解する必要があります。[スタート ガイド](#getting-started-guide) を参照してください。
[コマンドラインツール](https://github.com/IBAX-io/ibax-cli) を使用して、IBAX ブロックチェーン上でエコロジー構成を実行します。

### エコロジーへの参加を申請する {#apply-to-join-the-ecosystem}
`@1MembershipRequest` コントラクトを呼び出して、エコロジーへの参加をリクエストできます。
次の例:
```shell
>callContract @1MembershipRequest {"EcosystemId": 19}
```
エコロジー ID `19` でエコロジーへの参加をリクエストする場合、`@1MembershipRequest` コントラクトはエコロジーの呼び出しに制限を設けており、基本エコロジーでのみ呼び出すことができます。
申請が成功すると対象エコロジー管理者に申請が届き、エコロジー管理者が申請を承認した場合のみ対象エコロジーに参加したとみなされます。
もちろん、ターゲットのエコロジーが公開されている場合は、ターゲットのエコロジーに直接参加することもできます

### エコロジーメンバーを追加する  {#add-ecosystem-members}
エコロジーが作成されたばかりの場合、エコロジー メンバーはエコロジー作成者のみです。他のメンバーを参加に招待する必要がある場合は、招待された人の公開鍵を知っていて、コントラクト `@1MembershipAdd` を呼び出してメンバーを追加する必要があります。
```shell
>callContract @1MembershipAdd {"Keys": "04f2c1780ca0aa0f343d0e541c77811...3b0d5bf3a9903253aad6e78c966b5f91ffb32703884020"}
```

エコロジーがパブリックで誰でも参加できる場合は、エコロジー パラメーター `free_membership` = 1 を設定できますが、これはデフォルトではパブリックではありません。
一度設定したら、エコシステムへの参加を承認する必要はありません
```shell
>callContract @1NewParameter {"Name": "free_membership", "Value": "1", "Conditions": "ContractConditions(\"MainCondition\")"}
```
パラメータ `free_membership` を設定しない場合、他のメンバーがあなたのエコロジーへの参加を申請したときに、申請通知を受け取ります。


`@1MembershipDecide` 契約承認アプリケーションを呼び出し、契約パラメータ `NotificId` は通知 ID、'Accept' は解決マーク、解決マーク '1' が渡されます
```shell
>callContract @1MembershipDecide {"NotificId": 6, "Accept": 1}
```

### アカウントの凍結 {#freezing-of-accounts}
`@1DeleteMember` コントラクトを呼び出してアカウントを凍結します。この操作は復元できないことに注意してください
```shell
>callContract @1DeleteMember {"MemberAccount": "1539-2715-xxxx-1679-5385"}
```

### 役割管理 {#role-management}
- [新しいロールの作成](#new-role-creation)
- [ロールメンバーを追加](#adding-role-members)
- [ロールメンバーを削除](#delete-role-members)
- [ロールマネージャーを変更](#modify-role-manager)
- [ロールの削除](#delete-role)


#### 新しい役割の作成 {#new-role-creation}
`@1RolesCreate` コントラクトを呼び出して、新しいロール、ロール名 `student`、タイプ `2` (1 - 割り当て可能 2 - 投票タイプ 3 - システム) を作成します。
```shell
>callContract @1RolesCreate {"Name": "student", "Type": 2}
{
    "block_id": 1685,
    "hash": "5321f2231a...d0d80158b62766395f14d0ff7",
    "penalty": 0,
    "err": "21"
}
```
返される結果にはロール ID `21` が含まれます

#### ロールメンバーの追加 {#adding-role-members}
2 つのメソッドがあります。1 つ目のメソッドは、エコロジカル メンバーがアプリケーションを開始し、コントラクト `@1RolesRequest` リクエストを呼び出してロールのメンバーとして追加するリクエストです。ここで、`Rid` はロール ID です
```shell
>callContract @1RolesRequest {"Rid": 21}
```

2 番目の方法では、ロール マネージャーがロール メンバーを割り当て、ロール マネージャーがコントラクト `@1RolesAssign` を呼び出してメンバーをロールに追加します。
```shell
>callContract @1RolesAssign {"MemberAccount": "0666-7782-xxxx-7671- 3160", "Rid": 21}
```

#### ロールメンバーを削除する {#delete-role-members}
まず、ロールにどのようなメンバーが含まれているかを確認します。これは、次のように getList を介してクエリできます。
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
ここで、`where`条件`ecosystem`はエコロジーを指定し、`role->id`はロール ID を指定し、`deleted`: 0 は削除されないことを指定します。
  メンバー `1273-2644-xxxx-5846-6598` のロール、つまり `id` が `21` のロールを削除する場合、行が 3 つあることがわかります。
  管理者は、次のようにコントラクト `@1RolesUnassign` を呼び出してロール メンバーを削除できます。
```shell
>callContract @1RolesUnassign {"RowId": 21}
```

#### 役割マネージャーの変更 {#modify-role-manager}
現在の生態学的役割を見てみましょう
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
ここで、`roles_access`は現在のロールの管理ロールであり、配列であり、複数を持つことができます。
`@1RolesAccessManager` コントラクトを呼び出して、管理ロールをロール `Teacher` に追加します。ここで、コントラクトのパラメータは `Action` 管理演算子 (`clean`、`remove`、`add`)、`Rid` のロール ID です。 管理対象の`ManagerRid`ロールの Rid マネージャー
```shell
>callContract @1RolesAccessManager {"Action": "add", "Rid": 20, "ManagerRid": 13}

{
    "block_id": 1745,
    "hash": "e2eb8ff0dc309ec7652db...bbbe58bca4ca574804e46c2f63653eb73104",
    "penalty": 0,
    "err": ""
}
```

#### 役割の削除 {#delete-role}
`@1RolesDelete` コントラクトを呼び出してロールを削除できます。コントラクト パラメータの `Rid` は管理対象のロールの ID、`Ops` は演算子です (`D` は削除、`R` は復元)
```shell
>callContract @1RolesDelete {"Rid": 24, "Ops": "D"}

{
    "block_id": 1785,
    "hash": "1ebf99a04f504fc3d2...4ecfbdfc419bf3dbf39df0013dca913f844",
    "penalty": 0,
    "err": ""
}
```


### トークンの発行 {#issuance-of-token}
- [エコロジーをクリエイト](#create-ecosystem)
- [基本アプリケーションのインストール](#installing-basic-applications)
- [トークン発行](#token-issuance)

#### エコロジーを創造する {#create-ecosystem}
エコロジーを作成し、`@1NewEcosystem` コントラクトを呼び出します
```shell
>callContract @1NewEcosystem {"Name": "Test Ecosystem"}
{
    "block_id": 1787,
    "hash": "384f35ef93243c9dd4f53b9298873b356b25b31cf7c6a6be7600ee7694d77006",
    "penalty": 0,
    "err": "21"
}
```
次に、コマンド ライン ツールの設定を変更して、この新しく作成されたエコシステムにログインします:「21」

#### 基本アプリケーションのインストール {#installing-basic-applications}

次のように、コントラクトを呼び出して基本アプリケーションをインストールします。
```shell
1  >callContract @1PlatformAppsInstall
2  >callContract @1RolesInstall
3  >callContract @1AppInstall {"ApplicationId": 5}
4  >callContract @1AppInstall {"ApplicationId": 6}
```
1行目、プラットフォームアプリケーションをインストールします
2行目、デフォルトの役割をインストールします
行 3 ～ 4 では、エコ構成およびトークン発行アプリケーションをインストールします。ここで、アプリケーション ID `5,6` は、次のように getList を介してクエリできます。
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
 
#### トークンの発行 {#token-issuance}
新しいエコロジーであるため、トークンの発行を設定する必要があります。`@1TeSettings` コントラクトを呼び出して、トークンを発行できるロールを指定します。
```shell
>callContract @1TeSettings {"RoleDeveloper": 30}
```
ここで、`RoleDeveloper`は現在のエコロジー ロール ID であり、「@1roles」データ テーブルから取得できます。


**トークンの発行** `@1NewToken` コントラクトを呼び出してトークンを発行します
```shell
>callContract @1NewToken {"Symbol": "TEST", "Name": "TEST Coin", "Amount": "10000000000000000" ,"Digits": "12"}
```
ここで、コントラクトパラメータの `Symbol` はトークンシンボル、`Name` はトークン名、`Amount` は合計金額、`Digits` は精度です。

**トークンの発行**
```shell
>callContract @1TeEmission {"Amount": 1000000000000}
```

**トークンを破壊する**
```shell
>callContract @1TeBurn {"Amount": 1000000000000}
```

デフォルトのトークンの増分とトークンの破棄が許可されています。`@1TeChange` によってそれをオフに設定できます。ここで、`TypeChange` はタイプ (`emission` の増分、`withdraw` の破棄) です。
`Value` はオン/オフのステータス (`1` がオン、`2` がオフ) です。例:
**追加機能を閉じる** 注: 閉じた後はオンにできません
```shell
>callContract @1TeChange {"TypeChange": "emission", "Value": 2}
```

**破壊をオフにします**。再度破壊をオンにしたい場合は、`値`を`1`に設定するだけです。
```shell
>callContract @1TeChange {"TypeChange": "withdraw", "Value": 2}
```

### エコ控除 {#eco-deduction}
エコ控除を設定する前に、[ホワイトペーパー](https://github.com/IBAX-io/whitepaper) に記載されている IBAX 料金モデルを理解する必要があります。
 
まずエコウォレットのアドレスを設定し、`@1EditParameter` コントラクトを呼び出してエコパラメータを変更します。
```shell
>callContract @1EditParameter {"Id": 334, "Value": "1273-2644-xxxx-5846-6598"}
```
ここで、`Id` は ecowallet (エコシステムウォレット) の `ecosystem_wallet` パラメーター ID であり、次のようにクエリできます。
```shell
>getList @1parameters -w={"ecosystem": 22, "name": "ecosystem_wallet"}
```
`Value`値はバインドされるエコウォレットのアドレスであり、契約によりガス料金が生成され、そのアドレスによって支払われます。 アドレスには現在のエコロジーに十分なトークンが必要であり、変更が成功する前にバインドされたアドレスによって同意される必要があります。

次のように、`@1EcoFeeModeManage` コントラクトを呼び出して、マルチエコロジー控除を設定します。
```shell
>callContract @1EcoFeeModeManage {"FollowFuel": 0.01, "CombustionFlag": 1, "VmCostFlag": 2, "VmCostConversionRate": 100, "StorageConversionRate": 100, "StorageFlag": 2, "ExpediteFlag": 1}
```
ここで、コントラクトパラメータフィールドは次のように定義されます。
- `FollowFuel` パラメータは、follow eco1 レートの倍数です。
- `CombustionFlag` エコトレードガス料金の燃焼をオンにするかどうか、1-いいえ、2-はい
- `CombustionPercent` 燃焼パーセンテージ。ガス料金燃焼がオンになっている場合にのみ有効です。値は 1 ～ 100 で、オンになっていない場合は 0 になります。
- `VmCostFlag` VM コスト フラグ、直接支払いまたは代理支払いを設定、1 - 直接支払い、2 - 代理支払い
- `StorageFlag` 保管料金フラグ、直接支払いまたは代理支払いを設定、1 - 直接支払い、2 - 代理支払い
- `ExpediteFlag` 急送料金フラグ、直接支払いまたは代理支払いを設定、1 - 直接支払い、2 - 代理支払い
- `VmCostConversionRate` 仮想マシンのコスト変換率、小数点以下 2 桁、代理支払いの場合にのみ有効、0 より大きい
- `StorageConversionRate` ストレージ コストの換算率（小数点以下 2 桁）、代理支払いの場合にのみ有効、0 より大きい
 
上記の設定を使用する場合、ユーザーがエコロジー内でコントラクトを呼び出すことによって発生するすべての取引手数料は、現在のエコロジー設定のエコロジカル ウォレットによって支払われます。
すべてのユーザーは、エコロジー内で発生するガス料金のみを支払う必要があります。 もちろん、実際のニーズに応じてコストパラメータを調整できます


### DAO ガバナンス エコロジー {#dao-governance-ecosystem}
DAO ガバナンス エコロジーに変更する前に、現在のエコロジーがトークンを発行していることを確認する必要があります。DAO ガバナンス エコロジーに変更した後、エコロジーのすべての提案はガバナンス委員会のメンバーによって投票されます。
DAO 統治委員会はもはやエコ開発業者だけによって運営されることはなく、エコホールディングスの上位 50 人の代表者が選出されます。


`@1EditControlMode` コントラクトを呼び出して、エコ ガバナンス モードを DAO ガバナンス モードに変更します。
```shell
>callContract @1EditControlMode {"Value": 2}
```
ここで、`Value`パラメータの`1`は作成者モデルを表し、「2」は DAO ガバナンス モデルを表します。

アプリケーションを作成してみます
```shell
>callContract @1NewApplication {"Name": "testApp", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
```
この時点で、DAO ガバナンス提案が生成され、アプリケーションが作成される前に DAO ガバナンス委員会によって投票されます。 有効な提案には、投じられた投票の 75% のうち 68% の支持率が必要です。
DAO ガバナンスの範囲には以下が含まれます。
1. アプリケーション、コントラクト、ページ、コード スニペット、タブ、メニュー、アプリケーション パラメータ、データ テーブルおよびフィールドの追加、削除、および変更
2. 多言語の変更
3. DAOとクリエイターモデルの切り替え
4. 生態パラメータを編集する
5. ロール、ロールメンバーの割り当てを削除
6. 追加破壊通貨発行
7. プラットフォームパラメータを変更する
8. 生態情報の変更
9. 遅延した契約の変更
10. 投票テンプレートを変更する
 

## アプリケーション パッケージング ツールを使用してアプリケーションをデプロイする {#deploy-applications-using-application-packaging-tool}
このチュートリアルを開始する前に、[IBAX アプリケーション パッケージング ツール](https://github.com/IBAX-io/app-tool) をダウンロードする必要があります。このツールを使用して IBAX アプリケーションをパッケージ化する必要があります。

次のディレクトリ構造に従ってアプリケーション ファイルを保存する必要があります。
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
以下に示すように:
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
`app_params` ディレクトリには、パラメータ名 + ファイル形式 `.csv` を使用して名前が付けられたアプリケーション パラメータ ファイルが保存されます。ファイルの内容はパラメータ値です。
`contracts` ディレクトリには契約が `.sim` ファイル形式で保持され、ファイルの内容は契約のソース コードです。
  `tables`ディレクトリには、次のようにアプリケーション データ テーブル構造が`json`ファイル形式で保持されます。
```json
[
  { "name": "account", "conditions": "{\"read\": \"true\", \"update\": \"ContractConditions(\"MainCondition\")\"}", "type": "varchar" },
  { "name": "balance_amount", "conditions": "true", "type": "money" },
  { "name": "stake_amount", "conditions": "true", "type": "money" },
  { "name": "surplus", "conditions": "true", "type": "number" },
  { "name": "total_amount", "conditions": "true", "type": "money" }
]
```
`name` はデータテーブルのフィールド名、`conditions` はデータテーブルのフィールド権限、`type` はフィールドのタイプです。

ステップ 1 では、config.json ファイルを生成し、次の内容で airdrop ディレクトリに保存します。
```text
{
    "name": "Airdrop",
    "conditions": "ContractConditions(\"@1MainCondition\")"
}
```
ここで、`name` はアプリケーションの名前、`conditions`: はアプリケーションを変更して airdrop ディレクトリに保存する権限です。

ステップ 2: アプリケーションをパッケージ化します。次のコマンドにより、現在のディレクトリにアプリケーション `airdrop.json` が生成されます。コントラクトまたはアプリケーションのパラメータを変更した場合は、アプリケーションを再パッケージ化する必要があります。
```shell
$ ./app-tool airdrop/
```
次のように、[コマンド ライン ツール](https://github.com/IBAX-io/ibax-cli) を介してアプリケーションをインポートできます。
`import` コマンドを使用してアプリケーションをインポートし、`-f` パラメータを使用してインポートするアプリケーション ファイルを指定します。
```shell
$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit

>import -f ./airdrop.json
```

もちろん、アプリケーションをお持ちの場合は、次のコマンドを使用して完全なディレクトリ構造を生成することもできます。
 ```shell
$ app-tool.exe airdrop.json
```

