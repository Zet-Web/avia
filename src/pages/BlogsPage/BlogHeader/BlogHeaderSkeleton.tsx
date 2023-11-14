import React from 'react'
import s from './blogHeader.module.scss'
import CardSkeleton from './CardSkeleton'

const BlogHeaderSkeleton = () => {
  return (
    <div className={s.content}>
      <div className={s.contentLeft}>
        <CardSkeleton />
      </div>

      <div className={s.contentRight}>
        {Array.from(Array(3).keys(), it => (
          <CardSkeleton key={it} position={'horizontal'} />
        ))}
      </div>
    </div>
  )
}

export default BlogHeaderSkeleton
