import { GetServerSideProps, GetStaticProps, NextPage } from 'next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AdvertisingPage } from 'pages'
import { AdvertisingPageProps } from 'pages/AdvertisingPage'

import { getAdvertisingContent } from 'shared/api/routes/advertisingPage'
import { getFooterContent } from 'shared/api/routes/footer'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const Advertising: NextPage<AdvertisingPageProps> = ({
  content,
  socials,
}) => <AdvertisingPage content={content} socials={socials} />

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    const { data } = await getAdvertisingContent()
    const content = data.data.attributes

    const socials = await (
      await getFooterContent()
    ).data.data.attributes.soc_links

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

export default Advertising
