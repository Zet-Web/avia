import format from 'date-fns/format'
import { locales } from '../../constants/locales'
import { capitalize } from 'lodash'

export function getMonthCapitalizeAndYear(
  date: Date | string | number,
  locale?: string
) {
  return format(new Date(date), 'LLLL, yyyy', {
    locale: locales[locale?.toLowerCase() as keyof typeof locales],
  })
    .split(' ')
    .map(s => capitalize(s))
    .join(' ')
}
