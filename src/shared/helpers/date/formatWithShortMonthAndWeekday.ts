import format from 'date-fns/format'
import { locales } from '../../constants/locales'

export function formatWithShortMonthAndWeekday(
  date: string | Date | number,
  locale?: string
) {
  return format(new Date(date), 'dd MMM EEEEEE', {
    locale: locales[locale?.toLowerCase() as keyof typeof locales],
  })
}
