import { FC, FormEvent, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { getDate, getMonth, getYear, set } from 'date-fns'

import { Button, DirectionInput, PriceItem, Range } from 'components'

import {
  DayPriceCalendar,
  NoTicketsSection,
  TransferTabs,
  SkeletonDayPrice,
  SkeletonPriceItem,
} from 'features'

import { useAppSelector } from 'redux/hooks'

import {
  getCurrentTicket,
  getDaysPrices,
  getMonthsPrices,
} from 'shared/api/routes/pricePage'

import {
  MONTHS_OF_YEAR,
  VACATION_RANGE,
  VACATION_DEFAULT,
} from 'shared/constants/priceCalendar'

import { Currency, Language, Transfer } from 'shared/types'
import {
  CalendarPriceTicket,
  DayPrices,
  MonthPrices,
} from 'shared/types/dayCalendar'

import { DirectionValue } from 'components/DirectionInput/DirectionInput'

import CalendarArrowLeft from '/public/assets/images/CalendarArrowLeft.svg'
import CalendarNavLeft from '/public/assets/images/CalendarNavLeft.svg'
import CalendarNavRight from '/public/assets/images/CalendarNavRight.svg'

import s from './priceCalendarPage.module.scss'
import { getMonthPricesArray } from 'shared/helpers/getMonthPricesArray'
import Head from 'next/head'
import { selectGeoData } from '../../redux/slices/settingsSlice/settingsSlice'

interface CalendarFormProps {
  city: DirectionValue
}

export const PriceCalendarPage: FC = () => {
  const { currency, language } = useAppSelector(
    state => state.settings
  )
  const { t } = useTranslation([
    'common',
    'priceCalendarPage',
    'meta',
  ])

  const [vacation, setVacation] =
    useState<[number, number]>(VACATION_DEFAULT)
  const [isRoundTripSelected, setIsRoundTripSelected] =
    useState<boolean>(false)
  const [month, setMonth] = useState<number | null>(null)
  const [year, setYear] = useState<number | null>(null)
  const [monthPrices, setMonthPrices] = useState<MonthPrices[]>()
  const [dayPrices, setDayPrices] = useState<DayPrices[] | null>()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentTicket, setCurrentTicket] =
    useState<CalendarPriceTicket | null>(null)
  const [bestYearPrice, setBestYearPrice] = useState<MonthPrices>()
  const [bestPrices, setBestPrices] = useState<
    [number | undefined, number | undefined, number | undefined]
  >([0, 0, 0])
  const [transferTab, setTransferTab] = useState<Transfer>(
    Transfer.AVIA
  )
  const [city, setCity] = useState<DirectionValue>({
    origin: null,
    destination: null,
  })

  const [isMonthlyCalendarLoading, setMonthlyCalendarLoading] =
    useState<boolean>(false)
  const [isDaysCalendarLoading, setDaysCalendarLoading] =
    useState<boolean>(false)
  const [isCurrentTicketLoading, setCurrentTicketLoading] =
    useState<boolean>(false)

  const geo = useAppSelector(selectGeoData)

  const clearTicketStates = () => {
    setCurrentTicket(null)
    setSelectedDate(null)
  }

  useEffect(() => {
    if (!city.origin && geo)
      setCity({
        ...city,
        origin: {
          title: geo.title,
          abbreviation: geo.code,
        },
      })
  }, [geo])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setMonthlyCalendarLoading(true)
    e.preventDefault()
    if (city.origin && city.destination)
      getMonthCalendarPrices(
        city.origin.abbreviation,
        city.destination.abbreviation,
        currency,
        setMonthPrices
      ).then(() => setMonthlyCalendarLoading(false))
  }

  const getMonthCalendarPrices = async (
    origin: string,
    destination: string,
    currency: Currency,
    result: (value: MonthPrices[]) => void
  ) => {
    const monthsPrices = await getMonthsPrices(
      origin,
      destination,
      currency,
      isRoundTripSelected
        ? {
            min: vacation[0],
            max: vacation[1],
          }
        : undefined
    )
    result(monthsPrices.data)
  }

  const getDaysCalendarPrices = async (
    origin: string,
    destination: string,
    currency: Currency,
    month: number,
    result: (value: DayPrices[]) => void,
    year?: number | null
  ) => {
    const daysPrices = await getDaysPrices(
      origin,
      destination,
      currency,
      month,
      year,
      isRoundTripSelected
        ? {
            min: vacation[0],
            max: vacation[1],
          }
        : undefined
    )
    result(daysPrices.data)
  }

  const getTicket = async (
    origin: string,
    destination: string,
    currency: Currency,
    language: Language,
    date: string,

    result: (value: CalendarPriceTicket) => void
  ) => {
    setCurrentTicketLoading(true)
    const currentTicket = await getCurrentTicket(
      origin,
      destination,
      currency,
      language,
      date,
      isRoundTripSelected
        ? {
            min: vacation[0],
            max: vacation[1],
          }
        : undefined
    )
    result(currentTicket.data)
  }

  const handleDateSelect = (date: Date | null) => {
    if (
      (!selectedDate && date) ||
      (selectedDate &&
        date &&
        getDate(date) !== getDate(selectedDate))
    ) {
      setSelectedDate(date)
      city.destination && city.origin
        ? getTicket(
            city.origin.abbreviation,
            city.destination.abbreviation,
            currency,
            language,
            date.toLocaleDateString('en-ca'),
            setCurrentTicket
          ).then(() => setCurrentTicketLoading(false))
        : null
    } else {
      setSelectedDate(null), setCurrentTicket(null)
    }
  }

  const monthPricesArray = getMonthPricesArray(monthPrices)
  // monthPrices?.length === 13
  //   ? (monthPrices?.slice(
  //       0,
  //       monthPrices.length - 1
  //     ) as MonthPrices[])
  //   : (monthPrices as MonthPrices[])

  const handleNavLeftClick = () => {
    if (month) {
      let k = month - 2
      if (month !== 1) {
        if (monthPricesArray[k]) {
          setMonth(month - 1)
          clearTicketStates()
        } else {
          while (k > 1 && !monthPricesArray[k]) {
            k--
          }
          if (monthPricesArray[k]) {
            setMonth(k + 1)
            clearTicketStates()
          }
        }
      }
    }
  }
  const handleNavRightClick = () => {
    if (month) {
      let k = month
      if (month !== 12) {
        if (monthPricesArray[k]) {
          setMonth(month + 1)
          clearTicketStates()
        } else {
          while (k < 12 && !monthPricesArray[k]) {
            k++
          }
          if (monthPricesArray[k]) {
            setMonth(k + 1)
            clearTicketStates()
          }
        }
      }
    }
  }

  useEffect(() => {
    setDaysCalendarLoading(true)
    month &&
      city.destination &&
      city.origin &&
      getDaysCalendarPrices(
        city.origin.abbreviation,
        city.destination.abbreviation,
        currency,
        month,
        setDayPrices,
        year
      ).then(() => setDaysCalendarLoading(false))
  }, [month])

  useEffect(() => {
    if (monthPrices && monthPrices.length) {
      const bestIndex = monthPrices.findIndex(
        m => m.price === Math.min(...monthPrices.map(m => m.price))
      )

      setBestYearPrice(monthPrices[bestIndex])
      setBestPrices(prevState => ({
        ...prevState,
        [transferTab]: monthPrices[bestIndex].price,
      }))
      setMonth(null)
    }
  }, [isRoundTripSelected, vacation, monthPrices])

  return (
    <div className={s.wrapper}>
      <Head>
        <title>{t('meta:titles.priceCalendar')}</title>
      </Head>
      <div className={s.container}>
        <h1 className={s.title}>{t('priceCalendarPage:title')}</h1>

        <div className={s.roundtrip}>
          <label className={s.roundtripLabel} htmlFor='roundtripTrue'>
            <input
              className={s.roundtripRadio}
              name='roundtrip'
              type='radio'
              id='roundtripTrue'
              defaultChecked={isRoundTripSelected}
              onChange={() => setIsRoundTripSelected(true)}
            />
            <span className={s.roundtripText}>
              {t('priceCalendarPage:roundTrip')}
            </span>
          </label>
          <label
            className={s.roundtripLabel}
            htmlFor='roundtripFalse'
          >
            <input
              className={s.roundtripRadio}
              name='roundtrip'
              type='radio'
              id='roundtripFalse'
              defaultChecked={!isRoundTripSelected}
              onChange={() => setIsRoundTripSelected(false)}
            />
            <span className={s.roundtripText}>
              {t('priceCalendarPage:oneWay')}
            </span>
          </label>
        </div>

        <form
          className={s.direction}
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <div className={s.directionWrapper}>
            <DirectionInput defaultValue={city} onChange={setCity} />
          </div>
          <Button
            type='submit'
            title='Полетели!'
            className={s.directionButton}
          />
        </form>

        {isRoundTripSelected && (
          <div className={s.range}>
            <h3 className={s.rangeTitle}>
              {t('priceCalendarPage:vacation')}
            </h3>
            <div className={s.rangeLabel}>
              <span>
                {t('common:words.from')} {vacation[0]}{' '}
                {t('common:words.days')}
              </span>
              <span>
                {t('common:words.until')} {vacation[1]}{' '}
                {t('common:words.days')}
              </span>
            </div>
            <Range
              min={VACATION_RANGE[0]}
              max={VACATION_RANGE[1]}
              onChange={val => setVacation(val)}
              value={vacation}
            />
          </div>
        )}

        <div className={s.tabs}>
          <TransferTabs
            prices={bestPrices}
            currency={Currency[currency]}
            getActiveTab={tab => {
              setBestPrices(prevState => ({
                ...prevState,
                [tab]: bestYearPrice?.price,
              }))
            }}
          />
        </div>
        {isMonthlyCalendarLoading && (
          <div className={s.monthTable}>
            {Array.from({ length: 12 }).map((item, index) => (
              <SkeletonPriceItem key={index} />
            ))}
          </div>
        )}
        {month ? (
          <div className={s.dayCalendarContainer}>
            <div className={s.dayCalendarPanel}>
              <CalendarArrowLeft
                onClick={() => {
                  setMonth(null),
                    setYear(null),
                    clearTicketStates(),
                    setDayPrices(null)
                }}
                className={s.calendarIcon}
              />

              <div className={s.monthNavigation}>
                <CalendarNavLeft
                  onClick={handleNavLeftClick}
                  className={s.calendarIcon}
                />
                <span>{t(MONTHS_OF_YEAR[month - 1])}</span>
                <CalendarNavRight
                  onClick={handleNavRightClick}
                  className={s.calendarIcon}
                />
              </div>
            </div>
            {!isDaysCalendarLoading &&
            dayPrices &&
            dayPrices?.length !== 0 ? (
              <DayPriceCalendar
                days={dayPrices}
                currentDate={selectedDate}
                onDateSelect={date => {
                  handleDateSelect(date)
                }}
                currentTicket={currentTicket}
                isCurrentTicketLoading={isCurrentTicketLoading}
              />
            ) : (
              <SkeletonDayPrice />
            )}
          </div>
        ) : (
          !isMonthlyCalendarLoading &&
          monthPrices &&
          (monthPrices.length ? (
            <div className={s.monthTable}>
              {monthPricesArray.map((month, index) =>
                typeof month !== 'number' ? (
                  <PriceItem
                    className={s.monthItem}
                    key={month.date}
                    onClick={() => {
                      setMonth(getMonth(new Date(month.date)) + 1)
                      setYear(getYear(new Date(month.date)))
                    }}
                    date={new Date(month.date)}
                    price_from={month.price}
                    variant='month'
                    locale={language}
                    isBestPrice={month.date === bestYearPrice?.date}
                    currency={currency}
                  />
                ) : (
                  <PriceItem
                    className={s.monthItem}
                    key={index}
                    date={set(new Date(), {
                      month: month,
                    })}
                    variant='month'
                    locale={language}
                    currency={currency}
                  />
                )
              )}
            </div>
          ) : (
            <NoTicketsSection
              variant='noTicket'
              className={s.calendarWrapper}
            />
          ))
        )}
      </div>
    </div>
  )
}
