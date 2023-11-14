import { BlogsPageContent, ImageSearch } from '../types/blogs'

export const formatSearchBlogsContent = (
  content: BlogsPageContent[]
) => {
  const imageFormat = (image: ImageSearch) => {
    return {
      data: {
        id: Math.random(),
        attributes: image,
      },
    }
  }

  return content.map(item => ({
    id: item.id,
    //@ts-ignore
    attributes: { ...item, image: imageFormat(item.image) },
  }))
}
