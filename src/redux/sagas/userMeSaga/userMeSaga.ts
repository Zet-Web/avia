import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import { userMe } from 'shared/api/routes/auth'
import {
  loginUserError,
  userMeRequested,
  userMeSucceeded,
} from '../../slices/authSlice/authSlice'

function* userMeWorker(): any {
  try {
    const res = yield call(userMe)

    if (res.status >= 400) {
      throw new Error(res)
    }

    yield put(userMeSucceeded(res.data))
  } catch (error) {
    console.error('error :', error)
    yield put(loginUserError())
  }
}

function* userMeWatcher() {
  yield all([takeEvery(userMeRequested.type, userMeWorker)])
}

export default userMeWatcher
