import 'package:sqflite/sqflite.dart';
import '../models/day.dart';

class DaysRepository {

  Database _db;

  DaysRepository(Database db) :
      _db = db;

  Future<Day> findByDate(DateTime date) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM Days WHERE date = ?',
      [_formatDate(date)]
    );
    if(rows.length == 0) {
      return null;
    } else {
      return Day.fromRow(rows[0]);
    }
  }

  Future<void> save(Day day) async {
    int count = Sqflite
      .firstIntValue(await _db.rawQuery(
        'SELECT COUNT(*) FROM Days WHERE date = ?',
      [_formatDate(day.date)]
    ));

    if(count > 0) {
      await _db.rawUpdate(
        'UPDATE Days SET categoryId = ? WHERE date = ?',
        [day.categoryId, _formatDate(day.date)]
      );
    } else {
      await _db.rawUpdate(
        'INSERT INTO Days (date, categoryId) VALUES (?, ?)',
        [_formatDate(day.date), day.categoryId]
      );
    }
  }

  String _formatDate(DateTime date) {
    return "${date.year}-${date.month}-${date.day}";
  }

  static Future<void> createTable(Database db) async {
    await db.execute(
      'CREATE TABLE IF NOT EXISTS Days (date DATE PRIMARY KEY, categoryId INTEGER)');
  }

}
