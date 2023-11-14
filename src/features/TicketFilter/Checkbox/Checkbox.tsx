import { FC, ReactNode } from 'react'
import { Control } from 'react-hook-form'

import CheckboxGroup from 'features/CheckboxGroup/CheckboxGroup'

import s from '../ticketFilter.module.scss'

interface CheckboxGroupArrayProps {
  control: Control<any>
  name: string
  items: Array<any[]>
  getLabel?: (title: string) => string
  hasReset?: boolean
}

export const CheckboxGroupFieldArray: FC<CheckboxGroupArrayProps> = ({
  control,
  name,
  items,
  getLabel = t => t,
  hasReset = false,
}) => {
  return (
    <div className={s.fieldArray}>
      {items.map((item, index: number) => {
        return (
          <div key={index}>
            <CheckboxGroup
              control={control}
              name={`${name}.${index}`}
              options={item.map(t => ({
                label: getLabel(t),
                value: t,
              }))}
              defaultChecked={item}
              hasReset={hasReset}
              hasSelectAll
            />
          </div>
        )
      })}
    </div>
  )
}

interface MultiCheckboxGroupArrayProps {
  control: Control<any>
  name: string
  items: Array<any[][][]>
  getCountry?: (code: string) => ReactNode
  getAirport?: (title: string) => string
  getGroupTitle?: (index: number) => ReactNode
  getDirection?: (index: number) => ReactNode
  hasReset?: boolean
  isVisible?: boolean[]
  getCount?: (index: number) => number | undefined
}

export const MultiCheckboxGroupFieldArray: FC<
  MultiCheckboxGroupArrayProps
> = ({
  control,
  name,
  items,
  getCountry,
  getAirport = t => t,
  getGroupTitle,
  getDirection,
  hasReset = false,
  isVisible,
  getCount,
}) => {
  return (
    <div className={s.fieldArray}>
      {items.map((item, index: number) => {
        const items = getCount ? item.slice(0, getCount(index)) : item
        return (
          (!isVisible || isVisible[index]) && (
            <div key={index}>
              {getDirection && getDirection(index)}
              {items.map((i, subIndex) => (
                <div key={subIndex}>
                  {getGroupTitle && getGroupTitle(subIndex)}
                  {i.map((a, indx) => (
                    <div className={s.checkboxGroup} key={indx}>
                      <div>{getCountry && getCountry(a[0])}</div>
                      <CheckboxGroup
                        control={control}
                        name={`${name}.${index}.${subIndex}.${indx}`}
                        options={a.map((t: string) => ({
                          label: getAirport(t),
                          value: t,
                        }))}
                        defaultChecked={a}
                        hasReset={hasReset}
                        hasSelectAll={a.length > 1}
                        isRequired={false}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )
        )
      })}
    </div>
  )
}

interface DoubleCheckboxFieldArrayProps {
  control: Control<any>
  nameDeparture: string
  nameArrival: string
  itemsDeparture: Array<any[]>
  itemsArrival: Array<any[]>
  getLabel: (code: string) => ReactNode
  getDepartureDefaultValue: (index: number) => string[]
  getArrivalDefaultValue: (index: number) => string[]
  getOrigin?: (index: number) => ReactNode
  getDestination?: (index: number) => ReactNode
  getDirection?: (index: number) => ReactNode
  getGroupTitle?: (index: number) => ReactNode
}

export const DoubleCheckboxGroupFieldArray: FC<
  DoubleCheckboxFieldArrayProps
> = ({
  control,
  nameDeparture,
  nameArrival,
  itemsDeparture,
  itemsArrival,
  getLabel,
  getDepartureDefaultValue,
  getArrivalDefaultValue,
  getOrigin = (index: number) => null,
  getDestination = (index: number) => null,
  getDirection = (index: number) => null,
}) => {
  return (
    <div className={s.fieldArray}>
      {itemsDeparture.map((arrayDeparture, index) => {
        const arrayArrival = itemsArrival[index]
        return (
          <div key={index}>
            {getDirection(index)}
            <div className={s.checkboxGroup}>
              {getOrigin(index)}
              <CheckboxGroup
                control={control}
                name={`${nameDeparture}.${index}`}
                options={arrayDeparture.map(a => ({
                  value: a,
                  label: getLabel(a),
                }))}
                defaultChecked={getDepartureDefaultValue(index)}
                hasSelectAll={arrayDeparture.length > 1}
              />
            </div>
            <div className={s.checkboxGroup}>
              {getDestination(index)}
              <CheckboxGroup
                control={control}
                name={`${nameArrival}.${index}`}
                options={arrayArrival.map(a => ({
                  value: a,
                  label: getLabel(a),
                }))}
                defaultChecked={getArrivalDefaultValue(index)}
                hasSelectAll={arrayArrival.length > 1}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
