import { FC, ReactNode } from 'react'
import cn from 'classnames'
import s from './uniqueOffersSection.module.scss'

interface UniqueOffersSectionProps {
  title: ReactNode
  text: ReactNode
  cards: string[]
}

const UniqueOffersSection: FC<UniqueOffersSectionProps> = ({
  title,
  text,
  cards,
}) => {
  // This function is need for change the background of certain unique offer cards according to figma design.
  // The choose of the cards is different on mobile and desktop versions
  const cardClassName = (index: number) =>
    cn(s.card, {
      // For desktop version
      [s.active]: (index - 1) % 4 === 0 || (index - 2) % 4 === 0,
      // For mobile version
      [s.mobileActive]: index % 2 !== 0,
    })

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.titleContent}>
          <h1 className={s.title}>{title}</h1>
          <p className={s.titleText}>{text}</p>
        </div>
        <ul className={s.cardList}>
          {cards.map((card, index) => (
            <li className={cardClassName(index)} key={index}>
              <span className={s.cardNumber}>{index + 1}</span>
              <p className={s.cardText}>{card}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UniqueOffersSection
