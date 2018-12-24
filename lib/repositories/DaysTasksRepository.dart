import 'package:sqflite/sqflite.dart';

class DaysTasksRepository {

  Database _db;

  DaysTasksRepository(Database db) :
      _db = db;

  Future<List<String>> findAllTasksOfDay(DateTime date) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM DaysTasks WHERE date = ? ORDER BY taskId ASC',
      [_formatDate(date)]
    );

    return rows.map((row) => row['taskId'].toString()).toList();
  }

  Future<void> insert(DateTime date, String taskId) async {
    await _db.rawUpdate(
      'INSERT INTO DaysTasks (date, taskId) VALUES (?, ?)',
      [_formatDate(date), taskId]
    );
  }

  Future<void> remove(DateTime date, String taskId) async {
    await _db.rawUpdate(
      'DELETE FROM DaysTasks WHERE date = ? AND taskId = ?',
      [_formatDate(date), taskId]
    );
  }

  Future<void> removeAllByDate(DateTime date) async {
    await _db.rawUpdate(
      'DELETE FROM DaysTasks WHERE date = ?',
      [_formatDate(date)]
    );
  }

  String _formatDate(DateTime date) {
    return "${date.year}-${date.month}-${date.day}";
  }

  static Future<void> createTable(Database db) async {
    await db.execute(
      'DROP TABLE IF EXISTS DaysTasks');
    await db.execute(
      'CREATE TABLE IF NOT EXISTS DaysTasks (date DATE, taskId INTEGER, PRIMARY KEY (date, taskId))');
  }

}
