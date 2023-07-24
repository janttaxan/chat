import styles from './message-form.module.css';

import { Form } from 'react-bootstrap';
import { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';

import { ChatSocketHook } from 'core/hooks/chat-socket';

interface MessageFormProps {
  chatSocket: ChatSocketHook;
}

export const MessageForm = ({ chatSocket }: MessageFormProps) => {
  const [text, setText] = useState('');
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setText(value);
    if (textFieldRef.current) {
      textFieldRef.current.style.height = 'auto';
      const newHeight = textFieldRef.current.scrollHeight + 2;
      textFieldRef.current.style.height = newHeight + 'px';
    }
  }, []);

  const submit = useCallback(() => {
    if (text.length > 0) {
      chatSocket.sendMessage(text.trim());
      setText('');
    }
    if (textFieldRef.current) {
      textFieldRef.current.style.height = '';
    }
  }, [text]);

  const handleSubmit = useCallback(
    (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      submit();
    },
    [submit]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Enter' && !event.shiftKey) {
        submit();
      }
    },
    [submit]
  );

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault();
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        className={styles.textField}
        ref={textFieldRef}
        as='textarea'
        placeholder='Сообщение'
        rows={1}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        value={text}
      />
    </Form>
  );
};
