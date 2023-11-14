import { FC } from 'react'
import { useAppSelector } from 'redux/hooks'
import { Avatar } from 'features'
import { AuthorSection as Author } from 'shared/types/blog'
import s from './authorSection.module.scss'
import { selectAuth } from '../../../redux/slices/authSlice/authSlice'

export const AuthorSection: FC<Author> = ({ tag, link }) => {
  let profile = useAppSelector(selectAuth)
  let profileMock = {
    avatar: '/assets/images/comment_avatar.png',
    first_name: 'Евгений',
    last_name: 'Пороховой',
    id: '1',
    email: 'Пороховой@email.com',
    avatar_name: 'string',
  }
  return (
    <div className={s.wrapper}>
      <a href={link}>
        <Avatar bg='white' size='big' user={profileMock} />
      </a>
      <div className={s.authorBlock}>
        <a className={s.authorTag} href={link}>
          {tag}
        </a>
        <span className={s.authorName}>
          {profileMock?.first_name} {profileMock?.last_name}
        </span>
      </div>
    </div>
  )
}
