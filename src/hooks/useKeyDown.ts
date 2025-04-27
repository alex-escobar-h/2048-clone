import { Dispatch, useCallback, useEffect, useRef } from 'react';

import { CleanupAction, GameStatus, MoveAction } from '../types';

export const useKeyDown = (
  dispatch: Dispatch<MoveAction | CleanupAction>,
  status: GameStatus
) => {
  const isThrottled = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isThrottled.current || status === 'lost') return;

      e.preventDefault();

      const key = e.key.toLowerCase();

      const move = getMoveAction(key);
      if (!move) return;

      dispatch({ type: move });
      isThrottled.current = true;
      const timeout = setTimeout(() => {
        isThrottled.current = false;
      }, 200);

      return () => clearTimeout(timeout);
    },
    [dispatch, status]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

const getMoveAction = (key: string): MoveAction['type'] | null => {
  switch (key) {
    case 'arrowup':
    case 'w':
      return 'up';
    case 'arrowdown':
    case 's':
      return 'down';
    case 'arrowleft':
    case 'a':
      return 'left';
    case 'arrowright':
    case 'd':
      return 'right';
    default:
      return null;
  }
};
