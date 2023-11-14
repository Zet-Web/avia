import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { ChangePassword, Login, SignUp, NewPassword } from 'features'
import { Tabs } from 'components'
import SideMenu from 'features/SideMenu/SideMenu'

import { Tab } from 'shared/types/tabs'

import s from './authModal.module.scss'

import { socialAuthButtons } from './constants'

interface AuthModalProps {
  isOpen?: boolean
  onYandexLogin?: () => void
  onOkLogin?: () => void
  onGoogleLogin?: () => void
  onVkLogin?: () => void
  onTelegramLogin?: () => void
  onClose?: () => void
}

export const AuthModal: FC<AuthModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter()
  const popup = router.query.popup
  const { t } = useTranslation(['authModal', 'common'])
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // auth modal tabs
  const tabs: Tab[] = [
    { title: 'Вход', index: 0, link: 'login' },
    { title: 'Регистрация', index: 1, link: 'signup' },
  ]

  // tab content components
  const content = [
    {
      component: <Login isMenuOpen={isMenuOpen} />,
      link: 'login',
    },
    {
      component: (
        // <div>{t('authModal:regSuccess')}</div>
        <SignUp isMenuOpen={isMenuOpen} />
      ),
      link: 'signup',
    },
  ]

  const yandexHandler = () => {
  }

  const okHandler = () => {
  }

  const googleHandler = () => {
  }

  const vkHandler = () => {
  }

  const telegramHandler = () => {
  }

  // remove query params
  const removeQueryParam = (param: string) => {
    const updatedQuery = router.query
    if (updatedQuery[param]) {
      delete updatedQuery[param]
      router.push(
        { pathname: router.pathname, query: updatedQuery },
        undefined,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        { shallow: true }
      )
    }
  }

  // close auth modal
  const handleClose = () => {
    removeQueryParam('popup')
    removeQueryParam('code')
    if (isForgotPassword) {
      setIsForgotPassword(false)
    }
  }

  // listener query popup and code to open or close menu
  useEffect(() => {
    if (popup) {
      setIsMenuOpen(true)
    } else {
      setIsMenuOpen(false)
    }
  }, [popup])

  return (
    <SideMenu
      isOpen={isMenuOpen}
      className={s.sideMenu}
      onClose={handleClose}
      hasCloseButton={true}
      isTableView={false}
    >
      {popup === 'forgot-password' ? (
        <ChangePassword />
      ) : (
        <Tabs
          content={content}
          tabs={tabs}
          defaultIndex={
            tabs.find(t => t.link === router.query.popup)?.index
          }
          hasLinkToggle
        />
      )}

      <div className={s.separator}>
        <span>{t('common:words.and')}</span>
      </div>
      <div className={s.loginWith}>
        <h1>{t('authModal:loginWith')}</h1>

        <ul className={s.socialsWrapper}>
          {socialAuthButtons.map((icon, index) => (
            <div key={index} className={s.link} onClick={yandexHandler}>
              <a className={s.socialLink}>
                <Image
                  src={icon.image}
                  alt={icon.alt}
                  width={48}
                  height={48}
                />
              </a>
            </div>
          ))}
        </ul>
      </div>
    </SideMenu>
  )
}
export default AuthModal
