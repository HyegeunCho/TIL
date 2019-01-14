import 'package:flutter/material.dart';

class LogoApp extends StatefulWidget {
    @override
    _LogoAppState createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
    Animation<double> animation;
    AnimationController controller;

    @override
    initState() {
        super.initState();
        controller = AnimationController(
            duration: const Duration(milliseconds: 2000),
            vsync: this
        );
        animation = Tween(begin: 0.0, end: 300.0).animate(controller)
            ..addListener(() {
                setState(() {
                    // the state that has changed here is the animation object's value
                });
            });
        controller.forward();
    }

    @override
    Widget build(BuildContext context) {
        return Center(
            child: Container(
                margin: EdgeInsets.symmetric(vertical: 10.0),
                height: animation.value,
                width: animation.value,
                child: FlutterLogo(),
            )
        );
    }

    dispose() {
        controller.dispose();
        super.dispose();
    }
}

