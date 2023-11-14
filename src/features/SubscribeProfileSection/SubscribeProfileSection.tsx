import { FC, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Tabs } from 'components'
import { HistoryCleanModal, RouteItem } from 'features'

import { ViewSubscribeModalConstant } from 'shared/constants/ViewSubscribeModal'
import { routeItemMock } from 'shared/mocks/mock_routeItem'
import SidemenuCross from '/public/assets/images/icons/SidemenuCross.svg'

import s from './subscribeProfileSection.module.scss'

interface SubscribeProfileSectionProps {
  defaultIndex?: number
}
interface TabContentProps {
  content: ReactNode[]
}

const SubscribeProfileSection: FC<SubscribeProfileSectionProps> = ({
  defaultIndex = 0,
}) => {
  const { t } = useTranslation('profilePage')

  const routeItems = new Array(7).fill(
    <RouteItem
      {...routeItemMock}
      onDelete={routeId => console.log(routeId)}
    />
  )

  return (
    <div className={s.container}>
      <h1 className={s.subscribeTitle}>{t('subscribeTitle')}</h1>

      <Tabs
        defaultIndex={defaultIndex}
        size='small'
        tabs={ViewSubscribeModalConstant.tabs}
        content={[
          {
            component: (
              <SubscribeSectionTabContent content={routeItems} />
            ),
          },
          {
            component: (
              <SubscribeSectionTabContent content={routeItems} />
            ),
          },
        ]}
        counter={routeItems.length > 0 ? routeItems.length : 0}
      />
    </div>
  )
}

const SubscribeSectionTabContent: FC<TabContentProps> = ({
  content,
}) => {
  const { t } = useTranslation(['profilePage', 'common'])

  const [isOpen, setIsOpen] = useState<boolean>(false)

  // remove history
  const handleRemoveHistory = () => {
    console.log('remove history')
  }

  return (
    <div className={s.tabContainer}>
      {/* TODO: Add clear history popup when it done */}
      {content.length > 0 ? (
        <>
          <div
           
            className={s.clearHistory}
           
            onClick={() => setIsOpen(true)}
          
          >
                <span>{t('common:common:clearAllHistory')}</span>
                <SidemenuCross className={s.cross} />
              </div>

              <div className={s.content}>
                {content.map((contentItem, idx) => (
                  <div key={idx} className={s.contentItem}>
                    {contentItem}
                  </div>
                ))}
              </div>

          <HistoryCleanModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onRemove={handleRemoveHistory}
            text={'profilePage:clearHistoryQuestion'}
          />
        </>
      ) : (
        <div className={s.empty}>
          <h1>{t('contentIsEmpty')}</h1>
        </div>
      )}
    </div>
  )
}

export default SubscribeProfileSection
