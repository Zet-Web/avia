import { all, call, put, takeLatest } from 'redux-saga/effects'
import Router from 'next/router'
import { createAccount, verifyUser } from 'shared/api/routes/register'
import {
  registerError,
  registerRequested,
  registerSuccess,
  registerVerify,
  requestVerification,
} from '../../slices/authSlice/authSlice'
import { saveToken } from 'shared/utils/jwt'
import {
  RegisterPayload,
  RegisterRequested,
  RequestVerification,
} from '../../slices/authSlice/types'

//TODO add request type
function* createUserWorker(action: RegisterRequested): any {
  const form: RegisterPayload = {
    email: action.payload.email,
    first_name: action.payload.name,
    password: action.payload.password,
  }

  try {
    const res = yield call(createAccount, form)
    if (res.status >= 400) {
      throw new Error(res)
    }
    yield put(registerVerify())
  } catch (e) {
    console.error(e)
    yield put(registerError())
  }
}

function* verifyUserWorker(action: RequestVerification): any {
  try {
    const res = yield call(verifyUser, action.payload)

    if (res.status >= 400) {
      throw new Error(res)
    }

    saveToken(res.data, action.payload.keepLogged)
    yield put(registerSuccess(res.data))
    yield call(Router.push, '/profile')
  } catch (e) {
    console.error(e)
    yield put(registerError())
  }
}

function* registerWatcher() {
  yield all([
    takeLatest(registerRequested.type, createUserWorker),
    takeLatest(requestVerification.type, verifyUserWorker),
  ])
}

export default registerWatcher
