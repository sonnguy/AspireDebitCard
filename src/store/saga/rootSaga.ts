import {fork, all} from 'redux-saga/effects';
import {watchFetchUserInfo, watchUpdateUserInfo} from './userSaga';

const rootSaga = function* () {
  yield all([fork(watchFetchUserInfo), fork(watchUpdateUserInfo)]);
};
export default rootSaga;
