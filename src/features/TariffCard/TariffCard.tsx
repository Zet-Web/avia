import { FC, SetStateAction, useState } from 'react'

import cn from 'classnames'

import { Checkbox } from 'components'

import HandbagIcon from '/public/assets/images/icons/tariffCard/hand_luggage_active.svg'
import Exchange from '/public/assets/images/icons/tariffCard/no_exchange.svg'
import ExchangeActive from '/public/assets/images/icons/tariffCard/no_exchange_active.svg'
import Luggage from '/public/assets/images/icons/tariffCard/no_luggage.svg'
import LuggageActive from '/public/assets/images/icons/tariffCard/no_luggage_active.svg'
import Refund from '/public/assets/images/icons/tariffCard/no_refund.svg'
import RefundActive from '/public/assets/images/icons/tariffCard/no_refund_active.svg'

import s from './tariffCard.module.scss'

type ItemProps = {
  desc: string
  isActive: boolean
}
interface TariffCardProps {
  id: number
  title: string
  price: string
  description: string
  hand_luggage: ItemProps
  no_luggage: ItemProps
  no_refund: ItemProps
  no_exchange: ItemProps
  isChecked: boolean
  value: string | number
  onChange?: (event: boolean) => void
}

const TariffCard: FC<TariffCardProps> = tariff => {
  return (
    <label
      className={cn(s.cardWrapper, {
        [s.isChecked]: tariff.isChecked,
      })}
    >
      <div className={s.cardHeader}>
        <div className={s.headerInfo}>
          <div className={s.title}>{tariff.title}</div>
          <div className={s.price}>{tariff.price} ₽</div>
          <div className={s.description}>{tariff.description}</div>
        </div>
        <div className={s.radio}>
          <Checkbox
            type='radio'
            name='rate'
            value={tariff.value}
            isChecked={tariff.isChecked}
            onChange={tariff.onChange}
          />
        </div>
      </div>
      <div className={s.cardBody}>
        <div className={s.item}>
          <HandbagIcon className={s.icon} /> -{' '}
          {tariff.hand_luggage.desc}
        </div>
        <div className={s.item}>
          {tariff.no_luggage.isActive ? (
            <LuggageActive className={s.icon} />
          ) : (
            <Luggage className={s.icon} />
          )}
          - {tariff.no_luggage.desc}
        </div>
        <div className={s.item}>
          {tariff.no_refund.isActive ? (
            <RefundActive className={s.icon} />
          ) : (
            <Refund className={s.icon} />
          )}
          - {tariff.no_refund.desc}
        </div>
        <div className={s.item}>
          {tariff.no_exchange.isActive ? (
            <ExchangeActive className={s.icon} />
          ) : (
            <Exchange className={s.icon} />
          )}
          - {tariff.no_exchange.desc}
        </div>
      </div>
    </label>
  )
}

export default TariffCard