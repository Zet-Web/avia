export type Vehicle = 'plane' | 'bus' | 'train' // TODO use enum

export type Transport = {
  id: number
  code: string
  title: string
}

export type City = {
  id: number
  code: string
  country_title: string
  title: string
  airports: Transport[]
}
