import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { convertMinsToHrsMins } from 'shared/helpers/date/convertMinsToHrsMins'

import s from './direction.module.scss'

interface DirectionProps {
  time_route: number
  title: string
}
export const Direction: FC<DirectionProps> = ({
  time_route,
  title,
}) => {
  const { t } = useTranslation(['common'])

  return (
    <div className={s.there}>
      <div className={s.title}>{title}</div>

      <div className={s.flightTimeline}>
        {convertMinsToHrsMins(time_route, {
          h: t('common:time.h'),
          m: t('common:time.m'),
        })}{' '}
        <span className={s.inAway}>{t('common:words.inWay')}</span>
      </div>
    </div>
  )
}
