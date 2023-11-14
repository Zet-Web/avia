import React, { FC, useRef, useEffect } from 'react'
import cn from 'classnames'
import { useClickOutside } from 'shared/hooks/useClickOutside'
import { scrollLock } from 'shared/helpers/scrollLock'

import s from './MobileModal.module.scss'

interface ModalIosProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  isClosable?: boolean
  isClosedOnClickOutside?: boolean
  isCentered?: boolean
}

const MobileModal: FC<ModalIosProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  contentClassName,
  isClosable = true,
  isClosedOnClickOutside = true,
  isCentered = true,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollLock(isOpen)
  }, [isOpen])

  useClickOutside(overlayRef, () =>
    isClosedOnClickOutside ? onClose() : null
  )

  if (!isOpen) return null

  return (
    <div
      className={cn(s.modalWrapper, { [s.open]: isOpen }, className)}
      ref={overlayRef}
    >
      <div
        className={cn(
          s.modalContent,
          {
            [s.containerCentered]: isCentered,
          },
          contentClassName
        )}
      >
        <div className={s.modalHeader}>
          {isClosable && (
            <button className={s.modalCloseButton} onClick={onClose}>
              <span className={s.arrow}></span> Назад
            </button>
          )}
          {title && <p className={s.titleStyle}>{title}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}

export default MobileModal
