import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { convertMinsToHrsMins } from 'shared/helpers/date/convertMinsToHrsMins'

import type { Transfer as TransferType } from 'shared/types/ticket'
import TransferIcon from '/public/assets/images/transfer.svg'

import s from './transfer.module.scss'

export const Transfer: FC<TransferType> = ({
  to,
  at,
  city_name,
  iata_city,
  duration_seconds,
}) => {
  const { t } = useTranslation(['common'])

  return (
    <div className={s.transfer}>
      <div className={s.title}>
        <TransferIcon /> Пересадка в {city_name}{' '}
        <span>({iata_city})</span>
      </div>

      <div className={s.flightTimeline}>
        {convertMinsToHrsMins(duration_seconds / 60, {
          h: t('common:time.h'),
          m: t('common:time.m'),
        })}
      </div>
    </div>
  )
}
