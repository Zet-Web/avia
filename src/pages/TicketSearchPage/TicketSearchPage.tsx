import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  FiltersPanel,
  NoTicketsSection,
  TicketFilter,
  TransferTabs,
  SkeletonTicket,
} from 'features'
import { Main } from './Main'
import { Prices } from './Prices'
import { Sidebar } from './Sidebar'

import { useAppDispatch, useAppSelector } from 'redux/hooks'

import { Transfer } from 'shared/types'

import {
  selectTicketPage,
  ticketConnecting,
  ticketGet,
  ticketRequest,
  updateTickets,
} from 'redux/slices/ticketSlice/ticketSlice'
import { formatApiDate } from 'shared/helpers/date/formatApiDate'
import { RouteDetail } from 'shared/types/user'
import s from './ticketSearchPage.module.scss'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'

export const TicketSearchPage = () => {
  const { t } = useTranslation(['meta'])
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectTicketPage)
  const { currency, language } = useAppSelector(
    state => state.settings
  )
  const [activeTab, setActiveTab] = useState<Transfer>(Transfer.AVIA)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { query } = useRouter()
  const { width } = useWindowDimensions()

  const { state, tickets, ticketInfo, ticketStatus } = useAppSelector(
    state => state.ticket
  )

  useEffect(() => {
    if (state?.searchCode) {
      dispatch(ticketGet(state.searchCode as string))
      setIsLoading(true)
    }
  }, [state])

  useEffect(() => {
    dispatch(
      ticketConnecting({
        state: query.state as string,
        stateEnd: '',
        stateStart: '',
      })
    )
  }, [query.state])

  useEffect(() => {
    if (ticketInfo?.find) {
      ticketInfo.find.locale = language
      ticketInfo.find.currency = currency
      ticketInfo.find.directions = ticketInfo.find.directions.map(
        d => ({
          ...d,
          date: formatApiDate(Date.parse(d.date)),
        })
      )
      dispatch(ticketRequest(ticketInfo.find as RouteDetail))
    }
  }, [currency, language])

  const handleMoreTickets = (activeTab: number) => {
    switch (activeTab) {
      case Transfer.AVIA:
        return dispatch(updateTickets(currentPage + 1))
      case Transfer.TRAIN:
        return console.log('for request get more TRAIN tickets')
      case Transfer.BUS:
        return console.log('for request get more BUS tickets')
      default:
        return null
    }
  }

  useEffect(() => {
    ticketStatus === ticketRequest.type
      ? setIsLoading(true)
      : setIsLoading(false)

    console.log(ticketStatus)
  }, [ticketStatus])

  return (
    <div className={s.page}>
      <Head>
        <title>{t('meta:titles.tickets.search')}</title>
      </Head>
      <div className={s.container}>
        <div className={s.wrap}>
          <div className={s.sidebarWrap}>
            {ticketInfo?.filter && (
              <Sidebar>
                <TicketFilter isLoading={isLoading} />
              </Sidebar>
            )}
          </div>

          <div className={s.mainWrap}>
            <TransferTabs
              prices={[ticketInfo?.sort?.CHEAP, undefined, undefined]}
              currency={currency}
              getActiveTab={tab => setActiveTab(tab)}
              className={s.transferTabs}
              isLoading={isLoading}
            />
            {isLoading && (
              <div className={s.main}>
                {Array.from({ length: 10 }).map((item, index) => (
                  <SkeletonTicket key={index} />
                ))}
              </div>
            )}
            {!isLoading &&
              (activeTab !== Transfer.AVIA ? (
                <NoTicketsSection
                  variant={'noSection'}
                  isBusSelected={activeTab === Transfer.BUS}
                  isTrainSelected={activeTab === Transfer.TRAIN}
                />
              ) : (
                <Main
                  onMoreTickets={handleMoreTickets}
                  aviaTickets={tickets}
                  activeTab={activeTab}
                  busTickets={null}
                  trainTickets={null}
                  isFilterInvalid={Boolean(ticketInfo?.filter)}
                />
              ))}
          </div>
        </div>

        <div className={s.priceWrap}>
          {activeTab === Transfer.AVIA ? (
            <Prices
              activeType={activeTab}
              currency={currency}
              isLoading={isLoading}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
