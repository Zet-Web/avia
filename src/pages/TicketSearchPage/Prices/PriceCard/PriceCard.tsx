import { FC } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Skeleton from 'components/Skeleton/Skeleton'
import { getCurrency } from 'shared/helpers/currency/getCurrency'

import { formatWithFullMonthCapitalize } from 'shared/helpers/date/formatWithFullMonthCapitalize'
import { formatWithFullMonthAndWeekdayCapitalize } from 'shared/helpers/date/formatWithFullMonthAndWeekdayCapitalize'

import { Currency } from 'shared/types'
import { WeekPrice } from 'shared/types/ticket'

import s from './priceCard.module.scss'

interface PriceCardProps {
  item: WeekPrice | null
  currency: Currency
  isActive?: boolean
  onClick?: () => void
  isLoading?: boolean
}

export const PriceCard: FC<PriceCardProps> = ({
  item,
  currency,
  isActive,
  isLoading,
}) => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const { locale } = router

  const handleOnClickPrice = (item: WeekPrice) => {
    if (item === null) return
    router.push(`/tickets/avia?state=${item.state}`)
  }

  const renderItem = (item: WeekPrice) => (
    <div
      className={cn(s.priceBlock, {
        [s.active]: isActive && !isLoading,
      })}
      onClick={() => handleOnClickPrice(item)}
    >
      {isLoading && <Skeleton width={82} height={12} radius={50} />}
      {!isLoading && (
        <p
          className={cn(s.topText, {
            [s.active]: isActive,
          })}
        >
          {item.price !== null ? (
            <>
              {t('common:words.fromLower')}{' '}
              {item.price?.toLocaleString(locale)}{' '}
              {getCurrency(currency)}
            </>
          ) : (
            '...'
          )}
        </p>
      )}
      {isLoading && <Skeleton width={72} height={8} radius={50} />}
      {!isLoading && (
        <p
          className={cn(s.bottomText, {
            [s.active]: isActive,
          })}
        >
          {item.datetime_at.return_at === null ? (
            formatWithFullMonthAndWeekdayCapitalize(
              item.departure_at,
              locale as string
            )
          ) : (
            <>
              {formatWithFullMonthCapitalize(
                item.departure_at,
                locale as string
              )}{' '}
              -{' '}
              {formatWithFullMonthCapitalize(
                item.datetime_at.return_at,
                locale as string
              )}
            </>
          )}
        </p>
      )}
    </div>
  )

  const renderMock = () => (
    <div className={cn(s.priceBlock, s.priceMock)}>
      <p className={cn(s.topText)}>...</p>
      <p className={cn(s.bottomText)}>...</p>
    </div>
  )

  return <>{item !== null ? renderItem(item) : renderMock()}</>
}
