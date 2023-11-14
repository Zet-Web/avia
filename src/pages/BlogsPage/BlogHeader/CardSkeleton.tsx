import React, { FC } from 'react'
import s from './blogHeader.module.scss'
import Skeleton from '../../../components/Skeleton/Skeleton'
import cn from 'classnames'

interface CardSkeletonProps {
  isStaticHeight?: boolean
  position?: 'vertical' | 'horizontal'
}

const CardSkeleton: FC<CardSkeletonProps> = ({
  isStaticHeight = true,
  position = 'vertical',
}) => {
  return (
    <div
      className={
        position === 'vertical'
          ? s.skeletonWrapperV
          : s.skeletonWrapperH
      }
    >
      <Skeleton className={s.skeletonImg} theme={'blue'} />
      <div className={s.skeletonTags}></div>

      <div
        className={
          position === 'vertical'
            ? s.skeletonTextContainer
            : s.skeletonTextContainerH
        }
      >
        <Skeleton
          height={14}
          className={s.skeletonDate}
          theme={'blue'}
        />
        <Skeleton
          height={20}
          className={s.skeletonTitle}
          theme={'blue'}
        />

        <Skeleton
          height={12}
          className={cn(s.skeletonText, s.skeletonText1)}
          theme={'blue'}
        />
        <Skeleton
          height={12}
          className={cn(s.skeletonText, s.skeletonText2)}
          theme={'blue'}
        />
        <Skeleton
          height={12}
          className={cn(s.skeletonText, s.skeletonText3)}
          theme={'blue'}
        />
        {position === 'vertical' && (
          <Skeleton
            height={12}
            className={cn(s.skeletonText, s.skeletonText4)}
            theme={'blue'}
          />
        )}
      </div>
    </div>
  )
}

export default CardSkeleton
