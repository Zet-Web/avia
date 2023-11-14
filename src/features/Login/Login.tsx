import { FC, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'

import { Button, Checkbox, Input } from 'components'

import { checkIsEmailValid } from 'shared/helpers/checkIsEmailValid'
import { useAppDispatch } from 'redux/hooks'
import { loginUserRequested } from 'redux/slices/authSlice/authSlice'

import { LoginForms } from 'redux/slices/authSlice/types'

import s from './login.module.scss'
import { useRouter } from 'next/router'

interface LoginProps {
  isMenuOpen?: boolean
}

const Login: FC<LoginProps> = ({ isMenuOpen }) => {
  const { t } = useTranslation(['authModal', 'common'])
  const dispatch = useAppDispatch()
  const router = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<LoginForms>()

  const registerOptions = {
    email: {
      required: 'Email is required',
      validate: (value: string) =>
        checkIsEmailValid(value) || 'Enter a valid email',
    },
    password: {
      minLength: 6,
      required: 'Password is required',
    },
  }

  const onSubmit: SubmitHandler<LoginForms> = async data => {
    dispatch(loginUserRequested(data))
  }

  useEffect(() => {
    if (!isMenuOpen) {
      reset()
    }
  }, [isMenuOpen])

  return (
    <div className={s.container}>
      <h1>{t('authModal:email.login')}</h1>

      <div className={s.loginForm}>
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
                type={'password'}
                onChange={onChange}
                className={s.input}
                placeholder={
                  t('authModal:placeholders.password') || 'пароль'
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

          <button
            className={s.forgotPassword}
            onClick={() =>
              router.replace({
                query: {
                  ...router.query,
                  popup: 'forgot-password',
                },
              })
            }
          >
            {t('authModal:forgotPassword')}
          </button>
        </div>

        <Button
          className={s.searchButton}
          title={t('common:words.login')}
          onClick={handleSubmit(onSubmit)}
          type='submit'
        />
      </div>
    </div>
  )
}
export default Login
