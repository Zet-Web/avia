import { AxiosPromise } from 'axios'
import { endpoints_auth } from '../index'
import Apis from '../index'
import { Token } from 'shared/types/user'
import {
  RegisterPayload,
  VerificationRequestBody,
} from '../../../redux/slices/authSlice/types'

export const createAccount = (
  form: RegisterPayload
): AxiosPromise<string> => {
  return Apis.auth_api.post(endpoints_auth.register, form)
}

export const verifyUser = (
  form: VerificationRequestBody
): AxiosPromise<Token> => {
  return Apis.auth_api.post(endpoints_auth.verify, form)
}
