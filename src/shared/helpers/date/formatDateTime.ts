import format from 'date-fns/format'

export function formatDateTime(date: Date | number | string) {
  return format(new Date(date), 'dd.MM.yy, hh:mm')
}
