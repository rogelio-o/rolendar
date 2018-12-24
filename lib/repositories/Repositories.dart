import 'package:sqflite/sqflite.dart';
import 'package:flutter/foundation.dart';
import 'CategoriesRepository.dart';
import 'TasksRepository.dart';
import 'DaysOfWeekRepository.dart';
import 'DaysRepository.dart';
import 'DaysTasksRepository.dart';

class Repositories {

  static Repositories _instance;

  final CategoriesRepository categories;

  final TasksRepository tasks;

  final DaysOfWeekRepository daysOfWeek;

  final DaysRepository days;

  final DaysTasksRepository daysTasks;

  factory Repositories() => _instance;

  Repositories.internal({
    @required this.categories,
    @required this.tasks,
    @required this.daysOfWeek,
    @required this.days,
    @required this.daysTasks
  });

  static Future<void> open() async {
    var databasesPath = await getDatabasesPath();
    String path = databasesPath + '/rolendar.db';

    Database db = await openDatabase(path,
      version: 11,
      onCreate: (Database db, int version) async {
        CategoriesRepository.createTable(db);
        TasksRepository.createTable(db);
        DaysOfWeekRepository.createTable(db, 0);
        DaysRepository.createTable(db);
        DaysTasksRepository.createTable(db);
      },
      onUpgrade: (Database db, int oldVersion, int newVersion) async {
        CategoriesRepository.createTable(db);
        TasksRepository.createTable(db);
        DaysOfWeekRepository.createTable(db, oldVersion);
        DaysRepository.createTable(db);
        DaysTasksRepository.createTable(db);
      }
    );

    final TasksRepository tasksRepository = TasksRepository(db);
    _instance = new Repositories.internal(
      categories: CategoriesRepository(db, tasksRepository),
      tasks: tasksRepository,
      daysOfWeek: DaysOfWeekRepository(db),
      days: DaysRepository(db),
      daysTasks: DaysTasksRepository(db)
    );
  }

}
