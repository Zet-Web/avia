import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'classnames'

import { getMonthName } from 'shared/helpers/date/getMonthName'
import { Currency } from 'shared/types'
import { getCurrency } from 'shared/helpers/currency/getCurrency'

import s from './priceItem.module.scss'

interface PriceItemProps {
  className?: string
  date: Date
  price_from?: number
  isActive?: boolean
  variant?: 'date' | 'month'
  isBestPrice?: boolean
  onClick?: () => void
  locale: string
  currency: Currency
}

const PriceItem: FC<PriceItemProps> = ({
  className,
  date,
  price_from,
  isActive,
  variant,
  onClick,
  isBestPrice,
  locale,
  currency,
}) => {
  const { t } = useTranslation(['common'])
  const isActualDay = (date: Date) => {
    return date >= new Date(new Date().setHours(0, 0, 0))
  }
  return (
    <div
      className={cn(
        s.priceItem,
        { [s.bestPriceItem]: isBestPrice },
        { [s.activeItem]: isActive },
        { [s.shortenItem]: variant === 'date' },
        className
      )}
      onClick={onClick}
    >
      <div className={s.title}>
        {variant === 'date'
          ? isActualDay(date)
            ? date.getDate().toString()
            : ''
          : getMonthName(date, locale)}
      </div>
      <div className={s.price}>
        {variant === 'date' && !isActualDay(date) ? (
          ''
        ) : price_from ? (
          <span>
            {`${t(
              'common:words.fromLower'
            )} ${price_from.toLocaleString(locale)} ${getCurrency(
              currency
            )}`}
          </span>
        ) : (
          '...'
        )}
      </div>
      {isBestPrice && variant === 'month' ? (
        <span className={s.bestPrice}>{t('common:bestPrice')}!</span>
      ) : (
        ''
      )}
    </div>
  )
}

export default PriceItem
