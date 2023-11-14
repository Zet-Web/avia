import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

import {
  loadingProgress,
  TIMEOUT_ONCHANGE,
  TIMEOUT_STATUS,
} from 'shared/constants/loading'

import plane from '/public/assets/images/loading.png'

import s from './loading.module.scss'
import {
  searchCodeSuccess,
  ticketDefault,
  ticketError,
  ticketRequest,
  ticketSuccess,
} from '../../redux/slices/ticketSlice/ticketSlice'

interface LoadingProps {
  status?: string
  onChange: (value: boolean) => void
}

const Loading: FC<LoadingProps> = ({
  status = ticketSuccess.type ||
    ticketRequest.type ||
    ticketDefault.type ||
    ticketError.type,
  onChange,
}) => {
  const { t } = useTranslation(['common', 'ticket'])
  const [progress, setProgress] = useState(loadingProgress.start)
  const [requestStatus, setRequestStatus] = useState<string>('')

  useEffect(() => {
    status === ticketRequest.type
      ? setRequestStatus(status)
      : setTimeout(() => {
          setRequestStatus(status)
        }, TIMEOUT_STATUS)

    switch (requestStatus) {
      case ticketDefault.type:
        return setProgress(loadingProgress.start)
      case ticketRequest.type:
        return setProgress(loadingProgress.requested)
      case ticketSuccess.type:
        return setProgress(loadingProgress.success)
      case ticketError.type:
        return setProgress(loadingProgress.error)
      case searchCodeSuccess.type:
        return setProgress(loadingProgress.start)
      default:
        return
    }
  }, [status, requestStatus])

  useEffect(() => {
    progress === loadingProgress.success
      ? setTimeout(() => {
          onChange(false)
        }, TIMEOUT_ONCHANGE)
      : null
  }, [progress])

  return (
    <div>
      <div className={s.title}>
        {t('ticket:searchTicketLoadingTitle')}
      </div>

      <div className={s.wrapper}>
        <div className={s.line} />
        <div className={s.plane}>
          <Image src={plane} alt='' />
        </div>
      </div>
    </div>
  )
}

export default Loading
