// get weekday function
function getWeekDay(date) {
   let weekdays = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
   let day = date.getDay();
   return weekdays[day];
}