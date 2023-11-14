import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'

import {
  createTicketSession,
  getTicketInfo,
  getTickets,
} from 'shared/api/routes/tickets'

import {
  ChangePage,
  TicketGet,
  TicketRequested,
  TicketResponse,
  TicketsFilter,
} from '../../slices/ticketSlice/types'

import {
  changePage,
  changeQuery,
  ticketConnecting,
  ticketDefault,
  ticketError,
  ticketSuccess,
  ticketInfoSuccess,
} from '../../slices/ticketSlice/ticketSlice'

import { RootState } from 'redux/store'
import { TicketInfo } from 'shared/types/ticket'
import { setToSleep } from 'shared/helpers/setToSleep'

import {
  ticketRequest,
  ticketGet,
  filterTickets,
  updateTickets,
} from '../../slices/ticketSlice/ticketSlice'

const selectSearchCode = (state: RootState) =>
  state.ticket.state.searchCode
const selectQuery = (state: RootState) => state.ticket.query
const selectLimit = (state: RootState) => state.ticket.limit
const selectTickets = (state: RootState) => state.ticket.tickets

export const getTicketRefresh = async (
  state: string,
  query: string
): Promise<TicketResponse> => {
  const tickets = await getTickets(state, query)

  if (tickets.status === 200) {
    return tickets.data
  } else {
    await setToSleep(2000)
    return getTicketRefresh(state, query)
  }
}

const getTicketInfoRefresh = async (
  state: string
): Promise<TicketInfo> => {
  const ticketInfo = await getTicketInfo(state)

  if (ticketInfo.status === 200) {
    return ticketInfo.data
  } else {
    await setToSleep(2000)
    return getTicketInfoRefresh(state)
  }
}

// saga for get search code
function* ticketSearchCodeSagaWorker(forms: TicketRequested): any {
  try {
    const res = yield call(createTicketSession, forms.payload)

    if (res.status >= 400) {
      yield put(ticketDefault())
      throw new Error(res.message)
    }
    // dispatch uniq string in reducer
    yield put(ticketConnecting(res.data))
  } catch (e) {
    console.error(e)
    yield put(ticketError(e))
  }
}

// saga for getting avia tickets
function* ticketsSagaWorker(action: TicketGet): any {
  const state = action.payload
  const limit = yield select(selectLimit)
  try {
    // get tickets array
    const tickets = yield call(
      getTicketRefresh,
      state,
      `limit=${limit}&offset=0`
    )
    // get ticket info
    const ticketInfo = yield call(getTicketInfoRefresh, state)

    // res tickets not ok throw error
    if (tickets.status >= 400) {
      yield put(ticketDefault())
      throw new Error(tickets.detail)
    }

    // res ticketInfo not ok throw error
    if (ticketInfo.status >= 400) {
      yield put(ticketDefault())
      throw new Error(ticketInfo.detail)
    }

    // save ticketsInfo if request successes
    yield put(ticketInfoSuccess(ticketInfo))

    // save tickets if request successes
    yield put(changeQuery(''))
    yield put(changePage(0))
    yield put(ticketSuccess(tickets))

    yield put(ticketDefault())
    // catch errors
  } catch (e) {
    console.error(e)
    yield put(ticketError(e))
  }
}

// saga for filter
function* ticketFilterSagaWorker(action: TicketsFilter): any {
  try {
    const state = yield select(selectSearchCode)
    const limit = yield select(selectLimit)
    if (typeof state === 'string') {
      const res = yield call(
        getTicketRefresh,
        state,
        `${action.payload}&limit=${limit}&offset=0`
      )

      if (res.status >= 400) {
        yield put(ticketDefault())
        throw new Error(res.message)
      }

      yield put(changePage(0))
      yield put(changeQuery(action.payload))
      yield put(ticketSuccess(res))
      yield put(ticketDefault())
    }
  } catch (e) {
    console.error(e)
    yield put(ticketError(e))
  }
}

// saga for pagination
function* ticketChangePageSagaWorker(action: ChangePage): any {
  try {
    const state = yield select(selectSearchCode)
    const query = yield select(selectQuery)
    const limit = yield select(selectLimit)
    if (typeof state === 'string') {
      const res = yield call(
        getTicketRefresh,
        state,
        `${query}&offset=${action.payload * limit}`
      )

      if (res.status >= 400) {
        yield put(ticketDefault())
        throw new Error(res.message)
      }

      yield put(changePage(action.payload))
      const results = yield select(selectTickets)
      const count = res.count
      yield put(
        ticketSuccess({
          count,
          results: [...results, ...res.results],
        })
      )
      yield put(ticketDefault())
    }
  } catch (e) {
    console.error(e)
    yield put(ticketError(e))
  }
}

function* ticketSagaWatcher() {
  yield all([
    takeLatest(ticketRequest.type, ticketSearchCodeSagaWorker),
    takeEvery(ticketGet.type, ticketsSagaWorker),
    takeEvery(filterTickets.type, ticketFilterSagaWorker),
    takeEvery(updateTickets.type, ticketChangePageSagaWorker),
  ])
}

export default ticketSagaWatcher
