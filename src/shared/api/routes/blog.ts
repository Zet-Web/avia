import { AxiosPromise } from 'axios'
import { endpoints_strapi } from '../endpoints'
import Apis, {
  AxiosStrapiBlogPageResponse,
  AxiosStrapiComments,
} from '../'

export const getBlogContent = (
  locale: string = 'ru',
  id: number = 1
): AxiosPromise<AxiosStrapiBlogPageResponse> => {
  return Apis.strapi.get(`${endpoints_strapi.blog(id)}`)
}

export const getBlogComments = (
  id: number
): AxiosPromise<AxiosStrapiComments> => {
  return Apis.strapi.get(`${endpoints_strapi.comments(id)}`)
}
