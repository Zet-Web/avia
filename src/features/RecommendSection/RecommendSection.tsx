import React from 'react'
import { StaticImageData } from 'next/image'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Image from 'next/image'
import s from './RecommendSection.module.scss'
import { cards } from 'shared/mocks/mock_recommend_cards'

export interface RecommendSectionProps {
  href: string
  tag: string
  text: string
  image: StaticImageData
}

const RecommendSection = () => {
  const { t } = useTranslation(['recommend'])
  return (
    <section className={s.container}>
      <div className={s.headerContent}>
        <div className={s.headerTitle}>{t('recommend:title')}</div>
        <div className={s.headerSubtitle}>{t('recommend:text')}</div>
      </div>
      <div className={s.grid}>
        {cards.map(item => {
          return (
            <Link href={item.href} key={item.tag}>
              <a className={s.card}>
                <div className={s.content}>
                  <span className={s.tag}> {item.tag}</span>
                  <span className={s.text}>{item.text}</span>
                </div>
                <div className={s.imageWrapper}>
                  <Image src={item.image} alt='picture' />
                </div>
              </a>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default RecommendSection
