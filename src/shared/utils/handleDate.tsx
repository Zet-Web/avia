import {
  format,
  parse,
  compareAsc,
} from 'date-fns'

import { DateMask, DateTimeMask, TimeMask } from 'shared/types'

export const parseDate = (date: DateMask | null): Date | null => {
  if (!date) return null
  return parse(date, 'yyyy-MM-dd', new Date())
}

export const parseDateTime = (
  date: DateTimeMask | null
): Date | null => {
  if (!date) return null
  return parse(date, 'yyyy-MM-dd HH:mm:ss', new Date())
}

export const formatDate = (date: Date | null): DateMask | null => {
  if (!date) return null
  return format(date, 'yyyy-MM-dd') as DateMask
}

export const formatTime = (date: Date | null): TimeMask | null => {
  if (!date) return null
  return format(date, 'HH:mm') as TimeMask
}

export const compareDate = (
  dateFirst: DateTimeMask | null,
  dateSecond: DateTimeMask | null
): boolean => {
  if (!dateFirst || !dateSecond) return false

  return (
    formatDate(parseDateTime(dateFirst)) ===
    formatDate(parseDateTime(dateSecond))
  )
}

export const isDatePassed = (date: DateTimeMask): boolean => {
  const parsedDate = parseDateTime(date)
  if (parsedDate === null) return false

  return compareAsc(parsedDate, new Date()) < 0
}
