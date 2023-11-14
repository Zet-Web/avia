import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { BestSellers } from './BestSellers/BestSellers'
import { Direction } from './Direction/Direction'
import { Transfer } from './Transfer/Transfer'
import { FlightInfoCard } from 'features'

import { Route, SellerView } from 'shared/types/ticket'

import s from './ticketDetails.module.scss'

interface TicketDetailsProps {
  seller: SellerView
  routes: Route[]
  sellers_count: number
  ticket_id: string
  hasBaggage: boolean
}

export const TicketDetails: FC<TicketDetailsProps> = ({
  seller,
  routes,
  sellers_count,
  ticket_id,
  hasBaggage,
}) => {
  const { t } = useTranslation(['common'])
  const isRoundtrip =
    routes?.length === 2 &&
    routes[0].departure_airport_iata ===
      routes[1].arrival_airport_iata

  const getDirection = (index: number) => {
    if (isRoundtrip) {
      if (index === 1) return 'Обратно'
    } else if (routes.length > 1) {
      return `Рейс ${index + 1}`
    }

    return 'Туда'
  }

  return (
    <div className={s.ticketDetail}>
      <BestSellers
        seller={seller}
        sellers_count={sellers_count}
        ticket_id={ticket_id}
        hasBaggage={hasBaggage}
      />

      <div>
        {routes?.map((route, index) => (
          <div key={index}>
            <Direction
              title={getDirection(index)}
              time_route={route.time_way}
            />
            {route.flights.map((flight, index) => (
              <div className={s.flight_transfer} key={index}>
                <FlightInfoCard
                  flightInfo={flight}
                  baggage={seller.price.baggage[0][index]}
                  handbags={seller.price.handbags[0][index]}
                />

                {route.transfers[index] ? (
                  <Transfer {...route.transfers[index]} />
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
