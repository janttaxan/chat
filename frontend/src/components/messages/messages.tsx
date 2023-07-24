import styles from './messages.module.css';

import { ChatSocketHook } from 'core/hooks/chat-socket';
import { messagesSelectors } from 'core/redux/slices/messages-slice';
import { useSelector } from 'core/redux/store';

import { MessageForm } from 'components/messages/message-form/message-form';

interface MessagesProps {
  chatSocket: ChatSocketHook;
}

export const Messages = ({ chatSocket }: MessagesProps) => {
  const messages = useSelector(messagesSelectors.selectAll);

  return (
    <div className={styles.root}>
      <h3>Сообщения</h3>
      {messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              ({message.username}){message.body}
            </li>
          ))}
        </ul>
      ) : null}
      <MessageForm chatSocket={chatSocket} />
    </div>
  );
};
