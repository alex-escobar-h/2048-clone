import { createContext } from 'react';
import { GameContextType, Tile } from '../types';

export const GameContext = createContext<GameContextType>({
  score: 0,
  status: 'playing',
  getTiles: () => [] as Tile[],
  startGame: () => {},
});
