# 컴파일러와 가상 머신 {#compiler-and-virtual-machine}

  - [소스 코드 저장 및 컴파일](#source-code-storage-and-compilation)
  - [가상 머신 구조](#virtual-machine-structures)
    - [VM 구조](#vm-structure)
    - [Block 구조](#block-structure)
    - [ObjInfo 구조](#objinfo-structure)
      - [ContractInfo 구조](#contractinfo-structure)
      - [FieldInfo 구조](#fieldinfo-structure)
      - [FuncInfo 구조](#funcinfo-structure)
      - [FuncName 구조](#funcname-structure)
      - [ExtFuncInfo 구조](#extfuncinfo-structure)
      - [VarInfo 구조](#varinfo-structure)
      - [ObjExtend 값](#objextend-value)
  - [가상 머신 명령](#virtual-machine-commands)
    - [ByteCode 구조](#bytecode-structure)
    - [명령 식별자](#command-identifiers)
    - [스택 연산 명령](#stack-operation-commands)
    - [Runtime 구조](#runtime-structure)
      - [blockStack 구조](#blockstack-structure)
    - [RunCode 함수](#runcode-function)
    - [가상 머신과 관련된 기타 함수들](#other-functions-for-operations-with-vm)
  - [컴파일러](#compiler)
  - [어휘 분석기](#lexical-analyzer)
    - [lextable/lextable.go](#lextable-lextable-go)
    - [lex.go](#lex-go)
  - [Needle 언어](#needle-language)
    - [렉서](#lexemes)
    - [타입](#types)
    - [표현식](#expressions)
    - [스코프](#scope)
    - [계약 실행](#contract-execution)
    - [Backus-Naur Form (BNF)](#backus-naur-form-bnf)


이 섹션에서는 프로그램 컴파일과 Needle 언어의 가상 머신(VM) 내에서의 동작에 대해 다룹니다.

## 소스 코드 저장 및 컴파일 {#source-code-storage-and-compilation}

계약과 함수는 Golang로 작성되며, 생태계의 계약 테이블에 저장됩니다.

계약이 실행될 때, 해당 계약의 소스 코드는 데이터베이스에서 읽혀서 바이트코드로 컴파일됩니다.

계약이 변경될 때, 소스 코드는 업데이트되어 데이터베이스에 저장됩니다. 그리고 소스 코드가 컴파일되어 해당 가상 머신의 바이트코드가 업데이트됩니다.

바이트코드는 물리적으로 저장되지 않으며, 프로그램이 다시 실행될 때마다 다시 컴파일됩니다.

각 생태계의 계약 테이블에 기술된 전체 소스 코드는 엄격한 순서로 가상 머신으로 컴파일되며, 가상 머신의 상태는 모든 노드에서 동일합니다.

계약이 호출될 때, 가상 머신은 어떠한 방식으로도 상태를 변경하지 않습니다. 어떠한 계약의 실행 또는 함수의 호출은 각 외부 호출 시 생성된 별도의 실행 스택에서 발생합니다.

각 생태계는 가상 생태계라고 불리는 것을 가질 수 있으며, 이는 블록체인 외부의 테이블과 함께 노드 내에서 사용될 수 있습니다. 이러한 경우, 해당 가상 생태계를 호스트하는 노드는 계약을 컴파일하고 자체 가상 머신을 생성합니다.

## 가상 머신 구조 {#virtual-machine-structures}

### VM 구조 {#vm-structure}

가상 머신은 다음과 같이 메모리에 구조화되어 있습니다.

```
type VM struct {
   Block
   ExtCost func(string) int64
   FuncCallsDB map[string]struct{}
   Extern bool
   ShiftContract int64
   logger *log.Entry
}
```

A VM 구조는 다음과 같은 요소들을 가지고 있습니다:

* Block - [block 구조]{#block-structure}를 포함합니다.
* ExtCost - 외부 Golang 함수를 실행하는 비용을 반환하는 함수입니다.
* FuncCallsDB - Golang 함수 이름들의 컬렉션입니다. 이 함수는 첫 번째 매개변수로 실행 비용을 반환합니다. 이러한 함수들은 데이터베이스 처리 비용을 계산하기 위해 EXPLAIN을 사용합니다.
* Extern - 계약이 외부 계약인지를 나타내는 부울 플래그입니다. VM이 생성될 때 true로 설정됩니다. 코드가 컴파일될 때 호출된 계약들은 표시되지 않습니다. 즉, 미래에 결정된 계약 코드를 호출할 수 있게 합니다.
* ShiftContract - VM에서 첫 번째 계약의 ID입니다.
* logger - VM 오류 로그 출력입니다.

### Block 구조 {#block-structure}

가상 머신은 **Block 타입** 객체들로 구성된 트리입니다.

블록은 일부 바이트코드를 포함하는 독립적인 단위입니다. 간단히 말해, 언어에서 중괄호(`{}`)로 감싸진 모든 것이 블록입니다.

예를 들어, 다음과 같은 코드는 함수를 가진 블록을 생성합니다. 이 블록은 if 문을 포함하는 또 다른 블록을 포함하고 있으며, 이 if 문은 while 문을 포함하는 블록을 포함합니다.


```
func my() {
   if true {
      while false {
      ...
      }
   }
}
```

블록은 아래와 같은 구조로 메모리에 구성되어 있습니다.

```
type Block struct {
   Objects map[string]*ObjInfo
   Type int
   Owner *OwnerInfo
   Info interface{}
   Parent *Block
   Vars []reflect.Type
   Code ByteCodes
   Children Blocks
}
```

블록 구조는 다음과 같은 요소들로 구성됩니다:

* **Objects** - [ObjInfo](#objinfo-structure) 포인터 타입의 내부 객체 맵입니다. 예를 들어, 블록 내에 변수가 있는 경우, 변수의 이름을 통해 해당 변수에 대한 정보를 얻을 수 있습니다.
* **Type** - 블록의 타입입니다. 함수 블록인 경우, 타입은 **ObjFunc**이고, 계약 블록인 경우, 타입은 **ObjContract**입니다.
* **Owner** - **OwnerInfo** 포인터 타입의 구조체입니다. 이 구조체는 컴파일된 계약의 소유자에 대한 정보를 포함하며, 계약 컴파일 시 지정되거나 **contracts** 테이블에서 얻을 수 있습니다.
* **Info** - 블록 타입에 따라 객체에 대한 정보를 포함합니다.
* **Parent** - 부모 블록을 가리키는 포인터입니다.
* **Vars** - 현재 블록 변수들의 타입을 포함하는 배열입니다.
* **Code** - 블록 자체의 바이트코드입니다. 블록으로 제어 권한이 전달될 때 (예: 함수 호출 또는 루프 본문), 이 바이트코드가 실행됩니다.
* **Children** - 함수 중첩, 루프, 조건문 등 하위 블록들을 포함하는 배열입니다.

### ObjInfo 구조 {#objinfo-structure}

ObjInfo 구조체는 내부 객체에 대한 정보를 포함합니다.

```
type ObjInfo struct {
   Type int
   Value interface{}
}
```

ObjInfo 구조는 다음과 같은 요소들로 구성됩니다:

* **Type**은 객체의 타입으로, 다음 중 하나의 값을 가집니다:
   * **ObjContract** – [contract](#contractinfo-structure);
   * **ObjFunc** - 함수;
   * **ObjExtFunc** - 외부 Golang 함수;
   * **ObjVar** - 변수;
   * **ObjExtend** - $name 변수.
* **Value** – 각 타입의 구조체를 포함합니다.

#### ContractInfo 구조 {#contractinfo-structure}

**ObjContract** 타입을 가리키며, **Value** 필드에는 **ContractInfo** 구조체가 포함됩니다.


```
type ContractInfo struct {
   ID uint32
   Name string
   Owner *OwnerInfo
   Used map[string]bool
   Tx *[]*FieldInfo
}
```

ContractInfo 구조는 다음과 같은 요소들로 구성됩니다:

* **ID** - 계약 ID로, 계약을 호출할 때 블록체인에 표시됩니다.
* **Name** - 계약 이름입니다.
* **Owner** - 계약에 대한 다른 정보입니다.
* **Used** - 호출된 계약 이름들의 맵입니다.
* **Tx** - 계약의 [data section](script.md#data-section) 에 기술된 데이터 배열입니다.

#### FieldInfo 구조 {#fieldinfo-structure}

FieldInfo 구조는 **ContractInfo** 구조에서 사용되며, 계약의 [data section](script.md#data-section) 에 있는 요소들을 설명합니다.


```
type FieldInfo struct {
   Name string
   Type reflect.Type
   Original uint32
   Tags string
}
```

FieldInfo 구조는 다음과 같은 요소들로 구성됩니다:

* **Name** - 필드 이름입니다.
* **Type** - 필드 타입입니다.
* **Original** - 선택적 필드입니다.
* **Tags** - 이 필드에 대한 추가적인 라벨입니다.

#### FuncInfo 구조 {#funcinfo-structure}

ObjFunc 타입을 가리키며, Value 필드에는 FuncInfo 구조체가 포함됩니다.


```
type FuncInfo struct {
   Params []reflect.Type
   Results []reflect.Type
   Names *map[string]FuncName
   Variadic bool
   ID uint32
}
```

FuncInfo 구조는 다음과 같은 요소들로 구성됩니다:

* **Params** - 매개변수 타입의 배열입니다.
* **Results** - 반환 타입의 배열입니다.
* **Names** - 테일 함수의 데이터 맵입니다. 예를 들어, `DBFind().Columns()`과 같은 함수입니다.
* **Variadic** - 함수가 가변 개수의 매개변수를 가질 수 있는 경우 true입니다.
* **ID** - 함수 ID입니다.

#### FuncName 구조 {#funcname-structure}

FuncName 구조체는 FuncInfo에 사용되며, 테일 함수의 데이터를 설명합니다.

```
type FuncName struct {
   Params []reflect.Type
   Offset []int
   Variadic bool
}
```

FuncName 구조는 다음과 같은 요소들로 구성됩니다:

* **Params** - 매개변수 타입의 배열입니다.
* **Offset** - 이러한 변수들에 대한 오프셋 배열입니다. 사실, 함수 내의 모든 매개변수 값은 점(.)으로 초기화될 수 있습니다.
* **Variadic** - 테일 함수가 가변 개수의 매개변수를 가질 수 있는 경우 true입니다.

#### ExtFuncInfo 구조 {#extfuncinfo-structure}

ObjExtFunc 타입을 가리키며, Value 필드에는 ExtFuncInfo 구조체가 포함됩니다. 이는 Golang 함수를 설명하기 위해 사용됩니다.

```
type ExtFuncInfo struct {
   Name string
   Params []reflect.Type
   Results []reflect.Type
   Auto []string
   Variadic bool
   Func interface{}
}
```

ExtFuncInfo 구조는 다음과 같은 요소들로 구성됩니다:

* **Name**, **Params**, **Results** 매개변수는 [FuncInfo](#funcinfo-structure) 와 동일한 구조를 가지고 있습니다.
* **Auto** - 변수의 배열입니다. 함수로 전달되는 추가적인 매개변수입니다. 예를 들어, SmartContract sc 타입의 변수입니다.
* **Func** - Golang 함수입니다.

#### VarInfo 구조 {#varinfo-structure}

ObjVar 타입을 가리키며, Value 필드에는 VarInfo 구조체가 포함됩니다.

```
type VarInfo struct {
   Obj *ObjInfo
   Owner *Block
}
```

VarInfo 구조는 다음과 같은 요소들로 구성됩니다:

* **Obj** - 변수의 타입과 값에 대한 정보입니다.
* **Owner** - 소유 블록을 가리키는 포인터입니다.

#### ObjExtend 값 {#objextend-value}

ObjExtend 타입을 가리키며, Value 필드에는 변수 또는 함수의 이름을 포함하는 문자열이 포함됩니다.

## 가상 머신 명령 {#virtual-machine-commands}

### ByteCode 구조 {#bytecode-structure}

바이트코드는 **ByteCode** 타입 구조체의 연속입니다.

```
type ByteCode struct {
   Cmd uint16
   Value interface{}
}
```

이 구조체는 다음과 같은 필드들을 가지고 있습니다:

* **Cmd** - 저장 명령의 식별자입니다.
* **Value** - 피연산자(값)를 포함합니다.

일반적으로, 명령은 스택의 최상위 요소에 대한 작업을 수행하고 필요한 경우 결과 값을 스택에 기록합니다.

### 명령 식별자 {#command-identifiers}

가상 머신 명령의 식별자는 vm/cmds_list.go 파일에서 설명됩니다.

* **cmdPush** - Value 필드의 값을 스택에 넣습니다. 예를 들어, 숫자와 문자열을 스택에 넣습니다.
* **cmdVar** - 변수의 값을 스택에 넣습니다. Value에는 VarInfo 구조체의 포인터와 변수에 대한 정보가 포함됩니다.
* **cmdExtend** - 외부 변수의 값을 스택에 넣습니다. Value에는 변수 이름(달러 기호로 시작)을 포함하는 문자열이 있습니다.
* **cmdCallExtend** - 외부 함수(달러 기호로 시작)를 호출합니다. 함수의 매개변수는 스택에서 가져오고 결과는 스택에 저장됩니다. Value에는 함수 이름(달러 기호로 시작)이 포함됩니다.
* **cmdPushStr** - Value에 있는 문자열을 스택에 넣습니다.
* **cmdCall** - 가상 머신 함수를 호출합니다. Value에는 **ObjInfo** 구조체가 포함됩니다. 이 명령은 **ObjExtFunc** golang 함수와 **ObjFunc** Needle 함수에 적용됩니다. 함수를 호출하는 경우, 매개변수는 스택에서 가져오고 결과 값은 스택에 저장됩니다.
* **cmdCallVari** - **cmdCall** 명령과 유사하며, 가변 개수의 매개변수를 가진 함수를 호출합니다.
* **cmdReturn** - 함수를 종료하는 데 사용됩니다. 반환 값은 스택에 넣으며, Value 필드는 사용되지 않습니다.
* **cmdIf** - Value 필드에 전달된 **block** 구조체의 바이트코드로 제어를 전달합니다. 스택의 최상위 요소가 *valueToBool* 함수에 의해 호출되고 `true`가 반환될 때만 제어가 전달됩니다. 그렇지 않은 경우, 다음 명령으로 제어가 전달됩니다.
* **cmdElse** - 이 명령은 **cmdIf**와 동일한 방식으로 작동하지만, 스택의 최상위 요소가 *valueToBool* 함수에 의해 호출되고 `false`가 반환될 때에만 지정된 블록으로 제어가 전달됩니다.
* **cmdAssignVar** - Value에서 **VarInfo** 타입의 변수 목록을 가져옵니다. 이러한 변수는 **cmdAssign** 명령을 사용하여 값을 가져옵니다.
* **cmdAssign** - 스택의 값을 **cmdAssignVar** 명령으로 얻은 변수에 할당합니다.
* **cmdLabel** - while 루프에서 제어가 반환될 때 레이블을 정의합니다.
* **cmdContinue** - 이 명령은 **cmdLabel** 레이블로 제어를 전달합니다. 루프의 새로운 반복을 실행할 때 Value는 사용되지 않습니다.
* **cmdWhile** - 스택의 최상위 요소를 valueToBool로 확인합니다. 이 값이 `true`인 경우, **block** 구조체가 value 필드로부터 호출됩니다.
* **cmdBreak** - 루프를 종료합니다.
* **cmdIndex** - Value를 사용하지 않고, 맵 또는 배열에서 인덱스로 값을 스택에 넣습니다. 예를 들어, `(map | array) (index value) => (map | array [index value])`;
* **cmdSetIndex** - Value를 사용하지 않고, 맵 또는 배열의 요소에 스택의 최상위 요소의 값을 할당합니다. 예를 들어, `(map | array) (index value) (value) => (map | array)`;
* **cmdFuncName** - 점 .으로 구분된 순차적인 설명을 사용하여 전달되는 매개변수를 추가합니다. 예를 들어, `func name => Func (...) .Name (...)`;
* **cmdUnwrapArr** - 스택의 최상위 요소가 배열인 경우에 대한 불리언 플래그를 정의합니다.
* **cmdMapInit** - 맵의 값을 초기화합니다.
* **cmdArrayInit** - 배열의 값을 초기화합니다.
* **cmdError** - 이 명령은 계약 또는 함수가 지정된 `error, warning, info`로 종료될 때 생성됩니다.


### 스택 연산 명령 (#stack-operation-commands)

> 참고

> 현재 버전에서는 자동 유형 변환이 이러한 명령에 완전히 적용되지 않습니다. 예를 들어,

> `string + float | int | decimal => float | int | decimal, float + int | str => float, but int + string => runtime error`.

다음은 직접 스택 처리를 위한 명령입니다. 값 필드는 이러한 명령에서 사용되지 않습니다.

* **cmdNot** - 논리 부정. `(val) => (!ValueToBool(val))`;
* **cmdSign** - 부호 변경. `(val) => (-val)`;
* **cmdAdd** - 덧셈. `(val1)(val2) => (val1 + val2)`;
* **cmdSub** - 뺄셈. `(val1)(val2) => (val1-val2)`;
* **cmdMul** - 곱셈. `(val1)(val2) => (val1 * val2)`;
* **cmdDiv** - 나눗셈. `(val1)(val2) => (val1 / val2)`;
* **cmdAnd** - 논리 AND. `(val1)(val2) => (valueToBool(val1) && valueToBool(val2))`;
* **cmdOr** - 논리 OR. `(val1)(val2) => (valueToBool(val1) || valueToBool(val2))`;
* **cmdEqual** - 동등 비교, bool이 반환됩니다. `(val1)(val2) => (val1 == val2)`;
* **cmdNotEq** - 부등호 비교, bool이 반환됩니다. `(val1)(val2) => (val1 != val2)`;
* **cmdLess** - 작다 비교, bool이 반환됩니다. `(val1)(val2) => (val1 < val2)`;
* **cmdNotLess** - 크거나 같다 비교, bool이 반환됩니다. `(val1)(val2) => (val1 >= val2)`;
* **cmdGreat** - 크다 비교, bool이 반환됩니다. `(val1)(val2) => (val1 > val2)`;
* **cmdNotGreat** - 작거나 같다 비교, bool이 반환됩니다. `(val1)(val2) => (val1 <= val2)`.

### Runtime 구조 {#runtime-structure}

바이트코드 실행은 가상 머신에 영향을 미치지 않습니다. 예를 들어 다양한 기능과 계약을 단일 가상 머신에서 동시에 실행할 수 있습니다. 런타임 구조는 함수와 계약은 물론 모든 식과 바이트코드를 실행하는 데 사용됩니다.

```
type RunTime struct {
   stack []interface{}
   blocks []*blockStack
   vars []interface{}
   extend *map[string]interface{}
   vm *VM
   cost int64
   err error
}
```

* **stack** - 실행에 사용되는 스택입니다.
* **blocks** - 블록 호출 스택입니다.
* **vars** - 변수 스택입니다. 블록에서 바이트코드가 호출될 때 변수가 변수 스택에 추가됩니다. 블록을 나갈 때 변수 스택의 크기는 이전 값으로 돌아갑니다.
* **extend** - 외부 변수 (`$name`)의 값이 포함된 맵에 대한 포인터입니다.
* **vm** - 가상 머신 포인터입니다.
* **cost** - 실행 비용의 연료 단위입니다.
* **err** - 실행 중에 발생한 오류입니다.

#### blockStack 구조 {#blockstack-structure}

blockStack 구조는 Runtime 구조에서 사용됩니다.

```
type blockStack struct {
   Block *Block
   Offset int
}
```

* **Block** - 실행 중인 블록에 대한 포인터입니다.
* **Offset** - 지정된 블록의 바이트코드에서 마지막으로 실행된 명령의 오프셋입니다.

### RunCode 함수 {#runcode-function}

바이트코드는 **RunCode** 함수에서 실행됩니다. 이 함수에는 각 바이트코드 명령에 대해 해당 작업을 수행하는 루프가 포함되어 있습니다. 바이트코드를 처리하기 전에 필요한 데이터를 초기화해야 합니다.

새로운 블록은 다른 블록에 추가됩니다.

```
rt.blocks = append(rt.blocks, &blockStack{block, len(rt.vars)})
```

다음으로 tail 함수의 관련 매개변수 정보를 가져옵니다. 이러한 매개변수는 스택의 마지막 요소에 포함됩니다.

```
var namemap map[string][]interface{}
if block.Type == ObjFunc && block.Info.(*FuncInfo).Names != nil {
   if rt.stack[len(rt.stack)-1] != nil {
      namemap = rt.stack[len(rt.stack)-1].(map[string][]interface{})
   }
   rt.stack = rt.stack[:len(rt.stack)-1]
}
```

그런 다음 현재 블록에 정의된 모든 변수를 초기값으로 초기화해야 합니다.

```
start := len(rt.stack)
varoff := len(rt.vars)
for vkey, vpar := range block.Vars {
   rt.cost--
   var value interface{}
```

함수의 변수도 변수이므로 함수 자체에서 설명하는 순서대로 스택의 마지막 요소에서 변수를 검색해야 합니다.

```
   if block.Type == ObjFunc && vkey <len(block.Info.(*FuncInfo).Params) {
      value = rt.stack[start-len(block.Info.(*FuncInfo).Params)+vkey]
   } else {
```

지역 변수를 초기 값으로 초기화합니다.

```
      value = reflect.New(vpar).Elem().Interface()

      if vpar == reflect.TypeOf(map[string]interface{}{}) {

         value = make(map[string]interface{})
      } else if vpar == reflect.TypeOf([]interface{}{}) {
         value = make([]interface{}, 0, len(rt.vars)+1)
      }
   }
   rt.vars = append(rt.vars, value)
}
```

다음으로 tail 함수에 전달된 변수 매개변수의 값을 업데이트합니다.

```
if namemap != nil {
   for key, item := range namemap {
      params := (*block.Info.(*FuncInfo).Names)[key]
      for i, value := range item {
         if params.Variadic && i >= len(params.Params)-1 {
```

전달된 가변 매개변수가 가변 개수의 매개변수에 속하는 경우 이러한 매개변수는 변수 배열로 결합됩니다.

```
            off := varoff + params.Offset[len(params.Params)-1]
            rt.vars[off] = append(rt.vars[off].([]interface{}), value)
         } else {
            rt.vars[varoff+params.Offset[i]] = value
         }
      }
   }
}
```

그런 다음 스택의 맨 위에서 함수 매개 변수로 전달된 값을 삭제하여 스택을 이동하기만 하면 됩니다. 값을 변수 배열에 복사했습니다.

```
if block.Type == ObjFunc {
   start -= len(block.Info.(*FuncInfo).Params)
}
```

바이트 코드 명령 루프가 완료되면 스택을 올바르게 지워야 합니다.

```
last := rt.blocks[len(rt.blocks)-1]
```

블록 스택에서 현재 블록을 삭제합니다.

```
rt.blocks = rt.blocks[:len(rt.blocks)-1]
if status == statusReturn {
```

이미 실행된 함수에서 성공적으로 종료되면 이전 스택의 끝에 반환 값을 추가합니다.

```
   if last.Block.Type == ObjFunc {
      for count := len(last.Block.Info.(*FuncInfo).Results); count > 0; count-- {
         rt.stack[start] = rt.stack[len(rt.stack)-count]
         start++
      }
      status = statusNormal
   } else {
```

보시다시피 함수를 실행하지 않으면 스택 상태를 복원하지 않고 함수를 그대로 종료합니다. 그 이유는 함수에서 실행된 루프와 조건부 구조도 바이트코드 블록이기 때문입니다.

```
   return

   }
}

rt.stack = rt.stack[:start]
```

### 가상 머신과 관련된 기타 함수들 {#other-functions-for-operations-with-vm}

**NewVM** 함수를 사용하여 가상 머신을 생성할 수 있습니다. 각 가상 머신에는 **ExecContract**, **MemoryUsage**, **CallContract**, **Settings**와 같은 네 개의 함수가 **Extend** 함수를 통해 추가됩니다.


```
for key, item := range ext.Objects {
   fobj := reflect.ValueOf(item).Type()
```

전달된 모든 객체를 순회하고 함수만 봅니다.

```
   switch fobj.Kind() {
   case reflect.Func:
```
함수에 대해 수신된 정보에 따라 **ExtFuncInfo** 구조를 채우고 해당 구조를 최상위 맵 **Objects**에 이름별로 추가합니다.

```
   data := ExtFuncInfo{key, make([]reflect.Type, fobj.NumIn()), make([]reflect.Type, fobj.NumOut()),
   make([]string, fobj.NumIn()), fobj.IsVariadic(), item}
   for i := 0; i <fobj.NumIn(); i++ {
```

**ExtFuncInfo** 구조에는 **Auto** 매개변수 배열이 있습니다. 일반적으로 첫 번째 매개변수는 `sc *SmartContract` 또는 `rt *Runtime`이며 일부 golang 기능을 실행하는 데 필요하기 때문에 니들 언어에서 전달할 수 없습니다. 따라서 이러한 함수가 호출될 때 이러한 변수가 자동으로 사용되도록 지정합니다. 이 경우 위의 네 가지 함수 중 첫 번째 매개변수는 `rt *Runtime`입니다.

```
   if isauto, ok := ext.AutoPars[fobj.In(i).String()]; ok {
      data.Auto[i] = isauto
   }
```

매개변수 할당에 대한 정보입니다.

```
      data.Params[i] = fobj.In(i)
   }
```

그리고 반환 값의 유형.

```
for i := 0; i <fobj.NumOut(); i++ {
   data.Results[i] = fobj.Out(i)
}
```

컴파일러가 나중에 계약을 사용할 때 찾을 수 있도록 루트 **Objects** 에 함수를 추가합니다.

```
      vm.Objects[key] = &ObjInfo{ObjExtFunc, data}
   }

}
```

## 컴파일러 {#compiler}

compile.go 파일의 함수는 어휘 분석기에서 얻은 토큰 배열을 컴파일하는 역할을 합니다. 컴파일은 조건부로 두 가지 수준으로 나눌 수 있습니다. 최상위 수준에서는 함수, 계약, 코드 블록, 조건문 및 루프 문, 변수 정의 등을 처리합니다. 하위 수준에서는 코드 블록의 식이나 루프 및 조건문의 조건을 컴파일합니다.

먼저 간단한 하위 레벨부터 시작하겠습니다. **compileEval** 함수에서 표현식을 바이트코드로 변환할 수 있습니다. 우리는 스택이 있는 가상 머신을 사용하기 때문에 일반 중위 레코드 표현식을 후위 표기법이나 역폴란드어 표기법으로 변환해야 합니다. 예를 들어 `1+2`를 `12+`로 변환하고 `1`과 `2`를 스택에 넣습니다. 그런 다음 스택의 마지막 두 요소에 더하기 연산을 적용하고 결과를 스택에 씁니다. 이 [변환](https://master.virmandy.net/perevod-iz-infiksnoy-notatsii-v-postfiksnuyu-obratnaya-polskaya-zapis/) 알고리즘은 인터넷에서 찾을 수 있습니다.

전역 변수 `opers = map [uint32] operPrior` 에는 역 폴란드 표기법으로 변환하는 데 필요한 작업의 우선 순위가 포함되어 있습니다.

**compileEval** 함수의 시작 부분에서 다음과 같은 변수들이 정의됩니다:

* **buffer** - 바이트코드 명령어의 임시 버퍼
* **bytecode** - 최종적인 바이트코드 명령어의 버퍼
* **parcount** - 함수 호출 시 매개변수를 계산하는 데 사용되는 임시 버퍼
* **setIndex** - 작업 프로세스에서 변수가 map이나 array 요소에 할당될 때 true로 설정됩니다. 예를 들어, `a["my"] = 10`과 같이 사용될 때 특정한 **cmdSetIndex** 명령어를 사용해야 합니다.

루프에서 토큰을 가져와 해당 토큰을 처리합니다. 예를 들어, 괄호가 발견되면 식 분석을 중단합니다. 문자열을 이동할 때 이전 문장이 연산인지, 괄호 안에 있는지를 확인하고, 그렇지 않은 경우 식 분석이 종료됩니다.

```
case isRCurly, isLCurly:
   i--
   if prevLex == isComma || prevLex == lexOper {
      return errEndExp
   }
   break main
case lexNewLine:
   if i > 0 && ((*lexems)[i-1].Type == isComma || (*lexems)[i-1].Type == lexOper) {
      continue main
   }
   for k := len(buffer) - 1; k >= 0; k-- {
   if buffer[k].Cmd == cmdSys {
      continue main
   }
}
break main

```

일반적으로 알고리즘 자체는 역 폴란드 표기법으로 변환하는 알고리즘에 해당합니다. 필요한 컨트랙트, 함수, 인덱스 호출, 파싱 중에 만나지 못한 기타 사항, lexIdent 유형 토큰 파싱 옵션 등을 고려하여 이 이름을 가진 변수, 함수 또는 컨트랙트를 확인합니다. 아무 것도 발견되지 않고 이것이 함수 또는 계약 호출이 아닌 경우 오류를 나타냅니다.

```
objInfo, tobj := vm.findObj(lexem.Value.(string), block)
if objInfo == nil && (!vm.Extern || i> *ind || i >= len(*lexems)-2 || (*lexems)[i+1].Type != isLPar) {
   return fmt.Errorf(`unknown identifier %s`, lexem.Value.(string))
}
```

이러한 상황에 직면할 수 있으며 계약 호출에 대해서는 나중에 설명합니다. 이 예제에서 이름이 같은 함수나 변수가 없으면 계약을 호출해야 한다고 생각합니다. 이 컴파일된 언어에서는 계약과 함수 호출 사이에 차이가 없습니다. 하지만 바이트코드에 사용된 **ExecContract** 함수를 통해 컨트랙트를 호출해야 합니다.

```
if objInfo.Type == ObjContract {
   if objInfo.Value != nil {
      objContract = objInfo.Value.(*Block)
   }
   objInfo, tobj = vm.findObj(`ExecContract`, block)
   isContract = true
}
```

우리는 `count` 에 지금까지 변수의 수를 기록하고 함수 매개변수의 수와 함께 스택에도 기록됩니다. 각 후속 매개변수 감지에서 스택의 마지막 요소에서 이 숫자를 한 단위씩 늘리면 됩니다.

```
count := 0
if (*lexems)[i+2].Type != isRPar {
   count++
}
```

우리는 컨트랙트에 대한 호출된 매개변수 목록을 가지고 있으며, 컨트랙트가 호출된 경우를 표시해야 합니다. 계약이 매개변수 없이 호출되면 **ExecContract** 를 호출하기 위해 두 개의 빈 매개변수를 추가하여 최소 두 개의 매개변수를 가져와야 합니다.

```
if isContract {
   name := StateName((*block)[0].Info.(uint32), lexem.Value.(string))
   for j := len(*block) - 1; j >= 0; j-- {
   topblock := (*block)[j]
      if topblock.Type == ObjContract {
         if topblock.Info.(*ContractInfo).Used == nil {
            topblock.Info.(*ContractInfo).Used = make(map[string]bool)
         }
         topblock.Info.(*ContractInfo).Used[name] = true
      }
   }
   bytecode = append(bytecode, &ByteCode{cmdPush, name})
   if count == 0 {
      count = 2
      bytecode = append(bytecode, &ByteCode{cmdPush, ""})
      bytecode = append(bytecode, &ByteCode{cmdPush, ""})
   }
   count++
}
```

다음에 대괄호가 있으면 **cmdIndex** 명령을 추가하여 인덱스로 값을 가져옵니다.

```
if (*lexems)[i+1].Type == isLBrack {
   if objInfo == nil || objInfo.Type != ObjVar {
      return fmt.Errorf(`unknown variable %s`, lexem.Value.(string))
   }
   buffer = append(buffer, &ByteCode{cmdIndex, 0})
}
```

**CompileBlock** 함수는 개체 트리와 식 독립적인 바이트코드를 생성할 수 있습니다. 컴파일 프로세스는 어휘 분석기와 마찬가지로 유한 상태 머신을 기반으로 하지만 다음과 같은 차이점이 있습니다. 첫째, 기호가 아닌 토큰을 사용합니다. 둘째, 모든 상태 및 전환에서 *상태* 변수를 즉시 설명합니다. 토큰 유형별로 인덱싱된 개체 배열을 나타냅니다. 각 토큰은 *compileState* 구조를 가지며 *NewState* 에 새로운 상태가 지정됩니다. 해결한 구조가 명확하면 *Func* 필드에 핸들러의 기능을 지정할 수 있습니다.

기본 상태를 예로 들어 살펴보겠습니다.

줄바꿈이나 주석을 만나면 동일한 상태를 유지합니다. **contract** 키워드를 만나면 상태를 *stateContract*로 변경하고 구조 구문 분석을 시작합니다. **func** 키워드를 만나면 상태를 *stateFunc*로 변경합니다. 다른 토큰이 수신되면 함수 생성 오류가 호출됩니다.

```
{// stateRoot
   lexNewLine: {stateRoot, 0},
   lexKeyword | (keyContract << 8): {stateContract | statePush, 0},
   lexKeyword | (keyFunc << 8): {stateFunc | statePush, 0},
   lexComment: {stateRoot, 0},
   0: {errUnknownCmd, cfError},
},
```

**func** 키워드를 만났고 상태를 *stateFunc*로 변경했다고 가정합니다. 함수 이름은 **func** 키워드 뒤에 와야 하므로 함수 이름을 변경해도 동일한 상태를 유지합니다. 다른 모든 토큰의 경우 해당 오류를 생성합니다. 토큰 식별자에서 함수 이름을 얻으면 함수의 매개변수를 얻을 수 있는 *stateFParams* 상태로 이동합니다.

```
{// stateFunc
   lexNewLine: {stateFunc, 0},
   lexIdent: {stateFParams, cfNameBlock},
   0: {errMustName, cfError},
},
```

위의 작업과 동시에 **fNameBlock** 함수를 호출합니다. Block 구조는 statePush 표시로 생성되며 버퍼에서 가져와 필요한 데이터로 채웁니다. **fNameBlock** 기능은 계약 및 기능(내포된 기능 포함)에 적합합니다. *Info* 필드를 해당 구조로 채우고 부모 블록의 *Objects*에 자신을 기록합니다. 이런 식으로 지정된 이름으로 함수 또는 계약을 호출할 수 있습니다. 마찬가지로 모든 상태와 변수에 해당하는 함수를 만듭니다. 이러한 기능은 일반적으로 매우 작으며 가상 머신 트리를 구성할 때 일부 임무를 수행합니다.
```
func fNameBlock(buf *[]*Block, state int, lexem *Lexem) error {
   var itype int
   prev := (*buf)[len(*buf)-2]
   fblock := (*buf)[len(*buf)-1]
   name := lexem.Value.(string)
   switch state {
      case stateBlock:
         itype = ObjContract
         name = StateName((*buf)[0].Info.(uint32), name)
         fblock.Info = &ContractInfo{ID: uint32(len(prev.Children) - 1), Name: name,
         Owner: (*buf)[0].Owner}
      default:
         itype = ObjFunc
         fblock.Info = &FuncInfo{}
   }
   fblock.Type = itype
   prev.Objects[name] = &ObjInfo{Type: itype, Value: fblock}
   return nil
}
```

**CompileBlock** 함수는 모든 토큰을 순회하며 states에 설명된 토큰에 따라 상태를 전환합니다. 거의 모든 추가 토큰은 추가 프로그램 코드와 대응됩니다.

* **statePush** - **Block** 객체를 객체 트리에 추가합니다.
* **statePop** - 블록이 닫는 중괄호로 끝나는 경우 사용됩니다.
* **stateStay** - 새로운 상태로 전환할 때 현재 마크를 유지해야 합니다.
* **stateToBlock** - *while*과 *if*를 처리하기 위해 **stateBlock** 상태로 전환합니다. 표현식을 처리한 후 중괄호 내의 블록을 처리해야 합니다.
* **stateToBody** - **stateBody** 상태로 전환합니다.
* **stateFork** - 마크된 위치를 저장합니다. 식이 식별자로 시작하거나 `$`가 포함된 이름인 경우 함수 호출이나 할당을 수행할 수 있습니다.
* **stateToFork** - **stateFork**에 저장된 토큰을 가져옵니다. 이 토큰은 프로세스 함수로 전달될 것입니다.
* **stateLabel** - **cmdLabel** 명령어를 삽입하기 위해 사용됩니다. *while* 구조에는 이 플래그가 필요합니다.
* **stateMustEval** - *if*와 *while* 구조의 시작 부분에서 조건식의 유효성을 확인합니다.

**CompileBlock** 함수 외에도 **FlushBlock** 함수에 대해 언급해야 합니다. 그러나 문제는 블록 트리가 기존 가상 머신과 독립적으로 구성된다는 점입니다. 보다 정확히 말하면, 가상 머신에 존재하는 함수와 계약에 대한 정보를 얻지만, 컴파일된 블록은 별도의 트리로 수집합니다. 그렇지 않으면 컴파일 중에 오류가 발생하면 가상 머신을 이전 상태로 롤백해야 합니다. 따라서 컴파일 트리로 따로 이동하지만 컴파일이 성공한 후에는 **FlushContract** 함수를 호출해야 합니다. 이 함수는 완성된 블록 트리를 현재 가상 머신에 추가합니다. 컴파일 단계는 이제 완료되었습니다.


## 어휘 분석기 {#lexical-analyzer}

다음과 같은 유형의 토큰 시퀀스를 형성하기 위해 렉시컬 분석기는 들어오는 문자열을 처리합니다:

* **lexSys** - 시스템 토큰, 예를 들면: `{}, [], (), ,, .` 등
* **lexOper** - 연산 토큰, 예를 들면: `+, -, /, \, *` 등
* **lexNumber** - 숫자
* **lexident** - 식별자
* **lexNewline** - 개행 문자
* **lexString** - 문자열
* **lexComment** - 주석
* **lexKeyword** - 키워드
* **lexType** - 타입
* **lexExtend** - 외부 변수나 함수를 참조하는 것, 예를 들면: `$myname`

현재 버전에서는 파싱을 위해 초기에 [script/lextable/lextable.go](#lextable-lextable-go) 파일을 사용하여 변환 표(finite state machine)가 초기에 작성되고 lex_table.go 파일에 작성됩니다. 일반적으로 파일에 의해 초기에 생성된 변환 표를 제거하고 시작할 때 메모리에 변환 표(`init()`)를 생성할 수 있습니다. 렉시컬 분석 자체는 [lex.go](#lex-go) 파일의 lexParser 함수에서 발생합니다.

### lextable/lextable.go {#lextable-lextable-go}

여기에서는 작업할 알파벳을 정의하고 유한 상태 기계가 다음으로 수신한 기호에 따라 상태가 어떻게 변하는지를 설명합니다.

*states*는 상태 목록을 포함하는 JSON 객체입니다.

특정 기호를 제외하고 `d`는 상태에 지정되지 않은 모든 기호를 나타냅니다.
`n`은 0x0a를 나타내며, `s`는 공백을 나타내며, `q`는 역따옴표를 나타내며, `Q`는 쌍따옴표를 나타내며, `r`은 문자 >= 128을 나타내며, `a`는 AZ와 az를 나타내며, `1`은 1-9를 나타냅니다.

이러한 상태의 이름은 키이며, 가능한 값은 값 객체에 나열됩니다. 그런 다음 각 그룹에 대한 전이를 수행하기 위해 새로운 상태가 있습니다. 그런 다음 토큰의 이름이 나옵니다. 초기 상태로 돌아가야 하는 경우, 세 번째 매개변수는 현재 기호를 처리하는 방법을 나타내는 서비스 토큰입니다.

예를 들어, main 상태와 수신된 문자 `/`가 있다면, `"/": ["solidus", "", "push next"]`입니다.

* **push** - 별도의 스택에 현재 상태를 기억하도록 지시합니다.
* **next** - 다음 문자로 이동하면서 동시에 상태를 **solidus**로 변경합니다. 그 후에 다음 문자를 가져와 **solidus** 상태를 확인합니다.

다음 문자가 `/` 또는 `/*`인 경우 `//` 또는 `/*`로 시작하기 때문에 **comment** 상태로 이동합니다. 당연히 각 주석은 다른 상태로 종료하기 때문에 다른 기호로 끝납니다.

다음 문자가 `/`와 `*`이 아닌 경우, 스택에 있는 모든 것을 **lexOper** 유형 태그로 기록하고 스택을 지우고 main 상태로 돌아갑니다.

다음 모듈은 상태 트리를 숫자 배열로 변환하여 *lex_table.go* 파일에 작성합니다.

첫 번째 루프에서는 유효한 기호들의 알파벳을 형성합니다.

```
for ind, ch := range alphabet {
   i := byte(ind)
```
또한 **state2int**에서는 각 상태에 고유한 시퀀스 식별자를 제공합니다.

```
   state2int := map[string]uint{`main`: 0}
   if err := json.Unmarshal([]byte(states), &data); err == nil {
   for key := range data {
   if key != `main` {
   state2int[key] = uint(len(state2int))
```

모든 상태와 상태의 각 세트 및 세트의 각 기호를 순회할 때 3바이트 숫자 [new state identifier (0 = main)] + [token type ( 0-no token)] + [token] 을 씁니다. .
*table* 배열의 이차원성은 *alphabet* 배열에서 상태와 34개의 입력 기호로 나누어져 동일한 순서로 배열된다는 것입니다.
우리는 *table*의 0행에 있는 *main* 상태에 있습니다. 첫 번째 문자를 가져와서 *알파벳* 배열에서 해당 인덱스를 찾고 주어진 인덱스가 있는 열에서 값을 가져옵니다. 받은 값부터 시작하여 하위 바이트의 토큰을 받습니다. 구문 분석이 완료되면 두 번째 바이트는 수신된 토큰 유형을 나타냅니다. 세 번째 바이트에서는 다음 새 상태의 인덱스를 받습니다.
이들 모두는 *lex.go*의 **lexParser** 함수에 자세히 설명되어 있습니다.
새로운 문자를 추가하려면 *alphabet* 배열에 추가하고 *AlphaSize* 상수의 양을 늘려야 합니다. 새로운 심볼 조합을 추가하려면 기존 옵션과 마찬가지로 상태에 설명해야 합니다. 위 작업 후 *lextable.go* 파일을 실행하여 *lex_table.go* 파일을 업데이트합니다.

### lex.go {#lex-go}
**lexParser** 함수는 어휘 분석을 직접 생성하고 들어오는 문자열을 기반으로 받은 태그 배열을 반환합니다. 토큰의 구조를 분석해 보겠습니다.

```
type Lexem struct {
   Type  uint32 // Type of the lexem
   Value interface{} // Value of lexem
   Line  uint32 // Line of the lexem
   Column uint32 // Position inside the line
}
```

* **Type** - 토큰 유형입니다. 다음 값 중 하나를 가집니다: `lexSys, lexOper, lexNumber, lexIdent, lexString, lexComment, lexKeyword, lexType, lexExtend`.
* **Value** - 토큰 값입니다. 값의 유형은 토큰 유형에 따라 다릅니다. 자세히 분석해보겠습니다:
   * **lexSys** - 괄호, 쉼표 등이 포함됩니다. 이 경우 `Type = ch << 8 | lexSys`로 표시되며, `isLPar ... isRBrack` 상수를 참조하십시오. 값은 uint32 비트입니다.
   * **lexOper** - 값은 uint32 형식으로 표시되는 동등한 문자열 시퀀스입니다. `isNot ... isOr` 상수를 참조하십시오.
   * **lexNumber** - 숫자는 int64 또는 float64 형식으로 저장됩니다. 소수점이 있는 경우 float64로 처리됩니다.
   * **lexIdent** - 식별자는 문자열로 저장됩니다.
   * **lexNewLine** - 개행 문자입니다. 행 및 토큰 위치를 계산하는 데 사용됩니다.
   * **lexString** - 문자열은 문자열로 저장됩니다.
   * **lexComment** - 주석은 문자열로 저장됩니다.
   * **lexKeyword** - 키워드의 경우 해당 인덱스만 저장됩니다. `keyContract ... keyTail` 상수를 참조하십시오. 이 경우 `Type = KeyID << 8 | lexKeyword`입니다. 또한, `true, false, nil` 키워드는 즉시 lexNumber 유형의 토큰으로 변환되며, 해당하는 `bool` 및 `intreface{}` 유형이 사용됩니다.
   * **lexType** - 해당하는 `reflect.Type` 유형 값이 포함됩니다.
   * **lexExtend** - `$`로 시작하는 식별자입니다. 이러한 변수와 함수는 외부에서 전달되므로 특수 유형의 토큰에 할당됩니다. 이 값은 `$`로 시작하지 않는 이름으로 문자열로 표시됩니다.
* **Line** - 토큰이 발견된 줄입니다.
* **Column** - 줄 내 위치입니다.

**lexParser** 함수를 자세히 분석해 보겠습니다. **todo** 함수는 현재 상태와 들어오는 심볼을 기반으로 알파벳의 심볼 인덱스를 조회하고 변환 테이블에서 새 상태, 토큰 식별자(있는 경우) 및 기타 토큰을 가져옵니다. 구문 분석 자체에는 각각의 다음 문자에 대해 차례로 **todo** 함수를 호출하고 새로운 상태로 전환하는 작업이 포함됩니다. 태그가 수신되면 출력 기준에 해당 토큰을 생성하고 구문 분석 프로세스를 계속합니다. 구문 분석 프로세스 중에 토큰 시작의 오프셋만 저장하기 때문에 별도의 스택이나 배열에 토큰 기호를 누적하지 않는다는 점에 유의해야 합니다. 토큰을 얻은 후 다음 토큰의 오프셋을 현재 구문 분석 위치로 이동합니다.

남은 것은 구문 분석에 사용된 어휘 상태 토큰을 확인하는 것입니다.

* **lexfPush** - 이 토큰은 새로운 토큰에서 심볼을 누적하기 시작함을 의미합니다.
* **lexfNext** - 문자를 현재 토큰에 추가해야 함을 나타냅니다.
* **lexfPop** - 토큰 수신이 완료되었습니다. 일반적으로 이 플래그와 함께 구문 분석된 토큰의 식별자 유형이 있습니다.
* **lexfSkip** - 이 토큰은 구문 분석에서 문자를 제외하는 데 사용됩니다. 예를 들어, 문자열에서 제어 슬래시는 \n \r \"입니다. 이들은 구문 분석 단계에서 자동으로 대체됩니다.

## Needle 언어 {#needle-language}
### 렉서 {#lexemes}

프로그램의 소스 코드는 UTF-8 인코딩이어야 합니다.

다음 어휘 유형이 처리됩니다.

* **Keywords** - `action, break, conditions, continue, contract, data, else, error, false, func, If, info, nil, return, settings, true, var, warning, while`
* **Number** - 정수와 소수점 숫자만 허용됩니다. 기본적으로 두 가지 유형이 있습니다: **int**와 **float**. 소수점이 있는 숫자는 **float** 유형이 됩니다. **int** 유형은 golang의 **int64**에 해당하며, **float** 유형은 golang의 **float64**에 해당합니다.
* **String** - 문자열은 이중 따옴표 ```("a string")``` 또는 백틱 ```(`a string`)```으로 묶일 수 있습니다. 두 유형의 문자열 모두 개행 문자를 포함할 수 있습니다. 이중 따옴표로 묶인 문자열은 따옴표, 개행 문자 및 슬래시로 이스케이프된 캐리지 리턴을 포함할 수 있습니다. 예를 들어, ```"This is a \"first string\".\r\nThis is a second string."```입니다.
* **Comment** - 두 가지 유형의 주석이 있습니다. 한 줄 주석은 두 개의 슬래시 (//)를 사용합니다. 예를 들어, // 이것은 한 줄 주석입니다. 여러 줄 주석은 슬래시와 별표 기호를 사용하며 여러 줄에 걸칠 수 있습니다. 예를 들어, ```/* 이것은 여러 줄 주석입니다 */```입니다.
* **Identifier** - 변수와 함수의 이름은 a-z 및 A-Z 문자, UTF-8 기호, 숫자 및 밑줄로 구성됩니다. 이름은 문자, 밑줄, ```@``` 또는 ```$```로 시작할 수 있습니다. ```$```로 시작하는 이름은 **data section**에서 정의된 변수의 이름입니다. ```$```로 시작하는 이름은 **conditions** 및 **action sections**의 범위 내에서 전역 변수를 정의하는 데에도 사용될 수 있습니다. 생태계 계약은 ```@``` 기호를 사용하여 호출할 수 있습니다. 예를 들어: ```@1NewTable(...)```입니다.


### 타입 {#types}

다음은 Needle 유형에 해당하는 golang 유형이 지정된 부분입니다.

* **bool** - bool, 기본값은 **false**입니다.
* **bytes** - []byte{}, 기본값은 빈 바이트 배열입니다.
* **int** - int64, 기본값은 **0**입니다.
* **address** - uint64, 기본값은 **0**입니다.
* **array** - []interface{}, 기본값은 빈 배열입니다.
* **map** - map[string]interface{}, 기본값은 빈 객체 배열입니다.
* **money** - decimal. Decimal, 기본값은 **0**입니다.
* **float** - float64, 기본값은 **0**입니다.
* **string** - string, 기본값은 빈 문자열입니다.
* **file** - map[string]interface{}, 기본값은 빈 객체 배열입니다.

이러한 유형의 변수는 ```var``` 키워드로 정의됩니다. 예를 들어, ```var var1, var2 int```입니다. 이렇게 정의되면 변수는 유형별로 기본값이 할당됩니다.

모든 변수 값은 interface{} 유형이며, 그런 다음 필요한 golang 유형에 할당됩니다. 따라서 예를 들어, 배열 및 맵 유형은 golang의 []interface{} 및 map[string]interface{} 유형입니다. 두 유형의 배열은 모든 유형의 요소를 포함할 수 있습니다.


### 표현식 {#expressions}

식에는 산술 연산, 논리 연산 및 함수 호출이 포함될 수 있습니다. 모든 식은 연산자 우선 순위에 따라 왼쪽에서 오른쪽으로 평가됩니다. 우선 순위가 같은 경우 연산자는 왼쪽에서 오른쪽으로 평가됩니다.

높은 작업에서 낮은 작업 우선순위:

* **Function call and parentheses** - 함수 호출 시 전달된 매개변수는 왼쪽에서 오른쪽으로 계산됩니다.
* **Unary Operation** - 논리 부정 ```!``` 및 산술 부호 변경 ```-```.
* **Multiplication and Division** - 산술 곱셈 ```*``` 및 나눗셈 ```/```.
* **Addition and Subtraction** - 산술 덧셈 ```+``` 및 뺄셈 ```-```.
* **Logical comparison** - ```>=>> >=```.
* **Logical equality and inequality** - ```== !=```.
* **Logical AND** - ```&&```.
* **Logical OR** - ```||```.

논리 AND 및 OR을 평가할 때, 표현식의 양쪽 모두 평가됩니다.

Needle은 컴파일 중에 타입 체크를 수행하지 않습니다. 피연산자를 평가할 때, 타입을 더 복잡한 타입으로 변환하려고 시도합니다. 복잡도 순서에 따른 타입의 복잡성은 다음과 같을 수 있습니다: ```string, int, float, money```. 타입 변환의 일부만 구현되어 있습니다. 문자열 타입은 덧셈 연산을 지원하며, 결과는 문자열 연결이 됩니다. 예를 들어, ```string + string = string, money-int = money, int * float = float```입니다.

함수에 대해서는 실행 중에 ```string```과 ```int``` 타입에 대한 타입 체크가 수행됩니다.


**array** 및 **map** 타입은 인덱스를 통해 접근할 수 있습니다. **array** 타입의 경우, 인덱스로 **int** 값을 지정해야 합니다. **map** 타입의 경우, 변수 또는 **string** 값을 지정해야 합니다. 현재 최대 인덱스보다 큰 인덱스를 갖는 **array** 요소에 값을 할당하면, 배열에 빈 요소가 추가됩니다. 이러한 요소들의 초기값은 **nil**입니다. 예를 들어: .. code:

```
var my array
my[5] = 0
var mymap map
mymap["index"] = my[3]
```

조건부 논리 값(예: `if, while, &&, ||, !`)의 식에서 유형은 자동으로 논리 값으로 변환됩니다. 유형이 기본값이 아니면 true입니다.

```
var mymap map
var val string
if mymap && val {
...
}
```

### 스코프 {#scope}

중괄호는 로컬 범위 변수를 포함할 수 있는 블록을 지정합니다. 기본적으로 변수의 범위는 자체 블록과 모든 중첩 블록으로 확장됩니다. 블록에서 기존 변수의 이름을 사용하여 새 변수를 정의할 수 있습니다. 그러나 이 경우 같은 이름의 외부 변수는 사용할 수 없게 됩니다.

```
var a int
a = 3
{
   var a int
   a = 4
   Println(a) // 4
}
Println(a) // 3
```

### 계약 실행 {#contract-execution}

계약을 호출할 때에는 **data**에 정의된 매개변수를 전달해야 합니다. 계약을 실행하기 전에 가상 머신은 이러한 매개변수를 받아서 해당 변수($Param)에 할당합니다. 그런 다음, 미리 정의된 **conditions** 함수와 **action** 함수를 호출합니다.

계약 실행 중 발생하는 오류는 양식 오류와 환경 오류로 구분할 수 있습니다. 양식 오류는 `error, warning, info`와 같은 특수한 명령을 사용하여 생성되며, 내장 함수가 `err`을 *nil* 이 아닌 값으로 반환할 때 발생합니다.

Needle 언어는 예외 처리를 다루지 않습니다. 어떤 오류든 계약의 실행을 종료시킵니다. 계약을 실행할 때 별도의 스택과 변수 값 저장을 위한 구조가 생성되기 때문에, golang의 가비지 컬렉션 메커니즘은 계약 실행이 완료될 때 이러한 데이터를 자동으로 삭제합니다.


### Backus-Naur Form (BNF) {#backus-naur-form-bnf}

컴퓨터 과학에서 BNF는 문맥 없는 구문에 대한 표기법이며 일반적으로 컴퓨팅에서 사용되는 언어의 구문을 설명하는 데 사용됩니다.

* &lt;decimal digit&gt;
```
'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
```

* &lt;decimal number&gt;
```
<decimal digit> {<decimal digit>}
```

* &lt;symbol code&gt;
```
'''<any symbol>'''
```

* &lt;real number&gt;
```
['-'] <decimal number'.'[<decimal number>]
```

* &lt;integer number&gt;
```
['-'] <decimal number> | <symbol code>
```

* &lt;number&gt;
```
'<integer number> | <real number>'
```

* &lt;letter&gt;
```
'A' |'B' | ... |'Z' |'a' |'b' | ... |'z' | 0x80 | 0x81 | ... | 0xFF
```

* &lt;space&gt;
```
'0x20'
```

* &lt;tabulation&gt;
```
'0x09'
```

* &lt;newline&gt;
```
'0x0D 0x0A'
```

* &lt;special symbol&gt;
```
'!' |'"' |'$' |''' |'(' |')' |'\*' |'+' |',' |'-' |'.' |'/ '|'<' |'=' |'>' |'[' |'\\' |']' |'_' |'|' |'}' | '{' | <tabulation> | <space> | <newline>
```

* &lt;symbol&gt;
```
<decimal digit> | <letter> | <special symbol>
```

* &lt;name&gt;
```
(<letter> |'_') {<letter> |'_' | <decimal digit>}
```

* &lt;function name&gt;
```
<name>
```

* &lt;variable name&gt;
```
<name>
```

* &lt;type name&gt;
```
<name>
```

* &lt;string symbol&gt;
```
<tabulation> | <space> |'!' |'#' | ... |'[' |']' | ...
```

* &lt;string element&gt;
```
{<string symbol> |'\"' |'\n' |'\r'}
```

* &lt;string&gt;
```
'"' {<string element>}'"' |'\`' {<string element>}'\`'
```

* &lt;assignment operator&gt;
```
'='
```

* &lt;unary operator&gt;
```
'-'
```

* &lt;binary operator&gt;
```
'==' |'!=' |'>' |'<' |'<=' |'>=' |'&&' |'||' |'\*' |'/' |'+ '|'-'
```

* &lt;operator&gt;
```
<assignment operator> | <unary operator> | <binary operator>
```

* &lt;parameters&gt;
```
<expression> {','<expression>}
```

* &lt;contract call&gt;
```
<contract name>'(' [<parameters>]')'
```

* &lt;function call&gt;
```
<contract call> [{'.' <name>'(' [<parameters>]')'}]
```

* &lt;block contents&gt;
```
<block command> {<newline><block command>}
```

* &lt;block&gt;
```
'{'<block contents>'}'
```

* &lt;block command&gt;
```
(<block> | <expression> | <variables definition> | <if> | <while> | break | continue | return)
```

* &lt;if&gt;
```
'if <expression><block> [else <block>]'
```

* &lt;while&gt;
```
'while <expression><block>'
```

* &lt;contract&gt;
```
'contract <name> '{'[<data section>] {<function>} [<conditions>] [<action>]'}''
```

* &lt;data section&gt;
```
'data '{' {<data parameter><newline>} '}''
```

* &lt;data parameter&gt;
```
<variable name> <type name>'"'{<tag>}'"'
```

* &lt;tag&gt;
```
'optional | image | file | hidden | text | polymap | map | address | signature:<name>'
```

* &lt;conditions&gt;
```
'conditions <block>'
```

* &lt;action&gt;
```
'action <block>'
```

* &lt;function&gt;
```
'func <function name>'('[<variable description>{','<variable description>}]')'[{<tail>}] [<type name>] <block>'
```

* &lt;variable description&gt;
```
<variable name> {',' <variable name>} <type name>
```

* &lt;tail&gt;
```
'.'<function name>'('[<variable description>{','<variable description>}]')'
```

* &lt;variables definition&gt;
```
'var <variable description>{','<variable description>}'
```


