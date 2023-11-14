import { FC } from 'react'
import s from './comments.module.scss'
import CommentItem from 'features/CommentItem/CommentItem'
import { Comment } from 'shared/types/comment'

interface CommentsProps {
  comment: Comment
  appeal: Boolean
}

const Comments: FC<CommentsProps> = ({ comment, appeal }) => {
  return (
    <ul className={s.wraperComment}>
      <li className={s.comment}>
        <CommentItem
          avatar={comment.author.avatar}
          createdAt={comment.createdAt}
          author={comment.author.name}
          content={comment.content}
          appeal={appeal}
        />
      </li>
      {comment.children.length ? <hr className={s.line} /> : ''}
      <li className={s.replyComment}>
        {comment.children.map(item => (
          <Comments appeal={true} comment={item} key={item.id} />
        ))}
      </li>
    </ul>
  )
}

export default Comments
