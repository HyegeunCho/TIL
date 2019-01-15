import 'package:flutter/material.dart';
import 'package:flutter/animation.dart';
import 'package:flutter_docs/UserInterface/Animations/LogoApp.dart';

class AnimatedLogo extends AnimatedWidget {
    AnimatedLogo({Key key, Animation<double> animation}) : super(key:key, listenable: animation);

    Widget build(BuildContext context) {
        final Animation<double> animation = listenable;
        return Center(
            child: Container(
                margin: EdgeInsets.symmetric(vertical: 10.0),
                height: animation.value,
                width: animation.value,
                child: FlutterLogo()
            )
        );
    }
}

class LogoApp extends StatefulWidget {
    _LogoAppState createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
    AnimationController controller;
    Animation<double> animation;

    initState() {
        super.initState();
        controller = AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
        animation = Tween(begin: 0.0, end: 300.0).animate(controller);
        controller.forward();
    }

    Widget build(BuildContext context) {
        return AnimatedLogo(animation: animation);
    }

    dispose() {
        controller.dispose();
        super.dispose();
    }

}