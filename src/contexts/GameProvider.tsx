import { PropsWithChildren, useReducer } from 'react';
import { gameReducer, initialState } from '../reducers/gameReducer';
import { GameContext } from './GameContext';

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const getTiles = () =>
    gameState.activeTilesIds.map((id) => gameState.tileMap[id]);
  const startGame = () => {};

  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        status: gameState.status,
        getTiles,
        startGame,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
