import { AxiosPromise } from 'axios'
import { endpoints_auth } from '../index'
import Apis from '../index'
import { ChangePasswordForm } from 'features/ChangePassword/ChangePassword'
import { UpdatePasswordFormRequest } from 'redux/slices/changePasswordSlice/types'

export const changePassword = (
  form: ChangePasswordForm
): AxiosPromise<string> => {
  return Apis.auth_api.post(endpoints_auth.forgot_password, form)
}

export const updatePassword = (
  form: UpdatePasswordFormRequest
): AxiosPromise<string> => {
  return Apis.auth_api.post(endpoints_auth.reset_password, form)
}
