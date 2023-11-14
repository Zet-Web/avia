import { ProfileTabs } from 'shared/types'
import { SidebarTab } from 'shared/types/profile'

import FavoritesIcon from '/public/assets/images/icons/profilePage/favoritesIcon.svg'
import HistoryIcon from '/public/assets/images/icons/profilePage/historyIcon.svg'
import QuestionIcon from '/public/assets/images/icons/profilePage/questionIcon.svg'
import SubscribeIcon from '/public/assets/images/icons/profilePage/subscribeIcon.svg'

export const ProfileSidebarTabsConstant: SidebarTab[] = [
  {
    index: 0,
    title: 'Избранное',
    content: ProfileTabs.favorites,
    icon: <FavoritesIcon />,
  },
  {
    index: 1,
    title: 'История',
    content: ProfileTabs.history,
    icon: <HistoryIcon />,
  },
  {
    index: 2,
    title: 'Подписки',
    content: ProfileTabs.subscribeTicket,
    icon: <SubscribeIcon />,
  },
  {
    index: 3,
    title: 'Задать вопрос',
    content: ProfileTabs.askQuestion,
    icon: <QuestionIcon />,
  },
]
