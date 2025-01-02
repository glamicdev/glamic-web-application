import Immutable from 'seamless-immutable';
import { REQUEST, SUCCESS, FAILURE, RESET } from '../ActionTypes';
import { RequestFlagsState, RequestFlagAction, RequestFlagData } from './types';

const initialState: RequestFlagsState = Immutable<{ [key: string]: RequestFlagData }>({});

const regularExpression = new RegExp(`(.*)_(${REQUEST}|${SUCCESS}|${FAILURE})`);

export default (state = initialState, action: RequestFlagAction): RequestFlagsState => {
  const {
    type,
    errorList,
    errorMessage,
    isPullToRefresh,
    reset,
    identifier,
    page,
    isResetData,
  } = action;

  const matches = regularExpression.exec(type);
  if (!matches) return state;
  const [, requestName, requestState] = matches;
  // const totalRecords = data instanceof Array ? data.length : 0;

  const requestIdentifier =
    identifier && identifier !== ''
      ? `${requestName}_${identifier}`
      : requestName;

  const totalRecords = page && page.total ? page.total : 0;

  const nextPage = page && page.current_page ? page.current_page + 1 : 0;

  if (isResetData) {
    return state.merge({
      [requestIdentifier]: {
        loading: true,
        failure: false,
        isPullToRefresh: false,
        reset: false,
      },
    });
  }

  if (requestState === RESET) {
    return state.merge({
      [requestIdentifier]: {
        loading: false,
        failure: false,
        reset: true,
        isPullToRefresh: false,
        errorList: '',
        errorMessage: '',
        totalRecords: 0,
        nextPage: 0
      },
    });
  }


  return state.merge({
    [requestIdentifier]: {
      loading: requestState === REQUEST,
      failure: requestState === FAILURE,
      reset: reset || false,
      isPullToRefresh: isPullToRefresh || false,
      errorList: errorList || '',
      errorMessage: errorMessage || '',
      totalRecords,
      nextPage,
    },
  });
};
