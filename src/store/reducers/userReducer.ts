import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAIL,
  UPDATE_USER_INFO_SUCCESS,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  GET_USER_INFO_REQUEST,
} from '../constants/actionTypes';

const initData = {
  userData: {},
  fetching: false,
  error: null,
};

const userReducer = (state = initData, {type, payload}: any) => {
  switch (type) {
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        fetch: true,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userData: payload,
        fetch: false,
        error: null,
      };
    case GET_USER_INFO_FAIL:
      return {
        ...state,
        userData: {},
        error: payload,
        fetch: false,
      };
    case UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        fetch: true,
      };
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        userData: payload,
        fetch: false,
        error: null,
      };
    case UPDATE_USER_INFO_FAIL:
      return {
        ...state,
        userData: {...state.userData},
        error: payload,
        fetch: false,
      };
    default:
      return state;
  }
};
export default userReducer;
