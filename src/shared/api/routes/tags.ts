import { AxiosPromise } from 'axios'
import { AxiosStrapiGetTags } from '../../types/api'
import { endpoints_strapi } from '../endpoints'
import Apis from '../'

export const getTags = (
  locale: string = 'ru'
): AxiosPromise<AxiosStrapiGetTags> => {
  return Apis.strapi.get(
    `${endpoints_strapi.tags}?populate=deep&locale=${locale}`
  )
}
