import { FC, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import s from './subscribeProfileSection.module.scss'
import SidemenuCross from '/public/assets/images/icons/SidemenuCross.svg'
import { HistoryCleanModal } from '../index'

interface TabContentProps {
  content: ReactNode[]
}

const SubscribeSectionTabContent: FC<TabContentProps> = ({
  content,
}) => {
  const { t } = useTranslation(['common', 'profilePage'])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // remove history
  const handleRemoveHistory = () => {
    console.log('remove history')
  }

  return (
    <div className={s.tabContainer}>
      {/* TODO: Add clear history popup when it done */}
      <div className={s.clearHistory} onClick={() => setIsOpen(true)}>
        <span>{t('clearAllHistory')}</span>
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
        text={'profilePage:clearSubscribeHistoryQuestion'}
      />
    </div>
  )
}

export default SubscribeSectionTabContent
