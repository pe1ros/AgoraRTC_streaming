import {
  GET_AGORA_STREAM_FAILURE,
  GET_AGORA_STREAM_SUCCESS,
  GET_AGORA_TOKEN_FAILURE,
  GET_AGORA_TOKEN_SUCCESS,
  GET_USERDATA_FAILURE,
  GET_USERDATA_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SET_LOGIN,
  START_RECORD_AGORA_STREAM_FAILURE,
  START_RECORD_AGORA_STREAM_SUCCESS,
  STOP_RECORD_AGORA_STREAM_FAILURE,
  STOP_RECORD_AGORA_STREAM_SUCCESS,
} from '../constants';

import loginRequestInstance from '../../api/login';
import userDataRequestInstance from '../../api/users_me';
import verifyRequestInstance from '../../api/verify';
import agforaTokenRequestInstance from '../../api/agora_token';
import agoraStreamRequestInstance from '../../api/agora_stream';
import agoraStartRecordRequestInstance from '../../api/start_record';
import agoraStopRecordRequestInstance from '../../api/stop_record';
import agoraQueryRecordRequestInstance from '../../api/query_record';

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

export function agoraTokenSuccess(payload) {
  return {
    type: GET_AGORA_TOKEN_SUCCESS,
    payload
  };
}
export function agoraTokenFailure(payload) {
  return {
    type: GET_AGORA_TOKEN_FAILURE,
    payload
  };
}

export function agoraStreamSuccess(payload) {
  return {
    type: GET_AGORA_STREAM_SUCCESS,
    payload
  };
}
export function agoraStreamFailure(payload) {
  return {
    type: GET_AGORA_STREAM_FAILURE,
    payload
  };
}

export function agoraStartRecordSuccess(payload) {
  console.log('START_REC', payload);
  return {
    type: START_RECORD_AGORA_STREAM_SUCCESS,
    payload
  };
}
export function agoraStartRecordFailure(payload) {
  return {
    type: START_RECORD_AGORA_STREAM_FAILURE,
    payload
  };
}

export function agoraStopRecordSuccess(payload) {
  console.log('STOP_REC', payload);
  return {
    type: STOP_RECORD_AGORA_STREAM_SUCCESS,
    payload
  };
}
export function agoraStopRecordFailure(payload) {
  return {
    type: STOP_RECORD_AGORA_STREAM_FAILURE,
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

export const agoraTokenRequest = (
  data,
) => {
  return async (dispatch) => {
      const res = await agforaTokenRequestInstance(data);
      if(!res.error){
        dispatch(agoraTokenSuccess(res.data))
        return;
      }
      dispatch(agoraTokenFailure(res.error));
  };
};

export const agoraStreamRequest = (
  data,
) => {
  return async (dispatch) => {
      const res = await agoraStreamRequestInstance(data);
      if(!res.error){
        dispatch(agoraStreamSuccess(JSON.parse(res.data)?.resourceId))
        return;
      }
      dispatch(agoraStreamFailure(res.error));
    
  };
};

export const agoraStartRecordRequest = (
  data,
) => {
  return async (dispatch) => {
      const res = await agoraStartRecordRequestInstance(data);
      if(!res.error){
        dispatch(agoraStartRecordSuccess(JSON.parse(res.data)));
        return;
      }
      dispatch(agoraStartRecordFailure(res.error));
    
  };
};

export const agoraStopRecordRequest = (
  data,
) => {
  return async (dispatch) => {
      const res = await agoraStopRecordRequestInstance(data);
      if(!res.error){
        dispatch(agoraStopRecordSuccess(JSON.parse(res.data)));
        return;
      }
      dispatch(agoraStopRecordFailure(res.error));
    
  };
};

export const agoraQueryRecordRequest = (
  data,
) => {
  return async (dispatch) => {
      const res = await agoraQueryRecordRequestInstance(data);
      console.log("QUERY_RECORD", JSON.parse(res.data));
    
  };
};