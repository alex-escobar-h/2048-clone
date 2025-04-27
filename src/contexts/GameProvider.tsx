import {
  useGameStatusChecker,
  useInitializeGame,
  useKeyDown,
  usePostMoveEffects,
} from '../hooks/';
import {
  getAvailablePositions,
  getRandomAvailablePosition,
  getRandomTileValue,
  hasMergeableTiles,
  WIN_VALUE,
} from '../utils';
import { gameReducer, initialState } from '../reducers/gameReducer';
import { PropsWithChildren, useReducer } from 'react';
import { GameContext } from './GameContext';
import { GameStatus } from '../types';

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
    console.log('stargame!!!!');
    console.log('status:', gameState.status);
    for (let i = 0; i < 2; i++) {
      addNewTile();
    }
  };

  const updateStatus = (status: GameStatus) => {
    dispatch({ type: 'update-status', status });
  };

  const checkGameStatus = () => {
    const hasWon =
      Object.values(gameState.tileMap).filter((t) => t.value === WIN_VALUE)
        .length > 0;
    if (hasWon) {
      updateStatus('won');
    }
    const isBoardFull = getAvailablePositions(gameState.board).length === 0;
    const isMergable = hasMergeableTiles(gameState.board, gameState.tileMap);
    console.log('isBoardFull', isBoardFull);
    console.log('isMergable', isMergable);
    console.log('Status:', gameState.status);

    if (isBoardFull && !isMergable && gameState.status === 'playing') {
      console.log('lost');
      updateStatus('lost');
    }
  };

  useInitializeGame(startGame);
  useKeyDown(dispatch, gameState.status);
  usePostMoveEffects({
    hasChanged: gameState.hasBoardChanged,
    dispatch,
    addNewTile,
  });

  useGameStatusChecker({
    hasChanged: gameState.hasBoardChanged,
    checkGameStatus,
  });

  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        status: gameState.status,
        getTiles,
        startGame,
        updateStatus,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
