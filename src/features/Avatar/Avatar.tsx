import { FC } from 'react'

import cn from 'classnames'
import Image from 'next/image'

import { User } from 'shared/types/user'
import UserIcon from '/public/assets/images/icons/user.svg'

import s from './avatar.module.scss'

interface AvatarProps {
  user: User | null
  size?: 'small' | 'big'
  bg?: 'blue' | 'white'
}

const Avatar: FC<AvatarProps> = ({
  user,
  size = 'small',
  bg = 'blue',
}) => {
  return (
    <div
      className={cn(s.avatar, {
        [s.bgWhite]: bg === 'white',
        [s.avatarName]: user?.first_name && !user?.avatar_name,
        [s.avatarBig]: size === 'big',
      })}
    >
      {user ? (
        user.avatar ? (
          <Image
            src={user.avatar}
            alt='avatar'
            width={size === 'small' ? 30 : 65}
            height={size === 'small' ? 30 : 65}
            layout='fill'
          />
        ) : (
          <div>{user?.avatar_name}</div>
        )
      ) : (
        <UserIcon />
      )}
    </div>
  )
}

export default Avatar
