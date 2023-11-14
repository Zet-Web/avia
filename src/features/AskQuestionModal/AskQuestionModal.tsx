import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { Modal } from 'components'

import { useAppSelector } from 'redux/hooks'

import s from './askQuestionModal.module.scss'
import { selectIsAuth } from '../../redux/slices/authSlice/authSlice'

interface AskQuestionModalProps {
  isOpen: boolean
  onClose?: () => void
}

const AskQuestionModal: FC<AskQuestionModalProps> = ({
  onClose,
  isOpen,
}) => {
  const isAuth = useAppSelector(selectIsAuth)
  const { t } = useTranslation(['askQuestion'])
  const [isAskModalOpen, setIsAskModalOpen] = useState<boolean>(false)
  const { query, push } = useRouter()
  const modal = query.modal

  useEffect(() => {
    if (modal === 'ask') {
      setIsAskModalOpen(true)
    } else setIsAskModalOpen(false)
  }, [modal])

  const removeQueryParam = (param: string) => {
    const updatedQuery = query
    if (updatedQuery[param]) {
      delete updatedQuery[param]
      // eslint-disable-next-line @typescript-eslint/naming-convention
      push({ query: updatedQuery }, undefined, { shallow: true })
    }
  }

  // close auth modal
  const handleClose = () => {
    removeQueryParam('modal')
    onClose?.()
  }

  return (
    <>
      <Modal
        contentClassName={s.body}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <h2 className={s.title}>{t('askQuestion:title')}</h2>

        <p className={s.text}>
          {t('askQuestion:text1')}

          <span className={s.link}>
            <Link href='/faq'>
              <a>{t('askQuestion:profileAsk_2')}</a>
            </Link>
          </span>

          {t('askQuestion:text2')}

          <span className={s.separator}>
            {t('askQuestion:separator')}
          </span>

          {t('askQuestion:text3')}

          <span className={s.link}>
            <Link
              href={
                isAuth ? '/profile?tab=askQuestion' : '/?popup=login'
              }
            >
              {/* TODO wait pages */}
              <a>{t('askQuestion:title')}</a>
            </Link>
          </span>
        </p>
      </Modal>
    </>
  )
}

export default AskQuestionModal
