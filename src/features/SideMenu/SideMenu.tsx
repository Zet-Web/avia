import { FC, ReactNode, useEffect, useRef } from 'react'

import cn from 'classnames'

import SideMenuCross from '/public/assets/images/icons/SidemenuCross.svg'

import s from './sideMenu.module.scss'
import { useClickOutside } from '../../shared/hooks/useClickOutside'
import { scrollLock } from 'shared/helpers/scrollLock'

interface SideMenuProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
  hasCloseButton?: boolean
  className?: string
  isTableView?: boolean
}

const SideMenu: FC<SideMenuProps> = ({
  isOpen,
  onClose,
  children,
  hasCloseButton = true,
  className,
  isTableView,
}) => {
  const burgerOverlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollLock(isOpen)
  }, [isOpen])

  useClickOutside(burgerOverlayRef, () => onClose?.())

  const handleClose = () => {
    onClose?.()
  }

  return (
    <div
      className={cn(s.sideMenu, className, {
        [s.active]: isOpen,
        [s.tabletView]: isTableView,
      })}
      ref={burgerOverlayRef}
    >
      {hasCloseButton && (
        <div className={s.sideMenuHead}>
          <span className={s.cross} onClick={handleClose}>
            <SideMenuCross />
          </span>

          <span className={s.mobileCross} onClick={handleClose}>
            <div className={s.crossText}>закрыть</div>

            <SideMenuCross />
          </span>
        </div>
      )}

      <div className={s.sideMenuContent}>{children}</div>
    </div>
  )
}
export default SideMenu
