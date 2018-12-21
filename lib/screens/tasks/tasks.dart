import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import '../../components/loading.dart';
import '../../models/category.dart';
import '../../models/task.dart';
import '../../repositories/Repositories.dart';
import '../addTask/addTask.dart';
import '../updateTask/updateTask.dart';

class TasksScreen extends StatefulWidget {

  final Category category;

  final Task task;

  final Repositories repositories = Repositories();

  TasksScreen({this.category, this.task});

  @override
  State<StatefulWidget> createState()  => TasksScreenState();

}

class TasksScreenState extends State<TasksScreen> {

  bool _loading;

  List<Task> _tasks;

  @override
  void initState() {
    super.initState();

    _loadData(context);
  }

  void _loadData(BuildContext context) {
    setState(() {
      _loading = true;
    });

    _loadTasks(context)
      .then((List<Task> tasks) {
        try {
          setState(() {
            _tasks = tasks;
            _loading = false;
          });
        } catch(e) {
          print(e);
        }
      })
      .catchError((e) {
        print(e);
        setState(() {
          _loading = false;
        });
      });
  }

  Future<List<Task>> _loadTasks(BuildContext context) {
    if(widget.task == null) {
      return widget.repositories.tasks.findAllByCategory(widget.category.id);
    } else {
      return widget.repositories.tasks.findAllByParentTask(widget.task.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_getTitle()),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) => AddTaskScreen(
                  category: widget.category,
                  parentTask: widget.task
                )))
                .then((insert) => insert != null && insert ? _loadData(context) : null);
            },
          ),
        ]
      ),
      body: _loading ? LoadingPage() : _buildList(context),
    );
  }

  String _getTitle() {
    if(widget.task == null) {
      return "Tasks of ${widget.category.name}";
    } else {
      return "Subtasks of ${widget.task.name}";
    }
  }

  Widget _buildList(BuildContext context) {
    return ListView.builder(
      itemCount: _tasks.length,
      itemBuilder: (context, index) {
        final Task task = _tasks[index];

        return _buildItem(context, index, task);
      }
    );
  }

  Widget _buildItem(BuildContext context, int index, Task item) {
    List<Widget> secondaryActions = [];
    if(widget.task == null) {
      secondaryActions.add(new IconSlideAction(
        caption: 'Subtasks',
        color: Colors.green,
        icon: Icons.list,
        onTap: () => _goToSubtasks(context, item),
      ));
    }
    secondaryActions.add(new IconSlideAction(
      caption: 'Update',
      color: Colors.blue,
      icon: Icons.edit,
      onTap: () => _goToUpdate(context, item),
    ));
    secondaryActions.add(new IconSlideAction(
      caption: 'Delete',
      color: Colors.red,
      icon: Icons.delete,
      onTap: () => _delete(context, index),
    ));

    return Slidable(
      delegate: new SlidableDrawerDelegate(),
      actionExtentRatio: 0.25,
      child: new Container(
        decoration: new BoxDecoration(
          color: Colors.white,
          border: new Border(bottom: BorderSide(color: Colors.grey[200]))
        ),
        child: new ListTile(
          leading: Checkbox(
            value: item.done,
            onChanged: (value) => _updateDone(context, item, value),
          ),
          title: new Text(item.name),
        ),
      ),
      secondaryActions: secondaryActions,
    );
  }

  void _updateDone(BuildContext context, Task task, bool newValue) {
    if(task.done == newValue) {
      return;
    }

    showLoading(context);

    bool oldValue = task.done;
    setState(() {
      task.done = newValue;
    });

    widget.repositories.tasks.save(task)
      .then((_) => hideLoading(context))
      .catchError(() {
        hideLoading(context);

        setState(() {
          task.done = oldValue;
        });
      });
  }

  _goToSubtasks(BuildContext context, Task task) {
    Navigator.push(context, MaterialPageRoute(builder: (context) => TasksScreen(task: task)));
  }

  _goToUpdate(BuildContext context, Task task) {
    Navigator.push(context, MaterialPageRoute(builder: (context) => UpdateTaskScreen(task)))
      .then((insert) => insert != null && insert ? _loadData(context) : null);
  }

  _delete(BuildContext context, int index) {
    showLoading(context);

    widget.repositories.tasks.delete(_tasks[index].id)
      .then((_) {
      hideLoading(context);

      setState(() {
        _tasks.removeAt(index);
      });
    }).catchError((_) => hideLoading(context));
  }

}
