import Router from 'next/router'
import {
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { LogIn, logout } from 'shared/api/routes/auth'
import {
  loginUserError,
  loginUserRequested,
  loginUserSucceeded,
  userLogout,
  userLogoutSuccess,
} from '../../slices/authSlice/authSlice'
import {
  LoginPayload,
  LoginRequest,
} from '../../slices/authSlice/types'
import { saveToken } from 'shared/utils/jwt'

//TODO add request type
function* authSagaWorker(form: LoginRequest): any {
  const requestForm: LoginPayload = {
    username: form.payload.email,
    password: form.payload.password,
  }

  try {
    const res = yield call(LogIn, requestForm)

    if (res.status >= 400) {
      throw new Error(res)
    }

    // save token in cookies if changed remember me
    saveToken(res.data, form.payload.keepLogged)

    yield put(loginUserSucceeded(res.data))
    yield call(Router.push, '/profile')
  } catch (error) {
    console.error('error :', error)
    yield put(loginUserError())
  }
}

function* userLogoutWorker(): any {
  try {
    const refreshToken = yield select(
      state => state.auth.jwt.refresh_token
    )
    if (refreshToken) yield call(logout, refreshToken)
    yield put(userLogoutSuccess())
  } catch (e) {
    console.error(e)
    yield put(loginUserError())
  }
}

function* authWatcher() {
  yield all([
    takeLatest(loginUserRequested.type, authSagaWorker),
    takeLatest(userLogout.type, userLogoutWorker),
  ])
}

export default authWatcher
