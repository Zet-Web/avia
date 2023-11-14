import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import { Modal } from 'components'

import s from './redirectingModal.module.scss'

import Loading from '/public/assets/images/icons/loading.svg'

interface RedirectingModalProps {
  isOpen: boolean
  onClose: () => void
  company: string
  id: number
  name: string
  logo: string
}

const RedirectingModal: FC<RedirectingModalProps> = ({
  isOpen,
  onClose,
  company,
  id,
  name,
  logo,
}) => {
  const { t } = useTranslation(['redirectingModal'])
  return (
    <>
      <Modal
        contentClassName={s.modalWrapper}
        onClose={onClose}
        isOpen={isOpen}
        isClosable={false}
      >
        <Loading className={s.loading} />

        <h2 className={s.title}>
          {t('redirectingModal:text')} <span>{name}</span>
        </h2>

        <div className={s.logo}>
          <Image layout={'fill'} src={logo} alt={company} />
        </div>
      </Modal>
    </>
  )
}

export default RedirectingModal
