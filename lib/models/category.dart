import 'package:flutter/foundation.dart';

class Category {

  String id;

  String name;

  String color;

  Category({@required this.id, @required this.name, @required this.color});

  dynamic toJson() => {'id': id, 'name': name, 'color': color};

}
