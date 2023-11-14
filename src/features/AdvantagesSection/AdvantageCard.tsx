import { FC, ReactNode } from 'react'
import s from './advantagesSection.module.scss'

interface CardProps {
  image: ReactNode
  title: string
  description: string
}

export const AdvantageCard: FC<CardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className={s.card}>
      <div className={s.cardImageContainer}>{image}</div>
      <h2 className={s.cardTitle}>{title}</h2>
      <p className={s.cardDescription}>{description}</p>
    </div>
  )
}
