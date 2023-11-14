import { AxiosPromise } from 'axios'
import { endpoints_strapi } from '../endpoints'
import Apis, { AxiosStrapiAdvertisingContentResponse } from '../'

export const getAdvertisingContent = (
  locale: string = 'ru'
): AxiosPromise<AxiosStrapiAdvertisingContentResponse> => {
  return Apis.strapi.get(
    `${endpoints_strapi.advertising}?populate=deep&locale=${locale}`
  )
}
