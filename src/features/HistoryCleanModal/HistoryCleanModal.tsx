import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Modal } from 'components'

import s from './HistoryCleanModal.module.scss'

interface HistoryCleanModalProps {
  isOpen: boolean
  onClose: () => void
  onRemove: () => void
  text: string
}

const HistoryCleanModal: FC<HistoryCleanModalProps> = ({
  isOpen,
  onClose,
  onRemove,
  text,
}) => {
  const { t } = useTranslation('common')

  const handleClose = () => {
    onClose()
  }

  const handleDelete = () => {
    onRemove()
    onClose()
  }

  return (
    <Modal
      contentClassName={s.body}
      onClose={handleClose}
      isOpen={isOpen}
      isClosable={false}
    >
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.title}>{t(text)}</div>
        </div>
        <div className={s.buttons}>
          <Button
            className={s.deleteBtn}
            title={t('common:words.delete')}
            onClick={handleDelete}
          />

          <Button
            className={s.cancelBtn}
            title={t('common:words.noDelete')}
            onClick={handleClose}
          />
        </div>
      </div>
    </Modal>
  )
}

export default HistoryCleanModal
