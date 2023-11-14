import { Button, Checkbox } from 'components'
import DirectionInput, {
  DirectionValue,
} from 'components/DirectionInput/DirectionInput'
import RouteItem from 'features/RouteItem/RouteItem'
import { getRouteType } from 'shared/helpers/route/getRouteType'
import { mergeSingleForm } from 'features/SearchTickets/helpers/mergeForm'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectWeekdayPrices } from 'redux/slices/ticketSlice/ticketSlice'
import { laptop } from 'shared/constants/breakpoints'
import { DEFAULT_PASSENGER } from 'shared/constants/passengerCount'
import { formatApiDate } from 'shared/helpers/date/formatApiDate'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { AviaTicketClass } from 'shared/types'
import { Directions } from 'shared/types/geo'
import { PassengerValue } from 'shared/types/passengerNumber'
import {
  SingleRouteDate,
  SingleRouteDateString,
} from 'shared/types/ticket'
import { RouteDetail } from 'shared/types/user'
import PassengersInput from '../PassengersInput/PassengersInput'

import DateRange from './DateRange/DateRange'
import { singleInputRules } from 'features/SearchTickets/validation/rules'

import s from '../../searchTickets.module.scss'
import {
  selectCurrency,
  selectLanguage,
} from '../../../../redux/slices/settingsSlice/settingsSlice'

export interface SingleInputForm {
  direction: DirectionValue
  date: SingleRouteDate
  passengers: PassengerValue
}

interface SingleInputProps {
  onSubmit: (data: RouteDetail) => void
  defaultOrigin?: Directions | null
  isOpen: boolean
  toggleOpen?: () => void
  isRoundTripSelected?: boolean
  onDateChange?: (dates: SingleRouteDate) => void
}

