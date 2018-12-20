import 'package:flutter/material.dart';
import 'package:rolendar/components/Layout.dart';
import 'package:rolendar/components/Presentation.dart';
import 'repositories/Repositories.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => MyAppState();

}

class MyAppState extends State<MyApp> {

  bool _loading;

  @override
  void initState() {
    super.initState();

    _loading = true;

    Repositories.open()
      .then((_) {
        setState(() {
          _loading = false;
        });
      }).catchError(() {
        setState(() {
        _loading = false;
        });
      });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Rolendar',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: _loading ? Presentation() : Layout()
    );
  }
}
