import { getDate, getWeekOfMonth } from 'date-fns'
import { concat } from 'lodash'

import { DAYS_IN_WEEK } from 'shared/constants/priceCalendar'

import { DayPrices } from 'shared/types/dayCalendar'

// This function returns number of day in month, depending on number of week in month and number of day of week.
export const getPriceItemDate = (
  weekIndex: number,
  index: number,
  monthStart: number
): number => {
  let day = weekIndex * DAYS_IN_WEEK + (index + 1) - (monthStart - 1)
  return day
}

// This function return whether this week contains currentDate
export const getTicketRow = (
  weekIndex: number,
  date: Date | null
) => {
  if (
    date &&
    getWeekOfMonth(date, { weekStartsOn: 1 }) === weekIndex + 1
  ) {
    return true
  } else return false
}

// This function transform daily ticket prices array from API into array of the best prices for each day of month.
export const getDaysBestPriceArray = (
  daysArray: DayPrices[],
  daysInMonth: number
): Array<DayPrices | undefined> => {
  let calendarDayPriceArray = []

  let k = 0
  for (let i = 1; i <= daysInMonth; i++) {
    if (
      daysArray[k] &&
      getDate(new Date(daysArray[k].departure_at)) === i
    ) {
      let dayMinPrice = daysArray[k]

      while (
        daysArray[k] &&
        getDate(new Date(daysArray[k].departure_at)) === i
      ) {
        if (daysArray[k].price < dayMinPrice.price) {
          dayMinPrice = daysArray[k]
        }
        k++
      }
      calendarDayPriceArray[i - 1] = dayMinPrice
    } else {
      calendarDayPriceArray[i - 1] = undefined
    }
  }
  return calendarDayPriceArray
}

// This function concat DaysBestPriceArray with starting and ending empty cells
export const getDayPriceCalendarArray = (
  daysBestPriceArray: Array<DayPrices | undefined>,
  startingCellsArray: null[],
  endingCellsArray: null[]
): Array<DayPrices | null | undefined> => {
  let dayPriceCalendarArray = []
  dayPriceCalendarArray = concat(
    startingCellsArray,
    daysBestPriceArray,
    endingCellsArray
  )
  return dayPriceCalendarArray
}

// This function divide DayPriceCalendar array into array of weeks
export const divideCalendarArrayIntoWeeks = (
  dayPriceCalendarArray: Array<DayPrices | null | undefined>
): Array<DayPrices | null | undefined>[] => {
  let calendarWeekPriceArray = []
  for (
    let i = 0;
    i < Math.ceil(dayPriceCalendarArray.length / DAYS_IN_WEEK);
    i++
  ) {
    calendarWeekPriceArray[i] = dayPriceCalendarArray.slice(
      i * DAYS_IN_WEEK,
      i * DAYS_IN_WEEK + DAYS_IN_WEEK
    )
  }

  return calendarWeekPriceArray
}
