import 'package:sqflite/sqflite.dart';
import '../models/dayOfWeek.dart';

class DaysOfWeekRepository {

  Database _db;

  DaysOfWeekRepository(Database db) :
      _db = db;

  Future<List<DayOfWeek>> findAll() async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM DaysOfWeek ORDER BY day ASC'
    );
    return rows.map((row) => DayOfWeek.fromRow(row)).toList();
  }

  Future<DayOfWeek> findByDay(int day) async {
    final List<Map<String, dynamic>> rows = await _db.rawQuery(
      'SELECT * FROM DaysOfWeek WHERE day = ?',
      [day]
    );
    if(rows.length == 0) {
      return null;
    } else {
      return DayOfWeek.fromRow(rows[0]);
    }
  }

  Future<void> save(DayOfWeek dayOfWeek) async {
    try {
      await _db.rawUpdate(
        'UPDATE DaysOfWeek SET categoryId = ? WHERE day = ?',
        [dayOfWeek.categoryId, dayOfWeek.day]
      );
    } catch(e) {
      print(e);
    }
  }

  static Future<void> createTable(Database db, int version) async {
    if(version < 7) {
      await db.execute(
        'CREATE TABLE IF NOT EXISTS DaysOfWeek (day INTEGER PRIMARY KEY, categoryId INTEGER)');
      for (var i = 0; i < 7; i++) {
        await db.execute(
          'INSERT INTO DaysOfWeek (day) VALUES ($i)');
      }
    }
  }

}
