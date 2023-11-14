import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Error from '/public/assets/images/404.svg'
import Arrow from '/public/assets/images/ArrowLeft.svg'

import s from './pageNotFound.module.scss'
import Head from 'next/head'

export const PageNotFound = () => {
  const route = useRouter()
  const { t } = useTranslation(['common', 'notFound', 'meta'])

  return (
    <div className={s.errorPage}>
      <Head>
        <title>{t('meta:titles.404')}</title>
      </Head>
      <div className={s.image}>
        <Error />
      </div>

      <h2 className={s.title}>{t('notFound:title')}</h2>

      <button className={s.buttonBack} onClick={() => route.back()}>
        <Arrow />
        {t('common:goBack')}
      </button>
    </div>
  )
}
