import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SearchCodeResponse, TicketResponse } from './types'

import {
  SelectedSeller,
  SingleRouteDateString,
  Ticket,
  TicketInfo,
} from 'shared/types/ticket'

import { RouteDetail } from 'shared/types/user'
import { RootState } from '../../reducers/rootReducer'

interface InitialState {
  state: {
    searchCode: string | null
    stateStart: string | null
    stateEnd: string | null
  }
  ticketStatus: string
  tickets: Ticket[] | null
  ticketCount: number
  ticketsError: null | string
  ticketInfo: TicketInfo | null
  ticketInfoStatus: string
  ticketInfoError: null | string
  query: string
  weekdayPrice: SingleRouteDateString | null
  page: number
  limit: number
  selectedSeller: SelectedSeller | null
}

const initialState: InitialState = {
  state: {
    searchCode: null,
    stateStart: null,
    stateEnd: null,
  },
  ticketStatus: 'ticket/ticketDefault',
  tickets: null,
  ticketCount: 0,
  ticketsError: null,
  ticketInfo: null,
  ticketInfoStatus: 'ticket/ticketInfoDefault',
  ticketInfoError: null,
  query: '',
  weekdayPrice: null,
  page: 0,
  limit: 10,
  selectedSeller: null,
}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    ticketDefault: state => {},
    ticketGet: (state, action: PayloadAction<string>) => {},
    updateTickets: (state, action: PayloadAction<number>) => {},
    filterTickets: (state, action: PayloadAction<string>) => {},
    ticketRequest: (state, action: PayloadAction<RouteDetail>) => {
      state.ticketStatus = ticketRequest.type
    },
    ticketConnecting: (
      state,
      action: PayloadAction<SearchCodeResponse>
    ) => {
      state.state.searchCode = action.payload.state
      state.state.stateStart = action.payload.stateStart
      state.state.stateEnd = action.payload.stateEnd
    },
    ticketSuccess: (state, action: PayloadAction<TicketResponse>) => {
      state.ticketStatus = ticketSuccess.type
      state.tickets = action.payload.results
      state.ticketCount = action.payload.count
    },
    ticketError: (state, action: PayloadAction<any>) => {
      state.ticketStatus = ticketError.type
      state.ticketsError = action.payload
      state.ticketCount = 0
      state.tickets = null
    },
    searchCodeSuccess: (state, action) => {
      state.state.searchCode = action.payload.state
      state.state.stateStart = action.payload.stateStart
      state.state.stateEnd = action.payload.stateEnd
    },
    selectSeller: (state, action: PayloadAction<SelectedSeller>) => {
      state.selectedSeller = action.payload
    },
    ticketInfoRequested: (state, action: PayloadAction<string>) => {
      state.ticketInfoStatus = ticketInfoRequested.type
    },
    ticketInfoSuccess: (state, action: PayloadAction<TicketInfo>) => {
      state.ticketInfoStatus = ticketInfoSuccess.type
      state.ticketInfo = action.payload
    },
    ticketInfoError: (state, action: PayloadAction<string>) => {
      state.ticketInfoStatus = ticketInfoError.type
      state.ticketInfoError = action.payload
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    changeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    selectWeekdayPrices: (
      state,
      action: PayloadAction<SingleRouteDateString>
    ) => {
      state.weekdayPrice = action.payload
    },
  },
})

export const {
  ticketDefault,
  ticketRequest,
  updateTickets,
  ticketGet,
  ticketConnecting,
  ticketSuccess,
  ticketError,
  searchCodeSuccess,
  changePage,
  changeQuery,
  selectWeekdayPrices,
  ticketInfoSuccess,
  ticketInfoRequested,
  selectSeller,
  filterTickets,
  ticketInfoError,
} = ticketSlice.actions

export const selectTicketPage = (state: RootState) =>
  state.ticket.page
export const selectTicketLimit = (state: RootState) =>
  state.ticket.limit
export const selectTicketState = (state: RootState) =>
  state.ticket.state
export const selectSearchCode = (state: RootState) =>
  state.ticket.state.searchCode
export const selectSelectedSeller = (state: RootState) =>
  state.ticket.selectedSeller
export const selectTicketInfo = (state: RootState) =>
  state.ticket.ticketInfo

export default ticketSlice.reducer
