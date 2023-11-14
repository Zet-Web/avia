import { Token, User } from 'shared/types/user'
import {
  SignUpStatus,
  AuthStatus,
  LoginForms,
  VerificationRequestBody,
  SignUpForm,
} from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../reducers/rootReducer'

interface InitialState {
  isAuth: boolean | null
  user: User | null
  jwt: Token | null
  signUpStatus: SignUpStatus
  authStatus: AuthStatus
}

const initialState: InitialState = {
  isAuth: null,
  user: null,
  jwt: null,
  signUpStatus: SignUpStatus.DEFAULT,
  authStatus: AuthStatus.DEFAULT,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserRequested: (
      state,
      action: PayloadAction<LoginForms>
    ) => {
      state.authStatus = AuthStatus.REQUESTED
    },
    loginUserSucceeded: (state, action: PayloadAction<Token>) => {
      state.jwt = action.payload
      state.isAuth = true
      state.authStatus = AuthStatus.SUCCESS
    },
    loginUserError: state => {
      state.isAuth = false
      state.authStatus = AuthStatus.ERROR
    },
    userMeRequested: state => {
      state.authStatus = AuthStatus.REQUESTED
    },
    userMeSucceeded: (state, action: PayloadAction<User>) => {
      state.isAuth = true
      state.authStatus = AuthStatus.SUCCESS
      state.user = action.payload
    },
    userLogout: state => {},
    userLogoutSuccess: state => {
      state.isAuth = false
      state.user = null
      state.jwt = null
    },
    loginUserWithToken: (state, action: PayloadAction<Token>) => {
      state.authStatus = AuthStatus.SUCCESS
      state.isAuth = true
      state.jwt = action.payload
    },
    registerRequested: (state, action: PayloadAction<SignUpForm>) => {
      state.signUpStatus = SignUpStatus.REQUESTED
    },
    registerError: state => {
      state.signUpStatus = SignUpStatus.ERROR
    },
    registerSuccess: (state, action: PayloadAction<Token>) => {
      state.isAuth = true
      state.signUpStatus = SignUpStatus.SUCCESS
      state.jwt = action.payload
    },
    registerVerify: state => {
      state.signUpStatus = SignUpStatus.VERIFY
    },
    requestVerification: (
      state,
      action: PayloadAction<VerificationRequestBody>
    ) => {
      state.signUpStatus = SignUpStatus.VERIFICATION
    },
  },
})

export const {
  loginUserRequested,
  loginUserSucceeded,
  loginUserError,
  userMeRequested,
  userMeSucceeded,
  userLogout,
  userLogoutSuccess,
  loginUserWithToken,
  registerRequested,
  registerError,
  registerSuccess,
  registerVerify,
  requestVerification,
} = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export const selectIsAuth = (state: RootState) => state.auth.isAuth

export default authSlice.reducer
