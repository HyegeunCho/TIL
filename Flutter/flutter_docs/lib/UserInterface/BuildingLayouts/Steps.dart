import 'package:flutter/material.dart';

class BuildingLayoutsApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {

        Widget titleSection = Container(
            padding: const EdgeInsets.all(32.0),
            child: Row(
                children: [
                    Expanded(
                        // 1 : Putting a Column inside an Expanded widget stretches the column to use all remaining free
                        // space in the row. Setting the crossAxisAlignment property to CrossAxisAlignment.start
                        // positions the column a t the start of the row
                        child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                                // 2 : Putting the first row of text inside a Container enableds you to add padding.
                                // The second child in the Column, also text, displays as grey
                                Container(
                                    padding: const EdgeInsets.only(bottom: 8.0),
                                    child: Text(
                                        'Oeschinen Lake Campground',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold
                                        )
                                    ),
                                ),
                                Text(
                                    'Kandersteg, Switzerland',
                                    style: TextStyle(
                                        color: Colors.grey[500],
                                    )
                                )
                            ]
                        )
                    ),
                    // 3 : The last two items in the title row are a star icon, painted red, and the text 41.
                    // The entire row is in a Container and padded along each edge by 32 pixels.
                    Icon(
                        Icons.star,
                        color: Colors.red[500]
                    ),
                    Text('41')
                ]
            )
        );

        Color color = Theme.of(context).primaryColor;

        Widget buttonSection = Container(
            child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                    _buildButtonColumn(color, Icons.call, 'CALL'),
                    _buildButtonColumn(color, Icons.near_me, 'ROUTE'),
                    _buildButtonColumn(color, Icons.share, 'SHARE'),
                ],
            )
        );

        Widget textSection = Container(
            padding: const EdgeInsets.all(32.0),
            child: Text(
                'Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese '
                'Alps. Situated 1,578 meters above sea level, it is one of the '
                'larger Alpine Lakes. A gondola ride from Kandersteg, followed by a '
                'half-hour walk through pastures and pine forest, leads you to the '
                'lake, which warms to 20 degrees Celsius in the summer. Activities '
                'enjoyed here include rowing, and riding the summer toboggan run.',
                softWrap: true, // text lines will fill the column width before wrapping at a word boundary
            ),
        );

        return MaterialApp(
            title: 'Flutter Layout Demo',
            home: Scaffold(
                appBar: AppBar(
                    title: Text('Top Lakes')
                ),
                body: ListView(
                    children: [
                        Image.asset(
                           'images/lake.jpg',
                           width: 600.0,
                           height: 240.0,
                           fit: BoxFit.cover
                        ),
                        titleSection,
                        buttonSection,
                        textSection,
                    ]
                )
            ),
        );
    }

    Column _buildButtonColumn(Color color, IconData icon, String label) {
        return Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
                Icon(icon, color: color),
                Container(
                    margin: const EdgeInsets.only(top: 8.0),
                    child: Text(
                        label,
                        style: TextStyle(
                            fontSize: 12.0,
                            fontWeight: FontWeight.w400,
                            color: color,
                        )
                    )
                )
            ]
        );
    }
}