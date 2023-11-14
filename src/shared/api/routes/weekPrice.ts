import { AxiosPromise } from 'axios'
import { endpoints_tickets } from '../index'
import Apis from '../index'
import { WeekPrice } from '../../types/ticket'

export const getWeekPrice = (
  params: string
): AxiosPromise<WeekPrice[]> => {
  return Apis.tickets_api.get(
    endpoints_tickets.get_week_price(params)
  )
}
