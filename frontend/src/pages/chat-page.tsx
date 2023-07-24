import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { useEffect } from 'react';

import { Layout } from 'components/layout/layout';

import { Channel, Message } from 'core/entities';
import { routes } from 'core/routes';
import { selectUser } from 'core/redux/slices/user-slice';
import { setChannels, setCurrentChannelId } from 'core/redux/slices/channels-slice';
import { setMessages } from 'core/redux/slices/messages-slice';
import { useDispatch, useSelector } from 'core/redux/store';

import { Channels } from 'components/channels/channels';
import { Messages } from 'components/messages/messages';
import { useChatSocket } from 'core/hooks/chat-socket';

const getData = async (token: string) => {
  const response = await axios.get(routes.api.data(), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export function ChatPage() {
  const chatSocket = useChatSocket();

  const dispatch = useDispatch();
  const { token } = useSelector(selectUser);

  const getNormalized = (data: { messages: Array<Message>; channels: Array<Channel>; currentChannelId: number }) => {
    const channel = new schema.Entity('channels');
    const message = new schema.Entity('messages');
    const normalizedData = normalize<
      any,
      { channels: { [key: string]: Channel }; messages: { [key: string]: Message } }
    >(data, {
      channels: [channel],
      messages: [message]
    });
    return {
      ...normalizedData,
      currentChannelId: data.currentChannelId
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return;
      }
      const data = await getData(token);
      const normalizedData = getNormalized(data);
      const { messages, channels } = normalizedData.entities;
      if (channels) {
        dispatch(setChannels(channels));
        dispatch(setCurrentChannelId(normalizedData.currentChannelId));
      }
      if (messages) {
        dispatch(setMessages(messages));
      }
    };

    fetchData().then();
  }, [dispatch, token]);

  return (
    <Layout>
      <>
        <h3>Chat Page</h3>
        <div>chat page</div>
        <Channels />
        <Messages chatSocket={chatSocket} />
      </>
    </Layout>
  );
}
