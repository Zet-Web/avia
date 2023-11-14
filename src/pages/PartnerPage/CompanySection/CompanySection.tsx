import Image from 'next/image'
import { FC } from 'react'
import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'
import { PartnerCompanySection } from 'shared/types/partner'
import s from './companySection.module.scss'

export const CompanySection: FC<PartnerCompanySection> = ({
  title,
  subtitle,
  cardInfoBenefit,
}) => {
  return (
    <div className={s.wrapperCompany}>
      <div className={s.companyContent}>
        <div className={s.companyText}>
          <div className={s.companyTitle}>{title}</div>
          <div className={s.companySubtitle}>{subtitle}</div>
        </div>
        <div className={s.companyCards}>
          {cardInfoBenefit.map(item => (
            <div className={s.card} key={item.id}>
              <div className={s.cardheader}>
                <Image
                  src={getImageUrlWithBaseDomain(
                    item.image.data.attributes.url
                  )}
                  width={30}
                  height={26}
                />{' '}
                {item.title}
              </div>
              <div className={s.cardText}>{item.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
