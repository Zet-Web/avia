import { FC, useState } from 'react'

import type { AccordionLabels } from 'shared/types/accordion'

import DropdownMenu from '../DropdownMenu/DropdownMenu'
import SideMenu from '../SideMenu/SideMenu'
import { TopMenu } from '../DropdownMenu/TopMenu'

import { useWindowDimensions } from '../../shared/hooks/useWindowDimension'
import { smallTablet } from '../../shared/constants/breakpoints'

import Logo from '/public/assets/images/LogoBlue.svg'
import SideMenuCross from '/public/assets/images/icons/SidemenuCross.svg'

import s from './burgerMenu.module.scss'

interface BurgerMenuProps {
  isOpen: boolean
  onClose: () => void
}

const BurgerMenu: FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  const [accordionType, setAccordionType] =
    useState<AccordionLabels>('currency')

  const handleAccordionChange = () => {
    onClose?.()
  }

  const handleClick = (val: AccordionLabels) => () => {
    setAccordionType(val)
  }

  const { width } = useWindowDimensions()
  const isTabletView = width >= smallTablet

  return (
    <SideMenu
      isOpen={isOpen}
      className={s.sideMenu}
      hasCloseButton={false}
      isTableView={isTabletView}
      onClose={onClose}
    >
      <>
        {!isTabletView && (
          <div className={s.burgerHeader}>
            <Logo className={s.logo} />

            <div onClick={handleAccordionChange} className={s.close}>
              <SideMenuCross />
            </div>
          </div>
        )}

        <TopMenu onClick={onClose} />

        <DropdownMenu
          className={s.dropMenu}
          menu='currency'
          isActive={accordionType === 'currency'}
          onClick={handleClick('currency')}
        />

        <DropdownMenu
          className={s.dropMenu}
          menu='language'
          isActive={accordionType === 'language'}
          onClick={handleClick('language')}
        />
      </>
    </SideMenu>
  )
}

export default BurgerMenu
