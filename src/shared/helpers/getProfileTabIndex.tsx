import { ProfileTabs } from '../types'

export const getProfileTabIndex = (
  tab: string | string[]
): number => {
  switch (tab) {
    case ProfileTabs[0]:
    default:
      return ProfileTabs.favorites
    case ProfileTabs[1]:
      return ProfileTabs.history
    case ProfileTabs[2]:
    case ProfileTabs[4]:
      return ProfileTabs.subscribeTicket
    case ProfileTabs[3]:
      return ProfileTabs.askQuestion
  }
}
