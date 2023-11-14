import { Currency, Language } from 'shared/types'
import { GeoType } from 'shared/types/geo'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../reducers/rootReducer'

interface InitialState {
  currency: Currency
  language: Language
  geoData: GeoType | null
  // eslint-disable-next-line @typescript-eslint/naming-convention
  cookieAccess: boolean | null
}

const initialState: InitialState = {
  currency: Currency.DEFAULT,
  language: Language.RU,
  geoData: null,
  cookieAccess: null,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload
    },
    changeCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload
    },
    getGeoIp: (state, action: PayloadAction<GeoType>) => {
      state.geoData = action.payload
    },
    acceptCookies: state => {
      state.cookieAccess = true
    },
  },
})

export const {
  changeLanguage,
  changeCurrency,
  getGeoIp,
  acceptCookies,
} = settingsSlice.actions

export const selectSettings = (state: RootState) => state.settings
export const selectLanguage = (state: RootState) =>
  state.settings.language
export const selectCurrency = (state: RootState) =>
  state.settings.currency
export const selectGeoData = (state: RootState) =>
  state.settings.geoData

export default settingsSlice.reducer
