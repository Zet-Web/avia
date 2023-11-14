import { AxiosPromise } from 'axios'
import Apis, { endpoints_tickets } from '..'

import {
  CalendarPriceTicket,
  DayPrices,
  MonthPrices,
} from 'shared/types/dayCalendar'
import { Currency, Language } from 'shared/types'
import { BetweenInt } from 'shared/types/ticket'

export const getMonthsPrices = (
  origin: string,
  destination: string,
  currency: Currency = Currency.RUB,
  vocation?: BetweenInt
): AxiosPromise<MonthPrices[]> => {
  return Apis.tickets_api.get(
    endpoints_tickets.months_prices(
      origin,
      destination,
      currency,
      vocation
    )
  )
}
export const getDaysPrices = (
  origin: string,
  destination: string,
  currency: Currency = Currency.RUB,
  month: number = 0,
  year?: number | null,
  vocation?: BetweenInt
): AxiosPromise<DayPrices[]> => {
  return Apis.tickets_api.get(
    endpoints_tickets.days_prices(
      origin,
      destination,
      currency,
      month,
      year,
      vocation
    )
  )
}
export const getCurrentTicket = (
  origin: string,
  destination: string,
  currency: Currency = Currency.RUB,
  language: Language = Language.RU,
  date: string,
  vocation?: BetweenInt
): AxiosPromise<CalendarPriceTicket> => {
  return Apis.tickets_api.get(
    endpoints_tickets.day_tickets(
      origin,
      destination,
      currency,
      date,
      language,
      vocation
    )
  )
}
