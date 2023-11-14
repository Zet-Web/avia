export type Meta = { id: number; name: string }

export type ListItemType = { value: string; label: string }

export type LinkType = { href: string; label: string }

export type DateMask = `${number}-${number}-${number}`
export type TimeMask = `${number}:${number}`
export type TimeFullMask = `${number}:${number}:${number}`
export type DateTimeMask = `${DateMask} ${TimeFullMask}`

export type TimeMark = { created_at: string; updated_at: string }
export type DateType = { date: string; isAvailable: boolean }

export type DateButton = {
  value: DateMask
  label: string
  weekDay: string
}

export enum Transfer {
  AVIA = 0,
  TRAIN = 1,
  BUS = 2,
}
export enum Language {
  RU = 'RU',
  EN = 'EN',
  DE = 'DE',
  DEFAULT = 'RU'
}

export enum Currency {
  USD = 'USD',
  RUB = 'RUB',
  EUR = 'EUR',
  DEFAULT = 'RUB'
}

export enum AviaTicketClass {
  ECONOMY = 'Y',
  BUSINESS = 'C',
}

export enum ProfileTabs {
  favorites,
  history,
  subscribeTicket,
  askQuestion,
  subscribeRoute,
  editProfile,
}
