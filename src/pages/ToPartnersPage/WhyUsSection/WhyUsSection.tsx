import { FC, ReactNode } from 'react'

import s from './whyUsSection.module.scss'

interface WhyUsCard {
  title: string
  text: string
}
interface WhyUsSectionProps {
  title: ReactNode
  cards: WhyUsCard[]
}

const WhyUsSection: FC<WhyUsSectionProps> = ({ title, cards }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.title}>{title}</h1>
        <ul className={s.cardList}>
          {cards.map((card: WhyUsCard, index: number) => (
            <li className={s.card} key={index}>
              <span className={s.cardNumber}>0{index + 1}.</span>
              <h2 className={s.cardTitle}>{card.title}</h2>
              <p className={s.cardText}>{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default WhyUsSection
