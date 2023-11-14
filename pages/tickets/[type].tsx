import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TicketSearchPage } from 'pages'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const TicketSearch: NextPage = () => <TicketSearchPage />

export default TicketSearch

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'header',
          'footer',
          'authModal',
          'changePassword',
          'subscribe',
          'noTicketsSection',
          'askQuestion',
          'ticket',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })
