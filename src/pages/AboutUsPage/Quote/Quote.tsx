import { FC } from 'react'
import { QuoteSection } from 'shared/types/aboutUs'

import s from './quote.module.scss'

export const Quote: FC<QuoteSection> = ({
  title,
  text,
  authorName,
  authorCompany,
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.title}>{title}</h1>
        <p className={s.text}>{text}</p>

        <div className={s.author}>
          <span className={s.authorName}>{authorName}</span>
          <span className={s.authorCompany}>{authorCompany}</span>
        </div>
      </div>
    </div>
  )
}
