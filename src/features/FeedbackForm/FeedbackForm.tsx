import Image from 'next/image'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input, Textarea } from 'components'
import { checkIsEmailValid } from '../../shared/helpers/checkIsEmailValid'
import { Social } from '../../shared/types/footer'
import s from './feedbackForm.module.scss'
import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'

interface FeedbackFormProps {
  socials: Social[]
}

interface FormPayload {
  email: string
  comment: string
}

const FeedbackForm: FC<FeedbackFormProps> = ({ socials }) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormPayload>()

  const registerOptions = {
    email: {
      required: 'Email is required',
      validate: (value: string) =>
        checkIsEmailValid(value) || 'Enter a valid email',
    },
  }

  const onSubmit: SubmitHandler<FormPayload> = async data => {
    console.log(JSON.stringify(data))
    reset()
  }

  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <div>
          {/*TODO: use props*/}
          <div className={s.contactItem}>
            <h3 className={s.contactTitle}>Телефон</h3>
            <a className={s.contactLink} href='tel:+74012722398'>
              +7 4012-72-23-98
            </a>
          </div>
          <div className={s.contactItem}>
            <h3 className={s.contactTitle}>E-mail</h3>
            <a
              className={s.contactLink}
              href='mailto:contact@merlines.ru'
            >
              contact@merlines.ru
            </a>
          </div>
          <div>
            <h3 className={s.contactTitle}>Социальные сети</h3>

            <div className={s.socialBlock}>
              {socials?.map((social, idx) => (
                <div className={s.socialItem} key={idx}>
                  <div className={s.socialImage}>
                    <Image
                      src={getImageUrlWithBaseDomain(
                        social.icon.data.attributes.url
                      )}
                      layout='fill'
                      width={16}
                      height={16}
                      alt={`${social.name} title`}
                    />
                  </div>
                  <a href={social.link} className={s.socialLink}>
                    {social.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={s.title}>
            Здравствуйте! <br />
            Будем рады услышать ваше предложение.
          </h2>

          <Controller
            name='email'
            control={control}
            rules={registerOptions.email}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                className={s.input}
                placeholder='e-mail'
                value={value}
                onChange={onChange}
              />
            )}
          />

          <p className={s.formWarning}>
            {errors?.email && errors.email.message}
          </p>

          <Controller
            name='comment'
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Textarea
                value={value}
                onChange={onChange}
                placeholder='Введите текст...'
                className={s.textarea}
              />
            )}
          />

          <Button
            title='Отправить предложение'
            onClick={() => {}}
            className={s.button}
            type={'submit'}
          />
        </form>
      </div>
    </section>
  )
}
export default FeedbackForm
