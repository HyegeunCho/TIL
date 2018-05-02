# 예제로 배우는 GO 프로그래밍

[사이트](http://golang.site/)

# Go 변수와 상수

## 1 변수

var 키워드 뒤에 변수명을 적고, 그 뒤에 변수 타입을 적는다.

```go
var a int
a = 10

var f float32 = 11.
f = 12.0

var i, j, k int
var i, j, k int = 1, 2, 3
```

변수를 선언하면서 초기값을 지정하지 않으면 `zero value`를 기본으로 할당한다.

숫자형에는 0, bool타입에는 false, string에는 빈 문자열을 할당한다.

## 2 상수

const 키워드를 사용하여 상수를 선언한다.

```go
const c int = 10
const s string = "Hi"

const (
    Visa = "Visa"
    Master = "MasterCard"
    Amex = "American Express"
)
```

상수값을 0 부터 순차적으로 부여하기 위해 `iota`라는 identifier를 사용할 수 있다.

```go
const (
    Apple = iota    // 0
    Grape           // 1
    Orange          // 2
)
```

`iota`가 지정된 Apple에는 0이 할당되고, 나머지 상수들에는 순서대로 1씩 증가된 값을 부여받는다.

`enum`과 비슷한 기능이라고 볼 수 있다.

## 3 Go 키워드

다음 예약 키워드들은 변수명, 상수명, 함수명 등의 Identifier로 사용할 수 없다.

```go
break
case
chan
const
continue
default
defer
else
fallthrough
for
func
go
goto
if
import
interface
map
package
range
return
select
struct
switch
type
var
```

# Go 데이터 타입

## 1 Go 데이터 타입

다음과 같은 기본 데이터 타입이 있다.

- 불린 타입
    - `bool`
- 문자열 타입
    - `string` : 한번 생성되면 수정할 수 없는 Immutable 타입
- 정수형 타입
    - `int`
    - `int8`
    - `int16`
    - `int32`
    - `int64`
    - `uint`
    - `uint8`
    - `uint16`
    - `uint32`
    - `uint64`
    - `uintptr`
- float 및 복소수 타입
    - `float32`
    - `float64`
    - `complex64`
    - `complex128`
- 기타 타입
    - `byte` : `uint8`과 동일하며 바이트 코드에 사용
    - `rune` : `int32`와 동일하며 유니코드 코드포인트에 사용

## 2 문자열

문자열 리터럴은 Back Quote 또는 이중 인용부호를 사용하여 표현한다.

- Back Quote는 Raw String Literal이라 부른다. 안에 있는 문자열은 별도로 해석되지 않고 Raw String 그대로의 값을 갖는다.
    - 예를들어 문자열안에 `\n`이 있는 경우 New Line으로 해석되지 않는다. 
    - 복수 라인의 문자열을 표현할 떄 자주 사용된다.
- 이중인용부호는 Interpreted String Literal이라 부른다. 인용 부호 안의 Escape 문자열들은 특별한 의미로 해석된다.
    - 복수 라인에 걸쳐 쓸 수 없다.

## 3 데이터 타입 변환

값의 타입을 변경하기 위해서 `T(v)` 와 같이 표현한다.

여기서 `T`는 변환하고자 하는 타입, `v`는 변환된 값을 나타낸다.

```go
float32(100)
[]byte("ABC")
```

Go 에서는 타입간 변환 시 반드시 명시적으로 지정해주어야 한다.

암묵적 변환이 일어날 상황에서는 런타임 에러가 발생한다.


