import { FC } from 'react'

import cn from 'classnames'

import s from './textarea.module.scss'

interface TextAreaProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

const Textarea: FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <textarea
      value={value}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      className={cn(s.textAreaInput, className)}
    />
  )
}

export default Textarea
