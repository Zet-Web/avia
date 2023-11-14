import { getMonth } from 'date-fns'

import { MONTHS_IN_YEAR } from 'shared/constants/priceCalendar'

import { MonthPrices } from 'shared/types/dayCalendar'

export const getMonthPricesArray = (
  monthArray: MonthPrices[] | undefined
): Array<MonthPrices | number> => {
  let monthPricesArray: Array<MonthPrices | number> = []
  let k = 0

  if (!monthArray || !monthArray.length) return monthPricesArray
  else {
    if (monthArray.length > 12) {
      monthPricesArray = monthArray?.slice(0, monthArray.length - 1)
    } else if (monthArray.length == 12) {
      monthPricesArray = monthArray
    } else {
      let start = getMonth(new Date(monthArray[k].date))
      for (let i = 0; i < MONTHS_IN_YEAR; i++) {
        let currentMonth = (i + start) % MONTHS_IN_YEAR
        if (
          monthArray[k] &&
          getMonth(new Date(monthArray[k].date)) === currentMonth
        ) {
          monthPricesArray[i] = monthArray[k]
          k++
        } else {
          monthPricesArray[i] = currentMonth
        }
      }
    }
  }
  return monthPricesArray
}
