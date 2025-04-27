import { GameStatus } from './game.types';
import { Tile } from './tile.types';

export type GameContextType = {
  score: number;
  status: GameStatus;
  getTiles: () => Tile[];
  startGame: () => void;
  updateStatus?: (string: GameStatus) => void;
};
