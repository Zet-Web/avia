import { FC, ReactNode } from 'react'

import { AboutUsSectionProps } from 'shared/types/aboutUs'
import cn from 'classnames'

import s from './historySection.module.scss'
import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'

interface HistorySectionProps {
  title: ReactNode
  card: AboutUsSectionProps[]
}

export const HistorySection: FC<HistorySectionProps> = ({
  title,
  card,
}) => {
  console.log(card)
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.title}>{title}</h1>

        <ul className={s.list}>
          {card.map((card: AboutUsSectionProps, index: number) => (
            <li
              className={cn(s.card, {
                [s.cardImg]: Boolean(card.images.data),
              })}
              key={index}
              style={{
                backgroundImage: `url(${getImageUrlWithBaseDomain(
                  card.images?.data?.attributes.url
                )})`,
              }}
            >
              <span className={s.cardNumber}>{index + 1}.</span>
              {card.title ? (
                <h2 className={s.cardTitle}>{card.title}</h2>
              ) : null}
              <p className={s.cardText}>{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
