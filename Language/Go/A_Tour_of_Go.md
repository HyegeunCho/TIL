# Pacakge

모든 Go 프로그램은 패키지로 구성됨.

프로그램은 main 패키지에서부터 실행을 시작

패키지의 이름은 디렉토리 경로의 마지막 이름을 사용하는 것이 규칙이다.

예를 들어 `path/filepath`를 사용한다면 패키지명은 `filepath` 이다.

```go
package main

import (
    "fmt"
    "main"
)

func main() {
    fmt.Println("Happy", math.Pi, "Day");
}
```

# Exported names

패키지를 import 하면 해당 패키지에서 외부로 export 한 메서드나 변수, 상수 등에 접근할 수 있다.

Go에서는 첫 문자를 대문자로 시작하면  그 패키지를 사용하는 곳에서 접근할 수 있는 exported name이 된다.

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    fmt.Println(math.pi)
}
```

# Function

함수는 매개변수를 가질 수 있다.

매개변수의 타입은 변수명 뒤에 명시한다.

타입을 변수명 뒤에 명시하는 이유는 코드를 왼쪽에서 오른쪽으로 읽을 때 자연스럽게 읽기 위해서이다.

자세한 내용은 [Go's declaration syntax](Go_Declaration_Syntax.md)를 참고하자.

```go
func add (x int, y int) int {
    return x + y
}
```