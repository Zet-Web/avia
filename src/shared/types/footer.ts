import { StrapiImageType } from './api'

export interface Social {
  id?: number
  name: string
  icon: StrapiImageType
  link: string
}

interface Link {
  id?: number
  name: string
  link: string
}

export interface FooterColumn {
  id?: number
  title: string
  links: Link[]
}
