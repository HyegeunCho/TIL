# 1. 모나드란?

공학에서 기술을 파악하기 위해선 우선 해당 기술이 어떤 필요에 의해 만들어졌는지를 알아야 한다.

모나드가 프로그래밍 영역에 처음으로 등장한 것은 하스켈이라는 언어에서 입출력을 처리하기 위해 도입되고 부터이다.

모나드를 이해하기 위해선 우선 하스켈이 어떤 언어이고 왜 입출력에 모나드를 도입해야 했는지를 파악해야 한다.

## 1.1. 함수형 프로그래밍

하스켈은 순수 함수형 언어로써 언어 자체적으로 모든 로직을 함수를 기반으로 실행한다.

이 글의 목표는 함수형 프로그래밍을 소개하는 것이 아니기 때문에 함수형 프로그래밍에 대한 자세한 내용은 생략하도록 한다.

함수형 프로그래밍과 기존 절차적 프로그래밍의 차이는 코드를 보면 더욱 실감할 수 있다.

아래는 많은 책과 블로그에서 소개하는 가장 대표적인 함수형 프로그래밍의 예제이다.

아래 데이터에서 성남에 사는 사람이 키우는 고양이가 총 몇 마리인지를 구해보자.

```js
var data = [
    {name: "유영선", city: "성남", cat: 1}, 
    {name: "김혜관", city: "서울", cat: 0}, 
    {name: "조혜근", city: "서울", cat: 0}, 
    {name: "남우정", city: "성남", cat: 1}
];
```

이 문제를 절차적 프로그래밍으로 풀면 다음과 같다.

```js
var countCat = 0;
for (var i = 0; i < data.length; i++) {
    if(!data[i].city) {
        continue;
    }
    if (!data[i].cat) {
        continue;
    }
    if (data[i].city === '성남') {
        countCat += data[i].cat;
    }
}
console.log("성남 고양이: " + countCat);
```

이 코드의 문제점은 `countCat`값이 전역으로 노출되어 있기 때문에 그 값이 자의에서든 타의에서든 `for`로직이 수행되는 도중에 변경될 수 있다는 것이다.

뿐만 아니라 전역에 위치한 `data`값을 사용하고 있기 때문에 로직을 수행하는 도중 `data`가 변경될 수도 있다.

위 두가지 경우 모두 고양이를 카운트하는 로직에 대해 입력과 출력이 일관되게 보장되지 않는다.

또한 코드의 문맥을 전체적으로 살펴봐야 해당 로직이 어떤 동작을 하는지 파악할 수 있다.

다음으로 위 코드를 함수형 프로그래밍으로 변경해보자.

```js
var catCount = data.filter(function(item, index, origin) {
    if (!item.city) {
        return false;
    }
    if (!item.cat) {
        return false;
    }
    return (item.city === "성남");
}).reduce(function(acc, item, index, origin) {
    return acc.cat + item.cat;
});
console.log("함수형 성남 고양이: " + catCount);
```

`filter`가 실행됨과 동시에 `data`는 클로저 내부에서 존재하게 된다. 

즉, `filter`가 실행된 후 외부에서 `data`를 변경해도 `filter`가 반환하는 값은 항상 변경 이전의 `data`에 대한 처리 결과이다.

또한 로직이 수행하는 작업 역시 전체 코드를 살펴볼 필요 없이 각 함수 단위로 순차적으로 살펴보면 알 수 있다.

최근에는 C, C++, C#, Java 등과 같은 전통적인 절차적인 프로그래밍 언어들에도 함수형 프로그래밍 개념이 추가되고 있다.

이렇게 함수형 프로그래밍이 각광받고 있는 것은 위의 예에서도 보았듯이 

1. 코드가 더욱 깔끔해지고 이해하기 편해진다. (`filter`와 `reduce`를 알고 있긴 해야하지만..)
2. Side Effect가 사라진다.

등의 장점이 있기 때문이다.

## 1.2. 파일 입출력

이렇게 함수형 프로그래밍 패러다임이 그 장점으로 인해 알게 모르게 많이 사용되고 있다는 것을 알아보았다. 

다음으로 파일 입출력에 대해 생각해보자.

모나드를 이해하기 위해 생각해볼만한 파일 입출력 기능으로는 c++의 입출력을 떠올려보면 될 것 같다.

```c++
std::cout << "Hello" << " " << "world!" << std::endl;
std::cout << 1 << 'a' << "String" << std::endl;
``` 

위의 코드는 c++의 시스템 출력문이다.

타입과 상관없이 값이 전달된 순서대로 시스템에 출력한다.

시스템 아웃풋에 첫번째 값이 전달되고 그 결과로 다시 시스템 아웃풋이 반환된다. 새롭게 반환된 시스템 아웃풋에 다음 값이 전달되는 동작이 코드가 끝날 때까지 반복된다.

즉, 입출력 시에는 다음과 같은 조건이 만족되어야 한다.

1. 미리 정의된 실행 순서가 보장되어야 하며
2. 어떠한 타입의 데이터 요청이 있어도 안전하게 수행되어야 한다.

## 1.3. 모나드가 사용되어야 했던 배경

