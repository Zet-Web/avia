import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { BlogCard, BlogSection } from 'features'

import { AxiosStrapiBlogsPageResponse } from 'shared/api'
import { getFilterBlogsContent } from 'shared/api/routes/blogs'
import { laptop } from 'shared/constants/breakpoints'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'

import s from './recommendSection.module.scss'
import { BlogsContentProps } from 'shared/types/blogs'
import { useTranslation } from 'next-i18next'
import SearchTicketsBanner from 'components/SearchTicketsBanner/SearchTicketsBanner'

interface BlogTagProps {
  tag: string
}

export const RecommendSection: FC<BlogTagProps> = ({ tag }) => {
  const [filteredBlogs, setFilterBlogs] =
    useState<AxiosStrapiBlogsPageResponse | null>(null)
  const router = useRouter()
  const { width } = useWindowDimensions()
  const { t } = useTranslation(['blogPage'])

  const filterRecomentedBlog = filteredBlogs?.data.filter(
    item => item.attributes.id !== Number(router.query.id)
  )

  const blogCards = filterRecomentedBlog?.map(
    (item: BlogsContentProps) => item
  )

  useEffect(() => {
    getFilterBlogs()
  }, [])

  const getFilterBlogs = async () => {
    const resultFilter = await getFilterBlogsContent('en', tag, 3)
    setFilterBlogs(resultFilter.data)
  }

  return (
    <>
      {width > laptop ? (
        <div className={s.container}>
          <div className={s.titleBlock}>
            <h3 className={s.title}>{t('recommendSection.title')}</h3>
            <span className={s.subtitle}>
              {t('recommendSection.subtitle')}
            </span>
          </div>
          <div>
            <ul className={s.cardList}>
              {blogCards?.map((item, id) => (
                <BlogCard
                  key={id}
                  {...item.attributes}
                  id={item.id}
                  maxLength={60}
                />
              ))}
            </ul>
          </div>
          <SearchTicketsBanner isRecomendSection={true} />
        </div>
      ) : (
        <div className={s.blogSection}>
          {blogCards ? (
            <BlogSection
              titleClassName={s.title}
              posts={blogCards}
              title='Рекомендации'
              hasMore={false}
              loadMore={() => console.log('hello')}
            />
          ) : null}
        </div>
      )}
    </>
  )
}
function getActiveTag(activeTag: any): string {
  throw new Error('Function not implemented.')
}
