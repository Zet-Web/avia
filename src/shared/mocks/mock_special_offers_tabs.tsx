import { Transfer } from 'shared/types'

import PlaneIcon from '/public/assets/images/icons/Plane.svg'
import TrainIcon from '/public/assets/images/icons/Train.svg'
import BusIcon from '/public/assets/images/icons/Bus.svg'

export const tabs = [
  { icon: <PlaneIcon />, value: Transfer.AVIA },
  { icon: <TrainIcon />, value: Transfer.TRAIN },
  { icon: <BusIcon />, value: Transfer.BUS },
]
