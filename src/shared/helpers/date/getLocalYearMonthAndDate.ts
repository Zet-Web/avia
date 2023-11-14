import format from 'date-fns/format'
import { locales } from '../../constants/locales'

export function getLocalYearMonthAndDate(
  date: Date | string | number,
  locale: string
) {
  return format(new Date(date), 'Y MM dd', {
    locale: locales[locale?.toLowerCase() as keyof typeof locales],
  })
}
