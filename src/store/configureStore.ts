import AsyncStorage from '@react-native-community/async-storage';
import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {profileReducer} from './profile';
import {carsReducer} from './cars';
import {finesReducer} from './fines';
import {paymentsReducer} from './payments';
import {settingsReducer} from './settings/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const middlewares = [thunk];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const rootReducer = combineReducers({
  profile: profileReducer,
  cars: carsReducer,
  fines: finesReducer,
  payments: paymentsReducer,
  settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: middlewares,
  });
}

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
