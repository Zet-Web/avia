import { Language } from '../types'
import { ReactNode } from 'react'
import RussiaFlagIcon from '../../../public/assets/images/icons/flags/russia.svg'
import GermanyIcon from '../../../public/assets/images/icons/flags/germany.svg'
import UKIcon from '../../../public/assets/images/icons/flags/united-kingdom.svg'

export const getLanguageIcon = (language: Language): ReactNode => {
  switch (language) {
    case Language.RU:
      return <RussiaFlagIcon />
    case Language.DE:
      return <GermanyIcon />
    case Language.EN:
      return <UKIcon />
  }
}
