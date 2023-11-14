import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { Transfer } from 'shared/types'

import noTickets from '/public/assets/images/noTickets.png'
import s from './sectionSoon.module.scss'

interface SectionSoonProps {
  transfer: Transfer
}

const SectionSoon: FC<SectionSoonProps> = ({ transfer }) => {
  const { t } = useTranslation('sectionSoon')
  const getTitle = (transfer: Transfer): string => {
    switch (transfer) {
      case Transfer.TRAIN:
        return 'title.train'
      case Transfer.BUS:
        return 'title.bus'
      case Transfer.AVIA:
      default:
        return 'title.avia'
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.content}>
          <h1>{t(getTitle(transfer))}</h1>
          <p>{t('workInProgress')}</p>
          <p>{t('selectAnother')}</p>
        </div>
        <div className={s.image}>
          <Image
            src={noTickets.src}
            width={540}
            height={405}
            objectFit='contain'
          />
        </div>
      </div>
    </div>
  )
}

export default SectionSoon
