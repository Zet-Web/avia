import { FC, useState } from 'react'

import cn from 'classnames'

import {
  authorizedBottomItems,
  authorizedTopItems,
  MenuItems,
  MenuItemValue,
  topItems,
} from '../../../shared/constants/sideMenu'

import s from '../dropdownMenu.module.scss'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cookies } from 'shared/utils/cookies'
import {
  selectIsAuth,
  userLogout,
} from 'redux/slices/authSlice/authSlice'

type MenuItemProps = {
  handleClick: () => void
  isActive: boolean
  link?: string
} & MenuItemValue

const MenuItem = (props: MenuItemProps) => {
  const { handleClick, isActive, title, icon, link, label } = props
  const router = useRouter()

  const handleCabinetClick = () => {
    router.query.popup = 'login'
    router.push(router)

    handleClick?.()
  }

  return label !== 'cabinet' ? (
    <Link href={link}>
      <div
        onClick={handleClick}
        className={cn(s.menuItem, {
          [s.activeUpMenu]: isActive,
        })}
      >
        {icon}
        <p>{title}</p>
      </div>
    </Link>
  ) : (
    <div
      onClick={handleCabinetClick}
      className={cn(s.menuItem, {
        [s.activeUpMenu]: isActive,
      })}
    >
      {icon}
      <p>{title}</p>
    </div>
  )
}
interface TopMenuProps {
  onClick: () => void
}
export const TopMenu: FC<TopMenuProps> = ({ onClick }) => {
  const isAuthorized = useAppSelector(selectIsAuth)
  const [activeItem, setActiveMenuItem] = useState<MenuItems | null>(
    null
  )
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const handleMenuClick = (val: MenuItems) => () => {
    setActiveMenuItem(val)
    onClick()
  }

  const handleLogout = async () => {
    await push('/?popup=login')
    await cookies.remove('access_token')
    await sessionStorage.clear()
    await dispatch(userLogout())
  }

  return isAuthorized ? (
    <>
      <div className={s.menu}>
        {authorizedTopItems.map(item => (
          <MenuItem
            key={item.label}
            label={item.label}
            handleClick={handleMenuClick(item.label)}
            isActive={item.label === activeItem}
            icon={item.icon}
            title={item.title}
            link={item.link}
          />
        ))}
        <button onClick={() => handleLogout()} className={s.logout}>
          Выйти
          <div className={s.iconLogout} />
        </button>
      </div>
      <div className={s.menu}>
        {authorizedBottomItems.map(item => (
          <MenuItem
            key={item.label}
            label={item.label}
            handleClick={handleMenuClick(item.label)}
            isActive={item.label === activeItem}
            icon={item.icon}
            title={item.title}
            link={item.link}
          />
        ))}
      </div>
    </>
  ) : (
    <div className={s.menu}>
      {topItems.map(item => (
        <MenuItem
          key={item.label}
          label={item.label}
          handleClick={handleMenuClick(item.label)}
          isActive={item.label === activeItem}
          icon={item.icon}
          title={item.title}
          link={item.link}
        />
      ))}
    </div>
  )
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
