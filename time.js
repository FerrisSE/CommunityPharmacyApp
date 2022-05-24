import moment from "moment";

export const CombineDayAndTime = (day, time) => moment(day + ' ' + time, "YYYY-MM-DD HH:mm:ss");

export const DayHasPassed = (day, time) => CombineDayAndTime(day, time).isBefore(moment());

export const DayAndTimeDiff = (day1, time1, day2, time2) => CombineDayAndTime(day1, time1).diff(CombineDayAndTime(day2, time2)).valueOf();