export const convertTimeToWith = (
  duration: number,
  time_route: number
): number => {
  return (duration / time_route) * 100
}
