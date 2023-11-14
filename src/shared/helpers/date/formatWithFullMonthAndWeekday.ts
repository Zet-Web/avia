import format from 'date-fns/format'
import { enUS } from 'date-fns/locale'
import { locales } from '../../constants/locales'

export function formatWithFullMonthAndWeekday(
  date: string | Date | number,
  locale: string
) {
  const selectedLocale =
    locales[locale?.toLowerCase() as keyof typeof locales] || enUS

  return format(new Date(date), 'dd MMMM, EEEEEE', {
    locale: selectedLocale,
  })
}
