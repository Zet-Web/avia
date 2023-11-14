import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { BlogPage, BlogPageProps } from 'pages/BlogPage'
import {
  getBlogComments,
  getBlogContent,
} from 'shared/api/routes/blog'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const Blog: NextPage<BlogPageProps> = ({ content, comment }) => (
  <BlogPage content={content} comment={comment} /> // TODO
)

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    const { id } = ctx.query
    const blogId = Number(id)

    const { data } = await getBlogContent(ctx.locale, blogId)

    const comment = (await getBlogComments(blogId)).data

    const content = data.data

    return {
      props: {
        content,
        comment,
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'header',
          'footer',
          'subscribe',
          'blogPage',
          'authModal',
          'askQuestion',
          'changePassword',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })

export default Blog
