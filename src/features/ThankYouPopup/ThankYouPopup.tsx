import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { Button, Modal } from 'components'

import s from './ThankYouPopup.module.scss'

interface ThankYouPopupProps {
  isOpen: boolean
  isSubscribe?: boolean
  onClose: () => void
  onRemove: () => void
}

const ThankYouPopup: FC<ThankYouPopupProps> = ({
  isOpen,
  onClose,
  onRemove,
  isSubscribe = false,
}) => {
  const { t } = useTranslation(['ThankYouPopup'])

  const handleClose = (): void => {
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
    >
      <h2 className={s.title}>{t('ThankYouPopup:title')}</h2>

      {isSubscribe && (
        <p className={s.text}>{t('ThankYouPopup:text')}</p>
      )}
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
    </Modal>
  )
}

export default ThankYouPopup
