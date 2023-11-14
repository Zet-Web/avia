import { useTranslation } from 'next-i18next'
import { FC, useEffect, useState } from 'react'

import { PriceCard } from './PriceCard/PriceCard'

import { getWeekPrice } from 'shared/api/routes/weekPrice'

import { Currency } from 'shared/types'
import { WeekPrice } from 'shared/types/ticket'

import { useRouter } from 'next/router'
import { useAppSelector } from '../../../redux/hooks'
import { RootState } from '../../../redux/store'
import { formatApiDate } from '../../../shared/helpers/date/formatApiDate'
import s from './price.module.scss'
import { getRouteType } from 'shared/helpers/route/getRouteType'

interface PricesProps {
  activeType: number
  currency: Currency
  isLoading?: boolean
}

const mock = new Array(7).fill(null)

export const Prices: FC<PricesProps> = ({
  activeType,
  currency,
  isLoading,
}) => {
  const { t } = useTranslation(['common'])
  const [pricesContent, setPricesContent] =
    useState<WeekPrice[]>(mock)
  const {
    locale,
    query: { state: searchCode },
  } = useRouter()

  const currentDate = useAppSelector(
    (state: RootState) => state.ticket.weekdayPrice
  )
  const ticketQuery = useAppSelector(
    state => state.ticket.ticketInfo?.find
  )

  const ticketCount = useAppSelector(
    state => state.ticket.ticketCount
  )

  const getCurrentDate = (item: WeekPrice) => {
    const returnDate =
      item.datetime_at.return_at !== null
        ? formatApiDate(Date.parse(item.datetime_at.return_at))
        : item.datetime_at.return_at

    return (
      currentDate?.[0] === item.departure_at &&
      currentDate?.[1] === returnDate
    )
  }

  let tab = ''

  switch (activeType) {
    case 0:
      tab = t('common:words.airplanes')
      break
    case 1:
      tab = t('common:words.trains')
      break
    case 2:
      tab = t('common:words.buses')
      break
    default:
      tab = t('common:errors.wrongState')
  }

  useEffect(() => {
    if (searchCode && getRouteType(ticketQuery) === 'simple')
      getContent(searchCode as string)
  }, [searchCode])

  const getContent = async (searchCode: string) => {
    try {
      const pricesContent = await getWeekPrice(searchCode)
      setPricesContent(pricesContent.data)
    } catch (e) {
      setPricesContent(mock)
    }
  }

  return ticketCount > 0 || pricesContent.some(p => p !== null) ? (
    <div className={s.prices}>
      <div className={s.titleBlock}>
        <div className={s.topText}>{t('common:weekPrice')}</div>
        <div className={s.bottomText}>{tab.toLowerCase()}</div>
      </div>
      <div className={s.blockWrapper}>
        <div className={s.blockContainer}>
          {pricesContent
            ?.slice(0, 7)
            .map((item: WeekPrice, index: number) => (
              <PriceCard
                key={index}
                item={item}
                isActive={item && getCurrentDate(item)}
                currency={currency}
                isLoading={isLoading}
              />
            ))}
        </div>
      </div>
    </div>
  ) : null
}
