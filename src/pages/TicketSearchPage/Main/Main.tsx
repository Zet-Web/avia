import { FC } from 'react'

import { NoTicketsSection } from 'features'
import { AviaTickets } from './AviaTickets/AviaTickets'

import { Transfer } from 'shared/types'
import { Ticket } from 'shared/types/ticket'

import s from './main.module.scss'

export interface SearchTicketMainProps {
  activeTab: number
  aviaTickets: Ticket[] | null
  trainTickets: Ticket[] | null
  busTickets: Ticket[] | null
  onMoreTickets: (activeTab: number) => void
  isFilterInvalid?: boolean
}

export const Main: FC<SearchTicketMainProps> = ({
  aviaTickets,
  activeTab,
  trainTickets,
  busTickets,
  onMoreTickets,
  isFilterInvalid,
}) => {
  const tabsViewer = () => {
    switch (activeTab) {
      case Transfer.AVIA:
        return (
          <AviaTickets
            aviaTickets={aviaTickets}
            activeTab={activeTab}
            onMoreTickets={onMoreTickets}
          />
        )
      case Transfer.TRAIN:
        return <div />
      case Transfer.BUS:
        return <div />
      default:
        return null
    }
  }

  return aviaTickets || trainTickets || busTickets ? (
    <div className={s.main}>{tabsViewer()}</div>
  ) : (
    <NoTicketsSection
      variant={isFilterInvalid ? 'invalidFilter' : 'noTicket'}
    />
  )
}
