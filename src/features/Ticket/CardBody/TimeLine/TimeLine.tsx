import { Tooltip } from 'components'
import { FC, Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import { convertMinsToHrsMins } from 'shared/helpers/date/convertMinsToHrsMins'

import { convertTimeToWith } from 'shared/helpers/convertTimeToWith'
import { convertTimeTransfers } from 'shared/helpers/convertTimeTransfers'

import { Route } from 'shared/types/ticket'

import s from './timeLine.module.scss'

interface TimeLineProps {
  route: Route
  time_route: number
}

const TimeLine: FC<TimeLineProps> = ({ route, time_route }) => {
  const { t } = useTranslation(['common'])
  return (
    <div className={s.flightTimeline}>
      <div className={s.routeDuration}>
        {convertMinsToHrsMins(route.time_way, {
          h: t('common:time.h'),
          m: t('common:time.m'),
        })}{' '}
        в пути
      </div>
      <div className={s.routes}>
        <div className={s.durationLine} />
        {route.flights.map((i, idx) => (
          <Fragment key={idx}>
            <div
              className={s.duration}
              style={{
                width: `${convertTimeToWith(
                  i.duration,
                  route.time_way
                )}%`,
              }}
            >
              <Tooltip
                className={s.tooltip}
                position='top-end'
                trigger='hover'
                title={
                  <>
                    Вылет из аэропорта {i.departure_airport_name}.{' '}
                    <br /> В пути:{' '}
                    {convertMinsToHrsMins(i.duration, {
                      m: 'м',
                      h: 'ч',
                    })}
                  </>
                }
              >
                <span>s</span>
              </Tooltip>
            </div>
            {route.transfers?.[idx] && (
              <div
                className={s.transfer}
                style={{
                  width: `${convertTimeTransfers(
                    route,
                    idx,
                    route.time_way
                  )}%`,
                }}
              >
                <Tooltip
                  className={s.tooltip}
                  position='top-end'
                  trigger='hover'
                  title={`Пересадка ${convertMinsToHrsMins(
                    route.transfers[idx].duration_seconds / 60,
                    {
                      m: 'м',
                      h: 'ч',
                    }
                  )} в ${route.transfers[idx].city_name}.`}
                >
                  <span>s</span>
                </Tooltip>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default TimeLine
