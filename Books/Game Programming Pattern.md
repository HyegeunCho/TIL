# 1. 소프트웨어 구조란?

## 좋은 소프트웨어 구조란
뭔가를 고쳐야 할 때 그럴 줄 알았다는 듯이 코드가 준비되어 있는 걸 의미한다.
먼저 **'구조는 변경과 관련이 있다.'**

## 디커플링은 어떻게 도움이 되는가?
양쪽 코드 중에서 한쪽이 없으면 코드를 이해할 수 없을 때 두 코드가 커플링되어 있다고 볼 수 있다.
소프트웨어 구조의 핵심 목표는, **작업에 들어가기 전에 알아야 할 지식의 양을 줄이는 것**이다.

## 마치며 

- 추상화와 디커플링을 잘 활용하면 코드를 점차 쉽고 빠르게 만들 수 있다. 하지만, 지금 고민 중인 코드에 유여함이 필요하다는 확신이 없다면 추상화와 디커플리을 적용하느라고 시간 낭비하지 말자.
- 개발 내내 성능을 고민하고, 최적화에 맞게 설계해야 한다. 하지만 가정을 코드에 박아 넣어야 하는 저수준의 핵심 최적화는 가능하면 늦게 하라.
- 게임 기획 내용을 확인해볼 수 있도록 빠르게 개발하되, 너무 서두르느라 코드를 엉망으로 만들지 말자. 결국 그 코드로 작업해야 하는 건 우리다.
- 나중에 버릴 코드를 잘 만들겠다고 시간 낭비하지 말자. 록 스타들이 호텔 방을 어지르는 이유는 다음 날 계산하고 나가면 그만이라는 것을 알기 때문이다.
- 무엇보다, **뭔가 재미있는 걸 만들고 싶다면 먼저 만드는 데에서 재미를 느껴보라.**


# 2. 명령

**명령 패턴은 메서드 호출을 실체화한 것이다.**


## 2.1. 입력키 변경

게임에서 각 버튼을 눌렀을 때 플레이어가 특정한 동작을 하도록 구현한다면 다음과 같다.

```cpp
void InputHandler::handleInput()
{
	if (isPressed(BUTTON_X)) jump();
    else if (isPressed(BUTTON_Y)) fireGun();
    else if (isPressed(BUTTON_A)) swapWeapon();
    else if (isPressed(BUTTON_B)) lurchIneffectively();
}
```

만약 설정에서 키 입력을 바꿀 수 있는 기능을 추가한다고 하자.
키 변경을 지원하려면 `jump()`나 `fireGun()` 같은 함수를 직접 호출하지 말고 교체 가능한 객체가 있어 이를 변수에 할당해야 한다. **이제 명령 패턴이 등장할 때다.**

게임에서 할 수 있는 행동을 실행할 수 있는 공통 상위 클래스부터 정의한다.

```cpp
class Command {
public:
	virtual ~Command() {}
    virtual void execute() = 0;
};
```

이제 각 행동별로 하위 클래스를 만든다.

```cpp
class JumpCommand : public Command {
public:
	virtual void execute() { jump(); }
};

class FireCommand : public Command {
public:
	virtual void execute() { fireGun(); }
};
```

입력 핸들러 코드에는 각 버튼별로 Command 클래스 포인터를 저장한다.

```cpp
class InputHandler {
public:
	void handleInput();
private:
	Command* buttonX_;
    Command* buttonY_;
    Command* buttonA_;
    Command* buttonB_;
};
```

그리고 아래 코드를 통해 입력처리가 위임된다.

```cpp
void InputHandler::handleInput() {
	if (isPressed(BUTTON_X)) buttonX_->execute();
    else if (isPressed(BUTTON_Y)) buttonY_->execute();
    else if (isPressed(BUTTON_A)) buttonA_->execute();
    else if (isPressed(BUTTON_B)) buttonB_->execute();
}
```

**직접 함수를 호출하던 코드 대신에, 한겹 우회하는 계층이 생겼다.**

## 2.2. 액터에게 지시하기

방금 정의한 Command 클래스는 *전역 함수가 플레이어 캐릭터 객체를 암시적으로 찾아서 꼭두각시 인형처럼 움직이게 할 수 있다*라는 가정이 깔려 있다는 점에서 제한적이다.

