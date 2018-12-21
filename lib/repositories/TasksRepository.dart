import 'package:sqflite/sqflite.dart';
import '../models/task.dart';

class TasksRepository {

  Database _db;

  TasksRepository(Database db):
      _db = db;

  Future<List<Task>> findAllByCategory(String categoryId) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM Tasks WHERE categoryId = ? ORDER BY id ASC',
      [categoryId]
    );
    return rows.map((row) => Task.fromRow(row)).toList();
  }

  Future<List<Task>> findAllByParentTask(String parentTaskId) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM Tasks WHERE parentId = ? ORDER BY id ASC',
      [parentTaskId]
    );
    return rows.map((row) => Task.fromRow(row)).toList();
  }

  Future<void> save(Task task) async {
    try {
      if (task.id == null) {
        int id = await _db.rawInsert(
          'INSERT INTO Tasks(parentId, name, description, categoryId, done) VALUES(?, ?, ?, ?, ?)',
          [task.parentId, task.name, task.description, task.categoryId, task.done]
        );
        task.id = id.toString();
      } else {
        await _db.rawUpdate(
          'UPDATE Tasks SET parentId = ?, name = ?, description = ?, categoryId = ?, done = ? WHERE id = ?',
          [task.parentId, task.name, task.description, task.categoryId, task.done, task.id]
        );
      }
    } catch(e) {
      print(e);
    }
  }

  Future<void> delete(String id) async {
    await _db.rawDelete(
      'DELETE FROM Tasks WHERE id = ? OR parentId = ?',
      [id, id]
    );
  }

  Future<void> deleteByCategoriesId(String categoryId) async {
    await _db.rawDelete(
      'DELETE FROM Tasks WHERE categoryId = ?',
      [categoryId]
    );
  }

  static Future<void> createTable(Database db) async {
    await db.execute(
      'CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, parentId INTEGER, name TEXT, description TEXT, categoryId INTEGER, done BOOLEAN)');
  }

}
