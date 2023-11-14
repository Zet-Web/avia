import { FC } from 'react'
import { CardInfo } from 'shared/types/partner'
import s from './whyUsSection.module.scss'

interface WhyUsSectionProps {
  title: string
  subtitle: string
  offerCardInfo: CardInfo[]
}

export const WhyUsSection: FC<WhyUsSectionProps> = ({
  title,
  subtitle,
  offerCardInfo,
}) => {
  return (
    <div className={s.whyUsSectionWrapper}>
      <div className={s.whyUsContent}>
        <div className={s.whyUsTitle}>{title}</div>
        <div className={s.whyUsCards}>
          {offerCardInfo.map(item => (
            <div className={s.card} key={item.id}>
              <div className={s.cardNumber}>0{item.id}.</div>
              <div className={s.cardText}>
                <div className={s.cardTitle}>{item.title}</div>
                <div className={s.cardText}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
