import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { InputArray, SingleInput, TransportTabs } from './components'

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  selectTicketState,
  ticketRequest,
} from '../../redux/slices/ticketSlice/ticketSlice'

import { RouteDetail } from 'shared/types/user'

import { laptop } from '../../shared/constants/breakpoints'
import { useWindowDimensions } from '../../shared/hooks/useWindowDimension'

import cn from 'classnames'

import s from './searchTickets.module.scss'

import AngleTop from '/public/assets/images/angle-top.svg'
import { SingleRouteDate } from 'shared/types/ticket'
import { selectGeoData } from '../../redux/slices/settingsSlice/settingsSlice'

enum Tabs {
  roundtrip,
  oneWay,
  difficult,
}

const SearchTickets = () => {
  const router = useRouter()

  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.oneWay)
  const [isOpen, setIsOpen] = useState<boolean>(
    router.pathname !== '/'
  )

  const ticketQuery = useAppSelector(
    state => state.ticket.ticketInfo?.find
  )
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectTicketState)
  const geo = useAppSelector(selectGeoData)
  const defaultOrigin = geo
    ? {
      title: geo?.title,
      abbreviation: geo?.code,
    }
    : null

  const { t } = useTranslation(['common'])

  const { width } = useWindowDimensions()

  const handleDateChange = (dates: SingleRouteDate) => {
    if (dates[1] && activeTab === Tabs.oneWay)
      setActiveTab(Tabs.roundtrip)
    if (!dates[1] && activeTab === Tabs.roundtrip)
      setActiveTab(Tabs.oneWay)
  }

  const handleSubmit = (data: RouteDetail) => {
    dispatch(ticketRequest(data))
    setShouldRedirect(true)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!ticketQuery?.directions) return

    if (ticketQuery.directions.length === 1) {
      setActiveTab(Tabs.oneWay)
      return
    }

    if (ticketQuery.directions.length > 2) {
      setActiveTab(Tabs.difficult)
      return
    }

    if (ticketQuery.directions.length === 2) {
      if (
        ticketQuery.directions[0].origin ===
        ticketQuery.directions[1].destination
      ) {
        setActiveTab(Tabs.roundtrip)
      } else {
        setActiveTab(Tabs.difficult)
      }
    }
  }, [ticketQuery])

  useEffect(() => {
    if (state.searchCode && shouldRedirect) {
      setShouldRedirect(false)
      router.push(`/tickets/avia?state=${state.searchCode}`)
    }
  }, [state])

  const renderTabContent = (tab: Tabs) => {
    switch (tab) {
      case Tabs.oneWay:
        return (
          <SingleInput
            toggleOpen={() => setIsOpen(prevState => !prevState)}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            defaultOrigin={defaultOrigin}
            onDateChange={handleDateChange}
          />
        )
      case Tabs.roundtrip:
        return (
          <SingleInput
            toggleOpen={() => setIsOpen(prevState => !prevState)}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            defaultOrigin={defaultOrigin}
            isRoundTripSelected
            onDateChange={handleDateChange}
          />
        )
      case Tabs.difficult:
        return (
          <InputArray
            isOpen={isOpen}
            defaultOrigin={defaultOrigin}
            onSubmit={handleSubmit}
            toggleOpen={() => setIsOpen(prevState => !prevState)}
          />
        )
    }
  }

  const renderTabs = () =>
    Object.keys(Tabs)
      .filter(t => !isNaN(Number(t)))
      .map(i => (
        <button
          className={cn(s.tab, {
            [s.active]: activeTab === +i,
          })}
          key={i}
          onClick={() => setActiveTab(+i)}
        >
          {t(`common:tabsFormSearchTickets.${Tabs[+i]}`)}
        </button>
      ))

  return (
    <div
      className={cn(s.wrapper, {
        [s.fullHeight]: router.pathname === '/',
      })}
    >
      {router.pathname === '/' && <TransportTabs />}

      {(isOpen || width > laptop || router.pathname === '/') && (
        <div className={s.tabs}>{renderTabs()}</div>
      )}

      <div className={s.tabContent}>
        {renderTabContent(activeTab)}
      </div>

      {isOpen && width < laptop && router.pathname !== '/' && (
        <button
          className={s.collapseBtn}
          onClick={() => setIsOpen(false)}
        >
          <AngleTop className={s.collapseIcon} />
        </button>
      )}
    </div>
  )
}

export default SearchTickets