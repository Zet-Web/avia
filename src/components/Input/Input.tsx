import { FC, RefObject, useId } from 'react'

import cn from 'classnames'

import s from './input.module.scss'

interface InputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  placeholderClassName?: string
  label?: string
  className?: string
  hasAutoFocus?: boolean
  onClick?: () => void
  type?: string
  id?: string
  isDisabled?: boolean
  hasLabel?: boolean
  isReadOnly?: boolean
  forwardRef?: RefObject<HTMLInputElement>
  hasSpellCheck?: boolean
  error?: string[]
}

const Input: FC<InputProps> = ({
  className,
  onChange,
  onClick,
  isDisabled = false,
  hasAutoFocus = false,
  type = 'text',
  placeholder,
  placeholderClassName,
  id,
  hasLabel = true,
  isReadOnly = false,
  forwardRef,
  error,
  ...props
}) => {
  const defaultId = useId()

  return hasLabel ? (
    <div className={s.label}>
      <input
        readOnly={isReadOnly}
        className={cn(s.input, error?.length && s.input_error, className)}
        disabled={isDisabled}
        onClick={onClick}
        onChange={e => onChange?.(e.target.value)}
        autoFocus={hasAutoFocus}
        type={type}
        id={id ?? defaultId}
        placeholder={placeholder}
        ref={forwardRef}
        {...props}
      />
      <label
        className={cn(s.text, placeholderClassName)}
        htmlFor={id ?? defaultId}
      >
        {placeholder}
      </label>
      {error?.length && <span className={s.error}>{error[0]}</span>}
    </div>
  ) : (
    <input
      className={cn(s.input, className)}
      disabled={isDisabled}
      onClick={onClick}
      onChange={e => onChange?.(e.target.value)}
      autoFocus={hasAutoFocus}
      type={type}
      id={id ?? defaultId}
      placeholder={placeholder}
      ref={forwardRef}
      {...props}
    />
  )
}

export default Input
