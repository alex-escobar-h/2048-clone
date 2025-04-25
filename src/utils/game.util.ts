import { GameState } from '../reducers/gameReducer';

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
