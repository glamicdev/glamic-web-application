import _ from 'lodash';
import {
  GET_SERVICE_CATEGORIES_SUCCESS,
  GET_SERVICE_CATEGORIES_FAILURE,
  ServiceCategoriesState,
  ServiceCategoriesActionTypes,
} from './types';

const initialState: ServiceCategoriesState = {
  data: [],
  error: null
};

export default (state = initialState, action: ServiceCategoriesActionTypes): ServiceCategoriesState => {
  switch (action.type) {
    case GET_SERVICE_CATEGORIES_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        error: null
      };
    }

    case GET_SERVICE_CATEGORIES_FAILURE: {
      return {
        ...state,
        error: action.error
      };
    }

    default:
      return state;
  }
};
