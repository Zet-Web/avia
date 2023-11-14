import { ImageProps } from 'next/image'
import { STRAPI_IMAGE_MARKDOWN } from '../api'

export const getImageUrlWithBaseDomain = (
    image?: ImageProps['src']
): ImageProps['src'] => {
  if (!image) return ''
  return typeof image === 'string' && !image.includes(STRAPI_IMAGE_MARKDOWN!)
      ? STRAPI_IMAGE_MARKDOWN + image
      : image
}