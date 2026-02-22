// src/hooks/useSwipeNavigation.ts
import { useCallback, useRef } from 'react';

type SwipeHandlers = {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: (e: React.PointerEvent) => void;
};

type Options = {
  thresholdPx?: number; // base swipe distance to trigger
  restraintPx?: number; // max vertical movement allowed
  canSwipeLeft?: boolean; // left = go next
  canSwipeRight?: boolean; // right = go prev
  edgeResistance?: number; // multiplier at edges (e.g. 1.8)
  onEdgeLeft?: () => void; // called when user swipes left at edge
  onEdgeRight?: () => void; // called when user swipes right at edge
};

export function useSwipeNavigation(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  {
    thresholdPx = 55,
    restraintPx = 70,
    canSwipeLeft = true,
    canSwipeRight = true,
    edgeResistance = 1.8,
    onEdgeLeft,
    onEdgeRight,
  }: Options = {},
): SwipeHandlers {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const tracking = useRef(false);

  const reset = () => {
    startX.current = null;
    startY.current = null;
    tracking.current = false;
  };

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!e.isPrimary) return;
    tracking.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!tracking.current || startX.current == null || startY.current == null)
      return;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    // Prefer vertical scroll if that's the dominant gesture
    if (Math.abs(dy) > Math.abs(dx)) return;

    // Once it’s clearly horizontal, stop browser from fighting it
    if (Math.abs(dx) > 8) e.preventDefault?.();
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!tracking.current || startX.current == null || startY.current == null)
        return;

      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;

      // Too vertical -> treat as scroll
      if (Math.abs(dy) > restraintPx) {
        reset();
        return;
      }

      const wantsLeft = dx <= -thresholdPx;
      const wantsRight = dx >= thresholdPx;

      if (wantsLeft) {
        const required = canSwipeLeft
          ? thresholdPx
          : thresholdPx * edgeResistance;
        if (dx <= -required && canSwipeLeft) onSwipeLeft();
        else if (!canSwipeLeft) onEdgeLeft?.();
      } else if (wantsRight) {
        const required = canSwipeRight
          ? thresholdPx
          : thresholdPx * edgeResistance;
        if (dx >= required && canSwipeRight) onSwipeRight();
        else if (!canSwipeRight) onEdgeRight?.();
      }

      reset();
    },
    [
      onSwipeLeft,
      onSwipeRight,
      thresholdPx,
      restraintPx,
      canSwipeLeft,
      canSwipeRight,
      edgeResistance,
      onEdgeLeft,
      onEdgeRight,
    ],
  );

  const onPointerCancel = useCallback(() => reset(), []);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}
