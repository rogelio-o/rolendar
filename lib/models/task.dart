class Task {

  String id;

  String parentId;

  String name;

  String description;

  String categoryId;

  bool done;

  Task({this.id, this.parentId, this.name, this.description, this.categoryId, this.done});

  Task.fromRow(Map<String, dynamic> json):
      id = json['id'].toString(),
      parentId = json['parentId']?.toString(),
      name = json['name'],
      description = json['description'],
      categoryId = json['categoryId']?.toString(),
      done = json['done'] == 1 ? true : false;

}
