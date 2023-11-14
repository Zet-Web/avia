import React, { useState } from 'react'
import { Transfer } from 'shared/types'

import FlightCard from 'features/FlightCard/FlightCard'
import { mock_flightcard } from 'shared/mocks/mock_flightcard'
import { tabs } from 'shared/mocks/mock_special_offers_tabs'
import cn from 'classnames'
import s from './SpecialOffersSection.module.scss'

const SpecialOffersSection = () => {
  const [activeTab, setActiveTab] = useState(Transfer.AVIA)

  return (
    <section className={s.container}>
      <div className={s.headerContent}>
        <div>
          <div className={s.headerTitle}>Спецпредложения</div>
          <div className={s.headerSubtitle}>
            Только здесь и сейчас!
          </div>
        </div>
        <div className={s.tabs}>
          {tabs.map(({ value, icon }) => (
            <div
              key={value}
              className={cn({
                [s.active]: value === activeTab,
              })}
              onClick={() => setActiveTab(value)}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
      <div className={s.gridWrapper}>
        {mock_flightcard?.map((item: any) => {
          return (
            <div key={item.id} className={s.item}>
              <FlightCard
                size={item.size}
                key={item.price}
                image={item.bg}
                route={item.route}
                destination={item.destination}
                price={item.price}
                currency={item.currency}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SpecialOffersSection
