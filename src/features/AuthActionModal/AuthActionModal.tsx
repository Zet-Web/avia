import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'

import { Button, Modal } from 'components'

import s from './authActionModal.module.scss'

interface AuthActionModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
  onRegister: () => void
}

const AuthActionModal: FC<AuthActionModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}) => {
  const { t } = useTranslation('authActionModal')

  const handleClose = (): void => {
    onClose()
  }

  return (
    <>
      <Modal
        contentClassName={s.body}
        onClose={handleClose}
        isOpen={isOpen}
        isClosable={true}
        className={s.subscribeConfirmModal}
      >
        <div className={s.container}>
          <h1>{t('title')}</h1>

          <div className={s.buttonRow}>
            <Button
              className={cn(s.button, s.login)}
              title={t('buttons.login')}
              onClick={onLogin}
            />

            <Button
              className={cn(s.button, s.register)}
              title={t('buttons.register')}
              onClick={onRegister}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AuthActionModal
