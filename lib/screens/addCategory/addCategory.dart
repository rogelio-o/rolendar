import 'package:flutter/material.dart';
import '../../components/categoryForm.dart';
import '../../components/loading.dart';
import '../../models/category.dart';
import '../../repositories/Repositories.dart';

class AddCategoryScreen extends StatelessWidget {

  final Repositories repositories = Repositories();

  @override
  Widget build(BuildContext context) {
    return CategoryForm(title: "Add Category", submitter: ({name, color}) => _save(context, name: name, color: color));
  }

  _save(BuildContext context, {String name, Color color}) {
    showLoading(context);

    final Category category = new Category(name: name, color: color.value.toString());
    repositories.categories.save(category)
      .then((_) {
        hideLoading(context);
        Navigator.of(context).pop(true);
      }).catchError(() {
        hideLoading(context);
      });
  }

}
