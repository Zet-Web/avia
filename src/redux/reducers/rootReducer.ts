import { combineReducers } from 'redux'

import settingsSlice from '../slices/settingsSlice/settingsSlice'
import ticketSlice from '../slices/ticketSlice/ticketSlice'
import authSlice from '../slices/authSlice/authSlice'
import changePasswordSlice from '../slices/changePasswordSlice/changePasswordSlice'

import { persistReducer } from 'redux-persist'

// @ts-ignore-start
import { CookieStorage } from 'redux-persist-cookie-storage'
// @ts-ignore-end

import storage from 'redux-persist/lib/storage'
import { cookies } from 'shared/utils/cookies'

const persistConfigSettings = {
  key: 'settings',
  storage: new CookieStorage(cookies, {
    expiration: {
      default: 365 * 86400, // Cookies expire after one year
    },
  }),
}

const persistConfigTicket = {
  key: 'ticket',
  storage,
  blacklist: ['searchCode'],
  whitelist: ['selectedSeller'],
}

const rootReducer = combineReducers({
  auth: authSlice,
  password: changePasswordSlice,
  settings: persistReducer(persistConfigSettings, settingsSlice),
  ticket: persistReducer(persistConfigTicket, ticketSlice),
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
