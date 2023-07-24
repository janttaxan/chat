import styles from './layout.module.css';

import React from 'react';
import { Button } from 'react-bootstrap';

import { useAuth } from 'core/hooks/auth';

export const Header = () => {
  const { user, signout } = useAuth();

  return (
    <header className={styles.header}>
      <h1>{user.username ? user.username : 'Chat'}</h1>
      {user.isAuth && <Button onClick={signout}>Выйти</Button>}
    </header>
  );
};
