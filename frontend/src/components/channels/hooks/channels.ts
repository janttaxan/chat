import { useCallback, useState } from 'react';

import { Channel } from 'core/entities';
import { ChatSocketHook } from 'core/hooks/chat-socket';
import { channelsSelectors, selectCurrentChannelId, setCurrentChannelId } from 'core/redux/slices/channels-slice';
import { useDispatch, useSelector } from 'core/redux/store';
import { useNotification } from 'core/hooks/notification';

export enum WizardMode {
  add,
  remove,
  rename
}

export const useChannels = (chatSocket: ChatSocketHook) => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const { success, info } = useNotification();

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
      success(`Канал добавлен: ${name}`);
      closeModal();
    },
    [chatSocket, closeModal, success]
  );

  const removeChannel = useCallback(
    (channel: Channel) => {
      chatSocket.removeChannel(channel.id);
      info(`Канал удален: ${channel.name}`);
      closeModal();
    },
    [chatSocket, closeModal, info]
  );

  const renameChannel = useCallback(
    (channelId: number, newName: string) => {
      chatSocket.renameChannel(channelId, newName);
      info(`Новое имя канала: ${newName}`);
      closeModal();
    },
    [chatSocket, closeModal, info]
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
