export interface PrivacyTextContent {
  id: number
  text: string
}

export interface PrivacyList {
  id: number
  title: string
  text_content: PrivacyTextContent[]
}

export interface PrivacyListProps {
  title: string
  date: string
  privacyList: PrivacyList[]
}
