import { Token } from 'shared/types/user'
import { cookies } from './cookies'
import { add } from 'date-fns'

export function saveToken(token: Token, keepLogged?: boolean) {
  cookies.set('access_token', token.access_token, {
    path: '/',
    expires: keepLogged
      ? add(new Date(), { minutes: 15 })
      : undefined,
  })
  cookies.set('refresh_token', token.refresh_token, {
    path: '/',
    expires: keepLogged ? add(new Date(), { days: 14 }) : undefined,
  })
  if (keepLogged) {
    cookies.set('keep_logged', 'true', {
      path: '/',
      expires: add(new Date(), { days: 14 }),
    })
  }
}
