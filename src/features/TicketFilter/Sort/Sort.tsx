import { FC, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import Skeleton from 'components/Skeleton/Skeleton'
import HideCheck from '/public/assets/images/HideCheck.svg'
import { getCurrency } from 'shared/helpers/currency/getCurrency'
import { Currency, Language } from 'shared/types'
import { Sort as SortType } from 'shared/types/ticket'

import s from '../ticketFilter.module.scss'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'

interface SortProps {
  sort: SortType
  defaultValue: string
  control: Control<any>
  currency: Currency
  locale: Language
  isLoading?: boolean
}

export const Sort: FC<SortProps> = ({
  sort,
  defaultValue,
  control,
  currency,
  locale,
  isLoading,
}) => {
  const { t } = useTranslation(['common'])
  const [activeCheck, setActiveCheck] = useState(0)
  const { width } = useWindowDimensions()

  return (
    <div className={s.sort}>
      {width >= 930 ? (
        <Controller
          name='sort'
          defaultValue={defaultValue}
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <div>
              {['CHEAP', 'FAST', 'OPTIMAL'].map(key => (
                <label className={s.radioLabel} key={key}>
                  <input
                    className={s.radioInput}
                    type='radio'
                    {...props}
                    value={key}
                    defaultChecked={key === defaultValue}
                    onChange={e => onChange(e.target.value)}
                  />
                  <div className={s.radioValue}>
                    <span className={s.radioTitle}>
                      {t(`common:sort.${key.toLowerCase()}`)}
                    </span>
                    {isLoading && (
                      <Skeleton
                        width={70}
                        height={11}
                        radius={50}
                        className={s.skeleton}
                      />
                    )}
                    {!isLoading && (
                      <span className={s.radioPrice}>
                        {t('common:words.fromLower')}{' '}
                        {sort[key as keyof SortType].toLocaleString(
                          locale
                        )}{' '}
                        {getCurrency(currency)}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}
        />
      ) : (
        <Controller
          name='sort'
          defaultValue={defaultValue}
          control={control}
          render={({ field: { onChange, ...props } }) => (
            <div>
              {['CHEAP', 'FAST', 'OPTIMAL'].map((key, index) => (
                <label
                  onClick={() => setActiveCheck(index)}
                  className={s.radioLabel}
                  key={key}
                >
                  <input
                    className={s.radioInput}
                    type='radio'
                    {...props}
                    value={key}
                    defaultChecked={key === defaultValue}
                    onChange={e => onChange(e.target.value)}
                  />
                  <div className={s.radioValue}>
                    <span className={s.radioTitle}>
                      {t(`common:sort.${key.toLowerCase()}`)}
                    </span>
                    {index === activeCheck && <HideCheck />}
                  </div>
                </label>
              ))}
            </div>
          )}
        />
      )}
    </div>
  )
}
