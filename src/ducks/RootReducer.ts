import { combineReducers, Reducer } from 'redux';
import { AppState, AuthState } from '../store/types/AppState';
import { AuthAction } from './auth/types';
import { ServiceCategoriesState, ServiceCategoriesActionTypes } from './serviceCategories/types';
import { RequestFlagsState, RequestFlagAction } from './requestFlags/types';
import auth from './auth';
import requestFlags from './requestFlags';
import serviceCategories from './serviceCategories/reducer';

// Define the reducers mapping that matches AppState
const reducers: {
  auth: Reducer<AuthState, AuthAction>;
  serviceCategories: Reducer<ServiceCategoriesState, ServiceCategoriesActionTypes>;
  requestFlags: Reducer<RequestFlagsState, RequestFlagAction>;
} = {
  auth,
  serviceCategories,
  requestFlags
};

// Create the root reducer
const rootReducer = combineReducers(reducers);

export type RootState = AppState;
export type RootAction = AuthAction | ServiceCategoriesActionTypes | RequestFlagAction;

export default rootReducer;
