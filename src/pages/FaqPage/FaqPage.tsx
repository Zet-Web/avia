import type { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { QuestionsSection } from './QuestionsSection'
import { HeaderSection } from './HeaderSection'
import { FooterSection } from './FooterSection'

import type { Question } from 'shared/types/faq'

import s from './faqPage.module.scss'
import Head from 'next/head'

export interface FaqPageContentProps {
  content: {
    questions: Question[]
  }
}

export const FaqPage: FC<FaqPageContentProps> = ({ content }) => {
  const { t } = useTranslation(['common', 'faqPage', 'meta'])
  return (
    <div className={s.wrapper}>
      <Head>
        <title>{t('meta:titles.faq')}</title>
      </Head>
      <HeaderSection
        title={t('faqPage:header.title')}
        description={t('faqPage:header.description')}
        link={t('faqPage:header.link')}
      />

      <QuestionsSection questions={content.questions} />

      <FooterSection
        title={t('faqPage:footer.title')}
        description={t('faqPage:footer.description')}
        link={t('faqPage:footer.link')}
      />
    </div>
  )
}
