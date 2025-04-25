import { Board, Position } from '../types';
import { BOARD_DIMENSION } from './constant';

// Create new 4x4 board intialized to null
export const createBoard = (): Board => {
  return Array.from({ length: BOARD_DIMENSION }, () =>
    Array(BOARD_DIMENSION).fill(null)
  );
};

export const getAvailablePositions = (board: Board): Position[] => {
  const availablePositions: Position[] = [];
  for (let row = 0; row < BOARD_DIMENSION; row++) {
    for (let col = 0; col < BOARD_DIMENSION; col++) {
      if (board[row][col] === null) availablePositions.push([col, row]);
    }
  }
  return availablePositions;
};
