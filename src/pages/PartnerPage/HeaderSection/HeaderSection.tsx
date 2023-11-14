import Image from 'next/image'
import { FC } from 'react'
import { StrapiImageType } from 'shared/api'
import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'
import s from './headerSection.module.scss'

interface HeaderSectionProps {
  title: string
  subtitle: string
  image: StrapiImageType
}

export const HeaderSection: FC<HeaderSectionProps> = ({
  title,
  subtitle,
  image,
}) => {
  return (
    <div className={s.headerSection}>
      <div className={s.headerText}>
        <div className={s.headerTitle}>{title}</div>
        <div className={s.headerSubtitle}>{subtitle}</div>
      </div>
      <Image
        src={getImageUrlWithBaseDomain(image.data.attributes.url)}
        width={539}
        height={390}
      />
    </div>
  )
}
