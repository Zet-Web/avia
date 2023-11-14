import React, { FC, useState } from 'react'

import { useTranslation } from 'next-i18next'
import { CommentForm, Comments } from 'features'
import { useAppSelector } from 'redux/hooks'

import s from './commentSection.module.scss'
import LoadMore from '/public/assets/images/icons/LoadMoreIconBlue.svg'
import { Comment } from 'shared/types/comment'
import { selectIsAuth } from '../../../redux/slices/authSlice/authSlice'
import LikeIcon from '/public/assets/images/icons/LikeIcon.svg'

interface CommentSectionProps {
  comment: Comment[]
  likeAmount: number
}
// TODO add interface

export const CommentSection: FC<CommentSectionProps> = ({
  comment,
  likeAmount,
}) => {
  const isAuth = useAppSelector(selectIsAuth)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation(['common', 'blogPage'])
  const commentsHandler = () => {
    setIsOpen(prevState => !prevState)
  }
  function likeHandler() {}
  return (
    <div className={s.wrapper}>
      <div className={s.commentWrapper}>
        <button className={s.commentButton} onClick={commentsHandler}>
          <span className={s.commentAmount}>
            {comment.length} {t('blogPage:commentSection.comments')}
          </span>{' '}
          <LoadMore />
        </button>
        <button className={s.likeButton} onClick={likeHandler}>
          <span className={s.likeAmount}>{likeAmount}</span>
          <LikeIcon className={s.likeIcon} />
        </button>
      </div>
      {isOpen ? (
        <div>
          <ul className={s.list}>
            {/*// @ts-ignore TODO*/}
            {comment?.map(comment => (
              <li className={s.comment} key={comment.id}>
                <Comments
                  appeal={false}
                  comment={comment}
                  key={comment.id}
                />
              </li>
            ))}
          </ul>
          {/* {hasMore && (
            <div className={s.loadMoreContainer}>
              <Button
                onClick={loadMore}
                className={s.loadMoreButton}
                title={t('blogPage:commentSection.loadMore')}
              />
            </div>
          )} */}
        </div>
      ) : null}

      <div className={s.commentForm}>
        <CommentForm
          onSubmit={data => console.log(data)}
          placeholder={t('blogPage:commentSection.placeholder')}
        />
      </div>
    </div>
  )
}
