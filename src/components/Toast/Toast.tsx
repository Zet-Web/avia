import { FC, memo } from 'react'
import { toast } from 'react-hot-toast'
import s from './Toast.module.scss'

interface ToastProps {
  id: string
  text: string
  style?: any
}

export const Toast: FC<ToastProps> = ({ id, text, style }) => {
  return (
    <div className={s.container}>
      <span className={s.text}>{text}</span>
      <span className={s.hide} onClick={() => toast.dismiss(id)}>
        Скрыть
      </span>
    </div>
  )
}
export default memo(Toast)
