import {
  CHECK_USER_EXISTS,
  VERIFY_CODE,
  LOG_ME_IN,
  SIGN_ME_UP,
  STORE_USER,
  CheckUserPayload,
  VerifyCodePayload,
  LoginPayload,
  SignupPayload,
  User,
  ActionCallback,
  CheckUserAction,
  VerifyCodeAction,
  LoginRequestAction,
  LoginSuccessAction,
  SignupRequestAction
} from "./types"

export function checkUserExists({
  payload,
  callback
}: {
  payload: CheckUserPayload;
  callback?: ActionCallback;
}): CheckUserAction {
  return {
    type: CHECK_USER_EXISTS,
    payload,
    callback
  }
}

export function verifyCode({
  payload,
  callback
}: {
  payload: VerifyCodePayload;
  callback?: ActionCallback;
}): VerifyCodeAction {
  console.log('----------------------ACTIONPAYLOAD---------------\n',payload)
  return {
    type: VERIFY_CODE,
    payload,
    callback
  }
}

export function logMeIn({
  payload,
  callback
}: {
  payload: LoginPayload;
  callback?: ActionCallback;
}): LoginRequestAction {
  return {
    type: LOG_ME_IN.REQUEST,
    payload,
    callback
  }
}

export function successLogMeIn({
  payload
}: {
  payload: User;
}): LoginSuccessAction {
  return {
    type: LOG_ME_IN.SUCCESS,
    payload
  }
}

export function storeUser({
  payload
}: {
  payload: User;
}): LoginSuccessAction {
  return {
    type: STORE_USER,
    payload
  }
}

export function signMeUp({
  payload,
  callback
}: {
  payload: SignupPayload;
  callback?: ActionCallback;
}): SignupRequestAction {
  return {
    type: SIGN_ME_UP.REQUEST,
    payload,
    callback
  }
}
