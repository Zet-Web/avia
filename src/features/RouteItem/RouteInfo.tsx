import { FC, MouseEventHandler } from 'react'
import { useWindowDimensions } from '../../shared/hooks/useWindowDimension'
import s from './routeItem.module.scss'
import ArrowLeft from '/public/assets/images/ArrowLeft.svg'
import ArrowBoth from '/public/assets/images/arrow-both.svg'
import { tablet } from '../../shared/constants/breakpoints'

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

export default RouteInfo
