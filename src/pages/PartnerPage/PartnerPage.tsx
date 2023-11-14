import { FeedbackForm } from 'features'
import { FC } from 'react'
import { footerSocials } from 'shared/mocks/mock_footer'
import { Social } from 'shared/types/footer'
import { PartnerProps } from 'shared/types/partner'
import { CompanySection } from './CompanySection'
import { HeaderSection } from './HeaderSection'
import s from './partnerPage.module.scss'
import { UniqueOffersSection } from './UniqueOffersSection'
import { WhyUsSection } from './WhyUsSection'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

export interface PartnerPageProps {
  content: PartnerProps
  socials: Social[]
}

export const PartnerPage: FC<PartnerPageProps> = ({
  content,
  socials,
}) => {
  const { t } = useTranslation(['meta'])
  return (
    <div className={s.wrapperPartner}>
      <Head>
        <title>{t('meta:titles.partners')}</title>
      </Head>
      <HeaderSection {...content?.headerSection} />
      <WhyUsSection {...content?.whyUsSection} />
      <CompanySection {...content?.companySection} />
      <UniqueOffersSection {...content?.UniqueOffersSection} />
      <FeedbackForm socials={socials} />
    </div>
  )
}
