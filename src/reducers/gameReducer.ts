// prettier-ignore
import { Board, CleanupAction, GameStatus, MoveAction,  ResetAction, TileAction, TileId, TileMap, UpdateStatusAction } from "../types"
import { createBoard, createTile, moveTiles, normalizeBoard } from '../utils';

/* --- Types --- */
export type GameState = {
  board: Board;
  tileMap: TileMap;
  activeTilesIds: TileId[];
  status: GameStatus;
  score: number;
  hasBoardChanged: boolean;
};

export type GameAction =
  | CleanupAction
  | TileAction
  | MoveAction
  | ResetAction
  | UpdateStatusAction;

/* --- Reducer State --- */
export const initialState: GameState = {
  board: createBoard(),
  tileMap: {},
  activeTilesIds: [],
  status: 'playing',
  score: 0,
  hasBoardChanged: false,
};

/* --- Dispatch function --- */
export const gameReducer = (
  state: GameState = initialState,
  action: GameAction
) => {
  switch (action.type) {
    case 'create-tile':
      return createTile(state, action);
    case 'cleanup':
      return normalizeBoard(state);
    case 'reset-game':
      return initialState;
    case 'update-status':
      return { ...state, status: action.status };
    case 'up':
    case 'down':
    case 'left':
    case 'right': {
      const directionMap = {
        up: { axis: 'col', direction: 'forward' },
        down: { axis: 'col', direction: 'backward' },
        left: { axis: 'row', direction: 'forward' },
        right: { axis: 'row', direction: 'backward' },
      } as const;
      const moveOptions = directionMap[action.type];
      return moveTiles(state, moveOptions);
    }
    default:
      return state;
  }
};
