# 가장 빨리 만나는 Go 언어

[링크](http://pyrasis.com/go.html)

## Go 언어의 특징

- 정적 타입, 강 타입
    - 컴파일 시 자료형이 결정되면 정적, 런타임 시 자료형이 결정되면 동적
    - 암시적 형 변환이 가능하면 약타입, 명시적으로 형변환해야 하는 경우는 강 타입
- 컴파일 언어
- 가비지 컬렉션
    - 가비지 컬렉터가 실행파일에 내장
- 병행성 (Concurrency)
    - 병행성은 동시 처리의 논리적 개념 : 시분할 개념
    - 병렬성은 동시 처리의 물리적 개념 : 멀티 코어 CPU
- 멀티코어 환경 지원
- 모듈화 및 패키지 시스템
    - `import` 키워드로 저장소 주소 지정 후 `go get`, `go install` 명령을 사용하여 자동으로 소스코드 로드
- 빠른 컴파일 속도
    - 헤더파일이 없고 소스코드를 패키지화하여 변경된 부분만 컴파일하므로 속도가 빠름
    - 문법적으로 복잡한 요소를 최대한 줄여 복잡도를 줄임

- 활용 범위
    - 메모리 관리가 다소 느슨해도 되고 
    - 규모가 크고 복잡하며 유지보수가 빈번한 곳에서 편리하게 사용할 수 있다.
    - 다양한 네트워크 라이브러리를 제공하므로 인터넷 프로그래밍에 유용하다.

## Go 언어의 실행

- `go build` 명령에 hello.go 파일을 직접 지정하면 실행파일은 해당 디렉토리에 생성
- `go install` 명령을 사용하면 관련 패키지가 자동으로 로드되어 컴파일되고 실행파일은 `bin` 디렉토리에 생성

## Go의 기본 문법

### 문법의 강제

- 함수, 조건문, 반복문 등을 시작할 때는 반드시 같은 줄에서 중괄호를 사용해야 한다.
- 문법 스타일을 강제로 맞춰주는 `gofmt` 명령어도 있다.
    - `gofmt -w hello.go` : `-w` 옵션으로 정렬된 내용을 원본 파일에 덮어쓸 수 있다.
- Go 소스코드는 유니코드 형식이므로 알파벳, 한글, 일본어, 한자를 동시에 표현할 수 있다.
- 보통 구문의 마지막에 세미콜론을 생략한다. 하지만 한 라인에 여러 구문을 사용할 경우 세미콜론으로 구분한다.
    - 컴파일할 때 라인의 마지막에 자동으로 세미콜론을 붙인다.
- 한줄 주석(//)과 여러 줄 주석(/* */)이 있다.
- 인덴트로 탭을 사용한다. 스페이스를 사용해도 자동으로 탭으로 바뀐다.

## 변수의 사용

- `var` 키워드를 사용하여 변수 선언하거나, 자료형을 생략해서 선언하는 두가지 방식

```go
var i int
var s string

var age = 10
var name = "Maria"
```

- 자료형을 생략하면 대입되는 데이터의 자료형으로 자동 결정되며, 선언과 동시에 데이터를 할당하지 않으면 에러가 난다.
- `:=` 연산자를 사용하면 var와 자료형 키워드를 사용하지 않고 가단하게 변수를 선언하고 초기화할 수 있다.
    - if, for 제어문 안에서 임시 변수 사용할 때 유용하다.

```go
age := 10
name := "Maria"
```

- 콤마로 구분하여 변수 여러개를 한꺼번에 선언하고 초기화할 수 있다.

```go
var x, y int = 30, 50
a, b, c, d := 1, 3.4, "Hello", false

var (
    a, b = 1, 2
    age, name = 10, "Maria"
)
```

- Go 언어에서는 사용하지 않는 변수나 패키지가 있을 경우 컴파일 에러가 발생한다. `_` 문자를 사용하여 사용하지 않는 변수나 패키지를 주석처리 하지 않고 임시 유지할 수 있다.

```go
package main

import "fmt"
import _"time"

func main() {
    a := 1
    b := 2
    _ = b

    fmt.Println(a)
}
```

## 숫자 사용하기

### 실수

- 실수간의 비교는 등호가 아니라 머신 입실론의 오차를 고려해야 한다.

```go
var a float64 = 10.0
for i := 0; i < 10; i++ {
    a = a - 0.1
}

const epsilon = 1e-14
fmt.Println(math.Abs(a - 9.0) <= epsilon)
```

### 복소수

- 복소수는 실수부 + 허수부의 형태로 나타내며 허수부는 `i` 키워드를 사용한다.
    - 또는 complex 함수를 사용해도 된다.
- 실수부와 허수부를 따로 받아오기 위해 `real`, `imag` 함수를 사용한다.
- 복소수도 실수의 형태이므로 실수와 마찬가지로 연산 시, 미세한 오차가 발생할 수 있다.

```go
var num complex64 = 1 + 2i
var num2 complex64 = complex(1, 2)
var numr = real(num)
var numi = imag(num)
```

### 룬 (rune)

- rune은 유니코드 문자 코드를 저장할 때 사용
- 작은 따옴표로 데이터를 묶어줘야 한다.

```go
var r1 rune = '한'
var r2 rune = '\ud55c'
```

### 숫자 연산

- `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `^` 연산자들을 사용할 수 있다.
- 숫자끼리 연산할 때 서로 자료형이 다르면 컴파일 에러가 발생한다.
- 명시적 캐스팅으로 자료형을 변경해줄 수 있으며 캐스팅 시 값이 넘칠 경우 잘라내게 된다.
- 오버플로우와 언더플로우가 발생하는 경우 컴파일 에러로 표시해준다.

### 변수 크기 구하기

- `unsafe` 패키지의 `Sizeof` 함수를 사용하여 변수의 사이즈를 바이트 단위로 구할 수 있다.

## 문자열 사용하기

- 문자열은 큰따옴표로 묶어주어야 하며 유니코드로 표현할 수 있는 문자를 사용할 수 있다.
- `\u`, `\U`를 이용하여 유니코드 문자코드를 사용할 수도 있다.
- 여러 줄로 된 문자열을 저장할 때는 백 쿼트로 묶어준다.

### 문자열 길이 구하기

- `len` 함수를 사용하여 문자열 길이를 구할 수 있다.
- 2바이트가 넘는 유니코드 문자열의 길이를 구하려면 `unicode/utf8` 패키지의 `RuneCountlnString` 함수를 사용한다.

### 문자열 연산하기

- 문자열 비교할 때는 `==` 연산자를 사용한다.
- 문자열을 이어 붙일 때는 `+` 연산자를 사용한다.
- 문자열에서 각 문자를 추출할 때는 배열과 동일하게 `[]` 대괄호로 접근할 수 있다.

### 문자열 수정하기

- Go 언어에선 한번 할당된 문자열의 일부를 수정할 수 없다.
- 아예 새로운 문자열을 할당하는 건 괜찮다.

## 상수 사용하기

- 변수는 `var`, 상수는 `const`로 선언할 수 있다.
- 상수는 반드시 선언과 동시에 초기화해야 하며, 선언 후에는 값을 변경할 수 없다.

## 열거형 사용하기

- 상수에 값을 일일이 대입하지 않고 순서대로 사용하려면 `itoa`를 사용하면 된다.

```go
const (
    Sunday = iota   // 0
    Monday          // 1
    Tuesday         // 2
    Wednesday       // 3
    Thursday        // 4
    Friday          // 5
    Saturday        // 6
    numberOfDays    // 7
)
```

## 패키지 사용하기

- `import` 키워드를 사용하여 패키지를 추가한다.
- 소스에는 패키지 이름에 `.`을 붙여서 패키지에서 제공하는 함수, 변수, 상수를 사용

### 여러 패키지 사용하기

```go
import (
    "fmt"
    "runtime"
)
```

### 전역 패키지로 사용하기

- `import` 로 패키지를 가져올 때 패키지 이름 앞에 `.`을 사용하면 전역 패키지가 된다.

```go
import . "fmt"
```

### 패키지 별칭 사용하기

```go
import f "fmt"
```

## break, continue 사용하기

- `break`, `continue`를 사용할 때 레이블을 지정할 수 있다.

```go
Loop:

break Loop

continue Loop
```

## switch 사용하기

- Go언어의 switch구문은 각 case에서 break를 사용하지 않는다.

### fallthrough 사용하기

- 특정 `case`의 문장을 실행한 뒤 다음 `case`의 문장을 실행하고 싶을 때, `fallthrough` 키워드를 사용한다.

### switch 조건문으로 분기하기

- `case`에서 조건식만으로 문장을 실행할 수 있다.

```go
i := 7

switch {  // case에 조건식을 지정했으므로 판단할 변수는 생략 
    case i >= 5 && i < 10:
        fmt.Println("5 이상 10 미만")
    case i >= 0 && i  5:
        fmt.Println("0 이상 5 미만")
}
```

- switch 분기문 안에서 함수를 실행하고 결과값으로 분기할 수 있음

```go
switch i := rand.Intn(10); {
    case i >= 3 && i < 6:
        fmt.Println("3 ~ 6")
    case i == 9:
        fmt.Println("9")
    default:
        fmt.Println(i)
}
```

## 배열 사용하기

```go
var a [5]int    // int 타입이며 길이가 5인 배열 선언
a[2] = 7        // 배열의 세번째 요소에 7 대입

var a [5]int = [5]int{1, 2, 3, 4, 5} // int형이며 길이가 5인 배열을 선언하고 초기화
var b = [5]int{1, 2, 3, 4, 5} // 배열을 선언할 때 자료형과 길이 생략
c := [5]int{1, 2, 3, 4, 5} // 배열을 선언할 때 var 키워드, 자료형과 길이 생략
d := [...]int{1, 2, 3} // 초기화할 요소가 3개이며 ...을 사용했으므로 배열 길이는 3
```

### 배열 순회하기

```go
a := [5]int{1, 2, 3, 4, 5}

for i := 0; i < len(a); i++ {
    fmt.Println(a[i])
}
```

```go
a := [5]int{1, 2, 3, 4, 5}

for i, value := range a {
    fmt.Println(i, value)
}
```

```go
a := [5]int{1, 2, 3, 4, 5}

for _, value := range a {
    fmt.Println(value)
}
```

### 배열 복사하기

- Go 언어의 배열 변수는 포인터가 아니라 배열 전체를 뜻한다.
- 배열을 다른 변수에 대입하면 배열 전체가 복사된다.

```go
a := [5]int{1, 2, 3, 4, 5}
b := a
```

## 슬라이스 사용하기

- 배열과 같지만 길이가 고정되어 있지 않으며 동적으로 크기가 늘어난다.
- 배열과 달리 레퍼런스 타입이다.
- 슬라이스는 배열과 달리 `[]`안에 길이를 지정하지 않는다. 이렇게 생성된 슬라이스의 길이는 0이다.

```go
var a[]int // int형 슬라이스 생성
```

- 슬라이스는 `make`함수를 사용하여 공간을 할당해야 값을 넣을 수 있다.

```go
var a[]int = make([]int, 5)
var b = make([]int, 5)
c := make([]int, 5)
```

- 슬라이스를 생성하면서 값을 초기화하려면 `{}` 중괄호를 사용한다.

```go
a := []int{1, 2, 3, 4, 5} // 슬라이스를 생성하면서 값을 초기화 
```

- 배열의 길이와 용량을 따로 할당할 수 있다.
- 길이를 용량보다 크게 설정할 수 없다.
    - 길이 : 인덱스로 접근할 수 있는 공간. `len` 함수로 구할 수 있다.
    - 실제 메모리에 할당된 공간. `cap` 함수로 구할 수 있다.
- 슬라이스의 용량은 자동으로 증가하지만 처음부터 용량을 너무 작게 할당하면 요소가 추가될 때마다 메모리를 새로 할당하게 되므로 성능이 떨어질 수 있다.

```go
var s = make([]int, 5, 10)
```

### 슬라이스에 값 추가하기

- `append` 함수를 사용하여 슬라이스의 맨 뒤에 값을 추가할 수 있다.

```go
a := []int{1, 2, 3}
a = append(a, 4, 5, 6)
```

- 슬라이스에 다른 슬리이스를 붙이려면 `append` 함수를 사용할 때 `...`을 사용한다.

```go
a := []int{1, 2, 3}
b := []int{4, 5, 6}
a = append(a, b...)
```

### 레퍼런스 타입

- 내장된 배열에 대한 포인터이므로 슬라이스끼리 대입하면 값이 복사되지 않고 참조만 한다.
- 함수의 매개변수에 배열을 넘기면 값 복사가 되미나 슬라이스를 넘기면 참조를 하게 된다.
    - 따라서 함수 안에서 슬라이스를 변경하면 함수 밖의 값도 변경된다.

### 슬라이스 복사하기

- 슬라이스의 모든 요소를 복사할 때는 `copy` 함수를 사용한다.
- 공간을 할당하지 않은 빈 슬라이스에는 값을 복사할 수 없다.

```go
a := []int{1, 2, 3, 4, 5}
b := make([]int, 3)

copy(b, a) // b에는 공간이 3만 할당되었으므로 1, 2, 3만 복사된다.
```

### 부분 슬라이스 만들기

- 기존 슬라이스에서 일정 위치를 지정해서 부분 슬라이스를 만들 수 있다.

```go
a := []int{1, 2, 3, 4, 5}
b := a[0:3] // 인덱스 0에서 3까지 복사한다.
c := a[0:3:6] // 인덱스 0에서 3까지 복사하면서 용량을 6으로 할당한다. 다만 용량은 기존 용량을 넘길 수 없다.
```

- 부분 슬라이스 문법은 배열에도 사용할 수 있다.

## 맵 사용하기

- 해시 테이블, 딕셔너리라고도 부르며, 키-값 쌍으로 데이터를 저장한다.
- 레퍼런스 타입이다.

```go
var a map[string]int // 키는 string, 값은 int 
```

- `map` 역시 `make` 함수를 사용해 공간을 할당해야 값을 저장할 수 있다.

```go
var a map[string]int = make(map[string]int)
var b = make(map[string]int)
c := make(map[string]int)

d := map[string]int{"Hello": 10, "World": 20}
e := map[string]int{
    "Hello": 10, 
    "World": 20
}
```

### 멥에 데이터 저장하고 조회하기

- 맵에서 존재하지 않는 키를 조회했을 때는 빈 값이 출력된다.
- 맵에 데이터가 존재하지는 지 검사하려면 값을 조회한 뒤 두번째 리턴값을 활용한다.

```go
value, ok := mapData["Pluto"] // 두번째 리턴값에 bool형으로 존재 여부 조회
```

### 맵 순회하기

```go
for key, value := range mapData {
    fmt.Println(key, value)
}
```

### 맵에서 데이터 삭제하기

- `delete` 함수 사용

```go
a := map[string]int {"Hello": 1, "World": 2}
delete(a, "World") // 맵 a에서 키 World 삭제
```

### 맵 안에 맵 만들기

```go
mapData := map[string]map[string]float32{
    "a": map[string]float32{
        "aa": 0.0
    }
}
```

## 함수 사용하기

- Go 언어는 함수 정의가 어디있든 상관없이 함수를 호출할 수 있다.

```go
package main

import "fmt"

func main() {
    hello()
}

func hello() {
    fmt.Println("Hello, World!")
}
```

### 매개변수와 리턴값 사용하기

- 일반적인 언어의 리턴 키워드 사용 가능
- 리턴값에 이름을 지정해서 반환할 수도 있다.

```go
func sum(a int, b int) int {
    return a + b
}

// 아래 함수에서는 return 키워드가 호출될 때 변수 r이 반환된다.
// 리턴값에 이름이 지정된 경우 return 키워드에 변수명은 붙이지 않는다.
// 리턴 값에 이름이 지정되면서 내부적으로 선언된 것으로 보면 된다.
func sumWithName(a int, b int) (r int) {
    r = a + b
    return
}
```

### 리턴값 여러 개 사용하기

- 문법적으로 함수에서 값을 여러개 반환할 수 있다.

```go
func hello() (int, int, int) {
    return 1, 2 3
}

func helloWithName() (a int, b int) {
    a = 1
    b = 2
    return
}
```

### 가변인자 사용하기

- 매개변수 개수가 정해져 있지 않고 유동적으로 변하는 형태
- 가변인자는 슬라이스 타입이다.

```go
func sum(...int) int {
    total := 0
    for _, value := range n {
        total += value
    }

    return total
}

func main() {
    n := []int{1, 2, 3, 4, 5}
    r := sum(n...)
}
```

### 재귀호출 사용하기

```go
package main

import "fmt"

func factorial(n uint64) uint64 {
    if n == 0 {
        return 1
    }
    return n * factorial(n - 1)
}

func main() {
    fmt.Println(factorial(5))
}
```

### 함수를 변수에 저장하기

- Go 언어는 자동으로 자료형을 추론하므로 `:=`를 사용하여 간단하게 함수를 대입할 수 있다.

```go
func sum(a int, b int) int {
    return a + b
}

func main() {
    var hello func(a int, b int) int = sum
    world := sum

    f := []func(int, int) int {sum, diff} // 함수를 저장할 수 있는 슬라이스를 생성 후, 함수로 초기화
}
```

### 익명함수 사용

- 익명함수는 함수를 정의한 후, `()` 괄호를 사용하여 바로 함수를 호출
- 익명함수를 통해 코드양을 줄일 수 있으며 클로저, 지연호출(`defer`), 고루틴(`go`)에서 주로 사용됨

```go
package main

import "fmt"

func main() {
    func() {
        fmt.Println("Hello, World")
    }()

    func(s string) {
        fmt.Println(s)
    }("Hello, World")

    r := func(a int, b int) int {
        return a + b
    }(1, 2)

    fmt.Println(r)
}
```

## 클로저 사용하기

- 클로저를 사용하면 지역 변수가 소멸되지 않고 나중에 함수를 호출할 때마다 계속 가져다 쓸 수 있다.
    - 함수가 선언될 때의 환경을 계속 유지한다.
    - 프로그램의 흐름(context)을 변수에 저장

```go
package main

import "fmt"

func calc() func(x int) int {
    a, b := 3, 5
    return func(x int) int {
        return a * x + b
    }
}

func main() {
    f := calc() // f 함수에서는 calc함수의 지역변수인 a와 b가 포함된 컨텍스트를 유지한다.

    fmt.Println(f(1))
    fmt.Println(f(2))
    fmt.Println(f(3))
    fmt.Println(f(4))
    fmt.Println(f(5))
}
```

## 지연 호출 사용하기

- 특정 함수를 현재 함수가 끝나기 직전에 호출하도록 예약하는 기능
- `defer` 호출이 하나의 함수 안에서 여러번 사용될 경우, 먼저 선언한 defer 함수가 가장 나중에 실행된다.
- 주로 파일을 열고 닫을 때 유용하게 사용된다.

```go
package main

import (
    "fmt"
    "os"
)

func hello() {
    fmt.Println("Hello")
}

func world() {
    fmt.Println("World")
}

func ReadHello() {
    file, err := os.Open("hello.txt")
    defer file.Close()

    if err != nil {
        fmt.Println(err)
        return
    }

    buf := make([]byte, 100)
    if _, err = file.Read(buf); err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(string(buf))
}

func main() {
    defer world()
    hello()
    hello()
    ReadHello()
}
```

## 패닉과 복구 사용하기

- 예외를 패닉이라고 부른다.
- `panic` 함수를 사용하면 유저가 직접 에러를 발생시킬 수 있다.
- `recover` 함수를 사용하면 패닉이 발생했을 때 프로그램이 바로 종료되지 않고 예외처리를 할 수 있다.
    - 다른 언어의 try catch 구문과 비슷하게 동작
    - 반드시 지연 호출 함수로 사용해야 한다. 그렇지 않으면 프로그램이 바로 종료됨

```go
package main

import "fmt"

func f() {
    defer func() {
        s := recover()
        fmt.Println(s)
    }()

    a := [...]int{1, 2}

    for i := 0; i < 5; i++ {
        fmt.Println(a[i])
    }
}

func main() {
    f()

    fmt.Println("Hello World")
}
```