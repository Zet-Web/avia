import { FC, ReactNode } from 'react'

import cn from 'classnames'

import s from './text.module.scss'

interface TextProps {
  children: ReactNode
  As?: 'p' | 'span'
  className?: string
  onClick?: () => void
}

const Text: FC<TextProps> = ({
  As = 'p',
  children,
  className,
  ...props
}) => {
  return (
    <As className={cn(className, s.text)} {...props}>
      {children}
    </As>
  )
}

export default Text
