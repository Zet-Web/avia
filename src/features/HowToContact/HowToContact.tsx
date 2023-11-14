import { Button, Input, Textarea } from 'components'
import s from './howToContact.module.scss'

const HowToContact = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.title}>Как же вам с нами связаться?</h1>
        <div className={s.columns}>
          <div className={s.leftColumn}>
            <p className={s.text}>
              У нас есть рабочая почта, где вам ответит в течении
              нескольких минут служба поддержки
            </p>
            <div className={s.contats}>
              <span className={s.contactName}>E-mail</span>
              <div className={s.contactValue}>
                contact@merlines.ru
              </div>
            </div>
          </div>

          <div className={s.or}>или</div>

          <div className={s.rightColumn}>
            <p className={s.text}>
              Вы можете отправить письмо прямо с нашего сервиса в пару
              кликов
            </p>

            <form className={s.form}>
              <div className={s.inputWrapper}>
                <Input className={s.input} placeholder={'e-mail'} />
              </div>
              <Textarea
                className={s.textArea}
                placeholder='Введите текст...'
              />
              <Button className={s.btn} title='Задать вопрос' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToContact
