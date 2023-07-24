import { Button, Form } from 'react-bootstrap';
import { useCallback, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

interface AuthFormProps {
  onSubmit: (data: { username: string; password: string }) => Promise<void>;
}

export function AuthForm({ onSubmit }: AuthFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorValue, setErrorValue] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
    setErrorValue('');
  }, []);

  const handleChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setErrorValue('');
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      await onSubmit({ username, password });
      navigate(from, { replace: true });
    },
    [from, navigate, onSubmit, password, username]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Ваше имя</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={handleChangeName}
          required
          isInvalid={errorValue.length > 0}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ваш пароль</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={handleChangePassword}
          required
          isInvalid={errorValue.length > 0}
        />
        <Form.Control.Feedback type='invalid'>{errorValue}</Form.Control.Feedback>
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
}
