import 'package:flutter/material.dart';
import '../../components/loading.dart';
import '../../repositories/Repositories.dart';
import '../../models/dayOfWeek.dart';
import '../../models/category.dart';
import '../../utils/dateUtils.dart';
import '../selectCategory/selectCategory.dart';

class SettingsScreen extends StatefulWidget {

  final Repositories repositories = Repositories();

  @override
  State<StatefulWidget> createState() => SettingsScreenState();

}

class SettingsScreenState extends State<SettingsScreen> {

  bool _loading;

  List<DayOfWeek> _daysOfWeeks;

  Map<String, Category> _categories;

  @override
  void initState() {
    super.initState();

    _loadData(context);
  }

  void _loadData(BuildContext context) {
    setState(() {
      _loading = true;
    });

    widget.repositories.daysOfWeek.findAll()
      .then((List<DayOfWeek> daysOfWeeks) {
        _loadCategories(daysOfWeeks)
          .then((List<Category> categories) {
            try {
              setState(() {
                _daysOfWeeks = daysOfWeeks;
                _categories = Map.fromIterable(
                  categories,
                  key: (category) => category.id
                );
                _loading = false;
              });
            } catch(e) {
              print(e);
            }
          });
      })
      .catchError((e) {
        print(e);
        setState(() {
          _loading = false;
        });
    });
  }

  Future<List<Category>> _loadCategories(List<DayOfWeek> daysOfWeeks) async {
    Set<String> categoriesIds = daysOfWeeks
      .map((day) => day.categoryId)
      .where((categoryId) => categoryId != null)
      .toSet();

    List<Category> categories = [];
    for(String categoryId in categoriesIds) {
      final Category category = await widget.repositories.categories.findById(categoryId);
      if(category != null) {
        categories.add(category);
      }
    }

    return categories;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
      ),
      body: _loading ? LoadingPage() : _buildBody(context),
    );
  }

  Widget _buildBody(BuildContext context) {
    return Container(
      color: Colors.white,
      child: ListView.builder(
        itemCount: _daysOfWeeks.length,
        itemBuilder: _buildItem
      )
    );
  }

  Widget _buildItem(BuildContext context, int index) {
    final DayOfWeek dayOfWeek = _daysOfWeeks[index];
    final Category category = dayOfWeek.categoryId == null ? null : _categories[dayOfWeek.categoryId];

    return Container(
      padding: EdgeInsets.only(top: 10, bottom: 10),
      child: ListTile(
        onTap: () => _changeCategory(index, dayOfWeek),
        leading: Container(
          width: 50,
          height: 50,
          decoration: _getBoxDecorationOfCategory(category),
          child: Center(
            child: Text(
              getWeekDayShortName(dayOfWeek.day),
              style: category != null ? TextStyle(color: Colors.white, fontWeight: FontWeight.bold) : null
            ),
          )
        ),
        title: category == null ?
          Text("Select a category", style: TextStyle(color: Colors.grey))
            :
          Text(category.name),
      )
    );
  }

  BoxDecoration _getBoxDecorationOfCategory(Category category) {
    if(category == null) {
      return new BoxDecoration(
        color: Colors.grey[50],
        border: Border.all(color: Colors.grey[200])
      );
    } else {
      final Color categoryColor = Color(int.parse(category.color));
      return new BoxDecoration(
        color: categoryColor,
        border: Border.all(color: categoryColor)
      );
    }
  }

  _changeCategory(int index, DayOfWeek dayOfWeek) async {
    final Category category = await Navigator.push(context, MaterialPageRoute(builder: (context) => SelectCategoryScreen()));
    if(category != null) {
      showLoading(context);

      final DayOfWeek newDayOfWeek = new DayOfWeek(day: dayOfWeek.day, categoryId: category.id);
      try {
        await widget.repositories.daysOfWeek.save(newDayOfWeek);

        setState(() {
          _categories[category.id] = category;
          _daysOfWeeks[index] = newDayOfWeek;
        });
      } catch(e) {
        print(e);
      }

      hideLoading(context);
    }
  }

}
