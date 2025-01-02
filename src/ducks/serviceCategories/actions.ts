import {
  GET_SERVICE_CATEGORIES_REQUEST,
  GET_SERVICE_CATEGORIES_SUCCESS,
  GET_SERVICE_CATEGORIES_FAILURE,
  ServiceCategory,
  GetServiceCategoriesRequestAction,
  GetServiceCategoriesSuccessAction,
  GetServiceCategoriesFailureAction
} from './types';

export const requestServiceCategories = (
  payload: { page?: number; limit?: number },
  reset?: boolean,
  isPullToRefresh?: boolean,
  identifier?: string
): GetServiceCategoriesRequestAction => {
  return {
    type: GET_SERVICE_CATEGORIES_REQUEST,
    payload,
    identifier
  };
};

export const serviceCategoriesSuccess = (
  data: ServiceCategory[],
  identifier?: string
): GetServiceCategoriesSuccessAction => ({
  type: GET_SERVICE_CATEGORIES_SUCCESS,
  payload: data,
  identifier
});

export const serviceCategoriesFailure = (
  error: string,
  identifier?: string
): GetServiceCategoriesFailureAction => ({
  type: GET_SERVICE_CATEGORIES_FAILURE,
  error,
  identifier
});
