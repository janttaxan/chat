import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { Channel } from 'core/entities';
import { ReduxState } from 'core/redux/store';

export const channelsAdapter = createEntityAdapter<Channel>();

export interface ChannelsState extends EntityState<Channel> {
  currentChannelId: Optional<number>;
}

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ...channelsAdapter.getInitialState(),
    currentChannelId: null
  },
  reducers: {
    channelAdd: channelsAdapter.addOne,
    setChannels: channelsAdapter.upsertMany,
    setCurrentChannelId: (state: ChannelsState, action: PayloadAction<number>) => {
      state.currentChannelId = action.payload;
    }
  }
});

export const channelsSelectors = channelsAdapter.getSelectors((state: ReduxState) => state.channels);
export const selectCurrentChannelId = (state: ReduxState) => state.channels.currentChannelId;
export const { setChannels, channelAdd, setCurrentChannelId } = channelsSlice.actions;
