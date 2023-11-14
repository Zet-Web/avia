import { Button, DirectionInput, Input, Modal } from 'components'
import PassengersInput from '../PassengersInput/PassengersInput'
import { laptop, smallTablet } from 'shared/constants/breakpoints'

import { formatApiDate } from 'shared/helpers/date/formatApiDate'
import { formatWithFullMonthAndWeekdayCapitalize } from 'shared/helpers/date/formatWithFullMonthAndWeekdayCapitalize'
import { formatWithFullMonthAndWeekdayComma } from 'shared/helpers/date/formatWithFullMonthAndWeekdayComma'

import { Controller, useFieldArray, useForm } from 'react-hook-form'
import RouteItem from 'features/RouteItem/RouteItem'
import { RouteDetail } from 'shared/types/user'
import { AviaTicketClass } from 'shared/types'
import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { getRouteType } from 'shared/helpers/route/getRouteType'
import { mergeDifficultForm } from 'features/SearchTickets/helpers/mergeForm'
import useFormPersist from 'react-hook-form-persist'
import { DEFAULT_PASSENGER } from 'shared/constants/passengerCount'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useAppSelector } from 'redux/hooks'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { Directions } from 'shared/types/geo'
import { PassengerValue } from 'shared/types/passengerNumber'
import { DirectionValue } from 'components/DirectionInput/DirectionInput'

import DatePicker, { registerLocale } from 'react-datepicker'

import cn from 'classnames'

import RemoveIcon from '/public/assets/images/icons/remove.svg'

import s from '../../searchTickets.module.scss'
import { locales } from 'shared/constants/locales'
import { inputArrayRules } from 'features/SearchTickets/validation/rules'
import {
  selectLanguage,
  selectSettings,
} from '../../../../redux/slices/settingsSlice/settingsSlice'

export interface Route {
  direction: DirectionValue
  date: string
}

export interface InputArrayForm {
  directions: Route[]
  passengers: PassengerValue
}

interface InputArrayProps {
  onSubmit: (data: RouteDetail) => void
  defaultOrigin?: Directions | null
  isOpen: boolean
  toggleOpen?: () => void
}

