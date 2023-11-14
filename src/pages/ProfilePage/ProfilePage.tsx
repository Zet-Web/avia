import { useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  AskQuestion,
  ProfileHeaderSection,
  ProfileLayout,
  ProfileSidebarTabs,
  SubscribeProfileSection,
  History,
  EditProfile,
  FavoritesProfileSection,
} from 'features'

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { cookies } from 'shared/utils/cookies'
import {
  selectIsAuth,
  userLogout,
  userMeRequested,
} from 'redux/slices/authSlice/authSlice'

import { routeListItemMock } from 'shared/mocks/mock_history'

import s from './profilePage.module.scss'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export const ProfilePage = () => {
  const { query, push } = useRouter()
  const { tab } = query
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const { t } = useTranslation(['meta'])

  // log out
  const handleLogout = async () => {
    await push('/?popup=login')
    cookies.remove('access_token')
    cookies.remove('refresh_token')
    dispatch(userLogout())
  }

  // get user data
  useEffect(() => {
    if (isAuth !== false) {
      dispatch(userMeRequested())
    }
  }, [isAuth])

  const getContent = (content: string | string[] | undefined) => {
    switch (content) {
      case 'history':
        return <History historyList={routeListItemMock} />
      case 'askQuestion':
        return <AskQuestion />
      case 'editProfile':
        return <EditProfile />
      case 'subscribeTicket':
        return <SubscribeProfileSection defaultIndex={1} />
      case 'subscribeRoute':
        return <SubscribeProfileSection />
      case 'favorites':
        return <FavoritesProfileSection />
      default:
        return <span>Favorites Section</span>
    }
  }
  return (
    <div className={s.container}>
      <Head>
        <title>{t('meta:titles.profile')}</title>
      </Head>
      <ProfileLayout
        sidebar={<ProfileSidebarTabs />}
        content={getContent(tab)}
        profile={<ProfileHeaderSection />}
        onLogout={handleLogout}
        secondVariant={tab === 'editProfile'}
      />
    </div>
  )
}
