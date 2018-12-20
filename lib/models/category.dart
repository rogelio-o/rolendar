import 'package:flutter/foundation.dart';

class Category {

  String id;

  String name;

  String color;

  Category({this.id, @required this.name, @required this.color});

  Category.fromRow(Map<String, dynamic> json):
    id = json['id'].toString(),
    name = json['name'],
    color = json['color'];

}
