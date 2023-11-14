import { Currency, Language } from 'shared/types'
import type { Option } from 'shared/types/option'

import RussiaIcon from '/public/assets/images/icons/flags/russia.svg'
import UKIcon from '/public/assets/images/icons/flags/united-kingdom.svg'
import GermanyIcon from '/public/assets/images/icons/flags/germany.svg'

import RoubleIcon from '/public/assets/images/icons/currency/rubl.svg'
import EuroIcon from '/public/assets/images/icons/currency/euro.svg'
import DollarIcon from '/public/assets/images/icons/currency/usd.svg'

import s from './dropdownMenu.module.scss'

export const langOptions: Option[] = [
  {
    label: Language.RU,
    icon: <RussiaIcon className={s.icon}/>,
    title: 'Русский язык',
  },
  {
    label: Language.EN,
    icon: <UKIcon className={s.icon} />,
    title: 'English',
  },
  {
    label: Language.DE,
    icon: <GermanyIcon className={s.icon} />,
    title: 'Deutsch',
  },
]

export const currencyOptions: Option[] = [
  {
    label: Currency.RUB,
    title: 'common:currency.rub',
    icon: <RoubleIcon className={s.icon}/>,
  },
  {
    label: Currency.EUR,
    title: 'common:currency.eur',
    icon: <EuroIcon className={s.icon} />,
  },
  {
    label: Currency.USD,
    title: 'common:currency.usd',
    icon: <DollarIcon className={s.icon} />,
  },
]
