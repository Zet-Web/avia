import { all, fork } from 'redux-saga/effects'

import loggerWatcher from './loggerWatcher'
import changePasswordWatcher from './changePasswordSaga/changePasswordSaga'
import registerWatcher from './registerSaga/registerSaga'
import updatePasswordWatcher from './updatePasswordSaga/updatePasswordSaga'
import authWatcher from './authSaga/authSaga'
import userMeWatcher from './userMeSaga/userMeSaga'
import ticketSagaWatcher from './ticketSaga/ticketSaga'

export default function* rootSaga() {
  yield all([
    fork(loggerWatcher),
    fork(authWatcher),
    fork(registerWatcher),
    fork(changePasswordWatcher),
    fork(updatePasswordWatcher),
    fork(userMeWatcher),
    fork(ticketSagaWatcher),
  ])
}
