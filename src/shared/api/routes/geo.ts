import { AxiosPromise } from 'axios'
import Apis, { endpoints_geo } from '../index'
import { GeoType, ValidatorParams } from '../../types/geo'
import { City } from '../../types/cities'
import { Airports } from '../../types/ticket'

export const getGeoCitiesIp = (
  language: string
): AxiosPromise<GeoType> => {
  return Apis.tickets_api.get(endpoints_geo.geo_cities_ip(language))
}

export const getGeoValidator = (
  title: string,
  params: ValidatorParams
): AxiosPromise<City[]> => {
  return Apis.tickets_api.get(endpoints_geo.geo_validator(title, params.language), {
    params,
  })
}

export const getGeoCities = (
  language: string,
  iatas: string,
  airport: boolean
): AxiosPromise<GeoType[]> => {
  return Apis.tickets_api.get(
    endpoints_geo.geo_cities(language, iatas, airport)
  )
}

export const getGeoAirports = (
  language: string,
  iatas: string
): AxiosPromise<Airports[]> => {
  return Apis.tickets_api.get(
    endpoints_geo.geo_airports(language, iatas)
  )
}
