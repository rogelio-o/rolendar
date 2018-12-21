import 'package:sqflite/sqflite.dart';
import 'package:flutter/foundation.dart';
import 'CategoriesRepository.dart';
import 'TasksRepository.dart';

class Repositories {

  static Repositories _instance;

  final CategoriesRepository categories;

  final TasksRepository tasks;

  factory Repositories() => _instance;

  Repositories.internal({@required this.categories, @required this.tasks});

  static Future<void> open() async {
    var databasesPath = await getDatabasesPath();
    String path = databasesPath + 'rolendar.db';

    Database db = await openDatabase(path,
      version: 6,
      onCreate: (Database db, int version) async {
        CategoriesRepository.createTable(db);
        TasksRepository.createTable(db);
      },
      onUpgrade: (Database db, int oldVersion, int newVersion) async {
        CategoriesRepository.createTable(db);
        TasksRepository.createTable(db);
      }
    );

    final TasksRepository tasksRepository = TasksRepository(db);
    _instance = new Repositories.internal(
      categories: CategoriesRepository(db, tasksRepository),
      tasks: tasksRepository
    );
  }

}
