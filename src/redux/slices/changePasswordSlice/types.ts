import { ChangePasswordForm } from 'features/ChangePassword/ChangePassword'

export interface UpdatePasswordFormRequest {
  code: string
  password: string
  email: string
}

export enum ResetPasswordStatus {
  RESET_PASSWORD_DEFAULT = 'DEFAULT',
  RESET_PASSWORD_REQUESTED = 'REQUESTED',
  RESET_PASSWORD_ON_CHANGE = 'ON_CHANGE',
  RESET_PASSWORD_SUCCESS = 'SUCCESS',
  RESET_PASSWORD_ERROR = 'ERROR',
}

export interface changePasswordRequest {
  type: 'changePassword/changePasswordRequested'
  payload: ChangePasswordForm
}

export interface updatePasswordRequest {
  type: 'changePassword/updatePassword'
  payload: UpdatePasswordFormRequest
}
