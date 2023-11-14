import { ReactNode } from 'react'

import CalendarIcon from '/public/assets/images/calendar.svg'
import BlogIcon from '/public/assets/images/edit.svg'
import UserIcon from '/public/assets/images/user.svg'
import FavoriteIcon from '/public/assets/images/icons/favorite.svg'
import HistoryIcon from '/public/assets/images/icons/history.svg'
import SubscribeIcon from '/public/assets/images/icons/subscribe.svg'
import QuestionIcon from '/public/assets/images/icons/question.svg'

export type MenuItems =
  | 'cabinet'
  | 'blog'
  | 'calendar'
  | 'edit'
  | 'favorite'
  | 'history'
  | 'subscribes'
  | 'question'

export type MenuItemValue = {
  icon: ReactNode
  title: string
  label: MenuItems
  link: string
}

export const topItems: MenuItemValue[] = [
  {
    label: 'cabinet',
    title: 'Кабинет',
    icon: <UserIcon />,
    link: '?popup=login',
  },
  {
    label: 'blog',
    title: 'Блог',
    icon: <BlogIcon />,
    link: '/blog',
  },
  {
    label: 'calendar',
    title: 'Календарь цен',
    icon: <CalendarIcon />,
    link: '/price_calendar',
  },
]

export const authorizedTopItems: MenuItemValue[] = [
  {
    label: 'edit',
    title: 'Редактировать',
    icon: <UserIcon />,
    link: '/profile?tab=editProfile',
  },
  {
    label: 'favorite',
    title: 'Избранное',
    icon: <FavoriteIcon />,
    link: '/profile?tab=favorites',
  },
  {
    label: 'history',
    title: 'История',
    icon: <HistoryIcon />,
    link: '/profile?tab=history',
  },
  {
    label: 'subscribes',
    title: 'Подписки',
    icon: <SubscribeIcon />,
    link: '/profile?tab=subscribeTicket',
  },
  {
    label: 'question',
    title: 'Задать вопрос',
    icon: <QuestionIcon />,
    link: '/profile?tab=askQuestion',
  },
]

export const authorizedBottomItems: MenuItemValue[] = [
  {
    label: 'blog',
    title: 'Блог',
    icon: <BlogIcon />,
    link: '/blog',
  },
  {
    label: 'calendar',
    title: 'Календарь цен',
    icon: <CalendarIcon />,
    link: '/price_calendar',
  },
]
