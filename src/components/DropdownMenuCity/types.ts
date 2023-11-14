import type { ReactNode } from 'react'
import type { City, Transport, Vehicle } from 'shared/types/cities'

import { Directions } from 'shared/types/geo'

export type DropdownItemProps = {
  onClick: () => void
  isActive?: boolean
  pointDeparture: string
  icon: ReactNode
  title: string
  abbreviation: string
  transports: Transport[]
  onChange: (airport: Directions) => void
  onClose: () => void
}

export type DropdownMenuItemProps = {
  onChange: (airport: Directions) => void
  title: string
  abbreviation: string
  icon: ReactNode
  onClose: () => void
}

export type DropdownMenuCityProps = {
  vehicle: Vehicle
  options: City[]
  onChange: (airport: Directions) => void
  onClose: () => void
}
