import { ChangeEventHandler, FC, MouseEventHandler } from 'react'

import cn from 'classnames'

import s from './counter.module.scss'

interface CounterProps {
  min?: number
  max?: number
  value: number
  onChange: (value: number) => void
}

const Counter: FC<CounterProps> = ({
  min = 0,
  max,
  value,
  onChange,
}) => {
  const isValid = (value: number): boolean => {
    if (max !== undefined && value > max) return false
    if (value < min) return false
    return true
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const newValue: number = +e.target.value.replace(/\D/, '')
    if (isValid(newValue)) onChange(newValue)
  }

  const increment: MouseEventHandler<HTMLButtonElement> = e => {
    const newValue: number = value + 1
    if (isValid(newValue)) onChange(newValue)
  }

  const decrement: MouseEventHandler<HTMLButtonElement> = e => {
    const newValue: number = value - 1
    if (isValid(newValue)) onChange(newValue)
  }

  return (
    <div className={s.wrapper}>
      <button
        type='button'
        className={s.btn}
        disabled={value === min}
        onClick={decrement}
      >
        -
      </button>
      <input
        type='button'
        className={s.input}
        value={value}
        onChange={handleChange}
      />
      <button
        type='button'
        className={cn(s.btn, s.btn_right)}
        disabled={value === max}
        onClick={increment}
      >
        +
      </button>
    </div>
  )
}

export default Counter
