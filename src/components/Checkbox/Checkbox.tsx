import { FC, ChangeEvent } from 'react'
import cn from 'classnames'

import s from './checkbox.module.scss'

interface CheckboxProps {
  isChecked?: boolean
  type?: 'checkbox' | 'checkmark' | 'radio'
  label?: string
  value?: string | number
  name?: string
  className?: string
  onChange?: (event: boolean) => void
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  isChecked,
  type = 'checkmark',
  onChange,
  className,
  name,
  value,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked)
  }
  const checkboxClass = cn(className, s[type])
  return (
    <label className={cn(s.container, className)}>
      <input
        className={s.defaultCheckbox}
        type={type}
        checked={isChecked}
        onChange={handleChange}
        name={name}
        value={value}
      />
      <span className={checkboxClass} />
      {label}
    </label>
  )
}

export default Checkbox
