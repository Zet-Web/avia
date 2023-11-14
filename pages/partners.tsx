import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PartnerPage, PartnerPageProps } from 'pages/PartnerPage'
import { getFooterContent } from 'shared/api/routes/footer'
import { getPartnerContent } from 'shared/api/routes/partner'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const Partner: NextPage<PartnerPageProps> = ({
  content,
  socials,
}) => <PartnerPage content={content} socials={socials} />

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    const { data } = await getPartnerContent()
    const content = data.data.attributes

    const socials = (await getFooterContent()).data.data.attributes
      .soc_links

    return {
      props: {
        content,
        socials,
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'sectionSoon',
          'noTicketsSection',
          'route',
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

export default Partner
