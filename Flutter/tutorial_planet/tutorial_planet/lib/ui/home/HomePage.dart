import 'package:flutter/material.dart';
import 'package:tutorial_planet/ui/home/GradientAppBar.dart';
import 'package:tutorial_planet/ui/home/HomePageBody.dart';

class HomePage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
    return new Scaffold(
        body: new Column(
            children: <Widget>[
                new GradientAppBar("treva"),
                new HomePageBody(),
                new HomePageBody(),
                new HomePageBody(),
                new HomePageBody(),
            ],
        )
    );
  }
}