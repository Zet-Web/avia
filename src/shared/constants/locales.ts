import ru from 'date-fns/locale/ru'
import en from 'date-fns/locale/en-US'
import de from 'date-fns/locale/de'
import { Language } from 'shared/types'

export const locales = {
  [Language.EN]: en,
  [Language.RU]: ru,
  [Language.DE]: de,
}
