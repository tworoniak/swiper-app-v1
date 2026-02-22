// src/app/App.tsx
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SLIDES } from './slides';
import AppShell from '../components/AppShell/AppShell';
import SlideViewport from '../components/SlideViewport/SlideViewport';
import BottomNav from '../components/BottomNav/BottomNav';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';

const STORAGE_KEY = 'activeSlideId';

// Toggle this:
const WRAP_AROUND = true;

type Dir = 'next' | 'prev';

export default function App() {
  const defaultId = SLIDES[0]?.id ?? 'home';

  const [activeId, setActiveId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && SLIDES.some((s) => s.id === saved) ? saved : defaultId;
  });

  const [dir, setDir] = useState<Dir>('next');
  const [bump, setBump] = useState<Dir | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeId);
  }, [activeId]);

  const activeIndex = useMemo(() => {
    const idx = SLIDES.findIndex((s) => s.id === activeId);
    return idx >= 0 ? idx : 0;
  }, [activeId]);

  const activeSlide = SLIDES[activeIndex] ?? SLIDES[0];

  const canNext = WRAP_AROUND
    ? SLIDES.length > 1
    : activeIndex < SLIDES.length - 1;
  const canPrev = WRAP_AROUND ? SLIDES.length > 1 : activeIndex > 0;

  const goNext = useCallback(() => {
    setDir('next');
    setActiveId((prevId) => {
      const idx = SLIDES.findIndex((s) => s.id === prevId);
      const atLast = idx === SLIDES.length - 1;
      if (!WRAP_AROUND && atLast) return prevId;
      return SLIDES[atLast ? 0 : idx + 1].id;
    });
  }, []);

  const goPrev = useCallback(() => {
    setDir('prev');
    setActiveId((prevId) => {
      const idx = SLIDES.findIndex((s) => s.id === prevId);
      const atFirst = idx === 0;
      if (!WRAP_AROUND && atFirst) return prevId;
      return SLIDES[atFirst ? SLIDES.length - 1 : idx - 1].id;
    });
  }, []);

  const triggerBump = useCallback((which: Dir) => {
    setBump(which);
    window.setTimeout(() => setBump(null), 180);
  }, []);

  // Swipe left -> NEXT, swipe right -> PREV
  const swipeHandlers = useSwipeNavigation(goNext, goPrev, {
    thresholdPx: 55,
    restraintPx: 70,
    canSwipeLeft: canNext,
    canSwipeRight: canPrev,
    edgeResistance: 2.0,
    onEdgeLeft: () => triggerBump('next'),
    onEdgeRight: () => triggerBump('prev'),
  });

  return (
    <AppShell
      content={
        <SlideViewport
          title={activeSlide.label}
          swipeHandlers={swipeHandlers}
          transitionKey={activeSlide.id}
          direction={dir}
          bump={bump}
        >
          {activeSlide.element}
        </SlideViewport>
      }
      nav={
        <BottomNav
          slides={SLIDES}
          activeId={activeId}
          onChange={(id) => {
            const nextIdx = SLIDES.findIndex((s) => s.id === id);
            setDir(nextIdx >= activeIndex ? 'next' : 'prev');
            setActiveId(id);
          }}
        />
      }
    />
  );
}
