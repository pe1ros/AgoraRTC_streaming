import { combineReducers } from 'redux';

import loginReducer from './login/reducer';

export const rootReducer = combineReducers({
  loginReducer,
});
