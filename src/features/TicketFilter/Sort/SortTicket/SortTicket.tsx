import { FC } from 'react'
import { Sort as SortType } from 'shared/types/ticket'
import { Sort } from '../Sort'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { Control } from 'react-hook-form'

import CloseIcon from '/public/assets/images/icons/CloseIcon.svg'
import cn from 'classnames'
import s from './sortTicket.module.scss'
import { Currency, Language } from 'shared/types'

type PropsSortTicket = {
  isOpen?: boolean
  setIsOpen?: (isOpen: boolean) => void
  sort?: SortType | null
  defaultValue?: string
  control?: Control<any>
  currency?: Currency
  locale?: Language
}

export const SortTicket: FC<PropsSortTicket> = ({
  isOpen,
  setIsOpen,
  control,
  currency,
  locale,
  sort,
}) => {
  const { width } = useWindowDimensions()

  const closeSort = () => {
    document.body.style.overflow = 'auto'

    setIsOpen!(false)
  }

  return (
    <div
      className={cn({
        [s.sort]: width <= 930,
        [s.active]: isOpen,
      })}
    >
      {width <= 930 && (
        <span onClick={closeSort} className={s.sortClose}>
          закрыть
          <CloseIcon className={s.sortIcon} />
        </span>
      )}
      {sort && (
        <div className={s.sortWrap}>
          <Sort
            control={control as Control<any>}
            sort={sort as SortType}
            currency={currency as Currency}
            locale={locale as Language}
            defaultValue={'CHEAP'}
          />
        </div>
      )}
    </div>
  )
}
