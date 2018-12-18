import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';
import '../../components/categoryForm.dart';
import '../../components/loading.dart';
import '../../models/category.dart';
import '../../repositories/categoriesRepository.dart';

final Uuid uuid = Uuid();

class AddCategoryScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return CategoryForm(title: "Add Category", submitter: ({name, color}) => _save(context, name: name, color: color));
  }

  _save(BuildContext context, {String name, Color color}) {
    showLoading(context);

    final Category category = new Category(id: uuid.v4(), name: name, color: color.toString());
    saveCategory(category)
      .then((_) {
        hideLoading(context);
        Navigator.of(context).pop();
      }).catchError(() {
        hideLoading(context);
      });
  }

}
