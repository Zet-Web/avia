import { FC, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'

import { Tooltip } from 'components'

import Bell from '/public/assets/images/icons/bell.svg'
import Star from '/public/assets/images/icons/star.svg'
import Share from '/public/assets/images/icons/share.svg'

import s from './checkboxes.module.scss'

interface CheckboxesProps {
  isShare: () => void
  isFavorite: (value: boolean) => void
  isSubscribe: (value: boolean) => void
}

export const Checkboxes: FC<CheckboxesProps> = ({
  isShare,
  isSubscribe,
  isFavorite,
}) => {
  const { t } = useTranslation(['common'])
  const [isSubscribeSelected, setIsIsSubscribeSelected] = useState(false)
  const [isFavoriteSelected, setIsIsFavoriteSelected] = useState(false)

  const handleSubscribe = (value: boolean) => {
    setIsIsSubscribeSelected(value)
    isSubscribe(value)
  }

  const handleFavorite = (value: boolean) => {
    setIsIsFavoriteSelected(value)
    isFavorite(value)
  }

  return (
    <div className={s.checkboxes}>
      <Tooltip
        className={s.tooltipSub}
        position='left-end'
        trigger='hover'
        title={
          isSubscribeSelected ? (
            <>
              {t('common:ticket.subscribedLine1')}
              <br />
              {t('common:ticket.subscribedLine2')}
            </>
          ) : (
            <>
              {t('common:ticket.subscribeLine1')}
              <br />
              {t('common:ticket.subscribeLine2')}
            </>
          )
        }
      >
        <label className={cn(s.checkboxLabel, s.checkboxLabelBell)}>
          <input
            className={s.checkbox}
            type='checkbox'
            id='subscribe'
            checked={isSubscribeSelected}
            onChange={() => handleSubscribe(!isSubscribeSelected)}
          />
          <Bell className={s.icon} />
        </label>
      </Tooltip>

      <Tooltip
        className={s.tooltipFav}
        position='left-end'
        trigger='hover'
        title={
          isFavoriteSelected
            ? t('common:ticket.addedToFavorites')
            : t('common:ticket.addToFavorites')
        }
      >
        <label className={s.checkboxLabel}>
          <input
            className={s.checkbox}
            type='checkbox'
            id='favorite'
            checked={isFavoriteSelected}
            onChange={() => handleFavorite(!isFavoriteSelected)}
          />
          <Star className={s.icon} />
        </label>
      </Tooltip>

      <Tooltip
        className={s.tooltipShare}
        position='left-end'
        trigger='hover'
        title={t('common:ticket.shareLink')}
      >
        <label className={s.checkboxLabel}>
          <Share className={s.icon} onClick={isShare} />
        </label>
      </Tooltip>
    </div>
  )
}
