import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Logo, Modal } from 'components'

import s from './subscribeConfirmModal.module.scss'

interface SubscribeConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const SubscribeConfirmModal: FC<SubscribeConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation(['subscribeConfirmModal', 'common'])
  const handleClose = (): void => {
    onClose()
  }
  const handleConfirm = (): void => {
    onConfirm()
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
            <p>{t('text')}</p>
            <Button
              className={s.confirmButton}
              title={t('common:words.confirm')}
              onClick={handleConfirm}
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

export default SubscribeConfirmModal