1. 함수형 프로그래밍의 규칙을 지키면서 실행 순서에 따라 함수와 데이터가 처리되어야 한다. 함수형 프로그래밍에서 실행 순서는 첫번째 함수의 반환값을 두번째 함수에 전달하는 식으로 구성된다. 보통 이것을 함수 체이닝이라고 한다.
2. 체이닝에 사용되는 함수는 단일한 인터페이스로 구성되어야 한다. `cout`의 예에서 보자면 `>>` 라는 단일한 연산자를 통해 동작이 체이닝 되었다. 
    1. 첫번째 예제에서 봤던 `filter`와 `reduce`는 모두 배열 객체를 받아서 수행하는 함수였다. 
    2. 그러나 입력 데이터의 타입이 서로 다른 함수끼리도 연결해야할 필요가 있을 때가 있다. 
    3. 함수간에 전달되는 값을 감싸는 단일한 인터페이스를 갖는 타입을 정의하면 함수간의 자연스런 연결을 보장할 수 있다.
3. 또한 어떤 타입의 값이라도 처리할 수 있어야 한다.

# 2. 드디어 모나드

## 2.1. 모나드 정의

모나드는 아래 3가지 정의로 표현할 수 있다.

- 타입 생성자 M
- return 함수
- bind라고 부르는 >>= 연산자

타입 생성자 M은 1.3 항목의 2번과 3번에 해당하는 내용이다.

다양한 타입의 값을 추가적인 타입으로 감싸 단일한 인터페이스를 제공하고 함수 체이닝 시, 동일한 동작으로 보장할 수 있다.

타입으로 감싸면서 외부에 대해 값을 감추고, 정보를 추가할 수 있으며, 추가적인 연산을 정의할 수 있는 장점도 있다.

return 함수는 값을 M 타입으로 감싸진 값으로 변환하는 함수이다.

bind 연산자는 이전 동작으로 얻은 M 타입으로 감싸진 값을 다음 동작에 넘겨주는 역할을 한다.

위의 정의를 토대로 모든 모나드는 다음과 같은 규칙을 만족해야 한다.

1. M 생성자를 통해 값을 저장할 수 있는 M 타입을 사용하는 모나드를 만들 수 있어야 한다.
2. 값을 손실하지 않으면서 값을 보관하거나 꺼낼 수 있어야 한다. (`monad >>= return = monad`)
3. 중첩된 바인딩 함수의 결과는 바인딩 함수들을 연속해서 호출한 결과와 같아야 한다. (함수의 합성: `m >>= f >>= g = m >>= (\x -> f x >>= g)`)

한마디로 이야기하자면 위와 같은 동작을 사용할 수 있도록 하는 타입 객체를 만들 수 있는 타입 클래스를 모나드라고 부른다.

성헌님이 말한 flatMap이란 기능은 간단하게 말하자면

M(a)를 처리하다보면 M(M(a))라는 데이터가 튀어나올 때가 있는데 이 데이터에서 값을 받아올 때 M(a)의 값 b 를 얻을 수 있도록

M(M(a))를 M(b)로 만들어주는 기능이라고 생각하면 된다.

## 2.2. Javascript를 통한 모나드 예제 확인

이렇게 설명해도 소스코드로 보는 게 더 빠르니까...

### 2.2.1. Maybe 모나드

메이비 모나드는 아무 값도 없는 상태를 표현할 수 있는 모나드이다.

```js
// Just 타입 클래스 (모나드)
function Just(value) {
    this.value = value;

    this.bind = function(transform) {
        var result = transform(this.value);
        if (result instanceof Just) {
            return result;
        }
        return new Just(transform(this.value));
    };
    
    this.toString = function() {
        return 'Just(' + this.value + ')';
    };
}

// Just와 동일한 인터페이스를 가진 아무 것도 없음을 나타내는 타입
var Nothing = {
    bind: function() {
        return this;
    }, 
    toString: function() {
        return 'Nothing';
    }
};
```

Just가 바로 M 모나드라고 생각하면 된다.

이 모나드를 이용하여 간단한 덧셈을 처리해보자.
```js
var result = new Just(5).bind(value =>
    new Just(6).bind(value2 =>
         value + value2));
console.log("result: " + result.toString());

/**
 * 만약 중간 단계에서 Nothing이 반환되면
 * 연관된 모든 연산을 통과하고 Nothing을 결과로 
 * 반환한다.
 * 
 * Nothing 이전의 연산은 이미 수행되었다
 * Nothing 이후의 연산은 수행되지 않고 
 * Nothing를 반환한다.
 */

 var resNothing = new Just(5).bind(value =>
    Nothing.bind(value2 =>
        // Nothing의 bind는 바로 this를 리턴하므로 
        // value2 => new Just(....) 로직을 수행하지 않는다.
        value + alert(value2)));
console.log("resNothing: " + resNothing.toString());

```

### 2.2.2. Promise가 곧 모나드

왜 갑자기 성헌님이 발표 중간에 이제 여러분은 모나드를 이해하셨어요! 라고 했을까?

```js
/**
 * Continuation 모나드
 * 비동기 처리에 사용한다.
 * Javascript Promise 객체가 Continuation 모나드의 구현이다.
 * 
 * 1. Promise.resolve(value)
 * 값을 감싸고 promise 객체를 반환하는 unit 함수의 역할
 * 
 * 2. Promise.prototype.then(onFullfill: value => Promise)
 * 함수를 인자로 받아 값을 다른 promise로 전달하고 promise를 반환하는
 * bind 함수의 역할
 */

var result = Promise.resolve(5).then(function(value) {
    return Promise.resolve(6).then(function(value2) {
        return value + value2;
    });
});

result.then(function(value) {
    console.log(value);
});
```

# 참고자료

- [스칼라 초중급자를 위한 모나드 강의](https://github.com/enshahar/BasicFPinScala/blob/master/Intermediate/Monad.md)
- [모나드 괴담](https://xtendo.org/ko/monad#1)
- [Javascript 모나드](https://www.haruair.com/blog/2986)
- [모나드와 클로저](http://seonho.kim/2017/09/16/monad-and-clojure/)