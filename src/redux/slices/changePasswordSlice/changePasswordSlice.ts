import {
  ResetPasswordStatus,
  UpdatePasswordFormRequest,
} from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChangePasswordForm } from '../../../features/ChangePassword/ChangePassword'

interface InitialState {
  resetPasswordStatus: ResetPasswordStatus
  email: string | null
}

const initialState: InitialState = {
  resetPasswordStatus: ResetPasswordStatus.RESET_PASSWORD_DEFAULT,
  email: null,
}

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    changePasswordRequested: (
      state,
      action: PayloadAction<ChangePasswordForm>
    ) => {
      state.resetPasswordStatus =
        ResetPasswordStatus.RESET_PASSWORD_REQUESTED
    },
    changePasswordOnChange: state => {
      state.resetPasswordStatus =
        ResetPasswordStatus.RESET_PASSWORD_ON_CHANGE
    },
    changePasswordDefault: state => {
      state.resetPasswordStatus =
        ResetPasswordStatus.RESET_PASSWORD_DEFAULT
    },
    updatePasswordAction: (
      state,
      action: PayloadAction<UpdatePasswordFormRequest>
    ) => {},
    changePasswordError: state => {
      state.resetPasswordStatus =
        ResetPasswordStatus.RESET_PASSWORD_ERROR
    },
    changePasswordSuccess: state => {
      state.resetPasswordStatus =
        ResetPasswordStatus.RESET_PASSWORD_SUCCESS
    },
  },
})

export const {
  changePasswordRequested,
  changePasswordOnChange,
  changePasswordDefault,
  updatePasswordAction,
  changePasswordError,
  changePasswordSuccess,
} = changePasswordSlice.actions

export default changePasswordSlice.reducer
