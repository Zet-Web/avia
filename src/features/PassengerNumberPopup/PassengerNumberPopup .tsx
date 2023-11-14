import { FC, useEffect, useMemo, useRef, useState } from 'react'

import { useTranslation } from 'next-i18next'

import { Checkbox, Counter } from 'components'

import { useClickOutside } from 'shared/hooks/useClickOutside'

import { passengerCount } from 'shared/constants/passengerCount'

import cn from 'classnames'
import s from './passengerNumberPopup.module.scss'
import { PassengerValue } from 'shared/types/passengerNumber'

interface PassengerNumberPopupProps {
  isOpen: boolean
  onClose: () => void
  value: PassengerValue
  onChange: (value: PassengerValue) => void
  className?: string
}

const PassengerNumberPopup: FC<PassengerNumberPopupProps> = ({
  onClose,
  isOpen,
  value,
  onChange,
  className,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation(['common'])

  useClickOutside(overlayRef, onClose)

  const totalPassenger = () => {
    const { adults, children, infants } = value

    const total = adults + children + infants

    if (total === passengerCount) {
      return total
    }
  }

  if (!isOpen) return null
  return (
    <div ref={overlayRef} className={cn(s.wrapper, className)}>
      <div className={s.row}>
        <div className={s.description}>
          <p className={s.title}>{t('common:words.adults')}</p>
          <p className={s.subtitle}>{t('common:words.to')} 12</p>
        </div>

        <Counter
          min={1}
          max={
            totalPassenger() === passengerCount
              ? value.adults
              : passengerCount
          }
          value={value.adults}
          onChange={newValue =>
            onChange({
              ...value,
              adults: newValue,
            })
          }
        />
      </div>

      <div className={s.row}>
        <div className={s.descr}>
          <p className={s.title}>{t('common:words.children')}</p>
          <p className={s.subtitle}>
            {t('common:words.to')} 2 {t('common:words.up to')} 12
          </p>
        </div>

        <Counter
          max={
            totalPassenger() === passengerCount
              ? value.children
              : passengerCount
          }
          value={value.children}
          onChange={newValue =>
            onChange({
              ...value,
              children: newValue,
            })
          }
        />
      </div>

      <div className={s.row}>
        <div className={s.descr}>
          <p className={s.title}>{t('common:words.babies')}</p>
          <p className={s.subtitle}>
            {t('common:words.up to')} 2 {t('common:words.years')}
          </p>
        </div>

        <Counter
          max={
            totalPassenger() === passengerCount
              ? value.infants
              : passengerCount
          }
          value={value.infants}
          onChange={newValue =>
            onChange({
              ...value,
              infants: newValue,
            })
          }
        />
      </div>
      <hr />

      <Checkbox
        className={s.tripClass}
        type='checkbox'
        isChecked={value.isEconomSelected}
        onChange={() =>
          onChange({
            ...value,
            isEconomSelected: true,
            isBusinessSelected: false,
          })
        }
        label={`${t('common:words.Economy')}`}
      />

      <Checkbox
        className={s.tripClass}
        type='checkbox'
        isChecked={value.isBusinessSelected}
        onChange={() =>
          onChange({
            ...value,
            isEconomSelected: false,
            isBusinessSelected: true,
          })
        }
        label={`${t('common:words.Business')}`}
      />
    </div>
  )
}

export default PassengerNumberPopup
