import { AxiosPromise } from 'axios'

import { endpoints_strapi } from '../endpoints'
import { AxiosStrapiFaqPageResponse } from '../../types/api'
import Apis from '..'

export const getFaqContent = (
  locale: string = 'ru'
): AxiosPromise<AxiosStrapiFaqPageResponse> => {
  return Apis.strapi.get(
    `${endpoints_strapi.faq}?locale=${locale}&populate=deep`
  )
}
