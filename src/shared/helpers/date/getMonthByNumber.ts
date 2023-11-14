export function getMonthByNumber(month: number): string {
  const monthName = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'July',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]

  return `months.${monthName[month]}`
}
