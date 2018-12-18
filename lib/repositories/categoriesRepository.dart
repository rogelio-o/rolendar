import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/category.dart';

final String _KEY = "CATEGORIES";
final Map<String, Category> _CATEGORIES = {};
bool LOADED_CATEGORIES = false;

Future<void> _save() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  prefs.setString(_KEY, jsonEncode(_CATEGORIES.values.toList()));
}

Future<void> _load() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String str = prefs.getString(_KEY);
  LOADED_CATEGORIES = true;

  if (str != null) {
    List<Category> array = jsonDecode(str, reviver: (index, c) {
      print(c);
      return new Category(id: null, name: null, color: null);
    });
    array.forEach((category) => (_CATEGORIES[category.id] = category));
  }
}

Future<void> deleteCategory(String id) async {
  _CATEGORIES.remove(id);

  await _save();
}

Future<void> saveCategory(Category category) async {
  try {
    await _load();

    _CATEGORIES[category.id] = category;

    await _save();
  } catch(e) {
    print(e);
  }
}

Future<void> findCategoryById(String id) async {
  if (LOADED_CATEGORIES) {
    return _CATEGORIES[id];
  } else {
    await _load();

    return _CATEGORIES[id];
  }
}

Future<List<Category>> findAllCategories() async {
  if (LOADED_CATEGORIES) {
    return Future.value(_CATEGORIES.values.toList());
  } else {
    await _load();

    return _CATEGORIES.values;
  }
}
