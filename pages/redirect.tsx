import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { RedirectPage as Redirect } from 'pages'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const RedirectPage: NextPage = () => <Redirect />

export default RedirectPage

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
          'changePassword',
          'askQuestion',
          'ticket',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })
