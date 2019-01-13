import 'package:flutter/material.dart';

// state를 갖고 있는 상위 위젯으로부터 count 값을 받아와 출력하기만
// 하는 presentation을 위한 위젯
// 상위의 StatefulWidget 으로부터 state 값을 "down" 받는다.
class CounterDisplay extends StatelessWidget {
    CounterDisplay({this.count}); // 리액트로 치면 property

    final int count;

    @override
    Widget build(BuildContext context) {
        return Text('Count: $count');
    }
}

// 유저의 입력을 받는 버튼을 생성하는 위젯
// 상위 위젯으로부터 전달 받은 delegate를 실행함으로써
// 이벤트를 "up"으로 dispatch 한다.
// 이로 인해 상위 State 클래스 내부의 state 값이 바뀌고
// 상위 State 클래스의 build 함수가 호출되어 변경된 값이 "down"되어 출력된다.
class CounterIncrementor extends StatelessWidget {
    CounterIncrementor({this.onPressed});

    final VoidCallback onPressed;

    @override
    Widget build(BuildContext context) {
        return RaisedButton(
            onPressed: onPressed,
            child: Text('Increment')
        );
    }
}

class Counter extends StatefulWidget {
    @override
    _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
    int _counter = 0;

    void _increment() {
        setState(() {
            ++_counter;
        });
    }

    @override
    Widget build(BuildContext context) {
        return Column(
            children: <Widget>[
                CounterIncrementor(onPressed: _increment,),
                CounterDisplay(count: _counter)
            ],
        );
    }
}