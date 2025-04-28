import { gameReducer, initialState } from '../reducers/gameReducer';
import { PropsWithChildren, useReducer } from 'react';
import { GameContext } from './GameContext';
import { GameStatus } from '../types';
import {
  useGameStatusChecker,
  useInitializeGame,
  useKeyDown,
  usePostMoveEffects,
  useSwipeMove,
} from '../hooks/';
import {
  getAvailablePositions,
  getRandomAvailablePosition,
  getRandomTileValue,
  hasMergeableTiles,
  WIN_VALUE,
} from '../utils';

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
  };

  const updateStatus = (status: GameStatus) => {
    dispatch({ type: 'update-status', status });
  };

  const checkGameStatus = () => {
    if (gameState.status !== 'playing') return;

    const hasReachedWinTile = Object.values(gameState.tileMap).some(
      (t) => t.value === WIN_VALUE
    );

    if (hasReachedWinTile && !gameState.hasWon) {
      updateStatus('won');
      return;
    }

    const isBoardFull = getAvailablePositions(gameState.board).length === 0;
    const isMergable = hasMergeableTiles(gameState.board, gameState.tileMap);

    if (isBoardFull && !isMergable) {
      updateStatus('lost');
    }
  };

  // Creates initial tiles for new game
  useInitializeGame({
    status: gameState.status,
    isBoardEmpty: gameState.activeTilesIds.length === 0,
    addNewTile,
  });

  // Handles keyboard input
  useKeyDown(dispatch, gameState.status);
  // Handles swipe input
  useSwipeMove(dispatch, gameState.status);
  // Cleans up board and adds new tile after each move
  usePostMoveEffects({
    hasChanged: gameState.hasBoardChanged,
    dispatch,
    addNewTile,
  });
  // Check if user has won, lost, or still playing
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
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
