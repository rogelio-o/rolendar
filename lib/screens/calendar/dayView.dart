import 'package:flutter/material.dart';
import '../../components/loading.dart';
import '../../repositories/Repositories.dart';
import '../../models/day.dart';
import '../../models/category.dart';
import '../../models/task.dart';
import '../../models/dayOfWeek.dart';
import '../selectCategory/selectCategory.dart';
import '../selectTasks/selectTasks.dart';

class DayView extends StatefulWidget {

  final Repositories repositories = Repositories();

  DateTime date;

  DayView({@required this.date});

  @override
  State<StatefulWidget> createState() => DayViewState();
}

final String _MAIN_TASKS_KEY = 'main';

class DayViewState extends State<DayView> {

  bool _loading;

  Day _day;

  Category _category;

  Map<String, List<Task>> _tasks;

  @override
  initState() {
    super.initState();

    _loadDay();
  }

  @override
  didUpdateWidget(DayView oldWidget) {
    if(widget.date != oldWidget.date) {
      _loadDay();
    }
  }

  _loadDay() async {
    setState(() {
      _loading = true;
    });

    try {
      Day day = await widget.repositories.days.findByDate(widget.date);
      if(day == null) {
        final DayOfWeek dayOfWeek = await widget.repositories.daysOfWeek
          .findByDay(widget.date.weekday - 1);
        day = Day(date: widget.date, categoryId: dayOfWeek.categoryId);
      }

      final Category category = day.categoryId == null ? null : await widget.repositories.categories.findById(day.categoryId);
      final Map<String, List<Task>> tasks = category == null ? {} : await _loadTasks(category);

      setState(() {
        _day = day;
        _loading = false;
        _category = category;
        _tasks = tasks;
      });
    } catch(e, stacktrace) {
      print(stacktrace);
      setState(() {
        _loading = false;
      });
    }
  }

  Future<Map<String, List<Task>>> _loadTasks(Category category) async {
    List<String> tasksIds = await widget.repositories.daysTasks.findAllTasksOfDay(widget.date);
    List<Task> tasks = [];
    for(String taskId in tasksIds) {
      final Task task = await widget.repositories.tasks.findById(taskId);
      if(task != null) {
        tasks.add(task);
      }
    }

    Map<String, List<Task>> result = {};
    for(Task task in tasks) {
      final String key = task.parentId == null ? _MAIN_TASKS_KEY : task.parentId;

      if(result.containsKey(key)) {
        result[key].add(task);
      } else {
        result[key] = [task];
      }
    }

    return result;
  }

  @override
  Widget build(BuildContext context) {
    return _buildBody(context);
  }

  Widget _buildBody(BuildContext context) {
    if(_category == null) {
      return _buildBodyWithoudCategory(context);
    } else {
      return _buildBodyWithCategory(context);
    }
  }

