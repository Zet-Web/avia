import { AviaTicketClass } from '../../types'

export const getCategory = (type: AviaTicketClass): string => {
  switch (type) {
    case 'C':
      return 'category.business'
    case 'Y':
    default:
      return 'category.economy'
  }
}
