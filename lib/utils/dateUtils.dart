String getWeekDayName(int day) {
  switch(day) {
    case 0: return "Monday";
    case 1: return "Tuesday";
    case 2: return "Wednesday";
    case 3: return "Thursday";
    case 4: return "Friday";
    case 5: return "Saturday";
    case 6: return "Sunday";
  }
}

String getWeekDayShortName(int day) {
  switch(day) {
    case 0: return "Mon";
    case 1: return "Tue";
    case 2: return "Wed";
    case 3: return "Thu";
    case 4: return "Fri";
    case 5: return "Sat";
    case 6: return "Sun";
  }
}

String getMonthName(int month) {
  switch(month) {
    case 1: return "January";
    case 2: return "February";
    case 3: return "March";
    case 4: return "April";
    case 5: return "May";
    case 6: return "June";
    case 7: return "July";
    case 8: return "August";
    case 9: return "September";
    case 10: return "October";
    case 11: return "November";
    case 12: return "December";
  }
}
