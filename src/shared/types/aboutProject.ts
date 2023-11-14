export interface Card {
  id: number
  title: string
  subtitle: string
}

export interface HeaderSection {
  id?: number
  title?: string
  content: string
  card_component: Card[]
}

export interface TitleQuoteSection {
  titleQuote: string
}
