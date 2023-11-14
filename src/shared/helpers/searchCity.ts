import { City } from 'shared/types/cities'
import { Directions } from 'shared/types/geo'

export const searchCity = (
  options: City[] | undefined,
  cityName: string
): Directions | null => {
  const filterCityFrom: City[] | undefined = options?.filter(
    city => city.title === cityName
  )

  const result = filterCityFrom?.length
    ? filterCityFrom
    : options?.[0]?.airports?.filter(
        airport => airport.title === cityName
      )
  const direction = result?.length
    ? {
        title: result?.[0]?.title,
        abbreviation: result?.[0]?.code,
      }
    : null
  return direction
}
