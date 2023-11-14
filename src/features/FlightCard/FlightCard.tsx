import { FC } from 'react'

import cn from 'classnames'

import ArrowLeft from '/public/assets/images/ArrowLeft.svg'

import { getCurrency } from 'shared/helpers/currency/getCurrency'
import { Currency } from 'shared/types'

import s from './flightcard.module.scss'

interface FlightCardProps {
  route: {
    from: string
    to: string
  }
  destination: string
  price: number
  currency: Currency
  image?: string
  size?: 'small' | 'normal'
}

const FlightCard: FC<FlightCardProps> = ({
  route,
  destination,
  price,
  currency,
  image = '',
  size = 'small',
}) => {
  return (
    <div
      className={cn(s.wrapper, {
        [s.wrapperSmall]: size === 'small',
      })}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        className={cn(s.route, {
          [s.routeSmall]: size === 'small',
        })}
      >
        {route?.from}
        <ArrowLeft className={s.arrow} />
        {route?.to}
      </div>

      <div
        className={cn(s.destination, {
          [s.destinationSmall]: size === 'small',
        })}
      >
        {destination}
      </div>

      <div
        className={cn(s.price, { [s.priceSmall]: size === 'small' })}
      >
        от {price?.toLocaleString()} {getCurrency(currency)}
      </div>
    </div>
  )
}

export default FlightCard
