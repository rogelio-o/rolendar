import 'package:flutter/material.dart';
import '../../components/categoryForm.dart';
import '../../components/loading.dart';
import '../../models/category.dart';
import '../../repositories/Repositories.dart';

class UpdateCategoryScreen extends StatelessWidget {

  final Repositories repositories = Repositories();

  final Category _category;

  UpdateCategoryScreen(Category category):
      _category = category;

  @override
  Widget build(BuildContext context) {
    return CategoryForm(
      title: "Update Category",
      submitter: ({name, color}) => _save(context, name: name, color: color),
      initialName: _category.name,
      initialColor: _category.color,
    );
  }

  _save(BuildContext context, {String name, Color color}) {
    showLoading(context);

    final Category category = new Category(id: _category.id, name: name, color: color.value.toString());
    repositories.categories.save(category)
      .then((_) {
        hideLoading(context);
        Navigator.of(context).pop(true);
      }).catchError(() {
        hideLoading(context);
      });
  }

}
