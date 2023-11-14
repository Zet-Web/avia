import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import { FC, ReactNode } from 'react'

import { getCurrency } from 'shared/helpers/currency/getCurrency'

import { Currency } from 'shared/types'
import { Baggage } from 'shared/types/ticket'

import s from './baggageButton.module.scss'

export interface BaggageButtonProps {
  changeBaggage?: (baggage: Baggage) => void
  icon: ReactNode
  price_surcharge: number
  withBaggage?: Baggage
  currency: Currency
  variant: Baggage
  isNoChoiceSelected?: boolean
  additionalClass?: any
  locale: string
}

export const BaggageButton: FC<BaggageButtonProps> = ({
  changeBaggage,
  icon,
  withBaggage,
  price_surcharge,
  currency,
  variant,
  isNoChoiceSelected,
  additionalClass,
  locale,
}) => {
  const { t } = useTranslation(['common'])

  return (
    <button
      className={cn(s.radioWrapper, {
        [s.active]: variant === withBaggage,
      })}
      onClick={() => changeBaggage?.(variant)}
    >
      <div className={cn(s.radioIcon, s[additionalClass])}>
        {icon}
      </div>

      <div className={s.radioText}>
        {price_surcharge ? (
          <>
            +{price_surcharge.toLocaleString(locale)}{' '}
            {getCurrency(currency)}
          </>
        ) : (
          t(
            `common:words.baggage.${
              isNoChoiceSelected ? `free.${variant}` : variant
            }`
          )
        )}
      </div>
    </button>
  )
  // ) : (
  //   <button
  //     className={cn(s.radioWrapper, {
  //       [s.active]: withBaggage,
  //     })}
  //     onClick={() => changeBaggage(Baggage.baggage)}
  //   >
  //     <BaggageIcon className={s.radioIcon} />
  //
  //     <div className={s.radioText}>
  //       {price_surcharge ? (
  //         <>
  //           +{price_surcharge}
  //           {getCurrency(currency)}
  //         </>
  //       ) : (
  //         t('common:words.free')
  //       )}
  //     </div>
  //   </button>
  // )
}
