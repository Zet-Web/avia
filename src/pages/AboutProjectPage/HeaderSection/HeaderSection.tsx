import { FC } from 'react'
import { Card } from 'shared/types/aboutProject'
import s from './headerSection.module.scss'

interface HeaderSectionProps {
  title: string
  content: string
  card_component: Card[]
  number_card: Card[]
  bottom_card?: Card[]
}

export const HeaderSection: FC<HeaderSectionProps> = ({
  title,
  content,
  card_component,
  number_card,
  bottom_card,
}) => {
  return (
    <div className={s.content}>
      <div className={s.contentTitle}>
        <div className={s.title}>{title}</div>
        <div className={s.subtitle}>{content}</div>
      </div>
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
          <div className={s.advantages}>
            {number_card?.map(card => (
              <div key={card.id} className={s.numberAdvantage}>
                <div className={s.number}>{card.title}</div>
                <div className={s.numberTitle}>{card.subtitle}</div>
              </div>
            ))}
          </div>
          {bottom_card?.map(card => (
            <div
              key={card.id}
              className={s.bottomContent}
              dangerouslySetInnerHTML={{ __html: card.subtitle }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