즉, 현재의 `JumpCommand`클래스는 오직 플레이어 캐릭터만 점프하게 만들 수 있다.
`jump()` 함수 내부에서 플레이어의 전역 객체를 찾아내어 사용하는 코드가 커플링되어 있는데,  이러한 커플링으로 인해 명령의 유용성이 떨어진다.

이러한 제약을 유연하게 만들기 위해 제어하려는 객체를 함수에서 직접 찾게 하지 말고 밖에서 전달해주면 커플링이 사라진다.

```cpp
class Command {
public:
	virtual ~Command() {}
    virtual void execute(GameActor& actor) = 0;
};
```

`Command`를 상속받은 클래스는 `execute()`가 호출될 때 `GameActor` 객체를 인수로 받기 때문에 원하는 액터의 메서드를 호출할 수 있다.

```cpp
class JumpCommand : public Command {
public:
	virtual void execute(GameActor& actor) {
    	actor.jump();
    }
};
```

이제 입력 핸들러에서 입력을 ㅂ다아 적당한 객체의 메서드를 호출하는 명령 객체를 연결해 준다.
먼저 `handleInput()`에서 명령 객체를 **반환**하도록 변경한다.

```cpp
Command* InputHandler::handleInput() {
	if (isPressed(BUTTON_X)) return buttonX_;
    if (isPressed(BUTTON_Y)) return buttonY_;
    if (isPressed(BUTTON_A)) return buttonA_;
    if (isPressed(BUTTON_B)) return buttonB_;
    return NULL;
}
```

어떤 액터를 매개변수로 넘겨줘야 할지 모르기 때문에 `handleInput()`에서는 명령을 실행할 수 없다. 위 함수에서 반환하는 명령이 실체화된 함수 호출이라는 점을 활용해서, 함수 호출 시점을 **지연**한다.

다음으로 명령 객체를 받아 플레이어를 대표하는 `GameActor` 객체에 적용하는 코드가 필요하다.

```cpp
Command* command = inputHandler.handleInput();
if (command) {
	command->execute(actor);
}
```

명령과 액터 사이에 추상 계층을 한 단계 더 둔 덕분에, **명령을 실행할 때 액터만 바꾸면 플레이어가 게임에 있는 어떤 액터라도 제어할 수 있게 되었다.**

액터를 제어하는 `Command`를 일급 객체로 만든 덕분에, 메서드를 직접 호출하는 형태의 강한 커플링을 제거할 수 있었다. 

입력 핸들러나 AI 같은 코드에서는 명령 객체를 만들어 스트림에 밀어 넣는다.
디스패처나 액터에서는 명령 객체를 받아서 순차적으로 실행한다.
명령 스트림을 AI와 액터 사이에 끼워넣어서 생산자(AI)와 소비자(액터)를 디커플링할 수 있게 되었다.


## 2.3. 실행취소와 재실행

어떤 유닛을 옮기는 명령을 생각해보자.

```cpp
class MoveUnitCommand : public Command {
public:
	MoveUnitCommand(Unit* unit, int x, int y) : unit_(unit), x_(x), y_(y) {
    
    }
    
    virtual void execute() {
    	unit_->moveTo(x_, y_);
    }
    
private:
	Unit* unit_;
    int x_;
    int y_;
};
```

이전 예제에서는 명령에서 변경하려는 액터와 명령 사이를 **추상화**로 격리시켰지만 이번에는 이동하려는 유닛과 위치 값을 생성자에서 받아서 명령과 명시적으로 **바인드**했다.

즉, `MoveUnitCommand` 명령 인스턴스는 `JumpCommand` 처럼 무엇인가를 움직이는 보편적인 작업이 아니라 게임에서의 구체적인 실제 이동을 담고 있다.

`MoveUnitCommand` 클래스는 특정 시점에 발생될 일을 표현한다는 점에서 좀 더 구체적이다. 이를테면, 입력 핸들러 코드는 플레이어가 이동을 선택할 때마다 명령 인스턴스를 **생성**해야 한다.

