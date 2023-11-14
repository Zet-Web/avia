import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TechnicalWorksPage as TechnicalWorks } from 'pages'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const TechnicalWorksPage: NextPage = () => <TechnicalWorks />

export default TechnicalWorksPage

export const getStaticProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'technicalWorks',
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
