import { ReactNode } from 'react'

import { ProfileTabs } from '.'

export interface SidebarTab {
  index: number
  title: string
  content: ProfileTabs
  icon: ReactNode
}
