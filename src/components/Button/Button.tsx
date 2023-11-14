import { FC, ReactNode, RefObject } from 'react'
import cn from 'classnames'
import s from './button.module.scss'

interface ButtonProps {
  onClick?: () => void
  title: string
  className?: string
  type?: 'submit' | 'reset' | 'button'
  forwardRef?: RefObject<HTMLButtonElement>
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  textSize?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'default' | 'secondary'
}

const Button: FC<ButtonProps> = ({
  title,
  className,
  onClick,
  type = 'button',
  forwardRef,
  leftIcon,
  rightIcon,
  textSize = 'medium',
  variant = 'default',
}) => {
  return (
    <button
      className={cn(s.btn, s[variant], className, s[textSize])}
      onClick={() => onClick?.()}
      type={type}
      ref={forwardRef}
    >
      {leftIcon && <span className={s.iconLeft}>{leftIcon}</span>}
      {title}
      {rightIcon && <span className={s.iconRight}>{rightIcon}</span>}
    </button>
  )
}

export default Button
