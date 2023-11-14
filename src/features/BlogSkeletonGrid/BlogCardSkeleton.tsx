import type { FC } from 'react'
import s from './BlogSkeletonGrid.module.scss'
import Skeleton from '../../components/Skeleton/Skeleton'

const BlogCardSkeleton: FC<{
  order: number
}> = ({ order }) => {
  return (
    <>
      <div className={s.wrapper}>
        <div>
          <div className={s.tagplace}> </div>
          <Skeleton className={s.imageplace} />
        </div>
        <Skeleton className={s.dataplace} />
        <Skeleton className={s.titleplace} />
        <Skeleton className={s.textline1} />
        <Skeleton className={s.textline2} />
        {order === 2 && (
          <div>
            <Skeleton className={s.textline3} />
            <Skeleton className={s.textline4} />
          </div>
        )}
      </div>
    </>
  )
}

export default BlogCardSkeleton
