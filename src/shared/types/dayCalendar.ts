export interface MonthPrices {
  date: string
  price: number
}

export interface DayPrices {
  departure_at: string
  price: number
}

export interface TicketMetadata {
  origin: string
  destination: string
  isOneWaySelected: boolean
  currency: string
  departure_at: string
  return_at: string | null
  isNoneSelected: boolean
  create_datatime: string
}

export interface CalendarPriceTicket {
  price: number
  origin: string
  destination: string
  origin_airport: string
  destination_airport: string
  airline: string
  flight_number: string
  departure_at: string
  departure_to: string
  return_at: string | null
  return_to: string | null
  transfers: number
  return_transfers: number
  duration: number
  origin_title: string
  destination_title: string
  origin_airport_title: string
  destination_airport_title: string
  state: string
}
