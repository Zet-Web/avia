import { FC, useRef } from 'react'
import cn from 'classnames'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

import ArrowLeftPagination from '/public/assets/images/ArrowLeftPagination.svg'
import ArrowRightPagination from '/public/assets/images/ArrowRightPagination.svg'
import LoadMoreIcon from '/public/assets/images/icons/LoadMoreIcon.svg'

import s from './blogSection.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import { BlogsContentProps } from '../../shared/types/blogs'
import { BlogCard, BlogSkeletonGrid } from '../index'

interface BlogSectionProps {
  posts: BlogsContentProps[]
  hasMore: boolean
  loadMore?: () => void
  titleClassName?: string
  title: string
  hasSlider?: boolean
  isLoaiding?: boolean
  isLeftSideSkeleton?: boolean
}

const BlogSection: FC<BlogSectionProps> = ({
  posts,
  title,
  hasMore,
  loadMore,
  titleClassName,
  hasSlider = true,
  isLoaiding,
  isLeftSideSkeleton,
}) => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  return (
    <div className={s.container}>
      {hasSlider ? (
        <Swiper
          className={s.swiper}
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={30}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          style={{
            flexDirection: isLoaiding ? 'column' : 'column-reverse',
          }}
          // eslint-disable-next-line @typescript-eslint/naming-convention
          pagination={{ clickable: true }}
          breakpoints={{
            827: {
              slidesPerView: 4,
            },
            501: {
              slidesPerView: 3,
            },
            425: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 1,
            },
          }}
        >
          <div className={s.header}>
            <h3 className={cn(s.title, titleClassName)}>{title}</h3>

            <div className={s.buttons}>
              <button className={s.button} ref={navigationPrevRef}>
                <ArrowLeftPagination />
              </button>
              <button className={s.button} ref={navigationNextRef}>
                <ArrowRightPagination />
              </button>
            </div>
          </div>
          <ul>
            {isLoaiding && (
              <BlogSkeletonGrid isLeftSide={isLeftSideSkeleton} />
            )}
            {!isLoaiding &&
              posts.map((post, id) => (
                <SwiperSlide key={id}>
                  <BlogCard
                    {...post.attributes}
                    id={post.id}
                    maxLength={100}
                  />
                </SwiperSlide>
              ))}
          </ul>
        </Swiper>
      ) : (
        <div className={s.postsWrapper}>
          <div className={s.header}>
            <h3 className={cn(s.title, titleClassName)}>{title}</h3>
          </div>
          <div className={s.posts}>
            {isLoaiding ? (
              <BlogSkeletonGrid isLeftSide={isLeftSideSkeleton} />
            ) : null}
            {!isLoaiding &&
              (posts.length ? (
                posts.map(post => (
                  <BlogCard
                    {...post.attributes}
                    id={post.id}
                    key={post.id}
                    maxLength={100}
                  />
                ))
              ) : (
                <div className={s.notResult}>
                  Ваш запрос не дал результатов...
                </div>
              ))}
          </div>
        </div>
      )}

      {hasMore ? (
        <div className={s.loadMoreContainer}>
          <button onClick={loadMore} className={s.loadMoreButton}>
            загрузить еще
            <span>
              <LoadMoreIcon />
            </span>
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default BlogSection
