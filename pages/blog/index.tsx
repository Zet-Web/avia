import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BlogsPage, BlogsPageProps } from 'pages/BlogsPage'
import { getBlogsContent } from 'shared/api/routes/blogs'
import { getTags } from 'shared/api/routes/tags'
import { BLOG_PAGINATION_COUNT } from 'shared/constants/pagination'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const Blogs: NextPage<BlogsPageProps> = ({ blogs, tags }) => (
  <BlogsPage blogs={blogs} tags={tags} />
)

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    const { data } = await getBlogsContent(
      ctx.locale,
      BLOG_PAGINATION_COUNT
    )
    const blogs = data.data

    const tags = (await getTags()).data.data.attributes.Tags

    return {
      props: {
        blogs,
        tags,
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'sectionSoon',
          'noTicketsSection',
          'route',
          'header',
          'footer',
          'subscribe',
          'blogSearchModal',
          'blogSection',
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

export default Blogs
