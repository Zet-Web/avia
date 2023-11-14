import { ReactNode } from 'react'

export interface Tab {
  link?: string
  title: string
  index: number
}

export interface TabContent {
  link?: string
  component: ReactNode
}
