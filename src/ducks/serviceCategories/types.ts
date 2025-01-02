export const GET_SERVICE_CATEGORIES_REQUEST = 'service-categories/GET_SERVICE_CATEGORIES_REQUEST';
export const GET_SERVICE_CATEGORIES_SUCCESS = 'service-categories/GET_SERVICE_CATEGORIES_SUCCESS';
export const GET_SERVICE_CATEGORIES_FAILURE = 'service-categories/GET_SERVICE_CATEGORIES_FAILURE';

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  selected?: boolean;
}

export interface ServiceCategoriesState {
  data: ServiceCategory[];
  error: string | null;
}

export interface GetServiceCategoriesRequestAction {
  type: typeof GET_SERVICE_CATEGORIES_REQUEST;
  payload: {
    page?: number;
    limit?: number;
  };
  reset?: boolean;
  callback?: (data: ServiceCategory[]) => void;
  identifier?: string;
}

export interface GetServiceCategoriesSuccessAction {
  type: typeof GET_SERVICE_CATEGORIES_SUCCESS;
  payload: ServiceCategory[];
  identifier?: string;
}

export interface GetServiceCategoriesFailureAction {
  type: typeof GET_SERVICE_CATEGORIES_FAILURE;
  error: string;
  identifier?: string;
}

export type ServiceCategoriesActionTypes =
  | GetServiceCategoriesRequestAction
  | GetServiceCategoriesSuccessAction
  | GetServiceCategoriesFailureAction;
