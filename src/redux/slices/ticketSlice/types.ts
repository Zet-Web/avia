import { RouteDetail } from 'shared/types/user'
import { Ticket } from 'shared/types/ticket'

export type TicketResponse = {
  count: number
  results: Ticket[] | null
}

export type SearchCodeResponse = {
  state: string
  stateStart: string
  stateEnd: string
}

export enum TicketTypes {
  SEARCH_CODE_SUCCESS = 'SEARCH_CODE_SUCCESS',
  TICKET_REQUESTED = 'TICKET_REQUESTED',
  TICKET_GET = 'TICKET_GET',
  TICKET_FILTER = 'TICKET_FILTER',
  PAGE_CHANGE = 'PAGE_CHANGE',
}

export interface TicketRequested {
  type: TicketTypes.TICKET_REQUESTED
  payload: RouteDetail
}

export interface SearchCode {
  type: TicketTypes.SEARCH_CODE_SUCCESS
  payload: SearchCodeResponse
}

export interface TicketsFilter {
  type: TicketTypes.TICKET_FILTER
  payload: string
}

export interface ChangePage {
  type: TicketTypes.PAGE_CHANGE
  payload: number
}

export interface TicketGet {
  type: TicketTypes.TICKET_GET
  payload: string
}
