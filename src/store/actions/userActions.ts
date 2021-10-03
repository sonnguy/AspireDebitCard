import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
} from '../constants/actionTypes';
import {UserModal} from '../services/userModel';

export const getUserInfo = (id: number) => ({
  type: GET_USER_INFO_REQUEST,
  payload: id,
});

export const getUserInfoSuccess = (data: UserModal) => ({
  type: GET_USER_INFO_SUCCESS,
  payload: data,
});

export const getUserInfoFail = (error: any) => ({
  type: GET_USER_INFO_REQUEST,
  payload: error,
});

export const updateUserInfo = (data: UserModal) => ({
  type: UPDATE_USER_INFO_REQUEST,
  payload: data,
});

export const updateUserInfoSuccess = (data: UserModal) => ({
  type: UPDATE_USER_INFO_SUCCESS,
  payload: data,
});

export const updateUserInfoFail = (error: any) => ({
  type: UPDATE_USER_INFO_FAIL,
  payload: error,
});

export default {
  updateUserInfo,
  updateUserInfoSuccess,
  updateUserInfoFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
};
