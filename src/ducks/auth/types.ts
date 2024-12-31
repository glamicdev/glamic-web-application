import createRequestTypes from "../ActionTypes";

export const CHECK_USER_EXISTS = 'CHECK_USER_EXISTS'
export const VERIFY_CODE = 'VERIFY_CODE'
export const LOG_ME_IN = createRequestTypes('LOG_ME_IN')
export const SIGN_ME_UP = createRequestTypes('SIGN_ME_UP')

// User interfaces
export interface User {
  id: string;
  user_type: string;
  email?: string;
  phone?: string;
  [key: string]: any; // for other user properties
}

// Payload interfaces
export interface CheckUserPayload {
  email?: string;
  mobile_number?: string;
  verify_email?: boolean;
  verify_phone?: boolean;
  verify_social_login?: boolean;
  requestFrom?: string;
}

export interface VerifyCodePayload {
  email?: string;
  phone?: string;
  code: string;
}

export interface LoginPayload {
  email?: string;
  phone?: string;
  password?: string;
  social_login?: boolean;
}

export interface SignupPayload {
  email?: string;
  phone?: string;
  password?: string;
  verify_social_login?: boolean;
}

// Action interfaces
export interface ActionCallback<T = any> {
  (data: T): void;
}

import { Action } from 'redux';

export interface BaseAction<T, TType extends string = string> extends Action<TType> {
  payload: T;
  callback?: ActionCallback;
  [key: string]: unknown;  // Required for UnknownAction compatibility
}

export interface CheckUserAction extends BaseAction<CheckUserPayload> {
  type: typeof CHECK_USER_EXISTS;
}

export interface VerifyCodeAction extends BaseAction<VerifyCodePayload> {
  type: typeof VERIFY_CODE;
  verificationForSignup?: boolean;
}

export interface LoginRequestAction extends BaseAction<LoginPayload> {
  type: typeof LOG_ME_IN.REQUEST;
}

export interface LoginSuccessAction extends BaseAction<User> {
  type: typeof LOG_ME_IN.SUCCESS;
}

export interface LoginFailureAction extends BaseAction<string> {
  type: typeof LOG_ME_IN.FAILURE;
}

export interface SignupRequestAction extends BaseAction<SignupPayload> {
  type: typeof SIGN_ME_UP.REQUEST;
}

export interface SignupSuccessAction extends BaseAction<User> {
  type: typeof SIGN_ME_UP.SUCCESS;
}

export interface SignupFailureAction extends BaseAction<string> {
  type: typeof SIGN_ME_UP.FAILURE;
}

export type AuthAction =
  | CheckUserAction
  | VerifyCodeAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignupRequestAction
  | SignupSuccessAction
  | SignupFailureAction;

// Response interfaces
export interface AuthResponse {
  service_provider_setting?: any;
  studio_address?: any;
  payment_settings?: any;
  subscription?: any;
  completed_account_setup?: boolean;
  viewed_pages?: string[];
  web_settings?: any;
  policies?: any;
  waivers?: any;
  [key: string]: any;
}
