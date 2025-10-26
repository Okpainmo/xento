import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import navToggleReducer from './slices/navToggleSlice';
import transactionsTrayReducer from './slices/transactionsTraySlice';
import modalReducer from './slices/modalSlice';
import overlayReducer from './slices/overlaySlice';
import tokenSelectionReducer from './slices/tokenSelectionSlice';
import formTabReducer from './slices/formTabSlice';
import exploreReducer from './slices/exploreSlice';

export const store = configureStore({
  reducer: {
    navToggle: navToggleReducer,
    modalToggle: modalReducer,
    transactionsTray: transactionsTrayReducer,
    overlay: overlayReducer,
    tokenSelection: tokenSelectionReducer,
    formTab: formTabReducer,
    explore: exploreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
