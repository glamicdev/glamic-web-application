import { AppState } from '../../store/types/AppState';
import { RequestFlagData } from './types';

const defaultValue: RequestFlagData = {
  loading: false,
  failure: false,
  errorMessage: undefined,
  totalRecords: 0,
  nextPage: 1
};

export const getRequestFlag = (key: string | string[]) => (store: AppState): RequestFlagData => {
  if (Array.isArray(key)) {
    for (let i = 0; i < key.length; i += 1) {
      const keyI = key[i];
      if (store.requestFlags[keyI] && store.requestFlags[keyI].loading) {
        return store.requestFlags[keyI];
      }
    }
    return defaultValue;
  }
  return store.requestFlags[key] || defaultValue;
};
