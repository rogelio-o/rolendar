import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import '../addCategory/addCategory.dart';
import '../updateCategory/updateCategory.dart';
import '../../components/loading.dart';
import '../../models/category.dart';
import '../../repositories/Repositories.dart';

class TasksScreen extends StatefulWidget {

  final Repositories repositories = Repositories();

  @override
  State<StatefulWidget> createState() => TasksScreenState();

}

class TasksScreenState extends State<TasksScreen> {

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
        title: Text('Categories'),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) => AddCategoryScreen()))
                .then((insert) => insert != null && insert ? _loadData(context) : null);
            },
          ),
        ]
      ),
      body: _loading ? LoadingPage(context) : _buildList(context),
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
    return Slidable(
      delegate: new SlidableDrawerDelegate(),
      actionExtentRatio: 0.25,
      child: new Container(
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
        ),
      ),
      secondaryActions: <Widget>[
        new IconSlideAction(
          caption: 'Update',
          color: Colors.blue,
          icon: Icons.edit,
          onTap: () => _goToUpdate(context, item),
        ),
        new IconSlideAction(
          caption: 'Delete',
          color: Colors.red,
          icon: Icons.delete,
          onTap: () => _delete(context, index),
        ),
      ],
    );
  }

  _goToUpdate(BuildContext context, Category category) {
    Navigator.push(context, MaterialPageRoute(builder: (context) => UpdateCategoryScreen(category)))
      .then((insert) => insert != null && insert ? _loadData(context) : null);
  }

  _delete(BuildContext context, int index) {
    showLoading(context);

    widget.repositories.categories.delete(_categories[index].id)
      .then((_) {
        hideLoading(context);

        setState(() {
          _categories.removeAt(index);
        });
    }).catchError((_) => hideLoading(context));
  }

}
