// src/components/SlideViewport/SlideViewport.tsx
import styles from './SlideViewport.module.scss';
import type { ReactNode } from 'react';

export default function SlideViewport({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.viewport} aria-label={title}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </header>

      <div className={styles.body}>{children}</div>
    </section>
  );
}
