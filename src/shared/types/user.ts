import { AviaTicketClass, Currency, Language } from '.'

// interface Role {
//   readonly id: number
//   name: string
//   description: string
//   type: string
//   createdAt: string
//   updatedAt: string
// }

// export interface User {
//   readonly id: number
//   username: string
//   lastname: string
//   email: string
//   avatar: string
//   provider: string
//   resetPasswordToken: string
//   confirmationToken: string
//   confirmed: boolean
//   blocked: boolean
//   role: Role
// }

export interface User {
  first_name: string
  last_name: string
  id: string
  email: string
  avatar_name: string
  avatar?: string
}

export interface Token {
  access_token: string
  refresh_token: string
  token_type?: string
  expires_in?: string
}

export interface RouteDetail {
  locale: Language
  trip_class: AviaTicketClass
  passengers: Passengers
  currency: Currency
  directions: Direction[]
}

export interface Passengers {
  adults: number
  children: number
  infants: number
}

export interface Direction {
  origin: string
  destination: string
  date: string
}

export interface UserRoute {
  id: number
  route: string
  route_detail: RouteDetail
  create_datatime: string
}

export interface UserTicket extends UserRoute {
  ticket_sing: string
}
