// src/components/AppShell/AppShell.tsx
import styles from './AppShell.module.scss';
import type { ReactNode } from 'react';

type Props = {
  content: ReactNode;
  nav: ReactNode;
};

export default function AppShell({ content, nav }: Props) {
  return (
    <div className={styles.shell}>
      <main className={styles.content}>{content}</main>
      <nav className={styles.nav}>{nav}</nav>
    </div>
  );
}
