import {
  GET_USERDATA_FAILURE,
  GET_USERDATA_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SET_LOGIN,
} from '../constants';

import loginRequestInstance from '../../api/login';
import userDataRequestInstance from '../../api/users_me';
import verifyRequestInstance from '../../api/verify';

export function setloginNumber(payload) {
  return {
    type: SET_LOGIN,
    payload
  };
}

export function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
}
export function loginFailure(payload) {
  return {
    type: LOGIN_FAILURE,
    payload
  };
}

export function getUserDataSuccess(payload) {
  return {
    type: GET_USERDATA_SUCCESS,
    payload
  };
}
export function getUserDataFailure(payload) {
  return {
    type: GET_USERDATA_FAILURE,
    payload
  };
}

export const loginRequest = (
  data,
) => {
  return async (dispatch) => {
    try {
      const res = await loginRequestInstance(data);
    } catch (error) {
      console.log(error);
  };
  }
};
export const getUserDataRequest = () => {
  return async (dispatch) => {
      const res = await userDataRequestInstance();
      if(!res.error){
        dispatch(loginSuccess(res.data));
        return;
      }
   
  };
};

export const verifyRequest = (
  data,
) => {
  return async (dispatch) => {
      const res = await verifyRequestInstance(data);
      if(!res.error){
        localStorage.setItem('user', res.data.accessToken.accessToken)
        dispatch(loginSuccess(res.data.user))
        return;
      }
      dispatch(loginFailure(res.error));
  };
};