import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { FaqPage, FaqPageContentProps } from 'pages/FaqPage'
import { getFaqContent } from 'shared/api/routes/faqPage'
import { formatFaqContent } from 'shared/helpers/formatFaqContent'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const Faq: NextPage<FaqPageContentProps> = ({ content }) => (
  <FaqPage content={content} />
)

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    const { data } = await getFaqContent()
    const questions = data.data.attributes.questions

    return {
      props: {
        content: {
          questions: formatFaqContent(questions),
        },
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'faqPage',
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
export default Faq
