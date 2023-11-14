import { UserRoute as Route } from 'shared/types/user'
import { Currency, Language, AviaTicketClass } from 'shared/types'

export const routeListItemMock: Route[] = [
  {
    id: 0,
    route: 'string',
    route_detail: {
      locale: Language.RU,
      trip_class: AviaTicketClass.ECONOMY,
      passengers: {
        adults: 4,
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
  },
  {
    id: 1,
    route: 'string',
    route_detail: {
      locale: Language.RU,
      trip_class: AviaTicketClass.ECONOMY,
      passengers: {
        adults: 2,
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
  },
  {
    id: 2,
    route: 'string',
    route_detail: {
      locale: Language.RU,
      trip_class: AviaTicketClass.BUSINESS,
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
  },
  {
    id: 3,
    route: 'string',
    route_detail: {
      locale: Language.RU,
      trip_class: AviaTicketClass.BUSINESS,
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
  },
]
