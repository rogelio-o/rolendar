import 'package:flutter/material.dart';
import '../../components/taskForm.dart';
import '../../components/loading.dart';
import '../../models/task.dart';
import '../../repositories/Repositories.dart';

class UpdateTaskScreen extends StatelessWidget {

  final Repositories repositories = Repositories();

  final Task _task;

  UpdateTaskScreen(Task task):
      _task = task;

  @override
  Widget build(BuildContext context) {
    return TaskForm(
      title: "Update Task",
      submitter: ({name, description}) => _save(context, name: name, description: description),
      initialName: _task.name,
      initialDescription: _task.description,
    );
  }

  _save(BuildContext context, {String name, String description}) {
    showLoading(context);

    final Task task = new Task(
      id: _task.id,
      parentId: _task.parentId,
      name: name,
      description: description,
      categoryId: _task.categoryId,
      done: _task.done
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
