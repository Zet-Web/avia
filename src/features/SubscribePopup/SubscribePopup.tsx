import { FC, FormEvent, useState } from 'react'
import { useTranslation } from 'next-i18next'

import Link from 'next/link'

import { Button, Input, Modal } from 'components'

import Arrow from '/public/assets/images/arrow_right.svg'

import s from './SubscribePopup.module.scss'

interface SubscribePopupProps {
  from: string
  to: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (mail?: string) => void
}

const SubscribePopup: FC<SubscribePopupProps> = ({
  from,
  to,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [email, setEmail] = useState<string>('')
  const { t } = useTranslation()
  const changeEmail = (value: string) => {
    setEmail(value)
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email)
  }

  return (
    <>
      <Modal
        contentClassName={s.modalWrapper}
        onClose={onClose}
        isOpen={isOpen}
      >
        <div className={s.modalTitles}>
          <div className={s.cityName}>{from}</div>
          <Arrow className={s.arrow} />
          <div className={s.cityName}>{to}</div>
        </div>
        <form onSubmit={submitHandler}>
          <Input
            className={s.input}
            onChange={changeEmail}
            value={email}
            placeholder={t('subscribe:placeholder')!}
          />
          <Button
            className={s.confrimBtn}
            onClick={() => console.log('subscription')}
            title={t('subscribe:subscribe')}
          />
        </form>
        <p className={s.agreeInfo}>
          {t('subscribe:pressingAgree')}
          {t('subscribe:rules')}
          {t('subscribe:dataProcessing')}
        </p>
      </Modal>
    </>
  )
}

export default SubscribePopup
