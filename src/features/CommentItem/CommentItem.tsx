import React, { FC } from 'react'
import { Button } from 'components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import s from './commentItem.module.scss'
import { mobile } from 'shared/constants/breakpoints'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'

export interface CommentProps {
  createdAt: string
  author: string
  content: string
  avatar: string
  appeal: Boolean
  onClick?: () => void
}

const CommentItem: FC<CommentProps> = ({
  createdAt,
  author,
  content,
  avatar,
  appeal = false,
  // appealName = null,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.()
  }

  const { width } = useWindowDimensions()
  const { locale } = useRouter()

  const avatarWrap = (
    <div className={s.avatarWrap}>
      <div className={s.avatar}>
        <Image src={avatar} layout={'fill'} alt='avatar' />
      </div>
    </div>
  )

  return (
    <div
      className={
        s.commentItem /*cn(s.commentItem, appeal ? s.commentAppeal : null)*/
      }
    >
      {width > mobile && avatarWrap}

      <div>
        <div className={s.header}>
          {width < mobile && avatarWrap}
          <div className={s.name}>
            <span>{author}</span>

            {appeal && (
              <span className={s.appeal}>
                ответ для{' '}
                <a className={s.appealName} href='#'>
                  {author}
                </a>
              </span>
            )}
          </div>
        </div>

        <div className={s.text}>{content}</div>

        <div className={s.wrap}>
          <div className={s.date}>
            {new Date(createdAt).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          <Button
            onClick={handleClick}
            className={s.answerButton}
            title={'Ответить'}
          />
        </div>
      </div>
    </div>
  )
}

export default CommentItem
