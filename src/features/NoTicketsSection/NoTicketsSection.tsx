import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import noTickets from '/public/assets/images/noTickets.png'

import cn from 'classnames'
import s from './noTicketsSection.module.scss'

type Variant = 'noTicket' | 'noSection' | 'invalidFilter'

interface NoTicketsSectionProps {
  variant?: Variant
  isAviaSelected?: boolean
  isTrainSelected?: boolean
  isBusSelected?: boolean
  className?: string
}

const NoTicketsSection: FC<NoTicketsSectionProps> = ({
  variant = 'noTicket',
  isBusSelected,
  isAviaSelected,
  isTrainSelected,
  className,
}) => {
  const { t } = useTranslation('noTicketsSection')

  const renderSection = () => {
    switch (variant) {
      case 'noSection':
        return (
          <>
            <div className={s.title}>
              <h1>
                {t('titleNoSection')}{' '}
                {(isAviaSelected ? <>{t('aviaText')}</> : null) ||
                  (isTrainSelected ? <>{t('trainText')}</> : null) ||
                  (isBusSelected ? <>{t('busText')}</> : null)}{' '}
                {t('titleNoSection_2')}
              </h1>
            </div>

            <div className={s.reason}>
              <p className={s.reasonTitle}>
                {t('weWorkThisProblem')}
              </p>

              <p className={s.SelectAnother}>{t('changeAnother')}</p>
            </div>
          </>
        )
      case 'noTicket':
        return (
          <>
            <h1>{t('title')}</h1>

            <div className={s.reason}>
              <p className={s.reasonTitle}>{t('reasonTitle')}</p>

              <div className={s.reasonsContent}>
                <p>{t('reasons.wrongDate')}</p>
                <p>{t('reasons.ticketsSold')}</p>
              </div>

              <p className={s.SelectAnother}>{t('selectAnother')}</p>
            </div>
          </>
        )

      case 'invalidFilter':
        return (
          <>
            <h1>{t('title')}</h1>

            <div className={s.reason}>
              <p className={s.reasonTitle}>{t('reasonTitle')}</p>

              <div className={s.reasonsContent}>
                <p className={s.SelectAnother}>
                  {t('invalidFilter')}
                </p>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className={cn(s.wrapper, className)}>
      <div className={s.container}>
        <div className={s.content}>{renderSection()}</div>

        <div className={s.image}>
          <Image
            src={noTickets.src}
            width={540}
            height={405}
            objectFit='contain'
            alt=''
          />
        </div>
      </div>
    </div>
  )
}

export default NoTicketsSection
