// src/components/BottomNav/BottomNav.tsx
import styles from './BottomNav.module.scss';
import type { SlideDef } from '../../app/slides';

type Props = {
  slides: SlideDef[];
  activeId: string;
  onChange: (id: string) => void;
};

export default function BottomNav({ slides, activeId, onChange }: Props) {
  return (
    <div className={styles.bar} role='tablist' aria-label='Primary navigation'>
      {slides.map((s) => {
        const isActive = s.id === activeId;

        return (
          <button
            key={s.id}
            type='button'
            role='tab'
            aria-selected={isActive}
            className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
            onClick={() => onChange(s.id)}
          >
            <span className={styles.label}>{s.label}</span>
          </button>
        );
      })}
    </div>
  );
}
