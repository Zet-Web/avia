import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Error from '/public/assets/images/error.svg'
import Arrow from '/public/assets/images/ArrowLeft.svg'

import s from './errorPage.module.scss'
import Head from 'next/head'

export const ErrorPage = () => {
  const route = useRouter()
  const { t } = useTranslation(['common', 'errorPage'])

  return (
    <div className={s.errorPage}>
      <Head>
        <title>{t('meta:titles.500')}</title>
      </Head>
      <div className={s.image}>
        <Error />
      </div>

      <h2 className={s.title}>{t('errorPage:title')}</h2>

      <p className={s.subTitle}>
        {t('errorPage:subtitleLine1')} <br />{' '}
        {t('errorPage:subtitleLine2')}
      </p>
      <button className={s.buttonBack} onClick={() => route.back()}>
        <Arrow />
        {t('common:goBack')}
      </button>
    </div>
  )
}
