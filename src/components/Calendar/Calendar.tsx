import { FC, useRef } from 'react'

import {
  Calendar as CalendarComponent,
  CalendarProps as NativeCalendarProps,
} from 'react-calendar'

import cn from 'classnames'

import 'react-calendar/dist/Calendar.css'
import { useClickOutside } from 'shared/hooks/useClickOutside'
import s from './calendar.module.scss'
import { getMonthCapitalizeAndYear } from 'shared/helpers/date/getMonthCapitalizeAndYear'

interface CalendarProps extends NativeCalendarProps {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  selectRange?: boolean
  isOpen: boolean
  // eslint-disable-next-line @typescript-eslint/naming-convention
  showDoubleView?: boolean
  onClose: () => void
}

const Calendar: FC<CalendarProps> = ({
  onChange,
  value,
  isOpen,
  onClose,
  showDoubleView = true,
  selectRange = true,
  className,
  ...props
}) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  useClickOutside(overlayRef, onClose)
  return isOpen ? (
    <div
      ref={overlayRef}
      className={cn(s.reactCalendarComponent, className)}
    >
      <CalendarComponent
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        showDoubleView={showDoubleView}
        minDate={new Date()}
        locale='ru'
        minDetail={'year'}
        tileClassName={s.tile}
        navigationLabel={({ date, label, locale, view }) =>
          view === 'month'
            ? getMonthCapitalizeAndYear(date, locale)
            : label
        }
        {...props}
      />
    </div>
  ) : null
}
export default Calendar
