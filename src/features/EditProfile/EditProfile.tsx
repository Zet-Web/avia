import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'

import { Button, Input } from 'components'

import { checkIsEmailValid } from 'shared/helpers/checkIsEmailValid'

import s from './editProfile.module.scss'

interface EditProfileProps {
  name?: string
  surname?: string
}

interface EditProfileForm {
  name: string
  surname: string
  email: string
  password: string
  repeatPassword: string
}
const EditProfile: FC<EditProfileProps> = ({ name, surname }) => {
  const { t } = useTranslation(['editProfile', 'common'])

  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
    control,
  } = useForm<EditProfileForm>()

  const editProfileOptions = {
    name: {
      required:
        t('common:errors.required.name') || 'Name is required',
    },
    surname: {
      required:
        t('common:errors.required.surname') || 'Surname is required',
    },
    email: {
      required:
        t('common:errors.required.email') || 'Email is required',
      validate: (value: string) =>
        checkIsEmailValid(value) ||
        t('common:errors.validate.email') ||
        'Enter a valid email',
    },
    password: {
      required:
        t('common:errors.required.password') ||
        'Password is required',
    },
    repeatPassword: {
      required:
        t('common:errors.required.repeatPassword') ||
        'Please repeat the password',
      validate: (value: string, data: EditProfileForm) =>
        value === data.password ||
        t('common:errors.validate.repeatPassword') ||
        "Passwords doesn't match",
    },
  }

  const onSubmit: SubmitHandler<EditProfileForm> = async data => {
    console.log(JSON.stringify(data))
    reset()
  }

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h1>{t('title')}</h1>

        <p>{isSubmitSuccessful && t('changesSaved')}</p>
      </div>

      <form
        className={s.editProfileForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* TODO: add error section */}
        <div className={s.inputRow}>
          <Controller
            control={control}
            name='name'
            rules={editProfileOptions.name}
            defaultValue={name}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={t('placeholders.name') || 'имя'}
              />
            )}
          />

          <Controller
            control={control}
            name='surname'
            rules={editProfileOptions.surname}
            defaultValue={surname}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={t('placeholders.surname') || 'Фамилия'}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name='email'
          rules={editProfileOptions.email}
          defaultValue={''}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              className={s.input}
              placeholder={t('placeholders.email') || 'новый e-mail'}
            />
          )}
        />

        {/* TODO: add error section */}
        <div className={s.inputRow}>
          <Controller
            control={control}
            name='password'
            rules={editProfileOptions.password}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={
                  t('placeholders.password') || 'новый пароль'
                }
              />
            )}
          />

          {/* TODO: add error section */}
          <Controller
            control={control}
            name='repeatPassword'
            rules={editProfileOptions.repeatPassword}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                className={s.input}
                placeholder={
                  t('placeholders.repeatPassword') ||
                  'повторите пароль'
                }
              />
            )}
          />
        </div>

        <Button
          className={s.saveButton}
          title={t('common:words.save')}
          onClick={() => {}}
          type='submit'
        />
      </form>
    </div>
  )
}
export default EditProfile
