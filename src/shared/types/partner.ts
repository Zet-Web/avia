import { StrapiImageType } from './api'

export interface PartnerHeaderSection {
  id: number
  title: string
  subtitle: string
  image: StrapiImageType
}

export interface CardInfo {
  id: number
  text: string
  title: string
}

export interface PartnerWhyUsSection {
  id: number
  title: string
  subtitle: string
  offerCardInfo: CardInfo[]
}

export interface CardInfoBenefit {
  id: number
  title: string
  subtitle: string
  image: StrapiImageType
}

export interface PartnerCompanySection {
  id: number
  title: string
  subtitle: string
  cardInfoBenefit: CardInfoBenefit[]
}

export interface PartnerUniqueOffersSection {
  id: number
  title: string
  subtitle: string
  offerCardInfo: CardInfo[]
}

export interface PartnerProps {
  headerSection: PartnerHeaderSection
  whyUsSection: PartnerWhyUsSection
  companySection: PartnerCompanySection
  UniqueOffersSection: PartnerUniqueOffersSection
  createdAt: string
  updatedAt: string
  locale: string
}
