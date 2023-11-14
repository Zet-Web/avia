import { FC, ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Logo, Modal, Tabs } from 'components'
import RouteItem from 'features/RouteItem/RouteItem'

import { ViewSubscribeModalConstant } from 'shared/constants/ViewSubscribeModal'
import { routeItemMock } from 'shared/mocks/mock_routeItem'

import s from './viewSubscribeModal.module.scss'

interface ViewSubscribeModalProps {
  isOpen: boolean
  onClose: () => void
}
interface TabContentProps {
  content: ReactNode
  message: string
  onClick?: () => void
  onUnsubscribe?: () => void
}
const ViewSubscribeModal: FC<ViewSubscribeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation('viewSubscribeModal')
  const handleClose = (): void => {
    onClose()
  }

  return (
    <>
      <Modal
        contentClassName={s.body}
        onClose={handleClose}
        isOpen={isOpen}
        isClosable={false}
        className={s.subscribeConfirmModal}
      >
        <div className={s.container}>
          <div className={s.logo}>
            <Logo variant='secondary' />
          </div>
          <div className={s.content}>
            <h1>{t('title')}</h1>
            <Tabs
              size='small'
              tabs={ViewSubscribeModalConstant.tabs}
              content={[
                // @ts-ignore
                <SubscribeTabContent
                  key={routeItemMock.id}
                  content={
                    <RouteItem
                      {...routeItemMock}
                      onDelete={routeId => console.log(routeId)}
                    />
                  }
                  // TODO: Add a function that returns message depending on price
                  message={t('message.route')}
                />,
                // @ts-ignore
                <SubscribeTabContent
                  key={1}
                  content='Тут должен быть Index Feature'
                  // TODO: Add a function that returns message depending on price
                  message={t('message.ticket')}
                />,
              ]}
            />
          </div>
          <div className={s.bottomText}>
            <span>{t('bottomText')}</span>
          </div>
        </div>
      </Modal>
    </>
  )
}

const SubscribeTabContent: FC<TabContentProps> = ({
  content,
  message,
  onUnsubscribe,
  onClick,
}) => {
  const { t } = useTranslation(['viewSubscribeModal', 'common'])
  const handleClick = (): void => {
    onClick?.()
  }
  const unsubscribeHandler = (): void => {
    onUnsubscribe?.()
  }
  return (
    <div className={s.tabContainer}>
      <div className={s.tabContent}>{content}</div>
      {/* TODO: Add a function that returns message depending on price */}
      <span className={s.message}>{message} 300 ₽</span>
      <Button
        className={s.watchButton}
        onClick={handleClick}
        title={t('common:words.watch')}
      />
      <span className={s.unsubscribe} onClick={unsubscribeHandler}>
        {t('unsubscribe')}
      </span>
    </div>
  )
}

export default ViewSubscribeModal
