import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'

import { Seller } from '../Sellers/Seller'
import { getMoreSellers } from 'shared/api/routes/tickets'

import { useAppSelector } from 'redux/hooks'
import { getNumeral } from 'shared/helpers/getNumeral'

import { SellerView } from 'shared/types/ticket'
import Arrow from '/public/assets/images/arrowUp.svg'

import s from './bestSellers.module.scss'
import { selectSearchCode } from '../../../../redux/slices/ticketSlice/ticketSlice'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { laptop } from 'shared/constants/breakpoints'
import { MobileModal } from 'components'

interface BestSellersProps {
  seller: SellerView
  sellers_count: number
  ticket_id: string
  hasBaggage: boolean
}

export const BestSellers: FC<BestSellersProps> = ({
  seller,
  sellers_count,
  ticket_id,
  hasBaggage,
}) => {
  const { t } = useTranslation(['common', 'ticket'])

  const { width } = useWindowDimensions()
  const isNotDesktop = width < laptop

  const [isMoreButtonDisplayed, setIsMoreButtonDisplayed] =
    useState(false)
  const state = useAppSelector(selectSearchCode)

  const [moreSellers, setMoreSellers] = useState<SellerView[] | null>(
    null
  )

  const handleMore = () => {
    setIsMoreButtonDisplayed(prevState => !prevState)

    if (state && !moreSellers?.length) {
      try {
        const InfoDetails = getMoreSellers(
          state,
          ticket_id,
          hasBaggage
        )
        InfoDetails.then(function (res) {
          setMoreSellers(res.data.results)
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  useEffect(() => {
    if (state) {
      const InfoDetails = getMoreSellers(state, ticket_id, hasBaggage)
      InfoDetails.then(function (res) {
        setMoreSellers(res.data.results)
      })
    }
  }, [hasBaggage])

  return (
    <>
      <Seller {...seller} />

      {sellers_count > 1 ? (
        <div className={s.moreSeller}>
          {isMoreButtonDisplayed ? (
            <>
              {moreSellers?.map(item => (
                <Seller key={item.id} {...item} />
              ))}
            </>
          ) : null}

          <button className={s.moreButton} onClick={handleMore}>
            <div>
              {isMoreButtonDisplayed ? (
                <span>{t('common:words.hide')}</span>
              ) : (
                <span>
                  {t('common:words.more')} {sellers_count}{' '}
                  {getNumeral(sellers_count, [
                    t('common:words.offer_1'),
                    t('common:words.offer_2'),
                    t('common:words.offer_3'),
                  ])}
                </span>
              )}
            </div>

            <div
              className={cn(s.arrow, {
                [s.moreActive]: isMoreButtonDisplayed,
              })}
            >
              <Arrow />
            </div>
          </button>
        </div>
      ) : null}

      {isNotDesktop && isMoreButtonDisplayed && (
        <MobileModal
          title='Предложения'
          isOpen={isMoreButtonDisplayed}
          onClose={() => setIsMoreButtonDisplayed(false)}
        >
          <div className={s.moreSellerWrapper}>
            {moreSellers?.map(item => (
              <Seller key={item.id} {...item} />
            ))}
          </div>
        </MobileModal>
      )}
    </>
  )
}
