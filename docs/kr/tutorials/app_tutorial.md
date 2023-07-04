# 애플리케이션 개발 튜토리얼 {#tutorial-for-application-development}

이 섹션에서는 IBAX 네트워크에서 간단한 애플리케이션을 개발하는 방법을 안내합니다.

  - [목표](#the-goal)
  - [파트 1: 환경 설정](#part-1-the-environment)
  - [파트 2: 컨트랙트](#part-2-contract)
    - [생성자 계정](#creator-account)
    - [새로운 애플리케이션](#new-application)
    - [새로운 데이터베이스 테이블](#new-database-table)
    - [새로운 컨트랙트](#new-contract)
      - [컨트랙트 코드](#contract-code)
      - [컨트랙트 생성](#create-a-contract)
      - [컨트랙트 이름](#contract-name)
      - [데이터](#data)
      - [조건](#conditions)
      - [액션](#action)
      - [전체 컨트랙트 코드](#full-contract-code)
      - [저장 및 실행](#save-and-run)
  - [파트 3: 페이지](#part-3-page)
    - [새로운 필드](#new-field)
    - [컨트랙트 업데이트](#update-the-contract)
    - [페이지](#page)
      - [디자이너 뷰](#designer-views)
      - [개발자 뷰](#developer-view)
      - [데이터베이스 테이블에서 데이터 가져오기](#fetch-data-from-the-database-table)
      - [Full page code](#full-page-code-1)
      - [페이지 저장](#save-the-page)
  - [파트 4: 애플리케이션](#part-4-application)
    - [메뉴](#menu)
      - [메뉴 항목 추가](#add-a-menu-item)
      - [새로운 메뉴 항목 테스트](#test-the-new-menu-item)
    - [메시지 보내기](#send-a-message)
      - [폼](#form)
    - [폼 내비게이션](#form-navigation)
      - [내비게이션 버튼](#navigation-buttons)
      - [변수](#variables)
      - [항목 개수](#entry-count)
      - [테이블 오프셋](#table-offset)
      - [버튼 코드](#button-code)
      - [페이지 새로고침](#page-refreshing)
    - [Full page code](#full-page-code-2)
  - [결론](#conclusions)




## 목표 (The Goal) {#the-goal}

애플리케이션은 간단한 기능으로 시작하지만 튜토리얼이 진행됨에 따라 복잡성이 증가합니다.

애플리케이션의 최종 버전에서는 일부 간단한 메시지(문자열)가 데이터베이스 테이블에 저장되며, 해당 테이블에는 발신자의 타임스탬프와 계정 식별자가 포함됩니다. 사용자는 메시지 목록을 확인하고, 생태계의 메뉴에서 접근 가능한 애플리케이션 페이지에서 새로운 메시지를 추가할 수 있습니다.

## 파트 1: 환경 설정 (Part 1: The Environment) {#part-1-the-environment}

**Weaver**

IBAX의 유일한 클라이언트인 Weaver는 모든 사용자 및 생태계 역할에 대한 기능을 제공합니다. 애플리케이션 개발자는 Weaver를 통해 애플리케이션을 개발하고 테스트할 수 있으며, 생태계 관리자는 생태계를 관리하고 사용자는 생태계와 상호 작용할 수 있습니다.

이 튜토리얼에서는 Weaver에서 계약 코드를 작성하고 페이지 템플릿을 작성하며 기타 모든 작업을 수행할 것입니다. Weaver는 또한 계약 코드를 복원, 저장 및 실행하고 데이터 구조(데이터베이스 테이블)를 관리하며, 액세스 권한을 할당하고 애플리케이션을 생성하는 방법을 제공합니다.

각 노드는 자체 Weaver 인스턴스를 가지고 있습니다.


## 파트 2: 컨트랙트 (Part 2: Contract) {#part-2-contract}

첫 번째 간단한 애플리케이션은 "Hello, World!"입니다.

> 참고

> 이 응용 프로그램에서 문자열은 데이터베이스 테이블에 저장되며 사용자 페이지는 없습니다.

### 생성자 계정 (Creator account) {#creator-account}

개발자 역할이 있는 계정에는 생태계의 "루트" (root) 권한이 할당됩니다. 기본적으로 이 역할은 모든 작업에 액세스할 수 있습니다. 새 에코시스템에서 생성자 계정에는 관리자 역할이 할당되며 새 애플리케이션 및 데이터베이스 테이블 생성과 같은 에코시스템에 주요 변경 사항을 도입하려면 이 역할을 사용해야 합니다.

작성자 계정을 사용하여 생태계에 로그인합니다.

### 새로운 애플리케이션 (New application) {#new-application}

로그인 후 생태계 생성자로서 새로운 애플리케이션을 생성할 수 있습니다.

새로운 애플리케이션 생성하기:

1. 개발자 탭으로 이동합니다.
2. 왼쪽 메뉴에서 애플리케이션을 선택합니다.
3. 애플리케이션 페이지에서 '신규'를 선택합니다.
4. 이름 필드에 애플리케이션 이름을 지정합니다.
5. 조건을 `true`로 설정합니다.
   - `true`는 누구나 애플리케이션을 변경할 수 있는 것을 의미합니다.
   - 다른 옵션으로는 `ContractConditions("MainCondition")`을 사용할 수 있으며, 이는 생성자를 제외한 다른 사람들은 애플리케이션을 변경할 수 없음을 의미합니다.
6. 애플리케이션은 애플리케이션 목록에 표시되며, 특정 애플리케이션의 이름 필드를 클릭하여 활성화할 수 있습니다.

> 참고

> 개발자 탭에서 애플리케이션을 클릭하여 관련 리소스에 액세스할 수 있으며, 이는 생태계에 영향을 주지 않습니다. 어떤 애플리케이션을 선택하더라도 모든 생태계 애플리케이션이 여전히 사용 가능합니다.

### 새로운 데이터베이스 테이블 (New database table) {#new-database-table}

데이터를 저장하기 위해 Weaver에서 애플리케이션을 위한 데이터베이스 테이블을 생성하세요.

데이터베이스 테이블 생성하기:

1. 개발자 탭에서 애플리케이션 - 이름 > 데이터베이스 테이블을 선택합니다.
   - 선택한 애플리케이션과 관련된 모든 데이터베이스 테이블이 여기에 표시됩니다. 만약 목록이 비어 있다면, 해당 애플리케이션을 위해 아직 데이터베이스 테이블이 생성되지 않았음을 의미합니다.

2. '신규'를 클릭합니다.
   - Weaver에서는 새로운 데이터베이스 테이블을 생성하기 위한 페이지를 표시합니다.

3. 이름 필드에 이름을 지정합니다.
   - 이 튜토리얼에서는 데이터베이스 테이블의 이름을 `apptable`로 지정합니다.

4. `message` 열을 추가하고, 타입을 `Text`로 설정합니다.
   - 이 테이블은 `id` (미리 정의)와 `message`라는 두 개의 열을 가져야 합니다. 나중에 더 많은 열을 추가할 예정입니다.

5. 읽기 및 쓰기 권한에 대해 각 필드를 `true`로 설정합니다.
   - 이렇게 하면 누구나 데이터베이스 테이블에 엔트리를 삽입하고 업데이트할 수 있으며, 열을 추가하고 엔트리 데이터를 읽을 수 있게 됩니다.
   - 선택사항으로 읽기 및 쓰기 권한을 생성자 계정에게 예약할 수도 있습니다. 이 경우에는 해당 필드를 `ContractConditions("MainCondition")`로 설정합니다.


### 새로운 컨트랙트 (New contract) {#new-contract}

#### 컨트랙트 코드 (Contract code) {#contract-code} 

각 계약에는 세 부분이 있습니다. 자세한 내용은 [계약 구조](../topics/script.md#contract-structure) 를 참조하십시오.

#### 컨트랙트 생성 (Create a contract) {#create-a-contract}

1. 개발자 탭에서 애플리케이션 - 이름 > 계약을 선택합니다.
   - 해당 애플리케이션과 관련된 모든 계약이 여기에 표시됩니다. 새로운 애플리케이션의 경우 목록은 비어 있습니다.

2. '신규'를 클릭합니다.
   - 편집기에 새로운 계약 템플릿이 표시됩니다.

아래와 같이 빈 계약 템플릿이 표시됩니다:

```
contract ... {
    data {

    }
    conditions {

    }
    action {

    }
}
```

####  컨트랙트 이름 (Contract name) {#contract-name}

먼저 스마트 계약 이름을 지정하십시오.

```  
    contract AppContract {

    }
```

#### 데이터 (Data) {#data}

`data` 섹션을 작성하세요.

다음 예시에서 `Message`는 변수 이름을 나타내며, `string`은 변수 타입입니다.


```
    data {
        Message string
    }
```

#### 조건 (Conditions) {#conditions} 

`conditions` 섹션을 작성하세요. `Message`가 빈 문자열인 경우를 방지하기 위한 간단한 검증 조건입니다. 만약 `Message`의 길이가 `0`이라면, 미리 정의된 경고 메시지가 실행됩니다.

```
conditions {
    // avoid writing empty strings
    if Size($Message) == 0 {
        error "Message is empty"
    }
}
```

#### 액션 (Action) {#action}

`action` 섹션을 작성하세요. 간단한 작업은 `Message`를 데이터 테이블에 기록하는 것입니다.

```
    action {
        DBInsert("apptable", {message: $Message})
    }
```

#### 전체 컨트랙트 코드 (Full contract code) {#full-contract-code}

전체 계약 코드는 다음과 같습니다.

IBAX의 모든 계약은 `data`, `conditions` 및 `action` 섹션을 포함하여 이와 같이 구성됩니다.

```
contract AppContract {
    data {
        Message string
    }
    conditions {
        // avoid writing empty strings
        if Size($Message) == 0 {
            error "Message is empty"
        }
    }
    action {
        DBInsert("apptable", {message: $Message})
    }
}
```
#### 저장 및 실행 (Save and run) {#save-and-run}

이제 계약을 테스트하기 위해 준비합니다:

1. 에디터 메뉴에서 `Save`를 클릭합니다.

   이렇게 하면 계약 코드가 업데이트되며, 업데이트된 버전은 모든 네트워크 노드에서 사용할 수 있게 됩니다.

2. 에디터 메뉴에서 `Run`을 클릭합니다.

   이렇게 하면 `Run the Contract` 페이지가 표시됩니다.

3. `Run the Contract` 페이지에서 계약의 입력 매개변수를 입력합니다.

   이 계약은 "Message"라는 하나의 매개변수를 가지고 있으므로, `Key` 필드에 `Message`를 설정하고 "Value" 필드에 "Hello, World"를 설정합니다.

4. `Run`을 클릭합니다.

   결과가 오른쪽에 표시됩니다.

성공적으로 일부 문자열을 추가한 경우, 결과에는 트랜잭션의 변경 사항을 소개하는 블록 ID와 결과 코드가 포함됩니다.


``` js
{
   "block": "31",
   "result": null
}
```

## 파트 3: 페이지 (Part 3: Page) {#part-3-page}

계약이 발효되면 유용한 것으로 확장해야 할 때입니다. 이 부분에서는 UI 및 기타 기능을 구현합니다.

메모

이 애플리케이션에서 문자열은 로그의 항목과 같이 데이터베이스 테이블에 저장됩니다. 각 문자열에는 작성자와 타임스탬프가 있습니다.

사용자는 응용 프로그램 페이지에 저장된 문자열 목록을 볼 수 있으며 간단한 형식으로 표시됩니다.

### 새로운 필드 (New field) {#new-field}

이전과 같이 "개발자" 탭에서 데이터베이스 테이블을 편집합니다. "애플리케이션 - 이름 - 데이터베이스 테이블" (Developer tab > Application - Name > Database table page) 페이지에서 다음 필드를 `apptable`에 추가합니다:

* `author`: 필드 유형 `Number`, "Change"를 `true`로 설정합니다.

  이 필드는 작성자 계정의 식별자를 저장합니다.

* `timestamp`: 필드 유형 `Date/Time`, "Change"를 `true`로 설정합니다.

### 컨트랙트 업데이트 (Update the contract) {#update-the-contract}

계약 코드를 업데이트하여 작성자 ID와 타임스탬프를 처리합니다.

작성자 ID는 생태계의 계정 ID이며, 타임스탬프는 Unix 시간 형식으로 계약을 실행하는 날짜와 시간입니다.

두 값 모두 [사전 정의된 변수](../topics/script.md#variables)에서 제공되므로 입력이나 확인 과정이 필요하지 않으며, 이 값들은 액션 부분에서만 업데이트될 수 있습니다.

계약을 업데이트하여 메시지를 추가할 때 작성자 ID와 타임스탬프를 데이터베이스 테이블에 작성하도록 합니다. 여기서 작성자 ID는 `$key_id`로 정의되고, 타임스탬프는 `$time`으로 정의됩니다.


```
action {
    DBInsert("apptable", {message: $Message, author: $key_id, timestamp: $time})
}
```

### 페이지 (Page) {#page}

응용 프로그램 페이지의 경우 데이터베이스 테이블에 저장된 메시지를 표시하는 간단한 페이지입니다.

다른 모든 리소스와 마찬가지로 Weaver에서 UI 페이지를 만들 수 있습니다.

1. 개발자 탭으로 이동하여 애플리케이션 - 이름 > 페이지 (Application - Name > Page)를 클릭합니다.

2. 새로 만들기를 클릭합니다.
  비주얼 디자이너가 새 탭에서 열립니다.

#### Designer views {#designer-views}

The default page is empty. You can use the predefine structure to quickly fill in the page. 

Create a basic table: 

1. In the view selector at the right, click Designer; 
 The view will be switched to the visual designer. 

2. In the menu at the left, select Table With Header and drag it on to the page. 
    A table with multiple elements will be displayed on the page. 

#### 디자이너 뷰 (Developer view) {#developer-view}

IBAX의 사용자 페이지는 [템플릿 언어](../topics/templates2.md) 로 작성되므로, 페이지 코드를 작성할 때는 개발자 보기로 전환해야 합니다.

개발자 보기로 전환합니다.

1. 오른쪽의 보기 선택기에서 "개발자"를 클릭합니다.

 이렇게 하면 페이지 코드가 있는 탭이 있는 편집기로 보기가 전환됩니다.

#### 데이터베이스 테이블에서 데이터 가져오기 (Fetch data from the database table) {#fetch-data-from-the-database-table}

지금까지 페이지 템플릿에는 아무 작업도 이루어지지 않았습니다. 다음 단계에서는 코드를 업데이트하여 페이지가 `apptable`에서 데이터를 표시할 수 있도록 합니다.

1. [DBFind](../topics/script.md#dbfind) 함수를 사용하여 데이터베이스 테이블에서 데이터를 요청합니다.

 다음 예제에서는 이 함수 호출을 사용하여 `apptable`에서 데이터를 가져옵니다. 데이터는 `src_table`에 저장되며 타임스탬프 필드를 기준으로 정렬됩니다. `src_table`은 나중에 테이블 뷰에서 페이지의 데이터 원본으로 사용됩니다.
 
 ```
    DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)
 ```

2. `src_table`의 데이터를 표시하려면 `Table` 함수에서 데이터 소스 및 헤더로 지정하십시오.

```
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
```

3. 오른쪽의 보기 선택기에서 미리 보기를 클릭하여 데이터가 올바르게 표시되는지 확인합니다.

#### 전체 페이지 코드 (Full page code) {#full-page-code-1}

다음은 이 부분의 전체 페이지 코드입니다. 이 기본 페이지는 나중에 확장됩니다.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)

Div(Class: panel panel-primary) {
    Div(Class: panel-heading, Body: Table block)
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
    Div(Class: panel-footer text-right) {
    Button(Class: btn btn-primary, Contract: ContractName, Body: More)
    }
}

```

#### 페이지 저장 (Save the page) {#save-the-page}

페이지를 저장하려면 "저장"을 클릭하세요:

1. 페이지 이름 필드에 `AppPage` 또는 다른 이름을 지정합니다.

2. 메뉴에서 `default_menu`를 선택합니다.

3. 조건을 `true`로 설정합니다.

4. 확인을 클릭합니다.


## 파트 4: 애플리케이션 (Part 4: Application) {#part-4-application}

이전 섹션에서는 계약서, 데이터를 저장할 테이블, 해당 데이터를 표시하는 기본 UI 페이지를 만들었습니다.

이 부분에서는 응용 프로그램을 마무리하여 모양과 작업이 실제와 유사하도록 합니다.

### 메뉴 (Menu) {#menu}

페이지는 메뉴에 연결되어야 합니다. 예를 들어, "default_page"는 홈 탭에 표시되며 기본 생태계 메뉴 "default_menu"에 연결됩니다.

이 애플리케이션 튜토리얼은 매우 간단하므로(한 개의 페이지만 있는) 별도의 메뉴를 생성할 필요가 없습니다. 기본 메뉴에 새로운 메뉴 항목을 추가하는 것으로 충분합니다.

> 참고

> 페이지 속성을 편집하여 페이지 메뉴를 정의할 수 있습니다. 개발자 탭 > 애플리케이션 - 이름 > 페이지로 이동하여 페이지 속성을 편집할 수 있습니다. 예를 들어, 앱에 여러 페이지가 있는 경우 이러한 페이지 간에 이동할 수 있는 메뉴를 생성하고 해당 앱의 모든 페이지에 할당해야 할 수 있습니다.


#### 메뉴 항목 추가 (Add a menu item) {#add-a-menu-item}

메뉴와 마찬가지로 메뉴를 Weaver에서 생성하고 편집할 수 있습니다:

1. 개발자 탭 > 메뉴로 이동합니다.

2. `default_menu` 항목의 이름을 클릭합니다.

   에디터에서 새 탭이 열립니다.

3. 템플릿의 끝에 애플리케이션 페이지를 열 수 있도록 연결된 새로운 메뉴 항목을 추가합니다. 아이콘은 [FontAwesome](https://fontawesome.com/icons) 아이콘 세트에서 가져옵니다.


```
    MenuItem(Title:Messages, Page:AppPage, Icon:"fa fa-envelope")
```

4. 저장을 클릭합니다. 


#### 새로운 메뉴 항목 테스트 (Test the new menu item) {#test-the-new-menu-item}

1. 홈 탭을 엽니다.
2. 메뉴에서 새로고침을 클릭합니다.
    메시지라는 제목의 항목이 표시됩니다.
3. 메시지를 클릭합니다.
    애플리케이션 페이지가 열립니다.

### 메시지 보내기 (Send a message) {#send-a-message}

Logicor의 버튼은 매개변수에 따라 계약을 실행하거나 페이지를 열 수 있습니다.

[Button](../topics/templates2.md#button) 함수에는 두 가지 계약 매개변수가 있습니다:

* `Contract`

    실행할 계약의 이름입니다.

* `Params`

    계약의 입력 매개변수입니다.


#### 폼 (Form) {#form}

계약에 데이터를 전송하려면 양식을 추가해야 합니다. 이 양식은 메시지를 입력하는 입력 필드와 AppContract 계약을 실행하는 버튼이 있어야 합니다.

다음은 이러한 유형의 양식의 예시입니다. 이 양식은 자체 [Div](../topics/templates2.md#div) 에 중첩되어 있습니다. 양식 뷰를 포함하는 Div 요소 다음에 배치되어야 하며, [Input](../topics/templates2.md#input) 필드에는 미리 정의된 이름 `message_input`이 있음을 나타냅니다. 버튼은 이 이름을 사용하여 `Message`의 값을 계약으로 전송합니다. 마지막으로, [Val](../topics/templates2.md#calling-contracts) 함수를 사용하여 입력 필드의 값을 가져옵니다.


```
Div(Class: panel panel-primary) {
 Form() {
 Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
 Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)")
 }
}
```

메시지를 보내서 이 새로운 기능을 테스트할 때 양식이 새로 고쳐지지 않는다는 것을 알 수 있습니다. [페이지 새로고침](#page-refreshing)에서 소개합니다.

### 폼 내비게이션 (Form navigation) {#form-navigation}

기본 보기에서 페이지의 양식은 첫 페이지에 25개 항목만 표시할 수 있습니다. 따라서 사용자를 모든 양식 항목으로 이동하는 몇 가지 간단한 버튼을 추가할 수 있습니다.

#### 내비게이션 버튼 (Navigation buttons) {#navigation-buttons}

두 개의 탐색 버튼이 있으며 각각 애플리케이션 페이지를 다시 로드하고 매개변수를 전달할 수 있습니다.

* 이전 버튼은 처음 25개 항목을 표시합니다. 다른 항목이 없으면 버튼이 표시되지 않습니다.

* 다음 버튼은 다음 25개 항목을 표시합니다. 다른 항목이 없으면 버튼이 표시되지 않습니다.

#### 변수 (Variables) {#variables}

탐색 버튼을 사용하려면 두 개의 변수가 필요합니다. 이 변수는 테이블 뷰 상태를 저장하는 데 사용됩니다.

*  `#table_view_offset#`

현재 테이블 뷰의 오프셋을 저장하는 변수입니다.

페이지가 다시로드될 때 이 변수가 매개변수로 전달됩니다.

*  `#record_count#`

이 변수는 테이블에 있는 항목의 총 개수를 저장합니다.

이 값은 계산됩니다.


#### 항목 개수 (Entry count) {#entry-count}

`#record_count#`를 계산하려면 기존 [DBFind](../topics/script.md#dbfind) 함수 호출을 수정하세요. `.count()` 호출에 지정된 변수는 항목 수를 저장합니다.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count)
```

#### 테이블 오프셋 (Table offset) {#table-offset}

페이지가 열릴 때 테이블 보기 오프셋이 페이지로 전달되어야 합니다. `#table_view_offset#`이 값을 가져오지 않으면 0으로 설정합니다.

페이지 상단에 다음 코드를 추가합니다.

```
If(GetVar(table_view_offset)){

}.Else{
    SetVar(table_view_offset, 0)
}
```

[DBFind](../topics/script.md#dbfind) 함수 호출을 다시 수정합니다. 이번에는 새 테이블 보기 오프셋을 사용해야 합니다.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
```

#### 버튼 코드 (Button code) {#button-code}

바닥글을 정의하는 [Div](../topics/templates2.md#div) 함수 호출을 찾습니다. `Div(Class:panel-footer text-right)`. 버튼 코드를 추가하십시오.

```
Div(Class: panel-footer text-right) {
}
```

만약 이전에 돌아갈 항목이 적어도 하나 있는 경우에만 *이전* *(Previous)* 버튼이 나타납니다. 버튼을 추가할 때, 페이지의 새로운 테이블 뷰 오프셋 `offset_previous`가 계산됩니다. 매개변수는 다시 열린 페이지의 `PageParams`로 전달됩니다.


```
If(#table_view_offset# >= 25) {
    SetVar(offset_previous, Calculate(#table_view_offset# - 25))
    Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
}
```

다음 버튼은 총 레코드 수가 페이지에 표시된 수보다 큰 경우에만 표시됩니다. 버튼이 추가되면 페이지의 새로운 테이블 뷰 오프셋 `offset_next`가 계산됩니다. 매개변수는 다시 열린 페이지의 `PageParams`로 전달됩니다.

```
If(#record_count# >= Calculate(#table_view_offset# + 25)) {
    SetVar(offset_next, Calculate(#table_view_offset# + 25))
    Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
}
```

이 버튼을 추가한 후 페이지를 저장하고 홈 > 메시지 메뉴 항목에서 테스트합니다.

#### 페이지 새로고침 (Page refreshing) {#page-refreshing}

사용자가 새로운 메시지를 보내면, 테이블에 자동으로 업데이트되는 기능을 구현해야 합니다. 계약을 실행하는 것 외에도, Send 버튼을 사용하여 현재 페이지를 다시 열어 같은 결과를 얻을 수 있습니다. `#table_view_offset#`는 변경 없이 페이지로 전달되어야 합니다.

Send 버튼에 `Page`와 `PageParams`를 추가하고, 코드는 다음과 같습니다.

```
Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
```


### 전체 페이지 코드 (Full page code) {#full-page-code-2}

이 부분은 응용 프로그램 페이지에 대한 많은 변경 사항을 설명합니다. 다음은 애플리케이션 페이지의 전체 코드입니다.

```
If(GetVar(table_view_offset)){
}.Else{
    SetVar(table_view_offset, 0)
}
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
    Div(Class: panel panel-primary) {
        Div(Class: panel-heading, Body: Table block)
        Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
        Div(Class: panel-footer text-right) {
            If(#table_view_offset# >= 25) {
                SetVar(offset_previous, Calculate(#table_view_offset# - 25))
                Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
            }
            If(#record_count# >= Calculate(#table_view_offset# + 25)) {
                SetVar(offset_next, Calculate(#table_view_offset# + 25))
                Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
            }
        }
    }
    Div(Class: panel panel-primary) {
    Form() {
        Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
        Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
    }
}
```

## 결론 (Conclusions) {#conclusions}

레이아웃 스타일, 액세스 권한 관리, 애플리케이션과 리소스 간의 상호 작용과 같은 중요한 주제에 대해 설명하기보다, 이 튜토리얼은 생태계를 위한 기본적인 애플리케이션 생성 방법을 소개합니다. 이러한 고급 주제에 대한 자세한 정보는 다른 관련 문서를 참조하십시오.
