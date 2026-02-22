// src/components/SlideViewport/SlideViewport.tsx
import styles from './SlideViewport.module.scss';
import type { ReactNode } from 'react';

type SwipeHandlers = {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: (e: React.PointerEvent) => void;
};

type Dir = 'next' | 'prev';

export default function SlideViewport({
  title,
  children,
  swipeHandlers,
  transitionKey,
  direction,
  bump,
}: {
  title: string;
  children: ReactNode;
  swipeHandlers?: SwipeHandlers;
  transitionKey: string;
  direction: Dir;
  bump: Dir | null;
}) {
  const animClass =
    direction === 'next' ? styles.enterFromRight : styles.enterFromLeft;

  const bumpClass =
    bump === 'next'
      ? styles.bumpLeft // tried to go next but hit edge -> bump left
      : bump === 'prev'
        ? styles.bumpRight
        : '';

  return (
    <section className={styles.viewport} aria-label={title}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </header>

      <div className={`${styles.body} ${bumpClass}`} {...swipeHandlers}>
        {/* key remount triggers animation on change */}
        <div key={transitionKey} className={`${styles.slide} ${animClass}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
