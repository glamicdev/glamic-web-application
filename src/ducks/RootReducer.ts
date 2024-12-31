import { combineReducers, Reducer } from 'redux';
import { AppState, AuthState } from '../store/types/AppState';
import { AuthAction } from './auth/types';
import auth from './auth';

// Define the reducers mapping that matches AppState
const reducers: {
  auth: Reducer<AuthState, AuthAction>;
} = {
  auth
};

// Create the root reducer
const rootReducer = combineReducers(reducers);

export type RootState = AppState;
export type RootAction = AuthAction;

export default rootReducer;
