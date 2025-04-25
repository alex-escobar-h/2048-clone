import { Board } from '../types';
import { BOARD_DIMENSION } from './constant';

export const createBoard = (): Board => {
  return Array.from({ length: BOARD_DIMENSION }, () =>
    Array(BOARD_DIMENSION).fill(null)
  );
};
