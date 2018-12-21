import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'formColorPicker.dart';

typedef void FormSubmitter({String name, String description});

class TaskForm extends StatefulWidget {

  final String title;

  final FormSubmitter submitter;

  final String initialName;

  final String initialDescription;

  TaskForm({
    @required this.title,
    @required this.submitter,
    this.initialName,
    this.initialDescription
  });

  @override
  State<StatefulWidget> createState() => _TaskFormState();

}

class _TaskFormState extends State<TaskForm> {

  final _formKey = GlobalKey<FormState>();

  String _name;

  String _description;

  @override
  void initState() {
    super.initState();

    _name = widget.initialName;
    _description = widget.initialDescription;
  }

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
                initialValue: _name,
                onSaved: (value) => _name = value,
                decoration: InputDecoration(
                  hintText: 'Name'
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(bottom: 20),
              child: TextFormField(
                initialValue: _description,
                onSaved: (value) => _description = value,
                maxLines: 5,
                decoration: InputDecoration(
                  hintText: 'Description'
                ),
              ),
            ),
          ],
        )
      )
    );
  }

  _submit() {
    FormState form = _formKey.currentState;
    if(form.validate()) {
      form.save();

      widget.submitter(name: _name, description: _description);
    }
  }

}
