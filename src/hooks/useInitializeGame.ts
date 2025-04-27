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
  // export const useInitializeGame = (startGame: () => void) => {
  // const isInitialized = useRef(false);
  // useEffect(() => {
  //   if (isInitialized.current === false) {
  //     startGame();
  //     isInitialized.current = true;
  //   }
  // }, [startGame]);

  const isFirstLoad = useRef(true); // track if it's the first ever load

  useEffect(() => {
    const isPlaying = status === 'playing';

    if (isBoardEmpty && isPlaying) {
      if (isFirstLoad.current) {
        console.log('First load — skipping auto spawn');
        isFirstLoad.current = false; // after first load, normal behavior
        return;
      }

      console.log('Reset after lose — spawning new tiles...');
      for (let i = 0; i < 2; i++) {
        addNewTile();
      }
    }
  }, [status, isBoardEmpty, addNewTile]);
};
