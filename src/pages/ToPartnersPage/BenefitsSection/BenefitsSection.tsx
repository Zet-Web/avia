import Image from 'next/image'
import { FC, ReactNode } from 'react'

import s from './benefitsSection.module.scss'

interface BenefitsCard {
  icon: string
  title: string
  text: string
}
interface BenefitsSectionProps {
  title: ReactNode
  text: ReactNode
  cards: BenefitsCard[]
}

const BenefitsSection: FC<BenefitsSectionProps> = ({
  title,
  text,
  cards,
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.titleContent}>
          <h1 className={s.title}>{title}</h1>
          <p className={s.titleText}>{text}</p>
        </div>
        <ul className={s.cardList}>
          {cards.map((card: BenefitsCard, index: number) => (
            <li className={s.card} key={index}>
              <div className={s.cardIcon}>
                <Image src={card.icon} width={32} height={32} alt={card.title} />
              </div>
              <div className={s.cardContent}>
                <h1 className={s.cardTitle}>
                  {index + 1}. {card.title}
                </h1>
                <p className={s.cardText}>{card.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BenefitsSection
