import { FC } from 'react'
import { PrivacyTextContent } from 'shared/types/privacy'

import s from './privacyPolicyList.module.scss'

export interface PrivacyItem {
  id: number
  title: string
  text_content: PrivacyTextContent[]
}

interface PrivacyPolicyListProps {
  privacyList: PrivacyItem[]
}
export const PrivacyPolicyList: FC<PrivacyPolicyListProps> = ({
  privacyList,
}) => {
  return (
    <div>
      <ol className={s.commonList}>
        {privacyList.map(item => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ol>

      <ol className={s.privacyListCommon}>
        {privacyList.map(item => (
          <li id={`${item.id}`} className={s.ya} key={item.id}>
            <div className={s.privacyListTitle}>{item.title}</div>

            <ol className={s.privacyList}>
              {item.text_content.map((text, index) => (
                <li className={s.privacyListText} key={index}>
                  <div
                    dangerouslySetInnerHTML={{ __html: text.text }}
                  />
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  )
}
