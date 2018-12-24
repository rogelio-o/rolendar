class Day {

  DateTime date;

  String categoryId;

  Day({this.date, this.categoryId});

  Day.fromRow(Map<String, dynamic> json):
      date = DateTime.parse(json['date']),
      categoryId = json['categoryId']?.toString();

  @override
  String toString() {
    return "[date: $date, categoryId: $categoryId]";
  }

}
