import { SingleInputForm } from '../components/SingleInput/SingleInput'
import { InputArrayForm } from '../components/InputArray/InputArray'
import { getGeoValidator } from 'shared/api/routes/geo'
import { AviaTicketClass, Language } from 'shared/types'
import { City } from 'shared/types/cities'
import { Directions } from 'shared/types/geo'
import { formatApiDate } from 'shared/helpers/date/formatApiDate'
import { Find, SingleRouteDate } from 'shared/types/ticket'

function mergeDirectionValue(
  code: string,
  city: City
): Directions | null {
  const newValue = city.airports?.filter(a => a.code === code)[0]

  if (newValue) {
    return {
      title: newValue.title,
      abbreviation: newValue.code,
    }
  }

  if (code === city.code) {
    return {
      title: city.title,
      abbreviation: city.code,
    }
  }

  return null
}

export async function mergeSingleForm(
  form: SingleInputForm,
  ticketQuery: Find,
  searchCode: string,
  locale: Language
): Promise<SingleInputForm> {
  const directions = searchCode.split('^')[0].split('>')

  if (form.direction.origin?.abbreviation !== directions[0]) {
    const origin = await getGeoValidator(
      ticketQuery.directions[0].origin,
      {
        language: locale,
        limit: 1,
        details: 0,
      }
    )

    form.direction.origin = mergeDirectionValue(
      directions[0],
      origin.data[0]
    )
  }

  if (form.direction.destination?.abbreviation !== directions[1]) {
    const destination = await getGeoValidator(
      ticketQuery.directions[0].destination,
      {
        language: locale,
        limit: 1,
        details: 0,
      }
    )

    form.direction.destination = mergeDirectionValue(
      directions[1],
      destination.data[0]
    )
  }

  form.date = form.date.map((d, index) =>
    ticketQuery.directions[index]
      ? new Date(ticketQuery.directions[index].date)
      : null
  ) as SingleRouteDate

  form.passengers = {
    ...ticketQuery.passengers,
    isEconomSelected:
      ticketQuery.trip_class === AviaTicketClass.ECONOMY,
    isBusinessSelected:
      ticketQuery.trip_class === AviaTicketClass.BUSINESS,
  }
  return form
}

export async function mergeDifficultForm(
  form: InputArrayForm,
  ticketQuery: Find,
  searchCode: string,
  locale: Language
): Promise<InputArrayForm> {
  const directions = searchCode
    .split('|')[0]
    .split(':')
    .map(d => {
      const dir = d.split('^')[0].split('>')
      return {
        origin: dir[0],
        destination: dir[1],
      }
    })

  for (let i = 0; i < ticketQuery.directions.length; i++) {
    if (!ticketQuery.directions[i]) form.directions.pop()
    if (!form.directions[i]) continue
    if (
      form.directions[i]?.direction.origin?.abbreviation !==
      directions[i]?.origin
    ) {
      const origin = await getGeoValidator(
        ticketQuery.directions[i].origin,
        {
          language: locale,
          limit: 1,
          details: 0,
        }
      )

      if (form.directions[i]) {
        form.directions[i].direction.origin = mergeDirectionValue(
          directions[i]?.origin,
          origin.data[0]
        )
      } else {
        form.directions[i] = {
          direction: {
            origin: mergeDirectionValue(
              directions[i].origin,
              origin.data[0]
            ),
            destination: null,
          },
          date: '',
        }
      }
    }

    if (
      form.directions[i]?.direction.destination?.abbreviation !==
      directions[i]?.destination
    ) {
      const destination = await getGeoValidator(
        ticketQuery.directions[i].destination,
        {
          language: locale,
          limit: 1,
          details: 0,
        }
      )

      form.directions[i].direction.destination = mergeDirectionValue(
        directions[i].destination,
        destination.data[0]
      )
    }

    form.directions[i].date = formatApiDate(
      new Date(ticketQuery.directions[i].date)
    )

    form.passengers = {
      ...ticketQuery.passengers,
      isEconomSelected:
        ticketQuery.trip_class === AviaTicketClass.ECONOMY,
      isBusinessSelected:
        ticketQuery.trip_class === AviaTicketClass.BUSINESS,
    }
  }
  return form
}
