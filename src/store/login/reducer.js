import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  GET_USERDATA_SUCCESS,
  GET_USERDATA_FAILURE,
  LOGOUT,
  SET_LOGIN,
  GET_AGORA_TOKEN_SUCCESS,
  GET_AGORA_TOKEN_FAILURE,
  GET_AGORA_STREAM_SUCCESS,
  GET_AGORA_STREAM_FAILURE,
  START_RECORD_AGORA_STREAM_SUCCESS,
  START_RECORD_AGORA_STREAM_FAILURE,
  GET_AGORA_TOKEN_RTM_SUCCESS,
  GET_AGORA_TOKEN_RTM_FAILURE,
} from '../constants';

const initState = {
  user: null,
  login: null,
  agoraToken: null,
  agoraStreamId: null,
  recordInfo: null,
  agoraTokenRtm: null,
  errors: '',
}

function loginReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        errors: action.payload
      };
    case GET_USERDATA_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USERDATA_FAILURE:
      return {
        ...state,
        errors: action.payload,
        user: null,
      };
    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case GET_AGORA_TOKEN_SUCCESS:
      return {
        ...state,
        agoraToken: action.payload,
      } 
    case GET_AGORA_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case GET_AGORA_TOKEN_RTM_SUCCESS:
      return {
        ...state,
        agoraTokenRtm: action.payload,
      } 
    case GET_AGORA_TOKEN_RTM_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case GET_AGORA_STREAM_SUCCESS:
      return {
        ...state,
        agoraStreamId: action.payload,
      } 
    case GET_AGORA_STREAM_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case START_RECORD_AGORA_STREAM_SUCCESS:
      return {
        ...state,
        recordInfo: action.payload,
      }
    case START_RECORD_AGORA_STREAM_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
export default loginReducer;
