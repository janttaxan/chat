import { io, Socket } from 'socket.io-client';
import { useCallback, useEffect, useState } from 'react';

import { Channel, Message } from 'core/entities';
import { channelAdd, channelRemove, channelUpdate, selectCurrentChannelId } from 'core/redux/slices/channels-slice';
import { selectUser } from 'core/redux/slices/user-slice';
import { messageAdd } from 'core/redux/slices/messages-slice';
import { useDispatch, useSelector } from 'core/redux/store';
import { useNotification } from 'core/hooks/notification';

const ChatEvents = {
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel'
} as const;

export const useChatSocket = () => {
  const [socket, setSocket] = useState<Optional<Socket>>(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const { success, info, error } = useNotification();

  const messageListener = useCallback(
    (payload: Message) => {
      dispatch(messageAdd(payload));
    },
    [dispatch]
  );

  const addChannelListener = useCallback(
    (payload: Channel) => {
      dispatch(channelAdd(payload));
    },
    [dispatch]
  );

  const removeChannelListener = useCallback(
    (payload: { id: number }) => {
      dispatch(channelRemove(payload.id));
    },
    [dispatch]
  );

  const renameChannelListener = useCallback(
    (payload: Channel) => {
      dispatch(channelUpdate({ id: payload.id, changes: { name: payload.name } }));
    },
    [dispatch]
  );

  const connectListener = useCallback(() => {
    success('Соеденение установлено!');
  }, [success]);

  const disconnectListener = useCallback(() => {
    info('Соеденение закрыто.');
  }, [info]);

  const errorListener = useCallback(() => {
    error('Соеденение потеряно. Попробуйте обновить страницу.');
  }, [error]);

  useEffect(() => {
    const newSocket = io('/');
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on('connect', connectListener);
    socket.on('disconnect', disconnectListener);
    socket.on('connect_error', errorListener);
    socket.on(ChatEvents.newMessage, messageListener);
    socket.on(ChatEvents.newChannel, addChannelListener);
    socket.on(ChatEvents.removeChannel, removeChannelListener);
    socket.on(ChatEvents.renameChannel, renameChannelListener);

    return () => {
      socket.close();
      socket.off('connect', connectListener);
      socket.off('disconnect', disconnectListener);
      socket.off('connect_error', errorListener);
      socket.off(ChatEvents.newMessage, messageListener);
      socket.off(ChatEvents.newChannel, addChannelListener);
      socket.off(ChatEvents.removeChannel, removeChannelListener);
      socket.off(ChatEvents.renameChannel, renameChannelListener);
    };
  }, [
    addChannelListener,
    connectListener,
    disconnectListener,
    errorListener,
    messageListener,
    removeChannelListener,
    renameChannelListener,
    socket
  ]);

  const sendMessage = useCallback(
    (body: string) => {
      if (!socket) {
        return;
      }
      socket.emit(ChatEvents.newMessage, { body, channelId: currentChannelId, username: user.username });
    },
    [currentChannelId, socket, user.username]
  );

  const createChannel = useCallback(
    (name: string) => {
      if (!socket) {
        return;
      }
      socket.emit(ChatEvents.newChannel, { name });
    },
    [socket]
  );

  const removeChannel = useCallback(
    (id: number) => {
      if (!socket) {
        return;
      }
      socket.emit(ChatEvents.removeChannel, { id });
    },
    [socket]
  );

  const renameChannel = useCallback(
    (id: number, name: string) => {
      if (!socket) {
        return;
      }
      socket.emit(ChatEvents.renameChannel, { id, name });
    },
    [socket]
  );

  return {
    sendMessage,
    createChannel,
    removeChannel,
    renameChannel
  };
};

export type ChatSocketHook = ReturnType<typeof useChatSocket>;
