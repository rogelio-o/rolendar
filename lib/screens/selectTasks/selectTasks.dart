import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import '../../models/task.dart';
import '../../repositories/Repositories.dart';
import '../../components/loading.dart';

class SelectTasksScreen extends StatefulWidget {

  final String categoryId;

  final Set<String> initialSelectedTasksIds;

  final Repositories repositories = Repositories();

  SelectTasksScreen({@required this.categoryId, this.initialSelectedTasksIds});

  @override
  State<StatefulWidget> createState() => SelectTasksScreenState();

}

final String _MAIN_TASKS_KEY = 'main';

class SelectTasksScreenState extends State<SelectTasksScreen> {

  bool _loading;

  Map<String, List<Task>> _tasks;

  Set<String> _selectedTasks;

  @override
  initState() {
    super.initState();

    _selectedTasks = widget.initialSelectedTasksIds == null ? new Set() : new Set.from(widget.initialSelectedTasksIds);

    setState(() {
      _loading = true;
    });

    _loadTasks().then((Map<String, List<Task>> tasks) {
      setState(() {
        _loading = false;
        _tasks = tasks;
      });
    }).catchError((e) {
      print(e);
      setState(() {
        _loading = false;
      });
    });
  }

  Future<Map<String, List<Task>>> _loadTasks() async {
    final List<Task> tasks = await widget.repositories.tasks.findAllUndoneByCategory(widget.categoryId);

    Map<String, List<Task>> result = {
      _MAIN_TASKS_KEY: tasks
    };
    for(Task task in tasks) {
      result[task.id] = await widget.repositories.tasks.findAllUndoneByParentTask(task.id);
    }

    return result;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Select tasks'),
        actions: <Widget>[
          FlatButton(
            child: Text(
              'Save',
              style: TextStyle(color: Theme.of(context).primaryTextTheme.title.color)
            ),
            onPressed: _submit,
          )
        ],
      ),
      body: _loading ? LoadingPage() : _buildBody(context),
    );
  }

  _submit() {
    Navigator.of(context).pop(_selectedTasks);
  }

  Widget _buildBody(BuildContext context) {
    return ListView.builder(
      itemCount: _tasks[_MAIN_TASKS_KEY].length,
      itemBuilder: (ctx, index) => _buildItem(_MAIN_TASKS_KEY, ctx, index)
    );
  }

  Widget _buildItem(String key, BuildContext context, int index) {
    final Task task = _tasks[key][index];
    final List<Widget> children = [_buildTile(context, task)];
    if(key == _MAIN_TASKS_KEY) {
      children.add(_buildSubtasks(context, task));
    }

    return Column(
      children: children,
    );
  }

  Widget _buildTile(BuildContext context, Task task) {
    return Container(
      decoration: new BoxDecoration(
        color: Colors.white,
        border: new Border(top: BorderSide(color: Colors.grey[200]))
      ),
      child: ListTile(
        leading: Checkbox(
          value: _selectedTasks.contains(task.id),
          onChanged: (value) => _updateDone(task, value)
        ),
        title: Text('${task.name}')
      )
    );
  }

  _updateDone(Task task, bool value) {
    setState(() {
      if (value) {
        _selectedTasks.add(task.id);
      } else {
        _selectedTasks.remove(task.id);
      }
    });
  }

  Widget _buildSubtasks(BuildContext context, Task parentTask) {
    final List<Task> subtasks = _tasks[parentTask.id];

    return Container(
      color: Colors.white,
      padding: EdgeInsets.only(left: 45),
      child: Column(
        children: subtasks.map((subtask) {
          return _buildTile(context, subtask);
        }).toList()
      ),
    );
  }

}
