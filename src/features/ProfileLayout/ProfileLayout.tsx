import { FC, ReactNode } from 'react'
import cn from 'classnames'

import s from './profileLayout.module.scss'

interface ProfileLayoutProps {
  sidebar: ReactNode
  content: ReactNode
  profile: ReactNode
  onLogout: () => void
  secondVariant?: Boolean
}

const ProfileLayout: FC<ProfileLayoutProps> = ({
  profile,
  onLogout,
  sidebar,
  content,
  secondVariant = false,
}) => {
  return (
    <div
      className={cn(s.profileLayout, { [s.large]: secondVariant })}
    >
      <div className={s.wrapper}>
        <div className={cn(s.header, { [s.large]: secondVariant })}>
          {profile}
          <button onClick={onLogout} className={s.logout}>
            Выйти
            <div className={s.iconLogout} />
          </button>
        </div>
      </div>

      <div className={s.profileContent}>
        <div className={s.sidebar}>{sidebar}</div>
        <div className={cn(s.content, { [s.large]: secondVariant })}>
          {content}
        </div>
      </div>
    </div>
  )
}
export default ProfileLayout
