import Router from 'next/router'

import { all, call, put, takeLatest } from 'redux-saga/effects'
import { updatePasswordRequest } from '../../slices/changePasswordSlice/types'
import { updatePassword } from 'shared/api/routes/changePassword'
import {
  changePasswordError,
  changePasswordSuccess,
  updatePasswordAction,
} from '../../slices/changePasswordSlice/changePasswordSlice'
import { loginUserWithToken } from 'redux/slices/authSlice/authSlice'
import { saveToken } from 'shared/utils/jwt'

//TODO add request type
function* updatePasswordWorker(action: updatePasswordRequest): any {
  try {
    const res = yield call(updatePassword, action.payload)
    if (res.status >= 400) {
      throw new Error(res)
    }
    yield put(changePasswordSuccess())
    saveToken(res.data)
    yield put(loginUserWithToken(res.data))
    yield call(Router.push, '/profile')
  } catch (error) {
    console.error('error :', error)
    yield put(changePasswordError())
  }
}

function* updatePasswordWatcher() {
  yield all([
    takeLatest(updatePasswordAction.type, updatePasswordWorker),
  ])
}

export default updatePasswordWatcher
