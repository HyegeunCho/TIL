# 4 Javascript Design Patterns you Should Know

[원문보기](https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know)

모든 개발자는 유지보수 가능하고, 쉽게 읽을 수 있고, 재사용 가능한 코드를 작성하고자 노력한다. 코드 구조화는 어플리케이션이 커질수록 더욱 중요해지는데, 디자인 패턴은 특정한 상황에서의 공통된 이슈에 대해 조직화된 구조를 제공함으로써 해결책을 제공한다.

자바스크립트 개발자는 어플리케이션을 개발할 때 자기도 모르는 사이 디자인 패턴을 사용하곤 한다. 

특정 상황에서 사용할 수 있는 다양한 디자인패턴들이 있지만 자바스크립트 개발자는 그 중에서도 일부 패턴들을 다른 것보다 더 자주 사용하는 편이다.

이 글에서는 자바스크립트 개발자의 개발 레퍼토리를 다양화하기 위해 이 패턴들에 대해 알아보고 더 나아가 자바스크립트 내부를 들여다 본다.

알아볼 디자인 패턴은 다음과 같다.

- Module
- Prototype
- Observer
- Singleton

각각의 패턴은 다양한 속성들로 구성되어 있는데 특히 다음의 키워드들을 통해 살펴볼 것이다.

1. Context: 어느 환경에서 패턴이 사용되는가?
2. Problem: 무슨 문제를 해결하기 위해 패턴을 사용하는가?
3. Solution: 패턴이 어떻게 문제를 해결하는가?
4. Implementation: 구현은 실제로 어떻게 나타나는가?

## Module Design Pattern

자바스크립트 모듈패턴은 특정 구성요소들을 다른 구성요소와 분리해 독립적으로 유지하기 위해 가장 많이 쓰이는 패턴이다.
이는 잘 구조화된 코드를 지원하기 위해 느슨한 결합을 제공한다.

객체지향 언어로 치자면 모듈은 클래스와 같다.
클래스의 장점들 중 하나인 캡슐화(Encapsulation)는 다른 클래스의 접근으로부터 상태와 행동을 보호한다.
모듈 패턴을 통해 자바스크립트에서 public과 private (덜 알려져 있고 접근 권한이 제한된) 액세스 레벨을 사용할 수 있다.

모듈은 private 스코프를 위해 즉시 실행 함수 표현 (Immediately-Invoked-Function-Expression : IIFE)을 사용한다. 즉, 클로져를 사용하여 변수와 메서드(이 메서드는 객체 대신 함수를 반환)를 보호한다.

모듈 패턴은 다음과 같이 나타낼 수 있다.

```javascript
(function() {

	// private 변수 또는 메서드를 선언
    
    return {
    
    	// public 변수 또는 메서드를 선언
        
    }
})();
```

함수 내부에서 객체를 반환하기 전에 private 변수 또는 메서드를 인스턴스화 한다. 클로저 외부에 있는 코드는 동일한 범위에 있지 않으므로 이 private 변수 또는 메서드에 접근할 수 없다.
보다 구체적인 구현은 다음과 같다.

```javascript
var HTMLChanger = (function() {
	var contents = 'contents';
    
    var changeHTML = function() {
    	var element = document.getElementById('attribute-to-change');
        element.innerHTML = contents;
    }
    
    return {
    	callChangeHTML: function() {
        	changeHTML();
            console.log(contents);
        }
    };
})();

HTMLChanger.callChangeHTML();	// Output: 'contents'
console.log(HTMLChanger.contents);	// undefined
```

`callChangedHTML`은 반환된 객체에 바인드되고, `HTMLChanger` 네임스페이스를 통해 참조할 수 있다. 그러나 모듈의 바깥에서는 `contents`에 직접 접근하여 참조할 수 없다.

## Revealing Module Pattern

모듈 패턴의 변형으로 *변형된 모듈 패턴*이 있다.
캡슐화를 유지하면서도 특정한 변수들과 메서드들을 반환한 리터럴 객체에서 접근가능하도록 드러내기 위한 패턴이다.
구체적인 구현은 다음과 같다.

```javascript
var Exposer = (function() {
	
    var privateVariable = 10;
    
    var privateMethod = function() {
    	console.log('Inside a private method!');
        privateVariable++;
    }
    
    var methodToExpose = function() {
    	console.log('This is a method I want to expose!');
    }
    
    var otherMethodIWantToExpose = function() {
    	privateMethod();
    }
    
    return {
    	first: methodToExpose, 
        second: otherMethodIWantToExpose
    }

})();

Exposer.first();	// Output: This is a method I want to expose!
Exposer.second();	// Output: Inside a private method!
Exposer.methodToExpose;		// undefined
```

보기엔 깔끔해보이지만 단점은 private 메서드를 참조할 수 없다는 것이다.(?)
또한 public 스코프르 오버라이드 할 수 없다.(?)

## Prototype Design Pattern

