import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'formColorPicker.dart';

typedef void FormSubmitter({String name, Color color});

class CategoryForm extends StatefulWidget {

  final String title;

  final FormSubmitter submitter;

  CategoryForm({@required this.title, @required this.submitter});

  @override
  State<StatefulWidget> createState() => _CategoryFormState();

}

class _CategoryFormState extends State<CategoryForm> {

  final _formKey = GlobalKey<FormState>();

  String _name;

  Color _color;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        actions: [
          FlatButton(
            child: Text(
              'Save',
              style: TextStyle(color: Theme.of(context).primaryTextTheme.title.color)
            ),
            onPressed: _submit,
          )
        ],
      ),
      body: _buildForm(context),
    );
  }

  Widget _buildForm(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 30.0, vertical: 20.0),
      child: Form(
        key: _formKey,
        child: Column(
          children: [
            Container(
              margin: EdgeInsets.only(bottom: 20),
              child: TextFormField(
                validator: (value) => value.isEmpty ? 'Name is required.' : null,
                onSaved: (value) => _name = value,
                decoration: InputDecoration(
                  hintText: 'Name'
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(bottom: 20),
              child: FormColorPicker(
                onSaved: (value) => _color = value,
              ),
            )
          ],
        )
      )
    );
  }

  _submit() {
    FormState form = _formKey.currentState;
    if(form.validate()) {
      form.save();

      widget.submitter(name: _name, color: _color);
    }
  }

}
