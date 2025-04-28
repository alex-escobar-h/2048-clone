import { useEffect, useRef } from 'react';
import { GameStatus } from '../types';

type InitializeGame = {
  status: GameStatus;
  isBoardEmpty: boolean;
  addNewTile: () => void;
};
export const useInitializeGame = ({
  status,
  isBoardEmpty,
  addNewTile,
}: InitializeGame) => {
  const isFirstLoad = useRef(true); // track if it's the first ever load

  useEffect(() => {
    const isPlaying = status === 'playing';

    if (isBoardEmpty && isPlaying) {
      if (isFirstLoad.current) {
        isFirstLoad.current = false; // after first load, normal behavior
        return;
      }

      for (let i = 0; i < 2; i++) {
        addNewTile();
      }
    }
  }, [status, isBoardEmpty, addNewTile]);
};
