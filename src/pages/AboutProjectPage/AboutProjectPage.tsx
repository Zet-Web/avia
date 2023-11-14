import { FC } from 'react'
import { AxiosStrapiAboutProjectContentResponse } from 'shared/api'
import s from './aboutProjectPage.module.scss'
import { FaqSection } from './FaqSection'
import { HeaderSection } from './HeaderSection'
import { TitleQuoteSection } from './TitleQuoteSection'
import { HowToContact } from 'features'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

export interface AboutProjectContentProps {
  content: AxiosStrapiAboutProjectContentResponse
}

export const AboutProjectPage: FC<AboutProjectContentProps> = ({
  content,
}) => {
  const { t } = useTranslation(['meta'])
  return (
    <div className={s.wrapper}>
      <Head>
        <title>{t('meta:titles:aboutProject')}</title>
      </Head>
      <HeaderSection {...content?.HeaderSection} />
      <TitleQuoteSection {...content?.titleQuote} />
      <FaqSection {...content?.faq_section} />
      <HowToContact />
    </div>
  )
}
