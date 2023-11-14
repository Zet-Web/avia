import { FC } from 'react'

import { AboutUsSectionProps } from 'shared/types/aboutUs'
import Image from 'next/image'

import s from './aboutUsSection.module.scss'
import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'

export const AboutUsSection: FC<AboutUsSectionProps> = ({
  title,
  text,
  images,
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Image
          className={s.img}
          src={getImageUrlWithBaseDomain(images.data.attributes.url)}
          width={540}
          height={404}
          alt=''
        />

        <div className={s.content}>
          <h1 className={s.title}>{title}</h1>

          <p className={s.text}>{text}</p>
        </div>
      </div>
    </div>
  )
}
