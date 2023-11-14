import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button, Textarea } from 'components'

import s from './askQuestion.module.scss'

interface AskQuestionForm {
  question: string
}

const AskQuestion = () => {
  const { t } = useTranslation(['askQuestion', 'common'])

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<AskQuestionForm>()

  const registerOptions = {
    question: {
      required:
        t('common:errors.required.email') || 'Email is required',
    },
  }

  const onSubmit: SubmitHandler<AskQuestionForm> = async data => {
    console.log(JSON.stringify(data))
    reset()
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>{t('title')}</h1>

        <p>
          {t('askQuestion:profileAsk_1')}{' '}
          <Link href={'/faq'}>
            <span className={s.faq}>
              #{t('askQuestion:profileAsk_2')}
            </span>
          </Link>{' '}
          {t('askQuestion:profileAsk_3')}
        </p>
      </div>

      <form
        className={s.askQuestionForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* TODO: add error section */}
        <Controller
          control={control}
          name='question'
          rules={registerOptions.question}
          defaultValue={''}
          render={({ field: { onChange, value } }) => (
            <Textarea
              value={value}
              onChange={onChange}
              placeholder={t('askQuestion:placeholder')!}
              className={s.textarea}
            />
          )}
        />

        <Button
          className={s.sendButton}
          title={t('common:words.send')}
          onClick={() => {}}
          type='submit'
        />
      </form>
    </div>
  )
}
export default AskQuestion
