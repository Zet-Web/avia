import { FC, ReactNode, useState } from 'react'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'

import s from './commentInfo.module.scss'

import LoadMore from '/public/assets/images/icons/LoadMoreIconBlue.svg'
import LikeIcon from '/public/assets/images/icons/LikeIcon.svg'

interface CommentInfoProps {
  commentAmount: number
  likeAmount: number
  commentsHandler: () => void
  likeHandler: () => void
}

const CommentInfo: FC<CommentInfoProps> = ({
  commentAmount,
  likeAmount,
  likeHandler,
  commentsHandler,
}) => {
  const [isLiked, setIsLiked] = useState(false)

  const { t } = useTranslation(['common', 'blogPage'])

  const addLike = () => {
    setIsLiked(prevState => !prevState)
    likeHandler()
  }

  return (
    <div className={s.wrapper}>
      <div className={s.commentWrapper}>

        <button className={s.commentButton} onClick={commentsHandler}>

          <span className={s.commentAmount}>
            {commentAmount} {t('blogPage:commentSection.comments')}
          </span>

          <LoadMore />

        </button>

        <button
          className={cn(s.likeButton, isLiked && s.likeButtonActive)}
          onClick={addLike}
        >

          <span className={s.likeAmount}>{likeAmount}</span>

          <LikeIcon className={s.likeIcon} />

        </button>

      </div>
    </div>
  )
}

export default CommentInfo
