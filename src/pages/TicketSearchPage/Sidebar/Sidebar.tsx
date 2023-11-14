import { FC, PropsWithChildren } from 'react'
import s from './sidebar.module.scss'

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  return <aside className={s.sidebar}>{children}</aside>
}
