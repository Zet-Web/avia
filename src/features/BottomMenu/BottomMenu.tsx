import React from 'react'
import Link from 'next/link'
import Search from '../../../public/assets/images/icons/bottomMenu/search.svg'
import Calendar from '../../../public/assets/images/icons/bottomMenu/calendar.svg'
import Favorite from '../../../public/assets/images/icons/bottomMenu/favorites.svg'
import Blog from '../../../public/assets/images/icons/bottomMenu/blog.svg'
import Profile from '../../../public/assets/images/icons/bottomMenu/profile.svg'

import s from './BottomMenu.module.scss'

const BottomMenu = () => {
  return (
    <div className={s.container}>
      <Link href='/'>
        <a className={s.menuItem}>
          <Search />
          <span className={s.text}>Поиск</span>
        </a>
      </Link>

      <Link href='/price_calendar' className={s.menuItem}>
        <a className={s.menuItem}>
          <Calendar />
          <span className={s.text}>Календарь</span>
        </a>
      </Link>

      <Link href='/subscribe'>
        <a className={s.menuItem}>
          <Favorite />
          <span className={s.text}>Подписки</span>
        </a>
      </Link>

      <Link href='/blog'>
        <a className={s.menuItem}>
          <Blog />
          <span className={s.text}>Блог</span>
        </a>
      </Link>

      <Link href='/profile'>
        <a className={s.menuItem}>
          <Profile />
          <span className={s.text}>Профиль</span>
        </a>
      </Link>
    </div>
  )
}
export default BottomMenu
