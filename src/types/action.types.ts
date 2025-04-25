import { Tile } from './tile.types';
import { GameStatus } from './game.types';

export type TileAction = { type: 'create-tile'; tile: Tile };

export type MoveAction =
  | { type: 'up' }
  | { type: 'down' }
  | { type: 'left' }
  | { type: 'right' };

export type CleanupAction = { type: 'cleanup' };

export type ResetAction = { type: 'reset-game' };

export type UpdateStatusAction = {
  type: 'update-status';
  status: GameStatus;
};
