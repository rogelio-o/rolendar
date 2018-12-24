import 'dart:core';
import 'package:flutter/material.dart';
import '../../utils/dateUtils.dart';
import 'dayView.dart';

class CalendarScreen extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => CalendarScreenState();

}

class CalendarScreenState extends State<CalendarScreen> {

  DateTime _currentMonday;

  DateTime _selectedDate;

  @override
  void initState() {
    super.initState();

    final DateTime now = new DateTime.now();
    _currentMonday = now.subtract(new Duration(days: now.weekday - 1));
    _selectedDate = now;
  }

  _previousWeek() {
    setState(() {
      _currentMonday = _currentMonday.subtract(new Duration(days: 7));
      _selectedDate = _currentMonday;
    });
  }

  _nextWeek() {
    setState(() {
      _currentMonday = _currentMonday.add(new Duration(days: 7));
      _selectedDate = _currentMonday;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${getMonthName(_currentMonday.month)} ${_currentMonday.year}'),
        bottom: _buildBottomAppBar(context),
      ),
      body: DayView(date: _selectedDate),
    );
  }

  Widget _buildBottomAppBar(BuildContext context) {
    return PreferredSize(
      preferredSize: const Size.fromHeight(45.0),
      child: Theme(
        data: Theme.of(context).copyWith(accentColor: Colors.white),
        child: _buildWeek(context),
      )
    );
  }

  Widget _buildWeek(BuildContext context) {
    List<Widget> rows = [];
    for(int i = 0; i < 7; i++) {
      rows.add(_buildWeekDay(context, i));
    }

    return Container(
      child: Dismissible(
        key: Key("calendar-week-header-${_currentMonday}"),
        onDismissed: _onDismissed,
        child:  ButtonTheme(
          minWidth: 0.0,
          padding: new EdgeInsets.all(0.0),
          child: Row(
              children: rows,
            ),
          )
        )
    );
  }

  _onDismissed(DismissDirection direction) {
    if(direction == DismissDirection.startToEnd) {
      _previousWeek();
    } else if(direction == DismissDirection.endToStart) {
      _nextWeek();
    }
  }

  Widget _buildWeekDay(BuildContext context, int index) {
    final DateTime day = _currentMonday.add(new Duration(days: index));
    bool selected = _selectedDate == day;

    return Expanded(
      child: FlatButton(
        color: selected ? Theme.of(context).primaryColorLight : null,
        onPressed: () => _onDayPressed(day),
        child: Container(
          padding: EdgeInsets.only(top: 10, bottom: 10),
          child: Column(
            children: <Widget>[
              Container(
                padding: EdgeInsets.only(bottom: 2),
                child: Text(
                  '${day.day}',
                  style: TextStyle(
                    color: selected ? Theme.of(context).primaryColorDark : Theme.of(context).primaryTextTheme.title.color,
                    fontWeight: FontWeight.bold,
                    fontSize: 15
                  ),
                )
              ),
              Text(
                '${getWeekDayShortName(index)}',
                style: TextStyle(
                  color: selected ? Theme.of(context).primaryColorDark : Theme.of(context).primaryTextTheme.title.color
                ),
              )
            ],
          ),
        )
      )
    );
  }

  _onDayPressed(DateTime day) {
    setState(() {
      _selectedDate = day;
    });
  }

}
