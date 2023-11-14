import { Filters as ModalFilters } from 'features/TicketFilter/Filters/Filters'
import { toast } from 'react-hot-toast'

import Filters from '/public/assets/images/icons/Filters.svg'
import Sort from '/public/assets/images/icons/Sort.svg'
import Notifications from '/public/assets/images/icons/Notifications.svg'

import cn from 'classnames'

import s from './filtersPanel.module.scss'
import { SortTicket as ModalSort } from 'features/TicketFilter/Sort/SortTicket/SortTicket'
import { useAppSelector } from 'redux/hooks'
import { useFilters } from 'shared/hooks/useFilters'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { FC, ReactNode, useState } from 'react'
import { Button, Toast } from 'components'

type TypePanel = {
  id: number
  label: string
  title: string
  icon: ReactNode
}

type ModalType<T> = T

const panel: TypePanel[] = [
  {
    id: 1,
    label: 'filters',
    title: 'Фильтры',
    icon: <Filters className={s.panelIcon} />,
  },
  {
    id: 2,
    label: 'sort',
    title: 'Сортировка',
    icon: <Sort className={s.panelIcon} />,
  },
  {
    id: 3,
    label: 'toast',
    title: 'Отслеживать цены',
    icon: (
      <Notifications className={cn(s.panelIcon, s.panelIconNotify)} />
    ),
  },
]

const FiltersPanel: FC = () => {
  const [activeModal, setActiveModal] = useState<
    string | ModalType<string>
  >('')
  const [isOpen, setIsOpen] = useState(false)
  const { width } = useWindowDimensions()

  const { currency, language } = useAppSelector(
    state => state.settings
  )

  const {
    control,
    formatTransferAirports,
    getDestination,
    getDirection,
    getOrigin,
    getTransplantsCount,
    ticketInfo,
  } = useFilters()

  const isOpenClick = (label: string) => {
    if (label === 'sort') {
      document.body.style.overflow = 'hidden'
    }

    setActiveModal(label)

    setIsOpen(true)
  }

  const modals: ModalType<any> = {
    filters: (
      <ModalFilters
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        control={control}
        formatTransferAirports={formatTransferAirports}
        getDestination={getDestination}
        getDirection={getDirection}
        getOrigin={getOrigin}
        getTransplantsCount={getTransplantsCount}
        ticketInfo={ticketInfo}
      />
    ),
    sort: (
      <ModalSort
        isOpen={isOpen}
        currency={currency}
        locale={language}
        sort={ticketInfo?.sort}
        control={control}
        setIsOpen={setIsOpen}
        defaultValue='CHEAP'
      />
    ),
  }

  return (
    <div className={s.panel}>
      {panel.map(({ id, title, label, icon }) => (
        <div key={id} className={s.panelWrap}>
          {width <= 520 && id !== 3 ? (
            <Button
              onClick={() => isOpenClick(label)}
              className={cn(s.panelButton)}
              title={title}
            />
          ) : (
            width >= 520 && (
              <Button
                onClick={() => {
                  if (id === 3) {
                    toast(t => (
                      <Toast id={t.id} text='Цены отслеживаются' />
                    ))
                  }

                  isOpenClick(label)
                }}
                className={cn(s.panelButton, {
                  [s.panelButtonNotify]: id === 3,
                })}
                title={title}
              />
            )
          )}
          {width <= 520 && id === 3 ? (
            <div
              onClick={() => {
                toast(t => (
                  <Toast id={t.id} text='Цены отслеживаются' />
                ))
              }}
              className={s.panelWrapNotify}
            >
              {icon}
            </div>
          ) : (
            icon
          )}
        </div>
      ))}
      {modals[activeModal]}
    </div>
  )
}

export default FiltersPanel
