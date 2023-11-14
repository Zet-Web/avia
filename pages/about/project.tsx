import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AboutProjectPage } from 'pages'
import { AboutProjectContentProps } from 'pages/AboutProjectPage'
import { getAboutProjectContent } from 'shared/api/routes/aboutProject'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const AboutProject: NextPage<AboutProjectContentProps> = ({
  content,
}) => <AboutProjectPage content={content} />

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    const { data } = await getAboutProjectContent()
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
          'askQuestion',
          'changePassword',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })

export default AboutProject
