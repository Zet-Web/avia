import { useTranslation } from 'next-i18next'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { selectTicketInfo } from 'redux/slices/ticketSlice/ticketSlice'
import { SkeletonFiltersList } from 'features'
import CloseIcon from '/public/assets/images/icons/CloseIcon.svg'

import cn from 'classnames'

import { useAppSelector } from 'redux/hooks'

import { Button } from 'components'

import Bell from '/public/assets/images/icons/bell.svg'

import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import s from './ticketFilter.module.scss'
import { Filters } from './Filters/Filters'
import { SortTicket } from './Sort/SortTicket/SortTicket'
import { useFilters } from 'shared/hooks/useFilters'

const TicketFilter: FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  const { width } = useWindowDimensions()
  const { currency, language } = useAppSelector(
    state => state.settings
  )
  const { t } = useTranslation(['common'])
  const {
    control,
    reset,
    formatTransferAirports,
    getDestination,
    getDirection,
    getOrigin,
    closeModal,
    getTransplantsCount,
    isFilterOpen,
    isSubmitOpen,
    setIsFilterOpen,
    ticketInfo,
  } = useFilters()

  return (
    <>
      {width <= 930 && (
        <Button
          className={s.showFilter}
          onClick={() => setIsFilterOpen(true)}
          title='фильтры'
        />
      )}
      <div
        className={cn({
          [s.filter]: width <= 930,
          [s.active]: isFilterOpen,
        })}
      >
        <div className={cn({ [s.filterBody]: width <= 930 })}>
          <div className={s.container}>
            {width <= 930 && (
              <button className={s.closeBtn} onClick={closeModal}>
                <span className={s.closeText}>закрыть</span>
                <CloseIcon className={s.closeIcon} />
              </button>
            )}
            <div className={s.subscribe}>
              <span>Отслеживать цены</span>{' '}
              <Bell className={s.subscribeIcon} />
            </div>
            <SortTicket
              control={control}
              sort={ticketInfo?.sort}
              currency={currency}
              locale={language}
              defaultValue='CHEAP'
            />
            <div className={s.header}>
              <h1>{t('common:words.filters')}</h1>
              <Button
                onClick={reset}
                title='очистить все'
                className={s.resetButton}
              />
            </div>
            <Filters
              ticketInfo={ticketInfo}
              control={control}
              getDestination={getDestination}
              getDirection={getDirection}
              getOrigin={getOrigin}
              getTransplantsCount={getTransplantsCount}
              formatTransferAirports={formatTransferAirports}
            />
            {width <= 930 && isSubmitOpen && (
              <Button
                className={s.submitFilter}
                onClick={closeModal}
                title='Применить'
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default TicketFilter
