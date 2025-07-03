import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { dataReducer } from './slices/dataReducer';

const rootReducer = combineReducers({
  data: dataReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  mergeStrategy: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const crashReporter: Middleware = (store) => (next) => (action) => {
  try {
    return next(action); // dispatch
  } catch (err) {
    console.error('Caught an exception!', err, store);
    throw err; // re-throw error
  }
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(crashReporter),
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);
