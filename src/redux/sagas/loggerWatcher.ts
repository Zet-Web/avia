import { all, select, takeEvery } from 'redux-saga/effects'

export interface Response {
  data?: any
}

function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state: Response = yield select()

    console.log('action', action)
    console.log('state after', state)
  })
}

function* loggerWatcher() {
  yield all([watchAndLog()])
}

export default loggerWatcher
