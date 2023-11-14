import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Apis from '../api'

import { cookies } from 'shared/utils/cookies'

export const useToken = () => {
  const { pathname } = useRouter()

  const token = cookies.get('access_token')

  useEffect(() => {
    if (pathname.includes('auth')) return

    if (!token) {
      const error = new Error('Unauthorized')

      Object.defineProperty(error, 'response', {
        value: { status: 401 },
      })
      // handleError(error)
    }
  }, [pathname, token])

  if (!token) return undefined

  Apis.auth_api.defaults.headers.common['Authorization'] =
    'Bearer ' + token
  Apis.strapi.defaults.headers.common['Authorization'] =
    'Bearer ' + token
  Apis.user_api.defaults.headers.common['Authorization'] =
    'Bearer ' + token
  Apis.tickets_api.defaults.headers.common['Authorization'] =
    'Bearer ' + token

  return token
}
