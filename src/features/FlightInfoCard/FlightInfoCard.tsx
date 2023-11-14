import { FC, SetStateAction, useState } from 'react'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { DetailButton } from 'features/index'
import { FlightInfoDrop } from './FlightInfoDrop/FlightInfoDrop'

import { convertMinsToHrsMins } from 'shared/helpers/date/convertMinsToHrsMins'
import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'
import { getFlightInfoDetails } from 'shared/api/routes/tickets'

import { getLocalHoursAndMinutes } from 'shared/helpers/date/getLocalHoursAndMinutes'
import { formatWithFullMonthAndWeekday } from 'shared/helpers/date/formatWithFullMonthAndWeekday'

import { Flight, FlightDetail, Cargo } from 'shared/types/ticket'
import Carryon from '/public/assets/images/carryon.svg'
import Baggages from '/public/assets/images/baggages.svg'
import Union from '/public/assets/images/union.svg'
import UnionLong from '/public/assets/images/union_long.svg'

import s from './FlightInfoCard.module.scss'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { laptop } from 'shared/constants/breakpoints'
import { MobileModal } from 'components'
import TariffCard from 'features/TariffCard/TariffCard'
import { mock_tariff } from 'shared/mocks/mock_tariff'

export interface FlightInfoCardProps {
  flightInfo: Flight
  className?: string
  baggage: Cargo
  handbags: Cargo
}

