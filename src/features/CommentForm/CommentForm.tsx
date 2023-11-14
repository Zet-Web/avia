import { FC } from 'react'
import cn from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'

import { Button, Textarea } from 'components'

import { useAppSelector } from 'redux/hooks'

import { COMMENT_MAX_LENGTH } from 'shared/constants/forms'

import s from './commentForm.module.scss'
import { selectIsAuth } from '../../redux/slices/authSlice/authSlice'

interface CommentFormProps {
  onSubmit: (data: { comment: string }) => void
  placeholder: string
  name?: string
}

type Comment = {
  comment: string
}

const CommentForm: FC<CommentFormProps> = ({
  onSubmit,
  name,
  placeholder,
}) => {
  const isAuth = useAppSelector(selectIsAuth)
  const router = useRouter()

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = useForm<Comment>({
    defaultValues: { comment: '' },
  })

  const submitHandler = (data: any) => {
    if (isAuth) {
      onSubmit(data)
      reset()
    } else {
      router.query.popup = 'login'
      router.push(router)
    }
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>Ваш комментарий</h3>
        {name && (
          <span className={s.appeal}>
            ответ для{' '}
            <a className={s.name} href='#'>
              {name}
            </a>
          </span>
        )}
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Controller
          name='comment'
          control={control}
          // eslint-disable-next-line @typescript-eslint/naming-convention
          rules={{ required: true, maxLength: COMMENT_MAX_LENGTH }}
          render={({ field: { onChange, value, ref, ...field } }) => (
            <Textarea
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={cn(
                s.textarea,
                isDirty ? s.textareaActive : s.textareaPlaceholder
              )}
            />
          )}
        />

        <div className={s.buttons}>
          {isDirty && (
            <Button
              className={s.btnClose}
              title='Отменить'
              onClick={() => {
                reset()
              }}
            />
          )}

          <Button
            title='Оставить комментарий'
            type='submit'
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  )
}

export default CommentForm
