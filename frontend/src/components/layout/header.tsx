import React from 'react';
import { Button, Stack } from 'react-bootstrap';

import { useAuth } from 'core/hooks/auth';

export const Header = () => {
  const { user, signout } = useAuth();

  return (
    <Stack as='header' direction='horizontal' gap={3}>
      <h1 className='me-auto'>{user.username ? user.username : 'Chat'}</h1>
      {user.isAuth && <Button onClick={signout}>Выйти</Button>}
    </Stack>
  );
};
