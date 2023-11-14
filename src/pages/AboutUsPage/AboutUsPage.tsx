import { FC } from 'react'
import { AxiosStrapiAboutUsResponse } from 'shared/api'

import { AboutUsSection } from './AboutUsSection'
import { HistorySection } from './HistorySection'
import { Quote } from './Quote'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export interface AboutUsPageProps {
  content: AxiosStrapiAboutUsResponse
}

export const AboutUsPage: FC<AboutUsPageProps> = ({ content }) => {
  const { t } = useTranslation(['meta'])
  return (
    <>
      <Head>
        <title>{t('meta:titles.aboutUs')}</title>
      </Head>
      <AboutUsSection {...content?.aboutUsSection} />
      <HistorySection {...content?.historySection} />
      <Quote {...content?.quoteSection} />
    </>
  )
}
