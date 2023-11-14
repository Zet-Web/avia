import format from 'date-fns/format'

export function formatApi(date: Date) {
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss")
}
