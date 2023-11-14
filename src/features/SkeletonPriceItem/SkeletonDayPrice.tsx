import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'
import { SkeletonPriceItem } from 'features'
import { DAYS_OF_WEEK } from 'shared/constants/priceCalendar'
import s from './SkeletonDayPrice.module.scss'

const SkeletonDayPrice: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className={s.container}>
      <div className={s.calendarContainer}>
        <div className={s.calendarHeader}>
          {DAYS_OF_WEEK.map((day, index) => (
            <p className={s.weekday} key={index}>
              {t(day)}
            </p>
          ))}
        </div>
        <div className={s.calendarContent}>
          {Array.from({ length: 4 }).map((week, weekIndex) => (
            <div className={s.calendarRow} key={weekIndex}>
              <div className={s.calendarDaysRow}>
                {Array.from({ length: 7 }).map((day, index) =>
                  day ? (
                    <SkeletonPriceItem variant='day' key={index} />
                  ) : day === undefined ? (
                    <SkeletonPriceItem variant='day' key={index} />
                  ) : (
                    <div
                      key={index}
                      className={cn(s.calendarMock, s.calendarItem)}
                    ></div>
                  )
                )}
              </div>
            </div>
          ))}
          <div className={s.calendarRow}>
            <div className={s.calendarDaysRow}>
              {Array.from({ length: 4 }).map((day, index) =>
                day ? (
                  <SkeletonPriceItem variant='day' key={index} />
                ) : day === undefined ? (
                  <SkeletonPriceItem variant='day' key={index} />
                ) : (
                  <div
                    key={index}
                    className={cn(s.calendarMock, s.calendarItem)}
                  ></div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonDayPrice
