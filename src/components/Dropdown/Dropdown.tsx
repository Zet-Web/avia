import { useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'

import cn from 'classnames'

import type { Option } from 'shared/types/option'

import Arrow from '/public/assets/images/arrowUp.svg'

import s from './dropdown.module.scss'

type DropdownProps = {
  isActive: boolean
  onClick: (value: string) => void
  options: Option[]
  value?: string
}

const getAccordionHeight = (
  itemHeight: number,
  itemsCount: number,
  scrollHeight?: number
): number => {
  return scrollHeight || itemHeight * itemsCount + 5
}

const Dropdown = (props: DropdownProps) => {
  const { t } = useTranslation('common')
  const ref = useRef<HTMLUListElement | null>(null)
  const { isActive, onClick, options, value } = props

  const getCurrentOptions = (
    value: string | undefined,
    options: Option[]
  ) =>
    value
      ? options.filter(option => value === option.label)[0]
      : options[0]

  const [currentOption, setCurrentOption] = useState(
    getCurrentOptions(value, options)
  )

  const otherItems = options.filter(
    option => option.label !== currentOption.label
  )

  return (
    <div className={s.dropdown}>
      <button
        onClick={() => onClick(currentOption.label)}
        className={s.button}
      >
        <div className={s.currencyIcon}>{currentOption.icon}</div>
        <p>{t(currentOption.title)}</p>
        <Arrow
          className={cn(s.arrow, {
            [s.activeArrow]: isActive,
          })}
        />
      </button>
      <ul
        className={s.dropdownMenu}
        ref={ref}
        style={
          isActive
            ? {
                height: getAccordionHeight(
                  20,
                  otherItems.length,
                  ref.current?.scrollHeight
                ),
              }
            : { height: 0 }
        }
      >
        {otherItems.map(option => (
          <li
            key={option.label}
            onClick={() => {
              setCurrentOption(option)
              onClick(option.label)
            }}
          >
            <div className={s.currencyIcon}>{option.icon}</div>
            <p>{t(option.title)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
