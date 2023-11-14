import { FC } from 'react'
import { PartnerUniqueOffersSection } from 'shared/types/partner'
import cn from 'classnames'
import s from './uniqueOffersSection.module.scss'

export const UniqueOffersSection: FC<PartnerUniqueOffersSection> = ({
  title,
  subtitle,
  offerCardInfo,
}) => {
  return (
    <div className={s.uniqueWrapper}>
      <div className={s.headerContent}>
        <div className={s.headerTitle}>{title}</div>
        <div className={s.headerSubtitle}>{subtitle}</div>
      </div>
      <div className={s.offerCardInfo}>
        {offerCardInfo.map((item, idx) => (
          <div className={s.card} key={item.id}>
            <div className={s.title}>{idx + 1}</div>
            <div className={s.text}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
