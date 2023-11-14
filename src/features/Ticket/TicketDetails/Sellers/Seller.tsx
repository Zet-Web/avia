import { FC } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Button } from 'components'

import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'
import { getSellerLink } from 'shared/api/routes/tickets'

import { SellerView } from 'shared/types/ticket'

import s from './sellers.module.scss'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getCurrency } from 'shared/helpers/currency/getCurrency'
import { selectSeller } from 'redux/slices/ticketSlice/ticketSlice'

function getPassengersVariant(count: number) {
  if (count === 1) return 'passengers.1'
  return 'passengers.2'
}

export const Seller: FC<SellerView> = ({
  title,
  id,
  type_price,
  price,
  logo_url,
  link_url,
}) => {
  const { push } = useRouter()
  const { t } = useTranslation(['common', 'ticket'])
  const dispatch = useAppDispatch()

  const passengers = useAppSelector(
    state => state.ticket.ticketInfo?.find.passengers
  )
  const { currency, language } = useAppSelector(
    state => state.settings
  )

  const handleSeller = async () => {
    try {
      const res = await getSellerLink(link_url)
      dispatch(
        selectSeller({
          title,
          logo_url,
          ...res.data,
        })
      )
    } catch (e) {
      console.log(e)
    } finally {
      if (window)
        window.open(`/redirect?to=${title}`, '_blank', 'noopener')
    }
  }

  return (
    <div className={s.bestSeller}>
      <div className={s.container}>
        <div className={s.price}>
          {price?.price.toLocaleString(language)}{' '}
          {getCurrency(currency)}
        </div>
        {passengers && (
          <div className={s.subTitle}>
            {t('ticket:priceFor')}{' '}
            {passengers.adults +
              passengers.children +
              passengers.infants}{' '}
            {t(
              `ticket:${getPassengersVariant(
                passengers.adults +
                  passengers.children +
                  passengers.infants
              )}`
            )}
          </div>
        )}
      </div>

      <div className={s.container}>
        <div className={s.sellerLogo}>
          <Image
            src={getImageUrlWithBaseDomain(logo_url)}
            layout='fill'
            alt={'best seller logo'}
          />
        </div>
        <div className={s.subTitle}>
          {t('ticket:on')} {title}
        </div>
      </div>

      <div className={s.container}>
        <Button
          onClick={handleSeller}
          title={'Выбрать'}
          className={s.button}
        />
      </div>
    </div>
  )
}
