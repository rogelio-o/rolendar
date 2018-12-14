import 'package:flutter/material.dart';
import 'package:rolendar/screens/calendar/calendar.dart';
import 'package:rolendar/screens/tasks/tasks.dart';
import 'package:rolendar/screens/settings/settings.dart';

class Layout extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => _LayoutState();

}

class _LayoutState extends State<Layout> {

  int _currentIndex = 0;

  _selectTab(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _buildBody(),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: _selectTab,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_today),
            title: Text('Calendar'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.format_list_bulleted),
            title: Text('Tasks')
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            title: Text('Settings')
          ),
        ]
      ),
    );
  }

  Widget _buildBody() {
    switch(_currentIndex) {
      case 1:
        return TasksScreen();
      case 2:
        return SettingsScreen();
      case 0:
      default:
        return CalendarScreen();
    }
  }

}
