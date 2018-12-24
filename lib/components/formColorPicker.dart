import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';

typedef void ColorSelector(Color color);

class FormColorPicker extends FormField<Color> {

  FormColorPicker({
    Key key,
    FormFieldSetter<Color> onSaved,
    FormFieldValidator<Color> validator,
    Color initialValue,
    bool autovalidate = false,
    bool enabled = true,
  }): super(
    key: key,
    builder: (FormFieldState<Color> field) {
      return _ColorPicker(
        onChange: field.didChange,
        initialValue: field.value,
      );
    },
    onSaved: onSaved,
    validator: validator,
    initialValue: initialValue == null ? const Color(0xff000000) : initialValue,
    autovalidate: autovalidate,
    enabled: enabled
  );

  @override
  FormFieldState<Color> createState() => FormFieldState<Color>();

}

class _ColorPicker extends StatefulWidget {

  final ColorSelector onChange;

  final Color initialValue;

  _ColorPicker({Key key, @required this.onChange, @required this.initialValue}): super(key: key);

  @override
  State<_ColorPicker> createState() => _FormColorPickerState();

}

class _FormColorPickerState extends State<_ColorPicker> {

  Color _selectedColor;

  Color _value;

  @override
  void initState() {
    super.initState();
    _selectedColor = widget.initialValue;
    _value = widget.initialValue;
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(
          child: Container(
            height: 35,
            color: _value,
            margin: EdgeInsets.only(right: 10),
          ),
        ),
        FlatButton(
          child: Text('Select a color'),
          color: Theme.of(context).primaryColor,
          textColor: Theme.of(context).primaryTextTheme.title.color,
          onPressed: _openDialog
        )
      ],
    );
  }

  _openDialog() {
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          title: const Text('Pick a color!'),
          content: SingleChildScrollView(
            child: ColorPicker(
              pickerColor: _value,
              onColorChanged: changeColor,
              enableLabel: true,
              pickerAreaHeightPercent: 0.8,
            )
          ),
          actions: [
            FlatButton(
              child: Text("Cancel"),
              onPressed: () => Navigator.of(context).pop()
            ),
            FlatButton(
              child: Text("Save", style: TextStyle(fontWeight: FontWeight.bold)),
              onPressed: () {
                _value = _selectedColor;
                widget.onChange(_value);
                Navigator.of(context).pop();
              }
            )
          ]
        );
      }
    );
  }

  changeColor(Color color) {
    setState(() {
      _selectedColor = color;
    });
  }

}
