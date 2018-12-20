import 'package:sqflite/sqflite.dart';
import '../models/category.dart';

class CategoriesRepository {

  Database _db;

  CategoriesRepository(Database db):
      _db = db;

  Future<void> delete(String id) async {
    await _db.rawDelete(
      'DELETE FROM Categories WHERE id = ?',
      [id]
    );
  }

  Future<void> save(Category category) async {
    try {
      if (category.id == null) {
        int id = await _db.rawInsert(
          'INSERT INTO Categories(name, color) VALUES(?, ?)',
          [category.name, category.color]
        );
        category.id = id.toString();
      } else {
        await _db.rawUpdate(
          'UPDATE Categories SET name = ?, color = ? WHERE id = ?',
          [category.name, category.color, category.id]
        );
      }
    } catch(e) {
      print(e);
    }
  }

  Future<List<Category>> findAll() async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery('SELECT * FROM Categories ORDER BY id ASC');
    return rows.map((row) => Category.fromRow(row)).toList();
  }

  static Future<void> createTable(Database db) async {
    await db.execute(
      'DROP TABLE IF EXISTS category');
    await db.execute(
      'CREATE TABLE IF NOT EXISTS Categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT)');
  }

}
