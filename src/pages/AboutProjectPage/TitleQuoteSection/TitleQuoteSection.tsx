import { Logo } from 'components'
import { FC } from 'react'
import s from './titleQuoteSection.module.scss'

interface TitleQuoteSectionProps {
  titleQuote: string
}

export const TitleQuoteSection: FC<TitleQuoteSectionProps> = ({
  titleQuote,
}) => {
  return (
    <div className={s.quote}>
      <div className={s.logo}>
        <Logo variant='secondary' />
      </div>
      <div className={s.titleQuote}>{titleQuote}</div>
    </div>
  )
}
