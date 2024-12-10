// @ts-ignore
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
