import { GameState } from '../reducers/gameReducer';
import { Board } from '../types';
import { BOARD_DIMENSION } from './constant';

// Create new 4x4 board intialized to null
export const createBoard = (): Board => {
  return Array.from({ length: BOARD_DIMENSION }, () =>
    Array(BOARD_DIMENSION).fill(null)
  );
};

// Cleans up game state after a move or a merge
export const normalizeBoard = (state: GameState): GameState => {
  const board = state.board;
  const flatBoard = board.flat(Infinity);
  // Copy active tiles to a new tile map
  const tileMap = flatBoard.reduce((result, tileId) => {
    if (tileId === null) return result;
    const tile = state.tileMap[tileId as string];
    if (!tile) return result;
    return { ...result, [tileId as string]: { ...tile } };
  }, {});
  const activeTilesIds = Object.keys(tileMap);
  return {
    ...state,
    tileMap,
    activeTilesIds,
    hasBoardChanged: false,
  };
};
