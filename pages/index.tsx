import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { MainPage } from 'pages'
import { MainBlogsContentProps } from 'pages/MainPage'
import { getBlogsContent } from 'shared/api/routes/blogs'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const Index: NextPage<MainBlogsContentProps> = ({ blogs }) => (
  <MainPage blogs={blogs} />
)

export default Index

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    const { data } = await getBlogsContent(ctx.locale, 6)
    const blogs = data.data
    return {
      props: {
        blogs,
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'advantagesSection',
          'header',
          'footer',
          'subscribe',
          'blogSelectionSection',
          'authModal',
          'changePassword',
          'askQuestion',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })
