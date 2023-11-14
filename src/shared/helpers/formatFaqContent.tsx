import { Question as QuestionItem } from '../types/faq'
import { STRAPI_IMAGE_MARKDOWN } from '../api'

export const formatFaqContent = (questions: QuestionItem[]) => {
  return questions.map(question => ({
    ...question,
    answer: question.answer.replace(
      /\/uploads/g,
      `${STRAPI_IMAGE_MARKDOWN}/uploads/`
    ),
  }))
}
