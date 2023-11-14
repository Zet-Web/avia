import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorPage } from 'pages'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const ServerError: NextPage = () => <ErrorPage />

export default ServerError

export const getStaticProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'errorPage',
          'header',
          'footer',
          'subscribe',
          'authModal',
          'changePassword',
          'askQuestion',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })
