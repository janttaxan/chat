import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Message } from 'core/entities';
import { ReduxState } from 'core/redux/store';

export const messagesAdapter = createEntityAdapter<Message>();

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    messageAdd: messagesAdapter.addOne,
    setMessages: messagesAdapter.upsertMany
  }
});

export const messagesSelectors = messagesAdapter.getSelectors((state: ReduxState) => state.messages);
export const { messageAdd, setMessages } = messagesSlice.actions;
