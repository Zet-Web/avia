import { useTranslation } from 'next-i18next'

import cn from 'classnames'

import s from '../../searchTickets.module.scss'

import Bus from '/public/assets/images/icons/Bus.svg'
import Plane from '/public/assets/images/icons/Plane.svg'
import Train from '/public/assets/images/icons/Train.svg'

const TransportTabs = () => {
  const { t } = useTranslation(['common'])

  return (
    <div className={s.transportTabsWrapper}>
      <h1 className={s.title}>{t('common:searchTickets.title')}</h1>
      <div className={s.transportTabs}>
        <button className={cn(s.transportTab, s.active)}>
          <Plane className={s.transportIcon} />
          <span>{t('common:searchTickets.plane')}</span>
        </button>
        <button className={s.transportTab} disabled>
          <Train className={s.transportIcon} />
          <span>{t('common:searchTickets.train')}</span>
        </button>
        <button className={s.transportTab} disabled>
          <Bus className={s.transportIcon} />
          <span>{t('common:searchTickets.bus')}</span>
        </button>
      </div>
    </div>
  )
}

export default TransportTabs
