import { useTranslation } from 'next-i18next'
import { FC, MouseEventHandler, useState } from 'react'
import cn from 'classnames'

import { getDayByNumber } from 'shared/helpers/date/getDayByNumber'
import { getMonthByNumber } from 'shared/helpers/date/getMonthByNumber'

import { countPassengers } from 'shared/helpers/route/countPassengers'
import { getCategory } from 'shared/helpers/route/getCategory'
import { getPassengersVariant } from 'shared/helpers/route/getPassengersVariant'

import { RouteDetail } from 'shared/types/user'

import ArrowLeft from '/public/assets/images/ArrowLeft.svg'
import ArrowBoth from '/public/assets/images/arrow-both.svg'
import SidemenuCross from '/public/assets/images/icons/SidemenuCross.svg'
import EditProfileIcon from '/public/assets/images/icons/profilePage/EditProfileIcon.svg'

import { tablet } from 'shared/constants/breakpoints'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import s from './routeItem.module.scss'

interface RouteItemProps {
  route_detail: RouteDetail
  id?: number
  onDelete?: (id: number) => void
  isEdit?: boolean
  onEdit?: () => void
  isRoundTripSelected?: boolean
  additional?: number
  hasEditOnClick?: boolean
}

const RouteItem: FC<RouteItemProps> = ({
  id = 0,
  route_detail,
  onDelete,
  isEdit = false,
  onEdit,
  isRoundTripSelected = false,
  additional,
  hasEditOnClick = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { t } = useTranslation(['route', 'common'])
  const numberOfPassengers = countPassengers(route_detail.passengers)
  const wordVariant = t(
    `common:route.${getPassengersVariant(numberOfPassengers)}`
  )

  const parseDate = (receivedDate: string): string => {
    const routeDate = new Date(receivedDate)
    const month = routeDate.getMonth()
    const date = routeDate.getDate()
    const day = routeDate.getDay()
    const monthByNumber = t(`common:${getMonthByNumber(month)}`)
    const dayByNumber = t(`common:${getDayByNumber(day)}`)
    return `${date} ${monthByNumber}, ${dayByNumber}`
  }
  const handleRouteClick = () => {
    if (hasEditOnClick) {
      onEdit?.()
    }
  }
  return (
    <div
      className={cn(s.container, { [s.clickable]: hasEditOnClick })}
      onClick={handleRouteClick}
    >
      <div className={s.content}>
        <div className={s.row}>
          <RouteInfo
            origin={route_detail.directions[0].origin}
            destination={route_detail.directions[0].destination}
            isRoundTripSelected={isRoundTripSelected}
            date={parseDate(route_detail.directions[0].date)}
            returnDate={parseDate(route_detail.directions[1]?.date)}
            tripClass={t(
              `common:route.${getCategory(route_detail.trip_class)}`
            )}
            additional={additional}
            numberOfPassengers={numberOfPassengers}
            wordVariant={wordVariant}
            isShowParamsOpen={!isOpen}
            onClick={() => setIsOpen(prevState => !prevState)}
          />

          {isEdit ? (
            <EditProfileIcon
              className={s.cross}
              onClick={() => !hasEditOnClick && onEdit?.()}
            />
          ) : (
            <div className={s.cross}>
              <SidemenuCross onClick={() => onDelete?.(id)} />
            </div>
          )}
        </div>
        {isOpen && (
          <>
            {route_detail.directions.slice(1).map((dir, index) => (
              <div className={s.row} key={index}>
                <RouteInfo
                  origin={dir.origin}
                  destination={dir.destination}
                  isRoundTripSelected={isRoundTripSelected}
                  date={parseDate(dir.date)}
                  tripClass={t(
                    `common:route.${getCategory(
                      route_detail.trip_class
                    )}`
                  )}
                  numberOfPassengers={numberOfPassengers}
                  wordVariant={wordVariant}
                  isShowParamsOpen={!isOpen}
                  onClick={() => setIsOpen(prevState => !prevState)}
                />
              </div>
            ))}
            <span className={s.params}>
              {numberOfPassengers} {wordVariant} /{' '}
              {t(
                `common:route.${getCategory(route_detail.trip_class)}`
              )}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default RouteItem

interface RouteInfoProps {
  origin: string
  destination: string
  isRoundTripSelected: boolean
  date: string
  returnDate?: string
  tripClass: string
  additional?: number
  numberOfPassengers: number
  wordVariant: string
  isShowParamsOpen: boolean
  onClick?: () => void
}

const RouteInfo: FC<RouteInfoProps> = ({
  origin,
  destination,
  isRoundTripSelected,
  date,
  returnDate,
  tripClass,
  additional,
  numberOfPassengers,
  wordVariant,
  isShowParamsOpen,
  onClick,
}) => {
  const { width } = useWindowDimensions()
  const handleAdditionalClick: MouseEventHandler<
    HTMLDivElement
  > = e => {
    e.stopPropagation()
    onClick?.()
  }
  return (
    <div className={s.routeInfo}>
      <div className={s.route}>
        <span>{origin}</span>
        {isRoundTripSelected ? (
          <ArrowBoth className={s.arrow} />
        ) : (
          <ArrowLeft className={s.arrow} />
        )}
        <span>{destination}</span>
        {!!additional && width <= tablet && (
          <span
            className={s.additional}
            onClick={handleAdditionalClick}
          >
            +{additional}
          </span>
        )}
      </div>
      <div className={s.info}>
        <span className={s.date}>
          {isRoundTripSelected ? date + ' - ' + returnDate : date}
        </span>
        {isShowParamsOpen && (
          <span className={s.params}>
            {numberOfPassengers} {wordVariant} / {tripClass}
          </span>
        )}
      </div>
      {!!additional && width > tablet && (
        <span
          className={s.additional}
          onClick={handleAdditionalClick}
        >
          +{additional}
        </span>
      )}
    </div>
  )
}
