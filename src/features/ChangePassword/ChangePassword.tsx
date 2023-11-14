import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input } from 'components'

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  changePasswordDefault,
  changePasswordRequested,
} from 'redux/slices/changePasswordSlice/changePasswordSlice'
import { ResetPasswordStatus } from 'redux/slices/changePasswordSlice/types'
import { checkIsEmailValid } from 'shared/helpers/checkIsEmailValid'

import s from './changePassword.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NewPassword from 'features/NewPassword/NewPassword'

export interface ChangePasswordForm {
  email: string
}

const ChangePassword = () => {
  const { t } = useTranslation([
    'changePassword',
    'common',
    'authModal',
  ])

  const dispatch = useAppDispatch()
  const changePassword = useAppSelector(
    state => state.password.resetPasswordStatus
  )

  const {
    formState: { errors },
    handleSubmit,
    control,
    getValues,
  } = useForm<ChangePasswordForm>()

  const registerOptions = {
    email: {
      required:
        t('common:errors.required.email') || 'Email is required',
      validate: (value: string) =>
        checkIsEmailValid(value) ||
        t('common:errors.validate.email') ||
        'Enter a valid email',
    },
  }

  const onSubmit: SubmitHandler<ChangePasswordForm> = data => {
    dispatch(changePasswordRequested(data))
  }

  useEffect(() => {
    return () => {
      dispatch(changePasswordDefault())
    }
  }, [])

  if (changePassword === ResetPasswordStatus.RESET_PASSWORD_ON_CHANGE)
    return (
      <>
        <NewPassword email={getValues().email} />
        <p className={s.bottomText}>
          {t('noLetter')} -{' '}
          <button
            className={s.resendLetter}
            onClick={handleSubmit(onSubmit)}
          >
            {t('button')},
          </button>
          {t('resend')}
        </p>
      </>
    )

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>{t('title')}</h1>
        <p> {t('text')}</p>
      </div>

      <div className={s.changePasswordForm}>
        <div className={s.inputContainer}>
          {/* TODO: add error section */}
          <Controller
            control={control}
            name='email'
            rules={registerOptions.email}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={`${t('changePassword:placeholder')}`}
              />
            )}
          />
        </div>

        <Button
          className={s.sendButton}
          title={t('common:words.confirm')}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  )
}
export default ChangePassword
