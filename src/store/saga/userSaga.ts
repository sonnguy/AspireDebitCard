import {call, put, takeLatest} from 'redux-saga/effects';
import {getUserInfoFail, getUserInfoSuccess} from '../actions/userActions';
import {
  GET_USER_INFO_REQUEST,
  UPDATE_USER_INFO_REQUEST,
} from '../constants/actionTypes';
import {fetchUserInfoApi, updateUserInfoApi} from '../services/userApi';

export function* watchFetchUserInfo() {
  yield takeLatest(GET_USER_INFO_REQUEST, fetchUserInfo);
}

export function* watchUpdateUserInfo() {
  yield takeLatest(UPDATE_USER_INFO_REQUEST, updateUserInfo);
}

function* fetchUserInfo(action: any) {
  try {
    const data = yield call(fetchUserInfoApi, action.payload);
    yield put(getUserInfoSuccess(data));
  } catch (error) {
    yield put(getUserInfoFail(error));
  }
}

function* updateUserInfo(action: any) {
  try {
    const data = yield call(updateUserInfoApi, action.payload);
    yield put(getUserInfoSuccess(data));
  } catch (error) {
    yield put(getUserInfoFail(error));
  }
}
