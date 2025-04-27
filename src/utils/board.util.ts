import { Board, Position, TileMap } from '../types';
import { BOARD_DIMENSION } from './constant';
import { getRandomTilePosition } from './tile.util';

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

export const getRandomAvailablePosition = (board: Board): Position | null => {
  const availablePositions = getAvailablePositions(board);
  if (availablePositions.length === 0) return null;
  return getRandomTilePosition(availablePositions);
};

export const hasMergeableTiles = (board: Board, tileMap: TileMap): boolean => {
  for (let row = 0; row < BOARD_DIMENSION; row++) {
    for (let col = 0; col < BOARD_DIMENSION; col++) {
      const curId = board[row][col];
      if (curId === null) continue;

      const curTile = tileMap[curId];

      const rightId = col + 1 < BOARD_DIMENSION ? board[row][col + 1] : null;
      const downId = row + 1 < BOARD_DIMENSION ? board[row + 1][col] : null;

      const rightTile = rightId ? tileMap[rightId] : null;
      const downTile = downId ? tileMap[downId] : null;

      if (
        (rightTile && rightTile.value === curTile.value) ||
        (downTile && downTile.value === curTile.value)
      ) {
        return true;
      }
    }
  }
  return false;
};
