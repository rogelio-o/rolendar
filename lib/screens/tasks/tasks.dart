import 'package:flutter/material.dart';
import 'package:after_layout/after_layout.dart';
import '../addCategory/addCategory.dart';
import '../../components/loading.dart';
import '../../models/category.dart';
import '../../repositories/categoriesRepository.dart';

class TasksScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Categories'),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) => AddCategoryScreen()));
            },
          ),
        ]
      ),
      body: ListCategories(),
    );
  }

}

class ListCategories extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => ListCategoriesState();

}

class ListCategoriesState extends State<ListCategories> with AfterLayoutMixin<ListCategories> {

  List<Category> _categories = [];

  @override
  void initState() {
    super.initState();
  }

  @override
  void afterFirstLayout(BuildContext context) {
    showLoading(context);

    findAllCategories()
      .then((List<Category> categories) {
        try {
          hideLoading(context);

          setState(() {
            _categories = categories;
          });
        } catch(e) {
          print(e);
        }
      })
      .catchError((e) {
        hideLoading(context);
      });
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: _categories.length,
      itemBuilder: (context, index) {
        final Category category = _categories[index];

        return ListTile(
          title: Text(category.name)
        );
      }
    );
  }

}
