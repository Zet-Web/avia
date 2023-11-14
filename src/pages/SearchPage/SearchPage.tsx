import { TicketFilter } from 'features'

import s from './SearchPage.module.scss'

export const SearchPage = () => {
  return (
    <div className={s.container}>
      <TicketFilter />
    </div>
  )
}
