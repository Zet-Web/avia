import { Currency, Language } from 'shared/types'
import { GeoType } from 'shared/types/geo'

export enum SettingTypes {
  CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
  CHANGE_CURRENCY = 'CHANGE_CURRENCY',
  GET_GEO_IP = 'GET_GEO_IP',
  ACCEPT_COOKIES = 'ACCEPT_COOKIES',
}

export interface ChangeLanguage {
  type: SettingTypes.CHANGE_LANGUAGE
  payload: Language
}

export interface ChangeCurrency {
  type: SettingTypes.CHANGE_CURRENCY
  payload: Currency
}

export interface GetGeoIp {
  type: SettingTypes.GET_GEO_IP
  payload: GeoType
}

export interface AcceptCookies {
  type: SettingTypes.ACCEPT_COOKIES
  // eslint-disable-next-line @typescript-eslint/naming-convention
  payload: true
}

export type ChangeSettingsAction =
  | ChangeLanguage
  | ChangeCurrency
  | GetGeoIp
  | AcceptCookies
