import { FC } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import TimeLine from './TimeLine/TimeLine'

import { getLocalHoursAndMinutes } from 'shared/helpers/date/getLocalHoursAndMinutes'
import { formatWithShortMonthAndWeekday } from 'shared/helpers/date/formatWithShortMonthAndWeekday'

import { Route } from 'shared/types/ticket'

import cn from 'classnames'

import s from './cardBody.module.scss'

interface CardBodyProps {
  routes: Route[]
  time_route: number
}

export const CardBody: FC<CardBodyProps> = ({
  routes,
  time_route,
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation(['common'])

  return (
    <div className={s.body}>
      {routes?.map((route, index) => (
        <div className={s.routes} key={index}>
          <div className={s.flight}>
            <div className={s.flightStart}>
              <div className={s.flightDate}>
                {routes.length ? (
                  <>
                    {formatWithShortMonthAndWeekday(
                      route.local_departure_iso,
                      locale as string
                    )}
                  </>
                ) : null}
              </div>

              <div className={s.flightTime}>
                {getLocalHoursAndMinutes(
                  route.local_departure_iso,
                  locale as string
                )}
              </div>
            </div>

            <TimeLine route={route} time_route={time_route} />

            <div className={s.flightEnd}>
              <div className={s.flightDate}>
                {routes.length ? (
                  <>
                    {' '}
                    {formatWithShortMonthAndWeekday(
                      route.local_arrival_iso,
                      locale as string
                    )}
                  </>
                ) : null}
              </div>

              <div className={s.flightTime}>
                {routes.length ? (
                  <>
                    {getLocalHoursAndMinutes(
                      route.local_arrival_iso,
                      locale as string
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className={s.places}>
            <div className={cn(s.flightPlace, s.flightPlaceStart)}>
              {route.departure_city}, {route.departure_airport_name}
            </div>

            <div className={cn(s.flightPlace, s.flightPlaceEnd)}>
              {route.arrival_city}, {route.arrival_airport_name}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
