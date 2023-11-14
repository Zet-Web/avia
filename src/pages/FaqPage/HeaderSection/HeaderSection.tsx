import type { FC } from 'react'
import Link from 'next/link'

import s from './headerSection.module.scss'

interface HeaderSectionProps {
  title: string
  description: string
  link: string
}

export const HeaderSection: FC<HeaderSectionProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>

      <p className={s.description}>
        {description}{' '}
        <Link href={'/'}>
          <a className={s.link}>{link}</a>
        </Link>
      </p>
    </div>
  )
}
