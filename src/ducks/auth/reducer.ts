import { AuthState } from '../../store/types/AppState';
import {
  CHECK_USER_EXISTS,
  LOG_ME_IN,
  SIGN_ME_UP,
  VERIFY_CODE,
  AuthAction,
  LoginSuccessAction,
  LoginFailureAction,
  SignupSuccessAction,
  SignupFailureAction
} from './types';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case CHECK_USER_EXISTS:
    case VERIFY_CODE:
    case LOG_ME_IN.REQUEST:
    case SIGN_ME_UP.REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOG_ME_IN.SUCCESS:
    case SIGN_ME_UP.SUCCESS: {
      const successAction = action as LoginSuccessAction | SignupSuccessAction;
      return {
        ...state,
        user: successAction.payload,
        loading: false,
        error: null
      };
    }

    case LOG_ME_IN.FAILURE:
    case SIGN_ME_UP.FAILURE: {
      const failureAction = action as LoginFailureAction | SignupFailureAction;
      return {
        ...state,
        loading: false,
        error: failureAction.payload
      };
    }

    default:
      return state;
  }
};

export default authReducer;
