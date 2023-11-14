import { FC, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'

import { Checkboxes } from '../Checkboxes/Checkboxes'
import { ChangePriceModal } from '../TicketModals/ChangePriceModal/ChangePriceModal'

import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'
import { cookies } from 'shared/utils/cookies'

import s from './cardHeader.module.scss'

interface CardHeaderProps {
  airline_logos: string[]
  isBigMargin?: boolean
}

export const CardHeader: FC<CardHeaderProps> = ({
  airline_logos,
  isBigMargin = false,
}) => {
  const [isSubscribeSelected, setIsIsSubscribeSelected] =
    useState(false)
  const [isFavoriteSelected, setIsFavorite] = useState(false)
  const token = cookies.get('access_token')

  // TODO need connect
  const isSubscribe = (value: boolean) => {
    if (!token) {
      setIsIsSubscribeSelected(prevState => !prevState)
    }
  }

  // TODO need connect
  const isFavorite = (value: boolean) => {
    if (!token) {
      setIsFavorite(prevState => !prevState)
    }
  }
  // TODO need connect
  function isShare() {
    console.log('share')
  }

  return (
    <div
      className={cn(s.header, s.headerWithMargin, s.headerLg, {
        [s.headerWithBigMargin]: isBigMargin,
      })}
    >
      <div className={s.logo}>
        {airline_logos.map(logo => (
          <div className={s.airlineLogo} key={logo}>
            <Image
              src={getImageUrlWithBaseDomain(logo)}
              alt={'logo airline'}
              layout={'fill'}
            />
          </div>
        ))}
      </div>

      <Checkboxes
        isShare={isShare}
        isSubscribe={isSubscribe}
        isFavorite={isFavorite}
      />

      <ChangePriceModal
        isOpen={isSubscribeSelected}
        onClose={() => setIsIsSubscribeSelected(false)}
      />
    </div>
  )
}
