import Image from 'next/image'
import { FC, ReactNode } from 'react'

import s from './headerSection.module.scss'

interface HeaderSectionProps {
  title: ReactNode
  text: ReactNode
  img: string
}

const HeaderSection: FC<HeaderSectionProps> = ({
  title,
  text,
  img,
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.content}>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <Image
          src={img}
          width={540}
          height={390}
          className={s.image}
        />
      </div>
    </div>
  )
}

export default HeaderSection
