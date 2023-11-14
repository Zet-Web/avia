import { FC } from 'react'

import type { AccordionLabels } from 'shared/types/accordion'

import { Dropdown } from 'components'

import { Currency, Language } from '../../../shared/types'
import { currencyOptions, langOptions } from '../options'

import s from '../dropdownMenu.module.scss'

interface BottomMenuProps {
  currentAccordionProp: AccordionLabels
  currentCurrency: Currency
  currentLanguage: Language
  menu?: AccordionLabels
  isActive?: boolean
  onClick?: (newValue: string) => void
}

export const BottomMenu: FC<BottomMenuProps> = ({
  currentCurrency,
  currentLanguage,
  menu,
  isActive = true,
  onClick,
}) => {
  const handleAccordionClick = (val: string) => {
    onClick?.(val)
  }

  return (
    <div className={s.accordionMenu}>
      {menu === 'language' ? (
        <Dropdown
          value={currentLanguage}
          options={langOptions}
          onClick={handleAccordionClick}
          isActive={isActive}
        />
      ) : (
        <Dropdown
          value={currentCurrency}
          isActive={isActive}
          onClick={handleAccordionClick}
          options={currencyOptions}
        />
      )}
    </div>
  )
}
