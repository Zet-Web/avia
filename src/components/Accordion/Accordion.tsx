import { FC, ReactNode, useState } from 'react'

import cn from 'classnames'

import s from './accordion.module.scss'

import Arrow from '/public/assets/images/buttonArrow.svg'

interface AccordionProps {
  title: ReactNode
  children: ReactNode
  isDefaultOpen?: boolean
  className?: string
}

export const Accordion: FC<AccordionProps> = ({
  title,
  children,
  isDefaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isDefaultOpen)

  return (
    <div className={cn(s.wrapper, className)}>
      <button
        className={s.header}
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        <span>{title}</span>
        <Arrow className={cn(s.arrow, { [s.arrowDown]: isOpen })} />
      </button>
      {isOpen && children}
    </div>
  )
}
