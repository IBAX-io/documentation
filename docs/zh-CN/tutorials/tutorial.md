# IBAX开发教程 {#ibax-development-tutorial}

## 入门指南 {#getting-started-guide}
  - [通过命令行工具部署第一个智能合约](#deploy-first-smart-contract-via-command-line-tool)
  - [命令行工具生态开发](#command-line-tool-eco-development)
  
## 部署 {#deployment}
  - [使用命令行工具部署应用](#deploy-application-using-command-line-tools)
  - [使用命令行工具生态配置](#ecological-configuration-using-command-line-tool)

## 进阶指南 {#advanced-guide}
  - [使用应用打包工具部署应用](#deploy-applications-using-application-packaging-tool)


## 通过命令行工具部署第一个智能合约 {#deploy-first-smart-contract-via-command-line-tool}
我们将通过[命令行工具](https://github.com/IBAX-io/ibax-cli) 在IBAX区块链上部署[智能合约](../concepts/thesaurus.md#smart-contract) , 并学习何如调用智能合约。
作为我们的第一个智能合约，我们将其部署到[本地测试网络](../concepts/blockchain-layers.md) 上，
如何部署本地网络你可以参考[网络部署](../howtos/deployment.md) , 因此您不需要任何开销就可以随意部署和运行它。

### 创建应用 {#create-application}
调用合约@1NewApplication创建应用，该合约有一个应用名称参数和一个修改[权限参数](../concepts/about-the-platform.md#access-rights-control-mechanism) 。
``` text
1    $ ibax-cli console
2    
3    Welcome to the IBAX console!
4    To exit, press ctrl-d or type exit
5  >callContract @1NewApplication {"Name": "testapp", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
6  
7  {
8      "block_id": 1217,
9      "hash": "6327161d2202c33c06d34ab4ed9b509c05fc2cbb15cf260c6d3d404a6f640028",
10      "penalty": 0,
11      "err": "31"
12  }
```

下面按行解释：
- 第1行，启动命令行终端。
- 第5行，调用合约@1NewApplication创建一个应用，应用名称为`testapp`,应用修改权限为开发者权限`@1DeveloperCondition`。
- 第8行，交易产生的区块id。
- 第9行，交易产生的区块哈希。
- 第10行，如果交易执行失败（0：无惩罚 1：惩罚）。
- 第11行，如果交易执行失败，则返回一条错误文本消息，如果返回了区块id，err字段为该应用的id。

当然如果你想查看这个合约有哪些字段，字段类型，可以调用`getContractInfo`方法,它将返回合约信息，如下：
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
`fields`字段为该合约的参数,包括参数的名称`name`，类型`type`，可选项`optional`，`Name`和`Conditions`为必填项，`VotingId`为可选项,可参考[contract/name](../reference/api2.md#contract-name)  API方法。


### 编写合约 {#writing-contracts}
我们使用[Needle](../topics/script.md#needle-contract-language) 编写智能合约，
我们实现一个简单的加法运算，合约源码如下,我们将合约保存为`SumMath.sim`。
``` text
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
下面按行解释：
- 第1行，我们定义了一个名称为SumMath的合约。
- 第2行, [数据部分](../topics/script.md#data-section) 。
- 第3-第4行，我们定义了两个输入64位整数型参数`A B`。
- 第6行,[条件部分](../topics/script.md#conditions-section) 。
- 第9行,[操作部分](../topics/script.md#action-section) 我们定义了一个变量sum，用于接收A+B结果，
将sum的值赋给$result,作为合约的返回结果.当然也可以直接将A+B的值赋给$result，但它可以作为一个例子展示.

### 创建合约 {#create-contract}
有两种方法创建合约，第一种方法：
第一步我们编写一个合约参数文件，文件格式为json：
``` json
{
  "ApplicationId": 31,
  "Value": "contract SumMath {\n    data {\n        A int\n        B int\n    }\n    conditions {\n\n    }\n    action {\n        var sum int\n        sum = $A + $B\n        $result = sum\n    }\n}",
  "Conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```
其中`ApplicationId`为应用id,`Value`为合约源码，需要对特殊字符进行转义处理，`Conditions`为该合约修改权限。

我们将它命名为`SumMathParams.json`。


第二步调用创建合约@1NewContract。
```
1    >callContract @1NewContract -f=./data/SumMathParams.json
2    {
3        "block_id": 1238,
4        "hash": "f3fe7aff8a613c96299723b7e9af0682aa8cabe7becf67a485e2a77a974f58b6",
5        "penalty": 0,
6        "err": "328"
7    }
```

第二种方法：
直接将保存的合约源码文件传入合约参数中，参数格式为`参数名称`+ `-` + "file",`paramsName-file`如下：
```shell
1    >callContract @1NewContract {"ApplicationId": 31, "Value-file": "SumMath.sim", "Conditions": "true"}    
2    {
3        "block_id": 2055,
4        "hash": "cdf25060669cf7cba137278...26ca463fd5d458f3402a5f0137f693db",
5        "penalty": 0,
6        "err": "368"
7    }
```

下面按行解释：
- 第1行：调用合约@1NewContract创建合约，-f使用文件导入合约参数。
- 第3行，交易产生的区块id。
- 第4行，交易产生的区块哈希。
- 第5行，如果交易执行失败（0：无惩罚 1：惩罚）。
- 第6行，如果交易执行失败，则返回一条错误文本消息，如果返回了区块id，err字段为该合约的id。


我们试着调用一下刚刚部署的合约。
```
1  >callContract @5SumMath {"A":1, "B":2}
2  
3  {
4      "block_id": 1239,
5      "hash": "7fa09da0b9f65634119a910f9d91aaf4927208278efd62961499ef7e4f4c8c9c",
6      "penalty": 0,
7      "err": "3"
8  }
```
调用完成，结果符合预期,下面按行解释：
- 第1行调用合约，这里我们将合约部署到了生态id为5的生态里，当然如果当前所在生态id为5,同一个生态中时，也可以这么调用`callContract SumMath {"A":1, "B":2}`。
- 第3行，交易产生的区块id。
- 第4行，交易产生的区块哈希。
- 第5行，如果交易执行失败（0：无惩罚 1：惩罚）。
- 第6行，如果交易执行失败，则返回一条错误文本消息，如果返回了区块id，err字段为该合约的结果，也就是`$result`的值。


## 命令行工具生态开发 {#command-line-tool-eco-development}
在本教程中，您将学习如何：
1、[创建生态](#step-1-create-ecosystem)
2、[创建应用](#step-2-create-application)
3、[创建数据表](#step-3-create-table)
4、[创建应用参数](#step-4-create-application-parameters)
5、[创建和部署合约](#step-5-create-contract-deploy-contract)
6、[创建生态参数](#step-6-create-ecological-parameters)
7、[添加本地化](#step-7-add-localization)
8、[修改合约](#step-8-modify-the-contract)
9、[修改数据表权限](#step-9-modify-data-table-permissions)

为了更清楚的了解IBAX生态与应用是怎么样的，做什么用的，首选我们了解一下生态和应用应该属于那一部分，我们通过一个简单的思维导图可以更好的理解：
![image](_ststic/ibax-eco.png)

可以看到IBAX网络可以有许多[生态](../concepts/about-the-platform.md#ecolib) ,
每个生态可以有多个[应用](https://docs.ibax.io/concepts/about-the-platform.html#applications) ,
每个应用都有[合约](https://docs.ibax.io/concepts/thesaurus.html#smart-contract) ,
[数据表](https://docs.ibax.io/concepts/about-the-platform.html#tables) , 生态有生态参数，应用有应用参数

### 第1步创建生态 {#step-1-create-ecosystem}
我们先使用[命令行工具](https://github.com/IBAX-io/ibax-cli) 创建一个生态, 调用合约@1NewEcosystem.
如果你想修改生态名称，可以调用`@1EditEcosystemName`合约.

```shell
1    $ ibax-cli console
2    
3    Welcome to the IBAX console!
4    To exit, press ctrl-d or type exit
5    >callContract @1NewEcosystem {"Name": "goodBoy school"}
6    
7    {
8        "block_id": 1199,
9        "hash": "a1dc90c1772545c16394b9521645ae60c0c292227676b27b145743556a8973dd",
10       "penalty": 0,
11       "err": "18"
12   }
```

下面按行解释：
- 第1行，启动了命令行控制台程序。
- 第5行，调用合约@1NewEcosystem创建一个生态，该生态名称为`test ecosystem`。
- 第8行，交易产生的区块id。
- 第9行，交易产生的区块哈希。
- 第10行，如果交易执行失败（0：无惩罚 1：惩罚）。
- 第11行，如果交易执行失败，则返回一条错误文本消息，如果返回了区块id，err字段为该生态的id为`18`。

然后我们配置命令工具`config.yml`，将`ecosystem`设置为创建的生态id`18`，重新启动命令行控制台程序。
```shell
>exit
INFO[0002] Exit

$ vim data/config.yml

$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit
>
```

### 第2步创建应用 {#step-2-create-application}
调用合约`@1NewApplication`创建应用，该合约有一个应用名称参数和一个修改[权限参数](https://docs.ibax.io/concepts/about-the-platform.html#access-rights-control-mechanism) 。
``` text
1  >callContract @1NewApplication {"Name": "GradesRecorder", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
2  
3  {
4     "block_id": 1246,
5     "hash": "85ab8953d26d0d1047fc610866115331babfaf88c80792d50b41826185c9f6f8",
6     "penalty": 0,
7     "err": "47"
8  }
```
如果你需要修改应用权限，可以调用`EditApplication`合约。


下面按行解释：
- 第1行，调用合约@1NewApplication创建一个应用，应用名称为`GradesRecorder`,应用修改权限为开发者权限`@1DeveloperCondition`。
- 第4行，交易产生的区块id。
- 第5行，交易产生的区块哈希。
- 第6行，如果交易执行失败（0：无惩罚 1：惩罚）。
- 第7行，如果交易执行失败，则返回一条错误文本消息，如果返回了区块id，err字段该应用的id为`47`。

我们写一个简单的例子，这个应用可以记录学生的成绩，
数据表字段包括学生的信息，年级`grade`，班级`class`，科目成绩`mathematics,physics,literature`，
综合评分`overall_score`，评级`score`,创建时间戳（ms）`created_at`。

### 第3步创建数据表 {#step-3-create-table}
第一步我们编写一个合约参数文件，文件格式为json：
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
其中`ApplicationId`为应用id,`Name`为创建的数据表名`test_teble`，
`ColumnsArr`为数据表字段数组，`TypesArr`为数据表字段的类型，包括9种[类型](../concepts/about-the-platform.md#tables) 。
`varchar`,`character`,`json`,`number`,`datetime`,`double`,`money`,`text`,`bytea`,字段名跟字段类型是一一对应关系，
`InsertPerm`为数据表新建条目权限，`UpdatePerm`为数据表更新条目权限，`ReadPerm`为数据表数据读取权限，`NewColumnPerm`为新建数据表字段权限。
参考[权限管理](../concepts/about-the-platform.md#access-rights-control-mechanism) ,这里的`ContractConditions(\"MainCondition\")`为当前生态创建者可用。

我们将它命名为createTable.json,然后调用合约创建数据表`@1NewTableJoint`。
```text
>callContract @1NewTableJoint -f ./createTestTable.json
```

#### 修改数据表字段权限 {#modify-data-table-field-permissions}
我们可以修改数据表字段权限,数据表字段权限包括读取权限和更新权限，其中读取权限，在合约使用`DBFind.Columns`筛选字段或者接口如[list](https://docs.ibax.io/reference/api2.html#list-name-limit-offset-columns) 查询时,如果没有权限则会报权限错误,
更新权限即为更新数据表字段的权限。
我们将`student`字段读取和更新权限设置为`false`，当然也可以设置为某个合约可操作。
调用`@1EditColumn`合约修改数据表字段权限。
```shell
>callContract @1EditColumn {"TableName": "grade_info", "Name": "student", "UpdatePerm": "false", "ReadPerm": "false"}
```


我们可以创建几个应用参数`grade_best_type`,`grade_type_a+`,`grade_type_a`,`grade_type_b+`,`grade_type_b`,`grade_type_c`,成绩评级类型。

### 第4步创建应用参数 {#step-4-create-application-parameters}
调用合约`@1NewAppParam`创建应用参数,如果你要修改应用参数可以调用`@1EditAppParam`合约.
```text
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_best_type", "Value": "A+", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_a+", "Value": "{\"max\": 101,\"min\": 90}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_a", "Value": "{\"max\": 90,\"min\": 80}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_b+", "Value": "{\"max\": 80,\"min\": 70}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_b", "Value": "{\"max\": 70,\"min\": 60}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_c", "Value": "{\"max\": 60,\"min\": 0}", "Conditions": "ContractConditions(\"MainCondition\")"}
```
其中`grade_best_type`为最好的评级类型，
`grade_type_a+`为评级`A+`所触发的条件，当分数大于等于90并且小于101时，评为`A+`,其他参数类似。


### 第5步创建合约部署合约 {#step-5-create-contract-deploy-contract}

我们创建一个合约，用于记录学生各科目成绩信息与最终评级，录入信息时输入学生的年级班级与各科目成绩，
根据输入的各科的成绩做平均运算，得出综合评分`overallScore`与最终评级`score`,
当调用合约时，将创建一条记录到我们刚刚创建的数据表中`grade_info`。

首先我们编写一个合约，将它命名为`NewRecord.sim`。
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
下面按行解释：
- 第2行，[数据部分](../topics/script.md#data-section) 定义了输入参数`Student`学生名称,`Grade`年级,`Class`班级,`Mathematics`数学分数,`Physics`物理分数,`Literature`文学分数。
- 第10行，getScore函数，根据各科成绩得出综合评分与最终评级。
- 第30行，safeJsonDecode函数，将字符串进行json解码并转为map。
- 第38行，[条件部分](../topics/script.md#conditions-section) 。
- 第39行，[操作部分](../topics/script.md#action-section) 。

可以看到，当合约被调用时，首先走条件部分，验证合约输入参数是否有效，比如学生名称`if Size($Student) == 0 {`是否为空(第39行)，如果为空，则返回报错信息。
`"Student Can not be empty"`(第30行),当所有输入参数都校验通过后，第61行，使用[DBFind](../topics/script.md#dbfind) 从数据库检索生态id为`18`，应用名称为`GradesRecorder`并且未删除`deleted=0`的应用信息，
第69行-74行，使用[AppParam](../topics/script.md#appparam) 检索应用参数， 如`$gradeBestType = AppParam(app_id, "grade_best_type", $eId)`（第69行）,
如果应用参数为json格式存储，如`grade_type_a`,你可以参考`$gradeTypeABest = safeJsonDecode(AppParam(app_id, "grade_type_a+", $eId))`,将获取到的应用参数通过safeJsonDecode函数转为map格式。

然后执行到操作部分，调用getScore函数获取得出综合评分与最终评级(第10行),使用map存储，第79行，定义一个map，保存学生成绩信息，
[DBInsert](../topics/script.md#dbinsert) 往数据表`@18grade_info`插入数据。


有两种方法创建合约，第一种方法：
首先我们编写一个合约参数文件，文件格式为json：
```json
{
  "ApplicationId": 47,
  "Value": "contract NewRecord {\n    data {\n        Student string\n        Grade int\n        Class int\n        Mathematics int\n        Physics int\n        Literature int\n    }\n    func getScore(a b c int) map{\n        var m map\n        var overallScore int\n        overallScore = (a+b+c) / 3\n        m[\"overallScore\"] = overallScore\n        if overallScore >= $gradeTypeABest[\"min\"] && overallScore < $gradeTypeABest[\"max\"] {\n            m[\"score\"] = \"A+\"\n        }elif overallScore >= $gradeTypeA[\"min\"] && overallScore < $gradeTypeA[\"max\"] {\n            m[\"score\"] = \"A\"\n        }elif overallScore >= $gradeTypeBBest[\"min\"] && overallScore < $gradeTypeBBest[\"max\"] {\n            m[\"score\"] = \"B+\"\n        }elif overallScore >= $gradeTypeB[\"min\"] && overallScore < $gradeTypeB[\"max\"] {\n            m[\"score\"] = \"B\"\n        }elif overallScore >= $gradeTypeC[\"min\"] && overallScore < $gradeTypeC[\"max\"]{\n            m[\"score\"] = \"C\"\n        }else{\n            m[\"score\"] = \"Notset\"\n        }\n        return m\n    }\n    func safeJsonDecode(m string) map {\n        var res map\n        if Size(m) > 0 {\n            res = JSONDecode(m)\n        }\n        return res\n    }\n\n    conditions {\n        if Size($Student) == 0 {\n            warning \"Student Can not be empty\"\n        }\n        if $Class <= 0{\n            warning \"Class cannot be less than or equal to zero\"\n        }\n         if $Grade <= 0{\n            warning \"Grade cannot be less than or equal to zero\"\n        }\n        if $Mathematics < 0 {\n            warning \"Mathematics cannot be less than zero\"\n        }\n        if $Physics < 0 {\n            warning \"Physics cannot be less than zero\"\n        }\n        if $Literature < 0 {\n            warning \"Literature cannot be less than zero\"\n        }\n        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{\n            warning \"Score cannot exceed 100\"\n        }\n        var app map\n        app = DBFind(\"@1applications\").Columns(\"id,ecosystem\").Where({\"ecosystem\": 18,\"name\":\"GradesRecorder\",\"deleted\":0}).Row()\n        if !app {\n            warning LangRes(\"@1app_not_found\")\n        }\n\n        var app_id int\n        app_id = Int(app[\"id\"])\n        $eId = Int(app[\"ecosystem\"])\n        $gradeBestType = AppParam(app_id, \"grade_best_type\", $eId)\n        $gradeTypeABest = safeJsonDecode(AppParam(app_id, \"grade_type_a+\", $eId))\n        $gradeTypeA = safeJsonDecode(AppParam(app_id, \"grade_type_a\", $eId))\n        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, \"grade_type_b+\", $eId))\n        $gradeTypeB = safeJsonDecode(AppParam(app_id, \"grade_type_b\", $eId))\n        $gradeTypeC = safeJsonDecode(AppParam(app_id, \"grade_type_c\", $eId))\n    }\n    action {\n        var m map \n        m = getScore($Mathematics,$Physics,$Literature)\n        var in map\n        in[\"student\"] = $Student\n        in[\"class\"] = $Class\n        in[\"grade\"] = $Grade\n        in[\"mathematics\"] = $Mathematics\n        in[\"physics\"] = $Physics \n        in[\"literature\"] = $Literature \n        in[\"overall_score\"] = m[\"overallScore\"]\n        in[\"score\"] = m[\"score\"]\n        in[\"created_at\"] = $time\n        DBInsert(\"@\"+ Str($eId)+\"grade_info\", in)\n    }\n}",
  "Conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```

其中`ApplicationId`为应用id,，需要对特殊字符进行转义处理，`Conditions`为该合约修改权限,
`Value`合约源码，我们将它保存为`NewRecordParams.json`：


编写完合约后，我们需要部署合约，调用创建合约`@1NewContract`。
```text
1    >>callContract @1NewContract -f=./data/NewRecordParams.json
2    {
3        "block_id": 1262,
4        "hash": "d896f12f685835f6cf71705e1ba...4d8bcc0a1406f7b0b6482b2d230fc",
5        "penalty": 0,
6        "err": "348"
7    }
```
下面按行解释：
- 第1行：调用合约`@1NewContract`创建合约，-f使用文件导入刚刚创建的文件`NewRecord.json`作为合约参数。
- 第3行，交易产生的区块id。
- 第4行，交易产生的区块哈希。
- 第5行，如果交易执行失败（0：无惩罚 1：惩罚）。
- 第6行，如果交易执行失败，则返回一条错误文本消息，如果返回了区块id，err字段该合约的id为`348`。

第二种方法：
直接将保存的合约源码文件传入合约参数中，参数格式为`参数名称`+ `-` + "file",`paramsName-file`如下：
```shell
callContract @1NewContract {"ApplicationId": 47, "Value-file": "NewRecord.sim", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
```

我们试着调用一下刚刚创建的合约。
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
调用完成,接着我们查一下数据表是否保存了一条记录。
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
可以看到在数据表中已有一条记录，`student` tom的综合评分为56 评级为C。

以上例子仅用于学习研究使用，你需要根据实际情况更改相关参数，比如数据表的写入权限, 合约的修改权限等。

比如说我们要指定一个一个人才能调用这个新建记录的合约，其他所有人都不可以调用，我们可以设置一个生态参数`new_record_account`。

### 第6步设置生态参数 {#step-6-create-ecological-parameters}
调用合约`@1NewParameter`,将在`@1parameters`表创建生态参数`new_record_account`,如果你需要修改生态参数可以调用`@1EditParameter`。
```text
>callContract @1NewParameter {"Name": "new_record_account", "Value": "6667782293976713160", "Conditions": "ContractConditions(\"MainCondition\")"}

{
    "block_id": 1416,
    "hash": "12fc87ce6a70e2fc993ab9ffe623311f1c50edd1157595ce6183c38c93960cae",
    "penalty": 0,
    "err": "273"
}
```
我们创建了一个生态参数`new_record_account`，设置值为keyId `6667782293976713160`, 修改权限为`ContractConditions("MainCondition")`指当前生态创建者可修改。
交易执行成功时，"err"字段该生态参数id为`273`。

### 第7步添加本地化 {#step-7-add-localization}
可以调用`@1NewLangJoint`合约创建本地化参数`account_not_access`，将在`@1languages`表创建参数，你可以通过`@1EditLangJoint`修改本地化参数.
```shell
callContract @1NewLangJoint {"Name": "account_not_access", "LocaleArr": ["en", "ja"], "ValueArr": ["Sorry, you do not have access to this action", "申し訳ありませんが、このアクションにアクセスする権限がありません"]}
```

### 第8步修改合约 {#step-8-modify-the-contract}
接着我们需要修改一下合约源码`conditions`部分,在`conditions`添加如下代码。
```text
conditions {
  if EcosysParam("new_record_account") != $key_id {
      warning LangRes("account_not_access")
  }
}
```
调用修改合约@1EditContract,这里的`Id`为合约id, `Value`：为合约源码。
```text
>callContract @1EditContract {"Id": 348, "Value": "contract NewRecord {\n    data {\n        Student string\n        Grade int\n        Class int\n        Mathematics int\n        Physics int\n        Literature int\n    }\n    func getScore(a b c int) map{\n        var m map\n        var overallScore int\n        overallScore = (a+b+c) / 3\n        m[\"overallScore\"] = overallScore\n        if overallScore >= $gradeTypeABest[\"min\"] && overallScore < $gradeTypeABest[\"max\"] {\n            m[\"score\"] = \"A+\"\n        }elif overallScore >= $gradeTypeA[\"min\"] && overallScore < $gradeTypeA[\"max\"] {\n            m[\"score\"] = \"A\"\n        }elif overallScore >= $gradeTypeBBest[\"min\"] && overallScore < $gradeTypeBBest[\"max\"] {\n            m[\"score\"] = \"B+\"\n        }elif overallScore >= $gradeTypeB[\"min\"] && overallScore < $gradeTypeB[\"max\"] {\n            m[\"score\"] = \"B\"\n        }elif overallScore >= $gradeTypeC[\"min\"] && overallScore < $gradeTypeC[\"max\"]{\n            m[\"score\"] = \"C\"\n        }else{\n            m[\"score\"] = \"Notset\"\n        }\n        return m\n    }\n    func safeJsonDecode(m string) map {\n        var res map\n        if Size(m) > 0 {\n            res = JSONDecode(m)\n        }\n        return res\n    }\n\n    conditions {\n        if EcosysParam(\"new_record_account\") != $key_id {\n            warning LangRes(\"account_not_access\")\n        }\n        if Size($Student) == 0 {\n            warning \"Student Can not be empty\"\n        }\n        if $Class <= 0{\n            warning \"Class cannot be less than or equal to zero\"\n        }\n         if $Grade <= 0{\n            warning \"Grade cannot be less than or equal to zero\"\n        }\n        if $Mathematics < 0 {\n            warning \"Mathematics cannot be less than zero\"\n        }\n        if $Physics < 0 {\n            warning \"Physics cannot be less than zero\"\n        }\n        if $Literature < 0 {\n            warning \"Literature cannot be less than zero\"\n        }\n        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{\n            warning \"Score cannot exceed 100\"\n        }\n        var app map\n        app = DBFind(\"@1applications\").Columns(\"id,ecosystem\").Where({\"ecosystem\": 18,\"name\":\"GradesRecorder\",\"deleted\":0}).Row()\n        if !app {\n            warning LangRes(\"@1app_not_found\")\n        }\n\n        var app_id int\n        app_id = Int(app[\"id\"])\n        $eId = Int(app[\"ecosystem\"])\n        $gradeBestType = AppParam(app_id, \"grade_best_type\", $eId)\n        $gradeTypeABest = safeJsonDecode(AppParam(app_id, \"grade_type_a+\", $eId))\n        $gradeTypeA = safeJsonDecode(AppParam(app_id, \"grade_type_a\", $eId))\n        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, \"grade_type_b+\", $eId))\n        $gradeTypeB = safeJsonDecode(AppParam(app_id, \"grade_type_b\", $eId))\n        $gradeTypeC = safeJsonDecode(AppParam(app_id, \"grade_type_c\", $eId))\n    }\n    action {\n        var m map \n        m = getScore($Mathematics,$Physics,$Literature)\n        var in map\n        in[\"student\"] = $Student\n        in[\"class\"] = $Class\n        in[\"grade\"] = $Grade\n        in[\"mathematics\"] = $Mathematics\n        in[\"physics\"] = $Physics \n        in[\"literature\"] = $Literature \n        in[\"overall_score\"] = m[\"overallScore\"]\n        in[\"score\"] = m[\"score\"]\n        in[\"created_at\"] = $time\n        DBInsert(\"@\"+ Str($eId)+\"grade_info\", in)\n    }\n}"}
```


#### 第9步修改数据表权限 {#step-9-modify-data-table-permissions}
这里我们需要将数据表的插入权限修改，原先权限`ContractConditions("MainCondition")`为生态创建人，而合约设置`new_record_account`并不是生态创建人，
所以只需将`ContractConditions("MainCondition")`修改为指定合约可操作`ContractAccess("@18NewRecord")`即可.
调用合约`@1EditTable`修改数据表权限。
```text
>callContract @1EditTable {"Name": "@18grade_info", "InsertPerm": "ContractAccess(\"@18NewRecord\")", "UpdatePerm": "ContractConditions(\"MainCondition\")", "ReadPerm": "true", "NewColumnPerm": "ContractConditions(\"MainCondition\")"}
```

接着调用一下刚刚修改的合约，新建一条记录。
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
可以看到我们刚刚设置的本地化参数`account_not_access`起作用了。

发现报了权限错误，当前用户没有权限操作，我们切换到keyId为`6667782293976713160`的账户,我们可以通过命令行工具`account info`获取当前用户的信息。
设置命令行工具`config.yml，切换到keyId为`6667782293976713160`的账户。
设置完成后，再次调用合约。
```text
>callContract @18NewRecord {"Student": "tini", "Grade": 1, "Class": 3, "Mathematics": 69, "Physics": 89, "Literature": 98}

{
    "block_id": 1436,
    "hash": "93327dafb7bae9f9f66718eb87020a7bca4c00060f4bd0a243b49eea304c52e6",
    "penalty": 0,
    "err": ""
}
```
调用完成,通过`getList @18grade_info`查询数据表，结果符合预期。

希望本文能帮助您更多地了解IBAX网络如何工作以及如何编写清晰安全的`Needle`代码。


## 使用命令行工具部署应用 {#deploy-application-using-command-line-tools}
在本教程中，您将学习如何：
- 1.[导出应用](#export-application)
- 2.[导入应用](#import-application)

在开始本教程之前，你需要有一个自己的应用并且知道生态与应用的概念，你可以参考[入门指南](#getting-started-guide) 。
我们将通过[命令行工具](https://github.com/IBAX-io/ibax-cli) 在IBAX区块链上导入应用、导出应用。


### 导出应用 {#export-application}
调用`account info`可以查询当前的账户信息,这里登录的生态id为`9`,调用`getList`命令可以查询当前生态有哪些应用。
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
可以看到当前生态有6个应用，我们使用`export`命令导出`id`为`36`的应用。
```shell
>export 36 -f=./data.json

{
    "name": "./data.json",
    "type": "application/json",
    "value": ""
}
```
这里的-f参数，将要导出的应用保存到当前目录`data.json`文件中，
如果没有-f参数，则将在命令终端输出应用数据。


`export`命令封装了导出应用的步骤，你可以使用以上命令导出应用，或使用以下步骤，具体步骤如下：
调用合约`@1ExportNewApp`导出一个新的应用，会在`1_buffer_data`表生成一条导出应用的记录。
```shell
>callContract @1ExportNewApp {"ApplicationId": 36}
```

调用合约`@1Export`导出应用,在`1_buffer_data`表中查找所选应用程序，并将所有应用程序资源导出到生成的 json 字符串中。
生成的 json 字符串将写入当前生态系统的`1_binaries`表。
```shell
>callContract @1Export
```

通过`getList`命令查询`1_binaries`表中的数据。
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
得到二进制文件id和hash。
调用`binaryVerify`命令导出二进制文件。
```shell
>binaryVerify 14 8542cb57b77e0ae2c...92c3e05dbbe35ab646789be5b8ba8 -f=./data.json

{
    "name": "./data.json",     
    "type": "application/json",
    "value": ""
}
```

### 导入应用 {#import-application}
使用`import`命令导入应用，`-f`参数为指定导入的应用文件。
```shell
$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit

>import -f ./data.json
```

其中`import`命令封装了导入应用的步骤，你可以使用以上命令导入应用。

或使用以下步骤，为方便学习与研究，具体步骤如下：
- 第1步
调用合约`@1ImportUpload`导入一个新的应用，会在`1_buffer_data`表生成一条导出应用的记录。
`@1ImportUpload`该合约参数`Data`为`file`[类型](../topics/vm.md#types) ,
包含关键字`Name`文件名(string),`MimeType`文件类型(string),`Body`([]byte)文件内容。
你需要将应用文件数据进行base64编码后传入`Body`中，可以使用`base64Encode`命令进行base64编码。
```shell
>base64Encode -f=./data.json

Encode:ewoJIm5hbWUiOiAid...CQkJIlR5cGUiOiAiY29udHJhY3RzIiwKCQkJIk5hbWUiOiAiSGVsbG9Xb3JsZCIsCgkJCSJWYWx1ZSI6...

>callContract @1ImportUpload {"Data": {"Name": "filename", "MimeType": "mimeType", "Body": "ewoJIm5hbWUiOiAid...CQkJIlR5cGUiOiAiY29udHJhY3RzIiwKCQkJIk5hbWUiOiAiSGVsbG9Xb3JsZCIsCgkJCSJWYWx1ZSI6..."}}
```

- 第2步
调用完成后，使用`getList`命令查询`1_buffer_data`表中的数据。
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

- 第3步
将value.data->Data中的数据组装成一维数组，[a,b,c,d],
然后创建一个合约参数文件`importParams.json`,内容如下：
```json
{"Data":"[a,b,c,d]"}
```

-第4步 调用合约`@1Import`导入应用数据。
```shell
>callContract @1Import -f=./importParams.json
```


## 使用命令行工具生态配置 {#ecological-configuration-using-command-line-tool}
在本教程中，您将学习如何：
- 1.[申请加入生态](#apply-to-join-the-ecology)
- 2.[添加生态成员](#add-ecological-members)
- 3.[角色管理](#role-management)
- 4.[生态代币发行](#issuance-of-token)
- 5.[生态代扣](#eco-deduction)
- 6.[DAO治理生态](#dao-governance-ecology)

在开始本教程之前，你需要有一个自己的应用并且知道生态与应用的概念，你可以参考[入门指南](#getting-started-guide) 。
我们将通过[命令行工具](https://github.com/IBAX-io/ibax-cli) 在IBAX区块链上进行生态配置。

### 申请加入生态 {#apply-to-join-the-ecology}
我们可以调用`@1MembershipRequest`合约申请加入生态。
如下例子：
```shell
>callContract @1MembershipRequest {"EcosystemId": 19}
```
申请加入生态id为`19`的生态，`@1MembershipRequest`合约对调用生态做了限制，只有在基础生态才可调用，
当申请成功后，目标生态管理者会收到一条申请，只有申请被生态管理者批复后才算是加入了目标生态,
当然如果目标生态时公开的，你可以直接加入目标生态。

### 添加生态成员 {#add-ecological-members}
当生态刚创建时,生态成员只有生态创建者,当你需要邀请其他成员加入时,你需要知道被邀请人的公钥,然后调用合约`@1MembershipAdd`添加成员。
```shell
>callContract @1MembershipAdd {"Keys": "04f2c1780ca0aa0f343d0e541c77811...3b0d5bf3a9903253aad6e78c966b5f91ffb32703884020"}
```

如果生态是公开的允许任何人加入，你可以设置生态参数`free_membership` = 1,默认是不公开的，
设置完成后，无需通过审批即可加入你的生态。
```shell
>callContract @1NewParameter {"Name": "free_membership", "Value": "1", "Conditions": "ContractConditions(\"MainCondition\")"}
```
如果你没有设置参数`free_membership`,其他成员申请加入你的生态时，你将会收到一条申请通知，可通过``查看所有的角色通知。


调用`@1MembershipDecide`合约批复申请,合约参数`NotificId`为通知id，'Accept'为决议标识，决议标识`1`为通过。
```shell
>callContract @1MembershipDecide {"NotificId": 6, "Accept": 1}
```

### 冻结账户 {#freezing-of-accounts}
调用`@1DeleteMember`合约冻结账户，注意此操作无法还原。
```shell
>callContract @1DeleteMember {"MemberAccount": "1539-2715-xxxx-1679-5385"}
```

### 角色管理 {#role-management}
- [新建角色](#new-role-creation)
- [添加角色成员](#adding-role-members)
- [删除角色成员](#delete-role-members)
- [修改角色管理者](#modify-role-manager)
- [删除角色](#delete-role)

#### 新建角色 {#new-role-creation}
调用`@1RolesCreate`合约新建角色，角色名`student`,类型`2`(1-可分配 2-通过投票选任类型 3-System)。
```shell
>callContract @1RolesCreate {"Name": "student", "Type": 2}
{
    "block_id": 1685,
    "hash": "5321f2231a...d0d80158b62766395f14d0ff7",
    "penalty": 0,
    "err": "21"
}
```
返回结果里包含角色id `21`。

#### 添加角色成员 {#adding-role-members}
有两种方法，第一种方法，生态成员发起申请，调用合约`@1RolesRequest`申请添加为该角色成员,其中`Rid`为角色id。
```shell
>callContract @1RolesRequest {"Rid": 21}
```

第二种方法，角色管理者分配角色成员,角色管理者调用合约`@1RolesAssign`添加该角色的成员。
```shell
>callContract @1RolesAssign {"MemberAccount": "0666-7782-xxxx-7671-3160", "Rid": 21}
```

#### 删除角色成员 {#delete-role-members}
首先我们查看某个角色有哪些成员,我们可以通过getList查询,如下所示：
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
其中`where`条件`ecosystem`指定生态，`role->id`指定角色id，`deleted`: 0指定未删除。
我们可以看到查询到了3条记录,假如我们要移除成员为`1273-2644-xxxx-5846-6598`的角色权限，即`id`为`21`的角色。
管理员可以调用合约`@1RolesUnassign`删除角色成员,如下所示：
```shell
>callContract @1RolesUnassign {"RowId": 21}
```

#### 修改角色管理者 {#modify-role-manager}
我们查看一下当前生态的角色。
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
其中`roles_access`为当前角色的管理角色，它是一个数组，可以有多个。
我们给`teacher`这个角色添加管理角色，调用`@1RolesAccessManager`合约,其中合约参数`Action` 管理操作符(`clean`清空,`remove`删除,`add`添加),`Rid`要管理的角色ID,`ManagerRid`该 Rid 角色的管理者。
```shell
>callContract @1RolesAccessManager {"Action": "add", "Rid": 20, "ManagerRid": 13}

{
    "block_id": 1745,
    "hash": "e2eb8ff0dc309ec7652db...bbbe58bca4ca574804e46c2f63653eb73104",
    "penalty": 0,
    "err": ""
}
```

#### 删除角色 {#delete-role}
我们可以调用`@1RolesDelete`合约删除角色，其中合约参数`Rid`要管理的角色ID，`Ops`为操作符(`D`为删除 `R`为恢复)
```shell
>callContract @1RolesDelete {"Rid": 24, "Ops": "D"}

{
    "block_id": 1785,
    "hash": "1ebf99a04f504fc3d2...4ecfbdfc419bf3dbf39df0013dca913f844",
    "penalty": 0,
    "err": ""
}
```


### 生态代币发行 {#issuance-of-token}
- [创建生态](#create-ecology)
- [安装基础应用](#installing-basic-applications)
- [生态发币](#token-issuance)

#### 创建生态 {#create-ecology}
创建一个生态, 调用`@1NewEcosystem`合约。
```shell
>callContract @1NewEcosystem {"Name": "Test Ecosystem"}
{
    "block_id": 1787,
    "hash": "384f35ef93243c9dd4f53b9298873b356b25b31cf7c6a6be7600ee7694d77006",
    "penalty": 0,
    "err": "21"
}
```
然后我们修改命令行工具配置，登录到新创建的这个生态ecosystem: "21"。

#### 安装基础应用 {#installing-basic-applications}

调用合约安装基础应用,如下所示：
```shell
1  >callContract @1PlatformAppsInstall
2  >callContract @1RolesInstall
3  >callContract @1AppInstall {"ApplicationId": 5}
4  >callContract @1AppInstall {"ApplicationId": 6}
```
第1行，安装平台应用。
第2行，安装默认角色。
第3-4行，安装生态配置与代币发行应用，其中应用id `5,6`可通过getList查询，如下：
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

#### 生态发币 {#token-issuance}
因为是新建的生态，需要进行代币发行设置,调用`@1TeSettings`合约指定可发行代币的角色。
```shell
>callContract @1TeSettings {"RoleDeveloper": 30}
```
其中`RoleDeveloper`为当前生态角色id，可通过`@1roles`数据表获取。


**代币发行** 调用`@1NewToken`合约发行代币。
```shell
>callContract @1NewToken {"Symbol": "TEST", "Name": "TEST Coin", "Amount": "10000000000000000" ,"Digits": "12"}
```
其中合约参数`Symbol`为代币符号，`Name`为代币名称，`Amount`为总额，`Digits`为精度。

**增发代币**
```shell
>callContract @1TeEmission {"Amount": 1000000000000}
```

**销毁代币**
```shell
>callContract @1TeBurn {"Amount": 1000000000000}
```

默认增发代币和销毁代币是允许的，你可以通过`@1TeChange`设置关闭，其中`TypeChange`为类型(`emission`增发,`withdraw`销毁),
`Value`为开关状态(`1`开启,`2`关闭)，例如：
**关闭增发** 注意：关闭后无法开启 。
```shell
>callContract @1TeChange {"TypeChange": "emission", "Value": 2}
```

**关闭销毁**,如果你想再次开启销毁功能，将`Value`置为`1`即可。
```shell
>callContract @1TeChange {"TypeChange": "withdraw", "Value": 2}
```

### 生态代扣 {#eco-deduction}
在设置生态代扣之前，你需要了解IBAX收费模型，可在 [白皮书](https://github.com/IBAX-io/whitepaper) 中找到.

我们首先设置生态钱包地址,调用`@1EditParameter`合约，修改生态参数：
```shell
>callContract @1EditParameter {"Id": 334, "Value": "1273-2644-xxxx-5846-6598"}
```
其中`Id`为生态钱包`ecosystem_wallet`参数id，可通过如下方式查询：
```shell
>getList @1parameters -w={"ecosystem": 22, "name": "ecosystem_wallet"}
```
`Value`值为将要绑定的生态钱包地址，合约产生的gas费，由该地址付款。该地址必须在当前生态有足够的代币，并且需要被绑定地址同意后才会修改成功。


调用`@1EcoFeeModeManage`合约设置多生态扣费,如下：
```shell
>callContract @1EcoFeeModeManage {"FollowFuel": 0.01, "CombustionFlag": 1, "VmCostFlag": 2, "VmCostConversionRate": 100, "StorageConversionRate": 100, "StorageFlag": 2, "ExpediteFlag": 1}
```
其中合约参数字段定义如下：
- `FollowFuel`        参数为跟随生态1费率的倍数。
- `CombustionFlag`	是否开启生态交易gas费燃烧，1-否，2-是。
- `CombustionPercent`	燃烧百分比，仅开启gas费燃烧生效,取值1到100，未开启时为0。
- `VmCostFlag`	    虚拟机费用标识，设置直付或代付，1-直付，2-代付。
- `StorageFlag`	    存储费用标识，设置直付或代付，1-直付，2-代付。
- `ExpediteFlag`	    加急费用标识，设置直付或代付，1-直付，2-代付。
- `VmCostConversionRate`	   虚拟机费用转换率，小数位2位，仅代付生效，大于零。
- `StorageConversionRate`	   存储费用转换率，小数位2位，仅代付生效，大于零。

如果你使用了上述设置,所有用户在该生态内调用合约所产生的交易费用，由当前生态设置的生态钱包统一支付。
所有用户只需要支付在该生态内所产生的gas费用.当然你可以根据实际需要，调整对应费用参数。


### DAO治理生态 {#dao-governance-ecology}
在修改为DAO治理生态之前，你需要确保当前生态已经发行代币，修改为DAO治理生态后，生态所有的提案都将由治理委员会成员投票决定，
不再单独由生态开发者管理， DAO治理委员会成员由生态持币量前50名代表当选。


调用`@1EditControlMode`合约，将生态治理模式改为DAO治理模式。
```shell
>callContract @1EditControlMode {"Value": 2}
```
其中`Value`参数 `1`表示创建者模型 `2`表示DAO治理模型。

我们可以试着创建一个应用：
```shell
>callContract @1NewApplication {"Name": "testApp", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
```
这个时候会生成一个DAO治理提案，经过DAO治理委员会投票通过后才会创建应用.有效提案需75%的投票数中68%的通过率.
DAO治理范围包括：
1、增删改应用、合约、页面、代码片段、选项卡、菜单、应用参数、数据表及字段。
2、修改多语言。
3、DAO和创建者模型开关。
4、编辑生态参数。
5、角色，分配移除角色成员。
6、增发销毁币种。
7、修改平台参数。
8、修改生态信息。
9、修改延迟合约。
10、修改投票模版。


## 使用应用打包工具部署应用 {#deploy-applications-using-application-packaging-tool}
在开始本教程之前，你需要下载[IBAX应用打包工具](https://github.com/IBAX-io/app-tool) ,我们需要使用这个工具打包IBAX应用程序。

我们需要按照以下目录结构存放应用程序文件：
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
如下所示：
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
其中`app_params`目录存放应用参数文件，命名使用参数名+文件格式`.csv`，文件内容为参数值.
`contracts`目录存放合约，`.sim`文件格式，文件内容为合约源码.
`tables`目录存放应用数据表结构，`json`文件格式，如下所示：
```json
[
  { "name": "account", "conditions": "{\"read\": \"true\", \"update\": \"ContractConditions(\"MainCondition\")\"}", "type": "varchar" },
  { "name": "balance_amount", "conditions": "true", "type": "money" },
  { "name": "stake_amount", "conditions": "true", "type": "money" },
  { "name": "surplus", "conditions": "true", "type": "number" },
  { "name": "total_amount", "conditions": "true", "type": "money" }
]
```
`name`为数据表字段名称，`conditions`为数据表字段权限， `type`为字段类型。

第1步，我们生成一个config.json文件，将它保存到airdrop目录，文件内容如下所示：
```text
{
    "name": "Airdrop",
    "conditions": "ContractConditions(\"@1MainCondition\")"
}
```
其中`name`为此应用的名称，`conditions`: 为修改该应用的权限，然后将它保存到airdrop目录.

第2步,打包应用，通过以下命令会在当前目录生成应用`airdrop.json`,如果你修改了合约或应用参数，需要重新打包应用.
```shell
$ ./app-tool airdrop/
```
我们可以通过[命令行工具](https://github.com/IBAX-io/ibax-cli) 导入应用,如下所示：
使用`import`命令导入应用，`-f`参数为指定导入的应用文件。
```shell
$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit

>import -f ./airdrop.json
```

当然如果你有一个应用，也可以通过以下命令生成完整的目录结构。
```shell
$ app-tool.exe airdrop.json
```

