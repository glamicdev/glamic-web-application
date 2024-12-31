import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, createTransform, Transform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer, { RootAction } from '../ducks/RootReducer';
import rootSaga from '../ducks/RootSaga';
import { AuthState, AppState } from './types/AppState';

// Create transform to handle the auth state
const authTransform: Transform<AuthState, AuthState> = createTransform(
  // transform state on its way to being serialized and persisted
  (inboundState: AuthState) => {
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState: AuthState) => {
    return outboundState;
  },
  // define which reducers this transform gets called for
  { whitelist: ['auth'] }
);

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [authTransform]
};

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure middlewares
const middlewares = [sagaMiddleware];

// Create store with middleware
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
) as Store<AppState, RootAction>;

// Create and export persistor
export const persistor = persistStore(store);

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export store types
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export { store };
export default store;
