import { useEffect } from 'react';
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
  useEffect(() => {
    const isPlaying = status === 'playing';

    if (!isBoardEmpty || !isPlaying) {
      return;
    }
    for (let i = 0; i < 2; i++) {
      addNewTile();
    }
  }, [status, isBoardEmpty, addNewTile]);
};
