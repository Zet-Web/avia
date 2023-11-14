import format from 'date-fns/format'

export function formatApiDate(date: Date | number) {
  return format(new Date(date), 'yyyy-MM-dd')
}
