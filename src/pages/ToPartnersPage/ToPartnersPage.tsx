import { FC } from 'react'
import { toPartnersPageMock } from 'shared/mocks/mock_to_partners_page'
import HeaderSection from './HeaderSection/HeaderSection'
import WhyUsSection from './WhyUsSection/WhyUsSection'
import BenefitsSection from './BenefitsSection/BenefitsSection'
import UniqueOffersSection from './UniqueOffersSection/UniqueOffersSection'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

export const ToPartnersPage: FC = () => {
  const { t } = useTranslation(['meta'])
  return (
    <>
      <Head>
        <title>{t('meta:titles.toPartners')}</title>
      </Head>
      <HeaderSection {...toPartnersPageMock.headerSection} />
      <WhyUsSection {...toPartnersPageMock.whyUsSection} />
      <BenefitsSection {...toPartnersPageMock.benefitsSection} />
      <UniqueOffersSection
        {...toPartnersPageMock.uniqueOffersSection}
      />
    </>
  )
}
