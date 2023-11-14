import { Accordion, Button } from 'components'
import CheckboxGroup from 'features/CheckboxGroup/CheckboxGroup'
import { FC, ReactNode, useState } from 'react'
import { Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'redux/hooks'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'

import {
  Sort as SortType,
  TicketFilter as TicketFilterForm,
  TicketInfo,
} from 'shared/types/ticket'
import {
  DoubleCheckboxGroupFieldArray,
  MultiCheckboxGroupFieldArray,
} from '../Checkbox/Checkbox'
import {
  DoubleRangeFieldArray,
  RangeFieldArray,
} from '../Range/Range'

import BackIcon from '/public/assets/images/BackIcon.svg'
import cn from 'classnames'
import s from './filters.module.scss'

type Form = TicketFilterForm & {
  sort: keyof SortType
  airports_transfer: string[][][][]
}

type PropsFilters = {
  isOpen?: boolean
  setIsOpen?: (isOpen: boolean) => void
  ticketInfo: TicketInfo | null
  control: Control<any>
  getOrigin: (index: number) => ReactNode
  getDestination: (index: number) => ReactNode
  getDirection: (index: number) => ReactNode
  getTransplantsCount: (index?: number) => any
  formatTransferAirports: () => any
}

export const Filters: FC<PropsFilters> = ({
  isOpen,
  setIsOpen,
  getOrigin,
  control,
  ticketInfo,
  getDestination,
  getDirection,
  getTransplantsCount,
  formatTransferAirports,
}) => {
  const { t } = useTranslation(['common'])
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [isSubmitOpen, setIsSubmitOpen] = useState<boolean>(false)

  const { width } = useWindowDimensions()
  const searchCode = useAppSelector(
    state => state.ticket.state.searchCode
  )

  const closeModal = () => {
    setIsFilterOpen(false)
    setIsSubmitOpen(false)
  }

  return (
    <div
      className={cn({
        [s.filter]: width <= 930,
        [s.active]: isOpen,
      })}
    >
      {width <= 930 && (
        <div className={s.ticketFilterLabel}>
          <span
            onClick={() => setIsOpen!(false)}
            className={s.ticketFilterBack}
          >
            <BackIcon className={s.ticketFilterIcon} />
            Назад
          </span>
          <h2 className={s.ticketFilterTitle}>Фильтры</h2>
        </div>
      )}
      <div className={s.ticketFilterForm}>
        {width <= 930 && (
          <h2 className={s.ticketFilterSubTitle}>Фильтры</h2>
        )}
        {ticketInfo?.filter?.transplants && (
          <Accordion
            className={s.formStep}
            title={t('common:words.transplants')}
            isDefaultOpen
          >
            <CheckboxGroup
              control={control}
              name='transplants'
              options={ticketInfo.filter.transplants.map(tr => ({
                label: t(`common:words.transfers.${tr}`),
                value: tr,
              }))}
              defaultChecked={ticketInfo.filter.transplants}
              hasSelectAll
            />
          </Accordion>
        )}

        {ticketInfo?.filter?.time_departure &&
          ticketInfo?.filter?.time_arrival && (
            <Accordion
              className={s.formStep}
              title={t('common:ticketFilter.departureArrivalTime')}
              isDefaultOpen
            >
              <DoubleRangeFieldArray
                nameArrival='time_arrival'
                nameDeparture='time_departure'
                itemsDeparture={ticketInfo.filter.time_departure}
                itemsArrival={ticketInfo.filter.time_arrival}
                control={control}
                getOrigin={getOrigin}
                getDestination={getDestination}
                getDirection={getDirection}
              />
            </Accordion>
          )}

        {ticketInfo?.filter?.time_way && (
          <Accordion
            className={s.formStep}
            title={t('common:ticketFilter.timeWay')}
            isDefaultOpen
          >
            <RangeFieldArray
              name='time_way'
              items={ticketInfo.filter.time_way}
              control={control}
              getDirection={getDirection}
            />
          </Accordion>
        )}

        {ticketInfo?.filter?.time_transfer &&
          getTransplantsCount!() !== 0 && (
            <Accordion
              className={s.formStep}
              title={t('common:ticketFilter.timeTransfer')}
              isDefaultOpen
            >
              <RangeFieldArray
                name='time_transfer'
                items={ticketInfo.filter.time_transfer}
                control={control}
                getDirection={getDirection}
              />
            </Accordion>
          )}

        {ticketInfo?.filter?.baggage && (
          <Accordion
            className={s.formStep}
            title={t('common:ticketFilter.baggage')}
            isDefaultOpen
          >
            <CheckboxGroup
              control={control}
              name='baggage'
              options={ticketInfo.filter.baggage.map(b => ({
                label: t(`common:words.baggage.${b}`),
                value: b,
              }))}
              defaultChecked={ticketInfo.filter.baggage}
              hasSelectAll
            />
          </Accordion>
        )}

        {ticketInfo?.filter?.airlines && (
          <Accordion
            className={s.formStep}
            title={
              <>
                {t('common:ticketFilter.airlines')}{' '}
                <span className={s.variantsCount}>
                  ({ticketInfo?.filter?.airlines.length})
                </span>
              </>
            }
          >
            <CheckboxGroup
              control={control}
              name={'airlines'}
              options={ticketInfo.filter.airlines.map(a => ({
                label: ticketInfo.airlines[a].name,
                value: a,
              }))}
              defaultChecked={ticketInfo.filter.airlines}
              hasReset={true}
              hasSelectAll
            />
          </Accordion>
        )}

        {ticketInfo?.filter?.airports_departure &&
          ticketInfo?.filter?.airports_arrival && (
            <Accordion
              className={s.formStep}
              title={t('common:ticketFilter.airports')}
            >
              <DoubleCheckboxGroupFieldArray
                control={control}
                nameDeparture={'airports_departure'}
                nameArrival={'airports_arrival'}
                itemsDeparture={ticketInfo.filter.airports_departure}
                itemsArrival={ticketInfo.filter.airports_arrival}
                getLabel={title =>
                  ticketInfo.airports[title]?.name ?? title
                }
                getDepartureDefaultValue={index => {
                  if (searchCode) {
                    const airports = searchCode
                      ?.split(/[>^]/)
                      .filter(a =>
                        ticketInfo.filter.airports_departure[
                          index
                        ].includes(a)
                      )

                    if (airports.length > 0) return airports
                  }
                  return ticketInfo.filter.airports_departure[index]
                }}
                getArrivalDefaultValue={index => {
                  if (searchCode) {
                    const airports = searchCode
                      ?.split(/[>^]/)
                      .filter(a =>
                        ticketInfo.filter.airports_arrival[
                          index
                        ].includes(a)
                      )

                    if (airports.length > 0) return airports
                  }
                  return ticketInfo.filter.airports_arrival[index]
                }}
                getOrigin={getOrigin}
                getDestination={getDestination}
                getDirection={getDirection}
              />
            </Accordion>
          )}

        {ticketInfo?.filter?.airports_transfer &&
          getTransplantsCount() !== 0 && (
            <Accordion
              className={s.formStep}
              title={t('common:ticketFilter.transferAirports')}
            >
              <MultiCheckboxGroupFieldArray
                name='airports_transfer'
                control={control}
                items={formatTransferAirports()}
                getCountry={code => (
                  <div className={s.direction}>
                    {ticketInfo.airports[code]?.country}
                  </div>
                )}
                getAirport={code => ticketInfo.airports[code]?.name}
                getGroupTitle={index => (
                  <div className={s.transfer}>
                    {t(`common:enum.${index + 1}`)}{' '}
                    {t(`common:words.transfer`)}
                  </div>
                )}
                getDirection={getDirection}
                getCount={getTransplantsCount}
              />
            </Accordion>
          )}

        {ticketInfo?.filter?.seller && (
          <Accordion
            className={s.formStep}
            title={
              <>
                {t('common:ticketFilter.sellers')}{' '}
                <span className={s.variantsCount}>
                  ({ticketInfo?.filter?.seller.length})
                </span>
              </>
            }
          >
            <CheckboxGroup
              control={control}
              name='seller'
              options={ticketInfo.filter.seller.map(b => ({
                label: ticketInfo.sellers[b].title,
                value: b,
              }))}
              defaultChecked={ticketInfo.filter.seller}
              hasSelectAll
            />
          </Accordion>
        )}
        {width <= 930 && (
          <Button
            className={s.submitFilter}
            onClick={closeModal}
            title='Применить'
          />
        )}
      </div>
    </div>
  )
}
