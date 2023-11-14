import { Currency } from '../../types'

export function getCurrency(currency: Currency): string {
  switch (currency) {
    case Currency.RUB:
      return '₽'
    case Currency.USD:
      return '$'
    case Currency.EUR:
      return '€'
    default:
      return '$'
  }
}
