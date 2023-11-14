import { AviaTicketClass, Currency, Language } from 'shared/types'
import { Baggage } from 'shared/types/ticket'
import s7logo from '/public/assets/images/s7logo.png'
import { RouteDetail } from '../types/user'

export const ticket = {
  airline: s7logo.src,
  departureDate: '2023-01-20T02:15+00:00',
  arrivalDate: '2023-01-21T17:20+00:00',
  timeWay: 1555,
  departureAirport: 'Москва, Домодедово',
  arrivalAirport: 'Париж, Орли',
  price: 130000,
  priceSurcharge: 3500,
  currency: Currency.RUB,
  isFavorite: true,
  isSubscribe: false,
  baggage: Baggage.handbag,
}
export const calendar_price_ticket_mock = {
  airline: s7logo.src,
  departureDate: '2023-01-20T02:15+00:00',
  arrivalDate: '2023-01-21T17:20+00:00',
  timeWay: 1555,
  departureAirport: 'Москва, Домодедово',
  arrivalAirport: 'Париж, Орли',
  price: 130000,
  priceSurcharge: 3500,
  currency: Currency.RUB,
}

export const ticket_mock_array = [
  {
    airline: s7logo.src,
    departureDate: '2023-01-20T02:15+00:00',
    arrivalDate: '2023-01-21T17:20+00:00',
    timeWay: 1555,
    departureAirport: 'Москва, Домодедово',
    arrivalAirport: 'Париж, Орли',
    price: 130000,
    priceSurcharge: 3500,
    currency: Currency.RUB,
    isFavorite: true,
    isSubscribe: false,
    baggage: Baggage.handbag,
  },
  {
    airline: s7logo.src,
    departureDate: '2023-01-20T02:15+00:00',
    arrivalDate: '2023-01-21T17:20+00:00',
    timeWay: 1555,
    departureAirport: 'Москва, Домодедово',
    arrivalAirport: 'Париж, Орли',
    price: 130000,
    priceSurcharge: 3500,
    currency: Currency.RUB,
    isFavorite: true,
    isSubscribe: false,
    baggage: Baggage.handbag,
  },
  {
    airline: s7logo.src,
    departureDate: '2023-01-20T02:15+00:00',
    arrivalDate: '2023-01-21T17:20+00:00',
    timeWay: 1555,
    departureAirport: 'Москва, Домодедово',
    arrivalAirport: 'Париж, Орли',
    price: 130000,
    priceSurcharge: 3500,
    currency: Currency.RUB,
    isFavorite: true,
    isSubscribe: false,
    baggage: Baggage.handbag,
  },
]

export const mock_ticket_search: RouteDetail = {
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
      origin: 'MOW',
      destination: 'LED',
      date: '2023-04-10',
    },
  ],
}

export const mock_ticket_filters = {
  find: {
    locale: 'RU',
    trip_class: 'Y',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    currency: 'RUB',
    directions: [
      {
        origin: 'MOW',
        destination: 'LED',
        date: '2023-03-02',
      },
    ],
  },
  airports: {
    ZIA: {
      iata: 'ZIA',
      name: 'Жуковский',
      city: 'Москва',
      city_code: 'MOW',
      country: 'Россия',
      country_code: 'RU',
      time_zone: 'Europe/Moscow',
      cases: {
        vi: 'в Москву',
        pr: 'Москве',
        po: 'Москвы',
      },
    },
  },
  airlines: {
    SU: {
      iata: 'SU',
      name: 'Аэрофлот',
    },
  },
  sellers: {
    '20': {
      id: '20',
      title: 'OneTwoTrip',
    },
  },
  best_price: {
    CHEAP: 5785,
    FAST: 30358,
    OPTIMAL: 5785,
  },
  filter: {
    transplants: {
      '0': ['without', 'one', 'two'],
    },
    time_departure: {
      '0': {
        min: '2023-03-02T11:40:00',
        max: '2023-03-02T20:55:00',
      },
    },
    time_arrival: {
      '0': {
        min: '2023-03-02T14:05:00',
        max: '2023-03-04T11:35:00',
      },
    },
    time_way: {
      '0': {
        min: 85,
        max: 2565,
      },
    },
    time_transfer: {
      '0': {
        min: 0,
        max: 2390,
      },
    },
    baggage: [Baggage.handbag, Baggage.baggage],
    airlines: ['SU'],
    airports_departure: {
      '0': ['SVO'],
    },
    airports_arrival: {
      '0': ['LED'],
    },
    airports_transfer: {
      '0': {
        '0': ['CEE'],
        '1': ['KZN'],
      },
    },
    seller: ['65'],
  },
  error_tickets: 0,
  count_tickets: 273,
  state: 'MOW>LED^230302|1:0:0:Y|RUB:RU',
}
