import { AxiosPromise } from 'axios'
import { LoginPayload } from 'redux/slices/authSlice/types'
import { Token, User } from 'shared/types/user'
import { endpoints_auth } from '../endpoints'
import Apis from '../index'

export const LogIn = (forms: LoginPayload): AxiosPromise<Token> => {
  const formData = new FormData()
  formData.append('username', forms.username)
  formData.append('password', forms.password)
  return Apis.auth_api.post(endpoints_auth.login, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const logout = (refreshToken: string): AxiosPromise => {
  return Apis.auth_api.post(endpoints_auth.logout(refreshToken))
}

export const userMe = (): AxiosPromise<User> => {
  return Apis.auth_api.get(endpoints_auth.me)
}

// export const getTickets = (
//   params: TicketParams
// ): AxiosPromise<AxiosApiPaginatedResponse<FlightInfoCard>> => {
//   return api.get(endpoints_auth.avatar, { params })
// }
