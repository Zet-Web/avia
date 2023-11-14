import { BetweenDataTime, BetweenInt } from '../../types/ticket'

export const dateBetweenToInt = (
  between: BetweenDataTime,
  defaultBetween?: BetweenDataTime
): BetweenInt => ({
  min: defaultBetween
    ? (Date.parse(between.min) - Date.parse(defaultBetween.min)) /
      1000 /
      60
    : 0,
  max: defaultBetween
    ? (Date.parse(between.max as string) -
        Date.parse(defaultBetween.min as string)) /
      1000 /
      60
    : (Date.parse(between.max as string) -
        Date.parse(between.min as string)) /
      1000 /
      60,
})
