// @ts-ignore
import moment from "moment";

export function calcDiffInWeeks(fromDate: Date, toDate: Date) {
  if (fromDate == null || toDate == null) {
    return "";
  }
  const to = moment(toDate);
  const from = moment(fromDate);
  return to.diff(from, "week");
}

export function calcDiffInWeeksFromToday(toDate: Date) {
  if (toDate == null) {
    return "";
  }
  const to = moment(toDate);
  return to.diff(moment(), "week");
}
