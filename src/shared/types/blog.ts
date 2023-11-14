import { StrapiImageType } from 'shared/api'

export interface BlogSectionProps {
  titleSection: TitleSection
  section: BlogSection[]
  tags: Tag[]
  socialSection: SocialSection[]
  authorSection: AuthorSection
  commentSection: CommentSection
  recommendSection: RecommendSection
}

export interface TitleSection {
  images: StrapiImageType
  title: string
  createdAt: string
}

export interface BlogSection {
  title: string
  text: string
  images: StrapiImageType
}

export interface Tag {
  tag: string
  id: number
}

export interface SocialSection {
  id?: number
  name: string
  link: string
  // icon: StrapiImageType
  icon: string
}

export interface AuthorSection {
  tag: string
  link: string
}

export interface CommentSection {
  likeAmount: number
  likeHandler: () => void
  commentAmount: number
  answerHandler: () => void
  hasMore: boolean
  loadMore: () => void
  comments: Comment[]
}

export interface Comment {
  id: number
  avatar: StrapiImageType
  name: string
  text: string
  createdAt: string
  isAppeal: boolean
  appealName?: string
}

export interface RecommendSection {
  title: string
  subtitle: string
  blogCards: blogCard[]
}

export interface blogCard {
  id: number
  image: StrapiImageType
  title: string
  tags: string[]
  createdAt: string
}
