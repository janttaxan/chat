import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { middleware } from 'core/redux/middleware';
import { channelsSlice } from 'core/redux/slices/channels-slice';
import { messagesSlice } from 'core/redux/slices/messages-slice';
import { userSlice } from 'core/redux/slices/user-slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    channels: channelsSlice.reducer,
    messages: messagesSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

export const useDispatch: () => ReduxDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

export type ReduxDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, Action<string>>;