const InputArray: FC<InputArrayProps> = ({
  onSubmit,
  toggleOpen,
  isOpen,
  defaultOrigin = null,
}) => {
  const DateInput = forwardRef((props: any, ref) => {
    return (
      <Input
        {...props}
        value={
          props.date
            ? formatWithFullMonthAndWeekdayComma(props.date, locale)
            : formatWithFullMonthAndWeekdayComma(new Date(), locale)
        }
        className={cn(s.input, s.inputDate)}
        isReadOnly
      />
    )
  })

  DateInput.displayName = 'DateInput'

  const persistedFormRaw = localStorage.getItem('array_form')
  const persistedForm: InputArrayForm | null = persistedFormRaw
    ? JSON.parse(persistedFormRaw)
    : null

  const directionsDefault: Route = {
    direction: {
      origin: defaultOrigin,
      destination: null,
    },
    date: formatApiDate(new Date()),
  }

  const formatDateValue = (value: Date, locale: string) =>
    formatWithFullMonthAndWeekdayCapitalize(value, locale)

  const settings = useAppSelector(selectSettings)
  const { width } = useWindowDimensions()
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

  const locale = useAppSelector(selectLanguage)
  const ticketQuery = useAppSelector(
    state => state.ticket.ticketInfo?.find
  )
  const searchCode = useAppSelector(
    state => state.ticket.state.searchCode
  )

  const router = useRouter()

  const { t } = useTranslation(['common'])

  const defaultValue: InputArrayForm = persistedForm ?? {
    directions: [directionsDefault],
    passengers: DEFAULT_PASSENGER,
  }

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<InputArrayForm>({
    defaultValues: defaultValue,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'directions',
  })

  useFormPersist('array_form', {
    watch,
    setValue,
    storage: window ? localStorage : undefined,
  })

  const addField = () => {
    const fields = getValues('directions')
    if (fields.length === 7) return
    const defaultOrigin =
      fields[fields.length - 1].direction.destination
    const defaultDate = fields[fields.length - 1].date ?? new Date()
    const def = {
      direction: {
        origin: defaultOrigin,
        destination: null,
      },
      date: defaultDate,
    }
    append(def)
  }

  const mergeForm = useCallback(async () => {
    const form = getValues()
    if (ticketQuery && router.query.state) {
      const mergedForm = await mergeDifficultForm(
        form,
        ticketQuery,
        router.query.state as string,
        locale
      )

      reset(mergedForm)
    }
  }, [ticketQuery, router.query.state])

  useEffect(() => {
    if (ticketQuery && getRouteType(ticketQuery) === 'difficult')
      mergeForm()
  }, [ticketQuery, router.query.state])

  useEffect(() => {
    const currentValue = getValues()

    if (
      currentValue.directions[0].direction &&
      !currentValue.directions[0].direction.origin
    ) {
      currentValue.directions[0].direction.origin = defaultOrigin
      reset(currentValue)
    }
  }, [defaultOrigin])

  const minDate = new Date()
  const maxDate = new Date(
    new Date().setFullYear(minDate.getFullYear() + 1)
  )

  const formatData = (
    data: InputArrayForm,
    directionKey: 'abbreviation' | 'title' = 'abbreviation'
  ): RouteDetail => {
    return {
      directions: data.directions.map(d => ({
        origin:
          d.direction.origin?.[directionKey] ??
          t('common:words.not-chosen'),
        destination:
          d.direction.destination?.[directionKey] ??
          t('common:words.not-chosen'),
        date: d.date,
      })),
      trip_class: data.passengers?.isBusinessSelected
        ? AviaTicketClass.BUSINESS
        : AviaTicketClass.ECONOMY,
      passengers: {
        adults: data.passengers?.adults,
        children: data.passengers?.children,
        infants: data.passengers?.infants,
      },
      locale: settings.language,
      currency: settings.currency,
    }
  }

  const handleFormSubmit = (data: InputArrayForm) => {
    const formatedData: RouteDetail = formatData(data)
    onSubmit(formatedData)
  }

  const renderRoute = () => {
    const data = formatData(getValues(), 'title')
    return (
      <RouteItem
        route_detail={data}
        isEdit
        hasEditOnClick
        onEdit={() => toggleOpen?.()}
        additional={data.directions.length - 1}
      />
    )
  }
  if (!isOpen && width < laptop && router.pathname !== '/')
    return renderRoute()

  registerLocale(locale.toLowerCase(), locales[locale])

  return (
    <>
      <form
        className={s.difficultInputWrapper}
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete='off'
      >
        <div className={s.inputArray}>
          {fields.map((d, i) => (
            <Controller
              key={d.id}
              rules={inputArrayRules.directionInput}
              name={`directions.${i}`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className={s.difficultInput}>
                  <div className={s.difficultInputWrap}>
                    <DirectionInput
                      className={s.directionInput}
                      isButtonSwapped={false}
                      defaultValue={value.direction}
                      isError={Boolean(errors?.directions?.[i])}
                      onFocus={() => clearErrors(`directions.${i}`)}
                      onChange={v =>
                        onChange({ ...value, direction: v })
                      }
                    />
                    {width >= smallTablet ? (
                      <div className={s.picker}>
                        <DatePicker
                          popperClassName={s.difficultInputPopper}
                          locale={locale.toLocaleLowerCase()}
                          onChange={v =>
                            onChange({
                              ...value,
                              date: formatApiDate(v as Date),
                            })
                          }
                          onChangeRaw={() => null}
                          selected={new Date(Date.parse(value.date))}
                          monthsShown={2}
                          minDate={minDate}
                          maxDate={maxDate}
                          dateFormat={'dd MMM, EEEEEE'}
                          customInput={
                            <DateInput date={value.date} />
                          }
                          placeholderText={
                            t('common:searchTickets.dateDispatch') ??
                            'дата отправления'
                          }
                        />
                      </div>
                    ) : (
                      <>
                        <DateInput
                          date={value.date}
                          onClick={() => setIsCalendarOpen(true)}
                          placeholder={t(
                            'common:searchTickets.dateDispatch'
                          )}
                        />
                        <Modal
                          className={s.calendarOverlay}
                          isOpen={isCalendarOpen}
                          onClose={() => setIsCalendarOpen(false)}
                          isCentered={false}
                        >
                          <div className={s.picker}>
                            <DateInput
                              value={formatDateValue(
                                new Date(value.date),
                                locale
                              )}
                              placeholder={t(
                                'common:searchTickets.dateDispatch'
                              )}
                            />
                            <DatePicker
                              locale={locale.toLocaleLowerCase()}
                              onChange={v => {
                                onChange({ ...value, date: v })
                                setIsCalendarOpen(false)
                              }}
                              selectsStart
                              selected={new Date(value.date)}
                              monthsShown={12}
                              inline
                              minDate={minDate}
                              maxDate={maxDate}
                            />
                          </div>
                        </Modal>
                      </>
                    )}
                  </div>
                  {i > 1 && (
                    <button
                      className={s.removeBtn}
                      onClick={() => remove(i)}
                    >
                      <RemoveIcon className={s.removeIcon} />
                    </button>
                  )}
                </div>
              )}
            />
          ))}
        </div>
        <div className={s.difficultInputSubmit}>
          <PassengersInput
            control={control}
            defaultValue={defaultValue.passengers}
          />
          <Button
            className={cn(s.btn, s.addField)}
            type='button'
            title='+ Добавить маршрут'
            onClick={addField}
          />
          <Button
            className={cn(s.btn, s.btnSearhTickets)}
            title='Найти'
            type='submit'
          />
        </div>
      </form>
    </>
  )
}

export default InputArray
