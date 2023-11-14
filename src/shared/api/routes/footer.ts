import { AxiosPromise } from 'axios'
import { AxiosStrapiFooterContentResponse } from '../../types/api'
import { endpoints_strapi } from '../endpoints'
import Apis from '../'

export const getFooterContent = (
  locale: string = 'ru'
): AxiosPromise<AxiosStrapiFooterContentResponse> => {
  return Apis.strapi.get(endpoints_strapi.footer(locale))
}
