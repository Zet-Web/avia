import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'

import { getDaysInMonth, set, getISODay, getDate } from 'date-fns'

import { PriceItem } from 'components'

import { SkeletonPriceItem } from 'features'

import { useAppSelector } from 'redux/hooks'

import { useWindowDimensions } from 'shared/hooks/useWindowDimension'

import {
  divideCalendarArrayIntoWeeks,
  getDayPriceCalendarArray,
  getDaysBestPriceArray,
  getPriceItemDate,
  getTicketRow,
} from './helpers'

import {
  DAYS_IN_WEEK,
  DAYS_OF_WEEK,
} from 'shared/constants/priceCalendar'
import { laptop } from 'shared/constants/breakpoints'

import {
  CalendarPriceTicket,
  DayPrices,
} from 'shared/types/dayCalendar'

import s from './dayPriceCalendar.module.scss'
import PriceCalendarTicket from 'features/PriceCalendarTicket/PriceCalendarTicket'

interface DayPriceCalendarProps {
  days: DayPrices[]
  onDateSelect: (day: Date | null) => void
  currentTicket?: CalendarPriceTicket | null
  currentDate: Date | null
  isCurrentTicketLoading?: boolean
}

const DayPriceCalendar: FC<DayPriceCalendarProps> = ({
  days,
  currentDate,
  currentTicket,
  onDateSelect,
  isCurrentTicketLoading,
}) => {
  const { currency, language } = useAppSelector(
    state => state.settings
  )
  const { t } = useTranslation('common')

  const [bestMonthPrice, setBestMonthPrice] = useState<string>('')

  useEffect(() => {
    const bestIndex = days.findIndex(
      m => m.price === Math.min(...days.map(m => m.price))
    )
    setBestMonthPrice(days[bestIndex].departure_at)
  }, [days])

  const { width } = useWindowDimensions()
  const hasTicketRowView = width > laptop

  const calendarDate = new Date(days[0].departure_at)
  const firstDayOfMonth = set(calendarDate, { date: 1 })
  const firstWeekdayOfMonth = getISODay(firstDayOfMonth)
  const daysInMonth = getDaysInMonth(calendarDate)

  const handleClick = (date: Date) => {
    onDateSelect(date)
    console.log(date)
    console.log(currentDate)
  }

  const getStartingEmptyCells = (): Array<null> => {
    let startMock = []
    for (let j = 1; j < firstWeekdayOfMonth; j++) {
      startMock.push(null)
    }
    return startMock
  }

  const getEndingEmptyCells = (): Array<null> => {
    let endMock = []
    for (
      let n = daysInMonth + firstWeekdayOfMonth - 1;
      n % DAYS_IN_WEEK != 0;
      n++
    ) {
      endMock.push(null)
    }
    return endMock
  }

  const daysBestPriceArray = getDaysBestPriceArray(days, daysInMonth)

  const dayPriceCalendarArray = getDayPriceCalendarArray(
    daysBestPriceArray,
    getStartingEmptyCells(),
    getEndingEmptyCells()
  )
  const dayPriceCalendarArrayByWeeks = divideCalendarArrayIntoWeeks(
    dayPriceCalendarArray
  )

  return (
    <div className={s.container}>
      <div className={s.calendarContainer}>
        <div className={s.calendarHeader}>
          {DAYS_OF_WEEK.map((day, index) => (
            <p className={s.weekday} key={index}>
              {t(day)}
            </p>
          ))}
        </div>
        <div className={s.calendarContent}>
          {dayPriceCalendarArrayByWeeks.map((week, weekIndex) => (
            <div className={s.calendarRow} key={weekIndex}>
              <div className={s.calendarDaysRow}>
                {week.map((day, index) =>
                  day ? (
                    <PriceItem
                      key={index}
                      price_from={day.price}
                      date={new Date(day.departure_at)}
                      variant='date'
                      className={s.calendarItem}
                      locale={language}
                      currency={currency}
                      isBestPrice={
                        day.departure_at === bestMonthPrice
                      }
                      isActive={
                        currentDate &&
                        getDate(new Date(day.departure_at)) ===
                          getDate(currentDate)
                          ? true
                          : false
                      }
                      onClick={() =>
                        handleClick(new Date(day.departure_at))
                      }
                    />
                  ) : day === undefined ? (
                    <PriceItem
                      key={index}
                      date={set(calendarDate, {
                        date: getPriceItemDate(
                          weekIndex,
                          index,
                          firstWeekdayOfMonth
                        ),
                      })}
                      className={s.calendarItem}
                      variant='date'
                      locale={language}
                      currency={currency}
                    />
                  ) : (
                    <div
                      key={index}
                      className={cn(s.calendarMock, s.calendarItem)}
                    ></div>
                  )
                )}
              </div>
              {getTicketRow(weekIndex, currentDate) &&
                currentTicket &&
                hasTicketRowView && (
                  <div className={s.ticketRow}>
                    {isCurrentTicketLoading ? (
                      <SkeletonPriceItem variant='ticket' />
                    ) : (
                      <PriceCalendarTicket {...currentTicket} />
                    )}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
      {currentTicket && !hasTicketRowView && (
        <div className={s.ticketSection}>
          {<PriceCalendarTicket {...currentTicket} />}
        </div>
      )}
    </div>
  )
}

export default DayPriceCalendar
