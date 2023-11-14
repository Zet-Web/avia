import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { Button } from 'components'

import s from './cookiesPopup.module.scss'

interface CookiesPopupProps {
  isOpen: boolean
  onClose: () => void
}

const CookiesPopup: FC<CookiesPopupProps> = ({ onClose, isOpen }) => {
  const { t } = useTranslation('common')

  if (!isOpen) return null
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <p className={s.text}>{t('common:cookieTitle')}</p>

        <Button
          className={s.btn}
          onClick={onClose}
          title='Принять и закрыть'
        />
      </div>
    </div>
  )
}

export default CookiesPopup
