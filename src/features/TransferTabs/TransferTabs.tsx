import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'
import { getCurrency } from 'shared/helpers/currency/getCurrency'
import { Currency, Transfer } from 'shared/types'
import Bus from '/public/assets/images/icons/Bus.svg'
import Plane from '/public/assets/images/icons/Plane.svg'
import Train from '/public/assets/images/icons/Train.svg'
import Skeleton from '../../components/Skeleton/Skeleton'
import { useRouter } from 'next/router'
import s from './transferTabs.module.scss'

interface TransferTabsProps {
  prices: [number | undefined, number | undefined, number | undefined]
  currency: Currency
  getActiveTab?: (tab: number) => void
  className?: string
  isLoading?: boolean
} // TODO maybe in the future we will put component inside the page folder

const TransferTabs: FC<TransferTabsProps> = ({
  prices,
  currency,
  getActiveTab,
  className,
  isLoading,
}) => {
  const { t } = useTranslation(['common'])
  const [activeTab, setActiveTab] = useState(Transfer.AVIA)
  const { locale } = useRouter()

  const handleactiveTab = (id: number) => {
    setActiveTab(id)
    getActiveTab?.(id)
  }

  return (
    <div className={cn(s.direction, className)}>
      <button
        className={cn(s.directionTab, {
          [s.active]: activeTab === Transfer.AVIA,
        })}
        onClick={() => handleactiveTab(Transfer.AVIA)}
      >
        <Plane className={s.icon} />
        <div className={s.content}>
          <p className={s.type}>{t('common:words.airplanes')}</p>
          <span className={s.price}>
            {isLoading && (
              <Skeleton
                width={67}
                height={8}
                radius={50}
                className={s.skeleton}
              />
            )}
            {!isLoading &&
              (prices[0] ? (
                <>
                  {t('common:words.fromLower')}{' '}
                  {prices[0].toLocaleString(locale)}{' '}
                  {getCurrency(currency)}
                </>
              ) : (
                '...'
              ))}
          </span>
        </div>
      </button>
      <button
        className={cn(s.directionTab, {
          [s.active]: activeTab === Transfer.TRAIN,
        })}
        onClick={() => handleactiveTab(Transfer.TRAIN)}
        disabled
      >
        <Train className={s.icon} />
        <div className={s.content}>
          <p className={s.type}>{t('common:words.trains')}</p>
          <span className={s.price}>
            {isLoading && (
              <Skeleton
                width={67}
                height={8}
                radius={50}
                className={s.skeleton}
              />
            )}
            {!isLoading &&
              (prices[1] ? (
                <>
                  {t('common:words.fromLower')}{' '}
                  {prices[1].toLocaleString(locale)}{' '}
                  {getCurrency(currency)}
                </>
              ) : (
                '...'
              ))}
          </span>
        </div>
      </button>
      <button
        className={cn(s.directionTab, {
          [s.active]: activeTab === Transfer.BUS,
        })}
        onClick={() => handleactiveTab(Transfer.BUS)}
        disabled
      >
        <Bus className={s.icon} />
        <div className={s.content}>
          <p className={s.type}>{t('common:words.buses')}</p>
          <span className={s.price}>
            {isLoading && (
              <Skeleton
                width={67}
                height={8}
                radius={50}
                className={s.skeleton}
              />
            )}
            {!isLoading &&
              (prices[2] ? (
                <>
                  {t('common:words.fromLower')}{' '}
                  {prices[2].toLocaleString(locale)}{' '}
                  {getCurrency(currency)}
                </>
              ) : (
                '...'
              ))}
          </span>
        </div>
      </button>
    </div>
  )
}
export default TransferTabs
