import { FC } from 'react'
import s from './SkeletonTicket.module.scss'
import Skeleton from '../../components/Skeleton/Skeleton'

const SkeletonTicket: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.leftContainer}>
        <div className={s.leftContainerTop}>
          <div className={s.airlinesPlace}>
            <Skeleton width={20} height={20} radius='100%' />
            <Skeleton width={41} height={8} radius={50} />
          </div>
          <div className={s.iconsPlace}>
            <Skeleton width={15} height={15} radius='100%' />
            <Skeleton width={15} height={15} radius='100%' />
            <Skeleton width={15} height={15} radius='100%' />
          </div>
        </div>
        <div className={s.leftContainerMiddle}>
          <Skeleton width={72.6} height={8} radius={50} />
          <div className={s.leftContainerMiddleCenter}>
            <Skeleton width={96} height={8} radius={50} />
          </div>
          <Skeleton width={72.6} height={8} radius={50} />
        </div>
        <div className={s.leftContainerTimeBlock}>
          <Skeleton width={73.7} height={18} radius={50} />
          <div className={s.timeBlockCenter}>
            <Skeleton width={45.87} height={5} radius={50} />
            <Skeleton width={19.5} height={1} className={s.hr} />
            <Skeleton width={32.76} height={5} radius={50} />
          </div>
          <Skeleton width={73.7} height={18} radius={50} />
        </div>
        <div className={s.leftContainerBottom}>
          <Skeleton width={136} height={8} radius={50} />
          <Skeleton width={136} height={8} radius={50} />
        </div>
      </div>
      <div className={s.rightContainer}>
        <div className={s.typePlace}>
          <div className={s.typePlaceLeft}>
            <div className={s.typePlaceLeftBlock}>
              <Skeleton width={16} height={16} radius='100%' />
              <Skeleton width={52} height={8} radius={50} />
            </div>
          </div>
          <div className={s.typePlaceRight}>
            <div className={s.typePlaceRightContainer}>
              <div className={s.typePlaceRightBlock}>
                <div className={s.typePlaceRightTop}></div>
                <div className={s.typePlaceRightBottom}></div>
              </div>
            </div>
            <Skeleton width='100%' height='100%' />
          </div>
        </div>
        <div className={s.pricePlace}>
          <Skeleton width={91} height={8} radius={50} />
        </div>
        <div className={s.morePlace}>
          <div className={s.morePlaceLinePlace}>
            <div className={s.morePlaceLine}></div>
          </div>
          <Skeleton width='100%' height='100%' />
        </div>
      </div>
    </div>
  )
}

export default SkeletonTicket