```cpp
Command* handleInput() {
	Unit* unit = getSelectedUnit();
    if (isPressed(BUTTON_UP)) {
    	// 유닛을 한 칸 위로 이동한다.
        int destY = unit->y() - 1;
        return new MoveUnitCommand(unit, unit->x(), destY);
    }
    
    if (isPressed(BUTTON_X)) {
    	// 유닛을 한 칸 아래로 이동한다.
        int destY = unit->y() + 1;
        return new MoveUnitCommand(unit, unit->x(), destY);
    }
    
    // 다른 이동들 ...
    return NULL;
};
```

다음으론 `Command` 클래스에 명령을 취소할 수 있도록 `undo()` 메서드를 정의한다.

```cpp
class Command {
public:
	virtual ~Command(){}
    virtual void execute() = 0;
    virtual void undo() = 0;
};
```

`undo()` 메서드에서는 `execute()` 에서 변경하는 게임 상태를 반대로 바꿔주면 된다.
`MoveUnitCommand` 클래스에 실행취소 기능을 추가해 보자.

```cpp
class MoveUnitCommand : public Command {
public:
	MoveUnitCommand(Unit& unit, int x, int y) : unit_(unit), x_(x), y_(y), xBefore_(0, yBefore_(0)) {}
    
    virtual void execute() {
    	// 나중에 이동을 취소할 수 있도록 원래 유닛 위치를 저장한다.
        xBefore_ = unit->x();
        yBefore_ = unit->y();
        unit_->moveTo(x_, y_);
    }
    
    virtual void undo() {
    	unit_->moveTo(xBefore_, yBefore_);
    }
    
private:
	Unit* unit_;
    int x_, y_;
    int xBefore_, yBefore_;
};
```

여러 단계의 실행취소를 지원하는 것도 그다지 어렵지 않다.
가장 최근 명령만 기억하는 대신, 명령 목록을 유지하고 "현재" 명령이 무엇인지만 알고 있으면 된다.


## 2.4. 클래스만 좋고, 함수형은 별로인가?

명령은 일급 함수나 클로저와 비슷하다.
어떻게 보면 명령 패턴은 클로저를 지원하지 않는 언어에서 클로저를 흉내내는 방법 중 하나이다.

**자바스크립트**로 게임을 만든다면 유닛 이동 명령을 다음과 같이 만들 수 있다.

```js
function makeMoveUnitCommand(unit, x, y) {
	// 아래 function이 명령 객체에 해당한다.
    return function() {
    	unit.moveTo(x, y);
    }
}
```

클로저를 여러개 이용하면 실행 취소도 지원할 수 있다.

```js
function makeMoveUnitCommand(unit, x, y) {
	var xBefore, yBefore;
    
    return {
    	execute: function() {
        	xBefore = unit.x();
            yBefore = unit.y();
            unit.moveTo(x, y);
        }, 
        
        undo: function() {
        	unit.moveTo(xBefore, yBefore);
        }
    };
}
```

함수형 패러다임에서는 명령 패턴의 유용성을 쉽게 이용할 수 있다.


## 2.5. 관련자료

* 명령 패턴을 쓰다보면 수많은 `Command` 클래스를 만들어야 할 수 있다. 이럴 때에는 구체 상위 클래스에 여러 가지 편의를 제공하는 상위 레벨 메서드를 만들어놓은 뒤에 필요하면 하위 클래스에서 원하는 작동을 재정의할 수 있게 하면 좋다. 이러면 명령 클래스의 execute 메서드가 하위 클래스 샌드박스 패턴으로 발전하게 된다.
* 예제에서는 어떤 액터가 명령을 처리할지를 명시적으로 지정했다. 하지만 계층 구조 객체 모델에서처럼 누가 명령을 처리할지가 그다지 명시적이지 않을 수도 있다. 객체가 명령에 반응할 수도 있고 종속 객체에 명령 처리를 떠넘길 수도 이싸면 GoF의 책임 연쇄 패턴이라고도 볼 수 있다.
* 어떤 명령은 처음 예제에 등장한 `JumpCommand` 클래스처럼 상태없이 순수하게 행위만 정의되어 있을 수 있다. 이런 클래스는 모든 인스턴스가 같기 때문에 인스턴스를 여러 개 만들어봐야 메모리만 낭비한다. 이 문제는 경량 패턴으로 해결할 수 있다.



# 3. 경량

**공유를 통해 많은 수의 소립 객체들을 효과적으로 지원한다.**



