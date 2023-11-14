import React, { FC, ReactNode, useState } from 'react'

import cn from 'classnames'

import Arrow from '/public/assets/images/buttonArrow.svg'

import s from './detailButton.module.scss'

export interface DetailButtonProps {
  onClick?: () => void
  children: string | ReactNode
  classname?: string
  isDefaultOpen?: boolean
  isOpen?: boolean | null
  variant?: 'question' | 'detail' | 'about'
  hasIcon?: boolean
}

const DetailButton: FC<DetailButtonProps> = ({
  isDefaultOpen,
  children,
  onClick,
  classname,
  variant = 'detail',
  hasIcon = true,
  isOpen = null,
}) => {
  const [isLocalOpen, setIsLocalOpen] = useState(isDefaultOpen)

  const handleClick = () => {
    if (isOpen === null) setIsLocalOpen(prevState => !prevState)
    onClick?.()
  }

  return (
    <button
      className={cn(
        s[variant],
        { [s.isOpened]: isOpen ?? isLocalOpen },
        classname
      )}
      onClick={handleClick}
    >
      {children}

      <div>
        {hasIcon ? (
          <Arrow
            className={cn(s.arrow, {
              [s.arrowDown]: isOpen ?? isLocalOpen,
            })}
          />
        ) : null}
      </div>
    </button>
  )
}

export default DetailButton
