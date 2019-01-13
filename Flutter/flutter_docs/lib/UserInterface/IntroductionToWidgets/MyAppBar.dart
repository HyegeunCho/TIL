import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget {
    MyAppBar({this.title});

    // Fields in a Widget subclass are always marked 'final'.
    final Widget title;

    @override
    Widget build(BuildContext context) {
        return Container(
            height: 56.0,
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            decoration: BoxDecoration(color: Colors.blue[500]),
            child: Row( // Row is a horizontal, linear layout
                children: <Widget>[ // <Widget> is the type of items in the list.
                    IconButton(
                        icon: Icon(Icons.menu),
                        tooltip: 'Navigation menu',
                        onPressed: null, // null disables the button
                    ),
                    Expanded( // Expanded expands its child to fill the available space.
                        child: title,
                    ),
                    IconButton(
                        icon: Icon(Icons.search),
                        tooltip: 'Search',
                        onPressed: null,
                    ),
                ],
            ),
        );
    }
}

class MyScaffold extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return Material( // Material is a conceptual piece of paper on which  the UI appears.
            child: Column( // Column is vertical, linear layout.
                children: <Widget>[
                    MyAppBar(
                        title: Text(
                            'Example title',
                            style: Theme.of(context).primaryTextTheme.title,
                        ),
                    ),
                    Expanded(
                        child: Center(
                            child: Text('Hello, world!'),
                        ),
                    ),
                ],

            ),
        );
    }
}