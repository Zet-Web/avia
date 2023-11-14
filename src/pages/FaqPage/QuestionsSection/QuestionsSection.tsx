import type { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { Question } from 'features'

import type { Question as QustionType } from 'shared/types/faq'

import s from './questionsSection.module.scss'

interface QuestionsSectionProps {
  questions: QustionType[]
}

export const QuestionsSection: FC<QuestionsSectionProps> = ({
  questions,
}) => {
  return (
    <div className={s.container}>
      {questions.map(question => (
        <Question key={question.id} title={question.question}>
          <ReactMarkdown>{question.answer}</ReactMarkdown>
        </Question>
      ))}
    </div>
  )
}
