import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

import { Message } from 'core/entities';
import { ReduxState } from 'core/redux/store';
import { channelRemove, selectCurrentChannelId } from 'core/redux/slices/channels-slice';
import { signout } from 'core/redux/slices/user-slice';

export const messagesAdapter = createEntityAdapter<Message>();

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    messageAdd: messagesAdapter.addOne,
    setMessages: messagesAdapter.upsertMany
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelRemove, (state, action) => {
        const channelId = action.payload;
        const messages = messagesAdapter.getSelectors().selectAll(state);
        const restMessages = messages.filter((message) => message?.channelId !== channelId);
        messagesAdapter.setAll(state, restMessages);
      })
      .addCase(signout, (state) => {
        messagesAdapter.removeAll(state);
      });
  }
});

export const messagesSelectors = messagesAdapter.getSelectors((state: ReduxState) => state.messages);
export const selectCurrentChannelMessages = createSelector(
  [messagesSelectors.selectAll, selectCurrentChannelId],
  (messages, currentChannelId) => messages.filter((message) => message.channelId === currentChannelId)
);
export const { messageAdd, setMessages } = messagesSlice.actions;
