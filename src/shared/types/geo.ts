export interface GeoType {
  id: string
  code: string
  country_title: string
  title: string
  airports: Airports[]
}

interface Airports {
  id: string
  code: string
  title: string
}

export interface Directions {
  title: string
  abbreviation: string
}

export interface ValidatorParams {
  offset?: number
  limit: number
  details: number
  language: string
}

export type TicketState = {
  origin: Directions | null
  destination: Directions | null
}
