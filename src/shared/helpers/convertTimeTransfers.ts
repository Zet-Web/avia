import { Route } from '../types/ticket'

export const convertTimeTransfers = (
  route: Route,
  index: number,
  time_route: number
): number => {
  const marginLeft: number[] = []

  route.transfers.map(i => marginLeft.push(i.duration_seconds / 60))
  return (marginLeft[index] / time_route) * 100
}
