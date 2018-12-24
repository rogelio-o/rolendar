import 'package:sqflite/sqflite.dart';
import '../models/category.dart';
import 'TasksRepository.dart';

class CategoriesRepository {

  Database _db;

  TasksRepository _tasksRepository;

  CategoriesRepository(Database db, TasksRepository tasksRepository):
      _db = db,
      _tasksRepository = tasksRepository;

  Future<void> delete(String id) async {
    await _db.rawDelete(
      'DELETE FROM Categories WHERE id = ?',
      [id]
    );
    await _tasksRepository.deleteByCategoriesId(id);
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

  Future<Category> findById(String id) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM Categories WHERE id = ?',
      [id]
    );
    if(rows.length == 0) {
      return null;
    } else {
      return Category.fromRow(rows[0]);
    }
  }

  static Future<void> createTable(Database db) async {
    await db.execute(
      'DROP TABLE IF EXISTS category');
    await db.execute(
      'CREATE TABLE IF NOT EXISTS Categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT)');
  }

}
