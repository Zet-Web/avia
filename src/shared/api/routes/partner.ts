import { AxiosPromise } from 'axios'
import { AxiosStrapiPartnerPageResponse } from '../../types/api'
import { endpoints_strapi } from '../endpoints'
import Apis from '../'

export const getPartnerContent = (
  locale: string = 'en'
): AxiosPromise<AxiosStrapiPartnerPageResponse> => {
  return Apis.strapi.get(
    `${endpoints_strapi.partner}?locale=${locale}&populate=deep`
  )
}
