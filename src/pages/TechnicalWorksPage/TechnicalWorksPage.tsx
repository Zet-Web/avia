import { FC } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import TechnicalWorks from '/public/assets/images/TechnicalWorks.svg'
import ArrowPointLeft from '/public/assets/images/ArrowPointLeft.svg'

import s from './technicalWorksPage.module.scss'
import Head from 'next/head'

export const TechnicalWorksPage: FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'technicalWorks', 'meta'])

  return (
    <div className={s.container}>
      <Head>
        <title>{t('meta:titles.technicalWorks')}</title>
      </Head>
      <TechnicalWorks className={s.image} />
      <div className={s.content}>
        <h2>{t('technicalWorks:title')}</h2>
        <p>{t('technicalWorks:text')}</p>
        <div className={s.redirect} onClick={() => router.back()}>
          <ArrowPointLeft className={s.arrowIcon} />
          <span>{t('common:goBack')}</span>
        </div>
      </div>
    </div>
  )
}
