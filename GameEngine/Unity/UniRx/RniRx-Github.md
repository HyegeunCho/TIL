# UniRx - Reactive Extensions for Unity 

[UniRx github link](https://github.com/neuecc/UniRx)

## What is UniRx?

[UniRx](https://github.com/neuecc/UniRx) (Reactive Extensions for Unity)는 [.NET Reactive Extensions](https://github.com/Reactive-Extensions/Rx.NET)를 유니티로 재구현한 것이다.
기존 Rx는 유니티와 iOS IL2CPP 환경에서 제대로 구동하지 않는 이슈가 있었다.
UniRx는 위 이슈를 수정하고 추가로 몇가지 유니티 유틸리티들을 추가하였다.

UniRx는 다음과 같은 요소로 구성되어 있다.
- Core Library (Port of Rx)
- Platform Adaptor (MainThreadScheduler / FromCoroutine / etc)
- Framework (ObservableTriggers / ReactiveProperty / etc)

## Why Rx?

Ordinarily, Network operations in Unity require the use of WWW and Coroutine. (*일반적으로 유니티의 네트워크 명령을 사용하기 위해서는 `WWW`와 `Coroutine`이 필요하다.*)

아래와 같은 이유로 인해 `Coroutine`은 비동기 명령을 수행하기에 좋은 방법이 아니다.

1. Coroutine은 어떠한 값도 반환할 수 없다. 오직 IEnumerator 만을 반환한다.
2. Coroutine은 예외(exception)를 처리할 수 없다. yield return 문을 try-catch 명령으로 감쌀 수 없기 때문이다.

This kind of lack of composability causes operations to be close-coupled, which often results in huge monolithic IEnumerators. (이러한 합성가능성의 부족으로 인해 명령들이 근접결합되는 경우가 발생한다. 즉, 각 IEnumerators가 거대한 로직의 집합체가 되는 경우가 발생한다.)

Rx cures that kind of "asynchronous blues". Rx is a library for composing asynchronous and event-based programs using observable collections and LINQ-style query operators.

게임 루프 (every Update, OnCollisionEnter, etc), 센서 데이터 (Kinect, Leap Motion, VR Input, etc.) 들은 이벤트로 분류할 수 있다.

Rx는 이벤트들을 LINQ 쿼리 명령을 사용하여 쉽게 합성할 수 있고 시간 기반 명령을 지원하는 reactive sequence로 표한할 수 있다.

Unity is generally single threaded but UniRx facilitates multithreading for joins, cancels, accessing GameObjects, etc.

UniRx helps UI programming with uGUI. All UI events (clicked, valuechanged, etc) can be converted to UniRx event streams.
