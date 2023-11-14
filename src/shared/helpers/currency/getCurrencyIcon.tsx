import { Currency } from '../../types'
import { ReactNode } from 'react'
import RoubleIcon from '../../../../public/assets/images/icons/currency/rubl.svg'
import DollarIcon from '../../../../public/assets/images/icons/currency/usd.svg'
import EuroIcon from '../../../../public/assets/images/icons/currency/euro.svg'

export const getCurrencyIcon = (currency: Currency): ReactNode => {
  switch (currency) {
    case Currency.RUB:
      return <RoubleIcon height={14} width={20} />
    case Currency.USD:
      return <DollarIcon height={14} width={20} />
    case Currency.EUR:
      return <EuroIcon height={14} width={20} />
  }
}
