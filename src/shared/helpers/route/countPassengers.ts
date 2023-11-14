import { Passengers } from '../../types/user'

export const countPassengers = (passengers: Passengers): number => {
  let numOfPassengers = 0
  for (let value of Object.values(passengers)) {
    numOfPassengers += value
  }
  return numOfPassengers
}
