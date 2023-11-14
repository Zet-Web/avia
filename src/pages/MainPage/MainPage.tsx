import { FC } from 'react'

import {
  AdvantagesSection,
  BlogSelectionSection,
  RecommendSection,
  SpecialOffersSection,
} from 'features'

import { BlogsContentProps } from 'shared/types/blogs'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

export interface MainBlogsContentProps {
  blogs: BlogsContentProps[]
}

export const MainPage: FC<MainBlogsContentProps> = ({ blogs }) => {
  const { t } = useTranslation(['meta'])

  return (
    <>
      <Head>
        <title>{t('meta:titles.index')}</title>
      </Head>
      <RecommendSection />
      <AdvantagesSection />
      <SpecialOffersSection />
    </>
  )
}
