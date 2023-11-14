import Axios, { CreateAxiosDefaults } from 'axios'
import { cookies } from 'shared/utils/cookies'
import { endpoints_auth } from './endpoints'
import { saveToken } from 'shared/utils/jwt'
import store from 'redux/store'
import {
  loginUserError,
  loginUserWithToken,
} from 'redux/slices/authSlice/authSlice'

import Router from 'next/router'

export * from '../types/api'
export * from './endpoints'

function createAxiosInstace(config: CreateAxiosDefaults) {
  const instance = Axios.create(config)

  instance.interceptors.response.use(
    config => config,
    err => {
      if (err.response.status === 500 && window !== undefined) {
        Router.push('/500')
      }
    }
  )

  return instance
}

export const BASE_DOMAIN = process.env.NEXT_PUBLIC_API_URL
export const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL
export const STRAPI_IMAGE_MARKDOWN =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL

const auth_api = createAxiosInstace({
  baseURL: `${BASE_DOMAIN}/auth/v1`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

auth_api.interceptors.request.use(config => {
  const token =
    cookies.get('access_token') ??
    sessionStorage.getItem('access_token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

auth_api.interceptors.response.use(
  config => config,
  async err => {
    const originalConfig = err.config

    if (originalConfig.url === endpoints_auth.login || !err.response)
      throw err

    if (err.response.status === 401 && !originalConfig._isRetry) {
      const refreshToken = cookies.get('refresh_token'),
        keepLogged = cookies.get('keep_logged')

      try {
        const formData = new FormData()
        formData.append('refresh_token', String(refreshToken))
        const res = await auth_api.post(
          endpoints_auth.refresh,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        originalConfig._isRetry = true

        saveToken(res.data, !!keepLogged)
        store.dispatch(loginUserWithToken(res.data))
        return auth_api(originalConfig)
      } catch (e) {
        store.dispatch(loginUserError())
        console.error(e)
      }
    }
    throw err
  }
)

const tickets_api = createAxiosInstace({
  baseURL: `${BASE_DOMAIN}/air-tickets/v1`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const user_api = createAxiosInstace({
  baseURL: `${BASE_DOMAIN}/user/air/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const strapi = createAxiosInstace({
  baseURL: `${STRAPI}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const Apis = { auth_api, tickets_api, user_api, strapi }
export default Apis
