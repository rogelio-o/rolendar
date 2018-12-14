import 'package:flutter/material.dart';
import '../addCategory/addCategory.dart';

class TasksScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Categories'),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) => AddCategoryScreen()));
            },
          ),
        ]
      ),
      body: Text('Tasks'),
    );
  }

}
