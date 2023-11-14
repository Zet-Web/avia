import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useState } from 'react'

import {
  AskQuestionModal,
  AuthModal,
  BottomMenu,
  CookiesPopup,
  Footer,
  Header,
  SearchTickets,
  Subscribe,
} from 'features'

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  acceptCookies,
  changeCurrency,
  changeLanguage,
  getGeoIp,
} from 'redux/slices/settingsSlice/settingsSlice'
import { getFooterContent } from 'shared/api/routes/footer'
import { getGeoCitiesIp } from 'shared/api/routes/geo'

import {
  withoutSearchTicketRoutes,
  withoutSubscribeRoutes,
} from 'shared/constants/withoutRoutes'
import { Currency, Language } from 'shared/types'

import s from './Layout.module.scss'
import { cookies } from 'shared/utils/cookies'
import {
  loginUserWithToken,
  userLogoutSuccess,
} from 'redux/slices/authSlice/authSlice'
import { laptop } from 'shared/constants/breakpoints'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { hasBottomMenu } from './helpers'

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { width } = useWindowDimensions()

  const isNotDesktop = width < laptop

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { currency, language, cookieAccess } = useAppSelector(
    state => state.settings
  )

  const handleLanguageChange = (newLanguage: string) => {
    dispatch(changeLanguage(newLanguage as Language))
    router.locale = newLanguage
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      router.asPath,
      { locale: newLanguage.toLowerCase() }
    )
  }

  const handleCurrencyChange = (newCurrency: string) => {
    dispatch(changeCurrency(newCurrency as Currency))
  }

  const findPath = (element: string) => {
    return router.pathname.startsWith(element)
  }

  const withoutSubscribe = withoutSubscribeRoutes.find(findPath)

  const withoutSearchTicket = withoutSearchTicketRoutes.find(findPath)

  const [footerContent, setFooterContent] = useState<any>()

  const getContent = async () => {
    const footerContent = await getFooterContent()
    if (footerContent && footerContent.data) {
      setFooterContent(footerContent.data.data)
    } else {
      // данные не получены
    }
  }

  const handleCookiesAccept = () => {
    dispatch(acceptCookies())
  }

  useEffect(() => {
    getContent()
    dispatch(changeLanguage(router.locale?.toUpperCase() as Language))

    const access_token = cookies.get('access_token'),
      refresh_token = cookies.get('refresh_token')

    if (access_token && refresh_token) {
      dispatch(
        loginUserWithToken({
          access_token,
          refresh_token,
        })
      )
    }
    if (!refresh_token) {
      dispatch(userLogoutSuccess())
    }
  }, [])

  useEffect(() => {
    if (cookieAccess) {
      const data = getGeoCitiesIp(language)
      data.then(res => {
        if (res && res.data) {
          dispatch(getGeoIp(res.data))
        } else {
          // данные не получены
        }
      })
    }
  }, [cookieAccess])

  return (
    <div>
      <Header
        currency={currency}
        language={language}
        user={null}
        onCurrencyChange={handleCurrencyChange}
        onLanguageChange={handleLanguageChange}
      />
      {!withoutSearchTicket && (
        <div className={cn(s.searchTicketsHome)}>
          <div
            className={cn(s.wrapperSearchTickets, {
              [s.searchTickets]: router.pathname !== '/',
            })}
          >
            <SearchTickets />
          </div>
        </div>
      )}

      <main
        className={cn(s.container, {
          [s.clearMargin]: router.pathname.includes('/tickets'),
        })}
      >
        <div className={s.content}>{children}</div>
      </main>

      {!withoutSubscribe && <Subscribe />}

      {isNotDesktop && hasBottomMenu(router.pathname) && (
        <BottomMenu />
      )}

      <Footer
        columns={footerContent?.attributes.columns}
        soc_links={footerContent?.attributes.soc_links}
      />

      <AuthModal />
      <AskQuestionModal  isOpen={false}/>

      <CookiesPopup
        isOpen={!cookieAccess}
        onClose={handleCookiesAccept}
      />
    </div>
  )
}
