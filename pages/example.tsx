import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ExamplePage as Example } from 'pages'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const ExamplePage: NextPage = () => <Example />

export default ExamplePage

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'sectionSoon',
          'noTicketsSection',
          'route',
          'header',
          'footer',
          'subscribe',
          'redirectingModal',
          'blogSearchModal',
          'subscribeConfirmModal',
          'authModal',
          'viewSubscribeModal',
          'blogSelectionSection',
          'emailConfirm',
          'askQuestion',
          'blogPage',
          'ThankYouPopup',
          'editProfile',
          'changePassword',
          'profilePage',
          'authActionModal',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })
