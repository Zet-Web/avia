import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProfileTabs } from 'shared/types'
import { ProfileSidebarTabsConstant } from 'shared/constants/ProfileSidebarTabs'
import { getProfileTabIndex } from 'shared/helpers/getProfileTabIndex'
import cn from 'classnames'
import s from './profileSidebarTabs.module.scss'

interface ProfileSidebarTabsProps {
  defaultIndex?: number
}

const ProfileSidebarTabs: FC<ProfileSidebarTabsProps> = ({
  defaultIndex = 0,
}) => {
  const [activeTab, setActiveTab] = useState<number>(defaultIndex)
  const router = useRouter()
  const { tab } = router.query

  useEffect(() => {
    tab && setActiveTab(getProfileTabIndex(tab))
  }, [tab])

  const handleTabClick = (content: string) => {
    router.push(
      {
        query: { tab: content },
      },
      undefined,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { shallow: true }
    )
  }

  const tabsClassName = (index: number) =>
    cn(s.tab, {
      [s.active]: activeTab === index,
    })

  return (
    <aside className={s.container}>
      {ProfileSidebarTabsConstant.map(tab => (
        <div
          key={tab.index}
          className={tabsClassName(tab.index)}
          onClick={() => {
            handleTabClick(ProfileTabs[tab.content])
          }}
        >
          <div className={s.tabIcon}>{tab.icon}</div>
          <span className={s.tabTitle}>{tab.title}</span>
        </div>
      ))}
    </aside>
  )
}

export default ProfileSidebarTabs
