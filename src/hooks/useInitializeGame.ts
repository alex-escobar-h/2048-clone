import { useEffect, useRef } from 'react';

export const useInitializeGame = (startGame: () => void) => {
  const isInitialized = useRef(false);
  useEffect(() => {
    if (isInitialized.current === false) {
      startGame();
      isInitialized.current = true;
    }
  }, [startGame]);
};
