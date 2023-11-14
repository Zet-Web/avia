import { Find } from 'shared/types/ticket'

export function getRouteType(
  route?: Find
): 'simple' | 'difficult' | null {
  if (!route?.directions) return null

  if (route.directions.length === 1) return 'simple'

  if (route.directions.length === 2) {
    if (
      route.directions[0].origin === route.directions[1].destination
    )
      return 'simple'
  }

  return 'difficult'
}
