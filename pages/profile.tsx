import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProfilePage } from 'pages'
import withAuth from 'shared/hoc/withAuth'
import createGetServerSideProps from 'shared/utils/createGetServerSideProps'

const ProfilePageWithAuth = withAuth(ProfilePage)

const Profile: NextPage = () => {
  return <ProfilePageWithAuth />
}
export default Profile

export const getServerSideProps: GetServerSideProps =
  createGetServerSideProps(async ctx => {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale ?? 'ru', [
          'common',
          'route',
          'header',
          'footer',
          'subscribe',
          'profilePage',
          'editProfile',
          'authModal',
          'changePassword',
          'askQuestion',
          'emailConfirm',
          'meta',
        ])),
      },
    }
  })
