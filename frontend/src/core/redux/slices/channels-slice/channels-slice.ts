import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { Channel } from 'core/entities';
import { ReduxState } from 'core/redux/store';
import { signout } from 'core/redux/slices/user-slice';

export const channelsAdapter = createEntityAdapter<Channel>();

export interface ChannelsState extends EntityState<Channel> {
  currentChannelId: number;
}

const GENERAL_CHANNEL_ID = 1;
export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ...channelsAdapter.getInitialState(),
    currentChannelId: GENERAL_CHANNEL_ID
  },
  reducers: {
    channelAdd: (state, action: PayloadAction<Channel>) => {
      const newChannel = action.payload;
      channelsAdapter.addOne(state, newChannel);
      state.currentChannelId = newChannel.id;
    },
    channelRemove: (state, action: PayloadAction<number>) => {
      channelsAdapter.removeOne(state, action.payload);
      state.currentChannelId = GENERAL_CHANNEL_ID;
    },
    channelUpdate: channelsAdapter.updateOne,
    setChannels: channelsAdapter.upsertMany,
    setCurrentChannelId: (state: ChannelsState, action: PayloadAction<number>) => {
      state.currentChannelId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signout, (state) => {
      channelsAdapter.removeAll(state);
    });
  }
});

export const channelsSelectors = channelsAdapter.getSelectors((state: ReduxState) => state.channels);
export const selectCurrentChannelId = (state: ReduxState) => state.channels.currentChannelId;
export const { setChannels, channelAdd, channelRemove, channelUpdate, setCurrentChannelId } = channelsSlice.actions;
