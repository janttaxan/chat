import styles from './layout.module.css';

import React from 'react';

import { Header } from 'components/layout/header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <section className={styles.container}>
      <Header />

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>footer</footer>
    </section>
  );
}
