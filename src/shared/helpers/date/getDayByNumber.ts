export function getDayByNumber(day: number): string {
  const daysName = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  return `days.${daysName[day]}`
}
