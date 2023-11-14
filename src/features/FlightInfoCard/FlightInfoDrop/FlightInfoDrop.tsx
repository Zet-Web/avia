import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { FlightDetail, TripClass } from 'shared/types/ticket'

import s from './flightInfoDrop.module.scss'

interface FlightIfoProps {
  flightInfoDetail: FlightDetail | null
}

export const FlightInfoDrop: FC<FlightIfoProps> = ({
  flightInfoDetail,
}) => {
  const { t } = useTranslation('common')

  return (
    <div className={s.flightInfo}>
      <div className={s.flightInfoAircraft}>
        <div className={s.info}>
          {t('common:ticket.aircraft')}:
          <span> {flightInfoDetail?.airline_name}</span>
        </div>

        <div className={s.info}>
          {t('common:ticket.transport')}:
          <span> {flightInfoDetail?.aircraft}</span>
        </div>

        <div className={s.info}>
          {t('common:ticket.tripClass')}:
          <span>
            {' '}
            {flightInfoDetail?.trip_class === 'Y'
              ? t(TripClass.Y)
              : t(TripClass.C)}
          </span>
        </div>
      </div>

      <div className={s.flightInfoContent}>
        {flightInfoDetail?.data.map((item, index) => (
          <div className={s.info} key={index}>
            {item.label}: <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
