import { FC, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'

import { Logo } from 'components'
import { Avatar, BurgerMenu } from 'features'
import DropdownMenu from '../DropdownMenu/DropdownMenu'

import { useClickOutside } from 'shared/hooks/useClickOutside'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'

import { Currency, Language } from 'shared/types'
import { User } from 'shared/types/user'
import { laptop } from 'shared/constants/breakpoints'

import { getCurrencyIcon } from 'shared/helpers/currency/getCurrencyIcon'
import { getLanguageIcon } from 'shared/helpers/getLanguageIcon'

import PenIcon from '/public/assets/images/icons/Header/pen.svg'
import CalendarIcon from '/public/assets/images/icons/Header/calendar.svg'
import BurgerIcon from '/public/assets/images/icons/Header/menu.svg'
import CloseIcon from '/public/assets/images/icons/closeIcon 2.svg'

import s from './header.module.scss'
import { useAppSelector } from 'redux/hooks'
import { selectIsAuth } from '../../redux/slices/authSlice/authSlice'

interface HeaderProp {
  user: User | null
  currency: Currency
  language: Language
  onCurrencyChange: (newCurrency: string) => void
  onLanguageChange: (newLanguagey: string) => void
}

const Header: FC<HeaderProp> = ({
  user,
  currency = Currency.RUB,
  language = Language.RU,
  onCurrencyChange,
  onLanguageChange,
}) => {
  const router = useRouter()
  const isAuth = useAppSelector(selectIsAuth)
  const { t } = useTranslation(['header'])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLLIElement>(null)
  const { width } = useWindowDimensions()
  const isBurgerMenuAvailable = width < laptop
  const [currentDropdown, setCurrentDropdown] = useState({
    isCurrencySelected: false,
    isLanguageSelected: false,
  })

  const handleCurrencyClose = () => {
    setCurrentDropdown(prevState => ({
      isLanguageSelected: false,
      isCurrencySelected: !prevState.isCurrencySelected,
    }))
  }

  const handleLanguageClose = () => {
    setCurrentDropdown(prevState => ({
      isCurrencySelected: false,
      isLanguageSelected: !prevState.isLanguageSelected,
    }))
  }

  const handleDropdownsClose = () => {
    if (
      currentDropdown.isCurrencySelected ||
      currentDropdown.isLanguageSelected
    ) {
      setCurrentDropdown({
        isCurrencySelected: false,
        isLanguageSelected: false,
      })
    }
  }

  const handleAuthMenuOpen = () => {
    if (isAuth !== false) {
      router.push('/profile')
    } else {
      router.query.popup = 'login'
      router.push(router)
    }
  }

  useClickOutside(overlayRef, handleDropdownsClose)

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <Link href='/'>
            <a>
              <Logo variant='secondary' />
            </a>
          </Link>
        </div>

        {isBurgerMenuAvailable ? (
          <>
            {isMenuOpen ? (
              <button
                className={s.button}
                onClick={() => setIsMenuOpen(false)}
              >
                <CloseIcon />
              </button>
            ) : (
              <button
                className={s.button}
                onClick={() => setIsMenuOpen(true)}
              >
                <BurgerIcon />
              </button>
            )}
          </>
        ) : (
          <nav>
            <ul className={s.navList}>
              <li className={s.navItem}>
                <Link href='/blog'>
                  {/*// TODO wait page links, sidebar*/}
                  <a>
                    <div>
                      <PenIcon />
                      {t('header:blog')}
                    </div>
                  </a>
                </Link>

                <Link href='/price_calendar'>
                  <a>
                    <div>
                      <CalendarIcon />
                      {t('header:priceCalendar')}
                    </div>
                  </a>
                </Link>
              </li>

              <li className={s.navItem} ref={overlayRef}>
                <div className={s.dropMenu}>
                  <div
                    className={s.dropBtnCurrency}
                    onClick={handleCurrencyClose}
                  >
                    {getCurrencyIcon(currency)}
                  </div>
                  <div
                    className={cn(s.dropdown, {
                      [s.isOpen]: currentDropdown.isCurrencySelected,
                    })}
                  >
                    <DropdownMenu
                      menu={'currency'}
                      currentAccordion='currency'
                      currentCurrency={currency}
                      onClick={onCurrencyChange}
                    />
                  </div>
                </div>

                <div className={s.dropMenu}>
                  <div
                    onClick={handleLanguageClose}
                    className={s.dropBtn}
                  >
                    {getLanguageIcon(language)}
                  </div>
                  <div
                    className={cn(s.dropdown, {
                      [s.isOpen]: currentDropdown.isLanguageSelected,
                    })}
                  >
                    <DropdownMenu
                      menu={'language'}
                      currentLanguage={language}
                      onClick={onLanguageChange}
                    />
                  </div>
                </div>
              </li>

              <li className={s.navItem}>
                <div className={s.auth} onClick={handleAuthMenuOpen}>
                  <Avatar user={user} />
                </div>
              </li>
            </ul>
          </nav>
        )}

        {isBurgerMenuAvailable && (
          <div className={s.burgerMenuContainer}>
            <BurgerMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
