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


## 2.1 입력키 변경

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

## 2.2 액터에게 지시하기

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