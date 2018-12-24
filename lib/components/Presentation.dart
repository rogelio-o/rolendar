import 'package:flutter/material.dart';

class Presentation extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        color: Theme.of(context).primaryColor,
        alignment: Alignment(0.0, 0.0),
        child: SizedBox(
          child: CircularProgressIndicator(
            valueColor: new AlwaysStoppedAnimation<Color>(Theme.of(context).primaryTextTheme.title.color),
          ),
          height: 50.0,
          width: 50.0,
        ),
      ),
    );
  }

}
