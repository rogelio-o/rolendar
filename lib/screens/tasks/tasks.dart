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

  List<Task> _undoneTasks;

  List<Task> _doneTasks = [];

  bool _showDoneTasks = false;

  @override
  void initState() {
    super.initState();

    _loadData(context, false);
  }

  void _loadData(BuildContext context, bool showDoneTasks) async {
    setState(() {
      _loading = true;
    });

    try {
      final List<Task> undoneTasks = await _loadUndoneTasks(context);
      final List<Task> doneTasks = showDoneTasks ? await _loadDoneTasks(context) : [];
      setState(() {
        _undoneTasks = undoneTasks;
        _doneTasks = doneTasks;
        _showDoneTasks = showDoneTasks;
        _loading = false;
      });
    } finally {
      setState(() {
        _loading = false;
      });
    }
  }

  Future<List<Task>> _loadUndoneTasks(BuildContext context) {
    if(widget.task == null) {
      return widget.repositories.tasks.findAllUndoneByCategory(widget.category.id);
    } else {
      return widget.repositories.tasks.findAllUndoneByParentTask(widget.task.id);
    }
  }

  Future<List<Task>> _loadDoneTasks(BuildContext context) {
    if(widget.task == null) {
      return widget.repositories.tasks.findAllDoneByCategory(widget.category.id);
    } else {
      return widget.repositories.tasks.findAllDoneByParentTask(widget.task.id);
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
                .then((insert) => insert != null && insert ? _loadData(context, _showDoneTasks) : null);
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
    final int countUndone = _undoneTasks.length;
    final int count = countUndone + (_showDoneTasks ? _doneTasks.length : 1);
    return ListView.builder(
      itemCount: count,
      itemBuilder: (context, index) {
        if(index < countUndone) {
          final Task task = _undoneTasks[index];

          return _buildItem(context, index, task);
        } else if(_showDoneTasks) {
          final Task task = _doneTasks[index - countUndone];

          return _buildItem(context, index, task);
        } else {
          return _buildShowDoneButton(context);
        }
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
          enabled: !item.done,
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
      .then((insert) => insert != null && insert ? _loadData(context, _showDoneTasks) : null);
  }

  _delete(BuildContext context, int index) {
    showLoading(context);

    widget.repositories.tasks.delete(_undoneTasks[index].id)
      .then((_) {
      hideLoading(context);

      setState(() {
        _undoneTasks.removeAt(index);
      });
    }).catchError((_) => hideLoading(context));
  }

  Widget _buildShowDoneButton(BuildContext context) {
    return Container(
      child: FlatButton(
        onPressed: _enableShowDoneTasks,
        child: Text(
          'Show done tasks',
          style: TextStyle(
            color: Colors.grey
          ),
        )
      ),
    );
  }

  _enableShowDoneTasks() {
    _loadData(context, true);
  }

}
