import { useCallback, useState } from 'react';

import { Channel } from 'core/entities';
import { ChatSocketHook } from 'core/hooks/chat-socket';
import { channelsSelectors, selectCurrentChannelId, setCurrentChannelId } from 'core/redux/slices/channels-slice';
import { useDispatch, useSelector } from 'core/redux/store';

export enum WizardMode {
  add,
  remove,
  rename
}

export const useChannels = (chatSocket: ChatSocketHook) => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(selectCurrentChannelId);

  const [mode, setMode] = useState<Optional<WizardMode>>(null);
  const [workingChannel, setWorkingChannel] = useState<Optional<Channel>>(null);

  const changeCurrentChannel = useCallback(
    (id: number) => {
      dispatch(setCurrentChannelId(id));
    },
    [dispatch]
  );

  const openModal = useCallback((mode: WizardMode, channel?: Channel) => {
    setMode(mode);
    if (channel) {
      setWorkingChannel(channel);
    }
  }, []);

  const closeModal = useCallback(() => {
    setMode(null);
    setWorkingChannel(null);
  }, []);

  const addChannel = useCallback(
    (name: string) => {
      chatSocket.createChannel(name);
      closeModal();
    },
    [chatSocket, closeModal]
  );

  const removeChannel = useCallback(
    (channelId: number) => {
      chatSocket.removeChannel(channelId);
      closeModal();
    },
    [chatSocket, closeModal]
  );

  const renameChannel = useCallback(
    (channelId: number, newName: string) => {
      chatSocket.renameChannel(channelId, newName);
      closeModal();
    },
    [chatSocket, closeModal]
  );

  return {
    channels,
    currentChannelId,
    workingChannel,
    mode,
    openModal,
    closeModal,
    changeCurrentChannel,
    addChannel,
    removeChannel,
    renameChannel
  };
};
