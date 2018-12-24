class DayOfWeek {

  int day;

  String categoryId;

  DayOfWeek({this.day, this.categoryId});

  DayOfWeek.fromRow(Map<String, dynamic> json):
      day = json['day'],
      categoryId = json['categoryId']?.toString();

  @override
  String toString() {
    return "[day: $day, categoryId: $categoryId]";
  }

}
