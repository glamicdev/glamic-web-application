import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LIMIT } from '../../../config/WebService';
import { showErrorToast } from '../../../services/toastHandler';
import LoadingHeartView from '../../common/LoadingHeartView/LoadingHeartView';

interface FlatListApiProps {
  requestAction: Function;
  requestFlags: {
    loading: boolean;
    failure: boolean;
    errorMessage?: string;
    isPullToRefresh?: boolean;
    totalRecords?: number;
    nextPage?: number;
    reset?: boolean;
  };
  data: any[];
  payload?: Record<string, any>;
  pageKey?: string;
  limit?: number;
  loaderView?: () => JSX.Element;
  errorView?: (errorMessage: string, retry: () => void) => JSX.Element;
  bottomLoaderView?: () => JSX.Element;
  bottomErrorView?: (errorMessage: string, retry: () => void) => JSX.Element;
  emptyView?: () => JSX.Element;
  identifier?: any;
  sendRequestOnMount?: boolean;
  showOnly?: boolean;
  showScrollIndicator?: boolean;
  url?: Record<string, any>;
  contentContainerStyle?: React.CSSProperties;
  listStyle?: React.CSSProperties;
  filters?: Record<string, any>;
  numColumns?: number;
  disableLoadMore?: boolean;
  successCallBack?: Function;
  extraObject?: Record<string, any>;
  renderItem: ({ item, index }: { item: any; index: number }) => JSX.Element;
}

const FlatListApi: React.FC<FlatListApiProps> = ({
  requestAction,
  requestFlags,
  data,
  payload = {},
  limit = LIMIT,
  loaderView,
  errorView,
  bottomLoaderView,
  bottomErrorView,
  emptyView,
  identifier,
  sendRequestOnMount = true,
  showOnly = false,
  url,
  contentContainerStyle = {},
  listStyle = {},
  filters = {},
  disableLoadMore = false,
  successCallBack,
  extraObject = {},
  renderItem,
  numColumns,
}) => {
  const dispatch = useDispatch();
  const listRef = useRef<HTMLDivElement>(null);
  const isFirstTimeRefreshed = useRef(false);
  const nextPageRef = useRef(1);

  const memoizedFilters = React.useMemo(() => JSON.stringify(filters), [filters]);
  const memoizedPayload = React.useMemo(() => JSON.stringify(payload), [payload]);
  const memoizedExtra = React.useMemo(() => JSON.stringify(extraObject), [extraObject]);

  const sendRequest = useCallback((
    reset = false,
    isPullToRefresh = false,
    nextPage = 1,
    isResetData = false,
  ) => {
    if (showOnly) return;

    const requestPayload: Record<string, any> = { 
      ...JSON.parse(memoizedPayload), 
      ...JSON.parse(memoizedFilters), 
      limit 
    };
    if (nextPage !== 0) {
      requestPayload.page = nextPage;
    }

    if (identifier && url) {
      dispatch(requestAction(requestPayload, reset, isPullToRefresh, identifier, url, isResetData, successCallBack, JSON.parse(memoizedExtra)));
    } else if (identifier) {
      dispatch(requestAction(requestPayload, reset, isPullToRefresh, identifier, isResetData, successCallBack, JSON.parse(memoizedExtra)));
    } else if (url) {
      dispatch(requestAction(requestPayload, reset, isPullToRefresh, url, isResetData, successCallBack, JSON.parse(memoizedExtra)));
    } else {
      dispatch(requestAction(requestPayload, reset, isPullToRefresh, isResetData, successCallBack, JSON.parse(memoizedExtra)));
    }
  }, [dispatch, memoizedPayload, memoizedFilters, memoizedExtra, limit, identifier, url, showOnly, requestAction, successCallBack]);

  useEffect(() => {
    if (sendRequestOnMount) {
      sendRequest(true);
    }
  }, [sendRequestOnMount, sendRequest]);

  useEffect(() => {
    const { failure, errorMessage, loading } = requestFlags;

    if (!failure && !loading && data.length > 0) {
      isFirstTimeRefreshed.current = true;
    }

    if (failure && data.length > 0) {
      showErrorToast(errorMessage || 'Error occurred');
    }
  }, [requestFlags, data]);

  useEffect(() => {
    if (requestFlags.nextPage) {
      nextPageRef.current = requestFlags.nextPage;
    }
  }, [requestFlags.nextPage]);

  useEffect(() => {
    const hasFilters = JSON.parse(memoizedFilters);
    const hasPayload = JSON.parse(memoizedPayload);
    if (Object.keys(hasFilters).length > 0 || Object.keys(hasPayload).length > 0) {
      sendRequest(true, false, 1, true);
    }
  }, [memoizedFilters, memoizedPayload, sendRequest]);

  const handleScroll = useCallback(() => {
    if (!listRef.current) return;

    const { scrollTop, clientHeight, scrollHeight } = listRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    const { loading, totalRecords = 0 } = requestFlags;
    const dataLength = data.length;
    const sendRequestOnEnd = !loading && dataLength < totalRecords && isFirstTimeRefreshed.current;

    if (isNearBottom && sendRequestOnEnd && !disableLoadMore) {
      sendRequest(false, false, nextPageRef.current);
    }
  }, [requestFlags, data, disableLoadMore, sendRequest]);

  const renderBottomError = () => {
    const { errorMessage } = requestFlags;
    if (bottomErrorView) {
      return bottomErrorView(errorMessage || 'Error occurred', () => sendRequest(false, false, nextPageRef.current));
    }
    return <div className="bottom-error">Error loading more items. Click to retry.</div>;
  };

  const renderBottomLoader = () => {
    if (bottomLoaderView) {
      return bottomLoaderView();
    }
    return <div className="bottom-loader">Loading more...</div>;
  };

  const renderLoaderView = () => {
    if (loaderView) {
      return loaderView();
    }
    return <LoadingHeartView />;
  };

  const renderErrorView = () => {
    const { errorMessage } = requestFlags;
    if (errorView) {
      return errorView(errorMessage || 'Error occurred', () => sendRequest(true));
    }
    return <div className="error-view">Error loading data. Click to retry.</div>;
  };

  const renderEmptyView = () => {
    if (emptyView) {
      return emptyView();
    }
    return <div className="empty-view">No Data Found!</div>;
  };

  const { loading, failure, isPullToRefresh, reset } = requestFlags;
  const showLoading = loading && !isPullToRefresh;
  const showError = failure && data.length === 0;
  const showBottomLoader = loading && !isPullToRefresh && !reset && data.length > 0 && isFirstTimeRefreshed.current;
  const showBottomError = !loading && !isPullToRefresh && !reset && data.length > 0 && data.length < (requestFlags.totalRecords || 0) && failure && isFirstTimeRefreshed.current;

  if (showLoading) return renderLoaderView();
  if (showError) return renderErrorView();

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      style={{
        overflowY: 'auto',
        maxHeight: '100vh',
        ...listStyle
      }}
    >
      <div style={{
        ...contentContainerStyle,
        display: 'grid',
        gridTemplateColumns: numColumns ? `repeat(${numColumns}, 1fr)` : 'auto',
        gap: '1rem'
      }}>
        {data.map((item, index) => renderItem({ item, index }))}
        {showBottomLoader && renderBottomLoader()}
        {showBottomError && renderBottomError()}
        {!data.length && renderEmptyView()}
      </div>
    </div>
  );
};

export default FlatListApi;
