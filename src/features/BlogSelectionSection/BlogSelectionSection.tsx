import { FC, useRef } from 'react'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

import { BlogCard } from '../index'

import { BlogsContentProps } from 'shared/types/blogs'

import ArrowLeftPagination from '/public/assets/images/ArrowLeftPagination.svg'
import ArrowRightPagination from '/public/assets/images/ArrowRightPagination.svg'

import s from './blogSelectionSection.module.scss'
import 'swiper/css'

interface BlogSelectionSectionProps {
  posts: BlogsContentProps[]
}

const BlogSelectionSection: FC<BlogSelectionSectionProps> = ({
  posts,
}) => {
  const { t } = useTranslation(['blogSelectionSection'])
  const sliderRef = useRef<SwiperRef>(null)
  const blogNavigationPrevRef = useRef<HTMLDivElement>(null)
  const blogNavigationNextRef = useRef<HTMLDivElement>(null)

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1 className={s.title}>{t('blogSelectionSection:title')}</h1>
        <p>{t('blogSelectionSection:text')}</p>
      </div>

      <div className={s.swiperContainer}>
        <div
          className={cn(s.buttonPrev)}
          ref={blogNavigationPrevRef}
          onClick={() => sliderRef.current?.swiper.slidePrev()}
        >
          <ArrowLeftPagination />
        </div>

        <Swiper
          ref={sliderRef}
          className={s.swiper}
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={30}
          navigation={{
            prevEl: blogNavigationPrevRef.current,
            nextEl: blogNavigationNextRef.current,
          }}
          breakpoints={{
            500: {
              slidesPerView: 3,
            },
            420: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 1,
            },
          }}
        >
          {posts.map(post => (
            <SwiperSlide key={post.id}>
              <BlogCard
                {...post.attributes}
                id={post.id}
                maxLength={100}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={cn(s.buttonNext)}
          ref={blogNavigationNextRef}
          onClick={() => sliderRef.current?.swiper.slideNext()}
        >
          <ArrowRightPagination />
        </div>
      </div>
    </div>
  )
}

export default BlogSelectionSection
