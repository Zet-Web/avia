import format from 'date-fns/format'
import { capitalize } from 'lodash'
import { locales } from '../../constants/locales'

export function formatWithFullMonthCapitalize(
  date: string | Date | number,
  locale: string
) {
  return format(new Date(date), 'dd MMM', {
    locale: locales[locale?.toLowerCase() as keyof typeof locales],
  })
    .split(' ')
    .map(s => capitalize(s))
    .join(' ')
    .replace('.', '')
}
