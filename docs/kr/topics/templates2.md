# 템플릿 언어 {#template-language}

<!-- TOC -->

- [페이지 구성](#page-construction)
    - [템플릿 엔진](#template-engine)
    - [페이지 생성](#create-pages)
        - [시각적인 페이지 디자이너](#visual-page-designer)
        - [적용 가능한 스타일](#applicable-styles)
        - [페이지 모듈](#page-module)
        - [다국어 자원 편집기](#language-resource-editor)
- [Logicor 템플릿 언어](#logicor-template-language)
    - [Logicor 개요](#Logicor-overview)
        - [페이지에 매개변수를 전달하기 위해 PageParams를 사용하세요](#use-pageparams-to-pass-parameters-to-pages)
        - [계약 호출](#calling-contracts)
- [Logicor 함수 분류](#logicor-function-classification)
    - [변수 조작](#operations-on-variables)
    - [탐색 조작](#navigational-operations)
    - [데이터 조작](#data-manipulation)
    - [데이터 표시](#data-presentation)
    - [데이터 수신](#accepting-of-data)
    - [데이터 형식화 요소](#data-formatting-elements)
    - [폼 요소](#form-elements)
    - [코드 블록 조작](#operations-on-code-blocks)
- [Logicor 함수 참조](#logicor-function-references)
    - [Address](#address)
    - [AddressToId](#addresstoid)
    - [AddToolButton](#addtoolbutton)
    - [And](#and)
    - [AppParam](#appparam)
    - [ArrayToSource](#arraytosource)
    - [Binary](#binary)
    - [Button](#button)
    - [Calculate](#calculate)
    - [Chart](#chart)
    - [CmpTime](#cmptime)
    - [Code](#code)
    - [CodeAsIs](#codeasis)
    - [Data](#data)
    - [Custom](#custom)
    - [DateTime](#datetime)
    - [DBFind](#dbfind)
    - [Div](#div)
    - [EcosysParam](#ecosysparam)
    - [Em](#em)
    - [ForList](#forlist)
    - [Form](#form)
    - [GetColumnType](#getcolumntype)
    - [GetHistory](#gethistory)
    - [GetVar](#getvar)
    - [Hint](#hint)
    - [If](#if)
    - [Image](#image)
    - [ImageInput](#imageinput)
    - [Include](#include)
    - [Input](#input)
    - [InputErr](#inputerr)
    - [InputMap](#inputmap)
    - [JsonToSource](#jsontosource)
    - [Label](#label)
    - [LangRes](#langres)
    - [LinkPage](#linkpage)
    - [Map](#map)
    - [MenuGroup](#menugroup)
    - [MenuItem](#menuitem)
    - [Money](#money)
    - [Or](#or)
    - [P](#p)
    - [QRcode](#qrcode)
    - [RadioGroup](#radiogroup)
    - [Range](#range)
    - [Select](#select)
    - [SetTitle](#settitle)
    - [SetVar](#setvar)
    - [Span](#span)
    - [Strong](#strong)
    - [SysParam](#sysparam)
    - [Table](#table)
    - [TransactionInfo](#transactioninfo)
    - [VarAsIs](#varasis)
- [모바일 장치용 애플리케이션 스타일](#app-styles-for-mobile-devices)
    - [레이아웃](#layout)
        - [타이틀](#title)
        - [강조 클래스 이름](#strong-class-names)
        - [색상](#color)
    - [그리드](#grid)
    - [패널](#panel)
    - [폼](#form-app)
    - [버튼](#button-app)
    - [아이콘](#icon)

<!-- /TOC -->

## 페이지 구성 {#page-construction}

Weaver의 통합 개발 환경 (IDE)은 JavaScript 라이브러리 인 React를 사용하여 만들어졌습니다. 페이지 편집기와 시각적 페이지 디자이너가 있습니다. 페이지는 응용 프로그램의 기본 구성 요소로서 테이블에서 데이터를 검색하고 표시하고 사용자 입력 데이터를 받는 양식을 만들고 데이터를 계약에 전달하며 응용 프로그램 페이지 간에 탐색하는 데 사용됩니다. 계약과 마찬가지로 페이지는 블록체인에 저장되어 소프트웨어 클라이언트에서 로드될 때 위변조 방지가 가능합니다.

### 템플릿 엔진 {#template-engine}

페이지 요소 (페이지 및 메뉴)는 Weaver의 페이지 편집기에서 템플릿 언어를 사용하여 검증 노드의 템플릿 엔진에서 개발자에 의해 구성됩니다. 모든 페이지는 IBAX의 개발 팀에서 개발한 Logicor 언어를 사용하여 구성됩니다. 네트워크의 노드로부터 페이지를 요청하기 위해 content/... API 명령을 사용합니다. 이 유형의 요청에 대한 템플릿 엔진이 응답으로 보내는 것은 HTML 페이지가 아닌 템플릿 구조에 따라 트리를 형성하는 HTML 태그로 구성된 JSON 코드입니다. 템플릿 엔진을 테스트하려면 [content](../reference/api2.md#content) API 명령을 참조하십시오.

### 페이지 생성 {#create-pages}

페이지 편집기를 사용하여 페이지를 생성하고 편집할 수 있습니다. 이 편집기는 Weaver의 관리 도구의 **페이지** 섹션에서 찾을 수 있습니다. 이 편집기는 다음을 제공합니다:

* 페이지 코드 작성, Logicor 템플릿 언어의 키워드 강조 표시;
* 페이지에서 메뉴 선택 및 표시;
* 메뉴 페이지 편집;
* 페이지 변경 권한 구성, ContractConditions 함수에서 권한과 함께 계약 이름을 지정하거나 변경 조건에서 직접 액세스 권한을 지정함으로써;
* 시각적 페이지 디자이너 시작;
* 페이지 미리보기.

#### 시각적 페이지 디자이너 {#visual-page-designer}

시각적 페이지 디자이너는 Logicor 언어의 인터페이스 코드를 사용하지 않고 페이지 레이아웃을 생성하는 데 사용할 수 있습니다. 이를 통해 드래그 앤 드롭으로 양식 요소와 텍스트의 위치를 설정하고 페이지 블록의 크기를 구성할 수 있습니다. 이는 제목, 양식 및 정보 패널이 있는 표준 데이터 모델을 표시하는 데 사용할 수 있는 미리 준비된 블록 세트를 제공합니다. 시각적 페이지 디자이너에서 페이지를 생성한 후, 페이지 편집기에서 데이터 수신 및 조건부 구조를 위한 프로그램 로직을 작성할 수 있습니다. 앞으로 추가 기능이 있는 시각적 페이지 디자이너를 만들 계획입니다.


#### 적용 가능한 스타일 {#applicable-styles}

기본적으로 페이지는 Angular의 Bootstrap Angle 스타일로 제공됩니다. 사용자는 필요에 따라 자체 스타일을 생성할 수 있습니다. 스타일은 생태계 매개변수 테이블의 스타일시트 매개변수에 저장됩니다.

#### 페이지 모듈 {#page-module}

여러 페이지에서 코드 조각을 사용하려면 페이지 모듈을 만들고 페이지 코드에 삽입할 수 있습니다. Weaver의 **모듈 블록**에서 이러한 페이지 모듈을 만들고 편집할 수 있습니다. 페이지와 마찬가지로 편집 권한을 정의할 수 있습니다.

#### 언어 리소스 편집기 {#language-resource-editor}

Weaver는 Logicor 템플릿 언어의 **LangRes** 함수를 사용하여 페이지 로컬라이제이션을 위한 메커니즘을 포함하고 있습니다. 이 함수를 사용하여 페이지의 언어 리소스 태그를 사용자가 소프트웨어 클라이언트나 브라우저에서 선택한 언어에 해당하는 텍스트로 대체할 수 있습니다. **LangRes** 함수 대신에 짧은 구문인 **$lable$**을 사용할 수도 있습니다. 계약에 의해 시작된 팝업의 메시지 번역은 Needle의 **LangRes** 함수에 의해 수행됩니다.

Weaver의 언어 리소스 섹션에서 언어 리소스를 생성하고 편집할 수 있습니다. 언어 리소스는 레이블 이름과 해당 이름의 번역 및 해당 언어 식별자 (EN, ZH, JP 등)로 구성됩니다.

언어 리소스 추가 및 변경에 대한 권한은 다른 테이블과 동일한 방식으로 정의할 수 있습니다.

## Logicor 템플릿 언어 {#logicor-template-language}

Logicor 함수는 다음과 같은 작업을 제공합니다:

* 데이터베이스에서 값 검색: ```DBFind```, 데이터베이스에서 검색된 데이터를 테이블과 차트로 표시;
* 변수 값을 할당하고 표시하는 데이터 작업: ```SetVar, GetVar, Data```;
* 날짜/시간 값을 표시하고 비교하는 작업: ```DateTime, Now, CmpTime```;
* 다양한 사용자 데이터 입력 필드를 사용하여 양식 생성: ```Form, ImageInput, Input, RadioGroup, Select```;
* 양식 필드의 데이터를 확인하여 오류 메시지 표시: ```Validate, InputErr```;
* 네비게이션 요소 표시: ```AddToolButton, LinkPage, Button```;
* 계약 호출: ```Button```;
* HTML 페이지 레이아웃 요소 생성, 다양한 태그 및 특정 CSS 클래스 선택: ```Div, P, Span``` 등;
* 이미지를 페이지에 포함하고 로딩 및 언로딩: ```Image, ImageInput```;
* 페이지 레이아웃 조각의 조건 표시: ```If, ElseIf, Else```;
* 다단계 메뉴 생성;
* 페이지 로컬라이제이션.


### Logicor 개요 {#logicor-overview}

Logicor 페이지 템플릿 언어는 함수형 언어로, 함수 호출 함수 `FuncName(parameters)`를 사용할 수 있으며 함수를 서로 중첩시킬 수 있습니다. 따옴표 없이 매개변수를 지정할 수 있으며, 불필요한 매개변수를 삭제할 수도 있습니다.

```text
Text FuncName(parameter number 1, parameter number 2) another text.
FuncName(parameter 1,,,parameter 4)
```

만약 매개변수에 쉼표가 포함되어 있다면, 따옴표(단일 따옴표나 이중 따옴표)로 감싸야 합니다. 매개변수가 하나만 있는 함수라면 쉼표를 따옴표 없이 사용할 수 있습니다. 또한, 매개변수에 짝이 맞지 않는 오른쪽 괄호가 있다면 따옴표를 사용해야 합니다.

```text
FuncName("parameter number 1, the second part of first paremeter")
FuncName(`parameter number 1, the second part of first paremeter`)
```

만약 인수를 따옴표 안에 넣지만 인수 자체에 따옴표가 포함되어 있다면, 텍스트에서 다른 종류의 따옴표나 여러 개의 따옴표를 사용할 수 있습니다.

```text
FuncName("parameter number 1, ""the second part of first"" paremeter")
FuncName(`parameter number 1, "the second part of first" paremeter`)
```

함수 정의에서 각 매개변수는 특정한 이름을 가지고 있습니다. 함수를 호출하고 매개변수를 지정할 때는 선언된 순서대로 호출하거나 매개변수의 이름에 따라 임의의 순서로 지정할 수 있습니다: `Parameter_name: Parameter_value`. 이 방법을 사용하면 현재 템플릿과의 호환성을 깨지 않고 새로운 함수 매개변수를 안전하게 추가할 수 있습니다.

```text
FuncName(myclass, This is value, Div(divclass, This is paragraph.))
FuncName(Body: Div(divclass, This is paragraph.))
FuncName(myclass, Body: Div(divclass, This is paragraph.))
FuncName(Value: This is value, Body: 
     Div(divclass, This is paragraph.)
)
FuncName(myclass, Value without Body)
```

함수는 텍스트를 반환하거나 HTML 요소 (예: `Input`)를 생성하거나 중첩된 HTML 요소를 가진 HTML 요소 ( `Div, P, Span`)를 생성할 수 있습니다. 후자의 경우 중첩 요소를 정의하기 위해 미리 정의된 이름 **Body**를 가진 매개변수를 사용합니다. 예를 들어, 다른 div 안에 두 개의 div를 중첩하는 경우 다음과 같이 작성할 수 있습니다:

```text
Div(Body:
   Div(class1, This is the first div.)
   Div(class2, This is the second div.)
)
```

`FuncName(...){...}`로 표시하여 **Body** 매개변수에 설명된 중첩 요소를 정의할 수 있습니다. 중첩 요소는 중괄호로 지정됩니다.

```text
Div(){
   Div(class1){
      P(This is the first div.)
      Div(class2){
          Span(This is the second div.)
      }
   }
}
```

만약 동일한 함수를 연속해서 여러 번 지정해야 한다면, 함수 이름을 매번 쓰는 대신 점 `.`을 사용할 수 있습니다. 예를 들어, 다음은 동일한 것입니다:

```text
Span(Item 1)Span(Item 2)Span(Item 3)
Span(Item 1).(Item 2).(Item 3)
```

이 언어에서는 **SetVar** 함수를 사용하여 변수를 할당할 수 있으며, 변수 값을 참조할 때 `#name#`을 사용합니다.

```text
SetVar(name, My Name)
Span(Your name: #name#)
```

생태계의 언어 자원을 인용하려면 `$langres$`를 사용할 수 있습니다. 여기서 *langres*는 언어 원본의 이름입니다.

```text
Span($yourname$: #name#)
```

다음 변수들은 사전 정의되어 있습니다:

* `#key_id#` - 현재 사용자의 계정 주소;
* `#ecosystem_id#` - 현재 생태계 ID;
* `#guest_key#` - 게스트 계정의 주소;
* `#isMobile#` - Weaver가 모바일 장치에서 실행 중인 경우 1.

#### 페이지에 매개변수를 전달하기 위해 PageParams를 사용하세요 {#use-pageparams-to-pass-parameters-to-pages}

많은 함수가 PageParams 매개변수를 지원하며, 이는 새로운 페이지로 리디렉션할 때 매개변수를 전달하는 데 사용됩니다. 예를 들어: PageParams: `"param1=value1,param2=value2"`. 매개변수 값은 단순한 문자열이거나 참조 값이 있는 변수일 수 있습니다. 페이지에 매개변수를 전달할 때, 매개변수 이름과 동일한 변수가 생성되며, 예: `#param1#` 및 `#param2#`.

* `PageParams: "hello=world"` - 새 페이지는 hello 매개변수를 값으로 world를 받습니다.
* `PageParams: "hello=#world#"` - 새 페이지는 hello 매개변수를 world 변수의 값으로 받습니다.

#### Val (#val)
    또한, **Val** 함수는 리디렉션에서 지정된 양식에서 데이터를 가져올 수 있습니다.

-   `PageParams: "hello=Val(world)"` - 새 페이지는 hello 매개변수를 world 양식 요소의 값으로 받습니다.

#### 계약 호출 {#calling-contracts}

Logicor는 **Button** 함수를 사용하여 계약 호출을 구현합니다. 이 이벤트를 시작하면 사용자가 페이지 양식 필드에 입력한 데이터가 계약에 전달됩니다. 양식 필드의 이름이 호출되는 계약의 데이터 섹션의 변수 이름과 일치하는 경우 데이터가 자동으로 전송됩니다. **Button** 함수는 계약 실행을 사용자 인증을 위해 모달 창을 열고, 계약이 성공적으로 실행된 후 지정된 페이지로의 리디렉션 작업을 시작하고 일부 매개변수를 해당 페이지로 전달할 수 있도록 합니다.

## Logicor 기능의 분류 {#logicor-function-classification}

### 변수 조작 {#operations-on-variables}

|        |        |         |
| ------ | ------ | ------- |
| [GetVar](#getvar) | [SetVar](#setvar) | [VarAsIs](#varasis) |

### 내비게이션 조작 {#navigational-operations} 

|               |        |          |
| ------------- | ------ | -------- |
| [AddToolButton](#addtoolbutton) | [Button](#button) | [LinkPage](#linkpage) |

### 데이터 조작 {#data-manipulation}

|           |          |       |
| --------- | -------- | ----- |
| [Calculate](#calculate) | [DateTime](#datetime) | [Money](#money) |
| [CmpTime](#cmptime)   |          |       |

### 데이터를 표시합니다. {#data-presentation}

|          |           |          |
| -------- | --------- | -------- |
| [Code](#code)     | [Hint](#hint)      | [MenuItem](#menuitem) |
| [CodeAsIs](#codeasis) | [Image](#image)     | [QRcode](#qrcode)   |
| [Chart](#chart)    | [MenuGroup](#menugroup) | [Table](#table)    |
| [ForList](#forlist)  |           |          |

### 데이터를 수신합니다. {#accepting-of-data}

|             |               |                 |
| ----------- | ------------- | --------------- |
| [Address](#address)     | [EcosysParam](#ecosysparam)   | [LangRes](#langres)         |
| [AddressToId](#addresstoid) | [GetHistory](#gethistory)    | [Range](#range)           |
| [AppParam](#appparam)    | [GetColumnType](#getcolumntype) | [SysParam](#sysparam)        |
| [Data](#data)        | [JsonToSource](#jsontosource)  | [Binary](#binary)          |
| [DBFind](#dbfind)      | [ArrayToSource](#arraytosource) | [TransactionInfo](#transactioninfo) |

### 데이터 형식화 요소 {#data-formatting-elements}

|      |          |        |
| ---- | -------- | ------ |
| [Div](#div)  | [SetTitle](#settitle) | [Span](#span)   |
| [Em](#em)   | [Label](#label)    | [Strong](#strong) |
| [P](#p)    |          |        |

### 양식 요소 {#form-elements}

|            |            |          |
| ---------- | ---------- | -------- |
| [Form](#form)       | [InputErr](#inputerr)   | [InputMap](#inputmap) |
| [ImageInput](#imageinput) | [RadioGroup](#radiogroup) | [Map](#map)      |
| [Input](#input)      | [Select](#select)     |          |

### 코드 조각 조작 {#operations-on-code-blocks}

|      |      |         |
| ---- | ---- | ------- |
| [If](#if)   | [Or](#or)   | [Include](#include) |
| [And](#and)  |      |         |



## Logicor 함수 참조 {#logicor-function-references}

### Address {#address}

이 함수는 특정 계정 주소의 지갑 주소 `xxxx-xxxx-...-xxxx`를 반환합니다. 주소가 지정되지 않은 경우, 현재 사용자의 계정 주소가 매개변수로 사용됩니다.

#### 구문

```
Address(account)

```
> Address
  * `account`
  
    Account address.

#### 예

```
Span(Your wallet: Address(#account#))
```

### AddressToId {#addresstoid}

특정 지갑 주소 xxxx-xxxx-...-xxxx의 계정 주소를 반환합니다.

#### 구문

```
AddressToId(Wallet)
```

> AddressToId
  * `Wallet`
  
    XXXX-...-XXXX 형식의 지갑 주소입니다.

#### 예

```
AddressToId(#wallet#)
```

### AddToolButton {#addtoolbutton}

버튼 패널에 **addtoolbutton** 요소를 만듭니다.

#### 구문

```
AddToolButton(Title, Icon, Page, PageParams)
 [.Popup(Width, Header)]
```

> AddToolButton

   * `Title`
  
     버튼 제목.

   * `Icon`
  
     버튼 아이콘 스타일.

   * `Page`
  
     리디렉션되는 페이지의 이름입니다.

   * `PageParams`
  
     페이지에 전달된 매개변수입니다.


> Popup

  모달 창이 나타납니다.
  * `Header`

    창의 제목입니다.
  * `Width`

      창 너비의 백분율입니다.
      그 범위는 1에서 100까지입니다.

#### 예

```
AddToolButton(Title: $@1broadcast$, Page: @1notifications_broadcast, Icon: icon-plus).Popup(Header: $@1notifications_broadcast$, Width: "50")
```

### And {#and}

이 함수는 괄호 안에 쉼표로 구분된 모든 인수를 사용하여 **and** 논리 연산을 수행한 결과를 반환합니다. 하나의 인수가 빈 문자열, 0 또는 `false`인 경우 해당 인수 값은 `false`이고, 그 외의 경우에는 인수 값은 `true`입니다. 인수 값이 `true`인 경우 함수는 `1`을 반환하고, 그 외의 경우에는 `0`을 반환합니다.

#### 구문

```
And(parameters)
```

#### 예

```
If(And(#myval1#,#myval2#), Span(OK))
```

### AppParam {#appparam}

현재 생태계의 *app_params* 테이블에서 가져온 애플리케이션 매개변수 값을 출력합니다. 지정된 이름을 가진 언어 리소스가 있으면 해당 값이 자동으로 대체됩니다.

#### 구문
```
AppParam(App, Name, Index, Source)

```

> AppParam
  * `App`
  
    애플리케이션 ID.
  * `Name`

    매개변수 이름.

  * `Index`

    매개변수 값이 쉼표로 구분된 목록일 때 사용할 수 있습니다.
    매개변수 요소 색인은 1부터 시작합니다. 예를 들어 `type = full,light`인 경우 `AppParam(1, type, 2)`은 `light`를 반환합니다.
    Source 매개변수와 함께 사용할 수 없습니다.

  * `Source`

    매개변수 값이 쉼표로 구분된 목록일 때 사용할 수 있습니다.
    요소가 특정 매개변수의 값인 데이터 객체를 생성합니다. 이 개체는 [Table](#table) 및 [Select](#select) 기능의 데이터 소스로 사용할 수 있습니다.
    Index 매개변수와 함께 사용할 수 없습니다.

#### 예

```
AppParam(1, type, Source: mytype)
```

### ArrayToSource {#arraytosource}

**arraytosource** 요소를 생성하고 JSON 배열의 키-값 쌍으로 채웁니다. 생성된 데이터는 *Source* 요소에 저장되며, 이 요소는 나중에 소스 입력 함수(예: [Table](#Table))에서 사용할 수 있습니다.

#### 구문
```
ArrayToSource(Source, Data)

```

> ArrayToSource
  * `Source`
  
    데이터 소스 이름.

  * `Data`

    JSON 배열 또는 JSON 배열을 포함하는 변수 이름(`#name#`).

#### 예

```
ArrayToSource(src, #myjsonarr#)
ArrayToSource(dat, [1, 2, 3])
```

### Binary {#binary}

이진 테이블 *binaries*에 저장된 정적 파일의 링크를 반환합니다.

#### 구문
```
Binary(Name, AppID, MemberID)[.ById(ID)][.Ecosystem(ecosystem)]
```

> Binary
  * `Name`
  
    파일 이름.
  * `AppID`
  
    애플리케이션 ID.
  * `MemberID`

    계정 주소, 기본값은 0입니다.
  * `ID`

    정적 파일 ID.
  * `Ecosystem`

    생태계 ID. 지정되지 않으면 현재 생태계에서 이진 파일이 요청됩니다.


#### 예

```
Image(Src: Binary("my_image", 1))
Image(Src: Binary().ById(2))
Image(Src: Binary().ById(#id#).Ecosystem(#eco#))
```

### Button {#button}

**button** HTML 요소를 만듭니다. 이 요소는 계약을 호출하거나 페이지를 여는 버튼을 생성합니다.

#### 구문
```
Button(Body, Page, Class, Contract, Params, PageParams)
 [.CompositeContract(Contract, Data)]
 [.Alert(Text, ConfirmButton, CancelButton, Icon)]
 [.Popup(Width, Header)]
 [.Style(Style)]
 [.ErrorRedirect((ErrorID,PageName,PageParams)]
```

> Button
  * `Body`

    자식 텍스트 또는 엘리먼트입니다.

  * `Page`

    페이지 이름을 리디렉션합니다.

  * `Class`

    버튼 클래스입니다.

  * `Contract`

    호출 할 계약서의 이름입니다.

  * `Params`

    값 목록을 계약에 전달합니다. 일반적으로 계약 매개변수 값(`data` 부분)은 유사한 이름을 가진 HTML 요소(예: 입력 필드)의 `id`에서 가져옵니다. 요소 `id`가 계약 매개변수의 이름과 다른 경우 `contractField1=idname1, contractField2=idname2` 형식을 사용하여 값을 할당해야 합니다. 이 매개변수는 객체 `{contractField1: idname1, contractField2: idname2}`로 *attr*에 반환됩니다.

  * PageParams

    리디렉션 페이지에 전달되는 매개변수의 형식은 `pageField1=idname1, pageField2=idname2`입니다. 대상 페이지에서 `#pageField1` 및 `#pageField2` 변수로 지정된 값이 생성되고 할당됩니다. 추가 매개변수 전달 규칙은 [PageParams를 사용하여 페이지에 매개변수 전달](#pageparams)을 참조하십시오.

> CompositeContract

  버튼에 추가 계약을 추가하는 데 사용됩니다. CompositeContract는 여러 번 사용할 수 있습니다.

  * `Name`

    계약서의 이름입니다.

  * `Data`

    계약 매개 변수는 JSON 배열입니다.

> Alert

  메시지를 표시합니다.

  * `Text`

    메시지의 텍스트입니다.

  * `ConfirmButton`

    확인 버튼 제목입니다.

  * `CancelButton`

    취소 버튼 제목입니다.

  * `Icon`

    버튼 아이콘입니다.

> Popup

  모달 창을 출력합니다.

  * `Header`

    창 제목입니다.

  * `Width`

    창 너비의 백분율입니다.
    범위는 1에서 100입니다.

> Style

  지정된 CSS 스타일입니다.

  * `Style`

    CSS 스타일입니다.

> ErrorRedirect

  `contractfundef-Throw`{.interpreted-text role="ref"} 함수가 실행 중에 오류가 발생할 때, 지정된 리디렉션 페이지를 사용하도록 설정합니다. *ErrorRedirect* 호출은 여러 개 있을 수 있습니다. 따라서 *errredirect* 속성을 반환할 때, 속성의 키는 *ErrorID* 이고 값은 매개변수 목록입니다.

  * `ErrorID`

    오류 ID입니다.

  * `PageName`

    리디렉션 페이지의 이름입니다.

  * `PageParams`

    페이지에 전달 된 매개 변수입니다.

#### 예

```
Button(Submit, default_page, mybtn_class).Alert(Alert message)
Button(Contract: MyContract, Body:My Contract, Class: myclass, Params:"Name=myid,Id=i10,Value")
```

### Calculate {#calculate}

이 함수는 전달된 **Exp** 매개변수의 산술식 결과를 반환합니다. 다음 연산을 사용할 수 있습니다: `+, -, *, /` 그리고 괄호 `()`.

#### 구문
```
Calculate(Exp, Type, Prec)
```

> Calculate
 
  * `Exp` 

      숫자와 #name# 변수를 포함하는 산술식입니다.

  * `Type`

      결과 데이터 유형: int, float, money 입니다. 지정되지 않으면 소수점이 있는 숫자가 있으면 float이고 그렇지 않으면 int입니다.

  * `Prec` 

      **float** 和 **money** 类型指定小数点后的有效位数。



#### 예

```
Calculate( Exp: (342278783438+5000)\*(#val#-932780000), Type: money, Prec:18 )
Calculate(10000-(34+5)\*#val#)
Calculate("((10+#val#-45)\*3.0-10)/4.5 + #val#", Prec: 4)
```

### Chart {#chart}

HTML 차트를 생성하세요.

#### 구문
```
Chart(Type, Source, FieldLabel, FieldValue, Colors)
```

> Chart

  * `Type` (차트 유형)

    차트의 종류입니다.

  * `Source` (데이터 소스)

    [DBFind](#dbfind) 함수에서 얻은 데이터의 이름입니다.

  * `FieldLabel` (헤더 필드 이름)

    헤더 필드의 이름입니다.

  * `FieldValue` (값 필드 이름)

    값 필드의 이름입니다.

  * `Colors` (색상 목록)

    색상 목록입니다.

#### 예

```
Data(mysrc,"name,count"){
    John Silver,10
    "Mark, Smith",20
    "Unknown ""Person""",30
}
Chart(Type: "bar", Source: mysrc, FieldLabel: "name", FieldValue: "count", Colors: "red, green")
```

### CmpTime {#cmptime}

동일한 형식으로 된 두 시간 값을 비교합니다.
UNIXTIME, `YYYY-MM-DD HH:MM:SS` 및 `YYYYMMDD`와 같은 모든 시간 형식을 지원합니다.

#### 구문

```
CmpTime(Time1, Time2)
```


Return value

* `-1` - Time1 <Time2;
* `0` - Time1 = Time2;
* `1` - Time1> Time2.

#### 예

```
If(CmpTime(#time1#, #time2#)<0){...}
```

### Code {#code}

지정된 코드를 표시하는 **code** 요소를 생성합니다.

이 함수는 변수(예: `#name#`)를 해당 변수의 값으로 대체합니다.

#### 구문
```
Code(Text)
```

> Code

  * `Text`

    소스 코드.

#### 예

```
Code( P(This is the first line.
    Span(This is the second line.))
)
```

### CodeAsIs {#codeasis}

지정된 코드를 표시하는 **code** 요소를 생성합니다.

이 함수는 변수를 해당 값으로 대체하지 않습니다. 예를 들어, `#name#`은 그대로 표시됩니다.

#### 구문
```
CodeAsIs(Text)
```

> CodeAsIs

  * `Text`

    Source code.

#### 예

```
CodeAsIs( P(This is the #test1#.
    Span(This is the #test2#.))
)
```

### Data {#data}

**data** 요소를 생성하고 지정된 데이터로 채워서 *Source*에 넣습니다. 그런 다음 [Table](#Table) 및 다른 함수에서 *Source*를 데이터 입력으로 받을 수 있습니다. 열 이름 시퀀스는 *data* 항목 값 시퀀스와 대응합니다.

#### 구문
```
Data(Source,Columns,Data)
 [.Custom(Column){Body}]
```

> Data

  * `Source`

    데이터 소스의 이름입니다. 나중에 다른 함수에 데이터 소스로 전달될 이름을 지정할 수 있습니다.

  * `Columns`

    쉼표로 구분된 열 이름 목록입니다.

  * `Data`

    데이터 세트.

    한 줄에 하나의 레코드. 열 값은 쉼표로 구분해야 합니다. Data와 Columns는 동일한 순서로 설정해야 합니다.

    쉼표가 있는 값은 큰따옴표로 묶어야 합니다(`"example1, example2", 1, 2`). 인용된 값은 두 개의 큰따옴표로 묶어야 합니다(`"""example", "example2""", 1, 2`).

    

### Custom {#custom}

    데이터에 계산 열을 할당할 수 있습니다. 예를 들어 버튼 및 기타 페이지 레이아웃 요소에 대한 필드 템플릿을 지정할 수 있습니다. 이러한 필드 템플릿은 일반적으로 [Table](#table) 및 기타 데이터를 수신하는 기능에 할당됩니다.
    여러 계산된 열을 할당하려면 여러 사용자 정의 함수를 사용하십시오.

  * `Column`

    고유하고 필수인 열 이름입니다.

  * `Body`

    코드 블록. `#columnname#`을 사용하여 항목의 다른 열에서 값을 가져온 다음 해당 값을 코드 블록에서 사용할 수 있습니다.

#### 예

```
Data(mysrc,"id,name"){
    "1",John Silver
    2,"Mark, Smith"
    3,"Unknown ""Person"""
 }.Custom(link){Button(Body: View, Class: btn btn-link, Page: user, PageParams: "id=#id#"}
```

### DateTime {#datetime}

지정된 형식으로 시간과 날짜를 표시합니다.

#### 구문
```
DateTime(DateTime, Format)
```

> DateTime
  * `DateTime`

    유닉스 타임이나 표준 형식 `2006-01-02T15:04:05`으로 표시된 시간 및 날짜입니다.
  * `Format`

    형식 템플릿: 2자리 연도 `YY`, 4자리 연도 `YYYY`, 월 `MM`, 일 `DD`, 시간 `HH`, 분 `MM`, 초 `SS`, 예: `YY/MM/DD HH:MM`.
    지정되지 않은 경우 또는 누락된 경우 `YYYY-MM-DD HH:MI:SS`가 사용됩니다.

#### 예

```
DateTime(2017-11-07T17:51:08)
DateTime(#mytime#,HH:MI DD.MM.YYYY)
```

### DBFind {#dbfind}

**dbfind** 요소를 생성하고 *table* 테이블의 데이터로 채워서 *Source* 구조에 넣습니다. 이 *Source* 구조는 이후 [Table](#table) 및 다른 함수에서 *Source*의 입력 데이터로 사용될 수 있습니다.

#### 구문
```
DBFind(table, Source)
    [.Columns(columns)]
    [.Where(conditions)]
    [.WhereId(id)]
    [.Order(name)]
    [.Limit(limit)]
    [.Offset(offset)]
    [.Count(countvar)]
    [.Ecosystem(id)]
    [.Cutoff(columns)]
    [.Custom(Column){Body}]
    [.Vars(Prefix)]
```

> DBFind

  * `table`

    테이블 이름.
  * `Source`

    데이터 소스 이름.

> Columns

  * `columns`

    지정되지 않은 경우, 모든 필드 목록이 반환됩니다. JSON 유형의 필드가 있는 경우, 다음 구문을 사용하여 레코드 필드를 처리할 수 있습니다: `columnname->fieldname`. 이 경우 생성된 필드 이름은 `columnname.fieldname`입니다.

> Where

  * `conditions`

   데이터 쿼리 조건입니다. DBFind을 참조하세요.
   JSON 유형의 필드가 있는 경우, 다음 구문을 사용하여 레코드 필드를 처리할 수 있습니다: `columnname->fieldname`.

> WhereId

  ID로 쿼리합니다. 예: `.WhereId(1)`.
  * `Id`

   엔트리 ID입니다.

> Order

  필드로 정렬합니다.
  정렬 구문에 대한 자세한 정보는 [DBFind](#dbfind)을 참조하세요.

  * `name`

   필드 이름입니다.

> Limit

  * `limit`
  
    반환되는 엔트리 수입니다. 기본값은 25이며, 최대값은 10,000입니다.

> Offset

  * `Offset`

    오프셋입니다.

> Count

  Where 조건의 전체 행 수를 지정합니다.
  변수에 저장하는 동시에, 전체 행 수는 dbfind 요소의 count 매개변수로 반환됩니다.

  Where와 WhereID가 지정되지 않은 경우, 테이블의 전체 행 수가 반환됩니다.

  * `countvar`

    행 수를 저장하는 변수의 이름입니다.

> Ecosystem
  * `Id`

   생태계 ID입니다. 기본적으로 데이터는 현재 생태계에서 지정된 테이블에서 가져옵니다.

> Cutoff

  대량의 텍스트 데이터를 잘라서 표시하는 데 사용됩니다.

  * `columns`

   Cutoff 함수에서 처리해야 하는 필드의 쉼표로 구분된 목록입니다.
   필드 값은 링크 링크(link)와 제목(title) 두 필드를 가진 JSON 객체로 대체됩니다. 필드 값이 32자를 초과하는 경우, 전체 텍스트의 처음 32자를 가리키는 링크가 반환됩니다. 필드 값이 32자 이하인 경우, 링크(link)는 void로 설정되고 제목(title)에는 완전한 필드 값이 포함됩니다.

> Custom

  Data에 계산된 열을 할당할 수 있습니다. 예를 들어 버튼 및 기타 페이지 레이아웃 요소에 대한 필드 템플릿을 지정할 수 있습니다. 이러한 필드 템플릿은 일반적으로 [Table](#table) 및 기타 함수에 데이터를 받기 위해 할당됩니다.

  여러 개의 계산된 열을 할당하려면 여러 개의 Custom 함수를 사용하십시오.

  * `Column`

   고유하고 필수적인 열 이름입니다.
  * `Body`

   코드 블록입니다. 엔트리의 다른 열에서 값을 가져오기 위해 `#columnname#`을 사용한 다음, 해당 값을 코드 블록에서 사용할 수 있습니다.

> Vars

  쿼리로 얻은 첫 번째 행은 값과 함께 변수 집합을 생성합니다. 지정되는 경우, Limit 매개변수는 자동으로 1이 되고, 하나(1)의 레코드만 반환됩니다.

  * `Prefix`

   변수 이름에 추가되는 접두사입니다. 형식은 `#prefix_columnname#`이며, 열 이름은 바로 밑줄 기호 다음에 옵니다. JSON 필드를 포함하는 열이 있는 경우 생성된 변수는 다음 형식으로 됩니다: `#prefix_columnname_field#`.


#### 예

```
DBFind(parameters,myparam)
DBFind(parameters,myparam).Columns(name,value).Where({name:"money"})
DBFind(parameters,myparam).Custom(myid){Strong(#id#)}.Custom(myname){
   Strong(Em(#name#))Div(myclass, #company#)
}
```

### Div {#div}

div HTML 요소를 만듭니다.

#### 구문
```
Div(Class, Body)
 [.Style(Style)]
 [.Show(Condition)]
 [.Hide(Condition)]
```

> Div
  * `Class`

    div의 클래스 이름입니다.
  * `Body`

    자식 요소입니다.
> Style

  지정된 CSS 스타일입니다.
  * `Style`

   CSS 스타일입니다.
> Show

 Div를 표시하는 조건을 정의합니다.
   * `Condition`

   아래의 Hide를 참조하세요.
> Hide

 Div를 숨기는 조건을 정의합니다.
   * `Condition`

   표현식 형식은 `InputName=Value`입니다. 모든 표현식이 true인 경우, *Condition*은 true입니다. `InputName`의 값이 `Value`와 같은 경우, *Condition*은 true입니다. 여러 개의 *Show* 또는 *Hide*를 호출하는 경우, 최소한 하나의 *Condition* 매개변수가 true여야 합니다.

#### 예

```
Form(){
    Div(text-left){
        Input(Name: "broadcast", Type: "checkbox", Value: "false")
    }
    Div(text-left){
        hello
    }.Show("broadcast=false")
    Div(text-left){
        world
    }.Hide("broadcast=false")
}
```

### EcosysParam {#ecosysparam}

이 함수는 현재 생태계의 생태계 매개변수 테이블에서 매개변수 값을 가져옵니다. 반환된 결과 이름에 언어 리소스가 포함되어 있으면 그에 따라 번역됩니다.

#### 구문
```
EcosysParam(Name, Index, Source)
```

> EcosysParam
  * `Name`

    매개변수 이름입니다.
  * `Index`

    요청한 매개변수가 쉼표로 구분된 요소의 목록인 경우, 1부터 시작하는 인덱스를 지정할 수 있습니다. 예를 들어, `gender = male,female`인 경우, `gender = male,female`은 `female`을 반환합니다.
    Source 매개변수와 함께 사용할 수 없습니다.
  * `Source`

    매개변수 값이 쉼표로 구분된 목록인 경우 사용할 수 있습니다.
    지정된 매개변수의 값들로 구성된 데이터 개체를 생성합니다. 이 개체는 [Table](#table) 및 [Select](#select) 함수의 데이터 소스로 사용할 수 있습니다.
    Index 매개변수와 함께 사용할 수 없습니다.

```
Address(EcosysParam(founder_account))
EcosysParam(gender, Source: mygender)

EcosysParam(Name: gender_list, Source: src_gender)
Select(Name: gender, Source: src_gender, NameColumn: name, ValueColumn: id)
```

### Em {#em}

**em** HTML 요소를 만듭니다.

#### 구문
```
Em(Body, Class)
```

> Em
  * `Body`

    자식 텍스트 또는 요소.
  * `Class`

    em 클래스 이름입니다.

#### 예

```
This is an Em(important news).
```

### ForList {#forlist}

Source 데이터 소스의 요소 목록을 Body에서 설정한 템플릿 형식으로 표시하고 **forlist** 요소를 생성합니다.

#### 구문
```
ForList(Source, Index){Body}
```

> ForList
  * `Source`

    [DBFind](#dbfind) 또는 [Data](#data) 함수에서 얻은 데이터 소스입니다.
  * `Index`

    반복 카운터의 변수로, 1부터 시작합니다.
    선택적 매개변수입니다. 지정하지 않은 경우, 반복 횟수 값은 [Source] _index 변수에 기록됩니다.
  * `Body`

    요소를 삽입하는 템플릿입니다.

```
ForList(mysrc){Span(#mysrc_index#. #name#)}
```

### Form {#form}

   양식 **HTML** 요소를 만듭니다.

#### 구문
```
Form(Class, Body) [.Style(Style)]
```
> Form
  * `Body`

    자식 텍스트 또는 요소입니다.
  * `Class`

    폼의 클래스 이름입니다.
> Style
  지정된 CSS 스타일입니다.
  * `Style`

   CSS 스타일입니다.


#### 예

```
Form(class1 class2, Input(myid))
```

### GetColumnType {#getcolumntype}

특정 테이블의 필드 데이터 유형을 반환합니다.

반환되는 유형에는 `text, varchar, number, money, double, bytes, json, datetime, double`이 포함됩니다.

#### 구문

```
GetColumnType(Table, Column)
```

> GetColumnType
  * `Table`

    테이블 이름.

  * `Column`

    분야 명.

#### 예

```
SetVar(coltype,GetColumnType(members, member_name))Div(){#coltype#}
```

### GetHistory {#gethistory}

**gethistory** 요소를 생성하고 지정된 데이터 테이블의 항목의 변경 이력을 채우기 위해 사용합니다. 생성된 데이터는 *Source* 요소에 넣을 것입니다. 이 요소는 나중에 소스 입력 함수에서 사용할 수 있습니다. 예를 들어 [Table](#Table)에서 사용할 수 있습니다.

배열은 마지막으로 수정된 순서대로 정렬됩니다.

배열의 id 필드는 rollback_tx 테이블의 id를 가리킵니다. block_id는 블록 ID를 나타내고, block_time은 블록 생성 타임스탬프를 나타냅니다.

#### 구문
```
GetHistory(Source, Name, Id, RollbackId)
```

> GetHistory
  * `Source`

    데이터 소스 이름.
  * `Name`

    테이블 이름.
  * `Id`

    항목 ID.
  * `RollbackId`

    선택적 매개변수입니다. 지정된 경우 rollback_tx 테이블에서 지정된 ID를 가진 하나의 레코드만 반환됩니다.

#### 예

```
GetHistory(blocks, BlockHistory, 1)
```

### GetVar {#getvar}

이미 존재하는 지정된 변수의 값을 반환하거나 존재하지 않으면 빈 문자열을 반환합니다.
**getvar** 요소는 편집 가능한 트리가 요청될 때만 생성됩니다. `GetVar(varname)`과 `#varname`의 차이점은 varname이 없으면 GetVar는 빈 문자열을 반환하는 반면 #varname#은 문자열 값으로 해석된다는 것입니다.

#### 구문
```
GetVar(Name)
```

> GetVar
  * `Name`

    변수 이름.

#### 예

```
If(GetVar(name)){#name#}.Else{Name is unknown}
```

### Hint {#hint}

힌트에 대한 힌트 요소를 만듭니다.

#### 구문
```
Hint(Icon,Title,Text)
```

> Hint
  * `Icon`

    아이콘 이름.
  * `Title`

    힌트 제목.
  * `Text`

    힌트 텍스트.

#### 예

```
Hint(Icon: "icon-wrench",Title:$@1pa_settings$,Text: This is a hint text)
```

### If {#if}

조건문.

*Condition*을 만족하는 첫 번째 *If* 또는 *ElseIf* 자식 요소를 반환합니다. 그렇지 않으면 *Else* 자식 요소를 반환합니다.

#### 구문
```
If(Condition){ Body}
 [.ElseIf(Condition){ Body }]
 [.Else{ Body }]
```

> If
  * `Condition`

   조건이 빈 문자열, 0 또는 false이면 조건이 충족되지 않은 것으로 간주됩니다. 다른 모든 경우에는 이 조건이 충족되는 것으로 간주됩니다.

  * `Body`

    자식 요소.

#### 예

```
If(#value#){
   Span(Value)
}.ElseIf(#value2#){Span(Value 2)
}.ElseIf(#value3#){Span(Value 3)}.Else{
   Span(Nothing)
}
```

### Image {#image}

이미지 **HTML** 요소를 만듭니다.

#### 구문
```
Image(Src, Alt, Class)
 [.Style(Style)]
```

> Image
  * `Src`

    이미지 소스, 파일 또는 `data:...`
  * `Alt`

    이미지를 표시할 수 없는 경우 대체 텍스트입니다.

  * `Сlass`

    이미지를 표시할 수 없는 경우 대체 텍스트입니다.

#### 예

```
Image(Src: Binary().ById(#id#), Class: preview).Style(height: 40px; widht 40px;)
```

### ImageInput {#imageinput}

이미지를 업로드할 **imageinput** 요소를 만듭니다.

#### 구문
```
ImageInput(Name, Width, Ratio, Format)
```

> ImageInput
  * `Name`

    요소 이름입니다.
  * `Width`

    자른 이미지의 너비입니다.
  * `Ratio`

    가로세로 비율 또는 이미지의 높이입니다.
  * `Format`

    업로드된 이미지의 형식입니다.

#### 예

```
ImageInput(avatar, 100, 2/1)
```

### Include {#include}

지정된 이름의 템플릿을 페이지 코드에 삽입합니다.

#### 구문
```
Include(Name)
```

> Include
  * `Name`

    템플릿 이름.

#### 예

```
Div(myclass, Include(mywidget))
```

### Input {#input}

**입력** HTML 요소를 만듭니다.

#### 구문
```
Input(Name, Class, Placeholder, Type, Value, Disabled)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Input
  * `Name`

    요소 이름입니다.
  * `Class`

    클래스 이름입니다.
  * `Placeholder`

    입력 필드에 대한 예상 값을 나타내는 프롬프트입니다.
  * `Type`

    입력 타입입니다.
  * `Value`

    요소 값입니다.
  * `Disabled`

    입력 요소를 비활성화합니다.
> Validate

  매개변수를 유효성 검사합니다.
> Style

  지정된 CSS 스타일입니다.
  * `Style`

    CSS 스타일입니다.


#### 예

```
Input(Name: name, Type: text, Placeholder: Enter your name)
Input(Name: num, Type: text).Validate(minLength: 6, maxLength: 20)
```

### InputErr {#inputerr}

오류 텍스트의 유효성을 검사할 **inputerr** 요소를 만듭니다.

#### 구문
```
InputErr(Name,validation errors)]
```

> InputErr
  * `Name`

   [Input](#input) 요소의 이름에 해당합니다.

  * `validation errors`

    하나 이상의 매개변수에 대한 유효성 검사 오류 메시지입니다.

#### 예

```
InputErr(Name: name,
minLength: Value is too short,
maxLength: The length of the value must be less than 20 characters)
```

### InputMap {#inputmap}

지도에서 좌표를 선택할 수 있는 주소에 대한 텍스트 입력 필드를 만듭니다.

#### 구문
```
InputMap(Name, Type, MapType, Value)
```

> InputMap
  * `Name`

    요소 이름입니다.
  * `Value`

    기본값입니다.
    값은 문자열 형식의 객체입니다. 예를 들어, `{"coords":[{"lat":number,"lng":number},]}` 또는 `{"zoom":int, "center":{"lat":number,"lng": number}}`입니다. 미리 정의된 값으로 InputMap이 생성되면 주소 필드를 사용하여 주소 값을 저장할 수 있으므로 void가 아닙니다.
  * `Type`

    맵 스팟 매핑의 유형입니다:
    * `polygon` - 다중 스팟이 폐포인트로 닫힌 영역을 나타냅니다.
    * `Line` - 폐포인트가 없는 여러 점으로 이루어진 폴리라인을 의미합니다.
    * `Point` - 단일 포인트 좌표를 나타냅니다.
  * `MapType`

    맵 유형입니다.
    다음과 같은 값이 있습니다: `hybrid, roadmap, satellite, terrain`.


#### 예

```
InputMap(Name: Coords,Type: polygon, MapType: hybrid, Value: `{"zoom":8, "center":{"lat":55.749942860682545,"lng":37.6207172870636}}`)
```

### JsonToSource {#jsontosource}

**jsontosource** 요소를 만들고 JSON 배열의 키-값 쌍으로 채웁니다. 얻은 데이터는 나중에 소스 입력 기능(예: [Table](#table))에서 사용할 수 있는 Source 요소에 입력됩니다.
결과 데이터의 레코드는 JSON 키를 기준으로 사전순으로 정렬됩니다.

#### 구문
```
JsonToSource(Source, Data)
```

> JsonToSource
  * `Source`

    데이터 소스 이름.

  * `Data`

    JSON 객체 또는 JSON 객체를 포함하는 변수 이름(`#name#`).

#### 예

```
JsonToSource(src, #myjson#)
JsonToSource(dat, {"param":"value", "param2": "value 2"})
```

### Label {#label}

**label** HTML 요소를 만듭니다.

#### 구문
```
Label(Body, Class, For)
 [.Style(Style)]
```

> Label
  * `Body`

    자식 텍스트 또는 요소입니다.
  * `Class`

    클래스 이름입니다.
  * `For`

    폼 요소에 바인딩합니다.
> Style

  지정된 CSS 스타일입니다.
  * `Style`

    CSS 스타일입니다.


#### 예

```
Label(The first item).
```

### LangRes {#langres}

지정된 언어 리소스를 반환합니다. 트리를 편집하는 요청인 경우 **langres** 요소를 반환하며, 간단한 형식 지정자 **\$langres\$**를 사용할 수 있습니다.

#### 구문

```
LangRes(Name)
```

> LangRes
  * `Name`

    언어 리소스의 이름입니다.

#### 예

```
LangRes(name)
LangRes(myres)
```

### LinkPage {#linkpage}

페이지에 연결되는 **linkpage** 요소를 만듭니다.

#### 구문

```
LinkPage(Body, Page, Class, PageParams)
 [.Style(Style)]
```

> LinkPage
  * `Body`

    자식 텍스트 또는 요소입니다.
  * `Page`

    리디렉션할 페이지의 이름입니다.
  * `Class`

    버튼 클래스 이름입니다.
  * `PageParams`

    리디렉션 페이지 매개변수입니다.
> Style

  지정된 CSS 스타일입니다.
  * `Style`

  CSS 스타일입니다.

  
#### 예

```
LinkPage(Class: #style_link# h5 text-bold, Page: @1roles_view, PageParams: "v_role_id=#recipient.role_id#")
```

### Map {#map}

시각적 지도를 만들고 모든 형식으로 좌표를 표시합니다.

#### 구문
```
Map(Hmap, MapType, Value)
```

> Map
  * `Hmap`

    페이지의 HTML 요소의 높이입니다.
    기본값은 100입니다.
  * `Value`

    맵 값으로, 문자열 형식의 객체입니다.
    예를 들어, `{"coords":[{"lat":number,"lng":number},]}` 또는 `{"zoom":int, "center":{"lat":number,"lng": number}}`입니다. `center`가 지정되지 않은 경우, 맵 창은 지정된 좌표에 따라 자동으로 조정됩니다.
  * `MapType`

    맵 유형입니다.
    다음과 같은 값이 있습니다: `hybrid, roadmap, satellite, terrain`.


#### 예

```
Map(MapType:hybrid, Hmap:400, Value:{"coords":[{"lat":55.58774531752405,"lng":36.97260184619233},{"lat":55.58396161622043,"lng":36.973803475831005},{"lat":55.585222890513975,"lng":36.979811624024364},{"lat":55.58803635636347,"lng":36.978781655762646}],"area":146846.65783403456,"address":"Unnamed Road, Moscow, Russia, 143041"})
```

### MenuGroup {#menugroup}

메뉴에 중첩된 하위 메뉴를 만들고 **menugroup** 요소를 반환합니다. 언어 리소스로 바꾸기 전에 **name** 매개 변수는 **Title** 값을 반환합니다.

#### 구문
```
MenuGroup(Title, Body, Icon)
```
> MenuGroup

   * `Title`

     메뉴 항목의 이름입니다.

   * `Body`

     하위 메뉴의 하위 요소.

   * `Icon`

     상.

#### 예

```
MenuGroup(My Menu){
    MenuItem(Interface, sys-interface)
    MenuItem(Dahsboard, dashboard_default)
}
```

### MenuItem {#menuitem}

메뉴 항목을 만들고 **menuitem** 요소를 반환합니다.

#### 구문
```
MenuItem(Title, Page, Params, Icon)
```

> MenuItem

  * `Title`

    메뉴 항목의 이름입니다.

  * `Page`

    리디렉션 페이지의 이름입니다.

  * `Params`

    페이지 매개변수를 리디렉션합니다.

  * `Icon`

    상.

#### 예

```
MenuItem(Title:$@1roles$, Page:@1roles_list, Icon:"icon-pie-chart")
```

### Money {#money}

exp / 10 ^ 숫자의 문자열 값을 반환합니다.

#### 구문
```
Money(Exp, Digit)
```

> Money

  * `Exp`

    문자열 형식의 숫자입니다.

* `Digit`

    표현식 `Exp/10^digit`의 10의 지수입니다. 값은 양수 또는 음수일 수 있으며, 양수 값은 소수점 이하의 자릿수를 결정합니다.


#### 예

```
Money(Exp, Digit)
```

### Or {#or}

**if** 논리 연산의 결과를 반환합니다. 괄호 안에 나열된 모든 매개변수는 쉼표로 구분됩니다. 값인 매개변수 하나가 빈 문자열(0 또는 `false`)이 아닌 경우 매개변수 값은 `true`이고, 그렇지 않으면 매개변수 값은 `false`입니다. 매개변수 값이 `true`이면 함수는 `1`을 반환하고 그렇지 않으면 `0`을 반환합니다.

#### 구문
```
Or(parameters)
```


#### 예

```
If(Or(#myval1#,#myval2#), Span(OK))
```

### P {#p}

**p** HTML 요소를 만듭니다.

#### 구문
```
P(Body, Class)
 [.Style(Style)]
```

> P

  * `Body`

    자식 텍스트 또는 요소.

  * `Class`

    클래스 이름.

> Style

지정된 CSS 스타일입니다.

  * `Style`

    CSS 스타일.

#### 예

```
P(This is the first line.
  This is the second line.)
```

### QRcode {#qrcode}

지정된 텍스트가 있는 QR 코드를 반환하고 **qrcode** 요소를 생성합니다.

#### 구문
```
QRcode(Text)
```

> QRcode
  * `Text`

    QR 코드 텍스트.

#### 예

```
QRcode(#name#)
```

### RadioGroup {#radiogroup}

**radiogroup** 요소를 만듭니다.

#### 구문
```
RadioGroup(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> RadioGroup

  * `Name`

    요소 이름입니다.

* `Source`

    DBFind 또는 Data 함수에서 얻은 데이터 소스입니다.

* `NameColumn`

    데이터 소스의 필드 이름입니다.

* `ValueColumn`

    데이터 소스의 값 이름입니다.
    Custom으로 생성된 필드는 이 매개변수에서 사용할 수 없습니다.

* `Value`

    기본값입니다.

* `Class`

    클래스 이름입니다.

> Validate

    매개변수를 유효성 검사합니다.

> Style

    지정된 CSS 스타일입니다.

* `Style`

    CSS 스타일입니다.

#### 예

```
RadioGroup(Name: type_decision, Source: numbers_type_decisions, NameColumn: name, ValueColumn: value)
```

### Range {#range}

**range** 요소를 생성하고, *From*에서 *To*까지의 정수 요소를 *Step* 간격으로 채웁니다 (*To*는 포함되지 않음). 생성된 데이터는 *Source*에 저장되며, 나중에 소스 입력 함수에서 사용할 수 있습니다 (예: [Table](#Table)). 잘못된 인수가 지정된 경우 빈 *Source*가 반환됩니다.

#### 구문
```
Range(Source,From,To,Step)
```

> Range

  * `Source`

    데이터 소스 이름입니다.

* `From`

    시작 값 (i = From).

* `To`

    종료 값 (i < To).

* `Step`

    값 변경의 단계입니다. 지정되지 않은 경우, 기본값은 1입니다.

#### 예

```
Range(my,0,5)
SetVar(from, 5).(to, -4).(step,-2)
Range(Source: neg, From: #from#, To: #to#, Step: #step#)
```

### Select {#select}

**select** HTML 요소를 생성하세요.

#### 구문
```
Select(Name, Source, NameColumn, ValueColumn, Value, Class)
 [.Validate(validation parameters)]
 [.Style(Style)]
```

> Select

  * `Name`

    요소 이름입니다.

  * `Source`

    [DBFind](#dbfind) 또는 [Data](#data) 함수에서 얻은 데이터 소스입니다.

  * `NameColumn`

    데이터 소스의 필드 이름입니다.

  * `ValueColumn`

    데이터 소스의 값 이름입니다.
    [Custom](#custom) 으로 생성된 필드는 이 매개변수에서 사용할 수 없습니다.

  * `Value`

    기본값입니다.

  * `Class`

    클래스 이름입니다.

> Validate

  매개변수를 유효성 검사합니다.

> Style

  지정된 CSS 스타일입니다.

  * `Style`

    CSS 스타일입니다.

#### 예

```
DBFind(mytable, mysrc)
Select(mysrc, name)
```

### SetTitle {#settitle}

페이지 제목 설정, **settitle** 요소 생성.

#### 구문
```
SetTitle(Title)
```

> SetTitle
  * `Title`

    페이지 제목.

#### 예

```
SetTitle(My page)
```

### SetVar {#setvar}

지정된 변수 *Name*에 값 *Value*를 할당합니다.

#### 구문
```
SetVar(Name, Value)
```

> SetVar

  * `Name`

    변수 이름.

  * `Value`

    변수 값은 다른 변수에 대한 참조를 포함할 수 있습니다.

#### 예

```
SetVar(name, John Smith).(out, I am #name#)
Span(#out#)
```

### Span {#span}

**span** HTML 요소를 만듭니다.

#### 구문
```
Span(Body, Class)
 [.Style(Style)]
```

> Span

  * `Body`

    자식 텍스트 또는 요소.

  * `Class`

    클래스 이름.

> Style

  지정된 CCS 스타일입니다.

  * `Style`

    CSS 스타일.

#### 예

```
This is Span(the first item, myclass1).
```

### Strong {#strong}

**strong** HTML 요소를 생성합니다.

#### 구문
```
Strong(Body, Class)
```

> Strong

  * `Body`

    자식 텍스트 또는 요소.

  * `Class`

    클래스 이름.

#### 예

```
This is Strong(the first item, myclass1).
```

### SysParam {#sysparam}

플랫폼 매개변수 테이블 *system_parameters*에서 특정 매개변수의 값을 가져옵니다.

#### 구문
```
SysParam(Name)
```

> SysParam
  * `Name`

    플랫폼 매개변수의 이름입니다.

#### 예

```
SysParam(max_columns)
```

### Table {#table}

**table** HTML 요소를 만듭니다.

#### 구문
```
Table(Source, Columns)
 [.Style(Style)]
```

> Table

  * `Source`

    특정 데이터 소스의 이름입니다.

  * `Columns`

    제목 및 해당 열 이름, 예: Title1=column1,Title2=column2.

> Style

  지정된 CSS 스타일입니다.

  * `Style`

    CSS 스타일.

#### 예

```
DBFind(mytable, mysrc)
Table(mysrc,"ID=id,Name=name")
```

### TransactionInfo {#transactioninfo}

지정된 해시로 트랜잭션을 쿼리하고 실행된 계약 및 해당 매개변수에 대한 정보를 반환합니다.

#### 구문
```
TransactionInfo(Hash)
```

> TransactionInfo
  * `Hash`

    16진수 문자열 형식의 트랜잭션 해시입니다.

> Return value

  JSON 형식의 문자열을 반환합니다.

```
{"contract":"ContractName", "params":{"key": "val"}, "block": "N"}
```

Where:

* `contract` - Contract name;
* `params` - Data passed to the contract parameters;
* `block` - ID of the block that processed the transaction.

#### 예

```
P(TransactionInfo(#hash#))
```

### VarAsIs {#varasis}

지정된 변수 *Name*에 값 *Value*를 할당합니다. 지정된 변수 값은 값이 아닌 변수 이름입니다.

변수 치환을 포함한 버전은 [SetVar](#setvar) 을 참조하십시오.

#### 구문
```
VarAsIs(Name, Value)
```

> VarAsIs

  * `Name`

    변수 이름.

  * `Value`

    변수 값. 값의 변수 이름은 대체되지 않습니다. 예를 들어 값이 example #varname#인 경우 변수 값도 example #varname#입니다.

#### 예

```
SetVar(Name,"John")
VarAsIs(name, I am #Name#)
Span(#name#) // I am #Name#
```

## 모바일 기기에 적합한 애플리케이션 스타일 {#app-styles-for-mobile-devices}

### Layout {#layout}

#### Title {#title}

* `h1`… `h6`

#### Strong-class names {#strong-class-names}

* `.text-muted`
* `.text-primary`
* `.text-success`
* `.text-info`
* `.text-warning`
* `.text-danger`

#### Color {#color}

* `.bg-danger-dark`
* `.bg-danger`
* `.bg-danger-light`
* `.bg-info-dark`
* `.bg-info`
* `.bg-info-light`
* `.bg-primary-dark`
* `.bg-primary`
* `.bg-primary-light`
* `.bg-success-dark`
* `.bg-success`
* `.bg-success-light`
* `.bg-warning-dark`
* `.bg-warning`
* `.bg-warning-light`
* `.bg-gray-darker`
* `.bg-gray-dark`
* `.bg-gray`
* `.bg-gray-light`
* `.bg-gray-lighter`

#### Grid {#grid}

* `.row`
* `.row.row-table`
* `.col-xs-1`… `.col-xs-12`는 `.row.row-table`에서만 사용됩니다.

#### Panel {#panel}

* `.panel`
* `.panel.panel-heading`
* `.panel.panel-body`
* `.panel.panel-footer`

#### Form {#form-app}

* `.form-control`

#### Button {#button-app}

* `.btn.btn-default`
* `.btn.btn-link`
* `.btn.btn-primary`
* `.btn.btn-success`
* `.btn.btn-info`
* `.btn.btn-warning`
* `.btn.btn-danger`

#### Icon {#icon}

* 모든 fa 클래스 아이콘은 FontAwesome: `fa fa-<icon-name></icon-name>`에서 가져왔습니다.
* 모든 아이콘 클래스 아이콘은 SimpleLineIcons: `icon-<icon-name>`에서 가져왔습니다.