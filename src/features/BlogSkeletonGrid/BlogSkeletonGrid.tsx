import { FC, useEffect, useState } from 'react'
import { BlogCardSkeleton } from '../index'
import s from './BlogSkeletonGrid.module.scss'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import {
  mobile,
  tablet,
  bigMobile,
} from 'shared/constants/breakpoints'

const BlogSkeletonGrid: FC<{ isLeftSide?: boolean }> = ({
  isLeftSide,
}) => {
  const { width } = useWindowDimensions()
  const [cardsQuantity, setCardsQuantity] = useState<number>(3)

  useEffect(() => {
    if (width <= bigMobile) {
      setCardsQuantity(3)
    } else if (width <= tablet) {
      setCardsQuantity(5)
    } else {
      setCardsQuantity(7)
    }
  }, [width])

  return (
    <ul className={isLeftSide ? s.containerleft : s.container}>
      {Array.from({ length: cardsQuantity }).map((item, index) => (
        <li
          key={index}
          style={{ gridArea: 'l' + index }}
          className={`s.block${item}`}
        >
          <BlogCardSkeleton order={index} />
        </li>
      ))}
    </ul>
  )
}

export default BlogSkeletonGrid