const FlightInfoCard: FC<FlightInfoCardProps> = ({
  flightInfo,
  className,
  baggage,
  handbags,
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation(['common'])
  const { width } = useWindowDimensions()
  const isNotDesktop = width < laptop

  const [tariffCard, setTariffCard] = useState(0)

  const handleTariffCardSelect = (
    newValue: SetStateAction<number>
  ) => {
    setTariffCard(newValue)
  }

  const [flightInfoDetail, setFlightInfoDetail] =
    useState<FlightDetail | null>(null)

  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] =
    useState<boolean>(false)

  const handleOpen = () => {
    setIsAdditionalInfoOpen(prevState => !prevState)

    if (!flightInfoDetail) {
      try {
        const InfoDetails = getFlightInfoDetails(
          flightInfo.transport_info_details
        )
        InfoDetails.then(function (res) {
          setFlightInfoDetail(res.data)
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  const timeLocalize = {
    h: t('time.h'),
    m: t('time.m'),
  }

  const getBaggageTotalWeight = (
    baggages: Cargo[]
  ): string | null => {
    let totalWeight = 0
    baggages.forEach(baggage => {
      if (baggage.weight) totalWeight += baggage.weight
    })
    if (totalWeight === 0) return null
    else return '(' + totalWeight + ' кг)'
  }

  const getBaggageCount = (baggages: Cargo[]): number => {
    let infoCount = 0
    baggages.forEach(baggage => {
      if (baggage.count) infoCount += baggage.count
    })
    return infoCount
  }
  return (
    <div className={cn(s.wrap, className)}>
      <div
        className={cn(s.flightInfoCard, {
          [s.infoOpened]: isAdditionalInfoOpen,
        })}
      >
        <div className={s.head}>
          <div className={s.leftSide}>
            <div className={s.headWrap}>
              <div className={s.logo}>
                <Image
                  src={getImageUrlWithBaseDomain(
                    flightInfo?.operating_carrier_logo
                  )}
                  alt={'logo airline'}
                  width={20}
                  height={20}
                />
              </div>

              <div>
                {t('words.flight')}:{' '}
                {`${flightInfo?.operating_carrier}-${flightInfo?.number}`}
              </div>
            </div>
          </div>

          <div className={s.rightSide}>
            {convertMinsToHrsMins(flightInfo?.duration, timeLocalize)}
          </div>
        </div>

        <div className={s.middle}>
          <div className={s.leftSide}>
            <div className={s.departureInfo}>
              <div className={s.infoWrap}>
                <div className={s.time}>
                  {getLocalHoursAndMinutes(
                    flightInfo?.local_departure_iso,
                    locale as string
                  )}

                  <div className={s.union}>
                    <Union />
                  </div>

                  <div className={s.unionLong}>
                    <UnionLong />
                  </div>
                </div>

                <div className={s.info}>
                  {flightInfo?.departure_city}
                  {flightInfo?.departure_airport_name}{' '}
                  <span>({flightInfo?.departure_airport_iata})</span>
                </div>
              </div>

              <div className={s.departureDate}>
                {formatWithFullMonthAndWeekday(
                  flightInfo?.local_departure_iso,
                  locale as string
                )}
              </div>
            </div>

            <div className={s.arrivalInfo}>
              <div className={s.infoWrap}>
                <div className={s.time}>
                  {getLocalHoursAndMinutes(
                    flightInfo?.local_arrival_iso,
                    locale as string
                  )}
                  <div className={s.dot} />
                </div>

                <div className={s.info}>
                  {flightInfo?.arrival_city},{' '}
                  {flightInfo?.arrival_airport_name}{' '}
                  <span>({flightInfo?.arrival_airport_iata})</span>
                </div>
              </div>

              <div className={s.arrivalDate}>
                {formatWithFullMonthAndWeekday(
                  flightInfo?.local_arrival_iso,
                  locale as string
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={s.footer}>
          <div className={s.footerWrap}>
            <div className={s.carryonWrap}>
              <div
                className={cn(s.icon, {
                  [s.baggageOrCarryonTrue]: handbags?.count !== null,
                })}
              >
                <Carryon />
              </div>

              {handbags?.count !== null ? (
                <div className={s.carryon}>
                  {/*- ручная кладь включена*/}-{' '}
                  {t('ticket:handLuggageIncluded')}{' '}
                  <span>
                    {handbags?.weight
                      ? '(' + handbags.weight + ' кг)'
                      : null}
                    {/* {getBaggageTotalWeight(
                        handbags.weight
                      )} */}
                  </span>
                  {/*<span>({seller?.price?.handbags})</span>*/}
                </div>
              ) : (
                <div className={s.carryon}>
                  {/*-  ручная кладь не включена*/}-{' '}
                  {t('ticket:handLuggageNotIncluded')}
                </div>
              )}
            </div>

            <div className={s.baggageWrap}>
              <div
                className={cn(s.icon, {
                  [s.baggageOrCarryonTrue]: baggage?.count !== null,
                })}
              >
                <Baggages />
              </div>

              {baggage?.count !== null ? (
                <div className={s.baggage}>
                  {/*- багаж включен*/}- {t('ticket:luggageIncluded')}{' '}
                  <span>
                    {baggage?.weight
                      ? '(' + baggage.weight + ' кг)'
                      : null}
                  </span>
                  {/*<span>({seller?.price?.baggage})</span>*/}
                </div>
              ) : (
                <div className={s.baggage}>
                  {/*- багаж не включен*/}-{' '}
                  {t('ticket:luggageNotIncluded')}
                </div>
              )}
            </div>
          </div>

          <div className={s.detailButton}>
            <DetailButton
              isDefaultOpen={isAdditionalInfoOpen}
              variant={'about'}
              onClick={handleOpen}
              classname={cn(s.button, s.buttonDetail, {
                [s.infoOpened]: isAdditionalInfoOpen,
              })}
            >
              {t('common:ticket.aboutRaise')}
            </DetailButton>
          </div>
        </div>
      </div>

      {isAdditionalInfoOpen ? (
        <FlightInfoDrop flightInfoDetail={flightInfoDetail} />
      ) : null}

      {isNotDesktop && isAdditionalInfoOpen && (
        <MobileModal
          title={'О рейсе'}
          isOpen={isAdditionalInfoOpen}
          onClose={() => setIsAdditionalInfoOpen(false)}
        >
          <>
            <div className={s.flightInfoCardMobile}>
              <div className={s.head}>
                <div className={s.leftSide}>
                  <div className={s.headWrap}>
                    <div className={s.logo}>
                      <Image
                        src={getImageUrlWithBaseDomain(
                          flightInfo?.operating_carrier_logo
                        )}
                        alt={'logo airline'}
                        width={20}
                        height={20}
                      />
                    </div>

                    <div>
                      {t('words.flight')}:{' '}
                      {`${flightInfo?.operating_carrier}-${flightInfo?.number}`}
                    </div>
                  </div>
                </div>

                <div className={s.rightSide}>
                  {convertMinsToHrsMins(
                    flightInfo?.duration,
                    timeLocalize
                  )}
                </div>
              </div>

              <div className={s.middle}>
                <div className={s.leftSide}>
                  <div className={s.departureInfo}>
                    <div className={s.infoWrap}>
                      <div className={s.time}>
                        {getLocalHoursAndMinutes(
                          flightInfo?.local_departure_iso,
                          locale as string
                        )}

                        <div className={s.union}>
                          <Union />
                        </div>

                        <div className={s.unionLong}>
                          <UnionLong />
                        </div>
                      </div>

                      <div className={s.info}>
                        {flightInfo?.departure_city}
                        {flightInfo?.departure_airport_name}{' '}
                        <span>
                          ({flightInfo?.departure_airport_iata})
                        </span>
                      </div>
                    </div>

                    <div className={s.departureDate}>
                      {formatWithFullMonthAndWeekday(
                        flightInfo?.local_departure_iso,
                        locale as string
                      )}
                    </div>
                  </div>

                  <div className={s.arrivalInfo}>
                    <div className={s.infoWrap}>
                      <div className={s.time}>
                        {getLocalHoursAndMinutes(
                          flightInfo?.local_arrival_iso,
                          locale as string
                        )}
                        <div className={s.dot} />
                      </div>

                      <div className={s.info}>
                        {flightInfo?.arrival_city},{' '}
                        {flightInfo?.arrival_airport_name}{' '}
                        <span>
                          ({flightInfo?.arrival_airport_iata})
                        </span>
                      </div>
                    </div>

                    <div className={s.arrivalDate}>
                      {formatWithFullMonthAndWeekday(
                        flightInfo?.local_arrival_iso,
                        locale as string
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FlightInfoDrop flightInfoDetail={flightInfoDetail} />
            <h1 className={s.title}>Тарифы</h1>
            <div className={s.flex}>
              {mock_tariff.map(item => (
                <TariffCard
                  {...item}
                  key={item.title}
                  onChange={() => handleTariffCardSelect(item.id)}
                  value={tariffCard}
                  isChecked={tariffCard === item.id}
                />
              ))}
            </div>
          </>
        </MobileModal>
      )}
    </div>
  )
}

export default FlightInfoCard
