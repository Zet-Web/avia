import format from 'date-fns/format'
import { locales } from '../../constants/locales'

export function getLocalHoursAndMinutes(
  date: Date | string | number,
  locale: string
) {
  return format(new Date(date), 'HH:mm', {
    locale: locales[locale?.toLowerCase() as keyof typeof locales],
  })
}
