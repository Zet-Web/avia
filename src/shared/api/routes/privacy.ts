import { AxiosPromise } from 'axios'
import { AxiosStrapiPrivacyPageResponse } from '../../types/api'
import { endpoints_strapi } from '../endpoints'
import Apis from '../'

export const getPrivacyContent = (
  locale: string = 'ru'
): AxiosPromise<AxiosStrapiPrivacyPageResponse> => {
  return Apis.strapi.get(
    `${endpoints_strapi.privacy_page}?locale=${locale}&populate=deep`
  )
}
