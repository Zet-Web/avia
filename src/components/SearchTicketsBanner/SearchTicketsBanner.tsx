import React, { FC } from 'react'
import cn from 'classnames'
import Image from 'next/image'

import s from './banner.module.scss'
import Link from 'next/link'

interface BannerProps {
  isRecomendSection?: boolean
}

const SearchTicketsBanner: FC<BannerProps> = ({
  isRecomendSection = false,
}) => {
  return (
    <div
      className={cn(s.baner, isRecomendSection ? s.forRecomend : '')}
    >
      <div className={s.content}>
        <div className={s.logo}>
          <Image
            alt='logo'
            width={37}
            height={22}
            src='/assets/images/LogoShortenWhite.svg'
          />
        </div>
        <h4 className={s.title}>Как добраться?</h4>
        <p className={s.subTitle}>Самолет, автобус или поезд?</p>
      </div>
      <div className={s.btn}>
        <Link href='/'>Найти билеты</Link>
      </div>
    </div>
  )
}

export default SearchTicketsBanner
