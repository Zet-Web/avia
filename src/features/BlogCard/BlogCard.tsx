import type { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { BlogsPageContent } from 'shared/types/blogs'
import { mobile } from 'shared/constants/breakpoints'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'

import cn from 'classnames'
import s from './blogcard.module.scss'

import { useMemo } from 'react'

interface BlogCardProps extends BlogsPageContent {
  className?: string
  isStaticHeight?: boolean
  bgType?: 'light' | 'dark'
  position?: 'vertical' | 'horizontal'
  maxLength?: number
}

const BlogCard: FC<BlogCardProps> = ({
  title,
  section,
  createdAt,
  image,
  id,
  tags,
  isStaticHeight = true,
  bgType = 'light',
  position = 'vertical',
  maxLength,
  className,
}) => {
  const { locale } = useRouter()

  return (
    <Link href={`/blog/${id}`}>
      <div className={className}>
        <a
          className={
            position === 'vertical' ? s.wrapper : s.wrapperHorizontal
          }
        >
          <div
            className={
              isStaticHeight ? s.imgWrapperStatic : s.imgWrapper
            }
          >
            <div
              className={s.img}
              style={{
                backgroundImage: `url('${getImageUrlWithBaseDomain(
                  image.data?.attributes.url
                )}')`,
              }}
            ></div>
          </div>
          <div className={s.tags}>
            {tags?.map(tag => (
              <span className={s.tag} key={tag.id}>
                #{tag.tag}
              </span>
            ))}
          </div>
          <div
            className={
              position === 'vertical'
                ? s.textContainer
                : s.textContainerHorizontal
            }
          >
            <div
              className={cn(s.date, {
                [s.dateLight]: bgType === 'dark',
              })}
              suppressHydrationWarning
            >
              {new Date(createdAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <h2
              className={cn(s.title, {
                [s.titleLight]: bgType === 'dark',
              })}
            >
              {section[0]?.title}
            </h2>
            <div
              className={cn(s.description, {
                [s.descriptionLight]: bgType === 'dark',
              })}
              suppressHydrationWarning
            >
              {maxLength
                ? section[0]?.text.slice(0, maxLength) +
                  (section[0]?.text.length > maxLength && '...')
                : section[0]?.text}
            </div>
          </div>
        </a>
      </div>
    </Link>
  )
}

export default BlogCard
