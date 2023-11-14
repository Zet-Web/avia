import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input } from 'components'

import { useAppDispatch } from 'redux/hooks'

import s from './emailConfirm.module.scss'
import {
  registerSuccess,
  requestVerification,
} from 'redux/slices/authSlice/authSlice'
import { FC } from 'react'

export interface ConfirmEmail {
  emailCode: string
}

interface EmailConfirmProps {
  email: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  keepLogged: boolean
}

const EmailConfirm: FC<EmailConfirmProps> = ({
  email,
  keepLogged,
}) => {
  const { t } = useTranslation(['emailConfirm', 'common'])
  const dispatch = useAppDispatch()

  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<ConfirmEmail>()

  const registerOptions = {
    emailCode: {
      required: 'Code from Email is required',
    },
  }

  const onSubmit: SubmitHandler<ConfirmEmail> = async data => {
    dispatch(
      requestVerification({
        email,
        code: data.emailCode,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        keepLogged: keepLogged,
      })
    )
    reset()
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>{t('emailConfirm:title')}</h1>
        <p> {t('emailConfirm:text')}</p>
      </div>

      <form
        className={s.emailConfirmForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={s.inputContainer}>
          {/* TODO: add error section */}
          <Controller
            control={control}
            name='emailCode'
            rules={registerOptions.emailCode}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={
                  t('emailConfirm:placeholder') || 'код из письма'
                }
              />
            )}
          />
        </div>

        <Button
          className={s.confirmButton}
          title={t('common:words.confirm')}
          onClick={handleSubmit(onSubmit)}
          type='submit'
        />
      </form>
    </div>
  )
}
export default EmailConfirm
