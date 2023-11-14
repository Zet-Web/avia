import { FC, useEffect } from 'react'

import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button, Checkbox, Input } from 'components'

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { checkIsEmailValid } from 'shared/helpers/checkIsEmailValid'

import {
  SignUpForm,
  SignUpStatus,
} from 'redux/slices/authSlice/types'

import { registerRequested } from 'redux/slices/authSlice/authSlice'
import s from './signUp.module.scss'
import EmailConfirm from 'features/EmailConfirm/EmailConfirm'

interface SignUpProps {
  isMenuOpen: boolean
}

const SignUp: FC<SignUpProps> = ({ isMenuOpen }) => {
  const { t } = useTranslation([
    'authModal',
    'emailConfirm',
    'common',
  ])
  const signUpStatus = useAppSelector(
    state => state.auth.signUpStatus
  )
  const dispatch = useAppDispatch()

  const {
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    control,
  } = useForm<SignUpForm>()

  const registerOptions = {
    name: {
      required: 'Name is required',
    },
    email: {
      required: 'Email is required',
      validate: (value: string) =>
        checkIsEmailValid(value) || 'Enter a valid email',
    },
    password: {
      minLength: 6,
      required: 'Password is required',
    },
    repeatPassword: {
      minLength: 6,
      required: 'Please repeat the password',
      validate: (value: string, data: SignUpForm) =>
        value === data.password || "Passwords doesn't match",
    },
  }

  const onSubmit: SubmitHandler<SignUpForm> = data => {
    dispatch(registerRequested(data))
  }

  useEffect(() => {
    if (!isMenuOpen) {
      reset()
    }
  }, [isMenuOpen])

  if (signUpStatus === SignUpStatus.VERIFY) {
    const form = getValues()
    return (
      <EmailConfirm email={form.email} keepLogged={form.keepLogged} />
    )
  }

  return (
    <div className={s.container}>
      <h1>{t('authModal:email.registration')}</h1>

      <div className={s.signUpForm}>
        <div className={s.inputContainer}>
          {/* TODO: add error section */}
          <Controller
            control={control}
            name='name'
            rules={registerOptions.name}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={
                  t('authModal:placeholders.name') || 'имя'
                }
              />
            )}
          />

          {/* TODO: add error section */}
          <Controller
            control={control}
            name='email'
            rules={registerOptions.email}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                type='text'
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={
                  t('authModal:placeholders.email') || 'e-mail'
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
                type={'password'}
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
                type={'password'}
                placeholder={
                  t('authModal:placeholders.repeatPassword') ||
                  'повторите пароль'
                }
              />
            )}
          />
        </div>

        <div className={s.options}>
          <Controller
            control={control}
            name='keepLogged'
            defaultValue={true}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                isChecked={value}
                onChange={onChange}
                className={cn(s.keepLogged, {
                  [s.active]: value,
                })}
                label={
                  t('common:checkbox.keepLogged') || 'Запомнить меня'
                }
              />
            )}
          />
        </div>

        <Button
          className={s.signUpButton}
          title={t('common:words.signUp')}
          onClick={handleSubmit(onSubmit)}
          type='submit'
        />
      </div>
    </div>
  )
}
export default SignUp
