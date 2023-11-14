import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { Button } from 'components'
import { Ticket } from 'features'

import { useAppSelector } from 'redux/hooks'
import { checkPaginationButton } from 'shared/helpers/checkPaginationButton'

import type { Ticket as TicketType } from 'shared/types/ticket'

import s from './aviaTicket.module.scss'
import { selectCurrency } from '../../../../redux/slices/settingsSlice/settingsSlice'
import { selectTicketLimit } from '../../../../redux/slices/ticketSlice/ticketSlice'

export interface AviaTicketsProps {
  aviaTickets: TicketType[] | null
  onMoreTickets: (activeTab: number) => void
  activeTab: number
}

export const AviaTickets: FC<AviaTicketsProps> = ({
  aviaTickets,
  activeTab,
  onMoreTickets,
}) => {
  const { t } = useTranslation(['common', 'ticket'])
  const currency = useAppSelector(selectCurrency)
  const ticketsCount = useAppSelector(
    state => state.ticket.ticketCount
  )
  const ticketsLimit = useAppSelector(selectTicketLimit)

  return (
    <>
      {aviaTickets?.map(ticket => (
        <div
          className={s.ticket}
          key={
            ticket.id +
            ticket.best_seller?.id +
            ticket.best_seller_baggage?.id +
            ticket.best_seller?.type_price +
            ticket.best_seller_baggage?.type_price
          }
        >
          <Ticket currency={currency} {...ticket} />
        </div>
      ))}

      {checkPaginationButton(
        ticketsLimit,
        ticketsCount,
        aviaTickets?.length
      ) ? (
        <div className={s.moreTicketButton}>
          <Button
            onClick={() => onMoreTickets(activeTab)}
            title={`${t('ticket:loadMore')} ${ticketsLimit} ${t(
              'ticket:tickets'
            )}`}
          />
        </div>
      ) : null}
    </>
  )
}
