import { debounce } from 'lodash'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { filterTickets, selectTicketInfo } from 'redux/slices/ticketSlice/ticketSlice'
import { scrollLock } from 'shared/helpers/scrollLock'
import {
  Sort as SortType,
  TicketFilter as TicketFilterForm,
  TicketInfo,
  Transplants,
} from 'shared/types/ticket'

import s from '../../features/TicketFilter/ticketFilter.module.scss'

type Form = TicketFilterForm & {
  sort: keyof SortType
  airports_transfer: string[][][][]
}

export const useFilters = () => {
  const ticketInfo = useAppSelector(selectTicketInfo)
  const { t } = useTranslation(['common'])


  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [isSubmitOpen, setIsSubmitOpen] = useState<boolean>(false)

  const closeModal = () => {
    setIsFilterOpen(false)
    setIsSubmitOpen(false)
  }

  const dispatch = useAppDispatch()

  const { reset, control, watch, getValues } = useForm<Form>()

  useEffect(() => {
    scrollLock(isFilterOpen)
  }, [isFilterOpen])

  const getDestination = (index: number): ReactNode => {
    const airport = ticketInfo?.filter.airports_arrival?.[index][0]
    if (airport && ticketInfo?.airports[airport]) {
      return (
        <div className={s.direction}>
          {t('common:words.arrival')}{' '}
          {
            ticketInfo.airports[
              ticketInfo.filter.airports_arrival[index][0]
            ].cases.vi
          }
        </div>
      )
    }
    return null
  }

  const getDirection = (index: number): ReactNode => {
    const departureCity = ticketInfo?.find.directions[0].origin
    const arrivalCity =
      ticketInfo?.find.directions[
        ticketInfo?.find.directions.length - 1
      ].destination
    const isRoundTrip = departureCity === arrivalCity

    if (isRoundTrip && index === 1) {
      return <div className={s.flight}>{t('common:words.back')}</div>
    } else if (
      !isRoundTrip &&
      ticketInfo &&
      ticketInfo.find.directions.length > 1
    ) {
      return (
        <div className={s.flight}>
          {t('common:words.flightCapitalize')} {index + 1}
        </div>
      )
    }

    return <div className={s.flight}>{t('common:words.there')}</div>
  }

  const getOrigin = (index: number) => {
    const airport = ticketInfo?.filter.airports_departure?.[index][0]
    if (airport && ticketInfo.airports[airport]) {
      return (
        <div className={s.direction}>
          {t('common:words.departureFrom')}{' '}
          {
            ticketInfo.airports[
              ticketInfo.filter.airports_departure[index][0]
            ].cases.po
          }
        </div>
      )
    }
    return null
  }

  const getTransplantsCount = (index?: number) => {
    const t = getValues('transplants')
    if (t) {
      const max = Math.max(...t.map(t => +Transplants[t]))

      return max === 3 ? undefined : max
    }
    return 0
  }

  const formatTransferAirports = () => {
    const res: string[][][][] = []
    if (ticketInfo) {
      for (
        let i = 0;
        i < ticketInfo.filter.airports_transfer.length;
        i++
      ) {
        res[i] = []
        for (
          let j = 0;
          j < ticketInfo.filter.airports_transfer[i].length;
          j++
        ) {
          const countryMap: {
            [country: string]: string[]
          } = {}
          for (
            let k = 0;
            k < ticketInfo.filter.airports_transfer[i][j].length;
            k++
          ) {
            const country =
              ticketInfo.airports[
                ticketInfo.filter.airports_transfer[i][j][k]
              ]?.country
            const city = ticketInfo.filter.airports_transfer[i][j][k]
            if (countryMap[country]) {
              countryMap[country].push(city)
            } else {
              countryMap[country] = [city]
            }
          }
          res[i][j] = Object.keys(countryMap).map(
            key => countryMap[key]
          )
        }
      }
    }
    return res
  }

  const updateFilter = debounce((filter: Form) => {
    let query = ''
    if (filter.transplants) {
      query += filter.transplants
        .map(t => `transplant=${t}&`)
        .join('')
    }

    if (filter.time_departure) {
      query += filter.time_departure
        .map((t, index) =>
          t.min !== ticketInfo?.filter.time_departure[index].min ||
            t.max !== ticketInfo?.filter.time_departure[index].max
            ? `time_departure=${index}:${t.min}~${t.max}&`
            : ''
        )
        .join('')
    }

    if (filter.time_arrival) {
      query += filter.time_arrival
        .map((t, index) =>
          t.min !== ticketInfo?.filter.time_arrival[index].min ||
            t.max !== ticketInfo?.filter.time_arrival[index].max
            ? `time_arrival=${index}:${t.min}~${t.max}&`
            : ''
        )
        .join('')
    }

    if (filter.time_way) {
      query += filter.time_way
        .map((t, index) =>
          t.min !== ticketInfo?.filter.time_way[index].min ||
            t.max !== ticketInfo?.filter.time_way[index].max
            ? `time_way=${index}:${t.min}~${t.max}&`
            : ''
        )
        .join('')
    }

    if (filter.time_transfer) {
      query += filter.time_transfer
        .map((t, index) =>
          t.min !== ticketInfo?.filter.time_transfer[index].min ||
            t.max !== ticketInfo?.filter.time_transfer[index].max
            ? `time_transfer=${index}:${t.min}~${t.max}&`
            : ''
        )
        .join('')
    }

    if (
      filter.baggage &&
      filter.baggage.length !== ticketInfo?.filter.baggage.length
    ) {
      query += filter.baggage.map(b => `baggage=${b}&`).join('')
    }

    if (filter.airports_departure) {
      query += filter.airports_departure
        .map((airpArr, index) =>
          ticketInfo?.filter.airports_departure[index].length !==
            airpArr.length
            ? airpArr
              .map(a => `airports_departure=${index}:${a}&`)
              .join('')
            : ''
        )
        .join('')
    }

    if (filter.airports_arrival) {
      query += filter.airports_arrival
        .map((airpArr, index) =>
          ticketInfo?.filter.airports_arrival[index].length !==
            airpArr.length
            ? airpArr
              .map(a => `airports_arrival=${index}:${a}&`)
              .join('')
            : ''
        )
        .join('')
    }

    if (filter.airports_transfer) {
      query += filter.airports_transfer
        .map((arrOfArr, arrIndex) =>
          arrOfArr
            .map((arrOfAirpArr, airpArrIndex) =>
              ticketInfo?.filter.airports_transfer[arrIndex][
                airpArrIndex
              ].length !== arrOfAirpArr.flat().length
                ? arrOfAirpArr
                  .map(a =>
                    a.length > 0
                      ? `airports_transfer=${arrIndex}:${airpArrIndex}:${a}&`
                      : ''
                  )
                  .join('')
                : ''
            )
            .join('')
        )
        .join('')
    }

    if (
      filter.airlines &&
      filter.airlines.length !== ticketInfo?.filter.airlines.length
    ) {
      query += filter.airlines.map(a => `airline=${a}&`).join('')
    }

    if (
      filter.seller &&
      filter.seller.length !== ticketInfo?.filter.seller.length
    ) {
      query += filter.seller.map(s => `seller=${s}&`).join('')
    }

    if (filter.sort) {
      query += `sort_tickets=${filter.sort}`
    }

    dispatch(filterTickets(query))
    setIsSubmitOpen(true)
  }, 500)

  useEffect(() => {
    const subscription = watch(value => updateFilter(value as Form))
    return () => subscription.unsubscribe()
  }, [watch])

  return {
    reset,
    control,
    ticketInfo,
    isFilterOpen,
    isSubmitOpen,
    setIsFilterOpen,
    setIsSubmitOpen,
    closeModal,
    getDestination,
    getDirection,
    getOrigin,
    getTransplantsCount,
    formatTransferAirports
  }
}
