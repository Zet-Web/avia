import React, { FC } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'

import { FooterColumn, Social } from 'shared/types/footer'

import s from './footer.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface FooterProps {
  columns: FooterColumn[]
  soc_links: Social[]
}

const Footer: FC<FooterProps> = ({ columns, soc_links }) => {
  const { t } = useTranslation(['footer'])
  const router = useRouter()

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.mainContent}>
          <div className={s.links}>
            {columns?.map((block, idx) => (
              <div className={s.linksBlock} key={idx}>
                <h1 className={s.blockTitle}>
                  {block.title.toUpperCase()}
                </h1>

                <ul className={s.linksList}>
                  {block.links.map((link, idx) => (
                    <Link
                      href={
                        link.link[0] === '?'
                          ? router.asPath + link.link
                          : link.link
                      }
                      key={idx}
                      shallow
                    >
                      <a className={s.link}>{link.name}</a>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={s.socials}>
            <h1 className={s.blockTitle}>
              {t('footer:socNetworks')}
            </h1>
            <ul className={s.socialsWrapper}>
              {soc_links?.map(
                (social, idx: React.Key | null | undefined) => {
                  return (
                    <div className={s.link} key={idx}>
                      <span className={s.iconWrapper}>
                        <Image
                          src={getImageUrlWithBaseDomain(
                            social.icon.data.attributes.url
                          )}
                          width={16}
                          height={16}
                          alt={`${social.name} title`}
                        />
                      </span>

                      <Link href={social.link}>
                        <a className={s.socialLink}>{social.link}</a>
                      </Link>
                    </div>
                  )
                }
              )}
            </ul>
          </div>
        </div>

        <div className={s.copyright}>
          <span key={1}>{t('footer:copyright')}</span>

          <span className={s.iconsMadeBy} key={2}>
            Icons made by Freepik, Google, Pixel perfect from
            www.flaticon.com
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
