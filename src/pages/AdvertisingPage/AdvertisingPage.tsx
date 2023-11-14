import { FeedbackForm } from 'features'
import { FC } from 'react'
import { AdvertisingPageAttributesProps } from 'shared/types/advertising'
import { Social } from 'shared/types/footer'
import s from './advertisingPage.module.scss'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

export interface AdvertisingPageProps {
  content: AdvertisingPageAttributesProps
  socials: Social[]
}

export const AdvertisingPage: FC<AdvertisingPageProps> = ({
  content,
  socials,
}) => {
  const { t } = useTranslation(['meta'])
  return (
    <>
      <Head>
        <title>{t('meta:titles.advertising')}</title>
      </Head>
      <div className={s.wrapper}>
        <div className={s.headerSection}>
          <div className={s.headerTitle}>{content.title}</div>
          <div
            className={s.headerSubtitle}
            dangerouslySetInnerHTML={{
              __html: content.subtitle,
            }}
          />
        </div>
        <div className={s.priceInfo}>
          {content.item_section.map((item, idx) => (
            <div key={idx} className={s.itemSection}>
              <div className={s.itemTitle}>{item.title}</div>
              <div key={idx} className={s.content}>
                {item.content.map((item, idx) => (
                  <div key={idx} className={s.itemContent}>
                    {' '}
                    <div className={s.item}>{item.item}</div>{' '}
                    <div
                      className={s.textItem}
                      dangerouslySetInnerHTML={{
                        __html: item.text_item,
                      }}
                    />
                    <div className={s.priceItem}>
                      {item.price_item}
                    </div>{' '}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={s.feedbackForm}>
        <FeedbackForm socials={socials} />
      </div>
    </>
  )
}
