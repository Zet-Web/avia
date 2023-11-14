import format from 'date-fns/format'
import { capitalize } from 'lodash'
import { locales } from '../../constants/locales'

export function formatWithShortMonthAndWeekdayComma(
  date: string | Date | number,
  locale?: string
) {
  return format(new Date(date), 'dd MMM, EEEEEE', {
    locale: locales[locale?.toLowerCase() as keyof typeof locales],
  })
    .split(' ')
    .map(s => capitalize(s))
    .join(' ')
}
