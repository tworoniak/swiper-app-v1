// src/app/App.tsx
import { useEffect, useMemo, useState } from 'react';
import { SLIDES } from './slides';
import AppShell from '../components/AppShell/AppShell';
import SlideViewport from '../components/SlideViewport/SlideViewport';
import BottomNav from '../components/BottomNav/BottomNav';

const STORAGE_KEY = 'activeSlideId';

export default function App() {
  const defaultId = SLIDES[0]?.id ?? 'home';

  const [activeId, setActiveId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && SLIDES.some((s) => s.id === saved) ? saved : defaultId;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeId);
  }, [activeId]);

  const activeSlide = useMemo(
    () => SLIDES.find((s) => s.id === activeId) ?? SLIDES[0],
    [activeId],
  );

  return (
    <AppShell
      content={
        <SlideViewport title={activeSlide.label}>
          {activeSlide.element}
        </SlideViewport>
      }
      nav={
        <BottomNav slides={SLIDES} activeId={activeId} onChange={setActiveId} />
      }
    />
  );
}
