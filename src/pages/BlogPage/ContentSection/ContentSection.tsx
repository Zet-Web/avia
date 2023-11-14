import { FC } from 'react'

import Image from 'next/image'

import ReactMarkdown from 'react-markdown'
import { STRAPI_IMAGE_MARKDOWN } from 'shared/api'
import { BlogsPageContent, SectionBlog } from 'shared/types/blogs'

import Link from 'next/link'
import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'
import s from './contentSection.module.scss'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'

export const ContentSection: FC<BlogsPageContent> = ({
  section,
  title,
  tags,
  createdAt,
  image,
}) => {
  const { width } = useWindowDimensions()

  return (
    <article className={s.wrapper}>
      <div className={s.header}>
        <div className={s.topWrapper}>
          {width >= 1024 && 
            <nav className={s.dynamicNav}>
                <Link href={'/'}>Главная · </Link>
                <Link href={'/blog'}>Блог · </Link>
                <Link href={'/blog?tag=ПОДБОРКИ'}>Подборка</Link>
            </nav>
          }
          <ul className={s.tagList}>
            {tags.map(tag => (
              <li className={s.tag} key={tag.id}>
                <Link href={`/blog?tag=${tag.tag}`}>
                  <span className={s.hashtag}>#{tag.tag}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        

        <h1 className={s.title}>{title}</h1>
        <span className={s.date}>
          {new Date(createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <Image
          src={getImageUrlWithBaseDomain(image.data.attributes.url)}
          width={670}
          height={440}
          alt=''
        />
      </div>
      <div>
        {section &&
          section.map((item: SectionBlog, id: number) => (
            <div key={id}>
              <h3 className={s.sectionTitle}>{item.title}</h3>
              <ReactMarkdown
                className={s.content}
                transformImageUri={uri =>
                  uri.startsWith('http')
                    ? uri
                    : `${STRAPI_IMAGE_MARKDOWN}${uri}`
                }
              >
                {item.text}
              </ReactMarkdown>
              {item.images?.data ? (
                <Image
                  className={s.image}
                  src={getImageUrlWithBaseDomain(
                    item.images.data?.attributes.url
                  )}
                  width={670}
                  height={440}
                  alt=''
                />
              ) : null}
            </div>
          ))}
      </div>
    </article>
  )
}
