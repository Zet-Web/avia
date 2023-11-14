import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { Slider } from 'components/Slider/Slider'
import { bigMobile, tablet } from 'shared/constants/breakpoints'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'

import Advantages1 from '/public/assets/images/Advantages1.svg'
import Advantages2 from '/public/assets/images/Advantages2.svg'
import Advantages3 from '/public/assets/images/Advantages3.svg'

import s from './advantagesSection.module.scss'
import { AdvantageCard } from './AdvantageCard'

const AdvantagesSection: FC = () => {
  const { width } = useWindowDimensions()
  const { t } = useTranslation(['common', 'advantagesSection'])

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.title}>{t('advantagesSection:title')}</h1>

        <p className={s.description}>
          {t('advantagesSection:description')}
        </p>
        {width > tablet ? (
          <div className={s.cardsWrapper}>
            <AdvantageCard
              image={<Advantages1 className={s.cardImage} />}
              title={t('advantagesSection:bestPrices')}
              description={t(
                'advantagesSection:bestPricesDescription'
              )}
            />
            <AdvantageCard
              image={<Advantages2 className={s.cardImage} />}
              title={t('advantagesSection:allWorldSearch')}
              description={t(
                'advantagesSection:allWorldSearchDescription'
              )}
            />
            <AdvantageCard
              image={<Advantages3 className={s.cardImage} />}
              title={t('advantagesSection:verifiedSuppliers')}
              description={t(
                'advantagesSection:verifiedSuppliersDescription'
              )}
            />
          </div>
        ) : (
          <Slider
            slidesPerView={width > bigMobile ? 2 : 1}
            hasPagination
            classname={s.advantagesSlider}
            spaceBetween={25}
          >
            {[
              <AdvantageCard
                image={<Advantages1 className={s.cardImage} />}
                title={t('advantagesSection:bestPrices')}
                description={t(
                  'advantagesSection:bestPricesDescription'
                )}
                key={1}
              />,
              <AdvantageCard
                image={<Advantages2 className={s.cardImage} />}
                title={t('advantagesSection:allWorldSearch')}
                description={t(
                  'advantagesSection:allWorldSearchDescription'
                )}
                key={2}
              />,
              <AdvantageCard
                image={<Advantages3 className={s.cardImage} />}
                title={t('advantagesSection:verifiedSuppliers')}
                description={t(
                  'advantagesSection:verifiedSuppliersDescription'
                )}
                key={3}
              />,
            ]}
          </Slider>
        )}
      </div>
    </div>
  )
}

export default AdvantagesSection
