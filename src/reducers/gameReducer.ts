// prettier-ignore
import { Board, CleanupAction, GameStatus, MoveAction, ResetAction, TileAction, TileId, TileMap, UpdateStatusAction } from "../types"
import { createBoard, createTile } from '../utils';

/* --- Types --- */
export type GameState = {
  board: Board;
  tileMap: TileMap;
  activeTilesId: TileId[];
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

export const initialState: GameState = {
  board: createBoard(),
  tileMap: {},
  activeTilesId: [],
  status: 'playing',
  score: 0,
  hasBoardChanged: false,
};

export const reducer = (
  state: GameState = initialState,
  action: GameAction
) => {
  switch (action.type) {
    case 'create-tile':
      return createTile(state, action);
    default:
      return state;
  }
};
