import { FC, ReactNode } from 'react'

import cn from 'classnames'
import { A11y, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

import 'swiper/css/navigation'
import 'swiper/css/pagination'

import s from './slider.module.scss'

interface SliderProps {
  children: ReactNode[] | []
  slidesPerView?: number
  hasNavigation?: boolean
  hasPagination?: boolean
  nextEl?: string
  prevEl?: string
  classname?: string
  spaceBetween?: number
}

export const Slider: FC<SliderProps> = ({
  children,
  slidesPerView = 3,
  hasNavigation = false,
  hasPagination = false,
  spaceBetween = 50,
  nextEl = 'moreNext',
  prevEl = 'morePrev',
  classname,
}) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const paginationOptions = hasPagination && { clickable: true }
  const navigationOptions = hasNavigation && {
    nextEl: `.${nextEl}`,
    prevEl: `.${prevEl}`,
  }

  return (
    <div className={cn(s.slider, classname)}>
      <Swiper
        autoHeight={true}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={navigationOptions || false}
        pagination={paginationOptions}
      >
        {children.length
          ? children.map((child, idx) => (
              <SwiperSlide key={idx}>{child}</SwiperSlide>
            ))
          : []}
      </Swiper>
      {hasNavigation && (
        <>
          <div
            className={cn(
              s.swiperButtonPrev,
              prevEl,
              'swiper-button-prev'
            )}
          />
          <div
            className={cn(
              s.swiperButtonNext,
              nextEl,
              'swiper-button-next'
            )}
          />
        </>
      )}
    </div>
  )
}
