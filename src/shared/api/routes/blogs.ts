import { AxiosPromise } from 'axios'
import {
  AxiosStrapiBlogsPageResponse,
  AxiosStrapiSearchBlogsPageResponse,
} from '../../types/api'
import { endpoints_strapi } from '../endpoints'
import Apis from '../'

export const getBlogsContent = (
  locale: string = 'en',
  paginationSize: number = 4
): AxiosPromise<AxiosStrapiBlogsPageResponse> => {
  return Apis.strapi.get(
    `${endpoints_strapi.blogs}?locale=${locale}&populate=deep&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=${paginationSize}`
  )
}

export const getFilterBlogsContent = (
  locale: string,
  tag: string,
  paginationSize: number = 8
): AxiosPromise<AxiosStrapiBlogsPageResponse> => {
  return Apis.strapi.get(
    `${endpoints_strapi.blogs}?locale=${locale}&populate=deep&sort=createdAt:desc&filters[tags][tag][$eq]=${tag}&pagination[page]=1&pagination[pageSize]=${paginationSize}`
  )
}

export const getSearchBlogsContent = (
  locale: string,
  query: string,
  paginationSize: number = 10
): AxiosPromise<AxiosStrapiSearchBlogsPageResponse> => {
  return Apis.strapi.get(
    `${endpoints_strapi.search_blogs}?locale=${locale}&query=${query}&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=${paginationSize}`
  )
}
