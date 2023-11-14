import { FC } from 'react'
import { Card } from 'shared/types/aboutProject'
import s from './faqSection.module.scss'

interface FaqSectionProps {
  card_component: Card[]
  number_card: Card[]
  bottom_card?: Card[]
}

export const FaqSection: FC<FaqSectionProps> = ({
  card_component,
  number_card,
  bottom_card,
}) => {
  return (
    <div className={s.content}>
      {card_component?.map(card => (
        <div key={card.id} className={s.questionBox}>
          <div className={s.title}>{card.title}</div>
          <div
            className={s.questionBoxContent}
            dangerouslySetInnerHTML={{
              __html: card.subtitle,
            }}
          />
        </div>
      ))}
      <div className={s.questionBox}>
        <div className={s.title}></div>
        <div className={s.questionBoxContent}>
          <div className={s.advantagesCours}>
            {number_card?.map(card => (
              <div key={card.id} className={s.numberAdvantage}>
                <div className={s.number}>{card.title}</div>
                <div className={s.numberTitle}>{card.subtitle}</div>
              </div>
            ))}
          </div>
          {bottom_card?.map(card => (
            <div className={s.bottomContent} key={card.id}>
              <div className={s.bottomTitle}>{card.title}</div>
              <div className={s.bottomText}>{card.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
