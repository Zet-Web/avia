import {
  bigMobile,
  laptop,
  smallTablet,
  tablet,
} from 'shared/constants/breakpoints'

export const getTagsPerView = (width: number) => {
  if (width > laptop) return 8
  if (width > tablet) return 5
  if (width > smallTablet) return 4
  if (width > bigMobile) return 3
  if (width > 360) return 2
  else return 1
}
