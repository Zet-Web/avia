import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import { FC, useEffect, useRef, useState } from 'react'

import { DropdownMenuCity, Input } from 'components'

import { getGeoValidator } from 'shared/api/routes/geo'
import { searchCity } from 'shared/helpers/searchCity'
import { useClickOutside } from 'shared/hooks/useClickOutside'
import { useDebounce } from 'shared/hooks/useDebounce'

import {
  AIRPORT_DETAILS,
  AIRPORT_SEARCH_DEBOUNCE,
  MAX_AIRPORT_LIMIT,
} from 'shared/constants'
import { City } from 'shared/types/cities'
import { TicketState } from 'shared/types/geo'

import s from './directionInput.module.scss'

export type DirectionValue = Pick<
  TicketState,
  'origin' | 'destination'
>

interface DirectionInputProps {
  defaultValue: DirectionValue
  onChange: (value: DirectionValue) => void
  isError?: boolean
  isButtonSwapped?: boolean
  onClick?: () => void
  onFocus?: () => void
  className?: string
}

const DirectionInput: FC<DirectionInputProps> = ({
  onChange,
  defaultValue,
  isError,
  onClick,
  onFocus,
  isButtonSwapped = true,
  className,
}) => {
  const { t } = useTranslation(['common'])
  const [isOpenFrom, setIsOpenFrom] = useState<boolean>(false)
  const [isOpenTo, setIsOpenTo] = useState<boolean>(false)
  const [iatas, setIatas] = useState<DirectionValue>({
    origin: defaultValue.origin,
    destination: null,
  })
  const [from, setFrom] = useState<string>(
    defaultValue.origin?.title || ''
  )
  const [to, setTo] = useState<string>(
    defaultValue.destination?.title || ''
  )

  const [fromOptions, setFromOptions] = useState<City[]>()
  const [toOptions, setToOptions] = useState<City[]>()

  const params = {
    limit: MAX_AIRPORT_LIMIT,
    details: AIRPORT_DETAILS,
    language: 'RU',
  }

  const swapValues = () => {
    onClick ? onClick() : null
    setIatas(prevState => ({
      ...prevState,
      origin: iatas.destination,
      destination: iatas.origin,
    }))
    setFrom(to)
    setTo(from)
  }

  const debouncedSearchFrom = useDebounce(
    from,
    AIRPORT_SEARCH_DEBOUNCE
  )
  const debouncedSearchTo = useDebounce(to, AIRPORT_SEARCH_DEBOUNCE)

  const getAirport = async (
    city: string,
    result: (value: City[]) => void
  ) => {
    const airportCity = await getGeoValidator(city, {
      ...params,
    })
    result(airportCity.data)
  }

  useEffect(() => {
    setIatas(prevState => ({
      ...prevState,
      origin: searchCity(fromOptions, debouncedSearchFrom),
      destination: searchCity(toOptions, debouncedSearchTo),
    }))
  }, [fromOptions, toOptions])

  useEffect(() => {
    setIatas(prevState => ({
      ...prevState,
      origin: null,
    }))
    debouncedSearchFrom &&
      getAirport(debouncedSearchFrom, setFromOptions)
  }, [debouncedSearchFrom])

  useEffect(() => {
    setIatas(prevState => ({
      ...prevState,
      destination: null,
    }))
    debouncedSearchTo && getAirport(debouncedSearchTo, setToOptions)
  }, [debouncedSearchTo])

  useEffect(() => {
    onChange(iatas)
    iatas.origin ? setFrom(iatas.origin?.title) : ''
    iatas.destination ? setTo(iatas.destination?.title) : ''
  }, [iatas])

  useEffect(() => {
    setFrom(prevState =>
      defaultValue.origin ? defaultValue.origin.title : prevState
    )
    setTo(prevState =>
      defaultValue.destination
        ? defaultValue.destination.title
        : prevState
    )
  }, [defaultValue])

  const handleCloseDropDown = () => {
    setIsOpenFrom(false)
    setIsOpenTo(false)
  }

  const overlayRef = useRef<HTMLDivElement>(null)

  useClickOutside(overlayRef, handleCloseDropDown)

  return (
    <div className={cn(s.directionInputWrapper, className)}>
      <div className={cn(s.inputWrapper, s.inputWrapperFrom)}>
        <Input
          onClick={() => {
            onFocus?.()
            setIsOpenFrom(true)
          }}
          className={s.directionInput}
          value={from}
          onChange={setFrom}
          placeholder={
            isError && !iatas.origin
              ? 'укажите город'
              : t('common:directionInput:from') ?? ''
          }
          placeholderClassName={cn(s.label, {
            [s.inputValue]: from,
            [s.errorOrigin]: isError && !iatas.origin,
          })}
        />
        {fromOptions?.length && isOpenFrom ? (
          <div className={s.dropDownCity} ref={overlayRef}>
            <DropdownMenuCity
              options={fromOptions}
              vehicle={'plane'}
              onChange={airport =>
                setIatas(fromOptions => ({
                  ...fromOptions,
                  origin: airport,
                }))
              }
              onClose={() => setIsOpenFrom(false)}
            />
            <div className={s.arrow} />
          </div>
        ) : null}
      </div>
      {isButtonSwapped ? (
        <button
          type='button'
          onClick={() => swapValues()}
          className={s.buttonChangeValue}
        />
      ) : null}

      <div
        className={cn(s.inputWrapper, {
          [s.inputWrapperTo]: isButtonSwapped,
        })}
      >
        <Input
          className={cn(s.directionInput, {
            [s.directionInputTo]: isButtonSwapped,
          })}
          value={to}
          onChange={setTo}
          onClick={() => {
            onFocus?.()
            setIsOpenTo(true)
          }}
          placeholder={
            isError && !iatas.destination
              ? 'укажите город'
              : t('common:directionInput:to') ?? ''
          }
          placeholderClassName={cn(s.label, {
            [s.inputValue]: to,
            [s.errorDestination]: isError && !iatas.destination,
          })}
        />
        {toOptions?.length && isOpenTo ? (
          <div className={s.dropDownCity} ref={overlayRef}>
            <DropdownMenuCity
              options={toOptions}
              vehicle={'plane'}
              onChange={aiport =>
                setIatas(toOptions => ({
                  ...toOptions,
                  destination: aiport,
                }))
              }
              onClose={() => setIsOpenTo(false)}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DirectionInput
