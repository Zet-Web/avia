import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ToPartnersPage } from 'pages'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const ToPartners: NextPage = () => <ToPartnersPage />

export default ToPartners

export const getStaticProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'header',
          'footer',
          'subscribe',
          'authModal',
          'askQuestion',
          'changePassword',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })
