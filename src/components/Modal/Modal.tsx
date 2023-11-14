import { FC, ReactNode, useEffect, useRef } from 'react'

import { useClickOutside } from 'shared/hooks/useClickOutside'

import CloseIcon from '/public/assets/images/icons/CloseIcon.svg'

import cn from 'classnames'
import { scrollLock } from 'shared/helpers/scrollLock'
import s from './modal.module.scss'
import MobileModal from '../MobileModal/MobileModal'
import { useWindowDimensions } from '../../shared/hooks/useWindowDimension'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
  contentClassName?: string
  isClosable?: boolean
  variant?: 'blue' | 'white'
  isClosedOnClickOutside?: boolean
  isCentered?: boolean
  hasMobileModal?: boolean
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  isClosable = true,
  onClose,
  className,
  contentClassName,
  variant = 'blue',
  isClosedOnClickOutside = true,
  isCentered = true,
  hasMobileModal = false,
}) => {
  const { width } = useWindowDimensions()
  const isMobile = width < 768
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollLock(isOpen)
  }, [isOpen])

  useClickOutside(overlayRef, () =>
    isClosedOnClickOutside ? onClose() : null
  )

  if (!isOpen) return null

  return (
    <>
      {isMobile ? (
        <MobileModal isOpen={isOpen} onClose={onClose}>
          {children}
        </MobileModal>
      ) : (
        <div
          className={cn(
            s.modalOverlay,
            { [s.white]: variant === 'white' },
            className
          )}
          ref={!isClosable ? overlayRef : null}
        >
          <div
            className={cn(s.modalContainer, {
              [s.containerCentered]: isCentered,
            })}
          >
            <div
              className={cn(s.modalContent, contentClassName)}
              ref={isClosable ? overlayRef : null}
            >
              {isClosable && (
                <button
                  className={cn(s.closeBtn, {
                    [s.blue]: variant === 'white',
                  })}
                  onClick={onClose}
                >
                  <span className={s.closeText}>закрыть</span>
                  <CloseIcon className={s.closeIcon} />
                </button>
              )}
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
