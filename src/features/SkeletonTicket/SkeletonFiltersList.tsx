import { FC } from 'react'
import s from './SkeletonTicket.module.scss'
import { Checkbox } from 'components'
import Skeleton from '../../components/Skeleton/Skeleton'

const SkeletonFiltersList: FC = () => {
  return (
    <div className={s.listWrapper}>
      {Array.from({ length: 5 }).map((item, index) => (
        <div className={s.filterListItem} key={index}>
          <Checkbox
            type='checkbox'
            name={'noName'}
            value={'all'}
            isChecked={false}
          />
          <Skeleton
            width='75%'
            height={11}
            radius={50}
            className={s.listSkeleton}
          />
        </div>
      ))}
    </div>
  )
}

export default SkeletonFiltersList
