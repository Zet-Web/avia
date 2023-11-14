import { FC } from 'react'

import cn from 'classnames'

import type { AccordionLabels } from 'shared/types/accordion'

import { Currency, Language } from 'shared/types'

import { BottomMenu } from './BottomMenu'
import { TopMenu } from './TopMenu'

import s from './dropdownMenu.module.scss'

interface DropdownMenuProps {
  currentAccordion?: AccordionLabels
  currentCurrency?: Currency
  currentLanguage?: Language
  className?: string
  menu?: AccordionLabels
  hasTopMenu?: boolean
  isActive?: boolean
  onClick?: (newValue: string) => void
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  currentAccordion = 'language',
  currentCurrency = Currency.RUB,
  currentLanguage = Language.RU,
  className,
  menu,
  hasTopMenu,
  isActive = true,
  onClick,
}) => {
  return (
    <div className={cn(s.root, className)}>
      {hasTopMenu && <TopMenu onClick={() => {}} />}
      <BottomMenu
        menu={menu}
        currentAccordionProp={currentAccordion}
        currentCurrency={currentCurrency}
        currentLanguage={currentLanguage}
        isActive={isActive}
        onClick={onClick}
      />
    </div>
  )
}

export default DropdownMenu
