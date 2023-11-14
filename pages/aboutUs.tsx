import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AboutUsPage, AboutUsPageProps } from 'pages/AboutUsPage'
import { getAboutUsContent } from 'shared/api/routes/aboutUs'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const AboutUs: NextPage<AboutUsPageProps> = ({ content }) => (
  <AboutUsPage content={content} />
)

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    const { data } = await getAboutUsContent()
    const content = data.data.attributes

    return {
      props: {
        content,
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'header',
          'footer',
          'subscribe',
          'blogSearchModal',
          'subscribeConfirmModal',
          'authModal',
          'changePassword',
          'askQuestion',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })

export default AboutUs
