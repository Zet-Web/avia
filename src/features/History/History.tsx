import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { RouteItem, HistoryCleanModal } from 'features'

import { UserRoute as Route } from 'shared/types/user'

import SidemenuCross from '/public/assets/images/icons/SidemenuCross.svg'

import s from './history.module.scss'

interface HistoryProps {
  historyList: Route[]
}

const History: FC<HistoryProps> = ({ historyList }) => {
  const { t } = useTranslation(['profilePage', 'common'])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // remove history
  const handleRemoveHistory = () => {
    console.log('remove history') //TODO add Remove history
  }
  return (
    <>
      {historyList.length > 0 ? (
        <>
          <div className={s.header}>
            <h1 className={s.title}>История</h1>

            <div
              className={s.clearHistory}
              onClick={() => setIsOpen(true)}
            >
              <span>{t('common:clearAllHistory')}</span>
              <div className={s.cross}>
                <SidemenuCross />
              </div>
            </div>
          </div>

          <div className={s.historyList}>
            {historyList.map(item => (
              <RouteItem
                key={item.id}
                {...item}
                onDelete={() => {}}
              />
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
    </>
  )
}

export default History
