import 'package:flutter/material.dart';
import '../../components/loading.dart';
import '../../models/category.dart';
import '../../repositories/Repositories.dart';

class SelectCategoryScreen extends StatefulWidget {

  final Repositories repositories = Repositories();

  @override
  State<StatefulWidget> createState() => SelectCategoryScreenState();

}

class SelectCategoryScreenState extends State<SelectCategoryScreen> {

  List<Category> _categories = [];

  bool _loading = false;

  @override
  void initState() {
    super.initState();

    _loadData(context);
  }

  void _loadData(BuildContext context) {
    setState(() {
      _loading = true;
    });

    widget.repositories.categories.findAll()
      .then((List<Category> categories) {
      try {
        setState(() {
          _categories = categories;
          _loading = false;
        });
      } catch(e) {
        print(e);
      }
    })
      .catchError((e) {
      print(e);
      setState(() {
        _loading = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Select a category'),
      ),
      body: _loading ? LoadingPage() : _buildList(context),
    );
  }

  Widget _buildList(BuildContext context) {
    return ListView.builder(
      itemCount: _categories.length,
      itemBuilder: (context, index) {
        final Category category = _categories[index];

        return _buildItem(context, index, category);
      }
    );
  }

  Widget _buildItem(BuildContext context, int index, Category item) {
    return new Container(
      decoration: new BoxDecoration(
        color: Colors.white,
        border: new Border(bottom: BorderSide(color: Colors.grey[200]))
      ),
      child: new ListTile(
        leading: new Container(
          color: Color(int.parse(item.color)),
          width: 30,
          height: 30,
        ),
        title: new Text(item.name),
        onTap: () => Navigator.of(context).pop(item),
      ),
    );
  }

}
