import React, { FC } from 'react'

import Image from 'next/image'

import { SocialSection } from 'shared/types/blog'

import s from './socials.module.scss'

interface SocialsProps {
  socials: SocialSection[]
}

export const Socials: FC<SocialsProps> = ({ socials }) => {
  return (
    <div className={s.wrapper}>
      <ul className={s.socialList}>
        {socials?.map((social, id) => (
          <li key={id}>
            <a href={social.link} target='_blank' rel='noreferrer'>
              <Image
                // @ts-ignore TODO
                src={social.icon}
                width={30}
                height={30}
                alt={social.name}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
