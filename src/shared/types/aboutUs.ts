import { StrapiImageType } from 'shared/api'

export interface AboutUsSectionProps {
  id: number
  title: string
  text: string
  images: StrapiImageType
}

export interface Section {
  id?: number
  title: string
  image: string
  text: string
}

export interface QuoteSection {
  id: number
  title: string
  text: string
  quotes: string
  authorName: string
  authorCompany: string
}

export interface HistorySection {
  id: number
  title: string
  card: AboutUsSectionProps[]
}
