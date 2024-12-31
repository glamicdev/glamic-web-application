import { call, take, fork, put } from 'redux-saga/effects';
import {
  CHECK_USER_EXISTS,
  LOG_ME_IN,
  SIGN_ME_UP,
  VERIFY_CODE,
  CheckUserAction,
  VerifyCodeAction,
  LoginRequestAction,
  SignupRequestAction,
  AuthResponse,
  User
} from './types';
import {
  API_CHECK_USER_EXIST,
  API_LOGIN,
  API_SIGNUP,
  API_VERIFY_EMAIL_CODE,
  API_VERIFY_PHONE_CODE
} from '../../config/WebService';
import ToastHandler, { showErrorToast, showSuccessToast } from '../../services/toastHandler';
import { logMeIn, successLogMeIn } from './actions';
import { callRequest } from '../../utils/ApiSauce';
import Util from '../../utils/Util';

function* watchCheckUserExists() {
  while (true) {

    const action: CheckUserAction = yield take(CHECK_USER_EXISTS);
    const { payload, callback } = action;

    try {
      const { data }: { data: AuthResponse } = yield call(
        callRequest,
        API_CHECK_USER_EXIST,
        { ...payload, requestFrom: 'provider_app' }
      );

      showSuccessToast('successssss', 3000);

      if (payload?.verify_social_login && Util.isNotEmpty(data)) {
        // Convert AuthResponse to LoginPayload
        const loginPayload = {
          email: data.email,
          phone: data.phone,
          social_login: true
        };
        yield put(logMeIn({ payload: loginPayload }));
      }

      if (callback) {
        callback(data);
      }
    } catch (err: any) {

      showErrorToast(err.message, 3000);
    }
  }
}

function* watchVerifyCodeRequest() {
  while (true) {
    const action: VerifyCodeAction = yield take(VERIFY_CODE);
    const { payload, callback } = action;

    const API_VERIFICATION = payload.email ? API_VERIFY_EMAIL_CODE : API_VERIFY_PHONE_CODE;

    try {
      const { data }: { data: AuthResponse } = yield call(
        callRequest,
        API_VERIFICATION,
        payload
      );

      // Convert AuthResponse to LoginPayload
      const loginPayload = {
        email: data.email,
        phone: data.phone
      };
      yield put(logMeIn({ payload: loginPayload }));

      if (callback) {
        callback(data);
      }
    } catch (err: any) {
      ToastHandler.showToast(err.message, 'error', 3000);
    }
  }
}

function* watchSigninRequest() {
  while (true) {
    const action: LoginRequestAction = yield take(LOG_ME_IN.REQUEST);
    const { payload, callback } = action;

    try {
      const { data }: { data: AuthResponse } = yield call(
        callRequest,
        API_LOGIN,
        payload
      );

      const {
        service_provider_setting,
        studio_address,
        payment_settings,
        subscription,
        completed_account_setup,
        viewed_pages,
        web_settings,
        policies,
        waivers,
        ...user
      } = data;

      if (user.user_type === 'provider') {
        // Convert user to User type
        const userData: User = {
          ...user,
          id: user.id,
          user_type: user.user_type
        };

        yield put(successLogMeIn({ payload: userData }));

        if (callback) {
          callback(data);
        }
      }
    } catch (err: any) {
      ToastHandler.showToast(err.message, 'error', 3000);
    }
  }
}

function* watchSignupRequest() {
  while (true) {
    const action: SignupRequestAction = yield take(SIGN_ME_UP.REQUEST);
    const { payload, callback } = action;

    try {
      const { data }: { data: AuthResponse } = yield call(
        callRequest,
        API_SIGNUP,
        payload
      );

      if (payload?.verify_social_login) {
        // Convert AuthResponse to LoginPayload
        const loginPayload = {
          email: data.email,
          phone: data.phone,
          social_login: true
        };
        yield put(logMeIn({ payload: loginPayload }));
      } else if (callback) {
        callback(data);
      }
    } catch (err: any) {
      ToastHandler.showToast(err.message, 'error', 3000);
    }
  }
}

export default function* root() {
  yield fork(watchCheckUserExists);
  yield fork(watchVerifyCodeRequest);
  yield fork(watchSigninRequest);
  yield fork(watchSignupRequest);
}
