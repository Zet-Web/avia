import { useTranslation } from 'next-i18next'
import { FC, forwardRef, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import { Button, Input, Modal } from 'components'

import { locales } from 'shared/constants/locales'
import { Language } from 'shared/types'
import { SingleRouteDate } from 'shared/types/ticket'
import { smallTablet } from 'shared/constants/breakpoints'

import cn from 'classnames'

import s from '../../../searchTickets.module.scss'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { formatWithShortMonthAndWeekdayComma } from 'shared/helpers/date/formatWithShortMonthAndWeekdayComma'

interface DateRangeProps {
  value: SingleRouteDate
  onChange: (value: SingleRouteDate) => void
  locale: Language
  errors: [boolean, boolean]
  isRightCalendarOpened?: boolean
}

interface InputProps extends DateRangeProps {
  isLeftCalendarActive: boolean
  setIsLeftCalendarActive: (status: boolean) => void
  isRightCalendarActive: boolean
  setIsRightCalendarActive: (status: boolean) => void
  minDate: Date
  maxDate: Date
  placeholders: string[]
  placeholderClassNames: string[]
}

const DesktopInput: FC<InputProps> = ({
  value,
  onChange,
  locale,
  isLeftCalendarActive,
  setIsLeftCalendarActive,
  isRightCalendarActive,
  setIsRightCalendarActive,
  minDate,
  maxDate,
  placeholders,
  placeholderClassNames,
  isRightCalendarOpened,
}) => {
  const CustomInput = forwardRef((props: any, ref) => (
    <Input
      {...props}
      value={props.value.replace('.', '')}
      forwardRef={ref}
      hasSpellCheck='false'
    />
  ))

  CustomInput.displayName = 'DatePickerCustomInput'

  return (
    <div className={cn(s.dateInputGroup, s.picker)}>
      <DatePicker
        popperClassName={cn(s.popper, s.popperLeft, s.triangleCenter)}
        locale={locales[locale]}
        onChangeRaw={() => null}
        onChange={date => {
          onChange([date, value[1]])
          setIsLeftCalendarActive(false)
          if (isRightCalendarOpened) setIsRightCalendarActive(true)
        }}
        selectsStart
        selected={value[0]}
        startDate={value[0]}
        endDate={value[1]}
        monthsShown={2}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat={'dd MMM, EEEEEE'}
        open={isLeftCalendarActive}
        onClickOutside={() => setIsLeftCalendarActive(false)}
        onCalendarClose={() => setIsLeftCalendarActive(false)}
        onCalendarOpen={() => setIsLeftCalendarActive(true)}
        placeholderText={placeholders[0]}
        customInput={
          <CustomInput
            className={s.dateInput}
            placeholderClassName={placeholderClassNames[0]}
          />
        }
      />
      <DatePicker
        popperClassName={cn(
          s.popper,
          s.popperRight,
          s.triangleCenter
        )}
        locale={locales[locale]}
        onChangeRaw={() => null}
        onChange={date => {
          onChange([value[0], date])
          setIsRightCalendarActive(false)
        }}
        selectsEnd
        selected={value[1]}
        startDate={value[0]}
        endDate={value[1]}
        minDate={value[0]}
        maxDate={maxDate}
        monthsShown={2}
        dateFormat={'dd MMM, EEEEEE'}
        open={isRightCalendarActive}
        onClickOutside={() => setIsRightCalendarActive(false)}
        onCalendarClose={() => setIsRightCalendarActive(false)}
        onCalendarOpen={() => setIsRightCalendarActive(true)}
        placeholderText={placeholders[1]}
        customInput={
          <CustomInput
            className={s.dateInput}
            placeholderClassName={placeholderClassNames[1]}
          />
        }
      />
    </div>
  )
}

const MobileInput: FC<InputProps> = ({
  value,
  onChange,
  locale,
  isLeftCalendarActive,
  setIsLeftCalendarActive,
  isRightCalendarActive,
  setIsRightCalendarActive,
  minDate,
  maxDate,
  placeholders,
  placeholderClassNames,
}) => {
  const [isSaveButtonDisplayed, setIsSaveButtonDisplayed] =
    useState<boolean>(false)

  const closeCalendar = () => {
    setIsSaveButtonDisplayed(false)
    if (isRightCalendarActive) setIsRightCalendarActive(false)
    if (isLeftCalendarActive) setIsLeftCalendarActive(false)
  }

  const handleChange = (newValue: Date) => {
    if (isRightCalendarActive) onChange([value[0], newValue])

    if (isLeftCalendarActive) {
      onChange([newValue, value[1]])
      setIsLeftCalendarActive(false)
      setIsRightCalendarActive(true)
    }

    setIsSaveButtonDisplayed(true)
  }

  const renderInputs = () => (
    <div className={s.dateInputGroup}>
      <Input
        className={s.dateInput}
        placeholder={placeholders[0]}
        placeholderClassName={placeholderClassNames[0]}
        onClick={() => {
          setIsRightCalendarActive(false)
          setIsLeftCalendarActive(true)
        }}
        value={
          value[0]
            ? formatWithShortMonthAndWeekdayComma(
                value[0],
                locale
              ).replace('.', '')
            : ''
        }
        isReadOnly
      />
      <Input
        className={s.dateInput}
        placeholder={placeholders[1]}
        placeholderClassName={placeholderClassNames[1]}
        onClick={() => {
          setIsLeftCalendarActive(false)
          setIsRightCalendarActive(true)
        }}
        value={
          value[1]
            ? formatWithShortMonthAndWeekdayComma(
                value[1],
                locale
              ).replace('.', '')
            : ''
        }
        isReadOnly
      />
    </div>
  )

  return (
    <>
      {isSaveButtonDisplayed && (
        <Button
          className={s.saveDate}
          title='Применить'
          onClick={closeCalendar}
        />
      )}
      {renderInputs()}
      <Modal
        className={s.calendarOverlay}
        isCentered={false}
        onClose={closeCalendar}
        isClosedOnClickOutside={false}
        isOpen={isLeftCalendarActive || isRightCalendarActive}
      >
        <div className={s.picker}>
          {renderInputs()}
          <DatePicker
            locale={locales[locale]}
            onChange={handleChange}
            selected={isLeftCalendarActive ? value[0] : value[1]}
            selectsStart={isLeftCalendarActive}
            selectsEnd={isRightCalendarActive}
            startDate={value[0]}
            endDate={value[1]}
            monthsShown={12}
            minDate={minDate}
            maxDate={maxDate}
            openToDate={minDate}
            inline
          />
        </div>
      </Modal>
    </>
  )
}

const DateRange: FC<DateRangeProps> = ({
  value,
  onChange,
  locale,
  errors,
  isRightCalendarOpened,
}) => {
  const { t } = useTranslation(['common'])

  const [hasLeftCalendar, setHasLeftCalendar] =
    useState<boolean>(false)
  const [hasRightCalendar, setHasRightCalendar] =
    useState<boolean>(false)

  const { width } = useWindowDimensions()

  const minDate = new Date()
  const maxDate = new Date(
    new Date().setFullYear(minDate.getFullYear() + 1)
  )
  const placeholders = [
    errors[0]
      ? t('common:searchTickets.chooseDate')!
      : t('common:searchTickets.dateDispatch')!,
    t('common:searchTickets.back')!,
  ]

  const placeholderClassNames = [
    cn(s.placeholder, {
      [s.dateError]: errors[0],
    }),
    cn(s.placeholder, {
      [s.dateError]: errors[1],
    }),
  ]

  registerLocale(locale.toLowerCase(), locales[locale])

  return width >= smallTablet ? (
    <DesktopInput
      minDate={minDate}
      maxDate={maxDate}
      placeholders={placeholders}
      isLeftCalendarActive={hasLeftCalendar}
      setIsLeftCalendarActive={setHasLeftCalendar}
      isRightCalendarActive={hasRightCalendar}
      setIsRightCalendarActive={setHasRightCalendar}
      value={value}
      onChange={onChange}
      locale={locale}
      errors={errors}
      placeholderClassNames={placeholderClassNames}
      isRightCalendarOpened={isRightCalendarOpened}
    />
  ) : (
    <MobileInput
      minDate={minDate}
      maxDate={maxDate}
      placeholders={placeholders}
      isLeftCalendarActive={hasLeftCalendar}
      setIsLeftCalendarActive={setHasLeftCalendar}
      isRightCalendarActive={hasRightCalendar}
      setIsRightCalendarActive={setHasRightCalendar}
      value={value}
      onChange={onChange}
      locale={locale}
      errors={errors}
      placeholderClassNames={placeholderClassNames}
    />
  )
}

export default DateRange
