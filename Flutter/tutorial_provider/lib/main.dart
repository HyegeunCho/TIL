// https://medium.com/@changjoopark/flutter%EC%9D%98-%EC%95%B1-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-provider-3bbec0bb7011

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

/// Counter의 현재 상태는 [_count]에 담는다.
/// [increment] 메소드로 [_count]를 증가시키고, 리스너에 변경 사항을 알린다.
/// ChangeNotifier를 mixin한 Counter 클래스 정의
class Counter with ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo', 
      theme: ThemeData(
        primarySwatch: Colors.blue, 
      ), 
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    int _counter = 0;
    return Scaffold(
      appBar: AppBar(
        title: Text('Provider Demo'), 
      ), 
      body: Center(
        child: Column()
      )
    )
  }
}