import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input } from 'components'

import { useAppDispatch } from 'redux/hooks'
import { updatePasswordAction } from 'redux/slices/changePasswordSlice/changePasswordSlice'

import s from './newPassword.module.scss'
import { FC } from 'react'

export interface NewPasswordForm {
  password: string
  repeatPassword: string
  code: string
}

interface NewPasswordProps {
  email: string
}

const NewPassword: FC<NewPasswordProps> = ({ email }) => {
  const { t } = useTranslation(['authModal', 'common'])
  const dispatch = useAppDispatch()

  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<NewPasswordForm>()

  const registerOptions = {
    password: {
      minLength: 6,
      required: 'Password is required',
    },
    repeatPassword: {
      minLength: 6,
      required: t('authModal:placeholders.repeatPassword'),
      validate: (value: string, data: NewPasswordForm) =>
        value === data.password || "Passwords doesn't match",
    },
    code: {
      required: 'required',
    },
  }

  const onSubmit: SubmitHandler<NewPasswordForm> = async data => {
    dispatch(
      updatePasswordAction({
        email,
        password: data.password,
        code: data.code,
      })
    )
  }

  return (
    <div className={s.container}>
      <h1>{t('authModal:newPassword')}</h1>

      <div className={s.signUpForm}>
        <div className={s.inputContainer}>
          <Controller
            control={control}
            name='code'
            rules={registerOptions.code}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={
                  t('authModal:placeholders.code') ||
                  'код подтверждения'
                }
              />
            )}
          />
          {/* TODO: add error section */}
          <Controller
            control={control}
            name='password'
            rules={registerOptions.password}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={
                  t('authModal:placeholders.password') || 'пароль'
                }
              />
            )}
          />

          {/* TODO: add error section */}
          <Controller
            control={control}
            name='repeatPassword'
            rules={registerOptions.repeatPassword}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={
                  t('authModal:placeholders.repeatPassword') ||
                  'повторите пароль'
                }
              />
            )}
          />
        </div>

        <Button
          className={s.signUpButton}
          title={t('common:words.add')}
          onClick={handleSubmit(onSubmit)}
          type='submit'
        />
      </div>
    </div>
  )
}
export default NewPassword
