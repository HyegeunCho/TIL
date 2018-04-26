package main

import (
	"fmt"
	"math"
)

func main() {
	// math.pi 에서 p 가 소문자이므로 exported 항목이 아니다.
	// 따라서 컴파일 에러 발생!!
	//fmt.Println(math.pi)

	fmt.Println(math.Pi)
}
