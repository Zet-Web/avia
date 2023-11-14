import { FC } from 'react'
import s from './SkeletonPriceItem.module.scss'
import Skeleton from '../../components/Skeleton/Skeleton'

interface SkeletonPriceItemProps {
  variant?: 'day' | 'ticket'
}

const SkeletonPriceItem: FC<SkeletonPriceItemProps> = ({
  variant,
}) => {
  if (variant === 'day') {
    return (
      <div className={s.daysCalendar}>
        <div className={s.daysSkeletonLines}>
          <div className={s.skeletonTopLine}></div>
          <div className={s.skeletonBottomLine}></div>
        </div>
        <Skeleton width='100%' height='100%' />
      </div>
    )
  }

  if (variant === 'ticket') {
    return (
      <div className={s.wrapper}>
        <div className={s.left}>
          <div className={s.container}>
            <div className={s.lineBlock}>
              <Skeleton width={72.6} height={8} radius={50} />
              <Skeleton width={73.7} height={20} radius={50} />
              <Skeleton width={136} height={8} radius={50} />
            </div>
            <div className={s.lineBlockMiddle}>
              <Skeleton width={96} height={8} radius={50} />
              <Skeleton width={96} height={5} radius={10} />
            </div>
            <div
              className={s.lineBlock}
              style={{ alignItems: 'flex-end' }}
            >
              <Skeleton width={72.6} height={8} radius={50} />
              <Skeleton width={73.7} height={20} radius={50} />
              <Skeleton width={136} height={8} radius={50} />
            </div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.rightLinesBlock}>
            <div className={s.rightLines}>
              <Skeleton width={92} height={14} radius={50} />
              <div className={s.rightBottomLine}></div>
            </div>
          </div>
          <Skeleton width='100%' height={34} className={s.button} />
        </div>
      </div>
    )
  }

  return (
    <div className={s.priceItem}>
      <div className={s.skeletonLines}>
        <div className={s.skeletonTopLine}></div>
        <div className={s.skeletonBottomLine}></div>
      </div>
      <Skeleton width='100%' height='100%' />
    </div>
  )
}

export default SkeletonPriceItem
