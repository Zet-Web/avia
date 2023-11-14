import { AxiosPromise } from 'axios'
import { AxiosStrapiAboutProjectContentResponse } from '../../types/api'
import { endpoints_strapi } from '../endpoints'
import Apis from '../'

export const getAboutProjectContent = (
  locale: string = 'ru'
): AxiosPromise<AxiosStrapiAboutProjectContentResponse> => {
  return Apis.strapi.get(
    `${endpoints_strapi.about_project}?locale=${locale}&populate=deep`
  )
}
