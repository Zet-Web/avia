import { FC } from 'react'

import PushModal from 'features/Ticket/TicketModals/PushModal/PushModal'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

export const RedirectPage: FC = () => {
  const { t } = useTranslation(['meta'])
  return (
    <>
      <Head>
        <title>{t('meta:titles.redirect')}</title>
      </Head>
      <PushModal />
    </>
  )
}
