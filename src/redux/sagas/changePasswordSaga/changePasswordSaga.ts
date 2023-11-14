import { all, call, put, takeLatest } from 'redux-saga/effects'
import { changePasswordRequest } from '../../slices/changePasswordSlice/types'
import { changePassword } from 'shared/api/routes/changePassword'
import {
  changePasswordError,
  changePasswordOnChange,
  changePasswordRequested,
} from '../../slices/changePasswordSlice/changePasswordSlice'

//TODO add request type
function* changePasswordWorker(action: changePasswordRequest): any {
  try {
    const res = yield call(changePassword, action.payload)
    if (res.status >= 400) {
      throw new Error(res)
    }
    yield put(changePasswordOnChange())
  } catch (error) {
    console.error('error :', error)
    yield put(changePasswordError())
  }
}

function* changePasswordWatcher() {
  yield all([
    takeLatest(changePasswordRequested.type, changePasswordWorker),
  ])
}

export default changePasswordWatcher
