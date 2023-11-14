import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PriceCalendarPage } from 'pages/PriceCalendarPage'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const PriceCalendar: NextPage = () => <PriceCalendarPage />

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'header',
          'footer',
          'subscribe',
          'priceCalendarPage',
          'noTicketsSection',
          'authModal',
          'askQuestion',
          'changePassword',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })
export default PriceCalendar
