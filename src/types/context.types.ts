import { Dispatch } from 'react';
import { GameStatus } from './game.types';
import { Tile } from './tile.types';
import { GameAction } from '../reducers/gameReducer';

export type GameContextType = {
  score: number;
  status: GameStatus;
  getTiles: () => Tile[];
  startGame: () => void;
  dispatch?: Dispatch<GameAction>;
};
