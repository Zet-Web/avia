export interface AdvertisingPageAttributesProps {
  title: string
  subtitle: string
  createdAt: string
  updatedAt: string
  item_section: ItemSection[]
}

interface ItemContent {
  id: number
  item: string
  text_item: string
  price_item: string
}

export interface ItemSection {
  id: number
  title: string
  content: ItemContent[]
}
