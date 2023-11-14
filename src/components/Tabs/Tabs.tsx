import { FC, useEffect, useState } from 'react'
import cn from 'classnames'

import { useRouter } from 'next/router'

import { Tab, TabContent } from 'shared/types/tabs'

import s from './tabs.module.scss'

interface TabsProps {
  content: TabContent[]
  tabs: Tab[]
  defaultIndex?: number
  size?: 'small' | 'normal'
  hasLinkToggle?: boolean
  counter?: number
}

const Tabs: FC<TabsProps> = ({
  content,
  tabs,
  defaultIndex,
  size = 'small',
  hasLinkToggle,
  counter,
}) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0])

  const handleTabClick = (tab: Tab) => {
    if (tab.link) {
      router.push(
        {
          query: { ...router.query, popup: tab.link },
        },
        undefined,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        { shallow: true }
      )
    }
    setActiveTab(tab)
  }

  useEffect(() => {
    if (defaultIndex !== undefined) {
      setActiveTab(tabs[defaultIndex ? defaultIndex : 0])
    }
  }, [defaultIndex])

  const tabsClassName = (index: number) =>
    cn(s.tab, {
      [s.small]: size === 'small',
      [s.start]: index === 0,
      [s.end]: index === tabs.length - 1,
      [s.active]: activeTab.index === index,
    })
  const countsClassName = (index: number) =>
    cn(s.countContentCircle, {
      [s.countContentActive]: activeTab.index === index,
    })
  return (
    <div className={s.container}>
      <div className={s.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.index}
            className={tabsClassName(tab.index)}
            onClick={() => handleTabClick(tab)}
          >
            {
              <>
                {tab.title}
                {counter !== undefined && counter !== null && (
                  <div className={countsClassName(tab.index)}>
                    {counter}
                  </div>
                )}
              </>
            }
          </button>
        ))}
      </div>

      <div className={s.content}>
        {hasLinkToggle ? (
          <>
            {
              content.find(item => item.link === activeTab.link)
                ?.component
            }
          </>
        ) : (
          <>{content[activeTab.index].component}</>
        )}
      </div>
    </div>
  )
}

export default Tabs
