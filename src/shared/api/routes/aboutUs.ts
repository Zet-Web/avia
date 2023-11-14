import { AxiosPromise } from 'axios'
import { AxiosStrapiAboutUsContentResponse } from '../../types/api'
import { endpoints_strapi } from '../endpoints'
import Apis from '../'

export const getAboutUsContent = (
  locale: string = 'ru'
): AxiosPromise<AxiosStrapiAboutUsContentResponse> => {
  return Apis.strapi.get(
    `${endpoints_strapi.about_us}?locale=${locale}&populate=deep`
  )
}
