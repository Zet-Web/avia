import Axios, { AxiosPromise } from 'axios'
import Apis, { BASE_DOMAIN } from '../index'
import { endpoints_tickets } from '../index'
import { RouteDetail } from '../../types/user'
import {
  FlightDetail,
  MoreSellerResponse,
  SellerLinkResponse,
  Ticket,
  TicketInfo,
} from '../../types/ticket'
import {
  SearchCode,
  TicketResponse,
} from 'redux/slices/ticketSlice/types'

export const createTicketSession = (
  ticket: RouteDetail
): AxiosPromise<SearchCode> => {
  return Apis.tickets_api.post(
    endpoints_tickets.create_session,
    ticket
  )
}

export const getTickets = (
  state: string,
  query: string = ''
): AxiosPromise<TicketResponse> => {
  return Apis.tickets_api.get(
    endpoints_tickets.get_tickets(state, query)
  )
}

export const getTicketInfo = (
  params: string
): AxiosPromise<TicketInfo> => {
  return Apis.tickets_api.get(
    endpoints_tickets.get_tickets_info(params)
  )
}
export const getMoreSellers = (
  state: string,
  id: string,
  baggage: boolean
): AxiosPromise<MoreSellerResponse> => {
  return Apis.tickets_api.get(
    endpoints_tickets.get_seller_info(state, id, baggage)
  )
}

export const getSellerLink = (
  link: string
): AxiosPromise<SellerLinkResponse> => {
  return Axios.get(`${BASE_DOMAIN}${link}`)
}

export const getFlightInfoDetails = (
  link: string
): AxiosPromise<FlightDetail> => {
  return Axios.get(`${BASE_DOMAIN}${link}`)
}
