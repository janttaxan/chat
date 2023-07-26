import { io, Socket } from 'socket.io-client';
import { useCallback, useEffect, useState } from 'react';

import { Channel, Message } from 'core/entities';
import { channelAdd, channelRemove, channelUpdate, selectCurrentChannelId } from 'core/redux/slices/channels-slice';
import { selectUser } from 'core/redux/slices/user-slice';
import { messageAdd } from 'core/redux/slices/messages-slice';
import { useDispatch, useSelector } from 'core/redux/store';

export const useChatSocket = () => {
  const [socket, setSocket] = useState<Optional<Socket>>(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentChannelId = useSelector(selectCurrentChannelId);

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
    console.log('======================= socket CONNECTED');
  }, []);
  const disconnectListener = useCallback(() => {
    console.log('======================= socket DISCONNECTED');
  }, []);

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
    socket.on('newMessage', messageListener);
    socket.on('newChannel', addChannelListener);
    socket.on('removeChannel', removeChannelListener);
    socket.on('renameChannel', renameChannelListener);

    return () => {
      socket.close();
      socket.on('connect', connectListener);
      socket.on('disconnect', disconnectListener);
      socket.off('newMessage', messageListener);
      socket.off('newChannel', addChannelListener);
      socket.off('removeChannel', removeChannelListener);
      socket.off('renameChannel', renameChannelListener);
    };
  }, [
    addChannelListener,
    connectListener,
    disconnectListener,
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
      socket.emit('newMessage', { body, channelId: currentChannelId, username: user.username });
    },
    [currentChannelId, socket, user.username]
  );

  const createChannel = useCallback(
    (name: string) => {
      if (!socket) {
        return;
      }
      socket.emit('newChannel', { name });
    },
    [socket]
  );

  const removeChannel = useCallback(
    (id: number) => {
      if (!socket) {
        return;
      }
      socket.emit('removeChannel', { id });
    },
    [socket]
  );

  const renameChannel = useCallback(
    (id: number, name: string) => {
      if (!socket) {
        return;
      }
      socket.emit('renameChannel', { id, name });
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