const SingleInput: FC<SingleInputProps> = ({
  onSubmit,
  isOpen,
  defaultOrigin = null,
  toggleOpen,
  isRoundTripSelected = false,
  onDateChange,
}) => {
  const { width } = useWindowDimensions()
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false)

  const locale = useAppSelector(selectLanguage)
  const currency = useAppSelector(selectCurrency)
  const ticketQuery = useAppSelector(
    state => state.ticket.ticketInfo?.find
  )
  const router = useRouter()

  const { t } = useTranslation(['common'])

  const persistedFormRaw = localStorage.getItem('single_form')
  const persistedForm: SingleInputForm | null = persistedFormRaw
    ? JSON.parse(persistedFormRaw)
    : null

  const defaultValue: SingleInputForm = {
    direction: {
      origin: persistedForm?.direction.origin ?? defaultOrigin,
      destination: persistedForm?.direction.destination ?? null,
    },
    date: [
      persistedForm?.date[0]
        ? new Date(persistedForm?.date[0])
        : new Date(),
      persistedForm?.date[1]
        ? new Date(persistedForm?.date[1])
        : null,
    ],
    passengers: DEFAULT_PASSENGER,
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    getValues,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SingleInputForm>({
    defaultValues: defaultValue,
  })

  const formatData = (
    data: SingleInputForm,
    directionKey: 'title' | 'abbreviation' = 'abbreviation'
  ): RouteDetail => {
    const result: Partial<RouteDetail> = {}

    result.directions = [
      {
        origin:
          data.direction?.origin?.[directionKey] ??
          t('common:words.not-chosen'),
        destination:
          data.direction?.destination?.[directionKey] ??
          t('common:words.not-chosen'),
        date: data.date?.[0] ? formatApiDate(data.date?.[0]) : '',
      },
    ]

    if (data.date?.[1]) {
      result.directions.push({
        origin:
          data.direction?.destination?.[directionKey] ??
          t('common:words.not-chosen'),
        destination:
          data.direction?.origin?.[directionKey] ??
          t('common:words.not-chosen'),
        date: formatApiDate(data.date[1]),
      })
    }

    result.trip_class = data.passengers?.isBusinessSelected
      ? AviaTicketClass.BUSINESS
      : AviaTicketClass.ECONOMY

    result.passengers = {
      adults: data.passengers?.adults,
      children: data.passengers?.children,
      infants: data.passengers?.infants,
    }

    result.locale = locale
    result.currency = currency

    return result as RouteDetail
  }

  const handleFormSubmit: SubmitHandler<SingleInputForm> = data => {
    const result = formatData(data)
    onSubmit(result)
  }

  useEffect(() => {
    const currentValue = getValues()
    if (
      currentValue.direction &&
      !currentValue.direction.origin &&
      persistedForm &&
      !persistedForm.direction.origin
    ) {
      currentValue.direction.origin = defaultOrigin
      reset(currentValue)
    }

    if (!selectedDate)
      dispatch(
        selectWeekdayPrices(
          currentValue.date.map(v =>
            v ? formatApiDate(v) : v
          ) as SingleRouteDateString
        )
      )
  }, [defaultOrigin])
  const mergeForm = useCallback(async () => {
    if (ticketQuery && router.query.state) {
      const mergedForm = await mergeSingleForm(
        getValues(),
        ticketQuery,
        router.query.state as string,
        locale
      )

      reset(mergedForm)
    }
    const currentDate = getValues('date')

    if (currentDate) {
      dispatch(
        selectWeekdayPrices(
          currentDate.map(d =>
            d ? formatApiDate(d) : d
          ) as SingleRouteDateString
        )
      )
    }
  }, [ticketQuery, router.query.state])

  useEffect(() => {
    if (ticketQuery && getRouteType(ticketQuery) === 'simple')
      mergeForm()
  }, [ticketQuery])

  const dispatch = useAppDispatch()

  const selectedDate = useAppSelector(
    state => state.ticket.weekdayPrice
  )

  useEffect(() => {
    const currentDate = getValues('date')

    if (selectedDate) {
      const formattedDate = currentDate.map(d =>
        d ? formatApiDate(d) : d
      )
      const isDifference =
        formattedDate[0] !== selectedDate[0] ||
        formattedDate[1] !== selectedDate[1]
      if (isDifference) {
        setValue(
          'date',
          selectedDate.map(d =>
            d ? new Date(d) : d
          ) as SingleRouteDate
        )
        handleSubmit(handleFormSubmit)()
      }
    }
  }, [selectedDate])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'date') {
        dispatch(
          selectWeekdayPrices(
            value.date?.map(d =>
              d ? formatApiDate(d) : d
            ) as SingleRouteDateString
          )
        )
        onDateChange?.(value.date as SingleRouteDate)
      }
      localStorage.setItem('single_form', JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (!isRoundTripSelected) {
      const currentDate = getValues('date')
      setValue('date', [currentDate[0], null])
    }
  }, [isRoundTripSelected])

  const renderRoute = () => {
    const result = formatData(getValues(), 'title')

    return (
      <RouteItem
        route_detail={result}
        isEdit
        hasEditOnClick
        onEdit={() => toggleOpen?.()}
        isRoundTripSelected={
          result.directions.length === 2 &&
          result.directions[0].origin ===
            result.directions[1].destination
        }
      />
    )
  }

  if (!isOpen && width < laptop && router.pathname !== '/')
    return renderRoute()

  return (
    <>
      <form
        className={s.inputWrapper}
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete='off'
      >
        <Controller
          control={control}
          name='direction'
          rules={singleInputRules.directionInput}
          defaultValue={defaultValue.direction}
          render={({ field: { onChange, value } }) => (
            <DirectionInput
              className={s.directionInput}
              defaultValue={value}
              isError={Boolean(errors?.direction)}
              onFocus={() => clearErrors('direction')}
              onChange={onChange}
            />
          )}
        />
        <div className={s.additional}>
          <Controller
            control={control}
            name='date'
            defaultValue={defaultValue.date}
            rules={singleInputRules.date}
            render={({ field: { onChange, value } }) => (
              <DateRange
                value={value}
                onChange={onChange}
                locale={locale}
                errors={[!!errors?.date?.[0], !!errors?.date?.[1]]}
                isRightCalendarOpened={isRoundTripSelected}
              />
            )}
          />
          <PassengersInput
            control={control}
            defaultValue={defaultValue.passengers}
          />
        </div>
        <Button className={s.btn} title='Найти' type='submit' />
      </form>
      {router.pathname === '/' && (
        <Checkbox
          type='checkbox'
          className={s.checkbox}
          label='Открыть Booking.com'
          isChecked={isBookingOpen}
          onChange={setIsBookingOpen}
        />
      )}
    </>
  )
}

export default SingleInput
