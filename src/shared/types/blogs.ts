import { StrapiImageType } from './api'

export interface SectionBlog {
  id: number
  title: string
  text: string
  images: StrapiImageType
}

export interface Tags {
  id: number
  tag: string
}

export interface BlogsContentProps {
  id: number
  attributes: BlogsPageContent
}

export interface Blog {
  blogs: BlogsPageContent[] | null
}

export interface BlogImageFormat {
  image: string
  id?: number
}

export interface BlogsPageContent {
  id: number
  createdAt: string
  updatedAt?: string
  title: string
  image: StrapiImageType
  tags: Tags[]
  locale?: string
  section: SectionBlog[]
}

export interface ImageSearch {
  name: string
  allternativeText: string | null
  caption: string | null
  width: number
  formats: any
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
}
