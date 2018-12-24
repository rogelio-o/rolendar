import 'package:sqflite/sqflite.dart';
import '../models/task.dart';

class TasksRepository {

  Database _db;

  TasksRepository(Database db):
      _db = db;

  Future<List<Task>> findAllUndoneByCategory(String categoryId) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM Tasks WHERE categoryId = ? AND done = 0 ORDER BY id ASC',
      [categoryId]
    );
    return rows.map((row) => Task.fromRow(row)).toList();
  }

  Future<List<Task>> findAllUndoneByParentTask(String parentTaskId) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM Tasks WHERE parentId = ? AND done = 0 ORDER BY id ASC',
      [parentTaskId]
    );
    return rows.map((row) => Task.fromRow(row)).toList();
  }

  Future<List<Task>> findAllDoneByCategory(String categoryId) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM Tasks WHERE categoryId = ? AND done = 1 ORDER BY id ASC',
      [categoryId]
    );
    return rows.map((row) => Task.fromRow(row)).toList();
  }

  Future<List<Task>> findAllDoneByParentTask(String parentTaskId) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM Tasks WHERE parentId = ? AND done = 1 ORDER BY id ASC',
      [parentTaskId]
    );
    return rows.map((row) => Task.fromRow(row)).toList();
  }

  Future<Task> findById(String taskId) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM Tasks WHERE id = ?',
      [taskId]
    );
    if(rows.length == 0) {
      return null;
    } else {
      return Task.fromRow(rows[0]);
    }
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
