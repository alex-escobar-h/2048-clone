import { Dispatch, useCallback, useEffect } from 'react';

import { CleanupAction, MoveAction } from '../types';

export const useKeyDown = (dispatch: Dispatch<MoveAction | CleanupAction>) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();

      const key = e.key.toLowerCase();

      switch (key) {
        case 'arrowup':
        case 'w':
          dispatch({ type: 'up' });
          break;
        case 'arrowdown':
        case 's':
          dispatch({ type: 'down' });
          break;
        case 'arrowleft':
        case 'a':
          dispatch({ type: 'left' });
          break;
        case 'arrowright':
        case 'd':
          dispatch({ type: 'right' });
          break;
        default:
          return;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
