import { Currency } from './index'
import { Direction, Passengers } from './user'

export interface WeekPrice {
  departure_at: string
  datetime_at: {
    departure_at: string
    return_at: string | null
  }
  price: number | null
  state: string
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
}

export interface SellerLinkResponse {
  method: Method
  params?: {
    [key: string]: string
  }
  url: string
}

export interface MoreSellerResponse {
  count: number
  results: SellerView[]
}

export enum Baggage {
  baggage = 'baggage',
  handbag = 'handbag',
}

export enum Transplants {
  'without',
  'one',
  'two',
  'three_and_more',
}

export interface BetweenDataTime {
  min: string
  max: string
}

export interface BetweenInt {
  min: number
  max: number
}

export interface Airports {
  iata: string
  name: string
  city: string
  city_code: string
  country: string
  country_code: string
  time_zone: string
  cases: {
    vi: string
    pr: string
    po: string
  }
}

export interface Airlines {
  iata: string
  name: string
}

export interface Seller {
  id: string
  title: string
}

export interface TicketFilter {
  transplants: Transplants[]
  time_departure: BetweenDataTime[]
  time_arrival: BetweenDataTime[]
  time_way: BetweenInt[]
  time_transfer: BetweenInt[]
  baggage: Array<'not_baggage' | 'with_baggage'>
  airlines: string[]
  airports_departure: Array<string[]>
  airports_arrival: Array<string[]>
  airports_transfer: Array<string[][]>
  seller: string[]
}

// ticket types

export enum TripClass {
  Y = 'ticket:economClass',
  C = 'ticket:businessClass',
}

export interface FlightDetail {
  aircraft: string
  airline_code: string
  airline_name: string
  data: { label: string; value: string }[]
  id: string
  trip_class: string
}
export interface Flight {
  aircraft: string
  arrival_airport_iata: string
  arrival_airport_name: string
  arrival_city: string
  arrival_iso: string
  departure_airport_iata: string
  departure_airport_name: string
  departure_city: string
  departure_iso: string
  duration: number
  local_departure_iso: string
  local_arrival_iso: string
  number: string
  operating_carrier: string
  operating_carrier_logo: string
  transport_info_details: string
}

export interface Transfer {
  at: string
  city_name: string
  duration_seconds: number
  iata_city: string
  to: string
}

export interface Route {
  flights: Flight[]
  transfers: Transfer[]
  transfers_count: number
  departure_iso: string
  departure_city: string
  departure_airport_name: string
  departure_airport_iata: string
  arrival_iso: string
  arrival_city: string
  arrival_airport_name: string
  arrival_airport_iata: string
  local_departure_iso: string
  local_arrival_iso: string
  time_way: number
  time_transfer_seconds: number
}

export interface PriceView {
  price: number
  price_surcharge: number
  baggage: Cargo[][]
  handbags: Cargo[][]
}

export interface SellerView {
  id: string
  link_url: string
  logo_url: string
  price: PriceView
  title: string
  type_price: string
}

export interface Cargo {
  raw: boolean | number | string
  count: number
  weight: number
  dimensions: string
}
export interface SelectedSeller extends SellerLinkResponse {
  logo_url: string
  title: string
}

export type SingleRouteDate = [Date | null, Date | null]
export type SingleRouteDateString = [string | null, string | null]

export interface Ticket {
  id: string
  routes: Route[]
  time_route: number
  best_seller: SellerView
  best_seller_baggage: SellerView
  seller_baggage_count: number
  seller_count: number
}

// ticket info types
export interface Find {
  locale: string
  trip_class: string
  passengers: Passengers
  currency: Currency
  directions: Direction[]
}

export interface Sort {
  CHEAP: number
  FAST: number
  OPTIMAL: number
}
export interface TicketInfo {
  find: Find
  airports: {
    [key: string]: Airports
  }
  airlines: {
    [key: string]: Airlines
  }
  sellers: {
    [key: string]: Seller
  }
  best_price: {}
  filter: TicketFilter
  error_tickets: number
  count_tickets: number
  state: string
  sort: Sort
}
