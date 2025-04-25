import { PropsWithChildren, useReducer } from 'react';
import { gameReducer, initialState } from '../reducers/gameReducer';
import { GameContext } from './GameContext';
import { useKeyDown } from '../hooks/useKeyDown';
import { getRandomAvailablePosition, getRandomTileValue } from '../utils';
import { useInitializeGame } from '../hooks/useInitializeGame';
import { usePostMoveEffects } from '../hooks/usePostMoveEffects';

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const getTiles = () =>
    gameState.activeTilesIds.map((id) => gameState.tileMap[id]);

  const addNewTile = () => {
    const pos = getRandomAvailablePosition(gameState.board);
    if (!pos) return;
    dispatch({
      type: 'create-tile',
      tile: {
        position: pos,
        value: getRandomTileValue(),
      },
    });
  };

  const startGame = () => {
    dispatch({ type: 'reset-game' });
    for (let i = 0; i < 2; i++) {
      addNewTile();
    }
  };

  useInitializeGame(startGame);
  useKeyDown(dispatch);
  usePostMoveEffects({
    hasChanged: gameState.hasBoardChanged,
    dispatch,
    addNewTile,
  });

  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        status: gameState.status,
        getTiles,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
