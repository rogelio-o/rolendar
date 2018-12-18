import 'package:flutter/material.dart';

void showLoading(BuildContext context) {
  showDialog(
    context: context,
    barrierDismissible: false,
    builder: (BuildContext ctx) {
      return new Dialog(
        child: Container(
          padding: EdgeInsets.all(20),
          child: new Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              new CircularProgressIndicator(),
              Container(
                child: new Text("Loading"),
                padding: EdgeInsets.only(left: 20),
              ),
            ],
          ),
        ),
      );
    }
  );
}

void hideLoading(BuildContext context) {
  Navigator.of(context, rootNavigator: true).pop('dialog');
}
