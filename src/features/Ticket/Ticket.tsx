import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import { DetailButton } from 'features'
import { BaggageButton } from './BaggageButton/BaggageButton'
import { CardBody } from './CardBody/CardBody'
import { CardHeader } from './CardHeader/CardHeader'
import { TicketDetails } from './TicketDetails/TicketDetails'

import { getCurrency } from 'shared/helpers/currency/getCurrency'

import { Currency } from 'shared/types'
import type { Ticket as TicketType } from 'shared/types/ticket'
import { Baggage, SellerView } from 'shared/types/ticket'
import BaggageIcon from '/public/assets/images/baggages.svg'
import HandbagIcon from '/public/assets/images/carryon.svg'

import { Modal } from 'components'
import { uniq } from 'lodash'
import { bigMobile } from 'shared/constants/breakpoints'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import s from './ticket.module.scss'

export interface TicketProps extends TicketType {
  currency: Currency
}

const Ticket: FC<TicketProps> = ({
  id,
  best_seller,
  best_seller_baggage,
  time_route,
  routes,
  currency,
  seller_count,
  seller_baggage_count,
}) => {
  const router = useRouter()
  const locale = router.locale as string
  const { t } = useTranslation(['common'])

  const [withBaggage, setWithBaggage] = useState<Baggage>(
    best_seller_baggage?.price?.price_surcharge > 0 ||
      !best_seller_baggage
      ? Baggage.handbag
      : Baggage.baggage
  )
  const [seller, setSeller] = useState<SellerView>(
    best_seller ?? best_seller_baggage
  )
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [ticketPrice, seTicketPrice] = useState<number>(
    best_seller?.price?.price ?? best_seller_baggage?.price?.price
  )

  const { width } = useWindowDimensions()

  const handleBaggageChange = (value: Baggage) => {
    setWithBaggage(value)

    if (value === Baggage.baggage) {
      seTicketPrice(best_seller_baggage?.price?.price)
      setSeller(best_seller_baggage)
    } else {
      seTicketPrice(best_seller?.price?.price)
      setSeller(best_seller)
    }
  }

  return (
    <div className={s.ticket}>
      <div className={s.wrapper}>
        <div className={s.info}>
          <CardHeader
            airline_logos={uniq(
              routes
                ?.map(r =>
                  r.flights.map(f => f.operating_carrier_logo)
                )
                .flat()
            )}
            isBigMargin={routes?.length === 1}
          />
          <CardBody routes={routes} time_route={time_route} />
        </div>

        <div className={s.price}>
          <div className={s.baggage}>
            {best_seller_baggage?.price?.price_surcharge > 0 ? (
              <>
                <BaggageButton
                  changeBaggage={handleBaggageChange}
                  icon={<HandbagIcon />}
                  withBaggage={withBaggage}
                  price_surcharge={
                    best_seller?.price?.price_surcharge
                  }
                  currency={currency}
                  variant={Baggage.handbag}
                  additionalClass={'handBaggage'}
                  locale={locale}
                />

                <BaggageButton
                  changeBaggage={handleBaggageChange}
                  icon={<BaggageIcon />}
                  withBaggage={withBaggage}
                  price_surcharge={
                    best_seller_baggage?.price?.price_surcharge
                  }
                  currency={currency}
                  variant={Baggage.baggage}
                  additionalClass={'baggage'}
                  locale={locale}
                />
              </>
            ) : (
              <BaggageButton
                icon={
                  best_seller_baggage ? (
                    <BaggageIcon />
                  ) : (
                    <HandbagIcon />
                  )
                }
                price_surcharge={
                  best_seller_baggage?.price?.price_surcharge
                }
                currency={currency}
                variant={
                  best_seller_baggage
                    ? Baggage.baggage
                    : Baggage.handbag
                }
                isNoChoiceSelected
                locale={locale}
              />
            )}
          </div>

          <div className={s.body}>
            <div className={s.sum}>
              {ticketPrice?.toLocaleString(locale)}{' '}
              {getCurrency(currency)}
            </div>
          </div>

          <DetailButton
            classname={s.detailsBtn}
            variant={'detail'}
            hasIcon
            onClick={() => setIsDetailsOpen(prevState => !prevState)}
          >
            {t('common:words.details')}
          </DetailButton>

          <DetailButton
            hasIcon={false}
            variant={'detail'}
            classname={s.detailsBtnMobile}
            onClick={() => setIsDetailsOpen(prevState => !prevState)}
            isOpen={isDetailsOpen}
          >
            {ticketPrice?.toLocaleString(locale)}{' '}
            {getCurrency(currency)}
          </DetailButton>
        </div>
      </div>

      {isDetailsOpen && width > bigMobile && (
        <TicketDetails
          seller={seller}
          routes={routes}
          sellers_count={
            withBaggage === 'baggage'
              ? seller_baggage_count
              : seller_count
          }
          ticket_id={id}
          hasBaggage={withBaggage === 'baggage'}
        />
      )}

      <Modal
        isOpen={isDetailsOpen && width <= bigMobile}
        onClose={() => width <= bigMobile && setIsDetailsOpen(false)}
        className={s.detailsOverlay}
        variant='white'
        isClosedOnClickOutside={false}
        isCentered={false}
      >
        <TicketDetails
          seller={seller}
          routes={routes}
          sellers_count={
            withBaggage === 'baggage'
              ? seller_baggage_count
              : seller_count
          }
          ticket_id={id}
          hasBaggage={withBaggage === 'baggage'}
        />
      </Modal>
    </div>
  )
}

export default Ticket
