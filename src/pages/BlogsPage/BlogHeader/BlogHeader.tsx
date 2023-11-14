import React, { FC } from 'react'
import s from './blogHeader.module.scss'

import { Input } from '../../../components'
import { BlogsContentProps } from '../../../shared/types/blogs'
import { BlogCard } from '../../../features'
import { useTranslation } from 'next-i18next'
import BlogHeaderSkeleton from './BlogHeaderSkeleton'

interface BlogHeaderProps {
  posts: BlogsContentProps[]
}

const BlogHeader: FC<BlogHeaderProps> = ({ posts }) => {
  const { t } = useTranslation(['blogSection', 'meta'])

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.searchSection}>
          <div className={s.title}>{t('blogSection:blog:title')}</div>
          <Input
            className={s.searchInput}
            hasLabel={false}
            placeholder={t('blogSection:search:title').toString()}
          />
        </div>

        {posts ? (
          <div className={s.content}>
            <BlogCard
              {...posts[0].attributes}
              id={posts[0].id}
              isStaticHeight={false}
              bgType={'dark'}
              maxLength={256}
            />

            <div className={s.contentRight}>
              {posts.map((post, index) => {
                if (index > 0)
                  return (
                    <div
                      key={post.id}
                      className={s.contentRightComponent}
                    >
                      <BlogCard
                        {...post.attributes}
                        id={post.id}
                        isStaticHeight={false}
                        bgType={'dark'}
                        position={
                          index === 0 ? 'vertical' : 'horizontal'
                        }
                        maxLength={index === 0 ? 256 : 70}
                      />
                    </div>
                  )
              })}
            </div>
          </div>
        ) : (
          <BlogHeaderSkeleton />
        )}
      </div>
    </div>
  )
}

export default BlogHeader
