import { FC, ReactNode } from 'react'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'next-i18next'

import { Range } from 'components'
import { convertMinsToHrsMins } from 'shared/helpers/date/convertMinsToHrsMins'
import { formatDateTime } from 'shared/helpers/date/formatDateTime'

import { dateBetweenToInt } from 'shared/helpers/date/dateBetweenToInt'
import { intBetweenToDate } from 'shared/helpers/date/intBetweenToDate'

import { BetweenDataTime, BetweenInt } from 'shared/types/ticket'

import s from '../ticketFilter.module.scss'

interface DoubleRangeFieldArrayProps {
  control: Control<any>
  nameDeparture: string
  nameArrival: string
  itemsDeparture: Array<BetweenInt | BetweenDataTime>
  itemsArrival: Array<BetweenInt | BetweenDataTime>
  getOrigin?: (index: number) => ReactNode
  getDestination?: (index: number) => ReactNode
  getDirection?: (index: number) => ReactNode
}

export const DoubleRangeFieldArray: FC<
  DoubleRangeFieldArrayProps
> = ({
  control,
  nameDeparture,
  nameArrival,
  itemsDeparture,
  itemsArrival,
  getOrigin,
  getDestination,
  getDirection,
}) => {
  const { t } = useTranslation(['common'])

  return (
    <div className={s.fieldArray}>
      {itemsDeparture.map((item, index: number) => {
        const departureValue =
          typeof item.min === 'string'
            ? dateBetweenToInt(item as BetweenDataTime)
            : (item as BetweenInt)
        const arrivalValue =
          typeof itemsArrival[index].min === 'string'
            ? dateBetweenToInt(itemsArrival[index] as BetweenDataTime)
            : (itemsArrival[index] as BetweenInt)
        return (
          <div key={index}>
            <div>{getDirection && getDirection(index)}</div>
            {item.min !== item.max && (
              <>
                <div>{getOrigin && getOrigin(index)}</div>
                <Controller
                  defaultValue={
                    typeof item.min === 'string'
                      ? intBetweenToDate(
                          departureValue as BetweenInt,
                          item as BetweenDataTime
                        )
                      : departureValue
                  }
                  control={control}
                  name={`${nameDeparture}.${index}`}
                  render={({ field: { onChange, value } }) => (
                    <div className={s.rangeWrapperLarge}>
                      <div className={s.rangeHeader}>
                        <span>
                          {t('common:words.fromLower')}{' '}
                          {typeof item.min === 'string'
                            ? formatDateTime(value.min)
                            : convertMinsToHrsMins(value.min, {
                                h: t('common:time.h'),
                                m: t('common:time.m'),
                              })}
                        </span>
                        <span>
                          {t('common:words.untilLower')}{' '}
                          {typeof item.min === 'string'
                            ? formatDateTime(value.max)
                            : convertMinsToHrsMins(value.max, {
                                h: t('common:time.h'),
                                m: t('common:time.m'),
                              })}
                        </span>
                      </div>
                      <Range
                        min={departureValue.min}
                        max={departureValue.max}
                        step={5}
                        value={() => {
                          const val =
                            typeof value.min === 'string'
                              ? dateBetweenToInt(
                                  value as BetweenDataTime,
                                  item as BetweenDataTime
                                )
                              : (value as BetweenInt)
                          return [val.min, val.max]
                        }}
                        onChange={val =>
                          onChange(
                            typeof item.min === 'string'
                              ? intBetweenToDate(
                                  { min: val[0], max: val[1] },
                                  item as BetweenDataTime
                                )
                              : { min: val[0], max: val[1] }
                          )
                        }
                      />
                    </div>
                  )}
                />
              </>
            )}

            {itemsArrival[index].min !== itemsArrival[index].max && (
              <>
                <div>{getDestination && getDestination(index)}</div>
                <Controller
                  defaultValue={
                    typeof itemsArrival[index].min === 'string'
                      ? intBetweenToDate(
                          arrivalValue as BetweenInt,
                          itemsArrival[index] as BetweenDataTime
                        )
                      : arrivalValue
                  }
                  control={control}
                  name={`${nameArrival}.${index}`}
                  render={({ field: { onChange, value } }) => (
                    <div className={s.rangeWrapper}>
                      <div className={s.rangeHeader}>
                        <span>
                          {t('common:words.fromLower')}{' '}
                          {typeof itemsArrival[index].min === 'string'
                            ? formatDateTime(value.min)
                            : convertMinsToHrsMins(value.min, {
                                h: t('common:time.h'),
                                m: t('common:time.m'),
                              })}
                        </span>
                        <span>
                          {t('common:words.untilLower')}{' '}
                          {typeof itemsArrival[index].max === 'string'
                            ? formatDateTime(value.max)
                            : convertMinsToHrsMins(value.max, {
                                h: t('common:time.h'),
                                m: t('common:time.m'),
                              })}
                        </span>
                      </div>
                      <Range
                        min={arrivalValue.min}
                        max={arrivalValue.max}
                        step={5}
                        value={() => {
                          const val =
                            typeof value.min === 'string'
                              ? dateBetweenToInt(
                                  value as BetweenDataTime,
                                  itemsArrival[
                                    index
                                  ] as BetweenDataTime
                                )
                              : (value as BetweenInt)
                          return [val.min, val.max]
                        }}
                        onChange={val =>
                          onChange(
                            typeof itemsArrival[index].min ===
                              'string'
                              ? intBetweenToDate(
                                  { min: val[0], max: val[1] },
                                  itemsArrival[
                                    index
                                  ] as BetweenDataTime
                                )
                              : { min: val[0], max: val[1] }
                          )
                        }
                      />
                    </div>
                  )}
                />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

interface RangeFieldArrayProps {
  control: Control<any>
  name: string
  items: Array<BetweenInt | BetweenDataTime>
  getDirection?: (index: number) => ReactNode
  isVisible?: boolean[]
}

export const RangeFieldArray: FC<RangeFieldArrayProps> = ({
  control,
  name,
  items,
  getDirection,
  isVisible,
}) => {
  const { t } = useTranslation(['common'])
  return (
    <div className={s.fieldArray}>
      {items.map((item, index: number) => {
        const defaultValue =
          typeof item.min === 'string'
            ? dateBetweenToInt(item as BetweenDataTime)
            : (item as BetweenInt)
        return (
          (!isVisible || isVisible[index]) &&
          item.min !== item.max && (
            <div key={index}>
              <div>{getDirection && getDirection(index)}</div>
              <Controller
                defaultValue={
                  typeof item.min === 'string'
                    ? intBetweenToDate(
                        defaultValue as BetweenInt,
                        item as BetweenDataTime
                      )
                    : defaultValue
                }
                control={control}
                name={`${name}.${index}`}
                render={({ field: { onChange, value } }) => (
                  <div className={s.rangeWrapper}>
                    <div className={s.rangeHeader}>
                      <span>
                        {t('common:words.fromLower')}{' '}
                        {typeof item.min === 'string'
                          ? formatDateTime(value.min)
                          : convertMinsToHrsMins(value.min, {
                              h: t('common:time.h'),
                              m: t('common:time.m'),
                            })}
                      </span>
                      <span>
                        {t('common:words.untilLower')}{' '}
                        {typeof item.max === 'string'
                          ? formatDateTime(value.max)
                          : convertMinsToHrsMins(value.max, {
                              h: t('common:time.h'),
                              m: t('common:time.m'),
                            })}
                      </span>
                    </div>
                    <Range
                      min={defaultValue.min}
                      max={defaultValue.max}
                      step={5}
                      value={() => {
                        const val =
                          typeof value.min === 'string'
                            ? dateBetweenToInt(
                                value as BetweenDataTime,
                                item as BetweenDataTime
                              )
                            : (value as BetweenInt)
                        return [val.min, val.max]
                      }}
                      onChange={val =>
                        onChange(
                          typeof item.min === 'string'
                            ? intBetweenToDate(
                                { min: val[0], max: val[1] },
                                item as BetweenDataTime
                              )
                            : { min: val[0], max: val[1] }
                        )
                      }
                    />
                  </div>
                )}
              />
            </div>
          )
        )
      })}
    </div>
  )
}
