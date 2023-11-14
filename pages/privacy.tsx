import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PrivacyPolicyPage } from 'pages'
import { PrivacyPolicy } from 'pages/PrivacyPolicyPage'
import { getPrivacyContent } from 'shared/api/routes/privacy'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const Privacy: NextPage<PrivacyPolicy> = ({ content }) => (
  <PrivacyPolicyPage content={content} />
)

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    const { data } = await getPrivacyContent()
    const content = data.data.attributes

    return {
      props: {
        content,
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
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
export default Privacy