  Widget _buildBodyWithoudCategory(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
            padding: EdgeInsets.only(bottom: 10),
            child: Text('No category selected for this day.')
          ),
          RaisedButton(
            child: Text('Select a category'),
            onPressed: () => _changeCategory(context),
          )
        ],
      )
    );
  }

  Widget _buildBodyWithCategory(BuildContext context) {
    return Column(
      children: <Widget>[
        _buildCategory(context),
        _buildTasks(context)
      ],
    );
  }

  Widget _buildCategory(BuildContext context) {
    return Material(
      elevation: 10.0,
      child: Container(
        width: double.infinity,
        color: Color(int.parse(_category.color)),
        child: Row(
          children: <Widget>[
            IconButton(
              padding: EdgeInsets.only(left: 5, right: 5),
              icon: Icon(Icons.edit),
              color: Colors.white,
              onPressed: () => _changeCategory(context)
            ),
            Expanded(
              child: Text(
                '${_category.name}',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold
                ),
              )
            ),
            IconButton(
              padding: EdgeInsets.only(left: 5, right: 5),
              icon: Icon(Icons.list),
              color: Colors.white,
              onPressed: () => _changeTasks(context)
            )
          ]
        )
      ),
    );
  }

  _changeCategory(BuildContext context) async {
    final Category category = await Navigator.push(context, MaterialPageRoute(builder: (context) => SelectCategoryScreen()));
    if(category != null) {
      _updateCategory(category);
    }
  }

  _updateCategory(Category category) async {
    showLoading(context);

    final Day newDay = new Day(date: widget.date, categoryId: category.id);
    try {
      await widget.repositories.days.save(newDay);
      await widget.repositories.daysTasks.removeAllByDate(widget.date);

      setState(() {
        _category = category;
        _day = newDay;
      });
    } catch (e) {
      print(e);
    }

    hideLoading(context);
  }

  _changeTasks(BuildContext context) async {
    final Set<String> oldSelectedTasks = _getSelectedTasksAndSubtasksIds();
    final Set<String> newSelectedTasks = await Navigator.push(context, MaterialPageRoute(
      builder: (context) => SelectTasksScreen(
        categoryId: _category.id,
        initialSelectedTasksIds: oldSelectedTasks,
      )
    ));
    if(newSelectedTasks != null) {
      showLoading(context);

      try {
        await _saveSelectedTasks(oldSelectedTasks, newSelectedTasks);

        Map<String, List<Task>> tasks = await _loadTasks(_category);
        setState(() {
          _tasks = tasks;
        });
      } finally {
        hideLoading(context);
      }
    }
  }

  Future<void> _saveSelectedTasks(Set<String> oldSelectedTasks, Set<String> newSelectedTasks) async {
    for(String taskId in newSelectedTasks) {
      if(!oldSelectedTasks.contains(taskId)) {
        await widget.repositories.daysTasks.insert(widget.date, taskId);
      }
    }

    for(String taskId in oldSelectedTasks) {
      if(!newSelectedTasks.contains(taskId)) {
        await widget.repositories.daysTasks.remove(widget.date, taskId);
      }
    }
  }

  Set<String> _getSelectedTasksAndSubtasksIds() {
    return _tasks.values.expand((list) => list).map((task) => task.id).toSet();
  }

  Widget _buildTasks(BuildContext context) {
    final int count = _tasks[_MAIN_TASKS_KEY] == null ? 0 : _tasks[_MAIN_TASKS_KEY].length;
    return Expanded(
      child: ListView.builder(
        itemCount: count,
        itemBuilder: (ctx, index) => _buildItem(_MAIN_TASKS_KEY, ctx, index)
      )
    );
  }

  Widget _buildItem(String key, BuildContext context, int index) {
    final Task task = _tasks[key][index];
    final List<Widget> children = [_buildTile(context, index, task)];
    if(key == _MAIN_TASKS_KEY) {
      children.add(_buildSubtasks(context, task));
    }

    return Column(
      children: children,
    );
  }

  Widget _buildTile(BuildContext context, int index, Task task) {
    return Container(
      decoration: new BoxDecoration(
        color: Colors.white,
        border: new Border(top: BorderSide(color: Colors.grey[200]))
      ),
      child: ListTile(
        enabled: !task.done,
        leading: Checkbox(
          value: task.done,
          onChanged: (value) => _updateDone(index, task, value)
        ),
        title: Text('${task.name}'),
        subtitle: task.description == null || task.description.isEmpty ? null : Text('${task.description}')
      )
    );
  }

  _updateDone(int index, Task task, bool newValue) {
    if(newValue == task.done) {
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

  Widget _buildSubtasks(BuildContext context, Task parentTask) {
    final List<Task> subtasks = _tasks[parentTask.id] == null ? [] : _tasks[parentTask.id];
    List<Widget> children = [];
    for(int i = 0; i < subtasks.length; i++) {
      final Task subtask = subtasks[i];
      children.add(_buildTile(context, i, subtask));
    }

    return Container(
      color: Colors.white,
      padding: EdgeInsets.only(left: 45),
      child: Column(
        children: children
      ),
    );
  }

}
