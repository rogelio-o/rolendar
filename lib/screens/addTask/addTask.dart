import 'package:flutter/material.dart';
import '../../components/loading.dart';
import '../../models/category.dart';
import '../../models/task.dart';
import '../../repositories/Repositories.dart';
import '../../components/taskForm.dart';

class AddTaskScreen extends StatelessWidget {

  final Category category;

  final Task parentTask;

  final Repositories repositories = Repositories();

  AddTaskScreen({this.category, this.parentTask});

  @override
  Widget build(BuildContext context) {
    return TaskForm(title: "Add Task", submitter: ({name, description}) => _save(context, name: name, description: description));
  }

  _save(BuildContext context, {String name, String description}) {
    showLoading(context);

    final Task task = Task(
      parentId: parentTask?.id,
      name: name,
      description: description,
      categoryId: category?.id,
      done: false
    );
    repositories.tasks.save(task)
      .then((_) {
      hideLoading(context);
      Navigator.of(context).pop(true);
    }).catchError(() {
      hideLoading(context);
    });
  }

}
