import { BetweenDataTime, BetweenInt } from '../../types/ticket'
import { formatApi } from './formatApi'

export const intBetweenToDate = (
  beetween: BetweenInt,
  defaultBetween: BetweenDataTime
): BetweenDataTime => {
  return {
    min: formatApi(
      new Date(
        Date.parse(defaultBetween.min) + beetween.min * 60 * 1000
      )
    ),
    max: formatApi(
      new Date(
        Date.parse(defaultBetween.max) +
          Date.parse(defaultBetween.min) -
          (Date.parse(defaultBetween.max) - beetween.max * 60 * 1000)
      )
    ),
  }
}
