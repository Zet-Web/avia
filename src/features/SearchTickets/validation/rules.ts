import { DirectionValue } from 'components/DirectionInput/DirectionInput'
import { Route } from '../components/InputArray/InputArray'
import { SingleRouteDate } from 'shared/types/ticket'

export const inputArrayRules = {
  directionInput: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    required: true,
    validate: (v: Route) =>
      v.direction.origin !== null && v.direction.destination !== null,
  },
}

export const singleInputRules = {
  directionInput: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    required: true,
    validate: (v: DirectionValue) =>
      v.origin !== null && v.destination !== null,
  },
  date: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    required: true,
    validate: (v: SingleRouteDate) => {
      if (v[0] === null) return false
      if (v[1] && v[1] < v[0]) return false
      return true
    },
  },
}
