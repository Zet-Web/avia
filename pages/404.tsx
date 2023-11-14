import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PageNotFound } from 'pages'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const Page404: NextPage = () => <PageNotFound />

export default Page404

export const getStaticProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'notFound',
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
