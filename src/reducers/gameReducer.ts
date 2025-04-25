// prettier-ignore
import { Board, CleanupAction, GameStatus, MoveAction, ResetAction, TileAction, TileId, TileMap, UpdateStatusAction } from "../types"

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
