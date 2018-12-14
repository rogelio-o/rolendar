import 'package:flutter/material.dart';
import 'formColorPicker.dart';

class CategoryForm extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _CategoryFormState();
}

class _CategoryFormState extends State<CategoryForm> {

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 30.0, vertical: 20.0),
      child: Form(
        key: _formKey,
        child: Column(
          children: [
            TextFormField(
              validator: (value) => value.isEmpty ? 'Name is required.' : null,
              decoration: InputDecoration(
                hintText: 'Name'
              ),
            ),
            FormColorPicker(colorSelector: changeColor)
          ],
        )
      )
    );
  }

  changeColor(Color color) {
    print(color);
  }

}
