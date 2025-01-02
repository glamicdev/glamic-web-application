import Immutable from 'seamless-immutable';

// State interface
export interface RequestFlagData {
  loading: boolean;
  failure: boolean;
  isPullToRefresh?: boolean;
  reset?: boolean;
  errorList?: string;
  errorMessage?: string;
  totalRecords?: number;
  nextPage?: number;
}

export type RequestFlagsState = Immutable.ImmutableObject<{
  [key: string]: RequestFlagData;
}>;

// Page interface used in actions
export interface PageInfo {
  current_page: number;
  total: number;
}

// Action interface
export interface RequestFlagAction {
  type: string;
  errorList?: string;
  errorMessage?: string;
  isPullToRefresh?: boolean;
  reset?: boolean;
  data?: any;
  identifier?: string;
  page?: PageInfo;
  isResetData?: boolean;
}

// Type guard for request actions
export function isRequestAction(action: any): action is RequestFlagAction {
  return (
    action &&
    typeof action === 'object' &&
    typeof action.type === 'string' &&
    (!action.identifier || typeof action.identifier === 'string') &&
    (!action.errorMessage || typeof action.errorMessage === 'string') &&
    (!action.errorList || typeof action.errorList === 'string') &&
    (!action.isPullToRefresh || typeof action.isPullToRefresh === 'boolean') &&
    (!action.reset || typeof action.reset === 'boolean') &&
    (!action.isResetData || typeof action.isResetData === 'boolean') &&
    (!action.page || (
      typeof action.page === 'object' &&
      typeof action.page.current_page === 'number' &&
      typeof action.page.total === 'number'
    ))
  );
}
