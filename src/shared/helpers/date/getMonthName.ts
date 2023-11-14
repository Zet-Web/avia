import format from 'date-fns/format'
import { locales } from '../../constants/locales'

export function getMonthName(
  date: Date | string | number,
  locale: string
) {
  return format(new Date(date), 'LLLL', {
    locale: locales[locale?.toLowerCase() as keyof typeof locales],
  })
}
