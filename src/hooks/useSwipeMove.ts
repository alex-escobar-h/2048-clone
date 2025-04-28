import { Dispatch, useEffect, useRef } from 'react';
import { CleanupAction, GameStatus, MoveAction } from '../types';

export const useSwipeMove = (
  dispatch: Dispatch<MoveAction | CleanupAction>,
  status: GameStatus
) => {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isThrottled = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isThrottled.current || status === 'lost' || status === 'won') return;

      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;

      const move = getSwipeMoveAction(dx, dy);
      if (!move) return;

      dispatch({ type: move });
      isThrottled.current = true;
      const timeout = setTimeout(() => {
        isThrottled.current = false;
      }, 200);

      return () => clearTimeout(timeout);
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dispatch, status]);
};

const getSwipeMoveAction = (
  dx: number,
  dy: number
): MoveAction['type'] | null => {
  const threshold = 30; // Minimum distance before it counts as swipe

  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal swipe
    if (dx > threshold) return 'right';
    if (dx < -threshold) return 'left';
  } else {
    // Vertical swipe
    if (dy > threshold) return 'down';
    if (dy < -threshold) return 'up';
  }
  return null;
};
