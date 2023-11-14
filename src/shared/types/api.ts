import { AxiosResponse } from 'axios'
import {
  HeaderSection,
  TitleQuoteSection,
} from 'shared/types/aboutProject'
import {
  AboutUsSectionProps,
  HistorySection,
  QuoteSection,
} from 'shared/types/aboutUs'
import { ItemSection } from 'shared/types/advertising'
import {
  AuthorSection,
  BlogSection,
  CommentSection,
  RecommendSection,
  SocialSection,
  Tag,
  TitleSection,
} from 'shared/types/blog'

import {
  BlogsContentProps,
  BlogsPageContent,
  SectionBlog,
  Tags,
} from 'shared/types/blogs'

import { FooterColumn, Social } from 'shared/types/footer'
import { PrivacyList } from 'shared/types/privacy'
import { Comment } from './comment'
import { Question } from './faq'
import {
  PartnerCompanySection,
  PartnerHeaderSection,
  PartnerUniqueOffersSection,
  PartnerWhyUsSection,
} from './partner'

type PaginationType = {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
}

export type AxiosApiResponse<T> = Promise<
  AxiosResponse<{ result: T; errors: any }>
>

export type AxiosApiPaginatedResponse<T> = Promise<
  AxiosResponse<{
    result: {
      data: T
      pagination: PaginationType
    }
    errors: any
  }>
>
// doctor, order (all), clinic

export type AxiosApiPaginatedFullResponse<T> = AxiosResponse<{
  result: {
    data: T
    current_page: number | null
    first_page_url: string | null
    from: number | null
    last_page: number | null
    last_page_url: string | null
    links: {
      isActive: boolean
      label: string | null
      url: string | null
    }[]
    next_page_url: null
    path: string | null
    per_page: number | null
    prev_page_url: string | null
    to: number | null
    total: number | null
  }
  errors: any
}>
// story, stock, analysis, analysis-category, payment
// specialty, home-service

export type AxiosStrapiResponse<T> = {
  data: {
    id: number
    attributes: T & {
      createdAt: string
      updatedAt: string
      locale: string
    }
  }
  error: any
}

export type AxiosStrapiAboutProjectResponse<T> = {
  [x: string]: any
  data: {
    id: number
    attributes: T & {
      HeaderSection: string
      createdAt: string
      updatedAt: string
      locale: string
    }
  }
  error: any
}

export type AxiosStrapiPrivacyResponse<T> = {
  data: {
    id: number
    attributes: T & {
      title: string
      date: Date
      privacyList: PrivacyList[]
      createdAt: string
      updatedAt: string
      locale: string
    }
  }
  error: any
}

export type AxiosStrapiBlogsResponse<T> = {
  data: BlogsContentProps[]
  error: any
}

export type AxiosStrapiBlogResponse<T> = {
  data: BlogsContentProps
  error: any
}

export type AxiosStrapiSearchBlogsResponse<T> = {
  blogs: BlogsPageContent[]
  error: any
}

export type AxiosStrapiPartnerResponse<T> = {
  data: {
    id: number
    attributes: {
      headerSection: PartnerHeaderSection
      whyUsSection: PartnerWhyUsSection
      companySection: PartnerCompanySection
      UniqueOffersSection: PartnerUniqueOffersSection
      createdAt: string
      updatedAt: string
      locale: string
    }
  }
  error: any
}

export type AxiosStrapiAboutUsResponse = {
  aboutUsSection: AboutUsSectionProps
  historySection: HistorySection
  quoteSection: QuoteSection
  createdAt: string
  updatedAt: string
  locale: string
}

export interface StrapiSocialType extends Omit<Social, 'icon'> {
  icon: {
    data: {
      id: number
      attributes: {
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
    }
  }
}

export interface StrapiImageType {
  data: {
    id: number
    attributes: {
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
  }
}

export type AxiosStrapiFooterContentResponse = AxiosStrapiResponse<{
  soc_links: StrapiSocialType[]
  columns: FooterColumn
  localizations: {
    data: Array<{
      id: number
      attributes: {
        createdAt: string
        updatedAt: string
        locale: string
      }
    }>
  }
  meta: any
}>

export type AxiosStrapiAboutProjectContentResponse =
  AxiosStrapiAboutProjectResponse<{
    HeaderSection: HeaderSection
    titleQuote: TitleQuoteSection
    localizations: {
      data: Array<{
        id: number
        attributes: {
          createdAt: string
          updatedAt: string
          locale: string
        }
      }>
    }
    meta: any
  }>

export type AxiosStrapiAboutUsContentResponse =
  AxiosStrapiAboutProjectResponse<{
    aboutUsSection: AboutUsSectionProps
    historySection: HistorySection
    quoteSection: QuoteSection
    localizations: {
      data: Array<{
        id: number
        attributes: {
          createdAt: string
          updatedAt: string
          locale: string
        }
      }>
    }
    meta: any
  }>
export type AxiosStrapiPrivacyPageResponse =
  AxiosStrapiPrivacyResponse<{
    title: string
    date: Date
    privacyList: PrivacyList[]
    localizations: {
      data: Array<{
        id: number
        attributes: {
          createdAt: string
          updatedAt: string
          locale: string
        }
      }>
    }
    meta: any
  }>

export type AxiosStrapiFaqPageResponse = AxiosStrapiResponse<{
  questions: Question[]
}>

export type AxiosStrapiBlogsPageResponse = AxiosStrapiBlogsResponse<{
  localizations: {
    data: Array<{
      id: number
      attributes: {
        createdAt: string
        updatedAt: string
        locale: string
      }
    }>
  }
  meta: any
}>

export type AxiosStrapiBlogPageResponse = AxiosStrapiBlogResponse<{
  localizations: {
    data: Array<{
      id: number
      attributes: {
        createdAt: string
        updatedAt: string
        locale: string
      }
    }>
  }
  meta: any
}>

export type AxiosStrapiSearchBlogsPageResponse =
  AxiosStrapiSearchBlogsResponse<{
    localizations: {
      data: Array<{
        id: number
        attributes: {
          createdAt: string
          updatedAt: string
          locale: string
        }
      }>
    }
    meta: any
  }>
export interface AxiosStrapiGetTags {
  data: {
    id: number
    attributes: {
      createdAt: string
      updatedAt: string
      Tags: Tags[]
    }
  }
}

export type AxiosStrapiAdvertisingContentResponse =
  AxiosStrapiAboutProjectResponse<{
    title: string
    subtitle: string
    createdAt: string
    updatedAt: string
    item_section: ItemSection[]
    localizations: {
      data: Array<{
        id: number
        attributes: {
          createdAt: string
          updatedAt: string
          locale: string
        }
      }>
    }
    meta: any
  }>

export type AxiosStrapiPartnerPageResponse =
  AxiosStrapiPartnerResponse<{
    localizations: {
      data: Array<{
        id: number
        attributes: {
          createdAt: string
          updatedAt: string
          locale: string
        }
      }>
    }
    meta: any
  }>

type AxiosStrapiCommentResponse<T> = {
  id: number
  content: string
  isBlocked: boolean
  isThreadBlocked: boolean
  blockReason: null
  isAdminComment: null
  removed: null
  approvalStatus: null
  createdAt: string
  updatedAt: string
  hasThread: boolean
  threadFirstItemId: number
  author: {
    id: number
    name: string
    email: string
  }
  children: Comment[]
}

export type AxiosStrapiComments = AxiosStrapiCommentResponse<{}>
