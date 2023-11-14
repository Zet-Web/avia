import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { Button } from 'components'

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'

import { getCurrency } from 'shared/helpers/currency/getCurrency'

import { getLocalHoursAndMinutes } from 'shared/helpers/date/getLocalHoursAndMinutes'
import { formatWithShortMonthAndWeekday } from 'shared/helpers/date/formatWithShortMonthAndWeekday'

import TimeLine from '/public/assets/images/icons/timeline.svg'

import s from './priceCalendarTicket.module.scss'
import { CalendarPriceTicket } from 'shared/types/dayCalendar'
import { selectWeekdayPrices } from 'redux/slices/ticketSlice/ticketSlice'
import { SingleRouteDateString } from 'shared/types/ticket'
import { selectCurrency } from '../../redux/slices/settingsSlice/settingsSlice'
import { DetailButton } from 'features'

const PriceCalendarTicket: FC<CalendarPriceTicket> = ({
  departure_at,
  departure_to,
  duration,
  origin_title,
  destination_title,
  origin_airport_title,
  origin_airport,
  destination_airport,
  destination_airport_title,
  return_at,
  return_to,
  price,
  state,
}) => {
  const currency = useAppSelector(selectCurrency)
  const { locale } = useRouter()
  const { t } = useTranslation(['common'])
  const { width } = useWindowDimensions()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] =
    useState<boolean>(false)

  const stringTotalPrice =
    price.toLocaleString(locale) + ' ' + getCurrency(currency)

  const handleFindButtonClick = () => {
    const date = [
      departure_at.split('T')[0],
      return_at !== null ? return_at.split('T')[0] : null,
    ]
    const ticketFormData = {
      direction: {
        origin: { title: origin_title, abbreviation: origin_airport },
        destination: {
          title: destination_title,
          abbreviation: destination_airport,
        },
      },
      date,
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
        isEconomSelected: true,
        isBusinessSelected: false,
      },
    }

    dispatch(selectWeekdayPrices(date as SingleRouteDateString))

    localStorage.setItem(
      'single_form',
      JSON.stringify(ticketFormData)
    )

    router.push(`/tickets/avia?state=${state}`)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.routes}>
        <div className={s.route}>
          <div className={s.flight}>
            <div className={s.flightStart}>
              <div className={s.flightDate}>
                {formatWithShortMonthAndWeekday(
                  departure_at,
                  locale as string
                )}
              </div>

              <div className={s.flightTime}>
                {getLocalHoursAndMinutes(
                  departure_at,
                  locale as string
                )}
              </div>
            </div>
            <span className={s.timeLineWrapper}>
              <TimeLine />
            </span>

            <div className={s.flightEnd}>
              <div className={s.flightDate}>
                {formatWithShortMonthAndWeekday(
                  departure_to,
                  locale as string
                )}
              </div>

              <div className={s.flightTime}>
                {getLocalHoursAndMinutes(
                  departure_to,
                  locale as string
                )}
              </div>
            </div>
          </div>

          <div className={s.places}>
            <div className={cn(s.flightPlace, s.flightPlaceStart)}>
              {origin_title}, {origin_airport_title}
            </div>

            <div className={cn(s.flightPlace, s.flightPlaceEnd)}>
              {destination_title}, {destination_airport_title}
            </div>
          </div>
        </div>
        {return_at && return_to && (
          <div className={s.route}>
            <div className={s.flight}>
              <div className={s.flightStart}>
                <div className={s.flightDate}>
                  {formatWithShortMonthAndWeekday(
                    return_to,
                    locale as string
                  )}
                </div>

                <div className={s.flightTime}>
                  {getLocalHoursAndMinutes(
                    return_at,
                    locale as string
                  )}
                </div>
              </div>

              <TimeLine />

              <div className={s.flightEnd}>
                <div className={s.flightDate}>
                  {formatWithShortMonthAndWeekday(
                    return_to,
                    locale as string
                  )}
                </div>

                <div className={s.flightTime}>
                  {getLocalHoursAndMinutes(
                    return_to,
                    locale as string
                  )}
                </div>
              </div>
            </div>

            <div className={s.places}>
              <div className={cn(s.flightPlace, s.flightPlaceStart)}>
                {destination_title}, {destination_airport_title}
              </div>

              <div className={cn(s.flightPlace, s.flightPlaceEnd)}>
                {origin_title}, {origin_airport_title}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={s.detailPrice}>
        <div className={s.sum}>{stringTotalPrice}</div>
        <DetailButton
          isDefaultOpen={isAdditionalInfoOpen}
          variant={'about'}
          classname={cn(s.detailBtn, {
            [s.infoOpened]: isAdditionalInfoOpen,
          })}
        >
          {t('common:words.details')}
        </DetailButton>
        <Button
          className={s.priceBtnMobile}
          title={stringTotalPrice}
          onClick={handleFindButtonClick}
        />
      </div>
    </div>
  )
}

export default PriceCalendarTicket
