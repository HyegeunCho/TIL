import 'package:flutter/material.dart';
import 'package:flutter_docs/UserInterface/IntroductionToWidgets/MyButton.dart';
import 'package:flutter_docs/UserInterface/IntroductionToWidgets/AllTogether.dart';

class TutorialHome extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        // Scaffold is a layout for the major Material Components.
        return Scaffold(
            appBar: AppBar(
                leading: IconButton(
                    icon: Icon(Icons.menu),
                    tooltip: 'Navigation menu',
                    onPressed: null,
                ),
                title: Text('Example title'),
                actions: <Widget>[
                    IconButton(
                        icon: Icon(Icons.search),
                        tooltip: 'Search',
                        onPressed: null,
                    ),
                    MyButton(),
                ]
            ),
            // body is the majority of the screen.
            body: Center(
                //child: Text('Hello, World!')
                //child: Counter()
                child: ShoppingList(
                    products: <Product>[
                        Product(name: 'Eggs'),
                        Product(name: 'Flour'),
                        Product(name: 'Chocolate chips')
                    ]
                )
            ),
            floatingActionButton: FloatingActionButton(
                tooltip: 'Add', // used by assistive technologies
                child: Icon(Icons.add),
                onPressed: null
            ),
        );
    }
}