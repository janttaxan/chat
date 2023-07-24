import { io } from 'socket.io-client';
import { useCallback, useEffect, useRef } from 'react';

import { Message } from 'core/entities';
import { selectCurrentChannelId } from 'core/redux/slices/channels-slice';
import { selectUser } from 'core/redux/slices/user-slice';
import { useDispatch, useSelector } from 'core/redux/store';
import { messageAdd } from 'core/redux/slices/messages-slice';

export const useChatSocket = () => {
  const socket = useRef(io('/'));
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentChannelId = useSelector(selectCurrentChannelId);

  const messageListener = useCallback(
    (payload: Message) => {
      dispatch(messageAdd(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    const socketInstance = socket.current;

    socketInstance.on('newMessage', messageListener);

    return () => {
      socketInstance.off('newMessage', messageListener);
    };
  }, [messageListener]);

  const sendMessage = useCallback(
    (body: string) => {
      socket.current.emit('newMessage', { body, channelId: currentChannelId, username: user.username });
    },
    [currentChannelId, user.username]
  );

  const createChannel = useCallback((name: string) => {
    socket.current.emit('newChannel', { name });
  }, []);

  const removeChannel = useCallback((id: number) => {
    socket.current.emit('removeChannel', { id });
  }, []);

  const renameChannel = useCallback((id: number, name: string) => {
    socket.current.emit('renameChannel', { id, name });
  }, []);

  return {
    sendMessage,
    createChannel,
    removeChannel,
    renameChannel
  };
};

export type ChatSocketHook = ReturnType<typeof useChatSocket>;
