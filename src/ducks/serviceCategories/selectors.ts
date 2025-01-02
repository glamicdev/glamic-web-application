import { AppState } from '../../store/types/AppState';
import { ServiceCategory } from './types';
import { RequestFlagData } from '../requestFlags/types';

export const getServiceCategories = (state: AppState): ServiceCategory[] => 
  state.serviceCategories.data;

export const getServiceCategoriesError = (state: AppState): string | null => 
  state.serviceCategories.error;

export const requestFlagSelectors = {
  getRequestFlag: (identifier: string) => (state: AppState): RequestFlagData => 
    state.requestFlags[identifier] || {
      loading: false,
      failure: false,
      errorMessage: undefined,
      totalRecords: 0,
      nextPage: 1
    }
};
