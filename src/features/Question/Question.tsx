import React, { FC, ReactNode, useState } from 'react'
import { useTranslation } from 'next-i18next'

import { DetailButton } from 'features'

import s from './question.module.scss'

interface QuestionProps {
  title: string
  children: ReactNode
}

const Question: FC<QuestionProps> = ({ title, children }) => {
  const [isShown, setIsShown] = useState(false)
  const { t } = useTranslation(['common'])

  const showHandler = () => {
    setIsShown(prevState => !prevState)
  }

  return (
    <div className={s.question}>
      <div className={s.questionHeader}>
        <div className={s.questionTitle}>{title}</div>
        <DetailButton
          onClick={showHandler}
          classname={s.questionButton}
        >
          {t('common:words.answer')}
        </DetailButton>
      </div>
      {isShown && <div className={s.questionContent}>{children}</div>}
    </div>
  )
}

export default Question
