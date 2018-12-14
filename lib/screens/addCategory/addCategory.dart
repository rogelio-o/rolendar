import 'package:flutter/material.dart';
import '../../components/categoryForm.dart';

class AddCategoryScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Category'),
      ),
      body: CategoryForm(),
    );
  }
}
