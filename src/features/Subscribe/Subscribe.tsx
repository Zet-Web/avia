import { useState, FormEvent } from 'react'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Button, Input } from 'components'

import s from './subscribe.module.scss'

const Subscribe = () => {
  const [email, setEmail] = useState<string>('')
  const { t } = useTranslation(['subscribe'])

  const emailChange = (value: string) => {
    setEmail(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <div className={s.subscribe}>
      <div className={s.subscribeWrapper}>
        <h1 className={s.title}>{t('subscribe:title')}</h1>

        <p className={s.text}>
          {t('subscribe:subtitleLine1')} <br />
          {t('subscribe:subtitleLine2')}
        </p>

        <form onSubmit={handleSubmit} className={s.subscribeForm}>
          <Input
            value={email}
            onChange={emailChange}
            placeholder={t('subscribe:placeholder')!}
            className={s.input}
          />

          <Button
            className={s.subscribeBtn}
            title={t('subscribe:subscribe')}
            onClick={() => {}}
            type='submit'
          />
        </form>

        <p className={s.agreeInfo}>
          {t('subscribe:pressingAgree')}{' '}
          <Link href={'/privacy'}>
            <a className={s.agreeLink}>
              {t('subscribe:rules')} <br />{' '}
              {t('subscribe:dataProcessing')}
            </a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Subscribe
