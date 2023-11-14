import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { Control, useController } from 'react-hook-form'
import { SkeletonFiltersList } from 'features'
import { Button, Checkbox } from 'components'

import cn from 'classnames'

import s from './checkboxGroup.module.scss'

interface CheckboxGroupProps {
  control: Control<any>
  name: string
  options: Option[]
  hasReset?: boolean
  hasSelectAll?: boolean
  validate?: (value: string[]) => boolean
  errorMessage?: string
  defaultChecked?: any[]
  className?: string
  isRequired?: boolean
  isLoading?: boolean
}

type Option = {
  value: any
  label: any
  subLabel?: string
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  control,
  name,
  options,
  defaultChecked = [],
  hasReset = false,
  hasSelectAll,
  validate = (value: string[]) => true,
  errorMessage = '',
  className,
  isRequired = true,
  isLoading,
}) => {
  const { t } = useTranslation(['common'])
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultChecked,
    rules: {
      validate,
      required: errorMessage,
    },
  })

  const handleAllCheck = () => {
    if (isAllChecked(value)) {
      onChange({
        target: {
          value: defaultChecked,
        },
      })
    } else {
      onChange({
        target: {
          value: options
            .filter(o => o.value !== 'all')
            .map(o => o.value),
        },
      })
    }
  }

  const handleChange = (newValue: string) => {
    const currentValue = [...value]
    if (isAllChecked(currentValue)) {
      if (currentValue.length === 1 && !isRequired)
        return onChange({
          target: {
            value: [],
          },
        })

      if (
        currentValue.length === options.length &&
        isRequired &&
        newValue === 'all'
      )
        return

      return onChange({
        target: {
          value: [newValue],
        },
      })
    }

    if (newValue === 'all') {
      handleAllCheck()
    } else if (currentValue.includes(newValue)) {
      if (currentValue.length === 1 && isRequired) {
        return
      } else {
        return onChange({
          target: {
            value: currentValue.filter(v => v !== newValue),
          },
        })
      }
    } else {
      currentValue.push(newValue)
      onChange({
        target: {
          value: isAllChecked(currentValue)
            ? [...currentValue]
            : currentValue,
        },
      })
    }
  }

  const isAllChecked = (value: string[]) =>
    options.every(o => o.value === 'all' || value.includes(o.value))

  const isChecked = (val: string) => {
    return isAllChecked(value) && value.length > 1
      ? false
      : value.includes(val)
  }

  const reset = () => onChange({ target: { value: defaultChecked } })

  return (
    <>
      {hasReset && (
        <Button
          onClick={reset}
          title={t('common:words.reset')}
          className={s.resetButton}
        />
      )}
      {!isLoading && hasSelectAll && (
        <Checkbox
          type='checkbox'
          name={`${name}[all]`}
          value={'all'}
          isChecked={isAllChecked(value)}
          onChange={() => handleChange('all')}
          label={t(`common:words.all`) ?? 'all'}
        />
      )}
      {!isLoading &&
        options.map(option => (
          <div
            className={cn(s.checkboxWrapper, className)}
            key={option.value}
          >
            <Checkbox
              type='checkbox'
              name={`${name}[${option}]`}
              value={option.value}
              isChecked={isChecked(option.value)}
              onChange={() => handleChange(option.value)}
              label={option.label}
            />
            <span className={s.subLabel}>{option.subLabel}</span>
          </div>
        ))}
      {isLoading && <SkeletonFiltersList />}
      {error?.message && <span>{error.message}</span>}
    </>
  )
}

export default CheckboxGroup