모든 자바스크립트 개발자들이 *prototype*이란 키워드를 볼 때, 프로토타입 방식 상속인지 혹은 코드 상에서 prototype을 구현한 것인지 혼란스러워 한다.
프로토타입 디자인 패턴은 자바스크립트의 프로토타입 방식 상속에 기초한 방법이다.
프로토타입 모델은 주로 성능 집약적인 상황에서 오브젝트를 생성하는데 사용된다.

오브젝트 생성 시, 생성된 객체는 원본 객체의 복제(얕은 복제)이다.
프로토타입 패턴의 사용 예 중 하나는 어플리케이션의 한 부분으로써 대규모 데이터베이스 명령을 수행하는 오브젝트를 생성하는 것이다.
만약 다른 프로세스에서 이 객체를 사용해야할 때에 별도의 DB 명령을 수행하기보다는 이전에 생성했던 객체를 복제해서 사용하는 것이 더 효율적일 수 있다.

![Prototype Design Pattern on WIKIPEDIA](https://upload.wikimedia.org/wikipedia/commons/1/14/Prototype_UML.svg)

위 UML은 프로토타입 인터페이스가 프로토타입 패턴을 통해 어떻게 구현되는지 보여준다.

객체를 복제하려면, 첫 오브젝트를 객체화하기 위해 반드시 생성자가 있어야 한다.
다음으로, `prototype` 키워드를 사용하여 변수와 메서드를 오브젝트의 구조에 바인드해준다.

다음의 기본적인 예제를 살펴보자

```javascript
var TeslaModelS = function() {
	this.numWheels = 4;
    this.manufacturer = 'Tesla';
    this.make = 'Model S';
}

TeslaModelS.prototype.go = function() {
	// Rotate wheels
}

TeslaModelS.prototype.stop = function() {
	// Apply brake pads
}
```

생성자를 사용하여 단일 TeslaModelS 객체를 생성할 수 있다.
새로운 TeslaModelS 객체를 생성할 때, 해당 객체는 생성자의 초기화 상태가 유지된다.
또한 `prototype`을 통해 `go`와 `stop` 메서드를 관리가 편리하다.
`prototype` 객체를 정의하는 또 다른 방식은 다음과 같다.

```javascript
var TeslaModelS = function() {
	this.numWheels = 4;
    this.manufacturer = 'Tesla';
    this.make = 'Model S';
}

TeslaModelS.prototype = {
	go: function() {
    	// Rotate wheels
    }, 
    stop: function() {
    	// Apply brake pads
    }
}
```

## Revealing Prototype Pattern

*Revealing Prototype Pattern*은 객체 리터럴을 반환하기 때문에 public 및 private 멤버를 캡슐화한다.

```javascript
var TeslaModelS = function() {
	this.numWheels = 4;
    this.manufacturer = 'Tesla';
    this.make = 'Model S';
}

TeslaModelS.prototype = function() {
	var go = function() {
    	// Rotate wheels
    };
    
    var stop = function() {
    	// Apply brake pads
    };
    
    return {
    	pressBrakePedal: stop, 
        pressGasPedal: go
    }
}();
```

`go` 함수와 `stop` 함수는 반환된 객체의 스코프에서 벗어나 있기 때문에 직접 접근할 수 없도록 제한되어 있다. 
자바스크립트는 자체적으로 프로토타입 방식 상속을 지원하기 때문에 기본 기능을 재작상할 필요가 없다.

## Observer Design Pattern

어플리케이션에서 한 부분이 바뀌는 경우, 어플리케이션의 다른 부분들이 갱신되어야 하는 경우가 많다.
AngularJS에서는 `$scope` 객체가 갱신되면 갱신되었음을 알리는 이벤트가 다른 컴포넌트들에게 고지된다.
Observer Pattern은 한 객체가 변경되었을 때에 그에 의존적인 객체들에게 변경되었음을 알리도록 구성된 패턴이다.

Observer Pattern의 다른 주요한 예는 바로 **Model View Controller 아키텍쳐**이다.
MVC 아키텍처에서는 Model이 갱신된 경우 View를 변경한다.
이 경우 Model과 View가 분리되어 코드상에서 종속성이 감소한다.

![Observer Design Pattern on WIKIPEDIA](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Observer.svg/1000px-Observer.svg.png)

위의 UML 다이어그램에서 볼 수 있듯이, `subject`, `observer`, `concrete` 오브젝트가 필요하다.
`subject`는 변경점들을 고지하기 위해 실질적인 observer 객체를 참조하고 있다.
`observer` 객체는 추상 클래스로써, `notify` 메서드를 구현하여 실질 observer 객체를 구현한다.

AngularJS의 이벤트 관리자를 통해 Observer Pattern의 구현을 확인할 수 있다.

```javascript
// Controller 1
$scope.$on('nameChanged', function(event, args) {
	$scope.name = args.name;
});

// Controller 2
$scope.userNameChanged = function(name) {
	$scope.$emit('nameChanged', {name: name});
}
```


