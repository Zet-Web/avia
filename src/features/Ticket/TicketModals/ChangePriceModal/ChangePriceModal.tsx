import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

import { Button, Modal } from 'components'

import s from './changePriceModal.module.scss'

interface ChangePriceModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ChangePriceModal: FC<ChangePriceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation(['common', 'ticket'])
  const router = useRouter()

  const handleSignUp = () => {
    router.query.popup = 'signup'
    router.push(router)
    onClose()
  }

  const handleLogin = () => {
    router.query.popup = 'login'
    router.push(router)
    onClose()
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isClosable>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.title}>
            {t('ticket:changePriceModalTitle')}
          </div>

          <Button
            className={s.deleteBtn}
            title={t('common:words.login')}
            onClick={handleLogin}
          />

          <Button
            className={s.cancelBtn}
            title={t('common:words.reg')}
            onClick={handleSignUp}
          />
        </div>
      </div>
    </Modal>
  )
}
