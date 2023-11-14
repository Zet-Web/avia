import { Currency, Language, AviaTicketClass } from 'shared/types'
import { UserRoute } from 'shared/types/user'

export const routeItemMock: UserRoute = {
  id: 0,
  route: 'string',
  route_detail: {
    locale: Language.RU,
    trip_class: AviaTicketClass.ECONOMY,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    currency: Currency.RUB,
    directions: [
      {
        origin: 'Moscow',
        destination: 'Paris',
        date: '2023-01-27',
      },
    ],
  },
  create_datatime: '2023-01-26T20:45:11.139Z',
}
