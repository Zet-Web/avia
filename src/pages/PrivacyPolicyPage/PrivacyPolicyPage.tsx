import { FC } from 'react'
import { AxiosStrapiPrivacyPageResponse } from 'shared/api'
import { PrivacyListProps } from 'shared/types/privacy'

import {
  PrivacyItem,
  PrivacyPolicyList,
} from './PrivacyPolicyList/PrivacyPolicyList'

import s from './privacyPolicyPage.module.scss'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

export interface PrivacyPolicy {
  content: PrivacyListProps
}

export const PrivacyPolicyPage: FC<PrivacyPolicy> = ({ content }) => {
  const { t } = useTranslation(['meta'])
  return (
    <div className={s.privacyPolicyPage}>
      <Head>
        <title>{t('meta:titles.privacy')}</title>
      </Head>
      <div className={s.privacyWrap}>
        {content ? (
          <div
            className={s.title}
            dangerouslySetInnerHTML={{
              __html: content.title,
            }}
          />
        ) : null}

        {content ? (
          <div className={s.date}>
            Дата публикации: &nbsp;
            {new Date(content.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        ) : null}

        {content.privacyList.length ? (
          <PrivacyPolicyList privacyList={content.privacyList} />
        ) : null}
      </div>
    </div>
  )
}
