import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';

typedef void ColorSelector(Color color);

class FormColorPicker extends StatefulWidget {

  final ColorSelector colorSelector;

  final Color initialColor;

  FormColorPicker({Key key, @required this.colorSelector, this.initialColor: const Color(0xff443a49)}): super(key: key);

  @override
  State<StatefulWidget> createState() => _FormColorPickerState(
    colorSelector: colorSelector,
    selectedColor: initialColor
  );
}

class _FormColorPickerState extends State {

  final ColorSelector colorSelector;

  Color selectedColor;

  _FormColorPickerState({@required this.colorSelector, this.selectedColor});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        FlatButton(
          child: Text('Select a color'),
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
              pickerColor: selectedColor,
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
                colorSelector(selectedColor);
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
      selectedColor = color;
    });
  }

}
