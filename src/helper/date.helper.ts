import moment from 'moment'

export function calcDiffInWeeks(fromDate: Date | null, toDate: Date | null) {
  if (fromDate == null || toDate == null) {
    return ''
  }
  const to = moment(toDate)
  const from = moment(fromDate)
  return to.diff(from, 'week')
}

export function calcDiffInWeeksFromToday(toDate: Date | null) {
  if (toDate == null) {
    return ''
  }
  const to = moment(toDate)
  return to.diff(moment(), 'week')
}

export function getCurrentWeekDates(): Array<string> {
  const currentDate = moment()
  const weekStart = currentDate.clone().startOf('isoWeek')
  const days: Array<string> = []
  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'))
  }
  return days
}
