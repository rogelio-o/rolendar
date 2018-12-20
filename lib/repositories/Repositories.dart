import 'package:sqflite/sqflite.dart';
import 'package:flutter/foundation.dart';
import 'CategoriesRepository.dart';

class Repositories {

  static Repositories _instance;

  final CategoriesRepository categories;

  factory Repositories() => _instance;

  Repositories.internal({@required this.categories});

  static Future<void> open() async {
    var databasesPath = await getDatabasesPath();
    String path = databasesPath + 'rolendar.db';

    Database db = await openDatabase(path,
      version: 5,
      onCreate: (Database db, int version) async {
        CategoriesRepository.createTable(db);
      },
      onUpgrade: (Database db, int oldVersion, int newVersion) async {
        CategoriesRepository.createTable(db);
      }
    );

    _instance = new Repositories.internal(
      categories: CategoriesRepository(db)
    );
  }

}
